import type { Metadata } from "next";
import { NotebookPage } from "@/components/notebook/NotebookPage";
import { SketchViewer } from "@/components/notebook/SketchViewer";
import { SKETCHES } from "@/data/sketches";
import { spread } from "@/data/spreads";

const SPREAD = spread("/sketchbook");

export const metadata: Metadata = {
  title: "Sketchbook",
  description:
    "Scans from Dilara Öztürk's sketchbook, read as a notebook rather than a gallery.",
};

/**
 * The sketchbook, printed on black stock so the scans carry the page.
 */
export default function SketchbookPage() {
  return (
    <NotebookPage spread={SPREAD} meta="JUL 2026" hideFolio>
      <SketchViewer sketches={SKETCHES} />
    </NotebookPage>
  );
}
