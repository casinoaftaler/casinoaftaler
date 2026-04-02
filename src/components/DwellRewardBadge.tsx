import { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDwellReward, useDwellRewardProgress, DWELL_DURATION_SECONDS, activateMissionMode } from "@/hooks/useDwellReward";
import { useScrollDepthBonus } from "@/hooks/useScrollDepthBonus";
import { useMissionStreak } from "@/hooks/useMissionStreak";
import { ArrowDown, ArrowRight, Check, Play, Scroll } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";

const MILESTONES = [
  { at: 90, text: "Godt i gang! 💪", iconName: "flame" },
  { at: 60, text: "Halvvejs! 🔥", iconName: "zap" },
  { at: 30, text: "Næsten i mål! 🏆", iconName: "trophy" },
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

  const { pages, completedCount, totalPages } = useDwellRewardProgress();
  const { hasReachedDepth, hasReachedHint, isClaimed: scrollClaimed, scrollDepthCredits } = useScrollDepthBonus(pathname, isClaimed || alreadyCompleted);
  const { currentStreak, checkAndUpdateStreak } = useMissionStreak();

  const [visible, setVisible] = useState(true);
  const [milestoneFlash, setMilestoneFlash] = useState<string | null>(null);
  const [prevSeconds, setPrevSeconds] = useState(DWELL_DURATION_SECONDS);
  const [streakFlash, setStreakFlash] = useState<string | null>(null);
  const hasPlayedSound = useRef(false);

  const completed = isClaimed || alreadyCompleted;
  const nextMission = pages.find((p) => !p.completed && p.path !== pathname);

  // Check streak when all missions complete
  useEffect(() => {
    if (completedCount === totalPages && completedCount > 0) {
      checkAndUpdateStreak().then((result: any) => {
        if (result?.rewards?.length > 0) {
          const reward = result.rewards[0];
          setStreakFlash(`🔥 ${reward.type} streak! +${reward.credits} credits!`);
          setTimeout(() => setStreakFlash(null), 5000);
        }
      });
    }
  }, [completedCount, totalPages]);

  // Current milestone message
  const currentMilestone = useMemo(() => {
    if (completed || secondsLeft >= DWELL_DURATION_SECONDS) return null;
    return MILESTONES.find((m) => secondsLeft <= m.at && secondsLeft > (m.at === 30 ? 0 : m.at - 30));
  }, [secondsLeft, completed]);

  // Flash effect when crossing a milestone threshold
  useEffect(() => {
    if (secondsLeft === 0 || completed) {
      setMilestoneFlash(null);
      setPrevSeconds(secondsLeft);
      return;
    }
    for (const m of MILESTONES) {
      if (prevSeconds > m.at && secondsLeft <= m.at && secondsLeft > 0) {
        setMilestoneFlash(m.text);
        const timer = setTimeout(() => setMilestoneFlash(null), 3000);
        setPrevSeconds(secondsLeft);
        return () => clearTimeout(timer);
      }
    }
    setPrevSeconds(secondsLeft);
  }, [secondsLeft, prevSeconds, completed]);

  // Reset visibility and sound flag on page change
  useEffect(() => {
    setVisible(true);
    setPrevSeconds(DWELL_DURATION_SECONDS);
    setMilestoneFlash(null);
    hasPlayedSound.current = false;
  }, [pathname]);

  // Play completion sound only when this session's timer actually reaches 0
  useEffect(() => {
    if (isClaimed && secondsLeft === 0 && !hasPlayedSound.current) {
      hasPlayedSound.current = true;
      try {
        const audio = new Audio("/sounds/mission-complete.m4a");
        audio.volume = 0.7;
        audio.play().catch(() => {});
      } catch {}
    }
  }, [isClaimed, secondsLeft]);

  // Auto-hide after 5s if completed AND no next mission
  useEffect(() => {
    if (completed && !nextMission) {
      const timer = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [completed, nextMission]);

  if (!isEligiblePage || !isLoggedIn || !isMissionActivated) return null;
  if (!visible) return null;

  const progress = 1 - secondsLeft / DWELL_DURATION_SECONDS;
  const circumference = 2 * Math.PI * 26;
  const strokeDashoffset = circumference * (1 - progress);

  const glowIntensity = Math.min(progress * 1.5, 1);
  const isNearEnd = secondsLeft <= 30 && secondsLeft > 0;

  // Format seconds as mm:ss for display
  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeDisplay = minutes > 0 ? `${minutes}:${secs.toString().padStart(2, "0")}` : `${secs}s`;

  return (
    <div className="fixed bottom-24 left-6 z-50 animate-fade-in">
      {/* Milestone toast */}
      {milestoneFlash && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap animate-fade-in">
          <div
            className="rounded-full px-5 py-2 text-sm font-bold text-white shadow-xl"
            style={{
              background: "linear-gradient(135deg, hsl(38, 92%, 50%), hsl(25, 95%, 53%), hsl(15, 95%, 50%))",
              boxShadow: "0 4px 20px -2px rgba(245, 158, 11, 0.5), 0 0 40px -8px rgba(249, 115, 22, 0.3)",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          >
            {milestoneFlash}
          </div>
        </div>
      )}

      <div
        className={`relative flex items-center gap-4 rounded-2xl border-2 px-5 py-4 shadow-2xl backdrop-blur-md transition-all duration-700 ${
          completed
            ? "border-emerald-500/50"
            : isNearEnd
              ? "border-orange-500/60"
              : "border-amber-500/40"
        }`}
        style={{
          background: completed
            ? "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(52, 211, 153, 0.08) 100%)"
            : isNearEnd
              ? "linear-gradient(135deg, rgba(249, 115, 22, 0.18) 0%, rgba(245, 158, 11, 0.10) 100%)"
              : "linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(249, 115, 22, 0.06) 100%)",
          boxShadow: completed
            ? "0 10px 40px -6px rgba(16, 185, 129, 0.35), 0 0 60px -12px rgba(52, 211, 153, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)"
            : isNearEnd
              ? `0 10px 40px -6px rgba(249, 115, 22, 0.4), 0 0 60px -12px rgba(245, 158, 11, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)`
              : `0 10px 40px -6px rgba(245, 158, 11, ${0.12 + glowIntensity * 0.25}), inset 0 1px 0 rgba(255,255,255,0.1)`,
        }}
      >
        {/* Animated background glow */}
        {!completed && isActive && (
          <div
            className={`absolute inset-0 rounded-2xl transition-opacity duration-1000 pointer-events-none ${
              isNearEnd ? "animate-pulse" : ""
            }`}
            style={{
              background: isNearEnd
                ? `radial-gradient(ellipse at 30% 50%, rgba(249, 115, 22, 0.15) 0%, transparent 60%)`
                : `radial-gradient(ellipse at 30% 50%, rgba(245, 158, 11, ${0.05 + glowIntensity * 0.1}) 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Sparkle particles near completion */}
        {isNearEnd && !completed && (
          <>
            <div className="absolute -top-1.5 -right-1.5 h-2.5 w-2.5 rounded-full animate-ping" style={{ background: "hsl(38, 92%, 50%)", opacity: 0.8 }} />
            <div className="absolute -bottom-1 right-6 h-2 w-2 rounded-full animate-ping" style={{ background: "hsl(25, 95%, 53%)", opacity: 0.6, animationDelay: "0.5s" }} />
            <div className="absolute top-2 -left-1 h-1.5 w-1.5 rounded-full animate-ping" style={{ background: "hsl(38, 92%, 50%)", opacity: 0.5, animationDelay: "1s" }} />
          </>
        )}

        {/* Completion celebration particles */}
        {completed && (
          <>
            <div className="absolute -top-2 left-6 h-2 w-2 rounded-full animate-ping" style={{ background: "hsl(160, 84%, 39%)", opacity: 0.7 }} />
            <div className="absolute -right-1 top-3 h-1.5 w-1.5 rounded-full animate-ping" style={{ background: "hsl(160, 84%, 39%)", opacity: 0.5, animationDelay: "0.7s" }} />
          </>
        )}

        {/* Circular progress */}
        <div className="relative h-16 w-16 flex-shrink-0">
          <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
            {/* Track */}
            <circle cx="32" cy="32" r="28" fill="none" strokeWidth="3.5" stroke="hsl(var(--muted) / 0.2)" />
            {/* Progress arc */}
            {!completed && (
              <circle
                cx="32" cy="32" r="28"
                fill="none"
                stroke={isNearEnd ? "url(#dwell-gradient-hot)" : "url(#dwell-gradient)"}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 28}
                strokeDashoffset={(2 * Math.PI * 28) * (1 - progress)}
                className="transition-all duration-700 ease-out"
                style={{
                  filter: isNearEnd
                    ? "drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))"
                    : progress > 0.3
                      ? `drop-shadow(0 0 ${4 + glowIntensity * 4}px rgba(245, 158, 11, ${0.3 + glowIntensity * 0.3}))`
                      : "none",
                }}
              />
            )}
            {/* Completed ring */}
            {completed && (
              <circle
                cx="32" cy="32" r="28"
                fill="none"
                strokeWidth="4"
                stroke="hsl(160, 84%, 39%)"
                style={{ filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))" }}
              />
            )}
            <defs>
              <linearGradient id="dwell-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(38, 92%, 50%)" />
                <stop offset="100%" stopColor="hsl(25, 95%, 53%)" />
              </linearGradient>
              <linearGradient id="dwell-gradient-hot" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(25, 95%, 53%)" />
                <stop offset="100%" stopColor="hsl(0, 90%, 55%)" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            {completed ? (
              <div className="animate-scale-in">
                <Check className="h-7 w-7 text-emerald-500" strokeWidth={3} />
              </div>
            ) : (
              <span
                className={`text-lg font-black tabular-nums transition-colors duration-300 ${
                  isNearEnd ? "text-orange-500" : "text-foreground"
                }`}
              >
                {secondsLeft}
              </span>
            )}
          </div>
        </div>

        {/* Text + next mission */}
        <div className="relative flex flex-col gap-1.5 min-w-0">
          {completed ? (
            <div className="animate-fade-in">
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                +{300 + (scrollClaimed ? scrollDepthCredits : 0)} credits! 🎉
              </span>
              {scrollClaimed && (
                <p className="text-[10px] text-emerald-500/80 font-medium">inkl. +{scrollDepthCredits} scroll-dybde bonus</p>
              )}
              {!scrollClaimed && hasReachedHint && !hasReachedDepth && (
                <p className="text-[10px] font-semibold text-amber-500 animate-pulse mt-0.5 flex items-center gap-1">
                  <ArrowDown className="h-3 w-3 animate-bounce" />
                  Scroll dybere ned for +{scrollDepthCredits} ekstra credits!
                </p>
              )}
              {streakFlash && (
                <p className="text-xs font-bold text-amber-500 animate-pulse mt-0.5">{streakFlash}</p>
              )}
              {currentStreak > 0 && !streakFlash && (
                <p className="text-[10px] text-muted-foreground mt-0.5">🔥 {currentStreak}-dags streak</p>
              )}
              {nextMission ? (
                <Link
                  to={nextMission.path}
                  onClick={() => activateMissionMode()}
                  className="mt-1.5 flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-300 hover:gap-3 group"
                  style={{
                    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(249, 115, 22, 0.08) 100%)",
                    color: "hsl(25, 95%, 45%)",
                  }}
                >
                  <span>Næste: {nextMission.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ) : (
                <p className="text-xs text-muted-foreground mt-0.5">Alle missioner fuldført! 🏆</p>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <MenuIcon iconName="gift" className="h-5 w-5" />
                <span className="text-lg font-bold text-foreground">300 credits</span>
              </div>
              {/* Scroll-depth hints during active timer */}
              {hasScrolled && hasReachedHint && !hasReachedDepth && (
                <p className="text-[10px] font-semibold text-amber-500 animate-pulse mt-0.5 flex items-center gap-1">
                  <ArrowDown className="h-3 w-3 animate-bounce" />
                  Scroll til 70% for +{scrollDepthCredits} bonus!
                </p>
              )}
              {hasScrolled && hasReachedDepth && !completed && (
                <p className="text-[10px] font-semibold text-emerald-500 mt-0.5 flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  +{scrollDepthCredits} bonus klar! Vent tiden ud ⏳
                </p>
              )}
              <span className="text-xs text-muted-foreground">
                {!hasScrolled ? (
                  <span className="flex items-center gap-1.5">
                    <ArrowDown className="h-3 w-3 animate-bounce" />
                    Scroll ned for at starte
                  </span>
                ) : currentMilestone ? (
                  <span className="flex items-center gap-1.5 animate-fade-in font-medium" style={{ color: "hsl(25, 90%, 48%)" }}>
                    <MenuIcon iconName={currentMilestone.iconName} className="h-3.5 w-3.5" />
                    {currentMilestone.text.replace(/\s*[\p{Emoji_Presentation}\p{Extended_Pictographic}]+$/u, "")} – {timeDisplay}
                  </span>
                ) : isActive ? (
                  `Bliv på siden i ${timeDisplay}...`
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
