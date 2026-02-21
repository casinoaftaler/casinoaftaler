import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles } from "lucide-react";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { getSymbolEmoji } from "@/lib/slotGameLogic";
import { cn } from "@/lib/utils";
import { getSlotTheme } from "@/lib/slotTheme";

const formatPayout = (multiplier: number, bet: number): string => {
  const payout = multiplier * bet;
  return Number.isInteger(payout) ? `${payout}` : `${parseFloat(payout.toFixed(2))}`;
};

interface GatesPayTableProps {
  gameId: string;
  bet?: number;
}

interface SymbolCardProps {
  symbol: {
    id: string;
    name: string;
    image_url: string | null;
    multiplier_3: number;
    multiplier_4: number;
    multiplier_5: number;
  };
  bet: number;
}

function SymbolCard({ symbol, bet }: SymbolCardProps) {
  return (
    <div className="flex flex-col items-center border border-blue-500/20 rounded-lg bg-blue-950/40 p-2 min-w-0">
      <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-1.5">
        {symbol.image_url ? (
          <img src={symbol.image_url} alt={symbol.name} className="w-full h-full object-contain" />
        ) : (
          <span className="text-2xl">{getSymbolEmoji(symbol.name)}</span>
        )}
      </div>
      <div className="w-full space-y-0.5 text-[10px] md:text-xs">
        <div className="flex justify-between gap-1">
          <span className="text-blue-300/70">12-30</span>
          <span className="text-blue-100 font-medium">{formatPayout(symbol.multiplier_5, bet)}</span>
        </div>
        <div className="flex justify-between gap-1">
          <span className="text-blue-300/70">10-11</span>
          <span className="text-blue-100 font-medium">{formatPayout(symbol.multiplier_4, bet)}</span>
        </div>
        <div className="flex justify-between gap-1">
          <span className="text-blue-300/70">8-9</span>
          <span className="text-blue-100 font-medium">{formatPayout(symbol.multiplier_3, bet)}</span>
        </div>
      </div>
    </div>
  );
}

export function GatesPayTable({ gameId, bet = 1 }: GatesPayTableProps) {
  const { data: symbols } = useSlotSymbols(gameId);
  const theme = getSlotTheme(gameId);

  const premiumSymbols = symbols?.filter(s => s.rarity === 'premium') || [];
  const commonSymbols = symbols?.filter(s => s.rarity === 'common') || [];
  const scatterSymbol = symbols?.find(s => s.is_scatter);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "gap-2 px-3 py-2",
            "bg-gradient-to-b", theme.btnFrom, theme.btnTo,
            "border", theme.borderAccent,
            theme.accentLight,
            "hover:bg-gradient-to-b", theme.btnHoverFrom, theme.btnHoverTo,
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
            "transition-all duration-200"
          )}
        >
          <BookOpen className={cn("h-4 w-4", theme.dropShadowGlow)} />
          Gevinsttabel
        </Button>
      </DialogTrigger>
      <DialogContent className={cn(
        "max-w-lg max-h-[80vh] overflow-y-auto",
        theme.dialogBg, theme.dialogBorder, theme.dialogShadow
      )}>
        <DialogHeader>
          <DialogTitle className={cn(theme.accentLight, theme.dropShadowGlowStrong, "text-center text-lg")}>
            GAME RULES
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-xs text-blue-200/70 text-center leading-relaxed">
            Symbols pay anywhere on the screen. The total number of the same symbol on the screen at the end of a spin determines the value of the win.
          </p>

          {/* Premium Symbols Row */}
          {premiumSymbols.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {premiumSymbols.map(symbol => (
                <SymbolCard key={symbol.id} symbol={symbol} bet={bet} />
              ))}
            </div>
          )}

          {/* Common Symbols Row */}
          {commonSymbols.length > 0 && (
            <div className="grid grid-cols-5 gap-1.5">
              {commonSymbols.map(symbol => (
                <SymbolCard key={symbol.id} symbol={symbol} bet={bet} />
              ))}
            </div>
          )}

          {/* Scatter */}
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
                      <span className="text-purple-100 font-medium">{formatPayout(scatterSymbol.multiplier_5, bet)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-300/70">5</span>
                      <span className="text-purple-100 font-medium">{formatPayout(scatterSymbol.multiplier_4, bet)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-300/70">4</span>
                      <span className="text-purple-100 font-medium">{formatPayout(scatterSymbol.multiplier_3, bet)}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-purple-400/70 pt-1">
                    4+ Scatter udløser 15 gratis spins! 3+ Scatter under bonus giver 5 ekstra spins.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Game Rules Footer */}
          <div className="text-[11px] text-blue-200/50 space-y-1 pt-2 border-t border-blue-500/10">
            <p><strong className="text-blue-200/70">Pay Anywhere</strong> – 8+ ens symboler hvor som helst på 6×5 gitteret giver gevinst.</p>
            <p><strong className="text-blue-200/70">Tumble</strong> – Vindende symboler fjernes, og nye falder ned.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
