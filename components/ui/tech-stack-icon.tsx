import "server-only";

import StackIcon from "tech-stack-icons";

import { cn } from "@/lib/utils";

import type { TechStackIconProps } from "./tech-stack-icon.types";

export type {
  TechStackIconName,
  TechStackIconProps,
  TechStackIconVariant,
} from "./tech-stack-icon.types";

export function TechStackIcon({
  name,
  variant = "light",
  className,
  style,
  label,
  decorative,
}: TechStackIconProps) {
  const isDecorative = decorative ?? label == null;

  return (
    <span
      className={cn("inline-flex shrink-0 align-middle", className)}
      style={style}
      aria-hidden={isDecorative ? true : undefined}
      role={isDecorative ? undefined : "img"}
      aria-label={isDecorative ? undefined : label}
    >
      <StackIcon name={name} variant={variant} className="block h-full w-full" />
    </span>
  );
}
