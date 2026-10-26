// Every game number in one place, so tuning never means hunting through code.

export const GAME_TIME = 30; // seconds, used when the game is reset
export const STARTING_LIVES = 3; // used when the game is reset
export const GRID_CELLS = 12; // 4 columns x 3 rows

export const DIRTY_CHANCE = 0.25; // 75% clean, 25% dirty
export const TARGET_LIFETIME_MS = 900; // a target disappears if not hit in time
export const HIT_FEEDBACK_MS = 300; // how long the hit image stays up
export const POPUP_MS = 600; // how long the "+points" popup floats
export const LEVEL_FLASH_MS = 1800; // how long the "Level up" badge shows

export const DIRTY_PENALTY = 15; // points lost for hitting dirty water
export const POINTS_PER_LEVEL = 100;
export const FACT_COST = 50;

export const DIFFICULTIES = {
  easy: { spawnRate: 1300, time: 40, lives: 5 },
  medium: { spawnRate: 1000, time: 30, lives: 3 },
  hard: { spawnRate: 700, time: 20, lives: 2 },
};

// Rings from the center out. maxRatio is the distance from the center as
// a fraction of the target's radius.
export const RINGS = [
  { maxRatio: 0.33, points: 100, hit: "bullseye" },
  { maxRatio: 0.66, points: 5, hit: "middlering" },
  { maxRatio: 1, points: 1, hit: "outerring" },
];

// The gun image is cropped to its visible pixels. These are the distances
// from the image's top left corner to the point that follows the mouse
// (the center of the old 400x400 image), so the gun sits exactly where it
// used to.
export const CURSOR_OFFSET_X = 110;
export const CURSOR_OFFSET_Y = 111;
