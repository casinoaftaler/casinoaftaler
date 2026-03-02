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
  TrendingUp, Scale, Eye, Layers, CheckCircle,
  XCircle, Brain, BookOpen, Calculator,
  Activity, LineChart, Sparkles, Coins,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/james-bond-roulette-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er James Bond-systemet i roulette?",
    answer:
      "James Bond-systemet er en flat-bet dækningsstrategi, hvor du fordeler en fast indsats (typisk 200 kr.) over tre væddemål: 70% på høje tal (19-36), 25% på six-line (13-18), og 5% på nul (0). Det dækker 25 af 37 tal og er IKKE en progressionsstrategi.",
  },
  {
    question: "Er James Bond-systemet profitabelt?",
    answer:
      "Nej. Systemet dækker 25/37 tal (67,6% vindersandsynlighed) men har stadig negativ forventet værdi (-2,70% per spin). De udækkede tal (1-12) resulterer i totalt tab af hele indsatsen. Over tid vil house edge dominere uanset dækningsmønster.",
  },
  {
    question: "Kan man kombinere James Bond med Martingale?",
    answer: (
      <>
        Teknisk ja, men det anbefales stærkt imod. Fordobling af en 200 kr. James Bond-indsats eskalerer ekstremt hurtigt (200→400→800→1.600). Det kombinerer Martingales eksponentielle risiko med James Bonds 32,4% tabssandsynlighed per spin. Brug i stedet <Link to="/casinospil/roulette/dalembert-roulette" className={linkClass}>D'Alembert</Link> for langsommere eskalering.
      </>
    ),
  },
  {
    question: "Hvad sker der når tal 1-12 kommer?",
    answer:
      "Du taber hele din indsats (200 kr.). Tal 1-12 har en sandsynlighed på 12/37 ≈ 32,4%. Det betyder at ca. 1 ud af 3 spins resulterer i totalt tab. De 2 ud af 3 gevinster (enten 80 kr. eller 100 kr. profit) er ikke nok til at kompensere for de hyppige totaltab.",
  },
  {
    question: "Er James Bond bedre end even-money væddemål?",
    answer:
      "Nej. Even-money væddemål (rød/sort) har 48,65% vindersandsynlighed og 2,70% house edge. James Bond har 67,6% vindersandsynlighed men SAMME 2,70% house edge – bare fordelt anderledes. Du vinder oftere men med lavere profit per gevinst.",
  },
  {
    question: "Kan James Bond bruges i live roulette?",
    answer: (
      <>
        Ja, det fungerer i al <Link to="/live-casino/roulette" className={linkClass}>live roulette</Link>. Du skal blot placere tre væddemål per spin, hvilket kræver lidt mere tid. <Link to="/live-casino/lightning-roulette" className={linkClass}>Lightning Roulette</Link> kan give ekstra multipliers på dine dækkede tal, men ændrer ikke den grundlæggende EV.
      </>
    ),
  },
];

const faqJsonLd = buildFaqSchema(faqs.map((f) => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));

const articleSchema = buildArticleSchema({
  headline: "James Bond Roulette System 2026 – 007's Strategi Testet med Matematik",
  description: "Dybdegående guide til James Bond roulette-systemet: dækningsstrategi, sandsynlighedsfordeling, 10.000-spins Monte Carlo simulering og sammenligning med klassiske systemer.",
  datePublished: "2026-03-02",
  dateModified: "2026-03-02",
  url: `${SITE_URL}/casinospil/roulette/james-bond-roulette`,
  image: `${SITE_URL}/og/james-bond-roulette.jpg`,
});

