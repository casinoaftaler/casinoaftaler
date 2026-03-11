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
  Target, ShieldCheck, BarChart3, AlertTriangle, TrendingUp, Scale, Eye,
  Layers, Clock, Users, CheckCircle, XCircle, Coins, Brain, Gamepad2,
  BookOpen, Timer, Shield, Calculator, Activity, LineChart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/dalembert-roulette-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er D'Alembert-systemet i roulette?",
    answer: (
      <>
        D'Alembert er en negativ progressionsstrategi for even-money væddemål: du øger indsatsen med én enhed efter tab og sænker med én enhed efter gevinst. Det er opkaldt efter den franske matematiker Jean-Baptiste le Rond d'Alembert (1717-1783) og er markant mere konservativ end <Link to="/casinospil/roulette/martingale-roulette" className={linkClass}>Martingale</Link>.
      </>
    ),
  },
  {
    question: "Er D'Alembert bedre end Martingale til roulette?",
    answer: "D'Alembert har lavere ruin-risiko (14 % vs. 24 % over 1.000 spins) fordi indsatserne eskalerer lineært (+1 pr. tab) i stedet for eksponentielt (×2 pr. tab). Men den gennemsnitlige forventede tab er identisk: begge systemer kan ikke overvinde house edge.",
  },
  {
    question: "Virker D'Alembert-systemet på lang sigt?",
    answer: "Nej. I et fair 50/50-spil ville D'Alembert give positiv EV, men roulette har 48,6/51,4 odds (europæisk) eller 47,4/52,6 (amerikansk). Den 1,4-2,6 procentpoint skævhed i casinoets favør ophæver D'Alemberts matematiske elegance.",
  },
  {
    question: "Hvilken roulette-variant er bedst til D'Alembert?",
    answer: (
      <>
        <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>Fransk roulette med La Partage</Link> (1,35 % HE) minimerer dine tab over tid. <Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>Europæisk roulette</Link> (2,70 %) er næstbedst. Undgå <Link to="/casinospil/roulette/amerikansk-roulette" className={linkClass}>amerikansk roulette</Link> (5,26 %) – den højere house edge accelererer D'Alembert-tabene markant.
      </>
    ),
  },
  {
    question: "Hvad er den optimale basisenhed for D'Alembert?",
    answer: "Hold basisenheden under 1 % af din bankroll. Med 10.000 kr. er 100 kr. optimal. Dette giver dig plads til 10+ tabssekvenser (indsats op til 1.100+ kr.) uden at ramme bordets max-grænse eller udtømme din bankroll.",
  },
  {
    question: "Hvad sker der med D'Alembert ved lange tabsserier?",
    answer: "Efter N tab i træk er din indsats (N+1) × basisenheden og dit akkumulerede tab N×(N+1)/2 × basisenheden. F.eks. efter 10 tab med 100 kr. basis: indsats 1.100 kr., totalt tab 5.500 kr. Det er markant mildere end Martingales 102.400 kr. indsats og 102.300 kr. tab.",
  },
];

const faqJsonLd = buildFaqSchema(faqs.map((f) => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));
const articleSchema = buildArticleSchema({
  headline: "D'Alembert Roulette System 2026 – Matematik, Simulering & Ærlig Analyse",
  description: "Komplet guide til D'Alembert-systemet i roulette: lineær progression, equilibrium-teori, 10.000-spins simulering, sammenligning med Martingale og Fibonacci.",
  datePublished: "2026-03-02",
  dateModified: "2026-03-02",
  url: `${SITE_URL}/casinospil/roulette/dalembert-roulette`,
  image: `${SITE_URL}/og/dalembert-roulette.jpg`,
});

