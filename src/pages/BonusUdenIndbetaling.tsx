import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
  Ban,
  BarChart3,
  Percent,
  Coins,
  Users,
  Star,
  Zap,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";

const bonusUdenIndbetalingFaqs = [
  {
    question: "Hvad er en bonus uden indbetaling?",
    answer:
      "En bonus uden indbetaling er et tilbud fra et online casino, hvor du modtager spillemidler eller gratis spins uden at skulle indsætte penge først. Det bruges typisk som velkomstbonus til nye spillere, men kan også tilbydes eksisterende kunder via kampagner.",
  },
  {
    question: "Hvordan får jeg en bonus uden indbetaling?",
    answer:
      "Opret en konto hos et casino, der tilbyder bonussen. I nogle tilfælde krediteres den automatisk, mens du i andre tilfælde skal indtaste en bonuskode under registrering eller ved kassen.",
  },
  {
    question: "Er der begrænsninger på, hvad jeg kan vinde?",
    answer:
      "Ja, mange casinoer sætter en maksimal grænse for, hvor meget du kan udbetale fra en bonus uden indbetaling. Selv hvis du vinder et større beløb, vil du kun kunne hæve op til det fastsatte maksimum.",
  },
  {
    question: "Hvorfor tilbyder casinoer bonusser uden indbetaling?",
    answer:
      "Casinoer bruger disse bonusser som en strategi for at tiltrække nye kunder og belønne loyale spillere. For nye spillere fungerer det som en risikofri introduktion til casinoets spiludvalg.",
  },
  {
    question: "Hvad er omsætningskrav, og hvordan påvirker det min bonus?",
    answer:
      "Omsætningskravet angiver, hvor stort et beløb du skal spille for, før du kan hæve gevinster. Modtager du f.eks. 100 kr. med 10x omsætningskrav, skal du satse for 1.000 kr. før udbetaling.",
  },
  {
    question: "Kan jeg bruge en bonus uden indbetaling på alle spil?",
    answer:
      "Nej, der er ofte begrænsninger. Casinoer kan begrænse bonusmidler til bestemte spil eller spiltyper. Tjek altid vilkårene for at vide, hvilke spil der tæller med i omsætningskravet.",
  },
];

