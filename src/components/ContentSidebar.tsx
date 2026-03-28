import { Link, useLocation } from "react-router-dom";
import {
  ChevronRight,
  ChevronDown,
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

/** Max links shown per category when collapsed (not active) */
const MAX_LINKS_COLLAPSED = 6;

/** Navigation heading variants for anti-footprint */
const NAV_HEADINGS = [
  "Navigation",
  "Indhold",
  "Udforsk",
  "Kategorier",
  "Guides",
];

/** "Se alle" link text variants */
const SEE_ALL_VARIANTS = [
  "Se alle",
  "Vis alle",
  "Mere",
  "Udforsk alle",
  "Se flere",
];

function CategorySection({
  category,
  isExpanded,
  shuffledLinks,
  seeAllText,
}: {
  category: SidebarCategory;
  isExpanded: boolean;
  shuffledLinks: typeof category.links;
  seeAllText: string;
}) {
  const location = useLocation();
  const Icon = iconMap[category.iconName] || Crown;

  const visibleLinks = isExpanded
    ? shuffledLinks
    : shuffledLinks.slice(0, MAX_LINKS_COLLAPSED);

  const hasMore = !isExpanded && shuffledLinks.length > MAX_LINKS_COLLAPSED;

  return (
    <li className="overflow-hidden rounded-lg border border-border/60 transition-shadow hover:shadow-sm">
      <div
        className={cn(
          "flex w-full items-center gap-2.5 px-4 py-3 font-semibold text-[15px] transition-colors",
          isExpanded
            ? "bg-gradient-to-r from-primary/25 to-primary/10 text-foreground"
            : "bg-primary/10 text-foreground"
        )}
      >
        <span
          className={cn(
            "inline-flex items-center justify-center h-7 w-7 rounded-md flex-shrink-0",
            isExpanded
              ? "bg-primary/20 text-primary"
              : "bg-primary/10 text-primary"
          )}
        >
          <Icon className="h-4.5 w-4.5" />
        </span>
        <span className="flex-1">{category.title}</span>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-primary/60 flex-shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground/40 flex-shrink-0" />
        )}
      </div>

      {/* Show links only when expanded OR show limited links when collapsed */}
      {isExpanded ? (
        <ul className="bg-card">
          {visibleLinks.map((link) => {
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
      ) : (
        <ul className="bg-card">
          {visibleLinks.map((link) => {
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
          {hasMore && category.hubTo && (
            <li>
              <Link
                to={category.hubTo}
                className="flex items-center justify-center gap-1 px-4 py-2 text-[13px] text-primary hover:text-primary/80 border-t border-border/30 font-medium"
              >
                {seeAllText} <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          )}
        </ul>
      )}
    </li>
  );
}

export function ContentSidebar() {
  const { pathname } = useLocation();
  const { rotate, shuffle, pick } = useAntiFootprint();

  // Anti-footprint: rotate category order
  const rotatedCategories = rotate(SIDEBAR_CATEGORIES, SIDEBAR_CATEGORIES.length);

  // Detect active category
  const activeCategoryTitle = SIDEBAR_CATEGORIES.find((cat) =>
    cat.links.some((link) => pathname === link.to)
  )?.title;

  // Anti-footprint: pick varied heading and "see all" text
  const navHeading = pick(NAV_HEADINGS);
  const seeAllText = pick(SEE_ALL_VARIANTS);

  return (
    <nav
      aria-label="Sidenavigation"
      className="hidden xl:block w-[300px] flex-shrink-0"
    >
      <div className="space-y-4">
        <SidebarCasinoRatings />
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
          {navHeading}
        </h3>
        <ul className="space-y-3">
          {rotatedCategories.map((category) => {
            const isExpanded = category.title === activeCategoryTitle;
            // Anti-footprint: shuffle links within each category per page
            const shuffledLinks = shuffle(category.links);
            return (
              <CategorySection
                key={category.title}
                category={category}
                isExpanded={isExpanded}
                shuffledLinks={shuffledLinks}
                seeAllText={seeAllText}
              />
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
