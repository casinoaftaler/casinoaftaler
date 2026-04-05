import { Link } from "react-router-dom";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import classicBlackjack from "@/assets/screenshots/classic-blackjack.webp";
import blackjackSkemaImg from "@/assets/screenshots/blackjack-skema-komplet-strategi.webp";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { buildFaqSchema, buildArticleSchema, buildHowToSchema, SITE_URL } from "@/lib/seo";
import { Separator } from "@/components/ui/separator";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { CasinospilMoneyLinks } from "@/components/CasinospilMoneyLinks";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode, useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Layers, Shuffle, Sparkles, TableIcon, Target } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const linkClass = "text-primary underline hover:text-primary/80";

/* ─────────────────── STRATEGY DATA ─────────────────── */

type Action = "S" | "H" | "D" | "P" | "Ds" | "Rh" | "Rs" | "Ph";

const actionLabels: Record<Action, string> = {
  S: "Stand",
  H: "Hit",
  D: "Double Down",
  P: "Split",
  Ds: "Double, ellers Stand",
  Rh: "Surrender, ellers Hit",
  Rs: "Surrender, ellers Stand",
  Ph: "Split hvis DAS, ellers Hit",
};

const actionColors: Record<Action, string> = {
  S: "bg-yellow-500/90 text-yellow-950",
  H: "bg-emerald-500/90 text-emerald-950",
  D: "bg-blue-500/90 text-white",
  P: "bg-orange-500/90 text-orange-950",
  Ds: "bg-blue-400/80 text-blue-950",
  Rh: "bg-slate-400/80 text-slate-950",
  Rs: "bg-slate-500/80 text-white",
  Ph: "bg-orange-400/70 text-orange-950",
};

const dealerCards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A"];

// Hard totals: rows 5-20 vs dealer 2-A
const hardTotals: { hand: string; actions: Action[] }[] = [
  { hand: "20", actions: ["S","S","S","S","S","S","S","S","S","S"] },
  { hand: "19", actions: ["S","S","S","S","S","S","S","S","S","S"] },
  { hand: "18", actions: ["S","S","S","S","S","S","S","S","S","S"] },
  { hand: "17", actions: ["S","S","S","S","S","S","S","S","S","Rs"] },
  { hand: "16", actions: ["S","S","S","S","S","H","H","Rh","Rh","Rh"] },
  { hand: "15", actions: ["S","S","S","S","S","H","H","H","Rh","Rh"] },
  { hand: "14", actions: ["S","S","S","S","S","H","H","H","H","H"] },
  { hand: "13", actions: ["S","S","S","S","S","H","H","H","H","H"] },
  { hand: "12", actions: ["H","H","S","S","S","H","H","H","H","H"] },
  { hand: "11", actions: ["D","D","D","D","D","D","D","D","D","D"] },
  { hand: "10", actions: ["D","D","D","D","D","D","D","D","H","H"] },
  { hand: "9",  actions: ["H","D","D","D","D","H","H","H","H","H"] },
  { hand: "8",  actions: ["H","H","H","H","H","H","H","H","H","H"] },
  { hand: "7",  actions: ["H","H","H","H","H","H","H","H","H","H"] },
  { hand: "6",  actions: ["H","H","H","H","H","H","H","H","H","H"] },
  { hand: "5",  actions: ["H","H","H","H","H","H","H","H","H","H"] },
];

// Soft totals: A,9 through A,2
const softTotals: { hand: string; actions: Action[] }[] = [
  { hand: "A,9", actions: ["S","S","S","S","S","S","S","S","S","S"] },
  { hand: "A,8", actions: ["S","S","S","S","Ds","S","S","S","S","S"] },
  { hand: "A,7", actions: ["Ds","Ds","Ds","Ds","Ds","S","S","H","H","H"] },
  { hand: "A,6", actions: ["H","D","D","D","D","H","H","H","H","H"] },
  { hand: "A,5", actions: ["H","H","D","D","D","H","H","H","H","H"] },
  { hand: "A,4", actions: ["H","H","D","D","D","H","H","H","H","H"] },
  { hand: "A,3", actions: ["H","H","H","D","D","H","H","H","H","H"] },
  { hand: "A,2", actions: ["H","H","H","D","D","H","H","H","H","H"] },
];

// Pairs
const pairTotals: { hand: string; actions: Action[] }[] = [
  { hand: "A,A", actions: ["P","P","P","P","P","P","P","P","P","P"] },
  { hand: "10,10", actions: ["S","S","S","S","S","S","S","S","S","S"] },
  { hand: "9,9", actions: ["P","P","P","P","P","S","P","P","S","S"] },
  { hand: "8,8", actions: ["P","P","P","P","P","P","P","P","P","P"] },
  { hand: "7,7", actions: ["P","P","P","P","P","P","H","H","H","H"] },
  { hand: "6,6", actions: ["Ph","P","P","P","P","H","H","H","H","H"] },
  { hand: "5,5", actions: ["D","D","D","D","D","D","D","D","H","H"] },
  { hand: "4,4", actions: ["H","H","H","Ph","Ph","H","H","H","H","H"] },
  { hand: "3,3", actions: ["Ph","Ph","P","P","P","P","H","H","H","H"] },
  { hand: "2,2", actions: ["Ph","Ph","P","P","P","P","H","H","H","H"] },
];

/* ─────────────────── STRATEGY TABLE COMPONENT ─────────────────── */

