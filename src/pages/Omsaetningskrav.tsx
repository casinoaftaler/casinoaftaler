import React from "react";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, buildVideoSchema, SITE_URL } from "@/lib/seo";
import omsaetningskravHero from "@/assets/heroes/omsaetningskrav-hero.jpg";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
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
import { YoutubeEmbed } from "@/components/YoutubeEmbed";

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

  const faqJsonLd = buildFaqSchema(omsaetningskravFaqs);

  const articleJsonLd = buildArticleSchema({
    headline: "Omsætningskrav – Komplet Guide til Gennemspilningskrav 2026",
    description: "Alt du skal vide om omsætningskrav på danske casinoer. Beregning, strategier og tips.",
    url: `${SITE_URL}/omsaetningskrav`,
    datePublished: "2025-06-01",
    dateModified: "2026-02-26",
    authorName: "Ajse",
    authorUrl: `${SITE_URL}/forfatter/ajse`,
    videoId: "3tXFTjmgdcE",
  });

  const videoJsonLd = buildVideoSchema(`${SITE_URL}/omsaetningskrav`, "3tXFTjmgdcE", {
    title: "Omsætningskrav på danske casinoer – Hvad er det?",
    description: "Jonas forklarer omsætningskrav, hvordan de beregnes, og hvad Danmarks lovpligtige 10x-loft betyder for dig som spiller.",
    uploadDate: "2026-02-20",
    duration: "PT1M30S",
  });

  return (
    <>
      <SEO
        title="Omsætningskrav – Komplet Guide til Gennemspilningskrav 2026 | Casinoaftaler"
        description="Alt du skal vide om omsætningskrav på danske casinoer. Hvad de betyder, hvordan de beregnes, strategier og tips til at opfylde dem effektivt."
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
        <AuthorMetaBar author="ajse" date="26-02-2026" readTime="20 Min." />
        <p className="text-sm text-muted-foreground mt-2 mb-6">Juridisk gennemgået og opdateret af Ajse, juridisk redaktør hos Casinoaftaler.dk.</p>

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={omsaetningskravHero} alt="Omsætningskrav – lommeregner og casino chips" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
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
            Udtrykket stammer fra det engelske "<Link to="/ordbog/wagering" className={linkClass}>Wagering Requirement</Link>" og
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
          <p className="mb-8 text-muted-foreground leading-relaxed">
            Omsætningskrav er et centralt emne i vores{" "}
            <Link to="/casino-bonus" className="text-primary underline hover:text-primary/80">
              casino bonus oversigt
            </Link>
            , hvor vi gennemgår alle bonustyper og deres vilkår. Du kan også prøve at gennemspille bonusrunder risikofrit i vores{" "}
            <Link to="/community/slots" className="text-primary underline hover:text-primary/80">
              gratis spillehal
            </Link>.
          </p>

          <YoutubeEmbed
            videoId="3tXFTjmgdcE"
            title="Hvad er omsætningskrav på danske casinoer?"
            description="Vi forklarer hvad omsætningskrav (wagering requirements) er på danske casinoer, hvordan de beregnes, og hvilke strategier du kan bruge til at opfylde dem effektivt. Inkl. gennemgang af Danmarks lovkrav om max 10x."
            duration="PT1M18S"
            viewCount={3}
            uploadDate="2026-02-20"
            articleUrl="https://casinoaftaler.dk/omsaetningskrav"
          />

          <div className="rounded-lg border border-border bg-muted/30 p-5">
            <h3 className="mb-2 text-lg font-semibold">
              Her gennemgår vores streamer og forfatter Jonas, hvad omsætningskrav er
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              <Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> forklarer omsætningskrav fra bunden – hvad de betyder, hvordan du beregner dem, og hvilke strategier der hjælper dig til at opfylde dem effektivt. Videoen er del af vores samlede guide til{" "}
              <Link to="/casino-bonus" className={linkClass}>casino bonusser</Link>,{" "}
              <Link to="/no-sticky-bonus" className={linkClass}>no-sticky bonusser</Link> og{" "}
              <Link to="/bonus-uden-omsaetningskrav" className={linkClass}>bonusser uden omsætningskrav</Link>.
            </p>
          </div>
        </section>

        <InlineCasinoCards title="Casinoer med lave omsætningskrav" count={6} />

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
            For bonusser har Spillemyndigheden sat et maksimalt
            loft på 10x – fastlagt i{" "}
            <a href="https://www.retsinformation.dk/eli/lta/2020/1303" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">bekendtgørelse nr. 1303 om bonusser</a>. Det sikrer, at casinoer med dansk licens tilbyder
            rimelige vilkår – et krav der er unikt for
            det danske marked og en markant fordel sammenlignet med udenlandske operatører.
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

        {/* Teknisk dybde: (d+b) vs (b) */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Teknisk analyse: (d+b) vs. (b) – de to omsætningsmodeller
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Omsætningskrav beregnes efter to fundamentalt forskellige modeller: <strong>(d+b)</strong> – deposit + bonus – og <strong>(b)</strong> – kun bonus. Forskellen har enorm indvirkning på den totale omsætning, du skal gennemføre. Begge modeller er lovlige i Danmark under Spillemyndighedens 10x loft, men den reelle byrde er vidt forskellig.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg border border-border text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-3 text-left font-semibold">Parameter</th>
                  <th className="border border-border p-3 text-left font-semibold">10x (b) – kun bonus</th>
                  <th className="border border-border p-3 text-left font-semibold">10x (d+b) – deposit + bonus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3 font-medium">Indbetaling</td>
                  <td className="border border-border p-3 text-muted-foreground">1.000 kr.</td>
                  <td className="border border-border p-3 text-muted-foreground">1.000 kr.</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-3 font-medium">Bonus (100% match)</td>
                  <td className="border border-border p-3 text-muted-foreground">1.000 kr.</td>
                  <td className="border border-border p-3 text-muted-foreground">1.000 kr.</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-medium">Total omsætning krævet</td>
                  <td className="border border-border p-3 text-muted-foreground">10 × 1.000 = <strong>10.000 kr.</strong></td>
                  <td className="border border-border p-3 text-muted-foreground">10 × 2.000 = <strong>20.000 kr.</strong></td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-3 font-medium">Forventet tab (96% RTP)</td>
                  <td className="border border-border p-3 text-muted-foreground">10.000 × 0,04 = <strong>400 kr.</strong></td>
                  <td className="border border-border p-3 text-muted-foreground">20.000 × 0,04 = <strong>800 kr.</strong></td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-medium">Reel bonusværdi (EV)</td>
                  <td className="border border-border p-3 text-muted-foreground"><strong>600 kr.</strong></td>
                  <td className="border border-border p-3 text-muted-foreground"><strong>200 kr.</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            <strong>Konklusion:</strong> 10x (b) giver 3x højere reel bonusværdi end 10x (d+b) – præcis fordi din indbetaling ikke indgår i beregningsgrundlaget. Når du sammenligner bonusser, skal du ALTID tjekke om kravet er (b) eller (d+b). En "5x (d+b)"-bonus svarer reelt til "10x (b)" i total omsætning – de er matematisk ækvivalente.
          </p>
        </section>

        <Separator className="my-10" />

        {/* EV-formel */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan beregner du bonussens reelle værdi (EV)
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For enhver bonus kan du beregne Expected Value med denne formel: <strong>EV = Bonusbeløb – (Total omsætning × House Edge)</strong>. Her er house edge = 1 – RTP. For en 96% RTP slot er house edge 4% (0,04).
          </p>
          <div className="space-y-3">
            {[
              { title: "1x omsætning, 1.000 kr. bonus", desc: "Omsætning: 1.000 kr. Tab: 1.000 × 0,04 = 40 kr. EV = 1.000 – 40 = 960 kr. (96% af nominel værdi). Næsten hele bonussen er reel – dette er det bedste scenarie.", icon: CheckCircle2 },
              { title: "5x (b) omsætning, 1.000 kr. bonus", desc: "Omsætning: 5.000 kr. Tab: 5.000 × 0,04 = 200 kr. EV = 1.000 – 200 = 800 kr. (80% af nominel værdi). Stadig en god bonus med høj reel værdi.", icon: CheckCircle2 },
              { title: "10x (d+b) omsætning, 1.000 kr. bonus + 1.000 kr. indbetaling", desc: "Omsætning: 20.000 kr. Tab: 20.000 × 0,04 = 800 kr. EV = 1.000 – 800 = 200 kr. (20% af nominel værdi). Kun en femtedel af bonussen er reel. Overraskende lavt.", icon: AlertTriangle },
              { title: "Breakeven-punkt", desc: "Bonussen har positiv EV så længe: Bonusbeløb > Total omsætning × House Edge. For 10x (d+b) med 2.000 kr. saldo kræves en RTP over 95% for positiv EV. Under 95% RTP er bonussen statistisk værdiløs.", icon: Target },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
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

        {/* Omsætningskrav markedsoverblik */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Omsætningskrav i Danmark 2026 – Det unikke danske marked
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Danmark har nogle af verdens mest spillervenlige omsætningskrav takket være Spillemyndighedens regulering. Med et loft på maksimalt 10x omsætningskrav (d+b) sikrer den danske lovgivning, at casinobonusser altid har rimelige vilkår. Til sammenligning kan omsætningskrav på udenlandske markeder nå op til 40x, 50x eller endda 70x – beløb der er næsten umulige at gennemspille uden at tabe alt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I 2026 benytter de fleste danske casinoer det lovpligtige loft på 10x omsætningskrav. Udvalgte casinoer som GetLucky og ComeOn tilbyder dog kun 5x, og nogle har endda lanceret <Link to="/bonus-uden-omsaetningskrav" className="text-primary underline hover:text-primary/80">bonusser helt uden omsætningskrav</Link>. Denne udvikling drives af konkurrencen om danske spillere og er et klart tegn på, at markedet bevæger sig i en mere spillervenlig retning.
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

        {/* International sammenligning */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            International sammenligning: Danske omsætningskrav vs. Europa og verden
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at sætte de danske regler i perspektiv er det nødvendigt at sammenligne med andre regulerede markeder. Danmark er unikt med sit lovfastlagte 10x-loft – men hvordan ser det ud i resten af verden? Forskellen er dramatisk og understreger den danske models overlegenhed for spilleren.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg border border-border text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-3 text-left font-semibold">Marked</th>
                  <th className="border border-border p-3 text-left font-semibold">Typisk omsætning</th>
                  <th className="border border-border p-3 text-left font-semibold">Lovmæssigt loft</th>
                  <th className="border border-border p-3 text-left font-semibold">EV på 1.000 kr. bonus (96% RTP)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3 font-medium">🇩🇰 Danmark</td>
                  <td className="border border-border p-3 text-muted-foreground">5-10x (d+b)</td>
                  <td className="border border-border p-3 text-muted-foreground">Max 10x</td>
                  <td className="border border-border p-3 text-muted-foreground"><strong>200-600 kr.</strong></td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-3 font-medium">🇬🇧 Storbritannien</td>
                  <td className="border border-border p-3 text-muted-foreground">20-40x</td>
                  <td className="border border-border p-3 text-muted-foreground">Intet loft</td>
                  <td className="border border-border p-3 text-muted-foreground">-200 til 200 kr.</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-medium">🇲🇹 Malta (MGA)</td>
                  <td className="border border-border p-3 text-muted-foreground">30-50x</td>
                  <td className="border border-border p-3 text-muted-foreground">Intet loft</td>
                  <td className="border border-border p-3 text-muted-foreground">-600 til -200 kr.</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-3 font-medium">🇨🇼 Curaçao</td>
                  <td className="border border-border p-3 text-muted-foreground">40-70x</td>
                  <td className="border border-border p-3 text-muted-foreground">Intet loft</td>
                  <td className="border border-border p-3 text-muted-foreground">-1.200 til -600 kr.</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-medium">🇸🇪 Sverige</td>
                  <td className="border border-border p-3 text-muted-foreground">N/A (forbudt)</td>
                  <td className="border border-border p-3 text-muted-foreground">Bonusser forbudt</td>
                  <td className="border border-border p-3 text-muted-foreground">N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Tabellen afslører en klar sandhed: danske omsætningskrav er blandt verdens mest spillervenlige. Mens en bonus på et Curaçao-licenseret casino statistisk er designet til at du taber hele din saldo, giver en dansk bonus med 5-10x omsætning reel positiv EV. Sverige har valgt den modsatte vej og forbudt bonusser helt – en kontroversiel beslutning der har sendt mange svenske spillere til <Link to="/casino-licenser" className={linkClass}>udenlandske casinoer</Link> uden dansk regulering.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Vigtigt perspektiv:</strong> Selv med 10x (d+b) omsætning – det strengeste danske niveau – er din EV stadig positiv med RTP over 95%. På et internationalt 40x-casino skal RTP være over 98,75% for positiv EV – kun en håndfuld spil i verden leverer dette. Det danske system er designet til at bonusser faktisk gavner spilleren.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Spillerprofiler og omsætningskrav */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Spillerprofiler: Hvem rammes hårdest af omsætningskrav?
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Omsætningskrav påvirker ikke alle spillere ens. Din foretrukne spiltype, indsatsniveau og tilgængelige tid afgør, hvor tyngende omsætningskrav er for dig. Her er en detaljeret analyse af fem spillertyper og deres optimale bonusstrategi.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "✅ Slot-spilleren (5-25 kr./spin)", desc: "Mest kompatibel med omsætningskrav. Slots bidrager 100% og med 96-98% RTP taber du kun 2-4% per omsættet krone. Med 10x omsætning på 1.000 kr. (10.000 kr. total) og 5 kr./spin tager det ~33 min. ved 10 sek./spin. Anbefalet strategi: Blood Suckers (98% RTP), Starburst (96,1%), 1429 Uncharted Seas (98,6%).", icon: Sparkles },
              { title: "⚠️ Casual spilleren (mixede spil)", desc: "Moderat kompatibel. Casual spillere skifter mellem slots, bordspil og live casino – men kun slots tæller 100%. En mixed strategi forlænger gennemspilningstiden dramatisk. Anbefaling: Afslut omsætningen med slots først, spil derefter bordspil/live med egne penge.", icon: Gamepad2 },
              { title: "❌ Bordspil-entusiasten", desc: "Dårlig kompatibilitet. Med 10% bidrag fra blackjack kræver en 10x bonus reelt 100x i bordspilsindsatser. 1.000 kr. bonus × 10 ÷ 0,10 = 100.000 kr. i blackjack-omsætning. Selv med 99,5% RTP er det en massiv indsats. Anbefaling: Undgå bonusser eller vælg bonus uden omsætningskrav.", icon: Ban },
              { title: "❌ Live casino-spilleren", desc: "Værste kompatibilitet. Live casino bidrager typisk 0-10% til omsætningen og er ofte helt udelukket. En bonus er reelt ubrugelig for den rene live-spiller. Anbefaling: Afslå bonussen og spil med egne penge. En cashback-bonus er det eneste relevante alternativ.", icon: AlertTriangle },
              { title: "✅ Bonusjægeren", desc: "Optimal kompatibilitet – men kræver disciplin. Bonusjægere vælger systematisk slots med 97%+ RTP, holder indsatsen på 1-2% af saldo, og beregner EV på forhånd. Med rigtig spilvalg og tålmodighed er 10x omsætning profitable i ca. 65% af tilfældene.", icon: Target },
              { title: "⚠️ High rolleren (50+ kr./spin)", desc: "Betinget kompatibilitet. Høje indsatser gennemfører omsætningen hurtigt, men maks-indsatsreglen (typisk 50 kr.) kan begrænse high rollere under bonusspil. Derudover giver højere indsatser større varians – risikoen for bust stiger. Anbefaling: VIP-bonusser med højere maks-indsatsgrænse.", icon: TrendingUp },
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

        {/* Fremtidens omsætningskrav */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Regulatoriske trends 2026-2027: Fremtidens omsætningskrav
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det danske bonusmarked er i konstant udvikling, drevet af regulatoriske ændringer, konkurrence og spillernes forventninger. Her er de vigtigste trends vi observerer og forventer i 2026-2027:
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Race mod bunden: Lavere omsætningskrav som konkurrencevåben</h3>
                <p className="text-sm text-muted-foreground">
                  I 2024 havde de fleste danske casinoer 10x omsætning (lovens maksimum). I 2026 tilbyder ca. 35% af casinoerne 5x eller lavere, og ca. 15% tilbyder <Link to="/bonus-uden-omsaetningskrav" className={linkClass}>helt omsætningsfrie bonusser</Link>. Denne trend accelererer: spillere bliver stadig mere bevidste om omsætningskravets effekt på EV og vælger aktivt casinoer med lavere krav. Vi forventer at 50%+ af danske casinoer tilbyder under 5x omsætning inden udgangen af 2027.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Scale className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Spillemyndighedens kommende revurdering</h3>
                <p className="text-sm text-muted-foreground">
                  Spillemyndigheden reviderer regelmæssigt bonusreguleringen. Der er indikationer på at det nuværende 10x-loft kan blive sænket yderligere – muligvis til 5x eller endda 3x – som led i en bredere spillerbeskyttelsesstrategi. En lavere grænse ville gøre alle danske bonusser endnu mere værdifulde, men det kan også betyde at casinoerne reducerer bonusbeløbene som kompensation.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <RefreshCw className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Transparenskrav og real-time tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Flere danske casinoer implementerer nu realtids-omsætningstracking direkte i brugergrænsefladen – du kan se præcis hvor langt du er fra at opfylde kravet, beregnet i kroner og procent. Denne transparens er endnu ikke lovpligtig, men brancheorganisationer arbejder på frivillige standarder der kan blive regulatoriske krav i 2027.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Hybrid-modellen vinder frem</h3>
                <p className="text-sm text-muted-foreground">
                  Den nyeste trend er "hybrid-bonusser" der kombinerer elementer med og uden omsætning. Eksempel: 100% matchbonus med 10x omsætning + 50 omsætningsfrie <Link to="/free-spins" className={linkClass}>free spins</Link>. Spilleren får både volumen (matchbonus) og umiddelbar værdi (omsætningsfrie spins). Denne model tilbyder det bedste fra begge verdener og vinder hurtigt popularitet hos <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Psykologien bag omsætningskrav */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Psykologien bag omsætningskrav: Hvorfor de fungerer
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Omsætningskrav er ikke blot en matematisk mekanisme – de er også et psykologisk værktøj. At forstå den psykologiske dimension hjælper dig med at træffe bedre beslutninger og undgå typiske fælder.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Sunk cost-fælden:</strong> Når du har gennemspillet 70% af omsætningskravet, føles det "spildt" at stoppe – selv om din saldo er nede på 50 kr. og de resterende 30% statistisk vil koste dig mere end du vinder. Denne "sunk cost"-effekt er den primære årsag til at spillere gennemfører omsætningen med negative EV i stedet for at stoppe. Modgiften er at evaluere din situation baseret på din nuværende saldo, ikke på hvor meget du allerede har omsættet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Illusionen om kontrol:</strong> Mange spillere tror at de kan "overvinde" omsætningskravet med den rette strategi. Sandheden er at matematikken er uændret: med 96% RTP taber du statistisk 4% af hver omsættet krone, uanset strategi. Den bedste strategi handler ikke om at slå huset, men om at minimere det forventede tab – og det gøres via høj-RTP spilvalg og lav indsats, som vi har beskrevet i denne guide.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Tidsforvrængning:</strong> Under bonusomsætning mister mange spillere fornemmelsen for tid. Casinoerne understøtter dette med fraværet af ure og dynamisk spildesign. Sæt altid en fysisk timer, og tag 10 minutters pause for hver times spil. Det hjælper dig med at bibeholde rationel beslutningstagning under omsætningsprocessen.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Unik konklusion */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Omsætningskrav i ét ord: Gennemsigtighed</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Omsætningskrav er ikke din fjende – mangel på forståelse er. Når du kender mekanikken bag (d+b) vs. (b), forstår RTP'ens indvirkning på din EV, og kan beregne den reelle værdi af enhver bonus, har du en unik fordel som spiller. Du træffer informerede beslutninger baseret på matematik – ikke markedsføring.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det danske system med sit 10x-loft er designet til at beskytte dig, og det virker. En dansk bonus er statistisk 3-5 gange mere værd end en identisk bonus på et ureguleret casino. Men selv med favorable vilkår bør du altid spørge dig selv: <em>"Ville jeg spille for dette beløb uden bonussen?"</em> Hvis svaret er nej, er bonussen sandsynligvis ikke det rette valg for dig.
          </p>
          <div className="space-y-3">
            {[
              {
                icon: Calculator,
                title: "Beregn altid EV før accept",
                desc: "Brug formlen: EV = Bonusbeløb – (Total omsætning × House Edge). Hvis EV er negativ, afslå bonussen – uanset hvor flot markedsføringen er.",
              },
              {
                icon: Scale,
                title: "Danmarks 10x loft er din beskyttelse",
                desc: "Spillemyndighedens regulering sikrer at alle danske bonusser har reel positiv værdi ved RTP over 95%. Spil kun på licenserede danske casinoer.",
              },
              {
                icon: Target,
                title: "Vælg (b) over (d+b) når muligt",
                desc: "10x kun på bonus (b) kræver halvt så meget omsætning som 10x (d+b). Forskellen i EV er 400+ kr. på en standard 1.000 kr. bonus.",
              },
              {
                icon: ShieldCheck,
                title: "Spil ansvarligt – altid",
                desc: "Omsætningskrav kan friste til længere sessioner end planlagt. Sæt tids- og pengebudgetter. Brug ROFUS og StopSpillet.dk ved behov. 18+.",
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

        <RelatedGuides currentPath="/omsaetningskrav" />

        <FAQSection title="Ofte stillede spørgsmål om omsætningskrav" faqs={omsaetningskravFaqs} />

        <AuthorBio author="ajse" />
      </div>
      <StickyCtaBySlug slug="campobet" />
    </>
  );
};

export default Omsaetningskrav;
