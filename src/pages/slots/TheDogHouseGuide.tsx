import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import heroImage from "@/assets/heroes/the-dog-house-hero.jpg";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, buildHowToSchema, buildVideoSchema, SITE_URL } from "@/lib/seo";
import { YoutubeEmbed } from "@/components/YoutubeEmbed";
import { VideoContextBox } from "@/components/VideoContextBox";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { SlotProviderLink } from "@/components/SlotProviderLink";
import { SlotDataLink } from "@/components/SlotDataLink";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles, TrendingUp, Target, Shield, Zap, BarChart3,
  Calculator, Flame, Scale, Users, AlertTriangle, Trophy
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const theDogHouseFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er The Dog House RTP, og varierer den?",
    answer: (
      <>
        The Dog House fås i tre RTP-versioner: 96,51 % (standard), 95,51 % og 94,39 %. <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> lader casinooperatøren vælge konfigurationen. Standard-versionen er den mest udbredte på danske <Link to="/casino-licenser" className={linkClass}>licenserede casinoer</Link>. Over 1.000 spins á 10 kr. svarer forskellen mellem 96,51 % og 94,39 % til 212 kr. i ekstra tab – en betydelig forskel. Verificér altid RTP i spillets info-sektion.
      </>
    ),
  },
  {
    question: "Hvordan fungerer sticky wilds i The Dog House free spins?",
    answer: (
      <>
        Under free spins klæber alle wild-symboler fast på deres position for resten af bonusrunden. Hvert wild bærer en 2× eller 3× multiplikator, og multiplikatorerne ganges sammen, når flere wilds indgår i samme gevinstlinje. To wilds med 3× giver 9× gevinstmultiplikator; tre wilds kan give op til 27×. Denne mekanik er The Dog House's primære kilde til store gevinster og adskiller den markant fra slots med standard wilds.
      </>
    ),
  },
  {
    question: "Kan man købe bonusrunden i The Dog House?",
    answer: (
      <>
        Ja, The Dog House tilbyder Bonus Buy til 60× indsatsen. Den gennemsnitlige free spins-gevinst er ca. 50-70× indsatsen, hvilket giver en marginal positiv EV for Bonus Buy over et stort antal forsøg. Funktionen er populær blandt spillere, der ønsker direkte adgang til sticky wilds-mekanikken. Bemærk at Bonus Buy muligvis ikke er tilgængelig på alle danske casinoer. Læs mere om <Link to="/casino-bonus" className={linkClass}>bonustyper</Link>.
      </>
    ),
  },
  {
    question: "Hvad er max win i The Dog House?",
    answer: (
      <>
        The Dog House har en max win på 6.750× indsatsen. Ved 10 kr./spin svarer det til 67.500 kr. Max win kræver typisk en fuld suite af sticky wilds med 3× multiplikatorer under free spins, kombineret med premium-symboler på alle gevinstlinjer. Sandsynligheden for max win er ekstremt lav (~1/500.000 spins), men gevinster i intervallet 500-2.000× forekommer med realistisk frekvens under gunstige free spins-runder.
      </>
    ),
  },
  {
    question: "Er The Dog House egnet til bonusomsætning?",
    answer: (
      <>
        Med en RTP på 96,51 % (standard) er The Dog House en af de bedre valg til <Link to="/omsaetningskrav" className={linkClass}>omsætning af bonus</Link>. Den høje hit frequency (~25 %) kombineret med en moderat volatilitet giver en relativt stabil omsætningsoplevelse. For 30× wagering på 500 kr. bonus er det statistiske tab 524 kr. – næsten breakeven. En <Link to="/bonus-uden-omsaetningskrav" className={linkClass}>bonus uden omsætningskrav</Link> er dog altid at foretrække.
      </>
    ),
  },
  {
    question: "Hvad er forskellen mellem The Dog House og The Dog House Megaways?",
    answer: (
      <>
        Den originale The Dog House har 20 faste linjer og et 5×3 grid, mens Megaways-versionen bruger op til 117.649 gevinstmuligheder med variabelt grid. Megaways-versionen har højere volatilitet og max win (12.305× vs. 6.750×), men lavere RTP (96,55 % vs. 96,51 %). Begge versioner deler sticky wild-mekanikken under free spins. For spillere, der foretrækker forudsigelighed, er den originale version et bedre valg.
      </>
    ),
  },
];

