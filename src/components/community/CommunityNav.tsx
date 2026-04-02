import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MenuIcon } from "@/components/MenuIcon";
;
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
  { href: "/community", label: "Oversigt", iconName: "home", exact: true },
  { href: "/community/slots", label: "Spillehal", iconName: "gamepad-2" },
  { href: "/bonus-hunt", label: "Bonus Hunt", iconName: "target", liveKey: true },
  { href: "/community/turneringer", label: "Turneringer", iconName: "trophy" },
  { href: "/highlights", label: "Highlights", iconName: "tv" },
  { href: "/community/hall-of-fame", label: "Hall of Fame", iconName: "crown" },
  { href: "/community/rewards", label: "Rewards", iconName: "gift" },
  { href: "/butik", label: "Butik", iconName: "shopping-bag" },
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
      <div className="container flex justify-center">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href, item.exact);
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
                <MenuIcon iconName={item.iconName} className="h-4 w-4" />
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
