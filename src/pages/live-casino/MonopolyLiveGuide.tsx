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
import { Sparkles, Gamepad2, BarChart3, AlertTriangle, Target, DollarSign } from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80 font-medium";

const faqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er RTP og house edge i Monopoly Live?",
    answer: "Monopoly Live har en samlet RTP på ca. 96,23 % (house edge 3,77 %). Dog varierer dette markant mellem segmenter: tal-bets har 96,23 % RTP, mens 2 Rolls og 4 Rolls har ca. 93,60-93,80 % RTP. Chance-segmentet har den højeste varians med en teoretisk RTP på ca. 91,30 %. For optimal RTP bør du fokusere på tal-bets og undgå Chance.",
  },
  {
    question: "Hvordan fungerer bonusrunden i Monopoly Live?",
    answer: "Når hjulet stopper på '2 Rolls' eller '4 Rolls', aktiveres en 3D Monopoly-bonusrunde med Mr. Monopoly. Du får 2 eller 4 terningkast på et virtuelt Monopoly-bræt. Hver ejendom du lander på har en multiplikator, der ganges med din indsats. Huse og hoteller på ejendomme øger multiplikatorerne markant. Fængsel-feltet stopper din tur medmindre du slår dobbelt.",
  },
  {
    question: "Er der en strategi for Monopoly Live?",
    answer: "Monopoly Live er primært et chancespil uden strategisk dybde. Den eneste 'strategiske' beslutning er indsatsfordeling. Matematisk optimalt er at fokusere på tal-segmenter (1, 2, 5, 10) med lavest house edge. 2 Rolls og 4 Rolls har højere varians og lavere RTP. Chance-segmentet er det dyreste bet med ca. 8,7 % house edge. Flat betting med fast budget er det eneste rationelle tilgang.",
  },
  {
    question: "Hvad er forskellen på Monopoly Live og Crazy Time?",
    answer: (
      <>
        Begge er Evolution <Link to="/casinospil/game-shows" className={linkClass}>game shows</Link>, men med forskellige profiler. Crazy Time har 4 bonusspil (Pachinko, Cash Hunt, Coin Flip, Crazy Time) mod Monopolys 1 bonusrunde. Crazy Time har højere max gevinst (25.000x vs. ~10.000x) og højere house edge (4,08 % vs. 3,77 %). Monopoly Livs bonusrunde er mere kompleks og underholdende, mens Crazy Time tilbyder mere variation.
      </>
    ),
  },
  {
    question: "Hvor tit kommer bonusrunden i Monopoly Live?",
    answer: "Hjulet har 54 segmenter: 22 × '1', 15 × '2', 7 × '5', 4 × '10', 3 × 'Chance', 1 × '2 Rolls' og 2 × '4 Rolls'. Sandsynligheden for '2 Rolls' er 1/54 ≈ 1,85 %, og for '4 Rolls' er 2/54 ≈ 3,70 %. Samlet bonusrunde-sandsynlighed: 5,56 % pr. spin – ca. 1 pr. 18 spins, eller ca. 1-2 pr. time ved normalt tempo.",
  },
  {
    question: "Hvem bør spille Monopoly Live?",
    answer: "Monopoly Live er ideelt for spillere, der prioriterer underholdning over matematisk optimering. Den 3D-bonusrunde er en af de mest engagerende i live casino. Det er IKKE for spillere, der søger lav house edge (vælg blackjack eller baccarat) eller strategisk dybde (vælg blackjack). House edge på 3,77 % er lavere end slots men markant højere end klassiske bordspil.",
  },
];

