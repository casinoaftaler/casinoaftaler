import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Sparkles, Target, BarChart3, AlertTriangle, DollarSign, TrendingUp } from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80 font-medium";

const faqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvorfor er banker-bet det bedste valg i live baccarat?",
    answer: "Banker-bet har en house edge på kun 1,06 % (efter 5 % kommission), hvilket gør det til det statistisk optimale valg i baccarat. Banker vinder 50,68 % af ikke-uafgjorte hænder mod players 49,32 %. Over 1.000 hænder sparer du gennemsnitligt 180 kr. ved at spille banker i stedet for player (ved 100 kr. indsats). Kommissionen er allerede indregnet i house edge-tallet.",
  },
  {
    question: "Er tie-bet nogensinde en god idé i live baccarat?",
    answer: "Nej, aldrig. Tie udbetaler 8:1, men sandsynligheden er kun 9,52 %. House edge er 14,36 % – den højeste af alle standardbets i live casino. For at sætte det i perspektiv: for hver 1.000 kr. du sætter på tie, taber du gennemsnitligt 143,60 kr. Til sammenligning taber du kun 10,60 kr. på banker og 12,40 kr. på player. Tie-bettet er designet som en profit-generator for casinoet.",
  },
  {
    question: "Hvad er forskellen på Speed Baccarat og standard live baccarat?",
    answer: "Standard live baccarat tager 48-50 sekunder pr. runde med ceremoniel kort-afsløring (squeeze). Speed Baccarat komprimerer dette til 27 sekunder – kortene vendes øjeblikkeligt. Matematikken er identisk, men tempoet øger antallet af hænder fra 40-50/time til 70-80/time. Det fordobler næsten dit forventede tab pr. time. Vælg Speed kun hvis du bevidst vil have flere hænder.",
  },
  {
    question: "Virker scorecard-systemer (roadmaps) i baccarat?",
    answer: (
      <>
        Nej. Bead Plate, Big Road, Big Eye Boy og andre roadmaps er populære men matematisk meningsløse. Hvert resultat i <Link to="/casinospil/baccarat" className={linkClass}>baccarat</Link> er uafhængigt – tidligere resultater påvirker ikke fremtidige. Roadmaps giver en illusion af mønstre i tilfældige data (pareidolia). Casinoer viser dem gerne, fordi de opmuntrer til spil uden at ændre house edge.
      </>
    ),
  },
  {
    question: "Hvad er Lightning Baccarat, og hvordan påvirker det house edge?",
    answer: "Lightning Baccarat fra Evolution tilføjer tilfældige RNG-multiplikatorer (2x-8x) til 1-5 kort pr. runde. For at finansiere dette betales et Lightning Fee på 20 % af indsatsen. Standard RTP er 98,76 % (vs. 98,94 % for standard banker). Volatiliteten øges markant – du kan vinde op til 262.144x (8^6 × 8:1) på en optimal kombination, men det forventede tab pr. enhed er højere.",
  },
  {
    question: "Er baccarat et strategisk spil?",
    answer: "Nej, baccarat er primært et chancespil. Den eneste strategiske beslutning er at vælge banker, player eller tie – og svaret er altid banker (1,06 % edge). Alle kortregler er automatiske: player trækker tredje kort ved 0-5, banker-reglerne er komplekse men forudbestemte. Der er ingen hit/stand-beslutninger som i blackjack. Strategien ligger i bankroll management og bordvalg, ikke i selve spillet.",
  },
];

