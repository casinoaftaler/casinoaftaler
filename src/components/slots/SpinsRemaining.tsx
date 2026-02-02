import { Sparkles } from "lucide-react";
import { useSlotSpins } from "@/hooks/useSlotSpins";

export function SpinsRemaining() {
  const { spinsRemaining, maxSpins, isLoading } = useSlotSpins();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 animate-pulse">
        <Sparkles className="h-4 w-4" />
        <span className="text-sm">Indlæser...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30">
      <Sparkles className="h-4 w-4 text-amber-500" />
      <span className="text-sm font-medium">
        <span className="text-amber-500">{spinsRemaining}</span>
        <span className="text-muted-foreground">/{maxSpins} spins i dag</span>
      </span>
    </div>
  );
}
