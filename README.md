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

- **public/img/**: All game images (logo, targets, cursor, feedback rings), served as WebP at their displayed size
- **public/wav/**: All sound effects (correct, incorrect, water gun, tada)

## Technical Details

- Built with Next.js (App Router), React, and JavaScript. The whole site is statically generated.
- Bootstrap 5 CSS for layout; the modals and the difficulty menu are small React components using Bootstrap's classes, so Bootstrap's JavaScript isn't needed.
- Static parts (navbar, footer, intro text) are server components and ship no JavaScript. The game is a client component.
- Montserrat is self hosted with `next/font`; logos use `next/image`.

## Project Structure

```
app/            layout (navbar + footer), page, global CSS, fonts, favicon
components/     Navbar, Footer, GameArea, GameModal, DifficultyMenu, CustomCursor, WaterFacts
lib/            gameConfig.js (all game numbers), facts.js, sounds.js
public/         images and sounds
```

## Running Locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Deploys to Vercel with no extra settings.

---

All sound effects are copyright free and sourced from the YouTube Audio Library.

Game and art by Jacob Martinez and KZ.
