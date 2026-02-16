import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
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
  Shield,
  Users,
  Award,
  Target,
  HelpCircle,
  User,
  CalendarDays,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Search,
  RefreshCw,
  Gamepad2,
  Scale,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import aboutHero from "@/assets/heroes/about-hero.jpg";
import { RelatedGuides } from "@/components/RelatedGuides";

const values = [
  {
    icon: Shield,
    name: "Gennemsigtighed",
    description:
      "Vi forklarer tydeligt alle bonusvilkår, herunder gennemspilskrav, spilrestriktioner og udbetalingsgrænser. Du skal aldrig blive overrasket af skjulte betingelser.",
  },
  {
    icon: Users,
    name: "Spilleren Først",
    description:
      "Vores anmeldelser prioriterer spilleroplevelsen med fokus på bonusser, der tilbyder ægte værdi og fair betingelser. Vi anbefaler kun casinoer, vi selv ville spille på.",
  },
  {
    icon: Award,
    name: "Ekspertise",
    description:
      "Vores team har mange års erfaring i iGaming-branchen og bringer dyb viden til hver anmeldelse. Vi kender branchens faldgruber og hjælper dig med at undgå dem.",
  },
  {
    icon: Target,
    name: "Uafhængighed",
    description:
      "Vores anmeldelser er upartiske. Vi modtager muligvis provision, men dette påvirker aldrig vores vurderinger eller anbefalinger. Integritet er vores fundament.",
  },
];

const reviewSteps = [
  {
    icon: ShieldCheck,
    title: "Trin 1: Licens & Sikkerhedstjek",
    desc: "Vi verificerer, at hvert casino har gyldige licenser fra Spillemyndigheden og bruger branchestandarder for sikkerhedsforanstaltninger.",
  },
  {
    icon: Search,
    title: "Trin 2: Bonusanalyse",
    desc: "Vi analyserer grundigt bonusvilkår, gennemspilskrav, spilbidrag og tidsgrænser for at vurdere den reelle værdi for spillere.",
  },
  {
    icon: Gamepad2,
    title: "Trin 3: Test af Spilleroplevelse",
    desc: "Vi tester registreringsprocessen, indbetalingsmetoder, spiludvalg og kundesupport for at sikre en kvalitetsoplevelse.",
  },
  {
    icon: RefreshCw,
    title: "Trin 4: Løbende Overvågning",
    desc: "Vi opdaterer løbende vores anmeldelser for at afspejle ændringer i bonusvilkår, spillerfeedback og casinoets omdømme.",
  },
];

