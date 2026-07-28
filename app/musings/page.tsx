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
              <PageIntro eyebrow="Musings" title="Notes from the workbench." />
              <div className="mt-8 md:hidden">
                <MusingsLottieCircle variant="mobile" />
              </div>
            </div>
          }
          sidebarVisual={<MusingsLottieCircle variant="sidebar" />}
        />
      </Container>

      <ContactCTA variant="compact" />
    </>
  );
}

function MusingsLottieCircle({ variant = "sidebar" }: { variant?: "sidebar" | "mobile" }) {
  const isSidebar = variant === "sidebar";

  return (
    <div
      className={`relative mx-auto flex aspect-square items-center justify-center rounded-full border ${
        isSidebar
          ? "w-[140px] border-line/60 bg-surface-muted/40 opacity-75"
          : "w-[210px] border-transparent bg-surface-muted"
      }`}
    >
      <div className="absolute inset-x-10 bottom-7 h-8 rounded-full bg-line/60 blur-xl" />
      <LottieAnimation
        src="/lottie/man-working-on-laptop.json"
        label="Animated illustration of a person working on a laptop"
        className={`relative ${isSidebar ? "h-[95px] w-[95px]" : "h-[145px] w-[145px]"}`}
      />
    </div>
  );
}
