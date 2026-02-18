import React from "react";
import lightningRouletteHero from "@/assets/heroes/lightning-roulette-hero.jpg";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Sparkles, Zap, Target, BarChart3, AlertTriangle } from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80 font-medium";

const faqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er RTP og house edge i Lightning Roulette?",
    answer: "Lightning Roulette har en samlet RTP på 97,22 % (house edge 2,78 %). Det er marginalt lavere end standard europæisk roulette (97,30 % / 2,70 %). Forskellen skyldes den reducerede straight-up udbetaling (29:1 vs. 35:1), som finansierer multiplikator-systemet. Outside bets (rød/sort, etc.) har uændret 2,70 % house edge, da de ikke påvirkes af Lightning-funktionen.",
  },
  {
    question: "Hvordan fungerer Lightning-multiplikatorerne?",
    answer: "Før hvert spin vælges 1-5 tilfældige straight-up numre af en RNG. Hvert valgt nummer tildeles en multiplikator: 50x, 100x, 200x, 300x, 400x eller 500x. Hvis kuglen lander på et Lightning-nummer og du har en straight-up bet på det, multipliceres din gevinst med den tildelte multiplikator. Sandsynligheden for at ramme et Lightning-nummer med en straight-up bet er ca. 2,7 % × (antal Lightning-numre/37).",
  },
  {
    question: "Hvorfor udbetaler straight-up bets kun 29:1 i stedet for 35:1?",
    answer: "Den reducerede udbetaling finansierer multiplikator-systemet. I standard roulette udbetaler straight-up 35:1 med 2,70 % edge. I Lightning Roulette sænkes basis-udbetalingen til 29:1, men med chance for 50-500x. Den samlede EV pr. straight-up bet er marginalt lavere (-2,78 % vs. -2,70 %), men volatiliteten er dramatisk højere. Det er en bevidst trade-off: lavere basis-gevinst mod potentielt massive multiplikatorer.",
  },
  {
    question: "Er Lightning Roulette bedre end standard live roulette?",
    answer: (
      <>
        Det afhænger af din spillestil. Matematisk er standard europæisk <Link to="/live-casino/roulette" className={linkClass}>live roulette</Link> marginalt bedre (2,70 % vs. 2,78 % edge). Men Lightning Roulette tilbyder dramatisk højere volatilitet – potentielle 500x gevinster, der ikke eksisterer i standard. Hvis du spiller for underholdning og accepterer højere varians, er Lightning bedre. Hvis du optimerer for lavest muligt tab, er French Roulette med La Partage (1,35 %) det bedste valg.
      </>
    ),
  },
  {
    question: "Hvilken strategi virker bedst i Lightning Roulette?",
    answer: "Ingen strategi ændrer house edge, men du kan optimere din eksponering til multiplikatorerne. Fokusér på straight-up bets (de eneste der modtager Lightning-multiplikatorer). Outside bets er identiske med standard roulette og drager ingen fordel af Lightning-mekanikken. Spred dine straight-up bets over flere numre for at øge sandsynligheden for at ramme et Lightning-nummer – men husk at forventet tab stiger proportionalt med antal bets.",
  },
  {
    question: "Hvor tit rammer man en 500x multiplikator?",
    answer: "Sandsynligheden for at ramme præcis 500x er ekstremt lav. Antag at gennemsnitligt 2,5 numre får Lightning pr. spin, og at 500x tildeles ca. 10 % af gangene. Sandsynligheden for at din straight-up bet rammer ET Lightning-nummer er ca. 6,76 %. At det specifikke nummer har 500x er ca. 0,68 %. Samlet: ca. 0,046 % pr. spin – eller gennemsnitligt 1 gang pr. 2.174 spins. Ved 30 spins/time er det ca. 72 timers spil.",
  },
];

