/**
 * The table of contents — the single registry that drives the footer navigation,
 * the contents overlay, the spread counters and the printed folio numbers.
 *
 * Adding a future section (movie log, reading log, photography archive) means
 * adding one entry here and one route. Nothing else needs to know the order.
 */

export interface Spread {
  /** Route path. */
  href: string;
  /** Name as printed in the footer nav and the contents overlay. */
  name: string;
  /** The red label in the page header rule. */
  label: string;
  /** The right-hand meta in the header rule. May be overridden per page. */
  meta?: string;
  /** Printed folio, e.g. "P.02". Derived from position but stated for clarity. */
  folio: string;
  /** The sketchbook prints on black stock. */
  variant: "light" | "dark";
  /** Sections whose items are listed as sub-entries in the contents overlay. */
  hasItems?: boolean;
}

export const SPREADS = [
  {
    href: "/",
    name: "Home",
    label: "COVER",
    meta: "ISSUE 01 · 2026",
    folio: "P.01",
    variant: "light",
  },
  {
    href: "/resume",
    name: "Resume",
    label: "RESUME",
    meta: "DILARA ÖZTÜRK",
    folio: "P.02",
    variant: "light",
  },
  {
    href: "/projects",
    name: "Projects",
    label: "PROJECTS",
    folio: "P.03",
    variant: "light",
    hasItems: true,
  },
  {
    href: "/sketchbook",
    name: "Sketchbook",
    label: "SKETCHBOOK",
    folio: "P.04",
    variant: "dark",
  },
  {
    href: "/music",
    name: "Music",
    label: "MUSIC",
    meta: "ON REPEAT",
    folio: "P.05",
    variant: "light",
  },
  {
    href: "/contact",
    name: "Contact",
    label: "CONTACT",
    meta: "LAST PAGE",
    folio: "P.06",
    variant: "light",
  },
] as const satisfies readonly Spread[];

export type SpreadHref = (typeof SPREADS)[number]["href"];

/**
 * The registry entry for a route.
 *
 * Pages used to index this array by position, which quietly reassigned a page's
 * identity whenever the running order changed. The parameter is typed against
 * the hrefs above, so a wrong one fails to compile rather than rendering the
 * wrong header.
 */
export function spread(href: SpreadHref): Spread {
  const found = SPREADS.find((entry) => entry.href === href);
  if (!found) throw new Error(`spreads: no entry for "${href}"`);
  return found;
}

/** Index of a route in the notebook, or -1 for routes outside it (detail pages). */
export function spreadIndexOf(pathname: string): number {
  return SPREADS.findIndex((s) => s.href === pathname);
}

/**
 * The spread a pathname belongs to. Detail routes (`/projects/foo`) resolve to
 * their parent section so the chrome stays correct while reading an article.
 */
export function spreadFor(pathname: string): Spread | undefined {
  const exact = SPREADS.find((s) => s.href === pathname);
  if (exact) return exact;
  return SPREADS.find((s) => s.href !== "/" && pathname.startsWith(`${s.href}/`));
}

/** "03 / 08" — the counter printed in the footer nav. */
export function spreadCounter(index: number): string {
  return `${pad(index + 1)} / ${pad(SPREADS.length)}`;
}

/** Zero-padded two-digit number, as used throughout the publication. */
export function pad(n: number): string {
  return String(n).padStart(2, "0");
}
