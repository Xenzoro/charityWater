// Each sound file is loaded once, then cloned to play, so rapid shots can
// overlap (like the old `new Audio()` per click) without fetching again.

// On GitHub Pages the site lives under /charityWater, so files in public/
// need that prefix. next.config.mjs sets NEXT_PUBLIC_BASE_PATH.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

const SOUNDS = {
  correct: `${BASE}/wav/correct.mp3`,
  incorrect: `${BASE}/wav/incorrect.mp3`,
  tada: `${BASE}/wav/tada.mp3`,
  gun: `${BASE}/wav/watergunshort.mp3`,
};

const loaded = {};

function getAudio(name) {
  if (!loaded[name]) {
    loaded[name] = new Audio(SOUNDS[name]);
    loaded[name].preload = "auto";
  }
  return loaded[name];
}

export function preloadSounds() {
  Object.keys(SOUNDS).forEach(getAudio);
}

export function playSound(name) {
  const audio = getAudio(name).cloneNode();
  // play() rejects if the browser blocks audio; ignore it instead of
  // logging an uncaught error to the console.
  audio.play().catch(() => {});
}
