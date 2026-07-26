import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { ScreenshotTile } from "@/components/ui/ScreenshotTile";
import { ScreenshotStream } from "@/components/sections/ScreenshotStream";
import { DetailedProcess } from "@/components/sections/DetailedProcess";
import { ReadingProgressRuler } from "@/components/ui/ReadingProgressRuler";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { projects, getProjectBySlug } from "@/data/projects";
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
    image: project.cover.src,
  });
}

const sections: { key: "overview" | "problem" | "approach" | "solution"; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "problem", label: "Problem" },
  { key: "approach", label: "Approach" },
  { key: "solution", label: "Solution" },
];

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

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
          <ArrowLeft size={14} aria-hidden="true" />
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
        <div className="flex gap-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[12px] text-signal hover:text-signal-dark focus-ring rounded"
          >
            Visit live site
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[12px] text-ink-soft hover:text-ink focus-ring rounded"
            >
              View source
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </Container>

      <Container className="pb-16">
        <ScreenshotStream project={project} direction="horizontal" priority />
      </Container>

      <Container className="pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <dl className="font-mono text-[11px] space-y-4 sticky top-24">
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

          <div className="md:col-span-3 space-y-12">
            {sections.map((section) => (
              <div key={section.key}>
                <h2 className="font-display text-xl font-bold mb-3">{section.label}</h2>
                <p className="text-ink-soft leading-relaxed max-w-2xl">{project[section.key]}</p>
                {section.key === "approach" && (
                  <DetailedProcess
                    steps={project.detailedProcess}
                    dataFlowDiagram={project.dataFlowDiagram}
                  />
                )}
              </div>
            ))}

            <div>
              <h2 className="font-display text-xl font-bold mb-4">Highlights</h2>
              <ul className="space-y-3 max-w-2xl">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-ink-soft">
                    <Check size={16} className="text-signal shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {project.screenshots.length > 0 && (
        <Container className="pb-20">
          <h2 className="font-mono text-[11px] tracking-widest uppercase text-ink-soft mb-8">
            Product screenshots
          </h2>
          <div className="columns-1 gap-4 md:columns-2 xl:columns-3">
            {project.screenshots.map((shot, index) => (
              <ScreenshotTile
                key={shot.src}
                item={{ ...shot, id: `${project.slug}-detail-shot-${index}` }}
                index={index}
                priority={index < 2}
                mode="masonry"
              />
            ))}
          </div>
        </Container>
      )}

      <ContactCTA />
    </>
  );
}
