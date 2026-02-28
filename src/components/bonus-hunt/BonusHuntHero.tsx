import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useCasinos } from "@/hooks/useCasinos";
import { optimizeStorageImage } from "@/lib/imageOptimization";
import { Trophy, Zap, TrendingUp, Target } from "lucide-react";
import type { BonusHuntData } from "@/hooks/useBonusHuntData";

interface BonusHuntHeroProps {
  huntNumber: number;
  huntDate: string;
  data: BonusHuntData;
  latestHuntNumber: number;
  maxHuntNumber: number;
  onNavigate?: (direction: 'first' | 'prev' | 'next' | 'last') => void;
  onJumpToHunt?: (huntNumber: number) => void;
}

export function BonusHuntHero({ huntNumber, huntDate, data }: BonusHuntHeroProps) {
  const { data: casinos } = useCasinos();
  const casino = casinos?.find((c) => c.slug === "spildansknu");
  const logoUrl = casino?.logo_url;
  const displayName = casino?.name ?? "SpilDanskNu";
  const isLive = data.status === "active";
  const s = data.stats;

  const metrics = [
    { icon: Target, label: "Bonusser åbnet", value: `${s.openedBonuses}/${s.totalBonuses}` },
    { icon: TrendingUp, label: "Gennemsnit", value: s.averageX != null ? `${s.averageX}x` : "—" },
    { icon: Trophy, label: "Højeste win", value: s.highestWin > 0 ? `${s.highestWin.toLocaleString("da-DK")} kr` : "—" },
    { icon: Zap, label: "Højeste multiplier", value: s.highestMultiplier > 0 ? `${s.highestMultiplier}x` : "—" },
  ];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-primary/20">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(260 70% 20% / 0.3) 50%, hsl(var(--primary) / 0.1))",
        }}
      />
      <div className="absolute inset-0 bg-card/80" />

      <div className="relative p-6 md:p-8 space-y-6">
        {/* Top row: badge + status */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            {isLive ? (
              <Badge variant="destructive" className="animate-pulse">
                🔴 LIVE
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-xs">
                Afsluttet {huntDate}
              </Badge>
            )}
          </div>

          {/* Casino branding */}
          <Link
            to="/casino-anmeldelser/spildansknu"
            title={`Læs anmeldelse af ${displayName}`}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            {logoUrl && (
              <img
                src={optimizeStorageImage(logoUrl, 96) ?? logoUrl}
                alt={`${displayName} logo`}
                width={32}
                height={32}
                loading="eager"
                className="h-8 w-8 rounded-lg object-contain bg-background/50 p-0.5"
              />
            )}
            <span className="text-sm font-medium text-muted-foreground">{displayName}</span>
          </Link>
        </div>

        {/* Main heading */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Bonus Hunt #{huntNumber}
          </h1>
          {s.averageX != null && (
            <p className="text-5xl md:text-6xl font-black tracking-tighter text-primary">
              {s.averageX}x
              <span className="text-lg md:text-xl font-semibold text-muted-foreground ml-3">
                gennemsnit
              </span>
            </p>
          )}
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl bg-background/60 border border-border/50 p-4 space-y-1"
            >
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <m.icon className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium">{m.label}</span>
              </div>
              <p className="text-xl font-bold text-foreground">{m.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
