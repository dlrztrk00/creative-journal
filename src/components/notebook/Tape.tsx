import clsx from "clsx";
import type { CSSProperties } from "react";

interface TapeProps {
  /** Where the strip sits on the edge of the thing it holds down. */
  position?: "top-left" | "top-right" | "top-center";
  /** Degrees. Small, uneven angles read as hand-placed. */
  rotate?: number;
  /** Design pixels. */
  width?: number;
  height?: number;
  /** Tape on a dark page has no border and a softer fill. */
  variant?: "light" | "dark";
  className?: string;
}

const PLACEMENT: Record<NonNullable<TapeProps["position"]>, CSSProperties> = {
  "top-left": { top: "calc(-9 * var(--nb-u))", left: "calc(32 * var(--nb-u))" },
  "top-right": { top: "calc(-9 * var(--nb-u))", right: "calc(32 * var(--nb-u))" },
  "top-center": {
    top: "calc(-10 * var(--nb-u))",
    left: "50%",
    marginLeft: "calc(-38 * var(--nb-u))",
  },
};

/**
 * A strip of washi tape holding a photograph or sketch to the page.
 *
 * Purely material — hidden from assistive technology, since it says nothing.
 */
export function Tape({
  position = "top-left",
  rotate = -3,
  width = 64,
  height = 20,
  variant = "light",
  className,
}: TapeProps) {
  return (
    <span
      aria-hidden
      className={clsx("absolute block", variant === "light" && "tape-strip", className)}
      style={{
        ...PLACEMENT[position],
        width: `calc(${width} * var(--nb-u))`,
        height: `calc(${height} * var(--nb-u))`,
        transform: `rotate(${rotate}deg)`,
        ...(variant === "dark"
          ? {
              background: "rgb(246 243 238 / 0.5)",
              boxShadow: "0 1px 2px rgb(0 0 0 / 0.3)",
            }
          : {}),
      }}
    />
  );
}
