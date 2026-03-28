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

const iconMap: Record<string, React.ElementType> = {
  crown: Crown,
  sparkles: Sparkles,
  gift: Gift,
  dices: Dices,
  creditCard: CreditCard,
  gamepad2: Gamepad2,
};

function CategorySection({ category }: { category: SidebarCategory }) {
  const location = useLocation();
  const Icon = iconMap[category.iconName] || Crown;

  return (
    <div className="overflow-hidden rounded-lg border border-border/60">
      <div className="flex w-full items-center gap-2.5 px-4 py-3 font-semibold text-[15px] bg-primary/10 text-foreground">
        <Icon className="h-5 w-5 text-primary flex-shrink-0" />
        <span>{category.title}</span>
      </div>
      <div className="bg-card">
        {category.links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 text-[14px] transition-colors border-t border-border/30",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground/80 hover:bg-accent/10 hover:text-foreground"
              )}
            >
              <span className="truncate">{link.label}</span>
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground/60" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function ContentSidebar() {
  return (
    <aside className="hidden xl:block w-[280px] flex-shrink-0">
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
          Navigation
        </h3>
        {SIDEBAR_CATEGORIES.map((category) => (
          <CategorySection key={category.title} category={category} />
        ))}
      </div>
    </aside>
  );
}
