"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  LazyTechStackIcon,
  type TechStackIconName,
  type TechStackIconVariant,
} from "@/components/ui/lazy-tech-stack-icon";

const PROJECTS_SECTION_BACKGROUND =
  "radial-gradient(circle_at_18%_12%,rgba(83,74,183,0.16),transparent_24%),radial-gradient(circle_at_84%_74%,rgba(181,177,227,0.08),transparent_30%),linear-gradient(180deg,#09090F_0%,#080A12_42%,#09090F_100%)";
const PROJECTS_STAGE_HEIGHT = 620;
const PROJECT_REVEAL_STARTS = [0.14, 0.58, 0.82] as const;
const PROJECT_REVEAL_DURATION = 0.19;
const PROJECT_HORIZONTAL_TRAVEL = 100;
const PROJECT_VERTICAL_TRAVEL = 112;
const FIRST_PROJECT_EXPAND_START =
  PROJECT_REVEAL_STARTS[0] + PROJECT_REVEAL_DURATION;
const FIRST_PROJECT_EXPAND_END = PROJECT_REVEAL_STARTS[1];
const FIRST_PROJECT_EXPAND_WINDOW = FIRST_PROJECT_EXPAND_END - FIRST_PROJECT_EXPAND_START;
const FIRST_PROJECT_COMPACT_WIDTH = 88;
const FIRST_PROJECT_COMPACT_HEIGHT = 76;
const FIRST_PROJECT_COMPACT_RADIUS = 32;
const FIRST_PROJECT_HEADING_FADE_START =
  FIRST_PROJECT_EXPAND_START + FIRST_PROJECT_EXPAND_WINDOW * 0.18;
const FIRST_PROJECT_HEADING_FADE_END =
  FIRST_PROJECT_EXPAND_START + FIRST_PROJECT_EXPAND_WINDOW * 0.58;

type FeaturedProjectStackItem = {
  label: string;
  iconName: TechStackIconName;
  iconVariant?: TechStackIconVariant;
};

type FeaturedProjectRevealDirection = "up" | "right" | "left";

type FeaturedProject = {
  title: string;
  status: string;
  clientType: string;
  sector: string;
  problemSolved: string;
  stack: FeaturedProjectStackItem[];
  imageSrc: string;
  imageAlt: string;
  revealDirection: FeaturedProjectRevealDirection;
};

const FEATURED_PROJECTS = [
  {
    title: "Canal3 Networks",
    status: "Proyecto en construcción",
    clientType: "Empresa local",
    sector: "Telecomunicaciones",
    problemSolved:
      "Webapp destinada a presencia digital, captacion de nuevos clientes, CMS, portal de cliente (facturas, consumo de tarifa, historial de pagos,etc) y tienda online con recogida en tienda.",
    stack: [
      {
        label: "Next.js",
        iconName: "nextjs",
        iconVariant: "dark",
      },
      {
        label: "TypeScript",
        iconName: "typescript",
        iconVariant: "dark",
      },
      {
        label: "Supabase",
        iconName: "supabase",
        iconVariant: "dark",
      },
    ],
    imageSrc: "/abstract-icons/abstract5.png",
    imageAlt: "Visual conceptual del caso Canal 3 Networks",
    revealDirection: "up",
  },
  {
    title: "Future Nova",
    status: "MVP en desarrollo",
    clientType: "Producto propio",
    sector: "Fitness",
    problemSolved:
      "Centralizar reservas, acceso de usuarios y evolución futura a notificaciones y capas premium dentro de una experiencia móvil preparada para escalar.",
    stack: [
      {
        label: "Expo",
        iconName: "expo",
        iconVariant: "dark",
      },
      {
        label: "React Native",
        iconName: "reactnative",
        iconVariant: "dark",
      },
      {
        label: "Supabase",
        iconName: "supabase",
        iconVariant: "dark",
      },
    ],
    imageSrc: "/abstract-icons/abstract2.png",
    imageAlt: "Visual conceptual del caso Future Nova",
    revealDirection: "right",
  },
  {
    title: "Golden Grama",
    status: "Web en evolución",
    clientType: "Empresa local",
    sector: "Construcción",
    problemSolved:
      "Reforzar la presencia digital de la empresa y acompañar la digitalización de procesos clave del negocio sobre una base web clara y evolutiva.",
    stack: [
      {
        label: "Next.js",
        iconName: "nextjs",
        iconVariant: "dark",
      },
      {
        label: "TypeScript",
        iconName: "typescript",
        iconVariant: "dark",
      },
      {
        label: "Supabase",
        iconName: "supabase",
        iconVariant: "dark",
      },
    ],
    imageSrc: "/abstract-icons/abstract6.png",
    imageAlt: "Visual conceptual del caso Golden Grama",
    revealDirection: "right",
  },
] satisfies FeaturedProject[];

