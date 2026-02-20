import { useEffect, useState, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  type: "coin" | "sparkle" | "star" | "orb" | "rune" | "lightning" | "ring";
  delay: number;
  rising?: boolean;
}

interface AmbientOrb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

interface WinCelebrationProps {
  isActive: boolean;
  winAmount: number;
  bet: number;
  gameId?: string;
  onAnimationComplete?: () => void;
}

const EGYPTIAN_COLORS = [
  "hsl(45, 100%, 50%)",
  "hsl(36, 100%, 50%)",
  "hsl(51, 100%, 60%)",
  "hsl(42, 95%, 55%)",
];

const WIZARD_COLORS = [
  "hsl(270, 80%, 60%)",
  "hsl(260, 90%, 55%)",
  "hsl(280, 70%, 65%)",
  "hsl(250, 75%, 60%)",
  "hsl(290, 85%, 70%)",
  "hsl(240, 70%, 55%)",
];

const WIZARD_RUNES = ["᛭", "ᚹ", "ᛟ", "ᛏ", "ᚨ", "ᛗ", "ᚠ", "ᛉ"];
const EGYPTIAN_HIEROGLYPHS = ["𓂀", "𓃭", "𓆣", "𓇳", "𓊝", "𓋴", "𓌙", "𓏏"];

