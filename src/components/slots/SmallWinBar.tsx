import { cn } from "@/lib/utils";
import { Coins } from "lucide-react";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

interface SmallWinBarProps {
  amount: number;
}

export function SmallWinBar({ amount }: SmallWinBarProps) {
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
        "flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg",
        "bg-gradient-to-r from-amber-900/60 to-amber-950/70",
        "border border-amber-500/40",
        "shadow-[0_0_15px_rgba(251,191,36,0.2)]",
        "backdrop-blur-sm"
      )}
    >
      <Coins className="h-4 w-4 text-amber-500" />
      <span className="font-bold text-base text-amber-500 tabular-nums">
        {displayAmount}
      </span>
    </div>
  );
}
