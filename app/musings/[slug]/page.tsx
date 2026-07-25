import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PostBody } from "@/components/sections/PostBody";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { posts, getPostBySlug } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <Container className="pt-10 pb-4">
        <Link
          href="/musings"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-soft hover:text-signal focus-ring rounded"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          All musings
        </Link>
      </Container>

      <Container className="pb-16">
        <div className="flex items-center gap-3 mb-4">
          {post.tag && (
            <span className="font-mono text-[10px] uppercase tracking-wide text-amber bg-amber-bg px-2 py-0.5 rounded">
              {post.tag}
            </span>
          )}
          <time className="font-mono text-[11px] text-ink-soft/60" dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold max-w-2xl mb-8">
          {post.title}
        </h1>
        <PostBody content={post.content} />
      </Container>

      <ContactCTA />
    </>
  );
}
