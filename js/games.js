// Mini games: memory match, hangout idea generator, type compatibility.

// ---------- Tabs ----------

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t === tab));
    document.querySelectorAll(".game").forEach((g) => g.classList.toggle("active", g.id === `game-${tab.dataset.game}`));
  });
});

// ---------- Memory Match ----------

const MEM_EMOJIS = Object.values(CATEGORIES).map((c) => c.emoji);
const MEM_BEST_KEY = "kindred:memory-best";

const mem = { flipped: [], matched: 0, moves: 0, seconds: 0, timer: null, locked: false };

function memReset() {
  clearInterval(mem.timer);
  Object.assign(mem, { flipped: [], matched: 0, moves: 0, seconds: 0, timer: null, locked: false });
  $("#mem-moves").textContent = "0";
  $("#mem-time").textContent = "0s";
  $("#mem-msg").textContent = "";
  const best = store.get(MEM_BEST_KEY);
  $("#mem-best").textContent = best ? `${best} moves` : "–";

  const grid = $("#mem-grid");
  grid.innerHTML = "";
  shuffle([...MEM_EMOJIS, ...MEM_EMOJIS]).forEach((emoji) => {
    const card = document.createElement("button");
    card.className = "mem-card";
    card.dataset.emoji = emoji;
    card.setAttribute("aria-label", "Hidden card");
    card.innerHTML = `<span>${emoji}</span>`;
    card.addEventListener("click", () => memFlip(card));
    grid.appendChild(card);
  });
}

function memFlip(card) {
  if (mem.locked || card.classList.contains("flipped") || card.classList.contains("matched")) return;
  if (!mem.timer) {
    mem.timer = setInterval(() => {
      mem.seconds++;
      $("#mem-time").textContent = `${mem.seconds}s`;
    }, 1000);
  }

  card.classList.add("flipped");
  card.setAttribute("aria-label", card.dataset.emoji);
  mem.flipped.push(card);
  if (mem.flipped.length < 2) return;

  mem.moves++;
  $("#mem-moves").textContent = mem.moves;
  const [a, b] = mem.flipped;
  mem.flipped = [];

  if (a.dataset.emoji === b.dataset.emoji) {
    a.classList.add("matched");
    b.classList.add("matched");
    mem.matched++;
    if (mem.matched === MEM_EMOJIS.length) memWin();
  } else {
    mem.locked = true;
    setTimeout(() => {
      [a, b].forEach((c) => {
        c.classList.remove("flipped");
        c.setAttribute("aria-label", "Hidden card");
      });
      mem.locked = false;
    }, 800);
  }
}

function memWin() {
  clearInterval(mem.timer);
  const best = store.get(MEM_BEST_KEY);
  let msg = `You matched them all in ${mem.moves} moves and ${mem.seconds}s! 🎉`;
  if (!best || mem.moves < best) {
    store.set(MEM_BEST_KEY, mem.moves);
    $("#mem-best").textContent = `${mem.moves} moves`;
    if (best) msg += " New best!";
  }
  $("#mem-msg").textContent = msg;
}

$("#mem-reset").addEventListener("click", memReset);
memReset();

// ---------- Hangout Idea Generator ----------

const DREAM = {
  openers: [
    "Grab a friend and", "Invite a few people to", "This weekend,", "Text the group chat:",
    "Pick someone you want to know better and",
  ],
  activities: [
    "make a shared playlist, then listen to it on a long drive",
    "cook a dish neither of you has ever tried",
    "have a board game tournament",
    "watch a movie you both pick at random",
    "go on a sunrise walk somewhere new",
    "swap favourite books and meet up to talk about them",
    "try a beginner class in something none of you can do",
    "play a pickup game at the local park",
    "visit a market and each buy the weirdest snack you can find",
  ],
  twists: [
    "No phones allowed.",
    "Loser picks the next plan.",
    "Everyone has to bring one thing to share.",
    "Take one photo each and compare at the end.",
    "Budget: whatever's in your pocket.",
    "Finish with dessert somewhere you've never been.",
  ],
};

const DREAM_KEY = "kindred:hangouts";
let currentDream = "";

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function renderDreams() {
  const dreams = store.get(DREAM_KEY) || [];
  const list = $("#dream-list");
  list.innerHTML = "";
  if (!dreams.length) {
    list.innerHTML = `<li class="muted">Nothing saved yet.</li>`;
    return;
  }
  dreams.forEach((d) => {
    const li = document.createElement("li");
    li.textContent = d;
    list.appendChild(li);
  });
}

$("#dream-btn").addEventListener("click", () => {
  currentDream = `${pick(DREAM.openers)} ${pick(DREAM.activities)}. ${pick(DREAM.twists)}`;
  $("#dream-text").textContent = currentDream;
});

$("#dream-save").addEventListener("click", () => {
  if (!currentDream) return;
  const dreams = store.get(DREAM_KEY) || [];
  if (!dreams.includes(currentDream)) {
    store.set(DREAM_KEY, [currentDream, ...dreams].slice(0, 10));
  }
  renderDreams();
});

renderDreams();

// ---------- Type Compatibility ----------

function compatScore(a, b) {
  let s = 50;
  s += a[1] === b[1] ? 15 : 0; // sharing S/N makes conversations click
  s += a[0] !== b[0] ? 10 : 4; // introvert + extravert balance each other
  s += a[2] === b[2] ? 8 : 6;  // shared T/F means shared values
  s += a[3] !== b[3] ? 10 : 3; // a planner and a go-with-the-flow type complement each other
  // A tiny bit of personality per pair, same for either order.
  const pair = [a, b].sort().join("");
  const wobble = [...pair].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 7;
  return Math.min(99, s + wobble);
}

function compatBlurb(score, a, b) {
  const na = TYPES[a].name;
  const nb = TYPES[b].name;
  if (a === b) return `Two of ${na}? You'll understand each other perfectly.`;
  if (score >= 88) return `${na} + ${nb} is a great match. You balance each other out and bring out each other's best sides.`;
  if (score >= 76) return `${na} and ${nb} make a lovely pair, with plenty in common and just enough difference to keep things interesting.`;
  if (score >= 66) return `${na} and ${nb} can be great together with a little patience. You'll teach each other a lot.`;
  return `${na} and ${nb} see the world very differently, which can be exciting. Good communication goes a long way here.`;
}

function fillTypeSelect(sel, value) {
  sel.innerHTML = Object.keys(TYPES)
    .map((k) => `<option value="${k}">${TYPES[k].emoji} ${k} · ${TYPES[k].name}</option>`)
    .join("");
  sel.value = value;
}

fillTypeSelect($("#compat-a"), (lastResult && lastResult.type) || "INFP");
fillTypeSelect($("#compat-b"), "ENFJ");

$("#compat-btn").addEventListener("click", () => {
  const a = $("#compat-a").value;
  const b = $("#compat-b").value;
  const s = compatScore(a, b);
  $("#compat-result").hidden = false;
  $("#compat-fill").style.width = "0";
  requestAnimationFrame(() => requestAnimationFrame(() => ($("#compat-fill").style.width = `${s}%`)));
  $("#compat-score").textContent = s;
  $("#compat-blurb").textContent = compatBlurb(s, a, b);
});
