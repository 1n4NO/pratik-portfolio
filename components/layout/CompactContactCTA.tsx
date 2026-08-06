import { ArrowRight, Linkedin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { profile } from "@/data/profile";

export function CompactContactCTA() {
  return (
    <section className="border-t border-line bg-canvas text-[#161512]">
      <Container className="py-10 md:py-12">
        <div className="flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="max-w-xl font-display text-3xl font-normal md:text-5xl">
              Need a sharper frontend path?
            </h2>
            <p className="mt-3 max-w-xl text-sm text-[#53524f]">
              Architecture, AI workflows, design systems, and interfaces that need to hold up after
              launch.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
            <LinkButton
              href={`mailto:${profile.email}?subject=Frontend%20architecture%20conversation`}
              variant="primary"
              className="group"
            >
              <MessageCircle size={15} className="icon-current" aria-hidden="true" />
              Email Pratik
              <ArrowRight
                size={14}
                className="icon-current transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </LinkButton>
            <LinkButton
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="!border-[#887f77] !text-[#53524f] hover:!border-[#161512] hover:!text-[#161512]"
            >
              <Linkedin size={15} className="icon-amber" aria-hidden="true" />
              LinkedIn
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
