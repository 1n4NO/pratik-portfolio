"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Post } from "@/data/posts";
import { tagColorStyle } from "@/lib/tags";

const PAGE_SIZE = 2;

export function MusingsFeed({
  posts,
  intro,
  sidebarVisual,
}: {
  posts: Post[];
  intro?: ReactNode;
  sidebarVisual?: ReactNode;
}) {
  const [count, setCount] = useState(Math.min(PAGE_SIZE + 1, posts.length));
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCount((c) => Math.min(c + PAGE_SIZE, posts.length));
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [posts.length]);

  function jumpTo(slug: string) {
    const index = posts.findIndex((p) => p.slug === slug);
    if (index >= count) setCount(posts.length);

    // Wait for the newly-revealed cards to mount before scrolling.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(`post-${slug}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  const visible = posts.slice(0, count);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-14">
      <div className="space-y-14">
        {intro && <div>{intro}</div>}
        {visible.map((post) => (
          <article
            key={post.slug}
            id={`post-${post.slug}`}
            className="relative scroll-mt-24 border-t border-line pl-5 pt-8"
          >
            <span
              className="absolute left-0 top-8 bottom-0 w-1"
              style={{ backgroundColor: tagColorStyle(post.tag, 0.7) }}
              aria-hidden="true"
            />
            <div className="flex items-center gap-3 mb-3">
              {post.tag && (
                <span
                  className="font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded"
                  style={{
                    color: tagColorStyle(post.tag),
                    backgroundColor: tagColorStyle(post.tag, 0.14),
                  }}
                >
                  {post.tag}
                </span>
              )}
              <time className="font-mono text-[11px] text-ink-soft/60" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </div>
            <h2 className="font-display text-2xl font-semibold mb-3">
              <Link href={`/musings/${post.slug}`} className="hover:text-signal focus-ring rounded">
                {post.title}
              </Link>
            </h2>
            <p className="text-ink-soft leading-relaxed mb-4 max-w-2xl">{post.excerpt}</p>
            <Link
              href={`/musings/${post.slug}`}
              className="font-mono text-[12px] text-signal hover:text-signal-dark focus-ring rounded"
            >
              Read the full post →
            </Link>
          </article>
        ))}

        {count < posts.length && (
          <div ref={sentinelRef} className="py-6 text-center">
            <span className="font-mono text-[11px] text-ink-soft/50">Loading more…</span>
          </div>
        )}
      </div>

      <aside className="hidden md:block">
        <div className="sticky top-24">
          {sidebarVisual && <div className="mb-8">{sidebarVisual}</div>}
          <h2 className="font-mono text-[11px] tracking-widest uppercase text-ink-soft mb-4">
            All posts
          </h2>
          <ul className="space-y-3 border-l border-line pl-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <button
                  onClick={() => jumpTo(post.slug)}
                  className="text-left text-sm text-ink-soft hover:text-signal transition-colors focus-ring rounded"
                >
                  {post.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
