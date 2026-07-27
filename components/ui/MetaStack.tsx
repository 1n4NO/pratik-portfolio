export type MetaStackItem = { label: string; value: string };

// The stacked "label above, italic serif value below" meta panel used
// alongside EditorialSplit throughout the site — SpecSheet on the homepage
// wraps this with profile data; other pages can pass their own items.
export function MetaStack({ items }: { items: MetaStackItem[] }) {
  return (
    <dl className="min-w-[180px] space-y-5 border-l border-line pl-6">
      {items.map((row) => (
        <div key={row.label}>
          <dt className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-soft/60">
            {row.label}
          </dt>
          <dd className="font-display text-lg italic text-ink">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
