import Image from "next/image";
import clsx from "clsx";
import type { ReactNode } from "react";
import { FigureCaption } from "./FigureCaption";

interface EditorialImageProps {
  src: string;
  alt: string;
  /** CSS aspect ratio for the plate, e.g. "4 / 5". */
  ratio?: string;
  caption?: ReactNode;
  crossReference?: ReactNode;
  /** Responsive sizes hint. Defaults to the width of a half-page plate. */
  sizes?: string;
  /** Above-the-fold plates should not lazy-load. */
  priority?: boolean;
  /** Degrees of tilt, as if laid on the page by hand. */
  rotate?: number;
  /** Tape, paper clips, stamps layered over the plate. */
  children?: ReactNode;
  variant?: "light" | "dark";
  className?: string;
}

/**
 * A photograph or scan set on the page as a plate: hairline border, optional
 * tilt, caption beneath.
 *
 * Always `next/image` with an explicit `sizes`, so the publication never ships
 * a scan larger than the plate it lands in.
 */
export function EditorialImage({
  src,
  alt,
  ratio = "4 / 5",
  caption,
  crossReference,
  sizes = "(max-width: 900px) 90vw, 45vw",
  priority = false,
  rotate,
  children,
  variant = "light",
  className,
}: EditorialImageProps) {
  return (
    <figure className={className}>
      <div
        className="paper-stock relative overflow-hidden"
        style={{
          aspectRatio: ratio,
          border: "var(--rule-w) solid var(--ink)",
          transform: rotate ? `rotate(${rotate}deg)` : undefined,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        {children}
      </div>
      {caption || crossReference ? (
        <FigureCaption crossReference={crossReference} variant={variant}>
          {caption}
        </FigureCaption>
      ) : null}
    </figure>
  );
}

/** A plate that fills its parent exactly, used inside the sketch viewer. */
export function BleedImage({
  src,
  alt,
  sizes,
  priority,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={clsx("object-cover", className)}
    />
  );
}
