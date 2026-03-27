import React from "react";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import betiniaVelkomstbonus from "@/assets/screenshots/betinia-velkomstbonus-aktiv.webp";
import betiniaBonusvilkaar from "@/assets/screenshots/betinia-bonusvilkaar.webp";
import kapowVelkomstbonus from "@/assets/screenshots/kapow-velkomstbonus.png";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, buildVideoSchema, SITE_URL } from "@/lib/seo";
import { RelatedGuides } from "@/components/RelatedGuides";
import { BonusMoneyLinks } from "@/components/BonusMoneyLinks";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { LiveCommunityDataStrip } from "@/components/LiveCommunityDataStrip";
import { BonusClusterPriorityLinks } from "@/components/BonusClusterPriorityLinks";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
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
  Star,
  Trophy,
  RefreshCw,
  Zap,
  Lock,
  TrendingUp,
  CreditCard,
  Users,
  BarChart3,
  ListChecks,
  Calculator,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { YoutubeEmbed } from "@/components/YoutubeEmbed";

const linkClass = "text-primary underline hover:text-primary/80";

const velkomstbonusFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad gør en velkomstbonus bedre end andre bonustyper?",
    answer: (
      <>
        Velkomstbonussen er typisk det mest generøse tilbud et casino giver – matchprocenten er højest (oftest 100%), og free spins-antallet er størst. Til sammenligning giver reload-bonusser sjældent mere end 50% match og færre spins. Grunden er enkel: casinoet investerer i din acquisition. Danske velkomstbonusser har desuden fordelen af Spillemyndighedens 10x-loft på <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>, hvilket gør dem markant mere fordelagtige end internationale tilbud med 40-70x krav.
      </>
    ),
  },
  {
    question: "Kan jeg modtage flere velkomstbonusser fra det samme casino?",
    answer: "Nej, velkomstbonusser er strengt forbeholdt nye spillere – én per person, husstand og IP-adresse. Forsøg på at oprette flere konti for at udnytte tilbudet gentagne gange er et brud på vilkårene og kan resultere i kontolukning og konfiskering af alle midler. Dog tilbyder mange casinoer velkomstpakker fordelt over de første 2-4 indbetalinger, hvor du modtager nye bonusser og free spins for hver indbetaling. Planlæg dine indbetalinger strategisk for at maksimere den samlede pakkeværdi.",
  },
  {
    question: "Hvornår skal jeg aktivere min velkomstbonus – ved registrering eller indbetaling?",
    answer: (
      <>
        De fleste danske velkomstbonusser aktiveres automatisk ved din første indbetaling – du behøver ikke gøre noget aktivt. Nogle kræver dog en bonuskode der skal indtastes i indbetalingsfeltet. Vigtigt: Læs ALTID vilkårene FØR du indbetaler. Nogle casinoer kræver at du vælger bonussen aktivt, og hvis du springer trinnet over, kan du ikke efterfølgende få bonussen tilskrevet. Overvej også om bonussen passer din spillestil – en <Link to="/no-sticky-bonus" className={linkClass}>no-sticky velkomstbonus</Link> giver mere fleksibilitet end en standard sticky bonus.
      </>
    ),
  },
  {
    question: "Hvad er minimumsindbetaling for at aktivere en velkomstbonus?",
    answer: "Minimumsindbetaling hos danske casinoer ligger typisk på 100-200 kr. for at aktivere velkomstbonussen. Nogle casinoer har et lavere minimum (50 kr.), mens VIP-tilbud kan kræve 500-1.000 kr. Indbetal præcis det beløb der maksimerer bonussen: Hvis casinoet matcher 100% op til 1.000 kr., giver en indbetaling på 1.000 kr. den fulde 1.000 kr. bonus. En indbetaling på 500 kr. giver kun 500 kr. bonus – du efterlader værdi på bordet. Tjek også om visse betalingsmetoder er ekskluderet fra bonusen.",
  },
  {
    question: "Hvor lang tid har jeg til at gennemspille en velkomstbonus?",
    answer: (
      <>
        Tidsfristen varierer fra 7 til 30 dage afhængigt af casinoet. De fleste danske casinoer giver 14-30 dage til at opfylde omsætningskravene. Med et typisk 10x (d+b) krav på en 500 kr. indbetaling + 500 kr. bonus skal du omsætte 10.000 kr. inden fristen. Ved gennemsnitligt 5 kr. per spin og 600 spins/time tager det ca. 3,3 timer. Planlæg din spilletid realistisk – det er bedre at gennemspille roligt end at forhaste sig den sidste dag med desperate høje indsatser.
      </>
    ),
  },
  {
    question: "Er det klogt at tage imod alle velkomstbonusser?",
    answer: (
      <>
        Ikke nødvendigvis. Evaluer hver velkomstbonus ud fra tre kriterier: 1) Omsætningskrav (10x er standard i Danmark – alt under er exceptionelt), 2) Bonustype (<Link to="/no-sticky-bonus" className={linkClass}>no-sticky</Link> er bedst, <Link to="/sticky-bonus" className={linkClass}>sticky</Link> er standard), og 3) Gyldighedsperiode (mindst 14 dage). Hvis du primært spiller live casino eller bordspil, er en velkomstbonus ofte dårlig værdi, da disse spil typisk kun bidrager 10-20% til omsætningen. I det tilfælde er det bedre at spille uden bonus.
      </>
    ),
  },
];

