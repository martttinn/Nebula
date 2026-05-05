"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { NavbarStaggeredMenu } from "@/components/layout/navbar-staggered-menu";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type NavbarLink = {
  label: string;
  href: string;
};

type NavbarCta = NavbarLink;

export type NavbarProps = {
  className?: string;
  logoHref?: string;
  logoLabel?: string;
  brandText?: string;
  links?: NavbarLink[];
  ctas?: NavbarCta[];
};

const defaultLinks: NavbarLink[] = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Precios", href: "/#precios" },
  { label: "Nosotros", href: "/#sobre-nosotros" },
  { label: "Blog", href: "/#blog" },
];

const defaultCtas: NavbarCta[] = [
  { label: "Contactar", href: "/#contacto" },
];

function BrandLockup({
  href,
  label,
  brandText,
}: {
  href: string;
  label: string;
  brandText: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex min-w-0 shrink-0 items-center gap-3 text-nebula-silver transition-opacity duration-200 hover:opacity-100"
    >
      <Image
        src="/logo/symbol/nebula-dark.svg"
        alt=""
        width={180}
        height={210}
        priority
        className="h-8 w-auto shrink-0 sm:h-9"
      />
      <span className="truncate font-display text-xl font-bold uppercase tracking-[-0.06em] text-nebula-silver sm:text-2xl">
        {brandText}
      </span>
    </Link>
  );
}

export function Navbar({
  className,
  logoHref = "/",
  logoLabel = siteConfig.name,
  brandText = "Nebula",
  links = defaultLinks,
  ctas = defaultCtas,
}: NavbarProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);

  const handleMobileMenuOpenChange = useCallback((open: boolean) => {
    setIsMobileMenuOpen(open);
    if (open) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      if (currentScrollY < lastScrollY || currentScrollY < 50 || isMobileMenuOpen) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50 && !isMobileMenuOpen) {
        setIsVisible(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      className="fixed inset-x-0 top-4 z-50 px-4 sm:top-5 sm:px-6"
      initial={false}
      animate={{ y: isVisible ? 0 : -160 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.3, ease: "easeInOut" }
      }
    >
      <div className={cn("mx-auto w-full max-w-[74rem]", className)}>
        <div className="hidden xl:block">
          <nav
            aria-label="Principal"
            className="glass-pill flex w-full items-center gap-4 px-4 py-3 sm:px-5"
          >
            <BrandLockup
              href={logoHref}
              label={logoLabel}
              brandText={brandText}
            />

            <div className="min-w-0 flex-1 justify-center">
              <div className="-mx-1 mx-auto flex w-max max-w-full items-center gap-1 overflow-visible px-1 py-1">
                {links.map((link) => (
                  <Link
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    className="rounded-full px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-nebula-haze/82 transition-[background-color,color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:scale-[1.03] hover:bg-white/[0.08] hover:text-nebula-silver sm:px-4"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden shrink-0 items-center xl:flex">
              {ctas.map((cta) => (
                <Button
                  key={`${cta.href}-${cta.label}`}
                  asChild
                  size="sm"
                  variant="secondary"
                  hoverScale={1.05}
                  className="border-white/35 bg-transparent px-4 text-xs text-nebula-silver shadow-none hover:border-white hover:bg-white hover:text-black"
                >
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              ))}
            </div>
          </nav>
        </div>

        <div className="relative xl:hidden">
          <div aria-hidden className="glass-pill pointer-events-none absolute inset-0" />
          <nav
            aria-label="Principal"
            className="relative flex w-full items-center gap-4 px-4 py-3 sm:px-5"
          >
            <BrandLockup
              href={logoHref}
              label={logoLabel}
              brandText={brandText}
            />
            <NavbarStaggeredMenu
              links={links}
              ctas={ctas}
              onOpenChange={handleMobileMenuOpenChange}
            />
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
