import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export type BrandLogoLayout = "square" | "rectangular";
export type BrandLogoSize = "sm" | "md" | "lg";

type BrandLogoSizeConfig = {
  className: string;
  width: number;
  height: number;
};

const BRAND_LOGO_SIZE_CONFIG = {
  square: {
    sm: {
      className: "h-8 w-8",
      width: 32,
      height: 32,
    },
    md: {
      className: "h-10 w-10",
      width: 40,
      height: 40,
    },
    lg: {
      className: "h-12 w-12",
      width: 48,
      height: 48,
    },
  },
  rectangular: {
    sm: {
      className: "h-8 w-24",
      width: 96,
      height: 32,
    },
    md: {
      className: "h-10 w-32",
      width: 128,
      height: 40,
    },
    lg: {
      className: "h-12 w-40",
      width: 160,
      height: 48,
    },
  },
} satisfies Record<BrandLogoLayout, Record<BrandLogoSize, BrandLogoSizeConfig>>;

export type BrandLogoProps = Omit<
  ComponentPropsWithoutRef<"span">,
  "children"
> & {
  /**
   * Nombre del SVG dentro de `/public/brand-logos`, sin la extensión `.svg`.
   */
  name: string;
  /**
   * Nombre humano de la marca para accesibilidad cuando el logo no sea decorativo.
   */
  label: string;
  layout?: BrandLogoLayout;
  size?: BrandLogoSize;
  imageClassName?: string;
  priority?: boolean;
  decorative?: boolean;
};

function getBrandLogoSrc(name: string) {
  return `/brand-logos/${name.replace(/\.svg$/i, "")}.svg`;
}

export function BrandLogo({
  name,
  label,
  layout = "rectangular",
  size = "md",
  className,
  imageClassName,
  priority = false,
  decorative = false,
  ...props
}: BrandLogoProps) {
  const sizeConfig = BRAND_LOGO_SIZE_CONFIG[layout][size];

  return (
    <span
      {...props}
      className={cn(
        "inline-flex shrink-0 items-center justify-center align-middle",
        sizeConfig.className,
        className,
      )}
      aria-hidden={decorative ? true : props["aria-hidden"]}
    >
      <Image
        src={getBrandLogoSrc(name)}
        alt={decorative ? "" : label}
        width={sizeConfig.width}
        height={sizeConfig.height}
        priority={priority}
        className={cn("block h-full w-full object-contain", imageClassName)}
      />
    </span>
  );
}
