/**
 * SEO configuration constants.
 * 
 * In production, all canonical/og:url references use the primary domain.
 * Preview deployments on lovable.app will still use the production domain
 * for SEO consistency.
 */
export const SITE_URL = "https://casinoaftaler.dk";

/**
 * Returns the canonical URL for the current page.
 * Combines SITE_URL with the given pathname.
 */
export const getCanonicalUrl = (pathname: string): string => {
  // Ensure no double slashes and consistent trailing format
  const cleanPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  return `${SITE_URL}${cleanPath}`;
};
