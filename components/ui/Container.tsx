import type { HTMLAttributes, ReactNode } from "react";

export function Container({
  children,
  className = "",
  ...props
}: {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mx-auto w-full max-w-content px-6 md:px-10 ${className}`} {...props}>
      {children}
    </div>
  );
}
