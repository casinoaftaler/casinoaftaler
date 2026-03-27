import React from "react";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import betiniaBonusbuyLobby from "@/assets/screenshots/betinia-bonusbuy-lobby.webp";
import betiniaBonusbuyGameplay from "@/assets/screenshots/betinia-bonusbuy-gameplay.webp";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { FAQSection } from "@/components/FAQSection";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";
import {
  Gamepad2,
  Shield,
  AlertTriangle,
  CheckCircle,
  Users,
  Lock,
  Scale,
  BarChart3,
  HelpCircle,
  Zap,
  Globe,
  Layers,
  TrendingUp,
  Target,
  Star,
  Trophy,
  Sparkles,
  ShoppingCart,
} from "lucide-react";
import { type ReactNode } from "react";

const linkClass = "text-primary underline hover:text-primary/80";

const bonusBuyFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er bonus buy (feature buy)?",
    answer: (
      <>
        Bonus buy – også kaldet{" "}
        <Link to="/ordbog/buy-bonus" className={linkClass}>buy bonus</Link> eller feature buy – er
        en funktion i spilleautomater, der lader dig købe direkte adgang til free spins-runden
        uden at vente på en organisk scatter-trigger. Prisen er typisk 50–200x din indsats,
        afhængigt af spillets volatilitet og bonusrundens potentiale.
      </>
    ),
  },
  {
    question: "Er bonus buy-prisen fair?",
    answer: "Ja, matematisk er bonus buy designet til at give den samme RTP som at vente på en organisk trigger over uendelig mange spins. Prisen afspejler den gennemsnitlige forventede værdi af bonusrunden. Dog eliminerer bonus buy variansen i trigger-timing – du betaler en premium for at undgå potentielt hundredvis af tørre base game-spins.",
  },
  {
    question: "Er bonus buy lovligt i Danmark?",
    answer: (
      <>
        Ja, bonus buy er fuldt lovligt på{" "}
        <Link to="/casino-licenser" className={linkClass}>danske licenserede casinoer</Link>. I
        modsætning til Storbritannien, hvor bonus buy blev forbudt i 2019, har{" "}
        <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> i Danmark
        tilladt funktionen, da den vurderes som en del af spillets mekanik og ikke som en
        separat gambling-funktion. Alle bonus buy-spil er underlagt de samme RNG-krav og
        certificeringer som standard-slots.
      </>
    ),
  },
  {
    question: "Hvilke slots har den bedste bonus buy?",
    answer: (
      <>
        Populære bonus buy-slots inkluderer Sweet Bonanza (
        <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>, 100x),
        Wanted Dead or a Wild (
        <Link to="/spiludviklere/hacksaw-gaming" className={linkClass}>Hacksaw Gaming</Link>, 80x),
        Money Train 3 (<Link to="/spiludviklere/relax-gaming" className={linkClass}>Relax Gaming</Link>, 80x)
        og Gates of Olympus (Pragmatic Play, 100x). Vi tester bonus buy-resultater i vores{" "}
        <Link to="/bonus-hunt" className={linkClass}>bonus hunts</Link>.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på bonus buy og ante bet?",
    answer: (
      <>
        <Link to="/ordbog/ante-bet" className={linkClass}>Ante bet</Link> øger din indsats med
        typisk 25 % og fordobler sandsynligheden for scatter-trigger – du spiller stadig base game
        men trigger bonus oftere. Bonus buy springer base game helt over og køber direkte adgang
        til free spins. Matematisk bevarer begge funktioner den samlede RTP, men de ændrer
        volatilitets-profilen markant.
      </>
    ),
  },
  {
    question: "Hvad koster en bonus buy typisk?",
    answer: "Prisen varierer fra 50x til 500x din indsats. Lavvolatile slots koster typisk 50-80x, medium 80-120x, og højvolatile slots 100-200x+. Nogle Nolimit City-titler har premium bonus buy-versioner op til 500x for de mest potente free spins-varianter. Ved en indsats på 5 kr. koster en typisk bonus buy altså 250-1.000 kr.",
  },
  {
    question: "Kan jeg vinde mere med bonus buy end uden?",
    answer: "Den maksimale gevinst (max win) er den samme uanset om du trigger bonus organisk eller via bonus buy. Forskellen er udelukkende i, hvordan du når bonusrunden. Over mange spins vil din gennemsnitlige tilbagebetaling (RTP) være den samme. Bonus buy handler om at spare tid og eliminere base game-variansen, ikke om at øge din matematiske forventning.",
  },
];

