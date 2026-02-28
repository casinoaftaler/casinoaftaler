import { Link } from "react-router-dom";
import { Trophy, ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCasinos } from "@/hooks/useCasinos";
import { optimizeStorageImage } from "@/lib/imageOptimization";

interface CommunityActivityWidgetProps {
  casinoName: string;
  casinoSlug: string;
}

function useRecentHunts() {
  return useQuery({
    queryKey: ["community-recent-hunts"],
    queryFn: async () => {
      const { data } = await supabase
        .from("bonus_hunt_archives")
        .select("hunt_number, average_x, total_slots, opened_slots")
        .order("hunt_number", { ascending: false })
        .limit(3);

      return (data ?? []).map((h) => ({
        number: h.hunt_number,
        avgX: h.average_x,
        totalSlots: h.total_slots,
        openedSlots: h.opened_slots,
      }));
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function CommunityActivityWidget({ casinoName, casinoSlug }: CommunityActivityWidgetProps) {
  const { data: hunts, isLoading } = useRecentHunts();
  const { data: casinos } = useCasinos();

  const casino = casinos?.find((c) => c.slug === casinoSlug);
  const logoUrl = casino?.logo_url;

  if (isLoading || !hunts || hunts.length === 0) return null;

  return (
    <section className="mb-12" aria-label={`Bonus hunts på ${casinoName}`}>
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card overflow-hidden">
        {/* Header with casino logo */}
        <div className="flex items-center gap-4 border-b border-border/50 px-6 py-5 md:px-8">
          {logoUrl && (
            <img
              src={optimizeStorageImage(logoUrl, 96) ?? logoUrl}
              alt={`${casinoName} logo`}
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-xl object-contain bg-background/50 p-1"
              loading="lazy"
            />
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold">Live Bonus Hunts</h3>
            <p className="text-sm text-muted-foreground">
              Vi streamer bonus hunts live på {casinoName} – følg med og se resultaterne
            </p>
          </div>
          <Badge variant="secondary" className="hidden shrink-0 text-xs sm:inline-flex">
            <Sparkles className="mr-1 h-3 w-3" />
            Live resultater
          </Badge>
        </div>

        {/* Bonus hunt cards */}
        <div className="grid gap-3 p-6 sm:grid-cols-3 md:px-8">
          {hunts.map((hunt, i) => {
            const avgX = hunt.avgX != null ? Number(hunt.avgX) : null;
            const isTop = i === 0;
            return (
              <Link
                key={hunt.number}
                to="/community"
                className={`group relative flex flex-col items-center gap-3 rounded-xl border p-5 text-center transition-all hover:shadow-md ${
                  isTop
                    ? "border-primary/30 bg-primary/5 hover:border-primary/50"
                    : "border-border bg-card hover:border-primary/30 hover:bg-primary/5"
                }`}
              >
                {isTop && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <Badge className="text-[10px] px-2 py-0.5">
                      <Trophy className="mr-1 h-3 w-3" />
                      Seneste
                    </Badge>
                  </div>
                )}
                <span className="text-sm font-semibold text-muted-foreground">
                  Hunt #{hunt.number}
                </span>
                {avgX != null && (
                  <span className={`text-3xl font-extrabold tracking-tight ${
                    isTop ? "text-primary" : "text-foreground"
                  }`}>
                    {avgX.toFixed(1)}x
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  avg · {hunt.openedSlots}/{hunt.totalSlots} slots åbnet
                </span>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center gap-4 border-t border-border/50 px-6 py-4 md:px-8">
          <p className="flex-1 text-sm text-muted-foreground">
            Følg med i bonus hunts, spil på vores spillemaskiner og vind præmier i vores community.
          </p>
          <Link
            to="/community"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Gå til Community
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
