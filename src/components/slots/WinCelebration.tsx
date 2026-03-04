import { useEffect, useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import "@/styles/slot-animations.css";

interface WinCelebrationProps {
  isActive: boolean;
  winAmount: number;
  bet: number;
  gameId?: string;
  onAnimationComplete?: () => void;
}

interface CoinParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  delay: number;
  color: string;
  spinDuration: number;
}

interface RainCoin {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  color: string;
  spinDuration: number;
}

interface SparkParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  type: "sparkle" | "streak" | "dust" | "burst";
}

interface FloatingSparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  driftX1: number;
  driftY1: number;
  driftX2: number;
  driftY2: number;
  driftX3: number;
  driftY3: number;
  color: string;
}

type WinTier = "nice" | "big" | "mega" | "supermega" | "legendary";

function getTier(multiplier: number): WinTier | null {
  if (multiplier >= 500) return "legendary";
  if (multiplier >= 100) return "supermega";
  if (multiplier >= 50) return "mega";
  if (multiplier >= 25) return "big";
  if (multiplier >= 15) return "nice";
  return null;
}

function getTierFromAmount(displayAmount: number, bet: number): WinTier | null {
  if (bet <= 0) return null;
  return getTier(displayAmount / bet);
}

const TIER_CONFIG: Record<WinTier, {
  label: string;
  emoji: string;
  coins: number;
  sparks: number;
  counterMs: number;
  pulseMs: number;
  fadeMs: number;
  shockwaves: number;
  hasLightning: boolean;
  bgDarkness: number;
  textSizeSm: string;
  textSizeLg: string;
  counterSizeSm: string;
  counterSizeLg: string;
  gradient: string;
  gradientSize: string;
  gradientSpeed: string;
  glowFilter: string;
  strokeWidth: string;
  flashIntensity: number;
  entryAnim: string;
  dividerWidth: string;
}> = {
  nice: {
    label: "NICE WIN!",
    emoji: "",
    coins: 20,
    sparks: 12,
    counterMs: 1500,
    pulseMs: 1800,
    fadeMs: 500,
    shockwaves: 1,
    hasLightning: false,
    bgDarkness: 0.35,
    textSizeSm: "text-3xl",
    textSizeLg: "text-5xl",
    counterSizeSm: "text-2xl",
    counterSizeLg: "text-4xl",
    gradient: "linear-gradient(135deg, #ffd700, #ffb300, #ffd700)",
    gradientSize: "200% 200%",
    gradientSpeed: "gradient-shift 2s ease infinite",
    glowFilter: "drop-shadow(0 0 15px rgba(255,215,0,0.7)) drop-shadow(0 0 30px rgba(255,180,0,0.3))",
    strokeWidth: "0px",
    flashIntensity: 0.3,
    entryAnim: "animate-[bigwin-burst_0.35s_cubic-bezier(0.2,1.2,0.4,1)_forwards]",
    dividerWidth: "w-32 sm:w-48",
  },
  big: {
    label: "BIG WIN!",
    emoji: "",
    coins: 50,
    sparks: 25,
    counterMs: 2200,
    pulseMs: 2200,
    fadeMs: 600,
    shockwaves: 2,
    hasLightning: false,
    bgDarkness: 0.45,
    textSizeSm: "text-4xl",
    textSizeLg: "text-6xl",
    counterSizeSm: "text-3xl",
    counterSizeLg: "text-5xl",
    gradient: "linear-gradient(135deg, #ffd700, #ffb300, #ffd700)",
    gradientSize: "200% 200%",
    gradientSpeed: "gradient-shift 1.5s ease infinite",
    glowFilter: "drop-shadow(0 0 20px rgba(255,215,0,0.9)) drop-shadow(0 0 40px rgba(255,180,0,0.5))",
    strokeWidth: "1px",
    flashIntensity: 0.4,
    entryAnim: "animate-[bigwin-burst_0.4s_cubic-bezier(0.2,1.2,0.4,1)_forwards]",
    dividerWidth: "w-40 sm:w-64",
  },
  mega: {
    label: "MEGA WIN!",
    emoji: "🔥",
    coins: 80,
    sparks: 45,
    counterMs: 3000,
    pulseMs: 2800,
    fadeMs: 700,
    shockwaves: 3,
    hasLightning: false,
    bgDarkness: 0.55,
    textSizeSm: "text-4xl",
    textSizeLg: "text-7xl",
    counterSizeSm: "text-3xl",
    counterSizeLg: "text-6xl",
    gradient: "linear-gradient(135deg, #ffd700, #ff9500, #ffd700, #ffb300)",
    gradientSize: "300% 300%",
    gradientSpeed: "gradient-shift 1s ease infinite",
    glowFilter: "drop-shadow(0 0 25px rgba(255,215,0,1)) drop-shadow(0 0 50px rgba(255,150,0,0.6)) drop-shadow(0 0 80px rgba(255,100,0,0.3))",
    strokeWidth: "1px",
    flashIntensity: 0.5,
    entryAnim: "animate-[gigantisk-slam_0.5s_cubic-bezier(0.22,1.2,0.36,1)_forwards]",
    dividerWidth: "w-48 sm:w-72",
  },
  supermega: {
    label: "SUPER MEGA WIN!",
    emoji: "👑",
    coins: 120,
    sparks: 60,
    counterMs: 4000,
    pulseMs: 3500,
    fadeMs: 900,
    shockwaves: 4,
    hasLightning: true,
    bgDarkness: 0.65,
    textSizeSm: "text-4xl",
    textSizeLg: "text-7xl",
    counterSizeSm: "text-3xl",
    counterSizeLg: "text-6xl",
    gradient: "linear-gradient(135deg, #fff200, #ff9500, #ff5500, #fff200, #ff9500)",
    gradientSize: "400% 400%",
    gradientSpeed: "gradient-shift 0.6s linear infinite, gigantisk-text-pulse 1.2s ease-in-out infinite",
    glowFilter: "drop-shadow(0 0 30px rgba(255,200,0,1)) drop-shadow(0 0 60px rgba(255,140,0,0.7)) drop-shadow(0 0 100px rgba(255,80,0,0.4))",
    strokeWidth: "1.5px",
    flashIntensity: 0.6,
    entryAnim: "animate-[gigantisk-slam_0.6s_cubic-bezier(0.22,1.2,0.36,1)_forwards]",
    dividerWidth: "w-56 sm:w-80",
  },
  legendary: {
    label: "LEGENDARY WIN!!!",
    emoji: "👑",
    coins: 200,
    sparks: 80,
    counterMs: 5500,
    pulseMs: 4500,
    fadeMs: 1200,
    shockwaves: 6,
    hasLightning: true,
    bgDarkness: 0.75,
    textSizeSm: "text-5xl",
    textSizeLg: "text-8xl",
    counterSizeSm: "text-4xl",
    counterSizeLg: "text-7xl",
    gradient: "linear-gradient(135deg, #fff200, #ff9500, #ff5500, #ff0000, #fff200, #ff9500)",
    gradientSize: "500% 500%",
    gradientSpeed: "gradient-shift 0.4s linear infinite, gigantisk-text-pulse 0.8s ease-in-out infinite",
    glowFilter: "drop-shadow(0 0 30px rgba(255,200,0,1)) drop-shadow(0 0 60px rgba(255,140,0,0.8)) drop-shadow(0 0 120px rgba(255,60,0,0.5))",
    strokeWidth: "2px",
    flashIntensity: 0.7,
    entryAnim: "animate-[gigantisk-slam_0.7s_cubic-bezier(0.22,1.2,0.36,1)_forwards]",
    dividerWidth: "w-64 sm:w-96",
  },
};

