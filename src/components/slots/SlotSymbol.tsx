import React from "react";
import { cn } from "@/lib/utils";
import { getSymbolEmoji } from "@/lib/slotGameLogic";
import type { SlotSymbol as SlotSymbolType } from "@/lib/slotGameLogic";

interface SlotSymbolProps {
  symbol: SlotSymbolType;
  isWinning?: boolean;
  isSpinning?: boolean;
  isExpanded?: boolean;
  isNewlyExpanded?: boolean;
  hasLanded?: boolean;
  isTeasing?: boolean;
  isScatterCelebrating?: boolean;
  isDarkened?: boolean;
  gameId?: string;
  shimmerClass?: string;
  size?: number;
}

export const SlotSymbol = React.memo(function SlotSymbol({
  symbol,
  isWinning,
  isSpinning,
  isExpanded,
  isNewlyExpanded,
  hasLanded,
  isTeasing,
  isScatterCelebrating,
  isDarkened,
  gameId,
  shimmerClass,
  size = 150,
}: SlotSymbolProps) {
  const isWizard = gameId === "rise-of-fedesvin";
  const imageSize = Math.max(40, Math.round(size * 0.907));
  const emojiSize = Math.max(32, Math.round(size * 0.53));

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-lg border-2 transition-all duration-300 overflow-hidden",
        isWinning
          ? isWizard
            ? "border-purple-400 scale-105 bg-purple-900/30"
            : "border-amber-400 scale-105 bg-amber-900/30"
          : "border-transparent",
        isSpinning && "animate-pulse",
        isExpanded && (isWizard ? "scale-110 border-purple-400/50" : "scale-110 border-amber-400/50"),
        isNewlyExpanded && "animate-[expansion-flash_0.6s_ease-out]",
        symbol.is_scatter && hasLanded && !isSpinning && "animate-[scatter-land_0.5s_ease-out]",
        isTeasing && symbol.is_scatter && (isWizard
          ? "border-purple-400 animate-[scatter-tease-glow-wizard_1s_ease-in-out_infinite]"
          : "border-amber-400 animate-[scatter-tease-glow_1s_ease-in-out_infinite]"),
        isScatterCelebrating && (isWizard
          ? "border-purple-400 animate-[scatter-celebration-wizard_0.4s_ease-in-out_infinite]"
          : "border-amber-400 animate-[scatter-celebration_0.4s_ease-in-out_infinite]")
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ...(isWinning ? {
          boxShadow: isWizard
            ? "0 0 20px rgba(168,85,247,0.5)"
            : "0 0 20px rgba(251,191,36,0.5)"
        } : {}),
        ...(isScatterCelebrating ? {
          boxShadow: isWizard
            ? "0 0 30px rgba(168,85,247,0.8), 0 0 60px rgba(168,85,247,0.4)"
            : "0 0 30px rgba(251,191,36,0.8), 0 0 60px rgba(251,191,36,0.4)"
        } : {}),
        filter: isDarkened ? "brightness(0.35)" : "brightness(1)",
        transition: "filter 0.15s ease-out"
      }}
    >
      {symbol.image_url ? (
        <div
          className={cn("rounded-lg", shimmerClass)}
          style={{
            width: `${imageSize}px`,
            height: `${imageSize}px`,
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5)) drop-shadow(0 2px 3px rgba(0,0,0,0.3))",
          }}
        >
          <img
            src={symbol.image_url}
            alt={symbol.name}
            loading="eager"
            decoding="async"
            className={cn(
              "w-full h-full object-cover rounded-lg transition-transform duration-300",
              isExpanded && "scale-110",
              isNewlyExpanded && "animate-[symbol-expand_0.5s_ease-out]"
            )}
          />
        </div>
      ) : (
        <span
          className={cn(
            "transition-transform duration-300",
            isExpanded && "scale-110",
            isNewlyExpanded && "animate-[symbol-expand_0.5s_ease-out]"
          )}
          style={{ fontSize: `${emojiSize}px` }}
        >
          {getSymbolEmoji(symbol.name)}
        </span>
      )}

      {isWinning && (
        <div className={cn("absolute inset-0 rounded-lg animate-pulse", isWizard ? "bg-purple-400/20" : "bg-amber-400/20")} />
      )}

      {isExpanded && (
        <div className={cn("absolute inset-0 rounded-lg animate-pulse", isWizard ? "bg-purple-400/20" : "bg-amber-400/20")} />
      )}

      {isNewlyExpanded && (
        <>
          <div className={cn(
            "absolute inset-0 rounded-lg animate-[shine_0.6s_ease-out]",
            isWizard
              ? "bg-gradient-to-r from-purple-500/0 via-purple-400/50 to-purple-500/0"
              : "bg-gradient-to-r from-amber-500/0 via-amber-400/50 to-amber-500/0"
          )} />
          <div className={cn(
            "absolute inset-[-4px] rounded-xl border-2 animate-[expand-ring_0.6s_ease-out] opacity-0",
            isWizard ? "border-purple-300" : "border-amber-300"
          )} />
        </>
      )}
    </div>
  );
});