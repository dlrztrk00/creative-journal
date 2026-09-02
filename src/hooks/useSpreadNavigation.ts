"use client";

import { useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  SPREADS,
  spreadCounter,
  spreadFor,
  type Spread,
} from "@/data/spreads";
import { useNavigation } from "@/components/navigation/NavigationProvider";

export interface SpreadNavigation {
  /** The section the current route belongs to, including detail routes. */
  spread: Spread | undefined;
  index: number;
  previous: Spread | undefined;
  next: Spread | undefined;
  atFirst: boolean;
  atLast: boolean;
  /** "03 / 08". */
  counter: string;
  goPrevious: () => void;
  goNext: () => void;
}

/** Ignore key handling while the reader is typing. */
function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
  );
}

/**
 * Where we are in the notebook, and how to turn to the page either side.
 *
 * Ordering comes from `data/spreads.ts`, so a new section joins the navigation
 * simply by being registered there.
 *
 * @param bindKeys bind left/right arrows to turn pages. Only the footer
 * navigation should pass true, so the listener exists exactly once.
 */
export function useSpreadNavigation(bindKeys = false): SpreadNavigation {
  const pathname = usePathname();
  const router = useRouter();
  const { arrowsClaimed, contentsOpen } = useNavigation();

  const spread = useMemo(() => spreadFor(pathname), [pathname]);
  const index = spread ? SPREADS.indexOf(spread as (typeof SPREADS)[number]) : -1;

  const previous = index > 0 ? SPREADS[index - 1] : undefined;
  const next =
    index >= 0 && index < SPREADS.length - 1 ? SPREADS[index + 1] : undefined;

  const goPrevious = useCallback(() => {
    if (previous) router.push(previous.href);
  }, [previous, router]);

  const goNext = useCallback(() => {
    if (next) router.push(next.href);
  }, [next, router]);

  useEffect(() => {
    if (!bindKeys || arrowsClaimed || contentsOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [bindKeys, arrowsClaimed, contentsOpen, goPrevious, goNext]);

  return {
    spread,
    index,
    previous,
    next,
    atFirst: index <= 0,
    atLast: index === SPREADS.length - 1,
    counter: index >= 0 ? spreadCounter(index) : "",
    goPrevious,
    goNext,
  };
}
