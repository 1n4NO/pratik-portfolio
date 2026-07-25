import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { MusingsFeed } from "@/components/sections/MusingsFeed";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Musings",
  description: "Notes on frontend architecture, performance, and AI-assisted engineering.",
};

export default function MusingsPage() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <Container className="pt-16 pb-20">
        <MusingsFeed
          posts={sorted}
          intro={
            <div className="pb-2">
              <p className="font-mono text-[11px] tracking-widest uppercase text-signal mb-4">
                Musings
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold max-w-xl">
                Notes from the architecture desk.
              </h1>
              <div className="mt-8 md:hidden">
                <MusingsLottieCircle />
              </div>
            </div>
          }
          sidebarVisual={<MusingsLottieCircle />}
        />
      </Container>

      <ContactCTA />
    </>
  );
}

function MusingsLottieCircle() {
  return (
    <div className="relative mx-auto flex aspect-square w-[210px] items-center justify-center rounded-full bg-surface-muted md:w-full">
      <div className="absolute inset-x-10 bottom-7 h-8 rounded-full bg-line/60 blur-xl" />
      <LottieAnimation
        src="/lottie/man-working-on-laptop.json"
        label="Animated illustration of a person working on a laptop"
        className="relative h-[145px] w-[145px] md:h-[180px] md:w-[180px]"
      />
    </div>
  );
}
