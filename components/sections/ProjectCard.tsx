import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Tag } from "@/components/ui/Tag";

export function ProjectCard({ project }: { project: Project }) {
  const domain = project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block focus-ring rounded-lg"
    >
      <BrowserFrame src={project.cover.src} alt={project.cover.alt} url={domain} />
      <div className="pt-4">
        <Tag variant="amber">{project.industry}</Tag>
        <h3 className="font-display text-lg font-bold mt-3 mb-1 flex items-center gap-1.5">
          {project.name}
          <ArrowUpRight
            size={16}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-signal"
            aria-hidden="true"
          />
        </h3>
        <p className="text-sm text-ink-soft">{project.tagline}</p>
      </div>
    </Link>
  );
}
