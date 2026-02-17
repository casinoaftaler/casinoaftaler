import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CasinoCard } from "@/components/CasinoCard";
import { RelatedGuides } from "@/components/RelatedGuides";

import { useCasinos } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import nyeCasinoerHero from "@/assets/heroes/nye-casinoer-hero.jpg";
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

const PARTNER_SLUGS = ["spildansknu", "spilleautomaten", "betinia", "campobet", "swift-casino", "luna-casino"];
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
    question: "Hvordan sikrer I jer, at nye casinoer er pålidelige, før I anbefaler dem?",
    answer: (
      <>
        Vores screening-proces for nye casinoer er intensiv. Først verificerer vi den danske licens fra Spillemyndigheden – dette er et ufravigeligt krav. Derefter undersøger vi operatørselskabet bag casinoet: har de erfaring fra andre markeder? Driver de andre licenserede casinoer? Vi tester casinoet med rigtige penge over minimum 2 uger, hvor vi evaluerer registreringsprocessen, indbetalinger via flere{" "}
        <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>, spiloplevelsen og – kritisk –udbetalingshastigheden. Vi kontakter også kundeservice med specifikke spørgsmål for at vurdere kompetence og svartid. Kun casinoer, der består alle tests, kommer på listen.
      </>
    ),
  },
  {
    question: "Hvorfor tilbyder nye casinoer ofte bedre bonusser end etablerede?",
    answer: (
      <>
        Nye casinoer opererer med en aggressiv markedsføringsstrategi, hvor kundeakvisation prioriteres over kortsigtede marginer. De investerer typisk 40–60 % af deres marketingbudget i{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link> for at opbygge en spillerbase. Det resulterer ofte i større bonusbeløb, lavere{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> og flere{" "}
        <Link to="/free-spins" className={linkClass}>free spins</Link>. Når casinoet har etableret en stabil spillerbase, normaliseres bonusniveauerne typisk. Det er derfor strategisk smart at udnytte nye casinoers velkomstbonusser – så længe vilkårene er gennemsigtige. Vi sammenligner altid den reelle bonusværdi i vores anmeldelser.
      </>
    ),
  },
  {
    question: "Hvad kendetegner de bedste nye casinoer sammenlignet med etablerede?",
    answer:
      "Trends i 2026 viser, at nye casinoer fokuserer på tre områder: 1) Mobile-first design – platformen udvikles primært til smartphones med sekundær desktop-optimering. 2) Gamification – loyalitetsprogrammer med levels, achievements og daglige udfordringer erstatter traditionelle VIP-programmer. 3) Hurtigere udbetalinger – mange nye operatører tilbyder instant-udbetalinger via Trustly og MobilePay. Teknologisk set ser vi flere casinoer med AI-drevet spilanbefaling og personaliserede bonustilbud baseret på spillestil. Sikkerheden er identisk med etablerede casinoer, da alle kræver samme danske licens med strenge compliance-krav.",
  },
  {
    question: "Hvilke licenser bør jeg kigge efter ud over den danske?",
    answer:
      "Den danske licens fra Spillemyndigheden er det absolutte minimumskrav for danske spillere – den sikrer skattefri gevinster, ROFUS-tilslutning og 10x omsætningsloft. Derudover er Malta Gaming Authority (MGA) den mest anerkendte internationale licens med strenge krav til spillerbeskyttelse og kapitalreserver. UK Gambling Commission (UKGC) er den strengeste i verden med særligt fokus på ansvarligt spil. Gibraltar Gambling Commission har også et solidt ry. Mange nye casinoer har dual-licensering (fx dansk + MGA), hvilket giver ekstra sikkerhed, da operatøren er underlagt regulering fra to uafhængige tilsynsmyndigheder.",
  },
  {
    question: "Er det risikabelt at være blandt de første spillere på et helt nyt casino?",
    answer: (
      <>
        Risikoen er minimal, så længe casinoet har dansk licens. Spillemyndigheden kræver, at operatøren stiller en bankgaranti på minimum 750.000 kr. som sikkerhed for spillernes indeståender, har implementeret alle tekniske sikkerhedskrav og har bestået compliance-audit, før licensen udstedes. Mange "nye" danske casinoer drives desuden af erfarne operatørselskaber, der allerede driver succesfulde casinoer i andre markeder. Det er dog altid fornuftigt at starte med en mindre indbetaling og teste udbetalingsprocessen, før du øger dit engagement. Læs altid vores{" "}
        <Link to="/casino-anmeldelser" className={linkClass}>anmeldelse</Link>, før du registrerer dig.
      </>
    ),
  },
  {
    question: "Hvordan holder I listen over nye casinoer opdateret?",
    answer: (
      <>
        Vi monitorerer det danske spillemarked dagligt via Spillemyndighedens licensregister, branchemedier og vores netværk af kontakter i industrien. Når et nyt casino lancerer med dansk licens, påbegynder vi vores evalueringsproces inden for de første 48 timer. Casinoer forbliver i "nye casinoer"-kategorien i op til 12 måneder efter dansk lancering, hvorefter de overgår til vores generelle{" "}
        <Link to="/top-10-casino-online" className={linkClass}>top 10 liste</Link>. Vi fjerner casinoer fra listen, hvis de mister deres licens, ændrer vilkår væsentligt i negativ retning eller hvis vores løbende tests afslører forringet kvalitet i betalingsprocesser eller kundeservice.
      </>
    ),
  },
];

const NyeCasinoer = () => {
  const { data: casinos, isLoading } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);

  const heroBackgroundImage = siteSettings?.hero_background_image;

  const newCasinos = casinos
    ?.filter((c) => c.is_active && PARTNER_SLUGS.includes(c.slug))
    ?.sort((a, b) => {
      const aIdx = PRIORITY_SLUGS.indexOf(a.slug);
      const bIdx = PRIORITY_SLUGS.indexOf(b.slug);
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }) ?? [];

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

  const faqJsonLd = buildFaqSchema(nyeCasinoerFaqs);

  return (
    <>
      <SEO
        title="Nye Casinoer i Danmark – Bedste Nye Spillesteder"
        description="Komplet oversigt over de bedste nye casinoer i Danmark. Sammenlign bonusser, free spins og vilkår hos nye spillesteder med dansk licens."
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
              Opdateret {getDanishMonthYear()}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Nye Casinoer i Danmark
            </h1>
            <p className="text-lg text-white/80">
              Din komplette guide til nye danske online casinoer. Vi tester og anmelder hvert nyt spillested, så du trygt kan finde friske bonusser, moderne spiloplevelser og sikre platforme med dansk licens.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="16-02-2026" readTime="12 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={nyeCasinoerHero} alt="Nye casinoer – futuristisk casino med neonlys" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Intro Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Overblik over nye casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det danske casinomarked vokser hurtigt, og nye spillesider lanceres løbende med friske{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>, moderne spiludvalg og hurtige{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>. Men ikke alle nye casinoer lever op til standarden – derfor gennemgår vi hvert spillested grundigt, fra behandlingstider og kundeservice til licensforhold. Kun casinoer med gyldig dansk licens fra Spillemyndigheden, SSL-kryptering og fuld lovoverholdelse når listen. Du kan selv tjekke et casinos licens via{" "}
            <a href="https://www.spillemyndigheden.dk/tilladelsesindehavere" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">den officielle tilladelsesliste</a>.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vores mål er at give dig et ærligt og pålideligt billede, så du kan tage
            en informeret beslutning, når du vælger dit næste spillested. Læs også vores{" "}
            <Link to="/casino-bonus" className={linkClass}>casino bonus guide</Link> for at forstå de forskellige bonustyper, eller se vores dybdegående artikler om{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> og{" "}
            <Link to="/free-spins" className={linkClass}>free spins</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Mens du undersøger nye casinoer, kan du prøve vores{" "}
            <Link to="/community/slots" className={linkClass}>gratis spilleautomater i spillehallen</Link>{" "}
            og opleve bonusrunder og free spins helt uden risiko.
          </p>
          <div className="mt-6 rounded-lg border border-primary/30 bg-accent/30 p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Se årets nye casinoer:</strong>{" "}
              Vores dedikerede <Link to="/nye-casinoer/2026" className={linkClass}>oversigt over nye casinoer 2026</Link> fokuserer specifikt på alle casinoer lanceret i år – med de nyeste bonusser og tendenser.
            </p>
          </div>
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
             <Link to="/om" className={linkClass}>Om Os</Link>-siden og vores <Link to="/saadan-tester-vi-casinoer" className={linkClass}>testmetode</Link>. Her er de vigtigste
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
                  <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>, <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>, Visa og andre populære metoder – vi tjekker
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
                  <Link to="/casino-bonus" className={linkClass}>bonustyper</Link>.
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
                  <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>, <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> og øjeblikkelige udbetalinger bliver standarden hos nye casinoer. Se alle{" "}
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
                <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Alle casinoer på vores liste har dansk licens fra Spillemyndigheden – det sikrer skattefri gevinster, ROFUS-beskyttelse og max 10x omsætningskrav. Læs mere om <Link to="/casino-licenser" className={linkClass}>casino-licenser</Link> og hvad de betyder for din sikkerhed. Casinoerne tilbyder
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
            <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
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
            De mest populære betalingsmuligheder hos nye casinoer inkluderer <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>, <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> for direkte bankoverførsler, samt <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa og Mastercard</Link>. Nogle nye spillesteder understøtter også Pay N Play.
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

        {/* Hvordan sammenligner du nye casinoer */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvordan sammenligner du nye casinoer i Danmark?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Når du skal vælge mellem nye casinoer på det danske marked, er det vigtigt at have en systematisk tilgang. Hvert nyt casino tilbyder noget unikt, og ved at sammenligne de rigtige faktorer kan du finde det nye casino, der passer perfekt til din spillestil. Her er de vigtigste punkter, du bør evaluere, når du sammenligner nye casinoer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Start altid med at tjekke, om det nye casino har dansk licens fra Spillemyndigheden. Uden licens bør du aldrig oprette en konto – uanset hvor attraktive bonusserne virker. Alle nye casinoer på vores liste er verificerede og licenserede, så du kan trygt vælge blandt vores anbefalinger. Dernæst bør du sammenligne{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonussen</Link> hos hvert nyt casino. Se på bonusbeløbet, men fokuser især på{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskravene</Link> og om det nye casino tilbyder en{" "}
            <Link to="/no-sticky-bonus" className={linkClass}>no-sticky casino bonus</Link> eller en sticky bonus.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spiludvalget er en anden afgørende faktor, når du vurderer et nyt casino. De bedste nye casinoer samarbejder med førende{" "}
            <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link> som{" "}
            <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>,{" "}
            <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link> og{" "}
            <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> for at tilbyde hundredvis af spilleautomater, bordspil og{" "}
            <Link to="/live-casino" className={linkClass}>live casino</Link>-spil. Et nyt casino med et bredt spiludvalg fra mange udbydere er generelt et godt tegn på kvalitet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Endelig bør du vurdere det nye casinos betalingsmuligheder og udbetalingstider. De bedste nye casinoer understøtter{" "}
            <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>,{" "}
            <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> og andre moderne{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> med hurtige udbetalinger. Et nyt casino, der tilbyder øjeblikkelige udbetalinger, viser at de prioriterer spillerens oplevelse fra starten.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Populære spil hos nye casinoer */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Populære casinospil hos nye casinoer
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Nye casinoer i Danmark tilbyder typisk et imponerende udvalg af{" "}
            <Link to="/casinospil" className={linkClass}>casinospil</Link> fra dag ét. Spilleautomater er naturligvis det mest populære casinospil hos nye casinoer, med titler som Book of Dead, Sweet Bonanza, Gates of Olympus og Starburst som faste favoritter. Nye casinoer har ofte eksklusive lanceringstitler, som du ikke finder hos etablerede spillesteder.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/live-casino" className={linkClass}>Live casino</Link> er en anden vigtig kategori hos nye casinoer. De fleste nye casinoer lancerer med et fuldt live casino-udvalg fra{" "}
            <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>, herunder populære live casinospil som Lightning Roulette, Crazy Time og Infinite Blackjack. Nye casinoer fokuserer ofte på at tilbyde det bedste inden for live casino for at differentiere sig fra konkurrenterne.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Bordspil som blackjack, roulette og baccarat er ligeledes tilgængelige hos alle nye casinoer med dansk licens. Mange nye casinoer tilbyder desuden jackpot-spilleautomater med progressive præmiepuljer, der kan nå millioner af kroner. Uanset hvilken type casinospil du foretrækker, finder du det hos de nye casinoer på vores liste.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Nye casinoer vs. etablerede casinoer */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Nye casinoer vs. etablerede casinoer – fordele og ulemper
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Valget mellem et nyt casino og et etableret casino er en af de mest stilede spørgsmål blandt danske casinospillere. Nye casinoer har en række klare fordele: de tilbyder typisk mere generøse velkomstbonusser, modernere brugergrænseflader, friskere spiludvalg og mere innovative funktioner. Mange nye casinoer er bygget fra bunden med mobilen som primær platform, hvilket giver en overlegen mobiloplevelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Etablerede casinoer har dog også deres styrker. De har årelang erfaring, dokumenteret pålidelighed og ofte mere omfattende VIP-programmer. Kundeservice hos etablerede casinoer er typisk veludbygget med danske supportmedarbejdere og flere kontaktmuligheder. Når det kommer til{" "}
            <Link to="/casino-bonus" className={linkClass}>casino bonus</Link>-tilbud, er nye casinoer dog næsten altid mere aggressive for at tiltrække nye spillere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vores anbefaling er at prøve begge dele. Start med et nyt casino for at udnytte den generøse velkomstbonus, og sammenlign oplevelsen med et etableret spillested. Det vigtigste er altid, at det casino du vælger – nyt eller etableret – har gyldig dansk licens. Se vores{" "}
            <Link to="/top-10-casino-online" className={linkClass}>top 10 casino</Link>-liste for de bedste muligheder uanset erfaring.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Nye Casinoer Cluster Links */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Udforsk nye casinoer i dybden</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Vi har udarbejdet specialiserede guides til alle aspekter af nye casinoer i Danmark:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { to: "/nye-casinoer/2026", label: "Nye Casinoer 2026", desc: "Komplet oversigt over alle nye casinoer lanceret i 2026" },
              { to: "/nye-casinoer/dansk-licens", label: "Med Dansk Licens", desc: "Kun casinoer med gyldig Spillemyndigheden-licens" },
              { to: "/nye-casinoer/uden-rofus", label: "Uden ROFUS", desc: "Risici og alternativer til casinoer uden ROFUS" },
              { to: "/nye-casinoer/hurtig-udbetaling", label: "Hurtig Udbetaling", desc: "Nye casinoer med de hurtigste udbetalinger" },
              { to: "/nye-casinoer/bonus-uden-indbetaling", label: "Bonus uden Indbetaling", desc: "Gratis bonus ved oprettelse" },
              { to: "/nye-casinoer/trustly", label: "Med Trustly", desc: "Nye casinoer med Trustly Pay N Play" },
              { to: "/nye-casinoer/mitid", label: "Med MitID", desc: "Hurtig MitID-verifikation" },
              { to: "/nye-casinoer/lav-wagering", label: "Lav Wagering", desc: "Nye casinoer med lave omsætningskrav" },
              { to: "/nye-casinoer/bedste", label: "Bedste Nye Casinoer", desc: "Vores topvalg blandt nye casinoer" },
              { to: "/nye-casinoer/vs-etablerede", label: "Nye vs. Etablerede", desc: "Sammenligning af nye og etablerede casinoer" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
              >
                <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold text-sm">{link.label}</h3>
                  <p className="text-xs text-muted-foreground">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <AuthorBio author="kevin" />

        <Separator className="my-10" />

        <RelatedGuides currentPath="/nye-casinoer" />

        <FAQSection title="Ofte stillede spørgsmål om nye casinoer" faqs={nyeCasinoerFaqs} />
      </div>
    </>
  );
};

export default NyeCasinoer;
