import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import heroImage from "@/assets/heroes/video-poker-hero.jpg";

/* ──────────────────────────────────────────────
   Arketype E – Critical First
   Unik H2-rækkefølge: RTP-analyse → Varianter → Strategi → Fejl → Valg → FAQ
   ────────────────────────────────────────────── */

const faqItems = [
  {
    q: "Hvad er den bedste video poker variant?",
    a: "Jacks or Better med 9/6 udbetalingstabel (Full Pay) har den højeste RTP på 99,54 % med perfekt strategi. Deuces Wild med NSUD (Not So Ugly Ducks) udbetalingstabel kan nå 100,76 % RTP, hvilket gør den til en af de sjældne casino-spil med positiv forventet værdi."
  },
  {
    q: "Hvad betyder 9/6 i Jacks or Better?",
    a: "Tallene refererer til udbetalingen for Full House (9 coins) og Flush (6 coins) ved max bet. En 8/5 maskine betaler kun 8 for Full House og 5 for Flush, hvilket øger husets fordel med ca. 2,4 procentpoint. Tjek altid udbetalingstabellen før du spiller."
  },
  {
    q: "Kan man konsekvent vinde i video poker?",
    a: "Med perfekt strategi på de bedste maskiner (f.eks. Full Pay Deuces Wild) kan den langsigtede RTP overstige 100 %. I praksis kræver dette dog at man også rammer Royal Flush med jævne mellemrum, da den udgør en betydelig del af den teoretiske tilbagebetaling. Uden Royal Flush er den kortsigtede RTP lavere."
  },
  {
    q: "Hvor mange hænder skal man spille for at nå den teoretiske RTP?",
    a: "For at komme inden for 1 % af den teoretiske RTP med 95 % sandsynlighed kræves ca. 10.000-20.000 hænder. For at inkludere Royal Flush-komponenten (1/40.000) i beregningen kræves 100.000+ hænder. Variansen i video poker er betydeligt lavere end spilleautomater, men stadig reel."
  },
  {
    q: "Er multi-hand video poker bedre end single-hand?",
    a: "Multi-hand video poker (3, 5, 10 eller 100 hænder) har præcis den samme RTP som single-hand versionen, men variansen ændres markant. Flere hænder reducerer varians for basisgevinster, men den samlede indsats pr. runde er højere. For bankroll-management er multi-hand generelt mere risikabelt."
  },
  {
    q: "Hvad er forskellen på video poker og spilleautomater?",
    a: "Den fundamentale forskel er, at video poker har en matematisk bestemt RTP baseret på kortenes sandsynligheder, mens spilleautomater har en programmeret RTP der kan variere. I video poker påvirker dine beslutninger direkte resultatet, og optimal strategi kan reducere husets fordel til under 0,5 %."
  },
];

