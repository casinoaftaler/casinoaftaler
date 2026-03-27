import React from "react";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import comeonKampagner from "@/assets/screenshots/comeon-kampagner.png";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, buildVideoSchema, SITE_URL } from "@/lib/seo";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sparkles,
  ShieldCheck,
  HelpCircle,
  User,
  CalendarDays,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Gift,
  Clock,
  Target,
  Gamepad2,
  DollarSign,
  Lock,
  TrendingUp,
  CreditCard,
  Scale,
  Calculator,
  Ban,
  BarChart3,
  Percent,
  Coins,
  Users,
  Check,
  X,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";
import { BonusMoneyLinks } from "@/components/BonusMoneyLinks";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { YoutubeEmbed } from "@/components/YoutubeEmbed";
import { VideoContextBox } from "@/components/VideoContextBox";
import { BonusClusterPriorityLinks } from "@/components/BonusClusterPriorityLinks";

const linkClass = "text-primary underline hover:text-primary/80";

const stickyFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvorfor er de fleste danske casinobonusser sticky?",
    answer: (
      <>
        Sticky bonusser er industristandarden fordi de er kommercielt fordelagtige for casinoer: ved at blande indbetaling og bonus i én saldo er spilleren forpligtet til at gennemspille alt før udbetaling. Det øger den gennemsnitlige spilletid og casinoets indtjening. Dog har Spillemyndighedens 10x-loft på <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> gjort danske sticky bonusser markant mere fair end internationale (ofte 40-70x). Flere danske casinoer er begyndt at tilbyde <Link to="/no-sticky-bonus" className={linkClass}>no-sticky alternativer</Link> som differentiering.
      </>
    ),
  },
  {
    question: "Hvordan beregner jeg den reelle værdi af en sticky bonus?",
    answer: "For at beregne reel værdi: Tag bonusbeløbet, gange med omsætningskravet, og beregn det forventede tab under gennemspilning. Eksempel: 1.000 kr. bonus med 10x (d+b) på en 1.000 kr. indbetaling = 20.000 kr. omsætning. Med 96% RTP mister du statistisk 4% per gennemspillet krone = 800 kr. tab. Din forventede resterende saldo er 2.000 kr. - 800 kr. = 1.200 kr. Minus bonusbeløbet (trækkes ved udbetaling) = 200 kr. netto. Bonussens reelle værdi er altså ca. 200 kr. – langt under de 1.000 kr. der annonceres.",
  },
  {
    question: "Kan jeg spille progressive jackpots mens jeg har en sticky bonus aktiv?",
    answer: "Det afhænger af casinoets vilkår. Mange casinoer ekskluderer progressive jackpot-spil (som Mega Moolah med 88,12% RTP) fra bonusomsætning, eller de bidrager kun med en reduceret procent. Vigtigere: Hvis du vinder en jackpot under bonusomsætning, kan casinoet begrænse udbetalingen til bonussens gevinstloft – potentielt kan en milliongevinst reduceres til 5.000 kr. Tjek ALTID vilkårene for jackpot-spil. Hvis du jagter jackpots, spil med egne midler uden aktiv bonus.",
  },
  {
    question: "Hvad sker der med min saldo hvis jeg annullerer en sticky bonus?",
    answer: (
      <>
        Ved annullering af en sticky bonus mister du typisk bonusbeløbet OG alle gevinster optjent med den blandede saldo – uanset om gevinsterne reelt stammer fra din egen indbetaling. Dette er den største risiko ved sticky bonusser sammenlignet med <Link to="/no-sticky-bonus" className={linkClass}>no-sticky varianten</Link>, hvor egne gevinster altid er beskyttet. Nogle casinoer tilbyder delvis annullering: du mister bonussen men beholder den aktuelle realsaldo minus bonusdelen. Kontakt kundeservice FØR du annullerer for at forstå de præcise konsekvenser.
      </>
    ),
  },
  {
    question: "Er det strategisk klogt at spille med en sticky bonus?",
    answer: (
      <>
        Ja, HVIS du vælger den rigtige strategi. Med en sticky bonus bør du fokusere på spilleautomater med højest mulig RTP der bidrager 100% til omsætningen. Undgå bordspil (10-20% bidrag) og <Link to="/live-casino" className={linkClass}>live casino</Link> (ofte 0-10%). Hold indsatsen konsistent på 1-2% af din samlede saldo per spin. Med 96% RTP og 10x omsætning vil du statistisk beholde ca. 60% af din samlede bankroll. Den nøgne sandhed: sticky bonusser er designet til at casinoet statistisk vinder – men med god strategi kan du minimere tabet og maksimere underholdningsværdien.
      </>
    ),
  },
  {
    question: "Hvad er de typiske vilkår for en sticky bonus i Danmark?",
    answer: (
      <>
        Standard danske sticky bonus-vilkår: 100% match op til 1.000 kr. (Spillemyndighedens maksimum), 10x (d+b) omsætningskrav, 14-30 dages gyldighedsperiode, 25-50 kr. maks. indsats per spin, spilleautomater bidrager 100%, bordspil 10-20%, live casino 0-10%. Gevinstloft varierer fra 5.000 til 50.000 kr. Spillemyndighedens regulering sikrer at disse vilkår er gennemsigtige – casinoer er forpligtede til at vise dem tydeligt. Sammenlign altid med <Link to="/bonus-uden-omsaetningskrav" className={linkClass}>omsætningsfrie alternativer</Link> for at vurdere reel værdi.
      </>
    ),
  },
];

