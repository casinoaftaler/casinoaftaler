import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { AnsvarligtSpilResources } from "@/components/AnsvarligtSpilResources";
import { FAQSection } from "@/components/FAQSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import ludomaniHero from "@/assets/heroes/ludomani-guide-hero.jpg";
import {
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Brain,
  Lock,
  Scale,
  BarChart3,
  BookOpen,
  ExternalLink,
  HelpCircle,
  Phone,
  Globe,
  Gavel,
  ArrowRight,
  Heart,
  Activity,
  TrendingDown,
  MessageCircle,
  Info,
  UserX,
  HandHeart,
} from "lucide-react";

// ────────────────────────────────────────────────────────────────
// FAQ Data
// ────────────────────────────────────────────────────────────────
const ludomaniFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er ludomani?",
    answer: (
      <>
        Ludomani er en anerkendt psykisk lidelse klassificeret under ICD-11 (WHO) som
        "gambling disorder" (6C50). Det er kendetegnet ved manglende evne til at kontrollere
        sin spilleadfærd trods negative konsekvenser. Ludomani er en impulskontrolforstyrrelse,
        der aktiverer hjernens belønningssystem på samme måde som stofmisbrug. I Danmark
        estimeres det, at ca. 30.000–50.000 personer har problemer med gambling i varierende
        grad, ifølge{" "}
        <a href="https://www.vive.dk/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
          VIVE
        </a>
        's nationale undersøgelser.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på ludomani og problematisk spilleadfærd?",
    answer:
      "Problematisk spilleadfærd er et bredere begreb, der dækker et spektrum fra risikoadfærd til fuldt udviklet ludomani. Ludomani (gambling disorder) er den kliniske diagnose, hvor spilleadfærden er kronisk, ukontrollerbar og medfører alvorlige konsekvenser. Problematisk spilleadfærd kan inkludere periodevis overforbrug uden at opfylde alle diagnostiske kriterier. Begge tilstande kræver opmærksomhed, men ludomani kræver typisk professionel behandling, mens problematisk spilleadfærd ofte kan håndteres med rådgivning og selvhjælpsværktøjer som ROFUS.",
  },
  {
    question: "Er ludomani arveligt?",
    answer:
      "Forskning tyder på, at genetiske faktorer spiller en rolle i udviklingen af ludomani. Tvillingestudier viser, at arvelig disposition udgør 50-60 % af risikoen. Specifikke gener relateret til dopamin-receptorer (DRD2, DRD4) og serotonin-transport er identificeret som risikofaktorer. Dog er genetik kun én del af billedet – miljøfaktorer, tidlig eksponering for gambling, psykisk sårbarhed og sociale forhold bidrager også væsentligt. At have en genetisk disposition betyder ikke, at man automatisk udvikler ludomani.",
  },
  {
    question: "Hvordan behandles ludomani i Danmark?",
    answer: (
      <>
        I Danmark tilbydes gratis behandling primært via{" "}
        <a href="https://ludomani.dk/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
          Center for Ludomani
        </a>
        , der anvender kognitiv adfærdsterapi (KAT) som primær behandlingsmetode. Behandlingen
        inkluderer individuel terapi, gruppeterapi og online-rådgivning. Derudover kan kommunale
        misbrugstilbud, privatpraktiserende psykologer og psykiatere tilbyde behandling.{" "}
        <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
          StopSpillet
        </a>{" "}
        tilbyder rådgivning og kan hjælpe med at finde det rigtige behandlingstilbud.
      </>
    ),
  },
  {
    question: "Kan man blive helt helbredt for ludomani?",
    answer:
      "Ludomani betragtes klinisk som en kronisk tilstand, der kan behandles og kontrolleres, men ikke 'helbredes' i traditionel forstand. De fleste behandlingsprogrammer fokuserer på recovery – at opbygge strategier til at håndtere triggere, udvikle alternative mestringsmekanismer og forebygge tilbagefald. Mange tidligere ludomaner lever problemfrit i årtier efter behandling. Tilbagefald er ikke et tegn på fiasko, men en del af recovery-processen, der kræver fornyet støtte.",
  },
  {
    question: "Hvad koster behandling for ludomani?",
    answer:
      "Behandling hos Center for Ludomani er 100 % gratis og kræver ingen lægehenvisning. StopSpillet's rådgivningstjeneste er ligeledes gratis. Kommunale misbrugstilbud er gratis under Servicelovens § 101. Privatpraktiserende psykologer og psykiatere kan koste 800-1.500 kr. per session, men tilskud er ofte muligt via sygesikring med lægehenvisning. Der er altså altid gratis muligheder tilgængelige i Danmark.",
  },
  {
    question: "Hvilke advarselstegn bør pårørende være opmærksomme på?",
    answer:
      "Pårørende bør være opmærksomme på: Øget hemmeligholdelse omkring økonomi og tidsanvendelse, uforklarlige pengemangel eller ny gæld, humørsvingninger relateret til spil (eufori vs. irritabilitet), tilbagetrækning fra sociale aktiviteter, løgne om hvor man har været, hyppig brug af telefon/computer (muligvis online gambling), søvnforstyrrelser, manglende interesse for tidligere hobbyer, og bortforklaring af økonomiske problemer. Et enkelt tegn er sjældent definitivt, men et mønster af flere tegn bør tages alvorligt.",
  },
  {
    question: "Hvad er ROFUS, og kan det hjælpe mod ludomani?",
    answer: (
      <>
        <Link to="/ansvarligt-spil/rofus" className="text-primary underline hover:text-primary/80">
          ROFUS (Register Over Frivilligt Udelukkede Spillere)
        </Link>{" "}
        er Danmarks officielle selvudelukkelsesregister, der blokerer din adgang til alle
        licenserede spiludbydere. ROFUS er et vigtigt værktøj i ludomani-behandling, da det
        fjerner den umiddelbare adgang til gambling. Forskning viser dog, at ROFUS alene
        sjældent er tilstrækkeligt – det bør kombineres med professionel behandling for at
        adressere de underliggende psykologiske mønstre.
      </>
    ),
  },
  {
    question: "Kan man være ludoman uden at tabe penge?",
    answer:
      "Ja. Ludomani defineres ikke udelukkende af økonomiske tab, men af manglende kontrol over spilleadfærden. En spiller kan vinde penge og stadig være ludoman, hvis vedkommende ikke kan stoppe, forsømmer andre livsområder, skjuler omfanget af sit spil, eller oplever abstinenslignende symptomer ved forsøg på at stoppe. Økonomiske tab er det mest synlige symptom, men den psykologiske afhængighed er det centrale kriterium i den kliniske diagnose.",
  },
  {
    question: "Hvor mange danskere er ramt af ludomani?",
    answer:
      "Ifølge VIVE's nationale undersøgelser af spilleadfærd (senest 2021) estimeres det, at ca. 0,3-0,5 % af den danske voksne befolkning (ca. 12.000-20.000 personer) opfylder kriterierne for klinisk ludomani. Yderligere 1-2 % (ca. 40.000-80.000) har problematisk spilleadfærd, der ikke opfylder den kliniske diagnose. Tallene er sandsynligvis underestimerede, da mange ludomaner ikke søger hjælp eller deltager i undersøgelser. Mænd er overrepræsenterede med en faktor 3:1, men kvinders andel er stigende.",
  },
];

