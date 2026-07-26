import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { MusingsFeed } from "@/components/sections/MusingsFeed";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { posts } from "@/data/posts";
import { absoluteUrl, createMetadata, jsonLd } from "@/lib/seo";

const description =
  "Notes from Pratik Singh on frontend architecture, rendering strategy, performance budgets, design systems, and AI-assisted engineering.";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Musings",
    description,
    path: "/musings",
  }),
};

export default function MusingsPage() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Musings",
    description,
    url: absoluteUrl("/musings"),
    blogPost: sorted.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: absoluteUrl(`/musings/${post.slug}`),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(structuredData)}
      />
      <Container className="pt-16 pb-20">
        <MusingsFeed
          posts={sorted}
          intro={
            <div className="pb-2">
              <PageIntro eyebrow="Musings" title="Notes from the architecture desk." />
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
