import { Sparkles, Gift } from "lucide-react";
import { useSlotSpins } from "@/hooks/useSlotSpins";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function SpinsRemaining() {
  const { spinsRemaining, maxSpins, bonusSpinsPermanent, isLoading } = useSlotSpins();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 animate-pulse">
        <Sparkles className="h-4 w-4" />
        <span className="text-sm">Indlæser...</span>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 cursor-help">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium">
              <span className="text-amber-500">{spinsRemaining}</span>
              <span className="text-muted-foreground">/{maxSpins} spins i dag</span>
            </span>
            {bonusSpinsPermanent > 0 && (
              <Gift className="h-3 w-3 text-primary" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs space-y-1">
            <p>Daglige spins + profilbelønninger</p>
            {bonusSpinsPermanent > 0 && (
              <p className="text-primary">+{bonusSpinsPermanent} bonus spins fra profil</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
