import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gift, Unlock, Wallet, Target, Dice3, BarChart3, Scale, Trophy, Rocket, Check, ArrowRight } from "lucide-react";
import { useCasinos } from "@/hooks/useCasinos";
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
  const { data: casinos } = useCasinos();
  const casino = casinos?.find((c) => c.slug === casinoSlug);
  const logoUrl = casino?.logo_url;
  const displayName = casino?.name ?? casinoSlug;
  const reviewPath = `/casino-anmeldelser/${casinoSlug}`;

  return (
    <Card className="rounded-2xl border-primary/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10">
      <CardContent className="p-4 space-y-3">
        {/* Casino context header – 2-column layout */}
        {huntNumber != null && (
          <div className="flex items-center gap-4 pb-3 border-b border-border/30">
            {/* Left: Large logo (35-40%) */}
            {logoUrl && (
              <div className="flex flex-col items-center gap-1.5 shrink-0" style={{ width: '38%' }}>
                <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                  {isLive ? "Casino der testes" : "Casino testet i denne hunt"}
                </p>
                <Link
                  to={reviewPath}
                  className="relative group/logo block transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-200" style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.15)' }} />
                  <div className="absolute inset-0 -z-10 rounded-full blur-2xl" style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 70%)' }} />
                  <img
                    src={optimizeStorageImage(logoUrl, 220) ?? logoUrl}
                    alt={`${displayName} logo`}
                    width={110}
                    height={110}
                    loading="eager"
                    className="h-[100px] w-auto max-w-[110px] object-contain cursor-pointer"
                  />
                </Link>
              </div>
            )}

            {/* Right: Name + meta (60-65%) */}
            <div className="flex-1 min-w-0 space-y-1.5">
              <h2 className="text-sm font-bold text-foreground">
                <Link to={reviewPath} className="hover:text-primary transition-colors">
                  {displayName}
                </Link>
              </h2>
              <ul className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
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
          <StatRow icon={Wallet} label="End Balance" value={s.endBalance !== null ? `${s.endBalance.toLocaleString('da-DK')} kr` : '—'} highlight={!!s.endBalance} />
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
                Læs fuld anmeldelse
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
