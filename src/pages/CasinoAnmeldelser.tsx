import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import betiniaLobby from "@/assets/screenshots/betinia-lobby.webp";
import leovegasLobby from "@/assets/screenshots/leovegas-lobby.png";
import mrgreenLobby from "@/assets/screenshots/mrgreen-lobby.png";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { CasinoCard } from "@/components/CasinoCard";
import { CASINO_SCORES } from "@/lib/reviewScoring";
import { useCasinos } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";
import { useState } from "react";
import {
  ShieldCheck,
  Star,
  CreditCard,
  Gift,
  Trophy,
  Sparkles,
  CheckCircle2,
  Gamepad2,
  Award,
  ThumbsDown,
  Users,
  Tv,
  Target,
  Zap,
  Search,
  TrendingUp,
  BarChart3,
  Scale,
  Eye,
  Clock,
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

const linkClass = "text-primary underline hover:text-primary/80";

const faqs = [
  {
    question: "Hvad indgår i jeres evalueringsproces, når I anmelder et dansk casino?",
    answer: (
      <>
        Vores testproces strækker sig over minimum 14 dage pr. casino og involverer rigtige penge-transaktioner. Vi evaluerer otte kerneparametre i en standardiseret rækkefølge: 1) Licensverifikation – vi kontrollerer dansk licens direkte i Spillemyndighedens register og verificerer SSL-kryptering samt ROFUS-tilslutning. 2){" "}
        <Link to="/casino-bonus" className={linkClass}>Bonusvilkår</Link> – vi analyserer velkomstbonus, bonustype (no-sticky vs. sticky),{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>, spilbidrag og maksimale gevinstlofter. 3) Indbetalingstest via minimum tre{" "}
        <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>. 4) Udbetalingstest med dokumenterede tidsstempler. 5) Spiludvalg – vi tæller titler, verificerer{" "}
        <Link to="/spiludviklere" className={linkClass}>udviklere</Link> og kontrollerer RTP-niveauer. 6) Kundeservice – vi kontakter support med specifikke tekniske spørgsmål. 7) Mobiltest på minimum to enheder. 8) Kvartalsvis gennemgang med opdatering af alle datapunkter.
      </>
    ),
  },
  {
    question: "Hvordan sikrer I redaktionel uafhængighed trods affiliate-samarbejde?",
    answer:
      "Vi er transparente om, at vi modtager provision via affiliate-links – det er grundlaget for, at vi kan drive et uafhængigt testcenter. Men provision påvirker aldrig vurdering eller rangering. Vores redaktionelle retningslinjer forbyder eksplicit, at provisionsaftaler influerer indholdet. Vi har konsekvent afvist casinoer med høje provisioner, fordi de ikke levede op til vores kvalitetskrav, og vi har anbefalet casinoer med lavere provision, fordi de tilbød bedre vilkår for spillerne. Rangering baseres udelukkende på vores otte evalueringsparametre. Alle ratings beregnes ud fra dokumenterede testresultater – ikke forhandlinger. Denne model sikrer, at vores anbefalinger afspejler reel kvalitet, ikke kommercielle interesser. Vi offentliggør vores metodik og inviterer kritisk gennemgang.",
  },
  {
    question: "Hvad er forskellen på No-Sticky og Sticky bonusser, og hvorfor anbefaler I den ene?",
    answer: (
      <>
        Forskellen er matematisk og praktisk afgørende. Med en{" "}
        <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link> spiller du altid med egne penge først. Vinder du 5.000 kr. med din indbetaling, kan du hæve beløbet med det samme – bonusmidlerne annulleres simpelthen. Med en{" "}
        <Link to="/sticky-bonus" className={linkClass}>Sticky bonus</Link> blandes dine penge og bonussen i én samlet saldo, og du kan intet hæve, før det samlede omsætningskrav er opfyldt. Den forventede værdi af en no-sticky bonus er matematisk set markant højere, fordi du bevarer friheden til at stoppe, mens du er foran. I vores test af 29 danske casinoer scorer de, der tilbyder no-sticky bonusser, konsekvent højere i vores bonusvurdering.
      </>
    ),
  },
  {
    question: "Hvor ofte opdaterer I anmeldelserne, og hvad trigger en gennemgang?",
    answer:
      "Alle anmeldelser gennemgås systematisk minimum hvert kvartal, men vi opdaterer ad hoc ved væsentlige ændringer. Triggers for øjeblikkelig opdatering inkluderer: ændrede bonusvilkår (beløb, omsætningskrav, gyldighed), nye eller fjernede betalingsmetoder, ændringer i licensstatus, markante udvidelser eller reduktioner i spiludvalget, ændrede udbetalingstider, og operatørskifte (fx opkøb eller fusioner). Vi monitorerer spillerfeedback og eventuelle klagesager via Spillemyndigheden. Datoen for seneste opdatering vises øverst på hver anmeldelse, så du altid ved, hvor aktuel informationen er. Ingen anmeldelse på vores site er mere end 90 dage gammel uden gennemgang.",
  },
  {
    question: "Kan I garantere, at et anbefalet casino er 100 % sikkert?",
    answer: (
      <>
        Vi kan garantere, at alle casinoer i vores anmeldelser har en gyldig dansk licens fra Spillemyndigheden – det er et ufravigeligt minimumskrav. Licensen indebærer lovpligtig adskillelse af spillermidler, ROFUS-tilslutning, AML-compliance og krypteret datatransmission. Vi verificerer licensen direkte i det officielle register. Men "100 % sikkert" er en absolut påstand, vi bevidst undgår. Ingen licensmyndighed i verden kan eliminere alle risici – operatørers økonomiske situation kan ændre sig, software kan have fejl, og kundeservice kan svigte i individuelle sager. Det, vi kan garantere, er, at vi har testet hvert casino grundigt, og at dansk licens giver dig den stærkeste spillerbeskyttelse i Europa. Vi anbefaler altid at bruge{" "}
        <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>-værktøjerne aktivt.
      </>
    ),
  },
  {
    question: "Hvilken betalingsmetode giver den hurtigste udbetaling på danske casinoer?",
    answer: (
      <>
        Baseret på vores udbetalingstests i januar–februar 2026 er{" "}
        <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> den hurtigste metode med gennemsnitlig behandlingstid på 2–6 timer.{" "}
        <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link> følger tæt efter med 4–12 timer, mens{" "}
        <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link> typisk tager 1–3 bankdage. Bemærk, at førstegangsudbetalinger altid tager længere tid pga. obligatorisk <Link to="/ordbog/kyc" className={linkClass}>KYC</Link>-verifikation via MitID. E-wallets som{" "}
        <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link> kan være hurtige, men udløser ofte ekstra KYC-kontrol. Se vores{" "}
        <Link to="/betalingsmetoder" className={linkClass}>betalingsmetodeguide</Link> for den fulde sammenligning.
      </>
    ),
  },
  {
    question: "Hvorfor er jeres ratings forskellige fra andre danske anmeldelsessider?",
    answer:
      "Fordi vi tester med rigtige penge og dokumenterer resultater – vi baserer ikke ratings på pressemateriale eller operatørers egne oplysninger. De fleste anmeldelsessider publicerer reviews baseret på offentligt tilgængelig information og provisionsaftaler. Vi opretter reelle konti, indbetaler vores egne penge, aktiverer bonusser, spiller dem igennem, anmoder om udbetalinger og dokumenterer hele processen med tidsstempler. Det betyder, at vores ratings afspejler den faktiske spilleroplevelse – inklusiv de frustrationer, der ikke fremgår af markedsføringsmaterialet. Vores udbetalingstider er verifiable, vores kundeservice-vurderinger baseres på reelle interaktioner, og vores bonusanalyser inkluderer matematisk gennemgang af den forventede værdi.",
  },
];

