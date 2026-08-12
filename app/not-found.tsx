import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[calc(100svh-10rem)] items-center overflow-hidden bg-[#05080d] text-[#f5f7fb]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_28%,rgba(172,152,136,0.16),transparent_24%),linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.025)_48%,transparent_49%)]"
      />
      <Container className="relative py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[minmax(0,0.78fr)_minmax(18rem,1.22fr)] md:items-end">
          <div>
            <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.34em] text-[#d8b34a]">
              Error / wrong turn
            </p>
            <p className="font-display text-[clamp(8rem,24vw,19rem)] leading-[0.72] tracking-[-0.08em] text-[#f5f7fb]">
              404
            </p>
          </div>

          <div className="border-t border-[#2b3442] pt-6 md:mb-4">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#7f8ba0]">
              Route coordinates
            </p>
            <h1 className="max-w-xl font-display text-[clamp(2.3rem,5vw,5rem)] font-normal leading-[0.94] tracking-[-0.035em]">
              You found the unbuilt part of the portfolio.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-[#aeb8c8]">
              This route wandered off before it shipped. The useful work is back at the starting
              point.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-3 border-b border-[#d8b34a] pb-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[#d8b34a] transition-colors hover:border-[#f0cf70] hover:text-[#f0cf70] focus-ring"
            >
              Return to the homepage
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="mt-20 flex items-center justify-between border-t border-[#202936] pt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#667286]">
          <span>1N4N0 / signal lost</span>
          <span className="hidden sm:inline">Nothing to see here. Probably.</span>
        </div>
      </Container>
    </main>
  );
}
