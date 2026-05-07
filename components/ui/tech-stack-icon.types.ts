import type { CSSProperties } from "react";

export type TechStackIconName = import("tech-stack-icons").IconName;
export type TechStackIconVariant = "light" | "dark" | "grayscale";

export type TechStackIconProps = {
  name: TechStackIconName;
  variant?: TechStackIconVariant;
  className?: string;
  style?: CSSProperties;
  label?: string;
  decorative?: boolean;
};
