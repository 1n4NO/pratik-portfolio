import Image from "next/image";
import { Download } from "lucide-react";

type PrismateIconCardProps = {
  name: string;
  filename: string;
};

export function PrismateIconCard({ name, filename }: PrismateIconCardProps) {
  const src = `/downloads/prismate/${filename}`;

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-line bg-surface p-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-line bg-paper p-2">
        <Image src={src} alt={`${name} Prismate icon`} width={128} height={128} />
      </div>
      <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">{name}</p>
      <a
        href={src}
        download
        className="inline-flex items-center gap-1.5 rounded border border-line-strong px-3 py-1.5 font-mono text-[11px] text-ink hover:border-ink focus-ring"
      >
        <Download size={12} aria-hidden="true" />
        PNG
      </a>
    </div>
  );
}
