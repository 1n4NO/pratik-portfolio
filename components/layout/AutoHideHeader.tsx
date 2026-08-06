"use client";

import { useEffect, useState } from "react";

export function AutoHideHeader({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    let previousY = window.scrollY;
    let ticking = false;

    function update() {
      const currentY = window.scrollY;
      const delta = currentY - previousY;
      const shouldUseAutoHide = mediaQuery.matches;

      if (!shouldUseAutoHide || currentY < 24) {
        setHidden(false);
      } else if (Math.abs(delta) > 8) {
        setHidden(delta > 0);
      }

      previousY = currentY;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    function onMediaChange() {
      previousY = window.scrollY;
      if (!mediaQuery.matches) setHidden(false);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    mediaQuery.addEventListener("change", onMediaChange);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      mediaQuery.removeEventListener("change", onMediaChange);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md transition-transform duration-300 ease-out will-change-transform ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {children}
    </header>
  );
}
