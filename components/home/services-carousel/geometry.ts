import {
  ARC_RADIUS,
  ARC_SPAN_DEG,
  DEG_TO_RAD,
  EDGE_SCALE_FACTOR,
} from "./constants";
import type { CardTransform } from "./types";
import { roundTo } from "./utils";

export function computeArcTransforms(
  progress: number,
  cardCount: number,
  reducedMotion: boolean,
  endProgress = 1,
): CardTransform[] {
  const clampedProgress = Math.min(progress / endProgress, 1);
  const activeFloat = clampedProgress * (cardCount - 1);
  const angleStep = ARC_SPAN_DEG / Math.max(cardCount - 1, 1);
  const halfSpan = ARC_SPAN_DEG / 2;

  return Array.from({ length: cardCount }, (_, index) => {
    const offset = index - activeFloat;
    const angleDeg = offset * angleStep;
    const angleRad = angleDeg * DEG_TO_RAD;
    const x = Math.sin(angleRad) * ARC_RADIUS;
    const y = (1 - Math.cos(angleRad)) * ARC_RADIUS * 0.35;
    const normalizedDistance = Math.min(Math.abs(angleDeg) / halfSpan, 1);
    const rotation = reducedMotion ? 0 : roundTo(angleDeg * 0.38, 3);
    const scale = roundTo(1 - normalizedDistance * EDGE_SCALE_FACTOR, 4);
    const zIndex = cardCount - Math.round(Math.abs(offset));

    return {
      x: roundTo(x, 4),
      y: roundTo(y, 4),
      rotation,
      scale,
      opacity: 1,
      zIndex,
    };
  });
}

export function getActiveIndex(
  progress: number,
  cardCount: number,
  endProgress = 1,
) {
  return Math.round(Math.min(progress / endProgress, 1) * (cardCount - 1));
}
