import { Sparkles, Gift } from "lucide-react";
import { useSlotSpins } from "@/hooks/useSlotSpins";
import { useCommunityBonusSpins } from "@/hooks/useCommunityBonusSpins";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SpinsRemainingProps {
  gameId?: string;
}

export function SpinsRemaining({ gameId }: SpinsRemainingProps) {
  const { spinsRemaining, maxSpins, bonusSpinsPermanent, isLoading } = useSlotSpins(gameId);
  const { remaining: communityRemaining } = useCommunityBonusSpins();
  const isWizard = gameId === "rise-of-fedesvin";

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 animate-pulse">
        <Sparkles className="h-4 w-4" />
        <span className="text-sm">Indlæser...</span>
      </div>
    );
  }

  const accentColor = isWizard ? "text-purple-500" : "text-amber-500";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-help ${
            isWizard
              ? "bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30"
              : "bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30"
          }`}>
            <Sparkles className={`h-4 w-4 ${accentColor}`} />
            <span className="text-sm font-medium">
              <span className={accentColor}>{spinsRemaining}</span>
              <span className="text-muted-foreground">/{maxSpins} credits i dag</span>
            </span>
            {bonusSpinsPermanent > 0 && (
              <Gift className="h-3 w-3 text-primary" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs space-y-1">
            <p>Daglige credits + profilbelønninger</p>
            {bonusSpinsPermanent > 0 && (
              <p className="text-primary">+{bonusSpinsPermanent} bonus credits fra profil</p>
            )}
            {communityRemaining > 0 && (
              <p className="text-primary">{communityRemaining} community bonus credits tilgængelige</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
