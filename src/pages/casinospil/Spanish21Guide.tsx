import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { CasinospilMoneyLinks } from "@/components/CasinospilMoneyLinks";
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
  Brain,
  Timer,
  Calculator,
  Gamepad2,
  Users,
  Puzzle,
  Flame,
  BookOpen,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/spanish-21-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er forskellen mellem Spanish 21 og klassisk blackjack?",
    answer: (
      <>
        Spanish 21 fjerner alle 10-værdikort (men beholder J, Q, K) fra kortbunken og kompenserer med spillervenlige bonusregler: spiller-21 vinder altid, late surrender efter fordobling, re-split af esser og bonusudbetalinger for specifikke 21-kombinationer. Det resulterer i en fundamentalt anderledes strategisk oplevelse end <Link to="/casinospil/blackjack" className={linkClass}>standard blackjack</Link>.
      </>
    ),
  },
  {
    question: "Er house edge lavere i Spanish 21?",
    answer:
      "Med optimal strategi er house edge ca. 0,40 % – lavere end europæisk blackjack ENHC (0,39 %) men højere end optimal amerikansk blackjack (0,28 %). Den faktiske edge afhænger af om dealer stander eller hitter soft 17: S17-varianten er ca. 0,38 %, H17-varianten ca. 0,76 %.",
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
  {
    question: "Hvad er forskellen mellem Spanish 21 og Pontoon?",
    answer:
      "Pontoon er den australske version af Spanish 21 med næsten identiske regler. Hovedforskellene: i Pontoon hedder 'hit' → 'twist' og 'stand' → 'stick'. Bonusudbetalingerne er lidt forskellige, og Pontoon kræver typisk et minimum af 5 kort for 'Five Card Charlie'-bonus. Matematisk er de næsten ækvivalente.",
  },
  {
    question: "Er Double Down Rescue virkelig værd at bruge?",
    answer:
      "Ja – det er en af de mest værdifulde regler i Spanish 21. Double Down Rescue (surrender efter fordobling) lader dig redde halvdelen af din forhøjede indsats, hvis fordoblingen gik galt. Det tilføjer ca. 0,08 % til din samlede EV og tillader mere aggressive fordoblinger, fordi du har en exit-strategi.",
  },
  {
    question: "Påvirker de manglende 10'ere korttælning?",
    answer:
      "Ja, markant. Standard Hi-Lo-systemet fungerer dårligere, fordi der er færre 10-værdikort at tælle ned. Specialiserede tællesystemer for Spanish 21 eksisterer (f.eks. 'Red 7 Modified'), men de er komplekse og giver kun marginal fordel med de typiske 8-deck opsætninger i online-formatet.",
  },
  {
    question: "Er Spanish 21 bedre end Double Exposure?",
    answer: (
      <>
        Ja, matematisk. Spanish 21 har 0,40 % house edge vs. <Link to="/casinospil/blackjack/double-exposure-blackjack" className={linkClass}>Double Exposure's</Link> 0,69 %. Spanish 21 tilbyder også flere bonusser og variation. Men Double Exposure giver fuld information, hvilket appellerer til en anden spillertype. Begge kræver unik strategi.
      </>
    ),
...
                      <td className="py-2"><Link to="/casinospil/blackjack/double-exposure-blackjack" className={linkClass}>Double Exposure</Link></td>
                      <td className="text-center py-2">0,69 %</td>
                      <td className="text-center py-2">690 kr.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Forskellen mellem Spanish 21 S17 (0,38 %) og H17 (0,76 %) er 0,38 procentpoint – næsten dobbelt så stor som i standard blackjack (0,22 %). Over 10.000 hænder med 100 kr. indsats er forskellen 3.800 kr. – signifikant nok til at det bør være din primære udvælgelseskriterium. <strong>Vælg altid S17-borde i Spanish 21</strong> – det er den mest impactfulde beslutning du kan træffe.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Årlig perspektiv:</strong> En spiller der spiller 200 hænder/uge med 100 kr. indsats ved Spanish 21 S17 har et forventet årligt tab på 3.952 kr. – ca. 76 kr./uge. Ved H17 stiger det til 7.904 kr. – 152 kr./uge. Forskellen er over 4.000 kr./år. Det understreger endnu en gang den gyldne regel: <strong>reglerne bestemmer alt</strong>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Spanish 21 vs Pontoon ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            Spanish 21 vs. Pontoon – Samme Spil, Forskellige Navne?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Pontoon er den australske version af Spanish 21, og de to varianter er næsten identiske – men ikke helt. Hvis du møder "Pontoon" i et online casino, er her de vigtigste forskelle:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Spanish 21 (Nordamerika)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Hit = "Hit", Stand = "Stand"</li>
                  <li>• 6-8 decks typisk</li>
                  <li>• Super Bonus for 7-7-7 suited vs. dealer 7</li>
                  <li>• Double Down Rescue</li>
                  <li>• Dealerens kort synlige (ét åbent)</li>
                  <li>• House edge: 0,38-0,76 %</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pontoon (Australien/UK)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Hit = "Twist", Stand = "Stick"</li>
                  <li>• 8 decks typisk</li>
                  <li>• Five Card Charlie (5-kort ≤21 vinder automatisk)</li>
                  <li>• Ingen Double Down Rescue</li>
                  <li>• Begge dealerkort skjulte (!)</li>
                  <li>• House edge: 0,36-0,65 %</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Den mest markante forskel er, at Pontoon skjuler begge dealerkort (dealer disclosure-varianten er sjælden). Det gør Pontoon til en hybrid mellem <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>europæisk blackjack</Link> (no hole card) og Spanish 21's bonusregler. Strategisk er Pontoon lidt mere udfordrende, men house edge er marginalt lavere. Hvis du har valget, er begge varianter fremragende – vælg den du finder mest tilgængelig.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Bankroll og varians ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Calculator className="h-7 w-7 text-primary" />
            Bankroll og Varians i Spanish 21
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spanish 21's varians er lidt højere end standard blackjack pga. bonusudbetalinger og den hyppigere forekomst af multi-kort hænder. Standardafvigelsen pr. hånd er ca. 1,22 × indsatsen (vs. 1,14 i standard blackjack). Det betyder lidt større udsving – men også mere spænding.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Anbefalet bankroll:</strong> Pga. den marginalt højere varians anbefaler vi 120-150 enheder (vs. 100 for standard blackjack). Med 100 kr. indsats: 12.000-15.000 kr. session-bankroll. Det giver dig tilstrækkelig buffer til at absorbere downswings og udnytte bonusudbetalinger.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Session-simulering (S17, 200 hænder, 100 kr.):</strong> Forventet tab: 76 kr. 68 % konfidensinterval: -2.500 kr. til +2.350 kr. Sandsynlighed for profit: 46 %. Sammenligning med <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link>: 45,4 % sandsynlighed for profit (vs. 46,8 %). Forskellen er under 1 procentpoint – i praksis umærkelig i en enkelt session.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Bonusudbetalings-effekten:</strong> Ca. 1 ud af 100 sessioner vil en Spanish 21-spiller ramme en significant bonusudbetaling (5+ kort 21 eller 6-7-8). Disse sessioner kan løfte resultatet med 500-2.000 kr. – nok til at vende en tabende session til en vindende. Denne "lotteri-effekt" er en del af Spanish 21's design og tiltrækningskraft: grundspillet er lidt dyrere end standard, men potentialet for store enkeltubetalinger er højere.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Hvor spiller du live blackjack ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Timer className="h-7 w-7 text-primary" />
            Hvor Spiller Du Live Blackjack i Danmark?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spanish 21 som specifik variant er sjælden i live-format hos danske casinoer. Men de fire nedenstående casinoer tilbyder alle live blackjack med fremragende regler – og RNG Spanish 21 til dem der specifikt ønsker varianten:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Dansk-ejet casino med RNG Spanish Blackjack (Microgaming) og bredt live blackjack-udbud via Evolution. MobilePay-integration og dansk support.</p>
                <p className="text-sm text-muted-foreground"><strong>Spanish 21:</strong> RNG-version tilgængelig. Live: standard blackjack med hole card-regler.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Stort spilbibliotek med Microgaming Spanish Blackjack Gold. Bredt live-udbud inkl. Blackjack Party og VIP-borde.</p>
                <p className="text-sm text-muted-foreground"><strong>Spanish 21:</strong> RNG Gold-version med forbedret grafik. Live: standard + Infinite Blackjack.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Stærkt live casino med Speed Blackjack og VIP-borde. Udmærket mobiloplevelse og hurtige <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>-udbetalinger.</p>
                <p className="text-sm text-muted-foreground"><strong>Spanish 21:</strong> RNG tilgængelig via Play'n GO. Live: standard + Lightning Blackjack.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Pay N Play med instant registrering via Trustly. Speed Blackjack for tempo-fokuserede spillere. Ingen langvarig tilmeldingsproces.</p>
                <p className="text-sm text-muted-foreground"><strong>Spanish 21:</strong> Begrænset RNG-udbud. Live: standard + Speed Blackjack.</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Alle fire casinoer er licenseret af <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> og bruger <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gamings</Link> live-platform. Sammenlign <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link> og <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> i vores individuelle <Link to="/casino-anmeldelser" className={linkClass}>casino-anmeldelser</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Er Spanish 21 det rigtige valg? ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Flame className="h-7 w-7 text-primary" />
            Er Spanish 21 Den Rigtige Blackjack-Variant for Dig?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spanish 21 er ideel for erfarne blackjack-spillere, der søger variation og er villige til at lære en ny strategi. Bonusreglerne tilføjer et underholdningselement, som standard blackjack mangler – og "spiller-21 vinder altid"-reglen eliminerer en af de mest frustrerende oplevelser i casinospil.
          </p>
          <ul className="space-y-3 mb-6 ml-4">
            <li className="text-muted-foreground leading-relaxed">
              <strong>Vælg Spanish 21 hvis du:</strong> Har mestret <Link to="/casinospil/blackjack" className={linkClass}>standard basic strategy</Link> og vil have en ny udfordring. Nyder bonusgevinster og "jackpot-momenter" (7-7-7). Er villig til at studere en mere kompleks strategi. Spiller primært for underholdning og accepterer en marginalt højere house edge end optimal <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link>.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Undgå Spanish 21 hvis du:</strong> Optimerer rent for lavest mulig house edge (vælg <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk blackjack</Link> i stedet). Er nybegynder og endnu ikke behersker standard strategi. Kun kan finde H17-borde (0,76 % edge er for høj). Finder det ukomfortabelt at spille uden de 10'ere, du er vant til.
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Husk: den vigtigste blackjack-beslutning er stadig strategisk disciplin. En Spanish 21-spiller med perfekt strategi og 0,40 % house edge slår en standard-spiller med dårlig strategi og 2 % house edge. Lær strategien først – vælg variant bagefter. Alle varianter er dækket i vores <Link to="/casinospil/blackjack" className={linkClass}>hovedguide til blackjack</Link>.
          </p>
        </section>

        <CasinospilMoneyLinks gameName="Spanish 21" currentPath="/casinospil/blackjack/spanish-21" />
        <LatestNewsByCategory pagePath="/casinospil/blackjack/spanish-21" />
        <RelatedGuides currentPath="/casinospil/blackjack/spanish-21" />
        <FAQSection faqs={faqs} />
        <AuthorBio />
      </div>
      <StickyCtaBySlug slug="betinia" />
    </>
  );
};

export default Spanish21Guide;
