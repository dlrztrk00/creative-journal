/**
 * A path to a file in `public/`, prefixed for wherever the site is served from.
 *
 * Next prefixes its own bundles and every `<Link>` with `basePath` on its own,
 * but a plain string pointing at `public/` is opaque to it — `/portrait.jpg`
 * ships as `/portrait.jpg` and 404s the moment the site lives under a
 * sub-path, which is exactly how GitHub Pages serves a project repository.
 *
 * `NEXT_PUBLIC_BASE_PATH` is inlined at build time, so this resolves the same
 * in a server component and a client one. It is empty locally, empty for a
 * user page (`<owner>.github.io`) and empty behind a custom domain; the deploy
 * workflow fills it in only when the site is served from a sub-path.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE}${path}`;
}
