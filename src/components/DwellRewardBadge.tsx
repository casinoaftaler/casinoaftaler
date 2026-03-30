import { useLocation } from "react-router-dom";
import { useDwellReward, DWELL_DURATION_SECONDS } from "@/hooks/useDwellReward";
import { Check, Clock, Coins, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export function DwellRewardBadge() {
  const { pathname } = useLocation();
  const {
    secondsLeft,
    isActive,
    isClaimed,
    alreadyCompleted,
    isEligiblePage,
    isLoggedIn,
  } = useDwellReward(pathname);

  // Only show on eligible pages
  if (!isEligiblePage) return null;

  // Not logged in – show login prompt
  if (!isLoggedIn) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
        <Link
          to="/login"
          className="flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2.5 shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <LogIn className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Log ind for credits</span>
        </Link>
      </div>
    );
  }

  const progress = 1 - secondsLeft / DWELL_DURATION_SECONDS;
  const circumference = 2 * Math.PI * 22; // radius 22
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div
        className={`relative flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-lg transition-all duration-500 ${
          isClaimed || alreadyCompleted
            ? "bg-emerald-500/10 border-emerald-500/30 shadow-emerald-500/10"
            : "bg-card border-border hover:shadow-xl"
        }`}
      >
        {/* Circular progress */}
        <div className="relative h-12 w-12 flex-shrink-0">
          <svg className="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
            {/* Background circle */}
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-muted/30"
            />
            {/* Progress circle */}
            {!isClaimed && !alreadyCompleted && (
              <circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="text-primary transition-all duration-300"
              />
            )}
            {/* Completed circle */}
            {(isClaimed || alreadyCompleted) && (
              <circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-emerald-500"
              />
            )}
          </svg>

          {/* Center icon/number */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isClaimed || alreadyCompleted ? (
              <Check className="h-5 w-5 text-emerald-500" strokeWidth={3} />
            ) : (
              <span className="text-sm font-bold tabular-nums text-foreground">
                {secondsLeft}
              </span>
            )}
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col">
          {isClaimed || alreadyCompleted ? (
            <>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                +300 credits!
              </span>
              <span className="text-xs text-muted-foreground">
                Belønning optjent ✓
              </span>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <Coins className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-sm font-semibold text-foreground">
                  300 credits
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {isActive ? "Bliv på siden..." : "Pauset"}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
