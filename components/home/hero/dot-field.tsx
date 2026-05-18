"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useId, useRef } from "react";

import { cn } from "@/lib/utils";

const TWO_PI = Math.PI * 2;
// Mantiene el contrato actual del preloader sin reabrir su orquestación superior.
const HERO_BACKGROUND_READY_EVENT = "hero-grid-ready";

type Dot = {
  anchorX: number;
  anchorY: number;
  velocityX: number;
  velocityY: number;
  visualX: number;
  visualY: number;
};

export type HeroDotFieldProps = ComponentPropsWithoutRef<"div"> & {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
};

export function HeroDotField({
  className,
  dotRadius = 2.4,
  dotSpacing = 12,
  cursorRadius = 500,
  cursorForce = 0.08,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 180,
  sparkle = false,
  waveAmplitude = 2,
  gradientFrom = "rgba(58,52,130,0.76)",
  gradientTo = "rgba(83,74,183,0.56)",
  glowColor = "rgba(9,9,15,0.78)",
  ...divProps
}: HeroDotFieldProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<SVGCircleElement | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const frameRef = useRef<number | null>(null);
  const gradientRef = useRef<CanvasGradient | null>(null);
  const readyDispatchedRef = useRef(false);
  const pointerRef = useRef({
    x: -9999,
    y: -9999,
    speed: 0,
  });
  const sizeRef = useRef({ width: 0, height: 0 });
  const glowOpacityRef = useRef(0);
  const engagementRef = useRef(0);
  const glowGradientId = useId().replace(/:/g, "");

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });

    const emitReady = () => {
      if (readyDispatchedRef.current) {
        return;
      }

      readyDispatchedRef.current = true;
      window.dispatchEvent(new CustomEvent(HERO_BACKGROUND_READY_EVENT));
    };

    if (!context) {
      emitReady();
      return;
    }

    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const buildDots = (width: number, height: number) => {
      const step = dotRadius + dotSpacing;
      const columns = Math.max(1, Math.floor(width / step));
      const rows = Math.max(1, Math.floor(height / step));
      const paddingX = Math.max(0, (width - columns * step) * 0.5);
      const paddingY = Math.max(0, (height - rows * step) * 0.5);
      const dots: Dot[] = [];

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const anchorX = paddingX + column * step + step * 0.5;
          const anchorY = paddingY + row * step + step * 0.5;

          dots.push({
            anchorX,
            anchorY,
            velocityX: 0,
            velocityY: 0,
            visualX: anchorX,
            visualY: anchorY,
          });
        }
      }

      dotsRef.current = dots;
    };

    const resizeCanvas = () => {
      const bounds = container.getBoundingClientRect();
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);

      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.cssText = `width: ${width}px; height: ${height}px;`;

      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      sizeRef.current = {
        width,
        height,
      };

      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, gradientFrom);
      gradient.addColorStop(1, gradientTo);
      gradientRef.current = gradient;

      buildDots(width, height);
    };

    const drawFrame = (time: number) => {
      const { width, height } = sizeRef.current;
      const dots = dotsRef.current;
      const pointer = pointerRef.current;
      const glow = glowRef.current;
      const actualDotRadius = dotRadius * 0.5;
      const cursorRadiusSquared = cursorRadius * cursorRadius;

      context.clearRect(0, 0, width, height);
      context.beginPath();
      context.fillStyle = gradientRef.current ?? gradientFrom;

      const targetEngagement = prefersReducedMotion
        ? 0
        : Math.min(pointer.speed, 1);
      engagementRef.current +=
        (targetEngagement - engagementRef.current) * 0.08;
      pointer.speed *= 0.92;

      if (pointer.speed < 0.001) {
        pointer.speed = 0;
      }

      glowOpacityRef.current +=
        (engagementRef.current - glowOpacityRef.current) * 0.1;

      if (glow) {
        glow.setAttribute("cx", String(pointer.x));
        glow.setAttribute("cy", String(pointer.y));
        glow.style.opacity = String(glowOpacityRef.current);
      }

      for (let index = 0; index < dots.length; index += 1) {
        const dot = dots[index];

        let nextX = dot.anchorX;
        let nextY = dot.anchorY;

        if (!prefersReducedMotion && engagementRef.current > 0.001) {
          const deltaX = pointer.x - dot.anchorX;
          const deltaY = pointer.y - dot.anchorY;
          const distanceSquared = deltaX * deltaX + deltaY * deltaY;

          if (distanceSquared < cursorRadiusSquared) {
            const distance = Math.max(1, Math.sqrt(distanceSquared));
            const angle = Math.atan2(deltaY, deltaX);

            if (bulgeOnly) {
              const proximity = 1 - distance / cursorRadius;
              const push = proximity * proximity * bulgeStrength * engagementRef.current;

              nextX =
                dot.anchorX - Math.cos(angle) * push;
              nextY =
                dot.anchorY - Math.sin(angle) * push;
            } else {
              const force =
                ((cursorRadius - distance) / cursorRadius) *
                engagementRef.current *
                cursorForce *
                12;

              dot.velocityX -= Math.cos(angle) * force;
              dot.velocityY -= Math.sin(angle) * force;
            }
          }
        }

        if (!bulgeOnly) {
          dot.velocityX *= 0.9;
          dot.velocityY *= 0.9;
          nextX += dot.velocityX;
          nextY += dot.velocityY;
        }

        dot.visualX += (nextX - dot.visualX) * 0.12;
        dot.visualY += (nextY - dot.visualY) * 0.12;

        let renderX = dot.visualX;
        let renderY = dot.visualY;

        if (!prefersReducedMotion && waveAmplitude > 0) {
          const wavePhase = time * 0.0012;
          renderX +=
            Math.cos(dot.anchorY * 0.026 + wavePhase * 0.72) *
            waveAmplitude *
            0.45;
          renderY +=
            Math.sin(dot.anchorX * 0.03 + wavePhase) * waveAmplitude;
        }

        const radius =
          sparkle && !prefersReducedMotion && index % 17 === 0
            ? actualDotRadius * 1.55
            : actualDotRadius;

        context.moveTo(renderX + radius, renderY);
        context.arc(renderX, renderY, radius, 0, TWO_PI);
      }

      context.fill();
    };

    const loop = (time: number) => {
      drawFrame(time);
      frameRef.current = window.requestAnimationFrame(loop);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      const pointer = pointerRef.current;
      const bounds = container.getBoundingClientRect();
      const nextX = event.clientX - bounds.left;
      const nextY = event.clientY - bounds.top;
      const deltaX = nextX - pointer.x;
      const deltaY = nextY - pointer.y;
      const distance =
        pointer.x <= -9000 || pointer.y <= -9000
          ? 0
          : Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      pointer.x = nextX;
      pointer.y = nextY;
      pointer.speed = Math.min(1, pointer.speed + distance / 34);
    };

    const handlePointerLeave = () => {
      pointerRef.current.x = -9999;
      pointerRef.current.y = -9999;
      pointerRef.current.speed = 0;
    };

    resizeCanvas();
    drawFrame(0);
    emitReady();

    const handleResize = () => {
      resizeCanvas();
      drawFrame(performance.now());
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    if (!prefersReducedMotion) {
      frameRef.current = window.requestAnimationFrame(loop);
    }

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [
    bulgeOnly,
    bulgeStrength,
    cursorForce,
    cursorRadius,
    dotRadius,
    dotSpacing,
    glowColor,
    gradientFrom,
    gradientTo,
    sparkle,
    waveAmplitude,
  ]);

  return (
    <div
      aria-hidden="true"
      ref={containerRef}
      className={cn("absolute inset-0", className)}
      {...divProps}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id={glowGradientId}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowGradientId})`}
          style={{ opacity: 0, willChange: "opacity" }}
        />
      </svg>
    </div>
  );
}
