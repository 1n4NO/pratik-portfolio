"use client";

import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Screenshot } from "@/data/projects";

// Always renders on a fixed dark scrim regardless of site theme — same
// convention as the ContactCTA/Footer panels — since a photo viewer should
// maximize image contrast, not follow light/dark toggling.
export function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: Screenshot[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  const controlClass =
    "flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#F7F8FA] transition-colors hover:bg-white/20 focus-ring";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption ?? item.alt ?? "Screenshot viewer"}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10"
      style={{ backgroundColor: "rgba(5, 8, 13, 0.92)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close"
        className={`absolute right-4 top-4 md:right-8 md:top-8 ${controlClass}`}
      >
        <X size={18} aria-hidden="true" />
      </button>

      {items.length > 1 && (
        <>
          <button
            onClick={onPrev}
            aria-label="Previous screenshot"
            className={`absolute left-2 top-1/2 -translate-y-1/2 md:left-6 ${controlClass}`}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            onClick={onNext}
            aria-label="Next screenshot"
            className={`absolute right-2 top-1/2 -translate-y-1/2 md:right-6 ${controlClass}`}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </>
      )}

      <div className="flex max-h-full max-w-5xl flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.alt ?? ""}
          className="max-h-[78vh] w-auto max-w-full rounded-lg border border-white/10 object-contain shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
        />
        {(item.caption || items.length > 1) && (
          <div className="mt-4 flex items-center gap-3 font-mono text-[11px] text-[#F7F8FA]/70">
            {item.caption && <span>{item.caption}</span>}
            {items.length > 1 && (
              <span className="text-[#F7F8FA]/45">
                {index + 1} / {items.length}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
