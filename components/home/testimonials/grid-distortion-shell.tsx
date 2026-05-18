"use client";

import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";

const GridDistortion = dynamic(() => import("@/components/GridDistortion"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(83,74,183,0.24),transparent_42%),linear-gradient(135deg,rgba(10,15,46,0.96),rgba(9,9,15,0.98))]" />
  ),
});

type TestimonialsGridDistortionShellProps = {
  imageSrc: string;
  className?: string;
};

export function TestimonialsGridDistortionShell({
  imageSrc,
  className,
}: TestimonialsGridDistortionShellProps) {
  return (
    <div className={cn("absolute inset-0", className)} aria-hidden="true">
      <GridDistortion imageSrc={imageSrc} className="h-full w-full" />
    </div>
  );
}
