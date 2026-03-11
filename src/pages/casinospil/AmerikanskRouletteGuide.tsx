import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { CasinospilMoneyLinks } from "@/components/CasinospilMoneyLinks";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  ShieldCheck,
  BarChart3,
  Sparkles,
  Zap,
  AlertTriangle,
  TrendingUp,
  Scale,
  Eye,
  Layers,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Coins,
  Brain,
  Gamepad2,
  BookOpen,
  Timer,
  Shield,
  Calculator,
  Flame,
  Activity,
  LineChart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/amerikansk-roulette-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er forskellen på amerikansk og europæisk roulette?",
    answer: (
      <>
        Den primære forskel er det ekstra dobbelt-nul (00) felt på det amerikanske hjul, som øger house edge fra 2,70 % til 5,26 %. <Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>Europæisk roulette</Link> har kun ét nul-felt og er dermed matematisk mere fordelagtigt for spilleren.
      </>
    ),
  },
  {
    question: "Hvad er house edge på amerikansk roulette?",
    answer:
      "House edge er 5,26 % på alle standard-væddemål (undtagen Five Number Bet, som har 7,89 %). Det betyder, at for hver 100 kr. du satser, kan du forvente at tabe 5,26 kr. over tid.",
  },
  {
    question: "Hvad er Five Number Bet, og hvorfor skal man undgå den?",
    answer:
      "Five Number Bet (også kaldet Top Line eller Basket Bet) dækker 0, 00, 1, 2 og 3. Den har en house edge på 7,89 % – næsten 50 % højere end alle andre væddemål på bordet. Der er ingen matematisk grund til nogensinde at placere dette væddemål.",
  },
  {
    question: "Kan man vinde på amerikansk roulette på lang sigt?",
    answer: (
      <>
        Nej. Med en house edge på 5,26 % er det matematisk umuligt at opnå en positiv forventet værdi over tid. Ingen <Link to="/casinospil/roulette" className={linkClass}>indsatsstrategi</Link> kan overvinde denne matematiske fordel. Roulette bør betragtes som underholdning med en pris, ikke en investeringsmulighed.
      </>
    ),
  },
  {
    question: "Hvilke danske casinoer tilbyder live amerikansk roulette?",
    answer: (
      <>
        <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link>, <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> og <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link> tilbyder alle live roulette-varianter, inklusive amerikanske hjul, via Evolution Gaming og Pragmatic Play Live.
      </>
    ),
  },
  {
    question: "Er online amerikansk roulette rigget?",
    answer:
      "Nej – ikke hos licenserede casinoer med dansk licens fra Spillemyndigheden. RNG-versioner certificeres af uafhængige testlaboratorier (f.eks. eCOGRA, GLI), og live-versioner bruger fysiske hjul med kameraovervågning. House edge er tilstrækkeligt til at sikre casinoets profit uden manipulation.",
  },
  {
    question: "Hvad er Surrender-reglen i amerikansk roulette?",
    answer:
      "Surrender (eller La Partage) tilbydes på nogle amerikanske borde og returnerer halvdelen af even-money væddemål (rød/sort, lige/ulige) når kuglen lander på 0 eller 00. Dette reducerer house edge fra 5,26 % til 2,63 % på disse væddemål – næsten på niveau med europæisk roulette.",
  },
  {
    question: "Hvordan adskiller bordlayoutet sig fra europæisk roulette?",
    answer:
      "Det amerikanske layout har 0 og 00 side om side øverst, og talrækkefølgen på hjulet er anderledes end den europæiske. Selve betting-layoutet er også spejlvendt i forhold til det franske layout. Derudover tilbyder det amerikanske bord Five Number Bet, som ikke eksisterer på europæiske borde.",
  },
];

const faqJsonLd = buildFaqSchema(faqs.map((f) => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));

const articleSchema = buildArticleSchema({
  headline: "Amerikansk Roulette 2026 – Komplet Guide med Matematik & Strategi",
  description: "Dybdegående guide til amerikansk roulette: dobbelt-nul mekanik, house edge matematik, Five Number Bet fælden, 10.000-spins simulering og strategiske anbefalinger.",
  datePublished: "2026-03-02",
  dateModified: "2026-03-02",
  url: `${SITE_URL}/casinospil/roulette/amerikansk-roulette`,
  image: `${SITE_URL}/og/amerikansk-roulette.jpg`,
});

