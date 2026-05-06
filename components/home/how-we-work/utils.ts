import type { CSSProperties } from "react";

import { DEBUG_BORDERS } from "./constants";

export function debugOutline(color: string, offset = -1): CSSProperties {
  if (!DEBUG_BORDERS) {
    return {};
  }

  return {
    outline: `1px dashed ${color}`,
    outlineOffset: `${offset}px`,
  };
}
