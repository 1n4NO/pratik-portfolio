import { profile } from "@/data/profile";

export function SpecSheet() {
  return (
    <dl className="font-mono text-[11px] min-w-[180px] border-l border-line pl-5 space-y-2.5">
      {profile.specSheet.map((row) => (
        <div key={row.label} className="flex justify-between gap-4">
          <dt className="text-ink-soft/70 tracking-wide uppercase">{row.label}</dt>
          <dd className="text-ink text-right">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
