import type { Video } from "@/types/integrations";
import { asset } from "@/lib/asset";

/**
 * The covers, written down rather than fetched.
 *
 * The music spread used to call the YouTube Data API on every render, which
 * meant a Google Cloud project, an API key and a daily quota — for eleven
 * videos that change a few times a year. So they are content, and content lives
 * in the repository like everything else here.
 *
 * Read from the channel's uploads feed on 2 September 2026: titles, durations,
 * view counts and publication dates are accurate as of that date. The covers
 * themselves were downloaded to `public/covers/`, so the page depends on no
 * outside host at all — not even for an image.
 *
 * Order is the printed order. The Maneskin cover leads because it is the one
 * people actually found; the rest follow newest first.
 *
 * `topComment` is yours to fill in. Nothing fetches it — a comment worth
 * setting as a pull quote is an editorial choice, so type it here and it
 * appears beneath the cover.
 */
export const COVERS: Video[] = [
  {
    id: "GqFjESZ10Ts",
    title: "Maneskin - Beggin' guitar cover by me",
    description: "instagram : https://www.instagram.com/dlrztrk00",
    thumbnail: asset("/covers/GqFjESZ10Ts.jpg"),
    url: "https://www.youtube.com/watch?v=GqFjESZ10Ts",
    duration: "3:29",
    views: 679615,
    publishedAt: "2021-06-23T19:07:47+00:00",
    topComment: null,
  },
  {
    id: "OEtSH0B4Gpw",
    title: "The Strokes - Selfless guitar cover",
    description: "instagram : https://www.instagram.com/dlrztrk00",
    thumbnail: asset("/covers/OEtSH0B4Gpw.jpg"),
    url: "https://www.youtube.com/watch?v=OEtSH0B4Gpw",
    duration: "3:36",
    views: 419,
    publishedAt: "2024-11-03T15:23:23+00:00",
    topComment: null,
  },
  {
    id: "kvK3iswjb5s",
    title: "Taylor Swift - Enchanted guitar cover by me",
    description: "instagram : https://www.instagram.com/dlrztrk00",
    thumbnail: asset("/covers/kvK3iswjb5s.jpg"),
    url: "https://www.youtube.com/watch?v=kvK3iswjb5s",
    duration: "5:50",
    views: 846,
    publishedAt: "2023-03-19T17:15:17+00:00",
    topComment: null,
  },
  {
    id: "f8wMblCoLNI",
    title: "Arctic Monkeys - No. 1 Party Anthem guitar cover by me",
    description: "instagram : https://www.instagram.com/dlrztrk00",
    thumbnail: asset("/covers/f8wMblCoLNI.jpg"),
    url: "https://www.youtube.com/watch?v=f8wMblCoLNI",
    duration: "3:56",
    views: 21466,
    publishedAt: "2021-12-05T16:09:49+00:00",
    topComment: null,
  },
  {
    id: "zyrP1wZHkYo",
    title: "Arctic Monkeys - Mardy Bum guitar cover by me",
    description: "instagram : https://www.instagram.com/dlrztrk00",
    thumbnail: asset("/covers/zyrP1wZHkYo.jpg"),
    url: "https://www.youtube.com/watch?v=zyrP1wZHkYo",
    duration: "2:54",
    views: 4975,
    publishedAt: "2021-11-20T16:50:01+00:00",
    topComment: null,
  },
  {
    id: "ds5rksO0ec0",
    title: "Panic! at the Disco - Lying Is The Most... (guitar cover by me)",
    description: "instagram : https://www.instagram.com/dlrztrk00",
    thumbnail: asset("/covers/ds5rksO0ec0.jpg"),
    url: "https://www.youtube.com/watch?v=ds5rksO0ec0",
    duration: "2:58",
    views: 3078,
    publishedAt: "2021-11-07T14:18:57+00:00",
    topComment: null,
  },
  {
    id: "qC3_LWBNQls",
    title: "Declan McKenna - Brazil cover by me",
    description: "instagram : https://www.instagram.com/dlrztrk00",
    thumbnail: asset("/covers/qC3_LWBNQls.jpg"),
    url: "https://www.youtube.com/watch?v=qC3_LWBNQls",
    duration: "4:09",
    views: 8610,
    publishedAt: "2021-10-10T15:18:51+00:00",
    topComment: null,
  },
  {
    id: "cSftqhmY0B0",
    title: "Weezer - Island In The Sun cover by me",
    description: "instagram : https://www.instagram.com/dlrztrk00",
    thumbnail: asset("/covers/cSftqhmY0B0.jpg"),
    url: "https://www.youtube.com/watch?v=cSftqhmY0B0",
    duration: "3:20",
    views: 6341,
    publishedAt: "2021-08-13T14:35:43+00:00",
    topComment: null,
  },
  {
    id: "8JZ52YCNZ0s",
    title: "WILLOW - t r a n s p a r e n t s o u l (feat. Travis Barker) cover by me",
    description: "instagram : https://www.instagram.com/dlrztrk00",
    thumbnail: asset("/covers/8JZ52YCNZ0s.jpg"),
    url: "https://www.youtube.com/watch?v=8JZ52YCNZ0s",
    duration: "2:48",
    views: 5290,
    publishedAt: "2021-07-19T13:29:51+00:00",
    topComment: null,
  },
  {
    id: "AJ6OcgRxPYU",
    title: "t.A.T.u. - All The Things She Said guitar cover by me",
    description: "instagram : https://www.instagram.com/dlrztrk00",
    thumbnail: asset("/covers/AJ6OcgRxPYU.jpg"),
    url: "https://www.youtube.com/watch?v=AJ6OcgRxPYU",
    duration: "3:20",
    views: 44002,
    publishedAt: "2021-07-11T11:00:46+00:00",
    topComment: null,
  },
  {
    id: "S_QF5H_z6vQ",
    title: "My Chemical Romance - Summertime Cover by Dilara Öztürk",
    description: "instagram : https://instagram.com/dlrztrk6167",
    thumbnail: asset("/covers/S_QF5H_z6vQ.jpg"),
    url: "https://www.youtube.com/watch?v=S_QF5H_z6vQ",
    duration: "4:01",
    views: 7707,
    publishedAt: "2021-01-02T17:38:10+00:00",
    topComment: null,
  },
];
