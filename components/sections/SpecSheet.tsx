import { profile } from "@/data/profile";

export function SpecSheet() {
  return (
    <dl
      className="min-w-[200px] space-y-3 border-l border-deep-line pl-6 font-mono text-caption"
      style={{ color: "rgb(166 166 166 / var(--tw-text-opacity,1))" }}
    >
      {profile.specSheet.map((row) => (
        <div key={row.label} className="flex justify-between gap-6">
          <dt
            className="uppercase tracking-caps"
            style={{ color: "rgb(166 166 166 / 0.6)" }}
          >
            {row.label}
          </dt>
          <dd className="text-right" style={{ color: "rgb(166 166 166 / 1)" }}>
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
