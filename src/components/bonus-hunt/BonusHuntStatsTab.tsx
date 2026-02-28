import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BonusHuntData } from "@/hooks/useBonusHuntData";

interface Props {
  data: BonusHuntData;
}

function StatRow({ label, value, highlight }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/20 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`text-xs font-semibold ${highlight ? 'text-primary' : ''}`}>{value}</span>
    </div>
  );
}

export function BonusHuntStatsTab({ data }: Props) {
  const s = data.stats;

  return (
    <Card className="rounded-2xl border-primary/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm">Bonus Hunt Info</h3>
          <Badge variant="outline" className="capitalize text-[10px]">{data.status}</Badge>
        </div>
        <div className="space-y-0">
          <StatRow label="Antal Bonusser" value={s.totalBonuses} />
          <StatRow label="Åbnede" value={`${s.openedBonuses} / ${s.totalBonuses}`} />
          <StatRow label="Start Balance" value={`${s.startBalance.toLocaleString('da-DK')} kr`} />
          <StatRow label="Target Balance" value={`${s.targetBalance.toLocaleString('da-DK')} kr`} />
          <StatRow label="End Balance" value={s.endBalance !== null ? `${s.endBalance.toLocaleString('da-DK')} kr` : '—'} highlight={!!s.endBalance} />
          <StatRow label="Avg Bet" value={`${s.averageBet} kr`} />
          <StatRow label="Average X" value={s.averageX !== null ? `${s.averageX}x` : '—'} highlight />
          <StatRow label="Break-Even X" value={`${s.breakEvenX}x`} />
          <StatRow label="Highest Win" value={`${s.highestWin.toLocaleString('da-DK')} kr`} />
          <StatRow label="Highest Multiplier" value={`${s.highestMultiplier}x`} />
        </div>
      </CardContent>
    </Card>
  );
}
