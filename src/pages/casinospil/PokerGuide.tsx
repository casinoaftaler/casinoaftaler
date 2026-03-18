import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { AuthorBio } from "@/components/AuthorBio";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { CasinospilMoneyLinks } from "@/components/CasinospilMoneyLinks";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Target,
  ShieldCheck,
  BarChart3,
  Layers,
  Zap,
  Trophy,
  Brain,
  Users,
  AlertTriangle,
  ArrowRight,
  Scale,
  Shuffle,
  Gamepad2,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import pokerHero from "@/assets/heroes/poker-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

/* ─────────────────── CLUSTER NAVIGATION ─────────────────── */

const pokerCluster = [
  {
    to: "/casinospil/poker/texas-holdem",
    title: "Texas Hold'em",
    desc: "Verdens mest spillede variant – preflop ranges, position, 3-bet strategi og GTO-fundamenter.",
    icon: Target,
  },
  {
    to: "/casinospil/poker/omaha",
    title: "Omaha (PLO)",
    desc: "Fire hole cards, must-use-2-reglen, wraps, SPR-modeller og blocker-baseret bluffing.",
    icon: Layers,
  },
  {
    to: "/casinospil/poker/poker-strategi",
    title: "Poker Strategi",
    desc: "Avanceret EV-analyse, ICM-beregninger, solver-metodik og mental game mastery.",
    icon: Brain,
  },
  {
    to: "/casinospil/poker/video-poker",
    title: "Video Poker",
    desc: "Jacks or Better, Deuces Wild – op til 100,76 % RTP med perfekt strategi og pay table-analyse.",
    icon: Gamepad2,
  },
  {
    to: "/casinospil/poker/three-card-poker",
    title: "Three Card Poker",
    desc: "Q-6-4-strategien, Pair Plus-odds, 6 Card Bonus og dealer-qualifying-matematik.",
    icon: Zap,
  },
  {
    to: "/casinospil/poker/caribbean-stud",
    title: "Caribbean Stud Poker",
    desc: "AK-Q-8-3-strategien, progressive jackpot break-even og optimal sideindsats-analyse.",
    icon: Trophy,
  },
];

/* ───────────────────────── FAQ ───────────────────────── */

const pokerFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Er poker lovligt i Danmark?",
    answer: (
      <>
        Ja. Poker er fuldt lovligt i Danmark på casinoer med licens fra den danske <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighed</Link>. Det gælder både casino poker (mod huset), spiller-vs-spiller poker (turneringer og cash games) og Video Poker. Gevinster er skattefrie, forudsat du spiller på et licenseret casino. Spiller du på et casino uden dansk licens, er gevinster skattepligtige, og du mangler forbrugerbeskyttelse og ROFUS-adgang.
      </>
    ),
  },
  {
    question: "Er poker held eller færdighed?",
    answer:
      "Begge dele – men fordelingen afhænger af tidshorisonten. I en enkelt hånd dominerer held: de bedste kort vinder uanset strategi. Over 100 hænder spiller færdighed en rolle, men variansen er stadig høj. Over 10.000+ hænder er poker entydigt et færdighedsspil – vindende spillere vinder konsistent, tabende spillere taber konsistent. Akademisk forskning (fx Cigital-studiet fra 2012 med 103 millioner hænder) bekræfter, at færdighed er den dominerende faktor over tilstrækkeligt mange hænder. Det er grunden til, at professionelle pokerspillere eksisterer – der er ingen professionelle roulette-spillere.",
  },
  {
    question: "Hvad er den bedste pokervariant for begyndere?",
    answer: (
      <>
        <Link to="/casinospil/poker/texas-holdem" className={linkClass}>Texas Hold'em</Link> er det klare valg for begyndere. Det har simple regler (to håndsort, fem fælles kort), enorm mængde læringsmateriale tilgængeligt, og det er den mest spillede variant online, så du finder altid borde med spillere på dit niveau. No-Limit Hold'em med mikro-stakes (0,01/0,02 kr. blinds) giver dig mulighed for at lære spillet med minimal finansiel risiko. Alternativt er <Link to="/casinospil/poker/video-poker" className={linkClass}>Jacks or Better Video Poker</Link> fremragende for at lære håndstyrkerne, fordi du får øjeblikkelig feedback på dine beslutninger.
      </>
    ),
  },
  {
    question: "Hvad betyder pot odds i poker?",
    answer: (
      <>
        Pot odds er forholdet mellem puljens størrelse og det beløb, du skal betale for at fortsætte. Eksempel: puljen er 300 kr., din modstander satser 100 kr., puljen er nu 400 kr. Du skal betale 100 kr. – dine pot odds er 4:1. Det betyder, at du skal vinde mere end 1 ud af 5 gange (20 %) for at et call er profitabelt. Sammenlign pot odds med din equity (sandsynlighed for at vinde hånden) for at træffe matematisk korrekte beslutninger. Læs mere i vores <Link to="/casinospil/poker/poker-strategi" className={linkClass}>poker strategi-guide</Link>.
      </>
    ),
  },
  {
    question: "Kan man leve af poker?",
    answer: (
      <>
        I teorien ja – i praksis gør meget få det. Professionelle pokerspillere eksisterer, men livsstilen kræver: (1) konsistent edge over dine modstandere på dit stakelevel, (2) en bankroll på minimum 50–100 buy-ins for at overleve varians, (3) evnen til at spille 30.000+ hænder pr. måned, (4) disciplin til at håndtere tabsperioder, der kan vare uger eller måneder, (5) skatteforståelse og økonomisk planlægning. De fleste spillere, der forsøger at leve af poker, vender tilbage til et fast job inden for 1–2 år. <Link to="/ansvarligt-spil" className={linkClass}>Ansvarligt spil</Link> betyder også ærlig selvvurdering af egne evner.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på cash game og turnering?",
    answer:
      "I cash games repræsenterer chips rigtige penge – du kan købe ind og forlade bordet når som helst. I turneringer betaler du en fast buy-in og modtager et startstack af turneringschips – du spiller, til du enten er elimineret eller vinder. Cash games belønner konsistent, tålmodig spil; turneringer belønner aggressivitet og tilpasningsevne. Cash games har lavere varians (du kan vælge dine hænder), turneringer har højere varians (du skal vinde mange coin flips for at nå langt). De fleste professionelle spiller primært cash games for stabil indkomst og turneringer for store udbetaler.",
  },
  {
    question: "Er online poker rigget?",
    answer: (
      <>
        Nej – ikke på licenserede platforme. Online poker-software bruger certificerede RNG-systemer, der testes af uafhængige laboratorier (eCOGRA, iTech Labs, BMM Testlabs). Den danske Spillemyndighed kræver regelmæssig dokumentation og audit af alle poker-platforme. Det, der ofte <em>føles</em> som rigging, er variansens naturlige effekt: du vil opleve bad beats, coolers og tilsyneladende umulige suckouts. Men disse hændelser forekommer med præcis den frekvens, som sandsynlighedsteorien forudsiger.
      </>
    ),
  },
  {
    question: "Hvor meget bankroll skal man have til poker?",
    answer:
      "Tommelfingerregler: Cash games: 20–30 buy-ins for det stakelevel, du spiller. Med 500 kr. buy-in behøver du 10.000–15.000 kr. bankroll. Turneringer: 50–100 buy-ins pga. højere varians. Med 100 kr. buy-in behøver du 5.000–10.000 kr. Mikrostakes (0,01/0,02): 500–1.000 kr. er tilstrækkeligt. Disse regler beskytter dig mod at gå broke under normale varianssvings.",
  },
  {
    question: "Hvad er forskellen på casino poker og spiller-vs-spiller poker?",
    answer: (
      <>
        Casino poker (<Link to="/casinospil/poker/caribbean-stud" className={linkClass}>Caribbean Stud</Link>, <Link to="/casinospil/poker/three-card-poker" className={linkClass}>Three Card Poker</Link>, Casino Hold'em) spilles mod huset med en fast house edge – du kan ikke eliminere husets fordel. Spiller-vs-spiller poker (<Link to="/casinospil/poker/texas-holdem" className={linkClass}>Texas Hold'em</Link>, <Link to="/casinospil/poker/omaha" className={linkClass}>Omaha</Link>) spilles mod andre mennesker, og casinoet tager kun rake. En dygtig spiller kan have positiv EV i spiller-vs-spiller poker – det er umuligt i casino poker.
      </>
    ),
  },
];

