import React from "react";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, buildVideoSchema, SITE_URL } from "@/lib/seo";
import { YoutubeEmbed } from "@/components/YoutubeEmbed";
import { VideoContextBox } from "@/components/VideoContextBox";
import { RelatedGuides } from "@/components/RelatedGuides";
import { BonusMoneyLinks } from "@/components/BonusMoneyLinks";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { BonusClusterPriorityLinks } from "@/components/BonusClusterPriorityLinks";
import reloadHero from "@/assets/heroes/reload-bonus-hero.jpg";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  TrendingUp,
  Calculator,
  AlertTriangle,
  Clock,
  Target,
  Sparkles,
  RefreshCw,
  Calendar,
  CheckCircle2,
  Percent,
  Wallet,
  Zap,
  BookOpen,
  Gift,
  Star,
  Scale,
  Coins,
  BarChart3,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const linkClass = "text-primary underline hover:text-primary/80";

const reloadFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er en reload bonus?",
    answer: (
      <>
        En reload bonus er en{" "}
        <Link to="/indskudsbonus" className={linkClass}>indskudsbonus</Link> for eksisterende spillere. Mens{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonussen</Link> kun gives én gang til nye spillere, tilbydes reload-bonusser gentagne gange – typisk ugentligt eller ved særlige lejligheder. Matchprocenten er lavere (25-50% vs. 100%), men omsætningskravene er ofte mere favorable.
      </>
    ),
  },
  {
    question: "Er reload bonus bedre end velkomstbonus?",
    answer: (
      <>
        Matematisk ja, overraskende ofte. En reload på 50% match med 3x (b) omsætning har typisk 85-90% reel EV – højere end mange velkomstbonusser med 100% match og 10x (d+b). Nøglen er de lavere omsætningskrav. En{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> med 10x (d+b) kræver, at du omsætter både indbetaling og bonus – reload-bonusser kræver typisk kun bonus-omsætning. Over tid akkumulerer reload-bonussens værdi, da du kan tage dem gentagne gange.
      </>
    ),
  },
  {
    question: "Hvor ofte kan jeg få en reload bonus?",
    answer: "Frekvensen varierer markant. De mest aktive kampagneprogrammer tilbyder daglige reload-bonusser, mens standarden er ugentlige tilbud (typisk fredag-søndag). VIP-programmer kan give personlige reload-tilbud baseret på din spilleaktivitet. Nogle casinoer kører også reload-kampagner ved helligdage, nye spiludgivelser eller store sportsbegivenheder. Tilmeld dig altid casinoets nyhedsbrev for at modtage tidsbegrænsede tilbud.",
  },
  {
    question: "Kan jeg afslå en reload bonus og spille uden?",
    answer: (
      <>
        Ja, og det er faktisk klogt i visse situationer. Hvis du spiller primært bordspil eller{" "}
        <Link to="/live-casino" className={linkClass}>live casino</Link>, hvor spilbidrag typisk er 10-20%, kan omsætningskravet reelt blive 50-100x. I det tilfælde er du bedre tjent med at spille uden bonus. Tjek altid om casinoets{" "}
        <Link to="/cashback-bonus" className={linkClass}>cashback-program</Link> er mere fordelagtigt for din spillestil end en reload bonus.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på reload bonus og cashback?",
    answer: (
      <>
        Reload bonus gives ved indbetaling (uanset om du vinder eller taber), mens{" "}
        <Link to="/cashback-bonus" className={linkClass}>cashback</Link> kun gives når du har tab. Reload kræver en aktiv indbetaling og har omsætningskrav; cashback er passiv og ofte omsætningsfri. For aktive spillere, der indbetaler regelmæssigt, er reload-bonusser bedst. For spillere, der spiller med eksisterende saldo, er cashback mere værdifuldt.
      </>
    ),
  },
  {
    question: "Hvad er et godt omsætningskrav for en reload bonus?",
    answer: (
      <>
        I Danmark er 10x det lovmæssige maksimum takket være Spillemyndighedens regulering. For reload-bonusser er 3-5x (b) exceptionelt, 5-8x (b) godt, og 10x (d+b) gennemsnitligt. Bemærk forskellen mellem (b) – kun bonus – og (d+b) – indbetaling plus bonus. En 50% reload med 5x (b) kræver kun 1.250 kr. omsætning på en 500 kr. indbetaling, mens 10x (d+b) kræver 7.500 kr. Læs mere om{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav og beregning</Link>.
      </>
    ),
  },
  {
    question: "Kan jeg bruge reload bonus på live casino?",
    answer: (
      <>
        Teknisk set ja, men det er sjældent optimalt. De fleste reload-bonusser har et spilbidrag på 10-20% for{" "}
        <Link to="/live-casino" className={linkClass}>live casino</Link> spil. Det betyder at en 5x omsætning reelt bliver 25-50x for live casino-spillere. Medmindre reload-bonussen specifikt er designet til live casino (sjældent), bør du overveje at bruge den udelukkende på slots og i stedet benytte{" "}
        <Link to="/cashback-bonus" className={linkClass}>cashback</Link> til din live casino-spil.
      </>
    ),
  },
  {
    question: "Hvad sker der hvis jeg ikke opfylder omsætningskravet?",
    answer: "Hvis tidsfristen udløber inden du har opfyldt omsætningskravet, mister du typisk bonusbeløbet og eventuelle gevinster fra bonusspillet. Dine egne indbetalte penge forbliver urørt (medmindre bonussen er sticky). De fleste reload-bonusser har 7-14 dages gyldighed – kortere end velkomstbonusser. Planlæg altid din spiltid så du realistisk kan nå omsætningskravet inden deadline.",
  },
];

const reloadScheduleTypes = [
  {
    icon: Calendar,
    title: "Ugentlig reload (standard)",
    description: "Tilbydes typisk fredag til søndag for at booste weekendspil. Match-procent: 25-50%. Mest udbredt og mest forudsigeligt for budgetplanlægning. Aktiveres ved indbetaling i kampagneperioden. De fleste danske casinoer med kampagneprogrammer tilbyder denne type.",
    tag: "Mest udbredt",
  },
  {
    icon: Sparkles,
    title: "Daglig reload",
    description: "Sjælden men værdifuld – et nyt tilbud hver dag med varierende match-procent og free spins. Kræver daglig login og indbetaling. Bedst for spillere med fleksibelt spillemønster og daglig aktivitet. Matchprocenten er typisk lavere (10-25%) for at kompensere for den høje frekvens.",
    tag: "Sjælden",
  },
  {
    icon: Gift,
    title: "Begivenhedsbaseret reload",
    description: "Ekstra generøse tilbud ved helligdage (jul, nytår, påske), nye spiludgivelser, eller casinoets jubilæum. Ofte 75-100% match – næsten velkomstbonus-niveau. Uforudsigelige men meget værdifulde. Hold øje med casinoets kampagneside og nyhedsbrev for at fange disse tilbud.",
    tag: "Sæsonbestemt",
  },
  {
    icon: Star,
    title: "VIP/personlig reload",
    description: "Skræddersyede tilbud baseret på din spillehistorik og indbetalningsmønster. Højeste match-procent (50-100%), laveste omsætningskrav, og ofte med tilknyttede free spins. Kun tilgængeligt for casinoets mest loyale spillere. Typisk leveret via e-mail eller personlig kontaktperson.",
    tag: "Eksklusivt",
  },
];

const ReloadBonus = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(reloadFaqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Reload Bonus – Komplet Guide til Casino Reload Bonusser 2026",
    description: "Alt om reload bonusser på danske casinoer. Lær hvordan reload fungerer, hvornår de tilbydes, og hvordan du maksimerer din bonusværdi som eksisterende spiller.",
    url: `${SITE_URL}/reload-bonus`,
    datePublished: "2026-02-27",
  });

  const videoJsonLd = buildVideoSchema(`${SITE_URL}/reload-bonus`, "ReM4PBQ30rw", {
    title: "Hvad er en Reload Bonus? – Forklaret på dansk",
    description: "Jonas gennemgår hvad en reload bonus er, hvordan den adskiller sig fra velkomstbonussen, og hvornår den er mest fordelagtig.",
    uploadDate: "2026-03-07",
    duration: "PT1M",
  });

  return (
    <>
      <SEO
        title="Reload Bonus – Bonusser for Eksisterende Spillere 2026 | Casinoaftaler"
        description="Alt om reload bonusser på danske casinoer. Lær hvordan reload fungerer, hvornår de tilbydes, og find de bedste tilbud til eksisterende spillere."
        jsonLd={[faqJsonLd, articleJsonLd, videoJsonLd]}
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
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Reload Bonus på Danske Casinoer
            </h1>
            <p className="text-lg text-white/80">
              Reload-bonusser er velkomstbonussens tilbagevendende fætter – og matematisk ofte mere fordelagtige. Lær hvordan du finder de bedste reload-tilbud og maksimerer din langsigtede bonusværdi.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="niklas" date="18-03-2026" readTime="14 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={reloadHero} alt="Reload bonus – tilbagevendende casinobonus med genopladningssymbol" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvad er en reload bonus?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En reload bonus er casinoets måde at belønne dig for at komme tilbage. Mens{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonussen</Link> er designet til at tiltrække nye spillere, er reload-bonussen skabt til at fastholde eksisterende kunder med tilbagevendende indbetalingsbonusser. Tænk på det som en "velkomstbonus light" – lavere match-procent, men med den afgørende fordel, at du kan tage den igen og igen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I det danske casinomarked tilbyder de fleste operatører ugentlige eller månedlige reload-bonusser som en fast del af deres kampagneprogram. Typisk matcher casinoet din indbetaling med 25-50% op til et bestemt beløb, med{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> der er lavere end velkomstbonussens. Det er denne kombination af gentagelse og favorable vilkår, der gør reload-bonussen til en af de mest undervurderede bonustyper.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Overraskende nok er reload-bonussen matematisk ofte mere fordelagtig end velkomstbonussen, når man beregner den reelle forventede værdi (EV). En reload på 50% match med 3x (b) omsætning har typisk en EV på 85-90% af bonusbeløbet – sammenlignet med velkomstbonussens typiske 60-80%. Grunden er enkel: lavere matchprocent kompenseres af markant lavere omsætningskrav. Brug altid spil med høj <Link to="/ordbog/rtp" className={linkClass}>RTP</Link> til at maksimere din EV.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Reload-bonusser er særligt attraktive for spillere, der allerede har brugt deres velkomstbonus og leder efter løbende fordele. I modsætning til{" "}
            <Link to="/cashback-bonus" className={linkClass}>cashback</Link>, som kun belønner tab, giver reload-bonussen dig ekstra midler uanset om du er foran eller bagud. Det gør den til et proaktivt værktøj i din bonusstrategi, ikke et reaktivt sikkerhedsnet.
          </p>
          <p className="mb-8 text-muted-foreground leading-relaxed">
            For en komplet sammenligning af alle bonustyper, se vores{" "}
            <Link to="/casino-bonus" className={linkClass}>casino bonus hub</Link>. Vil du forstå hvordan{" "}
            <Link to="/cashback-bonus" className={linkClass}>cashback bonus</Link> adskiller sig fra reload, har vi en dedikeret guide.
          </p>
        </section>

        <BonusClusterPriorityLinks currentPath="/reload-bonus" />

        <YoutubeEmbed videoId="ReM4PBQ30rw" title="Hvad er en Reload Bonus? – Forklaret på dansk" description="Jonas gennemgår hvad en reload bonus er og hvordan den fungerer." uploadDate="2026-03-07" duration="PT1M" />
        <VideoContextBox heading="Her gennemgår vores forfatter reload-bonussen">
          <Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> forklarer hvad en reload bonus er, hvordan den adskiller sig fra{" "}
          <Link to="/velkomstbonus" className={linkClass}>velkomstbonussen</Link>, og hvornår den er mest fordelagtig. Videoen er en del af vores{" "}
          <Link to="/casino-bonus" className={linkClass}>casino bonus</Link>-indhold.
        </VideoContextBox>

        {/* Reload-typer */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">De fire typer reload bonus</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Reload-bonusser kommer i flere formater med varierende frekvens, generøsitet og vilkår. At forstå de forskellige typer hjælper dig med at identificere de mest værdifulde tilbud. Her er de fire hovedkategorier:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {reloadScheduleTypes.map((type) => (
              <Card key={type.title}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <type.icon className="h-5 w-5 text-primary" />
                      {type.title}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">{type.tag}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Reload vs. velkomstbonus: Detaljeret sammenligning */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Reload vs. velkomstbonus: Hvornår er reload bedre?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det virker kontraintuitivt, at en bonus med lavere matchprocent kan være mere værdifuld. Men når du ser bag tallene, bliver billedet klart. Nøglen ligger i omsætningskravenes struktur:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Parameter</th>
                  <th className="px-4 py-3 text-left font-semibold">Velkomstbonus</th>
                  <th className="px-4 py-3 text-left font-semibold">Reload bonus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3 font-semibold">Match-procent</td>
                  <td className="px-4 py-3">100%</td>
                  <td className="px-4 py-3">25-50%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Omsætning (typisk)</td>
                  <td className="px-4 py-3">10x (d+b)</td>
                  <td className="px-4 py-3 text-primary font-semibold">3-5x (b)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Omsætningsbeløb (500 kr. indbetaling)</td>
                  <td className="px-4 py-3">10.000 kr.</td>
                  <td className="px-4 py-3 text-primary font-semibold">750-1.250 kr.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Forventet tab under omsætning</td>
                  <td className="px-4 py-3">400 kr.</td>
                  <td className="px-4 py-3 text-primary font-semibold">30-50 kr.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Reel EV</td>
                  <td className="px-4 py-3">100 kr. (20%)</td>
                  <td className="px-4 py-3 text-primary font-semibold">200-220 kr. (80-88%)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Frekvens</td>
                  <td className="px-4 py-3">1 gang</td>
                  <td className="px-4 py-3 text-primary font-semibold">Ugentligt/månedligt</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Tabellen viser tydeligt, at reload-bonussens lavere bonusbeløb mere end kompenseres af de favorable omsætningskrav. Nøglen er forskellen mellem (d+b) og (b): velkomstbonussen kræver at du omsætter BÅDE din indbetaling og bonus, mens reload kun kræver omsætning af bonusbeløbet. Det reducerer det samlede omsætningsbeløb med op til 90%.
          </p>
        </section>

        {/* EV-analyse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Reload bonus EV-analyse: Matematikken bag den reelle værdi</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Lad os køre tre konkrete beregninger for at demonstrere, hvordan reload-bonussens EV varierer baseret på vilkårene:
          </p>
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="border-primary/30 bg-accent/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Fremragende reload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground font-mono">
                <p>Match: 50%, Oms: 3x (b)</p>
                <p>Indbetaling: 500 kr.</p>
                <p>Bonus: 250 kr.</p>
                <p>Omsætning: 750 kr.</p>
                <p>Forventet tab: 30 kr.</p>
                <p className="text-primary font-semibold">EV = 220 kr. (88%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  God reload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground font-mono">
                <p>Match: 50%, Oms: 5x (b)</p>
                <p>Indbetaling: 500 kr.</p>
                <p>Bonus: 250 kr.</p>
                <p>Omsætning: 1.250 kr.</p>
                <p>Forventet tab: 50 kr.</p>
                <p className="font-semibold">EV = 200 kr. (80%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Dårlig reload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground font-mono">
                <p>Match: 25%, Oms: 10x (d+b)</p>
                <p>Indbetaling: 500 kr.</p>
                <p>Bonus: 125 kr.</p>
                <p>Omsætning: 6.250 kr.</p>
                <p>Forventet tab: 250 kr.</p>
                <p className="text-destructive font-semibold">EV = -125 kr. (negativ!)</p>
              </CardContent>
            </Card>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Eksemplerne illustrerer en kritisk pointe: ikke alle reload-bonusser er værd at tage. Den tredje mulighed har faktisk negativ EV – du taber mere på omsætningen end bonussen er værd. Det skyldes kombinationen af lav match-procent (25%) og høj omsætning baseret på både indbetaling og bonus (d+b). Beregn ALTID den forventede værdi inden du accepterer et reload-tilbud.
          </p>
          <Card className="mb-6 border-primary/30 bg-accent/30">
            <CardContent className="p-5">
              <h3 className="mb-3 text-lg font-semibold flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Hurtig EV-formel for reload bonus
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground font-mono">
                <p>EV = Bonusbeløb − (Total omsætning × House Edge)</p>
                <p>For (b): Total omsætning = Bonus × Omsætningskrav</p>
                <p>For (d+b): Total omsætning = (Indbetaling + Bonus) × Omsætningskrav</p>
              </div>
              <Separator className="my-3" />
              <p className="text-sm text-muted-foreground">
                <strong>Tommelfingerregel:</strong> Accepter kun reloads hvor EV &gt; 50% af bonusbeløbet. Under dette niveau er din tid og bankroll-risiko sjældent det værd.
              </p>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed">
            Vores{" "}
            <Link to="/omsaetningskrav" className={linkClass}>guide til omsætningskrav</Link> viser dig præcis hvordan du beregner EV for ethvert bonustilbud – ikke kun reload.
          </p>
        </section>

        {/* 3-måneders EV scenario */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">3-måneders værdi-analyse: Reload vs. kun velkomstbonus</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at illustrere reload-bonussens langsigtede potentiale, lad os sammenligne to spillere over 3 måneder med identisk budget og spillemønster:
          </p>
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Spiller A: Kun velkomstbonus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>Velkomstbonus EV: +300 kr.</p>
                <p>Reload-bonusser: 0 kr. (ignorerer tilbud)</p>
                <p>Cashback: 0 kr.</p>
                <p className="font-semibold border-t border-border pt-2 mt-2">Samlet 3-måneders bonus-EV: +300 kr.</p>
              </CardContent>
            </Card>
            <Card className="border-primary/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-primary">Spiller B: Velkomst + ugentlig reload</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>Velkomstbonus EV: +300 kr.</p>
                <p>Reload-bonusser (12 uger × 150 kr.): +1.800 kr.</p>
                <p><Link to="/cashback-bonus" className={linkClass}>Cashback</Link> (supplerende): +200 kr.</p>
                <p className="font-semibold text-primary border-t border-border pt-2 mt-2">Samlet 3-måneders bonus-EV: +2.300 kr.</p>
              </CardContent>
            </Card>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Forskellen er dramatisk: Spiller B, der konsekvent udnytter reload-bonusser, genererer 7,7x mere bonusværdi over 3 måneder. Det er vigtigt at pointere, at dette kræver disciplin – du skal beregne EV for hvert tilbud og kun acceptere positive tilbud. Blindt at tage alle bonusser er ikke en strategi.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Ekstrapoleret til et helt år med ugentlige reloads og supplerende{" "}
            <Link to="/cashback-bonus" className={linkClass}>cashback</Link>, kan den samlede bonusværdi realistisk nå 8.000-10.000 kr. for en disciplineret spiller. Det kræver dog, at du aktivt søger de bedste tilbud og ikke bare accepterer det første, du ser.
          </p>
        </section>

        {/* Strategisk brug */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Strategisk brug af reload bonusser</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Med den rette tilgang kan reload-bonusser blive din mest konsistente kilde til bonusværdi fra casinoer. Her er de mest effektive strategier:
          </p>
          <div className="space-y-4">
            {[
              {
                icon: Calendar,
                title: "Synkroniser indbetalinger med kampagnekalenderen",
                desc: "De fleste casinoer kører reload-kampagner fredag-søndag. I stedet for at indbetale tilfældigt, saml dine indbetalinger til kampagneperioderne. En enkelt 500 kr. indbetaling med 50% reload er langt mere værdifuld end tre tilfældige indbetalinger á 200 kr. uden bonus. Opret en påmindelse i din kalender for at tjekke kampagnesiden ugentligt.",
              },
              {
                icon: Calculator,
                title: "Beregn break-even point for hvert tilbud",
                desc: "Accepter kun reload-bonusser med positiv forventet værdi. Tommelfingerregel: Hvis EV > 50% af bonusbeløbet, er tilbuddet værd at tage. Under dette niveau bruger du tid og bankroll-risiko på minimal gevinst. Brug vores EV-formel: EV = Bonus − (Omsætning × 0,04).",
              },
              {
                icon: TrendingUp,
                title: "Kombinér med VIP-progression",
                desc: "Mange casinoer giver bedre reload-vilkår jo højere dit VIP-niveau er. Omsætning fra reload-bonus tæller typisk mod VIP-progression. Strategien er at starte med standard-reloads og gradvist opbygge VIP-status for at låse op for bedre tilbud. Over 6-12 måneder kan VIP-reload-bonusser nå 75-100% match med 3x omsætning.",
              },
              {
                icon: ShieldCheck,
                title: "Brug no-sticky logik til reload",
                desc: (
                  <>
                    Tjek om casinoets reload-bonus er{" "}
                    <Link to="/no-sticky-bonus" className={linkClass}>no-sticky</Link> eller{" "}
                    <Link to="/sticky-bonus" className={linkClass}>sticky</Link>. No-sticky reload er den hellige gral: du spiller med egne penge først, og bonuspengene aktiveres kun hvis du taber. Det giver dig fuld fleksibilitet til at hæve gevinster fra dine egne penge uden omsætningskrav.
                  </>
                ),
              },
              {
                icon: Wallet,
                title: "Bankroll management med reload-bonusser",
                desc: "Allokér et separat 'reload-budget' i dit månedlige spillebudget. Hvis du har 2.000 kr. månedligt, sæt 500 kr. til side specifikt til reload-indbetalinger. På den måde udnytter du bonusserne uden at overskride dit samlede budget. Reload-bonusser bør aldrig være en grund til at øge din samlede spileksponering.",
              },
              {
                icon: BarChart3,
                title: "Multi-casino reload-strategi",
                desc: "De mest optimerede spillere har konti hos 3-4 casinoer og vælger det bedste reload-tilbud hver uge. Casino A tilbyder måske 50% fredag, Casino B 40% lørdag med bedre omsætning. Ved at diversificere fanger du de bedste tilbud konsekvent. Husk: alle casinoer skal have dansk licens fra Spillemyndigheden.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border p-4">
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{typeof item.desc === 'string' ? item.desc : item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tjekliste */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">7-trins tjekliste: Evaluer enhver reload bonus</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Brug denne checkliste hver gang du modtager et reload-tilbud. De fleste spillere vurderer kun match-procenten – men de resterende punkter afgør om bonussen reelt er profitabel:
          </p>
          <div className="space-y-3">
            {[
              { icon: Percent, title: "Trin 1: Match-procent og maksbeløb", desc: "25% er lavt, 50% er standard, 75%+ er exceptionelt (typisk sæsonbestemt). Tjek det maksimale bonusbeløb – en 50% match op til 500 kr. kræver 1.000 kr. indbetaling for fuld udnyttelse. Indbetal altid det beløb der udløser den fulde bonus." },
              { icon: Calculator, title: "Trin 2: Omsætningskrav – (b) eller (d+b)?", desc: "Dette er den vigtigste variabel. 5x (b) på 250 kr. bonus = 1.250 kr. omsætning. 10x (d+b) på 500 kr. indbetaling + 250 kr. bonus = 7.500 kr. omsætning. Forskellen er 6x i krævende omsætning. Vælg altid (b) over (d+b) når muligt." },
              { icon: Clock, title: "Trin 3: Tidsramme for omsætning", desc: "De fleste reload-bonusser har 7-14 dages gyldighed – kortere end velkomstbonusser. Med 1.250 kr. omsætning og 10 kr. bet-størrelse er det 125 spins – overkommeligt. Med 7.500 kr. er det 750 spins og kræver dagligt spil. Beregn om du realistisk kan nå det." },
              { icon: Target, title: "Trin 4: Aktiver KUN med positiv EV", desc: "Beregn: EV = Bonusbeløb – (Omsætning × House Edge). Hvis resultatet er under 50% af bonusbeløbet, spring tilbuddet over. Din tid er mere værd end en bonus med minimal EV." },
              { icon: ShieldCheck, title: "Trin 5: Tjek bonusstruktur (sticky/no-sticky)", desc: "No-sticky reload er sjælden men markant mere værdifuld. Med no-sticky spiller du med egne penge først og kan hæve gevinster frit. Sticky reload kræver gennemspilning af hele omsætningskravet før udbetaling." },
              { icon: BookOpen, title: "Trin 6: Spilbidrag og begrænsninger", desc: "Slots bidrager typisk 100%, men live casino kun 10-20%. Hvis du planlægger at spille bordspil med din reload, ganges det effektive omsætningskrav med 5-10x. Tjek også om specifikke spil er udelukket – nogle casinoer forbyder high-RTP slots under bonusomsætning." },
              { icon: Scale, title: "Trin 7: Sammenlign med cashback-alternativet", desc: (
                <>
                  Inden du accepterer en reload, tjek om casinoets{" "}
                  <Link to="/cashback-bonus" className={linkClass}>cashback-program</Link> giver bedre EV for dit spillevolumen. For spillere der primært spiller bordspil eller har lavt budget, er cashback ofte det bedre valg. For slot-spillere med medium budget er reload typisk overlegen.
                </>
              ) },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-primary/30 bg-accent/30 p-4">
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{typeof item.desc === 'string' ? item.desc : item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Almindelige fejl */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">5 almindelige fejl med reload bonus</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Selv erfarne bonusjægere laver fejl med reload-bonusser. Her er de hyppigste faldgruber og hvordan du undgår dem:
          </p>
          <div className="space-y-4">
            {[
              {
                icon: AlertTriangle,
                title: "Fejl 1: At tage ALLE reload-tilbud uden at beregne EV",
                desc: "Ikke alle reloads er positive. En 25% match med 10x (d+b) har ofte negativ EV – du taber mere under omsætningen end bonussen er værd. Beregn altid EV først. Kun fordi det er gratis at tilmelde sig, er det ikke gratis at spille igennem.",
              },
              {
                icon: AlertTriangle,
                title: "Fejl 2: At indbetale mere end planlagt for at 'udnytte' bonussen fuldt",
                desc: "Hvis du normalt indbetaler 300 kr. men reload-bonussen matcher op til 1.000 kr., bør du IKKE øge din indbetaling til 1.000 kr. Hold dig til dit budget. En delvis reload på 300 kr. med 150 kr. bonus er bedre end at strække dit budget for 500 kr. ekstra bonus.",
              },
              {
                icon: AlertTriangle,
                title: "Fejl 3: At ignorere tidsfristen",
                desc: "Reload-bonusser har typisk 7-14 dages gyldighed. Hvis du ikke realistisk kan nå omsætningskravet inden deadline, mister du bonussen OG eventuelle gevinster. Bedre at springe over end at miste alt. Planlæg din spiltid inden du accepterer.",
              },
              {
                icon: AlertTriangle,
                title: "Fejl 4: At spille bordspil med slot-reload",
                desc: "En reload med 5x (b) omsætning virker attraktiv – men med 10% spilbidrag på Blackjack bliver det reelt 50x. Det ændrer bonussen fra excellent til katastrofal. Brug altid slots til reload-omsætning, medmindre tilbuddet specifikt er designet til bordspil.",
              },
              {
                icon: AlertTriangle,
                title: "Fejl 5: At glemme at sammenligne med cashback",
                desc: (
                  <>
                    Nogle uger er{" "}
                    <Link to="/cashback-bonus" className={linkClass}>cashback</Link> det bedre valg. Hvis du har en dårlig uge med tab, kan cashback returnere mere end reload-bonussens EV. De smarteste spillere veksler mellem reload og cashback baseret på hvad der giver mest værdi i den givne uge.
                  </>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border p-4">
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{typeof item.desc === 'string' ? item.desc : item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reload under Spillemyndigheden */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Reload bonus under dansk regulering</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spillemyndighedens regulering påvirker reload-bonusser positivt for danske spillere. Det maksimale omsætningskrav er 10x – betydeligt lavere end i uregulerede markeder, hvor 30-50x er normalt. Det betyder at selv "gennemsnitlige" reload-tilbud i Danmark er bedre end premium-tilbud i mange andre lande.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Derudover kræver dansk regulering, at casinoerne tydeligt kommunikerer alle bonusvilkår inden accept. Du skal altid kunne se match-procent, omsætningskrav, gyldighed og spilbidrag FØR du accepterer en reload. Casinoer der skjuler vilkår risikerer sanktioner fra Spillemyndigheden.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vi anbefaler kun casinoer med gyldig dansk licens. Se vores{" "}
            <Link to="/casinoer" className={linkClass}>casinooversigt</Link> for licenserede operatører med stærke reload-programmer, eller besøg{" "}
            <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link> for de seneste tilkomne med konkurrencedygtige kampagnetilbud.
          </p>
        </section>

        <InlineCasinoCards
          title="Casinoer med de bedste reload-bonusser"
        />

        <Separator className="my-10" />

        <AuthorBio author="niklas" />

        <Separator className="my-10" />

        <LatestNewsByCategory pagePath="/reload-bonus" />
        <BonusMoneyLinks currentPath="/reload-bonus" />
        <RelatedGuides currentPath="/reload-bonus" />

        <FAQSection title="Ofte stillede spørgsmål om reload bonus" faqs={reloadFaqs} />
      </div>
      <StickyCtaBySlug slug="campobet" />
    </>
  );
};

export default ReloadBonus;
