import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import heroImage from "@/assets/heroes/caribbean-stud-hero.jpg";

/* ──────────────────────────────────────────────
   Arketype D – Data First
   Unik H2-rækkefølge: Odds → Regler → Strategi → Jackpot → Varianter → FAQ
   ────────────────────────────────────────────── */

const faqItems = [
  {
    q: "Hvad er husets fordel i Caribbean Stud Poker?",
    a: "Den grundlæggende husets fordel i Caribbean Stud Poker er ca. 5,22 % på ante-indsatsen. Med optimal strategi kan den reduceres til omkring 5,0 %. Pair Plus side-bet har en husets fordel på 2,32 % til 7,28 % afhængigt af udbetalings-tabellen."
  },
  {
    q: "Skal man altid spille den progressive jackpot?",
    a: "Matematisk set er den progressive jackpot-indsats sjældent +EV. Jackpotten skal typisk overstige 263.000× ante-indsatsen for at side-bettet har positiv forventet værdi. De fleste progressive jackpots når aldrig dette niveau."
  },
  {
    q: "Hvad er den optimale strategi for Caribbean Stud?",
    a: "Den simplificerede optimale strategi er: Raise altid med et par eller bedre. Fold altid med mindre end dealer-qualifying (Ace-King). Med Ace-King high, raise kun hvis en af dine kort matcher dealerens synlige kort, eller hvis du har en dronning og dealerens kort er lavere end din 4. højeste kort."
  },
  {
    q: "Kan man tælle kort i Caribbean Stud?",
    a: "Caribbean Stud spilles med en enkelt kortbunke der blandes efter hver hånd, så traditionel korttælling er ikke mulig. Dog kan information fra andre spilleres synlige kort ved fysiske borde teoretisk give en lille fordel."
  },
  {
    q: "Hvad er forskellen på Caribbean Stud og Texas Hold'em?",
    a: "I Caribbean Stud spiller du kun mod dealeren, ikke andre spillere. Du modtager 5 kort uden mulighed for at bytte kort, og der er ingen community-kort. Strategien handler om at vurdere din hånd mod dealerens ene synlige kort."
  },
  {
    q: "Hvornår qualifier dealeren i Caribbean Stud?",
    a: "Dealeren skal have mindst Ace-King high for at kvalificere sig. Hvis dealeren ikke qualifier, vinder ante-indsatsen 1:1, og raise-indsatsen returneres uanset din hånd. Dette sker i ca. 44 % af alle hænder."
  },
];