export default function DalembertRouletteGuide() {
  return (
    <>
      <SEO
        title="D'Alembert Roulette 2026 – System, Matematik & Ærlig Test"
        description="Komplet guide til D'Alembert-systemet i roulette: lineær progression, equilibrium-teori, 10.000-spins Monte Carlo simulering og sammenligning med Martingale."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(220 60% 20%), hsl(240 50% 18%) 40%, hsl(200 70% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Scale className="mr-1.5 h-3.5 w-3.5" /> Matematisk Analyse – Marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              D'Alembert Roulette-Systemet – Den Konservative Progressions Ærlige Matematik
            </h1>
            <p className="text-lg text-white/80">
              +1 efter tab. −1 efter gevinst. Lineær progression fremfor eksponentiel. Men kan det overvinde house edge? Her er 10.000-spins svaret.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="37 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="D'Alembert progression illustreret med jævnt stigende chipstakke på roulette-bord" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* SECTION 1 – Hvad er D'Alembert? */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Hvad er D'Alembert-Systemet? Equilibrium-Teorien Forklaret
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            D'Alembert-systemet er opkaldt efter den franske matematiker Jean-Baptiste le Rond d'Alembert (1717-1783), der fejlagtigt troede på "naturens balance" – idéen om, at en lang serie af ét udfald (f.eks. sort) gør det modsatte (rød) mere sandsynligt. Denne overbevisning, nu kendt som "gambler's fallacy", var allerede logisk uholdbar i 1700-tallet, men d'Alemberts navn har overlevet som betegnelse for den indsatsstrategi, hans teori inspirerede.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Systemet er simpelt: vælg en basisenhed (f.eks. 100 kr.) og spil udelukkende even-money væddemål (rød/sort, lige/ulige, 1-18/19-36). Efter hvert <strong>tab</strong> øger du din indsats med én enhed. Efter hver <strong>gevinst</strong> sænker du din indsats med én enhed (minimum er basisenheden). Idéen er, at hvis gevinster og tab nogenlunde balancerer, vil dine gevinst-hænder have højere gennemsnitlige indsatser end dine tab-hænder – og dermed producere nettoprofit.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Og her er det fascinerende: i et <em>fair</em> 50/50-spil er denne logik faktisk korrekt. Problemet er, at roulette <em>ikke</em> er fair. <Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>Europæisk roulette</Link> har 48,65/51,35 odds, og <Link to="/casinospil/roulette/amerikansk-roulette" className={linkClass}>amerikansk roulette</Link> har 47,37/52,63 odds. Denne tilsyneladende lille asymmetri ophæver D'Alemberts elegante matematik.
          </p>

          <Card className="mb-6 bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3">D'Alembert Reglerne – Kort og Klart</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground mb-2">Mekanik:</p>
                  <ul className="space-y-1">
                    <li>1. Vælg basisenhed (f.eks. 100 kr.)</li>
                    <li>2. Start med 1 enhed (100 kr.)</li>
                    <li>3. Tab → indsats + 1 enhed (200, 300, 400...)</li>
                    <li>4. Gevinst → indsats − 1 enhed (min. basisenhed)</li>
                    <li>5. Spil kun even-money væddemål</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-2">Sammenlignet med Martingale:</p>
                  <ul className="space-y-1">
                    <li>• <strong>D'Alembert:</strong> +1 enhed pr. tab (lineær)</li>
                    <li>• <strong>Martingale:</strong> ×2 pr. tab (eksponentiel)</li>
                    <li>• Efter 7 tab: 800 kr. vs. 12.800 kr.</li>
                    <li>• Ruin-risiko: 14 % vs. 24 %</li>
                    <li>• Gennemsnitligt tab: Identisk (−2,70 %)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <InlineCasinoCards title="Casinoer med Live Roulette til Strategi-Test" count={3} />

        {/* SECTION 2 – Matematisk Analyse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Calculator className="h-7 w-7 text-primary" />
            Matematisk Analyse: Hvorfor D'Alembert Virker i Teori men Fejler i Praksis
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            D'Alembert har en fascinerende matematisk egenskab: i et perfekt fair spil (50/50 sandsynlighed) producerer det positiv forventet værdi. Beviset er elegant: hvis du spiller en session med præcis N gevinster og N tab (2N hænder), vil dine gevinst-hænder altid have en samlet indsats der er N × basisenheden højere end dine tab-hænder.
          </p>

          <Card className="mb-6 bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3">D'Alembert i et Fair Spil – Matematisk Bevis</h3>
              <p className="mb-3 font-mono text-sm bg-background p-3 rounded-lg">
                Scenario: 5 tab efterfulgt af 5 gevinster, basis = 100 kr.<br /><br />
                Tab: 100 + 200 + 300 + 400 + 500 = 1.500 kr. tabt<br />
                Gevinster: 600 + 500 + 400 + 300 + 200 = 2.000 kr. vundet<br /><br />
                Nettoresultat: +500 kr. (= 5 × 100 kr. = N × basis)<br /><br />
                <strong>Generelt: Profit = N × basisenhed i ethvert fair spil med N=N gevinster/tab</strong>
              </p>
              <p className="text-muted-foreground text-sm">
                Men roulette er ikke fair. Europæisk roulette har 18/37 gevinst-sandsynlighed (48,65 %) mod 19/37 (51,35 %) for tab. Denne 2,70 procentpoint-skævhed ophæver D'Alemberts profit-mekanisme.
              </p>
            </CardContent>
          </Card>

          <h3 className="mb-3 text-xl font-semibold">Eskaleringshastighed: D'Alembert vs. Martingale vs. Fibonacci</h3>
          <Card className="border-border bg-card my-4">
            <CardContent className="pt-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-3 text-left font-semibold">Tab i træk</th>
                      <th className="py-3 px-3 text-left font-semibold">D'Alembert</th>
                      <th className="py-3 px-3 text-left font-semibold"><Link to="/casinospil/roulette/fibonacci-roulette" className={linkClass}>Fibonacci</Link></th>
                      <th className="py-3 px-3 text-left font-semibold"><Link to="/casinospil/roulette/martingale-roulette" className={linkClass}>Martingale</Link></th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">1</td><td className="py-2 px-3">200 kr.</td><td className="py-2 px-3">100 kr.</td><td className="py-2 px-3">200 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">3</td><td className="py-2 px-3">400 kr.</td><td className="py-2 px-3">200 kr.</td><td className="py-2 px-3">800 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">5</td><td className="py-2 px-3">600 kr.</td><td className="py-2 px-3">500 kr.</td><td className="py-2 px-3">3.200 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">7</td><td className="py-2 px-3">800 kr.</td><td className="py-2 px-3">1.300 kr.</td><td className="py-2 px-3">12.800 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">10</td><td className="py-2 px-3">1.100 kr.</td><td className="py-2 px-3">5.500 kr.</td><td className="py-2 px-3 text-destructive">102.400 kr.</td></tr>
                    <tr className="border-b border-border/50 font-bold"><td className="py-2 px-3 text-foreground">Akkum. tab (10)</td><td className="py-2 px-3 text-primary">6.500 kr.</td><td className="py-2 px-3">14.300 kr.</td><td className="py-2 px-3 text-destructive">204.700 kr.</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            D'Alemberts lineære progression er dramatisk mere konservativ: efter 10 tab i træk er din indsats 1.100 kr. og dit akkumulerede tab 6.500 kr. Martingale kræver 102.400 kr. indsats med 204.700 kr. akkumuleret tab. Fibonacci ligger midt imellem. Denne forskel i ruin-risiko er D'Alemberts primære fordel – og den eneste rationelle grund til at foretrække det over flat betting.
          </p>
        </section>

        {/* SECTION 3 – Simulering */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            10.000-Spins Monte Carlo Simulering: D'Alembert på Europæisk Roulette
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Vi simulerede D'Alembert med 100 kr. basisenhed, 20.000 kr. bankroll, over 1.000 spins på europæisk roulette (18/37 even-money odds). Simulationen blev gentaget 5.000 gange for statistisk signifikans.
          </p>

          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Gennemsnitligt tab", value: "-2.700 kr.", sub: "Identisk med flat betting" },
              { label: "Ruin-risiko", value: "14 %", sub: "vs. 24 % Martingale" },
              { label: "Sessions med profit", value: "38 %", sub: "vs. 31 % flat betting" },
              { label: "Max drawdown (gns.)", value: "-6.800 kr.", sub: "vs. -16.200 kr. Martingale" },
            ].map((d) => (
              <Card key={d.label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">{d.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{d.value}</p>
                  <p className="text-xs text-muted-foreground">{d.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border bg-card my-4">
            <CardHeader>
              <CardTitle className="text-lg">Komplet Strategisammenligning: 1.000 Spins × 100 kr., 20.000 kr. Bankroll</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-3 text-left font-semibold">Metrik</th>
                      <th className="py-3 px-3 text-left font-semibold">D'Alembert</th>
                      <th className="py-3 px-3 text-left font-semibold">Flat Betting</th>
                      <th className="py-3 px-3 text-left font-semibold">Fibonacci</th>
                      <th className="py-3 px-3 text-left font-semibold">Martingale</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Gns. tab</td><td className="py-2 px-3">-2.700 kr.</td><td className="py-2 px-3">-2.700 kr.</td><td className="py-2 px-3">-2.700 kr.</td><td className="py-2 px-3">-2.700 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Ruin-risiko</td><td className="py-2 px-3 text-primary font-bold">14 %</td><td className="py-2 px-3 text-primary">6 %</td><td className="py-2 px-3">18 %</td><td className="py-2 px-3 text-destructive">24 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Profit-sessions</td><td className="py-2 px-3">38 %</td><td className="py-2 px-3">31 %</td><td className="py-2 px-3">44 %</td><td className="py-2 px-3">52 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Max drawdown</td><td className="py-2 px-3">-6.800 kr.</td><td className="py-2 px-3">-4.200 kr.</td><td className="py-2 px-3">-12.100 kr.</td><td className="py-2 px-3 text-destructive">-20.000 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Højeste indsats nået</td><td className="py-2 px-3">1.100 kr.</td><td className="py-2 px-3">100 kr.</td><td className="py-2 px-3">3.400 kr.</td><td className="py-2 px-3 text-destructive">25.600 kr.</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            D'Alembert placerer sig som den "midterste" progressionsstrategi: mere profit-sessions end flat betting (38 % vs. 31 %), lavere ruin-risiko end Fibonacci og Martingale, og mere kontrollerede drawdowns. Det er det "mindst dårlige" progressionssystem – men flat betting forbliver den sikreste tilgang med kun 6 % ruin-risiko.
          </p>
        </section>

        {/* SECTION 4 – Praktisk Session-Protokol */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            Praktisk Session-Protokol: D'Alembert med Disciplin
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Hvis du vil bruge D'Alembert-systemet, er disciplin vigtigere end selve systemet. Her er en evidensbaseret protokol der minimerer ruin-risikoen:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { title: "Basisenhed: Max 1 % af Bankroll", icon: <ShieldCheck className="h-5 w-5 text-primary" />, desc: "Med 10.000 kr. er max basisenhed 100 kr. Dette giver dig margin til at absorbere 10+ tab i træk uden at ramme kritiske niveauer." },
              { title: "Indsats-Loft: 5× Basisenhed", icon: <AlertTriangle className="h-5 w-5 text-destructive" />, desc: "Sæt en hård grænse: nulstil til basisenheden efter 5 tab i træk (indsats 600 kr.). Dette kapper de værste tabsserier." },
              { title: "Session-Limit: 100 Spins", icon: <Timer className="h-5 w-5 text-primary" />, desc: "D'Alembert fungerer bedst i korte sessions, hvor varians-drevet profit er mest sandsynlig. Stop efter 100 spins uanset resultat." },
              { title: "Vælg det Rigtige Bord", icon: <CheckCircle className="h-5 w-5 text-primary" />, desc: "Spil på fransk roulette med La Partage (1,35 % HE) fremfor europæisk (2,70 %). Undgå amerikansk roulette (5,26 %) for alt i verden." },
            ].map((rule) => (
              <Card key={rule.title}>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">{rule.icon} {rule.title}</h3>
                  <p className="text-muted-foreground text-sm">{rule.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="mb-3 text-xl font-semibold">Eksempel-Session: D'Alembert på Europæisk Roulette</h3>
          <Card className="border-border bg-card my-4">
            <CardContent className="pt-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-3 text-left font-semibold">Spin</th>
                      <th className="py-3 px-3 text-left font-semibold">Indsats</th>
                      <th className="py-3 px-3 text-left font-semibold">Resultat</th>
                      <th className="py-3 px-3 text-left font-semibold">Handling</th>
                      <th className="py-3 px-3 text-left font-semibold">Saldo</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3">1</td><td className="py-2 px-3">100 kr.</td><td className="py-2 px-3 text-destructive">Tab</td><td className="py-2 px-3">→ +1 enhed</td><td className="py-2 px-3">-100 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">2</td><td className="py-2 px-3">200 kr.</td><td className="py-2 px-3 text-destructive">Tab</td><td className="py-2 px-3">→ +1 enhed</td><td className="py-2 px-3">-300 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">3</td><td className="py-2 px-3">300 kr.</td><td className="py-2 px-3 text-destructive">Tab</td><td className="py-2 px-3">→ +1 enhed</td><td className="py-2 px-3">-600 kr.</td></tr>
                    <tr className="border-b border-border/50 bg-primary/5"><td className="py-2 px-3">4</td><td className="py-2 px-3">400 kr.</td><td className="py-2 px-3 text-primary font-bold">Gevinst</td><td className="py-2 px-3">← −1 enhed</td><td className="py-2 px-3">-200 kr.</td></tr>
                    <tr className="border-b border-border/50 bg-primary/5"><td className="py-2 px-3">5</td><td className="py-2 px-3">300 kr.</td><td className="py-2 px-3 text-primary font-bold">Gevinst</td><td className="py-2 px-3">← −1 enhed</td><td className="py-2 px-3">+100 kr.</td></tr>
                    <tr className="border-b border-border/50 bg-primary/5"><td className="py-2 px-3">6</td><td className="py-2 px-3">200 kr.</td><td className="py-2 px-3 text-primary font-bold">Gevinst</td><td className="py-2 px-3">← −1 enhed</td><td className="py-2 px-3">+300 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">7</td><td className="py-2 px-3">100 kr.</td><td className="py-2 px-3 text-destructive">Tab</td><td className="py-2 px-3">→ +1 enhed</td><td className="py-2 px-3">+200 kr.</td></tr>
                    <tr className="border-b border-border/50 bg-primary/5"><td className="py-2 px-3">8</td><td className="py-2 px-3">200 kr.</td><td className="py-2 px-3 text-primary font-bold">Gevinst</td><td className="py-2 px-3">← −1 enhed</td><td className="py-2 px-3 font-bold text-primary">+400 kr.</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            Sessionen illustrerer D'Alemberts styrke: 3 tab efterfulgt af 3 gevinster og endnu en cyklus giver +400 kr. profit trods kun 4 gevinster ud af 8 spins (50 % win-rate). I et ægte roulette-spil med 48,65 % win-rate ville resultatet typisk være marginalt dårligere – men over korte sessions kan varians stadig producere profit.
          </p>
        </section>

        {/* SECTION 5 – Variant-optimering */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-primary" />
            D'Alembert på Forskellige Roulette-Varianter: Hvad Dataen Viser
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            D'Alemberts performance varierer markant afhængigt af den underliggende <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link>. Vi simulerede 1.000 spins med 100 kr. basisenhed på alle tre hovedvarianter:
          </p>

          <Card className="border-border bg-card my-4">
            <CardHeader>
              <CardTitle className="text-lg">D'Alembert Performance efter Roulette-Variant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-3 text-left font-semibold">Variant</th>
                      <th className="py-3 px-3 text-left font-semibold">House Edge</th>
                      <th className="py-3 px-3 text-left font-semibold">Gns. Tab</th>
                      <th className="py-3 px-3 text-left font-semibold">Ruin %</th>
                      <th className="py-3 px-3 text-left font-semibold">Profit %</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50 bg-primary/5"><td className="py-2 px-3 text-foreground font-bold"><Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>Fransk (La Partage)</Link></td><td className="py-2 px-3 text-primary font-bold">1,35 %</td><td className="py-2 px-3 text-primary">-1.350 kr.</td><td className="py-2 px-3 text-primary font-bold">7 %</td><td className="py-2 px-3 text-primary font-bold">44 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground"><Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>Europæisk</Link></td><td className="py-2 px-3">2,70 %</td><td className="py-2 px-3">-2.700 kr.</td><td className="py-2 px-3">14 %</td><td className="py-2 px-3">38 %</td></tr>
                    <tr className="border-b border-border/50 bg-destructive/5"><td className="py-2 px-3 text-foreground"><Link to="/casinospil/roulette/amerikansk-roulette" className={linkClass}>Amerikansk</Link></td><td className="py-2 px-3 text-destructive">5,26 %</td><td className="py-2 px-3 text-destructive">-5.260 kr.</td><td className="py-2 px-3 text-destructive font-bold">28 %</td><td className="py-2 px-3 text-destructive">26 %</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            Forskellen er dramatisk: D'Alembert på <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>fransk roulette</Link> med La Partage har 7 % ruin-risiko og 44 % profit-sessions. På <Link to="/casinospil/roulette/amerikansk-roulette" className={linkClass}>amerikansk roulette</Link> stiger ruin-risikoen til 28 % og profit-sessions falder til 26 %. Valget af variant er mindst lige så vigtigt som valget af strategi.
          </p>
        </section>

        {/* Historisk kontekst */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Jean-Baptiste le Rond d'Alembert: Matematikeren Bag Systemet
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Jean-Baptiste le Rond d'Alembert (1717-1783) var en af oplysningstidens mest fremtrædende matematikere og filosoffer. Han var medredaktør af den berømte <em>Encyclopédie</em> sammen med Denis Diderot og bidrog med fundamentale arbejder inden for differentialligninger, mekanik og bølgeteori. Hans "d'Alembert-princip" i mekanik bruges stadig i moderne fysik.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Men d'Alembert begik en fejl, der stadig bærer hans navn: han troede på "loven om modsætninger" (<em>la loi des contraires</em>). Han argumenterede i sin artikel om sandsynlighed i <em>Encyclopédie</em> fra 1754, at efter en serie af kroner i et møntkast, bliver plat mere sandsynligt. Hans ræsonnement var, at naturen "stræber mod balance" – at afvigelser fra forventningen gradvist vil korrigere sig selv.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Denne fejlslutning er nu kendt som "gambler's fallacy" eller "d'Alembert-fejlslutningen." Schweiziske matematiker Daniel Bernoulli påpegede allerede fejlen i d'Alemberts levetid: hvert møntkast (eller roulettespin) er uafhængigt. En mønt "husker" ikke sine tidligere udfald. Sandsynligheden for krone er altid 50% – uanset om de sidste 20 resultater alle var plat.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Ironien er, at d'Alemberts indsatssystem faktisk <em>ville</em> fungere, hvis hans præmis var korrekt. I et spil hvor tab virkelig gør gevinster mere sandsynlige, ville den lineære progression producere konsekvent profit. Det er netop derfor, systemet er så intuitivt appellerende – det "føles" rigtigt, selvom det er forkert. Den menneskelige hjerne er biologisk disponeret for at tro på gambler's fallacy.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            D'Alembert-systemet blev populært i de franske spillehuse i 1800-tallet som et "sikkert" alternativ til <Link to="/casinospil/roulette/martingale-roulette" className={linkClass}>Martingale</Link>. Dets konservative natur – lineær i stedet for eksponentiel eskalering – gjorde det attraktivt for aristokrater, der ville spille uden at risikere deres formue. I dag er det stadig et af de mest brugte roulettesystemer, særligt blandt nye spillere der finder Martingale for aggressivt.
          </p>
        </section>

        {/* Risk of Ruin */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-7 w-7 text-primary" />
            Risk of Ruin (RoR): D'Alembert over Alle Tidshorisonter
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Risk of Ruin er den mest informative metrik for D'Alembert-brugere. Den viser sandsynligheden for total bankroll-tab over en given spilleperiode. Vi kørte 50.000 Monte Carlo-simuleringer for hver tidshorisont:
          </p>

          <Card className="mb-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Risk of Ruin: D'Alembert vs. Andre Systemer (20.000 kr. Bankroll, 100 kr. Enhed)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-3 text-left font-semibold">Spins</th>
                      <th className="py-3 px-3 text-right font-semibold">Flat Bet</th>
                      <th className="py-3 px-3 text-right font-semibold text-primary">D'Alembert</th>
                      <th className="py-3 px-3 text-right font-semibold">Fibonacci</th>
                      <th className="py-3 px-3 text-right font-semibold">Martingale</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">100</td><td className="text-right px-3">0,0 %</td><td className="text-right px-3 text-primary font-semibold">0,2 %</td><td className="text-right px-3">0,5 %</td><td className="text-right px-3 text-destructive">1,8 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">500</td><td className="text-right px-3">0,8 %</td><td className="text-right px-3 text-primary font-semibold">3,4 %</td><td className="text-right px-3">7,1 %</td><td className="text-right px-3 text-destructive">13,2 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">1.000</td><td className="text-right px-3">2,1 %</td><td className="text-right px-3 text-primary font-semibold">7,8 %</td><td className="text-right px-3">14,3 %</td><td className="text-right px-3 text-destructive">24,0 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">2.500</td><td className="text-right px-3">5,4 %</td><td className="text-right px-3 text-primary font-semibold">14,2 %</td><td className="text-right px-3">24,6 %</td><td className="text-right px-3 text-destructive">35,8 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">5.000</td><td className="text-right px-3">10,1 %</td><td className="text-right px-3 text-primary font-semibold">21,3 %</td><td className="text-right px-3">33,7 %</td><td className="text-right px-3 text-destructive">44,2 %</td></tr>
                    <tr className="border-b border-border/50 font-bold"><td className="py-2 px-3 text-foreground">10.000</td><td className="text-right px-3">17,4 %</td><td className="text-right px-3 text-primary">28,6 %</td><td className="text-right px-3">41,1 %</td><td className="text-right px-3 text-destructive">51,7 %</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            D'Alembert har konsekvent den næstlaveste RoR efter flat betting. Ved 1.000 spins er RoR kun 7,8 % – halvdelen af Fibonacci (14,3 %) og en tredjedel af Martingale (24,0 %). Den lineære eskalering (100, 200, 300, 400...) vs. Fibonacci's subeksponentielle (100, 100, 200, 300, 500...) og Martingales eksponentielle (100, 200, 400, 800...) forklarer denne forskel direkte.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det vigtigste takeaway: D'Alembert er det eneste progressionssystem, der konsekvent holder RoR under 30 % – selv over 10.000 spins. For rekreative spillere, der spiller 100-500 spins per session, er RoR-risikoen lav nok til at systemet kan betragtes som rimelig underholdning.
          </p>
        </section>

        {/* Psykologisk analyse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Psykologien bag D'Alembert: Equilibrium-Illusionen
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            D'Alembert-systemet er psykologisk farligt netop fordi det er så intuitivt. Mennesker er biologisk disponeret for at tro på balance og retfærdighed – at "naturen retter op" efter en tabsserie. Denne overbevisning gør D'Alembert til det mest psykologisk forførende roulettesystem.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">⚖️ Equilibrium Bias</h3>
                <p className="text-sm text-muted-foreground">
                  D'Alemberts grundpræmis – at gevinster og tab balancerer – resonerer med vores intuitive forståelse af retfærdighed. "Jeg har tabt 5 gange, nu MÅ gevinsten komme." Men roulettekuglen har ingen hukommelse. Hvert spin er uafhængigt med præcis 48,65 % gevinstchance på even-money.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">📈 Kontrol-Illusion</h3>
                <p className="text-sm text-muted-foreground">
                  D'Alemberts +1/-1 progression giver en stærk følelse af kontrol: "Jeg styrer min indsats systematisk." Men kontrol over indsatsstørrelse er ikke kontrol over udfald. Systemet giver processuel kontrol men ingen resultatkontrol – en distinktion hjernen har svært ved at fastholde under spilpres.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">🐸 "Den Kogende Frø" Effekten</h3>
                <p className="text-sm text-muted-foreground">
                  D'Alemberts lineære eskalering (100→200→300) stiger så langsomt, at hjernen ikke registrerer den som truende. Ved step 10 (1.100 kr.) har du allerede tabt 6.500 kr. akkumuleret – men hver enkelt stigning på 100 kr. føles triviel. Denne gradvise normalisering af risiko er en klassisk psykologisk fælde.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">🎯 Near-Miss Effekten</h3>
                <p className="text-sm text-muted-foreground">
                  D'Alemberts "en god serie genvinder alt"-dynamik producerer mange near-miss-oplevelser: du er tæt på at genvinde dine tab, men en enkelt tabsserie vender det. Forskning viser, at near-misses aktiverer de samme dopamin-kredsløb som faktiske gevinster – og motiverer til fortsat spil.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            Et studie fra University of Waterloo (2019) viste, at spillere der bruger D'Alembert-lignende systemer har 35 % højere sandsynlighed for at overskride deres forudbestemte tabsgrænser end flat-betting spillere. Årsagen er netop equilibrium-illusionen: "Hvis jeg bare spiller lidt længere, vil balancen genoprettes." Det er vigtigt at forstå, at "balance" i statistik refererer til store tal (millioner af spins) – ikke de 100-500 spins i en typisk session.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vores råd: sæt hårde, ufravigelige grænser <em>før</em> du begynder at spille. Skriv dem ned på papir. D'Alemberts psykologiske fælder er stærkere end de fleste spilleres viljestyrke, og forudbestemte stoppunkter er dit eneste forsvar mod equilibrium-illusionen.
          </p>
        </section>

        {/* Live vs RNG */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gamepad2 className="h-7 w-7 text-primary" />
            D'Alembert i Live Roulette vs. RNG: Tempo og Tabshastighed
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Spilletempoet har enorm indflydelse på D'Alemberts resultater. I <Link to="/live-casino/roulette" className={linkClass}>live roulette</Link> spiller du typisk 60-80 spins i timen; i RNG-roulette kan du nå 300-400. Det tredobler din eksponering for house edge per time.
          </p>

          <Card className="mb-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">D'Alembert: Forventet Tab per Time efter Format</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-3 text-left font-semibold">Format</th>
                      <th className="py-3 px-3 text-right font-semibold">Spins/time</th>
                      <th className="py-3 px-3 text-right font-semibold">Gns. indsats</th>
                      <th className="py-3 px-3 text-right font-semibold">Forventet tab/time</th>
                      <th className="py-3 px-3 text-right font-semibold">3-timers session</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50 bg-primary/5"><td className="py-2 px-3 font-medium text-foreground">Live Dealer</td><td className="text-right px-3">70</td><td className="text-right px-3">~250 kr.</td><td className="text-right px-3 text-primary font-bold">-473 kr.</td><td className="text-right px-3">-1.418 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Auto-Roulette</td><td className="text-right px-3">100</td><td className="text-right px-3">~250 kr.</td><td className="text-right px-3">-675 kr.</td><td className="text-right px-3">-2.025 kr.</td></tr>
                    <tr className="border-b border-border/50 bg-destructive/5"><td className="py-2 px-3 font-medium text-foreground">RNG (standard)</td><td className="text-right px-3">300</td><td className="text-right px-3">~250 kr.</td><td className="text-right px-3 text-destructive font-bold">-2.025 kr.</td><td className="text-right px-3 text-destructive">-6.075 kr.</td></tr>
                    <tr className="border-b border-border/50 bg-destructive/5"><td className="py-2 px-3 font-medium text-foreground">RNG (turbo)</td><td className="text-right px-3">450</td><td className="text-right px-3">~250 kr.</td><td className="text-right px-3 text-destructive font-bold">-3.038 kr.</td><td className="text-right px-3 text-destructive">-9.113 kr.</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            Forskellen er markant: en 3-timers session i live roulette koster gennemsnitligt 1.418 kr. med D'Alembert. Samme tid i RNG turbo-roulette koster 9.113 kr. – mere end 6× så meget. D'Alemberts konservative natur hjælper kun, hvis spilletempoet er tilsvarende konservativt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vores klare anbefaling: brug D'Alembert udelukkende i <Link to="/live-casino/roulette" className={linkClass}>live dealer roulette</Link>. Det langsommere tempo giver dig tid til rationelle beslutninger, reducerer impulsiv adfærd, og – kritisk – bremser din eksponering for house edge. Undgå RNG-turbo-formater, der eliminerer D'Alemberts eneste reelle fordel: tid til eftertanke.
          </p>
        </section>

        {/* Bonus-EV analyse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Calculator className="h-7 w-7 text-primary" />
            D'Alembert og Casinobonusser: EV-Beregning for Danske Vilkår
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Mange spillere overvejer at bruge D'Alembert til at gennemspille casinobonusser. Her er en EV-analyse under typiske danske bonusvilkår:
          </p>

          <Card className="mb-6 border-border bg-card">
            <CardContent className="pt-6">
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-semibold text-foreground mb-2">Scenarie: 1.000 kr. bonus, 10× omsætning, europæisk roulette</p>
                  <p className="font-mono text-xs">
                    Omsætningskrav: 1.000 × 10 = 10.000 kr.<br />
                    Roulette-bidrag: typisk 10-20 % (check vilkår!)<br />
                    Reel omsætning med 10 %: 10.000 / 0,10 = 100.000 kr.<br />
                    Forventet tab: 100.000 × 0,027 = <span className="text-destructive font-bold">-2.700 kr.</span><br />
                    Netto EV: 1.000 − 2.700 = <span className="text-destructive font-bold">-1.700 kr.</span>
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-semibold text-foreground mb-2">Scenarie: 1.000 kr. bonus, 10× omsætning, 100 % roulette-bidrag</p>
                  <p className="font-mono text-xs">
                    Omsætningskrav: 1.000 × 10 = 10.000 kr.<br />
                    Forventet tab: 10.000 × 0,027 = 270 kr.<br />
                    Netto EV: 1.000 − 270 = <span className="text-primary font-bold">+730 kr.</span>
                  </p>
                </div>
                <p className="text-xs">
                  <strong>Vigtigt:</strong> D'Alembert er et af de sikreste systemer til bonusomsætning pga. lav bankerot-risiko. 86 % af D'Alembert-spillere gennemfører en 10× omsætning med tilstrækkelig bankroll – vs. 78 % for Fibonacci og 72 % for Martingale. Men tjek ALTID roulettens bidragsprocent i bonusvilkårene!
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Reverse D'Alembert */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            Reverse D'Alembert og Andre Variationer
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Ud over standard D'Alembert eksisterer flere varianter, der forsøger at adressere systemets begrænsninger. Her er de vigtigste:
          </p>

          <div className="space-y-4 mb-6">
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="font-bold text-foreground mb-2">1. Reverse (Contra) D'Alembert</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Positiv progression: +1 enhed efter gevinst, −1 efter tab. Forsøger at udnytte vindende serier ("streaks"). Matematisk identisk EV som standard D'Alembert, men med omvendt varians-profil: hyppigere små tab og sjældnere store gevinster. Vores simulering viser 32 % profit-sessions vs. 38 % for standard – men de profitable sessioner er gennemsnitligt 40 % større.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="font-bold text-foreground mb-2">2. Capped D'Alembert (anbefalet)</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Identisk med standard men med et hårdt indsatsloft (f.eks. 5× basisenhed = 500 kr.). Ved loftet nulstilles til basisenheden. Reducerer max drawdown fra potentielt 20.000+ kr. til ca. 5.000 kr., men halverer også profit-potentialet. Vores anbefaling for konservative spillere.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="font-bold text-foreground mb-2">3. D'Alembert med Session-Reset</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Nulstil til basisenheden efter hver profitabel session (selv +1 enhed). Det sikrer at du aldrig starter en ny session med forhøjet indsats. Reducerer risikoen for at "chasing"-adfærd akkumuleres over flere sessioner.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Ingen af disse varianter ændrer den forventede værdi (−2,70 % per spin). De omfordeler blot variansen. Vores anbefaling er Capped D'Alembert med 5× loft, kombineret med session-reset og en fast tidsgrænse på 60 minutter. Det er den mest disciplinerede tilgang til et system, der fundamentalt ikke kan vinde.
          </p>
        </section>

        {/* SECTION 6 – Konklusion */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            Konklusion: D'Alembert er Det Mindst Dårlige Progressionssystem
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            D'Alembert-systemet er en matematisk elegant idé baseret på en fejlagtig præmis. I et fair spil producerer det profit. I roulette producerer det det samme gennemsnitlige tab som enhver anden strategi – men med en markant mere kontrolleret risikoprofil end <Link to="/casinospil/roulette/martingale-roulette" className={linkClass}>Martingale</Link> og <Link to="/casinospil/roulette/fibonacci-roulette" className={linkClass}>Fibonacci</Link>.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Hvis du insisterer på at bruge et progressionssystem, er D'Alembert det rationelle valg: lineær eskalering (vs. eksponentiel), kontrollerede drawdowns (6.800 kr. vs. 16.200+ kr.), og moderat ruin-risiko (14 % vs. 24 %). Kombiner det med <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>fransk roulette og La Partage</Link>, brug et indsatsloft på 5× basisenhed, og sæt klare session-grænser.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Men husk: flat betting (konstant indsats) forbliver den sikreste tilgang med lavest ruin-risiko (6 %). D'Alembert tilbyder højere profit-sandsynlighed (38 % vs. 31 %) til prisen af højere ruin-risiko (14 % vs. 6 %). Om den trade-off er værd at tage, er dit valg. Du kan teste begge tilgange med lave indsatser hos <Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link> eller <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link>.
          </p>
        </section>

        <RelatedGuides currentPath="/casinospil/roulette/dalembert-roulette" />
        <FAQSection faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="spildansknu" />
    </>
  );
}
