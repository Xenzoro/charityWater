"use client";

import { useEffect, useRef, useState } from "react";
import { DIFFICULTIES } from "@/lib/gameConfig";

const OPTIONS = [
  { id: "easy-mode", value: "easy", label: "Easy", note: "Slower targets" },
  { id: "medium-mode", value: "medium", label: "Medium", note: "The classic" },
  { id: "hard-mode", value: "hard", label: "Hard", note: "Fast targets" },
];

// The Start Game button and its difficulty menu. A plain React component
// (no Bootstrap JavaScript): click or press Enter to open, arrow keys to
// move between levels, Esc or a click outside to close.
export default function DifficultyMenu({ onSelect, disabled }) {
  const [open, setOpen] = useState(false);
  const groupRef = useRef(null);
  const toggleRef = useRef(null);
  const itemRefs = useRef([]);

  // Close on a click outside the menu or on Esc.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e) {
      if (!groupRef.current?.contains(e.target)) setOpen(false);
    }
    function onKeyDown(e) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus({ preventScroll: true });
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function focusItem(index) {
    const count = OPTIONS.length;
    itemRefs.current[(index + count) % count]?.focus({ preventScroll: true });
  }

  function onToggleKeyDown(e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      // Wait one frame for the menu to show before moving focus into it.
      requestAnimationFrame(() => focusItem(e.key === "ArrowDown" ? 0 : OPTIONS.length - 1));
    }
  }

  function onItemKeyDown(e, index) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusItem(index + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusItem(index - 1);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div className="start-menu" id="difficulty-group" ref={groupRef}>
      <button
        ref={toggleRef}
        type="button"
        className={`btn-arcade btn-start difficulty-dropdown${open ? " is-open" : ""}`}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="difficulty-menu"
        disabled={disabled}
        onClick={() => setOpen((isOpen) => !isOpen)}
        onKeyDown={onToggleKeyDown}
      >
        {disabled ? (
          "Game on!"
        ) : (
          <>
            Start game
            <svg className="start-caret" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
              <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>

      <div id="difficulty-menu" className={`level-menu${open ? " is-open" : ""}`} aria-label="Choose a difficulty">
        {OPTIONS.map((option, index) => {
          const { time, lives } = DIFFICULTIES[option.value];
          return (
            <button
              key={option.value}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              id={option.id}
              type="button"
              className={`level-option level-${option.value}`}
              tabIndex={open ? 0 : -1}
              onKeyDown={(e) => onItemKeyDown(e, index)}
              onClick={() => {
                setOpen(false);
                onSelect(option.value);
              }}
            >
              <span className="level-name">{option.label}</span>
              <span className="level-note">{option.note}</span>
              <span className="level-stats">
                <span className="level-time">{time}s</span>
                <span className="level-lives" aria-label={`${lives} lives`}>
                  {"💧".repeat(lives)}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
