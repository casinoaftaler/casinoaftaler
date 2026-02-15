import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { User, CalendarDays, BookOpen, Target, ShieldCheck, BarChart3, Sparkles, Trophy, Zap, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import baccaratHero from "@/assets/heroes/baccarat-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const baccaratFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er baccarat, og hvordan spiller man det?",
    answer: (
      <>
        Baccarat (Punto Banco) er et kortspil, hvor du satser på, om spillerens hånd (Punto) eller bankerens hånd (Banco) kommer tættest på 9 – eller om resultatet bliver uafgjort (Tie). To kort deles til hver side, og en tredje-kort-regel bestemmer automatisk, om flere kort trækkes. Du træffer ingen beslutninger om kortene – dit eneste valg er, hvad du satser på. Denne simplicitet, kombineret med en lav house edge (1,06 % på Banker), gør baccarat til et af de mest populære <Link to="/live-casino" className={linkClass}>live casino</Link>-spil i verden, særligt i asiatiske markeder.
      </>
    ),
  },
  {
    question: "Hvad er kortværdierne i baccarat?",
    answer:
      "Kortværdierne i baccarat adskiller sig fra de fleste andre kortspil. Es tæller som 1, kort 2–9 beholder deres pålydende værdi, og alle 10'ere samt billedkort (J, Q, K) tæller som 0. Håndens totalværdi beregnes ved at lægge kortene sammen og kun bruge sidste ciffer. Eksempel: 7 + 8 = 15, men i baccarat er håndens værdi 5. To billedkort = 0 (den dårligste hånd). Es + 8 = 9 (den bedste mulige hånd, kaldet 'natural 9'). Denne modulo-10-beregning er unik for baccarat og eliminerer muligheden for at busse, som i blackjack.",
  },
  {
    question: "Hvad er tredje-kort-reglen i baccarat?",
    answer:
      "Tredje-kort-reglen bestemmer automatisk, om Player eller Banker modtager et tredje kort. Player trækker et tredje kort, hvis de to første kort giver 0–5, og står på 6–7. Hvis Player har 'natural' 8 eller 9, trækkes ingen kort. Bankers regler er mere komplekse og afhænger af både Bankers totalværdi og Players tredje kort. Eksempelvis: Banker står altid på 7, trækker altid på 0–2, og på 3–6 afhænger beslutningen af Players tredje kort. Disse regler er faste og automatiske – hverken du eller dealeren træffer beslutninger. Onlineversioner håndterer alt dette automatisk.",
  },
  {
    question: "Hvorfor er Banker-væddemålet det bedste i baccarat?",
    answer: (
      <>
        Banker-væddemålet har den laveste house edge i baccarat: kun 1,06 % (efter 5 % kommission). Banker vinder statistisk set 45,86 % af alle hænder (ekskl. Tie), Player vinder 44,62 %, og Tie udgør 9,52 %. Grunden til Bankers fordel er tredje-kort-reglen: Banker handler sidst og kan tilpasse sin strategi baseret på Players tredje kort – en strukturel fordel, der minder om dealerens position i <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>. For at kompensere tager casinoet 5 % kommission på Banker-gevinster, men selv med denne kommission er Banker det bedste væddemål.
      </>
    ),
  },
  {
    question: "Er Tie-væddemålet i baccarat en god idé?",
    answer:
      "Nej, Tie-væddemålet er et af de dårligste væddemål i alle casinospil. Selvom udbetalingen på 8:1 lyder attraktiv, har Tie en house edge på hele 14,36 %. Det betyder, at for hver 100 kr. satset på Tie, forventes du at tabe 14,36 kr. over tid. Tie forekommer statistisk set i 9,52 % af alle hænder – men udbetalingen på 8:1 kompenserer slet ikke for denne lave frekvens (break-even ville kræve ca. 10:1). Selv den sjældne 9:1-udbetaling, som nogle casinoer tilbyder, har stadig en house edge på 4,84 %. Hold dig til Banker (1,06 %) eller Player (1,24 %) for de bedste odds.",
  },
  {
    question: "Hvad er Lightning Baccarat og Squeeze Baccarat?",
    answer: (
      <>
        Lightning Baccarat er en variant fra <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>, der tilføjer RNG-genererede multiplikatorer (op til 512x) til tilfældige kort før hver runde. Hvis et vinderudfald inkluderer et "lightning kort", ganges gevinsten med multiplikatoren. For at kompensere er der et 20 % gebyr på alle indsatser. Squeeze Baccarat er en live variant, hvor dealeren langsomt afslører kortene ved at "squeeze" dem – en ceremoni fra Macaus VIP-rum. Begge varianter har højere volatilitet end standard baccarat men bibeholder det grundlæggende spil intakt. De er ideelle for spillere, der søger ekstra spænding.
      </>
    ),
  },
  {
    question: "Kan man bruge en strategi i baccarat?",
    answer: (
      <>
        Baccarat er primært et tilfældighedsspil – du kan ikke påvirke kortene. Den eneste "strategi" er at vælge det rigtige væddemål: satse konsekvent på Banker (1,06 % house edge) og undgå Tie (14,36 %). Væddemålssystemer som Martingale, Fibonacci eller 1-3-2-6 kan bruges til at styre din indsatsstørrelse, men de ændrer ikke den matematiske edge. Korttælling er teoretisk muligt i live baccarat, men den potentielle fordel er minimal (ca. 0,2 %) og kræver ekstraordinære forhold (dybt penetrerede shoes). Fokuser i stedet på bankroll management, sæt grænser, og nyd spillets elegance som det underholdningsspil, det er.
      </>
    ),
  },
];

