"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SPREADS, pad } from "@/data/spreads";
import { useNavigation } from "./NavigationProvider";

export interface ContentsItem {
  label: string;
  href: string;
}

export interface ContentsSectionItems {
  /** Section href these items belong to, e.g. "/projects". */
  section: string;
  items: ContentsItem[];
}

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The publication's table of contents, as a full-bleed overlay.
 *
 * Sections come from the spread registry; the sub-entries under Projects are
 * passed in from the server, so the index always reflects the resolved project
 * list — nothing here is hand-maintained.
 */
export function ContentsOverlay({
  sections = [],
}: {
  sections?: ContentsSectionItems[];
}) {
  const { contentsOpen, closeContents } = useNavigation();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  // Turning to a page closes the index behind you.
  useEffect(() => {
    closeContents();
  }, [pathname, closeContents]);

  const trapFocus = useCallback((event: KeyboardEvent) => {
    const panel = panelRef.current;
    if (!panel || event.key !== "Tab") return;

    const nodes = Array.from(
      panel.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter((node) => node.offsetParent !== null);
    if (nodes.length === 0) return;

    const first = nodes[0]!;
    const last = nodes[nodes.length - 1]!;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    if (!contentsOpen) return;

    restoreFocusTo.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeContents();
        return;
      }
      trapFocus(event);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      restoreFocusTo.current?.focus();
    };
  }, [contentsOpen, closeContents, trapFocus]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Contents"
      aria-hidden={!contentsOpen}
      inert={!contentsOpen}
      className="absolute inset-0 z-50 box-border overflow-y-auto bg-paper transition-opacity duration-300 ease-[cubic-bezier(.16,1,.3,1)]"
      style={{
        padding: "calc(36 * var(--nb-u)) calc(64 * var(--nb-u))",
        opacity: contentsOpen ? 1 : 0,
        pointerEvents: contentsOpen ? "auto" : "none",
      }}
    >
      <div
        className="mb-8 flex items-baseline justify-between font-mono text-meta tracking-label text-muted"
        style={{
          borderBottom: "var(--rule-w) solid var(--ink)",
          paddingBottom: "calc(12 * var(--nb-u))",
        }}
      >
        <h2>CONTENTS</h2>
        <button
          type="button"
          onClick={closeContents}
          className="text-ink transition-opacity hover:opacity-60"
        >
          close ✕
        </button>
      </div>

      <ul>
        {SPREADS.map((spread, i) => {
          const items =
            sections.find((s) => s.section === spread.href)?.items ?? [];

          return (
            <li
              key={spread.href}
              style={{
                borderBottom: "var(--rule-w) solid var(--rule)",
                padding: "calc(18 * var(--nb-u)) calc(4 * var(--nb-u))",
              }}
            >
              <Link
                href={spread.href}
                className="group flex items-baseline justify-between transition-[padding] duration-250 ease-[cubic-bezier(.16,1,.3,1)] hover:pl-16"
              >
                <span className="font-display text-contents text-ink">
                  {spread.name}
                </span>
                <span className="font-mono text-label text-muted">
                  {pad(i + 1)}
                </span>
              </Link>

              {items.length > 0 ? (
                <ul className="mt-8 flex flex-wrap gap-18">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="font-mono text-label text-muted transition-colors hover:text-accent"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
