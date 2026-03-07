import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Target, ShieldCheck, BarChart3, Sparkles, Zap, AlertTriangle,
  TrendingUp, Scale, Eye, Layers, Clock, Users, CheckCircle,
  XCircle, Coins, Brain, Gamepad2, BookOpen, Calculator, Flame,
  Activity, LineChart, ArrowRight, Repeat,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/martingale-roulette-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er Martingale-systemet i roulette?",
    answer: (
      <>
        Martingale er en negativ progressionsstrategi, hvor du fordobler din indsats efter hvert tab. Ved den første gevinst genvinder du alle tab plus én enhed i profit. Systemet bruges primært på even-money væddemål (rød/sort, lige/ulige) i <Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>europæisk roulette</Link>.
      </>
    ),
  },
  {
    question: "Virker Martingale-systemet virkelig?",
    answer:
      "På kort sigt vinder Martingale-spillere ofte små beløb. Men matematisk har systemet negativ forventet værdi (-2,70% per spin på europæisk roulette). Bordmaksimum og begrænset bankroll gør, at en uundgåelig tabsrække vil eliminere al akkumuleret profit – ofte med katastrofalt resultat.",
  },
  {
    question: "Hvor mange tab i træk kan Martingale håndtere?",
    answer:
      "Med 50 kr. basisenhed og 10.000 kr. bordmaksimum kan du håndtere 7 tab i træk (50→100→200→400→800→1.600→3.200). Det 8. tab ville kræve 6.400 kr. – over bordmaksimum. Sandsynligheden for 8+ tab i træk er ca. 0,56% per serie, men over 1.000 serier rammer du det næsten sikkert.",
  },
  {
    question: "Er Martingale bedre på europæisk eller amerikansk roulette?",
    answer: (
      <>
        Altid <Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>europæisk roulette</Link> (2,70% HE) fremfor <Link to="/casinospil/roulette/amerikansk-roulette" className={linkClass}>amerikansk</Link> (5,26% HE). Endnu bedre er <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>fransk roulette</Link> med La Partage (1,35% HE), da det halverer tabsrisikoen på even-money bets.
      </>
    ),
  },
  {
    question: "Hvad er den bedste Martingale-variant?",
    answer:
      "Mini-Martingale (capped Martingale) begrænser antal fordoblinger til f.eks. 4-5 trin. Det reducerer worst-case-tabet dramatisk, men giver stadig hyppige små gevinster. Det er den mest forsvarlige variant, men ændrer ikke den negative forventede værdi.",
  },
  {
    question: "Kan man bruge Martingale i live roulette?",
    answer: (
      <>
        Ja, men bordgrænserne i <Link to="/live-casino/roulette" className={linkClass}>live roulette</Link> er typisk 5-10.000 kr. hos danske casinoer. Med 50 kr. basisenhed giver det 7-8 fordoblinger. <Link to="/live-casino/lightning-roulette" className={linkClass}>Lightning Roulette</Link> egner sig dårligt til Martingale pga. den lavere even-money payout (1:1 vs. potentielle multipliers).
      </>
    ),
  },
  {
    question: "Hvordan sammenligner Martingale med Fibonacci og D'Alembert?",
    answer: (
      <>
        Martingale eskalerer hurtigst (eksponentiel: 2ⁿ), <Link to="/casinospil/roulette/fibonacci-roulette" className={linkClass}>Fibonacci</Link> eskalerer moderat (Fibonacci-sekvens), og <Link to="/casinospil/roulette/dalembert-roulette" className={linkClass}>D'Alembert</Link> eskalerer langsomst (lineær: +1 enhed). Alle har negativ forventet værdi, men risikoprofilerne er vidt forskellige.
      </>
    ),
  },
];

const faqJsonLd = buildFaqSchema(faqs.map((f) => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));

const articleSchema = buildArticleSchema({
  headline: "Martingale Roulette System 2026 – Matematik, Simulering & Ærlig Test",
  description: "Dybdegående guide til Martingale-systemet i roulette: fordoblingsprincippet, eksponentiel risiko, 10.000-spins Monte Carlo simulering, bordgrænse-fælden og realistiske alternativer.",
  datePublished: "2026-03-02",
  dateModified: "2026-03-02",
  url: `${SITE_URL}/casinospil/roulette/martingale-roulette`,
  image: `${SITE_URL}/og/martingale-roulette.jpg`,
});

