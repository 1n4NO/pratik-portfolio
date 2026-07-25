export function Tag({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "amber";
}) {
  const styles =
    variant === "amber"
      ? "bg-amber-bg text-amber"
      : "bg-surface-muted text-ink-soft";

  return (
    <span
      className={`font-mono text-[11px] tracking-wide px-2.5 py-1 rounded ${styles}`}
    >
      {children}
    </span>
  );
}
