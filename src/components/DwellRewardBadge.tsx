import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDwellReward, useDwellRewardProgress, DWELL_DURATION_SECONDS } from "@/hooks/useDwellReward";
import { Check, Gift, ArrowDown, ArrowRight } from "lucide-react";

export function DwellRewardBadge() {
  const { pathname } = useLocation();
  const {
    secondsLeft,
    isActive,
    isClaimed,
    alreadyCompleted,
    isEligiblePage,
    isLoggedIn,
    isMissionActivated,
    hasScrolled,
  } = useDwellReward(pathname);

  const { pages } = useDwellRewardProgress();

  const [visible, setVisible] = useState(true);

  // Find next uncompleted mission (not the current page)
  const nextMission = pages.find((p) => !p.completed && p.path !== pathname);

  const completed = isClaimed || alreadyCompleted;

  // Auto-hide after 8 seconds if completed AND no next mission
  useEffect(() => {
    if (completed && !nextMission) {
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
    }
  }, [completed, nextMission]);

  // Only show for logged-in users on eligible pages activated via mission link
  if (!isEligiblePage || !isLoggedIn || !isMissionActivated) return null;
  if (!visible) return null;

  const progress = 1 - secondsLeft / DWELL_DURATION_SECONDS;
  const circumference = 2 * Math.PI * 26;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div
        className={`relative flex items-center gap-3.5 rounded-2xl border-2 px-5 py-3.5 shadow-xl transition-all duration-500 ${
          completed
            ? "bg-gradient-to-r from-emerald-500/15 to-emerald-400/10 border-emerald-500/40 shadow-emerald-500/15"
            : "bg-gradient-to-r from-amber-500/10 to-orange-500/5 border-amber-500/40 shadow-amber-500/15"
        }`}
      >
        {/* Pulsing glow while active */}
        {!completed && isActive && (
          <div className="absolute inset-0 rounded-2xl bg-amber-500/10 animate-pulse" />
        )}

        {/* Circular progress */}
        <div className="relative h-14 w-14 flex-shrink-0">
          <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
            <circle
              cx="28" cy="28" r="26"
              fill="none" stroke="currentColor" strokeWidth="3"
              className="text-muted/20"
            />
            {!completed && (
              <circle
                cx="28" cy="28" r="26"
                fill="none" stroke="url(#dwell-gradient)" strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            )}
            {completed && (
              <circle
                cx="28" cy="28" r="26"
                fill="none" stroke="currentColor" strokeWidth="3"
                className="text-emerald-500"
              />
            )}
            <defs>
              <linearGradient id="dwell-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(38, 92%, 50%)" />
                <stop offset="100%" stopColor="hsl(25, 95%, 53%)" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            {completed ? (
              <Check className="h-6 w-6 text-emerald-500" strokeWidth={3} />
            ) : (
              <span className="text-base font-black tabular-nums text-foreground">
                {secondsLeft}
              </span>
            )}
          </div>
        </div>

        {/* Text + next mission */}
        <div className="relative flex flex-col gap-1">
          {completed ? (
            <>
              <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                +300 credits! 🎉
              </span>
              {nextMission ? (
                <Link
                  to={nextMission.path}
                  onClick={() => sessionStorage.setItem("missionActive", "1")}
                  className="flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors"
                >
                  <span>Næste: {nextMission.label}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <span className="text-xs text-muted-foreground">
                  Alle missioner fuldført! 🏆
                </span>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <Gift className="h-4 w-4 text-amber-500" />
                <span className="text-base font-bold text-foreground">
                  300 credits
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {!hasScrolled ? (
                  <span className="flex items-center gap-1">
                    <ArrowDown className="h-3 w-3 animate-bounce" />
                    Scroll ned for at starte timeren
                  </span>
                ) : isActive ? (
                  `Bliv på siden i ${secondsLeft} sek...`
                ) : (
                  "⏸ Pauset – vend tilbage"
                )}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
