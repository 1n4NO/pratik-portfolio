import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PostBody } from "@/components/sections/PostBody";
import { PostPrevNext } from "@/components/sections/PostPrevNext";
import { ReadingProgressRuler } from "@/components/ui/ReadingProgressRuler";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { posts, getPostBySlug, getAdjacentPosts } from "@/data/posts";
import { absoluteUrl, createMetadata, jsonLd, siteConfig } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/musings/${post.slug}`,
    type: "article",
  });
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const { newer, older } = getAdjacentPosts(post.slug);

  const postUrl = absoluteUrl(`/musings/${post.slug}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${postUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Musings",
            item: absoluteUrl("/musings"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: postUrl,
          },
        ],
      },
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        url: postUrl,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: "en",
        keywords: post.tag,
        author: {
          "@type": "Person",
          name: "Pratik Singh",
          url: siteConfig.url,
        },
        publisher: {
          "@type": "Person",
          name: "Pratik Singh",
          url: siteConfig.url,
        },
        mainEntityOfPage: postUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(structuredData)}
      />
      <ReadingProgressRuler />
      <Container className="pt-10 pb-4">
        <Link
          href="/musings"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-soft hover:text-signal focus-ring rounded"
        >
          <ArrowLeft size={14} className="icon-amber" aria-hidden="true" />
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

      <PostPrevNext newer={newer} older={older} />

      <ContactCTA />
    </>
  );
}