const About = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Om Casinoaftaler.dk – Din Guide til Danske Casinobonusser",
    description:
      "Lær mere om Casinoaftaler.dk, vores mission, værdier og hvordan vi anmelder danske online casinoer.",
    author: { "@type": "Organization", name: "Casinoaftaler" },
    publisher: { "@type": "Organization", name: "Casinoaftaler" },
    datePublished: "2025-06-01",
    dateModified: "2026-02-11",
    mainEntityOfPage: "https://casinoaftaler.dk/om",
  };

  const aboutFaqs = [
    {
      question: "Er Casinoaftaler.dk uafhængig?",
      answer: (
        <>
          Ja, alle vores anmeldelser og vurderinger er baseret på vores ærlige vurdering. Vi modtager muligvis provision fra casinoer, men dette påvirker aldrig vores vurderinger eller anbefalinger. Læs mere om vores tilgang til{" "}
          <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>,{" "}
          <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link> og{" "}
          <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link>.
        </>
      ),
    },
    {
      question: "Hvordan vælger I hvilke casinoer der anmeldes?",
      answer: (
        <>
          Vi anmelder udelukkende casinoer med gyldig dansk licens fra Spillemyndigheden. Vi fokuserer på casinoer, der tilbyder konkurrencedygtige bonusser som{" "}
          <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>,{" "}
          <Link to="/bonus-uden-indbetaling" className="text-primary underline hover:text-primary/80">bonusser uden indbetaling</Link> og{" "}
          <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>, bredt spiludbud og god kundeservice. Se vores{" "}
          <Link to="/nye-casinoer" className="text-primary underline hover:text-primary/80">oversigt over nye casinoer</Link>.
        </>
      ),
    },
    {
      question: "Hvor ofte opdateres anmeldelserne?",
      answer:
        "Vi gennemgår og opdaterer vores anmeldelser løbende for at afspejle ændringer i bonusvilkår, nye kampagner og eventuel spillerfeedback. De fleste anmeldelser opdateres mindst én gang om måneden.",
    },
    {
      question: "Kan jeg stole på jeres bonusvurderinger?",
      answer: (
        <>
          Vi analyserer grundigt alle bonusvilkår, herunder{" "}
          <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link>, tidsfrister og spilbidrag. Vi fremhæver både fordele og ulemper, så du kan træffe en informeret beslutning. Vi dækker alt fra{" "}
          <Link to="/bonus-uden-omsaetningskrav" className="text-primary underline hover:text-primary/80">bonusser uden omsætningskrav</Link> til{" "}
          <Link to="/no-sticky-bonus" className="text-primary underline hover:text-primary/80">no-sticky bonusser</Link>.
        </>
      ),
    },
    {
      question: "Hvem kan kontakte jer?",
      answer: (
        <>
          Vores{" "}
          <Link to="/kontakt" className="text-primary underline hover:text-primary/80">kontaktside</Link>{" "}
          er primært beregnet til casino partnerskaber, affiliate henvendelser og presseforespørgsler. For generel information kan du læse vores guides om bl.a.{" "}
          <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link> og{" "}
          <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>.
        </>
      ),
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Er Casinoaftaler.dk uafhængig?", acceptedAnswer: { "@type": "Answer", text: "Ja, alle vores anmeldelser og vurderinger er baseret på vores ærlige vurdering. Vi modtager muligvis provision fra casinoer, men dette påvirker aldrig vores vurderinger eller anbefalinger." } },
      { "@type": "Question", name: "Hvordan vælger I hvilke casinoer der anmeldes?", acceptedAnswer: { "@type": "Answer", text: "Vi anmelder udelukkende casinoer med gyldig dansk licens fra Spillemyndigheden. Vi fokuserer på casinoer, der tilbyder konkurrencedygtige bonusser, bredt spiludbud og god kundeservice." } },
      { "@type": "Question", name: "Hvor ofte opdateres anmeldelserne?", acceptedAnswer: { "@type": "Answer", text: "Vi gennemgår og opdaterer vores anmeldelser løbende for at afspejle ændringer i bonusvilkår, nye kampagner og eventuel spillerfeedback. De fleste anmeldelser opdateres mindst én gang om måneden." } },
      { "@type": "Question", name: "Kan jeg stole på jeres bonusvurderinger?", acceptedAnswer: { "@type": "Answer", text: "Vi analyserer grundigt alle bonusvilkår, herunder omsætningskrav, tidsfrister og spilbidrag. Vi fremhæver både fordele og ulemper, så du kan træffe en informeret beslutning." } },
      { "@type": "Question", name: "Hvem kan kontakte jer?", acceptedAnswer: { "@type": "Answer", text: "Vores kontaktside er primært beregnet til casino partnerskaber, affiliate henvendelser og presseforespørgsler. For generel information kan du læse vores guides og anmeldelser." } },
    ],
  };

  return (
    <>
      <SEO
        title="Om Os – Casinoaftaler.dk | Din Guide til Danske Casinobonusser"
        description="Lær mere om Casinoaftaler.dk, vores mission, værdier og hvordan vi anmelder danske online casinoer med gennemsigtige, upartiske anmeldelser."
        jsonLd={[articleJsonLd, faqJsonLd]}
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
              <Users className="mr-1.5 h-3.5 w-3.5" />
              Om Os
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Om Casinoaftaler.dk
            </h1>
            <p className="text-lg text-white/80">
              Vi er dedikerede til at hjælpe danske spillere med at finde de
              bedste casinobonusser med gennemsigtige, upartiske anmeldelser og
              sammenligninger.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="redaktionen" date="11-02-2026" readTime="5 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={aboutHero} alt="Casinoaftaler teamet analyserer casino data" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores Mission</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Casinoaftaler.dk blev grundlagt med et simpelt mål: at skære
            igennem støjen og hjælpe danske spillere med at træffe informerede
            beslutninger om online casinobonusser. Vi ved, at det kan være
            overvældende at navigere i verden af casinokampagner med
            komplekse vilkår og betingelser – herunder{" "}
            <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link>,
            tidsfrister og spilrestriktioner – der ikke altid er lette at forstå.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Derfor gennemgår vores team af eksperter omhyggeligt hver bonus –
            fra{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
            og{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>{" "}
            til{" "}
            <Link to="/bonus-uden-indbetaling" className="text-primary underline hover:text-primary/80">bonusser uden indbetaling</Link>{" "}
            – nedbryder de vigtigste detaljer og præsenterer dem i et klart,
            brugervenligt format. Vi mener, at enhver spiller fortjener at
            vide præcis, hvad de tilmelder sig.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Values */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvad Vi Står For</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Vores kerneværdier guider alt, hvad vi gør – fra hvordan vi
            anmelder casinoer til hvordan vi kommunikerer med vores læsere.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((value) => (
              <Card key={value.name} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <value.icon className="h-5 w-5 text-primary" />
                    {value.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Review Process */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvordan Vi Anmelder Casinoer
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Vores anmeldelsesproces er grundig og systematisk. Vi gennemgår
            hvert casino i fire trin for at sikre en fair og dækkende vurdering
            af alt fra{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
            til{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>{" "}
            og{" "}
            <Link to="/live-casino" className="text-primary underline hover:text-primary/80">live casino</Link>-tilbud.
          </p>
          <div className="space-y-3">
            {reviewSteps.map((item) => (
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

        {/* Hvad vi dækker */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvad Vi Dækker</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vores guides og anmeldelser dækker hele spektret af casino bonusser
            i Danmark. Vi hjælper dig med at forstå forskellen mellem de
            forskellige bonustyper, så du altid kan træffe det bedste valg.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Bonustyper
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Vi dækker{" "}
                  <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>,{" "}
                  <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>,{" "}
                  <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>,{" "}
                  <Link to="/bonus-uden-indbetaling" className="text-primary underline hover:text-primary/80">bonusser uden indbetaling</Link> og meget mere.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  Bonusvilkår
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Vi forklarer{" "}
                  <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link>,{" "}
                  <Link to="/no-sticky-bonus" className="text-primary underline hover:text-primary/80">no-sticky bonusser</Link>,{" "}
                  <Link to="/sticky-bonus" className="text-primary underline hover:text-primary/80">sticky bonusser</Link> og{" "}
                  <Link to="/bonus-uden-omsaetningskrav" className="text-primary underline hover:text-primary/80">bonusser uden omsætningskrav</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Casinoer & Spil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Anmeldelser af{" "}
                  <Link to="/nye-casinoer" className="text-primary underline hover:text-primary/80">nye casinoer</Link>,{" "}
                  <Link to="/live-casino" className="text-primary underline hover:text-primary/80">live casino</Link>-tilbud,{" "}
                  <Link to="/betalingsmetoder" className="text-primary underline hover:text-primary/80">betalingsmetoder</Link> og{" "}
                  <Link to="/spiludviklere" className="text-primary underline hover:text-primary/80">spiludviklere</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Ansvarligt Spil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Vi fremmer{" "}
                  <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>{" "}
                  og anbefaler kun casinoer med dansk licens fra Spillemyndigheden.
                  Læs også vores{" "}
                  <Link to="/privatlivspolitik" className="text-primary underline hover:text-primary/80">privatlivspolitik</Link> og{" "}
                  <Link to="/terms" className="text-primary underline hover:text-primary/80">vilkår og betingelser</Link>.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Ansvarligt spil */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Ansvarligt Spil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi tager{" "}
            <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>{" "}
            alvorligt. Vi anbefaler kun casinoer, der
            er licenseret af Spillemyndigheden og opfylder strenge krav til
            spillerbeskyttelse. Vi opfordrer altid vores læsere til at spille
            ansvarligt og inden for deres økonomiske rammer.
          </p>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <Scale className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Affiliate Oplysning</h3>
                <p className="text-sm text-muted-foreground">
                  Casinoaftaler.dk modtager muligvis kompensation, når du
                  klikker på links til casinoer og/eller opretter en konto.
                  Dette hjælper os med at vedligeholde og forbedre vores
                  service. Vores anmeldelser og vurderinger er dog altid
                  baseret på vores ærlige vurdering og påvirkes aldrig af
                  potentielle provisioner. Vi anbefaler kun casinoer, der er
                  licenseret af Spillemyndigheden og opfylder vores strenge
                  kvalitetsstandarder. Har du spørgsmål? Besøg vores{" "}
                  <Link to="/kontakt" className="text-primary underline hover:text-primary/80">kontaktside</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath="/om" />

        <FAQSection title="Ofte stillede spørgsmål" faqs={aboutFaqs} />
      </div>
    </>
  );
};

export default About;
