import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Infinity, Zap, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type AutoSpinCount = 10 | 25 | 50 | 100 | "infinite";

interface AutoSpinPopoverProps {
  isAutoSpinning: boolean;
  autoSpinCount: AutoSpinCount;
  onAutoSpinCountChange: (count: AutoSpinCount) => void;
  onToggle: () => void;
  autoSpinsRemaining: number | null;
  disabled?: boolean;
}

const counts: AutoSpinCount[] = [10, 25, 50, 100, "infinite"];

export function AutoSpinPopover({
  isAutoSpinning,
  autoSpinCount,
  onAutoSpinCountChange,
  onToggle,
  autoSpinsRemaining,
  disabled,
}: AutoSpinPopoverProps) {
  const [open, setOpen] = useState(false);

  const handleStart = () => {
    onToggle();
    setOpen(false);
  };

  if (isAutoSpinning) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 hover:text-red-300"
        onClick={onToggle}
      >
        <Square className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-lg bg-blue-800/40 border border-blue-500/30 text-blue-300 hover:bg-blue-700/50 hover:text-blue-200"
          disabled={disabled}
        >
          <Zap className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-52 p-3 bg-blue-950/95 border-blue-500/30 backdrop-blur-md"
        align="center"
        side="top"
        sideOffset={8}
      >
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
            Auto Spin
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            {counts.map((count) => (
              <button
                key={String(count)}
                onClick={() => onAutoSpinCountChange(count)}
                className={cn(
                  "h-8 rounded-md text-xs font-bold transition-all border",
                  autoSpinCount === count
                    ? "bg-blue-500/30 border-blue-400/50 text-blue-200"
                    : "bg-blue-900/40 border-blue-500/20 text-blue-400/70 hover:bg-blue-800/40 hover:text-blue-300"
                )}
              >
                {count === "infinite" ? <Infinity className="h-3.5 w-3.5 mx-auto" /> : count}
              </button>
            ))}
          </div>
          <Button
            className="w-full h-8 text-xs font-bold bg-blue-600/80 hover:bg-blue-500/80 text-white border border-blue-400/30"
            onClick={handleStart}
            disabled={disabled}
          >
            START
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
