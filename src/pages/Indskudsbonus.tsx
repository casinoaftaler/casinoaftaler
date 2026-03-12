import React from "react";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, buildVideoSchema, SITE_URL } from "@/lib/seo";
import indskudsbonusHero from "@/assets/heroes/indskudsbonus-hero.jpg";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sparkles,
  ShieldCheck,
  HelpCircle,
  User,
  CalendarDays,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Gift,
  Clock,
  Target,
  Gamepad2,
  DollarSign,
  Lock,
  TrendingUp,
  CreditCard,
  Scale,
  Calculator,
  Ban,
  BarChart3,
  Percent,
  Coins,
  Users,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";
import { BonusMoneyLinks } from "@/components/BonusMoneyLinks";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { YoutubeEmbed } from "@/components/YoutubeEmbed";

const linkClass = "text-primary underline hover:text-primary/80";

const indskudsbonusFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er den typiske matchprocent på danske indskudsbonusser?",
    answer: (
      <>
        De fleste danske casinoer tilbyder 100% match på den første indbetaling – altså krone-for-krone op til et maksimum på 1.000 kr. (lovkrav). Enkelte casinoer tilbyder velkomstpakker fordelt over flere indbetalinger. Sammenlign altid den totale pakkeværdi – ikke kun første indbetalings match. Tjek også om <Link to="/free-spins" className={linkClass}>free spins</Link> er inkluderet.
      </>
    ),
  },
  {
    question: "Hvilke betalingsmetoder kvalificerer til indskudsbonus?",
    answer: (
      <>
        De fleste betalingsmetoder kvalificerer, men visse e-wallets som Skrill og Neteller er ofte ekskluderet fra bonusaktivering hos danske casinoer. <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>, <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link> og <Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">Visa/Mastercard</Link> kvalificerer næsten altid. Tjek bonusvilkårene FØR du indbetaler – det er ærgerligt at opdage at din valgte betalingsmetode er udelukket efter indbetalingen er foretaget. Nogle casinoer giver ekstra free spins ved brug af specifikke metoder.
      </>
    ),
  },
  {
    question: "Er der forskel på en indskudsbonus og en velkomstbonus?",
    answer: (
      <>
        En <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> er altid en indskudsbonus – men ikke alle indskudsbonusser er velkomstbonusser. Velkomstbonussen er forbeholdt nye spillere og er typisk den mest generøse. Reload-indskudsbonusser gives til eksisterende spillere ved efterfølgende indbetalinger og har normalt lavere matchprocent (25-50%) og færre free spins. VIP-indskudsbonusser kan dog overgå velkomstbonussen i generøsitet for casinoets mest loyale spillere. Ugentlige reload-tilbud er en effektiv måde at strække dit spillebudget.
      </>
    ),
  },
  {
    question: "Hvad er den maksimale indsats per spin under bonusomsætning?",
    answer: "Alle danske indskudsbonusser har en maksimal indsats per spilrunde – typisk 25-50 kr. per spin. Overskrider du denne grænse, kan casinoet annullere hele bonussen og alle tilknyttede gevinster. Grænsen eksisterer for at forhindre højrisikostrategi med bonusmidler. Kontrollér altid den specifikke grænse i bonusvilkårene, da den varierer mellem casinoer. Visse spil med høj minimumsindsats (f.eks. progressive jackpots) kan automatisk overskride grænsen og bør undgås under bonusomsætning.",
  },
  {
    question: "Kan jeg annullere min indskudsbonus efter aktivering?",
    answer: (
      <>
        Ja, de fleste danske casinoer tillader bonusannullering via kundeservice eller kontoindstillinger. Konsekvenserne afhænger af bonustypen: med en <Link to="/no-sticky-bonus" className={linkClass}>no-sticky bonus</Link> beholder du egne penge og gevinster vundet hermed. Med en <Link to="/sticky-bonus" className={linkClass}>sticky bonus</Link> kan annullering betyde at du mister gevinster optjent med blandet saldo. Tip: Beslut dig FØR du begynder at spille. Hvis du allerede har vundet et stort beløb med egne penge og har en no-sticky bonus, kan det være klogest at hæve med det samme uden at røre bonusdelen.
      </>
    ),
  },
  {
    question: "Hvor hurtigt kan man gennemspille en indskudsbonus på 10x?",
    answer: "Med 10x (d+b) omsætning på en typisk 500 kr. + 500 kr. bonus skal du satse for 10.000 kr. Med en gennemsnitlig indsats på 5 kr. per spin kræver det 2.000 spins. Ved en spinrate på 10 sekunder per spin tager det ca. 5,5 timer aktiv spilletid. Med en 96% RTP-slot vil du statistisk beholde ca. 600 kr. af dine samlede 1.000 kr. Det er ikke garanteret – volatilitet betyder at udfaldet kan variere fra 0 kr. til flere tusinde. Planlæg realistisk og spred sessionerne over flere dage.",
  },
];

