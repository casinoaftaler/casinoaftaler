import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { CasinoCard } from "@/components/CasinoCard";
import { useCasinos } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import casinoAnmeldelserHero from "@/assets/heroes/casino-anmeldelser-hero.jpg";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShieldCheck,
  Star,
  CreditCard,
  Gift,
  Trophy,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Zap,
  Target,
  Users,
  Tv,
  Gamepad2,
  Award,
  ThumbsUp,
  ThumbsDown,
  Search,
  User,
  CalendarDays,
  Loader2,
} from "lucide-react";

const reviewSlugs = [
  "spilleautomaten",
  "spildansknu",
  "campobet",
  "betinia",
  "swift-casino",
  "luna-casino",
];

const faqs = [
  {
    question: "Hvad indgår i jeres evalueringsproces, når I anmelder et dansk casino?",
    answer: (
      <>
        Vores anmeldelsesproces strækker sig over minimum 2 uger, hvor vi tester hvert casino med rigtige penge. Vi evaluerer seks kerneparametre: 1) Licens og sikkerhed – vi verificerer dansk licens fra Spillemyndigheden og kontrollerer SSL-kryptering og ROFUS-tilslutning. 2){" "}
        <Link to="/casino-bonus" className="text-primary underline hover:text-primary/80">Bonusvilkår</Link> – vi analyserer velkomstbonus,{" "}
        <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link>, bonustype (no-sticky vs. sticky) og spilbidrag. 3) Spiludvalg – antal titler,{" "}
        <Link to="/spiludviklere" className="text-primary underline hover:text-primary/80">udviklere</Link> og gennemsnitlig RTP. 4){" "}
        <Link to="/betalingsmetoder" className="text-primary underline hover:text-primary/80">Betalingsmetoder</Link> og udbetalingshastighed. 5) Kundeservice – tilgængelighed, svartider og danske sprogmuligheder. 6) Mobiloplevelse og design.
      </>
    ),
  },
  {
    question: "Hvordan sikrer I, at anmeldelserne forbliver objektive trods affiliate-samarbejde?",
    answer:
      "Vi er transparente om, at vi modtager provision via affiliate-links, men dette påvirker aldrig vores vurdering eller rangering. Vores redaktionelle retningslinjer er klare: ingen operatør kan betale for en bedre placering eller mere favorabel anmeldelse. Vi har afvist casinoer med høje provisioner, fordi de ikke levede op til vores kvalitetskrav – og vi har anbefalet casinoer med lavere provision, fordi de tilbød bedre vilkår for spillerne. Vores rangering baseres udelukkende på de seks evalueringsparametre, og vi offentliggør vores metodik. Denne uafhængighed er fundamentet for vores troværdighed.",
  },
  {
    question: "Hvad er den reelle forskel på No-Sticky og Sticky bonusser i praksis?",
    answer: (
      <>
        Forskellen er afgørende for din spilleoplevelse. Med en{" "}
        <Link to="/no-sticky-bonus" className="text-primary underline hover:text-primary/80">No-Sticky bonus</Link> spiller du altid med egne penge først. Vinder du 5.000 kr. med din egen indbetaling, kan du hæve beløbet med det samme – bonusmidlerne forsvinder simpelthen. Med en{" "}
        <Link to="/sticky-bonus" className="text-primary underline hover:text-primary/80">Sticky bonus</Link> blandes dine penge og bonussen i én saldo, og du kan intet hæve, før hele omsætningskravet er opfyldt. Statistisk set giver no-sticky en markant bedre forventet værdi, da du bevarer friheden til at stoppe, når du er foran. Vi anbefaler altid no-sticky bonusser og markerer bonustypen tydeligt i hver anmeldelse.
      </>
    ),
  },
  {
    question: "Hvor ofte opdaterer I anmeldelserne, og hvad trigger en opdatering?",
    answer:
      "Alle anmeldelser gennemgås systematisk minimum hvert kvartal, men vi opdaterer også ad hoc ved væsentlige ændringer. Triggers for øjeblikkelig opdatering inkluderer: ændrede bonusvilkår (beløb, omsætningskrav, gyldighed), nye eller fjernede betalingsmetoder, ændringer i licensstatus, markante udvidelser eller reduktioner i spiludvalget, og ændrede udbetalingstider. Vi monitorerer også spillerfeedback og klager via Spillemyndigheden. Datoen for seneste opdatering vises øverst på hver anmeldelse, så du altid ved, hvor aktuel informationen er.",
  },
  {
    question: "Hvad er de vigtigste advarsler, man bør kende, før man vælger et nyt casino?",
    answer: (
      <>
        De hyppigste faldgruber for danske spillere er: 1) Bonusser med skjulte begrænsninger – nogle casinoer har lave maksgevinster på bonusmidler (fx 5.000 kr.), selvom bonussen selv er stor. 2) Udbetalingsgrænser – visse casinoer har daglige eller ugentlige lofter, der kan forsinke store gevinster. 3) Manglende spilbidrag – tjek altid om dine foretrukne spil bidrager fuldt til{" "}
        <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskravet</Link>. 4) Kundeservice kun på engelsk. 5) Høje minimumsudbetalinger (nogle kræver 200+ kr.). Vi fremhæver alle disse faktorer i vores anmeldelser under fordele og ulemper.
      </>
    ),
  },
  {
    question: "Hvordan vurderer I et casinos spiludvalg og RTP-niveauer?",
    answer: (
      <>
        Vi analyserer både bredden og kvaliteten af spiludvalget. Et topscorende casino bør have 1.500+ titler fra minimum 15{" "}
        <Link to="/spiludviklere" className="text-primary underline hover:text-primary/80">anerkendte udviklere</Link>, herunder brancheledere som NetEnt, Pragmatic Play og Evolution Gaming. Vi tjekker gennemsnitlige RTP-niveauer – et godt casino tilbyder hovedsageligt spil med 95 %+ RTP. Vi evaluerer også{" "}
        <Link to="/live-casino" className="text-primary underline hover:text-primary/80">live casino</Link>-sektionens dybde, tilgængeligheden af progressive jackpots og om casinoet tilføjer nye spil regelmæssigt. Søge- og filtreringsfunktionalitet vægtes også – det bør være nemt at finde spil efter kategori, udbyder og popularitet.
      </>
    ),
  },
];

