// Quiz content, personality types and love languages.

// "mbti-a" questions decide E/I and S/N (each option is a combo like "EN").
// "mbti-b" questions decide T/F and J/P (each option is a combo like "FP").
// Three questions of each kind means every letter pair gets exactly 3 votes, so there are no ties.
// "love" questions each add a point to one love language.
const QUESTIONS = [
  {
    kind: "mbti-a",
    text: "Your ideal Friday night looks like…",
    options: [
      { key: "ES", text: "Out with a big group trying the new food spot everyone's talking about 🌮" },
      { key: "EN", text: "A party where you end up in a 2am conversation about the universe 🌌" },
      { key: "IS", text: "A cozy night in with your comfort show and favourite snacks 🍿" },
      { key: "IN", text: "Headphones on, notebook out, building a whole world in your head 🎧" },
    ],
  },
  {
    kind: "mbti-b",
    text: "A friend comes to you upset. You…",
    options: [
      { key: "TJ", text: "Help them make a clear plan to fix the problem 📝" },
      { key: "TP", text: "Ask questions until you figure out what really went wrong 🔍" },
      { key: "FJ", text: "Check in on them every day until they feel better 🫶" },
      { key: "FP", text: "Listen, validate, and maybe cry with them a little 🥺" },
    ],
  },
  {
    kind: "love",
    text: "After a rough week, what would make you feel most cared for?",
    options: [
      { key: "words", text: "A heartfelt message saying how proud they are of you 💬" },
      { key: "acts", text: "Someone quietly taking care of your chores 🧺" },
      { key: "touch", text: "A long, tight hug 🤗" },
      { key: "gifts", text: "A little surprise treat that made them think of you 🎁" },
      { key: "time", text: "A whole evening together, phones away 🕯️" },
    ],
  },
  {
    kind: "mbti-a",
    text: "You walk into a room full of strangers. You…",
    options: [
      { key: "ES", text: "Introduce yourself and ask what everyone's up to 👋" },
      { key: "EN", text: "Start a fun 'what if' conversation with whoever's nearest 💭" },
      { key: "IS", text: "Find the snack table and read the room first 🧃" },
      { key: "IN", text: "Quietly imagine the life stories of everyone there 📖" },
    ],
  },
  {
    kind: "mbti-b",
    text: "How do you handle a big project?",
    options: [
      { key: "TJ", text: "Schedule, milestones, colour-coded spreadsheet ✅" },
      { key: "TP", text: "Find the smartest shortcut, then improvise the rest ⚙️" },
      { key: "FJ", text: "Make sure everyone on the team is happy and on track 🤝" },
      { key: "FP", text: "Wait for inspiration, then make something meaningful at 3am 🌙" },
    ],
  },
  {
    kind: "love",
    text: "Your dream birthday would be…",
    options: [
      { key: "words", text: "Cards and messages telling you what you mean to everyone 💌" },
      { key: "time", text: "A whole day with your favourite people, no distractions 🗓️" },
      { key: "gifts", text: "A thoughtful present they clearly planned for months 🎀" },
      { key: "acts", text: "Someone else planning everything so you can just relax 🧁" },
      { key: "touch", text: "Lots of hugs, then cuddling up for a movie 🤍" },
    ],
  },
  {
    kind: "mbti-a",
    text: "Pick a vacation:",
    options: [
      { key: "ES", text: "A beach resort with music, activities and new friends 🏖️" },
      { key: "EN", text: "Backpacking with no fixed plan and a group of strangers 🎒" },
      { key: "IS", text: "A familiar cabin you love, with a good book 🏡" },
      { key: "IN", text: "A misty village with old bookshops and secret paths 🌫️" },
    ],
  },
  {
    kind: "mbti-b",
    text: "Which compliment would mean the most?",
    options: [
      { key: "TJ", text: "\"You're so reliable, you always get things done.\"" },
      { key: "TP", text: "\"You're brilliant, you notice things nobody else does.\"" },
      { key: "FJ", text: "\"You make everyone around you feel looked after.\"" },
      { key: "FP", text: "\"You're so genuine, there's nobody else like you.\"" },
    ],
  },
  {
    kind: "love",
    text: "What hurts the most in a relationship?",
    options: [
      { key: "words", text: "Harsh words, or never hearing \"I appreciate you\"" },
      { key: "time", text: "Cancelled plans, or being half-listened to" },
      { key: "gifts", text: "A forgotten birthday or anniversary" },
      { key: "acts", text: "Them not helping when you're clearly overwhelmed" },
      { key: "touch", text: "Feeling physically distant, with no hugs or hand-holding" },
    ],
  },
  {
    kind: "love",
    text: "How do you usually show love to others?",
    options: [
      { key: "words", text: "Long texts and hyping them up 📣" },
      { key: "time", text: "Making plans and being fully present 📅" },
      { key: "gifts", text: "Picking up little things that remind you of them 🛍️" },
      { key: "acts", text: "Doing favours without being asked 🛠️" },
      { key: "touch", text: "Hugs, high fives, leaning on their shoulder 🫂" },
    ],
  },
];

