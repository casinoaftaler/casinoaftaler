import React from "react";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, buildVideoSchema, SITE_URL } from "@/lib/seo";
import { RelatedGuides } from "@/components/RelatedGuides";
import { BonusMoneyLinks } from "@/components/BonusMoneyLinks";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { LiveCommunityDataStrip } from "@/components/LiveCommunityDataStrip";
import freeSpinsHero from "@/assets/heroes/free-spins-hero.jpg";
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
import { YoutubeEmbed } from "@/components/YoutubeEmbed";
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
  Calculator,
  Ban,
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const freeSpinsFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvor mange free spins kan man typisk få hos danske casinoer?",
    answer: (
      <>
        Antallet varierer markant: no deposit tilbud giver typisk 10-50 free spins, mens <Link to="/velkomstbonus" className={linkClass}>velkomstpakker</Link> kan inkludere 50-200 free spins fordelt over flere indbetalinger. Spinværdien er ligeså vigtig som antallet – 50 spins á 2 kr. (100 kr. total) er mere værd end 100 spins á 0,50 kr. (50 kr. total). De bedste danske tilbud kombinerer et højt antal spins med en spinværdi på mindst 1 kr. og lave eller ingen omsætningskrav. Udbydere som Starburst og Book of Dead er de hyppigst brugte spil i free spins-kampagner.
      </>
    ),
  },
  {
    question: "Hvorfor er free spins næsten altid begrænset til bestemte spil?",
    answer: "Casinoer vælger specifikke spil til free spins af to grunde: 1) Spil med lav-medium volatilitet som Starburst giver spillere en positiv oplevelse med hyppige små gevinster, og 2) Casinoet har forhandlet særlige aftaler med spiludviklerne. Populære free spins-spil inkluderer Starburst (96,09% RTP, lav volatilitet), Book of Dead (96,21% RTP, høj volatilitet) og Gonzo's Quest (95,97% RTP, medium volatilitet). Spilvalget påvirker direkte din gevinstchance – højvolatilitetsspil giver større men sjældnere gevinster.",
  },
  {
    question: "Hvad er forskellen på wager-free og standard free spins?",
    answer: (
      <>
        Standard free spins krediterer gevinster som bonuspenge der skal gennemspilles (typisk 10x i Danmark). Wager-free (omsætningsfrie) free spins lader dig hæve gevinsterne direkte uden gennemspilning. Forskellen er enorm: med standard spins og 10x omsætning på en gevinst på 200 kr. skal du satse 2.000 kr. før udbetaling. Med wager-free spins kan du hæve straks. Dog har wager-free spins næsten altid et gevinstloft (typisk 500-2.000 kr.). Læs mere om <Link to="/bonus-uden-omsaetningskrav" className={linkClass}>bonusser uden omsætningskrav</Link>.
      </>
    ),
  },
  {
    question: "Kan jeg vælge hvilken spilleautomat mine free spins bruges på?",
    answer: "I langt de fleste tilfælde nej – casinoet bestemmer spillet. Dog tilbyder nogle casinoer 'valgfrie free spins' hvor du kan vælge mellem 3-5 forudbestemte spil. Vælg altid spillet med højest RTP, medmindre du bevidst søger høj volatilitet med en no-sticky bonus. Hvis du modtager free spins på et ukendt spil, tjek dets RTP og volatilitet i spillets hjælpemenu før du begynder – det tager 30 sekunder og kan spare dig for skuffelse.",
  },
  {
    question: "Udløber free spins – og hvad sker der med ubrugte spins?",
    answer: "Ja, free spins har altid en udløbsdato – typisk 24 timer til 7 dage efter aktivering. Ubrugte spins forsvinder permanent efter fristen og kan ikke genskabes. Gevinster fra brugte spins forbliver på din konto som bonussaldo (medmindre de er wager-free), men omsætningskravene skal stadig opfyldes inden for bonussens overordnede tidsfrist. Tip: Aktivér free spins når du har tid til at bruge dem alle. Med 100 free spins á 10 sekunder per spin tager det ca. 17 minutter.",
  },
  {
    question: "Er no deposit free spins virkelig gratis – hvad er faldgruben?",
    answer: (
      <>
        No deposit free spins er gratis i den forstand at du ikke risikerer egne penge. Faldgruberne er: 1) Gevinster er underlagt <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> (typisk 10x), 2) Der er altid et gevinstloft (ofte 500-1.000 kr.), 3) Spins har lav værdi (0,50-1 kr.), og 4) Du skal typisk foretage en minimumsindbetaling for at hæve gevinster. Reelt er no deposit free spins en risikofri prøvetur der lader dig teste casinoet – ikke en måde at vinde store beløb på. Vurder det som en gratis demo med reel gevinstmulighed.
      </>
    ),
  },
  {
    question: "Hvornår på året tilbyder casinoer flest free spins?",
    answer: "Danske casinoer kører de mest generøse free spins-kampagner i december (jul), januar (nytår), påsken og Black Friday-perioden. Sommer (juni-august) er typisk lavere aktivitet. Nye casino-lanceringer genererer også aggressive tilbud – operatører investerer tungt i markedsføring de første 3-6 måneder. Hold øje med weekendkampagner: mange casinoer tilbyder reload free spins fredag-søndag for at øge aktiviteten. Tilmeld dig casinoernes nyhedsbreve for at modtage eksklusive free spins-tilbud der ikke annonceres offentligt.",
  },
];

