import { Container } from "./Container";

export function RulerDivider({ index, total }: { index: number; total: number }) {
  const label = String(index).padStart(2, "0");
  const of = String(total).padStart(2, "0");

  return (
    <Container className="py-2">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] text-ink-soft/60">
          {label} / {of}
        </span>
        <div
          className="flex-1 h-2 flex items-end gap-[3px]"
          aria-hidden="true"
        >
          {Array.from({ length: 48 }).map((_, i) => (
            <span
              key={i}
              className="bg-line-strong w-px"
              style={{ height: i % 4 === 0 ? "8px" : "4px" }}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
