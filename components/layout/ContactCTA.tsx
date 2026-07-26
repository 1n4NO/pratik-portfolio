import { ArrowRight, Mail, MessageCircle, Radio, Sparkles } from "lucide-react";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { profile } from "@/data/profile";

const cues = ["Messy brief?", "Scaling pinch?", "AI workflow?", "Design system debt?"];
const focusItems = [
  { label: "Architecture", detail: "Systems thinking" },
  { label: "AI workflows", detail: "Product interfaces" },
  { label: "Design systems", detail: "Durable UI foundations" },
  { label: "Performance", detail: "Fast paths to ship" },
];

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-deep text-ink">
      <HeroBackdrop stableDarkGrid />
      <div className="absolute inset-0 bg-deep/72" aria-hidden="true" />
      <Container className="relative py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded border border-signal/35 bg-signal/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-signal">
              <Radio size={13} className="contact-cta-ping icon-amber" aria-hidden="true" />
              Get in touch
            </div>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight md:text-5xl">
              Bring the thorny frontend thing. I&apos;ll bring a sharper path to ship it.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
              Architecture, product UX, AI-native workflows, performance, design systems. The fun
              usually starts where the ticket gets vague.
            </p>

            <div className="mt-7 flex flex-wrap gap-2" aria-label="Good reasons to start a conversation">
              {cues.map((cue, index) => (
                <span
                  key={cue}
                  className="rounded border border-deep-line bg-surface/80 px-3 py-1.5 font-mono text-[11px] text-ink-soft"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  {cue}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="contact-cta-card rounded-lg border border-deep-line bg-surface/75 p-4 shadow-overlay backdrop-blur">
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-deep-line pb-3">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                  <Sparkles size={14} className="icon-amber" aria-hidden="true" />
                  Open channel
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-signal">
                  <span className="h-2 w-2 rounded-full bg-signal contact-cta-live" />
                  available
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded border border-deep-line bg-deep/70 p-3">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                    Current mode
                  </p>
                  <p className="mt-2 text-sm text-ink">
                    Turning fuzzy product ambition into interfaces, systems, and delivery plans.
                  </p>
                </div>
                <div className="grid gap-2">
                  {focusItems.map((item) => (
                    <div
                      key={item.label}
                      className="grid grid-cols-[0.75rem_minmax(0,0.95fr)_minmax(0,1.25fr)] items-center gap-2 rounded border border-deep-line bg-deep/55 px-3 py-2"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-ink">
                        {item.label}
                      </span>
                      <span className="text-right text-xs text-ink-soft">{item.detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <LinkButton
                  href="/contact"
                  variant="darkPrimary"
                  className="contact-cta-button group flex-1"
                >
                  <MessageCircle size={15} className="icon-current" aria-hidden="true" />
                  Start a conversation
                  <ArrowRight
                    size={14}
                    className="icon-current transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </LinkButton>
                <LinkButton
                  href={`mailto:${profile.email}`}
                  variant="darkSecondary"
                  className="contact-cta-button group flex-1"
                >
                  <Mail size={15} className="icon-amber" aria-hidden="true" />
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
