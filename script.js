/* =========================================================
   Карты кладутся в assets/cards/.
   Каждый день показываются 5 возможных подарков.
   В подарок выдаётся первая карта из текущей пятёрки:
   001, затем 006, затем 011, затем 016, затем снова 001...
   На экране пятёрка перемешивается визуально, чтобы выбор не был очевидным.
   ========================================================= */

const CARD_FILES = [
  "001_969611d-0a66-490c-8e28-dbd6d33bcf0f.webp",
  "002_4d46e334-a3d2-473a-a1e4-ca8587b27a47.webp",
  "003_448a5ac5-fb67-4b30-9c72-16b380dd15f0.webp",
  "004_5512aa01-6333-4a70-83f9-d188a226d2e2.webp",
  "005_ac82ed26-5e8d-481b-9a12-f2df5b78abe4.webp",
  "006_card_2c9ba6d5-7576-4c96-b664-c40528631d38.webp",
  "007_card_03d4ab3c-6572-40ad-a6ee-e24945bb737a.png",
  "008_card_07f49fac-9719-4e16-b805-92249cf1e99d.webp",
  "009_card_15d01197-72b2-4a45-b596-8265aa7b04e8.webp",
  "010_card_4329bda7-8383-4a6f-a8f4-dabbe6571ae0.webp",
  "011_card_395fa1b7-32fd-464a-acd4-4c838408fcdd.webp",
  "012_card_5761e0e4-9d46-4155-966d-bac29ae6102a.webp",
  "013_card_cba7e61f-73e4-44fb-90e2-707c3bec1741.webp",
  "014_card_e576e7ef-2a1a-439d-b47d-3e9705fdf7f4.webp",
  "015_card_fa6858f8-98e6-4f91-a3d6-f15573682cec.webp",
  "016_card_c24d3ef9-2e5c-4184-8f21-2bbb086d93bd.png",
  "017_card_1d358dce-2102-4917-84e9-dda43a4ef3ee.png",
  "018_card_535e27f4-7bf9-467d-acbc-3e6641185b25.png",
  "019_card_97629f86-9f22-4652-bd61-96b25724c010.png",
  "020_card_efc242b8-1f97-4f4f-953f-a6a65b35d6e9.png"
];


/*
  Музыка:
  Положи mp3-файлы в assets/music/.
  Для одной песни оставь один файл.
  Для плейлиста добавь несколько строк.

  Важно: браузеры часто запрещают звук до первого клика.
  Сайт попробует запустить музыку сам, а если браузер запретит —
  она включится после нажатия на кнопку ♫ или после первого клика по странице.
*/
const MUSIC_PLAYLIST = [
  "assets/music/Mylne_Farmer_-_Appelle_mon_numro_47836384.mp3"
  // "assets/music/song-2.mp3",
  // "assets/music/song-3.mp3"
];

const MUSIC_STORAGE = {
  enabled: "alinaSakura.v4.musicEnabled",
  track: "alinaSakura.v4.musicTrack"
};

const MUSIC_VOLUME = 0.42;

const CUSTOM_REWARD_LINES = {
  "001": "МАКИМА??? ОСКОЛОК??? Ну ты даёшь, удачливая моя!",
  "006": "Любишь Ведьмка, люби и Цири возить, да?",
  "011": "А как смотрит то, ухх, там их если что сразу 3)))",
  "016": "Я уже устал придумывать для Мидий эти тексты, надеюсь этот не выпадет"
};

const CARDS_PER_PULL = 5;
const DAY_MS = 24 * 60 * 60 * 1000;

const STORAGE = {
  nextPullAt: "alinaSakura.v3.nextPullAt",
  greeting: "alinaSakura.v3.greeting",
  packCursor: "alinaSakura.v3.packCursor",
  animationCursor: "alinaSakura.v3.animationCursor"
};

