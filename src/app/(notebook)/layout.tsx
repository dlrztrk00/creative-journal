import type { ReactNode } from "react";
import { NavigationProvider } from "@/components/navigation/NavigationProvider";
import { NotebookFrame } from "@/components/notebook/NotebookFrame";
import type { ContentsSectionItems } from "@/components/navigation/ContentsOverlay";
import { getResolvedProjects } from "@/lib/projects";

/**
 * The bound notebook: every section spread renders inside this frame.
 *
 * The contents index is assembled here, on the server, from the resolved
 * projects — so adding a project puts it in the table of contents with no
 * further work.
 */
export default async function NotebookLayout({
  children,
}: {
  children: ReactNode;
}) {
  const projects = await getResolvedProjects();

  const contents: ContentsSectionItems[] = [
    {
      section: "/projects",
      items: projects.map((project) => ({
        label: project.title,
        href: `/projects?p=${project.slug}`,
      })),
    },
  ];

  return (
    <NavigationProvider>
      <NotebookFrame contents={contents}>
        <main id="page" className="absolute inset-0">
          {children}
        </main>
      </NotebookFrame>
    </NavigationProvider>
  );
}
