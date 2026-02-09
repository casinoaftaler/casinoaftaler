import { useEffect, useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { CasinoCard } from "@/components/CasinoCard";
import { BonusTypeCards } from "@/components/BonusTypeCards";
import { FAQSection } from "@/components/FAQSection";
import { FilterTabs } from "@/components/FilterTabs";
import { useCasinos } from "@/hooks/useCasinos";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);
  const { data: casinos, isLoading } = useCasinos();

  useEffect(() => {
    // If the list changes due to filtering, close any open card to avoid mismatches.
    setOpenCasinoId(null);
  }, [activeFilter]);

  const filteredCasinos = casinos?.filter((casino) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "no-sticky") return casino.bonus_type === "No-sticky";
    if (activeFilter === "free-spins")
      return (
        casino.features?.includes("Gratis Spins") ||
        casino.features?.includes("Free spins") ||
        casino.features?.includes("Free Spins")
      );
    if (activeFilter === "fast-payout")
      return (
        casino.features?.includes("Hurtig Udbetaling") ||
        casino.features?.includes("Fast payout") ||
        casino.features?.includes("Fast Payout")
      );
    if (activeFilter === "mobile")
      return (
        casino.features?.includes("Mobil App") ||
        casino.features?.includes("Mobil Venlig") ||
        casino.features?.includes("Mobile friendly") ||
        casino.features?.includes("Mobile app")
      );
    return true;
  })?.sort((a, b) => {
    // Recommended casinos first
    if (a.is_recommended && !b.is_recommended) return -1;
    if (!a.is_recommended && b.is_recommended) return 1;
    return 0;
  }) ?? [];

  const mapCasino = (casino: typeof filteredCasinos[0]) => ({
    id: casino.id,
    name: casino.name,
    slug: casino.slug,
    rating: Number(casino.rating),
    bonusTitle: casino.bonus_title,
    bonusAmount: casino.bonus_amount,
    bonusType: casino.bonus_type,
    wageringRequirements: casino.wagering_requirements,
    validity: casino.validity,
    minDeposit: casino.min_deposit,
    payoutTime: casino.payout_time,
    freeSpins: casino.free_spins,
    features: casino.features ?? [],
    pros: casino.pros ?? [],
    cons: casino.cons ?? [],
    description: casino.description ?? "",
    isRecommended: casino.is_recommended,
    isHot: casino.is_hot,
    logoUrl: casino.logo_url,
    affiliateUrl: casino.affiliate_url,
    gameProviders: casino.game_providers ?? [],
  });

  return (
    <>
      <HeroSection />

      {/* Top Casinos Section */}
      <section id="top-casinos" className="py-8 md:py-12">
        <div className="container">
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold">Top Casinobonusser</h2>
            <p className="mb-6 text-muted-foreground">
              Håndplukkede casinoer med de bedste velkomstbonusser, gennemgået af
              vores ekspertteam.
            </p>
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredCasinos.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              Ingen casinoer matcher dette filter. Prøv en anden kategori.
            </p>
          ) : (
            <div className="space-y-4">
              {/* Featured Cards Grid - Top 2 cards (large) */}
              {filteredCasinos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  {filteredCasinos.slice(0, 2).map((casino, index) => (
                    <CasinoCard
                      key={casino.id}
                      casino={mapCasino(casino)}
                      rank={index + 1}
                      open={openCasinoId === casino.id}
                      onOpenChange={(open) => setOpenCasinoId(open ? casino.id : null)}
                    />
                  ))}
                </div>
              )}

              {/* Featured Cards Grid - Next 3 cards (smaller) */}
              {filteredCasinos.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  {filteredCasinos.slice(2, 5).map((casino, index) => (
                    <CasinoCard
                      key={casino.id}
                      casino={mapCasino(casino)}
                      rank={index + 3}
                      open={openCasinoId === casino.id}
                      onOpenChange={(open) => setOpenCasinoId(open ? casino.id : null)}
                    />
                  ))}
                </div>
              )}

              {/* Remaining Cards Grid (Rank 6+) */}
              {filteredCasinos.length > 5 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  {filteredCasinos.slice(5).map((casino, index) => (
                    <CasinoCard
                      key={casino.id}
                      casino={mapCasino(casino)}
                      rank={index + 6}
                      open={openCasinoId === casino.id}
                      onOpenChange={(open) => setOpenCasinoId(open ? casino.id : null)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <BonusTypeCards />
      <FAQSection />
    </>
  );
};

export default Index;
