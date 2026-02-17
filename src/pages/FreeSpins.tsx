import React from "react";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema } from "@/lib/seo";
import { RelatedGuides } from "@/components/RelatedGuides";
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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Free Spins – Komplet Guide til Gratis Spins 2026",
    description: "Alt du skal vide om free spins på danske casinoer. Typer, omsætningskrav, betingelser og strategier.",
    author: { "@type": "Organization", name: "Casinoaftaler" },
    publisher: { "@type": "Organization", name: "Casinoaftaler" },
    datePublished: "2025-06-01",
    dateModified: "2026-02-11",
    mainEntityOfPage: "https://casinoaftaler.dk/free-spins",
  };

  return (
    <>
      <SEO
        title="Free Spins – Komplet Guide til Gratis Spins 2026 | Casinoaftaler"
        description="Alt du skal vide om free spins på danske casinoer. Typer, omsætningskrav, betingelser og strategier til at få mest ud af dine gratis spins."
        jsonLd={[faqJsonLd, articleJsonLd]}
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
        <AuthorMetaBar author="jonas" date="11-02-2026" readTime="12 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={freeSpinsHero} alt="Free spins – farverige spilleautomater med mønter" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
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
            bruger dem til at udforske nye spil uden at belaste budgettet.
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
          <p className="text-muted-foreground leading-relaxed">
            Vil du opleve free spins-mekanikken i praksis? I vores{" "}
            <Link to="/community/slots" className="text-primary underline hover:text-primary/80">
              gratis spillehal
            </Link>{" "}
            kan du prøve spilleautomater med bonusrunder og free spins helt uden
            risiko – og samtidig konkurrere på vores{" "}
            <Link to="/community/leaderboard" className="text-primary underline hover:text-primary/80">
              leaderboard
            </Link>
            .
          </p>
        </section>

        <InlineCasinoCards title="Bedste casinoer med free spins" count={4} />

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
                  spilleautomater valgt af casinoet. Det kan være populære
                  titler som Starburst, Book of Dead eller Gonzo's Quest. Se
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

        {/* Vores vurdering */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Vores vurdering</h2>
          <div className="space-y-3">
            {[
              {
                title: "Risikofri spiloplevelse",
                desc: "Free spins giver dig mulighed for at spille uden at bruge dine egne penge – perfekt til at udforske nye spil.",
              },
              {
                title: "Mange varianter",
                desc: "Fra no deposit spins til VIP-belønninger – der er en type for enhver spiller og spillestil.",
              },
              {
                title: "Vilkår er afgørende",
                desc: "Omsætningskrav, gevinstlofter og tidsbegrænsninger bestemmer den reelle værdi af dine free spins.",
              },
              {
                title: "Omsætningsfrie spins er bedst",
                desc: "Vælg altid omsætningsfrie free spins, når det er muligt – her beholder du gevinsterne med det samme.",
              },
              {
                title: "Spil kun på licenserede casinoer",
                desc: "Danske licenserede casinoer garanterer fair vilkår og skattefrie gevinster.",
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

        <AuthorBio />

        <Separator className="my-10" />

        <RelatedGuides currentPath="/free-spins" />

        <FAQSection title="Ofte stillede spørgsmål om free spins" faqs={freeSpinsFaqs} />
      </div>
    </>
  );
};

export default FreeSpins;
