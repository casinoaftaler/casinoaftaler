import { cn } from "@/lib/utils";
import { Coins } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

interface WinDisplayProps {
  amount: number;
  isAnimating?: boolean;
  gameId?: string;
}

export function WinDisplay({ amount, isAnimating, gameId }: WinDisplayProps) {
  const isWizard = gameId === "rise-of-fedesvin";
  const duration = Math.min(500 + amount * 10, 2000);
  const displayAmount = useAnimatedCounter(amount, { duration, startFrom: 0, playSound: false });

  const accentColor = isWizard ? "text-purple-500" : "text-amber-500";

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
        amount > 0
          ? isWizard
            ? "bg-gradient-to-r from-purple-500/30 to-purple-600/30 border border-purple-500/50"
            : "bg-gradient-to-r from-amber-500/30 to-amber-600/30 border border-amber-500/50"
          : "bg-muted/50",
        isAnimating && amount > 0 && "animate-pulse scale-110"
      )}
    >
      <MenuIcon iconName="coins" className={cn("h-5 w-5", amount > 0 ? accentColor : "text-muted-foreground")} />
      <span
        className={cn(
          "font-bold text-lg",
          amount > 0 ? accentColor : "text-muted-foreground"
        )}
      >
        {displayAmount}
      </span>
    </div>
  );
}
