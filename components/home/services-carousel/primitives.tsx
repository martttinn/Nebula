"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import type { HomeService } from "@/data/services";
import BorderGlow from "@/components/BorderGlow";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";

import { CARD_HEIGHT, CARD_WIDTH } from "./constants";
import type { CardTransform } from "./types";
import { buildServiceGlowColors, hexToRgba } from "./utils";

const SECTION_HEADING_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function SectionHeading() {
  return (
    <motion.div
      className="section-shell pt-14 text-center sm:pt-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      variants={SECTION_HEADING_VARIANTS}
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

export function ServiceCardChrome({
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

export function ServiceCardContent({
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

export function ServiceCard({
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

export function MobileServiceCard({
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
