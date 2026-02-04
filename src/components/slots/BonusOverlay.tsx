import { cn } from "@/lib/utils";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import { BonusCompleteScreen } from "./BonusCompleteScreen";
import { BonusSymbolPicker } from "./BonusSymbolPicker";

interface BonusOverlayProps {
  isVisible: boolean;
  type: "trigger" | "complete" | "retrigger";
  expandingSymbol?: SlotSymbol | null;
  allSymbols?: SlotSymbol[];
  totalWinnings?: number;
  retriggerSpins?: number;
  totalFreeSpins?: number;
  onClose?: () => void;
}

export function BonusOverlay({
  isVisible,
  type,
  expandingSymbol,
  allSymbols = [],
  totalWinnings = 0,
  retriggerSpins = 10,
  totalFreeSpins = 0,
  onClose,
}: BonusOverlayProps) {
  // Use dedicated BonusCompleteScreen for completion
  if (type === "complete") {
    return (
      <BonusCompleteScreen
        isVisible={isVisible}
        totalWinnings={totalWinnings}
        totalSpinsUsed={totalFreeSpins}
        onClose={onClose}
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
          // Egyptian gold theme matching BonusStatusBar and controls
          "bg-gradient-to-b from-amber-950/95 via-amber-900/90 to-amber-950/95 backdrop-blur",
          "border-2 border-amber-600/50",
          "shadow-[0_0_40px_rgba(251,191,36,0.4),0_8px_32px_rgba(0,0,0,0.6)]",
          "animate-in zoom-in-95 duration-500"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative corners */}
        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 border-amber-400/70 rounded-tl-xl" />
        <div className="absolute -top-3 -right-3 w-8 h-8 border-t-4 border-r-4 border-amber-400/70 rounded-tr-xl" />
        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-4 border-l-4 border-amber-400/70 rounded-bl-xl" />
        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 border-amber-400/70 rounded-br-xl" />

        {type === "trigger" ? (
          <>
            {/* Bonus trigger content with symbol picker */}
            <div className="mb-4">
              <span className="text-6xl animate-bounce inline-block">📖</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-300 mb-2 animate-pulse">
              BONUS AKTIVERET!
            </h2>
            <p className="text-xl text-amber-100 mb-6">
              10 GRATIS SPINS!
            </p>
            
            {/* Symbol Picker Animation */}
            <BonusSymbolPicker
              isVisible={isVisible}
              symbols={allSymbols}
              selectedSymbol={expandingSymbol || null}
              onComplete={() => onClose?.()}
            />
          </>
        ) : type === "retrigger" ? (
          <>
            {/* Retrigger content */}
            <div className="mb-4">
              <span className="text-6xl animate-bounce inline-block">📖</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-300 mb-2 animate-pulse">
              RETRIGGER!
            </h2>
            <p className="text-xl text-amber-100 mb-4">
              +{retriggerSpins} GRATIS SPINS!
            </p>
            
            <div className="mt-4 p-4 bg-black/30 rounded-xl">
              <p className="text-amber-200 mb-2">Total Free Spins:</p>
              <div className="text-4xl font-bold text-amber-400">
                {totalFreeSpins}
              </div>
            </div>

            <p className="text-amber-200/60 text-sm mt-6">
              Klik for at fortsætte
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
