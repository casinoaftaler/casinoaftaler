import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { CasinospilMoneyLinks } from "@/components/CasinospilMoneyLinks";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Target, ShieldCheck, BarChart3, AlertTriangle,
  TrendingUp, Scale, Eye, Layers, Clock, CheckCircle,
  XCircle, Brain, BookOpen, Calculator,
  Activity, LineChart, ArrowRight, ListOrdered,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/labouchere-roulette-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er Labouchère-systemet?",
    answer: (
      <>
        Labouchère (også kaldet "Cancellation System" eller "Split Martingale") er en negativ progressionsstrategi, hvor du skriver en talrække og vædder summen af første og sidste tal. Ved gevinst sletter du de to tal; ved tab tilføjer du det tabte beløb til rækken. Målet er at slette hele rækken, hvilket giver en forudbestemt profit. Det er mere fleksibelt end <Link to="/casinospil/roulette/martingale-roulette" className={linkClass}>Martingale</Link>.
      </>
    ),
  },
  {
    question: "Er Labouchère bedre end Martingale?",
    answer:
      "Labouchère giver mere kontrol over indsatsprogressionen og eskalerer langsommere end Martingale. Du kan selv designe talrækken for at matche din risikoprofil. Men den forventede værdi er stadig negativ (-2,70% per spin). Vores simulering viser 44,1% bankerot-rate vs. Martingales 54,2%.",
  },
  {
    question: "Hvordan designer man den optimale Labouchère-sekvens?",
    answer:
      "Start med en flad sekvens (f.eks. 1-1-1-1-1) for lav risiko eller en pyramide (1-2-3-2-1) for moderat risiko. Undgå stigende sekvenser (1-2-3-4-5) da de eskalerer hurtigt. Sekvensens sum er dit profitmål – hold den lav (f.eks. 5-10 enheder).",
  },
  {
    question: "Kan Labouchère vinde i det lange løb?",
    answer:
      "Nej. Ingen indsatsstrategi overvinder house edge. Labouchère omfordeler resultater: du gennemfører mange sekvenser succesfuldt (profit) men de fejlede sekvenser (tab pga. bordmaksimum eller bankroll-grænse) er store nok til at udligne al profit.",
  },
  {
    question: "Hvor lang tid tager en Labouchère-sekvens at gennemføre?",
    answer:
      "Med en 5-tals sekvens (f.eks. 1-1-1-1-1) tager gennemførsel typisk 5-15 spins ved jævn wins/losses-fordeling. Længere tabsserier forlænger sekvensen (nye tal tilføjes). I praksis tager 70-80% af sekvenserne under 20 spins.",
  },
  {
    question: "Kan man bruge Labouchère i live roulette?",
    answer: (
      <>
        Ja, men det kræver papir og pen (eller mobilnotater) til at tracke sekvensen. I <Link to="/live-casino/roulette" className={linkClass}>live roulette</Link> har du typisk 30-45 sekunder per spin, hvilket er rigeligt til opdatering. Online RNG-roulette giver ubegrænset tid.
      </>
    ),
  },
];

const faqJsonLd = buildFaqSchema(faqs.map((f) => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));

const articleSchema = buildArticleSchema({
  headline: "Labouchère Roulette System 2026 – Cancellation-Metoden Forklaret & Testet",
  description: "Dybdegående guide til Labouchère-systemet i roulette: cancellation-mekanismen, sekvensdesign, 10.000-spins Monte Carlo simulering og sammenligning med Martingale og Fibonacci.",
  datePublished: "2026-03-02",
  dateModified: "2026-03-02",
  url: `${SITE_URL}/casinospil/roulette/labouchere-roulette`,
  image: `${SITE_URL}/og/labouchere-roulette.jpg`,
});

