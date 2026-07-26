"use client";

import { useEffect, useState } from "react";

const TICKS = 64;

/**
 * Sticky tick-mark rail that fills left-to-right with page scroll progress.
 * Reuses the same ruler visual language as the homepage RulerDivider, applied
 * here as a genuine reading-progress indicator on long-form pages.
 */
export function ReadingProgressRuler() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    function update() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const raw = scrollable > 0 ? doc.scrollTop / scrollable : 0;
      setProgress(Math.min(1, Math.max(0, raw)));
    }

    if (reduceMotion) {
      update();
      window.addEventListener("scroll", update, { passive: true });
      return () => window.removeEventListener("scroll", update);
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const filledCount = Math.round(progress * TICKS);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      className="sticky top-16 z-30 flex h-2 w-full items-end gap-[2px] border-b border-line bg-paper/90 backdrop-blur-sm"
    >
      {Array.from({ length: TICKS }).map((_, i) => (
        <span
          key={i}
          className="flex-1 transition-colors duration-200"
          style={{
            height: i % 4 === 0 ? "8px" : "4px",
            backgroundColor:
              i < filledCount
                ? "rgb(var(--color-signal))"
                : "rgb(var(--color-line-strong) / 0.5)",
          }}
        />
      ))}
    </div>
  );
}
