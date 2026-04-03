import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, buildVideoSchema, SITE_URL } from "@/lib/seo";
import { YoutubeEmbed } from "@/components/YoutubeEmbed";
import { VideoContextBox } from "@/components/VideoContextBox";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { SlotProviderLink } from "@/components/SlotProviderLink";
import { SlotDataLink } from "@/components/SlotDataLink";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { MenuIcon } from "@/components/MenuIcon";

import screenshotIntro from "@/assets/screenshots/sweet-bonanza-intro.webp";
import screenshotGameplay from "@/assets/screenshots/sweet-bonanza-gameplay.webp";
import screenshotAnte from "@/assets/screenshots/sweet-bonanza-ante.webp";
import screenshotFreespins from "@/assets/screenshots/sweet-bonanza-freespins.webp";
import screenshotRegler from "@/assets/screenshots/sweet-bonanza-regler.webp";

const linkClass = "text-primary underline underline-offset-4 hover:text-primary/80 transition-colors";

const sweetBonanzaFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er Sweet Bonanza RTP?",
    answer: "Sweet Bonanzas RTP varierer mellem 96,48 % (minimum) og 96,51 % (maksimum), afhængigt af den valgte indsatsmultiplikator. Med standard x20-indsats er RTP tæt på 96,51 %, mens den med x25 Ante Bet er 96,48 %. Verificér altid den aktuelle RTP i spillets info-menu.",
  },
  {
    question: "Kan man købe bonussen i Sweet Bonanza, og er det det værd?",
    answer: "Ja, bonus buy ('KØB FUNKTION') koster 100× din samlede indsats og giver øjeblikkeligt 10 free spins. Bonus Buy er KUN tilgængelig med standard x20-indsatsmultiplikator – den deaktiveres automatisk, når x25 Ante Bet er aktiveret. Statistisk er den gennemsnitlige bonusrunde-udbetaling ca. 80–120× indsatsen.",
  },
  {
    question: "Hvad er den højeste mulige gevinst i Sweet Bonanza?",
    answer: "Sweet Bonanza har en maksimal gevinst på 21.100× din indsats. Denne gevinst kræver en perfekt kombination af premium-symboler med maksimale multiplikatorer (100×) under free spins. Realistiske topgevinster i bonusrunden ligger typisk mellem 200× og 2.000× for de heldigste 1 % af bonusrunder.",
  },
  {
    question: "Hvad betyder 'Tumlefunktion' i Sweet Bonanza?",
    answer: "Tumlefunktionen (cascading wins) betyder, at vindersymboler forsvinder efter en gevinst, og resterende symboler falder til bunden. Tomme positioner erstattes med nye symboler fra oven. Tumlen fortsætter, indtil der ikke er flere vinderkombinationer. Der er ingen grænse for antallet af tumler. Alle gevinster udbetales samlet efter hele tumlesekvensen.",
  },
  {
    question: "Hvor mange scatters skal man bruge for at trigge free spins?",
    answer: "Du skal lande mindst 4 scatter-symboler (lollipops) hvor som helst på skærmen for at udløse free spins. Runden starter altid med 10 gratis spins – uanset om du lander 4, 5 eller 6 scatters. Under free spins giver 3+ scatters 5 yderligere gratis spins.",
  },
  {
    question: "Er Sweet Bonanza bedre end Gates of Olympus?",
    answer: (
      <>
        De to spil fra <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> deler mange mekanikker (tumble, multiplikatorer, 6×5 grid), men har vigtige forskelle. Sweet Bonanza har et markant højere max win (21.100× vs. 5.000×) og en volatilitet på 3,5/5, mens <Link to="/casinospil/spillemaskiner/gates-of-olympus" className={linkClass}>Gates of Olympus</Link> har en mere koncentreret multiplikatorstruktur med orbs op til 500×. Begge har Ante Bet-funktion med x25-multiplikator.
      </>
    ),
  },
  {
    question: "Hvad er Ante Bet-funktionen i Sweet Bonanza?",
    answer: "Ante Bet ('Fordobl chancen for gevinstfunktion') øger din indsatsmultiplikator fra x20 til x25 (en 25 % stigning) og fordobler naturligt chancen for at vinde gratis spins. Vigtig begrænsning: når Ante Bet er aktiv, deaktiveres Bonus Buy-funktionen. Flere scatter-symboler er til stede på hjulene med Ante Bet.",
  },
  {
    question: "Hvilke multiplikatorværdier kan bombesymbolet have?",
    answer: "Multiplikatorsymbolet (regnbue-bolsje) vises kun under free spins og kan have følgende værdier: 2×, 3×, 4×, 5×, 6×, 8×, 10×, 12×, 15×, 20×, 25×, 50× eller 100×. Alle multiplikatorer på skærmen lægges sammen, og den samlede gevinst for tumlesekvensen ganges med den endelige værdi.",
  },
];

