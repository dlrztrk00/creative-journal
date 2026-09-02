/**
 * Crop marks in the four corners of the cover, as on a printed proof.
 *
 * They register to the sheet, not to the text block, so they are positioned
 * against the page itself rather than inside its margins. Two are inked and two
 * are faint — the asymmetry is the design's, and it keeps the marks from
 * reading as a border.
 */
export function CornerTicks() {
  const size = "calc(14 * var(--nb-u))";
  const offset = "calc(20 * var(--nb-u))";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <span
        className="absolute"
        style={{
          top: offset,
          left: offset,
          width: size,
          height: size,
          borderTop: "var(--rule-w-strong) solid var(--ink)",
          borderLeft: "var(--rule-w-strong) solid var(--ink)",
        }}
      />
      <span
        className="absolute"
        style={{
          top: offset,
          right: offset,
          width: size,
          height: size,
          borderTop: "var(--rule-w-strong) solid var(--rule-strong)",
          borderRight: "var(--rule-w-strong) solid var(--rule-strong)",
        }}
      />
      <span
        className="absolute"
        style={{
          bottom: offset,
          left: offset,
          width: size,
          height: size,
          borderBottom: "var(--rule-w-strong) solid var(--rule-strong)",
          borderLeft: "var(--rule-w-strong) solid var(--rule-strong)",
        }}
      />
      <span
        className="absolute"
        style={{
          bottom: offset,
          right: offset,
          width: size,
          height: size,
          borderBottom: "var(--rule-w-strong) solid var(--ink)",
          borderRight: "var(--rule-w-strong) solid var(--ink)",
        }}
      />
    </div>
  );
}
