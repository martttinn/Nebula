"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { SplitText } from "@/components/ui/split-text";

const headingLeadingText = "Software que hace crecer tu ";
const headingAccentText = "negocio.";
const subheadingText =
  "Construimos productos digitales a medida para empresas locales que necesitan digitalizar sus procesos.";
const HERO_INTRO_START_EVENT = "hero-intro-start";
const HERO_INTRO_FALLBACK_MS = 1300;

export function HeroLead() {
  const prefersReducedMotion = useReducedMotion();
  const [subheadingActive, setSubheadingActive] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);
  const [scrollCueVisible, setScrollCueVisible] = useState(false);
  const timersRef = useRef<number[]>([]);
  const introStartedRef = useRef(false);

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
      if (introStartedRef.current) {
        return;
      }

      introStartedRef.current = true;
      schedule(() => setSubheadingActive(true), 120);
    };

    const fallbackTimer = window.setTimeout(startSequence, HERO_INTRO_FALLBACK_MS);
    timersRef.current.push(fallbackTimer);

    window.addEventListener(HERO_INTRO_START_EVENT, startSequence);

    return () => {
      window.removeEventListener(HERO_INTRO_START_EVENT, startSequence);
      clearTimers();
    };
  }, [prefersReducedMotion, schedule]);

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
      <div className="relative w-full">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[50%] -z-10 h-[20rem] w-[min(96vw,52rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(9,9,15,0.94)_0%,rgba(9,9,15,0.84)_28%,rgba(9,9,15,0.56)_50%,rgba(9,9,15,0.18)_72%,rgba(9,9,15,0)_88%)] blur-[18px] sm:h-[24rem] sm:w-[min(90vw,58rem)] lg:h-[28rem] lg:w-[min(84vw,62rem)]"
        />

        <div className="flex flex-col items-center">
          <h1 className="max-w-3xl font-display text-5xl font-extrabold leading-[0.9] tracking-[-0.06em] text-nebula-silver sm:text-6xl lg:text-7xl">
            {headingLeadingText}
            <span className="text-nebula-lilac">{headingAccentText}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white sm:text-lg">
            {prefersReducedMotion ? (
              subheadingText
            ) : (
              <SplitText
                text={subheadingText}
                active={subheadingActive}
                hideUntilStart
                delay={5}
                duration={0.42}
                className="text-white"
                segmentClassName="text-white"
                onComplete={handleSubheadingComplete}
              />
            )}
          </p>
        </div>
      </div>

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
        <div className="hero-scroll-cue-motion flex flex-col items-center text-nebula-haze/85">
          <span className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] shadow-[0_0_36px_rgba(83,74,183,0.18)] backdrop-blur-md">
            <ChevronDown className="size-5" strokeWidth={1.6} />
          </span>
        </div>
      </motion.div>
    </div>
  );
}
