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
  Trophy,
  Gift,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/spanish-21-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er forskellen mellem Spanish 21 og klassisk blackjack?",
    answer: (
      <>
        Spanish 21 fjerner alle 10-værdikort (men beholder J, Q, K) fra kortbunken og kompenserer med spillervenlige bonusregler: spiller-21 vinder altid, late surrender efter fordobling, re-split af esser og bonusudbetalinger for specifikke 21-kombinationer (5-kort 21, 6-7-8, 7-7-7). Det resulterer i en fundamentalt anderledes strategisk oplevelse end <Link to="/casinospil/blackjack" className={linkClass}>standard blackjack</Link>.
      </>
    ),
  },
  {
    question: "Er house edge lavere i Spanish 21?",
    answer:
      "Med optimal strategi er house edge ca. 0,40 % – lavere end europæisk blackjack (0,39 % ENHC) men højere end optimal amerikansk blackjack (0,28 %). Den faktiske edge afhænger af om dealer stander eller hitter soft 17: S17-varianten er ca. 0,38 %, H17-varianten ca. 0,76 %.",
  },
  {
    question: "Hvorfor fjernes 10'erne fra kortbunken?",
    answer:
      "10-værdikort er de mest værdifulde for spilleren i blackjack – de muliggør naturlig blackjack og gør fordoblinger stærkere. Ved at fjerne dem (48 kort ud af 416 i et 8-deck spil) reducerer casinoet spillerens grundlæggende fordel markant. Bonusreglerne kompenserer delvist, men kun ved optimal spil.",
  },
  {
    question: "Kan jeg bruge standard basic strategy i Spanish 21?",
    answer:
      "Nej! Strategien er fundamentalt anderledes. Fordi 10'erne mangler, ændres sandsynlighederne for alle hænder. Du skal hitte mere aggressivt, fordoble på andre hånde og udnytte de unikke regler (double down rescue, re-split esser). At bruge standard strategi i Spanish 21 øger house edge med 1-2 %.",
  },
  {
    question: "Hvad er de bedste bonusudbetalinger i Spanish 21?",
    answer:
      "7-7-7 i samme farve mod dealerens 7 giver typisk en super bonus på 5.000 kr. eller 50:1. 5-kort 21 betaler 3:2, 6-kort 21 betaler 2:1, og 7+ kort 21 betaler 3:1. Disse bonusser er sjældne men tilføjer spænding og marginalt forbedrer den samlede EV.",
  },
  {
    question: "Hvor kan jeg spille Spanish 21 online?",
    answer: (
      <>
        Spanish 21 tilbydes af <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link> under navnet "Spanish Blackjack" og af flere andre udbydere. Det er sjældent i <Link to="/live-casino" className={linkClass}>live casino</Link>-format. Tjek vores <Link to="/casino-anmeldelser" className={linkClass}>casino-anmeldelser</Link> for at finde specifikke tilgængeligheder.
      </>
    ),
  },
];

