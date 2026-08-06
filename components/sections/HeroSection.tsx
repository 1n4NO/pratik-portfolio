"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HeroVoicePortfolio } from "@/components/sections/HeroVoicePortfolio";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-paper text-ink">
      <Container className="relative py-14 md:py-20 lg:py-24">
        <div className="grid min-h-[calc(100svh-9rem)] content-between gap-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.45fr)] lg:items-end">
            <h1 className="max-w-[11ch] font-display text-[clamp(3.7rem,8.2vw,8.8rem)] font-normal text-ink">
              Frontend architecture. Product craft. AI systems.
            </h1>

            <div className="space-y-7 border-t border-line pt-6 lg:mb-4">
              <p className="max-w-md text-lg text-ink-soft md:text-xl">
                I design and build ambitious digital products—turning complex systems into
                interfaces people can understand, trust, and use.
              </p>
              <div className="flex flex-wrap gap-5">
                <Link
                  href="#work"
                  className="inline-flex items-center gap-2 border-b border-ink pb-1 text-sm text-ink transition-colors hover:border-signal hover:text-signal focus-ring"
                >
                  Selected work
                  <ArrowDown size={15} aria-hidden="true" />
                </Link>
                <Link
                  href={`mailto:${profile.email}?subject=Portfolio%20conversation`}
                  className="inline-flex items-center gap-2 border-b border-line-strong pb-1 text-sm text-ink-soft transition-colors hover:border-signal hover:text-signal focus-ring"
                >
                  Start a conversation
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-8 border-t border-line pt-8 md:grid-cols-[0.45fr_1fr] md:items-start">
            <div className="flex items-center gap-3 font-mono text-xs text-muted-copy">
              <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
              Bangalore · Available for focused collaborations
            </div>
            <div>
              <p className="mb-4 max-w-xl text-sm text-ink-soft">
                Looking for something specific? Ask the portfolio about architecture, AI,
                design systems, or a project.
              </p>
              <HeroVoicePortfolio />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
