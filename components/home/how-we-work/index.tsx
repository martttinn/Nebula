"use client";

import { useEffect, useRef, useState } from "react";
import {
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { HeroParticles } from "@/components/home/hero/particles";

import {
  MOBILE_TIMELINE_LINE_LEFT,
  PATH_END_Y_OFFSET,
  PATH_START_Y_OFFSET,
  SECTION_ACCENT_BACKGROUND,
  STEPS,
} from "./constants";
import { buildSmoothPath, measurePathLength } from "./path";
import {
  DesktopConnector,
  DesktopRow,
  MobileCard,
  SectionHeading,
} from "./primitives";
import type { PathLayout, Point } from "./types";
import { debugOutline } from "./utils";

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
        style={{ background: SECTION_ACCENT_BACKGROUND }}
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
