import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Archivo, IBM_Plex_Mono } from "next/font/google";
import { SITE } from "@/data/site";
import "./globals.css";

/**
 * Typefaces load through next/font, which self-hosts them and inlines the
 * @font-face rules — no render-blocking request to Google, no layout shift.
 * Each exposes a CSS variable consumed by the Tailwind theme in globals.css.
 */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    siteName: SITE.title,
    title: SITE.title,
    description: SITE.description,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#7A1015",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={SITE.locale}
      className={`${instrumentSerif.variable} ${archivo.variable} ${plexMono.variable}`}
    >
      <body>
        <a
          href="#page"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:font-mono"
        >
          Skip to page
        </a>
        {children}
      </body>
    </html>
  );
}
