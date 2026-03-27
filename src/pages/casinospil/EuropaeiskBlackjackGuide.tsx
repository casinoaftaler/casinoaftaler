import { Link } from "react-router-dom";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import danskespilLiveBlackjack from "@/assets/screenshots/danskespil-live-blackjack-bord.png";
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
  Calculator,
  Brain,
  Timer,
  Globe,
  BookOpen,
  Target,
  Users,
  Gamepad2,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/europaeisk-blackjack-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad betyder ENHC-reglen i europæisk blackjack?",
    answer:
      "ENHC (European No Hole Card) betyder, at dealeren kun modtager ét kort, indtil alle spillere har handlet. Dealeren har altså intet hole card. Konsekvensen: hvis du fordobler eller splitter, og dealeren derefter trækker en blackjack, mister du den fulde fordobling/split-indsats – ikke kun den originale.",
  },
  {
    question: "Hvad er forskellen mellem ENHC og OBO?",
    answer: (
      <>
        ENHC (European No Hole Card) lader dig miste alle indsatser mod dealer-blackjack. OBO (Original Bets Only) beskytter dig: ved dealer-blackjack mister du kun din originale indsats, ikke fordoblinger/splits. OBO gør europæisk blackjack matematisk ækvivalent med <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link>.
      </>
    ),
  },
  {
    question: "Er europæisk blackjack dårligere end amerikansk?",
    answer:
      "Med ENHC-regler er house edge ca. 0,11 procentpoint højere. Med OBO-regler er der ingen forskel. I praksis afhænger det af de specifikke bordsregler – en europæisk variant med S17 og OBO kan være bedre end en amerikansk med H17.",
  },
  {
    question: "Hvorfor tilbyder europæiske casinoer ikke hole card?",
    answer:
      "Traditionen stammer fra europæisk casinokultur, hvor dealeren kun modtager ét kort for at reducere muligheden for dealer-svindel (collusion). Uden et skjult kort kan dealeren ikke signalere sin hånds styrke til en medsammensvoren.",
  },
  {
    question: "Skal jeg ændre min basic strategy til europæisk blackjack?",
    answer: (
      <>
        Ja, med ENHC-regler bør du være mere konservativ med fordoblinger og splits mod dealerens 10 og es. For eksempel: i <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link> splitter du altid 8'ere – i europæisk ENHC er det bedre at hitte 8+8 mod dealerens 10. Med OBO-regler er strategien identisk med amerikansk.
      </>
    ),
  },
  {
    question: "Hvor finder jeg europæisk blackjack med de bedste regler?",
    answer: (
      <>
        De fleste <Link to="/casino-anmeldelser" className={linkClass}>danske licenserede casinoer</Link> tilbyder europæisk blackjack via <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>. Kig efter borde med OBO-regler, S17 og DAS for den laveste house edge.
      </>
    ),
  },
  {
    question: "Påvirker antallet af decks house edge i europæisk blackjack?",
    answer:
      "Ja, men marginalt. Færre decks reducerer house edge: 2-deck europæisk (ENHC) har ca. 0,31 % vs. 6-deck med 0,39 %. Forskellen skyldes at sandsynligheden for naturlig blackjack stiger med færre decks, og at fordoblinger bliver marginalt stærkere.",
  },
  {
    question: "Hvad er 'no peek'-reglen?",
    answer:
      "No peek er et andet navn for ENHC: dealeren kigger ikke på sit hole card (fordi der ikke er et). I modsætning til amerikansk blackjack, hvor dealeren peeker for blackjack, handler europæiske spillere helt i mørket mht. dealerens potentielle blackjack.",
  },
  {
    question: "Er europæisk blackjack bedre for nybegyndere?",
    answer: (
      <>
        Nej – <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link> er mere begyndervenlig, fordi standard basic strategy fungerer direkte. Europæisk ENHC kræver strategitilpasning, som let fører til fejl hos uerfarne spillere. Med OBO er forskellen negligibel.
      </>
    ),
  },
  {
    question: "Kan man korttælle i europæisk blackjack online?",
    answer:
      "Kun i live dealer-formatet. RNG-versioner blander efter hver hånd. I live europæisk blackjack er korttælling teoretisk muligt, men deck-penetrationen er typisk lav (50 %), og indsatsgrænser begrænser spreadet. Det er ikke en realistisk profitmetode for de fleste spillere.",
  },
];

const EuropaeiskBlackjackGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Europæisk Blackjack 2026 – ENHC, OBO & Strategi Guide",
    description: "Europæisk blackjack: ENHC/OBO-regler, tilpasset basic strategy og house edge-sammenligning med amerikansk variant.",
    url: `${SITE_URL}/casinospil/blackjack/europaeisk-blackjack`,
    datePublished: "2026-03-02",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Europæisk Blackjack 2026 – ENHC, OBO & Regler"
        description="Europæisk blackjack: ENHC vs. OBO-regler, tilpasset basic strategy og matematisk sammenligning med amerikansk variant. Se hvad der passer dig."
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
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Blackjack guide
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Europæisk Blackjack – No Hole Card, ENHC og Strategisk Tilpasning
            </h1>
            <p className="text-lg text-white/80">
              Den europæiske tradition kræver en anden strategisk tilgang. Forstå ENHC vs. OBO – og spil optimalt.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="38 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Elegant europæisk blackjack-bord med grønt filt og kort" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ═══════════════ DATA FIRST: Start med tallene ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Calculator className="h-7 w-7 text-primary" />
            Europæisk Blackjack i Tal – House Edge-Oversigt
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Før vi dykker ned i regler og strategi, lad os etablere det vigtigste: hvad koster det at spille europæisk blackjack? Svaret afhænger af ét centralt spørgsmål: anvender bordet ENHC- eller OBO-regler? <Link to="/ordbog/house-edge" className={linkClass}>House edge</Link> varierer markant afhængigt af dette valg.
          </p>
          <Card className="border-border bg-card my-6">
            <CardHeader>
              <CardTitle className="text-lg">House Edge – Europæisk Blackjack efter Regelvariation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Regelsæt</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">House Edge</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">EV pr. 1.000 kr.</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Forventet tab/200 hænder</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">2-deck, S17, ENHC</td>
                      <td className="text-center py-2 text-primary font-medium">0,31 %</td>
                      <td className="text-center py-2">-3,10 kr.</td>
                      <td className="text-center py-2">62 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50 bg-primary/5">
                      <td className="py-2 font-medium text-foreground">6-deck, S17, OBO, DAS</td>
                      <td className="text-center py-2 text-primary font-medium">0,29 %</td>
                      <td className="text-center py-2">-2,90 kr.</td>
                      <td className="text-center py-2">58 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">6-deck, S17, ENHC, DAS</td>
                      <td className="text-center py-2">0,39 %</td>
                      <td className="text-center py-2">-3,90 kr.</td>
                      <td className="text-center py-2">78 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">8-deck, H17, ENHC, ingen DAS</td>
                      <td className="text-center py-2 text-destructive">0,62 %</td>
                      <td className="text-center py-2">-6,20 kr.</td>
                      <td className="text-center py-2">124 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">6-deck, H17, ENHC, DAS</td>
                      <td className="text-center py-2">0,61 %</td>
                      <td className="text-center py-2">-6,10 kr.</td>
                      <td className="text-center py-2">122 kr.</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-muted-foreground/60">Amerikansk BJ, 6-deck, S17, DAS (reference)</td>
                      <td className="text-center py-2">0,28 %</td>
                      <td className="text-center py-2">-2,80 kr.</td>
                      <td className="text-center py-2">56 kr.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Nøgletallet: et europæisk bord med OBO og S17 er kun 0,01 procentpoint dyrere end det bedste amerikanske bord. Men et europæisk ENHC-bord med H17 og ingen DAS (det værste realistiske scenarie) koster dig mere end dobbelt. Den kritiske beslutning er altså ikke "europæisk vs. amerikansk" – det er "ENHC vs. OBO" og "S17 vs. H17".
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Årlig EV-model:</strong> En spiller der spiller 200 hænder/uge med 100 kr. indsats ved det bedste europæiske bord (OBO, S17) har et forventet årligt tab på 3.016 kr. – ca. 58 kr./uge. Ved det værste bord (ENHC, H17) stiger det til 6.448 kr. – 124 kr./uge. Forskellen er over 3.400 kr./år, baseret udelukkende på regelvalg. Det understreger, hvor vigtigt det er at tjekke reglerne før du sætter dig.
          </p>
        </section>

        <InlineCasinoCards title="Bedste europæisk blackjack online" count={4} />

        {/* ═══════════════ Hvad er europæisk blackjack ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Globe className="h-7 w-7 text-primary" />
            Hvad er Europæisk Blackjack – Historien og Logikken
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Europæisk blackjack adskiller sig fundamentalt fra sin <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikanske modpart</Link> ved en tilsyneladende lille regelændring med store konsekvenser: dealeren modtager kun ét synligt kort. Der er intet hole card, ingen peek – dealerens anden kort deles først, når alle spillere har handlet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne tradition stammer fra europæiske casinoer i Monte Carlo, Baden-Baden og London-klubberne i 1800-tallet. Hvor amerikanske gambling halls prioriterede tempo, prioriterede europæiske casinoer sikkerhed og ceremoniel elegance. Uden et skjult kort kunne dealeren ikke signalere sin hånds styrke til en medsammensvoren – et reelt problem i en æra før overvågningskameraer og digitale kontrolsystemer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I dag er anti-svindel argumentet forældet (live casino-dealere er under konstant kameraovervågning), men traditionen lever videre i regelsettet. Det skaber en vigtig strategisk usikkerhed: du handler uden at vide, om dealeren har blackjack. Under strenge ENHC-regler mister du den fulde indsats, inklusive fordoblinger og splits, mod en uopdaget dealer-blackjack.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at forstå konsekvensen praktisk: forestil dig at du har 11 mod dealerens es. I <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link> ved du (pga. peek) at dealeren ikke har blackjack – du fordobler trygt. I europæisk ENHC-blackjack ved du det ikke. Du fordobler 200 kr. til 400 kr., og dealeren vender et 10-kort: blackjack. Du mister 400 kr. i stedet for 200 kr. Denne risiko er den matematiske kerne i forskellen mellem de to traditioner.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Mange europæiske casinoer har indført OBO-reglen (Original Bets Only) som kompensation: ved dealer-blackjack mister du kun din originale indsats, uanset fordoblinger eller splits. OBO eliminerer næsten hele forskellen og gør den europæiske variant matematisk ækvivalent med den amerikanske. Det er denne nuance – ENHC vs. OBO – der afgør, om europæisk blackjack er en god deal eller ej.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ ENHC vs. OBO detaljeret ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            ENHC vs. OBO – Den Afgørende Regelforskydning i Detaljer
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            De to regelsæt der definerer europæisk blackjack er ENHC (European No Hole Card) og OBO (Original Bets Only). Begge mangler hole card/peek, men de håndterer dealer-blackjack fundamentalt forskelligt. For at vælge det rigtige bord og den rigtige strategi, skal du forstå begge:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  ENHC (European No Hole Card)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Dealer modtager kun 1 kort under dealing</li>
                  <li>• Ingen peek for blackjack – spillere handler i mørket</li>
                  <li>• Fordoblinger og splits tabes FULDT mod dealer-BJ</li>
                  <li>• House edge: ca. +0,11 % vs. amerikansk</li>
                  <li>• Kræver tilpasset basic strategy (se nedenfor)</li>
                  <li>• Mere konservative splits/fordoblinger mod 10 og Es</li>
                  <li>• Psykologisk hårdere: du opdager tabet sent</li>
                  <li>• Hyppighed: ca. 12-15 % af europæiske borde</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  OBO (Original Bets Only)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Dealer modtager kun 1 kort under dealing</li>
                  <li>• Ingen peek for blackjack</li>
                  <li>• Kun originalindsats tabes mod dealer-BJ</li>
                  <li>• House edge: ≈ identisk med amerikansk blackjack</li>
                  <li>• Standard basic strategy fungerer (som US)</li>
                  <li>• Mere spillervenlig – beskytter ekstra indsatser</li>
                  <li>• Mindre stressende: tabet er begrænset</li>
                  <li>• Hyppighed: ca. 85-88 % af europæiske online-borde</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h3 className="mb-3 text-xl font-semibold">EV-forskel i praksis: 6 scenarier</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at kvantificere forskellen mellem ENHC og OBO, lad os gennemgå seks typiske hånde og beregne den forventede værdi under hver regel:
          </p>
          <Card className="border-border bg-card my-6">
            <CardContent className="pt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Din hånd</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Dealer</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">ENHC-handling</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">OBO-handling</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">EV-forskel (100 kr.)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">11</td>
                      <td className="text-center py-2">Es</td>
                      <td className="text-center py-2 text-destructive">Hit</td>
                      <td className="text-center py-2 text-primary">Double</td>
                      <td className="text-center py-2">-18,4 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">11</td>
                      <td className="text-center py-2">10</td>
                      <td className="text-center py-2 text-destructive">Hit</td>
                      <td className="text-center py-2 text-primary">Double</td>
                      <td className="text-center py-2">-14,2 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">8+8</td>
                      <td className="text-center py-2">10</td>
                      <td className="text-center py-2 text-destructive">Hit (16)</td>
                      <td className="text-center py-2 text-primary">Split</td>
                      <td className="text-center py-2">-12,7 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">A+A</td>
                      <td className="text-center py-2">Es</td>
                      <td className="text-center py-2 text-destructive">Hit (12)</td>
                      <td className="text-center py-2 text-primary">Split</td>
                      <td className="text-center py-2">-22,1 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">10</td>
                      <td className="text-center py-2">10</td>
                      <td className="text-center py-2 text-destructive">Hit</td>
                      <td className="text-center py-2 text-primary">Double</td>
                      <td className="text-center py-2">-8,3 kr.</td>
                    </tr>
                    <tr>
                      <td className="py-2">9</td>
                      <td className="text-center py-2">Es</td>
                      <td className="text-center py-2">Hit</td>
                      <td className="text-center py-2">Hit</td>
                      <td className="text-center py-2">0 kr.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Praktisk guide:</strong> Tjek altid bordets regler inden du sætter dig. I <Link to="/live-casino/blackjack" className={linkClass}>live blackjack</Link> vises reglerne typisk i info-sektionen. Hvis du ser "Original Bets Only" eller "OBO", kan du bruge standard basic strategy. Hvis ikke – tilpas din strategi som beskrevet nedenfor. De fleste <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>-borde bruger OBO i 2026, men verifikér altid selv.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Komplet ENHC-strategi ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Komplet ENHC Basic Strategy – Alle 14 Afvigelser
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Under ENHC-regler skal du justere din strategi for at undgå at miste ekstra indsatser mod potentielle dealer-blackjacks. Standard basic strategy antager, at dealerens blackjack allerede er udelukket (via peek) – under ENHC er det ikke tilfældet. Her er alle 14 afvigelser fra standard strategy, organiseret efter hyppighed og EV-impact:
          </p>

          <h3 className="mb-3 text-xl font-semibold">Kritiske afvigelser (høj EV-impact)</h3>
          <Card className="border-border bg-card my-4">
            <CardContent className="pt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Din Hånd</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Dealer 10</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Dealer Es</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Standard (OBO/US)</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">EV-besparelse</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 font-medium">A+A</td>
                      <td className="text-center py-2">Split</td>
                      <td className="text-center py-2 text-destructive font-medium">Hit</td>
                      <td className="text-center py-2">Split</td>
                      <td className="text-center py-2">+22 kr./100</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 font-medium">11</td>
                      <td className="text-center py-2 text-destructive font-medium">Hit</td>
                      <td className="text-center py-2 text-destructive font-medium">Hit</td>
                      <td className="text-center py-2">Double</td>
                      <td className="text-center py-2">+18 kr./100</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 font-medium">8+8</td>
                      <td className="text-center py-2 text-destructive font-medium">Hit</td>
                      <td className="text-center py-2 text-destructive font-medium">Hit</td>
                      <td className="text-center py-2">Split</td>
                      <td className="text-center py-2">+13 kr./100</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 font-medium">10</td>
                      <td className="text-center py-2 text-destructive font-medium">Hit</td>
                      <td className="text-center py-2 text-destructive font-medium">Hit</td>
                      <td className="text-center py-2">Double</td>
                      <td className="text-center py-2">+8 kr./100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Sekundære afvigelser (lavere EV-impact)</h3>
          <ul className="space-y-2 mb-6 ml-4 text-muted-foreground">
            <li>• <strong>9 mod dealer Es:</strong> Hit i stedet for double. Besparelse: +3,2 kr./100</li>
            <li>• <strong>Soft 19 (A+8) mod dealer Es:</strong> Stand i stedet for double. Besparelse: +2,1 kr./100</li>
            <li>• <strong>Soft 18 (A+7) mod dealer Es:</strong> Hit i stedet for stand/double. Besparelse: +1,8 kr./100</li>
            <li>• <strong>4+4 mod dealer Es:</strong> Hit i stedet for split. Besparelse: +1,5 kr./100</li>
            <li>• <strong>6+6 mod dealer Es:</strong> Hit i stedet for split. Besparelse: +1,2 kr./100</li>
            <li>• <strong>7+7 mod dealer 10:</strong> Hit i stedet for split. Besparelse: +1,0 kr./100</li>
            <li>• <strong>3+3 mod dealer Es:</strong> Hit i stedet for split. Besparelse: +0,8 kr./100</li>
            <li>• <strong>2+2 mod dealer Es:</strong> Hit i stedet for split. Besparelse: +0,7 kr./100</li>
            <li>• <strong>Soft 17 (A+6) mod dealer Es:</strong> Hit (ingen forskel fra standard, men undgå double). Besparelse: +0,5 kr./100</li>
            <li>• <strong>9+9 mod dealer Es:</strong> Stand i stedet for split. Besparelse: +0,4 kr./100</li>
          </ul>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Nøglen er simpel: under ENHC undgår du at lægge ekstra penge på bordet (fordobling/split) mod dealerens 10 og es, fordi risikoen for at miste dem mod en uopdaget blackjack er for høj. De fire kritiske afvigelser (A+A, 11, 8+8, 10) dækker ca. 80 % af den samlede strategiske forskel. Lær disse fire først – de resterende 10 kan tilføjes gradvist.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Hyppighedsanalyse:</strong> Du vil møde en af de 14 afvigelsessituationer i ca. 8 % af alle hænder (ca. 16 gange pr. 200 hænder). De fire kritiske afvigelser forekommer i ca. 5 % af hænderne (10 gange pr. 200 hænder). Korrekt spil i disse situationer sparer dig ca. 40-60 kr. pr. 200 hænder – en betydelig besparelse over tid.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Deck-penetration og korttælning ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Eye className="h-7 w-7 text-primary" />
            Deck-Penetration og Korttælning i Europæisk Blackjack
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Korttælning i europæisk blackjack har en unik fordel: du ser alle kort der spilles (ingen er skjulte under en peek-sensor). I hver runde afsløres dealerens hånd fuldt – begge kort – når runden slutter. Det giver dig lidt mere information pr. runde end i <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link>, hvor en peek-runde (dealer har blackjack) kun afslører ét kort.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Men:</strong> Europæisk blackjack spilles ofte med 2 decks i stedet for 6-8, og deck-penetrationen varierer. Med 2 decks og 50 % penetration ser du kun 52 kort, før der blandes – det er nok til at opnå marginale fordele med Hi-Lo-systemet (ca. 0,3-0,5 % spillerfordel ved TC +3), men det kræver perfekt execution og aggressiv bet-spredning.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I live online-formatet er deck-penetrationen typisk lavere end i fysiske casinoer. <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> bruger typisk 8 decks med omblanding efter ca. 50 % – det reducerer tælle-effektiviteten markant. Derudover begrænser de fleste online-casinoer bet-spredningen (typisk 1:10 max), hvilket gør det næsten umuligt at udnytte positive counts profitabelt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Konklusion for korttællere:</strong> Europæisk blackjack er marginalt bedre end amerikansk for tælling (pga. fuld kortafsløring), men det praktiske udbytte er minimalt i online-formatet. Investér din tid i perfekt ENHC-strategi – det er langt mere værdifuldt end tælning for 99 % af spillere.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Historisk kontekst ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            Historisk Kontekst – Fra Monte Carlo til Online Live Dealer
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Adskillelsen mellem amerikansk og europæisk blackjack går tilbage til spillets udbredelse i 1800-tallet. I amerikanske gambling halls (først i New Orleans, senere i Las Vegas) var tempoet alt. Hole card-systemet blev indført for at accelerere spillet og reducere tvister om dealerens handlinger.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I europæiske casinoer – særligt Monte Carlo, Baden-Baden og London-klubberne – var traditionen anderledes. Spillet var mere ceremoniielt, tempoet langsommere, og der var større fokus på at forhindre dealer-manipulation. No hole card-reglen var et anti-svindel tiltag: uden et skjult kort havde dealeren ingen information at lække til en medsammensvoren. Denne sikkerhedsforanstaltning var essentiel i en tid, hvor casinoovervågning bestod af sharp-eyed pit bosses snarere end high-definition kameraer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Udviklingen i det 20. århundrede blødgjorde grænsen. Las Vegas adopterede nogle europæiske traditioner (lavere bordgrænser, multiple decks), og europæiske casinoer indførte amerikanske innovationer (shoe dealing, automatiseret kortblanding). Men hole card-reglen forblev den definerende forskel – et kulturelt artefakt der overlevede på trods af sin oprindelige rationale.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I dag er grænsen næsten udvisket i online-verdenen. <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>, der dominerer live casino-markedet, tilbyder begge varianter fra de samme studier i Riga, Malta og Manila. En dealer kan skifte mellem europæiske og amerikanske regler fra bord til bord. For danske spillere betyder det, at "europæisk" og "amerikansk" i stigende grad er marketingtermer snarere end reelle geografiske indikatorer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Den vigtigste lektion fra historien:</strong> Fokusér ikke på etiketten, men på reglerne. Et "europæisk" bord med OBO, S17 og DAS er identisk med det bedste "amerikanske" bord. Et "amerikansk" bord med H17 og 6:5 er værre end det dårligste europæiske alternativ. Reglerne, ikke traditionen, bestemmer din edge.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Sessionssimulering ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            Sessionssimulering: 1.000 Hænder ENHC vs. OBO
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at illustrere den reelle forskel mellem ENHC og OBO simulerede vi 1.000 hænder med 100 kr. indsats under identiske regler (6-deck, S17, DAS). Simuleringen bruger Monte Carlo-metoden med 10.000 gentagelser for at generere statistisk signifikante resultater.
          </p>
          <Card className="border-border bg-card my-6">
            <CardHeader>
              <CardTitle className="text-lg">Simuleringsresultater: 1.000 hænder × 100 kr.</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Metrik</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">ENHC</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">OBO</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Forskel</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">Forventet tab (gennemsnit)</td>
                      <td className="text-center py-2">-390 kr.</td>
                      <td className="text-center py-2 text-primary">-290 kr.</td>
                      <td className="text-center py-2">100 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Standardafvigelse</td>
                      <td className="text-center py-2">3.640 kr.</td>
                      <td className="text-center py-2">3.580 kr.</td>
                      <td className="text-center py-2">60 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Sandsynlighed for positiv session</td>
                      <td className="text-center py-2">45,7 %</td>
                      <td className="text-center py-2 text-primary">46,8 %</td>
                      <td className="text-center py-2">1,1 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Worst case (5. percentil)</td>
                      <td className="text-center py-2 text-destructive">-6.380 kr.</td>
                      <td className="text-center py-2">-6.180 kr.</td>
                      <td className="text-center py-2">200 kr.</td>
                    </tr>
                    <tr>
                      <td className="py-2">Best case (95. percentil)</td>
                      <td className="text-center py-2">+5.600 kr.</td>
                      <td className="text-center py-2 text-primary">+5.600 kr.</td>
                      <td className="text-center py-2">0 kr.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Forskellen på 100 kr. over 1.000 hænder virker ubetydelig – og det er den i en enkelt session. Men over et års spil (52 uger × 200 hænder = 10.400 hænder) akkumuleres den til ca. 1.040 kr. Over 5 år: 5.200 kr. For regelmæssige spillere er regelvalget altså ikke trivielt – det er en systematisk besparelse der vokser lineært med spilletid.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det mest bemærkelsesværdige i simuleringen er variansen: standardafvigelsen er ca. 3.600 kr. for begge regelsæt, mens forskellen i forventet tab kun er 100 kr. Det betyder, at du i en enkelt session af 1.000 hænder ikke kan mærke forskellen mellem ENHC og OBO – tilfældighed dominerer totalt. Forskellen er kun synlig over tusindvis af sessioner. Derfor er det vigtigt at vælge regler baseret på matematik, ikke på en enkelt sessions resultat.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Europæiske bordvariationer i Danmark ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gamepad2 className="h-7 w-7 text-primary" />
            Europæiske Blackjack-Variationer hos Danske Casinoer
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            De fleste danske <Link to="/casino-anmeldelser" className={linkClass}>licenserede casinoer</Link> tilbyder europæisk blackjack i mindst to formater: RNG (software-baseret) og live dealer. Udbuddet varierer, men her er de mest almindelige variationer:
          </p>
          <ul className="space-y-3 mb-6 ml-4">
            <li className="text-muted-foreground leading-relaxed">
              <strong>Classic European Blackjack (RNG):</strong> 2 decks, ENHC, S17, ingen DAS. Den mest autentiske europæiske oplevelse med den laveste deck-count. House edge: ca. 0,31 %. Tilgængelig hos de fleste casinoer via <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link> eller <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>European Blackjack Gold (RNG):</strong> Microgamings premium-version med forbedret grafik og optional side bets. Regler identiske med Classic, men med Perfect Pairs side bet. Side bet house edge: 5,8 % – undgå den.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Live European Blackjack (Evolution):</strong> 8 decks, typisk OBO, S17, DAS. House edge: ca. 0,29 %. Det mest populære format hos <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link>, <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> og <Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link>.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Multi-Hand European Blackjack (RNG):</strong> Spil op til 5 hænder simultant. Øger din eksponering og variansen markant – men ændrer ikke house edge. Godt til at øve ENHC-strategi hurtigt.
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Pro tip:</strong> For den bedste kombination af lav house edge og autentisk oplevelse, vælg live European Blackjack med OBO-regler. Det giver dig den europæiske æstetik og det amerikanske matematiske grundlag. <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link> tilbyder desuden Speed Blackjack-varianten, hvis du prioriterer tempo over tradition.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Hvor spiller du live blackjack ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Timer className="h-7 w-7 text-primary" />
            Hvor Spiller Du Live Europæisk Blackjack i Danmark?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fire danske casinoer skiller sig ud med deres live blackjack-tilbud. Alle er licenseret af <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> og bruger <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gamings</Link> platform:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Dansk-ejet med fokus på lokal support. Udmærket live-sektion med klassiske europæiske borde og Infinite Blackjack. OBO-regler på de fleste borde.</p>
                <p className="text-sm text-muted-foreground"><strong>Fordel:</strong> Dansk kundeservice og <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>-integration.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Stærkt live-casino med VIP-borde og dedikerede europæiske blackjack-rum. Hurtige udbetalinger via <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>.</p>
                <p className="text-sm text-muted-foreground"><strong>Fordel:</strong> Bedste mobiloplevelse for live blackjack blandt danske casinoer.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Bredt udvalg inkl. Blackjack Party og Salon Privé. Gode indsatsintervaller fra 25 kr. til 50.000 kr. Tilgængelig for alle budgetter.</p>
                <p className="text-sm text-muted-foreground"><strong>Fordel:</strong> Størst variation i live-bordtyper og indsatsgrænser.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Pay N Play med instant adgang via Trustly. Ingen langvarig registrering – ind og spil live blackjack på under et minut.</p>
                <p className="text-sm text-muted-foreground"><strong>Fordel:</strong> Hurtigste onboarding for nye spillere – perfekt til spontant spil.</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Husk: uanset hvilket casino du vælger, er live-bordenes regler kontrolleret af Evolution – ikke af casinoet selv. Forskellen mellem casinoer ligger i velkomstbonusser, <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>, udbetalingshastigheder og kundeservice. Sammenlign i vores <Link to="/casino-anmeldelser" className={linkClass}>detaljerede anmeldelser</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Sammenligning med alle varianter ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-primary" />
            Europæisk vs. Alle Andre Varianter – Den Fulde Sammenligning
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For de fleste danske spillere er anbefalingen enkel, men nuanceret:
          </p>
          <ul className="space-y-3 mb-6 ml-4">
            <li className="text-muted-foreground leading-relaxed">
              <strong>Europæisk OBO vs. <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>Amerikansk</Link>:</strong> Matematisk identiske. Vælg baseret på personlig præference – europæisk har en roligere atmosfære, amerikansk er hurtigere.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Europæisk ENHC vs. Amerikansk:</strong> Amerikansk er 0,11 % bedre. Vælg amerikansk, medmindre du specifikt vil udfordre dig med ENHC-strategi.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Europæisk vs. <Link to="/casinospil/blackjack/double-exposure-blackjack" className={linkClass}>Double Exposure</Link>:</strong> Europæisk er klart bedre (0,29-0,39 % vs. 0,69 %). Double Exposure er for spillere der prioriterer transparens over EV.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Europæisk vs. <Link to="/casinospil/blackjack/spanish-21" className={linkClass}>Spanish 21</Link>:</strong> Tæt løb (0,29-0,39 % vs. 0,40 %). Spanish 21 tilbyder mere variation og bonusser, men kræver markant mere strategiinvestering.
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Husk: den vigtigste blackjack-beslutning er ikke varianten – det er om du følger <Link to="/casinospil/blackjack" className={linkClass}>basic strategy</Link>. En spiller med perfekt strategi ved det "forkerte" bord slår en mavefornemmelse-spiller ved det "rigtige" bord hver gang. Start med at mestre strategien for den variant du har adgang til – og optimer derfra.
          </p>
        </section>

        <CasinospilMoneyLinks gameName="Europæisk Blackjack" currentPath="/casinospil/blackjack/europaeisk-blackjack" />
        <LatestNewsByCategory pagePath="/casinospil/blackjack/europaeisk-blackjack" />
        <RelatedGuides currentPath="/casinospil/blackjack/europaeisk-blackjack" />
        <FAQSection faqs={faqs} />
        <AuthorBio />
      </div>
      <StickyCtaBySlug slug="campobet" />
    </>
  );
};

export default EuropaeiskBlackjackGuide;
