"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { NebulaLogoAnimated } from "@/components/ui/nebula-logo-animated";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) {
      return;
    }

    if (isLoading) {
      lenis.stop();
      lenis.scrollTo(0, { immediate: true, force: true });
      return;
    }

    lenis.start();

    return () => {
      lenis.start();
    };
  }, [isLoading, lenis]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousHtmlTouchAction = html.style.touchAction;
    const previousHtmlOverscrollBehavior = html.style.overscrollBehavior;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyTouchAction = body.style.touchAction;
    const previousBodyOverscrollBehavior = body.style.overscrollBehavior;

    const preventDefault = (event: Event) => {
      event.preventDefault();
    };

    const preventScrollKeys = (event: KeyboardEvent) => {
      const blockedKeys = new Set([
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        "Space",
      ]);

      if (blockedKeys.has(event.code)) {
        event.preventDefault();
      }
    };

    const lockScroll = () => {
      html.style.overflow = "hidden";
      html.style.touchAction = "none";
      html.style.overscrollBehavior = "none";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
      body.style.overscrollBehavior = "none";
      document.addEventListener("wheel", preventDefault, {
        passive: false,
        capture: true,
      });
      document.addEventListener("touchmove", preventDefault, {
        passive: false,
        capture: true,
      });
      window.addEventListener("keydown", preventScrollKeys, {
        passive: false,
        capture: true,
      });
    };

    const unlockScroll = () => {
      html.style.overflow = previousHtmlOverflow;
      html.style.touchAction = previousHtmlTouchAction;
      html.style.overscrollBehavior = previousHtmlOverscrollBehavior;
      body.style.overflow = previousBodyOverflow;
      body.style.touchAction = previousBodyTouchAction;
      body.style.overscrollBehavior = previousBodyOverscrollBehavior;
      document.removeEventListener("wheel", preventDefault);
      document.removeEventListener("touchmove", preventDefault);
      window.removeEventListener("keydown", preventScrollKeys);
    };

    lockScroll();

    let heroReady = false;
    let minTimePassed = false;

    const duration = 1500;
    const interval = 20;
    const steps = duration / interval;
    const increment = 95 / steps;

    const timer = window.setInterval(() => {
      setProgress((previous) => {
        const next = previous + increment;
        return next >= 95 ? 95 : next;
      });
    }, interval);

    const finish = () => {
      window.clearInterval(timer);
      setProgress(100);

      window.setTimeout(() => {
        setIsLoading(false);
        unlockScroll();

        window.setTimeout(() => {
          window.dispatchEvent(new CustomEvent("hero-intro-start"));
        }, 260);
      }, 400);
    };

    const tryToFinish = () => {
      if (minTimePassed && (heroReady || document.readyState === "complete")) {
        finish();
      }
    };

    const onHeroReady = () => {
      heroReady = true;
      tryToFinish();
    };

    window.addEventListener("hero-grid-ready", onHeroReady);

    const minTimer = window.setTimeout(() => {
      minTimePassed = true;
      tryToFinish();
    }, duration);

    const safetyTimeout = window.setTimeout(() => {
      minTimePassed = true;
      heroReady = true;
      tryToFinish();
    }, 4000);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(minTimer);
      window.clearTimeout(safetyTimeout);
      window.removeEventListener("hero-grid-ready", onHeroReady);
      unlockScroll();
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex touch-none flex-col items-center justify-center bg-nebula-void pointer-events-auto"
        >
          <div className="relative mb-10">
            <div
              className="absolute inset-0 -z-10 scale-150"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(123,116,212,0.18) 0%, transparent 70%)",
                filter: "blur(24px)",
              }}
            />

            <NebulaLogoAnimated size={88} fadeDuration={0.9} glossyDuration={3} />
          </div>

          <div className="relative h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="absolute top-0 left-0 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.02 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
