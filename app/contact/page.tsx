import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
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
          <PageIntro
            eyebrow="Contact"
            title="Let's talk about what you're building."
            className="mb-12"
          >
            <p>
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
          </PageIntro>
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