const MonopolyLiveGuide = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Monopoly Live – Game Show Analyse & Strategi 2026",
    description: "Komplet Monopoly Live guide 2026. RTP 96,23 %, bonusrunde-analyse, segmentfordeling og house edge-sammenligning for danske spillere.",
    url: `${SITE_URL}/live-casino/monopoly-live`,
    datePublished: "2026-02-18",
    dateModified: "2026-02-18",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Monopoly Live – Game Show Analyse & Strategi"
        description="Monopoly Live 2026: RTP 96,23 %, bonusrunde med 3D Monopoly-bræt, segmentfordeling og house edge-analyse. Komplet game show guide. Dansk licens."
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
              <Gamepad2 className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Monopoly Live – Game Show Analyse & Strategi
            </h1>
            <p className="text-lg text-white/80">
              En komplet analyse af Monopoly Live – fra hjulfordeling og bonusrunde-matematik til house edge-sammenligning og bankroll management.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="18-02-2026" readTime="11 Min." />

        <p className="mb-6 text-muted-foreground leading-relaxed">
          Denne side er en del af vores <Link to="/live-casino" className={linkClass}>komplette live casino guide</Link>. Her analyserer vi Monopoly Live specifikt – Evolutions populære game show, der kombinerer et live pengehjul med en immersiv 3D Monopoly-bonusrunde. For en bredere oversigt over game shows, se vores <Link to="/casinospil/game-shows" className={linkClass}>game show guide</Link>.
        </p>

        {/* H2 #1 – Konceptet */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Monopoly Live – konceptet bag Evolutions game show-hit</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Monopoly Live kombinerer to spilelementer: et Dream Catcher-lignende pengehjul og en unik 3D bonusrunde baseret på det klassiske Monopoly-brætspil. Det er et af de mest visuelt imponerende spil i live casino-segmentet – og et af de mest misforståede matematisk.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hjulet har 54 segmenter fordelt over 7 typer: tal-segmenter (1, 2, 5, 10) der udbetaler pålydende, "Chance"-segmenter med tilfældige kontant-multiplikatorer, og bonussegmenter ("2 Rolls" og "4 Rolls") der aktiverer den interaktive 3D-bonusrunde. Det er i bonusrunden, at de store gevinster opstår.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I bonusrunden bevæger en animeret Mr. Monopoly sig rundt på et 3D Monopoly-bræt. Du får 2 eller 4 terningkast afhængigt af hvilket segment du landede på. Hver ejendom på brættet har en multiplikator, og huse/hoteller (placeret tilfældigt hver runde) øger multiplikatorerne markant. Det er denne mekanik, der genererer potentielle gevinster over 1.000x – og der gør Monopoly Live til et underholdningsmæssigt højdepunkt i live casino.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #2 – Hjulfordeling */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hjulfordeling og sandsynligheder – de præcise tal</h2>
          <Card className="border-border bg-card mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 px-4 text-left">Segment</th>
                      <th className="py-2 px-4 text-left">Antal</th>
                      <th className="py-2 px-4 text-left">Sandsynlighed</th>
                      <th className="py-2 px-4 text-left">Udbetaling</th>
                      <th className="py-2 px-4 text-left">House Edge</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">1</td>
                      <td className="py-2 px-4">22</td>
                      <td className="py-2 px-4">40,74 %</td>
                      <td className="py-2 px-4">1:1</td>
                      <td className="py-2 px-4">3,70 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">2</td>
                      <td className="py-2 px-4">15</td>
                      <td className="py-2 px-4">27,78 %</td>
                      <td className="py-2 px-4">2:1</td>
                      <td className="py-2 px-4">3,70 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">5</td>
                      <td className="py-2 px-4">7</td>
                      <td className="py-2 px-4">12,96 %</td>
                      <td className="py-2 px-4">5:1</td>
                      <td className="py-2 px-4">3,70 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">10</td>
                      <td className="py-2 px-4">4</td>
                      <td className="py-2 px-4">7,41 %</td>
                      <td className="py-2 px-4">10:1</td>
                      <td className="py-2 px-4">3,70 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Chance</td>
                      <td className="py-2 px-4">3</td>
                      <td className="py-2 px-4">5,56 %</td>
                      <td className="py-2 px-4">Variabel</td>
                      <td className="py-2 px-4 text-destructive">~8,70 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">2 Rolls</td>
                      <td className="py-2 px-4">1</td>
                      <td className="py-2 px-4">1,85 %</td>
                      <td className="py-2 px-4">Bonusrunde</td>
                      <td className="py-2 px-4">~6,40 %</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">4 Rolls</td>
                      <td className="py-2 px-4">2</td>
                      <td className="py-2 px-4">3,70 %</td>
                      <td className="py-2 px-4">Bonusrunde</td>
                      <td className="py-2 px-4">~6,20 %</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Bemærk den markante forskel i house edge: tal-segmenter har en uniform 3,70 % house edge, mens Chance og bonusrunder har 6-9 %. Det matematisk optimale er udelukkende at bette på tal-segmenter. Bonusrunden er det mest underholdende element, men det er også det dyreste per indsat krone.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #3 – Bonusrunde analyse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bonusrunde-analyse – hvad kan du reelt forvente?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bonusrunden er Monopoly Livs unikke selling point. Når du aktiverer den, starter en 3D-animeret Mr. Monopoly med 2 eller 4 terningkast på et virtuelt bræt. Hvert felt har en basismultiplikator, og tilfældigt placerede huse (2x) og hoteller (4x) booster disse multiplikatorer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Gennemsnitlig bonusrunde-gevinst:</strong> Baseret på empiriske data er den gennemsnitlige multiplikator ca. 10-15x for 2 Rolls og 25-40x for 4 Rolls. Men fordelingen er ekstremt skæv: de fleste runder giver 2-8x, mens sjældne runder med multiple hoteller kan give 500-5.000x+. Medianen er markant lavere end gennemsnittet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Worst case i bonusrunden:</strong> Du kan lande på "Go to Jail" med din første kast og ikke slå dobbelt – det stopper runden med 0x (du taber din indsats). Eller du kan lande på ejendomme uden huse/hoteller og få minimale 1-3x multiplikatorer. Disse "busts" sker i ca. 20-30 % af bonusrunderne.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #4 – Bankroll */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bankroll management for Monopoly Live</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Monopoly Live har høj volatilitet, hvilket kræver en større bankroll relativt til din indsats end lavvolatilitets-spil som <Link to="/live-casino/blackjack" className={linkClass}>streamet blackjack</Link>. Med en gennemsnitlig house edge på 3,77 % og 25-30 spins/time er dit forventede tab ca. 47-57 kr./time ved 50 kr. indsats.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Anbefalet bankroll:</strong> Minimum 50x din gennemsnitlige indsats pr. session (2.500 kr. ved 50 kr. bet). Den høje volatilitet betyder, at du nemt kan have 20-30 spins uden gevinst, efterfulgt af en bonusrunde, der returnerer en del. En for lille bankroll udsætter dig for bust, før bonusrunderne har haft mulighed for at materialisere sig.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vigtigst: Monopoly Live er et underholdningsprodukt. Behandl din indsats som en underholdningsudgift, sæt en fast grænse, og spil aldrig for penge, du ikke har råd til at tabe. For support, kontakt <strong>StopSpillet</strong> (70 22 28 25) eller selvudeluk via <strong>ROFUS</strong>. 18+. Spil <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #5 – Sammenligning med andre game shows */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Monopoly Live vs. andre live game shows</h2>
          <Card className="border-border bg-card mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 px-4 text-left">Game Show</th>
                      <th className="py-2 px-4 text-left">House Edge</th>
                      <th className="py-2 px-4 text-left">Max Gevinst</th>
                      <th className="py-2 px-4 text-left">Bonusrunder</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Dream Catcher</td>
                      <td className="py-2 px-4">3,42 %</td>
                      <td className="py-2 px-4">~500x</td>
                      <td className="py-2 px-4">Ingen (kun multiplikatorer)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Monopoly Live</td>
                      <td className="py-2 px-4">3,77 %</td>
                      <td className="py-2 px-4">~10.000x</td>
                      <td className="py-2 px-4">3D Monopoly-bræt</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Crazy Time</td>
                      <td className="py-2 px-4 text-destructive">4,08 %</td>
                      <td className="py-2 px-4">25.000x</td>
                      <td className="py-2 px-4">4 bonusspil</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">Lightning Roulette</td>
                      <td className="py-2 px-4">2,78 %</td>
                      <td className="py-2 px-4">500x</td>
                      <td className="py-2 px-4">Multiplikatorer</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Monopoly Live placerer sig mellem Dream Catchers simplicitet og Crazy Times kompleksitet. Det har lavere house edge end Crazy Time men højere gevinstpotentiale end Dream Catcher. For den mest matematisk fordelagtige "show-agtige" oplevelse er <Link to="/live-casino/lightning-roulette" className={linkClass}>Lightning Roulette</Link> det bedste valg med kun 2,78 % edge og 500x max – men det mangler Monopoly Livs immersive bonusrunde.
          </p>
        </section>

        <InlineCasinoCards count={1} />

        <FAQSection title="Ofte stillede spørgsmål om Monopoly Live" faqs={faqs} />
        <AuthorBio author="jonas" />
        <RelatedGuides currentPath="/live-casino/monopoly-live" />
      </div>
    </>
  );
};

export default MonopolyLiveGuide;
