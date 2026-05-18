"use client";

import dynamic from "next/dynamic";

import { DotFieldFallback } from "./dot-field-fallback";
import type { HeroDotFieldProps } from "./dot-field";

const HeroDotField = dynamic(
  () => import("./dot-field").then((module) => module.HeroDotField),
  {
    ssr: false,
    loading: () => <DotFieldFallback />,
  },
);

export function DotFieldShell(props: HeroDotFieldProps) {
  return <HeroDotField {...props} />;
}
