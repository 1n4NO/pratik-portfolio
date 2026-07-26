import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
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
      <section className="relative flex min-h-[572px] items-center overflow-hidden border-b border-line bg-surface">
        <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden="true" />
        <Container className="relative py-10 md:py-14">
          <PageIntro eyebrow="Work" title="Products shipped, systems architected.">
            <p>
              Explore the overlap between AI workflows, frontend architecture, data interfaces, and
              product systems before jumping into the detailed case studies.
            </p>
          </PageIntro>
        </Container>
      </section>

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
