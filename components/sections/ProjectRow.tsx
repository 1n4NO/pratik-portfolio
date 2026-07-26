import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";
import { ScreenshotStream } from "@/components/sections/ScreenshotStream";
import { Tag } from "@/components/ui/Tag";
import { Container } from "@/components/ui/Container";

export function ProjectRow({ project, reversed }: { project: Project; reversed?: boolean }) {
  return (
    <Container className="py-14 md:py-20">
      <div
        className={`flex flex-col ${
          reversed ? "md:flex-row-reverse" : "md:flex-row"
        } gap-10 md:gap-14 items-center`}
      >
        <div className="w-full md:w-1/2">
          <ScreenshotStream project={project} />
        </div>

        <div className="w-full md:w-1/2">
          <Tag variant="amber">{project.industry}</Tag>
          <h3 className="font-display text-2xl md:text-3xl font-bold mt-4 mb-2">
            {project.name}
          </h3>
          <p className="text-ink-soft text-base mb-4">{project.tagline}</p>
          <p className="mb-5 max-w-md border-l-2 border-signal pl-4 text-sm font-medium leading-relaxed text-ink">
            {project.impact}
          </p>
          <p className="text-sm text-ink-soft leading-relaxed mb-5 max-w-md">
            {project.overview}
          </p>
          <dl className="mb-6 grid max-w-md grid-cols-1 gap-3 border-y border-line py-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="mb-1 font-mono text-[10px] uppercase tracking-widest text-ink-soft/70">
                Role
              </dt>
              <dd className="text-ink-soft leading-snug">{project.role}</dd>
            </div>
            <div>
              <dt className="mb-1 font-mono text-[10px] uppercase tracking-widest text-ink-soft/70">
                Technical bet
              </dt>
              <dd className="text-ink-soft leading-snug">{project.technicalBet}</dd>
            </div>
          </dl>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.slice(0, 4).map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 font-mono text-[12px] tracking-wide text-signal hover:text-signal-dark focus-ring rounded"
          >
            View case study
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Container>
  );
}
