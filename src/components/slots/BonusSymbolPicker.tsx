import { useState, useEffect, useRef } from "react";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import { getSymbolEmoji } from "@/lib/slotGameLogic";
import { cn } from "@/lib/utils";
import { slotSounds } from "@/lib/slotSoundEffects";
import { getSlotTheme } from "@/lib/slotTheme";

interface BonusSymbolPickerProps {
  isVisible: boolean;
  symbols: SlotSymbol[];
  selectedSymbol: SlotSymbol | null;
  onComplete: () => void;
  gameId?: string;
  excludeSymbolIds?: string[];
  buttonText?: string;
}

export function BonusSymbolPicker({
  isVisible,
  symbols,
  selectedSymbol,
  onComplete,
  gameId,
  excludeSymbolIds = [],
  buttonText = "START FREE SPINS",
}: BonusSymbolPickerProps) {
  const theme = getSlotTheme(gameId);
  const [currentSymbol, setCurrentSymbol] = useState<SlotSymbol | null>(null);
  const [phase, setPhase] = useState<"spinning" | "slowing" | "landed">("spinning");
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const slowdownTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const stopScrollSoundRef = useRef<(() => void) | null>(null);

  // Filter to only non-scatter symbols, excluding already active expanding symbols
  const eligibleSymbols = symbols.filter(s => !s.is_scatter && !excludeSymbolIds.includes(s.id));

  // When no eligible symbols remain (all already active), skip roulette and show landed immediately
  const skipRoulette = eligibleSymbols.length === 0 && !!selectedSymbol;

  useEffect(() => {
    if (!isVisible || !selectedSymbol) {
      return;
    }
    
    // If no eligible symbols for roulette, jump straight to landed
    if (skipRoulette) {
      setCurrentSymbol(selectedSymbol);
      setPhase("landed");
      slotSounds.playBonusSymbolSelected();
      return;
    }
    
    if (eligibleSymbols.length === 0) {
      return;
    }

    // Reset state
    setPhase("spinning");
    setCurrentSymbol(eligibleSymbols[0]);

    // Start the scroll sound
    stopScrollSoundRef.current = slotSounds.playBonusSymbolScroll();

    // Phase 1: Fast spinning (100ms intervals for 1.5s)
    let spinIndex = 0;
    intervalRef.current = setInterval(() => {
      spinIndex = (spinIndex + 1) % eligibleSymbols.length;
      setCurrentSymbol(eligibleSymbols[spinIndex]);
    }, 100);

    // Phase 2: Start slowing down after 1.5s
    phaseTimeoutRef.current = setTimeout(() => {
      setPhase("slowing");
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Slowdown sequence with increasing delays
      const delays = [150, 200, 300, 400, 500, 700];
      let cumulative = 0;
      
      delays.forEach((delay, i) => {
        cumulative += delay;
        const timeout = setTimeout(() => {
          if (i === delays.length - 1) {
            setCurrentSymbol(selectedSymbol);
            setPhase("landed");
            if (stopScrollSoundRef.current) {
              stopScrollSoundRef.current();
              stopScrollSoundRef.current = null;
            }
            slotSounds.playBonusSymbolSelected();
          } else {
            const randomIndex = Math.floor(Math.random() * eligibleSymbols.length);
            setCurrentSymbol(eligibleSymbols[randomIndex]);
          }
        }, cumulative);
        slowdownTimeoutsRef.current.push(timeout);
      });
    }, 1500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
      slowdownTimeoutsRef.current.forEach(t => clearTimeout(t));
      slowdownTimeoutsRef.current = [];
      if (stopScrollSoundRef.current) {
        stopScrollSoundRef.current();
        stopScrollSoundRef.current = null;
      }
    };
  }, [isVisible, eligibleSymbols.length, selectedSymbol?.id]);

  if (!isVisible || !currentSymbol) return null;

  return (
    <div className="flex flex-col items-center">
      {/* Symbol display with roulette effect */}
      <div
        className={cn(
          "relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center",
          "rounded-xl bg-black/40 border-2",
          theme.borderAccentStrong,
          theme.winBarShadow,
          phase === "spinning" && "animate-pulse",
          phase === "landed" && "animate-[symbol-land_0.5s_ease-out]"
        )}
      >
        {currentSymbol.image_url ? (
          <img
            src={currentSymbol.image_url}
            alt={currentSymbol.name}
            className={cn(
              "object-contain transition-all duration-100",
              phase === "landed" ? "w-28 h-28 sm:w-36 sm:h-36" : "w-20 h-20 sm:w-24 sm:h-24",
              phase === "spinning" && "blur-[1px]"
            )}
          />
        ) : (
          <span
            className={cn(
              "transition-all duration-100",
              phase === "landed" ? "text-7xl sm:text-8xl" : "text-5xl sm:text-6xl",
              phase === "spinning" && "blur-[1px]"
            )}
          >
            {getSymbolEmoji(currentSymbol.name)}
          </span>
        )}
        
        {/* Glow effect when landed */}
        {phase === "landed" && (
          <div className={cn("absolute inset-0 rounded-xl animate-pulse", theme.bgAccent)} />
        )}
      </div>

      {/* Symbol name - only show when landed */}
      {phase === "landed" && (
        <div className="mt-4 text-center animate-fade-in">
          <p className={cn("text-2xl font-bold", theme.accentLight)}>{currentSymbol.name}</p>
          <p className="text-sm text-white/50 mt-1">Ekspanderer til hele hjulet ved gevinst!</p>
        </div>
      )}

      {/* Continue button - only show when landed */}
      {phase === "landed" && (
        <button
          onClick={onComplete}
          className={cn(
            "mt-6 px-8 py-3 rounded-xl font-bold text-lg",
            theme.spinBtnGradient,
            theme.spinBtnText,
            "border-2", theme.spinBtnBorder,
            theme.spinBtnShadow,
            "transition-all hover:scale-105 active:scale-95",
            "animate-fade-in"
          )}
        >
          {buttonText} →
        </button>
      )}
    </div>
  );
}
