import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CommunityConversionCard() {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        border: "1px solid rgba(139,92,246,0.25)",
        boxShadow: "0 0 20px rgba(139,92,246,0.06)",
        background:
          "linear-gradient(180deg, hsl(260 28% 15%) 0%, hsl(250 22% 12%) 100%)",
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Zap className="h-4 w-4 text-amber-400" />
        <h3 className="text-sm font-bold text-foreground">
          Gratis Free Spins uden indbetaling
        </h3>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
        Spil videre hos nye online casinoer og få free spins uden risiko.
      </p>
      <Link to="/free-spins">
        <Button
          size="sm"
          className="w-full gap-1.5 text-xs font-semibold transition-all duration-200 hover:shadow-[0_0_15px_rgba(139,92,246,0.25)] hover:scale-[1.02]"
          style={{
            background:
              "linear-gradient(135deg, hsl(260 60% 45%), hsl(220 70% 45%))",
          }}
        >
          Se Free Spins
          <ArrowRight className="h-3 w-3" />
        </Button>
      </Link>
    </div>
  );
}
