import { useCasinoHuntStats } from "@/hooks/useCasinoHuntStats";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, TrendingUp, TrendingDown, Trophy, BarChart3, Target } from "lucide-react";

/** Slugify a slot name for /slot-katalog/ links */
function slotNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9æøå]+/g, "-")
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
  const formattedEnd = stats.totalEndBalance.toLocaleString("da-DK");

  return (
    <section className="mb-12" aria-labelledby="hunt-performance-heading">
      <div className="flex items-center gap-3 mb-4">
        <FlaskConical className="h-7 w-7 text-primary" />
        <h2 id="hunt-performance-heading" className="text-3xl font-bold">
          Vores live test-resultater på {casinoName}
        </h2>
      </div>

      <p className="mb-6 text-muted-foreground leading-relaxed">
        Vi har testet {casinoName} i <strong className="text-foreground">{stats.totalHunts} bonus hunts</strong> med
        en samlet startbalance på {formattedStart} kr. Her er de faktiske resultater – ingen teori,
        kun <Link to="/bonus-hunt/arkiv" className="text-primary underline hover:text-primary/80">dokumenterede data fra vores streams</Link>.
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
            <Trophy className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-2xl font-bold">{stats.bestHuntX}x</p>
            <p className="text-xs text-muted-foreground">Bedste Hunt</p>
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

      {/* Top performing slots */}
      {stats.topSlots.length > 0 && (
        <div className="mb-4">
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
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-muted-foreground w-6">
                      #{i + 1}
                    </span>
                    <Link
                      to={`/slot-katalog/${slug}`}
                      className="font-medium text-foreground hover:text-primary transition-colors hover:underline"
                    >
                      {displayName}
                    </Link>
                  </div>
                  <Badge
                    variant={i === 0 ? "default" : "secondary"}
                    className={i === 0 ? "bg-primary text-primary-foreground" : ""}
                  >
                    {slot.bestX.toLocaleString("da-DK", { minimumFractionDigits: 1 })}x
                  </Badge>
                </div>
              );
            }
            ))}
          </div>
        </div>
      )}

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
