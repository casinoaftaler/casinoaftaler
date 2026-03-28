import { Link } from "react-router-dom";
import { ChevronRight, Star, Monitor, Trophy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const RANK_STYLES: Record<number, string> = {
  0: "bg-amber-500/20 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/30",
  1: "bg-slate-300/20 text-slate-600 dark:text-slate-300 ring-1 ring-slate-400/30",
  2: "bg-orange-600/20 text-orange-700 dark:text-orange-400 ring-1 ring-orange-500/30",
};

export function SidebarCasinoRatings() {
  const { data: casinos } = useQuery({
    queryKey: ["sidebar-casinos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("casinos_public")
        .select("name, slug, rating, logo_url")
        .eq("is_active", true)
        .order("rating", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });

  if (!casinos?.length) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-border/60 shadow-sm">
      <div className="flex w-full items-center gap-2.5 px-4 py-3 font-semibold text-[15px] bg-gradient-to-r from-primary/20 to-primary/10 text-foreground">
        <span className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-primary/15 flex-shrink-0">
          <Trophy className="h-4.5 w-4.5 text-primary" />
        </span>
        <span>Online casinoer</span>
      </div>
      <ul className="bg-card">
        {casinos.map((casino, index) => {
          const ratingPercent = ((casino.rating ?? 0) / 10) * 100;
          const isTop3 = index < 3;

          return (
            <li key={casino.slug}>
              <Link
                to={`/casino-anmeldelser/${casino.slug}`}
                className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] transition-colors border-t border-border/30 text-foreground/80 hover:bg-accent/10 hover:text-foreground group"
              >
                {/* Rank number */}
                <span
                  className={cn(
                    "inline-flex items-center justify-center h-5.5 w-5.5 rounded text-[11px] font-bold flex-shrink-0",
                    isTop3
                      ? RANK_STYLES[index]
                      : "bg-muted/50 text-muted-foreground"
                  )}
                >
                  {index + 1}
                </span>

                {/* Logo */}
                {casino.logo_url ? (
                  <img
                    src={casino.logo_url}
                    alt=""
                    className="h-5 w-5 rounded-sm object-contain flex-shrink-0"
                    loading="lazy"
                    width={20}
                    height={20}
                  />
                ) : (
                  <Monitor className="h-5 w-5 text-muted-foreground/40 flex-shrink-0" />
                )}

                {/* Name + progress bar */}
                <div className="flex-1 min-w-0">
                  <span className="truncate block font-medium text-[13px] leading-tight">
                    {casino.name}
                  </span>
                  <Progress
                    value={ratingPercent}
                    className="h-1 mt-0.5 bg-muted/40"
                  />
                </div>

                {/* Rating badge */}
                <span className="inline-flex items-center gap-0.5 text-xs font-bold text-foreground min-w-[38px] justify-end flex-shrink-0">
                  {casino.rating?.toFixed(1)}
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </span>
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            to="/top-10-casino-online"
            className="flex items-center justify-center gap-1 px-4 py-2.5 text-[13px] text-primary hover:text-primary/80 border-t border-border/30 font-medium"
          >
            Mere <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