export default function VideoPokerGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Video Poker Guide 2026 – RTP-analyse, Strategi & Bedste Varianter",
        description: "Komplet dansk guide til video poker. Sammenlign RTP på Jacks or Better, Deuces Wild og Joker Poker. Lær optimal hold/discard-strategi og find de bedste video poker-spil på danske casinoer.",
        author: { "@type": "Person", name: "Jonas Theill" },
        publisher: { "@type": "Organization", name: "Casinoaftaler.dk" },
        datePublished: "2026-03-02",
        dateModified: "2026-03-02",
        mainEntityOfPage: "https://casinoaftaler.dk/casinospil/poker/video-poker",
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
        <title>Video Poker Guide 2026 – RTP, Strategi & Bedste Varianter</title>
        <meta
          name="description"
          content="Komplet dansk video poker guide. Sammenlign RTP på Jacks or Better (99,54 %), Deuces Wild og Joker Poker. Lær optimal strategi og find de bedste spil på licenserede casinoer."
        />
        <link rel="canonical" href="https://casinoaftaler.dk/casinospil/poker/video-poker" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <article className="mx-auto max-w-4xl px-4 py-12 space-y-10">
        {/* Hero */}
        <header className="relative rounded-2xl overflow-hidden">
          <img src={heroImage} alt="Video poker maskine der viser Jacks or Better med Royal Flush" className="w-full h-[340px] md:h-[420px] object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-2">Poker · RTP-analyse</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight">
              Video Poker – Komplet RTP-analyse, Strategi & De Bedste Varianter
            </h1>
            <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl">
              Video poker er et af de få casinospil hvor dine beslutninger direkte påvirker tilbagebetalingsprocenten. Denne guide analyserer de bedste varianter og lærer dig optimal strategi.
            </p>
          </div>
        </header>

        {/* QuickFacts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Bedste RTP", value: "99,54 %" },
            { label: "Bedste variant", value: "9/6 JoB" },
            { label: "Royal Flush odds", value: "1:40.390" },
            { label: "Skill-element", value: "Ja" },
          ].map((f) => (
            <div key={f.label} className="rounded-xl border border-border/50 bg-card p-3 text-center">
              <span className="block text-xs text-muted-foreground">{f.label}</span>
              <span className="block text-lg font-bold text-foreground">{f.value}</span>
            </div>
          ))}
        </div>

        <Separator />

        {/* ──── Sektion 1: RTP-analyse ──── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">RTP-analyse: Hvorfor video poker slår næsten alle casinospil</h2>
          
          <p className="text-muted-foreground leading-relaxed">
            Video poker er unikt i casino-verdenen, fordi det kombinerer elementer af chance og skill. Modsat spilleautomater, hvor RTP er programmeret og usynlig, er video pokers RTP matematisk verificerbar – den er baseret på standard 52-korts (eller 53-korts med joker) sandsynligheder og den synlige udbetalingstabel.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Udbetalingstabellens afgørende betydning</h3>
          <p className="text-muted-foreground leading-relaxed">
            Den vigtigste færdighed i video poker er ikke kortstrategien – det er at vælge den rigtige maskine. Forskellen mellem en 9/6 Jacks or Better (RTP 99,54 %) og en 6/5 version (RTP 95,00 %) er astronomisk: 4,54 procentpoint i husets fordel, eller en forventet forskel på 454 kr. pr. 10.000 kr. i indsatser. De fleste begyndere fokuserer udelukkende på kortstrategien, men maskinvalget er ansvarligt for 80 %+ af din langsigtede performance.
          </p>

          <h3 className="text-xl font-semibold text-foreground">RTP-sammenligning af populære varianter</h3>
          <p className="text-muted-foreground leading-relaxed">
            Jacks or Better 9/6 (Full Pay): 99,54 % RTP – den klassiske standard, og stadig den mest tilgængelige high-RTP variant. Deuces Wild NSUD: 100,76 % RTP – en af de sjældne casino-spil med positiv forventet værdi, men kræver perfekt strategi med 32 undtagelsesregler. Joker Poker (Kings or Better): 100,64 % RTP – endnu en +EV variant, men udbetalingstabellen er kritisk; mange online versioner tilbyder reducerede tabeller med RTP under 98 %. Double Bonus Poker 10/7: 100,17 % RTP – belønner fire ens-hænder aggressivt, men variansen er betydeligt højere. Bonus Poker Deluxe: 99,64 % RTP – lignende RTP som Jacks or Better, men med en jævnere volatilitetsprofil.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            For danske spillere er det vigtigt at bemærke, at mange online casinoer tilbyder reducerede udbetalingstabeller (f.eks. 8/5 eller 7/5 Jacks or Better). Disse ser næsten identiske ud med full-pay versionerne, men husets fordel kan være 2-4× højere. Altid tjek Full House og Flush-udbetalingerne som det første.
          </p>
        </section>

        <InlineCasinoCards title="Bedste casinoer til video poker" count={3} />

        <Separator />

        {/* ──── Sektion 2: Varianter ──── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">De vigtigste video poker-varianter forklaret</h2>

          <h3 className="text-xl font-semibold text-foreground">Jacks or Better – standarden</h3>
          <p className="text-muted-foreground leading-relaxed">
            Jacks or Better er udgangspunktet for al video poker. Minimumsgevinsten kræver et par knægte eller bedre, og spillet bruger en standard 52-korts bunke. Med 9/6 udbetalingstabellen er strategien relativt enkel med ca. 30 hold/discard-regler rangeret efter EV. Den lave varians (sammenlignet med andre video poker-varianter) gør det til det ideelle startsted for nye spillere.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Deuces Wild – den mest strategisk komplekse</h3>
          <p className="text-muted-foreground leading-relaxed">
            I Deuces Wild fungerer alle fire toere som wild cards, hvilket dramatisk ændrer håndrankings og strategi. Minimumsgevinsten er tre ens (fordi par og to par forekommer så hyppigt med wild cards). Strategien er markant mere kompleks end Jacks or Better med over 30 undtagelsesregler. Den optimale strategi afhænger kraftigt af, hvor mange deuces du har: med 4 deuces holdes altid alle; med 3 holder du altid alle tre plus eventuel Royal Flush-mulighed; med 2, 1 eller 0 varierer strategien betydeligt.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Joker Poker – wild card med twist</h3>
          <p className="text-muted-foreground leading-relaxed">
            Joker Poker bruger en 53-korts bunke (standard + 1 joker). Jokeren fungerer som wild card, og Kings or Better versionen er den mest favorable med RTP op til 100,64 %. Two Pair or Better versionen har lavere RTP (ca. 98,6 %) men lavere varians. Strategien er enklere end Deuces Wild, da der kun er ét wild card at håndtere.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Double Bonus / Double Double Bonus</h3>
          <p className="text-muted-foreground leading-relaxed">
            Disse varianter tilbyder forhøjede udbetalinger for specifikke fire ens-kombinationer: Fire Aces betaler 160×, fire 2-4 betaler 80×, og standard fire ens betaler 50× (vs. 25× i Jacks or Better). Den højere top-udbetaling kommer på bekostning af reducerede par-udbetalinger, hvilket øger variansen dramatisk. Double Double Bonus tilføjer yderligere bonusser baseret på den femte kort (kicker), hvilket gør strategien endnu mere nuanceret.
          </p>
        </section>

        <Separator />

        {/* ──── Sektion 3: Strategi ──── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Optimal hold/discard-strategi for Jacks or Better</h2>

          <p className="text-muted-foreground leading-relaxed">
            Den optimale strategi for 9/6 Jacks or Better kan komprimeres til en rangeret liste af hold-prioriteter. Når du modtager dine fem kort, finder du den højest rangerede hold-kombination og beholder de tilsvarende kort. Listen nedenfor dækker de 30 vigtigste beslutninger.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Top 15 hold-prioriteter</h3>
          <p className="text-muted-foreground leading-relaxed">
            1) Royal Flush. 2) Straight Flush. 3) Fire ens. 4) 4 til Royal Flush. 5) Fuldt hus. 6) Flush. 7) Tre ens. 8) Straight. 9) 4 til Straight Flush. 10) To par. 11) Højt par (J-A). 12) 3 til Royal Flush. 13) 4 til Flush. 14) Lavt par (2-10). 15) 4 til open-ended Straight (med 0-1 high cards).
          </p>

          <h3 className="text-xl font-semibold text-foreground">De mest overraskende strategiske regler</h3>
          <p className="text-muted-foreground leading-relaxed">
            Flere af de optimale beslutninger strider mod intuitionen. For eksempel: Med et lavt par og fire til en flush, beholder du parret og kasserer flush-trækket. EV for det lave par (0,82) overstiger EV for 4-til-flush (0,74). Med tre til en Royal Flush og et færdigt par, bryd parret op for at jage Royal Flush – den enorme udbetaling (800×) kompenserer for tabet af den sikre par-gevinst. Med en færdig straight og fire til en flush, behold straighten – den sikre 4× udbetaling er bedre end en 19,1 % chance for flush (6×).
          </p>

          <p className="text-muted-foreground leading-relaxed">
            En af de mest counter-intuitive regler: Med Kd-Qd-Jd-10d-Ah (en færdig straight med fire til Royal Flush i ruder), kasser esset og gå efter Royal Flush. EV for 4-til-Royal (18,66) overstiger drastisk EV for den færdige straight (4,00). Denne situation opstår sjældent, men illustrerer hvorfor Royal Flush-jagten dominerer al video poker-strategi.
          </p>
        </section>

        <InlineCasinoCards title="Populære video poker-casinoer" count={3} />

        <Separator />

        {/* ──── Sektion 4: Almindelige fejl ──── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">De 7 dyreste fejl i video poker</h2>

          <p className="text-muted-foreground leading-relaxed">
            Selv erfarne spillere laver systematiske fejl der kan koste procentpoint i RTP. Her er de mest udbredte og dyreste fejl, rangeret efter deres indvirkning på langsigtet tilbagebetaling.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Fejl 1: At spille reducerede udbetalingstabeller. Dette er den absolut dyreste fejl – forskellen mellem 9/6 og 8/5 Jacks or Better er 2,36 procentpoint, svarende til 236 kr. pr. 10.000 kr. i indsatser. Fejl 2: Ikke at spille max bet. Royal Flush betaler 250× ved 1-4 coins, men 800× ved 5 coins (max bet). Ved ikke at spille max bet mister du ca. 1,4 % i forventet tilbagebetaling. Fejl 3: At holde en kicker ved et par. Med et par og et es bør du kassere esset og holde kun parret – kickeren har ingen værdi i video poker.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Fejl 4: At bryde to par for at jage flush/straight. To par har en EV på 1,28, som næsten altid overstiger 4-til-flush (0,74) eller 4-til-straight (0,68). Fejl 5: At beholde høje enkeltkort i stedet for lave par. Et lavt par (EV 0,82) slår enhver kombination af høje enkeltkort (EV 0,32-0,65). Fejl 6: At folde hænder der bør spilles. I video poker kasserer du aldrig alle fem kort – der er altid mindst ét high card der er værd at beholde (EV 0,47 for ét high card vs. 0,36 for fem nye kort). Fejl 7: At spille for hurtigt uden at verificere udbetalingstabellen.
          </p>
        </section>

        <Separator />

        {/* ──── Sektion 5: Maskinvalg ──── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Sådan vælger du den rigtige video poker-maskine</h2>

          <p className="text-muted-foreground leading-relaxed">
            På fysiske casinoer er maskinvalg relativt simpelt: tjek udbetalingstabellen øverst på skærmen. Online er det lidt mere komplekst, da mange platforme ikke umiddelbart viser den fulde udbetalingstabel. Her er en systematisk tilgang til at finde de bedste video poker-spil på danske online casinoer.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Trin 1: Filtrer efter spiltype i casinoets lobby – søg specifikt efter "Video Poker" eller "Bordspil". Trin 2: Åbn spillet i demo-mode og find udbetalingstabellen. Trin 3: Notér Full House og Flush-udbetalingerne for Jacks or Better varianter. 9/6 er full pay, 8/5 er acceptabel, alt under 8/5 bør undgås. Trin 4: For Deuces Wild, tjek udbetalingen for Fire Deuces (200×) og Wild Royal Flush (25×) – disse tal indikerer om det er den favorable NSUD-version.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            De bedste softwareudbydere for video poker inkluderer Microgaming (Game King-serien), IGT (den klassiske standard), og Betsoft (moderne interface). Danske casinoer med det bedste udvalg af video poker inkluderer typisk <Link to="/casino-anmeldelser/videoslots" className="text-primary hover:underline">Videoslots</Link> og <Link to="/casino-anmeldelser/unibet" className="text-primary hover:underline">Unibet</Link>.
          </p>
        </section>

        <Separator />

        {/* ──── Sektion 6: FAQ ──── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Ofte stillede spørgsmål om video poker</h2>
          {faqItems.map((f) => (
            <div key={f.q} className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">{f.q}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.a}</p>
            </div>
          ))}
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath="/casinospil/poker/video-poker" />

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
              { to: "/casinospil/poker/caribbean-stud", label: "Caribbean Stud" },
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
