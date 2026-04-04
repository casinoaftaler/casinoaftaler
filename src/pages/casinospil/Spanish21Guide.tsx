import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import { CasinospilMoneyLinks } from "@/components/CasinospilMoneyLinks";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { MenuIcon } from "@/components/MenuIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import liveBlackjackLobby from "@/assets/screenshots/live-blackjack-lobby-spanish21.webp";
import liveBlackjackSkaermnavn from "@/assets/screenshots/live-blackjack-skaermnavn-dialog.webp";
import liveBlackjackDealerBust from "@/assets/screenshots/live-blackjack-a-dealer-bust.webp";
import spanish21StrategyChart from "@/assets/screenshots/spanish-21-basic-strategy-skema.webp";
const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er forskellen mellem Spanish 21 og klassisk blackjack?",
    answer: (
      <>
        Spanish 21 fjerner alle 16 ti-værdikort (10♠, 10♥, 10♦, 10♣ × antal decks) fra kortbunken, men kompenserer med bonusudbetalinger for specifikke kortkombinationer (6-7-8, 7-7-7, 5+ kort 21), late surrender, Double Down Rescue og reglen om at spillerens 21 altid slår dealerens 21. Det gør varianten strategisk mere kompleks end <Link to="/casinospil/blackjack" className={linkClass}>standard blackjack</Link>, men også mere underholdende for erfarne spillere.
      </>
    ),
  },
  {
    question: "Er house edge lavere i Spanish 21 end i standard blackjack?",
    answer:
      "Det afhænger af bordreglerne. Med optimal strategi og S17-regler (dealer stands on soft 17) ligger Spanish 21 på ca. 0,38-0,40 % house edge – konkurrencedygtigt med de bedste standard blackjack-borde. Med H17-regler (dealer hits on soft 17) stiger house edge til ca. 0,72-0,76 %, hvilket er dyrere end optimal standard blackjack. Nøglen er at finde S17-borde.",
  },
  {
    question: "Kan jeg bruge standard basic strategy i Spanish 21?",
    answer:
      "Nej, absolut ikke. De manglende 10'ere ændrer sandsynlighedsfordelingen fundamentalt, og de ekstra bonusregler (Double Down Rescue, redouble, multi-kort bonusser) skaber nye optimale beslutninger. Hvis du bruger standard blackjack-strategi i Spanish 21, stiger house edge med 1-2 procentpoint – en katastrofal forskel over tid.",
  },
  {
    question: "Er Double Down Rescue virkelig værd at bruge?",
    answer:
      "Ja, det er en af de mest værdifulde specialregler i Spanish 21. Double Down Rescue lader dig opgive halvdelen af din fordoblede indsats, når du har fået et dårligt tredje kort. Det reducerer den forventede tab på aggressive fordoblinger med op til 50 % i worst-case scenarier og tilføjer en strategisk dimension, der ikke findes i andre blackjack-varianter.",
  },
  {
    question: "Hvor kan jeg spille Spanish 21 online med dansk licens?",
    answer: (
      <>
        Spanish 21 er primært tilgængeligt som RNG-version (Microgaming Spanish Blackjack Gold) hos danske casinoer som <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> og <Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link>. Live dealer-versioner er sjældne, men <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gamings</Link> standard live blackjack tilbyder sammenlignelige regler hos de fleste danske casinoer.
      </>
    ),
  },
  {
    question: "Er Spanish 21 bedre end Double Exposure Blackjack?",
    answer: (
      <>
        Ja, matematisk er Spanish 21 typisk fordelagtigere. Spanish 21 har ca. 0,38-0,76 % house edge med optimal strategi, mens <Link to="/casinospil/blackjack/double-exposure-blackjack" className={linkClass}>Double Exposure</Link> ligger på ca. 0,69 %. Derudover tilbyder Spanish 21 bonusudbetalinger, der øger underholdningsværdien. De to varianter appellerer dog til forskellige spillertyper: Double Exposure giver fuld information (begge dealerkort synlige), mens Spanish 21 giver fleksibilitet og bonus-potentiale.
      </>
    ),
  },
  {
    question: "Hvad er Super Bonus i Spanish 21?",
    answer:
      "Super Bonus aktiveres, når du får 7-7-7 suited (samme kulør) mod en dealer med åbent 7-kort. Udbetalingen er typisk 1.000 kr. for indsatser under 250 kr. og 5.000 kr. for indsatser på 250 kr.+. Alle andre spillere ved bordet modtager desuden en 'envy bonus' på 50-250 kr. Sandsynligheden er ca. 1 ud af 549.000 hænder – ekstremt sjælden, men dramatisk når den rammer.",
  },
  {
    question: "Hvad er forskellen mellem Spanish 21 og Pontoon?",
    answer:
      "Pontoon er den australske variant af Spanish 21 med næsten identiske regler. De vigtigste forskelle er terminologi (Hit→Twist, Stand→Stick), at begge dealerkort er skjulte i Pontoon, og at Pontoon har Five Card Charlie (5 kort ≤21 vinder automatisk) i stedet for Spanish 21's Super Bonus. House edge er marginalt lavere i Pontoon (0,36-0,65 %).",
  },
];

