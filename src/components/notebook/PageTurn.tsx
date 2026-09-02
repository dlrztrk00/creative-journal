"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The motion of turning to a new page: the sheet slides a little and settles.
 *
 * Rendered from the notebook's `template.tsx`, which React remounts on every
 * navigation — so the entrance plays without the exit-animation gymnastics
 * `AnimatePresence` needs in the App Router. Paper does not bounce, so the
 * easing is a single decelerating curve and nothing overshoots.
 */
export function PageTurn({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="absolute inset-0"
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: reduced ? 0.15 : 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
