import { MENU_ICON_MAP } from "@/components/header/menuIconMap";

interface MenuIconProps {
  iconName: string;
  alt?: string;
  className?: string;
}

/**
 * Renders a 3D WebP icon from MENU_ICON_MAP.
 * Returns null if no mapping exists for the given iconName.
 */
export function MenuIcon({ iconName, alt = "", className = "h-5 w-5 flex-shrink-0" }: MenuIconProps) {
  const src = MENU_ICON_MAP[iconName];
  if (!src) return null;
  return <img src={src} alt={alt} className={className} loading="lazy" />;
}
