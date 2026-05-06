"use client";

import dynamic from "next/dynamic";

import { GridScanFallback } from "./grid-scan-fallback";
import type { GridScanProps } from "./grid-scan";

const GridScan = dynamic(
  () => import("./grid-scan").then((module) => module.GridScan),
  {
    ssr: false,
    loading: () => <GridScanFallback />,
  },
);

export function GridScanShell(props: GridScanProps) {
  return <GridScan {...props} />;
}
