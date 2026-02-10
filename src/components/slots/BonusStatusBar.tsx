import { cn } from "@/lib/utils";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import { getSymbolEmoji } from "@/lib/slotGameLogic";
import { Sparkles } from "lucide-react";
import { getSlotTheme } from "@/lib/slotTheme";

interface BonusStatusBarProps {
  isActive: boolean;
  freeSpinsRemaining: number;
  totalFreeSpins: number;
  expandingSymbol: SlotSymbol | null;
  expandingSymbols?: SlotSymbol[];
  bonusWinnings: number;
  gameId?: string;
}

export function BonusStatusBar({
  isActive,
  freeSpinsRemaining,
  totalFreeSpins,
  expandingSymbol,
  expandingSymbols = [],
  bonusWinnings,
  gameId,
}: BonusStatusBarProps) {
  if (!isActive) return null;

  const theme = getSlotTheme(gameId);

  return (
    <div
      className={cn(
        "w-full p-3 rounded-xl",
        "bg-gradient-to-b", theme.panelFrom, theme.panelVia, theme.panelTo,
        "backdrop-blur-sm",
        "border-2", theme.borderAccentStrong,
        theme.winBarGlowShadow,
        "animate-[bonus-bar-glow_2s_ease-in-out_infinite]",
        "animate-fade-in"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Bonus indicator */}
        <div className="flex items-center gap-2">
          <Sparkles className={cn("h-5 w-5 animate-pulse", theme.accent, theme.dropShadowGlowStrong)} />
          <span className={cn("text-lg font-bold", theme.accentLight, theme.dropShadowGlowStrong)}>
            FREE SPINS
          </span>
        </div>

        {/* Spins remaining */}
        <div className="flex items-center gap-2">
          <span className={cn("text-base", theme.accentMuted)}>Spins:</span>
          <span className={cn("text-xl font-bold", theme.accentLight, theme.dropShadowGlow)}>
            {freeSpinsRemaining}/{totalFreeSpins}
          </span>
        </div>

        {/* Expanding symbol(s) */}
        {(expandingSymbols.length > 0 || expandingSymbol) && (
          <div className="flex items-center gap-2">
            <span className={cn("text-sm", theme.accentMuted)}>Expanding:</span>
            <div className="flex items-center gap-1">
              {(expandingSymbols.length > 0 ? expandingSymbols : (expandingSymbol ? [expandingSymbol] : [])).map((sym) => (
                <div
                  key={sym.id}
                  className={cn(
                    "flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg border",
                    "bg-gradient-to-b", theme.btnFrom, theme.btnTo,
                    theme.borderAccent,
                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                  )}
                >
                  {sym.image_url ? (
                    <img src={sym.image_url} alt={sym.name} className={cn("w-6 h-6 object-contain", theme.dropShadowGlow)} />
                  ) : (
                    <span className="text-lg">{getSymbolEmoji(sym.name)}</span>
                  )}
                  <span className={cn("font-medium text-sm", theme.accentLight)}>{sym.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bonus winnings */}
        <div className="flex items-center gap-2">
          <span className={cn("text-base", theme.accentMuted)}>Gevinst:</span>
          <span className={cn("text-xl font-bold", theme.accentLight, theme.dropShadowGlowStrong)}>
            {Number(bonusWinnings.toFixed(2))}
          </span>
        </div>
      </div>
    </div>
  );
}
