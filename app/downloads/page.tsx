import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { LinkButton } from "@/components/ui/Button";
import { IconDownloadCard } from "@/components/downloads/IconDownloadCard";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { profile } from "@/data/profile";
import { blueLotusExperienceIcons, downloadableIcons } from "@/data/downloadableIcons";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Résumé and brand-asset icons in SVG and PNG.",
};

export default function DownloadsPage() {
  return (
    <>
      <Container className="pt-16 pb-10">
        <PageIntro
          eyebrow="Downloads"
          title="Résumé and brand assets."
        >
          <p>
            Everything below is available for press, hiring, or reference. More assets will be
            added here over time.
          </p>
        </PageIntro>
      </Container>

      <Container className="pb-12">
        <div className="flex flex-col items-start gap-4 rounded-lg border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-line bg-paper text-signal">
              <FileText size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-base font-bold">Résumé</p>
              <p className="text-sm text-ink-soft">PDF · updated for {profile.role}</p>
            </div>
          </div>
          <LinkButton href={profile.resumeUrl} download>
            <Download size={14} aria-hidden="true" />
            Download résumé
          </LinkButton>
        </div>
      </Container>

      <Container className="pb-20">
        <h2 className="mb-6 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
          Icons
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {downloadableIcons.map((icon) => (
            <IconDownloadCard key={icon.id} icon={icon} />
          ))}
        </div>
      </Container>

      <Container className="pb-20">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">Blue Lotus Experience</h2>
            <p className="mt-2 max-w-xl text-sm text-ink-soft">
              Created SVG marks from the retreat experience, ready for download and reference.
            </p>
          </div>
          <LinkButton
            href="https://blue-lotus-experience.vercel.app/"
            target="_blank"
            rel="noreferrer"
            variant="secondary"
          >
            Visit site
          </LinkButton>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {blueLotusExperienceIcons.map((icon) => (
            <IconDownloadCard key={icon.id} icon={icon} />
          ))}
        </div>
      </Container>

      <ContactCTA variant="compact" />
    </>
  );
}
