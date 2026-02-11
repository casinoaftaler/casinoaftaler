import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
  RefreshCw,
  Lock,
  TrendingUp,
  CreditCard,
  Scale,
  Ban,
  BarChart3,
  Percent,
  Zap,
  Eye,
  Heart,
  Users,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";

const faqs = [
  {
    question: "Hvad er en casino bonus uden omsætningskrav?",
    answer:
      "En casino bonus uden omsætningskrav er en type bonus, hvor spillerne ikke behøver at omsætte beløbet et bestemt antal gange, før de kan udbetale deres gevinster. Det betyder, at alt hvad du vinder med denne bonus, kan hæves uden at skulle omsætte bonussen x antal gange.",
  },
  {
    question: "Hvorfor tilbyder nogle casinoer bonusser uden omsætningskrav?",
    answer:
      "Casinoer tilbyder bonusser uden omsætningskrav for at tiltrække nye spillere og skille sig ud fra konkurrenterne. Det er en måde at vise gennemsigtighed og fairness over for spillerne, da det giver dem en reel chance for at beholde deres gevinster uden skjulte betingelser.",
  },
  {
    question: "Er der ulemper ved casino bonusser uden omsætningskrav?",
    answer:
      "En potentiel ulempe er, at værdien af disse bonusser ofte kan være lavere end for traditionelle bonusser med omsætningskrav. Desuden kan nogle tilbud have andre begrænsninger, såsom en maksimal udbetalingsgrænse eller begrænsninger på, hvilke spil du kan bruge bonussen til.",
  },
  {
    question:
      "Hvordan finder jeg casinoer, der tilbyder bonusser uden omsætningskrav?",
    answer:
      "Det bedste sted at starte er ved at undersøge casinoer med dansk licens, der specifikt markedsfører omsætningsfrie bonusser. Hold øje med kampagner, loyalitetsprogrammer og ugentlige udfordringer, som ofte belønner med bonusser uden omsætningskrav.",
  },
  {
    question:
      "Kan jeg virkelig vinde rigtige penge med en casino bonus uden omsætningskrav?",
    answer:
      "Ja, du kan vinde rigtige penge med en casino bonus uden omsætningskrav. Da der ikke er nogen omsætningskrav, betyder det, at du kan hæve dine gevinster med det samme, forudsat at du overholder casinoets øvrige vilkår og betingelser.",
  },
  {
    question:
      "Er alle spil berettiget til at blive spillet med en casino bonus uden omsætningskrav?",
    answer:
      "Det afhænger af casinoets regler og vilkår. Nogle casinoer tillader kun visse spil at blive spillet med bonussen, mens andre kan have mere fleksible regler. Det er vigtigt at læse vilkårene nøje, før du accepterer en bonus.",
  },
];

