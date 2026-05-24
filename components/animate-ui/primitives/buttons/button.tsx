"use client";

import { Slot } from "@radix-ui/react-slot";
import type { ComponentPropsWithoutRef, CSSProperties, Ref } from "react";

import { cn } from "@/lib/utils";

type ButtonStyle = CSSProperties & {
  "--button-hover-scale": number;
  "--button-tap-scale": number;
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  ref?: Ref<HTMLButtonElement>;
  asChild?: boolean;
  hoverScale?: number;
  tapScale?: number;
};

function Button({
  hoverScale = 1.05,
  tapScale = 0.95,
  asChild = false,
  className,
  style,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(
        "motion-safe:transition-transform motion-safe:hover:scale-[var(--button-hover-scale)] motion-safe:active:scale-[var(--button-tap-scale)]",
        className,
      )}
      style={
        {
          "--button-hover-scale": hoverScale,
          "--button-tap-scale": tapScale,
          ...style,
        } as ButtonStyle
      }
      {...props}
    />
  );
}

export { Button, type ButtonProps };
