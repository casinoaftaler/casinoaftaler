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
        "flex items-center justify-center gap-2 px-5 py-2 rounded-xl",
        "bg-gradient-to-b from-amber-950/90 via-amber-900/70 to-amber-950/90",
        "border-2 border-amber-600/50",
        "shadow-[inset_0_1px_0_rgba(251,191,36,0.3),0_0_20px_rgba(251,191,36,0.3),0_4px_12px_rgba(0,0,0,0.4)]",
        "backdrop-blur-sm",
        // Glow effect when there's a win
        amount > 0 && "shadow-[inset_0_1px_0_rgba(251,191,36,0.4),0_0_30px_rgba(251,191,36,0.5),0_4px_12px_rgba(0,0,0,0.4)]"
      )}
    >
      <Coins className="h-4 w-4 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]" />
      <span className={cn(
        "font-bold text-base tabular-nums",
        amount > 0 
          ? "text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" 
          : "text-amber-500/70"
      )}>
        {displayAmount}
      </span>
    </div>
  );
}
