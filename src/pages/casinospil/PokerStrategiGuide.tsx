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
  Target, BarChart3, Eye, Brain, BookOpen, AlertTriangle,
  TrendingUp, Scale, Shield, Calculator, Coins,
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
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="45 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Professionel poker-spiller analyserer hånd med matematiske overlays" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ──── Sektion 1: Positionsspil ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Positionsspil – den mest undervurderede strategi
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Position er den mest fundamentale og samtidig mest undervurderede faktor i poker-strategi. At handle sidst giver dig information om alle andre spilleres handlinger, før du skal træffe din beslutning. Denne informationsfordel er kvantificerbar: spillere i position (IP) vinder gennemsnitligt 10-15 % mere end spillere ud af position (OOP) med identiske starthænder.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Positions-hierarkiet forklaret</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I et standard 6-max No Limit Hold'em spil er positionerne rangeret fra værst til bedst: Small Blind (SB) → Big Blind (BB) → Under the Gun (UTG) → Hijack (HJ) → Cutoff (CO) → Button (BTN). Buttonen er den mest profitable position, fordi du altid handler sidst post-flop. SB er den mindst profitable, fordi du handler næstsidst pre-flop men altid først post-flop.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Dataen er entydig: en typisk vinder i online poker har en VPIP (Voluntarily Put money In Pot) på ca. 22-28 % overall, men dette fordeles ekstremt ujævnt: 15-18 % fra early position, 22-28 % fra middle position, og 30-40 % fra late position. Denne starthands-selektion afspejler den massive EV-fordel positionen giver.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Praktisk positions-strategi</h3>
          <p className="text-muted-foreground leading-relaxed">
            Fra early position (UTG/UTG+1) bør du kun åbne de stærkeste 15-18 % af hænder: store par (AA-TT), AK, AQ, AJs, KQs. Fra cutoff og button kan du udvide dit range til 25-35 % af hænder, inklusiv suited connectors (87s, 76s), small pairs (22-66) og broadway-kombinationer (KJo, QJo). Fra blinds bør du forsvare mod steals med ca. 30-40 % af hænder, men primært via 3-bets (re-raises) snarere end calls for at undgå den post-flop positionshandicap.
          </p>
        </section>

        <InlineCasinoCards title="Bedste casinoer til poker" count={3} />

        {/* ──── Sektion 2: EV-modeller ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Expected Value (EV) – matematikken bag profitable beslutninger
          </h2>

          <h3 className="text-xl font-semibold text-foreground mb-3">Grundlæggende EV-beregning</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            EV (Expected Value) er det gennemsnitlige resultat af en beslutning over mange gentagelser. Formlen er: EV = (sandsynlighed for gevinst × gevinstbeløb) – (sandsynlighed for tab × tabsbeløb). Eksempel: Du har en flush draw på turn (9 outs, ~19,6 % chance for at ramme). Potten er 200 kr., og din modstander better 50 kr. EV af call = (0,196 × 250) – (0,804 × 50) = 49,0 – 40,2 = +8,8 kr. Callet er +EV og derfor korrekt.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Pot odds vs. implied odds</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Pot odds er det direkte forhold mellem pot og call-beløb. Implied odds inkluderer forventede fremtidige gevinster, hvis du rammer din draw. Implied odds er særligt vigtige for set-mining (calling med små par for at ramme tre ens) og suited connector draws. En tommelfingerregel: du behøver 7,5:1 implied odds for at profitabelt set-mine, hvilket betyder at din modstander skal have en effektiv stack på mindst 15× pre-flop raise-størrelsen.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Fold equity og semi-bluff EV</h3>
          <p className="text-muted-foreground leading-relaxed">
            Fold equity er den komponent af EV der stammer fra modstanderens fold-frekvens. Et semi-bluff (bet med en draw) kombinerer fold equity med pot equity. EV af semi-bluff = (fold% × pot) + (call% × equity% × (pot + bet)) – (call% × (1-equity%) × bet). Eksempel: Du semi-bluffer 100 kr. ind i en 150 kr. pot med en flush draw (35 % equity). Modstanderen folder 40 % af tiden. EV = (0,4 × 150) + (0,6 × 0,35 × 350) – (0,6 × 0,65 × 100) = 60 + 73,5 – 39 = +94,5 kr. Selv med en draw der ikke er den stærkeste hånd, er semi-bluffet enormt profitabelt.
          </p>
        </section>

        {/* ──── Sektion 3: Bankroll management ──── */}
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
                Anbefalede bankroll-niveauer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Cash games:</strong> 20-30 buy-ins (aggressive) / 30-50 buy-ins (konservative)</p>
              <p><strong>Turneringer:</strong> 50-100 buy-ins pga. højere varians</p>
              <p><strong>Sit & Go's:</strong> 30-50 buy-ins</p>
              <p><strong>Eksempel:</strong> NL100 (100 kr. buy-in) → bankroll 2.000-5.000 kr.</p>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold text-foreground mb-3">Move-up og move-down regler</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            En disciplineret move-up strategi forhindrer at du spiller over dit niveau. En populær model: Bevæg dig op et level når du har 30 buy-ins til det nye level. Bevæg dig ned igen hvis du falder under 20 buy-ins. Eksempel: Du spiller NL50 med en bankroll på 1.500 kr. (30 buy-ins). Du vinder og når 3.000 kr. (30 buy-ins til NL100). Du prøver NL100, men taber og falder til 1.800 kr. (18 buy-ins til NL100). Du bevæger dig ned til NL50 igen. Denne mekanik beskytter mod de uundgåelige downswings.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            For danske spillere på platforme med <Link to="/casino-licenser" className={linkClass}>dansk licens</Link> er det vigtigt at inkludere <Link to="/casinoer/casino-og-skat" className={linkClass}>skatteovervejelser</Link> i bankroll-beregningen. Pokergevinster over 200 kr. pr. spil er skattepligtige i Danmark, hvilket reducerer den effektive win-rate og dermed kræver en proportionelt større bankroll.
          </p>
        </section>

        <InlineCasinoCards title="Anbefalede casinoer med poker" count={3} />

        {/* ──── Sektion 4: Bluffing ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Bluffing-matematik og optimal bluff-frekvens
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bluffing er ikke kunst – det er matematik. Den optimale bluff-frekvens er bestemt af bet-sizing og pot-size, og kan beregnes præcist med GTO-principper. Overordnet gælder: din bluff:value ratio på river bør matche modstanderens pot odds. Hvis du better pot-size (100 % pot), giver du modstanderen 2:1 odds, og din optimale bluff-frekvens er 1 bluff for hver 2 value-bets (33 % bluffs).
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Bluff-selection: Hvilke hænder bluffer man med?</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            De bedste bluff-kandidater er hænder med blocker-effekt – kort der reducerer sandsynligheden for at modstanderen har stærke hænder. Eksempel: Ah-2h på et Kh-8s-3h-7c-Jd board. Esset i hjerter blokerer for nut flush, og Ace-high har ingen showdown-value, hvilket gør det til en perfekt bluff-kandidat. I modsætning ville Th-9h være en dårlig bluff-kandidat, fordi den kan vinde ved showdown og ikke blokerer for mange stærke hænder.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Multi-street bluff-planlægning</h3>
          <p className="text-muted-foreground leading-relaxed">
            Avancerede bluffs planlægges over flere streets. En triple-barrel bluff (bet flop, turn og river) kræver at du har en troværdig story – din betting-linje skal repræsentere specifikke stærke hænder. For eksempel: Raise pre-flop, c-bet på As-7h-3c flop (repræsenterer Ace-x), barrel turn 5d (repræsenterer stadig Ace-x), og barrel river Kd (repræsenterer AK, AQ, eller set). Modstanderen skal tro du har en stærk hånd baseret på hele din linje, ikke kun den enkelte bet.
          </p>
        </section>

        {/* ──── Sektion 5: Almindelige fejl ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            De 5 mest kostbare strategiske fejl i poker
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Fejl 1: Overplay af marginale hænder. Top pair med svag kicker (f.eks. A2 på A-8-5 board) er ikke en premium-hånd – det er en marginal hånd der bør spilles forsigtigt. Mange spillere mister store pots ved at stacke off med TPWK (Top Pair Weak Kicker) mod to par eller bedre. Fejl 2: Manglende aggression. Passive linjer (check-call) er sjældent optimale. I de fleste spots er bet/raise eller check/fold bedre end check/call, fordi aggression giver fold equity.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Fejl 3: Ignorering af stack-dybde. En hånd som 87s er ekstremt profitable med 100BB+ stacks (implied odds), men marginalt tabsgivende med 30BB stacks. Din strategi bør adjustere drastisk baseret på effektive stack-størrelser. Fejl 4: Manglende tilpasning. At spille den samme strategi mod alle modstandere er suboptimalt. Mod tight-passive spillere bør du bluffe mere og value-bette tyndere. Mod loose-aggressive spillere bør du tighten op og trap mere. Fejl 5: At spille for mange tables. Multitabling øger volume men reducerer beslutningskvalitet. For de fleste spillere er 4-6 borde optimalt.
          </p>
        </section>

        <Separator className="mb-12" />
        <section className="mb-12"><FAQSection faqs={faqs} /></section>
        <Separator className="mb-12" />
        <AuthorBio author="jonas" />
        <Separator className="my-12" />
        <RelatedGuides currentPath="/casinospil/poker/poker-strategi" />
      </div>
    </>
  );
}
