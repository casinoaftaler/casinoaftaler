import { Sparkles } from "lucide-react";
import { useSlotSpins } from "@/hooks/useSlotSpins";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export function SpinsRemaining() {
  const { user } = useAuth();
  const { spinsRemaining, maxSpins, isLoading } = useSlotSpins();

  // Don't show anything for non-logged-in users
  if (!user) {
    return (
      <Link 
        to="/auth"
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#9146FF]/20 border border-[#9146FF]/30 hover:bg-[#9146FF]/30 transition-colors"
      >
        <Sparkles className="h-4 w-4 text-[#9146FF]" />
        <span className="text-sm font-medium text-[#9146FF]">Log ind for at spille</span>
      </Link>
    );
  }

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
