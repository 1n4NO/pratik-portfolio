"use client";

import { useCallback, useState } from "react";
import { ZoomIn } from "lucide-react";
import { ScreenshotTile } from "@/components/ui/ScreenshotTile";
import { Lightbox } from "@/components/ui/Lightbox";
import type { Screenshot } from "@/data/projects";

export function ScreenshotGallery({
  screenshots,
  slugPrefix,
}: {
  screenshots: Screenshot[];
  slugPrefix: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + screenshots.length) % screenshots.length
      ),
    [screenshots.length]
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % screenshots.length)),
    [screenshots.length]
  );

  return (
    <>
      <div className="columns-1 gap-4 md:columns-2 xl:columns-3">
        {screenshots.map((shot, index) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group relative block w-full text-left focus-ring rounded-lg"
            aria-label={`Open screenshot${shot.caption ? `: ${shot.caption}` : ""}`}
          >
            <ScreenshotTile
              item={{ ...shot, id: `${slugPrefix}-detail-shot-${index}` }}
              index={index}
              priority={index < 2}
              mode="masonry"
            />
            <span
              className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-[#05080d]/0 opacity-0 transition-all duration-200 group-hover:bg-[#05080d]/35 group-hover:opacity-100"
              aria-hidden="true"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-[#F7F8FA] backdrop-blur-sm">
                <ZoomIn size={16} aria-hidden="true" />
              </span>
            </span>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          items={screenshots}
          index={openIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
