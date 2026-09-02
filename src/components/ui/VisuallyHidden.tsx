import type { ReactNode } from "react";

/**
 * Text available to assistive technology but not painted.
 *
 * The publication's labels are deliberately terse ("github ↗", "‹ prev"), so
 * most of them need a fuller spoken name alongside.
 */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}
