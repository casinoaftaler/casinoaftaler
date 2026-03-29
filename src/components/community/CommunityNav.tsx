import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Gamepad2, Trophy, Video, Gift, ShoppingBag, Home, Target, Crown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import "@/styles/community-micro.css";

/** Check if there's an active bonus hunt session */
function useHasLiveHunt() {
  return useQuery({
    queryKey: ["community-nav-live-hunt"],
    queryFn: async () => {
      const { count } = await supabase
        .from("bonus_hunt_sessions")
        .select("id", { count: "exact", head: true })
        .eq("status", "active");
      return (count ?? 0) > 0;
    },
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
}

const NAV_ITEMS = [
  { href: "/community", label: "Oversigt", icon: Home, exact: true },
  { href: "/community/slots", label: "Spillehal", icon: Gamepad2 },
  { href: "/bonus-hunt", label: "Bonus Hunt", icon: Target, liveKey: true },
  { href: "/highlights", label: "Highlights", icon: Video },
  { href: "/community/turneringer", label: "Turneringer", icon: Trophy },
  { href: "/community/hall-of-fame", label: "Hall of Fame", icon: Crown },
  { href: "/community/rewards", label: "Rewards", icon: Gift },
  { href: "/butik", label: "Butik", icon: ShoppingBag },
];

export function CommunityNav() {
  const location = useLocation();
  const { data: hasLiveHunt } = useHasLiveHunt();

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
            const showLive = item.liveKey && hasLiveHunt;
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
                {showLive && (
                  <span className="relative flex h-2 w-2 ml-0.5">
                    <span className="absolute inset-0 rounded-full animate-ping opacity-60 bg-green-400" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