const linkClass = "text-primary underline hover:text-primary/80";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: typeof faq.answer === "string" ? faq.answer : faq.question },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Forside", item: "https://casinoaftaler.dk/" },
    { "@type": "ListItem", position: 2, name: "Casino Anmeldelser", item: "https://casinoaftaler.dk/casino-anmeldelser" },
  ],
};

const CasinoAnmeldelser = () => {
  const { data: casinos, isLoading } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);
  const heroBackgroundImage = siteSettings?.hero_background;

  const reviewCasinos = (casinos ?? []).filter((c) => reviewSlugs.includes(c.slug));

  const mapCasino = (casino: (typeof reviewCasinos)[0]) => ({
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
        title="Casino Anmeldelser 2026 – Ærlige & Dybdegående Reviews | Casinoaftaler"
        description="Læs vores dybdegående casino anmeldelser af de bedste danske online casinoer. Uafhængige reviews med fokus på bonusvilkår, spiludvalg, betalingsmetoder og sikkerhed. Opdateret 2026."
        jsonLd={[faqJsonLd, breadcrumbJsonLd]}
      />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Star className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Casino Anmeldelser 2026
            </h1>
            <p className="text-lg text-white/80">
              Dybdegående og ærlige anmeldelser af de bedste danske online casinoer.
              Vi tester bonusser, spiludvalg, betalingsmetoder og kundeservice, så
              du kan træffe det rigtige valg.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="14-02-2026" readTime="18 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={casinoAnmeldelserHero} alt="Casino anmeldelser – dokumenter og ratings" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan finder du det bedste online casino i Danmark
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            At vælge det rigtige online casino kan virke overvældende. Med et stigende antal{" "}
            <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link> på det danske marked er det vigtigere end nogensinde at have adgang til grundige, uafhængige anmeldelser. Hos Casinoaftaler gennemgår vi hvert casino minutiøst – fra{" "}
            <Link to="/casino-bonus" className={linkClass}>casinobonusser</Link> og{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> til{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>,{" "}
            <Link to="/casinospil" className={linkClass}>spiludvalg</Link> og kundeservice.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle casinoer vi anmelder har en gyldig dansk spillelicens fra Spillemyndigheden, hvilket garanterer, at de overholder strenge krav til spillerbeskyttelse,{" "}
            <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link> og datasikkerhed. Vi anbefaler kun casinoer, der lever op til vores høje standarder for kvalitet og fairness.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vores eksperter spiller selv på hvert casino, tester{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>, verificerer udbetalingstider og kontakter kundeservice for at sikre, at du får den mest præcise og aktuelle information. Uanset om du foretrækker{" "}
            <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonusser</Link>,{" "}
            <Link to="/free-spins" className={linkClass}>free spins</Link> eller{" "}
            <Link to="/bonus-uden-indbetaling" className={linkClass}>bonus uden indbetaling</Link>, har vi en anmeldelse, der hjælper dig med at finde det perfekte match.
          </p>
        </section>

        {/* Casino Cards from DB */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Alle Casino Anmeldelser</h2>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : reviewCasinos.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              Ingen casino anmeldelser tilgængelige i øjeblikket.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                {reviewCasinos.slice(0, 2).map((casino, index) => (
                  <CasinoCard
                    key={casino.id}
                    casino={mapCasino(casino)}
                    rank={index + 1}
                    open={openCasinoId === casino.id}
                    onOpenChange={(open) =>
                      setOpenCasinoId(open ? casino.id : null)
                    }
                  />
                ))}
              </div>
              {reviewCasinos.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  {reviewCasinos.slice(2).map((casino, index) => (
                    <CasinoCard
                      key={casino.id}
                      casino={mapCasino(casino)}
                      rank={index + 3}
                      open={openCasinoId === casino.id}
                      onOpenChange={(open) =>
                        setOpenCasinoId(open ? casino.id : null)
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        <Separator className="my-10" />

        {/* Dybdegående guider til hvert casino */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Dybdegående anmeldelser af hvert casino</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Udforsk vores komplette anmeldelser af de bedste danske online casinoer. Hver anmeldelse dækker{" "}
            <Link to="/casino-bonus" className={linkClass}>bonusvilkår</Link>,{" "}
            <Link to="/spiludviklere" className={linkClass}>spiludvalg</Link>,{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>, udbetalingstider, kundeservice og sikkerhed – alt hvad du behøver for at træffe det rigtige valg.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Danske Spil Casino", slug: "casino-anmeldelser/danske-spil", highlight: "Danmarks største spiludbyder" },
              { name: "LeoVegas", slug: "casino-anmeldelser/leovegas", highlight: "Mobilvenligt & prisbelønnet" },
              { name: "Mr Green", slug: "casino-anmeldelser/mr-green", highlight: "Green Gaming & ansvarligt spil" },
              { name: "Unibet", slug: "casino-anmeldelser/unibet", highlight: "Sports + Casino i ét" },
              { name: "bet365", slug: "casino-anmeldelser/bet365", highlight: "Verdens største sportsbook" },
              { name: "Betano", slug: "casino-anmeldelser/betano", highlight: "Kaizen Gaming & innovation" },
              { name: "888 Casino", slug: "casino-anmeldelser/888-casino", highlight: "25+ års erfaring" },
              { name: "Expekt", slug: "casino-anmeldelser/expekt", highlight: "Betsson Group – Sports & Casino" },
              { name: "ComeOn Casino", slug: "casino-anmeldelser/comeon", highlight: "Skandinavisk favorit" },
              { name: "GetLucky Casino", slug: "casino-anmeldelser/getlucky", highlight: "4.000+ spil & loyalty" },
              { name: "Mr Vegas Casino", slug: "casino-anmeldelser/mr-vegas", highlight: "Betsson Group – casino-fokus" },
              { name: "Videoslots", slug: "casino-anmeldelser/videoslots", highlight: "11.000+ spil & Battle of Slots" },
              { name: "Royal Casino", slug: "casino-anmeldelser/royal-casino", highlight: "Dansk Jysk Væddeløbsbane" },
              { name: "Maria Casino", slug: "casino-anmeldelser/maria-casino", highlight: "Kindred Group & bingo" },
              { name: "NordicBet", slug: "casino-anmeldelser/nordicbet", highlight: "Nordisk fokus & sportsbetting" },
              { name: "Kapow Casino", slug: "casino-anmeldelser/kapow-casino", highlight: "Nyt dansk casino" },
              { name: "One Casino", slug: "casino-anmeldelser/one-casino", highlight: "Bonus uden omsætning" },
              { name: "Spilnu", slug: "casino-anmeldelser/spilnu", highlight: "Dansk casino med fokus" },
              { name: "PokerStars", slug: "casino-anmeldelser/pokerstars", highlight: "Verdens største pokerrum" },
              { name: "bwin", slug: "casino-anmeldelser/bwin", highlight: "Entain Group – sport & casino" },
              { name: "MarathonBet", slug: "casino-anmeldelser/marathonbet", highlight: "Konkurrencedygtige odds" },
              { name: "Casinostuen", slug: "casino-anmeldelser/casinostuen", highlight: "Dansk nichefokus" },
              { name: "Stake Casino", slug: "casino-anmeldelser/stake-casino", highlight: "Crypto & coming soon" },
              { name: "SpilDanskNu", slug: "spildansknu-anmeldelse", highlight: "No-Sticky bonus & dansk fokus" },
              { name: "Spilleautomaten", slug: "spilleautomaten-anmeldelse", highlight: "2.500+ spil & 10x omsætning" },
              { name: "Betinia", slug: "betinia-anmeldelse", highlight: "40+ udbydere & akkumulatorboost" },
              { name: "Swift Casino", slug: "swift-casino-anmeldelse", highlight: "Hot Or Cold & 3.300+ spil" },
              { name: "Campobet", slug: "campobet-anmeldelse", highlight: "Casino + sportsbetting i ét" },
              { name: "Luna Casino", slug: "luna-casino-anmeldelse", highlight: "VIP-program & 50 free spins" },
            ].map((review) => (
              <Card key={review.slug} className="group relative border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Star className="h-4 w-4 text-primary" />
                    {review.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline" className="text-xs">{review.highlight}</Badge>
                    <Link
                      to={`/${review.slug}`}
                      className="text-sm font-medium text-primary underline hover:text-primary/80 whitespace-nowrap"
                    >
                      Læs →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <InlineCasinoCards title="Anbefalede Casinoer" />

        <Separator className="my-10" />
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvad gør en god casino anmeldelse? – Den komplette guide
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            En casino anmeldelse er din vigtigste ressource, når du skal vælge et nyt online casino. Men ikke alle anmeldelser er skabt lige. Her gennemgår vi, hvad du bør forvente af en grundig og troværdig casino anmeldelse, og hvorfor det er afgørende at læse én, før du opretter en konto og indbetaler penge.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Bonusvilkår */}
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="h-5 w-5 text-primary" />
                  1. Bonusvilkår og velkomstbonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
                  Det første de fleste spillere kigger efter er{" "}
                  <Link to="/casino-bonus" className={linkClass}>casinobonussen</Link>. Men en stor bonus er ikke nødvendigvis en god bonus. Det er vilkårene, der afgør, om bonussen reelt er værd at aktivere.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                  <li><strong className="text-foreground">Bonusstørrelse:</strong> De fleste tilbyder en{" "}<Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> på 100% op til 500-2.000 kr.</li>
                  <li><strong className="text-foreground">Omsætningskrav:</strong>{" "}<Link to="/omsaetningskrav" className={linkClass}>Omsætningskrav</Link> fra 10x til 40x+</li>
                  <li><strong className="text-foreground">Bonustype:</strong>{" "}<Link to="/no-sticky-bonus" className={linkClass}>No-Sticky</Link> vs.{" "}<Link to="/sticky-bonus" className={linkClass}>Sticky bonus</Link></li>
                  <li><strong className="text-foreground">Free spins:</strong>{" "}<Link to="/free-spins" className={linkClass}>Free spins</Link> på udvalgte spilleautomater</li>
                  <li><strong className="text-foreground">Uden indbetaling:</strong>{" "}<Link to="/bonus-uden-indbetaling" className={linkClass}>Bonus uden indbetaling</Link></li>
                  <li><strong className="text-foreground">Uden omsætning:</strong>{" "}<Link to="/bonus-uden-omsaetningskrav" className={linkClass}>Bonusser uden omsætningskrav</Link></li>
                </ul>
              </CardContent>
            </Card>

            {/* 2. Spiludvalg */}
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  2. Spiludvalg og spiludbydere
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
                  Vi vurderer bredden og kvaliteten af{" "}
                  <Link to="/casinospil" className={linkClass}>casinospil</Link> fra anerkendte{" "}
                  <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link>. Et godt casino bør tilbyde 1.500-2.000+ spil fra 20-30 udbydere.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                  <li><Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link> – Starburst og Gonzo's Quest</li>
                  <li><Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> – Sweet Bonanza og The Dog House</li>
                  <li><Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> – Førende inden for{" "}<Link to="/live-casino" className={linkClass}>live casino</Link></li>
                  <li><Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link> – Book of Dead og Reactoonz</li>
                  <li><Link to="/spiludviklere/hacksaw-gaming" className={linkClass}>Hacksaw Gaming</Link>,{" "}<Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link>,{" "}<Link to="/spiludviklere/relax-gaming" className={linkClass}>Relax Gaming</Link></li>
                  <li><Link to="/spiludviklere/yggdrasil" className={linkClass}>Yggdrasil</Link>,{" "}<Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link>,{" "}<Link to="/spiludviklere/elk-studios" className={linkClass}>ELK Studios</Link>,{" "}<Link to="/spiludviklere/red-tiger" className={linkClass}>Red Tiger</Link>,{" "}<Link to="/spiludviklere/big-time-gaming" className={linkClass}>Big Time Gaming</Link></li>
                </ul>
              </CardContent>
            </Card>

            {/* 3. Betalingsmetoder */}
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  3. Betalingsmetoder og udbetalingstider
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
                  Hurtige og sikre{" "}
                  <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> er essentielle. De bedste casinoer tilbyder udbetalinger inden for 0-24 timer.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                  <li><Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link> – Danmarks foretrukne med øjeblikkelige indbetalinger</li>
                  <li><Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> – Direkte bankoverførsel</li>
                  <li><Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link> – Universelt accepteret</li>
                  <li><Link to="/betalingsmetoder/paypal" className={linkClass}>PayPal</Link> – Sikker e-wallet med køberbeskyttelse</li>
                  <li><Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link>,{" "}<Link to="/betalingsmetoder/apple-pay" className={linkClass}>Apple Pay</Link>,{" "}<Link to="/betalingsmetoder/revolut" className={linkClass}>Revolut</Link>,{" "}<Link to="/betalingsmetoder/zimpler" className={linkClass}>Zimpler</Link>,{" "}<Link to="/betalingsmetoder/paysafecard" className={linkClass}>Paysafecard</Link></li>
                </ul>
              </CardContent>
            </Card>

            {/* 4. Live casino */}
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Tv className="h-5 w-5 text-primary" />
                  4. Live casino og gameshows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <Link to="/live-casino" className={linkClass}>Live casino</Link> er en af de hurtigst voksende sektorer inden for online gambling. Med professionelle dealere, der streamer i HD fra studios verden over, får du en autentisk casinooplevelse direkte fra din sofa.{" "}
                  <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> dominerer markedet med innovative game shows som Crazy Time, Lightning Roulette og MONOPOLY Live. Vi vurderer altid live casino-udbuddet, herunder antal borde, minimumindsatser og tilgængelighed af danske dealere.
                </p>
              </CardContent>
            </Card>

            {/* 5. Sikkerhed */}
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  5. Sikkerhed, licens og ansvarligt spil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
                  Alle casinoer vi anmelder har en gyldig dansk licens fra Spillemyndigheden. En dansk licens garanterer:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                  <li>Spillerbeskyttelse og klageadgang</li>
                  <li>Selvudelukkelse via <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a></li>
                  <li>Krypteret datatransmission</li>
                  <li>Adskillelse af spillermidler</li>
                  <li>Forpligtelse til{" "}<Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link></li>
                </ul>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Hjælp:{" "}<a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className={linkClass}>StopSpillet.dk</a> – gratis og anonymt.
                </p>
              </CardContent>
            </Card>

            {/* 6. Kundeservice */}
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" />
                  6. Kundeservice og brugervenlighed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
                  Vi vurderer responstid, tilgængelige kanaler (live chat, e-mail, telefon) og kvaliteten af hjælpen. Vi tester også, om kundeservicen er tilgængelig på dansk, og om den kan håndtere specifikke spørgsmål om bonusvilkår og udbetalinger.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I 2026 spiller over 70% af danske spillere på mobilen, så casinoet skal tilbyde en responsiv og intuitiv mobilplatform med hurtig indlæsningstid og problemfri navigation.
                </p>
              </CardContent>
            </Card>

            {/* 7. RTP og volatilitet */}
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  7. RTP og volatilitet – Forstå dine chancer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
                  RTP (Return to Player) angiver den teoretiske tilbagebetaling – et spil med 96% RTP betaler i gennemsnit 96 kr. tilbage for hver 100 kr. De bedste{" "}
                  <Link to="/casinospil" className={linkClass}>casinospil</Link> tilbyder RTP over 96%.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Lav volatilitet giver hyppige, men mindre gevinster. Høj volatilitet giver sjældne, men potentielt store gevinster.{" "}
                  <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link> er kendt for ekstrem høj volatilitet, mens{" "}
                  <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link> tilbyder mere balancerede spil.
                </p>
              </CardContent>
            </Card>

            {/* 8. Vores anmeldelsesproces */}
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Award className="h-5 w-5 text-primary" />
                  8. Vores anmeldelsesproces
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
                  For at sikre troværdige anmeldelser følger vi en standardiseret proces:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                  <li><strong className="text-foreground">Oprettelse:</strong> Vi opretter en rigtig konto og gennemgår KYC-processen</li>
                  <li><strong className="text-foreground">Bonustest:</strong> Vi aktiverer velkomstbonussen og vurderer fairness</li>
                  <li><strong className="text-foreground">Spiludvalg:</strong> Vi gennemgår spilkataloget og tæller udbydere</li>
                  <li><strong className="text-foreground">Betalinger:</strong> Vi tester ind- og udbetalinger via flere metoder</li>
                  <li><strong className="text-foreground">Kundeservice:</strong> Vi kontakter support med specifikke spørgsmål</li>
                  <li><strong className="text-foreground">Opdatering:</strong> Anmeldelser gennemgås minimum hvert kvartal</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Sammenligning */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Sammenligning af alle anmeldte casinoer</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold">Casino</th>
                  <th className="px-4 py-3 text-left font-semibold">Bonus</th>
                  <th className="px-4 py-3 text-left font-semibold">Omsætning</th>
                  <th className="px-4 py-3 text-left font-semibold">Type</th>
                  <th className="hidden px-4 py-3 text-center font-semibold md:table-cell">Vurdering</th>
                  <th className="px-4 py-3 text-center font-semibold">Anmeldelse</th>
                </tr>
              </thead>
              <tbody>
                {reviewCasinos.map((casino, idx) => (
                  <tr key={casino.id} className={idx % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                    <td className="px-4 py-3 font-medium">{casino.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{casino.bonus_amount}</td>
                    <td className="px-4 py-3 text-muted-foreground">{casino.wagering_requirements}</td>
                    <td className="px-4 py-3">
                      <Badge variant={casino.bonus_type === "No-sticky" ? "secondary" : "outline"} className="text-xs">
                        {casino.bonus_type}
                      </Badge>
                    </td>
                    <td className="hidden px-4 py-3 text-center md:table-cell">
                      <span className="flex items-center justify-center gap-1 font-semibold">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        {casino.rating}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link to={`/${casino.slug}-anmeldelse`} className="text-primary underline hover:text-primary/80 font-medium text-sm">
                        Læs →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <Separator className="my-10" />

        {/* Fordele og ulemper */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Fordele og ulemper ved hvert casino</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  <Link to="/spilleautomaten-anmeldelse" className={linkClass}>Spilleautomaten</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Stort spiludvalg med 2.500+ titler fra{" "}<Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>,{" "}<Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> m.fl.</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Generøs{" "}<Link to="/no-sticky-bonus" className={linkClass}>No-Sticky</Link> velkomstbonus med kun 10x omsætning</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Hurtige udbetalinger via{" "}<Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link> og{" "}<Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link></span></div>
                <div className="flex items-start gap-2"><ThumbsDown className="h-4 w-4 text-destructive mt-0.5 shrink-0" /><span>Ingen sportsbook eller betting-muligheder</span></div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  <Link to="/spildansknu-anmeldelse" className={linkClass}>SpilDanskNu</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Brugervenlighed og dansk fokus i hele platformen</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Fair{" "}<Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link> med lave{" "}<Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link></span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Ingen bonuskode nødvendig</span></div>
                <div className="flex items-start gap-2"><ThumbsDown className="h-4 w-4 text-destructive mt-0.5 shrink-0" /><span>Lidt mindre spiludvalg end de største konkurrenter</span></div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  <Link to="/campobet-anmeldelse" className={linkClass}>Campobet</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Kombineret casino og sportsbetting med 3.000+ spil</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Stærkt{" "}<Link to="/live-casino" className={linkClass}>live casino</Link> fra{" "}<Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link></span></div>
                <div className="flex items-start gap-2"><ThumbsDown className="h-4 w-4 text-destructive mt-0.5 shrink-0" /><span>Kundeservice kan have ventetid i spidsbelastning</span></div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  <Link to="/betinia-anmeldelse" className={linkClass}>Betinia</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Over 40{" "}<Link to="/spiludviklere" className={linkClass}>spiludbydere</Link> og akkumulatorboost</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span><Link to="/no-sticky-bonus" className={linkClass}>No-Sticky</Link> velkomstbonus med 10x{" "}<Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link></span></div>
                <div className="flex items-start gap-2"><ThumbsDown className="h-4 w-4 text-destructive mt-0.5 shrink-0" /><span>Ingen{" "}<Link to="/free-spins" className={linkClass}>free spins</Link> inkluderet i velkomstpakken</span></div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  <Link to="/swift-casino-anmeldelse" className={linkClass}>Swift Casino</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Unik Hot Or Cold-funktion der viser aktive spilleautomater</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Over 3.300{" "}<Link to="/casinospil" className={linkClass}>casinospil</Link> fra anerkendte udbydere</span></div>
                <div className="flex items-start gap-2"><ThumbsDown className="h-4 w-4 text-destructive mt-0.5 shrink-0" /><span>Ingen{" "}<Link to="/free-spins" className={linkClass}>free spins</Link> i velkomstbonussen</span></div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  <Link to="/luna-casino-anmeldelse" className={linkClass}>Luna Casino</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>VIP-program med eksklusive fordele og bonusser</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span><Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link> med 50{" "}<Link to="/free-spins" className={linkClass}>free spins</Link></span></div>
                <div className="flex items-start gap-2"><ThumbsDown className="h-4 w-4 text-destructive mt-0.5 shrink-0" /><span>Lavere bonusbeløb end nogle konkurrenter</span></div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Tips */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">5 tips til at vælge det rigtige casino</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Med så mange muligheder kan det være svært at vælge. Her er fem konkrete tips, der hjælper dig med at finde det casino, der passer bedst til dine behov.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">1. Læs vilkårene først</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Tjek altid{" "}<Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>, tidsbegrænsning og spillebidrag, før du aktiverer en bonus.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">2. Vælg No-Sticky</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">En{" "}<Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link> giver dig mest fleksibilitet, da dine egne penge altid er tilgængelige.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">3. Test kundeservice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Kontakt kundeservice med et spørgsmål, før du indbetaler. Det giver dig en fornemmelse for kvaliteten.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">4. Kend dine spil</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Vælg et casino med de{" "}<Link to="/spiludviklere" className={linkClass}>spiludviklere</Link> og{" "}<Link to="/casinospil" className={linkClass}>casinospil</Link> du bedst kan lide.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">5. Sæt grænser</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Brug casinoets ansvarligt spil-værktøjer. Spil skal altid være{" "}<Link to="/responsible-gaming" className={linkClass}>ansvarligt</Link> og underholdende.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Bonus: Sammenlign</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Brug vores{" "}<Link to="/top-10-casino-online" className={linkClass}>Top 10 Casino Online</Link> oversigt for at finde det bedste tilbud.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <AuthorBio />

        <Separator className="my-10" />

        <RelatedGuides currentPath="/casino-anmeldelser" />

        <FAQSection title="Ofte stillede spørgsmål om casino anmeldelser" faqs={faqs} />
      </div>
    </>
  );
};

export default CasinoAnmeldelser;
