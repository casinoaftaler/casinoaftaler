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
  Target, BarChart3, Eye, Brain, BookOpen, AlertTriangle,
  TrendingUp, Scale, Shield, Calculator, Coins, Users,
  ShieldCheck, Layers, Timer, Award, Shuffle, Gamepad2,
  CheckCircle, XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/poker-strategi-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er den vigtigste poker-strategi for begyndere?",
    answer: "Den vigtigste begynderstrategi er tight-aggressive (TAG) spil: spil færre hænder, men spil dem aggressivt. Fokuser på position, starthands-selektion og pot odds. Undgå at limpe (bare calle pre-flop) – enten raise eller fold.",
  },
  {
    question: "Hvordan beregner man pot odds?",
    answer: "Pot odds beregnes som forholdet mellem pot-størrelsen og det beløb du skal calle. Eksempel: Potten er 100 kr., og du skal calle 20 kr. Pot odds er 100:20 = 5:1 (16,7 %). Hvis din sandsynlighed for at ramme din draw er større end 16,7 %, er callet profitabelt.",
  },
  {
    question: "Hvad er en GTO-strategi i poker?",
    answer: "GTO (Game Theory Optimal) er en matematisk balanced strategi der ikke kan udnyttes af modstanderen. I praksis blander GTO value-bets og bluffs i optimale ratios, og adjusterer bet-sizing for at gøre modstanderen indifferent mellem call og fold.",
  },
  {
    question: "Hvor stor skal min poker-bankroll være?",
    answer: "For cash games anbefales minimum 20-30 buy-ins for det level du spiller. For turneringer anbefales 50-100 buy-ins på grund af højere varians. Eksempel: For NL50 (50 kr. buy-in) bør din bankroll være mindst 1.000-1.500 kr.",
  },
  {
    question: "Hvad er forskellen på exploitative og GTO-strategi?",
    answer: (
      <>
        GTO-strategi er matematisk uudnyttelig men maksimerer ikke profit mod svage spillere. Exploitative strategi afviger fra GTO for at udnytte specifikke leaks hos modstandere – f.eks. at bluffe mere mod tight spillere eller value-bette tyndere mod calling stations. Læs mere om pokervarianter i vores <Link to="/casinospil/poker" className={linkClass}>poker hub</Link>.
      </>
    ),
  },
  {
    question: "Hvordan håndterer man tilt i poker?",
    answer: "Tilt-management er en bankroll-beskyttelsesstrategi. De mest effektive metoder er: 1) Sæt stop-loss grænser (f.eks. max 3 buy-ins pr. session). 2) Tag pauser efter store tab. 3) Fokuser på beslutningskvalitet, ikke resultater. 4) Undgå at spille træt, beruset eller emotionelt påvirket.",
  },
  {
    question: "Hvad er c-bet strategi og hvornår skal man c-bette?",
    answer: "Continuation bet (c-bet) er en bet på flopet af preflop-aggressor. Optimal c-bet frekvens afhænger af board texture, antal modstandere og din range. Generelt: c-bet 60-70 % heads-up på tørre boards (A-7-2), men kun 30-40 % på våde boards (J-T-9) eller multiway.",
  },
  {
    question: "Hvad er 3-bet og 4-bet strategi?",
    answer: "En 3-bet er en re-raise preflop (f.eks. nogen raiser, du re-raiser). En 4-bet er en raise over en 3-bet. Optimal 3-bet range afhænger af position: fra BTN vs. CO kan du 3-bette bredt (12-15 % af hænder), mens du fra UTG bør 3-bette tightere (3-5 %). 4-bet range er typisk polariseret: premium hænder (AA, KK, AKs) plus bluffs (A5s, A4s).",
  },
  {
    question: "Hvordan læser man modstanderes ranges?",
    answer: "Range-reading er processen med at indsnævre modstanderens mulige hænder baseret på deres handlinger. Hver action eliminerer hænder: en UTG raise eliminerer svage hænder, en check på flopet eliminerer ofte stærke hænder, og en stor river-bet polariserer rangen til stærke hænder og bluffs. Jo flere datapunkter, jo præcisere range-estimate.",
  },
  {
    question: "Er poker et heldspil eller et færdighedsspil?",
    answer: "Poker er et færdighedsspil med et held-element. På kort sigt (100-500 hænder) dominerer held/varians. På mellemlang sigt (5.000-10.000 hænder) begynder skill at skinne igennem. På lang sigt (50.000+ hænder) er resultater næsten udelukkende bestemt af færdighed. Professionelle pokerspillere har konsekvent positive resultater over hundredtusindvis af hænder.",
  },
];

const faqJsonLd = buildFaqSchema(faqs.map((f) => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));

const articleSchema = buildArticleSchema({
  headline: "Poker Strategi 2026 – EV-modeller, Positionsspil & Bankroll Management",
  description: "Avanceret dansk poker strategi-guide. Lær positionsspil, pot odds, implied odds, GTO-koncepter og bankroll management.",
  datePublished: "2026-03-02",
  dateModified: "2026-03-02",
  url: `${SITE_URL}/casinospil/poker/poker-strategi`,
  image: `${SITE_URL}/og/poker-strategi.jpg`,
});

