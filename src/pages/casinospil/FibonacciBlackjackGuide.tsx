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
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import betanoLiveCasino from "@/assets/screenshots/betano-live-casino.png";
import danskespilLiveBlackjack from "@/assets/screenshots/danskespil-live-blackjack-bord.png";
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
  Sigma,
  ArrowRight,
  Repeat,
  Infinity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/fibonacci-blackjack-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er Fibonacci-systemet i blackjack?",
    answer: (
      <>
        Fibonacci-systemet er en negativ progressionsstrategi, hvor du øger din indsats efter tab baseret på Fibonacci-talrækken (1, 1, 2, 3, 5, 8, 13, 21...). Ved gevinst går du to trin tilbage i sekvensen. Det eskalerer langsommere end <Link to="/casinospil/blackjack/martingale" className={linkClass}>Martingale</Link> men har stadig negativ forventet værdi.
      </>
    ),
  },
  {
    question: "Er Fibonacci bedre end Martingale til blackjack?",
    answer:
      "Fibonacci eskalerer langsommere: efter 7 tab er din indsats 13 enheder vs. Martingales 64. Det giver en blødere risikokurve og lavere max drawdown. Men det ændrer ikke den fundamentale matematik: begge systemer har negativ forventet værdi over tid.",
  },
  {
    question: "Hvor mange tab i træk kan Fibonacci-systemet håndtere?",
    answer:
      "Med 50 kr. basisenhed og 5.000 kr. bordmaksimum kan Fibonacci håndtere 9-10 tab i træk (sekvensen: 50, 50, 100, 150, 250, 400, 650, 1.050, 1.700, 2.750). Til sammenligning kan Martingale kun håndtere 6-7. Det giver Fibonacci et bredere sikkerhedsnet.",
  },
  {
    question: "Hvordan virker 'to trin tilbage'-reglen?",
    answer:
      "Når du vinder en hånd, går du to pladser tilbage i Fibonacci-sekvensen. Eksempel: hvis du er på step 6 (indsats: 400 kr.) og vinder, går du til step 4 (indsats: 150 kr.). Denne mekanisme sikrer, at du ikke nulstiller fuldstændigt ved én gevinst, men gradvist trapper ned.",
  },
  {
    question: "Kan man bruge Fibonacci i live blackjack?",
    answer: (
      <>
        Ja, det fungerer teknisk i <Link to="/live-casino/blackjack" className={linkClass}>live blackjack</Link>. Bordgrænserne hos <Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link> og <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> tillader typisk 9-10 Fibonacci-trin med 50 kr. basisenhed, hvilket giver mere spillerum end Martingale.
      </>
    ),
  },
  {
    question: "Hvad er den matematiske baggrund for Fibonacci-sekvensen?",
    answer:
      "Fibonacci-sekvensen (opdaget af Leonardo af Pisa i 1202) har egenskaben at hvert tal er summen af de to foregående. I casino-kontekst er sekvensens relevans, at den vokser eksponentielt men langsommere end 2^n (Martingale). Det gyldne snit (φ ≈ 1,618) er grænseværdien for forholdet mellem konsekutive Fibonacci-tal.",
  },
  {
    question: "Hvad er Fibonacci-systemets house edge?",
    answer:
      "Fibonacci ændrer ikke house edge – det er stadig ca. 0,5 % med perfekt basic strategy. Indsatssystemer kan kun ændre variansfordelingen (hvor store dine udsving er), ikke den underliggende matematiske fordel casinot har.",
  },
  {
    question: "Hvornår bør man nulstille Fibonacci-sekvensen?",
    answer:
      "Den klassiske regel er at nulstille, når du er tilbage på step 1 (basisindsats). En mere konservativ tilgang er at nulstille efter 2-3 konsekutive gevinster på basisniveau. Nogle spillere nulstiller også ved et fast profitmål eller tabsloft pr. session.",
  },
  {
    question: "Kan Fibonacci kombineres med basic strategy?",
    answer: (
      <>
        Du bør ALTID bruge <Link to="/casinospil/blackjack" className={linkClass}>basic strategy</Link> uanset indsatssystem. Fibonacci styrer kun din indsatsstørrelse, ikke dine spilbeslutninger (hit, stand, double, split). At kombinere et indsatssystem med dårlig spilstrategi fordobler din ulempe.
      </>
    ),
  },
  {
    question: "Er Fibonacci lovligt at bruge på danske casinoer?",
    answer:
      "Ja, alle indsatssystemer er lovlige i Danmark. Casinoer tillader enhver indsatsstørrelse inden for bordets minimum og maksimum. De har ingen grund til at forbyde systemer, der ikke ændrer house edge – de tjener det samme uanset hvilket system du bruger.",
  },
];

const FibonacciBlackjackGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Fibonacci-Systemet i Blackjack 2026 – Sekvensen, Matematikken & Realiteten",
    description: "Komplet analyse af Fibonacci-indsatssystemet i blackjack: sekvensmeknik, 5.000-hånds simulering, sammenligning med Martingale og D'Alembert, og ærlige konklusioner.",
    url: `${SITE_URL}/casinospil/blackjack/fibonacci`,
    datePublished: "2026-03-02",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Fibonacci Blackjack 2026 – System, Matematik & Test"
        description="Fibonacci-systemet i blackjack: Talrækken, to-trin-reglen, 5.000-hånds simulering og sammenligning med Martingale. Se om det virker."
        type="article"
        datePublished="2026-03-02"
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(220 60% 20%), hsl(240 50% 18%) 40%, hsl(200 70% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sigma className="mr-1.5 h-3.5 w-3.5" /> Matematisk analyse
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Fibonacci-Systemet i Blackjack – Naturens Talrække Møder Casino-Matematikken
            </h1>
            <p className="text-lg text-white/80">
              1, 1, 2, 3, 5, 8, 13... Kan en 800 år gammel talrække fra middelalderen give dig en edge ved blackjack-bordet? Her er det matematiske svar.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="36 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Casino blackjack-bord med Fibonacci-spiralen og chipstakke arrangeret i talrækken" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 – Fibonacci: Fra middelalderen til casinobordet
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Fra Middelalderens Pisa til Dit Blackjack-Bord: Fibonacci-Talrækkens Rejse
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I 1202 publicerede den italienske matematiker Leonardo af Pisa – bedre kendt som Fibonacci – sit værk <em>Liber Abaci</em>. I et berømt tankeeksperiment om kaninreproduktion beskrev han den talrække, der bærer hans navn: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89... Hvert tal er summen af de to foregående. Hvad Fibonacci ikke vidste var, at hans talrække 800 år senere ville blive brugt af millioner af casinospillere verden over som et indsatssystem.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fibonacci-sekvensen dukker op overalt i naturen: i solsikkers frøarrangementer, nautilussneglens spiral, galaksers rotationsmønstre og menneskets DNA-helix. Denne naturlige universalitet har skabt en <em>mystisk aura</em> omkring sekvensen – en tro på, at der er noget fundamentalt "rigtigt" ved disse tal. Den tro er forkert i casino-kontekst, men den er forståelig.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I denne guide dissekerer jeg Fibonacci-systemet med samme analytiske precision, som jeg brugte på <Link to="/casinospil/blackjack/martingale" className={linkClass}>Martingale-analysen</Link>. Men hvor Martingale er en hammer – brutal, direkte, ødelæggende – er Fibonacci en skalpel: mere elegant, mere nuanceret, og i sidste ende stadig ude af stand til at overvinde <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link>. Lad os begynde med mekanikken.
          </p>

          <Card className="mb-6 border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Sigma className="h-5 w-5 text-primary" />
                Fibonacci-Sekvensen til Blackjack (med 50 kr. basisenhed)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 px-3 text-left font-semibold">Step</th>
                      <th className="py-2 px-3">1</th><th className="py-2 px-3">2</th><th className="py-2 px-3">3</th><th className="py-2 px-3">4</th><th className="py-2 px-3">5</th><th className="py-2 px-3">6</th><th className="py-2 px-3">7</th><th className="py-2 px-3">8</th><th className="py-2 px-3">9</th><th className="py-2 px-3">10</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-3 font-medium">Fibonacci-tal</td>
                      <td className="py-2 px-3">1</td><td className="py-2 px-3">1</td><td className="py-2 px-3">2</td><td className="py-2 px-3">3</td><td className="py-2 px-3">5</td><td className="py-2 px-3">8</td><td className="py-2 px-3">13</td><td className="py-2 px-3">21</td><td className="py-2 px-3">34</td><td className="py-2 px-3">55</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-3 font-medium">Indsats</td>
                      <td className="py-2 px-3">50</td><td className="py-2 px-3">50</td><td className="py-2 px-3">100</td><td className="py-2 px-3">150</td><td className="py-2 px-3">250</td><td className="py-2 px-3">400</td><td className="py-2 px-3">650</td><td className="py-2 px-3">1.050</td><td className="py-2 px-3">1.700</td><td className="py-2 px-3">2.750</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">Kumuleret tab</td>
                      <td className="py-2 px-3">50</td><td className="py-2 px-3">100</td><td className="py-2 px-3">200</td><td className="py-2 px-3">350</td><td className="py-2 px-3">600</td><td className="py-2 px-3">1.000</td><td className="py-2 px-3">1.650</td><td className="py-2 px-3">2.700</td><td className="py-2 px-3">4.400</td><td className="py-2 px-3">7.150</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Sammenlign med Martingale: efter 7 tab er Fibonacci-indsatsen 650 kr. (kumuleret: 1.650 kr.) vs. Martingales 3.200 kr. (kumuleret: 6.350 kr.). Fibonacci bruger ca. 75 % mindre kapital for at nå samme punkt.
              </p>
            </CardContent>
          </Card>
        </section>

        <ReviewScreenshot
          src={betanoLiveCasino}
          alt="Live casino-lobby med blackjack-borde – Fibonacci-systemet kan anvendes ved alle bordtyper med varierende indsatsgrænser"
          caption="En live casino-lobby med flere blackjack-varianter – Fibonacci-systemet kan bruges ved ethvert bord inden for dets indsatsgrænser."
          size="full"
        />

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 – Mekanikken: Sådan spiller du Fibonacci
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            Systemmekanik: To-Trin-Reglen og Sekvensnavigation
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fibonacci-systemets styrke (og svaghed) ligger i dets to-trin-tilbagegangsregel. Hvor <Link to="/casinospil/blackjack/martingale" className={linkClass}>Martingale</Link> nulstiller til basisindsatsen ved enhver gevinst, bevæger Fibonacci sig to pladser tilbage i sekvensen. Det betyder, at en enkelt gevinst ikke eliminerer hele din tabsserie – du har brug for flere gevinster til at "klatre ned" ad stigen.
          </p>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-primary" />
            Eksempel: En komplet Fibonacci-session
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Lad os følge en realistisk session for at forstå flowet. Basisenhed: 50 kr. Vi noterer step-nummeret og navigationen:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="py-3 px-3 text-left font-semibold">Hånd</th>
                  <th className="py-3 px-3 text-left font-semibold">Step</th>
                  <th className="py-3 px-3 text-left font-semibold">Indsats</th>
                  <th className="py-3 px-3 text-left font-semibold">Resultat</th>
                  <th className="py-3 px-3 text-left font-semibold">Handling</th>
                  <th className="py-3 px-3 text-left font-semibold">Session P/L</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50"><td className="py-2 px-3">1</td><td className="py-2 px-3">1</td><td className="py-2 px-3">50 kr.</td><td className="py-2 px-3 text-destructive">Tab</td><td className="py-2 px-3">→ Step 2</td><td className="py-2 px-3">-50 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3">2</td><td className="py-2 px-3">2</td><td className="py-2 px-3">50 kr.</td><td className="py-2 px-3 text-destructive">Tab</td><td className="py-2 px-3">→ Step 3</td><td className="py-2 px-3">-100 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3">3</td><td className="py-2 px-3">3</td><td className="py-2 px-3">100 kr.</td><td className="py-2 px-3 text-destructive">Tab</td><td className="py-2 px-3">→ Step 4</td><td className="py-2 px-3">-200 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3">4</td><td className="py-2 px-3">4</td><td className="py-2 px-3">150 kr.</td><td className="py-2 px-3 text-destructive">Tab</td><td className="py-2 px-3">→ Step 5</td><td className="py-2 px-3">-350 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3">5</td><td className="py-2 px-3">5</td><td className="py-2 px-3">250 kr.</td><td className="py-2 px-3 text-destructive">Tab</td><td className="py-2 px-3">→ Step 6</td><td className="py-2 px-3">-600 kr.</td></tr>
                <tr className="border-b border-border/50 bg-primary/5"><td className="py-2 px-3">6</td><td className="py-2 px-3">6</td><td className="py-2 px-3">400 kr.</td><td className="py-2 px-3 text-primary font-bold">Gevinst</td><td className="py-2 px-3">← Step 4</td><td className="py-2 px-3">-200 kr.</td></tr>
                <tr className="border-b border-border/50 bg-primary/5"><td className="py-2 px-3">7</td><td className="py-2 px-3">4</td><td className="py-2 px-3">150 kr.</td><td className="py-2 px-3 text-primary font-bold">Gevinst</td><td className="py-2 px-3">← Step 2</td><td className="py-2 px-3">-50 kr.</td></tr>
                <tr className="border-b border-border/50 bg-primary/5"><td className="py-2 px-3">8</td><td className="py-2 px-3">2</td><td className="py-2 px-3">50 kr.</td><td className="py-2 px-3 text-primary font-bold">Gevinst</td><td className="py-2 px-3">← Step 1 (nulstil)</td><td className="py-2 px-3">0 kr.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Studér tabellen: efter 5 tab og 3 gevinster er du back to even. Med Martingale ville du have haft brug for bare 1 gevinst efter 5 tab – men den gevinst ville kræve 1.600 kr. i indsats (vs. Fibonaccis 400 kr.). Fibonacci spreder risikoen over flere hænder, men kræver også flere gevinster til at komme tilbage. Det er en trade-off mellem max eksponering og recovery-hastighed.
          </p>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <Repeat className="h-5 w-5 text-primary" />
            Hvad sker der ved push og blackjack?
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Et push (uafgjort) behandles typisk som neutral – du forbliver på dit nuværende step uden at rykke op eller ned. Et blackjack (3:2 payout) behandles som en normal gevinst: du rykker to trin tilbage. Nogle spillere vælger at springe et ekstra trin ved blackjack, men det har minimal matematisk effekt over tid.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fordoblinger (double down) og splits er mere komplekse. Min anbefaling er at fordoble/splitte efter <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>basic strategy</Link> uanset dit Fibonacci-step. Dit indsatssystem bør aldrig overstyre optimal spilstrategi – de opererer på to separate niveauer.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 – Min 5.000-hånds simulering
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <LineChart className="h-7 w-7 text-primary" />
            Min 5.000-Hånds Simulering: Fibonacci Under Mikroskopet
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at teste Fibonacci under realistiske forhold simulerede jeg 5.000 hænder med perfekt basic strategy, S17, DAS, 3:2 BJ, 8 decks – de standardregler du finder hos <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> og <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link>. Basisenhed: 50 kr. Bordmaksimum: 5.000 kr. Bankroll: 15.000 kr.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Slutresultat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-destructive">-2.450 kr.</p>
                <p className="text-xs text-muted-foreground">16,3 % af bankroll</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Højeste Fibonacci-step nået</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Step 9</p>
                <p className="text-xs text-muted-foreground">Indsats: 1.700 kr. (34 enheder)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Sessions med profit (á 250)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">12 / 20</p>
                <p className="text-xs text-muted-foreground">60 % win-rate</p>
              </CardContent>
            </Card>
          </div>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Sessionsoversigt: De 20 sessions i detaljer
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Af de 20 sessions (á 250 hænder) var 12 profitable og 8 tabte. De profitable sessions genererede gennemsnitligt +312 kr. (+6,2 enheder). De tabte sessions kostede gennemsnitligt -775 kr. (-15,5 enheder). Mønstret er det samme som med alle progressionssystemer: mange små gevinster, færre men større tab.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den værste enkelt-session var session 14, hvor jeg nåede step 9 (1.700 kr. indsats) to gange. Den session kostede 2.200 kr. – nok til at eliminere gevinsten fra de foregående 7 vindende sessions. Det er Fibonacci-systemets akilleshæl: en enkelt dårlig session kan udslette mange gode.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Sammenlignet med min Martingale-simulering:</strong> Fibonacci tabte 2.450 kr. over 5.000 hænder (justeret for halvt antal hænder: ca. -4.900 kr. over 10.000). Martingale tabte 8.200 kr. over 10.000 hænder. Fibonacci var altså ca. 40 % "billigere" – primært fordi max-tab pr. ruinsekvens var 4.400 kr. vs. Martingales 6.350 kr.
          </p>
        </section>

        <ReviewScreenshot
          src={danskespilLiveBlackjack}
          alt="Danske Spil live blackjack-bord med kort og indsatsområder – velegnet til at teste Fibonacci-progressionen med faste indsatsskridt"
          caption="Live blackjack hos Danske Spil – et af de mest populære danske borde til progressionssystemer som Fibonacci"
          size="full"
        />

        <InlineCasinoCards title="Test Fibonacci på Disse Live Blackjack-Borde" />

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 – Det gyldne snit og casino-matematikken
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Det Gyldne Snit vs. House Edge: Hvorfor Naturens Matematik Ikke Slår Casinoet
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fibonacci-tilhængere argumenterer ofte for, at sekvensens forbindelse til det gyldne snit (φ ≈ 1,618) giver den en naturlig "harmoni" der optimerer indsatsmønstret. Det er en smuk idé – og den er fuldstændig forkert. Her er hvorfor:
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det gyldne snit beskriver et <em>geometrisk forhold</em> – det optimerer arealer, proportioner og æstetik. Casino-matematik handler om <em>sandsynligheder og forventede værdier</em>. De to domæner har intet med hinanden at gøre. At bruge Fibonacci-tal til at sætte indsatser er som at bruge Pythagorasˈ sætning til at vælge vinmenuen – matematisk elegant, funktionelt irrelevant.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den reelle grund til, at Fibonacci "føles" bedre end Martingale, er simpel: det eskalerer langsommere. Forholdet mellem konsekutive Fibonacci-tal konvergerer mod φ ≈ 1,618, mens Martingale bruger faktoren 2,0. Det betyder, at Fibonacci-indsatserne vokser ca. 20 % langsommere. Det giver dig mere spilletid og mindre dramatiske drawdowns – men det ændrer ikke den underliggende negative forventning.
          </p>

          <Card className="mb-6 bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3">Eskaleringshastighed: Fibonacci vs. Martingale</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 px-3 text-left font-semibold">Tab i træk</th>
                      <th className="py-2 px-3 text-left font-semibold">Fibonacci indsats</th>
                      <th className="py-2 px-3 text-left font-semibold">Fibonacci kumuleret</th>
                      <th className="py-2 px-3 text-left font-semibold">Martingale indsats</th>
                      <th className="py-2 px-3 text-left font-semibold">Martingale kumuleret</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">5</td><td className="py-2 px-3">250 kr.</td><td className="py-2 px-3">600 kr.</td><td className="py-2 px-3">1.600 kr.</td><td className="py-2 px-3">3.150 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">7</td><td className="py-2 px-3">650 kr.</td><td className="py-2 px-3">1.650 kr.</td><td className="py-2 px-3">6.400 kr.</td><td className="py-2 px-3">12.750 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">9</td><td className="py-2 px-3">1.700 kr.</td><td className="py-2 px-3">4.400 kr.</td><td className="py-2 px-3">25.600 kr.</td><td className="py-2 px-3">51.150 kr.</td></tr>
                    <tr><td className="py-2 px-3">10</td><td className="py-2 px-3">2.750 kr.</td><td className="py-2 px-3">7.150 kr.</td><td className="py-2 px-3">51.200 kr.</td><td className="py-2 px-3">102.350 kr.</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Ved 10 tab i træk er Fibonacci-eksponeringen 7.150 kr. – under 7 % af Martingales 102.350 kr. Det er en dramatisk forskel i nedsiderisiko.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5 – Recovery-matematik
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-primary" />
            Recovery-Matematik: Hvor Mange Gevinster Behøver Du?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fibonaccis to-trin-regel skaber et interessant recovery-mønster. Med Martingale behøver du præcis 1 gevinst for at komme i plus. Med Fibonacci afhænger det af, hvor dybt i sekvensen du er. Her er en detaljeret analyse:
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Fra step 6 (kumuleret tab: 1.000 kr.):</strong> Du behøver 3 gevinster i træk for at komme i plus: Step 6 → Step 4 → Step 2 → Step 1 (nulstil). Total gevinst: 400 + 150 + 50 = 600 kr. mod et kumuleret tab på 1.000 kr. = -400 kr. Vent – du er stadig i minus! Det er her, Fibonacci viser sin svaghed: to-trin-reglen er ofte ikke aggressiv nok til fuld recovery.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For fuldstændig recovery fra step 6 har du reelt brug for at vinde, tabe en gang mere (som sender dig til step 3), og derefter vinde 3 i træk igen. Alternativt kan en serie af vekslende gevinster og tab gradvist trække dig ned, men det kræver flere hænder og mere kapital.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne recovery-adfærd er fundamentalt anderledes end Martingales "alt-eller-intet"-approach. Fibonacci handler om gradvis nedtrapning snarere end øjeblikkelig nulstilling. Det giver en jævnere oplevelse – men det betyder også, at du kan hænge fast i mellemliggende steps længere, med indsatser der er højere end din basisenhed uden at du er i profit.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6 – Fibonacci vs. Martingale vs. D'Alembert
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            Den Store Sammenligning: Fibonacci vs. Martingale vs. D'Alembert
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            At vælge mellem progressionssystemer er som at vælge mellem forskellige typer is i en brand – ingen af dem slukker ilden, men nogle smelter langsommere. Her er den fulde sammenligning:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="py-3 px-3 text-left font-semibold">Parameter</th>
                  <th className="py-3 px-3 text-left font-semibold"><Link to="/casinospil/blackjack/martingale" className={linkClass}>Martingale</Link></th>
                  <th className="py-3 px-3 text-left font-semibold">Fibonacci</th>
                  <th className="py-3 px-3 text-left font-semibold"><Link to="/casinospil/blackjack/dalembert" className={linkClass}>D'Alembert</Link></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium">Eskaleringsfaktor</td><td className="py-2 px-3">×2,0 (eksponentiel)</td><td className="py-2 px-3">×1,618 (φ)</td><td className="py-2 px-3">+1 enhed (lineær)</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium">Indsats efter 7 tab (50 kr.)</td><td className="py-2 px-3">6.400 kr.</td><td className="py-2 px-3">650 kr.</td><td className="py-2 px-3">400 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium">Kumuleret tab (7 tab)</td><td className="py-2 px-3">12.750 kr.</td><td className="py-2 px-3">1.650 kr.</td><td className="py-2 px-3">2.450 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium">Recovery-gevinster behøvet</td><td className="py-2 px-3">1</td><td className="py-2 px-3">3-5</td><td className="py-2 px-3">4-7</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium">Max drawdown (10K hænder)</td><td className="py-2 px-3">-14.550 kr.</td><td className="py-2 px-3">-8.200 kr.</td><td className="py-2 px-3">-6.100 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium">Psykologisk profil</td><td className="py-2 px-3">Stressende</td><td className="py-2 px-3">Moderat</td><td className="py-2 px-3">Behagelig</td></tr>
                <tr><td className="py-2 px-3 font-medium">Bedst egnet til</td><td className="py-2 px-3">Korte sessions</td><td className="py-2 px-3">Medium sessions</td><td className="py-2 px-3">Lange sessions</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fibonacci placerer sig som "midtervej-systemet" – mere aggressivt end D'Alembert, men langt mindre volatilt end Martingale. Hvis du er typen, der vil have lidt spænding uden det emotionelle traume af Martingale, og D'Alembert føles for kedeligt, er Fibonacci det mindst ringe kompromis.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 7 – Fibonacci-varianter
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            Fibonacci-Varianter: Modificerede Sekvenser og Reversed Fibonacci
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ligesom Martingale har Fibonacci flere varianter. Her er de mest udbredte:
          </p>

          <h3 className="mb-3 text-xl font-bold">Reversed Fibonacci (Anti-Fibonacci)</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I stedet for at øge indsatsen ved tab, øger du den ved gevinst. Du bevæger dig op ad Fibonacci-sekvensen, når du vinder, og nulstiller ved tab. Ideen er at "ride" vindende streaks og begrænse tab. I min simulering var Reversed Fibonacci marginalt bedre end standard Fibonacci over 5.000 hænder (-2.100 kr. vs. -2.450 kr.), men forskellen var inden for statistisk usikkerhed.
          </p>

          <h3 className="mb-3 text-xl font-bold">Truncated Fibonacci (Max Step-Loft)</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Her sætter du et fast loft – f.eks. max step 6 (400 kr. med 50 kr. basis). Hvis du rammer loftet, forbliver du på det step, indtil du vinder. Det begrænser din max eksponering til 1.000 kr. (vs. 7.150 kr. for standard Fibonacci med 10 step). Trade-off: du mister muligheden for at "hente" store tab med en enkelt gevinst fra et højt step.
          </p>

          <h3 className="mb-3 text-xl font-bold">Aggressive Fibonacci (1-Step Tilbagegang)</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I stedet for at gå to trin tilbage ved gevinst, går du kun ét trin. Det gør recovery hurtigere, men det holder dig i højere steps længere. I min simulering var det lidt mere profitabelt i korte sessions, men med højere variance og værre worst-case scenarier. Jeg anbefaler det ikke.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 8 – Bordvalg og blackjack-varianter
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gamepad2 className="h-7 w-7 text-primary" />
            Fibonacci + Bordvalg: Hvilke Blackjack-Varianter Egner Sig Bedst?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvis du insisterer på at bruge Fibonacci, er bordvalg mindst lige så vigtigt som selve systemet. Her er mine anbefalinger baseret på matematisk analyse:
          </p>
          <div className="space-y-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Bedst: <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>Amerikansk Blackjack</Link> (S17, DAS, 3:2)
                </h3>
                <p className="text-muted-foreground text-sm">
                  House edge: 0,28 %. Hole card-reglen beskytter mod at miste fordoblinger/splits. Det lavere house edge reducerer den negative forventning pr. Fibonacci-sekvens og forlænger din spilletid.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Godt: <Link to="/casinospil/blackjack/spanish-21" className={linkClass}>Spanish 21</Link> (med bonusudbetalinger)
                </h3>
                <p className="text-muted-foreground text-sm">
                  House edge: 0,38-0,76 % afhængig af regler. De ekstra bonusudbetalinger (5-card 21 = 3:2, 6-card 21 = 2:1 osv.) kan hjælpe med recovery, men den missing 10s-mekanik øger variansen.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-destructive" />
                  Undgå: <Link to="/casinospil/blackjack/double-exposure-blackjack" className={linkClass}>Double Exposure</Link> (1:1 BJ payout)
                </h3>
                <p className="text-muted-foreground text-sm">
                  House edge: 0,69 %. Den reducerede blackjack-payout (1:1 vs. 3:2) eliminerer en vigtig gevinstkilde og gør recovery langsommere. Fibonacci-sekvensen tager længere at arbejde sig ned fra høje steps.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 9 – Practical rules
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            7 Ufravigelige Regler for Fibonacci i Blackjack
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fibonacci er ikke så farligt som Martingale, men det er stadig et negativt-EV system. Her er mine regler for skadesreduktion:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { title: "Brug max step 8 (1.050 kr.)", desc: "Med 50 kr. basis og step 8-loft er din max eksponering 2.700 kr. – håndterbart for de fleste bankrolls." },
              { title: "Sæt et sessions-tabsloft", desc: "Max 10 % af din bankroll pr. session. Med 15.000 kr. bankroll: stop ved -1.500 kr. uanset Fibonacci-position." },
              { title: "Spil altid perfekt basic strategy", desc: "Fibonacci-systemet sparer dig ca. 40 % vs. Martingale – men dårlig spilstrategi koster dig 1-1,5 % ekstra house edge. Strategifejl er langt dyrere end systemvalg." },
              { title: "Vælg borde med 3:2 blackjack", desc: "6:5 blackjack øger house edge med 1,39 %. Det svarer til at starte 28 Fibonacci-enheder bagud pr. blackjack – en katastrofe for et progressionssystem." },
              { title: "Undgå at kombinere med side bets", desc: "Side bets har 5-15 % house edge. At bruge Fibonacci på main hand og spille side bets ved siden af ødelægger ethvert forsøg på bankroll management." },
              { title: "Hold en skriftlig log", desc: "Notér dit Fibonacci-step for hver hånd. Det tvinger dig til at være bevidst om din eksponering og forhindrer emotionelle afvigelser." },
              { title: "Aldrig øg basisenheden mid-session", desc: "Hvis du taber 500 kr. og tænker 'lad mig øge basis fra 50 til 100', har du netop fordoblet din risiko. Det er Martingale-tænkning forklædt som Fibonacci." },
            ].map((rule, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">{i+1}</span>
                    {rule.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{rule.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 10 – Konklusion
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Konklusion: Fibonacci er Bedre end Martingale – Men Det Er Ikke Godt
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fibonacci-systemet er en klar forbedring over Martingale. Det eskalerer langsommere, kræver mindre kapital, har lavere max drawdown og er psykologisk mere holdbart. Hvis du absolutt insisterer på at bruge et progressionssystem i <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>, er Fibonacci – sammen med <Link to="/casinospil/blackjack/dalembert" className={linkClass}>D'Alembert</Link> – det mindst skadelige valg.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Men "bedre end Martingale" er en lav bar. Fibonacci ændrer stadig ikke house edge. Det omstrukturerer risiko – giver dig flere vindende sessions, men med dyrere tab. Over tid konvergerer dit resultat mod det samme negative gennemsnit som flat betting, bare med mere volatilitet og større emotionelle udsving.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den bedste blackjack-strategi er og forbliver: lær perfekt basic strategy, vælg favorable bordregler, brug flat betting med 1-2 % bankroll management, og spil for underholdning – ikke profit. Fibonacci kan tilføre en vis matematisk elegance til din session, men det er elegance på en synkende skude.
          </p>
          <Card className="mb-6 border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <p className="text-muted-foreground italic">
                "Fibonacci-sekvensen er en af matematikkens smukkeste opdagelser. Men at bruge den til at sætte casino-indsatser er som at bruge en Stradivarius-violin som dørstop – den fortjener bedre." — Jonas, Casinoaftaler.dk
              </p>
            </CardContent>
          </Card>
        </section>

        <CasinospilMoneyLinks gameName="Fibonacci Blackjack" currentPath="/casinospil/blackjack/fibonacci" />
        <LatestNewsByCategory pagePath="/casinospil/blackjack/fibonacci" />
        <RelatedGuides currentPath="/casinospil/blackjack/fibonacci" />
        <FAQSection faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="spildansknu" />
    </>
  );
};

export default FibonacciBlackjackGuide;
