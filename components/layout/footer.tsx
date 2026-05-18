import Link from "next/link";

import { FOOTER_LEGAL_LINKS, PUBLIC_NAV_CTAS, PUBLIC_NAV_LINKS } from "@/data/navigation";
import { siteConfig } from "@/lib/site";

import { BrandLockup } from "./brand-lockup";

const FOOTER_PRIMARY_LINKS = [...PUBLIC_NAV_LINKS, ...PUBLIC_NAV_CTAS];
const FOOTER_CLAIM =
  "Software a medida para empresas que necesitan una base técnica seria.";

function FooterNavItem({
  label,
  href,
  disabled = false,
}: {
  label: string;
  href: string;
  disabled?: boolean;
}) {
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className="inline-flex cursor-not-allowed text-sm leading-relaxed text-nebula-haze/46"
      >
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex w-fit text-sm leading-relaxed text-nebula-haze/82 transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:translate-x-1 hover:text-nebula-silver"
    >
      {label}
    </Link>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative -mt-px overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,#09090F_0%,#0A0B13_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(83,74,183,0.18),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(10,15,46,0.4),transparent_36%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-nebula-grid opacity-[0.04]"
        style={{ backgroundSize: "42px 42px" }}
      />

      <div className="section-shell relative py-14 sm:py-16 lg:py-18">
        <div className="grid gap-12 py-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] lg:gap-10">
          <div className="text-left">
            <BrandLockup
              href="/"
              label={siteConfig.name}
              brandText="Nebula"
              className="justify-start"
            />
            <p className="mt-6 max-w-[34rem] text-sm leading-[1.78] text-nebula-haze/76">
              {FOOTER_CLAIM}
            </p>
            <p className="mt-6 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-nebula-haze/46">
              © {currentYear} {siteConfig.name}. Todos los derechos reservados.
            </p>
          </div>

          <div className="text-left">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-nebula-silver/74">
              Navegación
            </p>
            <nav aria-label="Enlaces del pie" className="mt-5">
              <ul className="space-y-3">
                {FOOTER_PRIMARY_LINKS.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <FooterNavItem label={link.label} href={link.href} />
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="text-left">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-nebula-silver/74">
              Legal
            </p>
            <ul className="mt-5 space-y-3">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <FooterNavItem
                    label={link.label}
                    href={link.href}
                    disabled={link.disabled}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
