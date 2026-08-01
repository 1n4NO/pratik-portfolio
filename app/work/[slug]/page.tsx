import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionGrid } from "@/components/ui/SectionGrid";
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
import { CompactContactCTA } from "@/components/layout/CompactContactCTA";
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
      <div className="bg-dark">
        <ReadingProgressRuler />
        <Container className="pt-section-sm pb-8 md:pt-section-md">
          <Link
            href="/work"
            className="mb-10 inline-flex items-center gap-1.5 rounded font-mono text-micro uppercase tracking-caps text-ink-soft transition-colors hover:text-signal focus-ring"
          >
            <ArrowLeft size={14} className="icon-amber" aria-hidden="true" />
            All work
          </Link>

          <SectionGrid
            wide
            stickyAside
            aside={
              <div className="space-y-6 md:max-w-xs">
                <Tag variant="amber">{project.industry}</Tag>
                <dl className="hidden space-y-4 border-y border-line py-5 font-mono text-caption md:block">
                  <div>
                    <dt className="mb-1.5 uppercase tracking-caps text-ink-soft/60">Industry</dt>
                    <dd>{project.industry}</dd>
                  </div>
                  <div>
                    <dt className="mb-1.5 uppercase tracking-caps text-ink-soft/60">Tech stack</dt>
                    <dd className="space-y-1 text-ink-soft">
                      {project.techStack.map((tech) => (
                        <div key={tech}>{tech}</div>
                      ))}
                    </dd>
                  </div>
                  {project.externalSystems && project.externalSystems.length > 0 && (
                    <div>
                      <dt className="mb-1.5 uppercase tracking-caps text-ink-soft/60">
                        External systems
                      </dt>
                      <dd className="space-y-1 text-ink-soft">
                        {project.externalSystems.map((system) => (
                          <div key={system}>{system}</div>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            }
            contentClassName="max-w-prose-wide space-y-8"
          >
            <div>
              <h1 className="font-display text-hero font-medium tracking-display">{project.name}</h1>
              <p className="mt-6 text-standfirst leading-standfirst text-ink-soft">
                <span className="bg-amber px-1 text-[#1b2030] box-decoration-clone">
                  {project.tagline}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
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
                  className="inline-flex items-center gap-1.5 rounded font-mono text-caption uppercase tracking-caps text-signal transition-colors hover:text-signal-dark focus-ring"
                >
                  Open live site
                  <ArrowUpRight size={14} className="icon-amber" aria-hidden="true" />
                </a>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded font-mono text-caption uppercase tracking-caps text-ink-soft transition-colors hover:text-ink focus-ring"
                  >
                    Open source
                    <ArrowUpRight size={14} className="icon-amber" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </SectionGrid>
        </Container>

        <Container className="pb-16">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
            <div className="max-w-xl text-right">
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft/60">
                Reading mode
              </p>
              <p className="mt-1 max-w-[320px] text-xs leading-snug text-ink-soft/70">
                Prioritize hiring signals or engineering detail.
              </p>
            </div>
            <ReadingModeToggle />
          </div>
          <ProjectBrief project={project} />
        </Container>

        <div className="pb-16">
          <ScreenshotStream project={project} direction="horizontal" priority theme="dark" />
        </div>

        <Container className="pb-section-sm md:pb-section-md">
          <div className="editorial-grid editorial-grid--wide gap-grid-gap">
            <div className="editorial-grid__aside editorial-grid__aside--sticky">
              <CaseStudyNav
                items={caseStudyNavItems.filter(
                  (item) => item.id !== "screenshots" || project.screenshots.length > 0
                )}
              />
            </div>

            <div className="space-y-section-sm md:space-y-section-md">
              {sections.map((section) => (
                <MotionReveal
                  key={section.key}
                  id={section.key}
                  className="scroll-mt-20 md:scroll-mt-28"
                  aria-labelledby={`${section.key}-heading`}
                >
                  {section.key === "solution" ? (
                    <div
                      className="max-w-prose-wide border-y border-line bg-surface/55 py-8 pl-5 pr-6 md:py-10 md:pl-7 md:pr-10"
                      style={{ color: "#f7f7f7" }}
                    >
                      <h2
                        id={`${section.key}-heading`}
                        className="mb-5 font-display text-section-title font-medium tracking-display"
                      >
                        {section.label}
                      </h2>
                      <p className="text-standfirst leading-standfirst md:text-[1.375rem] md:leading-[1.65]">
                        {project[section.key]}
                      </p>
                    </div>
                  ) : (
                    <div className="max-w-prose-wide border-l border-line pl-5 md:pl-7">
                      <h2
                        id={`${section.key}-heading`}
                        className="mb-4 font-display text-subsection font-medium tracking-display-tight"
                      >
                        {section.label}
                      </h2>
                      <p className="text-body leading-body text-ink-soft">{project[section.key]}</p>
                    </div>
                  )}
                  {section.key === "approach" && (
                    <div className="mt-12">
                      <DetailedProcess
                        steps={project.detailedProcess}
                        dataFlowDiagram={project.dataFlowDiagram}
                      />
                    </div>
                  )}
                </MotionReveal>
              ))}

              <MotionReveal
                id="highlights"
                className="scroll-mt-20 md:scroll-mt-28"
                aria-labelledby="highlights-heading"
              >
                <div className="max-w-prose-wide">
                  <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-4">
                    <div>
                      <h2
                        id="highlights-heading"
                        className="font-display text-subsection font-medium tracking-display-tight"
                      >
                        Highlights
                      </h2>
                    </div>
                  </div>
                  <ul className="divide-y divide-line border-y border-line">
                    {project.highlights.map((h, index) => (
                      <li key={h} className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4 py-5">
                        <span className="flex items-start gap-2 font-mono text-micro uppercase tracking-caps text-amber">
                          <Check size={14} className="icon-amber mt-0.5 shrink-0" aria-hidden="true" />
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-body leading-body text-ink">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
              className="mb-8 font-mono text-[11px] uppercase tracking-widest text-ink-soft"
            >
              Screenshots
            </h2>
            <ScreenshotGallery
              screenshots={project.screenshots}
              slugPrefix={project.slug}
              theme="dark"
            />
          </Container>
        )}

        <ProjectPrevNext previous={previous} next={next} />

        <CompactContactCTA />
      </div>
    </>
  );
}
