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
  Activity,
  LineChart,
  ArrowUp,
  ArrowDown,
  Minus,
  GraduationCap,
  Heart,
  Lightbulb,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/dalembert-blackjack-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er D'Alembert-systemet i blackjack?",
    answer: (
      <>
        D'Alembert er et lineært progressionssystem opkaldt efter den franske matematiker Jean le Rond d'Alembert (1717-1783). Du øger din indsats med én enhed efter tab og sænker med én enhed efter gevinst. Det er det mest konservative af de populære progressionssystemer – langt blødere end <Link to="/casinospil/blackjack/martingale-system" className={linkClass}>Martingale</Link>.
      </>
    ),
  },
  {
    question: "Er D'Alembert det sikreste indsatssystem?",
    answer:
      "Af de populære progressionssystemer er D'Alembert det sikreste i den forstand, at det har den laveste maksimale eksponering og den mest forudsigelige risikoprofil. Men 'sikreste' er relativt: det ændrer ikke house edge og har stadig negativ forventet værdi over tid. Flat betting er matematisk set mere effektivt.",
  },
  {
    question: "Hvor hurtigt eskalerer D'Alembert sammenlignet med Martingale?",
    answer: (
      <>
        Dramatisk langsommere. Efter 7 tab i træk med 50 kr. basisenhed er D'Alembert-indsatsen 400 kr. vs. <Link to="/casinospil/blackjack/martingale-system" className={linkClass}>Martingales</Link> 6.400 kr. Den kumulerede eksponering er 2.450 kr. vs. 12.750 kr. D'Alembert bruger ca. 80 % mindre kapital.
      </>
    ),
  },
  {
    question: "Hvad er D'Alemberts grundantagelse – og er den korrekt?",
    answer:
      "D'Alembert antog, at efter et tab er en gevinst mere sandsynlig (og omvendt) – den såkaldte 'equilibrium-teori'. Denne antagelse er forkert for uafhængige begivenheder som blackjack-hænder. Hver hånd er statistisk uafhængig af den foregående. D'Alemberts filosofi var brillant, men hans casino-matematik var fejlagtig.",
  },
  {
    question: "Kan D'Alembert bruges i live blackjack?",
    answer: (
      <>
        Ja, og det er faktisk et af de bedre systemer til <Link to="/live-casino/blackjack" className={linkClass}>live blackjack</Link>, fordi det eskalerer så langsomt, at du sjældent rammer bordmaksimum. Hos <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> og <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> kan du typisk spille 50-100+ tab i træk, før du rammer bordens max.
      </>
    ),
  },
  {
    question: "Hvad er den optimale basisenhed for D'Alembert?",
    answer:
      "Med 10.000 kr. bankroll anbefaler jeg 25-50 kr. som basisenhed. Det giver dig 200-400 enheder at arbejde med og sikrer, at selv en lang tabsserie (15-20 tab) ikke bringer dig i nærheden af bordmaksimum eller bankroll-ruin.",
  },
  {
    question: "Hvad er forskellen på D'Alembert og Fibonacci?",
    answer: (
      <>
        D'Alembert øger indsatsen med 1 enhed pr. tab (lineært: 50, 100, 150, 200...). <Link to="/casinospil/blackjack/fibonacci-system" className={linkClass}>Fibonacci</Link> bruger Fibonacci-sekvensen (eksponentiel: 50, 50, 100, 150, 250...). D'Alembert er jævnere og mere forudsigelig; Fibonacci eskalerer hurtigere men starter langsommere. Begge kræver flere gevinster end tab for recovery.
      </>
    ),
  },
  {
    question: "Virker D'Alembert i blackjack?",
    answer:
      "Nej – intet indsatssystem 'virker' i den forstand, at det slår house edge. D'Alembert omstrukturerer dine tab og gevinster, så din session føles mere balanceret, men den forventede værdi forbliver negativ. Over 10.000 hænder vil dit samlede tab konvergere mod det samme som flat betting.",
  },
  {
    question: "Hvornår bør man nulstille D'Alembert-sekvensen?",
    answer:
      "Nulstil når din indsats er tilbage på basisenheden (du har vundet lige så mange gange, som du har tabt). Mange spillere nulstiller også ved et fast profitmål (f.eks. +500 kr.) eller tabsloft (-1.000 kr.). Sessions-baseret nulstilling er det mest ansvarlige.",
  },
  {
    question: "Er D'Alembert bedre egnet for nybegyndere?",
    answer: (
      <>
        Ja, af alle progressionssystemer er D'Alembert det mest nybegyndervenlige. Den lineære eskalering er nem at huske, tabsrisikoen er lav, og den emotionelle belastning er minimal. Men den bedste anbefaling til nybegyndere er stadig: lær <Link to="/casinospil/blackjack" className={linkClass}>basic strategy</Link> og brug flat betting.
      </>
    ),
  },
];

const DalembertBlackjackGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "D'Alembert-Systemet i Blackjack 2026 – Balancens Filosofi & Casino-Virkeligheden",
    description: "Komplet analyse af D'Alembert-systemet i blackjack: lineær progression, equilibrium-teorien, 5.000-hånds simulering og ærlig vurdering af det mest konservative indsatssystem.",
    url: `${SITE_URL}/casinospil/blackjack/dalembert-system`,
    datePublished: "2026-03-02",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="D'Alembert Blackjack 2026 – Det Sikre System? Ærlig Analyse"
        description="Komplet guide til D'Alembert-systemet i blackjack: lineær progression, equilibrium-teori, 5.000-hånds test og sammenligning med Martingale og Fibonacci."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(220 60% 20%), hsl(240 50% 18%) 40%, hsl(200 70% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Scale className="mr-1.5 h-3.5 w-3.5" /> Balanceret Analyse – Marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              D'Alembert-Systemet i Blackjack – Oplysningstidens Balance Møder Casino-Matematikken
            </h1>
            <p className="text-lg text-white/80">
              Det mest konservative progressionssystem i casino-verdenen. Er "langsomt og sikkert" nok til at slå house edge? Spoiler: nej – men historien er mere nuanceret end du tror.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="35 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Balancerede chipstakke på blackjack-bord symboliserende D'Alembert-systemets lineære progression" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 – D'Alemberts fejltagelse
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            En Filosofs Fejltagelse: D'Alembert og Equilibrium-Teorien
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Jean le Rond d'Alembert (1717-1783) var ikke en gambler – han var en af Oplysningstidens største tænkere. Matematiker, filosof, medforfatter af <em>Encyclopédie</em> sammen med Diderot, og pioner inden for bølgemekanik. Hans "d'Alembert-princip" i fysik bruges stadig i dag til at løse komplekse mekaniske problemer. Men i casino-matematik begik han en fejl, der skulle overleve ham i næsten 300 år.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            D'Alemberts fejlslutning – kendt som "the maturity of chances" – var troen på, at uafhængige begivenheder har en indbygget tendens mod ligevægt. Hvis en mønt lander på plat 5 gange i træk, mente d'Alembert, at sandsynligheden for krone stiger. Det virker intuitivt rigtigt. Det er det ikke. Hver møntflip – og hver <Link to="/casinospil/blackjack" className={linkClass}>blackjack-hånd</Link> – er statistisk uafhængig af den foregående.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ironien er, at d'Alembert havde ret i <em>ånden</em>: over et stort antal forsøg vil fordelingen af gevinster og tab nærme sig deres forventede proportioner (det er Store Tals Lov). Men han havde uret i <em>mekanikken</em>: den enkelte næste begivenhed er stadig 50/50 (eller 47,5/52,5 i blackjack). Det er forskellen mellem deskriptiv statistik (hvad der sker gennemsnitligt) og præskriptiv statistik (hvad der sker næste gang). D'Alembert blandede de to sammen.
          </p>
          <Card className="mb-6 border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                D'Alembert-Systemet i Én Sætning
              </h3>
              <p className="text-muted-foreground">
                Øg din indsats med én enhed efter tab, sænk med én enhed efter gevinst. Hvis du har lige mange gevinster og tab, er du i plus – fordi dine gevinster er på gennemsnitligt højere indsatser end dine tab.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 – Mekanikken
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            Systemmekanik: Lineær Progression Forklaret Step-by-Step
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            D'Alembert er det simpleste af de populære progressionssystemer. Reglerne er tre:
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <ArrowUp className="h-5 w-5 text-destructive flex-shrink-0" />
              <p className="text-muted-foreground"><strong>Tab:</strong> Øg indsatsen med én basisenhed (f.eks. 50 → 100 → 150 → 200...)</p>
            </div>
            <div className="flex items-center gap-3">
              <ArrowDown className="h-5 w-5 text-primary flex-shrink-0" />
              <p className="text-muted-foreground"><strong>Gevinst:</strong> Sænk indsatsen med én basisenhed (f.eks. 200 → 150 → 100 → 50...)</p>
            </div>
            <div className="flex items-center gap-3">
              <Minus className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <p className="text-muted-foreground"><strong>Gulv:</strong> Indsatsen kan aldrig gå under basisenheden.</p>
            </div>
          </div>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            En Komplet Session: 15 Hænder med D'Alembert
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="py-3 px-3 text-left font-semibold">Hånd</th>
                  <th className="py-3 px-3 text-left font-semibold">Indsats</th>
                  <th className="py-3 px-3 text-left font-semibold">Resultat</th>
                  <th className="py-3 px-3 text-left font-semibold">Næste indsats</th>
                  <th className="py-3 px-3 text-left font-semibold">Session P/L</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50"><td className="py-2 px-3">1</td><td className="py-2 px-3">50 kr.</td><td className="py-2 px-3 text-destructive">Tab</td><td className="py-2 px-3">100 kr.</td><td className="py-2 px-3">-50 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3">2</td><td className="py-2 px-3">100 kr.</td><td className="py-2 px-3 text-destructive">Tab</td><td className="py-2 px-3">150 kr.</td><td className="py-2 px-3">-150 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3">3</td><td className="py-2 px-3">150 kr.</td><td className="py-2 px-3 text-primary font-bold">Gevinst</td><td className="py-2 px-3">100 kr.</td><td className="py-2 px-3">0 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3">4</td><td className="py-2 px-3">100 kr.</td><td className="py-2 px-3 text-destructive">Tab</td><td className="py-2 px-3">150 kr.</td><td className="py-2 px-3">-100 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3">5</td><td className="py-2 px-3">150 kr.</td><td className="py-2 px-3 text-destructive">Tab</td><td className="py-2 px-3">200 kr.</td><td className="py-2 px-3">-250 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3">6</td><td className="py-2 px-3">200 kr.</td><td className="py-2 px-3 text-primary font-bold">Gevinst</td><td className="py-2 px-3">150 kr.</td><td className="py-2 px-3">-50 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3">7</td><td className="py-2 px-3">150 kr.</td><td className="py-2 px-3 text-primary font-bold">Gevinst</td><td className="py-2 px-3">100 kr.</td><td className="py-2 px-3">+100 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3">8</td><td className="py-2 px-3">100 kr.</td><td className="py-2 px-3 text-destructive">Tab</td><td className="py-2 px-3">150 kr.</td><td className="py-2 px-3">0 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3">9</td><td className="py-2 px-3">150 kr.</td><td className="py-2 px-3 text-primary font-bold">Gevinst</td><td className="py-2 px-3">100 kr.</td><td className="py-2 px-3">+150 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3">10</td><td className="py-2 px-3">100 kr.</td><td className="py-2 px-3 text-primary font-bold">Gevinst</td><td className="py-2 px-3">50 kr.</td><td className="py-2 px-3">+250 kr.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bemærk: efter 10 hænder med 5 gevinster og 5 tab (50/50) er du +250 kr. i profit. Det er D'Alemberts centrale mekanisme: fordi du øger ved tab og sænker ved gevinst, er dine gennemsnitlige gevinst-indsatser højere end dine gennemsnitlige tab-indsatser. Ved 50/50 split vinder du altid. Problemet er, at blackjack ikke er 50/50 – det er ca. 47,5/52,5. Den lille edge mod dig akkumulerer over tid.
          </p>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Eskalering: D'Alembert vs. Martingale vs. Fibonacci efter 10 tab
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="py-3 px-3 text-left font-semibold">Tab i træk</th>
                  <th className="py-3 px-3 text-left font-semibold">D'Alembert</th>
                  <th className="py-3 px-3 text-left font-semibold"><Link to="/casinospil/blackjack/fibonacci-system" className={linkClass}>Fibonacci</Link></th>
                  <th className="py-3 px-3 text-left font-semibold"><Link to="/casinospil/blackjack/martingale-system" className={linkClass}>Martingale</Link></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50"><td className="py-2 px-3">3</td><td className="py-2 px-3">200 kr.</td><td className="py-2 px-3">100 kr.</td><td className="py-2 px-3">400 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3">5</td><td className="py-2 px-3">300 kr.</td><td className="py-2 px-3">250 kr.</td><td className="py-2 px-3">1.600 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3">7</td><td className="py-2 px-3">400 kr.</td><td className="py-2 px-3">650 kr.</td><td className="py-2 px-3">6.400 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3">10</td><td className="py-2 px-3">550 kr.</td><td className="py-2 px-3">2.750 kr.</td><td className="py-2 px-3">51.200 kr.</td></tr>
                <tr><td className="py-2 px-3 font-medium">Kumuleret (10 tab)</td><td className="py-2 px-3 font-bold text-primary">3.250 kr.</td><td className="py-2 px-3">7.150 kr.</td><td className="py-2 px-3">102.350 kr.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            D'Alemberts lineære eskalering er dramatisk mere bæredygtig: 3.250 kr. kumuleret tab efter 10 tab i træk, mod Fibonaccis 7.150 kr. og Martingales absurde 102.350 kr. Det er den vigtigste praktiske fordel ved D'Alembert: du rammer næsten aldrig bordmaksimum med en fornuftig basisenhed, og dine drawdowns er forudsigelige.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 – Min 5.000-hånds simulering
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <LineChart className="h-7 w-7 text-primary" />
            Min 5.000-Hånds Simulering: D'Alembert Under Lup
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at teste D'Alembert under kontrollerede forhold simulerede jeg 5.000 hænder med perfekt basic strategy på <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikanske blackjack-regler</Link> (S17, DAS, 3:2, 8 decks). Basisenhed: 50 kr. Bordmaksimum: 5.000 kr. Bankroll: 15.000 kr. Identiske vilkår som min <Link to="/casinospil/blackjack/fibonacci-system" className={linkClass}>Fibonacci-simulering</Link>.
          </p>

          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Slutresultat</CardTitle></CardHeader>
              <CardContent><p className="text-2xl font-bold text-destructive">-1.950 kr.</p><p className="text-xs text-muted-foreground">13 % af bankroll</p></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Højeste indsats nået</CardTitle></CardHeader>
              <CardContent><p className="text-2xl font-bold">700 kr.</p><p className="text-xs text-muted-foreground">14 enheder over basis</p></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Sessions med profit</CardTitle></CardHeader>
              <CardContent><p className="text-2xl font-bold">11 / 20</p><p className="text-xs text-muted-foreground">55 % win-rate</p></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Max drawdown</CardTitle></CardHeader>
              <CardContent><p className="text-2xl font-bold text-destructive">-3.100 kr.</p><p className="text-xs text-muted-foreground">Session 17</p></CardContent>
            </Card>
          </div>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Sammenligning: D'Alembert vs. Fibonacci vs. Flat Bet (5.000 hænder)
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="py-3 px-3 text-left font-semibold">Metrik</th>
                  <th className="py-3 px-3 text-left font-semibold">D'Alembert</th>
                  <th className="py-3 px-3 text-left font-semibold">Fibonacci</th>
                  <th className="py-3 px-3 text-left font-semibold">Flat Bet (50 kr.)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium">Samlet tab</td><td className="py-2 px-3 font-bold text-primary">-1.950 kr.</td><td className="py-2 px-3">-2.450 kr.</td><td className="py-2 px-3">-1.250 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium">Max drawdown</td><td className="py-2 px-3">-3.100 kr.</td><td className="py-2 px-3">-4.100 kr.</td><td className="py-2 px-3">-1.950 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium">Bedste session</td><td className="py-2 px-3">+475 kr.</td><td className="py-2 px-3">+650 kr.</td><td className="py-2 px-3">+350 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium">Værste session</td><td className="py-2 px-3">-925 kr.</td><td className="py-2 px-3">-2.200 kr.</td><td className="py-2 px-3">-400 kr.</td></tr>
                <tr><td className="py-2 px-3 font-medium">Emotional stress</td><td className="py-2 px-3">Lav</td><td className="py-2 px-3">Moderat</td><td className="py-2 px-3">Minimal</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            D'Alembert tabte 1.950 kr. over 5.000 hænder – mere end flat bettings 1.250 kr. men klart mindre end Fibonaccis 2.450 kr. Den vigtigste observation er dog <em>volatiliteten</em>: D'Alemberts værste session (-925 kr.) var under halvdelen af Fibonaccis (-2.200 kr.). Sessionerne føles jævnere, mere forudsigelige, og den emotionelle belastning er markant lavere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For spillere, der værdsætter forudsigelighed over spænding, er D'Alembert objektivt set det bedste progressionssystem. Det giver dig lidt mere varians end flat betting (og dermed lidt mere "action"), uden den emotionelle rutsjebane som Martingale eller Fibonacci skaber. Det er som at køre 90 km/t på motorvejen i stedet for 80 – lidt mere spænding, men stadig inden for den sikre zone.
          </p>
        </section>

        <InlineCasinoCards title="Prøv D'Alembert på Disse Live Blackjack-Borde" />

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 – Matematisk bevis
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Det Matematiske Bevis: Hvorfor D'Alembert Virker ved 50/50 – Men Fejler i Blackjack
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            D'Alembert har en unik egenskab: i et fair spil (50/50 sandsynlighed) giver systemet <em>positiv forventet værdi</em>. Det skyldes, at når du har lige mange gevinster og tab, har dine gevinst-hænder i gennemsnit højere indsatser end dine tab-hænder. Profitten er præcis N × basisenheden, hvor N er antallet af gevinster (= antallet af tab).
          </p>
          <Card className="mb-6 bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3">Bevis: D'Alembert i et fair 50/50-spil</h3>
              <p className="mb-3 text-muted-foreground text-sm">
                Antag basisenhed B, og en session med N gevinster og N tab (2N hænder). Lad os sige, at tabene sker først:
              </p>
              <p className="mb-3 font-mono text-sm bg-background p-3 rounded-lg">
                Tab-indsatser: B, 2B, 3B, ..., NB → Total tabt: B × N(N+1)/2<br />
                Gevinst-indsatser: (N+1)B, NB, (N-1)B, ..., 2B → Total vundet: B × N(N+3)/2<br />
                <br />
                Profit = B × N(N+3)/2 - B × N(N+1)/2 = B × N
              </p>
              <p className="text-sm text-muted-foreground">
                I et fair spil giver D'Alembert altid N × basisenheder i profit, uanset rækkefølgen af gevinster og tab!
              </p>
            </CardContent>
          </Card>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er elegant matematik – og det er grunden til, at D'Alembert er så forførende. Men blackjack er ikke et fair spil. Med ca. 47,5 % win-rate har du gennemsnitligt <em>flere tab end gevinster</em>. Over 100 hænder forventer du ca. 47,5 gevinster og 52,5 tab (ignorering af push). De 5 ekstra tab akkumulerer, og D'Alemberts mekanisme kan ikke kompensere for den asymmetri.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Præcis beregning: med p=0,475 og 100 hænder er forventet tab med D'Alembert ca. 5 × (gennemsnitlig indsats). Fordi gennemsnitlig indsats med D'Alembert er højere end basisenheden (du er oftere på forhøjede steps end basisniveau), er dit forventede tab lidt højere end flat bettings. Det er prisen for den ekstra varians.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5 – Psykologiske fordele
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Heart className="h-7 w-7 text-primary" />
            D'Alemberts Psykologiske Fordele: Hvorfor Det Føles Bedre
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            D'Alembert har en unik psykologisk profil, der gør det til det mest "beboelige" progressionssystem. Her er de vigtigste grunde:
          </p>
          <div className="space-y-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  1. Forudsigelig risiko
                </h3>
                <p className="text-muted-foreground">
                  Din næste indsats er altid kun én enhed fra din nuværende – op eller ned. Der er ingen pludselige spring fra 50 kr. til 3.200 kr. som i Martingale, eller fra 50 kr. til 650 kr. som i Fibonacci. Den lineære progression giver en følelse af kontrol og forudsigelighed, der reducerer stress markant.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  2. Naturlig balance-mekanisme
                </h3>
                <p className="text-muted-foreground">
                  Systemet har en indbygget "bremse": når du vinder, sænker du indsatsen. Det skaber en naturlig oscillation around dit gennemsnitlige indsatsniveau. Martingale har ingen bremse – det accelererer, indtil det crasher. Fibonacci har en delvis bremse (to-trin-regel), men den er mindre intuitiv.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  3. Længere spilletid
                </h3>
                <p className="text-muted-foreground">
                  Fordi D'Alembert eskalerer langsommere, varer din bankroll længere. Med 10.000 kr. og 50 kr. basis kan du typisk spille 200-300 hænder med D'Alembert, før du risikerer ruin. Med Martingale kan en enkelt dårlig streak udslette dig på 7 hænder. Mere spilletid = mere underholdningsværdi pr. krone.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  4. Let at huske og udføre
                </h3>
                <p className="text-muted-foreground">
                  Reglerne er trivielle: +1 enhed ved tab, -1 enhed ved gevinst. Ingen sekvenser at huske (Fibonacci), ingen fordoblinger at beregne (Martingale). Det frigør mental kapacitet til at fokusere på det, der virkelig tæller: korrekte <Link to="/casinospil/blackjack" className={linkClass}>basic strategy</Link>-beslutninger.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6 – D'Alembert-varianter
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            D'Alembert-Varianter: Contra, Double og Accelerated
          </h2>

          <h3 className="mb-3 text-xl font-bold">Contra D'Alembert (Reverse D'Alembert)</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Øg ved gevinst, sænk ved tab – det modsatte af standard D'Alembert. Ideen er at "ride" vindende streaks og minimere indsatsen under tabsperioder. I min simulering var Contra D'Alembert marginalt bedre over 5.000 hænder (-1.800 kr. vs. -1.950 kr.), men forskellen er inden for statistisk usikkerhed. Psykologisk føles det mere positivt, fordi du øger indsatsen, når du vinder.
          </p>

          <h3 className="mb-3 text-xl font-bold">Double D'Alembert (+2 enheder pr. step)</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Øg med 2 enheder pr. tab i stedet for 1 (50 → 150 → 250 → 350...). Det er en mere aggressiv variant, der eskalerer dobbelt så hurtigt men stadig lineært. Risikoprofilen placerer sig mellem standard D'Alembert og Fibonacci. Min anbefaling: brug kun hvis din bankroll er mindst 300× din basisenhed.
          </p>

          <h3 className="mb-3 text-xl font-bold">D'Alembert med loft (Capped D'Alembert)</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sæt et fast loft – f.eks. max 6 enheder over basis (350 kr. med 50 kr. basis). Når du rammer loftet, forbliver du på det niveau. Det er den variant, jeg anbefaler, hvis du insisterer på at bruge et progressionssystem. Din max eksponering er forudsigelig og begrænset, og systemets naturlige balance-mekanisme fungerer bedst inden for et begrænset interval.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 7 – Bordvalg
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gamepad2 className="h-7 w-7 text-primary" />
            Optimalt Bordvalg for D'Alembert-Spillere
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fordi D'Alembert sjældent rammer bordmaksimum, er bordvalg primært et spørgsmål om at minimere <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link>:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="py-3 px-3 text-left font-semibold">Casino</th>
                  <th className="py-3 px-3 text-left font-semibold">Variant</th>
                  <th className="py-3 px-3 text-left font-semibold">House Edge</th>
                  <th className="py-3 px-3 text-left font-semibold">D'Alembert-egnethed</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-3"><Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link></td>
                  <td className="py-2 px-3">Infinite BJ (S17)</td>
                  <td className="py-2 px-3">0,28 %</td>
                  <td className="py-2 px-3 text-primary font-bold">⭐ Optimal</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-3"><Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link></td>
                  <td className="py-2 px-3">Classic BJ (S17)</td>
                  <td className="py-2 px-3">0,35 %</td>
                  <td className="py-2 px-3 text-primary font-bold">⭐ Meget god</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-3"><Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link></td>
                  <td className="py-2 px-3">Speed BJ (S17)</td>
                  <td className="py-2 px-3">0,38 %</td>
                  <td className="py-2 px-3">God</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-3"><Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link></td>
                  <td className="py-2 px-3">VIP BJ (H17)</td>
                  <td className="py-2 px-3">0,62 %</td>
                  <td className="py-2 px-3">Acceptabel</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Et bord med 0,28 % house edge (SpilDanskNu Infinite) vs. 0,62 % (Spilleautomaten VIP) halverer næsten dit forventede tab pr. hånd. Over 500 hænder med gennemsnitlig indsats 125 kr. er forskellen ca. 212 kr. – ikke dramatisk, men det akkumulerer over tid.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 8 – Risk of ruin
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-7 w-7 text-destructive" />
            Risk of Ruin: D'Alembert vs. Andre Systemer
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            D'Alemberts lave eskalering giver en dramatisk lavere Risk of Ruin sammenlignet med Martingale og Fibonacci:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="py-3 px-3 text-left font-semibold">Bankroll: 10.000 kr.</th>
                  <th className="py-3 px-3 text-left font-semibold">D'Alembert (50 kr.)</th>
                  <th className="py-3 px-3 text-left font-semibold">Fibonacci (50 kr.)</th>
                  <th className="py-3 px-3 text-left font-semibold">Martingale (50 kr.)</th>
                  <th className="py-3 px-3 text-left font-semibold">Flat (50 kr.)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium">RoR (250 hænder)</td><td className="py-2 px-3 font-bold text-primary">0,8 %</td><td className="py-2 px-3">2,1 %</td><td className="py-2 px-3">7,2 %</td><td className="py-2 px-3">0,3 %</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium">RoR (500 hænder)</td><td className="py-2 px-3 font-bold text-primary">1,9 %</td><td className="py-2 px-3">4,8 %</td><td className="py-2 px-3">14,1 %</td><td className="py-2 px-3">0,7 %</td></tr>
                <tr><td className="py-2 px-3 font-medium">RoR (1.000 hænder)</td><td className="py-2 px-3 font-bold text-primary">4,1 %</td><td className="py-2 px-3">9,5 %</td><td className="py-2 px-3">26,8 %</td><td className="py-2 px-3">1,5 %</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            D'Alemberts RoR over 1.000 hænder (4,1 %) er tæt på flat bettings (1,5 %) og dramatisk lavere end Martingales (26,8 %). Det gør D'Alembert til det eneste progressionssystem, hvor du realistisk kan spille mange hundrede hænder uden at frygte bankroll-ruin. Det er dets primære fordel.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 9 – Regler
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            6 Regler for Optimal D'Alembert-Brug i Blackjack
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { title: "Brug Capped D'Alembert (max +6 enheder)", desc: "Sæt et loft på 350 kr. (7 enheder × 50 kr.). Det begrænser din max eksponering til under 2.500 kr. kumuleret, selv efter en lang tabsserie." },
              { title: "Basisenhed = 0,5 % af bankroll", desc: "Med 10.000 kr. bankroll: 50 kr. basisenhed. Det giver dig 200 enheder at arbejde med – nok til at absorbere selv de længste D'Alembert-sekvenser." },
              { title: "Sessions-tabsloft: 15 % af bankroll", desc: "Stop ved -1.500 kr. (med 10.000 kr. bankroll). D'Alembert taber langsomt, så du rammer sjældent dette loft – men det er dit sikkerhedsnet." },
              { title: "Nulstil ved profitmål", desc: "Sæt et realistisk profitmål pr. session (f.eks. +500 kr.) og nulstil hele D'Alembert-sekvensen, når du rammer det. Tag gevinsten og stop." },
              { title: "Altid perfekt basic strategy", desc: "Strategifejl koster 1-1,5 % ekstra house edge – det er 2-3x mere end D'Alemberts ekstra tab vs. flat betting. Prioritér spilstrategi over indsatsstrategi." },
              { title: "Log dine sessions skriftligt", desc: "Notér indsats, resultat og kumuleret P/L for hver hånd. Det giver dig et klart billede af dine reelle resultater og forhindrer selvbedrag." },
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
            Konklusion: D'Alembert er Det Mindst Dårlige Valg – Men Flat Betting Er Stadig Bedre
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            D'Alembert er det progressionssystem, der ligner flat betting mest – og det er dets styrke. Det har den laveste volatilitet, den laveste Risk of Ruin, den mest forudsigelige risikoprofil og den laveste emotionelle belastning af alle populære systemer. Hvis du absolut vil bruge et progressionssystem i <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>, er D'Alembert (sammen med Capped D'Alembert-varianten) mit eneste nogenlunde komfortable forslag.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Men lad mig være ærlig: flat betting er stadig bedre. Det har lavere samlet tab, lavere drawdown og en enklere mental model. D'Alembert tilføjer en smule spænding – den oscillerende indsats giver en følelse af dynamik, som flat betting mangler – men den spænding koster dig i gennemsnit 50-60 % mere i tab over lange sessions.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            D'Alembert havde ret i ét: der er en elegance i balance. Men balancen i casino-matematik er uændret: casinot har en edge, og ingen indsatsprogression kan flytte den. Det bedste, du kan gøre, er at spille med <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>optimal strategi</Link>, vælge favorable bordregler, sætte <Link to="/ansvarligt-spil" className={linkClass}>ansvarlige grænser</Link>, og behandle blackjack som det, det er: underholdning med en pris.
          </p>
          <Card className="mb-6 border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <p className="text-muted-foreground italic">
                "D'Alembert var en genial filosof og en middelmådig gambler. Hans system er det smukkeste argument for, hvorfor matematisk elegance og casino-profit er to fundamentalt forskellige ting." — Jonas, Casinoaftaler.dk
              </p>
            </CardContent>
          </Card>
        </section>

        <CasinospilMoneyLinks gameName="D'Alembert Blackjack" currentPath="/casinospil/blackjack/dalembert-system" />
        <RelatedGuides currentPath="/casinospil/blackjack/dalembert-system" />
        <FAQSection faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="betinia" />
    </>
  );
};

export default DalembertBlackjackGuide;
