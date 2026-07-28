import type { Metadata } from "next";
import { profile } from "@/data/profile";

const fallbackUrl = "http://localhost:3000";

function normalizeUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  name: `${profile.name} Portfolio`,
  title: `${profile.name} | Frontend Architect | UX, AI, Design Systems`,
  description:
    "Portfolio of Pratik Singh, a Frontend Architect building product interfaces, AI-enabled systems, design systems, and data-heavy web apps.",
  url: normalizeUrl(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : fallbackUrl)
  ),
};

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}

export function pageTitle(title?: string) {
  return title ? `${title} | ${profile.name}` : siteConfig.title;
}

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  type = "website",
  image,
}: {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
} = {}): Metadata {
  const canonical = absoluteUrl(path);
  const resolvedTitle = pageTitle(title);

  return {
    title: resolvedTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type,
      images: image
        ? [
            {
              url: absoluteUrl(image),
              alt: title ?? siteConfig.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: resolvedTitle,
      description,
      images: image ? [absoluteUrl(image)] : undefined,
    },
  };
}

export function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
