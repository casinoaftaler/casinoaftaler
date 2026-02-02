import { cn } from "@/lib/utils";
import { Coins } from "lucide-react";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

interface WinDisplayProps {
  amount: number;
  isAnimating?: boolean;
}

export function WinDisplay({ amount, isAnimating }: WinDisplayProps) {
  // Animate the counter - duration scales with win size for dramatic effect
  const duration = Math.min(500 + amount * 10, 2000); // 500ms to 2000ms based on win size
  const displayAmount = useAnimatedCounter(amount, { duration, startFrom: 0 });

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
        amount > 0
          ? "bg-gradient-to-r from-amber-500/30 to-amber-600/30 border border-amber-500/50"
          : "bg-muted/50",
        isAnimating && amount > 0 && "animate-pulse scale-110"
      )}
    >
      <Coins className={cn("h-5 w-5", amount > 0 ? "text-amber-500" : "text-muted-foreground")} />
      <span
        className={cn(
          "font-bold text-lg",
          amount > 0 ? "text-amber-500" : "text-muted-foreground"
        )}
      >
        {displayAmount}
      </span>
    </div>
  );
}