const Spanish21Guide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Spanish 21 Blackjack 2026 – Regler, Bonusser & Strategi",
    description: "Komplet guide til Spanish 21: fjernede 10'ere, bonusudbetalinger, tilpasset strategi og house edge-analyse for danske spillere.",
    url: `${SITE_URL}/casinospil/blackjack/spanish-21`,
    datePublished: "2026-03-02",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Spanish 21 Blackjack 2026 – Bonusser & Strategi"
        description="Komplet Spanish 21-guide: unikke bonusregler, tilpasset strategi uden 10'ere, house edge-analyse og sammenligning med klassisk blackjack."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(30 70% 22%), hsl(280 50% 22%) 40%, hsl(350 60% 20%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Spanish 21 – Ingen 10'ere, Mere Bonus, Ny Strategi
            </h1>
            <p className="text-lg text-white/80">
              En blackjack-variant der fjerner 10-kortene og erstatter dem med spillervenlige bonusregler. Unik matematik, unik strategi.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="24 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Spanish 21 blackjack-bord med ornamenterede gulddekorationer" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* SECTION 1 – Hvad er Spanish 21 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Eye className="h-7 w-7 text-primary" />
            Hvad er Spanish 21 – Og Hvorfor er Den Unik?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spanish 21 er den mest radikale mainstream-variant af <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>. Den tager det grundlæggende spil og vender det på hovedet ved at fjerne alle 48 kort med værdien 10 (men beholder knægte, damer og konger). Dette ene greb ændrer hele matematikken – og for at kompensere tilbyder spillet et arsenal af spillervenlige bonusregler, som ingen anden variant matcher.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Varianten blev opfundet i 1995 af Masque Publishing i samarbejde med det spanske National Lottery og tog hurtigt fart i Las Vegas. Navnet refererer til den spanske kortbunke (baraja española), som traditionelt ikke indeholder 10'ere. I dag er Spanish 21 en af de mest udbredte blackjack-varianter i fysiske casinoer i Nordamerika og Australien (hvor den hedder "Pontoon").
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det centrale spørgsmål: opvejer bonusreglerne tabet af 10'erne? Svaret er: næsten. Med perfekt strategi opnås en house edge på ca. 0,40 % – marginalt højere end <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>optimal amerikansk blackjack</Link> (0,28 %), men lavere end mange europæiske varianter. Problemet er, at perfekt Spanish 21-strategi er betydeligt mere kompleks end standard basic strategy.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Uden 10'erne falder sandsynligheden for naturlig blackjack fra 4,83 % til 3,65 %. Fordoblinger bliver svagere, fordi du sjældnere trækker et 10-kort ovenpå. Dealers bust-rate falder marginalt. Disse ændringer akkumuleres til en fordel for casinoet – som derefter delvist gives tilbage via bonusregler.
          </p>
        </section>

        <InlineCasinoCards title="Casinoer med Spanish 21" count={3} />

        {/* SECTION 2 – Bonusregler */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gift className="h-7 w-7 text-primary" />
            Bonusreglerne – Det Der Gør Spanish 21 Speciel
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spanish 21 kompenserer for de manglende 10'ere med et omfattende sæt bonusregler. Disse regler er ikke blot dekorative – de er matematisk essentielle og udgør en betydelig del af din forventede værdi:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5 text-primary" />
                  Bonus 21-Udbetalinger
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>5-kort 21:</strong> betaler 3:2</li>
                  <li>• <strong>6-kort 21:</strong> betaler 2:1</li>
                  <li>• <strong>7+ kort 21:</strong> betaler 3:1</li>
                  <li>• <strong>6-7-8 (mixed):</strong> betaler 3:2</li>
                  <li>• <strong>6-7-8 (suited):</strong> betaler 2:1</li>
                  <li>• <strong>6-7-8 (spades):</strong> betaler 3:1</li>
                  <li>• <strong>7-7-7 (suited) vs. dealer 7:</strong> Super Bonus!</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Spillervenlige Regler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Spiller-21 vinder altid</strong> (uanset dealer)</li>
                  <li>• <strong>Spiller-blackjack vinder altid</strong> (inkl. mod dealer-BJ)</li>
                  <li>• <strong>Late surrender</strong> efter fordobling (double down rescue)</li>
                  <li>• <strong>Re-split af esser</strong> tilladt</li>
                  <li>• <strong>Fordobling</strong> på ethvert antal kort</li>
                  <li>• <strong>Hit og fordobl</strong> efter split af esser</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Den mest værdifulde enkeltregul er "spiller-21 vinder altid" – den eliminerer frustrationen ved at opnå 21 og se dealeren matche det. I standard blackjack er det en push; i Spanish 21 er det en gevinst. "Double down rescue" (surrender efter fordobling) er en anden unik feature, der tillader dig at redde halvdelen af din forhøjede indsats, hvis fordoblingen går galt.
          </p>
        </section>

        <Separator className="my-10" />

        {/* SECTION 3 – Strategi */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            Strategitilpasning – Hvorfor Standard Basic Strategy Fejler
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            At bruge standard <Link to="/casinospil/blackjack" className={linkClass}>blackjack basic strategy</Link> i Spanish 21 er en af de mest almindelige – og dyreste – fejl. Uden 10'erne i bunken ændres sandsynlighedsfordelingen for alle hånde:
          </p>
          <ul className="space-y-3 mb-6 ml-4">
            <li className="text-muted-foreground leading-relaxed">
              <strong>Fordobling på 11:</strong> I standard BJ er 11 den stærkeste fordoblingshånd, fordi 30,8 % af kortene er 10'ere. I Spanish 21 falder denne sandsynlighed til ca. 24 %, hvilket gør fordobling mindre attraktiv mod stærke dealerkort.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Stå vs. hit på 16:</strong> Uden 10'erne buster du sjældnere ved at hitte – og dealeren buster også sjældnere. Du skal hitte mere aggressivt på borderline-hånde.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Multi-kort 21-jagt:</strong> Bonusudbetalinger for 5+, 6+, 7+ kort 21 gør det matematisk korrekt at jage 21 i situationer, hvor standard strategi ville sige "stå".
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Double down rescue:</strong> Udnyt muligheden for at surrendere efter en mislykket fordobling. Det giver dig lov til at fordoble mere aggressivt.
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Den fulde optimal strategi for Spanish 21 er væsentligt mere kompleks end standard basic strategy – den involverer over 200 afvigelser. For de fleste spillere er det tilstrækkeligt at fokusere på de 10-15 mest betydningsfulde ændringer, som dækker ca. 80 % af den strategiske forskel.
          </p>
        </section>

        <Separator className="my-10" />

        {/* SECTION 4 – House edge analyse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            House Edge Analyse – S17 vs. H17
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spanish 21 findes i to hovedvarianter, afhængigt af om dealeren stander eller hitter soft 17:
          </p>
          <Card className="border-border bg-card my-6">
            <CardHeader>
              <CardTitle className="text-lg">House Edge – Spanish 21 vs. Andre Varianter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Variant</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">House Edge</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">10'ere i bunken</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">Spanish 21 (S17, 6-deck)</td>
                      <td className="text-center py-2 font-medium text-primary">0,38 %</td>
                      <td className="text-center py-2">❌ Fjernet</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Spanish 21 (H17, 8-deck)</td>
                      <td className="text-center py-2">0,76 %</td>
                      <td className="text-center py-2">❌ Fjernet</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2"><Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>Amerikansk BJ (S17)</Link></td>
                      <td className="text-center py-2">0,28 %</td>
                      <td className="text-center py-2">✅ Inkluderet</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2"><Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>Europæisk BJ (ENHC)</Link></td>
                      <td className="text-center py-2">0,39 %</td>
                      <td className="text-center py-2">✅ Inkluderet</td>
                    </tr>
                    <tr>
                      <td className="py-2"><Link to="/casinospil/blackjack/double-exposure" className={linkClass}>Double Exposure</Link></td>
                      <td className="text-center py-2">0,69 %</td>
                      <td className="text-center py-2">✅ Inkluderet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Forskellen mellem S17 og H17 er ekstra udtalt i Spanish 21 (0,38 % procentpoint), fordi de manglende 10'ere ændrer dealerens bust-sandsynligheder mere drastisk. Vælg altid S17-borde, når de er tilgængelige – det er den mest spillervenlige variant.
          </p>
        </section>

        <Separator className="my-10" />

        {/* SECTION 5 – Hvem bør spille */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-primary" />
            Er Spanish 21 Det Rigtige Valg for Dig?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spanish 21 er ideel for erfarne blackjack-spillere, der søger variation og er villige til at lære en ny strategi. Bonusreglerne tilføjer et underholdningselement, som standard blackjack mangler – og "spiller-21 vinder altid"-reglen eliminerer en af de mest frustrerende oplevelser i casinospil.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Vælg Spanish 21 hvis du:</strong> har mestret <Link to="/casinospil/blackjack" className={linkClass}>standard basic strategy</Link> og vil have en ny udfordring; nyder bonusgevinster og variation; er villig til at studere en mere kompleks strategi; spiller primært for underholdning og accepterer en marginalt højere house edge.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Undgå Spanish 21 hvis du:</strong> optimerer rent for lavest mulig house edge (vælg <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link> i stedet); er nybegynder og endnu ikke behersker standard strategi; kun kan finde H17-borde (0,76 % edge er for høj); eller finder det ukomfortabelt at spille uden de 10'ere, du er vant til.
          </p>
        </section>

        <Separator className="my-10" />

        <AuthorBio />

        <RelatedGuides currentPath="/casinospil/blackjack/spanish-21" />

        <FAQSection faqs={faqs} />
      </div>
    </>
  );
};

export default Spanish21Guide;
