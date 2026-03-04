import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles } from "lucide-react";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { getSymbolEmoji } from "@/lib/slotGameLogic";
import { cn } from "@/lib/utils";

const formatPayout = (multiplier: number, bet: number): string => {
  const payout = multiplier * bet;
  return Number.isInteger(payout) ? `${payout}` : `${parseFloat(payout.toFixed(2))}`;
};

interface BonanzaPayTableProps {
  gameId: string;
  bet?: number;
  className?: string;
}

function SymbolCard({ symbol, bet }: { symbol: any; bet: number }) {
  return (
    <div className="flex flex-col items-center border border-pink-500/20 rounded-lg bg-pink-950/40 p-2 min-w-0">
      <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-1.5">
        {symbol.image_url ? (
          <img src={symbol.image_url} alt={symbol.name} className="w-full h-full object-contain" />
        ) : (
          <span className="text-2xl">{getSymbolEmoji(symbol.name)}</span>
        )}
      </div>
      <div className="w-full space-y-0.5 text-[10px] md:text-xs">
        <div className="flex justify-between gap-1">
          <span className="text-pink-300/70">12+</span>
          <span className="text-pink-100 font-medium">kr {formatPayout(symbol.multiplier_5, bet)}</span>
        </div>
        <div className="flex justify-between gap-1">
          <span className="text-pink-300/70">10-11</span>
          <span className="text-pink-100 font-medium">kr {formatPayout(symbol.multiplier_4, bet)}</span>
        </div>
        <div className="flex justify-between gap-1">
          <span className="text-pink-300/70">8-9</span>
          <span className="text-pink-100 font-medium">kr {formatPayout(symbol.multiplier_3, bet)}</span>
        </div>
      </div>
    </div>
  );
}

export function BonanzaPayTable({ gameId, bet = 1, className }: BonanzaPayTableProps) {
  const { data: symbols } = useSlotSymbols(gameId);

  const premiumSymbols = symbols?.filter(s => s.rarity === 'premium') || [];
  const commonSymbols = symbols?.filter(s => s.rarity === 'common') || [];
  const scatterSymbol = symbols?.find(s => s.is_scatter);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
            "bg-black/30 backdrop-blur-sm",
            "border-2 border-white/15",
            "text-white/70",
            "hover:bg-white/10 hover:border-white/30 hover:text-white",
            "transition-all duration-150",
            className
          )}
        >
          <span className="text-base font-black" style={{ fontFamily: "serif", fontStyle: "italic" }}>i</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto bg-gradient-to-b from-pink-950/95 via-fuchsia-950/95 to-pink-950/95 border-pink-500/30 shadow-[0_0_60px_rgba(236,72,153,0.2)]">
        <DialogHeader>
          <DialogTitle className="text-pink-200 drop-shadow-[0_0_10px_rgba(236,72,153,0.6)] text-center text-lg">
            GEVINSTTABEL
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-xs text-pink-200/70 text-center leading-relaxed">
            Symboler betaler overalt på skærmen. Det samlede antal af samme symbol bestemmer gevinstens værdi.
          </p>

          {/* Premium symbols — 2 rows of 4 */}
          {premiumSymbols.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {premiumSymbols.map(symbol => (
                <SymbolCard key={symbol.id} symbol={symbol} bet={bet} />
              ))}
            </div>
          )}

          {/* Common symbols — 1 row of 5 */}
          {commonSymbols.length > 0 && (
            <div className="grid grid-cols-5 gap-1.5">
              {commonSymbols.map(symbol => (
                <SymbolCard key={symbol.id} symbol={symbol} bet={bet} />
              ))}
            </div>
          )}

          {/* Scatter section */}
          {scatterSymbol && (
            <div className="border border-purple-500/30 rounded-lg bg-purple-950/30 p-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                  {scatterSymbol.image_url ? (
                    <img src={scatterSymbol.image_url} alt={scatterSymbol.name} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-2xl">{getSymbolEmoji(scatterSymbol.name)}</span>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                    <span className="text-sm font-semibold text-purple-300">Scatter</span>
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-purple-300/70">6+</span>
                      <span className="text-purple-100 font-medium">kr {formatPayout(scatterSymbol.multiplier_5, bet)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-300/70">5</span>
                      <span className="text-purple-100 font-medium">kr {formatPayout(scatterSymbol.multiplier_4, bet)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-300/70">4</span>
                      <span className="text-purple-100 font-medium">kr {formatPayout(scatterSymbol.multiplier_3, bet)}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-purple-400/70 pt-1">
                    4+ Scatter udløser gratis spins! 3+ Scatter under bonus giver 5 ekstra spins.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Game Rules Footer */}
          <div className="text-[11px] text-pink-200/50 space-y-1 pt-2 border-t border-pink-500/10">
            <p><strong className="text-pink-200/70">Pay Anywhere</strong> – 8+ ens symboler hvor som helst på 6×5 gitteret giver gevinst.</p>
            <p><strong className="text-pink-200/70">Tumble</strong> – Vindende symboler fjernes, og nye falder ned.</p>
            <p><strong className="text-pink-200/70">Multiplier Bomber</strong> – I bonus lander bomber med multiplier-værdier. De aktiveres efter alle tumble-gevinster.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
