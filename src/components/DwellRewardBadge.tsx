import { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDwellReward, useDwellRewardProgress, DWELL_DURATION_SECONDS, activateMissionMode } from "@/hooks/useDwellReward";
import { Check, Gift, ArrowDown, ArrowRight, Flame, Zap, Trophy } from "lucide-react";

const MILESTONES = [
  { at: 90, text: "Godt i gang! 💪", icon: Flame },
  { at: 60, text: "Halvvejs! 🔥", icon: Zap },
  { at: 30, text: "Næsten i mål! 🏆", icon: Trophy },
];

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
  const [milestoneFlash, setMilestoneFlash] = useState<string | null>(null);
  const [prevSeconds, setPrevSeconds] = useState(DWELL_DURATION_SECONDS);
  const hasPlayedSound = useRef(false);

  const nextMission = pages.find((p) => !p.completed && p.path !== pathname);
  const completed = isClaimed || alreadyCompleted;

  // Current milestone message
  const currentMilestone = useMemo(() => {
    if (completed || secondsLeft >= DWELL_DURATION_SECONDS) return null;
    return MILESTONES.find((m) => secondsLeft <= m.at && secondsLeft > (m.at === 30 ? 0 : m.at - 30));
  }, [secondsLeft, completed]);

  // Flash effect when crossing a milestone threshold
  useEffect(() => {
    for (const m of MILESTONES) {
      if (prevSeconds > m.at && secondsLeft <= m.at && secondsLeft > 0) {
        setMilestoneFlash(m.text);
        const timer = setTimeout(() => setMilestoneFlash(null), 2000);
        setPrevSeconds(secondsLeft);
        return () => clearTimeout(timer);
      }
    }
    setPrevSeconds(secondsLeft);
  }, [secondsLeft, prevSeconds]);

  // Reset visibility on page change
  useEffect(() => {
    setVisible(true);
    setPrevSeconds(DWELL_DURATION_SECONDS);
    setMilestoneFlash(null);
  }, [pathname]);

  // Auto-hide after 4s if completed AND no next mission
  useEffect(() => {
    if (completed && !nextMission) {
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [completed, nextMission]);

  if (!isEligiblePage || !isLoggedIn || !isMissionActivated) return null;
  if (!visible) return null;

  const progress = 1 - secondsLeft / DWELL_DURATION_SECONDS;
  const circumference = 2 * Math.PI * 26;
  const strokeDashoffset = circumference * (1 - progress);

  // Dynamic glow color based on progress
  const glowIntensity = Math.min(progress * 1.5, 1);
  const isNearEnd = secondsLeft <= 30 && secondsLeft > 0;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      {/* Milestone toast */}
      {milestoneFlash && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap animate-fade-in">
          <div className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-amber-500/30">
            {milestoneFlash}
          </div>
        </div>
      )}

      <div
        className={`relative flex items-center gap-3.5 rounded-2xl border-2 px-5 py-3.5 shadow-xl backdrop-blur-sm transition-all duration-500 ${
          completed
            ? "bg-gradient-to-r from-emerald-500/15 to-emerald-400/10 border-emerald-500/40 shadow-emerald-500/20"
            : isNearEnd
              ? "bg-gradient-to-r from-orange-500/15 to-amber-500/10 border-orange-500/50 shadow-orange-500/25"
              : "bg-gradient-to-r from-amber-500/10 to-orange-500/5 border-amber-500/40 shadow-amber-500/15"
        }`}
        style={{
          boxShadow: completed
            ? "0 8px 32px -4px rgba(16, 185, 129, 0.25)"
            : `0 8px 32px -4px rgba(245, 158, 11, ${0.1 + glowIntensity * 0.2})`,
        }}
      >
        {/* Animated glow ring while active */}
        {!completed && isActive && (
          <div
            className={`absolute inset-0 rounded-2xl transition-opacity duration-1000 ${
              isNearEnd ? "animate-pulse" : ""
            }`}
            style={{
              background: `radial-gradient(ellipse at center, rgba(245, 158, 11, ${0.05 + glowIntensity * 0.08}) 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Sparkle particles near completion */}
        {isNearEnd && !completed && (
          <>
            <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-400 animate-ping opacity-75" />
            <div className="absolute -bottom-0.5 right-4 h-1.5 w-1.5 rounded-full bg-orange-400 animate-ping opacity-60" style={{ animationDelay: "0.5s" }} />
          </>
        )}

        {/* Circular progress */}
        <div className="relative h-14 w-14 flex-shrink-0">
          <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
            {/* Track */}
            <circle cx="28" cy="28" r="26" fill="none" strokeWidth="3" className="stroke-muted/20" />
            {/* Progress arc */}
            {!completed && (
              <circle
                cx="28" cy="28" r="26"
                fill="none"
                stroke={isNearEnd ? "url(#dwell-gradient-hot)" : "url(#dwell-gradient)"}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
                style={{
                  filter: isNearEnd ? "drop-shadow(0 0 4px rgba(249, 115, 22, 0.5))" : "none",
                }}
              />
            )}
            {/* Completed ring */}
            {completed && (
              <circle cx="28" cy="28" r="26" fill="none" strokeWidth="3" className="stroke-emerald-500" style={{ filter: "drop-shadow(0 0 6px rgba(16, 185, 129, 0.4))" }} />
            )}
            <defs>
              <linearGradient id="dwell-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(38, 92%, 50%)" />
                <stop offset="100%" stopColor="hsl(25, 95%, 53%)" />
              </linearGradient>
              <linearGradient id="dwell-gradient-hot" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(25, 95%, 53%)" />
                <stop offset="100%" stopColor="hsl(15, 95%, 50%)" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            {completed ? (
              <div className="animate-scale-in">
                <Check className="h-6 w-6 text-emerald-500" strokeWidth={3} />
              </div>
            ) : (
              <span
                className={`text-base font-black tabular-nums transition-colors duration-300 ${
                  isNearEnd ? "text-orange-500" : "text-foreground"
                }`}
              >
                {secondsLeft}
              </span>
            )}
          </div>
        </div>

        {/* Text + next mission */}
        <div className="relative flex flex-col gap-1 min-w-0">
          {completed ? (
            <div className="animate-fade-in">
              <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                +300 credits! 🎉
              </span>
              {nextMission ? (
                <Link
                  to={nextMission.path}
                  onClick={() => activateMissionMode()}
                  className="mt-1 flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-all hover:gap-2.5"
                >
                  <span>Næste: {nextMission.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform" />
                </Link>
              ) : (
                <span className="text-xs text-muted-foreground">Alle missioner fuldført! 🏆</span>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <Gift className={`h-4 w-4 transition-colors duration-300 ${isNearEnd ? "text-orange-500" : "text-amber-500"}`} />
                <span className="text-base font-bold text-foreground">300 credits</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {!hasScrolled ? (
                  <span className="flex items-center gap-1">
                    <ArrowDown className="h-3 w-3 animate-bounce" />
                    Scroll ned for at starte
                  </span>
                ) : currentMilestone ? (
                  <span className="flex items-center gap-1 animate-fade-in">
                    {(() => { const Icon = currentMilestone.icon; return <Icon className="h-3 w-3" />; })()}
                    {currentMilestone.text.replace(/\s*[\p{Emoji_Presentation}\p{Extended_Pictographic}]+$/u, "")} – {secondsLeft}s
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