import type { Commit, Repo } from "@/types/integrations";

/**
 * The repositories, written down rather than fetched.
 *
 * This spread used to call the GitHub API on every render. That cost a
 * credential to work at all — sixty anonymous requests an hour is roughly one
 * visit before the page starts rendering empty — and it made the contents of
 * the page depend on a service being up. These facts change a few times a
 * year, so they are content, and content lives in the repository like
 * everything else in this publication.
 *
 * Read from the GitHub API once, on 2 September 2026, and accurate as of that
 * date. Refreshing it means editing this file.
 *
 * Order is the printed order. The guitar work leads on purpose.
 */
export const REPOSITORIES: Repo[] = [
  {
    name: "guitar-splitter",
    fullName: "dlrztrk00/guitar-splitter",
    description: "Split a song into its instruments, mute the guitar, and play it yourself. A local stem separator for Intel Macs, where Logic Pro's Stem Splitter does not run.",
    url: "https://github.com/dlrztrk00/guitar-splitter",
    homepage: null,
    languages: [{ name: "Python", bytes: 67152 }, { name: "Shell", bytes: 3636 }],
    primaryLanguage: "Python",
    stars: 0,
    forks: 0,
    pushedAt: "2026-08-30T10:31:21Z",
    updatedAt: "2026-08-30T10:35:14Z",
    topics: ["audio-ml", "audio-processing", "backing-tracks", "demucs", "guitar", "intel-mac", "machine-learning", "macos", "music", "music-practice", "python", "pytorch", "source-separation", "stem-separation"],
    archived: false,
  },
  {
    name: "guitar-sound-effects",
    fullName: "dlrztrk00/guitar-sound-effects",
    description: "soundbox — a guitar pedal built in the browser. Real-time distortion, EQ and a live spectrum with the Web Audio API. Plug in a guitar and play.",
    url: "https://github.com/dlrztrk00/guitar-sound-effects",
    homepage: "https://dlrztrk00.github.io/guitar-sound-effects/",
    languages: [{ name: "TypeScript", bytes: 73226 }, { name: "CSS", bytes: 29903 }, { name: "HTML", bytes: 386 }],
    primaryLanguage: "TypeScript",
    stars: 0,
    forks: 0,
    pushedAt: "2026-08-25T19:43:43Z",
    updatedAt: "2026-08-30T10:38:05Z",
    topics: ["audio-effects", "audio-processing", "digital-signal-processing", "distortion", "dsp", "guitar", "guitar-pedal", "music", "react", "real-time-audio", "spectrum-analyzer", "typescript", "vite", "web-audio-api", "webaudio"],
    archived: false,
  },
  {
    name: "FootballManagementSystem",
    fullName: "dlrztrk00/FootballManagementSystem",
    description: "Developed a football management system in Java with team registration, match simulations, and finalist selection using a structured algorithm.",
    url: "https://github.com/dlrztrk00/FootballManagementSystem",
    homepage: null,
    languages: [{ name: "Java", bytes: 28416 }],
    primaryLanguage: "Java",
    stars: 0,
    forks: 0,
    pushedAt: "2026-07-25T09:23:10Z",
    updatedAt: "2026-07-25T09:23:17Z",
    topics: [],
    archived: false,
  },
  {
    name: "GalaxyShooterGame",
    fullName: "dlrztrk00/GalaxyShooterGame",
    description: "Galaxy Shooter game made with C++ and OpenGL GLUT",
    url: "https://github.com/dlrztrk00/GalaxyShooterGame",
    homepage: null,
    languages: [{ name: "C++", bytes: 13364 }],
    primaryLanguage: "C++",
    stars: 0,
    forks: 0,
    pushedAt: "2026-07-25T09:12:48Z",
    updatedAt: "2026-07-25T09:13:14Z",
    topics: [],
    archived: false,
  },
  {
    name: "RacingCarView",
    fullName: "dlrztrk00/RacingCarView",
    description: "View from a Window using c++ and opengl glut",
    url: "https://github.com/dlrztrk00/RacingCarView",
    homepage: null,
    languages: [{ name: "C++", bytes: 12927 }],
    primaryLanguage: "C++",
    stars: 0,
    forks: 0,
    pushedAt: "2026-07-25T09:15:27Z",
    updatedAt: "2026-07-25T09:16:33Z",
    topics: [],
    archived: false,
  },
  {
    name: "vectorGame",
    fullName: "dlrztrk00/vectorGame",
    description: "Game with c++ and OpenGl Glut, checkCollison function",
    url: "https://github.com/dlrztrk00/vectorGame",
    homepage: null,
    languages: [{ name: "C++", bytes: 9093 }],
    primaryLanguage: "C++",
    stars: 0,
    forks: 0,
    pushedAt: "2025-01-29T11:11:29Z",
    updatedAt: "2025-01-29T11:12:58Z",
    topics: [],
    archived: false,
  },
  {
    name: "Musicshop",
    fullName: "dlrztrk00/Musicshop",
    description: "A marketplace built in PHP, with user authentication, a MySQL database behind it, and the front and back ends kept in step.",
    url: "https://github.com/dlrztrk00/Musicshop",
    homepage: null,
    languages: [{ name: "PHP", bytes: 46432 }, { name: "CSS", bytes: 7377 }],
    primaryLanguage: "PHP",
    stars: 0,
    forks: 0,
    pushedAt: "2025-01-28T18:08:24Z",
    updatedAt: "2025-01-28T18:08:27Z",
    topics: [],
    archived: false,
  },
  {
    name: "HolidayPlanner",
    fullName: "dlrztrk00/HolidayPlanner",
    description: "A responsive trip planner in plain HTML, CSS and JavaScript, built around an interactive itinerary.",
    url: "https://github.com/dlrztrk00/HolidayPlanner",
    homepage: null,
    languages: [{ name: "HTML", bytes: 8317 }, { name: "JavaScript", bytes: 4358 }, { name: "CSS", bytes: 3931 }],
    primaryLanguage: "HTML",
    stars: 0,
    forks: 0,
    pushedAt: "2024-05-22T12:21:39Z",
    updatedAt: "2025-01-28T18:07:50Z",
    topics: ["css", "html"],
    archived: false,
  },
];

