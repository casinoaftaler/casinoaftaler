import { Trophy, TrendingUp, BarChart3, Gift } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";

interface Props {
  huntNumber: number;
  casinoName: string;
  casinoSlug: string;
  bonusCount: number;
  avgX: number | null;
  highestWin?: number;
  highestMultiplier?: number;
}

export function BonusHuntResultSummary({ huntNumber, casinoName, casinoSlug, bonusCount, avgX, highestWin, highestMultiplier }: Props) {
  const cards = [
    ...(avgX != null
      ? [{
          label: "Avg X",
          value: `${avgX}x`,
          iconName: "bar-chart3",
          colorClass: "text-primary",
          bgClass: "from-primary/10 to-primary/5",
        }]
      : []),
    {
      label: "Bonusser",
      value: String(bonusCount),
      iconName: "gift",
      colorClass: "text-blue-400",
      bgClass: "from-blue-500/10 to-blue-500/5",
    },
    ...(highestWin != null && highestWin > 0
      ? [{
          label: "Top Win",
          value: `${highestWin} kr`,
          iconName: "trophy",
          colorClass: "text-green-500",
          bgClass: "from-green-500/10 to-green-500/5",
        }]
      : []),
    ...(highestMultiplier != null && highestMultiplier > 0
      ? [{
          label: "Top X",
          value: `${highestMultiplier}x`,
          iconName: "trending-up",
          colorClass: "text-amber-400",
          bgClass: "from-amber-400/10 to-amber-400/5",
        }]
      : []),
  ];

  if (cards.length === 0) return null;

  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card p-4 space-y-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <MenuIcon iconName="trophy" className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-sm font-bold text-foreground">
          Resultat af Hunt #{huntNumber}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {cards.map((card) => {
          // icon resolved via iconName on card
          return (
            <div
              key={card.label}
              className={`group/card rounded-[14px] bg-gradient-to-br ${card.bgClass} px-3 py-2 transition-all duration-[180ms] hover:-translate-y-0.5 hover:shadow-md`}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <MenuIcon iconName={card.iconName} className={`h-3.5 w-3.5`} />
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{card.label}</p>
              </div>
              <p className={`text-lg font-bold ${card.colorClass} transition-transform duration-[180ms] group-hover/card:scale-[1.02]`}>
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
