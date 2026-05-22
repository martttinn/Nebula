"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

const defaultUnreadColor = "#AFA9EC";
const defaultReadColor = "#534AB7";

type WordColorOverride = {
  initialColor?: string;
  activeColor?: string;
};

type WordByWordColorChangeProps = {
  text: string;
  className?: string;
  progress?: MotionValue<number>;
  progressRange?: readonly [number, number];
  unreadColor?: string;
  readColor?: string;
  wordColorOverrides?: Partial<Record<number, WordColorOverride>>;
};

type AnimatedWordProps = {
  word: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
  isLast: boolean;
  initialColor: string;
  activeColor: string;
  initialOpacity: number;
};

function getColorAlpha(color: string) {
  const normalized = color.trim();

  if (normalized.startsWith("rgba(") || normalized.startsWith("hsla(")) {
    const parts = normalized
      .slice(normalized.indexOf("(") + 1, -1)
      .split(",")
      .map((part) => part.trim());
    const alpha = Number(parts.at(-1));

    return Number.isFinite(alpha) ? alpha : 1;
  }

  if (/^#([\da-f]{4}|[\da-f]{8})$/i.test(normalized)) {
    const alphaHex = normalized.length === 5 ? normalized.slice(4, 5) : normalized.slice(7, 9);
    const normalizedHex = alphaHex.length === 1 ? `${alphaHex}${alphaHex}` : alphaHex;

    return Number.parseInt(normalizedHex, 16) / 255;
  }

  return 1;
}

function getOpaqueColor(color: string) {
  const normalized = color.trim();

  if (normalized.startsWith("rgba(")) {
    const parts = normalized
      .slice(normalized.indexOf("(") + 1, -1)
      .split(",")
      .map((part) => part.trim());

    return `rgb(${parts.slice(0, 3).join(", ")})`;
  }

  if (normalized.startsWith("hsla(")) {
    const parts = normalized
      .slice(normalized.indexOf("(") + 1, -1)
      .split(",")
      .map((part) => part.trim());

    return `hsl(${parts.slice(0, 3).join(", ")})`;
  }

  if (/^#[\da-f]{4}$/i.test(normalized)) {
    return `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`;
  }

  if (/^#[\da-f]{8}$/i.test(normalized)) {
    return normalized.slice(0, 7);
  }

  return normalized;
}

function AnimatedWord({
  word,
  start,
  end,
  progress,
  isLast,
  initialColor,
  activeColor,
  initialOpacity,
}: AnimatedWordProps) {
  const color = useTransform(progress, [start, end], [initialColor, activeColor]);
  const opacity = useTransform(progress, [start, end], [initialOpacity, 1]);

  return (
    <span className="inline-block whitespace-pre">
      <motion.span className="inline-block" style={{ color, opacity }}>
        {word}
      </motion.span>
      {!isLast ? " " : null}
    </span>
  );
}

export function WordByWordColorChange({
  text,
  className,
  progress,
  progressRange = [0, 1],
  unreadColor = defaultUnreadColor,
  readColor = defaultReadColor,
  wordColorOverrides,
}: WordByWordColorChangeProps) {
  const targetRef = useRef<HTMLSpanElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const words = text.trim().split(/\s+/);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 80%", "end 20%"],
  });
  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.24,
  });
  const localProgress = prefersReducedMotion ? scrollYProgress : smoothedProgress;
  const activeProgress = progress ?? localProgress;
  const [rangeStart, rangeEnd] = progressRange;
  const rangeSpan = rangeEnd - rangeStart;
  const unreadOpacity = getColorAlpha(unreadColor);
  const unreadBaseColor = getOpaqueColor(unreadColor);

  return (
    <span
      ref={targetRef}
      className={cn("block text-balance", className)}
      style={
        prefersReducedMotion
          ? {
              color: unreadBaseColor,
              opacity: unreadOpacity,
            }
          : undefined
      }
    >
      {words.map((word, index) => {
        const start = rangeStart + (rangeSpan * index) / words.length;
        const end = rangeStart + (rangeSpan * (index + 1)) / words.length;
        const wordColors = wordColorOverrides?.[index];

        return (
          <AnimatedWord
            key={`${word}-${index}`}
            word={word}
            start={start}
            end={end}
            progress={activeProgress}
            isLast={index === words.length - 1}
            initialColor={wordColors?.initialColor ?? unreadBaseColor}
            activeColor={wordColors?.activeColor ?? readColor}
            initialOpacity={unreadOpacity}
          />
        );
      })}
    </span>
  );
}
