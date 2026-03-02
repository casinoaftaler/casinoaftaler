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
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Marts 2026
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
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="38 Min." />

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
          <p className="text-muted-foreground leading-relaxed">
            <strong>Resultat efter uge 1:</strong> -15 buy-ins (ca. 7.500 kr. på PLO50). Men den vigtigste lektion var klar: Omaha er et fundamentalt andet spil end <Link to="/casinospil/poker/texas-holdem" className={linkClass}>Texas Hold'em</Link>. Det deler regler, men ikke strategi. Hvis du kommer fra Hold'em, skal du nulstille din tankegang og acceptere, at du er nybegynder igen.
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
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Kortuddelingen:</strong> Hver spiller modtager fire private kort (hole cards). Blinds og dealing fungerer identisk med Hold'em – small blind til venstre for button, big blind til venstre for small blind. Preflop-action starter fra UTG og bevæger sig med uret.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Must Use 2-reglen:</strong> Dette er Omahas definerende mekanik og den vigtigste regel for nye spillere at forstå. Du SKAL bruge <strong>præcis to</strong> af dine fire hole cards og <strong>præcis tre</strong> af de fem community cards til at danne din endelige 5-korts hånd. Du kan ikke bruge én, tre eller fire hole cards. Eksempel: boardet er A♠-K♠-Q♠-J♠-T♠ (en royal flush på boardet). Hvis du har 9♠-8♣-7♦-2♥, har du IKKE en flush – du har kun en straight (du bruger 9♠ og 8♣ for at lave Q-J-T-9-8).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Pot-Limit struktur:</strong> Omaha spilles næsten udelukkende som Pot-Limit (PLO). Det maksimale bet er størrelsen af den aktuelle pot inklusive din eventuelle call. Formlen: max raise = pot + alle bets i runden + dit call. No-Limit Omaha eksisterer, men spilles sjældent, fordi fire hole cards skaber for mange preflop all-in situationer, der reducerer spillet til en coin flip.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Showdown:</strong> Ved showdown afslører alle aktive spillere deres kort, og den bedste 5-korts hånd vinder. Husk: du evaluerer ALLE mulige kombinationer af 2 hole cards + 3 community cards. Med fire hole cards og fem community cards har du i alt C(4,2) × C(5,3) = 6 × 10 = 60 mulige kombinationer at evaluere. Softwarebaserede spil gør dette automatisk, men i live poker er det vigtigt at kende din bedste hånd.
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
          <p className="text-muted-foreground leading-relaxed">
            <strong>Danglers:</strong> Et kort, der ikke connecter med de tre øvrige, kaldes en "dangler". AAKK er fantastisk, men AAK7 har en dangler (7'eren). Denne dangler reducerer håndens samlede potentiale, fordi den sjældent bidrager til din endelige 5-korts hånd. I praksis: undgå hænder med to eller flere danglers.
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
          <p className="text-muted-foreground leading-relaxed">
            <strong>Blockers og wrap-læsning:</strong> Et avanceret koncept er at tælle, hvilke outs der er "blokeret" af dine egne kort. Hvis du har T-9-8-7 og boardet viser 6-5-x, har du en 20-out wrap – men hvis du også har en af 4'erne i din hånd, mister du en out. At tælle blokerede outs i realtid er det, der adskiller professionelle PLO-spillere fra amatører.
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
          <p className="text-muted-foreground leading-relaxed">
            <strong>"Quartered":</strong> Hvis to spillere har den samme lave hånd, deles den lave halvdel yderligere (du får kun 25 % af potten). At blive "quartered" er en af de mest frustrerende oplevelser i poker – og grunden til, at du bør undgå "bare low"-hænder (hænder der kun kan vinde den lave halvdel uden high-potentiale).
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
            <strong>Multi-way pots:</strong> PLO involverer ofte 3-4 spillere til flopet. I multi-way pots falder din c-bet frekvens dramatisk (fra ~60 % heads-up til ~30 % 3-way). Grunden er simpel: med flere modstandere er sandsynligheden for, at nogen har ramt boardet hårdt, langt højere. Her skal du virkelig have varerne for at bette. Disse dynamikker gør Omaha til et teknisk mere krævende spil end <Link to="/casinospil/poker/texas-holdem" className={linkClass}>Texas Hold'em</Link>, men også langt mere actionfyldt og underholdende.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 7 – Bankroll og varians
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Bankroll Management i PLO – Overlev Variansen
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            PLO har markant højere varians end NLHE. Selv dygtige spillere kan opleve downswings på 30-50 buy-ins, og den tættere equity-fordeling mellem hænder gør det sværere at skabe en stor edge. Bankroll management er derfor ikke bare vigtigt – det er overlevelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Anbefalede minimumskrav:</strong> For PLO cash games anbefaler vi minimum 40 buy-ins for en konservativ tilgang og 30 buy-ins for en aggressiv tilgang. For PLO-turneringer bør du have 100-150 buy-ins. Sammenlign dette med Hold'ems 20-30 buy-ins for cash games – forskellen afspejler den højere varians direkte.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Tilt-kontrol:</strong> PLO er tilt-inducerende. Du vil ofte stå med top set og tabe mod en wrap + flush draw combo – det føles urimeligt, men det er matematisk korrekt. Accept af variansen og disciplineret bankroll management er de to vigtigste egenskaber for en succesfuld PLO-spiller. Husk altid at spille <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt</Link>.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 8 – Omaha vs Hold'em sammenligning
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
                      <th className="py-2 text-left font-semibold">Omaha (PLO)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-semibold">Hole cards</td><td className="py-2">2</td><td className="py-2">4</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Must use</td><td className="py-2">0, 1 eller 2</td><td className="py-2">Præcis 2</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Unikke starthænder</td><td className="py-2">169</td><td className="py-2">270.725</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Preflop equity-spread</td><td className="py-2">Bred (85 % vs. 15 %)</td><td className="py-2">Smal (33 % vs. 17 %)</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Dominerende format</td><td className="py-2">No-Limit</td><td className="py-2">Pot-Limit</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Varians</td><td className="py-2">Moderat</td><td className="py-2">Høj</td></tr>
                    <tr className="border-b"><td className="py-2 font-semibold">Anbefalet bankroll</td><td className="py-2">20-30 buy-ins</td><td className="py-2">40-50 buy-ins</td></tr>
                    <tr><td className="py-2 font-semibold">Popularitet</td><td className="py-2">#1 globalt</td><td className="py-2">#2 (voksende)</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed">
            Omaha vinder hastigt terræn som det foretrukne spil for action-søgende pokerspillere. PLO er allerede det mest spillede cash game-format på mellemhøje og høje stakes online, og trenden peger mod yderligere vækst. For danske spillere er begge varianter tilgængelige hos <Link to="/casino-anmeldelser/pokerstars" className={linkClass}>PokerStars</Link> og i udvalgte <Link to="/live-casino" className={linkClass}>live casino</Link>-formater. Udforsk også vores guide til <Link to="/casinospil/poker/three-card-poker" className={linkClass}>Three Card Poker</Link> for en enklere casino-pokervariant.
          </p>
        </section>

        <Separator className="my-10" />

        <FAQSection faqs={faqs} />

        <Separator className="my-10" />

        <RelatedGuides category="poker" currentPath="/casinospil/poker/omaha" index={1} />

        <Separator className="my-10" />

        <AuthorBio author="jonas" />
      </div>
    </>
  );
};

export default OmahaPokerGuide;
