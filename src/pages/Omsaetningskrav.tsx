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
  RefreshCw,
  Lock,
  TrendingUp,
  CreditCard,
  Scale,
  Calculator,
  Ban,
  BarChart3,
  Percent,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const omsaetningskravFaqs = [
  {
    question: "Hvad er et omsætningskrav?",
    answer:
      "Et omsætningskrav (også kaldet gennemspilningskrav) angiver, hvor mange gange du skal spille et bonusbeløb igennem, før du kan hæve eventuelle gevinster. Fx betyder et krav på 10x, at en bonus på 500 kr. kræver, at du samlet satser for 5.000 kr.",
  },
  {
    question: "Gælder omsætningskrav kun for bonusser?",
    answer:
      "Nej. Alle indbetalinger til danske casinoer har et omsætningskrav på minimum 1x. Det betyder, at du skal spille for hele dit indbetalte beløb mindst én gang, før du kan hæve pengene. Dette skyldes hvidvaskningslovgivningen og gælder uanset, om du modtager en bonus eller ej.",
  },
  {
    question: "Hvad betyder (d+b) i omsætningskrav?",
    answer:
      "Forkortelsen (d+b) står for 'deposit + bonus', altså indbetaling + bonus. Det betyder, at omsætningskravet gælder for både dit indbetalte beløb og bonusbeløbet tilsammen. Indbetaler du 500 kr. og får 500 kr. i bonus med 10x (d+b), skal du satse for i alt 10.000 kr.",
  },
  {
    question: "Hvad er det maksimale omsætningskrav i Danmark?",
    answer:
      "I Danmark har Spillemyndigheden sat et loft på maksimalt 10x for omsætningskrav på bonusser. Dette sikrer, at danske licenserede casinoer tilbyder rimelige vilkår for spillerne. Kravet er en del af den danske spillelovgivning.",
  },
  {
    question: "Hvad sker der, hvis jeg løber tør for penge under omsætningen?",
    answer:
      "Hvis du løber tør for penge, før omsætningskravet er opfyldt, kan du enten indbetale flere penge og fortsætte, eller acceptere at bonussen og tilknyttede gevinster går tabt. Det er derfor vigtigt at vælge bonusser, der passer til dit budget.",
  },
  {
    question: "Tæller alle spil lige meget mod omsætningskravet?",
    answer:
      "Nej. Spilleautomater bidrager typisk 100% til omsætningskravet, mens bordspil som blackjack og roulette ofte kun bidrager 10-20%. Visse spil kan være helt udelukket. Tjek altid de specifikke vilkår for din bonus.",
  },
];

