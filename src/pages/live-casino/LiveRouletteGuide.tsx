import React from "react";
import liveRouletteHero from "@/assets/heroes/live-roulette-hero.jpg";
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
import { Sparkles, Target, BarChart3, AlertTriangle, Timer, Zap, Eye } from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80 font-medium";

const faqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er house edge på europæisk vs. amerikansk live roulette?",
    answer: "Europæisk live roulette har en house edge på 2,70 % med et enkelt nul (0). Amerikansk roulette har et dobbelt nul (0 og 00), hvilket øger house edge til 5,26 %. French roulette med La Partage-reglen halverer house edge på even-money bets til 1,35 %. For danske spillere: spil altid europæisk eller French roulette – aldrig amerikansk.",
  },
  {
    question: "Virker roulette-systemer som Martingale i live roulette?",
    answer: "Nej, intet betting-system ændrer house edge. Martingale (dobling efter tab) fungerer kortsigtet, men kræver uendelig bankroll og ingen bordmaksimum for at være risikofri – begge dele er umulige i praksis. Ved 10 tab i træk (sandsynlighed 1:613 pr. serie) kræves 51.200 kr. indsats for at genvinde 50 kr. Systemet giver mange små gevinster og sjældne katastrofale tab.",
  },
  {
    question: "Hvad er forskellen på live roulette og Lightning Roulette?",
    answer: (
      <>
        Standard europæisk <Link to="/casinospil/roulette" className={linkClass}>roulette</Link> udbetaler 35:1 på straight-up bets med 2,70 % house edge. Lightning Roulette reducerer straight-up udbetalingen til 29:1 men tilføjer tilfældige multiplikatorer (50x-500x) på 1-5 tal pr. spin. House edge stiger marginalt til 2,78 %, men volatiliteten er dramatisk højere. For dybere analyse, se vores <Link to="/live-casino/lightning-roulette" className={linkClass}>dedikerede Lightning Roulette guide</Link>.
      </>
    ),
  },
  {
    question: "Hvilke bordtyper findes i live roulette?",
    answer: "De mest udbredte er: Europæisk Roulette (standard, 2,70 % edge), Speed Roulette (25 sek/spin), Auto Roulette (ingen dealer, mekanisk hjul), Immersive Roulette (slow-motion kameravinkler), Double Ball Roulette (to kugler, unikke bets), og French Roulette (La Partage-regel, 1,35 % edge på even money). Hvert format har sine fordele afhængigt af din spillestil.",
  },
  {
    question: "Hvad er den bedste strategi for live roulette?",
    answer: "Der er ingen strategi, der slår house edge. Den matematisk bedste tilgang er at spille French roulette med La Partage (1,35 % edge) og holde sig til even-money bets. Undgå five-number bet i amerikansk roulette (7,89 % edge). Brug flat betting (samme indsats hver spin) og sæt en fast tabsgrænse. Variation i indsatstype ændrer volatiliteten men ikke den forventede værdi.",
  },
  {
    question: "Hvor mange spins pr. time i live vs. auto roulette?",
    answer: "Standard live roulette: 25-35 spins/time. Speed Roulette: 50-60 spins/time. Auto Roulette: 60-80 spins/time. RNG roulette: 120+ spins/time. Flere spins = hurtigere bankroll-erosion. Ved 50 kr. indsats og 2,70 % edge taber du gennemsnitligt 34 kr./time i standard vs. 108 kr./time i Auto Roulette. Tempoet er den vigtigste variabel for dit faktiske tab.",
  },
  {
    question: "Er live roulette-hjulet virkelig tilfældigt?",
    answer: "Ja. Live roulette-hjul er præcisionsfremstillede med tolerancer under 0,5 mm og kalibreres dagligt. Uafhængige testlaboratorier (GLI, eCOGRA, BMM) verificerer statistisk tilfældighed over millioner af spins. Bias-exploitation – at finde fysiske defekter i hjulet – er praktisk talt umuligt med moderne udstyr. Resultater overvåges i realtid af OCR-systemer og sammenlignes med forventede fordelinger.",
  },
];

