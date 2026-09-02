# Dilara Öztürk — Creative Journal

A digital publication: software, sketches and music kept in one notebook.
Built to grow for years rather than to be redesigned.

The visual language is authored in a separate design file, which is the
normative spec for type, colour, spacing and interaction — when this codebase
and that file disagree, the design is right.

```bash
npm install
npm run dev      # http://localhost:3000
```

Nothing needs configuring to run, and nothing is fetched at render time — see
[There are no integrations](#there-are-no-integrations). The only variable is
the canonical origin, and only for deployment.

## How the notebook works

The site is a bound object. Six **spreads** are routes inside the notebook
frame; each is one printed page. Project write-ups are **features** — their own
scrolling articles.

```
/            cover              /sketchbook   the sketchbook
/resume      timeline + PDF     /music        recordings & listening
/projects    projects           /contact      last page

/projects/[slug]    a write-up, with its repository card
```

The order of `src/data/spreads.ts` is the running order, and the folios are
printed from it.

`src/data/spreads.ts` is the table of contents: one array driving the footer
navigation, the contents overlay, the counters and the printed folios. **Adding
a section means adding an entry there and a route — nothing else.**

## Architecture

```
src/
  app/
    (notebook)/     the six spreads; share the bound frame + page turn
    (reading)/      project write-ups; scroll, but keep the publication's typography
  components/
    editorial/      type and apparatus: headers, figures, captions, prose
    notebook/       physical objects: the page, tape, stamps, the sketch viewer
    navigation/     footer nav, contents overlay, pagers
    github/ music/  the repository card, the covers panel, the listening strip
    ui/             primitives
  data/             the content: spreads, repositories, videos, music, sketches, resume
  hooks/            navigation, motion preference
  lib/              content loading and formatting
  styles/           tokens and material recipes
  types/            content schemas and integration contracts
content/            the prose: MDX, versioned in git
public/             scans, cover stills, the portrait, the resume PDF
```

### The design system

`src/styles/tokens.css` holds every value transcribed from the prototype, and
nothing else defines one. The important idea is `--nb-u`: **one design pixel**,
derived from the notebook's current width.

```css
--nb-u: calc(var(--nb-w) / 1720);
```

Every length in the system is a multiple of it — `calc(72 * var(--nb-u))`,
`--text-h1: calc(78 * var(--nb-u))`, `p-64` in Tailwind. The page therefore keeps
the design's proportions exactly at any viewport width, while every glyph stays
real, selectable, zoomable text. There is no `transform: scale()` anywhere.

Colours, families, the type ladder and spacing are exposed to Tailwind in
`src/app/globals.css`. Use the utilities (`text-h2`, `text-accent`, `font-mono`)
rather than raw values.

## Writing content

Git is the CMS. There is no admin, no database, no build hook.

### A project write-up

Create `content/projects/my-project.mdx`:

```mdx
---
title: Guitar Splitter
repo: guitar-splitter
idea: Mute the guitar in a song and play the part yourself.
date: 2026-08-30
---

Prose here.

<PullQuote>A sentence worth setting large.</PullQuote>

<Figure src="/photography/helsinki.jpg" alt="A grey street" caption="fig. 01" />

<MarginNote>An aside that sits in the margin.</MarginNote>

<Sketch id="sketch-07" caption="fig. 02 — the first pass" />

<Video id="dQw4w9WgXcQ" title="A cover" />
```

Frontmatter is validated against the schemas in `src/types/content.ts`. A typo
fails the build and names the file, rather than rendering a broken page.

Available in any MDX file: `Figure`, `Caption`, `MarginNote`, `PullQuote`,
`Note`, `Circled`, `Video`, `Sketch`, plus normal markdown, GFM tables and
syntax-highlighted code fences. Extending the vocabulary means adding a
component to `src/components/editorial/Mdx.tsx` — never editing a page.

`draft: true` shows a write-up in development and hides it in production.

### A project

Add the repository to `src/data/repositories.ts` — it appears on the projects
spread from there.

Write `content/projects/<slug>.mdx` only when you want a write-up, and give it
`repo: RepositoryName` so the prose finds its repository. **Do not retype the
description, languages, stars or commit date into the MDX** — those live in
`src/data/repositories.ts`, in one place.

### A sketch

Drop the scan in `public/sketches/` and add an entry to `src/data/sketches.ts`.

## There are no integrations

The publication calls nothing at render time. It once read the GitHub REST API
and the YouTube Data API on every request; between them that cost a token, a
Google Cloud project, two quotas and two ways for a page to arrive empty when a
service was slow, rate-limited or down. All of it served facts that change a few
times a year.

So the facts are written down, and refreshing one means editing a file:

| What | Where | Snapshot |
|---|---|---|
| Repositories | `src/data/repositories.ts` | 2 Sep 2026 — descriptions, language bytes, stars, topics, latest commit |
| Covers | `src/data/videos.ts` | 2 Sep 2026 — titles, durations, view counts, dates |
| Records | `src/data/music.ts` | chosen, not observed |
| Sketches | `src/data/sketches.ts` | — |

Images are local too: cover stills live in `public/covers/`, so `next.config.ts`
needs no `remotePatterns` and no outside host can fail. The site builds and runs
with an empty `.env.local` and works offline.

**Music was never an integration.** A "currently playing" feed would need
private-scope OAuth and would show whatever happened to be on; the record on the
spread is one Dilara picked.

### Projects come from `src/data/repositories.ts`

Every repository listed there becomes a project, carrying its description,
language breakdown, star count and last commit. **The order of that file is the
printed order** — leading with different work means moving a block, not
renumbering frontmatter.

An MDX file is *optional enrichment*: it adds the write-up and can override the
title or the one-line idea, but nothing about a repository is retyped into it. A
repo with no write-up still gets a full page — the repository card is the
article.

Adding a project means adding an entry to that file. Removing one means deleting
it; there is no exclusion list any more.

## Accessibility & motion

- Every navigation is a real link; the footer is a real `<nav>`.
- Left/right arrows turn spreads, except inside the sketchbook, which claims
  them to turn its own pages (`NavigationProvider`).
- The contents overlay is a modal dialog with a focus trap and Escape to close.
- All motion resolves to a plain fade under `prefers-reduced-motion: reduce`.
- Decoration — tape, crop marks, folios, the waveform — is `aria-hidden`.

## Checks

```bash
npx tsc --noEmit    # strict, with noUncheckedIndexedAccess
npm run lint
npm run build
```

## Secrets

There are none left to keep. No key, token or account is needed to build, run or
deploy this site. `.env.local` stays git-ignored regardless, and
`NEXT_PUBLIC_SITE_URL` — the canonical origin, which is public by definition —
is the only variable to set on the host.

## What is not built yet

Phase 4: contact form, resume PDF.
Phase 5: animation polish, mobile reflow layouts, performance pass.

The architecture already accommodates the longer list — movie and reading logs,
a photography archive, search, collections — as new entries in `data/spreads.ts`
plus a route. None of it needs restructuring.
