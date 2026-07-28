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
      className="grid grid-cols-1 border-t border-panel bg-panel text-panel md:grid-cols-2"
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
      className={`group flex flex-col justify-center gap-1.5 border-panel py-8 focus-ring ${
        isOlder
          ? "md:text-right md:pl-8"
          : "border-b border-panel md:border-b-0 md:border-r md:pr-8"
      }`}
    >
        <p
          className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-panel-muted ${
            isOlder ? "md:justify-end" : ""
          }`}
        >
        {!isOlder && <ArrowLeft size={11} className="text-panel" aria-hidden="true" />}
        {isOlder ? "Older post" : "Newer post"}
        {isOlder && <ArrowRight size={11} className="text-panel" aria-hidden="true" />}
      </p>
      <p className="font-display text-base font-bold text-panel transition-colors group-hover:text-signal">
        {post.title}
      </p>
    </Link>
  );
}
