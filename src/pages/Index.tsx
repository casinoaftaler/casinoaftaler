import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { organizationSchema } from "@/lib/seo";
import { HeroSection } from "@/components/HeroSection";
import { WhyTrustUs } from "@/components/WhyTrustUs";
import { QuickNavSidebar } from "@/components/QuickNavBar";
import { TodayUpdatedSection } from "@/components/TodayUpdatedSection";
import { HomepageLatestSlots, useLatestSlots, buildLatestSlotsSchema } from "@/components/HomepageLatestSlots";
import { HomepagePopularSlots, usePopularSlots, buildPopularSlotsSchema } from "@/components/HomepagePopularSlots";
import { WeeklyRotationReviews } from "@/components/WeeklyRotationReviews";
import { DailyRotatingTip } from "@/components/DailyRotatingTip";
import { WeeklyGuideRotation } from "@/components/WeeklyGuideRotation";
import { HomepageLiveCommunity } from "@/components/HomepageLiveCommunity";
import { HomepageSeoSections } from "@/components/HomepageSeoSections";
import { HomepagePaymentSection, HomepageProviderSection } from "@/components/HomepagePaymentProviders";
import { HomepageTopProviders } from "@/components/HomepageTopProviders";
import {
  HomepageCasinospilSection,
  HomepageAnmeldelserSection,
  HomepageBonusHuntSection,
  HomepageNyhederSection,
  HomepageTrendsSection,
  HomepageGennemsigtighedSection,
  HomepageSlotShowcase,
  HomepageAnsvarligtSpilSection,
  HomepageKonverteringsSection,
} from "@/components/HomepageBottomSections";

import { CasinoCard } from "@/components/CasinoCard";
import { CASINO_SCORES } from "@/lib/reviewScoring";
import { BonusTypeCards } from "@/components/BonusTypeCards";
import { PopularReviewsSection } from "@/components/PopularReviewsSection";
import { FAQSection } from "@/components/FAQSection";
import { SourceCitations } from "@/components/SourceCitations";
import { buildFaqSchema } from "@/lib/seo";
import { FilterTabs } from "@/components/FilterTabs";
import { useCasinos } from "@/hooks/useCasinos";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getRouteLastmod } from "@/lib/seoRoutes";
import { Separator } from "@/components/ui/separator";

const PARTNER_SLUGS = ["spildansknu", "spilleautomaten", "betinia", "campobet", "swift-casino", "luna-casino"];

/**
 * Normalize feature strings for consistent filtering.
 */
