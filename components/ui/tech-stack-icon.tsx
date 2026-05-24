import "server-only";

import { LocalTechStackIcon } from "@/components/ui/local-tech-stack-icons";
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
  return (
    <LocalTechStackIcon
      name={name}
      variant={variant}
      className={className}
      style={style}
      label={label}
      decorative={decorative}
    />
  );
}
