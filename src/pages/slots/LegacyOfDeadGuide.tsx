import { Link } from "react-router-dom";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import heroImage from "@/assets/heroes/legacy-of-dead-hero.jpg";
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
import {
  Sparkles, TrendingUp, Target, Shield, Zap, BarChart3,
  Calculator, Flame, Scale, Users, AlertTriangle, Trophy
} from "lucide-react";

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
    answer: "Legacy of Dead har en RTP på 96,58 %, hvilket er højere end Book of Dead (96,21 %). House edge er 3,42 %, som placerer den i det øvre interval for high-volatility slots. RTP'en er fast hos Play'n GO og varierer ikke mellem casinoer. Denne højere RTP kombineret med det progressive expanding symbol-system gør Legacy of Dead til et matematisk attraktivt alternativ til sin forgænger.",
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
        Nej, Legacy of Dead er IKKE velegnet til <Link to="/casino-bonus" className={linkClass}>bonusgennemspilning</Link> på grund af dens høje volatilitet. Selvom RTP'en er fair (96,58 %), vil de lange tørkeperioder mellem bonusrunder gøre det svært at gennemspille omsætningskrav konsistent. For bonusgennemspilning anbefaler vi lavere volatilitetsalternativer som Fire Joker eller Starburst.
      </>
    ),
  },
  {
    question: "Kan man købe bonusrunden i Legacy of Dead?",
    answer: "Nej, Legacy of Dead har ikke en Bonus Buy-funktion. Free spins skal triggers organisk ved at lande 3+ scatter-symboler (Pharaoh's Tomb). Gennemsnitlig triggerfrekvens er cirka 1 pr. 180-220 spins. Fraværet af Bonus Buy gør spillet mere tålmodigheds-krævende end moderne alternativer, men sikrer også at RTP'en ikke påvirkes af en Bonus Buy-mekanisme.",
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
    description: "Dybdegående analyse af Legacy of Dead: progressivt expanding symbol-system, sammenligning med Book of Dead, RTP 96,58 % og EV-beregninger.",
    url: `${SITE_URL}/casinospil/spillemaskiner/legacy-of-dead`,
    datePublished: "2026-02-18",
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
        description="Komplet analyse af Legacy of Dead: progressivt expanding symbol-system, RTP 96,58 %, sammenligning med Book of Dead og EV-beregninger."
        jsonLd={[faqJsonLd, articleSchema, videoJsonLd]}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Progressiv bonusmekanik</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Legacy of Dead – Progressiv Expanding Symbol-Analyse</h1>
            <p className="text-lg text-white/80">Play'n GO's evolution af Book of Dead-formlen: hvordan det progressive expanding symbol-system transformerer en velkendt mekanik til en matematisk overlegen oplevelse.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="19 min" />
        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} width="1920" height="1080" className="w-full h-auto object-cover max-h-[400px]" alt="Legacy of Dead spillemaskine" loading="eager" />
        </div>

        {/* ── Experience First: Book of Dead-arven ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
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

        <YoutubeEmbed videoId="Ss2ZRXT0jCI" title="Legacy of Dead gennemgang – Progressiv expanding symbol" description="Se en komplet gennemgang af Legacy of Dead: det progressive expanding symbol-system forklaret i praksis." uploadDate="2026-03-07" duration="PT1M41S" />
        <VideoContextBox heading="Her gennemgår vores streamer Legacy of Dead i praksis">
          <Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> viser det progressive expanding symbol-system, retrigger-mekanikken og forskellen til Book of Dead. Videoen er en del af vores dybdegående indhold om{" "}
          <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> og{" "}
          <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>.
        </VideoContextBox>

        {/* ── Teknisk profil ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Kernetal og Matematisk Profil
          </h2>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div><span className="text-muted-foreground">Udvikler:</span><br /><strong>Play'n GO</strong></div>
                <div><span className="text-muted-foreground">Udgivelsesår:</span><br /><strong>2020</strong></div>
                <div><span className="text-muted-foreground">RTP:</span><br /><strong>96,58 %</strong></div>
                <div><span className="text-muted-foreground">Volatilitet:</span><br /><strong>Høj (4/5)</strong></div>
                <div><span className="text-muted-foreground">Max Win:</span><br /><strong>5.000× indsats</strong></div>
                <div><span className="text-muted-foreground">Grid:</span><br /><strong>5×3 (10 linjer)</strong></div>
                <div><span className="text-muted-foreground">Min. indsats:</span><br /><strong>0,10 kr.</strong></div>
                <div><span className="text-muted-foreground">Maks. indsats:</span><br /><strong>1.000 kr.</strong></div>
                <div><span className="text-muted-foreground">House Edge:</span><br /><strong>3,42 %</strong></div>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Legacy of Dead opererer på et standard 5×3 grid med 10 faste gevinstlinjer – identisk med Book of Dead. Scatter-symbolet (Pharaoh's Tomb) fungerer både som scatter og wild, en dual-funktion der er kendetegnende for "Book of"-genren. Tre eller flere scatters trigger free spins (10 stk.), med mulighed for retrigger ved yderligere 3+ scatters.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            <Link to="/ordbog/rtp" className={linkClass}>RTP</Link>'en på 96,58 % er en væsentlig forbedring over Book of Dead's 96,21 %. Denne 0,37 procentpoint-forskel lyder beskeden, men over 10.000 spins à 10 kr. repræsenterer det en forventet besparelse på 370 kr. <Link to="/ordbog/house-edge" className={linkClass}>House edge</Link> på 3,42 % placerer Legacy of Dead i det absolutte topkvartil for high-<Link to="/ordbog/volatilitet" className={linkClass}>volatility</Link> slots – bedre end de fleste konkurrenter i "Book of"-genren.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Bonusrundens estimerede triggerfrekvens er cirka 1 pr. 180-220 spins – marginalt lavere end Book of Dead (1 pr. 150-200). Denne lidt lavere frekvens kompenseres af det progressive expanding symbol-systems højere gennemsnitlige bonus-udbetaling, især i runder med retriggers. Den forventede gennemsnitlige bonusrunde-gevinst er estimeret til 70-100× indsatsen for runder uden retrigger, stigende til 150-300× for runder med 1-2 retriggers.
          </p>
        </section>

        {/* ── Progressivt expanding symbol ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
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
        </section>

        <InlineCasinoCards />

        {/* ── EV-analyse ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
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
                    <tr className="border-b"><td className="py-2">RTP</td><td className="text-center">96,58 %</td><td className="text-center">96,21 %</td></tr>
                    <tr className="border-b"><td className="py-2">Forventet tab</td><td className="text-center">-342 kr.</td><td className="text-center">-379 kr.</td></tr>
                    <tr className="border-b"><td className="py-2">EV-forskel</td><td className="text-center" colSpan={2}>+37 kr. til Legacy</td></tr>
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
            <AlertTriangle className="h-5 w-5 text-primary" />
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

        {/* ── Hvem passer det til? ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Målgruppe: Hvem Bør Vælge Legacy of Dead Fremfor Book of Dead?
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Legacy of Dead er primært designet til erfarne slot-spillere, der allerede kender og elsker Book of Dead-formlen, men ønsker en evolution med højere ceiling. Det progressive expanding symbol-system tilføjer et strategisk lag – retriggers er ikke blot "gratis spins", men en meningsfuld eskalering af gevinstpotentialet, som gør lange bonusrunder til de mest spændende øjeblikke.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Spillet appellerer også til matematisk orienterede spillere, der værdsætter den højere RTP (96,58 % vs. 96,21 %) og det asymmetriske gevinstpotentiale. Hvis du planlægger længere sessioner og har en bankroll, der kan absorbere volatiliteten, er Legacy of Dead det objektivt bedre valg fra et EV-perspektiv.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Spillet er IKKE velegnet til nye spillere (for komplekst at forstå det progressive system), spillere med lav risikotolerance (høj volatilitet) eller bonus-spillere (svært at gennemspille). For disse segmenter anbefaler vi henholdsvis <Link to="/casinospil/spillemaskiner/fire-joker" className={linkClass}>Fire Joker</Link>, <Link to="/casinospil/spillemaskiner/starburst" className={linkClass}>Starburst</Link> eller <Link to="/casinospil/spillemaskiner/wolf-gold" className={linkClass}>Wolf Gold</Link>.
          </p>
        </section>

        {/* ── Konklusion ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Opfølgeren Der Overgår Originalen
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Legacy of Dead er et sjældent eksempel på en opfølger, der matematisk set er overlegen i forhold til originalen. Den højere RTP, det progressive expanding symbol-system og den bevarede enkelthed gør den til vores anbefaling for spillere i "Book of"-genren. Play'n GO har formået at evolve en proven formel uden at kompromittere dens kerneappel.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Med en RTP på 96,58 %, max win på 5.000× og en unik progressiv mekanik er Legacy of Dead et must-try for enhver seriøs slot-spiller. Udforsk vores komplette <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskineguide-oversigt</Link> for at finde det perfekte match til din spillestil.
          </p>
        </section>

        <SlotDataLink slotSlug="legacy-of-dead" slotName="Legacy of Dead" />
        <SlotProviderLink slotSlug="legacy-of-dead" />
        <LatestNewsByCategory pagePath="/casinospil/spillemaskiner/legacy-of-dead" />
        <RelatedGuides currentPath="/casinospil/spillemaskiner/legacy-of-dead" />
        <FAQSection title="Ofte Stillede Spørgsmål om Legacy of Dead" faqs={legacyOfDeadFaqs} />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="campobet" />
    </>
  );
};

export default LegacyOfDeadGuide;
