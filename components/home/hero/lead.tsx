"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { SplitText } from "@/components/ui/split-text";

const headingText = "Software que hace crecer tu negocio.";
const headingLeadingText = "Software que hace crecer tu ";
const headingAccentText = "negocio.";
const subheadingText =
  "Construimos productos digitales a medida para empresas locales que necesitan digitalizar sus procesos.";

export function HeroLead() {
  const prefersReducedMotion = useReducedMotion();
  const [headingActive, setHeadingActive] = useState(false);
  const [subheadingActive, setSubheadingActive] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);
  const [scrollCueVisible, setScrollCueVisible] = useState(false);
  const timersRef = useRef<number[]>([]);

  const schedule = useCallback((callback: () => void, delay: number) => {
    const timer = window.setTimeout(callback, delay);
    timersRef.current.push(timer);
  }, []);

  useEffect(() => {
    const clearTimers = () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };

    if (prefersReducedMotion) {
      return clearTimers;
    }

    const startSequence = () => {
      setHeadingActive(true);
    };

    const fallbackTimer = window.setTimeout(startSequence, 3200);
    timersRef.current.push(fallbackTimer);

    window.addEventListener("hero-intro-start", startSequence);

    return () => {
      window.removeEventListener("hero-intro-start", startSequence);
      clearTimers();
    };
  }, [prefersReducedMotion]);

  const handleHeadingComplete = useCallback(() => {
    if (prefersReducedMotion || subheadingActive) {
      return;
    }

    schedule(() => setSubheadingActive(true), 0);
  }, [prefersReducedMotion, schedule, subheadingActive]);

  const handleSubheadingComplete = useCallback(() => {
    if (prefersReducedMotion || actionsVisible) {
      return;
    }

    schedule(() => setActionsVisible(true), 24);
  }, [actionsVisible, prefersReducedMotion, schedule]);

  useEffect(() => {
    if (prefersReducedMotion || !actionsVisible || scrollCueVisible) {
      return;
    }

    schedule(() => setScrollCueVisible(true), 220);
  }, [actionsVisible, prefersReducedMotion, schedule, scrollCueVisible]);

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center">
      <h1 className="max-w-3xl font-display text-5xl font-extrabold leading-[0.9] tracking-[-0.06em] text-nebula-silver sm:text-6xl lg:text-7xl">
        {prefersReducedMotion ? (
          <>
            {headingLeadingText}
            <span className="text-nebula-lilac">{headingAccentText}</span>
          </>
        ) : (
          <SplitText
            text={headingText}
            active={headingActive}
            hideUntilStart
            delay={18}
            duration={0.62}
            className="text-nebula-silver"
            tokenClassNameMap={{ "negocio.": "text-nebula-lilac" }}
            onComplete={handleHeadingComplete}
          />
        )}
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-8 text-white sm:text-lg">
        {prefersReducedMotion ? (
          subheadingText
        ) : (
          <SplitText
            text={subheadingText}
            active={subheadingActive}
            hideUntilStart
            delay={8}
            duration={0.54}
            className="text-white"
            segmentClassName="text-white"
            onComplete={handleSubheadingComplete}
          />
        )}
      </p>

      <motion.div
        initial={false}
        animate={
          actionsVisible || prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 12 }
        }
        transition={{
          duration: 0.42,
          ease: [0.22, 1, 0.36, 1],
          staggerChildren: 0.05,
        }}
        className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center"
      >
        <motion.div
          initial={false}
          animate={
            actionsVisible || prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 12 }
          }
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button asChild size="lg">
            <Link href="/#contacto">Contactar</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={false}
          animate={
            actionsVisible || prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 12 }
          }
          transition={{
            duration: 0.42,
            delay: prefersReducedMotion ? 0 : 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="border-white/18 bg-white/[0.05] hover:bg-white"
          >
            <Link href="/#servicios">Ver servicios</Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={false}
        animate={
          scrollCueVisible || prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 12 }
        }
        transition={{
          duration: 0.42,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute inset-x-0 bottom-7 flex justify-center sm:bottom-8"
      >
        <div className="flex flex-col items-center gap-3 text-nebula-haze/85">
          <span className="h-10 w-px bg-gradient-to-b from-white/0 via-white/18 to-white/0" />
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] shadow-[0_0_36px_rgba(83,74,183,0.18)] backdrop-blur-md motion-safe:animate-hero-scroll-cue motion-reduce:animate-none">
            <ChevronDown className="h-5 w-5" strokeWidth={1.6} />
          </span>
        </div>
      </motion.div>
    </div>
  );
}
