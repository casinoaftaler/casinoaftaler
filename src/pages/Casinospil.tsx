import { useState } from "react";
import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { CommunityPromoSection } from "@/components/CommunityPromoSection";
import { CasinoCard } from "@/components/CasinoCard";
import { useCasinos } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import casinospilHero from "@/assets/casinospil-hero.jpg";
import { type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Gamepad2,
  ShieldCheck,
  Trophy,
  Star,
  Clock,
  Sparkles,
  Users,
  TrendingUp,
  Zap,
  Layers,
  User,
  CalendarDays,
  BookOpen,
  HelpCircle,
  Dices,
  Target,
  BarChart3,
  Loader2,
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const casinospilFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad bestemmer dine vinderchancer i forskellige casinospil – RTP, house edge og volatilitet?",
    answer:
      "Tre nøgletal styrer dine odds: RTP (Return to Player) angiver den procentvise tilbagebetaling over millioner af spins – blackjack topper med op til 99,5 %, mens progressive jackpots typisk har 88–92 %. House edge er det omvendte (100 % minus RTP) og repræsenterer casinoets statistiske fordel. Volatilitet beskriver gevinstfordelingen: lav volatilitet (fx Starburst) giver hyppige gevinster på 1–10x indsatsen, høj volatilitet (fx Book of Dead) giver sjældnere gevinster men op til 5.000–50.000x. For budgetstyring er lav volatilitet bedst til lange sessioner, mens høj volatilitet kræver større bankroll men tilbyder potentielt livsendrende beløb.",
  },
  {
    question: "Hvilke bordspil tilbyder de bedste odds for danske spillere, og kræver de strategi?",
    answer: (
      <>
        Blackjack har den laveste house edge blandt alle casinospil – helt ned til 0,5 % med optimal basisstrategi (hit/stand/double/split baseret på dine kort vs. dealerens åbne kort). Baccarat følger med 1,06 % house edge på banker-bet, og det kræver ingen strategi – du vælger blot banker, player eller tie. Video poker (Jacks or Better) kan nå 99,5 % RTP med optimal strategi. Roulette har 2,70 % house edge på europæisk variant (enkelt nul) – undgå altid amerikansk roulette med dobbelt nul (5,26 %). Craps tilbyder 1,36 % house edge på don't pass-line. Strategispil belønner altså tålmodighed og viden med markant bedre odds end rene tilfældighedsspil.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på klassiske slots, video slots, Megaways og progressive jackpots?",
    answer: (
      <>
        Klassiske slots har 3 hjul, få gevinstlinjer (1–5) og simple funktioner – ideelle til begyndere med RTP omkring 96–97 %. Video slots har 5+ hjul, 20–243 faste gevinstlinjer, temaer, bonusspil og free spins – de udgør 90 % af moderne{" "}
        <Link to="/spiludviklere" className={linkClass}>spiludvikleres</Link> katalog. Megaways-spil (opfundet af{" "}
        <Link to="/spiludviklere/big-time-gaming" className={linkClass}>Big Time Gaming</Link>) bruger dynamiske hjul med op til 117.649 vinderkombinationer pr. spin – antallet ændres ved hvert spin. Progressive jackpots (fx Mega Moolah fra{" "}
        <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link>) har en fælles pulje, der vokser med hver indsats på tværs af alle casinoer, men basis-RTP er lavere (88–92 %).
      </>
    ),
  },
  {
    question: "Kan jeg prøve casinospil gratis, og hvad er begrænsningerne ved demotilstand?",
    answer: (
      <>
        De fleste spilleautomater og video slots tilbyder demotilstand (play-for-fun) med virtuelle credits, hvor du kan teste grafik, gameplay og bonusfunktioner uden at risikere penge. Dog har demotilstand begrænsninger: progressive jackpots er ikke tilgængelige, og{" "}
        <Link to="/live-casino" className={linkClass}>live casino</Link>-spil kræver altid rigtige penge. Alternativt kan du bruge en{" "}
        <Link to="/bonus-uden-indbetaling" className={linkClass}>bonus uden indbetaling</Link> til at spille med rigtige gevinster uden egen indbetaling, eller udnytte{" "}
        <Link to="/free-spins" className={linkClass}>free spins</Link> på udvalgte automater. Vær opmærksom på, at RNG-resultaterne er identiske i demo- og pengetilstand – casinospillets matematiske model ændres ikke.
      </>
    ),
  },
  {
    question: "Hvad er game shows i live casino, og hvorfor er de blevet så populære?",
    answer: (
      <>
        Game shows er en hybrid mellem traditionelle casinospil og tv-underholdning, pioneeret af{" "}
        <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> med Dream Catcher i 2017. De mest populære titler inkluderer Crazy Time (fire bonusspil, multiplikatorer op til 25.000x, 96,08 % RTP), Monopoly Live (3D-bonusrunde med realistisk spilleplade) og Lightning Dice (multiplikator-mekanik på terningkast). Game shows kræver ingen strategi og har lave minimumsindsatser (typisk 1–5 kr.), hvilket gør dem tilgængelige for alle spillere. House edge er typisk 3–5 % – højere end klassiske bordspil, men lavere end mange spilleautomater. Det er underholdningsværdien og den sociale dimension, der driver populariteten.
      </>
    ),
  },
  {
    question: "Hvordan vælger jeg det rigtige casinospil baseret på min spillestil og budget?",
    answer:
      "Match dit spilvalg med din risikoprofil og dit budget. Med et lille budget (100–300 kr.) bør du vælge lav-volatilitet slots eller blackjack med lav minimumsindsats – det giver flest spins/hænder og længst spilletid. Med medium budget (300–1.000 kr.) er video slots med medium volatilitet ideelle – de balancerer underholdning og gevinstpotentiale. Med højere budget kan høj-volatilitet slots eller live casino borde med højere indsatser give bedre oplevelser. Uanset budget: sæt altid en tabsgrænse, vælg spil med 95 %+ RTP, og brug casinoets indbetalingsgrænser. Husk at house edge altid er i casinoets favør – spil for underholdningens skyld.",
  },
];

