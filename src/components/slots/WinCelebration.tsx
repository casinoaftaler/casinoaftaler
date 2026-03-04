import { useEffect, useState, useRef, useMemo, useCallback } from "react";
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
  rotation: number;
  rotSpeed: number;
  size: number;
  delay: number;
  color: string;
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

const GOLD_PALETTE = [
  "hsl(45, 100%, 50%)", "hsl(36, 100%, 50%)", "hsl(51, 100%, 60%)",
  "hsl(42, 95%, 55%)", "hsl(38, 90%, 45%)", "hsl(48, 100%, 65%)",
];

const FIRE_PALETTE = [
  "hsl(45, 100%, 55%)", "hsl(30, 100%, 50%)", "hsl(15, 100%, 50%)",
  "hsl(0, 100%, 55%)", "hsl(50, 100%, 65%)", "hsl(40, 100%, 60%)",
];

export function WinCelebration({ isActive, winAmount, bet, gameId, onAnimationComplete }: WinCelebrationProps) {
  const [coins, setCoins] = useState<CoinParticle[]>([]);
  const [sparks, setSparks] = useState<SparkParticle[]>([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [counterSkipped, setCounterSkipped] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [lightningFlash, setLightningFlash] = useState(false);
  const [screenFlash, setScreenFlash] = useState(false);
  const hasTriggeredCompleteRef = useRef(false);
  const skipRef = useRef(false);
  const clickCountRef = useRef(0);
  const lightningIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const winMultiplier = bet > 0 ? winAmount / bet : 0;
  const isBigWin = winMultiplier >= 20;
  const isGigantisk = winMultiplier >= 100;

  const coinCount = isGigantisk ? 160 : 65;
  const sparkCount = isGigantisk ? 80 : 30;
  const counterDuration = isGigantisk ? 4000 : 2000;
  const pulseDuration = isGigantisk ? 5000 : 2500;
  const fadeDuration = isGigantisk ? 1200 : 600;

  const displayAmount = useAnimatedCounter(showOverlay ? winAmount : 0, {
    duration: counterDuration,
    startFrom: 0,
    playSound: showOverlay,
    isBigWin: true,
    skipToEnd: counterSkipped,
    speedMultiplier,
  });

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
    setTimeout(() => {
      setShowOverlay(false);
      setCoins([]);
      setSparks([]);
      setIsFadingOut(false);
      setScreenFlash(false);
      hasTriggeredCompleteRef.current = true;
      onAnimationComplete?.();
    }, fadeDuration);
  }, [onAnimationComplete, fadeDuration]);

  // Counter done → pulse → auto-dismiss
  useEffect(() => {
    if (showOverlay && displayAmount === winAmount && winAmount > 0 && !hasTriggeredCompleteRef.current) {
      setIsPulsing(true);
      const t = setTimeout(() => {
        if (!skipRef.current) dismiss();
      }, pulseDuration);
      return () => clearTimeout(t);
    }
  }, [displayAmount, winAmount, showOverlay, pulseDuration, dismiss]);

  // Lightning flashes for GIGANTISK
  useEffect(() => {
    if (showOverlay && isGigantisk) {
      const flash = () => {
        setLightningFlash(true);
        setTimeout(() => setLightningFlash(false), 120);
      };
      flash();
      lightningIntervalRef.current = setInterval(flash, 800 + Math.random() * 1200);
      return () => {
        if (lightningIntervalRef.current) clearInterval(lightningIntervalRef.current);
      };
    }
    return () => {
      if (lightningIntervalRef.current) clearInterval(lightningIntervalRef.current);
    };
  }, [showOverlay, isGigantisk]);

  // Main activation
  useEffect(() => {
    if (!isActive || winAmount <= 0 || !isBigWin) {
      setCoins([]);
      setSparks([]);
      setShowOverlay(false);
      setIsFadingOut(false);
      setIsPulsing(false);
      setScreenFlash(false);
      setCounterSkipped(false);
      setSpeedMultiplier(1);
      hasTriggeredCompleteRef.current = false;
      skipRef.current = false;
      clickCountRef.current = 0;
      return;
    }

    // Screen flash on entry
    setScreenFlash(true);
    setTimeout(() => setScreenFlash(false), 300);

    // Generate coins — explode from center
    const palette = isGigantisk ? FIRE_PALETTE : GOLD_PALETTE;
    const newCoins: CoinParticle[] = Array.from({ length: coinCount }, (_, i) => {
      const angle = (Math.random() * Math.PI * 2);
      const speed = 2 + Math.random() * 6;
      return {
        id: i,
        x: 50 + (Math.random() - 0.5) * 10,
        y: 50 + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed * (30 + Math.random() * 20),
        vy: Math.sin(angle) * speed * (25 + Math.random() * 15) - 20,
        rotation: Math.random() * 360,
        rotSpeed: 200 + Math.random() * 600,
        size: 16 + Math.random() * 16,
        delay: Math.random() * 0.4,
        color: palette[Math.floor(Math.random() * palette.length)],
      };
    });

    const newSparks: SparkParticle[] = Array.from({ length: sparkCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 6,
      color: palette[Math.floor(Math.random() * palette.length)],
      delay: Math.random() * 1.5,
      duration: 1 + Math.random() * 2,
      type: (["sparkle", "streak", "dust", "burst"] as const)[Math.floor(Math.random() * 4)],
    }));

    setCoins(newCoins);
    setSparks(newSparks);
    setShowOverlay(true);
  }, [isActive, winAmount, bet]);

  if (!isActive || winAmount <= 0 || !isBigWin) return null;

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
            background: isGigantisk
              ? "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%)"
              : "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 100%)",
            transitionDuration: `${fadeDuration}ms`,
          }}
        />
      )}

      {/* Gold screen flash on entry */}
      {screenFlash && (
        <div
          className="absolute inset-0 z-[1001] pointer-events-none"
          style={{
            background: isGigantisk
              ? "radial-gradient(circle, rgba(255,200,0,0.7) 0%, rgba(255,100,0,0.4) 40%, transparent 70%)"
              : "radial-gradient(circle, rgba(255,215,0,0.5) 0%, rgba(255,180,0,0.2) 50%, transparent 80%)",
            animation: "win-screen-flash 0.4s ease-out forwards",
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
            background: isGigantisk
              ? "radial-gradient(ellipse at center, rgba(255,200,0,0.25) 0%, rgba(255,100,0,0.12) 30%, transparent 65%)"
              : "radial-gradient(ellipse at center, rgba(255,215,0,0.15) 0%, rgba(255,180,0,0.05) 40%, transparent 70%)",
            animation: "win-radial-pulse 2s ease-in-out infinite",
            transitionDuration: `${fadeDuration}ms`,
          }}
        />
      )}

      {/* Lightning flashes for GIGANTISK */}
      {showOverlay && isGigantisk && lightningFlash && (
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
          style={{ transitionDuration: `${fadeDuration}ms` }}
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
                animationDelay: `${coin.delay}s`,
                // Use CSS custom properties for trajectory
                ["--coin-tx" as string]: `${coin.vx}px`,
                ["--coin-ty" as string]: `${coin.vy + 300}px`,
                ["--coin-rot" as string]: `${coin.rotSpeed}deg`,
                animation: `coin-explode ${1.5 + Math.random() * 1}s cubic-bezier(0.25,0.46,0.45,0.94) ${coin.delay}s forwards`,
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `radial-gradient(circle at 35% 30%, hsl(48,100%,85%), ${coin.color}, hsl(36,80%,25%))`,
                  boxShadow: `0 0 8px ${coin.color}, 0 0 16px ${coin.color}60, inset 0 -2px 4px rgba(0,0,0,0.3)`,
                  border: "1px solid hsl(45,80%,70%)",
                  animation: `coin-spin-3d ${0.3 + Math.random() * 0.4}s linear infinite`,
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
          style={{ transitionDuration: `${fadeDuration}ms` }}
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
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  background: s.color,
                  borderRadius: "50%",
                  boxShadow: `0 0 ${s.size * 2}px ${s.color}, 0 0 ${s.size * 4}px ${s.color}60`,
                }} />
              )}
              {s.type === "streak" && (
                <div style={{
                  width: "2px",
                  height: `${10 + s.size * 4}px`,
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
          {Array.from({ length: isGigantisk ? 5 : 2 }).map((_, i) => (
            <div
              key={`shock-${i}`}
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: `3px solid hsla(45, 100%, 60%, ${0.7 - i * 0.1})`,
                boxShadow: `0 0 20px hsla(45, 100%, 50%, ${0.4 - i * 0.05})`,
                animation: `shockwave 1s ease-out ${i * 0.15}s forwards`,
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
          style={{ transitionDuration: `${fadeDuration}ms` }}
        >
          {/* Win title */}
          <div
            className={cn(
              isGigantisk
                ? "animate-[gigantisk-slam_0.6s_cubic-bezier(0.22,1.2,0.36,1)_forwards]"
                : "animate-[bigwin-burst_0.4s_cubic-bezier(0.2,1.2,0.4,1)_forwards]"
            )}
          >
            {isGigantisk && (
              <div
                className="text-center text-5xl sm:text-7xl mb-1"
                style={{
                  animation: "crown-bounce 1.5s ease-in-out infinite",
                  filter: "drop-shadow(0 0 20px rgba(255,215,0,0.9))",
                }}
              >
                👑
              </div>
            )}
            <h2
              className={cn(
                "font-black tracking-widest text-center select-none",
                isGigantisk ? "text-5xl sm:text-8xl" : "text-4xl sm:text-6xl"
              )}
              style={{
                background: isGigantisk
                  ? "linear-gradient(135deg, #fff200, #ff9500, #ff5500, #fff200, #ff9500)"
                  : "linear-gradient(135deg, #ffd700, #ffb300, #ffd700)",
                backgroundSize: isGigantisk ? "400% 400%" : "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: isGigantisk
                  ? "gradient-shift 0.5s linear infinite, gigantisk-text-pulse 1s ease-in-out infinite"
                  : "gradient-shift 1.5s ease infinite",
                filter: isGigantisk
                  ? "drop-shadow(0 0 30px rgba(255,200,0,1)) drop-shadow(0 0 60px rgba(255,140,0,0.7)) drop-shadow(0 0 120px rgba(255,80,0,0.4))"
                  : "drop-shadow(0 0 20px rgba(255,215,0,0.9)) drop-shadow(0 0 40px rgba(255,180,0,0.5))",
                WebkitTextStrokeWidth: isGigantisk ? "2px" : "1px",
                WebkitTextStrokeColor: "rgba(255,180,0,0.3)",
              }}
            >
              {isGigantisk ? "GIGANTISK WIN!!!" : "BIG WIN!"}
            </h2>
          </div>

          {/* Divider */}
          <div
            className={cn("mx-auto my-3 sm:my-4", isGigantisk ? "w-64 sm:w-96" : "w-40 sm:w-64")}
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
              isGigantisk ? "text-4xl sm:text-7xl" : "text-3xl sm:text-5xl",
              isPulsing && "animate-[win-amount-pulse-loop_0.6s_ease-in-out_infinite]",
              !isPulsing && !counterSkipped && "animate-[counter-tick_0.1s_linear_infinite]"
            )}
            style={{
              color: "#ffd700",
              textShadow: isGigantisk
                ? "0 0 20px rgba(255,215,0,1), 0 0 40px rgba(255,180,0,0.8), 0 0 80px rgba(255,140,0,0.5), 0 2px 4px rgba(0,0,0,0.5)"
                : "0 0 20px rgba(255,215,0,0.9), 0 0 40px rgba(255,180,0,0.5), 0 2px 4px rgba(0,0,0,0.4)",
              filter: isGigantisk
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
            boxShadow: isGigantisk
              ? "inset 0 0 60px rgba(255,140,0,0.3), inset 0 0 120px rgba(255,80,0,0.15)"
              : "inset 0 0 30px rgba(255,215,0,0.15), inset 0 0 60px rgba(255,180,0,0.08)",
            transitionDuration: `${fadeDuration}ms`,
          }}
        />
      )}
    </>
  );
}
