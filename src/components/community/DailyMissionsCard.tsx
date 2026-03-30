import { Link } from "react-router-dom";
import { useDwellRewardProgress } from "@/hooks/useDwellReward";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Coins, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/** Full-size card for the /community hub page */
export function DailyMissionsCard() {
  const { user } = useAuth();
  const { pages, completedCount, totalPages, isLoading } = useDwellRewardProgress();

  if (!user || isLoading) return null;

  const totalCredits = pages.reduce((sum, p) => sum + p.credits, 0);
  const earnedCredits = pages.filter((p) => p.completed).reduce((sum, p) => sum + p.credits, 0);

  return (
    <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-card to-emerald-500/5 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Coins className="h-5 w-5 text-amber-500" />
              Daily Missions
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Besøg vores guides og optjen credits – 120 sekunder pr. side
            </p>
          </div>
          <Badge
            variant="outline"
            className={`tabular-nums ${
              completedCount === totalPages
                ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                : "border-amber-500/30 text-amber-600 dark:text-amber-400"
            }`}
          >
            {earnedCredits}/{totalCredits} credits
          </Badge>
        </div>

        {/* Progress bar */}
        <div className="h-3 rounded-full bg-muted/50 mb-5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${(completedCount / totalPages) * 100}%` }}
          />
        </div>

        {/* Mission grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {pages.map((page) => (
            <Link
              key={page.path}
to={page.path}
              onClick={() => sessionStorage.setItem("missionActive", "1")}
              className={`group flex items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
                page.completed
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-border hover:border-amber-500/30 hover:bg-amber-500/5"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 ${
                  page.completed
                    ? "bg-emerald-500/15"
                    : "bg-muted/50 group-hover:bg-amber-500/15"
                }`}
              >
                {page.completed ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Clock className="h-4 w-4 text-muted-foreground group-hover:text-amber-500 transition-colors" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    page.completed ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"
                  }`}
                >
                  {page.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {page.completed ? "Fuldført ✓" : `+${page.credits} credits · 120 sek`}
                </p>
              </div>
              {!page.completed && (
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-amber-500 transition-colors flex-shrink-0" />
              )}
            </Link>
          ))}
        </div>

        {completedCount === totalPages && (
          <p className="mt-4 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
            🎉 Alle missioner er fuldført i dag! Kom tilbage i morgen.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
