interface CircledProps {
  children: React.ReactNode;
  /** How far the ring stands off the text horizontally, in design pixels. */
  padX?: number;
  /** How far it stands off vertically, in design pixels. */
  padY?: number;
}

/**
 * Text with a hand-drawn ellipse around it, as if circled in pen.
 *
 * The ring is inset from the text rather than given a fixed width, so it fits
 * whatever it wraps — a three-word date and a repository count both get a ring
 * that looks drawn around *them*, and nothing has to be re-measured when the
 * content changes. Decorative: the emphasis is carried by the text itself.
 */
export function Circled({ children, padX = 20, padY = 12 }: CircledProps) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 200 46"
        preserveAspectRatio="none"
        className="pointer-events-none absolute"
        style={{
          insetInline: `calc(${-padX} * var(--nb-u))`,
          insetBlock: `calc(${-padY} * var(--nb-u))`,
        }}
      >
        <path
          d="M10 23 C10 8 45 2 100 2 C155 2 190 6 189 23 C188 40 148 44 100 44 C48 44 10 38 10 23 Z"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

/**
 * A short curved arrow pointing right, drawn in pen. Sits in the margin beside
 * a call to action, pointing at it.
 */
export function CurvedArrow({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 34 22"
      className={className}
      style={{
        width: "calc(34 * var(--nb-u))",
        height: "calc(22 * var(--nb-u))",
        overflow: "visible",
        ...style,
      }}
    >
      <path
        d="M2 18 C10 6 20 3 30 6"
        stroke="var(--accent)"
        strokeWidth="1.3"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M25 2 L31 6 L26 12"
        stroke="var(--accent)"
        strokeWidth="1.3"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