const freeSpinsTypes = [
  {
    id: "no-deposit",
    name: "No Deposit Free Spins",
    icon: Gift,
    description:
      "Modtag gratis spins uden at indbetale en eneste krone. Disse tilbydes typisk til nye spillere ved registrering og giver dig mulighed for at prøve casinoet helt risikofrit. Gevinster er som regel underlagt omsætningskrav og gevinstlofter.",
  },
  {
    id: "deposit",
    name: "Indbetalingsbonus med Free Spins",
    icon: TrendingUp,
    description:
      "Ved at foretage en indbetaling modtager du et antal free spins som en del af velkomstpakken eller en reload-bonus. Antallet af spins afhænger ofte af indbetalingens størrelse, og de er typisk knyttet til specifikke spilleautomater.",
  },
  {
    id: "wager-free",
    name: "Omsætningsfrie Free Spins",
    icon: Zap,
    description:
      "Den mest spillervenlige variant. Her kan du hæve dine gevinster med det samme uden at gennemspille dem. Dog følger der ofte et gevinstloft og begrænsninger på, hvilke spil de gælder for.",
  },
  {
    id: "vip",
    name: "VIP Free Spins",
    icon: Trophy,
    description:
      "Eksklusive spins til casinoets mest loyale spillere. Disse kommer ofte med bedre vilkår – lavere omsætningskrav, højere spinværdi og adgang til premium-spil, som ikke er tilgængelige for almindelige spillere.",
  },
  {
    id: "loyalty",
    name: "Loyalitets Free Spins",
    icon: Star,
    description:
      "Belønning til eksisterende kunder baseret på deres spilleaktivitet. Disse spins optjenes over tid og er skræddersyet til den enkelte spillers engagement – jo mere du spiller, desto flere spins modtager du.",
  },
  {
    id: "reload",
    name: "Re-load Free Spins",
    icon: RefreshCw,
    description:
      "Tilbydes ved efterfølgende indbetalinger og er designet til at belønne fortsat spil. Antallet og vilkårene varierer fra casino til casino, men de giver dig regelmæssige muligheder for ekstra spins.",
  },
];