const BaccaratGuide = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: baccaratFaqs.map((faq) => ({
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
      { "@type": "ListItem", position: 3, name: "Baccarat", item: "https://casinoaftaler.dk/casinospil/baccarat" },
    ],
  };

  return (
    <>
      <SEO
        title="Baccarat Regler 2026 – Guide til Online Baccarat"
        description="Lær baccarat regler, kortværdier, tredje-kort-reglen og varianter. Guide til Punto Banco, Lightning Baccarat og live baccarat hos danske casinoer."
        jsonLd={[faqJsonLd, breadcrumbJsonLd]}
      />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Februar 2026</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Baccarat Regler 2026</h1>
            <p className="text-lg text-white/80">Guide til Punto Banco, kortregler og strategi – den komplette baccarat-guide.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="15-02-2026" readTime="13 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={baccaratHero} alt="Elegant baccaratbord med kort og chips" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Baccarat – Elegancens Kortspil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Baccarat er et af de ældste og mest elegante casinospil i verden. Oprindeligt forbeholdt aristokratiet i 1400-tallets Italien har spillet spredt sig til franske saloner, Monaco's Casino de Monte-Carlo og Macaus milliardmarked. I dag genererer baccarat mere omsætning end noget andet bordspil globalt – primært drevet af asiatiske high rollers, der anser spillet for et symbol på sofistikering og held.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Spillets charme ligger i dets simplicitet: du vælger blot, om du vil satse på Player (Punto), Banker (Banco) eller Tie (uafgjort). Dealeren håndterer alle kort efter faste regler, og du behøver ikke træffe nogen beslutninger om selve spillet. Denne passive natur gør baccarat tilgængeligt for alle – fra nybegyndere til erfarne spillere. Samtidig tilbyder spillet en af de laveste house edges i casinoet: kun 1,06 % på Banker-væddemålet.</p>
          <p className="text-muted-foreground leading-relaxed">Online baccarat – særligt i <Link to="/live-casino" className={linkClass}>live casino</Link>-format – har demokratiseret spillet. Du behøver ikke længere en smoking og et VIP-kort for at spille. Med indsatser fra 10 kr. på live baccarat-borde hos danske casinoer kan enhver opleve den elegance og spænding, som har gjort baccarat til kongernes spil i over 500 år. Baccarat er en essentiel del af vores <Link to="/casinospil" className={linkClass}>casinospil-univers</Link>.</p>
        </section>

        <InlineCasinoCards title="Bedste Casinoer til Baccarat" count={4} />

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Grundlæggende Regler – Punto Banco</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Punto Banco er den mest udbredte baccaratvariant og den version, du finder på alle danske online casinoer. Spillet bruger 6–8 standard kortspil. Kortværdier: Es = 1, 2–9 = pålydende, 10/J/Q/K = 0. Håndens værdi er summen af kortene modulo 10 (kun sidste ciffer tæller). Mål: opnå en håndværdi tættest på 9.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Spillets gang: (1) Du placerer din indsats på Player, Banker eller Tie. (2) Dealeren uddeler to kort til Player og to til Banker. (3) Hvis en side har 8 eller 9 ("natural"), afsluttes runden straks. (4) Ellers bestemmer tredje-kort-reglen automatisk, om flere kort trækkes. (5) Siden tættest på 9 vinder. Player betaler 1:1, Banker betaler 1:1 minus 5 % kommission, Tie betaler typisk 8:1.</p>
          <p className="text-muted-foreground leading-relaxed">Tredje-kort-reglerne for Player er simple: træk kort på 0–5, stå på 6–7. For Banker er reglerne mere komplekse og afhænger af Players tredje kort. Eksempel: Banker med 3 trækker, medmindre Players tredje kort var en 8. Banker med 5 trækker, hvis Players tredje kort var 4, 5, 6 eller 7. Alle disse regler er automatiserede online – du behøver ikke memorisere dem.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Væddemål og House Edge</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><ShieldCheck className="h-5 w-5 text-primary" />Banker (Banco)</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">House edge: 1,06 %. Udbetaling: 1:1 minus 5 % kommission. Det statistisk bedste væddemål. Vinder 45,86 % af hænder.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Target className="h-5 w-5 text-primary" />Player (Punto)</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">House edge: 1,24 %. Udbetaling: 1:1 (ingen kommission). Vinder 44,62 % af hænder. Et acceptabelt alternativ.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Zap className="h-5 w-5 text-primary" />Tie (Uafgjort)</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">House edge: 14,36 %. Udbetaling: 8:1. Forekommer i 9,52 % af hænder. BØR UNDGÅS – forfærdelige odds.</p></CardContent></Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">Med 1,06 % house edge på Banker er baccarat et af de mest spillervenlige spil i casinoet – kun overgået af <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> med optimal strategi (0,4–0,5 %) og craps med Odds Bets. Den lave house edge, kombineret med spillets hurtige tempo, gør baccarat attraktivt for både casual spillere og high rollers. Husk dog, at den lave edge kun gælder Banker og Player – Tie-væddemålet er en "suckers bet" med over 14 % edge.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Baccarat-Varianter</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>Mini Baccarat</strong> er den mest udbredte version online og i fysiske casinoer. Reglerne er identiske med standard Punto Banco, men bordet er mindre, tempoet hurtigere, og indsatsgrænserne lavere. Ideel for nybegyndere.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>Squeeze Baccarat</strong> tilføjer en ceremoniel kortafsløring, hvor dealeren langsomt bøjer og afslører kortene – en tradition fra Macaus VIP-rum. Det påvirker ikke odds eller regler men øger spændingen markant. Tilgængelig som live casino-variant hos <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>Lightning Baccarat</strong> tilføjer RNG-genererede multiplikatorer (op til 512x) til tilfældige kort. Et 20 % gebyr på alle indsatser kompenserer for de potentielt massive udbetalinger. Volatiliteten er markant højere end standard baccarat, men grundreglerne forbliver identiske.</p>
          <p className="text-muted-foreground leading-relaxed"><strong>Speed Baccarat</strong> reducerer rundetiden til ca. 27 sekunder (vs. 48 sekunder for standard). Ingen squeeze, kortene afsløres straks. Ideelt for spillere, der foretrækker hurtig action. <strong>No Commission Baccarat</strong> fjerner den 5 % kommission på Banker-gevinster, men kompenserer ved at Banker-væddemål med en total på 6 kun betaler 0,5:1 (i stedet for 1:1).</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Live Baccarat på Danske Casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Live baccarat er den foretrukne måde at spille på for de fleste danske spillere. Med HD-streaming, professionelle dealere og multiple kameravinkler får du en autentisk VIP-oplevelse hjemmefra. De førende live casino-udbydere – <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> og <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> – tilbyder begge et bredt udvalg af baccarat-borde.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Indsatsgrænser på live baccarat varierer typisk fra 10 kr. til 500.000 kr., afhængigt af bordet. VIP-borde med højere grænser og personlig service er tilgængelige hos de bedste <Link to="/top-10-casino-online" className={linkClass}>danske casinoer</Link>. Mange borde tilbyder side bets som Player Pair, Banker Pair og Perfect Pair – disse har dog høje house edges (10–12 %) og bør generelt undgås.</p>
          <p className="text-muted-foreground leading-relaxed">Et særligt populært format er "Salon Privé" – eksklusive borde med én spiller ad gangen, højere indsatsgrænser og dedikeret dealer. Disse borde giver den mest intime og luksuriøse baccaratoplevelse tilgængelig online og er ideelle for seriøse spillere, der værdsætter privatliv og VIP-behandling.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bankroll Management og Ansvarligt Spil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Trods den lave house edge kan baccarat være volatilt, særligt i Lightning-varianter. Vi anbefaler en session-bankroll på minimum 40 gange din gennemsnitlige indsats. Med 100 kr. pr. runde bør du have mindst 4.000 kr. reserveret til sessionen.</p>
          <p className="text-muted-foreground leading-relaxed">Sæt altid tids- og tabsgrænser inden du begynder at spille. Baccarat's hurtige tempo (27–48 sekunder pr. runde) betyder, at du nemt kan spille 50–100 runder i timen. Med en house edge på 1,06 % og 100 kr. indsats pr. runde forventes et statistisk tab på ca. 106 kr. i timen. Husk, at dette er et gennemsnit – variansen kan føre til både store gevinster og tab. <Link to="/responsible-gaming" className={linkClass}>Ansvarligt spil</Link> er altid fundamentet for en bæredygtig spiloplevelse.</p>
        </section>

        <Separator className="my-10" />

        <InlineCasinoCards title="Bedste Casinoer til Baccarat" count={4} />

        <RelatedGuides currentPath="/casinospil/baccarat" />

        <FAQSection faqs={baccaratFaqs} />
      </div>
    </>
  );
};

export default BaccaratGuide;
