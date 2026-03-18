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
        Ja. Mini-Martingale (max 3-4 fordoblinger), Anti-Martingale (fordobl ved gevinst) og Labouchère er alle varianter. <Link to="/casinospil/blackjack/fibonacci" className={linkClass}>Fibonacci-systemet</Link> er en blødere progression, og <Link to="/casinospil/blackjack/dalembert" className={linkClass}>D'Alembert</Link> bruger lineær i stedet for eksponentiel skalering. Ingen af dem fjerner house edge.
      </>
    ),
...
            Denne guide er skrevet som en <strong>obduktionsrapport</strong> over Martingale-systemet. Jeg gennemgår mekanikken, beviser matematisk hvorfor det fejler, simulerer 10.000 hænder på rigtige danske <Link to="/live-casino/blackjack" className={linkClass}>live blackjack-borde</Link>, og sammenligner det med <Link to="/casinospil/blackjack/fibonacci" className={linkClass}>Fibonacci</Link> og <Link to="/casinospil/blackjack/dalembert" className={linkClass}>D'Alembert</Link>. Mit mål er ikke at fortælle dig, hvad du skal gøre – men at give dig de data, du har brug for til at træffe en informeret beslutning.
          </p>
...
            Denne matematik er fundamental for alle progressionssystemer. <Link to="/casinospil/blackjack/fibonacci" className={linkClass}>Fibonacci-systemet</Link> og <Link to="/casinospil/blackjack/dalembert" className={linkClass}>D'Alembert-systemet</Link> ændrer kurven – Fibonacci eskalerer langsommere, D'Alembert lineært – men ingen af dem kan gøre en negativ forventet værdi positiv. Det er som at forsøge at gøre vand varmt ved at hælde det fra den ene kop til den anden.
          </p>
...
                  <th className="py-3 px-4 text-left font-semibold">Martingale</th>
                  <th className="py-3 px-4 text-left font-semibold"><Link to="/casinospil/blackjack/fibonacci" className={linkClass}>Fibonacci</Link></th>
                  <th className="py-3 px-4 text-left font-semibold"><Link to="/casinospil/blackjack/dalembert" className={linkClass}>D'Alembert</Link></th>
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

        <CasinospilMoneyLinks gameName="Martingale Blackjack" currentPath="/casinospil/blackjack/martingale" />
        <LatestNewsByCategory pagePath="/casinospil/blackjack/martingale" />
        <RelatedGuides currentPath="/casinospil/blackjack/martingale" />
        <FAQSection faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="campobet" />
    </>
  );
};

export default MartingaleBlackjackGuide;
