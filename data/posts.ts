// Add or remove blog posts by editing this array.
// `content` supports plain paragraphs split by blank lines — see PostBody component.

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO format, e.g. "2026-06-12"
  excerpt: string;
  content: string;
  tag?: string;
};

export const posts: Post[] = [
  {
    slug: "picking-a-rendering-strategy-per-route",
    title: "Stop picking one rendering strategy for the whole app",
    date: "2026-06-18",
    tag: "Architecture",
    excerpt:
      "SSR everywhere is a default, not a decision. Here's how I choose between SSR, CSR, streaming, and RSC on a per-route basis.",
    content:
      "Most teams pick a rendering strategy once, at the start of a project, and never revisit it. That's backwards. A marketing page, a live dashboard, and an authenticated settings screen have almost nothing in common in terms of what they need from rendering, and treating them the same is how you end up either shipping a slow SSR waterfall for a page that didn't need it, or a blank-screen CSR flash for content that should have been there on first paint.\n\nMy actual heuristic: if a route needs to be indexed or needs to feel instant on first load, it gets SSR or static generation. If it's behind auth and mostly interactive, CSR is fine and often faster to ship. If a route is doing something expensive server-side that the user doesn't need all at once, streaming with Suspense boundaries lets the shell paint immediately while the slow part fills in.\n\nReact Server Components change this calculus again — they're not a fourth option so much as a way to keep more of the page server-rendered by default while still shipping interactive islands where you actually need them. The mistake is treating RSC as an all-or-nothing migration. Adopt it where the boundary is obvious — a static product page with one interactive widget — before touching anything ambiguous.",
  },
  {
    slug: "design-systems-reduce-development-effort",
    title: "What actually moves the needle in a design system",
    date: "2026-05-02",
    tag: "Design Systems",
    excerpt:
      "Versioning and governance sound boring next to component libraries — they're also the reason a design system survives contact with three product teams.",
    content:
      "Everyone starts a design system with components. Buttons, inputs, cards — the visible layer. That part is necessary but it's not what determines whether the system is still being used in eighteen months.\n\nWhat determines that is governance: who can propose a new variant, how a breaking change gets communicated, and whether teams can pin to a version instead of being forced onto main. Without that, a design system degrades into a shared node_modules folder that everyone is quietly afraid to touch.\n\nThe other underrated piece is documenting the reasoning, not just the API. A component's props tell you how to use it; they don't tell you when not to. The design system that actually reduces effort is the one where an engineer can answer 'should I use this or build something custom' without pinging the platform team.",
  },
  {
    slug: "ai-code-review-standards",
    title: "Reviewing AI-generated code needs its own checklist",
    date: "2026-04-14",
    tag: "AI Engineering",
    excerpt:
      "Treating AI-assisted code like human-written code in review is how subtle bugs get through. What I actually look for differently.",
    content:
      "AI-generated code tends to fail in a specific way: it's syntactically confident and locally correct, but it can quietly misunderstand the surrounding system — calling a deprecated internal API correctly, or handling an edge case that doesn't actually apply to your data model.\n\nThe checklist I use is different from a normal PR review. I look harder at boundary conditions the model couldn't have known about (what does null actually mean in this specific table), at whether error handling was generated generically versus matching how the rest of the codebase actually surfaces failures, and at whether test coverage was generated to match the implementation rather than the intended behavior — which happens more than people expect, and passes CI every time.\n\nNone of this is a reason to avoid AI-assisted engineering. It's a reason to stop reviewing it the same way you'd review a junior engineer's PR, because the failure modes aren't the same.",
  },
  {
    slug: "performance-budget-that-survived-three-teams",
    title: "The performance budget that actually survived three product teams",
    date: "2026-02-27",
    tag: "Performance",
    excerpt:
      "Most performance budgets die the first time a PM needs to ship a feature that blows past them. This one didn't — here's the difference.",
    content:
      "A performance budget expressed as a single number — 'LCP under 2.5s' — sounds precise and is actually useless in a room with a product deadline, because there's no way to negotiate against it. Somebody always wins by ignoring it.\n\nWhat worked was tying the budget to specific, ownable line items: bundle size per route, third-party script weight, image payload per breakpoint. When a feature threatened the budget, the conversation became 'which of these three line items do we spend the headroom on' instead of 'do we care about performance this sprint.'\n\nThe LCP and TTI improvements followed from that structure, not from a single optimization pass. Budgets that are enforced automatically in CI, with a clear owner per line item, survive roadmap pressure. Budgets that live in a slide deck don't.",
  },
  {
    slug: "local-llms-in-production-frontends",
    title: "What changes when your LLM runs on the user's machine",
    date: "2026-01-09",
    tag: "AI Engineering",
    excerpt:
      "Building conversational UI against Ollama instead of a hosted API rewrites a surprising number of your frontend assumptions.",
    content:
      "Building against a hosted model API, you design for latency and rate limits. Building against a local model via Ollama, the constraints flip: latency is often lower and free, but you're now designing for wildly variable hardware, models that may not be pulled yet, and zero guarantee of availability if the user's machine is under load.\n\nThe frontend has to do more work as a result. Streaming becomes non-negotiable rather than a nice-to-have, since local inference on modest hardware can be slow enough that a non-streaming UI feels broken. You also need honest, specific error states — 'model not found, run ollama pull llama3.2' is a real state your UI has to handle, not an edge case.\n\nThe payoff is a genuinely different privacy story: nothing leaves the device, which changes what you're allowed to promise the user and what you don't have to build (no server-side data handling for the conversation itself). That tradeoff is worth designing for deliberately, not backing into.",
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
