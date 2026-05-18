import type { StaticImageData } from "next/image";

import abstract1 from "@/public/abstract-icons/abstract1.png";
import abstract2 from "@/public/abstract-icons/abstract2.png";
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
    5: {
      initialColor: "#534AB7",
      activeColor: "#534AB7",
    },
  },
] as const;

export const phraseUnreadColor = "rgba(232,232,240,0.28)";
export const phraseReadColor = "#E8E8F0";
export const stickyStageHeight = `${100 + valuePhrases.length * 200}svh`;
const benefitsOrnamentWidth = "clamp(8.75rem,19vw,14.5rem)";
export const benefitsOrnamentSizes =
  "(min-width: 1280px) 14.5rem, (min-width: 640px) 19vw, 8.75rem";

const phraseOrnamentsCatalog = [
  [
    {
      src: abstract5,
      width: benefitsOrnamentWidth,
      top: "11%",
      topMobile: "5%",
      left: "clamp(1rem,7vw,5.75rem)",
      leftMobile: "4%",
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
      topMobile: "78%",
      right: "clamp(1rem,7vw,5.75rem)",
      rightMobile: "3%",
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
      src: abstract1,
      width: benefitsOrnamentWidth,
      top: "71%",
      topMobile: "74%",
      left: "clamp(1.25rem,8vw,6rem)",
      leftMobile: "6%",
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
      top: "16%",
      topMobile: "9%",
      right: "clamp(2rem,11vw,9rem)",
      rightMobile: "5%",
      rotation: 8,
      opacity: 0.76,
      driftDuration: "29s",
      driftDelay: "-14s",
      driftX: "-20px",
      driftY: "18px",
    },
  ],
] as const satisfies readonly (readonly PhraseOrnament[])[];

function buildOrnamentPositionSignature(
  ornament: PhraseOrnament,
  viewport: "desktop" | "mobile",
) {
  const top = viewport === "mobile"
    ? ornament.topMobile ?? ornament.top
    : ornament.top;
  const left = viewport === "mobile"
    ? ornament.leftMobile ?? ornament.left ?? "auto"
    : ornament.left ?? "auto";
  const right = viewport === "mobile"
    ? ornament.rightMobile ?? ornament.right ?? "auto"
    : ornament.right ?? "auto";

  return `top:${top}|left:${left}|right:${right}`;
}

function assertUniquePhraseOrnamentPositions(
  collection: readonly (readonly PhraseOrnament[])[],
) {
  for (const viewport of ["desktop", "mobile"] as const) {
    const seenPositions = new Map<string, string>();

    collection.forEach((ornaments, phraseIndex) => {
      ornaments.forEach((ornament, ornamentIndex) => {
        const signature = buildOrnamentPositionSignature(ornament, viewport);
        const positionKey = `${viewport}:${signature}`;
        const existingOwner = seenPositions.get(positionKey);

        if (existingOwner) {
          throw new Error(
            `Posicion ornamental duplicada en benefits (${viewport}): ${existingOwner} y frase ${phraseIndex + 1}, ornamento ${ornamentIndex + 1}`,
          );
        }

        seenPositions.set(
          positionKey,
          `frase ${phraseIndex + 1}, ornamento ${ornamentIndex + 1}`,
        );
      });
    });
  }
}

assertUniquePhraseOrnamentPositions(phraseOrnamentsCatalog);

export const phraseOrnaments: readonly (readonly PhraseOrnament[])[] =
  phraseOrnamentsCatalog;