export default function CaribbeanStudGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Caribbean Stud Poker – Komplet Guide med Odds, Regler og Strategi (2026)",
        description: "Dybdegående guide til Caribbean Stud Poker for danske spillere. Lær optimal raise/fold-strategi, forstå progressiv jackpot-matematik og sammenlign udbetalingstabeller på licenserede danske casinoer.",
        author: { "@type": "Person", name: "Jonas Theill" },
        publisher: { "@type": "Organization", name: "Casinoaftaler.dk" },
        datePublished: "2026-03-02",
        dateModified: "2026-03-02",
        mainEntityOfPage: "https://casinoaftaler.dk/casinospil/poker/caribbean-stud",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Caribbean Stud Poker Guide 2026 – Odds, Regler & Strategi</title>
        <meta
          name="description"
          content="Lær Caribbean Stud Poker fra bunden. Komplet dansk guide med optimal strategi, progressiv jackpot-matematik, udbetalingstabeller og de bedste casinoer med dansk licens."
        />
        <link rel="canonical" href="https://casinoaftaler.dk/casinospil/poker/caribbean-stud" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <article className="mx-auto max-w-4xl px-4 py-12 space-y-10">
        {/* Hero */}
        <header className="relative rounded-2xl overflow-hidden">
          <img src={heroImage} alt="Caribbean Stud Poker bord med dealer og progressive jackpot display" className="w-full h-[340px] md:h-[420px] object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-2">Poker · Casino Bordspil</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight">
              Caribbean Stud Poker – Komplet Guide til Odds, Regler & Optimal Strategi
            </h1>
            <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl">
              Den definitive danske guide til Caribbean Stud Poker. Fra progressiv jackpot-matematik til AK-qualifier-strategi – alt du behøver for at minimere husets fordel.
            </p>
          </div>
        </header>

        {/* QuickFacts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Husets fordel", value: "5,22 %" },
            { label: "Dealer qualifier", value: "Ace-King" },
            { label: "Kort pr. hånd", value: "5 kort" },
            { label: "Royal Flush odds", value: "1:649.740" },
          ].map((f) => (
            <div key={f.label} className="rounded-xl border border-border/50 bg-card p-3 text-center">
              <span className="block text-xs text-muted-foreground">{f.label}</span>
              <span className="block text-lg font-bold text-foreground">{f.value}</span>
            </div>
          ))}
        </div>

        <Separator />

        {/* ──── Sektion 1: Odds & Sandsynligheder ──── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Odds og sandsynligheder i Caribbean Stud Poker</h2>
          
          <p className="text-muted-foreground leading-relaxed">
            Caribbean Stud Poker spilles med en standard 52-korts bunke, og sandsynlighederne følger de klassiske 5-korts pokerhænder. Det unikke ved spillet er asymmetrien: du ser kun ét af dealerens fem kort, mens dealeren aldrig ser dine. Denne informationsasymmetri er fundamentet for al strategisk beslutningstagning.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Udbetalingstabel – standard version</h3>
          <p className="text-muted-foreground leading-relaxed">
            Den mest udbredte udbetalingstabel for Caribbean Stud på danske online casinoer giver følgende multipliers på raise-indsatsen: Royal Flush 100:1, Straight Flush 50:1, Fire ens 20:1, Fuldt hus 7:1, Flush 5:1, Straight 4:1, Tre ens 3:1, To par 2:1, og Et par eller mindre 1:1. Ante-indsatsen betaler altid 1:1 uanset håndens styrke, forudsat at dealeren qualifier.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Dealer-qualifying frekvens</h3>
          <p className="text-muted-foreground leading-relaxed">
            Dealeren qualifier (har mindst Ace-King high) i cirka 56,3 % af alle hænder. Det betyder, at i 43,7 % af hænderne modtager du kun 1:1 på ante, uanset om du har en flush eller fire ens. Dette er en kritisk faktor i spillets matematik – store hænder mister deres fulde udbetalingspotentiale næsten halvdelen af tiden.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Sandsynligheden for de mest populære hænder er: Et par eller bedre forekommer i 49,9 % af hænderne, to par i 4,75 %, tre ens i 2,11 %, straight i 0,39 %, flush i 0,20 %, fuldt hus i 0,14 %, fire ens i 0,024 %, straight flush i 0,0014 %, og Royal Flush i 0,00015 %. Disse tal danner grundlaget for Expected Value-beregningerne i strategisektionen.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Sammenligning med andre bordspil</h3>
          <p className="text-muted-foreground leading-relaxed">
            Med en husets fordel på 5,22 % ligger Caribbean Stud markant højere end blackjack (0,5 %) og baccarat (1,06 %), men lavere end mange spilleautomater og betydeligt lavere end de fleste live game shows. Sammenlignet med Three Card Poker (3,37 %) er Caribbean Stud dyrere pr. hånd, men tilbyder langt større jackpot-potentiale via den progressive side-bet.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            For danske spillere på casinoer med <Link to="/casino-licenser" className="text-primary hover:underline">dansk licens</Link> er det vigtigt at forstå, at den lovpligtige RTP (Return to Player) for Caribbean Stud typisk rapporteres inklusiv den progressive jackpot-komponent, hvilket kan skævvride sammenligningen. Den faktiske RTP uden jackpot er ca. 94,78 %, mens den med en gennemsnitlig jackpot-størrelse kan nå 96-97 %.
          </p>
        </section>

        <InlineCasinoCards title="Bedste casinoer til Caribbean Stud" count={3} />

        <Separator />

        {/* ──── Sektion 2: Regler ──── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Regler for Caribbean Stud Poker – trin for trin</h2>
          
          <p className="text-muted-foreground leading-relaxed">
            Caribbean Stud Poker er et af de mest tilgængelige casino-bordspil, fordi du kun spiller mod dealeren – aldrig mod andre spillere. Spillet foregår på et halvmåneformet bord med plads til typisk 5-7 spillere, men hver spiller har sin egen individuelle duel med dealeren.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Spillets gang</h3>
          <p className="text-muted-foreground leading-relaxed">
            1) Du placerer din ante-indsats i det markerede felt. Hvis bordet har en progressiv jackpot, kan du også placere en $1-indsats i jackpot-slotten. 2) Dealeren uddeler fem kort til hver spiller og sig selv – dine kort er alle synlige for dig, mens dealeren har fire kort med bagsiden opad og ét kort synligt. 3) Du vurderer din hånd mod dealerens synlige kort og beslutter: Raise (placer en indsats lig med 2× din ante) eller Fold (mist din ante). 4) Dealeren vender sine kort. Hvis dealeren ikke har mindst Ace-King high, qualifier hun ikke, og du vinder 1:1 på ante, mens raise returneres. 5) Hvis dealeren qualifier, sammenlignes hænderne – den bedste pokerhånd vinder.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Dealer-qualifying reglen</h3>
          <p className="text-muted-foreground leading-relaxed">
            Den mest misforståede regel i Caribbean Stud er dealer-qualifying. Når dealeren ikke har Ace-King eller bedre, er spillet reelt slut efter ante-udbetalingen. Det betyder, at selvom du sidder med en straight flush, modtager du kun 1:1 på ante – din raise-indsats returneres blot. Denne mekanik er designet til at beskytte huset og er den primære kilde til husets fordel. Erfarne spillere forstår, at dette dramatisk reducerer den forventede udbetaling for store hænder.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Progressive jackpot-regler</h3>
          <p className="text-muted-foreground leading-relaxed">
            Den progressive jackpot er et separat side-bet, typisk med en fast indsats på $1 eller tilsvarende. Jackpotten udbetales udelukkende baseret på din hånd – dealerens kort er irrelevante. Standard progressive udbetalinger er: Royal Flush = 100 % af jackpotten, Straight Flush = 10 % af jackpotten, Fire ens = $500, Fuldt hus = $100, Flush = $50. Disse beløb varierer mellem casinoer, så tjek altid udbetalingstabellen før du spiller.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Det er værd at bemærke, at den progressive jackpot-indsats har en husets fordel på helt op til 26 % ved lave jackpot-niveauer. Denne falder naturligvis i takt med at jackpotten vokser, men den når sjældent break-even. For underholdningsværdi er jackpot-indsatsen fin, men matematisk orienterede spillere bør generelt undgå den.
          </p>
        </section>

        <InlineCasinoCards title="Populære casinoer med poker-spil" count={3} />

        <Separator />

        {/* ──── Sektion 3: Optimal strategi ──── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Optimal strategi for Caribbean Stud Poker</h2>
          
          <p className="text-muted-foreground leading-relaxed">
            Den perfekte strategi for Caribbean Stud Poker er ekstremt kompleks og afhænger af alle fem af dine kort samt dealerens synlige kort. En forenklet version, der fanger 95 %+ af den teoretiske værdi, kan opsummeres i tre simple regler.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Den simplificerede 3-trins strategi</h3>
          <p className="text-muted-foreground leading-relaxed">
            Regel 1: Raise altid med et par eller bedre. Uanset dealerens synlige kort er det altid korrekt at raise med et par – selv et par af toere. Den forventede værdi af et par mod enhver dealer-upcard er altid positiv. Regel 2: Fold altid med mindre end Ace-King high. Hænder uden Ace-King kan ikke slå en qualifying dealer, så fold er det korrekte valg uden undtagelse. Regel 3: Med Ace-King high, brug AK-qualifier-tabellen.
          </p>

          <h3 className="text-xl font-semibold text-foreground">AK-qualifier-tabellen</h3>
          <p className="text-muted-foreground leading-relaxed">
            Ace-King hænder er de mest komplekse at spille korrekt. Den forenklede regel er: Raise med AK hvis mindst ét af dine øvrige kort matcher dealerens synlige kort (samme rang). Hvis ikke, raise kun hvis dealerens kort er en 2-Q OG du har en dronning i din hånd. Fold i alle andre AK-situationer. Denne regel er ikke perfekt, men den fanger størstedelen af den forventede værdi fra AK-hænder.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Den avancerede AK-strategi tager også højde for, om dealerens synlige kort matcher nogen af dine kickers. Specifikt: Hvis dealerens upcard er en Ace eller King, og du har AK, bør du altid folde (medmindre du har et par). Hvis dealerens upcard er 2-Q, og du har AK med dronning og en kicker der er højere end dealerens kort, raise. Disse nuancer reducerer husets fordel med yderligere 0,1-0,2 procentpoint.
          </p>

          <h3 className="text-xl font-semibold text-foreground">EV-analyse af raise vs. fold</h3>
          <p className="text-muted-foreground leading-relaxed">
            For at illustrere strategien konkret: Med et par seksere mod en dealer 7, er den forventede værdi af raise +0,52 enheder (pr. ante-enhed). Med AK-Q-7-3 mod en dealer 6 er EV af raise +0,08 enheder – marginalt positiv, men stadig bedre end fold (-1,0). Med AK-J-8-4 mod en dealer Q er EV af raise -0,12 enheder, men fold er -1,0, så raise er stadig korrekt. Disse eksempler viser, at mange marginale hænder bør raises, fordi alternativet (fold) altid koster den fulde ante.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            En vigtig indsigt er, at du aldrig bør folde et par, selv et par af toere mod en dealer-Ace. Sandsynligheden for at dealeren har et højere par er reel, men den forventede værdi af raise er stadig bedre end at miste ante. Mange begyndere folder lave par mod høje dealer-upcards, hvilket er en af de dyreste fejl i Caribbean Stud.
          </p>
        </section>

        <Separator />

        {/* ──── Sektion 4: Progressiv Jackpot Matematik ──── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Progressiv jackpot-matematik og break-even analyse</h2>
          
          <p className="text-muted-foreground leading-relaxed">
            Den progressive jackpot i Caribbean Stud er spillets mest forførende element – og samtidig det mest misforståede. For at vurdere om jackpot-indsatsen er matematisk forsvarlig, skal vi analysere den forventede værdi baseret på den aktuelle jackpot-størrelse.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Break-even jackpot-størrelse</h3>
          <p className="text-muted-foreground leading-relaxed">
            Med standard progressive udbetalinger (100 % for Royal Flush, 10 % for Straight Flush) er break-even punktet ca. 263.204× indsatsen. Ved en $1-indsats skal jackpotten altså overstige $263.204 for at side-bettet har positiv forventet værdi. I praksis når de fleste online progressive jackpots dette niveau ekstremt sjældent – typisk resettes de ved $50.000-$150.000.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Beregningen er simpel: Sandsynligheden for Royal Flush er 1/649.740. For at $1-indsatsen har EV ≥ $0, skal den forventede udbetaling (jackpot × 1/649.740 + øvrige gevinster) overstige $1. De øvrige gevinster fra straight flush, fire ens osv. bidrager med ca. $0,10 pr. hånd, så jackpotten skal kompensere for de resterende $0,90.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Jackpot-indsats som underholdning</h3>
          <p className="text-muted-foreground leading-relaxed">
            Selvom matematik taler imod den progressive indsats, er der et legitimt argument for at spille den som underholdningsudgift. Ved 60 hænder i timen koster jackpot-indsatsen ca. $26/time i forventet tab (ved en typisk jackpot-størrelse). Sammenlignet med andre underholdningsformer er dette relativt beskedent, og drømmen om at ramme en seksifret jackpot har en reel underholdningsværdi for mange spillere.
          </p>
        </section>

        <Separator />

        {/* ──── Sektion 5: Varianter ──── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Caribbean Stud varianter og relaterede spil</h2>
          
          <p className="text-muted-foreground leading-relaxed">
            Caribbean Stud har inspireret en række afledte spil, der modificerer grundreglerne for at tilbyde forskellige risikoprofiler og strategiske muligheder.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Caribbean Draw Poker</h3>
          <p className="text-muted-foreground leading-relaxed">
            I Caribbean Draw har spilleren mulighed for at bytte op til 2 kort efter at have set dealerens synlige kort, mod en ekstra indsats lig med ante. Denne tilføjelse reducerer husets fordel betydeligt (til ca. 2,6 % med optimal strategi), men den ekstra indsats øger den samlede risiko pr. hånd. Spillet er mindre udbredt end standard Caribbean Stud, men findes på udvalgte online casinoer.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Casino Hold'em</h3>
          <p className="text-muted-foreground leading-relaxed">
            Casino Hold'em kombinerer Caribbean Stud-konceptet (spiller mod dealer) med Texas Hold'em-mekanikken (community-kort). Husets fordel er ca. 2,16 % med optimal strategi, hvilket gør det til et af de mest fordelagtige casino-pokerspil. Spillet er tilgængeligt på de fleste danske online casinoer med <Link to="/casino-licenser" className="text-primary hover:underline">dansk licens</Link>.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Sammenligning med Three Card Poker</h3>
          <p className="text-muted-foreground leading-relaxed">
            <Link to="/casinospil/poker/three-card-poker" className="text-primary hover:underline">Three Card Poker</Link> er Caribbean Studs nærmeste konkurrent i casino-poker kategorien. Med kun tre kort pr. hånd er Three Card Poker hurtigere og enklere, med en husets fordel på 3,37 % (ante-play). Caribbean Stud tilbyder til gengæld større variation i hænderne og mulighed for progressive jackpots, der kan nå seks-cifrede beløb.
          </p>
        </section>

        <InlineCasinoCards title="Anbefalede casinoer med bordspil" count={3} />

        <Separator />

        {/* ──── Sektion 6: FAQ ──── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Ofte stillede spørgsmål om Caribbean Stud Poker</h2>
          {faqItems.map((f) => (
            <div key={f.q} className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">{f.q}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.a}</p>
            </div>
          ))}
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath="/casinospil/poker/caribbean-stud" />

        <Separator className="my-10" />

        {/* Intern navigation */}
        <nav className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">Udforsk flere poker-guides</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { to: "/casinospil/poker", label: "Poker Hub" },
              { to: "/casinospil/poker/texas-holdem", label: "Texas Hold'em" },
              { to: "/casinospil/poker/omaha", label: "Omaha" },
              { to: "/casinospil/poker/three-card-poker", label: "Three Card Poker" },
              { to: "/casinospil/poker/video-poker", label: "Video Poker" },
              { to: "/casinospil/poker/poker-strategi", label: "Poker Strategi" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="rounded-lg border border-border/50 bg-card px-3 py-1.5 text-sm text-foreground hover:border-primary/30 hover:text-primary transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      </article>
    </>
  );
}
