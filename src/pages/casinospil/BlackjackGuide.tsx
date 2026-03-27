import { Link } from "react-router-dom";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import mrgreenLiveBlackjack from "@/assets/screenshots/mrgreen-live-blackjack.png";
import danskespilLiveBlackjack from "@/assets/screenshots/danskespil-live-blackjack-bord.png";
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
  Target,
  ShieldCheck,
  BarChart3,
  Sparkles,
  Trophy,
  Zap,
  Layers,
  AlertTriangle,
  TrendingUp,
  Users,
  Scale,
  Eye,
  ArrowRight,
  Shuffle,
  Brain,
  Gamepad2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import blackjackHero from "@/assets/heroes/blackjack-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

/* ─────────────────── CLUSTER NAVIGATION ─────────────────── */

const blackjackCluster = [
  {
    to: "/casinospil/blackjack/amerikansk-blackjack",
    title: "Amerikansk Blackjack",
    desc: "Hole card-reglen, peek-mekanikken og hvorfor amerikanske regler favoriserer spilleren ved doubles og splits.",
    icon: Target,
  },
  {
    to: "/casinospil/blackjack/europaeisk-blackjack",
    title: "Europæisk Blackjack",
    desc: "No hole card, double kun 9–11, 2-deck varianten og tilpasset basic strategy for europæiske regler.",
    icon: Layers,
  },
  {
    to: "/casinospil/blackjack/double-exposure-blackjack",
    title: "Double Exposure Blackjack",
    desc: "Begge dealer-kort synlige – dramatisk ændret strategi, 6:5-udbetaling og modificeret house edge.",
    icon: Eye,
  },
  {
    to: "/casinospil/blackjack/spanish-21",
    title: "Spanish 21",
    desc: "Ingen 10'ere i bunken, bonusudbetalinger, spiller-21-vinder-altid og unik basic strategy.",
    icon: Sparkles,
  },
  {
    to: "/casinospil/blackjack/martingale",
    title: "Martingale System",
    desc: "Fordoblings-systemet analyseret: matematisk bevis, Risk of Ruin og hvorfor det fejler langsigtet.",
    icon: TrendingUp,
  },
  {
    to: "/casinospil/blackjack/fibonacci",
    title: "Fibonacci System",
    desc: "Fibonacci-sekvensen som betting-system: langsommere progression, lavere varians, samme house edge.",
    icon: Shuffle,
  },
  {
    to: "/casinospil/blackjack/dalembert",
    title: "D'Alembert System",
    desc: "Den konservative progressions-strategi: +1/-1 justering, variansanalyse og sammenligning med Martingale.",
    icon: Scale,
  },
];

const blackjackFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Er det realistisk at slå blackjack online med basic strategy?",
    answer:
      "Basic strategy alene slår ikke casinoet – den minimerer house edge til ca. 0,5 %. Du taber stadig over tid, men langsommere end ved ethvert andet casinospil. For at opnå en positiv forventet værdi kræves korttælling, som kun fungerer i live-formater med fysiske kort og begrænset penetration. Online RNG-blackjack blander efter hver hånd, hvilket gør enhver tælleteknik umulig.",
  },
  {
    question: "Hvad betyder det, at dealeren skal stå på soft 17?",
    answer: (
      <>
        Soft 17 er en hånd med et es, der tælles som 11, plus kort der giver 6 (fx es + 4 + 2). Når dealeren <strong>stander</strong> på soft 17, stopper dealeren med at trække kort. Når dealeren <strong>hitter</strong> soft 17, trækker dealeren endnu et kort, hvilket giver bedre chancer for at forbedre hånden til 18–21. Hit-reglen øger house edge med ca. 0,22 procentpoint. Tjek altid bordets regler – det står typisk trykt på det grønne filt eller i spillets info-sektion online.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på 6-deck og 8-deck blackjack?",
    answer:
      "Med 6 kortspil er house edge ca. 0,02–0,05 procentpoint lavere end med 8 kortspil – en marginal forskel. Den reelle forskel ligger i penetration (hvor langt ned i bunken dealeren deler, før omblanding). Færre decks øger effekten af korttælling, fordi hvert enkelt kort udgør en større andel af den samlede bunke. For basic strategy-spillere er forskellen negligibel. For tællere er 6-deck med dyb penetration markant bedre end 8-deck med hyppig omblanding.",
  },
  {
    question: "Hvorfor er insurance næsten altid en tabsforretning?",
    answer: (
      <>
        Insurance betaler 2:1, men sandsynligheden for at dealeren har et 10-værdikort som hullekort er kun 30,8 % (4 ud af 13 kortværdier). For at insurance er break-even, skal sandsynligheden være 33,3 %. Differencen på 2,5 procentpoint giver en house edge på hele 7,7 % på insurance-væddemålet – næsten tre gange højere end selve blackjack-spillets edge. Kun ved en running count over +3 i Hi-Lo-systemet begynder insurance at være matematisk forsvarlig.
      </>
    ),
  },
  {
    question: "Er live blackjack mere fair end RNG-blackjack?",
    answer:
      "Begge er fair og reguleret. RNG-blackjack bruger en certificeret tilfældighedsgenerator, der testes af uafhængige laboratorier. Live blackjack bruger fysiske kort og en menneskelig dealer, filmet i realtid. Fairness-niveauet er identisk – forskellen er gennemsigtighed. I live blackjack kan du se kortene blive delt, hvilket eliminerer enhver tvivl om manipulation. RNG har dog hurtigere tempo og tillader lavere minimumsindsatser.",
  },
  {
    question: "Hvornår skal man fordoble på soft 18?",
    answer: (
      <>
        Soft 18 (es + 7) er en af de mest fejlspillede hænder. Grundlæggende strategi dikterer: fordobl mod dealerens 3, 4, 5 og 6. Stå mod 2, 7 og 8. Hit mod 9, 10 og es. Mange spillere står automatisk på 18, fordi det "føles stærkt" – men mod dealerens 9 eller 10 er 18 faktisk en svag hånd, og at hitte giver dig mulighed for at forbedre til 19–21 med essets fleksibilitet som sikkerhedsnet.
      </>
    ),
  },
  {
    question: "Hvad er expected value på en enkelt blackjack-hånd?",
    answer: (
      <>
        Med optimal basic strategy og standard 6-deck-regler er EV pr. hånd ca. -0,005 × din indsats. For en 100 kr. indsats forventes et tab på 0,50 kr. pr. hånd. Over 200 hænder (en typisk 2-timers session) er det forventede tab ca. 100 kr. Variansen er dog høj – standardafvigelsen pr. hånd er ca. 1,14 × indsatsen, hvilket betyder, at dit faktiske resultat vil svinge kraftigt i begge retninger.
      </>
    ),
  },
  {
    question: "Kan man tjene penge på blackjack-turneringer online?",
    answer:
      "Blackjack-turneringer har en fundamentalt anderledes struktur end cash-spil. Du betaler et fast buy-in og konkurrerer mod andre spillere om at ende sessionen med flest chips. Fordi alle spillere møder den samme dealer og samme kort, reduceres tilfældighedens rolle. Turneringsstrategien adskiller sig radikalt fra basic strategy: du skal tage kalkulerede risici baseret på din chipposition relativt til feltet, ikke kun husets edge. Dygtige turneringsspillere kan opnå en positiv ROI over tid.",
  },
];