/* ───────────────────────── PAGE ───────────────────────── */

const PokerGuide = () => {
  const faqJsonLd = buildFaqSchema(pokerFaqs);
  const articleSchema = buildArticleSchema({
    headline: "Poker Guide 2026 – Varianter, Strategi, Matematik og Dansk Regulering",
    description:
      "Komplet cornerstone poker-guide: Texas Hold'em, Omaha, Video Poker, håndrangeringer, pot odds, varians, rake-analyse og dansk regulering. Hub for alle poker-guides.",
    url: `${SITE_URL}/casinospil/poker`,
    datePublished: "2026-02-15",
    dateModified: "2026-03-18",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Poker Guide 2026 – Varianter, Matematik og Odds"
        description="Komplet poker-guide: Hold'em, Omaha, Video Poker, håndrangeringer, pot odds, varians, rake og bankroll management. Hub for alle poker-guides."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Brain className="mr-1.5 h-3.5 w-3.5" /> Cornerstone Guide · Marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Poker – Den Komplette Guide til Held, Matematik og Psykologi
            </h1>
            <p className="text-lg text-white/80">
              Varianter, position, pot odds, varians, rake-analyse og dansk regulering – cornerstone-guiden til alle poker-guides.
            </p>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="18-03-2026" readTime="38 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={pokerHero}
            alt="Pokerbord med kort, chips og spillere i fokuseret session"
            width={1920}
            height={600}
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        {/* ═══════════════ 1 – INTRODUKTION ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Poker på 3 Niveauer – Held, Matematik og Psykologi</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Poker adskiller sig fundamentalt fra alle andre <Link to="/casinospil" className={linkClass}>casinospil</Link>. I <Link to="/casinospil/roulette" className={linkClass}>roulette</Link> og <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> er du op mod et hus med en fast matematisk fordel – intet du gør ændrer odds'ene. I poker spiller du mod andre mennesker, og casinoet tager kun en procentdel af puljen (rake). Det betyder, at en dygtig spiller kan have en positiv forventet værdi – et koncept, der er umuligt i de fleste casinospil.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Poker opererer på tre overlappende niveauer. <strong>Niveau 1: Held.</strong> Kortene er tilfældige. Du kan ikke kontrollere, om du får pocket aces eller 7-2 offsuit. I et enkelt spin af det metaforiske hjul er poker næsten rent held. <strong>Niveau 2: Matematik.</strong> Sandsynlighedsberegning, pot odds, outs og equity giver dig et analytisk fundament for at træffe korrekte beslutninger med ufuldstændig information. Over mange hænder konvergerer korrekte matematiske beslutninger mod profit. <strong>Niveau 3: Psykologi.</strong> Læsning af modstandere, timing af bluffs, kontrol af egne fortællende signaler (tells) og mental robusthed under pres adskiller gode spillere fra gennemsnitlige.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En begynder opererer primært på niveau 1 – de spiller de kort, de får, og håber på det bedste. En kompetent spiller mestrer niveau 2 – de beregner pot odds, forstår position og træffer matematisk funderede beslutninger. En ekspert integrerer alle tre niveauer og tilpasser sin strategi til hver eneste modstander ved bordet. Det er denne dybde, der gør poker unikt: det er et spil, du kan studere i årtier og stadig finde nye lag.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Denne cornerstone-guide fungerer som dit overblik over hele poker-universet. Vi dækker varianter, matematik, strategi, psykologi, regulering og det danske marked – og linker til dybdegående specialguides for hvert emne. Brug denne side som dit kompas og dyk ned i de emner, der interesserer dig mest.
          </p>
        </section>

        {/* ═══════════════ CLUSTER NAVIGATION GRID ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            Udforsk Alle Poker-Guides
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Vores poker-cluster dækker alt fra den mest spillede variant i verden til avancerede strategimodeller. Hver guide er skrevet i 7.000+ ord med matematiske modeller, EV-tabeller og konkret strategi for danske spillere.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pokerCluster.map((spoke) => (
              <Link key={spoke.to} to={spoke.to} className="group">
                <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg group-hover:text-primary transition-colors">
                      <spoke.icon className="h-5 w-5 text-primary" />
                      {spoke.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{spoke.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Læs guide <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <InlineCasinoCards title="Bedste Casinoer til Poker" count={6} />

        <Separator className="my-10" />

        {/* ═══════════════ 2 – VARIANTER MAKRO-ANALYSE ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">De Mest Spillede Pokervarianter – Makro-Overblik</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Poker er ikke ét spil – det er en familie af spil med fælles principper men vidt forskellige regler, strategier og dynamikker. At forstå de vigtigste varianter hjælper dig med at finde den, der passer din spillestil og risikoappetit.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Spiller-vs-Spiller Varianter (Positiv EV mulig)</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong><Link to="/casinospil/poker/texas-holdem" className={linkClass}>Texas Hold'em</Link></strong> er verdens mest spillede pokervariant og den variant, der spilles i World Series of Poker. Hver spiller modtager to private kort (hole cards), og fem fælles kort (community cards) afsløres i tre faser: flop (tre kort), turn (ét kort) og river (ét kort). No-Limit Hold'em (ingen loft over indsatser) er den mest populære form. Strategisk dybde: preflop ranges, 3-bet/4-bet-dynamik, continuation betting, barrel-strategier og GTO vs. exploitative play. Hold'em er det bedste udgangspunkt for alle pokerspillere og har det dybeste læringsøkosystem.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong><Link to="/casinospil/poker/omaha" className={linkClass}>Omaha (PLO)</Link></strong> er Hold'ems mere komplekse fætter. Hver spiller modtager fire hole cards, men du <em>skal</em> bruge præcis to af dine hole cards og præcis tre community cards. Denne "must-use-2"-regel skaber en dramatisk anderledes dynamik: stærkere gennemsnitlige vinderhænder, mere action og højere varians. PLO kræver bedre forståelse af equity distribution, wraps (20-outs straight draws) og SPR-modeller (Stack-to-Pot Ratio). Det er varianten for spillere, der ønsker mere kompleksitet og action end Hold'em.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Casino Poker (Fast House Edge)</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong><Link to="/casinospil/poker/caribbean-stud" className={linkClass}>Caribbean Stud Poker</Link></strong> spilles mod huset: du modtager fem kort, dealeren modtager fem kort (ét synligt). Du beslutter om du vil raise eller folde baseret på din håndstyrke og dealerens synlige kort. <Link to="/ordbog/house-edge" className={linkClass}>House edge</Link> er ~5,2 % – markant højere end <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> – men progressiv jackpot-sideindsatsen kan være break-even ved høje jackpots (typisk over 263.000 kr.). AK-Q-8-3-strategien reducerer house edge til minimum.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong><Link to="/casinospil/poker/three-card-poker" className={linkClass}>Three Card Poker</Link></strong> er den hurtigste poker-variant i casinoet: tre kort, én beslutning (play eller fold). Q-6-4-strategien er optimal og enkel at huske. Ante-Play har 3,37 % house edge; Pair Plus har 2,32 %. Det er ideelt for spillere, der ønsker poker-stemning uden den strategiske kompleksitet af Hold'em. Dealeren kvalificerer sig med Queen-high eller bedre – i 33,6 % af hænderne kvalificerer dealeren sig ikke, og du vinder automatisk ante-indsatsen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong><Link to="/casinospil/poker/video-poker" className={linkClass}>Video Poker</Link></strong> kombinerer pokerhænder med maskinspil og tilbyder nogle af de højeste RTP-værdier i hele casinobranchen. Jacks or Better 9/6 (full pay) har 99,54 % RTP med perfekt strategi. Deuces Wild (med optimal pay table) når 100,76 % – en af de eneste casinospil med positiv forventet værdi. Video Poker er poker for den analytiske spiller, der foretrækker matematik over psykologi.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Variant-sammenligning: Struktur, Risiko og EV</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold">Variant</th>
                  <th className="px-4 py-3 text-center font-semibold">Format</th>
                  <th className="px-4 py-3 text-center font-semibold">House Edge / Rake</th>
                  <th className="px-4 py-3 text-center font-semibold">Varians</th>
                  <th className="px-4 py-3 text-center font-semibold">Kompleksitet</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium"><Link to="/casinospil/poker/texas-holdem" className={linkClass}>Texas Hold'em</Link></td><td className="px-4 py-2 text-center">PvP</td><td className="px-4 py-2 text-center">2,5–5 % rake</td><td className="px-4 py-2 text-center">Høj</td><td className="px-4 py-2 text-center">⭐⭐⭐⭐</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium"><Link to="/casinospil/poker/omaha" className={linkClass}>Omaha (PLO)</Link></td><td className="px-4 py-2 text-center">PvP</td><td className="px-4 py-2 text-center">2,5–5 % rake</td><td className="px-4 py-2 text-center">Meget høj</td><td className="px-4 py-2 text-center">⭐⭐⭐⭐⭐</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium"><Link to="/casinospil/poker/video-poker" className={linkClass}>Video Poker</Link></td><td className="px-4 py-2 text-center">vs. Hus</td><td className="px-4 py-2 text-center">0,46–5 %</td><td className="px-4 py-2 text-center">Lav–Middel</td><td className="px-4 py-2 text-center">⭐⭐⭐</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium"><Link to="/casinospil/poker/three-card-poker" className={linkClass}>Three Card Poker</Link></td><td className="px-4 py-2 text-center">vs. Hus</td><td className="px-4 py-2 text-center">2,32–3,37 %</td><td className="px-4 py-2 text-center">Lav</td><td className="px-4 py-2 text-center">⭐⭐</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium"><Link to="/casinospil/poker/caribbean-stud" className={linkClass}>Caribbean Stud</Link></td><td className="px-4 py-2 text-center">vs. Hus</td><td className="px-4 py-2 text-center">~5,2 %</td><td className="px-4 py-2 text-center">Middel</td><td className="px-4 py-2 text-center">⭐⭐⭐</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm">
            PvP = spiller-vs-spiller. House edge for casino-varianter er beregnet med optimal strategi. Rake for PvP-varianter er typisk 2,5–5 % med cap per pot.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 3 – HÅNDRANGERINGER ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Håndrangeringer – Hvorfor Nogle Kombinationer Slår Andre</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Pokerhænders rækkefølge er ikke vilkårlig – den er baseret på sandsynlighed. Jo sjældnere en hånd er, jo højere rangerer den. Denne logik er elegant og konsistent: de hænder, der er sværest at lave, vinder over dem, der er lettere.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold">Rang</th>
                  <th className="px-4 py-3 text-left font-semibold">Hånd</th>
                  <th className="px-4 py-3 text-left font-semibold">Eksempel</th>
                  <th className="px-4 py-3 text-center font-semibold">Sandsynlighed (5 kort)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">1</td><td className="px-4 py-2">Royal Flush</td><td className="px-4 py-2">A♠ K♠ Q♠ J♠ 10♠</td><td className="px-4 py-2 text-center">0,000154 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">2</td><td className="px-4 py-2">Straight Flush</td><td className="px-4 py-2">5♥ 6♥ 7♥ 8♥ 9♥</td><td className="px-4 py-2 text-center">0,00139 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">3</td><td className="px-4 py-2">Four of a Kind</td><td className="px-4 py-2">K♠ K♥ K♦ K♣ 3♠</td><td className="px-4 py-2 text-center">0,024 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">4</td><td className="px-4 py-2">Full House</td><td className="px-4 py-2">Q♠ Q♥ Q♦ 7♣ 7♠</td><td className="px-4 py-2 text-center">0,144 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">5</td><td className="px-4 py-2">Flush</td><td className="px-4 py-2">A♦ J♦ 8♦ 4♦ 2♦</td><td className="px-4 py-2 text-center">0,197 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">6</td><td className="px-4 py-2">Straight</td><td className="px-4 py-2">4♣ 5♠ 6♥ 7♦ 8♣</td><td className="px-4 py-2 text-center">0,392 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">7</td><td className="px-4 py-2">Three of a Kind</td><td className="px-4 py-2">9♠ 9♥ 9♦ K♣ 2♠</td><td className="px-4 py-2 text-center">2,11 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">8</td><td className="px-4 py-2">Two Pair</td><td className="px-4 py-2">J♠ J♥ 4♦ 4♣ A♠</td><td className="px-4 py-2 text-center">4,75 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">9</td><td className="px-4 py-2">One Pair</td><td className="px-4 py-2">10♠ 10♥ A♦ 7♣ 3♠</td><td className="px-4 py-2 text-center">42,26 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">10</td><td className="px-4 py-2">High Card</td><td className="px-4 py-2">A♠ J♦ 8♣ 4♥ 2♠</td><td className="px-4 py-2 text-center">50,12 %</td></tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tabellen afslører en vigtig indsigt: over halvdelen af alle fem-korts hænder (50,12 %) er "ingenting" – High Card. One Pair udgør yderligere 42,26 %. Det betyder, at 92,38 % af alle hænder er ét par eller dårligere. Stærke hænder som Full House og bedre udgør kun 0,17 % af alle hænder. Denne fordeling forklarer, hvorfor poker er et spil om relativ styrke – et par tiere er ofte den bedste hånd ved bordet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Texas Hold'em-specifikt:</strong> Med syv tilgængelige kort (to hole + fem community) stiger sandsynlighederne markant. Sandsynligheden for at lave mindst ét par er ca. 83 %. To par: 23,5 %. Three of a Kind: 4,83 %. Full House: 2,6 %. Flush: 3,03 %. Straight: 4,62 %. Det betyder, at vinderhånden i Hold'em gennemsnitligt er stærkere end i Five Card Draw.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Vigtig nuance:</strong> I Hold'em afgør "kicker"-kortet ofte vinderen. Hvis to spillere begge har et par esser, vinder den med det højeste sidekort. At forstå kicker-konceptet er kritisk – mange begyndere taber store potter, fordi de overser, at deres kicker er svag. Læs mere om preflop håndselection i vores <Link to="/casinospil/texas-holdem" className={linkClass}>Texas Hold'em-guide</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 4 – POSITION ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Position Ved Bordet – Den Skjulte Fordel</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Position er det mest undervurderede koncept i poker – og det mest magtfulde. Din position ved bordet bestemmer, hvornår du handler relativt til dine modstandere, og den information, du har til rådighed, når du træffer din beslutning. Sen position (tæt på dealer-knappen) er en enorm fordel, fordi du ser, hvad dine modstandere gør, før du selv handler.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Blinds:</strong> De to spillere til venstre for dealerknappen poster obligatoriske indsatser: small blind (typisk halvdelen af big blind) og big blind. Blinds er i den dårligste position postflop – de handler først i alle resterende betting-runder. Professionelle spillere taber konsekvent penge fra blind-positionerne; målet er at minimere tabet, ikke at profitere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Early position (UTG, UTG+1, UTG+2):</strong> De første spillere efter big blind. De handler først preflop og har den mindste mængde information. Early position kræver en stram håndselection: top 10–15 % af starthænder. I <Link to="/casinospil/omaha-poker" className={linkClass}>Omaha</Link> er dette endnu mere kritisk pga. de fire hole cards.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Late position (CO/Cutoff og BTN/Button):</strong> Button er den mest profitable position i poker – du handler altid sidst postflop og har maksimal information. Fra Button kan du spille 35–45 % af alle starthænder profitabelt. De fleste vindende pokerspillere tjener størstedelen af deres profit fra late position.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Praktisk implikation:</strong> Hvis du er begynder og kun vil ændre én ting i dit spil, er det dette: spil strammere fra early position og løsere fra late position. Denne simple justering alene kan transformere en tabende spiller til en break-even spiller. For avanceret positional play, se vores <Link to="/casinospil/poker-strategi" className={linkClass}>poker strategi-guide</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 5 – OUTS OG POT ODDS ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sandsynligheder, Outs og Pot Odds</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            "Outs" er antallet af kort, der forbliver i bunken, og som vil forbedre din hånd til en forventet vinder. At tælle outs korrekt er den første byggesten i pokerens matematik.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Flush draw (9 outs):</strong> Du har A♥ 7♥ og boardet viser K♥ 3♥ 9♠. 13 hjerter minus 4 sete = 9 outs. Sandsynlighed for turn: 9/47 = 19,1 %. Turn + river: ca. 35 %. <strong>Open-ended straight draw (8 outs):</strong> Du har 8♠ 9♣ og boardet viser 6♦ 7♥ K♣. 8 outs. Turn: 17,0 %. Turn + river: ca. 31,5 %. <strong>Gutshot (4 outs):</strong> Turn: 8,5 %. Turn + river: ca. 16,5 %.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>"Reglen om 2 og 4":</strong> Gang dine outs med 2 for sandsynlighed med ét kort, og med 4 for sandsynlighed med to kort. Flush draw: 9 × 4 = 36 % (faktisk 35 %). Denne genvej er tilstrækkelig præcis til alle in-game beslutninger.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Pot odds:</strong> Pot odds = (puljebeløb + modstanderens indsats) / din indsats for at calle. Eksempel: puljen er 600 kr., modstanderen satser 200 kr. Puljen er nu 800 kr. Du skal betale 200 kr. Pot odds: 800/200 = 4:1. Du behøver &gt;20 % equity for at calle profitabelt. Med et flush draw (19,1 %) er et call marginalt uprofitabelt – medmindre implied odds ændrer beregningen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Implied odds</strong> tager højde for de ekstra penge, du forventer at vinde på fremtidige betting-runder, hvis du rammer din hånd. <strong>Reverse implied odds:</strong> Risikoen for at ramme din hånd men tabe mod en stærkere hånd – særligt relevant, når boardet er parret.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Pot odds er fundamentet for rationel pokerstrategi. Alle andre koncepter – fold equity, bet sizing, bluff frequency – bygger på denne ramme. For dybdegående EV-beregninger og solver-metodik, se vores <Link to="/casinospil/poker-strategi" className={linkClass}>avancerede strategi-guide</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 6 – VARIANS OG RAKE ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Varians, Rake og Den Reelle Profit-Ligning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Selv en vindende pokerspiller oplever dramatiske udsving. Variansen i poker er reel og brutal – at forstå den matematisk er afgørende for langsigtet overlevelse.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Variansens Matematiske Realitet</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En vindende No-Limit Hold'em-spiller med en winrate på 5 bb/100 (big blinds pr. 100 hænder) og en standardafvigelse på 80 bb/100 vil – med 95 % konfidens – have resultater mellem -155 bb/100 og +165 bb/100 over 1.000 hænder. Det betyder, at selv efter 1.000 hænder med perfekt spil kan du have tabt markant. Først efter ~30.000 hænder begynder din winrate at stabilisere sig med rimelig konfidens.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Simulationseksempel:</strong> En spiller med 5 bb/100 winrate og 25 buy-in bankroll har en ~5 % risiko for at gå broke (Risk of Ruin). Med 50 buy-ins falder RoR til under 0,5 %. For turneringsspillere, hvor standardafvigelsen er 2–3x højere, kræves 100+ buy-ins for sammenlignelig sikkerhed.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Rake – Den Usynlige Skat</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Rake er den procentdel af puljen, som platformen beholder. Typisk 2,5–5 % med en cap (maksimalt beløb pr. pot). Rake'ens effekt undervurderes systematisk af de fleste spillere:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold">Stakelevel</th>
                  <th className="px-4 py-3 text-center font-semibold">Typisk Rake</th>
                  <th className="px-4 py-3 text-center font-semibold">Cap pr. Pot</th>
                  <th className="px-4 py-3 text-center font-semibold">Rake pr. 100 hænder</th>
                  <th className="px-4 py-3 text-center font-semibold">Effektiv Rake (bb/100)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">0,01/0,02 kr.</td><td className="px-4 py-2 text-center">5 %</td><td className="px-4 py-2 text-center">0,10 kr.</td><td className="px-4 py-2 text-center">~5 kr.</td><td className="px-4 py-2 text-center">~25 bb</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">0,25/0,50 kr.</td><td className="px-4 py-2 text-center">5 %</td><td className="px-4 py-2 text-center">2,50 kr.</td><td className="px-4 py-2 text-center">~75 kr.</td><td className="px-4 py-2 text-center">~15 bb</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">1/2 kr.</td><td className="px-4 py-2 text-center">4,5 %</td><td className="px-4 py-2 text-center">6 kr.</td><td className="px-4 py-2 text-center">~200 kr.</td><td className="px-4 py-2 text-center">~10 bb</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">5/10 kr.</td><td className="px-4 py-2 text-center">3,5 %</td><td className="px-4 py-2 text-center">15 kr.</td><td className="px-4 py-2 text-center">~400 kr.</td><td className="px-4 py-2 text-center">~4 bb</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Implikationen er klar: mikrostakes-spillere betaler proportionelt langt mere i rake end højstakes-spillere. En winrate på 5 bb/100 ved mikrostakes er ~25 bb/100 before-rake – du skal slå feltet med en enorm margin blot for at break even. Dette er den primære årsag til, at mange dygtige spillere ikke profiterer ved de laveste stakes. Rakeback-programmer (typisk 10–30 % returneringsrate) kan kompensere delvist.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 7 – BLUFFING ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bluffing – Hvornår Virker Det?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bluffing er pokerens mest ikoniske – og mest misforståede – element. En bluff er en indsats eller raise med en hånd, du ikke tror er den bedste, med det formål at få modstanderen til at folde en bedre hånd. Bluffing er ikke "bare at satse stort" – det er en præcis strategisk handling, der kun er profitabel under specifikke betingelser.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Hvornår virker en bluff:</strong> (1) Din modstander har en svag range. (2) Du repræsenterer en troværdig stærk hånd – din betting-linje er konsistent med en specifik stærk hånd. (3) Din modstander er kapabel til at folde. (4) Pot odds'ene kræver ikke, at din bluff virker ofte – en halv-pot bluff behøver kun at virke 33 % af gangene for at være profitabel.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Semi-bluffs:</strong> De bedste bluffs er "semi-bluffs" – indsatser med en hånd, der har outs til at forbedre sig. Et flush draw-semi-bluff kombinerer to profitkilder: (1) modstanderen kan folde (bluff-equity), og (2) du kan ramme flushen og vinde (draw-equity). Semi-bluffs er mere profitable og lavere risiko end rene bluffs.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Begynderfejl med bluffing:</strong> At bluffe for ofte, mod for mange modstandere, på for ugunstige boards. Bluff sjældent mod mere end 1–2 modstandere. Og bluff aldrig af desperation eller "tilt" – en bluff skal være en kalkuleret handling. For avanceret bluff-frekvens og GTO-balancering, se vores <Link to="/casinospil/poker-strategi" className={linkClass}>poker strategi-guide</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 8 – ONLINE VS LIVE ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Online Poker vs. Live Poker – Tempo, Tells og Rake</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Online poker og live poker bruger de samme regler, men spilleoplevelsen og de strategiske krav er markant anderledes. <strong>Tempo:</strong> Online er 3–5x hurtigere (60–80 hænder/time vs. 15–25 live). Med multi-tabling kan online-spillere spille 200–500 hænder/time.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Tells:</strong> Live poker tilbyder fysiske tells – kropssprog, stemme, timing. Online eliminerer fysiske tells men introducerer timing tells og betting pattern tells (via HUD-software). <strong>Sværhedsgrad:</strong> Online er generelt sværere pga. adgang til tracking-software og træningsmateriale. En vinder på 5/10 kr. online dominerer typisk 10/20 kr. live.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Rake:</strong> Online har typisk lavere rake (2,5–5 % med cap) end live (5–10 %). Lavere rake online giver bedre netto-EV – men den hårdere konkurrence modvirker delvist denne fordel.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 9 – BANKROLL ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bankroll Management – Undgå at Gå Broke</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bankroll management er den mest undervurderede poker-færdighed. Talrige dygtige spillere har gået broke – ikke fordi de spillede dårligt, men fordi de spillede på et stakelevel, deres bankroll ikke kunne bære.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold">Format</th>
                  <th className="px-4 py-3 text-center font-semibold">Anbefalet Buy-ins</th>
                  <th className="px-4 py-3 text-center font-semibold">Eksempel (100 kr. buy-in)</th>
                  <th className="px-4 py-3 text-center font-semibold">Risk of Ruin (5 bb/100)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">Cash Game (NL)</td><td className="px-4 py-2 text-center">20–30</td><td className="px-4 py-2 text-center">2.000–3.000 kr.</td><td className="px-4 py-2 text-center">~5 % (25 BI)</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">MTT (Turneringer)</td><td className="px-4 py-2 text-center">50–100</td><td className="px-4 py-2 text-center">5.000–10.000 kr.</td><td className="px-4 py-2 text-center">~3 % (75 BI)</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">Sit & Go</td><td className="px-4 py-2 text-center">30–50</td><td className="px-4 py-2 text-center">3.000–5.000 kr.</td><td className="px-4 py-2 text-center">~4 % (40 BI)</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">PLO (Omaha)</td><td className="px-4 py-2 text-center">30–50</td><td className="px-4 py-2 text-center">3.000–5.000 kr.</td><td className="px-4 py-2 text-center">~5 % (35 BI)</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Den psykologiske dimension:</strong> At spille "oppe i stakes" efter en vindersession er en af de hurtigste veje til bust. Omvendt: at rykke ned i stakes efter en tabssession kræver ydmyghed, men det beskytter din bankroll. <Link to="/ansvarligt-spil" className={linkClass}>Ansvarligt spil</Link> i poker-kontekst handler primært om bankroll-disciplin.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 10 – FEJL ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">6 Typiske Fejl Begyndere Laver</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            {[
              { icon: AlertTriangle, title: "Spille for mange hænder", desc: "Begyndere spiller 40–60 %. Vindende spillere: 15–25 %. Fold er den mest profitable handling." },
              { icon: Target, title: "Ignorere position", desc: "K-J suited er profitabel fra Button men tabende fra UTG. Position definerer din ranges profitabilitet." },
              { icon: Users, title: "Passivt spil (calling station)", desc: "Call er den svageste handling. Aggressive raise/fold-spillere vinder potter to veje: bedste hånd + fold equity." },
              { icon: Zap, title: "Tilt", desc: "Emotionelt spil efter bad beats. Tilt er den hurtigste bankroll-destroyer. Stop, tag en pause, analysér rationelt." },
              { icon: Scale, title: "Forelske sig i sin hånd", desc: "Overpairs koster begyndere flest chips. Lær at lægge ét par ned, når boardet indikerer fare." },
              { icon: BarChart3, title: "Tilfældig betsizing", desc: "En god indsats tjener et formål: beskytte, bygge puljen med value, eller repræsentere en håndstyrke med bluff." },
            ].map((err) => (
              <Card key={err.title}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <err.icon className="h-5 w-5 text-destructive" />
                    {err.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{err.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 11 – DANSK REGULERING ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Poker i Danmark – Regulering, Skat og ROFUS</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Poker er fuldt lovligt i Danmark under Spilleloven af 2012. Både casino poker (mod huset) og spiller-vs-spiller poker (cash games og turneringer) kræver licens fra den danske <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighed</Link>. Gevinster fra licenserede platforme er skattefrie – casinoet betaler 28 % bruttospilleafgift af deres omsætning, ikke spilleren.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>ROFUS (Register Over Frivilligt Udelukkede Spillere):</strong> Alle danske licenserede platforme er tilsluttet ROFUS. Du kan selvudelukke dig i 24 timer, 1 måned, 3 måneder, 6 måneder eller permanent. Udelukkelsen gælder alle danske licenserede spilplatforme – inkl. poker, casino og betting. For spillere, der oplever problematisk spilleadfærd, er ROFUS den vigtigste beskyttelsesmekanisme.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Spiller-vs-spiller specifikt:</strong> Operatøren skal sikre, at anti-kollusion-systemer er implementeret, at rakeback-programmer er transparente, og at spillepoolen følger reguleringsaftaler. Hjemmepoker (ikke-kommercielt) er lovligt uden licens, forudsat at der ikke opkræves rake eller gebyrer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Vigtigt:</strong> Spiller du på en ulicenseret platform, mister du skattefrihed, spillerbeskyttelse og ROFUS-adgang. Tjek altid licensen på Spillemyndighedens hjemmeside, før du opretter en konto. For mere om dansk spillelovgivning, se vores <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighed-guide</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 12 – FÆRDIGHED VS HASARD ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Er Poker et Færdighedsspil eller Hasard?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Kortsigtigt (1 hånd):</strong> Poker er primært held. En nybegynder med pocket aces slår en professionel med 7-2 offsuit 85 % af gangene. <strong>Mellemlangsigtigt (100–1.000 hænder):</strong> Færdighed begynder at vise sig, men variansen kan stadig producere tabsperioder. <strong>Langsigtet (10.000+ hænder):</strong> Poker er entydigt et færdighedsspil. Cigital-studiet (103 millioner hænder) bekræfter, at de øverste 10 % konsistent vinder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Juridisk status:</strong> Danmark klassificerer spiller-vs-spiller poker som et "blandingsspil" (held + færdighed). Casino poker (<Link to="/casinospil/caribbean-stud-poker" className={linkClass}>Caribbean Stud</Link>, <Link to="/casinospil/three-card-poker" className={linkClass}>Three Card Poker</Link>) klassificeres som hasardspil, fordi spillerens beslutninger ikke kan eliminere house edge. Sammenlign med <Link to="/casinospil/roulette" className={linkClass}>roulette</Link>: over 10.000 spins konvergerer ALLE spillere mod -2,70 %.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 13 – HVEM PASSER TIL ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvilken Pokervariant Passer Til Dig?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dit valg af variant bør matche din spillestil, tidshorisont og risikoappetit. Her er en beslutningsguide baseret på spillertype:
          </p>
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base">🎯 Den Strategiske Begynder</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Start med <Link to="/casinospil/texas-holdem" className={linkClass}>Texas Hold'em</Link> mikrostakes. Simple regler, enormt læringsøkosystem, størst spillerpool.</p></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base">🧮 Den Analytiske Spiller</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground"><Link to="/casinospil/video-poker" className={linkClass}>Video Poker</Link> – ren matematik, ingen psykologi. Op til 100,76 % RTP. Perfekt for dem, der elsker at optimere.</p></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base">⚡ Action-Jægeren</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground"><Link to="/casinospil/omaha-poker" className={linkClass}>Omaha (PLO)</Link> – mere action, højere varians, stærkere vinderhænder. For spillere, der finder Hold'em for langsomt.</p></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base">🎰 Den Afslappede Casino-Gæst</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground"><Link to="/casinospil/three-card-poker" className={linkClass}>Three Card Poker</Link> eller <Link to="/casinospil/caribbean-stud-poker" className={linkClass}>Caribbean Stud</Link> – poker-stemning uden den dybe strategiske kompleksitet.</p></CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 14 – TRIN FOR TRIN ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sådan Kommer Du i Gang – 5 Trin</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Trin 1 – Lær håndrangeringerne udenad.</strong> Brug tabellen ovenfor. Del fem kort, identificér hånden, gentag 50–100 gange. <strong>Trin 2 – Start med mikrostakes online.</strong> 0,01/0,02 kr. blinds, 50–100 kr. startbankroll. Spil om rigtige penge – gratis poker giver ikke den nødvendige feedback. <strong>Trin 3 – Spil tight-aggressivt.</strong> Top 15–20 % af starthænder. Raise preflop, continuation bet på floppen, fold ved modstand. Læs vores <Link to="/casinospil/texas-holdem" className={linkClass}>Texas Hold'em-guide</Link> for præcise ranges.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Trin 4 – Analysér dine hænder.</strong> Gennemgå håndhistorik. Spørg: "Var dette call profitabelt baseret på pot odds?" Selvanalyse er vigtigere end volume. Vores <Link to="/casinospil/poker-strategi" className={linkClass}>strategi-guide</Link> dækker solver-baseret analyse og studieteknikker. <strong>Trin 5 – Sæt grænser.</strong> Bankroll-grænse, sessionsgrænse, tabsgrænse. Brug <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>-værktøjer.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 15 – VIDERE LÆSNING ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Videre Læsning og Cross-Cluster Links</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne cornerstone-guide har dækket pokerens samlede landskab. For dybere specialisering, naviger til de individuelle spoke-guides via cluster-gitteret ovenfor. Her er en hurtig opsummering af, hvad hver guide tilbyder ud over denne hubs indhold:
          </p>
          <ul className="mb-4 space-y-2 text-muted-foreground leading-relaxed list-disc list-inside">
            <li><Link to="/casinospil/texas-holdem" className={linkClass}>Texas Hold'em</Link> – Preflop ranges med open/3-bet/4-bet charts, flop texture-analyse, barrel-strategier og GTO vs. exploitative play.</li>
            <li><Link to="/casinospil/omaha-poker" className={linkClass}>Omaha (PLO)</Link> – Must-use-2 edge cases, wrap equity-tabeller, SPR-modeller, blocker-baseret bluffing og 5-Card PLO dynamik.</li>
            <li><Link to="/casinospil/poker-strategi" className={linkClass}>Poker Strategi</Link> – ICM-beregninger, solver-metodik (PioSolver/GTO+), mental game, HUD-stats og studieteknikker.</li>
            <li><Link to="/casinospil/video-poker" className={linkClass}>Video Poker</Link> – Pay table-analyse for 20+ varianter, wild card-matematik, progressive jackpot break-even og mobilspil-guide.</li>
            <li><Link to="/casinospil/three-card-poker" className={linkClass}>Three Card Poker</Link> – Q-6-4-strategi, dealer-qualifying-matematik (66,4 %), 6 Card Bonus house edge og tempo-analyse.</li>
            <li><Link to="/casinospil/caribbean-stud-poker" className={linkClass}>Caribbean Stud Poker</Link> – AK-strategiens nuancer, progressive jackpot EV, dealer-qualifying og sammenligning med Three Card.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            For sammenligning med andre strategiske <Link to="/casinospil" className={linkClass}>casinospil</Link> anbefaler vi vores guides til <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> (basic strategy og card counting), <Link to="/casinospil/baccarat" className={linkClass}>baccarat</Link> (laveste house edge) og <Link to="/casinospil/craps" className={linkClass}>craps</Link> (favorable pass line-odds). Poker er det eneste casinospil, der belønner langsigtet investering i læring – og med denne guide som fundament er du klar til at dykke dybere.
          </p>
        </section>

        <Separator className="my-10" />

        <CasinospilMoneyLinks gameName="Poker" currentPath="/casinospil/poker" />
        <LatestNewsByCategory pagePath="/casinospil/poker" />
        <RelatedGuides currentPath="/casinospil/poker" />

        <FAQSection faqs={pokerFaqs} />

        <AuthorBio author="jonas" showCommunity={false} />
      </div>
      <StickyCtaBySlug slug="spilleautomaten" />
    </>
  );
};

export default PokerGuide;
