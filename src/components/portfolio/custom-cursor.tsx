"use client";

import { useEffect, useEffectEvent, useRef } from "react";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "summary",
  "[role='button']",
  "[data-cursor-hover]",
].join(", ");

type Point = {
  x: number;
  y: number;
};

type CursorSize = "default" | "large";

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const targetRef = useRef<Point>({ x: 0, y: 0 });
  const bigCursorRef = useRef<Point>({ x: 0, y: 0 });
  const smallCursorRef = useRef<Point>({ x: 0, y: 0 });
  const isVisibleRef = useRef(false);

  const stopAnimation = useEffectEvent(() => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  });

  const syncCursorStyles = useEffectEvent(() => {
    const cursor = rootRef.current;

    if (!cursor) {
      return;
    }

    cursor.style.setProperty("--cursor-big-x", `${bigCursorRef.current.x}px`);
    cursor.style.setProperty("--cursor-big-y", `${bigCursorRef.current.y}px`);
    cursor.style.setProperty("--cursor-small-x", `${smallCursorRef.current.x}px`);
    cursor.style.setProperty("--cursor-small-y", `${smallCursorRef.current.y}px`);
  });

  const setCursorVisible = useEffectEvent((isVisible: boolean) => {
    isVisibleRef.current = isVisible;
    rootRef.current?.toggleAttribute("data-visible", isVisible);
  });

  const setCursorHovered = useEffectEvent((isHovered: boolean) => {
    rootRef.current?.toggleAttribute("data-hovered", isHovered);
  });

  const setCursorSize = useEffectEvent((size: CursorSize) => {
    if (size === "large") {
      rootRef.current?.setAttribute("data-size", "large");
      return;
    }

    rootRef.current?.removeAttribute("data-size");
  });

  const animateCursor = useEffectEvent(function animateCursorFrame() {
    const bigCursor = bigCursorRef.current;
    const smallCursor = smallCursorRef.current;
    const target = targetRef.current;

    bigCursor.x += (target.x - bigCursor.x) * 0.18;
    bigCursor.y += (target.y - bigCursor.y) * 0.18;
    smallCursor.x += (target.x - smallCursor.x) * 0.45;
    smallCursor.y += (target.y - smallCursor.y) * 0.45;

    syncCursorStyles();

    const bigDelta = Math.abs(target.x - bigCursor.x) + Math.abs(target.y - bigCursor.y);
    const smallDelta = Math.abs(target.x - smallCursor.x) + Math.abs(target.y - smallCursor.y);

    if (!isVisibleRef.current && bigDelta < 0.12 && smallDelta < 0.12) {
      stopAnimation();
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(animateCursorFrame);
  });

  useEffect(() => {
    const finePointerMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointerMedia.matches || reducedMotionMedia.matches) {
      return;
    }

    const ensureAnimation = () => {
      if (animationFrameRef.current === null) {
        animationFrameRef.current = window.requestAnimationFrame(animateCursor);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const nextPoint = { x: event.clientX, y: event.clientY };

      targetRef.current = nextPoint;

      if (!isVisibleRef.current) {
        bigCursorRef.current = nextPoint;
        smallCursorRef.current = nextPoint;
        syncCursorStyles();
      }

      setCursorVisible(true);

      const targetElement = event.target instanceof Element ? event.target : null;
      const hoveredElement = targetElement?.closest(INTERACTIVE_SELECTOR) ?? null;
      setCursorHovered(Boolean(hoveredElement));
      setCursorSize(hoveredElement?.getAttribute("data-cursor-size") === "large" ? "large" : "default");

      ensureAnimation();
    };

    const handlePointerDown = () => {
      rootRef.current?.setAttribute("data-pressed", "true");
    };

    const handlePointerUp = () => {
      rootRef.current?.removeAttribute("data-pressed");
    };

    const handlePointerExit = () => {
      setCursorVisible(false);
      setCursorHovered(false);
      setCursorSize("default");
      rootRef.current?.removeAttribute("data-pressed");
    };

    const restoreCursor = () => {
      if (document.visibilityState === "hidden") {
        return;
      }

      const nextPoint = targetRef.current;

      if (nextPoint.x === 0 && nextPoint.y === 0) {
        return;
      }

      bigCursorRef.current = nextPoint;
      smallCursorRef.current = nextPoint;
      syncCursorStyles();
      setCursorVisible(true);
      ensureAnimation();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handlePointerExit();
        return;
      }

      restoreCursor();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("blur", handlePointerExit);
    window.addEventListener("pageshow", restoreCursor);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("blur", handlePointerExit);
      window.removeEventListener("pageshow", restoreCursor);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopAnimation();
    };
  }, []);

  return (
    <div ref={rootRef} className="custom-cursor" aria-hidden="true">
      <div className="custom-cursor__ball custom-cursor__ball--big" />
      <div className="custom-cursor__ball custom-cursor__ball--small" />
    </div>
  );
}