export default function PokerStrategiGuide() {
  return (
    <>
      <SEO
        title="Poker Strategi Guide 2026 – EV, Position & Bankroll"
        description="Avanceret dansk poker strategi-guide. Lær positionsspil, pot odds, EV-beregninger, GTO-koncepter og bankroll management. Fra begynder til professionelt niveau."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(220 60% 20%), hsl(240 50% 18%) 40%, hsl(200 70% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Brain className="mr-1.5 h-3.5 w-3.5" /> Avanceret Strategi – Marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Poker Strategi – EV-modeller, Positionsspil & Bankroll Management
            </h1>
            <p className="text-lg text-white/80">
              Fra pot odds til GTO-koncepter. Denne guide dækker alt du behøver for at hæve dit pokerspil fra begynder til avanceret niveau med matematisk funderede strategier.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="60 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Professionel poker-spiller analyserer hånd med matematiske overlays" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ═══════════ SEKTION 1: Strategiens fundament ═══════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Strategiens fundament – hvorfor matematik slår intuition
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Poker er det eneste casinospil, hvor du spiller mod andre spillere – ikke mod huset. Casinoet tjener sin fortjeneste via rake (en procentdel af hver pot), mens din profit kommer fra at spille bedre end dine modstandere. Denne fundamentale forskel betyder, at poker er et færdighedsspil med et held-element, ikke omvendt. Over 50.000+ hænder er resultater næsten udelukkende bestemt af strategisk færdighed.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>De fire strategiske søjler:</strong> Al poker-strategi kan reduceres til fire fundamentale komponenter: 1) <em>Starthands-selektion</em> – hvilke hænder du spiller. 2) <em>Position</em> – hvornår du handler i forhold til dine modstandere. 3) <em>Matematisk beslutningstagning</em> – pot odds, EV-beregninger og sandsynligheder. 4) <em>Modstanderlæsning</em> – at forstå og udnytte modstandernes tendenser og fejl. Begyndere fokuserer typisk kun på søjle 1 (starthænder), mens professionelle optimerer alle fire søjler simultant.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Tight-Aggressive (TAG) vs. Loose-Aggressive (LAG):</strong> De to dominerende spillestile i moderne poker er TAG og LAG. TAG spiller færre hænder (20-25 % VPIP) men spiller dem aggressivt – dette er den anbefalede begynderstil, fordi den minimerer fejl og maksimerer gevinst fra stærke hænder. LAG spiller flere hænder (28-35 % VPIP) og bruger aggression til at vinde potter uden showdown – dette er den avancerede stil, der kræver dybere forståelse af ranges, board textures og modstandertendenser.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Resultater vs. beslutninger:</strong> Det vigtigste mindset-skift for nye pokerspillere er at fokusere på <em>beslutningskvalitet</em> fremfor resultater. Du kan lave den perfekte all-in med AA preflop og tabe mod 72o, der rammer to par. Det ændrer ikke, at din beslutning var korrekt. Over tid belønner poker gode beslutninger matematisk – men på kort sigt kan varians producere resultater der tilsyneladende modsiger dette. Disciplinen til at fastholde optimal strategi trods kortsigtede tab er det, der adskiller vindende spillere fra tabende.
          </p>
        </section>

        {/* ═══════════ SEKTION 2: Positionsspil ═══════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Positionsspil – den mest undervurderede strategiske fordel
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Position er den mest fundamentale og samtidig mest undervurderede faktor i poker-strategi. At handle sidst giver dig information om alle andre spilleres handlinger, før du skal træffe din beslutning. Denne informationsfordel er kvantificerbar: spillere i position (IP) vinder gennemsnitligt 10-15 % mere end spillere ud af position (OOP) med identiske starthænder.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Positions-hierarkiet forklaret</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I et standard 6-max No Limit Hold'em spil er positionerne rangeret fra værst til bedst: Small Blind (SB) → Big Blind (BB) → Under the Gun (UTG) → Hijack (HJ) → Cutoff (CO) → Button (BTN). Buttonen er den mest profitable position, fordi du altid handler sidst post-flop. SB er den mindst profitable, fordi du handler næstsidst pre-flop men altid først post-flop.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Winrate efter position (bb/100 hænder, typisk vinnende spiller)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Position</th>
                      <th className="py-2 text-left font-semibold">VPIP</th>
                      <th className="py-2 text-left font-semibold">PFR</th>
                      <th className="py-2 text-left font-semibold">Winrate (bb/100)</th>
                      <th className="py-2 text-left font-semibold">Bemærkning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold">SB</td><td className="py-2">28-35 %</td><td className="py-2">22-28 %</td><td className="py-2 text-destructive">-15 til -25</td><td className="py-2">Altid tabende pga. OOP + blind</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">BB</td><td className="py-2">35-45 %</td><td className="py-2">8-14 %</td><td className="py-2 text-destructive">-10 til -20</td><td className="py-2">Tab minimeres via forsvar</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">UTG</td><td className="py-2">15-18 %</td><td className="py-2">14-17 %</td><td className="py-2">+2 til +8</td><td className="py-2">Tight range kompenserer OOP</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">HJ</td><td className="py-2">18-22 %</td><td className="py-2">17-21 %</td><td className="py-2">+5 til +12</td><td className="py-2">Solid middleposition</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">CO</td><td className="py-2">24-30 %</td><td className="py-2">22-28 %</td><td className="py-2">+10 til +20</td><td className="py-2">Stærk stealing position</td></tr>
                    <tr className="bg-muted/30"><td className="py-2 font-bold">BTN</td><td className="py-2 font-bold">32-40 %</td><td className="py-2 font-bold">28-35 %</td><td className="py-2 font-bold text-primary">+20 til +35</td><td className="py-2 font-bold">Mest profitable position</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Tallene er entydige: en typisk vinder i online poker har en VPIP (Voluntarily Put money In Pot) på ca. 22-28 % overall, men dette fordeles ekstremt ujævnt: 15-18 % fra early position, 22-28 % fra middle position, og 30-40 % fra late position. Denne starthands-selektion afspejler den massive EV-fordel positionen giver.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Praktisk positions-strategi</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Early position (UTG/UTG+1):</strong> Åbn kun de stærkeste 15-18 % af hænder: store par (AA-TT), AK, AQ, AJs, KQs. Din strategi er value-heavy, fordi du handler først og er ude af position post-flop. Undgå suited connectors og small pairs fra UTG – de har ikke tilstrækkelig implied odds til at kompensere for positions-handicappet.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Middle position (HJ):</strong> Udvid dit range til 18-22 %: tilføj TT-77, AJo, KQo, QJs, JTs, T9s. Du har bedre position end UTG, men der er stadig 3-4 spillere bag dig. Hold fokus på hænder med god postflop-playability.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Late position (CO/BTN):</strong> Her åbner du 25-40 % af hænder. Fra cutoff: tilføj 66-22, A9s-A2s, KJs, QTs, suited connectors ned til 54s. Fra button: endnu bredere – ethvert Ace, ethvert suited King, suited connectors ned til 32s mod tight blinds. Din positions-fordel post-flop er så stor, at du kan profitabelt spille mange marginale hænder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Blinds (SB/BB):</strong> Fra SB bør du primært 3-bette (re-raise) eller folde – calling er den værste option, fordi du er OOP mod raiser og har BB bag dig. Fra BB forsvarer du mod steals med ca. 30-45 % af hænder (bredere mod late position-raises), men husk at du spiller OOP post-flop, hvilket reducerer din realiserede equity.
          </p>
        </section>

        {/* ═══════════ SEKTION 3: EV-modeller ═══════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Expected Value (EV) – matematikken bag profitable beslutninger
          </h2>

          <h3 className="text-xl font-semibold text-foreground mb-3">Grundlæggende EV-beregning</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            EV (Expected Value) er det gennemsnitlige resultat af en beslutning over mange gentagelser. Formlen er: EV = (sandsynlighed for gevinst × gevinstbeløb) – (sandsynlighed for tab × tabsbeløb). Eksempel: Du har en flush draw på turn (9 outs, ~19,6 % chance for at ramme). Potten er 200 kr., og din modstander better 50 kr. EV af call = (0,196 × 250) – (0,804 × 50) = 49,0 – 40,2 = +8,8 kr. Callet er +EV og derfor korrekt.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Pot odds – den fundamentale beregning</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Pot odds er det direkte forhold mellem pot-størrelsen og det beløb du skal calle. Beregningen er simpel: Pot odds = call-beløb / (pot + modstander-bet + call-beløb). Eksempel: Pot er 150 kr., modstander better 50 kr. Pot odds = 50 / (150 + 50 + 50) = 50/250 = 20 %. Du behøver altså mindst 20 % equity for at callet er profitabelt. Med en flush draw (ca. 19,6 % på turn) er callet marginalt -EV, men med en flush draw plus overcard-outs (f.eks. 12 outs = 26 %) er det klart +EV.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Hurtig mental beregning ("Rule of 2 and 4"):</strong> På flopet, multiplicer dine outs med 4 for at estimere din equity til river. På turn, multiplicer med 2. Eksempel: Flush draw (9 outs) på flop: 9 × 4 = 36 % (faktisk: 34,97 %). På turn: 9 × 2 = 18 % (faktisk: 19,57 %). Reglen er tilstrækkelig præcis til de fleste in-game beslutninger og eliminerer behovet for kompliceret hovedregning under tidspres.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Implied odds – den skjulte EV-komponent</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Implied odds inkluderer forventede fremtidige gevinster, hvis du rammer din draw. De er særligt vigtige for set-mining (calling med små par for at ramme tre ens) og suited connector draws. En tommelfingerregel: du behøver 7,5:1 implied odds for at profitabelt set-mine, hvilket betyder at din modstander skal have en effektiv stack på mindst 15× pre-flop raise-størrelsen.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Detaljeret set-mining model:</strong> Du har 22 i HJ mod en UTG raise til 15 kr. (3BB). Du colder for at ramme set (sandsynlighed: 11,76 % eller 7,5:1 mod). For at callet er profitabelt skal du vinde mindst 15 kr. × 7,5 = 112,50 kr. i gennemsnit, når du rammer dit set. Med effektive stacks på 500 kr. (100BB), et typisk postflop-vindsscenarie (du vinder ca. 35-50 % af pot efter set), og en gennemsnitlig pot-størrelse på 200-300 kr. ved stack-off, er set-mining marginalt profitable – men kun mod modstandere der betaler dig af med TPTK (top pair top kicker) og overpairs.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Fold equity og semi-bluff EV</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Fold equity er den komponent af EV der stammer fra modstanderens fold-frekvens. Et semi-bluff (bet med en draw) kombinerer fold equity med pot equity. EV af semi-bluff = (fold% × pot) + (call% × equity% × (pot + bet)) – (call% × (1-equity%) × bet). Eksempel: Du semi-bluffer 100 kr. ind i en 150 kr. pot med en flush draw (35 % equity). Modstanderen folder 40 % af tiden. EV = (0,4 × 150) + (0,6 × 0,35 × 350) – (0,6 × 0,65 × 100) = 60 + 73,5 – 39 = +94,5 kr.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Selv med en draw der ikke er den stærkeste hånd, er semi-bluffet enormt profitabelt, fordi det kombinerer to profit-kilder: fold equity (modstanderen opgiver) og showdown equity (du rammer din draw). Nøglen er at semi-bluffe med hænder der har tilstrækkelig equity til at kompensere for de gange modstanderen caller – typisk kræves 25-35 % equity minimum for et profitabelt semi-bluff.
          </p>
        </section>

        <InlineCasinoCards title="Anbefalede casinoer med poker" count={3} />

        {/* ═══════════ SEKTION 4: Bankroll management ═══════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Coins className="h-5 w-5 text-primary" />
            Bankroll management – beskyt din poker-investering
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bankroll management (BRM) er den mest oversete disciplin i poker, og samtidig den vigtigste for langsigtet overlevelse. Selv den bedste spiller i verden vil gå broke uden korrekt BRM, fordi pokervarians kan producere 20-30 buy-in downswings selv for vinnende spillere.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Bankroll-krav efter format og risikoniveau
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Format</th>
                      <th className="py-2 text-left font-semibold">Aggressiv BRM</th>
                      <th className="py-2 text-left font-semibold">Standard BRM</th>
                      <th className="py-2 text-left font-semibold">Konservativ BRM</th>
                      <th className="py-2 text-left font-semibold">RoR (konservativ)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold">NL Cash Games</td><td className="py-2">20 buy-ins</td><td className="py-2">30 buy-ins</td><td className="py-2">50 buy-ins</td><td className="py-2">~1 %</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">PLO Cash Games</td><td className="py-2">30 buy-ins</td><td className="py-2">50 buy-ins</td><td className="py-2">75 buy-ins</td><td className="py-2">~2 %</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">MTT Turneringer</td><td className="py-2">50 buy-ins</td><td className="py-2">100 buy-ins</td><td className="py-2">200 buy-ins</td><td className="py-2">~1 %</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Sit & Go</td><td className="py-2">30 buy-ins</td><td className="py-2">50 buy-ins</td><td className="py-2">75 buy-ins</td><td className="py-2">~1 %</td></tr>
                    <tr><td className="py-2 font-semibold">Heads-Up</td><td className="py-2">30 buy-ins</td><td className="py-2">50 buy-ins</td><td className="py-2">75 buy-ins</td><td className="py-2">~2 %</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold text-foreground mb-3">Move-up og move-down regler</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            En disciplineret move-up strategi forhindrer at du spiller over dit niveau. Den mest robuste model: Bevæg dig op et level når du har 30 buy-ins til det nye level OG har en dokumenteret positiv winrate på dit nuværende level over mindst 20.000 hænder. Bevæg dig ned igen hvis du falder under 20 buy-ins for dit nuværende level. Eksempel: Du spiller NL50 med 1.500 kr. bankroll (30 buy-ins). Du vinder og når 3.000 kr. (30 buy-ins til NL100). Du prøver NL100, men taber og falder til 1.800 kr. (18 buy-ins til NL100). Du bevæger dig ned til NL50 igen.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Risk of Ruin (RoR) – den matematiske bankroll-model</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Risk of Ruin beregner sandsynligheden for at gå broke givet din winrate, standardafvigelse og bankroll. Formlen (forenklede version): RoR = e^(-2 × WR × BR / SD²), hvor WR = winrate (bb/100), BR = bankroll (i bb), SD = standardafvigelse (bb/100). Eksempel: Du har 5 bb/100 winrate, 80 bb/100 standardafvigelse og 3.000 bb bankroll (30 buy-ins). RoR = e^(-2 × 5 × 3.000 / 6.400) = e^(-4,69) = 0,92 % – en acceptabel risiko.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For danske spillere er det vigtigt at inkludere <Link to="/casinoer/casino-og-skat" className={linkClass}>skatteovervejelser</Link> i bankroll-beregningen. Pokergevinster over 200 kr. pr. spil er skattepligtige i Danmark, hvilket reducerer den effektive win-rate og dermed kræver en proportionelt større bankroll. Konsultér en skatterådgiver for præcise beregninger baseret på din spillevolumen.
          </p>
        </section>

        {/* ═══════════ SEKTION 5: Bluffing-matematik ═══════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Bluffing-matematik og optimal bluff-frekvens
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bluffing er ikke kunst – det er matematik. Den optimale bluff-frekvens er bestemt af bet-sizing og pot-size, og kan beregnes præcist med GTO-principper. Overordnet gælder: din bluff:value ratio på river bør matche modstanderens pot odds. Hvis du better pot-size (100 % pot), giver du modstanderen 2:1 odds, og din optimale bluff-frekvens er 1 bluff for hver 2 value-bets (33 % bluffs).
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Optimal bluff-frekvens efter bet-sizing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Bet-sizing</th>
                      <th className="py-2 text-left font-semibold">Modstanderens odds</th>
                      <th className="py-2 text-left font-semibold">Optimal bluff%</th>
                      <th className="py-2 text-left font-semibold">Value:Bluff ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">33 % pot</td><td className="py-2">4:1</td><td className="py-2">20 %</td><td className="py-2">4:1</td></tr>
                    <tr className="border-b"><td className="py-2">50 % pot</td><td className="py-2">3:1</td><td className="py-2">25 %</td><td className="py-2">3:1</td></tr>
                    <tr className="border-b"><td className="py-2">66 % pot</td><td className="py-2">2,5:1</td><td className="py-2">28 %</td><td className="py-2">2,5:1</td></tr>
                    <tr className="border-b bg-muted/30"><td className="py-2 font-bold">100 % pot</td><td className="py-2 font-bold">2:1</td><td className="py-2 font-bold">33 %</td><td className="py-2 font-bold">2:1</td></tr>
                    <tr><td className="py-2">150 % pot</td><td className="py-2">1,67:1</td><td className="py-2">37,5 %</td><td className="py-2">1,67:1</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold text-foreground mb-3">Bluff-selection: Hvilke hænder bluffer man med?</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            De bedste bluff-kandidater har to egenskaber: 1) <em>Ingen showdown-value</em> – hånden taber ved showdown, så du mister intet ved at bluffe. 2) <em>Blocker-effekt</em> – dine kort reducerer sandsynligheden for at modstanderen har stærke hænder. Eksempel: A♥-2♥ på et K♥-8♠-3♥-7♣-J♦ board. Esset i hjerter blokerer for nut flush, og A-high har ingen showdown-value mod modstanderens range, hvilket gør det til en perfekt bluff-kandidat.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Multi-street bluff-planlægning</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Avancerede bluffs planlægges over flere streets. En triple-barrel bluff (bet flop, turn og river) kræver at du har en troværdig story – din betting-linje skal repræsentere specifikke stærke hænder. For eksempel: Raise pre-flop fra CO, c-bet på A♠-7♥-3♣ flop (repræsenterer Ax), barrel turn 5♦ (repræsenterer stadig Ax eller overpair), og barrel river K♦ (repræsenterer AK, AA, KK). Modstanderen skal tro du har en stærk hånd baseret på hele din linje, ikke kun den enkelte bet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Bluff-sizing optimering:</strong> Bluffs bør typisk bruge den samme sizing som dine value-bets for at forblive unexploitable. Hvis du value-better 66 % pot med overpairs og top pair, bør du også bluffe 66 % pot. En klassisk begynderfejl er at overbette (pot eller mere) som bluff og underbette som value – erfarne modstandere identificerer denne sizing-tell hurtigt.
          </p>
        </section>

        {/* ═══════════ SEKTION 6: GTO vs. Exploitative ═══════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            GTO vs. Exploitative strategi – hvornår bruger du hvad?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Game Theory Optimal (GTO)</strong> er en matematisk balanced strategi der ikke kan udnyttes – modstanderen kan ikke øge sin profit ved at afvige fra sin egen GTO-strategi. I praksis blander GTO value-bets og bluffs i optimale ratios, balancerer check-raising med check-calling, og adjusterer alle beslutninger for at gøre modstanderen indifferent.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Exploitative strategi</strong> afviger bevidst fra GTO for at udnytte specifikke fejl (leaks) hos modstanderne. Eksempel: Mod en spiller der folder 80 % til river-bets (GTO-fold er ca. 50 % ved pot-size bet), bør du bluffe langt mere end GTO's 33 % – måske 60-70 %. Du "overbluffer" og bliver teoretisk exploitable selv, men mod denne specifikke modstander er det langt mere profitabelt end GTO.
          </p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Brug GTO når:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Du spiller mod ukendte modstandere</li>
                  <li>• Du spiller mod stærke, balanced spillere</li>
                  <li>• Du multitabler og ikke kan track individuelle tendenser</li>
                  <li>• Du spiller i turneringer med hurtige blinds</li>
                  <li>• Du er usikker på modstanderens strategi</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Brug exploitative når:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Du har identificeret klare leaks hos modstanderen</li>
                  <li>• Du spiller mod recreationale spillere</li>
                  <li>• Du har stor sample size (100+ hænder mod denne spiller)</li>
                  <li>• Modstanderen ikke adjusterer sin strategi</li>
                  <li>• Du spiller live (færre tables, mere observation)</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            <strong>Den praktiske hybrid:</strong> De bedste moderne pokerspillere bruger en hybrid tilgang: de starter med en GTO-baseline og adjusterer exploitativt, når de identificerer leaks. Denne tilgang giver dig et solidt fundament (du kan ikke udnyttes massivt) plus evnen til at maksimere profit mod svagere spillere. Tænk på GTO som din "default" og exploitative som dine "situationelle overrides".
          </p>
        </section>

        {/* ═══════════ SEKTION 7: C-bet og post-flop ═══════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Post-flop strategi – c-bets, check-raises og bet-sizing
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Post-flop play er hvor den mest EV genereres – og tabes – i poker. Preflop-strategien er relativt standardiseret (du kan lære den udenad), men post-flop kræver dynamisk tænkning baseret på board texture, ranges og modstander-tendenser.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Continuation betting (c-bet) strategi</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            En c-bet er en bet på flopet af preflop-aggressoren. Historisk c-bettede spillere 70-80 % af flopene, men moderne GTO-solvers anbefaler en langt mere nuanceret tilgang baseret på board texture og antal modstandere.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Tørre boards (A-7-2 rainbow):</strong> C-bet 70-80 % af tiden med en lille sizing (25-33 % pot). Din range som preflop-raiser indeholder mange Ace-x hænder, og modstanderens range rammer dette board sjældent. Lille sizing er effektiv, fordi modstanderen typisk enten har ramt (Ax) eller ikke (alt andet) – sizing ændrer sjældent modstanderens beslutning markant.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Våde boards (J♠-T♥-9♣):</strong> Reducer c-bet frekvens til 35-45 % og brug en større sizing (50-75 % pot). Modstanderens range rammer dette board oftere (par, draws, to par), og du behøver en stærkere range for at bette. Checker du, har du stadig overcards, gutshots og backdoor draws i din range.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Multi-way pots:</strong> C-bet frekvens falder dramatisk i multi-way: ca. 30-40 % 3-way og 20-30 % 4-way. Med flere modstandere er sandsynligheden for at nogen har ramt boardet eksponentielt højere. Fokuser c-bets på hænder med stærk top pair+ eller stærke draws.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Check-raise strategi</h3>
          <p className="text-muted-foreground leading-relaxed">
            Check-raise er et af pokers mest kraftfulde våben – det signalerer styrke og bygger en stor pot. Optimal check-raise frekvens fra BB (efter at have checket til preflop-raiser's c-bet) er ca. 10-15 % af hænder. Din check-raise range bør være polariseret: stærke hænder (sets, to par, overpairs) for value, plus draws (flush draws, open-ended straight draws) som bluffs. Undgå at check-raise med medium-stærke hænder (top pair middelmådig kicker) – disse bør check-calles for potkontrol.
          </p>
        </section>

        {/* ═══════════ SEKTION 8: Range-analyse ═══════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Range-analyse – læs dine modstanderes hænder
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            At tænke i ranges – ikke i specifikke hænder – er det vigtigste kognitive spring fra begynder til avanceret pokerspiller. I stedet for at spørge "har min modstander AK?", spørger du "hvad er sandsynlighederne for alle mulige hænder i modstanderens range givet denne action-sekvens?"
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Range-indsnævring i praksis:</strong> En UTG-raiser har typisk en range på 15-18 % af hænder: AA-77, AKs-ATs, KQs, AKo-AJo, KQo. Når denne spiller c-better et K♥-8♣-3♦ board og turn er 5♠, hvad er hans range? C-bet range inkluderer alle Kx (top pair), AA-QQ (overpairs), AQ/AJ (overcards) og nogle bluffs (ATs, QJs med backdoors). Når turn 5♠ ændrer intet fundamentalt, og han better igen, snævres rangen ind til primært Kx, AA-QQ og færre bluffs (mange backdoor draws har misset). Denne systematiske indsnævring giver dig en præcis estimate af modstanderens håndstyrke.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Kombinatorik og blokkere:</strong> Et avanceret range-analyse-værktøj er at tælle kombinationer. Der er 6 kombinationer af ethvert specifikt par (f.eks. 6 combos AA), 16 combos af ethvert uparret hånd (f.eks. 16 combos AK), og 4 combos af suited hænder (f.eks. 4 combos AKs). Blokkere reducerer disse tal: hvis boardet viser K♥, fjernes alle Kx-combos der indeholder K♥. Hvis du selv har A♣, fjernes alle combos der indeholder A♣ fra modstanderens range. Denne type beregning lyder kompliceret, men med øvelse bliver den intuitiv.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Polariserede vs. merged ranges:</strong> En polariseret range indeholder kun stærke hænder (value) og svage hænder (bluffs) – ingen medium-stærke hænder. Eksempel: En stor river-bet er typisk polariseret. En merged range indeholder mange medium-stærke hænder. Eksempel: En lille flop c-bet er typisk merged. At forstå om modstanderens range er polariseret eller merged er nøglen til korrekte call/fold-beslutninger.
          </p>
        </section>

        {/* ═══════════ SEKTION 9: Tilt management ═══════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Tilt management – den mentale edge
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Tilt – at spille suboptimalt pga. emotionel påvirkning – er den mest destruktive kraft i poker. En vindende spiller med 5 bb/100 winrate kan nemt tabe 20-30 bb/100 under tilt, hvilket kan udslette ugers profit på en enkelt session. Tilt-management er derfor ikke blot "nice to have" – det er en kernekompetence.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>De 4 tilt-typer:</strong> 1) <em>Injustice tilt</em> – du føler at pokeren er "unfair" efter bad beats. Modgift: accepter at variansen er en feature, ikke en bug. 2) <em>Revenge tilt</em> – du vil "vinde pengene tilbage" fra en specifik modstander. Modgift: pokerpenge er anonyme – der er ingen personlig kamp. 3) <em>Entitlement tilt</em> – du føler du "fortjener" at vinde fordi du er bedre. Modgift: skill giver kun en statistisk fordel, ikke en garanti. 4) <em>Desperation tilt</em> – du eskalerer indsatser for at komme ud af en downswing. Modgift: disciplineret bankroll management og stop-loss regler.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Praktiske tilt-værktøjer:</strong> 1) Sæt stop-loss grænser: max 3 buy-ins tab pr. session. 2) Tag 15-minutters pauser efter store pots (vundet eller tabt). 3) Brug en "session review" efter hvert spil – gennemgå 5 nøglehænder og vurder om dine beslutninger var optimale. 4) Undgå at spille træt, beruset eller emotionelt påvirket. 5) Reducer antal borde, hvis du føler tilten komme – drop fra 6 til 2 borde. 6) Hav en "quit trigger" – et specifikt adfærdsmønster du genkender som tilt (f.eks. at calle river-bets du ved er value).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Husk altid at spille <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt</Link>. Poker skal være underholdende, og disciplineret tilt-management sikrer, at det forbliver det.
          </p>
        </section>

        {/* ═══════════ SEKTION 10: Almindelige fejl ═══════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            De 10 mest kostbare strategiske fejl i poker
          </h2>

          <div className="space-y-4 mb-6">
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 1: Overplay af marginale hænder</p>
                <p className="text-sm text-muted-foreground">Top pair med svag kicker (f.eks. A2 på A-8-5 board) er ikke en premium-hånd. Mange spillere stacker off med TPWK og taber store pots mod to par, sets og bedre kickers. Potkontrol er nøglen med marginale hænder.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 2: Manglende aggression (passivt spil)</p>
                <p className="text-sm text-muted-foreground">Passive linjer (check-call) er sjældent optimale. I de fleste spots er bet/raise eller check/fold bedre end check/call, fordi aggression giver fold equity – en ekstra profit-kilde der ikke eksisterer i passivt spil.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 3: Ignorering af stack-dybde</p>
                <p className="text-sm text-muted-foreground">87s er ekstremt profitable med 100BB+ stacks (implied odds), men marginalt tabsgivende med 30BB. Din strategi bør adjustere drastisk baseret på effektive stacks: short-stacked poker er fundamentalt anderledes end deep-stacked.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 4: Manglende tilpasning til modstandertyper</p>
                <p className="text-sm text-muted-foreground">At spille den samme strategi mod alle modstandere er suboptimalt. Mod tight-passive spillere: bluf mere og value-bet tyndere. Mod loose-aggressive: tight op og trap mere. Mod calling stations: bluf aldrig, value-bet maximalt bredt.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 5: For mange tables (multitabling overflow)</p>
                <p className="text-sm text-muted-foreground">Multitabling øger volume men reducerer beslutningskvalitet. For de fleste spillere er 4-6 borde optimalt. Over 8 borde falder de fleste spilleres winrate pga. suboptimale beslutninger under tidspres.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 6: Limping preflop</p>
                <p className="text-sm text-muted-foreground">Limping (bare calling preflop) er næsten aldrig korrekt. Det afslører svaghed, giver modstanderne gode pot odds til at se flop, og opgiver initiativet. Enten raise eller fold – limping er den dyreste vanefejl i poker.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 7: Forkert bet-sizing</p>
                <p className="text-sm text-muted-foreground">At bette for lille med value-hænder (giver modstanderen for gode odds) eller for stort med bluffs (risikerer mere end nødvendigt). Konsistent sizing baseret på pot-størrelse og board texture er kritisk.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 8: Ikke at studere off-table</p>
                <p className="text-sm text-muted-foreground">De fleste vindende spillere bruger 30-50 % af deres "poker-tid" på studie: range-analyse, solver-arbejde, hånddiskussion og leak-finding. Spiller du kun og aldrig studerer, stagnerer din udvikling.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 9: Hero-calls uden matematisk grundlag</p>
                <p className="text-sm text-muted-foreground">At "hero-calle" (calle en stor bet med en marginal hånd fordi du "føler" modstanderen bluffer) uden at have analyseret modstanderens range og bluff-frekvens er ren gambling. Hver call bør baseres på range-analyse, ikke mavefornemmelse.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 10: At spille for at undgå tab (loss aversion)</p>
                <p className="text-sm text-muted-foreground">Loss aversion – at spille for konservativt for at beskytte din stack – koster EV. At folde profitable calls, at ikke value-bette tyndt nok, og at check-folde boards hvor du bør c-bette er alle symptomer på loss aversion.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ═══════════ SEKTION 11: Turnerings-strategi ═══════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Turneringsstrategi – ICM, bubbleplay og final table
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Turneringer kræver en fundamentalt anderledes strategisk tilgang end cash games, primært pga. ICM (Independent Chip Model) – konceptet om at chipværdien ændres baseret på turneringsstrukturen og præmiepuljen.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>ICM forklaret:</strong> I cash games er 1.000 chips altid 1.000 kr. værd. I turneringer er dette ikke tilfældet – dine første chips er mere værdifulde end dine sidste. Eksempel: I en 9-mands SNG med 1.000 kr. buy-in og 50/30/20 % præmiefordeling, er dine startende 1.500 chips ca. 1.000 kr. værd (din equity). Hvis du fordobler til 3.000 chips, er de ca. 1.700 kr. værd – ikke 2.000 kr. Tabet af chips er altså mere skadeligt end gevinsten af samme mængde chips er gavnligt. Denne asymmetri ændrer optimal strategi dramatisk.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Bubble play:</strong> Når turneringen nærmer sig pengeplaceringerne (bublen), stiger ICM-presset eksponentielt. Short-stacks bør tighte op (undgå at bubbe med marginale hænder), mens big-stacks bør aggressivt angribe medium-stacks, der er mest ICM-pressede. Denne dynamik skaber situationer, hvor du folder hænder i turneringer der ville være klare calls i cash games.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Final table strategi:</strong> Ved final table (typisk 6-9 spillere) eskalerer ICM-effekten yderligere. Hvert pay-jump repræsenterer en significant stigning i præmie, og dine strategiske beslutninger bør afspejle dette. Generelt: undgå marginale all-ins mod andre medium-stacks (risikoen for elimination overvejer gevinsten af ekstra chips), og target short-stacks aggressivt (de er de mest sandsynlige til at bubbe). Læs mere om pokervarianter i vores <Link to="/casinospil/poker" className={linkClass}>poker hub</Link>.
          </p>
        </section>

        {/* ═══════════ SEKTION 12: Online vs. Live ═══════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Online poker vs. live poker – strategiske forskelle
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Selvom reglerne er identiske, er online og live poker strategisk forskellige spil. De vigtigste forskelle påvirker din strategi, din bankroll og din psykologiske tilgang.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Hastighed og volume:</strong> Online spiller du typisk 300-800 hænder/time (afhængig af antal borde). Live spiller du 25-35 hænder/time. Denne massive forskel betyder, at din online winrate (bb/100) kan være lavere end din live winrate, mens din absolutte profit pr. time er højere online. For studie og leak-finding er online suverænt, fordi du akkumulerer data hurtigt.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Player pool forskelle:</strong> Online spillere er generelt stærkere end live spillere på samme stake-niveau. NL50 online er teknisk set sværere end mange NL200-500 live-spil. Grunden er selvselektering: online spillere har typisk adgang til studie-ressourcer (solvers, træningssider, forums) og spiller mod en bredere, mere kompetitiv player pool.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Fysiske tells vs. timing tells:</strong> I live poker kan du observere modstanderens kropssprog, ansigtsudtryk og chip-håndtering. Online har du timing tells (hvor hurtigt modstanderen handler), bet-sizing tells og HUD-statistikker (hvis tilladt). Begge tell-typer giver værdifuld information, men live tells er ofte mere pålidelige, da de er sværere at fake.
          </p>
        </section>

        <CasinospilMoneyLinks gameName="Poker Strategi" currentPath="/casinospil/poker/poker-strategi" />
        <LatestNewsByCategory pagePath="/casinospil/poker/poker-strategi" />
        <RelatedGuides currentPath="/casinospil/poker/poker-strategi" />
        <FAQSection faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="betinia" />
    </>
  );
}
