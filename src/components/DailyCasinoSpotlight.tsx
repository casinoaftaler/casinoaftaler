import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Star, Crown } from "lucide-react";
import { getTodayDanish } from "@/lib/danishDate";
import { CASINO_SCORES } from "@/lib/reviewScoring";

interface SpotlightCasino {
  name: string;
  slug: string;
  tagline: string;
}

/**
 * Rotates a "Casino of the Day" spotlight through partner casinos.
 * Deterministic: same casino shown all day, changes at midnight DK time.
 */
const SPOTLIGHT_CASINOS: SpotlightCasino[] = [
  { name: "SpilDanskNu", slug: "spildansknu", tagline: "Dansk-ejet casino med hurtige udbetalinger" },
  { name: "Spilleautomaten", slug: "spilleautomaten", tagline: "Stort udvalg af spilleautomater med dansk licens" },
  { name: "Betinia", slug: "betinia", tagline: "Generøs velkomstbonus og live casino" },
  { name: "Campobet", slug: "campobet", tagline: "Sport og casino samlet ét sted" },
  { name: "Swift Casino", slug: "swift-casino", tagline: "Lynhurtige udbetalinger og no-sticky bonus" },
  { name: "Luna Casino", slug: "luna-casino", tagline: "Moderne design og spændende kampagner" },
];

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
}

export function DailyCasinoSpotlight() {
  const { casino, score, todayISO } = useMemo(() => {
    const dayIndex = getDayOfYear() % SPOTLIGHT_CASINOS.length;
    const c = SPOTLIGHT_CASINOS[dayIndex];
    return {
      casino: c,
      score: CASINO_SCORES[c.slug]?.total ?? 0,
      todayISO: getTodayDanish(),
    };
  }, []);

  return (
    <Link
      to={`/casino-anmeldelser/${casino.slug}`}
      className="flex items-center gap-3 rounded-lg border border-primary/30 bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md group"
      aria-label={`Dagens anbefaling: ${casino.name}`}
    >
      <div className="rounded-lg bg-primary/10 p-2.5 flex-shrink-0 group-hover:bg-primary/20 transition-colors">
        <Crown className="h-5 w-5 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{casino.name}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">
            Dagens valg
          </span>
        </div>
        <span className="text-xs text-muted-foreground block mt-0.5">{casino.tagline}</span>
        <div className="flex items-center gap-2 mt-1">
          {score > 0 && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-primary text-primary" />
              {score.toFixed(1)}/10
            </span>
          )}
          <time dateTime={todayISO} className="text-[10px] text-muted-foreground">
            {todayISO}
          </time>
        </div>
      </div>
    </Link>
  );
}
