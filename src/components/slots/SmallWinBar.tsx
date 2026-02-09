import { cn } from "@/lib/utils";
import { Coins } from "lucide-react";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { getSlotTheme } from "@/lib/slotTheme";

interface SmallWinBarProps {
  amount: number;
  gameId?: string;
}

export function SmallWinBar({ amount, gameId }: SmallWinBarProps) {
  const theme = getSlotTheme(gameId);
  // Animation duration scales with win size
  const duration = Math.min(500 + amount * 10, 1500);
  const displayAmount = useAnimatedCounter(amount, { 
    duration, 
    startFrom: 0, 
    playSound: amount > 0 
  });

  return (
    <div 
      className={cn(
        "flex items-center justify-center gap-2 px-5 py-2 rounded-xl min-w-[100px]",
        "bg-gradient-to-b", theme.panelFrom, theme.panelVia, theme.panelTo,
        "border-2", theme.borderAccentStrong,
        "backdrop-blur-sm transition-shadow duration-300",
        theme.winBarShadow,
        amount > 0 && theme.winBarGlowShadow,
        amount > 0 && "animate-[bonus-bar-glow_2s_ease-in-out_infinite]"
      )}
    >
      <Coins className={cn("h-4 w-4", theme.accent, theme.dropShadowGlow)} />
      <span className={cn(
        "font-bold text-base tabular-nums",
        amount > 0 
          ? cn(theme.accentLight, theme.dropShadowGlowStrong)
          : theme.accentMuted
      )}>
        {displayAmount}
      </span>
    </div>
  );
}
