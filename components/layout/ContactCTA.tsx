import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

export function ContactCTA() {
  return (
    <section className="border-t border-line bg-canvas text-[#161512]">
      <Container className="py-16 md:py-24 lg:py-28">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] md:items-end">
          <div>
            <p className="mb-5 font-mono text-xs text-[#53524f]">Have a difficult product problem?</p>
            <h2 className="max-w-[10ch] font-display text-[clamp(3.5rem,8vw,8.5rem)] font-normal">
              Let&apos;s make it clear.
            </h2>
          </div>
          <div className="space-y-7 border-t border-[#887f77] pt-6">
            <p className="text-lg text-[#53524f] md:text-xl">
              I work best where product ambition, interface quality, and frontend architecture
              need to become one executable plan.
            </p>
            <a
              href={`mailto:${profile.email}?subject=Frontend%20architecture%20conversation`}
              className="inline-flex items-center gap-2 border-b border-[#161512] pb-1 text-base transition-opacity hover:opacity-60 focus-ring"
            >
              {profile.email}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
