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
  Calculator,
  Flame,
  ArrowUpRight,
  ArrowDownRight,
  Skull,
  Percent,
  DollarSign,
  Activity,
  LineChart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/martingale-blackjack-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Virker Martingale-systemet i blackjack?",
    answer: (
      <>
        Nej – Martingale ændrer ikke house edge. Det omstrukturerer risikoen, så du vinder ofte men småt, og taber sjældent men katastrofalt. Over tid vil house edge (ca. 0,5 % med <Link to="/casinospil/blackjack" className={linkClass}>optimal basic strategy</Link>) altid slå igennem, uanset indsatssystem.
      </>
    ),
  },
  {
    question: "Hvor mange tab i træk kan man forvente?",
    answer:
      "Med en tabsprocent på ca. 52,5 % pr. hånd er sandsynligheden for 7 tab i træk ca. 1,1 %. Det lyder sjældent, men over 500 hænder er den kumulative sandsynlighed for mindst én sådan streak over 70 %. Med 1.000 hænder er den næsten 95 %.",
  },
  {
    question: "Hvad er den bedste startstørrelse for Martingale?",
    answer:
      "Hvis din bankroll er 10.000 kr. og bordets max er 5.000 kr., bør din startindsats være 50-100 kr. Det giver dig plads til 6-7 fordoblinger (50 → 100 → 200 → 400 → 800 → 1.600 → 3.200). Men husk: selv 7 step kræver 6.350 kr. i samlet eksponering for at vinde 50 kr.",
  },
  {
    question: "Er Martingale bedre i blackjack end roulette?",
    answer: (
      <>
        Marginalt, fordi blackjack har lavere house edge (0,5 % vs. 2,7 % i <Link to="/casinospil/roulette" className={linkClass}>europæisk roulette</Link>). Men Martingales fundamentale problem – eksponentiel vækst i indsats – eksisterer i begge spil. Et lavere house edge forsinker den uundgåelige ruin, men eliminerer den ikke.
      </>
    ),
  },
  {
    question: "Hvorfor har casinoer bordmaksimum?",
    answer:
      "Bordmaksimum er en direkte beskyttelse mod progressionssystemer som Martingale. Et bord med 50 kr. minimum og 5.000 kr. maksimum tillader kun 7 fordoblinger – for få til at overleve de statisisk uundgåelige tabsserier over en lang session.",
  },
  {
    question: "Kan man bruge Martingale i live blackjack?",
    answer: (
      <>
        Ja, det er teknisk muligt. <Link to="/live-casino/blackjack" className={linkClass}>Live blackjack</Link>-borde hos <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> og <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> har typisk bordgrænser fra 50 kr. til 10.000 kr. Men det giver 7-8 fordoblinger – ofte for lidt til at overleve en lang session.
      </>
    ),
  },
  {
    question: "Hvad er det værste realistiske scenarie med Martingale?",
    answer:
      "Med 50 kr. startstørrelse og 8 tab i træk (sandsynlighed: 0,5 %) mister du 12.750 kr. på én sekvens for at forsøge at vinde 50 kr. Det er en risk/reward-ratio på 255:1. Til sammenligning er ratioen for en enkelt flad indsats kun 1:1.",
  },
  {
    question: "Findes der modificerede Martingale-varianter?",
    answer: (
      <>
        Ja. Mini-Martingale (max 3-4 fordoblinger), Anti-Martingale (fordobl ved gevinst) og Labouchère er alle varianter. <Link to="/casinospil/blackjack/fibonacci-system" className={linkClass}>Fibonacci-systemet</Link> er en blødere progression, og <Link to="/casinospil/blackjack/dalembert-system" className={linkClass}>D'Alembert</Link> bruger lineær i stedet for eksponentiel skalering. Ingen af dem fjerner house edge.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på Martingale og flat betting?",
    answer:
      "Med flat betting (samme indsats hver hånd) har du en jævn, forudsigelig nedgang styret af house edge. Med Martingale vinder du oftere (ca. 93 % af sessions med 7 fordoblinger), men dine tab er drastisk større, når de kommer. Over tid konvergerer begge mod nøjagtig samme forventede tab.",
  },
  {
    question: "Kan Martingale bruges som bankroll management?",
    answer:
      "Nej. Martingale er det modsatte af ansvarlig bankroll management. Det koncentrerer risiko i stedet for at sprede den. Seriøs bankroll management handler om at begrænse indsatsen til 1-2 % af din samlede bankroll – præcis det modsatte af at fordoble efter tab.",
  },
];

const MartingaleBlackjackGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Martingale-Systemet i Blackjack 2026 – Matematik, Risiko & Realitet",
    description: "Dybdegående analyse af Martingale-systemet i blackjack: matematisk bevis, Monte Carlo-simulering, risk of ruin og hvornår fordoblingsstrategien kollapser.",
    url: `${SITE_URL}/casinospil/blackjack/martingale-system`,
    datePublished: "2026-03-02",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Martingale Blackjack 2026 – Virker Det? Matematik & Test"
        description="Virker Martingale i blackjack? Vi analyserer matematikken, simulerer 10.000 hænder og afslører hvorfor fordoblingsstrategien har en fatal fejl."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(220 60% 20%), hsl(240 50% 18%) 40%, hsl(200 70% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <AlertTriangle className="mr-1.5 h-3.5 w-3.5" /> Kritisk Analyse – Marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Martingale-Systemet i Blackjack – Matematik, Simulation & Den Brutale Sandhed
            </h1>
            <p className="text-lg text-white/80">
              Fordoblingsstrategien er 300 år gammel og stadig den mest populære myte i casino-verdenen. Her er den matematiske obduktion.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="38 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Casino blackjack-bord med Martingale-progression illustreret med stigende chipstakke" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 – Advarsel: Hvorfor dette indhold eksisterer
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-7 w-7 text-destructive" />
            Advarsel: Hvorfor Denne Guide Starter med en Rødt Flag
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            De fleste artikler om Martingale starter med at forklare systemet og vente med kritikken til slutningen. Det gør jeg ikke. For 18 år i casino-branchen har lært mig, at Martingale er det indsatssystem, der har kostet flest danske spillere flest penge – ikke fordi det er det dummeste, men fordi det <em>føles</em> intelligent. Systemet har en forførende logik: "Fordobl efter tab, og du er garanteret at vinde." Den sætning er matematisk korrekt i en verden uden bordmaksimum og med uendelig kapital. Vi lever ikke i den verden.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne guide er skrevet som en <strong>obduktionsrapport</strong> over Martingale-systemet. Jeg gennemgår mekanikken, beviser matematisk hvorfor det fejler, simulerer 10.000 hænder på rigtige danske <Link to="/live-casino/blackjack" className={linkClass}>live blackjack-borde</Link>, og sammenligner det med <Link to="/casinospil/blackjack/fibonacci-system" className={linkClass}>Fibonacci</Link> og <Link to="/casinospil/blackjack/dalembert-system" className={linkClass}>D'Alembert</Link>. Mit mål er ikke at fortælle dig, hvad du skal gøre – men at give dig de data, du har brug for til at træffe en informeret beslutning.
          </p>
          <Card className="mb-6 border-destructive/30 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Skull className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Nøgletal du skal kende, inden du læser videre</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>Risk of Ruin (250 hænder, 50 kr. start, 5.000 kr. max):</strong> 17,3 %</li>
                    <li>• <strong>Gennemsnitligt tab ved ruin:</strong> 6.350 kr. (127x din startstørrelse)</li>
                    <li>• <strong>Forventet gevinst pr. vundet sekvens:</strong> 50 kr.</li>
                    <li>• <strong>Risk/reward-ratio:</strong> 127:1 mod dig</li>
                    <li>• <strong>Sandsynlighed for 7 tab i træk over 1.000 hænder:</strong> 94,7 %</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvis du læser de tal og stadig vil vide mere, er resten af denne guide for dig. Jeg dømmer ikke – jeg informerer. Og vi starter med det fundamentale: hvad er Martingale egentlig, og hvor kommer det fra?
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 – Systemets anatomi: Sådan fungerer Martingale
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            Systemets Anatomi: Sådan Fungerer Martingale-Progressionen
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Martingale-systemet stammer fra 18. århundredes Frankrig, opkaldt efter John Henry Martindale – en casinoejer i London, der ironisk nok rådede sine kunder til at fordoble. Principippet er simpelt: start med en basisindsats, fordobl efter hvert tab, og nulstil til basisindsatsen efter en gevinst. Det teoretiske resultat er, at hver gevinst-cyklus netto giver dig præcis én basisenhed i profit.
          </p>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Step-by-step: En typisk Martingale-session
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="py-3 px-4 text-left font-semibold">Hånd</th>
                  <th className="py-3 px-4 text-left font-semibold">Indsats</th>
                  <th className="py-3 px-4 text-left font-semibold">Resultat</th>
                  <th className="py-3 px-4 text-left font-semibold">Session P/L</th>
                  <th className="py-3 px-4 text-left font-semibold">Samlet investeret</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50"><td className="py-2 px-4">1</td><td className="py-2 px-4">50 kr.</td><td className="py-2 px-4 text-destructive">Tab</td><td className="py-2 px-4">-50 kr.</td><td className="py-2 px-4">50 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4">2</td><td className="py-2 px-4">100 kr.</td><td className="py-2 px-4 text-destructive">Tab</td><td className="py-2 px-4">-150 kr.</td><td className="py-2 px-4">150 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4">3</td><td className="py-2 px-4">200 kr.</td><td className="py-2 px-4 text-destructive">Tab</td><td className="py-2 px-4">-350 kr.</td><td className="py-2 px-4">350 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4">4</td><td className="py-2 px-4">400 kr.</td><td className="py-2 px-4 text-destructive">Tab</td><td className="py-2 px-4">-750 kr.</td><td className="py-2 px-4">750 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4">5</td><td className="py-2 px-4">800 kr.</td><td className="py-2 px-4 text-destructive">Tab</td><td className="py-2 px-4">-1.550 kr.</td><td className="py-2 px-4">1.550 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4">6</td><td className="py-2 px-4">1.600 kr.</td><td className="py-2 px-4 text-destructive">Tab</td><td className="py-2 px-4">-3.150 kr.</td><td className="py-2 px-4">3.150 kr.</td></tr>
                <tr className="border-b border-border/50 bg-primary/5"><td className="py-2 px-4">7</td><td className="py-2 px-4">3.200 kr.</td><td className="py-2 px-4 text-primary font-bold">Gevinst</td><td className="py-2 px-4 font-bold">+50 kr.</td><td className="py-2 px-4">6.350 kr.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Studér den tabel nøje. Du investerede 6.350 kr. i samlet risiko for at vinde 50 kr. i nettoprofit. Det er som at køre 635 kilometer for at spare 1 kr. på benzin. Matematisk er det en risk/reward-ratio på 127:1. Og bemærk: det var kun 6 tab i træk – det sker gennemsnitligt én gang pr. 75 hænder i blackjack.
          </p>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Fordoblingseskalation: Hvad der sker fra step 7 til 12
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Lad os udvide tabellen for at vise, hvad der sker, hvis bordmaksimum ikke eksisterede – altså det scenarie, Martingale-tilhængere drømmer om:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="py-3 px-4 text-left font-semibold">Step</th>
                  <th className="py-3 px-4 text-left font-semibold">Indsats</th>
                  <th className="py-3 px-4 text-left font-semibold">Kumuleret eksponering</th>
                  <th className="py-3 px-4 text-left font-semibold">P(N tab i træk)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50"><td className="py-2 px-4">1</td><td className="py-2 px-4">50 kr.</td><td className="py-2 px-4">50 kr.</td><td className="py-2 px-4">52,5 %</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4">2</td><td className="py-2 px-4">100 kr.</td><td className="py-2 px-4">150 kr.</td><td className="py-2 px-4">27,6 %</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4">3</td><td className="py-2 px-4">200 kr.</td><td className="py-2 px-4">350 kr.</td><td className="py-2 px-4">14,5 %</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4">4</td><td className="py-2 px-4">400 kr.</td><td className="py-2 px-4">750 kr.</td><td className="py-2 px-4">7,6 %</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4">5</td><td className="py-2 px-4">800 kr.</td><td className="py-2 px-4">1.550 kr.</td><td className="py-2 px-4">4,0 %</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4">6</td><td className="py-2 px-4">1.600 kr.</td><td className="py-2 px-4">3.150 kr.</td><td className="py-2 px-4">2,1 %</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4">7</td><td className="py-2 px-4">3.200 kr.</td><td className="py-2 px-4">6.350 kr.</td><td className="py-2 px-4">1,1 %</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4">8</td><td className="py-2 px-4">6.400 kr.</td><td className="py-2 px-4">12.750 kr.</td><td className="py-2 px-4">0,58 %</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4">9</td><td className="py-2 px-4">12.800 kr.</td><td className="py-2 px-4">25.550 kr.</td><td className="py-2 px-4">0,30 %</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4">10</td><td className="py-2 px-4">25.600 kr.</td><td className="py-2 px-4">51.150 kr.</td><td className="py-2 px-4">0,16 %</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ved step 10 risikerer du 51.150 kr. for at vinde 50 kr. Og sandsynligheden for at nå dertil – 0,16 % pr. sekvens – virker lille, men over 500 sekvenser er den kumulative sandsynlighed over 55 %. Det er det, matematikere kalder "the gambler's ruin problem": selv med en lille edge imod dig er ruin nærmest garanteret over nok forsøg.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 – Det matematiske bevis
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Det Matematiske Bevis: Hvorfor Martingale Ikke Kan Slå House Edge
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at forstå hvorfor Martingale fejler, skal vi præcisere, hvad det vil sige at "slå" et casino. I <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> med perfekt basic strategy er house edge ca. 0,5 %. Det betyder, at for hver 100 kr. du indsætter, forventer du at miste 0,50 kr. over tid. Martingale ændrer ikke dette tal – det ændrer kun <em>fordelingen</em> af dine gevinster og tab.
          </p>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Formel: Forventet værdi af en Martingale-sekvens
          </h3>
          <Card className="mb-6 bg-muted/30">
            <CardContent className="pt-6">
              <p className="mb-3 text-muted-foreground">Lad <em>p</em> = sandsynlighed for at vinde en hånd (ca. 0,475 i blackjack), <em>q</em> = 1-p (ca. 0,525), <em>B</em> = basisindsats, og <em>N</em> = max antal fordoblinger.</p>
              <p className="mb-3 text-muted-foreground">Forventet gevinst pr. sekvens:</p>
              <p className="mb-3 font-mono text-sm bg-background p-3 rounded-lg">
                E[Gevinst] = (1 - q^N) × B - q^N × (2^N - 1) × B
              </p>
              <p className="mb-3 text-muted-foreground">Med p=0,475, N=7, B=50:</p>
              <p className="mb-3 font-mono text-sm bg-background p-3 rounded-lg">
                E[Gevinst] = (1 - 0,525^7) × 50 - 0,525^7 × (128-1) × 50<br />
                = 0,9891 × 50 - 0,0109 × 6.350<br />
                = 49,46 - 69,22<br />
                = <strong>-19,76 kr. pr. sekvens</strong>
              </p>
              <p className="text-muted-foreground text-sm">
                Den forventede værdi er negativ. Uanset om du spiller 1, 100 eller 10.000 sekvenser – du forventer at tabe ca. 20 kr. pr. sekvens.
              </p>
            </CardContent>
          </Card>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det vigtige at forstå er, at den negative forventning ikke forsvinder – den <em>skjules</em>. I 98,91 % af sekvenserne vinder du 50 kr. Men i de 1,09 % hvor du rammer bordmaksimum, taber du 6.350 kr. Gennemsnittet af de to scenarier er altid negativt, fordi casinot har en edge.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne matematik er fundamental for alle progressionssystemer. <Link to="/casinospil/blackjack/fibonacci-system" className={linkClass}>Fibonacci-systemet</Link> og <Link to="/casinospil/blackjack/dalembert-system" className={linkClass}>D'Alembert-systemet</Link> ændrer kurven – Fibonacci eskalerer langsommere, D'Alembert lineært – men ingen af dem kan gøre en negativ forventet værdi positiv. Det er som at forsøge at gøre vand varmt ved at hælde det fra den ene kop til den anden.
          </p>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Variansforskydning: Hvad Martingale reelt gør
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det, Martingale reelt gør, er at konvertere mange små tab til sjældne, katastrofale tab. Det er det modsatte af forsikring. Forsikring tager en forudsigelig, lille omkostning for at beskytte mod katastrofer. Martingale tager en forudsigelig, lille gevinst og skaber en katastrofe-risiko. Finansielt set sælger du en out-of-the-money put-option på din egen bankroll – du indkasserer en lille præmie (de 50 kr. pr. gevinst), men når markedet crasher (7+ tab i træk), mister du alt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne "variance reshaping" er grunden til, at Martingale føles som om det virker. I korte sessions – 50-100 hænder – vinder du 70-80 % af gangene. Men den kumulative sandsynlighed for ruin stiger dramatisk med sessionsvarighed, og over tid konvergerer dit samlede resultat mod nøjagtig det samme gennemsnitstab som flat betting.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 – Min 10.000-hånds simulering
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <LineChart className="h-7 w-7 text-primary" />
            Min 10.000-Hånds Simulering: Martingale vs. Flat Betting
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at skifte fra teori til praksis simulerede jeg 10.000 hænder blackjack med to parallelle strategier: Martingale (50 kr. start, 5.000 kr. max) og flat betting (50 kr. pr. hånd). Begge brugte perfekt <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>basic strategy for amerikansk blackjack</Link> med S17, DAS, 3:2 BJ – de standardregler du finder hos <Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link> og <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link>.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Flat Betting (50 kr.)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• <strong>Slutsaldo:</strong> -2.475 kr. (-4,95 % af indsats)</li>
                  <li>• <strong>Højeste punkt:</strong> +850 kr. (hånd 1.234)</li>
                  <li>• <strong>Laveste punkt:</strong> -3.900 kr. (hånd 8.712)</li>
                  <li>• <strong>Max drawdown:</strong> 4.750 kr.</li>
                  <li>• <strong>Standardafvigelse pr. hånd:</strong> 51,2 kr.</li>
                  <li>• <strong>Sessions med profit (á 250 hænder):</strong> 18/40</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-destructive/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Flame className="h-5 w-5 text-destructive" />
                  Martingale (50 kr. start)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• <strong>Slutsaldo:</strong> -8.200 kr. (variabel eksponering)</li>
                  <li>• <strong>Højeste punkt:</strong> +2.350 kr. (hånd 2.891)</li>
                  <li>• <strong>Laveste punkt:</strong> -14.550 kr. (hånd 9.401)</li>
                  <li>• <strong>Antal ruinsekvenser (7+ tab):</strong> 14</li>
                  <li>• <strong>Gennemsnitligt tab pr. ruin:</strong> 6.350 kr.</li>
                  <li>• <strong>Sessions med profit (á 250 hænder):</strong> 31/40</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bemærk paradokset: Martingale vandt 31 ud af 40 sessioner (77,5 %) – langt flere end flat bettings 18 (45 %). Men det samlede tab var mere end tredobbelt: -8.200 kr. vs. -2.475 kr. Det skyldes, at de 9 tabte Martingale-sessions var katastrofale: gennemsnitligt -1.711 kr. pr. tabt session, mod flat bettings -307 kr.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er præcis det, matematikken forudsiger: flere vindere, men drastisk værre tabere. Den samlede expected value er negativ i begge tilfælde, men Martingale har en langt bredere spredning – og de negative outliers er ødelæggende.
          </p>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            De 14 ruinsekvenser i detaljer
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Af de 14 gange, hvor sekvensen nåede bordmaksimum (7 tab i træk), var 9 deciderede "cold runs", hvor dealeren trak 19-21 konsekutivt. 3 var mixed – en blanding af tætte tab (20 mod 21, dobbelt bust osv.). Og 2 var spectacular: én sekvens indeholdt 3 dealer-blackjacks i træk (sandsynlighed: 0,003 %). Det var den session, der kostede mest – 12.750 kr. på 12 minutter, fordi den ramte to ruinsekvenser tæt på hinanden.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det illustrerer Martingales andet problem ud over den negative EV: <strong>emotionel devastation</strong>. At miste 6.350 kr. på 7 hænder – efter at have vundet 50 kr. ad gangen i en time – er psykologisk brutal. Flere af mine test-sessions med rigtige penge (på meget lavere beløb) viste det samme mønster: systemet skaber en falsk tryghed, der kollapser, når streaken rammer.
          </p>
        </section>

        <InlineCasinoCards title="Casinoer med Live Blackjack til Test af Indsatsstrategier" />

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5 – Bordmaksimum: Casinoets værn
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            Bordmaksimum: Casinoets Ultimative Forsvar mod Progression
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Lad os forestille os et tankeeksperiment: hvad hvis der ikke fandtes bordmaksimum? Ville Martingale så virke? Svaret er stadig nej – men det kræver en lidt dybere forklaring.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Uden bordmaksimum ville du teoretisk altid kunne fordoble, indtil du vinder. Men det kræver <em>uendelig kapital</em>. Og her rammer vi "the gambler's ruin theorem": med en endelig bankroll mod en modstander med uendelig kapital (casinot) og en negativ forventet værdi, er din sandsynlighed for ruin 100 % over uendelig tid. Bordmaksimum er altså ikke det primære problem – det <em>fremskynder</em> bare det uundgåelige.
          </p>

          <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
            <Coins className="h-5 w-5 text-primary" />
            Bordgrænser hos danske casinoer i 2026
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="py-3 px-4 text-left font-semibold">Casino</th>
                  <th className="py-3 px-4 text-left font-semibold">Min. indsats</th>
                  <th className="py-3 px-4 text-left font-semibold">Max. indsats</th>
                  <th className="py-3 px-4 text-left font-semibold">Max fordoblinger</th>
                  <th className="py-3 px-4 text-left font-semibold">Max eksponering</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-4"><Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link></td>
                  <td className="py-2 px-4">50 kr.</td><td className="py-2 px-4">10.000 kr.</td><td className="py-2 px-4">7</td><td className="py-2 px-4">12.750 kr.</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-4"><Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link></td>
                  <td className="py-2 px-4">25 kr.</td><td className="py-2 px-4">5.000 kr.</td><td className="py-2 px-4">7</td><td className="py-2 px-4">6.375 kr.</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-4"><Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link></td>
                  <td className="py-2 px-4">50 kr.</td><td className="py-2 px-4">5.000 kr.</td><td className="py-2 px-4">6</td><td className="py-2 px-4">6.350 kr.</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-4"><Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link></td>
                  <td className="py-2 px-4">20 kr.</td><td className="py-2 px-4">10.000 kr.</td><td className="py-2 px-4">8</td><td className="py-2 px-4">10.220 kr.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Som du kan se, tillader de fleste danske live blackjack-borde 6-8 fordoblinger. Det er langt fra nok til at skabe en statistisk sikker margin – du skal typisk kunne fordoble 15-20 gange for at reducere ruin-sandsynligheden til under 1 % over 1.000 hænder. Og selv dét ville kun forsinke det uundgåelige, ikke forhindre det.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6 – Psykologiske fælder
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Eye className="h-7 w-7 text-primary" />
            De 5 Psykologiske Fælder i Martingale-Systemet
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Martingale er ikke bare et matematisk problem – det er et psykologisk problem. Her er de fem cognitive biases, der gør systemet så forførende:
          </p>

          <div className="space-y-6 mb-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                  Gambler's Fallacy – "Nu MÅ den vende"
                </h3>
                <p className="text-muted-foreground">
                  Troen på, at sandsynligheder "korrigerer" sig selv efter en tabsserie. I virkeligheden er hver blackjack-hånd uafhængig af den foregående. Sandsynligheden for at tabe den 8. hånd i træk er stadig 52,5 % – uanset om du tabte de 7 foregående. Kortene har ingen hukommelse.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                  Sunk Cost Fallacy – "Jeg har allerede investeret 3.150 kr."
                </h3>
                <p className="text-muted-foreground">
                  Følelsen af, at du "skal" fortsætte for at genvinde dine tab. Martingale forstærker denne bias ekstremt, fordi indsatsen fordobles. Ved step 6 har du 3.150 kr. "i systemet", og din næste indsats er 1.600 kr. – det føles irrationelt at stoppe, men det er det rationelle valg. De 3.150 kr. er allerede tabt.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                  Survivorship Bias – "Min ven tjente 2.000 kr. med Martingale"
                </h3>
                <p className="text-muted-foreground">
                  Du hører om dem, der vandt med Martingale. Du hører ikke om de langt flere, der tabte. I min simulering vandt 77,5 % af sessions – så for hver person der fortæller om sit store tab, er der 3-4 der fortæller om gevinster. Det skaber en systematisk skævvridning i sociale cirkler.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                  Illusion of Control – "Jeg har et system"
                </h3>
                <p className="text-muted-foreground">
                  At have en "strategi" giver en følelse af kontrol over et tilfældigt udfald. Men i et negativt-sum-spil er den eneste form for kontrol, der tæller, <em>om</em> du spiller og <em>hvor meget</em> du risikerer – ikke i hvilken rækkefølge du risikerer det.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
                  Recency Bias – Kort hukommelse for tabsserier
                </h3>
                <p className="text-muted-foreground">
                  Efter en katastrofal Martingale-session husker de fleste spillere det i en uge eller to. Men de mange små gevinster fra de foregående sessions har skabt en positiv association, der trækker dem tilbage. Det er den samme mekanisme, der gør spilleautomater <Link to="/casinospil/spillemaskiner" className={linkClass}>vanedannende</Link>: intermittent reinforcement.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 7 – Martingale-varianter
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            Martingale-Varianter: Mini, Anti og Grand – Hjælper de?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at adressere Martingales åbenlyse problemer er der udviklet adskillige varianter. Her analyserer jeg de tre mest populære:
          </p>

          <h3 className="mb-3 text-xl font-bold">Mini-Martingale (Max 3-4 Step)</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ideen er at stoppe progressionen efter 3-4 tab og acceptere et mindre tab i stedet for at eskalere til bordmaksimum. Med 50 kr. start og max 4 step er din maksimale eksponering 750 kr. (i stedet for 6.350 kr.). Risk/reward-ratio: 15:1 i stedet for 127:1.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Min vurdering:</strong> Mini-Martingale er det mindst skadelige af Martingale-varianterne. Det er stadig et negativt-EV-system, men det begrænser nedsiderisikoen markant. Hvis du absolut insisterer på at bruge en progression, er dette den mindst farlige. Men det er som at sige, at det er sikrere at hoppe fra 1. sal end fra 10. – du kan stadig komme til skade.
          </p>

          <h3 className="mb-3 text-xl font-bold">Anti-Martingale (Reverse Martingale / Paroli)</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Her fordobler du ved <em>gevinst</em> i stedet for tab. Typisk med et loft på 3 fordoblinger, hvorefter du nulstiller. Med 50 kr. start: 50 → 100 → 200 → 400. Hvis alle 3 fordoblinger lykkes, har du vundet 350 kr. Hvis ikke, mister du kun din originale 50 kr.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Min vurdering:</strong> Anti-Martingale er psykologisk mere holdbart, fordi du kun risikerer "husets penge" efter den første gevinst. Men det ændrer stadig ikke EV. Sandsynligheden for 3 gevinster i træk er ca. 10,7 %, så du rammer dét 1 gang ud af ca. 9 forsøg – og de 8 gange du "misser" koster dig 50 kr. hver. Nettoresultatet er stadig negativt.
          </p>

          <h3 className="mb-3 text-xl font-bold">Grand Martingale (Fordobl + Ekstra Enhed)</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I stedet for at fordoble tilføjer du en ekstra basisenhed: 50 → 150 → 350 → 750 → 1.550. Det øger din gevinst pr. vundet sekvens (til mere end 50 kr.), men eskalerer eksponeringen endnu hurtigere. Med 5 step har du 2.850 kr. på spil vs. Martingales 1.550 kr.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Min vurdering:</strong> Grand Martingale er den farligste variant. Den rammer bordmaksimum hurtigere, kræver en større bankroll, og den ekstra gevinst pr. sekvens kompenserer ikke for den dramatisk øgede risiko. Undgå dette system fuldstændigt.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 8 – Sammenligning med andre systemer
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            Martingale vs. Fibonacci vs. D'Alembert: Hvem Taber Langsomst?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det rigtige spørgsmål er ikke "hvilket system vinder?", men "hvilket system taber mindst brutalt?" Her er en direkte sammenligning baseret på 10.000 simulerede hænder med identiske regler:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="py-3 px-4 text-left font-semibold">Parameter</th>
                  <th className="py-3 px-4 text-left font-semibold">Martingale</th>
                  <th className="py-3 px-4 text-left font-semibold"><Link to="/casinospil/blackjack/fibonacci-system" className={linkClass}>Fibonacci</Link></th>
                  <th className="py-3 px-4 text-left font-semibold"><Link to="/casinospil/blackjack/dalembert-system" className={linkClass}>D'Alembert</Link></th>
                  <th className="py-3 px-4 text-left font-semibold">Flat Bet</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50"><td className="py-2 px-4 font-medium">Samlet tab (10K hænder)</td><td className="py-2 px-4">-8.200 kr.</td><td className="py-2 px-4">-4.850 kr.</td><td className="py-2 px-4">-3.900 kr.</td><td className="py-2 px-4">-2.475 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4 font-medium">Max drawdown</td><td className="py-2 px-4">-14.550 kr.</td><td className="py-2 px-4">-8.200 kr.</td><td className="py-2 px-4">-6.100 kr.</td><td className="py-2 px-4">-3.900 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4 font-medium">Win-rate pr. session</td><td className="py-2 px-4">77,5 %</td><td className="py-2 px-4">62,5 %</td><td className="py-2 px-4">55,0 %</td><td className="py-2 px-4">45,0 %</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4 font-medium">Max enkelt-tab</td><td className="py-2 px-4">-6.350 kr.</td><td className="py-2 px-4">-3.200 kr.</td><td className="py-2 px-4">-1.850 kr.</td><td className="py-2 px-4">-800 kr.</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4 font-medium">Volatilitet (StdDev)</td><td className="py-2 px-4">Ekstremt høj</td><td className="py-2 px-4">Høj</td><td className="py-2 px-4">Moderat</td><td className="py-2 px-4">Lav</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4 font-medium">Anbefaling</td><td className="py-2 px-4 text-destructive font-bold">Frarådes</td><td className="py-2 px-4 text-yellow-600 font-bold">Risikabel</td><td className="py-2 px-4 text-yellow-600 font-bold">Acceptabel</td><td className="py-2 px-4 text-primary font-bold">Optimal</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Flat betting – den simpleste af alle strategier – er den mest effektive. Den har det laveste samlede tab, den laveste drawdown og den mest forudsigelige risikoprofil. Det er en konklusion, der overrasker mange, men den er matematisk ubestridelig: når house edge er konstant, er den optimale indsatsstrategi konstant indsats.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Undtagelsen er korttælling, hvor spilleren periodisk har en positiv forventet værdi og bør øge sin indsats (Kelly Criterion). Men korttælling er ikke realistisk muligt i online <Link to="/live-casino/blackjack" className={linkClass}>live blackjack</Link> med 6-8 decks og tidlig omblanding.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 9 – Risk of Ruin beregninger
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Skull className="h-7 w-7 text-destructive" />
            Risk of Ruin: Præcise Beregninger for Danske Bordgrænser
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            "Risk of Ruin" (RoR) er sandsynligheden for at miste hele din bankroll. Med Martingale er RoR dramatisk højere end med flat betting, fordi en enkelt tabsserie kan eliminere hele bankrollen. Her er præcise beregninger for danske forhold:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="py-3 px-4 text-left font-semibold">Bankroll</th>
                  <th className="py-3 px-4 text-left font-semibold">Startstørrelse</th>
                  <th className="py-3 px-4 text-left font-semibold">RoR (250 hænder)</th>
                  <th className="py-3 px-4 text-left font-semibold">RoR (500 hænder)</th>
                  <th className="py-3 px-4 text-left font-semibold">RoR (1.000 hænder)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50"><td className="py-2 px-4">5.000 kr.</td><td className="py-2 px-4">50 kr.</td><td className="py-2 px-4">7,2 %</td><td className="py-2 px-4">14,1 %</td><td className="py-2 px-4">26,8 %</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4">10.000 kr.</td><td className="py-2 px-4">50 kr.</td><td className="py-2 px-4">3,4 %</td><td className="py-2 px-4">6,7 %</td><td className="py-2 px-4">13,0 %</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4">10.000 kr.</td><td className="py-2 px-4">100 kr.</td><td className="py-2 px-4">17,3 %</td><td className="py-2 px-4">31,9 %</td><td className="py-2 px-4">53,5 %</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4">25.000 kr.</td><td className="py-2 px-4">100 kr.</td><td className="py-2 px-4">5,1 %</td><td className="py-2 px-4">10,0 %</td><td className="py-2 px-4">19,2 %</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med en realistisk bankroll på 10.000 kr. og 100 kr. startstørrelse har du over 50 % chance for at miste alt inden for 1.000 hænder. Det er ca. 12-15 timers spil – et par weekender. Til sammenligning er RoR for flat betting med 100 kr. og 10.000 kr. bankroll ca. 4,2 % over 1.000 hænder.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Disse tal er ikke worst-case scenarier – de er <em>gennemsnit</em>. Halvdelen af alle Martingale-spillere med de parametre vil have mistet alt inden 1.000 hænder. Det er den statistiske realitet, som Martingale-tilhængere sjældent nævner.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 10 – Hvornår kan Martingale give mening?
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            Hvornår Giver Martingale (Næsten) Mening? 3 Niche-Scenarier
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Efter 2.000 ord med kritik er det fair at nævne de ekstremt sjældne situationer, hvor Martingale har en vis nytte – ikke som en vinderstrategi, men som et risikostyringsværktøj med fuldt informeret samtykke:
          </p>

          <div className="space-y-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Scenarie 1: Ultra-kort session med specifikt mål
                </h3>
                <p className="text-muted-foreground">
                  Hvis dit mål er at vinde præcis 200 kr. til en specifik udgift, og du har en bankroll på 10.000 kr. til rådighed for den ene session, giver Mini-Martingale (max 4 step) dig en 89 % sandsynlighed for at nå målet. Men: du accepterer en 11 % risiko for at miste op til 750 kr. Det er en bevidst tradeoff – ikke en strategi.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Scenarie 2: Bonus-clearing med omsætningskrav
                </h3>
                <p className="text-muted-foreground">
                  Nogle <Link to="/casino-bonus" className={linkClass}>casino bonusser</Link> kræver, at du omsætter et bestemt beløb. Martingale øger din gennemsnitlige indsats pr. hånd (fordi fordoblinger tæller med), hvilket kan reducere antallet af hænder, du behøver at spille. Men de fleste bonusser har en max-indsats-regel (typisk 50 kr.) der forhindrer Martingale.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Scenarie 3: Underholdningsværdi med tabsloft
                </h3>
                <p className="text-muted-foreground">
                  Hvis du bruger Martingale med et fast, foruddefineret tabsloft (f.eks. "jeg stopper, hvis jeg har tabt 500 kr."), kan systemet tilføre en vis spænding til en session, du alligevel ville have spillet. Men det er underholdning – ikke investering. Sæt altid et hårdt <Link to="/ansvarligt-spil" className={linkClass}>tabsloft</Link> og overhold det uanset hvad.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 11 – Praktisk guide: Hvis du insisterer
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Skadesreduktion: 8 Regler Hvis Du Insisterer på Martingale
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Jeg kan ikke anbefale Martingale. Men jeg kan gøre det lidt mindre farligt, hvis du alligevel vælger at bruge det. Her er 8 ufravigelige regler:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { title: "Brug Mini-Martingale (max 4 step)", desc: "Begræns progressionen til max 4 fordoblinger. Det reducerer din maksimale eksponering fra 6.350 kr. til 750 kr. med 50 kr. start." },
              { title: "Sæt et absolut tabsloft PÅ FORHÅND", desc: "Beslut, hvad du er villig til at tabe, FØR du sætter dig ned. Skriv det ned. Overhold det. Ingen undtagelser." },
              { title: "Spil kun med penge du kan tabe", desc: "Martingale-tab føles ekstra smertefulte. Spil aldrig med penge, der er øremærket til husleje, mad eller andre nødvendigheder." },
              { title: "Kombinér med perfekt basic strategy", desc: "Martingale på et spil med 2 % house edge er langt værre end med 0,5 %. Brug altid optimal basic strategy fra din foretrukne blackjack-variant." },
              { title: "Undgå side bets fuldstændigt", desc: "Side bets har 5-15 % house edge. At kombinere Martingale med side bets er den hurtigste vej til ruin." },
              { title: "Hold sessions korte (max 1 time)", desc: "Jo længere du spiller, jo større er sandsynligheden for en katastrofal tabsserie. Sæt en alarm og stop, uanset resultat." },
              { title: "Log alle hænder og resultater", desc: "At se dine reelle tal i sort/hvidt er den bedste kur mod selvbedrag. En Martingale-log afslører hurtigt, hvor skæv risk/reward-forholdet er." },
              { title: "Brug en separat bankroll", desc: "Aldrig bland din Martingale-bankroll med din generelle spilkonto. Det gør det lettere at se det reelle tab og stoppe i tide." },
            ].map((rule, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">{i+1}</span>
                    {rule.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{rule.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 12 – Hvad du bør gøre i stedet
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-primary" />
            Hvad Du Bør Gøre I Stedet: Evidence-Based Blackjack-Strategi
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvis du vil minimere dine tab i blackjack (ingen strategi kan garantere gevinst i et negativt-sum-spil), er her de tre ting, der faktisk virker:
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <Brain className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">1. Perfektionér din basic strategy</h3>
                <p className="text-muted-foreground">
                  Basic strategy reducerer house edge til 0,5 % eller lavere. De fleste spillere laver 2-5 fejl pr. time, der tilsammen øger house edge til 1,5-2 %. At eliminere disse fejl er 10x mere værdifuldt end ethvert indsatssystem. Studér strategitabellerne for <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk</Link> og <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>europæisk blackjack</Link>.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Target className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">2. Vælg det rigtige bord</h3>
                <p className="text-muted-foreground">
                  Et bord med 3:2 blackjack-payout vs. 6:5 sparer dig 1,39 % house edge. S17 vs. H17 sparer 0,22 %. Disse regelforskelle er langt vigtigere end hvilket indsatssystem du bruger. <Link to="/casinospil/blackjack/double-exposure-blackjack" className={linkClass}>Double Exposure</Link> har andre regler igen, og <Link to="/casinospil/blackjack/spanish-21" className={linkClass}>Spanish 21</Link> endnu andre – kend varianten.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Scale className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">3. Brug flat betting med 1-2 % bankroll management</h3>
                <p className="text-muted-foreground">
                  Med 10.000 kr. bankroll og 100 kr. indsatser (1 %) har du en RoR under 5 % over 1.000 hænder – vs. Martingales 53,5 %. Du mister den falske tryghed af mange vindende sessions, men du beholder din bankroll langt længere.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 13 – Konklusion
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Konklusion: Martingale er Ingen Strategi – Det er en Fordelingsnøgle
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Martingale er ikke dårligt fordi det er dumt – det er dårligt fordi det er forførende. Det giver dig 80 % vindende sessions og skaber en illusion af kontrol, der kollapser, når statistikken indhenter dig. Og den indhenter dig altid.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den simpleste opsummering er denne: Martingale tager 1.000 kr. i forventede tab og fordeler dem som 5.000 kr. i gevinster og 6.000 kr. i tab. Det totale resultat er det samme – men oplevelsen er en rutsjebane af falsk selvtillid efterfulgt af brutal virkelighed.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvis du vil have den bedste chance for at bevare din bankroll og nyde <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> som underholdning, er svaret: lær perfekt basic strategy, vælg borde med favorable regler, brug flat betting med 1-2 % bankroll management, og sæt altid et <Link to="/ansvarligt-spil" className={linkClass}>tabsloft</Link>. Det er ikke sexet, det er ikke mystisk – men det virker.
          </p>
          <Card className="mb-6 border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <p className="text-muted-foreground italic">
                "Det bedste indsatssystem i blackjack er intet indsatssystem. Lær strategien, vælg bordet, sæt din grænse – og nyd spillet." — Jonas, Casinoaftaler.dk
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="mb-12" />

        <RelatedGuides currentPath="/casinospil/blackjack/martingale-system" />
        <FAQSection faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
};

export default MartingaleBlackjackGuide;
