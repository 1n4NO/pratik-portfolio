import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { HeroMarquee } from "@/components/sections/HeroMarquee";
import { SpecSheet } from "@/components/sections/SpecSheet";
import { ProjectRow } from "@/components/sections/ProjectRow";
import { RulerDivider } from "@/components/ui/RulerDivider";
import { EditorialSplit } from "@/components/ui/EditorialSplit";
import { EditorialRule } from "@/components/ui/EditorialRule";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { Container } from "@/components/ui/Container";
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
      <section className="relative overflow-hidden pt-14 pb-24 md:min-h-[572px] md:pt-20 md:pb-28">
        <HeroBackdrop />
        <Container className="relative z-10">
          <div>
            <p className="font-mono text-[11px] tracking-widest uppercase text-signal mb-4">
              {profile.name} — {profile.role} — {profile.yearsExperience} yrs
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.1] max-w-3xl mb-6">
              {profile.tagline}
            </h1>
            <EditorialRule className="mb-6" />
            <p className="text-ink-soft max-w-md mb-10">{profile.short}</p>
            <div className="mb-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#work"
                className="inline-flex items-center justify-center gap-2 rounded border border-signal bg-signal px-5 py-3 font-mono text-[12px] tracking-wide text-paper transition-colors hover:bg-signal-dark focus-ring"
              >
                View selected work
                <ArrowDown size={14} className="icon-current" aria-hidden="true" />
              </Link>
              <Link
                href={`mailto:${profile.email}?subject=Portfolio%20conversation`}
                className="inline-flex items-center justify-center gap-2 rounded border border-line-strong px-5 py-3 font-mono text-[12px] tracking-wide text-ink transition-colors hover:border-ink focus-ring"
              >
                Start a conversation
                <ArrowUpRight size={14} className="icon-amber" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <div className="relative z-20 -mt-14 border-y border-line/45 bg-paper/10 py-3 backdrop-blur-md md:-mt-16">
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

      <section className="border-t border-line">
        <Container className="py-16 md:py-20">
          <EditorialSplit
            primary={
              <div className="space-y-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-signal mb-2">
                  Profile
                </p>
                {profile.long.map((para, i) => (
                  <p key={i} className="text-ink-soft leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            }
            secondary={<SpecSheet />}
          />
        </Container>
      </section>

      <section id="work" aria-labelledby="work-heading">
        <Container className="pt-14 md:pt-20">
          <h2 id="work-heading" className="font-mono text-[11px] tracking-widest uppercase text-ink-soft mb-4">
            Selected work
          </h2>
          <p className="max-w-2xl font-mono text-[11px] uppercase tracking-wide text-ink-soft/60 border-t border-line pt-4">
            {qualitySignals.join("   ·   ")}
          </p>
        </Container>

        {featuredProjects.map((project, i) => (
          <div key={project.slug}>
            <ProjectRow project={project} reversed={i % 2 === 1} />
            {i < featuredProjects.length - 1 && (
              <RulerDivider index={i + 1} total={featuredProjects.length} />
            )}
          </div>
        ))}

        <Container className="pb-20 pt-4">
          <div className="border-t border-line pt-8">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded font-mono text-[12px] uppercase tracking-widest text-signal hover:text-signal-dark focus-ring"
            >
              View all work
              <ArrowUpRight
                size={14}
                className="icon-amber transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