const greetings = [
  ["Алина, ты моё чудо.", "Этот маленький сад цветёт ради твоей улыбки."],
  ["Моя любимая жена, доброе утро.", "Пусть сегодня тебе выпадет что-то тёплое, нежное и очень наше."],
  ["Алина, ты красивее сакуры.", "Каждый лепесток здесь летит к тебе с любовью."],
  ["Моя Алина, нажми и забери магию.", "Я хочу, чтобы каждый день у тебя был маленький праздник."],
  ["Алина, ты мой самый редкий подарок.", "Не карта, не шанс, не удача — а настоящее счастье."],
  ["Любимая, этот pull только для тебя.", "Пусть он будет как записка, которую хочется хранить."],
  ["Алина, сегодня мир снова выбирает тебя.", "И я выбираю тебя. Всегда. Без сомнений."],
  ["Моя жена, моя весна, моя сакура.", "С тобой даже обычный день становится легендарным."],
  ["Алина, тебе выпадает нежность.", "И ещё миллион причин улыбнуться."],
  ["Любимая Алина, ты моё навсегда.", "Пусть эта коллекция растёт вместе с нашими воспоминаниями."],
  ["Алина, ты светишься ярче звёзд.", "Даже самые красивые эффекты здесь слабее твоей улыбки."],
  ["Моя принцесса, сегодня сад откроется снова.", "Внутри только тепло, цветы и немного волшебства."]
];

const animationModes = [
  { className: "mode-portal", label: "Цветение судьбы", cardsAt: 1700, revealAt: 7600, finalAt: 8500 },
  { className: "mode-comet", label: "Падающая звезда", cardsAt: 1900, revealAt: 7700, finalAt: 8700 },
  { className: "mode-rail", label: "Звёздный тоннель", cardsAt: 1750, revealAt: 7600, finalAt: 8600 },
  { className: "mode-wave", label: "Лунная волна", cardsAt: 1800, revealAt: 7700, finalAt: 8650 },
  { className: "mode-shatter", label: "Кристальный рассвет", cardsAt: 1650, revealAt: 7500, finalAt: 8500 },
  { className: "mode-lotus", label: "Сакуровый венец", cardsAt: 1750, revealAt: 7650, finalAt: 8600 }
];

const els = {
  app: document.getElementById("app"),
  petals: document.getElementById("petals"),
  stars: document.getElementById("stars"),
  greetingTitle: document.getElementById("greetingTitle"),
  greetingNote: document.getElementById("greetingNote"),
  timer: document.getElementById("timer"),
  pullButton: document.getElementById("pullButton"),
  pull: document.getElementById("pull"),
  stage: document.getElementById("stage"),
  sceneLabel: document.getElementById("sceneLabel"),
  possibleTitle: document.getElementById("possibleTitle"),
  possibleCards: document.getElementById("possibleCards"),
  rewardFocus: document.getElementById("rewardFocus"),
  rewardCardSlot: document.getElementById("rewardCardSlot"),
  rewardCopy: document.getElementById("rewardCopy"),
  tunnel: document.getElementById("tunnel"),
  ribbons: document.getElementById("ribbons"),
  shards: document.getElementById("shards"),
  lotus: document.getElementById("lotus"),
  backButton: document.getElementById("backButton"),
  soundButton: document.getElementById("soundButton"),
  bgMusic: document.getElementById("bgMusic")
};

function num(key, fallback = 0) {
  const raw = Number(localStorage.getItem(key));
  return Number.isFinite(raw) ? raw : fallback;
}

function saveNum(key, value) {
  localStorage.setItem(key, String(value));
}

function nextIndex(key, length) {
  const current = num(key, 0);
  saveNum(key, (current + 1) % length);
  return current;
}

function pseudo(index, min, max) {
  const raw = Math.sin((index + 1) * 998.917) * 10000;
  const normalized = raw - Math.floor(raw);
  return min + normalized * (max - min);
}

function setGreeting() {
  const index = nextIndex(STORAGE.greeting, greetings.length);
  els.greetingTitle.textContent = greetings[index][0];
  els.greetingNote.textContent = greetings[index][1];
}

