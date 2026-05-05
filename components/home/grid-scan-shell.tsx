"use client";

import dynamic from "next/dynamic";

import { GridScanFallback } from "@/components/home/grid-scan-fallback";
import type { GridScanProps } from "@/components/home/grid-scan";

const GridScan = dynamic(
  () => import("@/components/home/grid-scan").then((module) => module.GridScan),
  {
    ssr: false,
    loading: () => <GridScanFallback />,
  },
);

export function GridScanShell(props: GridScanProps) {
  return <GridScan {...props} />;
}
