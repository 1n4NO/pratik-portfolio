import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

export function HeroIdentityStrip() {
  return (
    <div className="relative z-20 -mb-6 border-y border-line/70 bg-[rgb(10_14_20_/_0.22)] backdrop-blur-xl md:-mb-8">
      <Container>
        <div className="flex h-16 items-center md:h-18">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap font-mono text-caption uppercase tracking-caps text-[#f7f7f7]">
            <span>{profile.name}</span>
            <span className="mx-3 text-[#f7f7f7]/45">·</span>
            <span>{profile.role}</span>
            <span className="mx-3 text-[#f7f7f7]/45">·</span>
            <span>
              {profile.yearsExperience} years · {profile.location}
            </span>
          </p>
        </div>
      </Container>
    </div>
  );
}
