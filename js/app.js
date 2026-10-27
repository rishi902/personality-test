// Navigation, quiz flow, scoring and results.

const STORAGE_KEY = "kindred:last-result";

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
let lastResult = loadResult();

function loadResult() {
  const r = store.get(STORAGE_KEY);
  return r && TYPES[r.type] && CATEGORIES[r.topCat] && LOVE_LANGUAGES[r.topLove] ? r : null;
}

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

function renderQuestion() {
  const q = QUESTIONS[current];
  $("#quiz-count").textContent = `Question ${current + 1} of ${QUESTIONS.length}`;
  $("#quiz-bar").style.width = `${(current / QUESTIONS.length) * 100}%`;
  $("#quiz-question").textContent = q.text;
  $("#quiz-back").disabled = current === 0;

  const container = $("#quiz-options");
  container.classList.toggle("many", q.options.length > 5);
  container.innerHTML = "";
  shuffledOptions[current].forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt.text;
    if (answers[current] === opt) btn.classList.add("selected");
    btn.addEventListener("click", () => choose(opt, btn));
    container.appendChild(btn);
  });
}

function choose(opt, btn) {
  answers[current] = opt;
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
  }, 200);
}

$("#quiz-back").addEventListener("click", () => {
  if (current > 0) {
    current--;
    renderQuestion();
  }
});

// ---------- Scoring ----------

// Highest score wins; a tie goes to whatever was picked on the first question that asked about it directly.
function topKey(scores, tieBreaker) {
  return Object.keys(scores).sort((a, b) => scores[b] - scores[a] || (b === tieBreaker) - (a === tieBreaker))[0];
}

function score(picked) {
  const letters = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  const cats = Object.fromEntries(Object.keys(CATEGORIES).map((k) => [k, 0]));
  const love = Object.fromEntries(Object.keys(LOVE_LANGUAGES).map((k) => [k, 0]));
  let firstCat = null;
  let firstLove = null;

  QUESTIONS.forEach((q, i) => {
    const opt = picked[i];
    if (opt.letters) {
      letters[opt.letters[0]]++;
      letters[opt.letters[1]]++;
    }
    if (opt.cat) {
      cats[opt.cat] += q.kind === "category" ? 2 : 1;
      if (q.kind === "category" && !firstCat) firstCat = opt.cat;
    }
    if (opt.love) {
      love[opt.love] += q.kind === "love" ? 2 : 1;
      if (q.kind === "love" && !firstLove) firstLove = opt.love;
    }
  });

  const type = AXES.map((a) => (letters[a.left] > letters[a.right] ? a.left : a.right)).join("");
  return { type, letters, cats, love, topCat: topKey(cats, firstCat), topLove: topKey(love, firstLove) };
}

function finishQuiz() {
  lastResult = { ...score(answers), date: Date.now() };
  store.set(STORAGE_KEY, lastResult);
  go("result");
}

// ---------- Rendering ----------

function barRows(scores, info, limit) {
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  return Object.keys(scores)
    .sort((a, b) => scores[b] - scores[a])
    .slice(0, limit)
    .map((k) => {
      const pct = Math.round((scores[k] / total) * 100);
      return `<div class="bar-row">
        <span>${info[k].emoji} ${info[k].name}</span>
        <div class="track"><div class="fill" style="left:0;width:${pct}%"></div></div>
        <span class="pct">${pct}%</span>
      </div>`;
    }).join("");
}

const listItems = (items) => items.map((s) => `<li>${s}</li>`).join("");

function renderResult(r) {
  const c = CATEGORIES[r.topCat];
  $("#cat-emoji").textContent = c.emoji;
  $("#cat-name").textContent = c.name;
  $("#cat-desc").textContent = c.desc;
  $("#cat-meet").innerHTML = listItems(c.meet);
  $("#cat-starters").innerHTML = listItems(c.starters.map((s) => `"${s}"`));
  $("#cat-bars").innerHTML = barRows(r.cats, CATEGORIES, 3);

  const ll = LOVE_LANGUAGES[r.topLove];
  $("#love-emoji").textContent = ll.emoji;
  $("#love-name").textContent = ll.name;
  $("#love-desc").textContent = ll.desc;
  $("#love-tip").textContent = ll.tip;
  $("#love-bars").innerHTML = barRows(r.love, LOVE_LANGUAGES);

  const t = TYPES[r.type];
  $("#type-code").textContent = r.type;
  $("#type-name").textContent = t.name;
  $("#type-tagline").textContent = t.tagline;
  $("#type-desc").textContent = t.desc;
  $("#type-strengths").innerHTML = listItems(t.strengths);
  $("#type-axes").innerHTML = AXES.map((a) => {
    const l = r.letters[a.left];
    const rt = r.letters[a.right];
    const leftWins = l > rt;
    const pct = Math.round((Math.max(l, rt) / (l + rt || 1)) * 100);
    const fill = leftWins ? `left:0;width:${pct}%` : `right:0;width:${pct}%`;
    return `<div>
      <div class="axis-labels">
        <span class="${leftWins ? "win" : ""}">${a.left} · ${a.leftName}</span>
        <span class="${leftWins ? "" : "win"}">${a.rightName} · ${a.right}</span>
      </div>
      <div class="track"><div class="fill" style="${fill}"></div></div>
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
  const c = CATEGORIES[lastResult.topCat];
  const ll = LOVE_LANGUAGES[lastResult.topLove];
  box.hidden = false;
  box.innerHTML = `<button data-go="result">Your last result: ${c.emoji} ${c.name} · ${ll.name} · ${lastResult.type} →</button>`;
}

// ---------- Actions ----------

$("#retake-btn").addEventListener("click", () => go("quiz"));

$("#share-btn").addEventListener("click", async () => {
  const c = CATEGORIES[lastResult.topCat];
  const ll = LOVE_LANGUAGES[lastResult.topLove];
  const text = `I connect with people through ${c.name} ${c.emoji}, my love language is ${ll.name} and my personality type is ${lastResult.type}. Find yours in 10 questions:`;
  const url = location.href.split("#")[0];
  try {
    if (navigator.share) {
      await navigator.share({ title: "My Kindred results", text, url });
      return;
    }
    await navigator.clipboard.writeText(`${text} ${url}`);
    $("#share-status").textContent = "Copied to clipboard!";
  } catch (err) {
    if (err && err.name === "AbortError") return;
    $("#share-status").textContent = `${text} ${url}`;
  }
});

// ---------- Boot ----------

show(location.hash.slice(1) || "home");
