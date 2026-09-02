import type { ReactNode } from "react";
import { PageTurn } from "@/components/notebook/PageTurn";

/**
 * A template remounts on every navigation, which is exactly the lifecycle a
 * page turn wants: the new sheet animates in each time it is laid down.
 */
export default function NotebookTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return <PageTurn>{children}</PageTurn>;
}
