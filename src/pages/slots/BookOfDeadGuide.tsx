import { Link } from "react-router-dom";
import heroImage from "@/assets/heroes/book-of-dead-hero.jpg";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, buildHowToSchema, SITE_URL } from "@/lib/seo";
import { RelatedGuides } from "@/components/RelatedGuides";
import { SlotProviderLink } from "@/components/SlotProviderLink";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles, TrendingUp, Target, Shield, Zap, BarChart3,
  Calculator, Flame, Scale, Users, AlertTriangle, Trophy, BookOpen
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const bookOfDeadFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er Book of Dead RTP og house edge?",
    answer: "Book of Dead har en RTP på 96,21 % i standardkonfigurationen, hvilket giver en house edge på 3,79 %. Spillet fås også i en reduceret version på 94,25 % (house edge 5,75 %). Tjek altid spillets info-sektion for den aktuelle RTP. Med 96,21 % er Book of Dead gennemsnitlig for en moderne videoslot – hverken specielt generøs eller restriktiv.",
  },
  {
    question: "Hvordan fungerer expanding symbols i Book of Dead?",
    answer: (
      <>
        Under free spins vælges ét tilfældigt symbol som expanding symbol. Når dette symbol lander på et hjul, udvider det sig til at dække alle tre positioner – uanset om det er en vindende kombination. Gevinster beregnes efter ekspansionen, og vindende linjer betales fra venstre til højre. Det ideelle expanding symbol er Rich Wilde (10.000 mønter for 5-of-a-kind) eller Osiris (2.000 mønter for 5), men i praksis vælges symbolet tilfældigt. Sandsynligheden for at få et premium expanding symbol er ca. 30 %. Læs mere om <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link> og deres spil.
      </>
    ),
  },
  {
    question: "Er Book of Dead bedre end Book of Ra?",
    answer: "Book of Dead fra Play'n GO er en åndelig efterfølger til Novomatics Book of Ra, men med vigtige forbedringer. Book of Dead har højere RTP (96,21 % vs. 95,10 %), mere moderne grafik, og er tilgængelig på langt flere online casinoer. Kernemekkaniken er identisk: expanding symbols i free spins, 5x3 grid, 10 gevinstlinjer. For danske spillere er Book of Dead det klare valg, da det er bredere tilgængeligt og har bedre matematiske grundforhold.",
  },
  {
    question: "Hvor mange free spins kan man maksimalt få i Book of Dead?",
    answer: "Basis-tildeling er 10 free spins ved 3+ scatters. Under free spins kan du retrigge med 3+ scatters for 10 ekstra spins. Der er teoretisk ingen grænse for retriggers, men sandsynligheden falder eksponentielt: 1 retrigger sker i ca. 5 % af bonusrunder, 2 retriggers i under 0,5 %. Den gennemsnitlige bonusrunde giver ca. 10,5 spins. Max win på 5.000x kan opnås med et enkelt godt expanding symbol på 10 spins.",
  },
  {
    question: "Hvad er den bedste strategi til Book of Dead?",
    answer: "Der er ingen strategi der kan påvirke RNG-udfaldet, men du kan optimere dine beslutninger: 1) Spil altid med alle 10 gevinstlinjer aktive – at reducere linjer sænker RTP. 2) Brug et bankroll-ratio på minimum 150:1 pga. medium-høj volatilitet. 3) Book of Dead er et af de bedste valg til bonusomsætning pga. relativt høj RTP og moderat volatilitet. 4) Undgå gamble-featuren – den er matematisk neutral men øger variansen unødvendigt.",
  },
  {
    question: "Kan man købe bonussen i Book of Dead?",
    answer: "Nej, Book of Dead har ikke en bonus buy-funktion. Du skal trigge free spins organisk ved at lande 3+ scatter-symboler (Bogen). Sandsynligheden for at trigge bonus er ca. 1:150–180 spins. Nogle nyere 'Book of'-varianter (som Book of Dead 2) tilbyder bonus buy, men originalen gør det ikke. Dette er faktisk en fordel for wagering-formål, da bonus buy-prisen typisk inkluderer en ekstra margin til casinoet.",
  },
  {
    question: "Hvorfor er Book of Dead så populær til casino bonusser?",
    answer: (
      <>
        Book of Dead er en af de mest populære slots til <Link to="/casino-bonus" className={linkClass}>casino bonusser</Link> af tre grunde: 1) Den høje RTP (96,21 %) minimerer det forventede tab under omsætning. 2) Den moderate volatilitet giver en god balance mellem store gevinster og jævn spilflow. 3) Den er næsten universelt tilgængelig på danske casinoer, så den indgår sjældent i bonusrestriktioner. Mange <Link to="/free-spins" className={linkClass}>free spins-tilbud</Link> tildeles specifikt til Book of Dead.
      </>
    ),
  },
];

