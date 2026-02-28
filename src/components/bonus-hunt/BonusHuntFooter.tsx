import { Card, CardContent } from "@/components/ui/card";
import type { BonusHuntData } from "@/hooks/useBonusHuntData";
import { Clock } from "lucide-react";

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
  const items = [
    { label: 'Hunt Start', value: formatTime(stats.huntStart) },
    { label: 'Duration', value: formatDuration(stats.huntDuration) },
    { label: 'Opening', value: formatTime(stats.openingStart) },
    { label: 'Open Dur.', value: formatDuration(stats.openingDuration) },
    { label: 'Hunt End', value: formatTime(stats.bonusHuntEnd) },
    { label: 'Total', value: formatDuration(stats.totalDuration) },
  ];

  return (
    <Card className="rounded-2xl border-primary/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10">
      <CardContent className="p-3">
        <div className="flex items-center gap-1.5 mb-2 text-[10px] text-muted-foreground uppercase tracking-wider">
          <Clock className="h-3 w-3 text-primary" />
          Tidslinje
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {items.map(item => (
            <div key={item.label} className="text-center rounded-lg bg-muted/30 py-1.5 px-1">
              <p className="text-[9px] text-muted-foreground">{item.label}</p>
              <p className="text-xs font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
