"use client";

import { useState } from "react";
import type { Screenshot } from "@/data/projects";

export type ScreenshotTileItem = Partial<Screenshot> & {
  id: string;
  dummy?: boolean;
};

export function ScreenshotTile({
  item,
  index,
  priority = false,
  mode = "masonry",
}: {
  item: ScreenshotTileItem;
  index: number;
  priority?: boolean;
  mode?: "masonry" | "rail";
}) {
  const [errored, setErrored] = useState(false);
  const showDummy = item.dummy || !item.src || errored;
  const railWidth = ["w-[260px]", "w-[340px]", "w-[300px]", "w-[390px]"][index % 4];
  const imageClass =
    mode === "rail"
      ? "block h-[96px] w-full object-cover object-top md:h-[126px]"
      : "block h-auto w-full";
  const figureClass =
    mode === "rail"
      ? `shrink-0 overflow-hidden rounded-lg border border-line bg-surface shadow-[0_18px_50px_rgb(var(--color-ink)_/_0.14)] ${railWidth}`
      : "mb-3 break-inside-avoid overflow-hidden rounded-lg border border-line bg-surface shadow-[0_18px_50px_rgb(var(--color-ink)_/_0.14)]";

  return (
    <figure className={figureClass}>
      <div className="overflow-hidden bg-surface-muted">
        {!showDummy && item.src ? (
          <img
            src={item.src}
            alt={item.alt ?? ""}
            className={imageClass}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onError={() => setErrored(true)}
          />
        ) : (
          <DummyScreenshot index={index} />
        )}
      </div>
      {item.caption && (
        <figcaption className="border-t border-line px-3 py-2 font-mono text-[10px] text-ink-soft">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

function DummyScreenshot({ index }: { index: number }) {
  const bars = Array.from({ length: 5 + (index % 3) }, (_, i) => i);
  const tiles = Array.from({ length: 3 + (index % 4) }, (_, i) => i);

  return (
    <div className="min-h-[220px] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="h-2.5 w-24 rounded bg-line-strong/70" />
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-signal/75" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/75" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong/80" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {tiles.map((tile) => (
          <div
            key={tile}
            className={`rounded border border-line bg-paper/70 ${
              tile % 3 === 0 ? "col-span-2 h-14" : "h-14"
            }`}
          />
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {bars.map((bar) => (
          <div
            key={bar}
            className="h-2 rounded bg-line-strong/60"
            style={{ width: `${94 - ((bar + index) % 5) * 12}%` }}
          />
        ))}
      </div>
    </div>
  );
}