const TheDogHouseGuide = () => {
  const faqJsonLd = buildFaqSchema(theDogHouseFaqs);
  const articleSchema = buildArticleSchema({
    headline: "The Dog House – Sticky Wilds & Multiplikator-Analyse",
    description: "Komplet analyse af The Dog House: sticky wild-mekanik, multiplikator-system, RTP 96,51 %, volatilitetsprofil og EV-vurdering for danske spillere.",
    url: `${SITE_URL}/casinospil/spillemaskiner/the-dog-house`,
    datePublished: "2026-02-18",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="The Dog House – RTP, sticky wilds og bonus"
        description="Komplet analyse af The Dog House: sticky wild-mekanik, multiplikator-system, RTP 96,51 %, volatilitetsprofil og EV-vurdering for danske spillere."
        canonical={`${SITE_URL}/casinospil/spillemaskiner/the-dog-house`}
        jsonLd={[articleSchema, faqJsonLd]}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Sticky wilds & multiplikatorer</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">The Dog House – Sticky Wilds & Multiplikator-Analyse</h1>
            <p className="text-lg text-white/80">Pragmatic Play's elskerinde sticky wild-slot: en matematisk dekonstruktion af multiplikator-stacking, free spins-dynamik og den reelle værdi af Bonus Buy.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="18 min" />
        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} width="1920" height="1080" className="w-full h-auto object-cover max-h-[400px]" alt="The Dog House spillemaskine" loading="eager" />
        </div>

        {/* ── Data First: RTP & Teknisk profil ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Teknisk Profil: RTP, Volatilitet og Kernetal
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The Dog House lanceret af <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> i 2019 etablerede en ny standard for sticky wild-mekanikken i online slots. Med en standard <Link to="/ordbog/rtp" className={linkClass}>RTP</Link> på 96,51 % placerer den sig i den øvre ende af Pragmatic Play's portefølje – over Wolf Gold (96,01 %) og på niveau med <Link to="/casinospil/spillemaskiner/sweet-bonanza" className={linkClass}>Sweet Bonanza</Link> (96,48 %).
          </p>
          <Card className="border-border/50 bg-card/50 mb-4">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Teknisk oversigt</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">RTP (standard):</span> <span className="font-medium">96,51 %</span></div>
                <div><span className="text-muted-foreground">House Edge:</span> <span className="font-medium">3,49 %</span></div>
                <div><span className="text-muted-foreground">Volatilitet:</span> <span className="font-medium">Høj</span></div>
                <div><span className="text-muted-foreground">Max Win:</span> <span className="font-medium">6.750×</span></div>
                <div><span className="text-muted-foreground">Grid:</span> <span className="font-medium">5×3 (20 linjer)</span></div>
                <div><span className="text-muted-foreground">Hit Frequency:</span> <span className="font-medium">~25 %</span></div>
                <div><span className="text-muted-foreground">Min. indsats:</span> <span className="font-medium">2 kr.</span></div>
                <div><span className="text-muted-foreground">Bonus Buy:</span> <span className="font-medium">60× indsats</span></div>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed mb-4">
            House edge på 3,49 % er identisk med Reactoonz og marginalt lavere end de fleste Pragmatic Play-titler. Den variable RTP-problematik er dog vigtig: forskellen mellem 96,51 % og 94,39 % svarer til et ekstra tab på 2,12 procentpoint af din samlede indsats. Over en session på 300 spins á 10 kr. er det 63,60 kr. i yderligere tab – en ikke-negligibel forskel.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Volatiliteten klassificeres som høj af Pragmatic Play, men den oplevede volatilitet er moderat-høj takket være den relativt generøse hit frequency på ~25 %. Standardafvigelsen estimeres til ~6-8, hvilket placerer The Dog House mellem Wolf Gold (~5-7) og <Link to="/casinospil/spillemaskiner/razor-shark" className={linkClass}>Razor Shark</Link> (~10-12) på volatilitetsskalaen.
          </p>
        </section>

        <YoutubeEmbed videoId="_rC_ONf72gk" title="The Dog House gennemgang – Sticky Wilds og multiplikatorer" description="Se en komplet gennemgang af The Dog House: sticky wild-mekanikken og multiplikator-stacking forklaret i praksis." uploadDate="2026-03-07" duration="PT1M49S" />
        <VideoContextBox heading="Her gennemgår vores streamer The Dog House i praksis">
          <Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> viser sticky wild-mekanikken, multiplikator-stacking og free spins-systemet i detaljer. Videoen er en del af vores dybdegående indhold om{" "}
          <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> og{" "}
          <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>.
        </VideoContextBox>

        <InlineCasinoCards />

        {/* ── Sticky Wild-mekanik ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Sticky Wild-Mekanikken: Multiplikator-Magi Forklaret
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The Dog House's definerende feature er dens sticky wild-system under free spins. Wilds der lander under bonusrunden forbliver på deres position for resten af runden – de "klæber" fast. Hvert wild bærer en tilfældig multiplikator: enten 2× eller 3×.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det matematisk interessante opstår, når flere sticky wilds indgår i samme gevinstlinje. Multiplikatorerne ganges – ikke adderes – hvilket skaber eksponentiel værdiforøgelse. To wilds med 3× giver en samlet gevinstmultiplikator på 9×. Tre wilds med 3× giver 27×. I det teoretisk bedste scenarie – fem wilds på en linje, alle med 3× – ville multiplikatoren være 243×, men dette kræver wilds på alle positioner, hvilket eliminerer muligheden for symbol-matchende gevinster.
          </p>
          <Card className="border-border/50 bg-card/50 mb-4">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Multiplikator-kombinationer (free spins)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-2 pr-4">Wilds i linje</th>
                      <th className="text-left py-2 pr-4">Bedste case (3×+3×...)</th>
                      <th className="text-left py-2 pr-4">Worst case (2×+2×...)</th>
                      <th className="text-left py-2">Gennemsnitlig</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/30"><td className="py-2 pr-4">1 wild</td><td className="py-2 pr-4">3×</td><td className="py-2 pr-4">2×</td><td className="py-2">2,5×</td></tr>
                    <tr className="border-b border-border/30"><td className="py-2 pr-4">2 wilds</td><td className="py-2 pr-4">9×</td><td className="py-2 pr-4">4×</td><td className="py-2">6,25×</td></tr>
                    <tr className="border-b border-border/30"><td className="py-2 pr-4">3 wilds</td><td className="py-2 pr-4">27×</td><td className="py-2 pr-4">8×</td><td className="py-2">15,63×</td></tr>
                    <tr><td className="py-2 pr-4">4 wilds</td><td className="py-2 pr-4">81×</td><td className="py-2 pr-4">16×</td><td className="py-2">39,06×</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I praksis ses 2-3 sticky wilds i en linje hyppigt under en 9-spins free spins-runde, mens 4+ wilds i samme linje er sjældent men muligt – især med genudløsning, der forlænger bonusrunden og giver flere chancer for wild-akkumulering.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Denne multiplikator-stacking er dét, der giver The Dog House sin karakteristiske gevinstprofil: de fleste free spins-runder producerer beskedne gevinster (5-20× indsats), men runder med gunstig wild-placement og 3×-multiplikatorer kan eksplodere til 500-2.000× indsatsen. Denne asymmetri er essensen af den høje volatilitet.
          </p>
        </section>

        {/* ── Free Spins-analyse ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            Free Spins-Dynamik og Genudløsning
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The Dog House's <Link to="/free-spins" className={linkClass}>free spins</Link> udløses af 3 scatter-symboler (kun hjul 1, 3 og 5) og giver et valg mellem to modi: standard free spins (9 spins med sticky wilds) eller raining wilds (9 spins med tilfældige wilds pr. spin, men ikke sticky). Standard-moden er den matematisk interessante for denne analyse.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Under standard free spins er hvert wild der lander permanent for runden. Med 9 spins og 3 wild-egnede positioner pr. spin (hjul 2, 3 og 4) er der teoretisk 27 muligheder for wilds – men kun 9 af de 15 total positioner kan bære wilds (hjul 2-4, række 1-3). Den gennemsnitlige free spins-runde producerer typisk 3-5 sticky wilds, hvilket giver en moderat multiplikator-effekt.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Genudløsning er mulig med 3 ekstra scattere under free spins, som tildeler yderligere 9 spins. Sandsynligheden for genudløsning er estimeret til ~8-12 % pr. free spins-runde. Genudløsning er særligt værdifuld fordi alle eksisterende sticky wilds forbliver, og nye wilds akkumuleres ovenpå – dette er typisk dér, de virkelig store gevinster (1.000×+) opstår.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Bonus Buy til 60× indsatsen giver direkte adgang til free spins. Den gennemsnitlige free spins-gevinst er ca. 50-70× indsatsen, hvilket gør Bonus Buy marginalt positiv EV over et stort sample. For spillere med begrænset tid eller utålmodighed er det en legitim strategi – men husk, at individuelle free spins-runder varierer enormt: fra 5× til 6.750× indsatsen.
          </p>
        </section>

        {/* ── EV ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            EV-Analyse og Sessionsøkonomi
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Med en house edge på 3,49 % (standard RTP) er The Dog House's EV-profil identisk med Reactoonz. Men gevinstdistributionen er markant anderledes: The Dog House koncentrerer en større del af sin RTP i bonusrunden, hvilket giver en mere "boom or bust"-oplevelse.
          </p>
          <Card className="border-border/50 bg-card/50 mb-4">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">EV-scenarier (10 kr./spin, standard RTP)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-2 pr-4">Session</th>
                      <th className="text-left py-2 pr-4">Samlet indsats</th>
                      <th className="text-left py-2 pr-4">Forventet tab</th>
                      <th className="text-left py-2">Tab pr. time*</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/30"><td className="py-2 pr-4">100 spins</td><td className="py-2 pr-4">1.000 kr.</td><td className="py-2 pr-4">34,90 kr.</td><td className="py-2">~87 kr.</td></tr>
                    <tr className="border-b border-border/30"><td className="py-2 pr-4">300 spins</td><td className="py-2 pr-4">3.000 kr.</td><td className="py-2 pr-4">104,70 kr.</td><td className="py-2">~87 kr.</td></tr>
                    <tr><td className="py-2 pr-4">1.000 spins</td><td className="py-2 pr-4">10.000 kr.</td><td className="py-2 pr-4">349,00 kr.</td><td className="py-2">~87 kr.</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-2">*Estimeret ved ~250 spins/time.</p>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed mb-4">
            RTP-fordelingen mellem basespil og bonus er estimeret til ca. 55 % basespil og 45 % free spins. Denne fordeling er mere bonus-tung end Wolf Gold (60/20/15) men mere balanceret end rent bonus-drevne slots som <Link to="/casinospil/spillemaskiner/dead-or-alive-2" className={linkClass}>Dead or Alive 2</Link> (~35/65). For spilleren betyder dette, at basespillet holder dig i live, mens free spins leverer de afgørende gevinstmoments.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Sammenlignet med Bonus Buy-prisen på 60× er den gennemsnitlige free spins-værdi på ~50-70× interessant. Over 100 Bonus Buy-forsøg (6.000× samlet indsats) ville du statistisk få ~5.000-7.000× tilbage, svarende til en RTP på ~83-117 %. Det brede interval understreger den høje varians – selv Bonus Buy-strategien kræver et stort sample for at konvergere mod gennemsnittet.
          </p>
        </section>

        {/* ── Volatilitet ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Volatilitetsprofil: Hvad Tallene Siger
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The Dog House's volatilitet er drevet af multiplikator-stackingen under free spins. Basespillet er relativt mild med en hit frequency på ~25 %, men bonusrundens multiplikator-potentiale skaber den høje overordnede varians.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            En typisk session på 200 spins vil indeholde 1-2 free spins-runder. De fleste runder (70-80 %) producerer gevinster under 30× indsatsen. Men de resterende 20-30 % kan generere 50-500× eller mere, afhængigt af wild-placement og multiplikator-tilfældighed. Denne distribution er karakteristisk for "sticky wild with multiplier"-genren.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For spillere, der overvejer The Dog House vs. alternative sticky wild-slots, er det værd at bemærke, at The Dog House's multiplikator-range (2×-3× pr. wild) er relativt konservativ. Nyere varianter som The Dog House Megaways tilbyder bredere multiplikator-ranges, men med tilsvarende højere volatilitet. Den originale The Dog House forbliver det mest balancerede valg i serien.
          </p>
        </section>

        {/* ── Risikoprofil ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Bankroll-Management og Risikokontrol
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The Dog House's moderate volatilitetsprofil tillader en relativt tilgængelig bankroll-tilgang. Vi anbefaler mindst 150 spins i en session for at give en realistisk chance for at opleve free spins-funktionen.
          </p>
          <Card className="border-border/50 bg-card/50 mb-4">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Bankroll-dimensionering</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-2 pr-4">Profil</th>
                      <th className="text-left py-2 pr-4">Bankroll</th>
                      <th className="text-left py-2 pr-4">Indsats</th>
                      <th className="text-left py-2">Spins</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/30"><td className="py-2 pr-4">Konservativ</td><td className="py-2 pr-4">800 kr.</td><td className="py-2 pr-4">2-4 kr.</td><td className="py-2">200-400</td></tr>
                    <tr className="border-b border-border/30"><td className="py-2 pr-4">Moderat</td><td className="py-2 pr-4">1.500 kr.</td><td className="py-2 pr-4">5-8 kr.</td><td className="py-2">188-300</td></tr>
                    <tr><td className="py-2 pr-4">Aggressiv</td><td className="py-2 pr-4">3.000 kr.</td><td className="py-2 pr-4">10-15 kr.</td><td className="py-2">200-300</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Husk altid <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>-principper. The Dog House's charmerende visuelle design og tilfredsstillende sticky wild-mekanik kan forlænge sessions ud over planlagte grænser. Sæt klare tab- og tidsgrænser, og overhold dem konsekvent.
          </p>
        </section>

        {/* ── Sammenligning ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            The Dog House vs. Sweet Bonanza vs. Gates of Olympus
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Tre af Pragmatic Play's mest populære slots sammenlignet:
          </p>
          <Card className="border-border/50 bg-card/50 mb-4">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-2 pr-4">Parameter</th>
                      <th className="text-left py-2 pr-4">The Dog House</th>
                      <th className="text-left py-2 pr-4">Sweet Bonanza</th>
                      <th className="text-left py-2">Gates of Olympus</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/30"><td className="py-2 pr-4 font-medium">RTP</td><td className="py-2 pr-4">96,51 %</td><td className="py-2 pr-4">96,48 %</td><td className="py-2">96,50 %</td></tr>
                    <tr className="border-b border-border/30"><td className="py-2 pr-4 font-medium">Max Win</td><td className="py-2 pr-4">6.750×</td><td className="py-2 pr-4">21.100×</td><td className="py-2">5.000×</td></tr>
                    <tr className="border-b border-border/30"><td className="py-2 pr-4 font-medium">Volatilitet</td><td className="py-2 pr-4">Høj</td><td className="py-2 pr-4">Høj</td><td className="py-2">Høj</td></tr>
                    <tr className="border-b border-border/30"><td className="py-2 pr-4 font-medium">Mekanik</td><td className="py-2 pr-4">Sticky Wilds</td><td className="py-2 pr-4">Tumble/Scatter</td><td className="py-2">Tumble/Multiplier</td></tr>
                    <tr><td className="py-2 pr-4 font-medium">Bonus Buy</td><td className="py-2 pr-4">60×</td><td className="py-2 pr-4">100×</td><td className="py-2">100×</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            The Dog House tilbyder den mest tilgængelige Bonus Buy-pris (60× vs. 100×) og den højeste RTP i trioen. <Link to="/casinospil/spillemaskiner/sweet-bonanza" className={linkClass}>Sweet Bonanza</Link> vinder på max win (21.100×), mens <Link to="/casinospil/spillemaskiner/gates-of-olympus" className={linkClass}>Gates of Olympus</Link> tilbyder den mest tilfredsstillende tumble-mekanik. For spillere, der prioriterer sticky wild-strategien og ønsker den billigste Bonus Buy, er The Dog House det optimale valg.
          </p>
        </section>

        <SlotDataLink slotSlug="the-dog-house" slotName="The Dog House" />
        <SlotProviderLink slotSlug="the-dog-house" />
        <LatestNewsByCategory pagePath="/casinospil/spillemaskiner/the-dog-house" />
        <RelatedGuides currentPath="/casinospil/spillemaskiner/the-dog-house" />
        <FAQSection title="Ofte Stillede Spørgsmål om The Dog House" faqs={theDogHouseFaqs} />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="spildansknu" />
    </>
  );
};

export default TheDogHouseGuide;
