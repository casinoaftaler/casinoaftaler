import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Crown, Sparkles } from "lucide-react";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { getSymbolEmoji, RARITY_LABELS } from "@/lib/slotGameLogic";
import { cn } from "@/lib/utils";

// Format multiplier: show "5×" for whole numbers, "1.5×" for decimals
const formatMultiplier = (value: number): string => {
  return Number.isInteger(value) ? `${value}×` : `${parseFloat(value.toFixed(2))}×`;
};

export function PayTable() {
  const { data: symbols } = useSlotSymbols();

  // Group symbols by rarity
  const premiumSymbols = symbols?.filter(s => s.rarity === 'premium') || [];
  const commonSymbols = symbols?.filter(s => s.rarity === 'common') || [];
  const scatterSymbol = symbols?.find(s => s.is_scatter);

  const renderPremiumSymbolRow = (symbol: typeof symbols extends (infer T)[] | undefined ? T : never) => (
    <TableRow key={symbol.id}>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          {symbol.image_url ? (
            <img src={symbol.image_url} alt={symbol.name} className="w-6 h-6" />
          ) : (
            <span>{getSymbolEmoji(symbol.name)}</span>
          )}
          <span>{symbol.name}</span>
        </div>
      </TableCell>
      <TableCell className="text-right">{formatMultiplier(symbol.multiplier_2)}</TableCell>
      <TableCell className="text-right">{formatMultiplier(symbol.multiplier_3)}</TableCell>
      <TableCell className="text-right">{formatMultiplier(symbol.multiplier_4)}</TableCell>
      <TableCell className="text-right">{formatMultiplier(symbol.multiplier_5)}</TableCell>
    </TableRow>
  );

  const renderCommonSymbolRow = (symbol: typeof symbols extends (infer T)[] | undefined ? T : never) => (
    <TableRow key={symbol.id}>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          {symbol.image_url ? (
            <img src={symbol.image_url} alt={symbol.name} className="w-6 h-6" />
          ) : (
            <span>{getSymbolEmoji(symbol.name)}</span>
          )}
          <span>{symbol.name}</span>
        </div>
      </TableCell>
      <TableCell className="text-right">{formatMultiplier(symbol.multiplier_3)}</TableCell>
      <TableCell className="text-right">{formatMultiplier(symbol.multiplier_4)}</TableCell>
      <TableCell className="text-right">{formatMultiplier(symbol.multiplier_5)}</TableCell>
    </TableRow>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "gap-2 px-3 py-2",
            "bg-gradient-to-b from-amber-800/60 to-amber-950/60",
            "border border-amber-500/40",
            "text-amber-300 hover:text-amber-200",
            "hover:bg-gradient-to-b hover:from-amber-700/70 hover:to-amber-900/70",
            "hover:border-amber-400/60",
            "shadow-[inset_0_1px_0_rgba(251,191,36,0.2)]",
            "transition-all duration-200"
          )}
        >
          <BookOpen className="h-4 w-4 drop-shadow-[0_0_4px_rgba(251,191,36,0.4)]" />
          Gevinsttabel
        </Button>
      </DialogTrigger>
      <DialogContent className={cn(
        "max-w-md max-h-[80vh] overflow-y-auto",
        "bg-gradient-to-b from-amber-950 via-amber-900/95 to-amber-950",
        "border-2 border-amber-600/50",
        "shadow-[0_0_40px_rgba(251,191,36,0.3),0_8px_32px_rgba(0,0,0,0.5)]"
      )}>
        <DialogHeader>
          <DialogTitle className="text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">Gevinsttabel</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Gevinster multipliceres med din indsats. Book er både Wild og Scatter - 3+ Books udløser bonus!
          </p>
          
          {/* Premium Symbols Section */}
          {premiumSymbols.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400">
                <Crown className="h-4 w-4" />
                <span className="text-sm font-semibold">{RARITY_LABELS.premium} Symboler</span>
                <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded">Vinder fra 2×</span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead className="text-right">2×</TableHead>
                    <TableHead className="text-right">3×</TableHead>
                    <TableHead className="text-right">4×</TableHead>
                    <TableHead className="text-right">5×</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {premiumSymbols.map(renderPremiumSymbolRow)}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Common Symbols Section */}
          {commonSymbols.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-sm font-semibold">{RARITY_LABELS.common} Symboler</span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead className="text-right">3×</TableHead>
                    <TableHead className="text-right">4×</TableHead>
                    <TableHead className="text-right">5×</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commonSymbols.map(renderCommonSymbolRow)}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Scatter Section */}
          {scatterSymbol && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-purple-400">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">{RARITY_LABELS.scatter}</span>
                <span className="text-xs bg-purple-500/20 px-2 py-0.5 rounded">Wild + Bonus</span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead className="text-right">3×</TableHead>
                    <TableHead className="text-right">4×</TableHead>
                    <TableHead className="text-right">5×</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {scatterSymbol.image_url ? (
                          <img src={scatterSymbol.image_url} alt={scatterSymbol.name} className="w-6 h-6" />
                        ) : (
                          <span>{getSymbolEmoji(scatterSymbol.name)}</span>
                        )}
                        <span>{scatterSymbol.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{formatMultiplier(scatterSymbol.multiplier_3)}</TableCell>
                    <TableCell className="text-right">{formatMultiplier(scatterSymbol.multiplier_4)}</TableCell>
                    <TableCell className="text-right">{formatMultiplier(scatterSymbol.multiplier_5)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-xs text-purple-400/80">
                3+ Books giver 10 gratis spins med et tilfældigt ekspanderende symbol!
              </p>
            </div>
          )}
          
          <div className="text-sm text-muted-foreground space-y-2 pt-2 border-t">
            <p><strong>10 gevinstlinjer</strong> - Gevinster tælles fra venstre mod højre.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
