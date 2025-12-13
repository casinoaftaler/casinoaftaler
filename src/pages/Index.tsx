import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { CasinoCard } from "@/components/CasinoCard";
import { BonusTypeCards } from "@/components/BonusTypeCards";
import { FAQSection } from "@/components/FAQSection";
import { FilterTabs } from "@/components/FilterTabs";
import { casinos } from "@/data/casinos";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCasinos = casinos.filter((casino) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "no-sticky") return casino.bonusType === "No-sticky";
    if (activeFilter === "free-spins")
      return casino.features.includes("Free spins");
    if (activeFilter === "fast-payout")
      return casino.features.includes("Fast payout");
    if (activeFilter === "mobile")
      return (
        casino.features.includes("Mobile friendly") ||
        casino.features.includes("Mobile app")
      );
    return true;
  });

  return (
    <>
      <HeroSection />

      {/* Top Casinos Section */}
      <section id="top-casinos" className="py-16">
        <div className="container">
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold">Top Casino Bonuses</h2>
            <p className="mb-6 text-muted-foreground">
              Hand-picked casinos with the best welcome bonuses, vetted by our
              expert team.
            </p>
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>

          <div className="space-y-6">
            {filteredCasinos.map((casino, index) => (
              <CasinoCard key={casino.id} casino={casino} rank={index + 1} />
            ))}
          </div>

          {filteredCasinos.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">
              No casinos match this filter. Try another category.
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
