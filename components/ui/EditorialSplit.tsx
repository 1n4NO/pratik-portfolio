import { ReactNode } from "react";

// The core "editorial rhythm" primitive: an asymmetric two-column split
// where the secondary column sits offset lower than the primary one,
// separated by whitespace rather than a bordered panel. Meant to be reused
// anywhere on the site that currently uses an even, boxed two-column split.
export function EditorialSplit({
  primary,
  secondary,
}: {
  primary: ReactNode;
  secondary: ReactNode;
}) {
  return (
    <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
      <div>{primary}</div>
      <div className="md:pt-10">{secondary}</div>
    </div>
  );
}
