import { BarChart3, Film, Target } from "lucide-react";
import { useLatestHuntNumber } from "@/hooks/useBonusHuntData";

export function BonusHuntStatStrip() {
  const { data: latestHuntNumber = 0 } = useLatestHuntNumber();

  const stats = [
    { label: "Dokumenterede hunts", value: latestHuntNumber, icon: Target },
    { label: "Streams arkiveret", value: latestHuntNumber, icon: Film },
    { label: "Datapunkter analyseret", value: latestHuntNumber > 0 ? `${latestHuntNumber * 20}+` : "—", icon: BarChart3 },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center gap-1 rounded-xl border border-border/50 bg-card p-3 text-center"
        >
          <stat.icon className="h-4 w-4 text-primary" />
          <span className="text-lg font-bold text-foreground">{stat.value}</span>
          <span className="text-[11px] text-muted-foreground leading-tight">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
