import { Link } from "react-router-dom";
import { Star, ExternalLink } from "lucide-react";

const TOP_CASINOS = [
  {
    name: "SpilDanskNu",
    slug: "spildansknu",
    bonus: "100% op til 2.000 kr.",
    rating: 9.2,
  },
  {
    name: "LeoVegas",
    slug: "leovegas",
    bonus: "100% op til 1.000 kr.",
    rating: 9.0,
  },
  {
    name: "Bet365",
    slug: "bet365",
    bonus: "100% op til 1.000 kr.",
    rating: 8.8,
  },
];

export function BonusHuntTopCasinos() {
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
        {TOP_CASINOS.map((casino) => (
          <Link
            key={casino.slug}
            to={`/casino-anmeldelser/${casino.slug}`}
            className="group rounded-xl border border-border/50 bg-card p-4 flex flex-col gap-2 transition-all duration-200 hover:border-primary/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {casino.name}
              </span>
              <div className="flex items-center gap-1 text-xs text-primary">
                <Star className="h-3 w-3 fill-current" />
                {casino.rating}
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{casino.bonus}</span>
            <span className="inline-flex items-center gap-1 text-xs text-primary/70 group-hover:text-primary transition-colors mt-auto">
              Læs anmeldelse
              <ExternalLink className="h-3 w-3" />
            </span>
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
