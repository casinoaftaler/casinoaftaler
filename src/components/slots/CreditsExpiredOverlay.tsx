import { useState, useEffect } from "react";
import { activateMissionMode } from "@/hooks/useDwellReward";
import { ArrowRight, Check, Flame } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { Link } from "react-router-dom";
import { CreditCoin } from "@/components/CreditCoin";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCasinoBySlug } from "@/hooks/useCasinoBySlug";
import { optimizeStorageImage } from "@/lib/imageOptimization";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useDwellRewardProgress } from "@/hooks/useDwellReward";
import { useMissionStreak, STREAK_MILESTONES } from "@/hooks/useMissionStreak";

function getTimeUntilMidnightCopenhagen(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const copenhagenNow = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Copenhagen" }));
  const midnight = new Date(copenhagenNow);
  midnight.setDate(midnight.getDate() + 1);
  midnight.setHours(0, 0, 0, 0);
  const diffMs = midnight.getTime() - copenhagenNow.getTime();
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

interface CreditsExpiredOverlayProps {
  isVisible: boolean;
}

export function CreditsExpiredOverlay({ isVisible }: CreditsExpiredOverlayProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnightCopenhagen);
  const { data: spildansknu } = useCasinoBySlug("spildansknu");
  const { data: spilleautomaten } = useCasinoBySlug("spilleautomaten");
  const { user } = useAuth();
  const { pages, completedCount, totalPages } = useDwellRewardProgress();
  const { currentStreak, nextMilestone } = useMissionStreak();
  const uncompletedMissions = pages.filter((p) => !p.completed);

  const totalCredits = pages.reduce((sum, p) => sum + p.credits, 0);
  const earnedCredits = pages.filter((p) => p.completed).reduce((sum, p) => sum + p.credits, 0);
  const hasNoneCompleted = completedCount === 0;
  const allCompleted = completedCount === totalPages;

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnightCopenhagen());
    }, 1000);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  const promoCasinos = [
    { casino: spildansknu, slug: "spildansknu", name: "SpilDanskNu", tagline: "Danmarks mest populære online casino" },
    { casino: spilleautomaten, slug: "spilleautomaten", name: "Spilleautomaten", tagline: "Fantastisk bonus og hurtigt spil" },
  ];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-xl">
      <ScrollArea className="max-h-[90vh] w-full flex justify-center">
        <div className="max-w-sm mx-auto px-4 py-6 text-center space-y-4 bg-gradient-to-b from-card/95 to-card border border-primary/20 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <div className="flex justify-center">
            <div className="h-14 w-14 rounded-full bg-primary/15 flex items-center justify-center">
              <CreditCoin size="lg" />
            </div>
          </div>

          <h3 className="text-lg font-bold text-foreground">
            Dine credits er opbrugt
          </h3>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {uncompletedMissions.length > 0
              ? "Du kan optjene flere credits nu ved at fuldføre Daily Missions!"
              : "Kom tilbage i morgen for at vinde præmier og komme på leaderboardet!"}
          </p>

          {/* Daily Missions section – matching community DailyMissionsWidget design */}
          {user && uncompletedMissions.length > 0 && (
            <div
              className={`relative rounded-xl border p-4 text-left transition-all duration-700 ${
                hasNoneCompleted
                  ? "border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-card to-amber-400/5 animate-[subtle-glow_3s_ease-in-out_infinite]"
                  : "border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-card to-emerald-500/5"
              }`}
            >
              {/* Attention indicator when 0/6 */}
              {hasNoneCompleted && (
                <div className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-40" />
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-amber-500 items-center justify-center">
                    <MenuIcon iconName="sparkles" className="h-2 w-2 text-white" />
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <MenuIcon iconName="coins" className="h-5 w-5" />
                  Daily Missions
                </h3>
                <span
                  className={`text-xs font-semibold tabular-nums ${
                    allCompleted
                      ? "text-emerald-600 dark:text-emerald-400"
                      : hasNoneCompleted
                        ? "text-amber-500 dark:text-amber-400 animate-pulse"
                        : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {earnedCredits}/{totalCredits} credits
                </span>
              </div>

              <p className={`text-[11px] mb-3 leading-relaxed ${hasNoneCompleted ? "text-amber-200/80" : "text-muted-foreground"}`}>
                {hasNoneCompleted
                  ? "🔥 Optjen op til 3.600 credits i dag – start din første mission!"
                  : "Besøg vores guides og optjen credits – 120 sekunder pr. side"}
              </p>

              <div className="h-2 rounded-full bg-muted/50 mb-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    hasNoneCompleted
                      ? "bg-gradient-to-r from-amber-500/50 to-amber-400/30 w-[3%]"
                      : "bg-gradient-to-r from-amber-500 to-emerald-500"
                  }`}
                  style={hasNoneCompleted ? undefined : { width: `${(completedCount / totalPages) * 100}%` }}
                />
              </div>

              <div className="space-y-1.5">
                {pages.map((page, index) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    onClick={() => activateMissionMode()}
                    className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs transition-all ${
                      page.completed
                        ? "bg-emerald-500/10"
                        : hasNoneCompleted && index === 0
                          ? "bg-amber-500/10 border border-amber-500/20"
                          : "hover:bg-amber-500/5 hover:border-amber-500/20"
                    }`}
                  >
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full flex-shrink-0 ${
                        page.completed
                          ? "bg-emerald-500/15"
                          : hasNoneCompleted && index === 0
                            ? "bg-amber-500/20"
                            : "bg-muted/50 group-hover:bg-amber-500/15"
                      }`}
                    >
                      {page.completed ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <MenuIcon iconName="clock" className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs font-medium truncate ${
                          page.completed
                            ? "text-emerald-600 dark:text-emerald-400"
                            : hasNoneCompleted && index === 0
                              ? "text-amber-400"
                              : "text-foreground"
                        }`}
                      >
                        {page.label}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {page.completed ? "Fuldført ✓" : `+${page.credits} credits · 120 sek`}
                      </p>
                    </div>
                    {!page.completed && (
                      <ArrowRight className={`h-3.5 w-3.5 transition-colors flex-shrink-0 ${
                        hasNoneCompleted && index === 0
                          ? "text-amber-500"
                          : "text-muted-foreground group-hover:text-amber-500"
                      }`} />
                    )}
                  </Link>
                ))}
              </div>

              {/* Streak section */}
              <div className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2.5">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className={`h-4 w-4 flex-shrink-0 ${currentStreak > 0 ? "text-amber-500" : "text-muted-foreground"}`} />
                  <p className="text-xs font-bold text-foreground">
                    {currentStreak > 0 ? `${currentStreak}-dags streak 🔥` : "Streak bonus"}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  {STREAK_MILESTONES.map((m) => {
                    const achieved = currentStreak >= m.days;
                    const isNext = nextMilestone?.days === m.days;
                    return (
                      <div
                        key={m.days}
                        className={`flex-1 flex flex-col items-center gap-0.5 rounded-md py-1.5 text-center ${
                          achieved
                            ? "bg-amber-500/15 border border-amber-500/30"
                            : isNext
                              ? "bg-amber-500/5 border border-amber-500/20"
                              : "bg-muted/10 border border-border/20"
                        }`}
                      >
                        <span className={`text-[10px] font-bold ${achieved ? "text-amber-500" : isNext ? "text-amber-400" : "text-muted-foreground"}`}>
                          {achieved ? "✓" : `${m.days}d`}
                        </span>
                        <span className="text-[9px] text-muted-foreground">+{m.credits}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {allCompleted && (
                <p className="mt-3 text-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  🎉 Alle missioner fuldført i dag!
                </p>
              )}
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-primary">
            <MenuIcon iconName="clock" className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">Nye credits om</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            {[
              { value: pad(timeLeft.hours), label: "timer" },
              { value: pad(timeLeft.minutes), label: "min" },
              { value: pad(timeLeft.seconds), label: "sek" },
            ].map((unit, i) => (
              <div key={unit.label} className="flex items-center gap-2">
                {i > 0 && <span className="text-lg font-bold text-primary/50">:</span>}
                <div className="flex flex-col items-center">
                  <span className="text-xl font-black tabular-nums text-primary">
                    {unit.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {unit.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Casino promos – SpilDanskNu & Spilleautomaten */}
          <div className="border-t border-border/30 pt-4 space-y-3">
            <p className="text-sm font-semibold text-foreground leading-snug">
              Er du klar til at spille for rigtige penge? Prøv disse danske casinoer med <span className="text-primary">dansk licens</span>!
            </p>

            <div className="space-y-2.5">
              {promoCasinos.map(({ casino, slug, name, tagline }) => (
                casino ? (
                  <div key={slug} className="rounded-xl border border-primary/30 bg-gradient-to-b from-primary/10 to-primary/5 p-3 space-y-2">
                    {casino.logo_url && (
                      <img
                        src={optimizeStorageImage(casino.logo_url, 120)}
                        alt={`${name} logo`}
                        className="h-8 mx-auto object-contain"
                        loading="lazy"
                      />
                    )}
                    <p className="text-[11px] text-muted-foreground">{casino.bonus_amount}</p>
                    <Button
                      size="sm"
                      className="w-full gap-1.5"
                      onClick={() => getAffiliateRedirect(slug, user?.id)}
                    >
                      Spil hos {name}
                      <MenuIcon iconName="external-link" className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ) : (
                  <Link
                    key={slug}
                    to={`/casino-anmeldelser/${slug}`}
                    className="block rounded-lg bg-gradient-to-r from-primary to-primary/80 px-5 py-3 text-sm font-bold text-primary-foreground text-center transition-transform hover:scale-[1.03] active:scale-95"
                  >
                    Besøg {name}
                    <MenuIcon iconName="external-link" className="h-3.5 w-3.5 inline ml-1.5" />
                  </Link>
                )
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70 pt-1">
            <MenuIcon iconName="sparkles" className="h-3 w-3" />
            <span>Credits nulstilles ved midnat (dansk tid)</span>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}