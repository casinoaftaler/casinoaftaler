import { Link, useLocation } from "react-router-dom";
import {
  ChevronRight,
  Crown,
  Sparkles,
  Gift,
  Dices,
  CreditCard,
  Gamepad2,
  Tv,
  Star,
  icons,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SIDEBAR_CATEGORIES, type SidebarCategory } from "./contentSidebarData";
import { SidebarCasinoRatings } from "./SidebarCasinoRatings";
import { useAntiFootprint } from "@/hooks/useAntiFootprint";

/* ─── Eager-load logo assets for sidebar ─── */
const providerLogos = import.meta.glob<{ default: string }>(
  "/src/assets/providers/*.{webp,png,jpg}",
  { eager: true }
);
const casinoLogos = import.meta.glob<{ default: string }>(
  "/src/assets/casino-logos/*.{webp,png,jpg}",
  { eager: true }
);
const reviewLogos = import.meta.glob<{ default: string }>(
  "/src/assets/reviews/*.{webp,png,jpg}",
  { eager: true }
);

function resolveLogoUrl(path?: string): string | null {
  if (!path) return null;
  const all = { ...providerLogos, ...casinoLogos, ...reviewLogos };
  return all[path]?.default ?? null;
}

const iconMap: Record<string, React.ElementType> = {
  crown: Crown,
  sparkles: Sparkles,
  gift: Gift,
  dices: Dices,
  creditCard: CreditCard,
  gamepad2: Gamepad2,
  tv: Tv,
  star: Star,
};

/* ─── kebab-case → PascalCase Lucide lookup ─── */
function getLucideIcon(name?: string): React.ElementType | null {
  if (!name) return null;
  const pascal = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
  return (icons as Record<string, React.ElementType>)[pascal] ?? null;
}

/* ─── Icon accent colors (matching mega menu) ─── */
const ICON_COLORS = [
  "bg-purple-500/15 text-purple-400",
  "bg-blue-500/15 text-blue-400",
  "bg-emerald-500/15 text-emerald-400",
  "bg-amber-500/15 text-amber-400",
  "bg-rose-500/15 text-rose-400",
];

function CategorySection({
  category,
  isActiveCategory,
}: {
  category: SidebarCategory;
  isActiveCategory: boolean;
}) {
  const location = useLocation();
  const Icon = iconMap[category.iconName] || Crown;

  return (
    <li className="overflow-hidden rounded-lg border border-border/60 transition-shadow hover:shadow-sm">
      <div
        className={cn(
          "flex w-full items-center gap-2.5 px-4 py-3 font-semibold text-[15px] transition-colors",
          isActiveCategory
            ? "bg-gradient-to-r from-primary/25 to-primary/10 text-foreground"
            : "bg-primary/10 text-foreground"
        )}
      >
        <span
          className={cn(
            "inline-flex items-center justify-center h-7 w-7 rounded-md flex-shrink-0",
            isActiveCategory
              ? "bg-primary/20 text-primary"
              : "bg-primary/10 text-primary"
          )}
        >
          <Icon className="h-4.5 w-4.5" />
        </span>
        <span>{category.title}</span>
      </div>
      <ul className="bg-card">
        {category.links.map((link, idx) => {
          const isActive = location.pathname === link.to;
          const LinkIcon = getLucideIcon(link.iconName);
          const iconColor = ICON_COLORS[idx % ICON_COLORS.length];
          const logoSrc = resolveLogoUrl(link.logoUrl);

          return (
            <li key={link.to}>
              <Link
                to={link.to}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-2.5 text-[14px] transition-colors border-t border-border/30",
                  isActive
                    ? "bg-primary/10 text-primary font-medium border-l-2 border-l-primary"
                    : "text-foreground/80 hover:bg-accent/10 hover:text-foreground border-l-2 border-l-transparent"
                )}
              >
                {logoSrc ? (
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-background border border-border/40 flex-shrink-0 overflow-hidden p-0.5">
                    <img
                      src={logoSrc}
                      alt=""
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </span>
                ) : LinkIcon ? (
                  <span
                    className={cn(
                      "inline-flex items-center justify-center h-5 w-5 rounded flex-shrink-0",
                      isActive ? "bg-primary/15 text-primary" : iconColor
                    )}
                  >
                    <LinkIcon className="h-3 w-3" />
                  </span>
                ) : null}
                <span className="truncate flex-1">{link.label}</span>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 flex-shrink-0",
                    isActive ? "text-primary/60" : "text-muted-foreground/60"
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

export function ContentSidebar() {
  const { pathname } = useLocation();
  const { rotate } = useAntiFootprint();

  // Anti-footprint: only rotate category order (harmless, varies section position)
  const rotatedCategories = rotate(SIDEBAR_CATEGORIES, SIDEBAR_CATEGORIES.length);

  const activeCategoryTitle = SIDEBAR_CATEGORIES.find((cat) =>
    cat.links.some((link) => pathname === link.to)
  )?.title;

  return (
    <nav
      aria-label="Sidenavigation"
      className="hidden xl:block w-[300px] flex-shrink-0"
    >
      <div className="space-y-4">
        <SidebarCasinoRatings />
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
          Navigation
        </h3>
        <ul className="space-y-3">
          {rotatedCategories.map((category) => (
            <CategorySection
              key={category.title}
              category={category}
              isActiveCategory={category.title === activeCategoryTitle}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}
