import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
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
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onNavigate?.('first')}>
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onNavigate?.('prev')}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Select
        value={String(huntNumber)}
        onValueChange={(val) => onJumpToHunt?.(parseInt(val, 10))}
      >
        <SelectTrigger className="w-auto min-w-[200px] h-8 text-sm font-semibold">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {Array.from({ length: maxHuntNumber }, (_, i) => maxHuntNumber - i).map(num => (
            <SelectItem key={num} value={String(num)}>
              BONUS HUNT #{num} {num === huntNumber ? huntDate : ''} {num > latestHuntNumber ? '🔴 LIVE' : ''}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onNavigate?.('next')}>
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onNavigate?.('last')}>
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
