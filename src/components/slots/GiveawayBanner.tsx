import giveawayBannerImage from "@/assets/slots/giveaway-banner-2.png";

export function GiveawayBanner() {
  return (
    <div className="block relative w-full h-full overflow-hidden rounded-xl border border-amber-500/30 bg-black">
      <img
        src={giveawayBannerImage}
        alt="Giveaway: Vind et gaming headset"
        className="absolute inset-0 w-full h-full object-fill scale-[2.2]"
        loading="lazy"
      />
    </div>
  );
}
