import { ArrowRight, Mail, MessageCircle, Radio, Sparkles } from "lucide-react";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { profile } from "@/data/profile";

const cues = ["Messy brief?", "Scaling pinch?", "AI workflow?", "Design system debt?"];

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-[#05080D] text-[#F7F8FA]">
      <HeroBackdrop stableDarkGrid />
      <div className="absolute inset-0 bg-[#05080D]/72" aria-hidden="true" />
      <Container className="relative py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded border border-[#849CFF]/35 bg-[#849CFF]/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[#849CFF]">
              <Radio size={13} className="contact-cta-ping" aria-hidden="true" />
              Get in touch
            </div>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight md:text-5xl">
              Bring the thorny frontend thing. I&apos;ll bring a sharper path to ship it.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#B0B9C9] md:text-base">
              Architecture, product UX, AI-native workflows, performance, design systems. The fun
              usually starts where the ticket gets vague.
            </p>

            <div className="mt-7 flex flex-wrap gap-2" aria-label="Good reasons to start a conversation">
              {cues.map((cue, index) => (
                <span
                  key={cue}
                  className="contact-cta-chip rounded border border-[#252B38] bg-[#141822]/80 px-3 py-1.5 font-mono text-[11px] text-[#D7DCE7]"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  {cue}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="contact-cta-card rounded-lg border border-[#252B38] bg-[#141822]/75 p-4 shadow-[0_24px_70px_rgb(0_0_0_/_0.34)] backdrop-blur">
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-[#252B38] pb-3">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#B0B9C9]">
                  <Sparkles size={14} className="text-[#F6BE6E]" aria-hidden="true" />
                  Open channel
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#849CFF]">
                  <span className="h-2 w-2 rounded-full bg-[#849CFF] contact-cta-live" />
                  available
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded border border-[#252B38] bg-[#05080D]/70 p-3">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[#B0B9C9]">
                    Current mode
                  </p>
                  <p className="mt-2 text-sm text-[#F7F8FA]">
                    Turning fuzzy product ambition into interfaces, systems, and delivery plans.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2" aria-hidden="true">
                  {[72, 44, 86].map((height, index) => (
                    <span
                      key={height}
                      className="contact-cta-meter rounded bg-[#849CFF]/30"
                      style={{ height, animationDelay: `${index * 130}ms` }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <LinkButton
                  href="/contact"
                  variant="primary"
                  className="contact-cta-button contact-cta-button-primary group flex-1"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  Start a conversation
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </LinkButton>
                <LinkButton
                  href={`mailto:${profile.email}`}
                  variant="inverse"
                  className="contact-cta-button contact-cta-button-secondary group flex-1"
                >
                  <Mail size={15} aria-hidden="true" />
                  Email me
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
