"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const NAVBAR_ANCHOR_OFFSET = 96;

type LenisProviderProps = {
  children: ReactNode;
};

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

  if (!isEnabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        anchors: {
          offset: NAVBAR_ANCHOR_OFFSET,
        },
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
