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
  ShieldCheck,
  BarChart3,
  Sparkles,
  Zap,
  AlertTriangle,
  TrendingUp,
  Scale,
  Eye,
  Layers,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/double-exposure-blackjack-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er Double Exposure Blackjack?",
    answer: (
      <>
        Double Exposure (også kaldet Face Up 21) er en blackjack-variant, hvor begge dealerens kort deles åbent. Du har fuld information om dealerens hånd, før du handler. Til gengæld kompenserer casinoet med strengere regler – typisk betaler blackjack kun 1:1 (even money), og dealeren vinder alle ties undtagen naturlig blackjack.
      </>
    ),
  },
  {
    question: "Er house edge lavere fordi man kan se begge dealerkort?",
    answer:
      "Nej, faktisk er house edge typisk 0,69 % – højere end standard blackjack (0,28-0,50 %). Informationsfordelen kompenseres fuldt ud af regelrestriktionerne: 1:1 blackjack-udbetaling, dealer vinder ties, og begrænsede split/fordoblings-muligheder.",
  },
  {
    question: "Hvornår skal man hitte på 20 i Double Exposure?",
    answer:
      "Aldrig. Selvom du kan se dealerens kort, er det aldrig korrekt at hitte hard 20. Risikoen for bust (92 %) overstiger enhver potentiel gevinst. Stand altid på 20, uanset dealerens hånd.",
  },
  {
    question: "Kan man korttælle i Double Exposure?",
    answer:
      "Ja, og det er faktisk lettere, fordi du ser to ekstra kort pr. runde. Men casinoer bruger typisk 6-8 decks med hyppig omblanding for at minimere effekten. Online RNG-versioner blander efter hver hånd.",
  },
  {
    question: "Er Double Exposure tilgængelig hos danske casinoer?",
    answer: (
      <>
        Double Exposure er sjælden i <Link to="/live-casino" className={linkClass}>live casino</Link>-format, men flere <Link to="/casino-anmeldelser" className={linkClass}>danske licenserede casinoer</Link> tilbyder RNG-versioner fra udbydere som <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link> og <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>.
      </>
    ),
  },
  {
    question: "Hvad er den optimale strategi for Double Exposure?",
    answer:
      "Strategien adskiller sig markant fra standard blackjack, fordi du har fuld information. Grundreglen: stand når du slår dealerens total, hit når du er bagud, og fordobl kun i de stærkeste situationer. Du skal aldrig tage insurance (den eksisterer ikke i Double Exposure) og sjældent splitte.",
  },
];

const DoubleExposureBlackjackGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Double Exposure Blackjack 2026 – Regler, Strategi & EV-Analyse",
    description: "Komplet guide til Double Exposure Blackjack: begge dealerkort synlige, tilpasset strategi, house edge-matematik og sammenligning med klassisk blackjack.",
    url: `${SITE_URL}/casinospil/blackjack/double-exposure`,
    datePublished: "2026-03-02",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Double Exposure Blackjack 2026 – Komplet Guide"
        description="Double Exposure Blackjack guide: begge dealerkort synlige, tilpasset strategi, house edge-matematik og EV-analyse for danske spillere."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(280 60% 22%), hsl(300 50% 18%) 40%, hsl(220 70% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Double Exposure Blackjack – Fuld Information, Nye Regler
            </h1>
            <p className="text-lg text-white/80">
              Se begge dealerens kort – men forbered dig på strengere vilkår. En unik variant der udfordrer din strategi.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="20 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Double Exposure blackjack-bord med begge dealerkort synlige" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* SECTION 1 – Hvad er Double Exposure */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Eye className="h-7 w-7 text-primary" />
            Hvad er Double Exposure Blackjack?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Double Exposure Blackjack (også kendt som Face Up 21 eller Dealer Disclosure) er en af de mest unikke blackjack-varianter. Konceptet er radikalt simpelt: <strong>begge dealerens kort deles åbent</strong>. Du har fuld information om dealerens hånd, før du træffer nogen beslutning.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det lyder som en kæmpe fordel for spilleren – og det er det i isolation. Men casinoer er ikke velgørende organisationer. Fordelen ved at se begge kort kompenseres med strengere regler, der tilter house edge markant. Det mest bemærkelsesværdige: <strong>blackjack betaler kun 1:1</strong> (even money) i stedet for det sædvanlige 3:2, og <strong>dealer vinder alle ties</strong> (pushes) undtagen naturlig blackjack.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Resultatet er en variant med ca. <strong>0,69 % house edge</strong> – højere end standard <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link> (0,28 %) og <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>europæisk blackjack</Link> (0,39 %). Alligevel tiltrækker Double Exposure mange spillere, fordi den eliminerer den frustrerende usikkerhed om dealerens skjulte kort.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Double Exposure blev populært i 1970'erne og 1980'erne i Las Vegas og blev formaliseret af Richard Epstein i hans arbejde om spilteori. Varianten er i dag primært tilgængelig online som RNG-spil, da live-versioner er sjældne.
          </p>
        </section>

        <InlineCasinoCards title="Casinoer med Double Exposure blackjack" count={3} />

        {/* SECTION 2 – Regler */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            Reglerne – Hvad Du Giver og Hvad Du Får
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Spillerfordele
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Begge dealerkort synlige fra start</li>
                  <li>• Perfekt information til beslutninger</li>
                  <li>• Ingen overraskelser (dealer-blackjack ses straks)</li>
                  <li>• Ingen insurance-fælde</li>
                  <li>• Lettere at lære optimal strategi</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Casino-kompensationer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Blackjack betaler 1:1 (ikke 3:2)</li>
                  <li>• Dealer vinder alle ties (undtagen BJ)</li>
                  <li>• Fordobling kun på hard 9, 10, 11</li>
                  <li>• Split kun én gang (ingen re-split)</li>
                  <li>• Ingen surrender</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Den enkelte regelændring med størst impact er 1:1 blackjack. I standard blackjack udgør 3:2-udbetalingen ca. 2,3 % af din samlede forventede værdi. At reducere den til 1:1 koster dig 1,39 % i house edge – mere end alle andre regelforskelle tilsammen. Dealer-wins-ties tilføjer yderligere ca. 0,50 %. Den samlede kompensation overstiger informationsfordelen.
          </p>
        </section>

        <Separator className="my-10" />

        {/* SECTION 3 – Strategi */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            Optimal Strategi – Helt Anderledes end Klassisk Blackjack
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fordi du kender dealerens fulde hånd, er strategien for Double Exposure fundamentalt anderledes end <Link to="/casinospil/blackjack" className={linkClass}>standard basic strategy</Link>. I stedet for at handle baseret på dealerens up card, handler du baseret på dealerens <em>total</em>.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Grundprincippet:</strong> Fordi dealer vinder ties, skal du stræbe efter at <em>slå</em> dealerens total – ikke bare matche den. En hånd på 18 mod dealerens 18 er et tab, ikke en push. Det ændrer hele din tærskel for at stå vs. hitte.
          </p>
          <Card className="border-border bg-card my-6">
            <CardHeader>
              <CardTitle className="text-lg">Nøgle-beslutninger i Double Exposure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Situation</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Double Exposure</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Standard BJ</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">Du: 18, Dealer: 19</td>
                      <td className="text-center py-2 font-medium text-primary">Hit</td>
                      <td className="text-center py-2">Stand</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Du: 17, Dealer: 17</td>
                      <td className="text-center py-2 font-medium text-primary">Hit (tie = loss)</td>
                      <td className="text-center py-2">Stand</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Du: 20, Dealer: 20</td>
                      <td className="text-center py-2 font-medium text-destructive">Stand (accept tab)</td>
                      <td className="text-center py-2">Stand (push)</td>
                    </tr>
                    <tr>
                      <td className="py-2">Du: 12, Dealer: bust-hånd (15)</td>
                      <td className="text-center py-2 font-medium text-primary">Stand</td>
                      <td className="text-center py-2">Hit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Den mest kontraintuitive ændring: du hitter oftere på hånde over 15, fordi et tie er et tab. Og du stander oftere på lave hånde, fordi du kan <em>se</em> at dealeren sandsynligvis buster. Denne dynamik gør Double Exposure til en udmærket variant for spillere, der vil udfordre deres strategiske tænkning ud over <Link to="/casinospil/blackjack" className={linkClass}>standard blackjack</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* SECTION 4 – House edge */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            House Edge Dekonstruktion
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at forstå hvorfor Double Exposure har en højere house edge trods mere information, lad os nedbryde bidraget fra hver regel:
          </p>
          <ul className="space-y-3 mb-6 ml-4">
            <li className="text-muted-foreground leading-relaxed">
              <strong>Informationsfordel (begge kort synlige):</strong> -2,00 % (fordel for spilleren)
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Blackjack betaler 1:1:</strong> +1,39 % (casinokompensation)
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Dealer vinder alle ties:</strong> +0,50 % (casinokompensation)
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Fordobling kun 9/10/11:</strong> +0,09 % (casinokompensation)
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Ingen re-split / surrender:</strong> +0,15 % (casinokompensation)
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Nettoresultat:</strong> ca. 0,69 % house edge. Til sammenligning: <Link to="/casinospil/blackjack/spanish-21" className={linkClass}>Spanish 21</Link> har 0,40 %, og <Link to="/casinospil/roulette" className={linkClass}>europæisk roulette</Link> har 2,70 %. Double Exposure er stadig et af de bedste casinospil målt på house edge – bare ikke det bedste blackjack-spil.
          </p>
        </section>

        <Separator className="my-10" />

        {/* SECTION 5 – Hvem bør spille */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-primary" />
            Hvem Bør Spille Double Exposure?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Double Exposure er ideel for spillere, der:
          </p>
          <ul className="space-y-3 mb-6 ml-4">
            <li className="text-muted-foreground leading-relaxed">
              <strong>Frustreres af dealerens skjulte kort:</strong> Eliminér usikkerheden. Du ved altid, hvad du er oppe imod.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Ønsker en strategisk udfordring:</strong> Strategien er helt anderledes og kræver omtanke.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Accepterer lidt højere house edge for gennemsigtighed:</strong> 0,69 % er stadig langt bedre end de fleste casinospil.
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Undgå Double Exposure, hvis du primært optimerer for den laveste mulige house edge. I det tilfælde er <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link> med S17 og 3:2 det objektivt bedste valg. For den bedste balance mellem variation og edge, overvej <Link to="/casinospil/blackjack/spanish-21" className={linkClass}>Spanish 21</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        <AuthorBio />

        <RelatedGuides currentPath="/casinospil/blackjack/double-exposure" />

        <FAQSection faqs={faqs} />
      </div>
    </>
  );
};

export default DoubleExposureBlackjackGuide;