const LudomaniGuide = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(ludomaniFaqs);

  const articleJsonLd = buildArticleSchema({
    headline: "Ludomani – Komplet Guide til Spilleafhængighed i Danmark",
    description:
      "Alt om ludomani: Symptomer, årsager, behandling, statistik og hjælpemuligheder. Lær at genkende spilleafhængighed og find gratis støtte i Danmark.",
    url: `${SITE_URL}/ansvarligt-spil/ludomani`,
    datePublished: "2026-03-07",
    authorName: "Ajse",
    authorUrl: `${SITE_URL}/forfatter/ajse`,
  });

  return (
    <>
      <SEO
        title="Ludomani – Komplet Guide til Spilleafhængighed"
        description="Ludomani i Danmark: Symptomer, årsager, behandlingsmuligheder, statistik og gratis hjælp. Lær at genkende spilleafhængighed og find støtte."
        jsonLd={[faqJsonLd, articleJsonLd]}
        datePublished="2026-03-07"
      />

      {/* ── Hero Section ── */}
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
              <Heart className="mr-1.5 h-3.5 w-3.5" />
              Ansvarligt Spil
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Ludomani – Spilleafhængighed i Danmark
            </h1>
            <p className="text-lg text-white/80">
              Komplet guide til ludomani: Symptomer, årsager, behandlingsmuligheder,
              forebyggelse og gratis hjælp til spillere og pårørende.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="ajse" readTime="28 Min." />
        <p className="text-sm text-muted-foreground mt-2 mb-6">
          Juridisk og fagligt gennemgået af Ajse, juridisk redaktør hos Casinoaftaler.dk.
        </p>

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={ludomaniHero}
            alt="Ludomani guide – illustration af hjernens belønningssystem og spilleafhængighed med hjælpende hånd"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>


        {/* ══════════════════════════════════════════════════════════════
            1. HVAD ER LUDOMANI?
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="hvad-er-ludomani">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Hvad er ludomani?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ludomani – også kaldet spilleafhængighed eller gambling disorder – er en klinisk
            anerkendt psykisk lidelse, der er klassificeret under WHO's internationale
            sygdomsklassifikation (ICD-11, kode 6C50). Tilstanden er kendetegnet ved en
            vedvarende og tilbagevendende problematisk spilleadfærd, hvor personen mister
            kontrollen over sit spil trods alvorlige negative konsekvenser for økonomi,
            relationer, arbejde og mental sundhed.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ludomani er neurologisk beslægtet med stofmisbrug. Begge tilstande involverer
            dysregulering af hjernens dopaminerge belønningssystem, hvor spillerens hjerne
            gradvist kræver større stimuli (højere indsatser, mere risikable spil) for at
            opnå den samme dopamin-frigivelse. Denne mekanisme – kaldet toleransudvikling –
            er identisk med den, der ses ved alkohol- og narkotikaafhængighed.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I Danmark reguleres gambling af{" "}
            <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">
              Spillemyndigheden
            </Link>
            , der stiller krav til licenserede operatører om spillerbeskyttelse.
            Selvudelukkelsesregistret{" "}
            <Link to="/ansvarligt-spil/rofus" className="text-primary underline hover:text-primary/80">
              ROFUS
            </Link>{" "}
            er et centralt værktøj, men ludomani kræver typisk professionel behandling
            ud over selvudelukkelse.
          </p>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Ludomani i overblik
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Klinisk klassifikation", value: "ICD-11: 6C50 (Gambling Disorder)" },
                { label: "Prævalens i DK", value: "0,3–0,5 % (12.000–20.000 personer)" },
                { label: "Kønsfordeling", value: "Ca. 75 % mænd, 25 % kvinder" },
                { label: "Hyppigste aldersgruppe", value: "18–34 år" },
                { label: "Behandling", value: "Kognitiv adfærdsterapi (KAT)" },
                { label: "Gratis hjælp", value: "Center for Ludomani, StopSpillet" },
                { label: "Selvudelukkelse", value: "ROFUS (Spillemyndigheden)" },
                { label: "Recovery-rate", value: "60–70 % ved professionel behandling" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 mt-1 text-primary shrink-0" />
                  <div>
                    <span className="font-medium text-sm text-foreground">{item.label}:</span>{" "}
                    <span className="text-sm text-muted-foreground">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Det er afgørende at forstå, at ludomani ikke er en karaktersvaghed eller mangel på
            viljestyrke. Det er en neurobiologisk tilstand, der kræver professionel intervention –
            på samme måde som depression, angst eller stofmisbrug. Jo tidligere behandling
            påbegyndes, desto bedre er prognosen for recovery.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            2. STATISTIK
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="statistik">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            Ludomani i tal – Dansk statistik
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            VIVE (Det Nationale Forsknings- og Analysecenter for Velfærd) og Spillemyndigheden
            offentliggør regelmæssigt data om danskernes spilleadfærd og omfanget af
            spilleproblemer:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { stat: "~50.000+", label: "Danskere med problematisk spilleadfærd" },
              { stat: "12.000–20.000", label: "Opfylder kliniske kriterier for ludomani" },
              { stat: "75 %", label: "Er mænd (kvinders andel er stigende)" },
              { stat: "60.000+", label: "Registreret i ROFUS" },
            ].map((item) => (
              <Card key={item.label} className="border-border bg-card text-center">
                <CardContent className="p-6">
                  <p className="text-2xl font-bold text-primary mb-1">{item.stat}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det danske gambling-marked omsatte for over 10 mia. kr. i 2024 (bruttospilindtægt),
            fordelt på online casino, sportsbetting, lotteri og fysiske spillehaller. Med den
            stigende digitalisering og tilgængelighed af online gambling er der en bekymring for,
            at antallet af problemspillere vil stige – særligt blandt unge mænd i aldersgruppen
            18–24 år, der er den mest sårbare demografiske gruppe.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Forskning fra Sundhedsstyrelsen og VIVE viser, at problematisk spilleadfærd har
            betydelige samfundsøkonomiske konsekvenser: øgede sundhedsudgifter, tabt
            arbejdsproduktivitet, øget kriminalitet (primært berigelseskriminalitet) og
            belastning af sociale støttesystemer. Den samlede samfundsomkostning estimeres
            til 1,5–3 mia. kr. årligt, inkl. indirekte omkostninger.
          </p>

          <div className="rounded-xl border border-border bg-muted/30 p-5">
            <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              Kilde
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Statistikkerne er baseret på VIVE's nationale undersøgelser af spilleadfærd
              (2016, 2019, 2021), Spillemyndighedens årsrapporter og Sundhedsstyrelsens
              rapporter om ludomani i Danmark. Tallene er afrundede og repræsenterer de
              senest tilgængelige offentlige data.
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            3. SYMPTOMER OG ADVARSELSTEGN
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="symptomer">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-7 w-7 text-destructive" />
            Symptomer og advarselstegn
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Ludomani udvikler sig ofte gradvist, og mange spillere erkender først problemet,
            når konsekvenserne er alvorlige. WHO's diagnostiske kriterier (ICD-11) inkluderer
            følgende kernesymptomer:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Adfærdsmæssige symptomer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "Behov for at spille med stadigt stigende beløb for at opnå spænding (toleransudvikling)",
                    "Gentagne mislykkede forsøg på at kontrollere, reducere eller stoppe spil",
                    "Rastløshed eller irritabilitet ved forsøg på at skære ned på spil (abstinenser)",
                    "Spiller for at flygte fra problemer eller lindre negative følelser",
                    "Vender tilbage for at 'vinde pengene tilbage' efter tab (chasing losses)",
                    "Lyver over for familie eller andre for at skjule omfanget af spil",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertTriangle className="h-3.5 w-3.5 mt-1 text-destructive shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-destructive" />
                  Konsekvenser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "Har bragt eller mistet et vigtigt forhold, job eller uddannelsesmulighed pga. spil",
                    "Økonomiske problemer: gæld, lån, solgt ejendele for at finansiere spil",
                    "Psykiske symptomer: angst, depression, søvnforstyrrelser, selvmordstanker",
                    "Social isolation og tilbagetrækning fra venner og familie",
                    "Nedsat arbejdsevne og koncentration pga. konstant tanke om spil",
                    "I alvorlige tilfælde: berigelseskriminalitet for at finansiere spilleadfærd",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <TrendingDown className="h-3.5 w-3.5 mt-1 text-destructive shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-5 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-1">Vigtigt at vide</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Klinisk ludomani diagnosticeres, når <strong>4 eller flere</strong> af de
                  ovenstående symptomer er til stede over en 12-måneders periode. Men selv 2–3
                  symptomer indikerer problematisk spilleadfærd, der bør tages alvorligt. Hvis
                  du genkender dig selv, kontakt{" "}
                  <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
                    StopSpillet
                  </a>{" "}
                  (70 22 28 25) for en gratis, fortrolig samtale.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            4. ÅRSAGER OG RISIKOFAKTORER
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="aarsager">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Activity className="h-7 w-7 text-primary" />
            Årsager og risikofaktorer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Ludomani udvikles som et samspil mellem biologiske, psykologiske og sociale
            faktorer. Ingen enkelt faktor forårsager ludomani alene – det er kombinationen,
            der skaber sårbarhed:
          </p>

          <div className="space-y-4 mb-6">
            {[
              {
                icon: Brain,
                title: "Biologiske faktorer",
                content:
                  "Genetisk disposition (50–60 % arvelighed), dysregulering af dopamin- og serotonin-systemet, neurologiske forskelle i prefrontal cortex (impulskontroltcentret), og forhøjet respons i hjernens belønningssystem ved gambling-stimuli. Mænd har biologisk højere risiko pga. testosteronens indflydelse på risikoadfærd.",
              },
              {
                icon: UserX,
                title: "Psykologiske faktorer",
                content:
                  "Kognitive forvrængninger (gambler's fallacy, illusion of control), impulsivitet, sensationssøgen, komorbide tilstande (depression, angst, ADHD), lavt selvværd, og brug af gambling som mestringsmekanisme mod stress eller negative følelser. Tidlig eksponering for gambling i barndommen øger risikoen markant.",
              },
              {
                icon: Users,
                title: "Sociale faktorer",
                content:
                  "Familiær historie med gambling, peer-pres og social normalisering af spil, let tilgængelighed af online gambling (24/7 adgang via smartphone), aggressiv reklame, økonomisk udsathed, og isolation. Kulturelle faktorer spiller også en rolle – i kulturer hvor gambling er stærkt normaliseret, er prævalensen højere.",
              },
              {
                icon: Globe,
                title: "Strukturelle faktorer",
                content:
                  "Spilleprodukternes design (høj frekvens af belønninger, near-misses, variable reinforcement schedules), den digitale tilgængelighed af online casino og sportsbetting, bonustilbud der opfordrer til fortsat spil, og mangel på effektive regulatoriske barrierer. Spillemaskiners og online slots' design er specifikt optimeret til at udnytte neurologiske svagheder.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Den multifaktorielle natur af ludomani betyder, at effektiv behandling skal
            adressere flere dimensioner samtidigt – biologisk (evt. medicinering), psykologisk
            (terapi) og socialt (støttenetværk, økonomisk rådgivning). En holistisk tilgang
            giver den bedste prognose.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            5. NEUROBIOLOGI
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="neurobiologi">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Neurobiologien bag ludomani
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Moderne neurovidenskab har afsløret, at ludomani involverer de samme
            hjernemekanismer som stofmisbrug. Forståelse af denne neurobiologi er afgørende
            for at modvirke stigmaet om, at ludomani er en 'karaktersvaghed':
          </p>

          <div className="rounded-xl border border-border bg-card p-6 space-y-4 mb-6">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Nøglemekanismer i hjernen
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Dopamin-systemet:</strong>{" "}
                Gambling aktiverer hjernens mesolimbiske dopamin-pathway (ventral tegmental area → nucleus accumbens),
                der er ansvarlig for belønningsoplevelsen. Ved gentagen gambling desensitiseres dopamin-receptorerne,
                hvilket kræver stærkere stimuli (højere indsatser) for at opnå samme effekt – præcis som ved
                narkoafhængighed. fMRI-studier viser, at ludomaner har reduceret dopamin-respons ved normale
                belønninger, men forhøjet respons ved gambling-relaterede stimuli.
              </p>
              <p>
                <strong className="text-foreground">Prefrontal cortex-dysfunktion:</strong>{" "}
                Hjerneområdet ansvarligt for impulskontrol, beslutningstagning og konsekvensberegning fungerer
                suboptimalt hos ludomaner. Dette forklarer den karakteristiske manglende evne til at stoppe spil,
                selv når konsekvenserne er tydelige. Denne dysfunktion kan være både årsag til og konsekvens af
                gambling – gentagen gambling reducerer prefrontal aktivitet over tid.
              </p>
              <p>
                <strong className="text-foreground">Near-miss effekten:</strong>{" "}
                Næsten-gevinster (near-misses) aktiverer hjernens belønningssystem næsten lige så stærkt som
                faktiske gevinster – selvom de objektivt er tab. Denne neurologiske 'bug' udnyttes bevidst i
                spillemaskiners design og er en af de primære drivkræfter bag fortsat spil trods tab.
                Forståelse af{" "}
                <Link to="/ordbog/rtp" className="text-primary underline hover:text-primary/80">
                  RTP (Return to Player)
                </Link>{" "}
                og{" "}
                <Link to="/ordbog/house-edge" className="text-primary underline hover:text-primary/80">
                  house edge
                </Link>{" "}
                kan hjælpe med at korrigere kognitive forvrængninger.
              </p>
              <p>
                <strong className="text-foreground">Stressrespons og cortisol:</strong>{" "}
                Gambling aktiverer hypothalamus-hypofyse-binyrebark-aksen (HPA-aksen) og udløser cortisol
                (stresshormon). Paradoksalt nok oplever ludomaner denne stressrespons som stimulerende, og
                kroppen begynder at kræve denne kemiske cocktail af dopamin og cortisol – hvilket skaber en
                fysiologisk afhængighedscyklus.
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Denne neurobiologiske forståelse har revolutioneret behandlingen af ludomani. Hvor
            man tidligere betragtede det som et moralsk svigt, anerkendes det nu som en
            hjernerelateret tilstand, der kræver samme evidensbaserede tilgang som andre
            afhængighedssygdomme. Kognitiv adfærdsterapi (KAT) er dokumenteret effektiv, fordi
            den specifikt adresserer de kognitive forvrængninger, der vedligeholder den
            neurobiologiske afhængighedscyklus.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            6. SELVTEST
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="selvtest">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <HelpCircle className="h-7 w-7 text-primary" />
            Selvtest – er du i risikozonen?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Følgende spørgsmål er baseret på det internationalt validerede screeningsværktøj
            PGSI (Problem Gambling Severity Index). Svar ærligt – der er ingen forkerte svar,
            og testen er helt anonym:
          </p>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <ol className="space-y-3 text-sm text-muted-foreground">
              {[
                "Har du spillet for mere, end du egentlig havde råd til at tabe?",
                "Har du haft behov for at spille for større og større beløb for at opnå den samme spænding?",
                "Har du vendt tilbage for at forsøge at vinde penge tilbage, du har tabt?",
                "Har du lånt penge eller solgt ejendele for at finansiere dit spil?",
                "Har du følt, at du muligvis har et problem med gambling?",
                "Har dit spil forårsaget helbredsproblemer, herunder stress, angst eller søvnproblemer?",
                "Har andre kritiseret dit spil eller sagt, at du har et problem – uanset om du er enig?",
                "Har dit spil skabt økonomiske problemer for dig eller din husstand?",
                "Har du følt dig skyldig over den måde, du gambler på, eller over hvad der sker, når du gambler?",
              ].map((q, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{q}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { score: "0 ja-svar", risk: "Ingen risiko", color: "text-green-500", desc: "Din spilleadfærd er inden for normale rammer." },
              { score: "1–2 ja-svar", risk: "Moderat risiko", color: "text-yellow-500", desc: "Overvej at sætte indbetalingsgrænser og kontakte StopSpillet for en samtale." },
              { score: "3+ ja-svar", risk: "Høj risiko", color: "text-destructive", desc: "Vi anbefaler kraftigt at kontakte Center for Ludomani eller StopSpillet for professionel vurdering." },
            ].map((item) => (
              <Card key={item.score} className="border-border bg-card text-center">
                <CardContent className="p-5">
                  <p className={`text-lg font-bold mb-1 ${item.color}`}>{item.score}</p>
                  <p className="font-semibold text-foreground text-sm mb-2">{item.risk}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Denne selvtest erstatter ikke en professionel vurdering. Hvis du er bekymret for
            din spilleadfærd – uanset dit resultat – opfordrer vi dig til at kontakte StopSpillet
            (70 22 28 25) for en gratis, fortrolig samtale med en rådgiver.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            7. BEHANDLINGSMULIGHEDER
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="behandling">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <HandHeart className="h-7 w-7 text-primary" />
            Behandlingsmuligheder i Danmark
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Danmark har et veludbygget behandlingssystem for ludomani med flere gratis muligheder.
            Alle tilbud er fortrolige, og de fleste kræver ingen lægehenvisning:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                icon: Heart,
                title: "Center for Ludomani",
                desc: "Danmarks specialiserede behandlingstilbud for gambling disorder. Tilbyder gratis individuel kognitiv adfærdsterapi (KAT), gruppeterapi og online-rådgivning. Har afdelinger i hele Danmark. Ingen ventetid i de fleste tilfælde. Kræver ingen lægehenvisning.",
                url: "https://ludomani.dk/",
              },
              {
                icon: Phone,
                title: "StopSpillet (70 22 28 25)",
                desc: "Gratis, fortrolig rådgivningstjeneste for spillere og pårørende. Tilbyder telefonisk rådgivning (hverdage 10-16), chat-rådgivning og e-mail-support. Kan hjælpe med at finde det rigtige behandlingstilbud og fungerer som første kontaktpunkt for mange.",
                url: "https://www.stopspillet.dk/",
              },
              {
                icon: Users,
                title: "Kommunale misbrugstilbud",
                desc: "Under Servicelovens § 101 har kommunerne pligt til at tilbyde behandling for gambling-relaterede problemer. Kontakt din kommunes misbrugscenter for information. Tilbuddet varierer, men inkluderer typisk individuel rådgivning og gruppeterapi. Gratis.",
                url: "#",
              },
              {
                icon: MessageCircle,
                title: "Gamblers Anonymous (GA)",
                desc: "Selvhjælpsgruppe baseret på 12-trins modellen, tilgængelig i flere danske byer. GA tilbyder et støttende fællesskab af mennesker med lignende erfaringer. Møderne er gratis, anonyme og kræver ingen tilmelding. Supplerer professionel behandling.",
                url: "#",
              },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
                  {item.url !== "#" && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-3.5 w-3.5" />
                        Besøg
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            De bedste behandlingsresultater opnås ved at kombinere professionel terapi
            (Center for Ludomani) med selvudelukkelse via{" "}
            <Link to="/ansvarligt-spil/rofus" className="text-primary underline hover:text-primary/80">
              ROFUS
            </Link>
            , praktiske barrierer (bankblokering, blokeringssoftware) og social støtte
            (GA, pårørende). Denne "layered" tilgang adresserer ludomani fra alle vinkler
            og giver den højeste chance for vedvarende recovery.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            8. KOGNITIV ADFÆRDSTERAPI
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="kognitiv-terapi">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Kognitiv adfærdsterapi (KAT) for ludomani
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kognitiv adfærdsterapi (KAT) er den mest evidensbaserede behandlingsform for
            ludomani og anbefales af WHO, Sundhedsstyrelsen og internationale guidelines.
            KAT adresserer de kognitive forvrængninger, der vedligeholder spilleadfærden:
          </p>

          <div className="space-y-3 mb-6">
            {[
              {
                title: "Gambler's Fallacy",
                desc: "Troen på, at tidligere resultater påvirker fremtidige udkom – f.eks. 'rød er kommet 5 gange i træk, så sort må komme nu'. KAT lærer spilleren at forstå statistisk uafhængighed og tilfældighed.",
              },
              {
                title: "Illusion of Control",
                desc: "Overbevisningen om, at man kan påvirke tilfældige udfald gennem 'systemer', ritualer eller særlig dygtighed. KAT dekonstruerer denne illusion via matematisk forståelse af house edge og RTP.",
              },
              {
                title: "Selective Memory",
                desc: "Tendensen til at huske gevinster tydeligt, men glemme eller bagatellisere tab. KAT bruger journalføring og dataanalyse til at konfrontere spilleren med den reelle balance.",
              },
              {
                title: "Near-Miss Bias",
                desc: "Fortolkning af næsten-gevinster som 'beviser' på, at man er tæt på at vinde. KAT forklarer den neurobiologiske mekanisme og afmystificerer near-misses som design-tricks.",
              },
              {
                title: "Chasing Losses",
                desc: "Den irrationelle overbevisning om, at man kan vinde tabte penge tilbage ved at spille mere. KAT lærer spilleren at acceptere tab som endelige og bryde denne destruktive cyklus.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm text-foreground mb-1 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed ml-6">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Et typisk KAT-forløb for ludomani varer 8–16 sessioner à 60 minutter.
            Behandlingseffekten er veldokumenteret: meta-analyser viser, at 60–70 % af
            patienter opnår signifikant reduktion i spilleadfærd efter endt behandling, og
            effekten vedligeholdes typisk i 1–2 års opfølgning. Center for Ludomani tilbyder
            KAT gratis i hele Danmark.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            9. PÅRØRENDE
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="paaroerende">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Hjælp til pårørende
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ludomani rammer ikke kun spilleren – pårørende bærer en enorm byrde.
            Undersøgelser viser, at op til 8–10 personer i spillerens nærmeste omgangskreds
            påvirkes direkte. Partners, børn, forældre og nære venner oplever ofte:
          </p>

          <ul className="space-y-2 mb-6 text-muted-foreground">
            {[
              "Økonomisk usikkerhed og gæld forårsaget af spillerens adfærd",
              "Tillidsbrud og følelsen af at blive løjet for",
              "Stress, angst og depression som reaktion på situationen",
              "Social isolation – skam over at fortælle andre om problemet",
              "Følelsen af medansvar eller skyld ('kunne jeg have forhindret det?')",
              "Børns utryghed og adfærdsmæssige reaktioner på familiekonflikter",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <Heart className="h-4 w-4 mt-1 text-primary shrink-0" />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <HandHeart className="h-5 w-5 text-primary" />
              Konkrete råd til pårørende
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">1. Søg hjælp til dig selv først:</strong>{" "}
                StopSpillet (70 22 28 25) tilbyder gratis rådgivning specifikt til pårørende. Du behøver
                ikke vente på, at spilleren erkender problemet – din egen trivsel er vigtig.
              </p>
              <p>
                <strong className="text-foreground">2. Beskyt økonomien:</strong>{" "}
                Overvej separate konti, fjern adgang til fælles kreditkort, og kontakt banken om mulighed
                for at blokere gambling-transaktioner. Det er ikke illoyalt – det er nødvendigt.
              </p>
              <p>
                <strong className="text-foreground">3. Sæt grænser uden ultimatumer:</strong>{" "}
                Kommunikér tydeligt, hvad du kan acceptere, uden at true. Ultimatumer virker sjældent,
                men klare grænser beskytter dig og kan motivere spilleren til at søge hjælp.
              </p>
              <p>
                <strong className="text-foreground">4. Undgå at finansiere spil:</strong>{" "}
                Lån ikke penge til spilleren, og overtag ikke deres gæld. Det kaldes 'enabling' og
                forlænger typisk problemet. Hjælp hellere med at finde professionel støtte.
              </p>
              <p>
                <strong className="text-foreground">5. Informér dig selv:</strong>{" "}
                Forståelse af ludomani som en neurobiologisk tilstand hjælper med at reducere frustration
                og vrede. Det er ikke et bevidst valg – det er en sygdom, der kræver behandling.
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Center for Ludomani tilbyder også pårørende-grupper, hvor du kan møde andre i
            lignende situationer. Derudover har StopSpillet dedikerede rådgivere med speciale
            i pårørende-problematikker. Husk: du er ikke alene, og du har ret til hjælp.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            10. FOREBYGGELSE
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="forebyggelse">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            Forebyggelse og selvhjælpsværktøjer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Forebyggelse er langt mere effektivt end behandling. Uanset om du er en
            rekreativ spiller eller blot ønsker at beskytte dig selv, er her konkrete
            værktøjer til at opretholde kontrol:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              { icon: Lock, title: "ROFUS-tilmelding", desc: "Tilmeld dig ROFUS som forebyggende foranstaltning – midlertidig udelukkelse (f.eks. 1 måned) er ideel til 'digital detox'." },
              { icon: Scale, title: "Indbetalingsgrænser", desc: "Sæt daglige, ugentlige og månedlige indbetalingsgrænser på alle dine casino-konti. Dansk lov kræver, at alle operatører tilbyder dette." },
              { icon: Clock, title: "Tidsgrænser", desc: "Brug sessionstids-advarsler og sæt daglige spilgrænser. Mange casinoer tilbyder automatisk log-out efter en bestemt periode." },
              { icon: BarChart3, title: "Budget og regnskab", desc: "Før et nøje regnskab over dine spil – indsatser, gevinster og tab. Objektivt overblik forhindrer selektiv hukommelse." },
              { icon: Globe, title: "Blokeringssoftware", desc: "Installer BetBlocker (gratis) eller Gamban for at blokere adgang til gambling-sider på alle enheder." },
              { icon: Phone, title: "Bankblokering", desc: "Kontakt din bank om at blokere transaktioner til gambling-udbydere via netbank eller mobilbank." },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-sm text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Den mest effektive forebyggelsesstrategi er at kombinere flere barrierer – det vi
            kalder en "layered approach". ROFUS blokerer licenserede sider, BetBlocker blokerer
            ulicenserede sider, bankblokering forhindrer transaktioner, og indbetalingsgrænser
            begrænser beløbene. Læs vores{" "}
            <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">
              overordnede guide til ansvarligt spil
            </Link>{" "}
            for flere strategier.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            11. LOVGIVNING
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="lovgivning">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gavel className="h-7 w-7 text-primary" />
            Lovgivning og spillerbeskyttelse
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den danske spillelovgivning indeholder flere bestemmelser, der specifikt sigter mod
            at forebygge og begrænse ludomani. Disse regler administreres af{" "}
            <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">
              Spillemyndigheden
            </Link>:
          </p>

          <div className="rounded-xl border border-border bg-card p-6 space-y-3 mb-6">
            {[
              {
                title: "Spillelovens kapitel 5 – Spillerbeskyttelse",
                desc: "Pålægger operatører at implementere ansvarligt spil-foranstaltninger inkl. ROFUS-integration, indbetalingsgrænser og identifikation af risikoadfærd.",
              },
              {
                title: "BEK nr. 1494 (Bonusbekendtgørelsen)",
                desc: "Begrænser bonusser til max 1.000 kr. med max 10x omsætningskrav for at beskytte sårbare spillere mod aggressive bonustilbud.",
              },
              {
                title: "ROFUS (BEK nr. 1274)",
                desc: "Det juridiske grundlag for Danmarks selvudelukkelsesregister, der forpligter alle licenserede operatører til at konsultere registret i realtid.",
              },
              {
                title: "Reklamebegrænsninger",
                desc: "Regler for ansvarlig markedsføring af gambling, inkl. forbud mod at målrette reklamer mod mindreårige og krav om tydeligt ansvarligheds-budskab.",
              },
              {
                title: "Servicelovens § 101",
                desc: "Kommunernes forpligtelse til at tilbyde gratis behandling for afhængighed, herunder ludomani, via kommunale misbrugscentre.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <Scale className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <span className="font-medium text-sm text-foreground">{item.title}:</span>{" "}
                  <span className="text-sm text-muted-foreground">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Lovgivningen suppleres af{" "}
            <Link to="/casino-licenser" className="text-primary underline hover:text-primary/80">
              det danske licenssystem
            </Link>
            , der kræver, at alle operatører implementerer ansvarligt spil-foranstaltninger som
            betingelse for deres licens. Operatører, der ikke lever op til kravene, risikerer
            bøder, påbud eller licensinddragelse. Denne regulatoriske ramme er en af de
            strengeste i Europa og bidrager til at beskytte danske spillere mod de værste
            konsekvenser af ukontrolleret gambling.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            12. FÅ HJÆLP NU
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="hjaelp">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Phone className="h-7 w-7 text-primary" />
            Få hjælp nu
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Hvis du eller en pårørende kæmper med ludomani, er hjælpen gratis og fortrolig.
            Du behøver ikke have alle svar – det første skridt er at tage kontakt:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                icon: Phone,
                title: "StopSpillet",
                desc: "Gratis, fortrolig rådgivning for spillere og pårørende. Telefonisk rådgivning: 70 22 28 25 (hverdage 10-16). Chat og e-mail tilgængelig.",
                url: "https://www.stopspillet.dk/",
                label: "Besøg StopSpillet",
              },
              {
                icon: Heart,
                title: "Center for Ludomani",
                desc: "Gratis, professionel behandling (KAT). Individuel terapi, gruppeterapi og online-rådgivning. Ingen ventetid. Afdelinger i hele Danmark.",
                url: "https://ludomani.dk/",
                label: "Besøg Center for Ludomani",
              },
              {
                icon: Shield,
                title: "ROFUS – Selvudelukkelse",
                desc: "Tilmeld dig ROFUS for at blokere adgang til alle danske licenserede spiludbydere. Gratis og aktiveres inden for 24 timer.",
                url: "https://www.spillemyndigheden.dk/rofus",
                label: "Gå til ROFUS",
              },
            ].map((resource) => (
              <Card key={resource.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <resource.icon className="h-5 w-5 text-primary" />
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                    {resource.desc}
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-3.5 w-3.5" />
                      {resource.label}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-muted/50">
            <CardContent className="p-6 text-center">
              <h3 className="mb-3 text-xl font-bold">Husk</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ludomani er en anerkendt sygdom – ikke en karaktersvaghed. At søge hjælp er et
                tegn på styrke, ikke svaghed. Med den rette støtte kan du genvinde kontrollen
                over dit liv. Du er ikke alene.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <a href="tel:70222825">
                    <Phone className="mr-2 h-4 w-4" />
                    Ring til StopSpillet: 70 22 28 25
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://www.spillemyndigheden.dk/rofus" target="_blank" rel="noopener noreferrer">
                    <Shield className="mr-2 h-4 w-4" />
                    Tilmeld dig ROFUS
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        <AnsvarligtSpilResources currentPath="/ansvarligt-spil/ludomani" />
        <LatestNewsByCategory pagePath="/ansvarligt-spil/ludomani" />
        <RelatedGuides currentPath="/ansvarligt-spil/ludomani" />
        <FAQSection title="Ofte Stillede Spørgsmål om Ludomani" faqs={ludomaniFaqs} />
        <AuthorBio author="ajse" showCommunity={false} />
      </div>
    </>
  );
};

export default LudomaniGuide;
