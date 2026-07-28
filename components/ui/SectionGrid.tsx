import type { HTMLAttributes, ReactNode } from "react";

type SectionGridProps = {
  aside: ReactNode;
  children: ReactNode;
  reverse?: boolean;
  wide?: boolean;
  stickyAside?: boolean;
  className?: string;
  asideClassName?: string;
  contentClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

export function SectionGrid({
  aside,
  children,
  reverse = false,
  wide = false,
  stickyAside = false,
  className = "",
  asideClassName = "",
  contentClassName = "",
  ...props
}: SectionGridProps) {
  const gridClass = [
    "editorial-grid",
    wide && "editorial-grid--wide",
    reverse && "editorial-grid--reverse",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const asideClass = [
    "editorial-grid__aside",
    stickyAside && "editorial-grid__aside--sticky",
    asideClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={gridClass} {...props}>
      <aside className={asideClass}>{aside}</aside>
      <div className={contentClassName}>{children}</div>
    </div>
  );
}