const LiveRouletteGuide = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Live Roulette – Bordtyper, House Edge & Strategi 2026",
    description: "Komplet live roulette guide 2026. House edge 2,70 % (EU) vs. 5,26 % (US), bordtyper, tempoanalyse og bankroll management for danske spillere.",
    url: `${SITE_URL}/live-casino/roulette`,
    datePublished: "2026-02-18",
    dateModified: "2026-02-18",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Live Roulette – Bordtyper, Edge & Strategi"
        description="Live roulette 2026: House edge 2,70 % (EU) vs. 1,35 % (French). Bordtyper, tempoanalyse, betting-systemer og bankroll management. Dansk licens."
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
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Live Roulette – Bordtyper, House Edge & Strategi
            </h1>
            <p className="text-lg text-white/80">
              Fra europæisk og French roulette til Speed og Immersive – en komplet analyse af bordtyper, house edge-matematik og bankroll management i live roulette.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="18-02-2026" readTime="13 Min." />

        <img src={liveRouletteHero} alt="Live roulette hjul i et elegant casino studio med dealer" className="w-full max-h-[400px] object-cover rounded-xl mb-10" loading="eager" />

        <p className="mb-6 text-muted-foreground leading-relaxed">
          Denne side er en del af vores <Link to="/live-casino" className={linkClass}>komplette live casino guide</Link>. Her fokuserer vi udelukkende på live roulette med rigtig dealer – det mest ikoniske casinospil, nu tilgængeligt i HD med multi-angle kameraer og op til 80 spins i timen.
        </p>

        {/* H2 #1 – Roulettens bordtyper */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bordtyper i live roulette – en komplet oversigt</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Live roulette er ikke ét spil – det er en familie af varianter med markant forskellige hastigheder, regler og house edges. At forstå forskellene er afgørende for at vælge det rigtige bord til din spillestil og dit budget.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Europæisk Roulette</strong> er standarden med et enkelt nul og 37 numre (0-36). House edge: 2,70 %. Det er det mest udbredte format hos danske licenserede casinoer og det anbefalede startpunkt for alle spillere. Tempoet er komfortabelt med 25-35 spins pr. time, hvilket giver god tid til at overveje indsatser.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>French Roulette med La Partage</strong> er den matematisk mest fordelagtige variant. La Partage-reglen betyder, at du kun taber halvdelen af din indsats på even-money bets (rød/sort, lige/ulige) når kuglen lander på 0. Dette halverer house edge på disse bets til 1,35 % – lavere end baccarat banker (1,06 % ekskl. kommission). French roulette er sjældnere i live format, men Evolution tilbyder det.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Speed Roulette</strong> komprimerer runderne til 25 sekunder fra spin til resultat. Det betyder 50-60 spins/time – næsten dobbelt så mange som standard. For en spiller med 50 kr. gennemsnitlig indsats øger dette det forventede tab fra 34 kr./time til ca. 68 kr./time. Speed Roulette er for erfarne spillere, der har deres indstatsplan klar – ikke for dem, der overvejer mens hjulet spinner.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Immersive Roulette</strong> tilbyder den mest cinematiske oplevelse med slow-motion replays af kuglens landing i 200 fps. Tempoet er lidt langsommere end standard (20-25 spins/time), og det er det mest visuelt imponerende format. House edge er identisk med europæisk standard.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Auto Roulette</strong> kører uden dealer – kun et mekanisk hjul og automatiseret kugleudsendelse. Tempoet er højest (60-80 spins/time), og minimumsindsatserne er typisk de laveste (fra 2 kr.). Det er effektivt for volumen-spillere, men det langt højere tempo æder bankrollen hurtigere.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #2 – House edge */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">House edge i live roulette – den komplette matematik</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I modsætning til <Link to="/live-casino/blackjack" className={linkClass}>live blackjack med dealer</Link>, hvor din strategi påvirker house edge, er roulette et rent chancespil. House edge er fast og ufravigelig – men den varierer markant mellem varianter og bet-typer.
          </p>
          <Card className="border-border bg-card mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 px-4 text-left">Variant</th>
                      <th className="py-2 px-4 text-left">Bet-type</th>
                      <th className="py-2 px-4 text-left">House Edge</th>
                      <th className="py-2 px-4 text-left">RTP</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">French (La Partage)</td>
                      <td className="py-2 px-4">Even money</td>
                      <td className="py-2 px-4 text-primary font-semibold">1,35 %</td>
                      <td className="py-2 px-4">98,65 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Europæisk</td>
                      <td className="py-2 px-4">Alle bets</td>
                      <td className="py-2 px-4">2,70 %</td>
                      <td className="py-2 px-4">97,30 %</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Amerikansk</td>
                      <td className="py-2 px-4">Standard bets</td>
                      <td className="py-2 px-4 text-destructive">5,26 %</td>
                      <td className="py-2 px-4">94,74 %</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">Amerikansk</td>
                      <td className="py-2 px-4">Five-number bet</td>
                      <td className="py-2 px-4 text-destructive font-semibold">7,89 %</td>
                      <td className="py-2 px-4">92,11 %</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Den vigtigste konklusion: spil <strong>aldrig</strong> amerikansk roulette hvis europæisk er tilgængeligt. Forskellen er næsten dobbelt house edge – det svarer til at frivilligt betale dobbelt pris for den samme oplevelse. French roulette med La Partage er det absolutte optimum for even-money bets.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #3 – Betting systemer */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betting-systemer – matematisk realitetscheck</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Roulette-systemer har eksisteret i århundreder, og de har til fælles, at ingen af dem ændrer den matematiske forventning. House edge er 2,70 % pr. spin, uanset om du bruger Martingale, Fibonacci, D'Alembert eller Labouchère. Hvad systemerne ændrer er <em>volatilitetsprofilen</em> – fordelingen mellem gevinst- og tabsfrekvens.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Martingale</strong> (dobling efter tab): Producerer mange små gevinster (1 enhed pr. vindende serie) og sjældne katastrofale tab. Ved 10 tab i træk på rød/sort (sandsynlighed 1:613) kræves en indsats på 1.024 enheder for at vinde 1 enhed. Med 50 kr. startindsats er det 51.200 kr. – og bordmaksimum stopper dig typisk ved 5.000-10.000 kr.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>D'Alembert</strong> (øg med 1 efter tab, reducér med 1 efter gevinst): Mere konservativ end Martingale med langsommere progression. Producerer en glattere bankroll-kurve, men den forventede værdi er identisk. Du taber stadig 2,70 % af alle penge, du sætter i spil, over tid.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Den ærlige konklusion:</strong> Intet betting-system kan overvinde house edge i roulette. For at forstå, hvordan <Link to="/casinospil/roulette" className={linkClass}>roulette-matematik</Link> fungerer i detaljer, se vores dedikerede rouletteguide. Den eneste "strategi" er at vælge den variant med lavest house edge (French, La Partage), bruge flat betting, og sætte en fast tabsgrænse.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #4 – Tempo og bankroll */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Tempoanalyse og bankroll management</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tempo er den mest undervurderede variabel i roulette. House edge pr. spin er fast, men antallet af spins pr. time varierer enormt mellem formater – og det er det, der bestemmer dit faktiske tab.
          </p>
          <Card className="border-border bg-card mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 px-4 text-left">Format</th>
                      <th className="py-2 px-4 text-left">Spins/time</th>
                      <th className="py-2 px-4 text-left">Forventet tab/time (50 kr., EU)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Immersive Roulette</td>
                      <td className="py-2 px-4">22</td>
                      <td className="py-2 px-4 text-primary font-semibold">30 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Standard Live</td>
                      <td className="py-2 px-4">30</td>
                      <td className="py-2 px-4">41 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Speed Roulette</td>
                      <td className="py-2 px-4">55</td>
                      <td className="py-2 px-4">74 kr.</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">Auto Roulette</td>
                      <td className="py-2 px-4">70</td>
                      <td className="py-2 px-4 text-destructive">95 kr.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Bankroll-anbefaling:</strong> For en 2-timers session med standard live roulette (60 spins totalt) og 50 kr. gennemsnitlig indsats bør din bankroll være minimum 1.500-2.000 kr. (30-40x indsats). Dette giver under 10 % sandsynlighed for at gå bust i sessionen, selv med uheldig varians.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Husk: roulette er et spil med <strong>høj varians</strong> sammenlignet med blackjack. I en enkelt session kan du nemt vinde eller tabe 20-30x din gennemsnitlige indsats. Det er normal statistisk variation, ikke et tegn på held eller uheld. Langsigtet konvergerer alle resultater mod -2,70 % pr. indsat krone. Spil altid <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #5 – Roulette-bord valg */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvordan vælger du det rigtige live roulette-bord?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med 50+ live roulette-borde hos de fleste danske casinoer kan det virke overvældende. Her er en struktureret tilgang til bordvalg baseret på din profil.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Hvis du optimerer for lavest house edge:</strong> French Roulette med La Partage (1,35 %) med even-money bets. Acceptér det lidt langsommere tempo og den mere formelle atmosfære.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Hvis du vil have den bedste oplevelse:</strong> Immersive Roulette med slow-motion replays og multiple kameravinkler. House edge er standard (2,70 %), men produktionsværdien er den højeste i live roulette.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Hvis du vil spille mange runder hurtigt:</strong> Speed Roulette eller Auto Roulette. Vær opmærksom på, at det øgede tempo øger dit forventede tab pr. time proportionalt. Sæt en streng tidsgrænse.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Hvis du søger store gevinster:</strong> Overvej <Link to="/live-casino/lightning-roulette" className={linkClass}>Lightning Roulette</Link> for multiplikatorer op til 500x, eller kombiner med <Link to="/live-casino/baccarat" className={linkClass}>live baccarat</Link> for lavere house edge med bedre kort-dynamik. Husk at høj gevinstpotentiale altid kommer med højere varians.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #6 – Ansvarligt spil */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Ansvarligt spil ved roulettebordet</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Roulette har en unik psykologisk profil, der gør det vigtigt at forstå de adfærdsmæssige faldgruber. "Gambler's fallacy" – troen på at en farve "skyldes" efter en serie af den modsatte – er den mest udbredte kognitiv bias ved roulettebordet. Hvert spin er uafhængigt, og rød har præcis 48,65 % sandsynlighed uanset de foregående 100 resultater.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Sæt en tabsgrænse og en tidsgrænse. Brug de værktøjer, som danske licenserede casinoer tilbyder: indbetalingsgrænser, session-timers og reality checks. Har du brug for hjælp, kontakt <strong>StopSpillet</strong> (70 22 28 25) eller selvudeluk via <strong>ROFUS</strong>. Du skal være 18+ for at spille hos casinoer med dansk licens.
          </p>
        </section>

        <InlineCasinoCards count={1} />

        <FAQSection title="Ofte stillede spørgsmål om live roulette" faqs={faqs} />
        <AuthorBio author="jonas" />
        <RelatedGuides currentPath="/live-casino/roulette" />
      </div>
    </>
  );
};

export default LiveRouletteGuide;
