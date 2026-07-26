import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Post } from "@/data/posts";

export function PostPrevNext({
  newer,
  older,
}: {
  newer: Post | null;
  older: Post | null;
}) {
  if (!newer && !older) return null;

  return (
    <nav
      aria-label="More posts"
      className="grid grid-cols-1 md:grid-cols-2 border-t border-line"
    >
      {newer ? (
        <PostLink post={newer} direction="newer" />
      ) : (
        <div className="hidden md:block" />
      )}
      {older ? (
        <PostLink post={older} direction="older" />
      ) : (
        <div className="hidden md:block" />
      )}
    </nav>
  );
}

function PostLink({ post, direction }: { post: Post; direction: "newer" | "older" }) {
  const isOlder = direction === "older";

  return (
    <Link
      href={`/musings/${post.slug}`}
      className={`group flex flex-col justify-center gap-1.5 border-line py-8 focus-ring ${
        isOlder
          ? "md:text-right md:pl-8"
          : "border-b md:border-b-0 md:border-r md:pr-8"
      }`}
    >
      <p
        className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-soft/60 ${
          isOlder ? "md:justify-end" : ""
        }`}
      >
        {!isOlder && <ArrowLeft size={11} className="icon-amber" aria-hidden="true" />}
        {isOlder ? "Older post" : "Newer post"}
        {isOlder && <ArrowRight size={11} className="icon-amber" aria-hidden="true" />}
      </p>
      <p className="font-display text-base font-bold text-ink transition-colors group-hover:text-signal">
        {post.title}
      </p>
    </Link>
  );
}
