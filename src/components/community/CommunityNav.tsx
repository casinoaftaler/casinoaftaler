import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Gamepad2, Trophy, Video, Gift, ShoppingBag, Home, RotateCw, Target } from "lucide-react";
import "@/styles/community-micro.css";

const NAV_ITEMS = [
  { href: "/community", label: "Oversigt", icon: Home, exact: true },
  { href: "/community/slots", label: "Spillehal", icon: Gamepad2 },
  { href: "/bonus-hunt", label: "Bonus Hunt", icon: Target },
  { href: "/community/leaderboard", label: "Turneringer", icon: Trophy },
  { href: "/community/spin-the-reel", label: "Spin the Reel", icon: RotateCw },
  { href: "/highlights", label: "Highlights", icon: Video },
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
    <div>
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
      <div className="border-b border-border/30 bg-card/30">
        <div className="container">
          <p className="py-1.5 text-[11px] text-muted-foreground/70 leading-relaxed">
            Nogle links på denne side er affiliate-links. Det betyder, at vi kan modtage provision – uden ekstra omkostning for dig.{" "}
            <Link to="/forretningsmodel" className="underline hover:text-primary transition-colors">
              Sådan fungerer det
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
