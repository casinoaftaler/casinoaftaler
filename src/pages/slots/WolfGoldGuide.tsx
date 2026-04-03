import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { ContentPageLayout } from "@/components/ContentPageLayout";
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
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { MenuIcon } from "@/components/MenuIcon";

import screenshotIntro from "@/assets/screenshots/wolf-gold-intro.webp";
import screenshotFeatures from "@/assets/screenshots/wolf-gold-features.webp";
import screenshotPengegenspin from "@/assets/screenshots/wolf-gold-pengegenspin.webp";
import screenshotRegler from "@/assets/screenshots/wolf-gold-regler.webp";

const linkClass = "text-primary underline underline-offset-4 hover:text-primary/80 transition-colors";

const wolfGoldFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er Wolf Gold RTP?",
    answer: (
      <>
        Wolf Gold har en teoretisk RTP på <strong>93,99 %</strong>, verificeret direkte fra spillets info-menu. Det giver et house edge på 6,01 %. Sammenlignet med andre <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>-titler som Sweet Bonanza (96,48-96,51 %) er Wolf Gold markant lavere i RTP. Over 1.000 spins á 10 kr. er det forventede statistiske tab 601 kr. Verificér altid RTP'en i spillets info-menu, da operatør-specifikke versioner kan variere.
      </>
    ),
  },
  {
    question: "Hvordan fungerer Penge-Genspin-funktionen i Wolf Gold?",
    answer: (
      <>
        Penge-Genspin udløses, når 6 eller flere pengesymboler (måner) lander på hjulene. Du modtager 3 genspin, og hvert nyt pengesymbol nulstiller tælleren til 3. Pengesymbolerne bærer tilfældige værdier: 1×, 2×, 3×, 4×, 5×, 6×, 7×, 8×, 10×, 14×, 16×, 18×, 20×, 24×, 30× eller 100× den samlede indsats – eller MINI/STOR JACKPOT-værdier. Alle værdier summeres ved rundens afslutning. Hvis alle 15 positioner fyldes, vinder du MEGA JACKPOT. Funktionen er også tilgængelig under gratis spin-runden.
      </>
    ),
  },
  {
    question: "Er Wolf Gold's jackpot progressiv eller fast?",
    answer: (
      <>
        Wolf Gold har en hybrid jackpot-struktur med faste jackpots: MINI, STOR og MEGA. Jackpot-værdierne er proportionale med din samlede indsats. Der er ingen progressiv jackpot-pool – alle gevinster er direkte multiplikatorer af indsatsen. MEGA JACKPOT vindes kun ved at fylde alle 15 positioner med pengesymboler under Penge-Genspin. Dette betyder, at RTP'en forbliver konstant uanset jackpot-størrelsen.
      </>
    ),
  },
  {
    question: "Hvem passer Wolf Gold til?",
    answer: (
      <>
        Wolf Gold er designet til spillere, der søger en mellemvej mellem klassisk slot-design og moderne bonusfunktioner. Den medium-høje volatilitet og det tematisk stærke vilde vesten-design appellerer bredt. Spillere, der foretrækker jackpot-mekanikker (Penge-Genspin) frem for free spins-centrerede bonusser, vil finde Wolf Gold tilfredsstillende. Bemærk dog den relativt lave RTP (93,99 %) – for bedre matematisk værdi kan <Link to="/casinospil/spillemaskiner/sweet-bonanza" className={linkClass}>Sweet Bonanza</Link> (96,48 %) anbefales.
      </>
    ),
  },
  {
    question: "Kan Wolf Gold spilles med bonuspenge?",
    answer: (
      <>
        Wolf Gold er generelt tilgængelig for <Link to="/casino-bonus" className={linkClass}>bonusspil</Link> på danske casinoer, men med en RTP på 93,99 % er den en <strong>dårlig wagering-kandidat</strong>. Ved 10× omsætning på 1.000 kr. (10.000 kr. samlet indsats) er det forventede tab 601 kr. – mere end halvdelen af bonussen. For bedre bonuseffektivitet anbefaler vi <Link to="/casinospil/spillemaskiner/hoej-rtp" className={linkClass}>slots med høj RTP</Link>.
      </>
    ),
  },
  {
    question: "Hvor mange gratis spin kan man vinde i Wolf Gold?",
    answer: (
      <>
        Wolf Gold's gratis spin-funktion udløses af 3 scatter-symboler (vises kun på hjul 1, 3 og 5) og giver <strong>5 gratis spin</strong>. 3 scatters udbetaler desuden 1× den samlede indsats. Under gratis spin fusioneres hjul 2, 3 og 4 til ét KÆMPE symbol. Gratis spin kan genudløses med yderligere 3 scatters for 5 ekstra spin – <strong>ingen grænser!</strong> Penge-Genspin er også tilgængelig under gratis spin-runden.
      </>
    ),
  },
  {
    question: "Hvad er forskellen mellem Wolf Gold og Sweet Bonanza?",
    answer: (
      <>
        Wolf Gold (5×3, 25 linjer) og <Link to="/casinospil/spillemaskiner/sweet-bonanza" className={linkClass}>Sweet Bonanza</Link> (6×5, cluster pays) er begge fra Pragmatic Play, men med fundamentalt forskellige profiler. Sweet Bonanza har markant højere RTP (96,48 % vs. 93,99 %), højere max win (21.100× vs. ~1.000×) og tumble-mekanik. Wolf Gold tilbyder til gengæld en klassisk slot-oplevelse med jackpot-system (Penge-Genspin) og stablede wilds. Matematisk er Sweet Bonanza det klart overlegne valg.
      </>
    ),
  },
  {
    question: "Hvad er min. og max. indsats i Wolf Gold?",
    answer: "Minimal indsats er 1,25 kr. og maksimal indsats er 500,00 kr. pr. spin. Indsatsen fordeles over 25 faste gevinstlinjer.",
  },
];

