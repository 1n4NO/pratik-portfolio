import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionGrid } from "@/components/ui/SectionGrid";

export function PageIntro({
  eyebrow,
  title,
  children,
  action,
  size = "page",
  align = "split",
  index,
  total,
  titleClassName = "",
  className = "",
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  size?: "page" | "section";
  align?: "split" | "stack" | "editorial";
  index?: string;
  total?: string;
  titleClassName?: string;
  className?: string;
}) {
  const titleSize =
    size === "page"
      ? "text-hero tracking-display"
      : "text-section-title tracking-display";

  if (align === "editorial") {
    return (
      <SectionGrid
        wide
        className={className}
        aside={
          <>
            <Eyebrow index={index} total={total}>
              {eyebrow}
            </Eyebrow>
            {action && <div className="mt-8 hidden md:block">{action}</div>}
          </>
        }
        contentClassName="max-w-prose-wide"
      >
        <h1 className={`font-display font-medium ${titleSize} ${titleClassName}`}>
          {title}
        </h1>
        {children && (
          <div className="mt-6 text-standfirst leading-standfirst text-ink-soft">{children}</div>
        )}
        {action && <div className="mt-8 md:hidden">{action}</div>}
      </SectionGrid>
    );
  }

  const layout =
    align === "split"
      ? "flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
      : "flex flex-col gap-6";

  return (
    <div className={`${layout} ${className}`}>
      <div className="max-w-prose-wide">
        <Eyebrow index={index} total={total}>
          {eyebrow}
        </Eyebrow>
        <h1 className={`font-display font-medium ${titleSize} ${titleClassName}`}>
          {title}
        </h1>
        {children && (
          <div className="mt-6 text-standfirst leading-standfirst text-ink-soft">{children}</div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
