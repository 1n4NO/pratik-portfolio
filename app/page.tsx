import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { HeroIdentityStrip } from "@/components/sections/HeroIdentityStrip";
import { HeroMarquee } from "@/components/sections/HeroMarquee";
import { SpecSheet } from "@/components/sections/SpecSheet";
import { ProjectRow } from "@/components/sections/ProjectRow";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { UpcomingProjectSection } from "@/components/sections/UpcomingProjectSection";
import { Container } from "@/components/ui/Container";
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
    "Product sense",
    "Delivery systems",
    "AI work",
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
          "AI-enabled interfaces",
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
      <HeroIdentityStrip />
      <HeroSection />

      {/* Marquee strip */}
      <div className="relative z-20 -mt-8 border-y border-deep-line/45 bg-deep py-4 md:-mt-12">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-deep to-transparent md:w-24"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-deep to-transparent md:w-24"
          aria-hidden="true"
        />
        <div className="[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <HeroMarquee />
        </div>
      </div>

      {/* Profile */}
      <section
        className="border-y border-deep-line bg-deep py-section-sm text-muted-copy md:py-section-md"
      >
        <Container>
          <SectionGrid
            stickyAside
            aside={
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-section-title font-medium tracking-display">
                    What I bring to the work
                  </h2>
                </div>
                <SpecSheet />
              </div>
            }
            contentClassName="space-y-6"
          >
            {profile.long.map((para, i) => (
              <p key={i} className="max-w-prose-wide text-body leading-body">
                {para}
              </p>
            ))}
          </SectionGrid>
        </Container>
      </section>

      {/* Selected work */}
      <section
        id="work"
        aria-labelledby="work-heading"
        className="bg-dark pb-section-sm md:pb-section-md"
      >
        <Container className="pt-section-sm md:pt-section-md">
          <SectionGrid
            aside={
              <div>
                <h2
                  id="work-heading"
                  className="font-display text-section-title font-medium tracking-display"
                >
                  Case studies with clear tradeoffs
                </h2>
              </div>
            }
            contentClassName="space-y-6"
          >
            <p className="max-w-prose text-standfirst leading-standfirst text-ink-soft">
              Products where rendering choices, system boundaries, and team habits were part of
              the design from the start.
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
            mediaTheme="light"
          />
        ))}

        <UpcomingProjectSection />
      </section>

      <ContactCTA />
    </>
  );
}
