import { z } from "zod";

/**
 * Content contracts.
 *
 * Git is the CMS: every piece of prose lives in `content/**.mdx` and every
 * structured list lives in `src/data/*.ts`. These schemas are the boundary
 * between the filesystem and the application — frontmatter that does not match
 * fails the build rather than rendering a half-broken page.
 */

/** A tag as authored in frontmatter: lowercase, hyphenated, no spaces. */
export const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be a lowercase hyphenated slug");

/**
 * ISO date (YYYY-MM-DD), always handed back as a string.
 *
 * YAML parses an unquoted `2026-07-19` into a `Date`, so authors do not have to
 * remember quotes: both spellings are accepted and normalised here.
 */
export const isoDateSchema = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be an ISO date, e.g. 2026-07-19"),
);

// ---------------------------------------------------------------- projects

export const projectFrontmatterSchema = z.object({
  title: z.string().min(1),
  /**
   * Only for projects with no repository — GitHub's own language breakdown is
   * used whenever `repo` is set, so this should stay empty for code projects.
   */
  tech: z.array(z.string().min(1)).default([]),
  /** Overrides the repository description as the one-line idea on the spread. */
  idea: z.string().min(1),
  /**
   * GitHub repository name. The GitHub adapter hydrates description, languages
   * and last-commit data from this — never hand-maintain those fields.
   */
  repo: z.string().min(1).optional(),
  /** Explicit link, for projects that are not on GitHub. */
  link: z.string().url().optional(),
  date: isoDateSchema,
  /** Ordering weight; lower sorts first. Falls back to date. */
  order: z.number().int().optional(),
  featured: z.boolean().default(false),
  /** Cover image path under /public. */
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
  summary: z.string().optional(),
  draft: z.boolean().default(false),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export interface Project extends ProjectFrontmatter {
  slug: string;
  /** Raw MDX body, compiled at render time. */
  body: string;
}

// --------------------------------------------------------------- sketchbook

export interface Sketch {
  /** Stable id, used in deep links. */
  id: string;
  /** Path under /public. */
  src: string;
  alt: string;
  caption?: string;
  /** ISO date the sketch was made, when known. */
  date?: string;
  medium?: string;
  /** Where it was drawn. Shows in the sketch metadata line. */
  place?: string;
  /** Reserved for future categorisation (monthly collections, themes). */
  collection?: string;
  /**
   * Intrinsic size, when known. Sketches render into a fixed page area with
   * `fill`, so this is optional — supply it only if a scan needs its own ratio.
   */
  width?: number;
  height?: number;
}

// ------------------------------------------------------------------ resume

export type TimelineKind =
  | "education"
  | "experience"
  | "internship"
  | "exchange"
  | "award"
  | "project";

export interface TimelineEvent {
  id: string;
  kind: TimelineKind;
  /** Display string exactly as it should read: "2022–2027", "JUN–JUL 2025". */
  period: string;
  /** Used only for sorting; the display string is `period`. */
  sortDate: string;
  title: string;
  organisation: string;
  location?: string;
  detail?: string;
  /** An optional rubber stamp, e.g. { line1: "FI", line2: "2025" }. */
  stamp?: { line1: string; line2: string };
  current?: boolean;
}

// ------------------------------------------------------------------- music

/**
 * A record chosen for the music spread.
 *
 * Deliberately not a Spotify payload: the spread shows what Dilara picks, not
 * what a service observed, so this is plain editorial data kept in `data/music.ts`.
 */
export interface MusicRecord {
  title: string;
  artist: string;
  album: string;
  year?: number;
  /** Sleeve art under /public, or null for the design's placeholder tile. */
  sleeve: string | null;
  /** Somewhere to hear it. Any service; nothing reads this but the reader. */
  url?: string;
  /** A line on why this one, printed with the featured record. */
  note?: string;
}
