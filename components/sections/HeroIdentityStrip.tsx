import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

export function HeroIdentityStrip() {
  return (
    <div className="border-b border-line bg-paper text-ink">
      <Container>
        <div className="flex min-h-12 items-center justify-between gap-4 py-3 font-mono text-[11px] text-muted-copy">
          <span>{profile.name}</span>
          <span className="hidden text-center sm:block">{profile.role}</span>
          <span>{profile.yearsExperience} years in product</span>
        </div>
      </Container>
    </div>
  );
}
