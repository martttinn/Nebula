"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { BrandLockup } from "@/components/layout/brand-lockup";
import { NavbarStaggeredMenu } from "@/components/layout/navbar-staggered-menu";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import { PUBLIC_NAV_CTAS, PUBLIC_NAVBAR_LINKS, type PublicNavLink } from "@/data/navigation";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export type NavbarProps = {
  className?: string;
  logoHref?: string;
  logoLabel?: string;
  brandText?: string;
  links?: readonly PublicNavLink[];
  ctas?: readonly PublicNavLink[];
};

export function Navbar({
  className,
  logoHref = "/",
  logoLabel = siteConfig.name,
  brandText = "Nebula",
  links = PUBLIC_NAVBAR_LINKS,
  ctas = PUBLIC_NAV_CTAS,
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
              priority
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
                  className="relative isolate overflow-hidden border-white/35 bg-transparent px-4 text-xs text-nebula-silver shadow-none hover:border-white hover:bg-white hover:text-black"
                >
                  <Link href={cta.href}>
                    <span className="relative z-10">{cta.label}</span>
                    {!prefersReducedMotion ? (
                      <BorderBeam size={40} initialOffset={20} />
                    ) : null}
                  </Link>
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
              priority
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
