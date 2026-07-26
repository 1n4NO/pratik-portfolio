"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "./Container";

const TICKS = 48;

export function RulerDivider({ index, total }: { index: number; total: number }) {
  const label = String(index).padStart(2, "0");
  const of = String(total).padStart(2, "0");
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    function update() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Fills as the divider travels from the bottom of the viewport to the top —
      // a literal ruler tracking scroll position, not just a static section break.
      const raw = 1 - rect.top / vh;
      setProgress(Math.min(1, Math.max(0, raw)));
    }

    if (reduceMotion) {
      update();
      return;
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
    <Container className="py-2">
      <div ref={ref} className="flex items-center gap-3">
        <span
          className="font-mono text-[10px] transition-colors duration-300"
          style={{
            color:
              progress > 0.15
                ? "rgb(var(--color-signal))"
                : "rgb(var(--color-ink-soft) / 0.6)",
          }}
        >
          {label} / {of}
        </span>
        <div className="flex-1 h-2 flex items-end gap-[3px]" aria-hidden="true">
          {Array.from({ length: TICKS }).map((_, i) => (
            <span
              key={i}
              className="w-px transition-colors duration-300"
              style={{
                height: i % 4 === 0 ? "8px" : "4px",
                backgroundColor:
                  i < filledCount
                    ? "rgb(var(--color-signal))"
                    : "rgb(var(--color-line-strong))",
              }}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
