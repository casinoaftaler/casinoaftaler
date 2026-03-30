import { Link } from "react-router-dom";
import { useDwellRewardProgress, activateMissionMode } from "@/hooks/useDwellReward";
import { useAuth } from "@/hooks/useAuth";
import { Check, Coins } from "lucide-react";

/** Compact widget for the community left sidebar */
export function DailyMissionsWidget() {
  const { user } = useAuth();
  const { pages, completedCount, totalPages, isLoading } = useDwellRewardProgress();

  if (!user) return null;
  if (isLoading) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <Coins className="h-4 w-4 text-amber-500" />
          Daily Missions
        </h3>
        <span className="text-xs font-medium text-muted-foreground tabular-nums">
          {completedCount}/{totalPages}
        </span>
      </div>

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
            className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
              page.completed
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-2">
              {page.completed ? (
                <Check className="h-3.5 w-3.5 flex-shrink-0" />
              ) : (
                <span className="h-3.5 w-3.5 rounded-full border border-current flex-shrink-0" />
              )}
              {page.label}
            </span>
            {!page.completed && (
              <span className="text-amber-500 font-medium">+{page.credits}</span>
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