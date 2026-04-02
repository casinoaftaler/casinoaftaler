import { Coins, Zap, XCircle } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";

const REWARDS = [
  { label: "100 Points", iconName: "coins", type: "points" },
  { label: "200 Points", iconName: "coins", type: "points" },
  { label: "300 Points", iconName: "coins", type: "points" },
  { label: "400 Points", iconName: "coins", type: "points" },
  { label: "500 Points", iconName: "coins", type: "points" },
  { label: "50 Spins", iconName: "zap", type: "spins" },
  { label: "100 Spins", iconName: "zap", type: "spins" },
  { label: "Ingenting", iconName: "x-circle", type: "none" },
];

export function RewardOverview() {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">🎁 Mulige Gevinster</h2>
      <div className="grid grid-cols-2 gap-2">
        {REWARDS.map((r, i) => {
          // icon resolved via iconName on r
          const colorClass = r.type === "points" ? "text-primary" : r.type === "spins" ? "text-accent" : "text-muted-foreground";
          return (
            <div
              key={i}
              className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm px-3 py-2.5"
            >
              <MenuIcon iconName={r.iconName} className={`h-4 w-4 shrink-0`} />
              <span className="text-sm font-medium text-foreground truncate">{r.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
