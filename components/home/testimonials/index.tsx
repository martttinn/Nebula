"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { HeroParticles } from "@/components/home/hero/particles";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { siteConfig } from "@/lib/site";

import { HOME_TESTIMONIAL_ARCHIVE } from "./archive";
import {
  TESTIMONIALS_CTA_COPY,
  TESTIMONIALS_CTA_GRID_IMAGE_SRC,
} from "./cta";
import { TestimonialsGridDistortionShell } from "./grid-distortion-shell";

const TESTIMONIALS_SECTION_BACKGROUND =
  "radial-gradient(circle_at_16%_18%,rgba(83,74,183,0.18),transparent_24%),radial-gradient(circle_at_82%_68%,rgba(181,177,227,0.1),transparent_28%),linear-gradient(180deg,#09090F_0%,#090A12_40%,#09090F_100%)";
const DESKTOP_STAGE_HEIGHT = 440;
const CARD_REVEAL_RANGES = [
  [0, 0],
  [0.18, 0.38],
  [0.44, 0.64],
  [0.7, 0.9],
] as const;
const CARD_STACK_SCALE_STEP = 0.032;
const CARD_STACK_LIP_SIZE = 18;
const CARD_COMPRESSION_LEAD_IN = 0.14;
const CARD_COMPRESSION_COMPLETE_AT = 0.72;

type TestimonialEntry = (typeof HOME_TESTIMONIAL_ARCHIVE)[number];
type TestimonialsStackCard =
  | {
      kind: "testimonial";
      id: TestimonialEntry["id"];
      testimonial: TestimonialEntry;
    }
  | {
      kind: "cta";
      id: "contacto";
    };

type TestimonialsStagePhase = "before" | "active" | "after";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * Math.pow(value, 3)
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function getWindowProgress(progress: number, start: number, end: number) {
  if (end <= start) {
    return progress >= end ? 1 : 0;
  }

  return clamp((progress - start) / (end - start), 0, 1);
}

function getCardRevealProgress(progress: number, index: number) {
  const [start, end] = CARD_REVEAL_RANGES[index];

  return getWindowProgress(progress, start, end);
}

function useTestimonialsStageState(ref: React.RefObject<HTMLElement | null>) {
  const [state, setState] = useState<{
    phase: TestimonialsStagePhase;
    progress: number;
  }>({
    phase: "before",
    progress: 0,
  });

  useEffect(() => {
    let frameId = 0;

    const updateState = () => {
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

    window.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState, { passive: true });
    updateState();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [ref]);

  return state;
}

function TestimonialCardSurface({
  testimonial,
}: {
  testimonial: TestimonialEntry;
}) {
  return (
    <article className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B0C16] shadow-panel">
      <div className="absolute inset-0 bg-[#0B0C16]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgb(11,12,22), rgb(10,15,46))",
        }}
      />
      <div
        className="absolute inset-0 bg-nebula-grid opacity-[0.06]"
        style={{ backgroundSize: "36px 36px" }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/[0.06]" />

      <div className="relative z-10 flex h-full flex-col gap-10 p-7 sm:p-8 md:p-10 xl:flex-row xl:gap-14 xl:p-16">
        <div className="relative space-y-8 xl:w-[32%] xl:min-w-[18rem] xl:pr-10">
          <div className="absolute right-0 top-0 hidden h-full w-px bg-[linear-gradient(180deg,rgba(232,232,240,0)_0%,rgba(232,232,240,0.12)_14%,rgba(83,74,183,0.46)_50%,rgba(232,232,240,0.12)_86%,rgba(232,232,240,0)_100%)] xl:block" />

          <div className="space-y-3 pb-6">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-nebula-lilac/90">
              Cliente
            </p>
            <p className="border-l border-white/10 pl-4 font-display text-[2rem] font-bold leading-[0.94] tracking-[-0.05em] text-nebula-silver md:text-[2.3rem]">
              {testimonial.author}
            </p>
          </div>

          <div className="space-y-3 pb-6">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-nebula-lilac/90">
              Empresa y cargo
            </p>
            <p className="border-l border-white/10 pl-4 text-[1rem] leading-relaxed text-nebula-silver/86">
              {testimonial.company}
              <span className="text-nebula-silver/40"> — </span>
              {testimonial.role}
            </p>
          </div>
        </div>

        <div className="relative flex flex-1 min-h-0 items-center xl:pl-6">
          <blockquote className="relative z-10 max-w-[42rem] space-y-5">
            <p className="max-w-[15ch] font-display text-[2.1rem] font-bold leading-[0.98] tracking-[-0.05em] text-nebula-silver sm:text-[2.35rem] xl:text-[3.05rem]">
              &quot;{testimonial.headline}&quot;
            </p>
            <p className="max-w-[34rem] text-[1.02rem] leading-[1.75] text-nebula-haze/82 sm:text-[1.08rem]">
              {testimonial.summary}
            </p>
          </blockquote>
        </div>
      </div>
    </article>
  );
}

