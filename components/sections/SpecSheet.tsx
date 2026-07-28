import { profile } from "@/data/profile";

export function SpecSheet() {
  return (
    <dl className="min-w-[200px] space-y-3 border-l border-line pl-6 font-mono text-caption">
      {profile.specSheet.map((row) => (
        <div key={row.label} className="flex justify-between gap-6">
          <dt className="uppercase tracking-caps text-ink-soft/60">{row.label}</dt>
          <dd className="text-right text-ink">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
