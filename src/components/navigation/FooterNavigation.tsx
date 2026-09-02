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
      className="flex items-center justify-between"
      style={{
        padding: "calc(18 * var(--nb-u)) calc(64 * var(--nb-u))",
        borderTop: "var(--rule-w) solid var(--ink)",
      }}
    >
      {atFirst || !previous ? (
        <span aria-disabled className={clsx(ARM, "opacity-30")}>
          ‹ prev
        </span>
      ) : (
        <Link
          href={previous.href}
          className={clsx(ARM, "hover:-translate-x-4")}
          rel="prev"
        >
          ‹ prev<span className="sr-only"> — {previous.name}</span>
        </Link>
      )}

      <button
        type="button"
        onClick={openContents}
        aria-haspopup="dialog"
        className="font-mono text-label tracking-label transition-opacity duration-200 hover:opacity-60"
      >
        {spread?.name ?? "Contents"} <span className="text-accent">—</span>{" "}
        {counter} · contents
      </button>

      {atLast || !next ? (
        <span aria-disabled className={clsx(ARM, "opacity-30")}>
          next ›
        </span>
      ) : (
        <Link
          href={next.href}
          className={clsx(ARM, "hover:translate-x-4")}
          rel="next"
        >
          next ›<span className="sr-only"> — {next.name}</span>
        </Link>
      )}
    </nav>
  );
}
