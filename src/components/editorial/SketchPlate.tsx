import { SKETCHES } from "@/data/sketches";
import { EditorialImage } from "./EditorialImage";
import { Tape } from "@/components/notebook/Tape";

/**
 * A sketch pulled into an article by its id, so prose can reference the
 * sketchbook without repeating a file path or an alt text.
 *
 * ```mdx
 * <Sketch id="sketch-07" caption="fig. 03 — the first pass" />
 * ```
 */
export function SketchPlate({
  id,
  caption,
  ratio = "4 / 5",
  rotate = -1,
}: {
  id: string;
  caption?: string;
  ratio?: string;
  rotate?: number;
}) {
  const sketch = SKETCHES.find((s) => s.id === id);
  if (!sketch) {
    throw new Error(
      `<Sketch id="${id}" /> does not match any entry in src/data/sketches.ts`,
    );
  }

  return (
    <EditorialImage
      src={sketch.src}
      alt={sketch.alt}
      ratio={ratio}
      rotate={rotate}
      caption={caption ?? sketch.caption}
      sizes="(max-width: 900px) 90vw, 40vw"
    >
      <Tape position="top-center" rotate={-2} width={76} height={22} />
    </EditorialImage>
  );
}
