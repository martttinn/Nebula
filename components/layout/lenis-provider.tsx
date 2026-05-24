"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { scheduleBrowserIdleTask } from "@/lib/browser-idle";

const NAVBAR_ANCHOR_OFFSET = 96;
const LENIS_IDLE_BOOT_DELAY_MS = 900;

type LenisProviderProps = {
  children: ReactNode;
};

type LenisInstance = InstanceType<typeof import("lenis").default>;

export function LenisProvider({
  children,
}: LenisProviderProps) {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPreference = () => {
      setIsEnabled(!mediaQuery.matches);
    };

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    let cancelled = false;
    let frameId = 0;
    let lenis: LenisInstance | null = null;

    const cancelIdleTask = scheduleBrowserIdleTask(() => {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) {
          return;
        }

        lenis = new Lenis({
          anchors: {
            offset: NAVBAR_ANCHOR_OFFSET,
          },
          lerp: 0.085,
          smoothWheel: true,
          syncTouch: false,
        });

        const updateScroll = (time: number) => {
          lenis?.raf(time);
          frameId = window.requestAnimationFrame(updateScroll);
        };

        frameId = window.requestAnimationFrame(updateScroll);
      });
    }, {
      delayMs: LENIS_IDLE_BOOT_DELAY_MS,
      timeoutMs: 1400,
    });

    return () => {
      cancelled = true;
      cancelIdleTask();
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
      lenis?.destroy();
    };
  }, [isEnabled]);

  return <>{children}</>;
}
