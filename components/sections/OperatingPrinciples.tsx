import { Container } from "@/components/ui/Container";

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

export function OperatingPrinciples() {
  return (
    <section
      aria-labelledby="principles-heading"
      className="relative overflow-hidden border-b border-line bg-surface"
    >
      <div className="pointer-events-none absolute inset-0 dotted-backdrop opacity-45" aria-hidden="true" />
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

          <ol className="border-y border-line bg-paper/35 backdrop-blur-sm">
            {operatingPrinciples.map(({ label, body }, index) => (
              <li
                key={label}
                className="group relative border-b border-line last:border-b-0"
              >
                <div
                  className="absolute inset-y-0 left-0 w-px bg-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-[4.25rem_minmax(0,1fr)] transition-colors duration-300 group-hover:bg-surface/45 md:grid-cols-[5.25rem_minmax(0,1fr)]">
                  <span className="flex flex-col items-center border-r border-line py-5 font-mono text-[11px] text-ink-soft/60 transition-colors group-hover:text-signal md:py-7">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <PrincipleMarker points={index + 1} />
                  </span>
                  <div className="px-5 py-5 md:px-8 md:py-7">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-amber">
                      {label}
                    </p>
                    <p className="max-w-3xl text-base leading-relaxed text-ink md:text-xl">
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
