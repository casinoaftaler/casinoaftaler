import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import spiludviklereHero from "@/assets/heroes/spiludviklere-hero.jpg";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import netentLogo from "@/assets/providers/netent.png";
import pragmaticPlayLogo from "@/assets/providers/pragmatic-play.png";
import evolutionGamingLogo from "@/assets/providers/evolution-gaming.png";
import relaxGamingLogo from "@/assets/providers/relax-gaming.png";
import playNGoLogo from "@/assets/providers/play-n-go.png";
import hacksawGamingLogo from "@/assets/providers/hacksaw-gaming.png";
import nolimitCityLogo from "@/assets/providers/nolimit-city.png";
import elkStudiosLogo from "@/assets/providers/elk-studios.png";
import yggdrasilLogo from "@/assets/providers/yggdrasil.png";
import microgamingLogo from "@/assets/providers/microgaming.png";
import redTigerLogo from "@/assets/providers/red-tiger.png";
import bigTimeGamingLogo from "@/assets/providers/big-time-gaming.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShieldCheck,
  Zap,
  Gamepad2,
  Award,
  CheckCircle2,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Star,
  Tv,
  Dice5,
  Layers,
  User,
  CalendarDays,
  BookOpen,
} from "lucide-react";

// FAQs are now JSX inside the component for internal links

const gameTypes = [
  {
    category: "Spilleautomater",
    icon: Gamepad2,
    description:
      "Spilleautomater er fundamentet i enhver online casinooplevelse. De spænder fra enkle 3-hjuls klassikere til avancerede video slots med unikke funktioner som Megaways og cascading reels.",
    types: [
      {
        type: "Klassiske slots",
        description: "Simple 3-hjuls spil med få funktioner",
        examples: "Fire Joker, Mystery Joker",
        rtp: "96-97%",
      },
      {
        type: "Video slots",
        description: "Moderne slots med avanceret grafik og temaer",
        examples: "Starburst, Book of Dead",
        rtp: "94-96%",
      },
      {
        type: "Progressive jackpots",
        description: "Spil med puljer, der vokser til en spiller vinder",
        examples: "Mega Moolah, Hall of Gods",
        rtp: "88-92%",
      },
    ],
  },
  {
    category: "Bordspil",
    icon: Dice5,
    description:
      "Bordspil kombinerer strategi og held, og byder på alt fra roulette og blackjack til baccarat. Online versioner leverer realistisk grafik og smidigt gameplay.",
    types: [
      {
        type: "Roulette",
        description: "Drejningens spænding med mange indsatsmuligheder",
        examples: "Europæisk, Fransk, Amerikansk",
        rtp: "94-98%",
      },
      {
        type: "Blackjack",
        description: "Strategisk spil mod dealeren",
        examples: "Klassisk, Double Exposure, Speed",
        rtp: "~99%",
      },
      {
        type: "Baccarat",
        description: "Enkelt spil med store satsmuligheder",
        examples: "Klassisk, Punto Banco",
        rtp: "98-99%",
      },
    ],
  },
  {
    category: "Live Casino",
    icon: Tv,
    description:
      "Live casino bringer den autentiske casinooplevelse direkte til din skærm med professionelle dealere og avanceret livestreaming-teknologi.",
    types: [
      {
        type: "Live roulette",
        description: "Interaktiv roulette med professionelle dealere",
        examples: "Lightning Roulette",
        rtp: "94-97%",
      },
      {
        type: "Live blackjack",
        description: "Strategisk spil i realtid mod dealere",
        examples: "Infinite Blackjack",
        rtp: "~99%",
      },
      {
        type: "Game shows",
        description: "Unikke spil med højt underholdningsniveau",
        examples: "Crazy Time, Monopoly Live",
        rtp: "90-96%",
      },
    ],
  },
  {
    category: "Andre spiltyper",
    icon: Layers,
    description:
      "Udover de klassiske kategorier tilbyder udviklerne nichespil som videopoker, skrabelodder og interaktive game shows.",
    types: [
      {
        type: "Videopoker",
        description: "Kombination af poker og spilleautomater",
        examples: "Jacks or Better, Deuces Wild",
        rtp: "~98%",
      },
      {
        type: "Skrabelodder",
        description: "Hurtige gevinster med et enkelt klik",
        examples: "Diamond Strike Scratch",
        rtp: "~95%",
      },
      {
        type: "Game shows",
        description: "Interaktive spil fyldt med underholdning",
        examples: "Deal or No Deal",
        rtp: "90-94%",
      },
    ],
  },
];

