import { NotebookPage } from "@/components/notebook/NotebookPage";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import { Tape } from "@/components/notebook/Tape";
import { StarOrnament } from "@/components/notebook/Illustrations";
import { spread } from "@/data/spreads";
import { SITE } from "@/data/site";
import { asset } from "@/lib/asset";

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
      <div className="mt-40 md:mt-96">
        {/*
          Two columns on the spread, one on the phone: the portrait's 460
          design pixels are wider than the whole portrait canvas, so side by
          side it would push the masthead off the page.
        */}
        <div className="grid grid-cols-1 items-start gap-28 md:grid-cols-[1fr_calc(460*var(--nb-u))] md:gap-64">
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
              className="cover-rise flex flex-wrap items-center gap-x-22 gap-y-8 font-mono text-label tracking-wide text-[#555555]"
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
              src={asset("/portrait.jpg")}
              alt="Dilara Öztürk"
              ratio="var(--cover-portrait-ratio)"
              sizes="(max-width: 767px) 90vw, 460px"
              priority
            />
            <Tape position="top-left" rotate={-3} />
            <Tape position="top-right" rotate={2} />
          </div>
        </div>
      </div>

      <p
        className="cover-rise mt-24 w-fit font-mono text-meta tracking-widest text-ink md:absolute md:mt-0"
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

      {/*
        The star crowds a portrait page: the masthead, the plate and the issue
        line already fill it, and there is no corner left for an ornament.
      */}
      <StarOrnament
        width={190}
        className="absolute hidden md:block"
        style={{
          // Overrides the component's own width: inline style beats a class,
          // so the responsive value has to arrive this way.
          width: "calc(var(--size-cover-star) * var(--nb-u))",
          right: "calc(-12 * var(--nb-u))",
          bottom: "calc(36 * var(--nb-u))",
        }}
      />
    </NotebookPage>
  );
}
