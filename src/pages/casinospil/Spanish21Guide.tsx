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
        Ja, matematisk. Spanish 21 har 0,40 % house edge vs. <Link to="/casinospil/blackjack/double-exposure" className={linkClass}>Double Exposure's</Link> 0,69 %. Spanish 21 tilbyder også flere bonusser og variation. Men Double Exposure giver fuld information, hvilket appellerer til en anden spillertype. Begge kræver unik strategi.
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
        style={{ backgroundImage: "linear-gradient(135deg, hsl(220 60% 20%), hsl(240 50% 18%) 40%, hsl(200 70% 25%))" }}
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
              Den mest kreative blackjack-variant: fjernede 10-kort, unikke bonusudbetalinger og en strategi der udfordrer alt du ved.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="38 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Spanish 21 blackjack-bord med ornamenterede gulddekorationer" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ═══════════════ BONUS FIRST: Start med det der lokker ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-7 w-7 text-primary" />
            Bonusreglerne der Ændrer Alt i Blackjack
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spanish 21 er den eneste blackjack-variant, hvor <strong>du altid vinder med 21</strong> – uanset dealerens hånd. Har du 21 og dealeren også? Du vinder. Dealer-blackjack vs. din 21? Du vinder stadig. Denne regel alene ændrer hele spillets dynamik og er grunden til, at erfarne spillere elsker denne variant.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Men "spiller-21 vinder altid" er bare begyndelsen. Spanish 21 tilbyder et arsenal af bonusregler, som ingen anden blackjack-variant matcher. Disse regler er ikke blot dekorative – de er matematisk essentielle og udgør en betydelig del af din forventede værdi:
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
                  <li>• <strong>5-kort 21:</strong> betaler 3:2 (+0,08 % EV)</li>
                  <li>• <strong>6-kort 21:</strong> betaler 2:1 (+0,04 % EV)</li>
                  <li>• <strong>7+ kort 21:</strong> betaler 3:1 (+0,01 % EV)</li>
                  <li>• <strong>6-7-8 (mixed suits):</strong> betaler 3:2</li>
                  <li>• <strong>6-7-8 (suited):</strong> betaler 2:1</li>
                  <li>• <strong>6-7-8 (all spades):</strong> betaler 3:1</li>
                  <li>• <strong>7-7-7 (suited) vs. dealer 7:</strong> Super Bonus!</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="h-5 w-5 text-primary" />
                  Spillervenlige Regler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Spiller-21 vinder altid</strong> (+0,25 % EV)</li>
                  <li>• <strong>Spiller-BJ vinder altid</strong> (inkl. mod dealer-BJ)</li>
                  <li>• <strong>Late surrender efter double</strong> (+0,08 % EV)</li>
                  <li>• <strong>Re-split af esser</strong> tilladt (+0,05 % EV)</li>
                  <li>• <strong>Fordobling på ethvert antal kort</strong></li>
                  <li>• <strong>Hit og fordobl efter split af esser</strong></li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h3 className="mb-3 text-xl font-semibold">Super Bonus – Jackpotten i Spanish 21</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den mest eftertragede bonus i Spanish 21 er <strong>7-7-7 suited mod dealerens 7</strong>. Denne kombination betaler typisk en super bonus på 1.000-5.000 kr. (afhængigt af casinoet) PLUS alle andre spillere ved bordet modtager en "envy bonus" på 50 kr. Sandsynligheden er ekstremt lav – ca. 1 i 668.000 hænder med 8 decks – men det tilføjer en unik spændingsdimension.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>EV-beregning for Super Bonus:</strong> Med en sandsynlighed på 0,00015 % og en gennemsnitlig udbetaling på 3.000 kr. er den forventede værdi pr. hånd kun 0,0045 kr. (0,45 øre). Over 10.000 hænder: 45 kr. Det er negligibelt i EV-termer, men den psykologiske effekt – muligheden for en stor engangsgevinst – er en del af Spanish 21's tiltrækningskraft.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Total EV fra bonusregler:</strong> Alle bonusregler tilsammen bidrager med ca. 0,51 % til spillerens EV. Det er disse regler der kompenserer for de manglende 10'ere (som koster ca. 0,80 %) og bringer <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> ned til 0,40 % ved perfekt spil. Uden bonusreglerne ville Spanish 21 have en house edge på over 1,2 % – dyrere end standard blackjack.
          </p>
        </section>

        <InlineCasinoCards title="Casinoer med Spanish 21" count={3} />

        {/* ═══════════════ Hvad er Spanish 21 ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Eye className="h-7 w-7 text-primary" />
            Hvad er Spanish 21 – Historien og Mekanikken
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spanish 21 er den mest radikale mainstream-variant af <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>. Den tager det grundlæggende spil og vender det på hovedet ved at fjerne alle 48 kort med værdien 10 (men beholder knægte, damer og konger). Dette ene greb ændrer hele matematikken – og for at kompensere tilbyder spillet det bonusarsenal vi netop gennemgik.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Varianten blev opfundet i 1995 af Masque Publishing i samarbejde med den amerikanske spilleindustri og tog hurtigt fart i Las Vegas. Navnet refererer til den spanske kortbunke (baraja española), som traditionelt ikke indeholder 10'ere – et historisk kuriosum der blev omdannet til en spilmekanisk innovation. I dag er Spanish 21 en af de mest udbredte blackjack-varianter i fysiske casinoer i Nordamerika og Australien (hvor den hedder "Pontoon").
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det centrale spørgsmål: opvejer bonusreglerne tabet af 10'erne? Svaret er: næsten. Med perfekt strategi opnås en house edge på ca. 0,40 % – marginalt højere end <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>optimal amerikansk blackjack</Link> (0,28 %), men lavere end mange europæiske varianter. Problemet er, at perfekt Spanish 21-strategi er betydeligt mere kompleks end standard basic strategy – og spillere der bruger forkert strategi taber markant mere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Uden 10'erne falder sandsynligheden for naturlig blackjack fra 4,83 % til 3,65 %. Fordoblinger bliver svagere, fordi du sjældnere trækker et 10-kort ovenpå. Dealers bust-rate falder marginalt. Disse ændringer akkumuleres til en fordel for casinoet – som derefter delvist gives tilbage via bonusregler. Det er dette balancekunststykke der gør Spanish 21 til et af de mest veldesignede casinospil nogensinde.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ Kortbunkens anatomi ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            Kortbunkens Anatomi – Hvad Manglende 10'ere Betyder Matematisk
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at forstå Spanish 21's strategi skal du forstå, hvad der sker, når 48 kort (alle 10-værdikort) fjernes fra en 8-deck shoe. Det ændrer hele sandsynlighedsfordelingen:
          </p>
          <Card className="border-border bg-card my-6">
            <CardHeader>
              <CardTitle className="text-lg">Kortfordeling: Standard vs. Spanish 21 (8 decks)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Kortværdi</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Standard (416 kort)</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Spanish 21 (384 kort)</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Ændring</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">Es</td>
                      <td className="text-center py-2">32 (7,7 %)</td>
                      <td className="text-center py-2">32 (8,3 %)</td>
                      <td className="text-center py-2 text-primary">+0,6 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">2-9</td>
                      <td className="text-center py-2">256 (61,5 %)</td>
                      <td className="text-center py-2">256 (66,7 %)</td>
                      <td className="text-center py-2 text-primary">+5,2 %</td>
                    </tr>
                    <tr className="border-b border-border/50 bg-destructive/5">
                      <td className="py-2 font-medium text-foreground">10 (fjernet!)</td>
                      <td className="text-center py-2">32 (7,7 %)</td>
                      <td className="text-center py-2 text-destructive font-medium">0 (0 %)</td>
                      <td className="text-center py-2 text-destructive">-7,7 %</td>
                    </tr>
                    <tr>
                      <td className="py-2">J, Q, K</td>
                      <td className="text-center py-2">96 (23,1 %)</td>
                      <td className="text-center py-2">96 (25,0 %)</td>
                      <td className="text-center py-2 text-primary">+1,9 %</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Nøglekonsekvenser:</strong> 10-værdikort (10, J, Q, K) udgør normalt 30,8 % af bunken. I Spanish 21 udgør de kun 25 % – et fald på næsten 6 procentpoint. Det reducerer sandsynligheden for at trække et 10-værdikort med ca. 19 %. Konsekvenserne berører alle aspekter af spillet:
          </p>
          <ul className="space-y-3 mb-6 ml-4">
            <li className="text-muted-foreground leading-relaxed">
              <strong>Naturlig blackjack-rate:</strong> Falder fra 4,83 % til 3,65 % (-24 %). Det koster dig ca. 0,42 % i EV (kompenseret af "spiller-BJ vinder altid").
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Fordoblinger på 11:</strong> Chancen for at trække et 10-værdikort falder fra 30,8 % til 25,0 %. Det gør fordobling på 11 svagere, og du skal justere din strategi for hvornår du fordobler.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Dealer bust-rate:</strong> Falder marginalt, fordi dealeren oftere trækker lave kort (som forbedrer dealer-hånden). Det øger house edge med ca. 0,12 %.
            </li>
            <li className="text-muted-foreground leading-relaxed">
              <strong>Multi-kort 21:</strong> Stiger i hyppighed, fordi du oftere trækker lave kort der ikke buster dig. Det er derfor bonusudbetalinger for 5+, 6+, 7+ kort 21 er matematisk relevante – de kompenserer for de manglende 10'ere.
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Den samlede effekt af at fjerne 10'erne er ca. -0,80 % EV for spilleren. Bonusreglerne giver ca. +0,51 % tilbage, og grundspillets house edge bidrager med -0,11 %. Nettoresultatet er ca. 0,40 % house edge – elegant afbalanceret af spillets designere.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ De 15 vigtigste strategiafvigelser ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            De 15 Vigtigste Strategiafvigelser fra Standard Basic Strategy
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            At bruge standard <Link to="/casinospil/blackjack" className={linkClass}>blackjack basic strategy</Link> i Spanish 21 er en af de mest almindelige – og dyreste – fejl. Den fulde optimal strategi involverer over 200 afvigelser, men de 15 nedenfor dækker ca. 80 % af den strategiske forskel:
          </p>

          <h3 className="mb-3 text-xl font-semibold">Hard Totals – Vigtigste ændringer</h3>
          <Card className="border-border bg-card my-4">
            <CardContent className="pt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Din hånd</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Dealer</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Spanish 21</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Standard BJ</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Begrundelse</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">Hard 11</td>
                      <td className="text-center py-2">10</td>
                      <td className="text-center py-2 text-primary font-medium">Hit</td>
                      <td className="text-center py-2">Double</td>
                      <td className="text-center py-2 text-xs">Færre 10'ere = svagere double</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Hard 14-16</td>
                      <td className="text-center py-2">2-6</td>
                      <td className="text-center py-2 text-primary font-medium">Hit (oftere)</td>
                      <td className="text-center py-2">Stand</td>
                      <td className="text-center py-2 text-xs">Lavere bust-risiko</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Hard 10</td>
                      <td className="text-center py-2">Es</td>
                      <td className="text-center py-2 text-primary font-medium">Hit</td>
                      <td className="text-center py-2">Double</td>
                      <td className="text-center py-2 text-xs">10 mod Es = for risikabelt</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Hard 12</td>
                      <td className="text-center py-2">4-6</td>
                      <td className="text-center py-2 text-primary font-medium">Hit</td>
                      <td className="text-center py-2">Stand</td>
                      <td className="text-center py-2 text-xs">Bust-risiko lavere uden 10'ere</td>
                    </tr>
                    <tr>
                      <td className="py-2">4+ kort 15-16</td>
                      <td className="text-center py-2">Enhver</td>
                      <td className="text-center py-2 text-primary font-medium">Hit (jag 21)</td>
                      <td className="text-center py-2">Varierer</td>
                      <td className="text-center py-2 text-xs">5-kort 21 bonus (3:2)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Soft Totals og Splits</h3>
          <ul className="space-y-2 mb-6 ml-4 text-muted-foreground">
            <li>• <strong>Soft 17 (A+6):</strong> Hit altid – double kun mod 4-6 (standard siger double mod 3-6)</li>
            <li>• <strong>Soft 18 (A+7):</strong> Hit mod 9, 10, Es (identisk med standard, men mere aggressivt mod 8 i S21)</li>
            <li>• <strong>Soft 19 (A+8):</strong> Stand altid – ingen double (standard: double mod 6 hos nogle)</li>
            <li>• <strong>Esser:</strong> Split altid – inkl. re-split (unik regel i S21)</li>
            <li>• <strong>8'ere:</strong> Split mod 2-9, hit mod 10 og Es (mere konservativt end standard)</li>
            <li>• <strong>9'ere:</strong> Split mod 2-6 og 8-9 (identisk med standard)</li>
            <li>• <strong>6'ere:</strong> Hit altid – aldrig split (standard: split mod 2-6)</li>
            <li>• <strong>4'ere og 5'ere:</strong> Aldrig split (identisk med standard)</li>
          </ul>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Double Down Rescue – Hvornår du bruger den</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Double Down Rescue</strong> (surrender efter fordobling) er Spanish 21's mest unikke strategiske værktøj. Det lader dig redde halvdelen af din forhøjede indsats efter en mislykket fordobling. Eksempel: du fordobler 100 kr. til 200 kr. på hard 11 mod dealer 5. Du trækker et 3 (total: 14). I standard blackjack er du låst med 14 for 200 kr. – i Spanish 21 kan du "rescue" og kun miste 100 kr.
          </p>
          <ul className="space-y-2 mb-6 ml-4 text-muted-foreground">
            <li>• <strong>Brug rescue når:</strong> Din fordobling resulterede i en total under 17, og dealeren viser 7+</li>
            <li>• <strong>Undgå rescue når:</strong> Dealeren viser 2-6 (bust-zone), eller din total er 17+</li>
            <li>• <strong>EV-impact:</strong> Ca. +0,08 % over hele spillet – lille men gratis at udnytte</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Rescue-muligheden ændrer din fordoblingsfrekvens: fordi du har en exit-strategi, kan du fordoble i marginal-situationer, du normalt ville undgå. Det er en af de mest elegante regelmæssige innovationer i moderne blackjack-design.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ House Edge S17 vs H17 ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            House Edge Deep Dive – S17 vs. H17 og Regelkombinationer
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I Spanish 21 er forskellen mellem S17 (dealer stander på soft 17) og H17 (dealer hitter soft 17) næsten dobbelt så stor som i standard blackjack. Årsagen: de manglende 10'ere ændrer dealerens bust-sandsynligheder asymmetrisk, og H17-reglen udnytter denne asymmetri til casinoets fordel.
          </p>
          <Card className="border-border bg-card my-6">
            <CardHeader>
              <CardTitle className="text-lg">House Edge – Spanish 21 vs. Alle Varianter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Variant og Regler</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">House Edge</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Forventet tab/1.000 hænder (100 kr.)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50 bg-primary/5">
                      <td className="py-2 font-medium text-foreground">Spanish 21 (S17, 6-deck)</td>
                      <td className="text-center py-2 text-primary font-medium">0,38 %</td>
                      <td className="text-center py-2">380 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Spanish 21 (S17, 8-deck)</td>
                      <td className="text-center py-2">0,40 %</td>
                      <td className="text-center py-2">400 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 text-destructive">Spanish 21 (H17, 8-deck)</td>
                      <td className="text-center py-2 text-destructive">0,76 %</td>
                      <td className="text-center py-2">760 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2"><Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>Amerikansk BJ (S17, 6-deck)</Link></td>
                      <td className="text-center py-2">0,28 %</td>
                      <td className="text-center py-2">280 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2"><Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>Europæisk BJ (ENHC, 6-deck)</Link></td>
                      <td className="text-center py-2">0,39 %</td>
                      <td className="text-center py-2">390 kr.</td>
                    </tr>
                    <tr>
                      <td className="py-2"><Link to="/casinospil/blackjack/double-exposure" className={linkClass}>Double Exposure</Link></td>
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

        <RelatedGuides currentPath="/casinospil/blackjack/spanish-21" />
        <FAQSection faqs={faqs} />
        <AuthorBio />
      </div>
    </>
  );
};

export default Spanish21Guide;
