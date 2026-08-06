"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { Container } from "@/components/ui/Container";

const upcomingImages = [
  { src: "/upcoming/1.png", alt: "Upcoming project preview image 1", className: "md:col-span-2 md:row-span-2" },
  { src: "/upcoming/2.png", alt: "Upcoming project preview image 2", className: "md:row-span-2" },
  { src: "/upcoming/3.png", alt: "Upcoming project preview image 3", className: "" },
  { src: "/upcoming/4.png", alt: "Upcoming project preview image 4", className: "" },
  { src: "/upcoming/5.png", alt: "Upcoming project preview image 5", className: "md:col-span-2" },
  { src: "/upcoming/6.png", alt: "Upcoming project preview image 6", className: "md:row-span-2" },
  { src: "/upcoming/7.png", alt: "Upcoming project preview image 7", className: "" },
  { src: "/upcoming/8.png", alt: "Upcoming project preview image 8", className: "md:row-span-2" },
  { src: "/upcoming/9.png", alt: "Upcoming project preview image 9", className: "md:col-span-2 md:row-span-2" },
  { src: "/upcoming/10.png", alt: "Upcoming project preview image 10", className: "md:row-span-2" },
] as const;

const blueLotusTags = [
  "visual design",
  "frontend architecture",
  "animation",
  "interaction design",
  "storytelling",
  "branding",
  "art direction",
] as const;

const forgeScreenshotSlots = [
  {
    src: "/upcoming/forge/01-overview.png",
    label: "Workspace overview",
    detail: "The local command center with workspace status, context, and next actions",
    className: "md:col-span-2",
    aspect: "aspect-[16/9]",
  },
  {
    src: "/upcoming/forge/02-architect.png",
    label: "Architect",
    detail: "A live codebase knowledge graph showing nodes and dependencies",
    className: "",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/upcoming/forge/03-foundry.png",
    label: "Foundry",
    detail: "The workflow library and its local execution controls",
    className: "",
    aspect: "aspect-[4/3]",
  },
] as const;

export function UpcomingProjectSection() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const fade = useTransform(scrollYProgress, [0.82, 1], [0.18, 0.42]);
  const grain = useTransform(scrollYProgress, [0.82, 1], [0.06, 0.12]);

  return (
    <section aria-labelledby="upcoming-project" className="bg-[#000000] text-white">
      <div className="relative min-h-screen overflow-hidden border-t border-white/10 bg-[#000000]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035),transparent_45%)]"
        />
        <motion.div
          aria-hidden="true"
          style={reduceMotion ? undefined : { opacity: fade }}
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_20%,transparent_80%,rgba(255,255,255,0.012))]"
        />
        <motion.div
          aria-hidden="true"
          style={reduceMotion ? undefined : { opacity: grain }}
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.022)_0,rgba(255,255,255,0.022)_1px,transparent_1px,transparent_2px)]"
        />

        <Container className="relative flex min-h-screen items-center justify-center py-section-md">
          <div className="max-w-3xl text-center">
            <p
              id="upcoming-project"
              className="font-mono text-[9px] uppercase tracking-[0.55em] text-white/48"
            >
              Upcoming Project
            </p>
            <p className="mt-6 font-display text-[clamp(2rem,4.5vw,4.8rem)] leading-[0.94] tracking-[-0.035em] text-white/92 text-balance">
              Blue Lotus Experience
            </p>
          </div>
        </Container>
      </div>

      <section aria-label="Upcoming project images" className="border-t border-white/10 bg-[#000000]">
        <Container className="py-section-sm md:py-section-md">
          <div className="mb-8 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {blueLotusTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.34em] text-white/72"
              >
                {tag}
              </span>
            ))}
          </div>

          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="grid auto-rows-[8.5rem] grid-cols-1 gap-3 sm:grid-cols-2 sm:auto-rows-[10.5rem] lg:grid-cols-4 lg:auto-rows-[9rem]"
          >
            {upcomingImages.map((image, index) => (
              <motion.figure
                key={image.src}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reduceMotion ? 0 : 0.9, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className={[
                  "group relative overflow-hidden rounded-none border border-white/10 bg-[#000000]",
                  image.className,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.02] group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-black/10 transition duration-700 group-hover:bg-black/0" />
              </motion.figure>
            ))}
          </motion.div>

          <div className="mt-14 flex justify-center">
            <Link
              href="https://blue-lotus-experience.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/14 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.34em] text-white/72 transition-colors hover:border-white/24 hover:text-white focus-ring"
            >
              Visit site
            </Link>
          </div>
        </Container>
      </section>

      <ForgeUpcomingProject reduceMotion={Boolean(reduceMotion)} />
    </section>
  );
}

