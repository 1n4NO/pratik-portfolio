"use client";

import { useMemo } from "react";

export function HeroBackdrop({ stableDarkGrid = false }: { stableDarkGrid?: boolean }) {
  const gridStyle = useMemo(
    () =>
      stableDarkGrid
        ? {
            backgroundImage:
              "linear-gradient(rgb(255 255 255 / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }
        : undefined,
    [stableDarkGrid]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className={`absolute inset-0 ${stableDarkGrid ? "opacity-35" : "grid-lines opacity-45"}`}
        style={gridStyle}
      />
    </div>
  );
}
