import { Link } from "react-router-dom";
import { ChevronRight, Star, Monitor } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
    <div className="overflow-hidden rounded-lg border border-border/60">
      <div className="flex w-full items-center gap-2.5 px-4 py-3 font-semibold text-[15px] bg-primary/10 text-foreground">
        <Monitor className="h-5 w-5 text-primary flex-shrink-0" />
        <span>Online casinoer</span>
      </div>
      <div className="bg-card">
        {casinos.map((casino, index) => (
          <Link
            key={casino.slug}
            to={`/casino-anmeldelser/${casino.slug}`}
            className="flex items-center gap-3 px-4 py-2.5 text-[14px] transition-colors border-t border-border/30 text-foreground/80 hover:bg-accent/10 hover:text-foreground"
          >
            <span className="inline-flex items-center gap-1 bg-muted/60 rounded px-1.5 py-0.5 text-xs font-bold text-foreground min-w-[42px] justify-center">
              {casino.rating?.toFixed(1)}
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            </span>
            <span className="truncate font-medium flex-1">{casino.name}</span>
            {index === 0 ? (
              <span className="text-xs text-primary font-medium whitespace-nowrap">Anmeldelse</span>
            ) : (
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground/60" />
            )}
          </Link>
        ))}
        <Link
          to="/top-10-casino-online"
          className="flex items-center justify-center gap-1 px-4 py-2.5 text-[13px] text-primary hover:text-primary/80 border-t border-border/30 font-medium"
        >
          Mere <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
