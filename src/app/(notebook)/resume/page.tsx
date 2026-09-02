import type { Metadata } from "next";
import { NotebookPage } from "@/components/notebook/NotebookPage";
import { ResumeTimeline } from "@/components/editorial/ResumeTimeline";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { FOCUS, RESUME_PDF, TIMELINE } from "@/data/resume";
import { PROFESSIONAL_LINKS } from "@/data/site";
import { spread } from "@/data/spreads";

const SPREAD = spread("/resume");

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Dilara Öztürk's education, internships and exchange — as an interactive timeline and a PDF.",
};

/**
 * The resume, in both formats the brief asks for: a timeline to read and a PDF
 * to keep.
 */
export default function ResumePage() {
  return (
    <NotebookPage spread={SPREAD}>
      <div
        className="grid grid-cols-1 gap-40 md:grid-cols-2 md:gap-80"
        style={{
          marginTop: "calc(76 * var(--nb-u))",
        }}
      >
        <section>
          <h2 className="font-mono text-meta text-accent">CURRENTLY</h2>
          <div style={{ marginTop: "calc(24 * var(--nb-u))" }}>
            <ResumeTimeline events={TIMELINE} />
          </div>
        </section>

        {/* The focus line and the download come first on a phone: they are what
            someone arriving from an application wants, and the timeline is long. */}
        <div className="order-first flex flex-col justify-between md:order-none">
          <section>
            <h2 className="font-mono text-meta text-muted">FOCUS</h2>
            <p
              className="font-body text-body leading-relaxed text-[#222222]"
              style={{
                maxWidth: "calc(420 * var(--nb-u))",
                marginTop: "calc(18 * var(--nb-u))",
              }}
            >
              {FOCUS}
            </p>
          </section>

          <div>
            {/* A resume is the one page a reader may arrive at cold, so the
                ways to reach Dilara belong here as well as on contact. */}
            <nav aria-label="Professional links">
              <ul
                className="flex gap-32"
                style={{ marginBottom: "calc(28 * var(--nb-u))" }}
              >
                {PROFESSIONAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <ExternalLink
                      href={link.href}
                      description={link.description}
                      className="font-mono text-meta"
                    >
                      {link.label} ↗
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href={RESUME_PDF.href}
              download
              className="inline-block bg-ink font-mono text-body-sm tracking-note text-paper transition-opacity hover:opacity-85"
              style={{ padding: "calc(16 * var(--nb-u)) calc(28 * var(--nb-u))" }}
            >
              download pdf ↓
            </a>
            <p
              className="font-mono text-micro text-faint"
              style={{ marginTop: "calc(10 * var(--nb-u))" }}
            >
              {RESUME_PDF.meta}
            </p>
          </div>
        </div>
      </div>
    </NotebookPage>
  );
}
