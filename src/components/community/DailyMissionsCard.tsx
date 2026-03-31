import { Link } from "react-router-dom";
import { useDwellRewardProgress, activateMissionMode } from "@/hooks/useDwellReward";
import { SCROLL_DEPTH_BONUS_CREDITS } from "@/hooks/useScrollDepthBonus";
import { useMissionStreak, STREAK_MILESTONES } from "@/hooks/useMissionStreak";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Coins, Clock, ArrowRight, Sparkles, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/** Full-size card for the /community hub page */
export function DailyMissionsCard() {
  const { user } = useAuth();
  const { pages, completedCount, totalPages, isLoading } = useDwellRewardProgress();
  const { currentStreak, nextMilestone, longestStreak } = useMissionStreak();

  if (!user || isLoading) return null;

  const totalCredits = pages.reduce((sum, p) => sum + p.credits + SCROLL_DEPTH_BONUS_CREDITS, 0);
  const earnedCredits = pages.filter((p) => p.completed).reduce((sum, p) => sum + p.credits + SCROLL_DEPTH_BONUS_CREDITS, 0);
  const hasNoneCompleted = completedCount === 0;
  const allCompleted = completedCount === totalPages;

  return (
    <Card
      className={`overflow-hidden transition-all duration-700 ${
        hasNoneCompleted
          ? "border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-card to-amber-400/5 animate-[subtle-glow_3s_ease-in-out_infinite] ring-1 ring-amber-500/20"
          : "border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-card to-emerald-500/5"
      }`}
    >
      <CardContent className="p-6 relative">
        {/* Attention ping when 0/6 */}
        {hasNoneCompleted && (
          <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-30" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-amber-500 items-center justify-center">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </span>
          </div>
        )}

        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Coins className={`h-5 w-5 ${hasNoneCompleted ? "text-amber-500 animate-bounce" : "text-amber-500"}`} />
              Daily Missions
            </h2>
            <p className={`text-sm mt-1 ${hasNoneCompleted ? "text-amber-200/80" : "text-muted-foreground"}`}>
              {hasNoneCompleted
                ? "🔥 Start dine missioner og optjen op til 1.800 credits!"
                : "Besøg vores guides og optjen credits – 120 sekunder pr. side"}
            </p>
          </div>
          {!hasNoneCompleted && (
            <Badge
              variant="outline"
              className={`tabular-nums ${
                allCompleted
                  ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                  : "border-amber-500/30 text-amber-600 dark:text-amber-400"
              }`}
            >
              {earnedCredits}/{totalCredits} credits
            </Badge>
          )}
          {hasNoneCompleted && (
            <Badge
              variant="outline"
              className="border-amber-500/40 text-amber-500 animate-pulse tabular-nums"
            >
              {earnedCredits}/{totalCredits} credits
            </Badge>
          )}
        </div>

        <div className="h-3 rounded-full bg-muted/50 mb-5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              hasNoneCompleted
                ? "bg-gradient-to-r from-amber-500/50 to-amber-400/30 w-[2%]"
                : "bg-gradient-to-r from-amber-500 to-emerald-500"
            }`}
            style={hasNoneCompleted ? undefined : { width: `${(completedCount / totalPages) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {pages.map((page, index) => (
            <Link
              key={page.path}
              to={page.path}
              onClick={() => activateMissionMode()}
              className={`group flex items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
                page.completed
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : hasNoneCompleted && index === 0
                    ? "border-amber-500/40 bg-amber-500/10 shadow-[0_0_12px_-3px_rgba(245,158,11,0.3)]"
                    : "border-border hover:border-amber-500/30 hover:bg-amber-500/5"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 ${
                  page.completed
                    ? "bg-emerald-500/15"
                    : hasNoneCompleted && index === 0
                      ? "bg-amber-500/20"
                      : "bg-muted/50 group-hover:bg-amber-500/15"
                }`}
              >
                {page.completed ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Clock className={`h-4 w-4 transition-colors ${
                    hasNoneCompleted && index === 0
                      ? "text-amber-500"
                      : "text-muted-foreground group-hover:text-amber-500"
                  }`} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    page.completed
                      ? "text-emerald-600 dark:text-emerald-400"
                      : hasNoneCompleted && index === 0
                        ? "text-amber-400 font-semibold"
                        : "text-foreground"
                  }`}
                >
                  {page.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {page.completed ? "Fuldført ✓" : `+${page.credits} credits · 120 sek`}
                </p>
              </div>
              {!page.completed && (
                <ArrowRight className={`h-4 w-4 transition-colors flex-shrink-0 ${
                  hasNoneCompleted && index === 0
                    ? "text-amber-500"
                    : "text-muted-foreground group-hover:text-amber-500"
                }`} />
              )}
            </Link>
          ))}
        </div>

        {/* Streak progress – always visible */}
        <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
          <div className="flex items-center gap-3 mb-3">
            <Flame className={`h-6 w-6 flex-shrink-0 ${currentStreak > 0 ? "text-amber-500" : "text-muted-foreground"}`} />
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">
                {currentStreak > 0 ? `${currentStreak}-dags streak 🔥` : "Start din streak!"}
              </p>
              <p className="text-xs text-muted-foreground">
                {currentStreak === 0
                  ? "Fuldfør alle 6 missioner dagligt for at opbygge en streak"
                  : nextMilestone
                    ? `${nextMilestone.days - currentStreak} dage til næste bonus: +${nextMilestone.credits} credits`
                    : "Alle streak-bonusser opnået! 🏆"}
              </p>
              {longestStreak > currentStreak && longestStreak > 0 && (
                <p className="text-[10px] text-muted-foreground/60">Personlig rekord: {longestStreak} dage</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {STREAK_MILESTONES.map((m) => {
              const achieved = currentStreak >= m.days;
              const isNext = nextMilestone?.days === m.days;
              return (
                <div
                  key={m.days}
                  className={`flex flex-col items-center gap-1 rounded-lg border px-3 py-2.5 transition-all ${
                    achieved
                      ? "border-amber-500/40 bg-amber-500/15"
                      : isNext
                        ? "border-amber-500/30 bg-amber-500/5"
                        : "border-border/30 bg-muted/10"
                  }`}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    achieved
                      ? "bg-amber-500 text-white"
                      : isNext
                        ? "bg-amber-500/20 text-amber-500"
                        : "bg-muted/30 text-muted-foreground"
                  }`}>
                    {achieved ? "✓" : `${m.days}d`}
                  </div>
                  <p className={`text-[11px] font-semibold ${achieved ? "text-amber-500" : "text-foreground"}`}>
                    {m.label}
                  </p>
                  <p className={`text-[10px] ${achieved ? "text-amber-400/70" : "text-muted-foreground"}`}>
                    +{m.credits.toLocaleString("da-DK")} credits
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {allCompleted && (
          <p className="mt-4 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
            🎉 Alle missioner er fuldført i dag! Kom tilbage i morgen.
          </p>
        )}
      </CardContent>
    </Card>
  );
}