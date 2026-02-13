import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CasinoCard } from "@/components/CasinoCard";
import { RelatedGuides } from "@/components/RelatedGuides";
import { useCasinos } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useState, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sparkles,
  ShieldCheck,
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
  Gift,
  RefreshCw,
  Zap,
  DollarSign,
  Percent,
  ArrowRight,
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const casinoBonusFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er en casino bonus?",
    answer: (
      <>
        En casino bonus er et tilbud fra et online casino, der giver dig ekstra
        midler eller gratis spins oven i din indbetaling. Bonusser bruges til at
        tiltrække nye spillere og belønne eksisterende kunder. Læs mere om de
        forskellige typer i vores{" "}
        <Link to="/bonus-guide" className={linkClass}>bonus guide</Link>.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på no-sticky og sticky bonus?",
    answer: (
      <>
        Med en{" "}
        <Link to="/no-sticky-bonus" className={linkClass}>no-sticky bonus</Link>{" "}
        spilles dine rigtige penge først, og du kan hæve gevinster når som helst.
        Med en{" "}
        <Link to="/sticky-bonus" className={linkClass}>sticky bonus</Link>{" "}
        kombineres din indbetaling og bonus, og du skal opfylde omsætningskravene
        før udbetaling.
      </>
    ),
  },
  {
    question: "Hvad er omsætningskrav?",
    answer: (
      <>
        Omsætningskrav angiver, hvor mange gange du skal spille for bonusbeløbet,
        før du kan hæve gevinster. Et krav på 10x på en bonus på 1.000 kr.
        betyder, at du skal omsætte for 10.000 kr. Læs vores dybdegående guide
        til{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
      </>
    ),
  },
  {
    question: "Kan jeg få en bonus uden at indbetale?",
    answer: (
      <>
        Ja, nogle casinoer tilbyder en{" "}
        <Link to="/bonus-uden-indbetaling" className={linkClass}>
          bonus uden indbetaling
        </Link>
        , hvor du modtager bonusmidler eller free spins blot ved at oprette en
        konto. Disse bonusser er typisk mindre, men risikofri.
      </>
    ),
  },
  {
    question: "Hvordan aktiverer jeg en casino bonus?",
    answer:
      "De fleste bonusser aktiveres automatisk ved din første indbetaling. Nogle kræver en bonuskode, som du indtaster under indbetalingen. Tjek altid bonusvilkårene, så du ved præcis, hvordan du aktiverer dit tilbud.",
  },
  {
    question: "Er casino bonusser det værd?",
    answer: (
      <>
        Ja, hvis du forstår vilkårene. Kig efter bonusser med lave{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>{" "}
        (under 15x), rimelige gyldighedsperioder og no-sticky struktur. Bonusser
        med{" "}
        <Link to="/bonus-uden-omsaetningskrav" className={linkClass}>
          ingen omsætningskrav
        </Link>{" "}
        giver den bedste værdi.
      </>
    ),
  },
  {
    question: "Hvad er free spins?",
    answer: (
      <>
        <Link to="/free-spins" className={linkClass}>Free spins</Link> er
        gratis omgange på spilleautomater. De kan være en del af en
        velkomstpakke eller gives som selvstændig bonus. Gevinster fra free spins
        er ofte underlagt omsætningskrav.
      </>
    ),
  },
  {
    question: "Kan jeg bruge bonus på live casino?",
    answer: (
      <>
        De fleste bonusser er begrænset til spilleautomater, men nogle casinoer
        tilbyder specifikke{" "}
        <Link to="/live-casino" className={linkClass}>live casino</Link>{" "}
        bonusser. Tjek altid bonusvilkårene for spilbidrag fra live-spil.
      </>
    ),
  },
  {
    question: "Hvor ofte opdaterer I bonuslisten?",
    answer:
      "Vi opdaterer vores bonusliste løbende – typisk dagligt eller ugentligt. Alle bonusser på siden er verificeret og aktuelle, og vi fjerner tilbud, der ikke længere er gældende.",
  },
  {
    question: "Er alle casinoer på listen licenserede?",
    answer: (
      <>
        Ja, alle casinoer på Casinoaftaler.dk har gyldig dansk licens fra
        Spillemyndigheden. Det sikrer din beskyttelse som spiller, og du kan
        altid selvudelukke via{" "}
        <a
          href="https://www.rofus.nu/"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          ROFUS
        </a>
        . Læs mere om{" "}
        <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>.
      </>
    ),
  },
];

const CasinoBonus = () => {
  const { data: casinos, isLoading } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);

  const heroBackgroundImage = siteSettings?.hero_background_image;

  const activeCasinos =
    casinos
      ?.filter((c) => c.is_active)
      ?.sort((a, b) => a.position - b.position)
      ?.slice(0, 8) ?? [];

  const mapCasino = (casino: (typeof activeCasinos)[0]) => ({
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
    mainEntity: casinoBonusFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof faq.answer === "string" ? faq.answer : faq.question,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Forside",
        item: "https://casinoaftaler.dk/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Casino Bonus",
        item: "https://casinoaftaler.dk/casino-bonus",
      },
    ],
  };

  return (
    <>
      <SEO
        title="Bedste Casino Bonus 2026 – Top Bonusser til Danske Spillere"
        description="Find den bedste casino bonus i Danmark 2026. Sammenlign velkomstbonusser, free spins, no-sticky bonusser og lave omsætningskrav. Kun casinoer med dansk licens."
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
              <Gift className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Bedste Casino Bonus i Danmark 2026
            </h1>
            <p className="text-lg text-white/80">
              Find de mest attraktive casino bonusser på det danske marked. Vi har
              samlet, testet og sammenlignet velkomstbonusser, free spins,
              no-sticky bonusser og meget mere – alt med dansk licens.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        {/* Meta info bar */}
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>
              Skrevet af:{" "}
              <span className="font-medium text-foreground">Casinoaftaler</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>
              Siden opdateret:{" "}
              <span className="font-medium text-foreground">13-02-2026</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>
              Læsetid:{" "}
              <span className="font-medium text-foreground">12 Min.</span>
            </span>
          </div>
        </div>

        {/* Intro Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvad er en casino bonus?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En casino bonus er et tilbud fra et online casino, der giver dig
            ekstra midler, gratis spins eller andre fordele oven i din
            indbetaling. Bonusser er designet til at forbedre din spiloplevelse,
            forlænge din spilletid og give dig flere chancer for at vinde.
            For danske spillere er casino bonusser en central del af oplevelsen
            hos{" "}
            <Link to="/nye-casinoer" className={linkClass}>
              nye casinoer
            </Link>{" "}
            såvel som etablerede spillesteder.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hos Casinoaftaler.dk gennemgår vi alle bonusser grundigt og vurderer
            dem på fairness, omsætningskrav, gyldighedsperiode og overordnet
            værdi. Vi anbefaler kun bonusser fra casinoer med gyldig dansk licens
            fra Spillemyndigheden. Vores mål er at hjælpe dig med at finde den
            bonus, der passer bedst til din spillestil – uanset om du foretrækker{" "}
            <Link to="/no-sticky-bonus" className={linkClass}>
              no-sticky bonusser
            </Link>
            , lavt{" "}
            <Link to="/omsaetningskrav" className={linkClass}>
              omsætningskrav
            </Link>{" "}
            eller{" "}
            <Link to="/free-spins" className={linkClass}>
              free spins
            </Link>
            .
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det er vigtigt at forstå, at ikke alle bonusser er skabt lige. De
            bedste casino bonusser kombinerer generøse beløb med retfærdige
            vilkår, der faktisk kan opfyldes inden for bonusperioden. Læs videre
            for at lære alt om de forskellige bonustyper og find de bedste tilbud
            til danske spillere i 2026.
          </p>
        </section>

        {/* Casino List */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Bedste casino bonus – Top tilbud i Danmark 2026
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Herunder finder du vores håndplukkede liste over de bedste casino
            bonusser på det danske marked. Alle casinoer har dansk licens, og vi
            opdaterer listen løbende, så du altid har adgang til de nyeste og
            mest attraktive tilbud.
          </p>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : activeCasinos.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              Ingen casino bonusser tilgængelige i øjeblikket.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                {activeCasinos.slice(0, 2).map((casino, index) => (
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
              {activeCasinos.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  {activeCasinos.slice(2).map((casino, index) => (
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

        {/* Why Play With Bonus */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Hvorfor spille med casino bonus?
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            En casino bonus er mere end bare et fristende tilbud – den er en
            mulighed for at styrke din spiloplevelse og potentielt øge dine
            vinderchancer. Med en veludnyttet bonus kan du forlænge din spilletid,
            udforske nye spil uden ekstra risiko og få mere værdi for dine penge.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  Forlænget spilletid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ekstra bonusmidler og{" "}
                  <Link to="/free-spins" className={linkClass}>free spins</Link>{" "}
                  giver dig flere runder på dine yndlingsspil, uden at du skal
                  indbetale mere.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Lavere risiko
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Med en{" "}
                  <Link to="/no-sticky-bonus" className={linkClass}>
                    no-sticky bonus
                  </Link>{" "}
                  spiller du med dine egne penge først. Bonussen fungerer som et
                  sikkerhedsnet, hvis du taber din indbetaling.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Opdag nye spil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Bonusser målrettet specifikke titler giver dig en nem og
                  risikofri måde at udforske nye spilleautomater og{" "}
                  <Link to="/live-casino" className={linkClass}>live casino</Link>{" "}
                  spil.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Bedre vinderchancer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Flere runder betyder flere chancer for at ramme jackpot eller
                  udløse bonusfunktioner i spilleautomater.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5 text-primary" />
                  VIP & loyalitetsfordele
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Mange casinoer belønner faste spillere med reload-bonusser,
                  cashback og eksklusive VIP-tilbud, der øger den langsigtede
                  værdi.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Mere værdi for pengene
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  En 100% match-bonus fordobler din indbetaling og giver dig
                  dobbelt så meget at spille for. Det er ren ekstra værdi oven i
                  din indbetaling.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Types of Casino Bonuses */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Typer af casino bonusser
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Der findes mange forskellige typer af casino bonusser på det danske
            marked. Hver bonustype har sine fordele og vilkår, og det er vigtigt
            at forstå forskellen, så du kan vælge den, der passer bedst til dig.
            Her gennemgår vi de mest populære bonustyper.
          </p>

          <div className="space-y-6">
            {/* Velkomstbonus */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Velkomstbonus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Velkomstbonussen er det mest udbredte tilbud på det danske marked.
                  Den gives til nye spillere ved deres første indbetaling og matcher
                  typisk din indbetaling med 100%. Indbetaler du f.eks. 1.000 kr.,
                  får du yderligere 1.000 kr. i bonus – altså 2.000 kr. at spille
                  for. Nogle casinoer tilbyder trinvise velkomstpakker, der strækker
                  sig over flere indbetalinger.
                </p>
                <Link
                  to="/velkomstbonus"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
                >
                  Læs vores komplette velkomstbonus guide{" "}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Indskudsbonus */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Indskudsbonus (Match Bonus)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  En indskudsbonus aktiveres ved din indbetaling. Casinoet matcher
                  en procentdel af dit indskud – typisk 100%, men det kan variere
                  fra 50% til 200% eller mere. Det er den mest almindelige form
                  for casinobonus og findes hos næsten alle danske spillesteder.
                </p>
                <Link
                  to="/indskudsbonus"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
                >
                  Læs mere om indskudsbonusser{" "}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* No-Sticky Bonus */}
            <Card className="border-primary/50 bg-card">
              <CardHeader>
                <div className="mb-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Anbefalet
                </div>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  No-Sticky Bonus (Faldskærmsbonus)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  No-sticky bonussen er den mest spillervenlige bonustype. Din
                  indbetaling og bonus holdes adskilt – du spiller med dine egne
                  penge først og kan hæve gevinster når som helst. Bonussen træder
                  kun i kraft, hvis du mister din indbetaling, og fungerer dermed
                  som et sikkerhedsnet. Vi anbefaler altid no-sticky bonusser
                  frem for sticky, da de giver dig langt mere fleksibilitet.
                </p>
                <Link
                  to="/no-sticky-bonus"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
                >
                  Læs vores dybdegående no-sticky guide{" "}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Sticky Bonus */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Sticky Bonus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Med en sticky bonus kombineres din indbetaling og bonus til én
                  samlet saldo. Du kan ikke hæve noget, før du har opfyldt
                  omsætningskravene. Sticky bonusser tilbyder ofte større beløb,
                  men med højere risiko. De er bedst egnet til spillere, der
                  planlægger længere spillesessioner.
                </p>
                <Link
                  to="/sticky-bonus"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
                >
                  Læs mere om sticky bonusser{" "}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Free Spins */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  Free Spins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Free spins er gratis omgange på udvalgte spilleautomater. De kan
                  være en del af en velkomstpakke, gives som selvstændig bonus eller
                  som no-deposit tilbud. Gevinster fra free spins er ofte underlagt
                  omsætningskrav, men nogle casinoer tilbyder "kontant spins" helt
                  uden krav.
                </p>
                <Link
                  to="/free-spins"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
                >
                  Læs vores free spins guide{" "}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Bonus uden indbetaling */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Bonus uden indbetaling (No Deposit)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  En no-deposit bonus er særligt attraktiv, fordi den ikke kræver
                  nogen indbetaling. Du modtager bonusmidler eller free spins blot
                  ved at oprette en konto. Det er en risikofri måde at teste et
                  nyt casino på, før du investerer dine egne penge.
                </p>
                <Link
                  to="/bonus-uden-indbetaling"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
                >
                  Find bonusser uden indbetaling{" "}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Bonus uden omsætningskrav */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Bonus uden omsætningskrav
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Den ultimative bonus for spillere – gevinster kan hæves med det
                  samme, uden at du behøver omsætte for et bestemt beløb. Disse
                  bonusser er sjældne, men utroligt værdifulde. Kontant spins og
                  cash bonusser uden krav giver den bedste reelle værdi.
                </p>
                <Link
                  to="/bonus-uden-omsaetningskrav"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
                >
                  Find bonusser uden omsætningskrav{" "}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Reload Bonus */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  Reload-Bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Reload-bonusser er rettet mod eksisterende spillere og belønner
                  efterfølgende indbetalinger. De fungerer som en match-bonus, men
                  er typisk lavere end velkomstbonussen. Mange casinoer tilbyder
                  ugentlige eller weekendbaserede reload-bonusser, der holder
                  spilleglæden i gang.
                </p>
              </CardContent>
            </Card>

            {/* Cashback */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Cashback-Bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Med en cashback-bonus får du en procentdel af dine tab
                  tilbagebetalt – typisk 5-15%. Det fungerer som en forsikring
                  mod tab og er særligt populær blandt high-roller spillere. Cashback
                  udbetales ofte ugentligt og kan være fri for omsætningskrav.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Understanding Wagering Requirements */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Forstå omsætningskrav
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Omsætningskrav (også kaldet gennemspilskrav) er den vigtigste faktor,
            når du vurderer en casino bonus. De angiver, hvor mange gange du skal
            omsætte bonusbeløbet, før du kan hæve eventuelle gevinster. Et lavt
            omsætningskrav betyder bedre chancer for at beholde dine gevinster.
          </p>

          <Card className="mb-6 bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="mb-3 font-semibold">Beregningseksempel</h3>
              <p className="text-muted-foreground mb-2">
                Du modtager en bonus på <strong>1.000 kr.</strong> med{" "}
                <strong>10x omsætningskrav</strong>. Det betyder:
              </p>
              <p className="text-lg font-semibold text-primary">
                1.000 kr. × 10 = 10.000 kr. i samlede væddemål
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Du skal altså placere væddemål for i alt 10.000 kr., før du kan
                hæve dine gevinster.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Under 10x – Fremragende</h3>
                <p className="text-sm text-muted-foreground">
                  De bedste vilkår på det danske marked. Meget realistisk at
                  opfylde og giver reel værdi for spilleren.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">10x – 20x – Meget godt</h3>
                <p className="text-sm text-muted-foreground">
                  Stadig spillervenligt og opnåeligt. De fleste danske casinoer
                  ligger i dette interval.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">20x – 35x – Branchestandard</h3>
                <p className="text-sm text-muted-foreground">
                  Gennemsnitligt krav, der kræver lidt mere spil. Stadig fair,
                  men vurder gyldighedsperioden nøje.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Over 35x – Høje krav</h3>
                <p className="text-sm text-muted-foreground">
                  Sværere at opfylde. Vær ekstra opmærksom på tidsfristen og
                  overvej om bonussen reelt er værd at aktivere.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/omsaetningskrav"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
            >
              Læs vores komplette guide til omsætningskrav{" "}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <Separator className="my-10" />

        {/* How to Activate a Bonus */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Trin for trin: Sådan aktiverer du en casino bonus
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Det er nemt at komme i gang med en casino bonus. Her guider vi dig
            igennem processen, så du kan aktivere dit tilbud hurtigt og sikkert.
          </p>
          <div className="space-y-3">
            {[
              {
                step: "1",
                title: "Vælg et casino med en attraktiv bonus",
                desc: "Sammenlign bonusser fra vores liste og vælg den, der passer til din spillestil. Kig efter lave omsætningskrav og no-sticky struktur.",
              },
              {
                step: "2",
                title: "Opret en konto med NemID/MitID",
                desc: "Alle danske casinoer kræver verifikation via NemID eller MitID. Processen tager typisk under 5 minutter og sikrer lovligt spil.",
              },
              {
                step: "3",
                title: "Foretag din første indbetaling",
                desc: (
                  <>
                    Vælg din foretrukne{" "}
                    <Link to="/betalingsmetoder" className={linkClass}>
                      betalingsmetode
                    </Link>{" "}
                    – MobilePay, Trustly, Visa eller lignende. Tjek altid
                    minimumsindbetaling for at aktivere bonussen.
                  </>
                ),
              },
              {
                step: "4",
                title: "Bonussen aktiveres automatisk",
                desc: "De fleste bonusser krediteres automatisk efter din første indbetaling. Nogle kræver en bonuskode – tjek altid vilkårene.",
              },
              {
                step: "5",
                title: "Spil og opfyld omsætningskravene",
                desc: "Brug bonusmidlerne på kvalificerede spil (typisk spilleautomater) og opfyld omsætningskravene inden for gyldighedsperioden.",
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
                  <p className="text-sm text-muted-foreground">{typeof item.desc === "string" ? item.desc : item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Bonus Terms and Conditions */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Bonusvilkår og vigtige begrænsninger
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Før du accepterer en casino bonus, er det afgørende at forstå de
            tilhørende vilkår og betingelser. Her er de vigtigste punkter, du
            bør være opmærksom på:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Percent className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Omsætningskrav</h3>
                <p className="text-sm text-muted-foreground">
                  Angiver hvor mange gange du skal omsætte bonus (og evt.
                  indbetaling) før udbetaling. Jo lavere, jo bedre.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Gyldighedsperiode</h3>
                <p className="text-sm text-muted-foreground">
                  De fleste bonusser har en tidsfrist (typisk 30-60 dage). Hvis
                  du ikke opfylder kravene inden for fristen, bortfalder bonus
                  og gevinster.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Gamepad2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Spilbidrag</h3>
                <p className="text-sm text-muted-foreground">
                  Ikke alle spil bidrager lige meget. Spilleautomater tæller
                  typisk 100%, mens bordspil og live casino ofte tæller 0-10%.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CreditCard className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Min./Max. indbetaling</h3>
                <p className="text-sm text-muted-foreground">
                  Der er altid en minimumsindbetaling for at aktivere bonussen
                  (typisk 100 kr.) og ofte et maksimum for bonusbeløbet.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <DollarSign className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Max. indsats under omsætning</h3>
                <p className="text-sm text-muted-foreground">
                  Mange casinoer har en maksimal indsats pr. spin mens du
                  omsætter bonus (typisk 25-50 kr.). Overskridelse kan annullere
                  bonussen.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Max. udbetaling</h3>
                <p className="text-sm text-muted-foreground">
                  Nogle bonusser har et loft på, hvor meget du kan udbetale fra
                  bonusgevinster. Tjek altid dette, inden du accepterer tilbuddet.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Tips Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Tips til at vælge den rigtige casino bonus
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Med så mange bonusser at vælge imellem kan det være overvældende. Her
            er vores bedste råd til at finde den bonus, der giver dig mest
            værdi:
          </p>
          <div className="space-y-3">
            {[
              {
                title: "Foretruk no-sticky frem for sticky",
                desc: (
                  <>
                    <Link to="/no-sticky-bonus" className={linkClass}>
                      No-sticky bonusser
                    </Link>{" "}
                    giver dig fleksibilitet til at hæve gevinster når som helst.
                    Det er altid den bedste bonustype for spillere.
                  </>
                ),
              },
              {
                title: "Kig efter lave omsætningskrav",
                desc: (
                  <>
                    Jo lavere{" "}
                    <Link to="/omsaetningskrav" className={linkClass}>
                      omsætningskrav
                    </Link>
                    , jo bedre. Under 10x er fremragende, 10-20x er meget godt.
                    Alt over 35x bør overvejes nøje.
                  </>
                ),
              },
              {
                title: "Tjek gyldighedsperioden",
                desc: "Sørg for at du har tid nok til at opfylde kravene. En bonus med 60 dages gyldighed er bedre end én med 7 dage.",
              },
              {
                title: "Læs de fulde vilkår",
                desc: "Tjek altid spilbidrag, max. indsats under omsætning og eventuel max. udbetaling. Djævlen er i detaljerne.",
              },
              {
                title: "Sammenlign flere casinoer",
                desc: (
                  <>
                    Brug vores oversigt til at sammenligne bonusser side om side.
                    Tjek også vores{" "}
                    <Link to="/top-10-casino-online" className={linkClass}>
                      top 10 casino online
                    </Link>{" "}
                    for de bedste samlede oplevelser.
                  </>
                ),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {idx + 1}
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
                Uanset hvilken bonus du vælger, er det vigtigt at spille
                ansvarligt. Sæt altid et budget, hold pauser og spil aldrig for
                mere, end du har råd til at tabe. En casino bonus bør ses som
                underholdning – ikke som en indtægtskilde. Læs mere i vores
                guide til{" "}
                <Link to="/responsible-gaming" className={linkClass}>
                  ansvarligt spil
                </Link>
                .
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

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2">
            <HelpCircle className="h-8 w-8 text-primary" />
            Ofte stillede spørgsmål om casino bonus
          </h2>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {casinoBonusFaqs.map((faq, index) => (
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
          </div>
        </section>

        <RelatedGuides currentPath="/casino-bonus" />
      </div>
    </>
  );
};

export default CasinoBonus;
