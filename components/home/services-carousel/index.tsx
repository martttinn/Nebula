"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";

import {
  HOME_SERVICES,
} from "@/data/services";
import { HeroParticles } from "@/components/home/hero/particles";

import {
  DESKTOP_ANIMATION_END_PROGRESS,
  DESKTOP_RUNWAY_VH,
  SERVICES_SECTION_BACKGROUND,
} from "./constants";
import { computeArcTransforms, getActiveIndex } from "./geometry";
import {
  MobileServiceCard,
  SectionHeading,
  ServiceCard,
} from "./primitives";
import { useSectionScrollProgress } from "./use-section-scroll-progress";

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
