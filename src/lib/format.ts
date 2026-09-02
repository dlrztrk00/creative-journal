/**
 * Formatting helpers shared by the editorial furniture.
 *
 * Kept framework-agnostic and pure so both server components and client
 * components can use them.
 */

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** "3d ago", "5h ago", "just now" — the terse style used in page metadata. */
export function relativeTime(iso: string, now: Date = new Date()): string {
  const elapsed = now.getTime() - new Date(iso).getTime();

  if (elapsed < MINUTE) return "just now";
  if (elapsed < HOUR) return `${Math.floor(elapsed / MINUTE)}m ago`;
  if (elapsed < DAY) return `${Math.floor(elapsed / HOUR)}h ago`;

  const days = Math.floor(elapsed / DAY);
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

