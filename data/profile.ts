// Edit this file to update your bio, contact info, and skill groups.
// Nothing else in the codebase needs to change.

export const profile = {
  name: "Pratik Singh",
  role: "Frontend Architect",
  tagline: "Systems that ship fast, scale clean, and hold up under real traffic.",
  location: "Bangalore, India",
  email: "pratiksk@outlook.com",
  phone: "+91 99864 25864",
  linkedin: "https://linkedin.com/in/in4no",
  github: "https://github.com/1n4NO",
  resumeUrl: "/resume/Pratik_Singh_Resume_2026.pdf",
  yearsExperience: "12+",
  short:
    "I turn ambiguous product goals into durable frontend systems: clear rendering boundaries, reusable UI foundations, and teams that can keep shipping without slowing down.",
  long: [
    "I'm a Frontend Architect and engineering leader with 12+ years of experience building and scaling high-performance, user-centric web applications across enterprise, SaaS, and AI-native domains.",
    "My focus sits at the intersection of frontend architecture, rendering strategy, and team leadership — choosing the right Next.js rendering model per route, standing up design systems that hold up across product verticals, and setting the engineering standards a team actually follows.",
    "Lately that includes AI-native interfaces: conversational UIs where agent responses drive dynamic rendering, structured-output pipelines, and the engineering standards for reviewing AI-generated code responsibly.",
  ],
  specSheet: [
    { label: "Experience", value: "12+ yrs" },
    { label: "Focus", value: "Frontend Architecture" },
    { label: "Based", value: "Bangalore, IN" },
    { label: "Currently", value: "Open to new roles" },
  ],
};

export type SkillGroup = {
  title: string;
  blurb: string;
  items: string[];
};

// Shown on the Expertise page. Group however makes sense — reorder or add groups freely.
export const skillGroups: SkillGroup[] = [
  {
    title: "Leadership",
    blurb: "Running the team, not just the code.",
    items: [
      "Frontend architecture & system design",
      "Team leadership & mentorship",
      "Delivery planning & technical risk management",
      "Cross-functional collaboration",
      "Code quality, reviews & engineering standards",
      "Agile / Scrum",
    ],
  },
  {
    title: "Frontend",
    blurb: "The core toolkit, used daily.",
    items: [
      "React",
      "Next.js (SSR, CSR, streaming, RSC)",
      "TypeScript / JavaScript",
      "HTML5 / CSS3",
      "Tailwind CSS",
    ],
  },
  {
    title: "State & data",
    blurb: "Keeping client and server state honest.",
    items: ["TanStack Query", "Redux Toolkit", "REST", "GraphQL", "Node.js (API routes)"],
  },
  {
    title: "AI integration",
    blurb: "Where the frontend meets the model.",
    items: [
      "OpenAI & Ollama APIs",
      "Conversational UI",
      "Structured outputs",
      "Prompt engineering",
      "Agent-driven workflows",
      "AI-assisted engineering standards",
    ],
  },
  {
    title: "Data visualization",
    blurb: "Making dense data legible.",
    items: ["D3.js", "React Charts", "MUI DataGrid Pro", "React Flow"],
  },
  {
    title: "Quality & security",
    blurb: "The parts that don't show up in a demo.",
    items: [
      "OWASP Top 10",
      "XSS / CSRF prevention",
      "CSP & secure headers",
      "JWT / OAuth2",
      "Vitest, Jest, Playwright",
      "Sentry, PostHog, GA, Mixpanel",
    ],
  },
  {
    title: "Cloud & DevOps",
    blurb: "Getting it into production and keeping it there.",
    items: ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "CI/CD (GitHub, Bitbucket)"],
  },
];

export const industries = [
  "AI agent marketplaces & conversational systems",
  "Enterprise SaaS platforms",
  "Analytics & data visualization",
  "Compliance & standards-driven applications",
  "Mobility & automotive technology",
];