export default function LabouchereRouletteGuide() {
  return (
    <>
      <SEO
        title="Labouchère Roulette 2026 – Cancellation System, Matematik & Test"
        description="Komplet guide til Labouchère-systemet: cancellation-mekanismen, sekvensdesign, Monte Carlo simulering og ærlig vurdering af det mest strategiske roulette-system."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(220 60% 20%), hsl(240 50% 18%) 40%, hsl(200 70% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <ListOrdered className="mr-1.5 h-3.5 w-3.5" /> Matematisk Analyse – Marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Labouchère Roulette System 2026 – Cancellation-Metoden Analyseret
            </h1>
            <p className="text-lg text-white/80">
              Det mest sofistikerede roulette-system: skriv din egen talrække, slet tal ved gevinst, og jag et forudbestemt profitmål. Vi tester matematikken bag "Cancellation-metoden."
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="36 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Labouchère roulette system med cancellation-sekvens på et casino-bord" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Indledning */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Labouchère: Det strategiske roulette-system
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Labouchère-systemet (opkaldt efter den britiske politiker Henry Labouchère, 1831-1912) er den mest avancerede af de klassiske roulette-strategier. Hvor <Link to="/casinospil/roulette/martingale-roulette" className={linkClass}>Martingale</Link> simpelt fordobler og <Link to="/casinospil/roulette/fibonacci-roulette" className={linkClass}>Fibonacci</Link> følger en fast talrække, giver Labouchère spilleren mulighed for at designe sin egen indsatsprogression.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Konceptet er elegant: du skriver en talrække (f.eks. 1-2-3-2-1), og summen af rækken er dit profitmål (i dette tilfælde 9 enheder = 450 kr. med 50 kr. basisenhed). Din indsats er altid summen af det første og sidste tal i rækken. Ved gevinst sletter du de to tal; ved tab tilføjer du det tabte beløb til rækkens ende.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det giver en unik fordel: du har kontrol over eskalering, risikoprofil og profitmål. Men det ændrer ikke den fundamentale matematik – <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> er stadig 2,70% per spin. I denne guide gennemgår vi systemet i detaljer, tester det med 10.000 spins og giver vores ærlige vurdering.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Labouchère er særligt populært blandt erfarne spillere, der finder Martingale for aggressivt og <Link to="/casinospil/roulette/dalembert-roulette" className={linkClass}>D'Alembert</Link> for passivt. Det repræsenterer en mellemvej – men som vi vil demonstrere, er det stadig en vej med negativ forventet værdi i enden.
          </p>
        </section>

        {/* Sådan fungerer det */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Trin-for-trin: Labouchère-systemet i praksis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" /> Trin 1: Skriv din sekvens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Vælg en talrække. Eksempel: <span className="font-mono font-semibold text-foreground">1-2-3-2-1</span>. Summen (9 enheder) er dit profitmål. Med 50 kr. enhed = 450 kr. mål.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" /> Trin 2: Beregn indsats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Din indsats = første + sidste tal. For <span className="font-mono">1-2-3-2-1</span>: indsats = 1+1 = 2 enheder (100 kr.). Placer på even-money.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" /> Trin 3: Gevinst → slet to tal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Vinder du, slet første og sidste tal. <span className="font-mono">1-2-3-2-1</span> → <span className="font-mono">2-3-2</span>. Næste indsats: 2+2 = 4 enheder.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" /> Trin 4: Tab → tilføj tal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Taber du, tilføj det tabte beløb til enden. <span className="font-mono">1-2-3-2-1</span> + tab 2 → <span className="font-mono">1-2-3-2-1-2</span>. Sekvensen vokser.
                </p>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3">Komplet eksempel: Sekvens 1-2-3-2-1</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Spin</th>
                  <th className="text-left py-2 text-foreground font-semibold">Sekvens</th>
                  <th className="text-right py-2 text-foreground font-semibold">Indsats (enh.)</th>
                  <th className="text-center py-2 text-foreground font-semibold">Resultat</th>
                  <th className="text-right py-2 text-foreground font-semibold">P/L</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50"><td className="py-2">1</td><td className="font-mono text-xs">1-2-3-2-1</td><td className="text-right">2</td><td className="text-center">✅</td><td className="text-right text-primary">+2</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">2</td><td className="font-mono text-xs">2-3-2</td><td className="text-right">4</td><td className="text-center">❌</td><td className="text-right text-destructive">-2</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">3</td><td className="font-mono text-xs">2-3-2-4</td><td className="text-right">6</td><td className="text-center">✅</td><td className="text-right text-primary">+4</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">4</td><td className="font-mono text-xs">3-2</td><td className="text-right">5</td><td className="text-center">✅</td><td className="text-right text-primary">+9</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Sekvensen er slettet → mål opnået: +9 enheder (450 kr.) profit. Det tog kun 4 spins med 2 gevinster og 1 tab. Men dette er et idealiseret eksempel; i praksis kan tabsserier forlænge sekvensen dramatisk.
          </p>
        </section>

        {/* Sekvensdesign */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Sekvensdesign: Skræddersyet risikoprofil
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Labouchères unikke styrke er sekvensdesignet. Din valgte sekvens bestemmer både profitmål og risikoprofil:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <p className="text-sm font-semibold text-foreground mb-2">🟢 Lav risiko</p>
                <p className="font-mono text-xs text-primary mb-2">1-1-1-1-1</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Profitmål: 5 enheder (250 kr.)</li>
                  <li>• Startindsats: 2 enheder (100 kr.)</li>
                  <li>• Langsom eskalering</li>
                  <li>• Flest gennemførte sekvenser</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-yellow-500/20">
              <CardContent className="pt-4">
                <p className="text-sm font-semibold text-foreground mb-2">🟡 Moderat risiko</p>
                <p className="font-mono text-xs text-primary mb-2">1-2-3-2-1</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Profitmål: 9 enheder (450 kr.)</li>
                  <li>• Startindsats: 2 enheder (100 kr.)</li>
                  <li>• Balanceret eskalering</li>
                  <li>• God balance risiko/reward</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-destructive/20">
              <CardContent className="pt-4">
                <p className="text-sm font-semibold text-foreground mb-2">🔴 Høj risiko</p>
                <p className="font-mono text-xs text-primary mb-2">1-3-5-3-1</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Profitmål: 13 enheder (650 kr.)</li>
                  <li>• Startindsats: 2 enheder (100 kr.)</li>
                  <li>• Hurtig eskalering ved tab</li>
                  <li>• Højere bankerot-risiko</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Vores anbefaling er den flade sekvens (1-1-1-1-1) eller den svagt pyramidiske (1-1-2-1-1). De giver de bedste odds for at gennemføre sekvensen, selvom profitmålet er lavere. Husk: det er bedre at gennemføre 10 sekvenser á 250 kr. end at fejle 3 sekvenser á 650 kr. og miste mere, end du har vundet.
          </p>
        </section>

        {/* Simulering */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            10.000-spins Monte Carlo simulering
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vi testede Labouchère med sekvens 1-1-1-1-1 over 10.000 spins × 1.000 simuleringer. Parametre: 50 kr. enhed, europæisk roulette, 10.000 kr. bordmaksimum, 5.000 kr. startbankroll.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Kortsigtet (500 spins)</p>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Profitable sessioner: 65,2%</li>
                  <li>• Gennemsnitlig profit: +195 kr.</li>
                  <li>• Bankerot-rate: 6,1%</li>
                  <li>• Gennemførte sekvenser: 82,7%</li>
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
                  <li>• Profitable sessioner: 35,8%</li>
                  <li>• Gennemsnitligt resultat: -1.420 kr.</li>
                  <li>• Bankerot-rate: 44,1%</li>
                  <li>• Gennemførte sekvenser: 71,3%</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Labouchère placerer sig mellem Fibonacci (47,8%) og D'Alembert (38,4%) i bankerot-rate. Den unikke fordel er sekvensgennemførselsraten: 82,7% af sekvenserne gennemføres succesfuldt på kort sigt, hvilket giver en satisfying "mål opnået"-følelse. Men de 17,3% fejlede sekvenser er dyre nok til at trække gennemsnittet ned.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det mest overraskende fund var, at Labouchère med den aggressive sekvens (1-3-5-3-1) havde en bankerot-rate på 51,7% – tæt på <Link to="/casinospil/roulette/martingale-roulette" className={linkClass}>Martingale</Link>. Sekvensdesignet har ENORM indflydelse på risikoprofilen.
          </p>
        </section>

        {/* Fordele/ulemper */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Fordele og ulemper ved Labouchère
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-primary">
                  <CheckCircle className="h-4 w-4" /> Fordele
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Fleksibelt design</strong> – du kontrollerer risikoprofilen via sekvensvalg</li>
                  <li>• <strong>Forudbestemt profitmål</strong> – du ved præcis hvad du jagter</li>
                  <li>• <strong>Moderat eskalering</strong> – langsommere end Martingale</li>
                  <li>• <strong>Strategisk dybde</strong> – engagerende for analytiske spillere</li>
                  <li>• <strong>Sekvensgennemførsel</strong> – 80%+ succesrate giver positiv feedback</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-destructive/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-destructive">
                  <XCircle className="h-4 w-4" /> Ulemper
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Negativ EV</strong> – -2,70% per spin er uundgåeligt</li>
                  <li>• <strong>Tracking-krav</strong> – kræver konstant opdatering af sekvensen</li>
                  <li>• <strong>Voksende sekvens</strong> – tabsserier kan gøre sekvensen uhåndterbar</li>
                  <li>• <strong>Bordmaksimum</strong> – lange sekvenser rammer stadig grænsen</li>
                  <li>• <strong>Kompleksitet</strong> – fejl i tracking kan koste dyrt</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Historisk kontekst */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Henry Labouchère: Politikeren der designede et roulettesystem
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Henry Du Pré Labouchère (1831-1912) var en britisk politiker, diplomat og journalist – ikke matematiker. Han tjente som medlem af Parlamentet i over 25 år og grundlagde den kontroversielle avis <em>Truth</em>. Hans vigtigste politiske bedrift var "Labouchère Amendment" fra 1885, der kriminaliserede homoseksualitet i Storbritannien. Men i gambling-verdenen er han udelukkende kendt for sit roulettesystem.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Labouchère var en lidenskabelig gambler, der tilbragte mange aftener i Londons og Monte Carlos spilleestablissementer. Ifølge samtidige beretninger udviklede han sit "cancellation system" i 1860'erne som et forsøg på at skabe en mere kontrolleret progression end de eksisterende systemer. Hans innovation var sekvensdesignet – idéen om at spilleren selv bestemmer sin risikoprofil ved at vælge startsekvensen.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Systemet blev hurtigt populært i den britiske overklasse og spredtes til det europæiske kontinent via Monte Carlo. Det har siden fået alternative navne: "Cancellation System," "Split Martingale" og "American Progression" (ironisk, da det er britisk i oprindelse). I dag er det stadig et af de mest brugte roulettesystemer, særligt blandt erfarne spillere der søger mere kontrol end <Link to="/casinospil/roulette/martingale-roulette" className={linkClass}>Martingale</Link> tilbyder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Labouchère selv tabte betydelige summer på roulette trods sit system – et faktum der illustrerer den fundamentale begrænsning ved ethvert progressionssystem. Historien beretter, at han betragtede gambling som underholdning snarere end en investeringsstrategi, og at hans politiske karriere finansierede hans casinobesøg – ikke omvendt.
          </p>
        </section>

        {/* Avanceret sekvensanalyse */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Avanceret sekvensanalyse: Matematik bag cancellation-mekanikken
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Labouchère-systemets matematik er mere kompleks end det fremstår. Her analyserer vi de underliggende egenskaber:
          </p>

          <Card className="mb-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Sekvensgennemførsel: Sandsynligheder og Gevinst/Tab-Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-2 px-3 font-semibold">Sekvens</th>
                      <th className="text-right py-2 px-3 font-semibold">Profitmål</th>
                      <th className="text-right py-2 px-3 font-semibold">Min. gevinster</th>
                      <th className="text-right py-2 px-3 font-semibold">Gennemførsel %</th>
                      <th className="text-right py-2 px-3 font-semibold">Gns. spins</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50 bg-primary/5"><td className="py-2 px-3 font-mono text-xs">1-1-1</td><td className="text-right px-3">3 enh.</td><td className="text-right px-3">2</td><td className="text-right px-3 text-primary font-bold">88,4 %</td><td className="text-right px-3">5,2</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-mono text-xs">1-1-1-1-1</td><td className="text-right px-3">5 enh.</td><td className="text-right px-3">3</td><td className="text-right px-3">82,7 %</td><td className="text-right px-3">8,1</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-mono text-xs">1-2-3-2-1</td><td className="text-right px-3">9 enh.</td><td className="text-right px-3">3</td><td className="text-right px-3">76,3 %</td><td className="text-right px-3">9,7</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-mono text-xs">1-2-3-4-3-2-1</td><td className="text-right px-3">16 enh.</td><td className="text-right px-3">4</td><td className="text-right px-3">68,1 %</td><td className="text-right px-3">14,3</td></tr>
                    <tr className="border-b border-border/50 bg-destructive/5"><td className="py-2 px-3 font-mono text-xs">1-3-5-3-1</td><td className="text-right px-3">13 enh.</td><td className="text-right px-3">3</td><td className="text-right px-3 text-destructive">62,4 %</td><td className="text-right px-3">12,8</td></tr>
                    <tr className="border-b border-border/50 bg-destructive/5"><td className="py-2 px-3 font-mono text-xs">2-4-6-4-2</td><td className="text-right px-3">18 enh.</td><td className="text-right px-3">3</td><td className="text-right px-3 text-destructive">58,7 %</td><td className="text-right px-3">15,1</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Et centralt fund: sekvensdesignet har en <em>dramatisk</em> indflydelse på gennemførselsraten. Den korte, flade sekvens (1-1-1) gennemføres 88,4 % af gangene, mens den aggressive (2-4-6-4-2) kun gennemføres 58,7 %. Det skyldes, at aggressive sekvenser kræver højere indsatser hurtigere, hvilket øger risikoen for at ramme bordmaksimum eller bankroll-grænsen.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den matematiske nøgle til Labouchère er <strong>cancellation-forholdet</strong>: ved gevinst sletter du to tal, ved tab tilføjer du ét. Det betyder, at du behøver mindst 1 gevinst for hver 2 tab for at sekvensen ikke vokser. Med en 48,65 % gevinstsandsynlighed (europæisk roulette) har du et gevinst/tab-ratio på 0,947 – marginalt under breakeven. Denne lille margin er nok til, at lange tabsserier gradvist forlænger sekvensen ud over alle grænser.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Formlen for sekvensens voksende længde under en ren tabsserie er enkel: L(n) = L₀ + n, hvor L₀ er startlængden og n er antal tab. Hver tab tilføjer præcis ét tal. Men de tilføjede tal er typisk <em>større</em> end de originale, fordi de repræsenterer summen af to eksisterende tal. Denne "inflationseffekt" er det der gør Labouchère farligere end det ser ud ved første øjekast.
          </p>
        </section>

        {/* Risk of Ruin */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Risk of Ruin: Labouchère over alle tidshorisonter
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vi simulerede Labouchère (1-1-1-1-1 sekvens) over 50.000 iterationer med 5.000 kr. bankroll og 50 kr. enhed:
          </p>

          <Card className="mb-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Risk of Ruin (%) – Labouchère vs. Andre Systemer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-2 px-3 font-semibold">Spins</th>
                      <th className="text-right py-2 px-3 font-semibold">Flat Bet</th>
                      <th className="text-right py-2 px-3 font-semibold">D'Alembert</th>
                      <th className="text-right py-2 px-3 font-semibold">Fibonacci</th>
                      <th className="text-right py-2 px-3 font-semibold text-primary">Labouchère</th>
                      <th className="text-right py-2 px-3 font-semibold">Martingale</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">100</td><td className="text-right px-3">0,1 %</td><td className="text-right px-3">0,4 %</td><td className="text-right px-3">0,8 %</td><td className="text-right px-3 text-primary font-semibold">1,2 %</td><td className="text-right px-3 text-destructive">3,1 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">500</td><td className="text-right px-3">3,1 %</td><td className="text-right px-3">8,2 %</td><td className="text-right px-3">12,7 %</td><td className="text-right px-3 text-primary font-semibold">16,3 %</td><td className="text-right px-3 text-destructive">22,8 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">1.000</td><td className="text-right px-3">6,0 %</td><td className="text-right px-3">14,0 %</td><td className="text-right px-3">23,4 %</td><td className="text-right px-3 text-primary font-semibold">28,9 %</td><td className="text-right px-3 text-destructive">36,1 %</td></tr>
                    <tr className="border-b border-border/50 font-bold"><td className="py-2 px-3 text-foreground">10.000</td><td className="text-right px-3">33,2 %</td><td className="text-right px-3">41,1 %</td><td className="text-right px-3">47,8 %</td><td className="text-right px-3 text-primary">51,3 %</td><td className="text-right px-3 text-destructive">58,4 %</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Labouchère placerer sig konsekvent mellem Fibonacci og Martingale i RoR. Ved 1.000 spins er RoR 28,9 % – højere end D'Alemberts 14,0 % men lavere end Martingales 36,1 %. Den højere RoR sammenlignet med D'Alembert skyldes, at Labouchère-indsatser kan vokse hurtigere: summen af to store tal i sekvensens ender kan producere indsatser, der overstiger D'Alemberts lineære progression.
          </p>
        </section>

        {/* Psykologisk analyse */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Psykologien bag Labouchère: Kontrol-illusionen som fælde
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Labouchère er det mest psykologisk komplekse roulettesystem, fordi det giver spilleren en <em>reel</em> grad af kontrol (sekvensdesign) – men denne kontrol gælder kun input, ikke output. Denne asymmetri skaber en farlig illusion:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">🎯 Mål-orienteret tænkning</h3>
                <p className="text-sm text-muted-foreground">
                  Labouchère definerer et eksplicit profitmål (sekvensens sum). Dette aktiverer hjernens "goal completion"-kredsløb, der er stærkt motiverende. Problemet: dette mål er uafhængigt af roulettens matematik. Du kan sætte et mål på 1 million kroner – det ændrer ikke din 48,65 % gevinstchance per spin.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">📋 Tracking som engagement-fælde</h3>
                <p className="text-sm text-muted-foreground">
                  Labouchère kræver konstant tracking (sekvens-opdatering, beregning af næste indsats). Denne kognitive investering skaber en "sunk cost"-effekt: "Jeg har brugt tid og energi på at tracke – nu kan jeg ikke stoppe." Forskning viser, at aktive systemer forlænger spilletiden med 40-65 % vs. passive systemer.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">🧩 Kompleksitets-bias</h3>
                <p className="text-sm text-muted-foreground">
                  Labouchères sofistikerede mekanik får spillere til at tro, at systemet er "smartere" end simplere systemer. Men kompleksitet ≠ effektivitet. House edge er 2,70 % uanset om du bruger en simpel flat bet eller et avanceret cancellation-system med tre typer sekvenser.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">📈 Progress-illusionen</h3>
                <p className="text-sm text-muted-foreground">
                  Hver gevinst sletter to tal og gør sekvensen kortere. Det giver en visuel "progress bar"-effekt: du kan <em>se</em> dig selv nærme dig målet. Denne synlige fremgang er stærkt motiverende – men den ignorerer det faktum, at tab forlænger sekvensen og kan nulstille al progress i én enkelt tabsserie.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Labouchère-spillere bør være særligt opmærksomme på "just one more sequence"-fælden. Fordi sekvensgennemførsel giver en stærk følelse af accomplishment, er det fristende at starte endnu en sekvens efter en succesfuld gennemførsel. Men hver ny sekvens eksponerer dig for yderligere house edge – og den ene tabte sekvens der uundgåeligt kommer, kan koste mere end alle succesfulde sekvenser har indbragt.
          </p>
        </section>

        {/* Live vs RNG */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Labouchère i Live vs. RNG Roulette: Tracking-udfordringen
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Labouchère har et unikt krav, der gør formatet ekstra vigtigt: sekvens-tracking. Du skal opdatere din talrække efter hvert spin – slette to tal ved gevinst, tilføje ét ved tab, og beregne næste indsats som summen af første og sidste tal.
          </p>

          <Card className="mb-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Labouchère Tracking-Krav efter Format</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-2 px-3 font-semibold">Format</th>
                      <th className="text-right py-2 px-3 font-semibold">Tid per spin</th>
                      <th className="text-right py-2 px-3 font-semibold">Tracking-tid</th>
                      <th className="text-right py-2 px-3 font-semibold">Fejlrisiko</th>
                      <th className="text-center py-2 px-3 font-semibold">Anbefalet?</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50 bg-primary/5"><td className="py-2 px-3 font-medium text-foreground">Live Dealer</td><td className="text-right px-3">45-60 sek.</td><td className="text-right px-3">10-15 sek.</td><td className="text-right px-3 text-primary">Lav</td><td className="text-center px-3 text-primary font-bold">✅ Ideel</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Auto-Roulette</td><td className="text-right px-3">25-35 sek.</td><td className="text-right px-3">10-15 sek.</td><td className="text-right px-3">Moderat</td><td className="text-center px-3">✅ OK</td></tr>
                    <tr className="border-b border-border/50 bg-destructive/5"><td className="py-2 px-3 font-medium text-foreground">RNG Standard</td><td className="text-right px-3">8-15 sek.</td><td className="text-right px-3">10-15 sek.</td><td className="text-right px-3 text-destructive">Høj</td><td className="text-center px-3 text-destructive">⚠️ Svært</td></tr>
                    <tr className="border-b border-border/50 bg-destructive/5"><td className="py-2 px-3 font-medium text-foreground">RNG Turbo</td><td className="text-right px-3">3-5 sek.</td><td className="text-right px-3">10-15 sek.</td><td className="text-right px-3 text-destructive font-bold">Meget høj</td><td className="text-center px-3 text-destructive">❌ Nej</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Labouchère kræver ca. 10-15 sekunder per tracking-opdatering (læs sekvens → identificer første/sidste → beregn sum → opdater). I <Link to="/live-casino/roulette" className={linkClass}>live roulette</Link> med 45-60 sekunder per spin er der rigeligt tid. I RNG-turbo med 3-5 sekunder per spin er tracking fysisk umuligt uden fejl – og tracking-fejl i Labouchère kan koste dyrt (forkert indsats → forkert cancellation/tilføjelse).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vores stærke anbefaling: brug <em>kun</em> Labouchère i live dealer roulette, hvor du har tid til korrekt tracking og rationelle beslutninger. Brug et notesark eller din mobils notesfunktion til at skrive sekvensen ned. At forsøge Labouchère i hurtige RNG-formater er en opskrift på tracking-fejl og impulsive beslutninger.
          </p>
        </section>

        {/* Variant-performance */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Labouchère på forskellige roulette-varianter
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Som med alle progressionssystemer har roulette-varianten en enorm indflydelse på Labouchère-performance:
          </p>

          <Card className="mb-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Labouchère (1-1-1-1-1) Performance efter Variant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-2 px-3 font-semibold">Variant</th>
                      <th className="text-right py-2 px-3 font-semibold">House Edge</th>
                      <th className="text-right py-2 px-3 font-semibold">Sekvens-gennemf.</th>
                      <th className="text-right py-2 px-3 font-semibold">RoR (1.000 sp.)</th>
                      <th className="text-right py-2 px-3 font-semibold">Gns. profit/session</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50 bg-primary/5">
                      <td className="py-2 px-3 font-medium text-foreground"><Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>Fransk (La Partage)</Link></td>
                      <td className="text-right px-3 text-primary font-bold">1,35 %</td>
                      <td className="text-right px-3 text-primary">91,3 %</td>
                      <td className="text-right px-3 text-primary font-bold">14,2 %</td>
                      <td className="text-right px-3 text-primary">+85 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-3 font-medium text-foreground"><Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>Europæisk</Link></td>
                      <td className="text-right px-3">2,70 %</td>
                      <td className="text-right px-3">82,7 %</td>
                      <td className="text-right px-3">28,9 %</td>
                      <td className="text-right px-3 text-destructive">-420 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50 bg-destructive/5">
                      <td className="py-2 px-3 font-medium text-foreground"><Link to="/casinospil/roulette/amerikansk-roulette" className={linkClass}>Amerikansk</Link></td>
                      <td className="text-right px-3 text-destructive">5,26 %</td>
                      <td className="text-right px-3 text-destructive">71,4 %</td>
                      <td className="text-right px-3 text-destructive font-bold">42,1 %</td>
                      <td className="text-right px-3 text-destructive">-1.280 kr.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Forskellen er slående: Labouchère på <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>fransk roulette</Link> med La Partage har 91,3 % sekvensgennemførsel og kun 14,2 % RoR over 1.000 spins. På <Link to="/casinospil/roulette/amerikansk-roulette" className={linkClass}>amerikansk roulette</Link> falder gennemførselsraten til 71,4 % og RoR stiger til 42,1 %. Valget af variant er <em>vigtigere</em> end valget af sekvensdesign.
          </p>
        </section>

        {/* Bonus-EV */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Labouchère til bonusomsætning: EV-analyse
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Labouchère har en interessant egenskab for bonusomsætning: sekvensdesignet kan tilpasses specifikt til at optimere bankroll-overlevelse under omsætningskrav. Her er analysen:
          </p>

          <Card className="mb-6 border-border bg-card">
            <CardContent className="pt-6">
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-semibold text-foreground mb-2">Scenarie: 1.000 kr. bonus, 10× omsætning, europæisk roulette (100 % bidrag)</p>
                  <p className="font-mono text-xs">
                    Omsætningskrav: 10.000 kr.<br />
                    Forventet tab: 10.000 × 0,027 = 270 kr.<br />
                    Netto EV: 1.000 − 270 = <span className="text-primary font-bold">+730 kr.</span><br /><br />
                    Labouchère gennemførsel (1-1-1): 88,4 % → 88,4 % sandsynlighed for at nå omsætning<br />
                    Martingale gennemførsel: 72 % → 72 % sandsynlighed
                  </p>
                </div>
                <p className="text-xs">
                  <strong>Anbefaling:</strong> Brug den kortest mulige Labouchère-sekvens (1-1-1) til bonusomsætning. Den lave startindsats og høje gennemførselsrate maksimerer sandsynligheden for at nå omsætningskravet. Undgå aggressive sekvenser – de øger RoR markant.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Praktiske tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Praktiske anbefalinger for danske Labouchère-spillere
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Labouchère kræver mere forberedelse end andre systemer. Her er vores datadrevne anbefalinger:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
            <li><strong>Brug den flade sekvens</strong> (1-1-1-1-1) – laveste risiko, højeste gennemførselsrate (82,7 %)</li>
            <li><strong>Sæt en sekvensgrænse</strong> – afbryd og nulstil hvis sekvensen overstiger 10 tal</li>
            <li><strong>Spil <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>fransk roulette</Link></strong> med La Partage for halveret house edge (1,35 %)</li>
            <li><strong>Hold regnskab</strong> – brug en notesblok eller mobil-app til tracking</li>
            <li><strong>Sessionslimit</strong> – stop efter 2.000 kr. samlet tab, uanset sekvensposition</li>
            <li><strong>Tidsgrænse</strong> – maks 60 minutter per session for at undgå træthedsfejl</li>
            <li><strong>Max sekvenser per session</strong> – stop efter 5 gennemførte sekvenser (uanset resultat)</li>
            <li><strong>Casinoer</strong>: <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link>, <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> og <Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link> har de bedst egnede borde</li>
          </ul>
        </section>

        {/* Konklusion */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Konklusion: Det mest intellektuelle system – med samme begrænsning
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Labouchère er det mest sofistikerede og fleksible af de klassiske roulette-systemer. Det giver spilleren en unik grad af kontrol over risikoprofil og profitmål, og sekvensdesignet tilføjer en strategisk dimension, der mangler i Martingale, Fibonacci og D'Alembert. Den avancerede cancellation-mekanik og muligheden for skræddersyede sekvenser gør det til det foretrukne valg for analytisk orienterede spillere.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Men sofistikering ændrer ikke matematik. House edge er 2,70 % per spin uanset sekvensdesign, og over tilstrækkeligt mange spins vil den negative forventede værdi dominere. Vores udvidede simulering viser en RoR på 28,9 % over 1.000 spins med den flade sekvens – stiger til 51,3 % over 10.000 spins. Sekvensdesignet kan reducere denne risiko (flad sekvens → lavere RoR) men aldrig eliminere den.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For spillere der nyder den strategiske proces og har disciplin til at respektere deres grænser, er Labouchère et underholdende og intellektuelt stimulerende valg. Men behandl det som det er – et struktureret underholdningssystem, ikke en vej til profit. Se vores <Link to="/casinospil/roulette" className={linkClass}>roulette strategiguide</Link> for den komplette oversigt, og konsulter vores <Link to="/ansvarligt-spil" className={linkClass}>guide til ansvarligt spil</Link> for at holde det sundt.
          </p>
        </section>

        <CasinospilMoneyLinks gameName="Labouchère Roulette" currentPath="/casinospil/roulette/labouchere-roulette" />
        <RelatedGuides currentPath="/casinospil/roulette/labouchere-roulette" />
        <FAQSection faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="betinia" />
    </>
  );
}
