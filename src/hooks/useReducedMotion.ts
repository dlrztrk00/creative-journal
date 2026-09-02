"use client";

import { useCallback, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Whether the reader has asked for reduced motion.
 *
 * Framer Motion ships its own hook, but page-turn logic also needs the value
 * outside of animation props — to skip the sketchbook's two-phase turn, for
 * instance — so it is read once here and shared.
 *
 * A media query is external state, so it is read through
 * `useSyncExternalStore`: no effect, no cascading render, and the server
 * snapshot is `false` so markup matches on hydration.
 */
export function useReducedMotion(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const query = window.matchMedia(QUERY);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
