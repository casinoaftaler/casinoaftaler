import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { BonusHuntData } from "@/hooks/useBonusHuntData";

interface Props {
  stats: BonusHuntData["stats"];
}

export function BonusHuntMomentumBar({ stats }: Props) {
  const { startBalance, endBalance } = stats;
  if (!startBalance) return null;

  const hasEnd = endBalance != null && endBalance > 0;
  const netResult = hasEnd ? endBalance - startBalance : null;
  const profitPct = hasEnd ? Math.min(((endBalance / startBalance) * 100), 200) : 50;

  const isProfit = netResult != null && netResult > 0;
  const isLoss = netResult != null && netResult < 0;

  const barColor = isProfit
    ? "bg-green-500"
    : isLoss
    ? "bg-red-500"
    : "bg-yellow-500";

  const StatusIcon = isProfit ? TrendingUp : isLoss ? TrendingDown : Minus;
  const statusText = isProfit
    ? `+${netResult!.toLocaleString("da-DK")} kr profit`
    : isLoss
    ? `${netResult!.toLocaleString("da-DK")} kr`
    : "I gang...";

  return (
    <section className="rounded-xl border border-border/50 bg-card p-5 space-y-4" aria-label="Balance momentum">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <StatusIcon className={`h-4 w-4 ${isProfit ? "text-green-500" : isLoss ? "text-red-500" : "text-yellow-500"}`} />
          Momentum
        </h2>
        {netResult != null && (
          <span className={`text-sm font-bold ${isProfit ? "text-green-500" : "text-red-500"}`}>
            {statusText}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Start: {startBalance.toLocaleString("da-DK")} kr</span>
          <span>
            {hasEnd
              ? `End: ${endBalance.toLocaleString("da-DK")} kr`
              : "Afventer..."}
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-muted/50 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${barColor}`}
            style={{ width: `${Math.max(profitPct / 2, 5)}%` }}
          />
        </div>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xs text-muted-foreground">Avg Bet</p>
          <p className="text-sm font-semibold">{stats.averageBet} kr</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Break-Even X</p>
          <p className="text-sm font-semibold">{stats.breakEvenX}x</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Target</p>
          <p className="text-sm font-semibold">
            {stats.targetBalance > 0 ? `${stats.targetBalance.toLocaleString("da-DK")} kr` : "—"}
          </p>
        </div>
      </div>
    </section>
  );
}
