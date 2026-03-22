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
  TrendingUp, Shield, Zap, Brain, Calculator, Activity,
  Dices, Timer, Gauge, Crown, Scale, Flame, Layers, Users,
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import dreamCatcherHero from "@/assets/heroes/dream-catcher-hero.jpg";
import GuideHeroImage from "@/components/GuideHeroImage";

const linkClass = "text-primary underline underline-offset-4 hover:text-primary/80 transition-colors font-medium";

const faqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er RTP i Dream Catcher?",
    answer: "Dream Catchers RTP varierer pr. segment: Tal 1 har 96,6 % RTP, Tal 2 har 96,0 %, Tal 5 har 95,8 %, Tal 10 har 95,7 %, Tal 20 har 92,1 % og Tal 40 har kun 90,6 %. Jo højere tal du satser på, jo lavere er RTP og jo højere er house edge. Den bedste matematiske strategi er at satse på lave tal.",
  },
  {
    question: "Hvordan fungerer 2x og 7x multiplikatorerne?",
    answer: "Hjulet har to specielle segmenter: 2x og 7x. Når hjulet stopper på en multiplikator, ganges alle aktive væddemål med 2 eller 7, og hjulet spinnes igen. Hvis en ny multiplikator rammes, ganges de igen. Teoretisk er der ingen øvre grænse for konsekutive multiplikatorer, men sandsynligheden er ekstremt lav – 2x har kun 2/54 segmenter (3,7 %) og 7x har 1/54 (1,85 %).",
  },
  {
    question: "Er Dream Catcher bedre end Crazy Time?",
    answer: (
      <>
        Matematisk ja – Dream Catcher har højere RTP (96,6 % vs. 95,5 %) og lavere house edge. Men <Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link> tilbyder markant mere underholdning med 4 bonusspil og højere max gevinst (25.000x). Dream Catcher er det bedre valg for spillere, der prioriterer matematik, mens Crazy Time appellerer til dem, der vil have den mest engagerende oplevelse.
      </>
    ),
  },
  {
    question: "Hvor mange segmenter har Dream Catcher-hjulet?",
    answer: "Dream Catchers hjul har 54 segmenter: 23 × tal 1, 15 × tal 2, 7 × tal 5, 4 × tal 10, 2 × tal 20, 1 × tal 40, plus 2 × multiplikator 2x og 1 × multiplikator 7x. Fordelingen er designet til at producere hyppige små gevinster (tal 1 rammer 42,6 % af spins) med sjældne store gevinster (tal 40 rammer kun 1,85 %).",
  },
  {
    question: "Kan man bruge en strategi i Dream Catcher?",
    answer: "Nej – Dream Catcher er et rent tilfældighedsspil uden nogen strategisk komponent. Hvert spin er uafhængigt, og du har ingen beslutninger, der påvirker sandsynligheder. Den eneste 'strategi' er at vælge væddemål med lavere house edge (tal 1 og 2) og undgå tal 40, der har den dårligste RTP. Systemer som Martingale ændrer ikke den forventede værdi.",
  },
  {
    question: "Er Dream Catcher det første live game show?",
    answer: "Ja – Dream Catcher (lanceret 2017) var Evolution Gamings første live game show og revolutionerede live casino-branchen. Det beviste, at spillere var villige til at acceptere højere house edge i bytte for tv-lignende underholdning. Succesen inspirerede efterfølgere som Monopoly Live (2019), Crazy Time (2020) og Deal or No Deal (2019).",
  },
  {
    question: "Hvad er den maksimale gevinst i Dream Catcher?",
    answer: "Den teoretiske max gevinst afhænger af konsekutive multiplikatorer. En 7x × 7x × 40 = 1.960x er det realistiske maksimum, men endnu højere kæder er teknisk mulige. I praksis er gevinster over 280x (enkelt 7x × 40) ekstremt sjældne – de fleste spins giver 1x-10x.",
  },
  {
    question: "Hvor hurtigt går Dream Catcher-spins?",
    answer: "Hvert Dream Catcher-spin tager ca. 45-60 sekunder fra væddemålsperioden starter til resultatet afsløres. Det giver ca. 60-70 spins pr. time – langsommere end online spillemaskiner (500+ spins/time) men hurtigere end de fleste bordspil. Det langsomme tempo er bevidst: det giver tid til at nyde underholdningen og reducerer den samlede time-action.",
  },
  {
    question: "Er Dream Catcher tilgængelig i Danmark?",
    answer: (
      <>
        Ja – Dream Catcher er tilgængeligt hos alle danske <Link to="/casino-anmeldelser" className={linkClass}>casinoer med dansk licens</Link>, der samarbejder med <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>. Spillet er identisk uanset casino – vælg baseret på <Link to="/casino-bonus" className={linkClass}>bonus</Link> og udbetalingshastighed.
      </>
    ),
  },
];

const DreamCatcherGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Dream Catcher – Komplet Matematisk Guide til Money Wheel",
    description: "Dream Catcher: RTP op til 96,6 %, segmentfordeling, multiplikator-matematik, EV-analyse og volatilitetsprofil. Det originale live game show.",
    url: `${SITE_URL}/live-casino/dream-catcher`,
    datePublished: "2026-03-08",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Sådan spiller du Dream Catcher",
    step: [
      { "@type": "HowToStep", position: 1, name: "Placer væddemål", text: "Vælg et eller flere talsegmenter (1, 2, 5, 10, 20, 40) at satse på. Hvert tal har forskellig sandsynlighed og udbetaling." },
      { "@type": "HowToStep", position: 2, name: "Hjulet spinner", text: "Værten spinner det fysiske money wheel med 54 segmenter. Hjulet stopper tilfældigt." },
      { "@type": "HowToStep", position: 3, name: "Resultat", text: "Hvis hjulet stopper på dit tal, vinder du udbetalingen (f.eks. 10:1 for tal 10). Multiplikator-segmenter (2x, 7x) ganger alle aktive væddemål og giver et nyt spin." },
    ],
  };

  return (
    <>
      <SEO
        title="Dream Catcher – RTP, Segmenter & Komplet Guide (2026)"
        description="Dream Catcher live game show: RTP op til 96,6 %, segmentfordeling og multiplikator-matematik. Det originale money wheel analyseret og testet."
        jsonLd={[articleSchema, faqJsonLd, howToJsonLd]}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Calculator className="mr-1.5 h-3.5 w-3.5" /> Matematisk Analyse</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Dream Catcher – Det Originale Money Wheel</h1>
            <p className="text-lg text-white/80">
              Evolutions første live game show med 54 segmenter, multiplikator-mekanik og RTP op til 96,6 %. Den komplette matematiske analyse.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="28 min" />
        <GuideHeroImage src={dreamCatcherHero} alt="Dream Catcher money wheel i live casino studie" />

        {/* ── H2 1 ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Crown className="h-5 w-5 text-primary" />Hvad er Dream Catcher – pioneren bag live game shows</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dream Catcher blev lanceret af <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> i 2017 og var det allerførste live casino game show – en helt ny spillekategori, der kombinerede traditionel gambling med tv-underholdning. Konceptet er bevidst simpelt: et stort, vertikalt pengehjul med 54 segmenter drejes af en live vært, og spillerne satser på hvilket tal hjulet stopper på. Simpelheden er intentionel – Dream Catcher var designet til at tiltrække spillere, der normalt undgik bordspil og fandt dem intimiderende.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spillet revolutionerede live casino-branchen ved at bevise, at der var et massivt marked for "gambling som underholdning." Spillere var villige til at acceptere en højere <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> i bytte for en tv-lignende oplevelse med energiske værter, musik, farverige lyseffekter og social interaktion via chat. Denne fundamentale indsigt – at underholdningsværdi kan kompensere for dårligere odds – førte direkte til udviklingen af <Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link>, <Link to="/live-casino/monopoly-live" className={linkClass}>Monopoly Live</Link>, <Link to="/live-casino/deal-or-no-deal" className={linkClass}>Deal or No Deal</Link> og resten af Evolutions game show-portefølje.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Trods sin enkelhed forbliver Dream Catcher populær takket være den lave adgangsbarriere (indsatser fra 1 kr.), korte spilvarighed (~45 sekunder pr. spin) og umiddelbare resultater. Reglerne forstås på 10 sekunder – i modsætning til <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> eller <Link to="/casinospil/poker" className={linkClass}>poker</Link>, der kræver strategisk viden. For begyndere i <Link to="/live-casino" className={linkClass}>live casino</Link> er Dream Catcher det naturlige startpunkt og den bedste introduktion til game show-genren.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For danske spillere er Dream Catcher tilgængeligt hos alle større <Link to="/casino-anmeldelser" className={linkClass}>casinoer med dansk licens</Link>, der samarbejder med Evolution Gaming. Spillet er identisk uanset casino – samme studie i Riga (Letland), samme hjul, samme odds. Valget af casino bør baseres på <Link to="/casino-bonus" className={linkClass}>bonus</Link>, <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> og udbetalingshastighed – ikke på gameplay-forskelle, der ikke eksisterer.
          </p>
        </section>

        {/* ── H2 2: Segmentfordeling ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" />Hjulets segmentfordeling – komplet matematisk breakdown</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dream Catchers hjul har 54 segmenter med en nøje kalibreret fordeling, der producerer en bestemt <Link to="/ordbog/rtp" className={linkClass}>RTP</Link> og gevinstprofil. Hvert segment har præcis samme bredde, hvilket sikrer, at sandsynligheden for hvert udfald er direkte proportional med antallet af segmenter af den type. Denne transparens er en af Dream Catchers styrker sammenlignet med mere komplekse game shows:
          </p>

          <Card className="mb-6 border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /> Dream Catcher – komplet segmentfordeling</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segment</TableHead>
                    <TableHead className="text-center">Antal</TableHead>
                    <TableHead className="text-center">Sandsynlighed</TableHead>
                    <TableHead className="text-center">Udbetaling</TableHead>
                    <TableHead className="text-center">RTP</TableHead>
                    <TableHead className="text-center">House Edge</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-primary/5"><TableCell className="font-medium">1</TableCell><TableCell className="text-center">23</TableCell><TableCell className="text-center">42,59 %</TableCell><TableCell className="text-center">1:1</TableCell><TableCell className="text-center">96,58 %</TableCell><TableCell className="text-center">3,42 %</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">2</TableCell><TableCell className="text-center">15</TableCell><TableCell className="text-center">27,78 %</TableCell><TableCell className="text-center">2:1</TableCell><TableCell className="text-center">96,00 %</TableCell><TableCell className="text-center">4,00 %</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">5</TableCell><TableCell className="text-center">7</TableCell><TableCell className="text-center">12,96 %</TableCell><TableCell className="text-center">5:1</TableCell><TableCell className="text-center">95,83 %</TableCell><TableCell className="text-center">4,17 %</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">10</TableCell><TableCell className="text-center">4</TableCell><TableCell className="text-center">7,41 %</TableCell><TableCell className="text-center">10:1</TableCell><TableCell className="text-center">95,71 %</TableCell><TableCell className="text-center">4,29 %</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">20</TableCell><TableCell className="text-center">2</TableCell><TableCell className="text-center">3,70 %</TableCell><TableCell className="text-center">20:1</TableCell><TableCell className="text-center">92,06 %</TableCell><TableCell className="text-center">7,94 %</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">40</TableCell><TableCell className="text-center">1</TableCell><TableCell className="text-center">1,85 %</TableCell><TableCell className="text-center">40:1</TableCell><TableCell className="text-center">90,57 %</TableCell><TableCell className="text-center">9,43 %</TableCell></TableRow>
                  <TableRow className="text-primary"><TableCell className="font-medium">2x Multiplier</TableCell><TableCell className="text-center">2</TableCell><TableCell className="text-center">3,70 %</TableCell><TableCell colSpan={3} className="text-center text-muted-foreground text-xs">Fordobler alle væddemål og re-spinner</TableCell></TableRow>
                  <TableRow className="text-primary"><TableCell className="font-medium">7x Multiplier</TableCell><TableCell className="text-center">1</TableCell><TableCell className="text-center">1,85 %</TableCell><TableCell colSpan={3} className="text-center text-muted-foreground text-xs">7-dobler alle væddemål og re-spinner</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det vigtigste at bemærke er det kraftige fald i RTP fra tal 1 (96,58 %) til tal 40 (90,57 %). Forskellen på 6 procentpoint i house edge er enorm over tid. For at illustrere: ved 1.000 spins à 50 kr. (50.000 kr. total action) koster tal-1-væddemål gennemsnitligt 1.710 kr. i tab (3,42 %), mens tal-40-væddemål koster 4.715 kr. (9,43 %). Det er næsten <strong>3× dyrere</strong> at jagte de store tal – en forskel, der kun bliver mere markant med øget spilletid.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne progressive forøgelse af house edge med stigende udbetaling er et bevidst designprincip: de "spændende" høj-udbetaling væddemål er matematisk de dårligste, mens de "kedelige" lav-udbetaling væddemål er de bedste. Evolution Gaming ved, at de fleste spillere tiltrækkes af store potentielle gevinster og vil satse på 20 og 40 – og har prissat denne adfærd ind via den højere house edge.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Multiplikator-segmenterne (2x og 7x) ændrer ikke den grundlæggende RTP – de omfordeler variansen. Multiplikatorerne skaber muligheden for sjældne store gevinster (f.eks. 7x × 40 = 280x), men over tusindvis af spins er den samlede forventede værdi uændret. De er indregnet i de publicerede RTP-tal. Deres primære funktion er psykologisk: de holder spillerne engagerede med løftet om en ekstra stor gevinst.
          </p>
        </section>

        {/* ── H2 3: Expected Value ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" />Expected Value – hvad koster Dream Catcher per time</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med en house edge, der spænder fra 3,42 % (bedste væddemål) til 9,43 % (dårligste væddemål), varierer den reelle timeomkostning dramatisk afhængig af dit væddemålsmønster. Her er en komplet EV-analyse:
          </p>

          <Card className="mb-6 border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2"><DollarSign className="h-5 w-5 text-primary" /> EV-scenarier: 50 kr. indsats, 70 spins/time</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Væddemålstype</TableHead>
                    <TableHead className="text-center">House Edge</TableHead>
                    <TableHead className="text-center">EV (tab)/time</TableHead>
                    <TableHead className="text-center">EV (tab)/4 timer</TableHead>
                    <TableHead className="text-center">Sammenligning m. blackjack</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-primary/5"><TableCell className="font-medium">Tal 1 (bedst)</TableCell><TableCell className="text-center">3,42 %</TableCell><TableCell className="text-center text-destructive">-120 kr.</TableCell><TableCell className="text-center text-destructive">-479 kr.</TableCell><TableCell className="text-center">6,8× dyrere</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Tal 2</TableCell><TableCell className="text-center">4,00 %</TableCell><TableCell className="text-center text-destructive">-140 kr.</TableCell><TableCell className="text-center text-destructive">-560 kr.</TableCell><TableCell className="text-center">8,0× dyrere</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Tal 5</TableCell><TableCell className="text-center">4,17 %</TableCell><TableCell className="text-center text-destructive">-146 kr.</TableCell><TableCell className="text-center text-destructive">-584 kr.</TableCell><TableCell className="text-center">8,3× dyrere</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Tal 10</TableCell><TableCell className="text-center">4,29 %</TableCell><TableCell className="text-center text-destructive">-150 kr.</TableCell><TableCell className="text-center text-destructive">-600 kr.</TableCell><TableCell className="text-center">8,6× dyrere</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Tal 20</TableCell><TableCell className="text-center">7,94 %</TableCell><TableCell className="text-center text-destructive">-278 kr.</TableCell><TableCell className="text-center text-destructive">-1.112 kr.</TableCell><TableCell className="text-center">15,9× dyrere</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Tal 40 (værst)</TableCell><TableCell className="text-center">9,43 %</TableCell><TableCell className="text-center text-destructive">-330 kr.</TableCell><TableCell className="text-center text-destructive">-1.320 kr.</TableCell><TableCell className="text-center">18,9× dyrere</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sammenlignet med <Link to="/live-casino/blackjack" className={linkClass}>live blackjack</Link> (~17,5 kr./time med optimal strategi ved 50 kr. indsats) er Dream Catcher 7-19× dyrere afhængig af væddemålsvalg. Sammenlignet med europæisk <Link to="/live-casino/roulette" className={linkClass}>roulette</Link> (~95 kr./time ved samme indsats) er Dream Catcher-tal-1 ca. 25 % dyrere, mens tal-40 er 3,5× dyrere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Men sammenlignet med mange online <Link to="/spillemaskiner" className={linkClass}>spillemaskiner</Link> (500+ spins/time × 3-5 % HE = 750-1.250 kr./time) er Dream Catcher faktisk billigere, fordi tempoet er langsommere (70 spins/time vs. 500+). Denne tempo-effekt er vigtig: selvom Dream Catchers house edge pr. spin er højere end mange slots, er den totale time-action lavere pga. det langsomme tempo – og dermed er det samlede forventede tab pr. time lavere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For danske spillere med et månedligt underholdningsbudget på f.eks. 1.000 kr. svarer Dream Catcher-tal-1 til ca. 8,3 timers spilletid, mens tal-40 kun giver 3 timer. Sammenlignet med blackjack (57 timer) er forskellen dramatisk. Disse tal bør indgå i din beslutning om, hvilket spil der giver mest underholdning pr. krone.
          </p>
        </section>

        {/* ── H2 4: Multiplikator-matematik ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Zap className="h-5 w-5 text-primary" />Multiplikator-matematik – konsekutive hits og max gevinst</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            De to multiplikator-segmenter (2x og 7x) tilføjer Dream Catchers eneste element af ekstraordinær spænding. Når en multiplikator rammes, ganges alle aktive væddemål med 2 (eller 7), og hjulet spinner igen. Hvis endnu en multiplikator rammes, ganges yderligere – og processen gentages. Denne kæde-mekanik er det, der skaber Dream Catchers højeste gevinster og mest dramatiske øjeblikke.
          </p>

          <Card className="mb-6 border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Multiplikator-kæde sandsynligheder</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kæde</TableHead>
                    <TableHead className="text-center">Samlet multiplikator</TableHead>
                    <TableHead className="text-center">Sandsynlighed</TableHead>
                    <TableHead className="text-center">Frekvens</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-medium">Enkelt 2x + tal</TableCell><TableCell className="text-center">2×</TableCell><TableCell className="text-center">3,50 %</TableCell><TableCell className="text-center">Ca. hvert 29. spin</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Enkelt 7x + tal</TableCell><TableCell className="text-center">7×</TableCell><TableCell className="text-center">1,75 %</TableCell><TableCell className="text-center">Ca. hvert 57. spin</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">2x + 2x + tal</TableCell><TableCell className="text-center">4×</TableCell><TableCell className="text-center">0,13 %</TableCell><TableCell className="text-center">Ca. hvert 770. spin</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">2x + 7x + tal</TableCell><TableCell className="text-center">14×</TableCell><TableCell className="text-center">0,065 %</TableCell><TableCell className="text-center">Ca. hvert 1.540. spin</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">7x + 7x + tal</TableCell><TableCell className="text-center">49×</TableCell><TableCell className="text-center">0,032 %</TableCell><TableCell className="text-center">Ca. hvert 3.100. spin</TableCell></TableRow>
                  <TableRow className="bg-primary/5"><TableCell className="font-medium">7x + 7x + tal 40</TableCell><TableCell className="text-center">1.960×</TableCell><TableCell className="text-center">0,00063 %</TableCell><TableCell className="text-center">Ca. hvert 158.000. spin</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tabellen afslører den eksponentielle sjældenhed af høje gevinster. En enkelt 7x-multiplikator rammer ca. hvert 57. spin – realistisk at opleve i enhver session. Men en 7x + 7x + tal 40-kæde (1.960x gevinst) forekommer statistisk hvert 158.000. spin – ca. én gang pr. 2.257 timers spil. Ved 70 spins/time er det over 3 års uafbrudt spil for at opleve dette én gang i gennemsnit.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den teoretiske max gevinst (endelos kæde af 7x-multiplikatorer) er teknisk ubegrænset, men sandsynligheden for tre konsekutive multiplikatorer er allerede 0,032 %, og fire konsekutive er under 0,001 %. I praksis er 280x (7x × 40) det realistiske "drømmescenarie", der forekommer ca. hvert 3.100. spin – omtrent en gang pr. 44 timers spil.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Psykologisk er multiplikator-mekanismen genial: den skaber konstant forventning ("dette kunne være en 7x!") uden at ændre den langsigtede RTP. Hver gang hjulet nærmer sig et multiplikator-segment, stiger spillerens engagement – selv om den forventede værdi af næste spin er uændret. Det er denne perceptuelle effekt, ikke den matematiske, der gør Dream Catcher engagerende.
          </p>
        </section>

        {/* ── H2 5: Volatilitetsanalyse ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Activity className="h-5 w-5 text-primary" />Volatilitetsanalyse – standardafvigelse og bankroll-krav</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dream Catcher har en medium <Link to="/ordbog/volatilitet" className={linkClass}>volatilitet</Link> – lavere end <Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link> (ultra-høj) men markant højere end <Link to="/live-casino/blackjack" className={linkClass}>blackjack</Link> (lav). Standardafvigelsen afhænger stærkt af dit væddemålsmønster:
          </p>

          <Card className="mb-6 border-border">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Væddemålstype</TableHead>
                    <TableHead className="text-center">Std. afvigelse/spin</TableHead>
                    <TableHead className="text-center">CV</TableHead>
                    <TableHead className="text-center">95 % interval (100 spins, 50 kr.)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-primary/5"><TableCell className="font-medium">Tal 1</TableCell><TableCell className="text-center">~2,5x</TableCell><TableCell className="text-center">~2,6</TableCell><TableCell className="text-center">-3.000 til +2.500 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Tal 10</TableCell><TableCell className="text-center">~10x</TableCell><TableCell className="text-center">~5,5</TableCell><TableCell className="text-center">-4.500 til +8.000 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Tal 40</TableCell><TableCell className="text-center">~25x</TableCell><TableCell className="text-center">~14</TableCell><TableCell className="text-center">-5.000 til +15.000 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Blackjack (ref.)</TableCell><TableCell className="text-center">~1,1x</TableCell><TableCell className="text-center">~1,1</TableCell><TableCell className="text-center">-1.500 til +1.500 kr.</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ved ren tal-1-satning er standardafvigelsen ca. 2,5x pr. spin – du vil opleve relativt stabile resultater med hyppige 1:1 gevinster (42,6 % hit rate). Over 100 spins med 50 kr. indsats (5.000 kr. total action) kan dit resultat realistisk svinge fra -3.000 kr. til +2.500 kr. De fleste sessions ender med et moderat tab tæt på den forventede EV (-171 kr.).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ved ren tal-40-satning eksploderer standardafvigelsen til ca. 25x pr. spin. Du vil tabe de fleste spins (98,15 % af tiden), men lejlighedsvist ramme 40:1 eller endda 280:1 med en 7x-multiplikator. Over 100 spins kan dit resultat svinge fra -5.000 kr. til +15.000 kr. Denne enorme spredning gør tal-40 til et risikobetonet væddemål, der kun egner sig til spillere med stor bankroll og høj risikotolerance.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Coefficient of Variation (CV) viser, hvor mange spins der kræves for at konvergere mod den teoretiske RTP. Ved tal-1 (CV ~2,6) kræves ca. 5.000 spins for at komme inden for 1 % af RTP. Ved tal-40 (CV ~14) kræves ca. 150.000 spins – langt mere end nogen normal spillesession. Det betyder, at kortvarige resultater ved tal-40-satning er nærmest tilfældige og stort set uafhængige af den underliggende RTP.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For bankroll management anbefaler vi minimum 50× indsats som sessionsbankroll ved tal-1-satning (2.500 kr. ved 50 kr./spin) og minimum 100× ved tal-40-satning (5.000 kr.). Spillere med mindre bankrolls bør holde sig til tal 1 og 2, der giver den mest stabile oplevelse og den længste forventede spilletid pr. krone.
          </p>
        </section>

        <InlineCasinoCards />

        {/* ── H2 6: Dream Catcher vs. andre game shows ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Gauge className="h-5 w-5 text-primary" />Dream Catcher vs. andre live game shows – matematisk sammenligning</h2>

          <Card className="mb-6 border-border">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Game Show</TableHead>
                    <TableHead className="text-center">Bedste RTP</TableHead>
                    <TableHead className="text-center">Værste RTP</TableHead>
                    <TableHead className="text-center">Max Gevinst</TableHead>
                    <TableHead className="text-center">Volatilitet</TableHead>
                    <TableHead className="text-center">Kompleksitet</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-primary/5"><TableCell className="font-semibold">Dream Catcher</TableCell><TableCell className="text-center">96,58 %</TableCell><TableCell className="text-center">90,57 %</TableCell><TableCell className="text-center">~1.960x</TableCell><TableCell className="text-center">Medium</TableCell><TableCell className="text-center">Lav</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link></TableCell><TableCell className="text-center">95,80 %</TableCell><TableCell className="text-center">94,30 %</TableCell><TableCell className="text-center">25.000x</TableCell><TableCell className="text-center">Ultra-høj</TableCell><TableCell className="text-center">Høj</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/live-casino/monopoly-live" className={linkClass}>Monopoly Live</Link></TableCell><TableCell className="text-center">96,23 %</TableCell><TableCell className="text-center">91,30 %</TableCell><TableCell className="text-center">~10.000x</TableCell><TableCell className="text-center">Høj</TableCell><TableCell className="text-center">Medium</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/live-casino/deal-or-no-deal" className={linkClass}>Deal or No Deal</Link></TableCell><TableCell className="text-center">95,42 %</TableCell><TableCell className="text-center">95,42 %</TableCell><TableCell className="text-center">500x</TableCell><TableCell className="text-center">Medium-høj</TableCell><TableCell className="text-center">Medium</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/live-casino/lightning-roulette" className={linkClass}>Lightning Roulette</Link></TableCell><TableCell className="text-center">97,30 %</TableCell><TableCell className="text-center">97,30 %</TableCell><TableCell className="text-center">500x</TableCell><TableCell className="text-center">Høj</TableCell><TableCell className="text-center">Lav</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dream Catcher har den bedste "bedste case"-RTP (96,58 % på tal 1) blandt alle game shows undtagen Lightning Roulette. Men den har også det største RTP-spænd (6 procentpoint mellem bedste og dårligste væddemål), hvilket gør væddemålsvalget mere betydningsfuldt end i de fleste andre spil. Spillere, der vælger tal 1, får faktisk et af de bedste game show-væddemål i markedet; spillere, der vælger tal 40, får et af de dårligste.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I forhold til Crazy Time er Dream Catcher det matematisk overlegne valg: højere bedste-RTP, lavere worst-case house edge, og mere forudsigelige resultater pga. lavere volatilitet. Men Crazy Time tilbyder fire unikke bonusspil, augmented reality-effekter, og et max gevinstpotentiale, der er 12,5× højere (25.000x vs. 1.960x). Valget mellem de to afhænger af, om du prioriterer matematisk effektivitet (Dream Catcher) eller underholdningsværdi (Crazy Time).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Lightning Roulette er det objektivt bedste game show for spillere, der ønsker en game show-atmosfære med minimal matematisk penalty – det bevarer bordspillets lave house edge (2,7 %) men tilføjer multiplikatorer op til 500x. For spillere, der primært søger RTP-effektivitet, er Lightning Roulette det klare førstevalg, efterfulgt af Dream Catcher (tal 1) og derefter Monopoly Live.
          </p>
        </section>

        {/* ── H2 7: Psykologisk designanalyse ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Brain className="h-5 w-5 text-primary" />Spildesign og psykologi – hvorfor Dream Catcher virker</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dream Catchers succes skyldes ikke matematikken – den er faktisk dårligere end mange alternativer. Succesen skyldes et sofistikeret psykologisk design, der udnytter flere kognitive biases og adfærdsmønstre til at skabe engagement og forlænge spilletiden.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Near-miss effekten:</strong> Dream Catchers fysiske hjul drejer langsomt forbi segmenterne, og spilleren kan se, når hjulet "næsten" stopper på det valgte tal. Denne near-miss-oplevelse er veldokumenteret i gambling-forskning som en stærk motivator: den aktiverer de samme hjerneområder som en reel gevinst, men uden den faktiske udbetaling. Spilleren oplever frustration ("bare ét segment fra!") og forstærket motivation til at fortsætte. Men matematisk er near-misses irrelevante – hvert spin er uafhængigt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Anchoring bias:</strong> Tal 40-segmentet skaber en psykologisk "anker" for potentielle gevinster. Selv spillere, der primært satser på tal 1, tænker "men hvad hvis det var 40?" – og dette anker trækker dem mod at allokere en del af deres indsats til de dyrere væddemål. Evolution Gaming placerer bevidst det store "40"-segment på en fremtrædende position på hjulet for at forstærke denne effekt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Social facilitation:</strong> Live-værternes energi, musik, og chat-funktionen skaber en social oplevelse, der forlænger spilletiden. Studier viser, at mennesker gambler mere i sociale kontekster end alene – og Dream Catchers live-format udnytter dette ved at skabe en "fælles oplevelse" med andre spillere. Værterne fejrer gevinster og opfordrer til at "prøve igen" efter tab, hvilket forstærker engagement.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Simplicity bias:</strong> Dream Catchers enkelhed er i sig selv et designvalg. Ved at fjerne strategiske beslutninger elimineres cognitive load – spilleren behøver ikke tænke, kun føle. Denne mentale lethed sænker den psykologiske barriere for at fortsætte spilleriet og gør det nemt at "bare tage ét spin mere." Sammenlignet med blackjack, hvor hver hånd kræver en strategisk beslutning, er Dream Catcher designet til at flyde automatisk.
          </p>
        </section>

        {/* ── H2 8: Hvem bør spille ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Users className="h-5 w-5 text-primary" />Hvem er Dream Catcher for – og hvem bør undgå det</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dream Catcher er ideelt for begyndere i live casino, der søger en simpel, visuel oplevelse med lav adgangsbarriere. Det kræver ingen strategi, reglerne forstås på 10 sekunder, og tempoet er behageligt (~70 spins/time). Det er også godt for sociale spillere, der nyder chat-funktionen og værternes interaktion, samt for spillere, der søger et relativt billigt underholdningsspil (120 kr./time ved tal-1-satning med 50 kr. indsats).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dream Catcher er <strong>ikke</strong> for: 1) Matematisk orienterede spillere, der ønsker lavest mulig house edge (vælg <Link to="/live-casino/blackjack" className={linkClass}>blackjack</Link> med 0,5 % HE), 2) Spillere der søger strategisk dybde (vælg <Link to="/casinospil/poker" className={linkClass}>poker</Link>), 3) Spillere med begrænset bankroll der vil maksimere spilletid (vælg <Link to="/live-casino/baccarat" className={linkClass}>baccarat</Link> banker-bet med 1,06 % HE), 4) Spillere der ønsker mere underholdning og bonusspil (vælg <Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link>).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den vigtigste beslutning er væddemålstype: tal 1 (3,42 % HE, stabil) vs. tal 40 (9,43 % HE, volatil). Der er intet mellempunkt – vælg enten den stabile, billige oplevelse eller den risikable, dyre jackpot-jagning. Undgå at sprede indsatser over alle tal, da dette giver en blandet house edge uden nogen af fordelene ved fokuseret satning.
          </p>
        </section>

        {/* ── H2 9: Bankroll management ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Scale className="h-5 w-5 text-primary" />Bankroll Management til Dream Catcher</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dream Catchers moderate volatilitet kræver en afbalanceret bankroll-tilgang. Vi anbefaler følgende model baseret på din foretrukne væddemålstype og ønskede spilletid:
          </p>

          <Card className="mb-6 border-border">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ønsket spilletid</TableHead>
                    <TableHead className="text-center">Tal 1-satning: bankroll</TableHead>
                    <TableHead className="text-center">Tal 40-satning: bankroll</TableHead>
                    <TableHead className="text-center">Indsats/spin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-medium">1 time (70 spins)</TableCell><TableCell className="text-center">1.000 kr.</TableCell><TableCell className="text-center">3.000 kr.</TableCell><TableCell className="text-center">10-25 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">2 timer (140 spins)</TableCell><TableCell className="text-center">2.000 kr.</TableCell><TableCell className="text-center">5.000 kr.</TableCell><TableCell className="text-center">10-25 kr.</TableCell></TableRow>
                  <TableRow className="bg-primary/5"><TableCell className="font-medium">4 timer (280 spins)</TableCell><TableCell className="text-center">3.500 kr.</TableCell><TableCell className="text-center">8.000 kr.</TableCell><TableCell className="text-center">10-25 kr.</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hovedreglen er at holde din indsats pr. spin til 1-2 % af din samlede bankroll ved tal-1-satning og under 0,5 % ved tal-40-satning. Den højere bankroll-krav ved tal-40 afspejler den markant højere volatilitet og risikoen for lange tabsrækker (du taber 98,15 % af spins).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Sæt altid et fast tabslimit FØR du starter sessionen, og brug operatørens <Link to="/ansvarligt-spil/spillegraenser" className={linkClass}>spillegrænseværktøjer</Link> til at håndhæve det mekanisk. "Stop-loss" er det vigtigste bankroll management-princip: når du har tabt dit forudbestemte beløb, stopper du – uanset hvad du føler. Den følelse af, at "næste spin sikkert er en gevinst," er en kognitiv illusion, ikke en matematisk realitet.
          </p>
        </section>

        {/* ── H2 10: Bedste casinoer ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />Bedste danske casinoer med Dream Catcher</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dream Catcher er tilgængeligt hos alle danske Evolution Gaming-casinoer med <Link to="/casino-licenser" className={linkClass}>dansk licens</Link> fra Spillemyndigheden. Da spillet er identisk på tværs af operatører, handler valget om <Link to="/casino-bonus" className={linkClass}>bonus</Link>, udbetalingshastighed og brugeroplevelse. Vær opmærksom på, at live casino typisk kun bidrager 10 % til <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> – spil Dream Catcher med egne midler, ikke bonuspenge.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For den bedste oplevelse anbefaler vi casinoer med hurtige udbetalinger (under 24 timer), gode ansvarlighedsværktøjer og stabil streaming-kvalitet. Besøg vores <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link> for aktuelle tilbud eller <Link to="/casino-anmeldelser" className={linkClass}>læs anmeldelser</Link> af etablerede operatører.
          </p>
          <InlineCasinoCards title="Spil Dream Catcher her" count={3} />
        </section>

        <Separator className="my-10" />

        {/* ── H2 11: Ansvarligt spil ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-primary" />Ansvarligt spil med Dream Catcher</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dream Catchers simple format og hurtige spins kan føre til ukontrolleret spil. Den lave beslutningskompleksitet – du behøver ikke tænke, kun satse – gør det nemt at "bare tage ét spin mere" uden at bemærke, hvor mange spins der er gået. Det langsommere tempo (vs. online slots) giver en falsk følelse af kontrol over forbruget.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi anbefaler: 1) Sæt et fast tabslimit pr. session og overhold det, 2) Sæt en tidsbegrænsning (maks. 2 timer), 3) Brug operatørens <Link to="/ansvarligt-spil/spillegraenser" className={linkClass}>spillegrænser</Link> aktivt, 4) Tag pauser mindst hvert 30. minut. Husk: hvert spin har en negativ forventet værdi – over tid taber du altid. Det er kun hastigheden på tabet, der varierer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hvis du oplever problemer med at kontrollere dit spil, kan du kontakte <Link to="/ansvarligt-spil/stopspillet" className={linkClass}>StopSpillet</Link> (70 22 28 25) døgnet rundt, eller <Link to="/ansvarligt-spil/rofus" className={linkClass}>registrere dig i ROFUS</Link> for selvudelukkelse. Hjælpen er gratis og fortrolig.
          </p>
        </section>

        <LiveCasinoMoneyLinks gameName="Dream Catcher" currentPath="/live-casino/dream-catcher" />
        <LatestNewsByCategory pagePath="/live-casino/dream-catcher" />
        <FAQSection title="Ofte Stillede Spørgsmål om Dream Catcher" faqs={faqs} />
        <RelatedGuides currentPath="/live-casino/dream-catcher" />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="spilleautomaten" />
    </>
  );
};

export default DreamCatcherGuide;
