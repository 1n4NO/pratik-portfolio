import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { projects } from "@/data/projects";

// Three.js scene — client-only, so it's loaded via next/dynamic with ssr disabled.
const WorkConstellation = dynamic(
  () => import("@/components/three/WorkConstellation").then((m) => m.WorkConstellation),
  {
    ssr: false,
    loading: () => (
      <div className="h-[520px] md:h-[620px] rounded-lg border border-line bg-surface-muted animate-pulse" />
    ),
  }
);

export const metadata: Metadata = {
  title: "Work",
  description: "Selected frontend architecture and product work.",
};

export default function WorkPage() {
  return (
    <>
      <Container className="pt-16 pb-6">
        <p className="font-mono text-[11px] tracking-widest uppercase text-signal mb-4">Work</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold max-w-xl">
          Products shipped, systems architected.
        </h1>
      </Container>

      <Container className="pt-6 pb-10">
        <WorkConstellation />
      </Container>

      {/* Real, always-rendered links: keyboard nav, screen readers, and SEO don't
          depend on the WebGL scene above. */}
      <Container className="pb-24">
        <h2 className="font-mono text-[11px] tracking-widest uppercase text-ink-soft mb-5">
          All projects
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 border-t border-line pt-5">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="group inline-flex items-center gap-1.5 font-mono text-[12px] text-ink-soft hover:text-signal focus-ring rounded"
              >
                {project.name}
                <ArrowUpRight
                  size={12}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <ContactCTA />
    </>
  );
}
