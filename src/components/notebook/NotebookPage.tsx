import type { ReactNode } from "react";
import clsx from "clsx";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { PageNumber } from "@/components/editorial/PageNumber";
import { CornerTicks } from "./CornerTicks";
import type { Spread } from "@/data/spreads";

interface NotebookPageProps {
  /** The registry entry for this section. Supplies label, folio and stock. */
  spread: Spread;
  /** Overrides the registry's header metadata with a live value. */
  meta?: ReactNode;
  /** A smaller line beneath the header rule. */
  note?: ReactNode;
  /** Suppress the printed folio (the cover carries none). */
  hideFolio?: boolean;
  /** Folio sits bottom-left by default; About prints on the right. */
  folioSide?: "left" | "right";
  /** Roomier cover padding vs. the standard interior page. */
  padding?: "cover" | "interior";
  /** Print crop marks in the sheet's corners. The cover carries them. */
  cropMarks?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * A single page of the publication: the printed surface inside the notebook.
 *
 * It owns the page's stock, margins, opening rule and folio, so that every
 * route composes chrome identically and no page re-implements it. The notebook
 * object itself — the paper, its shadow, the footer navigation — belongs to
 * `NotebookFrame` in the (notebook) layout, because it persists across turns.
 */
export function NotebookPage({
  spread,
  meta,
  note,
  hideFolio = false,
  folioSide = "left",
  padding = "interior",
  cropMarks = false,
  className,
  children,
}: NotebookPageProps) {
  const dark = spread.variant === "dark";

  return (
    <article
      className={clsx(
        "relative box-border flex h-full w-full flex-col",
        dark ? "bg-page-dark text-paper" : "bg-paper text-ink",
        className,
      )}
      style={
        // The margins are tokens rather than literals because a portrait phone
        // page needs far narrower ones — 72 design pixels is 4% of the desktop
        // canvas and 17% of the phone's. See --page-pad-* in tokens.css.
        padding === "cover"
          ? {
              padding:
                "calc((var(--page-pad-y) - 4) * var(--nb-u)) calc((var(--page-pad-x) - 8) * var(--nb-u)) 0",
            }
          : {
              padding:
                "calc(var(--page-pad-y) * var(--nb-u)) calc(var(--page-pad-x) * var(--nb-u)) calc((var(--page-pad-y) + 4) * var(--nb-u))",
            }
      }
    >
      {cropMarks ? <CornerTicks /> : null}

      <SectionHeader
        label={spread.label}
        meta={meta ?? spread.meta}
        variant={spread.variant}
        note={note}
      />

      <div className="relative flex-1">{children}</div>

      {hideFolio ? null : <PageNumber folio={spread.folio} side={folioSide} />}
    </article>
  );
}
