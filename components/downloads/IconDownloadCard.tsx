"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { ICON_EXPORT_COLOR, type DownloadableIcon } from "@/data/downloadableIcons";

const PNG_EXPORT_SIZE = 512;

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function IconDownloadCard({ icon }: { icon: DownloadableIcon }) {
  const [status, setStatus] = useState<"idle" | "exporting" | "error">("idle");
  const filenameBase = slugify(icon.name);
  // Swap the baked export color for currentColor so the on-page preview picks
  // up the amber accent via CSS — the downloaded file still uses the fixed
  // export color, since that's meant to work outside any theme context.
  const previewSvg = icon.svg.split(ICON_EXPORT_COLOR).join("currentColor");

  function downloadSvg() {
    const blob = new Blob([icon.svg], { type: "image/svg+xml" });
    downloadBlob(blob, `${filenameBase}.svg`);
  }

  function downloadPng() {
    setStatus("exporting");
    const svgBlob = new Blob([icon.svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = PNG_EXPORT_SIZE;
      canvas.height = PNG_EXPORT_SIZE;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setStatus("error");
        URL.revokeObjectURL(url);
        return;
      }
      ctx.drawImage(img, 0, 0, PNG_EXPORT_SIZE, PNG_EXPORT_SIZE);
      canvas.toBlob((blob) => {
        if (blob) downloadBlob(blob, `${filenameBase}.png`);
        else setStatus("error");
        URL.revokeObjectURL(url);
        setStatus("idle");
      }, "image/png");
    };

    img.onerror = () => {
      setStatus("error");
      URL.revokeObjectURL(url);
    };

    img.src = url;
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-line bg-surface p-6 text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded border border-line bg-paper text-amber [&_svg]:h-9 [&_svg]:w-9"
        dangerouslySetInnerHTML={{ __html: previewSvg }}
      />
      <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">{icon.name}</p>
      <div className="flex gap-2">
        <button
          onClick={downloadSvg}
          className="inline-flex items-center gap-1.5 rounded border border-line-strong px-3 py-1.5 font-mono text-[11px] text-ink hover:border-ink focus-ring"
        >
          <Download size={12} aria-hidden="true" />
          SVG
        </button>
        <button
          onClick={downloadPng}
          disabled={status === "exporting"}
          className="inline-flex items-center gap-1.5 rounded border border-line-strong px-3 py-1.5 font-mono text-[11px] text-ink hover:border-ink focus-ring disabled:opacity-50"
        >
          <Download size={12} aria-hidden="true" />
          {status === "exporting" ? "…" : "PNG"}
        </button>
      </div>
      {status === "error" && (
        <p className="font-mono text-[10px] text-danger">PNG export failed. Try SVG instead.</p>
      )}
    </div>
  );
}
