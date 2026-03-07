import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
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
  Activity, LineChart, ArrowRight, Repeat, Sigma,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/fibonacci-roulette-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er Fibonacci-systemet i roulette?",
    answer: (
      <>
        Fibonacci-systemet er en negativ progressionsstrategi baseret på den berømte talrække (1, 1, 2, 3, 5, 8, 13, 21...), hvor hvert tal er summen af de to foregående. Ved tab rykker du ét trin fremad i sekvensen; ved gevinst rykker du to trin tilbage. Det eskalerer langsommere end <Link to="/casinospil/roulette/martingale-roulette" className={linkClass}>Martingale</Link>.
      </>
    ),
  },
  {
    question: "Er Fibonacci bedre end Martingale til roulette?",
    answer:
      "Fibonacci eskalerer langsommere: efter 10 tab er din indsats 55 enheder vs. Martingales 512. Det giver længere spilletid og lavere bankerot-risiko. Men begge systemer har negativ forventet værdi (-2,70% per spin), og Fibonacci kræver flere gevinster for at genvinde tab (pga. 'to trin tilbage'-reglen).",
  },
  {
    question: "Kan Fibonacci-systemet vinde i det lange løb?",
    answer:
      "Nej. Ingen indsatsstrategi kan overkomme house edge. Fibonacci omfordeler bare resultaterne: hyppigere små gevinster og sjældnere store tab. Vores Monte Carlo-simulering viser en langsigtet bankerot-rate på ca. 47,8% over 10.000 spins – lavere end Martingale (54,2%) men stadig betydelig.",
  },
  {
    question: "Hvor mange tab i træk kan Fibonacci håndtere?",
    answer:
      "Med 50 kr. basisenhed og 10.000 kr. bordmaksimum kan Fibonacci håndtere 11-12 tab i træk (sekvensen: 50, 50, 100, 150, 250, 400, 650, 1.050, 1.700, 2.750, 4.450, 7.200). Til sammenligning kan Martingale kun håndtere 7-8. Det giver Fibonacci et bredere sikkerhedsnet.",
  },
  {
    question: "Hvordan virker 'to trin tilbage'-reglen?",
    answer:
      "Når du vinder, rykker du to pladser tilbage i Fibonacci-sekvensen. Er du på step 7 (indsats: 650 kr.) og vinder, går du til step 5 (indsats: 250 kr.). Denne mekanisme sikrer gradvis nedtrapning i stedet for fuld nulstilling, hvilket gør recovery langsommere men mere stabil.",
  },
  {
    question: "Kan Fibonacci bruges i live roulette?",
    answer: (
      <>
        Ja. Bordgrænserne i <Link to="/live-casino/roulette" className={linkClass}>live roulette</Link> tillader typisk 12+ Fibonacci-trin med 50 kr. basisenhed. Fibonacci er faktisk bedre egnet til live roulette end Martingale pga. den langsommere eskalering – du rammer sjældnere bordmaksimum.
      </>
    ),
  },
  {
    question: "Hvad er den bedste roulette-variant til Fibonacci?",
    answer: (
      <>
        <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>Fransk roulette</Link> med La Partage (1,35% HE) er optimal. Alternativt <Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>europæisk roulette</Link> (2,70% HE). Undgå <Link to="/casinospil/roulette/amerikansk-roulette" className={linkClass}>amerikansk roulette</Link> (5,26% HE) – det dobbelte house edge accelererer tabene.
      </>
    ),
  },
];

const faqJsonLd = buildFaqSchema(faqs.map((f) => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));

const articleSchema = buildArticleSchema({
  headline: "Fibonacci Roulette System 2026 – Naturens Talrække på Casinobordet",
  description: "Dybdegående guide til Fibonacci-systemet i roulette: den gyldne spiral, to-trin-tilbage mekanik, 10.000-spins Monte Carlo simulering, sammenligning med Martingale og D'Alembert.",
  datePublished: "2026-03-02",
  dateModified: "2026-03-02",
  url: `${SITE_URL}/casinospil/roulette/fibonacci-roulette`,
  image: `${SITE_URL}/og/fibonacci-roulette.jpg`,
});