function format(ms) {
  const safe = Math.max(0, ms);
  const total = Math.floor(safe / 1000);
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function updateTimer() {
  const next = num(STORAGE.nextPullAt, 0);
  const left = next - Date.now();

  if (left > 0) {
    els.timer.textContent = format(left);
    els.pullButton.disabled = true;
    els.pullButton.textContent = "Подарок ждёт";
  } else {
    els.timer.textContent = "00:00:00";
    els.pullButton.disabled = false;
    els.pullButton.textContent = "Открыть подарок";
  }
}

function createPetals() {
  els.petals.innerHTML = "";
  for (let i = 0; i < 95; i += 1) {
    const p = document.createElement("span");
    p.className = "petal";
    p.style.setProperty("--s", `${pseudo(i, 7, 22).toFixed(1)}px`);
    p.style.setProperty("--x", `${pseudo(i + 5, -8, 105).toFixed(2)}vw`);
    p.style.setProperty("--drift", `${pseudo(i + 15, -26, 26).toFixed(2)}vw`);
    p.style.setProperty("--d", `${pseudo(i + 25, 8, 24).toFixed(2)}s`);
    p.style.setProperty("--delay", `${pseudo(i + 35, -24, 0).toFixed(2)}s`);
    p.style.setProperty("--rot", `${pseudo(i + 45, 160, 960).toFixed(0)}deg`);
    p.style.setProperty("--o", `${pseudo(i + 55, .34, .9).toFixed(2)}`);
    els.petals.appendChild(p);
  }
}

function createStars() {
  els.stars.innerHTML = "";
  for (let i = 0; i < 70; i += 1) {
    const s = document.createElement("span");
    s.className = "star";
    s.style.setProperty("--s", `${pseudo(i + 90, 4, 11).toFixed(1)}px`);
    s.style.setProperty("--x", `${pseudo(i + 100, 0, 100).toFixed(2)}vw`);
    s.style.setProperty("--y", `${pseudo(i + 110, 0, 100).toFixed(2)}vh`);
    s.style.setProperty("--d", `${pseudo(i + 120, 1.4, 4.5).toFixed(2)}s`);
    s.style.setProperty("--delay", `${pseudo(i + 130, -6, 0).toFixed(2)}s`);
    els.stars.appendChild(s);
  }
}

function createTunnelLines() {
  els.tunnel.innerHTML = "";
  for (let i = 0; i < 36; i += 1) {
    const line = document.createElement("span");
    line.style.setProperty("--rot", `${(360 / 36) * i}deg`);
    els.tunnel.appendChild(line);
  }
}

function createRibbons() {
  els.ribbons.innerHTML = "";
  for (let i = 0; i < 12; i += 1) {
    const ribbon = document.createElement("span");
    ribbon.style.setProperty("--y", `${pseudo(i + 160, 80, 540).toFixed(0)}px`);
    ribbon.style.setProperty("--y2", `${pseudo(i + 170, 60, 560).toFixed(0)}px`);
    ribbon.style.setProperty("--r", `${pseudo(i + 180, -18, 18).toFixed(1)}deg`);
    ribbon.style.animationDelay = `${i * 95}ms`;
    els.ribbons.appendChild(ribbon);
  }
}

function createShards() {
  els.shards.innerHTML = "";
  for (let i = 0; i < 58; i += 1) {
    const shard = document.createElement("span");
    shard.style.setProperty("--w", `${pseudo(i + 200, 10, 34).toFixed(0)}px`);
    shard.style.setProperty("--h", `${pseudo(i + 210, 24, 72).toFixed(0)}px`);
    shard.style.setProperty("--r", `${pseudo(i + 220, 0, 360).toFixed(0)}deg`);
    shard.style.setProperty("--tx", `${pseudo(i + 230, -540, 540).toFixed(0)}px`);
    shard.style.setProperty("--ty", `${pseudo(i + 240, -320, 320).toFixed(0)}px`);
    shard.style.setProperty("--spin", `${pseudo(i + 250, 180, 1120).toFixed(0)}deg`);
    shard.style.animationDelay = `${pseudo(i + 260, 0, 520).toFixed(0)}ms`;
    els.shards.appendChild(shard);
  }
}

function createLotus() {
  els.lotus.innerHTML = "";
  for (let i = 0; i < 24; i += 1) {
    const petal = document.createElement("span");
    const base = (360 / 24) * i;
    petal.style.setProperty("--r", `${base}deg`);
    petal.style.setProperty("--open", `${pseudo(i + 300, -18, 18).toFixed(1)}deg`);
    petal.style.animationDelay = `${i * 36}ms`;
    els.lotus.appendChild(petal);
  }
}

function cleanCardName(file) {
  const raw = file
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+_?/, "");

  const name = raw
    .split(/[_-]+/)
    .filter((token) => !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(token))
    .join(" ")
    .trim();

  return name || "Подарок";
}

