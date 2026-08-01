import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { SectionGrid } from "@/components/ui/SectionGrid";
import { CompactContactCTA } from "@/components/layout/CompactContactCTA";
import { OperatingPrinciples } from "@/components/sections/OperatingPrinciples";
import { projects } from "@/data/projects";
import { absoluteUrl, createMetadata, jsonLd } from "@/lib/seo";

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

const description =
  "Selected frontend architecture, AI product engineering, workflow systems, design tooling, and data visualization case studies by Pratik Singh.";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Work",
    description,
    path: "/work",
  }),
};

export default function WorkPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Work",
    description,
    url: absoluteUrl("/work"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.name,
        url: absoluteUrl(`/work/${project.slug}`),
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(structuredData)}
      />
      <section className="bg-dark pb-section-sm md:pb-section-md">
        <Container className="pt-section-sm md:pt-section-md">
          <div className="space-y-6 md:max-w-4xl">
            <h1 className="font-display text-hero font-medium tracking-display">
              <span className="block">Products shipped,</span>
              <span className="block">systems thought through.</span>
            </h1>
            <p className="max-w-[42rem] text-standfirst leading-standfirst text-muted-copy">
              <span className="bg-amber px-1 text-[#1b2030] box-decoration-clone">
                See how AI workflows, frontend architecture, data interfaces, and product systems
                show up in the work.
              </span>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <LinkButton
                href="#selected-work"
                variant="primary"
              >
                Explore work
                <ArrowDown size={14} className="icon-current" aria-hidden="true" />
              </LinkButton>
              <LinkButton
                href="#manifesto"
                variant="secondary"
              >
                Manifesto
                <ArrowDown size={14} className="icon-amber" aria-hidden="true" />
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>

      <Container id="selected-work">
        <SectionGrid
          aside={
            <div className="space-y-5 rounded-lg border border-line bg-surface p-6 md:p-8">
              <p className="font-mono text-micro uppercase tracking-caps text-signal">
                Project system
              </p>
              <h2 className="font-display text-subsection font-medium tracking-display-tight">
                Interactive index
              </h2>
            </div>
          }
        >
          <WorkConstellation />
        </SectionGrid>
      </Container>

      {/* Real, always-rendered links: keyboard nav, screen readers, and SEO don't
          depend on the WebGL scene above. */}
      <Container className="pb-10">
        <h2 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
          All projects
        </h2>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-3 border-t border-line pt-4 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="group inline-flex items-center gap-1.5 font-mono text-[12px] text-ink-soft hover:text-signal focus-ring rounded"
              >
                {project.name}
                <ArrowUpRight
                  size={12}
                  className="icon-amber opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <OperatingPrinciples />

      <CompactContactCTA />
    </>
  );
}
