import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionGrid } from "@/components/ui/SectionGrid";
import { ContactCTA } from "@/components/layout/ContactCTA";
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
      <section className="relative overflow-hidden border-b border-line bg-surface py-section-sm md:py-section-md">
        <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden="true" />
        <Container className="relative">
          <PageIntro
            eyebrow="Work"
            title="Products shipped, systems thought through."
            align="editorial"
            index="00"
            total="02"
          >
            <p>
              See how AI workflows, frontend architecture, data interfaces, and product systems
              show up in the work.
            </p>
          </PageIntro>
        </Container>
      </section>

      <Container className="pb-section-sm md:pb-section-md">
        <SectionGrid
          aside={
            <div>
              <p className="mb-4 font-mono text-micro uppercase tracking-caps text-ink-soft/60">
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
                  className="icon-amber opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <OperatingPrinciples />

      <ContactCTA />
    </>
  );
}
