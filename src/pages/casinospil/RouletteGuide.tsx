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
import rouletteHero from "@/assets/heroes/roulette-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const rouletteFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er forskellen på europæisk og amerikansk roulette?",
    answer: (
      <>
        Den vigtigste forskel ligger i antallet af nulfelter. Europæisk roulette har ét nulfelt (0), hvilket giver 37 felter i alt og en house edge på 2,7 %. Amerikansk roulette har to nulfelter (0 og 00), hvilket giver 38 felter og en house edge på 5,26 % – næsten det dobbelte. Begge versioner tilbyder de samme væddemålstyper (rød/sort, lige/ulige, kolonner, straight up osv.), men udbetalingerne forbliver identiske trods den ekstra lomme. Det betyder, at du altid bør vælge europæisk roulette, når muligheden byder sig. Den franske version med La Partage-reglen reducerer house edge yderligere til 1,35 % på lige-penge-væddemål.
      </>
    ),
  },
  {
    question: "Hvad er indre og ydre væddemål i roulette?",
    answer:
      "Indre væddemål (inside bets) placeres direkte på tal eller grupper af tal på roulettebordet: Straight Up (ét tal, 35:1), Split (to tal, 17:1), Street (tre tal, 11:1), Corner (fire tal, 8:1) og Line (seks tal, 5:1). Ydre væddemål (outside bets) dækker større grupper: Rød/Sort, Lige/Ulige, Høj/Lav (alle 1:1), Dusinvis og Kolonner (begge 2:1). Indre væddemål har højere udbetaling men lavere vindchance, mens ydre væddemål tilbyder mere konsistente, men mindre gevinster. House edge forbliver den samme uanset væddemålstype på europæisk roulette (2,7 %).",
  },
  {
    question: "Hvad er La Partage og En Prison reglerne?",
    answer: (
      <>
        La Partage og En Prison er specialregler, der kun gælder i fransk roulette og udelukkende påvirker lige-penge-væddemål (rød/sort, lige/ulige, høj/lav). Ved La Partage returneres halvdelen af din indsats automatisk, hvis kuglen lander på 0. Ved En Prison "fængsles" din indsats i stedet – den forbliver på bordet til næste spin. Lander kuglen derefter på dit væddemål, får du hele indsatsen tilbage (men ingen gevinst). Begge regler reducerer house edge fra 2,7 % til 1,35 % på lige-penge-væddemål, hvilket gør fransk roulette til den mest spillervenlige variant. Disse regler er tilgængelige på mange <Link to="/live-casino" className={linkClass}>live casino</Link>-borde.
      </>
    ),
  },
  {
    question: "Kan man slå casinoet i roulette med en strategi?",
    answer: (
      <>
        Nej, ingen væddemålsstrategi kan overvinde roulettens matematiske edge på lang sigt. Strategier som Martingale, D'Alembert og Fibonacci kan påvirke kort-tids gevinstmønstre – fx hyppigere små gevinster med sjældnere store tab – men den forventede værdi forbliver negativ uanset system. Roulettehjulet har ingen hukommelse; hvert spin er 100 % uafhængigt. "Gamblers fallacy" – troen på, at rød er "skyldig" efter ti sorte – er en matematisk fejlslutning. Det eneste, du kan gøre for at optimere dine odds, er at vælge den rigtige variant (fransk roulette med La Partage) og sætte <Link to="/responsible-gaming" className={linkClass}>faste grænser</Link> for tid og penge.
      </>
    ),
  },
  {
    question: "Hvad er Lightning Roulette?",
    answer: (
      <>
        Lightning Roulette er en innovativ live casino-variant udviklet af <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>, der blander standard europæisk roulette med RNG-drevne multiplikatorer. Før hvert spin rammes 1–5 tilfældige tal af "lynnedslag", som giver dem multiplikatorer mellem 50x og 500x. For at kompensere er standard straight-up-udbetalingen reduceret fra 35:1 til 29:1. Ydre væddemål (rød/sort osv.) påvirkes ikke af lightning-funktionen. House edge er ca. 2,7 % generelt, men volatiliteten stiger markant. Lightning Roulette er ideel for spillere, der søger stor potentiel gevinst med høj underholdningsværdi.
      </>
    ),
  },
  {
    question: "Hvad er de bedste roulette-varianter på danske casinoer?",
    answer: (
      <>
        De bedste roulette-varianter rangeres efter house edge: Fransk roulette med La Partage (1,35 % på lige-penge-væddemål) er klart den bedste. Europæisk roulette (2,7 %) er den næstbedste og mest udbredte variant. Undgå altid amerikansk roulette (5,26 %). Blandt live-formater anbefaler vi Auto Roulette (hurtige runder uden dealer), Immersive Roulette (cinematisk slow-motion replay af kuglen) og Speed Roulette (nye runder hvert 25. sekund). For variation med høj underholdningsværdi er Lightning Roulette og XXXTreme Lightning Roulette populære valg. Alle danske licenserede casinoer tilbyder minimum europæisk roulette.
      </>
    ),
  },
  {
    question: "Er online roulette fair og tilfældig?",
    answer: (
      <>
        Ja, alle roulettespil på danske licenserede casinoer er certificeret fair og tilfældige. RNG-baseret roulette bruger en Random Number Generator, der er testet af uafhængige laboratorier som eCOGRA og iTech Labs. Live roulette bruger fysiske hjul og kugler, filmet i realtid – resultaterne er genuint tilfældige og baseret på fysik. Den danske <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighed</Link> kræver regelmæssige audits af alle spil, og enhver manipulation ville medføre øjeblikkelig licensinddragelse. Du kan verificere et casinos licens på Spillemyndighedens hjemmeside for ekstra tryghed.
      </>
    ),
  },
];

