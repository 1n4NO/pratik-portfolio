import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { ScreenshotStream } from "@/components/sections/ScreenshotStream";
import { ScreenshotGallery } from "@/components/sections/ScreenshotGallery";
import { DetailedProcess } from "@/components/sections/DetailedProcess";
import { CaseStudyNav, type CaseStudyNavItem } from "@/components/sections/CaseStudyNav";
import { ProjectBrief } from "@/components/sections/ProjectBrief";
import { ReadingModeToggle } from "@/components/sections/ReadingModeToggle";
import { ProjectPrevNext } from "@/components/sections/ProjectPrevNext";
import { ReadingProgressRuler } from "@/components/ui/ReadingProgressRuler";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { projects, getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import { absoluteUrl, createMetadata, jsonLd, siteConfig } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return createMetadata({
    title: project.name,
    description: project.overview,
    path: `/work/${project.slug}`,
    image: `/work/${project.slug}/opengraph-image`,
  });
}

const sections: { key: "overview" | "problem" | "approach" | "solution"; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "problem", label: "Problem" },
  { key: "approach", label: "Approach" },
  { key: "solution", label: "Solution" },
];

const caseStudyNavItems: CaseStudyNavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "detailed-process", label: "Process" },
  { id: "solution", label: "Solution" },
  { id: "highlights", label: "Highlights" },
  { id: "screenshots", label: "Screenshots" },
];

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  const { previous, next } = getAdjacentProjects(project.slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${absoluteUrl(`/work/${project.slug}`)}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Work",
            item: absoluteUrl("/work"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.name,
            item: absoluteUrl(`/work/${project.slug}`),
          },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `${absoluteUrl(`/work/${project.slug}`)}#creative-work`,
        name: project.name,
        headline: project.tagline,
        description: project.overview,
        url: absoluteUrl(`/work/${project.slug}`),
        image: absoluteUrl(project.cover.src),
        creator: {
          "@type": "Person",
          name: "Pratik Singh",
          url: siteConfig.url,
        },
        about: project.industry,
        keywords: [...project.techStack, ...(project.externalSystems ?? [])].join(", "),
        workExample: project.liveUrl,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${absoluteUrl(`/work/${project.slug}`)}#software`,
        name: project.name,
        applicationCategory: project.industry,
        description: project.solution,
        url: project.liveUrl,
        operatingSystem: "Web",
        creator: {
          "@type": "Person",
          name: "Pratik Singh",
          url: siteConfig.url,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(structuredData)}
      />
      <ReadingProgressRuler />
      <Container className="pt-10 pb-4">
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-soft hover:text-signal focus-ring rounded"
        >
          <ArrowLeft size={14} className="icon-amber" aria-hidden="true" />
          All work
        </Link>
      </Container>

      <Container className="pb-10">
        <Tag variant="amber">{project.industry}</Tag>
        <h1 className="font-display text-3xl md:text-5xl font-bold mt-4 mb-3 max-w-2xl">
          {project.name}
        </h1>
        <p className="text-ink-soft text-lg max-w-xl mb-6">{project.tagline}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[12px] text-signal hover:text-signal-dark focus-ring rounded"
            >
              Visit live site
              <ArrowUpRight size={14} className="icon-amber" aria-hidden="true" />
            </a>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[12px] text-ink-soft hover:text-ink focus-ring rounded"
              >
                View source
                <ArrowUpRight size={14} className="icon-amber" aria-hidden="true" />
              </a>
            )}
          </div>
          <ReadingModeToggle />
        </div>
      </Container>

      <Container className="pb-16">
        <ProjectBrief project={project} />
      </Container>

      <Container className="pb-16">
        <ScreenshotStream project={project} direction="horizontal" priority />
      </Container>

      <Container className="pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="sticky top-3 z-20 md:top-24">
              <CaseStudyNav
                items={caseStudyNavItems.filter(
                  (item) => item.id !== "screenshots" || project.screenshots.length > 0
                )}
              />
              <dl className="hidden font-mono text-[11px] space-y-4 md:block">
                <div>
                  <dt className="text-ink-soft/60 uppercase tracking-wide mb-1">Industry</dt>
                  <dd>{project.industry}</dd>
                </div>
                <div>
                  <dt className="text-ink-soft/60 uppercase tracking-wide mb-1">Tech stack</dt>
                  <dd className="space-y-1">
                    {project.techStack.map((tech) => (
                      <div key={tech}>{tech}</div>
                    ))}
                  </dd>
                </div>
                {project.externalSystems && project.externalSystems.length > 0 && (
                  <div>
                    <dt className="text-ink-soft/60 uppercase tracking-wide mb-1">
                      External systems
                    </dt>
                    <dd className="space-y-1">
                      {project.externalSystems.map((system) => (
                        <div key={system}>{system}</div>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          <div className="md:col-span-3 space-y-12">
            {sections.map((section) => (
              <MotionReveal
                key={section.key}
                id={section.key}
                className="scroll-mt-20 md:scroll-mt-28"
                aria-labelledby={`${section.key}-heading`}
              >
                <h2 id={`${section.key}-heading`} className="font-display text-xl font-bold mb-3">
                  {section.label}
                </h2>
                <p className="text-ink-soft leading-relaxed max-w-2xl">{project[section.key]}</p>
                {section.key === "approach" && (
                  <DetailedProcess
                    steps={project.detailedProcess}
                    dataFlowDiagram={project.dataFlowDiagram}
                  />
                )}
              </MotionReveal>
            ))}

            <MotionReveal
              id="highlights"
              className="scroll-mt-20 md:scroll-mt-28"
              aria-labelledby="highlights-heading"
            >
              <h2 id="highlights-heading" className="font-display text-xl font-bold mb-4">
                Highlights
              </h2>
              <ul className="space-y-3 max-w-2xl">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-ink-soft">
                    <Check size={16} className="icon-amber shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </MotionReveal>
          </div>
        </div>
      </Container>

      {project.screenshots.length > 0 && (
        <Container
          id="screenshots"
          className="scroll-mt-20 pb-20 md:scroll-mt-28"
        >
          <h2
            id="screenshots-heading"
            className="font-mono text-[11px] tracking-widest uppercase text-ink-soft mb-8"
          >
            Product screenshots
          </h2>
          <ScreenshotGallery screenshots={project.screenshots} slugPrefix={project.slug} />
        </Container>
      )}

      <ProjectPrevNext previous={previous} next={next} />

      <ContactCTA />
    </>
  );
}
