import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
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
  AlertTriangle,
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const casinoBonusFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er en casino bonus?",
    answer: (
      <>
        En casino bonus er et tilbud fra et online casino, der giver dig ekstra
        midler eller gratis spins oven i din indbetaling. Bonusser bruges til at
        tiltrække nye spillere og belønne eksisterende kunder.
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
        title="Bedste Casino Bonus 2026 – Find Din Perfekte Bonus i Danmark"
        description="Den ultimative guide til casino bonus i Danmark 2026. Sammenlign de bedste casino bonusser, velkomstbonusser, free spins og no-sticky bonusser hos danske casinoer med licens. Find din perfekte casino bonus her."
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
            Bedste Casino Bonus 2026 – Din Komplette Guide
            </h1>
            <p className="text-lg text-white/80">
              Find den bedste casino bonus i Danmark. Vi har testet, sammenlignet
              og rangeret alle casino bonusser på det danske marked, så du altid
              finder den casino bonus, der giver dig mest værdi for pengene.
              Uanset om du leder efter en velkomstbonus, free spins eller
              no-sticky casino bonus – vi har dig dækket.
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
            Hvad er en casino bonus, og hvorfor er det vigtigt?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En casino bonus er et tilbud fra et online casino, der giver dig
            ekstra midler, gratis spins eller andre fordele oven i din
            indbetaling. Casino bonusser er designet til at forbedre din spiloplevelse,
            forlænge din spilletid og give dig flere chancer for at vinde. Den bedste
            casino bonus kan fordoble eller endda tredoble din første indbetaling,
            hvilket giver dig betydeligt mere at spille for.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For danske spillere er en casino bonus en central del af oplevelsen
            hos både{" "}
            <Link to="/nye-casinoer" className={linkClass}>
              nye casinoer
            </Link>{" "}
            og etablerede spillesteder. Når du vælger en casino bonus, er det
            afgørende at forstå vilkårene – herunder omsætningskrav, gyldighedsperiode
            og bonusstruktur. En god casino bonus kombinerer et generøst beløb med
            fair vilkår, der reelt kan opfyldes.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hos Casinoaftaler.dk gennemgår vi alle casino bonusser grundigt og vurderer
            dem på fairness, omsætningskrav, gyldighedsperiode og overordnet
            værdi. Vi anbefaler kun casino bonusser fra casinoer med gyldig dansk licens
            fra Spillemyndigheden. Vores mål er at hjælpe dig med at finde den
            bedste casino bonus, der passer til din spillestil – uanset om du foretrækker{" "}
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
            Det er vigtigt at forstå, at ikke alle casino bonusser er skabt lige. De
            bedste casino bonusser kombinerer generøse beløb med retfærdige
            vilkår, der faktisk kan opfyldes inden for bonusperioden. En casino bonus
            med lave omsætningskrav og no-sticky struktur giver dig langt bedre
            vinderchancer end en bonus med 50x gennemspilskrav. Læs videre
            for at lære alt om de forskellige bonustyper og find den bedste casino bonus
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
                <h3 className="font-semibold">10x – Dansk standard</h3>
                <p className="text-sm text-muted-foreground">
                  Alle danske casinoer med licens fra Spillemyndigheden opererer med 10x omsætningskrav (indskud + bonus). Det er blandt de laveste i verden.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">0x – Uden omsætningskrav</h3>
                <p className="text-sm text-muted-foreground">
                  Nogle casinoer tilbyder bonusser helt uden omsætningskrav – du kan udbetale gevinster med det samme.
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
                    – <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>, <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>, Visa eller lignende. Tjek altid
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
                    , jo bedre. Alle danske casinoer opererer med 10x, som er fastsat af Spillemyndigheden.
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

        {/* How Casino Bonus Works in Denmark */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan fungerer en casino bonus i Danmark
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En casino bonus i Danmark fungerer anderledes end i mange andre lande, fordi
            det danske marked er reguleret af Spillemyndigheden. Alle casino bonusser
            der tilbydes til danske spillere skal overholde strenge regler, hvilket
            sikrer en fair og gennemsigtig oplevelse. Når du modtager en casino bonus
            hos et dansk casino, er der altid klare vilkår og betingelser knyttet til
            tilbuddet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den typiske casino bonus fungerer ved, at casinoet matcher din indbetaling
            med en procentdel – oftest 100%. Det betyder, at hvis du indbetaler 1.000 kr.,
            får du en casino bonus på yderligere 1.000 kr., så du har 2.000 kr. at
            spille for. Denne type casino bonus kaldes en velkomstbonus og er den mest
            populære bonusform på det danske marked. Nogle casino bonusser kan dog give
            dig helt op til 200% eller 300% match, hvilket tredobler eller firdobler
            din indbetaling.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er vigtigt at forstå, at en casino bonus ikke er "gratis penge". Hver
            casino bonus kommer med omsætningskrav, der angiver, hvor mange gange du
            skal spille for bonusbeløbet, før du kan hæve eventuelle gevinster. Alle
            danske casinoer med licens fra Spillemyndigheden opererer med 10x omsætningskrav
            (indskud + bonus), hvilket gør det danske marked til et af de mest spillervenlige i verden.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En vigtig faktor ved valg af casino bonus er bonusstrukturen. Der findes
            grundlæggende to typer: <Link to="/no-sticky-bonus" className={linkClass}>no-sticky
            casino bonus</Link> og <Link to="/sticky-bonus" className={linkClass}>sticky
            casino bonus</Link>. Med en no-sticky casino bonus spiller du med dine egne
            penge først, og bonussen fungerer som et sikkerhedsnet. Med en sticky casino
            bonus blandes din indbetaling og bonus sammen, og du skal omsætte hele beløbet
            før udbetaling. Vi anbefaler altid en no-sticky casino bonus, da den giver
            dig langt mere kontrol over dine penge.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Derudover tilbyder mange danske casinoer løbende casino bonusser til eksisterende
            spillere i form af reload-bonusser, cashback og loyalitetsprogrammer. Disse
            casino bonusser er typisk mindre end velkomstbonussen, men de holder
            spilleglæden i gang og giver ekstra værdi over tid. Den bedste strategi
            er at vælge et casino med en stærk velkomst casino bonus OG gode løbende
            tilbud.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Casino Bonus Strategies */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Strategier til at få mest ud af din casino bonus
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            At vælge den rigtige casino bonus er kun halvdelen af kampen. For at
            maksimere værdien af din casino bonus skal du også have en solid strategi.
            Her deler vi vores bedste tips til at udnytte din casino bonus optimalt.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">
            Vælg spil med høj RTP til din casino bonus
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Når du spiller med en casino bonus, er det klogt at vælge spilleautomater
            med høj Return to Player (RTP). Spil med en RTP på 96% eller højere giver
            dig statistisk set bedre chancer for at beholde din casino bonus-saldo,
            mens du omsætter. Populære højt-RTP-spil inkluderer titler fra{" "}
            <Link to="/spiludviklere" className={linkClass}>førende spiludviklere</Link>{" "}
            som <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/play-n-go" className={linkClass}>Play&apos;n GO</Link> og <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>. Undgå progressive jackpot-spil
            under omsætning af din casino bonus, da de typisk har lavere RTP.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">
            Forstå spilbidrag ved casino bonus omsætning
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ikke alle spil bidrager lige meget til omsætningen af din casino bonus.
            Spilleautomater tæller typisk 100% mod omsætningskravene, mens bordspil
            som blackjack og roulette kun tæller 10-20% – eller slet ikke. Hvis du
            har en casino bonus med 10x omsætningskrav og spiller bordspil med 10%
            bidrag, skal du reelt omsætte 100x dit bonusbeløb. Derfor anbefaler vi
            altid at bruge din casino bonus på spilleautomater for hurtigst mulig
            omsætning.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">
            Timing og bankroll management med casino bonus
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En ofte overset faktor ved casino bonus-spil er bankroll management.
            Start med lave indsatser, når du omsætter din casino bonus, og øg gradvist,
            hvis din saldo vokser. Mange casino bonusser har en max. indsats pr. spin
            (typisk 25-50 kr.) under omsætning – overskrid aldrig denne grænse, da
            det kan annullere hele din casino bonus og eventuelle gevinster.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">
            Sammenlign casino bonus tilbud grundigt
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Den største casino bonus er ikke nødvendigvis den bedste casino bonus.
            En casino bonus på 5.000 kr. med 50x omsætningskrav kan være mindre
            værdifuld end en casino bonus på 1.000 kr. med 5x omsætningskrav. Beregn
            altid den "reelle værdi" af en casino bonus ved at dividere bonusbeløbet
            med omsætningskravet. En casino bonus på 2.000 kr. med 10x krav giver en
            reel værdi på ca. 200 kr. – mens en casino bonus på 5.000 kr. med 50x
            krav kun giver ca. 100 kr. i reel værdi.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Casino Bonus for Different Player Types */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Den bedste casino bonus for hver spillertype
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Forskellige spillere har forskellige behov, og den bedste casino bonus
            afhænger af din spillestil og præferencer. Her gennemgår vi, hvilken
            casino bonus der passer bedst til dig.
          </p>

          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="mb-2 font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Casino bonus for nye spillere
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Som ny spiller bør du vælge en casino bonus med lav minimumsindbetaling
                  og lave omsætningskrav. En no-sticky casino bonus er ideel, da den
                  giver dig mulighed for at lære casinoet at kende uden stor risiko.
                  Start med en casino bonus, der matcher din indbetaling 100%, og
                  sørg for at omsætningskravene er under 15x. Mange{" "}
                  <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link>{" "}
                  tilbyder særligt attraktive casino bonusser for at tiltrække nye
                  spillere.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="mb-2 font-semibold flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Casino bonus for erfarne spillere
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Erfarne spillere bør fokusere på casino bonusser med de bedste
                  vilkår snarere end det højeste bonusbeløb. Kig efter en casino bonus
                  med omsætningskrav under 10x, lang gyldighedsperiode og ingen max.
                  udbetaling. En no-sticky casino bonus giver dig fuld kontrol og
                  mulighed for at hæve store gevinster. Overvej også casino bonusser
                  fra casinoer med stærke VIP-programmer for ekstra værdi over tid.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="mb-2 font-semibold flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Casino bonus for spilleautomatfans
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Hvis du elsker spilleautomater, er en casino bonus med{" "}
                  <Link to="/free-spins" className={linkClass}>free spins</Link>{" "}
                  perfekt til dig. Mange casino bonusser inkluderer 50-200 free spins
                  på populære titler. Vælg en casino bonus, hvor free spins gives på
                  spil med høj RTP, og hvor gevinster fra free spins har lave
                  omsætningskrav. Den bedste casino bonus for slots-spillere kombinerer
                  en matchbonus med et generøst antal free spins.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="mb-2 font-semibold flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Casino bonus for high rollers
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  High rollers har brug for en casino bonus med højt bonusloft og
                  ingen max. udbetaling. Den bedste casino bonus for high rollers har
                  typisk et bonusloft på 5.000-10.000 kr. eller mere. Kig efter
                  casinoer med VIP-casino bonusser, personlige bonustilbud og dedikerede
                  kontoadministratorer. En casino bonus med lave omsætningskrav er
                  særligt vigtig for high rollers, da de omsætter større beløb.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Casino Bonus vs No Bonus */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Casino bonus: Skal du spille med eller uden bonus?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Et spørgsmål mange danske spillere stiller sig er, om det overhovedet
            er værd at aktivere en casino bonus. Svaret afhænger af din spillestil
            og den specifikke casino bonus, der tilbydes. Her gennemgår vi fordele
            og ulemper ved at spille med en casino bonus.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="border-primary/50 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Fordele ved casino bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Mere spilletid og flere chancer for gevinst med en casino bonus</li>
                  <li>• En no-sticky casino bonus fungerer som gratis sikkerhedsnet</li>
                  <li>• Casino bonus med free spins giver gratis runder på populære spil</li>
                  <li>• En casino bonus kan fordoble eller tredoble din indbetaling</li>
                  <li>• Mulighed for at teste nye casinoer med en casino bonus uden risiko</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Ulemper ved casino bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Omsætningskrav kan binde dine gevinster til en casino bonus</li>
                  <li>• Sticky casino bonus forhindrer udbetaling før omsætning</li>
                  <li>• Max. indsats-regler gælder under casino bonus omsætning</li>
                  <li>• Gyldighedsperiode kan presse dig til at spille hurtigere</li>
                  <li>• Ikke alle spil bidrager 100% til casino bonus omsætning</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Vores anbefaling: Vælg altid en casino bonus med{" "}
            <Link to="/no-sticky-bonus" className={linkClass}>no-sticky struktur</Link>{" "}
            og lave omsætningskrav. Med den rigtige casino bonus får du gratis ekstra
            spilletid uden at kompromittere din fleksibilitet. Hvis et casino kun tilbyder
            en sticky casino bonus med høje omsætningskrav, kan det være bedre at spille
            uden bonus.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Casino Bonus Trends 2026 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Casino bonus trends i Danmark 2026
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det danske casino bonus-marked udvikler sig konstant, og 2026 byder
            på flere spændende trends. Her er de vigtigste tendenser inden for
            casino bonus, som danske spillere bør kende til.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Lavere omsætningskrav:</strong> Flere og flere danske casinoer
            tilbyder casino bonusser med omsætningskrav under 10x. Konkurrencen
            om at tilbyde den bedste casino bonus presser kravene nedad, hvilket
            er fantastisk for spillerne. Nogle casinoer tilbyder endda{" "}
            <Link to="/bonus-uden-omsaetningskrav" className={linkClass}>
              casino bonus helt uden omsætningskrav
            </Link>.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>No-sticky som standard:</strong> Den no-sticky casino bonus
            er ved at blive den foretrukne bonusstruktur på det danske marked.
            Flere casinoer skifter fra sticky til no-sticky casino bonus, da
            spillerne foretrækker den øgede fleksibilitet og lavere risiko. Det er
            en positiv udvikling for alle, der søger den bedste casino bonus.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Personaliserede casino bonusser:</strong> I 2026 ser vi flere
            casinoer tilbyde skræddersyede casino bonusser baseret på din
            spillehistorik og præferencer. I stedet for én standard casino bonus
            kan du modtage et tilbud, der er tilpasset netop din spillestil – 
            f.eks. en casino bonus med ekstra free spins, hvis du foretrækker
            spilleautomater, eller cashback, hvis du er en high roller.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Øget gennemsigtighed:</strong> Danske casinoer bliver bedre
            til at kommunikere vilkårene for deres casino bonus klart og tydeligt.
            Spillemyndigheden har skærpet kravene til bonusmarkedsføring, hvilket
            betyder, at du altid kan forvente en fair og gennemsigtig casino bonus
            hos licenserede danske casinoer.
          </p>
        </section>

        <Separator className="my-10" />
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

        <FAQSection title="Ofte stillede spørgsmål om casino bonus" faqs={casinoBonusFaqs} />

        <RelatedGuides currentPath="/casino-bonus" />
      </div>
    </>
  );
};

export default CasinoBonus;
