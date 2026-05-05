"use client";

import { cva, type VariantProps } from "class-variance-authority";

import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from "@/components/animate-ui/primitives/buttons/button";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-[transform,background-color,color,border-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-nebula-void disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-nebula-silver text-nebula-void shadow-[0_16px_40px_rgba(232,232,240,0.16)] hover:bg-white",
        secondary:
          "border border-white/14 bg-white/[0.04] text-nebula-silver hover:border-white hover:bg-white hover:text-black",
        ghost: "text-nebula-silver/88 hover:bg-white/[0.05] hover:text-white",
        link: "rounded-none px-0 text-nebula-silver underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6 text-sm",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = Omit<ButtonPrimitiveProps, "className"> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
  };

function Button({
  className,
  variant,
  size,
  hoverScale,
  tapScale,
  ...props
}: ButtonProps) {
  const resolvedHoverScale =
    hoverScale ?? (variant === "link" ? 1 : variant === "secondary" ? 1.05 : 1.02);
  const resolvedTapScale = tapScale ?? (variant === "link" ? 1 : 0.98);

  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ variant, size, className }))}
      hoverScale={resolvedHoverScale}
      tapScale={resolvedTapScale}
      {...props}
    />
  );
}

export { Button, buttonVariants, type ButtonProps };
