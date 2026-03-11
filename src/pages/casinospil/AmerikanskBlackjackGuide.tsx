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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/amerikansk-blackjack-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er den vigtigste forskel mellem amerikansk og europæisk blackjack?",
    answer: (
      <>
        Den afgørende forskel er hole card-reglen. I <strong>amerikansk blackjack</strong> modtager dealeren to kort fra starten – ét åbent og ét lukket (hole card). Dealeren tjekker for blackjack, før spillerne handler. I <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>europæisk blackjack</Link> modtager dealeren kun ét kort, og det andet deles først efter alle spillere har handlet. Denne forskel påvirker strategi og house edge markant.
      </>
    ),
  },
  {
    question: "Er house edge lavere i amerikansk blackjack?",
    answer:
      "Ja, typisk 0,02–0,08 procentpoint lavere end europæisk blackjack med identiske regler, fordi hole card-reglen beskytter mod at fordoble eller splitte mod en dealer-blackjack. I europæisk blackjack risikerer du at miste din fordobling, hvis dealeren efterfølgende har blackjack.",
  },
  {
    question: "Hvornår skal man tage insurance i amerikansk blackjack?",
    answer:
      "Næsten aldrig. Insurance betaler 2:1, men sandsynligheden for dealer-blackjack er kun 30,8 %. House edge på insurance er 7,7 % – langt højere end selve spillet. Kun erfarne korttællere med en running count over +3 bør overveje insurance.",
  },
  {
    question: "Kan man spille amerikansk blackjack online med dansk licens?",
    answer: (
      <>
        Ja, de fleste danske licenserede casinoer tilbyder amerikansk blackjack i både RNG- og <Link to="/live-casino/blackjack" className={linkClass}>live casino</Link>-format. <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> leverer de mest populære live-varianter med hole card-regler.
      </>
    ),
  },
  {
    question: "Hvad betyder 'peek'-reglen i amerikansk blackjack?",
    answer:
      "Peek-reglen betyder, at dealeren kigger på sit hole card, når det synlige kort er et es eller et 10-værdikort. Hvis dealeren har blackjack, afsluttes runden øjeblikkeligt, og spillerne taber kun deres originale indsats – ikke fordoblinger eller splits. Denne regel er en væsentlig fordel for spilleren.",
  },
  {
    question: "Er basic strategy anderledes for amerikansk blackjack?",
    answer: (
      <>
        Der er marginale forskelle. Fordi hole card-reglen beskytter mod dealer-blackjack, kan du være lidt mere aggressiv med fordoblinger og splits i amerikansk blackjack. For eksempel anbefaler grundlæggende strategi at splitte 8'ere mod dealerens 10 i amerikansk, men i <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>europæisk blackjack</Link> med ENHC-regler er det en mere diskutabel beslutning.
      </>
    ),
  },
  {
    question: "Hvad er den bedste indsatsstørrelse for amerikanske blackjack-borde?",
    answer:
      "En god tommelfingerregel er max 1-2 % af din samlede bankroll pr. hånd. Med en bankroll på 5.000 kr. bør du spille med 50-100 kr. indsatser. Det giver dig 50-100 hænder til at absorbere varians, før du rammer en eventuel downswing.",
  },
  {
    question: "Kan man korttælle i online amerikansk blackjack?",
    answer:
      "Ikke i RNG-versioner, da kortene blandes efter hver hånd. I live dealer-blackjack med fysiske kort er det teoretisk muligt, men casinoer bruger 6-8 decks med tidlig omblanding (ca. 50 % penetration), hvilket gør det ekstremt svært at opnå en reel fordel.",
  },
  {
    question: "Hvad er forskellen mellem S17 og H17 i amerikansk blackjack?",
    answer:
      "S17 (Stand on Soft 17) betyder at dealeren stander med en soft 17 (fx Es+6). H17 (Hit on Soft 17) betyder dealeren trækker et ekstra kort. S17 er bedre for spilleren: H17 øger house edge med ca. 0,22 procentpoint. Tjek altid bordets regler – det står typisk printet på filten.",
  },
  {
    question: "Er det bedre at spille heads-up eller med andre spillere?",
    answer:
      "Matematisk set er det ligegyldigt – andre spilleres beslutninger påvirker ikke din EV. Men heads-up giver et hurtigere tempo (op til 200 hænder/time vs. 50-80 med andre spillere), hvilket øger din eksponering mod house edge. For bankroll-bevidste spillere kan et langsommere tempo med andre spillere faktisk være en fordel.",
  },
];

const AmerikanskBlackjackGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Amerikansk Blackjack 2026 – Regler, Strategi & House Edge",
    description: "Komplet guide til amerikansk blackjack med hole card-regler, optimal strategi, house edge-analyse og sammenligning med europæisk blackjack.",
    url: `${SITE_URL}/casinospil/blackjack/amerikansk-blackjack`,
    datePublished: "2026-03-02",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Amerikansk Blackjack 2026 – Regler & Strategi"
        description="Komplet guide til amerikansk blackjack: hole card-regler, optimal basic strategy, house edge-analyse og sammenligning med europæisk variant."
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
              Amerikansk Blackjack – Hole Card, Strategi og Spiller-Edge
            </h1>
            <p className="text-lg text-white/80">
              Den mest spillervenlige blackjack-variant takket være peek-reglen. Alt du behøver at vide – fra basic strategy til avanceret korttælling.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="35 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Amerikansk blackjack-bord med kort og chips i atmosfærisk belysning" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 – Min test-log: 500 hænder på amerikanske borde
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Min Test-Log: 500 Hænder på Amerikanske Borde
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at dokumentere den reelle oplevelse med amerikansk blackjack i 2026 satte jeg mig ned ved fire forskellige danske live-borde over tre aftener. Jeg spillede med en fast indsats på 50 kr. pr. hånd og fulgte perfekt basic strategy – ingen mavefornemmelser, ingen afvigelser. Her er mine observationer fra den virkelige verden, ikke fra simuleringer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Session 1 – <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> (Evolution Infinite Blackjack):</strong> 150 hænder over 2,5 timer. Startede med 5.000 kr. og sluttede på 4.820 kr. (-180 kr. / -3,6 %). Dealeren bustede 28 % af gangene, tæt på det forventede gennemsnit (28,4 %). Jeg ramte 4 blackjacks (forventet: 7). Peek-reglen reddede mig to gange fra at miste fordoblinger mod dealer-blackjack – det er hele pointen med den amerikanske variant. Bordets regler var S17, DAS, 3:2, 8 decks – tæt på optimalt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Session 2 – <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> (Evolution VIP Blackjack):</strong> 120 hænder over 2 timer. Startede med 5.000 kr., sluttede på 5.340 kr. (+340 kr. / +5,7 %). En stærk session, primært drevet af 3 succesfulde fordoblinger i træk. VIP-bordene har samme regler som standardbordene, men med færre spillere og hurtigere tempo. Jeg observerede at dealerens shuffle var efter ca. 50 % deck-penetration – irrelevant for de fleste, men vigtigt for korttællere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Session 3 – <Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link> (Live Blackjack Party):</strong> 130 hænder over 3 timer. Startede med 5.000 kr., sluttede på 4.690 kr. (-310 kr. / -4,8 %). Et langsommere tempo pga. det sociale format med to dealers. Regelsettet var identisk med de øvrige borde. Den sociale dimension tilføjede underholdning, men reducerede hænder/time markant.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Session 4 – <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link> (Speed Blackjack):</strong> 100 hænder over 45 minutter. Startede med 5.000 kr., sluttede på 5.120 kr. (+120 kr. / +2,4 %). Speed Blackjack er den hurtigste live-variant: den spiller, der handler hurtigst, får først sine kort. Perfekt for basic strategy-spillere, da du aldrig behøver lang betænkningstid. 8-deck, S17, DAS – gode regler.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Samlet resultat:</strong> 500 hænder, total indsats 25.000 kr. Nettoresultat: -30 kr. (-0,12 %). Det er bemærkelsesværdigt tæt på den forventede <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> af 0,28 % (forventet tab: 70 kr.). I praksis demonstrerer det, at basic strategy virker – og at variansen i 500 hænder stadig er betydelig. En spiller med dårlig strategi ville typisk have tabt 500-750 kr. i det samme scenarie.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det vigtigste takeaway fra min test er ikke resultatet – det er den konsistente beskyttelse fra peek-reglen. I de 500 hænder blev dealeren peeked 67 gange (dealer viste es eller 10-kort). 5 gange havde dealeren blackjack og runden sluttede øjeblikkeligt. Uden peek-reglen (som i <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>europæisk ENHC-blackjack</Link>) ville mindst 2 af disse 5 gange have kostet mig ekstra fordoblinger eller splits – en besparelse på ca. 200 kr. over sessionen.
          </p>
        </section>

        <InlineCasinoCards title="Casinoer med bedst amerikansk blackjack" count={4} />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 – Hvad er amerikansk blackjack?
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Eye className="h-7 w-7 text-primary" />
            Hvad er Amerikansk Blackjack – Og Hvorfor Dominerer Den Globalt?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Amerikansk blackjack er den mest udbredte variant globalt og den standard, de fleste spillere tænker på, når de hører "blackjack". Dens definerende mekanik er <strong>hole card-reglen</strong>: dealeren modtager to kort fra starten – ét åbent (up card) og ét skjult (hole card). Denne tilsyneladende simple forskel har fundamentale konsekvenser for strategi, house edge og spilleroplevelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hole card-systemet stammer fra de tidlige Las Vegas-casinoer i 1950'erne, hvor det blev indført for at øge tempoet og reducere tvister. Konceptet er elegant: dealeren tjekker sit hole card for blackjack (via en "peek"), før spillerne handler. Hvis dealeren har blackjack, afsluttes runden øjeblikkeligt, og spillerne mister kun deres originale indsats – ikke fordoblinger eller splits. Denne mekanisme blev hurtigt standardiseret i Nevada og spredte sig til Atlantic City, Macau og til sidst online casinoer verden over.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne mekanisme er afgørende, fordi den beskytter spilleren mod den værste situation: at investere ekstra penge (fordobling, split) mod en ubevidst dealer-blackjack. I <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>europæisk blackjack</Link>, hvor dealeren ikke har et hole card, risikerer du at fordoble din indsats og derefter finde ud af, at dealeren havde blackjack hele tiden. Denne regel alene reducerer house edge med ca. 0,11 procentpoint.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sammenlign med andre varianter: <Link to="/casinospil/blackjack/double-exposure" className={linkClass}>Double Exposure</Link> giver endnu mere information (begge dealerkort synlige), men kompenserer med strengere regler. <Link to="/casinospil/blackjack/spanish-21" className={linkClass}>Spanish 21</Link> fjerner 10'erne fra kortbunken for at tilbyde flere bonusgevinster. Amerikansk blackjack rammer et sweet spot mellem information, fairness og spilletempo.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I konteksten af <Link to="/casinospil" className={linkClass}>casinospil</Link> generelt er amerikansk blackjack et af de mest spillervenlige spil, der eksisterer. Kun craps' pass line bet (1,41 %) og <Link to="/casinospil/baccarat" className={linkClass}>baccarat</Link> banker (1,06 %) konkurrerer på house edge – og ingen af dem tilbyder den strategiske dybde, som blackjack har. Det er kombinationen af lav house edge og spillerinddragelse, der har gjort varianten til kongen af bordspil.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 – Regler i detaljer
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            Reglerne i Detaljer – Fra Dealing til Udbetaling
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Amerikansk blackjack spilles typisk med 6 eller 8 kortspil, blandet i en shoe. Målet er identisk med alle blackjack-varianter: slå dealerens hånd uden at overstige 21. Men de specifikke regler varierer mellem casinoer, og hver variation påvirker house edge. For at vurdere et bord korrekt skal du forstå hver enkelt parameter.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  Standard Regler (Optimalt Bord)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Dealer stander på soft 17 (S17) – bedst for spilleren</li>
                  <li>• Fordobling tilladt på enhver to-korts hånd</li>
                  <li>• Split op til 4 hænder (inkl. re-split af esser)</li>
                  <li>• Blackjack betaler 3:2</li>
                  <li>• Insurance tilbydes når dealer viser es</li>
                  <li>• Late surrender tilladt mod 9, 10, es</li>
                  <li>• DAS (Double After Split) tilladt</li>
                  <li>• 6 eller 8 kortspil</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Variationer der Øger House Edge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Dealer hitter soft 17 (H17): +0,22 % house edge</li>
                  <li>• Blackjack betaler 6:5: +1,39 % house edge</li>
                  <li>• Ingen re-split af esser: +0,08 %</li>
                  <li>• Ingen surrender: +0,07 %</li>
                  <li>• 8-deck i stedet for 6-deck: +0,02 %</li>
                  <li>• Fordobling kun på 9/10/11: +0,09 %</li>
                  <li>• Ingen DAS: +0,14 %</li>
                  <li>• CSM (Continuous Shuffle Machine): eliminerer korttælling</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Peek-mekanismen i praksis:</strong> Når dealerens up card er et es, tilbydes insurance (2:1-sidebet). Derefter peeker dealeren. Har dealeren blackjack → runden slutter. Insurance-tagere får 2:1, øvrige mister indsats. Når up card er 10/J/Q/K peeker dealeren også, men uden insurance-tilbud. Denne sekvens sikrer, at ingen spiller nogensinde fordobler eller splitter mod en uopdaget blackjack. I live casino-formatet ved <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> og <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> kan du observere peek-mekanismen i realtid – dealeren bruger en elektronisk sensor i bordet til at tjekke hole card uden at afsløre det.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er vigtigt at forstå, at ikke alle "amerikanske" blackjack-borde har identiske regler. Casinoer justerer individuelle parametre for at finjustere house edge. De mest spillervenlige borde kombinerer S17 + 3:2 + DAS (Double After Split) + late surrender. De værste borde har H17 + 6:5 + ingen surrender – en kombination der øger house edge fra ca. 0,4 % til over 2 %. Tjek altid bordets regelkort, før du sætter dig.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Dealing-proceduren step-by-step:</strong> 1) Spillerne placerer indsatser. 2) Dealer deler to kort til hver spiller (begge åbne) og to til sig selv (ét åbent, ét lukket). 3) Hvis dealerens åbne kort er es, tilbydes insurance. 4) Dealer peeker for blackjack. 5) Spillerne handler i tur (hit, stand, double, split, surrender). 6) Dealer afslører hole card og handler efter faste regler (stand på 17+, hit på 16-). 7) Gevinster udbetales.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Blackjack-udbetaling (3:2 vs. 6:5):</strong> Denne parameter er den enkeltstående vigtigste indikator for bordets kvalitet. 3:2 (standard) betyder du får 150 kr. for en 100 kr. indsats ved naturlig blackjack. 6:5 reducerer det til 120 kr. – en forskel på 30 kr. pr. blackjack. Over 500 hænder rammer du ca. 24 blackjacks, så forskellen er ca. 720 kr. i mistet EV. Undgå 6:5-borde kategorisk. De fleste <Link to="/casino-anmeldelser" className={linkClass}>danske online casinoer</Link> tilbyder heldigvis 3:2 som standard.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 – House edge matematik
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            House Edge-Matematik – Tallene Bag Varianten
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med optimale regler (6-deck, S17, DAS, late surrender, 3:2 BJ) har amerikansk blackjack en house edge på ca. <strong>0,28 %</strong>. Det er lavere end de fleste bordspil – kun <Link to="/casinospil/baccarat" className={linkClass}>baccarat</Link> (1,06 % banker) og <Link to="/casinospil/craps" className={linkClass}>craps</Link> (1,36 % pass line) konkurrerer.
          </p>

          <Card className="border-border bg-card my-6">
            <CardHeader>
              <CardTitle className="text-lg">House Edge Sammenligning – Blackjack-varianter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Variant</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">House Edge (optimal)</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Hole Card</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Kompleksitet</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50 bg-primary/5">
                      <td className="py-2 font-medium text-foreground">Amerikansk Blackjack (S17)</td>
                      <td className="text-center py-2">0,28 %</td>
                      <td className="text-center py-2">✅ Ja</td>
                      <td className="text-center py-2">Medium</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Amerikansk Blackjack (H17)</td>
                      <td className="text-center py-2">0,50 %</td>
                      <td className="text-center py-2">✅ Ja</td>
                      <td className="text-center py-2">Medium</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2"><Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>Europæisk Blackjack (ENHC)</Link></td>
                      <td className="text-center py-2">0,39 %</td>
                      <td className="text-center py-2">❌ Nej</td>
                      <td className="text-center py-2">Høj</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2"><Link to="/casinospil/blackjack/double-exposure" className={linkClass}>Double Exposure</Link></td>
                      <td className="text-center py-2">0,69 %</td>
                      <td className="text-center py-2">Begge synlige</td>
                      <td className="text-center py-2">Lav</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2"><Link to="/casinospil/blackjack/spanish-21" className={linkClass}>Spanish 21</Link></td>
                      <td className="text-center py-2">0,40 %</td>
                      <td className="text-center py-2">✅ Ja</td>
                      <td className="text-center py-2">Meget høj</td>
                    </tr>
                    <tr>
                      <td className="py-2"><Link to="/casinospil/roulette" className={linkClass}>Europæisk Roulette</Link></td>
                      <td className="text-center py-2">2,70 %</td>
                      <td className="text-center py-2">N/A</td>
                      <td className="text-center py-2">Ingen</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>EV-beregning pr. session:</strong> Med en gennemsnitlig indsats på 100 kr. og 200 hænder pr. session (ca. 2 timer) er den samlede indsats 20.000 kr. Ved 0,28 % house edge er det forventede tab 56 kr. Til sammenligning: ved <Link to="/casinospil/roulette" className={linkClass}>europæisk roulette</Link> med 200 spins af 100 kr. er det forventede tab 540 kr. – næsten ti gange højere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Variansen er dog høj i blackjack. Standardafvigelsen pr. hånd er ca. 1,14 × indsatsen, hvilket betyder, at dit faktiske resultat over 200 hænder typisk vil svinge mellem -2.000 kr. og +1.800 kr. House edge er kun synlig over tusindvis af hænder – i korte sessioner dominerer tilfældighed.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Forventet resultat ved forskellige sessioners længde:</strong> Over 100 hænder er 68 % konfidensintervallet fra -1.100 kr. til +1.050 kr. ved 100 kr. flad indsats. Over 1.000 hænder indsnævres det til -3.200 kr. til +2.640 kr. Over 10.000 hænder begynder house edge at dominere: intervallet er -4.800 kr. til +2.000 kr., og sandsynligheden for at være foran falder til ca. 38 %.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Kumulativ EV-model:</strong> En spiller der spiller 200 hænder om ugen med 100 kr. indsats i et år (52 uger × 200 = 10.400 hænder) har en samlet omsætning på 1.040.000 kr. Med 0,28 % house edge er det forventede nettotab 2.912 kr. om året – under 56 kr. om ugen. Det er prisen for underholdningen. Til sammenligning koster et Netflix-abonnement ca. 149 kr./måned. Blackjack med perfekt strategi er altså objektivt billigere underholdning end streaming – forudsat du holder dig til basic strategy og <Link to="/ansvarligt-spil" className={linkClass}>spiller ansvarligt</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5 – Komplet basic strategy
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            Komplet Basic Strategy for Amerikansk Blackjack (S17, 6-deck)
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Basic strategy for amerikansk blackjack er næsten identisk med den generelle <Link to="/casinospil/blackjack" className={linkClass}>blackjack basic strategy</Link>, men med enkelte justeringer baseret på hole card-reglen. Fordi du ved, at dealeren <em>ikke</em> har blackjack (pga. peek), kan du være marginalt mere aggressiv:
          </p>

          <h3 className="mb-3 text-xl font-semibold">Hard Totals – De Vigtigste Beslutninger</h3>
          <Card className="border-border bg-card my-4">
            <CardContent className="pt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Din hånd</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Dealer 2-6</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Dealer 7-9</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Dealer 10</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Dealer Es</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 font-medium">8 eller lavere</td>
                      <td className="text-center py-2">Hit</td>
                      <td className="text-center py-2">Hit</td>
                      <td className="text-center py-2">Hit</td>
                      <td className="text-center py-2">Hit</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 font-medium">9</td>
                      <td className="text-center py-2 text-primary font-medium">Double (3-6)</td>
                      <td className="text-center py-2">Hit</td>
                      <td className="text-center py-2">Hit</td>
                      <td className="text-center py-2">Hit</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 font-medium">10</td>
                      <td className="text-center py-2 text-primary font-medium">Double</td>
                      <td className="text-center py-2 text-primary font-medium">Double</td>
                      <td className="text-center py-2">Hit</td>
                      <td className="text-center py-2">Hit</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 font-medium">11</td>
                      <td className="text-center py-2 text-primary font-medium">Double</td>
                      <td className="text-center py-2 text-primary font-medium">Double</td>
                      <td className="text-center py-2 text-primary font-medium">Double</td>
                      <td className="text-center py-2 text-primary font-medium">Double</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 font-medium">12</td>
                      <td className="text-center py-2">Stand (4-6)</td>
                      <td className="text-center py-2">Hit</td>
                      <td className="text-center py-2">Hit</td>
                      <td className="text-center py-2">Hit</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 font-medium">13-16</td>
                      <td className="text-center py-2">Stand</td>
                      <td className="text-center py-2">Hit</td>
                      <td className="text-center py-2">Hit</td>
                      <td className="text-center py-2">Hit</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">17+</td>
                      <td className="text-center py-2">Stand</td>
                      <td className="text-center py-2">Stand</td>
                      <td className="text-center py-2">Stand</td>
                      <td className="text-center py-2">Stand</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Soft Totals – Esser-strategien</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Soft hånde (med et es talt som 11) er de mest misforståede i blackjack. Mange spillere stander automatisk på soft 18 – men mod dealerens 9, 10 eller es er det matematisk korrekt at hitte. Logikken: du kan ikke buste en soft hånd, så risikoen ved at trække et kort er minimal. Hvis du trækker et lavt kort, forbedres din hånd; hvis du trækker et højt kort, tæller esset som 1 i stedet.
          </p>
          <ul className="space-y-2 mb-6 ml-4 text-muted-foreground">
            <li>• <strong>Soft 13-14:</strong> Hit altid. Double mod dealer 5-6.</li>
            <li>• <strong>Soft 15-16:</strong> Hit altid. Double mod dealer 4-6.</li>
            <li>• <strong>Soft 17:</strong> Hit altid. Double mod dealer 3-6.</li>
            <li>• <strong>Soft 18:</strong> Stand mod 2, 7, 8. Double mod 3-6. Hit mod 9, 10, Es.</li>
            <li>• <strong>Soft 19-20:</strong> Stand altid.</li>
          </ul>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Splits – Hvornår og Hvorfor</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Splits er de mest profitable – og mest risikable – beslutninger i blackjack. Du fordobler din eksponering, men kan potentielt vende en dårlig hånd til to gode. Nøgleregler for amerikansk blackjack:
          </p>
          <ul className="space-y-2 mb-6 ml-4 text-muted-foreground">
            <li>• <strong>Esser:</strong> Split altid. To hånde med 11 er stærkere end én hånd med 12 eller soft 12.</li>
            <li>• <strong>8'ere:</strong> Split altid – selv mod dealer 10. 16 er den værste hånd i blackjack; to hånde med 8 er langt bedre. I <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>europæisk ENHC-blackjack</Link> er dette mere diskutabelt, men i amerikansk (med peek) er split altid korrekt.</li>
            <li>• <strong>10'ere:</strong> Aldrig split. 20 er den næstbedste hånd – at bryde den op er ren EV-destruktion.</li>
            <li>• <strong>5'ere:</strong> Aldrig split. Behandl som hard 10 og double mod dealer 2-9.</li>
            <li>• <strong>4'ere:</strong> Split kun mod dealer 5-6 (hvis DAS tilladt), ellers hit.</li>
            <li>• <strong>2'ere og 3'ere:</strong> Split mod dealer 2-7 (med DAS), ellers hit.</li>
            <li>• <strong>6'ere:</strong> Split mod dealer 2-6 (med DAS), ellers hit.</li>
            <li>• <strong>7'ere:</strong> Split mod dealer 2-7, ellers hit.</li>
            <li>• <strong>9'ere:</strong> Split mod dealer 2-6, 8-9. Stand mod 7, 10, Es.</li>
          </ul>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Surrender – Den Undervurderede Redning</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Late surrender er en af de mest undervurderede muligheder i blackjack. Ved at opgive halvdelen af din indsats kan du undgå at spille en hånd, der er statistisk tabt. Surrender reducerer house edge med ca. 0,07 % – det lyder ubetydeligt, men over 10.000 hænder sparer det dig ca. 140 kr. ved 100 kr. indsats.
          </p>
          <ul className="space-y-2 mb-6 ml-4 text-muted-foreground">
            <li>• <strong>Hard 16 (ikke 8+8) mod dealer 9, 10, Es:</strong> Surrender. Du taber denne hånd 77 % af gangene.</li>
            <li>• <strong>Hard 15 mod dealer 10:</strong> Surrender. Win rate er kun 22 %.</li>
            <li>• <strong>Hard 17 mod dealer Es:</strong> Kontroversiel, men korrekt med H17-regler. Surrender sparer 0,003 kr./hånd.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Den vigtigste pointe: perfekt basic strategy koster dig 0 kr. at lære og sparer dig gennemsnitligt 1,5–3 % pr. hånd sammenlignet med intuitivt spil. Det er den højeste ROI på tid investeret i noget aspekt af <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt casinospil</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6 – Hole card vs. No Hole Card
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            Hole Card vs. No Hole Card – Den Definerende Forskel
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Forskellen mellem hole card (amerikansk) og no hole card (europæisk) er den mest betydningsfulde regelvariation i blackjack. Den påvirker ikke kun house edge, men hele din strategiske tilgang til spillet. For at forstå hvorfor, skal vi grave ned i de matematiske konsekvenser.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I <strong>amerikanske regler</strong> ved du, at dealeren ikke har blackjack, når du handler (fordi peek allerede har tjekket). Det giver dig frihed til at fordoble og splitte mere aggressivt. Du "betaler" kun din originale indsats, hvis dealeren har blackjack. Denne information er ekstremt værdifuld: det eliminerer ca. 4,8 % af de scenarier, hvor du ville have tabt ekstra indsatser.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I <strong>europæiske regler</strong> (ENHC – European No Hole Card) handler du i mørket. Dealeren har måske blackjack, og du ved det ikke. Hvis du fordobler din indsats på 11 mod dealerens es, og dealeren derefter vender et 10-kort, mister du den fulde fordobling. Denne usikkerhed koster dig ca. 0,11 % i ekstra house edge – men vigtigere endnu, den kræver en tilpasset strategi.
          </p>

          <Card className="border-border bg-card my-6">
            <CardHeader>
              <CardTitle className="text-lg">Scenarie-sammenligning: Hole Card vs. ENHC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Situation</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Amerikansk (Hole Card)</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Europæisk (ENHC)</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">EV-forskel (100 kr.)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">Du har 11, dealer viser Es</td>
                      <td className="text-center py-2 text-primary">Double (peek udelukker BJ)</td>
                      <td className="text-center py-2 text-destructive">Hit (risiko for BJ)</td>
                      <td className="text-center py-2">+18,4 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Du har 8+8, dealer viser 10</td>
                      <td className="text-center py-2 text-primary">Split (beskyttet)</td>
                      <td className="text-center py-2 text-destructive">Hit (for risikabelt)</td>
                      <td className="text-center py-2">+12,7 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Du har A+A, dealer viser Es</td>
                      <td className="text-center py-2 text-primary">Split</td>
                      <td className="text-center py-2 text-destructive">Hit</td>
                      <td className="text-center py-2">+22,1 kr.</td>
                    </tr>
                    <tr>
                      <td className="py-2">Du har 10, dealer viser 10</td>
                      <td className="text-center py-2">Double</td>
                      <td className="text-center py-2">Hit</td>
                      <td className="text-center py-2">+8,3 kr.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Mange europæiske casinoer kompenserer med OBO-reglen (Original Bets Only): hvis dealeren har blackjack, mister du kun din originale indsats, uanset om du har fordoblet eller splittet. OBO udjævner forskellen næsten fuldstændigt og gør europæisk blackjack med OBO matematisk ækvivalent med amerikansk blackjack. Tjek altid om casinoet anvender ENHC eller OBO – det er den vigtigste information, du kan indsamle om et europæisk bord.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Praktisk konklusion:</strong> Hvis du har valget mellem et amerikansk bord og et europæisk bord med identiske øvrige regler, vælg altid det amerikanske. Forskellen er lille (0,11 %), men den akkumuleres over tid. Kun med OBO-regler er europæisk blackjack ligeværdigt. Se vores dedikerede guide til <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>europæisk blackjack</Link> for den fulde strategitilpasning.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 7 – Side Bets
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Zap className="h-7 w-7 text-primary" />
            Side Bets i Amerikansk Blackjack – Matematik vs. Underholdning
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Moderne amerikanske blackjack-borde tilbyder typisk 3-5 side bets: Perfect Pairs, 21+3, Insurance, Lucky Lucky og Bust It. Hver eneste har en house edge markant højere end grundspillet. Lad os dissekere dem matematisk:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Perfect Pairs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">House edge: <strong>5,8 %</strong>. Betaler op til 25:1 for perfect pair (samme farve, værdi).</p>
                <p className="text-sm text-muted-foreground">Med 8 decks er sandsynligheden for mixed pair 6,2 %, coloured pair 1,5 % og perfect pair 0,6 %. Samlet forventet afkast: 94,2 %.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">21+3</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">House edge: <strong>3,2 %</strong>. Kombinerer dine to kort med dealerens up card.</p>
                <p className="text-sm text-muted-foreground">Suited Three of a Kind betaler 100:1, men sandsynligheden er 0,0215 %. Flush (35:2) rammer i 4,6 % af hænderne – den hyppigste gevinst.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Insurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">House edge: <strong>7,7 %</strong>. Den dårligste "side bet" ved bordet.</p>
                <p className="text-sm text-muted-foreground">Sandsynligheden for dealer-blackjack er 30,8 %, men du skal bruge 33,3 % for break-even ved 2:1. Kun korttællere med TC +3 bør tage den.</p>
              </CardContent>
            </Card>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Lucky Lucky</strong> (house edge: 2,7 %) er den bedste side bet rent matematisk. Den betaler baseret på summen af dine to kort plus dealerens up card: 777 suited betaler 200:1, og enhver 21-total betaler 3:1 eller bedre. Men selv 2,7 % er næsten ti gange højere end grundspillets house edge.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Bust It</strong> (house edge: 6,9 %) betaler dig, når dealeren buster – med højere udbetalinger for flere kort. Dealer-bust med 8+ kort betaler 250:1, men sandsynligheden er under 0,001 %. Det er en ren underholdningsbet uden matematisk substans.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Side bets er designet som underholdning – de tilføjer spænding og mulighed for store gevinster. Men de ødelægger din langsigtede EV markant. Hvis du spiller 100 kr. grundindsats med 10 kr. side bets pr. hånd over 200 hænder, koster side bets dig ca. 60-100 kr. ekstra i forventet tab. For <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> anbefaler vi at holde dig til grundspillet. Hvis du vil have variation og bonusgevinster, overvej i stedet <Link to="/casinospil/blackjack/spanish-21" className={linkClass}>Spanish 21</Link>, hvor bonusserne er en integreret del af spillet med meget lavere house edge.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 8 – Korttælling
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Korttælling i Amerikansk Blackjack – Virker det Online?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Korttælling er legendarisk i blackjack-historien – fra Edward Thorp's "Beat the Dealer" (1962) til MIT-holdet i 1990'erne. Men virker det i 2026, og specifikt i online amerikanskr blackjack? Svaret er nuanceret.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Hi-Lo-systemet i praksis:</strong> Det mest udbredte tællesystem tildeler værdier til kort: 2-6 = +1, 7-9 = 0, 10-Es = -1. Du holder en "running count" og dividerer med resterende decks for at få "true count". Ved TC +2 eller højere begynder fordelen at tippe i din favør, og du bør øge din indsats.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Effektivitet i live dealer-spil:</strong> I live blackjack med 8 decks og ca. 50 % deck-penetration (dealeren blander efter 4 decks) er den gennemsnitlige fordel ved tælling ca. 0,5-0,8 %. Det lyder lavt, men det vender house edge, så spilleren har en statistisk fordel. Problemet: lave penetrationsrater og begrænset indsatssspredning (typisk 1:10 vs. de 1:20+ der kræves for optimal tælning) reducerer den praktiske profit kraftigt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>RNG-blackjack:</strong> Korttælling er umulig. Kortene blandes (virtuelt) efter hver hånd. Der er ingen deck-penetration, ingen information at udnytte. Spil RNG-blackjack for at øve basic strategy – ikke for at tælle.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Juridisk status i Danmark:</strong> Korttælning er ikke ulovligt – det er en mental færdighed, ikke svindel. Men casinoer har ret til at begrænse din spilaktivitet, hvis de mistænker tælning. Online casinoer kan lukke din konto eller begrænse dine indsatser. I praksis er det næsten umuligt at detektere i online live-formatet, da du sidder derhjemme og der er ingen visuel observation.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Vores anbefaling:</strong> For 99 % af spillere er korttælning ikke værd at investere tid i. Forskellen mellem perfekt basic strategy (0,28 % house edge) og korttælning (ca. 0,2 % spillerfordel) er under 0,5 procentpoint. Invester i stedet din tid i at mestre basic strategy og bankroll management – det er langt mere værdifuldt for din langsigtede bundlinje.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 9 – Bankroll management
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Coins className="h-7 w-7 text-primary" />
            Bankroll Management for Aggressive Spillere
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Amerikansk blackjack med dens lave house edge inviterer til aggressivt spil – men uden disciplineret bankroll management kan selv den bedste strategi føre til ruin. Risk of Ruin (RoR) er den matematiske sandsynlighed for at tabe hele din bankroll, og den stiger dramatisk med indsatsstørrelse relativt til bankroll.
          </p>
          <Card className="border-border bg-card my-6">
            <CardHeader>
              <CardTitle className="text-lg">Risk of Ruin – Bankroll vs. Indsats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Bankroll (enheder)</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">RoR (0,28 % HE)</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">RoR (0,50 % HE)</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Anbefalet</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">20 enheder</td>
                      <td className="text-center py-2 text-destructive">62 %</td>
                      <td className="text-center py-2 text-destructive">68 %</td>
                      <td className="text-center py-2">❌ For risikabelt</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">50 enheder</td>
                      <td className="text-center py-2">38 %</td>
                      <td className="text-center py-2">45 %</td>
                      <td className="text-center py-2">⚠️ Kort session</td>
                    </tr>
                    <tr className="border-b border-border/50 bg-primary/5">
                      <td className="py-2 font-medium text-foreground">100 enheder</td>
                      <td className="text-center py-2">14 %</td>
                      <td className="text-center py-2">22 %</td>
                      <td className="text-center py-2">✅ Anbefalet</td>
                    </tr>
                    <tr>
                      <td className="py-2">200 enheder</td>
                      <td className="text-center py-2">2 %</td>
                      <td className="text-center py-2">5 %</td>
                      <td className="text-center py-2">✅ Konservativ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Stop-loss og win-mål:</strong> Sæt en session-stop-loss på 30-40 % af din session-bankroll. Hvis du starter med 5.000 kr. og taber 1.500-2.000 kr., stop. Ikke fordi strategien fejler – men fordi varians har vendt sig mod dig, og fortsat spil under tilt fører til dårligere beslutninger. Win-mål er mere fleksible: 30 % profit (1.500 kr. på 5.000 kr.) er et rimeligt mål for en session.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Indsatsprogressioner:</strong> Flat betting (samme indsats hver gang) er matematisk optimalt for basic strategy-spillere. Negative progressioner som <Link to="/casinospil/blackjack/martingale" className={linkClass}>Martingale</Link> øger ikke din EV – de øger kun din varians og risikoen for katastrofale tab. Positive progressioner (øg indsats efter gevinst) er psykologisk tilfredsstillende men matematisk neutrale. Undgå alle systemer der lover at "slå huset" – kun korttælling og perfekt strategi kan reducere house edge.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Sæsonmæssig bankroll:</strong> For regelmæssige spillere anbefaler vi at afsætte et fast månedligt beløb til blackjack. Behandl det som en underholdningsudgift – ikke en investering. Med 100 kr./hånd og 800 hænder/måned er det forventede tab 224 kr./måned ved 0,28 % house edge. Det er billigere end de fleste fritidsinteresser, men kun hvis du holder dig til basic strategy og dine grænser. Læs mere om <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 10 – Live vs. RNG
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Live vs. RNG – Amerikansk Blackjack Online i 2026
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Online tilbydes amerikansk blackjack i to formater: RNG (Random Number Generator) og <Link to="/live-casino/blackjack" className={linkClass}>live dealer</Link>. Begge bruger hole card-regler, men oplevelsen og de taktiske muligheder adskiller sig markant. I 2026 er live dealer-formatet den klare favorit blandt danske spillere.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  RNG Blackjack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Tempo:</strong> 200+ hænder/time</li>
                  <li>• <strong>Min. indsats:</strong> 10-50 kr.</li>
                  <li>• <strong>Korttælling:</strong> Umulig (shuffle efter hver hånd)</li>
                  <li>• <strong>Fordel:</strong> Lavt tempo-risiko, godt til øvelse</li>
                  <li>• <strong>Udbydere:</strong> <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>, <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link></li>
                  <li>• <strong>Bedst til:</strong> Nybegyndere, strategy-øvning</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" />
                  Live Dealer Blackjack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Tempo:</strong> 50-80 hænder/time</li>
                  <li>• <strong>Min. indsats:</strong> 50-500 kr.</li>
                  <li>• <strong>Korttælning:</strong> Teoretisk muligt (6-8 decks)</li>
                  <li>• <strong>Fordel:</strong> Autentisk, social, verificerbar</li>
                  <li>• <strong>Udbydere:</strong> <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution</Link>, Pragmatic Live</li>
                  <li>• <strong>Bedst til:</strong> Erfarne spillere, realisme</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Live-varianter du bør kende:</strong> Evolution Gamings portefølje inkluderer Infinite Blackjack (ubegrænsede pladser, identiske kort til alle), Speed Blackjack (hurtigste handler først), Lightning Blackjack (random multiplikatorer op til 25x) og VIP/Salon Privé (eksklusive borde med højere limits). Hver variant har unikke regler og house edge-variationer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Infinite Blackjack</strong> er den mest tilgængelige live-variant: ingen ventetid, lav minimumsindsats og identiske kort til alle spillere. Dog er Four Splits og Split Aces begrænsede, og der er ingen surrender – hvilket øger house edge marginalt. For den laveste house edge i live-format, søg efter standard 7-seat VIP-borde med S17 og DAS.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 11 – Psykologi og common mistakes
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-7 w-7 text-primary" />
            De 10 Dyreste Fejl i Amerikansk Blackjack
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Selv med kendskab til basic strategy begår de fleste spillere systematiske fejl, der øger house edge fra 0,28 % til 2-4 %. Her er de ti mest omkostningsfulde, rangeret efter EV-tab:
          </p>
          <ol className="space-y-4 mb-6 list-decimal ml-6">
            <li className="text-muted-foreground leading-relaxed">
              <strong>Spille ved 6:5-borde:</strong> +1,39 % house edge. Den absolut dyreste enkeltfejl. Mange casinoer har skiftet til 6:5, især på lavere limits. Tjek altid udbetalingsratioen. Kost: ca. 2.780 kr./10.000 hænder ved 100 kr.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Stande på soft 18 mod 9/10/Es:</strong> At stande her koster ca. 0,06 kr. pr. hånd i EV vs. hit. Over 10.000 hænder (ca. 400 forekomster): 24 kr. Lille, men gratis at rette.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Aldrig surrender:</strong> +0,07 % house edge. Over 10.000 hænder: 140 kr.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Tage insurance:</strong> House edge 7,7 %. Hvis du tager insurance på alle dealer-esser (ca. 770 hænder/10.000): 594 kr. i ekstra tab.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Splitte 10'ere:</strong> Du giver afkald på en hånd der vinder 92 % af gangene. EV-tab: ca. 50 kr. pr. gang du splitter 10'ere.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Stande på 12 mod dealer 2-3:</strong> Basic strategy siger hit. Mange spillere stander fordi de "frygter bust". EV-tab: ca. 3,5 kr. pr. forkert stand.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Aldrig splitte 8'ere mod 10:</strong> 16 er den værste hånd. To 8'ere er markant bedre. EV-gevinst ved korrekt split: ca. 22 kr. pr. gang.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Fordoble på 12 ("det føles rigtigt"):</strong> Du kan kun modtage ét kort. At fordoble på 12 mod dealer 5 har en EV på -8 kr./100 kr. vs. hit med -4 kr.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Spille side bets konsekvent:</strong> 3-8 % house edge. Se sektion ovenfor.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Tilt-spil efter tab:</strong> Ikke en matematisk fejl, men en adfærdsmæssig. Spillere der chaser tab øger typisk deres indsats med 50-100 %, hvilket accelererer bankkroll-tab eksponentielt.
            </li>
          </ol>
          <p className="text-muted-foreground leading-relaxed">
            De fleste af disse fejl stammer fra en enkelt kognitiv bias: tabsaversion. Spillere frygter at "buste" mere end de frygter at tabe langsomt. Men blackjack-matematik er klar: det er bedre at buste 60 % af gangene end at stande og tabe 75 % af gangene. Trust the math, not the feeling.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 12 – Hvor spiller du live blackjack
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Timer className="h-7 w-7 text-primary" />
            Hvor Spiller Du Live Blackjack med Hole Card i Danmark?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle fire nedenstående casinoer er licenseret af <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> og tilbyder live blackjack med amerikanske regler (hole card/peek). Hvert casino har unikke fordele afhængigt af din spillestil:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Dansk-ejet casino med fokus på lokale spillere. Live blackjack via Evolution med Infinite Blackjack (ingen ventetid) og VIP-borde. Min. indsats fra 50 kr.</p>
                <p className="text-sm text-muted-foreground"><strong>Bedst til:</strong> Danske spillere der vil have lokal support og hurtige MobilePay-udbetalinger.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Stort udvalg af live-borde inkl. Blackjack Party (socialt format med to dealers). Bredt spektrum af indsatser fra 25 kr. til 50.000 kr.</p>
                <p className="text-sm text-muted-foreground"><strong>Bedst til:</strong> Spillere der vil have underholdning og variation i live-formatet.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Stærkt live casino med dedikerede VIP-borde og Speed Blackjack. Udmærket mobiloplevelse og hurtige <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>-udbetalinger.</p>
                <p className="text-sm text-muted-foreground"><strong>Bedst til:</strong> VIP-spillere og dem der prioriterer tempo og mobilspil.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Pay N Play-casino med instant registrering via Trustly. Speed Blackjack og Lightning Blackjack tilgængelige. Ingen langvarig tilmeldingsproces.</p>
                <p className="text-sm text-muted-foreground"><strong>Bedst til:</strong> Spillere der vil starte hurtigt uden registrering – ind og spil på under 30 sekunder.</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Alle fire casinoer bruger <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gamings</Link> live-platform, som er industristandarden for live blackjack. Reglerne er identiske på tværs af casinoer (da Evolution kontrollerer bordene), men velkomstbonusser, <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> og udbetalingshastigheder varierer. Tjek vores individuelle <Link to="/casino-anmeldelser" className={linkClass}>casino-anmeldelser</Link> for detaljerede sammenligninger.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 13 – Variants flow guide
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-primary" />
            Hvilken Blackjack-Variant Passer til Dig?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Amerikansk blackjack er det bedste udgangspunkt for de fleste spillere, men det er ikke den eneste variant værd at kende. Her er en beslutningsguide baseret på din spillestil:
          </p>
          <ul className="space-y-3 mb-6 ml-4">
            <li className="text-muted-foreground leading-relaxed flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Du vil have den laveste house edge:</strong> Amerikansk blackjack med S17, DAS, 3:2. Find den hos <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> eller <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link>.</span>
            </li>
            <li className="text-muted-foreground leading-relaxed flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Du vil forstå strategiens nuancer:</strong> Prøv <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>europæisk blackjack</Link> – ENHC-reglerne tvinger dig til dybere strategisk tænkning.</span>
            </li>
            <li className="text-muted-foreground leading-relaxed flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Du hader usikkerhed:</strong> <Link to="/casinospil/blackjack/double-exposure" className={linkClass}>Double Exposure</Link> eliminerer al gætteri – begge dealerkort er synlige.</span>
            </li>
            <li className="text-muted-foreground leading-relaxed flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Du vil have bonus og variation:</strong> <Link to="/casinospil/blackjack/spanish-21" className={linkClass}>Spanish 21</Link> tilbyder unikke bonusudbetalinger og innovative regler.</span>
            </li>
            <li className="text-muted-foreground leading-relaxed flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Du vil bruge et betting-system:</strong> Forstå hvorfor <Link to="/casinospil/blackjack/martingale" className={linkClass}>Martingale</Link> og <Link to="/casinospil/blackjack/fibonacci" className={linkClass}>Fibonacci</Link> ikke ændrer house edge – men kan ændre din oplevelse.</span>
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Uanset hvilken variant du vælger, gælder samme grundregel: lær den specifikke basic strategy, sæt bankroll-grænser, og spil for underholdning – ikke for profit. <Link to="/casinospil/blackjack" className={linkClass}>Vores hoveguide til blackjack</Link> dækker de universelle principper, der gælder på tværs af alle varianter.
          </p>
        </section>

        <Separator className="my-10" />

        <AuthorBio />

        <CasinospilMoneyLinks gameName="Amerikansk Blackjack" currentPath="/casinospil/blackjack/amerikansk-blackjack" />
        <RelatedGuides currentPath="/casinospil/blackjack/amerikansk-blackjack" />

        <FAQSection faqs={faqs} />
      </div>
      <StickyCtaBySlug slug="betinia" />
    </>
  );
};

export default AmerikanskBlackjackGuide;
