import giveawayBannerImage from "@/assets/slots/giveaway-banner-2.png";

export function GiveawayBanner() {
  return (
    <div className="block relative w-full h-full overflow-hidden rounded-xl border border-amber-500/30 bg-card">
      <img
        src={giveawayBannerImage}
        alt="Giveaway: Vind et gaming headset"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
