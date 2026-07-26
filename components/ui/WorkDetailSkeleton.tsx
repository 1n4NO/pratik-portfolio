import { Container } from "@/components/ui/Container";

const ticks = 64;
const railTiles = [260, 340, 300, 390, 260, 340];
const masonryHeights = [260, 340, 300, 420, 280, 360];

export function WorkDetailSkeleton() {
  return (
    <>
      <div
        aria-hidden="true"
        className="sticky top-0 z-30 flex h-2 w-full items-end gap-[2px] border-b border-line bg-paper/90 backdrop-blur-sm md:top-16"
      >
        {Array.from({ length: ticks }).map((_, i) => (
          <span
            key={i}
            className="flex-1 bg-line-strong/50"
            style={{ height: i % 4 === 0 ? "8px" : "4px" }}
          />
        ))}
      </div>

      <Container className="pt-10 pb-4">
        <div className="h-3 w-20 rounded bg-line-strong/50" />
      </Container>

      <Container className="pb-10">
        <div className="h-6 w-40 rounded bg-amber-bg" />
        <div className="mt-5 h-12 max-w-xl rounded bg-line-strong/45" />
        <div className="mt-3 h-6 max-w-lg rounded bg-line-strong/30" />
        <div className="mt-6 flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-7 w-24 rounded bg-surface-muted" />
          ))}
        </div>
      </Container>

      <Container className="pb-16">
        <div className="relative h-[300px] overflow-hidden rounded-lg border border-line bg-surface-muted/45 md:h-[350px]">
          <div className="space-y-3 py-4">
            {[0, 1].map((row) => (
              <div key={row} className={`flex gap-3 ${row === 1 ? "pl-24" : ""}`}>
                {railTiles.map((width, index) => (
                  <div
                    key={`${row}-${index}`}
                    className="shrink-0 overflow-hidden rounded-lg border border-line bg-surface"
                    style={{ width }}
                  >
                    <div className="h-[96px] animate-pulse bg-line-strong/35 md:h-[126px]" />
                    <div className="border-t border-line px-3 py-2">
                      <div className="h-2 w-28 rounded bg-line-strong/40" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container className="pb-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <aside className="space-y-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <div className="mb-2 h-2 w-20 rounded bg-line-strong/30" />
                <div className="h-3 w-32 rounded bg-line-strong/45" />
              </div>
            ))}
          </aside>

          <div className="space-y-12 md:col-span-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <section key={index}>
                <div className="mb-4 h-7 w-36 rounded bg-line-strong/40" />
                <div className="space-y-3">
                  <div className="h-4 max-w-2xl rounded bg-line-strong/30" />
                  <div className="h-4 max-w-xl rounded bg-line-strong/25" />
                  <div className="h-4 max-w-lg rounded bg-line-strong/20" />
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>

      <Container className="pb-20">
        <div className="mb-8 h-3 w-44 rounded bg-line-strong/35" />
        <div className="columns-1 gap-4 md:columns-2 xl:columns-3">
          {masonryHeights.map((height, index) => (
            <div
              key={index}
              className="mb-3 break-inside-avoid overflow-hidden rounded-lg border border-line bg-surface"
            >
              <div className="animate-pulse bg-line-strong/30" style={{ height }} />
              <div className="border-t border-line px-3 py-2">
                <div className="h-2 w-28 rounded bg-line-strong/40" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
