"use client";

import { LocalTechStackIcon } from "@/components/ui/local-tech-stack-icons";
import type { TechStackIconProps } from "./tech-stack-icon.types";

export type {
  TechStackIconName,
  TechStackIconVariant,
} from "./tech-stack-icon.types";

type LazyTechStackIconProps = TechStackIconProps & {
  preloadMargin?: string;
};

export function LazyTechStackIcon({
  preloadMargin,
  ...iconProps
}: LazyTechStackIconProps) {
  void preloadMargin;

  return <LocalTechStackIcon {...iconProps} />;
}