const Spanish21Guide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Spanish 21 Blackjack 2026 – Komplet Guide: Regler, Strategi, Matematik & House Edge",
    description: "Dybdegående Spanish 21-guide: De manglende 10'ere, bonusudbetalinger, Double Down Rescue, optimal strategi-tabel, matematisk analyse og sammenligning med klassisk blackjack.",
    url: `${SITE_URL}/casinospil/blackjack/spanish-21`,
    datePublished: "2026-04-04",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Spanish 21 Blackjack 2026 – Regler, Strategi, Matematik & House Edge"
        description="Spanish 21 guide: De manglende 10'ere, bonusudbetalinger, Double Down Rescue, optimal strategi og matematisk analyse. Alt du skal vide som dansk spiller."
        type="article"
        datePublished="2026-04-04"
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <MenuIcon iconName="sparkles" className="mr-1.5 h-3.5 w-3.5" /> Bonusudbetaling-variant
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Spanish 21 Blackjack – Den Komplette Guide til Regler, Strategi og Matematik
            </h1>
            <p className="text-lg text-white/80">
              Spanish 21 fjerner alle 10-værdikort og kompenserer med bonusregler, der fundamentalt ændrer optimal strategi. Vi dekonstruerer matematikken bag de manglende kort, analyserer hver specialregel og giver dig den strategi, der minimerer house edge.
            </p>
          </div>
        </div>
      </section>

      <ContentPageLayout>
        <AuthorMetaBar author="jonas" readTime="48 Min." />

        <SnippetAnswer answer="Spanish 21 fjerner alle 16 ti-kort fra kortspillet (48 kort per dæk i stedet for 52) og kompenserer med bonusudbetalinger for 6-7-8, 7-7-7 og multi-kort 21, samt spillervenlige regler som late surrender, Double Down Rescue og 'spiller-21 vinder altid.' House edge ligger på 0,38-0,76 % med optimal strategi afhængigt af S17/H17-regler. Strategien afviger markant fra standard basic strategy." />

        {/* ═══════════════ INDLEDNING ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
            <MenuIcon iconName="book-open" className="h-5 w-5 text-primary" /> Hvad er Spanish 21, og hvorfor er det ikke bare blackjack uden 10'ere?
          </h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Spanish 21 er en af de mest misforståede blackjack-varianter i casino-verdenen. Ved første øjekast virker konceptet simpelt – og negativt: fjern alle 16 ti-værdikort (10♠, 10♥, 10♦, 10♣ fra hvert dæk), og du har et spil der favoriserer dealeren. Men Spanish 21 er langt mere end en amputeret kortbunke. Det er et gennemtænkt redesign af <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>, der kompenserer for de manglende kort med en suite af spillervenlige regler, der tilsammen skaber en house edge, der kan matche – og i nogle tilfælde slå – standard blackjack.
          </p>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Spillet blev udviklet af Masque Publishing i 1995 og hurtigt adopteret af casinoer i Las Vegas, Reno og Atlantic City. Det bruger en 48-korts "Spanish deck" (kortspil uden 10'ere, men med knægte, damer og konger – alle med værdi 10), typisk med 6 eller 8 dæk. Denne tilsyneladende lille ændring – 16 færre kort per dæk – har enorme konsekvenser for sandsynlighedsfordelingen og kræver en fuldstændig omskrivning af <Link to="/casinospil/blackjack/skema" className={linkClass}>basic strategy-skemaet</Link>.
          </p>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Kompensationen for de manglende kort kommer i form af regler, der ville være utænkelige i standard blackjack: spillerens 21 slår altid dealerens 21. Late surrender er tilgængeligt efter enhver antal kort. Du kan fordoble på ethvert antal kort (ikke kun to). Og der er bonusudbetalinger for specifikke kortkombinatorer – 6-7-8, 7-7-7, og 5+ kort der summerer til 21 – der kan betale helt op til 50:1.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            I denne guide dissekerer vi Spanish 21 med den præcision, spillet fortjener. Vi gennemgår hver eneste regel, analyserer matematikken bag de manglende kort, præsenterer den optimale strategi, og sammenligner med <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link>, <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>europæisk blackjack</Link> og <Link to="/casinospil/blackjack/double-exposure-blackjack" className={linkClass}>Double Exposure</Link>. Vores mål er at give dig den dybeste forståelse af varianten, du finder på dansk.
          </p>
        </section>

        <ReviewScreenshot
          src={liveBlackjackLobby}
          alt="Live blackjack-lobby med Multihand Blackjack, Speed Blackjack og Blackjack VIP-borde – typisk udvalg hos dansk licenseret online casino"
          caption="Live blackjack-lobby med filtrering efter udbyder og bordtype – Spanish 21 findes typisk under RNG-bordspil, mens live-lobbyen tilbyder standard blackjack-varianter"
          size="full"
          eager
        />

        {/* ═══════════════ DE MANGLENDE 10'ERE ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
            <MenuIcon iconName="calculator" className="h-5 w-5 text-primary" /> Matematikken bag de manglende 10'ere
          </h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            For at forstå Spanish 21 skal du først forstå, præcis hvordan fjernelsen af 10-værdikort påvirker spillet. I et standard 52-korts dæk er der 16 kort med værdi 10 (fire 10'ere, fire knægte, fire damer, fire konger). Spanish 21 fjerner kun de fire 10'ere – knægte, damer og konger forbliver. Det reducerer antallet af 10-værdikort fra 16 til 12 per dæk, og det samlede antal kort fra 52 til 48.
          </p>

          <Card className="mb-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Sandsynlighedsfordeling: Standard vs. Spanish Deck</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-2 px-3 font-semibold">Kortværdi</th>
                      <th className="text-right py-2 px-3 font-semibold">Standard (52 kort)</th>
                      <th className="text-right py-2 px-3 font-semibold">Spanish (48 kort)</th>
                      <th className="text-right py-2 px-3 font-semibold">Ændring</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Esser (1/11)</td><td className="text-right px-3">4/52 = 7,69 %</td><td className="text-right px-3">4/48 = 8,33 %</td><td className="text-right px-3 text-primary">+0,64 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">2-9</td><td className="text-right px-3">4/52 = 7,69 % (hver)</td><td className="text-right px-3">4/48 = 8,33 % (hver)</td><td className="text-right px-3 text-primary">+0,64 %</td></tr>
                    <tr className="border-b border-border/50 bg-destructive/5"><td className="py-2 px-3 font-medium text-foreground">10-værdikort</td><td className="text-right px-3">16/52 = 30,77 %</td><td className="text-right px-3 text-destructive font-semibold">12/48 = 25,00 %</td><td className="text-right px-3 text-destructive font-bold">-5,77 %</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 leading-relaxed text-muted-foreground">
            Reduktionen i 10-værdikort fra 30,77 % til 25,00 % har fire primære konsekvenser, der alle favoriserer dealeren:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-destructive/20">
              <CardContent className="pt-4">
                <p className="text-sm font-semibold text-foreground mb-2">📉 Færre naturlige blackjacks</p>
                <p className="text-sm text-muted-foreground">
                  Sandsynligheden for blackjack (es + 10-værdi) falder fra ca. 4,83 % til 3,85 % per hånd. Over 200 hænder er det 2 færre blackjacks – en direkte indkomstreduktion for spilleren, da blackjack betaler 3:2.
                </p>
              </CardContent>
            </Card>
            <Card className="border-destructive/20">
              <CardContent className="pt-4">
                <p className="text-sm font-semibold text-foreground mb-2">📉 Svagere fordoblinger</p>
                <p className="text-sm text-muted-foreground">
                  Fordoblinger på 9, 10 og 11 er mindre værdifulde, fordi sandsynligheden for at trække et 10-værdikort er 5,77 procentpoint lavere. En fordobling på 11 mod dealer 6 giver f.eks. en forventet værdi på +0,56 i Spanish 21 vs. +0,67 i standard blackjack.
                </p>
              </CardContent>
            </Card>
            <Card className="border-destructive/20">
              <CardContent className="pt-4">
                <p className="text-sm font-semibold text-foreground mb-2">📉 Dealer buster sjældnere</p>
                <p className="text-sm text-muted-foreground">
                  Dealeren med et svagt upcard (4, 5, 6) buster mindre hyppigt, fordi der er færre 10-værdikort til at skubbe totalen over 21. Dealer bust-raten falder fra ca. 42 % (standard) til ca. 38 % – en markant forskel der direkte reducerer spillerens vinderrate.
                </p>
              </CardContent>
            </Card>
            <Card className="border-destructive/20">
              <CardContent className="pt-4">
                <p className="text-sm font-semibold text-foreground mb-2">📉 Svagere splits</p>
                <p className="text-sm text-muted-foreground">
                  Splits på par af 10-kort (knægte, damer, konger) og esser er mindre profitable. Split-esser modtager sjældnere en 10-værdi, og dobbelt-ned efter split er mindre effektivt. Den samlede effekt: splits genererer ca. 8-12 % mindre profit end i standard blackjack.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 leading-relaxed text-muted-foreground">
            Den samlede effekt af de manglende 10'ere er en stigning i house edge på ca. 2,0-2,5 procentpoint sammenlignet med identiske regler i standard blackjack. Det er denne gap, som Spanish 21's bonusregler skal udfylde – og som vi vil demonstrere, gør de det næsten fuldstændigt.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            En vigtig nuance: selvom der er færre 10-værdikort, er fordelingen af lave kort (2-6) og mellemkort (7-9) proportionelt øget. Det betyder, at multi-kort hænder (5, 6, 7 kort der summerer til 21) er mere sandsynlige i Spanish 21 end i standard blackjack – og det er præcis disse hænder, der bonusreglerne belønner. Designet er altså ikke tilfældigt: de manglende kort skaber de situationer, som bonusreglerne kompenserer for.
          </p>
        </section>

        {/* ═══════════════ KOMPLET REGELSÆT ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
            <MenuIcon iconName="list-ordered" className="h-5 w-5 text-primary" /> Spanish 21: Det komplette regelsæt
          </h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Spanish 21's regelsæt er væsentligt mere omfattende end standard blackjack. Her er samtlige regler, opdelt i kategorier, med forklaring af den strategiske implikation af hver:
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3">Grundregler (identiske med standard blackjack)</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-6">
            <li>Målet er at komme tættere på 21 end dealeren uden at buste (overstige 21)</li>
            <li>Esser tæller 1 eller 11, billedkort (J, Q, K) tæller 10, nummerkort tæller pålydende</li>
            <li>Blackjack (es + billedkort) betaler 3:2</li>
            <li>Dealeren trækker ifølge faste regler (S17 eller H17, afhænger af bordet)</li>
            <li>Insurance tilbydes ved dealer-es (betaler 2:1)</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-3">Spanish 21 specialregler (spillervenlige)</h3>

          <div className="space-y-4 mb-6">
            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">🏆 Spiller-21 vinder altid</h4>
                <p className="text-sm text-muted-foreground">
                  Spillerens 21 slår altid dealerens 21 – inklusive dealerens blackjack (med undtagelse af spiller-blackjack vs. dealer-blackjack, som er push). Denne regel eliminerer den frustrerende "push på 21"-situation og er værd ca. 0,30 procentpoint i reduceret house edge. I standard blackjack mister du ca. 8 % af dine 21-hænder til dealer-21; i Spanish 21 vinder du dem alle.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">🔄 Late Surrender (efter enhver antal kort)</h4>
                <p className="text-sm text-muted-foreground">
                  Du kan surrender (opgive) din hånd og få halvdelen af indsatsen tilbage – ikke kun efter de første to kort, men efter ethvert antal kort, så længe du ikke har bustet. I standard blackjack er late surrender (når det tilbydes) kun tilgængeligt efter de første to kort. Denne udvidede surrender er værd ca. 0,08 procentpoint og er særligt værdifuld med hårde totaler på 15-16 mod dealer 9, 10 eller es.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">✖️ Fordobling på ethvert antal kort</h4>
                <p className="text-sm text-muted-foreground">
                  I standard blackjack kan du kun fordoble (double down) på dine første to kort. I Spanish 21 kan du fordoble efter 2, 3, 4 eller flere kort. Har du trukket 3-4-4 (total 11)? Du kan fordoble. Denne regel er værd ca. 0,16 procentpoint og skaber multi-kort fordoblings-situationer, der aldrig opstår i standard blackjack.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">🛡️ Double Down Rescue</h4>
                <p className="text-sm text-muted-foreground">
                  Efter en fordobling – hvis du får et dårligt tredje kort – kan du "rescue" (opgive) og miste kun den originale indsats. Din fordoblede del returneres. Denne regel er unik for Spanish 21 og værd ca. 0,07 procentpoint. Den gør aggressive fordoblinger (f.eks. total 9 mod dealer 6) mere attraktive, fordi worst-case-tabet halveres. Strategisk skaber det en ny decision-point: efter fordobling, vurder om rescue er korrekt baseret på din nye total vs. dealerens upcard.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">♠️ Re-split esser (RSA)</h4>
                <p className="text-sm text-muted-foreground">
                  I de fleste standard blackjack-spil kan du kun splitte esser én gang og modtager kun ét kort per splittet es. I Spanish 21 kan du re-splitte esser op til 4 hænder, og du kan trække flere kort til hver. Denne regel er værd ca. 0,08 procentpoint og er særligt værdifuld i multi-dæk spil, hvor sandsynligheden for at modtage endnu en es er højere.
                </p>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3">Bonusudbetalinger</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spanish 21's bonusudbetalinger er det element, der giver spillet sin unikke karakter. De kompenserer for ca. 0,72 procentpoint af den øgede house edge fra de manglende 10'ere:
          </p>

          <Card className="mb-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Spanish 21 Bonusudbetalinger</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-2 px-3 font-semibold">Hånd</th>
                      <th className="text-right py-2 px-3 font-semibold">Udbetaling</th>
                      <th className="text-right py-2 px-3 font-semibold">Ca. sandsynlighed</th>
                      <th className="text-right py-2 px-3 font-semibold">EV-bidrag</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3">5-kort 21</td><td className="text-right px-3 text-primary font-semibold">3:2</td><td className="text-right px-3">ca. 3,5 %</td><td className="text-right px-3 text-primary">+0,31 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">6-kort 21</td><td className="text-right px-3 text-primary font-semibold">2:1</td><td className="text-right px-3">ca. 0,9 %</td><td className="text-right px-3 text-primary">+0,16 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">7+-kort 21</td><td className="text-right px-3 text-primary font-semibold">3:1</td><td className="text-right px-3">ca. 0,2 %</td><td className="text-right px-3 text-primary">+0,09 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">6-7-8 mixed</td><td className="text-right px-3 text-primary font-semibold">3:2</td><td className="text-right px-3">ca. 0,6 %</td><td className="text-right px-3 text-primary">+0,07 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">6-7-8 suited</td><td className="text-right px-3 text-primary font-semibold">2:1</td><td className="text-right px-3">ca. 0,15 %</td><td className="text-right px-3 text-primary">+0,04 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">6-7-8 spades</td><td className="text-right px-3 text-primary font-semibold">3:1</td><td className="text-right px-3">ca. 0,04 %</td><td className="text-right px-3 text-primary">+0,02 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">7-7-7 mixed</td><td className="text-right px-3 text-primary font-semibold">3:2</td><td className="text-right px-3">ca. 0,2 %</td><td className="text-right px-3 text-primary">+0,02 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">7-7-7 suited</td><td className="text-right px-3 text-primary font-semibold">2:1</td><td className="text-right px-3">ca. 0,05 %</td><td className="text-right px-3 text-primary">+0,01 %</td></tr>
                    <tr className="border-b border-border/50 bg-primary/5"><td className="py-2 px-3 font-medium text-foreground">7-7-7 suited vs. dealer 7</td><td className="text-right px-3 text-primary font-bold">Super Bonus!</td><td className="text-right px-3">ca. 1:549.000</td><td className="text-right px-3 text-primary">+0,004 %</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="leading-relaxed text-muted-foreground">
            Samlet bidrager bonusudbetalingerne med ca. 0,72 procentpoint i reduceret house edge. Bemærk, at størstedelen kommer fra de relativt hyppige 5-kort og 6-kort 21-hænder, ikke fra de sjældne 7-7-7-kombinationer. Det betyder, at bonusudbetalingerne har en reel, mærkbar effekt på din session – du vil typisk ramme mindst én 5-kort 21 per 25-30 hænder.
          </p>
        </section>

        <ReviewScreenshot
          src={liveBlackjackDealerBust}
          alt="Live Blackjack A-bord med dealer bust på 22 – 7-6-2-7 dealerhånd, flere spillere med gevinster og indsatser fra 50 til 25.000 kr."
          caption="Live Blackjack A med dealer bust på 22 – i Spanish 21 ville spillerens 21 altid vinde, uanset om dealeren også rammer 21"
          size="full"
        />

        {/* ═══════════════ HOUSE EDGE DEKONSTRUKTION ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
            <MenuIcon iconName="trending-up" className="h-5 w-5 text-primary" /> House Edge dekonstruktion: Hvad koster de manglende kort – og hvad giver reglerne tilbage?
          </h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            For at forstå Spanish 21's samlede house edge skal vi præcist kvantificere, hvad de manglende 10'ere koster, og hvad hver bonusregel giver tilbage. Her er den komplette dekonstruktion, baseret på kombinatorisk analyse med 6 dæk:
          </p>

          <Card className="mb-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">House Edge Dekonstruktion – Spanish 21 (6 dæk, S17)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-2 px-3 font-semibold">Element</th>
                      <th className="text-right py-2 px-3 font-semibold">Effekt på HE</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50 bg-destructive/5"><td className="py-2 px-3 font-medium text-foreground">Fjernelse af 10'ere (48-kort dæk)</td><td className="text-right px-3 text-destructive font-bold">+2,40 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Spiller-21 vinder altid</td><td className="text-right px-3 text-primary">-0,30 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Bonusudbetalinger (samlet)</td><td className="text-right px-3 text-primary">-0,72 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Late surrender (udvidet)</td><td className="text-right px-3 text-primary">-0,08 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Fordobling efter split</td><td className="text-right px-3 text-primary">-0,14 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Fordobling på ethvert antal kort</td><td className="text-right px-3 text-primary">-0,16 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Re-split esser</td><td className="text-right px-3 text-primary">-0,08 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Double Down Rescue</td><td className="text-right px-3 text-primary">-0,07 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Hit splittede esser</td><td className="text-right px-3 text-primary">-0,19 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Re-double</td><td className="text-right px-3 text-primary">-0,26 %</td></tr>
                    <tr className="border-b border-border bg-muted/50"><td className="py-2 px-3 font-bold text-foreground">Samlet House Edge (S17)</td><td className="text-right px-3 font-bold text-foreground">≈ 0,40 %</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 leading-relaxed text-muted-foreground">
            Regnestykket er elegant: de manglende kort koster +2,40 %, og bonusreglerne giver ca. -2,00 % tilbage. Nettoresultatet er en house edge på ca. 0,40 % med S17-regler – det er lavere end de fleste standard blackjack-borde i Danmark, hvor reglerne sjældent er helt optimale (mange borde bruger H17, ingen surrender, begrænset split).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardContent className="pt-4 text-center">
                <p className="text-sm font-semibold text-foreground">S17-regler (Dealer Stands Soft 17)</p>
                <p className="text-3xl font-bold text-primary">0,40 %</p>
                <p className="text-xs text-muted-foreground mt-1">Optimal – søg altid dette</p>
              </CardContent>
            </Card>
            <Card className="border-destructive/20">
              <CardContent className="pt-4 text-center">
                <p className="text-sm font-semibold text-foreground">H17-regler (Dealer Hits Soft 17)</p>
                <p className="text-3xl font-bold text-destructive">0,76 %</p>
                <p className="text-xs text-muted-foreground mt-1">Undgå hvis muligt – næsten dobbelt</p>
              </CardContent>
            </Card>
          </div>

          <p className="leading-relaxed text-muted-foreground">
            Forskellen mellem S17 og H17 er 0,36 procentpoint – mere end dobbelt så stor som i standard blackjack (0,18-0,22 procentpoint). Det skyldes, at dealerens soft 17-hit er mere skadelig for spilleren, når der er færre 10-værdikort i bunken, fordi dealeren sjældnere buster og oftere forbedrer sin hånd. Denne forskel gør bordvalget ekstra vigtigt i Spanish 21.
          </p>
        </section>

        {/* ═══════════════ STRATEGI-ÆNDRINGER ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
            <MenuIcon iconName="target" className="h-5 w-5 text-primary" /> Strategiændringer: Hvor Spanish 21 afviger fra standard basic strategy
          </h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Den vigtigste advarsel for Spanish 21-spillere: brug ALDRIG standard <Link to="/casinospil/blackjack/skema" className={linkClass}>basic strategy-skemaet</Link> i Spanish 21. De manglende 10'ere og bonusreglerne ændrer den optimale beslutning i hundredvis af situationer. Her er de vigtigste afvigelser:
          </p>

          <div className="space-y-4 mb-6">
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">1. Mere aggressiv hitting</h4>
                <p className="text-sm text-muted-foreground">
                  Fordi der er færre 10-værdikort, er sandsynligheden for bust ved hit lavere. Du bør hitte hårde totaler som 12-16 hyppigere mod dealerens 2-6, hvor standard strategi siger stand. Specifikt: hit på hård 12 mod dealer 4 (standard: stand), hit på hård 12 mod dealer 5 (standard: stand i visse konfigurationer), og hit på hård 13 mod dealer 2-3 i flere situationer.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">2. Forsigtigere fordobling</h4>
                <p className="text-sm text-muted-foreground">
                  Fordoblinger er generelt mindre rentable pga. den lavere sandsynlighed for at trække 10-værdikort. Standard blackjack siger double on 11 mod alle dealer-upcards undtagen es – i Spanish 21 bør du kun fordoble 11 mod dealer 2-8 (hit mod 9, 10, es). Tilsvarende er fordobling på 10 begrænset til dealer 2-7, og fordobling på 9 er sjældent korrekt (kun mod dealer 6 i S17).
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">3. Multi-kort fordobling</h4>
                <p className="text-sm text-muted-foreground">
                  Spanish 21's unikke multi-kort fordobling skaber helt nye beslutningspunkter. Eksempler: 3-4-4 (total 11) bør fordobles mod dealer 2-8 – en situation der aldrig opstår i standard blackjack. 2-3-6 (total 11) bør ligeledes fordobles. Disse multi-kort fordoblinger kompenserer delvist for de svagere to-kort fordoblinger og er en væsentlig del af optimal Spanish 21-strategi.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">4. Double Down Rescue-strategi</h4>
                <p className="text-sm text-muted-foreground">
                  Når du har fordoblet og fået et dårligt tredje kort, skal du evaluere rescue-muligheden. Generel regel: rescue når din nye total er 12-16 mod dealer 8-es. Undtagelser: hold (don't rescue) med total 17+ altid, og hold med total 12-16 mod dealer 2-6 (dealeren buster sandsynligvis). DDR gør det muligt at fordoble mere aggressivt, fordi du har et sikkerhedsnet.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">5. Bonusbevidst spil</h4>
                <p className="text-sm text-muted-foreground">
                  I sjældne situationer bør du afvige fra "normal" optimal strategi for at jage bonusudbetalinger. Eksempel: med 6-7 (total 13) mod dealer 7, bør du hitte (standard strategi ville sige det samme, men motivationen er anderledes: du jager 6-7-8 bonussen). Med 7-7 (total 14) mod dealer 7, bør du aldrig splitte – hold parret intakt for at jage 7-7-7-bonussen. Denne bonus-orienterede strategi ændrer ca. 3-5 beslutninger per 100 hænder.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Nøgle-afvigelser: Spanish 21 vs. Standard Basic Strategy (S17, 6 dæk)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-2 px-3 font-semibold">Spillerens hånd</th>
                      <th className="text-center py-2 px-3 font-semibold">Dealer upcard</th>
                      <th className="text-center py-2 px-3 font-semibold">Standard BJ</th>
                      <th className="text-center py-2 px-3 font-semibold">Spanish 21</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Hård 11</td><td className="text-center px-3">9</td><td className="text-center px-3 font-semibold">Double</td><td className="text-center px-3 text-primary font-semibold">Hit</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Hård 11</td><td className="text-center px-3">10</td><td className="text-center px-3 font-semibold">Double</td><td className="text-center px-3 text-primary font-semibold">Hit</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Hård 10</td><td className="text-center px-3">8</td><td className="text-center px-3 font-semibold">Double</td><td className="text-center px-3 text-primary font-semibold">Hit</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Hård 10</td><td className="text-center px-3">9</td><td className="text-center px-3 font-semibold">Double</td><td className="text-center px-3 text-primary font-semibold">Hit</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Par 7-7</td><td className="text-center px-3">7</td><td className="text-center px-3 font-semibold">Split</td><td className="text-center px-3 text-primary font-semibold">Stand*</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Soft 18 (A-7)</td><td className="text-center px-3">3</td><td className="text-center px-3 font-semibold">Double</td><td className="text-center px-3 text-primary font-semibold">Stand</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3">Soft 17 (A-6)</td><td className="text-center px-3">2</td><td className="text-center px-3 font-semibold">Hit</td><td className="text-center px-3 text-primary font-semibold">Hit</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-2">* Stand for at beholde 7-7 og jage 7-7-7-bonussen. Split er korrekt i standard blackjack.</p>
            </CardContent>
          </Card>

          <p className="leading-relaxed text-muted-foreground">
            Den samlede effekt af at bruge standard blackjack-strategi i Spanish 21 er en stigning i house edge på ca. 1,0-1,5 procentpoint. Det transformerer et spil med 0,40 % house edge til et med 1,5-2,0 % – dyrere end de fleste casinospil. Investér tid i at lære den korrekte Spanish 21-strategi; det er den vigtigste beslutning du kan tage.
          </p>
        </section>

        <ReviewScreenshot
          src={spanish21StrategyChart}
          alt="Spanish 21 basic strategy-skema for Dealer Stands on Soft 17 – farvekodede beslutninger for hårde totaler, bløde hænder og par med Double Down Rescue-regler"
          caption="Komplet Spanish 21 basic strategy-skema (S17) – bemærk de markante forskelle fra standard blackjack: færre fordoblinger, hyppigere hits og bonus-bevidste par-beslutninger"
          size="medium"
        />

        {/* ═══════════════ SPANISH 21 vs PONTOON ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
            <MenuIcon iconName="scale" className="h-5 w-5 text-primary" /> Spanish 21 vs. Pontoon – Samme spil, forskellige regler
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Pontoon er den australske version af Spanish 21, og de to varianter deler den fundamentale mekanik – 48-korts dæk, bonusudbetalinger og spillervenlige specialregler. Men der er væsentlige forskelle, der påvirker både strategi og house edge:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Spanish 21 (Nordamerika)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Terminologi: Hit, Stand, Double, Split</li>
                  <li>• 6-8 decks typisk</li>
                  <li>• Super Bonus for 7-7-7 suited vs. dealer 7</li>
                  <li>• Double Down Rescue tilgængelig</li>
                  <li>• Dealerens ét kort synligt (standard hole card)</li>
                  <li>• House edge: <strong className="text-primary">0,38-0,76 %</strong></li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pontoon (Australien/UK)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Terminologi: Twist (Hit), Stick (Stand), Buy (Double)</li>
                  <li>• 8 decks typisk</li>
                  <li>• Five Card Charlie (5-kort ≤21 vinder automatisk)</li>
                  <li>• Ingen Double Down Rescue</li>
                  <li>• Begge dealerkort skjulte – væsentlig strategisk ændring</li>
                  <li>• House edge: <strong className="text-primary">0,36-0,65 %</strong></li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den mest markante forskel er, at Pontoon skjuler begge dealerkort. Det eliminerer al information om dealerens hånd og gør Pontoon til en hybrid mellem <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>europæisk blackjack</Link> (no hole card) og Spanish 21's bonusregler. Strategisk er Pontoon mere udfordrende, fordi du ikke kan basere beslutninger på dealerens upcard – du spiller "i blinde" mod en ukendt hånd.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Five Card Charlie i Pontoon (5 kort ≤21 vinder automatisk, uanset dealerens total) erstatter effektivt Spanish 21's Super Bonus som den sjældne "jackpot-hånd." Strategisk betyder det, at du i Pontoon bør trække mere aggressivt med 4-kort hænder under 21 for at jage Five Card Charlie – en beslutning der aldrig er relevant i Spanish 21. Hvis du har valget mellem de to, er begge fremragende; Pontoon har marginalt lavere house edge, men Spanish 21's Double Down Rescue giver mere taktisk dybde.
          </p>
        </section>

        {/* ═══════════════ SAMMENLIGNING MED ANDRE VARIANTER ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
            <MenuIcon iconName="bar-chart3" className="h-5 w-5 text-primary" /> Spanish 21 vs. andre blackjack-varianter: Komplet sammenligning
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at placere Spanish 21 i det bredere blackjack-landskab sammenligner vi den med de fire mest populære varianter tilgængelige hos danske licenserede casinoer. Alle house edge-tal forudsætter optimal strategi:
          </p>

          <Card className="mb-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Blackjack-varianter: House Edge, Varians & Kompleksitet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-2 px-3 font-semibold">Variant</th>
                      <th className="text-right py-2 px-3 font-semibold">House Edge</th>
                      <th className="text-right py-2 px-3 font-semibold">Std. afvigelse</th>
                      <th className="text-center py-2 px-3 font-semibold">Kompleksitet</th>
                      <th className="text-center py-2 px-3 font-semibold">Bonus-payouts</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50 bg-primary/5">
                      <td className="py-2 px-3 font-medium text-foreground"><Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>Amerikansk (S17)</Link></td>
                      <td className="text-right px-3 text-primary font-bold">0,35 %</td>
                      <td className="text-right px-3">1,14</td>
                      <td className="text-center px-3">Lav</td>
                      <td className="text-center px-3">Nej</td>
                    </tr>
                    <tr className="border-b border-border/50 bg-primary/5">
                      <td className="py-2 px-3 font-medium text-foreground">Spanish 21 (S17)</td>
                      <td className="text-right px-3 text-primary font-bold">0,40 %</td>
                      <td className="text-right px-3">1,22</td>
                      <td className="text-center px-3 text-destructive font-semibold">Høj</td>
                      <td className="text-center px-3 text-primary font-semibold">Ja</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-3 font-medium text-foreground"><Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>Europæisk (ENHC)</Link></td>
                      <td className="text-right px-3">0,62 %</td>
                      <td className="text-right px-3">1,15</td>
                      <td className="text-center px-3">Medium</td>
                      <td className="text-center px-3">Nej</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-3 font-medium text-foreground"><Link to="/casinospil/blackjack/double-exposure-blackjack" className={linkClass}>Double Exposure</Link></td>
                      <td className="text-right px-3">0,69 %</td>
                      <td className="text-right px-3">1,08</td>
                      <td className="text-center px-3">Medium</td>
                      <td className="text-center px-3">Nej</td>
                    </tr>
                    <tr className="border-b border-border/50 bg-destructive/5">
                      <td className="py-2 px-3 font-medium text-foreground">Spanish 21 (H17)</td>
                      <td className="text-right px-3 text-destructive">0,76 %</td>
                      <td className="text-right px-3">1,22</td>
                      <td className="text-center px-3 text-destructive font-semibold">Høj</td>
                      <td className="text-center px-3 text-primary font-semibold">Ja</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tabellen afslører en vigtig pointe: Spanish 21 med S17-regler er kun 0,05 procentpoint dyrere end optimal <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link> – en forskel der er praktisk umærkelig. Over 200 hænder á 100 kr. er det en forskel på blot 10 kr. i forventet tab. Til gengæld får du bonusudbetalinger, der tilfører underholdningsværdi og variansbaserede "jackpot-momenter."
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Spanish 21 med H17 er derimod dyrere end alle andre varianter undtagen de dårligste standard blackjack-borde. Hvis du kun kan finde H17-Spanish 21, overvej i stedet standard europæisk eller amerikansk blackjack – de har lavere house edge med langt simplere strategikrav. Reglen er klar: Spanish 21 er et fremragende spil med S17, men et middelmådigt spil med H17.
          </p>
        </section>

        <ReviewScreenshot
          src={liveBlackjackSkaermnavn}
          alt="Skærmnavn-dialog ved live blackjack-bord – spilleren vælger brugernavn 'Casinoaftaler' før deltagelse i live-sessionen"
          caption="Skærmnavns-dialog inden live blackjack – online casinoer kræver et alias for at beskytte spillerens identitet ved bordet"
          size="compact"
        />

        {/* ═══════════════ BANKROLL OG VARIANS ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
            <MenuIcon iconName="wallet" className="h-5 w-5 text-primary" /> Bankroll, varians og session-planlægning
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spanish 21's standardafvigelse per hånd er ca. 1,22 × indsatsen – ca. 7 % højere end standard blackjack (1,14). Denne øgede varians skyldes bonusudbetalingerne (3:2, 2:1, 3:1) og den hyppigere forekomst af multi-kort hænder. Det har direkte konsekvenser for din bankroll-planlægning:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardContent className="pt-4 text-center">
                <p className="text-sm font-semibold text-foreground">Anbefalet bankroll</p>
                <p className="text-3xl font-bold text-primary">120-150×</p>
                <p className="text-xs text-muted-foreground mt-1">enheder (vs. 100× for standard BJ)</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4 text-center">
                <p className="text-sm font-semibold text-foreground">Sandsynlighed for profit</p>
                <p className="text-3xl font-bold text-foreground">46 %</p>
                <p className="text-xs text-muted-foreground mt-1">per 200-hånds session (S17)</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4 text-center">
                <p className="text-sm font-semibold text-foreground">Forventet tab</p>
                <p className="text-3xl font-bold text-destructive">80 kr.</p>
                <p className="text-xs text-muted-foreground mt-1">per 200 hænder á 100 kr. (S17)</p>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Session-simulering (S17, 200 hænder, 100 kr. indsats):</strong> Forventet tab: 80 kr. 68 % konfidensinterval: -2.520 kr. til +2.360 kr. 95 % konfidensinterval: -4.960 kr. til +4.800 kr. Den brede distribution afspejler den høje varians – du vil opleve sessioner med store tab og sessioner med store gevinster. Nøglen er tilstrækkelig bankroll til at overleve downswings.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Bonusudbetalings-effekten:</strong> Ca. 1 ud af 25 sessioner (200 hænder) vil indeholde mindst én 5+-kort 21 eller 6-7-8-bonus. Disse sessioner kan løfte resultatet med 500-2.000 kr. – nok til at vende en tabende session. Ca. 1 ud af 100 sessioner inkluderer en suited 6-7-8 eller 7-7-7-bonus (2:1 eller 3:1 udbetaling). Og ca. 1 ud af 2.750 sessioner inkluderer Super Bonus (7-7-7 suited vs. dealer 7) – den ultimative jackpot.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Denne "lotteri-effekt" er en del af Spanish 21's designfilosofi: grundspillet er marginalt dyrere end optimal standard blackjack, men potentialet for store enkeltubetalinger er højere. Det tiltrækker spillere der nyder variabilitet og "big hit"-momenter – selvom den langsigtede forventede værdi er identisk med ethvert andet spil med tilsvarende house edge.
          </p>
        </section>

        {/* ═══════════════ PSYKOLOGISK ANALYSE ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
            <MenuIcon iconName="brain" className="h-5 w-5 text-primary" /> Spilpsykologisk analyse: Hvad Spanish 21 gør ved din beslutningsproces
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spanish 21 er psykologisk mere krævende end standard blackjack, og det har konsekvenser for din faktiske (ikke-teoretiske) house edge. Her er de vigtigste psykologiske fælder:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">🧠 Strategisk overload</h4>
                <p className="text-sm text-muted-foreground">
                  Spanish 21 har mindst 50 % flere beslutningspunkter per hånd end standard blackjack (multi-kort fordobling, DDR, bonusjagt). Kognitiv belastning fører til beslutningstræthed – og træthed fører til fejl. Vores anbefaling: tag en pause hvert 30. minut, og spil ikke mere end 2 timer i træk. En enkelt fejl kan koste 100+ kr. i EV.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">🎰 Bonus-jagten</h4>
                <p className="text-sm text-muted-foreground">
                  Bonusudbetalingerne kan skabe en "næsten-gevinst"-mentalitet: "Jeg har haft tre 6-7'ere – den næste må give 8!" Denne tankegang er en klassisk Gambler's Fallacy og bør modstås. Bonusser er tilfældige events – deres sandsynlighed ændres ikke baseret på tidligere resultater. Spil efter strategiskemaet, ikke efter bonusjagt.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">💡 DDR-paralysis</h4>
                <p className="text-sm text-muted-foreground">
                  Double Down Rescue tilføjer et ekstra beslutningspunkt, der kan forårsage "analysis paralysis." Spillere bruger ofte for lang tid på at evaluere rescue-muligheden og mister fokus på den overordnede strategi. Løsningen: memorér DDR-tabellen (rescue ved total 12-16 mod 8+, ellers hold). Gør det automatisk.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">🔄 Strategi-forvirring</h4>
                <p className="text-sm text-muted-foreground">
                  Spillere der veksler mellem standard blackjack og Spanish 21 risikerer at blande strategierne – og det koster dyrt. Hit vs. stand-beslutninger der er korrekte i den ene variant er forkerte i den anden. Vores anbefaling: vælg én variant per session, og lad være med at skifte midt i en session. Hjernen har brug for tid til at "tune ind" på den rigtige strategi.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ═══════════════ BONUSOMSÆTNING ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
            <MenuIcon iconName="coins" className="h-5 w-5 text-primary" /> Spanish 21 og bonusomsætning
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Kan Spanish 21 bruges til at omsætte <Link to="/casino-bonus" className={linkClass}>casinobonusser</Link>? Det korte svar: ja, men med forbehold. Blackjack bidrager typisk med 5-10 % til <Link to="/omsaetningskrav" className={linkClass}>omsætningskravet</Link> hos danske casinoer, hvilket gør det til en langsom men potentielt profitable vej – forudsat at bonusudbetalingerne medregnes korrekt.
          </p>

          <Card className="mb-6 bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3">EV-beregning: Bonusomsætning med Spanish 21</h3>
              <div className="font-mono text-sm bg-background p-4 rounded-lg space-y-2">
                <p className="font-bold">Scenario: 1.000 kr. bonus, 10× omsætning, 10 % BJ-bidrag</p>
                <p>Effektiv omsætning: 10.000 / 0,10 = 100.000 kr. faktisk indsats</p>
                <p className="border-t border-border pt-2 mt-2">
                  Spanish 21 (S17): EV = 1.000 − (100.000 × 0,40 %) = 1.000 − 400 = <strong className="text-primary">+600 kr.</strong>
                </p>
                <p>
                  Spanish 21 (H17): EV = 1.000 − (100.000 × 0,76 %) = 1.000 − 760 = <strong className="text-primary">+240 kr.</strong>
                </p>
                <p>
                  Standard BJ (S17): EV = 1.000 − (100.000 × 0,35 %) = 1.000 − 350 = <strong className="text-primary">+650 kr.</strong>
                </p>
              </div>
              <p className="text-muted-foreground text-sm mt-3">
                Spanish 21 er marginalt dyrere end standard blackjack til bonusomsætning, men stadig profitable med positiv EV. Den højere varians kan dog øge risikoen for at miste bankrollen under omsætningen – brug konservativ indsatsstørrelse (1-2 % af total bankroll per hånd).
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ═══════════════ HVOR SPILLER DU ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
            <MenuIcon iconName="map-pin" className="h-5 w-5 text-primary" /> Hvor spiller du Spanish 21 i Danmark?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spanish 21 som specifik variant er primært tilgængeligt som RNG-version (computerstyret) hos danske licenserede casinoer. Live dealer-versioner er sjældne, men standard live blackjack med gode regler er et fremragende alternativ. Her er de bedste muligheder:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Dansk-ejet casino med RNG Spanish Blackjack (Microgaming) og bredt live blackjack-udbud via Evolution. <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>-integration og dansk kundeservice 7 dage om ugen.</p>
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
                <p className="text-sm text-muted-foreground mb-2">Stort spilbibliotek med Microgaming Spanish Blackjack Gold-versionen (forbedret grafik og gameplay). Bredt live blackjack-udbud inkl. Blackjack Party, VIP-borde og Infinite Blackjack.</p>
                <p className="text-sm text-muted-foreground"><strong>Spanish 21:</strong> RNG Gold-version med forbedret UI. Live: standard + Infinite Blackjack.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Stærkt live casino med Speed Blackjack og VIP-borde. Udmærket mobiloplevelse og hurtige <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>-udbetalinger inden for 24 timer.</p>
                <p className="text-sm text-muted-foreground"><strong>Spanish 21:</strong> RNG tilgængelig. Live: standard + Lightning Blackjack + Speed BJ.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Pay N Play med instant registrering via <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>. Speed Blackjack for tempo-fokuserede spillere. Ingen langvarig tilmeldingsproces – spil inden for 30 sekunder.</p>
                <p className="text-sm text-muted-foreground"><strong>Spanish 21:</strong> Begrænset RNG-udbud. Live: standard + Speed Blackjack.</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Alle fire casinoer er licenseret af <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> og bruger <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gamings</Link> platform til live-spil. Sammenlign <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link> og <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> i vores individuelle <Link to="/casino-anmeldelser" className={linkClass}>casino-anmeldelser</Link> for at finde det bedste match til din spillestil.
          </p>
        </section>

        {/* ═══════════════ HISTORISK KONTEKST ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
            <MenuIcon iconName="clock" className="h-5 w-5 text-primary" /> Spanish 21's historie: Fra Las Vegas til online casinoer
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spanish 21 blev udviklet i 1995 af det amerikanske softwarefirma Masque Publishing og licenseret til Four Queens Hotel and Casino i Las Vegas. Konceptet var at skabe en blackjack-variant der tiltalte to grupper: casinoer der ønskede en højere gennemsnitlig house edge end optimal standard blackjack (mange spillere bruger ikke optimal strategi, men bordreglen bestemmer minimum-edge), og spillere der søgte mere action og bonusmuligheder end den stramme standard blackjack-oplevelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spillet blev hurtigt populært i Las Vegas og spredte sig til Atlantic City, Connecticut (Foxwoods, Mohegan Sun) og Canada. Det nåede Australien under navnet "Pontoon" med tilpassede regler (skjulte dealerkort, Five Card Charlie). I Asien blev det populært under navnet "Super Fun 21" – en relateret men ikke identisk variant med yderligere regelændringer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Online-æraen bragte Spanish 21 til et globalt publikum. Microgaming udviklede den første online-version ("Spanish Blackjack" og senere "Spanish Blackjack Gold") i midten af 2000'erne, efterfulgt af andre softwareudbydere. I dag er RNG-versioner tilgængelige hos de fleste store online casinoer, selvom varianten aldrig har nået samme popularitet online som på fysiske casinoer – primært fordi den komplekse strategi er sværere at lære uden den sociale kontekst af et fysisk bord.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I Danmark har Spanish 21 en nichestatus. Det er tilgængeligt som RNG-spil, men de fleste danske spillere foretrækker standard live blackjack via Evolution Gaming. Det er en tabt mulighed: for spillere der investerer tid i at lære den specifikke strategi, tilbyder Spanish 21 en spændende og matematisk konkurrencedygtig alternativ til den mere velkendte standard variant.
          </p>
        </section>

        {/* ═══════════════ KONKLUSION ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
            <MenuIcon iconName="eye" className="h-5 w-5 text-primary" /> Er Spanish 21 den rigtige blackjack-variant for dig?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spanish 21 er en sofistikeret blackjack-variant, der belønner strategisk dybde og straf-for uopmærksomhed. Med optimal strategi og S17-regler er house edge blot 0,40 % – kun marginalt over optimal <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link> og lavere end de fleste standard blackjack-borde med suboptimale regler. Bonusudbetalingerne tilføjer en underholdningsdimension, der gør sessionerne mere varierede og uforudsigelige.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Men Spanish 21 er ikke for alle. Den kræver investering i at lære en ny, mere kompleks strategi – og straffen for at bruge forkert strategi er høj (1-2 procentpoint ekstra house edge). Hvis du ikke er villig til at studere den specifikke Spanish 21-strategi, er du bedre tjent med standard blackjack, hvor fejlmarginerne er mindre.
          </p>
          <ul className="space-y-3 mb-6 ml-4">
            <li className="text-muted-foreground leading-relaxed">
              <strong>Vælg Spanish 21 hvis du:</strong> Har mestret <Link to="/casinospil/blackjack/skema" className={linkClass}>standard basic strategy</Link> og vil have en ny intellektuel udfordring. Nyder bonusgevinster og "jackpot-momenter" (7-7-7, 6-7-8). Er disciplineret nok til at lære og anvende den korrekte Spanish 21-strategi konsekvent. Primært spiller for underholdning og accepterer marginalt højere varians.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Undgå Spanish 21 hvis du:</strong> Optimerer rent for lavest mulig house edge (vælg standard <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link> med S17 i stedet). Er nybegynder og endnu ikke behersker standard basic strategy. Kun kan finde H17-borde (0,76 % edge er suboptimalt). Finder det ubehageligt at spille med et modificeret dæk, der "føles forkert." Har tendens til at blande strategier mellem sessioner.
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Husk: den vigtigste blackjack-beslutning er altid strategisk disciplin. En Spanish 21-spiller med perfekt strategi og 0,40 % house edge præsterer markant bedre end en standard blackjack-spiller med dårlig strategi og 2 % house edge. Lær strategien først – vælg variant bagefter. For den komplette oversigt over alle varianter og strategier, se vores <Link to="/casinospil/blackjack" className={linkClass}>hovedguide til blackjack</Link>. Og konsulter altid vores <Link to="/ansvarligt-spil" className={linkClass}>guide til ansvarligt spil</Link> for at holde dine spilvaner sunde og bæredygtige.
          </p>
        </section>

        <CasinospilMoneyLinks gameName="Spanish 21" currentPath="/casinospil/blackjack/spanish-21" />
        <LatestNewsByCategory pagePath="/casinospil/blackjack/spanish-21" />
        <RelatedGuides currentPath="/casinospil/blackjack/spanish-21" />
        <FAQSection faqs={faqs} />
        <AuthorBio author="jonas" />
      </ContentPageLayout>
      <StickyCtaBySlug slug="betinia" />
    </>
  );
};

export default Spanish21Guide;
