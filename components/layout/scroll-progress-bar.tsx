"use client";

import { useEffect, useState } from "react";

const SCROLL_RAIL_SMOOTHING = 0.12;
const SCROLL_RAIL_SETTLE_EPSILON = 0.001;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targetProgress = {
      current: 0,
    };
    const animatedProgress = {
      current: 0,
    };
    let frameId = 0;

    const syncTarget = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0,
      );
      const nextTarget =
        maxScroll === 0 ? 0 : clamp(window.scrollY / maxScroll, 0, 1);
      const nextScrollable = maxScroll > 8;

      targetProgress.current = nextTarget;
      setIsScrollable((current) =>
        current === nextScrollable ? current : nextScrollable,
      );

      if (mediaQuery.matches) {
        animatedProgress.current = nextTarget;
        setProgress(nextTarget);
      }
    };

    const animate = () => {
      const delta = targetProgress.current - animatedProgress.current;
      const nextProgress = mediaQuery.matches
        ? targetProgress.current
        : Math.abs(delta) < SCROLL_RAIL_SETTLE_EPSILON
          ? targetProgress.current
          : animatedProgress.current + delta * SCROLL_RAIL_SMOOTHING;

      animatedProgress.current = nextProgress;
      setProgress(nextProgress);
      frameId = window.requestAnimationFrame(animate);
    };

    const handlePreferenceChange = () => {
      syncTarget();
    };

    const resizeObserver = new ResizeObserver(() => {
      syncTarget();
    });

    resizeObserver.observe(document.documentElement);
    window.addEventListener("scroll", syncTarget, { passive: true });
    window.addEventListener("resize", syncTarget, { passive: true });
    mediaQuery.addEventListener("change", handlePreferenceChange);

    syncTarget();
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", syncTarget);
      window.removeEventListener("resize", syncTarget);
      mediaQuery.removeEventListener("change", handlePreferenceChange);
    };
  }, []);

  if (!isScrollable) {
    return null;
  }

  const clampedProgress = clamp(progress, 0, 1);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60]"
    >
      <div className="relative h-[2px] w-full">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-white/[0.07]" />
        <div className="absolute inset-x-0 top-0 h-[2px] overflow-hidden">
          <div
            className="h-full w-full origin-left rounded-r-full bg-[linear-gradient(90deg,rgba(181,177,227,0.56),rgba(83,74,183,0.92),rgba(232,232,240,1))]"
            style={{
              transform: `scaleX(${clampedProgress})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
