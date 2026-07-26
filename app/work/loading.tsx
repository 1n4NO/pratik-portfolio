import { Container } from "@/components/ui/Container";

export default function LoadingWork() {
  return (
    <>
      <Container className="pt-16 pb-6">
        <div className="mb-5 h-3 w-16 rounded bg-signal/40" />
        <div className="h-12 max-w-xl rounded bg-line-strong/35" />
      </Container>

      <Container className="pt-6 pb-10">
        <div className="h-[520px] animate-pulse rounded-lg border border-line bg-surface-muted md:h-[620px]" />
      </Container>

      <Container className="pb-24">
        <div className="mb-5 h-3 w-28 rounded bg-line-strong/35" />
        <div className="grid grid-cols-1 gap-x-8 gap-y-3 border-t border-line pt-5 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-4 w-36 rounded bg-line-strong/30" />
          ))}
        </div>
      </Container>
    </>
  );
}
