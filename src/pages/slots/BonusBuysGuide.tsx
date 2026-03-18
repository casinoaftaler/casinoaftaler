import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { SlotProviderLink } from "@/components/SlotProviderLink";
import { type ReactNode, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/heroes/bonus-buys-hero.jpg";
import imgSweetBonanza from "@/assets/heroes/sweet-bonanza-hero.jpg";
import imgGatesOfOlympus from "@/assets/heroes/gates-of-olympus-hero.jpg";
import imgWantedDeadOrAWild from "@/assets/heroes/wanted-dead-or-a-wild-hero.jpg";
import imgBigBassBonanza from "@/assets/heroes/big-bass-bonanza-hero.jpg";
import imgMadameDestiny from "@/assets/heroes/madame-destiny-megaways-hero.jpg";
import imgExtraChilli from "@/assets/heroes/extra-chilli-megaways-hero.jpg";
import imgChaosCrew from "@/assets/heroes/chaos-crew-hero.jpg";
import imgBuffaloKing from "@/assets/heroes/buffalo-king-hero.jpg";
import imgSugarRush from "@/assets/heroes/sugar-rush-hero.jpg";
import imgWildWestGold from "@/assets/heroes/wild-west-gold-hero.jpg";
import imgMoneyTrain3 from "@/assets/heroes/money-train-3-hero.jpg";
import imgRazorShark from "@/assets/heroes/razor-shark-hero.jpg";
import imgJamminJars from "@/assets/heroes/jammin-jars-hero.jpg";
import imgDeadOrAlive2 from "@/assets/heroes/dead-or-alive-2-hero.jpg";
import {
  ShoppingCart, TrendingUp, Target, Shield, Zap, BarChart3,
  Calculator, Flame, Scale, AlertTriangle, Trophy, DollarSign,
  Clock, BookOpen, Percent, ArrowRight, Ban, Coins, ChevronLeft, ChevronRight
} from "lucide-react";

const SLOT_DATA = [
  { to: "/casinospil/spillemaskiner/sweet-bonanza", name: "Sweet Bonanza", provider: "Pragmatic Play", rtp: "96,51 %", volatility: "Meget høj", maxWin: "21.175x", img: imgSweetBonanza },
  { to: "/casinospil/spillemaskiner/gates-of-olympus", name: "Gates of Olympus", provider: "Pragmatic Play", rtp: "96,50 %", volatility: "Meget høj", maxWin: "5.000x", img: imgGatesOfOlympus },
  { to: "/casinospil/spillemaskiner/wanted-dead-or-a-wild", name: "Wanted Dead or a Wild", provider: "Hacksaw Gaming", rtp: "96,38 %", volatility: "Ekstrem", maxWin: "12.500x", img: imgWantedDeadOrAWild },
  { to: "/casinospil/spillemaskiner/big-bass-bonanza", name: "Big Bass Bonanza", provider: "Pragmatic Play", rtp: "96,71 %", volatility: "Høj", maxWin: "2.100x", img: imgBigBassBonanza },
  { to: "/casinospil/spillemaskiner/madame-destiny-megaways", name: "Madame Destiny Megaways", provider: "Pragmatic Play", rtp: "96,58 %", volatility: "Høj", maxWin: "5.000x", img: imgMadameDestiny },
  { to: "/casinospil/spillemaskiner/extra-chilli-megaways", name: "Extra Chilli Megaways", provider: "Big Time Gaming", rtp: "96,20 %", volatility: "Ekstrem", maxWin: "50.000x", img: imgExtraChilli },
  { to: "/casinospil/spillemaskiner/chaos-crew", name: "Chaos Crew", provider: "Hacksaw Gaming", rtp: "96,32 %", volatility: "Høj", maxWin: "10.000x", img: imgChaosCrew },
  { to: "/casinospil/spillemaskiner/buffalo-king", name: "Buffalo King", provider: "Pragmatic Play", rtp: "96,06 %", volatility: "Høj", maxWin: "93.750x", img: imgBuffaloKing },
  { to: "/casinospil/spillemaskiner/sugar-rush", name: "Sugar Rush", provider: "Pragmatic Play", rtp: "96,50 %", volatility: "Høj", maxWin: "5.000x", img: imgSugarRush },
  { to: "/casinospil/spillemaskiner/wild-west-gold", name: "Wild West Gold", provider: "Pragmatic Play", rtp: "96,51 %", volatility: "Høj", maxWin: "10.000x", img: imgWildWestGold },
  { to: "/casinospil/spillemaskiner/money-train-3", name: "Money Train 3", provider: "Relax Gaming", rtp: "96,30 %", volatility: "Ekstrem", maxWin: "100.000x", img: imgMoneyTrain3 },
  { to: "/casinospil/spillemaskiner/razor-shark", name: "Razor Shark", provider: "Push Gaming", rtp: "96,70 %", volatility: "Høj", maxWin: "50.000x", img: imgRazorShark },
  { to: "/casinospil/spillemaskiner/jammin-jars", name: "Jammin' Jars", provider: "Push Gaming", rtp: "96,83 %", volatility: "Høj", maxWin: "20.000x", img: imgJamminJars },
  { to: "/casinospil/spillemaskiner/dead-or-alive-2", name: "Dead or Alive 2", provider: "NetEnt", rtp: "96,82 %", volatility: "Ekstrem", maxWin: "100.000x", img: imgDeadOrAlive2 },
];
// Chunk into pages of 9 (3 rows × 3 cols)
const PAGE_SIZE = 9;

function SlotCarousel() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(SLOT_DATA.length / PAGE_SIZE);
  const pageSlots = SLOT_DATA.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div>
      {/* Grid: 3 columns × 3 rows */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {pageSlots.map((slot) => (
          <Card key={slot.to} className="overflow-hidden flex flex-col">
            <div className="h-36 overflow-hidden flex-shrink-0">
              <img src={slot.img} alt={slot.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <CardContent className="pt-3 pb-0 flex-1">
              <div className="mb-2">
                <p className="font-bold text-sm leading-tight">{slot.name}</p>
                <p className="text-xs text-muted-foreground">{slot.provider}</p>
              </div>
              <div className="grid grid-cols-3 gap-1 mb-2 text-center border-t border-border pt-2">
                <div>
                  <p className="text-[10px] text-muted-foreground">Volatilitet</p>
                  <p className="text-[10px] font-semibold leading-tight">{slot.volatility}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">RTP</p>
                  <p className="text-[10px] font-semibold">{slot.rtp}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Maks.</p>
                  <p className="text-[10px] font-semibold">{slot.maxWin}</p>
                </div>
              </div>
            </CardContent>
            <div className="px-3 pb-3 space-y-1.5">
              <a
                href="https://campobetdk.wermifal.com/?mid=311340_1840935"
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="flex items-center justify-center gap-1 w-full rounded-md bg-primary py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Spil her <ArrowRight className="h-3 w-3" />
              </a>
              <Link
                to={slot.to}
                className="flex items-center justify-center w-full rounded-md border border-border py-2 text-xs font-medium transition-colors hover:bg-accent"
              >
                Se anmeldelse
              </Link>
              <p className="text-center text-[9px] text-muted-foreground leading-tight">
                18+ |{" "}
                <a href="https://www.rofus.nu" target="_blank" rel="noopener noreferrer" className="underline">Rofus.nu</a>
                {" "}|{" "}
                <a href="https://www.stopspillet.dk" target="_blank" rel="noopener noreferrer" className="underline">StopSpillet</a>
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Navigation: arrows + page dots */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="flex items-center justify-center h-9 w-9 rounded-full border border-border transition-colors hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Forrige side"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === page
                  ? "w-6 bg-primary"
                  : "w-2 bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Side ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          className="flex items-center justify-center h-9 w-9 rounded-full border border-border transition-colors hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Næste side"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        {page + 1} / {totalPages} — {SLOT_DATA.length} slots med bonus buy
      </p>
    </div>
  );
}

const linkClass = "text-primary underline hover:text-primary/80";

const bonusBuyFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er en bonus buy i en spillemaskine?",
    answer: (
      <>
        En bonus buy (også kaldet "buy feature" eller "feature buy") er en funktion i visse spillemaskiner, der lader dig købe direkte adgang til bonusrunden – typisk free spins – i stedet for at vente på, at du trigger den naturligt via scatter-symboler. Prisen ligger normalt mellem 50x og 200x din indsats. Funktionen er tilgængelig på mange populære slots fra udbydere som <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> og <Link to="/spiludviklere/hacksaw-gaming" className={linkClass}>Hacksaw Gaming</Link>.
      </>
    ),
  },
  {
    question: "Er bonus buy lovligt i Danmark?",
    answer: (
      <>
        Ja, bonus buy er lovligt på <Link to="/casino-licenser" className={linkClass}>licenserede danske casinoer</Link> under Spillemyndighedens regulering. I modsætning til UK, hvor FCA og UKGC har forbudt buy features, tillader den danske lovgivning denne funktion. Dog bør du være opmærksom på, at det er en høj-varians mekanik, og du bør altid overholde dine bankroll-grænser. Sørg for at spille på et casino med gyldig dansk licens.
      </>
    ),
  },
  {
    question: "Er det matematisk fordelagtigt at købe bonus?",
    answer: "Nej, matematisk set er bonus buy sjældent fordelagtigt. RTP for buy-feature er typisk 1–3 procentpoint lavere end spillets standard-RTP. For eksempel kan en slot med 96,50 % standard-RTP have en buy-feature-RTP på kun 93,5–95 %. Årsagen er, at udbyderen bygger en margin ind i buy-prisen for at kompensere for den eliminerede ventetid. Over mange køb vil du statistisk tabe mere end ved normal spinning.",
  },
  {
    question: "Hvad koster det typisk at købe en bonus?",
    answer: "Prisen for en bonus buy varierer mellem 50x og 250x din indsats, afhængig af spillemaskinen og bonusrundens potentiale. Slots med højere max win og mere volatile bonusrunder har typisk dyrere buy-priser. Sweet Bonanza koster 100x, Gates of Olympus koster 100x, mens Wanted Dead or a Wild koster op til 250x for den mest volatile variant.",
  },
  {
    question: "Hvilke slots har de bedste bonus buy-funktioner?",
    answer: (
      <>
        Nogle af de mest populære slots med bonus buy inkluderer <Link to="/casinospil/spillemaskiner/sweet-bonanza" className={linkClass}>Sweet Bonanza</Link> (100x, Tumble + multiplikatorer), <Link to="/casinospil/spillemaskiner/gates-of-olympus" className={linkClass}>Gates of Olympus</Link> (100x, faldende multiplikatorer), <Link to="/casinospil/spillemaskiner/wanted-dead-or-a-wild" className={linkClass}>Wanted Dead or a Wild</Link> (op til 250x, duel-feature) og <Link to="/casinospil/spillemaskiner/chaos-crew" className={linkClass}>Chaos Crew</Link> (80x, unikke Wild-mekanikker). Valget afhænger af din risikoappetit og foretrukne volatilitetsniveau.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på bonus buy og free spins?",
    answer: "Bonus buy giver dig øjeblikkelig adgang til bonusrunden mod betaling, mens free spins er en bonusrunde du trigger gratis ved at lande tilstrækkeligt mange scatter-symboler (typisk 3–6). Resultaterne i selve bonusrunden kan være identiske, men vejen dertil er forskellig. Ved naturlig trigger sparer du buy-prisen, men investerer potentielt hundredvis af spins (og dermed penge) i at vente. Matematisk favoriserer naturlig trigger ofte spilleren minimalt.",
  },
  {
    question: "Kan jeg bruge en casino-bonus til at købe bonus buys?",
    answer: (
      <>
        Det afhænger af casinoets bonusvilkår. Mange <Link to="/casino-bonus" className={linkClass}>casino bonusser</Link> tillader bonus buys, men nogle har specifikke restriktioner. Visse casinoer begrænser din maksimale indsats under bonusomsætning (f.eks. 50 kr. pr. spin), hvilket effektivt forhindrer bonus buy ved højere indsatsniveauer. Læs altid vilkårene, og vær særligt opmærksom på regler om "feature buy" eller "buy bonus" i bonusbetingelserne.
      </>
    ),
  },
  {
    question: "Hvornår bør man undgå at købe bonus?",
    answer: "Du bør undgå bonus buy, når dit bankroll er begrænset (tommelfingerreglen er minimum 30–50 buy-priser), når du spiller med bonuspenge med lave indsatsbegrænsninger, når du jagter tab (tilt), eller når slottens buy-RTP er markant lavere end standard-RTP. Bonus buy er en underholdningsmekanik, ikke en strategi til profit. Hvis du har svært ved at kontrollere dit forbrug, bør du helt undgå buy features.",
  },
];

const BonusBuysGuide = () => {
  const faqJsonLd = buildFaqSchema(bonusBuyFaqs);
  const articleSchema = buildArticleSchema({
    headline: "Bonus Buys – Guide, Matematik & Bedste Slots",
    description: "Komplet guide til bonus buy i spillemaskiner. Lær matematikken bag buy feature, sammenlign RTP, og find de bedste slots med bonus buy i Danmark.",
    url: `${SITE_URL}/casinospil/spillemaskiner/bonus-buys`,
    datePublished: "2026-02-19",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  // BreadcrumbList is auto-generated by SEO.tsx via buildBreadcrumbListSchema() – no manual injection needed.

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Sådan bruger du bonus buy i spillemaskiner",
    description: "Step-by-step guide til at forstå og anvende bonus buy-funktionen i online slots.",
    step: [
      { "@type": "HowToStep", position: 1, name: "Vælg en slot med bonus buy", text: "Find en spillemaskine der tilbyder buy feature – kig efter et 'Buy Bonus' eller 'Feature Buy' knap i spillets interface." },
      { "@type": "HowToStep", position: 2, name: "Tjek prisen og RTP", text: "Undersøg buy-prisen (typisk 50x–200x din indsats) og sammenlign buy-feature RTP med standard-RTP i spillets info-menu." },
      { "@type": "HowToStep", position: 3, name: "Vurder dit bankroll", text: "Sørg for at dit bankroll kan bære mindst 30–50 buy-priser for at absorbere den høje varians." },
      { "@type": "HowToStep", position: 4, name: "Køb bonussen", text: "Klik på Buy Bonus-knappen, bekræft købet, og bonusrunden starter øjeblikkeligt med tilfældige modifikatorer." },
      { "@type": "HowToStep", position: 5, name: "Evaluér resultatet", text: "Vurder dit resultat i forhold til buy-prisen. Husk at de fleste bonusrunder returnerer under buy-prisen – store gevinster er sjældne men mulige." },
    ],
  };

  return (
    <>
      <SEO
        title="Bonus Buys – Guide, Matematik & Bedste Slots"
        description="Komplet guide til bonus buy i spillemaskiner. Lær matematikken bag buy feature, sammenlign RTP, og find de bedste slots med bonus buy."
        jsonLd={[articleSchema, faqJsonLd, howToJsonLd]}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><ShoppingCart className="mr-1.5 h-3.5 w-3.5" /> Spillemaskine-mekanik</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Bonus Buys – Guide, Matematik & Strategi</h1>
            <p className="text-lg text-white/80">Hvad betaler du reelt for genvej til bonusrunden? En matematisk analyse af buy features i moderne spillemaskiner.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="19-02-2026" readTime="22 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} width="1920" height="1080" className="w-full h-auto object-cover max-h-[400px]" alt="Bonus buy guide til spillemaskiner" loading="eager" />
        </div>

        {/* H2: Hvad er Bonus Buys? */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <ShoppingCart className="h-7 w-7 text-primary" />
            Hvad er Bonus Buys?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            En bonus buy – også kaldet "buy feature", "feature buy" eller "køb bonus" – er en mekanik i moderne spillemaskiner, der giver dig mulighed for at betale en fast pris for øjeblikkelig adgang til spillets bonusrunde. I stedet for at vente på, at du naturligt lander tilstrækkeligt mange scatter-symboler (typisk 3, 4 eller flere), kan du med ét klik aktivere free spins, pick-and-click bonusser eller andre special-features.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Konceptet blev populært i midten af 2010'erne, primært drevet af <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> og <Link to="/spiludviklere/hacksaw-gaming" className={linkClass}>Hacksaw Gaming</Link>, som indså, at mange spillere ønskede hurtigere adgang til de mest spændende dele af spillet. I dag tilbyder stort set alle større spiludviklere buy-feature på mindst en del af deres katalog.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Prisen for en bonus buy er typisk udtrykt som en multiplikator af din aktuelle indsats – for eksempel "100x bet". Hvis du spiller med en indsats på 10 kr., koster bonus buy dermed 1.000 kr. Prisen varierer markant mellem forskellige slots: fra så lavt som 50x på lavvolatile spil til over 250x på ultrahøjvolatile maskiner med enormt gevinstpotentiale.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det er vigtigt at forstå, at bonus buy ikke ændrer selve bonusrundens mekanik. Symboler, multiplikatorer, og gevinstpotentiale er identisk med den bonusrunde, du ville have fået ved naturlig trigger. Det eneste, der ændres, er adgangsmetoden – og den pris du betaler for den adgang. Denne skelnen er central for den matematiske analyse, vi gennemgår senere i guiden.
          </p>
          <Card className="border-primary/20 bg-primary/5 mb-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold mb-2">Hurtig definition</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    <strong>Bonus buy</strong> = Fast betaling (50x–250x indsats) for øjeblikkelig adgang til spillets bonusrunde. Eliminerer scatter-jagten, men ændrer <em>ikke</em> bonusrundens indhold eller mekanik. Matematisk betaler du en præmie for garanteret adgang til en usikker udbetaling.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            En grundlæggende forståelse af <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> og deres mekanikker er nyttig baggrundsviden, før du dykker ned i bonus buy-specifik matematik. Hvis du er ny inden for online slots, anbefaler vi at starte med vores overordnede spillemaskine-guide.
          </p>
        </section>

        {/* H2: Hvorfor tilbyder slots en Buy Feature? */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <DollarSign className="h-7 w-7 text-primary" />
            Hvorfor tilbyder slots en Buy Feature?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Fra spiludviklerens perspektiv er bonus buy en elegant løsning på et fundamentalt designproblem: spillere vil have action og store gevinster, men bonusrunder trigges statistisk sjældent. I en typisk høj-volatilitet slot trigges bonusrunden i gennemsnit hver 150.–300. spin. Ved en indsats på 5 kr. betyder det, at du potentielt skal investere 750–1.500 kr. i basespillet, før du oplever bonusrunden.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Buy-featuren fjerner denne friktion. Spillere, der vil have øjeblikkelig adgang til den mest spændende del af spillet, kan betale for det direkte. For udviklerens forretningsmodel er det win-win: spillerens spiloplevelse forbedres (mere action pr. tidsenhed), og casinoets omsætning stiger, fordi bonus buys typisk har en lavere <Link to="/ordbog/rtp" className={linkClass}>RTP</Link> end organisk spil.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Et andet perspektiv er streamingkulturen. Casino-streamere – som bruger timer foran kameraet – har behov for konstant action og spændende øjeblikke. Bonus buy giver dem mulighed for at levere dramatisk indhold uden lange perioder med gentagne basespins. Denne efterspørgsel fra streamingmiljøet har accelereret udbredelsen af buy features markant.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Endelig er der den psykologiske dimension. Bonus buy udnytter det menneskelige ønske om kontrol og øjeblikkelig tilfredsstillelse. I stedet for at vente passivt på tilfældighedens gunst, føler spilleren sig som en aktiv beslutningstager. Denne oplevelse af kontrol er selvfølgelig en illusion – bonusrundens udfald er stadig fuldstændig tilfældigt – men den psykologiske effekt er reel og kraftfuld.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det er værd at bemærke, at flere jurisdiktioner har reageret på disse bekymringer. I Storbritannien har UKGC forbudt bonus buys helt, mens de fortsat er tilladte i Danmark under Spillemyndighedens regulering. Denne forskel i regulering afspejler forskellige holdninger til, hvor meget ansvar der skal placeres hos spilleren vs. operatøren.
          </p>
        </section>

        {/* H2: Matematikken bag bonus buy */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Calculator className="h-7 w-7 text-primary" />
            Matematikken bag bonus buy (EV & sandsynlighed)
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For at forstå bonus buy matematisk, skal vi beregne den <strong>forventede værdi</strong> (Expected Value, EV) af et køb. EV fortæller os, hvad vi statistisk kan forvente at få tilbage for vores investering over et stort antal forsøg.
          </p>

          <Card className="mb-6 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                EV-formel for Bonus Buy
              </h3>
              <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm mb-4">
                <p className="mb-2"><strong>EV = Gennemsnitlig Bonusrunde-Udbetaling − Buy-Pris</strong></p>
                <Separator className="my-3" />
                <p className="mb-1"><strong>Eksempel: Sweet Bonanza (100x buy)</strong></p>
                <p>Gennemsnitlig bonusrunde-udbetaling: ~85x</p>
                <p>Buy-pris: 100x</p>
                <p className="mt-2 text-destructive font-semibold">EV = 85x − 100x = −15x (negativt)</p>
                <Separator className="my-3" />
                <p className="mb-1"><strong>Eksempel: Gates of Olympus (100x buy)</strong></p>
                <p>Gennemsnitlig bonusrunde-udbetaling: ~80x</p>
                <p>Buy-pris: 100x</p>
                <p className="mt-2 text-destructive font-semibold">EV = 80x − 100x = −20x (negativt)</p>
              </div>
              <p className="text-sm text-muted-foreground">
                I begge eksempler er den forventede værdi negativ. Det betyder, at du statistisk set taber penge på hver bonus buy. Den negative EV er udviklerens margin – prisen for "convenience" ved at springe scatter-jagten over.
              </p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Lad os sætte dette i perspektiv med konkrete tal. Hvis du spiller <Link to="/casinospil/spillemaskiner/sweet-bonanza" className={linkClass}>Sweet Bonanza</Link> med en indsats på 10 kr. og køber bonus 10 gange (total investering: 10.000 kr.), vil du statistisk få ca. 8.500 kr. tilbage. Dit forventede tab er 1.500 kr. – svarende til 15 % af din investering.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Til sammenligning: ved normal spinning med en RTP på 96,50 % og samme investering på 10.000 kr. vil dit forventede tab kun være 350 kr. (3,5 %). Forskellen – 1.150 kr. – er den "bekvemmelighedspris" du betaler for øjeblikkelig adgang til bonusrunden.
          </p>

          <h3 className="text-xl font-bold mb-3 mt-8">Sandsynlighedsfordeling ved bonus buy</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Et centralt aspekt af bonus buy-matematik er fordelingen af resultater. Selvom gennemsnittet er ca. 80–85x retur for en 100x buy, er denne gennemsnitsværdi stærkt påvirket af sjældne, ekstreme gevinster. I praksis ser fordelingen typisk sådan ud:
          </p>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-3">Typisk resultatfordeling for 100x bonus buy</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>Under 20x (stort tab)</span>
                  <Badge variant="destructive">~25 % af køb</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>20x – 50x (moderat tab)</span>
                  <Badge variant="outline" className="text-orange-500 border-orange-500">~30 % af køb</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>50x – 100x (break-even zone)</span>
                  <Badge variant="outline">~20 % af køb</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>100x – 300x (profit)</span>
                  <Badge variant="outline" className="text-green-500 border-green-500">~18 % af køb</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>300x – 1.000x (stor gevinst)</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">~5 % af køb</Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Over 1.000x (mega gevinst)</span>
                  <Badge variant="outline" className="text-emerald-600 border-emerald-600">~2 % af køb</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                * Baseret på estimerede gennemsnit for høj-volatilitet Pragmatic Play slots. Faktiske fordelinger varierer pr. spil.
              </p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Disse tal fortæller en vigtig historie: i ca. 55 % af alle bonus buys vil du få under halvdelen af din buy-pris tilbage. Kun i ca. 25 % af tilfældene vil du faktisk tjene penge. De resterende 20 % lander i break-even-zonen. Det er de sjældne 2–7 % med store gevinster, der trækker gennemsnittet op mod 80–85x.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Denne højreskæve fordeling er grundlaget for bonus buys tiltrækningskraft – og dens risiko. Den lovede mulighed for en 1.000x+ gevinst er reel, men den overskygger den langt mere sandsynlige realitet: de fleste køb resulterer i tab.
          </p>
        </section>

        {/* H2: RTP ved bonus buy vs. normal spinning */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Percent className="h-7 w-7 text-primary" />
            RTP ved bonus buy vs. normal spinning
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Return to Player (RTP) er den procentdel af alle indsatser, som en spillemaskine statistisk returnerer til spillerne over tid. Ved bonus buy er RTP næsten altid lavere end spillets standard-RTP. Årsagen er simpel: udvikleren prissætter buy-featuren over den gennemsnitlige bonusrunde-værdi for at sikre en profit.
          </p>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">RTP-sammenligning: Normal spin vs. Bonus Buy</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 font-semibold">Slot</th>
                      <th className="text-center py-2 px-2 font-semibold">Standard RTP</th>
                      <th className="text-center py-2 px-2 font-semibold">Buy-Feature RTP</th>
                      <th className="text-center py-2 px-2 font-semibold">RTP-forskel</th>
                      <th className="text-center py-2 pl-2 font-semibold">Buy-pris</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Sweet Bonanza</td>
                      <td className="text-center py-2 px-2">96,48 %</td>
                      <td className="text-center py-2 px-2">96,48 %*</td>
                      <td className="text-center py-2 px-2 text-muted-foreground">~0 %</td>
                      <td className="text-center py-2 pl-2">100x</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Gates of Olympus</td>
                      <td className="text-center py-2 px-2">96,50 %</td>
                      <td className="text-center py-2 px-2">96,50 %*</td>
                      <td className="text-center py-2 px-2 text-muted-foreground">~0 %</td>
                      <td className="text-center py-2 pl-2">100x</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Wanted Dead or a Wild</td>
                      <td className="text-center py-2 px-2">96,38 %</td>
                      <td className="text-center py-2 px-2">96,38 %*</td>
                      <td className="text-center py-2 px-2 text-muted-foreground">~0 %</td>
                      <td className="text-center py-2 pl-2">100–250x</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Madame Destiny Megaways</td>
                      <td className="text-center py-2 px-2">96,56 %</td>
                      <td className="text-center py-2 px-2">96,56 %*</td>
                      <td className="text-center py-2 px-2 text-muted-foreground">~0 %</td>
                      <td className="text-center py-2 pl-2">100x</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Extra Chilli Megaways</td>
                      <td className="text-center py-2 px-2">96,82 %</td>
                      <td className="text-center py-2 px-2">96,15 %</td>
                      <td className="text-center py-2 px-2 text-destructive">−0,67 %</td>
                      <td className="text-center py-2 pl-2">50x</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Chaos Crew</td>
                      <td className="text-center py-2 px-2">96,50 %</td>
                      <td className="text-center py-2 px-2">96,50 %*</td>
                      <td className="text-center py-2 px-2 text-muted-foreground">~0 %</td>
                      <td className="text-center py-2 pl-2">80x</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                * Pragmatic Play og Hacksaw Gaming matcher typisk buy-feature RTP med standard-RTP. Dog er den <em>effektive</em> værdi for spilleren ofte lavere pga. den høje varians og koncentrerede tab-risiko. Casinoets valgte RTP-konfiguration (96 % vs. 94 % vs. 91 %) påvirker begge RTP-værdier proportionalt.
              </p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Bemærk en vigtig nuance: selvom flere moderne slots matcher standard-RTP med buy-feature-RTP på papiret, er den <em>praktiske</em> oplevelse fundamentalt anderledes. Ved normal spinning fordeles dit tab over mange små indsatser – typisk taber du 3,5 % af hver indsats gradvist. Ved bonus buy koncentreres hele dit udfald i ét enkelt køb, hvilket dramatisk øger den kortsigtede varians.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Denne forskel i variansstruktur er afgørende for bankroll management: selv med identisk RTP er risikoen for ruin markant højere ved gentagne bonus buys end ved normal spinning. Vi dykker dybere ned i dette i volatilitetssektionen nedenfor.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det er også vigtigt at verificere den aktuelle RTP-konfiguration på dit casino. Mange udbydere tilbyder deres slots i flere RTP-varianter (f.eks. 96,50 %, 94,50 % og 91,50 %), og casinoet vælger, hvilken version de anvender. En bonus buy på en 91,50 %-variant er markant værre end på 96,50 %-versionen. Du kan typisk tjekke RTP'en i spillets info-menu eller regler. For mere om <Link to="/casinospil/spillemaskiner/hoej-rtp" className={linkClass}>slots med høj RTP</Link>, se vores dedikerede guide.
          </p>
        </section>

        {/* H2: Volatilitet og risiko ved køb af bonus */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Flame className="h-7 w-7 text-primary" />
            Volatilitet og risiko ved køb af bonus
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Volatilitet beskriver spredningen af resultater – og bonus buy er per definition en højvolatil handling. Du investerer en stor sum (50–250x din indsats) i ét enkelt udfald, som kan resultere i alt fra næsten nul til tusinder af gange din indsats. Denne koncentration af risiko adskiller bonus buy fundamentalt fra normal spinning.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Lad os illustrere med en risiko-simulation. Forestil dig, at du har et bankroll på 5.000 kr. og spiller Sweet Bonanza med en indsats på 5 kr. (buy-pris: 500 kr.):
          </p>

          <Card className="mb-6 border-destructive/20 bg-destructive/5">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Risiko-simulation: 10 bonus buys á 500 kr.
              </h3>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background rounded-lg p-3">
                    <p className="text-muted-foreground mb-1">Total investering</p>
                    <p className="font-bold text-lg">5.000 kr.</p>
                  </div>
                  <div className="bg-background rounded-lg p-3">
                    <p className="text-muted-foreground mb-1">Forventet retur (85x snit)</p>
                    <p className="font-bold text-lg">4.250 kr.</p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 rounded bg-destructive/10">
                    <p className="text-xs text-muted-foreground">Worst case (5 %)</p>
                    <p className="font-bold text-destructive">~800 kr.</p>
                    <p className="text-xs">retur af 5.000</p>
                  </div>
                  <div className="text-center p-2 rounded bg-muted">
                    <p className="text-xs text-muted-foreground">Median (50 %)</p>
                    <p className="font-bold">~3.200 kr.</p>
                    <p className="text-xs">retur af 5.000</p>
                  </div>
                  <div className="text-center p-2 rounded bg-green-500/10">
                    <p className="text-xs text-muted-foreground">Best case (5 %)</p>
                    <p className="font-bold text-green-600">~15.000 kr.+</p>
                    <p className="text-xs">retur af 5.000</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Risiko for ruin (tab af hele bankroll): ~15–20 % ved 10 consecutive buys. Ved normal spinning med samme bankroll: under 5 %.
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Simulationen viser tydeligt, at medianudbetaling (3.200 kr.) ligger markant under den forventede værdi (4.250 kr.). Dette skyldes den højreskæve fordeling: de sjældne store gevinster trækker gennemsnittet op, men de fleste individuelle sessioner ender med tab. Denne asymmetri er kernen i volatilitetsrisikoen ved bonus buy.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Risk of Ruin (RoR) – sandsynligheden for at tabe hele dit bankroll – er en kritisk metrik for bonus buy-spillere. Ved gentagne køb i høj-volatilitets slots er RoR typisk 15–25 % pr. 10 køb, afhængig af spillets specifikke volatilitetsprofil. Til sammenligning er RoR ved normal spinning med samme bankroll og antal spins under 5 % for de fleste slots.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Implikationen er klar: bonus buy kræver et proportionalt større bankroll for at absorbere den naturlige varians. Tommelfingerreglen er, at dit bankroll bør rumme mindst 30–50 buy-priser for en komfortabel session – og selv da bør du forvente markante udsving.
          </p>
        </section>

        {/* H2: Typiske bonus buy-priser */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Coins className="h-7 w-7 text-primary" />
            Typiske bonus buy-priser (50x–200x)
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Buy-prisen er direkte korreleret med bonusrundens potentiale. Billigere buys (50–80x) giver typisk adgang til enklere bonusrunder med lavere maksimalt gevinstpotentiale, mens dyrere buys (100–250x) åbner for mere volatile runder med højere upside. Her er et overblik over prisstrukturen på populære slots:
          </p>

          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <Badge variant="outline" className="mb-3 text-green-600 border-green-600">Lavt segment</Badge>
                <p className="text-3xl font-bold mb-2">50x – 80x</p>
                <p className="text-sm text-muted-foreground">Typisk for: Lavere volatilitet, enklere bonusmekanikker, Megaways-slots med gamble-funktioner</p>
                <p className="text-xs text-muted-foreground mt-2">Eksempler: Extra Chilli (50x), Chaos Crew (80x)</p>
              </CardContent>
            </Card>
            <Card className="border-primary/30">
              <CardContent className="pt-6 text-center">
                <Badge variant="outline" className="mb-3 text-primary border-primary">Standard segment</Badge>
                <p className="text-3xl font-bold mb-2">100x</p>
                <p className="text-sm text-muted-foreground">Mest udbredt pris. Standard for Pragmatic Play og mange Hacksaw-titler med høj volatilitet.</p>
                <p className="text-xs text-muted-foreground mt-2">Eksempler: Sweet Bonanza, Gates of Olympus, Big Bass Bonanza</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Badge variant="outline" className="mb-3 text-destructive border-destructive">Premium segment</Badge>
                <p className="text-3xl font-bold mb-2">150x – 250x</p>
                <p className="text-sm text-muted-foreground">Reserveret til ultra-volatile slots med ekstremt høj max win og specielle feature-varianter.</p>
                <p className="text-xs text-muted-foreground mt-2">Eksempler: Wanted Dead or a Wild (250x Duel), Mental (150x)</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Det er fristende at antage, at en billigere buy automatisk er "bedre værdi". Det er ikke nødvendigvis tilfældet. En 50x buy med en gennemsnitlig retur på 40x er relativt værre (-20 %) end en 100x buy med en gennemsnitlig retur på 85x (-15 %). EV pr. krone investeret er den relevante metrik, ikke den absolutte pris.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Nogle slots tilbyder flere buy-varianter til forskellige priser. <Link to="/casinospil/spillemaskiner/wanted-dead-or-a-wild" className={linkClass}>Wanted Dead or a Wild</Link> har eksempelvis tre niveauer: Standard Free Spins (100x), The Great Train Robbery (150x), og Dead or a Wild Duel (250x). Hver variant har sin egen risikoprofil og forventet afkast. Generelt stiger volatiliteten proportionalt med prisen.
          </p>
        </section>

        {/* H2: Slots med bonus buy – vores analyser */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Trophy className="h-7 w-7 text-primary" />
            Slots med bonus buy – vores analyser
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Vi har analyseret en række populære spillemaskiner med bonus buy-funktion i detalje. Klik på "Spil her" for at gå direkte til casinoet, eller "Se anmeldelse" for vores dybdegående matematiske analyse:
          </p>

          <SlotCarousel />

          <p className="text-muted-foreground leading-relaxed">
            Hver guide indeholder detaljerede EV-beregninger, RTP-sammenligning mellem standard og buy-feature, samt anbefalinger til bankroll-styring. Brug disse analyser til at træffe informerede beslutninger om, hvilke slots der tilbyder de bedste betingelser for bonus buy.
          </p>
        </section>

        {/* H2: Er bonus buys en god strategi? */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            Er bonus buys en god strategi?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det korte svar er nej – bonus buys er ikke en strategi til at vinde penge. Alle casinospil har en negativ forventet værdi for spilleren, og bonus buy ændrer ikke denne fundamentale matematik. I mange tilfælde forværrer buy-featuren den effektive tilbagebetaling sammenlignet med normal spinning.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det mere nuancerede svar afhænger af, hvad du definerer som "godt". Bonus buy kan være en rationel beslutning, hvis dit primære mål er underholdning snarere end profit. Ved at betale for øjeblikkelig adgang til bonusrunden maksimerer du din "action pr. krone" – du får mere spænding og variation pr. tidsenhed. For spillere med begrænset tid (f.eks. en 30-minutters session) kan bonus buy give en mere tilfredsstillende oplevelse end at bruge hele sessionen på basespins uden at ramme en bonus.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Dog bør du aldrig bruge bonus buy som en "catchup"-strategi efter tab. Denne tilgang – populært kaldet "tilt-buying" – er den hurtigste vej til ruin. Bonus buy forstærker naturligt den emotionelle intensitet: store tab føles ekstra smertefulde, fordi du aktivt valgte at investere en stor sum, og store gevinster føles ekstra euforiske. Denne emotionelle forstærkning kan føre til impulsive beslutninger, som strider mod rationel bankroll management.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hvis du vælger at bruge bonus buy, behandl det som en underholdningsudgift med et foruddefineret budget – ikke som en investeringsstrategi. Sæt en grænse for antal køb pr. session, og overhold den konsekvent.
          </p>
        </section>

        {/* H2: Hvornår bør du undgå bonus buys? */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Ban className="h-7 w-7 text-primary" />
            Hvornår bør du undgå bonus buys?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Selvom bonus buy kan være en del af en kontrolleret spiloplevelse, er der specifikke situationer, hvor du ubetinget bør undgå funktionen:
          </p>
          <div className="space-y-3 mb-6">
            {[
              { icon: AlertTriangle, title: "Utilstrækkeligt bankroll", desc: "Hvis dit resterende bankroll ikke kan rumme mindst 20+ buy-priser, er risikoen for ruin for høj. En 100x buy med et bankroll på 500 kr. (ved 5 kr. indsats) giver dig kun én chance – det er gambling i sin mest ekstreme form." },
              { icon: Flame, title: "Under tilt", desc: "Hvis du lige har tabt en eller flere bonus buys og føler trang til at 'vinde det tilbage', er det det værst tænkelige tidspunkt at købe igen. Emotionelle beslutninger og bonus buy er en destruktiv kombination." },
              { icon: DollarSign, title: "Under bonusomsætning", desc: "Mange casinobonusser har indsatsbegrænsninger (f.eks. max 50 kr. pr. spin) eller specifikt forbyder buy features. Et brud på disse vilkår kan medføre konfiskering af bonus og gevinster." },
              { icon: BarChart3, title: "Lav-RTP konfiguration", desc: "Hvis slotten kører i en reduceret RTP-variant (91–94 % i stedet for 96 %), er buy-featuren endnu mere ufordelagtig. Tjek altid RTP'en i spillets info-menu, før du køber." },
              { icon: Clock, title: "Regelmæssigt og ukontrolleret", desc: "Hvis bonus buy er blevet din standardtilgang til alle sessions, og du har svært ved at spille normalt, kan det være et tegn på problematisk spiladfærd. Overvej at sætte grænser eller kontakte hjælpetjenester." },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start gap-3">
                    <item.icon className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Grundreglen er: hvis du er i tvivl om, hvorvidt du bør købe en bonus, så lad være. Den usikkerhed er i sig selv et signal om, at betingelserne (bankroll, mental tilstand, eller vilkår) muligvis ikke er optimale.
          </p>
        </section>

        {/* H2: Regler i Danmark */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            Regler i Danmark
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I Danmark reguleres online gambling af Spillemyndigheden, som udsteder licenser til casinooperatører under den danske spillelov. Bonus buy-funktionen er fuldt lovlig på <Link to="/casino-licenser" className={linkClass}>danske licenserede casinoer</Link>, i modsætning til eksempelvis Storbritannien, hvor funktionen er blevet forbudt.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Spillemyndighedens regulering stiller dog krav til operatørerne: slots skal oplyse om RTP, og casinoer skal tilbyde ansvarligt spil-værktøjer som indbetalingsgrænser, tabsgrænser og selvudelukkelse via <a href="https://www.rofus.nu" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a>. Disse værktøjer er særligt relevante for bonus buy-spillere, da den høje koncentration af indsatser kan accelerere tab.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det er vigtigt at fremhæve, at bonus buy betragtes som en enkelt indsats af den størrelse, du betaler. Hvis du har sat en indsatsgrænse på 100 kr. pr. spin hos casinoet, og bonus buy koster 100x din grundindsats á 10 kr. (= 1.000 kr.), kan dette overstige din indsatsgrænse. Nogle casinoer har implementeret specifikke grænser for buy feature-beløb, mens andre lader det falde under den generelle indsatsgrænse.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vi anbefaler, at du aktivt bruger Spillemyndighedens og casinoets ansvarligt spil-værktøjer, uanset om du benytter bonus buy eller ej. Læs mere i vores <Link to="/ansvarligt-spil" className={linkClass}>guide til ansvarligt spil</Link>.
          </p>
        </section>

        {/* H2: Bankroll management ved buy feature */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            Bankroll management ved buy feature
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Effektiv bankroll management er endnu vigtigere ved bonus buy end ved normal spinning, fordi den høje varians kræver et større sikkerhedsnet. Her er de centrale principper:
          </p>

          <Card className="mb-6 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Bankroll-regler for bonus buy</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-semibold text-sm">Minimum 30–50 buy-priser i bankroll</p>
                    <p className="text-sm text-muted-foreground">Hvis du køber til 100x á 10 kr. (= 1.000 kr. pr. buy), bør dit sessions-bankroll være mindst 30.000–50.000 kr. Er dit budget 5.000 kr., sænk indsatsen til 1–2 kr. pr. spin.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-semibold text-sm">Max 3–5 % af bankroll pr. buy</p>
                    <p className="text-sm text-muted-foreground">Aldrig mere end 5 % af dit totale bankroll i en enkelt bonus buy. Dette begrænser din downside og sikrer, at du kan overleve en serie af tabende køb.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-semibold text-sm">Forudbestemt stop-loss og win-goal</p>
                    <p className="text-sm text-muted-foreground">Sæt en grænse for maximalt tab pr. session (f.eks. 10 buys) OG en gevinstgrænse (f.eks. 3x bankroll). Begge grænser bør overholdes ufravigeligt.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <p className="font-semibold text-sm">Adskil bonus buy-budget fra hovedbankroll</p>
                    <p className="text-sm text-muted-foreground">Hold et separat budget for bonus buys. Når dette budget er brugt, skift til normal spinning eller stop sessionen. Bland aldrig hovedbankroll ind i buy-budgettet.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Den vigtigste indsigt er, at bonus buy ikke ændrer de grundlæggende regler for bankroll management – den forstærker dem. Alle de principper, der gælder for normal spinning (fast budget, stop-loss, ikke jagte tab), gælder i forstærket grad for buy feature. Den eneste forskel er, at de nødvendige bankroll-multipler er højere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Husk: bonus buy er en underholdningsfunktion, ikke en vej til profit. Behandl din buy-pris som en billet til en spiloplevelse – ikke som en investering med forventet afkast.
          </p>
        </section>

        {/* H2: Bonus buy vs. free spins */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Zap className="h-7 w-7 text-primary" />
            Bonus buy vs. free spins (naturlig trigger)
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Spørgsmålet "skal jeg købe eller vente?" er centralt for enhver spiller, der overvejer bonus buy. Lad os sammenligne de to tilgange objektivt:
          </p>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 font-semibold">Parameter</th>
                      <th className="text-center py-2 px-2 font-semibold">Bonus Buy</th>
                      <th className="text-center py-2 pl-2 font-semibold">Naturlig Trigger</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium">Pris for adgang</td>
                      <td className="text-center py-2 px-2">Fast (50–250x)</td>
                      <td className="text-center py-2 pl-2">Variabel (0x–500x+)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium">Gennemsnitlig pris*</td>
                      <td className="text-center py-2 px-2">100x</td>
                      <td className="text-center py-2 pl-2">~80–120x (inkl. basegame RTP)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium">Bonusrunde-indhold</td>
                      <td className="text-center py-2 px-2">Identisk</td>
                      <td className="text-center py-2 pl-2">Identisk</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium">Ventetid</td>
                      <td className="text-center py-2 px-2">0 spins</td>
                      <td className="text-center py-2 pl-2">~150–300 spins snit</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium">Basegame-gevinster</td>
                      <td className="text-center py-2 px-2">Ingen</td>
                      <td className="text-center py-2 pl-2">Ja (offset noget af investeringen)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium">Varians</td>
                      <td className="text-center py-2 px-2">Ekstrem (alt-eller-intet)</td>
                      <td className="text-center py-2 pl-2">Høj (men spredt over tid)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Psykologisk belastning</td>
                      <td className="text-center py-2 px-2">Høj (store enkelttab)</td>
                      <td className="text-center py-2 pl-2">Moderat (gradvist tab)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                * "Gennemsnitlig pris" for naturlig trigger inkluderer det gennemsnitlige tab i basespillet under ventetiden, delvist opvejet af basegame-gevinster.
              </p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Den vigtigste pointe er, at naturlig trigger typisk er marginalt billigere i gennemsnit, fordi basegame-gevinster delvist kompenserer for investeringen under ventetiden. Ved bonus buy betaler du en fast pris uden nogen kompensation fra basespillet.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Dog er det vigtigt at anerkende, at naturlig trigger har sin egen form for varians: nogle gange trigger du bonussen efter 50 spins (billigt), andre gange efter 500+ spins (dyrt). Bonus buy eliminerer denne usikkerhed – du ved præcis, hvad du betaler, hver gang. For spillere, der foretrækker forudsigelighed i deres udgifter, kan dette have en reel værdi.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Matematisk set er den optimale strategi altid at spille normalt og lade scatters falde naturligt. Men "optimal" og "optimal for din spiloplevelse" er ikke nødvendigvis det samme. Bonus buy er en bekvemmelighedsfunktion – og som alle bekvemmelighedsservices koster den ekstra.
          </p>
        </section>

        {/* H2: Konklusion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-primary" />
            Konklusion
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bonus buy er en af de mest debatterede mekanikker i moderne online slots – og med god grund. Funktionen tilbyder øjeblikkelig adgang til spillets mest spændende element, men til en pris, der matematisk sjældent retfærdiggør sig selv. Vores analyse viser, at:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li>Buy-feature EV er typisk negativ – du betaler en præmie for bekvemmelighed</li>
            <li>RTP kan matche eller ligge under standard-RTP, men den effektive varians er dramatisk højere</li>
            <li>Ca. 55 % af alle køb returnerer under halvdelen af buy-prisen</li>
            <li>Bankroll-kravene er 3–5x højere end ved normal spinning</li>
            <li>Risk of Ruin stiger markant med gentagne buys</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det betyder ikke, at bonus buy er "forkert" – men det er en beslutning, der bør tages med åbne øjne og fuld forståelse af konsekvenserne. Hvis du vælger at bruge funktionen, gør det med et dedikeret budget, faste grænser og en klar erkendelse af, at du betaler for underholdning, ikke for en edge.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For mere detaljerede analyser af specifikke slots med bonus buy, udforsk vores individuelle <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskine-guides</Link>. Og husk: uanset om du køber eller spinner – spil altid <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt</Link>.
          </p>
        </section>

        {/* Ansvarligt spil advarsel */}
        <Card className="mb-12 border-destructive/30 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-destructive mb-2">Vigtigt: Ansvarligt spil</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  Bonus buy er en høj-varians mekanik, der kan føre til hurtige og betydelige tab. Sæt altid grænser for din spilletid og dit budget, og stop når grænsen er nået. Hvis du oplever problemer med dit spil, kan du udelukke dig selv via <a href="https://www.rofus.nu" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a> eller søge hjælp hos <a href="https://www.stopspillet.dk" target="_blank" rel="noopener noreferrer" className={linkClass}>StopSpillet</a> (tlf. 70 22 28 25).
                </p>
                <Link to="/ansvarligt-spil" className="text-sm text-primary underline hover:text-primary/80">
                  Læs vores komplette guide til ansvarligt spil →
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <SlotProviderLink slotSlug="bonus-buys" />
        <LatestNewsByCategory pagePath="/casinospil/spillemaskiner/bonus-buys" />
        <RelatedGuides currentPath="/casinospil/spillemaskiner/bonus-buys" />
        <FAQSection title="Ofte Stillede Spørgsmål om Bonus Buys" faqs={bonusBuyFaqs} />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="spildansknu" />
    </>
  );
};

export default BonusBuysGuide;
