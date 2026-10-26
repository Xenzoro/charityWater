"use client";

// "use client" makes this a client component: React hydrates it in the
// browser so it can keep state (score, lives, timer) and handle clicks.
// Next.js still prerenders its first frame to HTML at build time, so the
// grid and buttons show up before any JavaScript runs.

import { useCallback, useEffect, useRef, useState } from "react";
import CustomCursor from "./CustomCursor";
import DifficultyMenu from "./DifficultyMenu";
import GameModal from "./GameModal";
import WaterFacts from "./WaterFacts";
import { FACTS, FIRST_FACT } from "@/lib/facts";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";
import { playSound } from "@/lib/sounds";
import {
  DIFFICULTIES,
  DIRTY_CHANCE,
  DIRTY_PENALTY,
  FACT_COST,
  GAME_TIME,
  GRID_CELLS,
  HIT_FEEDBACK_MS,
  LEVEL_FLASH_MS,
  POINTS_PER_LEVEL,
  POPUP_MS,
  RINGS,
  STARTING_LIVES,
  TARGET_LIFETIME_MS,
} from "@/lib/gameConfig";

const HOW_TO_PLAY = {
  title: "Game Rules",
  body: (
    <ul className="rules-list">
      <li>
        <strong>Hit as many jerry can targets as possible before time runs out!</strong>
      </li>
      <li>The closer to the center you hit, the more points you get.</li>
      <li>
        <span style={{ color: "#F5402C" }}>
          Avoid hitting <strong>Dirty Water</strong> targets
        </span>{" "}
        – they cost you 15 points and a life!
      </li>
      <li>
        You start with <strong>3 lives</strong>. Lose them all and the game ends.
      </li>
      <li>The game also ends when the timer runs out.</li>
      <li>Try to get the highest score you can. Good luck and have fun!</li>
      <li>
        One last thing: if you&apos;re having trouble hitting the targets, make sure you&apos;re{" "}
        <strong>clicking, not holding</strong> the left mouse button.
      </li>
    </ul>
  ),
};