const Omsaetningskrav = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: omsaetningskravFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Omsætningskrav – Komplet Guide til Gennemspilningskrav 2026 | Casinoaftaler</title>
        <meta
          name="description"
          content="Alt du skal vide om omsætningskrav på danske casinoer. Hvad de betyder, hvordan de beregnes, strategier og tips til at opfylde dem effektivt."
        />
        <link rel="canonical" href="https://bonushuset-buddy.lovable.app/omsaetningskrav" />
        <meta property="og:title" content="Omsætningskrav – Komplet Guide til Gennemspilningskrav 2026" />
        <meta
          property="og:description"
          content="Alt du skal vide om omsætningskrav på danske casinoer. Beregning, strategier og tips."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bonushuset-buddy.lovable.app/omsaetningskrav" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
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
              Omsætningskrav på Danske Casinoer
            </h1>
            <p className="text-lg text-white/80">
              Omsætningskrav er den vigtigste betingelse at forstå, når du
              bruger en casinobonus. Lær hvordan de fungerer, hvordan de
              beregnes, og hvordan du navigerer dem klogt.
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

        {/* Intro - Hvad betyder omsætningskrav */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvad betyder omsætningskrav?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Omsætningskrav – også kendt som gennemspilningskrav eller
            gennemspilskrav – refererer til det antal gange, en bonus
            eller indbetaling skal spilles igennem, før gevinster kan
            udbetales. Det er den mest centrale betingelse i enhver
            casinobonus, og det er afgørende, at du forstår den fuldt ud,
            inden du accepterer et tilbud.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Udtrykket stammer fra det engelske "Wagering Requirement" og
            betyder i bund og grund, at casinoet kræver, at du satser et
            bestemt beløb, før du kan hæve penge. Det handler ikke om at
            vinde et bestemt beløb, men om at placere væddemål for et
            samlet beløb over tid. Hver gang du spinner på en
            spilleautomat, tæller din indsats med i omsætningen.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Omsætningskrav og lovgivning */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Omsætningskrav og dansk lovgivning
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Mange tror, at omsætningskrav kun gælder for casinobonusser,
            men det er ikke helt korrekt. Alle indbetalinger til danske
            casinoer har et omsætningskrav på minimum 1x. Det skyldes
            hvidvaskningslovgivningen, som forhindrer, at casinoer
            bruges til at vaske penge.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvis du indbetaler 500 kr. uden bonus, skal du spille for hele
            beløbet mindst én gang, før du kan hæve det igen. Det
            forhindrer, at nogen blot sætter penge ind og trækker dem ud
            med det samme for at give dem et legitimt udseende.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For bonusser har Spillemyndigheden i Danmark sat et maksimalt
            loft på 10x. Det sikrer, at casinoer med dansk licens tilbyder
            rimelige vilkår for deres spillere – et krav der er unikt for
            det danske marked og en stor fordel for danske spillere.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Sådan fungerer det */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan fungerer omsætningskravet i praksis
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Der findes flere varianter af omsætningskrav afhængigt af
            bonustypen. Her gennemgår vi de mest almindelige scenarier.
          </p>

          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Indbetaling uden bonus (1x)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Indbetaler du 500 kr. uden bonus, skal du blot spille for
                  hele beløbet én gang. Spinner du 100 gange á 5 kr.
                  (100 × 5 = 500 kr.), er kravet opfyldt, og du kan hæve
                  dine eventuelle gevinster.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Percent className="h-5 w-5 text-primary" />
                  Bonus med 10x kun på bonussen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Her gælder omsætningskravet kun for selve bonusbeløbet.
                  Modtager du 100 kr. i bonus, skal du satse for
                  100 × 10 = 1.000 kr. Din indbetaling skal stadig
                  omsættes 1x separat. Denne type ses typisk ved
                  no-sticky bonusser.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-primary" />
                  Bonus med 10x (d+b)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Den mest udbredte type. (d+b) står for "deposit + bonus",
                  altså indbetaling + bonus. Indbetaler du 500 kr. og får
                  500 kr. i bonus med 10x (d+b), skal du satse for i alt:
                  (500 + 500) × 10 = 10.000 kr. før gevinster kan
                  udbetales.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Strategier */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Strategier til at opfylde omsætningskravet
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Med den rette tilgang kan du øge dine chancer for at
            gennemspille bonussen uden at tømme din saldo. Her er de
            vigtigste strategier.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Vælg spil med høj RTP",
                desc: "Spilleautomater med høj tilbagebetalingsprocent (RTP) giver dig bedre chancer for at holde din saldo i live, mens du arbejder dig igennem omsætningskravet. Kig efter spil med RTP over 96%.",
                icon: BarChart3,
              },
              {
                title: "Satser mindre beløb",
                desc: "Mindre indsatser forlænger din spilletid og reducerer risikoen for at tømme saldoen for hurtigt. Du når stadig omsætningskravet – det tager bare lidt længere tid.",
                icon: TrendingUp,
              },
              {
                title: "Hold øje med din fremgang",
                desc: "De fleste danske casinoer har et værktøj, der viser, hvor langt du er fra at opfylde omsætningskravet. Brug det aktivt til at holde styr på dine fremskridt.",
                icon: Target,
              },
              {
                title: "Spil kun godkendte spil",
                desc: "Tjek altid, hvilke spil der bidrager til omsætningskravet, og undgå spil, der er udelukket eller kun tæller delvist. Spilleautomater bidrager typisk 100%.",
                icon: CheckCircle2,
              },
              {
                title: "Sæt et budget – og hold dig til det",
                desc: "Jagt aldrig dine tab. Sæt et klart budget for, hvor meget du er villig til at spille for, og stop når grænsen er nået. Ansvarligt spil er altid den bedste strategi.",
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

        {/* Vigtige overvejelser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Vigtige overvejelser ved bonusvilkår
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Omsætningskravet er kun én del af billedet. For at vurdere om en
            bonus reelt er fordelagtig, skal du også kende til følgende
            betingelser.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="h-5 w-5 text-primary" />
                  Maks. indsats (Max Bet)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  De fleste bonusser har en maksimal indsats pr. spin –
                  typisk 50 kr. Overskrides denne grænse, kan gevinster
                  annulleres, eller hele bonussen kan gå tabt. Overhold
                  altid denne begrænsning.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  Tidsfrister
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Bonusser har altid en tidsfrist – typisk 30-60 dage. Når
                  fristen udløber, annulleres bonussen og alle tilknyttede
                  gevinster automatisk. Planlæg din spilletid derefter.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Ban className="h-5 w-5 text-primary" />
                  Udelukkede spil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Visse spil kan være helt udelukket fra bonusspil. Et godt
                  casino blokerer automatisk disse spil, når du har
                  bonuspenge aktive. Live casino-spil og game shows er
                  ofte helt eller delvist udelukket.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Udelukkede betalingsmetoder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Visse betalingsmetoder kan være udelukket fra at
                  aktivere en bonus. E-wallets som Skrill og Neteller er
                  ofte undtaget. Tjek altid, om din foretrukne metode
                  kvalificerer sig.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* In-game free spins */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            In-game free spins og omsætningskrav
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En stor fordel ved danske casinoer er, at Spillemyndigheden
            kræver, at alle gevinster vundet under bonusspil – inklusive
            in-game free spins – tæller med i omsætningskravet. Det
            betyder, at hvis du vinder gratis spins i en spilleautomat
            og derefter vinder penge, bidrager disse gevinster til at
            opfylde dit omsætningskrav.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Denne regel er unik for det danske marked og skaber langt
            større gennemsigtighed. På udenlandske casinoer kan in-game
            free spins have deres egne separate omsætningskrav, hvilket
            gør det mere kompliceret og mindre spillervenligt.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Misbrug af bonusser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Misbrug af bonusser
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Danske casinoer tager misbrug af bonusser meget alvorligt. Det
            kan føre til annullering af din bonus og alle gevinster samt
            udelukkelse fra fremtidige tilbud. Typiske overtrædelser
            inkluderer at oprette flere konti, overskride maks. indsats
            under bonusspil, eller bruge udelukkede betalingsmetoder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Følg altid casinoets vilkår og betingelser nøje, og spil
            ansvarligt. Hvis du er i tvivl om noget, kontakt casinoets
            kundesupport – de er der for at hjælpe dig.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Opsummering */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Opsummering</h2>
          <div className="space-y-3">
            {[
              {
                icon: Calculator,
                title: "Forstå beregningen",
                desc: "Kend forskellen på 10x kun bonus og 10x (d+b), så du ved præcis, hvor meget du skal satse.",
              },
              {
                icon: Scale,
                title: "Dansk lovgivning beskytter dig",
                desc: "Spillemyndighedens loft på 10x sikrer rimelige vilkår. In-game gevinster tæller altid med i omsætningen.",
              },
              {
                icon: AlertTriangle,
                title: "Læs det med småt",
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

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            <HelpCircle className="mr-2 inline h-7 w-7 text-primary" />
            Ofte stillede spørgsmål
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {omsaetningskravFaqs.map((faq, index) => (
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
      </div>
    </>
  );
};

export default Omsaetningskrav;