type ProjectsHeadingPhase = "before" | "active" | "after";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * Math.pow(value, 3)
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function getProjectRevealProgress(progress: number, index: number) {
  const revealStart = PROJECT_REVEAL_STARTS[index];

  return clamp((progress - revealStart) / PROJECT_REVEAL_DURATION, 0, 1);
}

function getWindowProgress(progress: number, start: number, end: number) {
  if (end <= start) {
    return progress >= end ? 1 : 0;
  }

  return clamp((progress - start) / (end - start), 0, 1);
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function getEntryOffsets(direction: FeaturedProjectRevealDirection, factor: number) {
  switch (direction) {
    case "right":
      return {
        x: PROJECT_HORIZONTAL_TRAVEL * factor,
        y: 0,
      };
    case "left":
      return {
        x: -PROJECT_HORIZONTAL_TRAVEL * factor,
        y: 0,
      };
    case "up":
      return {
        x: 0,
        y: PROJECT_VERTICAL_TRAVEL * factor,
      };
  }
}

function getExitOffsets(direction: FeaturedProjectRevealDirection, factor: number) {
  switch (direction) {
    case "right":
      return {
        x: -PROJECT_HORIZONTAL_TRAVEL * factor,
        y: 0,
      };
    case "left":
      return {
        x: PROJECT_HORIZONTAL_TRAVEL * factor,
        y: 0,
      };
    case "up":
      return {
        x: 0,
        y: -PROJECT_VERTICAL_TRAVEL * factor,
      };
  }
}

function useProjectsSectionState(ref: React.RefObject<HTMLElement | null>) {
  const [state, setState] = useState<{
    phase: ProjectsHeadingPhase;
    progress: number;
  }>({
    phase: "before",
    progress: 0,
  });

  useEffect(() => {
    let frameId = 0;

    const updatePhase = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        if (!ref.current) {
          return;
        }

        const rect = ref.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollWithinSection = -rect.top;
        const pinEnd = rect.height - viewportHeight;
        const progress =
          pinEnd <= 0 ? 0 : clamp(scrollWithinSection / pinEnd, 0, 1);

        if (scrollWithinSection <= 0) {
          setState({
            phase: "before",
            progress: 0,
          });
          return;
        }

        if (scrollWithinSection >= pinEnd) {
          setState({
            phase: "after",
            progress: 1,
          });
          return;
        }

        setState({
          phase: "active",
          progress,
        });
      });
    };

    window.addEventListener("scroll", updatePhase, { passive: true });
    window.addEventListener("resize", updatePhase, { passive: true });
    updatePhase();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updatePhase);
      window.removeEventListener("resize", updatePhase);
    };
  }, [ref]);

  return state;
}