const LiveBaccaratGuide = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Live Baccarat – Banker Edge Analyse & Strategi 2026",
    description: "Komplet live baccarat guide 2026. Banker edge 1,06 %, EV-beregninger, Lightning Baccarat analyse og bankroll management for danske spillere.",
    url: `${SITE_URL}/live-casino/baccarat`,
    datePublished: "2026-02-18",
    dateModified: "2026-02-18",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Live Baccarat – Banker Edge & Strategi Guide"
        description="Live baccarat 2026: Banker edge 1,06 %, player 1,24 %, tie 14,36 %. EV-analyse, Lightning Baccarat, Speed Baccarat og bankroll management. Dansk licens."
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Live Baccarat – Banker Edge Analyse & Strategi
            </h1>
            <p className="text-lg text-white/80">
              En dybdegående analyse af live baccarat med fokus på banker edge, EV-beregninger og matematiske realiteter bag roadmaps og betting-systemer.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="18-02-2026" readTime="12 Min." />

        <p className="mb-6 text-muted-foreground leading-relaxed">
          Denne side er en del af vores <Link to="/live-casino" className={linkClass}>komplette live casino guide</Link>. Her fokuserer vi specifikt på live baccarat – det spil, der globalt genererer mere omsætning end nogen anden bordspilkategori, primært drevet af det asiatiske marked, men med stigende popularitet i Danmark og Europa.
        </p>

        {/* H2 #1 – Regler */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Reglerne i live baccarat – hvorfor det er det simpleste bordspil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Baccarat er fundamentalt anderledes end <Link to="/live-casino/blackjack" className={linkClass}>live blackjack med dealer</Link> på ét afgørende punkt: du træffer ingen beslutninger efter din indsats. Alle kortregler er automatiske og forudbestemte. Du vælger blot mellem tre bets – banker, player eller tie – og kortene gør resten.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Kortværdier: Esser tæller 1, billedkort og tiere tæller 0, alle andre kort tæller pålydende. Håndens værdi er det sidste ciffer af summen – en hånd med 7 og 8 (total 15) har værdien 5. Målet er at komme tættest på 9.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Player trækker tredje kort ved total 0-5 og står på 6-7. Banker-reglerne er mere komplekse og afhænger af bankers total OG players tredje kort – men du behøver ikke lære dem, da dealeren håndterer alt automatisk. Natural 8 eller 9 (to kort) afslutter runden øjeblikkeligt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Denne simplicitet er baccarats største fordel – og dens største risiko. Fordi ingen strategiske beslutninger kræves, kan spillere let falde ind i en mekanisk rytme af hurtige indsatser uden refleksion. Tempo-management er derfor det vigtigste værktøj i din baccarat-arsenal.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #2 – Banker edge deep dive */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Banker edge – den matematiske analyse</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Banker-bettet er det optimale valg i baccarat, men forståelsen af <em>hvorfor</em> kræver en dybere matematisk analyse end de fleste guides tilbyder.
          </p>
          <Card className="border-border bg-card mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 px-4 text-left">Bet</th>
                      <th className="py-2 px-4 text-left">Vinder %</th>
                      <th className="py-2 px-4 text-left">Udbetaling</th>
                      <th className="py-2 px-4 text-left">House Edge</th>
                      <th className="py-2 px-4 text-left">Tab pr. 1.000 kr. indsat</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Banker</td>
                      <td className="py-2 px-4">45,86 %</td>
                      <td className="py-2 px-4">0,95:1 (5 % komm.)</td>
                      <td className="py-2 px-4 text-primary font-semibold">1,06 %</td>
                      <td className="py-2 px-4 text-primary">10,60 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Player</td>
                      <td className="py-2 px-4">44,63 %</td>
                      <td className="py-2 px-4">1:1</td>
                      <td className="py-2 px-4">1,24 %</td>
                      <td className="py-2 px-4">12,40 kr.</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">Tie</td>
                      <td className="py-2 px-4">9,52 %</td>
                      <td className="py-2 px-4">8:1</td>
                      <td className="py-2 px-4 text-destructive font-semibold">14,36 %</td>
                      <td className="py-2 px-4 text-destructive">143,60 kr.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Banker vinder oftere end player (50,68 % vs. 49,32 % af ikke-uafgjorte runder) på grund af den asymmetriske tredje-kort-regel. Banker trækker baseret på players tredje kort, hvilket giver en informationsfordel. Casinoet kompenserer med 5 % kommission på banker-gevinster – men selv efter kommission er banker stadig det bedste bet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>EV-beregning pr. 100 hænder (100 kr. indsats):</strong> Banker: -106 kr. Player: -124 kr. Tie: -1.436 kr. Over 1.000 hænder sparer du ca. 180 kr. ved konsekvent at vælge banker over player. Tie-bettet koster dig 13.300 kr. mere end banker over 1.000 hænder. Det er den dyreste fælde i live casino.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #3 – Roadmaps myte */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Roadmaps og mønstergenkendelse – illusion vs. matematik</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bead Plate, Big Road, Big Eye Boy, Small Road og Cockroach Pig – baccarat-roadmaps er en central del af spillets kultur, især i asiatiske casinoer. Hvert live baccarat-bord viser disse grafiske historikker, og mange spillere bruger dem som beslutningsgrundlag. Men virker de?
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Det korte svar: Nej.</strong> Hvert baccarat-resultat er statistisk uafhængigt af de foregående. I et 8-deck shoe med 80+ hænder er korrelationen mellem konsekutive resultater ekstremt lav. At identificere "mønstre" i tilfældige data er en velkendt kognitiv bias kaldet <em>apophenia</em> – den menneskelige tendens til at se mønstre, der ikke eksisterer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Matematisk bevis: Sandsynligheden for at banker vinder den næste hånd er ca. 50,68 % uanset om banker har vundet de sidste 5 eller de sidste 0 hænder. Der er ingen "streaks" i statistisk forstand – det, vi opfatter som streaks, er normal variation i tilfældige sekvenser.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hvorfor viser casinoerne roadmaps? Fordi de opmuntrer til spil. Spillere, der tror på mønstre, spiller flere hænder og sætter mere aggressivt – begge dele øger casinoets indtjening. Roadmaps er et marketing-værktøj, ikke et strategisk værktøj.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #4 – Varianter */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Live baccarat-varianter – fra Squeeze til Lightning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ligesom <Link to="/live-casino/roulette" className={linkClass}>live roulette</Link> tilbyder baccarat flere formater med markant forskellige tempo- og volatilitetsprofiler.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="text-lg">Standard Baccarat</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">48-50 sek./runde, 40-50 hænder/time. Klassisk oplevelse med ceremoniel kort-afsløring. Minimumsindsats: typisk 25-50 kr. Det bedste format for nye spillere og dem, der vil have tid til at overveje.</p></CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="text-lg">Baccarat Squeeze</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Dealeren "squeezer" kortene langsomt – en traditionel asiatisk ritual. Tempoet er langsommere (35 hænder/time), men spændingen er intensiveret. Matematikken er identisk. For spillere, der prioriterer oplevelse over effektivitet.</p></CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="text-lg">Speed Baccarat</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">27 sek./runde, 70-80 hænder/time. Kort afsløres øjeblikkeligt uden ceremoni. Fordobler næsten dit forventede tab pr. time vs. standard. Kun for spillere, der bevidst søger højere volumen og er komfortable med den øgede bankroll-erosion.</p></CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="text-lg">Lightning Baccarat</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">RNG-multiplikatorer (2x-8x) på 1-5 kort pr. runde. 20 % Lightning Fee øger den effektive house edge. Max gevinst op til 262.144x. Markant højere volatilitet – for spillere der søger store gevinster med accept af højere forventet tab.</p></CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* H2 #5 – Bankroll management */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bankroll management og tempo-risiko i baccarat</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Baccarat har en lavere standardafvigelse pr. hånd (ca. 0,93) end blackjack (1,15), hvilket giver en glattere bankroll-kurve. Men fordi de fleste baccarat-varianter har højere tempo end live blackjack, kan det samlede tab pr. session stadig være betydeligt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Praktisk eksempel:</strong> Du spiller 2 timer Speed Baccarat (150 hænder) med 100 kr. banker-bet. Forventet tab: 150 × 100 × 0,0106 = 159 kr. En standardafvigelse er ±1.139 kr. I 68 % af sessionerne vil dit resultat ligge mellem -1.298 kr. og +980 kr. En bankroll på 4.000-5.000 kr. (40-50x indsats) giver under 5 % bust-risiko.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den vigtigste bankroll-regel i baccarat: <strong>undgå progression</strong>. Systemer som Martingale er endnu mere farlige i baccarat end i roulette, fordi tempoet er højere, og den psykologiske simplicitet opmuntrer til automatpilot-spil. Flat betting med en fast enhed er det eneste rationelle valg. Spil altid <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt</Link> og brug ROFUS ved behov.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #6 – Hvem bør spille */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvem bør spille live baccarat – og hvem bør vælge andet?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Baccarat er det mest polariserende spil i live casino. Det kræver nul strategi (ud over at vælge banker), men det kræver ekstraordinær disciplin – fordi det manglende strategielement gør det nemt at spille på autopilot og miste overblikket over tid og penge.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/20 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-primary">
                  <Target className="h-5 w-5" />
                  Ideelt for...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Spillere der ønsker lav house edge uden at lære strategi</li>
                  <li>• Dem der sætter pris på en elegant, minimalistisk spiloplevelse</li>
                  <li>• High rollers (mange borde med høje limits)</li>
                  <li>• Spillere med streng selvdisciplin og forudbestemte grænser</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-destructive/20 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Overvej alternativer, hvis...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Du søger strategisk dybde (vælg blackjack)</li>
                  <li>• Du har svært ved at kontrollere tempo og session-længde</li>
                  <li>• Du er tiltrukket af roadmaps og mønster-jagning</li>
                  <li>• Du foretrækker underholdning og social interaktion (vælg game shows)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <InlineCasinoCards count={1} />

        <FAQSection title="Ofte stillede spørgsmål om live baccarat" faqs={faqs} />
        <AuthorBio author="jonas" />
        <RelatedGuides currentPath="/live-casino/baccarat" />
      </div>
    </>
  );
};

export default LiveBaccaratGuide;
