import type { ReactNode } from "react";
import clsx from "clsx";

/**
 * The reading column: the typographic environment an MDX article renders into.
 *
 * Measure, leading and the type ladder all come from the design system, so an
 * article looks like the rest of the publication without any per-page styling.
 */
export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "prose max-w-none font-body text-body leading-relaxed text-ink",
        "prose-headings:font-display prose-headings:font-normal prose-headings:text-ink",
        "prose-h2:text-h3 prose-h3:text-serif-sm prose-h4:text-entry",
        "prose-p:font-body prose-p:text-body prose-p:text-ink",
        "prose-a:text-ink prose-a:no-underline",
        "prose-strong:font-semibold prose-strong:text-ink",
        "prose-em:font-display prose-em:italic",
        "prose-li:font-body prose-li:text-body",
        "prose-hr:border-rule",
        "prose-blockquote:border-l-0 prose-blockquote:pl-0 prose-blockquote:font-display prose-blockquote:italic",
        "prose-code:font-mono prose-code:text-body-sm prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:bg-page-dark prose-pre:font-mono prose-pre:text-body-sm",
        "prose-figcaption:font-mono prose-figcaption:text-folio prose-figcaption:text-faint",
        className,
      )}
    >
      {children}
    </div>
  );
}
