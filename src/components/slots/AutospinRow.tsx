import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Play, Square, ChevronDown, Infinity } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSlotTheme } from "@/lib/slotTheme";

type AutoSpinCount = 10 | 25 | 50 | 100 | "infinite";

interface AutospinRowProps {
  isAutoSpinning: boolean;
  autoSpinCount: AutoSpinCount;
  onAutoSpinCountChange: (count: AutoSpinCount) => void;
  onToggle: () => void;
  autoSpinsRemaining: number | null;
  disabled?: boolean;
  gameId?: string;
}

export function AutospinRow({
  isAutoSpinning,
  autoSpinCount,
  onAutoSpinCountChange,
  onToggle,
  autoSpinsRemaining,
  disabled,
  gameId,
}: AutospinRowProps) {
  const theme = getSlotTheme(gameId);
  const counts: AutoSpinCount[] = [10, 25, 50, 100, "infinite"];

  return (
    <div className={cn(
      "flex items-center justify-center gap-2 backdrop-blur-sm rounded-xl px-3 py-2 min-w-[160px]",
      "bg-gradient-to-b", theme.panelFrom, theme.panelVia, theme.panelTo,
      "border-2", theme.borderAccentStrong,
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.4)]"
    )}>
      {!isAutoSpinning && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-10 px-3 text-sm font-bold border-2 bg-gradient-to-b",
                theme.borderAccentStrong, theme.panelFrom, theme.panelTo,
                theme.accentLight,
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.3)]"
              )}
              disabled={disabled}
            >
              {autoSpinCount === "infinite" ? <Infinity className="h-4 w-4" /> : autoSpinCount}
              <ChevronDown className="ml-1.5 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={cn("bg-background border", theme.borderAccent)}>
            {counts.map((count) => (
              <DropdownMenuItem
                key={String(count)}
                onClick={() => onAutoSpinCountChange(count)}
                className={cn("text-base cursor-pointer", autoSpinCount === count && theme.bgAccent)}
              >
                {count === "infinite" ? (
                  <span className="flex items-center gap-2"><Infinity className="h-4 w-4" /> Uendelig</span>
                ) : `${count} credits`}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <Button
        variant={isAutoSpinning ? "destructive" : "outline"}
        className={cn(
          "h-10 px-4 text-sm font-bold transition-all shadow-[0_4px_12px_rgba(0,0,0,0.3)]",
          isAutoSpinning
            ? "bg-gradient-to-b from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 text-white border-2 border-red-400/50"
            : cn("border-2 bg-gradient-to-b", theme.borderAccentStrong, theme.panelFrom, theme.panelTo, theme.accentLight, "shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]")
        )}
        onClick={onToggle}
        disabled={disabled}
      >
        {isAutoSpinning ? (
          <>
            <Square className="mr-1.5 h-4 w-4" />
            <span>{autoSpinsRemaining !== null ? `STOP (${autoSpinsRemaining})` : "STOP"}</span>
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