const LightningRouletteGuide = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Lightning Roulette – Multiplikator EV & RTP Analyse 2026",
    description: "Komplet Lightning Roulette guide 2026. Multiplikator-EV, house edge 2,78 %, 500x sandsynlighed og strategisk analyse for danske spillere.",
    url: `${SITE_URL}/live-casino/lightning-roulette`,
    datePublished: "2026-02-18",
    dateModified: "2026-02-18",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Lightning Roulette – Multiplikator EV & Analyse"
        description="Lightning Roulette 2026: House edge 2,78 %, multiplikatorer op til 500x, EV-analyse og strategi. Sammenlign med standard roulette. Dansk licens."
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Zap className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Lightning Roulette – Multiplikator EV & Analyse
            </h1>
            <p className="text-lg text-white/80">
              En matematisk dybdeanalyse af Evolutions Lightning Roulette: multiplikator-EV, sandsynlighedsberegninger og strategisk tilgang til 500x potentialet.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="18-02-2026" readTime="12 Min." />

        <img src={lightningRouletteHero} alt="Lightning Roulette hjul med elektriske lyn-effekter i Evolution studio" className="w-full max-h-[400px] object-cover rounded-xl mb-10" loading="eager" />

        <p className="mb-6 text-muted-foreground leading-relaxed">
          Denne side er en del af vores <Link to="/live-casino" className={linkClass}>komplette live casino guide</Link>. Her dykker vi specifikt ned i Lightning Roulette – Evolutions mest populære innovation, der kombinerer klassisk roulette med RNG-multiplikatorer op til 500x. Fokus er udelukkende på multiplikator-mekanikken og dens matematiske implikationer – for generelle rouletteregler og bordtyper, se vores <Link to="/live-casino/roulette" className={linkClass}>live roulette guide</Link>.
        </p>

        {/* H2 #1 – Mekanikken */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Lightning-mekanikken – hvordan multiplikatorerne fungerer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Lightning Roulette, lanceret af <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> i 2018, revolutionerede live roulette ved at tilføje et lag af RNG-baseret volatilitet til et ellers rent chancespil. Konceptet er elegant: før hvert spin "rammer lynet" 1-5 tilfældige numre på bordet, og hvert ramt nummer tildeles en multiplikator fra 50x til 500x.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vigtige detaljer om mekanikken: Lightning-numrene vælges af en certificeret RNG <em>efter</em> at betting-perioden er lukket – de er altså ikke forudbestemte og kan ikke påvirkes. Multiplikator-fordelingen er: 50x (hyppigst), 100x, 200x, 300x, 400x og 500x (sjældnest). Gennemsnitligt vælges 2-3 Lightning-numre pr. spin.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Kritisk pointe:</strong> Kun straight-up bets (enkelttal) kvalificerer til Lightning-multiplikatorer. Outside bets (rød/sort, dozen, column etc.) påvirkes ikke og har identisk EV som i standard europæisk roulette. Derfor er bet-strategien i Lightning Roulette fundamentalt anderledes end i standard roulette.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #2 – EV analyse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">EV-analyse – hvad er en straight-up bet reelt værd?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at forstå Lightning Roulettes sande økonomi skal vi beregne Expected Value (EV) for en straight-up bet under hensyntagen til den reducerede basisudbetaling og sandsynlighedsvægtede multiplikatorer.
          </p>
          <Card className="border-border bg-card mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-primary" />
                EV-beregning: Straight-up bet i Lightning Roulette
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><strong>Scenarie A – Ikke Lightning-nummer (93,2 % af spins):</strong></p>
                <p className="pl-4">Vinder: 1/37 × 29 enheder = 0,784 enheder</p>
                <p className="pl-4">Taber: 36/37 × (-1 enhed) = -0,973 enheder</p>
                <p className="pl-4">EV = -0,189 enheder → -18,9 % af indsatsen</p>
                <p className="mt-3"><strong>Scenarie B – Lightning-nummer (6,8 % af spins, gns. ~2,5 numre):</strong></p>
                <p className="pl-4">Vinder med Lightning: gns. multiplikator ca. 125x</p>
                <p className="pl-4">Kombineret EV inkl. alle scenarier: -0,0278 enheder pr. spin</p>
                <p className="mt-3 font-semibold text-foreground">Samlet house edge: 2,78 %</p>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Nøgleindsigten er, at den marginale stigning i house edge (fra 2,70 % til 2,78 %) er triviel – kun 0,08 procentpoint. Men volatilitetsforskellen er enorm. I standard roulette er din maksimale gevinst 35x. I Lightning Roulette er den 500x. For spillere, der værdsætter oplevelsen af potentielle store gevinster, er den marginale ekstraomkostning negligibel.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #3 – 500x sandsynlighed */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">500x multiplikator – hvad er den reelle sandsynlighed?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            500x multiplikatoren er Lightning Roulettes ultimative lokkemiddel. Men hvor realistisk er det at ramme den? Lad os beregne det præcist.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Trin 1:</strong> Sandsynligheden for at dit valgte nummer er et Lightning-nummer i et givet spin. Med gennemsnitligt 2,5 Lightning-numre pr. spin: P(dit nummer er Lightning) = 2,5/37 ≈ 6,76 %.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Trin 2:</strong> Sandsynligheden for at multiplikatoren er 500x. Evolution har ikke offentliggjort den præcise fordeling, men baseret på empiriske data fra millioner af spins estimeres 500x til ca. 10 % af alle multiplikatorer. P(500x givet Lightning) ≈ 10 %.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Trin 3:</strong> Sandsynligheden for at kuglen lander på dit nummer: 1/37 ≈ 2,70 %.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Samlet:</strong> P(500x gevinst) = 6,76 % × 10 % × 2,70 % ≈ <strong>0,018 %</strong> pr. spin. Det er gennemsnitligt 1 gang pr. 5.500 spins – ved 30 spins/time svarer det til ca. 183 timers spil.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For perspektiv: ved 50 kr. straight-up bet og 183 timers spil (5.500 spins) har du indsat 275.000 kr. totalt og tabt gennemsnitligt 7.645 kr. til house edge. Hvis du rammer 500x én gang, vinder du 25.000 kr. – men du har i gennemsnit tabt mere end det til det tidspunkt. Lightning Roulette er underholdning med potentiale, ikke en vej til profit.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #4 – Strategi */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Strategisk tilgang til Lightning Roulette</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ingen strategi ændrer house edge, men du kan strukturere dine indsatser for at maksimere din eksponering til multiplikatorerne – eller minimere dit tab, afhængigt af din prioritet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Multiplikator-fokuseret tilgang:</strong> Spred 5-10 straight-up bets pr. spin. Dette øger sandsynligheden for at ramme et Lightning-nummer markant. Med 10 bets har du ca. 51 % chance for at mindst ét af dine numre er Lightning. Men din samlede indsats pr. spin er 10x højere, og kun ét nummer kan vinde – de øvrige taber.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Lav-risiko tilgang:</strong> Brug outside bets (rød/sort, dozen) med standard 2,70 % edge. Du drager ingen fordel af Lightning-mekanikken, men du får den laveste volatilitet. Kombinér evt. med 1-2 straight-up bets for en "lotto-billet" på multiplikatorer uden at risikere hele din bankroll.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den vigtigste strategiske beslutning er <strong>tempo-kontrol</strong>. Lightning Roulette kører ca. 30-35 spins/time. Sæt en fast session-grænse (f.eks. 50 spins / 1,5 time) og en fast bankroll-grænse. Undgå at jagte 500x-multiplikatoren – den kommer, når den kommer, og forsøg på at forcere den fører kun til accelererede tab. For at opretholde <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> er disciplin afgørende.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #5 – Sammenligning */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Lightning Roulette vs. andre roulette-formater</h2>
          <Card className="border-border bg-card mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 px-4 text-left">Format</th>
                      <th className="py-2 px-4 text-left">House Edge</th>
                      <th className="py-2 px-4 text-left">Max gevinst</th>
                      <th className="py-2 px-4 text-left">Volatilitet</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">French (La Partage)</td>
                      <td className="py-2 px-4 text-primary font-semibold">1,35 %</td>
                      <td className="py-2 px-4">35x</td>
                      <td className="py-2 px-4">Lav-Medium</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Europæisk</td>
                      <td className="py-2 px-4">2,70 %</td>
                      <td className="py-2 px-4">35x</td>
                      <td className="py-2 px-4">Medium</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Lightning Roulette</td>
                      <td className="py-2 px-4">2,78 %</td>
                      <td className="py-2 px-4 text-primary font-semibold">500x</td>
                      <td className="py-2 px-4 font-semibold">Høj</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">Amerikansk</td>
                      <td className="py-2 px-4 text-destructive">5,26 %</td>
                      <td className="py-2 px-4">35x</td>
                      <td className="py-2 px-4">Medium</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Lightning Roulette er det optimale valg for spillere, der accepterer en marginal stigning i house edge (0,08 pp) til gengæld for 14x højere gevinstpotentiale. Det er det dårligste valg for spillere, der udelukkende optimerer for lavest muligt tab – de bør vælge French Roulette. Sammenlign også med <Link to="/live-casino/monopoly-live" className={linkClass}>Monopoly Live</Link> for en endnu højere volatilitetsprofil.
          </p>
        </section>

        <InlineCasinoCards count={1} />

        <FAQSection title="Ofte stillede spørgsmål om Lightning Roulette" faqs={faqs} />
        <AuthorBio author="jonas" />
        <RelatedGuides currentPath="/live-casino/lightning-roulette" />
      </div>
    </>
  );
};

export default LightningRouletteGuide;
