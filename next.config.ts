import type { NextConfig } from "next";

/**
 * Built as a static export, for GitHub Pages.
 *
 * `next build` writes plain HTML, CSS, JS and assets to `out/` — there is no
 * server, no runtime and nothing to configure on the host. The publication was
 * already fetching nothing at render time, so nothing had to be given up to
 * get here.
 *
 * Two consequences worth knowing:
 *
 * - Image optimisation is off, because it needs a server. Every file under
 *   `public/` is served exactly as it sits in the repository, so the scans in
 *   `public/sketches/` are sized for their largest use (the zoomed viewer at
 *   700 design pixels, doubled for retina) rather than left at scanner
 *   resolution.
 * - Pages serves a project repository from a sub-path, so the build needs to
 *   know it. `NEXT_PUBLIC_BASE_PATH` is set by the deploy workflow; it stays
 *   empty locally, for a user-page repository and behind a custom domain, all
 *   of which are served from the root. It is `NEXT_PUBLIC_` because
 *   `src/lib/asset.ts` reads the same value to prefix files in `public/`,
 *   which Next does not prefix on its own.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath,
  /** Pages resolves `/projects/` to a directory; without this it 404s. */
  trailingSlash: true,
};

export default nextConfig;
