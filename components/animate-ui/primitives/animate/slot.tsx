"use client";

import * as React from "react";
import { Slot as RadixSlot } from "@radix-ui/react-slot";

type AnyProps = Record<string, unknown>;

type DOMMotionProps<T extends HTMLElement = HTMLElement> = React.HTMLAttributes<T> & {
  ref?: React.Ref<T>;
};

type WithAsChild<Base extends object> =
  | (Base & { asChild: true; children: React.ReactElement })
  | (Base & { asChild?: false | undefined });

type SlotProps<T extends HTMLElement = HTMLElement> = {
  children: React.ReactElement;
} & DOMMotionProps<T>;

const Slot = React.forwardRef<HTMLElement, SlotProps<HTMLElement>>(
  ({ children, ...props }, ref) => {
    return (
      <RadixSlot {...props} ref={ref}>
        {children}
      </RadixSlot>
    );
  },
);

Slot.displayName = "AnimateSlot";

export { Slot, type SlotProps, type WithAsChild, type DOMMotionProps, type AnyProps };
