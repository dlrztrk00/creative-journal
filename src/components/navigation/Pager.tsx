import clsx from "clsx";
import { pad } from "@/data/spreads";

interface PagerProps {
  /** Singular noun for the thing being paged: "project", "entry", "cover". */
  noun: string;
  /** Zero-based position. */
  index: number;
  count: number;
  onPrevious: () => void;
  onNext: () => void;
  /** The sketchbook's pager sits on black stock. */
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Prev / counter / next, in the publication's mono.
 *
 * The prototype repeats this control on the projects and music
 * spreads; here it exists once. Disabled arms dim to 0.3 rather than
 * disappearing, so the reader can see where the run ends.
 */
export function Pager({
  noun,
  index,
  count,
  onPrevious,
  onNext,
  variant = "light",
  className,
}: PagerProps) {
  const atStart = index <= 0;
  const atEnd = index >= count - 1;
  const arm = variant === "dark" ? "text-paper" : "text-ink";

  return (
    <div
      className={clsx("flex items-center justify-center gap-24", className)}
      role="group"
      aria-label={`${noun} navigation`}
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={atStart}
        className={clsx("font-mono text-label", arm, atStart && "opacity-30")}
      >
        ‹ prev {noun}
      </button>
      <p aria-live="polite" className="font-mono text-label text-muted">
        {pad(index + 1)} / {pad(count)}
      </p>
      <button
        type="button"
        onClick={onNext}
        disabled={atEnd}
        className={clsx("font-mono text-label", arm, atEnd && "opacity-30")}
      >
        next {noun} ›
      </button>
    </div>
  );
}
