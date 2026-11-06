import { asset } from "@/lib/asset";

/**
 * A screenshot for the plate beside a project on the projects spread, keyed by
 * the project's slug (the kebab-cased repository name). A project without an
 * entry keeps the "sketch — wireframe" placeholder.
 *
 * Files live in `public/projects/`, captured at 2× so they stay sharp on
 * retina screens. `ratio` must match the file's width / height, because the
 * plate crops to fill.
 */
export interface ProjectImage {
  src: string;
  alt: string;
  /** CSS aspect ratio of the file, e.g. "2400 / 1480". */
  ratio: string;
  caption: string;
}

export const PROJECT_IMAGES: Record<string, ProjectImage> = {
  "guitar-splitter": {
    src: asset("/projects/guitar-splitter.jpg"),
    alt: "GuitarSplit: a red cassette header above a mixer with one waveform lane per instrument — guitar, vocals, drums and bass — each with mute, solo, a fader and a save button.",
    ratio: "2300 / 2090",
    caption: "fig. 01 — the mixer, one lane per instrument",
  },
  "guitar-sound-effects": {
    src: asset("/projects/guitar-sound-effects.jpg"),
    alt: "soundbox: a guitar amp head and speaker cabinet on the left, a pedalboard of nine coloured pedals on the right.",
    ratio: "2400 / 1480",
    caption: "fig. 01 — the rig, amp on the left, pedals on the right",
  },
};
