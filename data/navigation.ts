export type PublicNavLink = {
  label: string;
  href: string;
  disabled?: boolean;
};

export const PUBLIC_NAV_LINKS = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Precios", href: "/#precios" },
  { label: "Nosotros", href: "/#sobre-nosotros" },
  { label: "Blog", href: "/#blog" },
] as const satisfies readonly PublicNavLink[];

export const PUBLIC_NAVBAR_LINKS = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Precios", href: "/#precios" },
  { label: "Nosotros", href: "/#sobre-nosotros" },
] as const satisfies readonly PublicNavLink[];

export const PUBLIC_NAV_CTAS = [
  { label: "Contactar", href: "/#contacto" },
] as const satisfies readonly PublicNavLink[];

export const FOOTER_LEGAL_LINKS = [
  { label: "Términos y condiciones", href: "/terminos-y-condiciones", disabled: true },
  { label: "Política de privacidad", href: "/politica-de-privacidad", disabled: true },
] as const satisfies readonly PublicNavLink[];
