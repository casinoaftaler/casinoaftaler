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
  BarChart3, Eye, Brain, BookOpen, AlertTriangle,
  TrendingUp, Target, Gamepad2, Shield, Calculator,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/video-poker-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er den bedste video poker variant?",
    answer: "Jacks or Better med 9/6 udbetalingstabel (Full Pay) har den højeste RTP på 99,54 % med perfekt strategi. Deuces Wild med NSUD (Not So Ugly Ducks) udbetalingstabel kan nå 100,76 % RTP, hvilket gør den til en af de sjældne casino-spil med positiv forventet værdi.",
  },
  {
    question: "Hvad betyder 9/6 i Jacks or Better?",
    answer: "Tallene refererer til udbetalingen for Full House (9 coins) og Flush (6 coins) ved max bet. En 8/5 maskine betaler kun 8 for Full House og 5 for Flush, hvilket øger husets fordel med ca. 2,4 procentpoint. Tjek altid udbetalingstabellen før du spiller.",
  },
  {
    question: "Kan man konsekvent vinde i video poker?",
    answer: "Med perfekt strategi på de bedste maskiner (f.eks. Full Pay Deuces Wild) kan den langsigtede RTP overstige 100 %. I praksis kræver dette dog at man også rammer Royal Flush med jævne mellemrum, da den udgør en betydelig del af den teoretiske tilbagebetaling. Uden Royal Flush er den kortsigtede RTP lavere.",
  },
  {
    question: "Hvor mange hænder skal man spille for at nå den teoretiske RTP?",
    answer: "For at komme inden for 1 % af den teoretiske RTP med 95 % sandsynlighed kræves ca. 10.000-20.000 hænder. For at inkludere Royal Flush-komponenten (1/40.000) i beregningen kræves 100.000+ hænder. Variansen i video poker er betydeligt lavere end spilleautomater, men stadig reel.",
  },
  {
    question: "Er multi-hand video poker bedre end single-hand?",
    answer: "Multi-hand video poker (3, 5, 10 eller 100 hænder) har præcis den samme RTP som single-hand versionen, men variansen ændres markant. Flere hænder reducerer varians for basisgevinster, men den samlede indsats pr. runde er højere. For bankroll-management er multi-hand generelt mere risikabelt.",
  },
  {
    question: "Hvad er forskellen på video poker og spilleautomater?",
    answer: "Den fundamentale forskel er, at video poker har en matematisk bestemt RTP baseret på kortenes sandsynligheder, mens spilleautomater har en programmeret RTP der kan variere. I video poker påvirker dine beslutninger direkte resultatet, og optimal strategi kan reducere husets fordel til under 0,5 %.",
  },
];

const faqJsonLd = buildFaqSchema(faqs.map((f) => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));

const articleSchema = buildArticleSchema({
  headline: "Video Poker Guide 2026 – RTP-analyse, Strategi & Bedste Varianter",
  description: "Komplet dansk guide til video poker. Sammenlign RTP på Jacks or Better, Deuces Wild og Joker Poker. Lær optimal hold/discard-strategi.",
  datePublished: "2026-03-02",
  dateModified: "2026-03-02",
  url: `${SITE_URL}/casinospil/poker/video-poker`,
  image: `${SITE_URL}/og/video-poker.jpg`,
});

