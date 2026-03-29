import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";
import "@/styles/community-micro.css";

export function CommunityJoinCTA() {
  return (
    <Link
      to="/auth"
      className="community-join-gradient community-panel group block rounded-xl p-5 md:p-6 transition-all duration-300 hover:scale-[1.005] hover:-translate-y-0.5 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at 80% 40%, hsl(260 60% 50% / 0.08), transparent 70%)",
        }}
      />
      {/* Top highlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(260 60% 60% / 0.3), transparent)",
        }}
      />

      <div className="relative flex flex-col sm:flex-row items-center gap-4">
        <div
          className="flex items-center justify-center h-10 w-10 rounded-xl shrink-0"
          style={{ background: "linear-gradient(135deg, hsl(260 70% 50%), hsl(220 80% 50%))" }}
        >
          <Users className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-base font-bold text-foreground">
            Bliv en del af fællesskabet
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Spil gratis slots, deltag i turneringer og optjen rewards sammen med andre spillere. Tre kategorier, daglige credits og automatisk deltagelse – kun for community-medlemmer.
          </p>
        </div>
        <Button
          className="gap-2 shrink-0 font-semibold shadow-lg community-btn-glow group-hover:shadow-[0_4px_24px_rgba(139,92,246,0.3)] transition-all duration-300"
          style={{
            background:
              "linear-gradient(135deg, hsl(260 70% 50%), hsl(220 80% 50%))",
          }}
        >
          Log ind / Opret konto
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </Link>
  );
}
