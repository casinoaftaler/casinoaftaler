import { Link } from "react-router-dom";
import giveawayBannerImage from "@/assets/slots/giveaway-banner.png";

interface GiveawayBannerProps {
  backgroundImage: string;
}

export function GiveawayBanner({ backgroundImage }: GiveawayBannerProps) {
  return (
    <Link 
      to="/shop"
      className="block relative w-full overflow-hidden rounded-xl border border-amber-500/30 hover:border-amber-500/50 transition-colors"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for consistency */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/50 to-background/70" />
      
      {/* Giveaway image centered */}
      <div className="relative z-10 p-4 flex items-center justify-center min-h-[280px]">
        <img 
          src={giveawayBannerImage} 
          alt="Giveaway" 
          className="w-full h-auto max-h-[250px] object-contain drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]"
        />
      </div>
    </Link>
  );
}
