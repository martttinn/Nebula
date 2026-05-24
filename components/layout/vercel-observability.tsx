"use client";

import { useEffect, useState } from "react";

import { scheduleBrowserIdleTask } from "@/lib/browser-idle";

const OBSERVABILITY_IDLE_BOOT_DELAY_MS = 1200;

type ObservabilityComponents = {
  Analytics: typeof import("@vercel/analytics/next").Analytics;
  SpeedInsights: typeof import("@vercel/speed-insights/next").SpeedInsights;
};

export function VercelObservability() {
  const [components, setComponents] = useState<ObservabilityComponents | null>(null);

  useEffect(() => {
    if (components) {
      return;
    }

    let cancelled = false;
    const cancelIdleTask = scheduleBrowserIdleTask(() => {
      Promise.all([
        import("@vercel/analytics/next"),
        import("@vercel/speed-insights/next"),
      ]).then(([analyticsModule, speedInsightsModule]) => {
        if (!cancelled) {
          setComponents({
            Analytics: analyticsModule.Analytics,
            SpeedInsights: speedInsightsModule.SpeedInsights,
          });
        }
      });
    }, {
      delayMs: OBSERVABILITY_IDLE_BOOT_DELAY_MS,
      timeoutMs: 1600,
    });

    return () => {
      cancelled = true;
      cancelIdleTask();
    };
  }, [components]);

  if (!components) {
    return null;
  }

  const {
    Analytics,
    SpeedInsights,
  } = components;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
