"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { motionEase, motionTimings } from "@/lib/motion";

export type CaseStudyNavItem = {
  id: string;
  label: string;
};

export function CaseStudyNav({ items }: { items: CaseStudyNavItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const reduceMotion = useReducedMotion();
  const activeIndex = Math.max(items.findIndex((item) => item.id === activeId), 0);
  const progress = items.length > 1 ? ((activeIndex + 1) / items.length) * 100 : 100;

  useEffect(() => {
    const observers = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (observers.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-28% 0px -58% 0px",
        threshold: [0.1, 0.35, 0.6],
      }
    );

    observers.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Case study sections"
      className="-mx-6 mb-8 border-y border-line bg-paper/95 px-6 py-3 backdrop-blur-sm md:mx-0 md:mb-7 md:border-y-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none"
    >
      <p className="mb-3 hidden font-mono text-[10px] uppercase tracking-widest text-ink-soft/60 md:block">
        Case study
      </p>
      <ol className="flex gap-2 overflow-x-auto md:flex-col md:gap-1 md:overflow-visible">
        {items.map((item) => {
          const active = activeId === item.id;

          return (
            <li key={item.id} className="shrink-0 md:shrink">
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={`group inline-flex items-center gap-2 rounded px-2.5 py-1.5 font-mono text-[11px] transition-colors focus-ring md:w-full ${
                  active ? "bg-signal/10 text-signal" : "text-ink-soft hover:text-ink"
                }`}
              >
                <span
                  className="relative hidden h-px w-4 bg-line-strong transition-colors group-hover:bg-ink-soft md:block"
                  aria-hidden="true"
                >
                  {active && (
                    <motion.span
                      layoutId="case-study-nav-active-line"
                      className="absolute inset-0 bg-signal"
                      transition={{ duration: motionTimings.base, ease: motionEase.soft }}
                    />
                  )}
                </span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
      <div className="mt-3 h-px overflow-hidden bg-line md:hidden" aria-hidden="true">
        <motion.span
          className="block h-full bg-signal"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: motionTimings.base, ease: motionEase.soft }
          }
        />
      </div>
    </nav>
  );
}
