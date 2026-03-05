import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Trophy, Video } from "lucide-react";

export const CommunityPromoSection = forwardRef<HTMLElement>(function CommunityPromoSection(_props, ref) {
  return (
    <section ref={ref} className="py-6 md:py-8">
      <div className="flex flex-col gap-4 p-5 md:p-6 rounded-xl bg-muted/50 border border-border/50">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 flex-shrink-0 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">
              Vores Community – Spil, Konkurrér & Vind
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Prøv vores egne slot maskiner i Spillehallen, se de bedste øjeblikke på Highlights, og kæmp om førstepladsen på vores Leaderboard med ugentlige præmier.
          </p>
          
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link to="/community/slots">
                Spillehal
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link to="/highlights">
                <Video className="h-3.5 w-3.5" />
                Highlights
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link to="/community/turneringer">
                <Trophy className="h-3.5 w-3.5" />
                Leaderboard
              </Link>
            </Button>
          </div>
      </div>
    </section>
  );
});
