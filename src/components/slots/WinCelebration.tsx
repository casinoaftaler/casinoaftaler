import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  type: "coin" | "sparkle" | "star" | "orb" | "rune";
  delay: number;
  rising?: boolean; // For rising energy particles
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

export function WinCelebration({ isActive, winAmount, bet, gameId, onAnimationComplete }: WinCelebrationProps) {
  const isWizard = gameId === "rise-of-fedesvin";
  const COLORS = isWizard ? WIZARD_COLORS : EGYPTIAN_COLORS;
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showBigWin, setShowBigWin] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const hasTriggeredCompleteRef = useRef(false);
  
  const winMultiplier = bet > 0 ? winAmount / bet : 0;
  const isBigWin = winMultiplier >= 10;
  const isMegaWin = winMultiplier >= 50;
  const isEpicWin = winMultiplier >= 100;

  const duration = isEpicWin ? 2500 : isMegaWin ? 2000 : 1500;
  const displayAmount = useAnimatedCounter(showBigWin ? winAmount : 0, { 
    duration, 
    startFrom: 0,
    playSound: showBigWin,
    isBigWin: true
  });

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
          hasTriggeredCompleteRef.current = true;
          onAnimationComplete?.();
        }, 400);
        
        return () => clearTimeout(fadeTimeout);
      }, 750);
      
      return () => clearTimeout(pulseTimeout);
    }
  }, [displayAmount, winAmount, showBigWin, onAnimationComplete]);

  useEffect(() => {
    if (!isActive || winAmount <= 0) {
      setParticles([]);
      setShowBigWin(false);
      setIsFadingOut(false);
      setIsPulsing(false);
      hasTriggeredCompleteRef.current = false;
      return;
    }

    // Wizard theme gets 30% more particles
    const baseCount = isMegaWin ? 60 : isBigWin ? 40 : 20;
    const particleCount = isWizard ? Math.round(baseCount * 1.3) : baseCount;
    
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const typeRoll = Math.random();
      let type: Particle["type"];
      if (isWizard) {
        // Wizard: orbs, runes, sparkles, stars (no coins)
        if (typeRoll > 0.7) type = "orb";
        else if (typeRoll > 0.45) type = "rune";
        else if (typeRoll > 0.2) type = "sparkle";
        else type = "star";
      } else {
        type = typeRoll > 0.6 ? "coin" : typeRoll > 0.5 ? "sparkle" : "star";
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

    // Rising energy particles for wizard big wins
    if (isWizard && isBigWin) {
      const risingCount = isEpicWin ? 20 : isMegaWin ? 14 : 8;
      for (let i = 0; i < risingCount; i++) {
        newParticles.push({
          id: particleCount + i,
          x: Math.random() * 100,
          y: 0,
          rotation: Math.random() * 360,
          scale: 0.3 + Math.random() * 0.8,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          type: Math.random() > 0.5 ? "orb" : "sparkle",
          delay: Math.random() * 1.5,
          rising: true,
        });
      }
    }

    setParticles(newParticles);
    hasTriggeredCompleteRef.current = false;
    
    if (isBigWin) {
      setShowBigWin(true);
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
      {/* Particle container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={cn(
              "absolute",
              particle.rising
                ? "animate-[particle-rise_2.5s_ease-out_forwards]"
                : "animate-[particle-fall_2s_ease-out_forwards]"
            )}
            style={{
              left: `${particle.x}%`,
              top: particle.rising ? `110%` : `-10%`,
              animationDelay: `${particle.delay}s`,
              transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
            }}
          >
            {particle.type === "coin" && (
              <div
                className="w-6 h-6 rounded-full animate-[coin-spin_0.5s_linear_infinite]"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${particle.color}, hsl(36, 80%, 30%))`,
                  boxShadow: `0 0 10px ${particle.color}`,
                }}
              />
            )}
            {particle.type === "orb" && (
              <div
                className="w-5 h-5 rounded-full animate-[sparkle_1.2s_ease-in-out_infinite]"
                style={{
                  background: `radial-gradient(circle at 35% 35%, hsl(280, 90%, 85%), ${particle.color}, hsl(270, 60%, 20%))`,
                  boxShadow: `0 0 14px ${particle.color}, 0 0 28px ${particle.color}40, inset 0 0 8px hsl(280, 90%, 90%)`,
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
                {WIZARD_RUNES[particle.id % WIZARD_RUNES.length]}
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
          </div>
        ))}
      </div>

      {/* Big Win Text Overlay */}
      {showBigWin && (
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center pointer-events-none z-30",
            isFadingOut 
              ? isEpicWin 
                ? "opacity-0 scale-50 transition-all duration-500"
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
                  "font-bold tracking-wider",
                  isEpicWin ? "text-4xl sm:text-6xl" : isMegaWin ? "text-3xl sm:text-5xl" : "text-2xl sm:text-4xl"
                )}
                style={{
                  background: isWizard
                    ? (isEpicWin 
                        ? "linear-gradient(135deg, #a855f7, #ec4899, #a855f7, #ec4899)"
                        : isMegaWin
                        ? "linear-gradient(135deg, #a855f7, #7c3aed, #a855f7)"
                        : "linear-gradient(135deg, #a855f7, #c084fc)")
                    : (isEpicWin 
                        ? "linear-gradient(135deg, #ffd700, #ff6b6b, #ffd700, #ff6b6b)"
                        : isMegaWin
                        ? "linear-gradient(135deg, #ffd700, #ff8c00, #ffd700)"
                        : "linear-gradient(135deg, #ffd700, #ffb347)"),
                  backgroundSize: isEpicWin ? "300% 300%" : "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: isEpicWin 
                    ? "gradient-shift 0.5s ease infinite" 
                    : "gradient-shift 1s ease infinite",
                  textShadow: isWizard
                    ? "0 0 30px rgba(168, 85, 247, 0.8)"
                    : "0 0 30px rgba(255, 215, 0, 0.8)",
                  filter: isWizard
                    ? "drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))"
                    : "drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))",
                }}
              >
                {isWizard
                  ? (isEpicWin ? "⚡ EPIC WIN! ⚡" : isMegaWin ? "🔮 MEGA WIN! 🔮" : "✨ BIG WIN! ✨")
                  : (isEpicWin ? "🔥 EPIC WIN! 🔥" : isMegaWin ? "💎 MEGA WIN! 💎" : "⭐ BIG WIN! ⭐")}
              </div>
              <div
                className={cn(
                  "mt-2 font-bold",
                  isEpicWin ? "text-3xl sm:text-5xl" : isMegaWin ? "text-2xl sm:text-4xl" : "text-xl sm:text-3xl",
                  isPulsing && "animate-[win-amount-pulse_0.25s_ease-in-out_3]"
                )}
                style={{
                  color: isWizard ? "#c084fc" : "#ffd700",
                  textShadow: isWizard
                    ? "0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)"
                    : "0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4)",
                }}
              >
                {displayAmount} POINT!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screen flash effect for big wins */}
      {showBigWin && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none z-10",
            "animate-[flash_0.3s_ease-out]"
          )}
          style={{
            background: isWizard
              ? (isEpicWin
                ? "radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)"
                : isMegaWin
                ? "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)")
              : (isEpicWin
                ? "radial-gradient(circle, rgba(255,107,107,0.4) 0%, transparent 70%)"
                : isMegaWin
                ? "radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)"),
          }}
        />
      )}

      {/* Pulsing border glow for wins */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none z-10 rounded-lg",
          "animate-[glow-pulse_1s_ease-in-out_infinite]"
        )}
        style={{
          boxShadow: isWizard
            ? (isEpicWin
              ? "inset 0 0 30px rgba(236, 72, 153, 0.5), 0 0 50px rgba(168, 85, 247, 0.5)"
              : isMegaWin
              ? "inset 0 0 25px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.4)"
              : isBigWin
              ? "inset 0 0 20px rgba(168, 85, 247, 0.3), 0 0 30px rgba(168, 85, 247, 0.3)"
              : "inset 0 0 15px rgba(168, 85, 247, 0.2), 0 0 20px rgba(168, 85, 247, 0.2)")
            : (isEpicWin
              ? "inset 0 0 30px rgba(255, 107, 107, 0.5), 0 0 50px rgba(255, 215, 0, 0.5)"
              : isMegaWin
              ? "inset 0 0 25px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.4)"
              : isBigWin
              ? "inset 0 0 20px rgba(255, 215, 0, 0.3), 0 0 30px rgba(255, 215, 0, 0.3)"
              : "inset 0 0 15px rgba(255, 215, 0, 0.2), 0 0 20px rgba(255, 215, 0, 0.2)"),
        }}
      />
    </>
  );
}
