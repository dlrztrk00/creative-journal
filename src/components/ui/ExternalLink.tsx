import type { AnchorHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { VisuallyHidden } from "./VisuallyHidden";

interface ExternalLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
  /** Spoken name, since visible labels are terse ("github ↗"). */
  description?: string;
  /** The red hairline beneath the label. On by default. */
  underline?: boolean;
}

/**
 * An outbound link, set in mono with the publication's red hairline beneath it.
 * `mailto:` and `tel:` links stay in the same tab; everything else opens away.
 */
export function ExternalLink({
  href,
  children,
  description,
  underline = true,
  className,
  ...rest
}: ExternalLinkProps) {
  const isSameTab = /^(mailto:|tel:|#|\/)/.test(href);

  return (
    <a
      href={href}
      className={clsx(underline && "rule-under", className)}
      {...(isSameTab
        ? {}
        : { target: "_blank", rel: "noopener noreferrer" })}
      {...rest}
    >
      {children}
      {description ? <VisuallyHidden> — {description}</VisuallyHidden> : null}
    </a>
  );
}
