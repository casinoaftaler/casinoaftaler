import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Unlock, Wallet, Target, Dice3, BarChart3, Scale, Trophy, Rocket } from "lucide-react";
import type { BonusHuntData } from "@/hooks/useBonusHuntData";
import type { LucideIcon } from "lucide-react";

interface Props {
  data: BonusHuntData;
}

function StatRow({ label, value, highlight, icon: Icon }: { label: string; value: string | number; highlight?: boolean; icon: LucideIcon }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/20 last:border-0 group/row transition-all duration-[180ms] hover:bg-muted/20 rounded-md px-1">
      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
        <Icon className="h-[14px] w-[14px] text-primary transition-all duration-[180ms] group-hover/row:drop-shadow-[0_0_4px_hsl(var(--primary)/0.5)]" />
        {label}
      </span>
      <span className={`text-xs font-semibold transition-transform duration-[180ms] group-hover/row:scale-[1.02] ${highlight ? 'text-primary' : ''}`}>{value}</span>
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
          <StatRow icon={Gift} label="Antal Bonusser" value={s.totalBonuses} />
          <StatRow icon={Unlock} label="Åbnede" value={`${s.openedBonuses} / ${s.totalBonuses}`} />
          <StatRow icon={Wallet} label="Start Balance" value={`${s.startBalance.toLocaleString('da-DK')} kr`} />
          <StatRow icon={Target} label="Target Balance" value={`${s.targetBalance.toLocaleString('da-DK')} kr`} />
          <StatRow icon={Wallet} label="End Balance" value={s.endBalance !== null ? `${s.endBalance.toLocaleString('da-DK')} kr` : '—'} highlight={!!s.endBalance} />
          <StatRow icon={Dice3} label="Avg Bet" value={`${s.averageBet} kr`} />
          <StatRow icon={BarChart3} label="Average X" value={s.averageX !== null ? `${s.averageX}x` : '—'} highlight />
          <StatRow icon={Scale} label="Break-Even X" value={`${s.breakEvenX}x`} />
          <StatRow icon={Trophy} label="Highest Win" value={`${s.highestWin.toLocaleString('da-DK')} kr`} />
          <StatRow icon={Rocket} label="Highest Multiplier" value={`${s.highestMultiplier}x`} />
        </div>
      </CardContent>
    </Card>
  );
}
