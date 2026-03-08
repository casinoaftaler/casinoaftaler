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
  TrendingUp, Shield, Zap, Brain, Calculator, Activity,
  Dices, Timer, Gauge,
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import dreamCatcherHero from "@/assets/heroes/dream-catcher-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80 font-medium";

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
];

const DreamCatcherGuide = () => {
  const { data: siteSettings } = useSiteSettings();
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Dream Catcher – Komplet Guide til Money Wheel Game Show",
    description: "Alt om Dream Catcher: RTP, segmentfordeling, multiplikator-matematik og house edge analyse. Det originale live casino game show forklaret.",
    url: `${SITE_URL}/live-casino/dream-catcher`,
    datePublished: "2026-03-08",
    dateModified: "2026-03-08",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Dream Catcher – RTP, Segmenter & Komplet Guide"
        description="Alt om Dream Catcher live game show: RTP op til 96,6 %, segmentfordeling, multiplikator-matematik og strategianalyse. Det originale money wheel forklaret på dansk."
        jsonLd={[articleSchema, faqJsonLd]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: `linear-gradient(135deg, hsl(35 70% 25% / 0.92), hsl(25 60% 20% / 0.88)), url(${dreamCatcherHero})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Live Game Show – Marts 2026</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Dream Catcher – Det Originale Money Wheel</h1>
            <p className="text-lg text-white/80">
              Evolutions første live game show med 54 segmenter og multiplikator-mekanik. Her er den komplette matematiske analyse.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="08-03-2026" readTime="20 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={dreamCatcherHero} alt="Dream Catcher money wheel i live casino studie" width={1920} height={1080} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ── H2 1 ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Sparkles className="mr-2 inline h-6 w-6 text-primary" />
            Hvad er Dream Catcher – pioneren bag live game shows
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dream Catcher blev lanceret af <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> i 2017 og var det allerførste live casino game show. Konceptet er simpelt: et stort, vertikalt pengehjul med 54 segmenter drejes af en live vært, og spillerne satser på hvilket tal hjulet stopper på. Simpelheden er intentionel – Dream Catcher var designet til at tiltrække spillere, der normalt undgik bordspil.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spillet revolutionerede live casino-branchen ved at bevise, at der var et massivt marked for "gambling som underholdning" – spillere var villige til at acceptere en højere <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> i bytte for en tv-lignende oplevelse med energiske værter, musik og visuel stimulation. Denne indsigt førte direkte til udviklingen af <Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link>, <Link to="/live-casino/monopoly-live" className={linkClass}>Monopoly Live</Link> og resten af Evolutions game show-portefølje.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Trods sin enkelhed forbliver Dream Catcher populær takket være den lave adgangsbarriere (indsatser fra 1 kr.), korte spilvarighed (~45 sekunder pr. spin) og umiddelbare resultater. For begyndere i <Link to="/live-casino" className={linkClass}>live casino</Link> er det et naturligt startpunkt.
          </p>
        </section>

        {/* ── H2 2: Segmentfordeling ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <BarChart3 className="mr-2 inline h-6 w-6 text-primary" />
            Hjulets segmentfordeling – matematisk breakdown
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dream Catchers hjul har 54 segmenter. Fordelingen er nøje kalibreret til at producere en bestemt <Link to="/ordbog/rtp" className={linkClass}>RTP</Link> og gevinstprofil:
          </p>

          <Card className="mb-6 border-border">
            <CardContent className="pt-6">
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
                  <TableRow className="text-primary"><TableCell className="font-medium">2x Multiplier</TableCell><TableCell className="text-center">2</TableCell><TableCell className="text-center">3,70 %</TableCell><TableCell colSpan={3} className="text-center text-muted-foreground text-xs">Fordobler og re-spinner</TableCell></TableRow>
                  <TableRow className="text-primary"><TableCell className="font-medium">7x Multiplier</TableCell><TableCell className="text-center">1</TableCell><TableCell className="text-center">1,85 %</TableCell><TableCell colSpan={3} className="text-center text-muted-foreground text-xs">7-dobler og re-spinner</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det vigtigste at bemærke er det kraftige fald i RTP fra tal 1 (96,58 %) til tal 40 (90,57 %). Forskellen på 6 procentpoint i house edge er enorm over tid: ved 1.000 spins à 50 kr. koster tal-1-væddemål gennemsnitligt 1.710 kr. i tab, mens tal-40-væddemål koster 4.715 kr. Det er næsten 3× dyrere at jagte de store tal.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Multiplikator-segmenterne (2x og 7x) ændrer ikke den grundlæggende RTP – de omfordeler variansen. De skaber muligheden for sjældne store gevinster (f.eks. 7x × 7x × 40 = 1.960x ved tre konsekutive multiplikatorer efterfulgt af 40), men den samlede forventede værdi forbliver uændret.
          </p>
        </section>

        {/* ── H2 3: Expected Value ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Calculator className="mr-2 inline h-6 w-6 text-primary" />
            Expected Value – hvad koster Dream Catcher per time
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med en gennemsnitlig house edge på ~3,4 % (bedste væddemål) til ~9,4 % (dårligste væddemål) er den reelle timeomkostning:
          </p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <p className="text-sm font-semibold mb-1">Bedste case (tal 1)</p>
                <p className="text-xs text-muted-foreground mb-3">50 kr. × 70 spins/time × 3,42 %</p>
                <p className="text-xl font-bold text-primary">EV = -120 kr./time</p>
              </CardContent>
            </Card>
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-6">
                <p className="text-sm font-semibold mb-1">Værste case (tal 40)</p>
                <p className="text-xs text-muted-foreground mb-3">50 kr. × 70 spins/time × 9,43 %</p>
                <p className="text-xl font-bold text-destructive">EV = -330 kr./time</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Sammenlignet med <Link to="/live-casino/blackjack" className={linkClass}>live blackjack</Link> (~17 kr./time med optimal strategi) er Dream Catcher 7-19× dyrere. Men sammenlignet med mange <Link to="/spillemaskiner" className={linkClass}>spillemaskiner</Link> (500+ spins/time × 3-5 % HE) er Dream Catcher faktisk billigere, fordi tempoet er langsommere (70 spins/time vs. 500+).
          </p>
        </section>

        {/* ── H2 4: Multiplikator-matematik ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Zap className="mr-2 inline h-6 w-6 text-primary" />
            Multiplikator-matematik – hvad sker der ved consecutive hits
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            De to multiplikator-segmenter (2x og 7x) tilføjer Dream Catchers eneste element af ekstraordinær spænding. Når en multiplikator rammes, fordobles (2x) eller syvdobles (7x) alle aktive væddemål, og hjulet spinner igen. Hvis endnu en multiplikator rammes, ganges igen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Sandsynligheder for multiplikator-kæder:</strong>
          </p>
          <div className="space-y-2 mb-6 text-sm text-muted-foreground">
            <p>• Enkelt 2x + tal: 3,70 % × 94,44 % = 3,50 % pr. spin</p>
            <p>• Enkelt 7x + tal: 1,85 % × 94,44 % = 1,75 % pr. spin</p>
            <p>• Dobbelt multiplikator (2x + 2x + tal): 3,70 % × 3,70 % × 94,44 % = 0,13 %</p>
            <p>• 7x + 7x + tal 40: 1,85 % × 1,85 % × 1,85 % = 0,000063 % (1 ud af 1,6 millioner spins)</p>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Den teoretiske max gevinst (7x × 7x × 7x × ... × 40) er astronomisk usandsynlig og vil i praksis aldrig forekomme. Men muligheden for blot en enkelt 7x × 40 = 280x er realistisk nok til at skabe ægte spænding – og det er præcis den psykologiske mekanisme, der gør Dream Catcher engagerende.
          </p>
        </section>

        {/* ── H2 5: Volatilitetsanalyse ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Activity className="mr-2 inline h-6 w-6 text-primary" />
            Volatilitetsanalyse – hvad du realistisk kan forvente
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dream Catcher har en medium <Link to="/ordbog/volatilitet" className={linkClass}>volatilitet</Link> – lavere end <Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link> men højere end <Link to="/live-casino/blackjack" className={linkClass}>blackjack</Link>. Standardafvigelsen afhænger af dit væddemålsmønster:
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ved ren tal-1-satning er standardafvigelsen ca. 2,5x pr. spin – du vil opleve relativt stabile resultater med hyppige 1:1 gevinster. Ved ren tal-40-satning eksploderer standardafvigelsen til ca. 25x pr. spin – du vil tabe de fleste spins men lejlighedsvis ramme 40:1 eller endda 280:1 med en 7x-multiplikator.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Over en session på 100 spins med 50 kr. indsats (5.000 kr. total action) kan dit resultat realistisk svinge fra -3.000 kr. til +5.000 kr. ved tal-1-satning, eller fra -5.000 kr. til +15.000 kr. ved tal-40-satning. Vælg din strategi efter din risikoappetit og bankroll.
          </p>
        </section>

        {/* ── H2 6: Hvem bør spille ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Brain className="mr-2 inline h-6 w-6 text-primary" />
            Hvem er Dream Catcher for – og hvem bør undgå det
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dream Catcher er ideelt for begyndere i <Link to="/live-casino" className={linkClass}>live casino</Link>, der søger en simpel, visuel oplevelse med lav adgangsbarriere. Det kræver ingen strategi, reglerne forstås på 10 sekunder, og tempoet er behageligt. Det er også godt for sociale spillere, der nyder chat-funktionen og værternes interaktion.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dream Catcher er <strong>ikke</strong> for: matematisk orienterede spillere (vælg blackjack), spillere der søger strategisk dybde (vælg poker), eller spillere med begrænset bankroll der vil maksimere spilletid (vælg <Link to="/live-casino/baccarat" className={linkClass}>baccarat</Link> banker-bet). Spillere der søger mere underholdning og bonusspil bør overveje Crazy Time.
          </p>
        </section>

        {/* ── H2 7: Bedste casinoer ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Shield className="mr-2 inline h-6 w-6 text-primary" />
            Bedste danske casinoer med Dream Catcher
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dream Catcher er tilgængeligt hos alle danske Evolution Gaming-casinoer. Da spillet er identisk på tværs af operatører, handler valget om <Link to="/casino-bonus" className={linkClass}>bonus</Link>, udbetalingshastighed og brugeroplevelse. Vær opmærksom på, at live casino typisk kun bidrager 10 % til <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
          </p>
          <InlineCasinoCards title="Spil Dream Catcher her" count={3} />
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <AlertTriangle className="mr-2 inline h-6 w-6 text-primary" />
            Ansvarligt spil med Dream Catcher
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dream Catchers simple format og hurtige spins kan føre til ukontrolleret spil. Sæt altid et budget og tidsbegrænsning. Brug operatørens <Link to="/ansvarligt-spil/spillegraenser" className={linkClass}>spillegrænser</Link> aktivt. Husk: hvert spin har en negativ forventet værdi – over tid taber du altid. Kontakt <Link to="/ansvarligt-spil/stopspillet" className={linkClass}>StopSpillet</Link> hvis du har brug for hjælp.
          </p>
        </section>

        <StickyCtaBySlug slug="betinia" />
        <FAQSection title="Ofte Stillede Spørgsmål om Dream Catcher" faqs={faqs} />
        <RelatedGuides currentPath="/live-casino/dream-catcher" />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
};

export default DreamCatcherGuide;
