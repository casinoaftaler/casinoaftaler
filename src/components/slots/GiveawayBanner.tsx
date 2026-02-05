import giveawayBannerImage from "@/assets/slots/giveaway-banner.png";

export function GiveawayBanner() {
  return (
    <div className="block relative w-full h-full overflow-hidden rounded-xl border border-amber-500/30 bg-card">
      <img
        src={giveawayBannerImage}
        alt="Giveaway: Vind et gaming headset"
        className="w-full h-full object-contain"
        loading="lazy"
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-3 top-3 rounded-lg bg-background/70 backdrop-blur-sm px-3 py-2 text-center">
          <p className="text-sm sm:text-base font-semibold text-foreground">
            Vind et gamer headset!
          </p>
        </div>

        <div className="absolute inset-x-3 bottom-3 rounded-lg bg-background/70 backdrop-blur-sm px-3 py-2 text-center">
          <p className="text-xs sm:text-sm text-foreground">
            Turneringen starter mandag d. 9 og slutter søndag d 19.
          </p>
          <p className="text-xs sm:text-sm font-semibold text-foreground mt-1">
            Værdi: 700kr
          </p>
        </div>
      </div>
    </div>
  );
}
