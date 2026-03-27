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
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import danskespilForside from "@/assets/screenshots/danskespil-forside.png";
import { CasinospilMoneyLinks } from "@/components/CasinospilMoneyLinks";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  Percent,
  Activity,
  Target,
  BarChart3,
  Brain,
  Users,
  Zap,
  Layers,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Gauge,
  Dices,
  LineChart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import lotteriHero from "@/assets/heroes/online-lotteri-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

/* ── FAQ ── */
const lotteriFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Kan lotteri nogensinde have positiv EV?",
    answer:
      "Teoretisk ja – men ekstremt sjældent. Positiv EV kan opstå, når en progressiv jackpot akkumulerer tilstrækkeligt store beløb uden vinder. Eksempelvis kan Eurojackpot ved 120 mio. € nærme sig break-even-EV. Men tre faktorer reducerer den reelle EV: (1) Jackpot-deling – jo større jackpotten er, desto flere spillere køber kuponer, og sandsynligheden for at dele gevinsten stiger. (2) Skattemæssige konsekvenser – i Danmark 15 % gevinstafgift. (3) Tidsværdi af penge – nutidsværdien af en engangsgevinst er lavere end det nominelle beløb. I praksis har lotterier næsten aldrig positiv reel EV.",
  },
  {
    question: "Er online lotteri fair?",
    answer:
      "Ja – reguleret online lotteri i Danmark er fair i den forstand, at sandsynlighederne er korrekte og trækningerne tilfældige. Spillemyndigheden overvåger alle licenserede operatører, og uafhængige revisorer verificerer RNG-systemer (Random Number Generators) regelmæssigt. Trækninger for statslige lotterier (Lotto, Eurojackpot) foregår fysisk med certificeret udstyr. 'Fair' betyder dog ikke 'profitabel for spilleren' – house edge på 40-60 % er designet ind i spillet. Fairness handler om korrekte sandsynligheder og transparent gevinststruktur, ikke om spillerens forventede profit.",
  },
  {
    question: "Er andelsspil (syndikater) bedre end solo?",
    answer:
      "Andelsspil ændrer ikke den forventede værdi pr. indsat krone – EV forbliver negativ uanset antal deltagere. Hvad andelsspil gør, er at reducere variansen: du køber flere kombinationer med en lavere individuel indsats, hvilket øger sandsynligheden for at ramme noget. Men gevinsten deles tilsvarende. Med et 10-personers syndikat har du 10× højere vindchance, men kun 1/10 af gevinsten. Den matematiske forventning er identisk. Andelsspil er primært en social aktivitet og en metode til at reducere individuel risiko – ikke en strategi til at forbedre odds.",
  },
  {
    question: "Hvorfor er odds i lotterier så ekstremt lave?",
    answer:
      "Odds i lotterier styres af kombinatorik: antallet af mulige kombinationer vokser eksplosivt med antal tal. I Lotto (7 af 36) er der C(36,7) = 8.347.680 mulige kombinationer – hver lige sandsynlig. I Eurojackpot (5 af 50 + 2 af 12) er der C(50,5) × C(12,2) = 139.838.160 kombinationer. Disse store tal er en direkte konsekvens af spildesignet: flere tal og større talpool = flere kombinationer = lavere odds = større potentielle jackpots. Det er en bevidst afvejning: lave odds skaber de enorme jackpots, der driver salget.",
  },
  {
    question: "Kan man analysere tidligere lottotal for at finde mønstre?",
    answer:
      "Nej – og forsøget er et skoleeksempel på gambler's fallacy. Lotteritræninger er uafhængige hændelser: hvert tal har præcis den samme sandsynlighed ved hver trækning, uanset hvad der skete i foregående trækninger. At et tal ikke er trukket i 50 trækninger gør det hverken mere eller mindre sandsynligt ved den næste. Statistiske analyser af historiske data kan vise frekvensfordelinger, men disse afspejler blot tilfældighed over et begrænset datasæt – de har ingen prædiktiv værdi. Ingen software, ingen algoritme og ingen ekspert kan forudsige lotterital.",
  },
  {
    question: "Hvad er gambler's fallacy i lotterisammenhæng?",
    answer:
      "Gambler's fallacy er den fejlagtige tro, at tilfældige hændelser er 'selvkorrigerende'. I lotterisammenhæng manifesterer den sig typisk som: 'Tal 7 er ikke trukket i 20 trækninger, så det er forsinket og mere sandsynligt nu.' Matematisk er dette forkert: sandsynligheden for hvert tal er identisk ved hver trækning (1/36 for Lotto). De foregående 20 trækninger har ingen kausal indflydelse på den 21. Fallacyen opstår, fordi mennesker intuitivt forventer, at små stikprøver afspejler den langsigtede fordeling – men tilfældighed kræver ingen lokal balance.",
  },
  {
    question: "Er lotteri værre end spillemaskiner rent matematisk?",
    answer: (
      <>
        Ja – markant. <Link to="/casinospil/spillemaskiner" className={linkClass}>Spillemaskiner</Link> har typisk 94-97 % RTP (3-6 % house edge), mens lotterier har 40-60 % RTP (40-60 % house edge). For hver 100 kr. indsat taber du gennemsnitligt 3-6 kr. på slots mod 40-60 kr. på lotteri. Det er 10-20 gange dyrere pr. indsat krone. Lotterier kompenserer med livsendrende jackpots – noget spillemaskiner sjældent tilbyder (undtagen progressive jackpots). Valget afhænger af, om du prioriterer spilletid pr. krone (slots) eller maksimalt gevinstpotentiale pr. krone (lotteri).
      </>
    ),
  },
  {
    question: "Hvad betyder 'progressiv jackpot' i lotterisammenhæng?",
    answer:
      "En progressiv jackpot er en præmiepulje, der vokser for hver trækning uden vinder. I Lotto og Eurojackpot 'ruller' førstepræmien over til næste trækning, hvis ingen rammer alle tal. Psykologisk skaber dette en accelererende købsimpuls: jo større jackpotten er, desto flere spillere køber kuponer, hvilket øger jackpotten yderligere. Men større jackpot ændrer ikke sandsynligheden for at vinde – den er fast. Og flere spillere øger sandsynligheden for jackpot-deling. Progressiv jackpot-mekanikken er designet til at maksimere kupon-salg via perceptuel værdiskabelse – ikke til at forbedre spillerens reelle odds.",
  },
];

