import type { NextConfig } from "next";

/**
 * Nothing to configure.
 *
 * `images.remotePatterns` used to allow-list YouTube's thumbnail CDN, and later
 * TikTok's. Neither is reached any more — every image the publication shows is
 * a file under `public/`, so no external host needs permission and none can
 * fail. Add a pattern back only if a remote image is genuinely introduced.
 */
const nextConfig: NextConfig = {};

export default nextConfig;
