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
  const isProductStudio = project.slug === "product-studio";
  const isMultiAgent = project.slug === "multi-agent-ai-system";
  const isOrqestra = project.slug === "orqestra";
  const isFluxion = project.slug === "fluxion";
  const isPolInsight = project.slug === "state-dashboard";

  return (
    <article
      id={`project-${project.slug}`}
      data-header-theme={isProductStudio || isMultiAgent ? "light" : "dark"}
      className={[
        "relative isolate scroll-mt-24 border-t",
        isProductStudio
          ? "border-[#bdb7aa] bg-[#f3efe6] text-[#101214]"
          : isMultiAgent
            ? "border-[#d9d9d9] bg-[#f7f7f2] text-[#0b0b0b]"
            : isOrqestra
              ? "border-[#d49c6e] bg-[#8f572f] text-[#fff9f0]"
              : isFluxion
                ? "border-[#0b747b] bg-[#061516] text-[#efffff]"
              : isPolInsight
                ? "border-[#c8d5e8] bg-[#f8fbff] text-[#10162a]"
              : "border-line bg-paper text-ink",
      ].join(" ")}
    >
      {isProductStudio && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/cyanotype-print.svg')] bg-cover bg-center bg-no-repeat opacity-95" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,243,234,0.72)_0%,rgba(244,238,227,0.24)_26%,rgba(17,17,17,0.08)_72%,rgba(17,17,17,0.16)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.4),transparent_16%),radial-gradient(circle_at_80%_24%,rgba(255,255,255,0.22),transparent_18%),radial-gradient(circle_at_50%_76%,rgba(255,255,255,0.18),transparent_24%)] opacity-48 mix-blend-screen" />
          <div className="absolute inset-0 bg-[linear-gradient(94deg,transparent_16%,rgba(17,17,17,0.1)_38%,rgba(255,255,255,0.08)_50%,rgba(17,17,17,0.08)_63%,transparent_84%)] opacity-55 blur-[1px]" />
        </div>
      )}
      {isMultiAgent && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/moire-print.svg')] bg-cover bg-center bg-no-repeat opacity-96" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(214,214,209,0.14)_26%,rgba(62,63,60,0.22)_72%,rgba(28,29,27,0.38)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_16%,rgba(255,255,255,0.4),transparent_15%),radial-gradient(circle_at_80%_24%,rgba(255,255,255,0.24),transparent_17%),radial-gradient(circle_at_50%_74%,rgba(255,255,255,0.16),transparent_22%)] opacity-55 mix-blend-screen" />
          <div className="absolute inset-0 bg-[linear-gradient(96deg,transparent_15%,rgba(17,17,17,0.1)_38%,rgba(255,255,255,0.08)_50%,rgba(17,17,17,0.09)_63%,transparent_84%)] opacity-60 blur-[1px]" />
        </div>
      )}
      {isOrqestra && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/orqestra-print.svg')] bg-cover bg-center bg-no-repeat opacity-95" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(241,214,176,0.16)_0%,rgba(226,153,74,0.04)_24%,rgba(73,30,17,0.08)_72%,rgba(50,21,15,0.18)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,245,219,0.22),transparent_18%),radial-gradient(circle_at_82%_24%,rgba(255,186,112,0.18),transparent_18%),radial-gradient(circle_at_50%_78%,rgba(255,122,93,0.16),transparent_24%)] opacity-65 mix-blend-screen" />
          <div className="absolute inset-0 bg-[linear-gradient(104deg,transparent_14%,rgba(255,255,255,0.12)_38%,rgba(255,169,89,0.1)_50%,rgba(255,255,255,0.08)_63%,transparent_84%)] opacity-55 blur-[1px]" />
        </div>
      )}
      {isFluxion && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#010708_0%,#061c1d_44%,#020b0d_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_88%_at_84%_8%,rgba(43,188,204,0.92)_0%,rgba(12,105,102,0.72)_24%,rgba(3,39,39,0.2)_48%,transparent_68%),radial-gradient(108%_86%_at_8%_76%,rgba(20,166,190,0.9)_0%,rgba(7,94,91,0.7)_28%,rgba(2,31,33,0.18)_52%,transparent_72%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(70%_30%_at_30%_35%,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.62)_42%,transparent_78%),radial-gradient(72%_32%_at_71%_70%,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.62)_46%,transparent_80%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(204,255,255,0.16)_0.7px,transparent_0.8px)] bg-[size:4px_4px] opacity-20 mix-blend-screen" />
        </div>
      )}
      {isPolInsight && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/polinsight-print.svg')] bg-cover bg-center bg-no-repeat opacity-96" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(246,250,255,0.1)_30%,rgba(255,255,255,0.76)_70%,rgba(255,255,255,0.96)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(255,255,255,0.9),transparent_18%),radial-gradient(circle_at_78%_14%,rgba(255,218,72,0.34),transparent_22%),radial-gradient(circle_at_64%_34%,rgba(78,105,255,0.2),transparent_18%),radial-gradient(circle_at_22%_28%,rgba(17,24,39,0.12),transparent_22%)] mix-blend-screen opacity-80" />
          <div className="absolute inset-x-0 top-0 h-[42%] bg-[linear-gradient(180deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.02)_56%,transparent_100%)]" />
        </div>
      )}
      <Container className="relative z-10 py-12 md:py-20">
        <Link href={`/work/${project.slug}`} className="group relative z-10 block focus-ring">
          <div
            className={[
              "relative aspect-[16/9] overflow-hidden",
              isProductStudio
                ? "border border-[#c1b9ac] bg-[linear-gradient(180deg,rgba(255,255,255,0.52),rgba(240,232,221,0.18))]"
                : isMultiAgent
                  ? "border border-[#d8d8d0] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(242,242,236,0.36))]"
                  : isOrqestra
                    ? "border border-[#e3bb8f] bg-[linear-gradient(180deg,rgba(255,237,213,0.38),rgba(171,106,58,0.22))]"
                    : isFluxion
                      ? "border border-[#116e76] bg-[linear-gradient(135deg,rgba(3,15,16,0.84),rgba(12,108,112,0.3))]"
                    : isPolInsight
                      ? "border border-[#cfd9e8] bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(240,245,255,0.22))]"
                : "bg-surface-muted",
            ].join(" ")}
          >
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
            <span
              className={[
                "absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full opacity-0 transition duration-300 group-hover:opacity-100 md:right-6 md:top-6",
                isProductStudio
                  ? "bg-[#f7f2e9] text-[#111111]"
                  : isMultiAgent
                    ? "bg-[#111111] text-[#f7f7f2]"
                    : isOrqestra
                      ? "bg-[#fff7ef] text-[#7c3f1a]"
                      : isPolInsight
                        ? "bg-[#ffd83d] text-[#0f172a]"
                    : "bg-paper text-ink",
              ].join(" ")}
            >
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
            {isProductStudio && (
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_58%)]" />
            )}
            {isMultiAgent && (
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22),transparent_56%)]" />
            )}
            {isOrqestra && (
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,244,227,0.22),transparent_56%)]" />
            )}
          </div>

          <div className="grid gap-8 pt-7 md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] md:pt-10">
            <div>
              <p
              className={[
                  "mb-3 font-mono text-xs",
                  isProductStudio
                    ? "text-[#f7f7f2]"
                    : isMultiAgent
                      ? "text-[#f7f7f2]"
                      : isOrqestra
                        ? "text-[#fff8f0]"
                        : isPolInsight
                          ? "text-[#55657f]"
                      : "text-muted-copy",
                ].join(" ")}
              >
                {index ? String(index).padStart(2, "0") : "Case study"} · {project.industry}
              </p>
              <h3
                className={[
                  "max-w-[14ch] font-display text-[clamp(2.6rem,5vw,5.8rem)] font-normal",
                  isProductStudio
                    ? "text-[#f7f7f2]"
                    : isMultiAgent
                      ? "text-[#f7f7f2]"
                      : isOrqestra
                        ? "text-[#fff9f0]"
                        : isPolInsight
                          ? "text-[#10162a]"
                      : "",
                ].join(" ")}
              >
                {project.name}
              </h3>
            </div>
            <div className="space-y-5 md:pt-8">
              <p
                className={[
                  "text-xl md:text-2xl",
                  isProductStudio
                    ? "text-[#f7f7f2]"
                    : isMultiAgent
                      ? "text-[#f7f7f2]"
                      : isOrqestra
                        ? "text-[#fff9f0]"
                        : isPolInsight
                          ? "text-[#10162a]"
                      : "text-ink",
                ].join(" ")}
              >
                {project.tagline}
              </p>
              <p
                className={[
                  "max-w-xl text-base",
                  isProductStudio
                    ? "text-[#f7f7f2]"
                    : isMultiAgent
                      ? "text-[#f7f7f2]"
                      : isOrqestra
                        ? "text-[#fff1df]"
                        : isPolInsight
                          ? "text-[#30405d]"
                      : "text-ink-soft",
                ].join(" ")}
              >
                {project.overview}
              </p>
              <div
                className={[
                  "flex flex-wrap gap-x-5 gap-y-2 border-t pt-5 font-mono text-[11px]",
                  isProductStudio
                    ? "border-[#c0bab0] text-[#f7f7f2]"
                    : isMultiAgent
                      ? "border-[#d6d6d1] text-[#f7f7f2]"
                      : isOrqestra
                        ? "border-[#f2cfab] text-[#fff3e3]"
                        : isPolInsight
                          ? "border-[#cad5e8] text-[#5b6c87]"
                      : "border-line text-muted-copy",
                ].join(" ")}
              >
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
