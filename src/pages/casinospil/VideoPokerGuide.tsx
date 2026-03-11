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
  BarChart3, Eye, Brain, BookOpen, AlertTriangle,
  TrendingUp, Target, Gamepad2, Shield, Calculator,
  Coins, Scale, Layers, Users, CheckCircle, XCircle,
  ShieldCheck, Shuffle, Award, Timer,
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
  {
    question: "Skal man altid spille max bet i video poker?",
    answer: "Ja, max bet er kritisk. Royal Flush betaler 250× ved 1-4 coins, men 800× ved 5 coins (max bet). Denne disproportionale bonus giver et ekstra 1,4 % i forventet tilbagebetaling. Hvis du ikke kan afford max bet, er det bedre at gå ned i denominering (f.eks. fra 1 kr. til 0,25 kr. coins) end at spille færre coins.",
  },
  {
    question: "Hvad er volatilitetsforskellen mellem video poker-varianter?",
    answer: "Jacks or Better har den laveste varians (standardafvigelse ~4,4 pr. hånd). Double Bonus og Double Double Bonus har markant højere varians (~5,8-6,3) pga. de forhøjede fire ens-udbetalinger. Deuces Wild ligger i midten (~4,8). Højere varians kræver en proportionelt større bankroll for at overleve downswings.",
  },
  {
    question: "Kan man bruge bonusser til video poker?",
    answer: "Ja, men vær opmærksom på spilbidragsprocenten. Mange casinobonusser tæller video poker kun med 10-20 % mod omsætningskravet (vs. 100 % for slots). Et 10x omsætningskrav på 1.000 kr. bonus bliver reelt 50x-100x omsætning, hvis video poker kun tæller 10-20 %. Tjek altid bonusvilkårene.",
  },
  {
    question: "Hvad er Expected Return og Expected Loss i video poker?",
    answer: "Expected Return er den procentdel af dine indsatser du forventer at få tilbage over tid (f.eks. 99,54 % for 9/6 JoB). Expected Loss er 100 % minus Expected Return, altså husets fordel (0,46 %). Over 10.000 kr. i indsatser forventer du at tabe 46 kr. med perfekt strategi på 9/6 JoB.",
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
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="55 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Video poker maskine der viser Jacks or Better med Royal Flush" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ═══════════════════════════════════════════════════════
            SEKTION 1 – Hvad er video poker & historisk kontekst
        ═══════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Hvad er video poker – og hvorfor er det casinoets bedst bevarede hemmelighed?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Video poker er et elektronisk casinospil baseret på five-card draw poker. Du modtager fem kort fra en standard 52-korts bunke (eller 53 med joker i visse varianter), vælger hvilke kort du vil beholde, og trækker nye kort for dem du kasserer. Din endelige 5-korts hånd evalueres mod en udbetalingstabel, og gevinsten udbetales automatisk. Det er essentielt et single-player poker-spil mod maskinen, uden bluffing, uden modstandere – ren matematik og beslutningskvalitet.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Video poker blev opfundet i midten af 1970'erne af Si Redd (grundlægger af IGT – International Game Technology) og blev hurtigt populært i Las Vegas i 1980'erne. Det revolutionerede casinoindustrien, fordi det kombinerede den sociale isolation, som mange spillere foretrak fra spilleautomater, med den strategiske dybde og lave husets fordel fra traditionelt poker. I dag er video poker en hjørnesten i både fysiske og online casinoer, og det er et af de eneste casinospil, hvor en informeret spiller kan reducere husets fordel til under 0,5 % – eller i sjældne tilfælde endda opnå en positiv forventet værdi.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Hvad gør video poker unikt?</strong> Tre fundamentale egenskaber adskiller video poker fra alle andre casinospil: 1) <em>Transparent matematik</em> – udbetalingstabellen er synlig, og <Link to="/ordbog/rtp" className={linkClass}>RTP</Link> kan beregnes præcist fra kortsandsynlighederne. I modsætning til spilleautomater, hvor RTP er programmeret og usynlig, ved du præcis hvad du får. 2) <em>Skill-komponent</em> – dine hold/discard-beslutninger påvirker direkte den opnåede RTP. En perfekt spiller på 9/6 Jacks or Better opnår 99,54 %, mens en gennemsnitlig spiller typisk opnår 97-98 % pga. suboptimale beslutninger. 3) <em>Matematisk verificerbar fairness</em> – hvert kort har en 1/52 sandsynlighed (eller 1/47 ved draw), og dette kan efterprøves statistisk over tid.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For danske spillere er video poker tilgængeligt hos de fleste <Link to="/casinoer" className={linkClass}>licenserede danske casinoer</Link>, primært via softwareudbydere som Microgaming, IGT og Betsoft. Udvalget varierer dog markant – nogle casinoer tilbyder 20+ varianter med forskellige udbetalingstabeller, mens andre kun har 2-3 standardversioner. Denne guide hjælper dig med at identificere de bedste spil og maksimere din tilbagebetaling uanset hvor du spiller.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SEKTION 2 – RTP-analyse og udbetalingstabeller
        ═══════════════════════════════════════════════════════ */}
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
          <p className="text-muted-foreground leading-relaxed mb-4">
            Udbetalingstabellen for Jacks or Better identificeres typisk ved Full House/Flush-udbetalingerne: 9/6 (99,54 % RTP), 9/5 (98,45 %), 8/6 (98,39 %), 8/5 (97,30 %), 7/5 (96,15 %), 6/5 (95,00 %). Bemærk at forskellen fra 9/6 til 8/5 – som lyder ubetydelig – faktisk er 2,24 procentpoint, svarende til at du mister 224 kr. ekstra pr. 10.000 kr. i indsatser. Over en session på 4 timer med 500 hænder á 25 kr. (12.500 kr. total action) er det forskellen mellem et forventet tab på 58 kr. og 338 kr.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Komplet RTP-sammenligning af populære varianter</h3>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Variant</th>
                      <th className="py-2 text-left font-semibold">Bedste tabel</th>
                      <th className="py-2 text-left font-semibold">RTP</th>
                      <th className="py-2 text-left font-semibold">Varians</th>
                      <th className="py-2 text-left font-semibold">Strategikompleksitet</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold">Deuces Wild NSUD</td><td className="py-2">25/15/9/5/3/2</td><td className="py-2 font-bold text-primary">100,76 %</td><td className="py-2">Middel</td><td className="py-2">Meget høj (32+ regler)</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Joker Poker (KoB)</td><td className="py-2">800/100/50/17/7/5/3/2/1</td><td className="py-2 font-bold text-primary">100,64 %</td><td className="py-2">Middel-Høj</td><td className="py-2">Høj</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Double Bonus 10/7</td><td className="py-2">10/7/5</td><td className="py-2 font-bold text-primary">100,17 %</td><td className="py-2">Høj</td><td className="py-2">Høj</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Bonus Poker Deluxe</td><td className="py-2">9/6</td><td className="py-2">99,64 %</td><td className="py-2">Lav-Middel</td><td className="py-2">Middel</td></tr>
                    <tr className="border-b bg-muted/30"><td className="py-2 font-bold">Jacks or Better 9/6</td><td className="py-2">9/6</td><td className="py-2 font-bold">99,54 %</td><td className="py-2">Lav</td><td className="py-2">Lav (30 regler)</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Bonus Poker 8/5</td><td className="py-2">8/5</td><td className="py-2">99,17 %</td><td className="py-2">Middel</td><td className="py-2">Middel</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Double Double Bonus</td><td className="py-2">9/6</td><td className="py-2">98,98 %</td><td className="py-2">Meget Høj</td><td className="py-2">Meget Høj</td></tr>
                    <tr><td className="py-2 font-semibold">Aces & Faces</td><td className="py-2">8/5</td><td className="py-2">99,26 %</td><td className="py-2">Middel</td><td className="py-2">Middel</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Tre varianter med positiv forventet værdi:</strong> Deuces Wild NSUD (100,76 %), Joker Poker Kings or Better (100,64 %) og Double Bonus 10/7 (100,17 %) er ekstraordinære, fordi de tilbyder en RTP over 100 % med perfekt strategi. Det betyder, at du har en matematisk fordel over casinoet – en situation der kun eksisterer i ganske få casinospil. Dog kræver alle tre varianter fejlfri strategi med 30-40+ beslutningsregler, og en betydelig del af tilbagebetalingen er bundet op i sjældne hænder (særligt Royal Flush og fire deuces), hvilket skaber højere kortsigtet varians.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For danske spillere er det vigtigt at bemærke, at mange online casinoer tilbyder reducerede udbetalingstabeller (f.eks. 8/5 eller 7/5 Jacks or Better). Disse ser næsten identiske ud med full-pay versionerne, men husets fordel kan være 2-4× højere. Det er en bevidst strategi fra casinoernes side: de fleste spillere tjekker aldrig udbetalingstabellen og bemærker ikke forskellen. Din første handling på ethvert nyt casino bør være at åbne video poker-spillet i demo-mode og verificere Full House/Flush-udbetalingerne.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SEKTION 3 – Varianter i dybden
        ═══════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-primary" />
            De vigtigste video poker-varianter – dybdegående analyse
          </h2>

          <h3 className="text-xl font-semibold text-foreground mb-3">Jacks or Better – den ubestridelige standard</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Jacks or Better er udgangspunktet for al video poker og den variant, alle nye spillere bør starte med. Minimumsgevinsten kræver et par knægte eller bedre, og spillet bruger en standard 52-korts bunke uden wild cards. Med 9/6 udbetalingstabellen er strategien relativt enkel med ca. 30 hold/discard-regler rangeret efter Expected Value (EV). Den lave varians (standardafvigelse ~4,42 pr. hånd ved max bet) gør det til det ideelle startsted.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Matematisk profil:</strong> Med perfekt strategi rammer du Royal Flush gennemsnitligt 1 gang pr. 40.391 hænder. Royal Flush-komponenten udgør ca. 2 % af den samlede tilbagebetaling – det lyder lille, men det er præcis den forskel der gør 9/6 JoB til et 99,54 %-spil frem for et 97,54 %-spil. Uden Royal Flush er den kortsigtede RTP ca. 97,5 %, hvilket betyder at du i korte sessioner systematisk vil underperforme den teoretiske RTP. Denne "Royal Flush-afhængighed" er den vigtigste faktor i video poker-bankroll management.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Håndsfrekvenser (9/6 JoB, perfekt strategi):</strong> Royal Flush: 0,0025 % (1:40.391). Straight Flush: 0,011 % (1:9.148). Four of a Kind: 0,024 % (1:4.165). Full House: 1,15 % (1:87). Flush: 1,10 % (1:91). Straight: 1,12 % (1:89). Three of a Kind: 7,44 % (1:13). Two Pair: 12,93 % (1:8). Jacks or Better: 21,46 % (1:5). No Win: 54,74 %. Disse tal viser, at du vinder ca. 45 % af alle hænder, men langt de fleste gevinster er break-even (par = 1:1 udbetaling, dvs. du får din indsats tilbage).
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Deuces Wild – den mest strategisk komplekse variant</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I Deuces Wild fungerer alle fire toere som wild cards, hvilket dramatisk ændrer håndrankings og strategi. Minimumsgevinsten er tre ens (fordi par og to par forekommer så hyppigt med wild cards at de mister værdi). Den optimale strategi for NSUD Deuces Wild indeholder over 32 undtagelsesregler og varierer drastisk baseret på antallet af deuces i din starthand.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Strategi baseret på antal deuces:</strong> Med 4 deuces (0,005 % af hænder): Hold altid alle fire – du har minimum four-of-a-kind. Med 3 deuces (0,07 %): Hold alle tre plus eventuel Wild Royal Flush-mulighed. Kasser aldrig en deuce. Med 2 deuces (1,56 %): Hold pat med four-of-a-kind eller bedre, ellers gå efter Royal Flush, derefter five-of-a-kind, derefter four-of-a-kind. Med 1 deuce (11,14 %): Prioriteringslisten ændres dramatisk – 4-til-Royal Flush trumfer alt, derefter made hands (straight eller bedre), derefter 4-til-straight-flush, osv. Med 0 deuces (87,23 %): Spil tættest på standard Jacks or Better-strategi, men med justerede EV-værdier fordi deuces ikke er tilgængelige som outs.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>NSUD-tabellens unikke egenskab:</strong> NSUD (Not So Ugly Ducks) betaler 9 for Straight Flush og 5 for Four of a Kind. Den mere udbredte "Full Pay" Deuces Wild betaler 9/5 men med en anderledes structure. NSUD-varianten er den profitable – men den er sjælden online. De fleste online Deuces Wild-maskiner kører "Not Full Pay"-tabeller med RTP på 96-98 %, hvilket eliminerer spillerfordelen. Tjek altid Five of a Kind (15x), Wild Royal (25x) og Four Deuces (200x) udbetalingerne for at identificere den korrekte tabel.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Joker Poker – wild card med strategisk twist</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Joker Poker bruger en 53-korts bunke (standard + 1 joker). Jokeren fungerer som wild card, og der er to hovedvarianter: Kings or Better (minimumsgevinst = par konger) med RTP op til 100,64 %, og Two Pair or Better (minimumsgevinst = to par) med RTP ca. 98,6 %. Kings or Better-versionen er den favorable, men den er uhyre sjælden online – de fleste casinoer tilbyder Two Pair-versionen eller reducerede tabeller.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Strategien for Joker Poker er enklere end Deuces Wild, da der kun er ét wild card. Med jokeren i hånden (7,5 % af tilfældene) prioriterer du: pat Royal Flush → pat five-of-a-kind → 4-til-Royal → pat straight flush → pat four-of-a-kind → 4-til-straight-flush → pat full house → osv. Uden jokeren spiller du en strategi der ligner JoB, men med den tilføjede mulighed for at jokeren kan dukke op i dine draw-kort.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Double Bonus og Double Double Bonus – jackpot-jægerens valg</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Disse varianter tilbyder forhøjede udbetalinger for specifikke fire ens-kombinationer: Fire Aces betaler 160× (vs. 25× i JoB), fire 2-4 betaler 80×, og standard fire ens betaler 50×. Den højere top-udbetaling kommer på bekostning af reducerede Two Pair-udbetalinger (1:1 i stedet for 2:1 i JoB), hvilket øger variansen dramatisk. Double Double Bonus tilføjer yderligere bonusser baseret på det femte kort (kickeren), f.eks. fire Aces med 2-4 kicker betaler 400×.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Varians-advarsel:</strong> Double Bonus og Double Double Bonus har standardafvigelser på 5,8-6,3 pr. hånd – ca. 35-45 % højere end Jacks or Better. I praksis betyder dette, at du kan opleve sessions med 500+ hænder, der afslutter med -50 % af din bankroll, selv med perfekt strategi. Disse varianter er kun egnede for spillere med tilstrækkelig bankroll (minimum 2.000× bet-størrelsen) og den psykologiske robusthed til at håndtere store swings. For de fleste danske spillere anbefaler vi Jacks or Better som primær variant.
          </p>
        </section>

        <InlineCasinoCards title="Populære video poker-casinoer" count={3} />

        {/* ═══════════════════════════════════════════════════════
            SEKTION 4 – Komplet optimal strategi for JoB 9/6
        ═══════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Optimal hold/discard-strategi – den komplette rangering
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den optimale strategi for 9/6 Jacks or Better kan komprimeres til en rangeret liste af hold-prioriteter. Når du modtager dine fem kort, finder du den højest rangerede hold-kombination og beholder de tilsvarende kort. Listen nedenfor dækker alle 30+ beslutninger med deres Expected Value (EV) pr. coin ved max bet.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Komplet strategisk rangering – 9/6 Jacks or Better
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p><strong>Tier 1 – Pat Hands (hold alle 5):</strong></p>
              <p>1. Royal Flush (EV: 800,00). 2. Straight Flush (EV: 50,00). 3. Four of a Kind (EV: 25,00). 4. Full House (EV: 9,00). 5. Flush (EV: 6,00). 6. Straight (EV: 4,00). 7. Three of a Kind (EV: 4,30 – kasser 2 og gå efter FH/quads).</p>
              <p><strong>Tier 2 – Stærke draws (hold 4 kort):</strong></p>
              <p>8. 4 til Royal Flush (EV: 18,66). 9. Two Pair (EV: 2,60). 10. High Pair (J-A) (EV: 1,54). 11. 4 til Straight Flush (EV: 1,28). 12. 3 til Royal Flush (EV: 1,29).</p>
              <p><strong>Tier 3 – Draws og marginale holds:</strong></p>
              <p>13. 4 til Flush (EV: 1,22). 14. Low Pair (2-10) (EV: 0,82). 15. 4 til open-ended Straight (EV: 0,68). 16. 3 til Straight Flush (open-ended) (EV: 0,63). 17. AKQJ unsuited (EV: 0,57). 18. 2 suited høje kort (EV: 0,56). 19. 4 til inside Straight med 3+ høje kort (EV: 0,53). 20. QJ suited (EV: 0,51).</p>
              <p><strong>Tier 4 – Marginale enkeltkortshold:</strong></p>
              <p>21. KQ, KJ unsuited (EV: 0,50). 22. Ace alene (EV: 0,48). 23. KT suited (EV: 0,47). 24. Jack, Queen eller King alene (EV: 0,47). 25. 4 til inside Straight med 1-2 høje kort (EV: 0,45). 26. 3 til Straight Flush (1 gap) (EV: 0,44).</p>
              <p><strong>Tier 5 – Sidste udvej:</strong></p>
              <p>27. Kasser alle 5 kort (EV: 0,36).</p>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold text-foreground mb-3">De 8 mest overraskende strategiske regler</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Flere af de optimale beslutninger strider mod intuitionen. Her er de mest counter-intuitive regler og matematikken bag dem:
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>1. Bryd et lavt par for 4-til-straight-flush:</strong> Med 6♠-7♠-8♠-9♠-6♦ bør du kassere 6♦ og gå efter straight flush. EV for 4-til-SF (1,28) overstiger EV for det lave par (0,82). Intuitivt føles det forkert at smide et sikkert par, men straight flush-potentialet (50×) plus flush (6×), straight (4×) og high card-muligheder gør drawet langt mere profitabelt.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>2. Med Q♥-J♥-T♥-9♦-8♣ hold QJT suited og kasser 9-8:</strong> Tre til Royal Flush (EV 1,29) slår den færdige straight (EV 4,00) – nej, vent. Her holder du faktisk straighten, fordi den er pat. Men med Q♥-J♥-T♥-K♦-3♣ holder du QJT suited (3-til-RF) frem for K alene. Royal Flush-muligheden dominerer næsten alt i video poker-strategi.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>3. Kasser en kicker ved par:</strong> Med A♠-J♣-J♦-7♥-3♠ holder du kun J-J og kasserer A, 7 og 3. Esset har ingen værdi som kicker – video poker belønner kun den endelige håndstyrke, ikke kortkomposition. EV for par J med tre nye kort (1,54) overstiger EV for par J + Ace hold med to nye kort.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>4. Med Kd-Qd-Jd-10d-Ah kasser esset:</strong> Denne er den mest spektakulære. Du har en færdig straight (A-K-Q-J-10, EV 4,00), men du kasserer esset for at gå efter Royal Flush i ruder (EV 18,66). Forskellen er massiv – 14,66 coins i EV. Situationen opstår ~1:650.000 hænder, men den illustrerer perfekt hvorfor Royal Flush-jagten dominerer al video poker-strategi.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>5. Lavt par vs. fire til flush:</strong> Med 6♠-6♦-A♥-K♥-Q♥ har du 4-til-flush (EV 1,22) mod lavt par (EV 0,82). Fire til flush vinder. Med 6♠-6♦-3♥-7♠-Q♥ (ikke fire til flush) holder du parret. Nøglen: 4-til-flush (1,22) slår lavt par (0,82) – altid.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>6. Hold aldrig tre til en straight (undtagen SF):</strong> Med 5-6-7-K-A har du tre til en straight, men EV (0,35) er lavere end at holde K alene (0,47) eller endda kassere alt (0,36). Tre til en straight (ikke flush) er næsten aldrig værd at holde.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>7. AKQJ unsuited: hold alle fire:</strong> Selvom du ikke har en made hand, er 4-til-inside-straight med fire høje kort (EV 0,57) bedre end at holde to eller tre høje kort. Du har 4 outs til straight (enhver T) plus muligheder for høje par.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>8. To suited høje kort slår to unsuited høje kort:</strong> Med K♥-Q♥-J♣-7♦-3♠ holder du K♥-Q♥ (suited, EV 0,56) fremfor K♥-Q♥-J♣ (tre høje kort, EV 0,50). Den ekstra flush-mulighed fra suited-ness kompenserer for det tabte tredje høje kort.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SEKTION 5 – Royal Flush-komponenten
        ═══════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Royal Flush – den skjulte motor bag video pokers RTP
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Royal Flush er det definerende element i video poker-matematik. Med 800× udbetaling ved max bet udgør den ca. 2 % af den totale tilbagebetaling i Jacks or Better – men den rammer kun gennemsnitligt 1 gang pr. 40.391 hænder. Denne sjældenhed skaber et fundamentalt dilemma for bankroll management.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Hvad betyder det i praksis?</strong> Antag du spiller 500 hænder pr. time (typisk online hastighed). Ved max bet á 5× 1 kr. (5 kr. pr. hånd) er din totale action 2.500 kr./time. Uden Royal Flush er din forventede RTP ca. 97,5 %, dvs. et forventet tab på 62,50 kr./time. Med Royal Flush inkluderet er din forventede RTP 99,54 %, dvs. et forventet tab på kun 11,50 kr./time. Men Royal Flush rammer gennemsnitligt 1 gang pr. 80 timer – og når den rammer, vinder du 4.000 kr. (800× 5 kr.).
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Cyklusanalyse:</strong> Over en fuld 40.391-hånds cyklus forventer du: Totale indsatser: 201.955 kr. Samlet tilbagebetaling: 200.987 kr. (99,54 %). Heraf Royal Flush: 4.000 kr. Heraf alle andre hænder: 196.987 kr. (97,54 %). Nettoresultat: -968 kr. (husets langsigtede fortjeneste). Men undervejs har du oplevet perioder med store negative swings (400-800 hænder uden betydelige gevinster) afbrudt af Royal Flush-boosts. Denne cykliske natur er grunden til, at video poker kræver en bankroll der kan absorbere de "tørre" perioder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Max bet er ufravigelig:</strong> Ved 1-4 coins betaler Royal Flush 250× – ved 5 coins (max bet) betaler den 800×. Denne disproportionale bonus er designet specifikt til at incentivere max bet og udgør ca. 1,4 % af den samlede RTP-forskel. Hvis du spiller 4 coins i stedet for 5, falder RTP fra 99,54 % til ca. 98,1 %. Det er den dyreste "besparelse" i hele casinoverdenen. Hvis du ikke kan afford max bet ved din nuværende denominering, gå ned i denominering (f.eks. fra 1 kr. til 0,25 kr. coins) og spil ALTID max bet.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SEKTION 6 – De 10 dyreste fejl
        ═══════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            De 10 dyreste fejl i video poker – og deres præcise omkostning
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Selv erfarne spillere laver systematiske fejl der kan koste procentpoint i RTP. Her er de mest udbredte fejl rangeret efter deres præcise indvirkning på langsigtet tilbagebetaling.
          </p>

          <div className="space-y-4 mb-6">
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 1: Spille reducerede udbetalingstabeller (2-4 % tab)</p>
                <p className="text-sm text-muted-foreground">Forskellen mellem 9/6 og 8/5 Jacks or Better er 2,24 procentpoint – svarende til 224 kr. ekstra tab pr. 10.000 kr. i indsatser. Over en sæson (100.000 hænder × 5 kr.) er det 11.200 kr. i unødvendigt tab. Tjek ALTID udbetalingstabellen før du spiller.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 2: Ikke at spille max bet (1,4 % tab)</p>
                <p className="text-sm text-muted-foreground">Royal Flush betaler 250× ved 1-4 coins men 800× ved max bet (5 coins). Ved ikke at spille max bet mister du 1,4 % i RTP – svarende til 140 kr. pr. 10.000 kr. Gå ned i denominering frem for at spille færre coins.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 3: Holde kicker ved par (0,3-0,5 % tab)</p>
                <p className="text-sm text-muted-foreground">Med J-J-A-7-3 holder mange spillere J-J-A. Esset har ingen strategisk værdi – video poker belønner håndrankering, ikke kortkomposition. Hold kun parret og kasser alt andet for at maksimere chancen for trips, full house og quads.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 4: Bryde to par for at jage flush/straight (0,3 % tab)</p>
                <p className="text-sm text-muted-foreground">To par har EV 2,60, som overstiger 4-til-flush (1,22) og 4-til-straight (0,68) markant. Bryd aldrig to par for et draw – det er en af de dyreste intuitive fejl.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 5: Holde tre til en straight (ikke flush) (0,1-0,2 % tab)</p>
                <p className="text-sm text-muted-foreground">Med 5-6-7-K-2 holder mange 5-6-7 (EV 0,35). Det er bedre at holde K alene (EV 0,47). Tre til en straight (ikke straight flush) er næsten aldrig korrekt at holde.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 6: Spille for hurtigt uden verifikation (variabel)</p>
                <p className="text-sm text-muted-foreground">Online video poker kan spilles med 500-800 hænder/time. Ved den hastighed stiger fejlraten eksponentielt. Sæt farten ned til 200-300 hænder/time og verificer hver beslutning mod strategitabellen, indtil reglerne er automatiserede.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 7: Aldrig kassere alle 5 kort (0,05-0,1 % tab)</p>
                <p className="text-sm text-muted-foreground">Med 3♠-5♦-7♣-9♥-2♠ (ingen draws, ingen høje kort) er det korrekte play at kassere alle fem kort (EV 0,36). Mange spillere holder instinktivt det "bedste" kort, men i dette tilfælde er intet kort værd at holde.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 8: Ikke forstå suited vs. unsuited forskellen (0,1 % tab)</p>
                <p className="text-sm text-muted-foreground">K♥-Q♥ (suited) har EV 0,56 vs. K♥-Q♣ (unsuited) med EV 0,50. Forskellen er 0,06 EV pr. hånd, hvilket akkumulerer over tusindvis af beslutninger. Prioriter altid suited kombinationer.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 9: Bryde flush for 4-til-RF (korrekt spil, men misforstået)</p>
                <p className="text-sm text-muted-foreground">Med en færdig flush der indeholder 4-til-Royal-Flush bør du faktisk bryde flushen! EV for 4-til-RF (18,66) overstiger en made flush (6,00) massivt. Mange spillere beholder flushen "for sikkerheds skyld" – det er en dyr fejl.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Fejl 10: Ignorere multi-hand volatilitetseffekten</p>
                <p className="text-sm text-muted-foreground">Multi-hand video poker (5, 10, 50 hænder) har samme RTP per hånd, men den totale indsats pr. runde er multipliceret. 10-hand á 5 kr. = 50 kr. pr. runde vs. single-hand á 5 kr. Dit bankroll-forbrug stiger 10× uden at din edge forbedres. Multi-hand kræver proportionelt større bankroll.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SEKTION 7 – Maskinvalg og online identifikation
        ═══════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Sådan vælger du den rigtige video poker-maskine online
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            På fysiske casinoer er maskinvalg relativt simpelt: tjek udbetalingstabellen øverst på skærmen. Online er det lidt mere komplekst, da mange platforme ikke umiddelbart viser den fulde udbetalingstabel. Her er en systematisk 6-trins tilgang til at finde de bedste video poker-spil på danske online casinoer.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Trin 1 – Filtrer spiltypen:</strong> I casinoets lobby, søg specifikt efter "Video Poker" eller "Bordspil". Nogle casinoer gemmer video poker under "Andre spil" eller blander det med slots, hvilket gør det svært at finde. <strong>Trin 2 – Åbn i demo-mode:</strong> Spil aldrig med rigtige penge før du har verificeret udbetalingstabellen. Demo-mode (gratis spil) viser den identiske udbetalingstabel som real-money-versionen. <strong>Trin 3 – Find Full House/Flush-tallene:</strong> For Jacks or Better, tjek udbetalingerne for Full House og Flush ved max bet. 9/6 er full pay (99,54 %), 8/5 er acceptabel (97,30 %), alt under 8/5 bør undgås.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Trin 4 – Verificér Deuces Wild-tabellen:</strong> For Deuces Wild, tjek: Four Deuces (200×?), Wild Royal (25×?), Five of a Kind (15×?), Straight Flush (9×?). Hvis nogen af disse er lavere, er det en reduceret tabel. <strong>Trin 5 – Tjek software-udbyderen:</strong> De bedste video poker-spil kommer typisk fra Microgaming (Game King-serien – branchens guldstandard), IGT (den klassiske arkade-oplevelse) og Betsoft (moderne interface med god UX). Play'n GO og NetEnt tilbyder også video poker, men med typisk lavere udbetalingstabeller. <strong>Trin 6 – Verificér RNG-certificering:</strong> Alle video poker-spil på <Link to="/casino-licenser" className={linkClass}>dansk licenserede casinoer</Link> er certificeret af uafhængige testlaboratorier (eCOGRA, iTech Labs, GLI) der verificerer at kortuddelingen er ægte tilfældig.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            De bedste danske casinoer for video poker inkluderer typisk platforme med bred Microgaming-integration. Tjek vores <Link to="/casinoer" className={linkClass}>casino-sammenligninger</Link> for aktuelle anbefalinger.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SEKTION 8 – Bankroll management
        ═══════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Bankroll management for video poker – overlev variansen
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bankroll management i video poker er fundamentalt anderledes end i spilleautomater, fordi du kender den præcise matematiske forventning. Dette giver dig mulighed for at beregne din Risk of Ruin (RoR) – sandsynligheden for at gå broke – med statistisk præcision.
          </p>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Bankroll-krav efter variant og risikoniveau
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Variant</th>
                      <th className="py-2 text-left font-semibold">RTP</th>
                      <th className="py-2 text-left font-semibold">SD/hånd</th>
                      <th className="py-2 text-left font-semibold">5 % RoR</th>
                      <th className="py-2 text-left font-semibold">1 % RoR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">JoB 9/6</td><td className="py-2">99,54 %</td><td className="py-2">4,42</td><td className="py-2">1.000× bet</td><td className="py-2">1.800× bet</td></tr>
                    <tr className="border-b"><td className="py-2">Deuces Wild NSUD</td><td className="py-2">100,76 %</td><td className="py-2">4,83</td><td className="py-2">700× bet</td><td className="py-2">1.200× bet</td></tr>
                    <tr className="border-b"><td className="py-2">Double Bonus 10/7</td><td className="py-2">100,17 %</td><td className="py-2">5,82</td><td className="py-2">1.500× bet</td><td className="py-2">2.500× bet</td></tr>
                    <tr><td className="py-2">DDB 9/6</td><td className="py-2">98,98 %</td><td className="py-2">6,31</td><td className="py-2">2.000× bet</td><td className="py-2">3.500× bet</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Eksempel:</strong> Du spiller 9/6 JoB med max bet á 5 kr. (5 coins × 1 kr.) og ønsker max 5 % sandsynlighed for ruin. Du behøver 1.000 × 5 kr. = 5.000 kr. bankroll dedikeret til video poker. Med denne bankroll kan du statistisk spille i det uendelige med kun 5 % chance for at gå broke. Ved 1 % RoR (mere konservativt) behøver du 9.000 kr. Disse tal forudsætter perfekt strategi – enhver strategisk fejl øger din RoR proportionelt.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Session bankroll vs. total bankroll:</strong> Det er vigtigt at skelne mellem din samlede video poker-bankroll og din session bankroll. En session bankroll er den maximale mængde du er villig til at tabe i én session – typisk 20-30 % af din totale bankroll. Eksempel: med 5.000 kr. total bankroll sætter du en session stop-loss på 1.000-1.500 kr. Hvis du taber dette beløb, stopper du for dagen. Denne disciplin forhindrer at en enkelt dårlig session ødelægger din langsigtede bankroll.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Dansk skattemæssig overvejelse:</strong> I Danmark er pokergevinster over 200 kr. pr. spil skattepligtige. For video poker kan Skat teknisk set betragte en session som et "spil", men praksis er uklar. Uanset fortolkning påvirker skat din effektive RTP. Konsultér en skatterådgiver, hvis du spiller regelmæssigt med significant omsætning, og læs mere om <Link to="/casinoer/casino-og-skat" className={linkClass}>casino og skat</Link>.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SEKTION 9 – EV-model: Hvad koster video poker pr. time?
        ═══════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Coins className="h-5 w-5 text-primary" />
            EV-model: Hvad koster video poker pr. time?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For at forstå den reelle omkostning ved at spille video poker skal vi beregne det forventede tab pr. time under forskellige scenarier. Denne beregning er præcis, fordi vi kender den eksakte RTP og kan estimere spilhastigheden.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-primary" />
                Forventet tab pr. time – 6 scenarier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Scenarie</th>
                      <th className="py-2 text-left font-semibold">Variant</th>
                      <th className="py-2 text-left font-semibold">Bet/hånd</th>
                      <th className="py-2 text-left font-semibold">Hænder/time</th>
                      <th className="py-2 text-left font-semibold">Action/time</th>
                      <th className="py-2 text-left font-semibold">Tab/time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">Begynder, online</td><td className="py-2">JoB 8/5</td><td className="py-2">5 kr.</td><td className="py-2">300</td><td className="py-2">1.500 kr.</td><td className="py-2">40,50 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">Optimal, online</td><td className="py-2">JoB 9/6</td><td className="py-2">5 kr.</td><td className="py-2">400</td><td className="py-2">2.000 kr.</td><td className="py-2">9,20 kr.</td></tr>
                    <tr className="border-b bg-muted/30"><td className="py-2 font-bold">Ekspert, online</td><td className="py-2 font-bold">DW NSUD</td><td className="py-2 font-bold">5 kr.</td><td className="py-2 font-bold">350</td><td className="py-2 font-bold">1.750 kr.</td><td className="py-2 font-bold text-primary">+13,30 kr.*</td></tr>
                    <tr className="border-b"><td className="py-2">Live casino</td><td className="py-2">JoB 9/6</td><td className="py-2">25 kr.</td><td className="py-2">200</td><td className="py-2">5.000 kr.</td><td className="py-2">23,00 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">Multi-hand (10)</td><td className="py-2">JoB 9/6</td><td className="py-2">50 kr.</td><td className="py-2">200</td><td className="py-2">10.000 kr.</td><td className="py-2">46,00 kr.</td></tr>
                    <tr><td className="py-2">Suboptimal strategi</td><td className="py-2">JoB 9/6</td><td className="py-2">5 kr.</td><td className="py-2">500</td><td className="py-2">2.500 kr.</td><td className="py-2">50,00 kr.**</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-3">* Positiv EV – ekspert vinder i gennemsnit 13,30 kr./time med perfekt Deuces Wild NSUD-strategi.</p>
              <p className="text-xs text-muted-foreground">** Antager 2 % strategifejl-overhead udover grundlæggende house edge.</p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Disse tal viser tydeligt, at video poker med korrekt spil er et af de billigste casinospil der eksisterer. En optimal spiller på 9/6 JoB betaler kun 9,20 kr./time for underholdningen – langt billigere end en biografbillet, en sportskamp eller endda mange streaming-abonnementer. Den absolutte nøgle er maskinvalg (9/6 vs. 8/5 fordobler næsten omkostningen) og strategikvalitet (suboptimalt spil kan femdoble den).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Sammenligning med andre casinospil:</strong> Blackjack med perfekt strategi koster ca. 15-25 kr./time (0,5 % × 3.000-5.000 kr. action). Roulette koster ca. 45-90 kr./time (2,7 % × 1.500-3.000 kr.). Spilleautomater koster typisk 50-150 kr./time (3-8 % × 500-2.000 kr. action). Video poker med optimal strategi (9,20 kr./time) er altså markant billigere end alle andre casinospil – og med de rigtige varianter (Deuces Wild NSUD) kan du faktisk tjene penge langsigtigt.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SEKTION 10 – Multi-hand analyse
        ═══════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Multi-hand video poker – fordele, ulemper og matematik
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Multi-hand video poker (3-hand, 5-hand, 10-hand, 25-hand, 50-hand og endda 100-hand) giver dig mulighed for at spille den samme starthand på flere borde samtidig. Du vælger dine holds på den primære hånd, og derefter trækkes unikke kort for hver af de øvrige hænder fra separate bunker. RTP'en pr. hånd er identisk med single-hand versionen.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Varianseffekten:</strong> Multi-hand reducerer varians for ikke-Royal-Flush-gevinster (du "glatter" resultaterne ud), men din totale eksponering stiger proportionelt. 10-hand á 1 kr. coins (50 kr. total bet/runde) har lavere pr.-hånd varians men 10× højere absolutte swings. For Royal Flush er effekten omvendt: i single-hand rammer du RF 1:40.391. I 10-hand rammer du mindst én RF ca. 1:4.039 runder – men du har også investeret 10× mere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Anbefaling:</strong> Multi-hand video poker er primært egnet for erfarne spillere der ønsker at øge deres volume (og dermed accelerere deres konvergens mod den teoretiske RTP) uden at øge spilhastighed. For begyndere anbefaler vi single-hand, da det giver mere tid til at tænke over hver beslutning og reducerer den absolutte bankroll-eksponering pr. session.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SEKTION 11 – Video poker vs. slots
        ═══════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Video poker vs. spilleautomater – den definitive sammenligning
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Mange spillere betragter video poker og spilleautomater som lignende spil, fordi de begge spilles på skærme i lignende kabinetter. Men de er fundamentalt forskellige i deres matematik, deres skill-komponent og deres langsigtede omkostning for spilleren.
          </p>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Parameter</th>
                      <th className="py-2 text-left font-semibold">Video Poker</th>
                      <th className="py-2 text-left font-semibold">Spilleautomater</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold">RTP (bedste)</td><td className="py-2 text-primary font-bold">99,54-100,76 %</td><td className="py-2">94-97 % (typisk)</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Skill-komponent</td><td className="py-2">Ja – 1-2 % forskel</td><td className="py-2">Nej</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">RTP synlighed</td><td className="py-2">Verificerbar fra udbetalingstabel</td><td className="py-2">Skjult, programmeret</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Varians</td><td className="py-2">Lav-Middel (SD 4,4-6,3)</td><td className="py-2">Meget variabel</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Maksimal gevinst</td><td className="py-2">800× (Royal Flush)</td><td className="py-2">Op til 50.000×+</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Forventet tab/time</td><td className="py-2">9-50 kr.</td><td className="py-2">50-300 kr.</td></tr>
                    <tr><td className="py-2 font-semibold">Underholdningsværdi</td><td className="py-2">Strategisk, cerebral</td><td className="py-2">Visuelt, emotionelt</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Valget mellem video poker og spilleautomater handler ultimativt om, hvad du søger: Hvis du vil minimere dit forventede tab og nyder strategisk tænkning, er video poker overlegen. Hvis du vil have underholdning med store jackpot-muligheder og visuelt spektakulære spil, passer <Link to="/casinospil/spilleautomater" className={linkClass}>spilleautomater</Link> bedre. Begge er legitime former for casinounderholdning – men din lommebok vil takke dig for at vælge video poker.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SEKTION 12 – Online vs. Live
        ═══════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Online video poker vs. fysisk casino – forskelle og fordele
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Online video poker og fysisk casino-video poker bruger identisk matematik, men der er praktiske forskelle der påvirker din spilstrategi og oplevelse.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Online fordele:</strong> 1) Hastighed – du kan spille 400-800 hænder/time vs. 200-300 på fysisk casino. 2) Bonusser – online casinoer tilbyder velkomstbonusser og loyalitetsprogrammer der kan øge din effektive RTP (dog med <Link to="/casino-bonus" className={linkClass}>omsætningskrav</Link>). 3) Tilgængelighed – spil 24/7 fra din sofa. 4) Demo-mode – øv din strategi gratis før du spiller med rigtige penge. 5) Lavere minimum-indsatser – online er typisk 0,25-1 kr./coin vs. 5-25 kr./coin på fysiske maskiner.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Fysisk casino fordele:</strong> 1) Atmosfære – den ægte casinooplevelse med lyde, lys og social interaktion. 2) Comp points – fysiske casinoer tilbyder ofte generøse loyalitetsprogrammer for video poker-spillere (drinks, måltider, hotelværelser). 3) Bedre udbetalingstabeller – paradoksalt nok tilbyder mange fysiske casinoer full-pay maskiner, fordi de bruger dem til at tiltrække kunder der også spiller andre (mere profitable) spil. 4) Ingen tekniske problemer – ingen risiko for tab af forbindelse eller softwarefejl midt i en session.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>For danske spillere:</strong> Danmark har ikke fysiske casinoer med stort video poker-udvalg, så online er det primære spillested. Fokusér på at finde casinoer med de bedste udbetalingstabeller og lav din research via demo-mode inden du committerer rigtige penge. Alle casinoer på vores <Link to="/casinoer" className={linkClass}>sammenligningsside</Link> er licenseret af Spillemyndigheden.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SEKTION 13 – Avanceret: Progressive jackpots
        ═══════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Progressive video poker – hvornår bliver jackpotten +EV?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Nogle video poker-maskiner har progressive jackpots, hvor Royal Flush-udbetalingen stiger med hver hånd der spilles uden Royal Flush. Disse jackpots kan nå niveauer, hvor spillet bliver positivt +EV – selv på maskiner med reducerede udbetalingstabeller.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Break-even beregning for JoB 8/5:</strong> Standard 8/5 JoB har 97,30 % RTP med 800× RF-udbetaling. For at nå 100 % RTP skal RF-udbetalingen stige med ca. 2,70 % / 0,0025 % (RF-frekvens) = 1.080 coins extra. Med max bet (5 coins) skal jackpotten altså nå 800 + 1.080 = 1.880 coins, eller 9.400 kr. ved 1 kr. denomination. Når jackpotten er over dette break-even punkt, har du en matematisk fordel.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Praktisk advarsel:</strong> Selvom en progressiv jackpot er +EV, har du stadig kun 1:40.391 chance for at ramme den pr. hånd. Med 400 hænder/time tager det gennemsnitligt ~100 timer at ramme RF. I mellemtiden taber du med den reducerede basis-RTP (97,30 % uden RF). Du behøver derfor en bankroll der kan absorbere ~100 timer × 40 kr./time = 4.000 kr. i forventede tab, før RF rammer og giver dig den massive jackpot. Progressive video poker er en langsigtet investering, ikke en kortsigtet gevinststrategi.
          </p>
        </section>

        <CasinospilMoneyLinks gameName="Video Poker" currentPath="/casinospil/poker/video-poker" />
        <LatestNewsByCategory pagePath="/casinospil/poker/video-poker" />
        <RelatedGuides currentPath="/casinospil/poker/video-poker" />
        <FAQSection faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="betinia" />
    </>
  );
}
