# Aqua Blaster – charity: water Arcade Game

Aqua Blaster is a fast-paced browser game inspired by charity: water’s mission. Hit as many clean water targets as you can, avoid dirty water, and rack up points before time runs out!

## Features

- **Charity: water branding**: Uses official logo, color palette, and modern arcade-inspired design.
- **Responsive UI**: Layout adapts for desktop and mobile, with all controls and stats easily accessible.
- **Game grid**: 4x3 grid where targets (clean and dirty) appear randomly.
- **Custom cursor**: Water gun PNG cursor appears only inside the game area for immersive play.
- **Sound effects**: All sound effects are copyright free and sourced from the YouTube Audio Library (see `wav/`).
- **Dynamic HUD**: Displays score, timer, and lives (💧 icons).
- **Pause and How to Play**: Pause/resume the game and view instructions via Bootstrap modals.
- **Game Over modal**: Shows your final score and a themed message when the game ends.
- **Animated feedback**: Hit targets show different images based on accuracy; confetti on high scores.
- **Water facts**: Spend points to unlock real-world water facts.

## How to Play

- Click **Start Game** to begin.
- Hit as many clean water cans as possible in 30 seconds.
- Avoid dirty water (germ) targets—they cost you points and lives.
- The closer to the center you hit, the more points you earn.
- Lose all lives or run out of time to end the game.
- Use the **Pause** button to pause/resume. **How to Play** shows instructions.
- Spend points for new water facts using the button below the game.

## Assets

- **assets/img/**: All game images (logos, targets, cursor, feedback rings) as WebP at their displayed size, with 2x versions for high density screens
- **public/wav/**: All sound effects (correct, incorrect, water gun, tada)

## Technical Details

- Built with Next.js (App Router), React, and JavaScript, as a static export (plain HTML, CSS and JS) hosted on Vercel.
- Bootstrap 5 CSS for layout; the modals and the difficulty menu are small React components using Bootstrap's classes, so Bootstrap's JavaScript isn't needed.
- Static parts (navbar, footer, intro text) are server components and ship no JavaScript. The game is a client component.
- Montserrat is self hosted with `next/font`; logos use `next/image`.
- At build time, PurgeCSS (`postcss.config.mjs`) strips CSS the site never uses, and the remaining CSS (about 7 KB gzipped) is inlined into the HTML. If you add a class only at runtime (built from a string), add it to the safelist in `postcss.config.mjs`.

## Project Structure

```
app/            layout (navbar + footer), page, global CSS, fonts, favicon
components/     Navbar, Footer, GameArea, GameModal, DifficultyMenu, CustomCursor, WaterFacts
lib/            gameConfig.js (all game numbers), facts.js, sounds.js
assets/img/     images (bundled, so their URLs get the Pages prefix automatically)
public/wav/     sounds
```

## Running Locally

```bash
npm install
npm run dev       # live dev server at http://localhost:3000
npm run build     # static export to out/
npm run preview   # serve out/ at http://localhost:3000 to test the real build
```

## Deploying

Live: https://charitywater-cyan.vercel.app/

Vercel is connected to this repo: every push to `main` deploys to production, and every other branch gets a preview URL.

The old GitHub Pages address (https://xenzoro.github.io/charityWater/) only redirects to Vercel, keeping the rest of the path. `.github/workflows/pages-redirect.yml` publishes that redirect page; it runs when the workflow file changes or by hand from the Actions tab. One time setup: repo **Settings > Pages > Build and deployment > Source** must be **GitHub Actions**.

---

All sound effects are copyright free and sourced from the YouTube Audio Library.

Game and art by Jacob Martinez and KZ.
