import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  type: "coin" | "sparkle" | "star";
  delay: number;
}

interface WinCelebrationProps {
  isActive: boolean;
  winAmount: number;
  bet: number;
}

const COLORS = [
  "hsl(45, 100%, 50%)",   // Gold
  "hsl(36, 100%, 50%)",   // Orange gold
  "hsl(51, 100%, 60%)",   // Light gold
  // Keep the celebration strictly in a gold spectrum (no purple/blue accents)
  "hsl(42, 95%, 55%)",    // Warm gold
];

export function WinCelebration({ isActive, winAmount, bet }: WinCelebrationProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showBigWin, setShowBigWin] = useState(false);
  
  const winMultiplier = bet > 0 ? winAmount / bet : 0;
  const isBigWin = winMultiplier >= 10;
  const isMegaWin = winMultiplier >= 50;
  const isEpicWin = winMultiplier >= 100;

  // Animated counter for big win display - longer duration for dramatic effect
  const duration = isEpicWin ? 2500 : isMegaWin ? 2000 : 1500;
  const displayAmount = useAnimatedCounter(showBigWin ? winAmount : 0, { 
    duration, 
    startFrom: 0,
    playSound: showBigWin // Only play sound when big win is showing
  });

  useEffect(() => {
    if (!isActive || winAmount <= 0) {
      setParticles([]);
      setShowBigWin(false);
      return;
    }

    // Determine particle count based on win size
    const particleCount = isMegaWin ? 60 : isBigWin ? 40 : 20;
    
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        type: Math.random() > 0.6 ? "coin" : Math.random() > 0.5 ? "sparkle" : "star",
        delay: Math.random() * 0.5,
      });
    }
    setParticles(newParticles);
    
    if (isBigWin) {
      setShowBigWin(true);
    }

    // Clean up after animation
    const timeout = setTimeout(() => {
      setParticles([]);
      setShowBigWin(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isActive, winAmount, bet]);

  if (!isActive || winAmount <= 0) return null;

  return (
    <>
      {/* Particle container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-[particle-fall_2s_ease-out_forwards]"
            style={{
              left: `${particle.x}%`,
              top: `-10%`,
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
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
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
                background: isEpicWin 
                  ? "linear-gradient(135deg, #ffd700, #ff6b6b, #ffd700, #ff6b6b)"
                  : isMegaWin
                  ? "linear-gradient(135deg, #ffd700, #ff8c00, #ffd700)"
                  : "linear-gradient(135deg, #ffd700, #ffb347)",
                backgroundSize: isEpicWin ? "300% 300%" : "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: isEpicWin 
                  ? "gradient-shift 0.5s ease infinite" 
                  : "gradient-shift 1s ease infinite",
                textShadow: "0 0 30px rgba(255, 215, 0, 0.8)",
                filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))",
              }}
            >
              {isEpicWin ? "🔥 EPIC WIN! 🔥" : isMegaWin ? "💎 MEGA WIN! 💎" : "⭐ BIG WIN! ⭐"}
            </div>
            <div
              className={cn(
                "mt-2 font-bold",
                isEpicWin ? "text-3xl sm:text-5xl" : isMegaWin ? "text-2xl sm:text-4xl" : "text-xl sm:text-3xl"
              )}
              style={{
                color: "#ffd700",
                textShadow: "0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4)",
              }}
            >
              {displayAmount} POINT!
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
            background: isEpicWin
              ? "radial-gradient(circle, rgba(255,107,107,0.4) 0%, transparent 70%)"
              : isMegaWin
              ? "radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)",
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
          boxShadow: isEpicWin
            ? "inset 0 0 30px rgba(255, 107, 107, 0.5), 0 0 50px rgba(255, 215, 0, 0.5)"
            : isMegaWin
            ? "inset 0 0 25px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.4)"
            : isBigWin
            ? "inset 0 0 20px rgba(255, 215, 0, 0.3), 0 0 30px rgba(255, 215, 0, 0.3)"
            : "inset 0 0 15px rgba(255, 215, 0, 0.2), 0 0 20px rgba(255, 215, 0, 0.2)",
        }}
      />
    </>
  );
}
