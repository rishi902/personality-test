// Quiz content: questions, connection categories, personality types and love languages.
//
// Every question feeds more than one result:
// - "personality-a" questions decide E/I and S/N (letters like "EN") and also vote for a connection category.
// - "personality-b" questions decide T/F and J/P (letters like "FP") and also vote for a love language.
//   With three of each, every letter pair gets exactly 3 votes, so the type never ties.
// - "category" and "love" questions ask directly, so their answers count double.
const QUESTIONS = [
  {
    kind: "personality-a",
    text: "It's Saturday and you've got free time with friends. You'd pick…",
    options: [
      { letters: "ES", cat: "sports", text: "A pickup game or a match at the stadium" },
      { letters: "EN", cat: "music", text: "A live concert or a festival" },
      { letters: "IS", cat: "food", text: "Cooking a big meal together at home" },
      { letters: "IN", cat: "movies", text: "A movie marathon, then picking apart the plot" },
    ],
  },
  {
    kind: "personality-b",
    text: "A friend is going through a hard time. You…",
    options: [
      { letters: "TJ", love: "acts", text: "Help them make a plan to fix it" },
      { letters: "TP", love: "time", text: "Take them out to do something fun to get their mind off it" },
      { letters: "FJ", love: "words", text: "Send them encouraging messages every day" },
      { letters: "FP", love: "touch", text: "Go straight over and give them the biggest hug" },
    ],
  },
  {
    kind: "category",
    text: "What would make you click with a stranger instantly?",
    options: [
      { cat: "music", text: "You have the same favourite artist 🎵" },
      { cat: "sports", text: "You support the same team ⚽" },
      { cat: "food", text: "You're both obsessed with the same food spot 🍜" },
      { cat: "gaming", text: "You play the same game 🎮" },
      { cat: "movies", text: "You have the same comfort show or movie 🎬" },
      { cat: "books", text: "You love the same book series 📚" },
      { cat: "art", text: "You both draw, take photos or make things 🎨" },
      { cat: "nature", text: "You both love hiking, camping or the beach 🏕️" },
    ],
  },
  {
    kind: "love",
    text: "After a rough week, what would make you feel most cared for?",
    options: [
      { love: "words", text: "A message saying how proud they are of you" },
      { love: "acts", text: "Someone quietly taking care of your chores" },
      { love: "touch", text: "A long, tight hug" },
      { love: "gifts", text: "A small surprise that made them think of you" },
      { love: "time", text: "A whole evening together, phones away" },
    ],
  },
  {
    kind: "personality-a",
    text: "You're at a party where you only know the host. You…",
    options: [
      { letters: "ES", cat: "gaming", text: "Jump into whatever game is going on" },
      { letters: "EN", cat: "music", text: "Take over the music and get people singing" },
      { letters: "IS", cat: "food", text: "Help out in the kitchen, it's easier to chat there" },
      { letters: "IN", cat: "books", text: "Find the one person who's read the same book as you" },
    ],
  },
  {
    kind: "personality-b",
    text: "It's your best friend's birthday. You…",
    options: [
      { letters: "TJ", love: "acts", text: "Organise everything: the place, the guest list, the timing" },
      { letters: "TP", love: "time", text: "Plan a spontaneous day out they'll never forget" },
      { letters: "FJ", love: "words", text: "Write a heartfelt card or give a speech" },
      { letters: "FP", love: "gifts", text: "Hunt down the perfect, personal gift" },
    ],
  },
  {
    kind: "category",
    text: "Your perfect hangout with a new friend:",
    options: [
      { cat: "music", text: "Making a playlist together or going to a gig" },
      { cat: "sports", text: "Shooting hoops, a gym session or watching the big game" },
      { cat: "food", text: "Trying a new restaurant or baking together" },
      { cat: "gaming", text: "Gaming all night, co-op or competitive" },
      { cat: "movies", text: "Movie night with running commentary" },
      { cat: "books", text: "A bookshop trip, then coffee and a long talk" },
      { cat: "art", text: "A pottery or painting class" },
      { cat: "nature", text: "A sunrise hike or a day at the lake" },
    ],
  },
  {
    kind: "personality-a",
    text: "Pick a trip:",
    options: [
      { letters: "ES", cat: "sports", text: "A surf or ski trip with lessons and new people" },
      { letters: "EN", cat: "nature", text: "Backpacking somewhere new with no fixed plan" },
      { letters: "IS", cat: "gaming", text: "A cozy cabin with board games and a console" },
      { letters: "IN", cat: "art", text: "A quiet seaside town with a sketchbook and a camera" },
    ],
  },
  {
    kind: "love",
    text: "How do you usually show people you care?",
    options: [
      { love: "words", text: "Long texts and hyping them up" },
      { love: "time", text: "Making plans and being fully present" },
      { love: "gifts", text: "Picking up little things that remind you of them" },
      { love: "acts", text: "Doing favours without being asked" },
      { love: "touch", text: "Hugs, high fives, leaning on their shoulder" },
    ],
  },
  {
    kind: "personality-b",
    text: "Which compliment would mean the most to you?",
    options: [
      { letters: "TJ", text: "\"You're so reliable, you always get things done.\"" },
      { letters: "TP", text: "\"You're so smart, you notice things nobody else does.\"" },
      { letters: "FJ", text: "\"You make everyone around you feel looked after.\"" },
      { letters: "FP", text: "\"You're so genuine, there's nobody else like you.\"" },
    ],
  },
];

