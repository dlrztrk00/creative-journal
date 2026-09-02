/**
 * Integration contracts.
 *
 * The UI depends on these shapes and never on a vendor payload. Each service in
 * `src/lib/<service>/` ships a live adapter and a mock adapter implementing the
 * same interface, so swapping one for the other is an environment concern, not
 * a code change.
 */

// -------------------------------------------------------- repositories

/**
 * The shape a repository is printed in. Named after the API it was first read
 * from, but nothing fetches it any more — `data/repositories.ts` holds the
 * values and this is the contract the cards are written against.
 */

export interface RepoLanguage {
  name: string;
  /** Bytes of source, as reported by GitHub. Used for ordering and shares. */
  bytes: number;
}

export interface Repo {
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  homepage: string | null;
  /** Ordered most-used first. */
  languages: RepoLanguage[];
  primaryLanguage: string | null;
  stars: number;
  forks: number;
  /** ISO timestamp of the most recent push. */
  pushedAt: string;
  updatedAt: string;
  topics: string[];
  archived: boolean;
}

export interface Commit {
  sha: string;
  message: string;
  url: string;
  committedAt: string;
}

// -------------------------------------------------------------- recordings

/**
 * The shape a cover is printed in. Nothing fetches it — `data/videos.ts` holds
 * the values, and this is the contract the panel is written against.
 */

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  url: string;
  /** Display string, e.g. "3:42". */
  duration: string;
  views: number | null;
  publishedAt: string;
  /** The design surfaces a "top comment" pull quote under the player. */
  topComment?: { text: string; author: string } | null;
}
