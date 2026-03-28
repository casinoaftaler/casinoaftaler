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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SIDEBAR_CATEGORIES, type SidebarCategory } from "./contentSidebarData";
import { SidebarCasinoRatings } from "./SidebarCasinoRatings";
import { useAntiFootprint } from "@/hooks/useAntiFootprint";

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
        {category.links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <li key={link.to}>
              <Link
                to={link.to}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between px-4 py-2.5 text-[14px] transition-colors border-t border-border/30",
                  isActive
                    ? "bg-primary/10 text-primary font-medium border-l-2 border-l-primary"
                    : "text-foreground/80 hover:bg-accent/10 hover:text-foreground border-l-2 border-l-transparent"
                )}
              >
                <span className="truncate">{link.label}</span>
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

  // Rotate category order per page for anti-footprint
  const rotatedCategories = rotate(SIDEBAR_CATEGORIES, SIDEBAR_CATEGORIES.length);

  // Detect which category the current page belongs to
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
