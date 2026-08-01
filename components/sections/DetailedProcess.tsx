"use client";

import { useState, type ReactNode } from "react";
import type { Project } from "@/data/projects";
import { DataFlowExplorer } from "@/components/sections/DataFlowExplorer";

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
      id="detailed-process"
      aria-labelledby="detailed-process-heading"
      className="mt-6 scroll-mt-20 border-y border-line bg-surface p-5 md:scroll-mt-28 md:p-6"
      style={{ color: "rgb(166, 166, 166)" }}
    >
      <h2
        id="detailed-process-heading"
        className="mb-5 font-display text-xl font-bold leading-tight"
      >
        Detailed process
      </h2>

      <div className="mb-5 inline-flex rounded border border-line bg-surface-muted p-1 text-[rgba(166,166,166,0.6)]">
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
              <h3 className="mb-2 font-mono text-[11px] uppercase tracking-wide text-[rgba(166,166,166,0.6)]">
                {step.label}
              </h3>
              <p className="leading-relaxed text-[rgba(166,166,166,0.6)]">{step.body}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="min-h-[620px]">
          <DataFlowExplorer chart={dataFlowDiagram} />
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
        active
          ? "bg-surface text-[rgb(166,166,166)] shadow-none"
          : "text-[rgba(166,166,166,0.6)] hover:text-[rgb(166,166,166)]"
      }`}
    >
      {children}
    </button>
  );
}
