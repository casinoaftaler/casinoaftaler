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
import cashbackHero from "@/assets/heroes/cashback-bonus-hero.jpg";
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
  BarChart3,
  CheckCircle2,
  Percent,
  Wallet,
  Users,
  Zap,
  BookOpen,
  Gift,
  Star,
  Coins,
  Scale,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const linkClass = "text-primary underline hover:text-primary/80";

const cashbackFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er en cashback bonus på et dansk casino?",
    answer: (
      <>
        En cashback bonus returnerer en procentdel af dine nettotab over en bestemt periode – typisk 5-15% ugentligt eller månedligt. I modsætning til en{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link>, der gives ved indbetaling, aktiveres cashback kun når du har haft tab. Det gør cashback til den mest forudsigelige og gennemsigtige bonustype, da du præcist ved hvad du får tilbage.
      </>
    ),
  },
  {
    question: "Har cashback bonusser omsætningskrav?",
    answer: (
      <>
        Det varierer. De bedste cashback-tilbud på danske casinoer udbetales som kontanter uden{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> – du kan hæve pengene med det samme. Andre casinoer giver cashback som bonuspenge med omsætningskrav (typisk 1-5x). Tjek altid vilkårene: "kontant cashback" eller "real money cashback" betyder omsætningsfrit, mens "bonus cashback" indebærer krav.
      </>
    ),
  },
  {
    question: "Hvornår udbetales cashback – dagligt, ugentligt eller månedligt?",
    answer: "Frekvensen varierer mellem casinoer. De fleste danske casinoer krediterer cashback ugentligt (typisk mandag morgen baseret på foregående uges tab). Nogle tilbyder daglig cashback (sjældent, men mest fordelagtigt for spilleren), mens VIP-programmer ofte opererer med månedlig cashback med højere procentdel. Daglig cashback giver den bedste cash-flow-fordel, da du hurtigt kan geninvestere.",
  },
  {
    question: "Er cashback bedre end en matchbonus?",
    answer: (
      <>
        For aktive spillere med større budgetter er cashback ofte mere værdifuld end en{" "}
        <Link to="/indskudsbonus" className={linkClass}>indskudsbonus</Link>. En 10% cashback uden omsætningskrav har en reel værdi på 100%, mens en 100% matchbonus med 10x omsætning typisk kun har 60-80% reel værdi. Cashback er også tilbagevendende, mens velkomstbonussen er en engangsforeteelse. For nye spillere med lavt budget er matchbonussen dog bedre, da den giver umiddelbar spillekapital.
      </>
    ),
  },
  {
    question: "Kan jeg kombinere cashback med andre bonusser?",
    answer: "Generelt nej – de fleste casinoer beregner kun cashback på tab fra spil med rigtige penge, ikke bonuspenge. Hvis du spiller med en aktiv bonus, tæller tabene typisk ikke mod cashback-beregningen. Strategien er derfor at bruge cashback i perioder uden aktive bonusser, og velkomstbonusser/reload-bonusser når de tilbydes. Nogle VIP-programmer kombinerer dog cashback med andre fordele som free spins og personlige tilbud.",
  },
  {
    question: "Hvad er forskellen på cashback og insurance bonus?",
    answer: (
      <>
        De ligner hinanden, men der er en vigtig forskel. Cashback beregnes på dit samlede nettotab over en periode (fx en uge). Insurance bonus dækker typisk kun din første indbetaling/session – taber du det hele, får du en procentdel tilbage. Insurance er mere begrænset men kan være gavnligt for nye spillere, der vil reducere risikoen ved deres første oplevelse. For langsigtede spillere er løbende cashback langt mere værdifuldt.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på cashback og reload bonus?",
    answer: (
      <>
        <Link to="/reload-bonus" className={linkClass}>Reload bonus</Link> gives ved indbetaling uanset om du vinder eller taber, mens cashback kun aktiveres ved tab. Reload kræver en aktiv handling (indbetaling) og har typisk omsætningskrav. Cashback er passiv – du gør ingenting, og pengene krediteres automatisk. For spillere der indbetaler regelmæssigt er reload-bonus ideel. For spillere der foretrækker at spille med eksisterende saldo er cashback bedre.
      </>
    ),
  },
  {
    question: "Tæller bordspil og live casino med i cashback?",
    answer: (
      <>
        Det varierer markant. De fleste cashback-programmer dækker slots 100%, men{" "}
        <Link to="/live-casino" className={linkClass}>live casino</Link> og bordspil bidrager ofte kun med 10-50%. Nogle casinoer udelukker helt bordspil fra cashback-beregningen. Tjek altid vilkårene for dit foretrukne spiltype – det kan betyde forskellen mellem et godt og et dårligt cashback-tilbud.
      </>
    ),
  },
];

const cashbackTypes = [
  {
    icon: Wallet,
    title: "Kontant cashback (omsætningsfri)",
    description: "Den mest værdifulde type. Dine tab returneres som rigtige penge uden omsætningskrav. Du kan hæve beløbet med det samme eller spille videre. Reel værdi: 100% af det returnerede beløb. Typisk 5-10% hos de bedste danske casinoer.",
    tag: "Bedst",
  },
  {
    icon: RefreshCw,
    title: "Bonus cashback (med omsætning)",
    description: "Tab returneres som bonuspenge med omsætningskrav – typisk 1-5x. Lavere reel værdi end kontant cashback, men stadig fordelagtigt med lave krav. Reel værdi: 70-95% afhængigt af omsætningskravet. Den mest udbredte type på det danske marked.",
    tag: "Almindelig",
  },
  {
    icon: Sparkles,
    title: "VIP/Loyalty cashback",
    description: "Højere procentdel (10-20%) forbeholdt casinoets mest aktive spillere. Ofte kombineret med personlig kontaktperson, hurtigere udbetalinger og eksklusive kampagner. Typisk omsætningsfri. Kræver generelt 50.000+ kr. i månedlig omsætning for at kvalificere.",
    tag: "Premium",
  },
  {
    icon: ShieldCheck,
    title: "Insurance/forsikringsbonus",
    description: "Engangscashback på din første indbetaling eller session. Taber du det hele, returneres 50-100% af tabet. Sjældent tilbagevendende, men god risikoreduktion for nye spillere. Ofte brugt som supplement til velkomstbonussen hos danske casinoer.",
    tag: "Engangs",
  },
];

const CashbackBonus = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(cashbackFaqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Cashback Bonus – Komplet Guide til Casino Cashback 2026",
    description: "Alt om cashback bonusser på danske casinoer. Lær hvordan cashback fungerer, hvilke typer der findes, og hvordan du maksimerer din tilbagebetaling.",
    url: `${SITE_URL}/cashback-bonus`,
    datePublished: "2026-02-27",
    dateModified: "2026-03-18",
  });

  const videoJsonLd = buildVideoSchema(`${SITE_URL}/cashback-bonus`, "epl204siMF0", {
    title: "Hvad er en Cashback-Bonus? – Forklaret på dansk",
    description: "Jonas gennemgår hvad en cashback bonus er, hvordan den fungerer, og hvornår den er mere fordelagtig end en matchbonus.",
    uploadDate: "2026-03-07",
    duration: "PT1M12S",
  });

  return (
    <>
      <SEO
        title="Cashback Bonus – Få Penge Tilbage fra Dit Casino 2026 | Casinoaftaler"
        description="Alt om cashback bonusser på danske casinoer. Lær hvordan cashback fungerer, hvilke typer der findes, og find de bedste cashback-tilbud i Danmark."
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
              <BarChart3 className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Marts 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Cashback Bonus på Danske Casinoer
            </h1>
            <p className="text-lg text-white/80">
              Cashback returnerer en procentdel af dine tab – den mest gennemsigtige og forudsigelige bonustype. Lær hvordan du vælger det bedste cashback-tilbud og maksimerer din tilbagebetaling.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="niklas" date="27-02-2026" readTime="16 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={cashbackHero} alt="Cashback bonus – casino chips der returneres til spilleren" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvad er en cashback bonus?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Cashback er den eneste bonustype, der belønner dig for at tabe. I stedet for at lokke med store matchbonusser ved indbetaling, returnerer casinoet en procentdel af dine nettotab – typisk 5-15% – over en bestemt periode. Det er et sikkerhedsnet, der reducerer din reelle <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> og giver dig en anden chance, når heldet ikke er med dig.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For den matematisk orienterede spiller er cashback den mest gennemsigtige bonustype. Du ved præcis hvad du får: Taber du 1.000 kr. med 10% cashback, modtager du 100 kr. tilbage. Ingen skjulte vilkår, ingen komplicerede{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> at navigere – i hvert fald hos de bedste tilbud. Det adskiller sig markant fra en{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link>, hvor den reelle værdi først kan beregnes efter analyse af omsætningskrav, bonusstruktur og gyldighedsperiode.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Cashback er især populært blandt erfarne spillere, der prioriterer langsigtede fordele over enkeltstående bonusser. Mens{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonussen</Link> er en engangsforeteelse, er cashback et tilbagevendende tilbud, der akkumulerer værdi over tid. En spiller med 50.000 kr. i månedlig omsætning og 10% cashback kan realistisk forvente 200-400 kr. tilbage månedligt – uden at gøre noget aktivt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I det regulerede danske marked under Spillemyndigheden er cashback-programmer velstrukturerede og gennemsigtige. Casinoerne skal tydeligt kommunikere vilkårene, herunder beregningsmetode, udbetalingsfrekvens og eventuelle omsætningskrav. Det gør det lettere for dig som spiller at sammenligne tilbud og vælge det mest fordelagtige program for din spillestil.
          </p>
          <p className="mb-8 text-muted-foreground leading-relaxed">
            For en komplet oversigt over alle bonustyper, se vores{" "}
            <Link to="/casino-bonus" className={linkClass}>casino bonus guide</Link>, der sammenligner cashback med matchbonusser, free spins og andre tilbud. Vil du forstå forskellen mellem cashback og{" "}
            <Link to="/reload-bonus" className={linkClass}>reload bonus</Link>, har vi en dedikeret guide til det.
          </p>
        </section>

        <YoutubeEmbed videoId="epl204siMF0" title="Hvad er en Cashback-Bonus? – Forklaret på dansk" description="Jonas gennemgår hvad en cashback bonus er og hvordan den fungerer." uploadDate="2026-03-07" duration="PT1M12S" />
        <VideoContextBox heading="Her gennemgår vores forfatter cashback-bonussen">
          <Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> forklarer hvad en cashback bonus er, hvordan den beregnes, og hvornår den er mere fordelagtig end en{" "}
          <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link>. Videoen er en del af vores{" "}
          <Link to="/casino-bonus" className={linkClass}>casino bonus</Link>-indhold.
        </VideoContextBox>

        {/* Cashback typer */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">De fire typer cashback bonus</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Ikke al cashback er skabt ens. Den reelle værdi varierer enormt afhængigt af om pengene returneres som kontanter eller bonuspenge, og om det er et engangstilbud eller løbende program. Her er de fire hovedtyper du møder på danske casinoer:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {cashbackTypes.map((type) => (
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

        {/* Sådan beregnes cashback */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sådan beregnes cashback: Nettotab vs. bruttotab</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En af de vigtigste forskelle mellem cashback-tilbud handler om beregningsmetoden. De to primære metoder – nettotab og bruttotab – giver markant forskellige resultater:
          </p>
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card className="border-primary/30 bg-accent/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Nettotab (mest fordelagtigt)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Beregnes som: Total indbetaling − saldo ved periodens slutning.</p>
                <p><strong>Eksempel:</strong> Du indbetaler 5.000 kr., har omsætning for 50.000 kr. og har 3.500 kr. i saldo ved ugens slutning.</p>
                <p>Nettotab = 5.000 − 3.500 = 1.500 kr.</p>
                <p className="text-primary font-semibold">10% cashback = 150 kr.</p>
                <p>Denne metode tager højde for gevinster undervejs – du betaler kun cashback på det, du faktisk har mistet.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Bruttotab (mindre fordelagtigt)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Beregnes som: Summen af alle tabende indsatser, uanset gevinster.</p>
                <p><strong>Eksempel:</strong> Du laver 500 spins á 100 kr. Du taber 300 og vinder 200 spins.</p>
                <p>Bruttotab = 300 × 100 = 30.000 kr. (ignorerer dine gevinster).</p>
                <p className="font-semibold">10% cashback = 3.000 kr. – men det lyder bedre end det er.</p>
                <p>Denne metode kan virke generøs, men casinoerne kompenserer med lavere procent (2-3%).</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Konklusion:</strong> Nettotab-cashback med høj procentdel (8-15%) er næsten altid bedre end bruttotab-cashback med lav procentdel (2-5%). Spørg altid casinoet: "Beregnes cashback på nettotab eller bruttotab?" – det er den vigtigste variabel efter omsætningskravet.
          </p>
        </section>

        {/* EV-analyse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Cashback EV-analyse: Hvad er din reelle tilbagebetaling?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Cashback er den bonustype, der lettest lader sig kvantificere matematisk. Formlen er simpel, men implikationerne er dybe. Lad os gennemgå den komplette EV-beregning:
          </p>
          <Card className="mb-6 border-primary/30 bg-accent/30">
            <CardContent className="p-5">
              <h3 className="mb-3 text-lg font-semibold flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Cashback EV-formel
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground font-mono">
                <p>Forventet tab = Total omsætning × House Edge</p>
                <p>Cashback returbeløb = Forventet tab × Cashback %</p>
                <p>Effektiv House Edge = House Edge × (1 - Cashback %)</p>
                <p>Effektiv RTP = 100% - Effektiv House Edge</p>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Eksempel 1 – Slots med 10% cashback:</strong></p>
                <p>Du omsætter 50.000 kr. på slots med 96% RTP (4% house edge).</p>
                <p>Forventet tab: 50.000 × 0,04 = 2.000 kr.</p>
                <p>Med 10% cashback: 2.000 × 0,10 = 200 kr. tilbage.</p>
                <p>Din effektive house edge reduceres fra 4,0% til 3,6%.</p>
                <p className="text-primary font-semibold">Effektiv RTP stiger fra 96,0% til 96,4%.</p>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Eksempel 2 – Live casino med 15% VIP cashback:</strong></p>
                <p>Du omsætter 200.000 kr. på Blackjack med 99,5% RTP (0,5% house edge).</p>
                <p>Forventet tab: 200.000 × 0,005 = 1.000 kr.</p>
                <p>Med 15% cashback: 1.000 × 0,15 = 150 kr. tilbage.</p>
                <p className="text-primary font-semibold">Effektiv house edge: 0,425% – næsten break-even!</p>
              </div>
            </CardContent>
          </Card>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sammenlign dette med en typisk{" "}
            <Link to="/indskudsbonus" className={linkClass}>indskudsbonus</Link> på 500 kr. med 10x (d+b) omsætning: Du skal omsætte 10.000 kr. og forventer at tabe 400 kr. under omsætningen. Reel værdi: 100 kr. (20% af bonusbeløbet). Cashback giver altid 100% reel værdi ved kontant udbetaling – ingen omsætning, ingen devaluering.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Vigtig nuance:</strong> Cashback belønner kun tab, ikke omsætning. Jo mere du taber, jo mere cashback modtager du – men det gør det ikke til en vinderstrategi. Cashback reducerer blot din downside og bør ses som et supplement til ansvarligt spil, ikke en grund til at øge dine indsatser. Læs mere om{" "}
            <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
          </p>
        </section>

        {/* 6-måneders cashback simulering */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">6-måneders cashback-simulering: Den langsigtede værdi</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Cashbacks sande styrke viser sig over tid. Lad os simulere to identiske spillere over 6 måneder med et budget på 2.000 kr. månedligt:
          </p>
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Spiller A: Ingen cashback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>Månedlig omsætning: ~25.000 kr.</p>
                <p>Forventet tab pr. måned: 1.000 kr. (4% HE)</p>
                <p>Cashback: 0 kr.</p>
                <p>Tab over 6 måneder: -6.000 kr.</p>
                <p className="font-semibold border-t border-border pt-2 mt-2">Netto position efter 6 mdr.: -6.000 kr.</p>
              </CardContent>
            </Card>
            <Card className="border-primary/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-primary">Spiller B: 10% kontant cashback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>Månedlig omsætning: ~25.000 kr.</p>
                <p>Forventet tab pr. måned: 1.000 kr. (4% HE)</p>
                <p>Cashback pr. måned: 100 kr.</p>
                <p>Tab over 6 måneder: -6.000 kr.</p>
                <p>Total cashback: +600 kr.</p>
                <p className="font-semibold text-primary border-t border-border pt-2 mt-2">Netto position efter 6 mdr.: -5.400 kr. (sparer 10%)</p>
              </CardContent>
            </Card>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            600 kr. lyder måske beskedent, men husk: dette er garanterede penge uanset dine resultater. Ingen omsætningskrav, ingen betingelser. Over et helt år akkumulerer det til 1.200 kr. – nok til at finansiere et par ekstra spilsessioner. For spillere med højere volumen (100.000+ kr. månedligt) kan cashback realistisk returnere 4.000-8.000 kr. årligt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Kombinerer du cashback med strategisk brug af{" "}
            <Link to="/reload-bonus" className={linkClass}>reload-bonusser</Link> i perioder uden cashback-dækning, kan den samlede bonusværdi let overstige 5.000 kr. årligt for en gennemsnitlig aktiv spiller. Det kræver blot, at du vælger det rigtige casino med de bedste cashback-vilkår.
          </p>
        </section>

        {/* Strategiske overvejelser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Strategisk brug af cashback bonus</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Cashback er ikke bare en passiv bonus – med den rette tilgang kan du optimere din spillestrategi markant. Her er de vigtigste overvejelser for at maksimere din cashback-værdi:
          </p>
          <div className="space-y-4">
            {[
              {
                icon: Target,
                title: "Vælg høj-RTP slots under cashback-perioder",
                desc: "Kombinationen af høj RTP (96%+) og cashback reducerer din effektive house edge til under 3%. Slots som Starburst (96,09%), Blood Suckers (98,00%) og Mega Joker (99,00%) er ideelle valg. Jo lavere house edge, jo sjældnere trigges din cashback – men den reelle besparelse pr. omsætningskrone er større.",
              },
              {
                icon: Clock,
                title: "Timing er alt: Spil med cashback, ikke mod den",
                desc: "Koncentrer dit spil i perioder, hvor cashback er aktiv. Mange casinoer beregner cashback fra mandag til søndag med udbetaling mandag. Hvis du normalt spreder dit spil over måneden, kan det betale sig at koncentrere det inden for cashback-perioderne for at maksimere returbeløbet. Tjek din casinokalender ugentligt.",
              },
              {
                icon: BarChart3,
                title: "Cashback + volatilitetsstrategi",
                desc: "Cashback reducerer risikoen ved højvolatile slots. Normalt frarådes high-volatility spil under bonusomsætning – men med cashback er risikoprofilen anderledes. Tab fra en Nolimit City-session returneres delvist, mens store gevinster beholdes fuldt ud. Det giver en asymmetrisk risk/reward-profil til din fordel.",
              },
              {
                icon: Scale,
                title: "Kombiner med no-sticky velkomstbonus",
                desc: (
                  <>
                    De smarteste spillere bruger{" "}
                    <Link to="/no-sticky-bonus" className={linkClass}>no-sticky velkomstbonus</Link> ved første indbetaling og skifter derefter til cashback-fokus. No-sticky giver dig en risikofri start (du spiller med egne penge først), mens cashback sikrer langsigtede fordele. Denne to-trins strategi optimerer både kortsigtet og langsigtet EV.
                  </>
                ),
              },
              {
                icon: AlertTriangle,
                title: "Undgå 'tab-jagt' – cashback er ikke en vinderstrategi",
                desc: "Den største fælde med cashback er at bruge den som undskyldning for at øge indsatserne. 10% cashback betyder stadig 90% tab. Hold dit budget uændret og betragt cashback som en positiv overraskelse, ikke en forventning. Sæt altid dit tabslimit FØR du overvejer cashback-effekten.",
              },
              {
                icon: Coins,
                title: "Geninvestér cashback eller hæv den?",
                desc: "Kontant cashback kan enten hæves eller spilles videre. Matematisk set er det optimalt at hæve – du har allerede 'betalt' for cashbacken via dine tab. Men hvis dit bankroll management tillader det, kan geninvestering af cashback i spilsessioner med positiv EV-bonus være strategisk. Nøglen er disciplin: sæt en fast regel og følg den.",
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

        {/* Cashback vs andre bonustyper */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Cashback vs. andre bonustyper: Komplet sammenligning</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            For at forstå cashbacks reelle værdi skal vi sammenligne den med de øvrige bonustyper i det danske casinolandskab. Tabellen nedenfor viser de vigtigste forskelle i vilkår, reel værdi og ideel spilleprofil:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Bonustype</th>
                  <th className="px-4 py-3 text-left font-semibold">Typisk tilbud</th>
                  <th className="px-4 py-3 text-left font-semibold">Omsætningskrav</th>
                  <th className="px-4 py-3 text-left font-semibold">Reel EV (%)</th>
                  <th className="px-4 py-3 text-left font-semibold">Frekvens</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="bg-primary/5">
                  <td className="px-4 py-3 font-semibold">Cashback (kontant)</td>
                  <td className="px-4 py-3">5-15% af tab</td>
                  <td className="px-4 py-3 text-primary font-semibold">Ingen</td>
                  <td className="px-4 py-3 text-primary font-semibold">100%</td>
                  <td className="px-4 py-3">Ugentligt/månedligt</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Cashback (bonus)</td>
                  <td className="px-4 py-3">5-15% af tab</td>
                  <td className="px-4 py-3">1-5x</td>
                  <td className="px-4 py-3">70-95%</td>
                  <td className="px-4 py-3">Ugentligt/månedligt</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold"><Link to="/velkomstbonus" className={linkClass}>Velkomstbonus</Link></td>
                  <td className="px-4 py-3">100% match</td>
                  <td className="px-4 py-3">10x (d+b)</td>
                  <td className="px-4 py-3">60-80%</td>
                  <td className="px-4 py-3">Engangstilbud</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold"><Link to="/reload-bonus" className={linkClass}>Reload bonus</Link></td>
                  <td className="px-4 py-3">25-50% match</td>
                  <td className="px-4 py-3">3-10x</td>
                  <td className="px-4 py-3">65-90%</td>
                  <td className="px-4 py-3">Ugentligt</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold"><Link to="/free-spins" className={linkClass}>Free spins</Link></td>
                  <td className="px-4 py-3">20-100 spins</td>
                  <td className="px-4 py-3">1-10x</td>
                  <td className="px-4 py-3">40-70%</td>
                  <td className="px-4 py-3">Varierer</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold"><Link to="/no-sticky-bonus" className={linkClass}>No-sticky bonus</Link></td>
                  <td className="px-4 py-3">100% match</td>
                  <td className="px-4 py-3">5-10x (b)</td>
                  <td className="px-4 py-3">80-95%</td>
                  <td className="px-4 py-3">Engangstilbud</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            *EV-procent angiver den reelle værdi af bonussen efter omsætningskrav er opfyldt. 100% betyder at hele beløbet kan udbetales. Cashback med kontant udbetaling er den eneste bonustype der konsekvent rammer 100% reel værdi.
          </p>
        </section>

        {/* Hvem passer cashback til */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvem passer cashback bonus til?</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Cashback er ikke den bedste bonustype for alle. Din spillestil, dit budget og dine præferencer afgør, om cashback er det optimale valg. Her er en ærlig vurdering af, hvornår cashback giver mening – og hvornår du bør vælge en anden bonusform:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-primary/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Cashback er ideel for dig, der...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Spiller regelmæssigt (ugentligt eller oftere)</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Har et månedligt spillebudget på 2.000+ kr.</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Foretrækker forudsigelige fordele over engangstilbud</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Spiller primært slots eller live casino</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Ønsker en{" "}<Link to="/no-sticky-bonus" className={linkClass}>fleksibel bonusstruktur</Link> uden bindinger</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Værdsætter gennemsigtighed og enkle vilkår</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Cashback er mindre ideel, hvis du...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 mt-0.5 text-destructive flex-shrink-0" /> Er ny spiller med lavt budget (vælg{" "}<Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> i stedet)</li>
                  <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 mt-0.5 text-destructive flex-shrink-0" /> Spiller sjældent (cashback kræver volumen for at give værdi)</li>
                  <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 mt-0.5 text-destructive flex-shrink-0" /> Foretrækker umiddelbar bonuskapital til at spille med</li>
                  <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 mt-0.5 text-destructive flex-shrink-0" /> Primært spiller bordspil (cashback dækker sjældent 100%)</li>
                  <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 mt-0.5 text-destructive flex-shrink-0" /> Har tendens til at øge indsatser for at "udnytte" cashback</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cashback og spillemyndigheden */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Cashback under Spillemyndighedens regulering</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I Danmark opererer alle licenserede casinoer under Spillemyndighedens tilsyn, og det påvirker cashback-programmerne positivt. Spillemyndigheden sætter grænser for bonusvilkår, hvilket sikrer at danske spillere får mere fair cashback-tilbud end i mange andre markeder.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det maksimale omsætningskrav er 10x under dansk regulering – men for cashback er det sjældent relevant, da de bedste tilbud er omsætningsfrie. Vigtigere er, at casinoerne er forpligtet til at kommunikere cashback-vilkårene tydeligt og tilgængeligt, herunder beregningsperiode, procentdel og eventuelle begrænsninger pr. spilkategori.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vi anbefaler altid at vælge casinoer med dansk licens, da det sikrer dig fuld forbrugerbeskyttelse. Se vores{" "}
            <Link to="/casinoer" className={linkClass}>komplette casinooversigt</Link> for en liste over alle licenserede operatører med cashback-programmer.
          </p>
        </section>

        {/* Tjekliste */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">7-trins tjekliste: Vælg det bedste cashback-tilbud</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Brug denne tjekliste til at evaluere ethvert cashback-tilbud systematisk. De fleste spillere stopper ved trin 1 – men de resterende trin afgør om tilbuddet reelt er profitabelt:
          </p>
          <div className="space-y-3">
            {[
              { icon: Percent, title: "Trin 1: Tjek cashback-procenten", desc: "5% er standard, 10% er godt, 15%+ er exceptionelt. Vær opmærksom på om procenten gælder nettotab (tab minus gevinster) eller bruttotab (alle tabende indsatser). Nettotab med høj procent er markant mere fordelagtigt." },
              { icon: Calculator, title: "Trin 2: Omsætningskrav eller kontanter?", desc: "Kontant cashback (0x omsætning) er markant mere værdifuldt. Bonus-cashback med 5x omsætning reducerer den reelle værdi med 15-20%. Spørg specifikt: 'Udbetales cashback som rigtige penge?' – det ene ord ændrer alt." },
              { icon: Clock, title: "Trin 3: Beregningsperiode og udbetalingstid", desc: "Ugentlig cashback er bedst for cash flow. Tjek hvornår perioden starter/slutter og hvornår pengene krediteres. Nogle casinoer har 24-48 timers forsinkelse – det reducerer ikke værdien men påvirker din likviditet." },
              { icon: BookOpen, title: "Trin 4: Hvilke spil tæller med?", desc: "De fleste cashback-programmer dækker slots 100%, men bordspil og live casino varierer (10-50% bidrag). Tjek om dine foretrukne spil bidrager fuldt ud. Nogle casinoer udelukker helt specifikke high-RTP titler som Blood Suckers." },
              { icon: Target, title: "Trin 5: Minimum tab-krav og loft", desc: "Nogle cashback-tilbud kræver et minimumstab (fx 500 kr.) før cashback aktiveres. Andre har et loft (fx maks 1.000 kr. cashback pr. uge). Beregn om dit typiske spillevolumen kvalificerer dig, og om loftet begrænser din potentielle tilbagebetaling." },
              { icon: Users, title: "Trin 6: VIP-progression og opgradering", desc: "Mange casinoer tilbyder bedre cashback-vilkår jo højere dit VIP-niveau. Standard kan være 5%, men VIP-spillere får 10-15%. Tjek om casinoet har et klart VIP-program med definerede niveauer, og hvad der kræves for at rykke op." },
              { icon: ShieldCheck, title: "Trin 7: Verifikation og udbetalingshastighed", desc: "Det nytter ikke at have generøs cashback, hvis udbetalingerne tager 5+ dage. Tjek casinoets gennemsnitlige udbetalingstid og om cashback-beløb kan hæves med det samme. De bedste casinoer krediterer cashback automatisk og tillader øjeblikkelig udbetaling." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-primary/30 bg-accent/30 p-4">
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Almindelige fejl */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">5 almindelige fejl med cashback bonus</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Selv erfarne spillere laver fejl med cashback. Her er de mest almindelige faldgruber – og hvordan du undgår dem:
          </p>
          <div className="space-y-4">
            {[
              {
                icon: AlertTriangle,
                title: "Fejl 1: At øge indsatser for at 'udløse' mere cashback",
                desc: "10% cashback på et tab på 10.000 kr. giver dig 1.000 kr. – men du har stadig tabt 9.000 kr. netto. Cashback er ikke en investeringsstrategi. Hold dit budget uændret og lad cashback være en bonus, ikke et mål.",
              },
              {
                icon: AlertTriangle,
                title: "Fejl 2: At ignorere beregningsmetoden (netto vs. brutto)",
                desc: "En 3% bruttotab-cashback kan se lavere ud end 10% nettotab – men kan faktisk give højere beløb i kroner. Beregn altid det forventede cashback-beløb baseret på dit typiske spilmønster, ikke bare procenten.",
              },
              {
                icon: AlertTriangle,
                title: "Fejl 3: At spille med bonus OG forvente cashback",
                desc: "De fleste casinoer tæller kun tab fra rigtige penge mod cashback. Hvis du spiller med en aktiv bonus, akkumulerer du ingen cashback. Planlæg dine bonusperioder og cashback-perioder separat for at maksimere begge.",
              },
              {
                icon: AlertTriangle,
                title: "Fejl 4: At overse spilbegrænsninger",
                desc: "Hvis du primært spiller Blackjack, men cashback kun dækker slots, er tilbuddet reelt værdiløst for dig. Tjek altid spilbidrag FØR du vælger casino baseret på cashback-procenten.",
              },
              {
                icon: AlertTriangle,
                title: "Fejl 5: At vælge casino KUN baseret på cashback",
                desc: "Cashback er vigtigt, men det bør ikke trumfe faktorer som spiludvalg, udbetalingshastighed, kundeservice og generel casinokvalitet. Et casino med 15% cashback men dårlig kundeservice og langsom udbetaling er sjældent den bedste løsning.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border p-4">
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <InlineCasinoCards
          title="Casinoer med stærke cashback-programmer"
        />

        <LatestNewsByCategory pagePath="/cashback-bonus" />
        <BonusMoneyLinks currentPath="/cashback-bonus" />
        <RelatedGuides currentPath="/cashback-bonus" />
        <FAQSection title="Ofte stillede spørgsmål om cashback bonus" faqs={cashbackFaqs} />
        <AuthorBio author="niklas" />
      </div>
      <StickyCtaBySlug slug="betinia" />
    </>
  );
};

export default CashbackBonus;
