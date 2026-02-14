import { Scale, Shield, FileCheck, AlertTriangle, Globe, BookOpen, User, CalendarDays, Clock, CheckCircle, Landmark, Gavel, Lock, Eye, Users, Phone, Ban } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import spillemyndighedenHero from "@/assets/spillemyndigheden-hero.jpg";

const keyFacts = [
  { label: "Grundlagt", value: "2000 (som Spillemyndigheden i 2012)" },
  { label: "Placering", value: "Odense, Danmark" },
  { label: "Antal medarbejdere", value: "100+" },
  { label: "Ressorterer under", value: "Skatteministeriet" },
  { label: "Blokerede sider (2024)", value: "83 ulovlige spillesider" },
  { label: "Officiel hjemmeside", value: "spillemyndigheden.dk" },
];

const licensTypes = [
  {
    title: "Online Casino",
    description: "Dækker alle former for online casinospil, herunder spilleautomater, bordspil og live casino. Kræver dokumentation for teknisk sikkerhed, ansvarligt spil og anti-hvidvask.",
    fee: "Ca. 285.800 kr.",
  },
  {
    title: "Væddemål (Betting)",
    description: "Licens til online sportsbetting og væddemål. Operatøren skal bevise fair odds, korrekt udbetaling og overholdelse af dansk lov.",
    fee: "Ca. 285.800 kr.",
  },
  {
    title: "Kombineret Licens",
    description: "Casino- og væddemålslicens samlet i én. Den mest omfattende licenstype, der kræver fuld overholdelse af begge regelsæt.",
    fee: "Ca. 400.100 kr.",
  },
  {
    title: "Landbaseret Casino",
    description: "For fysiske casinoer i Danmark. Kræver godkendelse af lokaler, personale og spilleudstyr.",
    fee: "Varierer",
  },
];

const playerProtections = [
  {
    icon: Shield,
    title: "ROFUS – Selvudelukkelse",
    description: "Register Over Frivilligt Udelukkede Spillere giver danske spillere mulighed for at udelukke sig selv fra alle licenserede spillesider i Danmark. Registreringen sker via MitID, og du kan vælge udelukkelse fra 24 timer op til permanent.",
  },
  {
    icon: Phone,
    title: "StopSpillet – Hjælpelinjen",
    description: "En gratis og anonym rådgivningstjeneste for spillere og pårørende, som er berørt af problematisk spilleadfærd. StopSpillet drives med støtte fra Spillemyndigheden og er tilgængelig via telefon, chat og e-mail.",
  },
  {
    icon: Lock,
    title: "Indbetalingsgrænser",
    description: "Alle licenserede casinoer er forpligtet til at tilbyde spillere mulighed for at sætte daglige, ugentlige og månedlige indbetalingsgrænser. Grænser kan sænkes øjeblikkeligt, men forhøjelser træder først i kraft efter en karensperiode.",
  },
  {
    icon: Eye,
    title: "Overvågning af Spilleadfærd",
    description: "Operatører skal overvåge spilleadfærd og kontakte spillere, der udviser tegn på problematisk spil. Dette inkluderer lange spilsessioner, hyppige indbetalinger og jagten på tab.",
  },
];

