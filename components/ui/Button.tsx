import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 font-mono text-[12px] tracking-wide rounded px-5 py-3 transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-signal text-paper hover:bg-signal-dark",
  secondary: "bg-transparent text-ink border border-line-strong hover:border-ink",
  ghost: "bg-transparent text-signal hover:text-signal-dark",
  inverse: "bg-surface text-ink hover:bg-surface-muted",
};

type Variant = keyof typeof variants;

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
