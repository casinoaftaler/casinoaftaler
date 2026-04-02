import { Coins, Zap, XCircle } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;

const REWARDS = [
  { label: "100 Points", icon: Coins, type: "points" },
  { label: "200 Points", icon: Coins, type: "points" },
  { label: "300 Points", icon: Coins, type: "points" },
  { label: "400 Points", icon: Coins, type: "points" },
  { label: "500 Points", icon: Coins, type: "points" },
  { label: "50 Spins", icon: Zap, type: "spins" },
  { label: "100 Spins", icon: Zap, type: "spins" },
  { label: "Ingenting", icon: XCircle, type: "none" },
];

export function RewardOverview() {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">🎁 Mulige Gevinster</h2>
      <div className="grid grid-cols-2 gap-2">
        {REWARDS.map((r, i) => {
          const Icon = r.icon;
          const colorClass = r.type === "points" ? "text-primary" : r.type === "spins" ? "text-accent" : "text-muted-foreground";
          return (
            <div
              key={i}
              className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm px-3 py-2.5"
            >
              <Icon className={`h-4 w-4 shrink-0 ${colorClass}`} />
              <span className="text-sm font-medium text-foreground truncate">{r.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
