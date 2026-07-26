import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { PageIntro } from "@/components/ui/PageIntro";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { skillGroups, industries, profile } from "@/data/profile";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Expertise",
    description:
      "Frontend architecture, React, Next.js, TypeScript, design systems, AI integration, data visualization, security, and engineering leadership expertise.",
    path: "/expertise",
  }),
};

export default function ExpertisePage() {
  return (
    <>
      <Container className="pt-16 pb-10">
        <PageIntro
          eyebrow="Expertise"
          title="Twelve years, condensed."
          action={(
            <LinkButton href={profile.resumeUrl} download>
            <Download size={14} className="icon-current" aria-hidden="true" />
            Download résumé
            </LinkButton>
          )}
        />
      </Container>

      <Container className="pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
          {skillGroups.map((group) => (
            <div key={group.title} className="border-t border-line pt-5">
              <h2 className="mb-1 flex items-center gap-2 font-display text-lg font-bold">
                <ExpertiseTitleIcon title={group.title} />
                {group.title}
              </h2>
              <p className="text-sm text-ink-soft mb-4">{group.blurb}</p>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[11px] bg-surface-muted text-ink-soft px-2.5 py-1 rounded"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <Container className="pb-20">
        <div className="border-t border-line pt-8">
          <h2 className="font-mono text-[11px] tracking-widest uppercase text-ink-soft mb-5">
            Industry expertise
          </h2>
          <ul className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <li key={industry} className="font-mono text-[11px] text-amber bg-amber-bg px-2.5 py-1 rounded">
                {industry}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <ContactCTA />
    </>
  );
}

function ExpertiseTitleIcon({ title }: { title: string }) {
  const commonProps = {
    className: "h-5 w-5 shrink-0 text-amber",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (title === "Leadership") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M15.2 8.8L13.2 13.2L8.8 15.2L10.8 10.8L15.2 8.8Z" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (title === "Frontend") {
    return (
      <svg {...commonProps}>
        <rect x="3.5" y="5" width="17" height="14" rx="2" />
        <path d="M3.5 9H20.5" />
        <path d="M16.2 13.4H18.8V16" />
        <circle cx="7" cy="7" r="0.7" fill="currentColor" stroke="none" />
        <circle cx="9.4" cy="7" r="0.7" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (title === "State & data") {
    return (
      <svg {...commonProps}>
        <circle cx="6.5" cy="7" r="2.3" />
        <circle cx="17.5" cy="7" r="2.3" />
        <circle cx="12" cy="17" r="2.3" />
        <path d="M8.7 7H15.3" />
        <path d="M7.6 9L10.9 15" />
        <path d="M16.4 9L13.1 15" />
      </svg>
    );
  }

  if (title === "AI integration") {
    return (
      <svg {...commonProps}>
        <path d="M12 3.8L19.1 7.9V16.1L12 20.2L4.9 16.1V7.9L12 3.8Z" />
        <path d="M12 8.2V15.8" />
        <path d="M8.2 12H15.8" />
        <path d="M9.3 9.3L14.7 14.7" />
        <path d="M14.7 9.3L9.3 14.7" />
      </svg>
    );
  }

  if (title === "Data visualization") {
    return (
      <svg {...commonProps}>
        <path d="M5 18V13" />
        <path d="M10 18V9" />
        <path d="M15 18V11" />
        <path d="M20 18V6" />
        <path d="M5 6.5L10 9L15 7.4L20 4.8" />
        <circle cx="15" cy="7.4" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (title === "Quality & security") {
    return (
      <svg {...commonProps}>
        <path d="M12 3.8L18.5 6.2V11.4C18.5 15.5 15.9 18.7 12 20.2C8.1 18.7 5.5 15.5 5.5 11.4V6.2L12 3.8Z" />
        <path d="M9.1 12.1L11.1 14.1L15.2 9.8" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M8.2 17.5H17.2A3.3 3.3 0 0 0 17 10.9A5.1 5.1 0 0 0 7.2 9.2A4.2 4.2 0 0 0 8.2 17.5Z" />
      <path d="M12 13V21" />
      <path d="M8.8 17.8L12 21L15.2 17.8" />
      <circle cx="12" cy="13" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
