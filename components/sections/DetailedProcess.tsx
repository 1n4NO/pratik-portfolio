"use client";

import { useState, type ReactNode } from "react";
import type { Project } from "@/data/projects";
import { MermaidDiagram } from "@/components/ui/MermaidDiagram";

type ActiveTab = "process" | "data-flow";

export function DetailedProcess({
  steps,
  dataFlowDiagram,
}: {
  steps: Project["detailedProcess"];
  dataFlowDiagram: Project["dataFlowDiagram"];
}) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("process");

  return (
    <section
      aria-labelledby="detailed-process-heading"
      className="mt-6 rounded-lg border border-line bg-surface p-5 md:p-6"
    >
      <p className="font-mono text-[11px] tracking-widest uppercase text-signal mb-3">
        Project method
      </p>
      <h2 id="detailed-process-heading" className="font-display text-xl font-bold mb-5">
        Detailed process
      </h2>

      <div className="mb-5 inline-flex rounded border border-line bg-surface-muted p-1">
        <TabButton
          active={activeTab === "process"}
          onClick={() => setActiveTab("process")}
        >
          Process
        </TabButton>
        <TabButton
          active={activeTab === "data-flow"}
          onClick={() => setActiveTab("data-flow")}
        >
          Data flow
        </TabButton>
      </div>

      {activeTab === "process" ? (
        <div className="min-h-[620px] space-y-5">
          {steps.map((step) => (
            <article
              key={step.label}
              className="border-t border-line pt-4 first:border-t-0 first:pt-0"
            >
              <h3 className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">
                {step.label}
              </h3>
              <p className="text-ink-soft leading-relaxed">{step.body}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="min-h-[620px]">
          <MermaidDiagram chart={dataFlowDiagram} />
        </div>
      )}
    </section>
  );
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded px-3 py-1.5 font-mono text-[11px] transition-colors focus-ring ${
        active ? "bg-surface text-ink shadow-sm" : "text-ink-soft hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
