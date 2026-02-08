import { cn } from "@/lib/utils";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import { getSymbolEmoji } from "@/lib/slotGameLogic";
import { BonusCompleteScreen } from "./BonusCompleteScreen";
import { BonusSymbolPicker } from "./BonusSymbolPicker";
import { getSlotTheme } from "@/lib/slotTheme";

interface BonusOverlayProps {
  isVisible: boolean;
  type: "trigger" | "complete" | "retrigger";
  expandingSymbol?: SlotSymbol | null;
  expandingSymbols?: SlotSymbol[];
  allSymbols?: SlotSymbol[];
  totalWinnings?: number;
  retriggerSpins?: number;
  totalFreeSpins?: number;
  newRetriggerSymbol?: SlotSymbol | null;
  onClose?: () => void;
  gameId?: string;
}

export function BonusOverlay({
  isVisible,
  type,
  expandingSymbol,
  expandingSymbols = [],
  allSymbols = [],
  totalWinnings = 0,
  retriggerSpins = 10,
  totalFreeSpins = 0,
  newRetriggerSymbol,
  onClose,
  gameId,
}: BonusOverlayProps) {
  const theme = getSlotTheme(gameId);
  // Find the scatter symbol for display
  const scatterSymbol = allSymbols.find(s => s.is_scatter);
  
  // Use dedicated BonusCompleteScreen for completion
  if (type === "complete") {
    return (
      <BonusCompleteScreen
        isVisible={isVisible}
        totalWinnings={totalWinnings}
        totalSpinsUsed={totalFreeSpins}
        expandingSymbols={expandingSymbols}
        scatterImageUrl={scatterSymbol?.image_url || null}
        onClose={onClose}
        gameId={gameId}
      />
    );
  }

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-black/80 backdrop-blur-sm",
        "animate-in fade-in duration-300"
      )}
      onClick={type === "retrigger" ? onClose : undefined}
    >
      <div
        className={cn(
          "relative p-8 rounded-2xl text-center max-w-md mx-4",
          theme.dialogBg, "backdrop-blur",
          theme.dialogBorder,
          theme.dialogShadow,
          "animate-in zoom-in-95 duration-500"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative corners */}
        <div className={cn("absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 rounded-tl-xl", theme.frameBorderColor, "opacity-70")} />
        <div className={cn("absolute -top-3 -right-3 w-8 h-8 border-t-4 border-r-4 rounded-tr-xl", theme.frameBorderColor, "opacity-70")} />
        <div className={cn("absolute -bottom-3 -left-3 w-8 h-8 border-b-4 border-l-4 rounded-bl-xl", theme.frameBorderColor, "opacity-70")} />
        <div className={cn("absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 rounded-br-xl", theme.frameBorderColor, "opacity-70")} />

        {type === "trigger" ? (
          <>
            {/* Bonus trigger content with symbol picker */}
            <div className="mb-4">
              {scatterSymbol?.image_url ? (
                <img 
                  src={scatterSymbol.image_url} 
                  alt="Scatter" 
                  className={cn(
                    "w-20 h-20 object-cover rounded-lg animate-bounce inline-block",
                    theme.dropShadowGlowStrong
                  )}
                />
              ) : (
                <span className="text-6xl animate-bounce inline-block">📖</span>
              )}
            </div>
            <h2 className={cn("text-3xl sm:text-4xl font-bold mb-2 animate-pulse", theme.accentLight)}>
              BONUS AKTIVERET!
            </h2>
            <p className="text-xl text-white/90 mb-6">
              10 GRATIS SPINS!
            </p>
            
            {/* Symbol Picker Animation */}
            <BonusSymbolPicker
              isVisible={isVisible}
              symbols={allSymbols}
              selectedSymbol={expandingSymbol || null}
              onComplete={() => onClose?.()}
              gameId={gameId}
            />
          </>
        ) : type === "retrigger" ? (
          <>
            {/* Retrigger content */}
            <div className="mb-4">
              {newRetriggerSymbol?.image_url ? (
                <img 
                  src={newRetriggerSymbol.image_url} 
                  alt={newRetriggerSymbol.name} 
                  className={cn("w-20 h-20 object-cover rounded-lg animate-bounce inline-block", theme.dropShadowGlowStrong)}
                />
              ) : scatterSymbol?.image_url ? (
                <img 
                  src={scatterSymbol.image_url} 
                  alt="Scatter" 
                  className={cn("w-20 h-20 object-cover rounded-lg animate-bounce inline-block", theme.dropShadowGlowStrong)}
                />
              ) : (
                <span className="text-6xl animate-bounce inline-block">📖</span>
              )}
            </div>
            <h2 className={cn("text-3xl sm:text-4xl font-bold mb-2 animate-pulse", theme.accentLight)}>
              RETRIGGER!
            </h2>
            
            {/* Show new expanding symbol if Rise of Fedesvin */}
            {newRetriggerSymbol ? (
              <div className="mb-4">
                <p className="text-lg text-white/90 mb-2">NYT EXPANDING SYMBOL!</p>
                <div className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 bg-black/30 rounded-xl border",
                  theme.borderAccent
                )}>
                  {newRetriggerSymbol.image_url ? (
                    <img 
                      src={newRetriggerSymbol.image_url} 
                      alt={newRetriggerSymbol.name} 
                      className={cn("w-10 h-10 object-contain", theme.dropShadowGlowStrong)}
                    />
                  ) : (
                    <span className="text-2xl">{getSymbolEmoji(newRetriggerSymbol.name)}</span>
                  )}
                  <span className={cn("text-xl font-bold", theme.accentLight)}>{newRetriggerSymbol.name}</span>
                </div>
              </div>
            ) : (
              <p className="text-xl text-white/90 mb-4">
                +{retriggerSpins} GRATIS SPINS!
              </p>
            )}
            
            <div className="mt-4 p-4 bg-black/30 rounded-xl">
              <p className="text-white/80 mb-2">
                {newRetriggerSymbol ? `+${retriggerSpins} Gratis Spins` : "Total Free Spins:"}
              </p>
              <div className={cn("text-4xl font-bold", theme.accent, theme.dropShadowGlowStrong)}>
                {totalFreeSpins}
              </div>
            </div>

            <p className="text-white/40 text-sm mt-6">
              Klik for at fortsætte
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
