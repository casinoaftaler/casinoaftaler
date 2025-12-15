import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { CasinoCard } from "@/components/CasinoCard";
import { BonusTypeCards } from "@/components/BonusTypeCards";
import { FAQSection } from "@/components/FAQSection";
import { FilterTabs } from "@/components/FilterTabs";
import { useCasinos } from "@/hooks/useCasinos";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { data: casinos, isLoading } = useCasinos();

  const filteredCasinos = casinos?.filter((casino) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "no-sticky") return casino.bonus_type === "No-sticky";
    if (activeFilter === "free-spins")
      return casino.features?.includes("Free spins");
    if (activeFilter === "fast-payout")
      return casino.features?.includes("Fast payout");
    if (activeFilter === "mobile")
      return (
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
    logoUrl: casino.logo_url,
    affiliateUrl: casino.affiliate_url,
  });

  return (
    <>
      <HeroSection />

      {/* Top Casinos Section */}
      <section id="top-casinos" className="py-16">
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
          ) : filteredCasinos.length === 1 ? (
            <div className="max-w-2xl mx-auto">
              <CasinoCard casino={mapCasino(filteredCasinos[0])} size="large" rank={1} />
            </div>
          ) : filteredCasinos.length === 2 ? (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <CasinoCard casino={mapCasino(filteredCasinos[0])} size="large" rank={1} />
              </div>
              <div className="lg:col-span-1">
                <CasinoCard casino={mapCasino(filteredCasinos[1])} size="medium" rank={2} />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* First row: Large + Medium cards */}
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <CasinoCard casino={mapCasino(filteredCasinos[0])} size="large" rank={1} />
                </div>
                <div className="lg:col-span-1">
                  <CasinoCard casino={mapCasino(filteredCasinos[1])} size="medium" rank={2} />
                </div>
              </div>

              {/* Remaining cards in equal columns */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCasinos.slice(2).map((casino, index) => (
                  <CasinoCard
                    key={casino.id}
                    casino={mapCasino(casino)}
                    size="small"
                    rank={index + 3}
                  />
                ))}
              </div>
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
