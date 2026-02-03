import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

interface BonusCompleteScreenProps {
  isVisible: boolean;
  totalWinnings: number;
  totalSpinsUsed: number;
  onClose?: () => void;
}

interface Particle {
  id: number;
  x: number;
  emoji: string;
  delay: number;
  duration: number;
  size: number;
}

const PARTICLE_EMOJIS = ["✨", "⭐", "🌟", "💫", "🪙", "☀️", "🔱", "☥"];

export function BonusCompleteScreen({
  isVisible,
  totalWinnings,
  totalSpinsUsed,
  onClose,
}: BonusCompleteScreenProps) {
  const [showContent, setShowContent] = useState(false);
  const [showCounter, setShowCounter] = useState(false);

  // Animate the winnings counter with dramatic sound
  const counterDuration = Math.min(1500 + totalWinnings * 5, 2500);
  const displayWinnings = useAnimatedCounter(showCounter ? totalWinnings : 0, {
    duration: counterDuration,
    startFrom: 0,
    playSound: true,
    isBigWin: totalWinnings > 100,
  });

  // Generate particles only when visible
  const particles = useMemo<Particle[]>(() => {
    if (!isVisible) return [];
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const count = isMobile ? 40 : 80;
    
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      emoji: PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)],
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
      size: 16 + Math.random() * 16,
    }));
  }, [isVisible]);

  // Staggered animation reveal
  useEffect(() => {
    if (isVisible) {
      // Show content after overlay fades in
      const contentTimer = setTimeout(() => setShowContent(true), 300);
      // Start counter after content appears
      const counterTimer = setTimeout(() => setShowCounter(true), 800);
      
      return () => {
        clearTimeout(contentTimer);
        clearTimeout(counterTimer);
      };
    } else {
      setShowContent(false);
      setShowCounter(false);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-black/85 backdrop-blur-md",
        "animate-in fade-in duration-300"
      )}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Bonus completed"
    >
      {/* Falling particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: "-5%",
              fontSize: `${particle.size}px`,
              animation: `particle-fall ${particle.duration}s linear ${particle.delay}s infinite`,
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>

      {/* Golden glow effect behind card */}
      <div 
        className={cn(
          "absolute w-[500px] h-[500px] rounded-full",
          "bg-amber-500/20 blur-3xl",
          "animate-pulse"
        )}
      />

      {/* Main card */}
      <div
        className={cn(
          "relative p-6 sm:p-10 rounded-2xl text-center max-w-sm sm:max-w-md mx-4",
          "bg-gradient-to-b from-amber-950/95 to-amber-900/90",
          "border-4 border-amber-400/70",
          "shadow-[0_0_60px_rgba(251,191,36,0.4)]",
          showContent
            ? "animate-in zoom-in-95 duration-500"
            : "opacity-0 scale-95"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Egyptian corners */}
        <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-amber-400 rounded-tl-xl" />
        <div className="absolute -top-4 -right-4 w-12 h-12 border-t-4 border-r-4 border-amber-400 rounded-tr-xl" />
        <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-4 border-l-4 border-amber-400 rounded-bl-xl" />
        <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-amber-400 rounded-br-xl" />

        {/* Corner decorations - Egyptian symbols */}
        <span 
          className="absolute top-2 left-3 text-2xl opacity-60"
          style={{ animation: "sparkle 2s ease-in-out infinite" }}
        >
          ☥
        </span>
        <span 
          className="absolute top-2 right-3 text-2xl opacity-60"
          style={{ animation: "sparkle 2s ease-in-out 0.5s infinite" }}
        >
          ☥
        </span>
        <span 
          className="absolute bottom-2 left-3 text-2xl opacity-60"
          style={{ animation: "sparkle 2s ease-in-out 1s infinite" }}
        >
          🪲
        </span>
        <span 
          className="absolute bottom-2 right-3 text-2xl opacity-60"
          style={{ animation: "sparkle 2s ease-in-out 1.5s infinite" }}
        >
          🪲
        </span>

        {/* Celebration emoji */}
        <div className="mb-4">
          <span 
            className="text-6xl sm:text-7xl inline-block"
            style={{ animation: "sparkle 1.5s ease-in-out infinite" }}
          >
            🎉
          </span>
        </div>

        {/* Title - TILLYKKE! */}
        <h2 
          className={cn(
            "text-4xl sm:text-5xl font-bold mb-2",
            "bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent",
            showContent ? "animate-in zoom-in duration-400" : "opacity-0"
          )}
          style={{
            textShadow: "0 0 30px rgba(251,191,36,0.6)",
            animationDelay: "200ms",
          }}
        >
          TILLYKKE!
        </h2>

        {/* Subtitle */}
        <p 
          className={cn(
            "text-lg sm:text-xl text-amber-100/90 mb-6",
            showContent ? "animate-in fade-in duration-300" : "opacity-0"
          )}
          style={{ animationDelay: "400ms" }}
        >
          DU HAR VUNDET
        </p>

        {/* Winnings display */}
        <div 
          className={cn(
            "py-4 px-6 rounded-xl mb-4",
            "bg-gradient-to-r from-amber-900/50 via-amber-800/60 to-amber-900/50",
            "border-2 border-amber-500/50"
          )}
        >
          <div 
            className="text-5xl sm:text-6xl font-bold text-amber-400"
            style={{
              textShadow: "0 0 20px rgba(251,191,36,0.8), 0 0 40px rgba(251,191,36,0.4)",
              animation: showCounter ? "glow-pulse 2s ease-in-out infinite" : "none",
            }}
          >
            {displayWinnings.toLocaleString("da-DK")}
          </div>
          <p className="text-amber-200/70 text-sm mt-1">point</p>
        </div>

        {/* Free spins used */}
        <p className="text-amber-100/80 text-base sm:text-lg mb-6">
          I <span className="text-amber-400 font-bold text-xl">{totalSpinsUsed}</span> GRATIS SPINS
        </p>

        {/* Call to action */}
        <p 
          className="text-amber-200/50 text-sm animate-pulse"
        >
          Klik for at fortsætte
        </p>
      </div>
    </div>
  );
}
