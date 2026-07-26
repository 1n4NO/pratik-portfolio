// This is the single place to add, remove, or edit a project.
// To add a project: copy an object below, give it a unique `slug`, fill in the
// fields, and drop screenshots into /public/projects/<slug>/.
// To remove one: delete its object. Nothing else needs to change —
// the homepage, /work grid, and each project's detail page all read from this file.

export type Screenshot = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  impact: string;
  role: string;
  scope: string;
  constraint: string;
  technicalBet: string;
  industry: string;
  liveUrl: string;
  githubUrl?: string;
  techStack: string[];
  externalSystems?: string[];
  detailedProcess: {
    label: string;
    body: string;
  }[];
  dataFlowDiagram: string;
  cover: Screenshot;
  screenshots: Screenshot[];
  overview: string;
  problem: string;
  approach: string;
  solution: string;
  highlights: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "multi-agent-ai-system",
    name: "Multi-Agent AI System",
    tagline: "A team of AIs, thinking together.",
    impact: "Turned opaque AI research into an inspectable agent workflow with live execution state, manual checkpoints, reruns, citations, and exportable reports.",
    role: "Frontend architecture, agent workflow design, product UI, and local inference integration",
    scope: "Goal intake, planner review, researcher orchestration, live graph state, critic loop, and final report export",
    constraint: "The system had to feel transparent and useful while running entirely on local LLM infrastructure.",
    technicalBet: "A streamed, checkpointed agent graph would build more trust than a conventional chat interface.",
    industry: "AI Agent Systems",
    liveUrl: "https://multi-agent-ai-landing.vercel.app/",
    githubUrl: "https://github.com/1n4NO/multi-agent-ai-system",
    techStack: [
      "Next.js (App Router)",
      "TypeScript",
      "Material UI",
      "React Flow",
      "Server-Sent Events",
      "Ollama (local LLM)",
    ],
    externalSystems: [
      "Ollama for local LLM inference",
      "Server-Sent Events for live pipeline updates",
      "Local research/runtime services",
    ],
    detailedProcess: [
      {
        label: "Requirements",
        body: "The starting requirement was not another chat interface; it was a transparent research workflow where a user could see how an answer was being planned, grounded, rewritten, and critiqued. That pushed the scope toward inspectable stages, manual checkpoints, rerun states, and citations rather than a single prompt-response screen.",
      },
      {
        label: "Stack choices",
        body: "Next.js App Router handled the product shell and streaming API routes, React Flow made the agent graph legible, and Material UI provided dense controls quickly. Ollama was chosen deliberately so the core promise could be local inference with no paid model dependency, while Server-Sent Events kept the run graph synchronized without the complexity of a bidirectional socket protocol.",
      },
      {
        label: "MVP definition",
        body: "The MVP was defined as one complete goal-to-report loop: planner, research router, editable researchers, synthesizer/writer, critic, and citation-aware output. Features that did not prove that loop, such as persistent multi-user memory or configurable remote model pools, were left for later.",
      },
      {
        label: "Progression",
        body: "The project moved from a linear orchestrator to a checkpointed pipeline. Once planner output existed, the next critical step was making stale research visible and rerunnable before synthesis, so the UI evolved around graph state, pause/continue controls, and review modals instead of a passive progress indicator.",
      },
    ],
    dataFlowDiagram: `flowchart TD
  goal["User goal"] --> planner["Planner agent"]
  planner --> router["Research router"]
  router --> web["Web grounding"]
  router --> reasoning["LLM reasoning"]
  web --> researchers["Researcher outputs"]
  reasoning --> researchers
  researchers --> review["Manual review and rerun gates"]
  review --> writer["Writer"]
  writer --> critic["Critic loop"]
  critic --> report["Cited report"]
  report --> ui["React Flow UI"]
  ui --> sse["SSE state stream"]
  sse --> review`,
    cover: {
      src: "/projects/multi-agent-ai/run-full-light.png",
      alt: "Multi-Agent AI System running a goal in light mode with execution graph and agent thoughts",
    },
    screenshots: [
      {
        src: "/projects/multi-agent-ai/run-full-light.png",
        alt: "Multi-Agent AI System full-page run state in light mode",
        caption: "Run state — light mode",
      },
            {
        src: "/projects/multi-agent-ai/run-full-dark.png",
        alt: "Multi-Agent AI System full-page run state in dark mode",
        caption: "Run state — dark mode",
      },
            {
        src: "/projects/multi-agent-ai/continue-ready-light.png",
        alt: "Multi-Agent AI System full-page planner review state in light mode with Continue enabled",
        caption: "Planner review — light mode",
      },
            {
        src: "/projects/multi-agent-ai/continue-ready-dark.png",
        alt: "Multi-Agent AI System full-page planner review state in dark mode with Continue enabled",
        caption: "Planner review — dark mode",
      },
            {
        src: "/projects/multi-agent-ai/panels-continue-light.png",
        alt: "Multi-Agent AI Researchers and Agent Thoughts panels in light mode with Continue enabled",
        caption: "Researchers and thoughts — light mode",
      },
            {
        src: "/projects/multi-agent-ai/panels-continue-dark.png",
        alt: "Multi-Agent AI Researchers and Agent Thoughts panels in dark mode with Continue enabled",
        caption: "Researchers and thoughts — dark mode",
      },
            {
        src: "/projects/multi-agent-ai/research-in-progress-light.png",
        alt: "Multi-Agent AI Researchers and Agent Thoughts panels in light mode while researchers are in progress",
        caption: "Research in progress — light mode",
      },
            {
        src: "/projects/multi-agent-ai/research-in-progress-dark.png",
        alt: "Multi-Agent AI Researchers and Agent Thoughts panels in dark mode while researchers are in progress",
        caption: "Research in progress — dark mode",
      },
            {
        src: "/projects/multi-agent-ai/research-full-light.png",
        alt: "Multi-Agent AI full-page research progress state in light mode after clicking Continue",
        caption: "Full research progress — light mode",
      },
            {
        src: "/projects/multi-agent-ai/research-full-dark.png",
        alt: "Multi-Agent AI full-page research progress state in dark mode after clicking Continue",
        caption: "Full research progress — dark mode",
      },
            {
        src: "/projects/multi-agent-ai/final-full-light.png",
        alt: "Multi-Agent AI completed workflow in light mode with final output and active Export PDF button",
        caption: "Final workflow output — light mode",
      },
            {
        src: "/projects/multi-agent-ai/final-full-dark.png",
        alt: "Multi-Agent AI completed workflow in dark mode with final output and active Export PDF button",
        caption: "Final workflow output — dark mode",
      },
        ],
    overview:
      "A guided multi-agent research assistant. A goal goes in, a planner breaks it into discrete tasks, a research router grounds each one in web or reasoning, and a writer/critic loop turns the result into a cited, polished report — running entirely on local LLMs via Ollama.",
    problem:
      "Most \"AI research assistant\" demos are a single opaque call to a hosted model: you can't inspect what it's doing mid-run, you can't pause it, and you're paying per token to a third party for something that could run locally.",
    approach:
      "I broke the pipeline into five inspectable stages — planner, research router, researchers, writer, critic — and built the frontend around a React Flow graph so every stage is visible as it runs, not just the final output. Server-sent events stream state updates live, so the UI reflects the actual execution, not a simulated progress bar.",
    solution:
      "The result is a pipeline you can watch think: a live graph shows planner → router → researchers → writer → critic, with \"needs rerun\" badges on stale outputs, pause/continue and auto-run toggles, and zero dependency on a paid API since inference runs fully on Ollama.",
    highlights: [
      "Live execution graph built with React Flow, streamed over server-sent events",
      "Checkpointed pipeline with pause / continue and manual review at each stage",
      "100% local inference via Ollama — no API key, no per-call cost",
      "Cited, sourced report generation with a recursive writer/critic loop",
    ],
    featured: true,
  },
  {
    slug: "product-studio",
    name: "Product Studio",
    tagline: "AI-powered UX design for teams that ship.",
    impact: "Built an AI product studio that moves from brief to blueprint, deterministic UX audit, and exportable artifacts in one guided workflow.",
    role: "Product architecture, AI workflow design, design-system modeling, and UX audit implementation",
    scope: "Provider setup, brief capture, blueprint generation, theme tokens, audit scoring, and export artifacts",
    constraint: "Generated output needed measurable quality checks instead of relying on model confidence or visual plausibility.",
    technicalBet: "Pairing generative agents with deterministic HTML audits would make AI page output more shippable.",
    industry: "Design Tooling / SaaS",
    liveUrl: "https://ai-product-studio-studio-web.vercel.app/",
    techStack: [
      "Next.js",
      "TypeScript",
      "Cheerio (HTML parsing)",
      "Anthropic / OpenAI / Gemini APIs",
      "Ollama (local fallback)",
    ],
    externalSystems: [
      "Anthropic Claude API",
      "OpenAI / Gemini provider fallback",
      "Ollama local model fallback",
      "Client-side export runtime",
    ],
    detailedProcess: [
      {
        label: "Requirements",
        body: "The requirement was to reduce idea-to-page time without accepting the usual weakness of AI page generators: plausible output with no proof of quality. The workflow therefore had to capture a brief, produce a structured blueprint, generate theme tokens, audit the result deterministically, and export usable artifacts.",
      },
      {
        label: "Stack choices",
        body: "The app became a Next.js monorepo so the studio UI, agent runtime, theme engine, UX audit package, and shared schemas could evolve independently. Provider calls were abstracted behind Anthropic, OpenAI/Gemini, and Ollama fallbacks, while Cheerio and the audit package handled HTML inspection without relying on model judgment.",
      },
      {
        label: "Design system",
        body: "The UI follows Brad Frost's atomic design: atoms, molecules, organisms, and templates with imports flowing downward. The visual system uses Product Studio tokens such as ps-canvas, ps-surface, ps-raised, ps-border, ps-accent, ps-ink, and severity colors, which made the studio feel like a coherent workbench rather than a collection of generated panels.",
      },
      {
        label: "MVP definition",
        body: "The MVP was the four-stage path from brief to blueprint, audit, and export. Multi-page generation, CMS integration, collaboration, and analytics were explicitly kept out so the first version could prove the core promise: generated page structure plus measurable UX quality.",
      },
      {
        label: "Progression",
        body: "Development started with canonical schemas for Brief, PageBlueprint, ThemeTokens, AuditReport, and FixPlan. The UI then layered in review checkpoints, run history, command palette actions, preview viewports, and export formats once those contracts were stable enough to keep the generated artifacts predictable.",
      },
    ],
    dataFlowDiagram: `flowchart TD
  brief["Product brief"] --> strategy["Strategy and structure agents"]
  strategy --> blueprint["Page blueprint"]
  blueprint --> theme["Theme token engine"]
  blueprint --> copy["Copy generation"]
  theme --> preview["Sandbox preview"]
  copy --> preview
  preview --> audit["Deterministic UX audit"]
  audit --> fixes["Fix plan"]
  fixes --> preview
  audit --> export["Export bundle"]
  export --> artifacts["JSON, CSS, HTML, notes"]`,
    cover: {
      src: "/projects/product-studio/landing-dark.png",
      alt: "Product Studio root landing page in dark mode",
    },
    screenshots: [
      {
        src: "/projects/product-studio/ollama-model-selection.webm",
        alt: "Product Studio Ollama setup animation scrolling local models, selecting qwen2.5-coder, and entering the studio",
        caption: "Ollama model selection flow",
      },
            {
        src: "/projects/product-studio/new-run-generate-light.webm",
        alt: "Product Studio light mode animation starting a new run, filling the product brief, and clicking Generate",
        caption: "New run brief generation — light mode",
      },
            {
        src: "/projects/product-studio/landing-dark.png",
        alt: "Product Studio root landing page in dark mode",
        caption: "Landing page — dark mode",
      },
            {
        src: "/projects/product-studio/landing-light.png",
        alt: "Product Studio root landing page in light mode",
        caption: "Landing page — light mode",
      },
            {
        src: "/projects/product-studio/provider-modal-dark.png",
        alt: "Product Studio AI provider setup modal in dark mode",
        caption: "Provider setup modal",
      },
            {
        src: "/projects/product-studio/studio-dark.png",
        alt: "Product Studio workspace after Ollama setup in dark mode",
        caption: "Studio workspace — dark mode",
      },
            {
        src: "/projects/product-studio/studio-light.png",
        alt: "Product Studio workspace after Ollama setup in light mode",
        caption: "Studio workspace — light mode",
      },
            {
        src: "/projects/product-studio/blueprint-light.png",
        alt: "Product Studio generated blueprint view in light mode",
        caption: "Generated blueprint — light mode",
      },
            {
        src: "/projects/product-studio/audit-dark.png",
        alt: "Product Studio audit results page in dark mode",
        caption: "Audit results — dark mode",
      },
            {
        src: "/projects/product-studio/audit-light.png",
        alt: "Product Studio audit results page in light mode",
        caption: "Audit results — light mode",
      },
            {
        src: "/projects/product-studio/export-dark.png",
        alt: "Product Studio final export page in dark mode showing gate checks and export artifacts",
        caption: "Final export — dark mode",
      },
            {
        src: "/projects/product-studio/export-light.png",
        alt: "Product Studio final export page in light mode showing gate checks and export artifacts",
        caption: "Final export — light mode",
      },
        ],
    overview:
      "A browser-based UX studio: generate structured page blueprints with AI, audit them against real WCAG and readability heuristics, and export production-ready design specs — without leaving the tab.",
    problem:
      "AI page generators are good at producing something that looks plausible and bad at proving it's usable. Teams end up shipping AI-generated layouts with no accessibility or readability guarantees, and no deterministic way to check them.",
    approach:
      "I split the product into a generative half and a verification half on purpose. Blueprint generation uses Anthropic Claude first, with an Ollama fallback and a deterministic mock so the tool never blocks on API availability. The audit engine is intentionally not an LLM — it's a 38-check pass over the real HTML using Cheerio, WCAG 2.1 luminance math, and Flesch-Kincaid scoring, so every finding is reproducible.",
    solution:
      "Four stages — brief, blueprint, audit, export — take a product description to a scored, exportable page spec. A command palette (⌘K) keeps every action a keystroke away, and exports (JSON, CSS tokens, full HTML, or a client-side ZIP) require no server round-trip.",
    highlights: [
      "38-point deterministic heuristic audit engine, independent of any LLM",
      "Three-provider AI fallback chain (Claude → OpenAI/Gemini → Ollama) so generation never hard-fails",
      "Live sandboxed preview pane with desktop / tablet / mobile viewports",
      "Fully client-side export pipeline — no server round-trip on download",
    ],
    featured: true,
  },
  {
    slug: "orqestra",
    name: "Orqestra",
    tagline: "Design. Assemble. Launch.",
    impact: "Turned theme tokens, structured sections, page ordering, and responsive preview into a coherent site-builder loop.",
    role: "Frontend architecture, builder UX, design-token system, and preview workflow implementation",
    scope: "Theme editor, section schemas, page builder, responsive preview, versioning, and login experience",
    constraint: "The builder needed flexibility without letting arbitrary configuration break preview fidelity.",
    technicalBet: "A schema-first section model would make global theme propagation and reliable preview possible.",
    industry: "Website Builder / SaaS",
    liveUrl: "https://theme-builder-landing.vercel.app/",
    githubUrl: "https://github.com/1n4NO/orqestra",
    techStack: [
      "Next.js (App Router)",
      "TypeScript",
      "Material UI",
      "Zustand",
      "Framer Motion",
      "dnd-kit",
    ],
    externalSystems: [
      "Browser storage for builder state",
      "Preview rendering route",
      "Versioned local configuration data",
    ],
    detailedProcess: [
      {
        label: "Requirements",
        body: "The builder needed to let a user assemble a real multi-section site without hand-editing JSON or guessing what would happen at publish time. Requirements centered on editable theme tokens, reusable section schemas, ordered pages, version history, and a preview that matched desktop, tablet, and mobile output.",
      },
      {
        label: "Stack choices",
        body: "Next.js App Router was selected for route-based editing and preview pages. Material UI accelerated the admin-style controls, Zustand kept builder state simple and inspectable, dnd-kit handled reorder interactions, and Framer Motion gave section animation choices a controlled implementation path.",
      },
      {
        label: "Design system",
        body: "The design system was schema-first: theme fields such as primary color, background, font family, type scale, radius, spacing, shadow, border thickness, animation duration, easing, nav height, and glassmorphism were centralized in ThemeConfig. Section variants then consumed those tokens instead of each block inventing its own styling rules.",
      },
      {
        label: "MVP definition",
        body: "The MVP was a local-storage-backed builder with three durable stages: theme, sections, and page_builder. Supabase was planned behind an isolated storage API, but local persistence was enough to validate the editing model, versioning, and preview flow first.",
      },
      {
        label: "Progression",
        body: "Work progressed from token editing to section schemas, then to page assembly and preview. Once each section type had known fields and display options, drag-and-drop ordering and version history became straightforward because the app was always moving structured configuration rather than arbitrary markup.",
      },
    ],
    dataFlowDiagram: `flowchart TD
  theme["ThemeConfig tokens"] --> store["Zustand builder store"]
  sections["Section schemas"] --> store
  pages["Page order"] --> store
  store --> versions["Stage versions"]
  versions --> storage["localStorage stage API"]
  store --> renderer["Preview renderer"]
  renderer --> desktop["Desktop preview"]
  renderer --> tablet["Tablet preview"]
  renderer --> mobile["Mobile preview"]
  dnd["dnd-kit reorder"] --> pages`,
    cover: {
      src: "/projects/orqestra/login-loop-dark.webm",
      alt: "Orqestra animated login page in dark mode",
    },
    screenshots: [
      {
        src: "/projects/orqestra/login-loop-dark.webm",
        alt: "Orqestra animated login page in dark mode with split Lottie and glass sign-in panel",
        caption: "Animated login — dark mode",
      },
            {
        src: "/projects/orqestra/login-loop-light.webm",
        alt: "Orqestra animated login page in light mode with split Lottie and glass sign-in panel",
        caption: "Animated login — light mode",
      },
            {
        src: "/projects/orqestra/page-builder-reorder.webm",
        alt: "Orqestra Page Builder animation showing section reorder reflected in the live page preview",
        caption: "Page builder reorder interaction",
      },
            {
        src: "/projects/orqestra/preview-responsive-scroll.webm",
        alt: "Orqestra Preview animation showing desktop scroll, tablet mode switch, scroll to top, and desktop mode switch",
        caption: "Preview responsive mode walkthrough",
      },
          {
        src: "/projects/orqestra/theme-editor-dark.png",
        alt: "Orqestra Theme Editor in dark mode showing color palettes and exponential typography scale",
        caption: "Theme editor — dark mode",
      },
            {
        src: "/projects/orqestra/theme-editor-light.png",
        alt: "Orqestra Theme Editor in light mode showing color palettes and exponential typography scale",
        caption: "Theme editor — light mode",
      },
            {
        src: "/projects/orqestra/sections-hero-dark.png",
        alt: "Orqestra Section Builder Hero accordion open in dark mode",
        caption: "Sections / Hero — dark mode",
      },
            {
        src: "/projects/orqestra/sections-hero-light.png",
        alt: "Orqestra Section Builder Hero accordion open in light mode",
        caption: "Sections / Hero — light mode",
      },
            {
        src: "/projects/orqestra/sections-faq-dark.png",
        alt: "Orqestra Section Builder FAQ accordion open in dark mode with first preview FAQ expanded",
        caption: "Sections / FAQ — dark mode",
      },
            {
        src: "/projects/orqestra/sections-faq-light.png",
        alt: "Orqestra Section Builder FAQ accordion open in light mode with first preview FAQ expanded",
        caption: "Sections / FAQ — light mode",
      },
            {
        src: "/projects/orqestra/sections-about-dark.png",
        alt: "Orqestra Section Builder About accordion open in dark mode",
        caption: "Sections / About — dark mode",
      },
            {
        src: "/projects/orqestra/sections-about-light.png",
        alt: "Orqestra Section Builder About accordion open in light mode",
        caption: "Sections / About — light mode",
      },
            {
        src: "/projects/orqestra/sections-testimonials-dark.png",
        alt: "Orqestra Section Builder Testimonials accordion open in dark mode",
        caption: "Sections / Testimonials — dark mode",
      },
            {
        src: "/projects/orqestra/sections-testimonials-light.png",
        alt: "Orqestra Section Builder Testimonials accordion open in light mode",
        caption: "Sections / Testimonials — light mode",
      },
            {
        src: "/projects/orqestra/sections-social-proof-dark.png",
        alt: "Orqestra Section Builder Social Proof accordion open in dark mode",
        caption: "Sections / Social Proof — dark mode",
      },
            {
        src: "/projects/orqestra/sections-social-proof-light.png",
        alt: "Orqestra Section Builder Social Proof accordion open in light mode",
        caption: "Sections / Social Proof — light mode",
      },
            {
        src: "/projects/orqestra/sections-footer-dark.png",
        alt: "Orqestra Section Builder Footer accordion open in dark mode",
        caption: "Sections / Footer — dark mode",
      },
            {
        src: "/projects/orqestra/sections-footer-light.png",
        alt: "Orqestra Section Builder Footer accordion open in light mode",
        caption: "Sections / Footer — light mode",
      },
            {
        src: "/projects/orqestra/sections-cta-dark.png",
        alt: "Orqestra Section Builder CTA accordion open in dark mode",
        caption: "Sections / CTA — dark mode",
      },
            {
        src: "/projects/orqestra/sections-cta-light.png",
        alt: "Orqestra Section Builder CTA accordion open in light mode",
        caption: "Sections / CTA — light mode",
      },
            {
        src: "/projects/orqestra/sections-header-dark.png",
        alt: "Orqestra Section Builder Header accordion open in dark mode",
        caption: "Sections / Header — dark mode",
      },
            {
        src: "/projects/orqestra/sections-header-light.png",
        alt: "Orqestra Section Builder Header accordion open in light mode",
        caption: "Sections / Header — light mode",
      },
            {
        src: "/projects/orqestra/sections-impact-dark.png",
        alt: "Orqestra Section Builder Nuestro Impacto accordion open in dark mode",
        caption: "Sections / Impact — dark mode",
      },
            {
        src: "/projects/orqestra/sections-impact-light.png",
        alt: "Orqestra Section Builder Nuestro Impacto accordion open in light mode",
        caption: "Sections / Impact — light mode",
      },
            {
        src: "/projects/orqestra/sections-donations-dark.png",
        alt: "Orqestra Section Builder Donations accordion open in dark mode",
        caption: "Sections / Donations — dark mode",
      },
            {
        src: "/projects/orqestra/sections-donations-light.png",
        alt: "Orqestra Section Builder Donations accordion open in light mode",
        caption: "Sections / Donations — light mode",
      },
            {
        src: "/projects/orqestra/page-builder-dark.png",
        alt: "Orqestra Page Builder in dark mode showing saved section order and live page preview",
        caption: "Page builder — dark mode",
      },
            {
        src: "/projects/orqestra/page-builder-light.png",
        alt: "Orqestra Page Builder in light mode showing saved section order and live page preview",
        caption: "Page builder — light mode",
      },
          ],
    overview:
      "A schema-driven website builder. Set a theme once, drop in structured sections — hero, FAQ, testimonials, CTA — drag them into order, and preview exactly what ships across desktop, tablet, and mobile.",
    problem:
      "Most no-code builders either expose raw config you have to guess at, or lock you into a rigid template with no real device preview — so what you build rarely matches what ships.",
    approach:
      "Every section type — hero, FAQ, about, testimonials, social proof, CTA, header, footer — has its own fixed, editable schema rather than a freeform block. That constraint is what makes the live theme editor possible: since every field is known ahead of time, a single primary color, font, or type-scale change can apply correctly across every section at once.",
    solution:
      "Sections are dragged into order with dnd-kit across as many pages as needed, animation is picked from a controlled menu and run through Framer Motion, and a dedicated preview route renders desktop, tablet, and mobile without guessing at breakpoints. Theme, sections, and layout are each independently versioned, so any earlier state is one click away.",
    highlights: [
      "Schema-driven sections — no raw JSON hand-editing required",
      "Instant, global theme propagation across every section on change",
      "Independent version history for theme, sections, and page layout",
      "Real desktop / tablet / mobile preview route, not simulated breakpoints",
    ],
  },
  {
    slug: "state-dashboard",
    name: "PolInsight India",
    tagline: "State-level analytics for election campaign teams.",
    impact: "Made dense election intelligence scannable through KPI tiles, drill-down maps, hover states, and constituency context.",
    role: "Dashboard architecture, data visualization, interaction design, and analytics UI implementation",
    scope: "National KPIs, India map drill-down, state and constituency views, trend widgets, and intelligence panels",
    constraint: "The interface had to preserve data density without overwhelming campaign users during fast analysis.",
    technicalBet: "Progressive disclosure through map and widget interactions would outperform a flat dashboard grid.",
    industry: "Compliance & Standards-Driven Applications",
    liveUrl: "https://election-campaign-iota.vercel.app/",
    techStack: ["Next.js", "React", "TypeScript", "D3.js", "Data Visualization"],
    externalSystems: [
      "Regional analytics datasets",
      "Client-side D3 visualization runtime",
      "Route-level drill-down data loading",
    ],
    detailedProcess: [
      {
        label: "Requirements",
        body: "The dashboard needed to make dense election data scannable for campaign teams: national view, state drill-down, constituency detail, turnout, vote share, alliance splits, and trend context across election years. The key requirement was speed of interpretation, not just chart coverage.",
      },
      {
        label: "Stack choices",
        body: "Vite and React kept the dashboard fast and client-focused, TypeScript protected the regional data model, Zustand handled navigation and selection state, TanStack Query was available for data workflows, and D3 powered the custom map and charting needs that generic dashboard components would not cover well.",
      },
      {
        label: "Design system",
        body: "The interface moved toward an atomic structure with atoms such as StatNumber, ProgressBar, Sparkline, Badge, and ChartTooltip; molecules such as MetricCard and PartyBreakdown; and organisms such as StateMap and historical charts. Design tokens such as bg-base, bg-header, bg-surface, border, text-primary, text-muted, nda, india, others, and info kept the analytics UI consistent.",
      },
      {
        label: "MVP definition",
        body: "The MVP was an India-to-state drill-down with year switching for 2014, 2019, and 2024, KPI cards, alliance comparison, map interaction, and constituency-level panels. Authentication, advanced filtering, and broader campaign tooling were secondary to proving the core exploration flow.",
      },
      {
        label: "Progression",
        body: "The project progressed from normalized election data and hash-based navigation into bento-style dashboard composition. Once the state selection model worked, maps, trend sparklines, vote-share donuts, and constituency panels were layered in to support progressively deeper analysis without forcing full page transitions.",
      },
    ],
    dataFlowDiagram: `flowchart TD
  data["Election datasets"] --> normalize["Typed regional model"]
  maps["GeoJSON and shapefiles"] --> map["D3 state map"]
  normalize --> store["Zustand dashboard state"]
  hash["Hash navigation"] --> store
  year["Year selector"] --> store
  store --> kpis["KPI cards"]
  store --> charts["Trend charts"]
  store --> map
  map --> selection["State or AC selection"]
  selection --> panels["Drill-down panels"]`,
    cover: {
      src: "/projects/state-dashboard/kpi-nda-total-seats-dark.png",
      alt: "Dark mode KPI tile showing NDA total seats",
    },
    screenshots: [
      {
        src: "/projects/state-dashboard/widget-india-map-hover-dark.webm",
        alt: "Dark mode India map widget showing state hover tooltip",
      },
            {
        src: "/projects/state-dashboard/widget-india-map-hover-light.webm",
        alt: "Light mode India map widget showing state hover tooltip",
      },
            {
        src: "/projects/state-dashboard/karnataka-constituency-drilldown-dark.webm",
        alt: "Dark mode interaction showing Karnataka drill-down and constituency selection",
      },
            {
        src: "/projects/state-dashboard/widget-historical-seat-comparison-hover-dark.webm",
        alt: "Dark mode historical seat comparison widget showing bar hover tooltip",
      },
            {
        src: "/projects/state-dashboard/widget-historical-seat-comparison-hover-light.webm",
        alt: "Light mode historical seat comparison widget showing bar hover tooltip",
      },
            {
        src: "/projects/state-dashboard/widget-turnout-by-state-hover-dark.webm",
        alt: "Dark mode turnout by state widget showing bar hover tooltip",
      },
            {
        src: "/projects/state-dashboard/widget-turnout-by-state-hover-light.webm",
        alt: "Light mode turnout by state widget showing bar hover tooltip",
      },
            {
        src: "/projects/state-dashboard/widget-election-intelligence-hover-dark.webm",
        alt: "Dark mode election intelligence widget showing feed scroll behavior",
      },
            {
        src: "/projects/state-dashboard/widget-election-intelligence-hover-light.webm",
        alt: "Light mode election intelligence widget showing feed scroll behavior",
      },
          {
        src: "/projects/state-dashboard/kpi-nda-total-seats-dark.png",
        alt: "Dark mode KPI tile showing NDA total seats",
      },
            {
        src: "/projects/state-dashboard/kpi-nda-total-seats-light.png",
        alt: "Light mode KPI tile showing NDA total seats",
      },
            {
        src: "/projects/state-dashboard/kpi-india-alliance-seats-dark.png",
        alt: "Dark mode KPI tile showing INDIA alliance seats",
      },
            {
        src: "/projects/state-dashboard/kpi-india-alliance-seats-light.png",
        alt: "Light mode KPI tile showing INDIA alliance seats",
      },
            {
        src: "/projects/state-dashboard/kpi-national-voter-turnout-dark.png",
        alt: "Dark mode KPI tile showing national voter turnout",
      },
            {
        src: "/projects/state-dashboard/kpi-national-voter-turnout-light.png",
        alt: "Light mode KPI tile showing national voter turnout",
      },
            {
        src: "/projects/state-dashboard/kpi-vote-share-dark.png",
        alt: "Dark mode KPI tile showing vote share breakdown",
      },
            {
        src: "/projects/state-dashboard/kpi-vote-share-light.png",
        alt: "Light mode KPI tile showing vote share breakdown",
      },
            {
        src: "/projects/state-dashboard/widget-india-map-dark.png",
        alt: "Dark mode India map widget for national election drill-down",
      },
            {
        src: "/projects/state-dashboard/widget-india-map-light.png",
        alt: "Light mode India map widget for national election drill-down",
      },
            {
        src: "/projects/state-dashboard/widget-top-states-dark.png",
        alt: "Dark mode Top States widget with seat totals and flipped states",
      },
            {
        src: "/projects/state-dashboard/widget-top-states-light.png",
        alt: "Light mode Top States widget with seat totals and flipped states",
      },
            {
        src: "/projects/state-dashboard/widget-historical-seat-comparison-dark.png",
        alt: "Dark mode historical seat comparison widget",
      },
            {
        src: "/projects/state-dashboard/widget-historical-seat-comparison-light.png",
        alt: "Light mode historical seat comparison widget",
      },
            {
        src: "/projects/state-dashboard/widget-turnout-by-state-dark.png",
        alt: "Dark mode turnout by state widget",
      },
            {
        src: "/projects/state-dashboard/widget-turnout-by-state-light.png",
        alt: "Light mode turnout by state widget",
      },
            {
        src: "/projects/state-dashboard/widget-election-intelligence-dark.png",
        alt: "Dark mode election intelligence widget",
      },
            {
        src: "/projects/state-dashboard/widget-election-intelligence-light.png",
        alt: "Light mode election intelligence widget",
      },
          ],
    overview:
      "A state-level analytics dashboard built for campaign teams working with dense, regional data under compliance constraints — surfacing the numbers that matter without burying the reader in them.",
    problem:
      "Campaign and civic data is naturally hierarchical — state, region, constituency — and most dashboards either flatten it into one overwhelming view or force a slow drill-down for every question.",
    approach:
      "I focused the frontend architecture on progressive disclosure: a state-level overview that stays legible at a glance, with drill-down views that load only the data a viewer has actually asked for, kept fast and standards-compliant throughout.",
    solution:
      "A dashboard that scales from a statewide summary down to constituency-level detail without a full page reload, built with accessibility and data accuracy treated as first-class requirements rather than an afterthought.",
    highlights: [
      "Hierarchical drill-down from state to constituency level",
      "Performance-conscious rendering of dense regional datasets",
      "Built to standards-compliance requirements from day one",
    ],
  },
  {
    slug: "fluxion",
    name: "Fluxion",
    tagline: "BPMN workflows at Rust speed.",
    impact: "Gave a Rust BPMN workflow engine an operator console for deployment, inspection, task action, and observability.",
    role: "Developer-tool UX, embedded console design, workflow visualization, and operational surface architecture",
    scope: "Dashboard, process deployment, BPMN modeler, graph inspection, task actions, metrics, and settings",
    constraint: "The console had to explain a technical runtime without hiding the engine, API, or observability details.",
    technicalBet: "An embedded operations UI would make a workflow engine easier to evaluate than API docs alone.",
    industry: "Developer Tools / Workflow Engines",
    liveUrl: "https://fluxion-landing-gules.vercel.app/",
    techStack: ["Rust", "Axum", "PostgreSQL", "BPMN 2.0", "Prometheus", "OpenTelemetry"],
    externalSystems: [
      "PostgreSQL-backed workflow persistence",
      "Prometheus metrics and OTLP tracing",
      "Optional Kafka and NATS event integrations",
      "BPMN 2.0 process model concepts",
    ],
    detailedProcess: [
      {
        label: "Requirements",
        body: "The core requirement was a workflow engine that could expose BPMN execution clearly enough for backend and platform engineers to deploy, start, inspect, and operate processes. The console needed to make persistence, task actions, process starts, health checks, metrics, authentication modes, tenant isolation, and event integrations visible without forcing users into raw API calls for every step.",
      },
      {
        label: "Stack choices",
        body: "Rust and Axum were chosen for a small, predictable HTTP runtime around BPMN parsing and execution. PostgreSQL handled durable definitions, instances, tasks, timers, and history, while Prometheus and OpenTelemetry made the operational surface first-class. The embedded HTML console kept the operator UI close to the service and simple to ship.",
      },
      {
        label: "Design system",
        body: "The console design system uses a dense dark operations palette, compact cards, status badges, route lists, and graph surfaces. That fit the product better than a marketing-style interface because the main user jobs are scanning runtime health, reviewing process state, and acting on workflow tasks.",
      },
      {
        label: "MVP definition",
        body: "The MVP was the full operator loop: check server health, deploy or run BPMN, start an instance, inspect graph and history, act on user tasks, review metrics, and understand available API endpoints. Advanced auth, tenant isolation, Kafka, NATS, and connector details could layer in after that loop was coherent.",
      },
      {
        label: "Progression",
        body: "The project progressed from the engine and persistence layer into an embedded console that made the runtime inspectable. Dashboard and observability views came first for confidence, then BPMN deployment, process graph rendering, task operations, message correlation, and a lightweight modeler rounded out the operator workflow.",
      },
    ],
    dataFlowDiagram: `flowchart TD
  visitor["Technical evaluator"] --> quickstart["Quickstart commands"]
  quickstart --> api["Fluxion HTTP API"]
  api --> engine["Rust BPMN engine"]
  engine --> postgres["PostgreSQL persistence"]
  engine --> tasks["Task lifecycle"]
  engine --> messages["Message correlation"]
  engine --> eventBus["Kafka triggers"]
  engine --> metrics["Prometheus metrics"]
  engine --> traces["OTLP traces"]
  api --> workflowConsole["Workflow console"]
  workflowConsole --> processGraph["Process graph view"]`,
    cover: {
      src: "/projects/fluxion/home-right-full.png",
      alt: "Fluxion dashboard main panel showing all visible workflow metrics and activity",
    },
    screenshots: [
      {
        src: "/projects/fluxion/processes-right-full.png",
        alt: "Fluxion Processes tab main panel showing deployment, start instance, and process graph sections",
        caption: "Processes tab",
      },
            {
        src: "/projects/fluxion/modeler-right-editor.png",
        alt: "Fluxion BPMN modeler showing the palette, canvas, inspector, and validation controls before the generated XML section",
        caption: "BPMN modeler canvas",
      },
            {
        src: "/projects/fluxion/modeler-generated-bpmn.png",
        alt: "Fluxion Generated BPMN XML panel showing exported BPMN markup",
        caption: "Generated BPMN XML",
      },
            {
        src: "/projects/fluxion/observability-above-fold.png",
        alt: "Fluxion Observability tab showing metrics summary, HTTP requests by route, and instance status widgets",
        caption: "Observability overview",
      },
            {
        src: "/projects/fluxion/observability-below-fold.png",
        alt: "Fluxion Observability tab showing request latency, task actions, and raw Prometheus output widgets",
        caption: "Observability detail widgets",
      },
            {
        src: "/projects/fluxion/settings-full-page.png",
        alt: "Fluxion Settings page with sidebar, server connection status, and API reference endpoints",
        caption: "Settings and API reference",
      },
        ],
    overview:
      "Fluxion is an early-stage BPMN 2.0 workflow engine and HTTP service written in Rust, with an embedded workflow console for process deployment, graph inspection, task operations, metrics, and API review.",
    problem:
      "Backend and platform engineers need more than a raw workflow API. They need to see whether definitions are deployed, instances are running, tasks are blocked, messages can be correlated, and the service is healthy enough to operate.",
    approach:
      "I treated the console as an operations surface for a technical runtime: dashboard first, process deployment and graph inspection next, then task actions, message correlation, observability, settings, and a small BPMN modeler for validating workflow structure.",
    solution:
      "A Rust service with an embedded single-page console that lets an evaluator move from service health to BPMN execution and runtime inspection without stitching together every endpoint by hand.",
    highlights: [
      "Embedded workflow console served directly from the Rust API",
      "BPMN modeler, process graph, task actions, and message correlation in one operator surface",
      "Prometheus metrics and OpenTelemetry tracing represented in the product workflow",
    ],
  },
  {
    slug: "rainmatter-air",
    name: "Rainmatter Air",
    tagline: "Know the air you're breathing.",
    impact: "Moved live air-quality context into the browser toolbar and current page without accounts, analytics, or remote key storage.",
    role: "Chrome extension architecture, privacy model, AQI calculation, popup UI, and browser smoke testing",
    scope: "Popup dashboard, settings, background refresh, API normalization, CPCB AQI categories, and page overlay",
    constraint: "The extension needed useful live data while keeping credentials local and working gracefully offline.",
    technicalBet: "A small Manifest V3 extension could make AQI awareness more habitual than another standalone dashboard.",
    industry: "Consumer / Environmental Tech",
    liveUrl: "https://rainmatter-air-landing.vercel.app/",
    githubUrl: "https://github.com/1n4NO/rainmatter-air-extension",
    techStack: ["Manifest V3", "Vanilla JavaScript", "Chrome Extension APIs", "OpenAQ API", "OAQ API"],
    externalSystems: [
      "OpenAQ v3 API",
      "Rainmatter OAQ API",
      "Chrome Extension storage and page overlay APIs",
    ],
    detailedProcess: [
      {
        label: "Requirements",
        body: "The extension had to keep air-quality data close to where people already spend time: the browser toolbar and current page. Requirements included a popup dashboard, settings page, background refresh, optional overlay, CPCB AQI categories for India, configurable providers, and a privacy model where API keys stay on-device.",
      },
      {
        label: "Stack choices",
        body: "A Manifest V3 Chrome extension with vanilla JavaScript was chosen to avoid a runtime build dependency and keep the package self-contained. The background service worker handles scheduled fetch and cache, the popup reads the latest snapshot, the options page validates API configuration, and the content script displays the overlay.",
      },
      {
        label: "Design system",
        body: "The design system was deliberately compact and utility-focused: a small popup, direct pollutant breakdown, clear AQI category language, masked settings values, and minimal overlay chrome. That suited a browser extension better than a heavier app-style interface.",
      },
      {
        label: "MVP definition",
        body: "The MVP was the full private loop: save settings locally, fetch OpenAQ or OAQ data, normalize measurements, derive indicative AQI when needed, cache the last good snapshot, and render the result in both popup and overlay. Analytics, accounts, and remote sync were intentionally excluded.",
      },
      {
        label: "Progression",
        body: "Development started with the air-quality normalization library and CPCB breakpoint tests, then expanded into settings validation, background alarms, popup rendering, and overlay behavior. Browser smoke tests were added to verify the MV3 service worker, local-only credential storage, masked settings, and packaged extension output.",
      },
    ],
    dataFlowDiagram: `flowchart TD
  settings["Options page settings"] --> storage["Chrome local storage"]
  alarms["Chrome alarms"] --> worker["MV3 background worker"]
  storage --> worker
  worker --> openaq["OpenAQ API"]
  worker --> oaq["OAQ API"]
  openaq --> normalize["Measurement normalizer"]
  oaq --> normalize
  normalize --> cpcb["CPCB AQI calculation"]
  cpcb --> snapshot["Cached snapshot"]
  snapshot --> popup["Toolbar popup"]
  snapshot --> overlay["Content-script overlay"]`,
    cover: {
      src: "/projects/rainmatter-air/cover.png",
      alt: "Rainmatter Air popup showing AQI gauge and pollutant readings",
    },
    screenshots: [
      {
        src: "/projects/rainmatter-air/cover.png",
        alt: "Popup dashboard showing AQI gauge, location, and pollutant breakdown",
        caption: "Popup dashboard",
      },
            {
        src: "/projects/rainmatter-air/settings.png",
        alt: "Settings page for configuring API endpoint, provider, and location",
        caption: "Settings page",
      },
            {
        src: "/projects/rainmatter-air/overlay.png",
        alt: "Compact AQI overlay badge on a webpage",
        caption: "Page overlay",
      },
        ],
    overview:
      "A free, open-source Chrome extension that keeps live air quality data one click away, built for Indian cities on top of OpenAQ and Rainmatter's own OAQ platform.",
    problem:
      "Air quality data that matters for day-to-day decisions — should I run outside today — is scattered across dashboards nobody checks. It needed to live somewhere people already look: the browser toolbar.",
    approach:
      "I built it privacy-first from the frontend up: the API key never leaves the user's device, there's no tracking or analytics, and the extension still shows the last good reading when offline instead of failing silently.",
    solution:
      "A toolbar popup with a live AQI gauge and pollutant breakdown (PM2.5, PM10, NO₂, SO₂, CO, O₃), CPCB AQI categories for Indian cities, dual API support so it works with OpenAQ or OAQ, and an optional on-page overlay badge for at-a-glance readings anywhere on the web.",
    highlights: [
      "CPCB AQI breakpoints for accurate India-specific readings",
      "Dual data-source support (OpenAQ v3 and OAQ) switchable in settings",
      "On-page overlay badge — AQI visible without opening the popup",
      "Fully private: API key stored on-device only, zero analytics",
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

// Wraps around: the project after the last one is the first, and vice versa,
// so a visitor can keep browsing the curated list end-to-end.
export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { previous: null, next: null };
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { previous, next };
}