const OnlineLotteriGuide = () => {
  const faqJsonLd = buildFaqSchema(lotteriFaqs);

  const articleSchema = buildArticleSchema({
    headline: "Online Lotteri – Jackpot-Sandsynlighed og Regressionsanalyse",
    description: "Dybdegående analyse af lotteri-sandsynligheder: kombinatorik, EV, house edge, regression to the mean og jackpot-psykologi.",
    url: `${SITE_URL}/casinospil/online-lotteri`,
    datePublished: "2026-02-15",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  // BreadcrumbList is auto-generated by SEO.tsx via buildBreadcrumbListSchema() – no manual injection needed.

  return (
    <>
      <SEO
        title="Online Lotteri – Jackpot-Sandsynlighed & EV-Analyse"
        description="Lotteri-sandsynligheder analyseret: Kombinatorik, EV, house edge og regression to the mean. Se matematikken bag jackpots og hvad odds reelt betyder."
        jsonLd={[articleSchema, faqJsonLd]}
      />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Calculator className="mr-1.5 h-3.5 w-3.5" /> Sandsynlighedsanalyse</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Online Lotteri – Jackpot-Odds og Regressionsanalyse</h1>
            <p className="text-lg text-white/80">Kombinatorik, forventet værdi og den reelle pris for drømmen – en matematisk gennemgang.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="28 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={lotteriHero} alt="Matematisk analyse af lotteri-sandsynligheder" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ── H2 1 ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Calculator className="mr-2 inline h-6 w-6 text-primary" />
            Hvad er online lotteri – matematisk defineret
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Lotteri er den simpleste og samtidig den mest asymmetriske form for gambling. Matematisk defineret er et lotteri et spil, hvor spilleren vælger en kombination af tal fra en defineret pool, og en tilfældig trækning afgør, om kombinationen matcher. Sandsynligheden for en fuldstændig match er ekstremt lav – typisk i intervallet 1:1 million til 1:300 millioner – og <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> er den højeste af alle regulerede spilformer: 40-60 % mod 0,5-6 % for casinospil.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne asymmetri er ikke en fejl – den er designets kerne. Lotterier fungerer ved at opkræve en høj pris (i form af house edge) for at finansiere en enkelt, livsendrende gevinst. I stedet for at returnere 97 % af indsatserne i form af hyppige, små gevinster (som spillemaskiner), koncentrerer lotterier præmiepuljen i få, massive udbetalinger. Resultatet er et spil med den laveste forventede tilbagebetaling – men det højeste maksimale gevinstpotentiale pr. indsat krone.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Online lotteri i Danmark opererer inden for den samme matematiske ramme som fysiske lotterier. Danske Spil (statsejet) driver Lotto og Eurojackpot med faste sandsynlighedsstrukturer, certificeret trækningsudstyr og regulatorisk tilsyn fra Spillemyndigheden. Online casinoer med dansk licens tilbyder desuden lotteriinspirerede spil – Keno, skrabespil og nummerbaserede instant-win-spil – med deres egne RTP-profiler og house edge-værdier.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Denne guide analyserer lotteri fra et rent sandsynlighedsteoretisk perspektiv: kombinatorik, forventet værdi, varians, regression to the mean og den psykologiske mekanik bag progressiv jackpot-akkumulering. Formålet er ikke at anbefale eller fraråde lotterispil, men at give en præcis matematisk forståelse af, hvad du betaler for – og hvad du reelt kan forvente.
          </p>
        </section>

        <ReviewScreenshot
          src={danskespilForside}
          alt="Danske Spil forside med Lotto, Eurojackpot og skrabespil – Danmarks officielle lotteriudbyder"
          caption="Danske Spil er den primære udbyder af online lotteri i Danmark med Lotto og Eurojackpot"
        />

        {/* ── H2 2 ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Target className="mr-2 inline h-6 w-6 text-primary" />
            Sandsynlighedsstruktur i klassiske lotterier
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle lotterier deler en fundamental struktur: en defineret talpool, et antal tal der skal vælges, og en tilfældig trækningsmekanisme. Sandsynligheden for at matche alle tal bestemmes udelukkende af poolstørrelsen og antal valgte tal. Der er ingen færdigheds- eller strategikomponent – hvert tal har præcis den samme sandsynlighed for at blive trukket.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Dansk Lotto:</strong> Vælg 7 tal ud af 36. Trækningsmekanismen udvælger 7 tilfældige tal. For at vinde førstepræmien skal alle 7 matche. Sandsynligheden er 1:8.347.680. Trækning foregår onsdag og lørdag med fysiske kugler i en certificeret maskine. Udover førstepræmien gives gevinst for 4, 5 og 6 rigtige tal, hvilket skaber en trappeformet gevinststruktur med faldende præmier og stigende sandsynligheder.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Eurojackpot:</strong> Vælg 5 tal ud af 50 plus 2 Euronumre ud af 12. Sandsynligheden for førstepræmien er 1:139.838.160 – ca. 17 gange sværere end dansk Lotto. Den massive forskel skyldes den større talpool og det ekstra lag af Euronumre. Til gengæld er præmiepuljen proportionalt større: op til 120 millioner euro (~900 mio. kr.), fordi 18+ europæiske lande bidrager. Trækning foregår tirsdag og fredag.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Keno:</strong> Vælg 1-15 tal ud af 80. 20 tal trækkes tilfældigt (RNG-baseret online). Sandsynlighedsstrukturen er fleksibel: færre valgte tal giver højere matchsandsynlighed men lavere potentiel gevinst. Keno er det mest dynamiske lotterispil, fordi spilleren kontrollerer sin risikoprofil via antal valgte tal. RTP varierer fra ca. 60 % (mange valgte tal) til ca. 75 % (få valgte tal) – markant højere end traditionelle lotterier, men stadig lavere end casinospil.
          </p>
        </section>

        {/* ── H2 3 ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Dices className="mr-2 inline h-6 w-6 text-primary" />
            Kombinatorik forklaret – hvorfor odds er ekstreme
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Lotteri-odds beregnes via kombinatorik – specifikt binomialkoefficienten, der angiver antallet af måder at vælge k elementer fra en mængde af n, uden hensyn til rækkefølge:
          </p>

          <Card className="mb-6 border-border">
            <CardContent className="pt-6">
              <p className="text-center text-lg font-mono font-semibold mb-2">
                C(n, k) = n! / (k! × (n − k)!)
              </p>
              <p className="text-center text-sm text-muted-foreground">
                Hvor n er poolstørrelsen, k er antal valgte tal, og ! er fakultetsfunktionen.
              </p>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            For dansk Lotto (7 af 36): C(36, 7) = 36! / (7! × 29!) = 8.347.680 mulige kombinationer. Hver kombination er lige sandsynlig, så sandsynligheden for at ramme alle 7 er præcis 1/8.347.680 = 0,0000001198 = 0,00001198 %. Med andre ord: hvis du køber én kupon pr. trækning (2 trækninger pr. uge), forventer du statistisk set at vinde førstepræmien én gang hvert 80.266 år.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For Eurojackpot er beregningen todelt: C(50, 5) × C(12, 2) = 2.118.760 × 66 = 139.838.160 kombinationer. Sandsynligheden for førstepræmien er 1/139.838.160 = 0,000000007151 = 0,0000007151 %. Med 2 trækninger pr. uge forventes statistisk set én førstepræmie hvert 1.344.597 år pr. kupon.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den eksponentielle vækst i kombinationer er nøglen til at forstå lotteriodds. Tilføjelse af blot ét ekstra tal til poolen øger antallet af kombinationer dramatisk. C(36, 7) = 8,3 mio., men C(40, 7) = 18,6 mio. – mere end fordoblet ved kun 4 ekstra tal. C(50, 7) = 99,8 mio. Denne ikke-lineære vækst er grunden til, at internationale lotterier (med større pools) har langt lavere odds end nationale lotterier.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Perspektivering hjælper: Sandsynligheden for at vinde Eurojackpots førstepræmie (1:139,8 mio.) er sammenlignelig med at flippe en fair mønt og få plat 27 gange i træk (1:134 mio.). Eller at vælge den rigtige sekund i en 4,4-årig periode. Disse tal er intuitivt ufatteligt små – hvilket er præcis grunden til, at mennesker systematisk overvurderer deres vindchance. Vores hjerner er ikke designet til at processere sandsynligheder i denne størrelsesorden.
          </p>
        </section>

        {/* ── H2 4 ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Layers className="mr-2 inline h-6 w-6 text-primary" />
            Jackpot-sandsynlighed vs mindre gevinster
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Lotterier har en trappeformet gevinststruktur: sandsynligheden stiger markant for lavere gevinstniveauer, mens præmiebeløbet falder tilsvarende. I dansk Lotto:
          </p>

          <Card className="mb-6 border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Dansk Lotto – sandsynligheder pr. gevinstniveau
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rigtige tal</TableHead>
                    <TableHead>Sandsynlighed</TableHead>
                    <TableHead>Ca. odds</TableHead>
                    <TableHead>Typisk gevinst</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-medium">7 af 7</TableCell><TableCell>0,0000120 %</TableCell><TableCell>1:8.347.680</TableCell><TableCell>2–30+ mio. kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">6 af 7</TableCell><TableCell>0,000243 %</TableCell><TableCell>1:411.180</TableCell><TableCell>50.000–200.000 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">5 af 7</TableCell><TableCell>0,00232 %</TableCell><TableCell>1:43.146</TableCell><TableCell>1.000–5.000 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">4 af 7</TableCell><TableCell>0,0139 %</TableCell><TableCell>1:7.191</TableCell><TableCell>50–200 kr.</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Mønsteret er klart: fra 4 til 7 rigtige stiger sandsynligheden med faktor ~6 pr. niveau nedad, mens gevinsten falder med faktor ~20-50. Den samlede RTP-bidrag fra hver gevinstklasse er ujævnt fordelt: førstepræmien bidrager den største andel af den samlede RTP (fordi præmiebeløbet er massivt), mens de lavere niveauer bidrager mindre – trods højere sandsynlighed.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne fordeling har en vigtig konsekvens for den typiske spilleroplevelse: de fleste kuponer giver ingen gevinst overhovedet. I dansk Lotto er den samlede sandsynlighed for en hvilken som helst gevinst ca. 1:55 (1,8 %). Det betyder, at 98,2 % af alle kuponer er totale tab. Den gennemsnitlige spiller køber snesevis af kuponer mellem hver gevinst – og gevinsterne er typisk på de laveste niveauer (4 rigtige = 50-200 kr.).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Psykologisk skaber denne struktur en kraftig asymmetri: spilleren oplever primært tab (98,2 % af gangene) med sjældne, små gevinster (der ofte er lavere end kuponprisen) – men motiveres af den abstrakte mulighed for en jackpot, der statistisk set aldrig vil ske for det enkelte individ. Det er denne asymmetri, der gør lotterier til den mest profitable spilform for operatøren og den dyreste for spilleren.
          </p>
        </section>

        {/* ── H2 5 ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Calculator className="mr-2 inline h-6 w-6 text-primary" />
            Expected Value (EV) i lotterier
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Expected Value (EV) er den mest præcise metrik til at evaluere ethvert væddemål. Formlen er:
          </p>

          <Card className="mb-6 border-border">
            <CardContent className="pt-6">
              <p className="text-center text-lg font-mono font-semibold mb-2">
                EV = Σ (Sandsynlighed_i × Gevinst_i) – Kuponpris
              </p>
              <p className="text-center text-sm text-muted-foreground">
                Summeret over alle mulige gevinstniveauer i.
              </p>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            For dansk Lotto med en kuponpris på 50 kr. og en typisk førstepræmie på 5 mio. kr.: EV ≈ (1/8.347.680 × 5.000.000) + (bidrag fra lavere niveauer) – 50 kr. ≈ 0,60 + ~21,90 – 50 = -27,50 kr. Den forventede værdi er ca. -27,50 kr. pr. kupon – et tab på 55 % af kuponprisen. Med andre ord: for hver 100 kr. du investerer i Lotto, forventer du statistisk at få ca. 45 kr. tilbage.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Eurojackpot har en marginalt bedre EV-profil: med ca. 50 % RTP taber du statistisk ~50 øre pr. indsat krone. Den højere RTP skyldes en mere effektiv præmiepulje-struktur og lavere administrationsomkostninger pr. kupon (fordelt over flere landes spillere).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at sætte disse tal i perspektiv: en spiller, der køber én Lotto-kupon pr. uge (50 kr.) i 10 år, investerer 26.000 kr. med en forventet tilbagebetaling på ca. 11.700 kr. – et nettotab på 14.300 kr. Statistisk set vil denne spiller vinde 4 rigtige ~9 gange (gevinst: ~900 kr. totalt), 5 rigtige ~1 gang (gevinst: ~2.000 kr.) og aldrig ramme 6 eller 7 rigtige. Den forventede "profit" fra disse smågevinster dækker kun en brøkdel af de samlede kuponudgifter.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            EV-analysen afslører lotteriets fundamentale natur: det er en frivillig skat på drømmen. Du betaler en defineret pris (kuponprisen × house edge) for retten til at drømme om en livsendrende gevinst, der statistisk set aldrig vil materialisere sig. Om den drøm er pengene værd, er et subjektivt spørgsmål – men den matematiske pris er objektiv og kvantificerbar.
          </p>
        </section>

        {/* ── H2 6 ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <TrendingUp className="mr-2 inline h-6 w-6 text-primary" />
            Når jackpotten vokser – ændrer EV sig?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ja – EV ændrer sig, når en progressiv jackpot akkumulerer. Fordi sandsynligheden for at vinde er fast, men gevinstbeløbet stiger, øger en voksende jackpot den forventede værdi af en kupon. Spørgsmålet er: kan jackpotten vokse tilstrækkeligt til at gøre EV positiv?
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For dansk Lotto med 50 kr. kuponpris: break-even-EV kræver en jackpot, der alene giver kuponprisen tilbage i forventet værdi. Med sandsynlighed 1/8.347.680 kræves en jackpot på 8.347.680 × 50 = 417.384.000 kr. (~417 mio. kr.) – plus de lavere gevinstniveauers bidrag, der reducerer kravet til ca. 380 mio. kr. Danske Lotto-jackpots når sjældent over 30 mio. kr., så positiv EV er praktisk umuligt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For Eurojackpot er situationen mere nuanceret. Med maksimal jackpot på 120 mio. €: break-even-EV kræver ca. 120 mio. € ved den aktuelle sandsynlighed – hvilket er tæt på den maksimale jackpot. Men tre faktorer reducerer den reelle EV markant: (1) <strong>Jackpot-deling:</strong> Når jackpotten er høj, køber flere kuponer, og sandsynligheden for at dele førstepræmien stiger. Ved 100 mio. €-jackpots estimeres den gennemsnitlige deling til 1,5-2,5 vindere, hvilket halverer eller reducerer den individuelle gevinst. (2) <strong>Skatte- og afgiftsbyrde:</strong> 15 % gevinstafgift i Danmark reducerer nettogevinsten. (3) <strong>Tidsværdi:</strong> Store jackpots udbetales ofte som annuiteter, hvor nutidsværdien er lavere end den nominelle.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Konklusion: selv ved de højeste jackpots er lotteri-EV i praksis aldrig positiv, når jackpot-deling, skat og tidsværdi medregnes. Den teoretiske break-even er en akademisk mulighed – ikke en reel investeringsmulighed. Spillere, der øger deres kuponforbrug ved høje jackpots, reagerer på en perceptuel værdistigning, der ikke afspejles i den reelle EV.
          </p>
        </section>

        {/* ── H2 7 ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <LineChart className="mr-2 inline h-6 w-6 text-primary" />
            Regression to the mean – hvad betyder det i lotteri?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Regression to the mean er et statistisk fænomen, hvor ekstreme observationer i et datasæt efterfølges af mere gennemsnitlige observationer. I lotteri­sammenhæng misforstås begrebet ofte fundamentalt – og denne misforståelse driver en hel industri af "lotteri-analyse"-tjenester.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Korrekt fortolkning: Hvis et bestemt tal har forekommet usædvanligt hyppigt i de seneste 50 trækninger, vil dets frekvens over de <em>næste</em> 1.000 trækninger sandsynligvis nærme sig den forventede gennemsnitlige frekvens – ikke fordi fremtidige trækninger "kompenserer," men fordi nye tilfældige data udvander den initiale afvigelse. Regression to the mean siger <em>intet</em> om den enkelte næste trækning.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fejlfortolkning (gambler's fallacy variant): "Tal 23 er ikke trukket i 30 trækninger, så det er 'forsinket' og vil snart dukke op." Denne logik forudsætter, at tilfældige trækninger er afhængige – at systemet "husker" og "korrigerer." Lotteritræninger er per definition uafhængige: den næste træknings sandsynligheder er identiske uanset alle tidligere trækninger. Tal 23 har stadig præcis 7/36 = 19,4 % chance for at optræde i næste Lotto-trækning – hverken mere eller mindre.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne misforståelse har praktiske konsekvenser. Tusindvis af hjemmesider sælger "hot and cold numbers"-analyser, "forsinkede tal"-oversigter og mønstergenkendelsesværktøjer til lotterispillere. Disse produkter udnytter en kognitiv bias: mennesker er hardwired til at finde mønstre, selv i rent tilfældige data. Intet historisk lotteridatasæt indeholder information om fremtidige trækninger – at analysere det er matematisk meningsløst.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Regression to the mean er reel som statistisk lov – men den opererer kun over store datasæt og siger intet om individuelle hændelser. At bruge den som grundlag for talvalg i lotterier er en fundamental misforståelse af begrebets rækkevidde og applicerbarhed.
          </p>
        </section>

        {/* ── H2 8 ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Activity className="mr-2 inline h-6 w-6 text-primary" />
            Varians og risiko – højeste volatilitet i gambling
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Lotterier har den højeste volatilitet af alle regulerede spilformer – højere end <Link to="/casinospil/game-shows" className={linkClass}>game shows</Link>, spillemaskiner og alle bordspil. Standardafvigelsen pr. kupon er ekstrem: for dansk Lotto med 50 kr. indsats og potentiel 5 mio. kr. jackpot er standardafvigelsen ca. 1.730 kr. – mere end 34 gange kuponprisen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Til sammenligning har et roulettevæddemål (even money) en standardafvigelse på ca. 1× indsatsen, en spilleautomat typisk 5-15× indsatsen, og et game show som Crazy Time ca. 50-100× indsatsen. Lotteri slår dem alle med 30-50× indsatsen – og for Eurojackpot er tallet endnu højere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne ekstreme volatilitet betyder, at den "typiske" lotterioplelvelse og den "gennemsnitlige" lotterioplelvelse er fundamentalt forskellige. Medianudbyttet pr. kupon er 0 kr. (de fleste kuponer giver intet). Gennemsnitsudbyttet er ~22,50 kr. (45 % RTP × 50 kr.). Forskellen skyldes, at sjældne, massive jackpots trækker gennemsnittet op – mens medianen forbliver nul. Denne skæve fordeling er lotteriers definerende karakteristik.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Risk of ruin (RoR) i lotterispil er i praksis 100 %: over tilstrækkeligt mange kuponer vil enhver spiller tabe. Det er ikke en risiko, men en matematisk sikkerhed. Den eneste variable er <em>hastigheden</em> af tabet, der bestemmes af kuponfrekvens og -pris. En spiller, der bruger 100 kr./uge på lotteri, taber ca. 55 kr./uge (2.860 kr./år) i forventet tab. Over 30 år: ca. 85.800 kr. i kumuleret forventet tab.
          </p>
        </section>

        {/* ── H2 9 ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Percent className="mr-2 inline h-6 w-6 text-primary" />
            House edge i lotterier vs casinospil
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En direkte sammenligning afslører den enorme forskel i pris pr. indsat krone mellem lotterier og casinospil:
          </p>

          <Card className="mb-6 border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                House edge – komplet spiltype-sammenligning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Spiltype</TableHead>
                    <TableHead>House Edge</TableHead>
                    <TableHead>RTP</TableHead>
                    <TableHead>Forventet tab / 1.000 kr.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-medium"><Link to="/casinospil/blackjack" className={linkClass}>Blackjack</Link> (optimal)</TableCell><TableCell>~0,5 %</TableCell><TableCell>~99,5 %</TableCell><TableCell>5 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Baccarat (Banker)</TableCell><TableCell>1,06 %</TableCell><TableCell>98,94 %</TableCell><TableCell>10,60 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/casinospil/roulette" className={linkClass}>Roulette</Link> (europæisk)</TableCell><TableCell>2,7 %</TableCell><TableCell>97,3 %</TableCell><TableCell>27 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/casinospil/spillemaskiner" className={linkClass}>Spillemaskiner</Link></TableCell><TableCell>3–6 %</TableCell><TableCell>94–97 %</TableCell><TableCell>30–60 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium"><Link to="/casinospil/game-shows" className={linkClass}>Game Shows</Link></TableCell><TableCell>3–10 %</TableCell><TableCell>90–97 %</TableCell><TableCell>30–100 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Keno</TableCell><TableCell>25–40 %</TableCell><TableCell>60–75 %</TableCell><TableCell>250–400 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Skrabespil</TableCell><TableCell>15–45 %</TableCell><TableCell>55–85 %</TableCell><TableCell>150–450 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Lotto</TableCell><TableCell>~55 %</TableCell><TableCell>~45 %</TableCell><TableCell>550 kr.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Eurojackpot</TableCell><TableCell>~50 %</TableCell><TableCell>~50 %</TableCell><TableCell>500 kr.</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tabellen taler sit eget tydelige sprog: lotteri er 10-100 gange dyrere pr. indsat krone end casinospil. For hver 1.000 kr. indsat taber du statistisk 550 kr. på Lotto – mod 5 kr. på blackjack. Forskellen er ikke marginal; den er en størrelsesorden.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Årsagen til lotteriets ekstreme house edge er strukturel: en stor del af kuponprisen finansierer ikke-præmierelaterede omkostninger. I dansk Lotto fordeles kuponprisen ca. således: ~45 % til præmiepuljen, ~15 % til administration og drift, ~25-30 % til statskassen (skat/afgift) og ~10-15 % til detailhandlerprovisioner. Casinospil har en markant enklere omkostningsstruktur med lavere eksterne afgifter.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den relevante sammenligning er dog ikke bare house edge, men <em>hvad du køber for pengene</em>. Lotto tilbyder en chance for en 5-30 mio. kr. gevinst for 50 kr. – en leverage-ratio på 100.000-600.000:1. Ingen casinoindsats på 50 kr. kan give den samme potentielle multiplikator. Lotterispillere betaler en enorm pris pr. krone, men de køber adgang til et gevinstpotentiale, som casinospil simpelthen ikke kan levere.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── H2 10 ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <ShieldCheck className="mr-2 inline h-6 w-6 text-primary" />
            Online vs statslige lotterier – forskelle i struktur
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Strukturelt adskiller online lotterier sig fra statslige lotterier på tre centrale parametre: regulering, RTP-profil og trækningsmekanisme. Statslige lotterier (Danske Spils Lotto, Eurojackpot) er reguleret via monopol-lovgivning med statskassen som primær beneficiant – house edge er bevidst sat højt for at generere skatteindtægter. Online lotteriinspirerede spil (Keno, skrabespil hos licenserede casinoer) er reguleret via den danske spillelov med lavere, men stadig betydelig house edge.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Trækningsmekanismen varierer: statslige lotterier bruger fysisk udstyr (kugler, trækemaskiner) med offentlig tilgængelig trækning – gennemsigtigheden er høj. Online lotteriinspirerede spil bruger RNG-software certificeret af uafhængige testlaboratorier. Begge metoder er matematisk tilfældige, men den perceptuelle tillid er forskellig: mange spillere har højere tillid til fysiske trækninger, selvom RNG-systemer er mindst lige så (og ofte mere) tilfældige.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            RTP-profilen er markant forskellig: statslige lotterier (40-50 % RTP) er designet til at maksimere statens indtægt, mens online skrabespil og Keno (55-85 % RTP) er mere konkurrencedygtige, fordi de opererer i et licenseret, men åbent marked. Spilleren får dermed markant mere spilletid og hyppigere gevinster pr. krone investeret i online lotteriinspirerede spil end i traditionelle statslige lotterier.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            En tredje kategori er internationale lotteriagenter – tjenester, der køber kuponer på spillerens vegne i udenlandske lotterier (PowerBall, Mega Millions). Disse opererer i en juridisk gråzone i Danmark og er ikke reguleret af Spillemyndigheden. Risikoen er dobbelt: ingen garanteret udbetalingsbeskyttelse og potentielle skattemæssige komplikationer ved udenlandske gevinster. For danske spillere anbefales udelukkende Spillemyndighed-regulerede lotterier.
          </p>
        </section>

        {/* ── H2 11 ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Users className="mr-2 inline h-6 w-6 text-primary" />
            Syndikater og andelsspil – ændrer det odds?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Lotterisyndikater (andelsspil) er grupper af spillere, der sammen køber et større antal kuponer og deler eventuelle gevinster. Spørgsmålet er: ændrer dette den matematiske forventning?
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Svaret er nej – og forklaringen er enkel. Lad os bruge et eksempel: et syndikat med 10 medlemmer køber 10 kuponer til dansk Lotto (samlet investering: 500 kr., individuel: 50 kr.). Sandsynligheden for mindst én jackpot-gevinst er 10 × (1/8.347.680) = 1/834.768. Men gevinsten deles med 10, så den forventede individuelle gevinst er (1/834.768 × jackpot/10) = (1/8.347.680 × jackpot) – præcis det samme som at købe én kupon alene.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvad syndikater <em>ændrer</em>, er variansstrukturen. Med 10 kuponer har du 10× højere sandsynlighed for <em>en eller anden</em> gevinst (inklusive lavere niveauer), men den individuelle gevinst er 1/10 af det samlede beløb. Effekten er en lavere varians: du vil opleve gevinster hyppigere, men de vil være mindre. For spillere, der foretrækker en jævnere oplevelse (hyppigere, lavere gevinster fremfor sjælden, massiv gevinst), kan syndikater være attraktive – men den matematiske forventning er identisk.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den praktiske fordel ved syndikater er social: fælles deltagelse, delt spænding, og reduceret individuel økonomisk risiko. Den praktiske ulempe er, at en eventuel stor gevinst deles – og historisk har jackpot-delinger i syndikater ført til betydelige juridiske konflikter. Hvis du deltager i et syndikat, anbefales en skriftlig aftale om gevinstfordeling.
          </p>
        </section>

        {/* ── H2 12 ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <AlertTriangle className="mr-2 inline h-6 w-6 text-primary" />
            Myter om "tal der er forsinkede"
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En af de mest udbredte myter i lotteriverdenen er forestillingen om "forsinkede" eller "kolde" tal – tal, der ikke er trukket i lang tid og derfor angiveligt er "skyldige" og mere sandsynlige ved næste trækning. Denne tro er en manifestation af gambler's fallacy og har ingen matematisk basis.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Lotteritrækningen er det, matematikere kalder en "uafhængig hændelse med erstatning." Hvert tal har præcis den samme sandsynlighed for at blive trukket ved hver trækning, uanset historik. I dansk Lotto er sandsynligheden for, at et specifikt tal trækkes: 7/36 = 19,4 %. Dette gælder, hvad enten tallet er trukket i de seneste 10 trækninger eller ikke er trukket i 100 trækninger. Kuglerne har ingen hukommelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Men: er det ikke usandsynligt, at et tal udebliver i 100 trækninger? Jo – men det er en observation om fortiden, ikke en forudsigelse om fremtiden. Sandsynligheden for, at et specifikt tal <em>ikke</em> trækkes i en enkelt trækning er 29/36 = 80,6 %. Over 100 trækninger: (29/36)^100 = 0,000000027 = 0,0000027 % – ekstremt usandsynligt. Men hvis det allerede er sket, ændrer det ikke den fremtidige sandsynlighed. De 100 trækninger er allerede gennemført; den 101. trækning starter med friske 19,4 %-odds for hvert tal.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Industrien af "lotteri-analysesoftware" omsætter for millioner globalt – alt baseret på denne fejlslutning. Varmekort, frekvensoversigter, "forsinkelses-alerts" og "intelligente talvælgere" har alle nul prædiktiv værdi. Den eneste effekt er at give spilleren en illusion af kontrol og analyse, der reducerer den opfattede tilfældighed af spillet – og dermed øger spillerens engagement og forbrug. Det er et psykologisk produkt, ikke et matematisk værktøj.
          </p>
        </section>

        {/* ── H2 13 ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Brain className="mr-2 inline h-6 w-6 text-primary" />
            Progressiv jackpot-psykologi
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Progressiv jackpot-mekanikken – hvor præmiepuljen vokser for hver trækning uden vinder – er et af de mest effektive salgsværktøjer i gambling-industrien. Når Eurojackpots førstepræmie stiger fra 20 mio. € til 80 mio. €, stiger kuponsalget markant – ofte med 200-400 %. Men sandsynligheden for at vinde er uændret: stadig 1:139.838.160. Det, der ændrer sig, er kun præmiebeløbet og spillernes perception.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Psykologisk aktiverer en voksende jackpot to kognitive mekanismer: (1) <strong>Tilgængeligheds-heuristik:</strong> Store jackpots genererer medieomtale, hvilket gør forestillingen om at "vinde" mere mentalt tilgængelig og dermed perceptuelt mere sandsynlig. (2) <strong>Tabsaversion-asymmetri:</strong> Når jackpotten er "høj," føler spilleren, at "det ville være synd at gå glip af denne chance" – selvom chancen er identisk med alle andre trækninger. FOMO (Fear Of Missing Out) driver kuponsalg mere end rationel vurdering.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Mediedækningen af jackpots er bevidst asymmetrisk: aviser og tv rapporterer om rekord-jackpots og vindere, men aldrig om de millioner af tabere. Denne selektive rapportering forstærker tilgængeligheds-heuristikken og skaber en perceptuel verden, hvor lotterigevinster virker hyppigere og mere tilgængelige, end de reelt er.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Lotteri-operatørerne er fuldt bevidste om disse mekanismer. Progressiv jackpot-design, mediestrategier og trækningsfrekvens (to gange ugentligt = optimal akkumuleringshastighed) er alle optimeret til at maksimere den psykologiske påvirkning – og dermed salget. At forstå disse mekanismer gør dig ikke immun, men det giver dig mulighed for at træffe mere informerede beslutninger om dit forbrug.
          </p>
        </section>

        {/* ── H2 14 ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Gauge className="mr-2 inline h-6 w-6 text-primary" />
            Bankroll og realisme i lotterispil
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Lotterispil kræver en fundamentalt anderledes bankroll-tilgang end casinospil. I casinospil (blackjack, roulette, slots) handler bankroll management om at overleve varians og maksimere spilletid. I lotteri handler det udelukkende om at kontrollere det kumulerede forventede tab over tid.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Budgettering:</strong> Med 55 % house edge i Lotto er dit forventede tab 55 % af din samlede investering. Et månedligt lotteribudget på 200 kr. (4 kuponer) giver et forventet månedligt tab på 110 kr. og et årligt forventet tab på 1.320 kr. Spørgsmålet er: er 1.320 kr. årligt en acceptabel pris for den underholdningsværdi, du får? Sammenlignet med andre underholdningsformer (biograf: ~1.500 kr./år for 10 ture; streaming-abonnement: ~1.200 kr./år) er lotteri i denne størrelsesorden en sammenlignelig underholdningsudgift.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Realisme:</strong> Den statistisk mest sandsynlige livsoplevelse for en dansk Lotto-spiller, der spiller ugentligt i 50 år (5.200 kuponer), er: aldrig at ramme 6+ rigtige, ramme 5 rigtige 2-3 gange (samlet ~6.000-10.000 kr.), ramme 4 rigtige ca. 70-90 gange (samlet ~5.000-15.000 kr.), og investere ca. 260.000 kr. i kuponer. Nettoresultat: tab på ca. 235.000-249.000 kr. over 50 år.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den ansvarlige tilgang til lotterispil er identisk med enhver anden underholdningsudgift: sæt et fast budget, hold dig til det, og betragt pengene som brugt i det øjeblik, du køber kuponen. Lotteri er ikke en investering, en opsparingsstrategi eller en pensionsplan – det er en underholdningsudgift med en ekstremt lille sandsynlighed for en ekstraordinær bonus. Læs mere om sunde spillevaner i vores guide til <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
          </p>
        </section>

        {/* ── H2 15 ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Users className="mr-2 inline h-6 w-6 text-primary" />
            Hvem bør spille lotteri – og hvem bør undgå det?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Lotterispil er ikke egnet for alle – og beslutningen bør baseres på en ærlig vurdering af individuel økonomi, risikopræference og motivation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Lotteri kan passe til dig, hvis:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Du har råd til at tabe 100 % af din investering uden økonomisk konsekvens</li>
                  <li>• Du betragter kuponprisen som en underholdningsudgift – ikke en investering</li>
                  <li>• Du nyder drømmen og forventningen uafhængigt af resultatet</li>
                  <li>• Du kan overholde et fast, begrænset budget konsekvent</li>
                  <li>• Du forstår, at sandsynligheden for at vinde stort er infinitesimal</li>
                  <li>• Du spiller socialt (syndikat, familie) og værdisætter fællesskabet</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Lotteri passer ikke til dig, hvis:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Du spiller med penge, du ikke har råd til at tabe</li>
                  <li>• Du betragter lotteri som en "investering" eller "opsparingsstrategi"</li>
                  <li>• Du øger dit forbrug ved høje jackpots (FOMO-drevet adfærd)</li>
                  <li>• Du bruger "systemer" og tror, du kan øge dine odds</li>
                  <li>• Du søger den laveste house edge (vælg <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> i stedet)</li>
                  <li>• Du har tendens til at jage tab eller spille kompulsivt</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den mest ansvarlige tilgang til lotteri er at betragte det som præcis det, det matematisk er: en underholdningsudgift med en ekstrem lav sandsynlighed for en bonus. Ligesom du betaler for en biograf­billet uden at forvente at få pengene tilbage, bør en lotterikupon købes med den fulde forventning om tab – og den minimale, men reelle drøm om at vinde.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For en komplet oversigt over alle casinospil og deres respektive odds, besøg vores <Link to="/casinospil" className={linkClass}>casinospil-oversigt</Link>. For spiltyper med markant lavere house edge, se vores guides til <Link to="/casinospil/roulette" className={linkClass}>roulette</Link> og <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link>.
          </p>
        </section>

        <CasinospilMoneyLinks gameName="Online Lotteri" currentPath="/casinospil/online-lotteri" />
        <LatestNewsByCategory pagePath="/casinospil/online-lotteri" />
        <RelatedGuides currentPath="/casinospil/online-lotteri" />
        <FAQSection title="Ofte stillede spørgsmål om online lotteri" faqs={lotteriFaqs} />
        <AuthorBio />
      </div>
      <StickyCtaBySlug slug="spilleautomaten" />
    </>
  );
};

export default OnlineLotteriGuide;
