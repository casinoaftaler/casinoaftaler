import React from "react";
import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  Sparkles, Target, BarChart3, AlertTriangle, DollarSign,
  TrendingUp, Shield, Zap, Brain, Calculator, Percent,
  Dices, Activity, Layers, Users, Gauge, Timer,
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import crazyTimeHero from "@/assets/heroes/crazy-time-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80 font-medium";

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
        <Link to="/live-casino/dream-catcher" className={linkClass}>Dream Catcher</Link> er Crazy Times forgænger og markant simplere: ét hjul, ingen bonusspil, kun multiplikatorsegmenter (2x og 7x). Crazy Time har 4 unikke bonusspil (Coin Flip, Cash Hunt, Pachinko, Crazy Time), Top Slot-multiplikatorer og højere max gevinst (25.000x vs. ca. 500.000 kr. i Dream Catcher). Crazy Time har dog også højere house edge og volatilitet.
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
];

const CrazyTimeGuide = () => {
  const { showCasinoCards } = useSiteSettings();
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Crazy Time – Komplet Guide til Evolutions Populære Game Show",
    description: "Dybdegående analyse af Crazy Time: RTP, house edge, bonusrunder, Top Slot-multiplikatorer og matematisk breakdown af alle væddemål.",
    url: `${SITE_URL}/live-casino/crazy-time`,
    datePublished: "2026-03-08",
    dateModified: "2026-03-08",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Crazy Time – RTP, Bonusrunder & Komplet Guide"
        description="Alt om Crazy Time: RTP på 95,5 %, 4 unikke bonusspil, Top Slot-multiplikatorer og matematisk analyse. Den mest populære live game show forklaret."
        jsonLd={[articleSchema, faqJsonLd]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: `linear-gradient(135deg, hsl(280 70% 20% / 0.92), hsl(45 80% 30% / 0.88)), url(${crazyTimeHero})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Live Game Show – Marts 2026</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Crazy Time – Det Ultimative Casino Game Show</h1>
            <p className="text-lg text-white/80">
              Evolutions mest populære live game show med 4 bonusspil, Top Slot-multiplikatorer og max gevinst på 25.000x. Her er den fulde matematiske analyse.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="08-03-2026" readTime="25 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={crazyTimeHero} alt="Crazy Time live casino game show hjul i professionelt studie" width={1920} height={1080} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ── H2 1: Hvad er Crazy Time ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Sparkles className="mr-2 inline h-6 w-6 text-primary" />
            Hvad er Crazy Time – og hvorfor dominerer det live casino
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Crazy Time er et live <Link to="/live-casino/game-shows" className={linkClass}>casino game show</Link> udviklet af <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> og lanceret i juni 2020. Det er baseret på et stort pengehjul med 54 segmenter, suppleret af en Top Slot-multiplikator og fire unikke bonusspil: <strong>Coin Flip</strong>, <strong>Cash Hunt</strong>, <strong>Pachinko</strong> og <strong>Crazy Time</strong>-bonusrunden. Spillet streames live 24/7 fra Evolutions studie med professionelle værter.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Crazy Time revolutionerede live casino ved at kombinere traditionel gambling med tv-underholdning og augmented reality. Hjulet er fysisk og mekanisk drevet, mens bonusspil bruger avanceret AR-teknologi. Denne hybrid skaber en underholdningsoplevelse, der hverken er ren gambling eller rent tv – men en ny kategori i sig selv.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Popularieten er enorm: Crazy Time er konsekvent det mest spillede live casino-spil globalt med tusindvis af samtidige spillere på ethvert tidspunkt. Årsagen er kombinationen af tilgængelighed (indsatser fra 1 kr.), høj underholdningsværdi og potentiale for massive gevinster op til 25.000x indsatsen. Men bag de farverige effekter gemmer sig en præcis matematisk struktur, som denne guide gennemgår i detaljer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For danske spillere er Crazy Time tilgængeligt hos alle større <Link to="/casino-anmeldelser" className={linkClass}>casinoer med dansk licens</Link>, der samarbejder med Evolution Gaming – hvilket inkluderer størstedelen af de licenserede danske operatører.
          </p>
        </section>

        {/* ── H2 2: Hjulets opbygning ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Dices className="mr-2 inline h-6 w-6 text-primary" />
            Hjulets opbygning – 54 segmenter i detaljer
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Crazy Times hjul har 54 segmenter med en præcis fordeling, der bestemmer sandsynligheden for hvert udfald. Fordelingen er ikke tilfældig – den er matematisk designet til at producere en bestemt <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> og <Link to="/ordbog/volatilitet" className={linkClass}>volatilitet</Link>.
          </p>

          <Card className="mb-6 border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /> Segmentfordeling</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segment</TableHead>
                    <TableHead className="text-center">Antal</TableHead>
                    <TableHead className="text-center">Sandsynlighed</TableHead>
                    <TableHead className="text-center">Udbetaling</TableHead>
                    <TableHead className="text-center">House Edge</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-medium">1</TableCell><TableCell className="text-center">21</TableCell><TableCell className="text-center">38,89 %</TableCell><TableCell className="text-center">1:1</TableCell><TableCell className="text-center">~4,5 %</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">2</TableCell><TableCell className="text-center">13</TableCell><TableCell className="text-center">24,07 %</TableCell><TableCell className="text-center">2:1</TableCell><TableCell className="text-center">~4,5 %</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">5</TableCell><TableCell className="text-center">7</TableCell><TableCell className="text-center">12,96 %</TableCell><TableCell className="text-center">5:1</TableCell><TableCell className="text-center">~4,2 %</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">10</TableCell><TableCell className="text-center">4</TableCell><TableCell className="text-center">7,41 %</TableCell><TableCell className="text-center">10:1</TableCell><TableCell className="text-center">~4,3 %</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium text-primary">Coin Flip</TableCell><TableCell className="text-center">4</TableCell><TableCell className="text-center">7,41 %</TableCell><TableCell className="text-center">Variabel</TableCell><TableCell className="text-center">~4,3 %</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium text-primary">Cash Hunt</TableCell><TableCell className="text-center">2</TableCell><TableCell className="text-center">3,70 %</TableCell><TableCell className="text-center">Variabel</TableCell><TableCell className="text-center">~4,7 %</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium text-primary">Pachinko</TableCell><TableCell className="text-center">1</TableCell><TableCell className="text-center">1,85 %</TableCell><TableCell className="text-center">Variabel</TableCell><TableCell className="text-center">~5,7 %</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium text-primary">Crazy Time</TableCell><TableCell className="text-center">2</TableCell><TableCell className="text-center">3,70 %</TableCell><TableCell className="text-center">Variabel</TableCell><TableCell className="text-center">~5,6 %</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bemærk mønsteret: tal-væddemål har lavest house edge (~4,2-4,5 %), mens bonusvæddemål har højest (4,3-5,7 %). Paradoksalt nok er bonusvæddemålene de mest populære, fordi de tilbyder den største underholdningsværdi og de højeste potentielle gevinster. Dette er et klassisk eksempel på, hvordan design overvinder matematik i spillerens beslutningsproces.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Top Slot-multiplikatoren tilføjer et ekstra lag: før hvert spin vælges ét tilfældigt segment og en multiplikator (op til 50x). Hvis hjulet lander på det segment, ganges gevinsten. Dette øger volatiliteten markant uden at ændre den gennemsnitlige house edge – du kan ramme sjældnere men større gevinster.
          </p>
        </section>

        {/* ── H2 3: De fire bonusspil ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Layers className="mr-2 inline h-6 w-6 text-primary" />
            De fire bonusspil – mekanik og matematik
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Crazy Times unikke appeal ligger i de fire bonusspil, der aktiveres når hjulet stopper på et bonussegment. Hvert spil har sin egen mekanik, volatilitet og gevinstprofil.
          </p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card className="border-border">
              <CardHeader className="pb-2"><CardTitle className="text-lg flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> Coin Flip</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2">Den simpleste bonus: en virtuel mønt med to sider, hver med en tilfældig multiplikator. Typisk interval: 2x-100x. En Top Slot-multiplikator kan booste yderligere.</p>
                <p><strong>Volatilitet:</strong> Lav-medium · <strong>Median-gevinst:</strong> ~10x · <strong>Max:</strong> 5.000x</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader className="pb-2"><CardTitle className="text-lg flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Cash Hunt</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2">En skydebane med 108 tilfældige multiplikatorer skjult bag symboler. Du vælger ét symbol og afslører din gevinst. Alle multiplikatorer er forudbestemt af RNG.</p>
                <p><strong>Volatilitet:</strong> Medium · <strong>Median-gevinst:</strong> ~15x · <strong>Max:</strong> 25.000x</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader className="pb-2"><CardTitle className="text-lg flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> Pachinko</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2">En fysisk Pachinko-mur med multiplikatorer i bunden. En puck droppes og bouncer ned gennem pegs. 'DOUBLE' felter fordobler alle multiplikatorer og giver en ny drop.</p>
                <p><strong>Volatilitet:</strong> Høj · <strong>Median-gevinst:</strong> ~8x · <strong>Max:</strong> 25.000x</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader className="pb-2"><CardTitle className="text-lg flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> Crazy Time-bonussen</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2">Det mest eksklusive bonusspil: et enormt virtuelt hjul med multiplikatorer og 'DOUBLE'/'TRIPLE' segmenter, der kan udvide hjulet og genstarte spinnet med højere multiplikatorer.</p>
                <p><strong>Volatilitet:</strong> Ultra-høj · <strong>Median-gevinst:</strong> ~20x · <strong>Max:</strong> 25.000x</p>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er vigtigt at forstå, at medianen og gennemsnittet i bonusrunder er vidt forskellige. Gennemsnittet trækkes op af sjældne ekstreme udfald (1.000x+), mens de fleste spillere oplever resultater tæt på medianen. I Cash Hunt vil 90 % af dine runder give under 50x – men den sjældne 25.000x-gevinst trækker gennemsnittet op til ca. 15x.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Denne skæve fordeling er bevidst: den skaber en konstant forventning om "den store gevinst", der holder spillere engagerede langt ud over, hvad rationel matematik ville anbefale. Det er den psykologiske kerne i Crazy Times design – og grunden til, at det er det mest profitable game show for Evolution Gaming.
          </p>
        </section>

        {/* ── H2 4: Expected Value analyse ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Calculator className="mr-2 inline h-6 w-6 text-primary" />
            Expected Value – hvad koster det at spille Crazy Time
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at forstå den reelle pris for at spille Crazy Time er <Link to="/ordbog/expected-value" className={linkClass}>Expected Value (EV)</Link> det vigtigste mål. Med en gennemsnitlig house edge på ~4,5 % er den forventede omkostning:
          </p>

          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <p className="text-lg font-semibold mb-2">EV-beregning pr. time</p>
              <p className="text-muted-foreground mb-4">Ved 50 kr. indsats × 60 spins/time × 4,5 % house edge:</p>
              <p className="text-2xl font-bold text-primary">EV = -135 kr./time</p>
              <p className="text-sm text-muted-foreground mt-2">Sammenligning: Live blackjack med optimal strategi koster ~15 kr./time (0,5 % HE × 50 kr. × 60 hænder)</p>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det betyder, at Crazy Time koster ca. 9× mere pr. time end optimal blackjack med samme indsatsniveau. Denne "underholdningspræmie" er prisen for de farverige bonusspil, AR-effekter og den sociale oplevelse. Om det er det værd, er et personligt spørgsmål – men det er vigtigt at kende prisen, før du spiller.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For spillere med et budget på 500 kr. er den forventede spilletid ca. 3,7 timer ved 50 kr./spin. Med blackjack ville det samme budget holde til ca. 33 timer. Denne massive forskel i "spilletid pr. krone" er den reelle omkostning ved at vælge Crazy Time over et lavere-house-edge-spil.
          </p>
        </section>

        {/* ── H2 5: Volatilitetsanalyse ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Activity className="mr-2 inline h-6 w-6 text-primary" />
            Volatilitet og standardafvigelse – why it matters
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Crazy Times volatilitet er ekstremt høj sammenlignet med andre live casino-spil. Standardafvigelsen pr. spin estimeres til ca. 40-80× indsatsen (afhængig af væddemålsmix), sammenlignet med ~1,1x for blackjack og ~5,8x for europæisk <Link to="/live-casino/roulette" className={linkClass}>roulette</Link> (straight-up bet).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvad betyder det i praksis? Over 100 spins med 50 kr. indsats kan dit bankroll svinge med ±20.000-40.000 kr. fra det forventede resultat. Det er denne varians, der skaber de dramatiske op- og nedture, spillerne oplever – og som gør Crazy Time så vanedannende. Statistisk set vil ca. 5 % af sessions resultere i en gevinst på 3x+ bankroll, mens ca. 30 % ender med totalt tab.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> er forståelsen af volatilitet afgørende. Høj volatilitet betyder, at kortvarige resultater er ekstremt uforudsigelige – du kan vinde 10.000 kr. på én session og tabe 5.000 kr. de næste tre. Over tid konvergerer resultatet mod den negative EV, men "over tid" kan betyde tusindvis af spins.
          </p>
        </section>

        {/* ── H2 6: Optimale væddemål ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Target className="mr-2 inline h-6 w-6 text-primary" />
            Væddemålsstrategi – hvad giver lavest house edge
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Selvom der ikke findes en strategi, der kan eliminere house edge i Crazy Time, kan du vælge væddemål med lavere matematisk omkostning:
          </p>

          <Card className="mb-6 border-border">
            <CardHeader className="pb-2"><CardTitle className="text-lg">Væddemåls-ranking efter House Edge</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between"><span className="flex items-center gap-2"><Badge variant="secondary" className="bg-green-500/10 text-green-500">Lavest</Badge> Tal 5</span><span className="text-muted-foreground">~4,2 % HE</span></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-2"><Badge variant="secondary" className="bg-green-500/10 text-green-500">Lav</Badge> Tal 10</span><span className="text-muted-foreground">~4,3 % HE</span></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-2"><Badge variant="outline">Medium</Badge> Coin Flip</span><span className="text-muted-foreground">~4,3 % HE</span></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-2"><Badge variant="outline">Medium</Badge> Tal 1 & 2</span><span className="text-muted-foreground">~4,5 % HE</span></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-2"><Badge variant="secondary" className="bg-destructive/10 text-destructive">Høj</Badge> Cash Hunt</span><span className="text-muted-foreground">~4,7 % HE</span></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-2"><Badge variant="secondary" className="bg-destructive/10 text-destructive">Højest</Badge> Pachinko & Crazy Time</span><span className="text-muted-foreground">~5,6-5,7 % HE</span></div>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ironisk nok er de væddemål med lavest house edge (tal 5 og 10) også de mindst spændende. De fleste spillere graviterer mod bonusvæddemålene, fordi de tilbyder unik gameplay og store multiplikatorer – men betaler en højere pris for underholdningen. Det optimale kompromis er en blanding: primært tal-væddemål med en mindre allokering til bonusspil for variation.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            En common fallacy er at sprede sin indsats over alle 8 væddemål for at "dække alt." Denne strategi har en højere samlet house edge end at fokusere på de bedste væddemål og garanterer, at du taber en fast procentdel pr. spin uanset udfaldet. Matematik slår altid intuition i det lange løb.
          </p>
        </section>

        {/* ── H2 7: Crazy Time vs. andre game shows ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Gauge className="mr-2 inline h-6 w-6 text-primary" />
            Crazy Time vs. andre live game shows
          </h2>

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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-primary/5"><TableCell className="font-semibold">Crazy Time</TableCell><TableCell className="text-center">95,5 %</TableCell><TableCell className="text-center">25.000x</TableCell><TableCell className="text-center">Ultra-høj</TableCell><TableCell className="text-center">4</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/live-casino/monopoly-live" className={linkClass}>Monopoly Live</Link></TableCell><TableCell className="text-center">96,2 %</TableCell><TableCell className="text-center">~10.000x</TableCell><TableCell className="text-center">Høj</TableCell><TableCell className="text-center">1</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/live-casino/dream-catcher" className={linkClass}>Dream Catcher</Link></TableCell><TableCell className="text-center">96,6 %</TableCell><TableCell className="text-center">~500x</TableCell><TableCell className="text-center">Medium</TableCell><TableCell className="text-center">0</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/live-casino/deal-or-no-deal" className={linkClass}>Deal or No Deal</Link></TableCell><TableCell className="text-center">95,4 %</TableCell><TableCell className="text-center">500x</TableCell><TableCell className="text-center">Medium-høj</TableCell><TableCell className="text-center">1</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/live-casino/lightning-roulette" className={linkClass}>Lightning Roulette</Link></TableCell><TableCell className="text-center">97,2 %</TableCell><TableCell className="text-center">500x</TableCell><TableCell className="text-center">Høj</TableCell><TableCell className="text-center">0</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed">
            Crazy Time tilbyder den højeste max gevinst og mest variation, men har også den laveste RTP blandt de populære game shows. Dream Catcher og Lightning Roulette er matematisk bedre valg for spillere, der vil minimere tab, mens Crazy Time appellerer til dem, der prioriterer underholdning og ekstremt gevinstpotentiale.
          </p>
        </section>

        {/* ── H2 8: Hvor du spiller ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Shield className="mr-2 inline h-6 w-6 text-primary" />
            Bedste danske casinoer til Crazy Time
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Crazy Time er tilgængeligt hos alle danske casinoer, der samarbejder med Evolution Gaming. Da spillet er identisk uanset casino (samme studie, samme hjul, samme odds), er valget af casino primært baseret på bonus, <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> og udbetalingshastighed.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bemærk: De fleste <Link to="/casino-bonus" className={linkClass}>casinobonusser</Link> bidrager kun 10 % fra live casino til omsætningskrav. En 1.000 kr. bonus med 10x wagering kræver 100.000 kr. omsætning på live spil vs. 10.000 kr. på <Link to="/spillemaskiner" className={linkClass}>spillemaskiner</Link>. Spil Crazy Time med egne midler, ikke bonuspenge.
          </p>
          {showCasinoCards && <InlineCasinoCards maxCards={3} />}
        </section>

        <Separator className="my-10" />

        {/* ── H2 9: Ansvarligt spil ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <AlertTriangle className="mr-2 inline h-6 w-6 text-primary" />
            Ansvarligt spil med Crazy Time
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Crazy Times kombination af ultra-høj volatilitet, konstante bonusspil og social interaktion gør det til et af de mest vanedannende casino-spil. De psykologiske virkemidler (AR-effekter, energiske værter, near-miss-oplevelser) er bevidst designet til at forlænge spilletiden. Det er afgørende at sætte og overholde faste grænser.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sæt et <Link to="/ansvarligt-spil/spillegraenser" className={linkClass}>tab-limit</Link> pr. session, og brug casino-operatørens værktøjer til at håndhæve det. Forlad spillet efter en stor gevinst – tendensen til at "spille videre for at vinde endnu mere" er den mest almindelige årsag til nettotab. Husk: Crazy Time koster gennemsnitligt 135 kr./time ved 50 kr. indsats. Betragt det som en underholdningsomkostning, ikke en investering.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hvis du oplever problemer med at kontrollere dit spil, kan du kontakte <Link to="/ansvarligt-spil/stopspillet" className={linkClass}>StopSpillet</Link> (70 22 28 25) eller <Link to="/ansvarligt-spil/rofus" className={linkClass}>registrere dig i ROFUS</Link> for selvudelukkelse.
          </p>
        </section>

        <StickyCtaBySlug />
        <FAQSection title="Ofte Stillede Spørgsmål om Crazy Time" faqs={faqs} />
        <RelatedGuides currentPath="/live-casino/crazy-time" />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
};

export default CrazyTimeGuide;