const BonusUdenIndbetaling = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: bonusUdenIndbetalingFaqs.map((faq) => ({
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
    headline: "Bonus uden Indbetaling – No Deposit Bonus Guide 2026",
    description: "Komplet guide til bonus uden indbetaling hos danske casinoer. Typer, betingelser og strategier.",
    author: { "@type": "Organization", name: "Casinoaftaler" },
    publisher: { "@type": "Organization", name: "Casinoaftaler" },
    datePublished: "2025-06-01",
    dateModified: "2026-02-11",
    mainEntityOfPage: "https://bonushuset-buddy.lovable.app/bonus-uden-indbetaling",
  };

  return (
    <>
      <Helmet>
        <title>Bonus uden Indbetaling – No Deposit Bonus Guide 2026 | Casinoaftaler</title>
        <meta
          name="description"
          content="Komplet guide til bonus uden indbetaling hos danske casinoer. Lær hvordan no deposit bonusser fungerer, typer, betingelser og strategier for at maksimere din bonus."
        />
        <link rel="canonical" href="https://bonushuset-buddy.lovable.app/bonus-uden-indbetaling" />
        <meta property="og:title" content="Bonus uden Indbetaling – No Deposit Bonus Guide 2026" />
        <meta
          property="og:description"
          content="Alt du skal vide om bonus uden indbetaling hos danske casinoer. Typer, betingelser og strategier."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bonushuset-buddy.lovable.app/bonus-uden-indbetaling" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      </Helmet>

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
              Bonus uden Indbetaling
            </h1>
            <p className="text-lg text-white/80">
              En bonus uden indbetaling giver dig mulighed for at spille
              helt gratis. Lær hvordan no deposit bonusser fungerer,
              hvilke typer der findes, og hvordan du får mest ud af dem.
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
              <span className="font-medium text-foreground">10 Min.</span>
            </span>
          </div>
        </div>

        {/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvad er en bonus uden indbetaling?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En bonus uden indbetaling – også kaldet no deposit bonus – er
            et af de mest eftertragtede tilbud på casinomarkedet. Med
            denne type bonus belønnes du blot for at oprette en konto,
            helt uden at du behøver at indsætte penge. Bonussen kan
            komme i form af{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">
              gratis spins
            </Link>{" "}
            på spilleautomater eller som et mindre pengebeløb direkte på
            din spillekonto.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Denne bonustype er særligt populær, fordi den giver dig
            mulighed for at afprøve casinoets spiludvalg uden økonomisk
            risiko. Gevinster fra en no deposit bonus er dog typisk
            underlagt{" "}
            <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
              omsætningskrav
            </Link>
            . Foretrækker du en bonus hvor du beholder alt med det samme,
            kan en{" "}
            <Link to="/bonus-uden-omsaetningskrav" className="text-primary underline hover:text-primary/80">
              bonus uden omsætningskrav
            </Link>{" "}
            være et bedre valg. Ønsker du i stedet at maksimere din
            indbetaling, er en{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">
              indskudsbonus
            </Link>{" "}
            eller{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">
              velkomstbonus
            </Link>{" "}
            værd at overveje.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Sådan fungerer det */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan fungerer bonusser uden indbetaling
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            For at modtage en bonus uden indbetaling kræver det typisk,
            at du er ny spiller og opretter en konto hos et online casino.
            Når din konto er aktiv, krediteres bonussen automatisk – eller
            du skal indtaste en bonuskode for at aktivere den.
          </p>

          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="h-5 w-5 text-primary" />
                  Gratis spins ved registrering
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mange casinoer tilbyder gratis spins på populære
                  spilleautomater ved oprettelse. F.eks. 20 gratis spins
                  på Book of Dead, hvor gevinster kan gå ind som kontanter
                  uden yderligere omsætningskrav.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Coins className="h-5 w-5 text-primary" />
                  Gratis kontanter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nogle casinoer indsætter et fast kontantbeløb – typisk
                  mellem 50 og 200 kr. – direkte på din spillekonto. Du
                  kan frit vælge, hvilke spil du vil bruge pengene på,
                  inden for bonussens vilkår.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Kombineret med velkomstbonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ofte kombineres no deposit bonussen med en klassisk{" "}
                  <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">
                    velkomstbonus
                  </Link>
                  . Du starter med gratis spins eller
                  kontanter, og når den risikofri runde er overstået,
                  venter en{" "}
                  <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">
                    matchbonus (indskudsbonus)
                  </Link>{" "}
                  på din første indbetaling.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Typer af no deposit bonusser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Typer af no deposit bonusser
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Der findes flere varianter af bonusser uden indbetaling. Hver
            type har sine unikke fordele, og det kan hjælpe dig at vælge
            det tilbud, der passer bedst til din spillestil.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Free spins uden indbetaling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Den mest populære variant. Du modtager gratis spins på
                  udvalgte spilleautomater. Antallet varierer fra 10 til
                  100 spins, og værdien svarer typisk til minimumindsatsen
                  på det pågældende spil.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Coins className="h-5 w-5 text-primary" />
                  Gratis kontant bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Casinoet indsætter et kontantbeløb på din konto. Giver
                  mere fleksibilitet end free spins, da du selv kan vælge
                  spil. Beløbet er typisk mellem 50–200 kr. med tilhørende
                  omsætningskrav.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  Loyalitetsbonusser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Belønner eksisterende spillere for engagement. Du
                  optjener point ved at spille, som kan veksles til gratis
                  spins eller kontantbonusser. Jo højere rang i
                  loyalitetsprogrammet, desto bedre belønninger.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-primary" />
                  VIP-bonusser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Eksklusive tilbud til de mest trofaste spillere. Kan
                  omfatte højere kontantbonusser, adgang til eksklusive
                  turneringer og personlige gaver – skræddersyet til den
                  enkelte spillers vaner.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Betingelser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Betingelser og vilkår for bonus uden indbetaling
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Selvom bonusser uden indbetaling er "gratis", kommer de altid
            med betingelser. Det er afgørende at forstå disse vilkår for
            at undgå overraskelser og få mest muligt ud af din bonus.
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
                  Det mest almindelige vilkår. Angiver hvor mange gange
                  bonusbeløbet skal gennemspilles, før gevinster kan
                  udbetales. I Danmark er loftet 10x takket være
                  Spillemyndigheden. Læs mere i vores guide til{" "}
                  <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
                    omsætningskrav
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="h-5 w-5 text-primary" />
                  Maksimal gevinst
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mange casinoer begrænser, hvor meget du kan vinde med
                  din bonus. Selv ved en stor jackpot kan du kun udbetale
                  op til et fastsat beløb. Resten kan bruges til fortsat
                  spil.
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
                  Omsætningskravene skal opfyldes inden for en bestemt
                  periode – typisk 30–60 dage. Nås fristen ikke,
                  bortfalder bonussen og alle tilknyttede gevinster.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Ban className="h-5 w-5 text-primary" />
                  Begrænset spilvalg
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Din bonus kan kun bruges på bestemte spil. Casinoer
                  gør dette for at promovere nye spiltitler eller styre,
                  hvilke spil der kan spilles med bonusmidler.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Spillemyndighedens loft */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Spillemyndighedens loft for omsætningskrav
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I Danmark har Spillemyndigheden sat et loft på maksimalt 10x
            for{" "}
            <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
              omsætningskrav
            </Link>
            . Det betyder, at danske casinoer aldrig kan
            kræve, at du gennemspiller en bonus mere end 10 gange. Det er
            en stor fordel for danske spillere sammenlignet med udenlandske
            markeder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            På casinoer under MGA eller UKGC-licens findes der intet loft,
            og omsætningskrav på 20–40x er helt almindelige. I Sverige
            ligger gennemsnittet på omkring 35x. Det danske loft skaber
            derfor et markant mere spillervenligt miljø.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Strategier */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Strategier til at maksimere din bonus
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Med den rette tilgang kan du øge dine chancer for at omsætte
            en bonus uden indbetaling til reel gevinst. Her er de
            vigtigste strategier.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Vælg spil med høj RTP",
                desc: "Spilleautomater med høj tilbagebetalingsprocent (RTP) giver bedre chancer for at holde din saldo i live. Kig efter spil med RTP over 96% og lav volatilitet.",
                icon: BarChart3,
              },
              {
                title: "Brug små indsatser",
                desc: "Mindre indsatser forlænger din spilletid og reducerer risikoen for at tømme saldoen for hurtigt. Du når stadig omsætningskravet – det tager bare lidt længere tid.",
                icon: TrendingUp,
              },
              {
                title: "Læs vilkårene grundigt",
                desc: "Forstå omsætningskrav, tidsbegrænsninger og spilrestriktioner, inden du accepterer bonussen. Vær opmærksom på, hvilke spil der tæller med.",
                icon: CheckCircle2,
              },
              {
                title: "Hold øje med kampagner",
                desc: "Tilmeld dig casinoets nyhedsbrev og følg dem på sociale medier. Sjældne kampagner kan tilbyde ekstraordinær værdi med bonusser uden indbetaling.",
                icon: Target,
              },
              {
                title: "Implementer stop-loss",
                desc: "Sæt en grænse for, hvor meget du er villig til at tabe. Jagt aldrig tab, og stop når grænsen er nået. Ansvarligt spil er altid den bedste strategi.",
                icon: ShieldCheck,
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

        {/* Sammenligning */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            No deposit bonus vs. bonus med lavt omsætningskrav
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Mens en bonus uden indbetaling tilbyder en risikofri start,
            kommer den ofte med højere omsætningskrav sammenlignet med
            bonusser, der kræver en indbetaling. Her er de vigtigste
            forskelle at overveje.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="h-5 w-5 text-primary" />
                  Bonus uden indbetaling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  <strong>Fordele:</strong> Ingen risiko, god til at
                  udforske nye casinoer og spil risikofrit.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Ulemper:</strong> Ofte strengere vilkår, lavere
                  bonusbeløb og maksimal gevinstgrænse.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Percent className="h-5 w-5 text-primary" />
                  Bonus med lavt omsætningskrav
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  <strong>Fordele:</strong> Lavere omsætningskrav gør det
                  lettere at omdanne bonus til rigtige penge.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Ulemper:</strong> Kræver en initial investering,
                  hvilket indebærer en vis risiko.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Ansvarligt spil */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Ansvarligt spil
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bonusser uden indbetaling tilbyder en unik mulighed for at
            opleve et casino uden økonomisk risiko. Selvom det er fristende
            at dykke lige ind, er det vigtigt at huske på principperne for
            ansvarligt spil. Sæt realistiske forventninger, forstå
            vilkårene og spil altid for underholdningens skyld.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Nyd spillet uden at forfølge tab eller lade spillet påvirke dit
            daglige liv. Benyt casinoernes værktøjer til selvudelukkelse
            via Rofus og kontakt StopSpillet.dk for rådgivning om
            spilafhængighed. Husk – spil skal altid betragtes som
            underholdning.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Opsummering */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Opsummering</h2>
          <div className="space-y-3">
            {[
              {
                icon: Gift,
                title: "Risikofri start",
                desc: "En bonus uden indbetaling giver dig mulighed for at udforske casinoer og spil helt gratis – uden at sætte egne penge på spil.",
              },
              {
                icon: Scale,
                title: "Dansk lovgivning beskytter dig",
                desc: "Spillemyndighedens loft på 10x sikrer rimelige omsætningskrav. In-game gevinster tæller altid med i omsætningen.",
              },
              {
                icon: AlertTriangle,
                title: "Læs det med småt",
                desc: "Omsætningskrav, maksimal gevinst, tidsbegrænsninger og spilrestriktioner afgør bonussens reelle værdi.",
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

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            <HelpCircle className="mr-2 inline h-7 w-7 text-primary" />
            Ofte stillede spørgsmål
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {bonusUdenIndbetalingFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="rounded-lg border border-border bg-card px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <RelatedGuides currentPath="/bonus-uden-indbetaling" />
      </div>
    </>
  );
};

export default BonusUdenIndbetaling;
