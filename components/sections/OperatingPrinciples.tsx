import { Container } from "@/components/ui/Container";
import { SectionGrid } from "@/components/ui/SectionGrid";

const operatingPrinciples = [
  {
    label: "Rendering",
    body: "Choose rendering strategy per route, not by framework default.",
  },
  {
    label: "Systems",
    body: "Design for ownership, reuse, and change over time, not just the first release.",
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
    body: "Set engineering standards that still hold after launch, when the work starts getting real.",
  },
];

export function OperatingPrinciples() {
  return (
    <section
      id="manifesto"
      aria-labelledby="principles-heading"
      className="border-y border-deep-line bg-deep py-section-sm text-muted-copy md:py-section-md"
    >
      <Container>
        <SectionGrid
          aside={
            <div>
              <h2
                id="principles-heading"
                className="font-display text-section-title font-medium tracking-display"
              >
                How I keep complex frontend work shippable.
              </h2>
            </div>
          }
          contentClassName="space-y-6"
        >
          <p className="max-w-prose text-standfirst leading-standfirst text-muted-copy">
            <span className="bg-amber text-[#1b2030]">
              The throughline across my work: make the architecture explicit, keep product
              behavior inspectable, and leave teams with systems they can keep evolving.
            </span>
          </p>

          <div className="border-y border-deep-line">
            <div className="grid gap-0">
              {operatingPrinciples.map(({ label, body }, index) => (
                <div
                  key={label}
                  className="group grid grid-cols-[4.25rem_minmax(0,1fr)] border-b border-deep-line last:border-b-0 transition-colors duration-300 hover:bg-paper/10 md:grid-cols-[5.25rem_minmax(0,1fr)]"
                >
                  <span className="flex flex-col items-center border-r border-deep-line py-5 font-mono text-[11px] text-muted-copy transition-colors group-hover:text-ink md:py-7">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <PrincipleMarker points={index + 1} />
                  </span>
                  <div className="px-5 py-5 md:px-8 md:py-7">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-signal">
                      {label}
                    </p>
                    <p className="max-w-3xl text-base leading-relaxed text-muted-copy md:text-xl">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionGrid>
      </Container>
    </section>
  );
}

function PrincipleMarker({ points }: { points: number }) {
  const baseClass =
    "mt-3 h-5 w-5 text-amber transition-transform duration-300 group-hover:scale-110";

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
