"use client";

import Link from "next/link";
import clsx from "clsx";
import { useSpreadNavigation } from "@/hooks/useSpreadNavigation";
import { useNavigation } from "./NavigationProvider";

const ARM =
  "font-mono text-label tracking-meta transition-transform duration-200 ease-[cubic-bezier(.16,1,.3,1)]";

/**
 * The rule at the foot of the notebook: turn back, open the contents, turn on.
 *
 * It persists across page turns — it lives in the notebook layout, not in any
 * page — and it is the site's primary navigation, so it is a real `<nav>` with
 * real links. Left/right arrow keys are bound here, once, for the whole shell.
 */
export function FooterNavigation() {
  const { spread, previous, next, counter, atFirst, atLast } =
    useSpreadNavigation(true);
  const { openContents } = useNavigation();

  return (
    <nav
      aria-label="Notebook pages"
      className="flex items-center justify-between gap-12 whitespace-nowrap"
      style={{
        // The horizontal margin follows the page's, so the arms sit under the
        // text above them rather than in from the edge of a narrow page.
        padding: "calc(18 * var(--nb-u)) calc(var(--page-pad-x) * var(--nb-u))",
        borderTop: "var(--rule-w) solid var(--ink)",
      }}
    >
      {atFirst || !previous ? (
        <span aria-disabled className={clsx(ARM, "opacity-30")}>
          ‹<span className="hidden md:inline"> prev</span>
        </span>
      ) : (
        <Link
          href={previous.href}
          className={clsx(ARM, "hover:-translate-x-4")}
          rel="prev"
        >
          ‹<span className="hidden md:inline"> prev</span>
          <span className="sr-only"> — {previous.name}</span>
        </Link>
      )}

      <button
        type="button"
        onClick={openContents}
        aria-haspopup="dialog"
        className="font-mono text-label tracking-label transition-opacity duration-200 hover:opacity-60"
      >
        <span className="hidden md:inline">
          {spread?.name ?? "Contents"} <span className="text-accent">—</span>{" "}
        </span>
        {counter} · contents
      </button>

      {atLast || !next ? (
        <span aria-disabled className={clsx(ARM, "opacity-30")}>
          <span className="hidden md:inline">next </span>›
        </span>
      ) : (
        <Link
          href={next.href}
          className={clsx(ARM, "hover:translate-x-4")}
          rel="next"
        >
          <span className="hidden md:inline">next </span>›
          <span className="sr-only"> — {next.name}</span>
        </Link>
      )}
    </nav>
  );
}
