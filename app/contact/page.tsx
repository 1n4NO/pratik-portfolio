import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { ContactForm } from "@/components/sections/ContactForm";
import { profile } from "@/data/profile";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Contact",
    description:
      "Contact Pratik Singh for frontend architecture, AI-native product interfaces, design systems, and engineering leadership roles.",
    path: "/contact",
  }),
};

export default function ContactPage() {
  return (
    <Container className="pt-16 pb-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="font-mono text-[11px] tracking-widest uppercase text-signal mb-4">
            Contact
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold max-w-xl mb-4">
            Let&apos;s talk about what you&apos;re building.
          </h1>
          <p className="text-ink-soft max-w-md mb-12">
            Whether it&apos;s an architecture review, a full-time role, or something in between —
            drop a note below or reach me directly at{" "}
            <a
              href={`mailto:${profile.email}`}
              className="text-signal hover:text-signal-dark focus-ring rounded"
            >
              {profile.email}
            </a>
            .
          </p>
          <ContactForm />
        </div>

        <div className="relative flex min-h-[420px] items-center justify-center lg:sticky lg:top-24">
          <LottieAnimation
            src="/lottie/email-send.json"
            label="Animated illustration of an email being sent"
            className="relative h-[360px] w-full max-w-[560px] md:h-[460px]"
          />
        </div>
      </div>
    </Container>
  );
}
