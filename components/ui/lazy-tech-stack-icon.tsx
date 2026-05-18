"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import type { TechStackIconProps } from "./tech-stack-icon.types";

const DynamicStackIcon = dynamic(
  () => import("tech-stack-icons").then((module) => module.default),
  {
    ssr: false,
    loading: () => null,
  },
);

export type {
  TechStackIconName,
  TechStackIconVariant,
} from "./tech-stack-icon.types";

type LazyTechStackIconProps = TechStackIconProps & {
  preloadMargin?: string;
};

export function LazyTechStackIcon({
  name,
  variant = "light",
  className,
  style,
  label,
  decorative,
  preloadMargin = "200px",
}: LazyTechStackIconProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const isDecorative = decorative ?? label == null;

  useEffect(() => {
    if (shouldRender) {
      return;
    }

    const node = rootRef.current;
    if (!node) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      const frameId = requestAnimationFrame(() => {
        setShouldRender(true);
      });

      return () => {
        cancelAnimationFrame(frameId);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: preloadMargin },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [preloadMargin, shouldRender]);

  return (
    <span
      ref={rootRef}
      className={cn("inline-flex shrink-0 align-middle", className)}
      style={style}
      aria-hidden={isDecorative ? true : undefined}
      role={isDecorative ? undefined : "img"}
      aria-label={isDecorative ? undefined : label}
    >
      {shouldRender ? (
        <DynamicStackIcon
          name={name}
          variant={variant}
          className="block h-full w-full"
        />
      ) : null}
    </span>
  );
}