const FreeSpins = () => {
  const faqJsonLd = buildFaqSchema(freeSpinsFaqs);

  const articleJsonLd = buildArticleSchema({
    headline: "Free Spins – Komplet Guide til Gratis Spins 2026",
    description: "Alt du skal vide om free spins på danske casinoer. Typer, omsætningskrav, betingelser og strategier.",
    url: `${SITE_URL}/free-spins`,
    datePublished: "2025-06-01",
    dateModified: "2026-02-20",
    videoId: "q4jeGo9TPEk",
  });

  const videoJsonLd = buildVideoSchema(`${SITE_URL}/free-spins`, "q4jeGo9TPEk", {
    title: "Free Spins på danske casinoer – Komplet guide",
    description: "Jonas gennemgår alt om free spins på danske casinoer: typer, omsætningskrav, betingelser og strategier til at maksimere værdien af dine gratis spins.",
    uploadDate: "2026-02-20",
    duration: "PT1M30S",
  });

  return (
    <>
      <SEO
        title="Free Spins – Komplet Guide til Gratis Spins 2026 | Casinoaftaler"
        description="Alt du skal vide om free spins på danske casinoer. Typer, omsætningskrav, betingelser og strategier til at få mest ud af dine gratis spins."
        jsonLd={[faqJsonLd, articleJsonLd, videoJsonLd]}
      />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage:
            "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
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
              Free Spins på Danske Casinoer
            </h1>
            <p className="text-lg text-white/80">
              Gratis spins er en af de mest populære bonustyper i casinoverdenen.
              Lær hvordan de fungerer, hvilke typer der findes, og hvordan du
              udnytter dem bedst muligt.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="niklas" date="20-02-2026" readTime="22 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={freeSpinsHero} alt="Free spins – farverige spilleautomater med mønter" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan vælger du de bedste free spins i 2026
          </h2>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ikke alle free spins er lige meget værd – 50 spins á 2 kr. med 0x omsætning slår 200 spins á 0,50 kr. med 10x krav hver gang. Gratis spins er omgange på spilleautomater, hvor du spiller uden at bruge din egen saldo, men gevinsterne er typisk underlagt{" "}
            <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
              omsætningskrav
            </Link>
            , som du bør forstå før du accepterer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Populariteten bag free spins skyldes netop denne kombination af nul
            risiko og reel gevinstmulighed. For nye spillere fungerer gratis
            spins som en tryg introduktion til casinoet, mens erfarne spillere
            bruger dem til at udforske nye spil uden at belaste budgettet – vælg gerne spil med høj <Link to="/ordbog/rtp" className={linkClass}>RTP</Link> og lav <Link to="/ordbog/volatilitet" className={linkClass}>volatilitet</Link> for mest spilletid.
            Desuden indgår free spins ofte i{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">
              velkomstbonusser
            </Link>
            , loyalitetsprogrammer og løbende kampagner. Du kan også finde dem
            som en del af en{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">
              indskudsbonus
            </Link>{" "}
            eller som{" "}
            <Link to="/bonus-uden-indbetaling" className="text-primary underline hover:text-primary/80">
              bonus uden indbetaling
            </Link>
            .
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Free spins er en af de mest populære kategorier i vores{" "}
            <Link to="/casino-bonus" className="text-primary underline hover:text-primary/80">
              casino bonus guide
            </Link>{" "}
            – sammenlign alle bonustyper og find det bedste tilbud til danske spillere.
          </p>
          <p className="mb-8 text-muted-foreground leading-relaxed">
            Vil du opleve free spins-mekanikken i praksis? I vores{" "}
            <Link to="/community/slots" className="text-primary underline hover:text-primary/80">
              gratis spillehal
            </Link>{" "}
            kan du prøve spilleautomater med bonusrunder og free spins helt uden
            risiko – og samtidig konkurrere på vores{" "}
            <Link to="/community/turneringer" className="text-primary underline hover:text-primary/80">
              leaderboard
            </Link>
            .
          </p>

          <YoutubeEmbed
            videoId="q4jeGo9TPEk"
            title="Hvad er Free Spins på danske casinoer?"
            description="En komplet forklaring af free spins på danske casinoer – hvad de er, hvordan de virker, typer af free spins, omsætningskrav og tips til at få mest ud af dine gratis spins."
            duration="PT57S"
            viewCount={4}
            uploadDate="2026-02-20"
            articleUrl="https://casinoaftaler.dk/free-spins"
          />

          <div className="rounded-lg border border-border bg-muted/30 p-5">
            <h3 className="mb-2 text-lg font-semibold">
              Her gennemgår vores streamer og forfatter Jonas, hvad free spins er
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              <Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> gennemgår de forskellige typer af free spins, hvad omsætningskrav betyder for din reelle gevinst, og hvornår gratis spins faktisk er pengene værd. Videoen supplerer vores guides om{" "}
              <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link>,{" "}
              <Link to="/indskudsbonus" className={linkClass}>indskudsbonus</Link> og{" "}
              <Link to="/bonus-uden-indbetaling" className={linkClass}>bonus uden indbetaling</Link>.
            </p>
          </div>
        </section>

        <InlineCasinoCards title="Bedste casinoer med free spins" count={6} />

        <Separator className="my-10" />

        {/* Typer af Free Spins */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Typer af free spins-bonusser</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Selvom idéen bag gratis spins er simpel, findes der mange
            variationer med forskellige vilkår og fordele. Her er de mest
            almindelige typer, du vil støde på hos danske casinoer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {freeSpinsTypes.map((type) => (
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

        {/* Betingelser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Betingelser du skal kende til
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Uanset hvor fristende free spins er, følger der altid vilkår og
            betingelser med. At forstå disse krav er afgørende for at vurdere
            den reelle værdi af et tilbud og undgå ubehagelige overraskelser.
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
                    Omsætningskrav
                  </Link>{" "}
                  angiver, hvor mange gange du skal spille dine
                  free spins-gevinster igennem, før du kan hæve dem. Hvis du
                  vinder 100 kr. med gratis spins og omsætningskravet er 10x,
                  skal du placere væddemål for 1.000 kr., før pengene kan
                  udbetales. Alle danske casinoer opererer med 10x omsætningskrav – eller overvej{" "}
                  <Link to="/bonus-uden-omsaetningskrav" className="text-primary underline hover:text-primary/80">
                    bonusser uden omsætningskrav
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Spilbegrænsninger
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                   Free spins er næsten altid knyttet til specifikke
                   spilleautomater valgt af casinoet. Populære titler inkluderer Starburst, Book of Dead og{" "}
                   <Link to="/casinospil/spillemaskiner/big-bass-bonanza" className={linkClass}>Big Bass Bonanza</Link>. Se
                   det som en mulighed for at opdage nye favoritspil – men
                   husk at tjekke, hvilke spil der er inkluderet, inden du
                   accepterer bonussen.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  Tidsbegrænsninger
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Alle free spins-tilbud i Danmark har en udløbsdato – typisk
                  mellem 24 timer og 30 dage. Danske casinoer er forpligtede
                  til at angive gyldighedsperioden tydeligt. Ubrugte spins
                  forsvinder automatisk, når fristen udløber, så det betaler
                  sig at bruge dem hurtigt.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="h-5 w-5 text-primary" />
                  Gevinstlofter og maks. indsats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mange free spins-bonusser har et loft for, hvor meget du kan
                  vinde. Selvom du rammer en stor jackpot, kan et gevinstloft
                  begrænse det beløb, du faktisk kan hæve. Derudover kan der
                  være en maksimal indsats pr. spin, som du skal overholde
                  under omsætningen – overskrides den, risikerer du at miste
                  bonussen.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        <Separator className="my-10" />

        {/* Hvor finder man free spins */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvor finder man free spins?
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Free spins er tæt knyttet til bonusser, kampagner og{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">
              velkomstpakker
            </Link>
            . Her er de mest almindelige steder, du kan støde
            på tilbud med gratis spins.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Velkomstbonusser",
                desc: "Det mest almindelige sted at finde free spins. Nye spillere modtager typisk et antal gratis spins som en del af registreringen eller den første indbetaling.",
                icon: Gift,
              },
              {
                title: "Indbetalingskampagner",
                desc: "Ved at indbetale på bestemte tidspunkter kan du modtage free spins som ekstra bonus – ofte knyttet til weekendtilbud eller særlige kampagneperioder.",
                icon: TrendingUp,
              },
              {
                title: "Loyalitetsprogrammer",
                desc: "Regelmæssige spillere belønnes med free spins baseret på spilleaktivitet. Jo mere du spiller, desto flere spins optjener du.",
                icon: Star,
              },
              {
                title: "Turneringer og events",
                desc: "Casinoer arrangerer jævnligt konkurrencer, hvor free spins er en del af præmiepuljen – ofte knyttet til nye spilslip eller sæsonbegivenheder.",
                icon: Trophy,
              },
              {
                title: "VIP-programmer",
                desc: "De mest engagerede spillere nyder eksklusive free spins med bedre vilkår – lavere omsætningskrav, højere spinværdi og adgang til premium-slots.",
                icon: Sparkles,
              },
              {
                title: "Nyhedsbreve og bonuskoder",
                desc: "Ved at tilmelde dig casinoets nyhedsbrev kan du modtage eksklusive bonuskoder, der giver adgang til free spins, som ikke er tilgængelige for alle.",
                icon: Target,
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

        {/* In-game Free Spins */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">In-game free spins</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ud over de bonusbaserede free spins findes der også in-game free
            spins, som aktiveres direkte inde i en spilleautomat. Disse udløses
            typisk ved at lande et bestemt antal scatter-symboler på hjulene og
            er en integreret del af spillets mekanik.
          </p>
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed">
                <strong>Vigtigt at forstå:</strong> In-game free spins er ikke
                det samme som casino-bonusser. De er en del af spillets
                returprocent (RTP) og kræver ingen bonuskode eller tilmelding.
                Gevinster fra in-game free spins tilføjes direkte til din saldo
                uden{" "}
                <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
                  omsætningskrav
                </Link>{" "}
                – medmindre du spiller med bonuspenge.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Strategier */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Strategier til at få mest ud af dine free spins
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Selvom free spins grundlæggende handler om held, kan en strategisk
            tilgang øge dine chancer for at omdanne gratis spins til reel
            gevinst. Her er de vigtigste tips.
          </p>

          <div className="space-y-4">
            {[
              {
                title: "1. Læs altid vilkårene grundigt",
                desc: "Omsætningskrav, gevinstlofter, tidsbegrænsninger og spilbegrænsninger varierer kraftigt. Brug tid på at forstå betingelserne, før du accepterer en bonus.",
              },
              {
                title: "2. Prioritér lave omsætningskrav",
                desc: "Et tilbud med 10x omsætning er markant mere værdifuldt end et med 50x. Lave krav giver dig en realistisk chance for at hæve dine gevinster.",
              },
              {
                title: "3. Vælg spil med høj RTP",
                desc: "Hvis du har valgfrihed, så spil på automater med en RTP over 96 %. Højere RTP betyder, at du statistisk set beholder mere af dine gevinster over tid.",
              },
              {
                title: "4. Brug dine spins hurtigt",
                desc: "Free spins har altid en udløbsdato. Vent ikke for længe – ubrugte spins forsvinder, og du mister muligheden for gevinst.",
              },
              {
                title: "5. Overvej omsætningsfrie spins",
                desc: "Hvis du har muligheden, vælg altid omsætningsfrie free spins. Her kan du hæve gevinsterne med det samme – selvom gevinstloftet kan være lavere.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardContent className="pt-6">
                  <h4 className="mb-2 font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Faldgruber */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                Undgå disse faldgruber
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-3">
                {[
                  "Acceptér aldrig en bonus uden at læse vilkårene – omsætningskrav kan gøre gevinster svære at hæve.",
                  "Hold øje med udløbsdatoer. Glemte spins er tabte spins.",
                  "Overskrid aldrig den maksimale indsats under omsætning – det kan annullere hele din bonus.",
                  "Lad dig ikke friste af et højt antal free spins alene. Vilkårene er vigtigere end antallet.",
                  "Spil altid på licenserede danske casinoer for at sikre fair behandling og regulering.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* EV-analyse af free spins */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Matematisk værdianalyse: Hvad er free spins reelt værd?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Free spins' reelle værdi afhænger af tre faktorer: spinværdi, spillets RTP, og omsætningskrav. Formlen for reel værdi er: <strong>Reel værdi = (Antal spins × Spinværdi × RTP) ÷ (1 + Omsætningskrav × House Edge)</strong>. Lad os sammenligne tre typiske scenarier.
          </p>

          <div className="space-y-4">
            <Card className="border-primary/30 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-primary" />
                  50 free spins á 2 kr. med 0x omsætning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Nominel værdi:</strong> 50 × 2 = 100 kr. <strong>RTP (96%):</strong> Forventet gevinst = 96 kr. <strong>Omsætning (0x):</strong> Hele beløbet kan hæves direkte. <strong>Reel EV = 96 kr.</strong> – dette er den bedste type free spins du kan finde. Gevinsterne er dine med det samme.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-primary" />
                  100 free spins á 1 kr. med 10x omsætning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Nominel værdi:</strong> 100 × 1 = 100 kr. <strong>Forventet gevinst fra spins:</strong> 96 kr. <strong>Omsætning:</strong> 96 × 10 = 960 kr. <strong>Forventet tab under omsætning:</strong> 960 × 0,04 = 38,40 kr. <strong>Reel EV = 96 – 38,40 = 57,60 kr.</strong> – stadig OK, men 40% lavere end 0x-varianten.
                </p>
              </CardContent>
            </Card>

            <Card className="border-destructive/30 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  200 free spins á 0,50 kr. med 10x omsætning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Nominel værdi:</strong> 200 × 0,50 = 100 kr. <strong>Forventet gevinst:</strong> 96 kr. Men spinværdi á 0,50 kr. giver typisk lavere gevinstfrekvens og smaller hits. <strong>Reel EV ≈ 55-58 kr.</strong> – samme som 100 spins á 1 kr., men med længere spilletid og mere varians. Kvantitet slår IKKE kvalitet ved free spins.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 rounded-lg border border-primary/30 bg-accent/30 p-4">
            <p className="text-sm text-muted-foreground">
              <strong>RTP-optimering ved free spins:</strong> Ikke alle slots har samme RTP. Blood Suckers (98%) giver markant bedre EV end Starburst (96,1%) over mange spins. Hvis du har valgfrihed i slot, vælg altid den højeste RTP. Forskellen på 96% og 98% RTP over 10x omsætning er ~20 kr. per 100 kr. i spin-værdi – det lyder småt, men akkumulerer over tid.
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Spillerprofiler */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvem bør vælge free spins – og hvem bør undlade?
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Free spins passer ikke til alle spillertyper lige godt. Her er en segmenteret analyse af hvem der får mest ud af free spins-bonusser.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "✅ Slot-entusiasten", desc: "Perfekt match. Free spins er designet til spilleautomater, og slot-elskeren får direkte adgang til sine yndlingsspil uden risiko. Optimal strategi: Vælg altid spins med højest spinværdi og lavest omsætningskrav.", icon: Sparkles },
              { title: "✅ Den nye spiller", desc: "Ideel startbonus. Free spins giver risikofri introduktion til spilleautomater og casinoets platform. Ingen indbetaling nødvendig ved no-deposit free spins – perfekt til at teste uden forpligtelse.", icon: User },
              { title: "✅ Bonusjægeren", desc: "Profitable ved korrekt selektion. Bonusjægeren fokuserer på 0x-omsætning free spins og høj-RTP slots. Med systematisk approach kan EV per tilbud nå 50-90% af den nominelle værdi.", icon: Target },
              { title: "⚠️ Casual spilleren", desc: "Acceptabelt, men læs vilkårene. Free spins med omsætningskrav kræver yderligere spil – casual spilleren skal vurdere om tidsforbruget matcher den forventede gevinst (typisk 50-100 kr.).", icon: Clock },
              { title: "❌ Bordspil-spilleren", desc: "Irrelevant. Free spins fungerer kun på slots – bordspil-entusiasten bør i stedet kigge efter cashback-bonusser eller no-deposit bonuspenge, der kan bruges på blackjack/roulette.", icon: Ban },
              { title: "❌ High rolleren", desc: "Undervældende. Med typisk spinværdi på 1-5 kr. er free spins' samlede værdi (50-250 kr.) negligibel for high rollere. En matchbonus på 100% op til 1.000 kr. giver bedre værdi.", icon: TrendingUp },
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

        {/* Free Spins markedsoverblik */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Free spins i Danmark 2026 – Trends og markedsoverblik
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Free spins er fortsat en af de mest eftertragtede bonustyper hos danske spillere i 2026. Næsten alle danske casinoer inkluderer free spins i deres velkomstpakker, og tilbuddene bliver stadig mere attraktive. I 2026 ser vi en klar trend mod omsætningsfrie free spins – gratis spins, hvor du beholder alle gevinster med det samme uden gennemspilskrav.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Værdien af free spins varierer betydeligt mellem danske casinoer. Nogle tilbyder 50 free spins på populære slots som Book of Dead eller Starburst, mens andre giver op til 200 free spins fordelt over flere dage. Den vigtigste faktor er ikke antallet af free spins, men vilkårene – specielt omsætningskrav, gevinstlofter og hvilke spil de gælder for. Free spins med lave <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link> eller helt uden krav giver den bedste reelle værdi.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En vigtig udvikling i 2026 er personaliseringen af free spins-tilbud. Flere casinoer tilbyder nu skræddersyede free spins baseret på din spillehistorik – f.eks. free spins på dine yndlingsspil eller med højere spinværdi for loyale spillere. Denne personalisering gør free spins endnu mere værdifulde, da de matcher din spillestil præcist.
          </p>
           <p className="text-muted-foreground leading-relaxed">
            For at finde de bedste free spins-tilbud anbefaler vi at sammenligne vilkårene grundigt. Kig efter free spins med spinværdi på mindst 2 kr., omsætningskrav under 10x (eller helst 0x), og en rimelig gyldighedsperiode på mindst 7 dage. Kombineret med en god <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonus</Link> kan free spins give dig en fantastisk start hos et nyt dansk casino. Du kan også optjene ekstra spins gennem vores{" "}
            <Link to="/community/rewards" className="text-primary underline hover:text-primary/80">Rewards Program</Link>.
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
                Free spins er underholdende, men husk altid at sætte et budget
                og holde dig til det. Spil aldrig for mere, end du har råd til
                at tabe, og tag regelmæssige pauser.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Alle casinoer på vores liste tilbyder selvudelukkelse via{" "}
                <a
                  href="https://www.rofus.nu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  ROFUS
                </a>
                . Har du brug for hjælp, kan du kontakte{" "}
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

        {/* Teknisk deep-dive */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Teknisk deep-dive: Hvordan beregnes free spins-gevinster?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at forstå free spins' reelle værdi er det essentielt at vide, hvordan gevinsterne genereres teknisk. Alle licenserede spilleautomater bruger en Random Number Generator (RNG) – en algoritm der sikrer fuldstændig tilfældige resultater på hvert eneste spin. Din chance for at vinde er præcis den samme, uanset om du spiller med egne penge, bonuspenge eller free spins.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>RTP og hit frequency:</strong> En spilleautomat med 96% RTP returnerer statistisk 96 kr. for hver 100 kr. satset – over millioner af spins. Men "hit frequency" (hvor ofte du vinder noget) varierer enormt. Starburst har en hit frequency på ~22% (du vinder noget på ca. hvert 5. spin), mens Book of Dead har ~33% hit frequency men med større variation i gevinsternes størrelse. For free spins er hit frequency vigtigere end RTP, fordi du har et begrænset antal spins.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Spinværdiens indvirkning:</strong> Free spins har altid en fast "spinværdi" – det beløb hvert spin er værd (typisk 1-10 kr.). Spinværdien svarer til din indsats per spin og afgør direkte dine potentielle gevinster. 25 free spins á 5 kr. = 125 kr. total nominel værdi og langt højere gevinstpotentiale end 50 spins á 1 kr. = 50 kr. total. En 100x-gevinst på et 5 kr.-spin giver 500 kr.; samme 100x på et 1 kr.-spin giver kun 100 kr.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Bonusrunder under free spins:</strong> Kan du udløse bonusrunder (in-game free spins) under dine casino-free spins? Ja – og det er ofte den eneste vej til store gevinster med gratis spins. Hvis du aktiverer en bonusrunde i Book of Dead under dine free spins, får du de ekstra spins oven i dine eksisterende. Gevinster fra in-game bonusrunder tæller med i din bonussaldo og er underlagt de samme omsætningskrav. I Danmark kræver Spillemyndigheden at alle in-game gevinster bidrager til <Link to="/omsaetningskrav" className={linkClass}>omsætningskravet</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Sæsonkampagner */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sæsonbaserede free spins-kampagner: Hvornår finder du de bedste tilbud?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Free spins-tilbud varierer markant afhængigt af årstiden, og den strategiske spiller kan udnytte disse mønstre til at maksimere sin samlede bonusværdi. Her er en datadrevet analyse af årets bedste perioder for free spins hos danske casinoer:
          </p>
          <div className="space-y-3">
            {[
              { title: "🎄 December-Januar (jul & nytår) – Årets bedste", desc: "Casinoerne investerer mest i markedsføring i december. Typisk 50-100% flere free spins end gennemsnittet, ofte med lavere omsætningskrav. Julekalendere med daglige free spins er særligt populære – op til 200 spins fordelt over 24 dage. Nytårstilbud inkluderer ofte engangs-pakker med premium-vilkår.", icon: Gift },
              { title: "🐣 Påsken – Underspillet guldgrube", desc: "Påske er en underspillet periode: færre spillere konkurrerer om kampagnetilbuddene, og casinoerne tilbyder overraskende generøse free spins-pakker for at opretholde aktiviteten. Typisk 30-50% flere spins end gennemsnitligt med sammenlignelige vilkår.", icon: Star },
              { title: "🛒 Black Friday/Cyber Monday – Korte men intense", desc: "Inspireret af detailhandlen tilbyder mange danske casinoer eksplosive free spins-tilbud i Black Friday-ugen. Typisk 24-48 timers gyldighedsperiode med dobbelt antal spins eller 0x omsætning. Kræver hurtig reaktion – tilbuddene udløber hurtigt.", icon: Zap },
              { title: "☀️ Sommer (juni-august) – Laveste aktivitet", desc: "Sommerperioden har færrest kampagner, og free spins-tilbuddene er ofte standard eller under gennemsnittet. Dog: nye casinolanceringer sker jævnt fordelt over året, og et nyt casino i sommeren kan tilbyde aggressive velkomsttilbud med mange free spins for at kompensere for lav generel aktivitet.", icon: Clock },
              { title: "🎰 Nye spil-lanceringer – Hele året", desc: "Når store spiludviklere lancerer nye titler, tilbyder casinoer ofte free spins specifikt på det nye spil. Disse spins har typisk favorabel RTP (95-97%) og giver dig mulighed for at teste nye spil uden risiko. Hold øje med lanceringer fra populære udviklere som NetEnt, Pragmatic Play og Play'n GO.", icon: Sparkles },
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

        {/* In-content developer section for free spins */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Populære udviklere med free spins-venlige slots</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Ikke alle spiludviklere er lige gode til free spins. Disse fire skiller sig ud med høj RTP, engagerende bonusfunktioner og hyppige free spins-kampagner hos danske casinoer.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                provider: "Pragmatic Play", slug: "pragmatic-play",
                desc: "Markedsleder med enormt udvalg. Deres slots bruges oftest til free spins-kampagner hos danske casinoer.",
                slots: [
                  { name: "Sweet Bonanza", slug: "sweet-bonanza" },
                  { name: "Gates of Olympus", slug: "gates-of-olympus" },
                ],
              },
              {
                provider: "NetEnt", slug: "netent",
                desc: "Branchens pionér med ikoniske titler. Kendt for stabil RTP og lav volatilitet – idéelt til free spins.",
                slots: [
                  { name: "Starburst", slug: "starburst" },
                  { name: "Gonzo's Quest", slug: "gonzos-quest" },
                ],
              },
              {
                provider: "Play'n GO", slug: "play-n-go",
                desc: "Innovativ udvikler med bred portefølje. Deres Book of Dead er en af de hyppigst brugte slots til free spins-tilbud.",
                slots: [
                  { name: "Book of Dead", slug: "book-of-dead" },
                  { name: "Fire Joker", slug: "fire-joker" },
                ],
              },
              {
                provider: "Big Time Gaming", slug: "big-time-gaming",
                desc: "Opfinderne af Megaways-mekanikken. Tilbyder høj vindpotentiale med varierende volatilitet.",
                slots: [
                  { name: "Bonanza", slug: "bonanza" },
                  { name: "Extra Chilli Megaways", slug: "extra-chilli-megaways" },
                ],
              },
            ].map((dev) => (
              <div key={dev.slug} className="rounded-xl border border-border bg-card p-5">
                <Link to={`/spiludviklere/${dev.slug}`} className="text-lg font-semibold text-primary hover:underline">
                  {dev.provider}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{dev.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {dev.slots.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/casinospil/spillemaskiner/${s.slug}`}
                      className="inline-block rounded-md bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Free spins som loyalitetsværktøj */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Free spins som loyalitetsværktøj: Den langsigtede strategi
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Velkomstbonussens free spins er kun begyndelsen. For den langsigtede spiller er det løbende free spins-tilbud – via loyalitetsprogrammer, VIP-niveauer og reload-kampagner – der skaber reel vedvarende værdi. Forstår du dette system, kan du akkumulere hundredvis af free spins månedligt uden at ændre dit spillebudget.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Loyalitetspoint → free spins:</strong> De fleste danske casinoer konverterer spilleaktivitet til loyalitetspoint, som kan veksles til free spins. Typisk kurs: 100 kr. omsætning = 1 loyalitetspoint. 100 point = 10-20 free spins. Det betyder at du "optjener" gratis spins for ca. 1 kr. per spin – en lavere pris end de fleste bonustilbud. VIP-spillere får bedre kurser: 50 point = 20-50 free spins med højere spinværdi.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Akkumuleringsstrategien:</strong> Den mest effektive langsigtede strategi for free spins er at oprette konti hos 3-5 danske casinoer og modtage løbende free spins fra hver. De fleste casinoer tilbyder ugentlige reload-spins (10-25 free spins) til aktive spillere. Med 5 casinoer modtager du 50-125 gratis spins ugentligt – en samlet nominel værdi på 100-500 kr. per uge, helt uden ekstra indbetaling ud over din normale spilleaktivitet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>VIP-free spins er game-changeren:</strong> Når du opnår VIP-status (typisk efter 10.000-50.000 kr. omsætning), ændrer free spins-landskabet sig dramatisk. VIP-free spins har typisk: 3-10 kr. spinværdi (vs. 1-2 kr. standard), omsætningsfrie vilkår, adgang til premium-slots, og ingen gevinstloft. En enkelt VIP free spins-pakke med 50 spins á 5 kr. og 0x omsætning har en EV på ~240 kr. – mere end de fleste velkomstbonusser.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Juridisk perspektiv */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Regulatorisk ramme: Free spins og dansk lovgivning
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Free spins er reguleret under Spillemyndighedens generelle bonusregler, men der er specifikke aspekter der gælder for gratis spins: gevinster fra free spins er underlagt det samme 10x omsætningsloft som alle andre bonusser. Casinoer skal tydeligt angive spinværdien, antal spins, det specifikke spil, omsætningskrav og gevinstloft direkte i markedsføringsmaterialet – ikke kun i de detaljerede vilkår.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Skattefrihed:</strong> Gevinster fra free spins på danske licenserede casinoer er skattefrie – uanset beløbet. Casinoet har allerede afregnet 28% spilleafgift. Det gælder også gevinster fra omsætningsfrie free spins. På <Link to="/casino-licenser" className={linkClass}>udenlandske casinoer</Link> uden dansk licens er gevinster over 200 kr. skattepligtige.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>ROFUS og selvudelukkelse:</strong> Spillere registreret i ROFUS kan ikke modtage free spins eller andre bonusser hos danske casinoer. MitID-verifikationen forhindrer dette automatisk. Har du brug for hjælp med spilleadfærd, kontakt <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>. 18+ | Spil ansvarligt.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Unik konklusion */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Free spins i perspektiv: Underholdning med beregnet bonusmulighed</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Free spins er hverken gratis penge eller en garanti for gevinst – de er et underholdningsprodukt med en matematisk defineret forventet værdi. Med de rette vilkår (høj spinværdi, lav eller 0x omsætning, høj-RTP spil) kan free spins tilbyde genuine værdi. Med dårlige vilkår (lav spinværdi, 10x omsætning, lav-RTP spil) er de primært et markedsføringsværktøj.
          </p>
          <div className="space-y-3">
            {[
              {
                title: "Spinværdi × antal > alt andet",
                desc: "50 spins á 2 kr. (100 kr. total) slår altid 200 spins á 0,50 kr. (100 kr. total), fordi højere spinværdi giver adgang til bedre gevinstlinjer og bonusfunktioner i spillene.",
              },
              {
                title: "Omsætningsfrie spins er det nye guld",
                desc: "Wager-free free spins med 96%+ RTP giver 90-96% reel værdi – den tætteste du kommer på 'gratis penge'. Prioriter altid omsætningsfrie spins over standard-spins med omsætningskrav.",
              },
              {
                title: "In-game free spins er din bedste ven",
                desc: "Udløser du bonusrunder under dine casino-free spins, multiplicerer du din gevinstchance uden ekstra indsats. Vælg spil med aktive bonusfunktioner som Starburst (re-spins) eller Book of Dead (expanding symbols).",
              },
              {
                title: "Sæsonbevidsthed løfter din EV",
                desc: "December og Black Friday tilbyder 50-100% flere free spins end gennemsnittet. Planlæg dine casinoregistreringer strategisk for at ramme de bedste kampagneperioder.",
              },
              {
                title: "Spil kun på danske licenserede casinoer",
                desc: "Skattefrie gevinster, 10x omsætningsloft og transparent regulering gør danske free spins til Europas bedste. Spil ansvarligt – ROFUS og StopSpillet.dk er der for dig. 18+.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex items-center gap-4 p-6">
              <Sparkles className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Se dagens aktuelle free spins tilbud</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Opdateret dagligt med verificerede kampagner fra danske licenserede casinoer.
                </p>
                <Link to="/free-spins-i-dag" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                  Gå til Free Spins i Dag →
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8 rounded-xl border border-border/40 bg-card/50 p-5 md:p-6">
          <h3 className="flex items-center gap-2 text-base font-semibold text-foreground mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            Læs vores anmeldelser af casinoer med free spins
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Få det fulde overblik over vilkår, spiludvalg og free spins-tilbud hos de bedste danske casinoer:
          </p>
          <ul className="space-y-2">
            {[
              { slug: "spildansknu", name: "SpilDanskNu" },
              { slug: "leovegas", name: "LeoVegas" },
              { slug: "unibet", name: "Unibet" },
              { slug: "bet365", name: "bet365" },
              { slug: "comeon", name: "ComeOn" },
            ].map((casino) => (
              <li key={casino.slug} className="flex items-center gap-2">
                <Star className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                <Link
                  to={`/casino-anmeldelser/${casino.slug}`}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Læs vores {casino.name} anmeldelse
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <LiveCommunityDataStrip context="bonus" />
        <LatestNewsByCategory pagePath="/free-spins" />
        <BonusMoneyLinks currentPath="/free-spins" />
        <RelatedGuides currentPath="/free-spins" />

        <FAQSection title="Ofte stillede spørgsmål om free spins" faqs={freeSpinsFaqs} />

        <AuthorBio author="niklas" />
      </div>
      <StickyCtaBySlug slug="spildansknu" />
    </>
  );
};

export default FreeSpins;
