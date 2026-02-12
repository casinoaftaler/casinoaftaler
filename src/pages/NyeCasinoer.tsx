import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CasinoCard } from "@/components/CasinoCard";
import { RelatedGuides } from "@/components/RelatedGuides";
import { useCasinos } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useState, useMemo, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sparkles,
  ShieldCheck,
  Smartphone,
  Trophy,
  Star,
  Clock,
  CreditCard,
  Gamepad2,
  Users,
  TrendingUp,
  CheckCircle2,
  Loader2,
  HelpCircle,
  User,
  CalendarDays,
  BookOpen,
} from "lucide-react";

const PRIORITY_SLUGS = ["spildansknu", "spilleautomaten"];

const DANISH_MONTHS = [
  "Januar", "Februar", "Marts", "April", "Maj", "Juni",
  "Juli", "August", "September", "Oktober", "November", "December",
];

function getDanishMonthYear() {
  const now = new Date();
  return `${DANISH_MONTHS[now.getMonth()]} ${now.getFullYear()}`;
}

const linkClass = "text-primary underline hover:text-primary/80";

const nyeCasinoerFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvordan finder vi nye casinoer til vores side?",
    answer: (
      <>
        Vi holder konstant øje med det danske marked og tester nye casinoer grundigt, så snart de lancerer. Alle spillesteder på vores liste har gyldig dansk licens fra Spillemyndigheden. Læs mere om vores tilgang på{" "}
        <Link to="/about" className={linkClass}>Om Os</Link>-siden.
      </>
    ),
  },
  {
    question: "Hvordan er sikkerheden hos casinoerne på siden?",
    answer: (
      <>
        Alle casinoer på Casinoaftaler.dk har dansk licens og anvender SSL-kryptering til at beskytte dine data. Vi tjekker også, at de tilbyder ansvarligt spil-værktøjer som ROFUS. Læs mere om{" "}
        <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>.
      </>
    ),
  },
  {
    question: "Er de nye casinoer stabile?",
    answer:
      "Ja – vi anbefaler kun casinoer, der har vist sig stabile og pålidelige. Mange nye casinoer drives af erfarne operatører med årelang erfaring i branchen.",
  },
  {
    question: "Hvad er de bedste og sikreste licenser?",
    answer:
      "Den danske licens fra Spillemyndigheden er den vigtigste for danske spillere. Andre anerkendte licenser inkluderer Malta Gaming Authority (MGA) og UK Gambling Commission.",
  },
  {
    question: "Er der live casino hos nye casinoer?",
    answer: (
      <>
        Ja, de fleste nye casinoer tilbyder{" "}
        <Link to="/live-casino" className={linkClass}>live casino</Link>{" "}
        med spil som blackjack, roulette og baccarat fra førende{" "}
        <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link> som Evolution Gaming.
      </>
    ),
  },
  {
    question: "Hvem er de bedste casinoer online?",
    answer: (
      <>
        Det afhænger af dine præferencer. Vi anbefaler at sammenligne{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>,{" "}
        spiludvalg og udbetalingstider. Tjek vores topliste for et overblik over de bedste muligheder.
      </>
    ),
  },
  {
    question: "Hvad er kvaliteten på casinoerne?",
    answer: (
      <>
        Vi vurderer hvert casino ud fra bonus, spiludvalg,{" "}
        <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>,{" "}
        kundeservice og mobiloplevelse. Kun casinoer, der lever op til vores standarder, kommer på listen.
      </>
    ),
  },
  {
    question: "Hvorfor bør jeg vælge et nyt casino?",
    answer: (
      <>
        Nye casinoer tilbyder ofte bedre{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>,{" "}
        moderne design og innovative funktioner for at tiltrække spillere. Det kan betyde bedre værdi for dig.
      </>
    ),
  },
  {
    question: "Skal jeg vælge et nyt eller et etableret casino?",
    answer:
      "Begge har fordele. Nye casinoer giver friske bonusser og moderne oplevelser, mens etablerede spillesteder har dokumenteret pålidelighed. Det vigtigste er dansk licens.",
  },
  {
    question: "Er der bonusser hos Casinoaftaler?",
    answer: (
      <>
        Vi formidler bonusser fra de casinoer, vi anbefaler. Du finder altid opdaterede{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>,{" "}
        <Link to="/free-spins" className={linkClass}>free spins</Link> og eksklusive tilbud på vores side.
      </>
    ),
  },
  {
    question: "Kan jeg spille casino på mobilen?",
    answer:
      "Ja, alle casinoer på vores liste er fuldt optimeret til mobil. De fleste tilbyder en browserbaseret mobiloplevelse, der fungerer på både iOS og Android.",
  },
];

const NyeCasinoer = () => {
  const { data: casinos, isLoading } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);

  const heroBackgroundImage = siteSettings?.hero_background_image;

  const newCasinos = casinos
    ?.filter((c) => c.is_active)
    ?.sort((a, b) => {
      const aIdx = PRIORITY_SLUGS.indexOf(a.slug);
      const bIdx = PRIORITY_SLUGS.indexOf(b.slug);
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })
    ?.slice(0, 8) ?? [];

  const mapCasino = (casino: typeof newCasinos[0]) => ({
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": nyeCasinoerFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof faq.answer === "string" ? faq.answer : faq.question,
      },
    })),
  };

  return (
    <>
      <SEO
        title="Nye Casinoer 2026 – Bedste Nye Online Casinoer i Danmark"
        description="Opdateret liste over de bedste nye casinoer i Danmark 2026. Sammenlign bonusser, free spins og vilkår hos nye spillesteder med dansk licens."
        jsonLd={faqJsonLd}
      />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Nye Casinoer i Danmark
            </h1>
            <p className="text-lg text-white/80">
              Oplev de seneste danske online casinoer med friske bonusser, moderne
              spiloplevelser og dansk licens. Vi har samlet et komplet overblik, så du
              nemt kan finde dit næste spillested.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        {/* Meta info bar */}
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>Skrevet af: <span className="font-medium text-foreground">Casinoaftaler</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>Siden opdateret: <span className="font-medium text-foreground">11-02-2026</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>Læsetid: <span className="font-medium text-foreground">4 Min.</span></span>
          </div>
        </div>

        {/* Intro Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Overblik over nye casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Nye casinoer dukker jævnligt op på det danske marked, og det kan være
            svært at bevare overblikket. Hos Casinoaftaler.dk gennemgår vi hvert nyt
            spillested grundigt – fra{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> og spiludvalg til{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>, behandlingstider og kundeservice. Alle casinoer på
            vores liste har dansk licens fra Spillemyndigheden, SSL-kryptering og
            overholder gældende lovgivning.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vores mål er at give dig et ærligt og pålideligt billede, så du kan tage
            en informeret beslutning, når du vælger dit næste spillested. Læs også vores{" "}
            <Link to="/bonus-guide" className={linkClass}>bonus guide</Link> for at forstå de forskellige bonustyper, eller se vores dybdegående artikler om{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> og{" "}
            <Link to="/free-spins" className={linkClass}>free spins</Link>.
          </p>
        </section>

        {/* New Casinos List */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Nye casinoer i Danmark {getDanishMonthYear()}
          </h2>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : newCasinos.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              Ingen nye casinoer tilgængelige i øjeblikket.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                {newCasinos.slice(0, 2).map((casino, index) => (
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
              {newCasinos.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  {newCasinos.slice(2).map((casino, index) => (
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

        {/* Why Choose New Casinos */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Hvorfor vælge et nyt casino?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Friske velkomstbonusser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Nye casinoer tilbyder ofte generøse{" "}
                  <Link to="/velkomstbonus" className={linkClass}>velkomstpakker</Link> for at tiltrække
                  spillere – det kan betyde bedre match-bonusser, flere{" "}
                  <Link to="/free-spins" className={linkClass}>free spins</Link>{" "}
                  og lavere{" "}
                  <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Moderne spiloplevelse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Nyere platforme er bygget med den seneste teknologi fra førende{" "}
                  <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link>, hvilket
                  betyder hurtigere loading, bedre mobiloplevelse og et mere
                  intuitivt design.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Nye trends og features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Nye spillesteder eksperimenterer med innovative funktioner som
                  gamification, VIP-lounges,{" "}
                  <Link to="/live-casino" className={linkClass}>live-turneringer</Link> og personlige
                  bonustilbud.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What We Look For */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Hvad vi kigger efter ved nye casinoer
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Når et nyt casino dukker op på det danske marked, gennemgår vi det med
            samme grundighed som etablerede spillesteder. Læs mere om vores metode på{" "}
            <Link to="/about" className={linkClass}>Om Os</Link>-siden. Her er de vigtigste
            faktorer, vi vurderer:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Dansk licens</h3>
                <p className="text-sm text-muted-foreground">
                  Alle casinoer på vores liste har gyldig licens fra
                  Spillemyndigheden – din sikkerhed er altid i centrum.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Star className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Bonus og vilkår</h3>
                <p className="text-sm text-muted-foreground">
                  Vi evaluerer{" "}
                  <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>,{" "}
                  <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>, gyldighed og om
                  vilkårene er gennemsigtige og fair.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CreditCard className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Betalingsmetoder</h3>
                <p className="text-sm text-muted-foreground">
                  MobilePay, Trustly, Visa og andre populære metoder – vi tjekker
                  at ind- og udbetalinger kører hurtigt og sikkert. Læs vores{" "}
                  <Link to="/betalingsmetoder" className={linkClass}>guide til betalingsmetoder</Link>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Smartphone className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Mobiloplevelse</h3>
                <p className="text-sm text-muted-foreground">
                  De fleste spiller fra mobilen – derfor tester vi altid om
                  casinoet fungerer gnidningsfrit på alle enheder.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Trophy className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Spiludvalg</h3>
                <p className="text-sm text-muted-foreground">
                  Fra slots og{" "}
                  <Link to="/live-casino" className={linkClass}>live casino</Link> til bordspil – vi vurderer bredden og
                  kvaliteten af spilkataloget fra de bedste{" "}
                  <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Udbetalingstider</h3>
                <p className="text-sm text-muted-foreground">
                  Ingen har lyst til at vente på sine gevinster. Vi tjekker de
                  reelle behandlingstider og sammenligner med markedet.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Casino Trends 2026 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Casino-trends i 2026</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Markedet for online casinoer udvikler sig konstant. Her er de vigtigste
            trends, vi ser blandt nye danske spillesteder i 2026:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Personlige bonustilbud</h3>
                <p className="text-sm text-muted-foreground">
                  Casinoer bruger data og spilleradfærd til at skræddersy bonusser, der passer til den enkelte spiller. Læs om de forskellige{" "}
                  <Link to="/bonus-guide" className={linkClass}>bonustyper</Link>.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Udvidet live casino</h3>
                <p className="text-sm text-muted-foreground">
                  Flere nye spillesteder satser stort på live dealer-spil med ægte dealere og interaktive funktioner. Læs vores komplette guide til{" "}
                  <Link to="/live-casino" className={linkClass}>live casino</Link>.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Hurtigere betalinger</h3>
                <p className="text-sm text-muted-foreground">
                  MobilePay, Trustly og øjeblikkelige udbetalinger bliver standarden hos nye casinoer. Se alle{" "}
                  <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Gamification og belønninger</h3>
                <p className="text-sm text-muted-foreground">
                  Missioner, achievements og loyalitetsprogrammer gør spiloplevelsen mere engagerende.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Mobil-first design</h3>
                <p className="text-sm text-muted-foreground">
                  Nye platforme designes med mobilen i centrum – perfekt optimeret til smartphones og tablets.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Types of New Casinos */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Typer af nye casinoer
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Ikke alle nye casinoer er skabt ens. De kommer typisk fra tre
            forskellige baggrunde, som hver har sine fordele:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" />
                  Fra et moderselskab
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Mange nye spillesteder drives af erfarne operatører, der allerede
                  har andre casinoer i deres portefølje. Det betyder solid erfaring,
                  pålidelige udbetalinger og gennemprøvet kundeservice fra dag ét.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Internationale brands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Store udenlandske casinoer, der vælger at lancere i Danmark, bringer
                  global erfaring og teknologiske løsninger med sig. De tilpasser{" "}
                  <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>{" "}
                  og support til det danske marked.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Helt nye iværksættere
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Friske iværksættere tør eksperimentere med unikke koncepter og
                  skræddersyede oplevelser. De reagerer hurtigt på feedback og
                  bygger loyalitet gennem gennemsigtighed og personlig dialog.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Responsible Gaming */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-primary" />
                Spil ansvarligt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Uanset om du vælger et nyt eller etableret casino, er det vigtigt at
                spille ansvarligt. Sæt altid et budget, hold pauser og spil aldrig
                for mere, end du har råd til at tabe. Læs mere i vores guide til{" "}
                <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Alle casinoer på vores liste har dansk licens og tilbyder
                selvudelukkelsesmuligheder via{" "}
                <a
                  href="https://www.rofus.nu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  ROFUS
                </a>
                . Har du brug for hjælp eller rådgivning, kan du kontakte{" "}
                <a
                  href="https://www.stopspillet.dk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  StopSpillet.dk
                </a>
                .
              </p>
              <p className="text-xs text-muted-foreground">
                18+ | Spil ansvarligt | Annoncering
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* How to Get Started */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan kommer du i gang hos et nyt casino
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Det er nemt at oprette en konto hos et nyt online casino i Danmark. Her guider vi dig trin for trin, så du hurtigt kan komme i gang med at spille.
          </p>
          <div className="space-y-3">
            {[
              {
                step: "1",
                title: "Vælg et nyt casino fra vores liste",
                desc: "Start med at sammenligne de nye casinoer på vores side. Kig efter velkomstbonusser, spiludvalg og betalingsmetoder, der passer til dine præferencer.",
              },
              {
                step: "2",
                title: "Opret en konto med NemID/MitID",
                desc: "Alle danske casinoer kræver verifikation via NemID eller MitID. Processen tager typisk under 5 minutter og sikrer, at dit spil foregår lovligt og sikkert.",
              },
              {
                step: "3",
                title: "Indbetal og aktiver din bonus",
                desc: "Vælg din foretrukne betalingsmetode og foretag din første indbetaling. Bonussen aktiveres normalt automatisk.",
              },
              {
                step: "4",
                title: "Udforsk spiludvalget",
                desc: "Når din konto er oprettet og bonussen aktiveret, kan du dykke ned i spilleautomater, live casino, bordspil og meget mere.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Bonuses at New Casinos */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Bonusser hos nye casinoer i Danmark
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            En af de største fordele ved nye casinoer er deres generøse bonustilbud. For at tiltrække nye spillere konkurrerer de på velkomstpakker,{" "}
            <Link to="/free-spins" className={linkClass}>free spins</Link> og lave{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>. Her er de mest almindelige bonustyper:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Indskudsbonus (Match Bonus)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Den mest udbredte bonustype, hvor casinoet matcher din første indbetaling. Læs mere i vores{" "}
                  <Link to="/indskudsbonus" className={linkClass}>indskudsbonus guide</Link>. Nye casinoer tilbyder ofte højere match-procenter.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Free Spins uden indbetaling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Nogle nye casinoer giver dig gratis spins blot ved oprettelse – helt uden indbetaling. Læs om{" "}
                  <Link to="/bonus-uden-indbetaling" className={linkClass}>bonus uden indbetaling</Link> og{" "}
                  <Link to="/free-spins" className={linkClass}>free spins</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5 text-primary" />
                  No-Sticky Bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Med en{" "}
                  <Link to="/no-sticky-bonus" className={linkClass}>no-sticky bonus</Link> holdes dine rigtige penge og bonusmidler adskilt. Du kan hæve rigtige pengegevinster når som helst. Sammenlign med{" "}
                  <Link to="/sticky-bonus" className={linkClass}>sticky bonus</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Bonus uden omsætningskrav
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  En stigende trend er{" "}
                  <Link to="/bonus-uden-omsaetningskrav" className={linkClass}>bonus uden omsætningskrav</Link>, hvor du kan udbetale gevinster direkte – ingen gennemspilskrav.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Danish License & Safety */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Dansk licens og sikkerhed hos nye casinoer
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Når du spiller hos et nyt online casino i Danmark, er det afgørende, at spillestedet har en gyldig licens fra Spillemyndigheden. Licensen sikrer, at casinoet overholder den danske spillelovgivning og beskytter dig som spiller.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle casinoer på vores liste er licenserede og regulerede. Det betyder, at de lever op til strenge krav om datasikkerhed, fairness i spil (RNG-certificering) og beskyttelse mod spilleafhængighed via ROFUS-registret. Læs mere om{" "}
            <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Vi anbefaler altid, at du tjekker om et casino har dansk licens, før du opretter en konto. Du kan verificere licensen på{" "}
            <a
              href="https://www.spillemyndigheden.dk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Spillemyndighedens hjemmeside
            </a>
            .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Spillemyndigheden</h3>
                <p className="text-sm text-muted-foreground">
                  Den danske licensmyndighed, der regulerer og overvåger alle lovlige casinoer i Danmark.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">ROFUS</h3>
                <p className="text-sm text-muted-foreground">
                  Det danske register til frivillig udelukkelse fra spil. Alle licenserede casinoer er tilsluttet.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">SSL-kryptering</h3>
                <p className="text-sm text-muted-foreground">
                  Avanceret krypteringsteknologi, der beskytter dine data under overførsler mellem dig og casinoet.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Payment Methods */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Betalingsmetoder hos nye danske casinoer
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Moderne danske casinoer tilbyder et bredt udvalg af{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>. Indbetalinger er typisk øjeblikkelige, mens udbetalingstider varierer fra sekunder til et par bankdage afhængigt af metoden.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            De mest populære betalingsmuligheder hos nye casinoer inkluderer MobilePay, Trustly for direkte bankoverførsler, samt Visa og Mastercard. Nogle nye spillesteder understøtter også Pay N Play.
          </p>
          <div className="space-y-3">
            {[
              {
                title: "MobilePay",
                desc: "Danmarks mest brugte betalingsapp. Øjeblikkelige indbetalinger og hurtige udbetalinger direkte til din MobilePay-konto.",
              },
              {
                title: "Trustly",
                desc: "Direkte bankoverførsel uden at dele kortoplysninger. Populært for sin sikkerhed og hastighed.",
              },
              {
                title: "Visa / Mastercard",
                desc: "De klassiske kortbetalinger. Bredt accepteret hos alle danske casinoer med hurtige indbetalinger.",
              },
              {
                title: "Pay N Play",
                desc: "En ny trend, der kombinerer registrering og indbetaling i ét trin via BankID. Hurtig og enkel opstart.",
              },
            ].map((method) => (
              <div
                key={method.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <CreditCard className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{method.title}</h3>
                  <p className="text-sm text-muted-foreground">{method.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* FAQ Section */}
        <section className="mb-12">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Ofte Stillede Spørgsmål</h2>
            </div>
            <p className="text-muted-foreground">
              Alt du behøver at vide om nye casinoer i Danmark.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {nyeCasinoerFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-border bg-card px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <RelatedGuides currentPath="/nye-casinoer" />
      </div>
    </>
  );
};

export default NyeCasinoer;
