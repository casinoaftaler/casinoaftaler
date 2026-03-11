import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const CASINO_SLUGS = ["spildansknu", "spilleautomaten", "campobet"];

export function BonusHuntTopCasinos() {
  const { data: casinos = [] } = useQuery({
    queryKey: ["bonus-hunt-top-casinos"],
    queryFn: async () => {
      const { data } = await supabase
        .from("casinos")
        .select("name, slug, logo_url, bonus_title, rating")
        .in("slug", CASINO_SLUGS)
        .eq("is_active", true);

      // Preserve order from CASINO_SLUGS
      if (!data) return [];
      return CASINO_SLUGS
        .map((s) => data.find((c) => c.slug === s))
        .filter(Boolean) as typeof data;
    },
    staleTime: 10 * 60 * 1000,
  });

  if (casinos.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-foreground">
          Casinoer vi tester bonus hunts på
        </h2>
        <p className="text-sm text-muted-foreground">
          Alle hunts gennemføres på casinoer med{" "}
          <Link
            to="/casino-licenser"
            className="font-medium text-foreground/80 hover:text-foreground hover:underline transition-colors"
          >
            dansk licens
          </Link>{" "}
          og dokumenteres live.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {casinos.map((casino) => (
          <Link
            key={casino.slug}
            to={`/casino-anmeldelser/${casino.slug}`}
            className="group rounded-xl border border-border/50 bg-card p-4 flex items-start gap-3 transition-all duration-200 hover:border-primary/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
          >
            {casino.logo_url && (
              <img
                src={optimizeStorageImage(casino.logo_url, 80) ?? casino.logo_url}
                alt={`${casino.name} logo`}
                className="h-10 w-10 rounded-lg object-contain bg-background/50 shrink-0"
                loading="lazy"
                width={40}
                height={40}
              />
            )}
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {casino.name}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {casino.bonus_title}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-primary/70 group-hover:text-primary transition-colors mt-0.5">
                Læs anmeldelse
                <ExternalLink className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        <Link
          to="/casino-anmeldelser"
          className="font-medium hover:text-foreground hover:underline transition-colors"
        >
          Se alle casino anmeldelser →
        </Link>
      </p>
    </section>
  );
}
