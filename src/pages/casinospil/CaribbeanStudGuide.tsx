import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Target, BarChart3, Eye, Coins, Brain, BookOpen, Shield, Gamepad2,
  TrendingUp, AlertTriangle, Calculator, Scale, Users, Award, Clock,
  CheckCircle, XCircle, Layers, Shuffle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/caribbean-stud-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er husets fordel i Caribbean Stud Poker?",
    answer: "Den grundlæggende husets fordel i Caribbean Stud Poker er ca. 5,22 % på ante-indsatsen. Med optimal strategi kan den reduceres til omkring 5,0 %. Pair Plus side-bet har en husets fordel på 2,32 % til 7,28 % afhængigt af udbetalings-tabellen.",
  },
  {
    question: "Skal man altid spille den progressive jackpot?",
    answer: "Matematisk set er den progressive jackpot-indsats sjældent +EV. Jackpotten skal typisk overstige 263.000× ante-indsatsen for at side-bettet har positiv forventet værdi. De fleste progressive jackpots når aldrig dette niveau.",
  },
  {
    question: "Hvad er den optimale strategi for Caribbean Stud?",
    answer: "Den simplificerede optimale strategi er: Raise altid med et par eller bedre. Fold altid med mindre end dealer-qualifying (Ace-King). Med Ace-King high, raise kun hvis en af dine kort matcher dealerens synlige kort, eller hvis du har en dronning og dealerens kort er lavere end din 4. højeste kort.",
  },
  {
    question: "Kan man tælle kort i Caribbean Stud?",
    answer: "Caribbean Stud spilles med en enkelt kortbunke der blandes efter hver hånd, så traditionel korttælling er ikke mulig. Dog kan information fra andre spilleres synlige kort ved fysiske borde teoretisk give en lille fordel.",
  },
  {
    question: "Hvad er forskellen på Caribbean Stud og Texas Hold'em?",
    answer: (
      <>
        I Caribbean Stud spiller du kun mod dealeren, ikke andre spillere. Du modtager 5 kort uden mulighed for at bytte kort, og der er ingen community-kort. Strategien handler om at vurdere din hånd mod dealerens ene synlige kort. Se vores <Link to="/casinospil/poker/texas-holdem" className={linkClass}>Texas Hold'em guide</Link> for en dybdegående sammenligning.
      </>
    ),
  },
  {
    question: "Hvornår qualifier dealeren i Caribbean Stud?",
    answer: "Dealeren skal have mindst Ace-King high for at kvalificere sig. Hvis dealeren ikke qualifier, vinder ante-indsatsen 1:1, og raise-indsatsen returneres uanset din hånd. Dette sker i ca. 44 % af alle hænder.",
  },
  {
    question: "Kan man spille Caribbean Stud online med dansk licens?",
    answer: "Ja, Caribbean Stud er tilgængeligt hos adskillige danske casinoer både som RNG-version og i live casino-format. Evolution Gaming leverer den mest populære live-variant med progressive jackpots.",
  },
  {
    question: "Hvad er forskellen på Caribbean Stud og Caribbean Draw?",
    answer: "I Caribbean Draw kan du bytte op til 2 kort mod en ekstra indsats, hvilket reducerer husets fordel til ca. 2,6 %. I standard Caribbean Stud har du ingen mulighed for at bytte kort – du spiller de fem kort, du modtager.",
  },
];

const faqJsonLd = buildFaqSchema(faqs.map((f) => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));

const articleSchema = buildArticleSchema({
  headline: "Caribbean Stud Poker – Komplet Guide med Odds, Regler og Strategi (2026)",
  description: "Dybdegående guide til Caribbean Stud Poker for danske spillere. Lær optimal raise/fold-strategi, forstå progressiv jackpot-matematik og sammenlign udbetalingstabeller.",
  datePublished: "2026-03-02",
  dateModified: "2026-03-02",
  url: `${SITE_URL}/casinospil/poker/caribbean-stud`,
  image: `${SITE_URL}/og/caribbean-stud.jpg`,
});

