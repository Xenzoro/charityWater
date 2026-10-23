"use client";

import { useEffect, useRef } from "react";
import { CURSOR_OFFSET_X, CURSOR_OFFSET_Y } from "@/lib/gameConfig";
import { playSound, preloadSounds } from "@/lib/sounds";
import shoot1x from "@/assets/img/cursorwgunshoot-1x.webp";
import shoot2x from "@/assets/img/cursorwgunshoot-2x.webp";

// The water gun that follows the mouse inside the game box.
//
// Built to stay smooth without hardware acceleration:
// * position: fixed + transform, so moving it never triggers layout
// * no layout reads (getBoundingClientRect, offsetWidth) while moving
// * at most one update per frame (requestAnimationFrame), always using
//   the newest mouse position, so it never falls behind a queue of events
// * small, cropped images, so each repaint is cheap
//
// It is rendered outside the game box on purpose: the game box uses
// backdrop-filter, which would trap a position: fixed element inside it.
export default function CustomCursor({ areaRef }) {
  const cursorRef = useRef(null);

  useEffect(() => {
    const area = areaRef.current;
    const cursor = cursorRef.current;
    if (!area || !cursor) return;

    let x = 0;
    let y = 0;
    let frame = 0;
    let warmedUp = false;

    function draw() {
      frame = 0;
      cursor.style.transform = `translate(${x - CURSOR_OFFSET_X}px, ${y - CURSOR_OFFSET_Y}px)`;
    }

    function onMove(e) {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(draw);
    }

    function onEnter(e) {
      if (!warmedUp) {
        // Load the shooting image and the sounds before the first click,
        // so the first shot does not stall.
        warmedUp = true;
        const shoot = new Image();
        shoot.src = window.devicePixelRatio > 1 ? shoot2x.src : shoot1x.src;
        preloadSounds();
      }
      onMove(e);
      cursor.classList.add("is-visible");
    }

    function onLeave() {
      cursor.classList.remove("is-visible");
    }

    function onDown() {
      cursor.classList.add("is-shooting");
      playSound("gun");
    }

    function onUp() {
      cursor.classList.remove("is-shooting");
    }

    area.addEventListener("mouseenter", onEnter);
    area.addEventListener("mouseleave", onLeave);
    area.addEventListener("mousemove", onMove, { passive: true });
    area.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener("mouseenter", onEnter);
      area.removeEventListener("mouseleave", onLeave);
      area.removeEventListener("mousemove", onMove);
      area.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [areaRef]);

  return <div ref={cursorRef} className="custom-cursor game-wide" aria-hidden="true" />;
}
