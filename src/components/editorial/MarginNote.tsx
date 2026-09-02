import clsx from "clsx";
import type { ReactNode } from "react";

/**
 * A note in the margin, set small and faint beside the column it annotates.
 *
 * On a narrow page there is no margin to sit in, so it falls back to an
 * indented aside under the paragraph rather than disappearing.
 */
export function MarginNote({
  children,
  side = "right",
  className,
}: {
  children: ReactNode;
  side?: "left" | "right";
  className?: string;
}) {
  return (
    <aside
      className={clsx(
        "font-mono text-micro leading-relaxed tracking-note text-faint",
        "xl:absolute xl:w-160",
        side === "right" ? "xl:right-[-190px]" : "xl:left-[-190px]",
        className,
      )}
      style={{ marginTop: "calc(8 * var(--nb-u))" }}
    >
      {children}
    </aside>
  );
}

/**
 * A sentence lifted out of the prose and set large in italic serif — the
 * publication's pull quote.
 */
export function PullQuote({
  children,
  attribution,
}: {
  children: ReactNode;
  attribution?: string;
}) {
  return (
    <figure
      style={{
        margin: "calc(40 * var(--nb-u)) 0",
        borderTop: "var(--rule-w) solid var(--accent)",
        borderBottom: "var(--rule-w) solid var(--accent)",
        padding: "calc(28 * var(--nb-u)) 0",
      }}
    >
      <blockquote className="font-display text-serif-sm italic leading-snug text-ink">
        {children}
      </blockquote>
      {attribution ? (
        <figcaption className="mt-8 font-mono text-micro tracking-label text-faint">
          — {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * A note in the author's own hand: short, italic, slightly off-angle.
 */
export function HandwrittenNote({
  children,
  rotate = -1.5,
  className,
}: {
  children: ReactNode;
  rotate?: number;
  className?: string;
}) {
  return (
    <p
      className={clsx(
        "font-display text-serif-sm italic text-accent",
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </p>
  );
}
