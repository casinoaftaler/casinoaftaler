import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface BetControlsProps {
  bet: number;
  onBetChange: (bet: number) => void;
  disabled?: boolean;
  minBet?: number;
  maxBet?: number;
}

export function BetControls({
  bet,
  onBetChange,
  disabled,
  minBet = 1,
  maxBet = 10,
}: BetControlsProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Indsats:</span>
      <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-2 py-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onBetChange(Math.max(minBet, bet - 1))}
          disabled={disabled || bet <= minBet}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center font-bold text-lg">{bet}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onBetChange(Math.min(maxBet, bet + 1))}
          disabled={disabled || bet >= maxBet}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