export default function CaribbeanStudGuide() {
  return (
    <>
      <SEO
        title="Caribbean Stud Poker Guide 2026 – Odds, Regler & Strategi"
        description="Lær Caribbean Stud Poker fra bunden. Komplet dansk guide med optimal strategi, progressiv jackpot-matematik, udbetalingstabeller og de bedste casinoer med dansk licens."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(220 60% 20%), hsl(240 50% 18%) 40%, hsl(200 70% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Coins className="mr-1.5 h-3.5 w-3.5" /> Casino Bordspil – Marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Caribbean Stud Poker – Komplet Guide til Odds, Regler & Optimal Strategi
            </h1>
            <p className="text-lg text-white/80">
              Den definitive danske guide til Caribbean Stud Poker. Fra progressiv jackpot-matematik til AK-qualifier-strategi – alt du behøver for at minimere husets fordel.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="55 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Caribbean Stud Poker bord med dealer og progressive jackpot display" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ──── Sektion 1: Historisk kontekst & spillets DNA ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Caribbean Studs oprindelse – fra lystbåd til globalt casinofænomen
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Caribbean Stud Poker har en usædvanlig historie sammenlignet med de fleste casinospil. Spillet blev udviklet i begyndelsen af 1980'erne – den mest udbredte teori tilskriver opfindelsen til David Sklansky, en anerkendt pokerforfatter, der angiveligt skabte konceptet under navnet "Casino Poker" i 1982. Sklanskys originale idé var et simpelt spil, hvor casinogæster kunne nyde pokerfølelsen uden at spille direkte mod andre spillere – en kritisk innovation, fordi traditionel poker kræver en vis minimumsspillerbase for at fungere, mens Caribbean Stud kan spilles af én eneste person mod huset.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Spillet fik sit kommercielle gennembrud, da det blev introduceret på casinobåde i De Caribiske Øer i midten af 1980'erne – heraf navnet "Caribbean Stud". Den caribiske forbindelse er ikke blot en markedsføringsgimmick: spillets popularitet eksploderede netop i de caribiske casinoer, fordi det appellerede til turister, der ønskede poker-action uden den intimiderende PvP-komponent. I 1988 blev spillet patenteret og licenseret til Shuffle Master (nu Scientific Games), som tilføjede den progressive jackpot-komponent – det element, der for alvor cementerede spillets plads i casinoverdenens repertoire.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I dag er Caribbean Stud tilgængeligt på næsten alle større online casinoer og i de fleste fysiske casinoer verden over. Den progressive jackpot-mekanik har gjort spillet til et af de mest genkendelige bordspil i casino-lobbyen, og Live Casino-versioner fra udbydere som Evolution Gaming har givet spillet nyt liv i den digitale tidsalder. I Danmark er Caribbean Stud tilgængeligt hos casinoer med <Link to="/casino-licenser" className={linkClass}>dansk licens</Link>, både som RNG-version (software-baseret) og i live-format med rigtige dealere.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Hvad gør Caribbean Stud unikt?</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Caribbean Stud adskiller sig fundamentalt fra alle andre pokervarianter på tre måder. For det første spiller du udelukkende mod dealeren – der er ingen bluffing, ingen psykologisk krigsførelse og ingen konkurrence med andre spillere ved bordet. For det andet modtager du fem kort uden mulighed for at bytte – din beslutning er binær: raise eller fold. For det tredje har spillet en asymmetrisk informationsstruktur: du ser alle dine fem kort, men kun ét af dealerens fem kort. Denne informationsasymmetri er spillets strategiske kerne og kilden til næsten al kompleksitet i optimal spil.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Sammenlignet med andre casino-pokervarianter som <Link to="/casinospil/poker/three-card-poker" className={linkClass}>Three Card Poker</Link> og Casino Hold'em tilbyder Caribbean Stud den længste spiltid pr. hånd (5 kort mod 3 kort i Three Card Poker) og det største jackpot-potentiale via den progressive side-bet. Ulempen er en relativt høj grundlæggende husets fordel (5,22 %) sammenlignet med Three Card Pokers 3,37 % og Casino Hold'ems 2,16 %.
          </p>
        </section>

        {/* ──── Sektion 2: Odds & Sandsynligheder ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Odds og sandsynligheder – den matematiske grundpille
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Caribbean Stud Poker spilles med en standard 52-korts bunke, og sandsynlighederne følger de klassiske 5-korts pokerhænder. Det unikke ved spillet er asymmetrien: du ser kun ét af dealerens fem kort, mens dealeren aldrig ser dine. Denne informationsasymmetri er fundamentet for al strategisk beslutningstagning og den primære grund til, at Caribbean Stud har en mere kompleks strategi end man umiddelbart ville forvente af et "simpelt" casino-bordspil.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Komplet udbetalingstabel – standard version
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Hånd</th>
                      <th className="py-2 text-left font-semibold">Raise-udbetaling</th>
                      <th className="py-2 text-left font-semibold">Sandsynlighed</th>
                      <th className="py-2 text-left font-semibold">Forventet udbetaling</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold">Royal Flush</td><td className="py-2">100:1</td><td className="py-2">0,00015 %</td><td className="py-2">0,015</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Straight Flush</td><td className="py-2">50:1</td><td className="py-2">0,0014 %</td><td className="py-2">0,069</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Fire ens</td><td className="py-2">20:1</td><td className="py-2">0,024 %</td><td className="py-2">0,480</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Fuldt hus</td><td className="py-2">7:1</td><td className="py-2">0,14 %</td><td className="py-2">1,010</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Flush</td><td className="py-2">5:1</td><td className="py-2">0,20 %</td><td className="py-2">0,987</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Straight</td><td className="py-2">4:1</td><td className="py-2">0,39 %</td><td className="py-2">1,571</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Tre ens</td><td className="py-2">3:1</td><td className="py-2">2,11 %</td><td className="py-2">6,330</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">To par</td><td className="py-2">2:1</td><td className="py-2">4,75 %</td><td className="py-2">9,500</td></tr>
                    <tr><td className="py-2 font-semibold">Et par eller mindre</td><td className="py-2">1:1</td><td className="py-2">42,26 %</td><td className="py-2">42,260</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold text-foreground mb-3">Dealer-qualifying frekvens og dens strategiske implikationer</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Dealeren qualifier (har mindst Ace-King high) i cirka 56,3 % af alle hænder. Det betyder, at i 43,7 % af hænderne modtager du kun 1:1 på ante, uanset om du har en flush eller fire ens. Dette er en kritisk faktor i spillets matematik – store hænder mister deres fulde udbetalingspotentiale næsten halvdelen af tiden. Denne mekanik er designet til at beskytte casinoet mod store tab og er den primære kilde til <Link to="/ordbog/house-edge" className={linkClass}>husets fordel</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Implikationen for din strategi er subtil men vigtig: selv med en stærk hånd som fuldt hus modtager du den fulde 7:1 udbetaling kun i 56,3 % af tilfældene. Den effektive gennemsnitlige udbetaling for fuldt hus er derfor ca. 4,45:1 (0,563 × 7 + 0,437 × 1 = 4,38:1 inklusive ante). Denne reduktion gælder for alle hænder og er grunden til, at Caribbean Stud har en højere husets fordel end man umiddelbart ville formode baseret på udbetalingstabellen alene.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Sammenligning med andre casino-pokerspil</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Med en husets fordel på 5,22 % ligger Caribbean Stud markant højere end <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> (0,5 %) og baccarat (1,06 %), men lavere end mange spilleautomater og betydeligt lavere end de fleste live game shows. Sammenlignet med <Link to="/casinospil/poker/three-card-poker" className={linkClass}>Three Card Poker</Link> (3,37 %) er Caribbean Stud dyrere pr. hånd, men tilbyder langt større jackpot-potentiale via den progressive side-bet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For danske spillere på casinoer med <Link to="/casino-licenser" className={linkClass}>dansk licens</Link> er det vigtigt at forstå, at den lovpligtige RTP (Return to Player) for Caribbean Stud typisk rapporteres inklusiv den progressive jackpot-komponent, hvilket kan skævvride sammenligningen. Den faktiske RTP uden jackpot er ca. 94,78 %, mens den med en gennemsnitlig jackpot-størrelse kan nå 96-97 %. Vær opmærksom på, at <Link to="/casinospil/poker/video-poker" className={linkClass}>video poker</Link> med optimal strategi kan nå RTP-værdier over 99 %, hvilket gør det til et markant bedre valg for matematisk orienterede spillere.
          </p>
        </section>

        {/* ──── Sektion 3: Regler ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Regler for Caribbean Stud Poker – komplet trin-for-trin gennemgang
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Caribbean Stud Poker er et af de mest tilgængelige casino-bordspil, fordi du kun spiller mod dealeren – aldrig mod andre spillere. Spillet foregår på et halvmåneformet bord med plads til typisk 5-7 spillere, men hver spiller har sin egen individuelle duel med dealeren. I live casino-format er bordet virtuelt, men mekanikken er identisk.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Detaljeret spilleflow</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Trin 1 – Ante-indsats:</strong> Du placerer din ante-indsats i det markerede "Ante"-felt foran din position. Ante-indsatsen er din obligatoriske indsats for at deltage i hånden. Minimumsbeløbet varierer mellem casinoer – online typisk fra 10-50 kr., i fysiske casinoer fra 50-500 kr. Hvis bordet har en progressiv jackpot, kan du også placere en ekstra indsats (typisk 5-10 kr.) i jackpot-slotten. Denne indsats er helt uafhængig af hovedspillet.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Trin 2 – Kortuddelingen:</strong> Dealeren uddeler fem kort til hver spiller og sig selv. Alle dine kort er synlige for dig (og kun dig – andre spillere kan normalt ikke se dine kort). Dealeren har fire kort med bagsiden opad og ét kort synligt (face-up). Dette ene synlige kort er den eneste information, du har om dealerens hånd, og det er fundamentet for al strategisk beslutningstagning.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Trin 3 – Raise eller fold:</strong> Du vurderer din hånd mod dealerens synlige kort og træffer den binære beslutning: Raise (placer en indsats lig med præcis 2× din ante i "Raise"-feltet) eller Fold (mist din ante og eventuel jackpot-indsats). Der er ingen mellemvej – du kan ikke raise med et lavere beløb end 2× ante, og du kan ikke "check" og se flere kort. Denne ene beslutning er spillets strategiske kerne.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Trin 4 – Dealer vender kort:</strong> Dealeren afslører sine fem kort. Først vurderes det, om dealeren qualifier: dealeren skal have mindst Ace-King high (et es og en konge som de to højeste kort, eller bedre). Hvis dealerens bedste 5-korts hånd er lavere end Ace-King high (f.eks. Ace-Queen eller King-Queen), qualifier dealeren ikke.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Trin 5A – Dealer qualifier ikke:</strong> Du modtager 1:1 på din ante-indsats. Din raise-indsats returneres (push). Det er ligegyldigt om du har Royal Flush – du får kun ante-udbetalingen. Dette scenarie forekommer i ca. 43,7 % af alle hænder og er den mest frustrerende mekanik for nye spillere.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Trin 5B – Dealer qualifier, du vinder:</strong> Din ante betaler 1:1, og din raise-indsats betaler ud ifølge udbetalingstabellen baseret på din hånds rang (f.eks. 100:1 for Royal Flush, 7:1 for fuldt hus, 1:1 for et par eller bedre).
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Trin 5C – Dealer qualifier, du taber:</strong> Du mister både ante og raise. Ved uafgjort (samme håndrang og kickers) returneres begge indsatser.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Bordets layout og indsatsfelter</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Et standard Caribbean Stud-bord har tre indsatsfelter pr. spillerposition: "Ante" (den obligatoriske startindsats), "Raise" (2× ante, kun placeret efter kortvurdering) og "Progressive Jackpot" (en separat slot eller felt til jackpot-indsatsen). Nogle moderne borde tilføjer yderligere side-bets som "5+1 Bonus" (kombinerer dine 5 kort med dealerens synlige kort til den bedste 6-korts hånd), men disse har typisk en høj husets fordel og anbefales ikke for seriøse spillere.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Informationsdeling ved fysiske borde</h3>
          <p className="text-muted-foreground leading-relaxed">
            En vigtig etikette-regel ved fysiske Caribbean Stud-borde: du må normalt ikke dele information om dine kort med andre spillere under hånden. Denne regel beskytter spillets integritet, fordi viden om andre spilleres kort ændrer sandsynlighederne for dealerens hånd. I online og live casino-format er dette naturligvis ikke et problem, da du ikke kan se andre spilleres kort. Dog har nogle avancerede strategier til fysiske borde forsøgt at udnytte informationsdeling – dette er generelt forbudt og kan resultere i udelukkelse fra bordet.
          </p>
        </section>

        <InlineCasinoCards title="Anbefalede casinoer med Caribbean Stud" count={3} />

        {/* ──── Sektion 4: Optimal strategi ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Optimal strategi for Caribbean Stud – fra simpel til avanceret
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den perfekte strategi for Caribbean Stud Poker er ekstremt kompleks og afhænger af alle fem af dine kort samt dealerens synlige kort. Den fuldstændige optimale strategi involverer hundredvis af specifikke regler og undtagelser, men heldigvis fanger en forenklet version 95 %+ af den teoretiske værdi. Vi gennemgår strategien i tre niveauer: begynder, mellem og avanceret.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Niveau 1: Den simplificerede 3-trins strategi (begynder)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p><strong>Regel 1:</strong> Raise altid med et par eller bedre. Uanset dealerens synlige kort er det altid korrekt at raise med et par – selv et par af toere. Sandsynligheden for at dealeren har et højere par er reel, men den forventede værdi af raise er stadig markant bedre end at miste ante.</p>
              <p><strong>Regel 2:</strong> Fold altid med mindre end Ace-King high. Hænder uden Ace-King kan ikke slå en qualifying dealer (der minimum har AK), så fold er det korrekte valg uden undtagelse. En hand som Queen-Jack-Ten-Nine-Eight ser stærk ud, men den kan aldrig slå en qualifying dealer og er derfor et automatisk fold.</p>
              <p><strong>Regel 3:</strong> Med Ace-King high, raise hvis mindst ét af dine kort matcher dealerens synlige kort (samme rang). Fold ellers. Denne simplificerede AK-regel er ikke perfekt, men den er let at huske og fanger størstedelen af den forventede værdi.</p>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold text-foreground mb-3">Niveau 2: AK-qualifier-tabellen (mellem)</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ace-King hænder er de mest komplekse at spille korrekt i Caribbean Stud, fordi de befinder sig præcis på grænsen mellem profitable raises og tabsgivende calls. Den forenklede AK-regel fra Niveau 1 kan forbedres med følgende nuancer:
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Regel 3A:</strong> Raise med AK hvis mindst ét af dine øvrige tre kort matcher dealerens synlige kort (samme rang). Eksempel: Du har A-K-8-5-3, og dealerens synlige kort er 8. Raise – din 8'er matcher. <strong>Regel 3B:</strong> Hvis ingen match, raise kun hvis dealerens synlige kort er en 2-Q OG du har en dronning (Q) i din hånd OG din fjerdehøjeste kort er højere end dealerens kort. Eksempel: Du har A-K-Q-7-3, og dealerens synlige kort er 6. Raise – du har Q, og din 4. kicker (7) er højere end dealerens 6. <strong>Regel 3C:</strong> Fold alle andre AK-situationer.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Niveau 3: Avanceret AK-strategi (ekspert)</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den avancerede AK-strategi tager også højde for, om dealerens synlige kort matcher nogen af dine kickers, og for den specifikke kombination af dine fem kort. De vigtigste avancerede regler er:
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Hvis dealerens upcard er en Ace eller King, og du har AK uden par, bør du altid folde. Grunden er, at dealerens chance for at have et par (og dermed slå dig) stiger markant, når dealerens synlige kort er højt. Hvis dealerens upcard er 2-Q, og du har AK med en dronning plus en kicker der er højere end dealerens kort, raise. Hvis dealerens upcard er 2-Q, du har AK uden dronning, men to af dine kickers er højere end dealerens kort, raise. Disse nuancer reducerer husets fordel med yderligere 0,1-0,2 procentpoint, fra ca. 5,22 % til under 5,0 %.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">EV-analyse: Raise vs. fold for marginale hænder</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For at illustrere strategien konkret med Expected Value-beregninger: Med et par seksere mod en dealer 7, er den forventede værdi af raise +0,52 enheder (pr. ante-enhed). Foldet ville koste dig 1,0 enheder, så raise sparer dig 1,52 enheder i forventet værdi. Med AK-Q-7-3 mod en dealer 6 er EV af raise +0,08 enheder – marginalt positiv, men stadig bedre end fold (-1,0). Selv den mindste positive EV akkumulerer over hundredvis af hænder.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Med AK-J-8-4 mod en dealer Q er EV af raise -0,12 enheder. Det er negativt, men fold er -1,0 enheder. Raise er stadig langt det bedre valg, fordi du mister 0,12 enheder i gennemsnit i stedet for 1,0 enhed. Denne indsigt er kritisk: mange raises i Caribbean Stud er teknisk "tabsgivende" (negativ EV), men de er stadig korrekte, fordi alternativet (fold) er endnu værre.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            En vigtig indsigt er, at du aldrig bør folde et par, selv et par af toere mod en dealer-Ace. Sandsynligheden for at dealeren har et højere par er reel, men den forventede værdi af raise er stadig bedre end at miste ante. Mange begyndere folder lave par mod høje dealer-upcards, hvilket er en af de dyreste fejl i Caribbean Stud – den koster ca. 3,5 % i ekstra husets fordel pr. forekomst.
          </p>
        </section>

        {/* ──── Sektion 5: Progressiv Jackpot Matematik ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Progressiv jackpot-matematik – dybdegående break-even analyse
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den progressive jackpot i Caribbean Stud er spillets mest forførende element – og samtidig det mest misforståede. For at vurdere om jackpot-indsatsen er matematisk forsvarlig, skal vi analysere den forventede værdi baseret på den aktuelle jackpot-størrelse, udbetalingsstruktur og sandsynligheder.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Progressive jackpot-udbetalinger – standard struktur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Hånd</th>
                      <th className="py-2 text-left font-semibold">Udbetaling</th>
                      <th className="py-2 text-left font-semibold">Sandsynlighed</th>
                      <th className="py-2 text-left font-semibold">Bidrag til EV (pr. kr.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold">Royal Flush</td><td className="py-2">100 % af jackpot</td><td className="py-2">1 / 649.740</td><td className="py-2">Jackpot / 649.740</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Straight Flush</td><td className="py-2">10 % af jackpot</td><td className="py-2">1 / 72.193</td><td className="py-2">0,1 × Jackpot / 72.193</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Fire ens</td><td className="py-2">500 kr.</td><td className="py-2">1 / 4.165</td><td className="py-2">0,12 kr.</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Fuldt hus</td><td className="py-2">100 kr.</td><td className="py-2">1 / 694</td><td className="py-2">0,14 kr.</td></tr>
                    <tr><td className="py-2 font-semibold">Flush</td><td className="py-2">50 kr.</td><td className="py-2">1 / 509</td><td className="py-2">0,10 kr.</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold text-foreground mb-3">Break-even jackpot-størrelse: det magiske tal</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Med standard progressive udbetalinger er break-even punktet ca. 263.204× indsatsen. Ved en 10 kr.-indsats skal jackpotten altså overstige 2.632.040 kr. for at side-bettet har positiv forventet værdi. I praksis når de fleste online progressive jackpots dette niveau ekstremt sjældent – typisk resettes de ved 500.000-1.500.000 kr.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Beregningen er gennemsigtig: De faste udbetalinger (fire ens, fuldt hus, flush) bidrager med ca. 0,36 kr. pr. 10 kr. indsats. For at den samlede forventede værdi skal overstige 10 kr., skal Royal Flush- og Straight Flush-komponenterne kompensere for de resterende 9,64 kr. Med Royal Flush-sandsynligheden på 1/649.740 kræves en jackpot, der er stor nok til at gøre det ene milliontal værdifuldt nok i forventning.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Jackpot-indsatsen som underholdningsudgift</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Selvom matematik taler imod den progressive indsats, er der et legitimt argument for at spille den som underholdningsudgift. Ved 60 hænder i timen koster jackpot-indsatsen ca. 260 kr./time i forventet tab ved 10 kr. pr. hånd (ved en typisk jackpot-størrelse). Sammenlignet med andre underholdningsformer – en biografbillet koster 120 kr. for 2 timer – er dette en moderat udgift for den spænding, en potentielt seksifret jackpot tilbyder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Praktisk anbefaling:</strong> Hvis du spiller Caribbean Stud primært for underholdning og har råd til den ekstra udgift, er jackpot-indsatsen fin. Hvis du er matematisk orienteret og ønsker at minimere husets fordel, bør du konsekvent undlade jackpot-indsatsen og fokusere på optimal ante/raise-strategi. Uanset hvad bør du altid spille inden for dit <Link to="/ansvarligt-spil" className={linkClass}>budget for ansvarligt spil</Link>.
          </p>
        </section>

        {/* ──── Sektion 6: EV-model og timepris ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Coins className="h-5 w-5 text-primary" />
            EV-model: Hvad koster Caribbean Stud pr. time?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For at vurdere Caribbean Stud som underholdningsinvestering skal vi beregne den forventede omkostning pr. time. Denne beregning kræver tre variabler: ante-størrelse, antal hænder pr. time og husets effektive fordel inklusive din strategis kvalitet.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Forventet tab pr. time – scenarieanalyse
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Scenarie</th>
                      <th className="py-2 text-left font-semibold">Ante</th>
                      <th className="py-2 text-left font-semibold">Gns. total indsats</th>
                      <th className="py-2 text-left font-semibold">Hænder/time</th>
                      <th className="py-2 text-left font-semibold">Forventet tab/time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">Online RNG (lavt)</td><td className="py-2">25 kr.</td><td className="py-2">62 kr.</td><td className="py-2">80</td><td className="py-2">259 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">Online RNG (medium)</td><td className="py-2">50 kr.</td><td className="py-2">125 kr.</td><td className="py-2">80</td><td className="py-2">518 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">Live Casino (medium)</td><td className="py-2">50 kr.</td><td className="py-2">125 kr.</td><td className="py-2">40</td><td className="py-2">259 kr.</td></tr>
                    <tr><td className="py-2">Live Casino (højt)</td><td className="py-2">200 kr.</td><td className="py-2">500 kr.</td><td className="py-2">40</td><td className="py-2">1.036 kr.</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            "Gns. total indsats" inkluderer ante + den gennemsnitlige raise (du raiser ca. 52 % af hænderne med optimal strategi, og raise er 2× ante). Bemærk den store forskel mellem online RNG og live casino: online spilles ca. 80 hænder/time (du kontrollerer tempoet), mens live casino typisk kører 35-45 hænder/time. For bankroll-bevarende spillere er live casino derfor det billigste format pr. underholdningstime.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Sammenlignet med andre bordspil:</strong> Ved en 50 kr. ante i Caribbean Stud (live) mister du ca. 259 kr./time. Til sammenligning koster <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> med 50 kr. indsatser ca. 50-75 kr./time (med basic strategy), og <Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>europæisk roulette</Link> med 50 kr. pr. spin koster ca. 81 kr./time. Caribbean Stud er derfor et af de dyrere bordspil at spille, men tilbyder til gengæld muligheden for progressive jackpot-gevinster, som de andre spil mangler.
          </p>
        </section>

        {/* ──── Sektion 7: Avanceret collusion & informationsudnyttelse ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Informationsudnyttelse og collusion-teori
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            En af de mest fascinerende aspekter af Caribbean Stud-teori er den potentielle fordel ved at kende andre spilleres kort. Ved et fysisk bord med 7 spillere er 35 kort uddelt (5 til hver spiller + 5 til dealeren). Hvis alle spillere delte deres kort, ville du kende 39 kort (dine 5 + 6 andre spilleres 30 + dealerens 1 synlige + dealerens 4 ukendte). Med kun 13 ukendte kort (52 - 39 = 13) ville din strategiske fordel stige dramatisk.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Forskning af Peter Griffin og andre casino-matematikere har estimeret, at perfekt informationsdeling (legal collusion) ved et fuldt bord kan reducere husets fordel med op til 2,3 procentpoint – fra 5,22 % til ca. 2,9 %. Denne reduktion skyldes primært forbedret beslutningstagning med AK-hænder, hvor viden om, at bestemte kort allerede er fordelt, gør det lettere at vurdere sandsynligheden for dealerens hånd.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I praksis er informationsdeling dog forbudt ved de fleste casinoborde. Reglerne varierer, men de fleste casinoer har en "one player to a hand"-regel, der forhindrer spillere i at dele information under hånden. Ved online og live casino-spil er problemet irrelevant, da du ikke kan se andre spilleres kort. Dog illustrerer collusion-teorien et vigtigt princip: i Caribbean Stud er information ekstremt værdifuld, og selv partiel information (f.eks. at se ét af en medspillers kort ved et fysisk bord) kan forbedre din strategi marginalt.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Etiske og juridiske overvejelser</h3>
          <p className="text-muted-foreground leading-relaxed">
            Det er vigtigt at understrege, at aktiv informationsdeling (signalering, kortvisning til medspillere) er forbudt og kan resultere i udelukkelse fra casinoet. Passiv informationsudnyttelse – at observere kort, der utilsigtet afsløres – befinder sig i en gråzone. Vores anbefaling er at spille etisk og følge casinoets regler. Den strategiske fordel ved collusion er under alle omstændigheder lille sammenlignet med den risiko, det medfører. Fokuser i stedet på at perfektionere din AK-strategi, som er lovlig, etisk og langt mere praktisk.
          </p>
        </section>

        {/* ──── Sektion 8: Varianter og relaterede spil ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-primary" />
            Caribbean Stud varianter og relaterede casino-pokerspil
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Caribbean Stud har inspireret en række afledte spil, der modificerer grundreglerne for at tilbyde forskellige risikoprofiler og strategiske muligheder. Forståelse af disse varianter hjælper dig med at vælge det bedste spil for din spillestil og risikoappetit.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Caribbean Draw Poker</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I Caribbean Draw har spilleren mulighed for at bytte op til 2 kort efter at have set dealerens synlige kort, mod en ekstra indsats lig med ante. Denne tilføjelse reducerer husets fordel betydeligt (til ca. 2,6 % med optimal strategi), men den ekstra indsats øger den samlede risiko pr. hånd. Byttestrategien tilføjer et helt nyt strategisk lag: du skal vurdere ikke kun om du vil raise, men også hvilke kort du vil bytte, og om byttet er værd den ekstra ante. Generelt bør du bytte kort, der ikke bidrager til din bedste draw, og beholde par, to par og bedre intakt.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Casino Hold'em</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Casino Hold'em kombinerer Caribbean Stud-konceptet (spiller mod dealer) med Texas Hold'em-mekanikken (community-kort). Du modtager to kort, og der lægges tre community-kort (flop). Du beslutter om du vil calle (2× ante) eller folde. Derefter lægges turn og river, og den bedste 5-korts hånd vinder. Husets fordel er ca. 2,16 % med optimal strategi, hvilket gør det til et af de mest fordelagtige casino-pokerspil – markant bedre end Caribbean Studs 5,22 %. Strategien er dog mere kompleks, fordi du skal evaluere din hånd med community-kort.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Oasis Poker</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Oasis Poker er en variant, der tillader spilleren at bytte et vilkårligt antal kort (1-5) mod en ekstra indsats pr. kort (typisk 1× ante pr. kort). Denne fleksibilitet giver spilleren mere kontrol, men de ekstra indsatser kan akkumulere hurtigt. Optimal strategi involverer at beregne, om den forventede forbedring af din hånd retfærdiggør den ekstra indsats. Med perfekt strategi er husets fordel ca. 1,35 % – den laveste af alle Caribbean-familien-spil.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Sammenligning: Hvilket casino-pokerspil er bedst?</h3>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Spil</th>
                      <th className="py-2 text-left font-semibold">Husets fordel</th>
                      <th className="py-2 text-left font-semibold">Strategikompleksitet</th>
                      <th className="py-2 text-left font-semibold">Jackpot-potentiale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold">Oasis Poker</td><td className="py-2">1,35 %</td><td className="py-2">Høj</td><td className="py-2">Nej</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Casino Hold'em</td><td className="py-2">2,16 %</td><td className="py-2">Moderat</td><td className="py-2">Nej</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Caribbean Draw</td><td className="py-2">2,60 %</td><td className="py-2">Moderat</td><td className="py-2">Sjældent</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold"><Link to="/casinospil/poker/three-card-poker" className={linkClass}>Three Card Poker</Link></td><td className="py-2">3,37 %</td><td className="py-2">Lav</td><td className="py-2">Ja (valgfrit)</td></tr>
                    <tr className="bg-muted/30"><td className="py-2 font-bold">Caribbean Stud</td><td className="py-2 font-bold">5,22 %</td><td className="py-2 font-bold">Moderat</td><td className="py-2 font-bold">Ja (progressiv)</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed">
            Caribbean Stud har den højeste husets fordel i denne gruppe, men kompenserer med den mest tilgængelige progressive jackpot-mekanik. Hvis dit primære mål er at minimere husets fordel, er Casino Hold'em eller Oasis Poker bedre valg. Hvis du jagter jackpots og ønsker et simpelt, underholdende spil, er Caribbean Stud stadig et solidt valg.
          </p>
        </section>

        {/* ──── Sektion 9: De dyreste strategiske fejl ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            De 8 mest kostbare fejl i Caribbean Stud Poker
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Selv erfarne spillere laver systematiske fejl, der kan fordoble husets effektive fordel. Her gennemgår vi de mest udbredte fejl rangeret efter deres omkostning i procentpoint ekstra husets fordel.
          </p>

          <div className="space-y-4 mb-6">
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 1: Folde lave par mod høje dealer-upcards (+3,5 % ekstra)</p>
                <p className="text-sm text-muted-foreground">Et par toere mod en dealer-Ace ser skræmmende ud, men raise er altid korrekt. Folding af ethvert par er den dyreste enkeltstående fejl i Caribbean Stud, fordi du opgiver en profitable situation.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 2: Raise med alle AK-hænder uden strategi (+1,8 % ekstra)</p>
                <p className="text-sm text-muted-foreground">Mange spillere raiser automatisk med Ace-King, uanset kickers og dealerens upcard. Korrekt AK-strategi sparer ca. 1,8 procentpoint i husets fordel.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 3: Altid spille progressive jackpot (+variabel)</p>
                <p className="text-sm text-muted-foreground">Ved lave jackpot-niveauer har denne side-bet en husets fordel på 26 %+. Det er den dyreste indsats på hele bordet og bør undgås af seriøse spillere.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 4: Folde alle hænder under et par (+2,1 % ekstra)</p>
                <p className="text-sm text-muted-foreground">Mange begyndere folder alt under et par, inklusiv AK-hænder der kvalificerer til raise. Husk: AK med den rigtige kicker-kombination er en profitable raise.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 5: Ignorere udbetalingstabelvariationer (+0,5-2 %)</p>
                <p className="text-sm text-muted-foreground">Ikke alle Caribbean Stud-borde har identiske udbetalingstabeller. Nogle reducerer flush fra 5:1 til 4:1, hvilket øger husets fordel med ca. 1,1 procentpoint. Tjek altid tabellen.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 6: Chase tab med stigende indsatser (variabel)</p>
                <p className="text-sm text-muted-foreground">Martingale eller andre progressionssystemer ændrer ikke husets matematiske fordel. De øger kun din risiko for ruin uden at forbedre din langsigtede forventning.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 7: Spille for hurtigt online (+0 % men højere eksponering)</p>
                <p className="text-sm text-muted-foreground">Online RNG-Caribbean Stud kan spilles med 80+ hænder/time. Hvert ekstra spil pr. time øger dit samlede forventede tab proportionelt. Tag dig tid og nyd spillet.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 8: Spille 5+1 Bonus side-bets (+10-18 % ekstra)</p>
                <p className="text-sm text-muted-foreground">Sekundære side-bets som 5+1 Bonus har typisk en husets fordel på 10-18 %. De er designet til at dræne din bankroll langsomt og bør undgås af alle spillere undtagen de mest casual underholdningsorienterede.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ──── Sektion 10: Bankroll management for Caribbean Stud ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Bankroll management – overlev variansen i Caribbean Stud
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Caribbean Stud har en moderat-til-høj varians sammenlignet med andre casinospil. Kombinationen af den binære raise/fold-beslutning, dealer-qualifying mekanikken (43,7 % af tiden mister du dine store hænders fulde udbetaling) og den progressive jackpots høje volatilitet skaber et spil, hvor din bankroll kan svinge betydeligt fra session til session.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Anbefalede bankroll-niveauer for Caribbean Stud:</strong> For casual spillere anbefaler vi minimum 40-50 ante-enheder pr. session. Ved en 50 kr. ante svarer det til en sessionsbankroll på 2.000-2.500 kr. For seriøse spillere, der ønsker at spille over længere perioder, anbefales 100-150 ante-enheder pr. session (5.000-7.500 kr. ved 50 kr. ante). Disse tal inkluderer bufferen for raise-indsatserne, der i gennemsnit fordobler din totale indsats pr. hånd.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Stop-loss strategi:</strong> Sæt en klar grænse for, hvor meget du er villig til at tabe pr. session. En tommelfingerregel er at stoppe efter et tab på 50 % af din sessionsbankroll. Ved en 2.500 kr. bankroll stopper du altså ved et tab på 1.250 kr. Denne disciplin beskytter dig mod de værste downswings og sikrer, at du kan vende tilbage til bordet en anden dag med frisk kapital og et klart hoved.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Gevinstmål:</strong> Lige så vigtigt som et stop-loss er et gevinstmål. En realistisk target er 30-50 % gevinst på din sessionsbankroll. Når du har vundet 750-1.250 kr. på en 2.500 kr. bankroll, overvej at afslutte sessionen eller i det mindste "låse" en del af gevinsten ind (f.eks. lægge halvdelen til side og fortsætte med resten). Mange spillere taber deres gevinster ved at spille for længe – disciplin i begge retninger er nøglen til langsigtet nydelse af <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
          </p>
        </section>

        {/* ──── Sektion 11: Live Casino vs. RNG ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Live Casino vs. RNG – hvilket format passer dig?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Caribbean Stud er tilgængeligt i to fundamentalt forskellige formater hos danske online casinoer: RNG (Random Number Generator) og Live Casino. Hvert format har distinkte fordele og ulemper, der påvirker din oplevelse, tempo, bankroll og underholdningsværdi.
          </p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  RNG (Software-baseret)
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>✅ Lavere minimumsindsatser (fra 5-10 kr.)</p>
                <p>✅ Du kontrollerer tempoet helt selv</p>
                <p>✅ Tilgængeligt 24/7 uden ventetid</p>
                <p>✅ Demo-mode til øvelse uden risiko</p>
                <p>⚠️ Højere tempo = flere hænder = større eksponering</p>
                <p>⚠️ Mangler social og atmosfærisk oplevelse</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Live Casino
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>✅ Autentisk casinoatmosfære med rigtige dealere</p>
                <p>✅ Langsommere tempo = lavere timepris</p>
                <p>✅ Social interaktion via chat</p>
                <p>✅ Progressive jackpots er ofte større</p>
                <p>⚠️ Højere minimumsindsatser (typisk 25-50 kr.)</p>
                <p>⚠️ Begrænset tilgængelighed (åbningstider)</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Vores anbefaling:</strong> For nye spillere anbefaler vi at starte med RNG-versionen i demo-mode for at lære strategien risikofrit. Når du er komfortabel med raise/fold-beslutningerne og AK-strategien, skift til live casino for den bedste samlede oplevelse. Live-formatets langsommere tempo reducerer din timeomkostning og tilbyder en langt mere engagerende oplevelse. <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> og Playtech leverer de mest populære live Caribbean Stud-borde hos danske casinoer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>RTP-forskel mellem formater:</strong> Begge formater bruger den samme grundlæggende sandsynlighed (52 kort, standard regler), men der kan være små forskelle i udbetalingstabeller. Live casino-borde har tendens til at tilbyde lidt bedre udbetalinger på progressive jackpots, fordi den fysiske mekanik og den sociale dimension tiltrækker flere spillere og dermed højere jackpot-puljer. RNG-versioner kan have lidt reducerede udbetalingstabeller, men dette varierer mellem udbydere. Tjek altid udbetalingstabellen, uanset format.
          </p>
        </section>

        {/* ──── Sektion 12: Dansk lovgivning og skatteforhold ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Caribbean Stud i Danmark – licenser, skat og lovgivning
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For danske spillere er det vigtigt at forstå de regulatoriske rammer for Caribbean Stud Poker. Spillet er fuldt lovligt at spille hos casinoer med dansk licens fra Spillemyndigheden, og alle gevinster fra kasinospil er skattefrie for spilleren – casinoet betaler afgifterne. Dette gælder for alle Caribbean Stud-gevinster, inklusive progressive jackpots.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Spillemyndighedens <Link to="/casino-licenser" className={linkClass}>licensregler</Link> stiller krav til, at alle casinospil har en minimal RTP (typisk over 85 %) og at tilfældighed garanteres af certificerede RNG-systemer. Caribbean Studs standard-RTP på 94,78 % (uden progressiv jackpot) overstiger dette minimum komfortabelt. Derudover kræver Spillemyndigheden, at casinoer tilbyder værktøjer til <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>, herunder indsatsgrænser, selvudelukkelse og ROFUS-integration.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Skattemæssige overvejelser for professionelle:</strong> Selvom casino-gevinster generelt er skattefrie i Danmark, gælder der særlige regler for spillere, der spiller så professionelt og systematisk, at SKAT kan vurdere aktiviteten som erhvervsmæssig. For Caribbean Stud er dette dog ekstremt usandsynligt, da spillet har en negativ forventet værdi for spilleren – ingen kan professionelt "leve af" Caribbean Stud. Læs mere om <Link to="/casinoer/casino-og-skat" className={linkClass}>casino og skat</Link> i vores dedikerede guide.
          </p>
        </section>

        <RelatedGuides currentPath="/casinospil/poker/caribbean-stud" />
        <FAQSection faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
}
