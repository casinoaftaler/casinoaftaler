import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { User, CalendarDays, BookOpen, Target, ShieldCheck, BarChart3, Sparkles, Trophy, Zap, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import pokerHero from "@/assets/heroes/poker-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const pokerFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er forskellen på casino poker og turneringspoker?",
    answer: (
      <>
        Casino poker (også kaldet "house-banked poker") spilles mod dealeren/casinoet, ikke mod andre spillere. Eksempler inkluderer Caribbean Stud, Casino Hold'em og Three Card Poker. Du konkurrerer kun om at slå dealerens hånd. Turneringspoker (Texas Hold'em, Omaha) spilles derimod mod andre spillere, og casinoet tjener en procentdel af puljen ("rake"). I casino poker er din modstander altid huset, og spillet har en fast house edge. I turneringspoker afhænger din succes af færdighed, strategi og evnen til at læse modstandere. På danske online casinoer finder du primært casino poker-varianter og <Link to="/live-casino" className={linkClass}>live casino</Link>-versioner.
      </>
    ),
  },
  {
    question: "Hvad er håndrækkefølgen i poker?",
    answer:
      "Fra højeste til laveste: Royal Flush (A-K-Q-J-10 i samme kulør), Straight Flush (fem kort i rækkefølge og samme kulør), Four of a Kind (fire ens), Full House (tre ens + et par), Flush (fem kort i samme kulør), Straight (fem kort i rækkefølge), Three of a Kind (tre ens), Two Pair (to par), One Pair (ét par), High Card (intet af ovenstående). Royal Flush er den sjældneste hånd – sandsynligheden er ca. 1:649.740 med fem tilfældige kort fra ét kortspil. Full House slår altid Flush, og Straight slår altid Three of a Kind. At mestre håndværdierne er fundamentalt for alle poker-varianter.",
  },
  {
    question: "Hvad er Video Poker, og hvad er RTP'en?",
    answer: (
      <>
        Video Poker er en digital pokervariant, der kombinerer elementer fra <Link to="/casinospil/spillemaskiner" className={linkClass}>spilleautomater</Link> og poker. Du modtager fem kort og vælger, hvilke du vil beholde og bytte. Gevinsten bestemmes af din endelige pokerhånd ifølge en fast udbetalingstabel. Video Poker adskiller sig fundamentalt fra slots, fordi din beslutning om hvilke kort du beholder direkte påvirker resultatet. De bedste Video Poker-varianter har ekstremt høj RTP: Jacks or Better (full-pay 9/6) har 99,54 % RTP, Deuces Wild (full-pay) har 100,76 % RTP (spilleren har faktisk en matematisk fordel), og Double Bonus Poker har op til 100,17 % RTP – alt med perfekt strategi.
      </>
    ),
  },
  {
    question: "Kan man spille poker med bonus på danske casinoer?",
    answer: (
      <>
        Det afhænger af bonustypen og casinoets vilkår. De fleste <Link to="/casino-bonus" className={linkClass}>casino bonusser</Link> har specifikke regler for bordspil og poker. Casino poker-varianter bidrager typisk med 5–20 % til <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>, mens Video Poker ofte bidrager med 10–20 %. Nogle casinoer udelukker helt poker fra bonusbetingelser. Tjek altid vilkårene, før du spiller poker med bonusmidler. For den bedste oplevelse anbefaler vi <Link to="/bonus-uden-omsaetningskrav" className={linkClass}>bonusser uden omsætningskrav</Link>, da du frit kan vælge dine spil uden at bekymre dig om bidragsprocenter.
      </>
    ),
  },
  {
    question: "Hvad er pot odds, og hvordan beregner man dem?",
    answer:
      "Pot odds er forholdet mellem den nuværende pulje og den indsats, du skal betale for at fortsætte i hånden. Eksempel: puljen er 300 kr., og din modstander satser 100 kr. Puljen er nu 400 kr., og du skal betale 100 kr. – dine pot odds er 4:1 (400/100). For at et call er profitabelt, skal dine vindchancer (equity) være bedre end pot odds'ene. Har du 5:1 pot odds, behøver du kun vinde mere end 1 ud af 6 gange (16,7 %) for at være profitabel. Implied odds inkluderer fremtidige indsatser, du forventer at vinde – de er mere komplekse men afgørende for avanceret spil. Pot odds er irrelevante i casino poker mod huset, men fundamentale i spiller-vs-spiller-poker.",
  },
  {
    question: "Hvilke poker-varianter har den laveste house edge?",
    answer: (
      <>
        Video Poker topper listen med de laveste house edges i hele casinobranchen. Jacks or Better (9/6 full-pay) har kun 0,46 % house edge med perfekt strategi. Deuces Wild (full-pay) har faktisk en negativ house edge (-0,76 %), hvilket betyder, at spilleren har fordelen. Blandt bordspoker-varianter har Texas Hold'em Bonus Poker ca. 2,04 % house edge, Caribbean Stud Poker ca. 5,22 %, og Three Card Poker ca. 3,37 % (ante + play). Til sammenligning har <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> typisk 0,4–0,5 % house edge. Video Poker med perfekt strategi er dermed det mest fordelagtige casinospil overhovedet.
      </>
    ),
  },
  {
    question: "Er online poker fair og reguleret i Danmark?",
    answer: (
      <>
        Ja, alle poker-spil på danske licenserede casinoer er fair og reguleret af den danske <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighed</Link>. RNG-baserede pokerspil (Video Poker, casino poker) bruger certificerede Random Number Generators, der testes af uafhængige laboratorier. Live casino poker streames fra professionelle studier med rigtige kort og dealere. For spiller-vs-spiller online poker kræves en separat licens, og Spillemyndigheden overvåger, at softwaren ikke favoriserer bestemte spillere. Anti-kollusion-systemer sikrer desuden, at spillere ikke samarbejder for at snyde.
      </>
    ),
  },
];

