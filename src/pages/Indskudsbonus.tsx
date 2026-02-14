import React from "react";
import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
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

const linkClass = "text-primary underline hover:text-primary/80";

const indskudsbonusFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er en indskudsbonus?",
    answer: (
      <>
        En indskudsbonus er en kampagnebonus fra online casinoer, som matcher din indbetaling med en procentdel – typisk 100%. Det betyder, at du får ekstra spillemidler oven i dit indskud. Den bruges ofte som{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> til nye spillere.
      </>
    ),
  },
  {
    question: "Tilbyder danske casinoer indskudsbonus?",
    answer: (
      <>
        Ja, mange licenserede danske casinoer tilbyder indskudsbonusser. De bruges til at tiltrække nye spillere og belønne eksisterende kunder. Se vores{" "}
        <Link to="/casino-anmeldelser" className={linkClass}>casino anmeldelser</Link> for konkrete eksempler.
      </>
    ),
  },
  {
    question: "Kan jeg vinde rigtige penge med en indskudsbonus?",
    answer: (
      <>
        Ja, du kan vinde rigtige penge. Dog skal du opfylde{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskravene</Link>, før du kan hæve eventuelle gevinster fra bonussen.
      </>
    ),
  },
  {
    question: "Hvem er indskudsbonus bedst egnet til?",
    answer:
      "Indskudsbonusser er velegnede til både nye spillere, der vil maksimere deres første indbetaling, og erfarne spillere, der ønsker ekstra midler. De giver mulighed for at udforske flere spil uden at risikere lige så mange egne penge.",
  },
  {
    question: "Hvordan aktiverer jeg en indskudsbonus?",
    answer:
      "Opret en konto hos et casino der tilbyder bonussen, foretag en indbetaling, og bonussen tilføjes automatisk til din konto – eller aktiveres via en bonuskode, hvis det kræves.",
  },
  {
    question: "Hvad er omsætningskravene for en indskudsbonus?",
    answer: (
      <>
        <Link to="/omsaetningskrav" className={linkClass}>Omsætningskravene</Link> angiver, hvor mange gange bonusbeløbet skal gennemspilles, før gevinster kan hæves. F.eks. kræver en bonus på 1.000 kr. med 10x omsætning, at du spiller for 10.000 kr. i alt.
      </>
    ),
  },
  {
    question: "Er der indsatsgrænser på indskudsbonusser?",
    answer:
      "Ja, der er typisk en maksimal indsats per spilrunde, når du bruger bonuspenge – ofte omkring 50 kr. per spin. Disse grænser skal overholdes for at bonussen forbliver aktiv.",
  },
  {
    question: "Kan jeg hæve gevinster fra en indskudsbonus?",
    answer: (
      <>
        Ja, men først efter at{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskravene</Link> er opfyldt. Når kravene er gennemført inden for tidsfristen, kan du frit hæve dine gevinster.
      </>
    ),
  },
];

const Indskudsbonus = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: indskudsbonusFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Indskudsbonus – Komplet Guide til Matchbonusser 2026",
    description: "Alt du skal vide om indskudsbonusser hos danske casinoer. Matchbonusser, betingelser og strategier.",
    author: { "@type": "Organization", name: "Casinoaftaler" },
    publisher: { "@type": "Organization", name: "Casinoaftaler" },
    datePublished: "2025-06-01",
    dateModified: "2026-02-11",
    mainEntityOfPage: "https://casinoaftaler.dk/indskudsbonus",
  };

  return (
    <>
      <SEO
        title="Indskudsbonus – Komplet Guide til Matchbonusser 2026 | Casinoaftaler"
        description="Alt du skal vide om indskudsbonusser hos danske casinoer. Lær hvordan matchbonusser fungerer, betingelser, aktivering og strategier for at maksimere din bonus."
        jsonLd={[faqJsonLd, articleJsonLd]}
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
              <span className="font-medium text-foreground">11-02-2026</span>
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

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={indskudsbonusHero} alt="Indskudsbonus – gyldne mønter og deposit bonus" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvad er en indskudsbonus?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En indskudsbonus er en af de mest populære og attraktive
            bonustyper hos danske online casinoer. Denne form for bonus
            matcher din indbetaling med en procentdel – typisk 100% – så
            du får dobbelt så mange penge at spille for. Indskudsbonussen
            bruges ofte som{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">
              velkomstbonus
            </Link>{" "}
            til nye spillere, men tilbydes også til loyale kunder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            En indskudsbonus kaldes også for en matchbonus, da den netop
            matcher en procentdel af din indbetaling. Alle indskudsbonusser
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
            .
          </p>
        </section>

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

        <InlineCasinoCards title="Casinoer med attraktive indskudsbonusser" />

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

        {/* Indskudsbonus markedsoverblik */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Indskudsbonus i Danmark 2026 – Trends og markedsoverblik
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Indskudsbonus er fortsat den mest populære bonustype på det danske casinomarked i 2026. Næsten alle danske casinoer bruger en indskudsbonus som deres primære <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonus</Link>, og konkurrencen om at tilbyde den bedste indskudsbonus presser vilkårene i en stadig mere spillervenlig retning.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den typiske indskudsbonus i Danmark tilbyder 100% match op til 1.000-2.000 kr. med omsætningskrav på 5-10x. Nogle casinoer differentierer sig med indskudsbonusser på 200% eller endda 300% match, mens andre fokuserer på at tilbyde de lavest mulige <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link>. Den bedste indskudsbonus balancerer et generøst matchbeløb med fair vilkår.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En vigtig udvikling er, at flere indskudsbonusser nu tilbydes med <Link to="/no-sticky-bonus" className="text-primary underline hover:text-primary/80">no-sticky struktur</Link>, som holder din indbetaling adskilt fra bonusmidlerne. Det betyder, at du kan hæve gevinster fra din egen indbetaling uden omsætningskrav – en klar fordel i forhold til den traditionelle <Link to="/sticky-bonus" className="text-primary underline hover:text-primary/80">sticky indskudsbonus</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Mange indskudsbonusser inkluderer også <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link> som ekstra bonus oven i matchbeløbet. Disse kombinerede pakker giver dig både ekstra spillekapital og gratis omgange på populære spilleautomater, hvilket gør indskudsbonussen til det mest alsidige bonustilbud på markedet.
          </p>
        </section>

        <Separator className="my-10" />
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Ansvarligt spil
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at sikre at din oplevelse med online casinoer forbliver
            underholdende og sikker, er det vigtigt at sætte grænser for
            både tid og penge. Hvis du mærker, at du mister kontrollen,
            eller at spillet ikke længere bringer glæde, bør du tage en
            pause og søge hjælp.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Mange casinoer tilbyder værktøjer som Rofus til selvudelukkelse
            samt indbetalingsgrænser for at regulere din spilaktivitet.
            Besøg StopSpillet.dk for rådgivning om spilafhængighed. Husk
            altid, at spil skal være sjovt og aldrig betragtes som en
            indtægtskilde.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Opsummering */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Opsummering</h2>
          <div className="space-y-3">
            {[
              {
                icon: DollarSign,
                title: "Ekstra værdi for din indbetaling",
                desc: "En indskudsbonus matcher din indbetaling og giver dig flere midler at spille for – typisk 100% op til et maksimumbeløb.",
              },
              {
                icon: Scale,
                title: "Danske regler beskytter dig",
                desc: "Spillemyndighedens loft på 10x omsætningskrav sikrer rimelige vilkår. In-game gevinster tæller altid med.",
              },
              {
                icon: AlertTriangle,
                title: "Læs betingelserne grundigt",
                desc: "Maks. indsats, tidsfrister, udelukkede spil og betalingsmetoder påvirker alle bonussens reelle værdi.",
              },
              {
                icon: ShieldCheck,
                title: "Spil ansvarligt",
                desc: "Sæt et budget, jagt aldrig tab, og benyt hjælpeværktøjer som StopSpillet.dk og ROFUS ved behov.",
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

        <RelatedGuides currentPath="/indskudsbonus" />

        <FAQSection title="Ofte stillede spørgsmål om indskudsbonus" faqs={indskudsbonusFaqs} />
      </div>
    </>
  );
};

export default Indskudsbonus;