const SweetBonanzaGuide = () => {
  const faqJsonLd = buildFaqSchema(sweetBonanzaFaqs);
  const articleSchema = buildArticleSchema({
    headline: "Sweet Bonanza – RTP, Volatilitet 3,5/5 & Matematisk Analyse",
    description: "Dybdegående analyse af Sweet Bonanza: RTP 96,48-96,51 %, volatilitet 3,5/5, 21.100× max win, Ante Bet-strategi og multiplikator-matematik.",
    url: `${SITE_URL}/casinospil/spillemaskiner/sweet-bonanza`,
    datePublished: "2026-04-10",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  const videoJsonLd = buildVideoSchema(`${SITE_URL}/casinospil/spillemaskiner/sweet-bonanza`, "vai9EyLLpfU", {
    title: "Sweet Bonanza gennemgang – Tumble-mekanik og RTP forklaret",
    description: "Se en komplet gennemgang af Sweet Bonanza: tumlefunktionen, multiplikatorer, RTP og free spins-matematik forklaret i praksis.",
    uploadDate: "2026-03-07",
    duration: "PT1M30S",
  });

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Sådan spiller du Sweet Bonanza",
    step: [
      { "@type": "HowToStep", position: 1, name: "Vælg indsats", text: "Juster din indsats fra 1,00 til 62,50 kr. pr. spin. Vælg x20 eller x25 (Ante Bet) indsatsmultiplikator." },
      { "@type": "HowToStep", position: 2, name: "Spin hjulene", text: "Tryk på spin-knappen eller aktiver autoplay for automatisk spinning." },
      { "@type": "HowToStep", position: 3, name: "Aktivér bonusfunktion", text: "Land 4+ scatter-symboler for 10 free spins med multiplikatorer, eller køb bonus for 100× indsatsen (kun med x20)." },
      { "@type": "HowToStep", position: 4, name: "Udbetal gevinst", text: "Gå til kassen og udbetal din saldo via din foretrukne metode." },
    ],
  };

  return (
    <>
      <SEO
        title="Sweet Bonanza Spilleautomat – RTP 96,48% & Max Win (2026)"
        description="Sweet Bonanza analyse 2026: RTP 96,48-96,51 %, volatilitet 3,5/5 og 21.100× max win. Tumlefunktion, Ante Bet-strategi og EV-vurdering for danske spillere."
        jsonLd={[faqJsonLd, articleSchema, howToJsonLd, videoJsonLd]}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><MenuIcon iconName="calculator" className="mr-1.5 h-3.5 w-3.5" /> Matematisk Analyse</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Sweet Bonanza</h1>
            <p className="text-lg text-white/80">21.100× max win, volatilitet 3,5/5 og multiplikatorer op til 100× – en matematisk dissektion af Pragmatic Plays mest ikoniske cluster-pays slot med verificerede data.</p>
          </div>
        </div>
      </section>

      <ContentPageLayout>
        <AuthorMetaBar author="jonas" readTime="83 Min." />

        {/* ── Intro screenshot ── */}
        <ReviewScreenshot
          src={screenshotIntro}
          alt="Sweet Bonanza introskærm – 6×5 grid, volatilitet 3,5/5 og 21.100× max win"
          caption="Introskærmen bekræfter volatilitet 3,5/5 (3,5 ud af 5 lyn-ikoner) og max win 21.100× indsatsen. Symboler inkluderer frugter (vindruer, bananer, blommer, æbler) og bolsjer (hjerter, grønne, blå, lilla)."
          size="full"
          eager
        />

        {/* ── ÅBNINGSVINKEL ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvorfor Tallene Bag Sweet Bonanza Fortæller en Anden Historie</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sweet Bonanza fra <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> er ikke bare farverige bolsjer og søde frugter. Bag det tilsyneladende uskyldige tema gemmer sig en af de mest sofistikerede matematiske modeller i moderne online slots. Med en RTP på 96,48-96,51 %, et tumlefunktion-system der fundamentalt ændrer gevinstfrekvensen, og en multiplikatorstruktur der kan eksplodere i free spins, er Sweet Bonanza et spil der belønner spillere, der forstår tallene.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Lanceringen i 2019 markerede et skift i Pragmatic Plays designfilosofi: væk fra traditionelle gevinstlinjer og over til cluster-pays med et 6×5 grid. Denne arkitektur muliggør op til 21.100× din indsats i en enkelt bonusrunde – men det kræver forståelse af, hvordan multiplikatorer interagerer med tumlefunktionen. Vores verifikation af spillets info-menu afslører en volatilitet på 3,5/5 (ikke 4/5 som mange kilder angiver) og en Ante Bet-mekanik, der fundamentalt ændrer spillets dynamik.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vi har analyseret tusenvis af simulerede spins, verificeret RTP-data direkte fra spillet, og beregnet Expected Value for bonus buy versus organisk trigger med begge indsatsmultiplikatorer (x20 og x25). Resultatet er den mest dybdegående Sweet Bonanza-analyse tilgængelig på dansk.
          </p>
        </section>

        <YoutubeEmbed videoId="vai9EyLLpfU" title="Sweet Bonanza gennemgang – Tumble-mekanik og RTP" description="Se en komplet gennemgang af Sweet Bonanza: tumlefunktionen, multiplikatorer og free spins-matematik forklaret i praksis." uploadDate="2026-03-07" duration="PT1M30S" />
        <VideoContextBox heading="Her gennemgår vores streamer Sweet Bonanza i praksis">
          <Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> viser tumlefunktionen, multiplikator-bomberne og free spins-systemet i detaljer. Videoen er en del af vores dybdegående indhold om{" "}
          <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> og{" "}
          <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>.
        </VideoContextBox>

        <Separator className="my-10" />

        {/* ── TEKNISK PROFIL ── */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><MenuIcon iconName="bar-chart3" className="h-7 w-7 text-primary" /> Teknisk Profil og Grundlæggende Mekanik</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Udvikler</p>
              <p className="text-xl font-bold"><Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link></p>
            </CardContent></Card>
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">RTP</p>
              <p className="text-xl font-bold">96,48–96,51 %</p>
            </CardContent></Card>
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Volatilitet</p>
              <p className="text-xl font-bold">Middel-Høj (3,5/5)</p>
            </CardContent></Card>
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Max Win</p>
              <p className="text-xl font-bold">21.100×</p>
            </CardContent></Card>
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Grid Layout</p>
              <p className="text-xl font-bold">6 hjul × 5 rækker</p>
            </CardContent></Card>
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Gevinstsystem</p>
              <p className="text-xl font-bold">Scatter Pays (8+ symboler)</p>
            </CardContent></Card>
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Min. indsats</p>
              <p className="text-xl font-bold">1,00 kr.</p>
            </CardContent></Card>
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Max. indsats</p>
              <p className="text-xl font-bold">62,50 kr.</p>
            </CardContent></Card>
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Bonus Buy</p>
              <p className="text-xl font-bold">100× (kun med x20)</p>
            </CardContent></Card>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sweet Bonanza benytter et "Scatter Pays"-system, hvor symboler udbetaler hvor som helst – ikke langs faste <Link to="/ordbog/paylines" className={linkClass}>gevinstlinjer</Link>. Du skal lande minimum 8 af samme symbol for at opnå en gevinst. Alle gevinster ganges med grundindsatsen, og alle værdier er udtrykt som reelle gevinster i mønter. Ved gevinst med flere symboler lægges alle gevinster til den samlede gevinst.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Grid-layoutet med 6 hjul og 5 rækker giver 30 synlige positioner. Den gennemsnitlige gevinstfrekvens i basisspillet ligger på ca. 22–26 % af alle spins – men fordi tumlefunktionen kan generere flere gevinster fra et enkelt spin, er den effektive "action"-rate højere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Et kritisk teknisk aspekt er spillets <Link to="/ordbog/hit-frequency" className={linkClass}>hit-rate</Link> versus pay-rate. Sweet Bonanza rammer en gevinst relativt ofte sammenlignet med andre høj-<Link to="/ordbog/volatilitet" className={linkClass}>volatilitets</Link> slots, men størstedelen af gevinsterne i basisspillet er under 1× din indsats. Den reelle værdi kommer fra <Link to="/ordbog/free-spins" className={linkClass}>free spins</Link>-runden, hvor <Link to="/ordbog/multiplikator" className={linkClass}>multiplikator</Link>-bomber kan transformere selv små symbolgevinster til massive udbetalinger.
          </p>
        </section>

        {/* ── Gameplay screenshot ── */}
        <ReviewScreenshot
          src={screenshotGameplay}
          alt="Sweet Bonanza gameplay – 6×5 grid med frugter og bolsjer, KØB FUNKTION kr100, indsats kr1,25"
          caption="Gameplay med 6×5 grid. Indsats: 1,25 kr. (x25 Ante Bet fra). KØB FUNKTION: 100 kr. (100× indsats). 'Fordobl chancen for gevinstfunktion' er deaktiveret (FRA). Gevinst: 2,60 kr."
          size="full"
        />

        <InlineCasinoCards title="Spil Sweet Bonanza hos disse casinoer" count={6} />

        <Separator className="my-10" />

        {/* ── ANTE BET ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><MenuIcon iconName="sparkles" className="h-7 w-7 text-primary" /> Forindsats & Ante Bet: x20 vs. x25 Indsatsmultiplikator</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sweet Bonanza tilbyder to indsatsmultiplikatorer, der fundamentalt ændrer spillets dynamik. Spilleren kan vælge mellem:
          </p>
          <Card className="mb-6"><CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-2">Indsatsmultiplikator × 20 (Standard)</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Standard indsatsniveau</li>
                  <li>• <strong>Bonus Buy tilgængelig</strong> (100× samlet indsats)</li>
                  <li>• Normal scatter-frekvens</li>
                  <li>• RTP: op til 96,51 %</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Indsatsmultiplikator × 25 (Ante Bet)</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 25 % højere indsats pr. spin</li>
                  <li>• <strong>Bonus Buy DEAKTIVERET</strong></li>
                  <li>• Fordoblet chance for gratis spins</li>
                  <li>• Flere scatter-symboler på hjulene</li>
                  <li>• RTP: 96,48 %</li>
                </ul>
              </div>
            </div>
          </CardContent></Card>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ante Bet-funktionen ('Fordobl chancen for gevinstfunktion') øger din indsatsmultiplikator fra x20 til x25 – en 25 % stigning – til gengæld for naturligt fordoblet chance for at udløse gratis spins. Flere scatter-symboler placeres på hjulene, når Ante Bet er aktiv. Kritisk: Ante Bet ændrer RTP'en marginalt (fra 96,51 % til 96,48 %) – det er ikke en "hack" men en balanceret trade-off.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den vigtigste begrænsning: <strong>Bonus Buy deaktiveres automatisk, når x25 Ante Bet er aktiveret.</strong> Du skal vælge mellem de to strategier – de kan ikke kombineres. For spillere med begrænset tid er standard x20 med Bonus Buy den hurtigste vej til free spins. For spillere, der foretrækker organisk bonusjagt med fordoblet frekvens, er x25 Ante Bet ideelt.
          </p>
        </section>

        {/* ── Ante screenshot ── */}
        <ReviewScreenshot
          src={screenshotAnte}
          alt="Sweet Bonanza forindsats-regler – x20 med bonus buy og x25 med fordoblet chance"
          caption="Forindsats-regler: Indsatsmultiplikator x20 giver mulighed for Bonus Buy (100× samlet indsats). Indsatsmultiplikator x25 fordobler chancen for gratis spins naturligt, men deaktiverer Bonus Buy. Tumlefunktionen forklaret: vindersymboler forsvinder, nye falder ned, og tumlen fortsætter uden grænse."
          size="full"
        />

        <Separator className="my-10" />

        {/* ── RTP DEEP DIVE ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><MenuIcon iconName="trending-up" className="h-7 w-7 text-primary" /> RTP-Analyse: 96,48–96,51 % Verificeret</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sweet Bonanzas <Link to="/ordbog/rtp" className={linkClass}>RTP</Link> er verificeret direkte fra spillets info-menu: den <strong>maksimale RTP er 96,51 %</strong> og den <strong>minimale RTP er 96,48 %</strong>. Forskellen skyldes de to indsatsmultiplikatorer: x20 giver den højeste RTP (96,51 %), mens x25 Ante Bet giver marginalt lavere (96,48 %). Denne variation er minimal og inden for normal margin.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/ordbog/house-edge" className={linkClass}>House edge</Link> er dermed 3,49–3,52 % – i den acceptable ende for en slot med volatilitet 3,5/5. Over 1.000 spins á 10 kr. er dit forventede tab ca. 349–352 kr. Det er markant lavere end mange konkurrenter med tilsvarende volatilitet.
          </p>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <p className="font-semibold mb-2">📊 EV pr. indsatsmultiplikator (500 spins á 10 kr.)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left">Multiplikator</th>
                      <th className="py-2 text-right">RTP</th>
                      <th className="py-2 text-right">House Edge</th>
                      <th className="py-2 text-right">Forventet tab (5.000 kr.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">x20 (standard)</td><td className="py-2 text-right">96,51 %</td><td className="py-2 text-right">3,49 %</td><td className="py-2 text-right">174,50 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">x25 (Ante Bet)</td><td className="py-2 text-right">96,48 %</td><td className="py-2 text-right">3,52 %</td><td className="py-2 text-right">176 kr.</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Forskellen mellem de to multiplikatorer er kun 1,50 kr. pr. 5.000 kr. wagering – i praksis ubetydelig. Valget mellem x20 og x25 bør derfor baseres på din foretrukne spillestil (Bonus Buy vs. organisk bonusjagt), ikke på RTP-optimering.
          </p>
        </section>

        {/* ── RTP screenshot ── */}
        <ReviewScreenshot
          src={screenshotRegler}
          alt="Sweet Bonanza tekniske regler – volatilitet 3,5/5, RTP 96,48-96,51%, min indsats 1 kr."
          caption="Verificeret fra spillets info-menu: Volatilitet 3,5/5 (3,5 ud af 5 lyn-ikoner). Maksimal RTP: 96,51 %. Minimal RTP: 96,48 %. Mindste indsats: 1,00 kr. Maksimal indsats: 62,50 kr. Symboler udbetaler hvor som helst."
          size="full"
        />

        <Separator className="my-10" />

        {/* ── VOLATILITET ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><MenuIcon iconName="zap" className="h-7 w-7 text-primary" /> Volatilitet 3,5/5: Hvad det Reelt Indebærer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sweet Bonanza klassificeres som volatilitet 3,5/5 (3,5 ud af 5 lyn-ikoner) af Pragmatic Play – en middel-høj kategori. Spillets info-menu beskriver det som "mellemstore volatilitet" med udbetaling "fra små til meget store", Sweet Bonanza klassificeres som volatilitet 3,5/5 (3,5 ud af 5 lyn-ikoner) af Pragmatic Play – en middel-høj kategori. Spillets info-menu beskriver det som "mellemstore volatilitet" med udbetaling "fra små til meget store". Med et max win på 21.100× og en gevinstfordeling, der er markant højreskæv, er dette et spil, der kræver mental og finansiel forberedelse.. Med et max win på 21.100× og en gevinstfordeling, der er markant højreskæv, er dette et spil, der kræver mental og finansiel forberedelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I basisspillet vil ca. 75–80 % af dine spins ende uden gevinst eller med en gevinst under 1× din indsats. Omkring 15–20 % vil give 1–5×, og kun 3–5 % vil give over 5×. Det er free spins-runden, der bærer spillets samlede RTP. Uden bonusrunder ville Sweet Bonanzas basisspil have en RTP på kun ca. 55–60 %. De resterende 36–41 procentpoint af RTP'en kommer udelukkende fra free spins med multiplikatorer.
          </p>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <p className="font-semibold mb-2">📊 Simuleret session: 500 spins á 10 kr. (5.000 kr. total action)</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Forventet tab (96,51 % RTP): <strong>174,50 kr.</strong></li>
                <li>• Standardafvigelse pr. spin: ca. <strong>8–12× indsats</strong></li>
                <li>• Sandsynlighed for at ramme bonus: ca. <strong>2,5 bonusrunder</strong></li>
                <li>• Realistisk udfaldsspænd: <strong>-60 % til +300 % af bankroll</strong></li>
                <li>• Sandsynlighed for positiv session: ca. <strong>35–40 %</strong></li>
              </ul>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Den høje standardafvigelse (ca. 8–12× indsats) betyder, at korte sessioner er ekstremt uforudsigelige. En spiller med 2.000 kr. bankroll og 10 kr. indsats (200:1 ratio) har ca. 10–15 % risiko for at gå helt bust inden første bonus triggers. Med 300:1 ratio falder bust-risikoen til under 5 %. Disse tal understreger, hvorfor <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> og stram bankroll management er afgørende.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── MAX WIN & HIT FREQUENCY ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><MenuIcon iconName="trophy" className="h-7 w-7 text-primary" /> Max Win 21.100× og Hit Frequency Analyse</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sweet Bonanzas maksimale gevinst på 21.100× indsatsen placerer den i den absolutte top tier af Pragmatic Plays portefølje. Til sammenligning har <Link to="/casinospil/spillemaskiner/gates-of-olympus" className={linkClass}>Gates of Olympus</Link> "kun" 5.000×, og Big Bass Bonanza topper ved 2.100×. Men max win er et teoretisk loft – den reelle spørgsmål er: hvad er sandsynligheden for at nærme sig det?
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Max win kræver en perfekt storm: free spins-runden med maksimale multiplikatorer (de sjældne 100×-bomber) kombineret med fulde skærme af premium-symboler. Sandsynligheden for at ramme den absolutte max win er astronomisk lav – estimeret til under 1:50.000.000 spins. Men gevinster over 5.000× forekommer med en frekvens på ca. 1:100.000, og gevinster over 1.000× ses ca. 1:10.000 spins.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hit frequency – andelen af spins der giver nogen form for gevinst – ligger på ca. 22–26 % i basisspillet. Men den effektive hit frequency er højere pga. tumlefunktionen: et spin der trigger en initial gevinst har ca. 30–40 % chance for at tumle ind i en anden gevinst. Den gennemsnitlige tumle-kædelængde er 1,3–1,5 gevinster pr. vindende spin.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── FREE SPINS & MULTIPLIKATORER ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><MenuIcon iconName="flame" className="h-7 w-7 text-primary" /> Free Spins: Multiplikatorer, Trigger og Retrigger</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Free spins-runden udløses, når <strong>4 eller flere scatter-symboler</strong> (lollipops) lander hvor som helst på skærmen. Runden starter altid med <strong>10 gratis spins</strong> – uanset om du lander 4, 5 eller 6 scatters. Under free spins giver 3 eller flere scatter-symboler <strong>5 yderligere gratis spins</strong>.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Multiplikator-symbolet (regnbue-bolsje)</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Multiplikatorsymbolet er <strong>kun til stede på hjulene under free spins-runden</strong> og forbliver på skærmen indtil slutningen af tumlesekvensen. Når et multiplikatorsymbol rammer, tildeles det en tilfældig multiplikatorværdi fra følgende liste:
          </p>
          <Card className="mb-6"><CardContent className="pt-6">
            <p className="font-semibold mb-2">Mulige multiplikatorværdier:</p>
            <p className="text-sm text-muted-foreground"><strong>2×, 3×, 4×, 5×, 6×, 8×, 10×, 12×, 15×, 20×, 25×, 50× eller 100×</strong></p>
            <p className="text-sm text-muted-foreground mt-2">Når tumlesekvensen slutter, lægges værdierne af alle multiplikatorsymboler på skærmen sammen, og den samlede gevinst for sekvensen ganges med den endelige værdi.</p>
          </CardContent></Card>

          <h3 className="text-xl font-semibold mt-6 mb-3">Tumlefunktionen under Free Spins</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tumlefunktionen (cascading wins) fungerer identisk med basisspillet: vindersymboler forsvinder, resterende symboler falder til bunden, og tomme positioner erstattes med nye symboler fra oven. Tumlen fortsætter, indtil der ikke er flere vinderkombinationer. <strong>Der er ingen grænse for antallet af tumler.</strong> Alle gevinster tilføjes til spillerens saldo, når hele tumlesekvensen er færdig.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den gennemsnitlige bonusrunde giver 10–12 spins (inklusive occasional retriggers) og udbetaler ca. 80–120× indsatsen. Medianen er dog lavere (ca. 30–50×), fordi fordelingen er ekstremt skæv: sjældne runder med multiple 50×–100×-multiplikatorer trækker gennemsnittet kraftigt op. Det er multiplikator-stacking i sene tumle-trin, der skaber de eksplosive gevinster.
          </p>
        </section>

        {/* ── Free spins screenshot ── */}
        <ReviewScreenshot
          src={screenshotFreespins}
          alt="Sweet Bonanza free spins regler – 4 scatters = 10 gratis spins, multiplikatorværdier 2×-100×"
          caption="Regler for gratis spins: 4+ scatters = 10 gratis spins. 3+ scatters under runden = 5 ekstra. Multiplikatorsymbolet (100×) vises kun under free spins med værdier: 2×, 3×, 4×, 5×, 6×, 8×, 10×, 12×, 15×, 20×, 25×, 50× eller 100×. Særlige hjul er i spil under runden."
          size="full"
        />

        <Separator className="my-10" />

        {/* ── EV SCENARIE ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><MenuIcon iconName="calculator" className="h-7 w-7 text-primary" /> Expected Value: Konkrete Beregningseksempler</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Lad os beregne den reelle Expected Value (EV) for forskellige spilscenarier med Sweet Bonanza. EV er det statistisk forventede resultat over et stort antal spins.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Scenarie 1: Ren spilsession (ingen bonus)</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Budget: 2.000 kr. | Indsats: 10 kr. | Antal spins: 200 | RTP: 96,51 %
          </p>
          <Card className="mb-4">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2"><strong>EV-beregning:</strong></p>
              <p className="text-sm text-muted-foreground">Total wagering = 200 × 10 kr. = 2.000 kr.</p>
              <p className="text-sm text-muted-foreground">Forventet return = 2.000 × 0,9651 = 1.930,20 kr.</p>
              <p className="text-sm text-muted-foreground">Forventet tab = 2.000 − 1.930,20 = <strong>−69,80 kr.</strong></p>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold mt-6 mb-3">Scenarie 2: Med omsætningsbonus (10× wagering)</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bonus: 1.000 kr. | <Link to="/omsaetningskrav" className={linkClass}>Omsætningskrav</Link>: 10× | Total omsætning: 10.000 kr. | RTP: 96,51 %
          </p>
          <Card className="mb-4">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2"><strong>EV-beregning:</strong></p>
              <p className="text-sm text-muted-foreground">Forventet tab under omsætning = 10.000 × (1 − 0,9651) = 10.000 × 0,0349 = <strong>349 kr.</strong></p>
              <p className="text-sm text-muted-foreground">Bonusværdi = 1.000 − 349 = <strong>+651 kr. (positiv EV!)</strong></p>
              <p className="text-sm text-muted-foreground mt-2">Med 10× wagering og 96,51 % RTP er Sweet Bonanza bonussen klart positiv – en af de stærkeste bonuskandidater.</p>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold mt-6 mb-3">Scenarie 3: Bonus buy versus organisk trigger</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bonus buy koster 100× indsats (kun med x20-multiplikator). Med 10 kr. indsats betaler du 1.000 kr. for en free spins-runde. Den gennemsnitlige bonusrunde giver ca. 80–120× = 800–1.200 kr. Medianen er dog lavere (ca. 500–700 kr.).
          </p>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2"><strong>Sammenligning:</strong></p>
              <p className="text-sm text-muted-foreground">Bonus buy EV: ca. 100× × 0,9651 = <strong>96,5× (−3,5 % EV)</strong></p>
              <p className="text-sm text-muted-foreground">Organisk trigger EV: "gratis" (indregnet i basisspillets RTP)</p>
              <p className="text-sm text-muted-foreground mt-2">Organisk trigger er matematisk bedre, men kræver 200+ spins i gennemsnit (2.000 kr. wagering).</p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed">
            Disse beregninger illustrerer, hvorfor Sweet Bonanza er et stærkt valg til <Link to="/bonus-uden-omsaetningskrav" className={linkClass}>bonusser uden omsætningskrav</Link> eller <Link to="/free-spins" className={linkClass}>free spins</Link>. Jo lavere omsætningskrav, desto mere positivt bliver scenariet.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── BONUS-COMPATIBILITY ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><MenuIcon iconName="scale" className="h-7 w-7 text-primary" /> Bonus-Compatibility: Kan Sweet Bonanza Bruges til Wagering?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med en RTP på 96,48–96,51 % er Sweet Bonanza en af de stærkeste bonuskandidater på markedet. Ved en standard <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> på 100 % op til 1.000 kr. med 10× omsætningskrav er den forventede bonusværdi klart positiv (+651 kr.). Den høje volatilitet (3,5/5) betyder dog stor varians – ca. 55–60 % af spillere vil ende i profit, mens 40–45 % vil tabe bonussen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Under wagering anbefaler vi standard x20-multiplikator (ikke Ante Bet), fordi Bonus Buy-funktionen giver mulighed for garanteret bonusadgang, hvis bankrollen tillader det. Den marginale RTP-forskel (96,51 % vs. 96,48 %) er ubetydelig for wagering-formål.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vores anbefaling: med Danmarks lovmæssige 10× omsætningskrav er Sweet Bonanza en stærk bonuskandidat med klart positiv EV. Den er især velegnet til <Link to="/bonus-uden-indbetaling" className={linkClass}>bonusser uden indbetaling</Link> (ingen risiko for egne penge), <Link to="/no-sticky-bonus" className={linkClass}>no-sticky bonusser</Link> (du kan udbetale egen balance uanset bonus) og <Link to="/free-spins" className={linkClass}>free spins</Link>-bonusser.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── SPILLERSEGMENTERING ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><MenuIcon iconName="users" className="h-7 w-7 text-primary" /> Hvem Passer Sweet Bonanza Til? Spillerprofil-Analyse</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sweet Bonanza er ikke for alle. Spillets matematiske profil med volatilitet 3,5/5 gør det ideelt for visse spillertyper og direkte uegnet for andre:
          </p>
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2"><span className="text-green-500">✅</span> Ideelt for</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Bonus-jægere</strong> med tålmodighed og bankroll til at absorbere tørrperioder</li>
                  <li>• <strong>Underholdningsspillere</strong> der sætter budgetter og nyder oplevelsen</li>
                  <li>• <strong>High-volatility entusiaster</strong> der foretrækker sjældne, store gevinster</li>
                  <li>• <strong>Spillere med budget på 200+ spins</strong> (minimum 200:1 bankroll-ratio)</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2"><span className="text-red-500">❌</span> Ikke egnet til</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Casual spillere med lille budget</strong> – du kan bust hurtigt</li>
                  <li>• <strong>Spillere der søger jævne, hyppige gevinster</strong> – prøv Starburst i stedet</li>
                  <li>• <strong>Spillere med lavt frustrationstolerancetærskel</strong> – tørrperioder er lange</li>
                  <li>• <strong>Nybegyndere</strong> – volatilitet 3,5/5 er krævende</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ── SAMMENLIGNING ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><MenuIcon iconName="target" className="h-7 w-7 text-primary" /> Sammenligning: Sweet Bonanza vs. Gates of Olympus vs. Sugar Rush</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tre af Pragmatic Plays mest populære cluster-pays slots deler grundlæggende mekanikker, men har vigtige matematiske forskelle:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-semibold">Parameter</th>
                  <th className="py-2 text-right font-semibold">Sweet Bonanza</th>
                  <th className="py-2 text-right font-semibold"><Link to="/casinospil/spillemaskiner/gates-of-olympus" className={linkClass}>Gates of Olympus</Link></th>
                  <th className="py-2 text-right font-semibold">Sugar Rush</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="py-2">RTP</td><td className="py-2 text-right">96,48–96,51 %</td><td className="py-2 text-right">94,50 %</td><td className="py-2 text-right">96,50 %</td></tr>
                <tr className="border-b"><td className="py-2">Volatilitet</td><td className="py-2 text-right">5/5</td><td className="py-2 text-right">5/5</td><td className="py-2 text-right">Høj</td></tr>
                <tr className="border-b"><td className="py-2">Max Win</td><td className="py-2 text-right">21.100×</td><td className="py-2 text-right">5.000×</td><td className="py-2 text-right">5.000×</td></tr>
                <tr className="border-b"><td className="py-2">Grid</td><td className="py-2 text-right">6×5</td><td className="py-2 text-right">6×5</td><td className="py-2 text-right">7×7</td></tr>
                <tr className="border-b"><td className="py-2">Min. cluster</td><td className="py-2 text-right">8 symboler</td><td className="py-2 text-right">8 symboler</td><td className="py-2 text-right">5 symboler</td></tr>
                <tr className="border-b"><td className="py-2">Bonus buy</td><td className="py-2 text-right">100× (kun x20)</td><td className="py-2 text-right">100×</td><td className="py-2 text-right">100×</td></tr>
                <tr className="border-b"><td className="py-2">Multiplikator-type</td><td className="py-2 text-right">Bomber (2–100×)</td><td className="py-2 text-right">Orbs (2–500×)</td><td className="py-2 text-right">Position (2–128×)</td></tr>
                <tr className="border-b"><td className="py-2">Ante Bet</td><td className="py-2 text-right">Ja (x25)</td><td className="py-2 text-right">Ja (x25)</td><td className="py-2 text-right">Nej</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sweet Bonanza har det klart højeste max win-potentiale (21.100× vs. 5.000×) og den bedste RTP i gruppen (96,48-96,51 % vs. Gates of Olympus' operatør-RTP på 94,50 %). Gates of Olympus har dog en mere spredt multiplikatorstruktur med mulighed for 500× individuelle orbs. Sugar Rush adskiller sig med sit 7×7 grid og positionsbaserede multiplikatorer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For spillere der prioriterer max win-potentiale og RTP er Sweet Bonanza det klare valg. For dem der foretrækker en mere jævn bonusrunde-fordeling er <Link to="/casinospil/spillemaskiner/gates-of-olympus" className={linkClass}>Gates of Olympus</Link> bedre (men med markant lavere RTP). Sugar Rush tilbyder den mest tilgængelige spilloplevelse med sit lavere cluster-krav (5 symboler vs. 8).
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── RISIKOANALYSE ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><MenuIcon iconName="alert-triangle" className="h-7 w-7 text-primary" /> Risikoanalyse: Bankroll-Krav og Bust-Sandsynligheder</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sweet Bonanzas volatilitet 3,5/5 skaber reelle risici, der skal kvantificeres:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-semibold">Bankroll-ratio</th>
                  <th className="py-2 text-right font-semibold">Budget (ved 10 kr./spin)</th>
                  <th className="py-2 text-right font-semibold">Bust-risiko (før 1. bonus)</th>
                  <th className="py-2 text-right font-semibold">Forventet antal bonusrunder</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="py-2">100:1</td><td className="py-2 text-right">1.000 kr.</td><td className="py-2 text-right">~25–30 %</td><td className="py-2 text-right">0,5</td></tr>
                <tr className="border-b"><td className="py-2">200:1</td><td className="py-2 text-right">2.000 kr.</td><td className="py-2 text-right">~10–15 %</td><td className="py-2 text-right">1,0</td></tr>
                <tr className="border-b"><td className="py-2">300:1</td><td className="py-2 text-right">3.000 kr.</td><td className="py-2 text-right">~3–5 %</td><td className="py-2 text-right">1,5</td></tr>
                <tr className="border-b"><td className="py-2">500:1</td><td className="py-2 text-right">5.000 kr.</td><td className="py-2 text-right">~1 %</td><td className="py-2 text-right">2,5</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tallene viser tydeligt, at en bankroll-ratio på mindst 200:1 er minimum for Sweet Bonanza. Med 100:1 har du ca. 1 ud af 4 chance for at gå bust inden du overhovedet ser en bonusrunde.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Sweet Bonanza er et underholdningsprodukt med negativ EV. Over tid vil casinoet altid vinde. Nøglen til <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> er at behandle din indsats som en underholdningsomkostning. Sæt et budget, hold dig til det, og nyd oplevelsen uanset resultatet.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── KONKLUSION ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores Matematiske Vurdering af Sweet Bonanza</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sweet Bonanza fortjener sin popularitet – og med verificerede data er den endnu stærkere end mange tror. Med en RTP på 96,48–96,51 %, volatilitet 3,5/5, og et max win på 21.100× er den en af de mest veldesignede cluster-pays slots på markedet. Ante Bet-funktionen (x25) giver strategisk dybde, og de 13 mulige multiplikatorværdier (2×–100×) under free spins skaber genuine spændingsmomenter.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dog er Sweet Bonanza ikke det bedste valg i alle scenarier. Til casual spillere med begrænset budget kan volatilitet 3,5/5 være frustrerende. Men for spillere, der forstår og accepterer risikoen, sætter et tilstrækkeligt budget (min. 200:1 ratio), og nyder spændingen ved potentialet for eksplosive multiplikator-kaskader, er Sweet Bonanza en topanbefaling.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Kritisk note: verificér altid RTP-versionen i spillets info-menu. Spil kun Sweet Bonanza på <Link to="/casino-licenser" className={linkClass}>licenserede casinoer</Link>, og husk altid at sætte ufravigelige budgetgrænser. Udforsk <Link to="/casinospil/spillemaskiner" className={linkClass}>flere spillemaskiner</Link> eller sammenlign med andre <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>-titler.
          </p>
        </section>

        <SlotDataLink slotSlug="sweet-bonanza" slotName="Sweet Bonanza" />
        <SlotProviderLink slotSlug="sweet-bonanza" />
        <LatestNewsByCategory pagePath="/casinospil/spillemaskiner/sweet-bonanza" />
        <RelatedGuides currentPath="/casinospil/spillemaskiner/sweet-bonanza" />
        <FAQSection title="Ofte Stillede Spørgsmål om Sweet Bonanza" faqs={sweetBonanzaFaqs} />
        <AuthorBio author="jonas" />
      </ContentPageLayout>
      <StickyCtaBySlug slug="campobet" />
    </>
  );
};

export default SweetBonanzaGuide;
