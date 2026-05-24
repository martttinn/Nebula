"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { BrandLockup } from "@/components/layout/brand-lockup";
import { NavbarStaggeredMenu } from "@/components/layout/navbar-staggered-menu";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import {
  PUBLIC_NAV_CTAS,
  PUBLIC_NAVBAR_LINKS,
  type PublicNavLink,
} from "@/data/navigation";
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

const NAVBAR_CTA_BEAM_STYLE = {
  backgroundImage:
    "linear-gradient(to left, transparent 0%, #B5B1E3 22%, #7B74D4 50%, #534AB7 76%, transparent 100%)",
} satisfies CSSProperties;

export function Navbar({
  className,
  logoHref = "/",
  logoLabel = siteConfig.name,
  brandText = "Nebula",
  links = PUBLIC_NAVBAR_LINKS,
  ctas = PUBLIC_NAV_CTAS,
}: NavbarProps) {
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

      if (
        currentScrollY < lastScrollY ||
        currentScrollY < 50 ||
        isMobileMenuOpen
      ) {
        setIsVisible(true);
      } else if (
        currentScrollY > lastScrollY &&
        currentScrollY > 50 &&
        !isMobileMenuOpen
      ) {
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
    <header
      className={cn(
        "fixed inset-x-0 top-4 z-50 px-4 transition-transform duration-300 ease-in-out motion-reduce:transition-none sm:top-5 sm:px-6",
        isVisible ? "translate-y-0" : "-translate-y-40",
      )}
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
                    className="navbar-link rounded-full px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] sm:px-4"
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
                    <span className="motion-reduce:hidden">
                      <BorderBeam
                        size={40}
                        initialOffset={20}
                        colorFrom="#B5B1E3"
                        colorTo="#534AB7"
                        style={NAVBAR_CTA_BEAM_STYLE}
                      />
                    </span>
                  </Link>
                </Button>
              ))}
            </div>
          </nav>
        </div>

        <div className="relative xl:hidden">
          <div
            aria-hidden
            className="glass-pill pointer-events-none absolute inset-0"
          />
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
    </header>
  );
}
