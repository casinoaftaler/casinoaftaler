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
  Calculator,
  Brain,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/europaeisk-blackjack-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad betyder ENHC-reglen i europæisk blackjack?",
    answer:
      "ENHC (European No Hole Card) betyder, at dealeren kun modtager ét kort, indtil alle spillere har handlet. Dealeren har altså intet hole card. Konsekvensen: hvis du fordobler eller splitter, og dealeren derefter trækker en blackjack, mister du den fulde fordobling/split-indsats – ikke kun den originale.",
  },
  {
    question: "Hvad er forskellen mellem ENHC og OBO?",
    answer: (
      <>
        ENHC (European No Hole Card) lader dig miste alle indsatser mod dealer-blackjack. OBO (Original Bets Only) beskytter dig: ved dealer-blackjack mister du kun din originale indsats, ikke fordoblinger/splits. OBO gør europæisk blackjack matematisk ækvivalent med <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link>.
      </>
    ),
  },
  {
    question: "Er europæisk blackjack dårligere end amerikansk?",
    answer:
      "Med ENHC-regler er house edge ca. 0,11 procentpoint højere. Med OBO-regler er der ingen forskel. I praksis afhænger det af de specifikke bordsregler – en europæisk variant med S17 og OBO kan være bedre end en amerikansk med H17.",
  },
  {
    question: "Hvorfor tilbyder europæiske casinoer ikke hole card?",
    answer:
      "Traditionen stammer fra europæisk casinokultur, hvor dealeren kun modtager ét kort for at reducere muligheden for dealer-svindel (collusion). Uden et skjult kort kan dealeren ikke signalere sin hånds styrke til en medsammensvoren.",
  },
  {
    question: "Skal jeg ændre min basic strategy til europæisk blackjack?",
    answer: (
      <>
        Ja, med ENHC-regler bør du være mere konservativ med fordoblinger og splits mod dealerens 10 og es. For eksempel: i <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link> splitter du altid 8'ere – i europæisk ENHC er det bedre at hitte 8+8 mod dealerens 10. Med OBO-regler er strategien identisk med amerikansk.
      </>
    ),
  },
  {
    question: "Hvor finder jeg europæisk blackjack med de bedste regler?",
    answer: (
      <>
        De fleste <Link to="/casino-anmeldelser" className={linkClass}>danske licenserede casinoer</Link> tilbyder europæisk blackjack via <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>. Kig efter borde med OBO-regler, S17 og DAS for den laveste house edge.
      </>
    ),
  },
];

const EuropaeiskBlackjackGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Europæisk Blackjack 2026 – ENHC, OBO & Strategi Guide",
    description: "Komplet guide til europæisk blackjack med ENHC/OBO-regler, tilpasset basic strategy og house edge-sammenligning med amerikansk variant.",
    url: `${SITE_URL}/casinospil/blackjack/europaeisk-blackjack`,
    datePublished: "2026-03-02",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Europæisk Blackjack 2026 – ENHC & OBO Regler"
        description="Komplet guide til europæisk blackjack: ENHC vs. OBO-regler, tilpasset basic strategy og matematisk sammenligning med amerikansk variant."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(160 60% 20%), hsl(200 70% 22%) 40%, hsl(260 50% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Europæisk Blackjack – No Hole Card, ENHC og Strategisk Tilpasning
            </h1>
            <p className="text-lg text-white/80">
              Den europæiske tradition kræver en anden strategisk tilgang. Forstå ENHC vs. OBO – og spil optimalt.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="22 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Elegant europæisk blackjack-bord med grønt filt og kort" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* SECTION 1 – Introduktion */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Eye className="h-7 w-7 text-primary" />
            Europæisk Blackjack – Den Klassiske Tilgang til 21
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Europæisk blackjack adskiller sig fundamentalt fra sin <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikanske modpart</Link> ved en tilsyneladende lille regelændring med store konsekvenser: dealeren modtager kun ét synligt kort. Der er intet hole card, ingen peek – dealerens anden kort deles først, når alle spillere har handlet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne tradition stammer fra europæiske casinoer, hvor man ønskede at eliminere enhver mulighed for dealer-svindel. Uden et skjult kort kan dealeren ikke signalere sin hånds styrke. Men for spilleren skaber det en vigtig strategisk usikkerhed: du handler uden at vide, om dealeren har blackjack.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I praksis betyder det, at du risikerer at fordoble eller splitte din indsats – og derefter opdage, at dealeren har blackjack. Under strenge ENHC-regler (European No Hole Card) mister du den fulde indsats, inklusive fordoblinger og splits. Det er dette "usikkerheds-tillæg" der gør europæisk ENHC-blackjack ca. 0,11 % dyrere end den amerikanske variant.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Mange europæiske casinoer har dog indført OBO-reglen (Original Bets Only) som kompensation: ved dealer-blackjack mister du kun din originale indsats. OBO eliminerer næsten hele forskellen og gør den europæiske variant matematisk ækvivalent med den amerikanske.
          </p>
        </section>

        <InlineCasinoCards title="Bedste europæisk blackjack online" count={4} />

        {/* SECTION 2 – ENHC vs. OBO detaljeret */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            ENHC vs. OBO – Den Afgørende Regelforskydning
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Forstå forskellen mellem disse to regelsæt, så undgår du at vælge det forkerte bord:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  ENHC (European No Hole Card)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Dealer modtager kun 1 kort</li>
                  <li>• Ingen peek for blackjack</li>
                  <li>• Fordoblinger/splits tabes FULDT mod BJ</li>
                  <li>• House edge: ca. +0,11 % vs. amerikansk</li>
                  <li>• Kræver tilpasset basic strategy</li>
                  <li>• Mere konservative splits/fordoblinger</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  OBO (Original Bets Only)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Dealer modtager kun 1 kort</li>
                  <li>• Ingen peek for blackjack</li>
                  <li>• Kun originale indsats tabes mod BJ</li>
                  <li>• House edge: ≈ identisk med amerikansk</li>
                  <li>• Standard basic strategy fungerer</li>
                  <li>• Mere spillervenlig end ENHC</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Praktisk guide:</strong> Tjek altid bordets regler inden du sætter dig. I <Link to="/live-casino/blackjack" className={linkClass}>live blackjack</Link> vises reglerne typisk i info-sektionen. Hvis du ser "Original Bets Only" eller "OBO", kan du bruge standard basic strategy. Hvis ikke – tilpas din strategi som beskrevet nedenfor.
          </p>
        </section>

        <Separator className="my-10" />

        {/* SECTION 3 – Tilpasset basic strategy */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Tilpasset Basic Strategy for ENHC
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Under ENHC-regler skal du justere din strategi for at undgå at miste ekstra indsatser mod potentielle dealer-blackjacks. De vigtigste ændringer:
          </p>
          <Card className="border-border bg-card my-6">
            <CardHeader>
              <CardTitle className="text-lg">ENHC Strategi-Justeringer vs. Standard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Din Hånd</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Dealer 10</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Dealer Es</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Standard (OBO/US)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">11</td>
                      <td className="text-center py-2 text-destructive font-medium">Hit</td>
                      <td className="text-center py-2 text-destructive font-medium">Hit</td>
                      <td className="text-center py-2">Double</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">8,8</td>
                      <td className="text-center py-2 text-destructive font-medium">Hit</td>
                      <td className="text-center py-2 text-destructive font-medium">Hit</td>
                      <td className="text-center py-2">Split</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">A,A</td>
                      <td className="text-center py-2">Split</td>
                      <td className="text-center py-2 text-destructive font-medium">Hit</td>
                      <td className="text-center py-2">Split</td>
                    </tr>
                    <tr>
                      <td className="py-2">10 vs. 10</td>
                      <td className="text-center py-2">Stand</td>
                      <td className="text-center py-2">Stand</td>
                      <td className="text-center py-2">Stand</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Nøglen er simpel: under ENHC undgår du at lægge ekstra penge på bordet (fordobling/split) mod dealerens 10 og es, fordi risikoen for at miste dem mod en uopdaget blackjack er for høj. Disse justeringer koster dig marginalt EV i de tilfælde, hvor dealeren <em>ikke</em> har blackjack, men sparer dig betydeligt i de 4,8 % af tilfældene, hvor dealeren har blackjack.
          </p>
        </section>

        <Separator className="my-10" />

        {/* SECTION 4 – House edge matematik */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Calculator className="h-7 w-7 text-primary" />
            Matematisk Sammenligning – House Edge i Detaljer
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Europæisk blackjack spilles typisk med 2, 6 eller 8 kortspil. Antallet af decks har en mindre, men målbar effekt på house edge:
          </p>
          <Card className="border-border bg-card my-6">
            <CardHeader>
              <CardTitle className="text-lg">House Edge efter Regelvariation (Europæisk)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Regelsæt</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">House Edge</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">6-deck, S17, ENHC, DAS</td>
                      <td className="text-center py-2">0,39 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">6-deck, S17, OBO, DAS</td>
                      <td className="text-center py-2">0,29 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">8-deck, H17, ENHC, ingen DAS</td>
                      <td className="text-center py-2">0,62 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">2-deck, S17, ENHC</td>
                      <td className="text-center py-2">0,31 %</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-foreground">Amerikansk 6-deck, S17, DAS (reference)</td>
                      <td className="text-center py-2">0,28 %</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Konklusionen er klar: europæisk blackjack med OBO-regler er næsten identisk med <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link>. Den reelle forskel opstår kun med ENHC, og selv her er differencen kun 0,11 % – langt lavere end forskellen mellem <Link to="/casinospil/roulette" className={linkClass}>europæisk og amerikansk roulette</Link> (2,70 % vs. 5,26 %).
          </p>
        </section>

        <Separator className="my-10" />

        {/* SECTION 5 – Historisk kontekst */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            Historisk Kontekst – Hvorfor To Traditioner?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Adskillelsen mellem amerikansk og europæisk blackjack går tilbage til spillets udbredelse i 1800-tallet. I amerikanske gambling halls (først i New Orleans, senere i Las Vegas) var tempoet alt. Hole card-systemet blev indført for at accelerere spillet og reducere tvister om dealerens handlinger.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I europæiske casinoer – særligt Monte Carlo, Baden-Baden og London-klubberne – var traditionen anderledes. Spillet var mere ceremoniielt, tempoet langsommere, og der var større fokus på at forhindre dealer-manipulation. No hole card-reglen var et anti-svindel tiltag: uden et skjult kort havde dealeren ingen information at lække til en medsammensvoren.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I dag er grænsen udvisket. Mange europæiske online casinoer tilbyder amerikanske regler, og omvendt. <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>, der dominerer live casino-markedet, tilbyder begge varianter. For danske spillere er den vigtigste anbefaling at ignorere etiketten ("europæisk" / "amerikansk") og i stedet fokusere på de specifikke regler: S17 vs. H17, ENHC vs. OBO, DAS, surrender og antal decks.
          </p>
        </section>

        <Separator className="my-10" />

        {/* SECTION 6 – Praktiske tips */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-primary" />
            Praktisk Valg-Guide – Europæisk eller Amerikansk?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For de fleste danske spillere er anbefalingen enkel:
          </p>
          <ul className="space-y-3 mb-6 ml-4">
            <li className="text-muted-foreground leading-relaxed">
              <strong>Hvis du er nybegynder:</strong> Vælg <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link> med hole card. Det er simplere, og du behøver ikke justere din basic strategy.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Hvis du foretrækker europæisk stil:</strong> Sørg for at bordet har OBO-regler. Med OBO er forskellen negligibel.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Hvis bordet har ENHC:</strong> Brug den tilpassede strategi ovenfor. Forskellen er kun 0,11 %, men det akkumuleres over tusindvis af hænder.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Altid tjek for 3:2 vs. 6:5:</strong> Uanset variant er 6:5 blackjack-udbetaling det største røde flag. Det øger house edge med 1,39 % – langt mere end nogen regional regelvariation.
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Husk: den vigtigste blackjack-beslutning er ikke varianten – det er om du følger <Link to="/casinospil/blackjack" className={linkClass}>basic strategy</Link>. En spiller med perfekt strategi ved det "forkerte" bord slår en mavefornemmelse-spiller ved det "rigtige" bord hver gang.
          </p>
        </section>

        <Separator className="my-10" />

        <AuthorBio />

        <RelatedGuides currentPath="/casinospil/blackjack/europaeisk-blackjack" />

        <FAQSection faqs={faqs} />
      </div>
    </>
  );
};

export default EuropaeiskBlackjackGuide;
