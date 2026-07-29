"use client";

import Link from "next/link";
import Image from "next/image";
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
    </section>
  );
}
