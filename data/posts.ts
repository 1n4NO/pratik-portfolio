// Add or remove blog posts by editing this array.
// `content` supports plain paragraphs split by blank lines — see PostBody component.

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO format, e.g. "2026-06-12"
  excerpt: string;
  content: string;
  tag?: string;
  background?: string; // optional: force a specific /public/projects/Musings/*.svg file instead of the automatic pick
};

export const posts: Post[] = [
  {
    slug: "decide-the-schema-before-the-ui",
    title: "The one decision I make before writing a single line of UI",
    date: "2026-07-24",
    tag: "Architecture",
    background: "stacked-waves-haikei.svg",
    excerpt:
      "The projects I keep returning to all start the same way: I lock down the data shape before I draw a single component.",
    content:
      "Across six different products, the thing that kept them maintainable wasn't the framework or the styling. It was deciding, before any UI got built, what shape the data would take, and not letting each component invent its own version.\n\nOrqestra is the clearest example: every section type — hero, FAQ, testimonials, CTA — has a fixed editable schema instead of a freeform block, and that is what lets one theme change propagate correctly across the site. Product Studio does the same thing from the other side: its audit engine is a fixed 38-check pass over real HTML, not an LLM improvising a finding, because reproducible results depend on a clear definition of what counts. This site works the same way too: every project is one object in an array with a fixed shape, which is why adding a new case study is a short edit instead of a hunt through components.\n\nThe temptation to skip this step is real, especially early, because a schema feels like overhead when the data is still fuzzy. But every time I've skipped it, the cost showed up later as a UI that could not be extended cleanly or as a mismatch between two screens that were supposed to show the same thing. Deciding the shape first is not a documentation task. It is the architecture decision, and everything else follows from it.",
  },
  {
    slug: "picking-a-rendering-strategy-per-route",
    title: "Stop picking one rendering strategy for the whole app",
    date: "2026-06-18",
    tag: "Architecture",
    excerpt:
      "SSR everywhere is a default, not a decision. Here's how I choose between SSR, CSR, streaming, and RSC route by route.",
    content:
      "Most teams pick a rendering strategy once at the start of a project and never revisit it. That is backwards. A marketing page, a live dashboard, and an authenticated settings screen need different things from rendering, and treating them the same is how you end up with a slow SSR waterfall on one page or a blank CSR flash on another.\n\nMy rule of thumb: if a route needs to be indexed or feel immediate on first load, it gets SSR or static generation. If it is behind auth and mostly interactive, CSR is fine and usually faster to ship. If the expensive part is server-side and the user does not need it all at once, streaming with Suspense lets the shell paint first and the slower content fill in after.\n\nReact Server Components change the mix again. They are not a fourth option so much as a way to keep more of the page server-rendered by default while still shipping interactive islands where they make sense. The mistake is treating RSC like an all-or-nothing migration. Start with the obvious boundaries before touching the ambiguous ones.",
  },
  {
    slug: "design-systems-reduce-development-effort",
    title: "What actually moves the needle in a design system",
    date: "2026-05-02",
    tag: "Design Systems",
    excerpt:
      "Versioning and governance sound boring next to component libraries. They are also why a design system survives three product teams.",
    content:
      "Everyone starts a design system with components: buttons, inputs, cards, the visible layer. That part matters, but it is not what decides whether the system is still in use eighteen months later.\n\nWhat decides that is governance: who can propose a new variant, how a breaking change gets communicated, and whether teams can pin to a version instead of being forced onto main. Without that, a design system turns into a shared node_modules folder that everyone is quietly afraid to touch.\n\nThe other piece worth documenting is the reasoning, not just the API. A component's props tell you how to use it; they do not tell you when not to. The design system that actually saves effort is the one where an engineer can answer \"should I use this or build something custom\" without having to ask the platform team first.",
  },
  {
    slug: "ai-code-review-standards",
    title: "Reviewing AI-generated code needs its own checklist",
    date: "2026-04-14",
    tag: "AI Engineering",
    excerpt:
      "Treating AI-assisted code like human-written code in review is how subtle bugs slip through. This is what I check instead.",
    content:
      "AI-generated code tends to fail in a specific way: it looks confident and is often locally correct, but it can miss the surrounding system. It will happily call a deprecated internal API correctly or handle an edge case that does not apply to your data model.\n\nThe checklist I use is different from a normal PR review. I look harder at boundary conditions the model could not have known about, at whether error handling matches how the codebase actually surfaces failures, and at whether tests were written to match the implementation instead of the intended behavior. That last one happens more often than people think, and CI will still pass.\n\nNone of this is a reason to avoid AI-assisted engineering. It is a reason to review it with different expectations, because the failure modes are different.",
  },
  {
    slug: "performance-budget-that-survived-three-teams",
    title: "The performance budget that actually survived three product teams",
    date: "2026-02-27",
    tag: "Performance",
    excerpt:
      "Most performance budgets die the first time a PM needs to ship a feature that blows past them. This one survived, and the difference was simple.",
    content:
      "A performance budget expressed as a single number — \"LCP under 2.5s\" — sounds precise and is usually useless in a room with a product deadline, because there is nothing to negotiate against. Somebody always wins by ignoring it.\n\nWhat worked was tying the budget to specific, ownable line items: bundle size per route, third-party script weight, image payload per breakpoint. When a feature threatened the budget, the conversation became \"which of these three things do we spend the headroom on\" instead of \"do we care about performance this sprint.\"\n\nThe LCP and TTI improvements came from that structure, not from one optimization pass. Budgets that are enforced automatically in CI, with a clear owner per line item, survive roadmap pressure. Budgets that live in a slide deck do not.",
  },
  {
    slug: "local-llms-in-production-frontends",
    title: "What changes when your LLM runs on the user's machine",
    date: "2026-01-09",
    tag: "AI Engineering",
    excerpt:
      "Building conversational UI against Ollama instead of a hosted API changes more frontend assumptions than you expect.",
    content:
      "When you build against a hosted model API, you design around latency and rate limits. When you build against a local model through Ollama, the constraints flip. Latency is often lower and free, but you now have to account for wildly different hardware, models that may not be pulled yet, and no guarantee of availability if the user's machine is busy.\n\nThe frontend has to do more work as a result. Streaming stops being a nice-to-have and becomes required, because local inference on modest hardware can be slow enough that a non-streaming UI feels broken. You also need honest error states, like \"model not found, run ollama pull llama3.2,\" because that is a real state the UI has to handle.\n\nThe payoff is a different privacy story: nothing leaves the device, which changes what you can promise the user and what you do not need to build. That is worth designing for on purpose, not drifting into by accident.",
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

// Chronological, newest first — matches the order posts appear in the feed.
// Returns null at either end instead of wrapping, since "older than the oldest
// post" isn't a meaningful place to send someone.
export function getAdjacentPosts(slug: string) {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const index = sorted.findIndex((p) => p.slug === slug);
  if (index === -1) return { newer: null, older: null };
  return {
    newer: index > 0 ? sorted[index - 1] : null,
    older: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}
