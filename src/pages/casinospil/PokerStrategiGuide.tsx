import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import heroImage from "@/assets/heroes/poker-strategi-hero.jpg";

/* ──────────────────────────────────────────────
   Arketype B – Bonus First (tilpasset: Strategi First)
   Unik H2-rækkefølge: Positionsspil → EV-modeller → Bankroll → Bluff → Fejl → FAQ
   ────────────────────────────────────────────── */

const faqItems = [
  {
    q: "Hvad er den vigtigste poker-strategi for begyndere?",
    a: "Den vigtigste begynderstrategi er tight-aggressive (TAG) spil: spil færre hænder, men spil dem aggressivt. Fokuser på position, starthands-selektion og pot odds. Undgå at limpe (bare calle pre-flop) – enten raise eller fold."
  },
  {
    q: "Hvordan beregner man pot odds?",
    a: "Pot odds beregnes som forholdet mellem pot-størrelsen og det beløb du skal calle. Eksempel: Potten er 100 kr., og du skal calle 20 kr. Pot odds er 100:20 = 5:1 (16,7 %). Hvis din sandsynlighed for at ramme din draw er større end 16,7 %, er callet profitabelt."
  },
  {
    q: "Hvad er en GTO-strategi i poker?",
    a: "GTO (Game Theory Optimal) er en matematisk balanced strategi der ikke kan udnyttes af modstanderen. I praksis blander GTO value-bets og bluffs i optimale ratios, og adjusterer bet-sizing for at gøre modstanderen indifferent mellem call og fold."
  },
  {
    q: "Hvor stor skal min poker-bankroll være?",
    a: "For cash games anbefales minimum 20-30 buy-ins for det level du spiller. For turneringer anbefales 50-100 buy-ins på grund af højere varians. Eksempel: For NL50 (50 kr. buy-in) bør din bankroll være mindst 1.000-1.500 kr."
  },
  {
    q: "Hvad er forskellen på exploitative og GTO-strategi?",
    a: "GTO-strategi er matematisk uudnyttelig men maksimerer ikke profit mod svage spillere. Exploitative strategi afviger fra GTO for at udnytte specifikke leaks hos modstandere – f.eks. at bluffe mere mod tight spillere eller value-bette tyndere mod calling stations."
  },
  {
    q: "Hvordan håndterer man tilt i poker?",
    a: "Tilt-management er en bankroll-beskyttelsesstrategi. De mest effektive metoder er: 1) Sæt stop-loss grænser (f.eks. max 3 buy-ins pr. session). 2) Tag pauser efter store tab. 3) Fokuser på beslutningskvalitet, ikke resultater. 4) Undgå at spille træt, beruset eller emotionelt påvirket."
  },
];

