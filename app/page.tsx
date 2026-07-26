import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { HeroMarquee } from "@/components/sections/HeroMarquee";
import { HeroSystemMap } from "@/components/sections/HeroSystemMap";
import { SpecSheet } from "@/components/sections/SpecSheet";
import { ProjectRow } from "@/components/sections/ProjectRow";
import { RulerDivider } from "@/components/ui/RulerDivider";
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
  const operatingPrinciples = [
    {
      label: "Rendering",
      body: "Choose rendering strategy per route, not by framework default.",
    },
    {
      label: "Systems",
      body: "Design for ownership, reuse, and change.",
    },
    {
      label: "AI quality",
      body: "Treat AI-generated output as something to verify, not just display.",
    },
    {
      label: "Clarity",
      body: "Expose system state in the interface instead of hiding complexity.",
    },
    {
      label: "Standards",
      body: "Set engineering standards that still hold after launch.",
    },
  ];

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
      <section className="relative overflow-hidden pt-14 md:pt-20">
        <HeroBackdrop />
        <Container className="relative z-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.42fr)_minmax(300px,0.58fr)] lg:items-start">
            <div>
              <p className="font-mono text-[11px] tracking-widest uppercase text-signal mb-4">
                {profile.name} — {profile.role} — {profile.yearsExperience} yrs
              </p>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.1] max-w-3xl mb-6">
                {profile.tagline}
              </h1>
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
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded border border-line-strong px-5 py-3 font-mono text-[12px] tracking-wide text-ink transition-colors hover:border-ink focus-ring"
                >
                  Start a conversation
                  <ArrowUpRight size={14} className="icon-amber" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="-mt-[44px] lg:-mt-[60px]">
              <HeroSystemMap />
            </div>
          </div>
        </Container>
        <div className="relative z-10 mt-8 md:mt-10">
          <HeroMarquee />
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <Container className="py-14 md:py-16 flex flex-col md:flex-row gap-10 md:gap-16">
          <div className="flex-1 space-y-4">
            {profile.long.map((para, i) => (
              <p key={i} className="text-ink-soft leading-relaxed">
                {para}
              </p>
            ))}
          </div>
          <SpecSheet />
        </Container>
      </section>

      <section
        aria-labelledby="principles-heading"
        className="relative overflow-hidden border-b border-line bg-surface"
      >
        <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-35" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal to-transparent"
          aria-hidden="true"
        />
        <Container className="relative py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] md:items-start">
            <div className="md:sticky md:top-24">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-signal">
                Operating principles
              </p>
              <h2
                id="principles-heading"
                className="max-w-md font-display text-4xl font-bold leading-[1.05] md:text-5xl"
              >
                How I keep complex frontend work shippable.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft">
                The throughline across my work: make the architecture explicit, keep product
                behavior inspectable, and leave teams with systems they can keep evolving.
              </p>
              <div
                className="mt-8 hidden max-w-[15rem] border-y border-line py-4 font-mono text-[11px] uppercase tracking-widest text-ink-soft md:block"
                aria-hidden="true"
              >
                <div className="flex items-center justify-between">
                  <span>Principles</span>
                  <span className="text-signal">05</span>
                </div>
              </div>
            </div>

            <ol className="grid gap-3">
              {operatingPrinciples.map(({ label, body }, index) => (
                <li
                  key={label}
                  className="group relative overflow-hidden rounded border border-line bg-paper/70 shadow-card backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/70"
                >
                  <div
                    className="absolute inset-y-0 left-0 w-1 bg-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <div className="grid grid-cols-[4.25rem_minmax(0,1fr)] md:grid-cols-[5.25rem_minmax(0,1fr)]">
                    <span className="flex flex-col items-center border-r border-line py-5 font-mono text-[11px] text-ink-soft/60 transition-colors group-hover:text-signal md:py-6">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <PrincipleMarker points={index + 1} />
                    </span>
                    <div className="px-5 py-5 md:px-7 md:py-6">
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-amber">
                        {label}
                      </p>
                      <p className="max-w-2xl text-base leading-relaxed text-ink md:text-lg">
                        {body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section id="work" aria-labelledby="work-heading">
        <Container className="pt-14 md:pt-20">
          <h2 id="work-heading" className="font-mono text-[11px] tracking-widest uppercase text-ink-soft">
            Selected work
          </h2>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-y border-line py-4">
            {qualitySignals.map((signal) => (
              <span
                key={signal}
                className="font-mono text-[11px] uppercase tracking-widest text-ink-soft"
              >
                {signal}
              </span>
            ))}
          </div>
        </Container>

        {projects.map((project, i) => (
          <div key={project.slug}>
            <ProjectRow project={project} reversed={i % 2 === 1} />
            {i < projects.length - 1 && (
              <RulerDivider index={i + 1} total={projects.length} />
            )}
          </div>
        ))}
      </section>

      <ContactCTA />
    </>
  );
}

function PrincipleMarker({ points }: { points: number }) {
  const baseClass = "mt-3 h-5 w-5 text-amber transition-transform duration-300 group-hover:scale-110";

  if (points === 1) {
    return (
      <svg className={baseClass} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    );
  }

  if (points === 2) {
    return (
      <svg className={baseClass} viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6 12H18"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <circle cx="6" cy="12" r="2" fill="currentColor" />
        <circle cx="18" cy="12" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (points === 3) {
    return (
      <svg className={baseClass} viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 4.5L20 18.5H4L12 4.5Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <circle cx="12" cy="4.5" r="1.8" fill="currentColor" />
        <circle cx="20" cy="18.5" r="1.8" fill="currentColor" />
        <circle cx="4" cy="18.5" r="1.8" fill="currentColor" />
      </svg>
    );
  }

  if (points === 4) {
    return (
      <svg className={baseClass} viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3.8L20.2 12L12 20.2L3.8 12L12 3.8Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <circle cx="12" cy="3.8" r="1.8" fill="currentColor" />
        <circle cx="20.2" cy="12" r="1.8" fill="currentColor" />
        <circle cx="12" cy="20.2" r="1.8" fill="currentColor" />
        <circle cx="3.8" cy="12" r="1.8" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg className={baseClass} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.5L20.1 9.4L17 19H7L3.9 9.4L12 3.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <circle cx="12" cy="3.5" r="1.55" fill="currentColor" />
      <circle cx="20.1" cy="9.4" r="1.55" fill="currentColor" />
      <circle cx="17" cy="19" r="1.55" fill="currentColor" />
      <circle cx="7" cy="19" r="1.55" fill="currentColor" />
      <circle cx="3.9" cy="9.4" r="1.55" fill="currentColor" />
    </svg>
  );
}
