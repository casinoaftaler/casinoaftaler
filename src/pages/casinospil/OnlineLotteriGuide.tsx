import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { type ReactNode } from "react";
import { User, CalendarDays, BookOpen, Target, ShieldCheck, BarChart3, Sparkles, Trophy, Zap, Layers, Ticket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import lotteriHero from "@/assets/heroes/online-lotteri-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const lotteriFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Er online lotteri lovligt i Danmark?",
    answer: (
      <>
        Ja, online lotteri er fuldt lovligt i Danmark og reguleret af den danske <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighed</Link>. Danske Spil (ejet af den danske stat) har monopol på de traditionelle lotterier som Lotto, Eurojackpot og Keno. Online casinoer med dansk licens tilbyder desuden lotteriinspirerede spil som skrabespil og nummerbaserede spil. Spillemyndighedens regulering sikrer, at alle spil er fair, at gevinster udbetales korrekt, og at spillerbeskyttelse (ROFUS, indbetalingsgrænser) er på plads. Udenlandske lotterier kan også spilles online via formidlere, men de er ikke reguleret af danske myndigheder.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på Lotto og Eurojackpot?",
    answer:
      "Lotto er Danmarks nationale lotteri med trækning onsdag og lørdag. Du vælger 7 tal ud af 36 plus 1 Jokertal. Førstepræmien kræver 7 rigtige tal og varierer typisk fra 2–30 millioner kr. Odds for førstepræmien: ca. 1:8,3 millioner. Eurojackpot er et europæisk lotteri med deltagelse fra 18+ lande. Du vælger 5 tal ud af 50 plus 2 Euronumre ud af 12. Førstepræmien kan nå op til 120 millioner euro (ca. 900 millioner kr.). Odds for førstepræmien: ca. 1:139,8 millioner – markant sværere end Lotto. Eurojackpot har trækning tirsdag og fredag. Den langt større præmiepulje afspejles i de sværere odds.",
  },
  {
    question: "Hvad er RTP for lotterispil sammenlignet med casinospil?",
    answer: (
      <>
        Lotterispil har generelt markant lavere RTP end casinospil. Danske Spils Lotto har en RTP på ca. 45 % (55 % house edge!). Eurojackpot ligger på ca. 50 %. Keno varierer mellem 60–75 % afhængigt af antal valgte tal. Skrabespil har typisk 55–70 % RTP. Til sammenligning har <Link to="/casinospil/spillemaskiner" className={linkClass}>spilleautomater</Link> gennemsnitligt 95–97 % RTP, <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> har 99,5 %, og <Link to="/casinospil/roulette" className={linkClass}>europæisk roulette</Link> har 97,3 %. Lotterier har dermed den højeste house edge af alle regulerede spil – men tiltrækker med livsendrende jackpots, som casinospil sjældent kan matche.
      </>
    ),
  },
  {
    question: "Hvad er Keno, og hvordan spiller man det online?",
    answer:
      "Keno er et nummerbaseret lotterispil, der minder om bingo. Du vælger typisk 1–15 tal fra 1–80. Derefter trækkes 20 tilfældige tal (via RNG online), og du vinder baseret på, hvor mange af dine valgte tal der matches. Gevinsten afhænger af antal valgte tal og antal hits. Vælger du 1 tal og rammer, betaler det typisk 3:1. Vælger du 10 tal og rammer alle 10, kan udbetalingen nå 100.000:1 eller mere. Kenos RTP varierer markant: vælg færre tal (1–4) for bedre RTP (ca. 75 %), eller flere tal (8–15) for lavere RTP men højere potentiel gevinst. Online Keno er tilgængeligt hos de fleste danske casinoer og spiller hurtigere end traditionel Keno.",
  },
  {
    question: "Hvad er online skrabespil, og er de bedre end fysiske skrabelodder?",
    answer: (
      <>
        Online skrabespil er digitale versioner af de klassiske skrabelodder. Du "skraber" virtuelle felter på din skærm og afslører symboler eller tal, der bestemmer din gevinst. Fordelene ved online skrabespil: (1) Højere RTP – typisk 60–85 % vs. 50–65 % for fysiske lodder. (2) Lavere priser – fra 2 kr. pr. lod vs. 20–50 kr. for fysiske. (3) Øjeblikkelig udbetaling – gevinster krediteres din konto med det samme. (4) Større udvalg – hundredvis af temaer og varianter. Ulemperne: ingen fysisk "skrabe-oplevelse" og risiko for at spille for hurtigt. Tjek altid RTP-værdien for det specifikke skrabespil – den varierer markant mellem titler og udbydere.
      </>
    ),
  },
  {
    question: "Kan man vinde stort på online lotteri?",
    answer:
      "Ja, men oddsen er ekstremt ugunstige sammenlignet med casinospil. Lotto-førstepræmien (7 rigtige af 36) har odds på ca. 1:8,3 millioner. Eurojackpot-førstepræmien har odds på ca. 1:139,8 millioner. Til sammenligning har en straight-up-gevinst i roulette odds på 1:37. Det matematiske forventede tab pr. krone investeret er: Lotto = 55 øre, Eurojackpot = 50 øre, skrabespil = 15–40 øre, casinospil = 1–5 øre. Lotterispil bør betragtes som underholdning med en minimal chance for en livsendrende gevinst – ikke som en investering eller en måde at tjene penge på.",
  },
  {
    question: "Hvordan spiller man ansvarligt med lotterispil?",
    answer: (
      <>
        Lotterispil kræver de samme principper for <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link> som andre former for gambling: (1) Sæt et fast budget – bestem hvor meget du vil bruge om ugen/måneden på lotterier, og hold dig til det. (2) Acceptér, at tab er forventet – med 45–50 % RTP taber du statistisk set over halvdelen af din indsats. (3) Undgå "chasing losses" – køb ikke flere lodder for at genvinde tab. (4) Brug Danske Spils indbetalingsgrænser og selvudelukkelsesværktøjer. (5) Hvis lotterispil ikke længere er underholdende, kontakt StopSpillet.dk (gratis og anonymt) eller tilmeld dig ROFUS for selvudelukkelse. Lotterier kan være addiktive pga. den asymmetriske præmiestruktur (små indsatser, potentielt enorme gevinster).
      </>
    ),
  },
];

