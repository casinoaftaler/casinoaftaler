import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gamepad2, ArrowRight } from "lucide-react";
import spillehalPromo from "@/assets/spillehal-promo-small.webp";
import risePromo from "@/assets/rise-of-fedesvin-promo-small.webp";
import bonanzaPromo from "@/assets/slots/fedesvin-bonanza-preview.jpg";

function PromoBanner({ to, image, alt, label, title }: { to: string; image: string; alt: string; label: string; title: string }) {
  return (
    <Link
      to={to}
      className="group relative block overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg"
    >
      <div className="relative w-full overflow-hidden">
        <img src={image} alt={alt} width={202} height={283} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 aspect-[4/5]" loading="lazy" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col gap-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-primary">🎰 Vind Præmier</p>
          <p className="text-xs font-semibold text-foreground leading-tight">{title}</p>
          <Button size="sm" className="w-full gap-2 text-xs mt-1">
            <Gamepad2 className="h-3.5 w-3.5" />
            {label} <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Link>
  );
}

export function SpillehalPromoBanner() {
  return (
    <div className="flex flex-col gap-4">
      <PromoBanner
        to="/community/slots/book-of-fedesvin"
        image={spillehalPromo}
        alt="Spil Book of Fedesvin gratis"
        label="Spil Nu"
        title="Spil gratis på Book of Fedesvin"
      />
      <PromoBanner
        to="/community/slots/rise-of-fedesvin"
        image={risePromo}
        alt="Spil Rise of Fedesvin gratis"
        label="Spil Nu"
        title="Spil gratis på Rise of Fedesvin"
      />
      <PromoBanner
        to="/community/slots/fedesvin-bonanza"
        image={bonanzaPromo}
        alt="Spil Fedesvin Bonanza gratis"
        label="Spil Nu"
        title="Spil gratis på Fedesvin Bonanza"
      />
    </div>
  );
}
