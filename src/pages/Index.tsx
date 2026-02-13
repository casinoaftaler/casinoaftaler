import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { HeroSection } from "@/components/HeroSection";
import { SpillehalPromoSection } from "@/components/SpillehalPromoSection";
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

      <SpillehalPromoSection />
      <BonusTypeCards />

      {/* === SEO Content Sections === */}
      <div className="container py-8 md:py-12">

        {/* Welcome / About Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Din Guide til Online Casino i Danmark</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Velkommen til Casinoaftaler – dit samlingspunkt for alt inden for online casino i Danmark. Vi gør det lettere, sikrere og mere overskueligt for danske spillere at navigere i junglen af online casinoer. Vores mission er at give dig ærlige vurderinger, gennemsigtige sammenligninger og al den viden, du behøver for at træffe det bedste valg, når du vælger dit næste spillested.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hos os er tillid og gennemsigtighed altafgørende. Vores team af erfarne casinoentusiaster gennemgår og tester hvert casino omhyggeligt, så du kun møder troværdige og underholdende spilleoplevelser. Vi dækker alt fra velkomstbonusser og{" "}
            <Link to="/omsaetningskrav" className="text-primary hover:underline font-medium">omsætningskrav</Link>
            {" "}til spiludvalg, betalingsmetoder og kundeservice.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Uanset om du er helt ny i casinoverdenen eller en erfaren spiller, der søger de nyeste bonustilbud og trends, finder du det her. Vi opdaterer løbende vores indhold, så du altid har adgang til de seneste informationer om det danske casinomarked.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Casino Bonus Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Casino Bonus – Få Mest Muligt ud af Dit Spil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bonusserne er ofte det, der afgør, hvilket casino man vælger. Det kan være svært at have styr på de mange forskellige bonustyper – for ikke at nævne deres vilkår og betingelser. Derfor har vi samlet alt, du behøver at vide, så du kan tage en informeret beslutning og få mest muligt ud af din casinooplevelse.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            En casino bonus er typisk en måde for spillestederne at byde nye spillere velkommen med ekstra midler eller gratis spins, der giver dig mulighed for at udforske casinoet uden at risikere for mange af dine egne penge. Men det er vigtigt at forstå vilkårene – især{" "}
            <Link to="/omsaetningskrav" className="text-primary hover:underline font-medium">omsætningskravene</Link>
            {" "}– før du accepterer en bonus.
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

        {/* Nye Casinoer Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Nye Casinoer i Danmark</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Casinomarkedet i Danmark udvides konstant med nye tilføjelser, og det kan være svært at holde øje med alle de nye spillesteder. Nye casinoer bringer ofte friske perspektiver med sig – fra innovative bonusstrukturer og moderne design til hurtigere betalingsløsninger og unikke spiloplevelser.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi holder konstant øje med markedet og tester nye casinoer grundigt, så snart de lancerer med dansk licens. Vores{" "}
            <Link to="/nye-casinoer" className="text-primary hover:underline font-medium">oversigt over nye casinoer</Link>
            {" "}giver dig et komplet overblik, så du nemt kan finde dit næste spillested og drage fordel af de ofte generøse velkomstbonusser, som nye casinoer tilbyder for at tiltrække spillere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Uanset om du leder efter et casino med det nyeste spiludvalg, de hurtigste udbetalinger eller de mest attraktive bonusser, hjælper vi dig med at navigere i det stadigt voksende udbud af danske online casinoer.
          </p>
        </section>

        <Separator className="my-10" />

        {/* What We Evaluate */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Sådan Vurderer Vi Online Casinoer</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Vores team gennemgår hvert casino med samme grundighed, uanset om det er et nyt eller etableret spillested. Vi lader os ikke påvirke af partnerskaber – vores vurderinger afspejler altid vores ærlige opfattelse af spillestedets kvalitet. Her er de vigtigste faktorer, vi kigger på:
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

        {/* Betalingsmetoder & Spiludviklere */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder og Spiludviklere</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Et godt online casino skal tilbyde et bredt udvalg af sikre og hurtige betalingsmetoder. De mest populære metoder blandt danske spillere inkluderer MobilePay, Trustly, Visa og bankoverførsler. Vi har samlet en komplet{" "}
            <Link to="/betalingsmetoder" className="text-primary hover:underline font-medium">guide til betalingsmetoder</Link>
            {" "}på danske casinoer, hvor du kan lære om fordele, ulemper og behandlingstider for hver metode.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Kvaliteten af spillene afhænger i høj grad af de udviklere, der står bag dem. Anerkendte{" "}
            <Link to="/spiludviklere" className="text-primary hover:underline font-medium">spiludviklere</Link>
            {" "}som NetEnt, Play'n GO, Pragmatic Play og Evolution Gaming sikrer høj grafisk kvalitet, fair RTP-procenter og innovative spilmekanikker. Vi gennemgår de førende udbydere, så du ved præcis, hvad du kan forvente af dine yndlingsspil.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Kombinationen af pålidelige betalingsløsninger og kvalitetsspil fra anerkendte udviklere er det, der kendetegner de bedste online casinoer. Vi hjælper dig med at finde dem, der lever op til begge kriterier.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Live Casino */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Live Casino – Den Autentiske Casinooplevelse</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Live casino er blevet fast inventar hos ethvert seriøst online casino i Danmark. Den moderne teknologi og høje streaming-kvalitet gør det muligt at opleve den autentiske stemning fra et fysisk casino – direkte fra din stue. Med live dealere, der styrer spil som blackjack, roulette og baccarat i realtid, får du en interaktiv og medrivende spiloplevelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Førende udbydere som Evolution Gaming og Pragmatic Play Live sætter standarden for live casino med høj billedkvalitet, professionelle dealere og et bredt udvalg af borde med forskellige indsatsniveauer. Uanset om du foretrækker klassisk blackjack, speed roulette eller innovative game shows som Crazy Time og Monopoly Live, finder du det hos de casinoer, vi anbefaler.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            De fleste nye casinoer satser stort på live casino-sektionen, og mange tilbyder endda separate velkomstbonusser til live casino-spil. Læs vores{" "}
            <Link to="/live-casino" className="text-primary hover:underline font-medium">komplette guide til live casino</Link>
            {" "}eller tjek vores{" "}
            <Link to="/nye-casinoer" className="text-primary hover:underline font-medium">oversigt over nye casinoer</Link>
            {" "}for at finde de bedste live casino-oplevelser.
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
              { title: "Hurtigere betalinger med MobilePay", desc: "Øjeblikkelige ind- og udbetalinger via MobilePay og Trustly bliver standarden. Læs mere om betalingsmetoder i vores guide." },
              { title: "Gamification og belønningsprogrammer", desc: "Missioner, achievements og loyalitetsprogrammer gør spiloplevelsen mere engagerende og giver dig ekstra værdi for dit spil." },
              { title: "Mobil-first design", desc: "Nye platforme designes med mobilen i centrum – fuldt optimeret til smartphones og tablets med hurtig loading og intuitive menuer." },
              { title: "Cashback uden omsætningskrav", desc: "Flere casinoer tilbyder cashback-bonusser helt uden gennemspilskrav. Læs om denne trend i vores guide til bonusser uden omsætningskrav." },
              { title: "Udvidet live casino", desc: "Live dealer-sektioner vokser med nye spiltyper, game shows og interaktive funktioner, der bringer casinooplevelsen tættere på virkeligheden." },
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
            Hos Casinoaftaler tror vi på fuld gennemsigtighed over for vores brugere. Vi arbejder hårdt for at give dig præcis og opdateret information om online casinoer, bonusser og spilrelaterede emner. Her forklarer vi, hvordan vores partnerskaber fungerer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi er en gratis ressource for alle brugere. Vi tjener penge gennem affiliate-partnerskaber med nogle af de casinoer, vi anmelder og anbefaler. Når du klikker på et link og registrerer dig, modtager vi en provision. Denne provision påvirker aldrig din oplevelse og koster dig ikke ekstra.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Selvom vi har partnerskaber, er vi forpligtede til at levere ærlige og uvildige vurderinger. Vores team tester hvert casino grundigt baseret på kriterier som licens, spiludvalg, bonusser, betalingsmetoder, kundeservice og brugeroplevelse. Vi samarbejder kun med casinoer, der er licenserede, pålidelige og overholder standarder for ansvarligt spil.
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

      </div>

      <FAQSection />
    </>
  );
};

export default Index;
