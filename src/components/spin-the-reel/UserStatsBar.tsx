import { Coins, Zap, Clock } from "lucide-react";
import { useSlotSpins } from "@/hooks/useSlotSpins";
import { CooldownTimer } from "./CooldownTimer";

interface UserStatsBarProps {
  cooldownEnd: string | null;
  isCooldownActive: boolean;
  onCooldownExpired: () => void;
}

export function UserStatsBar({ cooldownEnd, isCooldownActive, onCooldownExpired }: UserStatsBarProps) {
  const { spinsRemaining, maxSpins } = useSlotSpins();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
      {/* SE Points placeholder */}
      <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm px-4 py-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <Coins className="h-4.5 w-4.5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">SE Points</p>
          <p className="font-bold text-foreground tabular-nums">—</p>
        </div>
      </div>

      {/* Spins remaining */}
      <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm px-4 py-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <Zap className="h-4.5 w-4.5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Slot Credits</p>
          <p className="font-bold text-foreground tabular-nums">{spinsRemaining} / {maxSpins}</p>
        </div>
      </div>

      {/* Cooldown */}
      <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm px-4 py-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <Clock className="h-4.5 w-4.5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Næste Spin</p>
          {isCooldownActive && cooldownEnd ? (
            <CooldownTimer cooldownEnd={cooldownEnd} onExpired={onCooldownExpired} />
          ) : (
            <p className="font-bold text-primary tabular-nums">Klar!</p>
          )}
        </div>
      </div>
    </div>
  );
}
