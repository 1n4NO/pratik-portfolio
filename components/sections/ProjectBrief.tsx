import { Gauge, Layers, Route, ShieldCheck, type LucideIcon } from "lucide-react";
import type { Project } from "@/data/projects";

const briefItems: {
  key: "role" | "scope" | "constraint" | "technicalBet";
  label: string;
  icon: LucideIcon;
  audience: "recruiter" | "engineer";
}[] = [
  { key: "role", label: "Role", icon: Gauge, audience: "recruiter" },
  { key: "scope", label: "Scope", icon: Layers, audience: "recruiter" },
  { key: "constraint", label: "Core constraint", icon: ShieldCheck, audience: "engineer" },
  { key: "technicalBet", label: "Technical bet", icon: Route, audience: "engineer" },
];

export function ProjectBrief({ project }: { project: Project }) {
  return (
    <section
      aria-labelledby="project-brief-heading"
      className="border-y border-line bg-surface"
      style={{ color: "rgb(166, 166, 166)" }}
    >
      <div className="grid gap-0 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
        <div className="border-b border-line p-5 md:border-b-0 md:border-r md:p-6">
          <h2
            id="project-brief-heading"
            className="font-display text-2xl font-bold leading-tight"
          >
            The product bet, in plain language.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[rgba(166,166,166,0.6)]">
            {project.impact}
          </p>
        </div>

        <div className="p-5 md:p-6">
          <div className="flex flex-col gap-5">
            <div className="recruiter-mode-only rounded border border-line bg-surface-muted p-3">
              <p className="mt-2 text-sm leading-relaxed text-[rgba(166,166,166,0.6)]">
                Senior ownership across product framing, scope, and shipped interface quality.
              </p>
            </div>
            <div className="engineer-mode-only rounded border border-line bg-surface-muted p-3">
              <p className="mt-2 text-sm leading-relaxed text-[rgba(166,166,166,0.6)]">
                Focus on constraints, architecture choices, external systems, and data flow.
              </p>
            </div>
          </div>

          <dl className="mt-5 grid gap-0 sm:grid-cols-2">
            {briefItems.map(({ key, label, icon: Icon, audience }, index) => (
              <div
                key={key}
                data-reading-audience={audience}
                className={`case-study-mode-card border-line p-5 md:p-6 ${
                  index < briefItems.length - 1 ? "border-b" : ""
                } ${index % 2 === 0 ? "sm:border-r" : ""} ${
                  index < briefItems.length - 2 ? "sm:border-b" : "sm:border-b-0"
                }`}
              >
                <dt className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[rgba(166,166,166,0.6)]">
                  <Icon size={14} className="icon-amber" aria-hidden />
                  {label}
                </dt>
                <dd className="text-sm leading-relaxed text-[rgb(166,166,166)]">{project[key]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
