# Project screenshots

Each subfolder here corresponds to a project's `slug` in `/data/projects.ts`.

To add real screenshots:

1. Drop image files into the matching folder (e.g. `/public/projects/multi-agent-ai/`).
2. Open `/data/projects.ts` and make sure each screenshot's `src` matches the
   filename you used, e.g. `/projects/multi-agent-ai/cover.png`.
3. That's it — the cover image and every entry in `screenshots[]` render
   automatically on the homepage and the project's detail page.

You can also point `src` at a fully-qualified URL (see the `rainmatter-air`
entry in `data/projects.ts` for an example) instead of a local file — useful
if a project already has hosted screenshots.

Recommended size: 1600x1000px or similar 16:10-ish ratio, PNG or JPG, under 500KB
each (Next/Image will still optimize them, but smaller source files build faster).
