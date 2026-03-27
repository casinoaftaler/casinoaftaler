import { Link } from "react-router-dom";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import danskespilUltimateTexasHoldem from "@/assets/screenshots/danskespil-ultimate-texas-holdem.webp";
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
  Target,
  ShieldCheck,
  BarChart3,
  Sparkles,
  Zap,
  AlertTriangle,
  TrendingUp,
  Scale,
  Eye,
  Layers,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Coins,
  Brain,
  Gamepad2,
  BookOpen,
  Timer,
  Shield,
  Award,
  Shuffle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/texas-holdem-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er Texas Hold'em poker?",
    answer: (
      <>
        Texas Hold'em er verdens mest populære pokervariant, hvor hver spiller modtager to private kort (hole cards) og deler fem community cards med alle andre spillere. Målet er at lave den bedste 5-korts hånd ved at kombinere dine hole cards med community cards. Spillet har fire betting-runder: preflop, flop, turn og river. Du kan spille <Link to="/casinospil/poker" className={linkClass}>flere pokervarianter</Link> online hos danske casinoer.
      </>
    ),
  },
  {
    question: "Hvad er den bedste starthand i Texas Hold'em?",
    answer:
      "Pocket Aces (AA) er statistisk den stærkeste starthand med ca. 85 % vinderchance heads-up mod en tilfældig hånd. De fire bedste starthænder rangerer: AA (85,3 %), KK (82,4 %), QQ (79,9 %) og AKs (suited, 67,0 %). Dog vinder selv AA kun ca. 31 % af gangene mod 9 modstandere, hvilket understreger vigtigheden af positionsspil og post-flop strategi.",
  },
  {
    question: "Hvad er forskellen på No-Limit og Limit Hold'em?",
    answer:
      "I No-Limit Hold'em (NLHE) kan du satse hele din stack når som helst – det skaber dramatiske all-in situationer og belønner aggressivt spil. I Limit Hold'em er indsatserne faste: på de to første betting-runder er indsatsen lig small bet, og på turn/river fordobles den til big bet. Limit kræver mere tålmodighed og fokus på value betting, mens No-Limit belønner bluffs og positionsudnyttelse.",
  },
  {
    question: "Hvad er position i poker, og hvorfor er det vigtigt?",
    answer:
      "Position refererer til din placering ved bordet i forhold til dealerknappen. Spillere i 'sen position' (cutoff, button) handler sidst og har en enorm fordel: de kan observere andres handlinger, før de selv beslutter sig. Statistisk vinder spillere i sen position 55-65 % flere potter end spillere i tidlig position, fordi de har mere information til rådighed. Button (dealer) er den mest profitable position.",
  },
  {
    question: "Hvad er pot odds, og hvordan beregner man dem?",
    answer:
      "Pot odds er forholdet mellem den aktuelle pot-størrelse og den indsats, du skal betale for at fortsætte. Formlen er: pot odds = pot / indsats. Eksempel: potten er 300 kr., modstanderen satser 100 kr., nu er potten 400 kr. og du skal betale 100 kr. Dine pot odds er 400:100 = 4:1 (20 %). Hvis dine odds for at ramme din drawing hand er bedre end 20 %, er det profitable at calle.",
  },
  {
    question: "Kan man spille Texas Hold'em online med dansk licens?",
    answer: (
      <>
        Ja, flere danske licenserede casinoer tilbyder Texas Hold'em – primært som video poker og i <Link to="/live-casino" className={linkClass}>live casino</Link>-format (Casino Hold'em). Dedikerede pokerrum med cash games og turneringer er tilgængelige hos <Link to="/casino-anmeldelser/pokerstars" className={linkClass}>PokerStars</Link>, der har dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>.
      </>
    ),
  },
  {
    question: "Hvad er blinds i Texas Hold'em?",
    answer:
      "Blinds er tvungne indsatser, som to spillere skal poste før kortene deles ud. Small blind (SB) poster halvdelen af minimumsatsen og sidder umiddelbart til venstre for dealerknappen. Big blind (BB) poster den fulde minimumsindsats og sidder til venstre for SB. Blinds roterer med uret efter hver hånd, så alle spillere betaler dem ligeligt over tid. I turneringer stiger blinds periodisk for at fremtvinge handling.",
  },
  {
    question: "Hvad er de vigtigste fejl, nybegyndere laver i Texas Hold'em?",
    answer:
      "De tre hyppigste fejl er: 1) Spille for mange hænder – nybegyndere spiller ofte 40-50 % af hænder, mens professionelle spiller 15-25 %. 2) Ignorere position – de calle og raise uden at tage højde for, hvor de sidder i forhold til dealeren. 3) Manglende aggression – de checker og caller for meget i stedet for at raise og bette, hvilket giver modstanderne gratis information og trækker potterne ud.",
  },
  {
    question: "Hvor mange spillere kan deltage i Texas Hold'em?",
    answer:
      "Et standardbord rummer 2-10 spillere. De mest normale formater er: Heads-Up (2 spillere), 6-max/Shorthanded (op til 6 spillere) og Full Ring (9-10 spillere). Online er 6-max det dominerende format, da det skaber mere action og kortere ventetid. Turneringer kan have tusindvis af deltagere fordelt på mange borde.",
  },
  {
    question: "Hvad er implied odds i Texas Hold'em?",
    answer:
      "Implied odds er en udvidelse af pot odds, der medregner de penge, du forventer at vinde i fremtidige betting-runder, hvis du rammer din drawing hand. Eksempel: du har en flush draw (9 outs) på flop. Pot odds alene retfærdiggør ikke et call, men hvis du forventer, at modstanderen betaler dig 500 kr. ekstra på turn/river ved hit, kan de implied odds gøre dit call profitable. Det kræver erfaring at vurdere implied odds korrekt.",
  },
];

const TexasHoldemGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Texas Hold'em 2026 – Regler, Strategi & Håndrankering",
    description: "Komplet dansk guide til Texas Hold'em poker: regler, strategi, pot odds, positionsspil og starthands-rangering for begyndere og øvede.",
    url: `${SITE_URL}/casinospil/poker/texas-holdem`,
    datePublished: "2026-03-02",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Texas Hold'em 2026 – Regler, Strategi & Odds"
        description="Komplet dansk guide til Texas Hold'em poker med regler, starthands-rangering, pot odds, positionsspil og avanceret strategi for alle niveauer."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(220 60% 20%), hsl(240 50% 18%) 40%, hsl(200 70% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Texas Hold'em guide
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Texas Hold'em – Den Komplette Guide til Verdens Mest Populære Pokerspil
            </h1>
            <p className="text-lg text-white/80">
              Fra hole cards til river: lær regler, strategi, pot odds og positionsspil i dybden. Alt du behøver for at mestre Texas Hold'em.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="40 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Texas Hold'em pokerbord med community cards og chips i atmosfærisk casino-belysning" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 – Arketype B: Data First – Starthands-rangering
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            Starthands-Rangering: De 20 Bedste Hænder i Texas Hold'em
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ikke alle starthænder er skabt lige. Den vigtigste strategiske beslutning i Texas Hold'em kommer, før flopet overhovedet lægges: skal du spille din hånd eller folde? Statistisk set bør du folde 70-80 % af dine starthænder, især fra tidlig position. Nedenstående rangering er baseret på equity-beregninger fra milliarder af simulerede hænder og danner grundlaget for enhver seriøs pokerstrategi.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Premium Tier (Top 5) – Raise fra alle positioner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Rang</th>
                      <th className="py-2 text-left font-semibold">Hånd</th>
                      <th className="py-2 text-left font-semibold">Equity vs. Random</th>
                      <th className="py-2 text-left font-semibold">Anbefaling</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">1</td><td className="py-2 font-semibold">AA</td><td className="py-2">85,3 %</td><td className="py-2">Altid raise/re-raise</td></tr>
                    <tr className="border-b"><td className="py-2">2</td><td className="py-2 font-semibold">KK</td><td className="py-2">82,4 %</td><td className="py-2">Altid raise/re-raise</td></tr>
                    <tr className="border-b"><td className="py-2">3</td><td className="py-2 font-semibold">QQ</td><td className="py-2">79,9 %</td><td className="py-2">Raise, call 3-bet</td></tr>
                    <tr className="border-b"><td className="py-2">4</td><td className="py-2 font-semibold">AKs</td><td className="py-2">67,0 %</td><td className="py-2">Raise, call 3-bet</td></tr>
                    <tr><td className="py-2">5</td><td className="py-2 font-semibold">JJ</td><td className="py-2">77,5 %</td><td className="py-2">Raise, situationelt 4-bet</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Stærk Tier (6-12) – Raise fra mid/late position
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Rang</th>
                      <th className="py-2 text-left font-semibold">Hånd</th>
                      <th className="py-2 text-left font-semibold">Equity vs. Random</th>
                      <th className="py-2 text-left font-semibold">Anbefaling</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">6</td><td className="py-2 font-semibold">TT</td><td className="py-2">75,1 %</td><td className="py-2">Raise, fold til 4-bet</td></tr>
                    <tr className="border-b"><td className="py-2">7</td><td className="py-2 font-semibold">AKo</td><td className="py-2">65,4 %</td><td className="py-2">Raise, call 3-bet</td></tr>
                    <tr className="border-b"><td className="py-2">8</td><td className="py-2 font-semibold">AQs</td><td className="py-2">66,1 %</td><td className="py-2">Raise, call light 3-bet</td></tr>
                    <tr className="border-b"><td className="py-2">9</td><td className="py-2 font-semibold">99</td><td className="py-2">72,1 %</td><td className="py-2">Raise, set-mine mod 3-bet</td></tr>
                    <tr className="border-b"><td className="py-2">10</td><td className="py-2 font-semibold">AJs</td><td className="py-2">65,4 %</td><td className="py-2">Raise, fold til heavy 3-bet</td></tr>
                    <tr className="border-b"><td className="py-2">11</td><td className="py-2 font-semibold">KQs</td><td className="py-2">63,4 %</td><td className="py-2">Raise, situationelt call</td></tr>
                    <tr><td className="py-2">12</td><td className="py-2 font-semibold">88</td><td className="py-2">69,1 %</td><td className="py-2">Raise, set-mine</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Suited vs. offsuit:</strong> En suited hånd (begge kort i samme kulør) har typisk 2-4 procentpoint højere equity end sin offsuit-modpart. AKs vinder 67,0 % mod en tilfældig hånd, mens AKo vinder 65,4 %. Denne forskel skyldes flush-muligheden: du flopper en flush draw ca. 11 % af gangene med suited kort, og en færdig flush ca. 0,8 %. Over tusindvis af hænder akkumulerer denne lille fordel sig til en væsentlig EV-forskel.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Connectors og gaps:</strong> Connected cards (f.eks. 89s, JTs) har ekstra værdi pga. straight-muligheder. En suited connector som 89s rammer en straight eller straight draw på flopet ca. 12 % af gangene. Gappede hænder (f.eks. 79s) taber straight-outs og er progressivt svagere. Tommelfingerregel: én gap er acceptabel med suited kort fra sen position, to gaps er næsten altid et fold.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Denne rangering er et udgangspunkt – ikke et absolut system. Kontekst som position, modstandertype, stackstørrelse og turneringsstruktur påvirker alle, om en given hånd er profitabel at spille. En 77 fra cutoff i en aggressiv cash game kan være et stærkt raise, men et fold fra under the gun i en turneringens boblefase.
          </p>
        </section>

        <ReviewScreenshot
          src={danskespilUltimateTexasHoldem}
          alt="Ultimate Texas Hold'em bord hos Danske Spil med community cards og indsatsstruktur"
          caption="Ultimate Texas Hold'em hos Danske Spil – casino-versionen af Texas Hold'em med faste odds mod dealeren."
          size="full"
        />

        <InlineCasinoCards title="Casinoer med poker og live casino" count={4} />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 – Spillets opbygning og regler
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Texas Hold'em Regler – Trin for Trin
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Texas Hold'em er deceptivt simpelt i sine regler, men uendeligt komplekst i sin strategi. Et spil forløber over fire betting-runder, og hver spiller forsøger at lave den bedste 5-korts hånd fra syv tilgængelige kort (to hole cards + fem community cards). Her gennemgår vi hver fase i detaljer.
          </p>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Fase 1: Preflop
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Før nogen kort deles, poster small blind og big blind deres tvungne indsatser. Dealerknappen (button) bestemmer positionerne. Derefter modtager hver spiller to private kort (hole cards), som kun de selv kan se. Handling starter fra spilleren til venstre for big blind (Under The Gun / UTG) og bevæger sig med uret. Hver spiller kan folde (opgive), calle (matche big blind) eller raise (forhøje). Big blind har mulighed for at checke (ingen yderligere indsats) eller raise, hvis ingen har raiset.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Strategisk note:</strong> Preflop-beslutningen er fundamentet for al efterfølgende handling. En for bred preflopstrategi (spille for mange hænder) skaber svære post-flop situationer, hvor du ofte har den næstbedste hånd. Professionelle spillere tightener deres range fra tidlig position og åbner progressivt op mod knappen, fordi sen position giver dem informationsfordel gennem hele hånden.
          </p>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Fase 2: Flop
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tre community cards lægges åbent på bordet. Nu har spillerne fem kort til rådighed (to egne + tre fælles). Handling starter fra den første aktive spiller til venstre for dealerknappen. Spillere kan checke (videregive handling uden indsats), bette (placere en indsats), calle (matche en indsats), raise eller folde.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Floppet er det mest kritiske øjeblik i en Hold'em-hånd, fordi det afslører 71 % af dine endelige kort (5 af 7). Her skal du vurdere: har jeg ramt bordet? Har min modstander ramt bedre? Hvad er mine outs, hvis jeg har en draw? En god flop-strategi involverer continuation betting (c-bet) med ca. 60-70 % af din range, når du var preflop-aggressoren.
          </p>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Fase 3: Turn
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Et fjerde community card lægges. Nu er der seks kort tilgængelige (to egne + fire fælles). Indsatserne fordobles typisk i limit-formater, og i no-limit stiger potterne ofte dramatisk her. Turn-kortet ændrer ofte situationen radikalt: en flush draw rammer, et overcard dukker op, eller boardet parrer sig (hvilket muliggør full house).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Turn-strategi:</strong> Mange amatørspillere er for passive på turn. Hvis du c-bettede flopet med en stærk hånd, bør du typisk fortsætte med en bet på turn (double barrel) for at opbygge potten og nægte modstanderen korrekte odds til at chase. Omvendt, hvis du bluffede flopet og turn-kortet er dårligt for din range, er det ofte bedst at opgive (give up).
          </p>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Fase 4: River
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det femte og sidste community card lægges. Alle syv kort er nu tilgængelige, og du kender din endelige hånd. River-runden er den mest intense, da al usikkerhed fra draws er elimineret. Spillere skal enten bette for value (med stærke hænder), bluff-bette (med svage hænder der ikke kan vinde ved showdown), eller checke.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>River-beslutninger:</strong> Her skiller dygtige spillere sig fra amatører. Nøglen er at tænke i ranges: hvilke hænder ville din modstander spille på denne måde? Kan du value-bette thinly (med marginale hænder) mod modstandere, der caller for bredt? Eller bør du bluff-catche med hænder, der slår bluffs men taber mod value? River-spil er pokerens mest koncentrerede strategiske element.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 – Håndrankering
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Award className="h-7 w-7 text-primary" />
            Poker Håndrankering – Fra Royal Flush til High Card
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            At kende håndrankering er absolut grundlæggende for at spille Texas Hold'em. Her er alle ti poker-hænder rangeret fra stærkest til svageste, med sandsynligheder beregnet for en standard 52-korts bunke.
          </p>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Rang</th>
                      <th className="py-2 text-left font-semibold">Hånd</th>
                      <th className="py-2 text-left font-semibold">Beskrivelse</th>
                      <th className="py-2 text-left font-semibold">Sandsynlighed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">1</td><td className="py-2 font-semibold">Royal Flush</td><td className="py-2">A-K-Q-J-10 i samme kulør</td><td className="py-2">0,000154 %</td></tr>
                    <tr className="border-b"><td className="py-2">2</td><td className="py-2 font-semibold">Straight Flush</td><td className="py-2">5 kort i rækkefølge, samme kulør</td><td className="py-2">0,00139 %</td></tr>
                    <tr className="border-b"><td className="py-2">3</td><td className="py-2 font-semibold">Four of a Kind</td><td className="py-2">4 ens kort</td><td className="py-2">0,0240 %</td></tr>
                    <tr className="border-b"><td className="py-2">4</td><td className="py-2 font-semibold">Full House</td><td className="py-2">3 ens + 2 ens</td><td className="py-2">0,1441 %</td></tr>
                    <tr className="border-b"><td className="py-2">5</td><td className="py-2 font-semibold">Flush</td><td className="py-2">5 kort i samme kulør</td><td className="py-2">0,1965 %</td></tr>
                    <tr className="border-b"><td className="py-2">6</td><td className="py-2 font-semibold">Straight</td><td className="py-2">5 kort i rækkefølge</td><td className="py-2">0,3925 %</td></tr>
                    <tr className="border-b"><td className="py-2">7</td><td className="py-2 font-semibold">Three of a Kind</td><td className="py-2">3 ens kort</td><td className="py-2">2,1128 %</td></tr>
                    <tr className="border-b"><td className="py-2">8</td><td className="py-2 font-semibold">Two Pair</td><td className="py-2">2 par</td><td className="py-2">4,7539 %</td></tr>
                    <tr className="border-b"><td className="py-2">9</td><td className="py-2 font-semibold">One Pair</td><td className="py-2">1 par</td><td className="py-2">42,2569 %</td></tr>
                    <tr><td className="py-2">10</td><td className="py-2 font-semibold">High Card</td><td className="py-2">Intet af ovenstående</td><td className="py-2">50,1177 %</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Kicker-reglen:</strong> Når to spillere har den samme håndtype (f.eks. begge har et par esser), afgøres vinderen af kickeren – det højeste sidekort. Med A-A-K-9-4 vs. A-A-Q-J-8 vinder den første hånd, fordi kongen (kicker) slår damen. Denne regel er ekstremt vigtig i Hold'em, fordi mange hænder deler community cards. Det er også grunden til, at AK er en langt stærkere hånd end A7: kickeren gør hele forskellen.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Split pot:</strong> Hvis begge spillere har identiske 5-korts hænder, deles potten ligeligt. Dette sker oftere, end man tror – typisk 2-5 % af alle showdowns resulterer i en split pot, især når boardet har en stærk hånd (f.eks. fire til en straight), og ingen spiller kan forbedre den med deres hole cards.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 – Positionsspil
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            Positionsspil – Den Skjulte Superkraft i Hold'em
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvis der er ét koncept, der adskiller vindende fra tabende pokerspillere, er det forståelsen af position. Position er ikke bare "hvor du sidder" – det er din adgang til information. Jo senere du handler, jo mere ved du om modstandernes intentioner, og jo bedre beslutninger kan du træffe.
          </p>

          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  Tidlig Position (EP)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">UTG, UTG+1, UTG+2. Spil kun premium hænder (top 10-15 %). Du handler først post-flop og har mindst information. VPIP-mål: 12-18 %.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Scale className="h-4 w-4 text-primary" />
                  Mid Position (MP)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">MP, HJ (Hijack). Åbn range lidt op til top 20-25 %. Du har information fra EP-spillere, men CO og BTN sidder stadig bag dig. VPIP-mål: 18-24 %.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Sen Position (LP)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">CO (Cutoff), BTN (Button). Den mest profitable zone. Åbn med top 30-40 %. Du handler sidst post-flop og kan udnytte information maksimalt. VPIP-mål: 25-35 %.</p>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Button-fordelen i tal:</strong> Analyse af millioner af online hænder viser, at spilleren på button vinder gennemsnitligt 5-10 big blinds per 100 hænder, mens UTG-spilleren typisk taber 3-5 big blinds per 100 hænder. Denne forskel er enorm – det svarer til at spille med en permanent edge, bare fordi du handler sidst. Over 10.000 hænder (et typisk månedligt volumen for en semi-seriøs online spiller) er det forskellen mellem at vinde 500-1.000 big blinds og at tabe 300-500.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Blind-forsvar:</strong> Big blind er den mest tabende position, fordi du allerede har investeret penge og handler først post-flop. Dog skal du forsvare din blind bredt nok til at undgå, at modstanderne profiterer ved at raise bredt mod dig. En generel rettesnor er at forsvare 40-50 % af din range i big blind mod en standard open raise fra cutoff eller button.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Position interagerer også med koncepter som <strong>steal og re-steal</strong>: fra button kan du open-raise med hænder som K8s eller Q9s for at "stjæle" blinds, fordi du ved, at kun to spillere (SB og BB) har kort. Omvendt kan blindspillere re-raise (3-bet) som en bluff for at forsvare sig mod disse steals. Denne dynamik er et af de mest strategisk rige elementer i moderne Hold'em.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5 – Pot Odds og EV
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Coins className="h-7 w-7 text-primary" />
            Pot Odds, Outs og Expected Value (EV)
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Poker er i sin essens et matematisk spil. De bedste spillere træffer ikke beslutninger baseret på mavefornemmelse – de beregner odds og expected value (EV) for at maksimere deres langsigtede profit. Her gennemgår vi de tre bærende matematiske koncepter.
          </p>

          <h3 className="mb-3 text-xl font-bold">Outs – Dine Veje til at Forbedre</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Et "out" er et kort, der forbedrer din hånd til en sandsynlig vinder. Eksempler: med en flush draw (fire kort i samme kulør) har du 9 outs (13 kort i kuløren minus 4, du allerede kender). Med en open-ended straight draw har du 8 outs. Med et overpair mod en drawing hånd har du typisk 0 outs, men din modstander har mange.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Almindelige Draws og Deres Outs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Draw Type</th>
                      <th className="py-2 text-left font-semibold">Outs</th>
                      <th className="py-2 text-left font-semibold">Flop → Turn</th>
                      <th className="py-2 text-left font-semibold">Turn → River</th>
                      <th className="py-2 text-left font-semibold">Flop → River</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">Flush draw</td><td className="py-2">9</td><td className="py-2">19,1 %</td><td className="py-2">19,6 %</td><td className="py-2">35,0 %</td></tr>
                    <tr className="border-b"><td className="py-2">Open-ended straight</td><td className="py-2">8</td><td className="py-2">17,0 %</td><td className="py-2">17,4 %</td><td className="py-2">31,5 %</td></tr>
                    <tr className="border-b"><td className="py-2">Gutshot straight</td><td className="py-2">4</td><td className="py-2">8,5 %</td><td className="py-2">8,7 %</td><td className="py-2">16,5 %</td></tr>
                    <tr className="border-b"><td className="py-2">Flush + straight combo</td><td className="py-2">15</td><td className="py-2">31,9 %</td><td className="py-2">32,6 %</td><td className="py-2">54,1 %</td></tr>
                    <tr className="border-b"><td className="py-2">Two overcards</td><td className="py-2">6</td><td className="py-2">12,8 %</td><td className="py-2">13,0 %</td><td className="py-2">24,1 %</td></tr>
                    <tr><td className="py-2">Set (pocket pair)</td><td className="py-2">2</td><td className="py-2">4,3 %</td><td className="py-2">4,3 %</td><td className="py-2">8,4 %</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <h3 className="mb-3 text-xl font-bold">Hurtigberegning: Reglen om 2 og 4</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I stedet for at lave komplekse beregninger ved bordet kan du bruge <strong>"Reglen om 2 og 4"</strong>: Gang dine outs med 2 for at finde sandsynligheden for at ramme på næste kort, eller med 4 for at finde sandsynligheden for at ramme på flop til river. Eksempel: 9 outs × 4 = 36 % (tæt på de præcise 35 %). Denne tilnærmelse er nøjagtig nok til beslutninger ved bordet.
          </p>

          <h3 className="mb-3 text-xl font-bold">Expected Value (EV) – Det Vigtigste Begreb</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Expected Value er den gennemsnitlige gevinst eller tab for en beslutning over lang tid. EV = (vindsandsynlighed × gevinst) - (tabssandsynlighed × tab). En +EV-beslutning tjener penge over tid, en -EV-beslutning taber penge. Målet er at træffe så mange +EV-beslutninger som muligt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Praktisk eksempel:</strong> Du har en flush draw på turn. Potten er 500 kr., modstanderen bette 200 kr. Du skal betale 200 kr. for at se river. Dine pot odds er 700:200 = 3,5:1 (22,2 %). Din sandsynlighed for at ramme flush er 19,6 %. Da 19,6 % er mindre end 22,2 %, er dette et marginalt -EV call ud fra pot odds alene. Men hvis du forventer at vinde 300 kr. ekstra, når du rammer (implied odds), bliver det +EV: (0,196 × 1.000) - (0,804 × 200) = 196 - 160,8 = +35,2 kr. EV pr. call.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6 – Betting-strategi
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Betting-Strategi: Sizing, Bluffs og Value Bets
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Betting i poker handler ikke bare om at "sætte penge i potten" – det er et kommunikationsværktøj. Hver bet fortæller en historie om din hånd, og dygtige modstandere lytter til den historie. Lad os gennemgå de vigtigste betting-koncepter.
          </p>

          <h3 className="mb-3 text-xl font-bold">Bet Sizing</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Moderne pokerteori anbefaler at variere din bet sizing baseret på bordsituationen, ikke din hånds styrke. Typiske bet sizes: <strong>Preflop open raise:</strong> 2,5-3× big blind (i cash games), stigende til 4-5× i live poker. <strong>C-bet på flop:</strong> 33-75 % af potten, afhængigt af board-tekstur. Tørre boards (f.eks. K-7-2 rainbow) tillader mindre bets, fordi modstanderen sjældent har noget. Våde boards (f.eks. J-T-9 med to hjerter) kræver større bets for at beskytte din hånd mod draws.
          </p>

          <h3 className="mb-3 text-xl font-bold">Value Betting</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En value bet er en indsats med en hånd, der er stærkere end modstanderens calling range. Målet er at få betalt. Den største fejl, nybegyndere laver, er at undlade at value-bette – de checker river med top pair, fordi de er bange for at modstanderen har bedre. Men i virkeligheden er det mere profitable at bette og tabe af og til end at checke og misse value konsekvent.
          </p>

          <h3 className="mb-3 text-xl font-bold">Bluffing</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bluffing er at bette med en svag hånd for at få modstanderen til at folde en stærkere hånd. Effektive bluffs har tre nøglekarakteristika: 1) De fortæller en troværdig historie (din betting-linje er konsistent med en stærk hånd). 2) Modstanderen har en hånd, der kan folde (du kan ikke bluffe en calling station). 3) Du har <strong>equity-backup</strong> – dine bluffs bør helst have outs til at forbedre sig, hvis du bliver callt (semi-bluffs).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Bluff-to-value ratio:</strong> Game Theory Optimal (GTO) strategi anbefaler, at din river-range indeholder ca. 33 % bluffs og 67 % value bets, når du bruger en pot-sized bet. Dette gør dig unexploitable – modstanderen er indifferent mellem at calle og folde. I praksis bør du justere dette ratio baseret på modstandertype: bluf mere mod tight-passive spillere, og value-bet tynnere mod calling stations.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 7 – Turneringspoker
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Turneringspoker vs. Cash Game – Strategiske Forskelle
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Texas Hold'em spilles i to fundamentalt forskellige formater: <strong>cash games</strong> (ringspil) og <strong>turneringer</strong>. Selvom kortene og håndrankering er identiske, kræver de to formater radikalt forskellige strategier. Her gennemgår vi de vigtigste forskelle.
          </p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Coins className="h-4 w-4 text-primary" />
                  Cash Game
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Blinds er konstante</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Du kan købe ind igen når som helst</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Chips = direkte pengeværdi</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Fokus: maksimere EV pr. hånd</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Optimal strategi: chip EV (cEV)</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  Turnering
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><Zap className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Blinds stiger periodisk</li>
                  <li className="flex items-start gap-2"><Zap className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Elimination: du er ude, når chips er væk</li>
                  <li className="flex items-start gap-2"><Zap className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Chips ≠ pengeværdi (ICM)</li>
                  <li className="flex items-start gap-2"><Zap className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Fokus: overlevelse + chipaccumulation</li>
                  <li className="flex items-start gap-2"><Zap className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Optimal strategi: $EV (pengeværdi-EV)</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>ICM (Independent Chip Model):</strong> I turneringer har chips en aftagende marginalværdi – dine første 1.000 chips er mere værd end dine næste 1.000, fordi de sikrer din overlevelse. ICM-modellen beregner den reelle pengeværdi af din chipstack baseret på prisstrukturen. Dette betyder, at du i turneringer skal være mere konservativ tæt på "boblen" (det punkt, hvor alle resterende spillere er i pengene), fordi at busted ud lige før pengene koster dig mere i $EV end en identisk situation i en cash game.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hos <Link to="/casino-anmeldelser/pokerstars" className={linkClass}>PokerStars</Link>, der har dansk licens, kan du spille begge formater – fra mikrostakes cash games (0,01/0,02 kr.) til store turneringer med garanterede præmiepuljer. For nybegyndere anbefaler vi at starte med cash games, da det eliminerer turneringsvariansen og giver dig mulighed for at fokusere rent på at forbedre din pokerforståelse.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 8 – Online vs. Live
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gamepad2 className="h-7 w-7 text-primary" />
            Online Hold'em vs. Live Poker i Danmark
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            De to arenaer for Texas Hold'em – online og live – tilbyder vidt forskellige oplevelser. Begge har fordele og ulemper, og mange seriøse spillere veksler mellem dem. Her sammenligner vi de vigtigste aspekter for danske spillere.
          </p>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Aspekt</th>
                      <th className="py-2 text-left font-semibold">Online</th>
                      <th className="py-2 text-left font-semibold">Live</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold">Tempo</td><td className="py-2">60-100 hænder/time</td><td className="py-2">25-35 hænder/time</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Multi-tabling</td><td className="py-2">Op til 24 borde samtidig</td><td className="py-2">1 bord</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Tells</td><td className="py-2">Timing-baserede</td><td className="py-2">Fysiske + verbale</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Niveau</td><td className="py-2">Højere (sofistikerede)</td><td className="py-2">Lavere (mere rekreativt)</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Rake</td><td className="py-2">3-5 % (cap: 15-50 kr.)</td><td className="py-2">5-10 % (cap: 50-200 kr.)</td></tr>
                    <tr><td className="py-2 font-semibold">Social faktor</td><td className="py-2">Minimal</td><td className="py-2">Høj (netværk, samtaler)</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            I Danmark er online poker reguleret af <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>, og alle lovlige platforme har dansk licens. <Link to="/casino-anmeldelser/pokerstars" className={linkClass}>PokerStars</Link> er den dominerende online platform med det største spillerfelt, mens live poker primært spilles på Casino Copenhagen og Casino Marienlyst. Danske lovgivning tillader, at du spiller på alle EU-licenserede platforme, men skattefritaget er kun gevinster fra platforme med dansk licens.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Casino Hold'em i live casino:</strong> Udover traditionel poker tilbyder de fleste danske <Link to="/live-casino" className={linkClass}>live casinoer</Link> Casino Hold'em – en forenklet variant, hvor du spiller mod huset i stedet for andre spillere. Her er det ren <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> (ca. 2,16 %), og strategien er langt simplere: raise med ethvert par eller bedre, og fold med mindre end A-K high. Det er en god introduction til Hold'em-mekanikken, men mangler det strategiske dybde fra rigtig poker.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 9 – Bankroll Management
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Bankroll Management – Overlev Variansen
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Selv de bedste pokerspillere oplever lange tabende perioder (downswings). Bankroll management er det værn, der sikrer, at du overlever variansen og forbliver i spillet. Uden disciplineret bankroll management vil selv en vindende spiller risikere at gå broke.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Anbefalede Bankroll-Minimumskrav
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Format</th>
                      <th className="py-2 text-left font-semibold">Konservativ</th>
                      <th className="py-2 text-left font-semibold">Aggressiv</th>
                      <th className="py-2 text-left font-semibold">Eksempel (NL50)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">Cash game (NL)</td><td className="py-2">30 buy-ins</td><td className="py-2">20 buy-ins</td><td className="py-2">3.000-5.000 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">MTT (turneringer)</td><td className="py-2">100 buy-ins</td><td className="py-2">50 buy-ins</td><td className="py-2">5.000-10.000 kr.</td></tr>
                    <tr><td className="py-2">Sit & Go</td><td className="py-2">50 buy-ins</td><td className="py-2">30 buy-ins</td><td className="py-2">1.500-2.500 kr.</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Downswing-realiteter:</strong> En vindende cash game-spiller med en winrate på 5 bb/100 (hvilket er solidt) kan forvente downswings på 20-30 buy-ins over en karriere. I turneringer er det endnu mere ekstremt: selv top-professionelle kan gå 200-500 turneringer uden et stort cash. Det er variansens natur – og grunden til at bankroll management ikke er valgfrit.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Bevæg dig op og ned:</strong> En sund tilgang er at rykke op i stakes, når din bankroll tillader det (f.eks. 30 buy-ins til næste niveau), og rykke ned, hvis du taber (f.eks. under 20 buy-ins til dit nuværende niveau). Denne "stop-loss"-mekanisme sikrer, at du aldrig risikerer hele din bankroll på et niveau, der er for højt til din nuværende økonomi. Husk: det er <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> i praksis.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 10 – Avancerede koncepter
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Avancerede Koncepter: GTO, Exploitative Play og Range-Analyse
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Når du har mestret grundlæggende strategi, åbner en verden af avancerede koncepter sig. Moderne poker er kraftigt påvirket af Game Theory Optimal (GTO) strategi, der beregner den matematisk uangribelige spillestil. Men i praksis kombinerer de bedste spillere GTO med exploitative adjustments.
          </p>

          <h3 className="mb-3 text-xl font-bold">GTO vs. Exploitative Play</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>GTO (Game Theory Optimal):</strong> En spillestil, der er umulig at udnytte, uanset hvad modstanderen gør. GTO-strategien beregnes af solvere (computeralgoritmer) og danner baseline for korrekt spil. Dog er GTO ikke nødvendigvis den mest profitable strategi mod svage modstandere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Exploitative Play:</strong> En spillestil, der afviger fra GTO for at udnytte specifikke svagheder hos modstanderne. Eksempel: hvis din modstander folder 80 % til river-bets, bør du bluffe langt oftere end GTO foreskriver (33 %). Exploitative play er mere profitable mod svage modstandere, men gør dig selv sårbar over for modudnyttelse.
          </p>

          <h3 className="mb-3 text-xl font-bold">Range-Analyse</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I stedet for at gætte på en specifik hånd bør du tænke i <strong>ranges</strong> – det komplette sæt af hænder, som modstanderen kunne have baseret på deres handlinger. Eksempel: en tight-aggressive spiller, der raiser fra tidlig position, har en range på ca. AA-99, AKs-ATs, KQs, AKo-AQo. Når flopet kommer K-7-2, rammer denne range ofte (KK, AK, AA), og du bør være forsigtig.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Range-analyse er det, der transformerer poker fra "gæt og tjek" til "beregn og beslut". Jo bedre du er til at estimere modstanderens range, jo mere præcise bliver dine betting-beslutninger. Moderne pokersoftware som GTO Wizard og PioSOLVER træner dig i at tænke i ranges – og er standardværktøjer for alle seriøse spillere i 2026. Hvis du vil fordybe dig i andre <Link to="/casinospil/poker" className={linkClass}>pokervarianter</Link>, anbefaler vi også vores guides til <Link to="/casinospil/poker/omaha" className={linkClass}>Omaha</Link> og <Link to="/casinospil/poker/three-card-poker" className={linkClass}>Three Card Poker</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        <FAQSection faqs={faqs} />

        <Separator className="my-10" />

        <CasinospilMoneyLinks gameName="Texas Hold'em" currentPath="/casinospil/poker/texas-holdem" />
        <LatestNewsByCategory pagePath="/casinospil/poker/texas-holdem" />
        <RelatedGuides currentPath="/casinospil/poker/texas-holdem" />

        <Separator className="my-10" />

        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="campobet" />
    </>
  );
};

export default TexasHoldemGuide;
