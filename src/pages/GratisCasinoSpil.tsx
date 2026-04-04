import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Database, Play } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";
import { ReviewMoneyLinks } from "@/components/ReviewMoneyLinks";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import type { ReactNode } from "react";
import { SLOT_COUNT_LABEL } from "@/hooks/useSlotCountLabel";

import spildanskLobbyImg from "@/assets/screenshots/spildansknu-lobby-demospil.png";
import wantedGameplayImg from "@/assets/screenshots/wanted-dead-or-a-wild-gameplay.png";
import wantedBonusBuyImg from "@/assets/screenshots/wanted-dead-or-a-wild-bonus-buy.png";
import blackjackDemoImg from "@/assets/screenshots/blackjack-mh-bordet-demotilstand.png";
import baccaratBordImg from "@/assets/screenshots/baccarat-bord-indsatser.png";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Kan man spille gratis casino spil på danske casinoer uden registrering?",
    answer: (
      <>
        Det varierer. Nogle casinoer tillader demospil direkte i browseren uden at oprette en konto – du klikker blot på "Prøv gratis" og spiller med virtuelle kreditter. Andre kræver en gratis kontooprettelse med <Link to="/nye-casinoer/mitid" className={linkClass}>MitID-verifikation</Link>, da alderskontrol er lovpligtigt i Danmark. Spiludviklernes egne websites (fx <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>) tilbyder ofte demoversioner helt uden login. Bemærk at <Link to="/live-casino" className={linkClass}>live casino</Link>-spil aldrig er tilgængelige i demotilstand.
      </>
    ),
  },
  {
    question: "Er gratis casino spil manipulerede sammenlignet med rigtige penge?",
    answer: (
      <>
        Nej, og det er reguleret af lov. Alle <Link to="/casino-med-dansk-licens" className={linkClass}>licenserede spillemaskiner</Link> bruger den samme certificerede <Link to="/ordbog/rng" className={linkClass}>RNG (Random Number Generator)</Link> uanset om du spiller i demotilstand eller med rigtige penge. <Link to="/ordbog/rtp" className={linkClass}>RTP (Return to Player)</Link> er identisk i begge tilstande – det er et lovkrav fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>. Hvis en spilleautomat har 96,50% RTP med rigtige penge, har den præcis 96,50% RTP i demo. Du kan altså trygt bruge demotilstanden til at evaluere et spils matematiske profil, før du investerer dit eget budget. Den eneste forskel er at progressive jackpots kan have en lavere eller simuleret jackpot-pool i demo.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på gratis casino spil og free spins?",
    answer: (
      <>
        Det er to fundamentalt forskellige ting. Gratis casino spil (demotilstand) bruger virtuelle kreditter uden reel værdi – du kan aldrig vinde rigtige penge. Det er et risikofrit testværktøj. <Link to="/free-spins" className={linkClass}>Free spins</Link> er derimod bonusrunder med rigtige penge, hvor gevinster kan udbetales (typisk med <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> op til max 10x i Danmark). Free spins gives som del af en <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link>, <Link to="/reload-bonus" className={linkClass}>reload bonus</Link> eller <Link to="/free-spins-i-dag" className={linkClass}>daglige kampagner</Link>. En tredje kategori er <Link to="/bonus-uden-indbetaling" className={linkClass}>bonus uden indbetaling</Link>, hvor du modtager gratis spillekapital ved kontooprettelse.
      </>
    ),
  },
  {
    question: "Hvilke typer casino spil kan man spille gratis i demotilstand?",
    answer: (
      <>
        Du kan spille langt de fleste <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> gratis, herunder populære titler som <Link to="/casinospil/spillemaskiner/sweet-bonanza" className={linkClass}>Sweet Bonanza</Link>, <Link to="/casinospil/spillemaskiner/book-of-dead" className={linkClass}>Book of Dead</Link>, <Link to="/casinospil/spillemaskiner/gates-of-olympus" className={linkClass}>Gates of Olympus</Link> og <Link to="/casinospil/spillemaskiner/starburst" className={linkClass}>Starburst</Link>. Bordspil som <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>, <Link to="/casinospil/roulette" className={linkClass}>roulette</Link> og <Link to="/casinospil/baccarat" className={linkClass}>baccarat</Link> tilbydes også i demoversioner. Kategorier som <Link to="/megaways-slots" className={linkClass}>Megaways</Link>, <Link to="/bonus-buy-slots" className={linkClass}>bonus buy</Link> og <Link to="/jackpot-slots" className={linkClass}>jackpot slots</Link> har typisk demo. Undtagelser er <Link to="/live-casino" className={linkClass}>live casino</Link>-spil, som altid kræver rigtige penge, og visse progressive jackpots.
      </>
    ),
  },
  {
    question: "Er gratis casino spil en god måde at lære strategier på?",
    answer: (
      <>
        Absolut – demotilstanden er det bedste gratis træningsmiljø for casino-strategi. For <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> kan du øve <Link to="/casinospil/blackjack/skema" className={linkClass}>basic strategy-skemaet</Link>, teste <Link to="/casinospil/blackjack/martingale" className={linkClass}>Martingale</Link>-systemet eller eksperimentere med <Link to="/casinospil/blackjack/fibonacci" className={linkClass}>Fibonacci</Link>-progression uden at risikere en krone. For <Link to="/casinospil/roulette" className={linkClass}>roulette</Link> kan du afprøve indsatssystemer som <Link to="/casinospil/roulette/james-bond-roulette" className={linkClass}>James Bond-strategien</Link>. For spillemaskiner handler det mere om at forstå <Link to="/ordbog/volatilitet" className={linkClass}>volatilitet</Link>, <Link to="/ordbog/bonus-runde" className={linkClass}>bonusrunder</Link> og <Link to="/ordbog/buy-bonus" className={linkClass}>bonus buy</Link>-funktioner. Husk dog at ingen strategi kan ændre husets matematiske fordel (<Link to="/ordbog/house-edge" className={linkClass}>house edge</Link>) på slots – RTP forbliver den samme uanset hvad.
      </>
    ),
  },
  {
    question: "Kan jeg skifte fra demotilstand til rigtige penge midt i et spil?",
    answer: "Nej, du kan ikke skifte midt i en session. Du skal afslutte din demosession og starte en ny session med rigtige penge. Dine virtuelle kreditter, bonusrunder og progresser overføres aldrig til rigtige penge-tilstand. Det er vigtigt at forstå, fordi en 'heldig streak' i demo ikke har nogen forudsigelsesværdi for rigtige penge – hver spin er uafhængig via RNG.",
  },
  {
    question: "Tæller gratis spil med i casinoets bonusomsætningskrav?",
    answer: (
      <>
        Nej, demospil tæller aldrig med i <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>. Kun spins og indsatser med rigtige penge (inkl. bonuspenge) bidrager til at opfylde wagering-kravene. Hvis du har en aktiv bonus, skal du spille med din bonussaldo – ikke i demotilstand – for at gennemspille den. Tjek altid de specifikke vilkår, da forskellige spiltyper bidrager med forskellige procentsatser (typisk 100% for slots, 10-50% for <Link to="/casinospil/blackjack" className={linkClass}>bordspil</Link>).
      </>
    ),
  },
  {
    question: "Hvordan finder jeg de bedste casinoer med gratis demospil?",
    answer: (
      <>
        De bedste casinoer med gratis demospil har: 1) Stort udvalg af demoversioner fra mange <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link>, 2) Demo tilgængelig uden kontooprettelse, 3) Identisk RTP som rigtige penge-versioner, 4) Nem overgang til rigtige penge med gode <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>. Se vores <Link to="/top-10-casino-online" className={linkClass}>top 10 liste</Link> for anbefalede casinoer med bredt spiludvalg og pålidelige demoversioner.
      </>
    ),
  },
  {
    question: "Er der risiko for at blive afhængig af gratis casino spil?",
    answer: (
      <>
        Selvom du ikke taber penge i demotilstand, er det vigtigt at være opmærksom på spillevaner. Gratis spil kan normalisere gambling-adfærd og skabe en urealistisk forventning om gevinster, da hjernens belønningscenter aktiveres uanset om gevinsten er reel. Hvis du oplever at gratis spil driver dig mod at indbetale rigtige penge oftere end planlagt, bør du overveje at kontakte <Link to="/ansvarligt-spil/stopspillet" className={linkClass}>StopSpillet</Link> på 70 22 28 25 for gratis, anonym rådgivning. <Link to="/ansvarligt-spil" className={linkClass}>Ansvarligt spil</Link> handler om bevidste valg – også i demotilstand.
      </>
    ),
  },
  {
    question: "Fungerer gratis casino spil på mobil?",
    answer: (
      <>
        Ja, alle moderne <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> er bygget med HTML5-teknologi og fungerer fejlfrit i både demo og rigtige penge-tilstand på <Link to="/mobil-casino/iphone" className={linkClass}>iPhone</Link>, <Link to="/mobil-casino/android" className={linkClass}>Android</Link> og <Link to="/mobil-casino/tablet" className={linkClass}>tablet</Link>. Du behøver ikke downloade en <Link to="/casino-app" className={linkClass}>casino app</Link> – demospil kører direkte i din mobilbrowser. Visse ældre Flash-baserede spil understøtter ikke mobil, men disse er stort set udfaset.
      </>
    ),
  },
];

