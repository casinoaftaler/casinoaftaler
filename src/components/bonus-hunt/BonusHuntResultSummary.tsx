import { Link } from "react-router-dom";
import { Trophy, TrendingUp, BarChart3, Gift } from "lucide-react";

interface HuntVideoData {
  huntNumber: number;
  casinoName: string;
  casinoSlug: string;
  bonusCount: number;
  avgX: number;
  highestWin?: number;
  highestMultiplier?: number;
}

interface Props {
  video: HuntVideoData;
}

export function BonusHuntResultSummary({ video }: Props) {
  const cards = [
    {
      label: "Avg X",
      value: `${video.avgX}x`,
      icon: BarChart3,
      colorClass: "text-primary",
      bgClass: "from-primary/10 to-primary/5",
    },
    {
      label: "Bonusser",
      value: String(video.bonusCount),
      icon: Gift,
      colorClass: "text-blue-400",
      bgClass: "from-blue-500/10 to-blue-500/5",
    },
    ...(video.highestWin != null
      ? [{
          label: "Top Win",
          value: `${video.highestWin} kr`,
          icon: Trophy,
          colorClass: "text-green-500",
          bgClass: "from-green-500/10 to-green-500/5",
        }]
      : []),
    ...(video.highestMultiplier != null
      ? [{
          label: "Top X",
          value: `${video.highestMultiplier}x`,
          icon: TrendingUp,
          colorClass: "text-amber-400",
          bgClass: "from-amber-400/10 to-amber-400/5",
        }]
      : []),
  ];

  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card p-4 space-y-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Trophy className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-sm font-bold text-foreground">
          Resultat af Hunt #{video.huntNumber}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`group/card rounded-[14px] bg-gradient-to-br ${card.bgClass} px-3 py-2 transition-all duration-[180ms] hover:-translate-y-0.5 hover:shadow-md`}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <Icon className={`h-3.5 w-3.5 ${card.colorClass} transition-all duration-[180ms] group-hover/card:drop-shadow-[0_0_4px_currentColor]`} />
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{card.label}</p>
              </div>
              <p className={`text-lg font-bold ${card.colorClass} transition-transform duration-[180ms] group-hover/card:scale-[1.02]`}>
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      <Link
        to={`/casino-anmeldelser/${video.casinoSlug}`}
        className="block text-center text-xs text-primary hover:text-primary/80 underline transition-colors"
        title={`Læs anmeldelse af ${video.casinoName}`}
      >
        Læs {video.casinoName} anmeldelse →
      </Link>
    </div>
  );
}
