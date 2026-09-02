import { NotebookPage } from "@/components/notebook/NotebookPage";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import { Tape } from "@/components/notebook/Tape";
import { StarOrnament } from "@/components/notebook/Illustrations";
import { spread } from "@/data/spreads";
import { SITE } from "@/data/site";

const COVER = spread("/");

/**
 * The cover.
 *
 * The masthead rises in four staggered beats — name, sub-title, rule, then the
 * disciplines — which is the only entrance animation in the publication.
 */
export default function CoverPage() {
  return (
    <NotebookPage spread={COVER} padding="cover" hideFolio cropMarks>
      <div style={{ marginTop: "calc(96 * var(--nb-u))" }}>
        <div
          className="grid items-start gap-64"
          style={{ gridTemplateColumns: "1fr calc(460 * var(--nb-u))" }}
        >
          <div>
            <h1
              className="cover-rise font-display text-cover leading-none tracking-tighter text-ink"
              style={{ "--rise-delay": "50ms" } as React.CSSProperties}
            >
              <span className="block">DİLARA</span>
              <span
                className="block text-accent"
                style={{ marginTop: "calc(22 * var(--nb-u))" }}
              >
                ÖZTÜRK
              </span>
            </h1>

            <p
              className="cover-rise font-display text-serif-sm italic text-[#333333]"
              style={
                {
                  "--rise-delay": "220ms",
                  margin: "calc(34 * var(--nb-u)) 0 0 calc(4 * var(--nb-u))",
                } as React.CSSProperties
              }
            >
              {SITE.tagline}
            </p>

            <hr
              className="cover-rise w-full"
              style={
                {
                  "--rise-delay": "360ms",
                  border: 0,
                  borderTop: "var(--rule-w) solid var(--ink)",
                  margin: "calc(28 * var(--nb-u)) 0 0 calc(4 * var(--nb-u))",
                } as React.CSSProperties
              }
            />

            <ul
              className="cover-rise flex items-center gap-22 font-mono text-label tracking-wide text-[#555555]"
              style={
                {
                  "--rise-delay": "360ms",
                  margin: "calc(22 * var(--nb-u)) 0 0 calc(4 * var(--nb-u))",
                } as React.CSSProperties
              }
            >
              {SITE.disciplines.map((discipline, i) => (
                <li key={discipline} className="flex items-center gap-22">
                  {i > 0 ? <span className="text-accent">·</span> : null}
                  {discipline}
                </li>
              ))}
            </ul>
          </div>

          {/*
            The tape sits above the plate's top edge, and EditorialImage clips
            its own children so a rotated plate cannot bleed — so the strips are
            siblings of the plate inside this wrapper rather than children of it.
          */}
          <div
            className="relative"
            style={{ marginTop: "calc(8 * var(--nb-u))" }}
          >
            <EditorialImage
              src="/portrait.jpg"
              alt="Dilara Öztürk"
              ratio="1 / 1"
              sizes="(max-width: 900px) 60vw, 460px"
              priority
            />
            <Tape position="top-left" rotate={-3} />
            <Tape position="top-right" rotate={2} />
          </div>
        </div>
      </div>

      <p
        className="cover-rise absolute w-fit font-mono text-meta tracking-widest text-ink"
        style={
          {
            "--rise-delay": "480ms",
            left: "calc(4 * var(--nb-u))",
            bottom: "calc(44 * var(--nb-u))",
            borderTop: "var(--rule-w) solid var(--accent)",
            borderBottom: "var(--rule-w) solid var(--accent)",
            padding: "calc(10 * var(--nb-u)) 0",
          } as React.CSSProperties
        }
      >
        {SITE.issue}
      </p>

      <StarOrnament
        width={190}
        className="absolute"
        style={{
          right: "calc(-12 * var(--nb-u))",
          bottom: "calc(36 * var(--nb-u))",
        }}
      />
    </NotebookPage>
  );
}
