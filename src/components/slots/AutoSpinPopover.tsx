import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Infinity, RotateCw, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { SlotTheme } from "@/lib/slotTheme";

type AutoSpinCount = 10 | 25 | 50 | 100 | "infinite";

interface AutoSpinPopoverProps {
  isAutoSpinning: boolean;
  autoSpinCount: AutoSpinCount;
  onAutoSpinCountChange: (count: AutoSpinCount) => void;
  onToggle: () => void;
  autoSpinsRemaining: number | null;
  disabled?: boolean;
  theme: SlotTheme;
  /** Optional custom trigger element. Receives ref + popover props. */
  renderTrigger?: (props: { onClick?: () => void; disabled?: boolean; ref?: React.Ref<HTMLButtonElement> }) => React.ReactNode;
}

const counts: AutoSpinCount[] = [10, 25, 50, 100, "infinite"];

export function AutoSpinPopover({
  isAutoSpinning,
  autoSpinCount,
  onAutoSpinCountChange,
  onToggle,
  autoSpinsRemaining,
  disabled,
  theme,
  renderTrigger,
}: AutoSpinPopoverProps) {
  const [open, setOpen] = useState(false);

  const handleStart = () => {
    onToggle();
    setOpen(false);
  };

  if (isAutoSpinning) {
    if (renderTrigger) {
      return <>{renderTrigger({ onClick: onToggle })}</>;
    }
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

  const defaultTrigger = (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-10 w-10 rounded-lg border",
        theme.autoSpinBtnBg,
        theme.autoSpinBtnBorder,
        theme.autoSpinBtnText,
        theme.autoSpinBtnHoverBg,
        theme.autoSpinBtnHoverText
      )}
      disabled={disabled}
    >
      <RotateCw className="h-4 w-4" />
    </Button>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {renderTrigger
          ? renderTrigger({ disabled })
          : defaultTrigger}
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-52 p-3 backdrop-blur-md", theme.autoSpinPopoverBg, theme.autoSpinPopoverBorder)}
        align="center"
        side="top"
        sideOffset={8}
      >
        <div className="space-y-3">
          <span className={cn("text-xs font-semibold uppercase tracking-wider", theme.autoSpinLabelText)}>
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
                    ? cn(theme.autoSpinCountActiveBg, theme.autoSpinCountActiveBorder, theme.autoSpinCountActiveText)
                    : cn(theme.autoSpinCountBg, theme.autoSpinCountBorder, theme.autoSpinCountText, theme.autoSpinCountHoverBg, theme.autoSpinCountHoverText)
                )}
              >
                {count === "infinite" ? <Infinity className="h-3.5 w-3.5 mx-auto" /> : count}
              </button>
            ))}
          </div>
          <Button
            className={cn("w-full h-8 text-xs font-bold text-white border", theme.autoSpinStartBg, theme.autoSpinStartHoverBg, theme.autoSpinStartBorder)}
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
