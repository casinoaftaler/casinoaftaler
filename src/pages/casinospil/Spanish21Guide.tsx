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
  ShieldCheck,
  BarChart3,
  Sparkles,
  Zap,
  AlertTriangle,
  TrendingUp,
  Scale,
  Eye,
  Layers,
  Target,
  Trophy,
  Gift,
  Brain,
  Timer,
  Calculator,
  Gamepad2,
  Users,
  Puzzle,
  Flame,
  BookOpen,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/spanish-21-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er forskellen mellem Spanish 21 og klassisk blackjack?",
    answer: (
      <>
        Spanish 21 fjerner alle 10-værdikort fra kortbunken, men kompenserer med bonusregler og mere fleksible spillerfordele. Det gør varianten mere kompleks end <Link to="/casinospil/blackjack" className={linkClass}>standard blackjack</Link>.
      </>
    ),
  },
  {
    question: "Er house edge lavere i Spanish 21?",
    answer:
      "Nej, ikke normalt. Med optimal strategi ligger Spanish 21 typisk omkring 0,38-0,76 % afhængigt af reglerne, hvilket gør den konkurrencedygtig men sjældent bedre end de bedste amerikanske blackjack-borde.",
  },
  {
    question: "Kan jeg bruge standard basic strategy i Spanish 21?",
    answer:
      "Nej. De manglende 10'ere og de ekstra bonusregler ændrer beslutningerne markant. Hvis du bruger standard blackjack-strategi, stiger house edge mærkbart.",
  },
  {
    question: "Er Double Down Rescue virkelig værd at bruge?",
    answer:
      "Ja. Det er en af de mest værdifulde specialregler i Spanish 21, fordi den reducerer skaden på dårlige fordoblinger og giver mere taktisk fleksibilitet.",
  },
  {
    question: "Er Spanish 21 bedre end Double Exposure?",
    answer: (
      <>
        Ja, matematisk. Spanish 21 har typisk lavere house edge end <Link to="/casinospil/blackjack/double-exposure-blackjack" className={linkClass}>Double Exposure</Link>, men de to varianter appellerer til forskellige spillertyper og kræver hver sin strategi.
      </>
    ),
  },
];

