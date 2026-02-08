import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import { getSymbolEmoji } from "@/lib/slotGameLogic";
import { getSlotTheme } from "@/lib/slotTheme";

interface BonusCompleteScreenProps {
  isVisible: boolean;
  totalWinnings: number;
  totalSpinsUsed: number;
  expandingSymbols?: SlotSymbol[];
  scatterImageUrl?: string | null;
  onClose?: () => void;
  gameId?: string;
}

interface Particle {
  id: number;
  x: number;
  emoji: string;
  delay: number;
  duration: number;
  size: number;
}

const EGYPTIAN_EMOJIS = ["✨", "⭐", "🌟", "💫", "🪙", "☀️", "🔱", "☥"];
const WIZARD_EMOJIS = ["✨", "⭐", "🌟", "💫", "🔮", "💎", "🧿", "⚡"];

export function BonusCompleteScreen({
  isVisible,
  totalWinnings,
  totalSpinsUsed,
  expandingSymbols = [],
  scatterImageUrl,
  onClose,
  gameId,
}: BonusCompleteScreenProps) {
  const theme = getSlotTheme(gameId);
  const isWizard = gameId === "rise-of-fedesvin";
  const particleEmojis = isWizard ? WIZARD_EMOJIS : EGYPTIAN_EMOJIS;

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
      emoji: particleEmojis[Math.floor(Math.random() * particleEmojis.length)],
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
      size: 16 + Math.random() * 16,
    }));
  }, [isVisible, particleEmojis]);

  // Staggered animation reveal
  useEffect(() => {
    if (isVisible) {
      const contentTimer = setTimeout(() => setShowContent(true), 300);
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

      {/* Glow effect behind card */}
      <div 
        className={cn(
          "absolute w-[500px] h-[500px] rounded-full animate-pulse",
          theme.bgAccent, "blur-3xl"
        )}
      />

      {/* Main card */}
      <div
        className={cn(
          "relative p-6 sm:p-10 rounded-2xl text-center max-w-sm sm:max-w-md mx-4",
          theme.dialogBg,
          "border-4", theme.frameBorderColor, "border-opacity-70",
          theme.dialogShadow,
          showContent
            ? "animate-in zoom-in-95 duration-500"
            : "opacity-0 scale-95"
        )}
      >
        {/* Decorative corners */}
        <div className={cn("absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 rounded-tl-xl", theme.frameBorderColor)} />
        <div className={cn("absolute -top-4 -right-4 w-12 h-12 border-t-4 border-r-4 rounded-tr-xl", theme.frameBorderColor)} />
        <div className={cn("absolute -bottom-4 -left-4 w-12 h-12 border-b-4 border-l-4 rounded-bl-xl", theme.frameBorderColor)} />
        <div className={cn("absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 rounded-br-xl", theme.frameBorderColor)} />

        {/* Corner decorations - themed symbols */}
        <span 
          className="absolute top-2 left-3 text-2xl opacity-60"
          style={{ animation: "sparkle 2s ease-in-out infinite" }}
        >
          {isWizard ? "🔮" : "☥"}
        </span>
        <span 
          className="absolute top-2 right-3 text-2xl opacity-60"
          style={{ animation: "sparkle 2s ease-in-out 0.5s infinite" }}
        >
          {isWizard ? "🔮" : "☥"}
        </span>
        <span 
          className="absolute bottom-2 left-3 text-2xl opacity-60"
          style={{ animation: "sparkle 2s ease-in-out 1s infinite" }}
        >
          {isWizard ? "💎" : "🪲"}
        </span>
        <span 
          className="absolute bottom-2 right-3 text-2xl opacity-60"
          style={{ animation: "sparkle 2s ease-in-out 1.5s infinite" }}
        >
          {isWizard ? "💎" : "🪲"}
        </span>

        {/* Scatter symbol celebration */}
        <div className="mb-4">
          {scatterImageUrl ? (
            <img 
              src={scatterImageUrl} 
              alt="Scatter" 
              className={cn(
                "w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg inline-block",
                theme.dropShadowGlowStrong
              )}
              style={{ animation: "sparkle 1.5s ease-in-out infinite" }}
            />
          ) : (
            <span 
              className="text-6xl sm:text-7xl inline-block"
              style={{ animation: "sparkle 1.5s ease-in-out infinite" }}
            >
              🎉
            </span>
          )}
        </div>

        {/* Title - TILLYKKE! */}
        <h2 
          className={cn(
            "text-4xl sm:text-5xl font-bold mb-2 bg-clip-text text-transparent",
            isWizard
              ? "bg-gradient-to-r from-purple-300 via-purple-400 to-purple-300"
              : "bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300",
            showContent ? "animate-in zoom-in duration-400" : "opacity-0"
          )}
          style={{ animationDelay: "200ms" }}
        >
          TILLYKKE!
        </h2>

        {/* Subtitle */}
        <p 
          className={cn(
            "text-lg sm:text-xl text-white/90 mb-6",
            showContent ? "animate-in fade-in duration-300" : "opacity-0"
          )}
          style={{ animationDelay: "400ms" }}
        >
          DU HAR VUNDET
        </p>

        {/* Winnings display */}
        <div 
          className={cn(
            "py-4 px-6 rounded-xl mb-4 border-2",
            isWizard
              ? "bg-gradient-to-r from-purple-900/50 via-purple-800/60 to-purple-900/50 border-purple-500/50"
              : "bg-gradient-to-r from-amber-900/50 via-amber-800/60 to-amber-900/50 border-amber-500/50"
          )}
        >
          <div 
            className={cn("text-5xl sm:text-6xl font-bold", theme.accent)}
            style={{
              animation: showCounter ? "glow-pulse 2s ease-in-out infinite" : "none",
            }}
          >
            {displayWinnings.toLocaleString("da-DK")}
          </div>
          <p className="text-white/50 text-sm mt-1">point</p>
        </div>

        {/* Free spins used */}
        <p className="text-white/80 text-base sm:text-lg mb-2">
          I <span className={cn("font-bold text-xl", theme.accent)}>{totalSpinsUsed}</span> GRATIS SPINS
        </p>

        {/* Expanding symbols used */}
        {expandingSymbols.length > 0 && (
          <div className="flex items-center justify-center gap-1.5 mb-6">
            <span className="text-white/40 text-sm mr-1">Expanding:</span>
            {expandingSymbols.map((sym) => (
              <div
                key={sym.id}
                className={cn(
                  "flex items-center gap-1 px-1.5 py-0.5 rounded-lg border",
                  theme.bgAccent, theme.borderAccent
                )}
              >
                {sym.image_url ? (
                  <img
                    src={sym.image_url}
                    alt={sym.name}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                ) : (
                  <span className="text-sm">{getSymbolEmoji(sym.name)}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {expandingSymbols.length === 0 && <div className="mb-6" />}

        {/* Call to action */}
        <p className="text-white/40 text-sm animate-pulse">
          Klik for at fortsætte
        </p>
      </div>
    </div>
  );
}
