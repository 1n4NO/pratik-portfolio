import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import type { Screenshot } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

export const runtime = "edge";
export const alt = "Project case study preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectOpenGraphImage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const screenshot = getStaticScreenshot(project.cover, project.screenshots);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background: "#05080d",
          color: "#f7f8fa",
          fontFamily: "Arial, Helvetica, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(132,156,255,0.18), rgba(246,190,110,0.1) 42%, rgba(5,8,13,0.96))",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 54,
            width: "100%",
            padding: "64px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: 470,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "flex-start",
                border: "1px solid rgba(132,156,255,0.42)",
                background: "rgba(132,156,255,0.12)",
                color: "#aebdff",
                borderRadius: 8,
                padding: "10px 14px",
                fontSize: 22,
                letterSpacing: 1.2,
                textTransform: "uppercase",
              }}
            >
              {project.industry}
            </div>
            <h1
              style={{
                margin: "28px 0 18px",
                fontSize: project.name.length > 22 ? 68 : 78,
                lineHeight: 0.95,
                letterSpacing: -1,
                fontWeight: 800,
              }}
            >
              {project.name}
            </h1>
            <p
              style={{
                margin: 0,
                color: "#b0b9c9",
                fontSize: 30,
                lineHeight: 1.25,
              }}
            >
              {truncate(project.tagline, 86)}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 46,
                color: "#f6be6e",
                fontSize: 24,
                letterSpacing: 0.8,
              }}
            >
              <span
                style={{
                  display: "flex",
                  height: 10,
                  width: 10,
                  borderRadius: 999,
                  background: "#f6be6e",
                }}
              />
              Case study by Pratik Singh
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 560,
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: 18,
              overflow: "hidden",
              background: "#141822",
              boxShadow: "0 34px 90px rgba(0,0,0,0.45)",
              transform: "rotate(1.2deg)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                height: 42,
                padding: "0 18px",
                borderBottom: "1px solid rgba(255,255,255,0.12)",
                background: "#1b2030",
              }}
            >
              <span style={dotStyle} />
              <span style={dotStyle} />
              <span style={dotStyle} />
            </div>
            <img
              src={absoluteUrl(screenshot.src)}
              alt={screenshot.alt}
              style={{
                width: "100%",
                height: 354,
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </div>
        </div>
      </div>
    ),
    size
  );
}

const dotStyle = {
  display: "flex",
  height: 11,
  width: 11,
  borderRadius: 999,
  background: "rgba(247,248,250,0.38)",
};

function getStaticScreenshot(cover: Screenshot, screenshots: Screenshot[]) {
  return [cover, ...screenshots].find((item) => !isVideo(item.src)) ?? cover;
}

function isVideo(src: string) {
  return /\.(webm|mp4)$/i.test(src);
}

function truncate(value: string, maxLength: number) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}...` : value;
}
