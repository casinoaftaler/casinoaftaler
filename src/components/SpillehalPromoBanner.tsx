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
      <div className="relative w-full overflow-hidden">
        <img
          src={spillehalPromo}
          alt="Prøv vores gratis spillehal med slots og spillemaskiner"
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/95 via-background/60 to-transparent" />
        
        {/* Content overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <Button size="sm" className="w-full gap-2 text-xs">
            <Gamepad2 className="h-3.5 w-3.5" />
            Spil Nu <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
