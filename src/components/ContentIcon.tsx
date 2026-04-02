import { MENU_ICON_MAP } from "@/components/header/menuIconMap";

/**
 * PascalCase → kebab-case converter for Lucide icon names.
 * e.g. "ShieldCheck" → "shield-check", "TrendingUp" → "trending-up"
 */
function toKebab(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

interface ContentIconProps {
  /** PascalCase Lucide name, e.g. "ShieldCheck", "Trophy", "Zap" */
  icon: string;
  className?: string;
  alt?: string;
}

/**
 * Drop-in replacement for Lucide icons in content pages.
 * Renders the 3D WebP asset from MENU_ICON_MAP when available,
 * otherwise returns null (caller can provide Lucide fallback).
 *
 * Usage:
 *   <ContentIcon icon="Zap" className="h-6 w-6" />
 */
export function ContentIcon({ icon, className = "h-5 w-5", alt = "" }: ContentIconProps) {
  const kebab = toKebab(icon);
  const src = MENU_ICON_MAP[kebab];
  if (!src) return null;
  return <img src={src} alt={alt} className={className} loading="lazy" />;
}

/**
 * Helper: check if a PascalCase icon name has a 3D WebP mapping.
 */
export function hasContentIcon(icon: string): boolean {
  return !!MENU_ICON_MAP[toKebab(icon)];
}
