import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  projectFrontmatterSchema,
  type Project,
} from "@/types/content";

/**
 * Git is the CMS.
 *
 * Every piece of prose is an `.mdx` file under `content/`. This module is the
 * only thing that touches the filesystem: it reads, validates frontmatter
 * against the schemas in `types/content.ts`, and hands back typed objects.
 * Invalid frontmatter throws at build time rather than rendering a broken page.
 */

const CONTENT_ROOT = path.join(process.cwd(), "content");

async function readCollection(
  collection: string,
): Promise<{ slug: string; data: Record<string, unknown>; body: string }[]> {
  const dir = path.join(CONTENT_ROOT, collection);

  let filenames: string[];
  try {
    filenames = await fs.readdir(dir);
  } catch {
    // A collection with no directory yet is empty, not an error.
    return [];
  }

  const entries = await Promise.all(
    filenames
      .filter((name) => name.endsWith(".mdx"))
      .map(async (name) => {
        const raw = await fs.readFile(path.join(dir, name), "utf8");
        const { data, content } = matter(raw);
        return { slug: name.replace(/\.mdx$/, ""), data, body: content };
      }),
  );

  return entries;
}

/** Explain *which* file failed, not just that something did. */
function parseOrThrow<T>(
  schema: { safeParse: (input: unknown) => { success: boolean; data?: T; error?: unknown } },
  input: unknown,
  file: string,
): T {
  const result = schema.safeParse(input);
  if (!result.success || !result.data) {
    throw new Error(
      `Invalid frontmatter in ${file}:\n${JSON.stringify(result.error, null, 2)}`,
    );
  }
  return result.data;
}

const includeDrafts = process.env.NODE_ENV === "development";

// ---------------------------------------------------------------- projects

export async function getAllProjects(): Promise<Project[]> {
  const raw = await readCollection("projects");

  return raw
    .map(({ slug, data, body }) => ({
      slug,
      body,
      ...parseOrThrow(
        projectFrontmatterSchema,
        data,
        `content/projects/${slug}.mdx`,
      ),
    }))
    .filter((project) => includeDrafts || !project.draft)
    .sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.order !== undefined) return -1;
      if (b.order !== undefined) return 1;
      return b.date.localeCompare(a.date);
    });
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const all = await getAllProjects();
  return all.find((project) => project.slug === slug);
}