const BlackjackGuide = () => {
  const faqJsonLd = buildFaqSchema(blackjackFaqs);
  const articleSchema = buildArticleSchema({
    headline: "Blackjack Guide 2026 – Regler, Strategi, Varianter & Online Blackjack",
    description: "Komplet blackjack-guide for danske spillere: regler, basic strategy, online blackjack, varianter, house edge og de vigtigste fejl at undgå.",
    url: `${SITE_URL}/casinospil/blackjack`,
    datePublished: "2026-02-15",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  // BreadcrumbList is auto-generated by SEO.tsx via buildBreadcrumbListSchema() – no manual injection needed.

  return (
    <>
      <SEO
        title="Blackjack Regler 2026 – Guide, Strategi & Varianter"
        description="Blackjack guide til danske spillere: regler, basic strategy, online blackjack, house edge, varianter og de bedste steder at starte."
        type="article"
        datePublished="2026-02-15"
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Brain className="mr-1.5 h-3.5 w-3.5" /> Cornerstone Hub
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Blackjack Regler, Strategi og Online Varianter
            </h1>
            <p className="text-lg text-white/80">
              Start her hvis du vil forstå blackjack: lær reglerne, basic strategy, de vigtigste varianter og hvornår betting-systemer bare er støj.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="40 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={blackjackHero} alt="Blackjack-bord med kort og chips i professionelt studie" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ═══════════════ CLUSTER NAVIGATION GRID ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2">
            <Gamepad2 className="h-8 w-8 text-primary" />
            Udforsk Alle Blackjack-Guides
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Vores blackjack-cluster dækker 4 varianter og 3 betting-systemer i dybden. Hver guide er skrevet i 6.000+ ord med matematiske modeller, EV-tabeller og konkret strategi for danske spillere. Varianterne ændrer reglerne – systemerne ændrer indsatsstrukturen. Begge kræver separat analyse.
          </p>

          <h3 className="mb-4 text-xl font-semibold">Varianter</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            {blackjackCluster.slice(0, 4).map((spoke) => (
              <Link key={spoke.to} to={spoke.to} className="group">
                <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base group-hover:text-primary transition-colors">
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

          <h3 className="mb-4 text-xl font-semibold">Betting-Systemer</h3>
          <div className="grid gap-4 sm:grid-cols-3 mb-6">
            {blackjackCluster.slice(4).map((spoke) => (
              <Link key={spoke.to} to={spoke.to} className="group">
                <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base group-hover:text-primary transition-colors">
                      <spoke.icon className="h-5 w-5 text-primary" />
                      {spoke.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{spoke.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Læs analyse <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 – Hvorfor blackjack er det eneste casinospil med reel spiller-edge
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-primary" />
            Hvorfor blackjack er det eneste casinospil med reel spiller-edge
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I ethvert casinospil har huset en matematisk fordel – det er forretningsmodellen. Men blackjack er unikt, fordi den fordel ikke er fast. Den varierer baseret på dine beslutninger. Når du følger basic strategy, reducerer du <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> til ca. 0,5 %. Når du spiller efter mavefornemmelse, kan den stige til 2–4 %. Ingen anden casinodisciplin giver dig den kontrol.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sammenlign med alternativerne: <Link to="/casinospil/roulette" className={linkClass}>europæisk roulette</Link> har en fast house edge på 2,7 % uanset din indsatsstrategi. <Link to="/casinospil/spillemaskiner" className={linkClass}>Spilleautomater</Link> har en fast RTP, som du ikke kan påvirke overhovedet – du trykker på en knap, og algoritmen bestemmer resten. <Link to="/casinospil/baccarat" className={linkClass}>Baccarat</Link> har en edge på 1,06 % (banker) eller 1,24 % (player), men dine "beslutninger" er begrænsede til at vælge side.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Blackjacks lave edge skyldes én fundamental mekanisme: du handler før dealeren, men du har information (dealerens synlige kort) til at træffe optimale valg. Hvert hit, stand, double down eller split ændrer din forventede værdi for den specifikke hånd. Over tusindvis af hænder akkumuleres disse mikro-optimeringer til en målbar reduktion af casinoets fordel.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Der er en vigtig nuance: 0,5 % house edge betyder stadig, at casinoet vinder over tid. Du taber gennemsnitligt 50 øre pr. 100 kr. indsat. Men sammenlignet med roulettens 2,70 kr. eller en gennemsnitlig slots 3–5 kr. er forskellen dramatisk. Over en session med 200 hænder à 100 kr. (20.000 kr. i total indsats) er dit forventede tab ca. 100 kr. ved blackjack, 540 kr. ved roulette og 600–1.000 kr. ved slots.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den mest præcise måde at forstå blackjacks edge er gennem begrebet "expected value" (EV). For hver mulig kombination af din hånd og dealerens kort eksisterer der en matematisk optimal handling – den handling, der maksimerer din EV. Basic strategy er simpelthen listen over alle disse optimale handlinger. At afvige fra basic strategy er at vælge en lavere EV end nødvendigt. Det svarer til at smide penge i skraldespanden frivilligt.
          </p>
        </section>

        <ReviewScreenshot
          src={mrgreenLiveBlackjack}
          alt="Live blackjack-bord hos Mr Green med dealer, kort og chips – eksempel på professionelt online blackjack"
          caption="Et typisk live blackjack-bord fra Evolution Gaming – her hos Mr Green med klassisk 7-seat format."
          size="full"
        />

        <InlineCasinoCards title="Casinoer med bedst blackjack-vilkår" count={4} />

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 – Grundregler forklaret på 5 minutter
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            Grundregler forklaret på 5 minutter
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Blackjack spilles med 1–8 standard kortspil. Målet er at opnå en håndværdi tættere på 21 end dealeren – uden at overskride 21. Det er alt. Ingen komplicerede sidespil, ingen progressive jackpots. Ren konkurrence mellem dig og dealeren.
          </p>

          <h3 className="mb-2 text-xl font-semibold">Kortværdier</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Talkort (2–10) beholder pålydende værdi. Billedkort (knægt, dame, konge) tæller 10. Esset er fleksibelt: det tæller 11, medmindre det ville få din håndværdi over 21, i hvilket tilfælde det automatisk tæller 1. En hånd med es tællet som 11 kaldes "soft" (du kan trække endnu et kort uden at busse). En hånd uden fleksibelt es er "hard."
          </p>

          <h3 className="mb-2 text-xl font-semibold">Spillets flow</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Du placerer din indsats. Dealeren giver dig to kort (begge åbne) og sig selv to kort (ét åbent, ét lukket). Du vurderer din hånd mod dealerens synlige kort og vælger handling: <strong>Hit</strong> (træk et kort), <strong>Stand</strong> (stop), <strong>Double Down</strong> (fordobl indsatsen, modtag præcis ét kort), <strong>Split</strong> (del et par i to hænder) eller <strong>Surrender</strong> (opgiv halvdelen af indsatsen). Når alle spillere har handlet, afslører dealeren hullekortet og trækker kort efter faste regler – typisk til minimum 17.
          </p>

          <h3 className="mb-2 text-xl font-semibold">Udbetalinger</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Standard gevinst betaler 1:1. Naturlig blackjack (es + 10-værdikort som de to første kort) betaler 3:2 – altså 150 kr. på en 100 kr. indsats. <strong>Undgå altid borde med 6:5-udbetaling</strong> for blackjack. Forskellen fra 3:2 til 6:5 øger house edge med ca. 1,4 procentpoint – en massiv forringelse.
          </p>

          <h3 className="mb-2 text-xl font-semibold">Dealerens tvangsmæssige regler</h3>
          <p className="text-muted-foreground leading-relaxed">
            Dealeren har ingen valgfrihed. Reglerne er trykt på bordet: "Dealer must draw to 16 and stand on all 17s" (eller "hit soft 17" på visse varianter). Denne tvang er både casinoets styrke og svaghed. Styrke, fordi du handler først og kan busse, før dealeren overhovedet trækker. Svaghed, fordi dealeren ikke kan tilpasse sin strategi til din hånd – du kan udnytte dealerens svage op-kort (2–6) ved at stå på lavere værdier og lade dealeren busse.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 – Basic Strategy – matematikken bag perfekte beslutninger
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            Basic Strategy – matematikken bag perfekte beslutninger
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Basic strategy er ikke en "god idé" eller et "tip." Det er den matematisk beviste optimale handling for enhver kombination af din hånd og dealerens op-kort. Den er beregnet via Monte Carlo-simuleringer af milliarder af hænder, hvor hver mulig handling er testet og rangeret efter forventet værdi. At afvige fra basic strategy er pr. definition suboptimalt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Strategien fungerer som et beslutningstræ. Input: din håndværdi (hard/soft) + dealerens synlige kort. Output: den handling, der giver højest EV. Eksempel: du har hard 16, dealeren viser 10. Din instinkt siger "stå – 16 er tæt på 21." Men matematikken siger hit. Hvorfor? Med hard 16 mod dealerens 10 vinder du ca. 23,4 % af gangene ved at stå (dealeren buster) og ca. 23,5 % ved at hitte (du forbedrer eller dealeren buster). Forskellen er marginal, men over tusindvis af hænder akkumulerer selv 0,1 procentpoint.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Håndanalyse: Hard 16 vs. Dealerens 10</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne hånd er blackjacks mest berygtede dilemma. Lad os dissekere den matematisk:
          </p>
          <ul className="mb-4 space-y-2 text-muted-foreground leading-relaxed list-disc pl-6">
            <li><strong>Stand:</strong> Dealeren har ca. 77 % chance for at ende på 17–21 (og slå dig), 23 % for at busse. Dit nettoresultat: ca. -0,54 pr. indsat krone.</li>
            <li><strong>Hit:</strong> Du buster med 5, 6, 7, 8, 9 eller 10 (ca. 61,5 % af kortene). Du overlever med A, 2, 3, 4 (ca. 38,5 %). Men selv når du overlever, skal dealeren stadig busse eller du skal slå dealerens endelige hånd. Nettoresultat: ca. -0,54 pr. indsat krone.</li>
            <li><strong>Surrender (hvis tilgængeligt):</strong> Du mister præcis 0,50 pr. indsat krone. Det er bedre end både hit og stand.</li>
          </ul>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Konklusionen er klar: surrender er optimalt, når det er tilgængeligt. Ellers er hit marginalt bedre end stand. Denne hånd illustrerer basic strategys essens – det handler ikke om at "vinde hånden," men om at <strong>tabe mindst muligt</strong> i ugunstige situationer.
          </p>

          <h3 className="mb-3 text-xl font-semibold">De vigtigste basic strategy-regler</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Hard Hands</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Hard 8 eller lavere: altid hit</li>
                  <li>• Hard 9: double mod 3–6, ellers hit</li>
                  <li>• Hard 10: double mod 2–9, ellers hit</li>
                  <li>• Hard 11: double mod alt undtagen es</li>
                  <li>• Hard 12: hit mod 2–3 og 7+, stå mod 4–6</li>
                  <li>• Hard 13–16: stå mod 2–6, hit mod 7+</li>
                  <li>• Hard 17+: altid stå</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Soft Hands</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Soft 13–14: double mod 5–6, ellers hit</li>
                  <li>• Soft 15–16: double mod 4–6, ellers hit</li>
                  <li>• Soft 17: double mod 3–6, ellers hit</li>
                  <li>• Soft 18: double mod 3–6, stå mod 2/7/8, hit mod 9/10/A</li>
                  <li>• Soft 19: altid stå</li>
                  <li>• Soft 20–21: altid stå</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h3 className="mb-3 text-xl font-semibold">Splitting-regler der sparer dig penge</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Split altid esser – du får to chancer for blackjack (selvom de fleste casinoer kun giver ét kort pr. delt es). Split altid 8'ere – 16 er den statistisk værste starthand, mens to separate 8'ere giver dig to rimelige udgangspunkter. Split <strong>aldrig</strong> 10'ere – 20 er næstbedste hand, og at splitte den er at kaste en næsten sikker gevinst væk. Split aldrig 5'ere – hard 10 er en stærk doubling-kandidat.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For øvrige par (2'ere, 3'ere, 4'ere, 6'ere, 7'ere, 9'ere) afhænger den korrekte handling af dealerens op-kort. Generelt: split lavere par mod dealerens svage kort (2–7) og undlad mod stærke kort (8–es). 9'ere splittes mod alt undtagen 7, 10 og es (mod 7 stander du, fordi din 18 sandsynligvis allerede vinder). Hele splitting-strategien er designet til at udnytte situationer, hvor to middelmådige hænder er bedre end én dårlig.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 – Husets fordel i forskellige blackjack-varianter
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            Husets fordel i forskellige blackjack-varianter
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ikke alle blackjack-spil er lige. Regelforskelle mellem varianter kan ændre house edge med op til 2 procentpoint – en enorm forskel, når du spiller hundredvis af hænder. At vælge den rigtige variant er den letteste måde at forbedre dine odds på, fordi det kræver nul ekstra indsats under selve spillet.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold">Variant</th>
                  <th className="text-left p-3 font-semibold">Decks</th>
                  <th className="text-left p-3 font-semibold">House Edge</th>
                  <th className="text-left p-3 font-semibold">Nøgleregler</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">Single Deck</td>
                  <td className="p-3">1</td>
                  <td className="p-3">0,13 %</td>
                  <td className="p-3">Laveste edge, sjælden online, ofte 6:5-udbetaling (undgå)</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium"><Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>European Blackjack</Link></td>
                  <td className="p-3">2</td>
                  <td className="p-3">0,42 %</td>
                  <td className="p-3">No hole card, double kun 9–11</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium"><Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>Atlantic City (Amerikansk)</Link></td>
                  <td className="p-3">8</td>
                  <td className="p-3">0,36 %</td>
                  <td className="p-3">Late surrender, DAS, liberal split</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">Vegas Strip</td>
                  <td className="p-3">4</td>
                  <td className="p-3">0,35 %</td>
                  <td className="p-3">Dealer stander S17, DAS, 3:2 BJ</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium"><Link to="/casinospil/blackjack/spanish-21" className={linkClass}>Spanish 21</Link></td>
                  <td className="p-3">6–8</td>
                  <td className="p-3">0,38 %</td>
                  <td className="p-3">Ingen 10'ere, bonusudbetalinger, spiller 21 vinder altid</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">Infinite Blackjack (Live)</td>
                  <td className="p-3">8</td>
                  <td className="p-3">0,50 %</td>
                  <td className="p-3">Ubegrænsede pladser, six card charlie</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">Lightning Blackjack (Live)</td>
                  <td className="p-3">8</td>
                  <td className="p-3">~0,56 %</td>
                  <td className="p-3">Tilfældig multiplier (2x–25x), højere varians</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Regelspecifikke edge-justeringer:</strong> Hver specifik regel ændrer house edge med målbare beløb. Her er de vigtigste:
          </p>
          <ul className="mb-4 space-y-1 text-muted-foreground leading-relaxed list-disc pl-6">
            <li>3:2 → 6:5 blackjack-udbetaling: <strong>+1,39 %</strong> house edge</li>
            <li>Dealer hits soft 17 (i stedet for stand): <strong>+0,22 %</strong></li>
            <li>No double after split (DAS): <strong>+0,14 %</strong></li>
            <li>No resplit af esser: <strong>+0,08 %</strong></li>
            <li>Surrender ikke tilgængeligt: <strong>+0,07 %</strong></li>
            <li>8 decks i stedet for 6: <strong>+0,02 %</strong></li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Den praktiske konsekvens: et bord med 6:5-udbetaling og hit-soft-17 kan have en house edge på over 2 % – sammenlignelig med roulette. Et bord med 3:2, stand-S17, DAS og surrender kan ligge under 0,3 %. Forskellen i forventet tab over en session er markant. Tjek altid bordets specifikke regler, før du sætter dig ned.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5 – Korttælling – hvad virker, og hvad er myte?
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Eye className="h-7 w-7 text-primary" />
            Korttælling – hvad virker, og hvad er myte?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Korttælling er den eneste metode, der kan vende blackjacks house edge til spillerens fordel. Det er ikke ulovligt – det er simpelthen at bruge den information, der er synlig på bordet, til at estimere sammensætningen af de resterende kort. Konceptet er enkelt: når bunken er rig på høje kort (10'ere og esser), har spilleren fordel, fordi sandsynligheden for naturlig blackjack (3:2-udbetaling) stiger, og dealeren buster oftere med sin tvangsmæssige trækregler.
          </p>

          <h3 className="mb-2 text-xl font-semibold">Hi-Lo-systemet forklaret</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hi-Lo er det mest udbredte tællesystem. Hver kort tildeles en pointværdi: 2–6 = +1, 7–9 = 0, 10–es = -1. Du opretholder en "running count" (løbende sum) fra bunken blandes. En positiv running count indikerer, at der er relativt flere høje kort tilbage, hvilket favoriserer spilleren. For at justere for antallet af resterende decks beregnes "true count" = running count ÷ estimeret antal resterende decks.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ved true count +1 eller højere begynder spilleren at have en fordel. For hvert +1 i true count stiger spillerens edge med ca. 0,5 procentpoint. Ved true count +2 er edge ca. +0,5 % (spilleren favoriseret). Ved true count +5 kan edge nå +2,5 %. Tællerens strategi er at satse minimalt ved negative/neutrale counts og øge indsatsen markant ved høje positive counts.
          </p>

          <h3 className="mb-2 text-xl font-semibold">Hvorfor korttælling ikke virker online</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            RNG-blackjack (computerspil) blander kortene virtuelt efter <strong>hver eneste hånd</strong>. Der er ingen "resterende bunke" at tælle – hvert kortsted er uafhængigt. Effekten af korttælning er præcis nul. Det svarer til at forsøge at tælle kort i et spil, hvor bunken blandes mellem hvert slag.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Live blackjack med fysiske kort bruger typisk 6–8 decks med en cut card, der udløser omblanding efter ca. 50–75 % penetration. Tælling er teknisk muligt, men udfordringerne er massive: (1) lav penetration begrænser fordelen, (2) hurtigt tempo giver mindre tid til nøjagtig tælling, (3) minimum-indsatsen er ofte høj, hvilket kræver stor bankroll, (4) casinoet kan identificere tællemønstre via software og begrænse din konto.
          </p>

          <h3 className="mb-2 text-xl font-semibold">Myterne om korttælling</h3>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Myte 1:</strong> "Korttælling er ulovligt." Falsk – det er lovligt i alle jurisdiktioner, inklusive Danmark. Casinoer har dog ret til at nægte service. <strong>Myte 2:</strong> "Man skal være matematisk geni." Falsk – Hi-Lo kræver kun simpel addition og subtraktion. Vanskeligheden er hastighed og disciplin, ikke intellekt. <strong>Myte 3:</strong> "Man kan vinde millioner." Realistisk set giver korttælning en edge på 0,5–1,5 % – nok til langsomt, støt profit, ikke øjeblikkelig rigdom. Med en gennemsnitlig indsats på 500 kr. og 80 hænder i timen er den forventede fortjeneste ca. 200–600 kr. pr. time. Det kræver stor bankroll (minimum 200 × max-indsats), jernhård disciplin og tolerance for store kortsigtede tab.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6 – Varians, volatilitet og bankroll management
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            Varians, volatilitet og bankroll management
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Selv med perfekt strategi kan du tabe 15 hænder i træk. Variansen i blackjack er reel og kan overraske selv erfarne spillere. Standardafvigelsen pr. hånd er ca. 1,14 × din indsats – det betyder, at dit resultat svinger kraftigt rundt om den forventede værdi, især på kort sigt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Volatiliteten i blackjack stiger, når du splitter og fordobler. En hånd, der starter med 100 kr., kan hurtigt blive til 400 kr. (double efter split) eller mere. Disse store udsving er en del af optimal spil – du fordobler netop, fordi situationen favoriserer dig – men de kræver en passende bankroll.
          </p>

          <h3 className="mb-2 text-xl font-semibold">Bankroll-beregning: Praktisk eksempel</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Antag en session med følgende parametre: gennemsnitlig indsats 100 kr., 200 hænder, house edge 0,5 %. Det forventede tab er 100 kr. (0,005 × 100 × 200). Men standardafvigelsen for hele sessionen er ca. 100 × 1,14 × √200 ≈ 1.612 kr. Det betyder, at dit faktiske resultat typisk (68 % af gangene) vil ligge mellem -1.712 kr. og +1.512 kr. For at overleve 95 % af sessions uden at gå bust behøver du en bankroll på ca. 2 × standardafvigelsen = 3.224 kr. Afrund op til <strong>3.500–5.000 kr.</strong> for sikkerhed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  Konservativ spiller
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <strong>Indsats:</strong> 25–50 kr.<br />
                  <strong>Session-bankroll:</strong> 1.500 kr.<br />
                  <strong>Risikotolerance:</strong> Lav<br />
                  <strong>Stop-loss:</strong> 750 kr.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Standard spiller
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <strong>Indsats:</strong> 100 kr.<br />
                  <strong>Session-bankroll:</strong> 5.000 kr.<br />
                  <strong>Risikotolerance:</strong> Moderat<br />
                  <strong>Stop-loss:</strong> 2.500 kr.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-primary" />
                  Aggressiv spiller
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <strong>Indsats:</strong> 250–500 kr.<br />
                  <strong>Session-bankroll:</strong> 15.000 kr.<br />
                  <strong>Risikotolerance:</strong> Høj<br />
                  <strong>Stop-loss:</strong> 7.500 kr.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Den gyldne regel:</strong> din indsats pr. hånd bør aldrig overstige 2 % af din total bankroll. Med 5.000 kr. er max indsats 100 kr. Med 15.000 kr. er max indsats 300 kr. Denne regel beskytter dig mod ruin ved extended losing streaks – som vil forekomme, uanset hvor godt du spiller.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Bankroll management er ikke en strategi til at vinde mere – det er en strategi til at overleve længe nok til at lade den lave house edge arbejde. Uden tilstrækkelig bankroll kan en midlertidig tabsperiode tvinge dig til at stoppe, før variansen retter sig. Tænk på din bankroll som brændstof: jo mere du har, jo længere kan du køre.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 7 – Live blackjack vs RNG blackjack
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-primary" />
            Live blackjack vs. RNG blackjack
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            De to formater deler navn og grundregler, men den tekniske infrastruktur og spiloplevelsen er fundamentalt forskellige. At vælge det rigtige format afhænger af, hvad du prioriterer: hastighed, atmosfære, indsatsgrænser eller potentiel for korttælning.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold">Parameter</th>
                  <th className="text-left p-3 font-semibold">RNG Blackjack</th>
                  <th className="text-left p-3 font-semibold">Live Blackjack</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">Kortblanding</td>
                  <td className="p-3">Virtual shuffle pr. hånd</td>
                  <td className="p-3">Fysisk bunke, cut card-baseret</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">Tempo</td>
                  <td className="p-3">~200 hænder/time</td>
                  <td className="p-3">~60–80 hænder/time</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">Min. indsats</td>
                  <td className="p-3">1–10 kr.</td>
                  <td className="p-3">50–500 kr.</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">House edge</td>
                  <td className="p-3">0,4–0,6 %</td>
                  <td className="p-3">0,4–0,6 %</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">Korttælling</td>
                  <td className="p-3">Umuligt</td>
                  <td className="p-3">Teknisk muligt, praktisk svært</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">Socialt element</td>
                  <td className="p-3">Ingen</td>
                  <td className="p-3">Chat med dealer og spillere</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">Tilgængelighed</td>
                  <td className="p-3">24/7, ingen ventetid</td>
                  <td className="p-3">Borde kan være fulde</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>RNG blackjack</strong> er ideel til træning og lav-stakes spil. Du kan spille i dit eget tempo, der er ingen pres fra andre spillere, og minimumsindatserne er ofte under 10 kr. <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link> og <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link> tilbyder solide RNG-varianter med europæiske regler. Ulempen er det hurtige tempo: med 200+ hænder i timen kan du gennemspille en stor bankroll hurtigt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Live blackjack</strong> er den premium-oplevelse. <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> dominerer markedet med formater som Infinite Blackjack (ubegrænsede pladser, fælles kort med individuelle beslutninger), Speed Blackjack (spillere handler parallelt for hurtigere runder) og Lightning Blackjack (tilfældige multiplikatorer op til 25x). Det langsommere tempo reducerer din teoretiske time-expense markant.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            En vigtig matematisk overvejelse: selvom house edge er identisk, er din <strong>forventede udgift pr. time</strong> vidt forskellig. Ved RNG med 200 hænder × 100 kr. × 0,5 % edge = 100 kr./time. Ved live med 70 hænder × 100 kr. × 0,5 % = 35 kr./time. Live blackjack er altså næsten tre gange billigere pr. time underholdning, forudsat samme indsatsstørrelse.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 8 – De 7 mest almindelige fejl spillere laver
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-7 w-7 text-primary" />
            De 7 mest almindelige fejl blackjack-spillere laver
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Selv spillere, der kender basic strategy, begår systematiske fejl, der øger house edge. Her er de syv mest udbredte – og prisen for hver enkelt.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
                At tage insurance
              </h3>
              <p className="text-muted-foreground leading-relaxed mt-1">
                Insurance har en house edge på 7,7 % – det er tre gange værre end selve blackjack-spillet. Selv "even money" (insurance når du har blackjack mod dealerens es) er -EV i det lange løb. Matematikken er entydig: insurance er et separat væddemål med forfærdelige odds. Den eneste undtagelse er for korttællere med en true count over +3, hvor andelen af 10-værdikort i bunken gør det profitabelt.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
                At stå på soft 17
              </h3>
              <p className="text-muted-foreground leading-relaxed mt-1">
                17 "føles" som en OK hånd, men soft 17 er en svag hånd forklædt som middelmådighed. Du kan forbedre den ved at hitte (mulighed for 18–21) eller fordoble mod svage dealer-kort, og esset beskytter dig mod bust. At stå på soft 17 koster ca. 0,12 % edge over tid.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm font-bold">3</span>
                At splitte 10'ere "fordi dealeren har 6"
              </h3>
              <p className="text-muted-foreground leading-relaxed mt-1">
                Du har 20 – det vinder ca. 85 % af alle hænder. At splitte giver dig to hænder med startværdi 10, som er stærke men langt fra garanterede. Den forventede værdi af 20 er markant højere end summen af to separate 10-start-hænder. Splitter du, koster det ca. 8 % af din indsats sammenlignet med at stå.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm font-bold">4</span>
                At lade andre spillere påvirke dine beslutninger
              </h3>
              <p className="text-muted-foreground leading-relaxed mt-1">
                "Du tog mit kort!" er den mest udbredte myte i blackjack. Kortenes rækkefølge er tilfældig – at tredjemand hitter eller stander ændrer ikke din statistiske forventning. Hver hånd er en isoleret matematisk begivenhed. Lad andre spilleres kommentarer passere, og hold dig til basic strategy.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm font-bold">5</span>
                At øge indsatsen efter tab ("chase losses")
              </h3>
              <p className="text-muted-foreground leading-relaxed mt-1">
                Progressiv betting (<Link to="/casinospil/blackjack/martingale" className={linkClass}>Martingale</Link>-lignende systemer) ændrer ikke den forventede værdi. Du vinder oftere, men tabene er katastrofale. Over tid konvergerer resultatet mod den samme house edge. Det eneste, progression gør, er at øge variansen – og risikoen for at sprænge din bankroll. Se vores dybdegående analyser af <Link to="/casinospil/blackjack/fibonacci" className={linkClass}>Fibonacci</Link>- og <Link to="/casinospil/blackjack/dalembert" className={linkClass}>D'Alembert</Link>-systemerne for alternativer.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm font-bold">6</span>
                At vælge borde med 6:5-udbetaling
              </h3>
              <p className="text-muted-foreground leading-relaxed mt-1">
                Forskellen mellem 3:2 og 6:5 er 1,39 procentpoints house edge. Over 200 hænder med 100 kr. indsats er det en forskel på 278 kr. i forventet tab. Altid, altid vælg 3:2-borde. Hvis casinoet kun tilbyder 6:5, spil noget andet.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm font-bold">7</span>
                At spille for hurtigt uden at tænke
              </h3>
              <p className="text-muted-foreground leading-relaxed mt-1">
                Særligt i RNG-blackjack er temptationen at klikke hurtigt. Men hvert sekund brugt på at verificere basic strategy er en investering. Brug 3–5 sekunder pr. beslutning til at dobbelt-tjekke mod en strategi-tabel. Over en session kan det spare dig for adskillige fejl, der hver koster 0,1–0,5 % edge.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 9 – Sammenligning: Blackjack vs Roulette vs Baccarat
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-7 w-7 text-primary" />
            Sammenligning: Blackjack vs. Roulette vs. Baccarat
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tre klassiske bordspil, tre fundamentalt forskellige matematiske profiler. Valget mellem dem bør baseres på, hvad du søger: kontrol over dine odds, minimal house edge uden indsats, eller ren underholdningsværdi.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold">Dimension</th>
                  <th className="text-left p-3 font-semibold">Blackjack</th>
                  <th className="text-left p-3 font-semibold">Roulette</th>
                  <th className="text-left p-3 font-semibold">Baccarat</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">House edge (optimal)</td>
                  <td className="p-3">0,3–0,5 %</td>
                  <td className="p-3">1,35–5,26 %</td>
                  <td className="p-3">1,06–1,24 %</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">Strategi-indflydelse</td>
                  <td className="p-3">Høj – beslutninger ændrer EV</td>
                  <td className="p-3">Ingen – rent tilfældighed</td>
                  <td className="p-3">Minimal – vælg banker/player</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">Indlæringskurve</td>
                  <td className="p-3">Stejl (basic strategy)</td>
                  <td className="p-3">Flad (ingen strategi)</td>
                  <td className="p-3">Flad (simpelt valg)</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">Forventet tab/time (100 kr.)</td>
                  <td className="p-3">~35–100 kr.</td>
                  <td className="p-3">~80–160 kr.</td>
                  <td className="p-3">~60–90 kr.</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">Volatilitet</td>
                  <td className="p-3">Moderat (splits/doubles)</td>
                  <td className="p-3">Variabel (indre vs. ydre)</td>
                  <td className="p-3">Lav (jævne udsving)</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">Bedst til</td>
                  <td className="p-3">Analytiske spillere</td>
                  <td className="p-3">Underholdning</td>
                  <td className="p-3">Lave odds, højt tempo</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/casinospil/roulette" className={linkClass}>Roulette</Link> tilbyder den mest spektakulære casinooplevelse – hjulets spin, kuglens dans, den kollektive spænding ved bordet. Men mathematisk er det et af de dyreste bordspil, særligt den amerikanske variant. Fransk roulette med La Partage (1,35 % edge) er dog et acceptabelt valg for underholdning.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/casinospil/baccarat" className={linkClass}>Baccarat</Link> er det foretrukne spil for asiatiske high-rollers og tilbyder en lav house edge (1,06 % på banker) med praktisk talt ingen beslutninger. Det er det ultimative "lav-effort" bordspil – du vælger side og venter. Ulempen er monotoni: uden strategisk dybde kan spillet blive ensformigt hurtigt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Blackjack er det optimale valg for spillere, der ønsker <strong>maksimal kontrol over deres odds</strong>. Du betaler for den fordel med indlæringstid – basic strategy kræver øvelse at mestre. Men investeringen betaler sig: ingen anden casinodisciplin giver dig mulighed for at reducere husets fordel til under 0,5 % udelukkende med viden. Dine beslutninger har konsekvenser, og det gør spillet meningsfuldt ud over ren underholdning.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 10 – Regulering i Danmark og ansvarligt spil
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Regulering i Danmark og ansvarligt spil
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle blackjack-spil på danske <Link to="/casino-licenser" className={linkClass}>licenserede casinoer</Link> reguleres af Spillemyndigheden og opfylder strenge krav til fairness, tilfældighed og spillerbeskyttelse. RNG-spil testes af uafhængige laboratorier (eCOGRA, iTech Labs, BMM Testlabs), og live casino-studier overvåges med kameraer og auditerede procedurer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Danske spillere nyder skattefrihed på casinogevinster (casinoet betaler 28 % bruttospilafgift). Alle licenserede casinoer er forpligtet til at integrere ROFUS (Register Over Frivilligt Udelukkede Spillere), tilbyde indbetalingsgrænser og give adgang til selvtestværktøjer. Hvis du bemærker tegn på problematisk spiladfærd – som at jage tab, spille for lånte penge eller lyve om dit forbrug – bør du kontakte StopSpillet på 70 22 28 25 eller registrere dig i ROFUS.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <Link to="/ansvarligt-spil" className={linkClass}>Ansvarligt spil</Link> er ikke et appendiks til blackjack – det er fundamentet. Den lave house edge gør blackjack til det mest "overlevelsesvenlige" casinospil, men det ændrer ikke det faktum, at du statistisk set taber over tid. Sæt et budget, definer en session-varighed, og overhold begge. Blackjack bør aldrig være en indtægtskilde, men en hobby med kontrollerbare omkostninger.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 11 – Hvem bør spille blackjack – og hvem bør holde sig væk
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Hvem bør spille blackjack – og hvem bør holde sig væk
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Blackjack er ikke for alle. Spillets styrke – strategisk dybde – er samtidig dets adgangsbarriere. At spille blackjack uden basic strategy er at betale ekstra for en oplevelse, du kunne få billigere med et enklere spil. Her er en ærlig vurdering af, hvem spillet passer til.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-primary">✓ Blackjack passer til dig, hvis...</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Du er villig til at investere 2–3 timer i at lære basic strategy</li>
                  <li>• Du foretrækker at dine beslutninger har konsekvenser</li>
                  <li>• Du har disciplin til at følge en strategi-tabel, selv når den "føles forkert"</li>
                  <li>• Du er komfortabel med matematisk tænkning (sandsynligheder, EV)</li>
                  <li>• Du har en tilstrækkelig bankroll (min. 30–50× indsats pr. session)</li>
                  <li>• Du kan håndtere tabs-serier uden at ændre strategi</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-destructive">✗ Blackjack er ikke optimalt, hvis...</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Du søger ren underholdning uden at tænke (→ <Link to="/casinospil/spillemaskiner" className={linkClass}>spilleautomater</Link>)</li>
                  <li>• Du foretrækker at lade tilfældigheden bestemme (→ <Link to="/casinospil/roulette" className={linkClass}>roulette</Link>)</li>
                  <li>• Du har problemer med at acceptere kortsigtede tab</li>
                  <li>• Du jager konsekvent tab og øger indsatser efter tabsperioder</li>
                  <li>• Du er utilpas ved at træffe hurtige beslutninger under pres</li>
                  <li>• Du har en begrænset bankroll under 1.500 kr.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er ingen skam at vælge et enklere spil. Baccarats banker-bet har 1,06 % edge med nul strategisk indsats. Roulettens lige-penge-væddemål kræver ingen beslutninger. Slots tilbyder ren underholdning uden pres. Hvert spil har sit publikum, og det vigtigste er, at du vælger det format, der giver dig den bedste oplevelse inden for dit budget.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For den spiller, der investerer tiden og disciplinen, tilbyder blackjack noget, intet andet casinospil kan: følelsen af at dine valg betyder noget. Når du splitter esser mod dealerens 6 og lander to blackjacks, ved du, at den beslutning var matematisk optimal – og det giver en tilfredshed, som ren tilfældighed aldrig kan matche.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 12 – Fremtiden for blackjack online
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Zap className="h-7 w-7 text-primary" />
            Fremtiden for blackjack online
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Live casino-segmentet vokser hurtigere end noget andet vertikalt inden for online gambling. Blackjack er kernen i denne vækst, og de næste års innovation vil fundamentalt ændre, hvordan spillet opleves – uden at røre den underliggende matematik.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Lightning Blackjack</strong> har allerede introduceret RNG-baserede multiplikatorer (2x–25x) på gevinsthænder. Konceptet er hentet fra Lightning Roulettes succes og tilføjer et volatilitets-lag oven på den klassiske mekanik. Kompensationen er en marginal stigning i house edge og et "lightning fee" på 100 % af din indsats pr. runde (du betaler dobbelt ante, men gevinster ganges). Det appellerer til spillere, der søger store swing i deres session.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Infinite Blackjack</strong> har løst kapacitetsproblemet ved live borde: alle spillere modtager de samme kort men træffer individuelle beslutninger. Det giver ubegrænsede pladser ved et enkelt bord, hvilket reducerer ventetider og gør live blackjack tilgængelig for flere spillere. Side bets som Any Pair, 21+3, Hot 3 og Bust It tilføjer variationsmuligheder.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Augmented Reality (AR) og Virtual Reality (VR)</strong> er de næste grænser. Flere tech-startups udvikler VR-blackjack-oplevelser, der simulerer et fysisk casinobord i 3D-miljø. Du kan se dine kort i hånden, blande chips og se dealerens ansigtsudtryk – alt i virtuel virkelighed. Teknologien er endnu i sin tidlige fase, men kombinationen af VR-headsets og live dealer-feeds kan revolutionere hjemme-casinooplevelsen inden 2030.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>AI-assisteret spil</strong> er en kontroversiel udvikling. Apps, der bruger computer vision til at identificere kort via webcam og foreslå optimal basic strategy i realtid, eksisterer allerede i gråzonen. Casinoer vil sandsynligvis bekæmpe denne teknologi, men den illustrerer en bredere trend: teknologien gør perfekt basic strategy tilgængelig for alle, hvilket yderligere reducerer gennemsnitlig house edge og presser casinoer til at finde nye forretningsmodeller (side bets, multiplikatorer, gamification).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Trods alle innovationer forbliver blackjacks fundament uændret: det er et matematisk spil, hvor informerede beslutninger reducerer casinoets fordel. Uanset om du spiller i VR i 2030 eller ved et live bord i dag, er basic strategy din vigtigste allierede. Teknologien ændrer indpakningen, men indholdet – 52 kort, 21 som mål, dine valg som variabel – har bestået tidens prøve.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ VIDERE LÆSNING ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Videre Læsning: Varianter og Betting-Systemer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne cornerstone-guide har dækket blackjacks samlede landskab. For dybere specialisering, naviger til de individuelle guides via cluster-gitteret ovenfor. Her er hvad hver guide tilbyder ud over denne hubs indhold:
          </p>
          <ul className="mb-4 space-y-2 text-muted-foreground leading-relaxed list-disc list-inside">
            <li><Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>Amerikansk Blackjack</Link> – Hole card-reglen, peek-mekanikken, liberal splitting og surrender-analyse med EV-tabeller.</li>
            <li><Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>Europæisk Blackjack</Link> – No hole card-konsekvenser, modificeret basic strategy, og hvorfor doubles mod dealer-es kræver anderledes tilgang.</li>
            <li><Link to="/casinospil/blackjack/double-exposure-blackjack" className={linkClass}>Double Exposure Blackjack</Link> – Begge kort synlige: dramatisk ændret strategi, 6:5-kompensation og matematisk analyse af fordel vs. ulempe.</li>
            <li><Link to="/casinospil/blackjack/spanish-21" className={linkClass}>Spanish 21</Link> – Ingen 10'ere, bonusudbetalinger for 5-7-kort 21, late surrender og komplet tilpasset basic strategy.</li>
            <li><Link to="/casinospil/blackjack/martingale" className={linkClass}>Martingale System</Link> – Matematisk bevis for systemets langsigtede failure, Risk of Ruin-simuleringer og historisk kontekst.</li>
            <li><Link to="/casinospil/blackjack/fibonacci" className={linkClass}>Fibonacci System</Link> – Fibonacci-sekvensen som indsatsstruktur: langsommere progression, variansanalyse og sammenligning med Martingale.</li>
            <li><Link to="/casinospil/blackjack/dalembert" className={linkClass}>D'Alembert System</Link> – Den konservative +1/-1-progression: matematisk modellering, session-simuleringer og optimale stop-loss-punkter.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            For sammenligning med andre strategiske <Link to="/casinospil" className={linkClass}>casinospil</Link> anbefaler vi vores guides til <Link to="/casinospil/poker" className={linkClass}>poker</Link> (det eneste spil med positiv EV mod andre spillere), <Link to="/casinospil/baccarat" className={linkClass}>baccarat</Link> (laveste house edge uden strategi) og <Link to="/casinospil/craps" className={linkClass}>craps</Link> (favorable pass line-odds). Blackjack er det eneste rene casinospil, hvor dine beslutninger definerer din forventede værdi – og med denne guide som fundament er du klar til at dykke dybere.
          </p>
        </section>

        <CasinospilMoneyLinks gameName="Blackjack" currentPath="/casinospil/blackjack" />
        <LatestNewsByCategory pagePath="/casinospil/blackjack" />
        <RelatedGuides currentPath="/casinospil/blackjack" />
        <FAQSection faqs={blackjackFaqs} />
        <AuthorBio />
      </div>
      <StickyCtaBySlug slug="campobet" />
    </>
  );
};

export default BlackjackGuide;
