import { Link } from "react-router-dom";
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
  TrendingUp, AlertTriangle, Calculator, Scale,
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
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="35 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Caribbean Stud Poker bord med dealer og progressive jackpot display" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ──── Sektion 1: Odds & Sandsynligheder ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Odds og sandsynligheder i Caribbean Stud Poker
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Caribbean Stud Poker spilles med en standard 52-korts bunke, og sandsynlighederne følger de klassiske 5-korts pokerhænder. Det unikke ved spillet er asymmetrien: du ser kun ét af dealerens fem kort, mens dealeren aldrig ser dine. Denne informationsasymmetri er fundamentet for al strategisk beslutningstagning.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Udbetalingstabel – standard version</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den mest udbredte udbetalingstabel for Caribbean Stud på danske online casinoer giver følgende multipliers på raise-indsatsen: Royal Flush 100:1, Straight Flush 50:1, Fire ens 20:1, Fuldt hus 7:1, Flush 5:1, Straight 4:1, Tre ens 3:1, To par 2:1, og Et par eller mindre 1:1. Ante-indsatsen betaler altid 1:1 uanset håndens styrke, forudsat at dealeren qualifier.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Dealer-qualifying frekvens</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Dealeren qualifier (har mindst Ace-King high) i cirka 56,3 % af alle hænder. Det betyder, at i 43,7 % af hænderne modtager du kun 1:1 på ante, uanset om du har en flush eller fire ens. Dette er en kritisk faktor i spillets matematik – store hænder mister deres fulde udbetalingspotentiale næsten halvdelen af tiden.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Sandsynligheden for de mest populære hænder er: Et par eller bedre forekommer i 49,9 % af hænderne, to par i 4,75 %, tre ens i 2,11 %, straight i 0,39 %, flush i 0,20 %, fuldt hus i 0,14 %, fire ens i 0,024 %, straight flush i 0,0014 %, og Royal Flush i 0,00015 %. Disse tal danner grundlaget for Expected Value-beregningerne i strategisektionen.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Sammenligning med andre bordspil</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Med en husets fordel på 5,22 % ligger Caribbean Stud markant højere end blackjack (0,5 %) og baccarat (1,06 %), men lavere end mange spilleautomater og betydeligt lavere end de fleste live game shows. Sammenlignet med <Link to="/casinospil/poker/three-card-poker" className={linkClass}>Three Card Poker</Link> (3,37 %) er Caribbean Stud dyrere pr. hånd, men tilbyder langt større jackpot-potentiale via den progressive side-bet.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            For danske spillere på casinoer med <Link to="/casino-licenser" className={linkClass}>dansk licens</Link> er det vigtigt at forstå, at den lovpligtige RTP (Return to Player) for Caribbean Stud typisk rapporteres inklusiv den progressive jackpot-komponent, hvilket kan skævvride sammenligningen. Den faktiske RTP uden jackpot er ca. 94,78 %, mens den med en gennemsnitlig jackpot-størrelse kan nå 96-97 %.
          </p>
        </section>

        <InlineCasinoCards title="Bedste casinoer til Caribbean Stud" count={3} />

        {/* ──── Sektion 2: Regler ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Regler for Caribbean Stud Poker – trin for trin
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Caribbean Stud Poker er et af de mest tilgængelige casino-bordspil, fordi du kun spiller mod dealeren – aldrig mod andre spillere. Spillet foregår på et halvmåneformet bord med plads til typisk 5-7 spillere, men hver spiller har sin egen individuelle duel med dealeren.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Spillets gang</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            1) Du placerer din ante-indsats i det markerede felt. Hvis bordet har en progressiv jackpot, kan du også placere en $1-indsats i jackpot-slotten. 2) Dealeren uddeler fem kort til hver spiller og sig selv – dine kort er alle synlige for dig, mens dealeren har fire kort med bagsiden opad og ét kort synligt. 3) Du vurderer din hånd mod dealerens synlige kort og beslutter: Raise (placer en indsats lig med 2× din ante) eller Fold (mist din ante). 4) Dealeren vender sine kort. Hvis dealeren ikke har mindst Ace-King high, qualifier hun ikke, og du vinder 1:1 på ante, mens raise returneres. 5) Hvis dealeren qualifier, sammenlignes hænderne – den bedste pokerhånd vinder.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Dealer-qualifying reglen</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den mest misforståede regel i Caribbean Stud er dealer-qualifying. Når dealeren ikke har Ace-King eller bedre, er spillet reelt slut efter ante-udbetalingen. Det betyder, at selvom du sidder med en straight flush, modtager du kun 1:1 på ante – din raise-indsats returneres blot. Denne mekanik er designet til at beskytte huset og er den primære kilde til husets fordel. Erfarne spillere forstår, at dette dramatisk reducerer den forventede udbetaling for store hænder.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Progressive jackpot-regler</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den progressive jackpot er et separat side-bet, typisk med en fast indsats på $1 eller tilsvarende. Jackpotten udbetales udelukkende baseret på din hånd – dealerens kort er irrelevante. Standard progressive udbetalinger er: Royal Flush = 100 % af jackpotten, Straight Flush = 10 % af jackpotten, Fire ens = $500, Fuldt hus = $100, Flush = $50. Disse beløb varierer mellem casinoer, så tjek altid udbetalingstabellen før du spiller.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Det er værd at bemærke, at den progressive jackpot-indsats har en husets fordel på helt op til 26 % ved lave jackpot-niveauer. Denne falder naturligvis i takt med at jackpotten vokser, men den når sjældent break-even. For underholdningsværdi er jackpot-indsatsen fin, men matematisk orienterede spillere bør generelt undgå den.
          </p>
        </section>

        <InlineCasinoCards title="Populære casinoer med poker-spil" count={3} />

        {/* ──── Sektion 3: Optimal strategi ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Optimal strategi for Caribbean Stud Poker
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den perfekte strategi for Caribbean Stud Poker er ekstremt kompleks og afhænger af alle fem af dine kort samt dealerens synlige kort. En forenklet version, der fanger 95 %+ af den teoretiske værdi, kan opsummeres i tre simple regler.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Den simplificerede 3-trins strategi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p><strong>Regel 1:</strong> Raise altid med et par eller bedre. Uanset dealerens synlige kort er det altid korrekt at raise med et par – selv et par af toere.</p>
              <p><strong>Regel 2:</strong> Fold altid med mindre end Ace-King high. Hænder uden Ace-King kan ikke slå en qualifying dealer, så fold er det korrekte valg uden undtagelse.</p>
              <p><strong>Regel 3:</strong> Med Ace-King high, brug AK-qualifier-tabellen nedenfor.</p>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold text-foreground mb-3">AK-qualifier-tabellen</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ace-King hænder er de mest komplekse at spille korrekt. Den forenklede regel er: Raise med AK hvis mindst ét af dine øvrige kort matcher dealerens synlige kort (samme rang). Hvis ikke, raise kun hvis dealerens kort er en 2-Q OG du har en dronning i din hånd. Fold i alle andre AK-situationer. Denne regel er ikke perfekt, men den fanger størstedelen af den forventede værdi fra AK-hænder.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Den avancerede AK-strategi tager også højde for, om dealerens synlige kort matcher nogen af dine kickers. Specifikt: Hvis dealerens upcard er en Ace eller King, og du har AK, bør du altid folde (medmindre du har et par). Hvis dealerens upcard er 2-Q, og du har AK med dronning og en kicker der er højere end dealerens kort, raise. Disse nuancer reducerer husets fordel med yderligere 0,1-0,2 procentpoint.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">EV-analyse af raise vs. fold</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For at illustrere strategien konkret: Med et par seksere mod en dealer 7, er den forventede værdi af raise +0,52 enheder (pr. ante-enhed). Med AK-Q-7-3 mod en dealer 6 er EV af raise +0,08 enheder – marginalt positiv, men stadig bedre end fold (-1,0). Med AK-J-8-4 mod en dealer Q er EV af raise -0,12 enheder, men fold er -1,0, så raise er stadig korrekt.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            En vigtig indsigt er, at du aldrig bør folde et par, selv et par af toere mod en dealer-Ace. Sandsynligheden for at dealeren har et højere par er reel, men den forventede værdi af raise er stadig bedre end at miste ante. Mange begyndere folder lave par mod høje dealer-upcards, hvilket er en af de dyreste fejl i Caribbean Stud.
          </p>
        </section>

        {/* ──── Sektion 4: Progressiv Jackpot Matematik ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Progressiv jackpot-matematik og break-even analyse
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den progressive jackpot i Caribbean Stud er spillets mest forførende element – og samtidig det mest misforståede. For at vurdere om jackpot-indsatsen er matematisk forsvarlig, skal vi analysere den forventede værdi baseret på den aktuelle jackpot-størrelse.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Break-even jackpot-størrelse</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Med standard progressive udbetalinger (100 % for Royal Flush, 10 % for Straight Flush) er break-even punktet ca. 263.204× indsatsen. Ved en $1-indsats skal jackpotten altså overstige $263.204 for at side-bettet har positiv forventet værdi. I praksis når de fleste online progressive jackpots dette niveau ekstremt sjældent – typisk resettes de ved $50.000-$150.000.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Beregningen er simpel: Sandsynligheden for Royal Flush er 1/649.740. For at $1-indsatsen har EV ≥ $0, skal den forventede udbetaling (jackpot × 1/649.740 + øvrige gevinster) overstige $1. De øvrige gevinster fra straight flush, fire ens osv. bidrager med ca. $0,10 pr. hånd, så jackpotten skal kompensere for de resterende $0,90.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Jackpot-indsats som underholdning</h3>
          <p className="text-muted-foreground leading-relaxed">
            Selvom matematik taler imod den progressive indsats, er der et legitimt argument for at spille den som underholdningsudgift. Ved 60 hænder i timen koster jackpot-indsatsen ca. $26/time i forventet tab (ved en typisk jackpot-størrelse). Sammenlignet med andre underholdningsformer er dette relativt beskedent, og drømmen om at ramme en seksifret jackpot har en reel underholdningsværdi for mange spillere.
          </p>
        </section>

        {/* ──── Sektion 5: Varianter ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-primary" />
            Caribbean Stud varianter og relaterede spil
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Caribbean Stud har inspireret en række afledte spil, der modificerer grundreglerne for at tilbyde forskellige risikoprofiler og strategiske muligheder.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Caribbean Draw Poker</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I Caribbean Draw har spilleren mulighed for at bytte op til 2 kort efter at have set dealerens synlige kort, mod en ekstra indsats lig med ante. Denne tilføjelse reducerer husets fordel betydeligt (til ca. 2,6 % med optimal strategi), men den ekstra indsats øger den samlede risiko pr. hånd. Spillet er mindre udbredt end standard Caribbean Stud, men findes på udvalgte online casinoer.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Casino Hold'em</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Casino Hold'em kombinerer Caribbean Stud-konceptet (spiller mod dealer) med Texas Hold'em-mekanikken (community-kort). Husets fordel er ca. 2,16 % med optimal strategi, hvilket gør det til et af de mest fordelagtige casino-pokerspil. Spillet er tilgængeligt på de fleste danske online casinoer med <Link to="/casino-licenser" className={linkClass}>dansk licens</Link>.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Sammenligning med Three Card Poker</h3>
          <p className="text-muted-foreground leading-relaxed">
            <Link to="/casinospil/poker/three-card-poker" className={linkClass}>Three Card Poker</Link> er Caribbean Studs nærmeste konkurrent i casino-poker kategorien. Med kun tre kort pr. hånd er Three Card Poker hurtigere og enklere, med en husets fordel på 3,37 % (ante-play). Caribbean Stud tilbyder til gengæld større variation i hænderne og mulighed for progressive jackpots, der kan nå seks-cifrede beløb.
          </p>
        </section>

        <InlineCasinoCards title="Anbefalede casinoer med bordspil" count={3} />

        <Separator className="mb-12" />
        <section className="mb-12"><FAQSection faqs={faqs} /></section>
        <Separator className="mb-12" />
        <AuthorBio author="jonas" />
        <Separator className="my-12" />
        <RelatedGuides currentPath="/casinospil/poker/caribbean-stud" />
      </div>
    </>
  );
}
