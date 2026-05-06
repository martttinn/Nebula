"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import {
  HOME_SERVICES,
  type HomeService,
} from "@/data/services";
import BorderGlow from "@/components/BorderGlow";
import { HeroParticles } from "@/components/home/hero-particles";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";

const ARC_SPAN_DEG = 64;
const ARC_RADIUS = 990;
const EDGE_SCALE_FACTOR = 0.2;
const DESKTOP_RUNWAY_VH = 250;
const DESKTOP_ANIMATION_END_PROGRESS = 0.86;
const CARD_WIDTH = 368;
const CARD_HEIGHT = 520;
const DEG_TO_RAD = Math.PI / 180;
const SERVICES_SECTION_BACKGROUND =
  "radial-gradient(circle_at_18%_14%,rgba(83,74,183,0.1),transparent_22%),radial-gradient(circle_at_82%_66%,rgba(181,177,227,0.08),transparent_28%),linear-gradient(180deg,#09090F_0%,#080A12_26%,#09090F_100%)";

function roundTo(value: number, decimals: number) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const [r, g, b] =
    normalized.length === 3
      ? normalized.split("").map((part) => Number.parseInt(part + part, 16))
      : [
          Number.parseInt(normalized.slice(0, 2), 16),
          Number.parseInt(normalized.slice(2, 4), 16),
          Number.parseInt(normalized.slice(4, 6), 16),
        ];

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function buildServiceGlowColors(accent: string) {
  return [accent, "#7D74E0", "#B5B1E3"];
}

type CardTransform = {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  zIndex: number;
};

function computeArcTransforms(
  progress: number,
  cardCount: number,
  reducedMotion: boolean,
  endProgress = 1,
): CardTransform[] {
  const clampedProgress = Math.min(progress / endProgress, 1);
  const activeFloat = clampedProgress * (cardCount - 1);
  const angleStep = ARC_SPAN_DEG / Math.max(cardCount - 1, 1);
  const halfSpan = ARC_SPAN_DEG / 2;

  return Array.from({ length: cardCount }, (_, index) => {
    const offset = index - activeFloat;
    const angleDeg = offset * angleStep;
    const angleRad = angleDeg * DEG_TO_RAD;
    const x = Math.sin(angleRad) * ARC_RADIUS;
    const y = (1 - Math.cos(angleRad)) * ARC_RADIUS * 0.35;
    const normalizedDistance = Math.min(Math.abs(angleDeg) / halfSpan, 1);
    const rotation = reducedMotion ? 0 : roundTo(angleDeg * 0.38, 3);
    const scale = roundTo(1 - normalizedDistance * EDGE_SCALE_FACTOR, 4);
    const zIndex = cardCount - Math.round(Math.abs(offset));

    return {
      x: roundTo(x, 4),
      y: roundTo(y, 4),
      rotation,
      scale,
      opacity: 1,
      zIndex,
    };
  });
}

function getActiveIndex(
  progress: number,
  cardCount: number,
  endProgress = 1,
) {
  return Math.round(Math.min(progress / endProgress, 1) * (cardCount - 1));
}

function useSectionScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const sectionHeight = ref.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = sectionHeight - viewportHeight;

    if (scrollableDistance <= 0) {
      setProgress(0);
      return;
    }

    const scrolled = -rect.top;
    const rawProgress = scrolled / scrollableDistance;
    setProgress(Math.max(0, Math.min(1, rawProgress)));
  }, [ref]);

  useEffect(() => {
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  return progress;
}

function SectionHeading() {
  return (
    <motion.div
      className="section-shell pt-14 text-center sm:pt-16"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <SectionTitle
        id="servicios-title"
        className="mx-auto max-w-5xl font-display text-4xl font-bold leading-[0.96] tracking-[-0.055em] text-nebula-silver sm:text-5xl lg:text-6xl"
        leadingText="Nuestros"
        accentText="Servicios"
      />
    </motion.div>
  );
}

function ServiceCardChrome({
  service,
  children,
  className,
}: {
  service: HomeService;
  children: ReactNode;
  className?: string;
}) {
  return (
    <BorderGlow
      className={className ?? "h-full w-full shadow-panel"}
      backgroundColor="#0B0C16"
      borderRadius={32}
      glowRadius={32}
      glowIntensity={1.02}
      edgeSensitivity={8}
      coneSpread={19}
      fillOpacity={0.22}
      colors={buildServiceGlowColors(service.accent)}
      glowColor="252 48 66"
    >
      <div className="absolute inset-0 bg-[#0B0C16]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 82% 16%, ${hexToRgba(service.accent, 0.24)} 0%, transparent 28%),
            radial-gradient(circle at 18% 18%, rgba(232,232,240,0.08) 0%, transparent 20%),
            linear-gradient(180deg, rgb(11,12,22), rgb(10,15,46))
          `,
        }}
      />
      <div
        className="absolute inset-0 bg-nebula-grid opacity-[0.06]"
        style={{ backgroundSize: "36px 36px" }}
      />
      <div
        className="absolute -left-10 bottom-8 h-40 w-40 rounded-full"
        style={{
          background: `radial-gradient(circle, ${hexToRgba(service.accent, 0.22)} 0%, transparent 70%)`,
        }}
      />
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] border"
        style={{ borderColor: hexToRgba(service.accent, 0.18) }}
      />
    </BorderGlow>
  );
}

function ServiceCardContent({
  service,
  variant,
}: {
  service: HomeService;
  variant: "desktop" | "mobile";
}) {
  const isMobile = variant === "mobile";

  return (
    <div
      className={`relative z-10 grid h-full ${isMobile ? "grid-rows-[auto_auto_1fr_auto] px-7 pt-8 pb-8" : "grid-rows-[auto_1fr_auto] px-8 pt-9 pb-10"}`}
    >
      <h3
        className={`mx-auto text-center font-display font-bold tracking-[-0.055em] text-nebula-silver ${isMobile ? "max-w-[15.5rem] text-[2rem] leading-[0.94]" : "max-w-[15.75rem] text-[2.2rem] leading-[0.92]"}`}
      >
        {service.title}
      </h3>
      <div className={`flex items-center justify-center ${isMobile ? "py-6" : "py-4"}`}>
        <div
          className={`relative flex items-center justify-center ${isMobile ? "h-40 w-40" : "h-44 w-44"}`}
        >
          <div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${hexToRgba(service.accent, 0.28)} 0%, transparent 72%)`,
            }}
          />
          <Image
            src={service.iconSrc}
            alt=""
            aria-hidden="true"
            width={1254}
            height={1254}
            className={`relative w-auto drop-shadow-[0_24px_48px_rgba(0,0,0,0.42)] ${isMobile ? "h-[8.5rem]" : "h-[9.25rem]"}`}
          />
        </div>
      </div>
      <p
        className={`mx-auto overflow-hidden text-center text-nebula-haze/82 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] ${isMobile ? "max-w-[17rem] text-[0.98rem] leading-[1.58]" : "max-w-[16.5rem] text-[0.93rem] leading-[1.56]"}`}
      >
        {service.subtitle}
      </p>
      <div className={`flex justify-center ${isMobile ? "pt-6" : "pt-5"}`}>
        <Button
          asChild
          variant="secondary"
          size="lg"
          className="group w-fit gap-2.5 self-center border-white/12 bg-white/[0.05] px-7 text-nebula-silver hover:bg-white"
        >
          <Link href="/#contacto" aria-label={`Ver más sobre ${service.title}`}>
            Ver más
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  transform,
}: {
  service: HomeService;
  transform: CardTransform;
}) {
  return (
    <motion.article
      className="absolute left-1/2 top-1/2 h-[520px] w-[368px] overflow-visible"
      style={{
        x: transform.x - CARD_WIDTH / 2,
        y: transform.y - CARD_HEIGHT / 2,
        rotate: transform.rotation,
        scale: transform.scale,
        opacity: transform.opacity,
        zIndex: transform.zIndex,
        willChange: "transform",
      }}
      transition={{ type: "spring", stiffness: 180, damping: 26 }}
    >
      <ServiceCardChrome service={service} className="h-full w-full shadow-panel">
        <ServiceCardContent service={service} variant="desktop" />
      </ServiceCardChrome>
    </motion.article>
  );
}

function MobileServiceCard({
  service,
  reducedMotion,
  index,
}: {
  service: HomeService;
  reducedMotion: boolean;
  index: number;
}) {
  return (
    <motion.article
      className="mx-auto w-full max-w-[23rem]"
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.48,
        delay: reducedMotion ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <ServiceCardChrome service={service} className="min-h-[31.5rem] w-full shadow-panel">
        <ServiceCardContent service={service} variant="mobile" />
      </ServiceCardChrome>
    </motion.article>
  );
}

function DesktopServicesCarousel({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progress = useSectionScrollProgress(wrapperRef);
  const transforms = computeArcTransforms(
    progress,
    HOME_SERVICES.length,
    reducedMotion,
    DESKTOP_ANIMATION_END_PROGRESS,
  );
  const activeIndex = getActiveIndex(
    progress,
    HOME_SERVICES.length,
    DESKTOP_ANIMATION_END_PROGRESS,
  );

  return (
    <div
      ref={wrapperRef}
      className="relative hidden md:block"
      style={{ height: `${DESKTOP_RUNWAY_VH}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: SERVICES_SECTION_BACKGROUND }}
        />
        <HeroParticles />
        <div className="relative z-10 flex h-full flex-col">
          <SectionHeading />
          <div className="relative -mt-[4.5rem] flex flex-1 items-center justify-center overflow-hidden">
            <div className="relative h-full w-full">
              {HOME_SERVICES.map((service, index) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  transform={transforms[index]}
                />
              ))}

              <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 items-center gap-3">
                {HOME_SERVICES.map((service, index) => (
                  <div
                    key={service.slug}
                    className="h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: index === activeIndex ? "1.75rem" : "0.625rem",
                      backgroundColor:
                        index === activeIndex
                          ? service.accent
                          : "rgba(232,232,240,0.18)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileServicesCarousel({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <div className="relative md:hidden">
      <div className="pt-14">
        <SectionHeading />
      </div>

      <div className="section-shell mt-8 flex flex-col gap-7 pb-14">
        {HOME_SERVICES.map((service, index) => (
          <MobileServiceCard
            key={service.slug}
            service={service}
            reducedMotion={reducedMotion}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export function ServicesCarouselSection() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = prefersReducedMotion ?? false;

  return (
    <section
      id="servicios"
      aria-labelledby="servicios-title"
      className="relative -mt-px bg-nebula-void"
    >
      <div
        className="absolute inset-0 md:hidden"
        style={{ backgroundImage: SERVICES_SECTION_BACKGROUND }}
      />
      <div className="md:hidden">
        <HeroParticles />
      </div>
      <div className="relative z-10">
        <DesktopServicesCarousel reducedMotion={reducedMotion} />
        <MobileServicesCarousel reducedMotion={reducedMotion} />
      </div>
    </section>
  );
}
