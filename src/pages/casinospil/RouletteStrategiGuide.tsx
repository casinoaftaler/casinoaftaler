import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { AuthorBio } from "@/components/AuthorBio";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { User, CalendarDays, BookOpen, Target, ShieldCheck, BarChart3, Sparkles, Trophy, Zap, Layers, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import rouletteStrategiHero from "@/assets/heroes/roulette-strategi-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const strategiFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Virker Martingale-strategien i roulette?",
    answer: "Martingale kræver, at du fordobler indsatsen efter hvert tab og returnerer til basisindsatsen efter en gevinst. Teorien er, at du altid genvinder alle tab plus en enhed. I praksis fungerer det på kort sigt – du vinder ofte – men katastrofale tab er uundgåelige. Efter 10 tab i træk (sandsynlighed ca. 1:784 pr. session med mange spins) skal du satse 1.024x din basisindsats. Med 100 kr. startindsats er det 102.400 kr. – langt over de fleste bordsgrænser. Martingale ændrer ikke den matematiske house edge; den omfordeler risiko fra mange små tab til sjældne, massive tab. Over tid taber du præcis det samme som med flat betting.",
  },
  {
    question: "Hvad er D'Alembert-strategien?",
    answer: (
      <>
        D'Alembert er en konservativ progressiv strategi opkaldt efter den franske matematiker Jean le Rond d'Alembert. I stedet for at fordoble (som Martingale) øger du indsatsen med én enhed efter tab og reducerer med én enhed efter gevinst. Eksempel med 10 kr. base: tab → 20 kr., tab → 30 kr., vind → 20 kr., vind → 10 kr. Fordelen er langsommere eskalering og lavere risiko for at ramme bordgrænsen. Ulempen er, at systemet stadig ikke ændrer roulettens matematiske edge (2,7 % for europæisk <Link to="/casinospil/roulette" className={linkClass}>roulette</Link>). D'Alembert fungerer bedst som bankroll management-værktøj, der giver en mere stabil spiloplevelse end flat betting.
      </>
    ),
  },
  {
    question: "Hvad er Fibonacci-systemet i roulette?",
    answer:
      "Fibonacci-systemet bruger den berømte matematiske sekvens (1, 1, 2, 3, 5, 8, 13, 21, 34...) til at bestemme indsatsstørrelsen. Du starter fra begyndelsen af sekvensen, rykker ét trin fremad efter tab og to trin tilbage efter gevinst. Eksempel med 10 kr. enhed: 10, 10, 20, 30, 50, 80, 130... Fordelen sammenlignet med Martingale er langsommere eskalering – efter 10 tab er din indsats 'kun' 89 enheder vs. 1.024. Ulempen er, at du behøver flere gevinster end tab for at nulstille sekvensen. Fibonacci giver en interessant spillestruktur og bedre bankroll management, men kan ikke overvinde casinoets matematiske fordel.",
  },
  {
    question: "Hvad er Labouchère-systemet?",
    answer:
      "Labouchère (også kaldet 'cancellation system') er en negativ progressiv strategi. Du starter med en talrække, fx 1-2-3-4-5 (repræsenterer enheder). Din indsats er summen af første og sidste tal i rækken (1+5=6 enheder). Ved gevinst fjerner du de to ydre tal (rækken bliver 2-3-4). Ved tab tilføjer du den tabte indsats til enden (1-2-3-4-5-6). Målet er at eliminere alle tal – herefter har du profiteret summen af den originale række (1+2+3+4+5=15 enheder). Labouchère giver dig kontrol over din potentielle gevinst, men tabsserier kan eskalere rækken hurtigt. Det er et af de mest komplekse systemer og kræver noteredskaber.",
  },
  {
    question: "Kan sektorvæddemål give en fordel i roulette?",
    answer: (
      <>
        Sektorvæddemål (neighbours/voisins) dækker grupper af fysisk tilstødende numre på hjulet – fx Voisins du Zéro (17 tal omkring 0) eller Orphelins (8 tal). I <Link to="/live-casino" className={linkClass}>live roulette</Link> med fysisk kugle kan der teoretisk eksistere "biased wheels" (hjul med ubalancer), der favoriserer bestemte sektorer. I praksis overvåger casinoer deres hjul nøje, og online RNG-roulette har ingen fysisk bias. Sektorvæddemål ændrer ikke house edge men kan tilføje en tematisk dimension til dit spil. De er populære blandt erfarne spillere, der nyder den taktiske fornemmelse, selvom den matematiske fordel er nul.
      </>
    ),
  },
  {
    question: "Hvad er den bedste roulette-strategi for begyndere?",
    answer: (
      <>
        For begyndere anbefaler vi en simpel tilgang: (1) Vælg altid europæisk eller fransk roulette – aldrig amerikansk. (2) Brug flat betting (samme indsats pr. spin) på ydre væddemål (rød/sort, lige/ulige). (3) Sæt et budget og en tidsgrænse inden du starter. (4) Stop når du har nået din tabsgrænse ELLER har fordoblet din startbankroll. Denne tilgang minimerer risiko, forlænger din spilletid og giver den bedste underholdningsværdi. Avancerede systemer som Martingale eller Fibonacci kan tilføje struktur, men de ændrer ikke dine langsigtede odds. Husk: roulette er underholdning, og <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> kommer altid først.
      </>
    ),
  },
  {
    question: "Er der roulette-myter, man bør kende til?",
    answer:
      "De mest udbredte myter: (1) 'Gambler's fallacy' – troen på at rød er 'skyldig' efter mange sorte. Hvert spin er uafhængigt; hjulet har ingen hukommelse. (2) 'Hot/cold numbers' – at visse tal er 'varme' eller 'kolde'. Over millioner af spins vil alle tal forekomme lige ofte. (3) 'Dealerens signatur' – at live dealere kaster kuglen med konsistent kraft. Moderne hjul har anti-bias-mekanismer. (4) 'Progressions slår casinoet' – intet væddemålssystem kan overvinde matematikken. (5) 'Mere erfaring = bedre odds' – roulette har ingen strategisk komponent; erfaring ændrer ikke sandsynligheder. At forstå disse myter beskytter dig mod dyre fejltagelser.",
  },
];

