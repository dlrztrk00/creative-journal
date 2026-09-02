import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import type { MDXComponents } from "mdx/types";

import { EditorialImage } from "./EditorialImage";
import { FigureCaption } from "./FigureCaption";
import { MarginNote, PullQuote, HandwrittenNote } from "./MarginNote";
import { VideoEmbed } from "./VideoEmbed";
import { Circled } from "./HandwrittenNote";
import { SketchPlate } from "./SketchPlate";
import { ExternalLink } from "@/components/ui/ExternalLink";

/**
 * The vocabulary available to every MDX file.
 *
 * This mapping is the contract that lets an article use figures, captions,
 * margin notes, pull quotes, code, video and sketches without any application
 * code changing. Extending the vocabulary means adding a component here — never
 * editing a page.
 */
const components: MDXComponents = {
  Figure: EditorialImage,
  Caption: FigureCaption,
  MarginNote,
  PullQuote,
  Note: HandwrittenNote,
  Circled,
  Video: VideoEmbed,
  Sketch: SketchPlate,
  a: ({ href, children, ...rest }) =>
    href ? (
      <ExternalLink href={href} {...rest}>
        {children}
      </ExternalLink>
    ) : (
      <span {...rest}>{children}</span>
    ),
};

/** Shiki theme for fenced code, tuned to the publication's dark stock. */
const prettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: false,
} as const;

/**
 * Renders an MDX body as a React Server Component. No client JavaScript ships
 * for the article itself — only for the interactive components it opts into.
 */
export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
        },
      }}
    />
  );
}
