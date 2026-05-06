"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { HeroParticles } from "@/components/home/hero-particles";
import { SectionTitle } from "@/components/ui/section-title";

const DEBUG_BORDERS = false;
const PATH_START_Y_OFFSET = -1;
const PATH_END_Y_OFFSET = 116;
const EDGE_HANDLE_RATIO = 0.32;
const INTER_NODE_HANDLE_RATIO = 1.0;
const EDGE_HANDLE_MAX = 136;
const INTER_NODE_HANDLE_MAX = 320;
const EDGE_VERTICAL_HANDLE_RATIO = 0.16;
const OUTER_NODE_VERTICAL_HANDLE_RATIO = 0.32;
const INTER_NODE_VERTICAL_HANDLE_RATIO = 1.00;
const IMAGE_NODE_DESKTOP_SIZE = 108;
const IMAGE_NODE_MOBILE_SIZE = 88;
const MOBILE_TIMELINE_LINE_LEFT = IMAGE_NODE_MOBILE_SIZE / 2;
const MOBILE_CARD_DESCRIPTION_LINE_CLAMP = 4;
const CLUSTER_REVEAL_START_OFFSET = 0.13;
const CLUSTER_REVEAL_END_OFFSET = 0.035;
const NODE_REVEAL_BASE_SCALE = 0.82;
const NODE_REVEAL_ACTIVE_SCALE = 1.07;
const IMAGE_NODE_BASE_OPACITY = 0.28;
const DESKTOP_CLUSTER_PLACEMENTS: readonly DesktopClusterPlacement[] = [
  { nodeXPercent: 6, xOffset: 0 },
  { nodeXPercent: 88, xOffset: -8 },
  { nodeXPercent: 18, xOffset: 10 },
  { nodeXPercent: 94, xOffset: -6 },
] as const;
const DESKTOP_STEP_STOPS = [0.16, 0.38, 0.62, 0.84] as const;
const PROCESS_LILAC_RGB = "125,116,224";
const PROCESS_HAZE_RGB = "181,177,227";
const PROCESS_SILVER_RGB = "232,232,240";
const PROCESS_NAVY_TOP = "#0B0C17";
const PROCESS_NAVY_MID = "#0D0F24";
const PROCESS_NAVY_BOTTOM = "#0A0F2E";
const PROCESS_CARD_SURFACE_BACKGROUND =
  `linear-gradient(180deg, ${PROCESS_NAVY_TOP} 0%, ${PROCESS_NAVY_MID} 48%, ${PROCESS_NAVY_BOTTOM} 100%)`;
const NODE_SURFACE_BACKGROUND =
  `radial-gradient(circle at 50% 28%, rgb(${PROCESS_HAZE_RGB}) 0%, rgb(${PROCESS_LILAC_RGB}) 34%, ${PROCESS_NAVY_BOTTOM} 100%)`;
const DESKTOP_CARD_ACCENT_BACKGROUND =
  `radial-gradient(circle at 12% 20%, rgba(${PROCESS_LILAC_RGB},0.16), transparent 34%)`;
const MOBILE_CARD_ACCENT_BACKGROUND =
  `radial-gradient(circle at 15% 18%, rgba(${PROCESS_LILAC_RGB},0.14), transparent 36%)`;
const SECTION_ACCENT_BACKGROUND = "none";

type Step = {
  number: string;
  title: string;
  description: string;
  side: "left" | "right";
  icon?: LucideIcon;
  imageSrc?: string;
  imageAlt?: string;
};

type Point = {
  x: number;
  y: number;
};

type PathLayout = {
  width: number;
  height: number;
  path: string;
  length: number;
};

type DesktopClusterPlacement = {
  nodeXPercent: number;
  xOffset: number;
};

const STEPS: readonly Step[] = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Entendemos tu negocio, flujos y procesos antes de proponer nada. Sin soluciones genéricas: primero escuchamos.",
    side: "left",
    imageSrc: "/planets/planet-1.png",
    imageAlt: "Planeta violeta decorativo",
  },
  {
    number: "02",
    title: "Arquitectura",
    description:
      "Diseñamos la solución técnica adaptada a tu realidad. Cada decisión tiene un porqué claro y documentado.",
    side: "right",
    imageSrc: "/planets/planet-4.png",
    imageAlt: "Planeta violeta decorativo",
  },
  {
    number: "03",
    title: "Desarrollo",
    description:
      "Construimos de forma iterativa. Ves avances reales en cada fase, no promesas vacías al final del proyecto.",
    side: "left",
    imageSrc: "/planets/planet-3.png",
    imageAlt: "Planeta violeta decorativo",
  },
  {
    number: "04",
    title: "Evolución",
    description:
      "Lanzamos, medimos y mejoramos contigo de forma continua. El lanzamiento es el comienzo, no el fin.",
    side: "right",
    imageSrc: "/planets/planet-6.png",
    imageAlt: "Planeta violeta decorativo",
  },
] as const;

