import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Container } from "@/components/ui/Container";

export function ProjectRow({
  project,
  index,
  mediaTheme = "all",
}: {
  project: Project;
  reversed?: boolean;
  index?: number;
  total?: number;
  mediaTheme?: "all" | "light";
}) {
  const darkCover = mediaTheme === "light" ? project.cover.src.replace(/dark/gi, "light") : project.cover.src;
  const isVideo = /\.(webm|mp4)$/i.test(darkCover);

  return (
    <article id={`project-${project.slug}`} className="scroll-mt-24 border-t border-line bg-paper text-ink">
      <Container className="py-12 md:py-20">
        <Link href={`/work/${project.slug}`} className="group block focus-ring">
          <div className="relative aspect-[16/9] overflow-hidden bg-surface-muted">
            {isVideo ? (
              <video
                className="h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.015]"
                autoPlay
                muted
                loop
                playsInline
                aria-label={project.cover.alt}
              >
                <source src={darkCover} />
              </video>
            ) : (
              <Image
                src={darkCover}
                alt={project.cover.alt}
                fill
                sizes="(max-width: 768px) 100vw, 1240px"
                priority={index === 1}
                className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.015]"
              />
            )}
            <span className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-paper text-ink opacity-0 transition duration-300 group-hover:opacity-100 md:right-6 md:top-6">
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </div>

          <div className="grid gap-8 pt-7 md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] md:pt-10">
            <div>
              <p className="mb-3 font-mono text-xs text-muted-copy">
                {index ? String(index).padStart(2, "0") : "Case study"} · {project.industry}
              </p>
              <h3 className="max-w-[14ch] font-display text-[clamp(2.6rem,5vw,5.8rem)] font-normal">
                {project.name}
              </h3>
            </div>
            <div className="space-y-5 md:pt-8">
              <p className="text-xl text-ink md:text-2xl">{project.tagline}</p>
              <p className="max-w-xl text-base text-ink-soft">{project.overview}</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5 font-mono text-[11px] text-muted-copy">
                {project.techStack.slice(0, 5).map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </Container>
    </article>
  );
}
