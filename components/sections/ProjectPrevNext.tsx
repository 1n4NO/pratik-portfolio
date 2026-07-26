import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectPrevNext({
  previous,
  next,
}: {
  previous: Project | null;
  next: Project | null;
}) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="More projects"
      className="grid grid-cols-1 md:grid-cols-2 border-t border-line"
    >
      {previous ? (
        <PrevNextLink project={previous} direction="previous" />
      ) : (
        <div className="hidden md:block" />
      )}
      {next ? (
        <PrevNextLink project={next} direction="next" />
      ) : (
        <div className="hidden md:block" />
      )}
    </nav>
  );
}

function PrevNextLink({
  project,
  direction,
}: {
  project: Project;
  direction: "previous" | "next";
}) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group flex items-center gap-4 border-line py-8 focus-ring ${
        isNext
          ? "md:flex-row-reverse md:text-right md:pl-8"
          : "border-b md:border-b-0 md:border-r md:pr-8"
      }`}
    >
      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md border border-line">
        <Image
          src={project.cover.src}
          alt=""
          fill
          sizes="96px"
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0">
        <p
          className={`mb-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-soft/60 ${
            isNext ? "md:justify-end" : ""
          }`}
        >
          {!isNext && <ArrowLeft size={11} className="icon-amber" aria-hidden="true" />}
          {isNext ? "Next project" : "Previous project"}
          {isNext && <ArrowRight size={11} className="icon-amber" aria-hidden="true" />}
        </p>
        <p className="truncate font-display text-base font-bold text-ink transition-colors group-hover:text-signal">
          {project.name}
        </p>
      </div>
    </Link>
  );
}
