"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

function GridDistortionFallback() {
  return (
    <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(83,74,183,0.24),transparent_42%),linear-gradient(135deg,rgba(10,15,46,0.96),rgba(9,9,15,0.98))]" />
  );
}

const GridDistortion = dynamic(() => import("@/components/GridDistortion"), {
  ssr: false,
  loading: () => <GridDistortionFallback />,
});

type TestimonialsGridDistortionShellProps = {
  imageSrc: string;
  className?: string;
};

export function TestimonialsGridDistortionShell({
  imageSrc,
  className,
}: TestimonialsGridDistortionShellProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) {
      return;
    }

    const node = rootRef.current;

    if (!node) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const frameId = requestAnimationFrame(() => {
        setShouldRender(true);
      });

      return () => {
        cancelAnimationFrame(frameId);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "700px" },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [shouldRender]);

  return (
    <div
      ref={rootRef}
      className={cn("absolute inset-0", className)}
      aria-hidden="true"
    >
      {shouldRender ? (
        <GridDistortion imageSrc={imageSrc} className="h-full w-full" />
      ) : (
        <GridDistortionFallback />
      )}
    </div>
  );
}
