"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import type { Sketch } from "@/types/content";
import { folioFor } from "@/data/sketches";
import { pad } from "@/data/spreads";
import { Tape } from "./Tape";
import { useClaimArrowKeys } from "@/components/navigation/NavigationProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** How far a swipe must travel before it counts as a page turn, in pixels. */
const SWIPE_THRESHOLD = 50;

type Turn = "prev" | "next" | null;

/**
 * The sketchbook: a real notebook, opened flat, turned a spread at a time.
 *
 * Deliberately not a gallery. Two pages face each other, the sheet lifts and
 * rotates as it turns, and each page keeps its folio — the reading experience
 * is the point, so there is no grid view and no thumbnails.
 *
 * Turning is two-phase, as in the design: the leaf rotates for 280ms, and only
 * then does the index advance, so the paper appears to carry the page with it.
 * Under `prefers-reduced-motion` the index advances immediately.
 */
export function SketchViewer({ sketches }: { sketches: Sketch[] }) {
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState<Turn>(null);
  const [zoomed, setZoomed] = useState<Sketch | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const reduced = useReducedMotion();

  // While the sketchbook is open, left/right belong to it, not to the shell.
  useClaimArrowKeys();

  const spreadCount = Math.ceil(sketches.length / 2);
  const spreadNumber = Math.floor(index / 2) + 1;
  const atStart = index === 0;
  const atEnd = index + 2 >= sketches.length;

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const turnTo = useCallback(
    (direction: Exclude<Turn, null>) => {
      if (timer.current) return; // a turn is already in flight
      if (direction === "prev" && atStart) return;
      if (direction === "next" && atEnd) return;

      const advance = () => {
        setIndex((current) =>
          direction === "next"
            ? Math.min(sketches.length - 2, current + 2)
            : Math.max(0, current - 2),
        );
        setTurn(null);
        timer.current = null;
      };

      if (reduced) {
        advance();
        return;
      }

      setTurn(direction);
      timer.current = setTimeout(advance, 280);
    },
    [atStart, atEnd, sketches.length, reduced],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (zoomed) {
        if (event.key === "Escape") setZoomed(null);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        turnTo("prev");
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        turnTo("next");
      }
    },
    [turnTo, zoomed],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const left = sketches[index];
  const right = sketches[index + 1] ?? left;

  if (!left || !right) return null;

  const leafStyle = (side: "left" | "right") => {
    const turning = turn === (side === "left" ? "prev" : "next");
    const origin = side === "left" ? "right center" : "left center";
    const angle = side === "left" ? 35 : -35;

    return {
      transformOrigin: origin,
      transform: turning ? `rotateY(${angle}deg) scale(0.94)` : "none",
      opacity: turning ? 0.35 : 1,
      transition: "transform 280ms ease, opacity 280ms ease",
    } as const;
  };

  return (
    <>
      <p className="sr-only" aria-live="polite">
        Spread {spreadNumber} of {spreadCount}
      </p>

      <div
        className="flex flex-col items-center"
        style={{ marginTop: "calc(36 * var(--nb-u))" }}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const start = touchStartX.current;
          const end = event.changedTouches[0]?.clientX;
          touchStartX.current = null;
          if (start == null || end == null) return;
          if (Math.abs(end - start) < SWIPE_THRESHOLD) return;
          turnTo(end < start ? "next" : "prev");
        }}
      >
        <div
          className="spread-shadow relative flex"
          style={{ perspective: "calc(1800 * var(--nb-u))" }}
        >
          <SketchLeaf
            sketch={left}
            index={index}
            side="left"
            style={leafStyle("left")}
            onZoom={() => setZoomed(left)}
          />
          <div
            aria-hidden
            className="spread-binding"
            style={{ width: "calc(2 * var(--nb-u))" }}
          />
          <SketchLeaf
            sketch={right}
            index={index + 1}
            side="right"
            style={leafStyle("right")}
            onZoom={() => setZoomed(right)}
          />
        </div>

        <div
          className="flex items-center gap-28"
          style={{ marginTop: "calc(28 * var(--nb-u))" }}
        >
          <button
            type="button"
            onClick={() => turnTo("prev")}
            disabled={atStart}
            className={clsx("font-mono text-label text-paper", atStart && "opacity-30")}
          >
            ‹ prev spread
          </button>
          <span className="font-mono text-label text-[#999999]">
            {pad(spreadNumber)} / {pad(spreadCount)}
          </span>
          <button
            type="button"
            onClick={() => turnTo("next")}
            disabled={atEnd}
            className={clsx("font-mono text-label text-paper", atEnd && "opacity-30")}
          >
            next spread ›
          </button>
        </div>
      </div>

      {zoomed ? (
        <ZoomedSketch sketch={zoomed} onClose={() => setZoomed(null)} />
      ) : null}
    </>
  );
}

/** One page of the open notebook. */
function SketchLeaf({
  sketch,
  index,
  side,
  style,
  onZoom,
}: {
  sketch: Sketch;
  index: number;
  side: "left" | "right";
  style: React.CSSProperties;
  onZoom: () => void;
}) {
  return (
    <div
      className={clsx(
        "relative bg-[#0a0a0a]",
        side === "left" ? "gutter-shadow-left" : "gutter-shadow-right",
      )}
      style={{
        width: "calc(460 * var(--nb-u))",
        height: "calc(690 * var(--nb-u))",
        ...style,
      }}
    >
      <button
        type="button"
        onClick={onZoom}
        className="absolute inset-0 cursor-zoom-in"
        aria-label={`Enlarge ${sketch.alt}`}
      >
        <Image
          src={sketch.src}
          alt={sketch.alt}
          fill
          sizes="(max-width: 900px) 50vw, 460px"
          className="object-cover"
          priority={index < 2}
        />
      </button>

      <Tape
        position={side === "left" ? "top-left" : "top-right"}
        rotate={side === "left" ? -3 : 3}
        width={58}
        height={18}
        variant="dark"
      />

      <span
        aria-hidden
        className={clsx(
          "pointer-events-none absolute font-mono text-micro text-paper/55",
          side === "left" ? "left-12" : "right-12",
        )}
        style={{ bottom: "calc(10 * var(--nb-u))" }}
      >
        {folioFor(index)}
      </span>
    </div>
  );
}

/** A single page, enlarged over the spread. */
function ZoomedSketch({
  sketch,
  onClose,
}: {
  sketch: Sketch;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={sketch.alt}
      className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/90"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out"
        aria-label="Close enlarged sketch"
      />
      <div
        className="pointer-events-none relative"
        style={{ width: "calc(700 * var(--nb-u))", height: "calc(880 * var(--nb-u))" }}
      >
        <Image
          src={sketch.src}
          alt={sketch.alt}
          fill
          sizes="(max-width: 900px) 90vw, 700px"
          className="object-contain"
        />
      </div>
      {sketch.caption || sketch.date ? (
        <p className="pointer-events-none mt-16 font-mono text-micro tracking-caption text-paper/70">
          {[sketch.caption, sketch.medium, sketch.place, sketch.date]
            .filter(Boolean)
            .join(" · ")}
        </p>
      ) : null}
    </div>
  );
}