const developers = [
  {
    name: "NetEnt",
    slug: "netent",
    logo: netentLogo,
    description:
      "NetEnt er en af de mest anerkendte spiludviklere i branchen og kendte for deres høje kvalitet og kreative tilgang.",
    games: [
      "Gonzo's Quest – Revolutionerede slots med cascading reels",
      "Starburst – Et simpelt, men utroligt populært slot",
      "Dead or Alive – Kendt for høje gevinster og western-tema",
    ],
    highlight: "Synonym med kvalitet og innovation inden for slots",
  },
  {
    name: "Pragmatic Play",
    slug: "pragmatic-play",
    logo: pragmaticPlayLogo,
    description:
      "Med en omfattende portefølje der spænder over slots, live casino og bingo, har Pragmatic Play etableret sig som en alsidig og pålidelig spiludvikler.",
    games: [
      "The Dog House Megaways – Underholdende slot med tusindvis af vinderkombinationer",
      "Sweet Bonanza – Farverigt slot med multiplikatorer",
      "Wolf Gold – Klassisk favorit med store jackpots",
    ],
    highlight: "Alsidig udvikler med fokus på spillerens behov",
  },
  {
    name: "Relax Gaming",
    slug: "relax-gaming",
    logo: relaxGamingLogo,
    description:
      "Som en af de nyere stjerner har Relax Gaming hurtigt gjort sig bemærket med deres kreative tilgang og unikke mekanikker.",
    games: [
      "Money Train 2 – Actionfyldt slot med massive gevinstmuligheder",
      "Temple Tumble Megaways – Tusindvis af vinderkombinationer",
      "Iron Bank – Sjov og dynamisk titel med stor variation",
    ],
    highlight: "Innovativ udvikler der konstant skubber til grænserne",
  },
  {
    name: "Play'n GO",
    slug: "play-n-go",
    logo: playNGoLogo,
    description:
      "Med en passion for innovation har Play'n GO leveret nogle af de mest populære spil til online casinoverdenen.",
    games: [
      "Book of Dead – Et af de mest populære slots med egyptisk tema",
      "Fire Joker – En klassiker med moderne twists",
      "Reactoonz – Et kaotisk og sjovt grid-slot",
    ],
    highlight: "Kreativitet kombineret med solide gevinster",
  },
  {
    name: "Hacksaw Gaming",
    slug: "hacksaw-gaming",
    logo: hacksawGamingLogo,
    description:
      "Hacksaw Gaming er kendt for deres innovative tilgang til slots og instant win-spil med enkle, men engagerende mekanikker.",
    games: [
      "Chaos Crew – Unikt slot med edgy, punk-inspireret stil",
      "Wanted Dead or a Wild – Western-slot med høj volatilitet",
      "Cubes 2 – Farverig og kreativ titel",
    ],
    highlight: "Frisk tilføjelse til branchen med fokus på originalitet",
  },
  {
    name: "Nolimit City",
    slug: "nolimit-city",
    logo: nolimitCityLogo,
    description:
      "Nolimit City er kendt for deres ekstreme volatilitet og unikke xWays- og xNudge-mekanikker, der giver helt nye spiloplevelser.",
    games: [
      "Mental – Kontroversielt slot med ekstrem volatilitet",
      "Tombstone RIP – Western-tema med massive gevinstmuligheder",
      "San Quentin – Banebrydende slot med xWays-mekanik",
    ],
    highlight: "Specialister i høj volatilitet og unikke mekanikker",
  },
  {
    name: "Yggdrasil",
    slug: "yggdrasil",
    logo: yggdrasilLogo,
    description:
      "Yggdrasil er en innovativ spiludvikler der kombinerer fantastisk grafik med spændende gameplay og unikke funktioner.",
    games: [
      "Vikings Go Berzerk – Actionfyldt viking-slot",
      "Valley of the Gods – Egyptisk eventyr med cluster pays",
      "Raptor DoubleMax – Dinosaur-tema med DoubleMax-mekanik",
    ],
    highlight: "Fantastisk grafik og innovative spilmekanikker",
  },
  {
    name: "Microgaming",
    slug: "microgaming",
    logo: microgamingLogo,
    description:
      "Microgaming er en pioner der var blandt de første til at lancere et online casino helt tilbage i 1994.",
    games: [
      "Mega Moolah – Progressiv jackpot der har skabt millionærer",
      "Immortal Romance – Dramatisk slot med bonusfunktioner",
      "Thunderstruck II – Populært spil med nordisk mytologi",
    ],
    highlight: "Banebrydende teknologi og konstant innovation",
  },
  {
    name: "Red Tiger",
    slug: "red-tiger",
    logo: redTigerLogo,
    description:
      "Red Tiger Gaming er kendt for deres daglige jackpots og visuelt imponerende spilleautomater med innovative bonusfunktioner.",
    games: [
      "Gonzo's Quest Megaways – Megaways-version af klassikeren",
      "Dragon's Luck – Asiatisk tema med mystery symbols",
      "Piggy Riches Megaways – Populær Megaways-variant",
    ],
    highlight: "Daglige jackpots og visuelt imponerende spil",
  },
  {
    name: "Big Time Gaming",
    slug: "big-time-gaming",
    logo: bigTimeGamingLogo,
    description:
      "Big Time Gaming er skaberne bag den banebrydende Megaways-mekanik, der har revolutioneret spilleautomatbranchen.",
    games: [
      "Bonanza Megaways – Den originale Megaways-slot",
      "Extra Chilli – Populært mexicansk-tema slot",
      "White Rabbit – Alice i Eventyrland med Megaways",
    ],
    highlight: "Opfindere af Megaways-mekanikken",
  },
  {
    name: "Evolution Gaming",
    slug: "evolution-gaming",
    logo: evolutionGamingLogo,
    description:
      "Evolution Gaming er verdens førende leverandør af live casino-spil med innovative game shows og professionelle dealere.",
    games: [
      "Crazy Time – Det ultimative live game show med 25.000x multiplikator",
      "Lightning Roulette – Roulette med op til 500x multiplikatorer",
      "MONOPOLY Live – Det ikoniske brætspil i live casino-format",
    ],
    highlight: "Absolut markedsleder inden for live casino",
  },
  {
    name: "ELK Studios",
    slug: "elk-studios",
    logo: elkStudiosLogo,
    description:
      "ELK Studios er en svensk spiludvikler med fokus på kvalitet frem for kvantitet og innovative mekanikker som Avalanche.",
    games: [
      "Wild Toro – Flagskibstitel med Walking Wilds",
      "Kaiju Payment – Innovativ slot med monster-tema",
      "Cygnus – Avalanche-slot med 262.144 vinderkombinationer",
    ],
    highlight: "Prisbelønnet kvalitet og innovativ spildesign",
  },
];

