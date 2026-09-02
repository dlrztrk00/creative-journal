import { Suspense } from "react";
import type { Metadata } from "next";
import { NotebookPage } from "@/components/notebook/NotebookPage";
import { Circled } from "@/components/editorial/HandwrittenNote";
import {
  ProjectNavigator,
  type ProjectView,
} from "@/components/github/ProjectNavigator";
import { getResolvedProjects } from "@/lib/projects";
import { relativeTime } from "@/lib/format";
import { spread } from "@/data/spreads";

const SPREAD = spread("/projects");

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Things Dilara Öztürk has built — sketched on paper first, then in code.",
};

/**
 * The projects spread.
 *
 * The list is GitHub's: every public repository appears here on its own, with
 * its real languages and its real last commit. A write-up in
 * `content/projects/` deepens a card but is never what puts it on the page.
 */
export default async function ProjectsPage() {
  const projects = await getResolvedProjects();

  const views: ProjectView[] = projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    tech: project.tech,
    idea: project.idea,
    link: project.link,
    stars: project.repo?.stars ?? null,
    lastCommit: project.commit
      ? relativeTime(project.commit.committedAt)
      : project.repo
        ? relativeTime(project.repo.pushedAt)
        : null,
    hasWriteUp: project.body !== null,
  }));

  const latest = views.find((view) => view.lastCommit)?.lastCommit;

  return (
    <NotebookPage
      spread={SPREAD}
      meta={<Circled>GITHUB · {projects.length || "—"} REPOS</Circled>}
      note={latest ? `↳ last commit ${latest} · main` : undefined}
    >
      <Suspense fallback={null}>
        <ProjectNavigator projects={views} />
      </Suspense>
    </NotebookPage>
  );
}
