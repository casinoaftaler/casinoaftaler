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
        style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}
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
              Den mest spillervenlige blackjack-variant takket være peek-reglen. Alt du behøver at vide.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="25 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Amerikansk blackjack-bord med kort og chips i atmosfærisk belysning" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 – Hvad er amerikansk blackjack?
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Eye className="h-7 w-7 text-primary" />
            Hvad er amerikansk blackjack – og hvorfor dominerer den?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Amerikansk blackjack er den mest udbredte variant globalt og den standard, de fleste spillere tænker på, når de hører "blackjack". Dens definerende mekanik er <strong>hole card-reglen</strong>: dealeren modtager to kort fra starten – ét åbent (up card) og ét skjult (hole card). Denne tilsyneladende simple forskel har fundamentale konsekvenser for strategi, house edge og spilleroplevelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hole card-systemet stammer fra de tidlige Las Vegas-casinoer i 1950'erne, hvor det blev indført for at øge tempoet og reducere tvister. Konceptet er elegant: dealeren tjekker sit hole card for blackjack (via en "peek"), før spillerne handler. Hvis dealeren har blackjack, afsluttes runden øjeblikkeligt, og spillerne mister kun deres originale indsats – ikke fordoblinger eller splits.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne mekanisme er afgørende, fordi den beskytter spilleren mod den værste situation: at investere ekstra penge (fordobling, split) mod en ubevidst dealer-blackjack. I <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>europæisk blackjack</Link>, hvor dealeren ikke har et hole card, risikerer du at fordoble din indsats og derefter finde ud af, at dealeren havde blackjack hele tiden. Denne regel alene reducerer house edge med ca. 0,11 procentpoint.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Sammenlign med andre varianter: <Link to="/casinospil/blackjack/double-exposure" className={linkClass}>Double Exposure</Link> giver endnu mere information (begge dealerkort synlige), men kompenserer med strengere regler. <Link to="/casinospil/blackjack/spanish-21" className={linkClass}>Spanish 21</Link> fjerner 10'erne fra kortbunken for at tilbyde flere bonusgevinster. Amerikansk blackjack rammer et sweet spot mellem information, fairness og spilletempo.
          </p>
        </section>

        <InlineCasinoCards title="Casinoer med bedst amerikansk blackjack" count={4} />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 – Regler i detaljer
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            Reglerne i detaljer – Fra dealing til udbetaling
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Amerikansk blackjack spilles typisk med 6 eller 8 kortspil, blandet i en shoe. Målet er identisk med alle blackjack-varianter: slå dealerens hånd uden at overstige 21. Men de specifikke regler varierer mellem casinoer, og hver variation påvirker house edge.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  Standard Regler
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
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Variationer der øger house edge
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
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Peek-mekanismen i praksis:</strong> Når dealerens up card er et es, tilbydes insurance (2:1-sidebet). Derefter peeker dealeren. Har dealeren blackjack → runden slutter. Insurance-tagere får 2:1, øvrige mister indsats. Når up card er 10/J/Q/K peeker dealeren også, men uden insurance-tilbud. Denne sekvens sikrer, at ingen spiller nogensinde fordobler eller splitter mod en uopdaget blackjack.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det er vigtigt at forstå, at ikke alle "amerikanske" blackjack-borde har identiske regler. Casinoer justerer individuelle parametre for at finjustere house edge. De mest spillervenlige borde kombinerer S17 + 3:2 + DAS (Double After Split) + late surrender. De værste borde har H17 + 6:5 + ingen surrender – en kombination der øger house edge fra ca. 0,4 % til over 2 %. Tjek altid bordets regelkort, før du sætter dig.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 – House edge matematik
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            House edge-matematik – Tallene bag varianten
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
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50 bg-primary/5">
                      <td className="py-2 font-medium text-foreground">Amerikansk Blackjack (S17)</td>
                      <td className="text-center py-2">0,28 %</td>
                      <td className="text-center py-2">✅ Ja</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2"><Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>Europæisk Blackjack</Link></td>
                      <td className="text-center py-2">0,39 %</td>
                      <td className="text-center py-2">❌ Nej</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2"><Link to="/casinospil/blackjack/double-exposure" className={linkClass}>Double Exposure</Link></td>
                      <td className="text-center py-2">0,69 %</td>
                      <td className="text-center py-2">Begge synlige</td>
                    </tr>
                    <tr>
                      <td className="py-2"><Link to="/casinospil/blackjack/spanish-21" className={linkClass}>Spanish 21</Link></td>
                      <td className="text-center py-2">0,40 %</td>
                      <td className="text-center py-2">✅ Ja</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>EV-beregning pr. session:</strong> Med en gennemsnitlig indsats på 100 kr. og 200 hænder pr. session (ca. 2 timer) er den samlede indsats 20.000 kr. Ved 0,28 % house edge er det forventede tab 56 kr. Til sammenligning: ved <Link to="/casinospil/roulette" className={linkClass}>europæisk roulette</Link> med 200 spins af 100 kr. er det forventede tab 540 kr. – næsten ti gange højere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Variansen er dog høj i blackjack. Standardafvigelsen pr. hånd er ca. 1,14 × indsatsen, hvilket betyder, at dit faktiske resultat over 200 hænder typisk vil svinge mellem -2.000 kr. og +1.800 kr. House edge er kun synlig over tusindvis af hænder – i korte sessioner dominerer tilfældighed.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 – Optimal strategi
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            Optimal Basic Strategy for Amerikansk Blackjack
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Basic strategy for amerikansk blackjack er næsten identisk med den generelle <Link to="/casinospil/blackjack" className={linkClass}>blackjack basic strategy</Link>, men med enkelte justeringer baseret på hole card-reglen. Fordi du ved, at dealeren <em>ikke</em> har blackjack (pga. peek), kan du være marginalt mere aggressiv:
          </p>
          <ul className="space-y-3 mb-6 ml-4">
            <li className="text-muted-foreground leading-relaxed">
              <strong>Fordobling mod 10/Es:</strong> I amerikansk blackjack kan du trygt fordoble på 11 mod dealerens 10, fordi peek allerede har udelukket blackjack. I europæisk ENHC bør du overveje at hitte i stedet.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Split af 8'ere:</strong> Altid split – uanset dealerens kort. I europæisk blackjack med ENHC er split af 8'ere mod dealer-10 mere diskutabel, fordi du risikerer at miste begge indsatser mod en blackjack.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Surrender:</strong> Sen surrender mod 9, 10 og es er en kraftig EV-optimering. Surrender 16 mod 9/10/es og 15 mod 10. Mange spillere undervurderer surrenders værdi – den reducerer house edge med ca. 0,07 %.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Insurance:</strong> Aldrig – medmindre du korttæller. Insurance har en standalone house edge på 7,7 %, og den er uafhængig af din hånds styrke.
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Den vigtigste pointe: perfekt basic strategy koster dig 0 kr. at lære og sparer dig gennemsnitligt 1,5–3 % pr. hånd sammenlignet med intuitivt spil. Det er den højeste ROI på tid investeret i noget aspekt af <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt casinospil</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5 – Hole card vs. No Hole Card
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            Hole Card vs. No Hole Card – Detaljeret sammenligning
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Forskellen mellem hole card (amerikansk) og no hole card (europæisk) er den mest betydningsfulde regelvariation i blackjack. Den påvirker ikke kun house edge, men hele din strategiske tilgang.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I <strong>amerikanske regler</strong> ved du, at dealeren ikke har blackjack, når du handler (fordi peek allerede har tjekket). Det giver dig frihed til at fordoble og splitte mere aggressivt. Du "betaler" kun din originale indsats, hvis dealeren har blackjack.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I <strong>europæiske regler</strong> (ENHC – European No Hole Card) handler du i mørket. Dealeren har måske blackjack, og du ved det ikke. Hvis du fordobler din indsats på 11 mod dealerens es, og dealeren derefter vender et 10-kort, mister du den fulde fordobling. Denne usikkerhed koster dig ca. 0,11 % i ekstra house edge.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Mange europæiske casinoer kompenserer med OBO-reglen (Original Bets Only): hvis dealeren har blackjack, mister du kun din originale indsats, uanset om du har fordoblet eller splittet. OBO udjævner forskellen næsten fuldstændigt og gør europæisk blackjack med OBO matematisk ækvivalent med amerikansk blackjack. Tjek altid om casinoet anvender ENHC eller OBO.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6 – Side bets
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Zap className="h-7 w-7 text-primary" />
            Side Bets i Amerikansk Blackjack – Underholdning eller Fælde?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Moderne amerikanske blackjack-borde tilbyder typisk 3-5 side bets: Perfect Pairs, 21+3, Insurance, Lucky Lucky og Bust It. Hver eneste har en house edge markant højere end grundspillet:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Perfect Pairs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">House edge: <strong>5,8 %</strong>. Betaler op til 25:1 for perfect pair (samme farve, værdi). Matematisk set er sandsynligheden for enhver pair kun 7,5 % med 8 decks.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">21+3</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">House edge: <strong>3,2 %</strong>. Kombinerer dine to kort med dealerens up card til poker-hænder. Suited Three of a Kind betaler 100:1, men sandsynligheden er 0,02 %.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Insurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">House edge: <strong>7,7 %</strong>. Den dårligste "side bet" ved bordet. Sandsynligheden for dealer-blackjack er 30,8 %, men du skal bruge 33,3 % for break-even ved 2:1.</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Side bets er designet som underholdning – de tilføjer spænding og mulighed for store gevinster. Men de ødelægger din langsigtede EV markant. Hvis du spiller 100 kr. grundindsats med 10 kr. side bets pr. hånd over 200 hænder, koster side bets dig ca. 60-100 kr. ekstra i forventet tab. For <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> anbefaler vi at holde dig til grundspillet.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 7 – Hvornår vælge amerikansk
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-primary" />
            Hvornår bør du vælge amerikansk blackjack?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Amerikansk blackjack er det optimale valg i følgende scenarier:
          </p>
          <ul className="space-y-3 mb-6 ml-4">
            <li className="text-muted-foreground leading-relaxed">
              <strong>Du spiller aggressivt med fordoblinger og splits:</strong> Hole card-reglen beskytter dine ekstra indsatser. Hvis du primært flat-better uden fordoblinger, er forskellen minimal.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Du værdsætter tempo:</strong> Peek-reglen afslutter runder med dealer-blackjack øjeblikkeligt, hvilket giver et hurtigere flow end europæiske varianter.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Du vil have den lavest mulige house edge:</strong> Med identiske regler (S17, DAS, 3:2) er amerikansk blackjack altid marginalt bedre end europæisk ENHC.
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Vælg i stedet <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>europæisk blackjack med OBO-regler</Link> hvis du foretrækker et roligere tempo, eller <Link to="/casinospil/blackjack/spanish-21" className={linkClass}>Spanish 21</Link> hvis du ønsker mere variation og bonusgevinster. Alle varianter er tilgængelige hos de bedste <Link to="/casino-anmeldelser" className={linkClass}>danske licenserede casinoer</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 8 – Live vs. RNG
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Live vs. RNG – Amerikansk Blackjack Online
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Online tilbydes amerikansk blackjack i to formater: RNG (Random Number Generator) og <Link to="/live-casino/blackjack" className={linkClass}>live dealer</Link>. Begge bruger hole card-regler, men oplevelsen og de taktiske muligheder adskiller sig markant.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>RNG-blackjack</strong> blander kortene efter hver hånd, hvilket gør korttælling umulig. Tempoet er højt (200+ hænder/time), og minimumsindsatserne er typisk lave (10-50 kr.). Det er ideelt til at øve basic strategy uden tidspres.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Live blackjack</strong> bruger fysiske kort med 6-8 decks. Tempoet er lavere (50-80 hænder/time), men du kan observere kortene fysisk, og der er en social dimension. Udbydere som <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> tilbyder varianter som Infinite Blackjack (ubegrænsede pladser) og Lightning Blackjack (multiplikatorer).
          </p>
        </section>

        <Separator className="my-10" />

        <AuthorBio />

        <RelatedGuides currentPath="/casinospil/blackjack/amerikansk-blackjack" />

        <FAQSection faqs={faqs} />
      </div>
    </>
  );
};

export default AmerikanskBlackjackGuide;
