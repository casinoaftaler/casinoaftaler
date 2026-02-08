import { Check, Gift, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { SPINS_PER_SECTION } from "@/hooks/useProfileRewards";

interface ProfileSectionRewardIndicatorProps {
  isCompleted: boolean;
  isRewarded: boolean;
  className?: string;
}

export function ProfileSectionRewardIndicator({
  isCompleted,
  isRewarded,
  className,
}: ProfileSectionRewardIndicatorProps) {
  if (isRewarded) {
    // Already claimed reward
    return (
      <div
        className={cn(
          "flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 text-green-500 text-xs font-medium",
          className
        )}
      >
        <Check className="h-3 w-3" />
        <span>+{SPINS_PER_SECTION} Spins</span>
      </div>
    );
  }

  if (isCompleted) {
    // Completed but not yet saved/claimed
    return (
      <div
        className={cn(
          "flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 text-xs font-medium animate-pulse",
          className
        )}
      >
        <Gift className="h-3 w-3" />
        <span>+{SPINS_PER_SECTION} Spins klar!</span>
      </div>
    );
  }

  // Not completed
  return (
    <div
      className={cn(
        "flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium",
        className
      )}
    >
      <Lock className="h-3 w-3" />
      <span>+{SPINS_PER_SECTION} Spins</span>
    </div>
  );
}
