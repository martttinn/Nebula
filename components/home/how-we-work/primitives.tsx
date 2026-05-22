"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from "motion/react";

import { SectionTitle } from "@/components/ui/section-title";

import {
  CLUSTER_REVEAL_END_OFFSET,
  CLUSTER_REVEAL_START_OFFSET,
  DESKTOP_CARD_ACCENT_BACKGROUND,
  DESKTOP_CLUSTER_PLACEMENTS,
  DESKTOP_STEP_STOPS,
  IMAGE_NODE_BASE_OPACITY,
  IMAGE_NODE_DESKTOP_SIZE,
  IMAGE_NODE_MOBILE_SIZE,
  MOBILE_CARD_ACCENT_BACKGROUND,
  MOBILE_CARD_DESCRIPTION_LINE_CLAMP,
  MOBILE_TIMELINE_LINE_BRIDGE,
  MOBILE_TIMELINE_LINE_LEFT,
  MOBILE_TIMELINE_NODE_CENTER_Y,
  NODE_REVEAL_ACTIVE_SCALE,
  NODE_REVEAL_BASE_SCALE,
  NODE_SURFACE_BACKGROUND,
  PROCESS_CARD_SURFACE_BACKGROUND,
  PROCESS_HAZE_RGB,
  PROCESS_LILAC_RGB,
  PROCESS_SILVER_RGB,
} from "./constants";
import type { Step } from "./types";
import { debugOutline } from "./utils";