function ProjectCard({
  project,
  index,
  progress,
  phase,
}: {
  project: FeaturedProject;
  index: number;
  progress: number;
  phase: ProjectsHeadingPhase;
}) {
  const timelineProgress = phase === "after" ? 1 : progress;
  const revealStart = PROJECT_REVEAL_STARTS[index];
  const revealProgress = getProjectRevealProgress(timelineProgress, index);
  const entryEasedReveal = easeInOutCubic(revealProgress);
  const isVisible = phase !== "before" && timelineProgress >= revealStart;
  const isFirstProject = index === 0;
  const nextProject = FEATURED_PROJECTS[index + 1];
  const nextRevealStart = PROJECT_REVEAL_STARTS[index + 1];
  const exitProgress =
    nextRevealStart == null
      ? 0
      : getProjectRevealProgress(timelineProgress, index + 1);
  const exitEasedReveal = easeInOutCubic(exitProgress);
  const isBeingPushed =
    nextRevealStart != null && timelineProgress >= nextRevealStart;
  const firstProjectExpandProgress = isFirstProject
    ? getWindowProgress(
        timelineProgress,
        FIRST_PROJECT_EXPAND_START,
        FIRST_PROJECT_EXPAND_END,
      )
    : 1;
  const firstProjectExpandEased = easeInOutCubic(firstProjectExpandProgress);

  if (!isVisible && phase !== "after") {
    return null;
  }

  const activeOffsets = isBeingPushed && nextProject
    ? getExitOffsets(nextProject.revealDirection, exitEasedReveal)
    : getEntryOffsets(project.revealDirection, 1 - entryEasedReveal);
  const opacity = clamp(revealProgress * 1.85, 0, 1);
  const scale = isFirstProject && !isBeingPushed
    ? lerp(0.992, 1, firstProjectExpandEased)
    : 1;
  const articleWidth = isFirstProject && !isBeingPushed
    ? `${lerp(FIRST_PROJECT_COMPACT_WIDTH, 100, firstProjectExpandEased)}vw`
    : "100vw";
  const articleHeight = isFirstProject && !isBeingPushed
    ? `${lerp(FIRST_PROJECT_COMPACT_HEIGHT, 100, firstProjectExpandEased)}svh`
    : "100svh";
  const articleBorderRadius = isFirstProject && !isBeingPushed
    ? `${lerp(FIRST_PROJECT_COMPACT_RADIUS, 0, firstProjectExpandEased)}px`
    : "0px";
  const articleBorderOpacity = isFirstProject && !isBeingPushed
    ? lerp(0.16, 0, firstProjectExpandEased)
    : 0;

  return (
    <div
      className={
        phase === "active"
          ? "pointer-events-none fixed inset-x-0 top-0 h-[100svh]"
          : "pointer-events-none absolute inset-x-0 h-[100svh]"
      }
      style={{
        top: phase === "after" ? "calc(100% - 100svh)" : undefined,
        zIndex: 30 + index,
      }}
    >
      <div className="flex h-full items-center justify-center">
        <article
          className="relative grid h-full w-full overflow-hidden bg-[#090B14] lg:grid-cols-[minmax(0,30fr)_minmax(0,70fr)]"
          style={{
            width: articleWidth,
            height: articleHeight,
            borderRadius: articleBorderRadius,
            boxShadow:
              articleBorderOpacity > 0
                ? `0 0 0 1px rgba(232,232,240,${articleBorderOpacity})`
                : "none",
            opacity,
            transform: `translate3d(${activeOffsets.x}vw, ${activeOffsets.y}svh, 0) scale(${scale})`,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(9,11,20,0.98), rgba(10,15,46,0.98))",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-nebula-grid opacity-[0.04]"
            style={{ backgroundSize: "38px 38px" }}
          />

          <div className="order-2 relative z-10 flex min-h-0 flex-col justify-between gap-10 px-6 py-8 sm:px-8 lg:order-1 lg:px-10 lg:py-10 xl:px-12 xl:py-12">
            <div className="space-y-6">
              <div className="hidden w-fit items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-nebula-silver/88 lg:inline-flex">
                <span>{project.status}</span>
              </div>
              <h3 className="max-w-[11ch] font-display text-[2.65rem] font-bold leading-[0.9] tracking-[-0.055em] text-nebula-silver sm:text-[3rem] xl:text-[3.5rem]">
                {project.title}
              </h3>
              <p className="max-w-[32ch] text-[1rem] leading-[1.68] text-nebula-haze/86 xl:text-[1.04rem]">
                {project.problemSolved}
              </p>
              <dl className="grid gap-4 text-sm">
                <div className="grid gap-1">
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-nebula-haze/70">
                    Tipo de cliente
                  </dt>
                  <dd className="text-nebula-silver/90">{project.clientType}</dd>
                </div>
                <div className="grid gap-1">
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-nebula-haze/70">
                    Sector
                  </dt>
                  <dd className="text-nebula-silver/90">{project.sector}</dd>
                </div>
                <div className="grid gap-2">
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-nebula-haze/70">
                    Stack principal
                  </dt>
                  <dd className="flex flex-wrap gap-2.5">
                    {project.stack.map((technology) => (
                      <span
                        key={technology.label}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-nebula-silver/88"
                      >
                        <LazyTechStackIcon
                          name={technology.iconName}
                          variant={technology.iconVariant}
                          className="size-4 shrink-0"
                          decorative
                        />
                        <span>{technology.label}</span>
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                className="group w-fit gap-2.5 px-5 text-[0.7rem] uppercase tracking-[0.18em] pointer-events-auto"
              >
                Ver más
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
            </div>
          </div>

          <div className="order-1 relative z-10 min-h-[48svh] border-b border-white/[0.08] lg:order-2 lg:min-h-0 lg:border-b-0 lg:border-l">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 18%, rgba(83,74,183,0.22) 0%, transparent 24%), radial-gradient(circle at 84% 72%, rgba(181,177,227,0.16) 0%, transparent 28%), linear-gradient(180deg, rgba(8,9,18,0.98), rgba(10,12,24,1))",
              }}
            />
            <div
              className="absolute inset-0 bg-nebula-grid opacity-[0.055]"
              style={{ backgroundSize: "42px 42px" }}
            />
            <div className="absolute bottom-6 left-6 z-20 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-nebula-silver/88 backdrop-blur-md lg:hidden">
              <span>{project.status}</span>
            </div>
            <div className="relative flex h-full items-center justify-center px-6 py-10 sm:px-8 lg:px-12 xl:px-16">
              <div className="relative h-full w-full">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="object-contain drop-shadow-[0_36px_80px_rgba(4,5,15,0.5)]"
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

function MobileProjectCard({
  project,
}: {
  project: FeaturedProject;
}) {
  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[#090B14] shadow-panel">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(9,11,20,0.98), rgba(10,15,46,0.98))",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-nebula-grid opacity-[0.04]"
        style={{ backgroundSize: "36px 36px" }}
      />

      <div className="relative z-10 grid gap-0">
        <div className="relative min-h-[18rem] border-b border-white/[0.08]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 18%, rgba(83,74,183,0.22) 0%, transparent 24%), radial-gradient(circle at 84% 72%, rgba(181,177,227,0.16) 0%, transparent 28%), linear-gradient(180deg, rgba(8,9,18,0.98), rgba(10,12,24,1))",
            }}
          />
          <div
            className="absolute inset-0 bg-nebula-grid opacity-[0.055]"
            style={{ backgroundSize: "42px 42px" }}
          />
          <div className="relative flex h-full items-center justify-center px-6 py-10 sm:px-8">
            <div className="relative h-[16rem] w-full max-w-[18rem]">
              <Image
                src={project.imageSrc}
                alt={project.imageAlt}
                fill
                sizes="100vw"
                className="object-contain drop-shadow-[0_36px_80px_rgba(4,5,15,0.5)]"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 grid gap-5 px-5 py-6 sm:px-6 sm:py-7">
          <div className="space-y-4">
            <h3 className="max-w-[11ch] font-display text-[2.2rem] font-bold leading-[0.9] tracking-[-0.055em] text-nebula-silver sm:text-[2.5rem]">
              {project.title}
            </h3>
            <p className="max-w-[34ch] text-[0.98rem] leading-[1.72] text-nebula-haze/86">
              {project.problemSolved}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              className="group w-fit gap-2.5 px-5 text-[0.7rem] uppercase tracking-[0.18em]"
            >
              Ver más
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProjectsShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    phase,
    progress,
  } = useProjectsSectionState(sectionRef);
  const headingFadeProgress = getWindowProgress(
    progress,
    FIRST_PROJECT_HEADING_FADE_START,
    FIRST_PROJECT_HEADING_FADE_END,
  );
  const headingFadeEased = easeOutCubic(headingFadeProgress);
  const headingOpacity = phase === "after" ? 0 : 1 - headingFadeEased;
  const headingScale = 1 - headingFadeEased * 0.035;

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      aria-labelledby="proyectos-title"
      className="relative -mt-px overflow-x-hidden bg-nebula-void"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: PROJECTS_SECTION_BACKGROUND }}
        aria-hidden="true"
      />
      <h2 id="proyectos-title" className="sr-only">
        Proyectos destacados
      </h2>

      <div className="section-shell relative z-10 py-24 md:py-28 lg:hidden">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="font-display text-[3rem] font-bold leading-[0.92] tracking-[-0.06em] text-nebula-silver sm:text-[4rem]"
            >
              <span className="text-nebula-lilac">Proyectos</span> destacados
            </h2>
          </div>

          <div className="mt-14 grid gap-5">
            {FEATURED_PROJECTS.map((project) => (
              <MobileProjectCard
                key={`mobile-${project.title}`}
                project={project}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div
          className="relative z-10"
          style={{ height: `${PROJECTS_STAGE_HEIGHT}svh` }}
        />

        <div
          className={
            phase === "active"
              ? "pointer-events-none fixed inset-x-0 top-1/2 z-20 -translate-y-1/2 px-6"
              : "pointer-events-none absolute inset-x-0 z-20 px-6"
          }
          style={
            phase === "before"
              ? {
                  top: "50svh",
                  transform: "translateY(-50%)",
                }
              : phase === "after"
                ? {
                    top: "calc(100% - 50svh)",
                    transform: "translateY(-50%)",
                  }
                : undefined
          }
        >
          <div
            className="mx-auto max-w-6xl text-center transition-opacity duration-300"
            style={{
              opacity: headingOpacity,
              transform: `scale(${headingScale})`,
            }}
          >
            <h2
              className="font-display text-[3.65rem] font-bold leading-[0.9] tracking-[-0.06em] text-nebula-silver sm:text-[4.6rem] md:text-[5.25rem] xl:text-[7rem]"
            >
              <span className="text-nebula-lilac">Proyectos</span> destacados
            </h2>
          </div>
        </div>

        {FEATURED_PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            progress={progress}
            phase={phase}
          />
        ))}
      </div>
    </section>
  );
}