export default function VideoPokerGuide() {
  return (
    <>
      <SEO
        title="Video Poker Guide 2026 – RTP, Strategi & Bedste Varianter"
        description="Komplet dansk video poker guide. Sammenlign RTP på Jacks or Better (99,54 %), Deuces Wild og Joker Poker. Lær optimal strategi og find de bedste spil på licenserede casinoer."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(220 60% 20%), hsl(240 50% 18%) 40%, hsl(200 70% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <TrendingUp className="mr-1.5 h-3.5 w-3.5" /> RTP-analyse – Marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Video Poker – Komplet RTP-analyse, Strategi & De Bedste Varianter
            </h1>
            <p className="text-lg text-white/80">
              Video poker er et af de få casinospil hvor dine beslutninger direkte påvirker tilbagebetalingsprocenten. Denne guide analyserer de bedste varianter og lærer dig optimal strategi.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="40 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Video poker maskine der viser Jacks or Better med Royal Flush" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ──── Sektion 1: RTP-analyse ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            RTP-analyse: Hvorfor video poker slår næsten alle casinospil
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Video poker er unikt i casino-verdenen, fordi det kombinerer elementer af chance og skill. Modsat spilleautomater, hvor RTP er programmeret og usynlig, er video pokers RTP matematisk verificerbar – den er baseret på standard 52-korts (eller 53-korts med joker) sandsynligheder og den synlige udbetalingstabel.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Udbetalingstabellens afgørende betydning</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den vigtigste færdighed i video poker er ikke kortstrategien – det er at vælge den rigtige maskine. Forskellen mellem en 9/6 Jacks or Better (RTP 99,54 %) og en 6/5 version (RTP 95,00 %) er astronomisk: 4,54 procentpoint i husets fordel, eller en forventet forskel på 454 kr. pr. 10.000 kr. i indsatser. De fleste begyndere fokuserer udelukkende på kortstrategien, men maskinvalget er ansvarligt for 80 %+ af din langsigtede performance.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">RTP-sammenligning af populære varianter</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Jacks or Better 9/6 (Full Pay): 99,54 % RTP – den klassiske standard, og stadig den mest tilgængelige high-RTP variant. Deuces Wild NSUD: 100,76 % RTP – en af de sjældne casino-spil med positiv forventet værdi, men kræver perfekt strategi med 32 undtagelsesregler. Joker Poker (Kings or Better): 100,64 % RTP – endnu en +EV variant, men udbetalingstabellen er kritisk; mange online versioner tilbyder reducerede tabeller med RTP under 98 %. Double Bonus Poker 10/7: 100,17 % RTP – belønner fire ens-hænder aggressivt, men variansen er betydeligt højere. Bonus Poker Deluxe: 99,64 % RTP – lignende RTP som Jacks or Better, men med en jævnere volatilitetsprofil.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            For danske spillere er det vigtigt at bemærke, at mange online casinoer tilbyder reducerede udbetalingstabeller (f.eks. 8/5 eller 7/5 Jacks or Better). Disse ser næsten identiske ud med full-pay versionerne, men husets fordel kan være 2-4× højere. Altid tjek Full House og Flush-udbetalingerne som det første.
          </p>
        </section>

        {/* ──── Sektion 2: Varianter ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-primary" />
            De vigtigste video poker-varianter forklaret
          </h2>

          <h3 className="text-xl font-semibold text-foreground mb-3">Jacks or Better – standarden</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Jacks or Better er udgangspunktet for al video poker. Minimumsgevinsten kræver et par knægte eller bedre, og spillet bruger en standard 52-korts bunke. Med 9/6 udbetalingstabellen er strategien relativt enkel med ca. 30 hold/discard-regler rangeret efter EV. Den lave varians (sammenlignet med andre video poker-varianter) gør det til det ideelle startsted for nye spillere.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Deuces Wild – den mest strategisk komplekse</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I Deuces Wild fungerer alle fire toere som wild cards, hvilket dramatisk ændrer håndrankings og strategi. Minimumsgevinsten er tre ens (fordi par og to par forekommer så hyppigt med wild cards). Strategien er markant mere kompleks end Jacks or Better med over 30 undtagelsesregler. Den optimale strategi afhænger kraftigt af, hvor mange deuces du har: med 4 deuces holdes altid alle; med 3 holder du altid alle tre plus eventuel Royal Flush-mulighed; med 2, 1 eller 0 varierer strategien betydeligt.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Joker Poker – wild card med twist</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Joker Poker bruger en 53-korts bunke (standard + 1 joker). Jokeren fungerer som wild card, og Kings or Better versionen er den mest favorable med RTP op til 100,64 %. Two Pair or Better versionen har lavere RTP (ca. 98,6 %) men lavere varians. Strategien er enklere end Deuces Wild, da der kun er ét wild card at håndtere.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Double Bonus / Double Double Bonus</h3>
          <p className="text-muted-foreground leading-relaxed">
            Disse varianter tilbyder forhøjede udbetalinger for specifikke fire ens-kombinationer: Fire Aces betaler 160×, fire 2-4 betaler 80×, og standard fire ens betaler 50× (vs. 25× i Jacks or Better). Den højere top-udbetaling kommer på bekostning af reducerede par-udbetalinger, hvilket øger variansen dramatisk. Double Double Bonus tilføjer yderligere bonusser baseret på den femte kort (kicker), hvilket gør strategien endnu mere nuanceret.
          </p>
        </section>

        {/* ──── Sektion 3: Strategi ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Optimal hold/discard-strategi for Jacks or Better
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den optimale strategi for 9/6 Jacks or Better kan komprimeres til en rangeret liste af hold-prioriteter. Når du modtager dine fem kort, finder du den højest rangerede hold-kombination og beholder de tilsvarende kort. Listen nedenfor dækker de 30 vigtigste beslutninger.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Top 15 hold-prioriteter
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>1) Royal Flush. 2) Straight Flush. 3) Fire ens. 4) 4 til Royal Flush. 5) Fuldt hus. 6) Flush. 7) Tre ens. 8) Straight. 9) 4 til Straight Flush. 10) To par. 11) Højt par (J-A). 12) 3 til Royal Flush. 13) 4 til Flush. 14) Lavt par (2-10). 15) 4 til open-ended Straight (med 0-1 high cards).</p>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold text-foreground mb-3">De mest overraskende strategiske regler</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Flere af de optimale beslutninger strider mod intuitionen. For eksempel: Med et lavt par og fire til en flush, beholder du parret og kasserer flush-trækket. EV for det lave par (0,82) overstiger EV for 4-til-flush (0,74). Med tre til en Royal Flush og et færdigt par, bryd parret op for at jage Royal Flush – den enorme udbetaling (800×) kompenserer for tabet af den sikre par-gevinst. Med en færdig straight og fire til en flush, behold straighten – den sikre 4× udbetaling er bedre end en 19,1 % chance for flush (6×).
          </p>

          <p className="text-muted-foreground leading-relaxed">
            En af de mest counter-intuitive regler: Med Kd-Qd-Jd-10d-Ah (en færdig straight med fire til Royal Flush i ruder), kasser esset og gå efter Royal Flush. EV for 4-til-Royal (18,66) overstiger drastisk EV for den færdige straight (4,00). Denne situation opstår sjældent, men illustrerer hvorfor Royal Flush-jagten dominerer al video poker-strategi.
          </p>
        </section>

        <InlineCasinoCards title="Populære video poker-casinoer" count={3} />

        {/* ──── Sektion 4: Almindelige fejl ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            De 7 dyreste fejl i video poker
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Selv erfarne spillere laver systematiske fejl der kan koste procentpoint i RTP. Her er de mest udbredte og dyreste fejl, rangeret efter deres indvirkning på langsigtet tilbagebetaling.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Fejl 1: At spille reducerede udbetalingstabeller. Dette er den absolut dyreste fejl – forskellen mellem 9/6 og 8/5 Jacks or Better er 2,36 procentpoint, svarende til 236 kr. pr. 10.000 kr. i indsatser. Fejl 2: Ikke at spille max bet. Royal Flush betaler 250× ved 1-4 coins, men 800× ved 5 coins (max bet). Ved ikke at spille max bet mister du ca. 1,4 % i forventet tilbagebetaling. Fejl 3: At holde en kicker ved et par. Med et par og et es bør du kassere esset og holde kun parret – kickeren har ingen værdi i video poker.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Fejl 4: At bryde to par for at jage flush/straight. To par har en EV på 1,28, som næsten altid overstiger 4-til-flush (0,74) eller 4-til-straight (0,68). Fejl 5: At beholde høje enkeltkort i stedet for lave par. Et lavt par (EV 0,82) slår enhver kombination af høje enkeltkort (EV 0,32-0,65). Fejl 6: At folde hænder der bør spilles. I video poker kasserer du aldrig alle fem kort – der er altid mindst ét high card der er værd at beholde (EV 0,47 for ét high card vs. 0,36 for fem nye kort). Fejl 7: At spille for hurtigt uden at verificere udbetalingstabellen.
          </p>
        </section>

        {/* ──── Sektion 5: Maskinvalg ──── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Sådan vælger du den rigtige video poker-maskine
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            På fysiske casinoer er maskinvalg relativt simpelt: tjek udbetalingstabellen øverst på skærmen. Online er det lidt mere komplekst, da mange platforme ikke umiddelbart viser den fulde udbetalingstabel. Her er en systematisk tilgang til at finde de bedste video poker-spil på danske online casinoer.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Trin 1: Filtrer efter spiltype i casinoets lobby – søg specifikt efter "Video Poker" eller "Bordspil". Trin 2: Åbn spillet i demo-mode og find udbetalingstabellen. Trin 3: Notér Full House og Flush-udbetalingerne for Jacks or Better varianter. 9/6 er full pay, 8/5 er acceptabel, alt under 8/5 bør undgås. Trin 4: For Deuces Wild, tjek udbetalingen for Fire Deuces (200×) og Wild Royal Flush (25×) – disse tal indikerer om det er den favorable NSUD-version.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            De bedste softwareudbydere for video poker inkluderer Microgaming (Game King-serien), IGT (den klassiske standard), og Betsoft (moderne interface). Danske casinoer med det bedste udvalg af video poker inkluderer typisk <Link to="/casino-anmeldelser/videoslots" className={linkClass}>Videoslots</Link> og <Link to="/casino-anmeldelser/unibet" className={linkClass}>Unibet</Link>.
          </p>
        </section>

        <Separator className="mb-12" />
        <section className="mb-12"><FAQSection faqs={faqs} /></section>
        <Separator className="mb-12" />
        <AuthorBio author="jonas" />
        <Separator className="my-12" />
        <RelatedGuides currentPath="/casinospil/poker/video-poker" />
      </div>
    </>
  );
}