function hasFeature(features: string[] | null, keywords: string[]): boolean {
  if (!features) return false;
  return features.some((f) => {
    const lower = f.toLowerCase();
    return keywords.some((k) => lower.includes(k));
  });
}

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);
  const { data: casinos, isLoading } = useCasinos();
  const { data: latestSlots } = useLatestSlots();
  const { data: popularSlots } = usePopularSlots();

  const { data: latestNewsDate } = useQuery({
    queryKey: ["homepage-latest-news-date"],
    queryFn: async () => {
      const { data } = await supabase
        .from("casino_news")
        .select("published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      return data?.published_at || null;
    },
    staleTime: 5 * 60 * 1000,
  });

  const homepageDateModified = getRouteLastmod("/") || latestNewsDate?.split("T")[0] || undefined;

  useEffect(() => {
    setOpenCasinoId(null);
  }, [activeFilter]);

  const filteredCasinos = casinos?.filter((casino) => {
    if (!PARTNER_SLUGS.includes(casino.slug)) return false;
    if (activeFilter === "all") return true;
    if (activeFilter === "no-sticky") return casino.bonus_type === "No-sticky";
    if (activeFilter === "free-spins") return hasFeature(casino.features, ["free spins", "gratis spins"]);
    if (activeFilter === "fast-payout") return hasFeature(casino.features, ["hurtig udbetaling", "fast payout"]);
    if (activeFilter === "mobile") return hasFeature(casino.features, ["mobil", "mobile"]);
    return true;
  })?.sort((a, b) => {
    if (a.is_recommended && !b.is_recommended) return -1;
    if (!a.is_recommended && b.is_recommended) return 1;
    return 0;
  }) ?? [];

  const mapCasino = (casino: typeof filteredCasinos[0]) => ({
    id: casino.id,
    name: casino.name,
    slug: casino.slug,
    rating: CASINO_SCORES[casino.slug]?.total ?? Number(casino.rating),
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
      
      <SEO
        title="Online Casinoer med Bonus – Nye Casinoer 2026"
        description="Find de bedste online casinoer med bonus og dansk licens. Sammenlign nye casinoer, live casino, free spins og spil ansvarligt med vores uafhængige anmeldelser."
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@graph": [
              {
                ...organizationSchema,
                description: "Danmarks uafhængige sammenligningstjeneste for online casinoer med dansk licens.",
                foundingDate: "2021",
              },
              {
                "@type": "WebPage",
                "@id": "https://casinoaftaler.dk/#webpage",
                url: "https://casinoaftaler.dk",
                name: "Online Casinoer med Bonus – Nye Casinoer 2026",
                dateModified: `${homepageDateModified}T00:00:00+01:00`,
                isPartOf: { "@id": "https://casinoaftaler.dk/#website" },
              },
            ],
          },
          // ItemList schema for partner casinos – enables Google Carousel rich snippets
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Bedste Online Casinoer i Danmark 2026",
            numberOfItems: PARTNER_SLUGS.length,
            itemListElement: [
              { "@type": "ListItem", position: 1, item: { "@type": "Thing", name: "SpilDanskNu", url: "https://casinoaftaler.dk/casino-anmeldelser/spildansknu" } },
              { "@type": "ListItem", position: 2, item: { "@type": "Thing", name: "Spilleautomaten", url: "https://casinoaftaler.dk/casino-anmeldelser/spilleautomaten" } },
              { "@type": "ListItem", position: 3, item: { "@type": "Thing", name: "Betinia", url: "https://casinoaftaler.dk/casino-anmeldelser/betinia" } },
              { "@type": "ListItem", position: 4, item: { "@type": "Thing", name: "Campobet", url: "https://casinoaftaler.dk/casino-anmeldelser/campobet" } },
              { "@type": "ListItem", position: 5, item: { "@type": "Thing", name: "Swift Casino", url: "https://casinoaftaler.dk/casino-anmeldelser/swift-casino" } },
              { "@type": "ListItem", position: 6, item: { "@type": "Thing", name: "Luna Casino", url: "https://casinoaftaler.dk/casino-anmeldelser/luna-casino" } },
            ],
          },
          ...(latestSlots?.length ? [buildLatestSlotsSchema(latestSlots)] : []),
          ...(popularSlots?.length ? [buildPopularSlotsSchema(popularSlots)] : []),
          buildFaqSchema([
            {
              question: "Hvad er det vigtigste at vide, før man spiller på online casino i Danmark?",
              answer: "Det vigtigste er at vælge et online casino med gyldig dansk licens fra Spillemyndigheden. Licensen sikrer, at casinoet overholder strenge krav til spillerbeskyttelse, herunder tilslutning til ROFUS, krypteret dataoverførsel og maksimalt omsætningskrav på 10x. Danske online casinoer bruger MitID til registrering, og alle gevinster er skattefri.",
            },
            {
              question: "Hvordan finder jeg det bedste online casino til mine behov?",
              answer: "Start med at definere dine prioriteter: Er det spiludvalg, udbetalingshastighed, betalingsmetoder eller vilkår? Sammenlign online casinoer på tværs af disse faktorer. Vores topliste opdateres løbende baseret på grundige tests af bonus, spiludvalg, betalingsmetoder, kundeservice, mobiloplevelse og sikkerhed.",
            },
            {
              question: "Er online casinoer i Danmark sikre og regulerede?",
              answer: "Ja, det danske marked er et af de mest strengt regulerede i Europa. Spillemyndigheden udsteder licenser og fører løbende tilsyn. Alle licenserede online casinoer skal dokumentere fair spil via certificerede RNG-systemer, implementere anti-hvidvask-procedurer og tilbyde selvudelukkelsesværktøjer.",
            },
            {
              question: "Skal jeg betale skat af gevinster fra online casino?",
              answer: "Nej, alle gevinster fra online casinoer med gyldig dansk licens er 100 % skattefri – uanset størrelse. Skatten er betalt af casinooperatøren via licensafgiften.",
            },
            {
              question: "Hvorfor bør jeg sammenligne online casinoer, før jeg vælger?",
              answer: "Fordi der er markante forskelle mellem online casinoer i Danmark – fra udbetalingstider og spiludvalg til bonusvilkår og kundeservice. En grundig sammenligning hjælper dig med at undgå skjulte vilkår og finde det spillested, der reelt matcher dine præferencer.",
            },
            {
              question: "Hvilke casinospil giver de bedste vinderchancer?",
              answer: "Blackjack har den laveste house edge (ned til 0,5 % med optimal strategi), efterfulgt af baccarat (ca. 1,06 %) og video poker (op til 99,5 % RTP). Blandt spilleautomater varierer RTP fra 88 % til 97 %+.",
            },
          ]),
        ]}
      />

      <HeroSection />

      {/* Top Casinos Section with sidebar */}
      <section id="top-casinos" className="py-8 md:py-12" style={{ contain: 'layout style' }}>
        <div className="container relative">
          <aside className="hidden xl:block absolute right-full top-0 mr-6 w-[200px]">
            <QuickNavSidebar />
          </aside>
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold">Bedste Online Casinoer i Danmark</h2>
            <p className="mb-6 text-muted-foreground">
              Håndplukkede og gennemtestede online casinoer med dansk licens – vurderet på spiludvalg, udbetalinger og vilkår.
            </p>
            <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center" style={{ minHeight: '600px', contain: 'layout style' }}>
              <div className="w-full space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-[160px] rounded-2xl bg-muted animate-pulse" />
                ))}
              </div>
            </div>
          ) : filteredCasinos.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              Ingen casinoer matcher dette filter. Prøv en anden kategori.
            </p>
          ) : (
            <div className="space-y-4">
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

      <TodayUpdatedSection />
      <DailyRotatingTip />
      <HomepageLatestSlots />
      <HomepagePopularSlots />
      <HomepageTopProviders />
      <HomepageLiveCommunity />
      <WhyTrustUs />

      {/* === SEO Content Sections === */}
      <div className="container py-8 md:py-12">
        <HomepageSeoSections />

        <BonusTypeCards />
        <Separator className="my-10" />

        <PopularReviewsSection />
        <Separator className="my-10" />

        <WeeklyRotationReviews />
        <Separator className="my-10" />

        <WeeklyGuideRotation />
        <Separator className="my-10" />

        {/* Sikkerhed og licens */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sikkerhed og Licens – Spil Trygt på Online Casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Danmark har et af Europas mest strengt regulerede markeder for online casino. Spillemyndigheden udsteder licenser og fører løbende tilsyn med alle operatører, hvilket sikrer, at dit spil foregår i trygge og kontrollerede rammer. Alle online casinoer, vi anbefaler på Casinoaftaler, har gyldig dansk licens – det er vores absolutte ufravigelige krav.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En dansk licens garanterer, at casinoet benytter certificerede tilfældighedsgeneratorer (RNG), at dine indskud er adskilt fra operatørens driftsmidler, og at du har adgang til selvudelukkelsesværktøjer via{" "}
            <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>
            . Alle gevinster fra licenserede online casinoer er desuden 100 % skattefri i Danmark.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Har du brug for hjælp eller oplever problemer med dine spillevaner, kan du kontakte{" "}
            <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>
            {" "}– en gratis og anonym rådgivningstjeneste. Vi opfordrer altid til{" "}
            <Link to="/ansvarligt-spil" className="text-primary hover:underline font-medium">ansvarligt spil</Link>
            {" "}og at sætte faste grænser for tid og penge.
          </p>
        </section>

        <Separator className="my-10" />
        <HomepagePaymentSection />
        <Separator className="my-10" />
        <HomepageProviderSection />
        <Separator className="my-10" />
        <HomepageCasinospilSection />
        <Separator className="my-10" />
        <HomepageAnmeldelserSection />
        <Separator className="my-10" />
        <HomepageBonusHuntSection />
        <Separator className="my-10" />
        <HomepageNyhederSection />
        <Separator className="my-10" />
        <HomepageTrendsSection />
        <Separator className="my-10" />
        <HomepageGennemsigtighedSection />
        <Separator className="my-10" />
        <HomepageSlotShowcase />
        <Separator className="my-10" />
        <HomepageAnsvarligtSpilSection />
        <Separator className="my-10" />
        <HomepageKonverteringsSection />

        <SourceCitations />

        <FAQSection title="Ofte stillede spørgsmål om online casino i Danmark" faqs={[
          {
            question: "Hvad er det vigtigste at vide, før man spiller på online casino i Danmark?",
            answer: "Det vigtigste er at vælge et online casino med gyldig dansk licens fra Spillemyndigheden. Licensen sikrer, at casinoet overholder strenge krav til spillerbeskyttelse, herunder tilslutning til ROFUS, krypteret dataoverførsel og maksimalt omsætningskrav på 10x. Danske online casinoer bruger MitID til registrering, og alle gevinster er skattefri. Vi anbefaler altid at sætte et budget, før du starter.",
          },
          {
            question: "Hvordan finder jeg det bedste online casino til mine behov?",
            answer: "Start med at definere dine prioriteter: Er det spiludvalg, udbetalingshastighed, betalingsmetoder eller vilkår? Sammenlign online casinoer på tværs af disse faktorer. Vores topliste opdateres løbende baseret på grundige tests af bonus, spiludvalg, betalingsmetoder, kundeservice, mobiloplevelse og sikkerhed.",
          },
          {
            question: "Er online casinoer i Danmark sikre og regulerede?",
            answer: "Ja, det danske marked er et af de mest strengt regulerede i Europa. Spillemyndigheden udsteder licenser og fører løbende tilsyn. Alle licenserede online casinoer skal dokumentere fair spil via certificerede RNG-systemer, implementere anti-hvidvask-procedurer og tilbyde selvudelukkelsesværktøjer. ROFUS giver dig mulighed for at udelukke dig selv fra alle danske spillesider med ét klik.",
          },
          {
            question: "Skal jeg betale skat af gevinster fra online casino?",
            answer: "Nej, alle gevinster fra online casinoer med gyldig dansk licens er 100 % skattefri – uanset størrelse. Skatten er betalt af casinooperatøren via licensafgiften. Gevinster fra online casinoer uden dansk licens er derimod skattepligtige, og du mister al spillerbeskyttelse.",
          },
          {
            question: "Hvorfor bør jeg sammenligne online casinoer, før jeg vælger?",
            answer: "Fordi der er markante forskelle mellem online casinoer i Danmark – fra udbetalingstider og spiludvalg til bonusvilkår og kundeservice. En grundig sammenligning hjælper dig med at undgå skjulte vilkår og finde det spillested, der reelt matcher dine præferencer. Vores uafhængige tests gør det nemt at sammenligne på tværs af de vigtigste kriterier.",
          },
          {
            question: "Hvilke casinospil giver de bedste vinderchancer?",
            answer: "Blackjack har den laveste house edge (ned til 0,5 % med optimal strategi), efterfulgt af baccarat (ca. 1,06 %) og video poker (op til 99,5 % RTP). Blandt spilleautomater varierer RTP fra 88 % til 97 %+. Højere RTP betyder bedre langsigtede chancer, men volatilitet spiller også en rolle for din oplevelse.",
          },
        ]} />
      </div>
    </>
  );
};

export default Index;
