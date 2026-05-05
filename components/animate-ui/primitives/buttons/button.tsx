"use client";

import { Slot } from "@radix-ui/react-slot";
import { motion, type HTMLMotionProps } from "motion/react";

const MotionSlot = motion.create(Slot);

type ButtonProps = Omit<HTMLMotionProps<"button">, "ref"> & {
  ref?: React.Ref<HTMLButtonElement>;
  asChild?: boolean;
  hoverScale?: number;
  tapScale?: number;
};

function Button({
  hoverScale = 1.05,
  tapScale = 0.95,
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? MotionSlot : motion.button;

  return (
    <Component
      whileTap={{ scale: tapScale }}
      whileHover={{ scale: hoverScale }}
      {...props}
    />
  );
}

export { Button, type ButtonProps };
