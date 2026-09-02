import clsx from "clsx";

interface StampProps {
  /** The upper line, e.g. "FI". */
  line1: string;
  /** The lower line, e.g. "2025". Omit for a stamp that carries only a date. */
  line2?: string;
  /** Design pixels. The design uses 52 on the resume and 46 on contact. */
  size?: number;
  rotate?: number;
  className?: string;
}

/**
 * A rubber stamp: a rotated red ring with two lines of mono inside.
 *
 * Marks a place and a date — an exchange, an issue, a city. Announced to
 * screen readers as its two lines, since it does carry information.
 */
export function Stamp({
  line1,
  line2,
  size = 52,
  rotate = -8,
  className,
}: StampProps) {
  return (
    <span
      className={clsx(
        "flex items-center justify-center rounded-full opacity-75",
        className,
      )}
      style={{
        width: `calc(${size} * var(--nb-u))`,
        height: `calc(${size} * var(--nb-u))`,
        border: "var(--rule-w-strong) solid var(--accent)",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <span className="text-center font-mono text-stamp leading-tight tracking-caption text-accent">
        {line1}
        {line2 ? (
          <>
            <br />
            {line2}
          </>
        ) : null}
      </span>
    </span>
  );
}
