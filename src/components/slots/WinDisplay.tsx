import { cn } from "@/lib/utils";
import { Coins } from "lucide-react";

interface WinDisplayProps {
  amount: number;
  isAnimating?: boolean;
}

export function WinDisplay({ amount, isAnimating }: WinDisplayProps) {
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
        {amount}
      </span>
    </div>
  );
}
