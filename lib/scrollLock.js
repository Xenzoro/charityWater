// Freezes page scrolling while something needs the screen to hold still
// (a running game, an open dialog). Several things can hold the lock at
// once; scrolling comes back when the last one lets go.
//
// html has `scrollbar-gutter: stable` (globals.css), so hiding the
// scrollbar never makes the page jump sideways.

const holders = new Set();

export function lockScroll(key) {
  holders.add(key);
  document.documentElement.classList.add("scroll-locked");
}

export function unlockScroll(key) {
  holders.delete(key);
  if (holders.size === 0) document.documentElement.classList.remove("scroll-locked");
}
