# Pratik Singh — Portfolio

Next.js 14 (App Router) + TypeScript + Tailwind CSS.

## Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in your real Resend values
npm run dev
```

Open http://localhost:3000.

## Set up the contact form (Resend)

1. Create a free account at [resend.com](https://resend.com) and grab an API key.
2. For quick testing, `CONTACT_FROM_EMAIL` can stay as `onboarding@resend.dev`
   (Resend's shared test sender — works immediately, no domain setup).
   To send from your own address (e.g. `hello@yourdomain.com`), verify that
   domain in Resend first, then update `CONTACT_FROM_EMAIL`.
3. Set `CONTACT_TO_EMAIL` to the inbox you want submissions delivered to.
4. Put all three in `.env.local` locally, and in your Vercel project's
   Environment Variables when you deploy.

## Deploy to Vercel

```bash
npm i -g vercel   # if you don't have it
vercel
```

Or push this folder to a GitHub repo and import it at vercel.com/new.
Either way, add `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`
in the Vercel project's Settings → Environment Variables before your first
real deploy (the contact form will 500 without them).

## Adding or editing content — no component code needed

| To change...              | Edit this file only     |
| -------------------------- | ------------------------ |
| Bio, skills, resume link   | `data/profile.ts`        |
| Projects (add/remove/edit) | `data/projects.ts`       |
| Blog posts                 | `data/posts.ts`          |

To **add a project**: copy an object in `data/projects.ts`, give it a unique
`slug`, fill in the fields, and drop screenshots into
`public/projects/<slug>/`. It'll automatically appear on the homepage,
`/work`, and get its own `/work/<slug>` case-study page.

To **remove a project**: delete its object from the array.

Screenshots that don't exist yet render a clean "screenshot pending"
placeholder instead of a broken image, so you can wire up content before
screenshots are ready.

## Structure

```
app/                  routes (App Router)
  page.tsx             homepage
  work/                all-projects grid + [slug] case study pages
  expertise/           skills + resume download
  musings/             blog index + [slug] post pages
  contact/             contact page
  api/contact/         Resend email endpoint
components/
  ui/                  Button, Tag, Container, BrowserFrame, RulerDivider
  layout/              Header, Footer, ContactCTA, FloatingContact (modal)
  sections/            HeroMarquee, ProjectRow, ProjectCard, SpecSheet,
                       MusingsFeed, PostBody, ContactForm
data/                  profile.ts, projects.ts, posts.ts — all editable content
lib/                   email.ts (Resend helper)
public/
  projects/<slug>/     screenshots per project
  resume/              your resume PDF
```
