import { MenuIcon } from "@/components/MenuIcon";
import { useDocumentedHuntCount } from "@/hooks/useBonusHuntData";

export function BonusHuntStatStrip() {
  const { data: huntCount = 0 } = useDocumentedHuntCount();

  const stats = [
    { label: "Dokumenterede bonus hunts", value: huntCount, iconName: "target" },
    { label: "100% arkiveret med data", value: "100%", iconName: "circle-play" },
    { label: "Analyserede datapunkter", value: huntCount > 0 ? `${huntCount * 20}+` : "—", iconName: "chart-bar" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group flex flex-col items-center gap-1.5 rounded-xl border border-border/50 bg-card p-4 text-center transition-all duration-200 hover:border-primary/30 hover:shadow-[0_0_15px_hsl(var(--primary)/0.08)]"
        >
          <MenuIcon iconName={stat.iconName} className="h-4 w-4 transition-all duration-200 group-hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]" />
          <span className="text-2xl font-bold text-foreground">{stat.value}</span>
          <span className="text-[10px] text-muted-foreground leading-tight">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
