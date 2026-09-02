import "server-only";

import type { Project } from "@/types/content";
import type { Commit, Repo } from "@/types/integrations";
import { getAllProjects } from "./content";
import { LATEST_COMMITS, REPOSITORIES } from "@/data/repositories";

/**
 * Projects, assembled from the repository list first and MDX second.
 *
 * `data/repositories.ts` is the source of truth: every repository written down
 * there becomes a project, carrying its own description, languages, stars and
 * last commit. An `.mdx` file in `content/projects/` is optional enrichment —
 * it adds the write-up and can override the title or the one-line idea, but it
 * is never required, and nothing about a repository is retyped into it.
 *
 * A project can also exist with no repository at all (something not yet public,
 * or not code); those come from MDX alone.
 *
 * This used to read the GitHub API on every render. It no longer talks to
 * anything: the facts are a snapshot in the data file, so the page needs no
 * credential, cannot be rate-limited, and renders identically offline.
 */

export interface ResolvedProject {
  slug: string;
  title: string;
  /** One line, as printed on the projects spread. */
  idea: string;
  /** Display string of the languages actually in the repository. */
  tech: string;
  link: string | null;
  homepage: string | null;
  /** Present when the project is backed by a repository. */
  repo: Repo | null;
  commit: Commit | null;
  /** The MDX write-up, when one exists. */
  body: string | null;
  cover: string | null;
  coverAlt: string | null;
  featured: boolean;
  updatedAt: string;
}

/** "FootballManagementSystem" → "Football Management System". */
export function humanizeRepoName(name: string): string {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
}

/** "GalaxyShooterGame" → "galaxy-shooter-game". */
export function slugifyRepoName(name: string): string {
  return humanizeRepoName(name).toLowerCase().replace(/\s+/g, "-");
}

function techOf(repo: Repo | null, mdx: Project | undefined): string {
  if (repo && repo.languages.length > 0) {
    return repo.languages
      .slice(0, 3)
      .map((language) => language.name)
      .join(", ");
  }
  if (repo?.primaryLanguage) return repo.primaryLanguage;
  return mdx?.tech.join(", ") ?? "";
}

/**
 * The full project list, ordered as the spread should read it.
 *
 * Repository-backed projects print in the order `data/repositories.ts` lists
 * them — that file is the running order, so leading with different work means
 * moving a block, not renumbering frontmatter. Projects that exist only as a
 * write-up follow, in their own `order` and then by date.
 */
export async function getResolvedProjects(): Promise<ResolvedProject[]> {
  const mdxProjects = await getAllProjects();

  // Index the MDX by the repository it claims, so a write-up finds its repo
  // regardless of what its filename is.
  const mdxByRepo = new Map<string, Project>();
  for (const project of mdxProjects) {
    if (project.repo) mdxByRepo.set(project.repo.toLowerCase(), project);
  }

  const fromRepos = REPOSITORIES.filter((repo) => !repo.archived).map((repo) => {
    const mdx = mdxByRepo.get(repo.name.toLowerCase());

    return {
      slug: mdx?.slug ?? slugifyRepoName(repo.name),
      title: mdx?.title ?? humanizeRepoName(repo.name),
      idea:
        mdx?.idea ??
        repo.description ??
        `A ${repo.primaryLanguage ?? "software"} project.`,
      tech: techOf(repo, mdx),
      link: repo.url,
      homepage: repo.homepage,
      repo,
      commit: LATEST_COMMITS[repo.name] ?? null,
      body: mdx?.body ?? null,
      cover: mdx?.cover ?? null,
      coverAlt: mdx?.coverAlt ?? null,
      featured: mdx?.featured ?? false,
      updatedAt: repo.pushedAt,
    } satisfies ResolvedProject;
  });

  // Projects written up but not backed by a repository.
  const claimed = new Set(fromRepos.map((project) => project.slug));
  const fromMdxOnly = mdxProjects
    .filter((project) => !project.repo && !claimed.has(project.slug))
    .map(
      (project) =>
        ({
          slug: project.slug,
          title: project.title,
          idea: project.idea,
          tech: project.tech.join(", "),
          link: project.link ?? null,
          homepage: null,
          repo: null,
          commit: null,
          body: project.body,
          cover: project.cover ?? null,
          coverAlt: project.coverAlt ?? null,
          featured: project.featured,
          updatedAt: project.date,
        }) satisfies ResolvedProject,
    );

  // getAllProjects already sorts by `order` then date, so the MDX-only tail
  // arrives in its intended sequence and simply follows the repositories.
  return [...fromRepos, ...fromMdxOnly];
}

export async function getResolvedProject(
  slug: string,
): Promise<ResolvedProject | undefined> {
  const all = await getResolvedProjects();
  return all.find((project) => project.slug === slug);
}
