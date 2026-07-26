"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, GitBranch } from "lucide-react";
import { MermaidDiagram } from "@/components/ui/MermaidDiagram";
import { motionEase, motionTimings } from "@/lib/motion";

type FlowNode = {
  id: string;
  label: string;
  incoming: string[];
  outgoing: string[];
};

type FlowEdge = {
  from: string;
  to: string;
};

type ViewMode = "interactive" | "mermaid";

export function DataFlowExplorer({ chart }: { chart: string }) {
  const parsed = useMemo(() => parseMermaidFlow(chart), [chart]);
  const [activeId, setActiveId] = useState(parsed.nodes[0]?.id ?? "");
  const [viewMode, setViewMode] = useState<ViewMode>("interactive");
  const reduceMotion = useReducedMotion();
  const activeNode = parsed.nodes.find((node) => node.id === activeId) ?? parsed.nodes[0];

  if (parsed.nodes.length === 0) {
    return <MermaidDiagram chart={chart} />;
  }

  return (
    <div className="min-h-[620px] rounded border border-line bg-surface-muted p-4 md:p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
            Data flow map
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Select a system node to inspect how data enters and leaves it.
          </p>
        </div>
        <div className="inline-flex rounded border border-line bg-surface p-1">
          <ModeButton active={viewMode === "interactive"} onClick={() => setViewMode("interactive")}>
            Interactive
          </ModeButton>
          <ModeButton active={viewMode === "mermaid"} onClick={() => setViewMode("mermaid")}>
            Mermaid
          </ModeButton>
        </div>
      </div>

      {viewMode === "mermaid" ? (
        <MermaidDiagram chart={chart} />
      ) : (
        <div className="grid min-h-[520px] gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
          <ol className="relative space-y-3">
            {parsed.nodes.map((node, index) => {
              const active = node.id === activeNode.id;
              const adjacent = activeNode.incoming.includes(node.id) || activeNode.outgoing.includes(node.id);

              return (
                <li key={node.id} className="relative">
                  {index < parsed.nodes.length - 1 && (
                    <span
                      className="absolute left-[1.08rem] top-11 h-[calc(100%-1rem)] w-px bg-line"
                      aria-hidden="true"
                    />
                  )}
                  <motion.button
                    type="button"
                    onClick={() => setActiveId(node.id)}
                    className={`relative flex w-full items-start gap-3 rounded border p-3 text-left transition-colors focus-ring ${
                      active
                        ? "border-signal bg-surface text-ink"
                        : adjacent
                          ? "border-line-strong bg-surface/80 text-ink"
                          : "border-line bg-surface/55 text-ink-soft hover:border-line-strong hover:text-ink"
                    }`}
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: active ? 1.01 : 1,
                          }
                    }
                    transition={{ duration: motionTimings.fast, ease: motionEase.standard }}
                  >
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded border font-mono text-[10px] ${
                        active
                          ? "border-signal bg-signal text-paper"
                          : "border-line bg-paper text-ink-soft"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-display text-base font-bold leading-snug">
                        {node.label}
                      </span>
                      <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-ink-soft/70">
                        {node.incoming.length} in / {node.outgoing.length} out
                      </span>
                    </span>
                  </motion.button>
                </li>
              );
            })}
          </ol>

          <motion.aside
            key={activeNode.id}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: motionTimings.base, ease: motionEase.soft }}
            className="h-fit rounded border border-line bg-surface p-4 md:sticky md:top-28"
          >
            <div className="mb-4 flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-signal bg-signal/10 text-signal">
                <GitBranch size={17} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold leading-tight">{activeNode.label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  This node connects {activeNode.incoming.length + activeNode.outgoing.length} part
                  {activeNode.incoming.length + activeNode.outgoing.length === 1 ? "" : "s"} of the project workflow.
                </p>
              </div>
            </div>

            <FlowGroup title="Receives from" ids={activeNode.incoming} nodes={parsed.nodeMap} empty="Initial input" />
            <div className="my-4 flex justify-center text-signal" aria-hidden="true">
              <ArrowDown size={18} />
            </div>
            <FlowGroup title="Sends to" ids={activeNode.outgoing} nodes={parsed.nodeMap} empty="Terminal output" />
          </motion.aside>
        </div>
      )}
    </div>
  );
}

function ModeButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded px-3 py-1.5 font-mono text-[11px] transition-colors focus-ring ${
        active ? "bg-surface-muted text-ink shadow-sm" : "text-ink-soft hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function FlowGroup({
  title,
  ids,
  nodes,
  empty,
}: {
  title: string;
  ids: string[];
  nodes: Map<string, FlowNode>;
  empty: string;
}) {
  return (
    <div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-soft/60">
        {title}
      </p>
      {ids.length > 0 ? (
        <ul className="space-y-2">
          {ids.map((id) => (
            <li key={id} className="rounded border border-line bg-surface-muted px-3 py-2 text-sm text-ink-soft">
              {nodes.get(id)?.label ?? id}
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded border border-dashed border-line px-3 py-2 text-sm text-ink-soft">
          {empty}
        </p>
      )}
    </div>
  );
}

function parseMermaidFlow(chart: string) {
  const labels = new Map<string, string>();
  const edges: FlowEdge[] = [];
  const edgePattern = /^\s*([A-Za-z0-9_-]+)(?:\["([^"]+)"\])?\s*-->\s*([A-Za-z0-9_-]+)(?:\["([^"]+)"\])?/;

  chart.split("\n").forEach((line) => {
    const match = line.match(edgePattern);
    if (!match) return;

    const [, from, fromLabel, to, toLabel] = match;
    labels.set(from, fromLabel ?? labels.get(from) ?? humanizeId(from));
    labels.set(to, toLabel ?? labels.get(to) ?? humanizeId(to));
    edges.push({ from, to });
  });

  const nodes = Array.from(labels, ([id, label]) => ({
    id,
    label,
    incoming: edges.filter((edge) => edge.to === id).map((edge) => edge.from),
    outgoing: edges.filter((edge) => edge.from === id).map((edge) => edge.to),
  }));

  return {
    nodes,
    edges,
    nodeMap: new Map(nodes.map((node) => [node.id, node])),
  };
}

function humanizeId(id: string) {
  return id
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