export default function GameArea() {
  const gameBoxRef = useRef(null);
  const playfieldRef = useRef(null); // scoreboard + grid: what must stay on screen
  const gridRef = useRef(null);
  const nextId = useRef(0);

  // Game state
  const [gameActive, setGameActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");
  const [score, setScoreState] = useState(0);
  const [lives, setLivesState] = useState(STARTING_LIVES);
  const [timeLeft, setTimeLeftState] = useState(GAME_TIME);
  const [target, setTarget] = useState(null); // { id, cell, dirty, hit }
  const [popups, setPopups] = useState([]); // floating "+points"

  // Progress that lasts across games (until the page reloads)
  const [totalPoints, setTotalPoints] = useState(0);
  const [level, setLevel] = useState(0);
  const [cachePoints, setCachePoints] = useState(0);
  const [fact, setFact] = useState(FIRST_FACT);
  const [levelFlash, setLevelFlash] = useState(null); // { id, level } while the "Level up" badge shows

  // Modal: null or { kind, title, body, confirmLabel }
  const [modal, setModal] = useState(null);

  // Refs mirror score, lives and time so the timer callback and click
  // handlers always read the latest values. The set* helpers keep the
  // ref and the on screen state in sync.
  const scoreRef = useRef(0);
  const livesRef = useRef(STARTING_LIVES);
  const timeRef = useRef(GAME_TIME);
  const activeRef = useRef(false); // guards endGame from running twice
  const setScore = (value) => setScoreState((scoreRef.current = value));
  const setLives = (value) => setLivesState((livesRef.current = value));
  const setTimeLeft = (value) => setTimeLeftState((timeRef.current = value));

  // The reset confirmation pauses the game while it is open.
  const running = gameActive && !isPaused && modal?.kind !== "reset";
  const { spawnRate } = DIFFICULTIES[difficulty];

  const spawnTarget = useCallback(() => {
    const id = ++nextId.current;
    setTarget({
      id,
      cell: Math.floor(Math.random() * GRID_CELLS),
      dirty: Math.random() < DIRTY_CHANCE,
      hit: null,
    });
    // Disappears if not hit in time (a hit target is cleared by its own timer).
    setTimeout(() => {
      setTarget((current) => (current && current.id === id && !current.hit ? null : current));
    }, TARGET_LIFETIME_MS);
  }, []);

  // Ends the game. Called by the timer and by hitting dirty water.
  const endGame = useCallback(() => {
    if (!activeRef.current) return;
    activeRef.current = false;
    const finalScore = scoreRef.current;
    setGameActive(false);
    setIsPaused(false);
    setTarget(null);
    if (finalScore > 0) setCachePoints((points) => points + finalScore);

    if (livesRef.current <= 0) {
      setModal({
        kind: "info",
        title: "Game Over!",
        body: `You lost all your lives! Final Score: ${finalScore} try better next time!`,
      });
    } else {
      // Only load the confetti library when it is actually needed.
      import("canvas-confetti").then(({ default: confetti }) => confetti({ particleCount: 100, spread: 100 }));
      playSound("tada");
      setModal({ kind: "info", title: "Game Over!", body: `Time's up! Final Score: ${finalScore} Great job!` });
    }
  }, []);

  // Timer: one tick per second while running.
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      const next = timeRef.current - 1;
      setTimeLeftState((timeRef.current = next));
      if (next <= 0) endGame();
    }, 1000);
    return () => clearInterval(timer);
  }, [running, endGame]);

  // Hold the screen still while a round is running. The page can't be
  // scrolled until the game ends, is paused, or a dialog opens. Skipped if
  // the whole board (including Pause and Reset) doesn't fit on screen, for
  // example a phone held sideways, since then the player needs to scroll.
  useEffect(() => {
    if (!running) return;
    const board = gameBoxRef.current;
    if (!board || board.offsetHeight > window.innerHeight) return;
    lockScroll("game");
    return () => unlockScroll("game");
  }, [running]);

  // Spawning, at the chosen difficulty's rate (also after a resume).
  useEffect(() => {
    if (!running) return;
    const spawner = setInterval(spawnTarget, spawnRate);
    return () => clearInterval(spawner);
  }, [running, spawnRate, spawnTarget]);

  // Scroll so the whole board sits in the middle of the screen (or, if it
  // is taller than the screen, at least the scoreboard and grid). Instant
  // on purpose: cheap without hardware acceleration, and the board is in
  // place before the first target appears.
  function frameBoard() {
    const board = gameBoxRef.current;
    const playfield = playfieldRef.current;
    if (!board || !playfield) return;
    const fits = board.offsetHeight <= window.innerHeight;
    const rect = (fits ? board : playfield).getBoundingClientRect();
    const spare = window.innerHeight - rect.height;
    const top = window.scrollY + rect.top - Math.max(spare / 2, 8);
    window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
  }

  function startGame(choice) {
    if (gameActive) return;
    frameBoard();
    const settings = DIFFICULTIES[choice];
    setDifficulty(choice);
    setScore(0);
    setLives(settings.lives);
    setTimeLeft(settings.time);
    setIsPaused(false);
    activeRef.current = true;
    setGameActive(true);
    spawnTarget();
  }

  function clearTargetLater(id) {
    setTimeout(() => {
      setTarget((current) => (current && current.id === id ? null : current));
    }, HIT_FEEDBACK_MS);
  }

  function showPoints(points, x, y) {
    const id = ++nextId.current;
    setPopups((list) => [...list, { id, points, x, y }]);
    setTimeout(() => setPopups((list) => list.filter((p) => p.id !== id)), POPUP_MS);
  }

  function handleTargetClick(e) {
    // Ignore clicks on a target that was already hit, so one target can
    // only score once.
    if (!running || !target || target.hit) return;

    if (target.dirty) {
      setLives(livesRef.current - 1);
      setScore(scoreRef.current - DIRTY_PENALTY);
      playSound("incorrect");
      setTarget({ ...target, hit: "germ" });
      clearTargetLater(target.id);
      if (livesRef.current <= 0) endGame();
      return;
    }

    // Ring scoring. offsetX/offsetY and offsetWidth are all measured on the
    // target's own (unscaled) box, so the pop in animation can't skew it.
    const el = e.currentTarget;
    const radius = el.offsetWidth / 2;
    const dx = e.nativeEvent.offsetX - radius;
    const dy = e.nativeEvent.offsetY - el.offsetHeight / 2;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const ring = RINGS.find((r) => distance <= radius * r.maxRatio);
    if (!ring) return; // clicked a corner, outside the circle

    setScore(scoreRef.current + ring.points);
    const newTotal = totalPoints + ring.points;
    setTotalPoints(newTotal);
    const newLevel = Math.floor(newTotal / POINTS_PER_LEVEL);
    if (newLevel > level) {
      setLevel(newLevel);
      // The badge floats over the board, so it never pushes the grid down.
      const flashId = ++nextId.current;
      setLevelFlash({ id: flashId, level: newLevel });
      setTimeout(() => setLevelFlash((current) => (current && current.id === flashId ? null : current)), LEVEL_FLASH_MS);
    }

    playSound("correct");
    setTarget({ ...target, hit: ring.hit });
    showPoints(ring.points, e.clientX, e.clientY);
    clearTargetLater(target.id);
  }

  function pauseGame() {
    if (!gameActive || isPaused) return;
    setIsPaused(true);
    setModal({
      kind: "pause",
      title: "Game Paused",
      body: "You paused the game. Close this to keep playing.",
    });
  }

  function resetGame() {
    setModal({
      kind: "reset",
      title: "Reset Game",
      body: "Are you sure you want to reset? Your current progress will be lost.",
      confirmLabel: "Reset Game",
    });
  }

  function newFact() {
    if (cachePoints < FACT_COST) {
      setModal({
        kind: "info",
        title: "Not Enough Points",
        body: `You need at least ${FACT_COST} points to unlock a new fact! Keep playing to earn more points. Current Points: ${cachePoints}`,
      });
      return;
    }
    setFact(FACTS[Math.floor(Math.random() * FACTS.length)]);
    setCachePoints((points) => points - FACT_COST);
  }

  function onModalHidden(confirmed, closed) {
    if (closed?.kind === "pause") setIsPaused(false);
    if (closed?.kind === "reset" && confirmed) {
      activeRef.current = false;
      setGameActive(false);
      setIsPaused(false);
      setScore(0);
      setLives(STARTING_LIVES);
      setTimeLeft(GAME_TIME);
      setTarget(null);
    }
    // Only clear the modal if a newer one has not replaced it.
    setModal((current) => (current === closed ? null : current));
  }

  return (
    <>
      <section
        id="gameBox"
        ref={gameBoxRef}
        className={`board${running ? " is-playing" : ""}`}
        aria-label="Aqua Blaster game"
      >
        <div className="playfield" ref={playfieldRef}>
          <div id="stats" className="scoreboard">
            <div className="score-cell">
              <span className="score-label">Score</span>
              <span id="score" className="score-value">
                {score}
              </span>
            </div>
            <div className="score-cell">
              <span className="score-label">Time</span>
              <span id="time" className={`score-value${gameActive && timeLeft <= 5 ? " is-urgent" : ""}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="score-cell score-cell-lives">
              <span className="score-label">Lives</span>
              <span id="lives" className="score-value score-lives" aria-label={`${Math.max(0, lives)} lives`}>
                {"💧".repeat(Math.max(0, lives))}
              </span>
            </div>
            <div className="score-cell">
              <span className="score-label">Level</span>
              <span id="level" className="score-value">
                {level}
              </span>
            </div>
          </div>

          <div className="game-grid" ref={gridRef}>
            {Array.from({ length: GRID_CELLS }, (_, cell) => (
              <div key={cell} className="grid-cell">
                {target && target.cell === cell && (
                  // key = target id, so every new target remounts and replays the pop in animation
                  <div key={target.id} className="water-can-wrapper">
                    <div
                      className={`water-can ${target.dirty ? "dirty" : "clean"}${target.hit ? ` hit-${target.hit}` : ""}`}
                      onClick={handleTargetClick}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {levelFlash && (
            <div key={levelFlash.id} id="win-container" className="level-flash" role="status">
              <p id="win-header" className="level-flash-title">
                🎉 Level up! +{levelFlash.level}
              </p>
              <p id="win-text" className="level-flash-text">
                You&apos;re at level {levelFlash.level}
              </p>
            </div>
          )}
        </div>

        <DifficultyMenu onSelect={startGame} disabled={gameActive} />

        <div className="board-actions">
          <button className="btn-outline" id="pause-game" type="button" onClick={pauseGame} disabled={!gameActive}>
            {isPaused ? "Resume game" : "Pause game"}
          </button>
          <button
            className="btn-outline"
            id="how-to-play"
            type="button"
            onClick={() => setModal({ kind: "info", ...HOW_TO_PLAY })}
          >
            How to play
          </button>
          <button className="btn-outline btn-outline-danger" id="reset-game" type="button" onClick={resetGame}>
            Reset game
          </button>
        </div>
      </section>

      <WaterFacts fact={fact} points={cachePoints} onNewFact={newFact} cost={FACT_COST} />

      <GameModal modal={modal} onHidden={onModalHidden} />

      {popups.map((p) => (
        <div key={p.id} className="points-popup" style={{ left: p.x, top: p.y }} aria-hidden="true">
          +{p.points}
        </div>
      ))}

      <CustomCursor areaRef={gridRef} />
    </>
  );
}