const RouletteGuide = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: rouletteFaqs.map((faq) => ({
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
      { "@type": "ListItem", position: 3, name: "Roulette", item: "https://casinoaftaler.dk/casinospil/roulette" },
    ],
  };

  return (
    <>
      <SEO
        title="Roulette Regler 2026 – Komplet Guide til Online Roulette"
        description="Lær roulette regler, væddemålstyper og varianter. Europæisk vs. amerikansk, La Partage, Lightning Roulette og tips til danske online casinoer."
        jsonLd={[faqJsonLd, breadcrumbJsonLd]}
      />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Februar 2026</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Roulette Regler 2026</h1>
            <p className="text-lg text-white/80">Guide til væddemål, odds og varianter – din komplette roulette-guide.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5"><User className="h-4 w-4" /><span>Skrevet af: <span className="font-medium text-foreground">Casinoaftaler</span></span></div>
          <div className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /><span>Opdateret: <span className="font-medium text-foreground">15-02-2026</span></span></div>
          <div className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /><span>Læsetid: <span className="font-medium text-foreground">14 Min.</span></span></div>
        </div>

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={rouletteHero} alt="Roulettehjul med kugle" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Roulettens Fascinerende Verden</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Roulette er casinoverdenens mest ikoniske spil – et roterende hjul, en hoppende kugle og den uimodståelige spænding ved at vente på, hvor den lander. Spillets oprindelse dateres til 1700-tallets Frankrig, hvor den legendariske matematiker Blaise Pascal angiveligt bidrog til hjulets design under sine eksperimenter med perpetuum mobile-maskiner. Navnet "roulette" betyder "lille hjul" på fransk, og spillet har bevaret sin elegance og mystik gennem næsten 300 år.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det europæiske roulettehjul har 37 lommer nummereret 0–36, arrangeret i en specifik rækkefølge, der sikrer en jævn fordeling af høje/lave, ulige/lige og røde/sorte tal. Nulfeltet (grønt) repræsenterer casinoets matematiske fordel. Det amerikanske hjul tilføjer et ekstra nulfelt (00), hvilket næsten fordobler house edge. Hjulets design er ikke tilfældigt – nummereringen er omhyggeligt udvalgt, så tilstødende tal altid skifter mellem rød og sort, og summen af tal i hver sektion er så tæt på ensartet som muligt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Roulette er kernen i kategorien <Link to="/casinospil" className={linkClass}>casinospil</Link> – se vores fulde oversigt for flere klassikere. Du kan også teste roulette-strategier risikofrit i vores <Link to="/community/slots" className={linkClass}>gratis spilområde</Link> før du spiller for rigtige penge.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I dag oplever roulette en renæssance takket være live casino-teknologi. Du kan spille roulette med en professionel dealer i realtid fra din stue, med kameravinkler, der viser kuglen i slow motion og close-up. Varianter som Lightning Roulette og Immersive Roulette har tilføjet nye dimensioner til det klassiske spil, mens grundreglerne forbliver trofaste mod originalen.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Roulettens Væddemålstyper</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Roulette tilbyder et bredt spektrum af væddemål, der spænder fra konservative lige-penge-bets til risikable enkelttalsvæddemål. Alle væddemål kan kategoriseres i to grupper: indre væddemål (placeret direkte på tallene) og ydre væddemål (placeret på de store felter uden for tallene).
          </p>

          <h3 className="mb-3 text-xl font-semibold flex items-center gap-2"><Target className="h-5 w-5 text-primary" />Indre Væddemål</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Straight Up (35:1):</strong> Væddemål på ét enkelt tal. Vinderchance: 2,7 % (europæisk). Det er det mest risikable men også mest lukrative væddemål. <strong>Split (17:1):</strong> Væddemål på to tilstødende tal ved at placere chippen på linjen mellem dem. <strong>Street (11:1):</strong> Dækker tre tal i en vandret række. <strong>Corner/Square (8:1):</strong> Dækker fire tal, der mødes i et hjørne. <strong>Six Line (5:1):</strong> Dækker to tilstødende rækker (seks tal). Indre væddemål tiltrækker spillere, der søger store udbetalinger og accepterer højere risiko.
          </p>

          <h3 className="mb-3 text-xl font-semibold flex items-center gap-2"><Layers className="h-5 w-5 text-primary" />Ydre Væddemål</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Rød/Sort, Lige/Ulige, Høj/Lav (1:1):</strong> Dækker næsten halvdelen af tallene (18 af 37) og giver den højeste vindchance: 48,6 %. <strong>Dusinvis (2:1):</strong> Væddemål på 1–12, 13–24 eller 25–36 (12 tal). <strong>Kolonner (2:1):</strong> Dækker 12 tal i en vertikal kolonne på bordet. Ydre væddemål er ideelle for konservative spillere og strategier som Martingale, da de tilbyder hyppige, men mindre gevinster.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><BarChart3 className="h-5 w-5 text-primary" />Europæisk Roulette</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">37 lommer (0–36). House edge: 2,7 %. Den anbefalede standardvariant for alle spillere.</p></CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Sparkles className="h-5 w-5 text-primary" />Fransk Roulette</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">37 lommer med La Partage/En Prison. House edge: 1,35 % på lige-penge-bets. Det bedste valg.</p></CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Zap className="h-5 w-5 text-primary" />Amerikansk Roulette</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">38 lommer (0, 00, 1–36). House edge: 5,26 %. Bør undgås pga. markant højere edge.</p></CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Roulette-Varianter på Danske Casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Udover de tre klassiske varianter (europæisk, fransk, amerikansk) tilbyder moderne online casinoer en lang række innovative roulette-formater. <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> dominerer live-markedet med varianter, der tilføjer spænding uden at ændre grundreglerne.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Immersive Roulette</strong> bruger multiple HD-kameravinkler og automatisk slow-motion replay af kuglens sidste omgang. Oplevelsen er cinematisk og giver dig en fornemmelse af at sidde ved bordet. <strong>Speed Roulette</strong> skærer ventetiden ned – en ny runde starter hvert 25. sekund i stedet for det sædvanlige minut, hvilket passer til spillere, der foretrækker hurtig action.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Lightning Roulette</strong> introducerer RNG-baserede multiplikatorer (50x–500x) på tilfældige straight-up-numre. <strong>XXXTreme Lightning Roulette</strong> tager konceptet videre med dobbelte og tredobbelte lynnedslag, der kan give op til 2.000x multiplikatorer. <strong>Auto Roulette</strong> kører uden dealer med automatisk kuglekast, hvilket giver den hurtigste spiloplevelse. <strong>Dual Play Roulette</strong> forbinder online spillere med et fysisk casinobord i realtid.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Quantum Roulette</strong> fra <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> tilbyder en konkurrerende multiplier-mekanik med op til 500x. <strong>Mega Roulette</strong> bruger lignende koncepter men med en anden visuel stil. Uanset variant bør du altid kontrollere, om spillet bruger europæisk (1 nul) eller amerikansk (2 nuller) layout, og om La Partage-reglen gælder. Disse faktorer har langt større indflydelse på dine odds end selve spillets tema.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Roulettens Matematik og Odds</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Roulette er et rent tilfældighedsspil – intet væddemål, strategi eller system kan ændre den matematiske fordel, som casinoet har. Hvert spin er uafhængigt, og hjulet har ingen hukommelse. Alligevel er det vigtigt at forstå sandsynlighederne for at træffe informerede beslutninger om dine væddemål.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            På europæisk roulette er sandsynligheden for at ramme ét specifikt tal 1/37 (2,7 %). For rød/sort er sandsynligheden 18/37 (48,6 %) – ikke 50 %, fordi nulfeltet tæller hverken som rødt eller sort. Udbetalingerne er beregnet, som om der kun var 36 tal (35:1 for straight up, 17:1 for split osv.), men der er faktisk 37 – og det er præcis denne diskrepans, der skaber casinoets edge.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den forventede værdi (EV) af ethvert væddemål på europæisk roulette er -2,7 % af din indsats. For en 100 kr. indsats er EV = -2,70 kr. Over 1.000 spins med 100 kr. indsats pr. runde forventes et tab på ca. 2.700 kr. – men variansen er høj, så det faktiske resultat kan afvige betydeligt i begge retninger. Læs vores <Link to="/casinospil/roulette-strategi" className={linkClass}>roulette strategi-guide</Link> for en dybdegående analyse af væddemålssystemer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Bankroll management er afgørende i roulette. For ydre væddemål (rød/sort) anbefaler vi en bankroll på mindst 30 gange din indsats pr. session. For indre væddemål (straight up) bør du have minimum 50–100 gange indsatsen, da variansen er markant højere. Sæt altid et tabsbudget og en tidsgrænse, og hold dig til det – uanset om du vinder eller taber. <Link to="/responsible-gaming" className={linkClass}>Ansvarligt spil</Link> er fundamentet for en bæredygtig spiloplevelse.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Live Roulette – Den Autentiske Oplevelse</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Live roulette har transformeret online casinospil ved at bringe den fysiske casinoatmosfære direkte ind i din stue. Med HD-streaming, professionelle dealere og multiple kameravinkler kan du følge kuglens rejse i realtid og interagere med dealeren via chat. De førende udbydere er <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> og <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>, der begge tilbyder eksklusive danske live-borde.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fordelen ved live roulette er autenticitet – du kan se det fysiske hjul og kugle, hvilket eliminerer enhver tvivl om tilfældighed. Ulempen er langsommere spilletempo sammenlignet med RNG-roulette. Typisk tager en live roulette-runde 60–90 sekunder, mens RNG-roulette kan klares på 10 sekunder. Vælg live roulette, når du søger oplevelse og atmosfære; vælg RNG-roulette, når du prioriterer hastighed og effektivitet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Ved valg af live roulette-bord bør du overveje indsatsgrænserne, sproget (mange danske casinoer tilbyder skandinavisktalende dealere), og bordets specifikke regler. Husk, at live roulette typisk kun tilbyder europæisk layout, men La Partage-reglen varierer mellem borde. Du finder live roulette på alle <Link to="/top-10-casino-online" className={linkClass}>top-rangerede danske casinoer</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Tips til Roulette på Danske Online Casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Selvom roulette fundamentalt er et tilfældighedsspil, kan du optimere din oplevelse og minimere tab med smarte valg. Her er vores konkrete anbefalinger til danske spillere:
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Vælg altid europæisk eller fransk roulette.</strong> Den ekstra lomme i amerikansk roulette fordobler næsten house edge uden at tilbyde bedre udbetalinger. Fransk roulette med La Partage giver dig den bedste værdi med kun 1,35 % house edge på lige-penge-væddemål. <strong>Undgå "Five Number Bet"</strong> på amerikansk roulette (0, 00, 1, 2, 3) – dette væddemål har en house edge på hele 7,89 %, det højeste i roulette.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Forstå forskellen mellem session-varians og langsigtet edge.</strong> Du kan sagtens vinde i en enkelt session – det er netop variansen, der gør roulette spændende. Men over tid vil casinoets edge altid manifestere sig. <strong>Kombiner roulette med <Link to="/casino-bonus" className={linkClass}>casinobonusser</Link></strong> – mange bonusser tillader bordspil, omend med reduceret bidrag til omsætningskrav (typisk 10–20 % for roulette vs. 5 % for <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>).
          </p>
        </section>

        <Separator className="my-10" />

        <InlineCasinoCards title="Bedste Casinoer til Roulette" count={4} />

        <RelatedGuides currentPath="/casinospil/roulette" />

        <FAQSection faqs={rouletteFaqs} />
      </div>
    </>
  );
};

export default RouletteGuide;
