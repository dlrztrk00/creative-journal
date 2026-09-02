# Assets

Everything here is served from the site root: `public/sketches/1.jpeg` is
`/sketches/1.jpeg`.

## In place

`sketches/1.jpeg` … `sketches/22.jpeg` — the real scans, copied from the
project's `drawings/` folder and kept in their original numbering. That numbering
is the binding order, so `1` and `2` are the first spread. Listed in
`src/data/sketches.ts`.

Since these are now here, the top-level `drawings/` folder is a duplicate and
can be deleted.

## What is still standing in

These are transparent or generated placeholders. The layout is correct; the
artwork is not.

| Path | What it is | Referenced by |
|---|---|---|
| `illustrations/star.png` | The star on the cover | `src/app/(notebook)/page.tsx` |
| `illustrations/guitar-amp.png` | The amp on the music spread | `src/app/(notebook)/music/page.tsx` |
| `illustrations/cloud2.png` | Spare illustration from the design | — |
| `dilara-ozturk-resume.pdf` | The downloadable resume | `src/data/resume.ts` |

The illustrations are drawn as inline SVG in
`src/components/notebook/Illustrations.tsx`.

## Adding a sketch

Drop the scan in `sketches/` and add an entry to `src/data/sketches.ts`. Give it
a caption, date, medium and place when you know them — the viewer shows them
when zoomed and omits the line when they are absent.

Scans should be at least 1400px on the long edge; `next/image` handles the rest.

## Sleeve art

`music/` holds cover art for the records on the music spread. Save the image
here and point the record's `sleeve` field in `src/data/music.ts` at it, e.g.
`/music/room-on-fire.jpg`. Square, 600px or more. Without one the spread prints
a placeholder tile, which is a fine state to leave it in.

## The other folders

`photography/`, `textures/`, `tape/`, `stamps/` and `icons/` are set up for
future sections. They are empty on purpose.
