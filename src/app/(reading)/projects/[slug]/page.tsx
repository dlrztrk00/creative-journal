import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Feature } from "@/components/editorial/Feature";
import { Mdx } from "@/components/editorial/Mdx";
import { GitHubCard } from "@/components/github/GitHubCard";
import { getResolvedProject, getResolvedProjects } from "@/lib/projects";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getResolvedProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getResolvedProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.idea,
    openGraph: {
      type: "article",
      title: project.title,
      description: project.idea,
      images: project.cover ? [project.cover] : undefined,
    },
  };
}

/**
 * A project write-up.
 *
 * The repository card is always present when the project is backed by GitHub;
 * the prose below it is present only when a write-up has been written. A repo
 * with no MDX still gets a real page — the card is the article.
 */
export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = await getResolvedProject(slug);
  if (!project) notFound();

  return (
    <Feature
      label="PROJECTS"
      backHref={`/projects?p=${project.slug}`}
      backLabel="projects"
      meta={project.tech}
      title={project.title}
      standfirst={project.idea}
      footer={
        project.repo ? (
          <span className="font-mono text-folio text-faint">
            {project.repo.stars} ★ · {project.repo.forks} forks
          </span>
        ) : null
      }
    >
      {project.repo ? (
        <GitHubCard repo={project.repo} commit={project.commit} />
      ) : null}
      {project.body ? <Mdx source={project.body} /> : null}
    </Feature>
  );
}
