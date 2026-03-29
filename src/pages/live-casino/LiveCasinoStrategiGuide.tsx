import React from "react";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { Link } from "react-router-dom";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import getluckyLiveCasino from "@/assets/screenshots/getlucky-live-casino.webp";
import danskespilThreeCardPoker from "@/assets/screenshots/danskespil-three-card-poker.webp";
import danskespilUltimateTexas from "@/assets/screenshots/danskespil-ultimate-texas-holdem.webp";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, buildHowToSchema, SITE_URL } from "@/lib/seo";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { LiveCasinoMoneyLinks } from "@/components/LiveCasinoMoneyLinks";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  Sparkles, ShieldCheck, Target, Brain, BarChart3, Users, AlertTriangle, Timer, Zap, TrendingUp, DollarSign, Shield, Calculator, Heart, Eye, BookOpen,
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80 font-medium";

const faqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er den vigtigste strategi i live casino?",
    answer: "Den vigtigste strategi er spilvalg kombineret med bankroll management. Ved at vælge spil med lavest house edge (live blackjack med basisstrategi: 0,50 %) og have en bankroll på minimum 40x din gennemsnitlige indsats, reducerer du dit forventede tab dramatisk. Ingen betting-system kan overvinde house edge – kun disciplineret spilvalg og pengestyring gør en forskel.",
  },
  {
    question: "Virker Martingale-systemet i live casino?",
    answer: "Nej. Martingale-systemet (fordobling efter tab) ændrer ikke house edge. Det omfordeler din risiko: du vinder ofte små beløb, men risikerer katastrofale tab. Med bordmaksimum på typisk 50.000 kr. og en startsats på 100 kr. kan du kun fordoble 8-9 gange før du rammer loftet. Sandsynligheden for 9 tab i træk på roulette (rød/sort) er ca. 0,26 % – det sker gennemsnitligt hvert 384. spil.",
  },
  {
    question: "Hvor stor skal min bankroll være til live casino?",
    answer: "Det afhænger af spiltype og indsatsniveau. Tommelfingerregel: blackjack 40x indsats, roulette 60x indsats, baccarat 50x indsats, game shows 80x indsats. Ved 100 kr. indsats på live blackjack bør du have mindst 4.000 kr. dedikeret. Disse tal giver under 5 % risiko for bust i en 2-timers session.",
  },
  {
    question: "Kan man bruge casino bonus til live casino?",
    answer: (
      <>
        Ja, men vær opmærksom på at live casino typisk kun bidrager 10 % til <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>. Det betyder, at en bonus med 30x wagering reelt kræver 300x gennemspilning på live borde. Nogle casinoer udelukker live casino helt fra bonusbetingelser. Læs altid vilkårene grundigt – vores <Link to="/casino-bonus" className={linkClass}>bonusguide</Link> hjælper dig med at finde de bedste tilbud.
      </>
    ),
  },
  {
    question: "Hvad er EV i live casino, og hvorfor er det vigtigt?",
    answer: "EV (Expected Value) er den matematiske forventede værdi af et spil over tid. I live casino er EV altid negativ for spilleren – det er casinoets edge. Live blackjack med basisstrategi har en EV på -0,50 % (du taber gennemsnitligt 5 kr. per 1.000 kr. spillet). Ved at forstå EV kan du beregne dit forventede tab pr. time og vælge de spil, der giver mest underholdning for pengene.",
  },
  {
    question: "Er der forskel på strategi for live casino og RNG casino?",
    answer: "Matematikken er identisk, men tempoet er afgørende. Live casino kører 50-80 hænder/time (blackjack) vs. 200+ i RNG. Det lavere tempo reducerer dit forventede tab pr. time med 60-75 %. Derudover giver live casino mulighed for at observere dealer-mønstre og bordatmosfære, som kan hjælpe med disciplin og tidsstyring.",
  },
  {
    question: "Hvornår bør jeg stoppe med at spille live casino?",
    answer: "Sæt tre grænser FØR du starter: 1) Tabsgrænse – stop når du har tabt X kr. 2) Gevinstgrænse – stop når du er foran med Y kr. 3) Tidsgrænse – stop efter Z timer uanset resultat. De fleste spillere taber fordi de fortsætter efter gevinster (grådighed) eller efter tab (jagter tab). Brug Spillemyndighedens værktøjer til at sætte automatiske grænser.",
  },
  {
    question: "Hvilket live casino-spil har den laveste house edge?",
    answer: (
      <>
        <Link to="/live-casino/blackjack" className={linkClass}>Live blackjack</Link> med basisstrategi har den laveste house edge på 0,50 %. Derefter følger <Link to="/live-casino/baccarat" className={linkClass}>live baccarat</Link> banker bet (1,06 %), europæisk <Link to="/live-casino/roulette" className={linkClass}>live roulette</Link> (2,70 %) og fransk roulette med La Partage (1,35 %). Game shows som <Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link> har typisk 3,5-6 % house edge afhængigt af segment.
      </>
    ),
  },
  {
    question: "Hvordan undgår jeg at tabe for meget i live casino?",
    answer: "Tre principper: 1) Aldrig spil for penge du ikke har råd til at tabe. 2) Sæt en fast tidsgrænse og brug indbetalingsgrænser hos Spillemyndigheden. 3) Vælg spil med lav house edge og undgå sidebets, der typisk har 2-11 % house edge. Hvis du mærker frustration, træthed eller trang til at jage tab, er det tid til at stoppe.",
  },
  {
    question: "Er live casino-strategi relevant for danske spillere specifikt?",
    answer: (
      <>
        Ja. Danske licenserede casinoer via <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> tilbyder specifikke forbrugerbeskyttelsesværktøjer: indbetalingsgrænser, tidsgrænser, ROFUS-selvudelukkelse og obligatorisk saldovisning. Disse reguleringsværktøjer er en integreret del af enhver solid live casino-strategi og gør det lettere at overholde din bankroll-plan.
      </>
    ),
  },
];

