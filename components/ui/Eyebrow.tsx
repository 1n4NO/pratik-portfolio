import type { ReactNode } from "react";

export function Eyebrow({
  children,
  index,
  total,
  className = "",
}: {
  children: ReactNode;
  index?: string;
  total?: string;
  className?: string;
}) {
  return (
    <p
      className={`mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-micro uppercase tracking-caps-wide text-signal ${className}`}
    >
      <span>{children}</span>
      {index && total && (
        <span className="text-ink-soft/45" aria-hidden="true">
          {index} / {total}
        </span>
      )}
    </p>
  );
}
