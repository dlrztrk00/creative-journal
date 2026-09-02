import clsx from "clsx";

/**
 * The printed folio in the corner of a page, e.g. "P.04".
 *
 * Decorative: the same information is announced by the footer navigation, so
 * this is hidden from assistive technology to avoid a duplicate reading.
 */
export function PageNumber({
  folio,
  side = "left",
}: {
  folio: string;
  side?: "left" | "right";
}) {
  return (
    <p
      aria-hidden
      className={clsx(
        "absolute font-mono text-folio tracking-meta text-faint",
        side === "left" ? "left-0" : "right-0",
      )}
      style={{ bottom: "calc(-20 * var(--nb-u))" }}
    >
      {folio}
    </p>
  );
}
