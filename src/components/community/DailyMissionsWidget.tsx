import { Link } from "react-router-dom";
import { useDwellRewardProgress, activateMissionMode } from "@/hooks/useDwellReward";
import { SCROLL_DEPTH_BONUS_CREDITS } from "@/hooks/useScrollDepthBonus";
import { useMissionStreak, STREAK_MILESTONES } from "@/hooks/useMissionStreak";
import { useAuth } from "@/hooks/useAuth";
import { ArrowRight, Check, Flame } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;

/** Full Daily Missions widget for the community left sidebar */
export function DailyMissionsWidget() {
  const { user } = useAuth();
  const { pages, completedCount, totalPages, isLoading } = useDwellRewardProgress();
  const { currentStreak, nextMilestone } = useMissionStreak();

  if (!user) return null;
  if (isLoading) return null;

  const totalCredits = pages.reduce((sum, p) => sum + p.credits + SCROLL_DEPTH_BONUS_CREDITS, 0);
  const earnedCredits = pages.filter((p) => p.completed).reduce((sum, p) => sum + p.credits + SCROLL_DEPTH_BONUS_CREDITS, 0);
  const hasNoneCompleted = completedCount === 0;
  const allCompleted = completedCount === totalPages;

  return (
    <div
      className={`relative rounded-xl border p-4 shadow-sm transition-all duration-700 ${
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

      <p className={`text-[11px] mb-3 leading-relaxed ${hasNoneCompleted ? "text-amber-700 dark:text-amber-200/80" : "text-muted-foreground"}`}>
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
                      ? "text-amber-600 dark:text-amber-400"
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

      {/* Streak section – always visible */}
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
  );
}
