/**
 * Publication masthead and outbound links. Everything here is content, not code.
 */

export const SITE = {
  name: "Dilara Öztürk",
  title: "Dilara Öztürk — Creative Journal",
  description:
    "A creative journal by Dilara Öztürk: software development, sketches and music, kept in one notebook.",
  issue: "ISSUE 01 · 2026",
  tagline: "Creative Journal",
  disciplines: ["SOFTWARE DEVELOPMENT", "SKETCHES", "MUSIC"],
  locale: "en",
  /** Set to the production origin before deploying; used for canonical + OG URLs. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  githubUser: "dlrztrk00",
} as const;

export interface OutboundLink {
  label: string;
  href: string;
  /** Screen-reader description, since the visible labels are terse. */
  description: string;
}

export const LINKS = [
  {
    label: "email",
    href: "mailto:dilara.ozturk@ug.bilkent.edu.tr",
    description: "Email Dilara Öztürk",
  },
  {
    label: "github",
    href: "https://github.com/dlrztrk00",
    description: "Dilara Öztürk on GitHub",
  },
  {
    label: "youtube",
    href: "https://www.youtube.com/@dilaraozturk00",
    description: "Dilara Öztürk on YouTube",
  },
  {
    label: "tiktok",
    href: "https://www.tiktok.com/@dlrztrk00",
    description: "Dilara Öztürk on TikTok",
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/dilara-%C3%B6zt%C3%BCrk-021122250/",
    description: "Dilara Öztürk on LinkedIn",
  },
] as const satisfies readonly OutboundLink[];

/**
 * One outbound link by label, for the pages that want a single link rather than
 * the whole list — the music spread points at TikTok beside its cover run.
 *
 * The parameter is typed against the labels above, so renaming an entry breaks
 * the call site at compile time instead of silently rendering nothing.
 */
export function link(label: (typeof LINKS)[number]["label"]): OutboundLink {
  const found = LINKS.find((candidate) => candidate.label === label);
  if (!found) throw new Error(`site: no link labelled "${label}"`);
  return found;
}

/**
 * The subset a reader of the resume wants: where the work and the professional
 * record live. Derived from LINKS so a URL is never written twice.
 */
export const PROFESSIONAL_LINKS = LINKS.filter((link) =>
  ["linkedin", "github", "email"].includes(link.label),
);
