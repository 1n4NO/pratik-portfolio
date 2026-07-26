import { Gauge, Layers, Route, ShieldCheck, type LucideIcon } from "lucide-react";
import type { Project } from "@/data/projects";

const briefItems: {
  key: "role" | "scope" | "constraint" | "technicalBet";
  label: string;
  icon: LucideIcon;
}[] = [
  { key: "role", label: "Role", icon: Gauge },
  { key: "scope", label: "Scope", icon: Layers },
  { key: "constraint", label: "Core constraint", icon: ShieldCheck },
  { key: "technicalBet", label: "Technical bet", icon: Route },
];

export function ProjectBrief({ project }: { project: Project }) {
  return (
    <section
      aria-labelledby="project-brief-heading"
      className="border-y border-line bg-surface"
    >
      <div className="grid gap-0 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
        <div className="border-b border-line p-5 md:border-b-0 md:border-r md:p-6">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-signal">
            Project brief
          </p>
          <h2 id="project-brief-heading" className="font-display text-2xl font-bold leading-tight">
            The product bet, stated plainly.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            {project.impact}
          </p>
        </div>

        <dl className="grid gap-0 sm:grid-cols-2">
          {briefItems.map(({ key, label, icon: Icon }, index) => (
            <div
              key={key}
              className={`border-line p-5 md:p-6 ${
                index < briefItems.length - 1 ? "border-b" : ""
              } ${index % 2 === 0 ? "sm:border-r" : ""} ${
                index < briefItems.length - 2 ? "sm:border-b" : "sm:border-b-0"
              }`}
            >
              <dt className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-soft/70">
                <Icon size={14} className="text-signal" aria-hidden />
                {label}
              </dt>
              <dd className="text-sm leading-relaxed text-ink">{project[key]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