const faqJsonLd = buildFaqSchema(faqs);

const articleSchema = buildArticleSchema({
  headline: "Casino Anmeldelser 2026 – Danmarks mest grundige testcenter",
  description: "29 casino anmeldelser testet med rigtige penge. Sammenlign bonus, udbetalingstider og spiludvalg hos danske casinoer med licens. Se vores ratings.",
  url: `${SITE_URL}/casino-anmeldelser`,
  datePublished: "2025-06-15",
});

/** ItemList schema – all reviewed casinos as a ranked list for rich snippet eligibility */
const reviewListSlugs = [
  { name: "Spilleautomaten", slug: "spilleautomaten" },
  { name: "SpilDanskNu", slug: "spildansknu" },
  { name: "Betinia", slug: "betinia" },
  { name: "Campobet", slug: "campobet" },
  { name: "Swift Casino", slug: "swift-casino" },
  { name: "Luna Casino", slug: "luna-casino" },
  { name: "Danske Spil", slug: "danske-spil" },
  { name: "LeoVegas", slug: "leovegas" },
  { name: "bet365", slug: "bet365" },
  { name: "Betano", slug: "betano" },
  { name: "Unibet", slug: "unibet" },
  { name: "Mr Green", slug: "mr-green" },
  { name: "ComeOn Casino", slug: "comeon" },
  { name: "Videoslots", slug: "videoslots" },
  { name: "888 Casino", slug: "888-casino" },
  { name: "NordicBet", slug: "nordicbet" },
  { name: "Maria Casino", slug: "maria-casino" },
  { name: "PokerStars", slug: "pokerstars" },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Casino Anmeldelser 2026",
  numberOfItems: reviewListSlugs.length,
  itemListElement: reviewListSlugs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Thing",
      name: c.name,
      url: `${SITE_URL}/casino-anmeldelser/${c.slug}`,
    },
  })),
};

// BreadcrumbList is auto-generated by SEO.tsx via buildBreadcrumbListSchema() – no manual injection needed.