export function SectionHeading({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      className="mx-auto mb-20 max-w-3xl text-center md:mb-24"
      initial={reducedMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <SectionTitle
        id="proceso-title"
        className="mx-auto max-w-[16ch] font-display text-4xl font-bold leading-[0.98] tracking-[-0.05em] text-nebula-silver sm:text-5xl lg:text-[4rem]"
        leadingText="Un"
        accentText="proceso"
        trailingText="que puedes entender"
      />
    </motion.div>
  );
}

function DesktopNode({
  step,
  index,
  progress,
  reducedMotion,
  setNodeRef,
}: {
  step: Step;
  index: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
  setNodeRef: (node: HTMLDivElement | null) => void;
}) {
  const nodeStop = DESKTOP_STEP_STOPS[index];
  const usesImageNode = Boolean(step.imageSrc);
  const revealStart = Math.max(nodeStop - CLUSTER_REVEAL_START_OFFSET, 0);
  const revealEnd = Math.max(nodeStop - CLUSTER_REVEAL_END_OFFSET, revealStart + 0.02);
  const scaleMotion = useTransform(
    progress,
    [revealStart, revealEnd],
    [NODE_REVEAL_BASE_SCALE, NODE_REVEAL_ACTIVE_SCALE],
  );
  const opacityMotion = useTransform(
    progress,
    [revealStart, revealEnd],
    [IMAGE_NODE_BASE_OPACITY, 1],
  );
  const scale = reducedMotion ? 1 : scaleMotion;
  const opacity = reducedMotion || !usesImageNode ? 1 : opacityMotion;

  return (
    <motion.div
      ref={setNodeRef}
      className={
        usesImageNode
          ? "relative z-20 shrink-0"
          : "relative z-20 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/12 bg-[#171125] shadow-[0_18px_50px_rgba(0,0,0,0.36)]"
      }
      style={
        usesImageNode
          ? {
              scale,
              opacity,
              width: IMAGE_NODE_DESKTOP_SIZE,
              height: IMAGE_NODE_DESKTOP_SIZE,
              ...debugOutline("rgba(250, 204, 21, 0.8)"),
            }
          : {
              scale,
              opacity,
              background: NODE_SURFACE_BACKGROUND,
              ...debugOutline("rgba(250, 204, 21, 0.8)"),
            }
      }
    >
      {step.imageSrc ? (
        <Image
          src={step.imageSrc}
          alt={step.imageAlt ?? ""}
          fill
          sizes={`${IMAGE_NODE_DESKTOP_SIZE}px`}
          className="object-contain"
        />
      ) : step.icon ? (
        <step.icon className="relative z-10 size-6 text-nebula-silver" strokeWidth={1.8} />
      ) : null}
    </motion.div>
  );
}

function DesktopCard({
  step,
  index,
  progress,
  reducedMotion,
}: {
  step: Step;
  index: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const isLeft = step.side === "left";
  const nodeStop = DESKTOP_STEP_STOPS[index];
  const revealStart = Math.max(nodeStop - CLUSTER_REVEAL_START_OFFSET, 0);
  const revealEnd = Math.max(nodeStop - CLUSTER_REVEAL_END_OFFSET, revealStart + 0.02);
  const opacityMotion = useTransform(progress, [revealStart, revealEnd], [0, 1]);
  const xMotion = useTransform(
    progress,
    [revealStart, revealEnd],
    [isLeft ? -42 : 42, 0],
  );
  const yMotion = useTransform(progress, [revealStart, revealEnd], [18, 0]);
  const scaleMotion = useTransform(progress, [revealStart, revealEnd], [0.965, 1]);
  const blurMotion = useTransform(progress, [revealStart, revealEnd], [10, 0]);
  const filterMotion = useMotionTemplate`blur(${blurMotion}px)`;
  const opacity = reducedMotion ? 1 : opacityMotion;
  const x = reducedMotion ? 0 : xMotion;
  const y = reducedMotion ? 0 : yMotion;
  const scale = reducedMotion ? 1 : scaleMotion;
  const filter = reducedMotion ? "blur(0px)" : filterMotion;

  return (
    <motion.article
      className="relative z-10 w-full max-w-[39rem] overflow-hidden rounded-[2rem] border border-white/[0.06] bg-transparent px-8 py-7 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-xs"
      style={{
        opacity,
        x,
        y,
        scale,
        filter,
        backgroundImage: PROCESS_CARD_SURFACE_BACKGROUND,
        ...debugOutline("rgba(34, 197, 94, 0.82)"),
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: DESKTOP_CARD_ACCENT_BACKGROUND }}
      />
      <div className="relative z-10">
        <h3 className="mb-4 max-w-[16ch] font-display text-[1.9rem] font-bold leading-[1.02] tracking-[-0.045em] text-white">
          {step.title}
        </h3>
        <p className="max-w-[38ch] overflow-hidden text-[1.02rem] leading-[1.62] text-white [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
          {step.description}
        </p>
      </div>
    </motion.article>
  );
}

export function DesktopRow({
  step,
  index,
  progress,
  reducedMotion,
  setNodeRef,
}: {
  step: Step;
  index: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
  setNodeRef: (node: HTMLDivElement | null) => void;
}) {
  const isLeft = step.side === "left";
  const clusterPlacement = DESKTOP_CLUSTER_PLACEMENTS[index] ?? {
    nodeXPercent: isLeft ? 10 : 90,
    xOffset: 0,
  };
  const clusterAnchorTransform = isLeft
    ? `translate(calc(-2rem + ${clusterPlacement.xOffset}px), -50%)`
    : `translate(calc(-100% + 2rem + ${clusterPlacement.xOffset}px), -50%)`;

  return (
    <li
      className="relative min-h-[15rem] px-4 lg:px-8 xl:px-12"
      style={debugOutline("rgba(251, 146, 60, 0.82)", -2)}
    >
      {isLeft ? (
        <div
          className="absolute top-1/2 w-full max-w-[46rem]"
          style={{
            left: `${clusterPlacement.nodeXPercent}%`,
            transform: clusterAnchorTransform,
            ...debugOutline("rgba(250, 204, 21, 0.8)"),
          }}
        >
          <div className="flex w-full max-w-[46rem] items-center gap-6">
            <DesktopNode
              step={step}
              index={index}
              progress={progress}
              reducedMotion={reducedMotion}
              setNodeRef={setNodeRef}
            />
            <div className="w-full max-w-[39rem]">
              <DesktopCard
                step={step}
                index={index}
                progress={progress}
                reducedMotion={reducedMotion}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="absolute top-1/2 w-full max-w-[46rem]"
          style={{
            left: `${clusterPlacement.nodeXPercent}%`,
            transform: clusterAnchorTransform,
            ...debugOutline("rgba(250, 204, 21, 0.8)"),
          }}
        >
          <div className="flex w-full max-w-[46rem] items-center justify-end gap-6">
            <div className="w-full max-w-[39rem]">
              <DesktopCard
                step={step}
                index={index}
                progress={progress}
                reducedMotion={reducedMotion}
              />
            </div>
            <DesktopNode
              step={step}
              index={index}
              progress={progress}
              reducedMotion={reducedMotion}
              setNodeRef={setNodeRef}
            />
          </div>
        </div>
      )}
    </li>
  );
}

export function MobileCard({
  step,
  index,
  isFirst,
  isLast,
  reducedMotion,
}: {
  step: Step;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  reducedMotion: boolean;
}) {
  const nodeInitialOpacity = step.imageSrc ? IMAGE_NODE_BASE_OPACITY : 1;
  const timelineTop = isFirst
    ? MOBILE_TIMELINE_NODE_CENTER_Y
    : -MOBILE_TIMELINE_LINE_BRIDGE;
  const timelineBottom = isLast
    ? `calc(100% - ${MOBILE_TIMELINE_NODE_CENTER_Y}px)`
    : -MOBILE_TIMELINE_LINE_BRIDGE;

  return (
    <motion.li
      className="relative flex gap-5"
      initial={reducedMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className="pointer-events-none absolute z-0 w-px"
        style={{
          left: MOBILE_TIMELINE_LINE_LEFT,
          top: timelineTop,
          bottom: timelineBottom,
          background:
            "linear-gradient(to bottom, rgba(181,177,227,0.18), rgba(83,74,183,0.52), rgba(181,177,227,0.18))",
        }}
        aria-hidden="true"
      />

      <motion.div
        className={
          step.imageSrc
            ? "relative z-10 mt-1 shrink-0"
            : "relative z-10 mt-1 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#171125] shadow-[0_14px_40px_rgba(0,0,0,0.34)]"
        }
        style={
          step.imageSrc
            ? {
                width: IMAGE_NODE_MOBILE_SIZE,
                height: IMAGE_NODE_MOBILE_SIZE,
              }
            : { background: NODE_SURFACE_BACKGROUND }
        }
        initial={
          reducedMotion
            ? undefined
            : {
                scale: NODE_REVEAL_BASE_SCALE,
                opacity: nodeInitialOpacity,
              }
        }
        whileInView={
          reducedMotion
            ? undefined
            : {
                scale: NODE_REVEAL_ACTIVE_SCALE,
                opacity: 1,
              }
        }
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: 0.55,
          delay: index * 0.06 + 0.04,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {step.imageSrc ? (
          <Image
            src={step.imageSrc}
            alt={step.imageAlt ?? ""}
            fill
            sizes={`${IMAGE_NODE_MOBILE_SIZE}px`}
            className="object-contain"
          />
        ) : step.icon ? (
          <step.icon className="relative z-10 size-5 text-nebula-silver" strokeWidth={1.8} />
        ) : null}
      </motion.div>

      <article
        className="relative flex-1 overflow-hidden rounded-[1.6rem] border border-white/[0.06] bg-transparent px-6 py-5 shadow-[0_24px_60px_rgba(0,0,0,0.34)]"
        style={{ backgroundImage: PROCESS_CARD_SURFACE_BACKGROUND }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: MOBILE_CARD_ACCENT_BACKGROUND }}
        />
        <div className="relative z-10">
          <h3 className="mb-3 font-display text-[1.45rem] font-bold leading-[1.02] tracking-[-0.04em] text-white">
            {step.title}
          </h3>
          <p
            className="overflow-hidden text-[0.95rem] leading-[1.62] text-white [display:-webkit-box] [-webkit-box-orient:vertical]"
            style={{ WebkitLineClamp: MOBILE_CARD_DESCRIPTION_LINE_CLAMP }}
          >
            {step.description}
          </p>
        </div>
      </article>
    </motion.li>
  );
}

export function DesktopConnector({
  path,
  pathLength,
  dashOffset,
  width,
  height,
}: {
  path: string;
  pathLength: number;
  dashOffset: MotionValue<number> | number;
  width: number;
  height: number;
}) {
  const gradientLoopWidth = Math.max(width * 0.38, 360);

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${width} ${height}`}
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      style={debugOutline("rgba(168, 85, 247, 0.78)", 0)}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id="how-we-work-line"
          x1="0"
          y1="0"
          x2={gradientLoopWidth}
          y2="0"
          gradientUnits="userSpaceOnUse"
          spreadMethod="repeat"
        >
          <stop offset="0%" stopColor={`rgb(${PROCESS_LILAC_RGB})`} />
          <stop offset="26%" stopColor={`rgb(${PROCESS_HAZE_RGB})`} />
          <stop offset="52%" stopColor={`rgb(${PROCESS_SILVER_RGB})`} />
          <stop offset="78%" stopColor={`rgb(${PROCESS_HAZE_RGB})`} />
          <stop offset="100%" stopColor={`rgb(${PROCESS_LILAC_RGB})`} />
        </linearGradient>
        <filter id="how-we-work-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d={path}
        fill="none"
        stroke={`rgba(${PROCESS_HAZE_RGB},0.18)`}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2 14"
      />

      <motion.path
        d={path}
        fill="none"
        stroke="url(#how-we-work-line)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#how-we-work-glow)"
        strokeDasharray={pathLength}
        style={{ strokeDashoffset: dashOffset }}
      />
    </svg>
  );
}
