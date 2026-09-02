"use client";

import { useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pager } from "@/components/navigation/Pager";
import { PlaceholderTile } from "@/components/notebook/PlaceholderTile";
import { Tape } from "@/components/notebook/Tape";
import { FigureCaption } from "@/components/editorial/FigureCaption";
import { ExternalLink } from "@/components/ui/ExternalLink";

/**
 * One project as the spread needs it: MDX narrative merged with whatever
 * GitHub knew at build time. Assembled on the server; this component only
 * chooses which one is showing.
 */
export interface ProjectView {
  slug: string;
  title: string;
  tech: string;
  idea: string;
  link: string | null;
  stars: number | null;
  /** Live from GitHub, e.g. "3d ago". Absent when the repo is unknown. */
  lastCommit: string | null;
  /** Whether an MDX write-up exists, so the page only offers a real link. */
  hasWriteUp: boolean;
}

/**
 * The projects spread: one project at a time, turned through in place.
 *
 * The current project lives in the URL (`/projects?p=slug`) rather than in
 * component state, so the contents overlay can link straight to a project and
 * the back button steps through them.
 */
export function ProjectNavigator({ projects }: { projects: ProjectView[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const requested = params.get("p");
  const index = useMemo(() => {
    const found = projects.findIndex((project) => project.slug === requested);
    return found >= 0 ? found : 0;
  }, [projects, requested]);

  const project = projects[index];

  const goTo = useCallback(
    (next: number) => {
      const target = projects[next];
      if (!target) return;
      router.replace(`${pathname}?p=${target.slug}`, { scroll: false });
    },
    [projects, pathname, router],
  );

  if (!project) {
    return (
      <p className="font-mono text-label text-muted">
        No projects published yet. Add one to <code>content/projects/</code>.
      </p>
    );
  }

  return (
    <>
      <div
        className="relative grid grid-cols-1 md:h-[calc(690*var(--nb-u))] md:grid-cols-2"
        style={{ marginTop: "calc(28 * var(--nb-u))" }}
      >
        <div
          aria-hidden
          className="absolute bottom-0 top-0 left-1/2 hidden bg-ink md:block"
          style={{ width: "var(--rule-w)" }}
        />

        <div className="md:pr-64">
          <p className="font-mono text-meta text-accent">* IDEA</p>

          <h2
            className="font-display text-h1 leading-[1.05] text-ink"
            style={{ marginTop: "calc(18 * var(--nb-u))" }}
          >
            {project.hasWriteUp ? (
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            ) : (
              project.title
            )}
          </h2>

          <p
            className="font-body text-body-sm text-muted"
            style={{ margin: "calc(14 * var(--nb-u)) 0 calc(36 * var(--nb-u)) 0" }}
          >
            {project.tech}
            {project.link ? (
              <>
                {" — "}
                <ExternalLink
                  href={project.link}
                  description={`${project.title} on GitHub`}
                >
                  github ↗
                </ExternalLink>
              </>
            ) : null}
          </p>

          <p
            className="font-body text-lede leading-relaxed text-[#222222]"
            style={{ maxWidth: "calc(440 * var(--nb-u))" }}
          >
            {project.idea}
          </p>

          <div
            className="flex items-baseline gap-24"
            style={{ marginTop: "calc(28 * var(--nb-u))" }}
          >
            {project.hasWriteUp ? (
              <Link
                href={`/projects/${project.slug}`}
                className="rule-under font-mono text-meta"
              >
                read the write-up →
              </Link>
            ) : null}
            {project.lastCommit ? (
              <span className="font-mono text-folio tracking-note text-faint">
                last commit {project.lastCommit}
                {project.stars ? ` · ${project.stars} ★` : ""}
              </span>
            ) : null}
          </div>
        </div>

        {/*
          A reserved space says "a sketch belongs here", which is worth a
          column on the spread and worth nothing on a phone — where it would
          push the project pager off the page.
        */}
        <div className="hidden md:block md:pl-64">
          <figure>
            <PlaceholderTile
              label="sketch — wireframe"
              ratio="4 / 5"
              boxed
              style={{ maxHeight: "calc(540 * var(--nb-u))" }}
            >
              <Tape position="top-center" rotate={-2} width={76} height={22} />
            </PlaceholderTile>
            <FigureCaption crossReference="cf. sketchbook, pg. 014">
              fig. 01 — concept sketch
            </FigureCaption>
          </figure>
        </div>
      </div>

      <Pager
        noun="project"
        index={index}
        count={projects.length}
        onPrevious={() => goTo(index - 1)}
        onNext={() => goTo(index + 1)}
        className="absolute right-0 bottom-0 left-0"
      />
    </>
  );
}
