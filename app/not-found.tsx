import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="pt-24 pb-24 text-center">
      <p className="font-mono text-[11px] tracking-widest uppercase text-signal mb-4">404</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
        This route doesn&apos;t exist.
      </h1>
      <p className="text-ink-soft mb-8">
        Whatever you were looking for isn&apos;t here — try the homepage instead.
      </p>
      <Link
        href="/"
        className="font-mono text-[12px] text-signal hover:text-signal-dark focus-ring rounded"
      >
        Back to homepage →
      </Link>
    </Container>
  );
}
