import type { Metadata } from "next";
import { NotebookPage } from "@/components/notebook/NotebookPage";
import { Stamp } from "@/components/notebook/Stamp";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { LINKS } from "@/data/site";
import { spread } from "@/data/spreads";

const SPREAD = spread("/contact");

export const metadata: Metadata = {
  title: "Contact",
  description: "Ways to reach Dilara Öztürk.",
};

/** The last page of the issue. */
export default function ContactPage() {
  return (
    <NotebookPage spread={SPREAD} hideFolio className="flex flex-col">
      <div className="flex h-full flex-col justify-center">
        <h1 className="font-display text-title leading-none text-ink">
          Say hello.
        </h1>

        <nav aria-label="Elsewhere">
          {/* Five outbound links do not sit on one line of a portrait page. */}
          <ul
            className="flex flex-wrap gap-x-32 gap-y-16 md:gap-x-56"
            style={{ marginTop: "calc(40 * var(--nb-u))" }}
          >
            {LINKS.map((link) => (
              <li key={link.href}>
                <ExternalLink
                  href={link.href}
                  description={link.description}
                  className="font-mono text-body-sm"
                >
                  {link.label} ↗
                </ExternalLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="absolute bottom-0 flex items-center gap-16">
        <p className="font-mono text-micro tracking-label text-faint">
          END OF ISSUE 01 · {SPREAD.folio}
        </p>
        <Stamp line1="2026" size={46} rotate={-6} />
      </div>
    </NotebookPage>
  );
}
