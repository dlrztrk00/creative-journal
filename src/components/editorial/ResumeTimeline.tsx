import type { TimelineEvent } from "@/types/content";
import { Stamp } from "@/components/notebook/Stamp";

/**
 * The resume as a dotted timeline: a red node per event, joined by a hairline.
 *
 * Rendered from `data/resume.ts`, so adding an award or a new role is a data
 * change. The list is a real `<ol>` — it is a chronology, and it should read as
 * one to a screen reader.
 */
export function ResumeTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="flex flex-col">
      {events.map((event, i) => {
        const isLast = i === events.length - 1;

        return (
          <li key={event.id} className="flex gap-20">
            <div
              aria-hidden
              className="flex shrink-0 flex-col items-center"
              style={{ width: "calc(10 * var(--nb-u))" }}
            >
              <span
                className="shrink-0 rounded-full bg-accent"
                style={{
                  width: "calc(10 * var(--nb-u))",
                  height: "calc(10 * var(--nb-u))",
                  marginTop: "calc(8 * var(--nb-u))",
                }}
              />
              {isLast ? null : (
                <span
                  className="flex-1 bg-rule"
                  style={{ width: "var(--rule-w)" }}
                />
              )}
            </div>

            <div
              className="relative flex-1"
              style={{ paddingBottom: isLast ? 0 : "calc(24 * var(--nb-u))" }}
            >
              <p className="font-mono text-folio text-faint">{event.period}</p>
              <h3
                className="font-display text-entry text-ink"
                style={{ marginTop: "calc(6 * var(--nb-u))" }}
              >
                {event.title}
              </h3>
              <p
                className="font-mono text-caption text-muted"
                style={{ marginTop: "calc(8 * var(--nb-u))" }}
              >
                {event.organisation}
                {event.location ? `, ${event.location}` : ""}
              </p>
              {event.detail ? (
                <p
                  className="font-body text-body-sm text-muted"
                  style={{ marginTop: "calc(8 * var(--nb-u))" }}
                >
                  {event.detail}
                </p>
              ) : null}

              {event.stamp ? (
                <Stamp
                  line1={event.stamp.line1}
                  line2={event.stamp.line2}
                  className="absolute top-0 right-0"
                />
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