function FinalCtaCardSurface() {
  return (
    <article className="pointer-events-auto relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#080B15] shadow-[0_28px_120px_rgba(0,0,0,0.4)]">
      <TestimonialsGridDistortionShell
        imageSrc={TESTIMONIALS_CTA_GRID_IMAGE_SRC}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(83,74,183,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(8,14,36,0.48),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-nebula-grid opacity-[0.08]" />

      <div className="pointer-events-none relative z-10 flex h-full min-h-[20rem] items-center justify-center px-6 py-8 text-center sm:px-8 sm:py-10 xl:px-12 xl:py-12">
        <div className="mx-auto max-w-2xl">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white">
            {TESTIMONIALS_CTA_COPY.eyebrow}
          </p>
          <p className="mx-auto mt-5 max-w-[13ch] font-display text-[2.65rem] font-bold leading-[0.92] tracking-[-0.06em] text-white sm:text-[3.2rem] xl:text-[4.15rem]">
            {TESTIMONIALS_CTA_COPY.title}
          </p>
          <div className="mt-9 flex items-center justify-center">
            <Button
              asChild
              size="lg"
              className="pointer-events-auto px-6"
            >
              <a
                href={siteConfig.contactHref}
                aria-label={`Solicitar consultoría por email a ${siteConfig.contactEmail}`}
              >
                {TESTIMONIALS_CTA_COPY.buttonLabel}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

function MobileTestimonialCard({
  testimonial,
  index,
}: {
  testimonial: TestimonialEntry;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = prefersReducedMotion ?? false;

  return (
    <motion.article
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B0C16] shadow-panel"
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.48,
        delay: reducedMotion ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="absolute inset-0 bg-[#0B0C16]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgb(11,12,22), rgb(10,15,46))",
        }}
      />
      <div
        className="absolute inset-0 bg-nebula-grid opacity-[0.06]"
        style={{ backgroundSize: "36px 36px" }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/[0.06]" />

      <div className="relative z-10 grid gap-8 p-6 sm:p-7">
        <div className="space-y-6">
          <div className="space-y-3 pb-5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-nebula-lilac/90">
              Cliente
            </p>
            <p className="border-l border-white/10 pl-4 font-display text-[2rem] font-bold leading-[0.94] tracking-[-0.05em] text-nebula-silver">
              {testimonial.author}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-nebula-lilac/90">
              Empresa y cargo
            </p>
            <p className="border-l border-white/10 pl-4 text-[1rem] leading-relaxed text-nebula-silver/86">
              {testimonial.company}
              <span className="text-nebula-silver/40"> — </span>
              {testimonial.role}
            </p>
          </div>
        </div>

        <div className="relative flex min-h-[16rem] items-center border-t border-nebula-lilac/15 pt-6 pl-5">
          <blockquote className="relative z-10 space-y-4">
            <p className="font-display text-[1.82rem] font-bold leading-[1] tracking-[-0.05em] text-nebula-silver">
              &quot;{testimonial.headline}&quot;
            </p>
            <p className="text-[0.98rem] leading-[1.72] text-nebula-haze/82">
              {testimonial.summary}
            </p>
          </blockquote>
        </div>
      </div>
    </motion.article>
  );
}

function MobileFinalCtaCard({
  index,
}: {
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = prefersReducedMotion ?? false;

  return (
    <motion.div
      className="relative"
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.48,
        delay: reducedMotion ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <FinalCtaCardSurface />
    </motion.div>
  );
}

function DesktopStackedTestimonialCard({
  card,
  index,
  total,
  progress,
  phase,
  reducedMotion,
}: {
  card: TestimonialsStackCard;
  index: number;
  total: number;
  progress: number;
  phase: TestimonialsStagePhase;
  reducedMotion: boolean;
}) {
  const timelineProgress = phase === "after" ? 1 : progress;
  const revealStart = CARD_REVEAL_RANGES[index][0];
  const isVisible =
    index === 0 || (phase !== "before" && timelineProgress >= revealStart);
  const revealProgress =
    reducedMotion || index === 0
      ? 1
      : getCardRevealProgress(timelineProgress, index);
  const easedReveal = easeInOutCubic(revealProgress);
  const nextCardRange = CARD_REVEAL_RANGES[index + 1];
  const nextCardSpan = nextCardRange ? nextCardRange[1] - nextCardRange[0] : 0;
  const compressionStart = nextCardRange
    ? Math.max(0, nextCardRange[0] - nextCardSpan * CARD_COMPRESSION_LEAD_IN)
    : 0;
  const compressionEnd = nextCardRange
    ? lerp(
        nextCardRange[0],
        nextCardRange[1],
        CARD_COMPRESSION_COMPLETE_AT,
      )
    : 1;
  const compressionProgress =
    reducedMotion || !nextCardRange
      ? 0
      : getWindowProgress(timelineProgress, compressionStart, compressionEnd);
  const compressionEased = easeInOutCubic(compressionProgress);
  const targetScale = nextCardRange
    ? 1 - (total - index) * CARD_STACK_SCALE_STEP
    : 1;
  const scale = nextCardRange
    ? lerp(1, targetScale, compressionEased)
    : 1;
  const y = reducedMotion || index === 0 ? 0 : lerp(115, 0, easedReveal);
  const opacity = reducedMotion || index === 0 ? 1 : lerp(0.92, 1, easedReveal);
  const stackOffset = index * CARD_STACK_LIP_SIZE;

  if (!isVisible && phase !== "after") {
    return null;
  }

  return (
    <div
      className="absolute inset-x-0 bottom-0"
      style={{
        opacity,
        top: `${stackOffset}px`,
        zIndex: index + 10,
        transform: `translateY(${y}%) scale(${scale})`,
        transformOrigin: "center top",
      }}
    >
      {card.kind === "testimonial" ? (
        <TestimonialCardSurface testimonial={card.testimonial} />
      ) : (
        <FinalCtaCardSurface />
      )}
    </div>
  );
}

function DesktopStickyTestimonialsStage({
  cards,
}: {
  cards: readonly TestimonialsStackCard[];
}) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = prefersReducedMotion ?? false;
  const {
    phase,
    progress,
  } = useTestimonialsStageState(stageRef);

  return (
    <div
      ref={stageRef}
      className="relative hidden lg:block"
      style={{ height: `${DESKTOP_STAGE_HEIGHT}svh` }}
    >
      <div
        className={
          phase === "active"
            ? "fixed inset-x-0 top-0 z-20 h-[100svh]"
            : "absolute inset-x-0 z-20 h-[100svh]"
        }
        style={{
          top: phase === "after" ? "calc(100% - 100svh)" : 0,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: TESTIMONIALS_SECTION_BACKGROUND }}
          aria-hidden="true"
        />
        <HeroParticles />

        <div className="section-shell relative grid h-screen grid-rows-[auto_minmax(0,1fr)] gap-8 py-20 xl:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <SectionTitle
              className="text-balance font-display text-4xl font-bold leading-[0.96] tracking-[-0.055em] text-nebula-silver sm:text-5xl lg:text-6xl"
              leadingText="Lo que dicen nuestros"
              accentText="clientes"
            />
          </div>

          <div className="relative mx-auto min-h-0 h-full w-full max-w-[80vw] xl:max-w-[82vw]">
            {cards.map((card, index) => (
              <DesktopStackedTestimonialCard
                key={card.id}
                card={card}
                index={index}
                total={cards.length}
                progress={progress}
                phase={phase}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const visibleTestimonials = HOME_TESTIMONIAL_ARCHIVE.slice(0, 3);
  const visibleCards: readonly TestimonialsStackCard[] = [
    ...visibleTestimonials.map((testimonial) => ({
      kind: "testimonial" as const,
      id: testimonial.id,
      testimonial,
    })),
    {
      kind: "cta",
      id: "contacto",
    },
  ];

  if (visibleTestimonials.length === 0) {
    return null;
  }

  return (
    <section
      id="contacto"
      aria-labelledby="testimonios-title"
      className="relative overflow-x-hidden bg-nebula-void py-24 lg:py-0"
    >
      <div id="testimonios" className="absolute inset-x-0 top-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{ backgroundImage: TESTIMONIALS_SECTION_BACKGROUND }}
        aria-hidden="true"
      />
      <div className="lg:hidden">
        <HeroParticles />
      </div>
      <h2 id="testimonios-title" className="sr-only">
        Lo que dicen nuestros clientes
      </h2>

      <DesktopStickyTestimonialsStage cards={visibleCards} />

      <div className="section-shell relative z-10 lg:hidden">
        <div className="mx-auto max-w-4xl text-center">
          <SectionTitle
            className="text-balance font-display text-4xl font-bold leading-[0.96] tracking-[-0.055em] text-nebula-silver sm:text-5xl"
            leadingText="Lo que dicen nuestros"
            accentText="clientes"
          />
        </div>
        <div className="mt-12 grid gap-6 lg:hidden">
          {visibleCards.map((card, index) =>
            card.kind === "testimonial" ? (
              <MobileTestimonialCard
                key={card.id}
                testimonial={card.testimonial}
                index={index}
              />
            ) : (
              <MobileFinalCtaCard key={card.id} index={index} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
