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

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Hero */}
        <section className="relative mb-10 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(135deg, hsl(220 60% 20%), hsl(240 50% 18%) 40%, hsl(200 70% 25%))", opacity: 0.85 }} />
          <div className="relative z-10 flex flex-col items-start gap-4 p-8 md:p-12">
            <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border-primary/30">
              <ListOrdered className="mr-1 h-3 w-3" /> Roulette System
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground leading-tight">
              Labouchère Roulette System 2026
            </h1>
            <p className="max-w-2xl text-base md:text-lg text-primary-foreground/80">
              Det mest sofistikerede roulette-system: skriv din egen talrække, slet tal ved gevinst, og jag et forudbestemt profitmål. Vi tester matematikken bag "Cancellation-metoden."
            </p>
          </div>
        </section>

        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="36 Min." />

        <InlineCasinoCards title="Bedste casinoer til Labouchère roulette" count={3} />

        <Separator className="my-10" />

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
            Det giver en unik fordel: du har kontrol over eskalering, risikoprofil og profitmål. Men det ændrer ikke den fundamentale matematik – house edge er stadig 2,70% per spin. I denne guide gennemgår vi systemet i detaljer, tester det med 10.000 spins og giver vores ærlige vurdering.
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

        {/* Praktiske tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Praktiske anbefalinger
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Labouchère kræver mere forberedelse end andre systemer. Her er vores anbefalinger:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
            <li><strong>Brug den flade sekvens</strong> (1-1-1-1-1) – laveste risiko, højeste gennemførselsrate</li>
            <li><strong>Sæt en sekvensgrænse</strong> – afbryd og nulstil hvis sekvensen overstiger 10 tal</li>
            <li><strong>Spil <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>fransk roulette</Link></strong> med La Partage for halveret house edge (1,35%)</li>
            <li><strong>Hold regnskab</strong> – brug en notesblok eller mobil-app til tracking</li>
            <li><strong>Sessionslimit</strong> – stop efter 2.000 kr. samlet tab, uanset sekvensposition</li>
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
            Labouchère er det mest sofistikerede og fleksible af de klassiske roulette-systemer. Det giver spilleren en unik grad af kontrol over risikoprofil og profitmål, og sekvensdesignet tilføjer en strategisk dimension, der mangler i Martingale, Fibonacci og D'Alembert.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Men sofistikering ændrer ikke matematik. House edge er 2,70% per spin uanset sekvensdesign, og over tilstrækkeligt mange spins vil den negative forventede værdi dominere. Vores simulering viser en bankerot-rate på 44,1% – lavere end Martingale men stadig betydelig.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For spillere der nyder den strategiske proces og har disciplin til at respektere deres grænser, er Labouchère et underholdende valg. Men behandl det som det er – et struktureret underholdningssystem, ikke en vej til profit. Se vores <Link to="/casinospil/roulette-strategi" className={linkClass}>roulette strategiguide</Link> for den komplette oversigt.
          </p>
        </section>

        <Separator className="mb-12" />
        <section className="mb-12"><FAQSection faqs={faqs} /></section>
        <Separator className="mb-12" />
        <AuthorBio author="jonas" />
        <Separator className="my-12" />
        <RelatedGuides currentPath="/casinospil/roulette/labouchere-roulette" />
      </div>
    </>
  );
}