export default function PokerStrategiGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Poker Strategi 2026 – EV-modeller, Positionsspil & Bankroll Management",
        description: "Avanceret dansk poker strategi-guide. Lær positionsspil, pot odds, implied odds, GTO-koncepter og bankroll management. Fra begynder til avanceret med matematiske EV-modeller.",
        author: { "@type": "Person", name: "Jonas Theill" },
        publisher: { "@type": "Organization", name: "Casinoaftaler.dk" },
        datePublished: "2026-03-02",
        dateModified: "2026-03-02",
        mainEntityOfPage: "https://casinoaftaler.dk/casinospil/poker/poker-strategi",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Poker Strategi Guide 2026 – EV, Position & Bankroll</title>
        <meta
          name="description"
          content="Avanceret dansk poker strategi-guide. Lær positionsspil, pot odds, EV-beregninger, GTO-koncepter og bankroll management. Fra begynder til professionelt niveau."
        />
        <link rel="canonical" href="https://casinoaftaler.dk/casinospil/poker/poker-strategi" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <article className="mx-auto max-w-4xl px-4 py-12 space-y-10">
        {/* Hero */}
        <header className="relative rounded-2xl overflow-hidden">
          <img src={heroImage} alt="Professionel poker-spiller analyserer hånd med matematiske overlays" className="w-full h-[340px] md:h-[420px] object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-2">Poker · Avanceret Strategi</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight">
              Poker Strategi – EV-modeller, Positionsspil & Bankroll Management
            </h1>
            <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl">
              Fra pot odds til GTO-koncepter. Denne guide dækker alt du behøver for at hæve dit pokerspil fra begynder til avanceret niveau med matematisk funderede strategier.
            </p>
          </div>
        </header>

        {/* QuickFacts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Skill-element", value: "Meget højt" },
            { label: "Min. bankroll", value: "20-30 buy-ins" },
            { label: "GTO-balance", value: "2:1 value:bluff" },
            { label: "Position fordel", value: "~10-15 % EV" },
          ].map((f) => (
            <div key={f.label} className="rounded-xl border border-border/50 bg-card p-3 text-center">
              <span className="block text-xs text-muted-foreground">{f.label}</span>
              <span className="block text-lg font-bold text-foreground">{f.value}</span>
            </div>
          ))}
        </div>

        <Separator />

        {/* ──── Sektion 1: Positionsspil ──── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Positionsspil – den mest undervurderede strategi</h2>
          
          <p className="text-muted-foreground leading-relaxed">
            Position er den mest fundamentale og samtidig mest undervurderede faktor i poker-strategi. At handle sidst giver dig information om alle andre spilleres handlinger, før du skal træffe din beslutning. Denne informationsfordel er kvantificerbar: spillere i position (IP) vinder gennemsnitligt 10-15 % mere end spillere ud af position (OOP) med identiske starthænder.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Positions-hierarkiet forklaret</h3>
          <p className="text-muted-foreground leading-relaxed">
            I et standard 6-max No Limit Hold'em spil er positionerne rangeret fra værst til bedst: Small Blind (SB) → Big Blind (BB) → Under the Gun (UTG) → Hijack (HJ) → Cutoff (CO) → Button (BTN). Buttonen er den mest profitable position, fordi du altid handler sidst post-flop. SB er den mindst profitable, fordi du handler næstsidst pre-flop men altid først post-flop.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Dataen er entydig: en typisk vinder i online poker har en VPIP (Voluntarily Put money In Pot) på ca. 22-28 % overall, men dette fordeles ekstremt ujævnt: 15-18 % fra early position, 22-28 % fra middle position, og 30-40 % fra late position. Denne starthands-selektion afspejler den massive EV-fordel positionen giver.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Praktisk positions-strategi</h3>
          <p className="text-muted-foreground leading-relaxed">
            Fra early position (UTG/UTG+1) bør du kun åbne de stærkeste 15-18 % af hænder: store par (AA-TT), AK, AQ, AJs, KQs. Fra cutoff og button kan du udvide dit range til 25-35 % af hænder, inklusiv suited connectors (87s, 76s), small pairs (22-66) og broadway-kombinationer (KJo, QJo). Fra blinds bør du forsvare mod steals med ca. 30-40 % af hænder, men primært via 3-bets (re-raises) snarere end calls for at undgå den post-flop positionshandicap.
          </p>
        </section>

        <InlineCasinoCards title="Bedste casinoer til poker" count={3} />

        <Separator />

        {/* ──── Sektion 2: EV-modeller ──── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Expected Value (EV) – matematikken bag profitable beslutninger</h2>

          <h3 className="text-xl font-semibold text-foreground">Grundlæggende EV-beregning</h3>
          <p className="text-muted-foreground leading-relaxed">
            EV (Expected Value) er det gennemsnitlige resultat af en beslutning over mange gentagelser. Formlen er: EV = (sandsynlighed for gevinst × gevinstbeløb) – (sandsynlighed for tab × tabsbeløb). Eksempel: Du har en flush draw på turn (9 outs, ~19,6 % chance for at ramme). Potten er 200 kr., og din modstander better 50 kr. EV af call = (0,196 × 250) – (0,804 × 50) = 49,0 – 40,2 = +8,8 kr. Callet er +EV og derfor korrekt.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Pot odds vs. implied odds</h3>
          <p className="text-muted-foreground leading-relaxed">
            Pot odds er det direkte forhold mellem pot og call-beløb. Implied odds inkluderer forventede fremtidige gevinster, hvis du rammer din draw. Implied odds er særligt vigtige for set-mining (calling med små par for at ramme tre ens) og suited connector draws. En tommelfingerregel: du behøver 7,5:1 implied odds for at profitabelt set-mine, hvilket betyder at din modstander skal have en effektiv stack på mindst 15× pre-flop raise-størrelsen.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Fold equity og semi-bluff EV</h3>
          <p className="text-muted-foreground leading-relaxed">
            Fold equity er den komponent af EV der stammer fra modstanderens fold-frekvens. Et semi-bluff (bet med en draw) kombinerer fold equity med pot equity. EV af semi-bluff = (fold% × pot) + (call% × equity% × (pot + bet)) – (call% × (1-equity%) × bet). Eksempel: Du semi-bluffer 100 kr. ind i en 150 kr. pot med en flush draw (35 % equity). Modstanderen folder 40 % af tiden. EV = (0,4 × 150) + (0,6 × 0,35 × 350) – (0,6 × 0,65 × 100) = 60 + 73,5 – 39 = +94,5 kr. Selv med en draw der ikke er den stærkeste hånd, er semi-bluffet enormt profitabelt.
          </p>
        </section>

        <Separator />

        {/* ──── Sektion 3: Bankroll management ──── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Bankroll management – beskyt din poker-investering</h2>

          <p className="text-muted-foreground leading-relaxed">
            Bankroll management (BRM) er den mest oversete disciplin i poker, og samtidig den vigtigste for langsigtet overlevelse. Selv den bedste spiller i verden vil gå broke uden korrekt BRM, fordi pokervarians kan producere 20-30 buy-in downswings selv for vinnende spillere.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Anbefalede bankroll-niveauer</h3>
          <p className="text-muted-foreground leading-relaxed">
            For cash games er standard anbefalingen 20-30 buy-ins for aggressive spillere og 30-50 buy-ins for konservative spillere. Ved NL100 (100 kr. buy-in) betyder det en bankroll på 2.000-5.000 kr. For turneringer er varians markant højere, og 50-100 buy-ins anbefales. For Sit & Go's (SNGs) er 30-50 buy-ins tilstrækkeligt. Disse tal er baseret på en Risk of Ruin (RoR) analyse der sikrer under 5 % sandsynlighed for at gå broke.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Move-up og move-down regler</h3>
          <p className="text-muted-foreground leading-relaxed">
            En disciplineret move-up strategi forhindrer at du spiller over dit niveau. En populær model: Bevæg dig op et level når du har 30 buy-ins til det nye level. Bevæg dig ned igen hvis du falder under 20 buy-ins. Eksempel: Du spiller NL50 med en bankroll på 1.500 kr. (30 buy-ins). Du vinder og når 3.000 kr. (30 buy-ins til NL100). Du prøver NL100, men taber og falder til 1.800 kr. (18 buy-ins til NL100). Du bevæger dig ned til NL50 igen. Denne mekanik beskytter mod de uundgåelige downswings.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            For danske spillere på platforme med <Link to="/casino-licenser" className="text-primary hover:underline">dansk licens</Link> er det vigtigt at inkludere <Link to="/casinoer/casino-og-skat" className="text-primary hover:underline">skatteovervejelser</Link> i bankroll-beregningen. Pokervgevinster over 200 kr. pr. spil er skattepligtige i Danmark, hvilket reducerer den effektive win-rate og dermed kræver en proportionelt større bankroll.
          </p>
        </section>

        <InlineCasinoCards title="Anbefalede casinoer med poker" count={3} />

        <Separator />

        {/* ──── Sektion 4: Bluffing ──── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Bluffing-matematik og optimal bluff-frekvens</h2>

          <p className="text-muted-foreground leading-relaxed">
            Bluffing er ikke kunst – det er matematik. Den optimale bluff-frekvens er bestemt af bet-sizing og pot-size, og kan beregnes præcist med GTO-principper. Overordnet gælder: din bluff:value ratio på river bør matche modstanderens pot odds. Hvis du better pot-size (100 % pot), giver du modstanderen 2:1 odds, og din optimale bluff-frekvens er 1 bluff for hver 2 value-bets (33 % bluffs).
          </p>

          <h3 className="text-xl font-semibold text-foreground">Bluff-selection: Hvilke hænder bluffer man med?</h3>
          <p className="text-muted-foreground leading-relaxed">
            De bedste bluff-kandidater er hænder med blocker-effekt – kort der reducerer sandsynligheden for at modstanderen har stærke hænder. Eksempel: Ah-2h på et Kh-8s-3h-7c-Jd board. Esset i hjerter blokerer for nut flush, og Ace-high har ingen showdown-value, hvilket gør det til en perfekt bluff-kandidat. I modsætning ville Th-9h være en dårlig bluff-kandidat, fordi den kan vinde ved showdown og ikke blokerer for mange stærke hænder.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Multi-street bluff-planlægning</h3>
          <p className="text-muted-foreground leading-relaxed">
            Avancerede bluffs planlægges over flere streets. En triple-barrel bluff (bet flop, turn og river) kræver at du har en troværdig story – din betting-linje skal repræsentere specifikke stærke hænder. For eksempel: Raise pre-flop, c-bet på As-7h-3c flop (repræsenterer Ace-x), barrel turn 5d (repræsenterer stadig Ace-x), og barrel river Kd (repræsenterer AK, AQ, eller set). Modstanderen skal tro du har en stærk hånd baseret på hele din linje, ikke kun den enkelte bet.
          </p>
        </section>

        <Separator />

        {/* ──── Sektion 5: Almindelige fejl ──── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">De 5 mest kostbare strategiske fejl i poker</h2>

          <p className="text-muted-foreground leading-relaxed">
            Fejl 1: Overplay af marginale hænder. Top pair med svag kicker (f.eks. A2 på A-8-5 board) er ikke en premium-hånd – det er en marginal hånd der bør spilles forsigtigt. Mange spillere mister store pots ved at stacke off med TPWK (Top Pair Weak Kicker) mod to par eller bedre. Fejl 2: Manglende aggression. Passive linjer (check-call) er sjældent optimale. I de fleste spots er bet/raise eller check/fold bedre end check/call, fordi aggression giver fold equity.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Fejl 3: Ignorering af stack-dybde. En hånd som 87s er ekstremt profitable med 100BB+ stacks (implied odds), men marginalt tabsgivende med 30BB stacks. Din strategi bør adjustere drastisk baseret på effektive stack-størrelser. Fejl 4: Manglende tilpasning. At spille den samme strategi mod alle modstandere er suboptimalt. Mod tight-passive spillere bør du bluffe mere og value-bette tyndere. Mod loose-aggressive spillere bør du tighten op og trap mere. Fejl 5: At spille for mange tables. Multitabling øger volume men reducerer beslutningskvalitet. For de fleste spillere er 4-6 borde optimalt.
          </p>
        </section>

        <Separator />

        {/* ──── Sektion 6: FAQ ──── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Ofte stillede spørgsmål om poker strategi</h2>
          {faqItems.map((f) => (
            <div key={f.q} className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">{f.q}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.a}</p>
            </div>
          ))}
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath="/casinospil/poker/poker-strategi" />

        <Separator className="my-10" />

        {/* Intern navigation */}
        <nav className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">Udforsk flere poker-guides</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { to: "/casinospil/poker", label: "Poker Hub" },
              { to: "/casinospil/poker/texas-holdem", label: "Texas Hold'em" },
              { to: "/casinospil/poker/omaha", label: "Omaha" },
              { to: "/casinospil/poker/three-card-poker", label: "Three Card Poker" },
              { to: "/casinospil/poker/caribbean-stud", label: "Caribbean Stud" },
              { to: "/casinospil/poker/video-poker", label: "Video Poker" },
              { to: "/casinospil/poker/bedste-poker-sider", label: "Bedste Poker Sider" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="rounded-lg border border-border/50 bg-card px-3 py-1.5 text-sm text-foreground hover:border-primary/30 hover:text-primary transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      </article>
    </>
  );
}