function StrategyTable({ title, iconName, rows, id }: { title: string; iconName: string; rows: { hand: string; actions: Action[] }[]; id: string }) {
  const [hoveredAction, setHoveredAction] = useState<Action | null>(null);

  return (
    <div id={id} className="mb-8">
      <h3 className="mb-3 flex items-center gap-2 text-xl font-bold">
        <MenuIcon iconName={iconName} className="h-5 w-5 text-primary" />
        {title}
      </h3>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm" role="grid" aria-label={title}>
          <thead>
            <tr className="bg-muted/50">
              <th className="py-2.5 px-3 text-left font-semibold text-muted-foreground sticky left-0 bg-muted/50 z-10 min-w-[60px]">Din hånd</th>
              {dealerCards.map((c) => (
                <th key={c} className="py-2.5 px-3 text-center font-semibold text-muted-foreground min-w-[44px]">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.hand} className="border-t border-border/50">
                <td className="py-2 px-3 font-semibold text-foreground sticky left-0 bg-background z-10">{row.hand}</td>
                {row.actions.map((action, i) => (
                  <td
                    key={i}
                    className={`py-2 px-3 text-center font-bold text-xs cursor-default transition-opacity ${actionColors[action]} ${hoveredAction && hoveredAction !== action ? "opacity-30" : "opacity-100"}`}
                    onMouseEnter={() => setHoveredAction(action)}
                    onMouseLeave={() => setHoveredAction(null)}
                    title={`${row.hand} vs dealer ${dealerCards[i]}: ${actionLabels[action]}`}
                    aria-label={`${row.hand} mod dealer ${dealerCards[i]}: ${actionLabels[action]}`}
                  >
                    {action}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────────── QUIZ COMPONENT ─────────────────── */

interface QuizScenario {
  playerHand: string;
  dealerCard: string;
  correctAction: Action;
  explanation: string;
}

const quizScenarios: QuizScenario[] = [
  { playerHand: "16", dealerCard: "10", correctAction: "Rh", explanation: "Mod dealer 10 med hard 16 bør du surrendere hvis muligt, ellers hitte. Hard 16 er den farligste hånd – du buster i ca. 62 % af tilfældene ved hit, men dealer med 10 laver en færdig hånd i ca. 77 % af tilfældene." },
  { playerHand: "A,7", dealerCard: "6", correctAction: "Ds", explanation: "Soft 18 mod dealer 6 er en double-situation. Dealer 6 buster i 42 % af tilfældene, og din soft 18 kan kun forbedres eller forblive stærk med et ekstra kort." },
  { playerHand: "8,8", dealerCard: "A", correctAction: "P", explanation: "Par af 8'ere splittes ALTID – selv mod dealer es. Hard 16 er den værste hånd i blackjack. Ved at splitte konverterer du den til to hænder der starter med 8, som er langt bedre udgangspunkter." },
  { playerHand: "11", dealerCard: "5", correctAction: "D", explanation: "Hard 11 mod dealer 5 er en af de mest profitable double-situationer. Du har høj sandsynlighed for at ramme 21 (med 10-værdikort), og dealer 5 buster i 43 % af tilfældene." },
  { playerHand: "12", dealerCard: "3", correctAction: "H", explanation: "Hard 12 mod dealer 2-3 er en hit. Mange spillere laver fejlen at stande, men dealer 3 er ikke svagt nok til at retfærdiggøre risikoen ved at stå med blot 12. Du buster kun i 31 % af tilfældene ved hit." },
  { playerHand: "9,9", dealerCard: "7", correctAction: "S", explanation: "Par af 9'ere mod dealer 7 er en stand. Du har allerede 18, og dealer 7 giver typisk en færdig 17. At splitte vil i gennemsnit producere to hænder der er svagere end din nuværende 18." },
  { playerHand: "A,6", dealerCard: "4", correctAction: "D", explanation: "Soft 17 mod dealer 4 er en double-down. Dealer 4 buster i 40 % af tilfældene, og dit es giver dig fleksibilitet – du kan ikke buste ved at trække ét kort mere." },
  { playerHand: "15", dealerCard: "10", correctAction: "Rh", explanation: "Hard 15 mod dealer 10 bør surrenderes. Du mister kun halvdelen af indsatsen med surrender, hvilket er bedre end den forventede -0,54 enheder du taber ved at spille hånden ud." },
];

function StrategyQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  const scenario = quizScenarios[currentIndex];
  const isCorrect = selectedAction === scenario.correctAction;
  const hasAnswered = selectedAction !== null;

  const handleSelect = useCallback((action: Action) => {
    if (hasAnswered) return;
    setSelectedAction(action);
    setAnswered((a) => a + 1);
    if (action === scenario.correctAction) setScore((s) => s + 1);
  }, [hasAnswered, scenario.correctAction]);

  const nextQuestion = useCallback(() => {
    setSelectedAction(null);
    setCurrentIndex((i) => (i + 1) % quizScenarios.length);
  }, []);

  const quizActions: Action[] = ["H", "S", "D", "P", "Rh"];

  return (
    <Card className="border-primary/30 bg-primary/5" id="quiz">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MenuIcon iconName="brain" className="h-5 w-5 text-primary" />
          Test din blackjack-strategi
        </CardTitle>
      </CardHeader>
      <CardContent>
        {answered > 0 && (
          <p className="mb-3 text-sm text-muted-foreground">
            Score: {score}/{answered} korrekte ({Math.round((score / answered) * 100)} %)
          </p>
        )}
        <div className="mb-4 rounded-lg border border-border bg-card p-4">
          <p className="text-lg font-semibold text-foreground">
            Din hånd: <span className="text-primary">{scenario.playerHand}</span> — Dealer viser: <span className="text-primary">{scenario.dealerCard}</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Hvad er den korrekte handling ifølge basic strategy?</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 mb-4">
          {quizActions.map((action) => {
            const isThisCorrect = action === scenario.correctAction;
            let btnClass = "border border-border bg-card hover:bg-muted text-foreground";
            if (hasAnswered && isThisCorrect) btnClass = "border-2 border-emerald-500 bg-emerald-500/20 text-emerald-700 dark:text-emerald-400";
            else if (hasAnswered && action === selectedAction && !isThisCorrect) btnClass = "border-2 border-red-500 bg-red-500/20 text-red-700 dark:text-red-400";
            return (
              <button
                key={action}
                onClick={() => handleSelect(action)}
                disabled={hasAnswered}
                className={`rounded-lg py-3 px-4 font-semibold text-sm transition-colors ${btnClass} disabled:cursor-default`}
              >
                {actionLabels[action]}
              </button>
            );
          })}
        </div>
        {hasAnswered && (
          <div className={`rounded-lg p-4 mb-4 ${isCorrect ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-red-500/10 border border-red-500/30"}`}>
            <p className="flex items-center gap-2 font-semibold mb-1">
              {isCorrect ? <MenuIcon iconName="check-circle2" className="h-4 w-4 text-emerald-500" /> : <MenuIcon iconName="x-circle" className="h-4 w-4 text-red-500" />}
              {isCorrect ? "Korrekt!" : `Forkert – det rigtige svar er ${actionLabels[scenario.correctAction]}`}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">{scenario.explanation}</p>
          </div>
        )}
        {hasAnswered && (
          <button onClick={nextQuestion} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Næste spørgsmål →
          </button>
        )}
      </CardContent>
    </Card>
  );
}

/* ─────────────────── FAQ DATA ─────────────────── */

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er et blackjack skema, og hvordan læser man det?",
    answer: (
      <>
        Et blackjack skema er en visuelt farvekodet tabel, der viser den matematisk optimale handling (hit, stand, double down, split eller surrender) for enhver kombination af din hånd og dealerens synlige kort. Du finder din håndværdi i den lodrette kolonne og dealerens kort i den vandrette. Feltet, hvor de krydser, viser den korrekte handling. Skemaet er baseret på millioner af computersimulationers forventede værdi (EV) og reducerer house edge til det lavest mulige niveau – typisk omkring 0,5 % i en <Link to="/casinospil/blackjack" className={linkClass}>standard 6-deck blackjack</Link>.
      </>
    ),
  },
  {
    question: "Reducerer blackjack skemaet virkelig house edge?",
    answer: (
      <>
        Ja. En typisk uerfaren spiller giver casinoet en fordel på 2–5 %, mens en spiller, der følger basic strategy-skemaet perfekt, reducerer house edge til ca. 0,5 %. Det betyder, at for hver 1.000 kr. du indsætter, koster spillet dig i gennemsnit kun 5 kr. i stedet for 20–50 kr. Det er den mest effektive enkeltstrategi i ethvert <Link to="/live-casino/blackjack" className={linkClass}>live blackjack</Link>-format.
      </>
    ),
  },
  {
    question: "Virker blackjack skemaet i online RNG-blackjack?",
    answer:
      "Ja, basic strategy-skemaet er lige så gyldigt i RNG-blackjack (Random Number Generator) som i live-formater. Kortene blandes efter hver hånd i RNG-spil, men skemaets beregninger er baseret på det statistiske gennemsnit for enhver given bunke-komposition. Korttælling virker ikke i RNG-blackjack, men skemaet virker altid.",
  },
  {
    question: "Skal jeg bruge et andet skema til europæisk blackjack?",
    answer: (
      <>
        Ja. I <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>europæisk blackjack</Link> (ENHC-regler) modtager dealeren kun ét kort, inden spillerne handler. Det betyder, at du risikerer at miste fordoblings- og split-indsatser mod en potentiel dealer-blackjack. Skemaet justerer derfor: du fordobler og splitter mindre aggressivt mod dealer 10 og es sammenlignet med <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link>.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på hard og soft hands i blackjack skemaet?",
    answer:
      "En hard hand er enhver hånd uden et es, der tæller som 11 – eller en hånd hvor esset er tvunget til at tælle som 1 for at undgå bust. En soft hand indeholder et es, der tæller som 11, fx A+6 = soft 17. Soft hands er mere fleksible, fordi du aldrig kan buste med ét ekstra kort. Derfor er strategien ofte mere aggressiv (flere doubles) i soft-tabellen.",
  },
  {
    question: "Hvornår bør jeg surrendere ifølge blackjack skemaet?",
    answer: (
      <>
        Surrender (overgivelse) er optimalt i tre situationer: hard 16 mod dealer 9, 10 eller es; og hard 15 mod dealer 10. Du opgiver halvdelen af din indsats – hvilket er bedre end den forventede tabsrate på disse hænder. Ikke alle borde tilbyder surrender, men når det er tilgængeligt, er det et kraftfuldt værktøj. Se vores <Link to="/casinospil/blackjack" className={linkClass}>komplette blackjack guide</Link> for detaljer.
      </>
    ),
  },
  {
    question: "Kan man bruge blackjack skemaet i live casino?",
    answer: (
      <>
        Absolut. Skemaet er designet til at fungere ved fysiske borde med rigtige kort. I <Link to="/live-casino/blackjack" className={linkClass}>live blackjack online</Link> har du endda fordelen af at kunne have skemaet ved siden af skærmen. Tempoet er lidt langsommere end RNG, hvilket giver dig tid til at slå op. Mange erfarne spillere starter med at bruge skemaet ved live-borde og memorerer det gradvist over 50–100 sessioner.
      </>
    ),
  },
  {
    question: "Garanterer blackjack skemaet, at jeg vinder?",
    answer:
      "Nej. Skemaet minimerer house edge, men det eliminerer den ikke. Blackjack har stadig en indbygget fordel til casinoet på ca. 0,5 %. Det betyder, at du stadig vil opleve tab-serier (varians). Forskellen er, at du taber langsommere og vinder oftere end en spiller, der gætter. Over hundredvis af hænder er forskellen betydelig – men ingen strategi garanterer kortsigtet profit i et negativt EV-spil.",
  },
  {
    question: "Hvor lang tid tager det at lære blackjack skemaet udenad?",
    answer:
      "De fleste spillere kan lære de mest kritiske beslutninger (hard totals 12–17) på 2–3 timer. Det fulde skema med soft hands og pairs tager typisk 1–2 uger med daglig øvelse. Start med de hårde totaler, da de udgør ca. 60 % af alle hænder. Brug vores quiz-værktøj herover til at teste og træne dig selv.",
  },
  {
    question: "Er det lovligt at bruge et blackjack skema på et casino?",
    answer:
      "Ja, det er fuldt lovligt – både i fysiske casinoer og online. Casinoer har ingen juridisk grund til at forbyde det, da skemaet blot reflekterer matematisk optimal spil. I fysiske casinoer kan du endda medbringe et udskrevet skema. Det er en helt anden sag end korttælling, som casinoer aktivt modarbejder med hyppigere blandings-procedurer.",
  },
];

/* ─────────────────── PAGE COMPONENT ─────────────────── */

const BlackjackSkemaGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Blackjack Skema – Komplet Basic Strategy Tabel & Interaktiv Guide",
    description: "Det komplette blackjack skema med farvekodede HTML-tabeller for hard totals, soft totals og pairs. Interaktiv quiz, matematiske beregninger og fuld basic strategy guide.",
    url: `${SITE_URL}/casinospil/blackjack/skema`,
    datePublished: "2026-03-30",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
    about: [
      { "@type": "Thing", name: "Blackjack", url: "https://da.wikipedia.org/wiki/Blackjack" },
      { "@type": "Thing", name: "Basic Strategy" },
      { "@type": "Thing", name: "Casino Kortspil" },
    ],
    mentions: [
      { "@type": "Thing", name: "House Edge" },
      { "@type": "Thing", name: "Expected Value" },
      { "@type": "Organization", name: "Spillemyndigheden", url: "https://www.spillemyndigheden.dk" },
    ],
  });
  const howToSchema = buildHowToSchema({
    name: "Sådan bruger du et blackjack skema",
    pageUrl: `${SITE_URL}/casinospil/blackjack/skema`,
    description: "Trin-for-trin guide til at aflæse og anvende et blackjack basic strategy skema korrekt.",
    totalTime: "PT3M",
    steps: [
      { name: "Find din håndtype", text: "Afgør først om du har en hard hand (ingen es som 11), soft hand (es tæller som 11) eller et par. Vælg den tilsvarende tabel i skemaet." },
      { name: "Find din håndværdi i venstre kolonne", text: "Lokalisér din samlede håndværdi (fx hard 15, soft A,7, eller par 8,8) i den lodrette kolonne til venstre i tabellen." },
      { name: "Find dealerens synlige kort øverst", text: "Se dealerens opadvendte kort og find den tilsvarende kolonne i tabellens vandrette header (2 til A)." },
      { name: "Aflæs den optimale handling", text: "Hvor din række og dealerens kolonne krydser, finder du den farvekodede handling: Stand (S), Hit (H), Double Down (D), Split (P) eller Surrender (Rh/Rs)." },
      { name: "Udfør handlingen", text: "Følg skemaets anbefaling konsekvent. Afvig ikke baseret på mavefornemmelse. Over hundredvis af hænder vil skemaet producere markant bedre resultater end intuitivt spil." },
    ],
  });

  return (
    <>
      <SEO
        title="Blackjack Skema – Komplet Strategi Tabel & Guide"
        description="Interaktivt blackjack skema med farvekodede tabeller for hard totals, soft hands og pairs. Lær basic strategy og reducer house edge til 0,5 %. Inkl. gratis quiz."
        type="article"
        datePublished="2026-03-30"
        jsonLd={[articleSchema, faqJsonLd, howToSchema]}
      />
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <MenuIcon iconName="calculator" className="mr-1.5 h-3.5 w-3.5" />
              Matematisk analyse
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Blackjack Skema – Den Komplette Basic Strategy Guide
            </h1>
            <p className="text-lg text-white/80">
              Det farvekodede skema, der viser den matematisk optimale handling i enhver blackjack-situation. Baseret på millioner af simuleringer og anvendeligt i både online og live casino.
            </p>
          </div>
        </div>
      </section>

      <ContentPageLayout>
        <div className="mx-auto max-w-4xl">
          <AuthorMetaBar author="jonas" readTime="3 Min." />

          <SnippetAnswer
            answer="Et blackjack skema viser den statistisk optimale handling (hit, stand, double, split eller surrender) for enhver kombination af din hånd og dealerens kort. Ved at følge skemaet perfekt reduceres house edge fra 2–5 % til blot 0,5 % – den laveste fordel i noget casinospil."
          />

          <QuickComparisonTable count={3} title="Top 3 blackjack-casinoer – hurtig sammenligning" />

          <Separator className="my-10" />

          {/* ── Section 1: What is ── */}
          <section id="hvad-er" className="mb-10">
            <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
              <TableIcon className="h-6 w-6 text-primary" />
              Hvad er et blackjack skema?
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Et blackjack skema – også kaldet basic strategy chart eller strategitabel – er en komplet oversigt over den matematisk optimale handling i enhver tænkelig blackjack-situation. Skemaet er resultatet af millioner af computersimuleringer, der har beregnet den <strong>forventede værdi (EV)</strong> for hver mulige kombination af spillerens hånd og dealerens synlige kort.
            </p>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Konceptet blev først formaliseret af matematikeren Edward O. Thorp i 1962 med bogen <em>"Beat the Dealer"</em>, der demonstrerede, at blackjack ikke er et rent tilfældighedsspil. Thorps arbejde viste, at spillere med perfekt strategi kan reducere casinoets fordel til under 1 % – og med korttælling endda opnå en positiv forventet værdi. Det skema, vi præsenterer her, er den moderne videreudvikling af Thorps originale beregninger, tilpasset standard <Link to="/casinospil/blackjack" className={linkClass}>6-deck blackjack</Link> med de mest udbredte regelkombinationer i danske licenserede casinoer.
            </p>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Skemaet opdeles i tre separate tabeller: <strong>hard totals</strong> (hårde hænder uden fleksibelt es), <strong>soft totals</strong> (bløde hænder med et es der tæller som 11) og <strong>pairs</strong> (par der kan splittes). Denne opdeling er nødvendig, fordi den optimale strategi varierer fundamentalt mellem de tre håndtyper. En hard 17 skal altid standes, mens en soft 17 (A+6) ofte skal dobles mod svage dealer-kort.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Vigtigt: skemaet antager standardregler – dealer stands on soft 17 (S17), double after split tilladt (DAS), og late surrender tilladt. Hvis dit bord har afvigende regler, se afsnittet om <a href="#varianter" className={linkClass}>skema-variationer</a> herunder. For <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>europæisk blackjack</Link> gælder separate justeringer.
            </p>
          </section>

          <StickyCtaBySlug slug="mrgreen" />

          {/* ── Section 2-4: Strategy Tables ── */}
          <section className="mb-10">
            <h2 className="mb-6 text-3xl font-bold flex items-center gap-2">
              <MenuIcon iconName="bar-chart3" className="h-6 w-6 text-primary" />
              Det komplette blackjack skema
            </h2>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              Herunder finder du det fulde blackjack basic strategy skema opdelt i tre interaktive tabeller. Hold musen over et felt for at fremhæve alle felter med samme handling – det gør det nemmere at se mønstrene i strategien. Alle tabeller er baseret på standard 6-deck, S17, DAS, late surrender.
            </p>

            <StrategyTable title="Hard Totals" iconName="target" rows={hardTotals} id="hard-totals" />
            <StrategyTable title="Soft Totals (hænder med es)" iconName="sparkles" rows={softTotals} id="soft-totals" />
            <StrategyTable title="Pairs (split-beslutninger)" iconName="layers" rows={pairTotals} id="pairs" />
          </section>

          <ReviewScreenshot
            src={blackjackSkemaImg}
            alt="Komplet blackjack basic strategy skema med farvekodede felter for hard totals, soft totals og pairs – dealerens kort vs. din hånd"
            caption="Fysisk blackjack strategy chart: Det komplette skema med alle hard totals, soft hands og pairs. H = Hit, S = Stand, FN = Double Down, P = Split, H/R = Surrender/Hit, H/P = Split hvis DAS."
          />

          {/* ── Farvekoder ── */}
          <section id="farvekoder" className="mb-10">
            <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
              <MenuIcon iconName="eye" className="h-6 w-6 text-primary" />
              Farvekoder og handlinger forklaret
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-4">
              {(Object.entries(actionLabels) as [Action, string][]).map(([key, label]) => (
                <div key={key} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <span className={`inline-flex h-9 w-9 items-center justify-center rounded-md font-bold text-xs ${actionColors[key]}`}>{key}</span>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">
                      {key === "S" && "Stop med at trække kort – din hånd er stærk nok."}
                      {key === "H" && "Træk endnu et kort for at forbedre din hånd."}
                      {key === "D" && "Fordobl din indsats og modtag præcis ét kort mere."}
                      {key === "P" && "Split dine to ens kort til to separate hænder."}
                      {key === "Ds" && "Fordobl hvis tilladt, ellers stand."}
                      {key === "Rh" && "Opgiv hånden (mist halvdelen), ellers hit."}
                      {key === "Rs" && "Opgiv hånden, ellers stand."}
                      {key === "Ph" && "Split hvis double-after-split er tilladt, ellers hit."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <InlineCasinoCards title="Populære blackjack-casinoer" />

          {/* ── Sådan bruger du skemaet ── */}
          <section id="hvordan" className="mb-10">
            <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
              <ArrowRight className="h-6 w-6 text-primary" />
              Sådan bruger du blackjack skemaet – trin for trin
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              For at anvende skemaet korrekt skal du følge en fast beslutningsrækkefølge. Denne rækkefølge er afgørende, fordi den sikrer, at du altid vælger den mest profitable handling:
            </p>
            <div className="space-y-4 mb-6">
              {[
                { step: "1. Tjek for surrender", desc: "Har du hard 15 eller 16 mod dealer 9, 10 eller A? Hvis surrender er tilgængeligt, brug det. Du opgiver halvdelen af indsatsen og undgår en forventet tab på mere end 50 %." },
                { step: "2. Tjek for split", desc: "Har du et par? Se pairs-tabellen. Par af esser og 8'ere splittes altid. Par af 10'ere og 5'ere splittes aldrig. Resten afhænger af dealerens kort." },
                { step: "3. Tjek for double down", desc: "Har du en gunstig total (typisk 9, 10, 11 hard eller diverse soft totals mod svage dealer-kort)? Fordobling er den mest profitable enkelthandling i blackjack, når den er korrekt timet." },
                { step: "4. Hit eller stand", desc: "Hvis ingen af ovenstående gælder, afgør om du skal trække kort eller stå. Den generelle tommelfingerregel: med 12–16 mod dealer 7+ skal du hitte. Med 12–16 mod dealer 2–6 skal du stande (med undtagelse af 12 mod 2–3, som er hit)." },
              ].map((item) => (
                <Card key={item.step} className="border-border">
                  <CardContent className="p-4">
                    <p className="font-semibold text-foreground mb-1">{item.step}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Denne hierarkiske beslutningsproces sikrer, at du aldrig overser en surrender- eller double-mulighed, som typisk er de mest valuable afvigelser fra simpelt hit/stand. Mange spillere laver fejlen at tænke i binære hit/stand-termer og dermed gå glip af de mest profitable situationer. Øv denne rækkefølge med vores <a href="#quiz" className={linkClass}>interaktive quiz</a> herunder.
            </p>
          </section>

          {/* ── Matematik ── */}
          <section id="matematik" className="mb-10">
            <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
              <MenuIcon iconName="calculator" className="h-6 w-6 text-primary" />
              Matematikken bag blackjack skemaet
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Skemaet er ikke baseret på mavefornemmelse eller erfaring – det er ren matematik. Hver celle i tabellen repræsenterer den handling, der giver den højeste <strong>forventede værdi (EV)</strong> givet bunkesammensætningen. EV beregnes ved at simulere millioner af hænder for hver mulige kombination og analysere det gennemsnitlige resultat over tid.
            </p>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Lad os tage et konkret eksempel: du har hard 16, og dealeren viser en 10. De mulige handlinger og deres EV er:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-border rounded-lg" role="table">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="py-2.5 px-4 text-left font-semibold">Handling</th>
                    <th className="py-2.5 px-4 text-right font-semibold">EV per 100 kr. indsats</th>
                    <th className="py-2.5 px-4 text-right font-semibold">Forventet tab</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border/50">
                    <td className="py-2 px-4 text-muted-foreground">Stand</td>
                    <td className="py-2 px-4 text-right text-red-500 font-mono">−54,00 kr.</td>
                    <td className="py-2 px-4 text-right text-muted-foreground">Højt</td>
                  </tr>
                  <tr className="border-t border-border/50">
                    <td className="py-2 px-4 text-muted-foreground">Hit</td>
                    <td className="py-2 px-4 text-right text-red-500 font-mono">−53,70 kr.</td>
                    <td className="py-2 px-4 text-right text-muted-foreground">Højt</td>
                  </tr>
                  <tr className="border-t border-border/50 bg-emerald-500/5">
                    <td className="py-2 px-4 font-semibold text-foreground">Surrender ✓</td>
                    <td className="py-2 px-4 text-right text-emerald-600 dark:text-emerald-400 font-mono font-semibold">−50,00 kr.</td>
                    <td className="py-2 px-4 text-right text-muted-foreground">Lavest</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Surrender sparer dig altså 3,70 kr. per 100 kr. sammenlignet med at hitte, og 4,00 kr. sammenlignet med at stande. Over 1.000 hænder akkumulerer disse marginaler til en markant forskel i din samlede bankroll. Det er præcis dette beregningsgrundlag, der definerer hver eneste celle i skemaet.
            </p>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Dealerens bust-sandsynligheder er fundamentale for skemaets anbefalinger. Her er de eksakte sandsynligheder baseret på 6-deck blackjack med S17-regler:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-border rounded-lg" role="table">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="py-2.5 px-4 text-left font-semibold">Dealerens kort</th>
                    <th className="py-2.5 px-4 text-right font-semibold">Bust-sandsynlighed</th>
                    <th className="py-2.5 px-4 text-left font-semibold">Konsekvens</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["2", "35,3 %", "Moderat – stande med 13+"],
                    ["3", "37,6 %", "Moderat – stande med 13+"],
                    ["4", "40,3 %", "Stærkt – doble oftere"],
                    ["5", "42,9 %", "Stærkest – mest aggressive doubles"],
                    ["6", "42,1 %", "Stærkt – splitte og doble aggressivt"],
                    ["7", "26,2 %", "Svagt – hitte med 12–16"],
                    ["8", "24,4 %", "Svagt – hitte mere aggressivt"],
                    ["9", "23,3 %", "Svagt – overvej surrender"],
                    ["10/B/D/K", "21,4 %", "Svagest – surrender med 15–16"],
                    ["A", "11,5 %", "Ekstremt lavt – dealer dominerer"],
                  ].map(([kort, bust, konsekvens]) => (
                    <tr key={kort} className="border-t border-border/50">
                      <td className="py-2 px-4 font-semibold text-foreground">{kort}</td>
                      <td className="py-2 px-4 text-right font-mono text-muted-foreground">{bust}</td>
                      <td className="py-2 px-4 text-muted-foreground">{konsekvens}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Læg mærke til det dramatiske skift ved dealer 7. Under 7 buster dealer i 35–43 % af tilfældene, hvilket gør det profitabelt at stande med relativt lave totaler (12–16) og lade dealeren buste. Over 7 falder bust-sandsynligheden drastisk, og du er tvunget til at forbedre din hånd – selv med risiko for at buste selv. Dette er den fundamentale mekanik bag skemaets hit/stand-grænse.
            </p>
          </section>

          <ReviewScreenshot
            src={classicBlackjack}
            alt="Classic Blackjack-bord med basic strategy-beslutning om hit, stand eller double down"
            caption="Classic Blackjack – her kan du afprøve basic strategy-skemaet i praksis med lave indsatser"
            size="full"
          />

          <Separator className="my-8" />

          {/* ── Varianter ── */}
          <section id="varianter" className="mb-10">
            <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
              <Shuffle className="h-6 w-6 text-primary" />
              Skema-variationer for forskellige blackjack-regler
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Det grundlæggende skema ovenfor antager standardregler (6-deck, S17, DAS, late surrender). Men reglerne varierer mellem casinoer og varianter, og disse forskelle ændrer strategien. Her er de vigtigste justeringer:
            </p>
            <div className="space-y-4 mb-6">
              <Card className="border-border">
                <CardContent className="p-5">
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <MenuIcon iconName="alert-triangle" className="h-4 w-4 text-primary" />
                    Dealer Hits Soft 17 (H17)
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Øger house edge med ca. 0,22 procentpoint. Vigtigste justeringer: fordobl hard 11 mod dealer es (i stedet for hit), fordobl soft 19 (A,8) mod dealer 6, og surrender hard 15 mod dealer es samt hard 17 mod dealer es. H17-regler kræver generelt mere aggressiv fordobling og udvidet surrender.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-5">
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <MenuIcon iconName="layers" className="h-4 w-4 text-primary" />
                    <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>Europæisk Blackjack (ENHC)</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Dealeren modtager kun ét kort, før spillerne handler. Konsekvens: vær mindre aggressiv med doubles og splits mod dealer 10 og es, da du risikerer at miste hele fordoblingen mod en eventuel dealer-blackjack. Fordobl ikke hard 11 mod dealer es, split ikke 8'ere mod dealer es.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-5">
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <MenuIcon iconName="eye" className="h-4 w-4 text-primary" />
                    <Link to="/casinospil/blackjack/double-exposure-blackjack" className={linkClass}>Double Exposure</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Begge dealerens kort er synlige. Strategien ændres dramatisk: du kender den eksakte dealerhånd og kan træffe perfekte beslutninger. House edge kompenseres med 6:5-blackjack-udbetaling (i stedet for 3:2) og andre regelændringer. Et helt separat skema er nødvendigt.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-5">
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <MenuIcon iconName="sparkles" className="h-4 w-4 text-primary" />
                    <Link to="/casinospil/blackjack/spanish-21" className={linkClass}>Spanish 21</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Spilles med en 48-korts bunke (alle 10'ere fjernet). Spilleren vinder altid med 21, og der tilbydes bonusudbetalinger for bestemte kortkombinationer. Strategien er langt mere aggressiv med doubles og re-doubles, da manglen på 10'ere ændrer sandsynlighederne fundamentalt.
                  </p>
                </CardContent>
              </Card>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Tjek altid bordets specifikke regler, før du spiller. De mest kritiske regler at identificere er: antal decks, S17 vs. H17, DAS-tilgængelighed, surrender-mulighed og blackjack-udbetaling (3:2 vs. 6:5). En 6:5-udbetaling øger house edge med ca. 1,39 procentpoint – undgå altid 6:5-borde, hvis 3:2 er tilgængeligt.
            </p>
          </section>

          {/* ── Fejl ── */}
          <section id="fejl" className="mb-10">
            <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
              <MenuIcon iconName="alert-triangle" className="h-6 w-6 text-primary" />
              De 10 mest udbredte fejl ved blackjack-bordet
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Selv spillere, der kender skemaet, begår systematiske fejl. Her er de ti mest udbredte – og den matematiske pris for hver:
            </p>
            <div className="space-y-3 mb-6">
              {[
                { nr: "1", fejl: "Aldrig splitte 8'ere mod dealer 9/10/A", pris: "Koster 4–8 % EV per hånd. Hard 16 er den absolutte bundscorer – splitting giver to 8'ere, som er langt stærkere udgangspunkter." },
                { nr: "2", fejl: "Stande med hard 12 mod dealer 2 eller 3", pris: "Du buster kun i 31 % af tilfældene. Dealer 2-3 er ikke svagt nok til at retfærdiggøre passivitet med blot 12." },
                { nr: "3", fejl: "Aldrig fordoble soft hands", pris: "Soft 13–18 mod dealer 4–6 er alle double-situationer. Dit es giver dig garanti mod bust. At ignorere disse doubles koster 2–5 % EV." },
                { nr: "4", fejl: "Tage insurance", pris: "Insurance har 7,7 % house edge. Selv mod dealer-es har dealeren kun blackjack i 30,8 % af tilfældene. Det er et uafhængigt side-væddemål med forfærdelig EV." },
                { nr: "5", fejl: "Splitte 10'ere", pris: "Hard 20 er den næstbedste hånd efter 21. At konvertere den til to 10'ere er næsten altid tabsgivende – selv mod dealer 5 eller 6." },
                { nr: "6", fejl: "Splitte 5'ere", pris: "Par af 5'ere = hard 10, som er en af de stærkeste double-hænder. Splitting forvanlder en perfekt double til to svage 5'ere." },
                { nr: "7", fejl: "Aldrig surrendere", pris: "Surrender med hard 16 mod dealer 10 sparer 3,7 % EV per situation. Over tid akkumulerer dette til en betydelig bankroll-forskel." },
                { nr: "8", fejl: "Hitte hard 17+", pris: "At hitte med 17 eller højere er næsten altid forkert. Bust-sandsynligheden er for høj, og du forbedrer sjældent din position." },
                { nr: "9", fejl: "Spille efter 'streaks' eller mønstre", pris: "Hver hånd er uafhængig (især i RNG-blackjack). At øge indsatsen efter tab eller reducere den efter sejre har nul matematisk grundlag." },
                { nr: "10", fejl: "Vælge 6:5-borde over 3:2", pris: "6:5-blackjack-udbetaling øger house edge med 1,39 procentpoint. Det er den dyreste enkeltregel i hele spillet. Gå altid efter 3:2-borde." },
              ].map((item) => (
                <Card key={item.nr} className="border-border">
                  <CardContent className="p-4">
                    <p className="font-semibold text-foreground mb-1">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold mr-2">{item.nr}</span>
                      {item.fejl}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-8">{item.pris}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="my-8" />

          {/* ── Quiz ── */}
          <section className="mb-10">
            <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
              <MenuIcon iconName="brain" className="h-6 w-6 text-primary" />
              Test din blackjack-strategi
            </h2>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              Hvor godt kender du basic strategy? Vores interaktive quiz tester dig i de mest kritiske beslutningssituationer – præcis dem, hvor de fleste spillere taber unødig EV. Hver situation er hentet direkte fra skemaet ovenfor, med en detaljeret forklaring af det korrekte svar og den underliggende matematik.
            </p>
            <StrategyQuiz />
          </section>

          {/* ── EV analyse ── */}
          <section id="ev-tabel" className="mb-10">
            <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
              <MenuIcon iconName="trending-up" className="h-6 w-6 text-primary" />
              EV-analyse: De mest profitable og dyreste hænder
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Ikke alle hænder er skabt lige. Nogle situationer giver dig en positiv forventet værdi (profit), mens andre er dybt negative. Her er de 5 mest profitable og 5 dyreste hænder i standard 6-deck blackjack:
            </p>
            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <Card className="border-emerald-500/30 bg-emerald-500/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                    <MenuIcon iconName="check-circle2" className="h-5 w-5" />
                    Top 5 mest profitable
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm">
                    <li className="flex justify-between"><span className="text-muted-foreground">11 vs. dealer 5 (Double)</span><span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">+67,1 %</span></li>
                    <li className="flex justify-between"><span className="text-muted-foreground">11 vs. dealer 6 (Double)</span><span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">+66,5 %</span></li>
                    <li className="flex justify-between"><span className="text-muted-foreground">11 vs. dealer 4 (Double)</span><span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">+62,7 %</span></li>
                    <li className="flex justify-between"><span className="text-muted-foreground">10 vs. dealer 5 (Double)</span><span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">+56,2 %</span></li>
                    <li className="flex justify-between"><span className="text-muted-foreground">10 vs. dealer 6 (Double)</span><span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">+54,8 %</span></li>
                  </ol>
                </CardContent>
              </Card>
              <Card className="border-red-500/30 bg-red-500/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2 text-red-700 dark:text-red-400">
                    <MenuIcon iconName="x-circle" className="h-5 w-5" />
                    Top 5 dyreste hænder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm">
                    <li className="flex justify-between"><span className="text-muted-foreground">16 vs. dealer A</span><span className="font-mono font-semibold text-red-600 dark:text-red-400">−66,0 %</span></li>
                    <li className="flex justify-between"><span className="text-muted-foreground">16 vs. dealer 10</span><span className="font-mono font-semibold text-red-600 dark:text-red-400">−53,7 %</span></li>
                    <li className="flex justify-between"><span className="text-muted-foreground">15 vs. dealer A</span><span className="font-mono font-semibold text-red-600 dark:text-red-400">−52,8 %</span></li>
                    <li className="flex justify-between"><span className="text-muted-foreground">16 vs. dealer 9</span><span className="font-mono font-semibold text-red-600 dark:text-red-400">−51,2 %</span></li>
                    <li className="flex justify-between"><span className="text-muted-foreground">15 vs. dealer 10</span><span className="font-mono font-semibold text-red-600 dark:text-red-400">−50,0 %</span></li>
                  </ol>
                </CardContent>
              </Card>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Mønstret er klart: double down med 10 eller 11 mod svage dealer-kort er dine mest profitable situationer. Hard 15-16 mod stærke dealer-kort er de dyreste. Skemaets formål er at maksimere din tid i de grønne situationer og minimere skaden i de røde. Sammenlign disse tal med de <Link to="/casinospil/blackjack/martingale" className={linkClass}>Martingale-simulationer</Link>, der viser, hvorfor indsatsprogression ikke kan overvinde disse fundamentale sandsynligheder.
            </p>
          </section>

          {/* ── Online vs Live ── */}
          <section id="online-vs-live" className="mb-10">
            <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
              <MenuIcon iconName="shield-check" className="h-6 w-6 text-primary" />
              Online blackjack vs. live blackjack: Hvornår virker skemaet bedst?
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Basic strategy-skemaet virker i begge formater, men der er vigtige forskelle, som påvirker din samlede strategi og bankroll management:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-border rounded-lg" role="table">
                <thead>
                  <tr className="bg-muted-foreground/10">
                    <th className="py-2.5 px-4 text-left font-semibold">Parameter</th>
                    <th className="py-2.5 px-4 text-left font-semibold">RNG-Blackjack</th>
                    <th className="py-2.5 px-4 text-left font-semibold"><Link to="/live-casino/blackjack" className={linkClass}>Live Blackjack</Link></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Skema effektivitet", "100 % gældende", "100 % gældende"],
                    ["Korttælling mulig", "Nej (ny bunke per hånd)", "Ja (begrænset af penetration)"],
                    ["Spilletempo", "400–600 hænder/time", "50–80 hænder/time"],
                    ["Minimum indsats", "Typisk 5–10 kr.", "Typisk 50–100 kr."],
                    ["Social interaktion", "Ingen", "Chat + live dealer"],
                    ["Bankroll-krav (4 timer)", "ca. 2.000 kr.", "ca. 5.000 kr."],
                    ["House edge (S17, 3:2)", "~0,50 %", "~0,50 %"],
                    ["Varians per session", "Lavere (mange hænder)", "Højere (færre hænder)"],
                  ].map(([param, rng, live]) => (
                    <tr key={param} className="border-t border-border/50">
                      <td className="py-2 px-4 font-semibold text-foreground">{param}</td>
                      <td className="py-2 px-4 text-muted-foreground">{rng}</td>
                      <td className="py-2 px-4 text-muted-foreground">{live}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Konklusionen er enkel: skemaet er dit vigtigste værktøj uanset format. I RNG-blackjack er det din eneste strategiske fordel. I <Link to="/live-casino/blackjack" className={linkClass}>live blackjack</Link> er det fundamentet, som korttælling bygger oven på. Vælg format baseret på dit budget og dine præferencer – ikke baseret på forestillinger om, at det ene format er mere "fair" end det andet.
            </p>
          </section>

          {/* ── Korttælling ── */}
          <section id="korttaelling" className="mb-10">
            <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
              <MenuIcon iconName="zap" className="h-6 w-6 text-primary" />
              Fra skema til korttælling: Det næste niveau
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Basic strategy er fundamentet – men det giver dig ikke en fordel over casinoet. For det kræves korttælling, som justerer dine beslutninger baseret på de resterende kort i bunken. Her er de tre mest udbredte systemer og deres relation til skemaet:
            </p>
            <div className="space-y-4 mb-6">
              <Card className="border-border">
                <CardContent className="p-5">
                  <h3 className="font-bold text-foreground mb-2">Hi-Lo Systemet (begynder)</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tildeler +1 til lave kort (2–6), 0 til neutrale (7–9) og −1 til høje (10–A). En positiv running count indikerer en bunke rig på høje kort, hvilket favoriserer spilleren. Ved true count +2 eller højere øges indsatsen. Ved +3 eller højere justeres visse skema-beslutninger (fx insurance bliver profitabelt). Hi-Lo er det bedste system for spillere, der lige har mestret basic strategy og vil tage skridtet videre.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-5">
                  <h3 className="font-bold text-foreground mb-2">KO Systemet (begynder-mellemniveau)</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Identisk med Hi-Lo, men bruger en ubalanceret optælling, der eliminerer behovet for at konvertere til true count. Det gør systemet hurtigere at anvende i praksis, men med en marginal præcisionsnedgang. KO er ideelt, hvis du finder true count-beregningen forstyrrende under spil.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-5">
                  <h3 className="font-bold text-foreground mb-2">Hi-Opt II (avanceret)</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Bruger en flerlagsopdeling med værdier fra −2 til +2 for højere præcision. Kræver betydeligt mere mental kapacitet og er kun egnet for dedikerede spillere med hundredvis af timers øvelse. Fordelen over Hi-Lo er ca. 0,02 procentpoint i EV – marginalt, men relevant i højvolumen-spil.
                  </p>
                </CardContent>
              </Card>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Vigtigt: korttælling fungerer <strong>kun</strong> i live-formater med fysiske kort, hvor bunkens sammensætning ændrer sig progressivt. I RNG-blackjack blandes kortene virtuelt efter hver hånd, hvilket gør tælling umulig. For en dybere analyse af progressions-systemer, se vores guides til <Link to="/casinospil/blackjack/martingale" className={linkClass}>Martingale</Link>, <Link to="/casinospil/blackjack/fibonacci" className={linkClass}>Fibonacci</Link> og <Link to="/casinospil/blackjack/dalembert" className={linkClass}>D'Alembert</Link>.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Husk også, at danske online casinoer under <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> er regulerede og bruger certificerede RNG-systemer. Korttælling er lovligt, men casinoer kan begrænse din adgang, hvis de mistænker systematisk tælning. Spil altid <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt</Link> og inden for dit budget.
            </p>
          </section>

          <Separator className="my-8" />

          {/* ── Cluster navigation ── */}
          <section className="mb-10">
            <h2 className="mb-4 text-3xl font-bold">Udforsk hele blackjack-clusteret</h2>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Blackjack skemaet er fundamentet, men der er langt mere at lære. Udforsk vores komplette blackjack-bibliotek med variant-guides, strategi-analyser og matematiske dykninger:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { to: "/casinospil/blackjack", title: "Blackjack Guide (hub)", desc: "Komplet oversigtside med regler, house edge, strategi og alt du skal vide." },
                { to: "/casinospil/blackjack/amerikansk-blackjack", title: "Amerikansk Blackjack", desc: "Hole card-regler, peek-mekanik og tilpasset basic strategy." },
                { to: "/casinospil/blackjack/europaeisk-blackjack", title: "Europæisk Blackjack", desc: "ENHC-regler, no hole card og justeret skema." },
                { to: "/casinospil/blackjack/double-exposure-blackjack", title: "Double Exposure", desc: "Begge dealer-kort synlige – helt ny strategi." },
                { to: "/casinospil/blackjack/spanish-21", title: "Spanish 21", desc: "48-korts bunke, bonusudbetalinger og aggressiv strategi." },
                { to: "/casinospil/blackjack/martingale", title: "Martingale System", desc: "Fordoblingsstrategien analyseret: matematik og Risk of Ruin." },
                { to: "/casinospil/blackjack/fibonacci", title: "Fibonacci System", desc: "Langsommere progression, lavere varians, samme resultat." },
                { to: "/casinospil/blackjack/dalembert", title: "D'Alembert System", desc: "Konservativ +1/−1 progression og variansanalyse." },
              ].map((item) => (
                <Link key={item.to} to={item.to} className="group block rounded-lg border border-border p-4 transition-colors hover:border-primary/50">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <CasinospilMoneyLinks gameName="Blackjack" currentPath="/casinospil/blackjack/skema" />
          <LatestNewsByCategory pagePath="/casinospil/blackjack/skema" />
          <RelatedGuides currentPath="/casinospil/blackjack/skema" />

          {/* ── FAQ ── */}
          <section id="faq">
            <FAQSection faqs={faqs} />
          </section>

          <AuthorBio author="jonas" />
        </div>
      </ContentPageLayout>
      <StickyCtaBySlug slug="campobet" />
    </>
  );
};

export default BlackjackSkemaGuide;
