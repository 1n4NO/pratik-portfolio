"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/Container";

const upcomingProjects = [
  {
    name: "Forge",
    status: "In development",
    description:
      "A local-first software workspace built around agents, context, and execution.",
    image: "/upcoming/forge/01-overview.png",
    imageAlt: "Forge workspace overview",
    tags: ["AI systems", "Local-first", "Architecture"],
    href: "https://forge-landing-pink.vercel.app/",
    tone: "amber",
  },
  {
    name: "MusiCollab",
    status: "In development",
    description:
      "Make music across distance with real-time collaboration and expressive tools.",
    image: "/upcoming/musicollab-web-mark.svg",
    imageAlt: "MusiCollab composer mark",
    tags: ["WebSocket", "Audio", "Collaboration"],
    href: undefined,
    tone: "violet",
  },
  {
    name: "Blue Lotus",
    status: "Upcoming",
    description:
      "A digital experience built around visual design, animation, and storytelling.",
    image: "/upcoming/1.png",
    imageAlt: "Blue Lotus Experience preview",
    tags: ["Art direction", "Experience", "Branding"],
    href: "https://blue-lotus-experience.vercel.app/",
    tone: "green",
  },
] as const;

type ProjectTone = (typeof upcomingProjects)[number]["tone"];

const toneStyles: Record<
  ProjectTone,
  { badge: string; tags: string; action: string; image: string }
> = {
  amber: {
    badge: "border-[#ad7d2f] text-[#d8ad5d]",
    tags: "border-[#343238] bg-[#171921] text-[#d8dbe2]",
    action: "text-[#d8ad5d] hover:text-[#f0c979]",
    image: "bg-[#11141c]",
  },
  violet: {
    badge: "border-[#8274b5] text-[#aaa0df]",
    tags: "border-[#343238] bg-[#171921] text-[#d8dbe2]",
    action: "text-[#aaa0df] hover:text-[#c6bdf0]",
    image: "bg-[#11121d]",
  },
  green: {
    badge: "border-[#6a8c70] text-[#9ac29f]",
    tags: "border-[#303a33] bg-[#172019] text-[#d2e3d3]",
    action: "text-[#9ac29f] hover:text-[#c1e5c4]",
    image: "bg-[#111a15]",
  },
};

export function UpcomingProjectSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      data-header-theme="dark"
      aria-labelledby="upcoming-project"
      className="border-t border-[#202631] bg-[#05080d] text-[#f5f7fb]"
    >
      <Container className="py-section-md md:py-section-lg">
        <div className="grid gap-10 lg:grid-cols-[minmax(10rem,0.58fr)_minmax(0,2.42fr)] lg:gap-12">
          <div className="max-w-[13rem]">
            <p
              id="upcoming-project"
              className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#d8b34a]"
            >
              Currently building
            </p>
            <p className="mt-6 max-w-[12rem] text-sm leading-6 text-[#9ba7bb]">
              Exploring ideas, shipping in public and building what&apos;s next.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {upcomingProjects.map((project, index) => (
              <UpcomingProjectCard
                key={project.name}
                project={project}
                index={index}
                reduceMotion={Boolean(reduceMotion)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function UpcomingProjectCard({
  project,
  index,
  reduceMotion,
}: {
  project: (typeof upcomingProjects)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const tone = toneStyles[project.tone];
  const card = (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group overflow-hidden border border-[#252c38] bg-[#080c13] transition-colors duration-300 hover:border-[#4a5568]"
    >
      <div className={`relative aspect-[1.48] overflow-hidden ${tone.image}`}>
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1024px) 33vw, 28vw"
          className={
            project.name === "MusiCollab"
              ? "object-contain p-10 transition duration-700 ease-out group-hover:scale-[1.03]"
              : "object-cover object-top transition duration-700 ease-out group-hover:scale-[1.03]"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c13]/40 via-transparent to-transparent" />
        <span className={`absolute left-4 top-4 border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] ${tone.badge}`}>
          {project.status}
        </span>
      </div>

      <div className="flex min-h-[14.25rem] flex-col p-5 md:p-6">
        <h2 className="font-display text-[1.8rem] leading-none tracking-[-0.025em] text-[#f5f7fb]">
          {project.name}
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-6 text-[#9ba7bb]">{project.description}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`border px-2.5 py-1 font-mono text-[10px] ${tone.tags}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {project.href ? (
          <Link
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 inline-flex w-fit items-center gap-2 text-sm transition-colors focus-ring ${tone.action}`}
          >
            Explore
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        ) : (
          <span className={`mt-6 inline-flex w-fit items-center gap-2 text-sm ${tone.action}`}>
            Explore
            <ArrowUpRight size={15} aria-hidden="true" />
          </span>
        )}
      </div>
    </motion.article>
  );

  return card;
}
