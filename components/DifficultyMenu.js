"use client";

import { useEffect, useRef, useState } from "react";

const OPTIONS = [
  { id: "easy-mode", value: "easy", label: "Easy" },
  { id: "medium-mode", value: "medium", label: "Medium" },
  { id: "hard-mode", value: "hard", label: "Hard" },
];

// Bootstrap's dropdown markup and classes, opened with React state instead
// of Bootstrap's JavaScript.
export default function DifficultyMenu({ onSelect }) {
  const [open, setOpen] = useState(false);
  const groupRef = useRef(null);
  const toggleRef = useRef(null);

  // Close on a click outside the menu or on Esc, like Bootstrap does.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e) {
      if (!groupRef.current?.contains(e.target)) setOpen(false);
    }
    function onKeyDown(e) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="d-flex justify-content-center align-items-center mt-4 mb-4" style={{ width: "100%" }}>
      <div className="btn-group" id="difficulty-group" ref={groupRef}>
        <button
          ref={toggleRef}
          type="button"
          className={`btn btn-primary btn-lg dropdown-toggle difficulty-dropdown${open ? " show" : ""}`}
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          {/* trailing space matches the old HTML's gap before the caret */}
          Start Game{" "}
        </button>
        {/* data-bs-popper="static" turns on Bootstrap's built in
            "below the button" positioning, so no Popper.js is needed. */}
        <div className={`dropdown-menu w-100${open ? " show" : ""}`} data-bs-popper="static">
          {OPTIONS.map((option) => (
            <button
              key={option.value}
              id={option.id}
              type="button"
              className="dropdown-item"
              onClick={() => {
                setOpen(false);
                onSelect(option.value);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
