"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";

export function useSectionScrollProgress(ref: RefObject<HTMLDivElement | null>) {
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
