"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Screenshot } from "@/data/projects";
import { motionEase, motionTimings } from "@/lib/motion";

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
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const reduceMotion = useReducedMotion();
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

  const isVideo = isVideoSrc(item.src);
  const controlClass =
    "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#05080d]/70 text-[#F7F8FA] shadow-overlay backdrop-blur-md transition-colors hover:bg-[#05080d]/85 focus-ring";

  function onPointerDown(event: React.PointerEvent) {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event: React.PointerEvent) {
    if (items.length < 2 || event.pointerType === "mouse" || !pointerStartRef.current) return;

    const deltaX = event.clientX - pointerStartRef.current.x;
    const deltaY = event.clientY - pointerStartRef.current.y;
    pointerStartRef.current = null;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX > 0) {
      onPrev();
    } else {
      onNext();
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption ?? item.alt ?? "Screenshot viewer"}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10"
      style={{ backgroundColor: "rgba(5, 8, 13, 0.95)" }}
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
        <X size={18} className="icon-amber" aria-hidden="true" />
      </button>

      {items.length > 1 && (
        <>
          <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-[#05080d]/70 px-3 py-1.5 font-mono text-[11px] text-[#F7F8FA]/75 shadow-overlay backdrop-blur-md md:bottom-8">
            {index + 1} / {items.length}
          </div>
          <button
            onClick={onPrev}
            aria-label="Previous screenshot"
            className={`absolute left-2 top-1/2 -translate-y-1/2 md:left-6 ${controlClass}`}
          >
            <ChevronLeft size={20} className="icon-amber" aria-hidden="true" />
          </button>
          <button
            onClick={onNext}
            aria-label="Next screenshot"
            className={`absolute right-2 top-1/2 -translate-y-1/2 md:right-6 ${controlClass}`}
          >
            <ChevronRight size={20} className="icon-amber" aria-hidden="true" />
          </button>
        </>
      )}

      <motion.div
        className="flex max-h-full max-w-5xl touch-pan-y flex-col items-center"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={item.src}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.985, y: 8 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.99, y: -6 }}
            transition={{ duration: motionTimings.base, ease: motionEase.soft }}
          >
            {isVideo ? (
              <video
                className="max-h-[78vh] w-auto max-w-full rounded-lg border border-white/10 object-contain shadow-overlay"
                autoPlay
                muted
                loop
                playsInline
                controls
                aria-label={item.alt ?? item.caption ?? "Project screen recording"}
              >
                {item.src.toLowerCase().endsWith(".webm") && (
                  <source src={item.src} type="video/webm" />
                )}
                <source src={videoFallbackSrc(item.src)} type="video/mp4" />
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt={item.alt ?? ""}
                className="max-h-[78vh] w-auto max-w-full rounded-lg border border-white/10 object-contain shadow-overlay"
              />
            )}
          </motion.div>
        </AnimatePresence>
        {item.caption && (
          <div className="mt-4 font-mono text-[11px] text-[#F7F8FA]/70">
            {item.caption}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function isVideoSrc(src: string) {
  return /\.(webm|mp4)$/i.test(src);
}

function videoFallbackSrc(src: string) {
  return src.replace(/\.(webm|mp4)$/i, ".mp4");
}