const GOLD_PALETTE = [
  "hsl(45, 100%, 50%)", "hsl(36, 100%, 50%)", "hsl(51, 100%, 60%)",
  "hsl(42, 95%, 55%)", "hsl(38, 90%, 45%)", "hsl(48, 100%, 65%)",
];

const FIRE_PALETTE = [
  "hsl(45, 100%, 55%)", "hsl(30, 100%, 50%)", "hsl(15, 100%, 50%)",
  "hsl(0, 100%, 55%)", "hsl(50, 100%, 65%)", "hsl(40, 100%, 60%)",
];

function makePalette(tier: WinTier): string[] {
  if (tier === "legendary" || tier === "supermega") return [...GOLD_PALETTE, ...FIRE_PALETTE];
  return GOLD_PALETTE;
}

function makeCoins(count: number, palette: string[]): CoinParticle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 6;
    return {
      id: i,
      x: 50 + (Math.random() - 0.5) * 10,
      y: 50 + (Math.random() - 0.5) * 10,
      vx: Math.cos(angle) * speed * (30 + Math.random() * 20),
      vy: Math.sin(angle) * speed * (25 + Math.random() * 15) - 20,
      size: 14 + Math.random() * 14,
      delay: Math.random() * 0.5,
      color: palette[Math.floor(Math.random() * palette.length)],
      spinDuration: 0.3 + Math.random() * 0.4,
    };
  });
}

