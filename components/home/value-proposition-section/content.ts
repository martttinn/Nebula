import type { StaticImageData } from "next/image";

import abstract1 from "@/public/abstract-icons/abstract1.png";
import abstract2 from "@/public/abstract-icons/abstract2.png";
import abstract3 from "@/public/abstract-icons/abstract3.png";
import abstract4 from "@/public/abstract-icons/abstract4.png";
import abstract5 from "@/public/abstract-icons/abstract5.png";
import abstract6 from "@/public/abstract-icons/abstract6.png";

export type PhraseOrnament = {
  src: StaticImageData;
  width: string;
  top: string;
  topMobile?: string;
  left?: string;
  leftMobile?: string;
  right?: string;
  rightMobile?: string;
  rotation: number;
  entryOpacity?: number;
  opacity: number;
  driftDuration: string;
  driftDelay: string;
  driftX: string;
  driftY: string;
};

export const valuePhrases = [
  "Comprendemos tu negocio antes de construir.",
  "Recupera el tiempo perdido en tareas repetitivas.",
  "Mantenemos y mejoramos continuamente tu producto.",
];

export const phraseWordOverrides = [
  {
    5: {
      initialColor: "#534AB7",
      activeColor: "#534AB7",
    },
  },
  {
    2: {
      initialColor: "#534AB7",
      activeColor: "#534AB7",
    },
  },
  {
    5: {
      initialColor: "#534AB7",
      activeColor: "#534AB7",
    },
  },
] as const;

export const phraseUnreadColor = "rgba(232,232,240,0.28)";
export const phraseReadColor = "#E8E8F0";
export const stickyStageHeight = `${100 + valuePhrases.length * 200}svh`;
export const benefitsOrnamentWidth = "clamp(8.75rem,19vw,14.5rem)";
export const benefitsOrnamentSizes =
  "(min-width: 1280px) 14.5rem, (min-width: 640px) 19vw, 8.75rem";

export const phraseOrnaments: readonly (readonly PhraseOrnament[])[] = [
  [
    {
      src: abstract5,
      width: benefitsOrnamentWidth,
      top: "11%",
      topMobile: "4%",
      left: "clamp(1rem,7vw,5.75rem)",
      leftMobile: "2%",
      rotation: -10,
      entryOpacity: 0.42,
      opacity: 1,
      driftDuration: "24s",
      driftDelay: "-4s",
      driftX: "20px",
      driftY: "16px",
    },
    {
      src: abstract6,
      width: benefitsOrnamentWidth,
      top: "68%",
      topMobile: "80%",
      right: "clamp(1rem,7vw,5.75rem)",
      rightMobile: "2%",
      rotation: 9,
      entryOpacity: 0.46,
      opacity: 1,
      driftDuration: "28s",
      driftDelay: "-10s",
      driftX: "-22px",
      driftY: "18px",
    },
  ],
  [
    {
      src: abstract3,
      width: benefitsOrnamentWidth,
      top: "12%",
      topMobile: "4%",
      left: "clamp(0.75rem,6vw,5rem)",
      leftMobile: "2%",
      rotation: -8,
      opacity: 0.76,
      driftDuration: "25s",
      driftDelay: "-6s",
      driftX: "18px",
      driftY: "20px",
    },
    {
      src: abstract4,
      width: benefitsOrnamentWidth,
      top: "68%",
      topMobile: "80%",
      right: "clamp(0.75rem,6vw,5rem)",
      rightMobile: "2%",
      rotation: 10,
      opacity: 0.72,
      driftDuration: "27s",
      driftDelay: "-12s",
      driftX: "-18px",
      driftY: "16px",
    },
  ],
  [
    {
      src: abstract1,
      width: benefitsOrnamentWidth,
      top: "69%",
      topMobile: "80%",
      left: "clamp(0.75rem,6vw,5rem)",
      leftMobile: "2%",
      rotation: -11,
      opacity: 0.74,
      driftDuration: "26s",
      driftDelay: "-7s",
      driftX: "20px",
      driftY: "-18px",
    },
    {
      src: abstract2,
      width: benefitsOrnamentWidth,
      top: "12%",
      topMobile: "4%",
      right: "clamp(0.75rem,6vw,5rem)",
      rightMobile: "2%",
      rotation: 8,
      opacity: 0.76,
      driftDuration: "29s",
      driftDelay: "-14s",
      driftX: "-20px",
      driftY: "18px",
    },
  ],
];