const BookOfDeadGuide = () => {
  const faqJsonLd = buildFaqSchema(bookOfDeadFaqs);
  const articleSchema = buildArticleSchema({
    headline: "Book of Dead – Den Komplette Risikoprofil-Analyse",
    description: "Dybdegående analyse af Book of Dead: RTP, expanding symbols-matematik, bonus-compatibility og risikostyring for danske spillere.",
    url: `${SITE_URL}/casinospil/spillemaskiner/book-of-dead`,
    datePublished: "2026-02-18",
    dateModified: "2026-02-18",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  // BreadcrumbList is auto-generated by SEO.tsx via buildBreadcrumbListSchema() – no manual injection needed.

  const howToJsonLd = buildHowToSchema({
    name: "Sådan spiller du Book of Dead",
    pageUrl: `${SITE_URL}/casinospil/spillemaskiner/book-of-dead`,
    steps: [
      { name: "Vælg indsats og linjer", text: "Indstil din indsats og sørg for at alle 10 gevinstlinjer er aktive for optimal RTP." },
      { name: "Spin hjulene", text: "Tryk spin og observer symbolkombinationerne på det 5×3 grid." },
      { name: "Aktivér Free Spins", text: "Land 3+ Book-scatters for at trigge 10 free spins med expanding symbols." },
      { name: "Udbetal gevinst", text: "Gå til kassen og overfør din saldo til din foretrukne betalingsmetode." },
    ],
  });

  return (
    <>
      <SEO
        title="Book of Dead Spilleautomat – RTP 96,21% & Free Spins"
        description="Komplet analyse af Book of Dead: expanding symbols-matematik, EV-beregninger, bonus-compatibility og hvem spillet passer til."
        jsonLd={[faqJsonLd, articleSchema, howToJsonLd]}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Shield className="mr-1.5 h-3.5 w-3.5" /> Risikoprofil-Analyse</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Book of Dead</h1>
            <p className="text-lg text-white/80">En ærlig risikoprofil-analyse af Play'n GO's mest ikoniske slot – fra expanding symbol-matematik til wagering-optimering.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="18-02-2026" readTime="24 Min." />
        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} width="1920" height="1080" className="w-full h-auto object-cover max-h-[400px]" alt="Book of Dead spillemaskine" loading="eager" />
        </div>

        {/* ── ÅBNINGSVINKEL: RISIKOPROFIL FØRST ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Risikoprofilen Bag Dansk Casinospils Mest Betroede Slot</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Book of Dead fra <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link> er den slot, der har defineret en generation af online casinospillere. Lanceret i 2016 som en åndelig efterfølger til Novomatics legendariske Book of Ra, har den opbygget et ry som det "sikre valg" – den slot, du vælger, når du vil have en velafbalanceret risikoprofil. Men er det ry fortjent? Og hvad siger matematikken bag de expanding symbols rent faktisk?
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne analyse griber Book of Dead an fra et usædvanligt perspektiv: risikoprofilens vinkel. I stedet for at gentage den velkendte feature-beskrivelse dissekerer vi, hvad spillets matematiske model faktisk betyder for din bankroll – spin for spin, session for session. Vi analyserer expanding symbol-sandsynligheder, beregner Expected Value for different scenarier, og vurderer, hvorfor denne specifikke slot er blevet det foretrukne valg til bonusomsætning hos hundredvis af danske casinoer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Spoiler: Book of Deads ry som "det sikre valg" er matematisk velfunderet – men der er nuancer, som de fleste spilguides ikke fortæller dig. Den expanding symbol-mekanik er ikke bare en gimmick; den repræsenterer en grundlæggende anderledes gevinstfordelingsmodel end cluster-pays slots som Sweet Bonanza. Forståelse af denne forskel kan spare dig tusindvis af kroner i forkerte valg.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── SEKTION: TEKNISK PROFIL ── */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><BarChart3 className="h-7 w-7 text-primary" /> Teknisk DNA: Arkitekturen Bag Book of Dead</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Udvikler</p><p className="text-xl font-bold"><Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link></p></CardContent></Card>
            <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">RTP (Standard)</p><p className="text-xl font-bold">96,21 %</p></CardContent></Card>
            <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Volatilitet</p><p className="text-xl font-bold">Høj (4/5)</p></CardContent></Card>
            <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Max Win</p><p className="text-xl font-bold">5.000x</p></CardContent></Card>
            <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Grid Layout</p><p className="text-xl font-bold">5 hjul × 3 rækker</p></CardContent></Card>
            <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Gevinstlinjer</p><p className="text-xl font-bold">10 (faste)</p></CardContent></Card>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Book of Dead opererer med den klassiske 5x3 grid-arkitektur med 10 faste <Link to="/ordbog/paylines" className={linkClass}>gevinstlinjer</Link>. Denne struktur er fundamentalt anderledes end moderne cluster-pays eller Megaways-slots. Med kun 10 gevinstlinjer er sandsynlighedsrummet langt mere kompakt: der er præcis 10 mulige vinderkombinationer pr. spin (én pr. linje), og gevinster beregnes fra venstre mod højre med det højeste symbolmatch pr. linje.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Symbolhierarkiet er klart defineret: Rich Wilde (explorer) er det højestbetalende symbol med 5.000 mønter for 5-of-a-kind, efterfulgt af Osiris (2.000), Anubis (750), Horus (750) og så de fire lavbetalende kortsymboler (A, K, Q, J med 150 mønter for 5-of-a-kind). Bogen fungerer som både <Link to="/ordbog/wild" className={linkClass}>wild</Link> og <Link to="/ordbog/scatter" className={linkClass}>scatter</Link> – en dual-rolle der er karakteristisk for "Book of"-genren.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den duale wild/scatter-funktion er matematisk elegant: bogen substituerer for alle andre symboler i vinderkombinationer (wild), OG den udløser free spins, når 3+ lander hvor som helst (scatter). Dette dobbelte formål gør bogen til det mest værdifulde symbol i basisspillet – den bidrager til gevinster på to fundamentalt forskellige måder, hvilket er usædvanligt i slot-design.
          </p>
        </section>

        <InlineCasinoCards title="Spil Book of Dead hos disse casinoer" count={6} />

        <Separator className="my-10" />

        {/* ── SEKTION: EXPANDING SYMBOLS MATEMATIK ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Sparkles className="h-7 w-7 text-primary" /> Expanding Symbols: Den Matematiske Motor Bag Bonusrunden</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Free spins-runden er der, hvor Book of Dead transformeres fra en standard gevinstlinje-slot til noget helt specielt. Ved trigger (3+ scatter-bøger) tildeles 10 free spins, og ét tilfældigt symbol udpeges som expanding symbol. Det valgte symbol udvider sig til at fylde hele hjulet, når det lander – og gevinster beregnes efter ekspansionen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Der er 10 mulige expanding symbols (Rich Wilde, 4 egyptiske guder, 4 kortsymboler + bogen). Sandsynligheden for hvert symbol er lige stor (10 % pr. symbol). Imidlertid er gevinstpotentialet dramatisk forskelligt:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-semibold">Expanding Symbol</th>
                  <th className="py-2 text-right font-semibold">5-of-a-kind (mønter)</th>
                  <th className="py-2 text-right font-semibold">Sandsynlighed som expanding</th>
                  <th className="py-2 text-right font-semibold">Gennemsnitlig bonusværdi</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="py-2">Rich Wilde</td><td className="py-2 text-right">5.000</td><td className="py-2 text-right">10 %</td><td className="py-2 text-right">Højest (500–2.000x)</td></tr>
                <tr className="border-b"><td className="py-2">Osiris</td><td className="py-2 text-right">2.000</td><td className="py-2 text-right">10 %</td><td className="py-2 text-right">Høj (200–800x)</td></tr>
                <tr className="border-b"><td className="py-2">Anubis / Horus</td><td className="py-2 text-right">750</td><td className="py-2 text-right">20 % (samlet)</td><td className="py-2 text-right">Medium (80–300x)</td></tr>
                <tr className="border-b"><td className="py-2">A / K / Q / J</td><td className="py-2 text-right">150</td><td className="py-2 text-right">40 % (samlet)</td><td className="py-2 text-right">Lav (15–60x)</td></tr>
                <tr className="border-b"><td className="py-2">Bog (Wild/Scatter)</td><td className="py-2 text-right">2.000</td><td className="py-2 text-right">10 %</td><td className="py-2 text-right">Høj (inkl. retrigger)</td></tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Her afsløres Book of Deads skjulte variansmekanik: 40 % af alle bonusrunder vil have et lavbetalende kortsymbol som expanding symbol, hvilket typisk resulterer i en skuffende bonusrunde (15–60x indsats). Kun 30 % af bonusrunder giver et premium expanding symbol (Rich Wilde, Osiris eller Bog), som er nødvendigt for de store gevinster. Denne "symbol-lotteri" er en væsentlig del af spillets volatilitetsprofil.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den praktiske implikation er, at du skal forvente 6–7 "dårlige" bonusrunder for hver "god" bonusrunde. Over 10 bonusrunder (ca. 1.500–1.800 spins) vil du statistisk se 4 kortsymbol-bonuser, 2 middel-bonuser og 3–4 premium-bonuser. Det er de 3–4 premium-bonuser, der bærer din samlede bonusværdi, og en enkelt Rich Wilde expanding symbol-runde kan opveje mange skuffende J/Q-bonuser.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── SEKTION: RTP DEEP DIVE ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><TrendingUp className="h-7 w-7 text-primary" /> RTP-Anatomi: Hvor Kommer de 96,21 % Fra?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Book of Deads samlede <Link to="/ordbog/rtp" className={linkClass}>RTP</Link> på 96,21 % fordeles mellem basisspillet og bonusrunden. Baseret på matematisk analyse bidrager basisspillet med ca. 60–65 % af den samlede RTP (ca. 57,7–62,5 procentpoint), mens free spins bidrager med ca. 35–40 % (ca. 33,7–38,5 procentpoint). Gamble-featuren er RTP-neutral (50/50 double-or-nothing).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne fordeling er markant anderledes end cluster-pays slots som <Link to="/casinospil/spillemaskiner/sweet-bonanza" className={linkClass}>Sweet Bonanza</Link>, hvor basisspillet kun bidrager med 55–60 % af RTP. Book of Deads højere basisspil-andel betyder, at du oplever mere konsistent flow i det daglige spil – du taber langsommere mellem bonusrunder, og bonusrunderne er relativt set mindre afgørende for den samlede oplevelse.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For wagering-formål er denne fordeling ideel: den lavere afhængighed af bonusrunder reducerer variansen, hvilket betyder, at din bankroll svinger mindre voldsomt under omsætning. Du har en mere forudsigelig nedtrapning mod den forventede RTP, hvilket gør det lettere at budgettere og vurdere, om du kan gennemføre et givet <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── SEKTION: EV-SCENARIE ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Calculator className="h-7 w-7 text-primary" /> Expected Value: Book of Dead som Wagering-Maskine</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Book of Dead er en af de mest brugte slots til <Link to="/casino-bonus" className={linkClass}>bonusomsætning</Link> i Danmark. Lad os beregne præcis hvorfor med konkrete EV-eksempler:
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Scenarie: Velkomstbonus 100 % op til 1.000 kr. med 10x wagering (dansk standard)</h3>
          <Card className="mb-4">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2"><strong>EV-beregning (dansk standard – 10x omsætningskrav):</strong></p>
              <p className="text-sm text-muted-foreground">Bonusbeløb: 1.000 kr. | Indbetaling: 1.000 kr. | Samlet saldo: 2.000 kr.</p>
              <p className="text-sm text-muted-foreground">Total omsætning: 2.000 × 10 = 20.000 kr. (omsætning på d+b)</p>
              <p className="text-sm text-muted-foreground">Forventet tab: 20.000 × (1 − 0,9621) = 20.000 × 0,0379 = <strong>758 kr.</strong></p>
              <p className="text-sm text-muted-foreground">Net EV: 2.000 − 758 = 1.242 kr. | Bonus EV: 1.242 − 1.000 (indbetaling) = <strong>+242 kr.</strong></p>
              <p className="text-sm text-muted-foreground mt-2">Positivt – dansk 10x lovloft er markant mere spillervenligt end internationale 30–50x krav.</p>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold mt-6 mb-3">Sammenligning: Book of Dead vs. Sweet Bonanza til wagering</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-semibold">Metric</th>
                  <th className="py-2 text-right font-semibold">Book of Dead</th>
                  <th className="py-2 text-right font-semibold"><Link to="/casinospil/spillemaskiner/sweet-bonanza" className={linkClass}>Sweet Bonanza</Link></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="py-2">RTP</td><td className="py-2 text-right">96,21 %</td><td className="py-2 text-right">96,48 %</td></tr>
                <tr className="border-b"><td className="py-2">Forventet tab (10x/2.000 kr. d+b)</td><td className="py-2 text-right">758 kr.</td><td className="py-2 text-right">704 kr.</td></tr>
                <tr className="border-b"><td className="py-2">Bonus EV</td><td className="py-2 text-right">+242 kr.</td><td className="py-2 text-right">+296 kr.</td></tr>
                <tr className="border-b"><td className="py-2">Bust-risiko under wagering</td><td className="py-2 text-right">~15 %</td><td className="py-2 text-right">~25 %</td></tr>
                <tr className="border-b"><td className="py-2">Profit-sandsynlighed</td><td className="py-2 text-right">~40–45 %</td><td className="py-2 text-right">~35–40 %</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Sweet Bonanza har marginalt bedre RTP, men Book of Dead har lavere bust-risiko under wagering pga. den lavere volatilitet. For konservative spillere, der vil minimere risikoen for at tabe hele bonussen, er Book of Dead det bedre valg. For spillere, der er villige til at acceptere højere risiko for potentielt større gevinster, er Sweet Bonanza marginalt bedre matematisk.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── SEKTION: VOLATILITET I PRAKSIS ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Zap className="h-7 w-7 text-primary" /> Volatilitet Dekonstrueret: Session-Dynamikken</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Play'n GO klassificerer Book of Dead som "høj volatilitet", men i praksis opleves den som medium-høj sammenlignet med moderne ultra-volatile slots som San Quentin eller Wanted Dead or a Wild. Forskellen ligger i basisspillets bidrag: Book of Deads basisspil er mere generøst end de fleste høj-volatilitets slots, hvilket giver en blødere spilloplevelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En typisk session på 300 spins (minimum anbefalet for Book of Dead med 150:1 bankroll-ratio) vil vise følgende mønster: ca. 90–105 vindende spins (30–35 % hit rate), hvoraf ca. 60–70 er under 1x indsats, 20–25 er 1–5x, og 5–10 er 5x+. Du vil statistisk se ca. 1,5–2 bonusrunder på 300 spins. Hele din sessions afkast afhænger primært af, hvilket expanding symbol du får i disse 1–2 bonusrunder.
          </p>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <p className="font-semibold mb-2">📊 Session-simulation: 300 spins á 10 kr. (3.000 kr. total action)</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Forventet tab: <strong>113,70 kr.</strong> (3,79 % <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link>)</li>
                <li>• Vindende spins: ca. <strong>90–105 (30–35 %)</strong></li>
                <li>• Forventede bonusrunder: <strong>1,5–2</strong></li>
                <li>• Realistisk udfaldsspænd: <strong>−50 % til +200 %</strong></li>
                <li>• Sandsynlighed for positiv session: <strong>~40 %</strong></li>
              </ul>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed">
            Sammenlignet med Sweet Bonanzas −60 % til +300 % spænd er Book of Deads udfaldsspænd snævrere. Det skyldes den lavere volatilitet og det mere generøse basisspil. For spillere, der foretrækker mere forudsigelige sessioner uden de ekstreme svingninger, er Book of Dead det bedre valg. Det er netop denne egenskab, der gør den til den foretrukne wagering-slot.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── SEKTION: BONUS COMPATIBILITY ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Scale className="h-7 w-7 text-primary" /> Bonus-Compatibility: Det Foretrukne Wagering-Våben</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Book of Dead er de facto standard for <Link to="/casino-bonus" className={linkClass}>casino bonusser</Link> i Danmark af gode grunde. Spillet er næsten aldrig ekskluderet fra bonustilbud, det har en rimelig RTP, og den moderate volatilitet gør det lettere at gennemføre omsætningskrav uden at bust. Mange casinoer tilbyder specifikt <Link to="/free-spins" className={linkClass}>free spins</Link> på Book of Dead som del af deres velkomstpakke.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med Danmarks lovmæssige 10x omsætningskrav er Book of Dead en stærk bonuskandidat. Med 10x wagering på en 1.000 kr. bonus (10.000 kr. total omsætning) er forventet tab ca. 379 kr. – langt under bonusværdien, hvilket giver en net-positiv EV på ca. +621 kr. Break-even-punktet er ca. 26,4x wagering: med det danske 10x-krav er oddset markant i spillerens favør.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For <Link to="/no-sticky-bonus" className={linkClass}>no-sticky bonusser</Link> er Book of Dead et glimrende valg, fordi du kan udbetale din egen balance til enhver tid. Strategien er at spille med bonussen først: hvis du rammer en god bonusrunde med premium expanding symbol, kan du vælge at udbetale din reelle balance (som er uberørt) plus eventuelle bonusgevinster over omsætningskravet. Denne "have din kage og spise den også"-tilgang er unik for no-sticky bonusser og fungerer optimalt med medium-volatilitets slots som Book of Dead.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── SEKTION: HVEM PASSER DET TIL ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Users className="h-7 w-7 text-primary" /> Spillerprofiler: Hvem Vinder og Taber på Book of Dead?</h2>
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2"><span className="text-green-500">✅</span> Ideelt for</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Bonusomsættere</strong> – det matematisk sikreste valg til wagering</li>
                  <li>• <strong>Klassiske slot-fans</strong> der sætter pris på straightforward mekanik</li>
                  <li>• <strong>Moderate bankrolls</strong> – 150:1 ratio er tilstrækkeligt</li>
                  <li>• <strong>Nye spillere</strong> der vil have en velafprøvet, forudsigelig oplevelse</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2"><span className="text-red-500">❌</span> Ikke egnet til</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Max win-jægere</strong> – 5.000x ceiling er lavt vs. moderne slots</li>
                  <li>• <strong>Feature-entusiaster</strong> – spillets mekanikker er simple sammenlignet med 2024+ slots</li>
                  <li>• <strong>Spillere der søger innovation</strong> – Book of Dead er bevidst konservativ i designet</li>
                  <li>• <strong>Ultra-volatile præferencer</strong> – prøv Wanted Dead or a Wild i stedet</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ── SEKTION: SAMMENLIGNING ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Target className="h-7 w-7 text-primary" /> Head-to-Head: Book of Dead vs. Legacy of Dead vs. Book of Ra</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            "Book of"-genren er overfyldt med varianter. Her sammenligner vi originalen med dens vigtigste konkurrenter:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-semibold">Parameter</th>
                  <th className="py-2 text-right font-semibold">Book of Dead</th>
                  <th className="py-2 text-right font-semibold">Legacy of Dead</th>
                  <th className="py-2 text-right font-semibold">Book of Ra Deluxe</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="py-2">Udvikler</td><td className="py-2 text-right">Play'n GO</td><td className="py-2 text-right">Play'n GO</td><td className="py-2 text-right">Novomatic</td></tr>
                <tr className="border-b"><td className="py-2">RTP</td><td className="py-2 text-right">96,21 %</td><td className="py-2 text-right">96,58 %</td><td className="py-2 text-right">95,10 %</td></tr>
                <tr className="border-b"><td className="py-2">Max Win</td><td className="py-2 text-right">5.000x</td><td className="py-2 text-right">5.000x</td><td className="py-2 text-right">5.000x</td></tr>
                <tr className="border-b"><td className="py-2">Expanding Symbols</td><td className="py-2 text-right">1</td><td className="py-2 text-right">Stigende (1→2→3)</td><td className="py-2 text-right">1</td></tr>
                <tr className="border-b"><td className="py-2">Bonus Buy</td><td className="py-2 text-right">Nej</td><td className="py-2 text-right">Nej</td><td className="py-2 text-right">Nej</td></tr>
                <tr className="border-b"><td className="py-2">Tilgængelighed DK</td><td className="py-2 text-right">Meget høj</td><td className="py-2 text-right">Høj</td><td className="py-2 text-right">Moderat</td></tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Legacy of Dead har faktisk højere RTP (96,58 %) og en forbedret mekanik med progressivt stigende antal expanding symbols ved retriggers (op til 3 expanding symbols samtidig). Rent matematisk er Legacy of Dead det bedre spil. Dog har Book of Dead bredere tilgængelighed og flere bonustilbud specifikt målrettet mod det.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Book of Ra Deluxe fra Novomatic er det dårligste valg med 95,10 % RTP – en house edge på 4,90 % vs. Book of Deads 3,79 %. Over 1.000 spins á 10 kr. koster den ekstra 1,11 procentpoint dig 111 kr. mere. Medmindre du har nostalgisk tilknytning til den originale Book of Ra, er der ingen matematisk grund til at foretrække den.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── SEKTION: RISIKOANALYSE ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><AlertTriangle className="h-7 w-7 text-primary" /> Bankroll Management Specifikt til Book of Dead</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Book of Deads moderate volatilitet tillader et lavere bankroll-ratio end ultra-volatile slots. Her er de anbefalede parametre:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-semibold">Spillertype</th>
                  <th className="py-2 text-right font-semibold">Min. bankroll-ratio</th>
                  <th className="py-2 text-right font-semibold">Anbefalet ratio</th>
                  <th className="py-2 text-right font-semibold">Bust-risiko</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="py-2">Konservativ</td><td className="py-2 text-right">150:1</td><td className="py-2 text-right">200:1</td><td className="py-2 text-right">~5 %</td></tr>
                <tr className="border-b"><td className="py-2">Standard</td><td className="py-2 text-right">100:1</td><td className="py-2 text-right">150:1</td><td className="py-2 text-right">~12 %</td></tr>
                <tr className="border-b"><td className="py-2">Wagering-fokus</td><td className="py-2 text-right">Afhænger af omsætning</td><td className="py-2 text-right">1,5x total wagering</td><td className="py-2 text-right">~15 %</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Den vigtigste risikostyringsregel for Book of Dead: brug aldrig gamble-featuren under bonusomsætning. Gamble er matematisk neutral (50/50 for double), men den øger variansen massivt. Under wagering er dit mål at minimere varians og nå omsætningskravet med mest mulig balance intakt – gamble modarbejder dette direkte. Gem gamble-featuren til rent underholdningsspil, hvor du er villig til at risikere din gevinst for spændingen. Husk altid principperne for <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── SEKTION: KONKLUSION ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Book of Dead: Det Rationelle Valg i en Irrationel Verden</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Book of Dead er ikke den mest spændende slot. Den har ikke de højeste multiplikatorer, det største max win eller de mest innovative features. Men det er præcis dens styrke: det er en slot, der gør præcis hvad den lover, med en matematisk model du kan stole på. I en branche fuld af hype og forlokkende reklamer er Book of Dead det rationelle valg – den slot, du vælger med hjernen, ikke med hjertet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med 96,21 % RTP, moderat volatilitet, bred tilgængelighed og en gennemtestet mekanik forbliver Book of Dead relevant i 2026 – ni år efter lanceringen. Den er det ideelle valg til bonusomsætning, et solidt valg til casual spil, og en benchmark for, hvad en "fair" slot ser ud. Den eneste kritik er det relativt lave max win (5.000x) sammenlignet med moderne slots, men for spillere der prioriterer konsistens over jackpot-drømme, er det en feature, ikke en fejl.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Spil altid Book of Dead med alle 10 linjer aktive, verificer RTP-versionen, og brug den fortrinsvis til bonusomsætning, hvor dens moderate volatilitet giver dig den bedste chance for at gennemføre wagering med profit. Det er ikke glamourøst rådgivning – men det er matematisk korrekt.
          </p>
        </section>

        <SlotProviderLink slotSlug="book-of-dead" />
        <RelatedGuides currentPath="/casinospil/spillemaskiner/book-of-dead" />
        <FAQSection title="Ofte Stillede Spørgsmål om Book of Dead" faqs={bookOfDeadFaqs} />
        <AuthorBio />
      </div>
    </>
  );
};

export default BookOfDeadGuide;
