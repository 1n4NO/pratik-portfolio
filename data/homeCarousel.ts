import type { Screenshot } from "@/data/projects";

export type HomeCarouselItem = Screenshot & {
  id: string;
};

export const homeCarouselItems: HomeCarouselItem[] = [
  {
    id: "run-full-light",
    src: "/projects/home-carousel/run-full-light.png",
    alt: "Full run view showing the agent workflow in light mode",
  },
  {
    id: "login-loop-dark",
    src: "/projects/home-carousel/login-loop-dark.mp4",
    alt: "Login loop animation in dark mode",
  },
  {
    id: "modeler-right-editor",
    src: "/projects/home-carousel/modeler-right-editor.png",
    alt: "Model selection and editor panel in the right sidebar",
  },
  {
    id: "new-run-generate-light",
    src: "/projects/home-carousel/new-run-generate-light.mp4",
    alt: "Generating a new run in the light theme",
  },
  {
    id: "observability-above-fold",
    src: "/projects/home-carousel/observability-above-fold.png",
    alt: "Observability dashboard above the fold",
  },
  {
    id: "page-builder-reorder",
    src: "/projects/home-carousel/page-builder-reorder.mp4",
    alt: "Page builder rows being reordered",
  },
  {
    id: "research-full-dark",
    src: "/projects/home-carousel/research-full-dark.png",
    alt: "Research workflow view in dark mode",
  },
  {
    id: "ollama-model-selection",
    src: "/projects/home-carousel/ollama-model-selection.mp4",
    alt: "Ollama model selection screen",
  },
  {
    id: "settings-full-page",
    src: "/projects/home-carousel/settings-full-page.png",
    alt: "Settings page with the full system layout",
  },
  {
    id: "continue-ready-light",
    src: "/projects/home-carousel/continue-ready-light.png",
    alt: "Continue-ready state in light mode",
  },
  {
    id: "export-dark",
    src: "/projects/home-carousel/export-dark.png",
    alt: "Export flow in dark mode",
  },
  {
    id: "widget-top-states-dark",
    src: "/projects/home-carousel/widget-top-states-dark.png",
    alt: "Widget top states in dark mode",
  },
  {
    id: "sections-header-dark",
    src: "/projects/home-carousel/sections-header-dark.png",
    alt: "Sections header treatment in dark mode",
  },
  {
    id: "sections-impact-dark",
    src: "/projects/home-carousel/sections-impact-dark.png",
    alt: "Impact section in dark mode",
  },
  {
    id: "sections-donations-dark",
    src: "/projects/home-carousel/sections-donations-dark.png",
    alt: "Donations section in dark mode",
  },
  {
    id: "sections-cta-dark",
    src: "/projects/home-carousel/sections-cta-dark.png",
    alt: "CTA section in dark mode",
  },
  {
    id: "kpi-vote-share-dark",
    src: "/projects/home-carousel/kpi-vote-share-dark.png",
    alt: "KPI and vote share dashboard in dark mode",
  },
  {
    id: "studio-dark",
    src: "/projects/home-carousel/studio-dark.png",
    alt: "Studio view in dark mode",
  },
  {
    id: "processes-right-full",
    src: "/projects/home-carousel/processes-right-full.png",
    alt: "Processes panel aligned to the right in the full layout",
  },
  {
    id: "audit-light",
    src: "/projects/home-carousel/audit-light.png",
    alt: "Audit view in light mode",
  },
];