const spilleTyper = [
  {
    iconName: "monitor",
    title: "Demo-spilleautomater",
    description: "Spil 1.000+ spillemaskiner gratis direkte i browseren. Identisk gameplay, bonusfunktioner og RTP som rigtige penge-versioner. Virtuelle kreditter genopfyldes automatisk, så du kan spille ubegrænset. Den mest populære form for gratis casino spil i Danmark – perfekt til at evaluere nye titler før du investerer.",
    tag: "Mest populært",
  },
  {
    iconName: "gamepad2",
    title: "Gratis bordspil (blackjack, roulette m.fl.)",
    description: "Alle klassiske bordspil tilbydes i demoversioner: blackjack, roulette, baccarat, craps og poker. Ideelt til at øve grundlæggende strategi, teste indsatssystemer og lære regler uden økonomisk risiko. For blackjack-spillere er demo uundværlig til at mestre basic strategy-skemaet.",
    tag: "Strategitræning",
  },
  {
    iconName: "gift",
    title: "Free spins bonusser (reel gevinst)",
    description: "Modtag gratis spins med reel gevinstmulighed via velkomstbonusser, reload-bonusser eller daglige kampagner. I modsætning til demospil kan du vinde rigtige penge med free spins – dog typisk med omsætningskrav (max 10x i Danmark). De bedste tilbud finder du via vores daglige opdatering.",
    tag: "Reel gevinst",
  },
  {
    iconName: "sparkles",
    title: "Bonus uden indbetaling",
    description: "Modtag gratis spillekapital (typisk 50-200 kr.) ved kontooprettelse – helt uden at indbetale. Du kan spille med casinoets penge og beholde eventuelle gevinster efter opfyldelse af omsætningskrav. En sjælden men værdifuld bonustype, der giver dig reel gevinstmulighed uden risiko.",
    tag: "Gratis bonus",
  },
  {
    iconName: "users",
    title: "Social casino gaming",
    description: "Spil med venner i sociale casino-platforme med virtuelle kreditter. Fokus på underholdning, konkurrence og fællesskab uden økonomisk risiko. Populært som afslappet tidsfordriv med leaderboards og achievements. Vores community tilbyder også sociale spilmuligheder via Slot Database.",
    tag: "Underholdning",
  },
  {
    iconName: "trophy",
    title: "Gratis turneringer",
    description: "Deltag i casinoturneringer med gratis adgang (freerolls), hvor du konkurrerer mod andre spillere om præmiepuljer. Ingen indsats nødvendig – du spiller med virtuelle kreditter eller tildelte turneringschips. Et godt kompromis mellem demospil og rigtige penge.",
    tag: "Konkurrence",
  },
];

