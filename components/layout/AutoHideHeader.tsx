"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type HeaderTheme = "dark" | "light";
type HeaderStyle = React.CSSProperties & Record<`--${string}`, string>;

const headerThemeVariables: Record<HeaderTheme, HeaderStyle> = {
  dark: {
    "--header-paper": "22 21 18",
    "--header-ink": "234 234 236",
    "--header-ink-soft": "196 192 190",
    "--header-line": "70 68 63",
    "--header-line-strong": "118 117 113",
    "--header-signal": "172 152 136",
  },
  light: {
    "--header-paper": "244 239 230",
    "--header-ink": "5 8 13",
    "--header-ink-soft": "37 43 56",
    "--header-line": "142 137 128",
    "--header-line-strong": "74 72 68",
    "--header-signal": "172 104 18",
  },
};

export function AutoHideHeader({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const [theme, setTheme] = useState<HeaderTheme>("dark");
  const pathname = usePathname();

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

  useEffect(() => {
    setTheme("dark");
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-theme]")
    );
    if (!sections.length) return;

    let currentTheme: HeaderTheme = "dark";
    let frame = 0;

    const updateTheme = () => {
      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const activeSection = sections
        .map((section) => ({
          section,
          bounds: section.getBoundingClientRect(),
        }))
        .filter(({ bounds }) => bounds.top <= headerHeight && bounds.bottom > headerHeight)
        .sort((a, b) => b.bounds.top - a.bounds.top)[0]?.section;

      const nextTheme = (activeSection?.dataset.headerTheme as HeaderTheme | undefined) ?? "dark";
      if (nextTheme !== currentTheme) {
        currentTheme = nextTheme;
        setTheme(nextTheme);
      }
      frame = 0;
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateTheme);
    };

    const observer = new IntersectionObserver(scheduleUpdate, {
      threshold: [0, 0.01, 0.5, 0.99, 1],
    });
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <header
      style={headerThemeVariables[theme]}
      data-header-active-theme={theme}
      className={`sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md transition-[background-color,border-color,color,transform] duration-500 ease-in-out will-change-transform ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {children}
    </header>
  );
}