const CATEGORIES = {
  music: {
    name: "Music", emoji: "🎵",
    desc: "Songs are how you connect. Sharing a playlist, singing along at a concert or finding someone with the same taste instantly makes them feel like your people.",
    meet: ["Go to local gigs and open mic nights", "Join a choir, band or music club", "Share playlists and ask for recommendations"],
    starters: ["What song have you had on repeat lately?", "What was the best concert you've ever been to?"],
  },
  sports: {
    name: "Sports & Fitness", emoji: "⚽",
    desc: "You bond through movement and team spirit. Playing together, cheering for the same team or training side by side builds your strongest friendships.",
    meet: ["Join a rec league or run club", "Watch games at a sports bar or with friends", "Try a group fitness or climbing class"],
    starters: ["Who's your team, and how long have you supported them?", "What sport would you try if you could be instantly good at it?"],
  },
  food: {
    name: "Food & Cooking", emoji: "🍜",
    desc: "For you, sharing a meal is sharing a moment. You connect over new restaurants, family recipes and cooking for the people you care about.",
    meet: ["Take a cooking class", "Host a potluck or dinner night", "Explore food markets with friends"],
    starters: ["What's the best thing you've ever eaten?", "What's a dish from home you could eat every day?"],
  },
  gaming: {
    name: "Gaming", emoji: "🎮",
    desc: "You connect through play, whether that's a co-op mission, a heated board game night or swapping tips on your favourite game.",
    meet: ["Join a gaming Discord or local game night", "Go to board game cafés", "Team up in online co-op games"],
    starters: ["What game could you replay forever?", "Co-op or competitive, which are you?"],
  },
  movies: {
    name: "Movies & TV", emoji: "🎬",
    desc: "Stories on screen are your shared language. Quoting the same show, binge-watching together and debating endings is how you get close.",
    meet: ["Host watch parties", "Join a film club or go to indie cinema nights", "Talk about shows in fan communities"],
    starters: ["What's your ultimate comfort show?", "Which movie ending would you change?"],
  },
  books: {
    name: "Books & Stories", emoji: "📚",
    desc: "You connect through ideas and stories. Finding someone who loves the same book or will talk for hours about a character means a lot to you.",
    meet: ["Join a book club", "Go to author events and bookshop nights", "Share what you're reading online"],
    starters: ["What book do you wish you could read again for the first time?", "Which fictional character are you most like?"],
  },
  art: {
    name: "Art & Creativity", emoji: "🎨",
    desc: "Making things is how you connect. Drawing, photography, crafts or design: creating side by side with someone builds a special kind of bond.",
    meet: ["Take a pottery, painting or photography class", "Go to gallery openings and craft markets", "Join a creative community or zine club"],
    starters: ["What's something you've made that you're proud of?", "If you had a free week to create anything, what would it be?"],
  },
  nature: {
    name: "Nature & Adventure", emoji: "🏕️",
    desc: "You feel closest to people outdoors. Hikes, road trips, camping and exploring new places are where your best memories with others happen.",
    meet: ["Join a hiking or outdoors group", "Plan day trips with friends", "Volunteer at parks or clean-up events"],
    starters: ["What's the most beautiful place you've ever been?", "Mountains or beach?"],
  },
};

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
