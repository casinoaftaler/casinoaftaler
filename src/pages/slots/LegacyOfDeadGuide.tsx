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
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, BarChart3, Calculator, Dog, Flame, Play, Scale, Shield, Sparkles, Target, TrendingUp, Trophy, Users, Zap } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import legacyOfDeadFreeSpinsIntro from "@/assets/screenshots/legacy-of-dead-free-spins-intro.webp";
import legacyOfDeadGameplayGrid from "@/assets/screenshots/legacy-of-dead-gameplay-grid.webp";
import legacyOfDeadSpilleregler from "@/assets/screenshots/legacy-of-dead-spilleregler.webp";
import legacyOfDeadCasinoLobby from "@/assets/screenshots/legacy-of-dead-casino-lobby.webp";

const linkClass = "text-primary underline underline-offset-4 hover:text-primary/80 transition-colors";

const legacyOfDeadFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er forskellen på Legacy of Dead og Book of Dead?",
    answer: (
      <>
        Legacy of Dead og <Link to="/casinospil/spillemaskiner/book-of-dead" className={linkClass}>Book of Dead</Link> deler den samme grundlæggende mekanik (expanding symbols under free spins), men Legacy of Dead tilføjer en progressiv mekanik, hvor du kan akkumulere flere expanding symbols gennem retriggers. Hvor Book of Dead altid har ét expanding symbol, kan Legacy of Dead have op til 9 samtidige expanding symbols, hvilket dramatisk øger gevinstpotentialet i forlængede bonusrunder.
      </>
    ),
  },
  {
    question: "Hvad er RTP'en på Legacy of Dead?",
    answer: "Legacy of Dead har en gennemsnitlig RTP på 94,51 %, hvilket er lavere end Book of Dead (96,21 %). House edge er 5,49 %. Bemærk at RTP'en er 'achieved through participation' ifølge Play'n GO – den faktiske RTP afhænger af spillerens adfærd (f.eks. brug af gamble-funktionen). Det progressive expanding symbol-system giver dog Legacy of Dead et unikt gevinstpotentiale, der kan kompensere for den lavere basis-RTP i forlængede bonusrunder.",
  },
  {
    question: "Hvad er max win i Legacy of Dead?",
    answer: "Max win i Legacy of Dead er 5.000× din indsats. Teoretisk opnås dette ved at lande fuld skærm med premium-symbolet under free spins med multipel expanding symbols. Selvom max win er identisk med Book of Dead, er vejen dertil anderledes – Legacy of Dead's progressive system gør store gevinster mere sandsynlige over forlængede bonusrunder.",
  },
  {
    question: "Hvordan fungerer det progressive expanding symbol-system?",
    answer: "Når du trigger free spins, vælges ét tilfældigt expanding symbol (som i Book of Dead). Men hvis du retrigger free spins (ved at lande 3+ scatters under bonus), vælges et YDERLIGERE expanding symbol. Alle tidligere expanding symbols forbliver aktive. Med nok retriggers kan du have op til 9 samtidige expanding symbols – en mekanik der dramatisk øger sandsynligheden for store gevinster.",
  },
  {
    question: "Hvem har udviklet Legacy of Dead?",
    answer: (
      <>
        Legacy of Dead er udviklet af <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>, det svenske studie bag Book of Dead, Reactoonz og Fire Joker. Play'n GO er licenseret af MGA og UKGC, og deres slots er certificeret af uafhængige testlaboratorier. Legacy of Dead blev udgivet i 2020 som en direkte opfølger til Book of Dead, med forbedret matematik og moderniseret grafik.
      </>
    ),
  },
  {
    question: "Er Legacy of Dead god til bonusgennemspilning?",
    answer: (
      <>
        Nej, Legacy of Dead er IKKE velegnet til <Link to="/casino-bonus" className={linkClass}>bonusgennemspilning</Link> på grund af dens høje volatilitet og lave RTP (94,51 %). De lange tørkeperioder mellem bonusrunder gør det svært at gennemspille omsætningskrav konsistent. For bonusgennemspilning anbefaler vi lavere volatilitetsalternativer som Fire Joker eller Starburst.
      </>
    ),
  },
  {
    question: "Kan man købe bonusrunden i Legacy of Dead?",
    answer: "Nej, Legacy of Dead har ikke en Bonus Buy-funktion. Free spins skal triggers organisk ved at lande 3+ scatter-symboler (Pharaoh's Tomb), som giver 8 free spins. Gennemsnitlig triggerfrekvens er cirka 1 pr. 180-220 spins. Fraværet af Bonus Buy gør spillet mere tålmodigheds-krævende end moderne alternativer, men sikrer også at RTP'en ikke påvirkes af en Bonus Buy-mekanisme.",
  },
  {
    question: "Hvad er volatiliteten i Legacy of Dead?",
    answer: "Legacy of Dead har en høj volatilitet (4/5), sammenlignelig med Book of Dead. Dog gør det progressive expanding symbol-system at gevinstfordelingen er en smule anderledes: gennemsnitlige bonusrunder er lidt lavere (fordi det første expanding symbol er tilfældigt), men exceptionelle bonusrunder med retriggers er væsentligt højere takket være multiple expanding symbols.",
  },
];