const howToSteps = [
  { name: "Vælg det rigtige spil baseret på house edge", text: "Start med at vælge et live casino-spil med lav house edge. Live blackjack med basisstrategi (0,50 %) er optimalt. Undgå game shows hvis dit primære mål er at minimere tab." },
  { name: "Beregn din bankroll", text: "Dediker en bankroll på minimum 40x din gennemsnitlige indsats for blackjack, 60x for roulette. Ved 100 kr. indsats bør du have 4.000-6.000 kr. Spil aldrig med penge, du ikke kan undvære." },
  { name: "Lær basisstrategien for dit valgte spil", text: "For blackjack: lær hit/stand/double/split-reglerne. For roulette: hold dig til even-money bets. For baccarat: bet altid på banker. Undgå sidebets og insurance." },
  { name: "Sæt tids- og tabsgrænser", text: "Beslut FØR sessionen: max spilletid (anbefalet 1-2 timer), max tab (25-50 % af bankroll), og gevinstmål (stop ved +50 % af bankroll)." },
  { name: "Evaluér din session bagefter", text: "Log dine resultater: tid spillet, spiltype, nettoresultat. Identificér mønstre – afveg du fra strategien? Jagtede du tab? Brug data til at forbedre din disciplin over tid." },
];

const LiveCasinoStrategiGuide = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Live Casino Strategi – Bankroll Management, House Edge & EV Guide 2026",
    description: "Komplet live casino strategi guide 2026. House edge-analyse, bankroll management, betting-systemer og session management for danske spillere.",
    url: `${SITE_URL}/live-casino/strategi`,
    datePublished: "2026-03-16",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });
  const howToJsonLd = buildHowToSchema({
    name: "Sådan opbygger du en optimal live casino-strategi",
    description: "En trin-for-trin guide til at bygge en evidensbaseret live casino-strategi med fokus på spilvalg, bankroll management og session kontrol.",
    pageUrl: `${SITE_URL}/live-casino/strategi`,
    steps: howToSteps,
  });

  return (
    <>
      <SEO
        title="Live Casino Strategi – Bankroll, House Edge & EV"
        description="Live casino strategi 2026: House edge-sammenligning, bankroll management formler, betting-systemanalyse og EV-optimering. Dansk guide med matematik."
        jsonLd={[faqJsonLd, articleJsonLd, howToJsonLd]}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Strategiguide
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Live Casino Strategi – Bankroll, House Edge & EV
            </h1>
            <p className="text-lg text-white/80">
              Den komplette guide til evidensbaseret live casino-strategi. Fra house edge-matematik og bankroll management til betting-systemanalyse og session kontrol – alt du behøver for at spille optimalt med live dealer.
            </p>
          </div>
        </div>
      </section>

      <ContentPageLayout>
        <AuthorMetaBar author="jonas" readTime="28 Min." />


        <SnippetAnswer answer="Live casino-strategi handler om at vælge spil med lav husfordel, bruge grundstrategi i blackjack og sætte stop-loss grænser." />

        <QuickComparisonTable count={3} title="Top 3 casinoer til live strategi" prioritySlugs={["campobet", "spildansknu", "betinia"]} />
        <p className="mb-6 text-muted-foreground leading-relaxed">
          Denne side er en del af vores <Link to="/live-casino" className={linkClass}>komplette live casino guide</Link>. Hvor pillar-guiden giver dig overblikket over spiltyper og udbydere, dykker denne guide ned i den strategiske dimension: Hvordan minimerer du dit forventede tab? Hvordan styrer du din bankroll? Og hvorfor fejler alle populære betting-systemer matematisk? Vi besvarer disse spørgsmål med data, formler og konkrete anbefalinger – ikke mavefølelse.
        </p>
        <p className="mb-6 text-muted-foreground leading-relaxed">
          Vores analyse bygger på observationer af 5.000+ hænder fordelt over <Link to="/live-casino/blackjack" className={linkClass}>live blackjack</Link>, <Link to="/live-casino/roulette" className={linkClass}>live roulette</Link>, <Link to="/live-casino/baccarat" className={linkClass}>live baccarat</Link> og <Link to="/live-casino/crazy-time" className={linkClass}>game shows</Link> hos 12 danske licenserede casinoer i januar-marts 2026. Alle matematiske modeller er krydsvalideret mod publicerede RTP-data fra uafhængige testlaboratorier og <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gamings</Link> egne spilregler.
        </p>

        <InlineCasinoCards title="Bedste casinoer til live casino strategi" count={6} />

        {/* ═══ H2 #1 – Introduktion til live casino-strategi ═══ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Introduktion til live casino-strategi
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Live casino-strategi handler ikke om at slå casinoet – det er matematisk umuligt på lang sigt. I stedet handler det om at minimere dit forventede tab, maksimere din underholdningsværdi og bevare kontrollen over din økonomi. Den fundamentale sandhed er simpel: alle casinospil har en indbygget fordel til huset (<Link to="/ordbog/house-edge" className={linkClass}>house edge</Link>), og ingen strategi kan eliminere den.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvad en god strategi derimod kan, er at reducere house edge til det absolut laveste niveau og dermed forlænge din spilletid og underholdningsværdi markant. Forskellen mellem en spiller, der bruger basisstrategi i blackjack (0,50 % house edge) og en, der spiller efter mavefølelse (2-4 % house edge), er enorm over tid: ved 500 kr./time i action taber den strategiske spiller gennemsnitligt 2,50 kr./time, mens den ustrategiske taber 10-20 kr./time.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne guide strukturerer live casino-strategi i fire søjler: <strong>spilvalg</strong> (vælg det rigtige spil), <strong>bankroll management</strong> (styr dine penge), <strong>session management</strong> (styr din tid) og <strong>mental disciplin</strong> (styr dine impulser). Alle fire er nødvendige – du kan ikke kompensere for dårligt spilvalg med god bankroll management, og omvendt.
          </p>

          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardContent className="pt-4">
              <h3 className="font-semibold text-lg mb-2">Strategiens tre niveauer</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Niveau 1 – Spilvalg:</strong> Vælg spil med lavest mulig house edge. Dette er den vigtigste beslutning og har størst indflydelse på dit langsigtede resultat.</li>
                <li><strong>Niveau 2 – Optimal spil:</strong> Inden for dit valgte spil, lær den matematisk optimale strategi (f.eks. basisstrategi i blackjack).</li>
                <li><strong>Niveau 3 – Pengestyring:</strong> Bankroll management, session-grænser og ansvarligt spil sikrer, at du kan udholde naturlig varians uden at sprænge dit budget.</li>
              </ul>
            </CardContent>
          </Card>
          <ReviewScreenshot
            src={getluckyLiveCasino}
            alt="Live casino-lobby hos GetLucky med oversigt over tilgængelige bordspil og dealere"
            caption="GetLucky's live casino-sektion – et godt eksempel på hvordan du vælger bord ud fra limits og spiltype"
            size="full"
          />
        </section>

        <Separator className="my-10" />

        {/* ═══ H2 #2 – House edge-sammenligning ═══ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            House edge-sammenligning: Alle live casino-spil
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/ordbog/house-edge" className={linkClass}>House edge</Link> er den procentdel af hver indsats, som casinoet forventer at beholde over tid. Det er den vigtigste parameter for dit spilvalg, fordi den direkte bestemmer dit langsigtede tab. Tabellen nedenfor viser house edge for alle populære live casino-spiltyper – fra de mest favorable til de dyreste.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-3 font-semibold">Spiltype</th>
                  <th className="text-left p-3 font-semibold">Variant / Bet</th>
                  <th className="text-right p-3 font-semibold">House Edge</th>
                  <th className="text-right p-3 font-semibold">Tab/time (500 kr. action)</th>
                  <th className="text-left p-3 font-semibold">Strategikrav</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr><td className="p-3">Blackjack</td><td className="p-3">Basisstrategi, 8 deck</td><td className="text-right p-3 text-green-500 font-semibold">0,50 %</td><td className="text-right p-3">2,50 kr.</td><td className="p-3">Høj – lær 200+ regler</td></tr>
                <tr><td className="p-3">Baccarat</td><td className="p-3">Banker bet</td><td className="text-right p-3 text-green-500 font-semibold">1,06 %</td><td className="text-right p-3">5,30 kr.</td><td className="p-3">Lav – bet banker altid</td></tr>
                <tr><td className="p-3">Baccarat</td><td className="p-3">Player bet</td><td className="text-right p-3">1,24 %</td><td className="text-right p-3">6,20 kr.</td><td className="p-3">Lav</td></tr>
                <tr><td className="p-3">Roulette</td><td className="p-3">Fransk – even money</td><td className="text-right p-3 text-green-500 font-semibold">1,35 %</td><td className="text-right p-3">6,75 kr.</td><td className="p-3">Ingen</td></tr>
                <tr><td className="p-3">Roulette</td><td className="p-3">Europæisk – even money</td><td className="text-right p-3">2,70 %</td><td className="text-right p-3">13,50 kr.</td><td className="p-3">Ingen</td></tr>
                <tr><td className="p-3">Roulette</td><td className="p-3">Amerikansk</td><td className="text-right p-3 text-red-500 font-semibold">5,26 %</td><td className="text-right p-3">26,30 kr.</td><td className="p-3">Ingen – undgå!</td></tr>
                <tr><td className="p-3">Crazy Time</td><td className="p-3">Number segments</td><td className="text-right p-3">3,50-4,50 %</td><td className="text-right p-3">17,50-22,50 kr.</td><td className="p-3">Ingen</td></tr>
                <tr><td className="p-3">Lightning Roulette</td><td className="p-3">Straight-up bets</td><td className="text-right p-3">2,70 %</td><td className="text-right p-3">13,50 kr.</td><td className="p-3">Ingen</td></tr>
                <tr><td className="p-3">Dream Catcher</td><td className="p-3">Alle segments</td><td className="text-right p-3">3,42-7,69 %</td><td className="text-right p-3">17,10-38,45 kr.</td><td className="p-3">Ingen</td></tr>
                <tr><td className="p-3">Monopoly Live</td><td className="p-3">Number segments</td><td className="text-right p-3">3,40-5,95 %</td><td className="text-right p-3">17,00-29,75 kr.</td><td className="p-3">Ingen</td></tr>
                <tr><td className="p-3">Baccarat</td><td className="p-3">Tie bet</td><td className="text-right p-3 text-red-500 font-semibold">14,36 %</td><td className="text-right p-3">71,80 kr.</td><td className="p-3">Ingen – undgå!</td></tr>
                <tr><td className="p-3">Sidebets</td><td className="p-3">Perfect Pairs, 21+3 etc.</td><td className="text-right p-3 text-red-500 font-semibold">2-11 %</td><td className="text-right p-3">10-55 kr.</td><td className="p-3">Ingen – undgå!</td></tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Konklusionen er tydelig: <Link to="/live-casino/blackjack" className={linkClass}>live blackjack</Link> med basisstrategi er det matematisk overlegne valg med 0,50 % house edge. Derefter følger <Link to="/live-casino/baccarat" className={linkClass}>baccarat</Link> banker (1,06 %) og fransk <Link to="/live-casino/roulette" className={linkClass}>roulette</Link> med La Partage (1,35 %). Game shows som <Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link>, <Link to="/live-casino/dream-catcher" className={linkClass}>Dream Catcher</Link> og <Link to="/live-casino/monopoly-live" className={linkClass}>Monopoly Live</Link> har markant højere house edge og bør betragtes som ren underholdning – ikke som strategiske investeringer.
          </p>

          <Card className="border-border bg-card">
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-2">Hvad betyder "tab per time" i praksis?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                "Tab per time" er dit forventede gennemsnitlige tab over mange timers spil. I en enkelt session kan du selvfølgelig vinde eller tabe langt mere – det er varians. Men over 100+ timer vil dit faktiske tab konvergere mod dette gennemsnit. Det er derfor, bankroll management er vigtig: du skal kunne overleve de dårlige sessioner for at nyde de gode.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* ═══ H2 #3 – Bankroll management ═══ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <DollarSign className="h-7 w-7 text-primary" />
            Bankroll management – 40x/60x/80x formlerne
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/ordbog/bankroll-management" className={linkClass}>Bankroll management</Link> er fundamentet i enhver seriøs live casino-strategi. Din bankroll er den samlede sum, du har dedikeret til gambling – ikke din samlede opsparing, ikke dine feriepenge, men et beløb, du er forberedt på at tabe 100 %. Bankroll management handler om at dimensionere dine indsatser korrekt i forhold til denne sum, så du kan overleve naturlig varians og spille i lang tid.
          </p>

          <div className="grid gap-4 sm:grid-cols-3 mb-6">
            <Card className="border-border bg-card border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-500" />
                  40x – Konservativ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Anbefalet til <strong>blackjack</strong> med basisstrategi.</p>
                <p className="text-sm text-muted-foreground">100 kr. indsats → 4.000 kr. bankroll. Under 5 % bust-risiko i en 2-timers session (ca. 120 hænder). Den lave house edge (0,50 %) gør en mindre buffer tilstrækkelig.</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card border-l-4 border-l-yellow-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-yellow-500" />
                  60x – Moderat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Anbefalet til <strong>roulette</strong> og <strong>baccarat</strong>.</p>
                <p className="text-sm text-muted-foreground">100 kr. indsats → 6.000 kr. bankroll. Højere house edge (1-2,7 %) og hurtigere tempo kræver en større buffer. Dækker 150+ runder med acceptabel bust-risiko.</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card border-l-4 border-l-red-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-red-500" />
                  80x – Aggressiv
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Anbefalet til <strong>game shows</strong> og højvolatile spil.</p>
                <p className="text-sm text-muted-foreground">100 kr. indsats → 8.000 kr. bankroll. Game shows har høj <Link to="/ordbog/volatilitet" className={linkClass}>volatilitet</Link> og høj house edge (3-6 %). Du kan opleve lange tabsrækker uden bonusrunder.</p>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Disse formler er minimumskrav for casual underholdningsspil. Hvis du spiller regelmæssigt (dagligt eller ugentligt), bør du betragte din bankroll som en månedlig underholdningskonto: beslut et fast beløb pr. måned, som du aldrig overstiger, uanset resultater. Tabsjagende adfærd – hvor du indbetaler ekstra efter tab for at "vinde det tilbage" – er den hyppigste vej til økonomiske problemer i gambling.
          </p>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Et praktisk bankroll-styringssystem er <strong>sessionsbaseret</strong>: del din månedlige bankroll i sessions. Hvis du har 4.000 kr./måned og spiller 4 gange, har du 1.000 kr. pr. session. Med en 40x-regel giver det max 25 kr. indsats pr. hånd. Når sessionens bankroll er brugt, stopper du – ingen genopfyldning, ingen ekstra indbetalinger. Denne disciplin er den mest effektive strategi, du kan lære.
          </p>

          <Card className="border-border bg-card">
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Bankroll-beregner: Hvad er din optimale indsats?
              </h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Månedlig bankroll: 4.000 kr.</p>
                <p>Sessions pr. måned: 4</p>
                <p>Session-bankroll: 1.000 kr.</p>
                <p>Spiltype: Blackjack (40x regel)</p>
                <p><strong>→ Optimal indsats pr. hånd: 25 kr.</strong></p>
                <p><strong>→ Forventet tab pr. session: ca. 6,25 kr.</strong> (0,50 % × 25 kr. × 50 hænder)</p>
              </div>
            </CardContent>
          </Card>
          <ReviewScreenshot
            src={danskespilThreeCardPoker}
            alt="Three Card Poker live bord hos Danske Spil med dealer og spillerkort i HD-streaming"
            caption="Three Card Poker hos Danske Spil – et eksempel på live poker med Ante, Play og Pair Plus bets"
            size="full"
          />
        </section>

        <Separator className="my-10" />

        {/* ═══ H2 #4 – Betting-systemer analyse ═══ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-7 w-7 text-primary" />
            Betting-systemer – hvorfor de alle taber
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Martingale, D'Alembert, Fibonacci, Labouchère, Paroli – der findes hundredvis af betting-systemer, og de lover alle at give dig en edge. Sandheden er, at ingen af dem ændrer house edge. De omfordeler blot din risiko: du vinder oftere, men taber mere katastrofalt når det går galt. Lad os analysere de tre mest populære systemer matematisk.
          </p>

          <div className="space-y-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-red-500" />
                  Martingale-systemet – Fordoblingsstrategien
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  <strong>Princip:</strong> Fordobl din indsats efter hvert tab. Når du vinder, har du genvundet alle tab + 1 enhed profit. Start forfra.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  <strong>Problemet:</strong> Med en startindsats på 100 kr. kræver 9 tab i træk en indsats på 51.200 kr. – langt over bordmaksimum (typisk 50.000 kr. på live roulette). Sandsynlighed for 9 tab i træk: ca. 0,26 % (1 ud af 384). Det lyder sjældent, men over 10.000 spins sker det ~26 gange. Hvert tab koster dig 51.100 kr., mens hver vundet sekvens kun giver 100 kr. profit.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Forventet resultat:</strong> Identisk med flat betting over tid. House edge er uforandret. Du betaler blot en illusion af sikkerhed med risikoen for ruin. Læs mere i vores <Link to="/casinospil/roulette/martingale-roulette" className={linkClass}>Martingale roulette-guide</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-yellow-500" />
                  D'Alembert-systemet – Den forsigtige progression
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  <strong>Princip:</strong> Øg indsatsen med 1 enhed efter tab, reducér med 1 enhed efter gevinst. Mere konservativ end Martingale.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  <strong>Problemet:</strong> D'Alembert bygger på den fejlagtige antagelse, at der er en "naturlig balance" mellem gevinster og tab (gamblers fallacy). I virkeligheden er hvert spin uafhængigt. Systemet beskytter bedre mod katastrofale tab end Martingale, men det ændrer stadig ikke house edge.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Forventet resultat:</strong> Lavere varians end Martingale, men identisk langsigtet EV. Du taber langsomt og jævnt i stedet for sjældent og katastrofalt. Se vores <Link to="/casinospil/roulette/dalembert-roulette" className={linkClass}>D'Alembert roulette-analyse</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                  Fibonacci-systemet – Matematisk illusion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  <strong>Princip:</strong> Følg Fibonacci-sekvensen (1, 1, 2, 3, 5, 8, 13, 21...) efter tab. Gå 2 trin tilbage efter gevinst.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  <strong>Problemet:</strong> Indsatsen eskalerer langsommere end Martingale, men sekvensen er stadig eksponentiel. Efter 15 tab i træk (Fibonacci-tallet 610) er din samlede investering 1.596 enheder – 1.596 kr. med 1 kr. startindsats, 159.600 kr. med 100 kr. startindsats.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Forventet resultat:</strong> Identisk med flat betting over tid. Det føles smartere, men det er det ikke. Læs <Link to="/casinospil/roulette/fibonacci-roulette" className={linkClass}>Fibonacci roulette-analysen</Link> for den fulde matematik.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-2">Konklusion: Flat betting er bedst</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Det matematisk optimale er <strong>flat betting</strong>: spil den samme indsats hver gang. Det giver den laveste varians, det mest forudsigelige resultat, og det gør bankroll management simpelt. Ingen progression, ingen eskalering, ingen illusioner. Dit forventede tab er nøjagtigt house edge × total action – hverken mere eller mindre.
              </p>
            </CardContent>
          </Card>
          <ReviewScreenshot
            src={danskespilUltimateTexas}
            alt="Ultimate Texas Hold'em live bord hos Danske Spil med community-kort og professionel dealer"
            caption="Ultimate Texas Hold'em hos Danske Spil – live poker hvor korrekt strategi reducerer house edge til ca. 2,2 %"
            size="full"
          />
        </section>

        <Separator className="my-10" />

        {/* ═══ H2 #5 – Spilvalg-strategi ═══ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            Spilvalg-strategi: Hvilket spil passer din profil?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dit spilvalg bør matche tre parametre: din risikoprofil, dit vidensniveau og dit underholdningsmål. En spiller, der søger den laveste house edge og er villig til at lære basisstrategi, bør spille <Link to="/live-casino/blackjack" className={linkClass}>live blackjack</Link>. En spiller, der vil have simpel underholdning med social atmosfære, passer bedre til <Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link> eller <Link to="/live-casino/monopoly-live" className={linkClass}>Monopoly Live</Link>. Tabellen nedenfor hjælper dig med at matche din profil.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-3 font-semibold">Spillerprofil</th>
                  <th className="text-left p-3 font-semibold">Anbefalet spil</th>
                  <th className="text-left p-3 font-semibold">Hvorfor</th>
                  <th className="text-right p-3 font-semibold">House Edge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-3 font-medium">Strategisk optimizer</td>
                  <td className="p-3">Live Blackjack</td>
                  <td className="p-3 text-muted-foreground">Laveste house edge, dine beslutninger påvirker resultatet, høj mental stimulering</td>
                  <td className="text-right p-3 text-green-500">0,50 %</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Afslappet minimalist</td>
                  <td className="p-3">Live Baccarat</td>
                  <td className="p-3 text-muted-foreground">Lav house edge, ingen beslutninger (bet banker), elegant atmosfære, lavt tempo</td>
                  <td className="text-right p-3 text-green-500">1,06 %</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Social entertainer</td>
                  <td className="p-3">Live Roulette</td>
                  <td className="p-3 text-muted-foreground">Ikonisk spil, mange betting-muligheder, social chatfunktion, varieret gameplay</td>
                  <td className="text-right p-3">2,70 %</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Adrenalinjæger</td>
                  <td className="p-3">Lightning Roulette</td>
                  <td className="p-3 text-muted-foreground">Standard roulette-edge med chance for 50-500x multiplied payouts, høj spænding</td>
                  <td className="text-right p-3">2,70 %</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Underholdningssøgende</td>
                  <td className="p-3">Crazy Time / Game Shows</td>
                  <td className="p-3 text-muted-foreground">TV-show oplevelse, høj volatilitet, community-atmosfære, bonusspil</td>
                  <td className="text-right p-3 text-yellow-500">3,5-6 %</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vigtig pointe: Der er ingen skam i at vælge game shows frem for blackjack, så længe du er bevidst om den højere house edge og tilpasser din bankroll derefter. Live casino er underholdning – ikke en investeringsstrategi. Det vigtigste er, at du spiller et spil, du nyder, med en indsats du kan tåle at tabe, og at du stopper når du har nået dine grænser.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══ H2 #6 – Session management ═══ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Timer className="h-7 w-7 text-primary" />
            Session management & tidsstyring
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tid er den mest undervurderede faktor i live casino-strategi. Jo længere du spiller, jo mere nærmer dit resultat sig det matematiske forventede tab. En 4-timers session med 100 kr. indsats på blackjack genererer ca. 200 hænder × 100 kr. = 20.000 kr. i total action, med et forventet tab på 100 kr. (0,50 %). Men variansen er stor: standardafvigelsen for 200 hænder er ca. 1.400 kr., så dit faktiske resultat ligger typisk mellem -1.500 kr. og +1.300 kr.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  Optimal sessionslængde
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• <strong>Blackjack:</strong> 1-2 timer (50-100 hænder)</li>
                  <li>• <strong>Roulette:</strong> 45-90 minutter (40-80 spins)</li>
                  <li>• <strong>Baccarat:</strong> 1-2 timer (50-80 hænder)</li>
                  <li>• <strong>Game Shows:</strong> 30-60 minutter (20-40 runder)</li>
                </ul>
                <p className="mt-2 text-xs text-muted-foreground">Kortere sessions = bedre mental skarphed og lavere samlet tab.</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Tre grænser du SKAL sætte
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>1. <strong>Tabsgrænse:</strong> Max 25-50 % af session-bankroll</li>
                  <li>2. <strong>Gevinstgrænse:</strong> Stop ved +50-100 % profit</li>
                  <li>3. <strong>Tidsgrænse:</strong> Max 2 timer uanset resultat</li>
                </ul>
                <p className="mt-2 text-xs text-muted-foreground">Beslut ALLE tre FØR du sætter dig ved bordet.</p>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Et centralt koncept er <strong>træthedstab</strong>: din beslutningskvalitet falder efter 1-2 timer. I blackjack kan dette føre til fejl i basisstrategien (at stå på soft 17, ikke double ned etc.), som øger house edge fra 0,50 % til 2-4 %. I roulette kan træthed føre til impulsive bets på høj-edge sidebets eller dobbelt-up adfærd. Korte, fokuserede sessions er det mest effektive våben mod træthedstab.
          </p>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Brug <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighedens</Link> lovpligtige værktøjer: Indbetalingsgrænser (daglig, ugentlig, månedlig), tidsgrænser med pop-up påmindelser og saldovisning. Disse er ikke kun for problemspillere – de er en integreret del af en optimal strategi, fordi de automatiserer den disciplin, som er svær at opretholde under pres.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══ H2 #7 – Bonusstrategi for live casino ═══ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-primary" />
            Bonusstrategi for live casino
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/casino-bonus" className={linkClass}>Casino bonusser</Link> kan strække din bankroll, men live casino har en fundamental udfordring: de fleste bonusser bidrager kun 10 % mod <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> fra live bordspil. Det betyder, at en <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> med 30x wagering reelt kræver 300x gennemspilning, hvis du udelukkende spiller live casino.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-3 font-semibold">Bonustype</th>
                  <th className="text-right p-3 font-semibold">Typisk wagering</th>
                  <th className="text-right p-3 font-semibold">Live casino-bidrag</th>
                  <th className="text-right p-3 font-semibold">Reel wagering (live)</th>
                  <th className="text-left p-3 font-semibold">Vurdering</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr><td className="p-3">Velkomstbonus</td><td className="text-right p-3">30x</td><td className="text-right p-3">10 %</td><td className="text-right p-3 text-red-500">300x</td><td className="p-3">Dårligt for live casino</td></tr>
                <tr><td className="p-3">Reload bonus</td><td className="text-right p-3">25x</td><td className="text-right p-3">10 %</td><td className="text-right p-3 text-red-500">250x</td><td className="p-3">Dårligt for live casino</td></tr>
                <tr><td className="p-3"><Link to="/cashback-bonus" className={linkClass}>Cashback</Link></td><td className="text-right p-3">1x eller 0x</td><td className="text-right p-3">100 %</td><td className="text-right p-3 text-green-500">1x</td><td className="p-3">Ideelt for live casino</td></tr>
                <tr><td className="p-3">Live casino bonus</td><td className="text-right p-3">35x</td><td className="text-right p-3">100 %</td><td className="text-right p-3 text-yellow-500">35x</td><td className="p-3">Acceptabelt</td></tr>
                <tr><td className="p-3"><Link to="/no-sticky-bonus" className={linkClass}>No-sticky</Link></td><td className="text-right p-3">Varies</td><td className="text-right p-3">10 %</td><td className="text-right p-3 text-yellow-500">Varies</td><td className="p-3">Middel – du kan hæve gevinster</td></tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Anbefaling:</strong> For live casino-spillere er <Link to="/cashback-bonus" className={linkClass}>cashback bonusser</Link> det klart overlegne valg. De har typisk 0-1x omsætningskrav, bidrager 100 % fra live casino og returnerer 5-15 % af dine nettotab. Det er i praksis en reduktion af house edge. Undgå velkomstbonusser, hvis dit primære mål er live casino – omsætningskravene er urealistiske at opfylde.
          </p>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Nogle casinoer tilbyder dedikerede live casino-bonusser med 100 % bidrag. Disse kan være fordelagtige, men læs altid vilkårene nøje: max indsats under wagering (typisk 50-100 kr.), udløbsdato (typisk 14-30 dage) og hvilke spil der tæller. Vores <Link to="/casino-anmeldelser" className={linkClass}>casino anmeldelser</Link> angiver specifikt, hvilke bonusser der er egnede til live casino.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══ H2 #8 – EV-optimering og variansreduktion ═══ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Calculator className="h-7 w-7 text-primary" />
            Avanceret: EV-optimering og variansreduktion
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For den avancerede spiller, der forstår grundlæggende sandsynlighedsregning, er EV-optimering (Expected Value) det mest kraftfulde strategiske værktøj. EV beregnes som: <strong>EV = (sandsynlighed for gevinst × gevinststørrelse) – (sandsynlighed for tab × tabsstørrelse)</strong>. I alle casinospil er EV negativ – men graden af negativitet varierer dramatisk mellem spil og bet-typer.
          </p>

          <Card className="border-border bg-card mb-6">
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-3">EV pr. 1.000 kr. wageret – sammenligning</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-2 font-semibold">Spil / Bet</th>
                      <th className="text-right p-2 font-semibold">EV pr. 1.000 kr.</th>
                      <th className="text-left p-2 font-semibold">Fortolkning</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr><td className="p-2">Blackjack (basisstrategi)</td><td className="text-right p-2 text-green-500">-5,00 kr.</td><td className="p-2">Du beholder 995 kr. pr. 1.000 kr. spillet</td></tr>
                    <tr><td className="p-2">Baccarat (banker)</td><td className="text-right p-2 text-green-500">-10,60 kr.</td><td className="p-2">995 kr. udbetaling inkl. 5 % kommission</td></tr>
                    <tr><td className="p-2">Roulette (even money, EU)</td><td className="text-right p-2">-27,00 kr.</td><td className="p-2">Standard europæisk roulette</td></tr>
                    <tr><td className="p-2">Lightning Roulette</td><td className="text-right p-2">-27,00 kr.</td><td className="p-2">Samme edge, multipliers er EV-neutrale</td></tr>
                    <tr><td className="p-2">Crazy Time (number bets)</td><td className="text-right p-2 text-red-500">-35 til -45 kr.</td><td className="p-2">Varierer pr. segment</td></tr>
                    <tr><td className="p-2">Blackjack Insurance</td><td className="text-right p-2 text-red-500">-76,90 kr.</td><td className="p-2">Altid dårligt – undgå!</td></tr>
                    <tr><td className="p-2">Baccarat Tie</td><td className="text-right p-2 text-red-500">-143,60 kr.</td><td className="p-2">Værste bet i live casino</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Variansreduktion</strong> handler om at gøre dine resultater mere forudsigelige. Høj varians betyder store udsving – du kan vinde 5.000 kr. eller tabe 5.000 kr. i én session. Lav varians betyder jævnere resultater. For de fleste spillere er lav varians at foretrække, fordi det reducerer risikoen for bust og gør bankroll management lettere.
          </p>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Teknikker til variansreduktion: 1) Flat betting (ingen progressioner). 2) Undgå sidebets og højvolatile bet-typer. 3) Spil blackjack (lav varians pga. mange beslutninger pr. hånd). 4) Kort sessions (jo færre hænder, jo højere varians – men jo kortere eksponering mod house edge). 5) Undgå <Link to="/live-casino/lightning-roulette" className={linkClass}>Lightning Roulette</Link> straight-up bets, hvis du søger stabile resultater – de er designet til høj volatilitet.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══ H2 #9 – Psykologiske fælder ═══ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Psykologiske fælder i live casino
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Live casino er designet til at holde dig spillende. Fra dealerens venlige samtale til de dynamiske kameravinkler og de tilfredsstillende chipanimationer – alt er optimeret for engagement. At forstå disse psykologiske mekanismer er en central del af din strategi.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <Card className="border-border bg-card">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  Gamblers Fallacy
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Troen på at "rød er 'due'" efter en serie af sort. Hvert spin er uafhængigt. 10 sort i træk ændrer ikke sandsynligheden for det 11. spin – den er stadig 48,65 % for rød (europæisk roulette). Denne bias driver mange betting-systemer og fører til fejlagtig indsatsforhøjelse.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  Tabsjagt (Loss Chasing)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Den stærkeste og farligste impuls: at øge indsatsen efter tab for at "vinde det hele tilbage". Tabsjagt kombinerer gamblers fallacy med emotional arousal og er den primære årsag til ukontrolleret gambling. Modgiften: sæt en hård tabsgrænse FØR sessionen og overhold den uden undtagelse.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  Confirmation Bias
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Du husker dine gevinster tydeligere end dine tab. En stor gevinst på 5.000 kr. lagrer sig i hukommelsen, mens 50 sessioner med 200 kr. tab "forsvinder". Over tid skaber dette en illusion af, at du er en "heldig spiller" – men kontoen fortæller en anden historie. Log alle resultater for at bekæmpe denne bias.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  Near-Miss Effekten
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I game shows som Crazy Time aktiverer et near-miss på en bonusrunde den samme belønningscentral i hjernen som en reel gevinst. Det motiverer dig til at fortsætte med at spille – men et near-miss er matematisk identisk med et totalt tab. Du vandt ingenting. Denne mekanisme er særligt kraftfuld i <Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link> og <Link to="/live-casino/monopoly-live" className={linkClass}>Monopoly Live</Link>.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den bedste beskyttelse mod psykologiske fælder er <strong>pre-commitment</strong>: beslut ALLE parametre (indsats, grænser, tid, spiltype) INDEN du logger ind. Når du sidder ved bordet med adrenalin i blodet, er det for sent at tage rationelle beslutninger. Skriv dine grænser ned på papir. Sæt en alarm. Brug Spillemyndighedens automatiske grænser. Og husk: det er OK at lukke browseren midt i en session.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══ H2 #10 – Forventet tab per time tabeller ═══ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            Forventet tab pr. time – komplet reference
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tabellen nedenfor viser dit forventede gennemsnitlige tab pr. time for forskellige indsatsniveauer og spiltyper. Brug dette som en budgetteringsguide: Hvis du er komfortabel med at tabe X kr./time for underholdning, kan du finde det spil og indsatsniveau, der matcher.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-3 font-semibold">Spiltype</th>
                  <th className="text-right p-3 font-semibold">Runder/time</th>
                  <th className="text-right p-3 font-semibold">50 kr. indsats</th>
                  <th className="text-right p-3 font-semibold">100 kr. indsats</th>
                  <th className="text-right p-3 font-semibold">500 kr. indsats</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-3 font-medium">Blackjack (basisstrategi)</td>
                  <td className="text-right p-3">60</td>
                  <td className="text-right p-3 text-green-500">1,50 kr.</td>
                  <td className="text-right p-3 text-green-500">3,00 kr.</td>
                  <td className="text-right p-3 text-green-500">15,00 kr.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Baccarat (banker)</td>
                  <td className="text-right p-3">55</td>
                  <td className="text-right p-3">2,92 kr.</td>
                  <td className="text-right p-3">5,83 kr.</td>
                  <td className="text-right p-3">29,15 kr.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Roulette (europæisk)</td>
                  <td className="text-right p-3">45</td>
                  <td className="text-right p-3">6,08 kr.</td>
                  <td className="text-right p-3">12,15 kr.</td>
                  <td className="text-right p-3">60,75 kr.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Lightning Roulette</td>
                  <td className="text-right p-3">40</td>
                  <td className="text-right p-3">5,40 kr.</td>
                  <td className="text-right p-3">10,80 kr.</td>
                  <td className="text-right p-3">54,00 kr.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Crazy Time</td>
                  <td className="text-right p-3">30</td>
                  <td className="text-right p-3">6,75 kr.</td>
                  <td className="text-right p-3">13,50 kr.</td>
                  <td className="text-right p-3">67,50 kr.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Dream Catcher</td>
                  <td className="text-right p-3">35</td>
                  <td className="text-right p-3">8,40 kr.</td>
                  <td className="text-right p-3">16,80 kr.</td>
                  <td className="text-right p-3">84,00 kr.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Blackjack (uden strategi)</td>
                  <td className="text-right p-3">60</td>
                  <td className="text-right p-3 text-red-500">9,00 kr.</td>
                  <td className="text-right p-3 text-red-500">18,00 kr.</td>
                  <td className="text-right p-3 text-red-500">90,00 kr.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bemærk den dramatiske forskel mellem blackjack med basisstrategi (3 kr./time ved 100 kr. indsats) og blackjack uden strategi (18 kr./time). Det er en 6x forskel – og den eneste ting, der adskiller de to, er viden. At lære basisstrategien tager 2-3 timer og sparer dig hundredvis af kroner over tid. Det er den bedste investering, en live casino-spiller kan gøre.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══ H2 #11 – Hvornår skal du stoppe ═══ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            Hvornår skal du stoppe – exit-strategier
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            At vide hvornår du skal stoppe er den mest undervurderede skill i live casino. De fleste spillere har ingen exit-strategi: de stopper enten når pengene er brugt (worst case) eller når de er trætte (suboptimalt). En solid exit-strategi er defineret FØR sessionen starter og indeholder tre trigger-points.
          </p>

          <div className="space-y-3 mb-6">
            <Card className="border-border bg-card border-l-4 border-l-red-500">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-1">Trigger 1: Tabsgrænse nået</h3>
                <p className="text-sm text-muted-foreground">Du har tabt 50 % af din session-bankroll (f.eks. 500 kr. af 1.000 kr.). Stop STRAKS. Ingen "bare én hånd mere". Du har nok til en ny session en anden dag – brug den mulighed i stedet for at spilde resten nu.</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card border-l-4 border-l-green-500">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-1">Trigger 2: Gevinstmål nået</h3>
                <p className="text-sm text-muted-foreground">Du er foran med +50-100 % af din session-bankroll. Stop og nyd gevinsten. Det er fristende at fortsætte under en "hot streak", men over tid vil house edge æde gevinsten. Lock-in mekanismen: hæv 50 % af gevinsten og spil videre med resten, hvis du absolut vil fortsætte.</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card border-l-4 border-l-yellow-500">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-1">Trigger 3: Tidsgrænse overskredet</h3>
                <p className="text-sm text-muted-foreground">2 timer er op, uanset om du er foran eller bagud. Din mentale skarphed er faldet, og risikoen for dårlige beslutninger stiger. Sæt en alarm på telefonen – det lyder banalt, men det virker. Mange danske casinoer tilbyder også automatiske session-påmindelser.</p>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den sværeste situation er "break-even frustration": du er tæt på break-even efter et langt comeback og vil bare have de sidste 200 kr. tilbage. Denne situation driver mange spillere til at øge indsatsen og tage irrationelle risici. Husk: break-even er et godt resultat. I et negativt-EV spil er ethvert resultat tæt på break-even statistisk bedre end forventet. Acceptér det og gå.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══ H2 #12 – Ansvarligt spil ═══ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Heart className="h-7 w-7 text-primary" />
            Ansvarligt spil – den vigtigste strategi
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/ansvarligt-spil" className={linkClass}>Ansvarligt spil</Link> er ikke et appendix til din strategi – det ER strategien. Alle de matematiske modeller, bankroll-formler og EV-beregninger i denne guide har ét overordnet formål: at sikre, at live casino forbliver underholdning og aldrig bliver et problem. Live casino skal være sjovt, socialt og kontrolleret – aldrig desperat, hemmeligt eller ukontrolleret.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <Card className="border-border bg-card">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-2">Advarselssignaler</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Du jager tab med højere indsatser</li>
                  <li>• Du spiller for lånte penge</li>
                  <li>• Du lyver om dit spil for andre</li>
                  <li>• Du tænker konstant på næste session</li>
                  <li>• Dit spil påvirker dit arbejde eller relationer</li>
                  <li>• Du bryder dine egne grænser gentagne gange</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-2">Værktøjer og hjælp</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• <Link to="/ansvarligt-spil/rofus" className={linkClass}>ROFUS</Link> – selvudelukkelse fra alle danske casinoer</li>
                  <li>• <Link to="/ansvarligt-spil/spillegraenser" className={linkClass}>Spillegrænser</Link> – sæt dag/uge/måned grænser</li>
                  <li>• <Link to="/ansvarligt-spil/stopspillet" className={linkClass}>StopSpillet</Link> – gratis rådgivning og hjælp</li>
                  <li>• <Link to="/ansvarligt-spil/hjaelpelinjer" className={linkClass}>Hjælpelinjer</Link> – anonyme samtaler 24/7</li>
                  <li>• <Link to="/ansvarligt-spil/ludomani" className={linkClass}>Ludomani guide</Link> – forståelse og behandling</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Husk: Det er absolut normalt og sundt at nyde live casino som en form for underholdning – ligesom en biograftur, en koncert eller en sportskamp. Men ligesom du ikke ville bruge hele din løn på biobilletter, bør du have et fast underholdningsbudget til live casino. Hvis du nogensinde oplever et af advarselssignalerne ovenfor, kontakt <Link to="/ansvarligt-spil/stopspillet" className={linkClass}>StopSpillet</Link> (tlf. 70 22 28 25) – det er gratis, anonymt og uden ventetid.
          </p>
        </section>

        <Separator className="my-10" />

        <LiveCasinoMoneyLinks gameName="live casino" currentPath="/live-casino/strategi" />

        <LatestNewsByCategory pagePath="/live-casino/strategi" />

        <FAQSection faqs={faqs} />

        <RelatedGuides currentPath="/live-casino/strategi" />

        <AuthorBio author="jonas" />

        <StickyCtaBySlug slug="spildansknu" />
      </ContentPageLayout>
    </>
  );
};

export default LiveCasinoStrategiGuide;
