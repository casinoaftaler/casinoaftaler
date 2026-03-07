import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Target } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  huntNumber: number;
  huntDate: string;
  latestHuntNumber: number;
  maxHuntNumber: number;
  availableHuntNumbers: number[];
  onNavigate?: (direction: 'first' | 'prev' | 'next' | 'last') => void;
  onJumpToHunt?: (huntNumber: number) => void;
}

export function BonusHuntNavBar({ huntNumber, huntDate, latestHuntNumber, maxHuntNumber, availableHuntNumbers, onNavigate, onJumpToHunt }: Props) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => onNavigate?.('first')} aria-label="Første hunt">
        <ChevronsLeft className="h-3.5 w-3.5" />
      </Button>
      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => onNavigate?.('prev')} aria-label="Forrige hunt">
        <ChevronLeft className="h-3.5 w-3.5" />
      </Button>
      <Select
        value={String(huntNumber)}
        onValueChange={(val) => onJumpToHunt?.(parseInt(val, 10))}
      >
        <SelectTrigger className="w-auto min-w-[160px] h-8 text-xs font-semibold px-2.5 rounded-lg border-border/40">
          <span className="flex items-center gap-1.5">
            <Target className="h-3 w-3 text-primary shrink-0" />
            <SelectValue />
          </span>
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {availableHuntNumbers.map(num => (
            <SelectItem key={num} value={String(num)} className="text-xs">
              <span className="flex items-center gap-1.5">
                <Target className="h-3 w-3 text-primary" />
                BONUS HUNT #{num} {num === huntNumber ? huntDate : ''} {num > latestHuntNumber ? '🔴 LIVE' : ''}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => onNavigate?.('next')} aria-label="Næste hunt">
        <ChevronRight className="h-3.5 w-3.5" />
      </Button>
      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => onNavigate?.('last')} aria-label="Sidste hunt">
        <ChevronsRight className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
