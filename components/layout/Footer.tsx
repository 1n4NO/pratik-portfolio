import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper text-ink">
      <Container className="py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <p className="font-display text-[clamp(3.2rem,10vw,9rem)]">1N4N0</p>
          <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm text-ink-soft md:text-right">
            <Link href="/work" className="hover:text-ink">Work</Link>
            <Link href="/expertise" className="hover:text-ink">Expertise</Link>
            <Link href="/musings" className="hover:text-ink">Musings</Link>
            <Link href="/downloads" className="hover:text-ink">Downloads</Link>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">LinkedIn</a>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-5 font-mono text-[11px] text-muted-copy sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Bangalore, India</span>
        </div>
      </Container>
    </footer>
  );
}
