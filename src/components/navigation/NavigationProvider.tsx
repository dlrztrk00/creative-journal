"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface NavigationContextValue {
  /** Whether the contents overlay is open. */
  contentsOpen: boolean;
  openContents: () => void;
  closeContents: () => void;
  /**
   * True while an immersive view (the sketchbook) has taken over the arrow
   * keys, so the global spread navigation stops listening for them.
   */
  arrowsClaimed: boolean;
  claimArrows: () => () => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

/**
 * Shared navigation state for the notebook shell.
 *
 * Two things need coordinating across otherwise unrelated components: the
 * contents overlay (opened from the footer, closed from inside itself or by
 * Escape), and ownership of the left/right arrow keys — the sketchbook uses
 * them to turn its own pages, everywhere else they turn the whole spread.
 */
export function NavigationProvider({ children }: { children: ReactNode }) {
  const [contentsOpen, setContentsOpen] = useState(false);
  const [arrowClaims, setArrowClaims] = useState(0);

  const openContents = useCallback(() => setContentsOpen(true), []);
  const closeContents = useCallback(() => setContentsOpen(false), []);

  const claimArrows = useCallback(() => {
    setArrowClaims((n) => n + 1);
    return () => setArrowClaims((n) => Math.max(0, n - 1));
  }, []);

  const value = useMemo<NavigationContextValue>(
    () => ({
      contentsOpen,
      openContents,
      closeContents,
      arrowsClaimed: arrowClaims > 0,
      claimArrows,
    }),
    [contentsOpen, openContents, closeContents, arrowClaims, claimArrows],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextValue {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used inside <NavigationProvider>");
  }
  return context;
}

/**
 * Called by an immersive view that handles its own left/right keys. Releases
 * the claim automatically on unmount.
 */
export function useClaimArrowKeys(): void {
  const { claimArrows } = useNavigation();
  useEffect(() => claimArrows(), [claimArrows]);
}
