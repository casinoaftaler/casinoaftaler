import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Crown, Sparkles } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { getSymbolEmoji, RARITY_LABELS } from "@/lib/slotGameLogic";
import { cn } from "@/lib/utils";
import { getSlotTheme } from "@/lib/slotTheme";

// Format payout: show actual credit amount based on bet
const formatPayout = (multiplier: number, bet: number): string => {
  const payout = multiplier * bet;
  return Number.isInteger(payout) ? `${payout}` : `${parseFloat(payout.toFixed(2))}`;
};

interface PayTableProps {
  gameId?: string;
  bet?: number;
}

export function PayTable({ gameId, bet = 1 }: PayTableProps) {
  const { data: symbols } = useSlotSymbols(gameId);
  const theme = getSlotTheme(gameId);

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
      <TableCell className="text-right">{formatPayout(symbol.multiplier_2, bet)}</TableCell>
      <TableCell className="text-right">{formatPayout(symbol.multiplier_3, bet)}</TableCell>
      <TableCell className="text-right">{formatPayout(symbol.multiplier_4, bet)}</TableCell>
      <TableCell className="text-right">{formatPayout(symbol.multiplier_5, bet)}</TableCell>
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
          <MenuIcon iconName="book-open" className="h-5 w-5" />
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
            Viser gevinster ved indsats <strong>{bet}</strong>. Scatter er både Wild og Scatter - 3+ udløser bonus!
          </p>
          
          {/* Premium Symbols Section */}
          {premiumSymbols.length > 0 && (
            <div className="space-y-2">
              <div className={cn("flex items-center gap-2", theme.accent)}>
                <MenuIcon iconName="crown" className="h-4 w-4" />
                <span className="text-sm font-semibold">{RARITY_LABELS.premium} Symboler</span>
                <span className={cn("text-xs px-2 py-0.5 rounded", theme.bgAccent)}>Vinder fra 2×</span>
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
                <MenuIcon iconName="sparkles" className="h-4 w-4" />
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
                    <TableCell className="text-right">{formatPayout(scatterSymbol.multiplier_3, bet)}</TableCell>
                    <TableCell className="text-right">{formatPayout(scatterSymbol.multiplier_4, bet)}</TableCell>
                    <TableCell className="text-right">{formatPayout(scatterSymbol.multiplier_5, bet)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-xs text-purple-400/80">
                3+ Scatter giver 10 gratis spins med et tilfældigt ekspanderende symbol!
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
