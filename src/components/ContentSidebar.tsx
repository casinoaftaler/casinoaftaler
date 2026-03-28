import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Crown,
  Sparkles,
  Gift,
  Dices,
  CreditCard,
  Gamepad2,
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
  const isActiveCategory = category.links.some(
    (link) => location.pathname === link.to || location.pathname.startsWith(link.to + "/")
  );
  const [isOpen, setIsOpen] = useState(isActiveCategory);
  const Icon = iconMap[category.iconName] || Crown;

  return (
    <div className="overflow-hidden rounded-lg border border-border/60">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left font-semibold text-sm transition-colors bg-primary/10 hover:bg-primary/15 text-foreground"
      >
        <Icon className="h-4 w-4 text-primary flex-shrink-0" />
        <span className="flex-1">{category.title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            !isOpen && "-rotate-90"
          )}
        />
      </button>
      {isOpen && (
        <div className="bg-card">
          {category.links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2 text-sm transition-colors border-t border-border/30",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground/80 hover:bg-accent/10 hover:text-foreground"
                )}
              >
                <span className="truncate">{link.label}</span>
                <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/60" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ContentSidebar() {
  return (
    <aside className="hidden xl:block w-[260px] flex-shrink-0">
      <div className="sticky top-24 space-y-3">
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
