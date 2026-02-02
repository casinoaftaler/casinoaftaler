import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen } from "lucide-react";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { getSymbolEmoji } from "@/lib/slotGameLogic";

export function PayTable() {
  const { data: symbols } = useSlotSymbols();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <BookOpen className="h-4 w-4" />
          Gevinsttabel
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gevinsttabel</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Gevinster multipliceres med din indsats. Book er både Wild og Scatter - 3+ Books udløser bonus!
          </p>
          
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
              {symbols?.map((symbol) => (
                <TableRow key={symbol.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {symbol.image_url ? (
                        <img src={symbol.image_url} alt={symbol.name} className="w-6 h-6" />
                      ) : (
                        <span>{getSymbolEmoji(symbol.name)}</span>
                      )}
                      <span>{symbol.name}</span>
                      {symbol.is_scatter && (
                        <span className="text-xs bg-purple-500/20 text-purple-400 px-1 rounded">WILD</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{symbol.multiplier_3}×</TableCell>
                  <TableCell className="text-right">{symbol.multiplier_4}×</TableCell>
                  <TableCell className="text-right">{symbol.multiplier_5}×</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>10 gevinstlinjer</strong> - Gevinster tælles fra venstre mod højre.</p>
            <p><strong>Book (Wild/Scatter)</strong> - Erstatter alle symboler. 3+ Books giver 10 gratis spins!</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
