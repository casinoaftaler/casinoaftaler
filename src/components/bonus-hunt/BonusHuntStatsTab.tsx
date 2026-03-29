import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gift, Unlock, Wallet, Target, Dice3, BarChart3, Scale, Trophy, Rocket, Check, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { useCasinoBySlug } from "@/hooks/useCasinoBySlug";
import { optimizeStorageImage } from "@/lib/imageOptimization";
import type { BonusHuntData } from "@/hooks/useBonusHuntData";
import type { LucideIcon } from "lucide-react";

interface Props {
  data: BonusHuntData;
  huntNumber?: number;
  huntDate?: string;
  isLive?: boolean;
  casinoSlug?: string;
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

export function BonusHuntStatsTab({ data, huntNumber, huntDate, isLive = false, casinoSlug = "spildansknu" }: Props) {
  const s = data.stats;
  const { data: casino } = useCasinoBySlug(casinoSlug);
  const logoUrl = casino?.logo_url;
  const displayName = casino?.name ?? casinoSlug;
  const reviewPath = `/casino-anmeldelser/${casinoSlug}`;

  return (
    <Card className="rounded-2xl border-primary/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10">
      <CardContent className="p-4 space-y-3">
        {/* Casino context header – flex-row */}
        {huntNumber != null && (
          <div className="flex items-center gap-3 pb-3 border-b border-border/30">
            {logoUrl && (
              <Link
                to={reviewPath}
                className="relative shrink-0 group/logo transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 -z-10 rounded-full blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-200" style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)' }} />
                <img
                  src={optimizeStorageImage(logoUrl, 240) ?? logoUrl}
                  alt={`${displayName} logo`}
                  width={120}
                  height={120}
                  loading="eager"
                  className="h-[72px] w-auto max-w-[120px] object-contain cursor-pointer"
                />
              </Link>
            )}
            <div className="min-w-0 space-y-1">
              <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                {isLive ? "Casino der testes" : "Casino testet i denne hunt"}
              </p>
              <h2 className="text-sm font-bold text-foreground leading-tight">
                <Link to={reviewPath} className="hover:text-primary transition-colors">
                  {displayName}
                </Link>
              </h2>
              <ul className="flex flex-wrap gap-x-2.5 gap-y-0.5 text-[11px] text-muted-foreground">
                {s.openedBonuses > 0 && (
                  <li className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-primary" />
                    {s.openedBonuses} bonusser
                  </li>
                )}
                {s.averageX != null && (
                  <li className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-primary" />
                    {s.averageX.toFixed(1)}x snit
                  </li>
                )}
                <li className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-primary" />
                  Live testet
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Stats section */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-sm">Bonus Hunt Info</h3>
          <Badge variant="outline" className="capitalize text-[10px]">{data.status}</Badge>
        </div>
        <div className="space-y-0">
          <StatRow icon={Gift} label="Antal Bonusser" value={s.totalBonuses} />
          <StatRow icon={Unlock} label="Åbnede" value={`${s.openedBonuses} / ${s.totalBonuses}`} />
          <StatRow icon={Wallet} label="Start Balance" value={`${s.startBalance.toLocaleString('da-DK')} kr`} />
          <StatRow icon={Target} label="Target Balance" value={`${s.targetBalance.toLocaleString('da-DK')} kr`} />
          <StatRow icon={Trophy} label="Winnings" value={`${s.totalWinnings.toLocaleString('da-DK')} kr`} highlight={s.totalWinnings > 0} />
          <StatRow icon={Wallet} label="End Balance" value={s.endBalance !== null ? `${s.endBalance.toLocaleString('da-DK')} kr` : '—'} highlight={!!s.endBalance} />
          {s.endBalance !== null && (
            <div className={`flex items-center justify-between py-1.5 border-b border-border/20 last:border-0 group/row transition-all duration-[180ms] hover:bg-muted/20 rounded-md px-1`}>
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                {s.endBalance - s.startBalance >= 0
                  ? <TrendingUp className="h-[14px] w-[14px] text-green-500 transition-all duration-[180ms] group-hover/row:drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]" />
                  : <TrendingDown className="h-[14px] w-[14px] text-red-500 transition-all duration-[180ms] group-hover/row:drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]" />
                }
                Resultat
              </span>
              <span className={`text-xs font-semibold transition-transform duration-[180ms] group-hover/row:scale-[1.02] ${s.endBalance - s.startBalance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {s.endBalance - s.startBalance >= 0 ? '+' : ''}{(s.endBalance - s.startBalance).toLocaleString('da-DK')} kr
              </span>
            </div>
          )}
          <StatRow icon={Dice3} label="Avg Bet" value={`${s.averageBet} kr`} />
          <StatRow icon={BarChart3} label="Average X" value={s.averageX !== null ? `${s.averageX}x` : '—'} highlight />
          <StatRow icon={Scale} label="Break-Even X" value={`${s.breakEvenX}x`} />
          <StatRow icon={Trophy} label="Highest Win" value={`${s.highestWin.toLocaleString('da-DK')} kr`} />
          <StatRow icon={Rocket} label="Highest Multiplier" value={`${s.highestMultiplier}x`} />
        </div>

        {/* Review CTA – matching "Se Free Spins" style */}
        {huntNumber != null && (
          <div className="flex justify-center pt-1">
            <Link to={reviewPath} title={`Læs fuld anmeldelse af ${displayName}`} className="w-full">
              <Button
                size="sm"
                className="w-full gap-1.5 text-xs font-semibold transition-all duration-200 hover:shadow-[0_0_15px_rgba(139,92,246,0.25)] hover:scale-[1.02] cta-btn-shimmer"
                style={{
                  background: "linear-gradient(135deg, hsl(260 60% 45%), hsl(220 70% 45%))",
                }}
              >
                Tag en velkomstbonus på {displayName}
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
