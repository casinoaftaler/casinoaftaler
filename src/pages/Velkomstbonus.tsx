import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { RelatedGuides } from "@/components/RelatedGuides";
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
  Star,
  Trophy,
  RefreshCw,
  Zap,
  Lock,
  TrendingUp,
  CreditCard,
  Users,
  BarChart3,
  ListChecks,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const velkomstbonusFaqs = [
  {
    question: "Hvad er en velkomstbonus?",
    answer:
      "En velkomstbonus er et tilbud fra et online casino til nye spillere ved deres første tilmelding og indbetaling. Det er typisk en matchbonus, hvor casinoet matcher din indbetaling med en bestemt procentdel – fx 100% op til 1.000 kr. Nogle velkomstbonusser inkluderer også gratis spins på udvalgte spilleautomater.",
  },
  {
    question: "Kan alle få en velkomstbonus?",
    answer:
      "Velkomstbonusser er forbeholdt nye spillere, der opretter en konto for første gang hos det pågældende casino. Du kan kun modtage én velkomstbonus per casino, og du skal typisk foretage en minimumsindbetaling for at aktivere tilbuddet.",
  },
  {
    question: "Hvad betyder omsætningskrav?",
    answer:
      "Omsætningskrav angiver, hvor mange gange du skal spille bonusbeløbet igennem, før du kan hæve dine gevinster. Fx betyder et omsætningskrav på 10x, at en bonus på 500 kr. kræver, at du satser for i alt 5.000 kr., før pengene kan udbetales.",
  },
  {
    question: "Er det altid en god idé at tage imod en velkomstbonus?",
    answer:
      "Det afhænger af din spillestil og bonussens vilkår. Hvis omsætningskravene er rimelige, og du alligevel planlægger at spille, kan det give dig ekstra værdi. Men hvis vilkårene er for strenge – fx høje omsætningskrav eller korte tidsfrister – kan det være bedre at spille uden bonus.",
  },
  {
    question: "Hvad sker der, hvis jeg ikke opfylder omsætningskravene?",
    answer:
      "Hvis du ikke når at opfylde omsætningskravene inden for den angivne tidsramme, mister du typisk bonusbeløbet og eventuelle gevinster, der stammer fra bonussen. Din egen indbetaling vil dog normalt stadig være tilgængelig.",
  },
  {
    question: "Kan jeg bruge en velkomstbonus på alle spil?",
    answer:
      "Nej, de fleste velkomstbonusser har begrænsninger på, hvilke spil der bidrager til omsætningskravet. Spilleautomater bidrager typisk 100%, mens bordspil som blackjack og roulette ofte kun bidrager med 10-20%. Live casino-spil kan være helt udelukket.",
  },
];

const bonusTypes = [
  {
    id: "matchbonus",
    name: "Matchbonus (100%)",
    icon: TrendingUp,
    description:
      "Den mest udbredte form for velkomstbonus. Casinoet matcher din første indbetaling med en bestemt procentdel – typisk 100%. Indbetaler du fx 500 kr., får du yderligere 500 kr. i bonuspenge at spille for.",
  },
  {
    id: "free-spins-combo",
    name: "Matchbonus + Free Spins",
    icon: Sparkles,
    description:
      "Mange casinoer kombinerer en matchbonus med et antal gratis spins på populære spilleautomater. Det giver dig både ekstra penge og gratis omgange, som tilsammen kan øge dine gevinstchancer markant.",
  },
  {
    id: "no-deposit",
    name: "Velkomstbonus uden indbetaling",
    icon: Gift,
    description:
      "Sjælden men attraktiv – her modtager du en bonus eller gratis spins uden at skulle indbetale penge først. Denne type har typisk højere omsætningskrav og lavere bonusbeløb, men er helt risikofri for spilleren.",
  },
  {
    id: "tiered",
    name: "Flertrinspakke",
    icon: Trophy,
    description:
      "Nogle casinoer fordeler velkomstbonussen over de første 2-4 indbetalinger. Hver indbetaling udløser en ny bonus, hvilket giver dig bonusfordele over en længere periode og fordeler risikoen.",
  },
];

