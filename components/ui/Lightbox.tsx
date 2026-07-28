"use client";

import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Screenshot } from "@/data/projects";
import { motionEase, motionTimings } from "@/lib/motion";
import { getThemedMediaSrc, hasMediaThemePair } from "@/lib/media";

// Always renders on a fixed dark scrim regardless of site theme — same
// convention as the ContactCTA/Footer panels — since a photo viewer should
// maximize image contrast, not follow light/dark toggling.
export function Lightbox({
  items,
  pairItems = items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: Screenshot[];
  pairItems?: Screenshot[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const compareDraggingRef = useRef(false);
  const compareFrameRef = useRef<HTMLDivElement>(null);
  const darkVideoRef = useRef<HTMLVideoElement>(null);
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [splitPosition, setSplitPosition] = useState(50);
  const [showDragCue, setShowDragCue] = useState(false);
  const item = items[index];
  const pairSources = useMemo(() => pairItems.map((shot) => shot.src), [pairItems]);
  const hasThemeVariant = Boolean(item?.src) && hasMediaThemePair(item.src, pairSources);
  const darkSrc = useMemo(() => getThemedMediaSrc(item?.src ?? "", "dark"), [item?.src]);
  const lightSrc = useMemo(() => getThemedMediaSrc(item?.src ?? "", "light"), [item?.src]);

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

  useEffect(() => {
    setSplitPosition(50);
    compareDraggingRef.current = false;
    setShowDragCue(Boolean(item?.src) && hasThemeVariant);
  }, [item?.src]);

  useEffect(() => {
    if (!showDragCue) return;

    const timer = window.setTimeout(() => {
      setShowDragCue(false);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [showDragCue]);

  useEffect(() => {
    if (!item?.src || !hasThemeVariant || !isVideoSrc(item.src)) return;

    const darkVideo = darkVideoRef.current;
    const lightVideo = lightVideoRef.current;
    if (!darkVideo || !lightVideo) return;

    let syncLock: "dark" | "light" | null = null;

    const syncVideo = (
      source: HTMLVideoElement,
      target: HTMLVideoElement,
      sourceId: "dark" | "light"
    ) => {
      if (syncLock && syncLock !== sourceId) return;
      syncLock = sourceId;

      try {
        if (Math.abs(target.currentTime - source.currentTime) > 0.08) {
          target.currentTime = source.currentTime;
        }

        if (target.playbackRate !== source.playbackRate) {
          target.playbackRate = source.playbackRate;
        }

        if (source.paused) {
          if (!target.paused) target.pause();
        } else if (target.paused) {
          void target.play().catch(() => {});
        }
      } finally {
        window.setTimeout(() => {
          if (syncLock === sourceId) syncLock = null;
        }, 0);
      }
    };

    const syncFromDark = () => syncVideo(darkVideo, lightVideo, "dark");
    const syncFromLight = () => syncVideo(lightVideo, darkVideo, "light");

    const events = ["loadedmetadata", "play", "pause", "seeking", "seeked", "ratechange", "timeupdate"] as const;

    events.forEach((eventName) => {
      darkVideo.addEventListener(eventName, syncFromDark);
      lightVideo.addEventListener(eventName, syncFromLight);
    });

    syncFromDark();
    syncFromLight();

    return () => {
      events.forEach((eventName) => {
        darkVideo.removeEventListener(eventName, syncFromDark);
        lightVideo.removeEventListener(eventName, syncFromLight);
      });
    };
  }, [hasThemeVariant, item?.src]);

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

  function updateSplitFromClientX(clientX: number) {
    const frame = compareFrameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    if (rect.width <= 0) return;

    const nextPosition = ((clientX - rect.left) / rect.width) * 100;
    setSplitPosition(Math.max(0, Math.min(100, nextPosition)));
  }

  function onComparePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    compareDraggingRef.current = true;
    setShowDragCue(false);
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    updateSplitFromClientX(event.clientX);
  }

  function onComparePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (!compareDraggingRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    updateSplitFromClientX(event.clientX);
  }

  function onComparePointerUp(event: React.PointerEvent<HTMLButtonElement>) {
    if (!compareDraggingRef.current) return;
    compareDraggingRef.current = false;
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function onComparePointerCancel(event: React.PointerEvent<HTMLButtonElement>) {
    compareDraggingRef.current = false;
    event.stopPropagation();
  }

  function onCompareKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    setShowDragCue(false);

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setSplitPosition((current) => Math.max(0, current - 5));
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setSplitPosition((current) => Math.min(100, current + 5));
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setSplitPosition(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setSplitPosition(100);
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

      {hasThemeVariant && (
        <div className="absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-[#05080d]/75 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[#F7F8FA]/75 shadow-overlay backdrop-blur-md md:top-8">
          Drag to compare
        </div>
      )}

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
            {hasThemeVariant ? (
              <div
                ref={compareFrameRef}
                className="relative inline-block overflow-hidden rounded-lg border border-white/10 bg-black shadow-overlay"
              >
                {isVideo ? (
                  <>
                    <ComparisonVideo
                      ref={darkVideoRef}
                      src={darkSrc}
                      alt={item.alt ?? item.caption ?? "Project screen recording"}
                      className="max-h-[78vh] w-auto max-w-full object-contain"
                    />
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ clipPath: `inset(0 0 0 ${splitPosition}%)` }}
                    >
                      <ComparisonVideo
                        ref={lightVideoRef}
                        src={lightSrc}
                        alt={item.alt ?? item.caption ?? "Project screen recording"}
                        className="max-h-[78vh] w-auto max-w-full object-contain"
                        ariaHidden
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={darkSrc}
                      alt={item.alt ?? ""}
                      className="max-h-[78vh] w-auto max-w-full object-contain"
                    />
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ clipPath: `inset(0 0 0 ${splitPosition}%)` }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={lightSrc}
                        alt=""
                        aria-hidden="true"
                        className="max-h-[78vh] w-auto max-w-full object-contain"
                      />
                    </div>
                  </>
                )}

                {showDragCue && (
                  <div
                    className="pointer-events-none absolute top-4 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-[#05080d]/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#F7F8FA]/70 shadow-overlay backdrop-blur-md"
                    style={{ left: `${splitPosition}%` }}
                  >
                    Drag
                  </div>
                )}

                <button
                  type="button"
                  role="slider"
                  aria-label="Drag to compare dark and light media"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(splitPosition)}
                  aria-valuetext={`${Math.round(splitPosition)} percent dark media revealed`}
                  tabIndex={0}
                  onPointerDown={onComparePointerDown}
                  onPointerMove={onComparePointerMove}
                  onPointerUp={onComparePointerUp}
                  onPointerCancel={onComparePointerCancel}
                  onKeyDown={onCompareKeyDown}
                  className="absolute inset-y-0 z-20 w-10 -translate-x-1/2 touch-none cursor-ew-resize focus:outline-none"
                  style={{ left: `${splitPosition}%` }}
                >
                  <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/85 shadow-[0_0_0_1px_rgba(0,0,0,0.3)]" />
                  <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#05080d]/90 shadow-overlay">
                    <span className="h-3 w-3 rounded-full border border-white/70 bg-white/90" />
                  </span>
                </button>
              </div>
            ) : isVideo ? (
              <video
                className="max-h-[78vh] w-auto max-w-full rounded-lg border border-white/10 object-contain shadow-overlay"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="auto"
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

const ComparisonVideo = forwardRef<
  HTMLVideoElement,
  {
    src: string;
    alt: string;
    className: string;
    ariaHidden?: boolean;
  }
>(function ComparisonVideo({ src, alt, className, ariaHidden = false }, ref) {
  return (
    <video
      ref={ref}
      className={`${className} pointer-events-none`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label={alt}
      aria-hidden={ariaHidden}
    >
      {src.toLowerCase().endsWith(".webm") && <source src={src} type="video/webm" />}
      <source src={videoFallbackSrc(src)} type="video/mp4" />
    </video>
  );
});

function isVideoSrc(src: string) {
  return /\.(webm|mp4)$/i.test(src);
}

function videoFallbackSrc(src: string) {
  return src.replace(/\.(webm|mp4)$/i, ".mp4");
}