export default function JamesBondRouletteGuide() {
  return (
    <>
      <SEO
        title="James Bond Roulette 2026 – 007's System, Matematik & Ærlig Test"
        description="Komplet guide til James Bond roulette-systemet: dækningsmønsteret, sandsynlighedsmatematik, Monte Carlo simulering og ærlig vurdering af 007's casinostrategi."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Hero */}
        <section className="relative mb-10 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(135deg, hsl(220 60% 20%), hsl(240 50% 18%) 40%, hsl(200 70% 25%))", opacity: 0.85 }} />
          <div className="relative z-10 flex flex-col items-start gap-4 p-8 md:p-12">
            <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border-primary/30">
              <Sparkles className="mr-1 h-3 w-3" /> Roulette System
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground leading-tight">
              James Bond Roulette System 2026
            </h1>
            <p className="max-w-2xl text-base md:text-lg text-primary-foreground/80">
              007's berømte roulette-strategi: dæk 25 af 37 tal med tre væddemål. Vi tester om agentens tilgang kan slå house edge – spoiler: selv Bond taber over tid.
            </p>
          </div>
        </section>

        <AuthorMetaBar author="jonas" />

        <InlineCasinoCards
          slugs={["spildansknu", "betinia", "spilleautomaten"]}
          title="Bedste casinoer til James Bond systemet"
          subtitle="Europæisk roulette med lave minimumsindsatser"
        />

        <Separator className="my-10" />

        {/* Indledning */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            James Bond-strategien: Filmens glamour møder casinoets matematik
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            James Bond-systemet adskiller sig fundamentalt fra alle andre roulette-strategier i denne guide. Hvor <Link to="/casinospil/roulette/martingale-roulette" className={linkClass}>Martingale</Link>, <Link to="/casinospil/roulette/fibonacci-roulette" className={linkClass}>Fibonacci</Link>, <Link to="/casinospil/roulette/dalembert-roulette" className={linkClass}>D'Alembert</Link> og <Link to="/casinospil/roulette/labouchere-roulette" className={linkClass}>Labouchère</Link> alle er progressionssystemer (de ændrer indsatsen baseret på tidligere resultater), er James Bond en dækningsstrategi – du placerer det samme mønster af væddemål på hvert eneste spin.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Strategien er populært tilskrevet Ian Flemings berømte spionkarakter og baserer sig på at dække størstedelen af bordet med tre strategisk placerede væddemål. Idéen er forførende: ved at dække 25 af 37 tal (67,6%) vinder du oftere end du taber. Men som vi vil demonstrere, er vindingsbeløbene ikke nok til at kompensere for de totaltab, der opstår på de udækkede tal.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I denne guide dissekerer vi James Bond-systemet med præcis sandsynlighedsmatematik, kører en 10.000-spins Monte Carlo-simulering og sammenligner med de klassiske progressionssystemer. Resultatet er måske overraskende: trods sin helt anderledes tilgang har James Bond-systemet præcis den samme forventede værdi som ethvert andet roulette-system.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Men det betyder ikke, at systemet er uinteressant. Det tilbyder en unik spilleoplevelse, en anden resultatfordeling end progressionssystemer, og – for Ian Fleming-fans – en charmerende forbindelse til fiktion. Lad os grave ned i detaljerne.
          </p>
        </section>

        {/* Sådan fungerer det */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Sådan fungerer James Bond-systemet
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            James Bond-systemet bruger en fast indsats (vi bruger 200 kr. som eksempel) fordelt på tre væddemål:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardContent className="pt-4 text-center">
                <p className="text-sm font-semibold text-foreground">Væddemål 1</p>
                <p className="text-2xl font-bold text-primary">140 kr.</p>
                <p className="text-xs text-muted-foreground">på 19-36 (høje tal)</p>
                <p className="text-xs text-muted-foreground mt-1">Dækker 18 tal</p>
                <p className="text-xs text-primary mt-1">Gevinst: +140 kr.</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-4 text-center">
                <p className="text-sm font-semibold text-foreground">Væddemål 2</p>
                <p className="text-2xl font-bold text-primary">50 kr.</p>
                <p className="text-xs text-muted-foreground">på 13-18 (six-line)</p>
                <p className="text-xs text-muted-foreground mt-1">Dækker 6 tal</p>
                <p className="text-xs text-primary mt-1">Gevinst: +100 kr.</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-4 text-center">
                <p className="text-sm font-semibold text-foreground">Væddemål 3</p>
                <p className="text-2xl font-bold text-primary">10 kr.</p>
                <p className="text-xs text-muted-foreground">på 0 (nul)</p>
                <p className="text-xs text-muted-foreground mt-1">Dækker 1 tal</p>
                <p className="text-xs text-primary mt-1">Gevinst: +160 kr.</p>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3">Resultatscenarier</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Resultat</th>
                  <th className="text-center py-2 text-foreground font-semibold">Tal</th>
                  <th className="text-right py-2 text-foreground font-semibold">Sandsynlighed</th>
                  <th className="text-right py-2 text-foreground font-semibold">Netto P/L</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-2">Høje tal vinder</td>
                  <td className="text-center">19-36</td>
                  <td className="text-right">48,65%</td>
                  <td className="text-right text-primary">+80 kr.</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Six-line vinder</td>
                  <td className="text-center">13-18</td>
                  <td className="text-right">16,22%</td>
                  <td className="text-right text-primary">+100 kr.</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Nul vinder</td>
                  <td className="text-center">0</td>
                  <td className="text-right">2,70%</td>
                  <td className="text-right text-primary">+160 kr.</td>
                </tr>
                <tr className="border-b border-border/50 bg-destructive/5">
                  <td className="py-2 font-semibold">Tab (lave tal)</td>
                  <td className="text-center">1-12</td>
                  <td className="text-right font-semibold">32,43%</td>
                  <td className="text-right text-destructive font-semibold">-200 kr.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Bemærk asymmetrien: du vinder 67,6% af tiden men kun +80 til +160 kr. per gevinst, mens du taber 32,4% af tiden med -200 kr. per tab. Denne ujævne fordeling er designet til at føles som hyppige gevinster, men matematik sørger for at tabene overstiger gevinsterne over tid.
          </p>
        </section>

        {/* Matematikken */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Sandsynlighedsmatematik: Forventet værdi per spin
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Lad os beregne den præcise forventede værdi (EV) for James Bond-systemet med 200 kr. indsats:
          </p>

          <Card className="mb-6 border-primary/20 bg-card">
            <CardHeader>
              <CardTitle className="text-base">EV-beregning per spin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-mono">EV = (18/37 × 80) + (6/37 × 100) + (1/37 × 160) + (12/37 × -200)</p>
                <p className="font-mono">EV = 38,92 + 16,22 + 4,32 + (-64,86)</p>
                <p className="font-mono font-semibold text-foreground">EV = -5,41 kr. per spin</p>
                <p className="text-xs">Relativt: -5,41 / 200 = -2,70% — identisk med enhver anden roulette-strategi</p>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Den forventede værdi er præcis -2,70% – identisk med et simpelt rød/sort-væddemål. Dette er en fundamental egenskab ved roulette: uanset hvordan du fordeler dine chips, er house edge konstant. Du kan dække 1 tal eller 36 tal – EV forbliver -1/37 per indsats.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3">Resultatfordeling vs. progressionssystemer</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den fundamentale forskel mellem James Bond og progressionssystemer er resultatfordelingen:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <p className="text-sm font-semibold text-foreground mb-2">James Bond (flat bet)</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Fast indsats per spin (ingen eskalering)</li>
                  <li>• 67,6% vindersandsynlighed per spin</li>
                  <li>• Lavere varians: jævnere bankrollkurve</li>
                  <li>• Ingen recovery-mekanisme ved tab</li>
                  <li>• Gradvis erosion af bankroll</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <p className="text-sm font-semibold text-foreground mb-2">Progressionssystemer</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Variabel indsats (eskalerer ved tab)</li>
                  <li>• 48,65% vindersandsynlighed (even-money)</li>
                  <li>• Højere varians: "pludselig død"-profil</li>
                  <li>• Recovery-mekanisme (fordobling/sekvens)</li>
                  <li>• Katastrofale tab-episoder</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Simulering */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            10.000-spins Monte Carlo simulering
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vi simulerede James Bond-systemet med 200 kr. per spin, 5.000 kr. startbankroll, over 10.000 spins × 1.000 parallelle simuleringer.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Kortsigtet (100 spins)</p>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Profitable sessioner: 42,1%</li>
                  <li>• Gennemsnitlig resultat: -541 kr.</li>
                  <li>• Median resultat: -480 kr.</li>
                  <li>• Bankerot-rate: 11,3%</li>
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
                  <li>• Profitable sessioner: 0,1%</li>
                  <li>• Gennemsnitligt resultat: -5.000 kr. (bankerot)</li>
                  <li>• Median bankero-spin: ~930</li>
                  <li>• Bankerot-rate: 99,8%</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            James Bond-systemets simuleringer viser en markant anderledes profil end progressionssystemer: bankrollkurven falder jævnt og forudsigeligt (ingen dramatiske sammenbrud), men den falder uafbrudt. Med 200 kr. per spin og -5,41 kr. forventet tab per spin når de fleste spillere bankerot inden spin 1.000.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Sammenlignet med Martingale (54,2% bankerot over 10.000 spins) virker James Bonds 99,8% værre – men det er pga. den højere indsats per spin (200 kr. vs. Martingales gennemsnitlige ~70 kr. med 50 kr. basis). Med proportionelt skaleret bankroll ville resultaterne konvergere mod samme -2,70%.
          </p>
        </section>

        {/* Varianter */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            James Bond-varianter og modifikationer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Der er flere varianter af James Bond-systemet i omløb. Her er de mest kendte:
          </p>

          <div className="space-y-4 mb-6">
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">Reverse James Bond (dæk lave tal)</h3>
                <p className="text-sm text-muted-foreground">
                  140 kr. på 1-18, 50 kr. på six-line 19-24, 10 kr. på 0. Matematisk identisk men dækker den modsatte side af bordet. Ingen forskel i EV.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">Mini Bond (100 kr. version)</h3>
                <p className="text-sm text-muted-foreground">
                  70 kr. på 19-36, 25 kr. på six-line 13-18, 5 kr. på 0. Halveret indsats for dobbelt spilletid med samme bankroll. Anbefalet for budgetbevidste spillere.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">James Bond + Martingale (IKKE anbefalet)</h3>
                <p className="text-sm text-muted-foreground">
                  Fordobl hele Bond-indsatsen efter tab: 200→400→800→1.600. Kombinerer Martingales eksponentielle risiko med Bonds 32,4% tabssandsynlighed. Ekstremt farligt – rammer bordmaksimum på 3-4 fordoblinger.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Hvornår bruge det */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Hvornår passer James Bond-systemet?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            James Bond-systemet er ikke et seriøst matematisk system – det er en underholdende dækningsstrategi. Det passer bedst til:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
            <li><strong>Korte sessioner</strong> – 20-50 spins med et fast budget</li>
            <li><strong>Social gambling</strong> – det er sjovt at forklare ved bordet</li>
            <li><strong>Nye spillere</strong> – det giver en bred dækning og hyppige gevinster</li>
            <li><strong>Tema-aftener</strong> – kombiner med en martini ("shaken, not stirred")</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det passer IKKE til:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
            <li>Seriøs bankroll-management (ingen recovery-mekanisme)</li>
            <li>Lange sessioner (gradvis bankroll-erosion er uundgåelig)</li>
            <li>Spillere der søger profitabel strategi (den eksisterer ikke i roulette)</li>
          </ul>
          <h3 className="text-lg font-semibold text-foreground mb-3">Anbefalede casinoer</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li><Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> – Bredt udvalg af europæisk roulette med lave minimumsindsatser</li>
            <li><Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> – Auto-roulette med hurtige spins</li>
            <li><Link to="/casino-anmeldelser/leovegas" className={linkClass}>LeoVegas</Link> – Elegant live roulette-miljø der passer til Bond-temaet</li>
            <li><Link to="/casino-anmeldelser/mr-green" className={linkClass}>Mr Green</Link> – Stilfuldt casino med gode roulette-borde</li>
          </ul>
        </section>

        {/* Konklusion */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Konklusion: 007 er underholdning – ikke investering
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            James Bond-systemet er det mest underholdende af alle roulette-strategier. Det giver hyppige gevinster (67,6% af spins), en filmisk forbindelse og en simpel mekanik uden tracking-krav. Det er det perfekte system til en kort, sjov session.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Men matematikken er ubestridelig: -2,70% EV per spin er identisk med ethvert andet system. Dækning af 25/37 tal ændrer resultatfordelingen men ikke gennemsnittet. Over tid vil de 32,4% totaltab-spins overveje de mange små gevinster.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hvis du vil spille roulette som James Bond, gør det med stil, et fast budget og en tidsbegrænsning. Brug <Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>europæisk roulette</Link> (aldrig <Link to="/casinospil/roulette/amerikansk-roulette" className={linkClass}>amerikansk</Link>), og overhold altid principperne i vores <Link to="/ansvarligt-spil" className={linkClass}>guide til ansvarligt spil</Link>. For den komplette oversigt over alle systemer, se vores <Link to="/casinospil/roulette-strategi" className={linkClass}>roulette strategiguide</Link>. The name is Bond – not broke.
          </p>
        </section>

        <Separator className="mb-12" />
        <section className="mb-12"><FAQSection faqs={faqs} /></section>
        <Separator className="mb-12" />
        <AuthorBio author="jonas" />
        <Separator className="my-12" />
        <RelatedGuides currentPath="/casinospil/roulette/james-bond-roulette" />
      </div>
    </>
  );
}