const Velkomstbonus = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: velkomstbonusFaqs.map((faq) => ({
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
    headline: "Velkomstbonus – Komplet Guide til Casino Velkomstbonusser 2026",
    description: "Alt du skal vide om velkomstbonusser på danske casinoer. Typer, omsætningskrav og tips.",
    author: { "@type": "Organization", name: "Casinoaftaler" },
    publisher: { "@type": "Organization", name: "Casinoaftaler" },
    datePublished: "2025-06-01",
    dateModified: "2026-02-11",
    mainEntityOfPage: "https://casinoaftaler.dk/velkomstbonus",
  };

  return (
    <>
      <Helmet>
        <title>Velkomstbonus – Komplet Guide til Casino Velkomstbonusser 2026 | Casinoaftaler</title>
        <meta
          name="description"
          content="Alt du skal vide om velkomstbonusser på danske casinoer. Typer, omsætningskrav, betingelser og tips til at vælge den bedste velkomstbonus."
        />
        <link rel="canonical" href="https://casinoaftaler.dk/velkomstbonus" />
        <meta property="og:title" content="Velkomstbonus – Komplet Guide til Casino Velkomstbonusser 2026" />
        <meta
          property="og:description"
          content="Alt du skal vide om velkomstbonusser på danske casinoer. Typer, omsætningskrav og tips."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://casinoaftaler.dk/velkomstbonus" />
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
              Velkomstbonus på Danske Casinoer
            </h1>
            <p className="text-lg text-white/80">
              En velkomstbonus er din bedste ven, når du starter hos et nyt
              casino. Lær hvordan de fungerer, hvilke typer der findes, og
              hvordan du får mest muligt ud af din første indbetaling.
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
              <span className="font-medium text-foreground">11 Min.</span>
            </span>
          </div>
        </div>

        {/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvad er en velkomstbonus?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En velkomstbonus er det tilbud, som et online casino giver nye
            spillere ved deres første tilmelding. Det er i bund og grund
            casinoets måde at sige "velkommen" på – og det er en fordel for
            begge parter. Du får ekstra penge eller{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">
              gratis spins
            </Link>{" "}
            at spille for, mens casinoet vinder en ny kunde.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den mest gængse form er en{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">
              matchbonus (indskudsbonus)
            </Link>
            , hvor casinoet matcher din første indbetaling med en bestemt
            procentdel. Indbetaler du fx 500 kr. med en 100% matchbonus, får
            du 500 kr. ekstra – altså 1.000 kr. i alt at spille for. Alle
            velkomstbonusser kommer med{" "}
            <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
              omsætningskrav
            </Link>
            , som du skal opfylde, før gevinster kan udbetales. Der findes også{" "}
            <Link to="/bonus-uden-indbetaling" className="text-primary underline hover:text-primary/80">
              velkomstbonusser uden indbetaling
            </Link>
            , hvor du slet ikke skal sætte penge ind for at komme i gang.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Typer af velkomstbonusser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Typer af velkomstbonusser</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Velkomstbonusser kommer i flere varianter, og det kan betale sig
            at kende forskellen, så du vælger det tilbud, der passer bedst
            til din spillestil og dit budget.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bonusTypes.map((type) => (
              <Card key={type.id} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <type.icon className="h-5 w-5 text-primary" />
                    {type.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {type.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Regler og betingelser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Regler og betingelser du skal kende
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Alle velkomstbonusser følger med vilkår og betingelser. At forstå
            disse krav er afgørende for at udnytte bonussen optimalt og
            undgå ubehagelige overraskelser undervejs.
          </p>

          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  Omsætningskrav
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
                    Omsætningskravet
                  </Link>{" "}
                  angiver, hvor mange gange bonusbeløbet
                  skal gennemspilles, før gevinster kan udbetales. Får du fx
                  en bonus på 1.000 kr. med 10x omsætningskrav, skal du
                  satse for 10.000 kr. i alt. Kig efter casinoer med lave
                  krav (5-10x) for den bedste værdi, eller overvej en{" "}
                  <Link to="/bonus-uden-omsaetningskrav" className="text-primary underline hover:text-primary/80">
                    bonus uden omsætningskrav
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Indsatsstørrelser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  De fleste bonusser har en maksimal indsats pr. spilrunde –
                  typisk omkring 50 kr. Overskrides denne grænse, risikerer
                  du at miste bonussen og dine gevinster. Hold altid øje
                  med denne begrænsning i bonusvilkårene.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  Tidsgrænser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Velkomstbonusser har altid en tidsbegrænsning for opfyldelse
                  af omsætningskravene – typisk mellem 30 og 60 dage. Når
                  fristen udløber, annulleres bonussen og eventuelle
                  tilknyttede gevinster automatisk.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="h-5 w-5 text-primary" />
                  Profitgrænser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mange casinoer sætter et loft for, hvor meget du kan vinde
                  med bonuspenge. Selvom du rammer en stor gevinst, kan et
                  gevinstloft begrænse det beløb, du faktisk kan udbetale.
                  Tjek altid denne detalje i vilkårene.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Spilbidrag til omsætning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ikke alle spil bidrager ens til{" "}
                  <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
                    omsætningskravet
                  </Link>
                  .
                  Spilleautomater bidrager typisk 100%, mens bordspil som
                  blackjack og roulette kun tæller 10-20%. Live casino-spil
                  kan være helt udelukket. Planlæg din strategi derefter.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <InlineCasinoCards title="Casinoer med de bedste velkomstbonusser" />

        <Separator className="my-10" />

        {/* Sådan gør du krav på en velkomstbonus */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan aktiverer du en velkomstbonus
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Processen er enkel og næsten identisk hos alle danske casinoer.
            Følg disse trin for at komme godt i gang med din velkomstbonus.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Trin 1: Vælg det rette casino",
                desc: "Undersøg casinoernes bonusvilkår, spiludbud og anmeldelser. Find det casino med den velkomstbonus, der matcher dine behov – husk at den største bonus ikke nødvendigvis er den bedste.",
                icon: Target,
              },
              {
                title: "Trin 2: Opret din konto",
                desc: "Tilmeld dig hos det valgte casino med dine korrekte personoplysninger. Det er vigtigt at indtaste nøjagtige data for at undgå problemer ved verifikation og senere udbetalinger.",
                icon: Users,
              },
              {
                title: "Trin 3: Bekræft din identitet",
                desc: "De fleste danske casinoer kræver identitetsverifikation via MitID eller e-mail-bekræftelse. Dette sikrer et trygt spilmiljø og er lovpligtigt i Danmark.",
                icon: ShieldCheck,
              },
              {
                title: "Trin 4: Foretag din første indbetaling",
                desc: "Vælg din foretrukne betalingsmetode og indbetal mindst minimumsbeløbet. Bonussen aktiveres typisk automatisk ved indbetalingen – tjek om der kræves en bonuskode.",
                icon: CreditCard,
              },
              {
                title: "Trin 5: Begynd at spille",
                desc: "Udforsk casinoets spiludbud og brug dine bonusmidler strategisk. Vælg spil med høj RTP og husk at tjekke, hvilke spil der bidrager fuldt til omsætningskravet.",
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

        {/* Hvilke spil */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvilke spil kan du spille med en velkomstbonus?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            De fleste online casinoer tillader brug af bonuspenge på et
            bredt udvalg af spilleautomater – herunder populære titler som
            Starburst, Book of Dead og Gonzo's Quest. Spilleautomater
            bidrager typisk 100% til omsætningskravet, hvilket gør dem til
            det mest effektive valg under bonusspil.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bordspil som blackjack, roulette og baccarat er ofte tilladte,
            men bidrager kun delvist – typisk 10-20% – til omsætningen.
            Det betyder, at det tager væsentligt længere tid at opfylde
            kravene, hvis du primært spiller bordspil.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Live casino-spil er i nogle tilfælde helt udelukket fra
            bonusspil. Tjek altid de specifikke vilkår for den bonus, du
            aktiverer, så du undgår at spille på spil, der ikke tæller med.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Sammenligning med andre bonusser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Velkomstbonus vs. andre bonustyper
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Der findes mange forskellige bonusser i casinoverdenen. Her er
            en oversigt over, hvordan velkomstbonussen adskiller sig fra de
            øvrige typer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  Reload-bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Gives ved efterfølgende indbetalinger og er typisk mindre
                  generøs end velkomstbonussen. Til gengæld kan
                  omsætningskravene være mere lempelige, og de er
                  tilgængelige for eksisterende kunder.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="h-5 w-5 text-primary" />
                  No Deposit Bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Helt risikofri, da du ikke skal indbetale noget. Til
                  gengæld er bonusbeløbene små, og{" "}
                  <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
                    omsætningskravene
                  </Link>{" "}
                  ofte højere. Ideel til at afprøve et casino uden økonomisk
                  forpligtelse. Læs mere i vores guide til{" "}
                  <Link to="/bonus-uden-indbetaling" className="text-primary underline hover:text-primary/80">
                    bonus uden indbetaling
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Cashback-bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Giver dig en procentdel af dine tab tilbage som
                  bonuspenge. Disse bonusser tilbyder ikke den samme
                  øjeblikkelige boost som en velkomstbonus, men hjælper med
                  at minimere tab over tid.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Free Spins
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Gratis omgange på spilleautomater. Kan indgå som en del
                  af velkomstpakken eller tilbydes separat. Ideelle til at
                  prøve nye spil uden at satse egne penge. Læs vores{" "}
                  <Link to="/free-spins" className="text-primary underline hover:text-primary/80">
                    komplette guide til free spins
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Hvem er det for */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvem er velkomstbonussen for?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Velkomstbonusser henvender sig primært til nye spillere, der
            ønsker en stærk start hos et nyt casino. De giver dig
            mulighed for at udforske casinoets platform og spiludbud med
            ekstra midler, så du kan finde dine favoritspil uden at
            bruge for mange af dine egne penge.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Desuden er velkomstbonusser attraktive for spillere, der ønsker
            at maksimere værdien af deres første indbetaling. Selvom VIP-
            og high roller-spillere ofte foretrækker skræddersyede tilbud,
            er velkomstbonussen det ideelle udgangspunkt for alle, der vil
            have mest muligt ud af deres casinooplevelse fra dag ét.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Ansvarligt spil */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Ansvarligt spil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Selvom velkomstbonusser kan forbedre din spiloplevelse, er det
            vigtigt altid at spille ansvarligt. Sæt et budget, du har råd
            til at tabe, og overskrid det aldrig – uanset hvor fristende
            bonussen måtte være.
          </p>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Hjælp og ressourcer</h3>
                <p className="text-sm text-muted-foreground">
                  Hvis du oplever problemer med dit spil, kan du kontakte
                  StopSpillet.dk for rådgivning eller registrere dig i
                  ROFUS for selvudelukkelse fra danske casinoer. Alle
                  danske licenserede casinoer er forpligtede til at tilbyde
                  værktøjer til ansvarligt spil.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Opsummering */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Opsummering</h2>
          <div className="space-y-3">
            {[
              {
                icon: CheckCircle2,
                title: "Forstå bonustypen",
                desc: "Kend forskellen på matchbonus, free spins og no deposit-tilbud, så du vælger det rette for dig.",
              },
              {
                icon: AlertTriangle,
                title: "Læs vilkårene grundigt",
                desc: "Omsætningskrav, tidsfrister og indsatsbegrænsninger er afgørende for bonussens reelle værdi.",
              },
              {
                icon: Target,
                title: "Vælg spil strategisk",
                desc: "Prioritér spilleautomater med høj RTP, da de bidrager 100% til omsætningskravet.",
              },
              {
                icon: ShieldCheck,
                title: "Spil altid ansvarligt",
                desc: "Sæt et budget, overhold det, og benyt dig af de hjælpeværktøjer, som casinoerne tilbyder.",
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
            {velkomstbonusFaqs.map((faq, index) => (
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

        <RelatedGuides currentPath="/velkomstbonus" />
      </div>
    </>
  );
};

export default Velkomstbonus;
