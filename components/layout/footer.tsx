import Link from "next/link";
import type { SVGProps } from "react";
import { Mail, Phone } from "lucide-react";

import {
  FOOTER_LEGAL_LINKS,
  PUBLIC_NAV_CTAS,
  PUBLIC_NAV_LINKS,
  type PublicNavLink,
} from "@/data/navigation";
import { siteConfig } from "@/lib/site";

import { BrandLockup } from "./brand-lockup";

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.25" cy="6.75" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 8.98H3.74V20h3.2V8.98ZM5.34 4a1.86 1.86 0 1 0 0 3.72A1.86 1.86 0 0 0 5.34 4Zm14.92 9.66c0-3.14-1.68-4.6-3.92-4.6-1.8 0-2.61.99-3.06 1.69V8.98h-3.07c.04 1.03 0 11.02 0 11.02h3.2v-6.16c0-.33.02-.66.12-.9.26-.66.85-1.34 1.84-1.34 1.3 0 1.82 1 1.82 2.45V20h3.07v-6.34Z" />
    </svg>
  );
}

const FOOTER_NAV_GROUPS: readonly {
  title: string;
  links: readonly PublicNavLink[];
}[] = [
  {
    title: "Navegación",
    links: [...PUBLIC_NAV_LINKS.slice(0, 3), ...PUBLIC_NAV_CTAS],
  },
  {
    title: "Estudio",
    links: PUBLIC_NAV_LINKS.slice(3),
  },
  {
    title: "Legal",
    links: FOOTER_LEGAL_LINKS,
  },
] as const;
const FOOTER_CLAIM =
  "Software a medida para empresas de cualquier tamaño. Servicios de digitalizacion, automatizacion, consultoria e implantacion de IA.";
const FOOTER_CONTACT_LINKS = [
  {
    href: siteConfig.contactHref,
    label: siteConfig.contactEmail,
    ariaLabel: `Enviar email a ${siteConfig.contactEmail}`,
    icon: Mail,
  },
  {
    href: siteConfig.contactPhoneHref,
    label: siteConfig.contactPhone,
    ariaLabel: `Llamar a ${siteConfig.contactPhone}`,
    icon: Phone,
  },
] as const;
const FOOTER_SOCIAL_LINKS = [
  {
    href: siteConfig.social.instagram,
    label: "Instagram",
    icon: InstagramIcon,
    linkClassName:
      "hover:border-[#dc2743]/50 hover:bg-gradient-to-tr hover:from-[#f09433]/20 hover:via-[#dc2743]/20 hover:to-[#bc1888]/20 hover:shadow-[#dc2743]/20 focus-visible:border-[#dc2743]/50 focus-visible:bg-[#dc2743]/12",
    iconClassName: "group-hover/social:text-[#dc2743] group-focus-visible/social:text-[#dc2743]",
  },
  {
    href: siteConfig.social.linkedin,
    label: "LinkedIn",
    icon: LinkedinIcon,
    linkClassName:
      "hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/20 hover:shadow-[#0A66C2]/20 focus-visible:border-[#0A66C2]/50 focus-visible:bg-[#0A66C2]/20",
    iconClassName: "group-hover/social:text-[#0A66C2] group-focus-visible/social:text-[#0A66C2]",
  },
] as const;

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

      <div className="section-shell relative py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 py-2 md:grid-cols-2 lg:grid-cols-[minmax(18rem,1.35fr)_repeat(3,minmax(0,0.65fr))] lg:gap-14 xl:gap-20">
          <div className="max-w-[32rem] text-left">
            <BrandLockup
              href="/"
              label={siteConfig.name}
              brandText="Nebula"
              className="justify-start"
            />
            <p className="mt-6 max-w-[34rem] text-sm leading-[1.78] text-nebula-haze/76">
              {FOOTER_CLAIM}
            </p>
            <div className="mt-8 space-y-3">
              {FOOTER_CONTACT_LINKS.map(({ href, label, ariaLabel, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={ariaLabel}
                  className="group/contact flex w-fit items-center gap-4 rounded-full pr-3 text-sm font-medium text-nebula-haze/82 outline-none transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1 hover:text-nebula-silver focus-visible:text-nebula-silver focus-visible:ring-2 focus-visible:ring-nebula-lilac/35 focus-visible:ring-offset-4 focus-visible:ring-offset-[#09090F]"
                >
                  <span className="relative inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.03] text-nebula-lilac transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/contact:scale-105 group-hover/contact:border-nebula-lilac/45 group-hover/contact:bg-nebula-lilac/10 group-focus-visible/contact:scale-105 group-focus-visible/contact:border-nebula-lilac/45 group-focus-visible/contact:bg-nebula-lilac/10">
                    <Icon
                      className="relative size-4 transition-[color,transform] duration-500 group-hover/contact:-translate-y-px group-hover/contact:text-nebula-silver group-focus-visible/contact:-translate-y-px group-focus-visible/contact:text-nebula-silver"
                      aria-hidden="true"
                    />
                  </span>
                  <span>{label}</span>
                </a>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-3">
              {FOOTER_SOCIAL_LINKS.map(({ href, label, icon: Icon, linkClassName, iconClassName }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${label} de ${siteConfig.name}`}
                  className={`group/social relative flex size-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] text-nebula-haze/66 shadow-sm outline-none backdrop-blur-md transition-[border-color,background-color,box-shadow,color,transform] duration-300 hover:-translate-y-1 hover:text-nebula-silver hover:shadow-lg focus-visible:-translate-y-1 focus-visible:text-nebula-silver focus-visible:ring-2 focus-visible:ring-nebula-lilac/35 focus-visible:ring-offset-4 focus-visible:ring-offset-[#09090F] ${linkClassName}`}
                >
                  <Icon
                    className={`relative size-[1.125rem] transition-colors duration-300 ${iconClassName}`}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_NAV_GROUPS.map((group) => (
            <div key={group.title} className="text-left">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-nebula-silver/74">
                {group.title}
              </p>
              <nav aria-label={`Enlaces de ${group.title.toLowerCase()} del pie`} className="mt-5">
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <FooterNavItem
                        label={link.label}
                        href={link.href}
                        disabled={link.disabled}
                      />
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-6 text-sm text-nebula-haze/46 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p>© {currentYear} {siteConfig.name}. Todos los derechos reservados.</p>
            </div>

            <nav aria-label="Enlaces legales secundarios">
              <ul className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                {FOOTER_LEGAL_LINKS.map((link) => (
                  <li key={`bottom-${link.href}-${link.label}`}>
                    <FooterNavItem
                      label={link.label}
                      href={link.href}
                      disabled={link.disabled}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
