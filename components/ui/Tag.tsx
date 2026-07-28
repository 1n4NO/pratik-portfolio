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
      : "bg-surface-muted text-ink-soft/80";

  return (
    <span
      className={`inline-flex items-center font-mono text-micro tracking-caps px-2.5 py-1 rounded ${styles}`}
    >
      {children}
    </span>
  );
}