const RouletteStrategiGuide = () => {
  const faqJsonLd = buildFaqSchema(strategiFaqs);
  const articleSchema = buildArticleSchema({ headline: "Roulette Strategi 2026 – Martingale, Fibonacci og Mere", description: "Komplet guide til roulette-strategier: Martingale, D'Alembert, Fibonacci, Labouchère og sektorvæddemål. Matematisk analyse og tips.", url: `${SITE_URL}/casinospil/roulette-strategi`, datePublished: "2026-02-15", dateModified: "2026-02-15", authorName: "Jonas", authorUrl: `${SITE_URL}/forfatter/jonas` });

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: "https://casinoaftaler.dk/" },
      { "@type": "ListItem", position: 2, name: "Casinospil", item: "https://casinoaftaler.dk/casinospil" },
      { "@type": "ListItem", position: 3, name: "Roulette Strategi", item: "https://casinoaftaler.dk/casinospil/roulette-strategi" },
    ],
  };

  return (
    <>
      <SEO
        title="Roulette Strategi 2026 – Martingale, Fibonacci og Mere"
        description="Komplet guide til roulette-strategier: Martingale, D'Alembert, Fibonacci, Labouchère og sektorvæddemål. Matematisk analyse og tips til danske spillere."
        jsonLd={[faqJsonLd, breadcrumbJsonLd, articleSchema]}
      />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Februar 2026</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Roulette Strategi 2026</h1>
            <p className="text-lg text-white/80">Martingale, Fibonacci og matematisk analyse – den komplette strategi-guide.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="15-02-2026" readTime="15 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={rouletteStrategiHero} alt="Roulette strategi med chips og matematiske formler" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Kan Man Slå Roulettehjulet?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Lad os starte med den ubehagelige sandhed: ingen væddemålsstrategi kan overvinde roulettens matematiske edge på lang sigt. Europæisk <Link to="/casinospil/roulette" className={linkClass}>roulette</Link> har en uafviselig house edge på 2,7 % (1,35 % med La Partage), og intet mønster, system eller ritual kan ændre dette. Hvert spin er uafhængigt, og kuglen har ingen hukommelse.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Men det betyder ikke, at strategier er meningsløse. Væddemålssystemer kan give struktur til dit spil, hjælpe med bankroll management og ændre dit risikomønster (mange små gevinster vs. sjældne store tab). At forstå matematikken bag hver strategi gør dig til en bedre informeret spiller og beskytter dig mod overdrevne forventninger.</p>
          <p className="text-muted-foreground leading-relaxed">Denne guide analyserer de seks mest populære roulette-strategier matematisk – med forventet værdi, risikoprofiler og praktiske simuleringer. Vi afslører styrker og svagheder ved hvert system, så du kan træffe et informeret valg om, hvordan du strukturerer dit spil.</p>
        </section>

        <InlineCasinoCards title="Bedste Casinoer til Roulette" count={4} />

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Martingale-Strategien</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>Princip:</strong> Fordobl indsatsen efter hvert tab. Return til basisindsatsen efter en gevinst. Bruges på lige-penge-væddemål (rød/sort, lige/ulige).</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>Eksempel:</strong> Base: 50 kr. Tab → 100 kr. Tab → 200 kr. Tab → 400 kr. Vind → du genvinder alle 750 kr. i tab plus 50 kr. profit. Total investering: 750 kr. Total retur: 800 kr. Profit: 50 kr. (din originale basisindsats).</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>Matematik:</strong> Sandsynlighed for at tabe N gange i træk på europæisk roulette (rød/sort): 2 tab = 26,4 %, 5 tab = 3,56 %, 8 tab = 0,48 %, 10 tab = 0,13 %, 15 tab = 0,004 %. Problemet: efter 10 tab med 50 kr. base er indsatsen 51.200 kr. – langt over de fleste bordgrænser (typisk 5.000–50.000 kr.). Med 5.000 kr. grænse kan du højst fordoble 6 gange (3.200 kr.) før systemet bryder sammen.</p>
          <p className="text-muted-foreground leading-relaxed"><strong>Vurdering:</strong> Martingale giver en illusion af sikkerhed – du vinder ofte, men tabene er katastrofale. Over 1.000 sessioner med 100 spins pr. session taber Martingale-spilleren præcis det samme som flat-betting-spilleren: 2,7 % af samlet indsats. Risikoprofilen er blot omvendt: mange små gevinster, sjældne massive tab.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Omvendt Martingale (Paroli)</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>Princip:</strong> Fordobl indsatsen efter hver gevinst (i stedet for efter tab). Return til basisindsatsen efter tab eller efter at have nået et gevinst-mål (typisk 3 konsekutive gevinster).</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>Eksempel:</strong> Base: 50 kr. Vind → 100 kr. Vind → 200 kr. Vind → tag profit (350 kr. netto) og start forfra. Tab på noget tidspunkt → return til 50 kr. med kun ét tab.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>Matematik:</strong> Sandsynlighed for 3 konsekutive gevinster på rød/sort: (18/37)³ = 11,5 %. Med 3-gevinst-mål profiterer du 350 kr. (7 enheder) ca. hver 8,7 forsøg. Mellemtiden taber du 50 kr. pr. fejlet forsøg. Forventet værdi pr. komplet cyklus: (0,115 × 350) – (0,885 × 50) = 40,25 – 44,25 = -4,00 kr. Stadig negativt, men tabene er begrænsede til basisindsatsen.</p>
          <p className="text-muted-foreground leading-relaxed"><strong>Vurdering:</strong> Paroli er det inverse af Martingale – du risikerer casinoets penge i stedet for dine egne. Tabene er altid begrænset til én enhed, og gevinsterne kan være markante. Det er en mere konservativ tilgang med lavere varians end standard Martingale og anbefales til spillere, der foretrækker kontrolleret risiko.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">D'Alembert og Fibonacci</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>D'Alembert:</strong> Øg indsatsen med én enhed efter tab, reducér med én enhed efter gevinst. Langt langsommere eskalering end Martingale. Med 10 kr. enhed og 5 tab i træk er indsatsen 60 kr. (vs. 320 kr. med Martingale). Systemet søger "balance" over tid og kræver, at antal gevinster og tab er nogenlunde ens – hvilket de statistisk vil være. Varians er moderat, og bankroll-kravene er overkommelige.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>Fibonacci:</strong> Følger sekvensen 1, 1, 2, 3, 5, 8, 13, 21... Ryk ét trin frem efter tab, to trin tilbage efter gevinst. Med 10 kr. enhed og 8 tab i træk er indsatsen 210 kr. (vs. 2.560 kr. med Martingale). Fibonacci eskalerer langsommere men kræver flere gevinster for at nulstille. Det giver en elegant matematisk struktur til dit spil.</p>
          <p className="text-muted-foreground leading-relaxed"><strong>Sammenligning:</strong> Begge systemer har identisk forventet værdi (-2,7 % af total indsats) men forskellige risikomønstre. D'Alembert er mere lineær, Fibonacci mere eksponentiel. For begyndere anbefaler vi D'Alembert pga. simplicitet; for matematisk orienterede spillere tilbyder Fibonacci en mere interessant struktur.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Labouchère og James Bond-Strategien</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>Labouchère:</strong> Start med en talrække (fx 1-2-3-4-5). Indsats = summen af første og sidste tal. Gevinst: fjern de to ydre tal. Tab: tilføj den tabte indsats til enden. Mål: eliminer alle tal for en profit lig summen af den originale række. Det mest fleksible system – du bestemmer selv startsekvensen og dermed din risiko/reward-profil.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>James Bond-Strategien:</strong> En flat-bet-strategi med 200 kr. total fordelt på tre væddemål: 140 kr. på 19–36 (høj), 50 kr. på six-line 13–18, og 10 kr. på 0. Dækker 25 af 37 tal (67,6 %). Gevinster: 19–36 giver 80 kr. profit, 13–18 giver 100 kr. profit, 0 giver 160 kr. profit. Tab (1–12): -200 kr. Systemet taber 32,4 % af gangene, men giver store gevinster resten. EV: -5,40 kr. pr. 200 kr. runde (2,7 %).</p>
          <p className="text-muted-foreground leading-relaxed">Begge strategier tilbyder unikke spilmønstre men kan ikke overvinde house edge. Labouchère giver kontrol over gevinst-målsætningen, mens James Bond tilbyder bred dækning med asymmetrisk risiko. Vælg den, der passer din spillestil og risikotolerance.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Matematisk Analyse – Alle Strategier Sammenlignet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="text-lg">Martingale</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground"><strong>Risiko:</strong> Meget høj<br/><strong>Eskalering:</strong> Eksponentiel (2x)<br/><strong>Gevinst-mønster:</strong> Mange små, sjælden kæmpe tab<br/><strong>Bankroll-krav:</strong> Meget høj</p></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="text-lg">Paroli</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground"><strong>Risiko:</strong> Lav<br/><strong>Eskalering:</strong> Kun ved gevinster<br/><strong>Gevinst-mønster:</strong> Mange små tab, sjælden stor gevinst<br/><strong>Bankroll-krav:</strong> Lav</p></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="text-lg">D'Alembert</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground"><strong>Risiko:</strong> Moderat<br/><strong>Eskalering:</strong> Lineær (+1)<br/><strong>Gevinst-mønster:</strong> Jævn fordeling<br/><strong>Bankroll-krav:</strong> Moderat</p></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="text-lg">Fibonacci</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground"><strong>Risiko:</strong> Moderat-høj<br/><strong>Eskalering:</strong> Fibonacci-sekvens<br/><strong>Gevinst-mønster:</strong> Ujævn, længere cyklusser<br/><strong>Bankroll-krav:</strong> Moderat-høj</p></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="text-lg">Labouchère</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground"><strong>Risiko:</strong> Variabel (din sekvens)<br/><strong>Eskalering:</strong> Tilpasningsbar<br/><strong>Gevinst-mønster:</strong> Målrettet profit<br/><strong>Bankroll-krav:</strong> Variabel</p></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="text-lg">James Bond</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground"><strong>Risiko:</strong> Moderat<br/><strong>Eskalering:</strong> Flat (ingen)<br/><strong>Gevinst-mønster:</strong> 67 % vinderrate, store tab<br/><strong>Bankroll-krav:</strong> Moderat</p></CardContent></Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">Alle seks strategier konvergerer mod den samme forventede værdi: -2,7 % af samlet indsats (europæisk roulette). Forskellen ligger udelukkende i risikoprofil og varians. Vælg en strategi, der matcher din risikotolerance og underholdningspræference – men forvent aldrig at slå casinoet på lang sigt.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Praktiske Tips til Danske Roulette-Spillere</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>1. Vælg det rigtige spil:</strong> Fransk roulette med La Partage (1,35 % edge) sparer dig penge vs. europæisk (2,7 %) og især amerikansk (5,26 %). Over 1.000 spins med 100 kr. indsats er forskellen: La Partage = 1.350 kr. forventet tab, europæisk = 2.700 kr., amerikansk = 5.260 kr.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>2. Sæt ufravigelige grænser:</strong> Definér din session-bankroll, tabsgrænse og vindergrænse inden du starter. Eksempel: 2.000 kr. bankroll, stop ved 1.000 kr. tab (50 %) eller 3.000 kr. saldo (50 % profit). Disse grænser beskytter dig mod tilted beslutninger.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>3. Undgå side bets med høj house edge:</strong> Mange moderne roulette-varianter tilbyder side bets (fx Lucky Numbers, Neighbours) med house edges på 5–15 %. Hold dig til de standard væddemål, der har den laveste edge.</p>
          <p className="text-muted-foreground leading-relaxed"><strong>4. Brug <Link to="/casino-bonus" className={linkClass}>casinobonusser</Link> klogt:</strong> Roulette bidrager typisk med 10–20 % til <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>. Beregn altid den reelle gennemspilning, før du bruger bonusmidler på roulette. Og husk: <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> er ikke en strategi – det er en nødvendighed.</p>
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath="/casinospil/roulette-strategi" />

        <FAQSection faqs={strategiFaqs} />

        <AuthorBio author="jonas" showCommunity={false} />
      </div>
    </>
  );
};

export default RouletteStrategiGuide;
