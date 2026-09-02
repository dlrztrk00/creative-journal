import type { MusicRecord } from "@/types/content";

/**
 * The music you are choosing to show, not the music a service happened to
 * catch you playing.
 *
 * This is an editorial choice, so it lives in the repository like every other
 * one: change the record below, commit, and the spread changes. Nothing here
 * calls an API and nothing needs a key.
 *
 * The spread prints one record, as a credit line beneath the covers.
 */

/** The record the music spread leads with — the whole of the listening line. */
export const FEATURED: MusicRecord = {
  title: "Automatic Stop",
  artist: "The Strokes",
  album: "Room on Fire",
  year: 2003,
  sleeve: null,
  url: "https://open.spotify.com/track/1AhDOtG9vPSOmsWgNW0BEY",
};
