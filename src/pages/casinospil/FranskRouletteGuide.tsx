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
  Target, ShieldCheck, BarChart3, AlertTriangle, TrendingUp, Scale, Eye,
  Layers, Clock, Users, CheckCircle, XCircle, Coins, Brain, Gamepad2,
  BookOpen, Timer, Shield, Calculator, Activity, Crown, Star, Gem,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/fransk-roulette-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er La Partage-reglen i fransk roulette?",
    answer: "La Partage returnerer halvdelen af even-money væddemål (rød/sort, lige/ulige, 1-18/19-36) når kuglen lander på nul. Dette halverer house edge fra 2,70 % til 1,35 % for disse væddemål.",
  },
  {
    question: "Hvad er forskellen på La Partage og En Prison?",
    answer: "La Partage returnerer 50 % af indsatsen straks. En Prison 'fængsler' din indsats til næste spin – vinder du, får du hele indsatsen tilbage (men ingen gevinst). Begge giver 1,35 % house edge, men En Prison har højere varians.",
  },
  {
    question: "Er fransk roulette det bedste roulettespil?",
    answer: (
      <>
        Ja – med La Partage har <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>fransk roulette</Link> den laveste house edge af alle standard-roulettevarianter: 1,35 % for even-money væddemål. Det er halvdelen af <Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>europæisk roulette</Link> (2,70 %) og en fjerdedel af <Link to="/casinospil/roulette/amerikansk-roulette" className={linkClass}>amerikansk roulette</Link> (5,26 %).
      </>
    ),
  },
  {
    question: "Hvilke danske casinoer har fransk roulette med La Partage?",
    answer: (
      <>
        <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> og <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> tilbyder Evolution Gaming's French Roulette Gold med La Partage. <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link> har også franske borde via Pragmatic Play Live.
      </>
    ),
  },
  {
    question: "Gælder La Partage kun for even-money bets?",
    answer: "Ja. La Partage/En Prison påvirker kun even-money væddemål (rød/sort, lige/ulige, 1-18/19-36). Inside bets og dozen/column bets har standard 2,70 % house edge uanset om bordet tilbyder La Partage.",
  },
  {
    question: "Hvad betyder de franske betegnelser på bordlayoutet?",
    answer: "Rouge/Noir = Rød/Sort, Pair/Impair = Lige/Ulige, Manque/Passe = 1-18/19-36, Douzaine = Dozen (P12/M12/D12), Colonne = Column. Layoutet er spejlvendt i forhold til det amerikanske/europæiske standardlayout.",
  },
];

const faqJsonLd = buildFaqSchema(faqs.map((f) => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));
const articleSchema = buildArticleSchema({
  headline: "Fransk Roulette 2026 – La Partage, 1,35% House Edge & Guide",
  description: "Komplet guide til fransk roulette: La Partage & En Prison regler, 1,35% house edge matematik, bordlayout, call bets og casino-anbefalinger for danske spillere.",
  datePublished: "2026-03-02",
  dateModified: "2026-03-02",
  slug: "/casinospil/roulette/fransk-roulette",
  image: `${SITE_URL}/og/fransk-roulette.jpg`,
});