const Spanish21Guide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Spanish 21 2026 – Regler, Strategi & House Edge",
    description: "Komplet guide til Spanish 21: bonusregler, manglende 10'ere, strategiændringer og sammenligning med andre blackjack-varianter.",
    url: `${SITE_URL}/casinospil/blackjack/spanish-21`,
    datePublished: "2026-03-02",
    dateModified: "2026-03-18",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Spanish 21 2026 – Regler, Strategi & House Edge"
        description="Lær Spanish 21: bonusregler, husets fordel, Double Down Rescue og hvordan varianten adskiller sig fra klassisk blackjack."
        type="article"
        datePublished="2026-03-02"
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section className="relative overflow-hidden py-12 md:py-20 bg-gradient-to-br from-primary/10 via-background to-muted">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Variantguide · marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Spanish 21 – Bonusregler, Strategi og Hvornår Varianten Giver Mening
            </h1>
            <p className="text-lg text-muted-foreground">
              Spanish 21 er ikke bare blackjack uden 10'ere. Det er en særskilt variant med egne bonusregler, egne prioriteringer og en strategi der skal læres separat.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="18-03-2026" readTime="17 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Spanish 21 bord med markerede bonusregler og blackjack-kort" width={1920} height={600} className="h-auto max-h-[400px] w-full object-cover" loading="eager" />
        </div>

        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold">
            <Brain className="h-7 w-7 text-primary" /> Hvad gør Spanish 21 unik?
          </h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Spanish 21 fjerner 10-kortene fra bunken, men giver spilleren flere værktøjer tilbage i form af bonusudbetalinger, fleksible fordoblinger og særlige redningsregler. Derfor kan du ikke evaluere spillet med standard-blackjack-logik alene.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hvis du vil sammenligne varianten med andre blackjack-spor, så brug hovedguiden til <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>, eller se forskellen til <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link> og <Link to="/casinospil/blackjack/double-exposure-blackjack" className={linkClass}>Double Exposure</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Spanish 21 vs Pontoon ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            Spanish 21 vs. Pontoon – Samme Spil, Forskellige Navne?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Pontoon er den australske version af Spanish 21, og de to varianter er næsten identiske – men ikke helt. Hvis du møder "Pontoon" i et online casino, er her de vigtigste forskelle:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Spanish 21 (Nordamerika)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Hit = "Hit", Stand = "Stand"</li>
                  <li>• 6-8 decks typisk</li>
                  <li>• Super Bonus for 7-7-7 suited vs. dealer 7</li>
                  <li>• Double Down Rescue</li>
                  <li>• Dealerens kort synlige (ét åbent)</li>
                  <li>• House edge: 0,38-0,76 %</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pontoon (Australien/UK)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Hit = "Twist", Stand = "Stick"</li>
                  <li>• 8 decks typisk</li>
                  <li>• Five Card Charlie (5-kort ≤21 vinder automatisk)</li>
                  <li>• Ingen Double Down Rescue</li>
                  <li>• Begge dealerkort skjulte (!)</li>
                  <li>• House edge: 0,36-0,65 %</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Den mest markante forskel er, at Pontoon skjuler begge dealerkort (dealer disclosure-varianten er sjælden). Det gør Pontoon til en hybrid mellem <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>europæisk blackjack</Link> (no hole card) og Spanish 21's bonusregler. Strategisk er Pontoon lidt mere udfordrende, men house edge er marginalt lavere. Hvis du har valget, er begge varianter fremragende – vælg den du finder mest tilgængelig.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Bankroll og varians ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Calculator className="h-7 w-7 text-primary" />
            Bankroll og Varians i Spanish 21
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spanish 21's varians er lidt højere end standard blackjack pga. bonusudbetalinger og den hyppigere forekomst af multi-kort hænder. Standardafvigelsen pr. hånd er ca. 1,22 × indsatsen (vs. 1,14 i standard blackjack). Det betyder lidt større udsving – men også mere spænding.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Anbefalet bankroll:</strong> Pga. den marginalt højere varians anbefaler vi 120-150 enheder (vs. 100 for standard blackjack). Med 100 kr. indsats: 12.000-15.000 kr. session-bankroll. Det giver dig tilstrækkelig buffer til at absorbere downswings og udnytte bonusudbetalinger.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Session-simulering (S17, 200 hænder, 100 kr.):</strong> Forventet tab: 76 kr. 68 % konfidensinterval: -2.500 kr. til +2.350 kr. Sandsynlighed for profit: 46 %. Sammenligning med <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link>: 45,4 % sandsynlighed for profit (vs. 46,8 %). Forskellen er under 1 procentpoint – i praksis umærkelig i en enkelt session.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Bonusudbetalings-effekten:</strong> Ca. 1 ud af 100 sessioner vil en Spanish 21-spiller ramme en significant bonusudbetaling (5+ kort 21 eller 6-7-8). Disse sessioner kan løfte resultatet med 500-2.000 kr. – nok til at vende en tabende session til en vindende. Denne "lotteri-effekt" er en del af Spanish 21's design og tiltrækningskraft: grundspillet er lidt dyrere end standard, men potentialet for store enkeltubetalinger er højere.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Hvor spiller du live blackjack ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Timer className="h-7 w-7 text-primary" />
            Hvor Spiller Du Live Blackjack i Danmark?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spanish 21 som specifik variant er sjælden i live-format hos danske casinoer. Men de fire nedenstående casinoer tilbyder alle live blackjack med fremragende regler – og RNG Spanish 21 til dem der specifikt ønsker varianten:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Dansk-ejet casino med RNG Spanish Blackjack (Microgaming) og bredt live blackjack-udbud via Evolution. MobilePay-integration og dansk support.</p>
                <p className="text-sm text-muted-foreground"><strong>Spanish 21:</strong> RNG-version tilgængelig. Live: standard blackjack med hole card-regler.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Stort spilbibliotek med Microgaming Spanish Blackjack Gold. Bredt live-udbud inkl. Blackjack Party og VIP-borde.</p>
                <p className="text-sm text-muted-foreground"><strong>Spanish 21:</strong> RNG Gold-version med forbedret grafik. Live: standard + Infinite Blackjack.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Stærkt live casino med Speed Blackjack og VIP-borde. Udmærket mobiloplevelse og hurtige <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>-udbetalinger.</p>
                <p className="text-sm text-muted-foreground"><strong>Spanish 21:</strong> RNG tilgængelig via Play'n GO. Live: standard + Lightning Blackjack.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Pay N Play med instant registrering via Trustly. Speed Blackjack for tempo-fokuserede spillere. Ingen langvarig tilmeldingsproces.</p>
                <p className="text-sm text-muted-foreground"><strong>Spanish 21:</strong> Begrænset RNG-udbud. Live: standard + Speed Blackjack.</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Alle fire casinoer er licenseret af <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> og bruger <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gamings</Link> live-platform. Sammenlign <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link> og <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> i vores individuelle <Link to="/casino-anmeldelser" className={linkClass}>casino-anmeldelser</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Er Spanish 21 det rigtige valg? ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Flame className="h-7 w-7 text-primary" />
            Er Spanish 21 Den Rigtige Blackjack-Variant for Dig?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spanish 21 er ideel for erfarne blackjack-spillere, der søger variation og er villige til at lære en ny strategi. Bonusreglerne tilføjer et underholdningselement, som standard blackjack mangler – og "spiller-21 vinder altid"-reglen eliminerer en af de mest frustrerende oplevelser i casinospil.
          </p>
          <ul className="space-y-3 mb-6 ml-4">
            <li className="text-muted-foreground leading-relaxed">
              <strong>Vælg Spanish 21 hvis du:</strong> Har mestret <Link to="/casinospil/blackjack" className={linkClass}>standard basic strategy</Link> og vil have en ny udfordring. Nyder bonusgevinster og "jackpot-momenter" (7-7-7). Er villig til at studere en mere kompleks strategi. Spiller primært for underholdning og accepterer en marginalt højere house edge end optimal <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link>.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Undgå Spanish 21 hvis du:</strong> Optimerer rent for lavest mulig house edge (vælg <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link> i stedet). Er nybegynder og endnu ikke behersker standard strategi. Kun kan finde H17-borde (0,76 % edge er for høj). Finder det ukomfortabelt at spille uden de 10'ere, du er vant til.
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Husk: den vigtigste blackjack-beslutning er stadig strategisk disciplin. En Spanish 21-spiller med perfekt strategi og 0,40 % house edge slår en standard-spiller med dårlig strategi og 2 % house edge. Lær strategien først – vælg variant bagefter. Alle varianter er dækket i vores <Link to="/casinospil/blackjack" className={linkClass}>hovedguide til blackjack</Link>.
          </p>
        </section>

        <CasinospilMoneyLinks gameName="Spanish 21" currentPath="/casinospil/blackjack/spanish-21" />
        <LatestNewsByCategory pagePath="/casinospil/blackjack/spanish-21" />
        <RelatedGuides currentPath="/casinospil/blackjack/spanish-21" />
        <FAQSection faqs={faqs} />
        <AuthorBio />
      </div>
      <StickyCtaBySlug slug="betinia" />
    </>
  );
};

export default Spanish21Guide;
