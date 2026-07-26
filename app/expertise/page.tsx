import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] tracking-widest uppercase text-signal mb-4">
              Expertise
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold max-w-xl">
              Twelve years, condensed.
            </h1>
          </div>
          <LinkButton href={profile.resumeUrl} download className="shrink-0">
            <Download size={14} aria-hidden="true" />
            Download résumé
          </LinkButton>
        </div>
      </Container>

      <Container className="pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
          {skillGroups.map((group) => (
            <div key={group.title} className="border-t border-line pt-5">
              <h2 className="font-display text-lg font-bold mb-1">{group.title}</h2>
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
