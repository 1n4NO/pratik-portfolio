"use client";

import { useEffect, useId, useState } from "react";

export function MermaidDiagram({ chart }: { chart: string }) {
  const rawId = useId();
  const id = `mermaid-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        setError("");
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: "base",
          flowchart: {
            curve: "basis",
            nodeSpacing: 44,
            rankSpacing: 58,
          },
          themeVariables:
            theme === "light"
              ? {
                  background: "#ffffff",
                  primaryColor: "#F7F8FA",
                  primaryTextColor: "#14171F",
                  primaryBorderColor: "#D8DCE3",
                  lineColor: "#3652E0",
                  secondaryColor: "#FAEEDA",
                  tertiaryColor: "#EEF0F5",
                  fontFamily: "IBM Plex Sans, sans-serif",
                  fontSize: "16px",
                }
              : {
                  background: "#141822",
                  primaryColor: "#1B2030",
                  primaryTextColor: "#F5F7FA",
                  primaryBorderColor: "#363E4E",
                  lineColor: "#849CFF",
                  secondaryColor: "#40311C",
                  tertiaryColor: "#0A0D14",
                  fontFamily: "IBM Plex Sans, sans-serif",
                  fontSize: "16px",
                },
        });
        const result = await mermaid.render(id, chart);
        if (!cancelled) setSvg(result.svg);
      } catch (err) {
        if (!cancelled) {
          setSvg("");
          setError(err instanceof Error ? err.message : "Unable to render diagram.");
        }
      }
    }

    void renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, id, theme]);

  if (error) {
    return (
      <pre className="overflow-x-auto rounded border border-line bg-surface-muted p-4 font-mono text-[11px] leading-relaxed text-ink-soft">
        {chart}
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="min-h-[620px] rounded border border-line bg-surface-muted p-4 font-mono text-[11px] text-ink-soft">
        Rendering data flow...
      </div>
    );
  }

  return (
    <div
      className="mermaid-diagram min-h-[620px] overflow-auto rounded border border-line bg-surface-muted p-5"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
