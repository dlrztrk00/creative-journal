import clsx from "clsx";

interface FigureCaptionProps {
  /** The left-hand caption, e.g. "fig. 01 — concept sketch". */
  children: React.ReactNode;
  /** An optional right-hand cross-reference, e.g. "cf. sketchbook, pg. 014". */
  crossReference?: React.ReactNode;
  variant?: "light" | "dark";
  className?: string;
}

/**
 * The line beneath a figure: what it is on the left, where else to look on the
 * right. Set in the publication's smallest mono, in the faint ink used for all
 * apparatus.
 */
export function FigureCaption({
  children,
  crossReference,
  variant = "light",
  className,
}: FigureCaptionProps) {
  return (
    <figcaption
      className={clsx(
        "flex justify-between font-mono text-folio tracking-note",
        variant === "dark" ? "text-paper/55" : "text-faint",
        className,
      )}
      style={{ marginTop: "calc(10 * var(--nb-u))" }}
    >
      <span>{children}</span>
      {crossReference ? <span>{crossReference}</span> : null}
    </figcaption>
  );
}