const spillemyndighedenFaqs = [
  {
    question: "Hvad er Spillemyndigheden?",
    answer: "Spillemyndigheden er den danske statslige myndighed, der regulerer og fører tilsyn med alt lovligt spil i Danmark. Den hører under Skatteministeriet og har til opgave at sikre et fair, sikkert og ansvarligt spilmarked for danske forbrugere.",
  },
  {
    question: "Hvordan tjekker jeg, om et casino har dansk licens?",
    answer: "Du kan tjekke det direkte på Spillemyndighedens hjemmeside (spillemyndigheden.dk), hvor de offentliggør en komplet liste over alle aktive licenshavere. Et licenseret casino skal desuden vise sit licensnummer i bunden af hjemmesiden.",
  },
  {
    question: "Hvad sker der, hvis jeg spiller på et casino uden dansk licens?",
    answer: "Hvis du spiller på et ulicenseret casino, mister du al den beskyttelse, som dansk lovgivning tilbyder. Det betyder ingen adgang til ROFUS-selvudelukkelse, ingen klageadgang via Spillemyndigheden og ingen garanti for, at dine penge eller gevinster er sikre. Spillemyndigheden blokerer aktivt ulovlige sider i Danmark.",
  },
  {
    question: "Hvad er ROFUS, og hvordan tilmelder jeg mig?",
    answer: "ROFUS (Register Over Frivilligt Udelukkede Spillere) er en national ordning, hvor du kan udelukke dig selv fra alle danske licenserede spillesider. Tilmelding foregår via spillemyndigheden.dk med MitID. Du kan vælge udelukkelse i 24 timer, 1 måned, 3 måneder, 6 måneder eller permanent.",
  },
  {
    question: "Kan jeg klage over et licenseret casino?",
    answer: "Ja, du kan indgive en klage til Spillemyndigheden, hvis du oplever problemer med et licenseret casino. Klagen kan indsendes via deres hjemmeside. Spillemyndigheden vurderer derefter sagen og kan pålægge operatøren sanktioner, hvis reglerne er overtrådt.",
  },
  {
    question: "Hvilke krav stiller Spillemyndigheden til casinoer?",
    answer: "Kravene omfatter anti-hvidvask-procedurer, teknisk sikkerhed og fair spil (RNG-certificering), ansvarligt spil-værktøjer (ROFUS-integration, indbetalingsgrænser, sessionspåmindelser), databeskyttelse i henhold til GDPR og regelmæssig rapportering til myndigheden.",
  },
];

