import { Link } from "react-router-dom";
import { useDwellRewardProgress, activateMissionMode } from "@/hooks/useDwellReward";
import { useAuth } from "@/hooks/useAuth";
import { Check, Coins, Clock, ArrowRight } from "lucide-react";

/** Full Daily Missions widget for the community left sidebar */
export function DailyMissionsWidget() {
  const { user } = useAuth();
  const { pages, completedCount, totalPages, isLoading } = useDwellRewardProgress();

  if (!user) return null;
  if (isLoading) return null;

  const totalCredits = pages.reduce((sum, p) => sum + p.credits, 0);
  const earnedCredits = pages.filter((p) => p.completed).reduce((sum, p) => sum + p.credits, 0);

  return (
    <div className="rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-card to-emerald-500/5 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
          <Coins className="h-4 w-4 text-amber-500" />
          Daily Missions
        </h3>
        <span
          className={`text-xs font-semibold tabular-nums ${
            completedCount === totalPages
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-amber-600 dark:text-amber-400"
          }`}
        >
          {earnedCredits}/{totalCredits} credits
        </span>
      </div>

      <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">
        Besøg vores guides og optjen credits – 120 sekunder pr. side
      </p>

      <div className="h-2 rounded-full bg-muted/50 mb-3 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
          style={{ width: `${(completedCount / totalPages) * 100}%` }}
        />
      </div>

      <div className="space-y-1.5">
        {pages.map((page) => (
          <Link
            key={page.path}
            to={page.path}
            onClick={() => activateMissionMode()}
            className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs transition-all ${
              page.completed
                ? "bg-emerald-500/10"
                : "hover:bg-amber-500/5 hover:border-amber-500/20"
            }`}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full flex-shrink-0 ${
                page.completed
                  ? "bg-emerald-500/15"
                  : "bg-muted/50 group-hover:bg-amber-500/15"
              }`}
            >
              {page.completed ? (
                <Check className="h-3 w-3 text-emerald-500" />
              ) : (
                <Clock className="h-3 w-3 text-muted-foreground group-hover:text-amber-500 transition-colors" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-xs font-medium truncate ${
                  page.completed ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"
                }`}
              >
                {page.label}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {page.completed ? "Fuldført ✓" : `+${page.credits} credits · 120 sek`}
              </p>
            </div>
            {!page.completed && (
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-amber-500 transition-colors flex-shrink-0" />
            )}
          </Link>
        ))}
      </div>

      {completedCount === totalPages && (
        <p className="mt-3 text-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
          🎉 Alle missioner fuldført i dag!
        </p>
      )}
    </div>
  );
}