const WolfGoldGuide = () => {
  const faqJsonLd = buildFaqSchema(wolfGoldFaqs);
  const articleSchema = buildArticleSchema({
    headline: "Wolf Gold – RTP 93,99 %, Penge-Genspin & Jackpot-Analyse",
    description: "Komplet analyse af Wolf Gold: RTP 93,99 % (verificeret), Penge-Genspin jackpot, KÆMPE symbol free spins, EV-beregninger og volatilitetsprofil.",
    url: `${SITE_URL}/casinospil/spillemaskiner/wolf-gold`,
    datePublished: "2026-04-15",
    authorName: "Kevin",
    authorUrl: `${SITE_URL}/forfatter/kevin`,
  });
  const videoJsonLd = buildVideoSchema(`${SITE_URL}/casinospil/spillemaskiner/wolf-gold`, "wk34dIvTJ-c", {
    title: "Wolf Gold gennemgang – Penge-Genspin og jackpot forklaret",
    description: "Se en komplet gennemgang af Wolf Gold: Penge-Genspin-funktionen, jackpot-strukturen og gratis spin forklaret i praksis.",
    uploadDate: "2026-03-07",
    duration: "PT0M59S",
  });

  const howToJsonLd = buildHowToSchema({
    name: "Sådan spiller du Wolf Gold",
    pageUrl: `${SITE_URL}/casinospil/spillemaskiner/wolf-gold`,
    steps: [
      { name: "Vælg indsats", text: "Indstil din indsats fra 1,25 til 500 kr. med 25 faste gevinstlinjer." },
      { name: "Spin hjulene", text: "Tryk spin og observer pengesymboler og scatters på det 5×3 grid." },
      { name: "Aktivér Penge-Genspin", text: "Land 6+ pengesymboler for at starte Penge-Genspin med jackpot-værdier." },
      { name: "Udløs Gratis Spin", text: "Land 3 scatters (hjul 1, 3, 5) for 5 gratis spin med KÆMPE symboler." },
      { name: "Udbetal gevinst", text: "Gå til casinoets udbetalingssektion og vælg din ønskede overførselsmetode." },
    ],
  });

  return (
    <>
      <SEO
        title="Wolf Gold Spilleautomat – RTP 93,99% & Jackpot (2026)"
        description="Komplet analyse af Wolf Gold: RTP 93,99 % (verificeret), Penge-Genspin jackpot, KÆMPE symbol gratis spin, EV-beregninger og bankroll-strategi for danske spillere."
        jsonLd={[faqJsonLd, articleSchema, howToJsonLd, videoJsonLd]}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><MenuIcon iconName="sparkles" className="mr-1.5 h-3.5 w-3.5" /> Jackpot-mekanik</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Wolf Gold</h1>
            <p className="text-lg text-white/80">Pragmatic Play's mest ikoniske jackpot-slot: RTP 93,99 %, Penge-Genspin med pengesymbolværdier op til 100×, stablede wilds og KÆMPE symboler under gratis spin – en teknisk gennemgang med verificerede data.</p>
          </div>
        </div>
      </section>

      <ContentPageLayout>
        <AuthorMetaBar author="kevin" readTime="9 min" />

        {/* ── Intro screenshot ── */}
        <ReviewScreenshot
          src={screenshotIntro}
          alt="Wolf Gold introskærm – 5×3 grid med Stablede Wilds, Penge-Genspin og Brændende Hjul"
          caption="Introskærmen viser Wolf Gold's tre hovedfunktioner: Stablede Wilds (ulven dækker hele hjul), Penge-Genspin (indsaml pengesymboler for jackpots) og Brændende Hjul (gratis spin med KÆMPE symbol på hjul 2-4)."
          size="full"
          eager
        />

        {/* ── Teknisk profil ── */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><MenuIcon iconName="bar-chart3" className="h-7 w-7 text-primary" /> Teknisk Profil</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Udvikler</p>
              <p className="text-xl font-bold"><Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link></p>
            </CardContent></Card>
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">RTP (verificeret)</p>
              <p className="text-xl font-bold">93,99 %</p>
            </CardContent></Card>
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Volatilitet</p>
              <p className="text-xl font-bold">Medium-Høj</p>
            </CardContent></Card>
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Grid Layout</p>
              <p className="text-xl font-bold">5 hjul × 3 rækker</p>
            </CardContent></Card>
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Gevinstlinjer</p>
              <p className="text-xl font-bold">25 (faste)</p>
            </CardContent></Card>
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Max Win</p>
              <p className="text-xl font-bold">~1.000× (Mega Jackpot)</p>
            </CardContent></Card>
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Min. indsats</p>
              <p className="text-xl font-bold">1,25 kr.</p>
            </CardContent></Card>
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Max. indsats</p>
              <p className="text-xl font-bold">500,00 kr.</p>
            </CardContent></Card>
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">House Edge</p>
              <p className="text-xl font-bold">6,01 %</p>
            </CardContent></Card>
          </div>
        </section>

        {/* ── Hvem er spillet til? ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="users" className="h-5 w-5 text-primary" />
            Hvem Er Wolf Gold Designet Til?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Wolf Gold besætter en unik niche i slot-landskabet: den kombinerer et klassisk slot-format (5×3, 25 linjer) med moderne jackpot-mekanikker, men holder volatiliteten på et medium-højt niveau. Mens mange moderne slots bevæger sig mod ekstremer – enten ultra-lav volatilitet som <Link to="/casinospil/spillemaskiner/starburst" className={linkClass}>Starburst</Link> eller ultra-høj som <Link to="/casinospil/spillemaskiner/dead-or-alive-2" className={linkClass}>Dead or Alive 2</Link> – placerer Wolf Gold sig bevidst i midten.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bemærk dog, at Wolf Gold's RTP på 93,99 % er markant lavere end gennemsnittet for moderne slots. Det giver et house edge på 6,01 % – næsten dobbelt så højt som <Link to="/casinospil/spillemaskiner/sweet-bonanza" className={linkClass}>Sweet Bonanza</Link> (3,49-3,52 %). Spillere, der prioriterer matematisk værdi, bør overveje dette grundigt. Wolf Gold's appel ligger i jackpot-spændingen og det klassiske format, ikke i RTP-optimering.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> har designet Wolf Gold som en "crossover"-slot: den tiltrækker både spillere, der migrerer fra land-baserede automater (genkendelig 5×3-struktur) og digitale natives, der søger moderne bonusmekanikker (Penge-Genspin). Denne dobbelte appel forklarer delvist spillets vedvarende popularitet.
          </p>
        </section>

        <YoutubeEmbed videoId="wk34dIvTJ-c" title="Wolf Gold gennemgang – Penge-Genspin og jackpot" description="Se en komplet gennemgang af Wolf Gold: Penge-Genspin-funktionen og jackpot-strukturen forklaret i praksis." uploadDate="2026-03-07" duration="PT0M59S" />
        <VideoContextBox heading="Her gennemgår vores streamer Wolf Gold i praksis">
          <Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> viser Penge-Genspin-funktionen, jackpot-niveauerne og KÆMPE symbol gratis spin i detaljer. Videoen er en del af vores dybdegående indhold om{" "}
          <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> og{" "}
          <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>.
        </VideoContextBox>

        <InlineCasinoCards />

        <Separator className="my-10" />

        {/* ── Wild & Scatter ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><MenuIcon iconName="target" className="h-7 w-7 text-primary" /> Wild, Scatter og Symboldynamik</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Wolf Gold opererer på et klassisk 5×3 grid med 25 faste gevinstlinjer. Alle symboler udbetaler fra venstre mod højre på valgte udbetalingslinjer. Kun den højeste gevinst pr. linje udbetales, men alle linjegevinster ganges med indsats pr. linje.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Wild-symbolet (ulven)</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ulvesymbolet er WILD og erstatter alle symboler <strong>undtagen Scatter og pengesymboler</strong>. Wild-symbolet har også egne udbetalinger: 5 = 600 kr., 4 = 300 kr., 3 = 30 kr. (ved 30 kr. samlet indsats). Under gratis spin vil hjul 2, 3 og 4 spinne sammen som ét KÆMPE symbol – dette gælder også wild.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Scatter-symbolet (canyon)</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Scatter vises <strong>kun på hjul 1, 3 og 5</strong>. 3 scatter-symboler udbetaler 1× den samlede indsats og udløser 5 gratis spin. Under gratis spin giver 3 yderligere scatters 5 ekstra gratis spin – <strong>ingen grænser for genudløsning!</strong>
          </p>
        </section>

        {/* ── Features screenshot ── */}
        <ReviewScreenshot
          src={screenshotFeatures}
          alt="Wolf Gold spilleregler – Wild-symbol (ulv), Scatter (canyon), KÆMPE symbol under gratis spin"
          caption="Spilleregler side 2/7: Wild (ulven) erstatter alle undtagen Scatter og pengesymboler. Scatter vises kun på hjul 1, 3 og 5 – 3 scatters = 1× samlet indsats + 5 gratis spin. Under gratis spin spinner hjul 2, 3 og 4 som ét KÆMPE symbol. 3+ scatters retrigger 5 ekstra spin uden grænser."
          size="full"
        />

        <Separator className="my-10" />

        {/* ── Penge-Genspin ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><MenuIcon iconName="trophy" className="h-7 w-7 text-primary" /> Penge-Genspin: Jackpot-Systemet Analyseret</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Penge-Genspin er Wolf Gold's signaturmekanik. Funktionen udløses, når <strong>6 eller flere pengesymboler</strong> (måner) lander på hjulene. Pengesymbolet er til stede på alle hjul. Hvert pengesymbol tager en tilfældig værdi fra et forudbestemt sæt eller tager værdierne fra MINI eller STOR JACKPOT.
          </p>

          <Card className="mb-6"><CardContent className="pt-6">
            <p className="font-semibold mb-2">Mulige pengesymbol-værdier (× samlet indsats):</p>
            <p className="text-sm text-muted-foreground"><strong>1×, 2×, 3×, 4×, 5×, 6×, 7×, 8×, 10×, 14×, 16×, 18×, 20×, 24×, 30× eller 100×</strong></p>
            <p className="text-sm text-muted-foreground mt-2">Pengesymboler kan også tage værdien af MINI eller STOR JACKPOT.</p>
          </CardContent></Card>

          <h3 className="text-xl font-semibold mt-6 mb-3">Penge-Genspin-mekanik</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Når Penge-Genspin starter, forsvinder alle normale symboler – kun pengesymbolerne der udløste funktionen forbliver. De normale hjul erstattes med særlige hjul, som kun indeholder pengesymboler og tomme pladser. Du starter med <strong>3 genspin</strong>. Alle pengesymboler der rammer efter hvert genspin forbliver på skærmen indtil rundens slutning. Hver gang mindst ét nyt pengesymbol rammer, <strong>nulstilles antallet af genspin til 3</strong>.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Runden fortsætter, indtil genspin er slut, eller alle positioner på skærmen er fyldt med pengesymboler. Når funktionen er afsluttet, lægges værdierne af alle pengesymboler sammen, og det samlede beløb udbetales. <strong>Hvis alle 15 positioner er udfyldt, vinder du også MEGA JACKPOT.</strong>
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Penge-Genspin er <strong>også tilgængelig under gratis spin-runden</strong>, hvilket giver mulighed for at udløse jackpot-funktionen i en allerede aktiv bonusrunde.
          </p>
        </section>

        {/* ── Penge-Genspin screenshot ── */}
        <ReviewScreenshot
          src={screenshotPengegenspin}
          alt="Wolf Gold Penge-Genspin regler – pengesymbolværdier 1×-100×, MINI/STOR JACKPOT, MEGA JACKPOT ved fuld skærm"
          caption="Penge-Genspin regler (side 3/7): Pengesymbolet kan have værdier fra 1× til 100× samlet indsats, eller MINI/STOR JACKPOT. 6+ pengesymboler udløser funktionen. 3 genspin med nulstilling ved nye symboler. Alle 15 positioner fyldt = MEGA JACKPOT. Funktionen er også tilgængelig under gratis spin."
          size="full"
        />

        <Separator className="my-10" />

        {/* ── Gratis Spin ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><MenuIcon iconName="sparkles" className="h-7 w-7 text-primary" /> Gratis Spin med KÆMPE Symboler</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Wolf Gold's gratis spin-funktion udløses af 3 scatter-symboler (canyon-landskab, kun på hjul 1, 3 og 5) og tildeler 5 <Link to="/free-spins" className={linkClass}>gratis spin</Link>. 3 scatters udbetaler desuden 1× den samlede indsats som en øjeblikkelig gevinst.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Under gratis spin fusioneres hjul 2, 3 og 4 til ét enkelt KÆMPE symbol – et 3×3 symbol, der dækker 9 af de 15 positioner. Særlige hjul er i spil under gratis spin-runden. Denne mekanik dramatisk ændrer gevinstdynamikken: et KÆMPE symbol med premium-symbolet kombineret med matchende symboler på hjul 1 og 5 kan generere multiple samtidige linjegevinster.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Gratis spin kan genudløses med 3 yderligere scatter-symboler, hver gang for 5 ekstra gratis spin – <strong>der er ingen grænser for genudløsning!</strong> Den gennemsnitlige gratis spin-gevinst er estimeret til 15-25× indsatsen, men med høj varians.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vigtig detalje: gratis spin-gevinster tilføjes til udbetalingslinjegevinsten. Alle gevinster ganges med indsats pr. linje, og kun den højeste gevinst udbetales per linje. Penge-Genspin er også aktiv under gratis spin, hvilket giver mulighed for jackpot-gevinster i bonusrunden.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── RTP & EV ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><MenuIcon iconName="calculator" className="h-7 w-7 text-primary" /> RTP 93,99 % – EV-Analyse og Konsekvenser</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Wolf Gold's <Link to="/ordbog/rtp" className={linkClass}>RTP</Link> på <strong>93,99 %</strong> er verificeret direkte fra spillets info-menu. Det giver et <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> på <strong>6,01 %</strong> – markant højere end de fleste moderne slots. Til sammenligning har <Link to="/casinospil/spillemaskiner/sweet-bonanza" className={linkClass}>Sweet Bonanza</Link> et house edge på 3,49 %, og <Link to="/casinospil/spillemaskiner/big-bass-bonanza" className={linkClass}>Big Bass Bonanza</Link> ca. 3,29 %.
          </p>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <p className="font-semibold mb-2">📊 EV pr. session (10 kr./spin)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left">Session</th>
                      <th className="py-2 text-right">Samlet indsats</th>
                      <th className="py-2 text-right">Forventet tab</th>
                      <th className="py-2 text-right">Tab pr. time*</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">100 spins</td><td className="py-2 text-right">1.000 kr.</td><td className="py-2 text-right">60,10 kr.</td><td className="py-2 text-right">~150 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">300 spins</td><td className="py-2 text-right">3.000 kr.</td><td className="py-2 text-right">180,30 kr.</td><td className="py-2 text-right">~150 kr.</td></tr>
                    <tr><td className="py-2">1.000 spins</td><td className="py-2 text-right">10.000 kr.</td><td className="py-2 text-right">601,00 kr.</td><td className="py-2 text-right">~150 kr.</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-2">*Estimeret ved ~250 spins/time.</p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Det forventede tab pr. time (~150 kr. ved 10 kr./spin) er markant højere end sammenlignelige slots. Til sammenligning er det forventede tab pr. time for Sweet Bonanza ca. ~87 kr. og for Book of Dead ca. ~95 kr. ved samme indsatsniveau. Wolf Gold's lavere RTP koster spilleren ca. 50-60 % mere i forventet tab pr. time end de bedste alternativer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Denne RTP-forskel akkumuleres hurtigt: over en 4-timers session (1.000 spins) er forskellen mellem Wolf Gold (601 kr. tab) og Sweet Bonanza (349 kr. tab) hele 252 kr. – en betydelig meromkostning for underholdningen. Spillere, der spiller regelmæssigt, bør overveje, om Wolf Gold's jackpot-spænding retfærdiggør den ekstra omkostning.
          </p>
        </section>

        {/* ── Regler screenshot ── */}
        <ReviewScreenshot
          src={screenshotRegler}
          alt="Wolf Gold tekniske regler – 25 gevinstlinjer, RTP 93,99%, min indsats 1,25 kr., max 500 kr."
          caption="Verificeret fra spillets info-menu (side 4/7): 25 gevinstlinjer vist visuelt. 'Den teoretiske RTP i dette spil er 93,99 %'. Minimal indsats: kr 1,25. Maksimal indsats: kr 500,00. Alle symboler udbetaler fra venstre mod højre."
          size="full"
        />

        <Separator className="my-10" />

        {/* ── Volatilitetsprofil ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="zap" className="h-5 w-5 text-primary" />
            Volatilitetsklassificering og Session-Dynamik
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Wolf Gold klassificeres som medium-høj volatilitet af Pragmatic Play. I praksis opleves den som en af de mere tilgængelige slots i kategorien, primært fordi basespillet leverer hyppigere gevinster end sammenlignelige titler (hit frequency ~30 %).
          </p>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <p className="font-semibold mb-2">📊 Nøgletal</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Hit Frequency:</span> <span className="font-medium">~30 %</span></div>
                <div><span className="text-muted-foreground">Max Win:</span> <span className="font-medium">~1.000× (Mega Jackpot)</span></div>
                <div><span className="text-muted-foreground">Volatilitet:</span> <span className="font-medium">Medium-Høj</span></div>
                <div><span className="text-muted-foreground">RTP:</span> <span className="font-medium">93,99 %</span></div>
                <div><span className="text-muted-foreground">Standardafvigelse:</span> <span className="font-medium">~5-7</span></div>
                <div><span className="text-muted-foreground">Penge-Genspin frekvens:</span> <span className="font-medium">~1/100 spins</span></div>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Standardafvigelsen på ~5-7 placerer Wolf Gold mellem lav-volatile slots som Starburst (~3-4) og høj-volatile slots som <Link to="/casinospil/spillemaskiner/razor-shark" className={linkClass}>Razor Shark</Link> (~10-12). For spilleren betyder dette mere forudsigelige sessions: din bankroll vil typisk svinge med 20-40 % over en 200-spins session.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Max win på ~1.000× (Mega Jackpot) er markant lavere end moderne ultra-volatile slots (Sweet Bonanza: 21.100×). Men Wolf Gold's gevinstdistribution er jævnere, med færre "alt-eller-intet"-momenter. For spillere, der søger konsistens frem for ekstreme udsving, er dette en fordel – men den lave RTP begrænser den samlede tilbagebetaling.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── Bankroll ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="shield" className="h-5 w-5 text-primary" />
            Bankroll-Strategi for Wolf Gold
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Wolf Gold's medium-høje volatilitet tillader en mere fleksibel bankroll-tilgang end ekstremt volatile slots, men den lave RTP (93,99 %) øger den forventede nedgang over tid. Generelt anbefaler vi mindst 150 spins i en session for at give Penge-Genspin-funktionen en realistisk chance for at udløse.
          </p>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <p className="font-semibold mb-2">📊 Bankroll-dimensionering</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left">Profil</th>
                      <th className="py-2 text-right">Bankroll</th>
                      <th className="py-2 text-right">Indsats</th>
                      <th className="py-2 text-right">Forventet tab (150 spins)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">Konservativ</td><td className="py-2 text-right">500 kr.</td><td className="py-2 text-right">2-3 kr.</td><td className="py-2 text-right">18-27 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">Moderat</td><td className="py-2 text-right">1.000 kr.</td><td className="py-2 text-right">5-6 kr.</td><td className="py-2 text-right">45-54 kr.</td></tr>
                    <tr><td className="py-2">Aggressiv</td><td className="py-2 text-right">2.000 kr.</td><td className="py-2 text-right">10-12 kr.</td><td className="py-2 text-right">90-108 kr.</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Husk altid <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>-principper: sæt klare grænser for både tab og gevinst, og stop når grænsen er nået. Wolf Gold's lave RTP betyder, at din bankroll vil falde hurtigere end ved slots med højere tilbagebetaling.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── Sammenligning ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="scale" className="h-5 w-5 text-primary" />
            Wolf Gold vs. Sweet Bonanza vs. Book of Dead
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            En ærlig sammenligning af Wolf Gold med to populære alternativer afslører markante RTP-forskelle:
          </p>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Parameter</th>
                      <th className="py-2 text-right font-semibold">Wolf Gold</th>
                      <th className="py-2 text-right font-semibold"><Link to="/casinospil/spillemaskiner/sweet-bonanza" className={linkClass}>Sweet Bonanza</Link></th>
                      <th className="py-2 text-right font-semibold"><Link to="/casinospil/spillemaskiner/book-of-dead" className={linkClass}>Book of Dead</Link></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 font-medium">RTP</td><td className="py-2 text-right">93,99 %</td><td className="py-2 text-right">96,48 %</td><td className="py-2 text-right">96,21 %</td></tr>
                    <tr className="border-b"><td className="py-2 font-medium">House Edge</td><td className="py-2 text-right">6,01 %</td><td className="py-2 text-right">3,52 %</td><td className="py-2 text-right">3,79 %</td></tr>
                    <tr className="border-b"><td className="py-2 font-medium">Volatilitet</td><td className="py-2 text-right">Medium-Høj</td><td className="py-2 text-right">3,5/5</td><td className="py-2 text-right">Høj</td></tr>
                    <tr className="border-b"><td className="py-2 font-medium">Max Win</td><td className="py-2 text-right">~1.000×</td><td className="py-2 text-right">21.100×</td><td className="py-2 text-right">5.000×</td></tr>
                    <tr className="border-b"><td className="py-2 font-medium">Grid</td><td className="py-2 text-right">5×3 (25 linjer)</td><td className="py-2 text-right">6×5 (cluster)</td><td className="py-2 text-right">5×3 (10 linjer)</td></tr>
                    <tr><td className="py-2 font-medium">Tab/1000 spins á 10 kr.</td><td className="py-2 text-right">601 kr.</td><td className="py-2 text-right">352 kr.</td><td className="py-2 text-right">379 kr.</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Tallene taler tydeligt: Wolf Gold har det højeste house edge (6,01 %) og det laveste max win (~1.000×) i gruppen. Sweet Bonanza tilbyder næsten dobbelt så god matematisk værdi. <Link to="/casinospil/spillemaskiner/book-of-dead" className={linkClass}>Book of Dead</Link> ligger midt imellem. Wolf Gold's eneste fordel er den lavere volatilitet og den unikke Penge-Genspin-mekanik. Valget afhænger af, om du prioriterer konsistens og jackpot-spænding (Wolf Gold) eller matematisk værdi (Sweet Bonanza/Book of Dead).
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── Wagering-strategi ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="calculator" className="h-5 w-5 text-primary" />
            Wagering-Analyse: Wolf Gold som Bonusomsætningsslot
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Med en RTP på 93,99 % er Wolf Gold en <strong>dårlig kandidat til bonusomsætning</strong>. Det forventede tab under wagering er markant højere end alternativer med højere RTP.
          </p>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <p className="font-semibold mb-2">📊 Wagering-sammenligning: 1.000 kr. bonus, 10× omsætning (10.000 kr.)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left">Metric</th>
                      <th className="py-2 text-right">Wolf Gold</th>
                      <th className="py-2 text-right">Sweet Bonanza</th>
                      <th className="py-2 text-right">Big Bass Bonanza</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">RTP</td><td className="py-2 text-right">93,99 %</td><td className="py-2 text-right">96,48 %</td><td className="py-2 text-right">96,71 %</td></tr>
                    <tr className="border-b"><td className="py-2">Forventet tab</td><td className="py-2 text-right">601 kr.</td><td className="py-2 text-right">352 kr.</td><td className="py-2 text-right">329 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">Forventet restbeløb</td><td className="py-2 text-right">399 kr.</td><td className="py-2 text-right">648 kr.</td><td className="py-2 text-right">671 kr.</td></tr>
                    <tr><td className="py-2">Bonusværdi (+EV?)</td><td className="py-2 text-right">Marginal</td><td className="py-2 text-right">Positiv</td><td className="py-2 text-right">Positiv</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ved 10× wagering på 1.000 kr. bonus taber Wolf Gold 601 kr. – du ender med kun 399 kr. i gennemsnit. Til sammenligning ender Sweet Bonanza og Big Bass Bonanza med 648 og 671 kr. – næsten 70 % mere restværdi. For <Link to="/omsaetningskrav" className={linkClass}>bonusomsætning</Link> er Wolf Gold simpelthen et dårligt valg.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vores anbefaling: brug <strong>ikke</strong> Wolf Gold til wagering. Vælg i stedet <Link to="/casinospil/spillemaskiner/sweet-bonanza" className={linkClass}>Sweet Bonanza</Link>, <Link to="/casinospil/spillemaskiner/big-bass-bonanza" className={linkClass}>Big Bass Bonanza</Link> eller andre <Link to="/casinospil/spillemaskiner/hoej-rtp" className={linkClass}>slots med høj RTP</Link>. Wolf Gold er underholdning – spil den for nydelsens skyld, ikke som wagering-værktøj.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── Pragmatic Plays Jackpot-Filosofi ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="flame" className="h-5 w-5 text-primary" />
            Pragmatic Plays Jackpot-Design: Fast vs. Progressiv
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Wolf Gold repræsenterer <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Plays</Link> bevidste valg om faste jackpots. I progressive systemer bidrager en procentdel af hver indsats til en voksende pool, men RTP varierer dynamisk. Wolf Gold's faste jackpot-system eliminerer denne usikkerhed: Mega Jackpot er altid proportional med din indsats.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den visuelle fremgang mod at fylde alle 15 positioner skaber en fornemmelse af kumulativ opbygning, selvom jackpot-værdien er fast. Det er et psykologisk design-trick, der giver spillerne den progressive "jagt"-følelse uden de matematiske ulemper ved en progressiv pool.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det er dog vigtigt at bemærke, at Wolf Gold's lave RTP (93,99 %) delvist skyldes det ekstra lag af jackpot-mekanik. En del af den "manglende" RTP finansierer jackpot-strukturen – du betaler effektivt mere i house edge for adgangen til Penge-Genspin og jackpot-niveauerne.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── Spilpsykologisk analyse ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="moon" className="h-5 w-5 text-primary" />
            Spilpsykologi: Hvorfor Pengesymboler Skaber Spænding
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Wolf Gold's vedvarende popularitet – næsten et årti efter lanceringen – kan delvist forklares med flere psykologiske designprincipper. Det mest markante er "collection"-effekten: når pengesymboler fylder griddet under Penge-Genspin, oplever spilleren en kumulativ opbygning mod MEGA JACKPOT. Hvert nyt symbol bringer visuelt tættere på det ultimative mål (15/15 positioner).
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            "Endowment effect" forstærker dette: pengesymboler, der allerede er låst, opleves som "sikrede" gevinster. Hvert nyt genspin bliver en mulighed for at "tilføje" til noget, man allerede har. Og den elegante afslutning – visuel summering af alle individuelle symbolværdier – skaber et belønningsmoment, selv i runder med beskedne gevinster.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Bevidsthed om disse mekanismer er det bedste forsvar mod overdreven spilleadfærd. Wolf Gold er underholdning – ikke en indtægtskilde. Sæt altid grænser, og tag pauser. Læs mere om <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> i vores dedikerede guide.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── Wolf Gold i 2026 ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="trophy" className="h-5 w-5 text-primary" />
            Vores Vurdering af Wolf Gold i 2026
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Wolf Gold blev lanceret i 2017 og er stadig en af de mest genkendelige <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> globalt. Men med en RTP på 93,99 % er den matematisk set et dårligt valg sammenlignet med moderne alternativer. Dens vedvarende popularitet skyldes primært Penge-Genspin-mekanikken, det ikoniske tema og nostalgi.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For spillere, der prioriterer underholdningsværdi og jackpot-spænding over RTP-optimering, er Wolf Gold stadig en solid oplevelse. Penge-Genspin-mekanikken er genuint spændende, stablede wilds holder basespillet engagerende, og KÆMPE symboler i gratis spin giver dramatiske øjeblikke.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Men for matematisk bevidste spillere er vores dom klar: der findes langt bedre alternativer med højere RTP og større max win-potentiale. Spil Wolf Gold for fornøjelsens skyld – men omsæt aldrig bonuspenge på den. Udforsk vores komplette <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskineguide</Link> for alternativer, og spil altid hos <Link to="/casino-licenser" className={linkClass}>licenserede casinoer</Link>.
          </p>
        </section>

        <SlotDataLink slotSlug="wolf-gold" slotName="Wolf Gold" />
        <SlotProviderLink slotSlug="wolf-gold" />
        <LatestNewsByCategory pagePath="/casinospil/spillemaskiner/wolf-gold" />
        <RelatedGuides currentPath="/casinospil/spillemaskiner/wolf-gold" />
        <FAQSection title="Ofte Stillede Spørgsmål om Wolf Gold" faqs={wolfGoldFaqs} />
        <AuthorBio author="kevin" />
      </ContentPageLayout>
      <StickyCtaBySlug slug="spildansknu" />
    </>
  );
};

export default WolfGoldGuide;
