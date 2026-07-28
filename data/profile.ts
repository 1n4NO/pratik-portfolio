// Edit this file to update your bio, contact info, and skill groups.
// Nothing else in the codebase needs to change.

export const profile = {
  name: "Pratik Singh",
  role: "Frontend Architect",
  tagline: "Building frontend systems that ship quickly and still make sense later.",
  location: "Bangalore, India",
  email: "pratiksk@outlook.com",
  phone: "+91 99864 25864",
  linkedin: "https://linkedin.com/in/in4no",
  github: "https://github.com/1n4NO",
  resumeUrl: "/resume/Pratik_Singh_Resume_2026.pdf",
  yearsExperience: "12+",
  short:
    "I take messy product goals and turn them into frontend systems that are clear to build on, easy to maintain, and practical for teams that need to keep shipping.",
  long: [
    "I'm a Frontend Architect and engineering leader with 12+ years of experience building and scaling web applications across enterprise, SaaS, and AI-heavy products.",
    "My work sits at the intersection of frontend architecture, rendering strategy, and team leadership: choosing the right Next.js model per route, shaping design systems that survive across product lines, and setting standards people actually use.",
    "Lately that has included conversational interfaces, structured outputs, and the review habits needed to keep AI-assisted code honest.",
  ],
  specSheet: [
    { label: "Experience", value: "12+ yrs" },
    { label: "Focus", value: "Frontend Architecture" },
    { label: "Based", value: "Bangalore, IN" },
    { label: "Currently", value: "Exploring Staff / Senior Frontend Architect roles" },
  ],
};

export type SkillGroup = {
  title: string;
  blurb: string;
  items: string[];
  since: number; // year this domain became a real part of the work — drives the depth meter on /expertise
};

// Shown on the Expertise page. Group however makes sense — reorder or add groups freely.
export const skillGroups: SkillGroup[] = [
  {
    title: "Leadership",
    blurb: "Helping the team ship well, not just ship.",
    since: 2017,
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
    blurb: "The core toolkit I use every day.",
    since: 2012,
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
    blurb: "Keeping client and server state in sync.",
    since: 2019,
    items: ["TanStack Query", "Redux Toolkit", "REST", "GraphQL", "Node.js (API routes)"],
  },
  {
    title: "AI integration",
    blurb: "Where interface work meets model work.",
    since: 2023,
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
    blurb: "Making dense data easier to read.",
    since: 2017,
    items: ["D3.js", "React Charts", "MUI DataGrid Pro", "React Flow"],
  },
  {
    title: "Quality & security",
    blurb: "The parts that matter after the demo.",
    since: 2019,
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
    since: 2020,
    items: ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "CI/CD (GitHub, Bitbucket)"],
  },
];

export const industries = [
  "AI agent products and conversational systems",
  "Enterprise SaaS platforms",
  "Analytics & data visualization",
  "Compliance & standards-driven applications",
  "Mobility & automotive technology",
];