const PokerGuide = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pokerFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: typeof faq.answer === "string" ? faq.answer : faq.question },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: "https://casinoaftaler.dk/" },
      { "@type": "ListItem", position: 2, name: "Casinospil", item: "https://casinoaftaler.dk/casinospil" },
      { "@type": "ListItem", position: 3, name: "Poker", item: "https://casinoaftaler.dk/casinospil/poker" },
    ],
  };

  return (
    <>
      <SEO
        title="Poker Regler 2026 – Komplet Guide til Online Poker"
        description="Lær poker regler, håndrækkefølge, varianter og strategi. Guide til Texas Hold'em, Caribbean Stud, Video Poker og live poker på danske casinoer."
        jsonLd={[faqJsonLd, breadcrumbJsonLd]}
      />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Februar 2026</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Poker Regler 2026</h1>
            <p className="text-lg text-white/80">Guide til Texas Hold'em, Omaha og strategi – den komplette poker-guide.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5"><User className="h-4 w-4" /><span>Skrevet af: <span className="font-medium text-foreground">Casinoaftaler</span></span></div>
          <div className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /><span>Opdateret: <span className="font-medium text-foreground">15-02-2026</span></span></div>
          <div className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /><span>Læsetid: <span className="font-medium text-foreground">15 Min.</span></span></div>
        </div>

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={pokerHero} alt="Pokerbord med spillere og kort" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Pokerens Univers – Fra Saloons til Skærmen</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Poker er verdens mest berømte kortspil og et af de få casinospil, hvor færdighed spiller en afgørende rolle. Spillets rødder kan spores tilbage til 1800-tallets Amerika, hvor det udviklede sig fra det persiske spil "As-Nas" og det franske "Poque". I dag spilles poker i utallige varianter på casinoer, i pokerklubber og online, og det har skabt legender som Doyle Brunson, Phil Ivey og Daniel Negreanu.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I online casinoverden opdeles poker i to kategorier: <strong>casino poker</strong> (du spiller mod huset, fx Caribbean Stud, Casino Hold'em, Three Card Poker) og <strong>spiller-vs-spiller poker</strong> (fx Texas Hold'em turneringer). Casino poker har en fast house edge og kræver ingen interaktion med andre spillere, mens spiller-vs-spiller poker er et rent færdighedsspil, hvor casinoet kun tager en "rake" (typisk 2,5–5 % af puljen).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Video Poker er en tredje kategori, der kombinerer poker med <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link>. Her modtager du fem kort og vælger, hvilke du vil beholde. Det er det eneste <Link to="/casinospil" className={linkClass}>casinospil</Link>, hvor perfekt strategi faktisk kan give spilleren en matematisk fordel over huset. Denne guide dækker alle tre kategorier og giver dig den viden, du behøver for at spille informeret.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Følg med i vores <Link to="/highlights" className={linkClass}>community highlights</Link> for at se store pokergevinster og strategiske træk fra vores streamere.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Håndrækkefølge i Poker</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Uanset pokervarianten er håndrækkefølgen fundamentet. Her er alle ti standard pokerhænder fra højeste til laveste, med sandsynligheder baseret på fem kort fra ét kortspil:
          </p>
          <div className="space-y-4">
            <div><h3 className="text-lg font-semibold flex items-center gap-2"><Trophy className="h-5 w-5 text-primary" />Royal Flush</h3><p className="text-muted-foreground">A-K-Q-J-10 i samme kulør. Sandsynlighed: 0,000154 % (1:649.740). Den uovertrufne topkarl – kun fire mulige kombinationer i et standard kortspil.</p></div>
            <div><h3 className="text-lg font-semibold flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" />Straight Flush</h3><p className="text-muted-foreground">Fem kort i rækkefølge i samme kulør (fx 5-6-7-8-9 i hjerter). Sandsynlighed: 0,00139 %. Ekstremt sjælden og kun overgået af Royal Flush.</p></div>
            <div><h3 className="text-lg font-semibold flex items-center gap-2"><Zap className="h-5 w-5 text-primary" />Four of a Kind</h3><p className="text-muted-foreground">Fire kort med samme værdi (fx fire konger). Sandsynlighed: 0,024 %. En dominerende hånd, der sjældent tabes.</p></div>
            <div><h3 className="text-lg font-semibold">Full House</h3><p className="text-muted-foreground">Tre ens + et par (fx tre damer og to 7'ere). Sandsynlighed: 0,144 %. Stærkere end Flush.</p></div>
            <div><h3 className="text-lg font-semibold">Flush</h3><p className="text-muted-foreground">Fem kort i samme kulør (uanset rækkefølge). Sandsynlighed: 0,197 %. Ved to flushes vinder det højeste kort.</p></div>
            <div><h3 className="text-lg font-semibold">Straight</h3><p className="text-muted-foreground">Fem kort i rækkefølge (blandet kulør). Sandsynlighed: 0,392 %. Es kan fungere som højt (A-K-Q-J-10) eller lavt (A-2-3-4-5).</p></div>
            <div><h3 className="text-lg font-semibold">Three of a Kind</h3><p className="text-muted-foreground">Tre kort med samme værdi. Sandsynlighed: 2,11 %. I Texas Hold'em kaldes det "set" (pocketed pair + board) eller "trips" (én i hånden + to på bordet).</p></div>
            <div><h3 className="text-lg font-semibold">Two Pair</h3><p className="text-muted-foreground">To separate par (fx to knægte og to 4'ere). Sandsynlighed: 4,75 %. Det højeste par sammenlignes først ved tie.</p></div>
            <div><h3 className="text-lg font-semibold">One Pair</h3><p className="text-muted-foreground">Ét par (fx to esser). Sandsynlighed: 42,26 %. Den mest almindelige vindende hånd i Texas Hold'em.</p></div>
            <div><h3 className="text-lg font-semibold">High Card</h3><p className="text-muted-foreground">Ingen af ovenstående. Det højeste enkeltkort afgør. Sandsynlighed: 50,12 %. Cirka halvdelen af alle fem-korts hænder er "intet".</p></div>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Casino Poker-Varianter</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Casino poker-varianter spilles mod huset (dealeren) og har faste regler og house edges. Her er de mest populære versioner, du finder på danske online casinoer:
          </p>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-xl font-semibold flex items-center gap-2"><Target className="h-5 w-5 text-primary" />Caribbean Stud Poker</h3>
              <p className="text-muted-foreground leading-relaxed">Du og dealeren modtager hver fem kort. Du ser dine egne kort og ét af dealerens. Du kan enten folde (mister ante) eller raise (dobbelt ante). Dealeren skal have Ace-King eller bedre for at kvalificere sig. Hvis dealeren ikke kvalificerer sig, betaler ante 1:1 og raise returneres. House edge: ca. 5,22 %. Spillet tilbyder ofte en progressiv jackpot side bet, der betaler for Royal Flush og Straight Flush.</p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold flex items-center gap-2"><Layers className="h-5 w-5 text-primary" />Casino Hold'em</h3>
              <p className="text-muted-foreground leading-relaxed">Baseret på Texas Hold'em, men du spiller mod dealeren. Du og dealeren modtager to kort, og fem community cards afsløres (flop + turn + river). Du ante'r, ser dine kort og floppen, og beslutter om du vil call (2x ante) eller folde. Dealeren skal have par af 4'ere eller bedre for at kvalificere sig. House edge: ca. 2,16 % med optimal strategi – en af de bedste casino poker-varianter.</p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold flex items-center gap-2"><Zap className="h-5 w-5 text-primary" />Three Card Poker</h3>
              <p className="text-muted-foreground leading-relaxed">Et hurtigere format med kun tre kort pr. hånd. Du placerer ante og/eller Pair Plus-væddemål. Med tre kort ændres håndrækkefølgen – Straight slår Flush (fordi tre kort i rækkefølge er sværere end tre i samme kulør). Pair Plus betaler uafhængigt af dealerens hånd baseret på din hånds styrke. House edge: ca. 3,37 % (ante + play) og 2,32 % (Pair Plus). Three Card Poker er ideel for begyndere pga. simple regler og hurtigt gameplay.</p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Video Poker – Det Mest Spillervenlige Casinospil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Video Poker er unikt i casinobranchen, fordi perfekt strategi kan reducere house edge til næsten nul – eller endda give spilleren en positiv forventet værdi. Spillet kombinerer pokerhænder med maskinspil: du modtager fem kort, vælger hvilke du vil beholde, og bytter resten for nye kort. Din endelige hånd bestemmer udbetalingen.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><BarChart3 className="h-5 w-5 text-primary" />Jacks or Better</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Den klassiske variant. Full-pay (9/6): 99,54 % RTP. Par af knægte eller bedre betaler. Ideel for nybegyndere.</p></CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Sparkles className="h-5 w-5 text-primary" />Deuces Wild</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Alle 2'ere fungerer som wilds. Full-pay: 100,76 % RTP – spilleren har fordelen! Kræver specialiseret strategi.</p></CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Trophy className="h-5 w-5 text-primary" />Double Bonus</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Bonusudbetalinger for Four of a Kind. Full-pay: 100,17 % RTP. Høj varians pga. store bonusudbetalinger.</p></CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Nøglen til profitabel Video Poker er at finde "full-pay" versioner (de mest generøse udbetalingstabeller) og anvende perfekt strategi. Udbetalingstabellen varierer mellem casinoer – selv en lille reduktion (fx 8/5 i stedet for 9/6 Jacks or Better) øger house edge fra 0,46 % til 2,7 %. Tjek altid udbetalingstabellen, før du spiller, og brug en strategi-kalkulator for at sikre optimale beslutninger.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Poker-Strategi for Casino-Spillere</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Strategien i casino poker adskiller sig fundamentalt fra spiller-vs-spiller poker, fordi du ikke kan bluffe dealeren. Dine beslutninger begrænses typisk til raise/fold baseret på håndens styrke. Her er de vigtigste strategiske principper:
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Caribbean Stud:</strong> Raise altid med par eller bedre. Fold altid med mindre end Ace-King. Med Ace-King: raise hvis dit tredje-højeste kort er Queen eller bedre, eller hvis du har et kort, der matcher dealerens åbne kort. <strong>Casino Hold'em:</strong> Call med næsten enhver hånd – folding er sjældent korrekt (under 18 % af hænderne). <strong>Three Card Poker:</strong> Play med Queen-6-4 eller bedre; fold alt under det.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Bankroll management</strong> er lige så vigtig i poker som i andre casinospil. For casino poker anbefaler vi en bankroll på minimum 30 gange din ante. For Video Poker bør du have 100+ gange din indsats pga. spillenes høje varians (Royal Flush-udbetalingen udgør en stor del af RTP'en). Og husk: <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link> kommer altid først. Sæt grænser for tid og penge, og stop når du når dem.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Live Poker på Danske Casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Live casino poker bringer den autentiske pokeroplevelse direkte til din skærm. <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> tilbyder live versioner af Casino Hold'em, Caribbean Stud, Three Card Poker og Ultimate Texas Hold'em, alle styret af professionelle dealere i HD-studiemiljøer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Live poker kombinerer det bedste fra online og fysisk spil: du ser rigtige kort blive delt, kan interagere med dealeren via chat, og spiller i dit eget tempo hjemmefra. Indsatsgrænserne varierer typisk fra 10 kr. til 50.000 kr. afhængigt af bordet. Mange danske <Link to="/top-10-casino-online" className={linkClass}>top-casinoer</Link> tilbyder eksklusive live poker-borde med dansk interface og skandinavisktalende dealere.
          </p>
        </section>

        <Separator className="my-10" />

        <InlineCasinoCards title="Bedste Casinoer til Poker" count={4} />

        <RelatedGuides currentPath="/casinospil/poker" />

        <FAQSection faqs={pokerFaqs} />
      </div>
    </>
  );
};

export default PokerGuide;