export function WinCelebration({ isActive, winAmount, bet, gameId, onAnimationComplete }: WinCelebrationProps) {
  const isWizard = gameId === "rise-of-fedesvin";
  const COLORS = isWizard ? WIZARD_COLORS : EGYPTIAN_COLORS;
  const SYMBOLS = isWizard ? WIZARD_RUNES : EGYPTIAN_HIEROGLYPHS;
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showBigWin, setShowBigWin] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showShockwave, setShowShockwave] = useState(false);
  const hasTriggeredCompleteRef = useRef(false);
  
  const winMultiplier = bet > 0 ? winAmount / bet : 0;
  const isBigWin = winMultiplier >= 10;
  const isMegaWin = winMultiplier >= 50;
  const isEpicWin = winMultiplier >= 100;

  const pulseDuration = isEpicWin ? 1200 : isMegaWin ? 900 : 750;
  const counterDuration = isEpicWin ? 2500 : isMegaWin ? 2000 : 1500;
  
  const displayAmount = useAnimatedCounter(showBigWin ? winAmount : 0, { 
    duration: counterDuration, 
    startFrom: 0,
    playSound: showBigWin,
    isBigWin: true
  });

  // Theme colors for effects
  const themeColors = useMemo(() => {
    if (isWizard) {
      return {
        primary: "168, 85, 247",      // purple
        secondary: "236, 72, 153",    // pink
        accent: "6, 182, 212",        // cyan
        glow: "rgba(168, 85, 247,",
        vignetteColor: "rgba(0,0,0,",
      };
    }
    return {
      primary: "251, 191, 36",        // amber/gold
      secondary: "255, 107, 107",     // coral/red
      accent: "255, 215, 0",          // pure gold
      glow: "rgba(251, 191, 36,",
      vignetteColor: "rgba(0,0,0,",
    };
  }, [isWizard]);

  // Ambient orbs for big wins (both themes)
  const ambientOrbs = useMemo<AmbientOrb[]>(() => {
    if (!isActive || !isBigWin) return [];
    const count = isEpicWin ? 10 : isMegaWin ? 6 : 4;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 40 + Math.random() * 80,
      color: COLORS[i % COLORS.length],
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 3,
    }));
  }, [isActive, isBigWin, isMegaWin, isEpicWin]);

  // Shockwave rings count
  const shockwaveCount = isEpicWin ? 3 : isMegaWin ? 2 : isBigWin ? 1 : 0;

  // Symbol orbit for mega/epic (runes for wizard, hieroglyphs for egyptian)
  const orbitSymbols = useMemo(() => {
    if (!isActive || !isMegaWin) return [];
    const count = isEpicWin ? 8 : 6;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      symbol: SYMBOLS[i % SYMBOLS.length],
      delay: (i / count) * 3,
    }));
  }, [isActive, isMegaWin, isEpicWin]);

  // Detect when counting is done and start pulse animation
  useEffect(() => {
    if (showBigWin && displayAmount === winAmount && winAmount > 0 && !hasTriggeredCompleteRef.current) {
      setIsPulsing(true);
      
      const pulseTimeout = setTimeout(() => {
        setIsPulsing(false);
        setIsFadingOut(true);
        
        const fadeTimeout = setTimeout(() => {
          setShowBigWin(false);
          setParticles([]);
          setIsFadingOut(false);
          setShowShockwave(false);
          hasTriggeredCompleteRef.current = true;
          onAnimationComplete?.();
        }, isEpicWin ? 600 : 400);
        
        return () => clearTimeout(fadeTimeout);
      }, pulseDuration);
      
      return () => clearTimeout(pulseTimeout);
    }
  }, [displayAmount, winAmount, showBigWin, onAnimationComplete, pulseDuration, isEpicWin]);

  useEffect(() => {
    if (!isActive || winAmount <= 0) {
      setParticles([]);
      setShowBigWin(false);
      setIsFadingOut(false);
      setIsPulsing(false);
      setShowShockwave(false);
      hasTriggeredCompleteRef.current = false;
      return;
    }

    // Both themes get enhanced particle counts for big wins
    const baseCount = isEpicWin ? 80 : isMegaWin ? 60 : isBigWin ? 40 : 20;
    const particleCount = Math.round(baseCount * 1.3);
    
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const typeRoll = Math.random();
      let type: Particle["type"];
      if (isWizard) {
        if (typeRoll > 0.75) type = "orb";
        else if (typeRoll > 0.5) type = "rune";
        else if (typeRoll > 0.25) type = "sparkle";
        else type = "star";
      } else {
        // Egyptian: coins, orbs (golden), sparkles, stars
        if (typeRoll > 0.55) type = "coin";
        else if (typeRoll > 0.4) type = "orb";
        else if (typeRoll > 0.2) type = "sparkle";
        else type = "star";
      }

      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        type,
        delay: Math.random() * 0.5,
      });
    }

    // Rising energy particles for big wins (both themes)
    if (isBigWin) {
      const risingCount = isEpicWin ? 24 : isMegaWin ? 16 : 10;
      for (let i = 0; i < risingCount; i++) {
        newParticles.push({
          id: particleCount + i,
          x: Math.random() * 100,
          y: 0,
          rotation: Math.random() * 360,
          scale: 0.3 + Math.random() * 0.8,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          type: isWizard ? (Math.random() > 0.5 ? "orb" : "sparkle") : (Math.random() > 0.5 ? "coin" : "sparkle"),
          delay: Math.random() * 1.5,
          rising: true,
        });
      }
    }

    // Second wave of particles for epic win (delayed burst) - both themes
    if (isEpicWin) {
      const wave2Start = newParticles.length;
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: wave2Start + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          rotation: Math.random() * 360,
          scale: 0.6 + Math.random() * 0.8,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          type: isWizard ? (Math.random() > 0.6 ? "orb" : "sparkle") : (Math.random() > 0.5 ? "coin" : "star"),
          delay: 0.8 + Math.random() * 0.5,
        });
      }
    }

    // Lightning bolt particles for epic win - both themes
    if (isEpicWin) {
      const lightningStart = newParticles.length;
      for (let i = 0; i < 3; i++) {
        newParticles.push({
          id: lightningStart + i,
          x: 20 + Math.random() * 60,
          y: 0,
          rotation: Math.random() * 30 - 15,
          scale: 1,
          color: isWizard ? "hsl(280, 100%, 80%)" : "hsl(45, 100%, 75%)",
          type: "lightning",
          delay: i * 0.3,
        });
      }
    }

    setParticles(newParticles);
    hasTriggeredCompleteRef.current = false;
    
    if (isBigWin) {
      setShowBigWin(true);
      setShowShockwave(true);
    } else {
      const timeout = setTimeout(() => {
        setParticles([]);
        onAnimationComplete?.();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isActive, winAmount, bet]);

  if (!isActive || winAmount <= 0) return null;

  return (
    <>
      {/* Vignette overlay for big wins - both themes */}
      {showBigWin && (
        <div
          className="absolute inset-0 pointer-events-none z-10 animate-[vignette-in_0.5s_ease-out_forwards]"
          style={{
            background: isEpicWin
              ? "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)"
              : isMegaWin
              ? "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)"
              : "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      )}

      {/* Shockwave rings - both themes */}
      {showShockwave && Array.from({ length: shockwaveCount }).map((_, i) => (
        <div
          key={`shockwave-${i}`}
          className="absolute pointer-events-none z-15"
          style={{
            top: "50%",
            left: "50%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            border: `3px solid rgba(${themeColors.primary}, 0.7)`,
            animation: `shockwave 0.8s ease-out ${i * 0.15}s forwards`,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Ambient floating orbs - both themes */}
      {showBigWin && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-12">
          {ambientOrbs.map((orb) => (
            <div
              key={`orb-${orb.id}`}
              className="absolute rounded-full"
              style={{
                left: `${orb.x}%`,
                top: `${orb.y}%`,
                width: `${orb.size}px`,
                height: `${orb.size}px`,
                background: `radial-gradient(circle, ${orb.color}40, ${orb.color}10, transparent)`,
                boxShadow: `0 0 ${orb.size / 2}px ${orb.color}30`,
                animation: `orb-float ${orb.duration}s ease-in-out ${orb.delay}s infinite`,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>
      )}

      {/* Lightning flash overlay for Epic Win - both themes */}
      {showBigWin && isEpicWin && (
        <div
          className="absolute inset-0 pointer-events-none z-25"
          style={{
            background: isWizard
              ? "radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(236,72,153,0.3) 40%, transparent 70%)"
              : "radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,140,0,0.3) 40%, transparent 70%)",
            animation: "lightning-flash 1s ease-out forwards",
          }}
        />
      )}

      {/* Particle container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={cn(
              "absolute",
              particle.type === "lightning"
                ? "animate-[particle-fall_1.5s_ease-out_forwards]"
                : particle.rising
                ? "animate-[particle-rise_2.5s_ease-out_forwards]"
                : "animate-[particle-fall_2s_ease-out_forwards]"
            )}
            style={{
              left: `${particle.x}%`,
              top: particle.rising ? `110%` : particle.type === "lightning" ? `-5%` : `-10%`,
              animationDelay: `${particle.delay}s`,
              transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
            }}
          >
            {particle.type === "coin" && (
              <div
                className="w-6 h-6 rounded-full animate-[coin-spin_0.5s_linear_infinite]"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${particle.color}, hsl(36, 80%, 30%))`,
                  boxShadow: `0 0 10px ${particle.color}, 0 0 20px ${particle.color}60`,
                }}
              />
            )}
            {particle.type === "orb" && (
              <div
                className="w-5 h-5 rounded-full animate-[sparkle_1.2s_ease-in-out_infinite]"
                style={{
                  background: isWizard
                    ? `radial-gradient(circle at 35% 35%, hsl(280, 90%, 85%), ${particle.color}, hsl(270, 60%, 20%))`
                    : `radial-gradient(circle at 35% 35%, hsl(45, 100%, 90%), ${particle.color}, hsl(36, 80%, 25%))`,
                  boxShadow: isWizard
                    ? `0 0 14px ${particle.color}, 0 0 28px ${particle.color}40, inset 0 0 8px hsl(280, 90%, 90%)`
                    : `0 0 14px ${particle.color}, 0 0 28px ${particle.color}40, inset 0 0 8px hsl(45, 100%, 90%)`,
                }}
              />
            )}
            {particle.type === "rune" && (
              <div
                className="text-lg font-bold animate-[sparkle_0.9s_ease-in-out_infinite]"
                style={{
                  color: particle.color,
                  textShadow: `0 0 10px ${particle.color}, 0 0 20px ${particle.color}60`,
                }}
              >
                {SYMBOLS[particle.id % SYMBOLS.length]}
              </div>
            )}
            {particle.type === "sparkle" && (
              <div
                className="text-2xl animate-[sparkle_0.8s_ease-in-out_infinite]"
                style={{ color: particle.color }}
              >
                ✦
              </div>
            )}
            {particle.type === "star" && (
              <div
                className="text-xl animate-[sparkle_0.6s_ease-in-out_infinite]"
                style={{ color: particle.color }}
              >
                ★
              </div>
            )}
            {particle.type === "lightning" && (
              <div
                className="animate-[sparkle_0.3s_ease-in-out_infinite]"
                style={{
                  width: "4px",
                  height: "60px",
                  background: isWizard
                    ? `linear-gradient(180deg, transparent, ${particle.color}, hsl(280, 100%, 95%), ${particle.color}, transparent)`
                    : `linear-gradient(180deg, transparent, ${particle.color}, hsl(45, 100%, 95%), ${particle.color}, transparent)`,
                  boxShadow: `0 0 15px ${particle.color}, 0 0 30px ${particle.color}60`,
                  clipPath: "polygon(40% 0%, 60% 0%, 70% 30%, 55% 35%, 65% 65%, 50% 60%, 60% 100%, 40% 100%, 50% 60%, 35% 65%, 45% 35%, 30% 30%)",
                  transform: `scale(${1 + Math.random()})`,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Symbol orbit ring for mega/epic - both themes */}
      {showBigWin && orbitSymbols.length > 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-28">
          <div className="relative" style={{ width: "240px", height: "240px" }}>
            {orbitSymbols.map((r) => (
              <div
                key={`orbit-${r.id}`}
                className="absolute top-1/2 left-1/2 text-xl font-bold"
                style={{
                  color: COLORS[r.id % COLORS.length],
                  textShadow: `0 0 12px ${COLORS[r.id % COLORS.length]}, 0 0 24px ${COLORS[r.id % COLORS.length]}60`,
                  animation: `rune-orbit 3s linear ${r.delay}s infinite`,
                  willChange: "transform",
                }}
              >
                {r.symbol}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Big Win Text Overlay */}
      {showBigWin && (
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center pointer-events-none z-30",
            isFadingOut 
              ? isEpicWin 
                ? "opacity-0 scale-50 blur-sm transition-all duration-600"
                : isMegaWin
                ? "opacity-0 scale-60 transition-all duration-450"
                : "opacity-0 scale-75 transition-all duration-400"
              : isEpicWin
              ? "animate-[epic-win-entry_0.8s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
              : isMegaWin
              ? "animate-[mega-win-entry_0.6s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
              : "animate-[big-win-entry_0.4s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
          )}
        >
          <div className="px-6 sm:px-10 py-4 sm:py-8">
            <div
              className={cn(
                "text-center animate-[big-win-pop_0.6s_ease-out_forwards]",
                isEpicWin && "animate-[epic-win-shake_0.1s_ease-in-out_infinite]"
              )}
            >
              <div
                className={cn(
                  "font-bold tracking-wider animate-[text-glow-breathe_2s_ease-in-out_infinite]",
                  isEpicWin ? "text-5xl sm:text-7xl" : isMegaWin ? "text-3xl sm:text-5xl" : "text-2xl sm:text-4xl"
                )}
                style={{
                  background: isWizard
                    ? (isEpicWin 
                        ? "linear-gradient(135deg, #ec4899, #a855f7, #06b6d4, #a855f7, #ec4899)"
                        : isMegaWin
                        ? "linear-gradient(135deg, #a855f7, #7c3aed, #c084fc, #a855f7)"
                        : "linear-gradient(135deg, #a855f7, #c084fc)")
                    : (isEpicWin 
                        ? "linear-gradient(135deg, #ffd700, #ff4500, #ffd700, #ff6b6b, #ffd700)"
                        : isMegaWin
                        ? "linear-gradient(135deg, #ffd700, #ff8c00, #ffb347, #ffd700)"
                        : "linear-gradient(135deg, #ffd700, #ffb347)"),
                  backgroundSize: isEpicWin ? "400% 400%" : "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: isEpicWin 
                    ? "gradient-shift 0.4s ease infinite, text-glow-breathe 2s ease-in-out infinite" 
                    : "gradient-shift 1s ease infinite, text-glow-breathe 2s ease-in-out infinite",
                  textShadow: isWizard
                    ? "0 0 40px rgba(168, 85, 247, 0.9)"
                    : "0 0 40px rgba(255, 215, 0, 0.9)",
                  filter: isWizard
                    ? isEpicWin
                      ? "drop-shadow(0 0 30px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 60px rgba(236, 72, 153, 0.5))"
                      : "drop-shadow(0 0 25px rgba(168, 85, 247, 0.7))"
                    : isEpicWin
                      ? "drop-shadow(0 0 30px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 60px rgba(255, 140, 0, 0.5))"
                      : "drop-shadow(0 0 25px rgba(255, 215, 0, 0.7))",
                }}
              >
                {isWizard
                  ? (isEpicWin ? "⚡ EPIC WIN! ⚡" : isMegaWin ? "🔮 MEGA WIN! 🔮" : "✨ BIG WIN! ✨")
                  : (isEpicWin ? "🔥 EPIC WIN! 🔥" : isMegaWin ? "💎 MEGA WIN! 💎" : "⭐ BIG WIN! ⭐")}
              </div>
              <div
                className={cn(
                  "mt-2 font-bold",
                  isEpicWin ? "text-4xl sm:text-6xl" : isMegaWin ? "text-2xl sm:text-4xl" : "text-xl sm:text-3xl",
                  isPulsing && "animate-[win-amount-pulse_0.25s_ease-in-out_3]"
                )}
                style={{
                  color: isWizard ? "#c084fc" : "#ffd700",
                  textShadow: isWizard
                    ? "0 0 25px rgba(168, 85, 247, 0.9), 0 0 50px rgba(168, 85, 247, 0.5), 0 0 80px rgba(168, 85, 247, 0.3)"
                    : "0 0 25px rgba(255, 215, 0, 0.9), 0 0 50px rgba(255, 215, 0, 0.5), 0 0 80px rgba(255, 215, 0, 0.3)",
                }}
              >
                {displayAmount} POINT!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screen flash effect for non-epic big wins */}
      {showBigWin && !isEpicWin && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none z-10",
            "animate-[flash_0.3s_ease-out]"
          )}
          style={{
            background: isMegaWin
              ? `radial-gradient(circle, rgba(${themeColors.primary}, 0.4) 0%, transparent 70%)`
              : `radial-gradient(circle, rgba(${themeColors.primary}, 0.3) 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Expanding ring effects - both themes */}
      {showBigWin && Array.from({ length: shockwaveCount }).map((_, i) => (
        <div
          key={`ring-${i}`}
          className="absolute pointer-events-none z-15"
          style={{
            top: "50%",
            left: "50%",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: `2px solid rgba(${themeColors.primary}, ${0.5 - i * 0.1})`,
            boxShadow: `0 0 20px rgba(${themeColors.primary}, ${0.3 - i * 0.05}), inset 0 0 20px rgba(${themeColors.primary}, ${0.2 - i * 0.05})`,
            animation: `ring-expand 1.2s ease-out ${0.2 + i * 0.25}s forwards`,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Pulsing border glow for wins */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none z-10 rounded-lg",
          "animate-[glow-pulse_1s_ease-in-out_infinite]"
        )}
        style={{
          boxShadow: isEpicWin
            ? `inset 0 0 40px rgba(${themeColors.secondary}, 0.6), 0 0 60px rgba(${themeColors.primary}, 0.6), 0 0 100px rgba(${themeColors.primary}, 0.3)`
            : isMegaWin
            ? `inset 0 0 30px rgba(${themeColors.primary}, 0.5), 0 0 50px rgba(${themeColors.primary}, 0.5)`
            : isBigWin
            ? `inset 0 0 20px rgba(${themeColors.primary}, 0.3), 0 0 30px rgba(${themeColors.primary}, 0.3)`
            : `inset 0 0 15px rgba(${themeColors.primary}, 0.2), 0 0 20px rgba(${themeColors.primary}, 0.2)`,
        }}
      />
    </>
  );
}
