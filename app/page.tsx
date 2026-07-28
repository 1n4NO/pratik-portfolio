import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { HeroMarquee } from "@/components/sections/HeroMarquee";
import { SpecSheet } from "@/components/sections/SpecSheet";
import { ProjectRow } from "@/components/sections/ProjectRow";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionGrid } from "@/components/ui/SectionGrid";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { absoluteUrl, createMetadata, jsonLd, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  ...createMetadata({
    description: siteConfig.description,
    path: "/",
  }),
  verification: {
    google: "V3Ju8VXyJ5J5dbzwoeSk2MYeSGvsjEsk0W3lIUV5qr0",
  },
};

export default function HomePage() {
  const qualitySignals = [
    "Architecture",
    "Product thinking",
    "Execution systems",
    "AI workflows",
    "Design systems",
  ];
  const featuredProjects = projects.slice(0, 3);

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
        telephone: profile.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bangalore",
          addressCountry: "IN",
        },
        sameAs: [profile.linkedin, profile.github],
        knowsAbout: [
          "Frontend architecture",
          "React",
          "Next.js",
          "TypeScript",
          "Design systems",
          "AI-native interfaces",
          "Data visualization",
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/#profile`,
        url: siteConfig.url,
        name: siteConfig.title,
        about: { "@id": `${siteConfig.url}/#person` },
        mainEntity: { "@id": `${siteConfig.url}/#person` },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(structuredData)}
      />

      {/* Hero */}
      <section className="blueprint-surface relative overflow-hidden pt-section-sm pb-section-sm md:min-h-[640px] md:pt-section-md md:pb-section-md">
        <HeroBackdrop />
        <Container className="relative z-10">
          <SectionGrid
            wide
            aside={
              <div className="space-y-5 md:max-w-xs">
                <Eyebrow index="00" total="03">
                  {profile.name}
                </Eyebrow>
                <p className="font-mono text-caption uppercase tracking-caps text-ink-soft/70">
                  {profile.role}
                </p>
                <p className="font-mono text-micro uppercase tracking-caps text-ink-soft/50">
                  {profile.yearsExperience} years · {profile.location}
                </p>
              </div>
            }
            contentClassName="max-w-prose-wide"
          >
            <h1 className="font-display text-hero font-medium tracking-display">
              {profile.tagline}
            </h1>
            <p className="mt-8 max-w-prose text-standfirst leading-standfirst text-ink-soft">
              {profile.short}
            </p>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#work"
                className="inline-flex items-center justify-center gap-2 rounded border border-signal bg-signal px-6 py-3.5 font-mono text-caption uppercase tracking-caps text-paper transition-colors hover:bg-signal-dark focus-ring"
              >
                View selected work
                <ArrowDown size={14} className="icon-current" aria-hidden="true" />
              </Link>
              <Link
                href={`mailto:${profile.email}?subject=Portfolio%20conversation`}
                className="inline-flex items-center justify-center gap-2 rounded border border-line-strong px-6 py-3.5 font-mono text-caption uppercase tracking-caps text-ink transition-colors hover:border-ink focus-ring"
              >
                Start a conversation
                <ArrowUpRight size={14} className="icon-amber" aria-hidden="true" />
              </Link>
            </div>
          </SectionGrid>
        </Container>
      </section>

      {/* Marquee strip */}
      <div className="relative z-20 -mt-8 border-y border-line/45 bg-paper/10 py-4 backdrop-blur-md md:-mt-12">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent md:w-24"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent md:w-24"
          aria-hidden="true"
        />
        <div className="[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <HeroMarquee />
        </div>
      </div>

      {/* Profile */}
      <section className="border-y border-line bg-surface py-section-sm md:py-section-md">
        <Container>
          <SectionGrid
            stickyAside
            aside={
              <div className="space-y-8">
                <div>
                  <Eyebrow index="01" total="03">
                    Profile
                  </Eyebrow>
                  <h2 className="font-display text-section-title font-medium tracking-display">
                    System context
                  </h2>
                </div>
                <SpecSheet />
              </div>
            }
            contentClassName="space-y-6"
          >
            {profile.long.map((para, i) => (
              <p key={i} className="max-w-prose-wide text-body leading-body text-ink-soft">
                {para}
              </p>
            ))}
          </SectionGrid>
        </Container>
      </section>

      {/* Selected work */}
      <section id="work" aria-labelledby="work-heading" className="pb-section-sm md:pb-section-md">
        <Container className="pt-section-sm md:pt-section-md">
          <SectionGrid
            aside={
              <div>
                <Eyebrow index="02" total="03">
                  Selected work
                </Eyebrow>
                <h2
                  id="work-heading"
                  className="font-display text-section-title font-medium tracking-display"
                >
                  Case studies with architectural proof
                </h2>
              </div>
            }
            contentClassName="space-y-6"
          >
            <p className="max-w-prose text-standfirst leading-standfirst text-ink-soft">
              Products where rendering strategy, system boundaries, and team velocity were the
              primary design decisions — not afterthoughts.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 border-y border-line py-5">
              {qualitySignals.map((signal) => (
                <span
                  key={signal}
                  className="font-mono text-micro uppercase tracking-caps text-ink-soft/60"
                >
                  {signal}
                </span>
              ))}
            </div>
          </SectionGrid>
        </Container>

        {featuredProjects.map((project, i) => (
          <ProjectRow
            key={project.slug}
            project={project}
            reversed={i % 2 === 1}
            index={i + 1}
            total={featuredProjects.length}
          />
        ))}

        <Container className="border-t border-line pt-10">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded font-mono text-caption uppercase tracking-caps text-signal hover:text-signal-dark focus-ring"
          >
            View all work
            <ArrowUpRight
              size={14}
              className="icon-amber transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
