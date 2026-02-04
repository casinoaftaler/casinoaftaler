import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Play, Square, ChevronDown, Infinity } from "lucide-react";
import { cn } from "@/lib/utils";

type AutoSpinCount = 10 | 25 | 50 | 100 | "infinite";

interface AutospinRowProps {
  isAutoSpinning: boolean;
  autoSpinCount: AutoSpinCount;
  onAutoSpinCountChange: (count: AutoSpinCount) => void;
  onToggle: () => void;
  autoSpinsRemaining: number | null;
  disabled?: boolean;
}

export function AutospinRow({
  isAutoSpinning,
  autoSpinCount,
  onAutoSpinCountChange,
  onToggle,
  autoSpinsRemaining,
  disabled,
}: AutospinRowProps) {
  const counts: AutoSpinCount[] = [10, 25, 50, 100, "infinite"];

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
      {/* Autospin count selector - only show when not spinning */}
      {!isAutoSpinning && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-10 px-3 text-sm font-bold border-2 border-amber-600/50 bg-gradient-to-b from-amber-950/90 to-amber-900/70 hover:from-amber-900/90 hover:to-amber-800/70 text-amber-300 shadow-[inset_0_1px_0_rgba(251,191,36,0.2),0_4px_12px_rgba(0,0,0,0.3)]"
              disabled={disabled}
            >
              {autoSpinCount === "infinite" ? (
                <Infinity className="h-4 w-4" />
              ) : (
                autoSpinCount
              )}
              <ChevronDown className="ml-1.5 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-background border-amber-500/30">
            {counts.map((count) => (
              <DropdownMenuItem
                key={String(count)}
                onClick={() => onAutoSpinCountChange(count)}
                className={cn(
                  "text-base cursor-pointer",
                  autoSpinCount === count && "bg-amber-500/20"
                )}
              >
                {count === "infinite" ? (
                  <span className="flex items-center gap-2">
                    <Infinity className="h-4 w-4" /> Uendelig
                  </span>
                ) : (
                  `${count} spins`
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Autospin toggle button */}
      <Button
        variant={isAutoSpinning ? "destructive" : "outline"}
        className={cn(
          "h-10 px-4 text-sm font-bold transition-all shadow-[0_4px_12px_rgba(0,0,0,0.3)]",
          isAutoSpinning
            ? "bg-gradient-to-b from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 text-white border-2 border-red-400/50"
            : "border-2 border-amber-600/50 bg-gradient-to-b from-amber-950/90 to-amber-900/70 hover:from-amber-900/90 hover:to-amber-800/70 text-amber-300 shadow-[inset_0_1px_0_rgba(251,191,36,0.2)]"
        )}
        onClick={onToggle}
        disabled={disabled}
      >
        {isAutoSpinning ? (
          <>
            <Square className="mr-1.5 h-4 w-4" />
            <span>
              {autoSpinsRemaining !== null ? `STOP (${autoSpinsRemaining})` : "STOP"}
            </span>
          </>
        ) : (
          <>
            <Play className="mr-1.5 h-4 w-4" />
            AUTO
          </>
        )}
      </Button>
    </div>
  );
}
