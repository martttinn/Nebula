import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLockupProps = {
  href: string;
  label: string;
  brandText: string;
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  priority?: boolean;
};

export function BrandLockup({
  href,
  label,
  brandText,
  className,
  imageClassName,
  textClassName,
  priority = false,
}: BrandLockupProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "flex min-w-0 shrink-0 items-center gap-3 text-nebula-silver transition-opacity duration-200 hover:opacity-100",
        className,
      )}
    >
      <Image
        src="/logo/symbol/nebula-dark.svg"
        alt=""
        width={180}
        height={210}
        priority={priority}
        className={cn("h-8 w-auto shrink-0 sm:h-9", imageClassName)}
      />
      <span
        className={cn(
          "truncate font-display text-xl font-bold uppercase tracking-[-0.06em] text-nebula-silver sm:text-2xl",
          textClassName,
        )}
      >
        {brandText}
      </span>
    </Link>
  );
}
