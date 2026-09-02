import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

interface PlaceholderTileProps {
  /** What belongs here, e.g. "portrait — your photo". */
  label: string;
  /** CSS aspect ratio, e.g. "4 / 5". */
  ratio?: string;
  /** A boxed label reads as a pasted-in slug; plain reads as a caption. */
  boxed?: boolean;
  /** Tape, captions and anything else layered on the tile. */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * A reserved space on the page, printed on ruled paper stock with a hairline
 * border — the design's own convention for media that has not landed yet.
 *
 * Deliberately not a grey box: it should look like part of the publication, so
 * an unfinished page still reads as designed. Swap for `EditorialImage` when
 * the real scan or photograph arrives.
 */
export function PlaceholderTile({
  label,
  ratio,
  boxed = false,
  children,
  className,
  style,
}: PlaceholderTileProps) {
  return (
    <div
      className={clsx(
        "paper-stock relative flex items-center justify-center",
        className,
      )}
      style={{
        aspectRatio: ratio,
        border: "var(--rule-w) solid var(--ink)",
        ...style,
      }}
    >
      <span
        className={clsx(
          "font-mono text-caption tracking-meta",
          boxed ? "bg-paper text-muted" : "text-faint",
        )}
        style={
          boxed
            ? {
                padding: "calc(5 * var(--nb-u)) calc(12 * var(--nb-u))",
                border: "var(--rule-w) solid var(--rule-strong)",
              }
            : undefined
        }
      >
        {label}
      </span>
      {children}
    </div>
  );
}