const AXES = [
  { left: "E", right: "I", leftName: "Extraverted", rightName: "Introverted" },
  { left: "S", right: "N", leftName: "Observant", rightName: "Intuitive" },
  { left: "T", right: "F", leftName: "Thinking", rightName: "Feeling" },
  { left: "J", right: "P", leftName: "Planning", rightName: "Prospecting" },
];

const TYPES = {
  INTJ: {
    name: "The Mastermind", emoji: "🧠",
    tagline: "Ten steps ahead, and already planning the eleventh.",
    desc: "You see the big picture and quietly build the path to get there. You value competence, independence and ideas that actually work.",
    strengths: ["Strategic", "Independent", "Determined", "Insightful"],
    love: "You love with loyalty and long-term plans. Once someone earns your trust, you're all in.",
    fact: "You've probably mentally rearranged a whole system while someone was explaining it to you.",
  },
  INTP: {
    name: "The Curious Inventor", emoji: "🔬",
    tagline: "Has 47 browser tabs open, all of them fascinating.",
    desc: "You're driven by curiosity and love taking ideas apart to see how they work. Your mind is a playground of theories and what-ifs.",
    strengths: ["Analytical", "Original", "Open-minded", "Objective"],
    love: "You show love by sharing your weirdest thoughts and solving problems for the people you care about.",
    fact: "You can lose track of time completely while researching something nobody asked about.",
  },
  ENTJ: {
    name: "The Bold Leader", emoji: "👑",
    tagline: "Sees a goal, makes a plan, gets it done.",
    desc: "You're confident, decisive and natural at taking charge. You love a challenge and bring out the ambition in everyone around you.",
    strengths: ["Confident", "Efficient", "Visionary", "Driven"],
    love: "You love by building a future together and pushing your people to be their best.",
    fact: "Group projects secretly run on your energy.",
  },
  ENTP: {
    name: "The Idea Spark", emoji: "💡",
    tagline: "Will argue the other side just to see what happens.",
    desc: "You're quick, witty and full of ideas. You love debates, brainstorming and turning 'that's impossible' into 'watch me'.",
    strengths: ["Inventive", "Witty", "Energetic", "Adaptable"],
    love: "You love through playful banter and keeping things exciting.",
    fact: "You've started more projects than you can count, and every one was a great idea.",
  },
  INFJ: {
    name: "The Quiet Visionary", emoji: "🔮",
    tagline: "Reads the room, and then reads your soul.",
    desc: "You're deep, intuitive and guided by strong values. You understand people in a way that sometimes surprises even them.",
    strengths: ["Insightful", "Principled", "Compassionate", "Creative"],
    love: "You want a deep, meaningful connection, not small talk. When you love, it's with your whole heart.",
    fact: "People tell you their life story within ten minutes of meeting you.",
  },
  INFP: {
    name: "The Dreamy Idealist", emoji: "🌙",
    tagline: "Soft heart, big imagination, strong values.",
    desc: "You're gentle, creative and deeply in touch with your feelings. You see beauty and meaning everywhere and dream of a kinder world.",
    strengths: ["Empathetic", "Imaginative", "Authentic", "Open-hearted"],
    love: "You love like a poem. You're devoted and romantic, and you remember every little detail.",
    fact: "You have at least one fictional world, playlist or character that lives rent-free in your head.",
  },
  ENFJ: {
    name: "The Warm Mentor", emoji: "🌟",
    tagline: "Everyone's biggest cheerleader.",
    desc: "You're charismatic, caring and great at bringing people together. You naturally see the potential in others and help them grow.",
    strengths: ["Inspiring", "Empathetic", "Organised", "Reliable"],
    love: "You love by giving generously and making your person feel truly seen.",
    fact: "You've definitely given someone a pep talk that changed their week.",
  },
  ENFP: {
    name: "The Free Spirit", emoji: "🦋",
    tagline: "Pure sunshine with a side of chaos.",
    desc: "You're enthusiastic, imaginative and endlessly curious about people. You make every day feel like an adventure.",
    strengths: ["Enthusiastic", "Creative", "Warm", "Spontaneous"],
    love: "You love with excitement and wonder, always finding new ways to make your person smile.",
    fact: "You can become best friends with a stranger in a single queue.",
  },
  ISTJ: {
    name: "The Steady Rock", emoji: "📚",
    tagline: "Dependable, practical, and always on time.",
    desc: "You're responsible, honest and grounded. People trust you because you do what you say and say what you mean.",
    strengths: ["Reliable", "Thorough", "Honest", "Calm"],
    love: "You show love through consistency and quietly keeping your promises.",
    fact: "Your notes app is probably better organised than most companies.",
  },
  ISFJ: {
    name: "The Gentle Protector", emoji: "🛡️",
    tagline: "Remembers your coffee order and your bad days.",
    desc: "You're warm, loyal and incredibly thoughtful. You notice what people need and quietly take care of it.",
    strengths: ["Caring", "Loyal", "Observant", "Patient"],
    love: "You love through small acts of care that say 'I was thinking of you'.",
    fact: "You've kept a sentimental item from years ago that nobody else knows about.",
  },
  ESTJ: {
    name: "The Organizer", emoji: "📋",
    tagline: "Makes the plan and makes sure it happens.",
    desc: "You're practical, direct and great at making things run smoothly. You value order, fairness and getting results.",
    strengths: ["Organised", "Decisive", "Dedicated", "Direct"],
    love: "You love by being someone your person can always rely on.",
    fact: "You've planned a group trip down to the minute and it went perfectly.",
  },
  ESFJ: {
    name: "The Heart of the Group", emoji: "🤝",
    tagline: "Hosts the party and checks everyone has a drink.",
    desc: "You're friendly, caring and great at creating harmony. You make everyone feel welcome and included.",
    strengths: ["Supportive", "Sociable", "Loyal", "Practical"],
    love: "You love warmly and openly, and you celebrate every milestone.",
    fact: "You remember everyone's birthday without a reminder.",
  },
  ISTP: {
    name: "The Fixer", emoji: "🔧",
    tagline: "Cool under pressure, hands-on with everything.",
    desc: "You're practical, curious and love figuring out how things work. You stay calm in a crisis and learn by doing.",
    strengths: ["Resourceful", "Calm", "Practical", "Independent"],
    love: "You love through actions over words: fixing, helping and showing up.",
    fact: "You've taken something apart just to see if you could put it back together.",
  },
  ISFP: {
    name: "The Gentle Artist", emoji: "🎨",
    tagline: "Lives life like it's an art project.",
    desc: "You're sensitive, artistic and live in the moment. You express yourself through style, creativity and kindness.",
    strengths: ["Artistic", "Kind", "Flexible", "Sensitive"],
    love: "You love quietly but deeply, through thoughtful gestures and shared experiences.",
    fact: "Your playlists are an emotional masterpiece.",
  },
  ESTP: {
    name: "The Thrill Seeker", emoji: "⚡",
    tagline: "Lives for the moment and the adrenaline.",
    desc: "You're bold, energetic and quick on your feet. You'd rather try something than talk about it.",
    strengths: ["Bold", "Perceptive", "Energetic", "Practical"],
    love: "You love with spontaneity and fun, and there's never a dull moment.",
    fact: "Your best stories start with 'so we decided to just go for it'.",
  },
  ESFP: {
    name: "The Spotlight", emoji: "🎤",
    tagline: "Turns any day into a celebration.",
    desc: "You're fun, warm and full of life. You bring energy wherever you go and help everyone enjoy the moment.",
    strengths: ["Fun", "Generous", "Spontaneous", "Warm"],
    love: "You love loudly and joyfully, and you make your person feel like a star.",
    fact: "You've turned a boring errand into the best part of someone's day.",
  },
};

const LOVE_LANGUAGES = {
  words: {
    name: "Words of Affirmation", emoji: "💬",
    desc: "Kind words, compliments and heartfelt messages mean the world to you. Hearing 'I appreciate you' fills your cup.",
    tip: "Say it out loud, write the note, send the text. Specific compliments hit hardest.",
  },
  time: {
    name: "Quality Time", emoji: "🕯️",
    desc: "Undivided attention is how you feel loved. It's not about what you do together, it's about being truly present.",
    tip: "Put the phone away, make plans, and really listen.",
  },
  gifts: {
    name: "Receiving Gifts", emoji: "🎁",
    desc: "Thoughtful gifts are symbols of love to you. It's not the price, it's knowing someone thought of you.",
    tip: "Little 'saw this and thought of you' surprises go a long way.",
  },
  acts: {
    name: "Acts of Service", emoji: "🧺",
    desc: "Actions speak louder than words for you. When someone helps lighten your load, you feel deeply cared for.",
    tip: "Offer help before being asked, and follow through on promises.",
  },
  touch: {
    name: "Physical Touch", emoji: "🤗",
    desc: "Hugs, hand-holding and closeness are how you feel safe and connected.",
    tip: "A hug, a hand on the shoulder or sitting close says more than words.",
  },
};
