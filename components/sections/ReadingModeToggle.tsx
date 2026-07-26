"use client";

import { useEffect, useState } from "react";
import { BriefcaseBusiness, Code2, X } from "lucide-react";

type ReadingMode = "recruiter" | "engineer";

const storageKey = "portfolio-case-study-mode";
const toastStorageKey = "portfolio-case-study-mode-toast-seen";
const calloutStorageKey = "portfolio-case-study-mode-callout-seen";

export function ReadingModeToggle() {
  const [mode, setMode] = useState<ReadingMode>("recruiter");
  const [toastVisible, setToastVisible] = useState(false);
  const [calloutVisible, setCalloutVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    const nextMode = saved === "engineer" ? "engineer" : "recruiter";
    setMode(nextMode);
    document.documentElement.dataset.caseStudyMode = nextMode;
    setCalloutVisible(localStorage.getItem(calloutStorageKey) !== "true");

    return () => {
      delete document.documentElement.dataset.caseStudyMode;
    };
  }, []);

  function updateMode(nextMode: ReadingMode) {
    setMode(nextMode);
    localStorage.setItem(storageKey, nextMode);
    localStorage.setItem(calloutStorageKey, "true");
    setCalloutVisible(false);
    document.documentElement.dataset.caseStudyMode = nextMode;
    document.documentElement.dataset.caseStudyModePulse = nextMode;
    window.setTimeout(() => {
      delete document.documentElement.dataset.caseStudyModePulse;
    }, 520);

    if (localStorage.getItem(toastStorageKey) !== "true") {
      setToastVisible(true);
      localStorage.setItem(toastStorageKey, "true");
      window.setTimeout(() => setToastVisible(false), 2200);
    }
  }

  function dismissCallout() {
    localStorage.setItem(calloutStorageKey, "true");
    setCalloutVisible(false);
  }

  return (
    <div className="relative inline-flex flex-col items-start gap-2 sm:items-end">
      <div className="inline-flex items-center gap-3">
        <div className="hidden text-right md:block">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-ink-soft/60">
            Reading mode
          </span>
          <span className="mt-1 block max-w-[260px] text-xs leading-snug text-ink-soft/70">
            Prioritize hiring signals or engineering detail.
          </span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={mode === "engineer"}
          aria-label="Toggle case study reading mode"
          onClick={() => updateMode(mode === "recruiter" ? "engineer" : "recruiter")}
          className="group relative grid w-[220px] grid-cols-2 rounded border border-line bg-surface p-1 font-mono text-[11px] text-ink-soft focus-ring"
        >
          <span
            className={`absolute bottom-1 left-1 top-1 w-[calc(50%-0.25rem)] rounded bg-signal transition-transform duration-300 ease-out ${
              mode === "engineer" ? "translate-x-[calc(100%+0.25rem)]" : "translate-x-0"
            }`}
            aria-hidden
          />
          <ModeLabel active={mode === "recruiter"} icon={BriefcaseBusiness} label="Recruiter" />
          <ModeLabel active={mode === "engineer"} icon={Code2} label="Engineer" />
        </button>
      </div>

      <div aria-live="polite" className="pointer-events-none absolute right-0 top-[calc(100%+0.5rem)] z-20">
        {toastVisible && (
          <div className="rounded border border-line bg-paper/95 px-3 py-2 text-xs text-ink-soft shadow-card backdrop-blur">
            Case study emphasis updated.
          </div>
        )}
      </div>

      {calloutVisible && (
        <div className="w-full rounded border border-amber/35 bg-amber-bg/70 px-3 py-2 text-left shadow-card sm:w-[360px] sm:bg-paper/95 sm:backdrop-blur">
          <div className="flex items-start gap-3">
            <p className="text-xs leading-relaxed text-ink">
              This page adapts: toggle for hiring signal or engineering depth.
            </p>
            <button
              type="button"
              onClick={dismissCallout}
              className="-mr-1 -mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded text-ink-soft hover:bg-surface-muted hover:text-ink focus-ring"
              aria-label="Dismiss reading mode note"
            >
              <X size={13} className="icon-amber" aria-hidden />
            </button>
          </div>
        </div>
      )}
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
