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
  }) ?? [];

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
          ) : (
            <div className="space-y-6">
              {filteredCasinos.map((casino, index) => (
                <CasinoCard
                  key={casino.id}
                  casino={{
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
                    features: casino.features ?? [],
                    pros: casino.pros ?? [],
                    cons: casino.cons ?? [],
                    description: casino.description ?? "",
                    isRecommended: casino.is_recommended,
                  }}
                  rank={index + 1}
                />
              ))}
            </div>
          )}

          {!isLoading && filteredCasinos.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">
              Ingen casinoer matcher dette filter. Prøv en anden kategori.
            </p>
          )}
        </div>
      </section>

      <BonusTypeCards />
      <FAQSection />
    </>
  );
};

export default Index;
