import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
// @ts-ignore: CSS module declarations may be missing for side-effect import
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { PageTransition } from "@/components/layout/PageTransition";
import { createMetadata, siteConfig } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next"

const display = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  ...createMetadata(),
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  creator: "Pratik Singh",
  publisher: "Pratik Singh",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                document.documentElement.dataset.theme = "dark";
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased flex min-h-screen flex-col">
        <Header />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
