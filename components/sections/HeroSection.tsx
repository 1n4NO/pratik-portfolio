"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { HeroVoicePortfolio } from "@/components/sections/HeroVoicePortfolio";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-dark pt-section-sm pb-section-sm md:min-h-[640px] md:pt-section-md md:pb-section-md"
      style={
        {
          "--color-ink": "124 124 125",
          "--color-ink-soft": "124 124 125",
        } as CSSProperties
      }
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[#05070b]" />
        <img
          src="/dev_desktop.gif"
          alt=""
          className="absolute inset-0 h-full w-full scale-[1.02] object-cover object-center opacity-100 blur-[1.25px]"
          aria-hidden="true"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(4_7_12_/_0.1)_0%,rgb(4_7_12_/_0.28)_44%,rgb(4_7_12_/_0.62)_100%)]" />
      </div>

      <Container className="relative z-10 pt-5 md:pt-6">
        <div className="space-y-5 md:space-y-6">
          <div className="mb-6 max-w-sm py-6 md:mb-8 md:py-8">
            <p className="font-display text-hero font-medium tracking-display text-[#f7f7f7] md:text-[clamp(6.25rem,8.75vw,10.5rem)]">
              Delight, Delivered.
            </p>
            <p className="mt-[-10px] whitespace-nowrap text-standfirst leading-standfirst text-ink-soft">
              <span className="text-[rgb(166,166,166)]">
                Every solution, handcrafted with precision
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded border border-signal bg-signal px-6 py-3.5 font-mono text-caption uppercase tracking-caps text-paper transition-colors hover:bg-signal-dark focus-ring"
            >
              View work
              <ArrowDown size={14} className="icon-current" aria-hidden="true" />
            </Link>
            <Link
              href={`mailto:${profile.email}?subject=Portfolio%20conversation`}
              className="inline-flex items-center justify-center gap-2 rounded border border-line-strong px-6 py-3.5 font-mono text-caption uppercase tracking-caps text-ink transition-colors hover:border-ink focus-ring"
            >
              Contact me
              <ArrowUpRight size={14} className="icon-amber" aria-hidden="true" />
            </Link>
          </div>

          <div className="pt-5 md:pt-6">
            <HeroVoicePortfolio />
          </div>
        </div>
      </Container>
    </section>
  );
}
