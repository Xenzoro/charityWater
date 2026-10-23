// GitHub Pages serves this project at https://xenzoro.github.io/charityWater/,
// so every URL needs the /charityWater prefix there. The deploy workflow sets
// PAGES_BASE_PATH; locally it is empty, so `npm run dev` and a local test of
// the `out/` folder both work at the site root.
const basePath = process.env.PAGES_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `next build` writes plain HTML, CSS and JS to `out/`,
  // which GitHub Pages can host (it has no Node.js server).
  output: "export",
  basePath,
  env: {
    // Lets client code build URLs for files in public/ (the sounds).
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    // Pages can't run Next's image optimizer, so images are served as is.
    // They are already WebP at their displayed size (see assets/img).
    unoptimized: true,
  },
  experimental: {
    // Put the (purged, about 7 KB gzipped) CSS straight into the HTML instead
    // of a separate render blocking stylesheet request. Best for a one page
    // site where most visitors are first time visitors.
    inlineCss: true,
  },
};

export default nextConfig;
