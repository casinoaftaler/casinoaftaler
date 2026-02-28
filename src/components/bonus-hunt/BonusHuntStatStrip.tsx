import { BarChart3, Film, Target } from "lucide-react";
import { useLatestHuntNumber } from "@/hooks/useBonusHuntData";

export function BonusHuntStatStrip() {
  const { data: latestHuntNumber = 0 } = useLatestHuntNumber();

  const stats = [
    { label: "Dokumenterede bonus hunts", value: latestHuntNumber, icon: Target },
    { label: "100% arkiveret med data", value: "100%", icon: Film },
    { label: "Analyserede datapunkter", value: latestHuntNumber > 0 ? `${latestHuntNumber * 20}+` : "—", icon: BarChart3 },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group flex flex-col items-center gap-1.5 rounded-xl border border-border/50 bg-card p-4 text-center transition-all duration-200 hover:border-primary/30 hover:shadow-[0_0_15px_hsl(var(--primary)/0.08)]"
        >
          <stat.icon className="h-4 w-4 text-primary transition-all duration-200 group-hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]" />
          <span className="text-2xl font-bold text-foreground">{stat.value}</span>
          <span className="text-[10px] text-muted-foreground leading-tight">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
