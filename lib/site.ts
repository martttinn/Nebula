const fallbackSiteUrl = "http://localhost:3000";
const contactEmail = "hola@somosnebula.com";
const contactPhone = "+34 622 028 550";
const contactPhoneHref = "tel:+34622028550";
const social = {
  instagram: "https://www.instagram.com/nebula_software_sudios/",
  linkedin: "https://www.linkedin.com/company/nebula-studios",
} as const;

export const siteConfig = {
  name: "Nebula Studios",
  contactEmail,
  contactHref: `mailto:${contactEmail}`,
  contactPhone,
  contactPhoneHref,
  social,
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl).replace(/\/$/, ""),
};

export function getAbsoluteUrl(pathname: string) {
  const normalizedPathname = pathname.startsWith("/") ? pathname : `/${pathname}`;

  return `${siteConfig.siteUrl}${normalizedPathname}`;
}