const StickyBonus = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(stickyFaqs);

  const articleJsonLd = buildArticleSchema({
    headline: "Sticky Bonus – Komplet Guide til Klæbende Bonusser 2026",
    description: "Alt om Sticky Bonusser hos danske casinoer. Forstå hvordan de fungerer, betingelser, fordele og ulemper.",
    url: `${SITE_URL}/sticky-bonus`,
    datePublished: "2025-06-01",
    videoId: "yUAcefgYfkc",
  });

  const videoJsonLd = buildVideoSchema(`${SITE_URL}/sticky-bonus`, "yUAcefgYfkc", {
    title: "Hvad er en Sticky Bonus på danske casinoer?",
    description: "Jonas gennemgår hvad en sticky bonus er, hvordan bonusmidler og indbetaling sammenblandes, og hvad det betyder for dine udbetalingsmuligheder på danske casinoer.",
    uploadDate: "2026-02-20",
    duration: "PT1M1S",
    viewCount: 8,
  });

  return (
    <>
      <SEO
        title="Sticky Bonus – Komplet Guide til Klæbende Bonusser 2026 | Casinoaftaler"
        description="Forstå Sticky Bonusser hos danske casinoer. Lær hvordan klæbende bonusser fungerer, omsætningskrav, strategier og sammenligning med No-Sticky Bonusser."
        jsonLd={[faqJsonLd, articleJsonLd, videoJsonLd]}
      />

      {/* Hero Section */}
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
              Bonusmekanik & omsætningsanalyse
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Sticky Bonus på Danske Casinoer
            </h1>
            <p className="text-lg text-white/80">
              En Sticky Bonus sammenblander din indbetaling og bonusmidler til
              én saldo. Lær hvordan de fungerer, hvad du skal holde øje med,
              og hvornår de er det rette valg for dig.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="niklas" readTime="22 Min." />

        <SnippetAnswer answer="En sticky bonus sammenblander din indbetaling og bonusmidler til én saldo. Over 80% af danske bonusser er sticky – de giver mere spillekapital, men kræver fuld omsætning før udbetaling." />

        <QuickComparisonTable count={3} title="Hurtig sammenligning – Top 3" prioritySlugs={["betinia", "spilleautomaten", "campobet"]} />

{/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvornår giver en Sticky Bonus mening?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Over 80 % af alle danske casinobonusser er sticky – alligevel forstår de færreste præcis, hvad det indebærer. Når du accepterer en Sticky Bonus, sammenblandes din indbetaling og bonusmidlerne til én saldo. Det låser hele beløbet bag{" "}
            <Link to="/omsaetningskrav" className="text-primary hover:underline">omsætningskravene</Link>, hvilket betyder at du ikke kan hæve noget – heller ikke gevinster fra egne penge – før kravene er opfyldt. Det er en central kategori i vores <Link to="/casino-bonus" className="text-primary hover:underline">bonusguide</Link>.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Betegnelsen "Sticky" kommer af, at bonusmidlerne klæber sig til
            din konto. Selve bonusbeløbet kan aldrig hæves – kun de gevinster,
            du optjener ud over bonusbeløbet, efter omsætningskravene er
            opfyldt. Ved udbetaling trækkes bonusbeløbet fra din saldo.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Til gengæld er casinoerne ofte mere gavmilde med Sticky Bonusser.
            Det er ikke ualmindeligt at se matchbonusser på 100% eller mere,
            fordi casinoet har større sikkerhed for, at du spiller pengene
            igennem. Det gør Sticky Bonusser ideelle for spillere, der
            ønsker et større spillebudget.
          </p>
          <p className="mb-8 text-muted-foreground leading-relaxed">
            Vil du forstå, hvordan bonusmekanikker fungerer i praksis? Prøv vores{" "}
            <Link to="/community/slots" className="text-primary hover:underline">gratis spilleautomater i spillehallen</Link>
            , hvor du kan opleve free spins og bonusrunder helt risikofrit, eller se de bedste øjeblikke på vores{" "}
            <Link to="/highlights" className="text-primary hover:underline">highlights-side</Link>.
          </p>

          <YoutubeEmbed
            videoId="yUAcefgYfkc"
            title="Hvad er en Sticky Bonus på danske casinoer?"
            description="Jonas gennemgår hvad en sticky bonus er, hvordan bonusmidler og indbetaling sammenblandes, og hvad det betyder for dine udbetalingsmuligheder på danske casinoer."
            duration="PT1M1S"
            viewCount={8}
            uploadDate="2026-02-20"
            articleUrl="https://casinoaftaler.dk/sticky-bonus"
          />

          <VideoContextBox heading="Her gennemgår vores streamer og forfatter Jonas, hvad en sticky bonus er">
              <Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> forklarer hvad en sticky bonus er, og hvad det betyder at dine penge og bonusmidler sammenblandes fra sekund ét. Videoen er en del af vores indhold om{" "}
              <Link to="/casino-bonus" className={linkClass}>casino bonusser</Link>,{" "}
              <Link to="/no-sticky-bonus" className={linkClass}>no-sticky bonus</Link> og{" "}
              <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
          </VideoContextBox>
        </section>

        <BonusClusterPriorityLinks currentPath="/sticky-bonus" />

        <Separator className="my-10" />

        {/* Definition og mekanik */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Mekanikken bag en Sticky Bonus – trin for trin
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Med en Sticky Bonus bliver din indbetaling og bonus sammenblandet
            fra det øjeblik, du accepterer tilbuddet. Her er et konkret
            eksempel, der viser hvordan det fungerer i praksis.
          </p>

          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-primary" />
                  Eksempel: 100% Sticky Bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Du indbetaler 500 kr. og modtager 500 kr. i Sticky Bonus.
                  Din samlede saldo er 1.000 kr. Hele beløbet er underlagt
                  omsætningskrav – f.eks. 10x (d+b), hvilket kræver, at du
                  satser for 10.000 kr. Først derefter kan du hæve gevinster.
                  Ved udbetaling trækkes de 500 kr. i bonus fra din saldo.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="h-5 w-5 text-primary" />
                  Sticky Bonus med free spins
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Et velkomsttilbud kan inkludere 500 kr. i bonus + 50{" "}
                  <Link to="/free-spins" className="text-primary hover:underline">free spins</Link>.
                  Selvom spins og kontant bonus er forskellige, gælder
                  bonussens vilkår for begge dele. Gevinster fra free spins
                  er også underlagt omsætningskrav, før de kan hæves.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="h-5 w-5 text-primary" />
                  Sammenblanding af midler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Den vigtigste forskel fra en{" "}
                  <Link to="/no-sticky-bonus" className="text-primary hover:underline">No-Sticky Bonus</Link>{" "}
                  er, at du ikke kan skelne mellem egne penge og bonuspenge.
                  Alt behandles som bonusmidler underlagt omsætningskrav.
                  Selv gevinster vundet tidligt i sessionen er låst, indtil
                  kravene er opfyldt.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        

        <Separator className="my-10" />

        {/* Fordele og ulemper */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Fordele og ulemper ved Sticky Bonus
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Sticky Bonusser er populære af en grund, men de passer ikke til
            alle spillere. Her er en ærlig gennemgang af fordele og ulemper.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-primary/30 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-primary">
                  <Check className="h-5 w-5" />
                  Fordele
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span><strong>Større spillebudget:</strong> Ofte større bonusbeløb, der giver flere midler at spille for</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span><strong>Forlænget spilletid:</strong> Med et større budget kan du udforske flere spil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span><strong>Større gevinstpotentiale:</strong> Flere midler at satse med kan øge chancerne</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span><strong>Lavere risiko per spin:</strong> Bonuspenge minimerer din egen økonomiske risiko</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-destructive/30 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                  <X className="h-5 w-5" />
                  Ulemper
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    <span><strong>Låst saldo:</strong> Ingen udbetaling mulig før omsætningskrav er opfyldt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    <span><strong>Risiko for tab:</strong> Du kan miste både indbetaling og bonus, hvis kravene ikke nås</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    <span><strong>Tidspres:</strong> Omsætningskrav skal typisk opfyldes inden 60 dage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    <span><strong>Gevinstloft:</strong> Mange bonusser har en maksimal gevinst fra bonusmidler</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Betingelser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Typiske betingelser for Sticky Bonusser
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Før du accepterer en Sticky Bonus, er det afgørende at forstå
            vilkårene. Her er de vigtigste betingelser, du bør kende til.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Omsætningskrav (d+b)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <Link to="/omsaetningskrav" className="text-primary hover:underline">Omsætningskravene</Link>{" "}
                  gælder fra start for både indbetaling og bonus. Med et
                  10x krav og 1.000 kr. i samlet saldo (500+500) skal du
                  satse for 10.000 kr. Forskellige spil bidrager forskelligt
                  – slots tæller typisk 100%, bordspil kun 10%.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  Tidsbegrænsning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  De fleste Sticky Bonusser har en tidsfrist for opfyldelse
                  af omsætningskravene – som minimum 60 dage hos danske
                  casinoer. Udløber fristen, mister du bonussen og alle
                  bonusgevinster.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="h-5 w-5 text-primary" />
                  Indsatsgrænser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Der er typisk en maksimal indsats per spilrunde – ofte
                  omkring 50 kr. per spin. Overskrider du grænsen, kan
                  bonussen annulleres, og du mister eventuelle gevinster.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Maksimal gevinst
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mange casinoer har et loft over, hvor meget du kan vinde
                  med bonuspenge. Overskydende gevinster kan blive fjernet
                  eller konverteret til spillemidler, der ikke kan hæves.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Spilbidrag
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ikke alle spil bidrager ens til omsætningskravet.
                  Spilleautomater tæller typisk 100%, mens{" "}
                  <Link to="/live-casino" className="text-primary hover:underline">live casino</Link>{" "}
                  og bordspil kan tælle 10% eller være helt udelukket.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Minimumsindbetaling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Et minimumsbeløb kræves for at aktivere bonussen. En
                  større <Link to="/indskudsbonus" className="text-primary hover:underline">indbetaling</Link>{" "}
                  giver en større bonus, men husk at omsætningskravene
                  også stiger proportionelt.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Sådan genkender du */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan genkender du en Sticky Bonus
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            De fleste bonusser er faktisk Sticky – men casinoerne kalder dem
            sjældent det direkte. Her er hvad du skal kigge efter i vilkårene.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Kig efter 'd+b' i specifikationerne",
                desc: "Udtrykket 'd+b' (deposit + bonus) betyder, at omsætningskrav gælder for både indbetaling og bonus. Det er en klassisk indikator for en Sticky Bonus.",
                icon: Target,
              },
              {
                title: "Sammenblanding af midler",
                desc: "Hvis vilkårene angiver, at bonussen tilføjes direkte til din spillesaldo uden separation, er det en Sticky Bonus.",
                icon: DollarSign,
              },
              {
                title: "Bonusbeløbet kan ikke hæves",
                desc: "Finder du formuleringer om, at bonusbeløbet trækkes fra ved udbetaling, står du over for en Sticky Bonus.",
                icon: Lock,
              },
              {
                title: "De fleste bonusser er Sticky",
                desc: "Medmindre der specifikt står 'No-Sticky', 'lifeline' eller 'forfeitable', kan du som tommelfingerregel antage, at bonussen er Sticky.",
                icon: AlertTriangle,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Sticky vs No-Sticky */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sticky Bonus vs. No-Sticky Bonus
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            For at vælge den rette bonus er det vigtigt at forstå forskellen
            mellem Sticky og{" "}
            <Link to="/no-sticky-bonus" className="text-primary hover:underline">No-Sticky Bonusser</Link>.
            Her er en direkte sammenligning.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg border border-border text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-3 text-left font-semibold">Kriterium</th>
                  <th className="border border-border p-3 text-left font-semibold">Sticky Bonus</th>
                  <th className="border border-border p-3 text-left font-semibold">No-Sticky Bonus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3 font-medium">Midlernes status</td>
                  <td className="border border-border p-3 text-muted-foreground">Sammenblandet fra start</td>
                  <td className="border border-border p-3 text-muted-foreground">Adskilt – egne penge først</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-3 font-medium">Omsætningskrav</td>
                  <td className="border border-border p-3 text-muted-foreground">Gælder for alt fra start</td>
                  <td className="border border-border p-3 text-muted-foreground">Kun for bonusmidler</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-medium">Udbetaling</td>
                  <td className="border border-border p-3 text-muted-foreground">Først efter fuld gennemspilning</td>
                  <td className="border border-border p-3 text-muted-foreground">Frit for egne pengegevinster</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-3 font-medium">Bonusstørrelse</td>
                  <td className="border border-border p-3 text-muted-foreground">Typisk større beløb</td>
                  <td className="border border-border p-3 text-muted-foreground">Ofte mindre beløb</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-medium">Bedst til</td>
                  <td className="border border-border p-3 text-muted-foreground">Erfarne spillere, highrollers</td>
                  <td className="border border-border p-3 text-muted-foreground">Nye og forsigtige spillere</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Hvem passer den til */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvem er Sticky Bonus bedst egnet til?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sticky Bonusser appellerer særligt til spillere, der søger et
            større spillebudget og er villige til at navigere gennem
            omsætningskrav for at låse op for potentielt større gevinster.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Erfarne spillere</strong>, der forstår hvordan{" "}
            <Link to="/omsaetningskrav" className="text-primary hover:underline">omsætningskrav</Link>{" "}
            fungerer, og som har strategier for at opfylde dem, vil finde
            Sticky Bonusser attraktive. Det samme gælder spillere, der ønsker
            at udforske et casinos fulde spiludvalg med et forstørret budget.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Prioriterer du derimod fleksibilitet og muligheden for at hæve
            gevinster tidligt, er en{" "}
            <Link to="/no-sticky-bonus" className="text-primary hover:underline">No-Sticky Bonus</Link>{" "}
            eller en{" "}
            <Link to="/bonus-uden-omsaetningskrav" className="text-primary hover:underline">bonus uden omsætningskrav</Link>{" "}
            sandsynligvis et bedre valg.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Spilstrategi */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Strategier til at udnytte en Sticky Bonus
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            For at maksimere værdien af en Sticky Bonus kan du tilpasse din
            spilstrategi. Her er nogle praktiske råd.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Vælg spil med høj RTP",
                desc: "Spilleautomater med høj Return to Player (96%+) og lav volatilitet giver en mere stabil oplevelse, hvor du gradvist arbejder mod omsætningskravet.",
                icon: TrendingUp,
              },
              {
                title: "Hold øje med spilbidrag",
                desc: "Fokusér på spil, der bidrager 100% til omsætningskravet. Bordspil bidrager ofte kun 10%, så slots er typisk det mest effektive valg.",
                icon: Gamepad2,
              },
              {
                title: "Undgå progressive jackpots",
                desc: "Selvom det er fristende, kan en stor jackpotgevinst være begrænset af bonussens gevinstloft. Prioriter spil med jævne udbetalinger.",
                icon: Ban,
              },
              {
                title: "Hold styr på tidsfristen",
                desc: "Planlæg dit spil, så du har tilstrækkeligt med tid til at opfylde omsætningskravene. Start tidligt og undgå at presse alting ind på de sidste dage.",
                icon: Clock,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* EV-analyse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Matematisk EV-analyse: Den reelle værdi af en Sticky Bonus
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at forstå den reelle værdi af en sticky bonus skal vi beregne dens Expected Value (EV) – altså den statistisk forventede gevinst eller tab. Formlen er enkel men afslørende: <strong>EV = (Indbetaling + Bonus) – (Total omsætning × <Link to="/ordbog/house-edge" className={linkClass}>House Edge</Link>) – Bonusbeløb</strong>. Lad os gennemgå tre konkrete scenarier med danske vilkår og Spillemyndighedens 10x (d+b) loft.
          </p>

          <div className="space-y-4">
            <Card className="border-primary/30 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-primary" />
                  Scenarie 1: Standard 100% Sticky Bonus (10x d+b)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Input:</strong> Indbetaling 1.000 kr. + 1.000 kr. bonus = 2.000 kr. saldo. Omsætningskrav: 10x (d+b) = 20.000 kr. total omsætning. Slot RTP: 96% (house edge 4%).
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Beregning:</strong> Forventet tab under omsætning = 20.000 × 0,04 = 800 kr. Forventet saldo efter omsætning = 2.000 – 800 = 1.200 kr. Ved udbetaling trækkes bonusbeløbet (1.000 kr.) = <strong>200 kr. netto EV</strong>.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Konklusion:</strong> Den annoncerede 1.000 kr. bonus har en reel statistisk værdi på kun 200 kr. – 80% lavere end det markedsførte beløb. Dog er din risiko begrænset til din indbetaling (1.000 kr.), mens du får 20.000 kr. i spilleunderholdning.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-primary" />
                  Scenarie 2: Lavt omsætningskrav (5x d+b) – ComeOn/GetLucky niveau
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Input:</strong> Indbetaling 1.000 kr. + 1.000 kr. bonus = 2.000 kr. saldo. Omsætningskrav: 5x (d+b) = 10.000 kr. total omsætning. Slot RTP: 97% (house edge 3%).
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Beregning:</strong> Forventet tab = 10.000 × 0,03 = 300 kr. Forventet saldo = 2.000 – 300 = 1.700 kr. Minus bonus (1.000 kr.) = <strong>700 kr. netto EV</strong>.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Konklusion:</strong> Med 5x omsætning og høj-RTP slot er bonussens reelle værdi 700 kr. af de 1.000 kr. annoncerede – 70% reel værdi. Det er det laveste lovlige omsætningskrav på det danske marked (ComeOn og GetLucky). Dette viser hvorfor lave omsætningskrav er afgørende for <Link to="/nye-casinoer/lav-wagering" className={linkClass}>bonusværdien</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-destructive/30 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Scenarie 3: Worst case – Udenlandsk 50x bonus (til sammenligning)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Input:</strong> Indbetaling 1.000 kr. + 1.000 kr. bonus = 2.000 kr. saldo. Omsætningskrav: 50x (d+b) = 100.000 kr. total omsætning. Slot RTP: 95% (house edge 5%).
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Beregning:</strong> Forventet tab = 100.000 × 0,05 = 5.000 kr. Dette overstiger hele din saldo (2.000 kr.) – du går statistisk <strong>bust med 100% sandsynlighed</strong>.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Konklusion:</strong> Udenlandske sticky bonusser med 50x+ krav har negativ EV og er designet til at du taber alt. Spillemyndighedens 10x loft eksisterer præcis for at forhindre dette scenarie.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 rounded-lg border border-primary/30 bg-accent/30 p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Nøgleformler til EV-beregning:</strong> Forventet tab = Total omsætning × (1 – RTP). Reel bonusværdi = Bonusbeløb – Forventet tab. Breakeven RTP = 1 – (Bonusbeløb ÷ Total omsætning). For en 1.000 kr. sticky bonus med 10x (d+b) er breakeven RTP = 95% – alt over dette giver positiv EV fra bonusdelen.
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Spillerprofiler */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvem bør – og bør IKKE – vælge en Sticky Bonus?
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Sticky bonusser er ikke for alle. Her er en segmenteret analyse af seks spillertyper og deres matematiske kompatibilitet med sticky-modellen.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "✅ High Roller (indsats 50+ kr./spin)", desc: "Ideel. Større saldo giver bedre variansabsorption under omsætning. Med 10x (d+b) og 2.000 kr. bonus har high rolleren 40.000 kr. omsætning – opnåeligt på 4-6 timer med 50 kr./spin. EV forbliver positiv på høj-RTP slots.", icon: TrendingUp },
              { title: "✅ Bonusjæger (systematisk approach)", desc: "Fungerer, men kræver disciplin. Bonusjægeren vælger sticky bonusser med lavest mulig omsætning og højest mulig RTP-slots. Matematisk optimal strategi: 1-2% af saldo per spin, kun 97%+ RTP slots, og aldrig progressive jackpots.", icon: Target },
              { title: "⚠️ Casual spiller (10-25 kr./spin)", desc: "Brug forsigtighed. En sticky bonus på 500 kr. med 10x (d+b) kræver 10.000 kr. omsætning – 400-1.000 spins. Casual spilleren risikerer at føle sig 'låst' og presse indsatsen op for at nå kravet hurtigere. Overvej i stedet en no-sticky bonus.", icon: Users },
              { title: "❌ Bordspil-entusiast", desc: "Undgå sticky. Bordspil bidrager typisk kun 10% til omsætningen – en 10x (d+b) bonus kræver reelt 100x i bordspilsindsatser. Med blackjack (RTP 99%) lyder det godt, men 200.000 kr. i samlet omsætning for en 1.000 kr. bonus er urealistisk. Vælg bonus uden omsætningskrav.", icon: Gamepad2 },
              { title: "❌ Live casino-spiller", desc: "Helt uegnet. Live casino er ofte 0-10% bidrag eller helt udelukket. En sticky bonus er værdiløs, hvis du primært spiller live roulette, blackjack eller game shows. Se vores guide til live casino for bedre alternativer.", icon: Ban },
              { title: "❌ Ny spiller (første casino-oplevelse)", desc: "Anbefales ikke som første bonus. Sticky-mekanikken er kompleks og kan skabe frustration. Nye spillere bør starte med en no-deposit bonus eller no-sticky velkomstbonus, hvor egne gevinster altid kan hæves frit.", icon: AlertTriangle },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <item.icon className="h-5 w-5 text-primary" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Variansanalyse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Variansanalyse: Volatilitet og sticky bonusser
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Volatilitet er en afgørende faktor, når du spiller med en sticky bonus. Høj-volatilitets slots (som Dead or Alive 2 eller Book of Dead) kan give store gevinster, men de tømmer også din saldo hurtigere under omsætning. Lav-volatilitets slots (som Starburst eller Blood Suckers) giver hyppigere, men mindre gevinster – og holder din saldo mere stabil.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Den matematiske sandhed:</strong> Med en sticky bonus er din prioritet at overleve omsætningen med en positiv saldo. Lav-volatilitets slots med høj RTP (97%+) er statistisk optimale for dette formål. Du ofrer potentialet for kæmpegevinster til fordel for en højere sandsynlighed for at komme igennem omsætningskravet med penge i hånden.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Undtagelsen:</strong> Hvis du har en stor bankroll relativt til bonusbeløbet (f.eks. 5.000 kr. indbetaling med 500 kr. bonus), kan du tillade dig mere volatilitet, fordi din egen indbetaling fungerer som buffer. Jo større forholdet mellem indbetaling og bonus er, jo mere fleksibel er du i spilvalg – men husk at (d+b)-modellen stadig låser hele saldoen.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Sticky Bonus markedsoverblik */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sticky Bonus i Danmark 2026 – Hvad du skal vide
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sticky bonus er fortsat den mest udbredte bonustype på det danske casinomarked i 2026. De fleste danske casinoer tilbyder en sticky bonus som deres primære velkomsttilbud, fordi denne bonusstruktur giver casinoerne mulighed for at tilbyde større bonusbeløb. For spillere betyder en sticky bonus, at hele saldoen – både indbetaling og bonus – er underlagt omsætningskrav fra start.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fordelen ved en sticky bonus er det større spillebudget. Hvor en <Link to="/no-sticky-bonus" className="text-primary hover:underline">no-sticky bonus</Link> typisk tilbyder 100% match, kan en sticky bonus tilbyde mere generøse beløb, fordi casinoet har sikkerhed for, at du spiller pengene igennem. Det gør en sticky bonus særligt attraktiv for spillere, der planlægger længere spillesessioner og ønsker maksimal spilletid.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er dog vigtigt at forstå risikoen ved en sticky bonus. Da hele din saldo er låst bag omsætningskravene, kan du ikke hæve noget – heller ikke gevinster fra dine egne penge – før kravene er opfyldt. Hvis du vinder stort tidligt i en session med en sticky bonus, skal du stadig gennemspille hele beløbet. Denne binding gør det ekstra vigtigt at vælge en sticky bonus med rimelige vilkår.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I Danmark er Spillemyndighedens loft på 10x (d+b) en stor fordel for spillere, der vælger en sticky bonus. Sammenlignet med udenlandske markeder, hvor sticky bonusser kan have 50x+ omsætningskrav, er danske sticky bonusser langt mere realistiske at gennemføre. Kombineret med 60 dages minimum gyldighedsperiode giver en dansk sticky bonus en fair chance for at opfylde kravene inden for tidsfristen.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Psykologien bag sticky bonusser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Psykologien bag sticky bonusser: Hvorfor de virker
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sticky bonusser udnytter flere veldokumenterede psykologiske mekanismer til at påvirke din spilleadfærd. At forstå disse mekanismer gør dig til en bedre og mere bevidst spiller. Den vigtigste mekanisme er "endowment-effekten" – det psykologiske princip at vi tilskriver ting vi "ejer" højere værdi end de har. Når du ser 2.000 kr. på din saldo (1.000 kr. egne + 1.000 kr. bonus), føles det som om du ejer 2.000 kr. – selvom halvdelen aldrig kan hæves direkte.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Commitment and consistency:</strong> Når du først har accepteret en sticky bonus og begyndt omsætningen, aktiveres dit behov for konsistens. Du har "committed" dig til at gennemspille bonussen, og det føles forkert at stoppe – selv når din saldo falder og EV'en tyder på, at det er tid til at trække sig. Denne mekanisme er den primære årsag til at spillere gennemfører omsætningen med negative EV i stedet for at annullere bonussen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Loss aversion:</strong> Frygten for at "miste" bonusbeløbet er stærkere end glæden ved at vinde et tilsvarende beløb. Mange spillere accepterer en sticky bonus ikke fordi de vil have ekstra spilletid, men fordi de frygter at "gå glip af" en gratis fordel. Men "gratis" er relativt: en sticky bonus koster dig tid, risikoeksponering og potentielt hele din indbetaling.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Modgiften er matematik:</strong> Erstat intuition med beregning. Beregn EV'en FØR du accepterer bonussen. Sæt et tidsbudget. Beslut på forhånd, hvornår du stopper – uanset omsætningsfremdrift. Og husk: at afslå en bonus er ALTID en gyldig beslutning.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Global sammenligning */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Internationalt perspektiv: Sticky bonusser verden over
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sticky bonusser er en global standard i casinoindustrien, men vilkårene varierer dramatisk mellem regulerede markeder. Det danske 10x-loft gør sticky bonusser markant mere spillervenlige end i de fleste andre jurisdiktioner. Her er en sammenligning der sætter den danske model i perspektiv:
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>🇬🇧 Storbritannien (UKGC):</strong> Ingen lovfastsat øvre grænse for omsætningskrav. Typisk 30-40x (d+b) på sticky bonusser. Det betyder at en britisk sticky bonus på £500 med 35x kræver £35.000 i omsætning – 3,5x mere end den danske ækvivalent. Statistisk bust-rate: ~85% mod ~40% i Danmark.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>🇸🇪 Sverige (Spelinspektionen):</strong> Bonusser er kun tilladt som velkomstbonus ved første indbetaling – reload-bonusser og løbende sticky bonusser er forbudt. Den svenske regulering er mere restriktiv end den danske, men giver ikke nødvendigvis bedre spillerbeskyttelse – mange svenske spillere migrerer til <Link to="/casino-licenser" className={linkClass}>udenlandske casinoer</Link> med endnu værre vilkår.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>🇩🇰 Danmarks unikke position:</strong> Det danske system rammer en balance: bonusser er tilladt og reguleret med rimelige lofter, hvilket giver spillerne reel værdi uden at tvinge dem til uregulerede markeder. Sticky bonusser under 10x (d+b) er statistisk profitable for spilleren ved RTP over 95% – en grænse de fleste populære slots opfylder.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Ansvarligt spil */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Risikoen ved at gennemspille en stor saldo
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fordi en Sticky Bonus låser hele din saldo bag omsætningskrav, kan det føre til længere spillesessioner end planlagt. Presset for at nå gennemspilningen inden tidsfristen kan forstærke impulsen til at øge indsatsen – en adfærd der sjældent ender godt. Sæt altid et tidsbudget ud over dit pengebudget. En tommelfingerregel: planlæg 1 times spilletid per 3.000 kr. omsætning med 5 kr. gennemsnitlig indsats.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hvis du oplever, at omsætningskravet bliver en stressfaktor frem for underholdning, er det klogeste træk at annullere bonussen og spille videre uden. Benyt{" "}
            <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>{" "}
            til selvudelukkelse eller kontakt{" "}
            <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>{" "}
            for fortrolig rådgivning. 18+ | Spil ansvarligt.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Unik konklusion */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Den nøgne sandhed om sticky bonusser</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En sticky bonus er et kompromis: du får et større spillebudget i bytte for at opgive fleksibilitet. Det er hverken et godt eller dårligt tilbud – det afhænger udelukkende af din spillestil, dine forventninger og din vilje til at gennemspille omsætningskravene. Her er den ærlige vurdering:
          </p>
          <div className="space-y-3">
            {[
              {
                icon: Gift,
                title: "Sticky bonusser er industristandarden – forstå dem",
                desc: "Over 80% af danske bonusser er sticky. Kan du ikke identificere en sticky bonus i vilkårene, vil du uundgåeligt acceptere en uden at vide det. Kig efter 'd+b', 'sammenblandet saldo' eller fravær af 'no-sticky/forfeitable' i vilkårene.",
              },
              {
                icon: Calculator,
                title: "EV er positiv – men marginen er lille",
                desc: "Med danske vilkår (10x d+b) og 96% RTP er EV ca. 200 kr. per 1.000 kr. bonus – 20% reel værdi. Det er positivt, men ikke generøst. En no-sticky bonus med samme vilkår giver 2-3x højere EV. Vælg no-sticky når muligt.",
              },
              {
                icon: Scale,
                title: "Danmark beskytter dig – men du skal stadig tænke selv",
                desc: "Spillemyndighedens 10x-loft sikrer rimelige vilkår, men det fjerner ikke risikoen for tab. Selv med favorable danske vilkår kan du miste hele din indbetaling under omsætningen. Accepter aldrig en sticky bonus med penge du ikke har råd til at tabe.",
              },
              {
                icon: ShieldCheck,
                title: "Spil ansvarligt – det er den eneste vindende strategi",
                desc: "Omsætningskrav kan friste til længere sessioner end planlagt. Sæt tids- og pengebudgetter FØR du begynder. Brug casinoets indbetalingsgrænser. Kontakt ROFUS og StopSpillet.dk ved behov. 18+.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <LatestNewsByCategory pagePath="/sticky-bonus" />
        <BonusMoneyLinks currentPath="/sticky-bonus" />
        <RelatedGuides currentPath="/sticky-bonus" />
        <FAQSection title="Ofte stillede spørgsmål om sticky bonus" faqs={stickyFaqs} />
        <AuthorBio author="niklas" />
      </div>
      <StickyCtaBySlug slug="spildansknu" />
    </>
  );
};

export default StickyBonus;
