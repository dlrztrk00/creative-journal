import type { ReactNode } from "react";
import { FooterNavigation } from "@/components/navigation/FooterNavigation";
import {
  ContentsOverlay,
  type ContentsSectionItems,
} from "@/components/navigation/ContentsOverlay";

/**
 * The notebook itself: a bound object of fixed proportions, lying on the
 * oxblood field.
 *
 * It persists across page turns — the paper, its shadow, the footer rule and
 * the contents overlay are all here rather than in any page — so turning to a
 * new section moves only the printed surface.
 */
export function NotebookFrame({
  children,
  contents,
}: {
  children: ReactNode;
  contents: ContentsSectionItems[];
}) {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div
        className="page-shadow relative flex flex-col bg-paper"
        style={{ width: "var(--nb-w)", height: "var(--nb-h)" }}
      >
        <div
          className="relative flex-1 overflow-hidden"
          style={{ perspective: "calc(2200 * var(--nb-u))" }}
        >
          {children}
          <ContentsOverlay sections={contents} />
        </div>
        <FooterNavigation />
      </div>
    </div>
  );
}
