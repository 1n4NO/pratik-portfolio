"use client";

import { useEffect, useState } from "react";
import { BriefcaseBusiness, Code2 } from "lucide-react";

type ReadingMode = "recruiter" | "engineer";

const storageKey = "portfolio-case-study-mode";

export function ReadingModeToggle() {
  const [mode, setMode] = useState<ReadingMode>("recruiter");

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    const nextMode = saved === "engineer" ? "engineer" : "recruiter";
    setMode(nextMode);
    document.documentElement.dataset.caseStudyMode = nextMode;

    return () => {
      delete document.documentElement.dataset.caseStudyMode;
    };
  }, []);

  function updateMode(nextMode: ReadingMode) {
    setMode(nextMode);
    localStorage.setItem(storageKey, nextMode);
    document.documentElement.dataset.caseStudyMode = nextMode;
  }

  return (
    <div className="inline-flex items-center gap-3">
      <span className="hidden font-mono text-[10px] uppercase tracking-widest text-ink-soft/60 sm:inline">
        Reading mode
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={mode === "engineer"}
        aria-label="Toggle case study reading mode"
        onClick={() => updateMode(mode === "recruiter" ? "engineer" : "recruiter")}
        className="group relative grid w-[220px] grid-cols-2 rounded border border-line bg-surface p-1 font-mono text-[11px] text-ink-soft focus-ring"
      >
        <span
          className={`absolute bottom-1 top-1 w-[calc(50%-0.25rem)] rounded bg-signal transition-transform duration-300 ease-out ${
            mode === "engineer" ? "translate-x-[calc(100%+0.25rem)]" : "translate-x-0"
          }`}
          aria-hidden
        />
        <ModeLabel active={mode === "recruiter"} icon={BriefcaseBusiness} label="Recruiter" />
        <ModeLabel active={mode === "engineer"} icon={Code2} label="Engineer" />
      </button>
    </div>
  );
}

function ModeLabel({
  active,
  icon: Icon,
  label,
}: {
  active: boolean;
  icon: typeof BriefcaseBusiness;
  label: string;
}) {
  return (
    <span
      className={`relative z-10 inline-flex items-center justify-center gap-1.5 rounded px-3 py-1.5 transition-colors ${
        active ? "text-paper" : "text-ink-soft group-hover:text-ink"
      }`}
    >
      <Icon size={14} className={active ? "icon-current" : "icon-amber"} aria-hidden />
      {label}
    </span>
  );
}