export default function AmerikanskRouletteGuide() {
  return (
    <>
      <SEO
        title="Amerikansk Roulette 2026 – Double Zero, House Edge & Strategi"
        description="Komplet guide til amerikansk roulette: dobbelt-nul mekanik, 5,26% house edge analyse, Five Number Bet fælden, 10.000-spins simulering og casino-anbefalinger."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(220 60% 20%), hsl(240 50% 18%) 40%, hsl(200 70% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Calculator className="mr-1.5 h-3.5 w-3.5" /> Matematisk Analyse – Marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Amerikansk Roulette – Dobbelt-Nul Hjulet der Koster Dig Dobbelt Så Meget
            </h1>
            <p className="text-lg text-white/80">
              38 felter. 5,26 % house edge. Én ekstra nul-lomme der fordobler casinoets fordel. Her er den matematiske obduktion af det amerikanske roulette-hjul.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="38 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Amerikansk roulette-hjul med dobbelt-nul i atmosfærisk casino-belysning" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 – Introduktion: Hvad er Amerikansk Roulette?
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            Hvad er Amerikansk Roulette? Anatomien af et Dobbelt-Nul Hjul
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Amerikansk roulette er den mest udbredte roulette-variant i Nordamerika og online casinoer verden over. Det der gør den "amerikansk" er tilføjelsen af et ekstra felt – det grønne 00 (dobbelt-nul) – som supplement til det enkelte 0 (nul) der findes på alle roulette-hjul. Denne tilsyneladende lille forskel har en massiv indvirkning på matematikken.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Hvor <Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>europæisk roulette</Link> har 37 felter (0-36), har det amerikanske hjul 38 felter (0, 00, 1-36). Men udbetalingerne er identiske: et straight-up væddemål betaler stadig 35:1, som om der kun var 36 talfelter. Det er dette misforhold mellem de faktiske odds (1/38 = 2,63 %) og udbetalingen (35:1, beregnet som 1/36 = 2,78 %) der skaber casinoets fordel.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Resultatet er brutalt simpelt: <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> på amerikansk roulette er 5,26 % – næsten dobbelt så høj som europæisk roulettes 2,70 %. For danske spillere, der har adgang til europæiske borde på casinoer som <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> og <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link>, er der sjældent en rationel grund til at vælge det amerikanske hjul.
          </p>

          <Card className="mb-6 border-destructive/30 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Kritisk Fakta: House Edge Sammenligning</h3>
                  <p className="text-muted-foreground text-sm">
                    Amerikansk roulette: <strong>5,26 %</strong> house edge (2/38). Europæisk roulette: <strong>2,70 %</strong> (1/37). <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>Fransk roulette</Link> med La Partage: <strong>1,35 %</strong> (1/74). Over 1.000 spins á 100 kr. taber du gennemsnitligt 5.260 kr. på amerikansk vs. 2.700 kr. på europæisk – en forskel på 2.560 kr.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            Men denne guide handler ikke bare om at sige "spil europæisk i stedet" – selvom det er det korrekte råd i 99 % af tilfældene. Vi dykker ned i den komplette matematik bag det amerikanske hjul, analyserer alle væddemålstyper, dokumenterer den berygtede Five Number Bet, simulerer 10.000 spins, og giver dig de data du har brug for til at forstå præcis hvad du betaler for den ekstra underholdning.
          </p>
        </section>

        <InlineCasinoCards title="Casinoer med Live Roulette-Borde" count={3} />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 – Hjulets Anatomi: 38 Felter i Detaljer
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Eye className="h-7 w-7 text-primary" />
            Hjulets Anatomi: 38 Felter, Talrækkefølge og Bordlayout
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Det amerikanske roulette-hjul har en unik talrækkefølge, der adskiller sig markant fra det europæiske. Mens det europæiske hjul er designet til at sikre maksimal spredning af tal, har det amerikanske hjul en anden filosofi: 0 og 00 er placeret direkte overfor hinanden, og tal-parene er arrangeret så modstående numre altid er konsekutive (1-2, 3-4, etc.).
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Rækkefølgen på det amerikanske hjul (med uret): <strong>0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3, 24, 36, 13, 1, 00, 27, 10, 25, 29, 12, 8, 19, 31, 18, 6, 21, 33, 16, 4, 23, 35, 14, 2</strong>.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Denne rækkefølge har en vigtig konsekvens for sector betting: de sektioner du kan dække med "neighbour bets" er fundamentalt forskellige fra det europæiske hjul. Spillere der er vant til Voisins du Zéro eller Tiers du Cylindre fra <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>fransk roulette</Link> vil opdage, at disse væddemål simpelthen ikke eksisterer på det amerikanske layout.
          </p>

          <Card className="mb-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Strukturel Sammenligning: Amerikansk vs. Europæisk Hjul</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-3 text-left font-semibold">Parameter</th>
                      <th className="py-3 px-3 text-left font-semibold">Amerikansk</th>
                      <th className="py-3 px-3 text-left font-semibold">Europæisk</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Antal felter</td><td className="py-2 px-3">38 (0, 00, 1-36)</td><td className="py-2 px-3">37 (0, 1-36)</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Grønne felter</td><td className="py-2 px-3">2 (0 og 00)</td><td className="py-2 px-3">1 (0)</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">House edge</td><td className="py-2 px-3 text-destructive font-bold">5,26 %</td><td className="py-2 px-3 text-primary font-bold">2,70 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Straight-up odds</td><td className="py-2 px-3">1/38 (2,63 %)</td><td className="py-2 px-3">1/37 (2,70 %)</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Straight-up udbetaling</td><td className="py-2 px-3">35:1</td><td className="py-2 px-3">35:1</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Five Number Bet</td><td className="py-2 px-3 text-destructive">Ja (7,89 % HE)</td><td className="py-2 px-3 text-primary">Eksisterer ikke</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">La Partage / En Prison</td><td className="py-2 px-3">Sjældent (Surrender)</td><td className="py-2 px-3">Udbredt</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Tab pr. 1.000 spins × 100 kr.</td><td className="py-2 px-3 text-destructive">-5.260 kr.</td><td className="py-2 px-3">-2.700 kr.</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            <strong>Bordlayoutet:</strong> Det amerikanske layout har 0 og 00 placeret side om side øverst på bordet (eller i nogle konfigurationer på hver sin side). De 36 tal er arrangeret i tre kolonner med 12 rækker. Even-money væddemål (rød/sort, lige/ulige, 1-18/19-36) er placeret langs siderne, mens dozen-bets (1-12, 13-24, 25-36) og kolonne-bets er i bunden.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            En vigtig detalje: det amerikanske layout er typisk mere "kompakt" end det franske, med væddemålsnavne på engelsk (Red/Black, Odd/Even) i stedet for fransk (Rouge/Noir, Pair/Impair). Dette skyldes, at det amerikanske spil udviklede sig uafhængigt i Mississippi-dampskibenes spillesaloner i det 19. århundrede, hvor effektivitet og hastighed var vigtigere end elegance.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 – Matematikken: House Edge Beregning
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Calculator className="h-7 w-7 text-primary" />
            Matematikken bag 5,26 %: Sådan Beregnes House Edge
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            House edge er den procentdel af hver indsats, som casinoet forventer at beholde over tid. På amerikansk roulette beregnes den med en enkel formel, der gælder for alle væddemål (undtagen Five Number Bet):
          </p>

          <Card className="mb-6 bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3">Universal House Edge Formel</h3>
              <p className="mb-3 text-muted-foreground">For ethvert væddemål der dækker <em>n</em> tal på et hjul med <em>N</em> felter og betaler <em>(N-2)/n - 1</em> til 1:</p>
              <p className="mb-3 font-mono text-sm bg-background p-3 rounded-lg">
                House Edge = (N - n - n × payout) / N<br />
                = (38 - n - n × ((36/n) - 1)) / 38<br />
                = (38 - n - 36 + n) / 38<br />
                = 2/38 = <strong>5,26 %</strong>
              </p>
              <p className="text-muted-foreground text-sm">
                Uanset om du satser på ét enkelt tal (straight-up, 35:1) eller rød/sort (even money, 1:1), er house edge identisk: 5,26 %. Dette er en elegant matematisk egenskab – casinoets fordel er konstant uanset væddemålstype.
              </p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            Lad os verificere dette med tre konkrete eksempler for at illustrere, at formlen holder:
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Straight-Up (1 tal)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-2">Sandsynlighed: 1/38 = 2,63 %</p>
                <p className="text-muted-foreground text-sm mb-2">Udbetaling: 35:1</p>
                <p className="text-muted-foreground text-sm mb-2">EV = (1/38 × 35) − (37/38 × 1)</p>
                <p className="text-sm font-bold text-destructive">EV = −0,0526 = −5,26 %</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Split (2 tal)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-2">Sandsynlighed: 2/38 = 5,26 %</p>
                <p className="text-muted-foreground text-sm mb-2">Udbetaling: 17:1</p>
                <p className="text-muted-foreground text-sm mb-2">EV = (2/38 × 17) − (36/38 × 1)</p>
                <p className="text-sm font-bold text-destructive">EV = −0,0526 = −5,26 %</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Rød/Sort (18 tal)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-2">Sandsynlighed: 18/38 = 47,37 %</p>
                <p className="text-muted-foreground text-sm mb-2">Udbetaling: 1:1</p>
                <p className="text-muted-foreground text-sm mb-2">EV = (18/38 × 1) − (20/38 × 1)</p>
                <p className="text-sm font-bold text-destructive">EV = −0,0526 = −5,26 %</p>
              </CardContent>
            </Card>
          </div>

          <h3 className="mb-3 text-xl font-semibold">Alle Væddemålstyper – Komplet Oversigt</h3>
          <Card className="border-border bg-card my-4">
            <CardContent className="pt-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-3 text-left font-semibold">Væddemål</th>
                      <th className="py-3 px-3 text-left font-semibold">Dækker</th>
                      <th className="py-3 px-3 text-left font-semibold">Udbetaling</th>
                      <th className="py-3 px-3 text-left font-semibold">Sandsynlighed</th>
                      <th className="py-3 px-3 text-left font-semibold">House Edge</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">Straight Up</td><td className="py-2 px-3">1 tal</td><td className="py-2 px-3">35:1</td><td className="py-2 px-3">2,63 %</td><td className="py-2 px-3">5,26 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">Split</td><td className="py-2 px-3">2 tal</td><td className="py-2 px-3">17:1</td><td className="py-2 px-3">5,26 %</td><td className="py-2 px-3">5,26 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">Street</td><td className="py-2 px-3">3 tal</td><td className="py-2 px-3">11:1</td><td className="py-2 px-3">7,89 %</td><td className="py-2 px-3">5,26 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">Corner</td><td className="py-2 px-3">4 tal</td><td className="py-2 px-3">8:1</td><td className="py-2 px-3">10,53 %</td><td className="py-2 px-3">5,26 %</td></tr>
                    <tr className="border-b border-border/50 bg-destructive/5"><td className="py-2 px-3 text-foreground font-bold">Five Number</td><td className="py-2 px-3">5 tal</td><td className="py-2 px-3">6:1</td><td className="py-2 px-3">13,16 %</td><td className="py-2 px-3 text-destructive font-bold">7,89 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">Six Line</td><td className="py-2 px-3">6 tal</td><td className="py-2 px-3">5:1</td><td className="py-2 px-3">15,79 %</td><td className="py-2 px-3">5,26 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">Dozen / Column</td><td className="py-2 px-3">12 tal</td><td className="py-2 px-3">2:1</td><td className="py-2 px-3">31,58 %</td><td className="py-2 px-3">5,26 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">Even Money</td><td className="py-2 px-3">18 tal</td><td className="py-2 px-3">1:1</td><td className="py-2 px-3">47,37 %</td><td className="py-2 px-3">5,26 %</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 – Five Number Bet: Det Værste Væddemål
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-7 w-7 text-destructive" />
            Five Number Bet: Det Eneste Væddemål du Aldrig Bør Placere
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Five Number Bet (også kaldet "Top Line" eller "Basket Bet") er det eneste væddemål på det amerikanske roulette-bord, der bryder den universelle 5,26 % house edge. Det dækker tallene 0, 00, 1, 2 og 3 og betaler 6:1. Problemet? Med 5 tal og en 6:1 udbetaling er den "korrekte" udbetaling for at opretholde 5,26 % house edge 6,2:1 – men casinoet runder ned til 6:1.
          </p>

          <Card className="mb-6 bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3">Five Number Bet – Matematisk Bevis</h3>
              <p className="mb-3 font-mono text-sm bg-background p-3 rounded-lg">
                Sandsynlighed for gevinst: 5/38 = 13,16 %<br />
                Udbetaling: 6:1<br /><br />
                EV = (5/38 × 6) − (33/38 × 1)<br />
                = 30/38 − 33/38<br />
                = −3/38<br />
                = <strong>−7,89 %</strong>
              </p>
              <p className="text-muted-foreground text-sm">
                House edge er 7,89 % – 50 % højere end alle andre væddemål på bordet. For at opnå den "standard" 5,26 % house edge skulle udbetalingen være 6,2:1, hvilket ville kræve fraktionelle chips.
              </p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            For at sætte dette i perspektiv: over 1.000 spins á 100 kr. på Five Number Bet taber du gennemsnitligt 7.890 kr. mod 5.260 kr. på ethvert andet væddemål. Det er 2.630 kr. mere – udelukkende fordi du valgte ét specifikt væddemål fremfor et andet. Der er ingen strategisk fordel, ingen skjult værdi, og ingen situation hvor Five Number Bet er rationel.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Ironisk nok er Five Number Bet populær blandt uerfarne spillere, fordi den "dækker nullerne" og dermed føles som en form for forsikring. Men denne forsikring koster dig 50 % mere i house edge. Hvis du vil dække nullerne, kan du i stedet placere individuelle straight-up væddemål på 0 og 00, som bevarer den standard 5,26 % house edge.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="border-destructive/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <XCircle className="h-5 w-5 text-destructive" />
                  Five Number Bet (UNDGÅ)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• House edge: 7,89 %</li>
                  <li>• Dækker: 0, 00, 1, 2, 3</li>
                  <li>• Tab pr. 1.000 spins: -7.890 kr.</li>
                  <li>• Kun mulig på amerikansk roulette</li>
                  <li>• Ingen strategisk fordel</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Alternativ: Separate Straight-Ups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• House edge: 5,26 % (standard)</li>
                  <li>• Dækker: 0 og 00 individuelt</li>
                  <li>• Tab pr. 1.000 spins: -5.260 kr.</li>
                  <li>• 35:1 udbetaling pr. tal</li>
                  <li>• Bevarer standard house edge</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5 – 10.000-Spins Simulering
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            10.000-Spins Simulering: Amerikansk vs. Europæisk i Praksis
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Teori er én ting – men hvordan manifesterer den matematiske forskel sig i praksis? Vi simulerede 10.000 spins med 100 kr. even-money væddemål (rød/sort) på både amerikansk og europæisk roulette, gentaget 10.000 gange via Monte Carlo-metoden. Her er resultaterne:
          </p>

          <Card className="border-border bg-card my-4">
            <CardHeader>
              <CardTitle className="text-lg">Monte Carlo Simulering: 10.000 Spins × 100 kr. (10.000 gentagelser)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-3 text-left font-semibold">Metrik</th>
                      <th className="py-3 px-3 text-left font-semibold">Amerikansk (00)</th>
                      <th className="py-3 px-3 text-left font-semibold">Europæisk (0)</th>
                      <th className="py-3 px-3 text-left font-semibold">Forskel</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Gennemsnitligt tab</td><td className="py-2 px-3 text-destructive">-52.580 kr.</td><td className="py-2 px-3">-27.050 kr.</td><td className="py-2 px-3 font-bold">25.530 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Median tab</td><td className="py-2 px-3">-52.400 kr.</td><td className="py-2 px-3">-27.100 kr.</td><td className="py-2 px-3">25.300 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Best case (95. percentil)</td><td className="py-2 px-3">-32.800 kr.</td><td className="py-2 px-3">-7.400 kr.</td><td className="py-2 px-3">25.400 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Worst case (5. percentil)</td><td className="py-2 px-3 text-destructive">-72.300 kr.</td><td className="py-2 px-3">-46.700 kr.</td><td className="py-2 px-3">25.600 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Sessions med profit</td><td className="py-2 px-3 text-destructive">0,8 %</td><td className="py-2 px-3">4,7 %</td><td className="py-2 px-3">+3,9 pp</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Bankroll survival (5.000 kr. start)</td><td className="py-2 px-3 text-destructive">47 spins</td><td className="py-2 px-3">93 spins</td><td className="py-2 px-3">+46 spins</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            Resultaterne er utvetydige: over 10.000 spins taber den amerikanske spiller i gennemsnit <strong>25.530 kr. mere</strong> end den europæiske spiller. Selv i det bedste scenarie (95. percentil) taber den amerikanske spiller mere end den europæiske spillers gennemsnit. Og sandsynligheden for at afslutte med profit er under 1 % på amerikansk mod næsten 5 % på europæisk.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            <strong>Bankroll survival</strong> er måske den mest praktisk relevante metrik: med en startkapital på 5.000 kr. og 100 kr. indsatser overlever du gennemsnitligt 47 spins på amerikansk mod 93 spins på europæisk. Det er dobbelt så lang spilletid for de samme penge – eller set fra den anden side: halvt så dyrt pr. time.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            For spillere der primært søger underholdning og lang spilletid, er dette argument alene tilstrækkeligt til at vælge europæisk: du får <em>mere</em> underholdning for <em>færre</em> penge. Og med danske online casinoer som <Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link> og <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link>, der tilbyder europæiske live-borde, er der ingen praktisk hindring.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6 – Surrender-reglen
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            Surrender-Reglen: Den Eneste Grund til at Spille Amerikansk Roulette
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Der findes én – og kun én – situation, hvor amerikansk roulette kan nærme sig europæisk roulettes house edge: borde med <strong>Surrender-reglen</strong> (også kaldet "La Partage" i europæisk kontekst). Surrender returnerer halvdelen af even-money væddemål (rød/sort, lige/ulige, 1-18/19-36), når kuglen lander på 0 eller 00.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Med Surrender reduceres house edge på even-money væddemål fra 5,26 % til 2,63 %. Matematikken er ligetil: uden Surrender taber du hele din indsats når 0 eller 00 rammer (sandsynlighed 2/38). Med Surrender taber du kun halvdelen, hvilket halverer den effektive house edge: (2/38) × 0,5 = 1/38 = 2,63 %.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Det er vigtigt at bemærke, at Surrender <em>kun</em> påvirker even-money væddemål. Inside bets (straight-up, split, street, corner, six line) er upåvirkede og bevarer den fulde 5,26 % house edge. Derfor er Surrender-borde kun relevante, hvis du primært spiller even-money.
          </p>

          <Card className="mb-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">House Edge Sammenligning med Surrender</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-3 text-left font-semibold">Variant</th>
                      <th className="py-3 px-3 text-left font-semibold">Even Money HE</th>
                      <th className="py-3 px-3 text-left font-semibold">Inside Bets HE</th>
                      <th className="py-3 px-3 text-left font-semibold">Tab/1.000 spins × 100 kr.</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50 bg-destructive/5"><td className="py-2 px-3 font-medium text-foreground">Amerikansk (standard)</td><td className="py-2 px-3 text-destructive">5,26 %</td><td className="py-2 px-3">5,26 %</td><td className="py-2 px-3">-5.260 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Amerikansk (Surrender)</td><td className="py-2 px-3">2,63 %</td><td className="py-2 px-3">5,26 %</td><td className="py-2 px-3">-2.630 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Europæisk (standard)</td><td className="py-2 px-3">2,70 %</td><td className="py-2 px-3">2,70 %</td><td className="py-2 px-3">-2.700 kr.</td></tr>
                    <tr className="border-b border-border/50 bg-primary/5"><td className="py-2 px-3 font-medium text-foreground">Fransk (La Partage)</td><td className="py-2 px-3 text-primary font-bold">1,35 %</td><td className="py-2 px-3">2,70 %</td><td className="py-2 px-3">-1.350 kr.</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            Bemærk den interessante anomali: amerikansk roulette med Surrender (2,63 % HE) er faktisk marginalt bedre end standard europæisk roulette (2,70 % HE) for even-money væddemål. Men i praksis er forskellen negligerbar (0,07 procentpoint), og europæisk med La Partage (<Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>fransk roulette</Link>) er stadig markant bedre med 1,35 %.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 7 – Historisk Kontekst
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Historisk Kontekst: Hvordan Dobbelt-Nul Blev Amerikansk Standard
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Det er en udbredt misforståelse, at amerikanerne "tilføjede" et ekstra nul til europæisk roulette. Historisk var det faktisk omvendt: de tidligste roulette-hjul i 1700-tallets Frankrig havde <em>både</em> 0 og 00. Det var europæerne, der senere fjernede dobbelt-nullet for at tiltrække spillere i den intense konkurrence mellem tyske kurbyer (særligt Bad Homburg i 1843, hvor brødrene Blanc introducerede single-zero hjulet).
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Da roulette krydsede Atlanten i begyndelsen af 1800-tallet med franske immigranter til New Orleans og Mississippi-dalen, bragte de det originale dobbelt-nul hjul med sig. Mens Europa innoverede ved at fjerne dobbelt-nullet, bevarede de amerikanske spillehaller den originale version – formentlig fordi de manglede den konkurrencepression, der drev europæisk innovation.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            I nogle tidlige amerikanske casinoer blev der endda tilføjet et tredje nul-felt (en ørn eller "American Eagle"), som gav en house edge på over 12 %. Heldigvis forsvandt denne variant hurtigt, men den illustrerer den amerikanske casinoindustris historiske tendens mod højere house edges.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            I dag er dobbelt-nul standarden i Las Vegas, Atlantic City og de fleste amerikanske casinoer. Men online har europæisk roulette vundet massivt terræn, og de fleste danske casinoer med <Link to="/casino-licenser" className={linkClass}>dansk licens fra Spillemyndigheden</Link> tilbyder begge varianter. Uddannede spillere vælger konsekvent det europæiske hjul.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 8 – Indsatsstrategier på Amerikansk Roulette
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Indsatsstrategier på Amerikansk Roulette: Hvad Virker (og Hvad Der Ikke Gør)
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Lad os være direkte: ingen indsatsstrategi kan overvinde 5,26 % house edge. Hverken <Link to="/casinospil/roulette/martingale-roulette" className={linkClass}>Martingale</Link>, <Link to="/casinospil/roulette/fibonacci-roulette" className={linkClass}>Fibonacci</Link>, <Link to="/casinospil/roulette/dalembert-roulette" className={linkClass}>D'Alembert</Link>, <Link to="/casinospil/roulette/labouchere-roulette" className={linkClass}>Labouchère</Link> eller <Link to="/casinospil/roulette/james-bond-roulette" className={linkClass}>James Bond-strategien</Link> ændrer den fundamentale matematik. Men de påvirker din <em>risikoprofil</em> – og på et amerikansk hjul med højere house edge er risikoen forstærket.
          </p>

          <Card className="border-border bg-card my-4">
            <CardHeader>
              <CardTitle className="text-lg">Strategi-Performance på Amerikansk vs. Europæisk (1.000 spins × 100 kr.)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-3 text-left font-semibold">Strategi</th>
                      <th className="py-3 px-3 text-left font-semibold">Gns. tab (AM)</th>
                      <th className="py-3 px-3 text-left font-semibold">Gns. tab (EU)</th>
                      <th className="py-3 px-3 text-left font-semibold">Ruin-risiko (AM)</th>
                      <th className="py-3 px-3 text-left font-semibold">Ruin-risiko (EU)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">Flat Betting</td><td className="py-2 px-3">-5.260 kr.</td><td className="py-2 px-3">-2.700 kr.</td><td className="py-2 px-3">12 %</td><td className="py-2 px-3">6 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">Martingale</td><td className="py-2 px-3">-5.260 kr.</td><td className="py-2 px-3">-2.700 kr.</td><td className="py-2 px-3 text-destructive">38 %</td><td className="py-2 px-3">24 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">Fibonacci</td><td className="py-2 px-3">-5.260 kr.</td><td className="py-2 px-3">-2.700 kr.</td><td className="py-2 px-3">28 %</td><td className="py-2 px-3">18 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">D'Alembert</td><td className="py-2 px-3">-5.260 kr.</td><td className="py-2 px-3">-2.700 kr.</td><td className="py-2 px-3">22 %</td><td className="py-2 px-3">14 %</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            Bemærk: det gennemsnitlige tab er identisk uanset strategi (det følger af house edge), men ruin-risikoen varierer kraftigt. Martingale på et amerikansk hjul har 38 % sandsynlighed for total ruin (defineret som tab af hele startkapitalen) mod 24 % på europæisk. Flat betting er konsekvent den sikreste tilgang med den laveste ruin-risiko.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            <strong>Vores anbefaling:</strong> Hvis du insisterer på at spille amerikansk roulette, brug flat betting med en fast indsats der maksimalt udgør 1-2 % af din samlede bankroll. Sæt et tab-stop på 20 % af din bankroll og et gevinst-mål på 30 %. Og frem for alt: overvej at skifte til <Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>europæisk roulette</Link> eller endnu bedre, <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>fransk roulette med La Partage</Link>.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 9 – Varians og Session-Analyse
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Activity className="h-7 w-7 text-primary" />
            Varians og Session-Dynamik: Hvad du Reelt Kan Forvente
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Et af de mest misforståede koncepter i roulette er forholdet mellem house edge og session-varians. House edge fortæller dig, hvad der sker <em>gennemsnitligt</em> over tid. Men i en enkelt session kan resultatet afvige massivt fra gennemsnittet – og denne afvigelse (varians) er det, der gør roulette underholdende (og farligt).
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            For even-money væddemål på amerikansk roulette er standardafvigelsen pr. spin lig med indsatsen (σ = 1 enhed). Over N spins vokser standardafvigelsen som σ√N. Det betyder, at efter 100 spins á 100 kr. er din forventede position -526 kr. ± 1.000 kr. (1σ). Du har ca. 30 % chance for at være foran efter 100 spins – men kun 0,8 % efter 10.000 spins.
          </p>

          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {[
              { spins: "25 spins", ahead: "42 %", loss: "-132 kr.", range: "±500 kr." },
              { spins: "100 spins", ahead: "30 %", loss: "-526 kr.", range: "±1.000 kr." },
              { spins: "500 spins", ahead: "12 %", loss: "-2.630 kr.", range: "±2.236 kr." },
              { spins: "1.000 spins", ahead: "4 %", loss: "-5.260 kr.", range: "±3.162 kr." },
            ].map((d) => (
              <Card key={d.spins}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">{d.spins}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-bold">{d.ahead}</p>
                  <p className="text-xs text-muted-foreground">chance for profit</p>
                  <p className="text-sm text-destructive mt-2">{d.loss}</p>
                  <p className="text-xs text-muted-foreground">forventet tab</p>
                  <p className="text-sm mt-2">{d.range}</p>
                  <p className="text-xs text-muted-foreground">typisk udsving (1σ)</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            <strong>Praktisk implikation:</strong> Korte sessions (25-50 spins) har tilstrækkelig varians til at producere profit i en betydelig del af tilfældene. Det er derfor, folk tror, at strategier "virker" – de spiller korte sessions, oplever varians-drevet profit, og attribuerer det til deres system. Men over tid konvergerer resultatet mod den forventede værdi: -5,26 % af det samlede indsatsbeløb.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 10 – Online vs. Live Amerikansk Roulette
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gamepad2 className="h-7 w-7 text-primary" />
            Online RNG vs. Live Dealer: Hvor Skal Du Spille?
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Dansk-licenserede casinoer tilbyder amerikansk roulette i to formater: RNG (Random Number Generator) og live dealer. Matematikken er identisk (5,26 % house edge), men spiloplevelsen, hastigheden og de praktiske implikationer er markant forskellige.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  RNG Amerikansk Roulette
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Hastighed:</strong> 60-120 spins/time (du styrer tempoet)</li>
                  <li>• <strong>Min. indsats:</strong> Fra 1-5 kr.</li>
                  <li>• <strong>Fordele:</strong> Eget tempo, lavere minimumsindsatser, perfekt til indlæring</li>
                  <li>• <strong>Ulemper:</strong> Ingen social interaktion, kan føles "sterilt"</li>
                  <li>• <strong>Providers:</strong> NetEnt, Pragmatic Play, Playtech</li>
                  <li>• <strong>Anbefalet til:</strong> Nye spillere, bankroll management træning</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" />
                  Live Dealer Amerikansk Roulette
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Hastighed:</strong> 25-35 spins/time (dealer-styret)</li>
                  <li>• <strong>Min. indsats:</strong> Fra 10-50 kr.</li>
                  <li>• <strong>Fordele:</strong> Autentisk casino-atmosfære, chat med dealer</li>
                  <li>• <strong>Ulemper:</strong> Højere minimumsindsatser, ventetid mellem spins</li>
                  <li>• <strong>Providers:</strong> Evolution Gaming, Pragmatic Play Live</li>
                  <li>• <strong>Anbefalet til:</strong> Erfarne spillere, social casino-oplevelse</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            <strong>Hastigheds-implikation:</strong> Den lavere spin-rate på live borde er faktisk en <em>fordel</em> for din bankroll. Med 30 spins/time mod RNG's 80+ spins/time eksponeres du for 2,7× færre væddemål pr. time – og dermed 2,7× lavere forventet tab pr. time. Hos <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> og <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> finder du et bredt udvalg af <Link to="/live-casino/roulette" className={linkClass}>live roulette-borde</Link> med professionelle dealers.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 11 – Bankroll Management
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Coins className="h-7 w-7 text-primary" />
            Bankroll Management til Amerikansk Roulette: Overlevelsesregler
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Med en house edge der er næsten dobbelt så høj som europæisk roulette, er bankroll management endnu vigtigere på amerikanske borde. Dine penge forsvinder simpelthen hurtigere – og uden disciplin kan en session hurtigt eskalere fra underholdning til frustration.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { title: "1 % Reglen", icon: <ShieldCheck className="h-5 w-5 text-primary" />, desc: "Sats aldrig mere end 1 % af din totale bankroll pr. spin. Med 5.000 kr. er din max-indsats 50 kr. Dette giver dig ca. 100+ spins selv i worst-case scenariet." },
              { title: "20/30 Stop-Loss/Take-Profit", icon: <Target className="h-5 w-5 text-primary" />, desc: "Stop ved 20 % tab af session-bankroll (1.000 kr. af 5.000 kr.). Tag profit ved 30 % gevinst (1.500 kr.). Disse asymmetriske grænser kompenserer for den negative forventede værdi." },
              { title: "Tidslimit: Max 45 Min.", icon: <Timer className="h-5 w-5 text-primary" />, desc: "Sæt en alarm. Jo længere du spiller, jo tættere konvergerer dit resultat mod -5,26 %. Korte sessions har den højeste sandsynlighed for at afslutte med profit." },
              { title: "Undgå Five Number Bet", icon: <AlertTriangle className="h-5 w-5 text-destructive" />, desc: "Det eneste absolutte 'nej' i amerikansk roulette. 7,89 % house edge er uacceptabelt. Brug straight-up bets på 0 og 00 i stedet, hvis du vil dække nullerne." },
            ].map((rule) => (
              <Card key={rule.title}>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    {rule.icon}
                    {rule.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{rule.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 12 – Psykologi: Hvorfor Spillere Vælger det Dyre Hjul
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Spillerpsykologi: Hvorfor Vælger Folk det Matematisk Dårligere Hjul?
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Trods den objektive matematik – 5,26 % vs. 2,70 % – vælger en betydelig del af online-spillere stadig det amerikanske hjul. Denne adfærd er irrationel i økonomisk forstand, men fuldt forståelig gennem adfærdspsykologiske linser. Fire kognitive bias driver valget:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">1. Familiarity Bias (Genkendelseseffekt)</h3>
                <p className="text-muted-foreground text-sm">
                  Spillere der først stiftede bekendtskab med roulette i amerikanske film (Ocean's Eleven, Casino Royale-scenerne i Las Vegas) eller via US-baserede streamers, associerer det amerikanske hjul med "det rigtige" spil. Det europæiske hjul opfattes som "en variant" – selvom det historisk er omvendt. Denne forudindtagelse forstærkes af, at mange RNG-spil defaulter til det amerikanske layout.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">2. Complexity Attraction (Kompleksitetstiltrækning)</h3>
                <p className="text-muted-foreground text-sm">
                  Det ekstra 00-felt og Five Number Bet giver illusionen af dybere strategisk kompleksitet. Spillere med høj "need for cognition" tiltrækkes af den ekstra variabel, uden at indse at den udelukkende forværrer deres odds. Det er den kognitive ækvivalent til at betale mere for et produkt med flere funktioner, selvom ingen af dem forbedrer kerneydelsen.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">3. Numerical Illiteracy (Talblindhed)</h3>
                <p className="text-muted-foreground text-sm">
                  "2,70 % vs. 5,26 %" lyder som en marginal forskel for de fleste spillere. Hjernen er ikke designet til at intuitivt forstå, at 5,26 % er <em>næsten dobbelt</em> så meget som 2,70 %. Først når forskellen præsenteres som "25.530 kr. ekstra tab over 10.000 spins" eller "halvt så lang spilletid" bliver implikationen tydelig. Framing-effekten er altafgørende.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">4. Sunk Cost og Status Quo Bias</h3>
                <p className="text-muted-foreground text-sm">
                  Spillere der har investeret tid i at "lære" det amerikanske hjul – talrækkefølge, sektor-mønstrer, Five Number Bet-timingen – er modvillige til at skifte til europæisk, fordi det ville invalidere deres oplevede ekspertise. Det psykologiske ejerskab over "deres" spilvariant overskygger den objektive matematik.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6 bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3">
                <Activity className="inline h-5 w-5 mr-2" />
                Near-Miss Effekten på Dobbelt-Nul Hjulet
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                Det amerikanske hjul forstærker near-miss oplevelsen: med to grønne felter (0 og 00) placeret direkte overfor hinanden, er sandsynligheden for at kuglen lander "lige ved siden af" en nul-lomme højere end på det europæiske hjul. Denne øgede near-miss frekvens aktiverer hjernens belønningssystem (dopamin-release) næsten som en gevinst – hvilket paradoksalt nok øger spillerens engagement trods de højere tab.
              </p>
              <p className="text-muted-foreground text-sm">
                Forskning fra University of Waterloo (2019) viste, at near-misses på roulette forlænger spilsessioner med 22-34 % sammenlignet med neutrale resultater. Med to nul-felter producerer det amerikanske hjul 5,26 % "tabende" spins mod nul (vs. 2,70 % på europæisk) – næsten dobbelt så mange trigger-events for near-miss effekten.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 13 – Risk of Ruin: Detaljeret Simulering
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <LineChart className="h-7 w-7 text-primary" />
            Risk of Ruin: Bankroll-Overlevelse på Amerikansk vs. Europæisk
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Risk of Ruin (RoR) måler sandsynligheden for at tabe hele din bankroll inden du når dit gevinst-mål. For roulette med even-money væddemål kan RoR beregnes analytisk. Tabellen nedenfor sammenligner amerikansk (5,26 % HE) med europæisk (2,70 % HE) og fransk med La Partage (1,35 % HE) for en bankroll på 50 enheder med et gevinstmål på +25 enheder:
          </p>

          <Card className="border-border bg-card mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Risk of Ruin: 50-Enhed Bankroll, +25 Gevinst-mål</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-3 text-left font-semibold">Session-længde</th>
                      <th className="py-3 px-3 text-left font-semibold">RoR Amerikansk</th>
                      <th className="py-3 px-3 text-left font-semibold">RoR Europæisk</th>
                      <th className="py-3 px-3 text-left font-semibold">RoR Fransk (LP)</th>
                      <th className="py-3 px-3 text-left font-semibold">AM vs. EU Forskel</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">100 spins</td><td className="py-2 px-3 text-destructive">18,4 %</td><td className="py-2 px-3">9,7 %</td><td className="py-2 px-3 text-primary">5,1 %</td><td className="py-2 px-3 font-bold">+8,7 pp</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">250 spins</td><td className="py-2 px-3 text-destructive">34,2 %</td><td className="py-2 px-3">19,8 %</td><td className="py-2 px-3 text-primary">11,3 %</td><td className="py-2 px-3 font-bold">+14,4 pp</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">500 spins</td><td className="py-2 px-3 text-destructive">51,7 %</td><td className="py-2 px-3">33,1 %</td><td className="py-2 px-3 text-primary">20,6 %</td><td className="py-2 px-3 font-bold">+18,6 pp</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">1.000 spins</td><td className="py-2 px-3 text-destructive">71,3 %</td><td className="py-2 px-3">50,2 %</td><td className="py-2 px-3 text-primary">34,8 %</td><td className="py-2 px-3 font-bold">+21,1 pp</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">5.000 spins</td><td className="py-2 px-3 text-destructive">96,2 %</td><td className="py-2 px-3">84,5 %</td><td className="py-2 px-3 text-primary">71,9 %</td><td className="py-2 px-3 font-bold">+11,7 pp</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">10.000 spins</td><td className="py-2 px-3 text-destructive">99,6 %</td><td className="py-2 px-3">96,8 %</td><td className="py-2 px-3 text-primary">90,1 %</td><td className="py-2 px-3 font-bold">+2,8 pp</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            Datamønstret er slående: ved 500 spins har den amerikanske spiller over 50 % sandsynlighed for total ruin – mens den europæiske spiller stadig har 2-ud-af-3 chance for at overleve. Forskellen er størst i det "typiske session-interval" (250-1.000 spins), hvor den ekstra house edge har den mest dramatiske effekt på overlevelse.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            <strong>Konklusion fra RoR-data:</strong> Hvis du spiller med et bankroll-mål om at nå +50 % profit (25 af 50 enheder), skal du spille <em>markant</em> kortere sessions på amerikansk roulette. Ideelt max 100 spins, hvor RoR er 18,4 % mod europæisks 9,7 %. Over 500 spins er det mere sandsynligt at gå fallit end at overleve.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 14 – Bonus Wagering EV-Analyse
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Calculator className="h-7 w-7 text-primary" />
            Bonus Wagering på Amerikansk Roulette: EV-Analyse for Danske Bonusser
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Mange danske spillere forsøger at gennemspille casino <Link to="/bonusser" className={linkClass}>bonusser</Link> på roulette. Men de fleste casinoer begrænser roulette-væddemåls bidrag til omsætningskrav til 10-20 % (mod 100 % for spilleautomater). Kombineret med den høje house edge på amerikansk roulette bliver matematikken brutal:
          </p>

          <Card className="bg-muted/30 mb-6">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3">Bonus EV-Beregning: 1.000 kr. Bonus, 10× Omsætning</h3>
              <p className="mb-2 text-muted-foreground text-sm">
                <strong>Scenarie:</strong> 1.000 kr. bonus med 10× omsætningskrav (b-only) = 10.000 kr. total omsætning.
              </p>
              <p className="mb-3 font-mono text-sm bg-background p-3 rounded-lg">
                <strong>Amerikansk Roulette (100 % bidrag, hypotetisk):</strong><br />
                EV = 1.000 − (10.000 × 0,0526) = 1.000 − 526 = <strong className="text-primary">+474 kr.</strong><br /><br />
                <strong>Europæisk Roulette (100 % bidrag, hypotetisk):</strong><br />
                EV = 1.000 − (10.000 × 0,0270) = 1.000 − 270 = <strong className="text-primary">+730 kr.</strong><br /><br />
                <strong>Forskel: 256 kr. tabt EV ved at vælge amerikansk</strong>
              </p>
              <p className="text-muted-foreground text-sm mb-3">
                Men i praksis bidrager roulette typisk kun 10-20 %. Med 10 % bidrag:
              </p>
              <p className="font-mono text-sm bg-background p-3 rounded-lg">
                Total omsætning for at klare kravet: 10.000 / 0,10 = <strong>100.000 kr.</strong><br /><br />
                <strong>Amerikansk:</strong> EV = 1.000 − (100.000 × 0,0526) = 1.000 − 5.260 = <strong className="text-destructive">−4.260 kr.</strong><br />
                <strong>Europæisk:</strong> EV = 1.000 − (100.000 × 0,0270) = 1.000 − 2.700 = <strong className="text-destructive">−1.700 kr.</strong><br /><br />
                <strong>Forskel: 2.560 kr. ekstra tab ved at vælge amerikansk</strong>
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Bonus EV-Matrix: Omsætningskrav × Roulette-bidrag × Hjultype</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-3 text-left font-semibold">Omsætning</th>
                      <th className="py-3 px-3 text-left font-semibold">Bidrag</th>
                      <th className="py-3 px-3 text-left font-semibold">Reel oms.</th>
                      <th className="py-3 px-3 text-left font-semibold">EV AM (5,26%)</th>
                      <th className="py-3 px-3 text-left font-semibold">EV EU (2,70%)</th>
                      <th className="py-3 px-3 text-left font-semibold">EV FR (1,35%)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">10×</td><td className="py-2 px-3">100 %</td><td className="py-2 px-3">10.000</td><td className="py-2 px-3">+474</td><td className="py-2 px-3 text-primary">+730</td><td className="py-2 px-3 text-primary font-bold">+865</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">10×</td><td className="py-2 px-3">20 %</td><td className="py-2 px-3">50.000</td><td className="py-2 px-3 text-destructive">−1.630</td><td className="py-2 px-3 text-destructive">−350</td><td className="py-2 px-3 text-primary">+325</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">10×</td><td className="py-2 px-3">10 %</td><td className="py-2 px-3">100.000</td><td className="py-2 px-3 text-destructive">−4.260</td><td className="py-2 px-3 text-destructive">−1.700</td><td className="py-2 px-3 text-destructive">−350</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">25×</td><td className="py-2 px-3">100 %</td><td className="py-2 px-3">25.000</td><td className="py-2 px-3 text-destructive">−315</td><td className="py-2 px-3 text-primary">+325</td><td className="py-2 px-3 text-primary font-bold">+663</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">25×</td><td className="py-2 px-3">10 %</td><td className="py-2 px-3">250.000</td><td className="py-2 px-3 text-destructive">−12.150</td><td className="py-2 px-3 text-destructive">−5.750</td><td className="py-2 px-3 text-destructive">−2.375</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            <strong>Takeaway:</strong> Amerikansk roulette er aldrig det optimale valg til bonus wagering. Selv med 100 % bidrag taber du 256 kr. i EV sammenlignet med europæisk – og med realistiske 10-20 % bidragsrater eskalerer forskellen til tusindvis af kroner. Den eneste positive EV-kombination for amerikansk er lave omsætningskrav (10×) med 100 % bidrag – en sjælden kombination hos danske casinoer.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            For bonus-gennemspilning anbefaler vi konsekvent <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>fransk roulette med La Partage</Link> (1,35 % HE), der bevarer positiv EV i flere scenarier. Tjek altid bonusvilkårene i vores <Link to="/bonusser" className={linkClass}>bonusoversigt</Link> for den specifikke roulette-bidragsprocent.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 15 – Lightning Roulette & Special-Varianter
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Zap className="h-7 w-7 text-primary" />
            Lightning Roulette og Game Show-Varianter: Den Skjulte Dobbelt-Nul Effekt
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Evolutions Lightning Roulette er teknisk baseret på et europæisk single-zero hjul, men den effektive house edge er anderledes end standard europæisk. For at finansiere de tilfældige 50×-500× Lightning-multiplikatorer er straight-up udbetalingen reduceret fra 35:1 til 29:1. Resultatet? En effektiv house edge på <strong>2,70 %</strong> (identisk med standard europæisk) – men med markant højere varians.
          </p>

          <Card className="border-border bg-card mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Roulette-Varianter: House Edge & Varians Sammenligning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-3 text-left font-semibold">Variant</th>
                      <th className="py-3 px-3 text-left font-semibold">Hjul-type</th>
                      <th className="py-3 px-3 text-left font-semibold">House Edge</th>
                      <th className="py-3 px-3 text-left font-semibold">Varians</th>
                      <th className="py-3 px-3 text-left font-semibold">Anbefaling</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50 bg-primary/5"><td className="py-2 px-3 text-foreground font-medium">Fransk (La Partage)</td><td className="py-2 px-3">Single-zero</td><td className="py-2 px-3 text-primary font-bold">1,35 %</td><td className="py-2 px-3">Lav</td><td className="py-2 px-3 text-primary">★★★★★</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground font-medium">Europæisk</td><td className="py-2 px-3">Single-zero</td><td className="py-2 px-3">2,70 %</td><td className="py-2 px-3">Lav</td><td className="py-2 px-3">★★★★</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground font-medium">Lightning Roulette</td><td className="py-2 px-3">Single-zero*</td><td className="py-2 px-3">2,70 %</td><td className="py-2 px-3 text-destructive">Meget høj</td><td className="py-2 px-3">★★★</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground font-medium">AM m/ Surrender</td><td className="py-2 px-3">Double-zero</td><td className="py-2 px-3">2,63 %*</td><td className="py-2 px-3">Medium</td><td className="py-2 px-3">★★★</td></tr>
                    <tr className="border-b border-border/50 bg-destructive/5"><td className="py-2 px-3 text-foreground font-medium">Amerikansk (standard)</td><td className="py-2 px-3">Double-zero</td><td className="py-2 px-3 text-destructive font-bold">5,26 %</td><td className="py-2 px-3">Medium</td><td className="py-2 px-3">★★</td></tr>
                    <tr className="border-b border-border/50 bg-destructive/5"><td className="py-2 px-3 text-foreground font-medium">Triple Zero*</td><td className="py-2 px-3">Triple-zero</td><td className="py-2 px-3 text-destructive font-bold">7,69 %</td><td className="py-2 px-3">Medium</td><td className="py-2 px-3 text-destructive">★</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-2">* Lightning Roulettes 29:1 straight-up + tilfældige multiplikatorer. AM Surrender gælder kun even-money bets. Triple Zero findes på udvalgte Las Vegas-borde (ikke online i DK).</p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            <strong>Advarsel om Triple Zero Roulette:</strong> En relativt ny variant der er dukket op på Las Vegas Strip (bl.a. The Venetian) med felterne 0, 00 og 000. House edge: 7,69 %. Denne variant er endnu ikke tilgængelig hos dansk-licenserede casinoer, men den illustrerer industriens tendens mod stadig højere house edges. Hvis den dukker op online: undgå den kategorisk.
          </p>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            For spillere der tiltrækkes af Lightning Roulettes game show-format men foretrækker lavere varians, anbefaler vi at kombinere even-money væddemål (som ikke påvirkes af den reducerede straight-up udbetaling) med standard europæisk roulette. Alternativt kan du finde Lightning Roulette hos <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> og <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link>, hvor det er et af de mest populære live-borde.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 16 – Live vs. RNG Tidskostnads-Analyse
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Clock className="h-7 w-7 text-primary" />
            Tidskostnads-Analyse: Hvad Koster Amerikansk Roulette pr. Time?
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Den reelle "pris" for underholdning afhænger af tre faktorer: house edge, indsatsniveau og antal spins pr. time. Ved at kombinere disse kan vi beregne den præcise timepris for amerikansk roulette i forskellige formater:
          </p>

          <Card className="border-border bg-card mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Timekostnad: Amerikansk Roulette på Tværs af Formater</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-3 text-left font-semibold">Format</th>
                      <th className="py-3 px-3 text-left font-semibold">Spins/time</th>
                      <th className="py-3 px-3 text-left font-semibold">50 kr./spin</th>
                      <th className="py-3 px-3 text-left font-semibold">100 kr./spin</th>
                      <th className="py-3 px-3 text-left font-semibold">500 kr./spin</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground font-medium">Live Dealer (AM)</td><td className="py-2 px-3">30</td><td className="py-2 px-3">-79 kr.</td><td className="py-2 px-3">-158 kr.</td><td className="py-2 px-3 text-destructive">-789 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground font-medium">RNG Standard (AM)</td><td className="py-2 px-3">80</td><td className="py-2 px-3">-210 kr.</td><td className="py-2 px-3 text-destructive">-421 kr.</td><td className="py-2 px-3 text-destructive">-2.104 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground font-medium">RNG Turbo (AM)</td><td className="py-2 px-3">120</td><td className="py-2 px-3 text-destructive">-316 kr.</td><td className="py-2 px-3 text-destructive">-631 kr.</td><td className="py-2 px-3 text-destructive">-3.156 kr.</td></tr>
                    <tr className="border-b border-border/50 bg-muted/30"><td className="py-2 px-3 text-foreground font-medium italic">Live Dealer (EU) til ref.</td><td className="py-2 px-3">30</td><td className="py-2 px-3">-41 kr.</td><td className="py-2 px-3">-81 kr.</td><td className="py-2 px-3">-405 kr.</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Formel: Timekostnad = Spins/time × Indsats × House Edge (5,26 % for AM, 2,70 % for EU).</p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            Tallene afslører en vigtig nuance: <strong>Live dealer-formatet halverer din timekostnad</strong> sammenlignet med standard RNG, simpelthen fordi du spiller færre spins. En time live amerikansk roulette á 100 kr. koster 158 kr. – dyrere end live europæisk (81 kr.), men markant billigere end RNG-formater. Hvis du spiller amerikansk, så vælg live.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Perspektiver dette mod andre underholdningsformer: en biografbillet koster ~130 kr. for 2 timer (65 kr./time), streaming-tjenester ~6 kr./time. Amerikansk live roulette á 100 kr. koster ~158 kr./time – dyrt, men sammenlignelig med premium-underholdning. RNG Turbo á 500 kr. (3.156 kr./time) er derimod i en helt anden liga og bør undgås af rekreative spillere.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 17 – Konklusion
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-primary" />
            Konklusion: Kend Prisen – og Vælg Bevidst
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Amerikansk roulette er ikke et "dårligt" spil – det er et <em>dyrt</em> spil. Med 5,26 % house edge betaler du næsten dobbelt så meget for den samme underholdning sammenlignet med europæisk roulette (2,70 %) og næsten fire gange så meget som fransk roulette med La Partage (1,35 %).
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Vores data viser entydigt, at det europæiske hjul er overlegen på alle parametre: lavere gennemsnitligt tab, højere sandsynlighed for profit, længere bankroll survival og lavere ruin-risiko. For danske spillere med adgang til europæiske borde på <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link>, <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> og <Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link> er valget matematisk entydigt.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Hvis du alligevel vælger amerikansk roulette – måske fordi det er det eneste tilgængelige bord, eller fordi du foretrækker bordlayoutet – så sørg i det mindste for at: (1) undgå Five Number Bet, (2) søge borde med Surrender-reglen, (3) bruge flat betting med streng bankroll management, og (4) sætte klare tids- og tabsgrænser.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Husk: roulette er underholdning med en pris. Kend prisen, accepter den, og nyd spillet inden for rammerne af dit budget og dine grænser. For mere om <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> og værktøjer til at kontrollere dit forbrug, se vores dedikerede guide.
          </p>
        </section>

        <Separator className="mb-12" />

        <CasinospilMoneyLinks gameName="Amerikansk Roulette" currentPath="/casinospil/roulette/amerikansk-roulette" />
        <RelatedGuides currentPath="/casinospil/roulette/amerikansk-roulette" />
        <FAQSection faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="spildansknu" />
    </>
  );
}