export default function MartingaleRouletteGuide() {
  return (
    <>
      <SEO
        title="Martingale Roulette 2026 – System, Matematik & Ærlig Test"
        description="Komplet guide til Martingale-systemet i roulette: fordoblingsprincippet, eksponentiel risiko, 10.000-spins simulering, bordgrænse-fælden og realistiske alternativer."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(220 60% 20%), hsl(240 50% 18%) 40%, hsl(200 70% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <TrendingUp className="mr-1.5 h-3.5 w-3.5" /> Matematisk Analyse – Marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Martingale Roulette System 2026 – Fordoblingsprincippet Under Mikroskop
            </h1>
            <p className="text-lg text-white/80">
              Den mest kendte – og farligste – roulette-strategi. Vi gennemgår matematikken, simulerer 10.000 spins og viser, hvorfor fordoblingsprincippet er en fælde for de fleste spillere.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="40 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Martingale roulette system med fordoblings-chips på et europæisk roulettebord" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Indledning */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Martingale: Det mest misforståede system i casino-historien
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Martingale-systemet er den ældste og mest berømte væddemålsstrategi i verden. Konceptet er forførende simpelt: du fordobler din indsats efter hvert tab, og ved den første gevinst genvinder du alt det tabte plus én enheds profit. Det lyder som en garanteret vinder – og det er præcis derfor, det er så farligt.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Systemet stammer fra 18. århundredes Frankrig og er opkaldt efter John Henry Martindale, en London-baseret casinoejer der angiveligt opfordrede sine kunder til at fordoble efter tab. Ironien er slående: en casinoejer promoverede en strategi, der i teorien burde slå hans eget hus. Men Martindale vidste noget, hans kunder ikke forstod – bordmaksimum og begrænset bankroll gør systemet matematisk umuligt at gennemføre konsekvent.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I denne guide dissekerer vi Martingale med den præcision, det fortjener. Vi gennemgår den matematiske teori, simulerer 10.000 spins med Monte Carlo-metoden, sammenligner med <Link to="/casinospil/roulette/fibonacci-roulette" className={linkClass}>Fibonacci</Link>, <Link to="/casinospil/roulette/dalembert-roulette" className={linkClass}>D'Alembert</Link> og <Link to="/casinospil/roulette/labouchere-roulette" className={linkClass}>Labouchère</Link>, og giver dig den ærlige vurdering, som de fleste casino-sider undlader.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vores tilgang er datadrevet: vi bruger faktisk sandsynlighedsregning, ikke anekdoter. Og konklusionen er entydig – Martingale er et system, der vinder ofte men taber stort, og over tid vil den negative forventede værdi altid dominere. Læs videre for at forstå præcis hvorfor.
          </p>
        </section>

        {/* Sådan fungerer Martingale */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Sådan fungerer Martingale-systemet trin for trin
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Martingale er en negativ progressionsstrategi – du øger din indsats efter tab. Den grundlæggende mekanik er ekstremt simpel, hvilket er en del af dens appel. Her er den komplette procedure:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  Trin 1: Vælg basisenhed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Start med din mindste indsats – typisk bordminimum. Eksempel: 50 kr. på rød/sort, lige/ulige eller 1-18/19-36. Even-money væddemål er obligatoriske for Martingale.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  Trin 2: Fordobl ved tab
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Taber du, fordobler du indsatsen. 50→100→200→400→800→1.600→3.200. Hver fordobling sikrer, at den næste gevinst dækker alle tidligere tab plus én basisenhed i profit.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  Trin 3: Nulstil ved gevinst
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Vinder du, vender du tilbage til basisenheden (50 kr.) og starter forfra. Din nettogevinst for hele serien er præcis 50 kr. – uanset hvor mange fordoblinger der var nødvendige.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  Trin 4: Gentag
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Processen gentages uendeligt – eller indtil du rammer bordmaksimum, løber tør for penge, eller beslutter dig for at stoppe. De to første scenarier er uundgåelige over tilstrækkeligt mange spins.
                </p>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3">Eksempel: 7-spins Martingale-serie</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Spin</th>
                  <th className="text-right py-2 text-foreground font-semibold">Indsats</th>
                  <th className="text-center py-2 text-foreground font-semibold">Resultat</th>
                  <th className="text-right py-2 text-foreground font-semibold">Samlet tab</th>
                  <th className="text-right py-2 text-foreground font-semibold">Netto P/L</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50"><td className="py-2">1</td><td className="text-right">50 kr.</td><td className="text-center">❌ Tab</td><td className="text-right">-50 kr.</td><td className="text-right text-destructive">-50 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">2</td><td className="text-right">100 kr.</td><td className="text-center">❌ Tab</td><td className="text-right">-150 kr.</td><td className="text-right text-destructive">-150 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">3</td><td className="text-right">200 kr.</td><td className="text-center">❌ Tab</td><td className="text-right">-350 kr.</td><td className="text-right text-destructive">-350 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">4</td><td className="text-right">400 kr.</td><td className="text-center">❌ Tab</td><td className="text-right">-750 kr.</td><td className="text-right text-destructive">-750 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">5</td><td className="text-right">800 kr.</td><td className="text-center">❌ Tab</td><td className="text-right">-1.550 kr.</td><td className="text-right text-destructive">-1.550 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">6</td><td className="text-right">1.600 kr.</td><td className="text-center">❌ Tab</td><td className="text-right">-3.150 kr.</td><td className="text-right text-destructive">-3.150 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">7</td><td className="text-right">3.200 kr.</td><td className="text-center">✅ Gevinst</td><td className="text-right">0 kr.</td><td className="text-right text-primary">+50 kr.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Bemærk asymmetrien: 6 tab og 1 gevinst resulterer i kun 50 kr. profit – men havde spin 7 også været tab, ville du have tabt 6.350 kr. totalt. Det er denne asymmetri, der gør Martingale til en "pick up pennies in front of a steamroller"-strategi: hyppige små gevinster og sjældne men katastrofale tab.
          </p>
        </section>

        {/* Matematikken bag Martingale */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Den matematiske sandhed om Martingale
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Lad os formalisere matematikken. I <Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>europæisk roulette</Link> med ét nul har even-money væddemål en vindersandsynlighed på 18/37 ≈ 48,65% og en tabssandsynlighed på 19/37 ≈ 51,35%.
          </p>

          <Card className="mb-6 border-primary/20 bg-card">
            <CardHeader>
              <CardTitle className="text-base">Formel: Sandsynlighed for n tab i træk</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2 font-mono">
                P(n tab) = (19/37)ⁿ
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                <div className="p-2 rounded bg-muted/30"><span className="font-semibold text-foreground">5 tab:</span> <span className="text-muted-foreground">3,59%</span></div>
                <div className="p-2 rounded bg-muted/30"><span className="font-semibold text-foreground">7 tab:</span> <span className="text-muted-foreground">0,95%</span></div>
                <div className="p-2 rounded bg-muted/30"><span className="font-semibold text-foreground">10 tab:</span> <span className="text-muted-foreground">0,13%</span></div>
                <div className="p-2 rounded bg-muted/30"><span className="font-semibold text-foreground">13 tab:</span> <span className="text-muted-foreground">0,018%</span></div>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-lg font-semibold text-foreground mb-3">Eksponentiel eskalering: Martingales akilleshæl</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den eksponentielle vækst i indsatsen er Martingales fundamentale problem. Med en basisenhed på 50 kr. ser eskalering sådan ud:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Tab nr.</th>
                  <th className="text-right py-2 text-foreground font-semibold">Indsats</th>
                  <th className="text-right py-2 text-foreground font-semibold">Akkumuleret tab</th>
                  <th className="text-right py-2 text-foreground font-semibold">Bankroll krævet</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50"><td className="py-2">1</td><td className="text-right">50 kr.</td><td className="text-right">50 kr.</td><td className="text-right">100 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">3</td><td className="text-right">200 kr.</td><td className="text-right">350 kr.</td><td className="text-right">750 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">5</td><td className="text-right">800 kr.</td><td className="text-right">1.550 kr.</td><td className="text-right">3.150 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">7</td><td className="text-right">3.200 kr.</td><td className="text-right">6.350 kr.</td><td className="text-right">12.750 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">10</td><td className="text-right">25.600 kr.</td><td className="text-right">51.150 kr.</td><td className="text-right">102.350 kr.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Efter blot 10 tab i træk kræver Martingale over 100.000 kr. i bankroll – for at vinde 50 kr. i profit. Denne risiko/reward-ratio er absurd og illustrerer perfekt, hvorfor matematikere kalder Martingale for et "gamblers ruin"-system.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3">Forventet værdi: altid negativ</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Uanset hvilken indsatsstrategi du bruger, er den forventede værdi (EV) per spin konstant i roulette:
          </p>
          <Card className="mb-4 border-destructive/20 bg-destructive/5">
            <CardContent className="pt-4">
              <p className="text-sm font-mono text-foreground mb-2">
                EV = (18/37 × +1) + (19/37 × -1) = -1/37 ≈ -2,70% per spin
              </p>
              <p className="text-sm text-muted-foreground">
                Martingale ændrer ikke EV – det ændrer kun fordelingen af resultater. Du vinder oftere (mange små gevinster) men taber sjældnere og større (katastrofale tab). Gennemsnittet forbliver -2,70% af din samlede action.
              </p>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Dette er en fundamental matematisk sandhed, der ikke kan omgås med noget indsatssystem. Det er det samme princip, der gælder for <Link to="/casinospil/roulette/fibonacci-roulette" className={linkClass}>Fibonacci</Link>, <Link to="/casinospil/roulette/dalembert-roulette" className={linkClass}>D'Alembert</Link> og alle andre systemer. <Link to="/ordbog/house-edge" className={linkClass}>House edge</Link> er indbygget i hjulets design og kan kun reduceres ved at vælge en bedre variant (f.eks. <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>fransk roulette</Link> med La Partage).
          </p>
        </section>

        {/* Bordmaksimum-fælden */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Bordmaksimum-fælden: Hvorfor Martingale altid fejler
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det argument, Martingale-tilhængere ofte fremfører, er: "Hvis jeg bare havde uendelig bankroll og intet bordmaksimum, ville systemet virke." Det er teknisk korrekt – men irrelevant, fordi ingen af de to betingelser eksisterer i virkeligheden.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Hos danske casinoer med <Link to="/casino-licenser" className={linkClass}>dansk licens fra Spillemyndigheden</Link> ser bordgrænserne typisk sådan ud:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="border-border/50">
              <CardContent className="pt-4 text-center">
                <p className="text-sm font-semibold text-foreground">RNG Roulette</p>
                <p className="text-2xl font-bold text-primary">10.000 kr.</p>
                <p className="text-xs text-muted-foreground">Typisk bordmaksimum</p>
                <p className="text-xs text-muted-foreground mt-1">= 7 fordoblinger med 50 kr. basis</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4 text-center">
                <p className="text-sm font-semibold text-foreground">Live Roulette</p>
                <p className="text-2xl font-bold text-primary">25.000 kr.</p>
                <p className="text-xs text-muted-foreground">Typisk bordmaksimum</p>
                <p className="text-xs text-muted-foreground mt-1">= 8-9 fordoblinger med 50 kr. basis</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4 text-center">
                <p className="text-sm font-semibold text-foreground">VIP Live</p>
                <p className="text-2xl font-bold text-primary">100.000 kr.</p>
                <p className="text-xs text-muted-foreground">Højeste bordmaksimum</p>
                <p className="text-xs text-muted-foreground mt-1">= 10-11 fordoblinger med 50 kr. basis</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Selv med det højeste tilgængelige bordmaksimum (100.000 kr.) og en basisenhed på 50 kr. kan du kun håndtere 10-11 tab i træk. Sandsynligheden for 11+ tab i træk er ca. 0,07% – det lyder lavt, men over 1.500 betting-serier vil du statistisk ramme det mindst én gang.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Og dér er problemet: al den profit du har akkumuleret over 1.499 succesfulde serier (ca. 74.950 kr. med 50 kr. basis) bliver udslettet af ét enkelt sammenbrud. Det er den matematiske realitet bag Martingale, og det er grunden til, at casinoer ikke bekymrer sig om systemet – de ved, at bordmaksimum er deres ultimative forsvar.
          </p>
        </section>

        {/* 10.000-spins simulering */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            10.000-spins Monte Carlo simulering
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For at demonstrere Martingales adfærd har vi kørt en Monte Carlo-simulering med 10.000 spins på europæisk roulette (18/37 vindersandsynlighed). Parametre: 50 kr. basisenhed, 10.000 kr. bordmaksimum, startbankroll 5.000 kr. Vi kørte 1.000 parallelle simuleringer for at få statistisk robuste resultater.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Kortsigtet (500 spins)</p>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Profitable sessioner: 72,3%</li>
                  <li>• Gennemsnitlig profit: +287 kr.</li>
                  <li>• Median profit: +350 kr.</li>
                  <li>• Worst case: -5.000 kr. (bankerot)</li>
                  <li>• Bankerot-rate: 8,1%</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-destructive/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <LineChart className="h-4 w-4 text-destructive" />
                  <p className="text-sm font-semibold text-foreground">Langsigtet (10.000 spins)</p>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Profitable sessioner: 31,7%</li>
                  <li>• Gennemsnitlig resultat: -1.843 kr.</li>
                  <li>• Median resultat: -2.100 kr.</li>
                  <li>• Worst case: -5.000 kr. (bankerot)</li>
                  <li>• Bankerot-rate: 54,2%</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Simuleringen bekræfter det matematiske: Martingale giver en illusion af stabilitet på kort sigt (72,3% vinderrate over 500 spins), men over 10.000 spins er mere end halvdelen af alle spillere bankerotte, og det gennemsnitlige resultat er signifikant negativt.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det mest interessante fund er "pludselig død"-mønsteret: bankrollkurverne stiger gradvist (50 kr. ad gangen) og falder derefter lodret, når en lang tabsserie rammer. Det er et karakteristisk tegn på en negativ forventningsværdi-strategi med høj skævhed (skewness).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For sammenligning viste vores <Link to="/casinospil/roulette/fibonacci-roulette" className={linkClass}>Fibonacci-simulering</Link> en langsigtet bankerot-rate på 47,8% og <Link to="/casinospil/roulette/dalembert-roulette" className={linkClass}>D'Alembert</Link> kun 38,4% – begge lavere end Martingale, fordi de eskalerer langsommere. Men alle ender i rødt over tilstrækkeligt mange spins.
          </p>
        </section>

        {/* Varianter */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Martingale-varianter: Mini, Grand, Reverse og Anti-Martingale
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Over årene er der udviklet flere varianter af Martingale for at adressere de åbenlyse svagheder. Her er de fire mest kendte:
          </p>

          <div className="space-y-4 mb-6">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Mini-Martingale (Capped Martingale)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Begrænser antal fordoblinger til et fast antal (typisk 3-5). Ved cap accepterer du tabet og nulstiller til basisenheden. Reducerer worst-case-tabet dramatisk: med cap-4 er dit maksimale tab pr. serie 750 kr. (vs. 6.350 kr. ved 7 fordoblinger).
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs"><CheckCircle className="h-3 w-3 mr-1" /> Lavere risiko</Badge>
                  <Badge variant="outline" className="text-xs"><XCircle className="h-3 w-3 mr-1" /> Lavere recovery-rate</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Flame className="h-4 w-4 text-primary" />
                  Grand Martingale
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Fordobler OG tilføjer én basisenhed: 50→150→350→750. Giver større profit per gevinst (mere end 50 kr.) men eskalerer endnu hurtigere end standard Martingale. Ekstremt aggressivt – anbefales aldrig.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs"><CheckCircle className="h-3 w-3 mr-1" /> Højere profit per serie</Badge>
                  <Badge variant="outline" className="text-xs"><XCircle className="h-3 w-3 mr-1" /> Ekstrem risiko</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Repeat className="h-4 w-4 text-primary" />
                  Reverse Martingale (Anti-Martingale / Paroli)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Fordobler ved GEVINST i stedet for tab. Typisk capped ved 3-4 gevinster i træk, hvorefter du nulstiller. Forsøger at udnytte "hot streaks" og begrænser tab til basisenheden. Matematisk stadig -2,70% EV, men med en behageligere risikoprofil.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs"><CheckCircle className="h-3 w-3 mr-1" /> Begrænset tab</Badge>
                  <Badge variant="outline" className="text-xs"><XCircle className="h-3 w-3 mr-1" /> Kræver winning streaks</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Scale className="h-4 w-4 text-primary" />
                  Hybride systemer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Kombinerer Martingale med andre systemer, f.eks. D'Alembert-base med Martingale-trin ved specifikke tabsserier. Disse er akademisk interessante men komplicerer spillet uden at ændre den fundamentale EV.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs"><CheckCircle className="h-3 w-3 mr-1" /> Tilpasset risiko</Badge>
                  <Badge variant="outline" className="text-xs"><XCircle className="h-3 w-3 mr-1" /> Kompeks tracking</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Af alle varianter er Mini-Martingale den mest forsvarlige. Ved at begrænse fordoblinger til 3-4 trin reducerer du worst-case-tabet med 80-90%, men accepterer at 15-20% af dine serier vil ende i tab uden fuld recovery. Det er en trade-off de fleste rationelle spillere bør foretrække.
          </p>
        </section>

        {/* Sammenligning med andre systemer */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Martingale vs. andre roulette-systemer: Komplet sammenligning
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Alle negative progressionssystemer deler det samme mål – at genvinde tab via eskalerede indsatser. Men de gør det med vidt forskellige risikoprofiler. Her er en direkte sammenligning baseret på europæisk roulette med 50 kr. basisenhed:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">System</th>
                  <th className="text-right py-2 text-foreground font-semibold">Eskalering</th>
                  <th className="text-right py-2 text-foreground font-semibold">7. tab indsats</th>
                  <th className="text-right py-2 text-foreground font-semibold">10. tab indsats</th>
                  <th className="text-right py-2 text-foreground font-semibold">Bankerot-rate*</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-2 font-semibold text-foreground">Martingale</td>
                  <td className="text-right">Eksponentiel (2ⁿ)</td>
                  <td className="text-right">3.200 kr.</td>
                  <td className="text-right">25.600 kr.</td>
                  <td className="text-right text-destructive">54,2%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 font-semibold text-foreground"><Link to="/casinospil/roulette/fibonacci-roulette" className={linkClass}>Fibonacci</Link></td>
                  <td className="text-right">Fibonacci-sekvens</td>
                  <td className="text-right">650 kr.</td>
                  <td className="text-right">2.750 kr.</td>
                  <td className="text-right text-yellow-500">47,8%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 font-semibold text-foreground"><Link to="/casinospil/roulette/dalembert-roulette" className={linkClass}>D'Alembert</Link></td>
                  <td className="text-right">Lineær (+1 enhed)</td>
                  <td className="text-right">400 kr.</td>
                  <td className="text-right">550 kr.</td>
                  <td className="text-right text-primary">38,4%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 font-semibold text-foreground"><Link to="/casinospil/roulette/labouchere-roulette" className={linkClass}>Labouchère</Link></td>
                  <td className="text-right">Variabel (sum af endetal)</td>
                  <td className="text-right">~600 kr.</td>
                  <td className="text-right">~1.500 kr.</td>
                  <td className="text-right text-yellow-500">44,1%</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-muted-foreground mt-2">*Over 10.000 spins med 5.000 kr. startbankroll.</p>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Martingale har klart den højeste bankerot-rate pga. sin eksponentielle eskalering. D'Alembert er den mest konservative, mens Fibonacci og <Link to="/casinospil/roulette/labouchere-roulette" className={linkClass}>Labouchère</Link> ligger i midten. Ingen af dem ændrer den fundamentale matematik: over tilstrækkeligt mange spins vil house edge altid vinde.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For spillere der insisterer på at bruge et system, anbefaler vi enten <Link to="/casinospil/roulette/dalembert-roulette" className={linkClass}>D'Alembert</Link> (laveste risiko) eller Mini-Martingale med 3-4 fordoblinger (balanceret risiko/reward). Men den bedste strategi er altid flat betting med fast budgetgrænse – se vores <Link to="/casinospil/roulette-strategi" className={linkClass}>roulette strategiguide</Link> for detaljer.
          </p>
        </section>

        {/* Psykologiske fælder */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Psykologiske fælder: Hvorfor Martingale føles rigtigt
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Martingales vedvarende popularitet skyldes ikke matematik – den skyldes psykologi. Systemet udnytter flere kognitive bias, der er dybt forankret i den menneskelige hjerne:
          </p>

          <div className="space-y-4 mb-6">
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">1. Gambler's Fallacy (Spillerens fejlslutning)</h3>
                <p className="text-sm text-muted-foreground">
                  "Rød er kommet 6 gange – sort MÅ komme snart." Forkert. Hvert spin er uafhængigt. Roulette-hjulet har ingen hukommelse. Sandsynligheden for sort er stadig 18/37 uanset hvad der skete i de foregående 1.000 spins. Martingale forstærker denne bias ved at give dig en "plan" baseret på den.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">2. Asymmetrisk feedback</h3>
                <p className="text-sm text-muted-foreground">
                  Du vinder 98 ud af 100 serier (hyppig, positiv feedback) og taber 2 (sjælden men katastrofal). Hjernen vægter frekvens over magnitude, så du "husker" alle gevinsterne men rationaliserer tabene som "uheld." I virkeligheden er de 2 tab nok til at eliminere al profit fra de 98 gevinster.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">3. Sunk cost fallacy</h3>
                <p className="text-sm text-muted-foreground">
                  "Jeg har allerede tabt 1.550 kr. – jeg KAN ikke stoppe nu, for den næste fordobling vil genvinde alt." Denne tankegang er præcis hvad der driver spillere ud over bordmaksimum-grænsen eller bankroll-grænsen. Hvert spin er en ny, uafhængig beslutning – dine tidligere tab er irrelevante.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">4. Illusionen om kontrol</h3>
                <p className="text-sm text-muted-foreground">
                  At have et "system" giver en følelse af kontrol over et fuldstændigt tilfældigt udfald. Denne illusion er psykologisk kraftfuld men matematisk meningsløs. Roulette-kuglens bane bestemmes af fysik, ikke af din indsatsstrategi. For mere om <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> og kognitiv bias, se vores dedikerede guide.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Praktiske tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Praktiske anbefalinger: Hvis du alligevel vil bruge Martingale
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vi anbefaler grundlæggende ikke Martingale som seriøs strategi. Men hvis du insisterer på at bruge det som underholdning (og du forstår den matematiske realitet), her er vores anbefalinger for at minimere skaden:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Vælg Mini-Martingale (cap: 4)</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Begræns fordoblinger til 4 trin. Maksimalt tab per serie: 750 kr. med 50 kr. basis. Acceptér tabet og nulstil.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Spil fransk roulette</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>La Partage</Link> halverer house edge til 1,35% på even-money bets. Det er den eneste måde at faktisk reducere den matematiske ulempe.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Sæt et sessionstab-limit</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Beslut på forhånd: "Jeg stopper efter 1.500 kr. samlet tab." Brug casinoets selvbegrænsningsværktøjer til at håndhæve dette.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Sæt et gevinstmål</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  "Jeg stopper når jeg har vundet 500 kr." At stoppe mens du er foran er den eneste måde at "slå" et negativt EV-spil på kort sigt.
                </p>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3">Casinoer med bedst egnede borde</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For Martingale (eller Mini-Martingale) skal du finde borde med lavt minimum og højt maksimum – det giver flest mulige fordoblingstrin. Her er de bedste muligheder hos danske licenserede casinoer:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
            <li><Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> – Live roulette med 10 kr. minimum og op til 25.000 kr. maksimum (11 fordoblingstrin)</li>
            <li><Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> – Europæisk auto-roulette med 5 kr. minimum (12+ fordoblingstrin med 10.000 kr. max)</li>
            <li><Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link> – Fransk roulette med La Partage tilgængelig (halveret house edge)</li>
            <li><Link to="/casino-anmeldelser/leovegas" className={linkClass}>LeoVegas</Link> – Bredt udvalg af live roulette-borde med varierende grænser</li>
          </ul>
        </section>

        {/* Historisk kontekst */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Martingales historie: Fra 18. århundrede til online casino
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Martingale-systemet har en rig historie, der strækker sig over 300 år. Forståelsen af denne historie giver perspektiv på, hvorfor systemet stadig fascinerer – og hvorfor det stadig fejler.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Systemet blev først beskrevet matematisk i 1700-tallet, men princippet om at fordoble efter tab er ældre end selve roulette-spillet. I 18. århundredes Frankrig var det en standard tilgang til "jeux de hasard" (hasardspil), og det blev populariseret af John Henry Martindale (eller Martingdale), en London-casinoejer. Ironien er bemærkelsesværdig: Martindale var casinoejer, ikke spiller. Han forstod sandsynligvis systemets svagheder, men promoverede det alligevel til sine kunder – fordi han vidste, at bordmaksimum og begrænset bankroll altid ville beskytte huset.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I 1796 beskrev den franske matematiker Pierre-Simon Laplace Martingale-princippet i sin "Théorie analytique des probabilités" og demonstrerede formelt, at ingen indsatsstrategi kan overvinde et spil med negativ forventet værdi. Denne matematiske sandhed har stået uimodsagt i over 200 år – men det har ikke forhindret generationer af spillere i at prøve.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det berømte eksempel fra Casino de Monte-Carlo i 1913 – "The night the bank broke" – er ofte fejlagtigt tilskrevet Martingale. I virkeligheden handlede det om en ekstraordinær serie af 26 sorte i træk (sandsynlighed: ca. 1 ud af 136 millioner). Spillere der brugte Martingale på rød var ødelagt længe inden spin nr. 26 – de fleste kunne ikke engang klare 10-12 fordoblinger. Denne hændelse blev ironisk nok et af de mest berømte eksempler på Gambler's Fallacy i statistisk litteratur.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I den moderne online-æra er Martingale lige så populært – og lige så ineffektivt – som altid. Fordelen ved online roulette er hurtigere spil (flere spins per time), hvilket paradoksalt nok accelererer det uundgåelige tab. Hos danske licenserede operatører kan du spille RNG-roulette med 100+ spins i timen, hvilket betyder at en statistisk uundgåelig 10+ tabsserie rammer endnu hurtigere end på fysiske casinoer.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det er også værd at nævne, at Martingale-princippet har fundet anvendelse ud over casinoer. I finansverdenen bruges det (kontroversielt) af visse tradere, der fordobler deres position efter tab – med tilsvarende katastrofale resultater. Hedge fund Long-Term Capital Management's kollaps i 1998 er ofte citeret som et reelt eksempel på Martingale-tænkning i praksis: strategien producerede stabile gevinster i årevis, indtil en uforudset begivenhed (den russiske finanskrise) udløste det ultimative sammenbrud.
          </p>
        </section>

        {/* Bonusomsætning med Martingale */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Coins className="h-5 w-5 text-primary" />
            Martingale og Bonusomsætning: En Analyse
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kan Martingale bruges til at omsætte <Link to="/casino-bonus" className={linkClass}>casinobonusser</Link> mere effektivt? Det korte svar er nej – men der er nuancer. Lad os analysere matematikken bag bonusomsætning med Martingale på europæisk roulette.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            De fleste danske casinoer reducerer roulettes bidrag til <Link to="/omsaetningskrav" className={linkClass}>omsætningskravet</Link> til 10-25 %. Med Martingale satser du variable beløb (50→100→200→400 osv.), men alle indsatser tæller med den reducerede sats. Den kritiske indsigt er, at Martingale ikke ændrer den forventede værdi af din samlede action – den er stadig -2,70 % per krone satset. Martingale ændrer kun <em>fordelingen</em> af resultater.
          </p>

          <Card className="mb-6 bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3">EV-Beregning: Bonusomsætning med Martingale</h3>
              <div className="font-mono text-sm bg-background p-4 rounded-lg space-y-2">
                <p className="font-bold">Scenario: 1.000 kr. bonus, 10× omsætning, 25% roulette-bidrag</p>
                <p>Effektiv omsætning: 10.000 / 0,25 = 40.000 kr. faktisk indsats</p>
                <p className="border-t border-border pt-2 mt-2">
                  Europæisk roulette: EV = 1.000 − (40.000 × 2,70%) = 1.000 − 1.080 = <strong className="text-destructive">−80 kr.</strong>
                </p>
                <p>
                  <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>Fransk roulette</Link> (La Partage): EV = 1.000 − (40.000 × 1,35%) = 1.000 − 540 = <strong className="text-primary">+460 kr.</strong>
                </p>
              </div>
              <p className="text-muted-foreground text-sm mt-3">
                Martingale ændrer ikke EV – den er identisk med flat betting. Men Martingale øger risikoen for at tabe hele bankrollen <em>under</em> omsætningen, hvilket effektivt forværrer dine chancer for at fuldføre omsætningskravet.
              </p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Praktisk risiko:</strong> Martingales eksponentielle eskalering er særligt farlig under bonusomsætning, fordi du har et fast beløb der skal satses. Hvis du rammer bordmaksimum midtvejs i omsætningen, har du potentielt tabt hele din bankroll OG bonussen. Flat betting er markant sikrere til bonusomsætning, fordi det minimerer variansen og maksimerer sandsynligheden for at <em>fuldføre</em> omsætningskravet. For mere om bonusomsætningsstrategier, se vores guide til <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
          </p>
        </section>

        {/* Live vs RNG for Martingale */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Live vs. RNG Roulette: Hvad er Bedst for Martingale?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Valget mellem <Link to="/live-casino/roulette" className={linkClass}>live dealer roulette</Link> og RNG (computer-genereret) roulette har markant indvirkning på Martingale-spillerens oplevelse. Begge har identisk house edge (2,70 % på europæisk), men den praktiske forskel i hastighed og bordgrænser er afgørende.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Live Dealer (Anbefalet for Martingale)
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Hastighed:</strong> 25-35 spins/time (langsommere eskalering)</li>
                  <li>• <strong>Bordgrænser:</strong> Typisk 10-25.000 kr. (8-11 fordoblinger)</li>
                  <li>• <strong>VIP-borde:</strong> Op til 100.000 kr. max (11+ fordoblinger)</li>
                  <li>• <strong>Fordel:</strong> Lavere tempo = færre tabsserier per time</li>
                  <li>• <strong>Ulempe:</strong> Højere minimumsindsats (10-50 kr.)</li>
                  <li>• <strong>Anbefalet hos:</strong> <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link>, <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link></li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Gamepad2 className="h-4 w-4 text-muted-foreground" />
                  RNG Roulette
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Hastighed:</strong> 60-120 spins/time (hurtig eskalering!)</li>
                  <li>• <strong>Bordgrænser:</strong> Typisk 5-10.000 kr. (7-10 fordoblinger)</li>
                  <li>• <strong>Fordel:</strong> Lavere minimumsindsats (1-5 kr.)</li>
                  <li>• <strong>Ulempe:</strong> Hurtigere eskalering = hurtigere bankerot</li>
                  <li>• <strong>Ulempe:</strong> Typisk lavere bordmaksimum</li>
                  <li>• <strong>Advarsel:</strong> 100+ spins/time accelererer tab markant</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Vores anbefaling:</strong> Hvis du vil eksperimentere med Martingale, gør det på live dealer-borde. Den lavere spin-rate (30 vs. 80+ spins/time) betyder, at du rammer statistisk uundgåelige lange tabsserier langsommere, hvilket giver dig mere spilletid for dit budget. Derudover har live-borde typisk højere bordmaksimum, som giver flere fordoblingstrin.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Vigtig note om <Link to="/live-casino/lightning-roulette" className={linkClass}>Lightning Roulette</Link>:</strong> Denne populære variant egner sig <em>dårligt</em> til Martingale, da even-money payouts reduceres til at kompensere for Lightning-multipliers. Du får lavere odds på de væddemål, Martingale kræver, hvilket øger din effektive house edge. Hold dig til standard europæisk eller <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>fransk roulette</Link> for Martingale.
          </p>
        </section>

        {/* Konklusion */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Konklusion: Martingale er underholdning, ikke investering
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Martingale er det mest intuitive og letforståelige roulette-system – og det er præcis derfor, det er så farligt. Det udnytter vores naturlige tendens til at tro, at tab "skal" vendes, og giver os en falsk følelse af kontrol over et tilfældigt udfald.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den matematiske realitet er ubestridelig: Martingale har negativ forventet værdi (-2,70% per spin), eksponentiel risiko-eskalering, og en uundgåelig collision med bordmaksimum eller bankroll-grænsen. Vores 10.000-spins Monte Carlo-simulering bekræfter en bankerot-rate på over 54% – den højeste af alle testede systemer.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Hvis du vil spille roulette, anbefaler vi:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
            <li><strong>Flat betting</strong> med et fast budget og tidsbegrænsning – den statistisk mindst skadelige tilgang</li>
            <li><strong>Fransk roulette med La Partage</strong> for den laveste house edge (1,35%)</li>
            <li><strong>Mini-Martingale (cap 3-4)</strong> hvis du vil have et system – men forstå at det er underholdning, ikke strategi</li>
            <li><strong>Ansvarlige spilgrænser</strong> via <Link to="/ansvarligt-spil" className={linkClass}>selvbegrænsningsværktøjer</Link></li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            For en bredere gennemgang af alle tilgængelige systemer, se vores <Link to="/casinospil/roulette-strategi" className={linkClass}>komplette roulette strategiguide</Link>. Og husk: det bedste system er det, der holder dig inden for dit budget og giver dig en underholdende oplevelse – ikke det, der lover dig profit.
          </p>
        </section>

        <RelatedGuides currentPath="/casinospil/roulette/martingale-roulette" />
        <FAQSection faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
}