const Casinospil = () => {
  const { data: siteSettings } = useSiteSettings();
  const { data: casinos, isLoading: casinosLoading } = useCasinos();
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);
  const heroBackgroundImage = siteSettings?.hero_background_image;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: casinospilFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof faq.answer === "string" ? faq.answer : faq.question,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Forside",
        item: "https://casinoaftaler.dk/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Casinospil",
        item: "https://casinoaftaler.dk/casinospil",
      },
    ],
  };

  return (
    <>
      <SEO
        title="Casinospil 2026 – Guide til Alle Online Casinospil i Danmark"
        description="Komplet guide til casinospil i Danmark 2026. Lær alt om spilleautomater, roulette, blackjack, poker, live casino og meget mere. Find de bedste casinospil hos danske casinoer med licens."
        jsonLd={[faqJsonLd, breadcrumbJsonLd]}
      />

      {/* Hero Section */}
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
              <Gamepad2 className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Casinospil 2026 – Din Komplette Guide til Online Casinospil
            </h1>
            <p className="text-lg text-white/80">
              Udforsk alle typer casinospil hos danske online casinoer. Fra
              klassiske spilleautomater og bordspil til moderne live
              casinospil og game shows – vi guider dig til de bedste
              casinospil i Danmark.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        {/* Meta info bar */}
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>
              Skrevet af:{" "}
              <span className="font-medium text-foreground">Casinoaftaler</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>
              Siden opdateret:{" "}
              <span className="font-medium text-foreground">13-02-2026</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>
              Læsetid:{" "}
              <span className="font-medium text-foreground">10 Min.</span>
            </span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={casinospilHero}
            alt="Luxuriøst casino med spilleautomater, rouletteborde og kortborde"
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        {/* Intro Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvad er casinospil, og hvorfor er de så populære?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Casinospil er kernen i enhver online casinooplevelse. Uanset om du
            foretrækker at dreje hjulene på en spilleautomat, satse på roulette
            eller udfordre dealeren i blackjack, findes der casinospil til enhver
            smag og ethvert budget. I Danmark har online casinospil oplevet en
            massiv vækst i 2026, drevet af teknologisk innovation, mobiloptimering
            og et stadigt bredere udvalg af casinospil hos licenserede danske
            casinoer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hos Casinoaftaler.dk har vi samlet alt, hvad du behøver at vide om
            casinospil i Danmark. Vi gennemgår de mest populære typer casinospil,
            forklarer reglerne, deler strategier og hjælper dig med at finde de
            casinospil, der passer perfekt til din spillestil. Alle casinoer, vi
            anbefaler, har gyldig dansk licens fra{" "}
            <a
              href="https://www.spillemyndigheden.dk/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Spillemyndigheden
            </a>
            , så du altid spiller sikkert og trygt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det danske casinomarked tilbyder i 2026 tusindvis af casinospil fra
            verdens førende{" "}
            <Link to="/spiludviklere" className={linkClass}>
              spiludviklere
            </Link>{" "}
            som <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>, <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> og Evolution Gaming. Uanset om
            du er nybegynder eller erfaren spiller, er der altid nye og
            spændende casinospil at opdage.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Spilleautomater */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Spilleautomater – Det mest populære casinospil
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spilleautomater (også kaldet slots) er det absolut mest populære
            casinospil blandt danske spillere. I 2026 udgør spilleautomater over
            80 % af alle casinospil på danske online casinoer. Grunden er enkel:
            spilleautomater er nemme at forstå, kræver ingen kompliceret strategi
            og tilbyder alt fra underholdende temaer til massive jackpots.
            Vil du prøve spilleautomater helt gratis?{" "}
            <Link to="/community/slots" className={linkClass}>
              Besøg vores spillehal
            </Link>{" "}
            og test vores egne slots uden risiko.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Moderne spilleautomater fås i mange varianter: klassiske 3-hjuls
            slots, video slots med 5 hjul og hundredvis af gevinstlinjer,
            Megaways-spilleautomater med op til 117.649 måder at vinde på, og
            progressive jackpot-slots, hvor præmiepuljen kan nå millioner af
            kroner. Hver type casinospil har sin egen appel og sit eget
            risiko-/gevinst-niveau.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Video Slots
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Det mest udbredte casinospil med 5 hjul, bonusfunktioner, free
                  spins og avancerede temaer. RTP ligger typisk mellem 95-97 %.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-primary" />
                  Megaways Slots
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Revolutionerende casinospil med dynamiske hjul og op til
                  117.649 gevinstmuligheder per spin. Høj volatilitet og
                  spænding.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5 text-primary" />
                  Jackpot Slots
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Casinospil med progressive jackpots, der kan nå millioner.
                  Populære titler inkluderer Mega Moolah og Hall of Gods.
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Når du vælger en spilleautomat, bør du altid tjekke RTP (Return to
            Player), som angiver den teoretiske tilbagebetalingsprocent. Et
            casinospil med høj RTP (over 96 %) giver dig statistisk set bedre
            vinderchancer over tid. Kombiner dette med en god{" "}
            <Link to="/casino-bonus" className={linkClass}>
              casino bonus
            </Link>{" "}
            eller{" "}
            <Link to="/free-spins" className={linkClass}>
              free spins
            </Link>
            , og du får den optimale casinospil-oplevelse.
          </p>
        </section>

        {/* Casino Cards */}
        <Separator className="my-10" />
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Anbefalede casinoer</h2>
          {casinosLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (() => {
            const displayCasinos = (casinos ?? [])
              .filter((c) => c.is_active && c.slug !== "betit")
              .slice(0, 8);
            const mapCasino = (casino: typeof displayCasinos[0]) => ({
              id: casino.id,
              name: casino.name,
              slug: casino.slug,
              rating: Number(casino.rating),
              bonusTitle: casino.bonus_title,
              bonusAmount: casino.bonus_amount,
              bonusType: casino.bonus_type,
              wageringRequirements: casino.wagering_requirements,
              validity: casino.validity,
              minDeposit: casino.min_deposit,
              payoutTime: casino.payout_time,
              freeSpins: casino.free_spins,
              features: casino.features ?? [],
              pros: casino.pros ?? [],
              cons: casino.cons ?? [],
              description: casino.description ?? "",
              isRecommended: casino.is_recommended,
              isHot: casino.is_hot,
              logoUrl: casino.logo_url,
              affiliateUrl: casino.affiliate_url,
              gameProviders: casino.game_providers ?? [],
            });
            return displayCasinos.length === 0 ? null : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  {displayCasinos.slice(0, 2).map((casino, index) => (
                    <CasinoCard
                      key={casino.id}
                      casino={mapCasino(casino)}
                      rank={index + 1}
                      open={openCasinoId === casino.id}
                      onOpenChange={(open) => setOpenCasinoId(open ? casino.id : null)}
                    />
                  ))}
                </div>
                {displayCasinos.length > 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    {displayCasinos.slice(2).map((casino, index) => (
                      <CasinoCard
                        key={casino.id}
                        casino={mapCasino(casino)}
                        rank={index + 3}
                        open={openCasinoId === casino.id}
                        onOpenChange={(open) => setOpenCasinoId(open ? casino.id : null)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })()}
        </section>

        {/* Bordspil */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Bordspil – Klassiske casinospil med strategi
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bordspil er de klassiske casinospil, der har defineret
            casinokulturen i århundreder. I 2026 er blackjack, roulette,
            baccarat og poker stadig blandt de mest elskede casinospil hos
            danske spillere. Disse casinospil adskiller sig fra spilleautomater
            ved at tilbyde en strategisk dimension, hvor dine beslutninger
            direkte påvirker udfaldet.
          </p>

          <h3 className="mb-3 text-2xl font-semibold">Blackjack</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Blackjack er det casinospil med den laveste house edge – helt ned
            til 0,5 % med optimal strategi. Målet er at slå dealerens hånd
            uden at overstige 21. Det er et casinospil, der belønner
            tålmodighed, disciplin og strategisk tænkning. Danske casinoer
            tilbyder adskillige blackjack-varianter, herunder Classic Blackjack,
            European Blackjack og Blackjack Switch.
          </p>

          <h3 className="mb-3 text-2xl font-semibold">Roulette</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Roulette er det ikoniske casinospil, hvor en kugle lander på et tal
            mellem 0 og 36. Du kan satse på enkelte numre, farver (rød/sort),
            lige/ulige eller grupper af tal. Europæisk roulette med et enkelt
            nul giver en house edge på kun 2,7 %, hvilket gør det til et af de
            mest retfærdige casinospil. Fransk roulette med La Partage-reglen
            reducerer fordelen yderligere til 1,35 % på lige-chancer.
          </p>

          <h3 className="mb-3 text-2xl font-semibold">Baccarat</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Baccarat er et elegant casinospil med simple regler: sats på
            Spilleren, Bankøren eller Uafgjort. Med en house edge på kun 1,06 %
            på Bankør-væddemålet er baccarat et af de mest fordelagtige
            casinospil for spilleren. Det kræver ingen kompliceret strategi,
            men tilbyder alligevel spænding og gode vindermuligheder.
          </p>

          <h3 className="mb-3 text-2xl font-semibold">Poker</h3>
          <p className="text-muted-foreground leading-relaxed">
            Poker er det eneste casinospil, hvor du spiller mod andre spillere
            – ikke mod huset. Casino-varianter som Casino Hold'em og Three Card
            Poker er populære casinospil hos danske online casinoer. Video poker
            kombinerer elementer fra poker og spilleautomater og tilbyder
            RTP-værdier på op til 99,5 % med optimal strategi.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Live Casino */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Live casinospil – Den autentiske casinooplevelse
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/live-casino" className={linkClass}>
              Live casinospil
            </Link>{" "}
            er den hurtigst voksende kategori af casinospil i 2026. Med
            live-streaming-teknologi kan du spille casinospil med rigtige
            dealere i realtid, direkte fra dit hjem. Førende udbydere som
            Evolution Gaming og Pragmatic Play Live leverer casinospil i
            uovertruffen kvalitet med HD-video, flere kameravinkler og
            interaktiv chat.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Populære live casinospil inkluderer Live Blackjack, Live Roulette,
            Live Baccarat og innovative game shows som Crazy Time, Monopoly
            Live og Dream Catcher. Disse casinospil kombinerer underholdning
            med gambling og tiltrækker en bred målgruppe af danske spillere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Live casinospil er ideelle for spillere, der ønsker den sociale
            dimension af et fysisk casino, men med bekvemmeligheden ved at
            spille online. Du kan interagere med dealeren og andre spillere via
            chat, mens du nyder professionelt hostede casinospil fra
            studier i hele verden.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Volatilitet og RTP */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Forstå RTP og volatilitet i casinospil
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            To af de vigtigste begreber inden for casinospil er RTP (Return to
            Player) og volatilitet. RTP angiver den procentdel af alle
            indsatser, som et casinospil teoretisk tilbagebetaler til spillerne
            over tid. En spilleautomat med 96 % RTP tilbagebetaler i gennemsnit
            96 kr. for hver 100 kr., der satses.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Lav volatilitet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Casinospil med hyppige, men mindre gevinster. Perfekt til
                  spillere med begrænset budget, der ønsker lang spilletid.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  Medium volatilitet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Balancerede casinospil med en blanding af små og store
                  gevinster. Den mest populære type blandt danske spillere.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Høj volatilitet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Casinospil med sjældne, men store gevinster. Kræver større
                  bankroll og tålmodighed, men tilbyder de største præmier.
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Når du vælger casinospil, bør du altid overveje kombinationen af
            RTP og volatilitet. Et casinospil med høj RTP og lav volatilitet
            giver den mest stabile oplevelse, mens høj volatilitet og høj RTP
            giver de bedste chancer for store gevinster. Brug en god{" "}
            <Link to="/velkomstbonus" className={linkClass}>
              velkomstbonus
            </Link>{" "}
            til at forlænge din spilletid og udforske flere casinospil uden
            ekstra risiko.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Strategier */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Strategier til at spille casinospil
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Selvom casinospil primært er baseret på tilfældighed, kan smarte
            strategier forbedre din oplevelse og potentielt dine resultater.
            Her er de vigtigste tips til at spille casinospil klogt:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Sæt et budget
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Den vigtigste regel i alle casinospil: sæt altid et fast
                  budget, og overhold det. Spil aldrig for mere, end du har
                  råd til at tabe. Ansvarligt spil er fundamentet for en god
                  casinospil-oplevelse.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  Vælg høj RTP
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Prioriter casinospil med RTP over 96 %. Over tid giver høj
                  RTP dig bedre værdi for dine penge. Tjek altid
                  tilbagebetalingsprocenten, før du starter et casinospil.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Layers className="h-5 w-5 text-primary" />
                  Udnyt bonusser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Brug{" "}
                  <Link to="/casino-bonus" className={linkClass}>
                    casino bonusser
                  </Link>{" "}
                  og{" "}
                  <Link to="/free-spins" className={linkClass}>
                    free spins
                  </Link>{" "}
                  til at forlænge din spilletid. En god bonus giver dig flere
                  chancer i dine foretrukne casinospil.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  Lær reglerne
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Forstå reglerne for hvert casinospil, før du satser rigtige
                  penge. Brug demotilstand til at øve dig, og lær optimal
                  strategi for bordspil som blackjack og poker.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Casinospil på mobilen */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Casinospil på mobilen – spil hvor som helst
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I 2026 spilles størstedelen af alle casinospil på mobilen. Moderne casinospil er fuldt optimeret til smartphones og tablets, og de bedste danske casinoer tilbyder tusindvis af casinospil direkte i din mobilbrowser – helt uden download. Uanset om du foretrækker spilleautomater, bordspil eller{" "}
            <Link to="/live-casino" className={linkClass}>live casinospil</Link>, fungerer de perfekt på både iPhone og Android.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            De førende{" "}
            <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link> som <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> og <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link> designer alle deres casinospil med mobilen i centrum. Det betyder, at grafik, lyd og gameplay i mobile casinospil er lige så imponerende som på desktop. Touch-kontroller gør det intuitivt at spille casinospil på farten, og hurtig indlæsning sikrer en problemfri casinospil-oplevelse.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For at komme i gang med mobile casinospil skal du blot vælge et casino fra vores liste, åbne det i din mobilbrowser og oprette en konto. Du kan indbetale med{" "}
            <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link> direkte fra din telefon og begynde at spille casinospil med det samme. Alle{" "}
            <Link to="/casino-bonus" className={linkClass}>casino bonusser</Link> og{" "}
            <Link to="/free-spins" className={linkClass}>free spins</Link> kan også aktiveres og bruges på mobile casinospil.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Hvordan vælger du de bedste casinospil */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Sådan vælger du de bedste casinospil i 2026
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med tusindvis af casinospil tilgængelige hos danske casinoer kan det være overvældende at vælge. Her er vores guide til at finde de casinospil, der passer til din spillestil og dit budget.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Start med at definere din spillestil: Foretrækker du underholdning og store jackpots? Så er spilleautomater de ideelle casinospil for dig. Elsker du strategi og lave house edges? Så er bordspil som blackjack eller baccarat de bedste casinospil. Ønsker du den autentiske casinooplevelse med rigtige dealere? Så er{" "}
            <Link to="/live-casino" className={linkClass}>live casinospil</Link> det perfekte valg.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Overvej også dit budget, når du vælger casinospil. Casinospil med lav volatilitet giver hyppige, mindre gevinster og er ideelle til spillere med et begrænset budget. Casinospil med høj volatilitet kræver en større bankroll, men tilbyder mulighed for store gevinster. De mest spillede casinospil på det danske marked er typisk medium-volatilitet med RTP'er over 96%.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Endelig anbefaler vi altid at prøve casinospil i demotilstand, før du spiller for rigtige penge. De fleste danske casinoer tilbyder gratis demo-versioner af deres casinospil, så du kan teste gameplay, bonusfunktioner og volatilitet uden risiko. Brug desuden en{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> eller{" "}
            <Link to="/free-spins" className={linkClass}>free spins</Link> til at udforske nye casinospil uden at risikere dine egne penge.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Trends 2026 */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Casinospil-trends i Danmark 2026
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det danske casinospil-marked udvikler sig konstant, og 2026 byder
            på flere markante trends. Mobilspil dominerer nu fuldstændig, og
            over 75 % af alle casinospil spilles på smartphones og tablets.
            Spiludviklere optimerer konsekvent deres casinospil til
            berøringsskærme med intuitive grænseflader og hurtig indlæsning.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Game shows er den hurtigst voksende kategori inden for live
            casinospil. Titler som Crazy Time, Monopoly Live og Funky Time
            kombinerer elementer fra tv-underholdning med casinospil og
            tiltrækker en helt ny generation af spillere. Disse innovative
            casinospil tilbyder høj RTP, social interaktion og massive
            gevinstmultiplikatorer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En anden vigtig trend er personaliserede bonusser tilpasset dine
            foretrukne casinospil. Danske casinoer bruger i stigende grad data
            til at tilbyde skræddersyede{" "}
            <Link to="/casino-bonus" className={linkClass}>
              casino bonusser
            </Link>{" "}
            og{" "}
            <Link to="/free-spins" className={linkClass}>
              free spins
            </Link>{" "}
            baseret på din spillehistorik og præferencer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Endelig ser vi en stigning i{" "}
            <Link to="/no-sticky-bonus" className={linkClass}>
              no-sticky bonusser
            </Link>{" "}
            og{" "}
            <Link to="/bonus-uden-omsaetningskrav" className={linkClass}>
              bonusser uden omsætningskrav
            </Link>
            , der giver spillere mere frihed og gennemsigtighed, når de spiller
            casinospil online. Denne udvikling afspejler en bredere trend mod
            fairere og mere spillervenlige vilkår i det danske casinospil-marked.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Sikkerhed */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Sikkerhed og lovgivning for casinospil i Danmark
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle casinospil i Danmark reguleres af Spillemyndigheden, som
            sikrer, at online casinoer opererer lovligt og ansvarligt. Når du
            spiller casinospil hos et casino med dansk licens, er du beskyttet
            af streng lovgivning, der kræver fair spil, ansvarlig
            markedsføring og sikker håndtering af dine personlige data.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle casinospil hos licenserede danske casinoer bruger certificerede
            tilfældighedsgeneratorer (RNG), der sikrer, at udfaldet af hvert
            spin, kort eller kuglekast er fuldstændig tilfældigt og ikke kan
            manipuleres. Derudover revideres casinoer regelmæssigt af
            uafhængige testorganer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hvis du oplever problemer med dit spil, kan du altid selvudelukke
            via{" "}
            <a
              href="https://www.rofus.nu/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              ROFUS
            </a>{" "}
            eller kontakte{" "}
            <a
              href="https://www.stopspillet.dk/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              StopSpillet
            </a>
            . Læs mere om{" "}
            <Link to="/responsible-gaming" className={linkClass}>
              ansvarligt spil
            </Link>{" "}
            på vores dedikerede side.
          </p>
        </section>

        <Separator className="my-10" />

        <CommunityPromoSection />

        <Separator className="my-10" />

        <RelatedGuides currentPath="/casinospil" />

        {/* FAQ */}
        <FAQSection title="Ofte stillede spørgsmål om casinospil" faqs={casinospilFaqs} />
      </div>
    </>
  );
};

export default Casinospil;
