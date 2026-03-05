import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { HeroSection } from "@/components/HeroSection";
import { WhyTrustUs } from "@/components/WhyTrustUs";
import { QuickNavSidebar } from "@/components/QuickNavBar";
import { TodayUpdatedSection } from "@/components/TodayUpdatedSection";
import { WeeklyRotationReviews } from "@/components/WeeklyRotationReviews";

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
import { getTodayDanish } from "@/lib/danishDate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Gamepad2,
  CreditCard,
  TrendingUp,
  Star,
  BookOpen,
  Zap,
  Gift,
  Target,
  CheckCircle2,
  ArrowRight,
  Search,
  Scale,
  Newspaper,
} from "lucide-react";

const PARTNER_SLUGS = ["spildansknu", "spilleautomaten", "betinia", "campobet", "swift-casino", "luna-casino"];

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);
  const { data: casinos, isLoading } = useCasinos();

  // Fetch latest news article date for dynamic dateModified
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

  // Homepage dateModified = latest of today (for free-spins daily) or latest news
  const homepageDateModified = (() => {
    const today = getTodayDanish();
    if (latestNewsDate) {
      const newsDate = latestNewsDate.split("T")[0];
      return newsDate > today ? newsDate : today;
    }
    return today;
  })();

  useEffect(() => {
    setOpenCasinoId(null);
  }, [activeFilter]);

  const filteredCasinos = casinos?.filter((casino) => {
    if (!PARTNER_SLUGS.includes(casino.slug)) return false;
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
                "@type": "Organization",
                "@id": "https://casinoaftaler.dk/#organization",
                name: "Casinoaftaler.dk",
                url: "https://casinoaftaler.dk",
                description: "Danmarks uafhængige sammenligningstjeneste for online casinoer med dansk licens.",
                foundingDate: "2021",
                sameAs: [
                  "https://www.youtube.com/@casinoaftaler",
                  "https://www.instagram.com/casinoaftaler",
                  "https://www.facebook.com/casinoaftaler",
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://casinoaftaler.dk/#webpage",
                url: "https://casinoaftaler.dk",
                name: "Online Casinoer med Bonus – Nye Casinoer 2026",
                dateModified: `${homepageDateModified}T00:00:00+01:00`,
                isPartOf: { "@id": "https://casinoaftaler.dk/#organization" },
              },
            ],
          },
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
          {/* Left sidebar - positioned just outside container on xl */}
          <aside className="hidden xl:block absolute right-full top-0 mr-6 w-[200px]">
            <QuickNavSidebar />
          </aside>
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold">Bedste Online Casinoer i Danmark</h2>
            <p className="mb-6 text-muted-foreground">
              Håndplukkede og gennemtestede online casinoer med dansk licens – vurderet på spiludvalg, udbetalinger og vilkår.
            </p>
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center" style={{ minHeight: '900px', contain: 'layout' }}>
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
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

      {/* Opdateret i dag – under casinokort */}
      <TodayUpdatedSection />

      <WhyTrustUs />

      {/* === SEO Content Sections === */}
      <div className="container py-8 md:py-12">

        {/* Section 1: Hvorfor sammenligne online casinoer? */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvorfor Sammenligne Online Casinoer?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med over 30 licenserede online casinoer i Danmark kan det være overvældende at finde det rette spillested. Hvert online casino har sine styrker og svagheder – fra spiludvalg og udbetalingshastighed til kundeservice og mobiloplevelse. Derfor er en grundig sammenligning afgørende, før du opretter en konto og indbetaler penge.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hos <strong>Casinoaftaler</strong> tester vi hvert online casino efter en standardiseret metode, så du kan træffe en informeret beslutning baseret på objektive kriterier frem for markedsføring. Vi undersøger alt fra licensforhold og{" "}
            <Link to="/betalingsmetoder" className="text-primary hover:underline font-medium">betalingsmetoder</Link>
            {" "}til{" "}
            <Link to="/casinospil" className="text-primary hover:underline font-medium">spiludvalget</Link>
            {" "}og de reelle vilkår bag tilbuddene. Vores{" "}
            <Link to="/top-10-casino-online" className="text-primary hover:underline font-medium">top 10 liste over de bedste casinoer</Link>
            {" "}opdateres månedligt baseret på disse tests.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            En uafhængig sammenligning beskytter dig mod skjulte vilkår, langsomme udbetalinger og dårlig kundesupport. Ved at læse vores vurderinger, før du vælger, undgår du de mest almindelige fælder og finder det online casino, der reelt passer til dine præferencer og din spillestil.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Section 2: Hvad kendetegner det bedste online casino? */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Hvad Kendetegner det Bedste Online Casino?</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Der findes ikke ét objektivt bedste online casino – det afhænger af, hvad du prioriterer. Men der er en række faktorer, som adskiller de bedste online casinoer fra gennemsnittet. Her er de vigtigste kriterier, vi vurderer hvert spillested på:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, title: "Dansk Licens og Sikkerhed", desc: "Alle online casinoer, vi anbefaler, har gyldig licens fra Spillemyndigheden, SSL-kryptering og er tilsluttet ROFUS. Det er det absolutte minimum for et seriøst spillested." },
              { icon: Gamepad2, title: "Bredt Spiludvalg", desc: "Et godt online casino tilbyder hundredvis af slots, bordspil og live casino fra anerkendte udbydere som NetEnt, Pragmatic Play og Evolution Gaming." },
              { icon: TrendingUp, title: "Hurtige Udbetalinger", desc: "De bedste online casinoer behandler udbetalinger inden for 24 timer. Vi måler de faktiske behandlingstider og sammenligner dem på tværs af platforme." },
              { icon: CreditCard, title: "Fleksible Betalingsmetoder", desc: "MobilePay, Trustly, Visa og Apple Pay – et topmoderne online casino understøtter de metoder, danske spillere foretrækker." },
              { icon: Users, title: "Tilgængelig Kundeservice", desc: "Live chat, e-mail og helst dansk support. Vi tester responstider og kvaliteten af den hjælp, man faktisk modtager." },
              { icon: Scale, title: "Fair og Gennemsigtige Vilkår", desc: "Omsætningskrav, udbetalingsgrænser og bonusvilkår skal være klart kommunikeret. Vi afslører de spillesteder, der gemmer vilkår i det fine print." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Section 3: Nye online casinoer i Danmark */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Nye Online Casinoer i Danmark 2026</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det danske marked for online casino byder løbende på nye spillesteder, og 2026 er ingen undtagelse. Nye online casinoer bringer ofte innovativt design, hurtigere betalingsløsninger og konkurrencedygtige tilbud for at tiltrække spillere fra de etablerede platforme.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi holder konstant øje med markedet og tester hvert nyt online casino grundigt, inden vi anbefaler det. Vores{" "}
            <Link to="/nye-casinoer" className="text-primary hover:underline font-medium">oversigt over nye casinoer i Danmark</Link>
            {" "}giver dig et komplet overblik over de seneste tilføjelser – inklusiv vores ærlige vurdering af spiludvalg, betalingsmetoder og brugeroplevelse.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Nye spillesteder satser typisk på moderne løsninger som{" "}
            <Link to="/betalingsmetoder/mobilepay" className="text-primary hover:underline font-medium">MobilePay</Link>
            {" "}og{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary hover:underline font-medium">Trustly</Link>
            {" "}samt et kurateret spiludvalg fra innovative udviklere som{" "}
            <Link to="/spiludviklere/hacksaw-gaming" className="text-primary hover:underline font-medium">Hacksaw Gaming</Link>
            {" "}og{" "}
            <Link to="/spiludviklere/nolimit-city" className="text-primary hover:underline font-medium">Nolimit City</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Section 4: Bonusser og kampagner (kort sektion) */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bonusser og Kampagner hos Online Casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            De fleste online casinoer tilbyder en form for velkomstpakke til nye spillere. Det kan være en matchbonus, free spins eller begge dele. Bonussen er dog kun én af mange faktorer, du bør overveje, når du vælger online casino – spiludvalg, udbetalingshastighed og vilkår er mindst lige så vigtige.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvis du vil dykke ned i de forskellige bonustyper, omsætningskrav og strategier for at få mest muligt ud af dit spil, har vi samlet alt i vores{" "}
            <Link to="/casino-bonus" className="text-primary hover:underline font-medium">komplette guide til casino bonusser</Link>
            . Her finder du også sammenligning af{" "}
            <Link to="/velkomstbonus" className="text-primary hover:underline font-medium">velkomstbonusser</Link>
            ,{" "}
            <Link to="/free-spins" className="text-primary hover:underline font-medium">free spins</Link>
            {", "}
            <Link to="/free-spins-i-dag" className="text-primary hover:underline font-medium">dagens free spins tilbud</Link>
            {" "}og{" "}
            <Link to="/bonus-uden-omsaetningskrav" className="text-primary hover:underline font-medium">bonusser uden omsætningskrav</Link>.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Erfarne spillere bør desuden kende til{" "}
            <Link to="/cashback-bonus" className="text-primary hover:underline font-medium">cashback bonusser</Link>
            , der returnerer en procentdel af dine tab, og{" "}
            <Link to="/reload-bonus" className="text-primary hover:underline font-medium">reload bonusser</Link>
            , der giver ekstra midler ved gentagne indbetalinger. Begge bonustyper kan have højere langsigtet værdi end en engangsbonusser.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Husk altid at læse vilkårene grundigt – især{" "}
            <Link to="/omsaetningskrav" className="text-primary hover:underline font-medium">omsætningskravene</Link>
            {" "}– før du accepterer en bonus. Et lavt omsætningskrav er ofte mere værd end en stor bonussum med urealistiske betingelser.
          </p>
        </section>

        <BonusTypeCards />

        <Separator className="my-10" />

        <PopularReviewsSection />

        <Separator className="my-10" />

        {/* Weekly Rotation – distributes crawl equity over time */}
        <WeeklyRotationReviews />

        <Separator className="my-10" />

        {/* Section 5: Sikkerhed og licens */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sikkerhed og Licens – Spil Trygt på Online Casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Danmark har et af Europas mest strengt regulerede markeder for online casino. Spillemyndigheden udsteder licenser og fører løbende tilsyn med alle operatører, hvilket sikrer, at dit spil foregår i trygge og kontrollerede rammer. Alle online casinoer, vi anbefaler på Casinoaftaler, har gyldig dansk licens – det er vores absolutte ufravigelige krav.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En dansk licens garanterer, at casinoet benytter certificerede tilfældighedsgeneratorer (RNG), at dine indskud er adskilt fra operatørens driftsmidler, og at du har adgang til selvudelukkelses­værktøjer via{" "}
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

        {/* Betalingsmetoder Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder på Danske Online Casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Valget af betalingsmetode påvirker din samlede oplevelse på et online casino. Hurtige ind- og udbetalinger er afgørende, og i 2026 har danske spillere adgang til et bredt udvalg af sikre løsninger. Vi har testet og gennemgået alle de mest populære metoder i vores{" "}
            <Link to="/betalingsmetoder" className="text-primary hover:underline font-medium">komplette guide til betalingsmetoder</Link>.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { name: "MobilePay", to: "/betalingsmetoder/mobilepay" },
              { name: "Trustly", to: "/betalingsmetoder/trustly" },
              { name: "Visa/Mastercard", to: "/betalingsmetoder/visa-mastercard" },
              { name: "Apple Pay", to: "/betalingsmetoder/apple-pay" },
              { name: "PayPal", to: "/betalingsmetoder/paypal" },
              { name: "Skrill", to: "/betalingsmetoder/skrill" },
              { name: "Revolut", to: "/betalingsmetoder/revolut" },
              { name: "Paysafecard", to: "/betalingsmetoder/paysafecard" },
              { name: "Zimpler", to: "/betalingsmetoder/zimpler" },
              { name: "Bankoverførsel", to: "/betalingsmetoder/bankoverforsler" },
            ].map((pm) => (
              <Link
                key={pm.name}
                to={pm.to}
                className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                <CreditCard className="h-4 w-4 text-primary flex-shrink-0" />
                {pm.name}
              </Link>
            ))}
          </div>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            De fleste online casinoer tilbyder øjeblikkelige indbetalinger, men udbetalingstider varierer afhængigt af metode. E-wallets som{" "}
            <Link to="/betalingsmetoder/skrill" className="text-primary hover:underline font-medium">Skrill</Link>
            {" "}og{" "}
            <Link to="/betalingsmetoder/paypal" className="text-primary hover:underline font-medium">PayPal</Link>
            {" "}tilbyder typisk de hurtigste udbetalinger (0-24 timer), mens{" "}
            <Link to="/betalingsmetoder/bankoverforsler" className="text-primary hover:underline font-medium">bankoverførsler</Link>
            {" "}kan tage 1-3 hverdage.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Spiludviklere Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spiludviklere bag Online Casino-spil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Kvaliteten af dit online casino afhænger i høj grad af de{" "}
            <Link to="/spiludviklere" className="text-primary hover:underline font-medium">spiludviklere</Link>
            , der står bag spillene. Anerkendte udviklere garanterer fair gameplay med certificerede RNG-systemer, høj grafisk kvalitet og innovative mekanikker.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { name: "NetEnt", to: "/spiludviklere/netent" },
              { name: "Pragmatic Play", to: "/spiludviklere/pragmatic-play" },
              { name: "Play'n GO", to: "/spiludviklere/play-n-go" },
              { name: "Evolution Gaming", to: "/spiludviklere/evolution-gaming" },
              { name: "Hacksaw Gaming", to: "/spiludviklere/hacksaw-gaming" },
              { name: "Nolimit City", to: "/spiludviklere/nolimit-city" },
              { name: "Relax Gaming", to: "/spiludviklere/relax-gaming" },
              { name: "Big Time Gaming", to: "/spiludviklere/big-time-gaming" },
              { name: "Red Tiger", to: "/spiludviklere/red-tiger" },
              { name: "ELK Studios", to: "/spiludviklere/elk-studios" },
              { name: "Yggdrasil", to: "/spiludviklere/yggdrasil" },
              { name: "Microgaming", to: "/spiludviklere/microgaming" },
            ].map((provider) => (
              <Link
                key={provider.name}
                to={provider.to}
                className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                <Gamepad2 className="h-4 w-4 text-primary flex-shrink-0" />
                {provider.name}
              </Link>
            ))}
          </div>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            Når du vælger et online casino, bør du altid tjekke, hvilke udviklere der er repræsenteret. Et bredt udvalg sikrer adgang til mange spiltyper, temaer og volatilitetsniveauer. Læs mere i vores{" "}
            <Link to="/spiludviklere" className="text-primary hover:underline font-medium">komplette guide til spiludviklere</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Casinospil Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Casinospil – Slots, Bordspil og Live Casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Et komplet online casino tilbyder hundredvis af forskellige{" "}
            <Link to="/casinospil" className="text-primary hover:underline font-medium">casinospil</Link>
            , fra klassiske spilleautomater til avancerede live dealer-spil. Forståelse af de forskellige kategorier hjælper dig med at finde de spil, der passer til din spillestil og budget.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Spilleautomater</strong> er den mest populære kategori med tusindvis af titler. RTP varierer typisk fra 94 % til 97 %, og volatiliteten afgør, om du foretrækker hyppige små gevinster eller sjældnere store udbetalinger. I{" "}
            <Link to="/live-casino" className="text-primary hover:underline font-medium">live casino</Link>
            {" "}kan du spille blackjack, roulette og baccarat med rigtige dealere i realtid – streamet fra professionelle studier hos{" "}
            <Link to="/spiludviklere/evolution-gaming" className="text-primary hover:underline font-medium">Evolution Gaming</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Bordspil som blackjack tilbyder lavere husfordel (ned til 0,5 % med optimal strategi), hvilket gør dem attraktive for strategiske spillere. Vi anbefaler at prøve vores{" "}
            <Link to="/community/slots" className="text-primary hover:underline font-medium">gratis spillehal</Link>
            {" "}for at teste forskellige spiltyper uden risiko.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Casino Anmeldelser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Casino Anmeldelser – Uafhængige og Dybdegående</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi anmelder hvert online casino grundigt med fokus på de faktorer, der reelt betyder noget for danske spillere. Vores anmeldelser dækker alt fra vilkår og spiludvalg til{" "}
            <Link to="/betalingsmetoder" className="text-primary hover:underline font-medium">betalingsmetoder</Link>
            {" "}og udbetalingstider. Her er nogle af vores seneste anmeldelser:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: "Spilleautomaten", to: "/casino-anmeldelser/spilleautomaten" },
              { name: "Campobet", to: "/casino-anmeldelser/campobet" },
              { name: "Betinia", to: "/casino-anmeldelser/betinia" },
              { name: "Swift Casino", to: "/casino-anmeldelser/swift-casino" },
              { name: "Luna Casino", to: "/casino-anmeldelser/luna-casino" },
              { name: "SpilDanskNu", to: "/casino-anmeldelser/spildansknu" },
            ].map((casino) => (
              <Link
                key={casino.name}
                to={casino.to}
                className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
                {casino.name} Anmeldelse
              </Link>
            ))}
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Læs alle vores{" "}
            <Link to="/casino-anmeldelser" className="text-primary hover:underline font-medium">casino anmeldelser</Link>
            {" "}for at finde det online casino, der matcher dine præferencer.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Bonus Hunt – Community & Live tests */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            Live Bonus Hunts – Dokumenterede Resultater
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Følg med i vores live bonus hunts, hvor vi tester spilleautomater på{" "}
            <Link to="/casino-licenser" className="text-primary hover:underline font-medium">licenserede danske casinoer</Link>
            {" "}med fuld transparens. Alle resultater dokumenteres med gennemsnit X, break-even analyser og community bets i realtid.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vores{" "}
            <Link to="/bonus-hunt" className="text-primary hover:underline font-medium">Bonus Hunt arkiv</Link>
            {" "}giver dig adgang til alle tidligere hunts med detaljerede statistikker. Deltag i community bets og følg{" "}
            <Link to="/om" className="text-primary hover:underline font-medium">Casinoaftaler</Link>
            {" "}live på{" "}
            <a href="https://www.twitch.tv/fedesvinsejer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Twitch</a>.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/bonus-hunt"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              <Target className="h-4 w-4 text-primary flex-shrink-0" />
              Se alle bonus hunts
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/community"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              <Users className="h-4 w-4 text-primary flex-shrink-0" />
              Udforsk community
            </Link>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Casino Nyheder sektion */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Casino Nyheder</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hold dig opdateret med de seneste nyheder, analyser og ændringer fra det danske online casino-marked. Vi dækker licensudstedelser, bonusændringer, nye lanceringer og lovgivning – alt sammen med fokus på, hvad det betyder for dig som dansk spiller.
          </p>
          <Link
            to="/casino-nyheder"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            <Newspaper className="h-4 w-4 text-primary flex-shrink-0" />
            Se alle casino nyheder
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <Separator className="my-10" />

        {/* Casino-trends 2026 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Online Casino-trends i Danmark 2026</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Det danske marked for online casino udvikler sig hurtigt. Her er de vigtigste trends, der former din spiloplevelse i 2026:
          </p>
          <div className="space-y-3">
            {[
              { title: "Øjeblikkelige betalinger", desc: "MobilePay, Trustly og Apple Pay gør ind- og udbetalinger øjeblikkelige. Nye løsninger som Revolut og Zimpler vinder også frem hos danske online casinoer." },
              { title: "Mobil-first design", desc: "Nye online casinoer designes med mobilen i centrum – fuldt optimeret til smartphones og tablets med hurtig loading og intuitive menuer." },
              { title: "Gamification og belønninger", desc: "Missioner, achievements og loyalitetsprogrammer gør spiloplevelsen mere engagerende og giver ekstra værdi for dit spil." },
              { title: "Personlige tilbud", desc: "Online casinoer bruger spilleradfærd til at skræddersy tilbud, der passer til den enkelte. Det betyder mere relevante kampagner og bedre værdi." },
              { title: "Udvidet live casino", desc: "Live dealer-sektioner vokser med nye spiltyper, game shows og interaktive funktioner fra Evolution Gaming og andre førende udbydere." },
              { title: "Fokus på ansvarligt spil", desc: "Flere online casinoer implementerer proaktive værktøjer som realtime-advarsler, tabsgrænser og spillepauser direkte i brugeroplevelsen." },
            ].map((trend) => (
              <div
                key={trend.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{trend.title}</h3>
                  <p className="text-sm text-muted-foreground">{trend.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Gennemsigtighed */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Gennemsigtighed og Troværdighed</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fuld gennemsigtighed er grundlaget for alt, vi gør. Sitet er en gratis ressource, finansieret gennem affiliate-partnerskaber med udvalgte online casinoer. Når du klikker på et link og registrerer dig, modtager vi en provision – det koster dig aldrig ekstra og påvirker ikke vores vurderinger.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vores team tester hvert online casino grundigt baseret på objektive kriterier. Vi samarbejder kun med licenserede og pålidelige spillesteder, der overholder standarder for{" "}
             <Link to="/ansvarligt-spil" className="text-primary hover:underline font-medium">ansvarligt spil</Link>
            . Læs mere{" "}
            <Link to="/om" className="text-primary hover:underline font-medium">om os</Link>
            {" "}eller{" "}
            <Link to="/kontakt" className="text-primary hover:underline font-medium">kontakt os</Link>
            {" "}med spørgsmål.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Nye Spillemaskiner 2026 – Crawl acceleration */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gamepad2 className="h-7 w-7 text-primary" />
            Nye Spillemaskiner 2026
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Online spilleautomater udvikler sig konstant, og 2026 byder på en ny generation af populære titler med innovative mekanikker og imponerende gevinstpotentiale. Her er fem af de mest spillede spillemaskiner hos danske casinoer lige nu:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
              <Link to="/casinospil/spillemaskiner/sweet-bonanza" className="text-primary hover:underline font-medium">Sweet Bonanza</Link>
              {" "}– Pragmatic Plays cluster-pays hit med 96,48 % RTP og 21.175× max win.
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
              <Link to="/casinospil/spillemaskiner/gates-of-olympus" className="text-primary hover:underline font-medium">Gates of Olympus</Link>
              {" "}– Zeus' multiplikator-slot med op til 500× per spin og 96,50 % RTP.
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
              <Link to="/casinospil/spillemaskiner/wanted-dead-or-a-wild" className="text-primary hover:underline font-medium">Wanted Dead or a Wild</Link>
              {" "}– Hacksaw Gamings westernslot med Duel at Dawn og 12.500× max win.
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
              <Link to="/casinospil/spillemaskiner/big-bass-bonanza" className="text-primary hover:underline font-medium">Big Bass Bonanza</Link>
              {" "}– Money Collect-mekanikken fra Pragmatic Play med 96,71 % RTP.
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
              <Link to="/casinospil/spillemaskiner/mega-moolah" className="text-primary hover:underline font-medium">Mega Moolah</Link>
              {" "}– Den progressive jackpot-legende fra Microgaming med milliongevinster.
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Udforsk alle vores dybdegående analyser i{" "}
            <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline font-medium">den komplette spillemaskine-guide</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Ansvarligt Spil */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-primary" />
                Ansvarligt Spil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Online casino skal altid være underholdning – ikke en kilde til stress eller økonomiske problemer. Derfor står{" "}
                <Link to="/ansvarligt-spil" className="text-primary hover:underline font-medium">ansvarligt spil</Link>
                {" "}centralt i alle vores anmeldelser og guides. Vi opfordrer alle spillere til at sætte grænser, holde pauser og aldrig spille for mere, end de har råd til at tabe.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Alle online casinoer på vores liste har dansk licens og tilbyder selvudelukkelse via{" "}
                <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>
                . Har du brug for hjælp, kontakt{" "}
                <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>
                {" "}– en gratis og anonym rådgivningstjeneste.
              </p>
              <p className="text-xs text-muted-foreground">
                18+ | Spil ansvarligt | Annoncering
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Konverteringssektion – Find dit online casino */}
        <section className="mb-12">
          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="py-10 text-center space-y-4">
              <Search className="h-12 w-12 mx-auto text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">Find dit Online Casino i Danmark</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Vi har gjort forarbejdet, så du ikke behøver det. Sammenlign de bedste online casinoer med dansk licens – filtrér efter betalingsmetoder, spiludvalg og udbetalingshastighed, og find præcis det spillested, der passer til dig.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button asChild size="lg" className="gap-2">
                  <a href="#top-casinos">
                    <Trophy className="h-5 w-5" />
                    Sammenlign Casinoer
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="gap-2">
                  <Link to="/top-10-casino-online">
                    <Star className="h-5 w-5" />
                    Se Top 10 Liste
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

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