const BonusBuySlots = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(bonusBuyFaqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Bonus Buy Slots – Guide til Feature Buy Spilleautomater 2026",
    description: "Bonus buy-slots: Køb bonus direkte, matematik bag prissætning, bedste titler, ante bet vs. buy bonus og strategi. Find de bedste i Danmark.",
    url: `${SITE_URL}/bonus-buy-slots`,
    datePublished: "2026-03-07",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Bonus Buy Slots – Feature Buy Spilleautomater 2026"
        description="Bonus buy-slots: Køb free spins direkte, forstå matematik bag prissætning, bedste titler og strategi. Find de bedste bonus buy-slots i Danmark."
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(280 60% 30% / 0.95), hsl(150 70% 25% / 0.9)), url(${heroBackgroundImage})`
            : "linear-gradient(135deg, hsl(280 60% 30%), hsl(270 50% 20%) 40%, hsl(150 70% 25%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
              Slot Kategorier
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Bonus Buy Slots – Køb Bonus Direkte
            </h1>
            <p className="text-lg text-white/80">
              Guide til bonus buy-spilleautomater: Køb free spins, forstå matematik bag
              prissætning, og find de bedste titler i 2026.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="20 Min." />

        <SnippetAnswer answer="Bonus buy (feature buy) lader dig købe free spins-runden direkte for 50–200x din indsats. Det er lovligt i Danmark, giver samme RTP som organisk trigger, og eliminerer ventetiden. Sweet Bonanza og Gates of Olympus er blandt de mest populære." />

        <QuickComparisonTable count={3} title="Bedste Casinoer til Bonus Buy Slots" prioritySlugs={["spilleautomaten", "campobet", "swift-casino"]} />

        {/* ── 1. HVAD ER BONUS BUY? ── */}
        <section className="mb-12" id="hvad-er-bonus-buy">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-7 w-7 text-primary" />
            Hvad er bonus buy-spilleautomater?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bonus buy – også kaldet feature buy,{" "}
            <Link to="/ordbog/buy-bonus" className={linkClass}>buy bonus</Link> eller buy feature –
            er en funktion i moderne spilleautomater, der lader dig købe direkte adgang til
            bonusrunden (typisk free spins) uden at vente på en organisk scatter-trigger.
            Funktionen blev populariseret af udviklere som{" "}
            <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>,{" "}
            <Link to="/spiludviklere/hacksaw-gaming" className={linkClass}>Hacksaw Gaming</Link> og{" "}
            <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Prisen for en bonus buy varierer typisk fra 50x til 200x din indsats, afhængigt af
            spillets <Link to="/ordbog/volatilitet" className={linkClass}>volatilitet</Link> og
            bonusrundens potentiale. Matematisk er prisen kalibreret til at afspejle den gennemsnitlige
            forventede værdi af bonusrunden – du betaler i praksis for at eliminere base game-variansen
            og spare tid.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I Danmark er bonus buy fuldt lovligt, i modsætning til f.eks. Storbritannien, hvor det blev
            forbudt i 2019. Alle bonus buy-spil på{" "}
            <Link to="/casino-licenser" className={linkClass}>danske licenserede casinoer</Link> er
            certificerede og regulerede af{" "}
            <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── 2. MATEMATIK BAG PRISSÆTNING ── */}
        <section className="mb-12" id="matematik">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            Matematikken bag bonus buy-prissætning
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bonus buy-prisen er designet af spiludvikleren baseret på bonusrundens gennemsnitlige
            forventede værdi. Formlen er:
          </p>

          <Card className="border-primary/20 bg-primary/5 mb-6">
            <CardHeader>
              <CardTitle className="text-base">Bonus Buy prismodel</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p><strong>Buy Price = E(Bonus Value) / RTP_target</strong></p>
              <p>Hvor E(Bonus Value) er den forventede gennemsnitlige gevinst fra bonusrunden, og RTP_target er den ønskede RTP for bonus buy-funktionen (typisk 96-97 %).</p>
              <p><strong>Eksempel (Sweet Bonanza):</strong> Buy price = 100x indsats. Gennemsnitlig bonus-gevinst = ~96x indsats. Effektiv RTP = 96 %. Over 100 køb er den statistiske forventning: 100 × 96x = 9.600x total retur, mod 100 × 100x = 10.000x investeret = 96 % RTP.</p>
              <p><strong>Variance note:</strong> Standardafvigelsen på bonus buy-resultater er typisk 150-300 % af prisen, hvilket betyder, at individuelle bonusrunder varierer enormt – fra 5x til 1.000x+ indsats.</p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Vores community-data fra{" "}
            <Link to="/bonus-hunt/arkiv" className={linkClass}>Bonus Hunt Arkivet</Link> bekræfter
            denne matematik: Over hundreder af dokumenterede bonus buys leverer vores data et
            gennemsnitligt afkast tæt på den teoretiske forventning, med den forventede høje varians.
            Se detaljerede resultater per slot i vores{" "}
            <Link to="/slot-database" className={linkClass}>Slot Database</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── 3. BEDSTE BONUS BUY SLOTS ── */}
        <section className="mb-12" id="bedste-bonus-buy">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Star className="h-7 w-7 text-primary" />
            Bedste bonus buy-slots i 2026
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              {
                name: "Sweet Bonanza",
                provider: "Pragmatic Play",
                providerLink: "/spiludviklere/pragmatic-play",
                buyPrice: "100x",
                rtp: "96,48 %",
                maxWin: "21.100x",
                desc: "Tumble-mekanik med multiplikator-bomber. Den mest populære bonus buy-slot globalt.",
                gameLink: "/casinospil/spillemaskiner/sweet-bonanza",
              },
              {
                name: "Gates of Olympus",
                provider: "Pragmatic Play",
                providerLink: "/spiludviklere/pragmatic-play",
                buyPrice: "100x",
                rtp: "96,50 %",
                maxWin: "5.000x",
                desc: "Zeus-tema med tumble og multiplikatorer op til 500x. Ante bet tilgængelig.",
                gameLink: "/casinospil/spillemaskiner/gates-of-olympus",
              },
              {
                name: "Wanted Dead or a Wild",
                provider: "Hacksaw Gaming",
                providerLink: "/spiludviklere/hacksaw-gaming",
                buyPrice: "80x / 400x",
                rtp: "96,38 %",
                maxWin: "12.500x",
                desc: "Western-tema med to buy-niveauer: standard og The Great Train Robbery (premium).",
                gameLink: "/casinospil/spillemaskiner/wanted-dead-or-a-wild",
              },
              {
                name: "Money Train 3",
                provider: "Relax Gaming",
                providerLink: "/spiludviklere/relax-gaming",
                buyPrice: "80x",
                rtp: "96,00 %",
                maxWin: "100.000x",
                desc: "Respin-bonus med persistent symbols og op til 100.000x max win.",
                gameLink: "/casinospil/spillemaskiner/money-train-3",
              },
              {
                name: "Reactoonz",
                provider: "Play'n GO",
                providerLink: "/spiludviklere/play-n-go",
                buyPrice: "60x",
                rtp: "96,51 %",
                maxWin: "4.570x",
                desc: "Cluster pays med Quantum features og cascading wins.",
                gameLink: "/casinospil/spillemaskiner/reactoonz",
              },
              {
                name: "Extra Chilli Megaways",
                provider: "Big Time Gaming",
                providerLink: "/spiludviklere/big-time-gaming",
                buyPrice: "50x",
                rtp: "96,20 %",
                maxWin: "20.000x",
                desc: "Megaways + bonus buy med gamble-option for ekstra free spins.",
                gameLink: "/casinospil/spillemaskiner/extra-chilli-megaways",
              },
            ].map((slot) => (
              <Card key={slot.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{slot.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    <Link to={slot.providerLink} className={linkClass}>{slot.provider}</Link>
                  </p>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>{slot.desc}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="outline">Buy: {slot.buyPrice}</Badge>
                    <Badge variant="outline">RTP: {slot.rtp}</Badge>
                    <Badge variant="outline">Max: {slot.maxWin}</Badge>
                  </div>
                  <Link to={slot.gameLink} className={`text-xs ${linkClass}`}>Læs fuld guide →</Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Vi har allerede en dybdegående guide til bonus buy-mekanikken med detaljerede
            EV-beregninger: Se vores{" "}
            <Link to="/casinospil/spillemaskiner/bonus-buys" className={linkClass}>
              Bonus Buys Guide
            </Link> for den fulde matematiske analyse.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── 4. BONUS BUY VS. ANTE BET ── */}
        <section className="mb-12" id="vs-ante-bet">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            Bonus buy vs. ante bet – sammenligning
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                  Bonus Buy
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>• Springer base game over helt</p>
                <p>• Pris: 50–200x indsats (engangs)</p>
                <p>• Eliminerer trigger-varians</p>
                <p>• Samme RTP som organisk trigger</p>
                <p>• Ideel til kort spilletid</p>
                <p>• Højere øjeblikkelig risiko per køb</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Ante Bet
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>• Spiller stadig base game</p>
                <p>• +25 % per spin (løbende)</p>
                <p>• 2x scatter-sandsynlighed</p>
                <p>• Samme RTP som standard</p>
                <p>• Ideel til normal session</p>
                <p>• Lavere risiko per spin, men hurtigere tab</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Begge funktioner bevarer den samlede{" "}
            <Link to="/ordbog/rtp" className={linkClass}>RTP</Link>, men de ændrer{" "}
            <Link to="/ordbog/volatilitet" className={linkClass}>volatilitets</Link>-profilen.
            Bonus buy er en "alt-in" tilgang, mens ante bet er en gradvis acceleration. Valget
            afhænger af din{" "}
            <Link to="/ordbog/bankroll-management" className={linkClass}>bankroll</Link>,
            tidsbudget og risikotolerance.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── 5. STRATEGI ── */}
        <section className="mb-12" id="strategi">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            Strategi for bonus buy-slots
          </h2>
          <div className="space-y-4 mb-6">
            {[
              {
                title: "Bankroll per bonus buy",
                icon: Scale,
                content: "Planlæg minimum 3-5 bonus buys per session. Ved 100x buy price og 5 kr. indsats er det 1.500-2.500 kr. minimum. Én enkelt bonus buy har høj varians – du behøver volumen for at nærme dig den forventede RTP.",
              },
              {
                title: "Vælg det rette spil",
                icon: BarChart3,
                content: "Sammenlign buy price, max win og RTP. En slot med 80x buy og 96 % RTP er generelt bedre end en med 200x buy og 95 % RTP. Vores Slot Database viser historiske gennemsnit per titel.",
              },
              {
                title: "Undgå tilt-buying",
                icon: AlertTriangle,
                content: "Den største fare ved bonus buy er impulsivt at købe bonus efter bonus efter dårlige resultater. Sæt et fast budget for bonus buys per session, og hold dig til det. Husk at sætte indbetalingsgrænser – alle danske casinoer tilbyder dette.",
              },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="pt-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <item.icon className="h-4 w-4 text-primary" />
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* ── 6. ANSVARLIGT SPIL ── */}
        <section className="mb-12" id="ansvarligt-spil">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            Ansvarligt spil og bonus buy
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bonus buy gør det nemt at bruge store beløb hurtigt. Et enkelt køb på 100x ved 10 kr.
            indsats koster 1.000 kr. Vi anbefaler altid at:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground mb-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Sæt indbetalingsgrænser, før du begynder at spille</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Brug aldrig penge, du ikke har råd til at tabe</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Tag pauser – bonus buy kan være intenst</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>
                Brug <Link to="/ansvarligt-spil/rofus" className={linkClass}>ROFUS</Link> eller
                casinoets selvudelukkelses-værktøjer, hvis du mister kontrollen
              </span>
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Har du brug for hjælp, kan du kontakte{" "}
            <Link to="/ansvarligt-spil/stopspillet" className={linkClass}>StopSpillet</Link> – en
            gratis og anonym rådgivningstjeneste. Læs mere i vores{" "}
            <Link to="/ansvarligt-spil" className={linkClass}>guide til ansvarligt spil</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── 7. RELATEREDE KATEGORIER ── */}
        <section className="mb-12" id="relaterede">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            Udforsk andre slot-kategorier
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { to: "/megaways-slots", title: "Megaways Slots", desc: "Dynamiske hjul med op til 117.649 ways" },
              { to: "/jackpot-slots", title: "Jackpot Slots", desc: "Progressive jackpots med milliongevinster" },
              { to: "/casinospil/spillemaskiner", title: "Spillemaskiner Guide", desc: "Komplet guide til alle spilleautomater" },
              { to: "/casinospil/spillemaskiner/bonus-buys", title: "Bonus Buys Matematik", desc: "Dybdegående EV-analyse af bonus buys" },
              { to: "/slot-database", title: "Slot Database", desc: "1.400+ slots med community-statistik" },
              { to: "/ordbog", title: "Casino Ordbog", desc: "Forstå alle casino-termer" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-sm transition-colors hover:bg-muted"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <LatestNewsByCategory pagePath="/bonus-buy-slots" />
        <RelatedGuides currentPath="/bonus-buy-slots" />
        <FAQSection title="Ofte Stillede Spørgsmål om Bonus Buy Slots" faqs={bonusBuyFaqs} />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
};

export default BonusBuySlots;
