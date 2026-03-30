import { useCasinoHuntStats } from "@/hooks/useCasinoHuntStats";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, TrendingUp, TrendingDown, Zap, BarChart3, Target, ArrowRight } from "lucide-react";

/** Slugify a slot name for /slot-katalog/ links */
function slotNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9æøå]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Slugify a provider name for /spiludviklere/ links */
function providerToSlug(provider: string): string {
  return provider
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Title-case a slot name that may be ALL CAPS */
function normalizeSlotName(name: string): string {
  if (name === name.toUpperCase() && name.length > 3) {
    return name
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return name;
}

interface CasinoHuntPerformanceProps {
  casinoSlug: string;
  casinoName: string;
}

export function CasinoHuntPerformance({ casinoSlug, casinoName }: CasinoHuntPerformanceProps) {
  const { data: stats, isLoading } = useCasinoHuntStats(casinoSlug);

  if (isLoading || !stats || stats.totalHunts === 0) return null;

  const isProfitable = stats.profitLossPercent >= 0;
  const formattedStart = stats.totalStartBalance.toLocaleString("da-DK");

  return (
    <section className="mb-12" aria-labelledby="hunt-performance-heading">
      <div className="flex items-center gap-3 mb-4">
        <FlaskConical className="h-7 w-7 text-primary" />
        <h2 id="hunt-performance-heading" className="text-3xl font-bold">
          Vores live test-resultater på {casinoName}
        </h2>
      </div>

      <p className="mb-2 text-muted-foreground leading-relaxed">
        Vi har testet {casinoName} i <strong className="text-foreground">{stats.totalHunts} bonus hunts</strong> med
        en samlet startbalance på {formattedStart} kr. Her er de faktiske resultater – ingen teori,
        kun <Link to="/bonus-hunt/arkiv" className="text-primary underline hover:text-primary/80">dokumenterede data fra vores streams</Link>.
      </p>

      <p className="mb-6 text-sm text-muted-foreground">
        <strong className="text-foreground">Hvad er X?</strong>{" "}
        X angiver hvor mange gange din indsats blev ganget. En bonus på 500x betyder, at en indsats på 10 kr. gav 5.000 kr. tilbage.
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-2xl font-bold">{stats.totalHunts}</p>
            <p className="text-xs text-muted-foreground">Bonus Hunts</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <Target className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-2xl font-bold">{stats.avgX}x</p>
            <p className="text-xs text-muted-foreground">Gennemsnitlig X</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <Zap className="h-5 w-5 mx-auto mb-1 text-primary" />
            <p className="text-2xl font-bold">{stats.bestSlotX.toLocaleString("da-DK", { minimumFractionDigits: 1 })}x</p>
            <p className="text-xs text-muted-foreground">Bedste slot-hit</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            {isProfitable ? (
              <TrendingUp className="h-5 w-5 mx-auto mb-1 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 mx-auto mb-1 text-red-500" />
            )}
            <p className={`text-2xl font-bold ${isProfitable ? "text-green-500" : "text-red-500"}`}>
              {isProfitable ? "+" : ""}{stats.profitLossPercent}%
            </p>
            <p className="text-xs text-muted-foreground">Samlet resultat</p>
          </CardContent>
        </Card>
      </div>

      {/* Variance framing */}
      {!isProfitable && (
        <p className="mb-6 text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-3 border border-border/50">
          💡 Et negativt resultat på {Math.abs(stats.profitLossPercent)}% over {stats.totalHunts} hunts er normalt – 
          spillemaskiner har typisk en <Link to="/ordbog/rtp" className="text-primary hover:underline">RTP på 94-96%</Link>, 
          og vores data afspejler reel gambling-varians. Det understreger vigtigheden af{" "}
          <Link to="/ansvarligt-spil" className="text-primary hover:underline">ansvarligt spil</Link>.
        </p>
      )}

      {/* Top performing slots */}
      {stats.topSlots.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">
            Top 5 slots testet hos {casinoName}
          </h3>
          <div className="space-y-2">
            {stats.topSlots.map((slot, i) => {
              const displayName = normalizeSlotName(slot.name);
              const slug = slotNameToSlug(slot.name);
              return (
                <div
                  key={slot.name}
                  className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-2.5"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-sm font-bold text-muted-foreground w-6 shrink-0">
                      #{i + 1}
                    </span>
                    <div className="min-w-0">
                      <Link
                        to={`/slot-katalog/${slug}`}
                        className="font-medium text-foreground hover:text-primary transition-colors hover:underline"
                      >
                        {displayName}
                      </Link>
                      {slot.provider && (
                        <span className="block text-xs text-muted-foreground">
                          af{" "}
                          <Link
                            to={`/spiludviklere/${providerToSlug(slot.provider)}`}
                            className="hover:text-primary transition-colors hover:underline"
                          >
                            {slot.provider}
                          </Link>
                        </span>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant={i === 0 ? "default" : "secondary"}
                    className={i === 0 ? "bg-primary text-primary-foreground" : ""}
                  >
                    {slot.bestX.toLocaleString("da-DK", { minimumFractionDigits: 1 })}x
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-foreground">
            Vil du prøve {casinoName} selv?
          </p>
          <p className="text-sm text-muted-foreground">
            Læs vores fulde anmeldelse med bonusvilkår, udbetalingstest og vurdering.
          </p>
        </div>
        <Link
          to={`/casino-anmeldelser/${casinoSlug}`}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 hover:scale-[1.03] hover:shadow-md hover:shadow-primary/25 whitespace-nowrap shrink-0"
        >
          Læs fuld anmeldelse
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="text-sm text-muted-foreground italic">
        Alle data stammer fra vores live bonus hunts på{" "}
        <Link to="/bonus-hunt/arkiv" className="text-primary underline hover:text-primary/80">
          Twitch
        </Link>
        . Resultaterne er verificerbare i vores{" "}
        <Link to="/statistik" className="text-primary underline hover:text-primary/80">
          statistik-hub
        </Link>
        .
      </p>
    </section>
  );
}
