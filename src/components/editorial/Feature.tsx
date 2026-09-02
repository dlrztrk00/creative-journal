import type { ReactNode } from "react";
import Link from "next/link";
import { SectionHeader } from "./SectionHeader";
import { Prose } from "./Prose";

interface FeatureProps {
  /** The section this piece belongs to, e.g. "PROJECTS". */
  label: string;
  /** The section's index page, to return to. */
  backHref: string;
  backLabel: string;
  meta?: ReactNode;
  title: string;
  standfirst?: ReactNode;
  /** Date, reading time, tags — the line under the headline. */
  byline?: ReactNode;
  children: ReactNode;
  /** Printed after the article: the next piece, related work, and so on. */
  footer?: ReactNode;
}

/**
 * A feature: a project write-up, set as a printed article.
 *
 * Unlike a spread, a feature scrolls — an article is as long as it needs to be
 * — but it keeps the publication's paper, rules and type so that reading one
 * still feels like being inside the notebook.
 */
export function Feature({
  label,
  backHref,
  backLabel,
  meta,
  title,
  standfirst,
  byline,
  children,
  footer,
}: FeatureProps) {
  return (
    <div className="flex min-h-svh justify-center">
      <article
        className="page-shadow w-full bg-paper"
        style={{
          maxWidth: "calc(1100 * var(--nb-u))",
          padding:
            "calc(40 * var(--nb-u)) calc(96 * var(--nb-u)) calc(72 * var(--nb-u))",
        }}
      >
        <SectionHeader label={label} meta={meta} />

        <header style={{ marginTop: "calc(72 * var(--nb-u))" }}>
          <h1 className="font-display text-h2 leading-[1.08] text-ink">
            {title}
          </h1>
          {standfirst ? (
            <p
              className="font-display text-serif-sm italic text-[#333333]"
              style={{ marginTop: "calc(20 * var(--nb-u))" }}
            >
              {standfirst}
            </p>
          ) : null}
          {byline ? (
            <p
              className="font-mono text-meta tracking-meta text-muted"
              style={{ marginTop: "calc(24 * var(--nb-u))" }}
            >
              {byline}
            </p>
          ) : null}
        </header>

        <div
          style={{
            marginTop: "calc(48 * var(--nb-u))",
            paddingTop: "calc(40 * var(--nb-u))",
            borderTop: "var(--rule-w) solid var(--rule)",
          }}
        >
          <Prose>{children}</Prose>
        </div>

        <footer
          className="flex items-baseline justify-between"
          style={{
            marginTop: "calc(64 * var(--nb-u))",
            paddingTop: "calc(24 * var(--nb-u))",
            borderTop: "var(--rule-w) solid var(--ink)",
          }}
        >
          <Link href={backHref} className="font-mono text-label tracking-meta">
            ‹ back to {backLabel}
          </Link>
          {footer}
        </footer>
      </article>
    </div>
  );
}
