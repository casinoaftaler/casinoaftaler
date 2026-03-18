import React from "react";
import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { LiveCasinoMoneyLinks } from "@/components/LiveCasinoMoneyLinks";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles, Target, BarChart3, AlertTriangle, DollarSign,
  TrendingUp, Shield, Zap, Brain, Calculator, Percent,
  Dices, Activity, Layers, Users, Gauge, Timer, Scale, Crown, Flame,
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import crazyTimeHero from "@/assets/heroes/crazy-time-hero.jpg";
import GuideHeroImage from "@/components/GuideHeroImage";

const linkClass = "text-primary underline underline-offset-4 hover:text-primary/80 transition-colors font-medium";

const faqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er RTP i Crazy Time?",
    answer: "Crazy Time har en gennemsnitlig RTP på ca. 95,5 % (house edge 4,5 %). Dog varierer det pr. væddemål: tal-bets (1, 2, 5, 10) har ca. 95,5 % RTP, Coin Flip ca. 95,7 %, Cash Hunt ca. 95,3 %, Pachinko ca. 94,3 % og Crazy Time-bonussen ca. 94,4 %. Paradoksalt nok har de mest underholdende bonusspil den laveste RTP.",
  },
  {
    question: "Hvordan fungerer Top Slot-multiplikatoren?",
    answer: "Før hvert spin aktiveres Top Slot – en virtuel slotmaskine oven over hjulet. Den viser to hjul: ét med væddemålstyper og ét med multiplikatorer (op til 50x). Hvis Top Slot lander på f.eks. '10 × 25x', og hjulet stopper på 10, ganges din gevinst med 25. Top Slot kan også lande på 'All' – alle væddemål boosted. Sandsynligheden for en høj multiplikator kombineret med det rigtige segment er ekstremt lav.",
  },
  {
    question: "Hvad er den maksimale gevinst i Crazy Time?",
    answer: "Den teoretiske maksimale gevinst er 25.000x din indsats. Det sker ved en kombination af Top Slot-multiplikator og en Crazy Time-bonusrunde med alle flappere som høje multiplikatorer. I praksis er gevinster over 5.000x ekstremt sjældne – de fleste bonusrunder giver 5-50x.",
  },
  {
    question: "Er Crazy Time det mest populære game show?",
    answer: (
      <>
        Ja – Crazy Time er det mest spillede <Link to="/live-casino/game-shows" className={linkClass}>casino game show</Link> globalt siden lanceringen i 2020. Det kombinerer fire unikke bonusspil med tilfældige multiplikatorer og har den højeste max gevinst blandt Evolutions game shows. Populariteten skyldes variationen og underholdningsværdien – ikke matematikken, da house edge er højere end klassiske bordspil.
      </>
    ),
  },
  {
    question: "Kan man bruge en strategi i Crazy Time?",
    answer: "Der er ingen strategi, der kan reducere house edge i Crazy Time. Hvert spin er uafhængigt og helt tilfældigt. Du kan vælge væddemål med lavere house edge (tal-væddemål) eller højere volatilitet (bonusvæddemål), men du kan ikke eliminere husets fordel. Den eneste 'strategi' er bankroll management: sæt et budget, overhold det, og betragt spillet som underholdning.",
  },
  {
    question: "Hvad er forskellen på Crazy Time og Dream Catcher?",
    answer: (
      <>
        <Link to="/live-casino/dream-catcher" className={linkClass}>Dream Catcher</Link> er Crazy Times forgænger og markant simplere: ét hjul, ingen bonusspil, kun multiplikatorsegmenter (2x og 7x). Crazy Time har 4 unikke bonusspil (Coin Flip, Cash Hunt, Pachinko, Crazy Time), Top Slot-multiplikatorer og højere max gevinst (25.000x vs. ca. 500x i Dream Catcher). Crazy Time har dog også højere house edge og volatilitet.
      </>
    ),
  },
  {
    question: "Hvor tit kommer bonusrunderne i Crazy Time?",
    answer: "Hjulet har 54 segmenter med 9 bonusspil-segmenter: 4 × Coin Flip, 2 × Cash Hunt, 1 × Pachinko, 1 × Crazy Time, 1 × Cash Hunt. Samlet bonus-sandsynlighed: 9/54 ≈ 16,7 % pr. spin. I gennemsnit rammer du en bonusrunde ca. hvert 6. spin. Den sjældneste bonus (Crazy Time-runden) rammer ca. 1/54 ≈ 1,85 % – ca. hvert 54. spin.",
  },
  {
    question: "Er Crazy Time fair?",
    answer: "Ja – Crazy Time er udviklet af Evolution Gaming og certificeret af uafhængige testlaboratorier (GLI, eCOGRA). Hjulet er mekanisk med en fysisk stopper, og alle RNG-elementer (Top Slot, bonusspil) bruger certificerede tilfældighedsgeneratorer. Spillet streames live fra Evolutions studie i Riga, Letland, med kontinuerlig overvågning. Alle resultater logges og kan revideres af regulatoriske myndigheder.",
  },
  {
    question: "Hvad er den gennemsnitlige bonusgevinst i Crazy Time?",
    answer: "Gennemsnitlige bonusgevinster varierer markant: Coin Flip ~10x (median ~6x), Cash Hunt ~15x (median ~8x), Pachinko ~8x (median ~4x), Crazy Time-bonus ~20x (median ~10x). Bemærk at gennemsnittet er trukket op af sjældne ekstreme hits – medianen er det, de fleste spillere reelt oplever. Over 100 bonusrunder vil ca. 90 % give under 50x, mens 1-2 % giver over 500x.",
  },
  {
    question: "Kan man spille Crazy Time gratis?",
    answer: "Nej – da Crazy Time er et live spil med rigtige dealere, kan det ikke spilles i demo-mode. Du skal indsætte rigtige penge for at deltage. Minimumsindsatsen er typisk 1-2 kr. ved danske casinoer, hvilket gør det tilgængeligt for alle budgetter – men husk, at selv lave indsatser akkumulerer over mange spins.",
  },
];

const CrazyTimeGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Crazy Time – Komplet Matematisk Analyse af Evolutions Game Show",
    description: "Dybdegående analyse af Crazy Time: RTP, house edge, bonusrunder, Top Slot-multiplikatorer og matematisk breakdown af alle væddemål.",
    url: `${SITE_URL}/live-casino/crazy-time`,
    datePublished: "2026-03-08",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Sådan spiller du Crazy Time",
    step: [
      { "@type": "HowToStep", position: 1, name: "Vælg væddemål", text: "Placer dine chips på et eller flere af de 8 væddemålsfelter: tal 1, 2, 5, 10 eller bonusspillene Coin Flip, Cash Hunt, Pachinko og Crazy Time." },
      { "@type": "HowToStep", position: 2, name: "Top Slot aktiveres", text: "Før hvert spin vælger Top Slot et tilfældigt segment og en multiplikator (op til 50x). Hvis hjulet lander på dette segment, ganges gevinsten." },
      { "@type": "HowToStep", position: 3, name: "Hjulet spinnes", text: "Værten spinner det fysiske hjul med 54 segmenter. Resultatet afgøres af, hvor hjulet stopper." },
      { "@type": "HowToStep", position: 4, name: "Bonusspil (valgfrit)", text: "Hvis hjulet stopper på et bonussegment og du har satset på det, deltager du i bonusspillet (Coin Flip, Cash Hunt, Pachinko eller Crazy Time)." },
    ],
  };

  return (
    <>
      <SEO
        title="Crazy Time – RTP, Bonusrunder & Komplet Analyse (2026)"
        description="Alt om Crazy Time: RTP på 95,5 %, 4 unikke bonusspil, Top Slot-multiplikatorer og matematisk EV-analyse. Den mest populære live game show forklaret."
        jsonLd={[articleSchema, faqJsonLd, howToJsonLd]}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Matematisk analyse</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Crazy Time – Det Ultimative Casino Game Show</h1>
            <p className="text-lg text-white/80">
              Evolutions mest populære live game show med 4 bonusspil, Top Slot-multiplikatorer og max gevinst på 25.000x. Her er den fulde matematiske analyse.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="30 min" />
        <GuideHeroImage src={crazyTimeHero} alt="Crazy Time live casino game show hjul i professionelt studie" />

        {/* ── H2 1: Hvad er Crazy Time ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Crown className="h-5 w-5 text-primary" />Hvad er Crazy Time – og hvorfor dominerer det live casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Crazy Time er et live <Link to="/live-casino/game-shows" className={linkClass}>casino game show</Link> udviklet af <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> og lanceret i juni 2020. Det er baseret på et stort pengehjul med 54 segmenter, suppleret af en Top Slot-multiplikator og fire unikke bonusspil: <strong>Coin Flip</strong>, <strong>Cash Hunt</strong>, <strong>Pachinko</strong> og <strong>Crazy Time</strong>-bonusrunden. Spillet streames live 24/7 fra Evolutions flagskibsstudie med professionelle, højt energiske værter, der skaber en tv-lignende underholdningsoplevelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Crazy Time revolutionerede live casino ved at kombinere traditionel gambling med augmented reality-teknologi og tv-underholdning. Hjulet er fysisk og mekanisk drevet – en ægte stopper bestemmer udfaldet – mens bonusspillene bruger avanceret AR for at skabe immersive oplevelser, der hverken er ren gambling eller rent tv, men en helt ny hybrid-kategori. Cash Hunt præsenterer en gigantisk skydebane med 108 multiplikatorer, Pachinko bruger en fysisk puck-drop-mur, og Crazy Time-bonussen åbner et enormt virtuelt hjul med DOUBLE- og TRIPLE-segmenter, der kan forstørre gevinsten eksponentielt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Populariteten er enorm: Crazy Time er konsekvent det mest spillede live casino-spil globalt med tusindvis af samtidige spillere på ethvert tidspunkt. Årsagen er den unikke kombination af lav adgangsbarriere (indsatser fra 1 kr.), høj underholdningsværdi med fire distinkte bonusspil, og et teoretisk gevinstpotentiale på op til 25.000x indsatsen. Men bag de farverige effekter og energiske værter gemmer sig en præcis matematisk struktur med en <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> på 4,2-5,7 % afhængig af væddemålstype – markant højere end klassiske bordspil som <Link to="/live-casino/blackjack" className={linkClass}>blackjack</Link> (0,5 %) eller <Link to="/live-casino/roulette" className={linkClass}>roulette</Link> (2,7 %).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at forstå Crazy Times position i live casino-landskabet er det nyttigt at se det i kontekst af Evolutions game show-evolution: <Link to="/live-casino/dream-catcher" className={linkClass}>Dream Catcher</Link> (2017) var det første money wheel, <Link to="/live-casino/monopoly-live" className={linkClass}>Monopoly Live</Link> (2019) tilføjede et board game-element, og Crazy Time (2020) kombinerede alle elementer med fire bonusspil. Hvert trin har øget kompleksiteten, underholdningsværdien – og house edge. Det er et mønster, der afspejler Evolutions strategi: spillere betaler en stigende "underholdningspræmie" for mere engagerende oplevelser.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For danske spillere er Crazy Time tilgængeligt hos alle større <Link to="/casino-anmeldelser" className={linkClass}>casinoer med dansk licens</Link>, der samarbejder med Evolution Gaming – hvilket inkluderer størstedelen af de licenserede danske operatører. Spillet er identisk uanset casino: samme studie, samme hjul, samme odds. Valget af casino bør derfor baseres på <Link to="/casino-bonus" className={linkClass}>bonus</Link>, <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> og udbetalingshastighed – ikke på gameplay-forskelle, der ikke eksisterer.
          </p>
        </section>

        {/* ── H2 2: Hjulets opbygning ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Dices className="h-5 w-5 text-primary" />Hjulets opbygning – 54 segmenter i matematisk detalje</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Crazy Times hjul har 54 segmenter med en præcis fordeling, der bestemmer sandsynligheden for hvert udfald. Fordelingen er ikke tilfældig – den er matematisk designet til at producere en bestemt house edge og <Link to="/ordbog/volatilitet" className={linkClass}>volatilitet</Link>. Hvert segment har præcis samme bredde, hvilket sikrer, at sandsynligheden for at lande på et segment er proportional med antallet af segmenter af den type.
          </p>

          <Card className="mb-6 border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /> Komplet segmentfordeling</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segment</TableHead>
                    <TableHead className="text-center">Antal</TableHead>
                    <TableHead className="text-center">Sandsynlighed</TableHead>
                    <TableHead className="text-center">Udbetaling</TableHead>
                    <TableHead className="text-center">RTP (ekskl. Top Slot)</TableHead>
                    <TableHead className="text-center">House Edge</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-medium">1</TableCell><TableCell className="text-center">21</TableCell><TableCell className="text-center">38,89 %</TableCell><TableCell className="text-center">1:1</TableCell><TableCell className="text-center">~77,8 %</TableCell><TableCell className="text-center">~4,5 % (med TS)</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">2</TableCell><TableCell className="text-center">13</TableCell><TableCell className="text-center">24,07 %</TableCell><TableCell className="text-center">2:1</TableCell><TableCell className="text-center">~72,2 %</TableCell><TableCell className="text-center">~4,5 % (med TS)</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">5</TableCell><TableCell className="text-center">7</TableCell><TableCell className="text-center">12,96 %</TableCell><TableCell className="text-center">5:1</TableCell><TableCell className="text-center">~77,8 %</TableCell><TableCell className="text-center">~4,2 % (med TS)</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">10</TableCell><TableCell className="text-center">4</TableCell><TableCell className="text-center">7,41 %</TableCell><TableCell className="text-center">10:1</TableCell><TableCell className="text-center">~81,5 %</TableCell><TableCell className="text-center">~4,3 % (med TS)</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium text-primary">Coin Flip</TableCell><TableCell className="text-center">4</TableCell><TableCell className="text-center">7,41 %</TableCell><TableCell className="text-center">Variabel</TableCell><TableCell className="text-center">–</TableCell><TableCell className="text-center">~4,3 %</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium text-primary">Cash Hunt</TableCell><TableCell className="text-center">2</TableCell><TableCell className="text-center">3,70 %</TableCell><TableCell className="text-center">Variabel</TableCell><TableCell className="text-center">–</TableCell><TableCell className="text-center">~4,7 %</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium text-primary">Pachinko</TableCell><TableCell className="text-center">1</TableCell><TableCell className="text-center">1,85 %</TableCell><TableCell className="text-center">Variabel</TableCell><TableCell className="text-center">–</TableCell><TableCell className="text-center">~5,7 %</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium text-primary">Crazy Time</TableCell><TableCell className="text-center">2</TableCell><TableCell className="text-center">3,70 %</TableCell><TableCell className="text-center">Variabel</TableCell><TableCell className="text-center">–</TableCell><TableCell className="text-center">~5,6 %</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bemærk det kritiske mønster: tal-væddemål har den laveste house edge (~4,2-4,5 %), mens bonusvæddemålene har den højeste (4,3-5,7 %). Paradoksalt nok er bonusvæddemålene de mest populære, fordi de tilbyder unik gameplay, dramatiske AR-oplevelser og de højeste potentielle gevinster. Dette er et klassisk eksempel på, hvordan spildesign bevidst styrer spillerens valg mod de væddemål, der er mest profitable for casinoet – spillere betaler en præmie for underholdning.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            RTP-kolonnen "ekskl. Top Slot" viser den rå return baseret udelukkende på hjulfordelingen uden Top Slot-multiplikatoren. Disse tal er markant lavere end den publicerede RTP, fordi Top Slot-multiplikatoren kompenserer ved lejlighedsvist at booste gevinster markant. Det er Top Slot, der bringer den samlede RTP op til 95-96 %-niveauet – uden den ville Crazy Time have en RTP tættere på 75-82 %, hvilket ville gøre det uacceptabelt selv for de mest underholdningsorienterede spillere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Top Slot-multiplikatoren tilføjer et afgørende lag af volatilitet: før hvert spin vælger Top Slot-maskinen ét tilfældigt segment og en multiplikator (2x, 3x, 5x, 10x, 15x, 20x, 25x eller 50x). Hvis hjulet lander på netop dette segment, ganges gevinsten. Top Slot kan også vise "All" – alle væddemål modtager multiplikatoren. Sandsynligheden for at ramme en specifik Top Slot-kombination (f.eks. "Crazy Time × 50x") er astronomisk lav, men effekten er dramatisk: en 50x Top Slot på en Crazy Time-bonus, der allerede giver 500x, resulterer i 25.000x – den absolutte max gevinst. Denne multiplicative gevinststruktur er det, der skaber Crazy Times ekstremt skæve gevinstfordeling og ultra-høje volatilitet.
          </p>
        </section>

        {/* ── H2 3: De fire bonusspil ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Layers className="h-5 w-5 text-primary" />De fire bonusspil – mekanik, matematik og gevinstprofil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Crazy Times unikke appeal ligger i de fire bonusspil, der aktiveres når hjulet stopper på et bonussegment. Hvert spil har sin egen mekanik, volatilitetsprofil og gevinststruktur. At forstå forskellen mellem dem er afgørende for at træffe informerede væddemålsbeslutninger – selvom ingen beslutning kan eliminere house edge.
          </p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card className="border-border">
              <CardHeader className="pb-2"><CardTitle className="text-lg flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> Coin Flip</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>Den simpleste bonus: en virtuel mønt med to sider, hver med en tilfældig RNG-genereret multiplikator. Den røde side har typisk en lavere multiplikator (2x-25x), den blå side en højere (5x-100x). Mønten flippes, og din gevinst svarer til den landede sides multiplikator gange din indsats.</p>
                <p>Coin Flip er den hyppigste bonus (4 segmenter = 7,41 % sandsynlighed) og den mest forudsigelige. De fleste flips giver 2-10x, med lejlighedsvise hits på 25-50x. Med en Top Slot-multiplikator kan gevinsten nå op til 5.000x, men dette kræver en ekstremt sjælden kombination.</p>
                <p><strong>Volatilitet:</strong> Lav-medium · <strong>Median-gevinst:</strong> ~6x · <strong>Gennemsnit:</strong> ~10x · <strong>Max:</strong> 5.000x · <strong>House Edge:</strong> ~4,3 %</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader className="pb-2"><CardTitle className="text-lg flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Cash Hunt</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>En AR-skydebane med 108 tilfældige multiplikatorer skjult bag symboler (kanoner, stjerner, fugle osv.). Alle multiplikatorer bestemmes af RNG før runden starter – dit valg af symbol er derfor kosmetisk, ikke strategisk. Du vælger ét symbol, kameraet zoomer ind, og din multiplikator afsløres.</p>
                <p>Cash Hunt har den mest jævne gevinstfordeling af bonusspillene. De 108 multiplikatorer spænder fra 1x til 25.000x, men fordelingen er stærkt skæv: ca. 60 % af felterne har multiplikatorer under 10x, ca. 30 % ligger mellem 10x-50x, og under 5 % har multiplikatorer over 100x. Den sjældne 25.000x-markør optræder statistisk i færre end 0,1 % af runderne.</p>
                <p><strong>Volatilitet:</strong> Medium · <strong>Median-gevinst:</strong> ~8x · <strong>Gennemsnit:</strong> ~15x · <strong>Max:</strong> 25.000x · <strong>House Edge:</strong> ~4,7 %</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader className="pb-2"><CardTitle className="text-lg flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> Pachinko</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>En fysisk Pachinko-mur med multiplikatorer i bunden (2x, 3x, 5x, 8x, 10x, 15x, 25x, 50x, 100x). En puck droppes fra toppen og bouncer ned gennem pegs. Den endelige position afgør din multiplikator. Udfaldet er mekanisk kaotisk – den mindste variation i drop-punkt skaber vidt forskellige resultater.</p>
                <p>Det unikke ved Pachinko er DOUBLE-felterne: hvis pucken lander på DOUBLE, fordobles alle synlige multiplikatorer, og pucken droppes igen. Teoretisk kan dette gentages ubegrænset, men sandsynligheden for konsekutive DOUBLE-hits falder eksponentielt. Med en initial 100x × DOUBLE × DOUBLE = 400x. Med Top Slot-multiplikator er max gevinsten 25.000x.</p>
                <p><strong>Volatilitet:</strong> Høj · <strong>Median-gevinst:</strong> ~4x · <strong>Gennemsnit:</strong> ~8x · <strong>Max:</strong> 25.000x · <strong>House Edge:</strong> ~5,7 %</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader className="pb-2"><CardTitle className="text-lg flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> Crazy Time-bonussen</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>Det mest eksklusive og spektakulære bonusspil: et enormt virtuelt hjul med multiplikatorer, DOUBLE-segmenter og TRIPLE-segmenter. Værten spinner hjulet, og det stopper på en multiplikator. DOUBLE fordobler alle multiplikatorer og genstarter spinnet; TRIPLE tredobler og genstarter. Denne mekanik kan eskalere gevinsterne eksponentielt.</p>
                <p>Crazy Time-bonussen har den højeste teoretiske max gevinst og den mest dramatiske gameplay. En typisk runde giver 5-20x, men med konsekutive DOUBLE/TRIPLE-hits kan gevinsterne eksplodere. De mest spektakulære Crazy Time-gevinster (10.000x+) involverer altid 2-3 konsekutive DOUBLE/TRIPLE-hits kombineret med en Top Slot-multiplikator. Sandsynligheden for dette er under 0,001 % pr. runde.</p>
                <p><strong>Volatilitet:</strong> Ultra-høj · <strong>Median-gevinst:</strong> ~10x · <strong>Gennemsnit:</strong> ~20x · <strong>Max:</strong> 25.000x · <strong>House Edge:</strong> ~5,6 %</p>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er afgørende at forstå forskellen mellem median og gennemsnit i bonusrunderne. Gennemsnittet trækkes dramatisk op af sjældne ekstreme udfald (1.000x+), mens medianen afspejler det, de fleste spillere faktisk oplever. I Cash Hunt vil 90 % af dine runder give under 50x – men den sjældne 25.000x-gevinst trækker gennemsnittet op til ca. 15x. Denne matematiske virkelighed er vigtig: når du ser "gennemsnitlig bonus-gevinst: 15x", skal du forstå, at dit mest sandsynlige resultat er tættere på 8x.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne skæve fordeling er bevidst: den skaber en konstant forventning om "den store gevinst", der holder spillere engagerede langt ud over, hvad rationel matematik ville anbefale. Det er den psykologiske kerne i Crazy Times design – og grunden til, at det er det mest profitable game show for Evolution Gaming. Spillere accepterer en højere house edge, fordi bonusrunderne giver en unik dopamin-rush, der ikke findes i traditionelle bordspil.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For danske spillere, der ønsker bonusspil med lavere house edge, er Coin Flip det matematisk bedste valg (4,3 % HE), mens Crazy Time-bonussen er det dyreste (5,6 % HE). Men forskellen mellem 4,3 % og 5,6 % er relativt lille sammenlignet med forskellen til <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> (0,5 % HE) – vælg derfor bonusspil baseret på underholdningspræference, ikke på en illusorisk matematisk fordel.
          </p>
        </section>

        {/* ── H2 4: Top Slot-mekanikken ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" />Top Slot-multiplikatoren – den skjulte volatilitetsmotor</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Top Slot er Crazy Times mest innovative mekanisme og den primære driver af spillets ultra-høje volatilitet. Før hvert spin aktiveres en virtuel slotmaskine placeret over det fysiske hjul. Top Slot har to hjul: det venstre viser væddemålstyper (1, 2, 5, 10, Coin Flip, Cash Hunt, Pachinko, Crazy Time, All), og det højre viser multiplikatorer (2x, 3x, 5x, 10x, 15x, 20x, 25x, 50x).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Når begge Top Slot-hjul stopper, vises en kombination som f.eks. "10 × 25x" – hvilket betyder, at hvis det fysiske hjul stopper på segment 10, ganges gevinsten med 25. Hvis Top Slot viser "All × 10x", modtager alle væddemål multiplikatoren uanset hjulets udfald. "All"-segmentet er det sjældneste og mest værdifulde – det eliminerer risikoen for at vælge det forkerte væddemål.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Top Slot-multiplikatorens sandsynlighedsfordeling er ikke offentligt tilgængelig, men baseret på omfattende sporing af tusindvis af spins estimeres følgende frekvenser: 2x-5x multiplikatorer optræder i ca. 60-70 % af spins med aktiv multiplikator, 10x-15x i ca. 20-25 %, 20x-25x i ca. 5-8 %, og 50x i under 2 %. "All"-segmentet optræder i ca. 5-10 % af spins. Den samlede sandsynlighed for, at Top Slot overhovedet viser en multiplikator (vs. "no match"), estimeres til ca. 30-40 % pr. spin.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den matematiske implikation er afgørende: Top Slot tilføjer varians uden at ændre den gennemsnitlige forventede værdi. Over tusindvis af spins bidrager Top Slot med præcis den procentdel af RTP, der bringer basisspillets lave return op til den publicerede 95-96 %. Men i korte sessions kan Top Slot-hits dramatisk ændre dit resultat – en 50x multiplikator på et tal-10 segment giver 500x, hvilket kan vende en tabende session til en massiv gevinst.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det er denne mekanik, der gør Crazy Time så uforudsigelig på kort sigt: uden Top Slot er spillet en langsom blødning (77-82 % basis-RTP), men med lejlighedsvise Top Slot-hits kan resultater svinge vildt i begge retninger. For spilleren føles det som om "alt kan ske" – og det er teknisk korrekt, bare med asymmetriske sandsynligheder, der favoriserer casinoet.
          </p>
        </section>

        {/* ── H2 5: EV-analyse ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" />Expected Value – hvad koster det at spille Crazy Time</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at forstå den reelle pris for at spille Crazy Time er <Link to="/ordbog/expected-value" className={linkClass}>Expected Value (EV)</Link> det vigtigste mål. Med en gennemsnitlig house edge på ~4,5 % kan vi beregne den forventede omkostning præcist:
          </p>

          <Card className="mb-6 border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2"><DollarSign className="h-5 w-5 text-primary" /> EV-scenarier ved forskellige indsatsniveauer</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Indsats/spin</TableHead>
                    <TableHead className="text-center">Spins/time</TableHead>
                    <TableHead className="text-center">Total action/time</TableHead>
                    <TableHead className="text-center">EV (tab)/time</TableHead>
                    <TableHead className="text-center">EV (tab)/4 timer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-medium">10 kr.</TableCell><TableCell className="text-center">60</TableCell><TableCell className="text-center">600 kr.</TableCell><TableCell className="text-center text-destructive">-27 kr.</TableCell><TableCell className="text-center text-destructive">-108 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">25 kr.</TableCell><TableCell className="text-center">60</TableCell><TableCell className="text-center">1.500 kr.</TableCell><TableCell className="text-center text-destructive">-68 kr.</TableCell><TableCell className="text-center text-destructive">-270 kr.</TableCell></TableRow>
                  <TableRow className="bg-primary/5"><TableCell className="font-medium">50 kr.</TableCell><TableCell className="text-center">60</TableCell><TableCell className="text-center">3.000 kr.</TableCell><TableCell className="text-center text-destructive">-135 kr.</TableCell><TableCell className="text-center text-destructive">-540 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">100 kr.</TableCell><TableCell className="text-center">60</TableCell><TableCell className="text-center">6.000 kr.</TableCell><TableCell className="text-center text-destructive">-270 kr.</TableCell><TableCell className="text-center text-destructive">-1.080 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">500 kr.</TableCell><TableCell className="text-center">60</TableCell><TableCell className="text-center">30.000 kr.</TableCell><TableCell className="text-center text-destructive">-1.350 kr.</TableCell><TableCell className="text-center text-destructive">-5.400 kr.</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sammenligning med andre live casino-spil gør omkostningen tydelig: Live blackjack med optimal strategi koster ~15 kr./time ved 50 kr. indsats (0,5 % HE × 50 kr. × 60 hænder). Det betyder, at Crazy Time koster ca. <strong>9× mere pr. time</strong> end optimal blackjack ved samme indsatsniveau. Europæisk <Link to="/live-casino/roulette" className={linkClass}>roulette</Link> koster ~81 kr./time (2,7 % × 50 kr. × 60 spins), hvilket gør det ca. 40 % billigere end Crazy Time. Selv <Link to="/live-casino/dream-catcher" className={linkClass}>Dream Catcher</Link> ved tal-1-satning er billigere (~120 kr./time med 3,4 % HE).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For spillere med et fast underholdningsbudget har dette en dramatisk effekt på spilletid. Med et budget på 1.000 kr. kan du spille Crazy Time i ca. 7,4 timer (ved 50 kr. indsats) vs. 66,7 timer blackjack. Denne 9× forskel i "underholdning pr. krone" er den reelle pris for Crazy Times farverige bonusspil og AR-effekter. Om det er det værd, er et personligt spørgsmål – men det er afgørende at kende prisen, før du beslutter dig.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Et vigtigt forbehold: EV er et langsigtet gennemsnit. Over en enkelt 4-timers session kan dit resultat svinge voldsomt pga. Crazy Times ultra-høje volatilitet. Du kan vinde 10.000 kr. eller tabe 2.000 kr. – men over mange sessions vil dit gennemsnitlige tab konvergere mod -135 kr./time. Det er denne langsigtede matematik, der afgør, om Crazy Time er en underholdningsudgift eller en tabsmaskine – afhængig af dit perspektiv.
          </p>
        </section>

        <InlineCasinoCards />

        {/* ── H2 6: Volatilitetsanalyse ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Activity className="h-5 w-5 text-primary" />Volatilitet og standardafvigelse – den matematiske virkelighed</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Crazy Times volatilitet er ekstremt høj sammenlignet med andre live casino-spil – og det er denne volatilitet, der skaber både spillets appeal og dets risiko. Standardafvigelsen pr. spin estimeres til ca. 40-80× indsatsen (afhængig af væddemålsmix), sammenlignet med ~1,1x for blackjack, ~5,8x for europæisk roulette (straight-up bet) og ~15x for typiske <Link to="/spillemaskiner" className={linkClass}>spillemaskiner</Link>.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvad betyder det i praksis? Over 100 spins med 50 kr. indsats kan dit bankroll svinge med ±20.000-40.000 kr. fra det forventede resultat. Statistisk set vil ca. 5 % af sessions resultere i en gevinst på 3× bankroll eller mere, mens ca. 30 % ender med totalt tab af session-bankroll. De resterende 65 % vil opleve et tab mellem 0 og 100 % af bankroll – det typiske resultat er et moderat tab tæt på den forventede EV.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Coefficient of Variation (CV) – forholdet mellem standardafvigelse og gennemsnitlig gevinst – er ca. 8-15 for bonusvæddemål i Crazy Time. Til sammenligning er CV for europæisk roulette ca. 5,5 og for blackjack ca. 1,1. En høj CV indikerer, at kortvarige resultater er ekstremt uforudsigelige, og at du har brug for langt flere spins for at konvergere mod det forventede resultat. For Crazy Time kræves typisk 50.000+ spins for at komme inden for 1 % af den teoretiske RTP – langt mere end nogen normal spillesession.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne volatilitetsprofil har direkte implikationer for bankroll management. For at overleve 4 timers spil (240 spins) med 95 % sikkerhed har du brug for en bankroll på ca. 80-120× din gennemsnitlige indsats. Ved 50 kr./spin svarer det til 4.000-6.000 kr. Spillere med mindre bankrolls vil opleve en markant højere risiko for tidlig bust – du kan let tabe 50+ spins i træk uden en eneste meningsfuld gevinst.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> er forståelsen af volatilitet afgørende. Høj volatilitet skaber en illusion af, at spillet "skylder dig en gevinst" efter en tabsrække – men hvert spin er matematisk uafhængigt. Der er ingen "due effect" i Crazy Time, og der er ingen mønster du kan udnytte. Volatiliteten arbejder hverken for eller imod dig – den gør bare resultater mere uforudsigelige.
          </p>
        </section>

        {/* ── H2 7: Væddemålsstrategi ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Target className="h-5 w-5 text-primary" />Væddemålsstrategi – hvad giver lavest house edge</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Selvom der ikke findes en strategi, der kan eliminere house edge i Crazy Time, kan du vælge væddemål med lavere matematisk omkostning. Her er en komplet ranking af alle 8 væddemål efter deres estimerede house edge:
          </p>

          <Card className="mb-6 border-border">
            <CardHeader className="pb-2"><CardTitle className="text-lg">Væddemåls-ranking efter House Edge</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between"><span className="flex items-center gap-2"><Badge variant="secondary" className="bg-green-500/10 text-green-500">Lavest</Badge> Tal 5</span><span className="text-muted-foreground">~4,2 % HE</span></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-2"><Badge variant="secondary" className="bg-green-500/10 text-green-500">Lav</Badge> Tal 10</span><span className="text-muted-foreground">~4,3 % HE</span></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-2"><Badge variant="outline">Medium</Badge> Coin Flip</span><span className="text-muted-foreground">~4,3 % HE</span></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-2"><Badge variant="outline">Medium</Badge> Tal 1 &amp; 2</span><span className="text-muted-foreground">~4,5 % HE</span></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-2"><Badge variant="secondary" className="bg-destructive/10 text-destructive">Høj</Badge> Cash Hunt</span><span className="text-muted-foreground">~4,7 % HE</span></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-2"><Badge variant="secondary" className="bg-destructive/10 text-destructive">Højest</Badge> Pachinko &amp; Crazy Time</span><span className="text-muted-foreground">~5,6-5,7 % HE</span></div>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ironisk nok er de væddemål med lavest house edge (tal 5 og 10) også de mindst spændende fra et underholdningsperspektiv. De fleste spillere graviterer mod bonusvæddemålene, fordi de tilbyder unik gameplay og store multiplikatorer – men betaler en matematisk præmie for denne underholdning. Det optimale kompromis for spillere, der ønsker både entertainment og rimelig matematik, er en blanding: primært tal-væddemål (5 og 10) med en mindre allokering til bonusspil for variation.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En udbredt fallacy er at sprede sin indsats over alle 8 væddemål for at "dække alt." Denne strategi har en <em>højere</em> samlet house edge end at fokusere på de matematisk bedste væddemål, fordi de dyreste væddemål (Pachinko, Crazy Time) trækker den samlede cost op. Derudover eliminerer spredningen enhver upside: du vinder altid noget, men aldrig nok til at kompensere for de tabende væddemål. Over tid blødder du langsomt ud mod den gennemsnitlige house edge.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Matematik slår altid intuition i det lange løb. Men for spillere, der primært søger underholdning (og accepterer den ekstra omkostning), er der intet matematisk galt med at satse på bonusspil – så længe du forstår prisen og har budgetteret derefter. Crazy Time er ikke designet til at give spilleren en edge; det er designet til at give en uforglemmelig oplevelse – og den oplevelse har en præcis pris.
          </p>
        </section>

        {/* ── H2 8: Sammenligning med andre game shows ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Gauge className="h-5 w-5 text-primary" />Crazy Time vs. andre live game shows – komplet sammenligning</h2>

          <Card className="mb-6 border-border">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Game Show</TableHead>
                    <TableHead className="text-center">Gns. RTP</TableHead>
                    <TableHead className="text-center">Max Gevinst</TableHead>
                    <TableHead className="text-center">Volatilitet</TableHead>
                    <TableHead className="text-center">Bonusspil</TableHead>
                    <TableHead className="text-center">Lancering</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-primary/5"><TableCell className="font-semibold">Crazy Time</TableCell><TableCell className="text-center">95,5 %</TableCell><TableCell className="text-center">25.000x</TableCell><TableCell className="text-center">Ultra-høj</TableCell><TableCell className="text-center">4</TableCell><TableCell className="text-center">2020</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/live-casino/monopoly-live" className={linkClass}>Monopoly Live</Link></TableCell><TableCell className="text-center">96,2 %</TableCell><TableCell className="text-center">~10.000x</TableCell><TableCell className="text-center">Høj</TableCell><TableCell className="text-center">1</TableCell><TableCell className="text-center">2019</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/live-casino/dream-catcher" className={linkClass}>Dream Catcher</Link></TableCell><TableCell className="text-center">96,6 %</TableCell><TableCell className="text-center">~500x</TableCell><TableCell className="text-center">Medium</TableCell><TableCell className="text-center">0</TableCell><TableCell className="text-center">2017</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/live-casino/deal-or-no-deal" className={linkClass}>Deal or No Deal</Link></TableCell><TableCell className="text-center">95,4 %</TableCell><TableCell className="text-center">500x</TableCell><TableCell className="text-center">Medium-høj</TableCell><TableCell className="text-center">1</TableCell><TableCell className="text-center">2019</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/live-casino/lightning-roulette" className={linkClass}>Lightning Roulette</Link></TableCell><TableCell className="text-center">97,2 %</TableCell><TableCell className="text-center">500x</TableCell><TableCell className="text-center">Høj</TableCell><TableCell className="text-center">0</TableCell><TableCell className="text-center">2018</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sammenligningen afslører et klart trade-off: jo mere underholdende og komplekst game showet er, jo lavere er RTP og jo højere er house edge. Dream Catcher (simpelt money wheel) har den højeste RTP men laveste gevinstpotentiale. Crazy Time (4 bonusspil + Top Slot) har den laveste RTP men det højeste gevinstpotentiale og den mest varierede gameplay. Spilleren betaler en stigende "underholdningspræmie" for hvert lag af kompleksitet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Lightning Roulette skiller sig ud som det matematisk bedste game show med 97,2 % RTP – tæt på europæisk roulettes 97,3 %. Det bevarer bordspillets lave house edge men tilføjer lightning-multiplikatorer (op til 500x) for ekstra spænding. For spillere, der ønsker game show-atmosfæren med minimal matematisk penalty, er Lightning Roulette det objektivt bedste valg. For spillere, der prioriterer bonusspil og AR-underholdning, er Crazy Time uovertruffen – men til en højere pris.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <Link to="/live-casino/deal-or-no-deal" className={linkClass}>Deal or No Deal</Link> tilbyder en unik beslutningskomponent (bankierens tilbud), der giver spilleren en illusion af kontrol. Monopoly Live kombinerer money wheel med et virtuelt Monopoly-board game. Hvert game show har en specifik niche – og valget bør baseres på, hvad du værdsætter mest: underholdning (Crazy Time), simplicitet (Dream Catcher), strategisk spænding (Deal or No Deal), eller matematisk effektivitet (Lightning Roulette).
          </p>
        </section>

        {/* ── H2 9: Psykologien bag Crazy Time ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Brain className="h-5 w-5 text-primary" />Psykologien bag Crazy Time – hvorfor det er så vanedannende</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Crazy Times succes er ikke en tilfældighed – det er resultatet af sofistikeret spildesign, der udnytter flere psykologiske mekanismer til at maksimere engagement og spilletid. At forstå disse mekanismer er vigtigt for at kunne træffe informerede beslutninger om dit spil.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Variabel belønning (Variable Ratio Reinforcement):</strong> Crazy Time leverer belønninger med uforudsigelig timing og størrelse – den mest vanedannende belønningsstruktur ifølge adfærdspsykologi. Du ved aldrig, hvornår den næste bonus rammer, eller hvor meget den giver. Denne usikkerhed holder dopaminsystemet aktivt og opmærksomt, præcis som med sociale medier-notifikationer eller spilleautomaters rulle-mekanik.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Near-miss effekten:</strong> Hjulets langsomme rotation forbi bonussegmenter skaber en konstant strøm af "næsten-gevinster." Når hjulet stopper ét segment fra din bonus, føles det som et tab – men det er matematisk irrelevant. Næste spin er helt uafhængigt. Alligevel forstærker near-misses motivationen til at fortsætte spilleriet – en effekt, der er veldokumenteret i gambling-forskning.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Social proof:</strong> Crazy Times chat-funktion og samtidige spillerantal skaber en følelse af fællesskab. Når andre spillere vinder store beløb, forstærkes din tro på, at "det kunne være mig næste gang." Men andres gevinster ændrer ikke dine sandsynligheder – hvert spin er uafhængigt. Social proof er dog en stærk psykologisk motivator, der holder spillere engagerede.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Sunk cost fallacy:</strong> Spillere, der har investeret tid i at vente på en bonusrunde, er tilbøjelige til at fortsætte – selvom de har overskredet deres budget. "Jeg har ventet 30 spins på Crazy Time-bonussen, jeg kan ikke stoppe nu" er en klassisk sunk cost-fejl. Din ventetid ændrer ikke sandsynligheden for det næste spin. At stoppe efter 30 tabende spins er matematisk identisk med at stoppe efter 1 – den forventede værdi af næste spin er den samme uanset hvad.
          </p>
        </section>

        {/* ── H2 10: Bankroll management ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Scale className="h-5 w-5 text-primary" />Bankroll Management til Crazy Time – kvantitativ tilgang</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Givet Crazy Times ultra-høje volatilitet er bankroll management afgørende for at undgå tidlig bust og sikre en fornuftig spilletid. Vi præsenterer her en kvantitativ model baseret på Kelly-kriteriet tilpasset negative-EV spil:
          </p>

          <Card className="mb-6 border-border">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bankroll</TableHead>
                    <TableHead className="text-center">Anbefalet indsats/spin</TableHead>
                    <TableHead className="text-center">Forventet spilletid</TableHead>
                    <TableHead className="text-center">Risk of Ruin (95 %)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-medium">500 kr.</TableCell><TableCell className="text-center">5-10 kr.</TableCell><TableCell className="text-center">1,5-3 timer</TableCell><TableCell className="text-center">50-75 spins</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">1.000 kr.</TableCell><TableCell className="text-center">10-20 kr.</TableCell><TableCell className="text-center">2-4 timer</TableCell><TableCell className="text-center">80-120 spins</TableCell></TableRow>
                  <TableRow className="bg-primary/5"><TableCell className="font-medium">2.500 kr.</TableCell><TableCell className="text-center">25-50 kr.</TableCell><TableCell className="text-center">3-5 timer</TableCell><TableCell className="text-center">100-150 spins</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">5.000 kr.</TableCell><TableCell className="text-center">50-100 kr.</TableCell><TableCell className="text-center">4-6 timer</TableCell><TableCell className="text-center">120-200 spins</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hovedreglen er at holde din indsats pr. spin til 1-2 % af din samlede bankroll. Ved 50 kr. indsats bør din bankroll være minimum 2.500-5.000 kr. Dette giver tilstrækkelig buffer til at absorbere de uundgåelige tabsrækker og stadig have spins nok til at ramme en bonusrunde (gennemsnitligt hvert 6. spin, men med stor varians).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Risk of Ruin beregningen viser, hvor mange spins du kan forvente, før din bankroll er udtømt med 95 % sandsynlighed. Ved 50 kr. indsats og 2.500 kr. bankroll har du ca. 100-150 spins – nok til 1,5-2,5 timers spil. I denne periode rammer du statistisk 15-25 bonusrunder, hvoraf 1-2 kan give 50x+ gevinster, der midlertidigt restorer din bankroll.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det vigtigste princip: sæt et fast tab-limit FØR du starter sessionen, og overhold det uden undtagelser. De fleste spillere, der rapporterer store tab på Crazy Time, har overtrådt deres egen grænse "fordi næste bonus sikkert kompenserer." Det gør den næsten aldrig. Brug operatørens <Link to="/ansvarligt-spil/spillegraenser" className={linkClass}>spillegrænseværktøjer</Link> til at håndhæve dit limit mekanisk.
          </p>
        </section>

        {/* ── H2 11: Bedste casinoer ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />Bedste danske casinoer til Crazy Time</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Crazy Time er tilgængeligt hos alle danske casinoer, der samarbejder med Evolution Gaming. Da spillet er identisk uanset casino (samme studie, samme hjul, samme odds), er valget af casino primært baseret på bonus, <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> og udbetalingshastighed. Vi anbefaler kun casinoer med <Link to="/casino-licenser" className={linkClass}>dansk licens</Link> fra Spillemyndigheden.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bemærk: De fleste <Link to="/casino-bonus" className={linkClass}>casinobonusser</Link> bidrager kun 10 % fra live casino til omsætningskrav. En 1.000 kr. bonus med 10x wagering kræver 100.000 kr. omsætning på live spil vs. 10.000 kr. på spillemaskiner. Spil derfor Crazy Time med egne midler, ikke bonuspenge – det er matematisk umuligt at gennemspille en bonus profitabelt via live game shows.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For optimal værdi anbefaler vi at vælge et casino med hurtige udbetalinger (under 24 timer), lave eller ingen <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>, og gode ansvarlighed-værktøjer (tab-limits, session-reminders). Besøg vores <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link> for de seneste tilbud, eller <Link to="/casino-anmeldelser" className={linkClass}>læs anmeldelser</Link> af etablerede operatører.
          </p>
          <InlineCasinoCards title="Spil Crazy Time her" count={3} />
        </section>

        <Separator className="my-10" />

        {/* ── H2 12: Ansvarligt spil ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-primary" />Ansvarligt spil med Crazy Time – en nødvendig advarsel</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Crazy Times kombination af ultra-høj volatilitet, konstante bonusspil, energiske værter og social interaktion gør det til et af de mest vanedannende casino-spil. De psykologiske virkemidler (AR-effekter, near-miss-oplevelser, variable belønninger) er bevidst designet til at forlænge spilletiden og øge indsatserne. Det er afgørende at sætte og overholde faste grænser.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi anbefaler følgende regler for ansvarligt Crazy Time-spil: 1) Sæt et fast tabslimit pr. session (anbefalet: max 1-2 % af din månedlige disponible indkomst), 2) Sæt en tidsbegrænsning (maks. 2-3 timer pr. session), 3) Forlad spillet efter en stor gevinst – tendensen til at "spille videre for at vinde mere" er den mest almindelige årsag til nettotab, 4) Brug aldrig penge, du ikke har råd til at tabe, 5) Tag regelmæssige pauser.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Husk: Crazy Time koster gennemsnitligt 135 kr./time ved 50 kr. indsats. Betragt det som en underholdningsomkostning – sammenlignelig med en biograf­billet eller en middag ude. Hvis beløbet føles "for dyrt" som underholdning, er indsatsen for høj til din økonomi.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hvis du oplever problemer med at kontrollere dit spil, kan du kontakte <Link to="/ansvarligt-spil/stopspillet" className={linkClass}>StopSpillet</Link> (70 22 28 25) døgnet rundt, eller <Link to="/ansvarligt-spil/rofus" className={linkClass}>registrere dig i ROFUS</Link> for midlertidig eller permanent selvudelukkelse fra alle danske online casinoer. Hjælpen er gratis og fortrolig.
          </p>
        </section>

        <LiveCasinoMoneyLinks gameName="Crazy Time" currentPath="/live-casino/crazy-time" />
        <LatestNewsByCategory pagePath="/live-casino/crazy-time" />
        <FAQSection title="Ofte Stillede Spørgsmål om Crazy Time" faqs={faqs} />
        <RelatedGuides currentPath="/live-casino/crazy-time" />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="spilleautomaten" />
    </>
  );
};

export default CrazyTimeGuide;
