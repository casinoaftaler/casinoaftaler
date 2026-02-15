import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gamepad2, ArrowRight } from "lucide-react";
import spillehalPromo from "@/assets/spillehal-promo.jpg";

export function SpillehalPromoBanner() {
  return (
    <Link
      to="/community/slots"
      className="group relative block overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={spillehalPromo}
          alt="Prøv vores gratis spillehal med slots og spillemaskiner"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
        
        {/* Content overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-2">
            <Gamepad2 className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Gratis Spillehal
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
            Prøv Vores Spillemaskiner
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            Spil gratis slots og optjen point på vores leaderboard – helt uden risiko.
          </p>
          <Button size="sm" className="gap-2 transition-all group-hover:gap-3">
            Spil Nu <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
