import type { Sketch } from "@/types/content";

/**
 * The sketchbook's contents, in binding order.
 *
 * Scans live in `public/sketches/` and keep their original numbering so new
 * pages can be dropped in without renaming anything. Captions, dates and media
 * are metadata: fill them in as they are known — the viewer degrades to a bare
 * folio when they are absent.
 *
 * The first printed folio is 012, matching the physical notebook.
 */

const FIRST_FOLIO = 12;

/** The number printed in the corner of a page, e.g. "014". */
export function folioFor(index: number): string {
  return String(FIRST_FOLIO + index).padStart(3, "0");
}

function sketch(n: number, meta: Partial<Sketch> = {}): Sketch {
  return {
    id: `sketch-${String(n).padStart(2, "0")}`,
    src: `/sketches/${n}.jpeg`,
    alt: meta.caption ?? `Sketchbook page ${n}`,
    ...meta,
  };
}

export const SKETCHES: Sketch[] = Array.from({ length: 22 }, (_, i) =>
  sketch(i + 1),
);

/** Pages are bound in pairs; the viewer shows one spread at a time. */
export const SKETCH_SPREAD_SIZE = 2;

export const SKETCH_SPREAD_COUNT = Math.ceil(
  SKETCHES.length / SKETCH_SPREAD_SIZE,
);
