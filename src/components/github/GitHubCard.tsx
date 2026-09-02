import type { Commit, Repo } from "@/types/integrations";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { relativeTime } from "@/lib/format";

/**
 * A repository, printed as a specimen card: what it is, what it is written in,
 * and when it last moved.
 *
 * Every field comes from the GitHub API — none of it is maintained by hand — so
 * a project write-up never goes stale about its own code.
 */
export function GitHubCard({
  repo,
  commit,
}: {
  repo: Repo;
  commit?: Commit | null;
}) {
  const total = repo.languages.reduce((sum, l) => sum + l.bytes, 0);

  return (
    <aside
      className="not-prose"
      style={{
        margin: "calc(32 * var(--nb-u)) 0",
        padding: "calc(24 * var(--nb-u)) calc(28 * var(--nb-u))",
        border: "var(--rule-w) solid var(--ink)",
      }}
    >
      <div className="flex items-baseline justify-between">
        <h2 className="font-mono text-label tracking-label text-accent">
          REPOSITORY
        </h2>
        <ExternalLink
          href={repo.url}
          description={`${repo.fullName} on GitHub`}
          className="font-mono text-meta"
        >
          {repo.fullName} ↗
        </ExternalLink>
      </div>

      {repo.description ? (
        <p
          className="font-body text-body-sm text-[#222222]"
          style={{ marginTop: "calc(16 * var(--nb-u))" }}
        >
          {repo.description}
        </p>
      ) : null}

      {repo.languages.length > 0 ? (
        <>
          <div
            aria-hidden
            className="flex overflow-hidden"
            style={{
              height: "calc(4 * var(--nb-u))",
              marginTop: "calc(20 * var(--nb-u))",
            }}
          >
            {repo.languages.map((language, i) => (
              <span
                key={language.name}
                className={i === 0 ? "bg-accent" : "bg-rule"}
                style={{ width: `${(language.bytes / total) * 100}%` }}
              />
            ))}
          </div>
          <p
            className="font-mono text-folio tracking-note text-muted"
            style={{ marginTop: "calc(10 * var(--nb-u))" }}
          >
            {repo.languages
              .slice(0, 4)
              .map(
                (language) =>
                  `${language.name} ${Math.round((language.bytes / total) * 100)}%`,
              )
              .join(" · ")}
          </p>
        </>
      ) : null}

      <dl
        className="flex flex-wrap gap-24 font-mono text-folio tracking-note text-faint"
        style={{ marginTop: "calc(16 * var(--nb-u))" }}
      >
        <div className="flex gap-6">
          <dt>UPDATED</dt>
          <dd className="text-muted">{relativeTime(repo.pushedAt)}</dd>
        </div>
        {commit ? (
          <div className="flex gap-6">
            <dt>LAST COMMIT</dt>
            <dd className="text-muted">{commit.message}</dd>
          </div>
        ) : null}
        <div className="flex gap-6">
          <dt>STARS</dt>
          <dd className="text-muted">{repo.stars}</dd>
        </div>
      </dl>
    </aside>
  );
}
