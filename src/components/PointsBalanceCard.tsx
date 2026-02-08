import { Card, CardContent } from "@/components/ui/card";
import { Coins, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PointsBalanceCardProps {
  points: number | null | undefined;
  isLoading?: boolean;
  variant?: "default" | "compact" | "hero";
  className?: string;
  showLabel?: boolean;
}

/**
 * Reusable component to display user points balance
 * Used across profile, shop, and leaderboard
 */
export function PointsBalanceCard({
  points,
  isLoading = false,
  variant = "default",
  className,
  showLabel = true,
}: PointsBalanceCardProps) {
  const formattedPoints = points !== null && points !== undefined
    ? new Intl.NumberFormat("da-DK").format(Math.floor(points))
    : "0";

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Coins className="h-4 w-4 text-yellow-500" />
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <span className="font-semibold">{formattedPoints}</span>
        )}
        {showLabel && <span className="text-muted-foreground text-sm">points</span>}
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <Card className={cn(
        "bg-gradient-to-br from-yellow-500/20 via-amber-500/10 to-orange-500/5",
        "border-yellow-500/30 shadow-lg shadow-yellow-500/10",
        className
      )}>
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-yellow-500/30 to-amber-500/20 border border-yellow-500/30">
              <Coins className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400" />
            </div>
            <div className="flex-1">
              {showLabel && (
                <p className="text-sm sm:text-base text-muted-foreground font-medium">
                  Total Points
                </p>
              )}
              {isLoading ? (
                <div className="flex items-center gap-2 mt-1">
                  <Loader2 className="h-6 w-6 animate-spin text-yellow-400" />
                  <span className="text-muted-foreground">Indlæser...</span>
                </div>
              ) : (
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  {formattedPoints}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={cn(
      "bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border-yellow-500/20",
      className
    )}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
            <Coins className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
          </div>
          <div className="flex-1 min-w-0">
            {showLabel && (
              <p className="text-xs sm:text-sm text-muted-foreground">Total Points</p>
            )}
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-yellow-400 mt-1" />
            ) : (
              <p className="text-xl sm:text-2xl font-bold text-yellow-400">
                {formattedPoints}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