const bonusTypes = [
  {
    id: "matchbonus",
    name: "Matchbonus (100%)",
    icon: TrendingUp,
    description:
      "Den mest udbredte form for velkomstbonus. Casinoet matcher din første indbetaling med en bestemt procentdel – typisk 100%. Indbetaler du fx 500 kr., får du yderligere 500 kr. i bonuspenge at spille for.",
  },
  {
    id: "free-spins-combo",
    name: "Matchbonus + Free Spins",
    icon: Sparkles,
    description:
      "Mange casinoer kombinerer en matchbonus med et antal gratis spins på populære spilleautomater. Det giver dig både ekstra penge og gratis omgange, som tilsammen kan øge dine gevinstchancer markant.",
  },
  {
    id: "no-deposit",
    name: "Velkomstbonus uden indbetaling",
    icon: Gift,
    description:
      "Sjælden men attraktiv – her modtager du en bonus eller gratis spins uden at skulle indbetale penge først. Denne type har typisk højere omsætningskrav og lavere bonusbeløb, men er helt risikofri for spilleren.",
  },
  {
    id: "tiered",
    name: "Flertrinspakke",
    icon: Trophy,
    description:
      "Nogle casinoer fordeler velkomstbonussen over de første 2-4 indbetalinger. Hver indbetaling udløser en ny bonus, hvilket giver dig bonusfordele over en længere periode og fordeler risikoen.",
  },
];