const Spiludviklere = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const spiludviklereFaqs = [
    {
      question: "Hvad gør en spiludvikler, og hvordan adskiller de sig fra casinooperatører?",
      answer: (
        <>
          En spiludvikler (også kaldet game provider eller studio) er virksomheden, der designer, programmerer og producerer selve casinospillene – fra spilleautomater og bordspil til{" "}
          <Link to="/live-casino" className="text-primary underline hover:text-primary/80">live casino</Link>-løsninger. Casinooperatøren driver derimod platformen, håndterer licenser, betalinger og kundeservice. Et moderne online casino samarbejder typisk med 20–40 forskellige spiludviklere for at tilbyde et bredt katalog. Udviklerne certificerer deres spil via uafhængige testlaboratorier (eCOGRA, iTech Labs, GLI) og licenserer dem via B2B-aftaler. De største udviklere som{" "}
          <Link to="/spiludviklere/netent" className="text-primary underline hover:text-primary/80">NetEnt</Link> og{" "}
          <Link to="/spiludviklere/pragmatic-play" className="text-primary underline hover:text-primary/80">Pragmatic Play</Link> har porteføljer med 200+ titler.
        </>
      ),
    },
    {
      question: "Hvad er RTP og hit frequency, og hvordan bruger jeg tallene til at vælge spil?",
      answer: (
        <>
          RTP (Return to Player) angiver den procentvise tilbagebetaling over millioner af spins – fx betyder 96 % RTP, at casinoet statistisk beholder 4 % af alle indsatser. Hit frequency angiver, hvor ofte et spin resulterer i en gevinst – typisk 20–35 % for moderne video slots. Høj RTP + høj hit frequency giver jævne sessioner (fx Starburst: 96,09 % RTP, ~23 % hit frequency). Høj RTP + lav hit frequency giver sjældne, men store gevinster (fx Book of Dead: 96,21 % RTP, ~18 % hit frequency). Disse tal er relevante, når du vælger spil til{" "}
          <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">bonusomsætning</Link> – høj hit frequency hjælper med at strække budgettet.
        </>
      ),
    },
    {
      question: "Hvilke innovative spilmekanikker har de største udviklere skabt?",
      answer: (
        <>
          De vigtigste innovationer inkluderer: Megaways (opfundet af{" "}
          <Link to="/spiludviklere/big-time-gaming" className="text-primary underline hover:text-primary/80">Big Time Gaming</Link>) med op til 117.649 dynamiske vinderkombinationer pr. spin. Cascading Reels/Avalanche (pioneeret af NetEnt i Gonzo's Quest) hvor vindende symboler forsvinder og erstattes af nye. xWays og xNudge fra{" "}
          <Link to="/spiludviklere/nolimit-city" className="text-primary underline hover:text-primary/80">Nolimit City</Link>, der udvider hjulene dynamisk. Cluster Pays (Yggdrasil) der belønner grupper frem for linjer. Tumble-mekanik fra{" "}
          <Link to="/spiludviklere/pragmatic-play" className="text-primary underline hover:text-primary/80">Pragmatic Play</Link> (Sweet Bonanza). Disse mekanikker har fundamentalt ændret, hvordan moderne slots fungerer.
        </>
      ),
    },
    {
      question: "Er spil fra alle udviklere fair, og hvem kontrollerer tilfældigheden?",
      answer:
        "Kun spil fra licenserede udviklere garanterer fairness. Alle spil hos danske casinoer bruger certificerede Random Number Generators (RNG), der testes regelmæssigt af uafhængige laboratorier som eCOGRA, iTech Labs og GLI (Gaming Laboratories International). Disse testorganisationer verificerer, at hvert spin er statistisk uafhængigt, at den offentliggjorte RTP er korrekt, og at bonusfunktioner aktiveres med den annoncerede frekvens. Spillemyndigheden kræver desuden, at alle spil på danske licenserede casinoer har gennemgået teknisk certificering. Resultatet er, at du kan stole på, at et spil med 96 % RTP faktisk betaler 96 % tilbage over tid – hverken casinoet eller udvikleren kan manipulere individuelle spins.",
    },
    {
      question: "Hvordan påvirker valget af spiludvikler min casinooplevelse?",
      answer: (
        <>
          Valget af udviklere definerer din oplevelse markant. Hvis du foretrækker stabile sessioner med jævne gevinster, er{" "}
          <Link to="/spiludviklere/netent" className="text-primary underline hover:text-primary/80">NetEnt</Link> og{" "}
          <Link to="/spiludviklere/play-n-go" className="text-primary underline hover:text-primary/80">Play'n GO</Link> ideelle med overvejende medium-volatilitet. For adrenalin og potentielt massive gevinster er{" "}
          <Link to="/spiludviklere/nolimit-city" className="text-primary underline hover:text-primary/80">Nolimit City</Link> og{" "}
          <Link to="/spiludviklere/hacksaw-gaming" className="text-primary underline hover:text-primary/80">Hacksaw Gaming</Link> specialister i høj-volatilitet. For{" "}
          <Link to="/live-casino" className="text-primary underline hover:text-primary/80">live casino</Link> er{" "}
          <Link to="/spiludviklere/evolution-gaming" className="text-primary underline hover:text-primary/80">Evolution Gaming</Link> ubestridt markedsleder. Et godt casino bør samarbejde med minimum 15 udviklere for at sikre bredde i spillestile.
        </>
      ),
    },
    {
      question: "Kan jeg spille alle udvikleres spil på mobilen, og er oplevelsen den samme?",
      answer: (
        <>
          Stort set alle moderne spiludviklere udvikler med HTML5-teknologi, der sikrer fuld kompatibilitet på tværs af desktop, tablet og smartphone. Mobiloplevelsen er i mange tilfælde bedre end desktop, da spil som Sweet Bonanza og Book of Dead er designet med touch-interaktion i tankerne. Nogle ældre titler fra{" "}
          <Link to="/spiludviklere/microgaming" className="text-primary underline hover:text-primary/80">Microgaming</Link> og NetEnt har tilpassede mobilversioner med forenklede menuer. Live casino fungerer også fejlfrit på mobil med automatisk videokvalitetsjustering. Du kan indbetale direkte via mobilvennlige metoder som{" "}
          <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link> og{" "}
          <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">Apple Pay</Link>.
        </>
      ),
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Hvad er en spiludvikler?", acceptedAnswer: { "@type": "Answer", text: "En spiludvikler er en virksomhed, der designer og producerer casinospil som spilleautomater, bordspil og live casino. De står bag grafik, funktioner og mekanik, der gør spillene underholdende og retfærdige." } },
      { "@type": "Question", name: "Hvad betyder RTP?", acceptedAnswer: { "@type": "Answer", text: "RTP (Return to Player) angiver, hvor stor en procentdel af de samlede indsatser et spil teoretisk betaler tilbage til spillerne over tid. En højere RTP betyder bedre langsigtede chancer for spilleren." } },
      { "@type": "Question", name: "Hvordan vælger jeg en god spiludvikler?", acceptedAnswer: { "@type": "Answer", text: "Vælg casinoer, der samarbejder med licenserede udviklere som NetEnt, Microgaming eller Play'n GO. De leverer spil af høj kvalitet med fair gameplay." } },
      { "@type": "Question", name: "Hvad er forskellen på slots og live casino?", acceptedAnswer: { "@type": "Answer", text: "Spilleautomater er maskinbaserede spil med temaer og bonusfunktioner, mens live casino involverer rigtige dealere via livestreaming i realtid." } },
      { "@type": "Question", name: "Er spil fra alle udviklere fair?", acceptedAnswer: { "@type": "Answer", text: "Kun spil fra licenserede udviklere garanterer fairness. De anvender RNG-teknologi og testes løbende af uafhængige testbureauer som eCOGRA." } },
      { "@type": "Question", name: "Kan jeg spille på mobilen?", acceptedAnswer: { "@type": "Answer", text: "Ja, stort set alle moderne spiludviklere optimerer deres spil til både desktop og mobil, så du kan nyde dine favoritspil uanset enhed." } },
    ],
  };

  return (
    <>
      <SEO
        title="Spiludviklere – De Bedste Casino-Spiludviklere i Danmark 2026 | Casinoaftaler"
        description="Lær alt om de største spiludviklere i casinobranchen. Fra NetEnt og Microgaming til Play'n GO – find ud af hvem der skaber dine favoritspil."
        jsonLd={faqJsonLd}
      />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Gamepad2 className="mr-1.5 h-3.5 w-3.5" />
              Guide til spiludviklere
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Spiludviklere
            </h1>
            <p className="text-lg text-white/80">
              Bag ethvert fantastisk casinospil står en spiludvikler med passion
              for innovation, teknologi og underholdning. Lær de største navne
              at kende, og find ud af hvem der skaber dine favoritspil.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="11-02-2026" readTime="15 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={spiludviklereHero} alt="Spiludviklere – game studio med slot-spil på skærme" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvad er en spiludvikler?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spiludviklere er drivkraften bag casinoverdenen – de kreative
            hoveder der forvandler idéer til digitale spiloplevelser. Deres
            arbejde strækker sig langt ud over at bygge et simpelt spil.
            De designer hele oplevelsen fra bunden: skarpe visuelle
            detaljer, fængslende lydeffekter, innovative funktioner og
            glidende gameplay, der tilsammen skaber noget unikt og
            engagerende. Spiludviklerne er også afgørende for, hvilke{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
            og{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>{" "}
            casinoerne kan tilbyde, da det ofte er specifikke spil, der indgår i bonustilbud.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Processen begynder med en idé – måske inspireret af
            oldægyptisk mytologi, science fiction eller klassisk
            casinoæstetik. Derefter arbejder designere, programmører og
            lydproducenter tæt sammen. Programmørerne bygger spillets
            fundament med avanceret teknologi som RNG (Random Number
            Generator) for at sikre fuldstændig fairness, mens
            lyddesignere tilfører den stemning, der suger spilleren ind i
            universet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Spiludviklere er med andre ord ikke bare tekniske eksperter –
            de er kunstnere og historiefortællere, der gør hvert eneste
            spin til noget særligt. Når du spiller med en{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonus</Link>{" "}
            eller{" "}
            <Link to="/bonus-uden-indbetaling" className="text-primary underline hover:text-primary/80">bonus uden indbetaling</Link>,
            er det spiludviklernes spil, du nyder godt af.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Why Important */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvorfor er spiludvikleren vigtig?
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Når du spinner hjulene eller satser på det rigtige nummer, tænker
            du måske ikke over, hvem der står bag oplevelsen. Men
            spiludvikleren er en afgørende brik, der bestemmer om spillet er
            underholdende, retfærdigt og teknisk problemfrit. Kendte udviklere
            som <Link to="/spiludviklere/netent" className="text-primary underline hover:text-primary/80">NetEnt</Link>, <Link to="/spiludviklere/play-n-go" className="text-primary underline hover:text-primary/80">Play'n GO</Link> og <Link to="/spiludviklere/microgaming" className="text-primary underline hover:text-primary/80">Microgaming</Link> er garanti for kvalitet og
            tryghed. Valget af spiludvikler påvirker også, hvordan{" "}
            <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link>{" "}
            opfyldes, da forskellige spiltyper bidrager forskelligt.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Fairness og sikkerhed
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Fairness er rygraden i ethvert vellykket casinospil. Udviklerne
                  implementerer avanceret RNG-teknologi, der sikrer at hvert spin
                  eller korttræk er 100% tilfældigt. Certificeringer fra
                  myndigheder som Malta Gaming Authority (MGA) og UK Gambling
                  Commission (UKGC) kræver løbende overvågning og test af
                  uafhængige bureauer som eCOGRA.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-primary" />
                  Innovation og underholdning
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  De bedste udviklere hæver konstant barren med nye funktioner.
                  Megaways-mekanikken revolutionerede slots med op til
                  hundredtusindvis af vinderkombinationer. Cascading reels skaber
                  kædereaktioner af gevinster. Det er denne kreativitet, der
                  adskiller de bedste udviklere fra mængden.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Game Types */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Typer af spil fra spiludviklere
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Spiludviklere skaber et bredt udvalg af spil der appellerer til
            alle typer spillere. Fra klassiske slots til avancerede{" "}
            <Link to="/live-casino" className="text-primary underline hover:text-primary/80">live casino</Link>-oplevelser
            – hver kategori bringer noget unikt til bordet. Mange af disse spil
            indgår i{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>-tilbud
            og{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>.
          </p>

          <div className="space-y-6">
            {gameTypes.map((category) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <category.icon className="h-5 w-5 text-primary" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left">
                          <th className="pb-2 pr-4 font-semibold">Type</th>
                          <th className="pb-2 pr-4 font-semibold">Beskrivelse</th>
                          <th className="pb-2 pr-4 font-semibold">Eksempler</th>
                          <th className="pb-2 font-semibold">Gns. RTP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.types.map((type) => (
                          <tr
                            key={type.type}
                            className="border-b border-border/50 last:border-0"
                          >
                            <td className="py-2 pr-4 font-medium">{type.type}</td>
                            <td className="py-2 pr-4 text-muted-foreground">{type.description}</td>
                            <td className="py-2 pr-4 text-muted-foreground">{type.examples}</td>
                            <td className="py-2">
                              <Badge variant="secondary">{type.rtp}</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <InlineCasinoCards title="Casinoer med de bedste spiludviklere" />

        <Separator className="my-10" />

        {/* Known Developers */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Kendte spiludviklere i branchen
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            De største navne i branchen har ikke kun givet os ikoniske spil,
            men også revolutioneret måden vi spiller på. Her er et overblik
            over de mest anerkendte spiludviklere og deres bedste titler.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {developers.map((dev) => (
              <Card key={dev.name} className="group relative">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Star className="h-5 w-5 text-primary" />
                      {dev.name}
                    </CardTitle>
                    <img
                      src={dev.logo}
                      alt={`${dev.name} logo`}
                      className="h-10 w-auto max-w-[100px] rounded object-contain md:h-12"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {dev.description}
                  </p>
                  <div>
                    <p className="mb-1 text-sm font-semibold">
                      Populære titler:
                    </p>
                    <ul className="space-y-1">
                      {dev.games.map((game, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                          {game}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline" className="text-xs">
                      {dev.highlight}
                    </Badge>
                    <Link
                      to={`/spiludviklere/${dev.slug}`}
                      className="text-sm font-medium text-primary underline hover:text-primary/80"
                    >
                      Læs mere →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* How to Choose */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvordan vælger du den rigtige spiludvikler?
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Valget af spiludvikler kan gøre en stor forskel for din oplevelse.
            En god spiludvikler betyder ikke kun spil af høj kvalitet, men
            også retfærdighed, sikkerhed og spændende funktioner. Tjek også
            vores guide til{" "}
            <Link to="/betalingsmetoder" className="text-primary underline hover:text-primary/80">betalingsmetoder</Link>{" "}
            for at sikre du bruger den bedste løsning til ind- og udbetalinger.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Licenser og certificeringer
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Vælg udviklere med licens fra anerkendte myndigheder som MGA
                eller UKGC. Licenserede udviklere anvender RNG-teknologi og
                testes løbende af uafhængige bureauer som eCOGRA og iTech Labs.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Gamepad2 className="h-4 w-4 text-primary" />
                  Spiludvalg
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                De bedste udviklere tilbyder noget for enhver smag. Kig efter
                udviklere som <Link to="/spiludviklere/play-n-go" className="text-primary underline hover:text-primary/80">Play'n GO</Link> og <Link to="/spiludviklere/netent" className="text-primary underline hover:text-primary/80">NetEnt</Link> for slots, eller Evolution
                Gaming for autentiske live casino-oplevelser.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Zap className="h-4 w-4 text-primary" />
                  Bonusfunktioner og teknologi
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Moderne spil handler om funktionerne. Megaways-mekanikken,
                cascading reels og live casino med VR-understøttelse skaber
                fordybende oplevelser der går langt ud over det traditionelle.
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Pros and Cons */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Fordele og ulemper ved spiludviklere
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-primary">
                  <ThumbsUp className="h-5 w-5" />
                  Fordele
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>
                      <strong>Innovation</strong> – Unikke funktioner som
                      Megaways og cascading reels gør spillene mere spændende
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>
                      <strong>Fairness</strong> – Licenserede udviklere sikrer
                      retfærdige og regulerede spil
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>
                      <strong>Variation</strong> – Alt fra klassiske slots til
                      live casino – der er noget for enhver smag
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                  <ThumbsDown className="h-5 w-5" />
                  Ulemper
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    <span>
                      <strong>RTP-variationer</strong> – Samme spil kan have
                      forskellige udbetalingsprocenter afhængigt af casinoet
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    <span>
                      <strong>Ensartede spil</strong> – Nogle udviklere
                      producerer mange titler med lignende temaer og funktioner
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    <span>
                      <strong>Høj volatilitet</strong> – Spillere med lavere
                      budgetter kan føle sig overset
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Responsible Gaming */}
        <section className="mb-12">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Award className="h-5 w-5 text-primary" />
                Ansvarligt spil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Spil handler om underholdning og spænding – men det skal altid
                ske med omtanke. Ansvarligt spil betyder, at du holder kontrol
                over din spiloplevelse og sørger for, at det aldrig bliver en
                byrde for dig selv eller din økonomi.
              </p>
              <p>
                De bedste casinoer og spiludviklere støtter ansvarligt spil
                ved at tilbyde værktøjer som indbetalingsgrænser,
                selvudelukkelse og spilpauser. Hjælpen er altid lige ved
                hånden gennem organisationer som StopSpillet og ROFUS.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Summary */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Opsummering
          </h2>
          <div className="space-y-3">
            {[
              {
                title: "Spiludviklere er kernen",
                desc: "De skaber fundamentet for online casinooplevelsen med innovation og kreativitet.",
              },
              {
                title: "Kendte navne sikrer kvalitet",
                desc: "NetEnt, Microgaming, Play'n GO og andre topudviklere garanterer spil af højeste kvalitet.",

              },
              {
                title: "Licenserede udviklere",
                desc: "Regulerede udviklere sikrer fairness med RNG-teknologi og uafhængig testning.",
              },
              {
                title: "Bredt spiludvalg",
                desc: "Fra klassiske slots og bordspil til live casino og game shows – der er noget for enhver smag.",
              },
              {
                title: "Moderne funktioner",
                desc: "Megaways, cascading reels og VR-teknologi øger underholdningen markant.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath="/spiludviklere" />

        {/* FAQ */}
        <FAQSection title="Ofte stillede spørgsmål om spiludviklere" faqs={spiludviklereFaqs} />
      </div>
    </>
  );
};

export default Spiludviklere;
