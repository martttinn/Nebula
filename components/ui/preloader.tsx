"use client";

import { useEffect, useState } from "react";

import { NebulaLogoAnimated } from "@/components/ui/nebula-logo-animated";
import { cn } from "@/lib/utils";

const PRELOADER_MIN_DURATION_MS = 900;
const PRELOADER_EXIT_HOLD_MS = 220;
const PRELOADER_FADE_DURATION_MS = 450;
const PRELOADER_SAFETY_TIMEOUT_MS = 2500;
const HERO_INTRO_START_EVENT = "hero-intro-start";
const SCROLL_LOCKED_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  "Space",
]);

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progressStarted, setProgressStarted] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlCssText = html.style.cssText;
    const previousBodyCssText = body.style.cssText;
    let lockListenersController: AbortController | null = null;

    const preventDefault = (event: Event) => {
      event.preventDefault();
    };

    const preventScrollKeys = (event: KeyboardEvent) => {
      if (SCROLL_LOCKED_KEYS.has(event.code)) {
        event.preventDefault();
      }
    };

    const lockScroll = () => {
      lockListenersController?.abort();
      lockListenersController = new AbortController();
      const signal = lockListenersController.signal;

      html.style.cssText = `${previousHtmlCssText}; overflow: hidden; touch-action: none; overscroll-behavior: none;`;
      body.style.cssText = `${previousBodyCssText}; overflow: hidden; touch-action: none; overscroll-behavior: none;`;
      document.addEventListener("wheel", preventDefault, {
        passive: false,
        capture: true,
        signal,
      });
      document.addEventListener("touchmove", preventDefault, {
        passive: false,
        capture: true,
        signal,
      });
      window.addEventListener("keydown", preventScrollKeys, {
        passive: false,
        capture: true,
        signal,
      });
    };

    const unlockScroll = () => {
      lockListenersController?.abort();
      lockListenersController = null;
      html.style.cssText = previousHtmlCssText;
      body.style.cssText = previousBodyCssText;
    };

    lockScroll();

    let heroReady = false;
    let minTimePassed = false;
    let finished = false;
    const exitTimers: number[] = [];

    const finish = () => {
      if (finished) {
        return;
      }

      finished = true;
      setIsExiting(true);
      window.dispatchEvent(new CustomEvent(HERO_INTRO_START_EVENT));

      exitTimers.push(
        window.setTimeout(() => {
          setIsFadingOut(true);
        }, PRELOADER_EXIT_HOLD_MS),
      );

      exitTimers.push(
        window.setTimeout(() => {
          setIsLoading(false);
          unlockScroll();
        }, PRELOADER_EXIT_HOLD_MS + PRELOADER_FADE_DURATION_MS),
      );
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
    }, PRELOADER_MIN_DURATION_MS);

    const safetyTimeout = window.setTimeout(() => {
      minTimePassed = true;
      heroReady = true;
      tryToFinish();
    }, PRELOADER_SAFETY_TIMEOUT_MS);

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(safetyTimeout);
      exitTimers.forEach((timer) => {
        window.clearTimeout(timer);
      });
      window.removeEventListener("hero-grid-ready", onHeroReady);
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setProgressStarted(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex touch-none flex-col items-center justify-center bg-nebula-void pointer-events-auto transition-opacity duration-[450ms] ease-in-out",
        isFadingOut ? "opacity-0" : "opacity-100",
      )}
    >
      <div className="relative mb-10">
        <div
          className="absolute inset-0 -z-10 scale-150"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(123,116,212,0.18) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />

        <NebulaLogoAnimated size={88} fadeDuration={0.9} glossy={false} />
      </div>

      <div className="relative h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
        <div
          className="absolute top-0 left-0 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          style={{
            transitionDuration: isExiting
              ? "160ms"
              : `${PRELOADER_MIN_DURATION_MS}ms`,
            transitionProperty: "width",
            transitionTimingFunction: isExiting ? "ease-out" : "linear",
            width: isExiting ? "100%" : progressStarted ? "95%" : "0%",
          }}
        />
      </div>
    </div>
  );
}