const GratisCasinoSpil = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Gratis Casino Spil – Spil Spillemaskiner Gratis Online",
    description: "Spil gratis casino spil online: demo-spillemaskiner, bordspil og free spins. Lær forskellen på demotilstand og rigtige penge – og find de bedste gratis tilbud.",
    url: `${SITE_URL}/gratis-casino-spil`,
    datePublished: "2026-03-31",
  });

  return (
    <>
      <SEO
        title="Gratis Casino Spil – Spil Spillemaskiner Gratis Online | Casinoaftaler"
        description="Spil gratis casino spil: 1.000+ demo-spillemaskiner, bordspil og free spins med identisk RTP. Ingen indbetaling, ingen risiko – komplet guide."
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

      {/* Hero */}
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
              <MenuIcon iconName="gamepad2" className="mr-1.5 h-3.5 w-3.5" />
              Komplet guide til gratis casinospil
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Gratis Casino Spil Online
            </h1>
            <p className="text-lg text-white/80">
              Spil spillemaskiner, bordspil og live casino gratis i demotilstand – identisk RTP og gameplay som med rigtige penge. Ingen indbetaling, ingen risiko, ingen forpligtelser.
            </p>
          </div>
        </div>
      </section>

      <ContentPageLayout>
        <AuthorMetaBar author="jonas" readTime="84 Min." />

        <SnippetAnswer answer="Gratis casino spil (demotilstand) lader dig spille spillemaskiner og bordspil med virtuelle kreditter – identisk RTP, volatilitet og bonusfunktioner som rigtige penge-versioner. Over 1.000 titler er tilgængelige uden indbetaling. Perfekt til at teste nye spil, lære strategier og evaluere spiludviklere uden økonomisk risiko." />

        <QuickComparisonTable count={3} title="Bedste casinoer med gratis demospil" prioritySlugs={["spilleautomaten", "leovegas", "mr-green"]} />

        {/* Intro */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Hvad er gratis casino spil?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Gratis casino spil – også kaldet demospil, "play for fun" eller "free play" – giver dig mulighed for at spille <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> og bordspil uden at risikere rigtige penge. Du bruger virtuelle kreditter, og gameplay er 100% identisk med rigtige penge-versioner: samme <Link to="/ordbog/rtp" className={linkClass}>RTP (Return to Player)</Link>, samme <Link to="/ordbog/volatilitet" className={linkClass}>volatilitet</Link>, samme <Link to="/ordbog/rng" className={linkClass}>tilfældighedsgenerator (RNG)</Link> og samme bonusfunktioner.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er den ideelle måde at lære nye spil at kende, før du investerer dit eget budget. Erfarne spillere bruger demotilstanden til at evaluere nye udgivelser og forstå spillets matematiske profil – <Link to="/ordbog/hit-frequency" className={linkClass}>hit frequency</Link>, gevinstpotentiale og <Link to="/ordbog/bonus-runde" className={linkClass}>bonusrunders</Link> frekvens – mens nybegyndere kan øve sig på bordspil som <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> og <Link to="/casinospil/roulette" className={linkClass}>roulette</Link> helt risikofrit.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hos danske casinoer med <Link to="/casino-med-dansk-licens" className={linkClass}>dansk licens</Link> kan du typisk finde hundredvis af demospil fra førende <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link> som <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>, <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>, <Link to="/spiludviklere/hacksaw-gaming" className={linkClass}>Hacksaw Gaming</Link> og <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link>. Vores <Link to="/slot-database" className={linkClass}>slot database</Link> med {SLOT_COUNT_LABEL} spillemaskiner giver dig et komplet overblik over alle tilgængelige titler med RTP, volatilitet og bonusfunktioner.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I denne guide gennemgår vi alle typer af gratis casino spil, forklarer præcis hvordan demotilstanden fungerer teknisk, og giver dig en strategi til at bruge gratis spil som et intelligent beslutningsværktøj, før du vælger casino og spil til rigtige penge. Når du er klar til at spille med rigtige penge, anbefaler vi at starte med <Link to="/casino-med-mitid" className={linkClass}>sikker MitID-registrering</Link>, vælge et casino med <Link to="/hurtig-udbetaling" className={linkClass}>hurtige udbetalinger</Link>, og undgå <Link to="/casino-uden-rofus" className={linkClass}>casinoer uden ROFUS</Link> der ikke tilbyder spillerbeskyttelse.
          </p>
        </section>

        <ReviewScreenshot
          src={spildanskLobbyImg}
          alt="SpilDanskNu casino-lobby med 'Spil' og 'Demo' knapper på Wanted Dead or a Wild – viser hvordan man vælger demotilstand"
          caption="SpilDanskNu's lobby med tydelige 'Spil' og 'Demo' knapper – du kan teste alle spil gratis direkte i browseren."
          eager
        />

        <Separator className="my-8" />

        {/* Typer af gratis casino spil */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">6 typer af gratis casino spil i Danmark</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Der er markant forskel på de forskellige måder at spille gratis casino spil. Nogle giver ren underholdning uden gevinstmulighed, mens andre giver dig reel chance for at vinde rigtige penge. Her er en komplet oversigt over alle typer:
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {spilleTyper.map((type) => (
              <Card key={type.title} className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <MenuIcon iconName={type.iconName} className="h-6 w-6 text-primary" />
                    <Badge variant="outline" className="text-xs">{type.tag}</Badge>
                  </div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Demotilstand vs. rigtige penge – teknisk dybdegående */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Demotilstand vs. rigtige penge – den tekniske sandhed</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Mange spillere er skeptiske overfor om demotilstanden virkelig afspejler den "rigtige" oplevelse. Svaret er entydigt ja – og det er lovreguleret. <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> kræver at alle certificerede spilmaskiner bruger den identiske <Link to="/ordbog/rng" className={linkClass}>RNG</Link> og <Link to="/ordbog/rtp" className={linkClass}>RTP</Link> i både demo- og rigtige penge-tilstand. Manipulation er ulovligt og ville resultere i licensinddragelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Teknisk set indlæser spilleautomaten den samme programkode uanset tilstand. Den eneste forskel er at transaktionslaget – det der håndterer indbetaling, udbetaling og saldostyring – erstattes med et simuleret lag, der bruger virtuelle kreditter. Spilmotoren, matematikken og alle bonusfunktioner er 100% identiske.
          </p>
          <div className="rounded-lg border border-border overflow-hidden mb-6">
            <div className="grid grid-cols-3 gap-0 bg-muted/50 p-3 text-sm font-semibold">
              <span>Egenskab</span>
              <span className="text-center">Demotilstand</span>
              <span className="text-center">Rigtige penge</span>
            </div>
            {[
              ["RTP (gevinstprocent)", "✅ Identisk", "✅ Identisk"],
              ["Volatilitet", "✅ Identisk", "✅ Identisk"],
              ["RNG (tilfældighedsgenerator)", "✅ Identisk", "✅ Identisk"],
              ["Bonusfunktioner", "✅ Identisk", "✅ Identisk"],
              ["Hit frequency", "✅ Identisk", "✅ Identisk"],
              ["Max win potential", "✅ Identisk", "✅ Identisk"],
              ["Reel gevinst", "❌ Nej (virtuel)", "✅ Ja"],
              ["Progressive jackpots", "⚠️ Simuleret", "✅ Fuldt aktive"],
              ["Live casino-spil", "❌ Ikke tilgængeligt", "✅ Ja"],
              ["Bonusser & free spins", "❌ Nej", "✅ Ja"],
              ["Tæller mod omsætningskrav", "❌ Nej", "✅ Ja"],
            ].map(([label, demo, real]) => (
              <div key={label} className="grid grid-cols-3 gap-0 border-t border-border p-3 text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="text-center">{demo}</span>
                <span className="text-center">{real}</span>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-5">
            <p className="mb-2 font-semibold">Teknisk takeaway</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Demotilstanden er et matematisk præcist værktøj til at evaluere et spils profil. Brug den til at vurdere <Link to="/ordbog/volatilitet" className={linkClass}>volatilitet</Link> (hvor ofte og hvor meget spillet betaler), forstå bonusfunktioner og teste om spillet passer til dit budget. Den eneste ting demo ikke kan vise dig, er følelsen af at spille med rigtige penge – den psykologiske dimension. Skift til rigtige penge når du har fundet et spil der matcher din spillestil.
            </p>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Fordele ved gratis spil */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">7 strategiske fordele ved at spille gratis casino spil</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            At spille gratis er ikke kun for nybegyndere – det er et strategisk værktøj som selv professionelle spillere bruger regelmæssigt. Her er de vigtigste fordele med konkrete eksempler:
          </p>
          <div className="space-y-3">
            {[
              { iconName: "shield-check", title: "Nul økonomisk risiko", desc: "Spil ubegrænset uden at risikere en krone. Virtuelle kreditter genopfyldes automatisk ved nul-saldo, så du aldrig løber tør. Perfekt til lange testsessions hvor du vil evaluere et spils langsigtede adfærd over 500+ spins." },
              { iconName: "eye", title: "Evaluer nye spil før du indbetaler", desc: "Test RTP, volatilitet, bonusfrekvens og max win-potentiale for ethvert spil, før du risikerer dit budget. En 30-minutters demosession afslører typisk om et spils matematiske profil matcher din spillestil – og sparer dig potentielt for hundredvis af kroner i fejlinvesteringer." },
              { iconName: "book-open", title: "Mestre bordspilstrategier risikofrit", desc: "Øv blackjack basic strategy, roulette-systemer som Martingale og Fibonacci, eller pokerhænder uden konsekvenser. Demotilstanden eliminerer den psykologiske stress ved rigtige penge og lader dig fokusere 100% på strategi og beslutningstagning." },
              { iconName: "trending-up", title: "Sammenlign spiludviklere og temaer", desc: "Spil 10 forskellige slots fra 5 forskellige udbydere på én aften – helt gratis. Evaluer om du foretrækker Pragmatic Plays høj-volatilitet-profil eller NetEnts mere jævne gevinstfordeling, før du binder dig til et spil med rigtige penge." },
              { iconName: "calculator", title: "Test indsatsstrategier", desc: "Eksperimentér med forskellige indsatsniveauer, coin values og bet-strukturer. Find det optimale balance mellem underholdningsværdi og gevinstpotentiale for dit budget – uden at det koster en krone i processen." },
              { iconName: "clock", title: "Ren underholdning uden økonomisk pres", desc: "Nyd casino-oplevelsen som afslappet tidsfordriv. Ingen indbetalingsgrænser, ingen omsætningskrav, ingen stress over saldo. Perfekt til transport, ventetid eller afslapning – gaming i sin reneste form." },
              { iconName: "target", title: "Identificer dine foretrukne spiltyper", desc: "Er du en Megaways-spiller? Foretrækker du cluster pays eller traditionelle paylines? Liker du bonus buy eller organiske bonusrunder? Demotilstanden hjælper dig med at kortlægge din spillerprofil, før du bruger penge." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border p-4">
                <MenuIcon iconName={item.iconName} className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Populære gratis spil med dybde */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Mest populære gratis spillemaskiner</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Disse spillemaskiner tilbyder alle demoversioner og er blandt de mest spillede titler på danske casinoer. Vi har inkluderet RTP, volatilitet og nøglefunktioner, så du kan vælge det rigtige demospil baseret på din foretrukne spillestil:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { name: "Sweet Bonanza", provider: "Pragmatic Play", rtp: "96.48%", vol: "Høj", path: "/casinospil/spillemaskiner/sweet-bonanza", desc: "Cluster pays med tumble-mekanik og multiplikator-free spins. Max win 21.175x. Ideel til at teste bonus buy-funktionen i demo." },
              { name: "Book of Dead", provider: "Play'n GO", rtp: "96.21%", vol: "Høj", path: "/casinospil/spillemaskiner/book-of-dead", desc: "Klassisk egyptisk tema med expanding symbols i free spins. Max win 5.000x. Perfekt demo-spil til at forstå scatter-bonusmekanikken." },
              { name: "Gates of Olympus", provider: "Pragmatic Play", rtp: "96.50%", vol: "Høj", path: "/casinospil/spillemaskiner/gates-of-olympus", desc: "Pays anywhere med random multiplikatorer op til 500x. Max win 5.000x. Excellent demo til at vurdere multiplikator-akkumulering." },
              { name: "Starburst", provider: "NetEnt", rtp: "96.09%", vol: "Lav", path: "/casinospil/spillemaskiner/starburst", desc: "Den mest ikoniske spilleautomat med expanding wilds og re-spins. Lav volatilitet gør den perfekt for nybegyndere i demotilstand." },
              { name: "Reactoonz", provider: "Play'n GO", rtp: "96.51%", vol: "Høj", path: "/casinospil/spillemaskiner/reactoonz", desc: "7x7 cluster pays-grid med cascading wins og Gargantoon-bonus. Kompleks mekanik der kræver demotid for at forstå fuldt ud." },
              { name: "Big Bass Bonanza", provider: "Pragmatic Play", rtp: "96.71%", vol: "Høj", path: "/casinospil/spillemaskiner/big-bass-bonanza", desc: "Fisketema med money collect-mekanik og multiplikator-fisherman. Populært bonus buy-spil – test mekanikken gratis først." },
              { name: "Dead or Alive 2", provider: "NetEnt", rtp: "96.82%", vol: "Meget høj", path: "/casinospil/spillemaskiner/dead-or-alive-2", desc: "Legendarisk Wild West-slot med tre forskellige free spins-modes. Ultra-høj volatilitet – demo er et must for at opleve bonusrunderne." },
              { name: "Money Train 3", provider: "Relax Gaming", rtp: "96.50%", vol: "Meget høj", path: "/casinospil/spillemaskiner/money-train-3", desc: "Max win 100.000x med persistent multiplier-mekanik. En af markedets mest volatile slots – absolut værd at teste i demo først." },
            ].map((slot) => (
              <Link key={slot.name} to={slot.path} className="rounded-lg border border-border p-4 transition-colors hover:border-primary/50 hover:bg-accent/50">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold">{slot.name}</p>
                  <Badge variant="outline" className="text-xs">{slot.vol}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{slot.provider} · RTP: {slot.rtp}</p>
                <p className="text-xs text-muted-foreground">{slot.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Gratis bordspil sektion */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Gratis bordspil – strategitræning uden risiko</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bordspil i demotilstand er det ultimative træningsmiljø for strategiske spillere. I modsætning til spillemaskiner, hvor resultatet er rent tilfældigt, kan du med bordspil forbedre din win-rate markant ved at mestre den korrekte strategi. Demo eliminerer den økonomiske stress og lader dig fokusere 100% på beslutningsprocessen.
          </p>

          <Card className="mb-4 border-border">
            <CardHeader>
              <CardTitle className="text-xl">Gratis Blackjack</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <Link to="/casinospil/blackjack" className={linkClass}>Blackjack</Link> er det casino-spil, der har mest gavn af demotilstanden, fordi korrekt strategi reducerer <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> til under 0,5%. Brug demo til at mestre <Link to="/casinospil/blackjack/skema" className={linkClass}>basic strategy-skemaet</Link> – hvornår du skal hitte, stande, double down eller splitte. Øv dig indtil beslutningerne sidder i rygraden.
              </p>
              <p>
                Test også avancerede varianter som <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>Europæisk Blackjack</Link>, <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>Amerikansk Blackjack</Link> og <Link to="/casinospil/blackjack/spanish-21" className={linkClass}>Spanish 21</Link> i demo for at forstå regelforskellene, før du spiller med rigtige penge.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-4 border-border">
            <CardHeader>
              <CardTitle className="text-xl">Gratis Roulette</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <Link to="/casinospil/roulette" className={linkClass}>Roulette</Link> i demo er ideel til at teste indsatssystemer som <Link to="/casinospil/roulette/martingale-roulette" className={linkClass}>Martingale</Link>, <Link to="/casinospil/roulette/fibonacci-roulette" className={linkClass}>Fibonacci</Link>, <Link to="/casinospil/roulette/dalembert-roulette" className={linkClass}>D'Alembert</Link> og <Link to="/casinospil/roulette/james-bond-roulette" className={linkClass}>James Bond-strategien</Link>. Du kan eksperimentere med 1.000+ spins uden økonomisk risiko for at se den matematiske virkelighed bag hvert system.
              </p>
              <p>
                Sammenlign også house edge mellem <Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>Europæisk Roulette</Link> (2,7%), <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>Fransk Roulette</Link> (1,35% med La Partage) og <Link to="/casinospil/roulette/amerikansk-roulette" className={linkClass}>Amerikansk Roulette</Link> (5,26%) i demo for at se den reelle forskel.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-xl">Gratis Poker & Baccarat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <Link to="/casinospil/poker" className={linkClass}>Poker</Link>-varianter som <Link to="/casinospil/poker/texas-holdem" className={linkClass}>Texas Hold'em</Link>, <Link to="/casinospil/poker/caribbean-stud" className={linkClass}>Caribbean Stud</Link> og <Link to="/casinospil/poker/video-poker" className={linkClass}>Video Poker</Link> tilbydes alle i demo. Video Poker har særlig strategisk dybde – korrekt spil kan give RTP over 99%.
              </p>
              <p>
                <Link to="/casinospil/baccarat" className={linkClass}>Baccarat</Link> har begrænsede strategiske valg, men demo er stadig nyttig til at forstå tredje-kort-reglerne og sammenligne odds mellem Banker (1,06% house edge), Player (1,24%) og Tie (14,36%) indsatser.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8" />

        {/* Sådan bruger du gratis spil strategisk */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Sådan bruger du gratis casino spil som strategisk værktøj</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            De mest succesfulde casinospillere bruger demotilstanden som en systematisk evalueringsproces. Her er en trin-for-trin tilgang til at maksimere værdien af gratis spil:
          </p>

          <div className="space-y-4">
            <div className="rounded-lg border border-border p-5">
              <h3 className="font-bold text-lg mb-2">Trin 1: Identificer din spillerprofil</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Spil 5-10 forskellige demoversioner i 15 minutter hver. Notér hvilke spil du nyder mest og hvilke der keder dig. Foretrækker du hyppige, små gevinster (lav volatilitet) eller sjældne, store gevinster (høj volatilitet)? Liker du bonus buy eller organiske bonusrunder? <Link to="/casinospil/spillemaskiner" className={linkClass}>Spillemaskiner</Link> med lav volatilitet som Starburst passer til budgetbevidste spillere, mens høj-volatilitet-slots som Dead or Alive 2 passer til risikovillige spillere.
              </p>
            </div>

            <div className="rounded-lg border border-border p-5">
              <h3 className="font-bold text-lg mb-2">Trin 2: Evaluer bonusfunktioner</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Spil minimum 200 spins i demo for at opleve et spils bonusrunde mindst 2-3 gange. Vurder: Hvor ofte triggerer bonusrunden? Hvad er den gennemsnitlige gevinst i bonus? Er der retrigger-mulighed? Brug denne data til at sammenligne spil direkte – et spil med sjælden men lukrativ bonus (fx <Link to="/casinospil/spillemaskiner/wanted-dead-or-a-wild" className={linkClass}>Wanted Dead or a Wild</Link>) har en helt anden profil end et spil med hyppige, mindre bonusrunder (fx <Link to="/casinospil/spillemaskiner/fire-joker" className={linkClass}>Fire Joker</Link>).
              </p>
            </div>

            <div className="rounded-lg border border-border p-5">
              <h3 className="font-bold text-lg mb-2">Trin 3: Test dit budget i demo</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Simuler dit faktiske budget i demotilstand. Hvis du planlægger at indbetale 500 kr. og spille med 5 kr. indsats, start din demo med 500 virtuelle kreditter og spil 100 spins. Hvor langt rakte budgettet? Oplevede du bonusrunder? Føltes det underholdende? Denne øvelse giver dig en realistisk forventning til din spillesession med rigtige penge.
              </p>
            </div>

            <div className="rounded-lg border border-border p-5">
              <h3 className="font-bold text-lg mb-2">Trin 4: Sammenlign spiludviklere</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Spil en slot fra hver af de store udviklere: <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> (høj volatilitet, bonus buy), <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link> (balanced, ikoniske titler), <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link> (varieret mekanik), <Link to="/spiludviklere/hacksaw-gaming" className={linkClass}>Hacksaw Gaming</Link> (ekstremt høj volatilitet) og <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link> (unik xWays-mekanik). Du finder hurtigt ud af hvilken udviklerstil der matcher dig.
              </p>
            </div>
          </div>
        </section>

        <InlineCasinoCards title="Casinoer med bredt udvalg af gratis demospil" />

        <Separator className="my-8" />

        {/* Free spins vs. demo – dybdegående */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Free spins vs. demospil – hvornår er hvad bedst?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Mange spillere blander begreberne "gratis casino spil" og "<Link to="/free-spins" className={linkClass}>free spins</Link>" sammen. Det er vigtigt at forstå forskellen, fordi de tjener fundamentalt forskellige formål:
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <Card className="border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <MenuIcon iconName="monitor" className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Demospil (virtuelle penge)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>✅ Ubegrænset antal spins</p>
                <p>✅ Ingen registrering nødvendig (på mange casinoer)</p>
                <p>✅ Nul risiko – kun virtuelle kreditter</p>
                <p>✅ Test alle spil frit</p>
                <p>❌ Ingen reel gevinstmulighed</p>
                <p>❌ Ingen progressiv jackpot-deltagelse</p>
                <p><strong>Bedst til:</strong> Research, strategitræning, evaluation af nye spil</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <MenuIcon iconName="gift" className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Free spins (rigtige penge)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>✅ Reel gevinstmulighed</p>
                <p>✅ Ofte del af velkomstbonus</p>
                <p>✅ Gratis at modtage</p>
                <p>⚠️ Kræver kontooprettelse</p>
                <p>⚠️ Typisk med omsætningskrav (max 10x)</p>
                <p>⚠️ Begrænset til specifikke spil</p>
                <p><strong>Bedst til:</strong> Gevinstjagt, bonus-maksimering, nye spillere</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            <strong>Den optimale strategi</strong> kombinerer begge: Brug demospil til at finde dine foretrukne spil og forstå deres mekanik. Find derefter et casino med gode <Link to="/free-spins" className={linkClass}>free spins-tilbud</Link> eller en stærk <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> på netop de spil du foretrækker. Tjek vores <Link to="/free-spins-i-dag" className={linkClass}>daglige free spins-opdatering</Link> for de nyeste tilbud.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Gratis spil per spiludvikler */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Gratis demospil fra de bedste spiludviklere</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hver <Link to="/spiludviklere" className={linkClass}>spiludvikler</Link> har sin egen stil, volatilitetsprofil og bonusmekanik. Her er en oversigt over de mest populære udbydere af gratis casino spil i Danmark:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Pragmatic Play", desc: "1.000+ slots med bonus buy og Megaways. Høj volatilitet.", path: "/spiludviklere/pragmatic-play", slots: "/spillemaskiner/pragmatic-play" },
              { name: "NetEnt", desc: "Ikoniske titler som Starburst og Gonzo's Quest. Balanced profil.", path: "/spiludviklere/netent", slots: "/spillemaskiner/netent" },
              { name: "Play'n GO", desc: "Book of Dead og Reactoonz. Varieret mekanik og temaer.", path: "/spiludviklere/play-n-go", slots: "/spillemaskiner/play-n-go" },
              { name: "Hacksaw Gaming", desc: "Ultra-høj volatilitet og unikke bonusfunktioner.", path: "/spiludviklere/hacksaw-gaming", slots: "/spillemaskiner/hacksaw-gaming" },
              { name: "Nolimit City", desc: "xWays og xNudge-mekanik. Mental Slots-serie.", path: "/spiludviklere/nolimit-city", slots: "/spillemaskiner/nolimit-city" },
              { name: "Big Time Gaming", desc: "Opfindere af Megaways. Bonanza-serien.", path: "/spiludviklere/big-time-gaming", slots: "/spillemaskiner/big-time-gaming" },
              { name: "ELK Studios", desc: "Innovativ spilledesign med Avalanche og Gold mekanik.", path: "/spiludviklere/elk-studios", slots: "/spillemaskiner/elk-studios" },
              { name: "Relax Gaming", desc: "Money Train-serien. Kreative bonusfunktioner.", path: "/spiludviklere/relax-gaming", slots: "/spillemaskiner/relax-gaming" },
              { name: "Red Tiger", desc: "Daily jackpots og unikke temaer. NetEnt-ejet.", path: "/spiludviklere/red-tiger", slots: "/spillemaskiner/red-tiger" },
            ].map((dev) => (
              <div key={dev.name} className="rounded-lg border border-border p-4">
                <Link to={dev.path} className="font-semibold text-primary hover:underline">{dev.name}</Link>
                <p className="text-xs text-muted-foreground mt-1 mb-2">{dev.desc}</p>
                <Link to={dev.slots} className="text-xs text-primary hover:underline flex items-center gap-1">
                  Se alle slots <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Mobil gratis spil */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Gratis casino spil på mobil og tablet</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle moderne spillemaskiner er bygget med HTML5-teknologi og fungerer fejlfrit i demotilstand på alle enheder. Du behøver ikke downloade en <Link to="/casino-app" className={linkClass}>casino app</Link> – demospil kører direkte i din mobilbrowser med fuld funktionalitet, inklusive touch-optimeret interface og tilpasset layout.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { iconName: "smartphone", title: "iPhone", desc: "Safari eller Chrome. Fuld demofunktionalitet. Touch-optimeret med swipe-gestures.", path: "/mobil-casino/iphone" },
              { iconName: "smartphone", title: "Android", desc: "Chrome eller Samsung Internet. Identisk oplevelse som desktop. Responsivt design.", path: "/mobil-casino/android" },
              { iconName: "monitor", title: "Tablet / iPad", desc: "Optimal skærmstørrelse for demospil. Større visuel oplevelse med tablet-tilpasset layout.", path: "/mobil-casino/tablet" },
            ].map((device) => (
              <Link key={device.title} to={device.path} className="rounded-lg border border-border p-4 text-center transition-colors hover:border-primary/50">
                <MenuIcon iconName={device.iconName} className="mx-auto h-8 w-8 text-primary mb-2" />
                <p className="font-semibold">{device.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{device.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Ansvarligt spil – udvidet */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Gratis spil og ansvarligt spil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Gratis casino spil er et vigtigt element i <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>. Demotilstanden giver dig mulighed for at nyde casino-oplevelsen uden økonomisk risiko – men det er vigtigt at forstå de psykologiske nuancer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Forskning viser at gratis spil kan påvirke spilleadfærd på to måder: positivt, ved at reducere økonomisk risiko og skabe bevidsthed om spillets mekanik; men også negativt, ved at normalisere gambling-adfærd og skabe urealistiske gevinstforventninger. Hjernens belønningscenter aktiveres uanset om gevinsten er reel – den "rush" du føler ved en stor gevinst i demo er neurologisk identisk med rigtige penge.
          </p>

          <div className="rounded-lg border-2 border-yellow-500/50 bg-yellow-500/5 p-5 mb-4">
            <div className="flex items-start gap-3">
              <MenuIcon iconName="alert-triangle" className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
              <div>
                <p className="font-semibold mb-2">Faresignaler at være opmærksom på</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Du føler et behov for at skifte til rigtige penge efter en "heldig streak" i demo</li>
                  <li>• Demospil bliver et dagligt ritual der tager mere og mere tid</li>
                  <li>• Du tænker "hvis bare det havde været rigtige penge" efter en stor demogevinst</li>
                  <li>• Overgangen fra demo til rigtige penge sker impulsivt, ikke planlagt</li>
                  <li>• Du bruger demospil som erstatning for sociale aktiviteter</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-5">
            <div className="flex items-start gap-3">
              <MenuIcon iconName="heart" className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <p className="font-semibold mb-2">Ressourcer for hjælp</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• <Link to="/ansvarligt-spil/stopspillet" className={linkClass}>StopSpillet</Link> – Gratis, anonym rådgivning: 70 22 28 25</li>
                  <li>• <Link to="/ansvarligt-spil/rofus" className={linkClass}>ROFUS</Link> – Selvudelukkelse fra alle danske casinoer</li>
                  <li>• <Link to="/ansvarligt-spil/spillegraenser" className={linkClass}>Spillegrænser</Link> – Sæt indbetalings- og tidsgrænser</li>
                  <li>• <Link to="/ansvarligt-spil/ludomani" className={linkClass}>Ludomani</Link> – Genkend tegnene og søg hjælp</li>
                  <li>• <Link to="/ansvarligt-spil/hjaelpelinjer" className={linkClass}>Hjælpelinjer</Link> – Danske støttetilbud samlet ét sted</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Fejl at undgå */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">5 fejl at undgå med gratis casino spil</h2>
          <div className="space-y-3">
            {[
              { iconName: "alert-triangle", title: "Fejl 1: At antage demoresultater forudsiger rigtige penge", desc: "Hver spin er uafhængig via RNG. En bonusrunde i demo betyder IKKE at bonusrunden er 'klar' til at trigge med rigtige penge. Der er ingen sammenhæng – det er en kognitiv bias kaldet 'gamblers fallacy'." },
              { iconName: "alert-triangle", title: "Fejl 2: At springe demo over og gå direkte til rigtige penge", desc: "Mindst 50 demo-spins giver dig et grundlæggende billede af et spils profil. At springe dette trin over er som at købe en bil uden prøvekørsel – du ved ikke om spillet passer til din spillestil og budget." },
              { iconName: "alert-triangle", title: "Fejl 3: At ignorere volatilitet i demo", desc: "Et spil der føles sjovt med virtuelle kreditter kan være frustrerende med rigtige penge. Høj-volatilitet-slots som Nolimit City-titler kræver et større budget og mere tålmodighed – test dette i demo for at vurdere om du kan håndtere lange tabsperioder." },
              { iconName: "alert-triangle", title: "Fejl 4: At spille demo i stedet for at sætte et budget", desc: "Demospil bør føre til en informeret beslutning – ikke uendelig udsættelse. Når du har fundet dit spil, sæt et klart budget, vælg et casino med en god bonus, og spil med plan. Brug demo som research-værktøj, ikke som prokrastinering." },
              { iconName: "alert-triangle", title: "Fejl 5: At vælge casino baseret på demooplevelsen alene", desc: "Et casino med gode demospil er ikke nødvendigvis det bedste valg. Tjek også udbetalingshastighed, bonusvilkår, kundeservice og licensstatus. Se vores casino-anmeldelser for en helhedsvurdering." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border p-4">
                <MenuIcon iconName={item.iconName} className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <LatestNewsByCategory pagePath="/gratis-casino-spil" />
        <ReviewMoneyLinks />
        <RelatedGuides currentPath="/gratis-casino-spil" />
        <FAQSection title="Ofte stillede spørgsmål om gratis casino spil" faqs={faqs} />
        <AuthorBio author="jonas" />
      </ContentPageLayout>
      <StickyCtaBySlug slug="spilleautomaten" />
    </>
  );
};

export default GratisCasinoSpil;