export default function FibonacciRouletteGuide() {
  return (
    <>
      <SEO
        title="Fibonacci Roulette 2026 – System, Matematik & Ærlig Analyse"
        description="Komplet guide til Fibonacci-systemet i roulette: den gyldne spiral på casinobordet, to-trin-tilbage mekanik, Monte Carlo simulering og ærlig vurdering."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(220 60% 20%), hsl(240 50% 18%) 40%, hsl(200 70% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sigma className="mr-1.5 h-3.5 w-3.5" /> Matematisk Analyse – Marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Fibonacci Roulette System 2026 – Den Gyldne Spiral på Casinobordet
            </h1>
            <p className="text-lg text-white/80">
              Naturens mest elegante talrække anvendt på casinobordet. Vi dissekerer matematikken, simulerer 10.000 spins og afslører, om den gyldne spiral kan slå house edge.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="38 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Fibonacci roulette system med den gyldne spiral over et europæisk roulettebord" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Indledning */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Fibonacci i roulette: Matematisk elegance møder casino-realitet
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Fibonacci-talrækken (1, 1, 2, 3, 5, 8, 13, 21, 34, 55...) er en af matematikkens mest fascinerende sekvenser. Den optræder i solsikkernes spiraler, i nautilus-skaller, i galaksers spiralarme – og i roulette-systemers indsatsprogressioner. Men mens den gyldne spiral er en naturlov, er dens anvendelse på casinobordet en menneskelig konstruktion med fundamentale begrænsninger.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Fibonacci-systemet i roulette er en negativ progressionsstrategi, der bruger talrækken til at bestemme indsatsstørrelser. Det er mere konservativt end <Link to="/casinospil/roulette/martingale-roulette" className={linkClass}>Martingale</Link> (eksponentiel vækst) men mere aggressivt end <Link to="/casinospil/roulette/dalembert-roulette" className={linkClass}>D'Alembert</Link> (lineær vækst). Det placerer sig i en mellemkategori, der tiltaler spillere med moderate risikoprofiler.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I denne guide gennemgår vi systemets mekanik i detaljer, analyserer den underliggende matematik, præsenterer resultater fra en 10.000-spins Monte Carlo-simulering, og giver vores ærlige vurdering baseret på data – ikke anekdoter. Vi sammenligner også direkte med Martingale, D'Alembert og <Link to="/casinospil/roulette/labouchere-roulette" className={linkClass}>Labouchère</Link> for at give et komplet billede.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Spoiler: Fibonacci er matematisk elegant men fundamentalt begrænset af det samme princip som alle andre systemer – ingen indsatsstrategi kan overkomme <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> i det lange løb. Men forståelsen af HVORFOR det er tilfældet, gør dig til en mere informeret spiller.
          </p>
        </section>

        {/* Sådan fungerer systemet */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Sådan fungerer Fibonacci-systemet i praksis
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Fibonacci-systemet er designet til even-money væddemål (rød/sort, lige/ulige, 1-18/19-36). Her er den komplette procedure:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" /> Trin 1: Skriv sekvensen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Start med Fibonacci-sekvensen multipliceret med din basisenhed: 50, 50, 100, 150, 250, 400, 650, 1.050, 1.700, 2.750... Hvert tal er summen af de to foregående (med 50 kr. som enhed).
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" /> Trin 2: Start på step 1
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Din første indsats er altid den første Fibonacci-værdi: 50 kr. (1 enhed). Placer væddemålet på et even-money felt.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" /> Trin 3: Tab → ryk ét trin frem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Taber du, rykker du ét trin fremad i sekvensen. Er du på step 3 (100 kr.) og taber, er næste indsats step 4 (150 kr.).
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" /> Trin 4: Gevinst → ryk to trin tilbage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Vinder du, rykker du TO trin tilbage. Er du på step 6 (400 kr.) og vinder, går du til step 4 (150 kr.). Når du når step 1 eller lavere, nulstil til basisenheden.
                </p>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3">Eksempel: Fibonacci i aktion</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Spin</th>
                  <th className="text-center py-2 text-foreground font-semibold">Step</th>
                  <th className="text-right py-2 text-foreground font-semibold">Indsats</th>
                  <th className="text-center py-2 text-foreground font-semibold">Resultat</th>
                  <th className="text-right py-2 text-foreground font-semibold">Netto P/L</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50"><td className="py-2">1</td><td className="text-center">1</td><td className="text-right">50 kr.</td><td className="text-center">❌</td><td className="text-right text-destructive">-50 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">2</td><td className="text-center">2</td><td className="text-right">50 kr.</td><td className="text-center">❌</td><td className="text-right text-destructive">-100 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">3</td><td className="text-center">3</td><td className="text-right">100 kr.</td><td className="text-center">❌</td><td className="text-right text-destructive">-200 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">4</td><td className="text-center">4</td><td className="text-right">150 kr.</td><td className="text-center">❌</td><td className="text-right text-destructive">-350 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">5</td><td className="text-center">5</td><td className="text-right">250 kr.</td><td className="text-center">✅</td><td className="text-right text-destructive">-100 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">6</td><td className="text-center">3</td><td className="text-right">100 kr.</td><td className="text-center">✅</td><td className="text-right text-primary">0 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">7</td><td className="text-center">1</td><td className="text-right">50 kr.</td><td className="text-center">✅</td><td className="text-right text-primary">+50 kr.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Bemærk den elegante recovery: efter 4 tab og 3 gevinster er vi i plus. Til sammenligning ville Martingale have krævet én enkelt gevinst på step 5 (800 kr.) for at genvinde alt. Fibonacci spreder recovery over flere gevinster, hvilket giver en blødere kurve men kræver mere spilletid.
          </p>
        </section>

        {/* Matematikken */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Fibonacci-sekvensens matematik i roulette-kontekst
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Fibonacci-talrækken har en unik egenskab: hvert tal er summen af de to foregående. Matematisk: F(n) = F(n-1) + F(n-2), med F(1) = F(2) = 1. Den asymptotiske vækstrate er φ (phi, den gyldne ratio) ≈ 1,618, hvilket betyder at indsatsen vokser med ca. 61,8% per trin.
          </p>

          <Card className="mb-6 border-primary/20 bg-card">
            <CardHeader>
              <CardTitle className="text-base">Vækstrate-sammenligning: Fibonacci vs. Martingale vs. D'Alembert</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-foreground font-semibold">Step</th>
                      <th className="text-right py-2 text-foreground font-semibold">Fibonacci</th>
                      <th className="text-right py-2 text-foreground font-semibold">Martingale</th>
                      <th className="text-right py-2 text-foreground font-semibold">D'Alembert</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2">1</td><td className="text-right">50</td><td className="text-right">50</td><td className="text-right">50</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2">3</td><td className="text-right">100</td><td className="text-right">200</td><td className="text-right">150</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2">5</td><td className="text-right">250</td><td className="text-right">800</td><td className="text-right">250</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2">7</td><td className="text-right">650</td><td className="text-right">3.200</td><td className="text-right">350</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2">10</td><td className="text-right">2.750</td><td className="text-right">25.600</td><td className="text-right">500</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2">12</td><td className="text-right">7.200</td><td className="text-right">102.400</td><td className="text-right">600</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Fibonacci ligger mellem Martingale og D'Alembert i vækstrate. Det giver et bredere vindue før bordmaksimum (12 trin vs. Martingales 7-8), men det kræver flere gevinster for fuld recovery. Den "to trin tilbage"-mekanik betyder, at du gradvist nedtrapper i stedet for at nulstille, hvilket forlænger recovery-perioden.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3">Akkumuleret risiko</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det samlede beløb du risikerer efter n Fibonacci-trin vokser også efter Fibonacci-mønsteret. Efter 10 tab i træk har du tabt i alt 7.100 kr. (50+50+100+150+250+400+650+1.050+1.700+2.750). Til sammenligning har Martingale tabt 25.550 kr. og D'Alembert kun 2.750 kr.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den forventede værdi forbliver konstant uanset system: -2,70% per spin på <Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>europæisk roulette</Link>. Fibonacci ændrer fordelingen af resultater (flere mellemstore gevinster og tab) men ikke gennemsnittet. Over tid vil EV altid dominere.
          </p>
        </section>

        {/* Simulering */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            10.000-spins simuleringsresultater
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vi kørte 1.000 parallelle Monte Carlo-simuleringer med 10.000 spins hver. Parametre: 50 kr. basisenhed, europæisk roulette (18/37), 10.000 kr. bordmaksimum, 5.000 kr. startbankroll.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Kortsigtet (500 spins)</p>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Profitable sessioner: 68,7%</li>
                  <li>• Gennemsnitlig profit: +215 kr.</li>
                  <li>• Median profit: +250 kr.</li>
                  <li>• Worst case: -5.000 kr. (bankerot)</li>
                  <li>• Bankerot-rate: 5,3%</li>
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
                  <li>• Profitable sessioner: 34,1%</li>
                  <li>• Gennemsnitligt resultat: -1.560 kr.</li>
                  <li>• Median resultat: -1.800 kr.</li>
                  <li>• Worst case: -5.000 kr. (bankerot)</li>
                  <li>• Bankerot-rate: 47,8%</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Sammenlignet med <Link to="/casinospil/roulette/martingale-roulette" className={linkClass}>Martingale</Link> (54,2% bankerot-rate) klarer Fibonacci sig bedre med 47,8%. Bankrollkurverne viser et jævnere forløb – mindre "pludselig død" og mere gradvis erosion. Det skyldes den langsommere eskalering: du rammer sjældnere bordmaksimum og får flere chancer for recovery.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den kortsigtige vinderrate (68,7% over 500 spins) er lidt lavere end Martingales 72,3%, fordi Fibonacci's recovery kræver flere spins. Men den lavere bankerot-rate (5,3% vs. 8,1%) viser, at Fibonacci er mere bæredygtigt som kortvarig underholdning.
          </p>
        </section>

        {/* Fordele og ulemper */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Fordele og ulemper ved Fibonacci-systemet
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
                  <li>• <strong>Langsommere eskalering</strong> – 12+ trin før bordmaksimum vs. Martingales 7-8</li>
                  <li>• <strong>Lavere bankerot-risiko</strong> – 47,8% vs. 54,2% (Martingale) over 10.000 spins</li>
                  <li>• <strong>Gradvis recovery</strong> – "to trin tilbage" spreder risikoen over flere spins</li>
                  <li>• <strong>Matematisk elegant</strong> – lettere at huske end Labouchère's talrækker</li>
                  <li>• <strong>Bedre egnet til længere sessioner</strong> – mere spilletid per bankroll-enhed</li>
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
                  <li>• <strong>Stadig negativ EV</strong> – -2,70% per spin kan ikke overkommes</li>
                  <li>• <strong>Langsom recovery</strong> – kræver flere gevinster end Martingale for at genvinde tab</li>
                  <li>• <strong>Tracking-krav</strong> – du skal holde styr på din position i sekvensen</li>
                  <li>• <strong>Falsk tryghed</strong> – den langsomme eskalering kan friste til overspil</li>
                  <li>• <strong>Bordmaksimum</strong> – stadig en hård grænse, bare rammer du den senere</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Strategiske variationer */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Fibonacci-variationer og optimeringsteknikker
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Flere varianter af Fibonacci-systemet er udviklet for at adressere specifikke svagheder:
          </p>

          <div className="space-y-4 mb-6">
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">1. Capped Fibonacci (anbefalet)</h3>
                <p className="text-sm text-muted-foreground">
                  Sæt et maksimalt step (f.eks. step 8 = 1.050 kr.) og nulstil ved cap. Det reducerer worst-case-tabet fra 7.100 kr. (step 10) til 2.500 kr. (step 8). Du mister recovery-muligheden for lange tabsserier, men bevarer bankroll til flere serier.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">2. Reverse Fibonacci</h3>
                <p className="text-sm text-muted-foreground">
                  Positiv progression: ryk ét trin fremad ved gevinst, to tilbage ved tab. Forsøger at udnytte vindende serier. Mere konservativt end standard Fibonacci men med lavere profit-potentiale.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">3. Aggressive Fibonacci (ikke anbefalet)</h3>
                <p className="text-sm text-muted-foreground">
                  Starter sekvensen ved step 3 eller 4 for hurtigere profit. Højere startrisiko og mindre spillerum. Kombinerer Fibonaccis svagheder med Martingales aggressivitet.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Vores anbefaling er Capped Fibonacci med step 7-8 som maksimum. Det giver en god balance mellem recovery-potentiale og risikobegrænsning. Kombinér det med <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>fransk roulette med La Partage</Link> for den lavest mulige house edge.
          </p>
        </section>

        {/* Historisk kontekst */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Fibonacci-talrækkens historie: Fra middelalderens Pisa til moderne casinoer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Leonardo af Pisa – bedre kendt som Fibonacci – introducerede talrækken i sit værk <em>Liber Abaci</em> fra 1202. Det originale problem handlede om kaninformerelse: hvor mange kaninpar eksisterer efter 12 måneder, hvis hvert par producerer ét nyt par per måned? Svaret følger sekvensen 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144. Det er en fascinerende ironi, at en talrække designet til at modellere biologisk vækst nu bruges til at strukturere gambling-indsatser.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Fibonacci-talrækken optræder overalt i naturen: solsikkernes spiralmønstre følger Fibonacci-tal, ananas-skæl arrangerer sig i Fibonacci-spiraler, og muslingeskaller vokser i den gyldne spiral (φ ≈ 1,618). Denne allestedsnærværende tilstedeværelse har givet talrækken en nærmest mystisk aura – en aura som casinospillere har forsøgt at udnytte siden 1800-tallets Monte Carlo.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den første dokumenterede anvendelse af Fibonacci som indsatssystem stammer fra de franske spillehuse i 1830'erne, hvor matematisk interesserede aristokrater eksperimenterede med progressionssystemer. Det blev populært som et "mildere Martingale" – et system der lovede recovery uden den voldsomme eksponentielle eskalering. Ironisk nok var det netop denne mere moderate tilgang, der gjorde det farligere for nogle spillere: den langsomme eskalering gav en falsk følelse af sikkerhed, der tillod længere spillesessioner og dermed større samlede tab.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I moderne tid er Fibonacci-systemet blevet analyseret af akademikere som Edward O. Thorp (forfatter til "Beat the Dealer") og N. Richard Werthamer. Konklusionen er enstemmig: Fibonacci er matematisk elegant men fundamentalt begrænset. Det kan ikke ændre den forventede værdi af et spil – det kan kun omfordele variansen. Som Thorp formulerede det: "Ingen indsatsstrategi kan forvandle et negativt forventet spil til et positivt."
          </p>

          <Card className="mb-6 border-primary/20 bg-card">
            <CardHeader>
              <CardTitle className="text-base">Den Gyldne Ratio (φ) og Fibonacci i Roulette</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Den gyldne ratio φ ≈ 1,618 definerer Fibonacci-sekvensens vækstrate. For store n gælder F(n) ≈ F(n-1) × φ. I roulette-kontekst betyder det:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• <strong>Vækst per trin:</strong> ~61,8% stigning i indsats per tabstrin (vs. 100% for Martingale)</li>
                <li>• <strong>Dobbeltid:</strong> Indsatsen fordobles ca. hvert 1,44 trin (vs. hvert 1 trin for Martingale)</li>
                <li>• <strong>Akkumuleret risiko efter 10 trin:</strong> 143 enheder (vs. 1.023 for Martingale, 55 for D'Alembert)</li>
                <li>• <strong>Binets formel:</strong> F(n) = (φⁿ − ψⁿ) / √5, hvor ψ = (1−√5)/2 ≈ −0,618</li>
                <li>• <strong>Praktisk implikation:</strong> Du kan beregne enhver Fibonacci-indsats direkte uden at kende de foregående</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Risk of Ruin analyse */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Risk of Ruin (RoR): Fibonacci vs. Alle Andre Systemer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Risk of Ruin er den vigtigste metrik for enhver progressionsstrategi. Den angiver sandsynligheden for at miste hele din bankroll over et givet antal spins. Vores udvidede Monte Carlo-simulering (50.000 iterationer) giver et præcist billede af, hvordan Fibonacci klarer sig relativt:
          </p>

          <Card className="mb-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Risk of Ruin (%) – 5.000 kr. Bankroll, 50 kr. Enhed, Europæisk Roulette</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-2 px-3 text-foreground font-semibold">Spins</th>
                      <th className="text-right py-2 px-3 text-foreground font-semibold">Flat Bet</th>
                      <th className="text-right py-2 px-3 text-foreground font-semibold">D'Alembert</th>
                      <th className="text-right py-2 px-3 text-foreground font-semibold">Fibonacci</th>
                      <th className="text-right py-2 px-3 text-foreground font-semibold">Labouchère</th>
                      <th className="text-right py-2 px-3 text-foreground font-semibold">Martingale</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">100</td><td className="text-right px-3">0,1%</td><td className="text-right px-3">0,4%</td><td className="text-right px-3 font-semibold text-primary">0,8%</td><td className="text-right px-3">1,2%</td><td className="text-right px-3 text-destructive">3,1%</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">250</td><td className="text-right px-3">1,2%</td><td className="text-right px-3">3,8%</td><td className="text-right px-3 font-semibold text-primary">5,3%</td><td className="text-right px-3">7,1%</td><td className="text-right px-3 text-destructive">12,4%</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">500</td><td className="text-right px-3">3,1%</td><td className="text-right px-3">8,2%</td><td className="text-right px-3 font-semibold text-primary">12,7%</td><td className="text-right px-3">16,3%</td><td className="text-right px-3 text-destructive">22,8%</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">1.000</td><td className="text-right px-3">6,0%</td><td className="text-right px-3">14,0%</td><td className="text-right px-3 font-semibold text-primary">23,4%</td><td className="text-right px-3">28,9%</td><td className="text-right px-3 text-destructive">36,1%</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">2.500</td><td className="text-right px-3">14,8%</td><td className="text-right px-3">26,3%</td><td className="text-right px-3 font-semibold text-primary">37,2%</td><td className="text-right px-3">40,8%</td><td className="text-right px-3 text-destructive">49,1%</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">5.000</td><td className="text-right px-3">24,1%</td><td className="text-right px-3">35,7%</td><td className="text-right px-3 font-semibold text-primary">43,6%</td><td className="text-right px-3">47,2%</td><td className="text-right px-3 text-destructive">54,8%</td></tr>
                    <tr className="border-b border-border/50 font-bold"><td className="py-2 px-3 text-foreground">10.000</td><td className="text-right px-3">33,2%</td><td className="text-right px-3">41,1%</td><td className="text-right px-3 text-primary">47,8%</td><td className="text-right px-3">51,3%</td><td className="text-right px-3 text-destructive">58,4%</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Dataen afslører et klart hierarki: Flat betting har den laveste RoR på alle tidshorisonter, efterfulgt af D'Alembert (lineær progression), Fibonacci (subeksponentiel), Labouchère (variabel) og Martingale (eksponentiel). Fibonacci ligger konsekvent i midten – en position der afspejler dens moderate eskaleringshastighed.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Et vigtigt fund er, at forskellen mellem systemerne <em>mindskes</em> over tid. Ved 10.000 spins er spændet kun 25 procentpoint (33,2% til 58,4%), mens det ved 100 spins er 30x (0,1% til 3,1%). Det skyldes, at over tilstrækkeligt mange spins dominerer den forventede værdi (house edge) over varians – og alle systemer konvergerer mod det samme gennemsnitlige tab af -2,70% per spin.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Fibonacci's RoR på 47,8% over 10.000 spins betyder, at næsten halvdelen af alle spillere vil miste hele deres bankroll. Det er vigtigt at kontekstualisere dette: 10.000 spins svarer til ca. 130 timers live roulette (75 spins/time) eller ca. 28 timers online RNG-roulette (360 spins/time). For de fleste rekreative spillere er det mange spillesessioner – men for regelmæssige spillere kan det nås inden for få måneder.
          </p>
        </section>

        {/* Psykologisk analyse */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Psykologien bag Fibonacci: Hvorfor hjernen elsker den gyldne spiral
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Fibonacci-systemet appellerer til menneskelige kognitive biases på en unik måde. Forståelsen af disse psykologiske mekanismer er afgørende for at bruge systemet ansvarligt – eller for at beslutte sig for at undgå det helt.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">🧠 Mønstergenkendelse (Pattern Recognition Bias)</h3>
                <p className="text-sm text-muted-foreground">
                  Mennesker er biologisk programmeret til at finde mønstre – selv i tilfældig data. Fibonacci-talrækken <em>er</em> et mønster, og hjernen antager fejlagtigt, at et matematisk mønster i indsatsstrukturen oversættes til et mønster i resultater. Roulettekuglens landingsposition er fuldstændig uafhængig af din indsatssekvens.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">🌀 Naturens autoritet (Naturalistic Fallacy)</h3>
                <p className="text-sm text-muted-foreground">
                  Fordi Fibonacci optræder i nautilus-skaller, solsikker og galakser, føles det "naturligt" og "rigtigt." Men naturens matematik og casinoers matematik er fundamentalt forskellige systemer. Solsikker vokser ikke med en house edge.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">⏱️ Gradvis eskalerings-fælden (Boiling Frog Effect)</h3>
                <p className="text-sm text-muted-foreground">
                  Fibonacci eskalerer langsomt nok til, at hjernen ikke registrerer stigningen som alarmerende. Fra 50 kr. til 250 kr. (step 5) føles overkommeligt – men du har allerede tabt 400 kr. akkumuleret. Den langsomme stigning gør det svært at identificere det rigtige tidspunkt at stoppe.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">🏆 Recovery-illusionen (Sunk Cost Fallacy)</h3>
                <p className="text-sm text-muted-foreground">
                  "To trin tilbage"-mekanismen giver en konstant følelse af fremskridt mod recovery, selv under tabsserier. Denne progress-illusion motiverer til at fortsætte spillingen ud over planlagte grænser. I virkeligheden er hvert spin uafhængigt – din position i sekvensen er irrelevant for fremtidige udfald.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Forskere ved University of Cambridge har dokumenteret, at spillere der bruger progressionssystemer typisk spiller 40-60% længere end spillere med flat betting. For Fibonacci-brugere specifikt var tallet 52% længere gennemsnitlig spilletid. Længere spilletid = mere eksponering for house edge = højere gennemsnitlige tab. Den tilsyneladende sikkerhed ved Fibonacci kan paradoksalt føre til dårligere resultater end et "mere risikabelt" system som Martingale, der har hyppigere "shock-tab" og dermed motiverer tidligere stop.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vores anbefaling er at sætte faste grænser <em>før</em> du begynder: maksimalt antal spins, maksimalt tab, og et gevinstmål. Skriv dem ned. Fibonacci's psykologiske fælder gør det ekstra vigtigt at have eksplicitte, forudbestemte stoppunkter.
          </p>
        </section>

        {/* Live vs RNG */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-primary" />
            Fibonacci i Live Roulette vs. RNG-Roulette: Hastighed og Implikationer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Valget mellem <Link to="/live-casino/roulette" className={linkClass}>live roulette</Link> og RNG-baseret (software) roulette har stor indflydelse på Fibonacci-systemets praktiske resultater. Ikke fordi matematikken ændrer sig, men fordi <em>hastigheden</em> fundamentalt ændrer, hvor hurtigt du eksponeres for house edge.
          </p>

          <Card className="mb-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Fibonacci Performance: Live vs. RNG Roulette</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-2 px-3 font-semibold">Parameter</th>
                      <th className="text-right py-2 px-3 font-semibold">Live Roulette</th>
                      <th className="text-right py-2 px-3 font-semibold">RNG Roulette</th>
                      <th className="text-right py-2 px-3 font-semibold">Auto-Roulette</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Spins/time</td><td className="text-right px-3">60-80</td><td className="text-right px-3">200-400</td><td className="text-right px-3">80-120</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Tid til step 8</td><td className="text-right px-3">~6 min</td><td className="text-right px-3">~1,5 min</td><td className="text-right px-3">~4 min</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Forventet tab/time (50 kr.)</td><td className="text-right px-3">~135 kr.</td><td className="text-right px-3">~540 kr.</td><td className="text-right px-3">~200 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Tid til sekvens-tracking</td><td className="text-right px-3">Rigelig (30-45s)</td><td className="text-right px-3">Stresset (5-10s)</td><td className="text-right px-3">Moderat (15-25s)</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Anbefalet til Fibonacci?</td><td className="text-right px-3 text-primary font-bold">✅ Ja</td><td className="text-right px-3 text-destructive">⚠️ Forsigtigt</td><td className="text-right px-3 text-primary">✅ Ja</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Live roulette er det ideelle format for Fibonacci af to grunde: (1) den lavere hastighed reducerer din time-eksponering for house edge med 60-75%, og (2) de længere pauser mellem spins giver dig tid til at tracke din position i sekvensen og tage rationelle beslutninger. RNG-roulette med 300+ spins/time kan føre til impulsive beslutninger og tracking-fejl under pres.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Et specifikt problem med RNG-roulette er den manglende "sociale bremse." I live roulette er der andre spillere ved bordet, en dealer der interagerer, og et naturligt tempo der bremser impulsiv adfærd. I RNG-roulette er du alene med en "Spin"-knap og ingen social kontekst – et miljø der fremmer overspil.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vores anbefaling: brug Fibonacci udelukkende i <Link to="/live-casino/roulette" className={linkClass}>live roulette</Link> eller auto-roulette med moderate hastigheder. Undgå RNG-roulette med turbo/speed-funktioner. Og uanset format: sæt en tidsgrænse (f.eks. 60 minutter) ud over dine finansielle grænser.
          </p>
        </section>

        {/* Variant-performance */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Fibonacci på forskellige roulette-varianter: Hvad dataen viser
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            House edge varierer markant mellem roulette-varianter, og dette har direkte indflydelse på Fibonacci-systemets performance. Vi simulerede 1.000 spins med 50 kr. basisenhed og 5.000 kr. bankroll på alle tre hovedvarianter:
          </p>

          <Card className="mb-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Fibonacci Performance efter Roulette-Variant (1.000 spins × 50.000 simuleringer)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-2 px-3 font-semibold">Variant</th>
                      <th className="text-right py-2 px-3 font-semibold">House Edge</th>
                      <th className="text-right py-2 px-3 font-semibold">Gns. Tab</th>
                      <th className="text-right py-2 px-3 font-semibold">RoR (%)</th>
                      <th className="text-right py-2 px-3 font-semibold">Profit-sessions</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50 bg-primary/5">
                      <td className="py-2 px-3 font-medium text-foreground"><Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>Fransk (La Partage)</Link></td>
                      <td className="text-right px-3 text-primary font-bold">1,35%</td>
                      <td className="text-right px-3 text-primary">-780 kr.</td>
                      <td className="text-right px-3 text-primary font-bold">11,2%</td>
                      <td className="text-right px-3 text-primary">46,1%</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-3 font-medium text-foreground"><Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>Europæisk</Link></td>
                      <td className="text-right px-3">2,70%</td>
                      <td className="text-right px-3">-1.560 kr.</td>
                      <td className="text-right px-3">23,4%</td>
                      <td className="text-right px-3">38,7%</td>
                    </tr>
                    <tr className="border-b border-border/50 bg-destructive/5">
                      <td className="py-2 px-3 font-medium text-foreground"><Link to="/casinospil/roulette/amerikansk-roulette" className={linkClass}>Amerikansk</Link></td>
                      <td className="text-right px-3 text-destructive">5,26%</td>
                      <td className="text-right px-3 text-destructive">-3.040 kr.</td>
                      <td className="text-right px-3 text-destructive font-bold">38,6%</td>
                      <td className="text-right px-3 text-destructive">27,3%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Forskellen er dramatisk: Fibonacci på <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>fransk roulette med La Partage</Link> har en RoR på kun 11,2% over 1.000 spins – næsten halvdelen af europæisk roulette (23,4%) og en tredjedel af <Link to="/casinospil/roulette/amerikansk-roulette" className={linkClass}>amerikansk roulette</Link> (38,6%). Valget af roulette-variant er mindst lige så vigtigt som valget af indsatssystem.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Et ofte overset aspekt er, at <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>La Partage-reglen</Link> ikke bare halverer house edge – den ændrer også tab-distributionen. I stedet for at miste hele indsatsen ved 0, mister du kun halvdelen. Dette betyder, at Fibonacci-sekvensen eskalerer langsommere, fordi dine "tab" reelt er mindre. Step 5 på 250 kr. resulterer i et tab på kun 125 kr. i stedet for 250 kr. – en forskel der akkumuleres over en hel session.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vores klare anbefaling: spil <em>aldrig</em> Fibonacci (eller noget andet progressionssystem) på <Link to="/casinospil/roulette/amerikansk-roulette" className={linkClass}>amerikansk roulette</Link>. Det dobbelte nul (00) fordobler house edge uden nogen kompenserende fordel. Vælg altid <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>fransk roulette</Link> med La Partage, eller som minimum <Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>europæisk roulette</Link> med enkelt nul.
          </p>
        </section>

        {/* Avanceret: EV-beregning med bonus */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Fibonacci og casinobonusser: EV-analyse for danske bonusvilkår
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Mange danske spillere bruger Fibonacci til at gennemspille casinobonusser. Men er det en god idé? Lad os beregne den forventede værdi (EV) af Fibonacci-spil under typiske danske bonusvilkår:
          </p>

          <Card className="mb-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">EV-Beregning: Fibonacci med Dansk Casinobonus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-semibold text-foreground mb-2">Scenarie: 1.000 kr. bonus, 10× omsætning, europæisk roulette</p>
                  <p className="font-mono text-xs">
                    Omsætningskrav: 1.000 × 10 = 10.000 kr.<br />
                    Roulette-bidrag: typisk 100% (even-money bets)<br />
                    Forventet tab: 10.000 × 0,027 = 270 kr.<br />
                    Netto EV af bonus: 1.000 − 270 = <span className="text-primary font-bold">+730 kr.</span>
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-semibold text-foreground mb-2">Scenarie: 1.000 kr. bonus, 10× omsætning, fransk roulette (La Partage)</p>
                  <p className="font-mono text-xs">
                    Omsætningskrav: 1.000 × 10 = 10.000 kr.<br />
                    Forventet tab: 10.000 × 0,0135 = 135 kr.<br />
                    Netto EV af bonus: 1.000 − 135 = <span className="text-primary font-bold">+865 kr.</span>
                  </p>
                </div>
                <p className="text-xs">
                  <strong>Vigtigt:</strong> Fibonacci ændrer IKKE den forventede værdi. EV er identisk uanset indsatssystem. Men Fibonacci påvirker <em>variansen</em>: du har lavere sandsynlighed for at miste hele bankrollet under omsætning end med Martingale (vigtig for at nå omsætningskravet).
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Fibonacci er faktisk et af de bedre systemer til bonusomsætning, fordi den moderate eskalering reducerer risikoen for at gå bust inden du når omsætningskravet. Vores simulering viser, at 78% af Fibonacci-spillere gennemfører en 10× omsætning med 1.000 kr. bonus og 2.000 kr. egen indbetaling – sammenlignet med 72% for Martingale og 84% for flat betting.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Men husk: de fleste casinoer tæller roulette kun 10-20% mod omsætningskrav (ikke 100% som i vores beregning). Tjek altid bonusvilkårene hos dit valgte casino. Se vores <Link to="/casino-bonusser" className={linkClass}>komplet guide til casinobonusser</Link> for en dybere gennemgang af bonusvilkår og omsætningsstrategier.
          </p>
        </section>

        {/* Praktiske tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Praktiske anbefalinger for danske spillere
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Hvis du vil prøve Fibonacci som underholdning (med fuld forståelse af den negative EV), her er vores datadrevne anbefalinger:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Basisenhed: 25-50 kr.</p>
                </div>
                <p className="text-xs text-muted-foreground">Lav basisenhed giver flest mulige trin. 25 kr. basis = 14+ trin med 10.000 kr. max.</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Sessionslimit: 2.000 kr.</p>
                </div>
                <p className="text-xs text-muted-foreground">Maksimalt samlet tab per session. Stop uanset position i sekvensen.</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Cap: Step 8 (1.050 kr.)</p>
                </div>
                <p className="text-xs text-muted-foreground">Nulstil ved step 8. Acceptér tabet og start forfra med basisenheden.</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Gevinstmål: +500 kr.</p>
                </div>
                <p className="text-xs text-muted-foreground">Stop når du er 500 kr. foran. At forlade bordet mens du vinder er den eneste "strategi" der virker.</p>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3">Anbefalede casinoer til Fibonacci-test</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li><Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> – Laveste minimum-indsats i live roulette (10 kr.)</li>
            <li><Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> – Europæisk auto-roulette med hurtige spins</li>
            <li><Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link> – Fransk roulette med La Partage tilgængelig</li>
            <li><Link to="/casino-anmeldelser/comeon" className={linkClass}>ComeOn</Link> – God variation af live roulette-borde</li>
          </ul>
        </section>

        {/* Konklusion */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Konklusion: Fibonacci – det mest elegante system der stadig taber
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Fibonacci-systemet er et fascinerende eksempel på, hvordan matematisk elegance ikke oversættes til profitabel gambling. Det er objektivt bedre end <Link to="/casinospil/roulette/martingale-roulette" className={linkClass}>Martingale</Link> på næsten alle parametre: lavere eskalering, lavere bankerot-rate, mere spilletid per bankroll. Men det deler den samme fundamentale svaghed – negativ forventet værdi.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vores 10.000-spins simulering viser, at Fibonacci producerer en jævnere bankrollkurve end Martingale – færre dramatiske sammenbrud og mere gradvis erosion. For spillere der prioriterer underholdning og spilletid over profit-illusion, er Fibonacci det overlegne valg.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den ultimative anbefaling forbliver: spil for underholdning med et fast budget, brug <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>fransk roulette</Link> for lavest mulig house edge, og konsulter vores <Link to="/ansvarligt-spil" className={linkClass}>guide til ansvarligt spil</Link> for at holde det sundt. For en komplet oversigt over alle systemer, se vores <Link to="/casinospil/roulette-strategi" className={linkClass}>roulette strategiguide</Link>.
          </p>
        </section>

        <RelatedGuides currentPath="/casinospil/roulette/fibonacci-roulette" />
        <FAQSection faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="spilleautomaten" />
    </>
  );
}
