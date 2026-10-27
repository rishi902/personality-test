// Navigation, quiz flow, scoring and results.

const STORAGE_KEY = "soulprint:last-result";

const store = {
  get(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
  },
};

const $ = (sel) => document.querySelector(sel);

let answers = [];
let current = 0;
let shuffledOptions = [];
let lastResult = store.get(STORAGE_KEY);

// ---------- Navigation ----------

function show(view) {
  if (!document.getElementById(`view-${view}`)) view = "home";
  if (view === "result" && !lastResult) view = "home";
  if (view === "quiz" && !shuffledOptions.length) startQuiz();
  document.querySelectorAll(".view").forEach((el) => el.classList.remove("active"));
  $(`#view-${view}`).classList.add("active");
  document.querySelectorAll(".nav-link").forEach((el) => el.classList.toggle("active", el.dataset.go === view));
  if (view === "home") renderLastResult();
  if (view === "result") renderResult(lastResult);
  window.scrollTo({ top: 0 });
}

function go(view) {
  if (view === "quiz") startQuiz();
  if (location.hash === `#${view}`) show(view);
  else location.hash = view;
}

window.addEventListener("hashchange", () => show(location.hash.slice(1) || "home"));

document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-go]");
  if (target) go(target.dataset.go);
});

// ---------- Quiz ----------

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startQuiz() {
  answers = [];
  current = 0;
  shuffledOptions = QUESTIONS.map((q) => shuffle(q.options));
  renderQuestion();
}

const KIND_LABELS = { "mbti-a": "About your energy", "mbti-b": "About your choices", love: "About love" };

function renderQuestion() {
  const q = QUESTIONS[current];
  $("#quiz-count").textContent = `${current + 1} / ${QUESTIONS.length}`;
  $("#quiz-bar").style.width = `${(current / QUESTIONS.length) * 100}%`;
  $("#quiz-kind").textContent = KIND_LABELS[q.kind];
  $("#quiz-question").textContent = q.text;
  $("#quiz-back").disabled = current === 0;

  const container = $("#quiz-options");
  container.innerHTML = "";
  shuffledOptions[current].forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt.text;
    if (answers[current] === opt.key) btn.classList.add("selected");
    btn.addEventListener("click", () => choose(opt.key, btn));
    container.appendChild(btn);
  });
}

function choose(key, btn) {
  answers[current] = key;
  btn.classList.add("selected");
  document.querySelectorAll(".option").forEach((el) => (el.disabled = true));
  setTimeout(() => {
    if (current < QUESTIONS.length - 1) {
      current++;
      renderQuestion();
    } else {
      $("#quiz-bar").style.width = "100%";
      finishQuiz();
    }
  }, 250);
}

$("#quiz-back").addEventListener("click", () => {
  if (current > 0) {
    current--;
    renderQuestion();
  }
});

// ---------- Scoring ----------

function score(answerKeys) {
  const letters = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  const love = { words: 0, time: 0, gifts: 0, acts: 0, touch: 0 };
  let firstLove = null;

  QUESTIONS.forEach((q, i) => {
    const key = answerKeys[i];
    if (q.kind === "love") {
      love[key]++;
      if (!firstLove) firstLove = key;
    } else {
      letters[key[0]]++;
      letters[key[1]]++;
    }
  });

  const type = AXES.map((a) => (letters[a.left] > letters[a.right] ? a.left : a.right)).join("");

  // Highest love score wins; a tie goes to the answer from the first love question.
  const loveTotal = Object.values(love).reduce((a, b) => a + b, 0);
  const topLove = Object.keys(love).sort((a, b) => love[b] - love[a] || (b === firstLove) - (a === firstLove))[0];

  return { type, letters, love, loveTotal, topLove };
}

function finishQuiz() {
  lastResult = { ...score(answers), date: Date.now() };
  store.set(STORAGE_KEY, lastResult);
  go("result");
}

// ---------- Rendering ----------

function renderResult(r) {
  const t = TYPES[r.type];
  $("#result-emoji").textContent = t.emoji;
  $("#result-code").textContent = r.type;
  $("#result-name").textContent = t.name;
  $("#result-tagline").textContent = t.tagline;
  $("#result-desc").textContent = t.desc;
  $("#result-love-style").textContent = t.love;
  $("#result-fact").textContent = t.fact;
  $("#result-strengths").innerHTML = t.strengths.map((s) => `<li>${s}</li>`).join("");

  $("#result-axes").innerHTML = AXES.map((a) => {
    const l = r.letters[a.left];
    const rt = r.letters[a.right];
    const total = l + rt || 1;
    const leftWins = l > rt;
    const pct = Math.round((Math.max(l, rt) / total) * 100);
    const fill = leftWins ? `left:0;width:${pct}%` : `right:0;width:${pct}%`;
    return `<div>
      <div class="axis-labels">
        <span class="${leftWins ? "win" : ""}">${a.left} · ${a.leftName}</span>
        <span class="${leftWins ? "" : "win"}">${a.rightName} · ${a.right}</span>
      </div>
      <div class="axis-track"><div class="axis-fill" style="${fill}"></div></div>
    </div>`;
  }).join("");

  const ll = LOVE_LANGUAGES[r.topLove];
  $("#love-emoji").textContent = ll.emoji;
  $("#love-name").textContent = ll.name;
  $("#love-desc").textContent = ll.desc;
  $("#love-tip").textContent = ll.tip;
  $("#love-bars").innerHTML = Object.keys(LOVE_LANGUAGES)
    .sort((a, b) => r.love[b] - r.love[a])
    .map((k) => {
      const pct = Math.round((r.love[k] / (r.loveTotal || 1)) * 100);
      return `<div class="love-row">
        <span>${LOVE_LANGUAGES[k].emoji} ${LOVE_LANGUAGES[k].name}</span>
        <div class="axis-track"><div class="axis-fill" style="left:0;width:${pct}%"></div></div>
        <span class="pct">${pct}%</span>
      </div>`;
    }).join("");
  $("#share-status").textContent = "";
}

function renderLastResult() {
  const box = $("#last-result");
  if (!lastResult) {
    box.hidden = true;
    return;
  }
  const t = TYPES[lastResult.type];
  const ll = LOVE_LANGUAGES[lastResult.topLove];
  box.hidden = false;
  box.innerHTML = `<button data-go="result">Your last result: ${t.emoji} ${lastResult.type} · ${ll.emoji} ${ll.name} →</button>`;
}

// ---------- Actions ----------

$("#retake-btn").addEventListener("click", () => go("quiz"));

$("#share-btn").addEventListener("click", async () => {
  const t = TYPES[lastResult.type];
  const ll = LOVE_LANGUAGES[lastResult.topLove];
  const text = `I'm ${lastResult.type}, ${t.name} ${t.emoji}, and my love language is ${ll.name} ${ll.emoji}. Find yours in 10 questions:`;
  const url = location.href.split("#")[0];
  try {
    if (navigator.share) {
      await navigator.share({ title: "My Soulprint", text, url });
      return;
    }
    await navigator.clipboard.writeText(`${text} ${url}`);
    $("#share-status").textContent = "Copied to clipboard! Paste it anywhere 💌";
  } catch (err) {
    if (err && err.name === "AbortError") return;
    $("#share-status").textContent = `${text} ${url}`;
  }
});

// ---------- Boot ----------

show(location.hash.slice(1) || "home");
