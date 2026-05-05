"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { Code2, GitBranch, Search, TrendingUp } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const DEBUG_BORDERS = true;
const PATH_ENTRY_OFFSET = 72;
const PATH_EXIT_OFFSET = 84;
const DESKTOP_STEP_STOPS = [0.16, 0.38, 0.62, 0.84] as const;

type Step = {
  number: string;
  title: string;
  description: string;
  side: "left" | "right";
  icon: LucideIcon;
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

const STEPS: readonly Step[] = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Entendemos tu negocio, flujos y procesos antes de proponer nada. Sin soluciones genéricas: primero escuchamos.",
    side: "left",
    icon: Search,
  },
  {
    number: "02",
    title: "Arquitectura",
    description:
      "Diseñamos la solución técnica adaptada a tu realidad. Cada decisión tiene un porqué claro y documentado.",
    side: "right",
    icon: GitBranch,
  },
  {
    number: "03",
    title: "Desarrollo",
    description:
      "Construimos de forma iterativa. Ves avances reales en cada fase, no promesas vacías al final del proyecto.",
    side: "left",
    icon: Code2,
  },
  {
    number: "04",
    title: "Evolución",
    description:
      "Lanzamos, medimos y mejoramos contigo de forma continua. El lanzamiento es el comienzo, no el fin.",
    side: "right",
    icon: TrendingUp,
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

function buildSmoothPath(points: Point[]) {
  if (points.length < 2) {
    return "";
  }

  let path = `M ${round(points[0].x)} ${round(points[0].y)}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const previousPoint = points[index - 1] ?? points[index];
    const currentPoint = points[index];
    const nextPoint = points[index + 1];
    const followingPoint = points[index + 2] ?? nextPoint;

    const control1 = {
      x: currentPoint.x + (nextPoint.x - previousPoint.x) / 6,
      y: currentPoint.y + (nextPoint.y - previousPoint.y) / 6,
    };
    const control2 = {
      x: nextPoint.x - (followingPoint.x - currentPoint.x) / 6,
      y: nextPoint.y - (followingPoint.y - currentPoint.y) / 6,
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
      <h2
        id="proceso-title"
        className="mx-auto max-w-[16ch] font-display text-4xl font-bold leading-[0.98] tracking-[-0.05em] text-nebula-silver sm:text-5xl lg:text-[4rem]"
      >
        Un proceso que{" "}
        <span className="text-nebula-haze">puedes entender</span>
      </h2>
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
  const Icon = step.icon;
  const nodeStop = DESKTOP_STEP_STOPS[index];
  const activeWindowStart = Math.max(nodeStop - 0.06, 0);
  const scaleMotion = useTransform(
    progress,
    [activeWindowStart, nodeStop],
    [0.92, 1],
  );
  const glowOpacityMotion = useTransform(
    progress,
    [activeWindowStart, nodeStop],
    [0.28, 0.92],
  );
  const ringOpacityMotion = useTransform(
    progress,
    [activeWindowStart, nodeStop],
    [0.4, 1],
  );
  const scale = reducedMotion ? 1 : scaleMotion;
  const glowOpacity = reducedMotion ? 0.72 : glowOpacityMotion;
  const ringOpacity = reducedMotion ? 0.72 : ringOpacityMotion;

  return (
    <motion.div
      ref={setNodeRef}
      className="relative z-20 flex h-24 w-24 items-center justify-center"
      style={{ scale, ...debugOutline("rgba(250, 204, 21, 0.8)") }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          opacity: glowOpacity,
          background:
            "radial-gradient(circle, rgba(83,74,183,0.34) 0%, rgba(83,74,183,0.08) 42%, transparent 72%)",
        }}
      />
      <motion.div
        className="absolute inset-[9px] rounded-full border"
        style={{ opacity: ringOpacity, borderColor: "rgba(232,232,240,0.86)" }}
      />
      <motion.div
        className="absolute inset-[22px] rounded-full border"
        style={{ opacity: ringOpacity, borderColor: "rgba(181,177,227,0.62)" }}
      />
      <div
        className="absolute inset-[31px] rounded-full"
        style={{ background: "rgba(20,16,34,0.92)" }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center gap-1.5">
        <Icon className="h-5 w-5 text-nebula-silver" strokeWidth={1.8} />
        <span className="font-display text-[0.58rem] font-bold tracking-[0.24em] text-nebula-haze">
          {step.number}
        </span>
      </div>
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
  const revealStart = Math.max(nodeStop - 0.13, 0);
  const revealEnd = Math.max(nodeStop - 0.035, revealStart + 0.02);
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
      className="relative z-10 w-full max-w-[39rem] overflow-hidden rounded-[2rem] border border-white/[0.06] bg-[#171125]/95 px-8 py-7 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-sm"
      style={{
        opacity,
        x,
        y,
        scale,
        filter,
        ...debugOutline("rgba(34, 197, 94, 0.82)"),
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 12% 20%, rgba(83,74,183,0.18), transparent 34%), radial-gradient(circle at 88% 78%, rgba(125,116,224,0.08), transparent 30%)",
        }}
      />
      <div className="relative z-10">
        <div className="mb-5 flex items-center gap-3">
          <span className="font-display text-[0.68rem] font-bold tracking-[0.24em] text-nebula-haze/78">
            {step.number}
          </span>
          <span className="h-px w-10 bg-nebula-lilac/40" />
        </div>
        <h3 className="mb-4 max-w-[16ch] font-display text-[1.9rem] font-bold leading-[1.02] tracking-[-0.045em] text-nebula-silver">
          {step.title}
        </h3>
        <p className="max-w-[38ch] text-[1.02rem] leading-[1.62] text-[#AFA9EC]">
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

  return (
    <li
      className="grid min-h-[15rem] grid-cols-[4.75rem_minmax(0,1.65fr)_minmax(2rem,1fr)_minmax(0,1.65fr)_4.75rem] items-center gap-y-6 px-4 lg:px-8 xl:px-12"
      style={debugOutline("rgba(251, 146, 60, 0.82)", -2)}
    >
      {isLeft ? (
        <>
          <div className="col-[1] justify-self-start" style={debugOutline("rgba(250, 204, 21, 0.8)")}>
            <DesktopNode
              step={step}
              index={index}
              progress={progress}
              reducedMotion={reducedMotion}
              setNodeRef={setNodeRef}
            />
          </div>
          <div className="col-[2]">
            <DesktopCard
              step={step}
              index={index}
              progress={progress}
              reducedMotion={reducedMotion}
            />
          </div>
        </>
      ) : (
        <>
          <div className="col-[4] justify-self-end">
            <DesktopCard
              step={step}
              index={index}
              progress={progress}
              reducedMotion={reducedMotion}
            />
          </div>
          <div className="col-[5] justify-self-end" style={debugOutline("rgba(250, 204, 21, 0.8)")}>
            <DesktopNode
              step={step}
              index={index}
              progress={progress}
              reducedMotion={reducedMotion}
              setNodeRef={setNodeRef}
            />
          </div>
        </>
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
  const Icon = step.icon;

  return (
    <motion.li
      className="relative flex gap-5"
      initial={reducedMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative z-10 mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#171125] shadow-[0_14px_40px_rgba(0,0,0,0.34)]">
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(83,74,183,0.24) 0%, transparent 70%)" }}
        />
        <Icon className="relative z-10 h-5 w-5 text-nebula-silver" strokeWidth={1.8} />
      </div>

      <article className="relative flex-1 overflow-hidden rounded-[1.6rem] border border-white/[0.06] bg-[#171125]/95 px-6 py-5 shadow-[0_24px_60px_rgba(0,0,0,0.34)]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 15% 18%, rgba(83,74,183,0.16), transparent 36%), radial-gradient(circle at 85% 85%, rgba(125,116,224,0.08), transparent 32%)",
          }}
        />
        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-display text-[0.66rem] font-bold tracking-[0.22em] text-nebula-haze/78">
              {step.number}
            </span>
            <span className="h-px w-8 bg-nebula-lilac/35" />
          </div>
          <h3 className="mb-3 font-display text-[1.45rem] font-bold leading-[1.02] tracking-[-0.04em] text-nebula-silver">
            {step.title}
          </h3>
          <p className="text-[0.95rem] leading-[1.62] text-[#AFA9EC]">
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
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${width} ${height}`}
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      style={debugOutline("rgba(168, 85, 247, 0.78)", 0)}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="how-we-work-line" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(181,177,227,0.94)" />
          <stop offset="42%" stopColor="rgba(125,116,224,0.95)" />
          <stop offset="100%" stopColor="rgba(83,74,183,0.95)" />
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
        stroke="rgba(125,116,224,0.22)"
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
            x: -PATH_ENTRY_OFFSET,
            y: nodePoints[0].y - 6,
          },
          ...nodePoints,
          {
            x: stageRect.width + PATH_EXIT_OFFSET,
            y: nodePoints[nodePoints.length - 1].y + 116,
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
          background:
            "radial-gradient(ellipse 52% 34% at 14% 12%, rgba(83,74,183,0.08) 0%, transparent 70%), radial-gradient(ellipse 42% 28% at 88% 76%, rgba(125,116,224,0.08) 0%, transparent 72%)",
        }}
        aria-hidden="true"
      />

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
              className="pointer-events-none absolute left-7 top-4 bottom-4 w-px"
              style={{
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
