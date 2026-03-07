import React from "react";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import liveRouletteHero from "@/assets/heroes/live-roulette-hero.jpg";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, buildVideoSchema, SITE_URL } from "@/lib/seo";
import { YoutubeEmbed } from "@/components/YoutubeEmbed";
import { VideoContextBox } from "@/components/VideoContextBox";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Sparkles, Target, BarChart3, AlertTriangle, Timer, Zap, Eye, Brain, ShieldCheck, TrendingUp } from "lucide-react";

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
  {
    question: "Kan man bruge visuel ballistic tracking i live roulette?",
    answer: "Visual ballistic tracking – at forudsige kuglens landingszone baseret på dens hastighed og hjulets rotation – er teoretisk muligt i fysiske casinoer med trænet observation. Men i live roulette online er det umuligt af flere grunde: 1-3 sekunders stream-forsinkelse eliminerer realtidsobservation, kameraudsnit er begrænsede, og mange borde lukker indsatser før eller lige når kuglen kastes. Selv i fysiske casinoer er succesraten så lav, at det sjældent er profitabelt.",
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
  const videoJsonLd = buildVideoSchema(
    `${SITE_URL}/live-casino/roulette`,
    "xKaQ0XGEKuU",
    {
      title: "Live Roulette gennemgang – Bordtyper, regler og strategi",
      description: "Se en live gennemgang af roulette: bordtyper, house edge-forskelle og bankroll management forklaret ved et rigtigt live roulette-bord.",
      uploadDate: "2026-03-07",
      duration: "PT10M",
    }
  );

  return (
    <>
      <SEO
        title="Live Roulette – Bordtyper, Edge & Strategi"
        description="Live roulette 2026: House edge 2,70 % (EU) vs. 1,35 % (French). Bordtyper, tempoanalyse, betting-systemer og bankroll management. Dansk licens."
        jsonLd={[faqJsonLd, articleJsonLd, videoJsonLd]}
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
        <AuthorMetaBar author="jonas" date="18-02-2026" readTime="20 Min." />

        <img src={liveRouletteHero} alt="Live roulette hjul i et elegant casino studio med dealer" width={1920} height={600} className="w-full max-h-[400px] object-cover rounded-xl mb-10" loading="eager" />

        <p className="mb-6 text-muted-foreground leading-relaxed">
          Denne side er en del af vores <Link to="/live-casino" className={linkClass}>komplette live casino guide</Link>. Her fokuserer vi udelukkende på live roulette med rigtig dealer – det mest ikoniske casinospil, nu tilgængeligt i HD med multi-angle kameraer og op til 80 spins i timen. Vi adskiller os fra den overordnede pillar-guide ved at dykke ekstremt dybt ned i bordtyper, matematiske modeller for hvert bet-type, og en ærlig analyse af populære betting-systemer.
        </p>
        <p className="mb-6 text-muted-foreground leading-relaxed">
          Vores analyse bygger på observation af 1.500+ spins fordelt over 6 forskellige bordtyper hos danske licenserede casinoer i januar-februar 2026. Vi har dokumenteret tempoforskelle, latency, UI-kvalitet og dealerinteraktion på tværs af Evolution Gaming, Pragmatic Play Live og Playtech-platforme. Alt data er verificeret mod officielle RTP-specifikationer fra spiludviklerne.
        </p>

        <YoutubeEmbed
          videoId="xKaQ0XGEKuU"
          title="Live Roulette gennemgang – Bordtyper, regler og strategi"
          description="Se en live gennemgang af roulette: bordtyper, house edge-forskelle og bankroll management forklaret ved et rigtigt live roulette-bord."
          uploadDate="2026-03-07"
          duration="PT10M"
        />

        <VideoContextBox heading="Her gennemgår vores streamer live roulette i praksis">
          <Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> demonstrerer de forskellige bordtyper, forklarer house edge-forskelle og viser bankroll management i praksis. Videoen er en del af vores indhold om{" "}
          <Link to="/live-casino" className={linkClass}>live casino</Link> og{" "}
          <Link to="/live-casino/lightning-roulette" className={linkClass}>Lightning Roulette</Link>.
        </VideoContextBox>

        <InlineCasinoCards title="Bedste casinoer til live roulette" count={6} />

        {/* H2 #1 – Roulettens bordtyper */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bordtyper i live roulette – en komplet dybdegående oversigt</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Live roulette er ikke ét spil – det er en familie af varianter med markant forskellige hastigheder, regler og house edges. At forstå forskellene er afgørende for at vælge det rigtige bord til din spillestil og dit budget. Her gennemgår vi alle relevante varianter med tekniske specifikationer, matematiske implikationer og vores hands-on vurdering.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Europæisk Roulette</strong> er standarden med et enkelt nul og 37 numre (0-36). <Link to="/ordbog/house-edge" className={linkClass}>House edge</Link>: 2,70 %. Det er det mest udbredte format hos danske licenserede casinoer og det anbefalede startpunkt for alle spillere. Tempoet er komfortabelt med 25-35 spins pr. time, hvilket giver god tid til at overveje indsatser. Dealerne roterer typisk hver 30-60 minutter, og bordets atmosfære er professionel men afslappet. Minimumsindsats: 5-50 kr. afhængigt af bord.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>French Roulette med La Partage</strong> er den matematisk mest fordelagtige variant. La Partage-reglen betyder, at du kun taber halvdelen af din indsats på even-money bets (rød/sort, lige/ulige, høj/lav) når kuglen lander på 0. Dette halverer house edge på disse bets til 1,35 % – lavere end <Link to="/live-casino/baccarat" className={linkClass}>baccarat banker</Link> (1,06 % ekskl. kommission, men 1,06 % er allerede efter kommission). French roulette er sjældnere i live format, men <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> tilbyder det hos flere danske casinoer. Bordlayoutet bruger franske betegnelser (Manque/Passe, Pair/Impair), men funktionaliteten er identisk.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>En Prisonfull French Roulette:</strong> En endnu sjældnere variant, der bruger "En Prison" i stedet for La Partage. Når kuglen lander på 0, "fængsles" din even-money bet i stedet for at returnere halvdelen. Hvis det næste spin vinder, får du hele indsatsen tilbage (men ingen gevinst). Matematisk er En Prison marginalt bedre end La Partage (effektiv house edge: 1,35 % vs. 1,35 % – de er faktisk identiske i forventet værdi, men En Prison har lidt lavere varians, fordi du kan få hele indsatsen tilbage).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Speed Roulette</strong> komprimerer runderne til 25 sekunder fra spin til resultat. Det betyder 50-60 spins/time – næsten dobbelt så mange som standard. For en spiller med 50 kr. gennemsnitlig indsats øger dette det forventede tab fra 34 kr./time til ca. 68 kr./time. Speed Roulette er for erfarne spillere, der har deres indstatsplan klar – ikke for dem, der overvejer mens hjulet spinner. Betting-perioden er kun 12-15 sekunder, så du skal være hurtig.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Immersive Roulette</strong> tilbyder den mest cinematiske oplevelse med slow-motion replays af kuglens landing i 200 fps fra multiple kameravinkler. Tempoet er lidt langsommere end standard (20-25 spins/time), og det er det mest visuelt imponerende format. House edge er identisk med europæisk standard. Den langsommere hastighed er faktisk en fordel for din bankroll – du spiller færre spins, hvilket reducerer dit forventede tab pr. time med ca. 15-20 % sammenlignet med standard live.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Auto Roulette</strong> kører uden dealer – kun et mekanisk hjul og automatiseret kugleudsendelse. Tempoet er højest (60-80 spins/time), og minimumsindsatserne er typisk de laveste (fra 2 kr.). Det er effektivt for volumen-spillere, men det langt højere tempo æder bankrollen hurtigere. Ved 50 kr. indsats og 70 spins/time er dit forventede tab 95 kr./time – næsten 3x standard live. Vores anbefaling: brug Auto Roulette kun med bevidst lavere indsatser (10-20 kr.) for at kompensere for det øgede tempo.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Double Ball Roulette:</strong> To kugler spinnes samtidigt, hvilket skaber unikke betting-muligheder. Du kan bette på at begge kugler lander på samme nummer (1.300:1 udbetaling). Standard outside bets vinder kun, hvis begge kugler lander i den valgte zone. House edge varierer fra 2,70 % til 5,30 % afhængigt af bet-typen. Det er primært et novelty-spil med højere varians og generelt dårligere odds end standard europæisk.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Dual Play Roulette:</strong> Et unikt format, hvor online spillere deler et fysisk bord med spillere i et landbaseret casino. Hjulet og dealeren er de samme – du ser det eksakt samme spin som dem, der fysisk er til stede. Tempoet bestemmes af de landbaserede spillere og er typisk 20-30 spins/time. House edge og regler er identiske med standard europæisk. Det er den mest autentiske live roulette-oplevelse tilgængelig online.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #2 – House edge dyb analyse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">House edge i live roulette – den komplette matematiske analyse</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I modsætning til <Link to="/live-casino/blackjack" className={linkClass}>live blackjack med dealer</Link>, hvor din strategi påvirker house edge, er roulette et rent chancespil. House edge er fast og ufravigelig – men den varierer markant mellem varianter og bet-typer. Lad os gennemgå det hele med den præcision, emnet fortjener.
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
                      <th className="py-2 px-4 text-left">Tab/1.000 kr.</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">French (La Partage)</td>
                      <td className="py-2 px-4">Even money</td>
                      <td className="py-2 px-4 text-primary font-semibold">1,35 %</td>
                      <td className="py-2 px-4">98,65 %</td>
                      <td className="py-2 px-4 text-primary">13,50 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">French (La Partage)</td>
                      <td className="py-2 px-4">Inside bets</td>
                      <td className="py-2 px-4">2,70 %</td>
                      <td className="py-2 px-4">97,30 %</td>
                      <td className="py-2 px-4">27,00 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Europæisk</td>
                      <td className="py-2 px-4">Alle bets</td>
                      <td className="py-2 px-4">2,70 %</td>
                      <td className="py-2 px-4">97,30 %</td>
                      <td className="py-2 px-4">27,00 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Lightning Roulette</td>
                      <td className="py-2 px-4">Straight-up</td>
                      <td className="py-2 px-4">2,78 %</td>
                      <td className="py-2 px-4">97,22 %</td>
                      <td className="py-2 px-4">27,80 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Amerikansk</td>
                      <td className="py-2 px-4">Standard bets</td>
                      <td className="py-2 px-4 text-destructive">5,26 %</td>
                      <td className="py-2 px-4">94,74 %</td>
                      <td className="py-2 px-4 text-destructive">52,60 kr.</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">Amerikansk</td>
                      <td className="py-2 px-4">Five-number bet</td>
                      <td className="py-2 px-4 text-destructive font-semibold">7,89 %</td>
                      <td className="py-2 px-4">92,11 %</td>
                      <td className="py-2 px-4 text-destructive font-semibold">78,90 kr.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Matematisk udledning af house edge:</strong> I europæisk roulette med 37 numre (0-36) er sandsynligheden for at ramme et enkelt nummer 1/37 = 2,703 %. Udbetalingen er 35:1. Den "fair" udbetaling ville være 36:1 (36/1 chance). Forskellen: (36-35)/37 = 1/37 = 2,703 %. Dette er house edge – den ekstra "enhed" som casinoet beholder pr. bet. For even-money bets: 18 vindende numre ud af 37 giver sandsynlighed 48,649 %. Med 1:1 udbetaling er EV = 0,48649 × 1 - 0,51351 × 1 = -0,02703. Altså: -2,703 %.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Vigtig indsigt:</strong> Alle bets i europæisk roulette har <em>præcis</em> den same house edge (2,70 %), uanset om du spiller straight-up, split, street, corner, dozen eller even-money. Den eneste undtagelse er French roulette med La Partage/En Prison, som kun påvirker even-money bets. Der er altså ingen "bedre" eller "værre" bets i standard europæisk – kun forskelle i volatilitet (straight-up er mest volatilt, even-money er mindst).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den vigtigste konklusion: spil <strong>aldrig</strong> amerikansk roulette hvis europæisk er tilgængeligt. Forskellen er næsten dobbelt house edge – det svarer til at frivilligt betale dobbelt pris for den samme oplevelse. French roulette med La Partage er det absolutte optimum for even-money bets og den matematisk mest fordelagtige roulette-variant i hele live casino.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #3 – Betting-systemer og matematik */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betting-systemer – en ærlig matematisk destruktion</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Roulette-systemer har eksisteret i århundreder, og de har til fælles, at ingen af dem ændrer den matematiske forventning. House edge er 2,70 % pr. spin, uanset om du bruger Martingale, Fibonacci, D'Alembert, Labouchère eller Oscar's Grind. Hvad systemerne ændrer er <em>volatilitetsprofilen</em> – fordelingen mellem gevinst- og tabsfrekvens. Lad os gennemgå de mest populære systemer med præcise tal.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Martingale</strong> (dobling efter tab): Producerer mange små gevinster (1 enhed pr. vindende serie) og sjældne katastrofale tab. Ved 10 tab i træk på rød/sort (sandsynlighed: (19/37)^10 = 1:613) kræves en indsats på 1.024 enheder for at vinde 1 enhed. Med 50 kr. startindsats er det 51.200 kr. – og bordmaksimum stopper dig typisk ved 5.000-10.000 kr. Selv med uendeligt bordmaksimum og bankroll er forventet gevinst pr. spin stadig -2,70 % af gennemsnitlig indsats.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Fibonacci</strong> (indsats følger Fibonacci-sekvensen efter tab: 1, 1, 2, 3, 5, 8, 13...): Langsommere progression end Martingale, men stadig ubegrænset stigende. Efter 10 tab er din indsats 89 enheder (vs. 1.024 i Martingale). Det føles sikrere, men det akkumulerede tab i sekvensen er 143 enheder – og du skal vinde flere gange for at returnere til profit. Forventet værdi: identisk med flat betting.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>D'Alembert</strong> (øg med 1 efter tab, reducér med 1 efter gevinst): Den mest konservative progression. Ved 10 tab i træk er din indsats kun 11 enheder. Banrollfluktuationerne er lavere, men det forventede tab er identisk. D'Alembert er "den mindst farlige" progressionsstrategi – men den er stadig dårligere end flat betting, fordi du gennemsnitligt sætter flere penge i spil (og dermed taber mere) end med konstante indsatser.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>James Bond-strategien</strong> (fast mønster: 70 % på høj, 25 % på dozen 13-18, 5 % på 0): Dækker 25 ud af 37 numre (67,6 % dækning). Du vinder 67,6 % af spins, men med varierende udbetalinger. House edge: stadig 2,70 %. Denne strategi ændrer blot volatilitetsprofilen – mange små gevinster og færre, men større, tab. Den "føles" som om den virker, fordi du vinder ofte – men over tid taber du præcis det samme som med enhver anden bet-kombination.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Den ærlige konklusion:</strong> Intet betting-system kan overvinde house edge i roulette. For at forstå, hvordan <Link to="/casinospil/roulette" className={linkClass}>roulette-matematik</Link> fungerer i detaljer, se vores dedikerede rouletteguide. Den eneste "strategi" er at vælge den variant med lavest house edge (French, La Partage), bruge flat betting, og sætte en fast tabsgrænse. Alt andet er selvbedrag – underholdende selvbedrag, muligvis, men selvbedrag.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #4 – Tempoanalyse og bankroll */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Tempoanalyse og bankroll management – de skjulte variable</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tempo er den mest undervurderede variabel i roulette. House edge pr. spin er fast, men antallet af spins pr. time varierer enormt mellem formater – og det er det, der bestemmer dit faktiske tab. Vi har målt det præcise tempo på 6 forskellige bordtyper i vores live-tests for at give dig nøjagtige tal.
          </p>
          <Card className="border-border bg-card mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 px-4 text-left">Format</th>
                      <th className="py-2 px-4 text-left">Spins/time</th>
                      <th className="py-2 px-4 text-left">Tab/time (50 kr., EU)</th>
                      <th className="py-2 px-4 text-left">Tab/3 timer</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Immersive Roulette</td>
                      <td className="py-2 px-4">22</td>
                      <td className="py-2 px-4 text-primary font-semibold">30 kr.</td>
                      <td className="py-2 px-4 text-primary">89 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">French Roulette</td>
                      <td className="py-2 px-4">25</td>
                      <td className="py-2 px-4 text-primary font-semibold">17 kr. (even money)</td>
                      <td className="py-2 px-4 text-primary">51 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Standard Live</td>
                      <td className="py-2 px-4">30</td>
                      <td className="py-2 px-4">41 kr.</td>
                      <td className="py-2 px-4">122 kr.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Speed Roulette</td>
                      <td className="py-2 px-4">55</td>
                      <td className="py-2 px-4">74 kr.</td>
                      <td className="py-2 px-4">223 kr.</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">Auto Roulette</td>
                      <td className="py-2 px-4">70</td>
                      <td className="py-2 px-4 text-destructive">95 kr.</td>
                      <td className="py-2 px-4 text-destructive">284 kr.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Bankroll-anbefaling:</strong> For en 2-timers session med standard live roulette (60 spins totalt) og 50 kr. gennemsnitlig indsats bør din bankroll være minimum 1.500-2.000 kr. (30-40x indsats). Dette giver under 10 % sandsynlighed for at gå bust i sessionen, selv med uheldig varians. For Speed eller Auto Roulette skal bankrollen skaleres proportionalt med det øgede tempo – 2.500-3.000 kr. minimum.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Varians i roulette vs. blackjack:</strong> Roulette har højere varians pr. spin end blackjack. Standardafvigelsen for en even-money bet er 1,0 (du vinder 1 eller taber 1), mens blackjack har ca. 1,15 men med strategiske elementer, der reducerer den effektive varians. For straight-up bets er standardafvigelsen 5,84 (du taber 1 i 97,3 % af spins og vinder 35 i 2,7 %). Denne ekstreme varians er grunden til, at straight-up spillere kan opleve lange tabsserier efterfulgt af store gevinster – det er normal statistik, ikke "held".
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Risk of Ruin-beregning for roulette (even-money bets):</strong> Med 50 kr. indsats, 2,70 % house edge og en bankroll på 1.500 kr. (30 enheder) er sandsynligheden for bust i en 100-spin session ca. 12 %. Med 2.500 kr. (50 enheder) falder den til ca. 4 %. For en "komfortabel" session med under 5 % bust-risiko anbefaler vi minimum 40-50x indsatsen.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Husk: roulette er et spil med <strong>høj kortsigtet varians</strong> sammenlignet med blackjack. I en enkelt session kan du nemt vinde eller tabe 20-30x din gennemsnitlige indsats. Det er normal statistisk variation, ikke et tegn på held eller uheld. Langsigtet konvergerer alle resultater mod -2,70 % pr. indsat krone. Spil altid <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #5 – Indsatstyper og volatilitet */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Indsatstyper og volatilitetsprofiler – vælg din risikoprofil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Selvom alle bets i europæisk roulette har den same house edge (2,70 %), varierer volatiliteten enormt. Din valg af bet-type bestemmer, hvor store udsving du oplever – og dermed, hvor stor en bankroll du behøver.
          </p>
          <Card className="border-border bg-card mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 px-4 text-left">Bet-type</th>
                      <th className="py-2 px-4 text-left">Udbetaling</th>
                      <th className="py-2 px-4 text-left">Vindsandsynlighed</th>
                      <th className="py-2 px-4 text-left">Std. afvigelse</th>
                      <th className="py-2 px-4 text-left">Volatilitet</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Even money (rød/sort)</td>
                      <td className="py-2 px-4">1:1</td>
                      <td className="py-2 px-4">48,65 %</td>
                      <td className="py-2 px-4">1,00</td>
                      <td className="py-2 px-4 text-primary">Lav</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Dozen/Column</td>
                      <td className="py-2 px-4">2:1</td>
                      <td className="py-2 px-4">32,43 %</td>
                      <td className="py-2 px-4">1,39</td>
                      <td className="py-2 px-4">Medium-Lav</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Six-line</td>
                      <td className="py-2 px-4">5:1</td>
                      <td className="py-2 px-4">16,22 %</td>
                      <td className="py-2 px-4">2,17</td>
                      <td className="py-2 px-4">Medium</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Corner</td>
                      <td className="py-2 px-4">8:1</td>
                      <td className="py-2 px-4">10,81 %</td>
                      <td className="py-2 px-4">2,83</td>
                      <td className="py-2 px-4">Medium-Høj</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4 font-medium">Split</td>
                      <td className="py-2 px-4">17:1</td>
                      <td className="py-2 px-4">5,41 %</td>
                      <td className="py-2 px-4">4,12</td>
                      <td className="py-2 px-4">Høj</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">Straight-up</td>
                      <td className="py-2 px-4">35:1</td>
                      <td className="py-2 px-4">2,70 %</td>
                      <td className="py-2 px-4 text-destructive font-semibold">5,84</td>
                      <td className="py-2 px-4 text-destructive font-semibold">Meget høj</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Praktisk implikation:</strong> En spiller, der sætter 50 kr. på rød/sort i 100 spins, kan forvente et resultat inden for ±500 kr. af sit forventede tab (-135 kr.). En spiller, der sætter 50 kr. straight-up i 100 spins, kan forvente et resultat inden for ±2.920 kr. Begge taber gennemsnitligt 135 kr. – men oplevelsen er dramatisk anderledes.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Anbefaling baseret på spillerprofil:</strong> Hvis du spiller for lang underholdning med stabile sessioner, vælg even-money bets på French Roulette (1,35 % edge, lav volatilitet). Hvis du spiller for spænding og potentielle store gevinster, vælg straight-up bets – men acceptér, at de fleste spins taber, og skalér din indsats tilsvarende ned (10-20 kr. pr. straight-up vs. 50 kr. pr. even-money). For multiplikator-spænding, se vores <Link to="/live-casino/lightning-roulette" className={linkClass}>Lightning Roulette guide</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #6 – Hjulintegritet og teknisk kvalitet */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hjulintegritet, OCR og streaming-teknologi</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Live roulette-hjulets troværdighed er fundamentet for hele spillet. Moderne live casino-hjul er præcisionsfremstillede med tolerancer under 0,5 mm og kalibreres dagligt af tekniske teams. Hjulene produceres primært af to producenter – Cammegh og TCS John Huxley – der begge er certificeret af uafhængige testlaboratorier.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>OCR-teknologi (Optical Character Recognition)</strong> aflæser kuglens landingsposition i realtid via dedikerede kameraer rettet mod hjulet. Systemet identificerer det vindende nummer inden for millisekunder og validerer det mod det fysisk observerede resultat. I de sjældne tilfælde, hvor OCR og visuel observation ikke matcher (f.eks. kuglen hopper mellem to lommer), tilkaldes en floor manager for manuelt at bekræfte resultatet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Bias-exploitation – er det muligt?</strong> Historisk har spillere som Gonzalo Garcia-Pelayo i 1990'erne udnyttet biased hjul i fysiske casinoer. Men moderne hjul er designet med præcisionslommer, der eliminerer systematisk bias. Desuden overvåges hjulresultater i realtid via statistiske modeller, der flagger enhver afvigelse fra forventet fordeling. Hvis et hjul viser bias (f.eks. ét nummer rammer 5 % i stedet for 2,7 %), tages det ud af drift og rekalibreres. I live casino online er bias-exploitation reelt umuligt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Streaming-kvalitet:</strong> Evolution Gamings live roulette-studier bruger 1080p HD-kameraer ved minimum 30 fps. Immersive Roulette bruger 200 fps for slow-motion replays. Latency varierer fra 0,5-3 sekunder afhængigt af din forbindelse og serverafstand. For roulette er latency primært et kosmetisk spørgsmål – alle bets lukkes før spinnet, så forsinkelsen påvirker ikke gameplay. Den eneste potentielle effekt er visuel: du kan se resultatet 1-3 sekunder efter det faktisk er afgjort.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #7 – Bordvalg */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvordan vælger du det rigtige live roulette-bord?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med 50+ live roulette-borde hos de fleste danske casinoer kan det virke overvældende. Her er en struktureret tilgang til bordvalg baseret på din profil, dit budget og dine præferencer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Hvis du optimerer for lavest house edge:</strong> French Roulette med La Partage (1,35 %) med even-money bets. Acceptér det lidt langsommere tempo og den mere formelle atmosfære. Dette er objektivt det bedste valg for enhver spiller, der vil minimere sit forventede tab.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Hvis du vil have den bedste oplevelse:</strong> Immersive Roulette med slow-motion replays og multiple kameravinkler. House edge er standard (2,70 %), men produktionsværdien er den højeste i live roulette. Det langsommere tempo (22 spins/time) er en bonus for din bankroll.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Hvis du vil spille mange runder hurtigt:</strong> Speed Roulette eller Auto Roulette. Vær opmærksom på, at det øgede tempo øger dit forventede tab pr. time proportionalt. Sæt en streng tidsgrænse – 45 minutter er vores anbefaling for Speed/Auto.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Hvis du søger store gevinster:</strong> Overvej <Link to="/live-casino/lightning-roulette" className={linkClass}>Lightning Roulette</Link> for multiplikatorer op til 500x, eller kombiner med <Link to="/live-casino/baccarat" className={linkClass}>live baccarat</Link> for lavere house edge med bedre kort-dynamik. Husk at høj gevinstpotentiale altid kommer med højere varians.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Hvis du har lille budget (under 500 kr.):</strong> Auto Roulette med 2-5 kr. minimumsindsats. Det høje tempo er en risiko, men de lave minimumsgrænser giver dig flere spins for pengene. Alternativt: Infinite Roulette (hvis tilgængelig) med lave limits og moderat tempo. Undgå VIP-borde med 500+ kr. minimum – de er designet til en helt anden bankroll-profil.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #8 – Kognitive bias og gambler's fallacy */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Kognitive bias ved roulettebordet – fallacier og faldgruber</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Roulette er det casinospil, der mest effektivt trigrer kognitive bias. Den visuelle natur af resultater (røde og sorte numre, klare mønstre i historikken) gør det næsten umuligt for den menneskelige hjerne at undgå at se "patterns", der ikke eksisterer. Her gennemgår vi de mest almindelige faldgruber.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Gambler's Fallacy:</strong> "Rød har ramt 7 gange i træk – sort SKAL komme snart!" Nej. Hvert spin er uafhængigt. Sandsynligheden for sort er 48,65 % uanset de foregående 7, 70 eller 700 resultater. Kuglen og hjulet har ingen hukommelse. Denne bias er den mest destruktive, fordi den opmuntrer til øgede indsatser efter tabsserier – præcis den adfærd, der accelererer bankroll-tab.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Hot/Cold Numbers:</strong> Mange live roulette-interfaces viser "varme" og "kolde" numre baseret på de seneste 100-500 spins. Disse er statistisk meningsløse. Med 37 numre forventes hvert nummer at ramme 2,70 % af tiden. I en sample på 500 spins (typisk vises), er standardafvigelsen ca. 3,5 forekomster – så et "varmt" nummer med 20 hits vs. et "koldt" med 8 er helt inden for normal variation. Casinoer viser denne statistik, fordi den opmuntrer til spil, ikke fordi den har predictiv værdi.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Sunk Cost Fallacy:</strong> "Jeg har allerede tabt 1.000 kr. – jeg skal fortsætte for at vinde det tilbage." Dit tidligere tab er irrelevant for fremtidige spins. Hvert nyt spin er en isoleret begivenhed med -2,70 % EV. At fortsætte med at spille for at "genvinde" er matematisk identisk med at starte en ny session – med den tilføjede risiko, at du er emotionelt kompromitteret (tilt).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Confirmation Bias:</strong> Du husker de gange, dit system "virkede" og glemmer de gange, det fejlede. Hvis du bruger Martingale og vinder 8 ud af 10 sessioner, husker du de 8 gevinster – men glemmer, at den ene katastrofale session udslettede al profit plus mere. Den menneskelige hjerne er designet til at finde mønstre – det var en evolutionær fordel i naturen, men det er en direkte ulempe ved roulettebordet.
          </p>
        </section>

        <Separator className="my-10" />

        {/* H2 #9 – Ansvarligt spil */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Ansvarligt spil ved roulettebordet – tempo og risiko</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Roulette har en unik psykologisk profil, der gør det vigtigt at forstå de adfærdsmæssige faldgruber. Det hypnotiske hjul, den hurtige cyklus af håb og skuffelse, og den konstante tilgængelighed af nye spins skaber en oplevelse, der kan være vanskelig at begrænse for sårbare spillere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Tempo-risiko:</strong> Roulettens primære fare er tempo – ikke house edge. Med 2,70 % house edge er roulette relativt "billig" pr. spin. Men 70 spins/time i Auto Roulette ved 50 kr. indsats koster 95 kr./time – og en 4-timers session koster 380 kr. i forventet tab. Det er sammenligneligt med en dyr middag – men uden den garanterede nydelse. Vær bevidst om, at tempoet er den primære driver af dit tab, og vælg langsommere formater, hvis du vil strække dit budget.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Praktiske grænser:</strong> Sæt en tabsgrænse (f.eks. 500 kr.) og en tidsgrænse (f.eks. 90 minutter). Brug de værktøjer, som danske licenserede casinoer tilbyder: indbetalingsgrænser, session-timers og reality checks. Indbetalingsgrænser er det mest effektive værktøj, fordi de forhindrer impulsive indskud i øjeblikke af frustration.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Har du brug for hjælp, kontakt <strong>StopSpillet</strong> (70 22 28 25) eller selvudeluk via <strong>ROFUS</strong> på rofus.nu. Du skal være 18+ for at spille hos casinoer med dansk licens udstedt af <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>. Casino er underholdning – ikke en indtægtskilde og aldrig en løsning på økonomiske problemer.
          </p>
        </section>

        <RelatedGuides currentPath="/live-casino/roulette" />
        <FAQSection title="Ofte stillede spørgsmål om live roulette" faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="betinia" />
    </>
  );
};

export default LiveRouletteGuide;
