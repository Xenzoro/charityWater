"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const FADE_MS = 300; // matches Bootstrap's modal transition

// Bootstrap's modal markup and classes, driven by React state instead of
// Bootstrap's JavaScript bundle. Looks identical, ships far less JS.
//
// Props:
//   modal:    null, or { title, body, confirmLabel }
//   onHidden: called after the close animation with (confirmed, closedModal).
//             confirmed is true if the footer button was used, false for
//             the X, Esc, or a click outside.
export default function GameModal({ modal, onHidden }) {
  const [shown, setShown] = useState(false);
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef(null);
  const onHiddenRef = useRef(onHidden);

  useEffect(() => {
    onHiddenRef.current = onHidden;
  }, [onHidden]);

  const isOpen = modal !== null;

  // Fade in on the next frame (also re-shows if a new message arrived
  // while the previous one was fading out).
  useEffect(() => {
    if (!modal || shown || closing) return;
    const frame = requestAnimationFrame(() => {
      setShown(true);
      dialogRef.current?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [modal, shown, closing]);

  const close = useCallback(
    (confirmed) => {
      if (closing) return;
      const closedModal = modal;
      setClosing(true);
      setShown(false);
      setTimeout(() => {
        setClosing(false);
        onHiddenRef.current(confirmed, closedModal);
      }, FADE_MS);
    },
    [modal, closing],
  );

  // While open: lock page scroll the way Bootstrap does, and give focus
  // back to whatever had it when the modal closes.
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement;
    const body = document.body;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.classList.add("modal-open");
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      body.classList.remove("modal-open");
      body.style.overflow = "";
      body.style.paddingRight = "";
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [isOpen]);

  // Keyboard: Esc closes, Tab stays inside the modal.
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e) {
      if (e.key === "Escape") {
        close(false);
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll("button");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={dialogRef}
        className={`modal fade${shown ? " show" : ""}`}
        id="gameModal"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gameModalLabel"
        style={{ display: "block" }}
        onMouseDown={(e) => {
          // A click on the dark area outside the dialog closes it.
          if (e.target === e.currentTarget) close(false);
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title h5" id="gameModalLabel">
                {modal.title}
              </h2>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => close(false)} />
            </div>
            <div className="modal-body" id="gameModalBody">
              {modal.body}
            </div>
            <div className="modal-footer">
              <button id="close-modal" type="button" className="button btn btn-secondary" onClick={() => close(true)}>
                {modal.confirmLabel ?? "Close"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade${shown ? " show" : ""}`} />
    </>
  );
}