function makeRainCoins(count: number, palette: string[]): RainCoin[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 10 + Math.random() * 16,
    delay: Math.random() * 3,
    duration: 1.5 + Math.random() * 2,
    rotation: 360 + Math.random() * 720,
    color: palette[Math.floor(Math.random() * palette.length)],
    spinDuration: 0.3 + Math.random() * 0.5,
  }));
}

function makeSparks(count: number, palette: string[]): SparkParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 6,
    color: palette[Math.floor(Math.random() * palette.length)],
    delay: Math.random() * 1.5,
    duration: 1 + Math.random() * 2,
    type: (["sparkle", "streak", "dust", "burst"] as const)[Math.floor(Math.random() * 4)],
  }));
}

function makeFloatingSparkles(count: number, palette: string[]): FloatingSparkle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: 20 + Math.random() * 60,
    size: 3 + Math.random() * 5,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 3,
    driftX1: (Math.random() - 0.5) * 20,
    driftY1: -5 - Math.random() * 15,
    driftX2: (Math.random() - 0.5) * 30,
    driftY2: -20 - Math.random() * 30,
    driftX3: (Math.random() - 0.5) * 15,
    driftY3: -40 - Math.random() * 30,
    color: palette[Math.floor(Math.random() * palette.length)],
  }));
}

