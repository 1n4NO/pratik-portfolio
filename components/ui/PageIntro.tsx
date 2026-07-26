import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  children,
  action,
  size = "page",
  align = "split",
  titleClassName = "",
  className = "",
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  size?: "page" | "section";
  align?: "split" | "stack";
  titleClassName?: string;
  className?: string;
}) {
  const layout =
    align === "split"
      ? "flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      : "flex flex-col gap-5";
  const titleSize =
    size === "page"
      ? "text-4xl md:text-5xl"
      : "text-3xl md:text-4xl";

  return (
    <div className={`${layout} ${className}`}>
      <div>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-signal">
          {eyebrow}
        </p>
        <h1 className={`max-w-xl font-display font-bold ${titleSize} ${titleClassName}`}>
          {title}
        </h1>
        {children && <div className="mt-4 max-w-md text-ink-soft">{children}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
