import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import "@/styles/community-micro.css";

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
        className="community-panel cta-shine-wrap animate-border-glow group block rounded-xl p-6 md:p-8 transition-all duration-300 hover:scale-[1.005] hover:-translate-y-0.5 relative overflow-hidden"
      >
        {/* Moving gradient background */}
        <div className="absolute inset-0 pointer-events-none banner-moving-gradient" />
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="banner-particle" style={{ left: "20%", top: "30%" }} />
          <div className="banner-particle" style={{ left: "60%", top: "50%" }} />
          <div className="banner-particle" style={{ left: "80%", top: "20%" }} />
        </div>
        {/* Border shimmer */}
        <div className="absolute inset-0 pointer-events-none rounded-xl banner-border-shimmer" />

        <div className="relative flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div
            className="flex items-center justify-center h-12 w-12 rounded-xl shrink-0"
            style={{ background: "linear-gradient(135deg, hsl(260 70% 50%), hsl(220 80% 50%))" }}
          >
            <MenuIcon iconName="sparkles" className="h-6 w-6 text-white cta-icon-rotate" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          </div>
          <Button
            className="gap-2 shrink-0 font-semibold shadow-lg group-hover:shadow-[0_4px_24px_rgba(139,92,246,0.3)] transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, hsl(260 70% 50%), hsl(220 80% 50%))",
            }}
          >
            {ctaText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </Link>
    </section>
  );
}