const Velkomstbonus = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(velkomstbonusFaqs);

  const articleJsonLd = buildArticleSchema({
    headline: "Velkomstbonus – Komplet Guide til Casino Velkomstbonusser 2026",
    description: "Velkomstbonus hos danske casinoer 2026 – sammenlign matchbonus, free spins og no-deposit tilbud. Se hvilke bonusser der har de bedste vilkår.",
    url: `${SITE_URL}/velkomstbonus`,
    datePublished: "2025-06-01",
    videoId: "oK5PvebkvGY",
  });

  const videoJsonLd = buildVideoSchema(`${SITE_URL}/velkomstbonus`, "oK5PvebkvGY", {
    title: "Velkomstbonus på danske casinoer – Hvad du skal vide",
    description: "Jonas gennemgår hvad en velkomstbonus er, de forskellige typer og hvad du skal tjekke inden du aktiverer din første bonus på et dansk casino.",
    uploadDate: "2026-02-20",
    duration: "PT1M30S",
  });

  return (
    <>
      <SEO
        title="Velkomstbonus – Komplet Guide til Casino Velkomstbonusser 2026 | Casinoaftaler"
        description="Velkomstbonus hos danske casinoer 2026 – sammenlign matchbonus, free spins og no-deposit tilbud. Se hvilke bonusser der har de bedste vilkår."
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
              Bonusguide
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Velkomstbonus på Danske Casinoer
            </h1>
            <p className="text-lg text-white/80">
              En velkomstbonus er din bedste ven, når du starter hos et nyt
              casino. Lær hvordan de fungerer, hvilke typer der findes, og
              hvordan du får mest muligt ud af din første indbetaling.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="niklas" readTime="22 Min." />

        <SnippetAnswer answer="En velkomstbonus matcher din første indbetaling – typisk 100% op til 1.000 kr. med 10x omsætningskrav i Danmark. No-sticky versioner giver bedst reel værdi. Sammenlign vilkår nedenfor." />

        <QuickComparisonTable count={3} title="Hurtig sammenligning – Top 3" prioritySlugs={["betinia", "spilleautomaten", "playkasino"]} />

{/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvad er en velkomstbonus?
          </h2>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Din første indbetaling hos et nyt casino afgør hele din bonusoplevelse – og forskellen mellem et godt og et dårligt valg kan være tusindvis af kroner. En velkomstbonus matcher typisk din indbetaling med ekstra penge eller{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">
              gratis spins
            </Link>
            , men vilkårene varierer enormt fra casino til casino.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den mest gængse form er en{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">
              matchbonus (indskudsbonus)
            </Link>
            , hvor casinoet matcher din første indbetaling med en bestemt
            procentdel. Indbetaler du fx 500 kr. med en 100% matchbonus, får
            du 500 kr. ekstra – altså 1.000 kr. i alt at spille for. Alle
            velkomstbonusser kommer med{" "}
            <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
              omsætningskrav
            </Link>
            , som du skal opfylde, før gevinster kan udbetales. Der findes også{" "}
            <Link to="/bonus-uden-indbetaling" className="text-primary underline hover:text-primary/80">
              velkomstbonusser uden indbetaling
            </Link>
            , hvor du slet ikke skal sætte penge ind for at komme i gang.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Velkomstbonussen er blot én af mange bonustyper – i vores{" "}
            <Link to="/casino-bonus" className="text-primary underline hover:text-primary/80">
              komplette bonusoversigt
            </Link>{" "}
            kan du sammenligne alle typer og finde det tilbud, der matcher din spillestil bedst.
          </p>
          <p className="mb-8 text-muted-foreground leading-relaxed">
            Vil du forstå bonusmekanikker i praksis, inden du investerer rigtige penge?
            Prøv vores{" "}
            <Link to="/community/slots" className="text-primary underline hover:text-primary/80">
              gratis spilleautomater i spillehallen
            </Link>
            , hvor du kan opleve free spins og bonusrunder helt risikofrit.
          </p>

          <YoutubeEmbed
            videoId="oK5PvebkvGY"
            title="Hvad er en velkomstbonus på danske casinoer?"
            description="Vi gennemgår hvad en velkomstbonus er, de forskellige typer (matchbonus, free spins, no deposit), hvordan omsætningskrav fungerer, og hvad du skal kigge efter for at vælge den bedste velkomstbonus."
            duration="PT1M11S"
            viewCount={3}
            uploadDate="2026-02-20"
            articleUrl="https://casinoaftaler.dk/velkomstbonus"
          />

          <div className="rounded-lg border border-border bg-muted/30 p-5">
            <h3 className="mb-2 text-lg font-semibold">
              Her gennemgår vores streamer og forfatter Jonas, hvad en velkomstbonus er
            </h3>
            <p className="text-muted-foreground leading-relaxed">
            <Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> gennemgår de fire typer velkomstbonusser, hvad omsætningskrav betyder for bonussens reelle værdi, og hvordan du som ny spiller vælger det rigtige tilbud. Videoen er del af vores bonusunivers med guides om{" "}
              <Link to="/indskudsbonus" className={linkClass}>indskudsbonus</Link>,{" "}
              <Link to="/free-spins" className={linkClass}>free spins</Link> og{" "}
              <Link to="/bonus-uden-indbetaling" className={linkClass}>bonus uden indbetaling</Link>. Se også vores <Link to="/bonus-hunt" className={linkClass}>live bonus hunts</Link>, hvor vi tester velkomstbonusser med reelle indbetalinger – alle resultater dokumenteres i <Link to="/bonus-hunt/arkiv" className={linkClass}>Bonus Hunt Arkivet</Link>.
            </p>
          </div>
        </section>

        <InlineCasinoCards title="Bedste casinoer med velkomstbonus" count={6} />

        <BonusClusterPriorityLinks currentPath="/velkomstbonus" />

        <Separator className="my-10" />

        {/* Typer af velkomstbonusser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Typer af velkomstbonusser</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Velkomstbonusser kommer i flere varianter, og det kan betale sig
            at kende forskellen, så du vælger det tilbud, der passer bedst
            til din spillestil og dit budget.
          </p>

          <ReviewScreenshot
            src={betiniaVelkomstbonus}
            alt="Betinia velkomstbonus aktiveringsflow med 100% op til 1.000 kr. og 3-trins aktivering"
            caption="Velkomstbonus hos Betinia – 3-trins aktivering: indbetal, aktiver bonus og spil"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bonusTypes.map((type) => (
              <Card key={type.id} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <type.icon className="h-5 w-5 text-primary" />
                    {type.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {type.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Regler og betingelser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Regler og betingelser du skal kende
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Alle velkomstbonusser følger med vilkår og betingelser. At forstå
            disse krav er afgørende for at udnytte bonussen optimalt og
            undgå ubehagelige overraskelser undervejs.
          </p>

          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  Omsætningskrav
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
                    Omsætningskravet
                  </Link>{" "}
                  angiver, hvor mange gange bonusbeløbet
                  skal gennemspilles, før gevinster kan udbetales. Får du fx
                  en bonus på 1.000 kr. med 10x omsætningskrav, skal du
                  satse for 10.000 kr. i alt. Kig efter casinoer med lave
                  krav (5-10x) for den bedste værdi, eller overvej en{" "}
                  <Link to="/bonus-uden-omsaetningskrav" className="text-primary underline hover:text-primary/80">
                    bonus uden omsætningskrav
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Indsatsstørrelser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  De fleste bonusser har en maksimal indsats pr. spilrunde –
                  typisk omkring 50 kr. Overskrides denne grænse, risikerer
                  du at miste bonussen og dine gevinster. Hold altid øje
                  med denne begrænsning i bonusvilkårene.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  Tidsgrænser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Velkomstbonusser har altid en tidsbegrænsning for opfyldelse
                  af omsætningskravene – typisk mellem 30 og 60 dage. Når
                  fristen udløber, annulleres bonussen og eventuelle
                  tilknyttede gevinster automatisk.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="h-5 w-5 text-primary" />
                  Profitgrænser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mange casinoer sætter et loft for, hvor meget du kan vinde
                  med bonuspenge. Selvom du rammer en stor gevinst, kan et
                  gevinstloft begrænse det beløb, du faktisk kan udbetale.
                  Tjek altid denne detalje i vilkårene.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Spilbidrag til omsætning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ikke alle spil bidrager ens til{" "}
                  <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
                    omsætningskravet
                  </Link>
                  .
                  Spilleautomater bidrager typisk 100%, mens bordspil som
                  blackjack og roulette kun tæller 10-20%. Live casino-spil
                  kan være helt udelukket. Planlæg din strategi derefter.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <ReviewScreenshot
          src={betiniaBonusvilkaar}
          alt="Betinia bonusvilkår med omsætningskrav på 10x, spilbidrag og maks. indsats på 36 kr."
          caption="Detaljerede bonusvilkår hos Betinia – 10x omsætningskrav med fuld gennemsigtighed"
        />

        <Separator className="my-10" />

        {/* Sådan gør du krav på en velkomstbonus */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan aktiverer du en velkomstbonus
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Processen er enkel og næsten identisk hos alle danske casinoer.
            Følg disse trin for at komme godt i gang med din velkomstbonus.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Trin 1: Vælg det rette casino",
                desc: "Undersøg casinoernes bonusvilkår, spiludbud og anmeldelser. Find det casino med den velkomstbonus, der matcher dine behov – husk at den største bonus ikke nødvendigvis er den bedste.",
                icon: Target,
              },
              {
                title: "Trin 2: Opret din konto",
                desc: "Tilmeld dig hos det valgte casino med dine korrekte personoplysninger. Det er vigtigt at indtaste nøjagtige data for at undgå problemer ved verifikation og senere udbetalinger.",
                icon: Users,
              },
              {
                title: "Trin 3: Bekræft din identitet",
                desc: "De fleste danske casinoer kræver identitetsverifikation via MitID eller e-mail-bekræftelse. Dette sikrer et trygt spilmiljø og er lovpligtigt i Danmark.",
                icon: ShieldCheck,
              },
              {
                title: "Trin 4: Foretag din første indbetaling",
                desc: "Vælg din foretrukne betalingsmetode og indbetal mindst minimumsbeløbet. Bonussen aktiveres typisk automatisk ved indbetalingen – tjek om der kræves en bonuskode.",
                icon: CreditCard,
              },
              {
                title: "Trin 5: Begynd at spille",
                desc: "Udforsk casinoets spiludbud og brug dine bonusmidler strategisk. Vælg spil med høj RTP og husk at tjekke, hvilke spil der bidrager fuldt til omsætningskravet.",
                icon: Gamepad2,
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

        <ReviewScreenshot
          src={kapowVelkomstbonus}
          alt="Kapow Casino bonusvalg ved registrering med 100 spins til Gates of Olympus og toggle til at fortsætte uden bonus"
          caption="Bonusvalg ved oprettelse – her vælger du aktivt din velkomstbonus eller fortsætter uden"
          size="full"
        />

        <Separator className="my-10" />

        {/* Hvilke spil */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvilke spil kan du spille med en velkomstbonus?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            De fleste online casinoer tillader brug af bonuspenge på et
            bredt udvalg af spilleautomater – herunder populære titler som
            Starburst, Book of Dead og Gonzo's Quest. Spilleautomater
            bidrager typisk 100% til omsætningskravet, hvilket gør dem til
            det mest effektive valg under bonusspil.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bordspil som blackjack, roulette og baccarat er ofte tilladte,
            men bidrager kun delvist – typisk 10-20% – til omsætningen.
            Det betyder, at det tager væsentligt længere tid at opfylde
            kravene, hvis du primært spiller bordspil.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Live casino-spil er i nogle tilfælde helt udelukket fra
            bonusspil. Tjek altid de specifikke vilkår for den bonus, du
            aktiverer, så du undgår at spille på spil, der ikke tæller med.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Sammenligning med andre bonusser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Velkomstbonus vs. andre bonustyper
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Der findes mange forskellige bonusser i casinoverdenen. Her er
            en oversigt over, hvordan velkomstbonussen adskiller sig fra de
            øvrige typer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  <Link to="/reload-bonus" className="text-primary underline hover:text-primary/80">Reload-bonus</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Gives ved efterfølgende indbetalinger og er typisk mindre
                  generøs end velkomstbonussen. Til gengæld kan
                  omsætningskravene være mere lempelige, og de er
                  tilgængelige for eksisterende kunder. Læs vores{" "}
                  <Link to="/reload-bonus" className="text-primary underline hover:text-primary/80">komplette reload bonus guide</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="h-5 w-5 text-primary" />
                  No Deposit Bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Helt risikofri, da du ikke skal indbetale noget. Til
                  gengæld er bonusbeløbene små, og{" "}
                  <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
                    omsætningskravene
                  </Link>{" "}
                  ofte højere. Ideel til at afprøve et casino uden økonomisk
                  forpligtelse. Læs mere i vores guide til{" "}
                  <Link to="/bonus-uden-indbetaling" className="text-primary underline hover:text-primary/80">
                    bonus uden indbetaling
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <Link to="/cashback-bonus" className="text-primary underline hover:text-primary/80">Cashback-bonus</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Giver dig en procentdel af dine tab tilbage som
                  bonuspenge. Disse bonusser tilbyder ikke den samme
                  øjeblikkelige boost som en velkomstbonus, men hjælper med
                  at minimere tab over tid. Se vores{" "}
                  <Link to="/cashback-bonus" className="text-primary underline hover:text-primary/80">cashback bonus guide</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Free Spins
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Gratis omgange på spilleautomater. Kan indgå som en del
                  af velkomstpakken eller tilbydes separat. Ideelle til at
                  prøve nye spil uden at satse egne penge. Læs vores{" "}
                  <Link to="/free-spins" className="text-primary underline hover:text-primary/80">
                    komplette guide til free spins
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Hvem er det for */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvem er velkomstbonussen for?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Velkomstbonusser henvender sig primært til nye spillere, der
            ønsker en stærk start hos et nyt casino. De giver dig
            mulighed for at udforske casinoets platform og spiludbud med
            ekstra midler, så du kan finde dine favoritspil uden at
            bruge for mange af dine egne penge.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Desuden er velkomstbonusser attraktive for spillere, der ønsker
            at maksimere værdien af deres første indbetaling. Selvom VIP-
            og high roller-spillere ofte foretrækker skræddersyede tilbud,
            er velkomstbonussen det ideelle udgangspunkt for alle, der vil
            have mest muligt ud af deres casinooplevelse fra dag ét.
          </p>
        </section>

        <Separator className="my-10" />

        {/* EV-analyse af velkomstbonus */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            EV-analyse: Hvad er din velkomstbonus reelt værd?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Velkomstbonussens nominelle værdi (f.eks. "1.000 kr.") er næsten aldrig den reelle værdi. For at beregne Expected Value (EV) skal du indregne omsætningskrav, <Link to="/ordbog/rtp" className={linkClass}>RTP</Link> og bonusstruktur. Her er de tre mest almindelige velkomstbonus-pakker sammenlignet.
          </p>

          <div className="space-y-4">
            <Card className="border-primary/30 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-primary" />
                  100% match op til 1.000 kr. + 50 free spins (no-sticky, 5x)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Match-EV:</strong> 1.000 kr. bonus, 5x omsætning = 5.000 kr. omsætning. Tab: 5.000 × 0,04 = 200 kr. No-sticky: bonus er separat, egne gevinster frie. <strong>Match-EV = 800 kr.</strong>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Free spins-EV:</strong> 50 spins á 2 kr. = 100 kr. × 0,96 = 96 kr. Med 5x omsætning: tab 96 × 5 × 0,04 = 19,20 kr. <strong>Spins-EV = 76,80 kr.</strong>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Total pakke-EV = 876,80 kr.</strong> af 1.100 kr. nominel værdi (79,7% reel værdi). Dette er en Elite-pakke.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-primary" />
                  100% match op til 1.000 kr. (<Link to="/sticky-bonus" className={linkClass}>sticky</Link>, 10x d+b)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Beregning:</strong> 1.000 kr. indbetaling + 1.000 kr. bonus = 2.000 kr. saldo. Omsætning: 10x × 2.000 = 20.000 kr. Tab: 20.000 × 0,04 = 800 kr. Saldo: 2.000 – 800 = 1.200 kr. Minus bonus: 1.200 – 1.000 = <strong>+200 kr. EV</strong>.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Konklusion:</strong> Sticky 10x (d+b) med 100% match giver svag positiv EV. Men du kan ikke hæve dine egne penge undervejs – alt er låst til omsætningen er fuldført. Den no-sticky 100%-pakke ovenfor er markant bedre pga. fleksibiliteten.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 rounded-lg border border-primary/30 bg-accent/30 p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Tommelfingerregel:</strong> En velkomstbonus med no-sticky struktur og ≤5x omsætning er næsten altid bedre end en sticky bonus med højere beløb. Bonus-%, omsætningskrav og sticky/no-sticky struktur skal ALLE vurderes samlet – aldrig isoleret. Se vores <Link to="/casino-bonus" className={linkClass}>bonusoversigt</Link> for aktuelle sammenligninger.
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Spillerprofiler */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvilken velkomstbonus passer til din spillertype?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Ny spiller", desc: "Start med en no-deposit bonus eller en lav-risiko velkomstbonus (100% match, no-sticky, ≤5x). Fokus bør være på at lære platformen, ikke på at jage omsætningskrav. En bonus uden indbetaling er det sikreste valg.", icon: User },
              { title: "Slot-entusiast", desc: "Vælg velkomstbonusser med mange free spins på høj-RTP slots. En pakke med 100 omsætningsfrie spins á 2 kr. er mere værd end en standard matchbonus med høje krav. Spinværdi og omsætningskrav er dine nøgletal.", icon: Sparkles },
              { title: "Strategisk spiller", desc: "Prioritér no-sticky bonus med lavest mulig omsætning. Beregn EV før accept. Den matematisk optimale strategi er at spille egne penge først (no-sticky), og kun bruge bonusmidler hvis du allerede er foran.", icon: Target },
              { title: "High Roller", desc: "Kontakt casinoets VIP-afdeling. Standard velkomstbonusser (max 1.000 kr.) er ofte utilstrækkelige for high roller-budgetter. Nogle casinoer kan tilbyde skræddersyede vilkår inden for lovens rammer.", icon: TrendingUp },
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

        {/* Velkomstbonus markedsoverblik */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Velkomstbonus i Danmark 2026 – Sådan vælger du den bedste
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I 2026 tilbyder næsten alle danske casinoer en velkomstbonus til nye spillere. Konkurrencen om at tilbyde den bedste velkomstbonus er hårdere end nogensinde, hvilket er godt nyt for spillerne. Den typiske velkomstbonus på det danske marked er en 100% matchbonus op til 1.000 kr. (lovpligtigt maksimum), ofte kombineret med <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link> på populære spilleautomater.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Når du vælger en velkomstbonus, bør du fokusere på vilkårene frem for bonusbeløbet alene. En velkomstbonus på 1.000 kr. med 5x omsætningskrav er langt mere værdifuld end en velkomstbonus på 1.000 kr. med 10x (d+b) krav. Kig efter velkomstbonusser med <Link to="/no-sticky-bonus" className="text-primary underline hover:text-primary/80">no-sticky struktur</Link>, da de giver dig fleksibilitet til at hæve gevinster fra dine egne penge uden omsætningskrav.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En velkomstbonus er din eneste chance for at få det bedste tilbud fra et casino, da den kun kan bruges én gang. Derfor anbefaler vi at sammenligne velkomstbonusser grundigt, før du vælger. Overvej hvilken bonustype der passer bedst til din spillestil: En ren matchbonus giver mest ekstra spillekapital, mens en velkomstbonus med free spins er ideel, hvis du elsker spilleautomater.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Husk også at tjekke, om velkomstbonussen er en <Link to="/sticky-bonus" className="text-primary underline hover:text-primary/80">sticky bonus</Link> eller en no-sticky bonus, da dette har stor betydning for, hvordan du kan bruge dine gevinster. De bedste velkomstbonusser i Danmark 2026 kombinerer en generøs matchprocent, lave <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link>, og no-sticky struktur – og vi opdaterer løbende vores liste, så du altid finder det bedste tilbud.
          </p>
        </section>

        <Separator className="my-10" />
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Første indbetaling kræver eftertanke</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En velkomstbonus er designet til at motivere din første indbetaling – og netop derfor bør du stoppe op og vurdere, om beløbet passer dit budget. Indbetal aldrig mere end du ville have gjort uden bonussen. Din spilleglæde bør aldrig afhænge af et bonustilbud.
          </p>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Hjælp og ressourcer</h3>
                <p className="text-sm text-muted-foreground">
                  Kontakt{" "}
                  <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>{" "}
                  for fortrolig rådgivning, eller registrer dig i{" "}
                  <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>{" "}
                  for selvudelukkelse. Alle danske casinoer med licens tilbyder værktøjer til ansvarligt spil. 18+ | Spil ansvarligt.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Flertrinspakker analyseret */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Flertrinspakker vs. enkeltbonus: Hvad giver mest værdi?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Mange danske casinoer tilbyder nu velkomstpakker fordelt over 2-4 indbetalinger. Spørgsmålet er: giver en flertrinspakke mere reel værdi end en enkeltstående velkomstbonus? Svaret afhænger af din spillestil, dit budget og din tålmodighed. Her er en matematisk sammenligning.
          </p>
          <div className="space-y-4">
            <Card className="border-primary/30 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-primary" />
                  Enkeltstående: 100% match op til 1.000 kr. (10x d+b)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Beregning:</strong> 1.000 kr. indbetaling + 1.000 kr. bonus = 2.000 kr. saldo. Omsætning: 10 × 2.000 = 20.000 kr. Tab: 20.000 × 0,04 = 800 kr. Saldo: 2.000 – 800 = 1.200 kr. Minus bonus: <strong>EV = 200 kr.</strong> (20% af nominel bonusværdi).
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Fordel:</strong> Alt overstået i én indbetaling. <strong>Ulempe:</strong> Høj total omsætning (20.000 kr.) og betydeligt tidskrav (~5-6 timer spilletid).
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ListChecks className="h-5 w-5 text-primary" />
                  Flertrinspakke: 3 × 100% match á 500 kr. (5x b)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Per trin:</strong> 500 kr. indbetaling + 500 kr. bonus. Omsætning: 5 × 500 = 2.500 kr. Tab: 2.500 × 0,04 = 100 kr. <strong>EV per trin = 400 kr.</strong> (80% af nominel værdi). <strong>Total EV over 3 trin = 1.200 kr.</strong>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Fordel:</strong> 3x højere total EV, lavere risiko per session, fleksibilitet til at stoppe. <strong>Ulempe:</strong> Kræver tre separate indbetalinger og mere tid totalt.
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            <strong>Konklusion:</strong> Flertrinspakker med lavere omsætning per trin er næsten altid matematisk overlegne. Dog kræver de disciplin: du skal faktisk gennemføre alle trin og undgå fristelsen til at indbetale for meget på ét trin. Hvis du foretrækker enkelhed, er en enkeltstående bonus med no-sticky struktur og ≤5x omsætning det bedste kompromis.
          </p>
        </section>

        <Separator className="my-10" />

        {/* International sammenligning */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            International sammenligning: Danske vs. udenlandske velkomstbonusser
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Danmark tilbyder nogle af verdens bedste velkomstbonusser – ikke pga. de højeste beløb, men pga. de mest spillervenlige vilkår. Her er en sammenligning der illustrerer forskellen:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg border border-border text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-3 text-left font-semibold">Parameter</th>
                  <th className="border border-border p-3 text-left font-semibold">🇩🇰 Dansk casino</th>
                  <th className="border border-border p-3 text-left font-semibold">🇲🇹 MGA casino</th>
                  <th className="border border-border p-3 text-left font-semibold">🇨🇼 Curaçao casino</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3 font-medium">Typisk matchbonus</td>
                  <td className="border border-border p-3 text-muted-foreground">100% op til 1.000 kr.</td>
                  <td className="border border-border p-3 text-muted-foreground">100-200% op til €500</td>
                  <td className="border border-border p-3 text-muted-foreground">200-400% op til €2.000</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-3 font-medium">Omsætningskrav</td>
                  <td className="border border-border p-3 text-muted-foreground">5-10x (max 10x)</td>
                  <td className="border border-border p-3 text-muted-foreground">30-50x</td>
                  <td className="border border-border p-3 text-muted-foreground">40-70x</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-medium">Reel EV (1.000 kr.)</td>
                  <td className="border border-border p-3 text-muted-foreground"><strong>200-600 kr.</strong></td>
                  <td className="border border-border p-3 text-muted-foreground">-200 til 100 kr.</td>
                  <td className="border border-border p-3 text-muted-foreground">-1.000 til -400 kr.</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-3 font-medium">Skattefrihed</td>
                  <td className="border border-border p-3 text-muted-foreground">✅ Altid</td>
                  <td className="border border-border p-3 text-muted-foreground">❌ Skattepligtig</td>
                  <td className="border border-border p-3 text-muted-foreground">❌ Skattepligtig</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-medium">Spillerbeskyttelse</td>
                  <td className="border border-border p-3 text-muted-foreground">✅ ROFUS + Spillemyndigheden</td>
                  <td className="border border-border p-3 text-muted-foreground">⚠️ Begrænset</td>
                  <td className="border border-border p-3 text-muted-foreground">❌ Minimal</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            <strong>Perspektiv:</strong> En dansk velkomstbonus på 1.000 kr. med 10x omsætning er reelt langt mere værd end selv store udenlandske bonusser med markant højere omsætningskrav. Den danske bonus giver dig ~600 kr. reel EV skattefrit, mens udenlandske bonusser typisk giver statistisk tab OG skattepligt på eventuelle gevinster. Størrelse er ikke alt – vilkårene er det.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Velkomstbonus og ansvarligt spil */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Velkomstbonus og ansvarlig spiladfærd
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En velkomstbonus er designet til at motivere din første indbetaling – og netop derfor bør du stoppe op og vurdere, om beløbet passer dit budget. Indbetal aldrig mere end du ville have gjort uden bonussen. Dit spillebudget bør fastlægges uafhængigt af bonustilbuddet. Casinoernes "match op til X kr."-formulering skaber et psykologisk pres for at maksimere bonussen, men det er sjældent den klogeste strategi.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Det bedste tidspunkt at vurdere en bonus:</strong> Før du overhovedet opretter en konto, bør du have besluttet: 1) Hvad er mit maksimale spillebudget? 2) Er jeg klar til at gennemspille omsætningskravene? 3) Passer bonustypen (<Link to="/sticky-bonus" className={linkClass}>sticky</Link> vs. <Link to="/no-sticky-bonus" className={linkClass}>no-sticky</Link>) min spillestil? Kan du ikke besvare alle tre spørgsmål, er du ikke klar til at tage imod en velkomstbonus.
          </p>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Hjælp og ressourcer</h3>
                <p className="text-sm text-muted-foreground">
                  Kontakt{" "}
                  <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>{" "}
                  for fortrolig rådgivning, eller registrer dig i{" "}
                  <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>{" "}
                  for selvudelukkelse. 18+ | Spil ansvarligt.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Unik konklusion: Checklist */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Din velkomstbonus-checklist: Fem trin til det rigtige valg</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Før du accepterer en velkomstbonus, bør du gennemgå denne checklist. Hvert trin tager under ét minut – samlet kan de fem minutter spare dig for hundredvis af kroner i tabte bonusser og frustrerede spillesessioner.
          </p>
          <div className="space-y-3">
            {[
              {
                icon: Calculator,
                title: "Trin 1: Beregn den reelle EV",
                desc: "Brug formlen: EV = Bonusbeløb – (Total omsætning × House Edge). Hvis EV er under 30% af bonusbeløbet, er bonussen sandsynligvis ikke værd at tage. Husk at skelne mellem (b) og (d+b) omsætning – forskellen kan være tusindvis af kroner.",
              },
              {
                icon: Lock,
                title: "Trin 2: Identificer bonusstruktur",
                desc: "Er det sticky eller no-sticky? No-sticky giver dig frit spil med egne penge først og er 2-3x mere værdifuld. Finder du ikke ordet 'no-sticky' eller 'forfeitable' i vilkårene, er bonussen sticky som standard.",
              },
              {
                icon: Clock,
                title: "Trin 3: Tjek tidsfristen",
                desc: "Har du realistisk tid til at gennemspille omsætningen inden for fristen? 10x (d+b) på 1.000 kr. bonus kræver 20.000 kr. omsætning = ~5-6 timer spilletid. Med 14 dages frist er det overkommeligt; med 3 dage kan det blive stressende.",
              },
              {
                icon: Gamepad2,
                title: "Trin 4: Verificer spilkompatibilitet",
                desc: "Spiller du primært slots? Perfekt – de bidrager 100%. Bordspil? Kun 10%. Live casino? Ofte 0%. Vælg kun en velkomstbonus, hvis dine foretrukne spil bidrager effektivt til omsætningen.",
              },
              {
                icon: ShieldCheck,
                title: "Trin 5: Fastlæg dit budget FØRST",
                desc: "Bestem hvor meget du ville have indbetalt UDEN bonussen. Indbetal præcis dette beløb. Bonussen er en ekstra fordel, ikke en grund til at ændre dit budget. Denne ene regel beskytter dig mod de fleste bonusfælder.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-lg border border-primary/30 bg-accent/30 p-4"
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

        <LiveCommunityDataStrip context="bonus" />
        <LatestNewsByCategory pagePath="/velkomstbonus" />
        <BonusMoneyLinks currentPath="/velkomstbonus" />
        <RelatedGuides currentPath="/velkomstbonus" />

        <FAQSection title="Ofte stillede spørgsmål om velkomstbonus" faqs={velkomstbonusFaqs} />

        <AuthorBio author="niklas" />
      </div>
      <StickyCtaBySlug slug="betinia" />
    </>
  );
};

export default Velkomstbonus;
