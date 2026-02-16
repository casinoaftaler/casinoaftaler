import { Star, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { useAuth } from "@/hooks/useAuth";
import { CasinoCardDisclaimer } from "@/components/CasinoCardDisclaimer";
import type { Casino } from "@/hooks/useCasinos";

interface SlotCasinoCardProps {
  casino: Casino;
  backgroundImage: string;
}

export function SlotCasinoCard({ casino, backgroundImage }: SlotCasinoCardProps) {
  const { user } = useAuth();

  const handleBonusClick = () => {
    getAffiliateRedirect(casino.slug, user?.id);
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden rounded-xl border border-amber-500/30"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      
      {/* Content */}
      <div className="relative z-10 p-4 h-full flex flex-col justify-between gap-3">
        {/* Header: Logo + Name + Rating */}
        <div className="flex items-center gap-3">
          {casino.logo_url ? (
            <img 
              src={casino.logo_url} 
              alt={casino.name}
              width={48}
              height={48}
              loading="lazy"
              className="h-12 w-12 rounded-lg object-contain bg-white/10 p-1"
            />
          ) : (
            <div className="h-12 w-12 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-lg">
              {casino.name.charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white truncate">{casino.name}</h3>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(casino.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-amber-400/30"
                  }`}
                />
              ))}
              <span className="text-xs text-amber-400 ml-1">{casino.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Bonus headline */}
        <div className="text-center py-2">
          <p className="text-amber-400 font-bold text-xl leading-tight">
            {casino.bonus_amount}
          </p>
        </div>

        <div className="space-y-3">
          {/* Key stats */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-black/40 rounded-lg p-2 text-center">
              <p className="text-white/60">Bonus Type</p>
              <p className="text-white font-medium">{casino.bonus_type}</p>
            </div>
            <div className="bg-black/40 rounded-lg p-2 text-center">
              <p className="text-white/60">Gennemspil</p>
              <p className="text-white font-medium">{casino.wagering_requirements}</p>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleBonusClick}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold py-2 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Gift className="h-4 w-4 mr-2" />
            HENT BONUS
          </Button>

          {/* Legal Disclaimer */}
          <CasinoCardDisclaimer />
        </div>
      </div>
    </div>
  );
}
