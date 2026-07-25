import { HeroMarquee } from "@/components/sections/HeroMarquee";
import { SpecSheet } from "@/components/sections/SpecSheet";
import { ProjectRow } from "@/components/sections/ProjectRow";
import { RulerDivider } from "@/components/ui/RulerDivider";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

export default function HomePage() {
  return (
    <>
      <section className="pt-14 md:pt-20 grid-backdrop">
        <Container>
          <p className="font-mono text-[11px] tracking-widest uppercase text-signal mb-4">
            {profile.role} — {profile.yearsExperience} yrs
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.1] max-w-2xl mb-6">
            {profile.tagline}
          </h1>
          <p className="text-ink-soft max-w-md mb-10">{profile.short}</p>
        </Container>
        <HeroMarquee />
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

      <section id="work" aria-labelledby="work-heading">
        <Container className="pt-14 md:pt-20">
          <h2 id="work-heading" className="font-mono text-[11px] tracking-widest uppercase text-ink-soft">
            Selected work
          </h2>
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
