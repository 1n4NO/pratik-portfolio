"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let frameId = 0;

    const stop = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }

      lenis?.destroy();
      lenis = null;
    };

    const start = () => {
      if (mediaQuery.matches || lenis) return;

      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: true,
        allowNestedScroll: true,
        anchors: true,
        stopInertiaOnNavigate: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frameId = requestAnimationFrame(raf);
      };

      frameId = requestAnimationFrame(raf);
    };

    start();

    const handleMotionChange = () => {
      stop();
      start();
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      stop();
    };
  }, []);

  return null;
}
