import type { MusicRecord } from "@/types/content";
import { ExternalLink } from "@/components/ui/ExternalLink";

/** Bar heights of the printed waveform, in design pixels. */
const WAVEFORM = [8, 15, 7, 19, 11, 16, 8, 12];

/**
 * What is playing, set as a footer strip beneath the covers.
 *
 * The spread leads with the recordings — the work — so listening is printed as
 * a single credit line rather than a panel. There is no progress bar and no
 * clock; this is a record someone chose, not a stream someone is being watched
 * listening to.
 */
export function ListeningStrip({ featured }: { featured: MusicRecord }) {
  return (
    <section
      aria-label="Listening"
      style={{
        paddingTop: "calc(24 * var(--nb-u))",
        borderTop: "var(--rule-w) solid var(--rule)",
      }}
    >
      <div className="flex items-baseline gap-24">
        <h2 className="shrink-0 font-mono text-label tracking-label text-muted">
          LISTENING
        </h2>

        <span
          aria-hidden
          className="flex shrink-0 items-end gap-2"
          style={{ height: "calc(19 * var(--nb-u))" }}
        >
          {WAVEFORM.map((height, i) => (
            <span
              key={i}
              className={i >= 2 && i <= 4 ? "bg-accent" : "bg-[#d9d4c8]"}
              style={{
                width: "calc(3 * var(--nb-u))",
                height: `calc(${height} * var(--nb-u))`,
              }}
            />
          ))}
        </span>

        <p className="font-mono text-body text-[#333333]">
          <Track record={featured} />
          {featured.year ? (
            <span className="text-faint">, {featured.year}</span>
          ) : null}
        </p>
      </div>
    </section>
  );
}

/** One record: linked out when there is somewhere to hear it. */
function Track({ record }: { record: MusicRecord }) {
  const printed = (
    <>
      {record.title} <span className="text-muted">— {record.artist}</span>
    </>
  );

  if (!record.url) return printed;

  return (
    <ExternalLink
      href={record.url}
      description={`Listen to ${record.title} by ${record.artist}`}
      underline={false}
      className="transition-colors hover:text-accent"
    >
      {printed}
    </ExternalLink>
  );
}
