"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import type { Project } from "@/data/projects";
import { ScreenshotTile, type ScreenshotTileItem } from "@/components/ui/ScreenshotTile";

type Direction = "vertical" | "horizontal";

const minItems = 9;

export function ScreenshotStream({
  project,
  direction = "vertical",
  priority = false,
}: {
  project: Project;
  direction?: Direction;
  priority?: boolean;
}) {
  const verticalSegmentRef = useRef<HTMLDivElement | null>(null);
  const verticalTrackRef = useRef<HTMLDivElement | null>(null);
  const hoveredRef = useRef(false);
  const [coarsePointer, setCoarsePointer] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const hintSeenRef = useRef(false);
  const items = useMemo(() => getStreamItems(project), [project]);

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarsePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (direction !== "vertical" || !verticalSegmentRef.current || !verticalTrackRef.current) return;

    const segmentEl = verticalSegmentRef.current;
    const trackEl = verticalTrackRef.current;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let frame = 0;
    let offset = 0;
    let currentSpeed = 18;
    let previous = performance.now();

    function tick(now: number) {
      const length = segmentEl.scrollHeight;
      if (length <= 0) {
        frame = window.requestAnimationFrame(tick);
        return;
      }

      const elapsed = Math.min((now - previous) / 1000, 0.05);
      previous = now;

      const targetSpeed = hoveredRef.current ? 0 : coarsePointer ? 6 : 18;
      currentSpeed += (targetSpeed - currentSpeed) * 0.08;
      offset = (offset + currentSpeed * elapsed) % length;
      trackEl.style.transform = `translate3d(0, ${-offset}px, 0)`;

      frame = window.requestAnimationFrame(tick);
    }

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [coarsePointer, direction, items.length]);

  const maskClass =
    direction === "horizontal"
      ? "[mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)]"
      : "[mask-image:linear-gradient(to_bottom,transparent,black_9%,black_91%,transparent)]";

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-line bg-surface-muted/45 ${maskClass} ${
        direction === "horizontal" ? "h-[300px] md:h-[350px]" : "h-[360px] md:h-[460px]"
      }`}
      onMouseEnter={() => {
        hoveredRef.current = true;
        if (!hintSeenRef.current && !coarsePointer) {
          hintSeenRef.current = true;
          setHintVisible(true);
          window.setTimeout(() => setHintVisible(false), 1300);
        }
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
    >
      {hintVisible && (
        <div className="pointer-events-none absolute right-3 top-3 z-20 rounded border border-line bg-paper/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-soft shadow-card backdrop-blur">
          Pause on hover
        </div>
      )}
      {direction === "horizontal" ? (
        <RecyclingHorizontalStream
          items={items}
          hoveredRef={hoveredRef}
          priority={priority}
          coarsePointer={coarsePointer}
        />
      ) : (
        <div ref={verticalTrackRef} className="will-change-transform">
          <VerticalStreamSegment
            refNode={(node) => {
              verticalSegmentRef.current = node;
            }}
            items={items}
            priority={priority}
          />
          <VerticalStreamSegment items={items} ariaHidden />
        </div>
      )}
    </div>
  );
}

function VerticalStreamSegment({
  items,
  priority = false,
  refNode,
  ariaHidden = false,
}: {
  items: ScreenshotTileItem[];
  priority?: boolean;
  refNode?: (node: HTMLDivElement | null) => void;
  ariaHidden?: boolean;
}) {
  return (
    <div
      ref={refNode}
      aria-hidden={ariaHidden}
      className="columns-2 gap-3 px-3 py-3 md:columns-3"
    >
      {items.map((item, index) => (
        <ScreenshotTile
          key={`${item.id}-${index}`}
          item={item}
          index={index}
          mode="masonry"
          priority={priority && index === 0}
        />
      ))}
    </div>
  );
}

function RecyclingHorizontalStream({
  items,
  hoveredRef,
  priority = false,
  coarsePointer,
}: {
  items: ScreenshotTileItem[];
  hoveredRef: MutableRefObject<boolean>;
  priority?: boolean;
  coarsePointer: boolean;
}) {
  const rows = useMemo(() => getHorizontalRows(items), [items]);

  return (
    <div className="flex h-full flex-col gap-3 py-4">
      {rows.map((row, rowIndex) => (
        <RecyclingRow
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          hoveredRef={hoveredRef}
          priority={priority && rowIndex === 0}
          coarsePointer={coarsePointer}
        />
      ))}
    </div>
  );
}

type MountedTile = {
  item: ScreenshotTileItem;
  sourceIndex: number;
  instanceId: number;
};

function RecyclingRow({
  row,
  rowIndex,
  hoveredRef,
  priority = false,
  coarsePointer,
}: {
  row: ScreenshotTileItem[];
  rowIndex: number;
  hoveredRef: MutableRefObject<boolean>;
  priority?: boolean;
  coarsePointer: boolean;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const speedRef = useRef(rowIndex === 0 ? 26 : 22);
  const draggingRef = useRef(false);
  const dragXRef = useRef(0);
  const nextIndexRef = useRef(0);
  const instanceIdRef = useRef(0);
  const visibleCount = Math.min(Math.max(row.length, 1), 8);
  const [mounted, setMounted] = useState<MountedTile[]>(() =>
    row.slice(0, visibleCount).map((item, sourceIndex) => ({
      item,
      sourceIndex,
      instanceId: sourceIndex,
    }))
  );

  const recycleFirstTile = useCallback(
    (firstTileWidth = 0) => {
      const sourceIndex = nextIndexRef.current % row.length;
      const item = row[sourceIndex];
      nextIndexRef.current += 1;
      instanceIdRef.current += 1;
      if (firstTileWidth > 0) {
        offsetRef.current = Math.max(0, offsetRef.current - firstTileWidth);
      }

      setMounted((current) => [
        ...current.slice(1),
        {
          item,
          sourceIndex,
          instanceId: instanceIdRef.current,
        },
      ]);
    },
    [row]
  );

  useEffect(() => {
    offsetRef.current = 0;
    speedRef.current = rowIndex === 0 ? 26 : 22;
    nextIndexRef.current = visibleCount;
    instanceIdRef.current = visibleCount;
    setMounted(
      row.slice(0, visibleCount).map((item, sourceIndex) => ({
        item,
        sourceIndex,
        instanceId: sourceIndex,
      }))
    );
  }, [row, rowIndex, visibleCount]);

  useEffect(() => {
    if (row.length === 0 || !trackRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const trackEl = trackRef.current;
    let frame = 0;
    let previous = performance.now();

    function tick(now: number) {
      const elapsed = Math.min((now - previous) / 1000, 0.05);
      previous = now;

      const baseSpeed = coarsePointer ? (rowIndex === 0 ? 7 : 6) : rowIndex === 0 ? 26 : 22;
      const targetSpeed = hoveredRef.current || draggingRef.current ? 0 : baseSpeed;
      speedRef.current += (targetSpeed - speedRef.current) * 0.08;
      offsetRef.current += speedRef.current * elapsed;

      const firstTile = trackEl.firstElementChild as HTMLElement | null;
      const firstTileWidth = firstTile ? firstTile.offsetWidth + 12 : 0;

      if (firstTileWidth > 0 && offsetRef.current >= firstTileWidth) {
        recycleFirstTile(firstTileWidth);
      }

      trackEl.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      frame = window.requestAnimationFrame(tick);
    }

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [coarsePointer, hoveredRef, recycleFirstTile, row.length, rowIndex]);

  if (row.length === 0) return null;

  return (
    <div
      className={`overflow-visible ${rowIndex === 1 ? "pl-24" : ""}`}
      onPointerDown={(event) => {
        draggingRef.current = true;
        hoveredRef.current = true;
        dragXRef.current = event.clientX;
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!draggingRef.current || !trackRef.current) return;
        const delta = event.clientX - dragXRef.current;
        dragXRef.current = event.clientX;
        offsetRef.current = Math.max(0, offsetRef.current - delta);
        const firstTile = trackRef.current.firstElementChild as HTMLElement | null;
        const firstTileWidth = firstTile ? firstTile.offsetWidth + 12 : 0;
        if (firstTileWidth > 0 && offsetRef.current >= firstTileWidth) {
          recycleFirstTile(firstTileWidth);
        }
        trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }}
      onPointerUp={(event) => {
        draggingRef.current = false;
        hoveredRef.current = false;
        event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={(event) => {
        draggingRef.current = false;
        hoveredRef.current = false;
        event.currentTarget.releasePointerCapture(event.pointerId);
      }}
    >
      <div ref={trackRef} className="flex min-w-max touch-pan-y select-none gap-3 will-change-transform">
        {mounted.map(({ item, sourceIndex, instanceId }, mountedIndex) => (
          <ScreenshotTile
            key={`${item.id}-${rowIndex}-${instanceId}`}
            item={item}
            index={sourceIndex}
            mode="rail"
            priority={priority && mountedIndex === 0}
          />
        ))}
      </div>
    </div>
  );
}

function getHorizontalRows(items: ScreenshotTileItem[]) {
  const animatedItems = items.filter(isAnimatedMedia);
  const staticItems = items.filter((item) => !isAnimatedMedia(item));

  if (animatedItems.length === 0 || staticItems.length === 0) {
    return [items.filter((_, index) => index % 2 === 0), items.filter((_, index) => index % 2 === 1)];
  }

  let animatedCursor = 0;
  let staticCursor = 0;

  function takeAnimated() {
    const item = animatedItems[animatedCursor];
    animatedCursor += 1;
    return item;
  }

  function takeStatic() {
    const item = staticItems[staticCursor];
    staticCursor += 1;
    return item;
  }

  function takePreferred(wantsAnimated: boolean) {
    if (wantsAnimated && animatedCursor < animatedItems.length) return takeAnimated();
    if (!wantsAnimated && staticCursor < staticItems.length) return takeStatic();
    if (animatedCursor < animatedItems.length) return takeAnimated();
    if (staticCursor < staticItems.length) return takeStatic();
    return null;
  }

  const rows: ScreenshotTileItem[][] = [[], []];
  let column = 0;

  while (animatedCursor < animatedItems.length || staticCursor < staticItems.length) {
    const first = takePreferred(column % 2 === 0);
    if (first) rows[0].push(first);

    const second = takePreferred(column % 2 !== 0);
    if (second) rows[1].push(second);

    column += 1;
  }

  return rows;
}

function isAnimatedMedia(item: ScreenshotTileItem) {
  return item.src ? /\.(gif|webm|mp4)$/i.test(item.src) : false;
}

function getStreamItems(project: Project): ScreenshotTileItem[] {
  const realItems: ScreenshotTileItem[] = uniqueBySrc([project.cover, ...project.screenshots]).map(
    (screenshot, index) => ({
      ...screenshot,
      id: `${project.slug}-shot-${index}`,
    })
  );

  if (realItems.length === 0) return [];

  const items = alternateMedia(realItems);
  while (items.length < minItems) {
    const source = realItems[items.length % realItems.length];
    items.push({
      ...source,
      id: `${source.id}-repeat-${items.length}`,
    });
  }

  return items;
}

function alternateMedia(items: ScreenshotTileItem[]) {
  const animatedItems = items.filter(isAnimatedMedia);
  const staticItems = items.filter((item) => !isAnimatedMedia(item));

  if (animatedItems.length === 0 || staticItems.length === 0) return [...items];

  const result: ScreenshotTileItem[] = [];
  const pairs = Math.min(animatedItems.length, staticItems.length);

  for (let index = 0; index < pairs; index += 1) {
    result.push(animatedItems[index], staticItems[index]);
  }

  return result.concat(animatedItems.slice(pairs), staticItems.slice(pairs));
}

function uniqueBySrc<T extends { src?: string }>(items: T[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (!item.src) return true;
    if (seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  });
}
