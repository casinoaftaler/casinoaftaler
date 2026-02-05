import giveawayBannerImage from "@/assets/slots/giveaway-banner.png";

export function GiveawayBanner() {
  return (
    <div className="block relative w-full overflow-hidden rounded-xl border border-amber-500/30">
      <img 
        src={giveawayBannerImage} 
        alt="Giveaway" 
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
