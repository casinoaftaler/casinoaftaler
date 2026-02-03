import { cn } from "@/lib/utils";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import { getSymbolEmoji } from "@/lib/slotGameLogic";

interface BonusOverlayProps {
  isVisible: boolean;
  type: "trigger" | "complete" | "retrigger";
  expandingSymbol?: SlotSymbol | null;
  totalWinnings?: number;
  retriggerSpins?: number;
  totalFreeSpins?: number;
  onClose?: () => void;
}

export function BonusOverlay({
  isVisible,
  type,
  expandingSymbol,
  totalWinnings = 0,
  retriggerSpins = 10,
  totalFreeSpins = 0,
  onClose,
}: BonusOverlayProps) {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-black/80 backdrop-blur-sm",
        "animate-in fade-in duration-300"
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "relative p-8 rounded-2xl text-center max-w-md mx-4",
          // Remove purple styling; keep it themed and readable
          "bg-card/90 backdrop-blur",
          "border-4 border-border",
          "shadow-lg",
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
            {/* Bonus trigger content */}
            <div className="mb-4">
              <span className="text-6xl animate-bounce inline-block">📖</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-300 mb-2 animate-pulse">
              BONUS AKTIVERET!
            </h2>
            <p className="text-xl text-amber-100 mb-4">
              10 GRATIS SPINS!
            </p>
            
            {expandingSymbol && (
              <div className="mt-4 p-4 bg-black/30 rounded-xl">
                <p className="text-amber-200 mb-2">Expanding Symbol:</p>
                <div className="flex items-center justify-center gap-3">
                  {expandingSymbol.image_url ? (
                    <img
                      src={expandingSymbol.image_url}
                      alt={expandingSymbol.name}
                      className="w-16 h-16 object-contain"
                    />
                  ) : (
                    <span className="text-5xl">
                      {getSymbolEmoji(expandingSymbol.name)}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-amber-300">
                    {expandingSymbol.name}
                  </span>
                </div>
                <p className="text-sm text-amber-200/70 mt-2">
                  Ekspanderer til hele hjulet ved gevinst!
                </p>
              </div>
            )}

            <p className="text-amber-200/60 text-sm mt-4">
              Klik for at starte
            </p>
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
        ) : (
          <>
            {/* Bonus complete content */}
            <div className="mb-4">
              <span className="text-6xl">🎉</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-300 mb-2">
              BONUS FÆRDIG!
            </h2>
            <p className="text-xl text-amber-100 mb-4">
              Total Gevinst:
            </p>
            <div className="text-5xl font-bold text-amber-400 animate-pulse">
              {totalWinnings}
            </div>
            <p className="text-amber-200/70 mt-2">point</p>

            <p className="text-amber-200/60 text-sm mt-6">
              Klik for at fortsætte
            </p>
          </>
        )}
      </div>
    </div>
  );
}
