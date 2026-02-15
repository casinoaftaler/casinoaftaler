import React from "react";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import omsaetningskravHero from "@/assets/heroes/omsaetningskrav-hero.jpg";
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

const linkClass = "text-primary underline hover:text-primary/80";

const omsaetningskravFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvorfor har Danmark et loft på 10x omsætningskrav?",
    answer: (
      <>
        Spillemyndigheden indførte et maksimalt omsætningskrav på 10x for at beskytte danske spillere mod urimelige bonusvilkår. Før reguleringen tilbød udenlandske casinoer bonusser med 40-70x omsætningskrav, hvilket gjorde det næsten umuligt at hæve gevinster. Med 10x-loftet skal en bonus på 500 kr. kun gennemspilles for 5.000 kr. – en mængde der er realistisk at opnå uden at tabe hele bankrollet. Dette gør danske bonusser til de mest spillervenlige i Europa og er en direkte årsag til at{" "}
        <Link to="/bonus-uden-omsaetningskrav" className={linkClass}>omsætningsfrie bonusser</Link> også er mere udbredte i Danmark.
      </>
    ),
  },
  {
    question: "Hvad betyder (d+b) vs. kun (b) i omsætningskrav?",
    answer: (
      <>
        Forkortelsen (d+b) står for 'deposit + bonus' og betyder at omsætningskravet gælder for både dit indbetalte beløb og bonusbeløbet tilsammen. Indbetaler du 500 kr. og modtager 500 kr. i bonus med 10x (d+b), skal du omsætte for 10.000 kr. Med kun (b) gælder kravet kun bonusdelen: 500 kr. x 10 = 5.000 kr. Forskellen er markant – (d+b) kræver dobbelt så meget omsætning. De fleste danske <Link to="/indskudsbonus" className={linkClass}>indskudsbonusser</Link> bruger (d+b)-modellen, så tjek altid vilkårene nøje.
      </>
    ),
  },
  {
    question: "Hvilke spil tæller 100% mod omsætningskravet?",
    answer: (
      <>
        <Link to="/casinospil" className={linkClass}>Spilleautomater</Link> bidrager næsten altid 100% til omsætningskravet. Bordspil som blackjack og roulette bidrager typisk kun 10-20%, og <Link to="/live-casino" className={linkClass}>live casino</Link>-spil kan være helt ekskluderet. Nogle casinoer ekskluderer også højvolatilitetsslots og progressiv jackpot-spil. Strategisk bør du vælge slots med høj RTP (96%+) og lav-medium volatilitet til omsætning – Blood Suckers (98% RTP) og Starburst (96,09% RTP) er populære valg der slider bankrollet langsomt.
      </>
    ),
  },
  {
    question: "Hvad er den bedste strategi til at gennemspille et omsætningskrav?",
    answer: (
      <>
        Den matematisk optimale strategi er at vælge spil med højest mulig RTP der bidrager 100% til omsætningen. Blood Suckers (98,00% RTP), Mega Joker (99,00% i supermeter-mode) og Starmania (97,86%) er blandt de bedste valg. Undgå højvolatilitetsspil som <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link>-titler – deres lave hitfrekvens (under 15%) gør dem uegnede til omsætning. Sæt en konsistent indsats (1-2% af bankroll per spin) og undgå at jage tab. Med en 96% RTP-slot og 10x omsætning vil du statistisk beholde ca. 60% af bonus+indbetaling.
      </>
    ),
  },
  {
    question: "Hvad sker der hvis bonustiden udløber, mens jeg omsætter?",
    answer: "Hvis du ikke opfylder omsætningskravene inden for tidsfristen – typisk 7-30 dage – mister du bonusbeløbet og alle gevinster optjent med bonusmidlerne. Din egen indbetaling er normalt stadig tilgængelig. Tidsfristen starter fra det øjeblik bonussen aktiveres, ikke fra din sidste aktivitet. Planlæg derfor din spilletid: med 10x omsætning på en 1.000 kr. bonus (d+b = 20.000 kr. omsætning) og et gennemsnit på 5 kr. per spin skal du spille ca. 4.000 spins. Ved 600 spins/time tager det ca. 7 timer.",
  },
  {
    question: "Har alle indbetalinger et omsætningskrav – også uden bonus?",
    answer: (
      <>
        Ja, alle indbetalinger til danske casinoer har et lovpligtigt 1x omsætningskrav uanset om du modtager en bonus. Det betyder at du skal spille for hele dit indbetalte beløb mindst én gang, før du kan hæve det. Kravet eksisterer pga. hvidvasklovgivningen – det forhindrer at casinoer bruges til at 'vaske' penge ved blot at indbetale og straks hæve igen. Med <Link to="/no-sticky-bonus" className={linkClass}>no-sticky bonusser</Link> holder casinoet din indbetaling og bonus adskilt, så 1x-kravet gælder kun for indbetalingen.
      </>
    ),
  },
  {
    question: "Kan jeg annullere en bonus for at undgå omsætningskrav?",
    answer: "Ja, de fleste danske casinoer tillader dig at annullere en bonus – men konsekvenserne varierer. Hos nogle casinoer mister du kun bonusbeløbet og beholder dine egne penge og gevinster. Hos andre mister du også gevinster optjent med bonusmidlerne. Med en no-sticky bonus kan du altid hæve gevinster vundet med egne penge, da disse holdes adskilt. Tip: Overvej om du overhovedet vil aktivere bonussen. Nogle spillere foretrækker at spille uden bonus for at undgå omsætningskrav helt.",
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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Omsætningskrav – Komplet Guide til Gennemspilningskrav 2026",
    description: "Alt du skal vide om omsætningskrav på danske casinoer. Beregning, strategier og tips.",
    author: { "@type": "Organization", name: "Casinoaftaler" },
    publisher: { "@type": "Organization", name: "Casinoaftaler" },
    datePublished: "2025-06-01",
    dateModified: "2026-02-11",
    mainEntityOfPage: "https://casinoaftaler.dk/omsaetningskrav",
  };

  return (
    <>
      <SEO
        title="Omsætningskrav – Komplet Guide til Gennemspilningskrav 2026 | Casinoaftaler"
        description="Alt du skal vide om omsætningskrav på danske casinoer. Hvad de betyder, hvordan de beregnes, strategier og tips til at opfylde dem effektivt."
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
        <AuthorMetaBar author="jonas" date="11-02-2026" readTime="12 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={omsaetningskravHero} alt="Omsætningskrav – lommeregner og casino chips" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
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
            casinobonus – uanset om det er en{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">
              velkomstbonus
            </Link>
            , en{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">
              indskudsbonus
            </Link>{" "}
            eller{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">
              free spins
            </Link>
            . Det er afgørende, at du forstår omsætningskrav fuldt ud,
            inden du accepterer et tilbud.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Udtrykket stammer fra det engelske "Wagering Requirement" og
            betyder i bund og grund, at casinoet kræver, at du satser et
            bestemt beløb, før du kan hæve penge. Ønsker du at undgå dette
            helt, kan du kigge efter{" "}
            <Link to="/bonus-uden-omsaetningskrav" className="text-primary underline hover:text-primary/80">
              bonusser uden omsætningskrav
            </Link>{" "}
            eller en{" "}
            <Link to="/no-sticky-bonus" className="text-primary underline hover:text-primary/80">
              no-sticky bonus
            </Link>
            , der adskiller dine egne penge fra bonuspengene.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Omsætningskrav er et centralt emne i vores{" "}
            <Link to="/casino-bonus" className="text-primary underline hover:text-primary/80">
              casino bonus oversigt
            </Link>
            , hvor vi gennemgår alle bonustyper og deres vilkår. Du kan også prøve at gennemspille bonusrunder risikofrit i vores{" "}
            <Link to="/community/slots" className="text-primary underline hover:text-primary/80">
              gratis spillehal
            </Link>.
          </p>
        </section>

        <InlineCasinoCards title="Casinoer med lave omsætningskrav" count={4} />

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
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For bonusser har Spillemyndigheden i Danmark sat et maksimalt
            loft på 10x. Det sikrer, at casinoer med dansk licens tilbyder
            rimelige vilkår for deres spillere – et krav der er unikt for
            det danske marked og en stor fordel for danske spillere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vil du forstå, hvordan omsætningskrav fungerer i praksis? I vores{" "}
            <Link to="/community/slots" className="text-primary underline hover:text-primary/80">
              gratis spillehal
            </Link>{" "}
            kan du prøve spilleautomater med bonusrunder og se, hvordan spins
            akkumulerer – helt uden at risikere rigtige penge.
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
                  omsættes 1x separat. Denne type ses typisk ved{" "}
                  <Link to="/no-sticky-bonus" className="text-primary underline hover:text-primary/80">
                    no-sticky bonusser
                  </Link>
                  .
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
            in-game{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">
              free spins
            </Link>{" "}
            – tæller med i omsætningskravet. Det
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

        {/* Omsætningskrav markedsoverblik */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Omsætningskrav i Danmark 2026 – Det unikke danske marked
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Danmark har nogle af verdens mest spillervenlige omsætningskrav takket være Spillemyndighedens regulering. Med et loft på maksimalt 10x omsætningskrav (d+b) sikrer den danske lovgivning, at casinobonusser altid har rimelige vilkår. Til sammenligning kan omsætningskrav på udenlandske markeder nå op til 40x, 50x eller endda 70x – beløb der er næsten umulige at gennemspille uden at tabe alt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I 2026 ser vi en trend mod endnu lavere omsætningskrav hos danske casinoer. Flere casinoer tilbyder nu omsætningskrav på blot 1x-5x, og nogle har endda lanceret <Link to="/bonus-uden-omsaetningskrav" className="text-primary underline hover:text-primary/80">bonusser helt uden omsætningskrav</Link>. Denne udvikling drives af konkurrencen om danske spillere og er et klart tegn på, at markedet bevæger sig i en mere spillervenlig retning.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Et vigtigt aspekt ved danske omsætningskrav er, at in-game free spins og bonusfunktioner altid tæller med i omsætningen. Det betyder, at hvis du udløser gratis spins i en spilleautomat under bonusspil, bidrager gevinsterne fra disse spins til at opfylde omsætningskravet. Denne regel er unik for det danske marked og gør det markant nemmere at gennemføre omsætningskravet sammenlignet med udenlandske casinoer.
          </p>
           <p className="text-muted-foreground leading-relaxed">
            For at maksimere dine chancer for at opfylde omsætningskravet anbefaler vi at vælge en <Link to="/no-sticky-bonus" className="text-primary underline hover:text-primary/80">no-sticky bonus</Link>, hvor omsætningskravet kun gælder for bonusmidlerne. Kombineret med spil der har høj RTP (96%+) og lave indsatser kan du systematisk arbejde dig igennem omsætningskravet. Husk at spilleautomater typisk bidrager 100% til omsætningen, mens bordspil kun tæller 10-20%. Læs hvordan vores bonus spins fungerer i praksis i{" "}
            <Link to="/community/rewards" className="text-primary underline hover:text-primary/80">Rewards Programmet</Link>.
          </p>
        </section>

        <Separator className="my-10" />
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

        <AuthorBio />

        <Separator className="my-10" />

        <RelatedGuides currentPath="/omsaetningskrav" />

        <FAQSection title="Ofte stillede spørgsmål om omsætningskrav" faqs={omsaetningskravFaqs} />
      </div>
    </>
  );
};

export default Omsaetningskrav;
