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
  type: "coin" | "sparkle" | "star";
  delay: number;
}

interface WinCelebrationProps {
  isActive: boolean;
  winAmount: number;
  bet: number;
  onAnimationComplete?: () => void;
}

const COLORS = [
  "hsl(45, 100%, 50%)",   // Gold
  "hsl(36, 100%, 50%)",   // Orange gold
  "hsl(51, 100%, 60%)",   // Light gold
  // Keep the celebration strictly in a gold spectrum (no purple/blue accents)
  "hsl(42, 95%, 55%)",    // Warm gold
];

export function WinCelebration({ isActive, winAmount, bet, onAnimationComplete }: WinCelebrationProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showBigWin, setShowBigWin] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const hasTriggeredCompleteRef = useRef(false);
  
  const winMultiplier = bet > 0 ? winAmount / bet : 0;
  const isBigWin = winMultiplier >= 10;
  const isMegaWin = winMultiplier >= 50;
  const isEpicWin = winMultiplier >= 100;

  // Animated counter for big win display - longer duration for dramatic effect
  const duration = isEpicWin ? 2500 : isMegaWin ? 2000 : 1500;
  const displayAmount = useAnimatedCounter(showBigWin ? winAmount : 0, { 
    duration, 
    startFrom: 0,
    playSound: showBigWin, // Only play sound when big win is showing
    isBigWin: true // Use dramatic big win counting sound
  });

  // Detect when counting is done and start pulse animation
  useEffect(() => {
    if (showBigWin && displayAmount === winAmount && winAmount > 0 && !hasTriggeredCompleteRef.current) {
      setIsPulsing(true);
      
      // Pulse for 750ms (3 pulses at 0.25s each), then start fade out
      const pulseTimeout = setTimeout(() => {
        setIsPulsing(false);
        setIsFadingOut(true);
        
        // Fade out for 400ms, then complete
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
    hasTriggeredCompleteRef.current = false;
    
    if (isBigWin) {
      setShowBigWin(true);
    } else {
      // For non-big wins, complete immediately after a short delay
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
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center pointer-events-none z-30 transition-all duration-400",
            isFadingOut ? "opacity-0 scale-75" : "opacity-100 scale-100"
          )}
        >
          {/* Semi-transparent background */}
          <div className="bg-black/70 backdrop-blur-sm rounded-2xl px-6 sm:px-10 py-4 sm:py-8 border-2 border-amber-500/40 shadow-[0_0_40px_rgba(251,191,36,0.3)]">
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
                  isEpicWin ? "text-3xl sm:text-5xl" : isMegaWin ? "text-2xl sm:text-4xl" : "text-xl sm:text-3xl",
                  isPulsing && "animate-[win-amount-pulse_0.25s_ease-in-out_3]"
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