const LegacyOfDeadGuide = () => {
  const faqJsonLd = buildFaqSchema(legacyOfDeadFaqs);
  const articleSchema = buildArticleSchema({
    headline: "Legacy of Dead – Progressiv Expanding Symbol-Analyse",
    description: "Dybdegående analyse af Legacy of Dead: progressivt expanding symbol-system, sammenligning med Book of Dead, RTP 94,51 % og EV-beregninger.",
    url: `${SITE_URL}/casinospil/spillemaskiner/legacy-of-dead`,
    datePublished: "2026-04-05",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });
  const videoJsonLd = buildVideoSchema(`${SITE_URL}/casinospil/spillemaskiner/legacy-of-dead`, "Ss2ZRXT0jCI", {
    title: "Legacy of Dead gennemgang – Progressiv expanding symbol forklaret",
    description: "Se en komplet gennemgang af Legacy of Dead: det progressive expanding symbol-system, retriggers og RTP 96,58 % forklaret i praksis.",
    uploadDate: "2026-03-07",
    duration: "PT1M41S",
  });

  return (
    <>
      <SEO
        title="Legacy of Dead – Expanding Symbols & RTP"
        description="Komplet analyse af Legacy of Dead: progressivt expanding symbol-system, RTP 94,51 %, sammenligning med Book of Dead og EV-beregninger."
        jsonLd={[faqJsonLd, articleSchema, videoJsonLd]}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><MenuIcon iconName="sparkles" className="mr-1.5 h-3.5 w-3.5" /> Progressiv bonusmekanik</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Legacy of Dead – Progressiv Expanding Symbol-Analyse</h1>
            <p className="text-lg text-white/80">Play'n GO's evolution af Book of Dead-formlen: hvordan det progressive expanding symbol-system transformerer en velkendt mekanik til en matematisk overlegen oplevelse.</p>
          </div>
        </div>
      </section>

      <ContentPageLayout>
        <AuthorMetaBar author="jonas" readTime="42 min" />
        {/* ── Experience First: Book of Dead-arven ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="trending-up" className="h-5 w-5 text-primary" />
            Fra Book of Dead til Legacy of Dead: Evolutionen
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Når <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link> udgav Legacy of Dead i 2020, stod de over for en delikat designudfordring: hvordan forbedrer man en af de mest succesfulde slots nogensinde (<Link to="/casinospil/spillemaskiner/book-of-dead" className={linkClass}>Book of Dead</Link>) uden at alienere dens enorme fanbase? Svaret var elegant: bevar den grundlæggende mekanik, men tilføj et progressivt lag, der belønner tålmodighed og retriggers.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Book of Dead's kernemekanik – expanding symbols under free spins – er bevaret intakt. Det, der ændrer sig, er hvad der sker ved retriggers. I Book of Dead genanvendes det samme expanding symbol. I Legacy of Dead tilføjes et NYT expanding symbol for hver retrigger, mens alle tidligere expanding symbols forbliver aktive. Denne tilsyneladende lille ændring transformerer spillets matematiske profil fundamentalt.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Forestil dig en bonusrunde med 3 retriggers: du starter med ét expanding symbol, tilføjer et ved første retrigger, endnu et ved anden, og et fjerde ved tredje. Med 4 samtidige expanding symbols er sandsynligheden for fulde hjul med premium-symboler dramatisk højere end i Book of Dead. Det er denne kumulativ mekanik, der giver Legacy of Dead dens unikke risiko-reward profil.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Æstetisk fortsætter Legacy of Dead den egyptiske tematik fra Book of Dead, men med moderniseret grafik og forbedret animation. Symbologien er genkendelig – faraoner, Anubis, Horus og standard kortsymboler – men redesignet med mere detaljerede texturer og dynamisk belysning. Lyddesignet er ligeledes opgraderet med mere atmosfærisk scoring, der intensiveres under bonusrunder.
          </p>
        </section>

        <ReviewScreenshot
          src={legacyOfDeadFreeSpinsIntro}
          alt="Legacy of Dead Free Spins intro-skærm med expanding symbols-forklaring og scatter-trigger krav"
          caption="Intro-skærmen der forklarer Free Spins-mekanikken: 3+ scatters trigger free spins med op til 9 expanding symbols."
          eager
          size="full"
        />

        <YoutubeEmbed videoId="Ss2ZRXT0jCI" title="Legacy of Dead gennemgang – Progressiv expanding symbol" description="Se en komplet gennemgang af Legacy of Dead: det progressive expanding symbol-system forklaret i praksis." uploadDate="2026-03-07" duration="PT1M41S" />
        <VideoContextBox heading="Her gennemgår vores streamer Legacy of Dead i praksis">
          <Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> viser det progressive expanding symbol-system, retrigger-mekanikken og forskellen til Book of Dead. Videoen er en del af vores dybdegående indhold om{" "}
          <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> og{" "}
          <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>.
        </VideoContextBox>

        {/* ── Teknisk profil ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="calculator" className="h-5 w-5 text-primary" />
            Kernetal og Matematisk Profil
          </h2>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div><span className="text-muted-foreground">Udvikler:</span><br /><strong>Play'n GO</strong></div>
                <div><span className="text-muted-foreground">Udgivelsesår:</span><br /><strong>2020</strong></div>
                <div><span className="text-muted-foreground">RTP:</span><br /><strong>94,51 %</strong></div>
                <div><span className="text-muted-foreground">Volatilitet:</span><br /><strong>Høj (4/5)</strong></div>
                <div><span className="text-muted-foreground">Max Win:</span><br /><strong>5.000× indsats</strong></div>
                <div><span className="text-muted-foreground">Grid:</span><br /><strong>5×3 (10 linjer)</strong></div>
                <div><span className="text-muted-foreground">Min. indsats:</span><br /><strong>0,10 kr.</strong></div>
                <div><span className="text-muted-foreground">Maks. indsats:</span><br /><strong>1.000 kr.</strong></div>
                <div><span className="text-muted-foreground">House Edge:</span><br /><strong>5,49 %</strong></div>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Legacy of Dead opererer på et standard 5×3 grid med 10 faste gevinstlinjer – identisk med Book of Dead. Scatter-symbolet (Pharaoh's Tomb) fungerer både som scatter og wild, en dual-funktion der er kendetegnende for "Book of"-genren. Tre eller flere scatters trigger free spins (8 stk.), med mulighed for retrigger ved yderligere 3+ scatters, der giver yderligere 8 free spins.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            <Link to="/ordbog/rtp" className={linkClass}>RTP</Link>'en på 94,51 % er lavere end Book of Dead's 96,21 %. Denne forskel er væsentlig: over 10.000 spins à 10 kr. repræsenterer det et ekstra forventet tab på 1.700 kr. sammenlignet med Book of Dead. <Link to="/ordbog/house-edge" className={linkClass}>House edge</Link> på 5,49 % er høj for en moderne slot og placerer Legacy of Dead i den dyrere ende af "Book of"-genren. Bemærk at Play'n GO angiver, at RTP'en er "achieved through participation", hvilket indebærer at gamble-funktionen kan påvirke den effektive RTP.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Bonusrundens estimerede triggerfrekvens er cirka 1 pr. 180-220 spins – marginalt lavere end Book of Dead (1 pr. 150-200). Denne lidt lavere frekvens kompenseres af det progressive expanding symbol-systems højere gennemsnitlige bonus-udbetaling, især i runder med retriggers. Den forventede gennemsnitlige bonusrunde-gevinst er estimeret til 70-100× indsatsen for runder uden retrigger, stigende til 150-300× for runder med 1-2 retriggers.
          </p>
          <ReviewScreenshot
            src={legacyOfDeadGameplayGrid}
            alt="Legacy of Dead gameplay med 5x3 grid, egyptiske symboler inkl. Farao, Anubis, Horus og Pharaoh's Tomb scatter"
            caption="Basisspillet med 10 gevinstlinjer, premium-symboler (Farao, Anubis, Horus) og Pharaoh's Tomb scatter/wild-symbol."
            size="full"
          />
        </section>

        {/* ── Progressivt expanding symbol ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="sparkles" className="h-5 w-5 text-primary" />
            Det Progressive Expanding Symbol-System Dekonstrueret
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Legacy of Dead's definerende innovation er det kumulative expanding symbol-system. Ved aktivering af free spins vælges ét tilfældigt symbol som expanding symbol – præcis som i Book of Dead. Men forskellen manifesterer sig ved retriggers: i stedet for at genanvende det eksisterende expanding symbol, vælges et NYTIDLIGT symbol, og det tilføjes til listen af aktive expanding symbols.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Mekanikken har en kaskadeeffekt på gevinstpotentialet. Med 1 expanding symbol er sandsynligheden for at et givet hjul udfyldes helt af det pågældende symbol relativt lav (afhængigt af symbolets vægt). Med 2 expanding symbols fordobles denne sandsynlighed approximativt. Med 3+ expanding symbols begynder gevinstmuligheder at overlappe, og sandsynligheden for store multi-linje gevinster stiger eksponentielt.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Det matematisk interessante er, at retrigger-sandsynligheden er uafhængig af antallet af aktive expanding symbols. Hvert spin under free spins har den samme sandsynlighed for at lande 3+ scatters (estimeret til cirka 3-5 %). Men gevinstpotentialet for de spins, der IKKE lander scatters, stiger dramatisk med hvert nyt expanding symbol. Resultatet er en progressiv mekanik, der belønner lange bonusrunder disproportionalt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I det teoretiske bedste scenarie (9 samtidige expanding symbols) ville enhvert symbol på griddet ekspandere til at fylde hele sit hjul. Sandsynligheden for dette er astronomisk lav – det kræver 8 retriggers i træk, hver med 3-5 % sandsynlighed. Men selve muligheden for denne kaskade er, hvad der giver Legacy of Dead dens unikke appel og matematiske dybde.
          </p>
          <ReviewScreenshot
            src={legacyOfDeadSpilleregler}
            alt="Legacy of Dead officielle spilleregler: Game Rules med expanding symbol-forklaring, retrigger-regler og RTP 94,51 %"
            caption="De officielle spilleregler med detaljeret forklaring af expanding symbols, retrigger-mekanik og gamble-funktion."
            size="full"
          />
        </section>

        {/* ── EV-analyse ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="bar-chart3" className="h-5 w-5 text-primary" />
            EV-Perspektiv: Hvornår Leverer Legacy of Dead Bedre end Book of Dead?
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Sammenligningen med Book of Dead er uundgåelig, og det matematiske svar er nuanceret. I korte sessioner (under 200 spins) er forskellen minimal – begge slots vil opføre sig næsten identisk, med sporadiske base game-gevinster og (muligvis) en bonusrunde. Det er i sessioner med 500+ spins, at Legacy of Dead's overlegenhed begynder at manifestere sig.
          </p>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">EV-sammenligning: 1.000 spins à 10 kr.</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Parameter</th>
                      <th className="text-center py-2">Legacy of Dead</th>
                      <th className="text-center py-2">Book of Dead</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b"><td className="py-2">RTP</td><td className="text-center">94,51 %</td><td className="text-center">96,21 %</td></tr>
                    <tr className="border-b"><td className="py-2">Forventet tab</td><td className="text-center">-549 kr.</td><td className="text-center">-379 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">EV-forskel</td><td className="text-center" colSpan={2}>-170 kr. til Legacy (dyrere)</td></tr>
                    <tr><td className="py-2">Bonus-gennemsnit</td><td className="text-center">85-110×</td><td className="text-center">70-90×</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Den reelle forskel ligger i bonusrundens gevinstfordeling. Book of Dead's bonusrunder har en relativt snæver gevinstspredning (de fleste runder leverer 20-80× indsatsen). Legacy of Dead's progressive system skaber en bredere fordeling med en "fat tail" – de fleste runder leverer 15-60× (lidt lavere end Book of Dead), men runder med retriggers kan eksplodere til 200-500×. Denne asymmetri er tiltrækkende for spillere, der værdsætter upside-potentiale.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Konklusion: For spillere, der planlægger sessioner på 500+ spins, er Legacy of Dead det objektivt bedre valg baseret på RTP. For korte sessions eller spillere, der foretrækker en mere forudsigelig bonusrunde, er Book of Dead stadig et gyldigt alternativ. Valget handler ultimativt om præference for konsistens (Book of Dead) vs. progressivt potentiale (Legacy of Dead).
          </p>
        </section>

        {/* ── Risikoprofil ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="alert-triangle" className="h-5 w-5 text-primary" />
            Bankroll-Strategi og Risikostyring
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Legacy of Dead kræver en bankroll-tilgang, der afspejler dens høje volatilitet. Vi anbefaler minimum 250 spins i budget (2.500 kr. ved 10 kr./spin) for at give en rimelig sandsynlighed for mindst én bonusrunde. For spillere, der ønsker at maksimere sandsynligheden for at opleve det progressive expanding symbol-system (med retrigger), er 500+ spins ideelt.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Base game-drain er sammenlignelig med Book of Dead – din saldo vil gradvist falde mellem bonustriggers. Vi anbefaler et tabsstop på 50-60 % af startkapitalen og et gevinststop på 300 % (eller højere efter en exceptionel bonusrunde). Husk altid <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>-principper og spil aldrig for mere, end du kan tåle at tabe.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For <Link to="/free-spins" className={linkClass}>free spins</Link>-spillere er Legacy of Dead et godt valg, da free spins-tilbuddet typisk giver direkte adgang til base game, hvor du kan jagte bonusrunden uden at risikere din egen bankroll. Vær dog opmærksom på, at de fleste free spins-tilbud har omsætningskrav, og Legacy of Dead's volatilitet kan gøre det svært at omsætte eventuelle gevinster konsistent.
          </p>
        </section>

        {/* ── Book of-genren: Historisk kontekst ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="flame" className="h-5 w-5 text-primary" />
            "Book of"-Genren: Fra Novomatic til Play'n GO's Dominans
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Legacy of Dead tilhører en af slotindustriens mest ikoniske genrer: "Book of"-spillene. Genren stammer fra Novomatics Book of Ra, der blev lanceret i landbaserede casinoer i 2005 og hurtigt blev en af de mest populære slots i Europa. Den grundlæggende mekanik – scatters der fungerer som wilds, free spins med et tilfældigt expanding symbol – var revolutionerende i sin simplicitet og elegance.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link> adopterede og perfektionerede denne formel med <Link to="/casinospil/spillemaskiner/book-of-dead" className={linkClass}>Book of Dead</Link> i 2016. Hvor Book of Ra var begrænset af sin land-baserede arv (lavere RTP, simplere grafik), var Book of Dead designet fra bunden til online-markedet med høj RTP (96,21 %), moderne HTML5-teknologi og et æstetisk poleret egyptisk tema. Book of Dead blev den definitive online-version af "Book of"-formlen og genererede milliarder i omsætning.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Legacy of Dead repræsenterer den næste evolution: bevarelsen af alt, hvad der fungerer (dual scatter/wild, 10-linje layout, expanding symbols), med tilføjelsen af et progressivt lag, der belønner de mest tålmodige spillere. Det er en raffineret designfilosofi: i stedet for at tilføje kompleksitet (som Megaways eller cluster pays), tilføjer Play'n GO dybde inden for den eksisterende mekaniske ramme.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Denne evolutionære tilgang har vist sig at være kommercielt succesfuld. Legacy of Dead konsekvent rangerer blandt de 50 mest spillede slots hos danske online casinoer, og dens popularitet er vedvarende – ikke flyktig som mange "hype"-slots, der topper i en måned og derefter falder. Det skyldes, at genren har en loyal fanbase, der værdsætter mekanisk renhed over innovation for innovationens skyld.
          </p>
        </section>

        {/* ── Symbolhierarki og EV-analyse ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="bar-chart3" className="h-5 w-5 text-primary" />
            Symbolhierarki og EV-Bidrag under Expanding Symbols
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Effektiviteten af Legacy of Dead's expanding symbol-system afhænger fundamentalt af, HVILKET symbol der vælges. Ikke alle expanding symbols er skabt lige – premium-symboler med højere udbetalinger giver dramatisk bedre bonusrunder end lavværdi-symboler. Lad os kvantificere denne forskel:
          </p>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Expanding symbol EV-analyse (estimeret)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Symbol</th>
                      <th className="py-2 text-right font-semibold">5-på-linje</th>
                      <th className="py-2 text-right font-semibold">Fuldt hjul-værdi</th>
                      <th className="py-2 text-right font-semibold">Gennemsnitlig bonusrunde</th>
                      <th className="py-2 text-right font-semibold">Bedste 5 %-runde</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/30"><td className="py-2 font-medium text-foreground">Farao (Premium)</td><td className="py-2 text-right">50×</td><td className="py-2 text-right">500×</td><td className="py-2 text-right">120-180×</td><td className="py-2 text-right">800-2.000×</td></tr>
                    <tr className="border-b border-border/30"><td className="py-2 font-medium text-foreground">Anubis</td><td className="py-2 text-right">20×</td><td className="py-2 text-right">200×</td><td className="py-2 text-right">80-120×</td><td className="py-2 text-right">400-1.000×</td></tr>
                    <tr className="border-b border-border/30"><td className="py-2 font-medium text-foreground">Horus</td><td className="py-2 text-right">15×</td><td className="py-2 text-right">150×</td><td className="py-2 text-right">60-90×</td><td className="py-2 text-right">300-750×</td></tr>
                    <tr className="border-b border-border/30"><td className="py-2">A/K</td><td className="py-2 text-right">4-5×</td><td className="py-2 text-right">40-50×</td><td className="py-2 text-right">25-40×</td><td className="py-2 text-right">100-250×</td></tr>
                    <tr><td className="py-2">10/J/Q</td><td className="py-2 text-right">2-3×</td><td className="py-2 text-right">20-30×</td><td className="py-2 text-right">15-25×</td><td className="py-2 text-right">60-150×</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            Forskellen er dramatisk: en bonusrunde med Farao som expanding symbol gennemsnitligt udbetaler 5-8× mere end en runde med 10/J/Q. Denne varians i expanding symbol-kvalitet er den primære kilde til Legacy of Dead's bonusrunde-volatilitet. Du kan lande 5 bonusrunder i træk med lavværdi-symbols og opleve skuffende resultater, for derefter at lande én Farao-runde, der overstiger alle de tidligere runder tilsammen.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Det progressive system forstærker denne dynamik: med 2+ expanding symbols stiger sandsynligheden for, at mindst ét af dem er et premium-symbol. Ved 3 samtidige expanding symbols er sandsynligheden for at have mindst ét premium-symbol ca. 65-70 % (afhængigt af symbolets vægt i udvælgelsesalgoritmen). Dette er endnu en matematisk fordel ved Legacy of Dead's progressive mekanik over Book of Dead's single-symbol system.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For spillere, der ønsker at maksimere deres expected value i Legacy of Dead, er den vigtigste indsigt, at bonusrundens kvalitet i høj grad er forudbestemt af det tilfældigt valgte expanding symbol. Det er ikke noget, du kan kontrollere – men det er noget, du bør forstå, fordi det forklarer, hvorfor to tilsyneladende identiske bonusrunder (samme antal spins, samme antal retriggers) kan have vidt forskellige resultater.
          </p>
        </section>

        {/* ── Retrigger-matematik ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="zap" className="h-5 w-5 text-primary" />
            Retrigger-Matematik: Sandsynligheder og Kumulativt Potentiale
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Retriggers er nøglen til Legacy of Dead's maksimale gevinstpotentiale. Hvert retrigger tilføjer ikke blot 8 ekstra free spins, men også et nyt expanding symbol – en mekanik, der gør lange bonusrunder eksponentielt mere værdifulde. Lad os modellere sandsynlighederne:
          </p>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Retrigger-sandsynligheder (estimeret)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold">Retriggers</th>
                      <th className="py-2 text-right font-semibold">Expanding symbols</th>
                      <th className="py-2 text-right font-semibold">Sandsynlighed</th>
                      <th className="py-2 text-right font-semibold">Estimeret bonus-EV</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/30"><td className="py-2">0 (basis)</td><td className="py-2 text-right">1</td><td className="py-2 text-right">~65-70 %</td><td className="py-2 text-right">50-80×</td></tr>
                    <tr className="border-b border-border/30"><td className="py-2">1</td><td className="py-2 text-right">2</td><td className="py-2 text-right">~20-25 %</td><td className="py-2 text-right">120-200×</td></tr>
                    <tr className="border-b border-border/30"><td className="py-2">2</td><td className="py-2 text-right">3</td><td className="py-2 text-right">~5-8 %</td><td className="py-2 text-right">250-500×</td></tr>
                    <tr className="border-b border-border/30"><td className="py-2">3</td><td className="py-2 text-right">4</td><td className="py-2 text-right">~1-2 %</td><td className="py-2 text-right">500-1.500×</td></tr>
                    <tr><td className="py-2">4+</td><td className="py-2 text-right">5+</td><td className="py-2 text-right">{'<'} 0,5 %</td><td className="py-2 text-right">1.000-5.000×</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            Tabellen viser den eksponentielle gevinsteskalering ved multiple retriggers. Fra 1 til 3 retriggers stiger den gennemsnitlige bonus-EV med en faktor 5-10×. Denne "gevinstaccelerator" er Legacy of Dead's største matematiske innovation: den belønner held (retriggers) med disproportionalt store gevinster, fordi hvert nyt expanding symbol multiplicerer gevinstpotentialet for alle efterfølgende spins.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            I praksis vil ca. 70 % af dine bonusrunder have 0 retriggers og resultere i beskedne gevinster (50-80× indsatsen). De resterende 30 % vil have mindst 1 retrigger og levere markant bedre resultater. Det er denne 30 %-andel, der driver størstedelen af Legacy of Dead's "big win"-momenter og giver spillere den spænding, der fastholder dem ved spillet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For spillere, der sammenligner Legacy of Dead med Book of Dead, er retrigger-dynamikken det afgørende differentieringspunkt. I Book of Dead er en retrigger blot ekstra spins med det samme expanding symbol – en lineær gevinststigning. I Legacy of Dead er en retrigger en eksponentiel gevinststigning, fordi det nye expanding symbol forbedrer alle fremtidige spins. Denne ikke-lineære eskalering er, hvad der gør Legacy of Dead's bonusrunder potentielt mere værdifulde end Book of Dead's, trods den lavere basis-RTP.
          </p>
          <ReviewScreenshot
            src={legacyOfDeadCasinoLobby}
            alt="Legacy of Dead i online casino-lobby med søgefunktion og populære spillemaskiner"
            caption="Legacy of Dead tilgængelig i casino-lobbyen – spillet findes hos alle større danske licenserede casinoer."
            size="medium"
          />
        </section>

        {/* ── Mobiloplevelse ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="target" className="h-5 w-5 text-primary" />
            Mobiloptimering og Teknisk Performance
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Legacy of Dead er udviklet i HTML5 og fuldt optimeret til <Link to="/mobil-casino" className={linkClass}>mobilspil</Link>. Play'n GO's teknologiplatform er blandt de mest effektive i industrien: spillets 5×3 grid skalerer rent til portrætformat, og alle animationer (expanding symbol-udvidelser, scatter-triggere, retrigger-sekvenser) kører smooth på moderne enheder. Indlæsningstiden er under 3 sekunder på 4G-forbindelser.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            En bemærkelsesværdig detalje er, hvordan det progressive expanding symbol-system oversættes til mobiloplevelsen. Under bonusrunder med multiple expanding symbols viser spillet tydeligt alle aktive expanding symbols i en sidebar/overlay, så spilleren altid har overblik over sine akkumulerede fordele. Denne UI-beslutning er afgørende for spiloplevelsen, fordi den visuelle bekræftelse af "jeg har samlet 3 expanding symbols" er en del af den psykologiske tilfredsstillelse.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Touch-interaktionen er responsiv og intuitiv. Spin-knappen er centralt placeret og stor nok til komfortabel interaktion, mens indsatsindstillingerne er tilgængelige via swipe-gestures. Play'n GO har også implementeret hurtigspil-funktioner (turbo spin, skip animationer), der er særligt nyttige på mobil, hvor spillere ofte spiller i korte sessions.
          </p>
        </section>

        {/* ── Hvem passer det til? ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="users" className="h-5 w-5 text-primary" />
            Målgruppe: Hvem Bør Vælge Legacy of Dead Fremfor Book of Dead?
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Legacy of Dead er primært designet til erfarne slot-spillere, der allerede kender og elsker Book of Dead-formlen, men ønsker en evolution med højere ceiling. Det progressive expanding symbol-system tilføjer et strategisk lag – retriggers er ikke blot "gratis spins", men en meningsfuld eskalering af gevinstpotentialet, som gør lange bonusrunder til de mest spændende øjeblikke.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Spillet appellerer også til matematisk orienterede spillere, der værdsætter det asymmetriske gevinstpotentiale fra det progressive system. Bemærk dog, at RTP'en (94,51 %) er lavere end Book of Dead's (96,21 %), så fra et rent EV-perspektiv er Book of Dead det billigere valg. Legacy of Dead's appel ligger i det progressive expanding symbol-system, der kan levere exceptionelle bonusrunder ved retriggers.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Spillet er IKKE velegnet til nye spillere (for komplekst at forstå det progressive system), spillere med lav risikotolerance (høj volatilitet) eller bonus-spillere (svært at gennemspille). For disse segmenter anbefaler vi henholdsvis <Link to="/casinospil/spillemaskiner/fire-joker" className={linkClass}>Fire Joker</Link>, <Link to="/casinospil/spillemaskiner/starburst" className={linkClass}>Starburst</Link> eller <Link to="/casinospil/spillemaskiner/wolf-gold" className={linkClass}>Wolf Gold</Link>.
          </p>
        </section>

        {/* ── Konklusion ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MenuIcon iconName="trophy" className="h-5 w-5 text-primary" />
            Opfølgeren Der Overgår Originalen
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Legacy of Dead tilbyder en unik mekanik i "Book of"-genren med sit progressive expanding symbol-system. Selvom RTP'en (94,51 %) er lavere end Book of Dead's (96,21 %), kompenserer det kumulative expanding symbol-system med potentielt mere eksplosive bonusrunder ved retriggers. Play'n GO har formået at evolve en proven formel med en mekanik, der belønner tålmodighed.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Med max win på 5.000× og en unik progressiv mekanik er Legacy of Dead et interessant alternativ for erfarne slot-spillere, der accepterer den højere house edge (5,49 %) mod potentialet for exceptionelle bonusrunder. Udforsk vores komplette <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskineguide-oversigt</Link> for at finde det perfekte match til din spillestil.
          </p>
        </section>

        <SlotDataLink slotSlug="legacy-of-dead" slotName="Legacy of Dead" />
        <SlotProviderLink slotSlug="legacy-of-dead" />
        <LatestNewsByCategory pagePath="/casinospil/spillemaskiner/legacy-of-dead" />
        <RelatedGuides currentPath="/casinospil/spillemaskiner/legacy-of-dead" />
        <FAQSection title="Ofte Stillede Spørgsmål om Legacy of Dead" faqs={legacyOfDeadFaqs} />
        <AuthorBio author="jonas" />
      </ContentPageLayout>
      <StickyCtaBySlug slug="campobet" />
    </>
  );
};

export default LegacyOfDeadGuide;
