import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";
import { ScreenshotStream } from "@/components/sections/ScreenshotStream";
import { Tag } from "@/components/ui/Tag";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionGrid } from "@/components/ui/SectionGrid";

export function ProjectRow({
  project,
  reversed,
  index,
  total,
}: {
  project: Project;
  reversed?: boolean;
  index?: number;
  total?: number;
}) {
  const indexLabel = index !== undefined ? String(index).padStart(2, "0") : undefined;
  const totalLabel = total !== undefined ? String(total).padStart(2, "0") : undefined;

  return (
    <Container
      id={`project-${project.slug}`}
      className="scroll-mt-20 border-t border-line py-section-sm md:scroll-mt-28 md:py-section-md"
    >
      <SectionGrid
        reverse={reversed}
        wide
        stickyAside={!reversed}
        aside={
          <div className="space-y-6 md:max-w-xs">
            <Eyebrow index={indexLabel} total={totalLabel}>
              {project.industry}
            </Eyebrow>
            <h3 className="font-display text-subsection font-medium tracking-display-tight">
              {project.name}
            </h3>
            <p className="text-standfirst leading-standfirst text-ink-soft">{project.tagline}</p>
            <dl className="space-y-4 border-y border-line py-5">
              <div>
                <dt className="mb-1.5 font-mono text-micro uppercase tracking-caps text-ink-soft/60">
                  Role
                </dt>
                <dd className="text-body leading-body text-ink-soft">{project.role}</dd>
              </div>
              <div>
                <dt className="mb-1.5 font-mono text-micro uppercase tracking-caps text-ink-soft/60">
                  Technical bet
                </dt>
                <dd className="text-body leading-body text-ink-soft">{project.technicalBet}</dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 5).map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-1.5 font-mono text-caption uppercase tracking-caps text-signal transition-colors hover:text-signal-dark focus-ring rounded"
            >
              View case study
              <ArrowUpRight size={14} className="icon-amber" aria-hidden="true" />
            </Link>
          </div>
        }
        contentClassName="min-w-0"
      >
        <div className="space-y-6">
          <blockquote className="max-w-prose border-l border-signal pl-5 text-body font-medium leading-body text-ink md:pl-6">
            {project.impact}
          </blockquote>
          <p className="max-w-prose text-body leading-body text-ink-soft">{project.overview}</p>
          <ScreenshotStream project={project} />
        </div>
      </SectionGrid>
    </Container>
  );
}