const Spillemyndigheden = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: spillemyndighedenFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Spillemyndigheden – Danmarks Regulering af Online Spil",
    description: "Komplet guide til Spillemyndigheden i Danmark. Lær om licenstyper, spillerbeskyttelse, ROFUS, lovgivning og hvad den danske spillemyndighed gør for at sikre fair og ansvarligt spil.",
    author: { "@type": "Organization", name: "Casinoaftaler" },
    publisher: { "@type": "Organization", name: "Casinoaftaler" },
    datePublished: "2026-02-14",
    dateModified: "2026-02-14",
    mainEntityOfPage: "https://casinoaftaler.dk/spillemyndigheden",
  };

  return (
    <>
      <SEO
        title="Spillemyndigheden – Danmarks Regulering af Online Spil | Casinoaftaler"
        description="Komplet guide til Spillemyndigheden i Danmark. Lær om licenstyper, spillerbeskyttelse, ROFUS, lovgivning og hvad den danske spillemyndighed gør for at sikre fair og ansvarligt spil."
        jsonLd={[faqJsonLd, articleJsonLd]}
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
              <Scale className="mr-1.5 h-3.5 w-3.5" />
              Dansk Spilleregulering
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Spillemyndigheden
            </h1>
            <p className="text-lg text-white/80">
              Danmarks officielle tilsynsmyndighed for spil – din garanti for et sikkert, fair og reguleret spilmarked.
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
              <span className="font-medium text-foreground">14-02-2026</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>
              Læsetid:{" "}
              <span className="font-medium text-foreground">8 Min.</span>
            </span>
          </div>
        </div>

        {/* Hero image */}
        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={spillemyndighedenHero}
            alt="Spillemyndighedens bygning i Odense, Danmark"
            className="w-full h-auto object-cover max-h-[400px]"
            loading="lazy"
          />
        </div>

        {/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Landmark className="h-8 w-8 text-primary" />
            Hvad er Spillemyndigheden?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spillemyndigheden er den danske statslige myndighed, der regulerer alt lovligt spil i Danmark. Myndigheden blev etableret i sin nuværende form i 2012, da den danske spillelov blev liberaliseret, og online casinoer og væddemål for første gang fik mulighed for at operere med dansk licens. Spillemyndigheden hører under Skatteministeriet og har hovedkvarter i Odense med over 100 dedikerede medarbejdere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Myndighedens primære formål er at beskytte danske spillere mod svindel, sikre fair og gennemsigtigt spil samt forebygge ludomani og hvidvask. Det gør den gennem et strengt licenssystem, løbende tilsyn og samarbejde med internationale reguleringsorganer. Alle <Link to="/top-10-casino-online" className="text-primary hover:underline font-medium">lovlige online casinoer i Danmark</Link> skal have en aktiv licens fra Spillemyndigheden for at kunne tilbyde spil til danske forbrugere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Når du spiller på et casino med dansk licens, er du beskyttet af dansk lovgivning. Det betyder, at casinoet er forpligtet til at tilbyde værktøjer som <Link to="/responsible-gaming" className="text-primary hover:underline font-medium">ansvarligt spil</Link>, herunder selvudelukkelse via ROFUS, indbetalingsgrænser og sessionspåmindelser. Spillemyndigheden fører aktivt tilsyn med, at disse krav overholdes.
          </p>
        </section>

        {/* Quick Facts */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <FileCheck className="h-8 w-8 text-primary" />
            Hurtige Fakta om Spillemyndigheden
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyFacts.map((fact) => (
              <Card key={fact.label} className="border-border bg-card">
                <CardContent className="pt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{fact.label}</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{fact.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Roller og Ansvar */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gavel className="h-8 w-8 text-primary" />
            Spillemyndighedens Roller og Ansvar
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Spillemyndigheden varetager en lang række opgaver for at sikre, at det danske spilmarked fungerer korrekt og til fordel for forbrugerne. Disse opgaver spænder fra licensudstedelse til aktiv bekæmpelse af ulovligt spil.
          </p>

          <div className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileCheck className="h-5 w-5 text-primary" />
                  Licensudstedelse og Administration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Spillemyndigheden udsteder og administrerer licenser til alle typer af spiloperatører i Danmark. Processen er grundig og kræver dokumentation for ejerskab, finansiel stabilitet, teknisk sikkerhed og overholdelse af anti-hvidvask-regler. En licensansøgning kan tage 3-6 måneder at behandle, og operatøren skal betale et ansøgningsgebyr samt årlige licensafgifter. Kun operatører, der lever op til de strengeste krav, får lov til at tilbyde spil til danske <Link to="/casino-bonus" className="text-primary hover:underline font-medium">casinospillere</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="h-5 w-5 text-primary" />
                  Tilsyn og Overvågning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Myndigheden fører løbende tilsyn med alle licenserede operatører for at sikre, at de overholder gældende regler. Dette omfatter både planlagte inspektioner og risikobaserede kontroller. I 2022 gennemførte Spillemyndigheden over 4.000 kontroller af spilleautomater alene. Når der modtages klager fra spillere, reagerer myndigheden hurtigt med undersøgelser og eventuelle sanktioner. Tilsynet dækker alt fra <Link to="/omsaetningskrav" className="text-primary hover:underline font-medium">omsætningskrav</Link> til korrekt udbetaling af gevinster.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Ban className="h-5 w-5 text-primary" />
                  Bekæmpelse af Ulovligt Spil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  En central del af Spillemyndighedens arbejde er at bekæmpe ulovlige spillesider, der opererer uden dansk licens. Myndigheden samarbejder med danske internetudbydere og politiet for aktivt at blokere adgangen til disse sider. I 2024 blokerede Spillemyndigheden 83 ulovlige spillesider – det højeste antal nogensinde. Denne indsats sikrer, at danske spillere kanaliseres hen til licenserede og trygge platforme, hvor de er beskyttet af loven.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="h-5 w-5 text-primary" />
                  Internationalt Samarbejde
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Spillemyndigheden samarbejder med internationale reguleringsorganer som IAGR (International Association of Gaming Regulators), GREF (Gaming Regulators European Forum) og individuelle lande som Malta og Storbritannien. Dette samarbejde sikrer videndeling om bedste praksis og koordineret indsats mod grænseoverskridende ulovligt spil. Danmark anses internationalt for at have en af de mest effektive spillereguleringer i verden.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Licenstyper */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <CheckCircle className="h-8 w-8 text-primary" />
            Licenstyper i Danmark
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Spillemyndigheden udsteder flere typer af licenser afhængigt af, hvilken form for spil operatøren ønsker at udbyde. Alle licenser kræver grundig dokumentation og løbende overholdelse af danske regler.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {licensTypes.map((license) => (
              <Card key={license.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span className="flex items-center gap-2">
                      <Scale className="h-5 w-5 text-primary" />
                      {license.title}
                    </span>
                    <Badge variant="outline" className="text-xs">{license.fee}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {license.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Spillerbeskyttelse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            Spillerbeskyttelse og Ansvarligt Spil
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Et af Spillemyndighedens vigtigste fokusområder er at beskytte spillere mod problematisk spil. Alle licenserede operatører er forpligtet til at implementere en række værktøjer og procedurer, der fremmer <Link to="/responsible-gaming" className="text-primary hover:underline font-medium">ansvarligt spil</Link>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {playerProtections.map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <item.icon className="h-5 w-5 text-primary" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Lovgivning */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gavel className="h-8 w-8 text-primary" />
            Dansk Spillelovgivning
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den danske spillelov (Lov om spil) trådte i kraft den 1. januar 2012 og liberaliserede det danske spilmarked ved at åbne for konkurrence inden for online casino og væddemål. Loven fastsætter rammerne for, hvem der kan udbyde spil, hvilke krav der stilles, og hvordan tilsynet fungerer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Loven suppleres af en række bekendtgørelser, der regulerer specifikke områder som anti-hvidvask, tekniske standarder for spilsoftware (herunder RNG-certificering), markedsføring af spil og krav til <Link to="/betalingsmetoder" className="text-primary hover:underline font-medium">betalingsmetoder</Link>. Operatører skal desuden overholde GDPR i forbindelse med behandling af persondata.
          </p>
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <h3 className="mb-3 font-semibold text-foreground">Konsekvenser ved Brud på Reglerne</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <span><strong>Påbud og advarsler:</strong> Spillemyndigheden kan udstede påbud om at rette op på fejl inden for en fastsat frist.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <span><strong>Bøder:</strong> Overtrædelser kan medføre betydelige økonomiske sanktioner til operatøren.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <span><strong>Licensinddragelse:</strong> I alvorlige tilfælde kan Spillemyndigheden inddrage operatørens licens, hvilket lukker hele deres virksomhed i Danmark.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <span><strong>Politianmeldelse:</strong> Grov overtrædelse eller ulovlig virksomhed kan føre til politianmeldelse og strafferetlig forfølgelse.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Tekniske krav */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Lock className="h-8 w-8 text-primary" />
            Tekniske Krav og Datasikkerhed
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spillemyndigheden stiller strenge tekniske krav til alle licenserede operatører for at sikre, at spil er fair og spillernes data er beskyttet. Disse krav er blandt de mest omfattende i Europa.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">RNG-Certificering</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Alle digitale spil skal anvende certificerede tilfældighedsgeneratorer (Random Number Generators), der er testet og godkendt af uafhængige testlaboratorier. Dette sikrer, at udfaldet af hvert spil er genuint tilfældigt og ikke kan manipuleres af operatøren. De <Link to="/spiludviklere" className="text-primary hover:underline font-medium">spiludviklere</Link>, der leverer spil til danske casinoer, skal alle have deres software certificeret.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Databeskyttelse og Kryptering</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Operatører skal beskytte spillernes personlige og finansielle data med stærk kryptering (minimum SSL/TLS). Alle transaktioner via <Link to="/betalingsmetoder" className="text-primary hover:underline font-medium">betalingsmetoder</Link> som MobilePay, Trustly og kortbetalinger skal håndteres sikkert. Derudover skal operatører overholde GDPR og have klare procedurer for databehandling, opbevaring og sletning af personoplysninger.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Husk-boks */}
        <section className="mb-12">
          <Card className="bg-muted/50">
            <CardContent className="p-8 text-center">
              <h3 className="mb-4 text-xl font-bold">Spil Altid på Licenserede Casinoer</h3>
              <p className="text-muted-foreground leading-relaxed">
                Spillemyndigheden arbejder hver dag for at beskytte dig som spiller. Ved altid at vælge casinoer med dansk licens sikrer du dig adgang til fair spil, klagemuligheder og ansvarligt spil-værktøjer. Tjek altid licensnummeret i bunden af casinoets hjemmeside, og brug <a href="https://www.spillemyndigheden.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">spillemyndigheden.dk</a> til at verificere licensen.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        <FAQSection title="Ofte Stillede Spørgsmål om Spillemyndigheden" faqs={spillemyndighedenFaqs} />

        <RelatedGuides currentPath="/spillemyndigheden" />
      </div>
    </>
  );
};

export default Spillemyndigheden;
