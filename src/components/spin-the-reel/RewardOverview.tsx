import { Coins, Zap, XCircle } from "lucide-react";

const REWARDS = [
  { label: "100 Points", icon: Coins, type: "points", color: "text-primary" },
  { label: "200 Points", icon: Coins, type: "points", color: "text-primary" },
  { label: "300 Points", icon: Coins, type: "points", color: "text-primary" },
  { label: "400 Points", icon: Coins, type: "points", color: "text-primary" },
  { label: "500 Points", icon: Coins, type: "points", color: "text-primary" },
  { label: "50 Spins", icon: Zap, type: "spins", color: "text-accent" },
  { label: "100 Spins", icon: Zap, type: "spins", color: "text-accent" },
  { label: "Ingenting", icon: XCircle, type: "none", color: "text-muted-foreground" },
];

export function RewardOverview() {
  return (
    <div className="w-full max-w-2xl space-y-3">
      <h2 className="text-lg font-bold text-foreground">🎁 Mulige Gevinster</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {REWARDS.map((r, i) => {
          const Icon = r.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm px-3 py-2.5"
            >
              <Icon className={`h-4 w-4 flex-shrink-0 ${r.color}`} />
              <span className="text-sm font-medium text-foreground truncate">{r.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