function debugOutline(color: string, offset = -1): CSSProperties {
  if (!DEBUG_BORDERS) {
    return {};
  }

  return {
    outline: `1px dashed ${color}`,
    outlineOffset: `${offset}px`,
  };
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function buildSmoothPath(points: Point[]) {
  if (points.length < 2) {
    return "";
  }

  let path = `M ${round(points[0].x)} ${round(points[0].y)}`;
  const isInteriorNodePoint = (pointIndex: number) =>
    pointIndex > 1 && pointIndex < points.length - 2;
  const isOuterNodePoint = (pointIndex: number) =>
    pointIndex === 1 || pointIndex === points.length - 2;

  for (let index = 0; index < points.length - 1; index += 1) {
    const previousPoint = points[index - 1] ?? points[index];
    const currentPoint = points[index];
    const nextPoint = points[index + 1];
    const followingPoint = points[index + 2] ?? nextPoint;
    const currentPointIsInteriorNode = isInteriorNodePoint(index);
    const currentPointIsOuterNode = isOuterNodePoint(index);
    const nextPointIsInteriorNode = isInteriorNodePoint(index + 1);
    const nextPointIsOuterNode = isOuterNodePoint(index + 1);
    const deltaX = nextPoint.x - currentPoint.x;
    const isEdgeSegment = index === 0 || index === points.length - 2;
    const horizontalDistance = Math.abs(deltaX);
    const directionX = Math.sign(deltaX) || 1;
    const horizontalHandle = clamp(
      horizontalDistance * (isEdgeSegment ? EDGE_HANDLE_RATIO : INTER_NODE_HANDLE_RATIO),
      0,
      isEdgeSegment ? EDGE_HANDLE_MAX : INTER_NODE_HANDLE_MAX,
    );
    const currentVerticalHandleRatio = isEdgeSegment
      ? EDGE_VERTICAL_HANDLE_RATIO
      : currentPointIsOuterNode
        ? OUTER_NODE_VERTICAL_HANDLE_RATIO
        : INTER_NODE_VERTICAL_HANDLE_RATIO;
    const nextVerticalHandleRatio = isEdgeSegment
      ? EDGE_VERTICAL_HANDLE_RATIO
      : nextPointIsOuterNode
        ? OUTER_NODE_VERTICAL_HANDLE_RATIO
        : INTER_NODE_VERTICAL_HANDLE_RATIO;
    const segmentVerticalDelta = nextPoint.y - currentPoint.y;
    // En los extremos evitamos heredar la inercia vertical del tramo vecino
    // para que la entrada y la salida hacia el borde se lean más rectas.
    const entryVerticalDelta = isEdgeSegment
      ? segmentVerticalDelta
      : nextPoint.y - previousPoint.y;
    const exitVerticalDelta = isEdgeSegment
      ? segmentVerticalDelta
      : followingPoint.y - currentPoint.y;

    const control1 = {
      x: currentPointIsInteriorNode
        ? currentPoint.x
        : currentPoint.x + directionX * horizontalHandle,
      y: currentPoint.y + entryVerticalDelta * currentVerticalHandleRatio,
    };
    const control2 = {
      x: nextPointIsInteriorNode
        ? nextPoint.x
        : nextPoint.x - directionX * horizontalHandle,
      y: nextPoint.y - exitVerticalDelta * nextVerticalHandleRatio,
    };

    path += ` C ${round(control1.x)} ${round(control1.y)}, ${round(control2.x)} ${round(control2.y)}, ${round(nextPoint.x)} ${round(nextPoint.y)}`;
  }

  return path;
}

function measurePathLength(path: string) {
  const namespace = "http://www.w3.org/2000/svg";
  const pathElement = document.createElementNS(namespace, "path");
  pathElement.setAttribute("d", path);

  return pathElement.getTotalLength();
}

function SectionHeading({ reducedMotion }: { reducedMotion: boolean }) {
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
        <step.icon className="relative z-10 h-6 w-6 text-nebula-silver" strokeWidth={1.8} />
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
  const scaleMotion = useTransform(
    progress,
    [revealStart, revealEnd],
    [0.965, 1],
  );
  const blurMotion = useTransform(progress, [revealStart, revealEnd], [10, 0]);
  const filterMotion = useMotionTemplate`blur(${blurMotion}px)`;
  const opacity = reducedMotion ? 1 : opacityMotion;
  const x = reducedMotion ? 0 : xMotion;
  const y = reducedMotion ? 0 : yMotion;
  const scale = reducedMotion ? 1 : scaleMotion;
  const filter = reducedMotion ? "blur(0px)" : filterMotion;

  return (
    <motion.article
      className="relative z-10 w-full max-w-[39rem] overflow-hidden rounded-[2rem] border border-white/[0.06] bg-transparent px-8 py-7 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-sm"
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
        style={{
          background: DESKTOP_CARD_ACCENT_BACKGROUND,
        }}
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

function DesktopRow({
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
          <div
            className="flex w-full max-w-[46rem] items-center gap-6"
          >
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
          <div
            className="flex w-full max-w-[46rem] items-center justify-end gap-6"
          >
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

function MobileCard({
  step,
  index,
  reducedMotion,
}: {
  step: Step;
  index: number;
  reducedMotion: boolean;
}) {
  const nodeInitialOpacity = step.imageSrc ? IMAGE_NODE_BASE_OPACITY : 1;

  return (
    <motion.li
      className="relative flex gap-5"
      initial={reducedMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
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
          <step.icon className="relative z-10 h-5 w-5 text-nebula-silver" strokeWidth={1.8} />
        ) : null}
      </motion.div>

      <article
        className="relative flex-1 overflow-hidden rounded-[1.6rem] border border-white/[0.06] bg-transparent px-6 py-5 shadow-[0_24px_60px_rgba(0,0,0,0.34)]"
        style={{ backgroundImage: PROCESS_CARD_SURFACE_BACKGROUND }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: MOBILE_CARD_ACCENT_BACKGROUND,
          }}
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

function DesktopConnector({
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

export function HowWeWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopStageRef = useRef<HTMLDivElement | null>(null);
  const desktopNodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = prefersReducedMotion ?? false;
  const [pathLayout, setPathLayout] = useState<PathLayout>({
    width: 0,
    height: 0,
    path: "",
    length: 0,
  });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.18"],
  });
  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.28,
  });
  const activeProgress = reducedMotion ? scrollYProgress : smoothedProgress;

  useEffect(() => {
    let frameId = 0;

    const updatePathLayout = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        if (!desktopStageRef.current) {
          return;
        }

        const stageRect = desktopStageRef.current.getBoundingClientRect();
        const nodePoints = desktopNodeRefs.current
          .map((nodeRef) => {
            if (!nodeRef) {
              return null;
            }

            const nodeRect = nodeRef.getBoundingClientRect();

            return {
              x: nodeRect.left - stageRect.left + nodeRect.width / 2,
              y: nodeRect.top - stageRect.top + nodeRect.height / 2,
            } satisfies Point;
          })
          .filter((point): point is Point => point !== null);

        if (nodePoints.length !== STEPS.length || stageRect.width <= 0) {
          return;
        }

        const pathPoints = [
          {
            x: 0,
            y: nodePoints[0].y + PATH_START_Y_OFFSET,
          },
          ...nodePoints,
          {
            x: stageRect.width,
            y: nodePoints[nodePoints.length - 1].y + PATH_END_Y_OFFSET,
          },
        ];
        const path = buildSmoothPath(pathPoints);
        const length = path ? measurePathLength(path) : 0;
        const width = stageRect.width;
        const height = stageRect.height;

        setPathLayout((currentLayout) => {
          if (
            currentLayout.width === width &&
            currentLayout.height === height &&
            currentLayout.path === path &&
            currentLayout.length === length
          ) {
            return currentLayout;
          }

          return {
            width,
            height,
            path,
            length,
          };
        });
      });
    };

    const resizeObserver = new ResizeObserver(updatePathLayout);

    if (desktopStageRef.current) {
      resizeObserver.observe(desktopStageRef.current);
    }

    desktopNodeRefs.current.forEach((nodeRef) => {
      if (nodeRef) {
        resizeObserver.observe(nodeRef);
      }
    });

    window.addEventListener("resize", updatePathLayout, { passive: true });
    updatePathLayout();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePathLayout);
    };
  }, []);

  const dashOffset = useTransform(
    activeProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [pathLayout.length, 0],
  );

  return (
    <section
      ref={sectionRef}
      id="proceso"
      aria-labelledby="proceso-title"
      className="relative w-full overflow-hidden bg-nebula-void py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: SECTION_ACCENT_BACKGROUND,
        }}
        aria-hidden="true"
      />
      <HeroParticles />

      <div className="relative z-10 w-full">
        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-10">
          <SectionHeading reducedMotion={reducedMotion} />
        </div>

        <div className="hidden md:block">
          <div
            ref={desktopStageRef}
            className="relative isolate -mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10"
            style={debugOutline("rgba(59, 130, 246, 0.8)", -2)}
          >
            {pathLayout.path ? (
              <DesktopConnector
                path={pathLayout.path}
                pathLength={pathLayout.length}
                dashOffset={dashOffset}
                width={pathLayout.width}
                height={pathLayout.height}
              />
            ) : null}

            <ol className="relative grid gap-y-14 lg:gap-y-18">
              {STEPS.map((step, index) => (
                <DesktopRow
                  key={step.number}
                  step={step}
                  index={index}
                  progress={activeProgress}
                  reducedMotion={reducedMotion}
                  setNodeRef={(node) => {
                    desktopNodeRefs.current[index] = node;
                  }}
                />
              ))}
            </ol>
          </div>
        </div>

        <div className="px-5 sm:px-8 md:hidden">
          <ol className="relative grid gap-8">
            <div
              className="pointer-events-none absolute top-4 bottom-4 w-px"
              style={{
                left: MOBILE_TIMELINE_LINE_LEFT,
                background:
                  "linear-gradient(to bottom, rgba(181,177,227,0.18), rgba(83,74,183,0.52), rgba(181,177,227,0.18))",
              }}
              aria-hidden="true"
            />

            {STEPS.map((step, index) => (
              <MobileCard
                key={step.number}
                step={step}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
