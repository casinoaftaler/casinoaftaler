import { Card, CardContent } from "@/components/ui/card";
import type { BonusHuntData } from "@/hooks/useBonusHuntData";
import { Gamepad2, Hourglass, Package, Play, Square, Timer } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import type { LucideIcon } from "lucide-react";

interface Props {
  stats: BonusHuntData['stats'];
}

function formatDuration(ms: number | null): string {
  if (!ms) return '—';
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function formatTime(ts: string | null): string {
  if (!ts) return '—';
  try {
    return new Date(ts).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });
  } catch { return '—'; }
}

export function BonusHuntFooter({ stats }: Props) {
  const items: { label: string; value: string; icon: LucideIcon }[] = [
    { label: 'Hunt Start', value: formatTime(stats.huntStart), icon: Play },
    { label: 'Duration', value: formatDuration(stats.huntDuration), icon: Timer },
    { label: 'Opening', value: formatTime(stats.openingStart), icon: Gamepad2 },
    { label: 'Open Dur.', value: formatDuration(stats.openingDuration), icon: Hourglass },
    { label: 'Hunt End', value: formatTime(stats.bonusHuntEnd), icon: Square },
    { label: 'Total', value: formatDuration(stats.totalDuration), icon: Package },
  ];

  return (
    <Card className="rounded-2xl border-primary/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10">
      <CardContent className="p-3">
        <div className="flex items-center gap-1.5 mb-2 text-[10px] text-muted-foreground uppercase tracking-wider">
          <Timer className="h-3 w-3 text-primary" />
          Tidslinje
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {items.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="group/tl text-center rounded-lg bg-muted/30 py-1.5 px-1 transition-all duration-[180ms] hover:-translate-y-0.5 hover:bg-muted/50">
                <Icon className="h-3 w-3 text-primary mx-auto mb-0.5 transition-all duration-[180ms] group-hover/tl:drop-shadow-[0_0_4px_hsl(var(--primary)/0.5)]" />
                <p className="text-[9px] text-muted-foreground">{item.label}</p>
                <p className="text-xs font-semibold transition-transform duration-[180ms] group-hover/tl:scale-[1.02]">{item.value}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
