import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PostBody } from "@/components/sections/PostBody";
import { PostPrevNext } from "@/components/sections/PostPrevNext";
import { ReadingProgressRuler } from "@/components/ui/ReadingProgressRuler";
import { CompactContactCTA } from "@/components/layout/CompactContactCTA";
import { posts, getPostBySlug, getAdjacentPosts } from "@/data/posts";
import { absoluteUrl, createMetadata, jsonLd, siteConfig } from "@/lib/seo";
import { tagColorStyle } from "@/lib/tags";
import { getMusingsBackground } from "@/lib/musingsBackground";

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

  const backgroundSrc = getMusingsBackground(post.slug);

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
          className="inline-flex items-center gap-1.5 font-mono text-micro text-ink-soft hover:text-signal focus-ring rounded"
        >
          <ArrowLeft size={14} className="icon-amber" aria-hidden="true" />
          All musings
        </Link>
      </Container>

      <section className="relative overflow-hidden border-b border-line">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundSrc})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20"
          aria-hidden="true"
        />
        <Container className="relative flex min-h-[300px] md:min-h-[380px] flex-col justify-end pb-10 pt-24">
          <div className="relative pl-5">
            <span
              className="absolute inset-y-1 left-0 w-1"
              style={{ backgroundColor: tagColorStyle(post.tag, 0.9) }}
              aria-hidden="true"
            />
            <div className="flex items-center gap-3 mb-4">
              {post.tag && (
                <span
                  className="font-mono text-micro uppercase tracking-caps px-2.5 py-1 rounded text-white"
                  style={{ backgroundColor: tagColorStyle(post.tag, 0.55) }}
                >
                  {post.tag}
                </span>
              )}
              <time className="font-mono text-micro text-white/70" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            <h1 className="font-display text-section-title font-medium tracking-display max-w-2xl text-white">
              {post.title}
            </h1>
          </div>
        </Container>
      </section>

      <div className="bg-dark">
        <Container className="pt-12 pb-16">
          <PostBody content={post.content} />
        </Container>

        <PostPrevNext newer={newer} older={older} />

        <CompactContactCTA />
      </div>
    </>
  );
}
