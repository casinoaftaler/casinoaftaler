import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { HeroSection } from "@/components/HeroSection";
import { QuickNavSidebar } from "@/components/QuickNavBar";

import { CasinoCard } from "@/components/CasinoCard";
import { BonusTypeCards } from "@/components/BonusTypeCards";
import { FAQSection } from "@/components/FAQSection";
import { FilterTabs } from "@/components/FilterTabs";
import { useCasinos } from "@/hooks/useCasinos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);
  const { data: casinos, isLoading } = useCasinos();

  useEffect(() => {
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
      <SEO
        title="Casinoaftaler – Bedste Casino Bonusser i Danmark 2026"
        description="Sammenlign de bedste online casinoer i Danmark 2026. Find velkomstbonusser, free spins, omsætningskrav og eksklusive tilbud fra casinoer med dansk licens."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Casinoaftaler",
          url: "https://casinoaftaler.dk",
          description: "Din pålidelige kilde til sammenligning af casinobonusser og anmeldelser i Danmark.",
          foundingDate: "2025",
          sameAs: [],
        }}
      />

      <HeroSection />

      {/* Top Casinos Section with sidebar */}
      <section id="top-casinos" className="py-8 md:py-12">
        <div className="container relative">
          {/* Left sidebar - positioned just outside container on xl */}
          <aside className="hidden xl:block absolute right-full top-0 mr-6 w-[200px]">
            <QuickNavSidebar />
          </aside>
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

      <BonusTypeCards />

      {/* === SEO Content Sections === */}
      <div className="container py-8 md:py-12">

        {/* Welcome / About Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Din Guide til Online Casino i Danmark</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Velkommen til <strong>Casinoaftaler</strong> – Danmarks mest komplette ressource for online casino i 2026. Vi gør det lettere, sikrere og mere overskueligt for danske spillere at navigere i junglen af online casinoer. Vores mission er at give dig ærlige vurderinger, gennemsigtige sammenligninger og al den viden, du behøver for at træffe det bedste valg, når du vælger dit næste spillested.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hos os er tillid og gennemsigtighed altafgørende. Vores team af erfarne casinoentusiaster gennemgår og tester hvert casino omhyggeligt, så du kun møder troværdige og underholdende spilleoplevelser. Vi dækker alt fra{" "}
            <Link to="/velkomstbonus" className="text-primary hover:underline font-medium">velkomstbonusser</Link>
            {" "}og{" "}
            <Link to="/omsaetningskrav" className="text-primary hover:underline font-medium">omsætningskrav</Link>
            {" "}til{" "}
            <Link to="/casinospil" className="text-primary hover:underline font-medium">casinospil</Link>
            ,{" "}
            <Link to="/betalingsmetoder" className="text-primary hover:underline font-medium">betalingsmetoder</Link>
            {" "}og kundeservice.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Uanset om du er helt ny i casinoverdenen eller en erfaren spiller, der søger de nyeste bonustilbud og trends, finder du det her. Vi opdaterer løbende vores indhold, så du altid har adgang til de seneste informationer om det danske casinomarked. Vores{" "}
            <Link to="/top-10-casino-online" className="text-primary hover:underline font-medium">top 10 liste over de bedste casinoer</Link>
            {" "}opdateres månedligt baseret på grundige tests og brugerfeedback.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Danmark har et af verdens mest regulerede casinomarkeder, og alle casinoer, vi anbefaler, har gyldig licens fra Spillemyndigheden. Det betyder, at du altid spiller i trygge rammer med adgang til selvudelukkelse via{" "}
            <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>
            {" "}og professionel rådgivning fra{" "}
            <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet</a>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Casino Bonus Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Casino Bonus – Få Mest Muligt ud af Dit Spil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bonusserne er ofte det, der afgør, hvilket casino man vælger. Det kan være svært at have styr på de mange forskellige bonustyper – for ikke at nævne deres vilkår og betingelser. Derfor har vi samlet alt, du behøver at vide, så du kan tage en informeret beslutning og få mest muligt ud af din casinooplevelse. Vores{" "}
            <Link to="/casino-bonus" className="text-primary hover:underline font-medium">komplette bonusguide</Link>
            {" "}dækker alle aspekter af casinobonusser i Danmark.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            En casino bonus er typisk en måde for spillestederne at byde nye spillere velkommen med ekstra midler eller gratis spins, der giver dig mulighed for at udforske casinoet uden at risikere for mange af dine egne penge. Men det er vigtigt at forstå vilkårene – især{" "}
            <Link to="/omsaetningskrav" className="text-primary hover:underline font-medium">omsætningskravene</Link>
            {" "}– før du accepterer en bonus. Vi anbefaler altid at læse om forskellen mellem{" "}
            <Link to="/no-sticky-bonus" className="text-primary hover:underline font-medium">no-sticky bonusser</Link>
            {" "}og{" "}
            <Link to="/sticky-bonus" className="text-primary hover:underline font-medium">sticky bonusser</Link>
            , da det har stor betydning for, hvordan du kan udbetale dine gevinster.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5 text-primary" />
                  <Link to="/velkomstbonus" className="hover:text-primary transition-colors">Velkomstbonus</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Den mest populære bonustype, hvor casinoet matcher din første indbetaling med en procentdel – typisk 100% op til et bestemt beløb. Læs vores komplette{" "}
                  <Link to="/velkomstbonus" className="text-primary hover:underline">guide til velkomstbonusser</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <Link to="/free-spins" className="hover:text-primary transition-colors">Free Spins</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Gratis spins giver dig mulighed for at prøve spilleautomater uden at bruge dine egne penge. Nogle casinoer tilbyder dem helt uden indbetaling. Se vores{" "}
                  <Link to="/free-spins" className="text-primary hover:underline">free spins oversigt</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <Link to="/indskudsbonus" className="hover:text-primary transition-colors">Indskudsbonus</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  En indskudsbonus belønner dig, når du foretager en indbetaling. Casinoet matcher typisk din indbetaling med en bonus. Læs mere om{" "}
                  <Link to="/indskudsbonus" className="text-primary hover:underline">indskudsbonusser og deres vilkår</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="h-5 w-5 text-primary" />
                  <Link to="/bonus-uden-indbetaling" className="hover:text-primary transition-colors">Bonus uden Indbetaling</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Få en bonus helt uden at indbetale – perfekt til at teste et nyt casino risikofrit. Udforsk vores{" "}
                  <Link to="/bonus-uden-indbetaling" className="text-primary hover:underline">guide til bonusser uden indbetaling</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-primary" />
                  <Link to="/bonus-uden-omsaetningskrav" className="hover:text-primary transition-colors">Bonus uden Omsætningskrav</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Bonusser helt uden gennemspilskrav – du kan udbetale dine gevinster med det samme. Se vores{" "}
                  <Link to="/bonus-uden-omsaetningskrav" className="text-primary hover:underline">oversigt over bonusser uden omsætningskrav</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  <Link to="/omsaetningskrav" className="hover:text-primary transition-colors">Omsætningskrav</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Forstå hvordan omsætningskrav fungerer, og lær at vurdere om en bonus reelt er fordelagtig. Læs vores{" "}
                  <Link to="/omsaetningskrav" className="text-primary hover:underline">dybdegående guide til omsætningskrav</Link>.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Betalingsmetoder Section - NEW */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder på Danske Casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Valget af betalingsmetode har stor betydning for din casinooplevelse. Hurtige ind- og udbetalinger er afgørende for en god spilleoplevelse, og i 2026 har danske spillere adgang til et bredt udvalg af sikre og pålidelige betalingsløsninger. Vi har testet og gennemgået alle de mest populære metoder i vores{" "}
            <Link to="/betalingsmetoder" className="text-primary hover:underline font-medium">komplette guide til betalingsmetoder</Link>.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Fra øjeblikkelige mobile betalinger med{" "}
            <Link to="/betalingsmetoder/mobilepay" className="text-primary hover:underline font-medium">MobilePay</Link>
            {" "}til sikre bankoverførsler via{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary hover:underline font-medium">Trustly</Link>
            {" "}– vi dækker fordele, ulemper og behandlingstider for hver enkelt metode, så du kan vælge den løsning, der passer bedst til dine behov.
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
            De fleste danske casinoer tilbyder øjeblikkelige indbetalinger, men udbetalingstider varierer markant afhængigt af metode. E-wallets som{" "}
            <Link to="/betalingsmetoder/skrill" className="text-primary hover:underline font-medium">Skrill</Link>
            {" "}og{" "}
            <Link to="/betalingsmetoder/paypal" className="text-primary hover:underline font-medium">PayPal</Link>
            {" "}tilbyder typisk de hurtigste udbetalinger (0-24 timer), mens{" "}
            <Link to="/betalingsmetoder/bankoverforsler" className="text-primary hover:underline font-medium">bankoverførsler</Link>
            {" "}kan tage 1-3 hverdage. Nye løsninger som{" "}
            <Link to="/betalingsmetoder/revolut" className="text-primary hover:underline font-medium">Revolut</Link>
            {" "}og{" "}
            <Link to="/betalingsmetoder/zimpler" className="text-primary hover:underline font-medium">Zimpler</Link>
            {" "}vinder hurtigt frem blandt danske spillere i 2026.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Spiludviklere Section - NEW */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spiludviklere – Kvaliteten Bag Spillene</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Kvaliteten af din casinooplevelse afhænger i høj grad af de{" "}
            <Link to="/spiludviklere" className="text-primary hover:underline font-medium">spiludviklere</Link>
            , der står bag spillene. Anerkendte udviklere garanterer fair gameplay med certificerede RNG-systemer (Random Number Generator), høj grafisk kvalitet og innovative spilmekanikker. Vi har samlet de førende udbydere, så du ved præcis, hvad du kan forvente.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Fra klassiske slots hos{" "}
            <Link to="/spiludviklere/netent" className="text-primary hover:underline font-medium">NetEnt</Link>
            {" "}og innovative megaways-mekanikker fra{" "}
            <Link to="/spiludviklere/big-time-gaming" className="text-primary hover:underline font-medium">Big Time Gaming</Link>
            {" "}til live casino-oplevelser fra{" "}
            <Link to="/spiludviklere/evolution-gaming" className="text-primary hover:underline font-medium">Evolution Gaming</Link>
            {" "}– hvert studie bringer noget unikt til bordet.
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
            Når du vælger et casino, bør du altid tjekke, hvilke spiludviklere der er repræsenteret i kataloget. Et bredt udvalg af udviklere sikrer, at du har adgang til mange forskellige spiltyper, temaer og volatilitetsniveauer. Læs mere om de enkelte udviklere i vores{" "}
            <Link to="/spiludviklere" className="text-primary hover:underline font-medium">komplette guide til spiludviklere</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Nye Casinoer Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Nye Casinoer i Danmark 2026</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Casinomarkedet i Danmark udvides konstant med nye tilføjelser, og det kan være svært at holde øje med alle de nye spillesteder. Nye casinoer bringer ofte friske perspektiver med sig – fra innovative bonusstrukturer og moderne design til hurtigere betalingsløsninger som{" "}
            <Link to="/betalingsmetoder/mobilepay" className="text-primary hover:underline font-medium">MobilePay</Link>
            {" "}og{" "}
            <Link to="/betalingsmetoder/apple-pay" className="text-primary hover:underline font-medium">Apple Pay</Link>
            {" "}samt unikke spiloplevelser fra innovative udviklere som{" "}
            <Link to="/spiludviklere/hacksaw-gaming" className="text-primary hover:underline font-medium">Hacksaw Gaming</Link>
            {" "}og{" "}
            <Link to="/spiludviklere/nolimit-city" className="text-primary hover:underline font-medium">Nolimit City</Link>.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi holder konstant øje med markedet og tester nye casinoer grundigt, så snart de lancerer med dansk licens. Vores{" "}
            <Link to="/nye-casinoer" className="text-primary hover:underline font-medium">oversigt over nye casinoer</Link>
            {" "}giver dig et komplet overblik, så du nemt kan finde dit næste spillested og drage fordel af de ofte generøse{" "}
            <Link to="/velkomstbonus" className="text-primary hover:underline font-medium">velkomstbonusser</Link>
            , som nye casinoer tilbyder for at tiltrække spillere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Uanset om du leder efter et casino med det nyeste spiludvalg, de hurtigste udbetalinger eller de mest attraktive{" "}
            <Link to="/bonus-uden-omsaetningskrav" className="text-primary hover:underline font-medium">bonusser uden omsætningskrav</Link>
            , hjælper vi dig med at navigere i det stadigt voksende udbud af danske online casinoer.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Casinospil Section - NEW */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Casinospil – Slots, Bordspil og Mere</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Online casinoer tilbyder hundredvis af forskellige{" "}
            <Link to="/casinospil" className="text-primary hover:underline font-medium">casinospil</Link>
            , der dækker alt fra klassiske spilleautomater til avancerede live dealer-spil. Forståelse af de forskellige spilkategorier hjælper dig med at finde de spil, der passer bedst til din spillestil og budget.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Spilleautomater (slots)</strong> er den mest populære kategori med tusindvis af titler fra udviklere som{" "}
            <Link to="/spiludviklere/pragmatic-play" className="text-primary hover:underline font-medium">Pragmatic Play</Link>
            ,{" "}
            <Link to="/spiludviklere/play-n-go" className="text-primary hover:underline font-medium">Play'n GO</Link>
            {" "}og{" "}
            <Link to="/spiludviklere/relax-gaming" className="text-primary hover:underline font-medium">Relax Gaming</Link>
            . RTP (Return to Player) varierer typisk fra 94% til 97%, og volatiliteten afgør, om du foretrækker hyppige små gevinster eller sjældne, men store gevinster.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Bordspil</strong> som blackjack, roulette og baccarat tilbyder lavere husfordel end de fleste slots, hvilket gør dem attraktive for strategiske spillere. I{" "}
            <Link to="/live-casino" className="text-primary hover:underline font-medium">live casino</Link>
            -sektionen kan du spille disse spil med rigtige dealere i realtid, streamet i HD-kvalitet fra professionelle studier hos{" "}
            <Link to="/spiludviklere/evolution-gaming" className="text-primary hover:underline font-medium">Evolution Gaming</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* What We Evaluate */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Sådan Vurderer Vi Online Casinoer</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Vores team gennemgår hvert casino med samme grundighed, uanset om det er et nyt eller etableret spillested. Vi lader os ikke påvirke af partnerskaber – vores vurderinger afspejler altid vores ærlige opfattelse af spillestedets kvalitet. Læs mere om vores metodik på{" "}
            <Link to="/top-10-casino-online" className="text-primary hover:underline font-medium">top 10 casino-listen</Link>
            . Her er de vigtigste faktorer, vi kigger på:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, title: "Licens og Sikkerhed", desc: "Alle casinoer på vores side har gyldig dansk licens fra Spillemyndigheden, SSL-kryptering og er tilsluttet ROFUS." },
              { icon: Star, title: "Bonusvilkår", desc: "Vi gennemgår velkomstbonusser, omsætningskrav, gyldighed og om vilkårene er gennemsigtige og fair for spilleren." },
              { icon: Gamepad2, title: "Spiludvalg", desc: "Fra slots og live casino til bordspil – vi vurderer bredden, kvaliteten og antallet af spiludbydere i kataloget." },
              { icon: CreditCard, title: "Betalingsmetoder", desc: "MobilePay, Trustly, Visa og andre populære metoder. Vi tjekker at ind- og udbetalinger kører hurtigt og sikkert." },
              { icon: Users, title: "Kundeservice", desc: "Vi tester responstider, tilgængelighed og kvaliteten af support via live chat, e-mail og telefon." },
              { icon: TrendingUp, title: "Udbetalingstider", desc: "Ingen vil vente unødigt på gevinster. Vi måler de reelle behandlingstider og sammenligner med markedsgennemsnittet." },
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

        {/* Live Casino */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Live Casino – Den Autentiske Casinooplevelse</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/live-casino" className="text-primary hover:underline font-medium">Live casino</Link>
            {" "}er blevet fast inventar hos ethvert seriøst online casino i Danmark. Den moderne teknologi og høje streaming-kvalitet gør det muligt at opleve den autentiske stemning fra et fysisk casino – direkte fra din stue. Med live dealere, der styrer spil som blackjack, roulette og baccarat i realtid, får du en interaktiv og medrivende spiloplevelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Førende udbydere som{" "}
            <Link to="/spiludviklere/evolution-gaming" className="text-primary hover:underline font-medium">Evolution Gaming</Link>
            {" "}og{" "}
            <Link to="/spiludviklere/pragmatic-play" className="text-primary hover:underline font-medium">Pragmatic Play</Link>
            {" "}Live sætter standarden for live casino med høj billedkvalitet, professionelle dealere og et bredt udvalg af borde med forskellige indsatsniveauer. Uanset om du foretrækker klassisk blackjack, speed roulette eller innovative game shows som Crazy Time og Monopoly Live, finder du det hos de casinoer, vi anbefaler.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            De fleste{" "}
            <Link to="/nye-casinoer" className="text-primary hover:underline font-medium">nye casinoer</Link>
            {" "}satser stort på live casino-sektionen, og mange tilbyder endda separate{" "}
            <Link to="/velkomstbonus" className="text-primary hover:underline font-medium">velkomstbonusser</Link>
            {" "}til live casino-spil. Indbetalinger via{" "}
            <Link to="/betalingsmetoder/mobilepay" className="text-primary hover:underline font-medium">MobilePay</Link>
            {" "}eller{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary hover:underline font-medium">Trustly</Link>
            {" "}gør det nemt at komme i gang med det samme.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Trends 2026 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Casino-trends i Danmark 2026</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Det danske casinomarked er i konstant udvikling. Her er de vigtigste trends, vi ser i 2026, som former fremtidens online casino-oplevelse:
          </p>
          <div className="space-y-3">
            {[
              { title: "Personlige bonustilbud", desc: "Casinoer bruger spilleradfærd og data til at skræddersy bonusser, der passer til den enkelte. Det betyder mere relevante tilbud og bedre værdi for dig." },
              { title: "Øjeblikkelige betalinger", desc: "MobilePay, Trustly og Apple Pay gør ind- og udbetalinger øjeblikkelige. Nye løsninger som Revolut og Zimpler vinder også frem." },
              { title: "Gamification og belønningsprogrammer", desc: "Missioner, achievements og loyalitetsprogrammer gør spiloplevelsen mere engagerende og giver dig ekstra værdi for dit spil." },
              { title: "Mobil-first design", desc: "Nye platforme designes med mobilen i centrum – fuldt optimeret til smartphones og tablets med hurtig loading og intuitive menuer." },
              { title: "Cashback uden omsætningskrav", desc: "Flere casinoer tilbyder cashback-bonusser helt uden gennemspilskrav – en trend der kun vokser i popularitet." },
              { title: "Udvidet live casino", desc: "Live dealer-sektioner vokser med nye spiltyper, game shows og interaktive funktioner fra Evolution Gaming og andre." },
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

        {/* Casino Anmeldelser - NEW */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Casino Anmeldelser – Dybdegående og Ærlige</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi anmelder hvert casino grundigt med fokus på de faktorer, der virkelig betyder noget for danske spillere. Vores anmeldelser dækker alt fra bonusvilkår og spiludvalg til{" "}
            <Link to="/betalingsmetoder" className="text-primary hover:underline font-medium">betalingsmetoder</Link>
            {" "}og udbetalingstider. Her er nogle af vores seneste anmeldelser:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: "Spilleautomaten", to: "/spilleautomaten-anmeldelse" },
              { name: "Campobet", to: "/campobet-anmeldelse" },
              { name: "Betinia", to: "/betinia-anmeldelse" },
              { name: "Swift Casino", to: "/swift-casino-anmeldelse" },
              { name: "Luna Casino", to: "/luna-casino-anmeldelse" },
              { name: "SpilDanskNu", to: "/spildansknu-anmeldelse" },
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
        </section>

        <Separator className="my-10" />

        {/* Gennemsigtighed */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Gennemsigtighed og Troværdighed</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hos Casinoaftaler tror vi på fuld gennemsigtighed over for vores brugere. Vi arbejder hårdt for at give dig præcis og opdateret information om online casinoer, bonusser og spilrelaterede emner. Her forklarer vi, hvordan vores partnerskaber fungerer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi er en gratis ressource for alle brugere. Vi tjener penge gennem affiliate-partnerskaber med nogle af de casinoer, vi anmelder og anbefaler. Når du klikker på et link og registrerer dig, modtager vi en provision. Denne provision påvirker aldrig din oplevelse og koster dig ikke ekstra. Læs mere{" "}
            <Link to="/about" className="text-primary hover:underline font-medium">om os</Link>
            {" "}eller{" "}
            <Link to="/contact" className="text-primary hover:underline font-medium">kontakt os</Link>
            {" "}med spørgsmål.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Selvom vi har partnerskaber, er vi forpligtede til at levere ærlige og uvildige vurderinger. Vores team tester hvert casino grundigt baseret på kriterier som licens, spiludvalg, bonusser,{" "}
            <Link to="/betalingsmetoder" className="text-primary hover:underline font-medium">betalingsmetoder</Link>
            , kundeservice og brugeroplevelse. Vi samarbejder kun med casinoer, der er licenserede, pålidelige og overholder standarder for{" "}
            <Link to="/ansvarligt-spil" className="text-primary hover:underline font-medium">ansvarligt spil</Link>.
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
                Online spil skal altid være en kilde til underholdning – ikke en årsag til stress eller økonomiske bekymringer. Hos Casinoaftaler er vi dybt engagerede i at fremme{" "}
                <Link to="/ansvarligt-spil" className="text-primary hover:underline font-medium">ansvarligt spil</Link>
                . Vi opfordrer alle spillere til at sætte grænser, holde pauser og aldrig spille for mere, end de har råd til at tabe.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Alle casinoer på vores liste har dansk licens og tilbyder selvudelukkelsesmuligheder via{" "}
                <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>
                . Har du brug for hjælp eller rådgivning, kan du kontakte{" "}
                <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>
                {" "}– en gratis og anonym rådgivningstjeneste for spilleproblemer.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Hvis du oplever, at dine spillevaner bliver uholdbare, anbefaler vi at benytte de værktøjer, som alle danske casinoer tilbyder: indbetalingsgrænser, tabsgrænser, sessionsgrænser og perioder med selvudelukkelse. Det vigtigste er, at du altid har kontrol over dit spil.
              </p>
              <p className="text-xs text-muted-foreground">
                18+ | Spil ansvarligt | Annoncering
              </p>
            </CardContent>
          </Card>
        </section>

        <FAQSection title="Ofte stillede spørgsmål om online casino i Danmark" faqs={[
          {
            question: "Hvad er det vigtigste at vide, før man spiller online casino i Danmark?",
            answer: "Det allervigtigste er at vælge et casino med gyldig dansk licens fra Spillemyndigheden. Licensen sikrer, at casinoet overholder strenge krav til spillerbeskyttelse, herunder tilslutning til ROFUS (Register Over Frivilligt Udelukkede Spillere), krypteret dataoverførsel via SSL og maksimalt omsætningskrav på 10x. Danske casinoer bruger MitID til registrering, hvilket forhindrer mindreårige i at spille og eliminerer langvarig dokumentverifikation. Gevinster fra licenserede casinoer er desuden skattefri i Danmark – du beholder hele beløbet. Vi anbefaler altid at sætte et budget og bruge casinoets indbetalingsgrænser, før du starter.",
          },
          {
            question: "Hvordan finder jeg det bedste casino til mine behov?",
            answer: "Start med at definere, hvad der er vigtigst for dig: Er det bonusstørrelse, spiludvalg, udbetalingshastighed eller betalingsmetoder? Sammenlign velkomstbonusser og deres omsætningskrav – et lavt krav på 10x er markant bedre end 40x. Tjek om casinoet tilbyder dine foretrukne betalingsmetoder som MobilePay eller Trustly, og undersøg udbetalingstider. Vi tester hvert casino grundigt og vurderer det ud fra bonus, spiludvalg, betalingsmetoder, kundeservice, mobiloplevelse og sikkerhed. Vores topliste opdateres løbende, så du altid finder de aktuelt bedste muligheder.",
          },
          {
            question: "Hvad er forskellen på en velkomstbonus og free spins?",
            answer: "En velkomstbonus matcher typisk din første indbetaling med en procentdel – fx 100 % op til 1.000 kr. – så du får ekstra spillemidler. Free spins er gratis runder på udvalgte spilleautomater, ofte 50–200 spins, enten som del af en velkomstpakke eller som selvstændig bonus. Begge bonustyper har omsætningskrav, men free spins-gevinster har ofte separate vilkår med maksimal gevinst. No-sticky bonusser er særligt fordelagtige, da dine egne penge altid er tilgængelige for udbetaling. Bonus uden indbetaling giver dig mulighed for at prøve et casino helt risikofrit.",
          },
          {
            question: "Er online casinoer i Danmark sikre og regulerede?",
            answer: "Ja, det danske marked er et af de mest strengt regulerede i Europa. Spillemyndigheden udsteder licenser og fører løbende tilsyn med alle licenserede operatører. Casinoerne skal dokumentere fair spil via certificerede tilfældighedsgeneratorer (RNG), implementere anti-hvidvask-procedurer og tilbyde selvudelukkelsesværktøjer. ROFUS-systemet giver dig mulighed for at udelukke dig selv fra alle danske spillesider med ét klik. Indbetalingsgrænser, sessionstidsadvarsler og links til hjælpeorganisationer som StopSpillet er påkrævet på alle platforme. Vi anbefaler kun casinoer, der lever op til disse standarder.",
          },
          {
            question: "Skal jeg betale skat af casinogevinster i Danmark?",
            answer: "Nej, alle gevinster fra online casinoer med gyldig dansk licens fra Spillemyndigheden er 100 % skattefri for spilleren. Det gælder uanset gevinstens størrelse – om det er 500 kr. eller 5 millioner kr. Skatten er allerede betalt af casinooperatøren via deres licensafgift. Det er en af de vigtigste fordele ved at spille hos licenserede danske casinoer frem for udenlandske sider uden dansk licens. Vær opmærksom på, at gevinster fra casinoer uden dansk licens teknisk set er skattepligtige, og at du mister al spillerbeskyttelse ved at spille på ulicenserede platforme.",
          },
          {
            question: "Hvilke casinospil giver de bedste vinderchancer?",
            answer: "Blackjack har den laveste house edge (ned til 0,5 % med optimal strategi), efterfulgt af baccarat (ca. 1,06 % på banker-bet) og visse video poker-varianter (op til 99,5 % RTP). Blandt spilleautomater varierer RTP fra 88 % (progressive jackpots som Mega Moolah) til 97 %+ (mange moderne video slots). Højere RTP betyder bedre langsigtede chancer, men husk at volatilitet også spiller en rolle: lav volatilitet giver hyppige mindre gevinster, mens høj volatilitet giver sjældnere, men potentielt større gevinster. Tjek altid RTP og volatilitet, før du vælger et spil.",
          },
        ]} />
      </div>
    </>
  );
};

export default Index;