/**
 * The most recent commit on each repository, keyed by name — the "last commit"
 * line the projects spread prints. Same snapshot, same date as above.
 */
export const LATEST_COMMITS: Record<string, Commit> = {
  "guitar-splitter": {
    sha: "ef16026da5efabc965c83c84701a006bf71655a7",
    message: "Rewrite the README for someone who has never seen this",
    url: "https://github.com/dlrztrk00/guitar-splitter/commit/ef16026da5efabc965c83c84701a006bf71655a7",
    committedAt: "2026-08-30T10:31:19Z",
  },
  "guitar-sound-effects": {
    sha: "c910917cf2ba105789879de3d0829cd6e30f08e7",
    message: "Remove unused Vite/React scaffold assets",
    url: "https://github.com/dlrztrk00/guitar-sound-effects/commit/c910917cf2ba105789879de3d0829cd6e30f08e7",
    committedAt: "2026-08-25T19:43:41Z",
  },
  "FootballManagementSystem": {
    sha: "daa8925c5b5ebb156aadf9097db805de2e044359",
    message: "Add README for Tournament Simulation project",
    url: "https://github.com/dlrztrk00/FootballManagementSystem/commit/daa8925c5b5ebb156aadf9097db805de2e044359",
    committedAt: "2026-07-25T09:23:10Z",
  },
  "GalaxyShooterGame": {
    sha: "1ae2312e2bf027b8268e90f331cc789e9a631147",
    message: "Refactor controls section in README",
    url: "https://github.com/dlrztrk00/GalaxyShooterGame/commit/1ae2312e2bf027b8268e90f331cc789e9a631147",
    committedAt: "2026-07-25T09:12:47Z",
  },
  "RacingCarView": {
    sha: "a41bc515ee1f4eae1ba00515a98a5bbaeb379a20",
    message: "Initialize README with project details",
    url: "https://github.com/dlrztrk00/RacingCarView/commit/a41bc515ee1f4eae1ba00515a98a5bbaeb379a20",
    committedAt: "2026-07-25T09:15:27Z",
  },
  "vectorGame": {
    sha: "f980754af2a490d39c0ba66fadabec52b29dc169",
    message: "Add files via upload",
    url: "https://github.com/dlrztrk00/vectorGame/commit/f980754af2a490d39c0ba66fadabec52b29dc169",
    committedAt: "2025-01-29T11:11:29Z",
  },
  "Musicshop": {
    sha: "596aa0fb4f6ccb4b7bf5c7675098f16f674d6d9a",
    message: "Delete Final_Project/FinalProject directory",
    url: "https://github.com/dlrztrk00/Musicshop/commit/596aa0fb4f6ccb4b7bf5c7675098f16f674d6d9a",
    committedAt: "2025-01-28T18:08:24Z",
  },
  "HolidayPlanner": {
    sha: "1d85102591a00f719ea2e0a269ebe1283b273475",
    message: "tamam",
    url: "https://github.com/dlrztrk00/HolidayPlanner/commit/1d85102591a00f719ea2e0a269ebe1283b273475",
    committedAt: "2024-05-22T12:21:30Z",
  },
};
