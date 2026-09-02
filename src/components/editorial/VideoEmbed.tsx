interface VideoEmbedProps {
  /** YouTube video id, e.g. "dQw4w9WgXcQ". */
  id: string;
  title: string;
  /** Fills the available width by default. */
  className?: string;
}

/**
 * An embedded player, framed like every other plate in the publication.
 *
 * Uses the privacy-preserving `youtube-nocookie` host and lazy-loads the frame,
 * so an article with three videos still starts fast.
 */
export function VideoEmbed({ id, title, className }: VideoEmbedProps) {
  return (
    <figure className={className}>
      <div
        className="paper-stock relative w-full"
        style={{
          aspectRatio: "16 / 9",
          border: "var(--rule-w) solid var(--ink)",
        }}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </figure>
  );
}
