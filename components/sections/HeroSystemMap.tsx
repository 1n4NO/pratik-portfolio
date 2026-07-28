"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { BrainCircuit, Code2, DatabaseZap, GitBranch, Palette } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { motionEase, motionTimings } from "@/lib/motion";

type Domain = {
  id: string;
  label: string;
  summary: string;
  icon: LucideIcon;
  projectSlugs: string[];
};

const domains: Domain[] = [
  {
    id: "architecture",
    label: "Frontend architecture",
    summary: "Rendering choices, durable UI foundations, and product shells that hold up.",
    icon: Code2,
    projectSlugs: ["product-studio", "orqestra", "multi-agent-ai-system"],
  },
  {
    id: "ai",
    label: "AI-enabled interfaces",
    summary: "Inspectable agent flows, local inference paths, and clear review loops.",
    icon: BrainCircuit,
    projectSlugs: ["multi-agent-ai-system", "product-studio"],
  },
  {
    id: "systems",
    label: "Developer systems",
    summary: "Operational consoles, workflow state, observability, and execution tooling.",
    icon: GitBranch,
    projectSlugs: ["fluxion", "rainmatter-air"],
  },
  {
    id: "visualization",
    label: "Data visualization",
    summary: "Dense data made legible through drill-downs, maps, and progressive disclosure.",
    icon: DatabaseZap,
    projectSlugs: ["state-dashboard", "fluxion"],
  },
  {
    id: "design",
    label: "Design systems",
    summary: "Token systems, schema-driven sections, and reusable product primitives.",
    icon: Palette,
    projectSlugs: ["orqestra", "product-studio"],
  },
];

export function HeroSystemMap() {
  const [activeId, setActiveId] = useState(domains[0].id);
  const [rotation, setRotation] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const orbitNodes = useMemo(() => getOrbitNodes(rotation), [rotation]);
  const projectMap = useMemo(() => new Map(projects.map((project) => [project.slug, project])), []);
  const activeDomain = domains.find((domain) => domain.id === activeId) ?? domains[0];
  const relatedProjects = activeDomain.projectSlugs
    .map((slug) => projectMap.get(slug))
    .filter((project): project is Project => Boolean(project));

  useEffect(() => {
    if (reduceMotion) {
      setActiveId(domains[0].id);
      return;
    }

    let frame = 0;
    let previous = performance.now();

    function tick(now: number) {
      const elapsed = Math.min((now - previous) / 1000, 0.05);
      previous = now;

      if (!paused) {
        setRotation((current) => current + elapsed * 0.3);
      }

      frame = window.requestAnimationFrame(tick);
    }

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [paused, reduceMotion]);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const nearest = orbitNodes.reduce((best, node) => (node.depth > best.depth ? node : best), orbitNodes[0]);
    setActiveId(nearest.domain.id);
  }, [orbitNodes, paused, reduceMotion]);

  return (
    <div
      className="relative h-[580px] overflow-hidden rounded-lg p-3 md:h-[460px] md:p-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-full">
        <div className="grid gap-4 md:hidden">
          {domains.map((domain) => (
            <DomainCard
              key={domain.id}
              domain={domain}
              active={domain.id === activeId}
              onSelect={() => setActiveId(domain.id)}
            />
          ))}
        </div>

        <div className="relative hidden h-[320px] md:block">
          {orbitNodes.map((node) => (
            <motion.div
              key={node.domain.id}
              className="absolute w-[145px]"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                zIndex: node.zIndex,
              }}
              animate={{
                x: "-50%",
                y: "-50%",
                scale: node.scale,
                opacity: node.opacity,
              }}
              transition={{
                x: { duration: motionTimings.base, ease: motionEase.soft },
                y: { duration: motionTimings.base, ease: motionEase.soft },
                scale: { duration: motionTimings.base, ease: motionEase.soft },
                opacity: { duration: motionTimings.base, ease: motionEase.soft },
              }}
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -4 - node.depth * 3, 0] }}
                transition={{
                  duration: 3.6 + node.depth,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: node.depth * 0.8,
                }}
              >
                <DomainCard
                  domain={node.domain}
                  active={node.domain.id === activeId}
                  onSelect={() => {
                    setPaused(true);
                    setActiveId(node.domain.id);
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <RelatedProjects
          key={activeDomain.id}
          domain={activeDomain}
          projects={relatedProjects}
          reduceMotion={Boolean(reduceMotion)}
        />

      </div>
    </div>
  );
}

function DomainCard({
  domain,
  active,
  onSelect,
}: {
  domain: Domain;
  active: boolean;
  onSelect: () => void;
}) {
  const Icon = domain.icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group flex w-full items-start gap-2.5 rounded border p-2.5 text-left transition-colors focus-ring ${
        active
          ? "border-signal bg-signal/10 text-ink"
          : "border-line bg-surface/85 text-ink-soft hover:border-line-strong hover:text-ink"
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border ${
          active ? "border-signal bg-signal text-paper" : "border-line bg-paper text-signal"
        }`}
      >
        <Icon size={14} className={active ? "icon-current" : "icon-amber"} aria-hidden />
      </span>
      <span>
        <span className="block font-display text-sm font-bold leading-tight">{domain.label}</span>
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-ink-soft/65">
          {domain.projectSlugs.length} linked projects
        </span>
      </span>
    </button>
  );
}

type OrbitNode = {
  domain: Domain;
  x: number;
  y: number;
  depth: number;
  scale: number;
  opacity: number;
  zIndex: number;
};

function RelatedProjects({
  domain,
  projects,
  reduceMotion,
}: {
  domain: Domain;
  projects: Project[];
  reduceMotion: boolean;
}) {
  const router = useRouter();

  return (
    <motion.div
      className="absolute inset-x-3 top-[320px] md:top-[240px]"
      initial={reduceMotion ? false : { opacity: 0, y: -10 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: motionTimings.base, ease: motionEase.soft }}
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
          Related projects
        </p>
        <span className="truncate font-mono text-[10px] uppercase tracking-widest text-ink-soft/60">
          {domain.label}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {projects.map((project, index) => (
          <motion.button
            key={project.slug}
            type="button"
            onClick={() => router.push(`/work/${project.slug}`)}
            className="group inline-flex w-full items-center justify-between gap-3 rounded border border-line bg-surface/85 px-2.5 py-1.5 text-left transition-colors hover:border-signal focus-ring"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.28,
              ease: motionEase.soft,
              delay: 0.08 + index * 0.1,
            }}
          >
            <span className="min-w-0">
              <span className="block truncate font-display text-sm font-bold text-ink">
                {project.name}
              </span>
              <span className="mt-0.5 block truncate font-mono text-[10px] uppercase tracking-widest text-ink-soft/65">
                {project.industry}
              </span>
            </span>
            <span className="font-mono text-[10px] text-signal opacity-0 transition-opacity group-hover:opacity-100">
              View
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function getOrbitNodes(rotation: number): OrbitNode[] {
  return domains.map((domain, index) => {
    const angle = rotation + (index / domains.length) * Math.PI * 2;
    const horizontalRadius = 35;
    const verticalRadius = 16;
    const x = 50 + Math.cos(angle) * horizontalRadius;
    const y = 44 + Math.sin(angle) * verticalRadius;
    const depth = (Math.sin(angle) + 1) / 2;

    return {
      domain,
      x,
      y,
      depth,
      scale: 0.68 + depth * 0.34,
      opacity: 0.22 + depth * 0.78,
      zIndex: Math.round(10 + depth * 30),
    };
  });
}
