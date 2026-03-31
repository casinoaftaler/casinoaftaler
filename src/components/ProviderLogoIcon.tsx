/**
 * Shared component for rendering provider logos from /src/assets/providers/.
 * Use this everywhere a spiludvikler is listed to ensure visual consistency
 * with the mega-menu.
 */
import { MENU_ICON_MAP } from "@/components/header/menuIconMap";

const providerLogos = import.meta.glob<{ default: string }>(
  "/src/assets/providers/*.{webp,png,jpg}",
  { eager: true }
);

/** Resolve a provider slug (e.g. "netent") to its logo URL */
export function getProviderLogoUrl(slug: string): string | null {
  // Try common extensions
  for (const ext of ["webp", "png", "jpg"]) {
    const path = `/src/assets/providers/${slug}.${ext}`;
    if (providerLogos[path]?.default) return providerLogos[path].default;
  }
  return null;
}

interface ProviderLogoIconProps {
  /** Provider slug, e.g. "netent", "pragmatic-play" */
  slug: string;
  /** Alt text */
  alt: string;
  /** Extra className for the <img> */
  className?: string;
}

export function ProviderLogoIcon({ slug, alt, className = "h-5 w-auto max-w-[80px] object-contain flex-shrink-0" }: ProviderLogoIconProps) {
  const src = getProviderLogoUrl(slug);
  if (!src) {
    // Fallback to gamepad menu icon
    const fallback = MENU_ICON_MAP["gamepad-2"];
    return fallback ? <img src={fallback} alt={alt} className="h-5 w-5 flex-shrink-0" loading="lazy" /> : null;
  }
  return <img src={src} alt={alt} className={className} loading="lazy" />;
}
