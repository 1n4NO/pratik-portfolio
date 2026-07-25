"use client";

import { useState } from "react";
import Image from "next/image";

export function BrowserFrame({
  src,
  alt,
  url,
  priority = false,
}: {
  src: string;
  alt: string;
  url?: string;
  priority?: boolean;
}) {
  const [errored, setErrored] = useState(false);
  const isGif = src.toLowerCase().endsWith(".gif");

  return (
    <div className="rounded-lg border border-line bg-surface overflow-hidden shadow-[0_1px_0_rgb(var(--color-ink)_/_0.04)]">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line bg-surface-muted">
        <span className="w-2.5 h-2.5 rounded-full bg-line-strong" />
        <span className="w-2.5 h-2.5 rounded-full bg-line-strong" />
        <span className="w-2.5 h-2.5 rounded-full bg-line-strong" />
        {url && (
          <span className="font-mono text-[10px] text-ink-soft/70 ml-2 truncate">{url}</span>
        )}
      </div>
      <div className="relative w-full aspect-[16/10] bg-surface-muted">
        {!errored && isGif ? (
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover object-top"
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onError={() => setErrored(true)}
          />
        ) : !errored ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
            priority={priority}
            onError={() => setErrored(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center grid-backdrop">
            <span className="font-mono text-[10px] text-ink-soft/60 bg-paper/90 px-2 py-1 rounded">
              screenshot pending
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