const OnlineLotteriGuide = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: lotteriFaqs.map((faq) => ({
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
      { "@type": "ListItem", position: 3, name: "Online Lotteri", item: "https://casinoaftaler.dk/casinospil/online-lotteri" },
    ],
  };

  return (
    <>
      <SEO
        title="Online Lotteri 2026 – Guide til Lotto, Keno og Skrabespil"
        description="Komplet guide til online lotteri i Danmark. Lotto, Eurojackpot, Keno, skrabespil – odds, RTP og tips til ansvarligt spil."
        jsonLd={[faqJsonLd, breadcrumbJsonLd]}
      />

      <div className="h-16 md:h-24" style={{ background: "linear-gradient(135deg, hsl(50 70% 25%), hsl(40 60% 20%) 40%, hsl(30 80% 25%))" }} />

      <div className="container py-8 md:py-12">
        <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5"><User className="h-4 w-4" /><span>Skrevet af: <span className="font-medium text-foreground">Casinoaftaler</span></span></div>
          <div className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /><span>Opdateret: <span className="font-medium text-foreground">15-02-2026</span></span></div>
          <div className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /><span>Læsetid: <span className="font-medium text-foreground">13 Min.</span></span></div>
        </div>

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={lotteriHero} alt="Lotteribolde i tromle" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          Online Lotteri 2026 – Den Komplette Guide
        </h1>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Lotteri i Danmark – Tradition og Digitalisering</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Lotterispil har en dyb forankring i dansk kultur. Siden Danske Spil (tidligere Dansk Tipstjeneste) lancerede Lotto i 1989, har millioner af danskere deltaget i den ugentlige drøm om den store gevinst. I dag er lotterimarkedet fuldt digitaliseret – du kan købe Lotto-kuponer, skrabespil og Eurojackpot-billetter direkte fra din smartphone.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Online lotteri i Danmark dækker et bredt spektrum af spil: traditionelle nummerbaserede lotterier (Lotto, Eurojackpot), instant-win skrabespil, Keno-spil, og lotteriinspirerede casinospil. Alle reguleres af <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> og er underlagt strenge krav til fair play, spillerbeskyttelse og transparens.</p>
          <p className="text-muted-foreground leading-relaxed">Denne guide dækker alt om online lotteri i Danmark: spilletyper, odds og RTP, lovgivning, og praktiske tips til at maximere din underholdningsværdi. Vi sammenligner også lotterispil med traditionelle casinospil, så du kan træffe informerede valg om, hvor dine underholdningskroner giver mest værdi.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Danske Lotterityper</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Trophy className="h-5 w-5 text-primary" />Lotto</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Vælg 7 af 36 tal. Trækning ons + lør. Førstepræmie: 2–30+ mio. kr. Odds: 1:8,3 mio. RTP: ~45 %. Danmarks mest spillede lotteri.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Sparkles className="h-5 w-5 text-primary" />Eurojackpot</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Vælg 5 af 50 + 2 af 12. Trækning tirs + fre. Førstepræmie: op til 120 mio. €. Odds: 1:139,8 mio. RTP: ~50 %. Europas største lotteri.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Zap className="h-5 w-5 text-primary" />Keno</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Vælg 1–15 tal af 80. Trækning hver 5 min. online. Gevinst: op til 500.000 kr. RTP: 60–75 %. Hurtig og fleksibel.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Ticket className="h-5 w-5 text-primary" />Skrabespil</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Instant-win digitale lodder. Priser fra 2 kr. Gevinst: op til 2+ mio. kr. RTP: 55–85 %. Hundredvis af temaer online.</p></CardContent></Card>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Odds og RTP – Den Ærlige Matematik</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Lotterispil har den højeste house edge af alle regulerede spilformer. Lotto returnerer kun ca. 45 % af indsatserne til spillerne – resten går til præmiefonden, administration og statskassen. Til sammenligning returnerer casinospil typisk 95–99 % af indsatserne.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Det betyder dog ikke, at lotterispil er "dårlige" – de tilbyder noget, som casinospil sjældent kan: en chance for en livsendrende gevinst med en minimal indsats. En Lotto-kupon koster 50 kr. og kan potentielt vinde 30 millioner kr. Ingen casinoindsats på 50 kr. kan give det samme potentiale. Nøglen er at forstå, hvad du betaler for: underholdning og en drøm, ikke en finansiel investering.</p>
          <p className="text-muted-foreground leading-relaxed">For den mest priseffektive lotteriunderholdning anbefaler vi online skrabespil med høj RTP (70–85 %) eller Keno med 1–4 valgte tal (70–75 % RTP). Disse giver flere gevinster pr. krone investeret, selvom top-gevinsterne er lavere. Traditionelle lotterier (Lotto, Eurojackpot) bør kun spilles med beløb, du har råd til at tabe 100 % af.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Lovgivning og Regulering</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Det danske lotterimarked er reguleret af Spilleloven (Lov nr. 848 af 2012, senest ændret 2024). Danske Spil har monopol på traditionelle lotterier, sportsvæddemål og hestevæddeløb. Online casinoer med dansk licens kan tilbyde lotteriinspirerede spil (skrabespil, Keno-varianter), men ikke udbyde egne traditionelle lotterier.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> overvåger alle lotterispil og sikrer, at præmiestrukturer, odds og RTP er transparente og korrekte. Alle gevinster over 200 kr. beskattes med 15 % (gevinstafgift). Gevinster over 20.000 kr. indberettes automatisk til SKAT. Udenlandske lotterier, der ikke er licenserede i Danmark, er teknisk set ulovlige at deltage i fra dansk territorium.</p>
          <p className="text-muted-foreground leading-relaxed">Spillerbeskyttelse er strengt reguleret: alle lotterispilsudbydere skal tilbyde indbetalingsgrænser, tabsgrænser og selvudelukkelsesværktøjer. ROFUS (Register Over Frivilligt Udelukkede Spillere) dækker både lotterier og casinospil. Minimumsalderen for deltagelse er 18 år.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Online Keno – Det Hurtige Lotterispil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Keno er lotterifamiliens hurtigste medlem. Mens Lotto har trækning to gange om ugen, tilbyder online Keno trækninger hvert 5. minut – eller endda instant results med RNG-baseret Keno på casinoer. Du vælger 1–15 tal fra 1–80, og 20 tal trækkes tilfældigt.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Kenos fleksibilitet er unik: du kontrollerer din risikoprofil ved at vælge, hvor mange tal du spiller. Færre tal = højere vindchance pr. tal, lavere potentiel gevinst. Flere tal = lavere vindchance, højere potentiel gevinst. Med 1 tal rammet har du 25 % chance og typisk 3:1 udbetaling. Med 10 af 10 rammet er sandsynligheden 1:8,9 millioner men udbetalingen kan nå 100.000:1.</p>
          <p className="text-muted-foreground leading-relaxed">RTP varierer betydeligt baseret på antal valgte tal og casinoets specifikke udbetalingstabel. Generelt er RTP højest med 1–4 valgte tal (70–75 %) og lavest med 8+ valgte tal (60–65 %). Vi anbefaler at tjekke den specifikke udbetalingstabel og beregne RTP, før du spiller – eller bruge casinoversioner med offentliggjort RTP-information.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Skrabespil Online – Instant Underholdning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Online skrabespil har oplevet en eksplosiv vækst de seneste år. De digitale versioner tilbyder markant bedre RTP end fysiske skrabelodder (65–85 % vs. 50–65 %), lavere indsatser (fra 2 kr. vs. 20 kr.), og øjeblikkelig udbetaling. Hundredvis af temaer er tilgængelige – fra simple "match tre" til avancerede interaktive spil med bonusrunder.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">De bedste online skrabespil har RTP på 80–85 %, hvilket gør dem sammenlignelige med visse <Link to="/casinospil/spillemaskiner" className={linkClass}>spilleautomater</Link>. Dog er variansen høj – topgevinsten udløses sjældent, og de fleste lodder giver enten intet eller et lille beløb. Vælg skrabespil med publiceret RTP og foretræk spil fra anerkendte udbydere.</p>
          <p className="text-muted-foreground leading-relaxed">En vigtig advarsel: online skrabespils hurtige tempo (du kan "skrabe" et lod på 5 sekunder) gør dem potentielt vanedannende. Sæt altid en grænse for, hvor mange lodder du køber pr. session, og hold dig til den. Brug casinoets indbetalingsgrænser og overvej at sætte session-timers for at kontrollere dit forbrug.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Tips til Ansvarligt Lotterispil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Lotterispil bør altid betragtes som underholdning – aldrig som en investeringsstrategi eller en vej til rigdom. Med 45–50 % RTP for traditionelle lotterier taber du statistisk set over halvdelen af din indsats. Her er vores anbefalinger til ansvarligt lotterispil:</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>Sæt et fast månedligt budget</strong> til lotterispil og hold dig til det. En god tommelfingerregel: brug aldrig mere end 1 % af din månedlige indkomst på lotterier. <strong>Undgå "systemer"</strong> – der er ingen talsekvenser, astrologiske tegn eller "lykketal", der øger dine odds. Hvert tal har præcis den samme sandsynlighed for at blive trukket. <strong>Spil for sjov</strong> – nyd drømmen om den store gevinst, men forvent det aldrig.</p>
          <p className="text-muted-foreground leading-relaxed">Hvis du oplever, at lotterispil begynder at påvirke din økonomi, dine relationer eller dit velvære, så søg hjælp. <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className={linkClass}>StopSpillet.dk</a> tilbyder gratis og anonym rådgivning. Du kan også tilmelde dig <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a> for midlertidig eller permanent selvudelukkelse fra alle danske spilsider.</p>
        </section>

        <Separator className="my-10" />

        <FAQSection faqs={lotteriFaqs} />

        <RelatedGuides currentPath="/casinospil/online-lotteri" />
      </div>
    </>
  );
};

export default OnlineLotteriGuide;
