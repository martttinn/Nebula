"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

const SCROLL_PROGRESS_EPSILON = 0.001;

export function useSectionScrollProgress(
  ref: RefObject<HTMLDivElement | null>,
  enabled = true,
) {
  const [progress, setProgress] = useState(0);
  const metricsRef = useRef({
    sectionTop: 0,
    scrollableDistance: 0,
  });

  const updateFromCachedMetrics = useCallback(() => {
    const { sectionTop, scrollableDistance } = metricsRef.current;

    if (scrollableDistance <= 0) {
      setProgress((currentProgress) =>
        currentProgress === 0 ? currentProgress : 0,
      );
      return;
    }

    const rawProgress = (window.scrollY - sectionTop) / scrollableDistance;
    const nextProgress = Math.max(0, Math.min(1, rawProgress));

    setProgress((currentProgress) =>
      Math.abs(currentProgress - nextProgress) < SCROLL_PROGRESS_EPSILON
        ? currentProgress
        : nextProgress,
    );
  }, []);

  const measure = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollableDistance = rect.height - viewportHeight;

    metricsRef.current = {
      sectionTop: window.scrollY + rect.top,
      scrollableDistance,
    };
    updateFromCachedMetrics();
  }, [ref, updateFromCachedMetrics]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let frameId = 0;
    const node = ref.current;

    const scheduleProgressUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateFromCachedMetrics);
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(measure);
    };

    const resizeObserver = new ResizeObserver(scheduleMeasure);

    if (node) {
      resizeObserver.observe(node);
    }

    window.addEventListener("scroll", scheduleProgressUpdate, { passive: true });
    window.addEventListener("resize", scheduleMeasure, { passive: true });
    measure();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleProgressUpdate);
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [enabled, measure, ref, updateFromCachedMetrics]);

  return progress;
}