const Indskudsbonus = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(indskudsbonusFaqs);

  const articleJsonLd = buildArticleSchema({
    headline: "Indskudsbonus – Komplet Guide til Matchbonusser 2026",
    description: "Alt du skal vide om indskudsbonusser hos danske casinoer. Matchbonusser, betingelser og strategier.",
    url: `${SITE_URL}/indskudsbonus`,
    datePublished: "2025-06-01",
    dateModified: "2026-02-20",
    videoId: "hMHHVA6vH0Y",
  });

  const videoJsonLd = buildVideoSchema(`${SITE_URL}/indskudsbonus`, "hMHHVA6vH0Y", {
    title: "Indskudsbonus – Matchbonus forklaret på dansk",
    description: "Jonas gennemgår hvad en indskudsbonus er, og hvordan matchbonusser fungerer hos danske casinoer.",
    uploadDate: "2026-02-20",
    duration: "PT1M30S",
  });

  return (
    <>
      <SEO
        title="Indskudsbonus – Komplet Guide til Matchbonusser 2026 | Casinoaftaler"
        description="Alt du skal vide om indskudsbonusser hos danske casinoer. Lær hvordan matchbonusser fungerer, betingelser, aktivering og strategier for at maksimere din bonus."
        jsonLd={[faqJsonLd, articleJsonLd, videoJsonLd]}
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
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Indskudsbonus på Danske Casinoer
            </h1>
            <p className="text-lg text-white/80">
              En indskudsbonus matcher din indbetaling og giver dig ekstra
              spillemidler. Lær hvordan de fungerer, hvilke betingelser der
              gælder, og hvordan du får mest ud af din bonus.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="20-02-2026" readTime="18 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={indskudsbonusHero} alt="Indskudsbonus – gyldne mønter og deposit bonus" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Indskudsbonus i praksis: Et regneeksempel
          </h2>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med en indbetaling på 500 kr. og 100 % match får du 1.000 kr. at spille for – men hvad er bonussen reelt værd efter omsætningskravene? Den reelle værdi afhænger af <Link to="/ordbog/rtp" className={linkClass}>RTP</Link>'en på de spil du vælger. En indskudsbonus (også kaldet matchbonus) matcher din indbetaling med en procentdel og bruges ofte som{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">
              velkomstbonus
            </Link>{" "}
            til nye spillere, men tilbydes også som reload-tilbud til loyale kunder.
          </p>
          <p className="mb-8 text-muted-foreground leading-relaxed">
            En indskudsbonus kaldes også for en matchbonus, da den netop
            matcher en procentdel af din indbetaling. Det er en central del af vores samlede <Link to="/casino-bonus" className="text-primary underline hover:text-primary/80">casino bonus oversigt</Link>. Alle indskudsbonusser
            kommer med{" "}
            <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
              omsætningskrav
            </Link>
            , som skal opfyldes før udbetaling. Mange indskudsbonusser
            inkluderer desuden{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">
              free spins
            </Link>{" "}
            som en ekstra fordel. Foretrækker du ingen risiko, kan du i
            stedet kigge efter en{" "}
            <Link to="/bonus-uden-indbetaling" className="text-primary underline hover:text-primary/80">
              bonus uden indbetaling
            </Link>
            . Du kan også optjene ekstra bonus spins ved at deltage i vores <Link to="/community/rewards" className="text-primary underline hover:text-primary/80">rewards program</Link>.
          </p>

          <YoutubeEmbed
            videoId="hMHHVA6vH0Y"
            title="Hvad er en indskudsbonus på danske casinoer?"
            description="Vi forklarer hvad en indskudsbonus (matchbonus) er på danske casinoer, hvordan den aktiveres, hvad omsætningskrav betyder for din reelle bonusværdi, og hvilke betingelser du skal kende til."
            duration="PT1M2S"
            viewCount={3}
            uploadDate="2026-02-20"
            articleUrl="https://casinoaftaler.dk/indskudsbonus"
          />

          <div className="rounded-lg border border-border bg-muted/30 p-5">
            <h3 className="mb-2 text-lg font-semibold">
              Her gennemgår vores streamer og forfatter Jonas, hvad en indskudsbonus er
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              <Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> forklarer indskudsbonussens mekanik med konkrete regneeksempler – hvad en 100% matchbonus faktisk er værd, og hvad du skal tjekke i vilkårene inden du aktiverer. Videoen supplerer vores guides om{" "}
              <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link>,{" "}
              <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> og{" "}
              <Link to="/free-spins" className={linkClass}>free spins</Link>.
            </p>
          </div>
        </section>

        <InlineCasinoCards title="Bedste casinoer med indskudsbonus" count={6} />

        <Separator className="my-10" />

        {/* Sådan fungerer det */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan fungerer en indskudsbonus
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            En indskudsbonus fungerer ved at casinoet matcher din
            indbetaling med en bestemt procentsats. Casinoet lægger altså
            ekstra penge oveni dit indskud, som du kan bruge til at spille
            for. Alle bonusser kommer dog med vilkår og betingelser, som
            skal opfyldes, inden gevinster kan udbetales.
          </p>

          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Percent className="h-5 w-5 text-primary" />
                  100% Matchbonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Den mest udbredte form. Casinoet fordobler din indbetaling
                  op til et bestemt maksimumbeløb. Indbetaler du f.eks.
                  500 kr., modtager du yderligere 500 kr. i bonuspenge –
                  i alt 1.000 kr. at spille for.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-primary" />
                  Eksempel på beregning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Indbetaler du 700 kr. med 100% matchbonus, får du 700 kr.
                  ekstra. Samlet resultat: 1.400 kr. til rådighed. Nogle
                  bonusser inkluderer også{" "}
                  <Link to="/free-spins" className="text-primary underline hover:text-primary/80">
                    gratis spins
                  </Link>{" "}
                  oven i hatten, der typisk skal bruges på udvalgte spillemaskiner.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Velkomstbonus som indskudsbonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mange casinoer bruger indskudsbonussen som{" "}
                  <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">
                    velkomstbonus
                  </Link>{" "}
                  til nye spillere. Denne gælder kun på første indbetaling
                  og kan ikke genaktiveres senere. Andre casinoer tilbyder
                  også løbende indskudsbonusser til eksisterende kunder.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        <Separator className="my-10" />

        {/* Trin-for-trin */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan aktiverer du en indskudsbonus
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Processen for at gøre krav på en indskudsbonus er stort set den
            samme hos alle danske casinoer. Her er en trin-for-trin guide.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Trin 1: Vælg casino og bonus",
                desc: "Sammenlign bonusser og læs anmeldelser for at finde det bedste tilbud. Husk at kigge på betingelserne – ikke kun bonusbeløbet.",
                icon: Target,
              },
              {
                title: "Trin 2: Opret en spillekonto",
                desc: "Registrer dig hos det valgte casino med dine personlige oplysninger og kontaktinformationer.",
                icon: User,
              },
              {
                title: "Trin 3: Bekræft din identitet",
                desc: "Verificer din identitet via MitID. Det sikrer, at din konto er beskyttet, og at udbetalinger sker til den rette person.",
                icon: ShieldCheck,
              },
              {
                title: "Trin 4: Vælg kampagne og aktiver",
                desc: "Gå til kampagnesektionen og vælg din bonus. Hvis en bonuskode kræves, skal den indtastes ved indbetaling.",
                icon: Gift,
              },
              {
                title: "Trin 5: Indbetal og spil",
                desc: "Foretag din indbetaling, og bonussen tilføjes automatisk. Vælg herefter spil, der tæller med i omsætningskravet.",
                icon: Gamepad2,
              },
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

        {/* Betingelser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Gældende betingelser for indskudsbonusser
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Alle bonusser kommer med vilkår og betingelser. Hvis du overser
            vigtige krav, risikerer du at miste både bonussen og eventuelle
            gevinster. Her er de vigtigste punkter at holde øje med.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Omsætningskrav
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Angiver hvor mange gange bonusbeløbet skal gennemspilles,
                  før gevinster kan hæves. Typisk 5x–10x (d+b) i Danmark.
                  Læs mere om{" "}
                  <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
                    omsætningskrav
                  </Link>{" "}
                  i vores dybdegående guide.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="h-5 w-5 text-primary" />
                  Indsatsgrænser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  En øvre grænse for din indsats per spilrunde med
                  bonuspenge – oftest omkring 50 kr. per spin på
                  spilleautomater. Overskrides grænsen, kan bonussen
                  annulleres.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  Tidsbegrænsning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  De fleste bonusser skal gennemspilles inden for 60 dage.
                  Overholdes fristen ikke, bortfalder bonussen automatisk
                  sammen med eventuelle gevinster.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Profitgrænse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Et loft over hvor meget du kan udbetale fra
                  bonusgevinster. Tjek altid denne grænse, inden du
                  accepterer en bonus, så du undgår skuffelser.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Spilbidrag
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Forskellige spiltyper bidrager forskelligt til
                  omsætningskravet. Slots tæller typisk 100%, mens
                  bordspil som blackjack kun bidrager ca. 10%.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Ban className="h-5 w-5 text-primary" />
                  Udbetalingsbegrænsninger
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Der kan være krav til specifikke betalingsmetoder ved
                  udbetaling, samt et maksimalt beløb per hævning. E-wallets
                  som <Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link> og Neteller er ofte undtaget.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Hvilke spil */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvilke spil kan du spille med en indskudsbonus?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvert casino bestemmer selv, hvilke spil der er tilgængelige med
            bonuspenge. Typisk er bonusser rettet mod spilleautomater, men
            nogle casinoer inkluderer også bordspil og endda live casino.
            Tjek altid regler og vilkår for at vide præcis, hvilke titler
            der tæller med i omsætningskravet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Casinoer forsøger ofte at promovere nye spiltitler fra populære
            softwareudviklere via bonusser. Nogle gange er bonussen
            begrænset til få udvalgte spilleautomater, mens andre casinoer
            tilbyder en kombination af spillemaskiner og bordspil som
            roulette eller blackjack.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Sammenligning */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Indskudsbonusser sammenlignet med andre bonusser
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Indskudsbonusser har nogle klare fordele sammenlignet med andre
            kampagnetyper. Mens en{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">
              velkomstbonus
            </Link>{" "}
            kun kan bruges af nye spillere, kan indskudsbonusser bruges af
            alle – både nye og eksisterende kunder. Det gør den til en af de
            mest generøse bonusser i den danske spilindustri.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <Link to="/bonus-uden-indbetaling" className="text-primary underline hover:text-primary/80">
              Bonus uden indbetaling
            </Link>{" "}
            er attraktive, da de giver chancen for at vinde rigtige penge
            uden risiko, men de kommer ofte med sværere{" "}
            <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
              omsætningskrav
            </Link>
            . Cashback-bonusser er ideelle for loyale spillere med store
            indsatser.{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">
              Gratis spins
            </Link>{" "}
            er perfekte for nye spillere, der vil prøve spil uden at bruge
            egne penge. Du kan også overveje en{" "}
            <Link to="/no-sticky-bonus" className="text-primary underline hover:text-primary/80">
              no-sticky bonus
            </Link>
            , hvis du vil holde dine egne penge adskilt fra bonuspengene.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Hvem er den egnet til */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvem er indskudsbonus egnet til?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Indskudsbonusser er fleksible og kan passe til mange typer
            spillere. Hvis den anvendes som{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">
              velkomstbonus
            </Link>
            , er den forbeholdt nye kunder. Hvis den derimod tilbydes som en
            løbende kampagne, kan alle spillere drage fordel af den – både
            VIP'er, nye spillere og dem der har været der i kort tid.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det er netop denne fleksibilitet, der gør indskudsbonussen til
            en af de bedste bonustyper blandt danske online casinoer.
          </p>
        </section>

        <Separator className="my-10" />

        {/* EV-analyse af indskudsbonus */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Match-% vs. reel værdi: En matematisk analyse
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En højere match-procent betyder ikke altid en bedre bonus. Den reelle værdi afhænger af samspillet mellem match-%, omsætningskrav og bonusstruktur (<Link to="/sticky-bonus" className={linkClass}>sticky</Link> vs. <Link to="/no-sticky-bonus" className={linkClass}>no-sticky</Link>). Her er tre typiske indskudsbonusser sammenlignet matematisk.
          </p>

          <div className="space-y-4">
            <Card className="border-primary/30 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-primary" />
                  100% match, 1.000 kr. max, no-sticky, 3x (b)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Indbetaling 1.000 kr. + 1.000 kr. bonus. Omsætning: 3 × 1.000 = 3.000 kr. Tab: 3.000 × 0,04 = 120 kr. No-sticky: egne gevinster frie. <strong>EV = 880 kr.</strong> (88% af nominel værdi). Bedste scenarie for en indskudsbonus.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-primary" />
                  100% match, 1.000 kr. max, sticky, 10x (d+b)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Indbetaling 1.000 kr. + 1.000 kr. bonus = 2.000 kr. saldo. Omsætning: 10 × 2.000 = 20.000 kr. Tab: 20.000 × 0,04 = 800 kr. Saldo: 2.000 – 800 = 1.200 kr. Minus bonus: <strong>EV = 200 kr.</strong>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-primary" />
                  50% match, 500 kr. max, no-sticky, 1x (b)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Indbetaling 1.000 kr. + 500 kr. bonus. Omsætning: 1 × 500 = 500 kr. Tab: 500 × 0,04 = 20 kr. <strong>EV = 480 kr.</strong> (96% af nominel værdi). Lavere match-%, men næsten fuld reel værdi. Beviser at lav match-% med gode vilkår slår høj match-% med dårlige.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 rounded-lg border border-primary/30 bg-accent/30 p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Tommelfingerregel for indskudsbonusser:</strong> Prioritér altid omsætningskrav og bonusstruktur over match-%. En 50% no-sticky med 1x (b) kan være matematisk overlegen til en 100% sticky med 10x (d+b). Beregn altid EV før du accepterer en indskudsbonus.
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Spillerprofiler */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvilken indskudsbonus passer til din spillertype?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Slot-spilleren", desc: "Vælg indskudsbonus med 100% bidrag fra slots og lav omsætning. Med 96%+ RTP slots og ≤5x omsætning er din EV typisk 70-90% af bonusbeløbet. Kombinér gerne med free spins-pakke for maksimal spilletid.", icon: Sparkles },
              { title: "Bordspil-entusiasten", desc: "Vær varsom. Med kun 10% bidrag fra bordspil kræver en 10x (d+b) bonus reelt 100x i bordspilsindsatser. Overvej bonus uden omsætningskrav eller cashback-bonusser, der giver mere fleksibilitet i spilvalg.", icon: Gamepad2 },
              { title: "Den forsigtige spiller", desc: "Prioritér no-sticky bonusser med lav match-% og lav omsætning. Din indbetaling forbliver uberørt, og du kan hæve gevinster frit. En 50% match med 1x (b) er ideel – lav risiko, høj EV-procent.", icon: ShieldCheck },
              { title: "Bonus-optimisten", desc: "Pas på med at jagte den højeste bonus. En 1.000 kr. bonus lyder fantastisk, men med sticky-struktur og 10x (d+b) er den reelle værdi lavere end man tror. Lad matematik – ikke markedsføring – styre dit valg.", icon: AlertTriangle },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <item.icon className="h-5 w-5 text-primary" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Indskudsbonus markedsoverblik */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Indskudsbonus i Danmark 2026 – Trends og markedsoverblik
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Indskudsbonus er fortsat den mest populære bonustype på det danske casinomarked i 2026. Næsten alle danske casinoer bruger en indskudsbonus som deres primære <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonus</Link>, og konkurrencen om at tilbyde den bedste indskudsbonus presser vilkårene i en stadig mere spillervenlig retning.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den typiske indskudsbonus i Danmark tilbyder 100% match op til 1.000 kr. med omsætningskrav på 5-10x. Det er det maksimale beløb tilladt ved lov for en velkomstbonus. Den bedste indskudsbonus balancerer et generøst matchbeløb med fair vilkår.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En vigtig udvikling er, at flere indskudsbonusser nu tilbydes med <Link to="/no-sticky-bonus" className="text-primary underline hover:text-primary/80">no-sticky struktur</Link>, som holder din indbetaling adskilt fra bonusmidlerne. Det betyder, at du kan hæve gevinster fra din egen indbetaling uden omsætningskrav – en klar fordel i forhold til den traditionelle <Link to="/sticky-bonus" className="text-primary underline hover:text-primary/80">sticky indskudsbonus</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Mange indskudsbonusser inkluderer også <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link> som ekstra bonus oven i matchbeløbet. Disse kombinerede pakker giver dig både ekstra spillekapital og gratis omgange på populære spilleautomater, hvilket gør indskudsbonussen til det mest alsidige bonustilbud på markedet.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Reload-bonusser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Reload-bonusser: Indskudsbonussens tilbagevendende fætter
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Mens <Link to="/velkomstbonus" className={linkClass}>velkomstbonussen</Link> er en engangsforeteelse, er reload-bonusser tilbagevendende indskudsbonusser designet til at fastholde eksisterende spillere. Forstår du mekanikken, kan de udgøre en væsentlig del af din langsigtede bonusstrategi. Reload-bonusser tilbydes typisk ugentligt, månedligt eller ved særlige lejligheder (helligdage, store sportsbegivenheder, nye spil-lanceringer).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Typiske vilkår for reload-bonusser:</strong> Match-procenten er lavere end velkomstbonussen – typisk 25-50% i stedet for 100%. Til gengæld har reload-bonusser ofte mere favorable vilkår: lavere omsætningskrav (3-5x vs. 10x), kortere gyldighedsperiode (7-14 dage) og højere maks-indsatsgrænse. Nogle casinoer tilbyder omsætningsfrie reload-spins som alternativ til kontantbonusser.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>EV-sammenligning:</strong> En reload-bonus på 50% match med 3x (b) omsætning har ofte højere EV per krone end en velkomstbonus med 100% match og 10x (d+b). Eksempel: 500 kr. indbetaling + 250 kr. reload (50% match). Omsætning: 250 × 3 = 750 kr. Tab: 750 × 0,04 = 30 kr. EV = 220 kr. (88% reel værdi). Sammenlign med velkomstbonussens typiske 60-80% reelle værdi – reload-bonussen er ofte matematisk overlegen.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Strategisk tip:</strong> Hold øje med weekendkampagner og helligdags-tilbud. Mange danske casinoer tilbyder forstærkede reload-bonusser (75-100% match) i begrænset tid. Tilmeld dig casinoets nyhedsbrev og notifikationer for at modtage disse tidsbegrænsede tilbud, der kan være mere værdifulde end selve velkomstbonussen.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Betalingsmetoder */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Betalingsmetoder og bonusaktivering: Hvad du skal vide
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ikke alle <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> er skabt lige når det kommer til bonusaktivering. Din valgte indbetalingsmetode kan afgøre, om du modtager bonussen overhovedet – og i nogle tilfælde hvilke vilkår der gælder. Her er en teknisk gennemgang af de mest brugte metoder og deres bonuskompatibilitet.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "MobilePay ✅ Fuld kompatibilitet", desc: "Danmarks foretrukne betalingsmetode kvalificerer næsten altid til bonusaktivering. Indbetalinger er øjeblikkelige og kræver ingen kortoplysninger hos casinoet. Visse casinoer tilbyder ekstra free spins ved MobilePay-indbetaling som differentiering.", icon: CheckCircle2 },
              { title: "Visa/Mastercard ✅ Fuld kompatibilitet", desc: "Kort-indbetalinger kvalificerer universelt til alle indskudsbonusser. Udbetalinger via kort kan dog tage 1-3 bankdage. Sikkerhedstip: Brug altid 3D Secure-verifikation for ekstra beskyttelse ved online transaktioner.", icon: CreditCard },
              { title: "Trustly ✅ Fuld kompatibilitet", desc: "Bank-til-bank overførsler via Trustly kvalificerer til bonusaktivering hos alle danske casinoer. Fordelen er hurtig udbetaling (ofte 1-2 timer) direkte til din bankkonto – ideel for spillere der vil hæve bonusgevinster hurtigt.", icon: CheckCircle2 },
              { title: "Skrill/Neteller ⚠️ Ofte ekskluderet", desc: "E-wallets som Skrill og Neteller er hyppigt ekskluderet fra bonusaktivering. Grunden er historisk misbrug af bonusser via e-wallet-konti. Tjek ALTID vilkårene. Hvis din foretrukne metode er Skrill, overvej at bruge Trustly til bonusindbetalingen.", icon: AlertTriangle },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <item.icon className="h-5 w-5 text-primary" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Skatteforhold */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Indskudsbonus og skatteforhold i Danmark
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Et ofte overset aspekt ved indskudsbonusser er skattebehandlingen. Gevinster fra <Link to="/casinoer/casino-og-skat" className={linkClass}>danske licenserede casinoer</Link> er skattefrie for spilleren – uanset om de stammer fra egne midler eller bonuspenge. Casinoet afregner 28% spilleafgift direkte til SKAT, og dette er allerede indregnet i spillenes RTP. Du modtager altid nettobeløbet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Udenlandske casinoer uden dansk licens:</strong> Her er situationen fundamentalt anderledes. Gevinster over 200 kr. fra udenlandske casinoer er skattepligtig indkomst, du selv skal indberette. En indskudsbonus på et udenlandsk casino kan derfor reelt koste dig op til 52% i skat af gevinsten – en faktor der dramatisk reducerer bonussens EV. Med en dansk bonus er hele gevinsten din; med en udenlandsk bonus beholder du potentielt kun halvdelen.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Konklusion:</strong> Skattemæssigt er indskudsbonusser hos danske casinoer markant mere fordelagtige end udenlandske. En dansk 100% match med 10x omsætning og EV på 200 kr. giver dig 200 kr. netto. Den "samme" bonus på et udenlandsk casino giver dig 96-104 kr. netto efter skat – halvdelen. Licensering er en direkte økonomisk fordel for dig som spiller.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Ansvarligt spil */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Indbetalingsmønster og ansvarligt spil
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En indskudsbonus kan friste til at indbetale mere end planlagt for at maksimere matchbeløbet. Det er en fælde – indbetal aldrig mere, end du ville have spillet for uden bonussen. Dit spillebudget bør fastlægges uafhængigt af bonustilbuddet. En tommelfingerregel: hvis du normalt spiller for 300 kr. per session, bør en bonus ikke ændre dette beløb.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Casinoernes psykologiske strategi:</strong> Veldesignede bonusser bruger "anchoring" – de præsenterer et højt maksimumbeløb (f.eks. "op til 5.000 kr.") for at motivere dig til at indbetale mere end du ellers ville. Husk at du ikke skal ramme maksimum for at få værdi af bonussen. En 100% match på 300 kr. giver dig stadig 300 kr. ekstra at spille for.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Brug casinoets indbetalingsgrænser aktivt, og overvej{" "}
            <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>{" "}
            til selvudelukkelse, hvis indbetalingerne begynder at overstige dit budget. Rådgivning findes hos{" "}
            <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>. 18+ | Spil ansvarligt.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Unik konklusion */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Tre nøgletal der afgør din indskudsbonus' værdi</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Efter at have analyseret hundredvis af danske indskudsbonusser kan vi destillere værdivurderingen ned til tre tal, der afgør alt. Kender du disse tre nøgletal, kan du vurdere enhver indskudsbonus på under 30 sekunder.
          </p>
          <div className="space-y-3">
            {[
              {
                icon: Percent,
                title: "Nøgletal #1: Reel omsætningsfaktor",
                desc: "Beregn den reelle omsætning i kroner: (Indbetaling + Bonus) × Omsætningskrav for (d+b), eller Bonus × Omsætningskrav for (b). Under 5.000 kr. total omsætning = god bonus. Over 15.000 kr. = overvej alternativer.",
              },
              {
                icon: Calculator,
                title: "Nøgletal #2: EV-procent",
                desc: "EV divideret med bonusbeløb giver din EV-procent. Over 70% = exceptionel bonus. 40-70% = acceptabel. Under 40% = dårlig bonus. De bedste danske indskudsbonusser scorer 75-90% EV-procent.",
              },
              {
                icon: Scale,
                title: "Nøgletal #3: Sticky/no-sticky-ratio",
                desc: "No-sticky bonusser giver 2-3x højere EV end sticky bonusser med identiske vilkår. Hvis to bonusser har samme match-% og omsætning, vælg ALTID no-sticky. Denne ene faktor kan betyde forskellen på positiv og negativ EV.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-lg border border-primary/30 bg-accent/30 p-4"
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

        <LatestNewsByCategory pagePath="/indskudsbonus" />
        <RelatedGuides currentPath="/indskudsbonus" />

        <FAQSection title="Ofte stillede spørgsmål om indskudsbonus" faqs={indskudsbonusFaqs} />

        <AuthorBio />
      </div>
      <StickyCtaBySlug slug="spildansknu" />
    </>
  );
};

export default Indskudsbonus;
