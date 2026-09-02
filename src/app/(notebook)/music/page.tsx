import type { Metadata } from "next";
import { NotebookPage } from "@/components/notebook/NotebookPage";
import { AmpOrnament } from "@/components/notebook/Illustrations";
import { ListeningStrip } from "@/components/music/ListeningStrip";
import { CoverNavigator } from "@/components/youtube/CoverNavigator";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { FEATURED } from "@/data/music";
import { COVERS } from "@/data/videos";
import { link } from "@/data/site";
import { spread } from "@/data/spreads";

const SPREAD = spread("/music");

const tiktokProfile = link("tiktok");

export const metadata: Metadata = {
  title: "Music",
  description: "What Dilara Öztürk has recorded, and what she is listening to.",
};

/**
 * The music spread: playing above, listening below.
 *
 * The covers lead, because they are the work. What is on repeat is printed as a
 * credit strip at the foot of the page. Both come from `src/data/`, and neither
 * asks anything of a service at render time — the page is wholly static, down
 * to the cover images.
 */
export default function MusicPage() {
  return (
    <NotebookPage spread={SPREAD} meta="ON REPEAT">
      <section
        className="flex h-full flex-col"
        style={{ marginTop: "calc(40 * var(--nb-u))" }}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-baseline md:justify-between">
          <h2 className="font-mono text-label tracking-label text-muted">
            COVERS
            <span className="text-faint"> · {COVERS.length} ON THE CHANNEL</span>
          </h2>

          {/*
            The covers are the channel's. The short-form work lives on TikTok
            and is not fetched — the page points at the account and lets the
            reader go, rather than embedding a second feed.
          */}
          <ExternalLink
            href={tiktokProfile.href}
            description={tiktokProfile.description}
            className="font-mono text-label tracking-label text-muted"
          >
            also on tiktok ↗
          </ExternalLink>
        </div>

        <CoverNavigator videos={COVERS} />

        {/*
          The strip follows the covers rather than being pushed to the foot of
          the sheet: mt-auto stranded it against the bottom margin with a third
          of the page empty above it. The amp illustration owns the space that
          is left, bottom-right.
        */}
        <div style={{ marginTop: "calc(56 * var(--nb-u))" }}>
          <ListeningStrip featured={FEATURED} />
        </div>
      </section>

      {/*
        300 design pixels is a corner of the spread and most of a phone page,
        where it would sit on top of the covers and the listening line.
      */}
      <AmpOrnament
        width={300}
        className="absolute hidden md:block"
        style={{
          right: "calc(-16 * var(--nb-u))",
          bottom: "calc(96 * var(--nb-u))",
        }}
      />
    </NotebookPage>
  );
}