function ForgeUpcomingProject({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section aria-labelledby="forge-upcoming-project" className="border-t border-[#080b12]">
      <div className="relative min-h-[92svh] overflow-hidden bg-[#f36a38] text-[#080b12]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <Image
            src="/upcoming/forge-logo.svg"
            alt=""
            width={512}
            height={512}
            className="absolute -left-[13vw] -top-[24vw] w-[54vw] max-w-none rotate-[-17deg] opacity-[0.18] mix-blend-multiply"
          />
          <Image
            src="/upcoming/forge-logo.svg"
            alt=""
            width={512}
            height={512}
            className="absolute -bottom-[28vw] -right-[10vw] w-[63vw] max-w-none rotate-[12deg] opacity-[0.2] mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),transparent_38%,rgba(8,11,18,0.08))]" />
        </div>

        <Container className="relative flex min-h-[92svh] flex-col py-8 md:py-10">
          <div className="flex items-center justify-between gap-5 border-b border-[#080b12]/30 pb-5 font-mono text-[11px]">
            <span>Upcoming project</span>
            <span className="hidden sm:block">Local-first software workspace</span>
            <span>In development</span>
          </div>

          <div className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(22rem,1.28fr)] lg:py-16">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 max-w-xl"
            >
              <p className="mb-6 font-mono text-xs">Forge / Local workspace</p>
              <h2
                id="forge-upcoming-project"
                className="font-display text-[clamp(4.5rem,11vw,11rem)] font-normal"
              >
                Forge
              </h2>
              <p className="mt-7 max-w-lg text-lg text-[#171a21] md:text-2xl">
                A local-first workspace for understanding, organizing, automating, and improving
                software work.
              </p>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#080b12]/30 pt-5 font-mono text-[11px]">
                <span>Electron</span>
                <span>Knowledge</span>
                <span>Agent workflows</span>
                <span>Architecture</span>
                <span>Quality</span>
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.9, rotate: -5 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-[42rem]"
            >
              <div className="absolute inset-[8%] translate-x-6 translate-y-7 bg-[#080b12]/18" aria-hidden="true" />
              <Image
                src="/upcoming/forge-logo.svg"
                alt="Forge geometric orange spark logo"
                width={512}
                height={512}
                className="relative w-full drop-shadow-[22px_28px_0_rgba(8,11,18,0.14)]"
              />
            </motion.div>
          </div>

          <div className="flex flex-col gap-5 border-t border-[#080b12]/30 pt-5 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md pr-14 text-sm text-[#171a21] sm:pr-0">
              Projects, notes, captures, workflows, and code review stay close to the files and
              decisions that shape them.
            </p>
            <Link
              href="https://forge-landing-pink.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 border-b border-[#080b12] pb-1 text-sm transition-opacity hover:opacity-60 focus-ring"
            >
              Explore Forge <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </Container>
      </div>

      <div className="bg-[#080b12] text-[#f3f1e9]">
        <Container className="py-section-sm md:py-section-md">
          <div className="grid gap-10 border-b border-[#273244] pb-10 md:grid-cols-[minmax(0,0.7fr)_minmax(18rem,1.3fr)] md:items-end md:pb-14">
            <div>
              <p className="font-mono text-xs text-[#d8b34a]">Product screens</p>
              <h3 className="mt-5 max-w-[10ch] font-display text-[clamp(2.8rem,6vw,6rem)] font-normal">
                Show Forge at work.
              </h3>
            </div>
            <p className="max-w-xl text-base text-[#abb4c5] md:text-lg">
              Move from understanding a codebase to approving the next run without losing the
              thread. Forge keeps project context, knowledge, and execution in one local workspace.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
            {forgeScreenshotSlots.map((slot, index) => (
              <ForgeScreenshotSlot key={slot.src} slot={slot} index={index} />
            ))}
          </div>

          <div className="mt-8 grid gap-3 border-t border-[#273244] pt-6 font-mono text-[11px] text-[#8490a5] sm:grid-cols-3">
            <span>Local by default</span>
            <span>Source-backed outputs</span>
            <span className="sm:text-right">Human approval stays in the loop</span>
          </div>
        </Container>
      </div>
    </section>
  );
}

function ForgeScreenshotSlot({
  slot,
  index,
}: {
  slot: (typeof forgeScreenshotSlots)[number];
  index: number;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure
      className={`${slot.className} ${slot.aspect} group relative overflow-hidden border border-[#273244] bg-[#0d121c]`}
    >
      <Image
        src={`${slot.src}?v=20260806`}
        alt={loaded ? `${slot.label} screenshot of Forge` : ""}
        aria-hidden={!loaded}
        fill
        sizes={index === 0 ? "(max-width: 768px) 100vw, 80vw" : "(max-width: 768px) 100vw, 40vw"}
        className={`absolute inset-0 h-full w-full object-cover object-top transition duration-700 ${
          loaded ? "opacity-100 group-hover:scale-[1.01]" : "opacity-0"
        }`}
        ref={(image) => {
          if (!loaded && image?.complete && image.naturalWidth > 0) setLoaded(true);
        }}
        onLoad={() => setLoaded(true)}
      />

      {!loaded && (
        <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-7">
          <div className="flex items-center justify-between gap-5 border-b border-[#273244] pb-4 font-mono text-[10px] text-[#8490a5]">
            <span>Screenshot slot</span>
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className="relative flex flex-1 items-center justify-center py-8">
            <Image
              src="/upcoming/forge-logo.svg"
              alt=""
              width={512}
              height={512}
              className="w-[28%] min-w-24 max-w-44 opacity-[0.13] grayscale"
            />
          </div>
          <figcaption className="border-t border-[#273244] pr-14 pt-4 sm:pr-0">
            <p className="text-base text-[#f3f1e9]">{slot.label}</p>
            <p className="mt-1 text-sm text-[#8490a5]">{slot.detail}</p>
            <code className="mt-3 block break-all font-mono text-[10px] text-[#d8b34a]">
              public{slot.src}
            </code>
          </figcaption>
        </div>
      )}
    </figure>
  );
}