export function WinCelebration({ isActive, winAmount, bet, onAnimationComplete }: WinCelebrationProps) {
  const [coins, setCoins] = useState<CoinParticle[]>([]);
  const [sparks, setSparks] = useState<SparkParticle[]>([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [counterSkipped, setCounterSkipped] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [lightningFlash, setLightningFlash] = useState(false);
  const [screenFlash, setScreenFlash] = useState(false);
  // Track tier upgrades during counter
  const [currentDisplayTier, setCurrentDisplayTier] = useState<WinTier>("nice");
  const hasTriggeredCompleteRef = useRef(false);
  const skipRef = useRef(false);
  const clickCountRef = useRef(0);
  const lightningIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const finalMultiplier = bet > 0 ? winAmount / bet : 0;
  const finalTier = getTier(finalMultiplier);

  // Use final tier config for counter duration & pulse, but display tier for visuals
  const finalCfg = finalTier ? TIER_CONFIG[finalTier] : TIER_CONFIG.nice;
  const displayCfg = TIER_CONFIG[currentDisplayTier];

  const displayAmount = useAnimatedCounter(showOverlay ? winAmount : 0, {
    duration: finalCfg.counterMs,
    startFrom: 0,
    playSound: showOverlay,
    isBigWin: true,
    skipToEnd: counterSkipped,
    speedMultiplier,
  });

  // Progressive tier upgrade during counter
  useEffect(() => {
    if (!showOverlay || bet <= 0) return;
    const tierNow = getTierFromAmount(displayAmount, bet);
    if (tierNow && tierNow !== currentDisplayTier) {
      const tierOrder: WinTier[] = ["nice", "big", "mega", "supermega", "legendary"];
      if (tierOrder.indexOf(tierNow) > tierOrder.indexOf(currentDisplayTier)) {
        setCurrentDisplayTier(tierNow);
        // Flash on tier upgrade
        setScreenFlash(true);
        setTimeout(() => setScreenFlash(false), 250);
      }
    }
  }, [displayAmount, bet, showOverlay, currentDisplayTier]);

  const handleSkip = useCallback(() => {
    if (hasTriggeredCompleteRef.current) return;
    clickCountRef.current += 1;
    const clicks = clickCountRef.current;

    if (!isPulsing) {
      const newSpeed = Math.min(1 + clicks * 2, 16);
      setSpeedMultiplier(newSpeed);
      if (clicks >= 5 || newSpeed >= 14) setCounterSkipped(true);
      return;
    }
    if (skipRef.current) return;
    skipRef.current = true;
    dismiss();
  }, [isPulsing]);

  const dismiss = useCallback(() => {
    setIsPulsing(false);
    setIsFadingOut(true);
    if (lightningIntervalRef.current) clearInterval(lightningIntervalRef.current);
    setTimeout(() => {
      setShowOverlay(false);
      setCoins([]);
      setSparks([]);
      setIsFadingOut(false);
      setScreenFlash(false);
      hasTriggeredCompleteRef.current = true;
      onAnimationComplete?.();
    }, displayCfg.fadeMs);
  }, [onAnimationComplete, displayCfg.fadeMs]);

  // Counter done → pulse → auto-dismiss
  useEffect(() => {
    if (showOverlay && displayAmount === winAmount && winAmount > 0 && !hasTriggeredCompleteRef.current) {
      setIsPulsing(true);
      const t = setTimeout(() => {
        if (!skipRef.current) dismiss();
      }, finalCfg.pulseMs);
      return () => clearTimeout(t);
    }
  }, [displayAmount, winAmount, showOverlay, finalCfg.pulseMs, dismiss]);

  // Lightning flashes for supermega / legendary
  useEffect(() => {
    if (showOverlay && displayCfg.hasLightning) {
      const flash = () => {
        setLightningFlash(true);
        setTimeout(() => setLightningFlash(false), 120);
      };
      flash();
      lightningIntervalRef.current = setInterval(flash, 600 + Math.random() * 1000);
      return () => {
        if (lightningIntervalRef.current) clearInterval(lightningIntervalRef.current);
      };
    } else {
      if (lightningIntervalRef.current) clearInterval(lightningIntervalRef.current);
      lightningIntervalRef.current = null;
    }
  }, [showOverlay, displayCfg.hasLightning]);

  // Main activation
  useEffect(() => {
    if (!isActive || winAmount <= 0 || !finalTier) {
      setCoins([]);
      setSparks([]);
      setShowOverlay(false);
      setIsFadingOut(false);
      setIsPulsing(false);
      setScreenFlash(false);
      setCounterSkipped(false);
      setSpeedMultiplier(1);
      setCurrentDisplayTier("nice");
      hasTriggeredCompleteRef.current = false;
      skipRef.current = false;
      clickCountRef.current = 0;
      return;
    }

    setScreenFlash(true);
    setTimeout(() => setScreenFlash(false), 300);

    const palette = makePalette(finalTier);
    setCoins(makeCoins(finalCfg.coins, palette));
    setSparks(makeSparks(finalCfg.sparks, palette));
    setCurrentDisplayTier("nice"); // Start from lowest, will upgrade during counter
    setShowOverlay(true);
  }, [isActive, winAmount, bet]);

  if (!isActive || winAmount <= 0 || !finalTier) return null;

  const cfg = displayCfg;
  const isHighTier = currentDisplayTier === "supermega" || currentDisplayTier === "legendary";

  return (
    <>
      {/* Darkened background */}
      {showOverlay && (
        <div
          className={cn(
            "absolute inset-0 z-[998] pointer-events-none transition-opacity",
            isFadingOut ? "opacity-0" : "opacity-100"
          )}
          style={{
            background: `radial-gradient(ellipse at center, rgba(0,0,0,${cfg.bgDarkness * 0.7}) 0%, rgba(0,0,0,${cfg.bgDarkness}) 100%)`,
            transitionDuration: `${cfg.fadeMs}ms`,
          }}
        />
      )}

      {/* Screen flash on entry & tier upgrades */}
      {screenFlash && (
        <div
          className="absolute inset-0 z-[1001] pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(255,215,0,${cfg.flashIntensity}) 0%, rgba(255,180,0,${cfg.flashIntensity * 0.5}) 40%, transparent 70%)`,
            animation: "win-screen-flash 0.35s ease-out forwards",
          }}
        />
      )}

      {/* Radial light burst */}
      {showOverlay && (
        <div
          className={cn(
            "absolute inset-0 z-[999] pointer-events-none",
            isFadingOut && "opacity-0 transition-opacity"
          )}
          style={{
            background: `radial-gradient(ellipse at center, rgba(255,215,0,${0.08 + cfg.bgDarkness * 0.2}) 0%, transparent 65%)`,
            animation: "win-radial-pulse 2s ease-in-out infinite",
            transitionDuration: `${cfg.fadeMs}ms`,
          }}
        />
      )}

      {/* Lightning flashes */}
      {showOverlay && cfg.hasLightning && lightningFlash && (
        <div
          className="absolute inset-0 z-[1000] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.35) 0%, transparent 60%)",
            animation: "win-lightning 0.15s ease-out forwards",
          }}
        />
      )}

      {/* Coin explosion */}
      {showOverlay && (
        <div
          className={cn(
            "absolute inset-0 z-[1002] pointer-events-none overflow-hidden",
            isFadingOut && "opacity-0 transition-opacity"
          )}
          style={{ transitionDuration: `${cfg.fadeMs}ms` }}
        >
          {coins.map((coin) => (
            <div
              key={coin.id}
              className="absolute"
              style={{
                left: `${coin.x}%`,
                top: `${coin.y}%`,
                width: `${coin.size}px`,
                height: `${coin.size}px`,
                ["--coin-tx" as string]: `${coin.vx}px`,
                ["--coin-ty" as string]: `${coin.vy + 300}px`,
                animation: `coin-explode ${1.5 + Math.random()}s cubic-bezier(0.25,0.46,0.45,0.94) ${coin.delay}s forwards`,
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `radial-gradient(circle at 35% 30%, hsl(48,100%,85%), ${coin.color}, hsl(36,80%,25%))`,
                  boxShadow: `0 0 8px ${coin.color}, 0 0 16px ${coin.color}60, inset 0 -2px 4px rgba(0,0,0,0.3)`,
                  border: "1px solid hsl(45,80%,70%)",
                  animation: `coin-spin-3d ${coin.spinDuration}s linear infinite`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Sparkles & particles */}
      {showOverlay && (
        <div
          className={cn(
            "absolute inset-0 z-[1003] pointer-events-none overflow-hidden",
            isFadingOut && "opacity-0 transition-opacity"
          )}
          style={{ transitionDuration: `${cfg.fadeMs}ms` }}
        >
          {sparks.map((s) => (
            <div
              key={s.id}
              className="absolute"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                animation: s.type === "streak"
                  ? `spark-streak ${s.duration}s ease-out ${s.delay}s infinite`
                  : s.type === "burst"
                  ? `spark-burst ${s.duration}s ease-out ${s.delay}s forwards`
                  : `spark-float ${s.duration}s ease-in-out ${s.delay}s infinite`,
              }}
            >
              {s.type === "sparkle" && (
                <div style={{
                  width: `${s.size}px`, height: `${s.size}px`,
                  background: s.color, borderRadius: "50%",
                  boxShadow: `0 0 ${s.size * 2}px ${s.color}, 0 0 ${s.size * 4}px ${s.color}60`,
                }} />
              )}
              {s.type === "streak" && (
                <div style={{
                  width: "2px", height: `${10 + s.size * 4}px`,
                  background: `linear-gradient(180deg, transparent, ${s.color}, transparent)`,
                  boxShadow: `0 0 6px ${s.color}`,
                }} />
              )}
              {s.type === "dust" && (
                <div className="text-xs" style={{ color: s.color, textShadow: `0 0 8px ${s.color}` }}>✦</div>
              )}
              {s.type === "burst" && (
                <div className="text-sm" style={{ color: s.color, textShadow: `0 0 12px ${s.color}` }}>★</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Shockwave rings */}
      {showOverlay && (
        <div className="absolute inset-0 z-[1001] pointer-events-none">
          {Array.from({ length: cfg.shockwaves }).map((_, i) => (
            <div
              key={`shock-${i}`}
              className="absolute"
              style={{
                top: "50%", left: "50%",
                width: "80px", height: "80px", borderRadius: "50%",
                border: `3px solid hsla(45, 100%, 60%, ${Math.max(0.2, 0.7 - i * 0.1)})`,
                boxShadow: `0 0 20px hsla(45, 100%, 50%, ${Math.max(0.1, 0.4 - i * 0.05)})`,
                animation: `shockwave 1s ease-out ${i * 0.12}s forwards`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main text overlay */}
      {showOverlay && (
        <div
          onClick={handleSkip}
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center z-[1005] cursor-pointer",
            isFadingOut && "opacity-0 scale-75 transition-all",
          )}
          style={{ transitionDuration: `${cfg.fadeMs}ms` }}
        >
          {/* Tier text container with entry animation */}
          <div className={cfg.entryAnim} key={currentDisplayTier}>
            {/* Emoji for mega+ tiers */}
            {cfg.emoji && (
              <div
                className="text-center text-5xl sm:text-7xl mb-1"
                style={{
                  animation: "crown-bounce 1.5s ease-in-out infinite",
                  filter: "drop-shadow(0 0 20px rgba(255,215,0,0.9))",
                }}
              >
                {cfg.emoji}
              </div>
            )}

            {/* Win title */}
            <h2
              className={cn(
                "font-black tracking-widest text-center select-none",
                cfg.textSizeSm, `sm:${cfg.textSizeLg}`,
                isHighTier && "animate-[epic-win-shake_0.15s_ease-in-out_infinite]"
              )}
              style={{
                background: cfg.gradient,
                backgroundSize: cfg.gradientSize,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: cfg.gradientSpeed,
                filter: cfg.glowFilter,
                WebkitTextStrokeWidth: cfg.strokeWidth,
                WebkitTextStrokeColor: "rgba(255,180,0,0.3)",
              }}
            >
              {cfg.label}
            </h2>
          </div>

          {/* Divider */}
          <div
            className={cn("mx-auto my-3 sm:my-4", cfg.dividerWidth)}
            style={{
              height: "2px",
              background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.8), rgba(255,215,0,1), rgba(255,215,0,0.8), transparent)",
              boxShadow: "0 0 10px rgba(255,215,0,0.5)",
              animation: "divider-glow 1.5s ease-in-out infinite",
            }}
          />

          {/* Win counter */}
          <div
            className={cn(
              "font-extrabold text-center select-none tabular-nums",
              cfg.counterSizeSm, `sm:${cfg.counterSizeLg}`,
              isPulsing && "animate-[win-amount-pulse-loop_0.6s_ease-in-out_infinite]",
              !isPulsing && !counterSkipped && "animate-[counter-tick_0.1s_linear_infinite]"
            )}
            style={{
              color: "#ffd700",
              textShadow: isHighTier
                ? "0 0 20px rgba(255,215,0,1), 0 0 40px rgba(255,180,0,0.8), 0 0 80px rgba(255,140,0,0.5), 0 2px 4px rgba(0,0,0,0.5)"
                : "0 0 20px rgba(255,215,0,0.9), 0 0 40px rgba(255,180,0,0.5), 0 2px 4px rgba(0,0,0,0.4)",
              filter: isHighTier
                ? "drop-shadow(0 0 15px rgba(255,215,0,0.8))"
                : "drop-shadow(0 0 10px rgba(255,215,0,0.6))",
            }}
          >
            {displayAmount.toLocaleString("da-DK")} POINT!
          </div>

          {/* Tap hints */}
          {!isPulsing && !counterSkipped && (
            <p className="text-white/50 text-xs sm:text-sm mt-3 animate-pulse select-none">
              Tryk for at tælle hurtigere
            </p>
          )}
          {isPulsing && (
            <p className="text-white/40 text-xs sm:text-sm mt-3 animate-pulse select-none">
              Tryk for at fortsætte
            </p>
          )}
        </div>
      )}

      {/* Edge vignette glow */}
      {showOverlay && (
        <div
          className={cn(
            "absolute inset-0 z-[997] pointer-events-none rounded-lg",
            isFadingOut && "opacity-0 transition-opacity"
          )}
          style={{
            boxShadow: isHighTier
              ? "inset 0 0 60px rgba(255,140,0,0.3), inset 0 0 120px rgba(255,80,0,0.15)"
              : "inset 0 0 20px rgba(255,215,0,0.1), inset 0 0 40px rgba(255,180,0,0.05)",
            transitionDuration: `${cfg.fadeMs}ms`,
          }}
        />
      )}
    </>
  );
}
