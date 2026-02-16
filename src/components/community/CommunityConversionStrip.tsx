import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface CommunityConversionStripProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function CommunityConversionStrip({
  title = "🔥 Klar til at spille på nye casinoer?",
  description = "Find free spins og velkomstbonusser hos de bedste nye online casinoer.",
  ctaText = "Se Nye Casinoer",
  ctaLink = "/nye-casinoer",
}: CommunityConversionStripProps) {
  return (
    <section className="mt-16 mb-4">
      <Link
        to={ctaLink}
        className="group block rounded-xl p-6 md:p-8 transition-all duration-300 hover:scale-[1.005] hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
        style={{
          border: "1px solid rgba(139,92,246,0.3)",
          background:
            "linear-gradient(135deg, hsl(260 30% 16%) 0%, hsl(220 30% 16%) 100%)",
        }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center h-12 w-12 rounded-xl shrink-0" style={{ background: "linear-gradient(135deg, hsl(260 70% 50%), hsl(220 80% 50%))" }}>
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          </div>
          <Button
            className="gap-2 shrink-0 font-semibold shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, hsl(260 70% 50%), hsl(220 80% 50%))",
            }}
          >
            {ctaText}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </Link>
    </section>
  );
}
