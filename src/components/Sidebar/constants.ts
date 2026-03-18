import {
  IconGrid,
  IconPlay,
} from "@/lib/icons";
import type { NavSection } from "./types";

export const navSections: NavSection[] = [
  {
    title: "",
    items: [
      {
        label: "Dashboard",
        href: "/overall",
      },
      {
        label: "Destination KP",
        href: "/destination-kp",
      },
      { label: "YSN", href: "/ysn" },
      {
        label: "Battle Lounge",
        href: "/battle-lounge",
      },
      // {
      //   label: "Game Reel",
      //   href: "/game-reel",
      // },
      {
        label: "Rivalis",
        href: "/connected-athlete",
      },
      {
        label: "Connected",
        href: "/connected",
      },
      {
        label: "ADP",
        href: "/adp",
      },
      {
        label: "Chase",
        href: "/chase",
      },
      {
        label: "YouTube Data",
        icon: IconPlay,
        logo: "/youtube.svg",
        href: "/youtube-data",
      },
      {
        label: "Google Analytics",
        icon: IconGrid,
        logo: "/analytics.svg",
        href: "/google-analytics",
      },
    ],
  },
];

export const getInitialActiveItemKey = (pathname: string) => {
  for (const section of navSections) {
    for (const item of section.items) {
      const itemKey = `${section.title}-${item.label}`;
      if (item.href && (pathname === item.href || pathname.startsWith(item.href + "/"))) {
        return itemKey;
      }
      if (item.active) {
        return itemKey;
      }
    }
  }
  return "";
};
