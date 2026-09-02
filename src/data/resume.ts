import type { TimelineEvent } from "@/types/content";
import { asset } from "@/lib/asset";

/**
 * The resume timeline. Data-driven so future entries — awards, new roles,
 * shipped projects — need no code change.
 *
 * `period` is the string as printed. `sortDate` exists only for ordering.
 */
export const TIMELINE: TimelineEvent[] = [
  {
    id: "bilkent",
    kind: "education",
    period: "2022–2027",
    sortDate: "2022-09-01",
    title: "Information Systems & Technologies",
    organisation: "Bilkent University",
    location: "Ankara, Turkey",
    current: true,
  },
  {
    id: "bilisim-as-internship",
    kind: "internship",
    period: "JAN–MAY 2026",
    sortDate: "2026-01-01",
    title: "Software Development Intern",
    organisation: "Bilişim A.Ş.",
    location: "Ankara, Turkey",
    detail:
      "A five-month placement on the BilişimERP team, working on production projects.",
  },
  {
    id: "trt-internship",
    kind: "internship",
    period: "JUN–JUL 2025",
    sortDate: "2025-06-01",
    title: "Software Testing Intern",
    organisation: "TRT",
    location: "Ankara, Turkey",
  },
  {
    id: "metropolia-erasmus",
    kind: "exchange",
    period: "AUG–DEC 2025",
    sortDate: "2025-08-01",
    title: "Erasmus Exchange",
    organisation: "Metropolia University",
    location: "Helsinki, Finland",
    stamp: { line1: "FI", line2: "2025" },
  },
];

/** What the FOCUS column reads on the resume spread. */
export const FOCUS =
  "Audio tooling and Music, a guitar pedal and amp designer in the browser.";

export const RESUME_PDF = {
  href: asset("/dilara-ozturk-resume.pdf"),
  /** Printed under the download button. Update when the PDF is replaced. */
  meta: "PDF · updated SEP 2026",
};
