"use client";

import { useEffect, useRef } from "react";

export function LottieAnimation({
  src,
  label,
  className = "",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;
    let animation: { destroy: () => void } | null = null;

    import("lottie-web").then(({ default: lottie }) => {
      if (!containerRef.current || cancelled) return;

      animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: src,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid meet",
        },
      });
    });

    return () => {
      cancelled = true;
      animation?.destroy();
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={className}
      role="img"
      aria-label={label}
    />
  );
}
