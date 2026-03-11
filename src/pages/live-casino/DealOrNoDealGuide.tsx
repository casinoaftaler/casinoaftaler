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
  Dices, Timer, Gauge, Layers, Users, Crown, Scale, Flame,
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import dealOrNoDealHero from "@/assets/heroes/deal-or-no-deal-hero.jpg";
import GuideHeroImage from "@/components/GuideHeroImage";

const linkClass = "text-primary underline underline-offset-4 hover:text-primary/80 transition-colors font-medium";

const faqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er RTP i Deal or No Deal Live?",
    answer: "Deal or No Deal Live har en samlet RTP på ca. 95,42 %. Dog varierer den afhængig af dine valg under spillet: accept af bankierens tilbud tidligt giver typisk lavere gevinst men højere RTP, mens det at spille til ende har højere varians men potentielt lavere RTP pga. den matematiske struktur.",
  },
  {
    question: "Hvordan fungerer kvalifikationsrunden?",
    answer: "Før hovedspillet drejer du et trehjulet pengehjul for at kvalificere dig. Du kan sætte din indsats op til 50× for at forbedre dine odds for at ramme det gyldne segment. Kvalifikationsrunden koster penge – jo mere du satser, jo hurtigere kvalificerer du dig, men jo højere er din samlede omkostning.",
  },
  {
    question: "Er det bedre at tage eller afvise bankierens tilbud?",
    answer: "Matematisk er bankierens tilbud typisk 50-85 % af den forventede værdi af de resterende kufferter. At afvise tilbuddet er statistisk optimalt, hvis du er risikovillig – men hvis du er risikoavers, kan det være rationelt at acceptere. Det er et klassisk gamble: sikker lavere gevinst vs. usikker potentielt højere gevinst.",
  },
  {
    question: "Hvor tit kommer man til hovedspillet?",
    answer: "Med minimumsindsats kvalificerer du dig gennemsnitligt hvert 20-30 spin af hjulet. Ved at øge indsatsen kan du kvalificere dig hurtigere – ved max bet (50×) kvalificerer du dig næsten hvert spin. Men husk: kvalifikationsomkostningen er en del af din samlede investering og påvirker din effektive RTP.",
  },
  {
    question: "Hvad er forskellen på Deal or No Deal og andre game shows?",
    answer: (
      <>
        Deal or No Deal skiller sig ud ved at inkludere en <em>beslutningskomponent</em>: du vælger, om du accepterer bankierens tilbud. Dette giver en illusion af kontrol, som andre <Link to="/live-casino/game-shows" className={linkClass}>game shows</Link> som <Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link> mangler. Dog er beslutningen rent matematisk – der er ingen information, der giver dig en edge. House edge er fastlåst uanset dine valg.
      </>
    ),
  },
  {
    question: "Er Deal or No Deal Live fair?",
    answer: "Ja – spillet er udviklet af Evolution Gaming og certificeret af uafhængige testlaboratorier. Kuffertindholdet bestemmes af en certificeret RNG (Random Number Generator) før spillet starter, og kan ikke ændres undervejs. Bankierens tilbud beregnes algoritmisk baseret på de resterende kufferters indhold.",
  },
  {
    question: "Hvad er den maksimale gevinst i Deal or No Deal?",
    answer: "Den maksimale gevinst er 500x din indsats. Dette opnås ved at åbne alle lave kufferter og beholde den med 500x-multiplikatoren. Med kvalifikationsomkostningen indregnet er den effektive max gevinst ca. 35-40x din totale investering – markant lavere end Crazy Times 25.000x.",
  },
  {
    question: "Kan man spille Deal or No Deal gratis?",
    answer: "Nej – Deal or No Deal Live er et live spil med rigtige dealere og kan ikke spilles i demo-mode. Minimumsindsatsen er typisk 1-2 kr. ved danske casinoer. Du kan dog se andre spille uden at satse for at forstå spilmekanikken.",
  },
  {
    question: "Hvad er prospect theory i Deal or No Deal?",
    answer: "Prospect theory (Kahneman & Tversky, 1979) forklarer, hvorfor spillere reagerer asymmetrisk på gevinster og tab. I Deal or No Deal betyder det, at smerten ved at tabe 100x er psykologisk 2-3× stærkere end glæden ved at vinde 100x. Denne bias gør spillere tilbøjelige til at acceptere bankierens tilbud (garanteret gevinst) selv når EV-beregningen tilsiger det modsatte.",
  },
];

const DealOrNoDealGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Deal or No Deal Live – Komplet Matematisk Analyse",
    description: "Alt om Deal or No Deal Live: RTP, kvalifikationsrunde, bankierens tilbuds-matematik, prospect theory og EV-analyse. Det interaktive live game show analyseret.",
    url: `${SITE_URL}/live-casino/deal-or-no-deal`,
    datePublished: "2026-03-08",
    dateModified: "2026-03-08",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Sådan spiller du Deal or No Deal Live",
    step: [
      { "@type": "HowToStep", position: 1, name: "Kvalificér dig", text: "Spin det trehjulede pengehjul for at ramme det gyldne segment. Øg indsatsen for hurtigere kvalifikation." },
      { "@type": "HowToStep", position: 2, name: "Vælg din kuffert", text: "Vælg én af 16 kufferter med skjulte multiplikatorer fra 1x til 500x." },
      { "@type": "HowToStep", position: 3, name: "Åbn kufferter", text: "Kufferter åbnes i grupper. Efter hver gruppe præsenterer bankieren et tilbud." },
      { "@type": "HowToStep", position: 4, name: "Deal or No Deal", text: "Vælg DEAL (acceptér bankierens tilbud) eller NO DEAL (fortsæt med at åbne kufferter)." },
    ],
  };

  return (
    <>
      <SEO
        title="Deal or No Deal Live – RTP, Strategi & Komplet Guide (2026)"
        description="Alt om Deal or No Deal Live: RTP på 95,4 %, kvalifikationsrunde, bankierens tilbud-matematik, prospect theory og kuffert-strategi. Det interaktive casino game show analyseret."
        jsonLd={[articleSchema, faqJsonLd, howToJsonLd]}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Calculator className="mr-1.5 h-3.5 w-3.5" /> Matematisk Analyse – Marts 2026</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Deal or No Deal Live – Bankierens Matematik</h1>
            <p className="text-lg text-white/80">
              Evolutions interaktive game show med kufferter, bankier-tilbud og spillervalg. Den komplette matematiske analyse af odds, strategi og prospect theory.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="2026-03-08" readTime="28 min" />
        <GuideHeroImage src={dealOrNoDealHero} alt="Deal or No Deal Live casino game show med kufferter og bankier" />

        {/* ── H2 1 ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Crown className="h-5 w-5 text-primary" />Hvad er Deal or No Deal Live – det interaktive game show</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Deal or No Deal Live er et live <Link to="/live-casino/game-shows" className={linkClass}>casino game show</Link> udviklet af <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>, baseret på det ikoniske tv-show, der har været en global underholdningssucces siden 2005. Casino-versionen bevarer kernekonceptet – kufferter med skjulte værdier, en mystisk bankier, og spillerens valg mellem sikkerhed og risiko – men tilføjer en kvalifikationsrunde og tilpasser formatet til online casino-miljøet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det unikke ved Deal or No Deal i game show-landskabet er beslutningskomponenten. I modsætning til <Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link>, <Link to="/live-casino/dream-catcher" className={linkClass}>Dream Catcher</Link> eller <Link to="/live-casino/monopoly-live" className={linkClass}>Monopoly Live</Link>, hvor udfaldet afgøres af ét hjulspin uden spillerens indflydelse, kræver Deal or No Deal aktive valg: accepterer du bankierens tilbud (DEAL) eller fortsætter du (NO DEAL)? Denne beslutning giver en illusion af kontrol og strategisk dybde – men som vi vil analysere, er den matematiske virkelighed mere nuanceret.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spillet foregår i tre faser: kvalifikation via et pengehjul, kuffertvalg og kuffertåbning, og endelig den centrale Deal/No Deal-beslutning. Denne tretrins-struktur er bevidst designet til at forlænge engagementet og skabe et narrativt forløb – fra håbfuld forventning (kvalifikation) over stigende spænding (kuffertåbning) til klimaktisk afgørelse (bankierens tilbud). Det er denne narrative bue, der gør Deal or No Deal til det mest tv-lignende af Evolutions game shows.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For danske spillere er Deal or No Deal Live tilgængeligt hos alle casinoer med <Link to="/casino-licenser" className={linkClass}>dansk licens</Link>, der samarbejder med Evolution Gaming. Indsatser starter fra 1 kr., og max gevinst er 500x indsatsen – markant lavere end Crazy Times 25.000x, men med en mere interaktiv oplevelse og en følelse af personlig kontrol over udfaldet.
          </p>
        </section>

        {/* ── H2 2: Spillets tre faser ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Layers className="h-5 w-5 text-primary" />Spillets tre faser – fra kvalifikation til bankierens tilbud</h2>

          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="border-border">
              <CardHeader className="pb-2"><CardTitle className="text-lg flex items-center gap-2"><span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span> Kvalifikation</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>Et trehjulet pengehjul spinner. Du skal ramme det gyldne segment på alle tre hjul. Du kan øge din indsats (1× til 50× basis) for at udvide det gyldne segments bredde og forbedre odds.</p>
                <p>Gennemsnitligt koster kvalifikation 10-15× din basisindsats ved minimum boost. Ved max boost (50×) kvalificerer du dig næsten hvert spin, men den samlede omkostning pr. runde stiger markant.</p>
                <p><strong>Nøgletal:</strong> Kvalifikationsomkostning udgør typisk 30-50 % af din totale investering pr. runde.</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader className="pb-2"><CardTitle className="text-lg flex items-center gap-2"><span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span> Kuffert-åbning</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>16 kufferter med RNG-genererede multiplikatorer (1x-500x) præsenteres. Du vælger én kuffert som din egen. De resterende 15 åbnes i grupper af 3-4.</p>
                <p>Kufferternes indhold bestemmes af RNG FØR runden starter – de kan ikke ændres undervejs. Dit valg af kuffert er derfor rent kosmetisk; der er ingen "rigtige" eller "forkerte" kufferter.</p>
                <p><strong>Typisk fordeling:</strong> Ca. 8-10 kufferter under 10x, 4-5 mellem 10x-100x, 1-2 over 100x.</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader className="pb-2"><CardTitle className="text-lg flex items-center gap-2"><span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span> Deal or No Deal</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>Efter hver gruppe kufferter præsenterer bankieren et tilbud. Tilbuddet beregnes algoritmisk som en procentdel af de resterende kufferters forventede værdi (EV).</p>
                <p>DEAL = acceptér tilbuddet og afslut runden. NO DEAL = fortsæt med at åbne flere kufferter. Bankierens tilbud stiger typisk mod slutningen (fra 50-60 % til 80-90 % af EV).</p>
                <p><strong>Klimaks:</strong> Med 2 kufferter tilbage er det et rent 50/50 gamble – bankieren tilbyder 80-90 % af gennemsnittet.</p>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den vigtigste indsigt er, at kvalifikationsrunden er en skjult omkostning, som mange spillere undervurderer. Ved minimum boost (1×) koster kvalifikation gennemsnitligt 10-15 spins à 1 kr. = 10-15 kr. pr. runde. Ved max boost (50×) koster hvert kvalifikationsspin 50 kr., men du kvalificerer dig næsten hvert spin, så omkostningen er ca. 50-100 kr. Uanset boost-niveau betaler du altid – spørgsmålet er kun, om du betaler med tid (lav boost) eller penge (høj boost).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det fører til et paradoks: mange spillere oplever kvalifikationsrunden som "gratis" eller "billig", fordi de bruger lav boost og kun satser 1-2 kr. pr. spin. Men over 20-30 kvalifikationsspins akkumuleres omkostningen til 20-60 kr. – en betydelig del af den samlede investering pr. runde. Denne "skjulte omkostning" er bevidst designet til at være mindre mærkbar end en enkelt stor indsats, selvom den reelle effekt er den samme.
          </p>
        </section>

        {/* ── H2 3: Bankierens matematik ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" />Bankierens tilbuds-matematik – den algoritmiske forhandler</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bankierens tilbud er ikke tilfældigt – det beregnes algoritmisk baseret på den <Link to="/ordbog/expected-value" className={linkClass}>forventede værdi</Link> (EV) af de resterende kufferter. Formlen er: Tilbud = EV × Rabatfaktor, hvor rabatfaktoren stiger med hver runde. Bankieren tilbyder aldrig den fulde EV – altid en rabatteret version – fordi casinoet skal sikre en positiv forventet margin.
          </p>

          <Card className="mb-6 border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Bankierens tilbuds-model</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Runde</TableHead>
                    <TableHead className="text-center">Kufferter tilbage</TableHead>
                    <TableHead className="text-center">Typisk rabatfaktor</TableHead>
                    <TableHead className="text-center">Tilbud som % af EV</TableHead>
                    <TableHead className="text-center">Matematisk anbefaling</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-medium">1. tilbud</TableCell><TableCell className="text-center">13</TableCell><TableCell className="text-center">0,50-0,60</TableCell><TableCell className="text-center">50-60 %</TableCell><TableCell className="text-center text-destructive font-semibold">NO DEAL</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">2. tilbud</TableCell><TableCell className="text-center">10</TableCell><TableCell className="text-center">0,55-0,65</TableCell><TableCell className="text-center">55-65 %</TableCell><TableCell className="text-center text-destructive font-semibold">NO DEAL</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">3. tilbud</TableCell><TableCell className="text-center">7</TableCell><TableCell className="text-center">0,65-0,75</TableCell><TableCell className="text-center">65-75 %</TableCell><TableCell className="text-center text-muted-foreground">Situationsbestemt</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">4. tilbud</TableCell><TableCell className="text-center">4</TableCell><TableCell className="text-center">0,75-0,85</TableCell><TableCell className="text-center">75-85 %</TableCell><TableCell className="text-center text-muted-foreground">Situationsbestemt</TableCell></TableRow>
                  <TableRow className="bg-primary/5"><TableCell className="font-medium">Finalen</TableCell><TableCell className="text-center">2</TableCell><TableCell className="text-center">0,80-0,90</TableCell><TableCell className="text-center">80-90 %</TableCell><TableCell className="text-center text-primary font-semibold">DEAL anbefales</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den matematisk optimale strategi afhænger af din risikoprofil. En risikoneutral spiller bør altid afvise tilbuddet (da EV ved "No Deal" altid er højere end tilbuddet – bankieren tilbyder aldrig 100 % af EV). Men de fleste mennesker er risikoaverse – og for dem kan det være rationelt at acceptere et tilbud, der er 80 %+ af EV, specielt hvis alternativet indebærer en signifikant sandsynlighed for at tabe det meste.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Konkret eksempel:</strong> 2 kufferter tilbage med 5x og 500x. EV = (5 + 500) / 2 = 252,5x. Bankierens tilbud: ~200x (79 % af EV). Risikoneutral analyse: No Deal er korrekt, da EV(No Deal) = 252,5x &gt; 200x. Men prospect theory viser, at de fleste spillere risikoavers-vurderer dette scenarie asymmetrisk: sandsynligheden for 5x (0,5) "føles" værre end sandsynligheden for 500x (0,5) "føles" godt. Resultatet er, at ca. 70-80 % af spillere tager DEAL i denne situation – og for de fleste er det den rationelle beslutning givet deres personlige nytte-funktion.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Et vigtigt forbehold: bankierens algoritme kan variere med spillets tilstand. Der er indikationer på, at tilbuddene er lavere (relativt til EV) i scenarier med stor spredning i resterende kufferter og højere i scenarier med lav spredning. Dette giver matematisk mening: jo større usikkerhed, jo mere "rabat" kræver bankieren for at afdække sin risiko. For spilleren betyder det, at de mest "spændende" scenarier (f.eks. én stor og én lille kuffert) paradoksalt nok giver de dårligste tilbud i forhold til EV.
          </p>
        </section>

        {/* ── H2 4: House Edge og RTP ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" />House Edge og RTP – den samlede omkostningsanalyse</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Deal or No Deal Lives samlede <Link to="/ordbog/rtp" className={linkClass}>RTP</Link> er ca. 95,42 % (<Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> 4,58 %). Men denne RTP inkluderer kvalifikationsomkostningen, som mange spillere overser. Den effektive omkostning fordeler sig over to komponenter:
          </p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <p className="text-sm font-semibold mb-1">Kvalifikationsomkostning</p>
                <p className="text-xs text-muted-foreground mb-3">Gennemsnit: 10-15× basisindsats (minimum boost)</p>
                <p className="text-lg font-bold text-destructive">~30-50 % af total investering</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6">
                <p className="text-sm font-semibold mb-1">Kuffert-spil</p>
                <p className="text-xs text-muted-foreground mb-3">Selve hovedspillet: 1× basisindsats</p>
                <p className="text-lg font-bold text-primary">~50-70 % af total investering</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6 border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2"><DollarSign className="h-5 w-5 text-primary" /> EV-scenarier ved forskellige indsatsniveauer</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Basisindsats</TableHead>
                    <TableHead className="text-center">Total investering/runde</TableHead>
                    <TableHead className="text-center">Runder/time</TableHead>
                    <TableHead className="text-center">EV (tab)/time</TableHead>
                    <TableHead className="text-center">Sammenligning m. blackjack</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-medium">5 kr.</TableCell><TableCell className="text-center">~60 kr.</TableCell><TableCell className="text-center">3-5</TableCell><TableCell className="text-center text-destructive">-11 kr.</TableCell><TableCell className="text-center">6,3× dyrere</TableCell></TableRow>
                  <TableRow className="bg-primary/5"><TableCell className="font-medium">25 kr.</TableCell><TableCell className="text-center">~300 kr.</TableCell><TableCell className="text-center">3-5</TableCell><TableCell className="text-center text-destructive">-55 kr.</TableCell><TableCell className="text-center">6,3× dyrere</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">50 kr.</TableCell><TableCell className="text-center">~600 kr.</TableCell><TableCell className="text-center">3-5</TableCell><TableCell className="text-center text-destructive">-110 kr.</TableCell><TableCell className="text-center">6,3× dyrere</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">100 kr.</TableCell><TableCell className="text-center">~1.200 kr.</TableCell><TableCell className="text-center">3-5</TableCell><TableCell className="text-center text-destructive">-220 kr.</TableCell><TableCell className="text-center">6,3× dyrere</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sammenlignet med <Link to="/live-casino/blackjack" className={linkClass}>live blackjack</Link> (0,5 % HE) er Deal or No Deal ca. 9× dyrere pr. indsat krone. Men pga. det langsomme tempo (3-5 runder pr. time vs. 60 hænder blackjack) er den absolutte timeomkostning mere rimelig: ~55 kr./time ved 25 kr. basisindsats vs. ~17,5 kr./time for blackjack. Deal or No Deal er altså "kun" ca. 3× dyrere i absolut timeomkostning – en markant forskel fra per-bet sammenligningen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sammenlignet med <Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link> (~4,5 % HE, ~135 kr./time ved 50 kr. indsats) er Deal or No Deal faktisk billigere i absolut timeomkostning pga. det langsommere tempo. Men Crazy Time tilbyder 4 bonusspil, augmented reality og 50× højere max gevinst. Valget mellem dem afhænger af, om du prioriterer interaktivitet (Deal or No Deal) eller visuelt spektakel (Crazy Time).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det vigtigste tal for danske spillere: med et månedligt underholdningsbudget på 1.000 kr. kan du spille Deal or No Deal i ca. 18 timer (ved 25 kr. basisindsats). Til sammenligning giver samme budget 57 timers blackjack eller 7,4 timers Crazy Time. Deal or No Deal er en solid mellemmulighed – dyrere end bordspil men billigere end de mest volatile game shows.
          </p>
        </section>

        <InlineCasinoCards />

        {/* ── H2 5: Prospect Theory ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Brain className="h-5 w-5 text-primary" />Prospect Theory og beslutningspsykologi i Deal or No Deal</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Deal or No Deal er et nærmest perfekt laboratorium for adfærdsøkonomisk teori. Prospect theory – udviklet af Kahneman og Tversky (1979) – forklarer præcist, hvorfor spillere systematisk afviger fra den matematisk optimale strategi, og hvorfor denne afvigelse er forudsigelig og konsistent.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Tab-aversion (Loss Aversion):</strong> Prospect theory demonstrerer, at mennesker oplever tab som ca. 2-3× mere smertefuldt end en tilsvarende gevinst opleves som glædeligt. I Deal or No Deal-kontekst betyder det: hvis du har 2 kufferter tilbage med 5x og 500x, føles risikoen for at "tabe" 195x (ved at afvise 200x-tilbuddet og ramme 5x) psykologisk 2-3× værre end muligheden for at "vinde" 300x (ved at afvise tilbuddet og ramme 500x) føles godt. Denne asymmetri driver spillere mod DEAL – selv når NO DEAL er matematisk overlegent.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Certainty Effect:</strong> Mennesker overvurderer sikre udfald i forhold til usikre udfald. Bankierens tilbud er en "sikker ting" – du ved præcis, hvad du får. Alternativet er usikkert – du kan få meget mere eller meget mindre. Denne preference for sikkerhed er rationel for risikoaverse individer og forklarer, hvorfor de fleste spillere accepterer tilbud, der er 20-30 % under den forventede værdi.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Endowment Effect:</strong> Spillere, der har "overleveret" til de sidste runder og har en høj kuffert tilbage, føler et ejerskab over den potentielle gevinst. Denne følelse gør det sværere at acceptere et lavere tilbud – selvom det er matematisk fornuftigt. "Min kuffert har 500x i sig, jeg sælger den ikke for 200x!" er en klassisk endowment-bias, der ignorerer, at du har præcis 50 % sandsynlighed for at din kuffert faktisk indeholder den lave værdi.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Regret Aversion:</strong> Mange spillere frygter den efterfølgende fortrydelse mere end det faktiske tab. "Hvad hvis jeg tager DEAL og min kuffert havde 500x?" er en stærkere psykologisk driver end den rene EV-beregning. Denne regret aversion kan drive spillere i begge retninger: mod DEAL (for at undgå at åbne en dårlig kuffert) eller mod NO DEAL (for at undgå at "sælge" en god kuffert for billigt).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Konsekvensen er, at Deal or No Deal Live bevidst udnytter disse psykologiske biases. Bankierens tilbud er designet til at være "fristende men under EV" – præcis i det sweet spot, hvor tab-aversion og certainty effect driver de fleste spillere mod DEAL. Casinoets margin er indlejret i dette design: bankieren tilbyder altid under EV, og de fleste spillere accepterer. Det er elegant, profitabelt – og matematisk uundgåeligt.
          </p>
        </section>

        {/* ── H2 6: Optimal strategi ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Target className="h-5 w-5 text-primary" />Optimal strategi – hvornår du tager Deal</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Selvom Deal or No Deal har en beslutningskomponent, kan ingen strategi eliminere house edge. Men du kan optimere dine beslutninger for at minimere tab og maksimere underholdningsværdi:
          </p>

          <div className="space-y-4 mb-6">
            <Card className="border-border">
              <CardContent className="p-4">
                <p className="font-semibold mb-1">1. Kvalifikation: Brug lav til medium boost</p>
                <p className="text-sm text-muted-foreground">Medmindre du har en stor bankroll, er lav-boost kvalifikation (1-5×) mest kostnadseffektiv. Det koster mere tid men mindre penge pr. runde. Max boost (50×) er kun fornuftigt, hvis din tidspræference er ekstremt høj, eller du har en stor bankroll, der gør den ekstra omkostning negligibel.</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <p className="font-semibold mb-1">2. Afvis altid de to første tilbud</p>
                <p className="text-sm text-muted-foreground">Bankierens første og andet tilbud (50-65 % af EV) er objektivt dårlige uanset din risikoprofil. Selv stærkt risikoaverse spillere bør afvise dem, da rabatten er for stor. Undtagelse: hvis de store kufferter allerede er åbnet og EV er faldet dramatisk.</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <p className="font-semibold mb-1">3. Overvej DEAL ved 75 %+ af EV med høj varians</p>
                <p className="text-sm text-muted-foreground">Når tilbuddet nærmer sig 75-85 % af EV, og der er stor spredning i resterende kufferter (f.eks. 5x og 500x), er DEAL en fornuftig risikostyring for de fleste spillere. Den 15-25 % rabat er "prisen" for at eliminere risikoen for worst-case udfaldet.</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <p className="font-semibold mb-1">4. Ignorer sunk costs</p>
                <p className="text-sm text-muted-foreground">Din kvalifikationsomkostning er allerede tabt – den er en "sunk cost." Lad den ALDRIG påvirke din Deal/No Deal-beslutning. Evaluer udelukkende baseret på tilbud vs. resterende kufferters EV. "Jeg har allerede brugt 50 kr. på kvalifikation, så jeg skal vinde mindst 50 kr." er en klassisk sunk cost-fejl.</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <p className="font-semibold mb-1">5. Brug EV-beregning, ikke mavefornemmelse</p>
                <p className="text-sm text-muted-foreground">Beregn EV af resterende kufferter manuelt (sum af alle multiplikatorer / antal kufferter). Sammenlign med bankierens tilbud. Hvis tilbuddet er over 80 % af EV og du er risikoavers, er DEAL matematisk forsvarligt. Lad ikke dramatik, musik eller værtens pres påvirke din vurdering.</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Den vigtigste strategiske indsigt: Deal or No Deal er i bund og grund et risikostyringsvalg, ikke et færdighedsspil. Du kan ikke vinde en edge over casinoet – men du kan vælge, om du foretrækker en sikker, rabatteret gevinst (DEAL) eller en usikker, potentielt højere gevinst (NO DEAL). Begge valg har negativ forventet værdi relativt til din totale investering. Den eneste "fejl" er at tage et tilbud, der er under 70 % af EV – eller at fortsætte ud af ren irrationalitet.
          </p>
        </section>

        {/* ── H2 7: Volatilitetsanalyse ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Activity className="h-5 w-5 text-primary" />Volatilitetsanalyse – resultatspredning og bankroll-krav</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Deal or No Deal har en medium-høj <Link to="/ordbog/volatilitet" className={linkClass}>volatilitet</Link> – lavere end <Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link> (ultra-høj) men højere end Dream Catcher (medium). Volatiliteten afhænger stærkt af din Deal/No Deal-strategi: spillere, der altid tager DEAL tidligt, oplever lav volatilitet (stabile, lave gevinster), mens spillere, der altid vælger NO DEAL, oplever høj volatilitet (sjældne store gevinster men hyppige tab).
          </p>

          <Card className="mb-6 border-border">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Strategi</TableHead>
                    <TableHead className="text-center">Volatilitet</TableHead>
                    <TableHead className="text-center">Typisk resultat/runde</TableHead>
                    <TableHead className="text-center">Max gevinst</TableHead>
                    <TableHead className="text-center">Anbefalet bankroll</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-medium">Tidlig DEAL (runde 1-2)</TableCell><TableCell className="text-center">Lav</TableCell><TableCell className="text-center">5-15x indsats</TableCell><TableCell className="text-center">~50x</TableCell><TableCell className="text-center">20× basisindsats</TableCell></TableRow>
                  <TableRow className="bg-primary/5"><TableCell className="font-medium">Medium DEAL (runde 3-4)</TableCell><TableCell className="text-center">Medium</TableCell><TableCell className="text-center">10-30x indsats</TableCell><TableCell className="text-center">~200x</TableCell><TableCell className="text-center">40× basisindsats</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Altid NO DEAL (finale)</TableCell><TableCell className="text-center">Høj</TableCell><TableCell className="text-center">1-500x indsats</TableCell><TableCell className="text-center">500x</TableCell><TableCell className="text-center">80× basisindsats</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den langsomme spilfrekvens (3-5 runder pr. time) giver Deal or No Deal en unik volatilitetsprofil: du har færre "datapunkter" pr. session, hvilket gør resultater mere uforudsigelige. Over en 4-timers session spiller du kun 12-20 runder – alt for få til at konvergere mod den teoretiske RTP. Dine kortvarige resultater vil være stærkt påvirket af tilfældighed og dine Deal/No Deal-valg.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For bankroll management anbefaler vi minimum 40× basisindsats som sessionsbankroll ved en medium DEAL-strategi. Ved 25 kr. basisindsats svarer det til 1.000 kr. – nok til ca. 10-15 runder eller 3-4 timers spil. Spillere med lavere bankroll bør bruge lavere basisindsats og lav boost-kvalifikation for at maksimere antallet af runder.
          </p>
        </section>

        {/* ── H2 8: Sammenligning med andre game shows ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Gauge className="h-5 w-5 text-primary" />Deal or No Deal vs. andre live game shows</h2>

          <Card className="mb-6 border-border">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Game Show</TableHead>
                    <TableHead className="text-center">RTP</TableHead>
                    <TableHead className="text-center">Max Gevinst</TableHead>
                    <TableHead className="text-center">Spillervalg</TableHead>
                    <TableHead className="text-center">Tempo</TableHead>
                    <TableHead className="text-center">Timeomkostning (50 kr.)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-primary/5"><TableCell className="font-semibold">Deal or No Deal</TableCell><TableCell className="text-center">95,42 %</TableCell><TableCell className="text-center">500x</TableCell><TableCell className="text-center">Ja (DEAL/NO DEAL)</TableCell><TableCell className="text-center">3-5/time</TableCell><TableCell className="text-center">~110 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link></TableCell><TableCell className="text-center">95,50 %</TableCell><TableCell className="text-center">25.000x</TableCell><TableCell className="text-center">Nej</TableCell><TableCell className="text-center">60/time</TableCell><TableCell className="text-center">~135 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/live-casino/dream-catcher" className={linkClass}>Dream Catcher</Link></TableCell><TableCell className="text-center">90,6-96,6 %</TableCell><TableCell className="text-center">~1.960x</TableCell><TableCell className="text-center">Nej</TableCell><TableCell className="text-center">70/time</TableCell><TableCell className="text-center">~120-330 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/live-casino/monopoly-live" className={linkClass}>Monopoly Live</Link></TableCell><TableCell className="text-center">96,23 %</TableCell><TableCell className="text-center">~10.000x</TableCell><TableCell className="text-center">Nej</TableCell><TableCell className="text-center">50/time</TableCell><TableCell className="text-center">~95 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/live-casino/lightning-roulette" className={linkClass}>Lightning Roulette</Link></TableCell><TableCell className="text-center">97,30 %</TableCell><TableCell className="text-center">500x</TableCell><TableCell className="text-center">Nej</TableCell><TableCell className="text-center">60/time</TableCell><TableCell className="text-center">~81 kr.</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Deal or No Deal skiller sig ud på to parametre: det er det eneste game show med en reel spillerbeslutning, og det har det langsomste tempo (3-5 runder pr. time). Det langsomme tempo giver en lavere absolut timeomkostning end Crazy Time og de fleste Dream Catcher-væddemål – men samtidig færre "action-momenter" pr. session.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For spillere, der primært søger interaktivitet og strategisk spænding, er Deal or No Deal det bedste game show-valg. For spillere, der søger visuel underholdning og store gevinster, er Crazy Time overlegen. For spillere, der ønsker den laveste omkostning, er Lightning Roulette eller <Link to="/live-casino/blackjack" className={linkClass}>blackjack</Link> markant bedre valg. Besøg vores <Link to="/live-casino/game-shows" className={linkClass}>game shows-oversigt</Link> for en komplet sammenligning.
          </p>
        </section>

        {/* ── H2 9: Bedste casinoer ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />Bedste danske casinoer med Deal or No Deal Live</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Deal or No Deal Live er tilgængeligt hos alle danske Evolution Gaming-casinoer med <Link to="/casino-licenser" className={linkClass}>dansk licens</Link>. Spillet er identisk uanset operatør – vælg baseret på <Link to="/casino-bonus" className={linkClass}>bonus</Link>, udbetalingshastighed og kundeservice. Husk: live casino bidrager typisk kun 10 % til <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> – spil med egne midler.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For optimal værdi anbefaler vi casinoer med hurtige udbetalinger, gode ansvarlighedsværktøjer og stabil streaming. Besøg <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link> for aktuelle tilbud eller <Link to="/casino-anmeldelser" className={linkClass}>læs anmeldelser</Link>.
          </p>
          <InlineCasinoCards title="Spil Deal or No Deal her" count={3} />
        </section>

        <Separator className="my-10" />

        {/* ── H2 10: Ansvarligt spil ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-primary" />Ansvarligt spil med Deal or No Deal</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Deal or No Deals kvalifikationsrunde skaber en unik risiko for "chasing" – spillere, der øger indsatsen eller boost-niveauet for at kvalificere sig hurtigere efter en dårlig runde. Denne eskaleringsadfærd kan hurtigt overskride budgettet, fordi kvalifikationsomkostningen er "skjult" i mange små indsatser snarere end én synlig stor indsats.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi anbefaler: 1) Sæt en fast grænse for kvalifikationsomkostninger pr. session (f.eks. max 200 kr.), 2) Brug altid det samme boost-niveau – skift ikke op efter tab, 3) Sæt en tidsbegrænsning på maks. 3 timer, 4) Husk at kvalifikationsomkostningen er en del af dit tab – track den som en underholdningsudgift, ikke som en separat "investering."
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hvis du oplever problemer med at kontrollere dit spil, kan du kontakte <Link to="/ansvarligt-spil/stopspillet" className={linkClass}>StopSpillet</Link> (70 22 28 25) døgnet rundt, eller <Link to="/ansvarligt-spil/rofus" className={linkClass}>registrere dig i ROFUS</Link> for selvudelukkelse. Hjælpen er gratis og fortrolig.
          </p>
        </section>

        <LiveCasinoMoneyLinks gameName="Deal or No Deal" currentPath="/live-casino/deal-or-no-deal" />
        <FAQSection title="Ofte Stillede Spørgsmål om Deal or No Deal Live" faqs={faqs} />
        <RelatedGuides currentPath="/live-casino/deal-or-no-deal" />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="spilleautomaten" />
    </>
  );
};

export default DealOrNoDealGuide;
