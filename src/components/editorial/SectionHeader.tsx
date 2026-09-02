import type { ReactNode } from "react";
import clsx from "clsx";

interface SectionHeaderProps {
  /** The red section label at the left of the rule, e.g. "SKETCHBOOK". */
  label: string;
  /** The right-hand metadata. Free-form so pages can set live values. */
  meta?: ReactNode;
  /** The sketchbook prints on black stock and inverts the rule. */
  variant?: "light" | "dark";
  /** An optional smaller line beneath the rule, right-aligned. */
  note?: ReactNode;
  /** Heading level for the label. The page's own title carries h1. */
  as?: "h1" | "h2" | "p";
}

/**
 * The rule that opens every page: red section label, metadata, hairline beneath.
 *
 * This is the publication's masthead-in-miniature and appears on all eight
 * spreads. No page should draw its own.
 */
export function SectionHeader({
  label,
  meta,
  variant = "light",
  note,
  as: Tag = "p",
}: SectionHeaderProps) {
  const dark = variant === "dark";

  return (
    <header>
      <div
        className={clsx(
          "flex items-baseline justify-between font-mono text-label tracking-label",
          dark ? "text-[#999999]" : "text-muted",
        )}
        style={{
          borderBottom: `var(--rule-w) solid ${dark ? "var(--paper)" : "var(--ink)"}`,
          paddingBottom: "calc(14 * var(--nb-u))",
        }}
      >
        <Tag className="text-accent">{label}</Tag>
        {meta ? <p>{meta}</p> : null}
      </div>
      {note ? (
        // Clears the annotation ring that some headers hang below the rule.
        <p className="mt-20 text-right font-mono text-micro tracking-caption text-faint">
          {note}
        </p>
      ) : null}
    </header>
  );
}
