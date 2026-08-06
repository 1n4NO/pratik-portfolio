/*
THESIS: The work leads; this is a studio portfolio, not a technical dashboard.
OWN-WORLD: Graphite fields, mineral neutrals, warm-grey accent, thin rules, and oversized Gloock statements.
STORY: Meet Pratik, see proof at full scale, understand how he works, then start a conversation.
FIRST VIEWPORT: A dominant three-part practice statement fills the left; a concise offer and actions anchor the right.
FORM: Image-led independent studio portfolio, adapted from the user-pinned Piñt reference.
*/
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { HeroIdentityStrip } from "@/components/sections/HeroIdentityStrip";
import { HeroMarquee } from "@/components/sections/HeroMarquee";
import { ProjectRow } from "@/components/sections/ProjectRow";
import { UpcomingProjectSection } from "@/components/sections/UpcomingProjectSection";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { absoluteUrl, createMetadata, jsonLd, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  ...createMetadata({ description: siteConfig.description, path: "/" }),
  verification: { google: "V3Ju8VXyJ5J5dbzwoeSk2MYeSGvsjEsk0W3lIUV5qr0" },
};

export default function HomePage() {
  const featuredProjects = projects.slice(0, 4);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: profile.name,
        jobTitle: profile.role,
        description: profile.short,
        url: siteConfig.url,
        email: `mailto:${profile.email}`,
        sameAs: [profile.linkedin, profile.github],
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.url}/#selected-work`,
        name: "Selected work",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(`/work/${project.slug}`),
          name: project.name,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <HeroIdentityStrip />
      <HeroSection />

      <section className="border-y border-line bg-surface py-5 text-ink" aria-label="Project reel">
        <HeroMarquee />
      </section>

      <section className="bg-canvas text-[#161512]">
        <Container className="py-16 md:py-24 lg:py-28">
          <div className="grid gap-12 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <p className="font-mono text-xs text-[#53524f]">What I bring to the work</p>
            <div>
              <h2 className="max-w-[16ch] font-display text-[clamp(2.8rem,5.6vw,6.2rem)] font-normal">
                Complex products deserve interfaces that feel inevitable.
              </h2>
              <div className="mt-10 grid gap-6 border-t border-[#9c9892] pt-7 md:grid-cols-2">
                {profile.long.slice(0, 2).map((paragraph) => (
                  <p key={paragraph} className="text-base text-[#53524f] md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
              <Link
                href="/expertise"
                className="mt-9 inline-flex items-center gap-2 border-b border-[#161512] pb-1 text-sm transition-opacity hover:opacity-60 focus-ring"
              >
                More about how I work
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section id="work" aria-labelledby="work-heading" className="bg-paper text-ink">
        <Container className="py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <h2 id="work-heading" className="max-w-[10ch] font-display text-[clamp(3.4rem,7vw,8rem)] font-normal">
              Selected work
            </h2>
            <Link
              href="/work"
              className="inline-flex w-fit items-center gap-2 border-b border-line-strong pb-1 text-sm text-ink transition-colors hover:border-signal hover:text-signal focus-ring"
            >
              View all projects
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </Container>

        {featuredProjects.map((project, index) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={index + 1}
            mediaTheme="light"
          />
        ))}
      </section>

      <UpcomingProjectSection />

      <section className="border-t border-line bg-surface text-ink">
        <Container className="py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] md:items-end">
            <h2 className="max-w-[13ch] font-display text-[clamp(2.8rem,5.5vw,6rem)] font-normal">
              I worry about the details so teams can move with confidence.
            </h2>
            <div className="space-y-6 border-t border-line pt-6 text-ink-soft">
              <p>
                Architecture, interaction, performance, and delivery are treated as one product
                problem—not separate handoffs.
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 font-mono text-xs text-muted-copy">
                <span>Frontend systems</span>
                <span>Product strategy</span>
                <span>AI workflows</span>
                <span>Design systems</span>
                <span>Performance</span>
                <span>Team enablement</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
