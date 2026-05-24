"use client";

import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  /**
   * The size of the border beam.
   */
  size?: number;
  /**
   * The duration of the border beam.
   */
  duration?: number;
  /**
   * The delay of the border beam.
   */
  delay?: number;
  /**
   * The color of the border beam from.
   */
  colorFrom?: string;
  /**
   * The color of the border beam to.
   */
  colorTo?: string;
  /**
   * The motion transition of the border beam.
   */
  transition?: {
    duration?: number;
    delay?: number;
  };
  /**
   * The class name of the border beam.
   */
  className?: string;
  /**
   * The style of the border beam.
   */
  style?: CSSProperties;
  /**
   * Whether to reverse the animation direction.
   */
  reverse?: boolean;
  /**
   * The initial offset position (0-100).
   */
  initialOffset?: number;
  /**
   * The border width of the beam.
   */
  borderWidth?: number;
}

export const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1,
}: BorderBeamProps) => {
  const resolvedDuration = transition?.duration ?? duration;
  const resolvedDelay = transition?.delay ?? -delay;

  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]"
      style={
        {
          "--border-beam-width": `${borderWidth}px`,
        } as CSSProperties
      }
    >
      <div
        className={cn(
          "absolute aspect-square",
          "bg-linear-to-l from-(--color-from) via-(--color-to) to-transparent",
          className,
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            offsetDistance: `${initialOffset}%`,
            animationName: reverse
              ? "border-beam-reverse"
              : "border-beam-forward",
            animationDuration: `${resolvedDuration}s`,
            animationDelay: `${resolvedDelay}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            "--color-from": colorFrom,
            "--color-to": colorTo,
            "--border-beam-start": reverse
              ? `${100 - initialOffset}%`
              : `${initialOffset}%`,
            "--border-beam-end": reverse
              ? `${-initialOffset}%`
              : `${100 + initialOffset}%`,
            ...style,
          } as CSSProperties
        }
      />
    </div>
  );
};