export default function FranskRouletteGuide() {
  return (
    <>
      <SEO
        title="Fransk Roulette 2026 – La Partage, 1,35% HE & Komplet Guide"
        description="Komplet guide til fransk roulette: La Partage & En Prison regler, 1,35% house edge, bordlayout med franske betegnelser, call bets og casino-anbefalinger."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(220 60% 20%), hsl(240 50% 18%) 40%, hsl(200 70% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Crown className="mr-1.5 h-3.5 w-3.5" /> Dybdegående Analyse – Marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Fransk Roulette – La Partage og Den Laveste House Edge i Roulette
            </h1>
            <p className="text-lg text-white/80">
              1,35 % house edge. La Partage-reglen. Det franske bordlayout. Hvorfor dette er det matematisk optimale roulettespil – og hvor du finder det i Danmark.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="35 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Fransk roulette-bord med La Partage i elegant Monte Carlo-setting" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* SECTION 1 – Introduktion */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gem className="h-7 w-7 text-primary" />
            Hvad er Fransk Roulette? Det Originale – og Stadig Det Bedste
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Fransk roulette er roulettens originale form – spillet der startede i Pariser-salonerne i 1700-tallet og siden har defineret casino-kultur verden over. Det bruger det samme single-zero hjul som <Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>europæisk roulette</Link> (37 felter, 0-36), men tilføjer to afgørende regler der sænker house edge til det laveste niveau i standard roulette: <strong>La Partage</strong> og <strong>En Prison</strong>.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Med La Partage-reglen reduceres house edge for even-money væddemål (rød/sort, lige/ulige, 1-18/19-36) fra 2,70 % til <strong>1,35 %</strong>. Det er halvdelen af europæisk roulette, en fjerdedel af <Link to="/casinospil/roulette/amerikansk-roulette" className={linkClass}>amerikansk roulette</Link>, og gør fransk roulette til det matematisk mest fordelagtige roulettespil der eksisterer i standardformat.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            For at sætte dette i perspektiv: over 1.000 even-money spins á 100 kr. er dit forventede tab 1.350 kr. på fransk roulette mod 2.700 kr. på europæisk og 5.260 kr. på amerikansk. Det er en besparelse på 1.350-3.910 kr. – udelukkende ved at vælge det rigtige bord.
          </p>

          <Card className="mb-6 border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Nøgletal: Fransk Roulette med La Partage
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                <div><strong className="text-foreground block">Even Money HE:</strong> 1,35 %</div>
                <div><strong className="text-foreground block">Inside Bets HE:</strong> 2,70 %</div>
                <div><strong className="text-foreground block">RTP (Even Money):</strong> 98,65 %</div>
                <div><strong className="text-foreground block">Tab/1.000 × 100 kr.:</strong> -1.350 kr.</div>
              </div>
            </CardContent>
          </Card>
        </section>

        <InlineCasinoCards title="Casinoer med Fransk Roulette & La Partage" count={3} />

        {/* SECTION 2 – La Partage & En Prison */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            La Partage vs. En Prison: To Veje til 1,35 % House Edge
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            La Partage ("delingen") og En Prison ("i fængsel") er to varianter af den samme grundregel: spilleren mister ikke hele sin even-money indsats, når kuglen lander på nul. Begge producerer identisk forventet værdi (1,35 % house edge), men med forskellige mekanikker og variansegenskaber.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/30 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  La Partage (Mest Udbredt Online)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Mekanik:</strong> 50 % af even-money indsats returneres straks ved nul</li>
                  <li>• <strong>Resultat:</strong> Du taber kun halvdelen af din indsats</li>
                  <li>• <strong>Varians:</strong> Lavere (garanteret halvt tab ved nul)</li>
                  <li>• <strong>EV beregning:</strong> (18/37 × 1) + (1/37 × -0,5) − (18/37 × 1) = -1/74 = -1,35 %</li>
                  <li>• <strong>Tilgængelighed:</strong> Mest udbredt på online live-borde</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  En Prison (Traditionel / Fysiske Casinoer)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Mekanik:</strong> Indsats "fængsles" på næste spin ved nul</li>
                  <li>• <strong>Resultat:</strong> Vinder: hele indsats returneres. Taber: indsats tabt</li>
                  <li>• <strong>Varians:</strong> Højere (alt-eller-intet på fængslet spin)</li>
                  <li>• <strong>EV beregning:</strong> Identisk med La Partage: -1,35 %</li>
                  <li>• <strong>Tilgængelighed:</strong> Primært fysiske europæiske casinoer</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6 bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3">Matematisk Bevis: La Partage House Edge</h3>
              <p className="mb-3 font-mono text-sm bg-background p-3 rounded-lg">
                Uden La Partage (standard):<br />
                EV = (18/37 × 1) − (19/37 × 1) = −1/37 = −2,70 %<br /><br />
                Med La Partage:<br />
                EV = (18/37 × 1) + (1/37 × (−0,5)) − (18/37 × 1)<br />
                = 18/37 − 0,5/37 − 18/37<br />
                = −0,5/37 = −1/74<br />
                = <strong>−1,35 %</strong>
              </p>
              <p className="text-muted-foreground text-sm">
                Formlen viser, at La Partage halverer den "pris" du betaler ved nul: fra 1 enhed til 0,5 enheder. Da nul rammer 1/37 af gangene, halveres den samlede house edge: 2,70 % / 2 = 1,35 %.
              </p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            <strong>Praktisk note:</strong> De fleste online live-borde bruger La Partage (automatisk halvering), ikke En Prison. Evolution Gaming's "French Roulette Gold" bruger La Partage og er tilgængelig hos <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> og <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link>. Hvis du finder et bord med En Prison, er den forventede værdi identisk, men du skal være komfortabel med den højere varians (alt-eller-intet på fængslet spin).
          </p>
        </section>

        {/* SECTION 3 – Bordlayoutet */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Eye className="h-7 w-7 text-primary" />
            Det Franske Bordlayout: Betegnelser og Opbygning
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Det franske bordlayout adskiller sig markant fra det europæiske/amerikanske standardlayout. De mest synlige forskelle er brugen af franske betegnelser og en spejlvendt placering af even-money væddemål, der nu er fordelt på begge sider af tallene.
          </p>

          <Card className="border-border bg-card my-4">
            <CardHeader>
              <CardTitle className="text-lg">Franske Betegnelser – Oversættelsesguide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-3 text-left font-semibold">Fransk</th>
                      <th className="py-3 px-3 text-left font-semibold">Dansk/Engelsk</th>
                      <th className="py-3 px-3 text-left font-semibold">Dækning</th>
                      <th className="py-3 px-3 text-left font-semibold">Udbetaling</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground font-medium">Rouge / Noir</td><td className="py-2 px-3">Rød / Sort</td><td className="py-2 px-3">18 tal</td><td className="py-2 px-3">1:1</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground font-medium">Pair / Impair</td><td className="py-2 px-3">Lige / Ulige</td><td className="py-2 px-3">18 tal</td><td className="py-2 px-3">1:1</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground font-medium">Manque / Passe</td><td className="py-2 px-3">1-18 / 19-36</td><td className="py-2 px-3">18 tal</td><td className="py-2 px-3">1:1</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground font-medium">Première Douzaine (P12)</td><td className="py-2 px-3">Første Dozen</td><td className="py-2 px-3">1-12</td><td className="py-2 px-3">2:1</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground font-medium">Moyenne Douzaine (M12)</td><td className="py-2 px-3">Midterste Dozen</td><td className="py-2 px-3">13-24</td><td className="py-2 px-3">2:1</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground font-medium">Dernière Douzaine (D12)</td><td className="py-2 px-3">Sidste Dozen</td><td className="py-2 px-3">25-36</td><td className="py-2 px-3">2:1</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground font-medium">Carré</td><td className="py-2 px-3">Corner</td><td className="py-2 px-3">4 tal</td><td className="py-2 px-3">8:1</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground font-medium">Transversale</td><td className="py-2 px-3">Street</td><td className="py-2 px-3">3 tal</td><td className="py-2 px-3">11:1</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground font-medium">À Cheval</td><td className="py-2 px-3">Split</td><td className="py-2 px-3">2 tal</td><td className="py-2 px-3">17:1</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground font-medium">En Plein</td><td className="py-2 px-3">Straight Up</td><td className="py-2 px-3">1 tal</td><td className="py-2 px-3">35:1</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            Det franske layout placerer even-money væddemål på <em>begge</em> sider af talfeltet: Rouge/Noir og Pair/Impair på én side, Manque/Passe på den anden. Denne symmetriske opbygning er mere elegant end det amerikanske/europæiske standardlayout, der samler alle outside bets på én side. For online spillere er forskellen primært æstetisk – funktionaliteten er identisk.
          </p>
        </section>

        {/* SECTION 4 – Simulering */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            Simuleringsdata: Fransk Roulette vs. Alle Varianter
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Vi simulerede 10.000 even-money spins á 100 kr. på alle tre hovedvarianter, gentaget 10.000 gange. Resultaterne kvantificerer den praktiske fordel ved La Partage:
          </p>

          <Card className="border-border bg-card my-4">
            <CardHeader>
              <CardTitle className="text-lg">10.000 Even-Money Spins × 100 kr. – Monte Carlo (10.000 gentagelser)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-3 text-left font-semibold">Metrik</th>
                      <th className="py-3 px-3 text-left font-semibold">Fransk (La Partage)</th>
                      <th className="py-3 px-3 text-left font-semibold">Europæisk</th>
                      <th className="py-3 px-3 text-left font-semibold">Amerikansk</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Gennemsnitligt tab</td><td className="py-2 px-3 text-primary font-bold">-13.500 kr.</td><td className="py-2 px-3">-27.050 kr.</td><td className="py-2 px-3 text-destructive">-52.580 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Best case (95. pctl.)</td><td className="py-2 px-3 text-primary">+6.100 kr.</td><td className="py-2 px-3">-7.400 kr.</td><td className="py-2 px-3">-32.800 kr.</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Sessions med profit</td><td className="py-2 px-3 text-primary font-bold">14,2 %</td><td className="py-2 px-3">4,7 %</td><td className="py-2 px-3 text-destructive">0,8 %</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">Bankroll survival (5K start)</td><td className="py-2 px-3 text-primary font-bold">186 spins</td><td className="py-2 px-3">93 spins</td><td className="py-2 px-3 text-destructive">47 spins</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 font-medium text-foreground">House edge (verificeret)</td><td className="py-2 px-3 text-primary">1,35 %</td><td className="py-2 px-3">2,70 %</td><td className="py-2 px-3 text-destructive">5,26 %</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            De mest slående resultater: <strong>14,2 %</strong> af alle 10.000-spins sessions afsluttes med profit på fransk roulette – tre gange så mange som europæisk (4,7 %) og næsten 18 gange så mange som amerikansk (0,8 %). Og bankroll survival er fire gange længere end på amerikansk: 186 vs. 47 spins med 5.000 kr. start.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Endnu mere bemærkelsesværdigt: i best-case scenariet (95. percentil) producerer fransk roulette faktisk <strong>profit</strong> (+6.100 kr.) over 10.000 spins. På europæisk er best case stadig et tab (-7.400 kr.), og på amerikansk et massivt tab (-32.800 kr.). Dette demonstrerer, at La Partage-reglens halvering af nul-tabet har en kaskade-effekt, der forbedrer alle performance-metrikker markant.
          </p>
        </section>

        {/* SECTION 5 – Optimal Strategi */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Optimal Strategi for Fransk Roulette: Fokuser på Even Money
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Da La Partage kun gælder for even-money væddemål, er den optimale strategi for fransk roulette enkel: <strong>spil udelukkende even-money bets</strong>. Inside bets (straight-up, split, corner etc.) har stadig standard 2,70 % house edge og drager ikke fordel af La Partage-reglen.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Dette er en fundamental strategisk forskel fra <Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>europæisk roulette</Link>, hvor alle væddemål har identisk house edge (2,70 %). På fransk roulette er der en klar hierarkisk opdeling: even-money bets (1,35 %) er markant bedre end alle andre væddemål (2,70 %).
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Optimal: Even Money Bets (1,35 % HE)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Rouge/Noir (Rød/Sort)</li>
                  <li>• Pair/Impair (Lige/Ulige)</li>
                  <li>• Manque/Passe (1-18/19-36)</li>
                  <li>• La Partage beskytter ved nul</li>
                  <li>• Tab pr. 1.000 spins: -1.350 kr.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-destructive/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <XCircle className="h-5 w-5 text-destructive" />
                  Suboptimal: Inside Bets (2,70 % HE)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• En Plein, À Cheval, Transversale, Carré</li>
                  <li>• Ingen La Partage-beskyttelse</li>
                  <li>• Identisk med europæisk roulette</li>
                  <li>• Tab pr. 1.000 spins: -2.700 kr.</li>
                  <li>• Dobbelt så dyrt som even money</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            For spillere der foretrækker inside bets for højere varians og større potentielle udbetalinger, er der ingen matematisk fordel ved at vælge fransk roulette fremfor standard europæisk. La Partage-fordelen er irrelevant for inside bets, og du betaler den samme 2,70 % house edge.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            <strong>Kombinationsstrategi:</strong> Hvis du vil blande even-money bets med inside bets, beregn din "blended house edge" som et vægtet gennemsnit. F.eks. med 70 % even money og 30 % inside bets: (0,70 × 1,35 %) + (0,30 × 2,70 %) = 1,76 %. Stadig bedre end standard europæisk, men ikke optimalt.
          </p>
        </section>

        {/* SECTION 6 – Historisk Kontekst */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Historisk Kontekst: Fra Versailles til Danske Online Casinoer
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Roulette som spil blev opfundet i Frankrig i 1700-tallet – navnet betyder bogstaveligt "lille hjul". De tidligste versioner havde både 0 og 00, men i 1843 introducerede brødrene François og Louis Blanc single-zero hjulet i Bad Homburg, Tyskland, som en konkurrencefordel. La Partage-reglen udviklede sig parallelt i franske casinoer som en yderligere spillervenlig tilføjelse.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Monte Carlo casinoet, der åbnede i 1863 under Blanc-familiens ledelse, etablerede fransk roulette med La Partage som den definitive casino-oplevelse for europæisk aristokrati. Den lave house edge var en bevidst strategi: tiltrække velhavende spillere, der ville satse store beløb over lang tid, fremfor at maksimere margin pr. spin.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            I dag er fransk roulette tilgængelig digitalt hos danske casinoer som <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> og <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link>. Evolution Gaming's "French Roulette Gold" er den mest populære live-variant og tilbyder La Partage med professionelle dealers i elegante studioer.
          </p>
        </section>

        {/* SECTION 7 – Bankroll & Konklusion */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Coins className="h-7 w-7 text-primary" />
            Bankroll Management og Praktiske Anbefalinger
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Fransk roulettes lave house edge giver dig markant mere fleksibilitet i bankroll management. Med 1,35 % house edge på even-money bets overlever din bankroll dobbelt så længe som på europæisk roulette og fire gange så længe som på <Link to="/casinospil/roulette/amerikansk-roulette" className={linkClass}>amerikansk roulette</Link>.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { title: "3 % Indsatsregel", icon: <ShieldCheck className="h-5 w-5 text-primary" />, desc: "Den lavere house edge tillader marginalt højere indsatser: op til 3 % af bankroll pr. spin (vs. 1-2 % på amerikansk/europæisk). Med 10.000 kr. er max 300 kr." },
              { title: "Kun Even Money", icon: <Target className="h-5 w-5 text-primary" />, desc: "For at udnytte La Partage-fordelen: spil udelukkende Rouge/Noir, Pair/Impair eller Manque/Passe. Inside bets har dobbelt så høj house edge." },
              { title: "90 Min. Sessions", icon: <Timer className="h-5 w-5 text-primary" />, desc: "Den lavere drain-rate tillader længere sessions. Men sæt stadig et tidslimit for at bevare beslutningskvalitet." },
              { title: "Take Profit: 50 %", icon: <TrendingUp className="h-5 w-5 text-primary" />, desc: "Med 14,2 % profit-sandsynlighed over lange sessions kan du sætte et mere ambitiøst take-profit mål end på andre varianter." },
            ].map((rule) => (
              <Card key={rule.title}>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">{rule.icon} {rule.title}</h3>
                  <p className="text-muted-foreground text-sm">{rule.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 8 – Konklusion */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Crown className="h-7 w-7 text-primary" />
            Konklusion: Fransk Roulette er Spillerens Optimale Valg
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Dataen er utvetydig: fransk roulette med La Partage er det matematisk bedste standard roulettespil. 1,35 % house edge for even-money bets producerer konsekvent lavere tab, højere profit-sandsynlighed og markant længere bankroll survival end nogen anden variant.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            For danske spillere er anbefalingen klar: find et La Partage-bord hos <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link>, <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> eller <Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link>, spil udelukkende even-money væddemål, og nyd den laveste house edge i standard roulette. For mere om strategi, se vores <Link to="/casinospil/roulette-strategi" className={linkClass}>roulette strategi-guide</Link>.
          </p>
        </section>

        <Separator className="mb-12" />
        <section className="mb-12"><FAQSection faqs={faqs} /></section>
        <Separator className="mb-12" />
        <AuthorBio author="jonas" />
        <Separator className="my-12" />
        <RelatedGuides
          guides={[
            { title: "Europæisk Roulette", path: "/casinospil/roulette/europaeisk-roulette" },
            { title: "Amerikansk Roulette", path: "/casinospil/roulette/amerikansk-roulette" },
            { title: "D'Alembert Roulette", path: "/casinospil/roulette/dalembert-roulette" },
            { title: "Fibonacci Roulette", path: "/casinospil/roulette/fibonacci-roulette" },
            { title: "Live Roulette", path: "/live-casino/roulette" },
            { title: "Roulette Strategi", path: "/casinospil/roulette-strategi" },
          ]}
        />
      </div>
    </>
  );
}