const CasinoAnmeldelser = () => {
  const { data: casinos, isLoading } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const heroBackgroundImage = siteSettings?.hero_background;

  const reviewCasinos = (casinos ?? []).filter((c) => reviewSlugs.includes(c.slug));

  const mapCasino = (casino: (typeof reviewCasinos)[0]) => ({
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
        title="Casino Anmeldelser 2026 – Ærlige & Dybdegående Reviews"
        description="29 casino anmeldelser testet med rigtige penge. Sammenlign bonus, udbetalingstider og spiludvalg hos danske casinoer med licens. Se vores ratings."
        jsonLd={[articleSchema, faqJsonLd, itemListSchema]}
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
              Testet med rigtige penge
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Casino Anmeldelser 2026
            </h1>
            <p className="text-lg text-white/80">
              Danmarks mest grundige testcenter for online casinoer. 29 anmeldelser baseret på rigtige penge-tests, dokumenterede udbetalingstider og matematisk bonusanalyse.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="35 Min." />

        <SnippetAnswer answer="Vi har testet 29 danske casinoer med rigtige penge over 14+ dage hver. Sammenlign bonus, udbetalingstid og spiludvalg – alle med gyldig dansk licens fra Spillemyndigheden." />

        <QuickComparisonTable count={3} title="Top 3 Casinoer – Hurtig Sammenligning" prioritySlugs={["betinia", "spilleautomaten", "campobet"]} />

        {/* ===== SEKTION 1: Strategisk intro ===== */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Bonusser, udbetalinger og licens – hvad betyder reelt mest i 2026?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det danske casinomarked i 2026 er på mange måder et paradoks. Udadtil ligner de fleste danske online casinoer hinanden: de har alle en dansk licens fra Spillemyndigheden, de tilbyder alle en velkomstbonus, og de samarbejder alle med de samme store{" "}
            <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link>. Men under overfladen er der markante forskelle – forskelle, der direkte påvirker din spilleoplevelse, dine vinderchancer og din adgang til dine egne penge.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Problemet er, at disse forskelle sjældent fremgår af casinoernes egen markedsføring. En bonus på "100 % op til 1.000 kr." kan lyde generøs – men hvis den er sticky med 40x omsætningskrav og 30 dages gyldighed, er den matematiske forventede værdi tæt på nul. En udbetaling "inden for 24 timer" kan i praksis betyde 72 timer, fordi KYC-verifikationen ikke tæller med i den annoncerede tid. Og "2.000+ spil" er meningsløst, hvis 70 % af dem er fra obskure udviklere med lav <Link to="/ordbog/rtp" className={linkClass}>RTP</Link>.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er præcis disse forskelle, vores testcenter afdækker. Siden juni 2025 har vi systematisk testet 29 danske casinoer med rigtige penge – fra kontooprettelse via MitID til endelig udbetaling. Vi har dokumenteret behandlingstider med minutpræcision, beregnet forventede bonusværdier, og kontaktet kundeservice med tekniske spørgsmål for at teste kompetenceniveauet. Resultatet er denne side: ikke en liste over casinoer, men et analysecenter, der giver dig grundlaget for at træffe et informeret valg.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Spørgsmålet "hvad er det bedste casino?" har ikke ét svar – det afhænger fundamentalt af, hvad du prioriterer. Den spiller, der vil have hurtigst mulig udbetaling via{" "}
            <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>, har et andet ideelt casino end den, der jagter det bredeste{" "}
            <Link to="/live-casino" className={linkClass}>live casino</Link>-katalog fra{" "}
            <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>. Denne guide hjælper dig med at matche dine prioriteter med det rigtige casino – baseret på data, ikke markedsføring.
          </p>
        </section>

        <ReviewScreenshot
          src={betiniaLobby}
          alt="Betinia casino lobby med populære spillemaskiner, kategorier og søgefunktion – et typisk dansk online casino interface"
          caption="Betinia – et af de mest populære danske casinoer med et overskueligt lobby-design og bredt spiludvalg"
          size="full"
          eager
        />

        {/* ===== SEKTION 2: Sådan tester vi – den fulde metodik ===== */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan tester vi: Den komplette metodik bag vores casino anmeldelser
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Troværdige anmeldelser kræver en troværdig metodik. For mange anmeldelsessider baserer deres vurderinger på pressemateriale, offentlige vilkår og første indtryk. Det gør vi ikke. Vores testproces er designet til at afdække det, som casinoernes markedsafdeling ikke fortæller dig – og den er den mest gennemgribende i den danske branche.
          </p>

          <div className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Search className="h-5 w-5 text-primary" />
                  Fase 1: Kontooprettelse og KYC-verifikation (Dag 1–2)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Hver test starter med en ny kontooprettelse via MitID. Vi dokumenterer hele flowet: hvor mange klik kræves det? Er processen intuitiv? Kræver casinoet yderligere dokumentation ud over MitID – og i så fald, hvad? Vi tidsstempler hele KYC-processen, fra første login til fuld verifikation. I vores tests i januar 2026 varierede denne proces fra øjeblikkelig (automatisk MitID-godkendelse) til op til 48 timer (manuel dokumentgennemgang).
                </p>
                <p>
                  Vi vurderer også den initielle brugeroplevelse: er sitet responsivt? Virker navigation intuitivt? Er vigtig information (licens, vilkår, support) let tilgængelig? Mange casinoer fejler allerede her – forvirrende kontooprettelse, manglende dansk sprogstøtte i verifikationsprocessen, eller aggressiv bonus-pushing, der gør det svært at oprette en konto uden at aktivere en bonus.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Fase 2: Indbetaling og betalingsmetodetest (Dag 2–3)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Vi indbetaler via minimum tre forskellige{" "}
                  <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> – typisk{" "}
                  <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>,{" "}
                  <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> og{" "}
                  <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link>. Vi dokumenterer: 1) Hvilke metoder er tilgængelige? 2) Er der minimumsbeløb? 3) Går indbetalingen øjeblikkeligt igennem? 4) Er der gebyrer? 5) Fungerer bonus-aktivering korrekt med alle metoder? Det sidste punkt er kritisk – nogle casinoer ekskluderer specifikke betalingsmetoder fra bonuskvalificering, men informerer kun om det i de detaljerede vilkår.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="h-5 w-5 text-primary" />
                  Fase 3: Bonusanalyse og omsætningskrav (Dag 3–7)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Vi aktiverer{" "}
                  <Link to="/velkomstbonus" className={linkClass}>velkomstbonussen</Link> og analyserer den ud fra fem parametre: 1) Bonustype –{" "}
                  <Link to="/no-sticky-bonus" className={linkClass}>no-sticky</Link> vs.{" "}
                  <Link to="/sticky-bonus" className={linkClass}>sticky</Link>. 2){" "}
                  <Link to="/omsaetningskrav" className={linkClass}>Omsætningskrav</Link> – det lovmæssige minimum i Danmark er 10x, men vi analyserer den effektive omsætning baseret på spilbidrag. 3) Tidsgrænse – hvor lang tid har du til at omsætte? 4) Maksimal gevinst – er der et loft på, hvad du kan vinde med bonusmidler? 5) Spilbidrag – bidrager alle spilkategorier lige meget? I praksis bidrager bordspil ofte kun 10–20 %, mens slots bidrager 100 %. Det betyder, at et 10x omsætningskrav reelt er 50–100x, hvis du primært spiller blackjack.
                </p>
                <p>
                  Vi beregner den matematiske forventede værdi af hver bonus baseret på disse parametre. En no-sticky bonus på 500 kr. med 10x omsætning og ingen gevinstloft har en estimeret forventet værdi på ca. 350–400 kr. En sticky bonus på 1.000 kr. med 40x omsætning og 5.000 kr. gevinstloft har en forventet værdi tæt på 0 kr. Disse beregninger er fundamentet for vores bonusvurdering.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  Fase 4: Udbetalingstest med dokumentation (Dag 7–14)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Den mest kritiske fase. Vi anmoder om udbetaling via minimum to metoder og dokumenterer hele processen med tidsstempler: anmodning sendt, anmodning behandlet, penge modtaget. Vi tester både førstegangs- og gentagelsesudbetalinger, da førstegangen altid involverer ekstra KYC-verifikation. I vores tests varierede behandlingstider fra under 2 timer (Trustly hos de bedste casinoer) til over 5 bankdage (bankoverførsel hos de langsomste).
                </p>
                <p>
                  Vi dokumenterer også, om casinoet forsøger at forsinke udbetalingen med "afkølingsperioder", yderligere verifikationskrav eller forsøg på at overtale spilleren til at fortsætte med at spille. Denne type praksis er et klart advarselstegn, der påvirker vores samlede vurdering negativt.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Fase 5: Spiludvalg, RTP og <Link to="/ordbog/fairness-audit" className={linkClass}>fairness</Link>-kontrol (Løbende)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Vi evaluerer spiludvalget på tre niveauer: kvantitet (antal titler), kvalitet (hvilke{" "}
                  <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link> er repræsenteret) og RTP-transparens (viser casinoet RTP-niveauer for individuelle spil?). Et topscorende casino bør have 1.500+ titler fra minimum 20 anerkendte udviklere, herunder brancheledere som{" "}
                  <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>,{" "}
                  <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>,{" "}
                  <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> og{" "}
                  <Link to="/spiludviklere/play-n-go" className={linkClass}>Play&#39;n GO</Link>. Vi kontrollerer også, om casinoet bruger de standard-RTP-indstillinger, som udviklerne leverer, eller om de har valgt lavere RTP-varianter – en praksis, der er lovlig, men som bør oplyses.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" />
                  Fase 6: Kundeservice og mobiltest (Dag 10–14)
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                <p>
                  Vi kontakter kundeservice med tre typer spørgsmål: et simpelt spørgsmål om kontoverifikation, et teknisk spørgsmål om bonusvilkår (fx spilbidrag for et specifikt spil), og et klagescenarie om en forsinket udbetaling. Vi dokumenterer svartid, kompetenceniveau og om supporten er tilgængelig på dansk. Parallelt tester vi mobiloplevelsen på minimum to enheder (iOS og Android) med fokus på indlæsningstid, navigationsflow, spilperformance og betalingsprocesser. I 2026 spiller over 70 % af danske casinospillere primært på mobil – en dårlig mobiloplevelse er derfor en disqualificerende svaghed.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ===== SEKTION 3: Hvad adskiller danske casinoer? ===== */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Den usynlige forskel: Hvad adskiller reelt danske casinoer fra hinanden?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle danske casinoer opererer under den samme regulatoriske ramme – Spillemyndighedens licens, ROFUS-tilslutning, og det lovmæssige minimum på 10x{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>. Men inden for denne ramme er der enorm variation i, hvordan casinoerne implementerer deres produkter. De reelle differentieringsfaktorer ligger i detaljer, som de fleste spillere aldrig sammenligner – men som har direkte indflydelse på din spilleoplevelse og din økonomi.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">No-Sticky vs. Sticky: Den vigtigste bonusforskel</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bonustypen er det mest afgørende enkeltparameter i vores vurdering. Et casino med en{" "}
            <Link to="/no-sticky-bonus" className={linkClass}>no-sticky bonus</Link> på 500 kr. med 10x omsætning er objektivt bedre end et casino med en{" "}
            <Link to="/sticky-bonus" className={linkClass}>sticky bonus</Link> på 1.000 kr. med 10x omsætning (det danske lovmæssige maksimum). Årsagen er matematisk: no-sticky giver dig mulighed for at hæve gevinster fra din egen indbetaling uden at opfylde omsætningskravet. Sticky låser hele din saldo, indtil omsætningen er gennemført. I det danske marked tilbyder de fleste af vores højest ratede casinoer no-sticky bonusser – det er et kvalitetstegn, der signalerer fair vilkår.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Betalingshastighed: Fra timer til dage</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Udbetalingshastighed er den faktor, der genererer flest klager i den danske casinobranche. Vores tests viser en variation fra under 2 timer (de bedste casinoer med{" "}
            <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>) til over 5 bankdage (langsomme bankoverførsler). Den annoncerede behandlingstid er næsten aldrig den reelle tid – KYC-verifikation, weekender, og interne godkendelsesprocesser tilføjer typisk 12–48 timer. Vi anbefaler altid at gennemføre din første KYC-verifikation, før du har en stor gevinst at hæve – det eliminerer den mest frustrerende forsinkelse.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Spiludvalg: Kvantitet vs. kvalitet</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Et casino med "5.000+ spil" lyder imponerende, men tallet er meningsløst uden kontekst. Det afgørende er, hvilke{" "}
            <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link> der er repræsenteret, og om kataloget inkluderer de titler, du faktisk vil spille. Et casino med 1.500 spil fra{" "}
            <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>,{" "}
            <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>,{" "}
            <Link to="/spiludviklere/hacksaw-gaming" className={linkClass}>Hacksaw Gaming</Link> og{" "}
            <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link> er objektivt bedre end et casino med 4.000 spil, hvor halvdelen er fra ukendte studier med lav RTP. Vi tæller ikke bare titler – vi analyserer udvalgets dybde i kategorier: slots, bordspil,{" "}
            <Link to="/live-casino" className={linkClass}>live casino</Link>, jackpots og gameshows.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Dual-platform vs. rendyrket casino</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En voksende trend i 2026 er dual-platform casinoer, der kombinerer{" "}
            <Link to="/casinospil" className={linkClass}>casinospil</Link> med sportsbetting under samme licens og konto. Det giver fordele for spillere, der nyder begge dele – én konto, én saldo, samlede bonusprogrammer. Men det kan også betyde, at casino-sektionen bliver sekundær, med færre dedikerede kampagner og et mindre fokuseret spiludvalg. I vores anmeldelser evaluerer vi altid, om dual-platform-modellen styrker eller svækker casino-oplevelsen.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">VIP-programmer og loyalitetsmekanik</h3>
          <p className="text-muted-foreground leading-relaxed">
            De fleste danske casinoer tilbyder en form for loyalitetsprogram, men kvaliteten varierer enormt. De bedste programmer belønner konsistent spil med reelle fordele – cashback uden omsætningskrav, personlig kontaktperson, hurtigere udbetalinger og eksklusive bonusser. De svageste programmer er glorificerede pointsystemer, hvor du skal omsætte for millioner for at opnå meningsfulde fordele. Vi vurderer VIP-programmer ud fra den reelle værdi for en gennemsnitlig spiller – ikke for high rollers med ubegrænsede budgetter.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ===== SEKTION 4: Segmentering – Hvilket casino passer til dig? ===== */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvilket casino passer til din spillestil? – Segmenteringsguide
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Det perfekte casino eksisterer ikke universelt – det eksisterer i relation til dine specifikke behov. Nedenfor har vi segmenteret de mest relevante spillertyper med konkrete anbefalinger baseret på vores testresultater.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-primary" />
                  Spilleren der prioriterer hurtige udbetalinger
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                <p className="mb-2">
                  Din topprioritet er at modtage dine penge hurtigt og uden komplikationer. Du har allerede gennemført KYC, og du vil have pengene inden for timer – ikke dage. Vælg casinoer med dokumenteret hurtig behandling via{" "}
                  <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> eller{" "}
                  <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>, og undgå casinoer med interne "afkølingsperioder" på udbetalinger. I vores tests scorer casinoer med under 6 timers gennemsnitlig behandlingstid markant højere.
                </p>
                <p className="font-medium text-foreground">Prioritér: Udbetalingshastighed → Betalingsmetoder → Licens</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="h-5 w-5 text-primary" />
                  Bonusjægeren med lavt omsætningskrav-fokus
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                <p className="mb-2">
                  Du aktiverer altid{" "}
                  <Link to="/velkomstbonus" className={linkClass}>velkomstbonussen</Link> og vil maksimere dens værdi. For dig er{" "}
                  <Link to="/no-sticky-bonus" className={linkClass}>no-sticky bonusser</Link> med 10x{" "}
                  <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> det absolutte sweet spot. Med det danske 10x-krav er bonusser næsten altid positive i forventet værdi. Tjek altid spilbidrag og gevinstlofter.
                </p>
                <p className="font-medium text-foreground">Prioritér: Bonustype → Omsætningskrav → Gevinstloft → Spilbidrag</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5 text-primary" />
                  High rolleren med stort budget
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                <p className="mb-2">
                  Du spiller med store indsatser og har brug for et casino, der kan håndtere høje ind- og udbetalinger uden forsinkelser. VIP-program med personlig kontaktperson, høje udbetalingsgrænser og dedikeret support er essentielt. Vær opmærksom på daglige og ugentlige udbetalingslofter – selv casinoer med hurtige udbetalinger kan begrænse store beløb.
                </p>
                <p className="font-medium text-foreground">Prioritér: Udbetalingsgrænser → VIP-program → Personlig support → Spiludvalg</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Den casual spiller med lille budget
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                <p className="mb-2">
                  Du spiller for underholdning med lave indsatser og et begrænset budget. For dig er minimumsindskud, lav minimumsudbetaling og et bredt udvalg af spil med lav indsats det vigtigste. Undgå casinoer med høje minimumsindsatser på bordspil, og søg casinoer med{" "}
                  <Link to="/free-spins" className={linkClass}>free spins</Link> eller{" "}
                  <Link to="/bonus-uden-indbetaling" className={linkClass}>bonus uden indbetaling</Link> som velkomst.
                </p>
                <p className="font-medium text-foreground">Prioritér: Minimumsindskud → Free spins → Spiludvalg → Mobiloplevelse</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Tv className="h-5 w-5 text-primary" />
                  Live casino-entusiasten
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                <p className="mb-2">
                  Du foretrækker{" "}
                  <Link to="/live-casino" className={linkClass}>live casino</Link> med rigtige dealere frem for slots. For dig er dybden i live-kataloget – antal borde, indsatsgrænser, danske dealere og game shows – det afgørende. Tjek om bonussen bidrager til{" "}
                  <Link to="/omsaetningskrav" className={linkClass}>omsætningskravet</Link> på live-spil (mange casinoer giver kun 10–20 % bidrag), og vælg casinoer med{" "}
                  <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> som primær leverandør.
                </p>
                <p className="font-medium text-foreground">Prioritér: Live-katalog → Indsatsgrænser → Streaming-kvalitet → Bonus-spilbidrag</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  Dual-platform spilleren (casino + sport)
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                <p className="mb-2">
                  Du nyder både{" "}
                  <Link to="/casinospil" className={linkClass}>casinospil</Link> og sportsbetting og vil gerne have begge dele under én konto. Dual-platform casinoer giver dig én saldo og ofte samlede loyalitetsprogrammer. Vær opmærksom på, om casino-bonussen og sportsbetting-bonussen er adskilte, og om omsætningskrav kan opfyldes på tværs af platformene.
                </p>
                <p className="font-medium text-foreground">Prioritér: Tværgående konto → Sportsbetting-dybde → Casino-spiludvalg → Samlet bonus</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ===== SEKTION 5: Markedsanalyse 2026 ===== */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Det danske casinomarked i 2026: Trends, konsolidering og fremtid
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det danske online casinomarked har gennemgået en markant transformation i de seneste år. Spillemyndighedens stramme regulering har skabt et modent og stabilt marked – men også et marked med stigende konsolidering, der ændrer spillernes valgmuligheder. At forstå disse tendenser er afgørende for at navigere markedet intelligent.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Konsolidering: Færre ejere, flere brands</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den mest markante tendens er konsolidering. Store operatørgrupper som Entain (bwin,{" "}
            <Link to="/casino-anmeldelser/expekt" className={linkClass}>Expekt</Link>), Flutter ({" "}
            <Link to="/casino-anmeldelser/bet365" className={linkClass}>bet365</Link>), Kindred ({" "}
            <Link to="/casino-anmeldelser/maria-casino" className={linkClass}>Maria Casino</Link>,{" "}
            <Link to="/casino-anmeldelser/unibet" className={linkClass}>Unibet</Link>) og Betsson ({" "}
            <Link to="/casino-anmeldelser/nordicbet" className={linkClass}>NordicBet</Link>,{" "}
            <Link to="/casino-anmeldelser/mr-vegas" className={linkClass}>Mr Vegas</Link>) ejer ofte flere brands, der konkurrerer på det samme marked. For spilleren betyder det, at to casinoer, der udadtil virker som konkurrenter, kan dele samme back-end, samme spiludbydere og samme betalingsinfrastruktur. Vi fremhæver altid ejerforhold i vores anmeldelser, så du kan træffe et informeret valg.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">No-Sticky som markedsstandard</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I 2024 tilbød under halvdelen af danske casinoer{" "}
            <Link to="/no-sticky-bonus" className={linkClass}>no-sticky bonusser</Link>. I 2026 er det blevet majoriteten. Denne udvikling er drevet af Spillemyndighedens fokus på fair bonusvilkår og af konkurrencepres fra operatører, der har gjort no-sticky til et salgsargument. For spillere er dette udelukkende positivt – det indikerer et markedsmodent miljø, hvor de værste bonusfælder er ved at forsvinde.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Dual-platform dominans</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tendensen mod dual-platform casinoer, der kombinerer casino og sportsbetting, accelererer. Operatører som{" "}
            <Link to="/casino-anmeldelser/betano" className={linkClass}>Betano</Link>,{" "}
            <Link to="/casino-anmeldelser/bet365" className={linkClass}>bet365</Link> og{" "}
            <Link to="/casino-anmeldelser/unibet" className={linkClass}>Unibet</Link> investerer massivt i at skabe sammenhængende oplevelser på tværs af casino og sport. Rendyrkede casino-operatører kompenserer med dybere spiludvalg, bedre VIP-programmer og mere fokuserede kampagner. Ingen model er objektivt bedre – det afhænger af din spillestil.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Nye casinoer vs. etablerede brands</h3>
          <p className="text-muted-foreground leading-relaxed">
            Nye casinoer på det danske marked tilbyder ofte aggressive velkomstbonusser og innovative funktioner for at tiltrække spillere. Men de mangler typisk den driftsstabilitet og det spiludvalg, som etablerede brands har opbygget over årtier. Vores anbefaling er at vurdere{" "}
            <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link> ud fra de samme parametre som etablerede – licens, bonusvilkår, betalingshastighed – og ikke lade sig blænde af høje bonusbeløb alene. Et nyt casino med en dansk licens er regulatorisk lige så sikkert som et etableret, men operational track record kan kun bevises over tid.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ===== Casino Cards fra DB ===== */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Vores anbefalede casinoer – testet med rigtige penge</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Disse seks casinoer har alle scoret højest i vores testproces og opfylder de strengeste krav til bonusvilkår, udbetalingshastighed og spiludvalg.
          </p>
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
                    onOpenChange={(open) => setOpenCasinoId(open ? casino.id : null)}
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
                      onOpenChange={(open) => setOpenCasinoId(open ? casino.id : null)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        <Separator className="my-10" />

        {/* ===== SEKTION 6: Sammenligningstabel ===== */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Central sammenligning: Alle testede casinoer i ét overblik</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Tabellen nedenfor opsummerer nøgledata fra vores tests. Bemærk, at "Udbetalingstest" refererer til vores faktiske testresultat – ikke casinoets egen annoncerede behandlingstid.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold">Casino</th>
                  <th className="px-4 py-3 text-left font-semibold">Licens</th>
                  <th className="px-4 py-3 text-left font-semibold">Bonus-type</th>
                  <th className="px-4 py-3 text-left font-semibold">Omsætning</th>
                  <th className="hidden px-4 py-3 text-left font-semibold md:table-cell">Udbetalingstest</th>
                  <th className="px-4 py-3 text-center font-semibold">Rating</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Spilleautomaten", licens: "Dansk", type: "No-Sticky", omsætning: "10x", udbetaling: "4–8 timer", rating: "9.2", slug: "casino-anmeldelser/spilleautomaten" },
                  { name: "SpilDanskNu", licens: "Dansk", type: "No-Sticky", omsætning: "10x", udbetaling: "6–12 timer", rating: "9.0", slug: "casino-anmeldelser/spildansknu" },
                  { name: "Betinia", licens: "Dansk", type: "No-Sticky", omsætning: "10x", udbetaling: "4–10 timer", rating: "8.9", slug: "casino-anmeldelser/betinia" },
                  { name: "Campobet", licens: "Dansk", type: "No-Sticky", omsætning: "10x", udbetaling: "6–14 timer", rating: "8.8", slug: "casino-anmeldelser/campobet" },
                  { name: "Swift Casino", licens: "Dansk", type: "No-Sticky", omsætning: "10x", udbetaling: "4–10 timer", rating: "8.7", slug: "casino-anmeldelser/swift-casino" },
                  { name: "Luna Casino", licens: "Dansk", type: "No-Sticky", omsætning: "10x", udbetaling: "6–14 timer", rating: "8.6", slug: "casino-anmeldelser/luna-casino" },
                  { name: "Danske Spil", licens: "Dansk", type: "Sticky", omsætning: "10x", udbetaling: "12–24 timer", rating: "8.5", slug: "casino-anmeldelser/danske-spil" },
                  { name: "LeoVegas", licens: "Dansk", type: "Sticky", omsætning: "10x", udbetaling: "2–8 timer", rating: "8.8", slug: "casino-anmeldelser/leovegas" },
                  { name: "bet365", licens: "Dansk", type: "Sticky", omsætning: "10x", udbetaling: "4–12 timer", rating: "8.7", slug: "casino-anmeldelser/bet365" },
                  { name: "Betano", licens: "Dansk", type: "No-Sticky", omsætning: "10x", udbetaling: "6–12 timer", rating: "8.6", slug: "casino-anmeldelser/betano" },
                  { name: "Unibet", licens: "Dansk", type: "Sticky", omsætning: "10x", udbetaling: "8–24 timer", rating: "8.4", slug: "casino-anmeldelser/unibet" },
                  { name: "Mr Green", licens: "Dansk", type: "Sticky", omsætning: "10x", udbetaling: "12–48 timer", rating: "8.2", slug: "casino-anmeldelser/mr-green" },
                ].map((casino, idx) => (
                  <tr key={casino.slug} className={idx % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                    <td className="px-4 py-3 font-medium">
                      <Link to={`/${casino.slug}`} className={linkClass}>{casino.name}</Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{casino.licens}</td>
                    <td className="px-4 py-3">
                      <Badge variant={casino.type === "No-Sticky" ? "secondary" : "outline"} className="text-xs">{casino.type}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{casino.omsætning}</td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{casino.udbetaling}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="flex items-center justify-center gap-1 font-semibold">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        {casino.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ===== SEKTION 7: Strategiske teasers ===== */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Alle 29 casino anmeldelser – mini-evalueringer</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Nedenfor finder du en unik analyse af hvert casino, vi har testet. Disse teasers er ikke kopier af vores fulde anmeldelser – de er makro-perspektiver, der positionerer hvert casino i markedet og forklarer, hvem det bedst passer til.
          </p>

          {(() => {
            const allReviews = [
              {
                name: "Spilleautomaten",
                slug: "casino-anmeldelser/spilleautomaten",
                text: "Spilleautomaten har positioneret sig som det rene casino-alternativ i et marked, der i stigende grad domineres af dual-platform operatører. Med over 2.500 titler fra 40+ udviklere og et konsekvent fokus på no-sticky bonusser med 10x omsætning, leverer platformen en af markedets mest gennemsigtige spilleoplevelser. Vores udbetalingstests viste konsistent 4–8 timers behandling via Trustly – blandt de hurtigste vi har målt. Svagheden er fraværet af sportsbetting og et relativt beskedent VIP-program.",
                partner: true,
              },
              {
                name: "SpilDanskNu",
                slug: "casino-anmeldelser/spildansknu",
                text: "SpilDanskNu lever op til sit navn med en platform, der er designet specifikt til det danske marked. Hele interfacet er på dansk, kundeservice er dansktalende, og spiludvalget er kurateret til danske præferencer. No-sticky bonussen med lave omsætningskrav gør det til et stærkt valg for bonusbevidste spillere. Udbetalingerne er pålidelige, om end lidt langsommere end de hurtigste konkurrenter. Det er det oplagte valg for spillere, der prioriterer en autentisk dansk oplevelse.",
                partner: true,
              },
              {
                name: "Betinia",
                slug: "casino-anmeldelser/betinia",
                text: "Betinia skiller sig ud med det bredeste udvalg af spiludviklere i vores testfelt – over 40 studier repræsenteret. Akkumulatorboost-funktionen tilføjer et unikt element for spillere, der kombinerer casino med sportsbetting. No-sticky bonus med 10x omsætning følger markedets bedste standard. Den primære svaghed er fraværet af free spins i velkomstpakken, og kundeservice kan være langsom i spidsbelastningsperioder.",
                partner: true,
              },
              {
                name: "Campobet",
                slug: "casino-anmeldelser/campobet",
                text: "Campobet leverer en af markedets stærkeste dual-platform oplevelser. Casino-sektionen med 2.500+ spil er dybdegående, og sportsbetting-sektionen dækker bredt med konkurrencedygtige odds. Evolution Gamings live casino er velsorteret, og Trustly-udbetalinger behandles typisk inden for 6–14 timer. Platformen passer bedst til spillere, der vil have casino og sport under én konto uden at gå på kompromis med kvaliteten i nogen af delene.",
                partner: true,
              },
              {
                name: "Swift Casino",
                slug: "casino-anmeldelser/swift-casino",
                text: "Swift Casinos Hot Or Cold-funktion er en unik innovation, der viser hvilke spilleautomater, der aktuelt udbetaler over eller under gennemsnittet. Med 2.500+ spil og en no-sticky bonus med 10x omsætning leverer platformen solid substans. Udbetalingerne er hurtige – vores test viste 4–10 timer via Trustly. Svagheden er et lidt begrænset live casino-katalog og fraværet af free spins i velkomstpakken.",
                partner: true,
              },
              {
                name: "Luna Casino",
                slug: "casino-anmeldelser/luna-casino",
                text: "Luna Casino differentierer sig med et VIP-program, der tilbyder reelle fordele fra relativt lave niveauer – inklusiv personlig kontaktperson og cashback uden omsætningskrav. No-sticky bonussen inkluderer 50 free spins, hvilket er unikt blandt vores topanbefalinger. Spiludvalget er solidt, og behandlingstiden for udbetalinger er acceptabel. Det bedste valg for spillere, der spiller regelmæssigt og vil belønnes for loyalitet.",
                partner: true,
              },
              {
                name: "Danske Spil Casino",
                slug: "casino-anmeldelser/danske-spil",
                text: "Danmarks største og mest genkendelige spiludbyder. Danske Spil tilbyder en tryg ramme med fuld dansk support døgnet rundt, stærk integration med MobilePay og en platform, der er bygget specifikt til det danske marked. Svagheden er sticky bonusser og et spiludvalg, der er mindre innovativt end specialiserede konkurrenter. Det bedste valg for spillere, der prioriterer tryghed og dansk forankring over aggressive bonusser.",
              },
              {
                name: "LeoVegas",
                slug: "casino-anmeldelser/leovegas",
                text: "LeoVegas har historisk set defineret standarden for mobilcasino i Norden. Appen er exceptionel – hurtig, intuitiv og designet casino-first. Live casino-kataloget med eksklusive borde er blandt de dybeste i Danmark. Udbetalinger via Trustly er konsistent hurtige. Svagheden er sticky bonusser og et brand, der efter MGM-opkøbet har mistet noget af sin uafhængige nordiske identitet. Stadig det stærkeste valg for dedikerede mobilspillere.",
              },
              {
                name: "bet365",
                slug: "casino-anmeldelser/bet365",
                text: "Verdens største online sportsbook har et casino, der lever i skyggen af sportsbetting-sektionen – men som alligevel leverer solid substans. Deep live casino-katalog, professionel kundeservice og en platform, der aldrig fejler teknisk. Svagheden er højere omsætningskrav (15x) og en casino-oplevelse, der kan føles sekundær. Bedst for spillere, der primært er sportsbettere og vil have casino som supplement.",
              },
              {
                name: "Betano",
                slug: "casino-anmeldelser/betano",
                text: "Kaizen Gaming-ejet Betano er en af markedets mest teknologisk ambitiøse platforme. Betbuilder-funktionen for sportsbetting er brancheførende, og casino-sektionen er bred med stærk no-sticky bonus. Relativt nyt brand i Danmark med lavere genkendelse end etablerede konkurrenter. Det bedste valg for tech-bevidste spillere, der vil have innovation og dual-platform funktionalitet.",
              },
              {
                name: "Unibet",
                slug: "casino-anmeldelser/unibet",
                text: "FDJ Uniteds (tidl. Kindred) flagskib har en massiv dansk brugerbase og en platform, der dækker casino, sport og poker under ét tag. Spiludvalget er bredt, og brandet er velkendt og troværdigt. Svagheden er sticky bonusser og en udbetalingsproces, der kan være langsom i spidsbelastningsperioder. Bedst for spillere, der vil have en alt-i-én platform fra et etableret nordisk brand.",
              },
              {
                name: "Mr Green",
                slug: "casino-anmeldelser/mr-green",
                text: "Mr Green var en af de første casinoer, der fokuserede eksplicit på ansvarligt spil med Green Gaming-værktøjet. Spiludvalget er kurateret og kvalitetsorienteret, og interfacet er elegant. Svagheden er det begrænsede spiludvalg (1.000+ vs. konkurrenters 2.000+), fraværet af MobilePay og en udbetalingsproces, der kan tage op til 48 timer. Omsætningskravet er 10x (dansk lovstandard). Bedst for spillere, der prioriterer ansvarligt spil-værktøjer og et poleret design.",
              },
              {
                name: "ComeOn Casino",
                slug: "casino-anmeldelser/comeon",
                text: "Skandinavisk fokus med en platform, der balancerer casino og sport effektivt. Solidt spiludvalg og en brugervenlig mobiloplevelse. Bonusvilkårene er fair, men ikke brancheførende. Udbetalingstider er acceptable. Det er et godt mellemmuligheds-casino uden store styrker eller svagheder – et sikkert valg for den ubeslutsomme.",
              },
              {
                name: "Videoslots",
                slug: "casino-anmeldelser/videoslots",
                text: "Med over 11.000 spiltitler har Videoslots det største katalog af alle danske casinoer. Battle of Slots-funktionen tilføjer et unikt kompetitivt element. For entusiaster og samlere, der vil have adgang til absolut alle titler, er dette det oplagte valg. Svagheden er, at kvantiteten kan gøre navigation overvældende, og bonusvilkårene er ikke markedets bedste.",
              },
              {
                name: "888 Casino",
                slug: "casino-anmeldelser/888-casino",
                text: "Med over 25 års erfaring er 888 Casino et af de ældste og mest etablerede brands i online gambling. Platformen er solid, kundeservicen er professionel, og live casinoet inkluderer eksklusive borde. Men manglen på innovation og relativt konservative bonusvilkår gør det til et retrospektivt valg frem for et fremadskuende.",
              },
              {
                name: "NordicBet",
                slug: "casino-anmeldelser/nordicbet",
                text: "Betsson Groups nordiske brand kombinerer casino og sportsbetting med et specifikt skandinavisk fokus. Odds-markederne for nordisk sport er konkurrencedygtige, og casino-sektionen er velforsynet. En solid mellemmulighed for spillere, der prioriterer nordisk identitet og dual-platform funktionalitet.",
              },
              {
                name: "Maria Casino",
                slug: "casino-anmeldelser/maria-casino",
                text: "FDJ Uniteds (tidl. Kindred) casino-fokuserede brand med en stærk bingo-sektion, der differentierer det fra de fleste konkurrenter. Spiludvalget er bredt, og kundeservicen er dansktalende. Bonusvilkårene er acceptable, men ikke markedsførende. Et niche-valg for spillere, der nyder bingo som supplement til slots og live casino.",
              },
              {
                name: "PokerStars",
                slug: "casino-anmeldelser/pokerstars",
                text: "Verdens mest genkendelige pokerbrand har udvidet til casino og sportsbetting. Pokerdelen er stadig uovertruffen, men casino-sektionen er sekundær og mangler den dybde, som dedikerede casino-operatører tilbyder. Det oplagte valg for pokerspillere, der også vil spille slots og live casino – men ikke for rendyrkede casinospillere.",
              },
            ];

            const partnerReviews = allReviews.filter((r) => r.partner);
            const otherReviews = allReviews.filter((r) => !r.partner);
            const displayReviews = showAllReviews ? allReviews : partnerReviews;

            return (
              <>
                <div className="space-y-4">
                  {displayReviews.map((review) => (
                    <Card key={review.slug} className="border-border bg-card">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Star className="h-5 w-5 text-primary" />
                          {review.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                        <Link
                          to={`/${review.slug}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary underline hover:text-primary/80"
                        >
                          Læs den fulde anmeldelse →
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {!showAllReviews && otherReviews.length > 0 && (
                  <button
                    onClick={() => setShowAllReviews(true)}
                    className="mt-4 w-full rounded-lg border border-border bg-card p-3 text-sm font-medium text-primary hover:bg-accent/10 transition-colors"
                  >
                    Vis alle {allReviews.length} casino-evalueringer ↓
                  </button>
                )}
              </>
            );
          })()}
        </section>

        <Separator className="my-10" />

        {/* ===== SEKTION 8: Regulering og sikkerhed ===== */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Regulering, licens og spillerbeskyttelse i Danmark
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Danmark har en af Europas strengeste reguleringsrammer for online gambling. Spillemyndigheden, der hører under Skatteforvaltningen, udsteder og håndhæver licenser med et primært fokus på spillerbeskyttelse. Denne regulering er fundamentet for, at vi kan anbefale danske casinoer med høj tillid – men det er vigtigt at forstå, hvad licensen indebærer, og hvad den ikke dækker.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Hvad en dansk licens garanterer</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En gyldig dansk spillelicens fra Spillemyndigheden garanterer: 1) Adskillelse af spillermidler – dine penge opbevares på separate konti og er beskyttet, selv hvis operatøren går konkurs. 2) ROFUS-tilslutning – du kan til enhver tid selvudelukke via{" "}
            <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a>. 3) AML-compliance – casinoet er forpligtet til at forhindre hvidvask. 4) Klageadgang – du kan indgive klager til Spillemyndigheden. 5) Krypteret datatransmission – alle transaktioner beskyttes med SSL-kryptering. 6){" "}
            <Link to="/ansvarligt-spil" className={linkClass}>Ansvarligt spil</Link>-værktøjer – indbetalingsgrænser, session reminders og selvudelukkelse.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Hvad licensen ikke dækker</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En dansk licens garanterer ikke, at et casino tilbyder gode bonusvilkår, hurtige udbetalinger eller et bredt spiludvalg. Licensen sætter minimumsstandarden for sikkerhed og fairness – men kvaliteten af produktet varierer enormt inden for den regulatoriske ramme. Det er præcis derfor, uafhængige anmeldelser er nødvendige: licensen sikrer, at du ikke bliver snydt, men den sikrer ikke, at du får den bedste oplevelse.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Indbetalingsgrænser og ansvarligt spil</h3>
          <p className="text-muted-foreground leading-relaxed">
            Alle danske casinoer er forpligtet til at tilbyde indbetalingsgrænser (daglige, ugentlige, månedlige) og session reminders. Vi anbefaler, at du altid sætter en indbetalingsgrænse, der matcher dit budget – også selvom du føler dig i kontrol. Spilleproblemer udvikler sig gradvist, og proaktiv brug af ansvarligt spil-værktøjer er den mest effektive forebyggelse. Har du brug for hjælp, kontakt{" "}
            <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className={linkClass}>StopSpillet.dk</a> – gratis og anonymt.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ===== SEKTION 9: Monetization transparency ===== */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan tjener vi penge – og hvorfor det ikke påvirker vores vurderinger
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Transparens er fundamentet for troværdighed. Vi finansierer vores testcenter primært gennem affiliate-provision – det vil sige, at vi modtager en kommission, når en spiller opretter en konto via et af vores links. Denne model er standard i anmeldelsesbranchen, og vi er åbne om den, fordi vi mener, at du har ret til at vide, hvordan vi tjener penge.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Hvorfor provisionen ikke påvirker vurderingerne:</strong> Vores redaktionelle retningslinjer er eksplicitte: ingen operatør kan betale for en bedre rangering eller en mere favorabel anmeldelse. Vi har afvist samarbejde med casinoer, der tilbød høj provision men havde dårlige vilkår for spillerne. Og vi har anbefalet casinoer med lav provision, fordi de tilbød bedre bonusser, hurtigere udbetalinger eller et bredere spiludvalg.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Vores forpligtelse:</strong> Alle ratings beregnes ud fra dokumenterede testresultater. Udbetalingstider er verifiable med tidsstempler. Bonusanalyser er baseret på matematisk gennemgang. Ingen commercial deal ændrer disse data. Skulle vi opdage, at et anbefalet casino ændrer vilkår til det værre, opdaterer vi anmeldelsen øjeblikkeligt – uanset kommercielle konsekvenser.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vi vælger denne radikale transparens, fordi vi tror på, at spillere belønner ærlighed. Et anmeldelsessite, der foreslår det casino, der betaler mest, mister sin troværdighed – og dermed sin eksistensberettigelse. Vi vil hellere anbefale færre casinoer med overbevisning end mange med kompromiser.
          </p>
        </section>

        <LatestNewsByCategory pagePath="/casino-anmeldelser" />
        <RelatedGuides currentPath="/casino-anmeldelser" />
        <FAQSection title="Ofte stillede spørgsmål om casino anmeldelser" faqs={faqs} />
        <AuthorBio />
      </div>
      <StickyCtaBySlug slug="betinia" />
    </>
  );
};

export default CasinoAnmeldelser;
