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
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import pokerstarsForside from "@/assets/screenshots/pokerstars-forside.webp";
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
  Cpu,
  Gauge,
  Crosshair,
  Calculator,
  Map,
  Flame,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/omaha-poker-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er Omaha poker?",
    answer: (
      <>
        Omaha er verdens næstmest populære pokervariant efter <Link to="/casinospil/poker/texas-holdem" className={linkClass}>Texas Hold'em</Link>. Hver spiller modtager fire hole cards (i stedet for to) og skal bruge præcis to af dem sammen med præcis tre af de fem community cards til at danne den bedste 5-korts hånd. Denne regel ("must use 2") er den afgørende forskel fra Hold'em og skaber en langt mere kompleks strategisk dynamik.
      </>
    ),
  },
  {
    question: "Hvad er forskellen mellem Omaha og Texas Hold'em?",
    answer:
      "Den primære forskel er antal hole cards (4 vs. 2) og reglen om, at du SKAL bruge præcis 2 af dine 4 hole cards. Dette skaber betydeligt stærkere hænder – sets, straights og flushes forekommer langt oftere i Omaha. En konsekvens er, at top pair alene sjældent er nok til at vinde i Omaha, mens det ofte holder i Hold'em. Variansen er også højere i Omaha, fordi hænderne ligger tættere i styrke.",
  },
  {
    question: "Hvad er Omaha Hi-Lo?",
    answer:
      "Omaha Hi-Lo (også kaldet Omaha 8-or-Better) er en split-pot variant, hvor potten deles mellem den bedste høje hånd og den bedste lave hånd. For at kvalificere til den lave halvdel skal du have fem kort, der alle er 8 eller lavere (esser tæller lavt). Den bedste lave hånd er A-2-3-4-5 (kaldet 'the wheel'). Hvis ingen spiller kvalificerer til lav, vinder den høje hånd hele potten.",
  },
  {
    question: "Hvad er den bedste starthand i Omaha?",
    answer:
      "AAKKds (to esser, to konger, dobbelt suited) betragtes som den stærkeste Omaha-starthand med ca. 33 % equity mod en tilfældig hånd i en 6-max pot. Andre premium hænder inkluderer AAJT ds, AAQQ ds og AAxx med suited aces. I Omaha er det vigtigt, at alle fire kort arbejder sammen – 'dangler' (et isoleret kort, der ikke connecter) reducerer håndens værdi markant.",
  },
  {
    question: "Kan man spille Omaha online med dansk licens?",
    answer: (
      <>
        Ja, <Link to="/casino-anmeldelser/pokerstars" className={linkClass}>PokerStars</Link> tilbyder Omaha cash games og turneringer under dansk licens. Desuden finder du Omaha-varianter i <Link to="/live-casino" className={linkClass}>live casino</Link>-format hos flere danske casinoer. PLO (Pot-Limit Omaha) er det dominerende format online.
      </>
    ),
  },
  {
    question: "Hvad betyder Pot-Limit i Omaha?",
    answer:
      "Pot-Limit Omaha (PLO) betyder, at det maksimale bet i enhver situation er størrelsen af den aktuelle pot. Formlen er: nuværende pot + alle bets i runden + det beløb du ville calle. Eksempel: potten er 200 kr., modstanderen better 100 kr. Max raise = 200 (pot) + 100 (bet) + 100 (dit call) = 400 kr. raise (til i alt 500 kr.). PLO er standardformatet, fordi No-Limit Omaha ville skabe for mange all-in situationer preflop.",
  },
  {
    question: "Hvorfor er position endnu vigtigere i Omaha end i Hold'em?",
    answer:
      "I Omaha er hænderne tættere i styrke, og der er flere draws i spil samtidig. Information er derfor endnu mere værdifuld. Fra position kan du kontrollere potstørrelsen, value-bette tynt med marginale hænder og undgå at bygge store potter out-of-position med vulnerable hænder. Statistisk set er winrate-forskellen mellem button og UTG endnu større i PLO end i NLHE.",
  },
  {
    question: "Hvad er wraps i Omaha?",
    answer:
      "En wrap er en straight draw med mange outs – typisk 13-20 kort, der giver dig en straight. Eksempel: du har 8-9-T-J, og flopet er 7-6-x. Enhver 3, 4, 5, 8, 9, T giver dig en straight – det er op til 20 outs. Wraps er unikke for Omaha (de eksisterer ikke i Hold'em) og er en af grundene til, at connected hænder er så værdifulde i denne variant.",
  },
  {
    question: "Er variansen højere i Omaha end i Hold'em?",
    answer:
      "Ja, markant. I Omaha har selv en stærk vindende spiller brug for en større bankroll, fordi equity-spreads er smallere. Preflop er den bedste Omaha-hånd ca. 33 % favorit mod en tilfældig hånd (vs. 85 % i Hold'em). Post-flop resulterer flere draws og re-draws i mere dramatiske swings. Typisk anbefales 50-100 buy-ins for PLO cash games, mod 20-30 for NLHE.",
  },
  {
    question: "Hvad er de vigtigste begynderfejl i Omaha?",
    answer:
      "De tre hyppigste fejl er: 1) Overvurdere AAxx uden sideconnectivity – bare fordi du har to esser, er det ikke automatisk en stærk hånd, hvis de øvrige to kort er ukoordinerede (f.eks. AA72 rainbow er svag). 2) Glemme 'must use 2'-reglen – mange Hold'em-spillere antager fejlagtigt, at de kan bruge ét eller tre hole cards. 3) Spille for mange hænder – i Omaha er det fristende at spille bredt, fordi 4 kort giver mere 'potentiale', men disciplin er nøglen.",
  },
  {
    question: "Hvad er 5-Card Omaha (PLO5)?",
    answer:
      "5-Card Omaha (PLO5) er en variant, hvor hver spiller modtager fem hole cards i stedet for fire. Du skal stadig bruge præcis to hole cards og tre community cards. Med fem kort stiger antallet af mulige kombinationer til C(5,2)=10 (mod C(4,2)=6 i PLO4), hvilket skaber endnu stærkere hænder og højere varians. PLO5 vokser hurtigt i popularitet online, men kræver en endnu større bankroll end PLO4.",
  },
  {
    question: "Hvad er blockers i Omaha, og hvorfor er de vigtige?",
    answer:
      "Blockers er kort i din hånd, der reducerer sandsynligheden for, at en modstander har en specifik hånd. Eksempel: hvis du holder A♠, blokerer du nut flush i spar – ingen modstander kan have A♠ som en af deres hole cards. I Omaha er blocker-spil endnu vigtigere end i Hold'em, fordi du har fire hole cards og dermed blokerer flere kombinationer. Avancerede PLO-spillere bruger blockers til at lave profitable bluffs og tynde value-bets.",
  },
];

const OmahaPokerGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Omaha Poker 2026 – Regler, Strategi & Hi-Lo Guide",
    description: "Komplet dansk guide til Omaha poker: PLO-regler, starthands-rangering, Hi-Lo split, wraps og avanceret strategi for danske spillere.",
    url: `${SITE_URL}/casinospil/poker/omaha`,
    datePublished: "2026-03-02",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Omaha Poker 2026 – Regler, PLO & Hi-Lo Strategi"
        description="Komplet dansk guide til Omaha poker med PLO-regler, Hi-Lo split, starthands-rangering, wraps og avanceret strategi for begyndere og øvede."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(220 60% 20%), hsl(240 50% 18%) 40%, hsl(200 70% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Omaha guide
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Omaha Poker – Fire Kort, Uendelig Strategi
            </h1>
            <p className="text-lg text-white/80">
              Fra PLO til Hi-Lo: lær regler, starthands-rangering, wraps og avanceret strategi i verdens mest actionfyldte pokervariant.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="45 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Omaha poker med fire hole cards på grøn filt i atmosfærisk casino-belysning" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 – Arketype A: Experience First
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Min Første Uge med PLO: Fra Hold'em til Omaha
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Som erfaren Hold'em-spiller troede jeg, at Omaha bare var "Hold'em med flere kort". Jeg tog fejl – og det kostede mig 15 buy-ins på min første uge. Her deler jeg mine erfaringer, fejltagelser og lektioner fra overgangen, så du kan undgå de samme fælder.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Dag 1-2 – "Must Use 2"-chokket:</strong> Min allerførste fejl var klassisk. Boardet viste fire hjerter, og jeg havde ét hjerte i min hånd. I Hold'em ville det være en flush – men i Omaha SKAL du bruge præcis to hole cards. Jeg havde ingen flush. Denne regel lyder simpel, men under tidspres og i en ny variant er den utrolig let at glemme. Jeg tænkte i Hold'em-baner og mistede 3 buy-ins, før det sad helt fast.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Dag 3-4 – Overvurdering af bare-aces:</strong> I Hold'em er pocket aces en monster. I Omaha er AA med to tilfældige, ukoordinerede sidekort (f.eks. AA-7-2 rainbow) en middelgod hånd. Grunden er, at dine fire kort skal arbejde sammen. AA-J-T double suited har fire kort, der alle connecter, og er langt stærkere end AA-9-3 offsuit. Jeg lærte dette den hårde vej: tre gange all-in preflop med bare-aces, tabte to af dem.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Dag 5-7 – Wraps og positionskontrol:</strong> Her begyndte tingene at klikke. Jeg indså, at Omaha handler om draws – specifikt om <strong>wraps</strong> (massive straight draws med 13-20 outs). En hånd som 8-9-T-J på et 7-6-x board giver dig op til 20 kort, der kompletterer en straight. Det er så mange outs, at du faktisk er favorit mod top pair. Og position? Endnu mere kritisk end i Hold'em, fordi potterne bliver store hurtigt i PLO.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Resultat efter uge 1:</strong> -15 buy-ins (ca. 7.500 kr. på PLO50). Men den vigtigste lektion var klar: Omaha er et fundamentalt andet spil end <Link to="/casinospil/poker/texas-holdem" className={linkClass}>Texas Hold'em</Link>. Det deler regler, men ikke strategi. Hvis du kommer fra Hold'em, skal du nulstille din tankegang og acceptere, at du er nybegynder igen.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Uge 2-4 – Genopbygning:</strong> Efter den brutale første uge droppede jeg ned til PLO10 og begyndte at studere systematisk. Jeg læste "Mastering Pot-Limit Omaha" af Herbert Lui og så timer af training-videoer. De vigtigste aha-oplevelser: (1) I PLO skal du altid tænke i nødder – den næstbedste flush er farlig. (2) Position er endnu mere værdifuld, fordi potterne vokser eksponentielt. (3) Tiltcontrol er afgørende, fordi bad beats forekommer langt oftere end i Hold'em. Efter fire uger var jeg break-even på PLO25 – en sejr i sig selv.
          </p>
        </section>


        <InlineCasinoCards title="Casinoer med Omaha og poker" count={4} />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 – Regler
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            Omaha Regler – Det Vigtigste du Skal Vide
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Omaha følger den samme grundstruktur som Texas Hold'em: preflop, flop, turn, river. Forskellen ligger i de fire hole cards og den obligatoriske "must use 2"-regel. Lad os gennemgå reglerne i detaljer.
          </p>
        <ReviewScreenshot
          src={pokerstarsForside}
          alt="PokerStars forside med Omaha Poker-turneringer og cash games tilgængelige for danske spillere"
          caption="PokerStars tilbyder et bredt udvalg af Omaha Poker-varianter inklusiv PLO og PLO Hi-Lo"
        />
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Kortuddelingen:</strong> Hver spiller modtager fire private kort (hole cards). Blinds og dealing fungerer identisk med Hold'em – small blind til venstre for button, big blind til venstre for small blind. Preflop-action starter fra UTG og bevæger sig med uret. I PLO er der ingen ante (medmindre det specifikt er angivet), og blind-strukturen er fast i cash games.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Must Use 2-reglen:</strong> Dette er Omahas definerende mekanik og den vigtigste regel for nye spillere at forstå. Du SKAL bruge <strong>præcis to</strong> af dine fire hole cards og <strong>præcis tre</strong> af de fem community cards til at danne din endelige 5-korts hånd. Du kan ikke bruge én, tre eller fire hole cards. Eksempel: boardet er A♠-K♠-Q♠-J♠-T♠ (en royal flush på boardet). Hvis du har 9♠-8♣-7♦-2♥, har du IKKE en flush – du har kun en straight (du bruger 9♠ og 8♣ for at lave Q-J-T-9-8). Denne regel overrasker selv erfarne Hold'em-spillere, fordi de er vant til frit at vælge mellem at bruge nul, en eller to hole cards.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Pot-Limit struktur:</strong> Omaha spilles næsten udelukkende som Pot-Limit (PLO). Det maksimale bet er størrelsen af den aktuelle pot inklusive din eventuelle call. Formlen: max raise = pot + alle bets i runden + dit call. No-Limit Omaha eksisterer, men spilles sjældent, fordi fire hole cards skaber for mange preflop all-in situationer, der reducerer spillet til en coin flip. Pot-Limit strukturen tvinger spillere til at tage post-flop beslutninger, hvilket gør spillet mere skill-baseret.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Betting-runder:</strong> Der er fire betting-runder, identiske med Hold'em: (1) <em>Preflop</em> – efter hole cards er delt, (2) <em>Flop</em> – efter tre community cards er vist, (3) <em>Turn</em> – efter fjerde community card, (4) <em>River</em> – efter femte og sidste community card. I hver runde kan spillere checke, bette, calle, raise eller folde. Den pot-limit struktur betyder, at potterne typisk vokser 3-5x per gade, og en preflop pot på 100 kr. nemt kan blive 5.000+ kr. på river.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Showdown:</strong> Ved showdown afslører alle aktive spillere deres kort, og den bedste 5-korts hånd vinder. Husk: du evaluerer ALLE mulige kombinationer af 2 hole cards + 3 community cards. Med fire hole cards og fem community cards har du i alt C(4,2) × C(5,3) = 6 × 10 = 60 mulige kombinationer at evaluere. Softwarebaserede spil gør dette automatisk, men i live poker er det vigtigt at kende din bedste hånd. En hyppig fejl i live PLO er at misreadne sin egen hånd – sørg for at dobbelttjekke, inden du vender dine kort.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 – Starthands
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            Starthands-Rangering i Omaha
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I Hold'em er der 169 unikke starthænder. I Omaha er der 270.725. Denne eksplosion af kombinationer gør starthand-selektion langt mere nuanceret. Nøglen er, at alle fire kort skal arbejde sammen – coordination er vigtigere end individuel kortstyrke.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Top 10 Omaha Starthænder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Rang</th>
                      <th className="py-2 text-left font-semibold">Hånd</th>
                      <th className="py-2 text-left font-semibold">Type</th>
                      <th className="py-2 text-left font-semibold">Equity (6-max)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">1</td><td className="py-2 font-semibold">AAKKds</td><td className="py-2">Pairs + broadways</td><td className="py-2">~33 %</td></tr>
                    <tr className="border-b"><td className="py-2">2</td><td className="py-2 font-semibold">AAJTds</td><td className="py-2">Aces + connectors</td><td className="py-2">~32 %</td></tr>
                    <tr className="border-b"><td className="py-2">3</td><td className="py-2 font-semibold">AAQQds</td><td className="py-2">Double paired</td><td className="py-2">~31 %</td></tr>
                    <tr className="border-b"><td className="py-2">4</td><td className="py-2 font-semibold">AAJT ss</td><td className="py-2">Aces + single suited</td><td className="py-2">~30 %</td></tr>
                    <tr className="border-b"><td className="py-2">5</td><td className="py-2 font-semibold">AAKQds</td><td className="py-2">Aces + broadways</td><td className="py-2">~30 %</td></tr>
                    <tr className="border-b"><td className="py-2">6</td><td className="py-2 font-semibold">KKQJ ds</td><td className="py-2">Kings + connectors</td><td className="py-2">~28 %</td></tr>
                    <tr className="border-b"><td className="py-2">7</td><td className="py-2 font-semibold">KKJTds</td><td className="py-2">Kings + connectors</td><td className="py-2">~27 %</td></tr>
                    <tr className="border-b"><td className="py-2">8</td><td className="py-2 font-semibold">JT98ds</td><td className="py-2">Rundown (connected)</td><td className="py-2">~26 %</td></tr>
                    <tr className="border-b"><td className="py-2">9</td><td className="py-2 font-semibold">T987ds</td><td className="py-2">Rundown</td><td className="py-2">~25 %</td></tr>
                    <tr><td className="py-2">10</td><td className="py-2 font-semibold">QJT9ds</td><td className="py-2">Rundown</td><td className="py-2">~25 %</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Coordination er alt:</strong> Bemærk at de bedste hænder alle har fire kort, der connecter via pairs, suited-ness eller connectivity. En "rundown" som JT98 (fire connected kort) er en stærk hånd, fordi den kan lave mange straights. Omvendt er AAxx med to lave, uconnected sidekort (f.eks. AA-7-2 rainbow) en trap – du har aces, men dine to andre kort hjælper sjældent.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Double suited (ds):</strong> At være double suited (to kort i én kulør, to i en anden) tilføjer markant equity, fordi du har mulighed for to forskellige flush draws. Single suited er stadig godt, mens rainbow (ingen suit-match) er den svageste konfiguration. Forskellen mellem ds og rainbow kan være 3-5 procentpoint i equity.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Danglers:</strong> Et kort, der ikke connecter med de tre øvrige, kaldes en "dangler". AAKK er fantastisk, men AAK7 har en dangler (7'eren). Denne dangler reducerer håndens samlede potentiale, fordi den sjældent bidrager til din endelige 5-korts hånd. I praksis: undgå hænder med to eller flere danglers.
          </p>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <Crosshair className="h-5 w-5 text-primary" />
            Positionsbaseret Starthands-Selektion
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I PLO er din position endnu mere kritisk end i Hold'em for at bestemme, hvilke hænder du kan åbne med. Her er en detaljeret guide til, hvad du kan spille fra hver position i en 6-max PLO-pot:
          </p>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Position</th>
                      <th className="py-2 text-left font-semibold">VPIP %</th>
                      <th className="py-2 text-left font-semibold">Håndstyper</th>
                      <th className="py-2 text-left font-semibold">Eksempler</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold">UTG</td><td className="py-2">15-18 %</td><td className="py-2">Premium pairs, top rundowns ds</td><td className="py-2">AAKK, AAJT ds, KKQJ ds</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">HJ</td><td className="py-2">18-22 %</td><td className="py-2">+ medium rundowns ds</td><td className="py-2">JT98 ds, QJT9 ds</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">CO</td><td className="py-2">25-30 %</td><td className="py-2">+ suited aces, gapped rundowns</td><td className="py-2">A♠x♠xx, T987 ss</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">BTN</td><td className="py-2">35-45 %</td><td className="py-2">+ single suited, medium pairs</td><td className="py-2">9876 ss, KQJ9 ss</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">SB</td><td className="py-2">25-30 %</td><td className="py-2">Stram – ingen positionsfordel</td><td className="py-2">Premium + top rundowns</td></tr>
                    <tr><td className="py-2 font-semibold">BB</td><td className="py-2">Defend 40-50 %</td><td className="py-2">Bred defensivt, men fold danglers</td><td className="py-2">Afhænger af raise-størrelse</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Nøglepunktet:</strong> Fra UTG spiller du kun de øverste 15-18 % af hænder, mens du fra button kan åbne op til 45 %. Denne forskel er endnu større end i Hold'em, fordi PLO's pot-limit struktur gør out-of-position spil ekstra dyrt. Når du raiser fra UTG og bliver called af button, vil du spille resten af hånden out-of-position i en opsvulmet pot – det er en strukturel ulempe, som kun de stærkeste hænder kan overvinde.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 – Wraps og draws
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shuffle className="h-7 w-7 text-primary" />
            Wraps – Omahas Unikke Superpower
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En wrap er en straight draw, der kun eksisterer i Omaha – den opstår, når dine fire hole cards omslutter community cards og skaber en massiv straight draw med 13-20 outs. Wraps er det mest actionfyldte element i PLO og grunden til, at Omaha-potter ofte bliver gigantiske post-flop.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Wrap-Typer og Outs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Type</th>
                      <th className="py-2 text-left font-semibold">Eksempel</th>
                      <th className="py-2 text-left font-semibold">Board</th>
                      <th className="py-2 text-left font-semibold">Outs</th>
                      <th className="py-2 text-left font-semibold">Hit %</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">20-out wrap</td><td className="py-2">9-8-6-5</td><td className="py-2">7-x-x</td><td className="py-2">20</td><td className="py-2">~70 % (flop→river)</td></tr>
                    <tr className="border-b"><td className="py-2">17-out wrap</td><td className="py-2">J-T-8-7</td><td className="py-2">9-x-x</td><td className="py-2">17</td><td className="py-2">~62 %</td></tr>
                    <tr className="border-b"><td className="py-2">13-out wrap</td><td className="py-2">T-9-7-6</td><td className="py-2">8-x-x</td><td className="py-2">13</td><td className="py-2">~51 %</td></tr>
                    <tr><td className="py-2">Standard OESD</td><td className="py-2">T-9-x-x</td><td className="py-2">8-7-x</td><td className="py-2">8</td><td className="py-2">~32 %</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            En 20-out wrap er faktisk <strong>favorit</strong> mod top set (kun 10 outs til full house/quads). Det er den mest kontraintuitive realitet i Omaha: du kan stå med den "bedste hånd" (top set) og stadig være underdog mod en stor wrap + flush draw-kombination. Denne dynamik er grunden til, at position og potkontrol er endnu vigtigere i PLO end i Hold'em.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Blockers og wrap-læsning:</strong> Et avanceret koncept er at tælle, hvilke outs der er "blokeret" af dine egne kort. Hvis du har T-9-8-7 og boardet viser 6-5-x, har du en 20-out wrap – men hvis du også har en af 4'erne i din hånd, mister du en out. At tælle blokerede outs i realtid er det, der adskiller professionelle PLO-spillere fra amatører.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Wrap + flush draw-komboer:</strong> De mest profitable situationer i PLO opstår, når du har en wrap OG en flush draw samtidig. Eksempel: du holder J♠-T♠-8♣-7♣ og boardet viser 9♠-6♠-2♦. Du har en 17-out wrap (enhver 5, 7, 8, T, J, Q giver en straight) OG en nut flush draw i spar (9 yderligere outs). Samlet: ~26 outs, der giver en straight eller flush. Det er ~78 % sandsynlighed for at ramme fra flop til river – du er massiv favorit mod næsten enhver made hand. Disse "monster draws" er grunden til, at connected + suited hænder er så værdifulde i PLO.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Re-draws og backdoor equity:</strong> I PLO er det ikke nok bare at ramme en straight – du skal tænke på, om din straight kan blive slået af en bedre straight eller en flush på næste gade. Når du rammer en straight med non-nut kort, og boardet har en mulig flush draw, er din equity langt lavere end tallene ovenfor antyder. Avancerede PLO-spillere evaluerer altid deres "nut outs" separat fra deres "non-nut outs" for at undgå at overcommitte med den næstbedste hånd.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5 – Hi-Lo
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            Omaha Hi-Lo (8-or-Better) – Split Pot Strategi
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Omaha Hi-Lo er en splitpot-variant, hvor den bedste høje hånd og den bedste lave hånd deler potten. Denne ekstra dimension tilføjer enorm strategisk kompleksitet – din ideelle situation er at "scoop" (vinde begge halvdele), hvilket kræver hænder med potentiale i begge retninger.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Lav hånd-kvalifikation:</strong> For at kvalificere til den lave halvdel skal du have fem kort, der alle er 8 eller lavere. Straights og flushes tæller ikke imod dig for den lave hånd – A-2-3-4-5 er den bedste lave hånd OG en straight (den vinder ofte begge halvdele). Esser tæller som lave kort. Den lave hånd evalueres fra højeste kort og nedad: 8-7-6-5-4 taber mod 8-6-5-4-3.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Scooping er nøglen:</strong> At vinde kun halvdelen af potten er marginalt profitable i bedste fald – efter rake og multi-player-pots kan det endda være -EV. Hele strategien i Hi-Lo handler om at maksimere dine scoop-muligheder. Premium starthænder inkluderer AA23 ds (stærk for begge halvdele), A2xx med suited ace, og hænder der dækker bredt som A234 suited.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>"Quartered":</strong> Hvis to spillere har den samme lave hånd, deles den lave halvdel yderligere (du får kun 25 % af potten). At blive "quartered" er en af de mest frustrerende oplevelser i poker – og grunden til, at du bør undgå "bare low"-hænder (hænder der kun kan vinde den lave halvdel uden high-potentiale).
          </p>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Hi-Lo Starthands-Tiers
          </h3>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Tier</th>
                      <th className="py-2 text-left font-semibold">Håndstyper</th>
                      <th className="py-2 text-left font-semibold">Eksempler</th>
                      <th className="py-2 text-left font-semibold">Scoop-potentiale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold">Tier 1</td><td className="py-2">AA + nut low cards, ds</td><td className="py-2">AA23 ds, AA24 ds</td><td className="py-2">Meget højt</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Tier 2</td><td className="py-2">A2 + high connectivity</td><td className="py-2">A2KK ds, A2QJ ss</td><td className="py-2">Højt</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Tier 3</td><td className="py-2">A3 + coordination, A2 rainbow</td><td className="py-2">A3KQ ds, A245 ss</td><td className="py-2">Moderat</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Tier 4</td><td className="py-2">High-only premium</td><td className="py-2">AAKK ds, KKQJ ds</td><td className="py-2">Kun high (½ pot)</td></tr>
                    <tr><td className="py-2 font-semibold">Undgå</td><td className="py-2">Bare-low, middle cards</td><td className="py-2">2345 rw, 6789 rw</td><td className="py-2">Minimalt</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Hi-Lo nøgleregel:</strong> Hænder der kan vinde begge halvdele er eksponentielt mere værdifulde end hænder, der kun kan vinde én halvdel. AA23 ds kan lave nut flush (high), nut straight (high og low), og nut low – det er den ultimative scoop-hånd. Omvendt er 2345 rainbow en fælde: den kan kun vinde den lave halvdel, og selv da risikerer du at blive quartered. Disciplinen til kun at spille hænder med scoop-potentiale er den vigtigste færdighed i Hi-Lo.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6 – Post-flop strategi
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Post-Flop Strategi i PLO
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Omaha er et post-flop spil. Preflop equities er tætte (selv den bedste hånd er kun ~33 % favorit mod random), hvilket betyder, at de fleste EV-beslutninger kommer efter flopet. Her gennemgår vi de centrale post-flop koncepter.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Nut-orientering:</strong> I PLO er den vigtigste tommelfingerregel: <em>spil med nødderne</em>. Fordi der er så mange draws i spil (fire hole cards × multiple spillere), er det farligt at commitere sig med den næstbedste hånd. Top pair er sjældent nok – du vil have top set, nut flush draw eller nut straight draw. At chasing med non-nut draws (f.eks. den tredjebedste flush draw) er en af de mest costly fejl i PLO.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Potkontrol:</strong> I PLO eskalerer potter hurtigt pga. pot-limit-strukturen. En pot-sized bet preflop, efterfulgt af en pot-sized c-bet på flopet, og en pot-sized bet på turn, kan nemt resultere i en 50+ buy-in pot. Derfor er det vigtigt at kontrollere potstørrelsen med marginale hænder – check med medium-stærke hænder fra position og undgå at bygge gigantiske potter, medmindre du har nødderne eller en massiv draw.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Board texture-læsning:</strong> Omaha boards er mere "våde" end Hold'em boards, fordi flere draws er i spil. Et board som J♠-T♥-9♣ er ekstremt farligt i PLO – der er straight draws, wraps, og multiple two-pair-muligheder. På sådanne boards bør du kun fortsætte med nødderne. Et tørt board som K♣-7♦-2♠ er langt sikrere, og her kan du value-bette mere liberalt med stærke made hands.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Multi-way pots:</strong> PLO involverer ofte 3-4 spillere til flopet. I multi-way pots falder din c-bet frekvens dramatisk (fra ~60 % heads-up til ~30 % 3-way). Grunden er simpel: med flere modstandere er sandsynligheden for, at nogen har ramt boardet hårdt, langt højere. Her skal du virkelig have varerne for at bette.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 7 – SPR & Stack-to-Pot Ratio
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gauge className="h-7 w-7 text-primary" />
            SPR i PLO – Stack-to-Pot Ratio Forklaret
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Stack-to-Pot Ratio (SPR) er forholdet mellem din resterende stack og pottens størrelse efter flopet. I PLO er SPR endnu mere kritisk end i Hold'em, fordi det dikterer, hvilke hænder du kan commitere med. SPR-konceptet hjælper dig med at undgå den mest costly fejl i PLO: at commitere dig med den næstbedste hånd i en stor pot.
          </p>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">SPR</th>
                      <th className="py-2 text-left font-semibold">Pottype</th>
                      <th className="py-2 text-left font-semibold">Commit med</th>
                      <th className="py-2 text-left font-semibold">Undgå at commit med</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold">0-2</td><td className="py-2">3-bet/4-bet pot</td><td className="py-2">Overpair+, nut draw</td><td className="py-2">Marginal made hands</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">2-4</td><td className="py-2">Raised pot</td><td className="py-2">Top set+, nut wrap+flush</td><td className="py-2">Top two pair, non-nut flush</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">4-8</td><td className="py-2">Single raised pot</td><td className="py-2">Sets, nut draws med backup</td><td className="py-2">Bare overpair, non-nut draws</td></tr>
                    <tr><td className="py-2 font-semibold">8+</td><td className="py-2">Limped/min-raised</td><td className="py-2">Nødder eller intet</td><td className="py-2">Alt under nut flush/nut straight</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Praktisk eksempel:</strong> I en single-raised pot med SPR 6, rammer du top two pair (Kings og Jacks) på et J♠-K♥-8♣ board. I Hold'em ville dette være en nem commit. I PLO er det farligt: modstanderen kan nemt have et set (KK, JJ, 88), en wrap (Q-T-9-7), eller en flush draw med backup. Med SPR 6 har du plads til at tjekke turn og evaluere river – du behøver ikke at putte alle dine chips i med top two pair.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>SPR-manipulation preflop:</strong> Dygtige PLO-spillere manipulerer bevidst SPR preflop. Hvis du har AAxx og vil skabe en lav SPR (hvor dine aces er stærke nok til at commitere), 3-better du for at bygge potten. Omvendt, med en rundown som JT98, foretrækker du en høj SPR, der giver dig plads til at realisere din hands equity post-flop via draws og position. At vælge den korrekte preflop action baseret på ønsket SPR er en avanceret, men essentiel, PLO-færdighed.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 8 – Blockers
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Eye className="h-7 w-7 text-primary" />
            Blocker-Strategi i PLO – Det Usynlige Våben
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Blockers er kort i din hånd, der reducerer sandsynligheden for, at en modstander har en specifik hånd. I PLO er blocker-konceptet endnu mere centralt end i Hold'em, fordi du har fire hole cards og derfor blokerer langt flere modstanderkombinationer. At forstå og udnytte blockers er det, der adskiller breakeven-spillere fra vindende spillere i PLO.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Nut flush blocker:</strong> Det mest basale blocker-koncept. Hvis du holder A♠ og boardet har tre spar, blokerer du nut flush. Det betyder, at din modstander er mindre tilbøjelig til at have nødderne – og du kan bette eller raise som en bluff med lavere risiko for at løbe ind i nødderne. Eksempel: boardet er K♠-T♠-7♠-3♣-2♦. Du har A♠-Q♣-J♦-9♣ (ingen flush, men du holder A♠). En river-bluff er profitable her, fordi din modstander sjældent har nut flush (du blokerer det), og dine andre kort blokerer også KK og QJ-straights.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Set-blockers:</strong> Hvis boardet viser K-7-2 og du holder KK i din hånd, blokerer du din modstanders mulighed for at have top set (KK). Det betyder, at når modstanderen potbetter, er det mindre sandsynligt, at de har nødderne – de har mere sandsynligt en overplayyed draw eller et bluff. Denne information er ekstremt værdifuld for dine call/fold-beslutninger.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Straight-blockers:</strong> Hvis boardet viser 9-8-7 og du holder T-6 i din hånd, blokerer du T6-straights (T-6 laver en straight med 9-8-7). Mere vigtigt: du blokerer også JT-straights, fordi du fjerner en T fra bunken. Denne type blocker-tænkning er avanceret, men afgørende for at forstå, om en modstanders aggression repræsenterer styrke eller et bluff.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Anti-blockers:</strong> Lige så vigtigt som at have blockers er at undgå "anti-blockers" – kort der gør det MERE sandsynligt, at modstanderen har en stærk hånd. Eksempel: boardet er A♠-K♠-Q♠ og du har J♠-T♦-9♣-8♣. Du har J♠ som blocker for nut flush, men du har T-9-8, som er kort din modstander IKKE behøver for at have nødderne. I dette tilfælde giver din J♠ dig et positivt blocker-signal, men dine øvrige kort bidrager ikke. Jo flere relevante blockers du har, desto mere profitable er dine bluffs.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 9 – 5-Card Omaha (PLO5)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Flame className="h-7 w-7 text-primary" />
            5-Card Omaha (PLO5) – Endnu Mere Action
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            5-Card Omaha (PLO5) er den seneste evolution i Omaha-familien. Du modtager fem hole cards i stedet for fire, men skal stadig bruge præcis to hole cards og tre community cards. Denne ene ekstra kort skaber en dramatisk forskel i spildynamikken og har gjort PLO5 til en af de hurtigst voksende pokerformater online.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Matematisk eksplosion:</strong> Med fem hole cards stiger antallet af mulige to-korts kombinationer fra C(4,2) = 6 til C(5,2) = 10. Det er 67 % flere kombinationer at evaluere per hånd. Konsekvensen: hænder er gennemsnitligt stærkere, fordi du har flere muligheder for at lave nødder. Top pair er endnu mere værdiløst end i PLO4, og du har brug for the nuts eller en massiv draw for at commitere dig i store potter.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Equity-kompression:</strong> Preflop equity-forskelle er endnu mindre i PLO5 end i PLO4. Den bedste PLO5-hånd har kun ~28-30 % equity mod en tilfældig hånd i en 6-max pot (vs. ~33 % i PLO4). Det betyder, at variansen er endnu højere, og at bankroll-kravene er tilsvarende større: vi anbefaler minimum 60-80 buy-ins for PLO5 cash games.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Strategiske implikationer:</strong> I PLO5 skal du tænke endnu mere i nødder. En non-nut flush der ville være ok i PLO4 er ofte en tabende hånd i PLO5, fordi sandsynligheden for, at en modstander har nut flush, er markant højere med fem hole cards. Wraps bliver endnu mere powerful – en 20-out wrap med flush backup i PLO5 er næsten umulig at slå.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Tilgængelighed:</strong> PLO5 er tilgængeligt på flere internationale pokerplatforme og vinder langsomt terræn i Danmark. For danske spillere er det primært tilgængeligt via <Link to="/casino-anmeldelser/pokerstars" className={linkClass}>PokerStars</Link>, der tilbyder PLO5 cash games og turneringer. Hvis du allerede er komfortabel med PLO4, er PLO5 det naturlige næste skridt – men vær forberedt på en endnu vildere ride.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 10 – Bankroll og varians
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Bankroll Management i PLO – Overlev Variansen
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            PLO har markant højere varians end NLHE. Selv dygtige spillere kan opleve downswings på 30-50 buy-ins, og den tættere equity-fordeling mellem hænder gør det sværere at skabe en stor edge. Bankroll management er derfor ikke bare vigtigt – det er overlevelse.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Bankroll-Krav per Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Format</th>
                      <th className="py-2 text-left font-semibold">Konservativt</th>
                      <th className="py-2 text-left font-semibold">Aggressivt</th>
                      <th className="py-2 text-left font-semibold">Risk of Ruin (5 %)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold">NLHE cash</td><td className="py-2">25 buy-ins</td><td className="py-2">15 buy-ins</td><td className="py-2">~2 %</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">PLO4 cash</td><td className="py-2">50 buy-ins</td><td className="py-2">30 buy-ins</td><td className="py-2">~4 %</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">PLO5 cash</td><td className="py-2">80 buy-ins</td><td className="py-2">50 buy-ins</td><td className="py-2">~5 %</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">PLO turneringer</td><td className="py-2">150 buy-ins</td><td className="py-2">100 buy-ins</td><td className="py-2">~3 %</td></tr>
                    <tr><td className="py-2 font-semibold">PLO Hi-Lo cash</td><td className="py-2">40 buy-ins</td><td className="py-2">25 buy-ins</td><td className="py-2">~3 %</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Downswing-simulering:</strong> En vindende PLO-spiller med 5 bb/100 winrate (meget god) kan stadig forvente en 25+ buy-in downswing inden for de første 100.000 hænder. Med en winrate på 2 bb/100 (typisk for mange vindende spillere) kan downswings nå 40+ buy-ins. Disse tal er ikke "worst case" – de er forventede resultater baseret på standardvarians-modeller. Uden tilstrækkelig bankroll vil du blive tvunget til at droppe i stakes eller gå bust, uanset din skill.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Tilt-kontrol:</strong> PLO er tilt-inducerende. Du vil ofte stå med top set og tabe mod en wrap + flush draw combo – det føles urimeligt, men det er matematisk korrekt. Accept af variansen og disciplineret bankroll management er de to vigtigste egenskaber for en succesfuld PLO-spiller. Husk altid at spille <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt</Link>.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 11 – Solver og Software
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Cpu className="h-7 w-7 text-primary" />
            PLO Software og Solver-Tools
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Moderne PLO-strategi er i høj grad drevet af software. Ligesom Hold'em-spillere bruger solvers (GTO-værktøjer) til at optimere deres spil, har PLO-verdenen sine egne specialiserede tools. Her gennemgår vi de vigtigste kategorier af PLO-software og hvordan de kan forbedre dit spil.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Equity calculators:</strong> Det mest basale værktøj er en equity calculator, der beregner din hånds vindsandsynlighed mod en modstanders range. For PLO er beregningerne langt mere komplekse end for Hold'em (270.725 starthænder vs. 169), og en dedikeret PLO-calculator er uundværlig. Populære tools inkluderer ProPokerTools og Equilab (med PLO-modul). Brug dem til at studere equity-distribtioner i typiske scenarier – f.eks. "Hvad er min equity med top set mod en 17-out wrap + flush draw?"
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>PLO solvers:</strong> GTO-solvers som MonkerSolver og Vision GTO er de mest avancerede værktøjer til PLO-studie. De beregner game-theoretically optimal (GTO) strategier for enhver situation. I PLO er solver-output markant mere komplekst end i Hold'em, fordi det enorme antal starthænder skaber massive decision trees. En typisk PLO-solver-kørsel kan tage timer eller dage at beregne (vs. minutter for Hold'em). Resultatet er detaljerede frekvens-baserede strategier for bet/check/raise i enhver spot.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Tracking software:</strong> PokerTracker og Hold'em Manager understøtter begge PLO og giver dig adgang til HUD-stats (heads-up display) under spil. Vigtige PLO-specifikke stats inkluderer: VPIP (voluntarily put in pot), PFR (preflop raise), 3-bet %, c-bet flop %, og WWSF (won when saw flop). Disse stats hjælper dig med at identificere leaks i dit spil og udnytte modstandernes tendenser.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Training sites:</strong> Dedikerede PLO-training sites som Run It Once (grundlagt af Phil Galfond, en af verdens bedste PLO-spillere) tilbyder strukturerede kurser fra micro-stakes til high-stakes PLO. For danske spillere der vil tage PLO seriøst, er en kombination af solver-studie, tracking software og struktureret coaching den mest effektive vej til forbedring. Husk dog: software er et supplement til, ikke en erstatning for, fundamental strategisk forståelse.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 12 – Tournament PLO
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Award className="h-7 w-7 text-primary" />
            PLO Turneringer vs. Cash Games
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            PLO spilles både som cash game og turnering, men de to formater kræver fundamentalt forskellige strategier. I turneringer spiller ICM (Independent Chip Model), stack-dynamik og bubble-spil en afgørende rolle, som ikke eksisterer i cash games. Her gennemgår vi de vigtigste forskelle.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Stack-dybde og SPR:</strong> I turneringer varierer din stack konstant – fra 100+ big blinds i early stages til 10-20 big blinds i late stages. I PLO er denne variation endnu mere dramatisk end i Hold'em, fordi pot-limit strukturen gør det sværere at gå all-in preflop med shallow stacks. Med 20 big blinds i PLO er du "dækket" af potlimit-reglerne: en pot-sized open (3,5x) efterfulgt af en pot-sized 3-bet (12x) og et call sender dig all-in. Det betyder, at "shortstacking" i PLO-turneringer kræver en helt anden tilgang end i Hold'em.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Bubble-strategi:</strong> I PLO-turneringer er bubble-spil ekstremt intenst, fordi variansen er højere end i Hold'em. En big stack kan presse small stacks meget hårdt, fordi PLO's tætte equity-spread gør det svært for underdogs at finde "slam dunk"-shove spots. Omvendt skal du som short stack vælge dine spots med endnu mere omhu – at gå all-in med AAxx i PLO er langt mindre sikkert end i Hold'em, fordi selv den bedste hånd kun er ~60 % favorit heads-up (vs. ~80 % i Hold'em).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Early stage vs. late stage:</strong> I early stage med dybe stacks (100+ BB) spiller du PLO-turneringer næsten identisk med cash games – bred preflop range fra position, aggressiv post-flop spil med nødder og draws. I late stage (under 30 BB) bliver preflop all-in spots mere dominerende, og din starthands-selektion skifter mod hænder med høj preflop equity (AAxx, double-suited broadways) fremfor speculative hands som rundowns, der kræver dybere stacks for at realisere deres equity post-flop.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Tilgængelighed:</strong> PLO-turneringer er tilgængelige online via <Link to="/casino-anmeldelser/pokerstars" className={linkClass}>PokerStars</Link> med daglige buy-ins fra 1-100 €. WSOP har haft dedikerede PLO-turneringer i flere år, og European Poker Tour (EPT) kører regelmæssigt PLO-sideevents. For danske spillere er online PLO-turneringer den nemmeste vej ind – start med micro-stakes ($1-5 buy-in) og byg dig op, mens du lærer format-specifikke strategier.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 13 – Common Leaks
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-7 w-7 text-primary" />
            10 Mest Kostbare PLO-Leaks og Løsninger
          </h2>
          <div className="space-y-4 mb-6">
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Leak 1: Overspille bare-aces (AAxx uden sideconnectivity)</p>
                <p className="text-sm text-muted-foreground">AA72 rainbow er en marginal hånd, ikke en premium. Løsning: evaluer altid alle fire kort som en enhed.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Leak 2: Chase med non-nut draws</p>
                <p className="text-sm text-muted-foreground">Den tredjebedste flush er ofte en tabende hånd i PLO. Løsning: fokuser på nut draws og fold non-nut draws i store potter.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Leak 3: Ignorere position</p>
                <p className="text-sm text-muted-foreground">PLO-winrates fra UTG vs. BTN er endnu mere spredte end i Hold'em. Løsning: spil 15-18 % fra UTG, 35-45 % fra BTN.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Leak 4: Overcommitte med top two pair</p>
                <p className="text-sm text-muted-foreground">Top two er sårbar mod sets og wraps i PLO. Løsning: kontroller pot med medium-stærke made hands på våde boards.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Leak 5: Spille for mange hænder preflop</p>
                <p className="text-sm text-muted-foreground">Fire kort giver "illusionen" af potentiale. Løsning: disciplineret VPIP – max 25-30 % i 6-max.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Leak 6: Glemme "must use 2"-reglen</p>
                <p className="text-sm text-muted-foreground">Selv erfarne Hold'em-spillere glemmer det under pres. Løsning: dobbelttjek din hånd ved showdown i live poker.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Leak 7: Undlade at blokere-tænke</p>
                <p className="text-sm text-muted-foreground">Blockers er afgørende i PLO for bluffs og hero-calls. Løsning: altid spørg "hvad blokerer mine kort?"</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Leak 8: C-bette for bredt i multi-way pots</p>
                <p className="text-sm text-muted-foreground">60 % c-bet i heads-up → 30 % i 3-way. Løsning: reducer c-bet frekvens drastisk med flere modstandere.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Leak 9: Utilstrækkelig bankroll</p>
                <p className="text-sm text-muted-foreground">PLO kræver 2-3x større bankroll end NLHE. Løsning: minimum 40 buy-ins for PLO4, 60 for PLO5.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="font-semibold mb-1 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Leak 10: Tilt efter "unfair" bad beats</p>
                <p className="text-sm text-muted-foreground">Bad beats er MERE frekvente i PLO pga. tætte equities. Løsning: accept variansen, tag pauser, og sæt stop-loss.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 14 – Omaha vs Hold'em sammenligning
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            Omaha vs. Texas Hold'em – Den Komplette Sammenligning
          </h2>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Parameter</th>
                      <th className="py-2 text-left font-semibold">Texas Hold'em</th>
                      <th className="py-2 text-left font-semibold">Omaha (PLO4)</th>
                      <th className="py-2 text-left font-semibold">Omaha (PLO5)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold">Hole cards</td><td className="py-2">2</td><td className="py-2">4</td><td className="py-2">5</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Must use</td><td className="py-2">0, 1 eller 2</td><td className="py-2">Præcis 2</td><td className="py-2">Præcis 2</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Unikke starthænder</td><td className="py-2">169</td><td className="py-2">270.725</td><td className="py-2">2.598.960</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">2-kort kombinationer</td><td className="py-2">C(2,2) = 1</td><td className="py-2">C(4,2) = 6</td><td className="py-2">C(5,2) = 10</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Preflop equity-spread</td><td className="py-2">85 % vs. 15 %</td><td className="py-2">33 % vs. 17 %</td><td className="py-2">28 % vs. 18 %</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Dominerende format</td><td className="py-2">No-Limit</td><td className="py-2">Pot-Limit</td><td className="py-2">Pot-Limit</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Varians</td><td className="py-2">Moderat</td><td className="py-2">Høj</td><td className="py-2">Meget høj</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Anbefalet bankroll</td><td className="py-2">20-30 BI</td><td className="py-2">40-50 BI</td><td className="py-2">60-80 BI</td></tr>
                    <tr><td className="py-2 font-semibold">Popularitet</td><td className="py-2">#1 globalt</td><td className="py-2">#2 (voksende)</td><td className="py-2">#3 (hurtigst voksende)</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed">
            Omaha vinder hastigt terræn som det foretrukne spil for action-søgende pokerspillere. PLO er allerede det mest spillede cash game-format på mellemhøje og høje stakes online, og trenden peger mod yderligere vækst. PLO5 er det seneste skud på stammen og tiltrækker spillere, der søger endnu mere action og kompleksitet. For danske spillere er begge varianter tilgængelige hos <Link to="/casino-anmeldelser/pokerstars" className={linkClass}>PokerStars</Link> og i udvalgte <Link to="/live-casino" className={linkClass}>live casino</Link>-formater. Udforsk også vores guide til <Link to="/casinospil/poker/three-card-poker" className={linkClass}>Three Card Poker</Link> for en enklere casino-pokervariant, eller dyk ned i <Link to="/casinospil/poker/caribbean-stud" className={linkClass}>Caribbean Stud</Link> for en dealer-vs-spiller pokervariant med progressiv jackpot.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 15 – Dansk markedsanalyse
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Map className="h-7 w-7 text-primary" />
            Omaha i Danmark – Markedsanalyse 2026
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Omaha er tilgængeligt for danske spillere under dansk licens reguleret af Spillemyndigheden. Poker er underlagt den danske spillelovgivning, og alle licenserede operatører er forpligtet til at opfylde krav om ansvarligt spil, alderverifikation og MitID-validering. Her analyserer vi det aktuelle Omaha-landskab for danske spillere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>PokerStars.dk:</strong> Den primære platform for Omaha i Danmark. PokerStars tilbyder PLO4 og PLO5 cash games fra micro-stakes (PLO2) til high-stakes (PLO1000), samt daglige turneringer med buy-ins fra 1 € til 100 €+. Trafik-niveauet for PLO er lavere end for Hold'em, men der er typisk aktive borde på PLO10-PLO100 niveauerne i aftentimerne. Weekend-trafik er markant højere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Live poker i Danmark:</strong> Casino Copenhagen og Casino Aarhus tilbyder regelmæssige live poker-turneringer, men dedikerede PLO-events er sjældne. De fleste live-poker events i Danmark er Hold'em-baserede, men der kører lejlighedsvis PLO-sideevents ved større festivaler. For regulær live PLO-action må danske spillere rejse til London, Barcelona eller Las Vegas.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Beskatning:</strong> Gevinster fra online poker er skattepligtige i Danmark. For casual-spillere er gevinster fra spil hos danske licenserede operatører allerede beskattet ved kilden (15 % afgift, som operatøren betaler). For professionelle pokerspillere, der spiller på udenlandske sider, gælder andre regler – konsulter altid en skatteekspert for personlig rådgivning.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Ansvarligt spil:</strong> PLO's høje varians gør ansvarligt spil ekstra vigtigt. Danske spillere har adgang til selvudelukkelsesværktøjer via ROFUS og kan sætte indbetalingsgrænser hos alle danske licenserede operatører. Vi anbefaler kraftigt, at du sætter en grænse INDEN du begynder at spille PLO – variansen kan overraske selv erfarne Hold'em-spillere. Læs mere om <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> i vores dedikerede guide.
          </p>
        </section>

        <CasinospilMoneyLinks gameName="Omaha Poker" currentPath="/casinospil/poker/omaha" />
        <LatestNewsByCategory pagePath="/casinospil/poker/omaha" />
        <RelatedGuides currentPath="/casinospil/poker/omaha" />
        <FAQSection faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="spildansknu" />
    </>
  );
};

export default OmahaPokerGuide;
