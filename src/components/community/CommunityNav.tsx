import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Gamepad2, Trophy, Video, Gift, ShoppingBag, Home, RotateCw, Target, Crown } from "lucide-react";
import "@/styles/community-micro.css";

const NAV_ITEMS = [
  { href: "/community", label: "Oversigt", icon: Home, exact: true },
  { href: "/community/slots", label: "Spillehal", icon: Gamepad2 },
  { href: "/bonus-hunt", label: "Bonus Hunt", icon: Target },
  { href: "/highlights", label: "Highlights", icon: Video },
  { href: "/community/turneringer", label: "Turneringer", icon: Trophy },
  { href: "/community/hall-of-fame", label: "Hall of Fame", icon: Crown },
  { href: "/community/rewards", label: "Rewards", icon: Gift },
  { href: "/butik", label: "Butik", icon: ShoppingBag },
];

export function CommunityNav() {
  const location = useLocation();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return location.pathname === href;
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-20">
      <div className="container">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1 -mx-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                  active
                    ? "bg-primary/10 text-primary community-nav-tab community-nav-tab-active"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 community-nav-tab"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
