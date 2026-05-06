import type { LucideIcon } from "lucide-react";

export type Step = {
  number: string;
  title: string;
  description: string;
  side: "left" | "right";
  icon?: LucideIcon;
  imageSrc?: string;
  imageAlt?: string;
};

export type Point = {
  x: number;
  y: number;
};

export type PathLayout = {
  width: number;
  height: number;
  path: string;
  length: number;
};

export type DesktopClusterPlacement = {
  nodeXPercent: number;
  xOffset: number;
};
