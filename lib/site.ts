const fallbackSiteUrl = "http://localhost:3000";

export const siteConfig = {
  name: "Nebula Studios",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl).replace(/\/$/, ""),
};

export function getAbsoluteUrl(pathname: string) {
  const normalizedPathname = pathname.startsWith("/") ? pathname : `/${pathname}`;

  return `${siteConfig.siteUrl}${normalizedPathname}`;
}