const BonusUdenOmsaetningskrav = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Bonus uden Omsætningskrav – Komplet Guide 2026",
    description: "Alt du skal vide om bonusser uden omsætningskrav på danske casinoer. Fordele, typer og tips.",
    author: { "@type": "Organization", name: "Casinoaftaler" },
    publisher: { "@type": "Organization", name: "Casinoaftaler" },
    datePublished: "2025-06-01",
    dateModified: "2026-02-11",
    mainEntityOfPage: "https://bonushuset-buddy.lovable.app/bonus-uden-omsaetningskrav",
  };

  return (
    <>
      <Helmet>
        <title>Bonus uden Omsætningskrav – Komplet Guide 2026 | Casinoaftaler</title>
        <meta
          name="description"
          content="Alt du skal vide om bonusser uden omsætningskrav på danske casinoer. Hvad de er, hvordan de fungerer, fordele, og hvordan du finder de bedste tilbud."
        />
        <link rel="canonical" href="https://bonushuset-buddy.lovable.app/bonus-uden-omsaetningskrav" />
        <meta property="og:title" content="Bonus uden Omsætningskrav – Komplet Guide 2026" />
        <meta
          property="og:description"
          content="Alt du skal vide om bonusser uden omsætningskrav på danske casinoer. Fordele, typer og tips."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bonushuset-buddy.lovable.app/bonus-uden-omsaetningskrav" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      </Helmet>

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
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Bonus uden Omsætningskrav
            </h1>
            <p className="text-lg text-white/80">
              En bonus uden omsætningskrav er et casinotilbud, hvor gevinster
              vundet med bonusmidlerne kan hæves med det samme. Lær hvordan de
              fungerer, og hvordan du finder de bedste tilbud.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        {/* Meta info bar */}
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>
              Skrevet af:{" "}
              <span className="font-medium text-foreground">Casinoaftaler</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>
              Siden opdateret:{" "}
              <span className="font-medium text-foreground">11-02-2026</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>
              Læsetid:{" "}
              <span className="font-medium text-foreground">10 Min.</span>
            </span>
          </div>
        </div>

        {/* Hvad er omsætningskrav */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Forståelse af hvad omsætningskrav er
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Et{" "}
            <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
              omsætningskrav
            </Link>{" "}
            er et vilkår sat af casinoer. Det angiver, hvor mange gange du
            skal spille din bonus igennem, før du kan hæve dine gevinster.
            Modtager du f.eks. en bonus på 100 kr. med et omsætningskrav på
            10x, skal du spille for 1.000 kr., før eventuelle gevinster kan
            udbetales.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Omsætningskrav gælder for de fleste bonustyper – herunder{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">
              velkomstbonusser
            </Link>
            ,{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">
              indskudsbonusser
            </Link>{" "}
            og{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">
              free spins
            </Link>
            . Vil du undgå dem helt, er en{" "}
            <Link to="/no-sticky-bonus" className="text-primary underline hover:text-primary/80">
              no-sticky bonus
            </Link>{" "}
            eller en{" "}
            <Link to="/bonus-uden-indbetaling" className="text-primary underline hover:text-primary/80">
              bonus uden indbetaling
            </Link>{" "}
            med 0x krav et godt alternativ.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Hvad betyder det */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvad betyder det at en bonus er uden omsætningskrav?
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            En bonus uden omsætningskrav fjerner hindringen ved
            gennemspilningskrav. Det betyder i praksis, at alle gevinster fra
            bonusmidlerne tilhører dig fra det øjeblik, de rammer din konto.
          </p>

          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Du beholder alt, du vinder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Fra det øjeblik bonusmidlerne rammer din konto, tilhører
                  eventuelle gevinster fra disse midler dig, uden at du skal
                  gennemspille et bestemt beløb først. Du kan hæve dine
                  gevinster med det samme.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="h-5 w-5 text-primary" />
                  Gennemsigtighed og fairness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Denne type bonus er en tydelig indikation af casinoets
                  engagement i gennemsigtighed og fair spil, hvilket tilbyder
                  en mere ligefrem spiloplevelse uden skjulte betingelser.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-primary" />
                  Afslappet spilleoplevelse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Du slipper for at holde styr på, hvor tæt eller langt du er
                  fra at opfylde omsætningskravene. Det sikrer en langt mere
                  afslappet spilleoplevelse, hvor du ikke behøver bekymre dig
                  om, hvad der kan spænde ben for din udbetaling.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Sådan spotter du */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan spotter du en bonus uden omsætningskrav
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Det første skridt er altid at læse de fulde vilkår og betingelser.
            Danske casinoer er forpligtede til at oplyse grundigt om
            betingelserne for deres tilbud. Hold øje med følgende nøgleord og
            indikatorer.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Kig efter nøgleord",
                desc: "Hold øje med udtryk som 'ingen omsætningskrav', 'omsætningsfri' eller 'uden gennemspilskrav'. Disse indikerer, at bonussen ikke kræver gennemspilning.",
                icon: Target,
              },
              {
                title: "Tjek omsætningskravet",
                desc: "I betingelserne vil omsætningskravet normalt være angivet med et tal efterfulgt af 'x'. Hvis der står '0x' eller det ikke er nævnt, kan det tyde på ingen omsætningskrav.",
                icon: BarChart3,
              },
              {
                title: "Læs det med småt",
                desc: "Vær opmærksom på andre betingelser som tidsbegrænsninger, maksimale gevinstgrænser og hvilke spil der kan spilles med bonusmidlerne.",
                icon: BookOpen,
              },
              {
                title: "Kontakt kundeservice",
                desc: "Hvis betingelserne er uklare, kan du altid kontakte casinoets kundeservice for at få en klar bekræftelse på, om bonussen er uden omsætningskrav.",
                icon: Users,
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

        {/* Typer af bonusser uden omsætningskrav */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Bonustyper du typisk ser uden omsætningskrav
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Hvor man finder bonusser uden omsætningskrav varierer fra casino til
            casino. Dog er der nogle bonustyper, som man støder på oftere end
            andre.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="h-5 w-5 text-primary" />
                  Velkomstbonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Den klassiske velkomstbonus, hvor man modtager bonussen i
                  form af bonuspenge eller gratis spins. Nogle casinoer
                  tilbyder disse helt uden omsætningskrav som en ekstra
                  attraktion for nye spillere.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Gratis spins
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Free spins uden omsætningskrav er meget populære. Du modtager
                  et antal gratis spins, hvor alt hvad du vinder kan hæves med
                  det samme, uden gennemspilning.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  Cashback bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ved cashback bonusser giver casinoet dig en procentdel af
                  dine tab tilbage. Det tilbagebetalte beløb er som regel
                  også fri for omsætningskrav, så du kan udbetale det med
                  det samme.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="h-5 w-5 text-primary" />
                  Loyalitetsbonusser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Disse bonusser tildeles spillere i casinoets
                  loyalitetsprogram eller VIP-klub som belønning for
                  spilaktivitet. De tilbydes ofte via kampagner, mails
                  eller bonuskoder.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Regler og overvejelser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Regler og overvejelser ved bonusser uden omsætningskrav
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Selvom "uden omsætningskrav" lyder som fuldkommen frihed, er der
            stadig visse standarder og regler, du skal være opmærksom på.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Minimumsindbetaling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  For at låse op for din bonus uden omsætningskrav, skal du
                  som regel foretage en minimumsindbetaling. Beløbet varierer
                  fra casino til casino, men det er typisk mellem 50-200 kr.
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
                  Selv den bedste bonus har en udløbsdato. Du vil typisk have
                  en begrænset periode til at gøre krav på din bonus og bruge
                  den, før den udløber automatisk.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Ban className="h-5 w-5 text-primary" />
                  Spilbegrænsninger
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ikke alle spil er berettigede. Nogle spil kan være helt
                  udelukket, så det er vigtigt at kende reglerne, så du
                  ikke spiller det forkerte spil med dine bonuspenge.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="h-5 w-5 text-primary" />
                  Udbetalingsgrænser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Der kan være en grænse for, hvor meget du kan hæve fra dine
                  gevinster. Det er vigtigt at kende disse grænser, så dine
                  forventninger stemmer overens med realiteterne.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Sammenligning */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Med vs. uden omsætningskrav
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Når man sammenligner bonusser uden omsætningskrav med traditionelle
            bonusser, afhænger valget af din prioritet som spiller. Her er
            fordele og ulemper ved begge typer.
          </p>

          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Uden omsætningskrav
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Giver øjeblikkelig værdi, da gevinster kan hæves med det
                  samme. Fjerner den tidskrævende proces med at opfylde
                  gennemspilningskrav. Perfekt for spillere, der værdsætter
                  enkelhed og hurtig adgang til gevinster.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Percent className="h-5 w-5 text-primary" />
                  Med omsætningskrav
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Kan tilbyde større bonusbeløb og flere fordele, da casinoet
                  har sikkerhed gennem omsætningskravet. Tiltaler spillere, der
                  planlægger at spille meget, og som normalt ser omsætningskrav
                  som en del af deres spiladfærd.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Hvem er det bedst egnet til */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvem er bonusser uden omsætningskrav bedst egnet til?
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Bonusser uden omsætningskrav appellerer bredt, men de er især
            fordelagtige for bestemte typer af spillere.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Nye spillere",
                desc: "En fantastisk måde at udforske forskellige spil på, uden at bekymre sig om komplekse omsætningskrav.",
                icon: Sparkles,
              },
              {
                title: "Forsigtige spillere",
                desc: "Spillere med et stramt budget, der foretrækker at minimere risici, vil finde disse bonusser særligt attraktive.",
                icon: ShieldCheck,
              },
              {
                title: "Spillere der foretrækker enkelhed",
                desc: "Direkte adgang til gevinster uden at navigere gennem komplekse bonusvilkår.",
                icon: Target,
              },
              {
                title: "Tidssensitive spillere",
                desc: "Spillere, der ikke har tiden eller tålmodigheden til at opfylde omsætningskrav, får en hurtigere vej til gevinster.",
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

        {/* Ansvarligt spil */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Spil ansvarligt – også med bonusser uden omsætningskrav
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Selv med bonusser uden omsætningskrav er det vigtigt, at spillet
            forbliver underholdning og aldrig går ud over din personlige trivsel
            eller økonomiske sundhed.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Selvvurdering",
                desc: "Vær opmærksom på dine spillevaner og benyt online selvtests til at vurdere dit forhold til spil.",
                icon: TrendingUp,
              },
              {
                title: "Sæt et budget",
                desc: "Fastlæg et spillebudget og se det som underholdning, ikke indtjening. Hold dig altid til dit budget.",
                icon: Scale,
              },
              {
                title: "Brug selvudelukkelse",
                desc: "Brug casinoets værktøjer som ROFUS (Register Over Frivilligt Udelukkede Spillere) eller midlertidige pauser ved behov.",
                icon: ShieldCheck,
              },
              {
                title: "Søg hjælp ved behov",
                desc: "Søg rådgivning gennem StopSpillet.dk, kontakt casinoets kundeservice, eller tal åbent med dine nærmeste om dine spillevaner.",
                icon: Heart,
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

        {/* Opsummering */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Opsummering</h2>
          <div className="space-y-3">
            {[
              {
                icon: CheckCircle2,
                title: "Øjeblikkelig adgang til gevinster",
                desc: "Bonusser uden omsætningskrav lader dig hæve dine gevinster med det samme, uden gennemspilning.",
              },
              {
                icon: AlertTriangle,
                title: "Læs altid betingelserne",
                desc: "Selv uden omsætningskrav kan der være andre vilkår som tidsbegrænsninger, udbetalingsgrænser og spilbegrænsninger.",
              },
              {
                icon: Scale,
                title: "Vælg efter din spillestil",
                desc: "Foretrækker du enkelhed og hurtig udbetaling, er bonusser uden omsætningskrav det rette valg for dig.",
              },
              {
                icon: ShieldCheck,
                title: "Spil altid ansvarligt",
                desc: "Sæt et budget, benyt hjælpeværktøjer som StopSpillet.dk og ROFUS, og husk at spil skal være underholdning.",
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

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            <HelpCircle className="mr-2 inline h-7 w-7 text-primary" />
            Ofte stillede spørgsmål
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="rounded-lg border border-border bg-card px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <RelatedGuides currentPath="/bonus-uden-omsaetningskrav" />
      </div>
    </>
  );
};

export default BonusUdenOmsaetningskrav;
