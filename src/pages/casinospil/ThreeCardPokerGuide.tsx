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
  Award,
  Shuffle,
  Calculator,
  Percent,
  Trophy,
  Landmark,
  Flame,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/three-card-poker-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er Three Card Poker?",
    answer: (
      <>
        Three Card Poker er et casinospil, hvor du spiller mod dealeren med kun tre kort. Spillet kombinerer elementer fra traditionel <Link to="/casinospil/poker" className={linkClass}>poker</Link> med casinoets hurtige format. Du modtager tre kort, vurderer din hånd og vælger enten at raise eller folde. Det er et af de simpleste casinospil at lære, men tilbyder stadig strategisk dybde.
      </>
    ),
  },
  {
    question: "Hvad er forskellen mellem Ante/Play og Pair Plus?",
    answer:
      "Ante/Play er hovedspillet, hvor du spiller mod dealerens hånd. Du placer en Ante-indsats, modtager tre kort og beslutter om du vil matche din Ante med en Play-bet eller folde. Pair Plus er en separat sideindsats, der betaler ud baseret udelukkende på din hånds kvalitet – uanset dealerens kort. Du behøver par eller bedre for at vinde. Du kan spille begge eller kun én af dem.",
  },
  {
    question: "Hvad er den optimale strategi i Three Card Poker?",
    answer:
      "Den optimale strategi er enkel: raise med Q-6-4 eller bedre, og fold alt andet. Denne strategi reducerer house edge til 3,37 % på Ante/Play. Mange spillere laver fejlen at folde for tidligt (f.eks. Q-3-2) eller at raise med for svage hænder (f.eks. J-high), hvilket øger house edge markant.",
  },
  {
    question: "Hvad er house edge i Three Card Poker?",
    answer:
      "House edge på Ante/Play med optimal strategi er 3,37 %. House edge på Pair Plus varierer afhængigt af pay table – den mest almindelige tabel giver 7,28 % house edge, men de bedste tabeller kan komme ned på 2,32 %. Tjek altid udbetalingstabellen, før du spiller Pair Plus.",
  },
  {
    question: "Hvad er håndrankering i Three Card Poker?",
    answer:
      "Håndrankering er anderledes end i standard poker, fordi du kun har tre kort. Fra stærkest til svageste: Straight Flush, Three of a Kind, Straight, Flush, Pair, High Card. Bemærk: Three of a Kind slår Straight (modsat standard poker), og Flush slår ikke Straight. Dette skyldes de ændrede sandsynligheder med kun tre kort.",
  },
  {
    question: "Kan man spille Three Card Poker online med dansk licens?",
    answer: (
      <>
        Ja, Three Card Poker er tilgængelig hos flere danske casinoer i både RNG- og <Link to="/live-casino" className={linkClass}>live casino</Link>-format. <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> tilbyder populære live-varianter med professionelle dealers. Det er et af de mest udbredte bordspil i danske online casinoer.
      </>
    ),
  },
  {
    question: "Hvad er 6 Card Bonus-indsatsen?",
    answer:
      "6 Card Bonus er en valgfri sideindsats, der kombinerer dine tre kort med dealerens tre kort til den bedste 5-korts pokerhånd. Den betaler for Three of a Kind eller bedre. House edge er typisk 10-18 % afhængigt af udbetalingstabellen – det er en dyr indsats med høj varians, der primært appellerer til spillere, der jagter store jackpotudbetalinger.",
  },
  {
    question: "Er Three Card Poker bedre end blackjack?",
    answer: (
      <>
        Nej, <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> har markant lavere house edge (0,28-0,5 % med perfekt strategi vs. 3,37 % i Three Card Poker). Dog er Three Card Poker simplere at spille (kun én strategisk beslutning pr. hånd), og Pair Plus tilbyder mulighed for store udbetalinger (op til 40:1 for straight flush). Det handler om, hvad du prioriterer: lavest mulig house edge eller underholdning og enkelhed.
      </>
    ),
  },
  {
    question: "Hvad er den største fejl, spillere laver i Three Card Poker?",
    answer:
      "Den mest costly fejl er at spille Pair Plus med en dårlig udbetalingstabel. Forskellen mellem den bedste og den værste Pair Plus-tabel er næsten 5 procentpoint i house edge. Den næststørste fejl er at afvige fra Q-6-4-strategien – mange spillere folder Q-high hænder, der burde raises, eller raiser Jack-high, der burde foldes.",
  },
  {
    question: "Kan man tælle kort i Three Card Poker?",
    answer:
      "Nej, korttælling er ikke muligt i Three Card Poker, fordi hele bunken blandes efter hver hånd (både i RNG og live format). Til forskel fra blackjack, hvor kort deles fra en shoe over flere hænder, starter Three Card Poker med en frisk bunke hver gang. Der er ingen informationsfordel at opnå fra tidligere hænder.",
  },
  {
    question: "Hvad er forskellen mellem RNG og live Three Card Poker?",
    answer:
      "RNG (Random Number Generator) Three Card Poker bruger en computeralgoritme til at generere tilfældige kort, mens live Three Card Poker bruger en rigtig dealer med fysiske kort, streamet via HD-video. Begge formater har identiske regler og odds. Live-formatet tilbyder en mere autentisk casinooplevelse med social interaktion, mens RNG er hurtigere (flere hænder pr. time) og ofte har lavere minimumsindsatser.",
  },
  {
    question: "Hvad er Ante Bonus i Three Card Poker?",
    answer:
      "Ante Bonus er en automatisk bonus, der udbetales uanset om dealeren kvalificerer eller ej. Du modtager 1:1 for en Straight, 4:1 for Three of a Kind, og 5:1 for en Straight Flush. Denne bonus reducerer den effektive house edge og er en af grundene til, at Ante/Play-komboen er mere attraktiv end mange andre casinospil. Ante Bonus er inkluderet i den 3,37 % house edge-beregning.",
  },
];

const ThreeCardPokerGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Three Card Poker 2026 – Regler, Strategi & Udbetalinger",
    description: "Komplet dansk guide til Three Card Poker: regler, optimal Q-6-4 strategi, house edge-analyse, Pair Plus og Ante/Play forklaret.",
    url: `${SITE_URL}/casinospil/poker/three-card-poker`,
    datePublished: "2026-03-02",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Three Card Poker 2026 – Regler & Strategi Guide"
        description="Komplet dansk guide til Three Card Poker med regler, Q-6-4 optimal strategi, Pair Plus udbetalinger og house edge-analyse for danske casinoer."
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
              Three Card Poker – Hurtig Action, Simpel Strategi
            </h1>
            <p className="text-lg text-white/80">
              Det mest tilgængelige casinobordspil: lær regler, optimal Q-6-4 strategi, Pair Plus-odds og house edge på under 10 minutter.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="40 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Three Card Poker-bord i elegant casino med dealer og kort" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 – Segment First – Hvem spiller?
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Hvem Spiller Three Card Poker – Og Hvorfor?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Three Card Poker er et af de hurtigst voksende casinobordspil i verden – og det er der en god grund til. Det appellerer til tre distinkte spillertyper, og forstår du hvilken kategori du tilhører, kan du optimere din oplevelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Casual-spilleren:</strong> Du vil have underholdning uden at skulle studere strategi i timevis. Three Card Poker har kun én strategisk beslutning pr. hånd (raise eller fold), og optimal strategi kan læres på 30 sekunder: "Q-6-4 eller bedre = raise". Sammenlign dette med <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>, der kræver memorering af en hel strategitabel. Three Card Poker er perfekt til aftener, hvor du vil nyde casinoatmosfæren uden at tænke for hårdt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Jackpot-jægeren:</strong> Pair Plus-indsatsen tilbyder udbetalinger op til 40:1 for en straight flush og varianter med progressive jackpots, der kan ramme seks- og syvcifrede beløb. Hvis du elsker den adrenalin, der kommer med muligheden for en massiv udbetaling fra en lille indsats, er Pair Plus designet til dig. Dog bør du være opmærksom på house edge (se vores analyse nedenfor).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Den strategiske spiller:</strong> Selvom Three Card Poker er simplere end Hold'em, er der stadig edge-optimering at hente. At vælge det rigtige bord (Pair Plus-udbetalingstabel), kombinere Ante/Play med Pair Plus korrekt, og udnytte bonus-strukturer fra dit <Link to="/casino-bonus" className={linkClass}>casino</Link> kan reducere den effektive <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> betydeligt. For denne spillertype handler det om at finde de bedste vilkår og spille disciplineret.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Historisk kontekst:</strong> Three Card Poker blev opfundet i 1994 af Derek Webb, en britisk pokerspiller, der ønskede at skabe et casinobordspil med pokerens appel men casinoets tilgængelighed. Spillet var oprindeligt kendt som "Brit-Brag" og blev hurtigt det mest succesrige nye casinobordspil i årtier. I dag er Three Card Poker tilgængeligt i praktisk talt hvert casino i verden – fra Las Vegas til Macau, fra London til København.
          </p>
        </section>

        <InlineCasinoCards title="Casinoer med Three Card Poker" count={4} />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 – Regler
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Three Card Poker Regler – Komplet Gennemgang
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Three Card Poker kombinerer to separate spil i ét: <strong>Ante/Play</strong> (hovedspillet mod dealeren) og <strong>Pair Plus</strong> (en uafhængig sideindsats). Du kan spille begge eller kun ét af dem. Lad os gennemgå flowet trin for trin.
          </p>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Ante/Play – Spilleflow
          </h3>
          <ol className="mb-6 space-y-3 text-muted-foreground leading-relaxed list-decimal pl-6">
            <li><strong>Placer Ante:</strong> Du lægger din Ante-indsats i feltet. Valgfrit: placer også en Pair Plus-indsats.</li>
            <li><strong>Kortuddelingen:</strong> Du og dealeren modtager hver tre kort med forsiden ned.</li>
            <li><strong>Vurder din hånd:</strong> Kig på dine tre kort og beslut: raise (placer en Play-bet lig din Ante) eller fold (mist din Ante).</li>
            <li><strong>Dealer åbner:</strong> Dealeren vender sine kort. Dealeren skal have Queen-high eller bedre for at "kvalificere".</li>
            <li><strong>Resultat A – Dealer kvalificerer ikke:</strong> Din Ante betaler 1:1, din Play returneres (push).</li>
            <li><strong>Resultat B – Dealer kvalificerer, du vinder:</strong> Både Ante og Play betaler 1:1.</li>
            <li><strong>Resultat C – Dealer kvalificerer, du taber:</strong> Du mister Ante og Play.</li>
            <li><strong>Ante Bonus:</strong> Uanset udfaldet modtager du en bonus for premium hænder: Straight (1:1), Three of a Kind (4:1), Straight Flush (5:1).</li>
          </ol>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <Coins className="h-5 w-5 text-primary" />
            Pair Plus – Uafhængig Sideindsats
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Pair Plus evalueres udelukkende baseret på din hånd – dealerens kort er irrelevante. Du vinder med et par eller bedre. Udbetalingerne varierer mellem casinoer, og denne variation har en ENORM indflydelse på house edge.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Pair Plus Udbetalingstabeller – Sammenligning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Hånd</th>
                      <th className="py-2 text-left font-semibold">Tabel A (Bedst)</th>
                      <th className="py-2 text-left font-semibold">Tabel B (Middel)</th>
                      <th className="py-2 text-left font-semibold">Tabel C (Værst)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold">Straight Flush</td><td className="py-2">40:1</td><td className="py-2">40:1</td><td className="py-2">35:1</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Three of a Kind</td><td className="py-2">30:1</td><td className="py-2">25:1</td><td className="py-2">25:1</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Straight</td><td className="py-2">6:1</td><td className="py-2">6:1</td><td className="py-2">6:1</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Flush</td><td className="py-2">3:1</td><td className="py-2">4:1</td><td className="py-2">3:1</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Pair</td><td className="py-2">1:1</td><td className="py-2">1:1</td><td className="py-2">1:1</td></tr>
                    <tr className="border-b border-t-2"><td className="py-2 font-bold">House Edge</td><td className="py-2 font-bold text-primary">2,32 %</td><td className="py-2 font-bold">3,49 %</td><td className="py-2 font-bold text-destructive">7,28 %</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed">
            Forskellen mellem den bedste og værste Pair Plus-tabel er <strong>næsten 5 procentpoint</strong> i house edge. Over 1.000 hænder med 100 kr. indsats er det forskellen mellem at miste 2.320 kr. og 7.280 kr. statistisk set. Tjek ALTID udbetalingstabellen, før du spiller Pair Plus.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 – Håndrankering
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Award className="h-7 w-7 text-primary" />
            Håndrankering i Three Card Poker – Anderledes end Standard Poker
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med kun tre kort ændres sandsynlighederne for de forskellige pokerhænder, og dermed også rankeringen. Den vigtigste forskel: <strong>Three of a Kind slår Straight</strong>, og <strong>Straight slår Flush</strong>. Dette er omvendt i standard 5-korts poker.
          </p>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Rang</th>
                      <th className="py-2 text-left font-semibold">Hånd</th>
                      <th className="py-2 text-left font-semibold">Eksempel</th>
                      <th className="py-2 text-left font-semibold">Kombinationer</th>
                      <th className="py-2 text-left font-semibold">Sandsynlighed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">1</td><td className="py-2 font-semibold">Straight Flush</td><td className="py-2">5♠-6♠-7♠</td><td className="py-2">48</td><td className="py-2">0,22 %</td></tr>
                    <tr className="border-b"><td className="py-2">2</td><td className="py-2 font-semibold">Three of a Kind</td><td className="py-2">K-K-K</td><td className="py-2">52</td><td className="py-2">0,24 %</td></tr>
                    <tr className="border-b"><td className="py-2">3</td><td className="py-2 font-semibold">Straight</td><td className="py-2">9♣-T♦-J♠</td><td className="py-2">720</td><td className="py-2">3,26 %</td></tr>
                    <tr className="border-b"><td className="py-2">4</td><td className="py-2 font-semibold">Flush</td><td className="py-2">2♥-7♥-Q♥</td><td className="py-2">1.096</td><td className="py-2">4,96 %</td></tr>
                    <tr className="border-b"><td className="py-2">5</td><td className="py-2 font-semibold">Pair</td><td className="py-2">8-8-A</td><td className="py-2">3.744</td><td className="py-2">16,94 %</td></tr>
                    <tr><td className="py-2">6</td><td className="py-2 font-semibold">High Card</td><td className="py-2">3-7-K</td><td className="py-2">16.440</td><td className="py-2">74,39 %</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Hvorfor er rækkefølgen anderledes?</strong> I 5-korts poker er Three of a Kind sjældnere end en Straight, fordi der er flere kombinationsmuligheder. Med kun tre kort vender dette: der er kun 52 måder at lave Three of a Kind (4 for hver rang × 13 rangen) mod 720 Straights. Derudover er en Flush med tre kort lettere at ramme end en Straight, fordi du kan have vilkårlige tre kort i samme kulør. Denne ændrede sandsynlighed dikterer den ændrede rangering.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Mini Royal Flush:</strong> Nogle Three Card Poker-varianter inkluderer en "Mini Royal Flush" (A-K-Q suited) som den højeste hånd med en separat bonusudbetaling. I standard Three Card Poker er Mini Royal blot den bedste Straight Flush, men i visse live casino-versioner betaler den en separat jackpot – typisk 50:1 eller endda en progressiv jackpot. Tjek spillets regler for at se, om denne variant er tilgængelig.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 – Optimal strategi
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Optimal Strategi – Q-6-4 Reglen
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Three Card Pokers optimale strategi er elegant i sin enkelhed: <strong>Raise med Queen-Six-Four eller bedre, fold alt andet</strong>. Denne strategi reducerer house edge til 3,37 % på Ante/Play-kombinationen. Men hvad betyder "Queen-Six-Four eller bedre" præcist?
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sammenlign din hånd med Q-6-4 ved at starte fra det højeste kort: Hvis dit højeste kort er bedre end Queen (King eller Ace), raise altid. Hvis dit højeste kort er Queen, tjek det næsthøjeste: er det bedre end 6, raise. Er det præcis 6, tjek det tredje kort: er det 4 eller bedre, raise. Alt under Q-6-4 er et fold.
          </p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Raise (Q-6-4+)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Ethvert par eller bedre</li>
                  <li>• Ace-high, King-high</li>
                  <li>• Q-7-x (Queen med 7+)</li>
                  <li>• Q-6-4, Q-6-5, Q-6-6+</li>
                  <li>• Alle straights og flushes</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-destructive" />
                  Fold (under Q-6-4)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Q-6-3 og lavere</li>
                  <li>• Q-5-x (Queen med 5 eller lavere)</li>
                  <li>• Jack-high og lavere</li>
                  <li>• 10-high, 9-high osv.</li>
                  <li>• Alle hænder uden mindst Q-6-4</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Hvorfor netop Q-6-4?</strong> Denne grænse er bestemt af matematisk optimering: med Q-6-4 har du præcis nok equity mod dealerens range til at retfærdiggøre den ekstra Play-indsats. Med Q-6-3 er din equity marginalt for lav – du taber i gennemsnit en lille fraktion af en bet. Grænsen er skarp, og selv én rang kan gøre forskellen mellem +EV og -EV.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Fejlmargin:</strong> Hvad koster det at afvige? Hvis du spiller en "fold alt under par"-strategi, stiger house edge fra 3,37 % til ca. 7,6 %. Omvendt, hvis du raiser med alt (aldrig folder), er house edge ca. 7,7 %. Begge ekstremer er markant dårligere end Q-6-4-strategien. Den simpleste forbedring, de fleste spillere kan lave, er at stoppe med at folde Q-high hænder, der kvalificerer.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5 – Dealer Qualifying Matematik
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Calculator className="h-7 w-7 text-primary" />
            Dealer-Qualifying Matematik – Hvad Betyder Q-High?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Et centralt element i Three Card Poker er, at dealeren skal have Queen-high eller bedre for at "kvalificere". Hvis dealeren ikke kvalificerer, vinder du kun 1:1 på Ante (Play pushes). Denne mekanik har en dyb indflydelse på spillets dynamik og forklarer, hvorfor du skal raise med relativt svage hænder.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Hvor ofte kvalificerer dealeren?</strong> Dealeren kvalificerer ca. 66,4 % af tiden (to ud af tre hænder). Det betyder, at i ca. 33,6 % af hænderne – altså hver tredje hånd – vinder du kun 1:1 på Ante uanset din hånds styrke. Denne frekvens er beregnet ud fra de 22.100 mulige 3-korts kombinationer fra en 52-korts bunke.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5 text-primary" />
                Dealer Qualifying Sandsynligheder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Dealer har</th>
                      <th className="py-2 text-left font-semibold">Sandsynlighed</th>
                      <th className="py-2 text-left font-semibold">Konsekvens for dig</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold">Under Q-high</td><td className="py-2">33,6 %</td><td className="py-2">Ante 1:1, Play push</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Q-high til A-high</td><td className="py-2">41,8 %</td><td className="py-2">Normal sammenligning</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Pair</td><td className="py-2">16,9 %</td><td className="py-2">Normal sammenligning</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Flush</td><td className="py-2">5,0 %</td><td className="py-2">Normal sammenligning</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Straight</td><td className="py-2">3,3 %</td><td className="py-2">Normal sammenligning</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Three of a Kind</td><td className="py-2">0,24 %</td><td className="py-2">Normal sammenligning</td></tr>
                    <tr><td className="py-2 font-semibold">Straight Flush</td><td className="py-2">0,22 %</td><td className="py-2">Normal sammenligning</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Strategisk implikation:</strong> Fordi dealeren ikke kvalificerer i over en tredjedel af hænderne, får du "gratis" gevinster med selv svage hænder. Det er derfor, at Q-6-4-strategien er korrekt – selv en svag Queen-high vinder automatisk 1:1 på Ante i 33,6 % af tilfældene, hvor dealeren ikke kvalificerer. Denne "gratis" gevinst kompenserer for de gange, hvor dealeren kvalificerer og slår dig.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>EV-beregning for grænse-hænder:</strong> Med Q-6-4 er din forventede værdi (EV) for Play-indsatsen marginalt positiv: ca. +0,004 units per hånd. Med Q-6-3 er den marginalt negativ: ca. -0,002 units. Denne mikroskopiske forskel akkumuleres over tusindvis af hænder – over 10.000 hænder er forskellen ca. 60 kr. med en 100 kr. Ante. Det lyder småt, men det er forskellen mellem at spille optimalt og at give casinoet en unødvendig fordel.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6 – House Edge analyse
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            House Edge – Three Card Poker vs. Andre Bordspil
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at vurdere Three Card Pokers værdi som casinospil er det nyttigt at sammenligne house edge med andre populære bordspil. Her er en ærlig sammenligning med de mest spillede alternativer.
          </p>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Spil</th>
                      <th className="py-2 text-left font-semibold">House Edge</th>
                      <th className="py-2 text-left font-semibold">Strategikompleksitet</th>
                      <th className="py-2 text-left font-semibold">Tempo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold"><Link to="/casinospil/blackjack" className={linkClass}>Blackjack</Link></td><td className="py-2">0,28-0,5 %</td><td className="py-2">Høj (strategitabel)</td><td className="py-2">Moderat</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold"><Link to="/casinospil/baccarat" className={linkClass}>Baccarat</Link> (Banker)</td><td className="py-2">1,06 %</td><td className="py-2">Ingen</td><td className="py-2">Hurtig</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold"><Link to="/casinospil/craps" className={linkClass}>Craps</Link> (Pass Line)</td><td className="py-2">1,41 %</td><td className="py-2">Lav</td><td className="py-2">Moderat</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold"><Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>Roulette</Link> (Europæisk)</td><td className="py-2">2,70 %</td><td className="py-2">Ingen</td><td className="py-2">Langsom</td></tr>
                    <tr className="border-b bg-muted/30"><td className="py-2 font-bold">Three Card Poker (Ante)</td><td className="py-2 font-bold">3,37 %</td><td className="py-2 font-bold">Meget lav</td><td className="py-2 font-bold">Hurtig</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Three Card Poker (Pair Plus A)</td><td className="py-2">2,32 %</td><td className="py-2">Ingen</td><td className="py-2">Hurtig</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold"><Link to="/casinospil/poker/caribbean-stud" className={linkClass}>Caribbean Stud</Link></td><td className="py-2">5,22 %</td><td className="py-2">Moderat</td><td className="py-2">Langsom</td></tr>
                    <tr><td className="py-2 font-semibold"><Link to="/casinospil/poker/video-poker" className={linkClass}>Video Poker</Link> (9/6 JoB)</td><td className="py-2">0,46 %</td><td className="py-2">Høj</td><td className="py-2">Hurtig</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Three Card Poker har en højere house edge end blackjack og baccarat, men kompenserer med ekstremt lav strategikompleksitet og hurtig handling. Hvis din primære motivation er at minimere husets fordel, er blackjack det bedre valg. Men hvis du vil have et simpelt, actionfyldt bordspil med mulighed for store Pair Plus-udbetalinger, er Three Card Poker en fremragende mulighed.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Bemærk:</strong> Pair Plus med Tabel A (2,32 %) har faktisk lavere house edge end Ante/Play (3,37 %). Det kan virke kontraintuitivt, men Pair Plus er en ren lotteriindsats uden strategisk element – du vinder eller taber baseret på dine kort alene. For spillere, der primært ønsker underholdning med lavest mulig house edge, kan "kun Pair Plus" med Tabel A faktisk være den bedste tilgang. Dog mister du Ante Bonus-elementet, som tilføjer spænding.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 7 – 6 Card Bonus Deep Dive
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Flame className="h-7 w-7 text-primary" />
            6 Card Bonus – Sideindsats Under Luppen
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            6 Card Bonus er en populær sideindsats i Three Card Poker, der kombinerer dine tre kort med dealerens tre kort til den bedste 5-korts pokerhånd. Det er en rent varians-baseret indsats med høj house edge, men den tilbyder mulighed for massive udbetalinger fra små indsatser.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                6 Card Bonus Udbetalingstabel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Hånd</th>
                      <th className="py-2 text-left font-semibold">Standard</th>
                      <th className="py-2 text-left font-semibold">Premium</th>
                      <th className="py-2 text-left font-semibold">Sandsynlighed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold">Royal Flush</td><td className="py-2">1.000:1</td><td className="py-2">1.000:1</td><td className="py-2">0,0032 %</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Straight Flush</td><td className="py-2">200:1</td><td className="py-2">200:1</td><td className="py-2">0,028 %</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Four of a Kind</td><td className="py-2">100:1</td><td className="py-2">50:1</td><td className="py-2">0,048 %</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Full House</td><td className="py-2">20:1</td><td className="py-2">20:1</td><td className="py-2">0,17 %</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Flush</td><td className="py-2">15:1</td><td className="py-2">10:1</td><td className="py-2">0,20 %</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Straight</td><td className="py-2">10:1</td><td className="py-2">5:1</td><td className="py-2">0,39 %</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Three of a Kind</td><td className="py-2">7:1</td><td className="py-2">5:1</td><td className="py-2">2,11 %</td></tr>
                    <tr className="border-b border-t-2"><td className="py-2 font-bold">House Edge</td><td className="py-2 font-bold">10,4 %</td><td className="py-2 font-bold text-destructive">17,2 %</td><td className="py-2">–</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Er 6 Card Bonus det værd?</strong> Med en house edge på 10-17 % er svaret klart: <strong>nej, for den disciplinerede spiller</strong>. Over 1.000 hænder med en 25 kr. 6 Card Bonus-indsats taber du statistisk 2.600-4.300 kr. Det er en sideindsats designet til at generere revenue for casinoet, ikke værdi for spilleren. Den eneste undtagelse er, hvis 6 Card Bonus er knyttet til en progressiv jackpot, der har akkumuleret til et niveau, der gør den +EV (se progressiv jackpot-analyse nedenfor).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Hvornår er 6 Card Bonus acceptable?</strong> Kun som underholdning med et meget lille beløb (f.eks. minimum indsats), hvor du eksplicit accepterer den høje house edge til gengæld for muligheden for en stor udbetaling. Sæt aldrig mere end 5 % af din session-bankroll på 6 Card Bonus. Og husk: uanset udfaldet af 6 Card Bonus påvirker det ikke dine Ante/Play eller Pair Plus-resultater.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 8 – Progressive Jackpot Analyse
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-primary" />
            Progressiv Jackpot – Matematisk Break-Even Analyse
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Mange Three Card Poker-borde tilbyder en progressiv jackpot-sideindsats, typisk knyttet til Pair Plus eller 6 Card Bonus. Den progressive jackpot vokser med hver indsats og udbetales ved sjældne hænder som Mini Royal (A-K-Q suited). Spørgsmålet er: hvornår er den progressive jackpot stor nok til at retfærdiggøre indsatsen?
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Break-even beregning:</strong> For en typisk progressiv jackpot knyttet til Pair Plus, hvor Mini Royal (A-K-Q suited) vinder hele jackpotten, er sandsynligheden for at ramme Mini Royal ca. 1 i 460 (4 suits × C(13,3) mulige 3-korts kombinationer, men kun A-K-Q i en specifik suit). Med en $1 sideindsats og en base house edge på ~3,37 %, skal jackpotten være mindst $435 for at bringe den samlede EV til break-even. Over dette niveau er indsatsen teoretisk +EV.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Vigtig advarsel:</strong> Selvom jackpotten er over break-even-niveauet, er variansen astronomisk. Du kan spille 10.000 hænder uden at ramme Mini Royal – det er forventeligt. Den progressive jackpot er kun +EV i gennemsnittet over uendeligt mange hænder. For en enkeltsession er den altid en gamble. Overvej den progressive jackpot som en "lotteri-tilføjelse" til din Three Card Poker-session, ikke som en investering.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Praktisk anbefaling:</strong> Tjek jackpottens størrelse før du sætter dig ved bordet. Hvis den er under break-even (~435 gange din sideindsats), er det matematisk forkert at spille den. Hvis den er over, kan du tilføje den som en lille ekstra indsats (aldrig mere end 10 % af din totale indsats per hånd). Og husk: den progressive indsats ændrer ikke dine odds på Ante/Play eller standard Pair Plus.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 9 – Live Casino varianter
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gamepad2 className="h-7 w-7 text-primary" />
            Three Card Poker i Live Casino
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Three Card Poker er et af de mest populære <Link to="/live-casino" className={linkClass}>live casino</Link>-bordspil hos danske licenserede casinoer. <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> leverer den mest udbredte live-variant med professionelle dealers, HD-streaming og interaktivt interface.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Fordele ved live Three Card Poker:</strong> Autentisk casinoatmosfære fra din sofa, social interaktion via chat, mulighed for at se dealeren blande og dele kort i realtid (eliminerer tvivl om fairness), og typisk adgang til bedre Pair Plus-tabeller end RNG-versioner. De fleste live-borde accepterer indsatser fra 10-5.000 kr.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Live vs. RNG Three Card Poker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Parameter</th>
                      <th className="py-2 text-left font-semibold">Live Casino</th>
                      <th className="py-2 text-left font-semibold">RNG (Software)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold">Hænder/time</td><td className="py-2">30-40</td><td className="py-2">80-120</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Min. indsats</td><td className="py-2">10-50 kr.</td><td className="py-2">1-10 kr.</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Max. indsats</td><td className="py-2">5.000-50.000 kr.</td><td className="py-2">1.000-5.000 kr.</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Fairness</td><td className="py-2">Synlige kort + licens</td><td className="py-2">RNG-certificeret</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Social interaktion</td><td className="py-2">Chat med dealer</td><td className="py-2">Ingen</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Forventet tab/time</td><td className="py-2">Lavere (færre hænder)</td><td className="py-2">Højere (flere hænder)</td></tr>
                    <tr><td className="py-2 font-semibold">Tilgængelighed</td><td className="py-2">Begrænset til åbne borde</td><td className="py-2">Altid tilgængeligt</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Tip til live-spil:</strong> Brug auto-play funktionen sparsomt – den kan øge dit tempo og dermed din eksponering mod house edge. Tag dig tid til at evaluere hver hånd mod Q-6-4-grænsen. I live-format har du typisk 15-20 sekunder pr. beslutning, hvilket er mere end rigeligt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Forventet tab sammenligning:</strong> Med en 100 kr. Ante i live casino (35 hænder/time) er dit forventede tab ca. 118 kr./time. Samme indsats i RNG (100 hænder/time) giver et forventet tab på ca. 337 kr./time. Det langsommere live-tempo er dermed en fordel for din bankroll – selvom house edge er identisk, spiller du færre hænder og mister derfor mindre per time. Husk altid <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 10 – Bankroll Management
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            Bankroll Management for Three Card Poker
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Korrekt bankroll management er afgørende for at nyde Three Card Poker uden at risikere mere, end du har råd til at tabe. Her giver vi konkrete retningslinjer baseret på matematiske modeller for variansen i Three Card Poker.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Session-bankroll:</strong> Vi anbefaler en session-bankroll på minimum 30-40 × din Ante-indsats. Med en 100 kr. Ante bør du medbringe 3.000-4.000 kr. til en session. Dette giver dig nok buffer til at overleve de naturlige downswings, der forekommer i enhver casinosession. Husk: med 3,37 % house edge og standard afvigelse på ~1,6 units per hånd kan du nemt tabe 15+ hænder i træk.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Session-Planlægning: 4 Scenarier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Scenarie</th>
                      <th className="py-2 text-left font-semibold">Ante</th>
                      <th className="py-2 text-left font-semibold">Session-bankroll</th>
                      <th className="py-2 text-left font-semibold">Spilletid (ca.)</th>
                      <th className="py-2 text-left font-semibold">Forventet tab</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">Lav risiko</td><td className="py-2">25 kr.</td><td className="py-2">1.000 kr.</td><td className="py-2">2-3 timer</td><td className="py-2">59-84 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">Middel</td><td className="py-2">50 kr.</td><td className="py-2">2.000 kr.</td><td className="py-2">2-3 timer</td><td className="py-2">118-168 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">Middel-høj</td><td className="py-2">100 kr.</td><td className="py-2">4.000 kr.</td><td className="py-2">2-3 timer</td><td className="py-2">236-337 kr.</td></tr>
                    <tr><td className="py-2">Høj</td><td className="py-2">250 kr.</td><td className="py-2">10.000 kr.</td><td className="py-2">2-3 timer</td><td className="py-2">590-843 kr.</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Stop-loss og stop-win:</strong> Sæt altid en stop-loss grænse før du begynder. Vi anbefaler 50 % af din session-bankroll som maksimalt tab (f.eks. 2.000 kr. af 4.000 kr.). Tilsvarende kan du sætte en stop-win grænse på 50-100 % af bankroll – hvis du har fordoblet din bankroll, er det et godt tidspunkt at stoppe og fejre gevinsten. Disse grænser er ikke matematisk nødvendige (house edge er konstant), men de hjælper med disciplin og nydelse.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Undgå Martingale:</strong> At fordoble indsatser efter tab (Martingale-systemet) virker ikke i Three Card Poker. House edge er konstant uanset indsatsstørrelse, og bordet har en maksimumsindsats, der forhindrer uendelig fordobling. Martingale øger kun din varians – det ændrer ikke din forventede gevinst. Hold din Ante konstant gennem hele sessionen for den mest disciplinerede tilgang.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 11 – EV-Model
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Coins className="h-7 w-7 text-primary" />
            EV-Model: Hvad Koster Three Card Poker Pr. Time?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at forstå den reelle omkostning ved at spille Three Card Poker skal vi beregne det forventede tab pr. time. Denne beregning hjælper dig med at planlægge din bankroll og sætte realistiske forventninger.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Forventet Tab Pr. Time – Scenarieanalyse
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Scenarie</th>
                      <th className="py-2 text-left font-semibold">Ante</th>
                      <th className="py-2 text-left font-semibold">Pair Plus</th>
                      <th className="py-2 text-left font-semibold">Hænder/time</th>
                      <th className="py-2 text-left font-semibold">Forventet tab/time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">Kun Ante – Live</td><td className="py-2">50 kr.</td><td className="py-2">–</td><td className="py-2">35</td><td className="py-2">59 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">Kun Ante – RNG</td><td className="py-2">50 kr.</td><td className="py-2">–</td><td className="py-2">100</td><td className="py-2">169 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">Ante + PP (Tabel A) – Live</td><td className="py-2">50 kr.</td><td className="py-2">25 kr.</td><td className="py-2">35</td><td className="py-2">79 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">Ante + PP (Tabel A) – RNG</td><td className="py-2">50 kr.</td><td className="py-2">25 kr.</td><td className="py-2">100</td><td className="py-2">227 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">Ante + PP (Tabel C) – Live</td><td className="py-2">100 kr.</td><td className="py-2">50 kr.</td><td className="py-2">35</td><td className="py-2">245 kr.</td></tr>
                    <tr><td className="py-2">Ante + PP (Tabel C) – RNG</td><td className="py-2">100 kr.</td><td className="py-2">50 kr.</td><td className="py-2">100</td><td className="py-2">701 kr.</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed">
            Disse tal viser tydeligt to ting: (1) Valg af Pair Plus-tabel er afgørende – Tabel C koster dig markant mere end Tabel A. (2) Live-tempo reducerer dit forventede tab med 60-65 % sammenlignet med RNG ved identiske indsatser. Over en hel aften (4 timer) med 100 kr. Ante + 50 kr. PP (Tabel C) er forskellen mellem live (980 kr. tab) og RNG (2.804 kr. tab) hele 1.824 kr. Vælg dine vilkår med omhu.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 12 – Strategi-variationer
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            Strategi-Variationer: Hvad Hvis Q-6-4 Føles For Simpelt?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Q-6-4 er den matematisk optimale strategi, men der er variationer, som spillere bruger baseret på deres risikoappetit og spillestil. Her analyserer vi de mest populære alternative strategier og deres indvirkning på house edge.
          </p>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Strategi</th>
                      <th className="py-2 text-left font-semibold">Raise-grænse</th>
                      <th className="py-2 text-left font-semibold">House Edge</th>
                      <th className="py-2 text-left font-semibold">Ekstra tab/1.000 hænder (100 kr.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-muted/30"><td className="py-2 font-bold">Optimal</td><td className="py-2 font-bold">Q-6-4+</td><td className="py-2 font-bold">3,37 %</td><td className="py-2 font-bold">Baseline</td></tr>
                    <tr className="border-b"><td className="py-2">Konservativ</td><td className="py-2">K-high+</td><td className="py-2">4,28 %</td><td className="py-2">+910 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">Ultra-konservativ</td><td className="py-2">Pair+</td><td className="py-2">7,65 %</td><td className="py-2">+4.280 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">Aggressiv</td><td className="py-2">J-high+</td><td className="py-2">4,52 %</td><td className="py-2">+1.150 kr.</td></tr>
                    <tr><td className="py-2">Altid raise</td><td className="py-2">Alt</td><td className="py-2">7,74 %</td><td className="py-2">+4.370 kr.</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Analyse:</strong> Den mest overraskende konklusion er, at "altid raise" og "kun raise med pair+" har næsten identisk house edge (~7,7 %). Det skyldes, at begge strategier afviger lige meget fra optimal – den ene i den aggressive retning, den anden i den konservative. Q-6-4 er det perfekte sweet spot. Den konservative K-high strategi koster dig "kun" 910 kr. ekstra per 1.000 hænder, men det er stadig unødvendigt: at lære Q-6-4-grænsen tager bogstaveligt talt 10 sekunder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Q-6-4 er ikke-forhandlingsbar:</strong> Vi kan ikke understrege dette nok. Enhver afvigelse fra Q-6-4 koster dig penge. Den eneste acceptable variation er at spille Q-6-3 i stedet for Q-6-4 – EV-forskellen er så mikroskopisk (0,006 units/hånd), at den er irrelevant over en normal session. Men K-high eller pair+ strategier er målbart dårligere og bør undgås.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 13 – Tips og fejl
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-7 w-7 text-primary" />
            7 Fatale Fejl – Og Hvordan du Undgår Dem
          </h2>

          <div className="space-y-4 mb-6">
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 1: Spille Pair Plus med dårlig udbetalingstabel</p>
                <p className="text-sm text-muted-foreground">Mange spillere ignorerer udbetalingstabellen og spiller bare "Pair Plus". Tjek ALTID tabellen – forskellen kan være 5 procentpoint i house edge. Tabel C (7,28 %) koster dig over 3x mere end Tabel A (2,32 %).</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 2: Folde Q-high hænder, der kvalificerer</p>
                <p className="text-sm text-muted-foreground">Hænder som Q-7-2 skal raises, men mange spillere folder dem "fordi det kun er Queen-high". Det koster dig direkte EV – du mister de 33,6 % af hænderne, hvor dealeren ikke kvalificerer.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 3: Raise med Jack-high</p>
                <p className="text-sm text-muted-foreground">J-T-9 ser "stærk" ud, men det er et fold i Three Card Poker. Husk: Q-6-4 er grænsen, uanset hvor connected dine kort er. Connectivity er irrelevant i Three Card Poker.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 4: Chase tab med stigende indsatser</p>
                <p className="text-sm text-muted-foreground">Three Card Poker har en fast house edge. At fordoble indsatser efter tab (Martingale) ændrer ikke din forventede gevinst – det øger kun din risiko for ruin og kan tømme din bankroll på rekordtid.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 5: Ignorere 6 Card Bonus house edge</p>
                <p className="text-sm text-muted-foreground">6 Card Bonus har typisk 10-18 % house edge – den er designet til at uddræne din bankroll langsomt. Spil den kun med minimumsindsat, hvis du eksplicit jagter en progressiv jackpot over break-even.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 6: Spille RNG i stedet for live uden at overveje tempoforskellen</p>
                <p className="text-sm text-muted-foreground">RNG spiller 2-3x flere hænder pr. time end live. Med identisk house edge taber du 2-3x mere per time. Vælg live for at beskytte din bankroll og nyde oplevelsen.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 7: Forveksle Three Card Poker-håndrankering med standard poker</p>
                <p className="text-sm text-muted-foreground">I Three Card Poker slår Three of a Kind en Straight, og Straight slår Flush. Mange spillere fra Hold'em antager standard rankering og missvurderer deres hånds styrke.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 14 – Dansk regulering
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Landmark className="h-7 w-7 text-primary" />
            Three Card Poker i Danmark – Regulering & Tilgængelighed
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Three Card Poker er tilgængeligt for danske spillere under den danske spillelovgivning, reguleret af Spillemyndigheden. Alle operatører, der tilbyder Three Card Poker til danske spillere, skal have en gyldig dansk licens, der sikrer fairness, ansvarligt spil og spillerbeskyttelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Licenserede udbydere:</strong> De fleste store danske online casinoer tilbyder Three Card Poker i en eller anden form. Evolution Gaming er den dominerende leverandør af live Three Card Poker, mens softwareversioner leveres af diverse RNG-udbydere. Tjek altid, at casinoet har en gyldig Spillemyndigheden-licens (licens.telecom.dk), før du spiller.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Beskatning:</strong> Gevinster fra Three Card Poker hos danske licenserede casinoer er allerede beskattet ved kilden – casinoet betaler 28 % bruttospilleafgift af deres indtægter. Du som spiller skal ikke indberette individuelle gevinster fra danske licenserede operatører. Gevinster fra udenlandske, ikke-licenserede operatører er dog skattepligtige og skal selvangives.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Ansvarligt spil:</strong> Danske spillere har adgang til ROFUS (Register Over Frivilligt Udelukkede Spillere), indbetalingsgrænser og tidsbegrænsninger hos alle danske licenserede casinoer. Vi anbefaler kraftigt, at du sætter en indbetalingsgrænse INDEN du begynder at spille – Three Card Pokers hurtige tempo kan gøre det let at miste overblikket over dit forbrug. Læs mere i vores guide til <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
          </p>
        </section>

        <CasinospilMoneyLinks gameName="Three Card Poker" currentPath="/casinospil/poker/three-card-poker" />
        <RelatedGuides currentPath="/casinospil/poker/three-card-poker" />
        <FAQSection faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="campobet" />
    </>
  );
};

export default ThreeCardPokerGuide;
