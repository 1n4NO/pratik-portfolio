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

      <Container className="relative z-10">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-start md:gap-6">
          <div className="bg-[rgb(10_14_20_/_0.18)] p-5 shadow-[0_20px_56px_rgba(0,0,0,0.24)] backdrop-blur-xl md:max-w-sm md:p-6">
            <p className="font-mono text-caption uppercase tracking-caps text-signal">
              {profile.name}
            </p>
            <p className="mt-3 font-mono text-caption uppercase tracking-caps text-ink-soft/80">
              {profile.role}
            </p>
            <p className="mt-2 font-mono text-micro uppercase tracking-caps text-ink-soft/60">
              {profile.yearsExperience} years · {profile.location}
            </p>
          </div>

          <div className="self-start md:pt-2 md:pl-4">
            <p className="max-w-[12ch] font-display text-hero font-medium tracking-display text-[#f7f7f7]">
              Delight, Delivered.
            </p>
            <p className="mt-3 max-w-none whitespace-nowrap text-standfirst leading-standfirst text-ink-soft">
              <span className="bg-amber px-1 text-[#1b2030] box-decoration-clone">
                Every solution, handcrafted with precision
              </span>
            </p>
          </div>

          <div className="md:col-span-2">
            <HeroVoicePortfolio />
          </div>

          <div className="md:col-span-2 mt-7 flex flex-col gap-3 sm:flex-row">
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
        </div>
      </Container>
    </section>
  );
}