function getPack() {
  const packCursor = num(STORAGE.packCursor, 0);
  const start = (packCursor * CARDS_PER_PULL) % CARD_FILES.length;
  const group = [];

  for (let i = 0; i < CARDS_PER_PULL; i += 1) {
    group.push(CARD_FILES[(start + i) % CARD_FILES.length]);
  }

  const granted = group[0];
  saveNum(STORAGE.packCursor, (packCursor + 1) % Math.ceil(CARD_FILES.length / CARDS_PER_PULL));

  return { group, granted, packCursor };
}

function displayOrderForPack(group, packCursor) {
  const orders = [
    [2, 4, 0, 3, 1],
    [1, 3, 4, 0, 2],
    [4, 2, 1, 3, 0],
    [3, 0, 2, 4, 1],
    [1, 4, 2, 0, 3]
  ];
  const order = orders[packCursor % orders.length];
  return order.map((i) => group[i]);
}

function setShuffleVars(card, index, modeIndex) {
  const seed = index + modeIndex * 20;
  card.style.setProperty("--sx1", `${pseudo(seed + 10, -220, 220).toFixed(0)}px`);
  card.style.setProperty("--sy1", `${pseudo(seed + 20, -80, 80).toFixed(0)}px`);
  card.style.setProperty("--sx2", `${pseudo(seed + 30, -260, 260).toFixed(0)}px`);
  card.style.setProperty("--sy2", `${pseudo(seed + 40, -90, 90).toFixed(0)}px`);
  card.style.setProperty("--sr1", `${pseudo(seed + 50, -38, 38).toFixed(0)}deg`);
  card.style.setProperty("--sr2", `${pseudo(seed + 60, -44, 44).toFixed(0)}deg`);
}

function makeCard(file, index, modeIndex) {
  const article = document.createElement("article");
  article.className = "card";
  article.style.animationDelay = `${index * 145}ms`;
  setShuffleVars(article, index, modeIndex);

  const path = `assets/cards/${file}`;

  article.innerHTML = `
    <div class="card-inner">
      <div class="face back"></div>
      <div class="face front" style="--img: url('${path}')"></div>
    </div>
  `;

  return article;
}

function buildPossibleCards(files, modeIndex) {
  els.possibleCards.innerHTML = "";
  files.forEach((file, index) => {
    els.possibleCards.appendChild(makeCard(file, index, modeIndex));
  });
}

function buildRewardCard(file, modeIndex) {
  els.rewardCardSlot.innerHTML = "";
  const card = makeCard(file, 0, modeIndex);
  card.classList.add("flipped");
  els.rewardCardSlot.appendChild(card);
  buildRewardCopy(file);
}

function getRewardLine(file) {
  const cardId = file.slice(0, 3);
  return CUSTOM_REWARD_LINES[cardId] || "Подарок для тебя.";
}

function buildRewardCopy(file) {
  els.rewardCopy.innerHTML = `<strong>${getRewardLine(file)}</strong>`;
}

function clearModeClasses() {
  animationModes.forEach((mode) => els.stage.classList.remove(mode.className));
  els.possibleCards.classList.remove("show");
  els.rewardFocus.classList.remove("show");
  els.backButton.classList.remove("show");
  els.possibleTitle.style.opacity = "";
  [...els.possibleCards.children].forEach((card) => {
    card.classList.remove("flipped");
  });
}

function openPull() {
  const modeIndex = nextIndex(STORAGE.animationCursor, animationModes.length);
  const mode = animationModes[modeIndex];
  const pack = getPack();
  const visibleFiles = displayOrderForPack(pack.group, pack.packCursor);

  clearModeClasses();
  buildPossibleCards(visibleFiles, modeIndex);
  buildRewardCard(pack.granted, modeIndex);

  els.sceneLabel.textContent = mode.label;
  els.app.classList.add("opening");
  els.pull.setAttribute("aria-hidden", "false");

  void els.stage.offsetWidth;
  els.stage.classList.add(mode.className);

  window.setTimeout(() => {
    els.possibleCards.classList.add("show");
  }, mode.cardsAt);

  [...els.possibleCards.children].forEach((card, index) => {
    window.setTimeout(() => {
      card.classList.add("flipped");
    }, mode.cardsAt + 850 + index * 180);
  });

  window.setTimeout(() => {
    els.rewardFocus.classList.add("show");
  }, mode.finalAt);

  window.setTimeout(() => {
    els.backButton.classList.add("show");
  }, mode.finalAt + 1800);

  saveNum(STORAGE.nextPullAt, Date.now() + DAY_MS);
  updateTimer();
}

