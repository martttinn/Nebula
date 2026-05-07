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
const PROJECT_REVEAL_DURATION = 0.16;
const PROJECT_REVEAL_STARTS = [0.26, 0.52, 0.78] as const;

type FeaturedProjectStackItem = {
  label: string;
  iconName: TechStackIconName;
  iconVariant?: TechStackIconVariant;
};

type FeaturedProject = {
  title: string;
  status: string;
  clientType: string;
  sector: string;
  problemSolved: string;
  stack: FeaturedProjectStackItem[];
  imageSrc: string;
  imageAlt: string;
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
  },
  {
    title: "Nebula Studios",
    status: "Web en evolución",
    clientType: "Marca personal",
    sector: "Software a medida",
    problemSolved:
      "Traducir una propuesta técnica compleja a una home premium capaz de posicionar, diferenciar y filtrar clientes desde la primera visita.",
    stack: [
      {
        label: "Next.js",
        iconName: "nextjs",
        iconVariant: "dark",
      },
      {
        label: "Framer",
        iconName: "framer",
        iconVariant: "dark",
      },
      {
        label: "Three.js",
        iconName: "threejs",
        iconVariant: "dark",
      },
    ],
    imageSrc: "/abstract-icons/abstract6.png",
    imageAlt: "Visual conceptual del caso Nebula Studios",
  },
] satisfies FeaturedProject[];

type ProjectsHeadingPhase = "before" | "active" | "after";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function getProjectRevealProgress(progress: number, revealStart: number) {
  return clamp((progress - revealStart) / PROJECT_REVEAL_DURATION, 0, 1);
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
  const revealStart = PROJECT_REVEAL_STARTS[index];
  const revealProgress = getProjectRevealProgress(progress, revealStart);
  const easedReveal = easeOutCubic(revealProgress);
  const translateY = (1 - easedReveal) * 112;
  const opacity = clamp(revealProgress * 2.4, 0, 1);
  const scale = 0.972 + easedReveal * 0.028;
  const isVisible = phase !== "before" && progress >= revealStart;

  if (!isVisible && phase !== "after") {
    return null;
  }

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
      <div className="h-full">
        <article
          className="relative grid h-full w-full overflow-hidden bg-[#090B14] lg:grid-cols-[minmax(0,30fr)_minmax(0,70fr)]"
          style={{
            opacity: phase === "after" ? 1 : opacity,
            transform: `translate3d(0, ${phase === "after" ? 0 : translateY}svh, 0) scale(${phase === "after" ? 1 : scale})`,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 18%, rgba(83,74,183,0.16) 0%, transparent 24%), linear-gradient(180deg, rgba(9,11,20,0.98), rgba(10,15,46,0.98))",
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
                          className="h-4 w-4 shrink-0"
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
                className="w-fit px-5 text-[0.7rem] uppercase tracking-[0.18em] pointer-events-auto"
              >
                Visitar proyecto
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="group w-fit gap-2.5 px-5 text-[0.7rem] uppercase tracking-[0.18em] pointer-events-auto"
              >
                Ver más
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
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

export function ProjectsShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    phase,
    progress,
  } = useProjectsSectionState(sectionRef);
  const headingFadeProgress = getProjectRevealProgress(
    progress,
    PROJECT_REVEAL_STARTS[0],
  );
  const headingOpacity = phase === "after" ? 0 : 1 - headingFadeProgress;
  const headingScale = 1 - headingFadeProgress * 0.04;

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

      <div className="relative z-10 h-[460svh]" />

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
            id="proyectos-title"
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
    </section>
  );
}
