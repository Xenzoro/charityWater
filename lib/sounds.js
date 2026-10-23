// Each sound file is loaded once, then cloned to play, so rapid shots can
// overlap (like the old `new Audio()` per click) without fetching again.

const SOUNDS = {
  correct: "/wav/correct.mp3",
  incorrect: "/wav/incorrect.mp3",
  tada: "/wav/tada.mp3",
  gun: "/wav/watergunshort.mp3",
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
