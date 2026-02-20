import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Crown, Sparkles, Zap } from "lucide-react";
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

export function GatesPayTable({ gameId, bet = 1 }: GatesPayTableProps) {
  const { data: symbols } = useSlotSymbols(gameId);
  const theme = getSlotTheme(gameId);

  const premiumSymbols = symbols?.filter(s => s.rarity === 'premium') || [];
  const commonSymbols = symbols?.filter(s => s.rarity === 'common') || [];
  const scatterSymbol = symbols?.find(s => s.is_scatter);

  const renderSymbolRow = (symbol: NonNullable<typeof symbols>[number]) => (
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
      <TableCell className="text-right">{formatPayout(symbol.multiplier_3, bet)}</TableCell>
      <TableCell className="text-right">{formatPayout(symbol.multiplier_4, bet)}</TableCell>
      <TableCell className="text-right">{formatPayout(symbol.multiplier_5, bet)}</TableCell>
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
        "max-w-md max-h-[80vh] overflow-y-auto",
        theme.dialogBg, theme.dialogBorder, theme.dialogShadow
      )}>
        <DialogHeader>
          <DialogTitle className={cn(theme.accentLight, theme.dropShadowGlowStrong)}>Gevinsttabel</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Viser gevinster ved indsats <strong>{bet}</strong>. Symboler betaler uanset position – <strong>Pay Anywhere</strong>!
          </p>

          {/* Premium Symbols */}
          {premiumSymbols.length > 0 && (
            <div className="space-y-2">
              <div className={cn("flex items-center gap-2", theme.accent)}>
                <Crown className="h-4 w-4" />
                <span className="text-sm font-semibold">Sjældne Symboler</span>
                <span className={cn("text-xs px-2 py-0.5 rounded", theme.bgAccent)}>Høj værdi</span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead className="text-right">8+</TableHead>
                    <TableHead className="text-right">10+</TableHead>
                    <TableHead className="text-right">12+</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {premiumSymbols.map(renderSymbolRow)}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Common Symbols */}
          {commonSymbols.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-sm font-semibold">Almindelige Symboler</span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead className="text-right">8+</TableHead>
                    <TableHead className="text-right">10+</TableHead>
                    <TableHead className="text-right">12+</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commonSymbols.map(renderSymbolRow)}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Scatter */}
          {scatterSymbol && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-purple-400">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">Scatter</span>
                <span className="text-xs bg-purple-500/20 px-2 py-0.5 rounded">Bonus</span>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center gap-2">
                  {scatterSymbol.image_url ? (
                    <img src={scatterSymbol.image_url} alt={scatterSymbol.name} className="w-6 h-6" />
                  ) : (
                    <span>{getSymbolEmoji(scatterSymbol.name)}</span>
                  )}
                  <span className="font-medium">{scatterSymbol.name}</span>
                </div>
                <p className="text-xs text-purple-400/80">
                  4+ Scatter udløser 15 gratis spins! 3+ Scatter under bonus giver 5 ekstra spins.
                </p>
              </div>
            </div>
          )}

          {/* Multiplier Orbs */}
          <div className="space-y-2">
            <div className={cn("flex items-center gap-2", theme.accent)}>
              <Zap className="h-4 w-4" />
              <span className="text-sm font-semibold">Multiplier Kugler</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Under tumble-sekvenser kan tilfældige multiplier-kugler (2x–500x) lande. 
              Alle multipliers lægges sammen og ganges på den samlede gevinst efter alle tumbles er færdige.
            </p>
          </div>

          {/* Game Rules */}
          <div className="text-sm text-muted-foreground space-y-2 pt-2 border-t">
            <p><strong>Pay Anywhere</strong> – 8+ ens symboler hvor som helst på 6×5 gitteret giver gevinst.</p>
            <p><strong>Tumble</strong> – Vindende symboler fjernes, og nye falder ned. Fortsætter til ingen nye gevinster.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
