import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Target } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  huntNumber: number;
  huntDate: string;
  latestHuntNumber: number;
  maxHuntNumber: number;
  onNavigate?: (direction: 'first' | 'prev' | 'next' | 'last') => void;
  onJumpToHunt?: (huntNumber: number) => void;
}

export function BonusHuntNavBar({ huntNumber, huntDate, latestHuntNumber, maxHuntNumber, onNavigate, onJumpToHunt }: Props) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground" onClick={() => onNavigate?.('first')}>
        <ChevronsLeft className="h-3.5 w-3.5" />
      </Button>
      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground" onClick={() => onNavigate?.('prev')}>
        <ChevronLeft className="h-3.5 w-3.5" />
      </Button>
      <Select
        value={String(huntNumber)}
        onValueChange={(val) => onJumpToHunt?.(parseInt(val, 10))}
      >
        <SelectTrigger className="w-auto min-w-[170px] h-8 text-xs font-semibold px-2.5 rounded-lg border-border/40">
          <span className="flex items-center gap-1.5">
            <Target className="h-3 w-3 text-primary shrink-0" />
            <SelectValue />
          </span>
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {Array.from({ length: maxHuntNumber - 1 }, (_, i) => maxHuntNumber - i).map(num => (
            <SelectItem key={num} value={String(num)}>
              <span className="flex items-center gap-1.5 text-xs">
                <Target className="h-3 w-3 text-primary" />
                BONUS HUNT #{num} {num === huntNumber ? huntDate : ''} {num > latestHuntNumber ? '🔴 LIVE' : ''}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground" onClick={() => onNavigate?.('next')}>
        <ChevronRight className="h-3.5 w-3.5" />
      </Button>
      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground" onClick={() => onNavigate?.('last')}>
        <ChevronsRight className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