function closePull() {
  els.app.classList.remove("opening");
  els.pull.setAttribute("aria-hidden", "true");
  clearModeClasses();
}

function musicTrackIndex() {
  const saved = num(MUSIC_STORAGE.track, 0);
  if (!MUSIC_PLAYLIST.length) return 0;
  return saved % MUSIC_PLAYLIST.length;
}

function setMusicButton(state) {
  els.soundButton.classList.remove("music-on", "music-off", "music-waiting");

  if (state === "on") {
    els.soundButton.classList.add("music-on");
    els.soundButton.textContent = "♪";
    els.soundButton.setAttribute("aria-label", "Выключить музыку");
    els.soundButton.title = "Выключить музыку";
  } else if (state === "waiting") {
    els.soundButton.classList.add("music-waiting");
    els.soundButton.textContent = "♫";
    els.soundButton.setAttribute("aria-label", "Нажми, чтобы включить музыку");
    els.soundButton.title = "Нажми, чтобы включить музыку";
  } else {
    els.soundButton.classList.add("music-off");
    els.soundButton.textContent = "♫";
    els.soundButton.setAttribute("aria-label", "Включить музыку");
    els.soundButton.title = "Включить музыку";
  }
}

function loadMusicTrack(index = musicTrackIndex()) {
  if (!MUSIC_PLAYLIST.length || !els.bgMusic) return;

  const safeIndex = index % MUSIC_PLAYLIST.length;
  els.bgMusic.src = MUSIC_PLAYLIST[safeIndex];
  els.bgMusic.volume = MUSIC_VOLUME;
  els.bgMusic.loop = MUSIC_PLAYLIST.length === 1;
  saveNum(MUSIC_STORAGE.track, safeIndex);
}

async function playMusic() {
  if (!MUSIC_PLAYLIST.length || !els.bgMusic) return false;

  if (!els.bgMusic.src) {
    loadMusicTrack();
  }

  try {
    await els.bgMusic.play();
    localStorage.setItem(MUSIC_STORAGE.enabled, "yes");
    setMusicButton("on");
    return true;
  } catch {
    setMusicButton("waiting");
    return false;
  }
}

function pauseMusic() {
  if (els.bgMusic) {
    els.bgMusic.pause();
  }
  localStorage.setItem(MUSIC_STORAGE.enabled, "no");
  setMusicButton("off");
}

function toggleMusic() {
  if (!els.bgMusic) return;

  if (els.bgMusic.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
}

function unlockMusicOnce() {
  const wantsMusic = localStorage.getItem(MUSIC_STORAGE.enabled) !== "no";
  if (wantsMusic && els.bgMusic?.paused) {
    playMusic();
  }
}

function setupMusic() {
  if (!MUSIC_PLAYLIST.length || !els.bgMusic) {
    setMusicButton("off");
    return;
  }

  loadMusicTrack();

  els.bgMusic.addEventListener("ended", () => {
    if (MUSIC_PLAYLIST.length <= 1) return;

    const nextTrack = (musicTrackIndex() + 1) % MUSIC_PLAYLIST.length;
    loadMusicTrack(nextTrack);
    playMusic();
  });

  const wantsMusic = localStorage.getItem(MUSIC_STORAGE.enabled) !== "no";
  if (wantsMusic) {
    setMusicButton("waiting");
    playMusic();
  } else {
    setMusicButton("off");
  }
}


function bind() {
  els.pullButton.addEventListener("click", () => {
    if (!els.pullButton.disabled) openPull();
  });

  els.backButton.addEventListener("click", closePull);

  els.soundButton.addEventListener("click", toggleMusic);

  document.addEventListener("pointerdown", unlockMusicOnce, { once: true });
  document.addEventListener("keydown", unlockMusicOnce, { once: true });
}

function boot() {
  setGreeting();
  createPetals();
  createStars();
  createTunnelLines();
  createRibbons();
  createShards();
  createLotus();
  setupMusic();
  bind();
  updateTimer();
  setInterval(updateTimer, 1000);
}

boot();
