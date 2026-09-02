"use client";

import { useState } from "react";
import Image from "next/image";
import type { Video } from "@/types/integrations";
import { Pager } from "@/components/navigation/Pager";
import { PlaceholderTile } from "@/components/notebook/PlaceholderTile";
import { ExternalLink } from "@/components/ui/ExternalLink";

/**
 * The featured-cover panel: one video at a time, with its top comment set as a
 * pull quote.
 *
 * Unlike a project write-up, a cover is not addressable content, so
 * the selection stays in component state rather than in the URL.
 */
export function CoverNavigator({ videos }: { videos: Video[] }) {
  const [index, setIndex] = useState(0);
  const video = videos[index];

  if (!video) return null;

  return (
    <>
      <div
        className="flex flex-col gap-20 md:flex-row md:items-start md:gap-32"
        style={{ marginTop: "calc(20 * var(--nb-u))" }}
      >
        {video.thumbnail ? (
          <div
            className="relative w-full shrink-0 md:w-[calc(520*var(--nb-u))]"
            style={{
              aspectRatio: "16 / 9",
              border: "var(--rule-w) solid var(--ink)",
            }}
          >
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              sizes="(max-width: 767px) 92vw, 520px"
              className="object-cover"
              // The lead cover is the page's largest paint; do not lazy-load it.
              priority={index === 0}
            />
          </div>
        ) : (
          <PlaceholderTile
            label="video embed"
            ratio="16 / 9"
            className="w-full shrink-0 md:w-[calc(520*var(--nb-u))]"
          />
        )}

        <div className="flex-1">
          <h3 className="font-display text-serif-sm text-ink">{video.title}</h3>
          <p
            className="font-mono text-meta text-muted"
            style={{ marginTop: "calc(8 * var(--nb-u))" }}
          >
            {video.duration}
            {video.views !== null ? ` · ${video.views.toLocaleString()} views` : ""}
            {" — "}
            <ExternalLink
              href={video.url}
              description={`Watch ${video.title} on YouTube`}
            >
              watch ↗
            </ExternalLink>
          </p>

          {video.topComment ? (
            <figure
              style={{
                marginTop: "calc(20 * var(--nb-u))",
                padding: "calc(14 * var(--nb-u)) calc(16 * var(--nb-u))",
                border: "var(--rule-w) solid var(--rule)",
              }}
            >
              <figcaption className="font-mono text-micro tracking-label text-faint">
                TOP COMMENT
              </figcaption>
              <blockquote
                className="font-display text-body italic text-[#333333]"
                style={{ marginTop: "calc(8 * var(--nb-u))" }}
              >
                “{video.topComment.text}”
              </blockquote>
            </figure>
          ) : null}
        </div>
      </div>

      <Pager
        noun="cover"
        index={index}
        count={videos.length}
        onPrevious={() => setIndex((i) => Math.max(0, i - 1))}
        onNext={() => setIndex((i) => Math.min(videos.length - 1, i + 1))}
        className="mt-28"
      />
    </>
  );
}
