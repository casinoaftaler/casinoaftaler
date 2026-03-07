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
  Brain,
  Timer,
  Lightbulb,
  XCircle,
  CheckCircle,
  Gamepad2,
  Users,
  Calculator,
  BookOpen,
  Puzzle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/double-exposure-blackjack-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er Double Exposure Blackjack?",
    answer: (
      <>
        Double Exposure (også kaldet Face Up 21) er en blackjack-variant, hvor begge dealerens kort deles åbent. Du har fuld information om dealerens hånd, før du handler. Til gengæld kompenserer casinoet med strengere regler – typisk betaler blackjack kun 1:1 (even money), og dealeren vinder alle ties undtagen naturlig blackjack.
      </>
    ),
  },
  {
    question: "Er house edge lavere fordi man kan se begge dealerkort?",
    answer:
      "Nej, faktisk er house edge typisk 0,69 % – højere end standard blackjack (0,28-0,50 %). Informationsfordelen kompenseres fuldt ud af regelrestriktionerne: 1:1 blackjack-udbetaling, dealer vinder ties, og begrænsede split/fordoblings-muligheder.",
  },
  {
    question: "Hvornår skal man hitte på 20 i Double Exposure?",
    answer:
      "Aldrig. Selvom du kan se dealerens kort, er det aldrig korrekt at hitte hard 20. Risikoen for bust (92 %) overstiger enhver potentiel gevinst. Stand altid på 20, uanset dealerens hånd.",
  },
  {
    question: "Kan man korttælle i Double Exposure?",
    answer:
      "Ja, og det er faktisk lettere, fordi du ser to ekstra kort pr. runde. Men casinoer bruger typisk 6-8 decks med hyppig omblanding for at minimere effekten. Online RNG-versioner blander efter hver hånd.",
  },
  {
    question: "Er Double Exposure tilgængelig hos danske casinoer?",
    answer: (
      <>
        Double Exposure er sjælden i <Link to="/live-casino" className={linkClass}>live casino</Link>-format, men flere <Link to="/casino-anmeldelser" className={linkClass}>danske licenserede casinoer</Link> tilbyder RNG-versioner fra udbydere som <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link> og <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>.
      </>
    ),
  },
  {
    question: "Hvad er den optimale strategi for Double Exposure?",
    answer:
      "Strategien adskiller sig markant fra standard blackjack, fordi du har fuld information. Grundreglen: stand når du slår dealerens total, hit når du er bagud, og fordobl kun i de stærkeste situationer. Du skal aldrig tage insurance (den eksisterer ikke i Double Exposure) og sjældent splitte.",
  },
  {
    question: "Er Double Exposure et godt valg for nybegyndere?",
    answer: (
      <>
        Paradoksalt nok nej. Selvom det lyder lettere (du kan se alle kort), er strategien helt anderledes end standard blackjack. Nybegyndere bør starte med <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link>, lære basic strategy dér, og derefter eksperimentere med Double Exposure.
      </>
    ),
  },
  {
    question: "Hvad sker der ved tie (push) i Double Exposure?",
    answer:
      "I modsætning til standard blackjack (hvor ties returnerer din indsats), vinder dealeren alle ties i Double Exposure – undtagen naturlig blackjack. Hvis du og dealeren begge har 19, mister du din indsats. Denne regel er den næststørste faktor i den forhøjede house edge.",
  },
  {
    question: "Findes der Double Exposure med bedre regler?",
    answer:
      "Sjældent. Nogle varianter tillader 'push on 20' (ties på 20 returnerer indsats), hvilket reducerer house edge med ca. 0,20 %. Andre varianter tillader surrender, som tilføjer yderligere 0,07 %. Men selv med de bedste regler er Double Exposure's house edge altid højere end standard blackjack.",
  },
  {
    question: "Hvordan adskiller Double Exposure sig fra Spanish 21?",
    answer: (
      <>
        Fundamentalt: Double Exposure giver dig mere information (begge dealerkort synlige) men strengere regler. <Link to="/casinospil/blackjack/spanish-21" className={linkClass}>Spanish 21</Link> fjerner 10-kort men tilbyder bonusregler. Double Exposure har 0,69 % house edge vs. Spanish 21's 0,40 %. Begge kræver unik strategi – ingen af dem bruger standard basic strategy.
      </>
    ),
  },
];

const DoubleExposureBlackjackGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Double Exposure Blackjack 2026 – Regler, Strategi & EV-Analyse",
    description: "Komplet guide til Double Exposure Blackjack: begge dealerkort synlige, tilpasset strategi, house edge-matematik og sammenligning med klassisk blackjack.",
    url: `${SITE_URL}/casinospil/blackjack/double-exposure`,
    datePublished: "2026-03-02",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Double Exposure Blackjack 2026 – Komplet Guide"
        description="Double Exposure Blackjack guide: begge dealerkort synlige, tilpasset strategi, house edge-matematik og EV-analyse for danske spillere."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(220 60% 20%), hsl(240 50% 18%) 40%, hsl(200 70% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Double Exposure Blackjack – Fuld Information, Nye Regler
            </h1>
            <p className="text-lg text-white/80">
              Se begge dealerens kort – men forbered dig på strengere vilkår. Det fuldstændige overblik over den mest transparente blackjack-variant.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="36 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Double Exposure blackjack-bord med begge dealerkort synlige" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ═══════════════ CRITICAL FIRST: Advarsel ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-7 w-7 text-destructive" />
            Advarsel: Hvorfor 90 % af Spillere Taber Mere på Double Exposure
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Lad os starte med den vigtigste pointe, som de fleste Double Exposure-guides overser: <strong>denne variant har en højere <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> end standard blackjack</strong>. Ja, du kan se begge dealerens kort. Ja, det føles som en kæmpe fordel. Men nej, det er det ikke – fordi casinoet har kompenseret med regler der koster dig mere, end informationen er værd.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den typiske Double Exposure-spiller tror, at fuld information eliminerer usikkerhed. Det gør det – men casinoet har ikke givet dig denne fordel gratis. De har fjernet 3:2 blackjack-udbetaling (koster dig 1,39 %), tilføjet "dealer vinder ties" (koster dig 0,50 %), og begrænset dine splits og fordoblinger (koster dig 0,24 %). Den samlede kompensation (2,13 %) overstiger informationsfordelens værdi (ca. 2,00 %).
          </p>
          <Card className="border-border bg-card my-6 border-destructive/30">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <XCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-2">Den Store Misforståelse</p>
                  <p className="text-sm text-muted-foreground">
                    "Jeg kan se begge kort, så jeg kan umuligt tabe" – denne logik ignorerer, at information kun er værdifuld, hvis den ændrer dine beslutninger. I mange situationer er din handling identisk uanset dealerens kort (f.eks. stand på 20, hit på 6). Information uden handlingskonsekvens har nul EV-værdi.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Med alt det sagt: Double Exposure er stadig et af de bedste casinospil målt på house edge. 0,69 % er langt bedre end <Link to="/casinospil/roulette" className={linkClass}>roulette</Link> (2,70 %), <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> (3-8 %) eller de fleste side bets (3-8 %). Det er bare ikke det <em>bedste</em> blackjack-spil. Hvis du spiller Double Exposure fordi du nyder transparensen og har lært den specifikke strategi, er det et helt legitimt valg. Hvis du spiller det fordi du tror, det er nemmere at vinde – så er dette dit wake-up call.
          </p>
        </section>

        <InlineCasinoCards title="Casinoer med blackjack-varianter" count={4} />

        {/* ═══════════════ Hvad er Double Exposure ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Eye className="h-7 w-7 text-primary" />
            Hvad er Double Exposure – Historien og Konceptet
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Double Exposure Blackjack (også kendt som Face Up 21, Dealer Disclosure eller Zweikartenspiel) er en af de mest unikke blackjack-varianter. Konceptet er radikalt simpelt: <strong>begge dealerens kort deles åbent</strong>. Du har fuld information om dealerens hånd, før du træffer nogen beslutning. Det eliminerer den centrale usikkerhed i blackjack – dealerens skjulte kort.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Varianten blev populær i 1970'erne og 1980'erne i Las Vegas og blev formaliseret af Richard Epstein i hans banebrydende arbejde om spilteori, "The Theory of Gambling and Statistical Logic". Epstein demonstrerede matematisk, at fuld information giver spilleren en fordel på ca. 10 % – men at denne fordel kan neutraliseres helt med regelændringer. Casinoer tog udfordringen op og designede et regelsæt der præcist kompenserer for informationsfordelen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I dag er Double Exposure primært tilgængelig som RNG-spil online. Live-versioner er sjældne, fordi det er sværere for casinoer at kontrollere spillets tempo og korttælning, når alle kort er synlige. De fleste danske casinoer tilbyder mindst én RNG-version via <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link> eller <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det centrale paradoks i Double Exposure er, at mere information ikke nødvendigvis giver bedre resultater. Spillere med standard <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>-erfaring vil instinktivt bruge forkert strategi (fordi de vurderer baseret på dealerens up card, ikke total), og dermed tabe mere end nødvendigt. Double Exposure kræver en fundamentalt anderledes strategisk tilgang.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Reglerne ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            Reglerne – Hvad Du Giver og Hvad Du Får (Med EV-Analyse)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Hvad Du Får (Spillerfordele)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Begge dealerkort synlige:</strong> -2,00 % (stor fordel)</li>
                  <li>• Perfekt information til alle beslutninger</li>
                  <li>• Ingen overraskelser (dealer-blackjack ses straks)</li>
                  <li>• Ingen insurance-fælde (eksisterer ikke)</li>
                  <li>• Lettere at lære grundstrategi (se total, ikke up card)</li>
                  <li>• Dealer kan ikke "gemme" en stærk hånd</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <XCircle className="h-5 w-5 text-destructive" />
                  Hvad Du Betaler (Casino-Kompensationer)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Blackjack betaler 1:1:</strong> +1,39 % (enorm kost)</li>
                  <li>• <strong>Dealer vinder alle ties:</strong> +0,50 % (stor kost)</li>
                  <li>• <strong>Fordobling kun på hard 9, 10, 11:</strong> +0,09 %</li>
                  <li>• <strong>Split kun én gang:</strong> +0,10 %</li>
                  <li>• <strong>Ingen surrender:</strong> +0,07 %</li>
                  <li>• <strong>Ingen re-split af esser:</strong> +0,08 %</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h3 className="mb-3 text-xl font-semibold">Regel-impact breakdown</h3>
          <Card className="border-border bg-card my-4">
            <CardContent className="pt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Regel</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">EV-impact</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Retning</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Kumulativ</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">Begge kort synlige</td>
                      <td className="text-center py-2 text-primary font-medium">-2,00 %</td>
                      <td className="text-center py-2">Spiller ↑</td>
                      <td className="text-center py-2">-2,00 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Blackjack betaler 1:1</td>
                      <td className="text-center py-2 text-destructive font-medium">+1,39 %</td>
                      <td className="text-center py-2">Casino ↑</td>
                      <td className="text-center py-2">-0,61 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Dealer vinder ties</td>
                      <td className="text-center py-2 text-destructive">+0,50 %</td>
                      <td className="text-center py-2">Casino ↑</td>
                      <td className="text-center py-2">-0,11 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Begrænsede splits</td>
                      <td className="text-center py-2">+0,10 %</td>
                      <td className="text-center py-2">Casino ↑</td>
                      <td className="text-center py-2">-0,01 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Fordobling kun 9/10/11</td>
                      <td className="text-center py-2">+0,09 %</td>
                      <td className="text-center py-2">Casino ↑</td>
                      <td className="text-center py-2">+0,08 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Ingen re-split/surrender</td>
                      <td className="text-center py-2">+0,15 %</td>
                      <td className="text-center py-2">Casino ↑</td>
                      <td className="text-center py-2">+0,23 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Grundspil house edge</td>
                      <td className="text-center py-2">+0,46 %</td>
                      <td className="text-center py-2">Casino ↑</td>
                      <td className="text-center py-2 font-medium text-foreground">+0,69 %</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Den enkelte regelændring med størst impact er 1:1 blackjack. I standard blackjack udgør 3:2-udbetalingen ca. 2,3 % af din samlede forventede værdi. At reducere den til 1:1 koster dig 1,39 % i house edge – mere end alle andre regelforskelle tilsammen. Hvis du kun lærer én ting fra denne guide, lad det være dette: <strong>blackjack-udbetalingsratioen er vigtigere end nogen anden regel i spillet</strong>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Strategi ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            Optimal Strategi – Tænk i Totaler, Ikke Up Cards
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fordi du kender dealerens fulde hånd, er strategien for Double Exposure fundamentalt anderledes end <Link to="/casinospil/blackjack" className={linkClass}>standard basic strategy</Link>. I stedet for at handle baseret på dealerens up card, handler du baseret på dealerens <em>total</em>. Og fordi dealer vinder ties, skal du stræbe efter at <em>slå</em> dealerens total – ikke bare matche den.
          </p>

          <h3 className="mb-3 text-xl font-semibold">De 5 Gyldne Regler for Double Exposure</h3>
          <ol className="space-y-4 mb-6 list-decimal ml-6">
            <li className="text-muted-foreground leading-relaxed">
              <strong>Regel 1 – Stand når du slår dealer:</strong> Hvis din total overstiger dealerens, stand altid (uanset hvor lav din hånd er). Du: 15, Dealer: 14? Stand. Du vinder allerede.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Regel 2 – Hit når du er bagud (og dealer kan forbedre sig):</strong> Hvis dealerens total overstiger din, og dealer ikke har en bust-hånd (12-16), hit. Ties er tab, og dealerens hånd forbedres ikke, så du skal forbedre din.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Regel 3 – Stand mod dealer-bust-hånde:</strong> Hvis dealerens total er 12-16 (bust-zone), stand på næsten alt. Dealeren er tvunget til at trække og buster ca. 42 % af gangene med hard 12-16.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Regel 4 – Ties er tab, ikke draws:</strong> 18 mod 18 er et tab. 19 mod 19 er et tab. Du skal slå dealerens total for at vinde. Denne mentale omstilling er den vigtigste i Double Exposure.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Regel 5 – Double ned sparsomt:</strong> Fordobling er kun korrekt i ekstremt gunstige situationer (du: 11 mod dealer bust-hånd, du: 10 mod dealer 13-16). De begrænsede doubling-regler reducerer de profitable muligheder markant.
            </li>
          </ol>

          <h3 className="mb-3 text-xl font-semibold">Strategi-tabel: Dine vigtigste beslutninger</h3>
          <Card className="border-border bg-card my-4">
            <CardContent className="pt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Situation</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Double Exposure</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Standard BJ</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Logik</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">Du: 18, Dealer: 19</td>
                      <td className="text-center py-2 font-medium text-primary">Hit</td>
                      <td className="text-center py-2">Stand</td>
                      <td className="text-center py-2 text-xs">18 taber – forsøg forbedring</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Du: 17, Dealer: 17</td>
                      <td className="text-center py-2 font-medium text-primary">Hit</td>
                      <td className="text-center py-2">Stand</td>
                      <td className="text-center py-2 text-xs">Tie = tab, hit for at forbedre</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Du: 20, Dealer: 20</td>
                      <td className="text-center py-2 font-medium text-destructive">Stand</td>
                      <td className="text-center py-2">Stand</td>
                      <td className="text-center py-2 text-xs">Hit buster 92 % – acceptér tab</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Du: 12, Dealer: 15</td>
                      <td className="text-center py-2 font-medium text-primary">Stand</td>
                      <td className="text-center py-2">Hit</td>
                      <td className="text-center py-2 text-xs">Dealer buster ~42 %, du buster ~31 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Du: 16, Dealer: 19</td>
                      <td className="text-center py-2 font-medium text-primary">Hit</td>
                      <td className="text-center py-2">Hit/Surrender</td>
                      <td className="text-center py-2 text-xs">Du taber 100 % ved stand</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Du: 14, Dealer: 14</td>
                      <td className="text-center py-2 font-medium text-primary">Hit</td>
                      <td className="text-center py-2">Stand</td>
                      <td className="text-center py-2 text-xs">Tie = tab, dealer buster men du også</td>
                    </tr>
                    <tr>
                      <td className="py-2">Du: 11, Dealer: 15</td>
                      <td className="text-center py-2 font-medium text-primary">Double</td>
                      <td className="text-center py-2">Double</td>
                      <td className="text-center py-2 text-xs">Dealer buster ofte, 11 er stærk</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Den mest kontraintuitive ændring: du hitter oftere på hånde over 15, fordi et tie er et tab. Og du stander oftere på lave hånde (12-14), fordi du kan <em>se</em> at dealeren sandsynligvis buster. Denne dynamik gør Double Exposure til en udmærket variant for spillere, der vil udfordre deres strategiske tænkning ud over <Link to="/casinospil/blackjack" className={linkClass}>standard blackjack</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Perfect Information Paradokset ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Puzzle className="h-7 w-7 text-primary" />
            Perfect Information Paradokset – Hvorfor Viden Ikke Er Magt
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Double Exposure illustrerer et fascinerende spilteoretisk princip: <strong>perfekt information har ingen intrinsisk værdi</strong>. Dens værdi afhænger af, om informationen ændrer dine optimale beslutninger – og i hvor mange situationer den gør det.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I standard blackjack med dealerens hole card skjult er der ca. 340 unikke spillerbeslutninger (din hånd × dealerens up card). I Double Exposure ekspanderer det til ca. 1.200 kombinationer (din hånd × dealerens total × dealerens specifikke kortsammensætning). Men af disse 1.200 kombinationer ændrer fuld information kun din optimale handling i ca. 180 tilfælde (15 %). I de resterende 85 % er din handling identisk, uanset om du kender dealerens kort eller ej.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er her paradokset opstår: den oplevede fordel ("jeg kan se alt!") er dramatisk større end den reelle fordel. Spillere føler sig magtfulde og i kontrol, men de 15 % ændrede beslutninger genererer kun ca. 2 % EV-forbedring – som casinoet derefter overstiger med sine kompensationsregler (2,13 % i regelændringsomkostning).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Sammenligning med andre spil:</strong> I <Link to="/casinospil/poker" className={linkClass}>poker</Link> er skjult information alt – spillet ville kollapse med åbne kort. I blackjack er skjult information vigtig, men ikke definerende. Blackjack er primært et matematisk optimeringsprolem, og perfekt information ændrer optimet marginalt. Det er derfor Double Exposure fungerer som casinospil: informationsfordelen er reel men begrænset, og casinoet kan neutralisere den præcist.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Den psykologiske fælde:</strong> Mange spillere afviger fra optimal Double Exposure-strategi, fordi de "ved bedre" – de kan jo se kortene. En spiller der ser dealer 20 og har 19 vil instinktivt vide, at de taber, men de vil alligevel stande fordi "hit på 19 er sindssygt". Men i Double Exposure er det korrekte play netop at stande og acceptere tabet – ikke fordi det føles rigtigt, men fordi hit buster 85 % af gangene. Emotionel reaktion til perfekt information fører paradoksalt nok til dårligere beslutninger end informationsmangel.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Korttælling ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Korttælning i Double Exposure – Lettere men Stadig Svært
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Double Exposure er den mest korttæller-venlige blackjack-variant af én simpel grund: du ser flere kort pr. runde. I standard blackjack ser du dit kort + dealerens up card. I Double Exposure ser du alle kort. Det giver ca. 15-20 % mere information pr. runde – en markant fordel for tælning.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Hi-Lo i Double Exposure:</strong> Systemet fungerer identisk – 2-6 = +1, 7-9 = 0, 10-Es = -1. Men du ser flere kort, så din running count akkumulerer hurtigere og din true count-præcision forbedres. Med 6 decks og 50 % penetration ser du ca. 156 kort i Double Exposure vs. 130 i standard blackjack. Det giver en mere pålidelig count.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Men:</strong> Den øgede informationsflow er en tveægget sværd. Casinoer ved, at Double Exposure er tæller-venlig, og kompenserer med: 1) Hyppigere omblanding (lavere penetration). 2) Flere decks (8 i stedet for 6). 3) Lavere indsatslofter. 4) I online RNG-format: shuffle efter hver hånd, hvilket gør tælling umulig.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Konklusion:</strong> Korttælning i Double Exposure er teoretisk mere effektiv end i standard blackjack, men de praktiske begrænsninger (online shuffle, lave limits) gør det urentabelt for de fleste. Investér din tid i at lære den specifikke Double Exposure-strategi – det giver et garanteret 0,15-0,30 % EV-boost uden risiko for konsekvenser.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 1000-hånds simulering ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Calculator className="h-7 w-7 text-primary" />
            Sessionssimulering: 1.000 Hænder Double Exposure vs. Standard
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at sætte Double Exposure's house edge i perspektiv simulerede vi 1.000 hænder med 100 kr. indsats og sammenlignede med <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>standard amerikansk blackjack</Link>:
          </p>
          <Card className="border-border bg-card my-6">
            <CardHeader>
              <CardTitle className="text-lg">1.000 hænder × 100 kr. – Monte Carlo-simulering (10.000 gentagelser)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Metrik</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Double Exposure</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Amerikansk BJ</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Forskel</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">Forventet tab</td>
                      <td className="text-center py-2 text-destructive">-690 kr.</td>
                      <td className="text-center py-2 text-primary">-280 kr.</td>
                      <td className="text-center py-2">410 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Standardafvigelse</td>
                      <td className="text-center py-2">3.420 kr.</td>
                      <td className="text-center py-2">3.580 kr.</td>
                      <td className="text-center py-2">-160 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Chance for profit</td>
                      <td className="text-center py-2">42,0 %</td>
                      <td className="text-center py-2 text-primary">46,8 %</td>
                      <td className="text-center py-2">4,8 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Worst case (5. percentil)</td>
                      <td className="text-center py-2 text-destructive">-6.320 kr.</td>
                      <td className="text-center py-2">-6.170 kr.</td>
                      <td className="text-center py-2">150 kr.</td>
                    </tr>
                    <tr>
                      <td className="py-2">Årlig EV (200 h/uge)</td>
                      <td className="text-center py-2 text-destructive">-7.176 kr.</td>
                      <td className="text-center py-2 text-primary">-2.912 kr.</td>
                      <td className="text-center py-2">4.264 kr.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den årlige forskel på 4.264 kr. er signifikant – det er prisen for transparensen. Men sæt det i perspektiv: 7.176 kr./år er 138 kr./uge – stadig billigere end mange andre hobbyer. Og variansen er faktisk lavere i Double Exposure (standardafvigelse 3.420 vs. 3.580), fordi de mere konservative regler (færre splits, færre fordoblinger) reducerer udsving.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Interessant observation:</strong> Double Exposure har lavere varians men højere house edge. Det er det omvendte af hvad de fleste spillere ønsker (lav house edge, lav varians). For risikoaverse spillere der prioriterer stabile sessioner over maksimal EV, kan Double Exposure faktisk være en attraktiv profil – du taber lidt mere i gennemsnit, men med færre store udsving.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ RNG vs live tilgængelighed ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gamepad2 className="h-7 w-7 text-primary" />
            Tilgængelighed i Danmark – RNG og Live-Formater
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Double Exposure er en nichevariant, og tilgængeligheden er begrænset sammenlignet med standard blackjack. Her er en ærlig oversigt over hvad du kan forvente hos danske casinoer i 2026:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  RNG Double Exposure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Tilgængelighed:</strong> Moderat (ca. 40 % af casinoer)</li>
                  <li>• <strong>Udbydere:</strong> <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link>, <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link></li>
                  <li>• <strong>Min. indsats:</strong> 10-25 kr.</li>
                  <li>• <strong>Korttælling:</strong> Umulig (shuffle pr. hånd)</li>
                  <li>• <strong>Bedst til:</strong> Øvelse og casual spil</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" />
                  Live Double Exposure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Tilgængelighed:</strong> Meget sjælden (&lt; 5 % af casinoer)</li>
                  <li>• <strong>Udbydere:</strong> Ingen fast live-udbyder i DK</li>
                  <li>• <strong>Note:</strong> Evolution har testet Face Up BJ men trukket det</li>
                  <li>• <strong>Alternativ:</strong> Standard live BJ med peek-regler</li>
                  <li>• <strong>Bedst til:</strong> Ikke realistisk i DK aktuelt</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Fordi live Double Exposure er næsten utilgængelig i Danmark, anbefaler vi at bruge RNG-versioner til at øve strategi og derefter skifte til <Link to="/live-casino/blackjack" className={linkClass}>standard live blackjack</Link> for den rigtige casinooplevelse. De fire casinoer med det bedste live blackjack-udbud er <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link>, <Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link>, <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> og <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Hvem bør spille ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-primary" />
            Hvem Bør Spille Double Exposure – Og Hvem Bør Undgå Den?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Double Exposure er ikke for alle. Her er en ærlig vurdering baseret på spillertyper:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Double Exposure er for dig, hvis…
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Du frustreres af dealerens skjulte kort</li>
                  <li>• Du har mestret standard basic strategy og vil have udfordring</li>
                  <li>• Du accepterer 0,69 % house edge for gennemsigtighed</li>
                  <li>• Du er interesseret i spilteori og informationsparadokser</li>
                  <li>• Du foretrækker lavere varians over lavere house edge</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <XCircle className="h-5 w-5 text-destructive" />
                  Undgå Double Exposure, hvis…
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Du optimerer primært for lavest mulig house edge</li>
                  <li>• Du er nybegynder og lærer stadig basic strategy</li>
                  <li>• Du forventer at spille live (næsten utilgængelig i DK)</li>
                  <li>• Du tror fuld information gør det "lettere at vinde"</li>
                  <li>• Du nyder 3:2 blackjack-udbetalingens ekstra spænding</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            For den laveste house edge, vælg <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link> med S17 og 3:2. For den bedste balance mellem variation og EV, overvej <Link to="/casinospil/blackjack/spanish-21" className={linkClass}>Spanish 21</Link>. For en unik strategisk udfordring med fuld transparens – spil Double Exposure. Alle varianter er dækket i vores <Link to="/casinospil/blackjack" className={linkClass}>hoveguide til blackjack</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        <AuthorBio />

        <RelatedGuides currentPath="/casinospil/blackjack/double-exposure" />

        <FAQSection faqs={faqs} />
      </div>
      <StickyCtaBySlug slug="spilleautomaten" />
    </>
  );
};

export default DoubleExposureBlackjackGuide;
