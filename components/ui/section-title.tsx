import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SectionTitleProps = Omit<ComponentPropsWithoutRef<"h2">, "children"> & {
  leadingText?: string;
  accentText: string;
  trailingText?: string;
  accentClassName?: string;
};

export function SectionTitle({
  leadingText,
  accentText,
  trailingText,
  className,
  accentClassName,
  ...props
}: SectionTitleProps) {
  return (
    <h2 className={cn("text-nebula-silver", className)} {...props}>
      {leadingText ? <>{leadingText} </> : null}
      <span className={cn("text-nebula-lilac", accentClassName)}>
        {accentText}
      </span>
      {trailingText ? <> {trailingText}</> : null}
    </h2>
  );
}
