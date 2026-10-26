// Removes CSS rules for classes this site never uses (mostly unused
// Bootstrap components) at build time. It scans the files below for class
// names, so new classes written in JSX are picked up automatically.
//
// The safelist covers classes that are only ever added at runtime or built
// from strings, so the scanner can't see them in the source.
const purgecss = {
  "@fullhuman/postcss-purgecss": {
    content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
    safelist: {
      standard: [
        "show",
        "fade",
        "is-visible",
        "is-shooting",
        "is-open",
        "is-playing",
        "is-urgent",
        "has-gun",
        "scroll-locked",
        /^hit-/,
        /^level-/,
      ],
      greedy: [/data-bs-popper/],
    },
    keyframes: false,
    fontFace: false,
    variables: false,
  },
};

const config = {
  plugins: process.env.NODE_ENV === "production" ? purgecss : {},
};

export default config;
