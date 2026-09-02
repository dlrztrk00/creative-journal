/**
 * The publication's printed ornaments.
 *
 * Drawn as inline SVG rather than shipped as bitmaps: they are line art, so
 * they stay crisp at any notebook width, cost no request, and take their
 * colours from the palette instead of baking them into a file. Every stroke is
 * expressed in the drawing's own viewBox, and `--nb-u` scales the whole thing
 * through the width set at the call site.
 *
 * All three are decoration and say nothing a reader needs, so each is
 * `aria-hidden`.
 */

interface OrnamentProps {
  /** Width in design pixels; the height follows the drawing's ratio. */
  width: number;
  className?: string;
  style?: React.CSSProperties;
}

function size(width: number) {
  return { width: `calc(${width} * var(--nb-u))`, height: "auto" };
}

/**
 * The star on the cover — a four-point sparkle with concave sides, the shape a
 * pen makes when it draws a glint rather than a heraldic star.
 */
export function StarOrnament({ width, className, style }: OrnamentProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      style={{ ...size(width), ...style }}
    >
      {/* The glint: each arm is pulled to the centre by a quadratic curve. */}
      <path
        d="M50 2 Q56 38 62 44 Q68 50 98 50 Q68 50 62 56 Q56 62 50 98 Q44 62 38 56 Q32 50 2 50 Q32 50 38 44 Q44 38 50 2Z"
        fill="var(--accent)"
      />
      {/* A smaller, offset second glint, as the design repeats its motifs. */}
      <path
        d="M82 8 Q84 20 86 22 Q88 24 98 25 Q88 26 86 28 Q84 30 82 42 Q80 30 78 28 Q76 26 66 25 Q76 24 78 22 Q80 20 82 8Z"
        fill="var(--ink)"
        opacity="0.75"
      />
    </svg>
  );
}

/**
 * The amp on the music spread — a combo cabinet in hairline, drawn face-on:
 * handle, grille cloth, control panel, feet.
 */
export function AmpOrnament({ width, className, style }: OrnamentProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      style={{ ...size(width), ...style }}
      stroke="var(--ink)"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      {/* handle */}
      <path d="M84 16 q16 -10 32 0" />
      <path d="M84 16 v5 M116 16 v5" />

      {/* cabinet */}
      <rect x="24" y="22" width="152" height="150" rx="5" />

      {/* control panel, with the top plate the knobs sit on */}
      <rect x="36" y="34" width="128" height="26" rx="3" />
      {[52, 70, 88, 106, 124, 142].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={47} r="5.5" />
          {/* each knob turned to a different setting */}
          <path d={`M${cx} 47 L${cx + (cx % 4 === 0 ? 3 : -3)} ${43.5}`} strokeWidth="1.2" />
        </g>
      ))}

      {/* grille cloth: a woven field, drawn as a loose cross-hatch */}
      <rect x="36" y="70" width="128" height="88" rx="3" />
      <g stroke="var(--rule-strong)" strokeWidth="0.9">
        {Array.from({ length: 11 }, (_, i) => 40 + i * 12).map((x) => (
          <path key={`v${x}`} d={`M${x} 70 L${x} 158`} />
        ))}
        {Array.from({ length: 7 }, (_, i) => 74 + i * 12).map((y) => (
          <path key={`h${y}`} d={`M36 ${y} L164 ${y}`} />
        ))}
      </g>

      {/* the badge in the corner of the cloth, in the publication's red */}
      <rect
        x="128"
        y="140"
        width="28"
        height="11"
        rx="2"
        fill="var(--accent)"
        stroke="none"
      />

      {/* feet */}
      <path d="M44 172 v8 M156 172 v8" />

      {/* the cable, running off the page */}
      <path d="M176 150 q18 6 20 22" stroke="var(--accent)" strokeWidth="1.8" />
    </svg>
  );
}
