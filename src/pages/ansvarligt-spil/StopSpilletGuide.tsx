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
import stopspilletHero from "@/assets/heroes/stopspillet-guide-hero.jpg";
import {
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
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
  MessageCircle,
  Mail,
  Info,
  HandHeart,
  Headphones,
  Calendar,
  UserCheck,
} from "lucide-react";

// ────────────────────────────────────────────────────────────────
// FAQ Data
// ────────────────────────────────────────────────────────────────
const stopspilletFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er StopSpillet?",
    answer: (
      <>
        StopSpillet er en gratis, fortrolig rådgivningstjeneste for spillere og pårørende i
        Danmark. Tjenesten er finansieret af{" "}
        <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">
          Spillemyndigheden
        </Link>{" "}
        og drives af KFUM's Sociale Arbejde i Danmark. StopSpillet tilbyder telefonisk
        rådgivning, chat-rådgivning, e-mail-support og kan hjælpe med at finde det rigtige
        behandlingstilbud. Rådgivningen er anonym – du behøver ikke oplyse dit navn, og
        samtalen registreres ikke.
      </>
    ),
  },
  {
    question: "Hvad koster det at kontakte StopSpillet?",
    answer:
      "StopSpillet er 100 % gratis. Alle rådgivningstjenester – telefon, chat og e-mail – er finansieret via midler fra Spillemyndigheden og koster dig intet. Telefonopkald til 70 22 28 25 koster alm. takst (typisk inkluderet i dit mobilabonnement). Der er ingen skjulte gebyrer, og du kan kontakte StopSpillet så mange gange, du ønsker, uden begrænsning.",
  },
  {
    question: "Hvem kan kontakte StopSpillet?",
    answer:
      "Alle kan kontakte StopSpillet – du behøver ikke have en klinisk diagnose eller et konkret problem. Tjenesten er åben for: Spillere, der er bekymrede for deres adfærd, pårørende (partnere, forældre, børn, venner) til mennesker med spilleproblemer, fagfolk der arbejder med spilleafhængighed, og alle, der ønsker information om ansvarligt spil. Du kan kontakte StopSpillet forebyggende, hvis du blot ønsker at tale med nogen om din spilleadfærd.",
  },
  {
    question: "Er StopSpillet anonymt og fortroligt?",
    answer:
      "Ja, 100 %. StopSpillet er både anonymt og fortroligt. Du behøver ikke oplyse dit navn, CPR-nummer eller andre personlige oplysninger. Rådgiverne har tavshedspligt, og samtalen registreres eller optages ikke. Ingen information deles med tredjeparter – hverken casinoer, myndigheder, forsikringsselskaber eller arbejdsgivere. Du kan tale frit og åbent uden konsekvenser.",
  },
  {
    question: "Hvornår er StopSpillet åbent?",
    answer:
      "StopSpillets telefonrådgivning (70 22 28 25) er åben hverdage (mandag–fredag) kl. 10-16. Chat-rådgivning er tilgængelig via stopspillet.dk i samme tidsrum. E-mail-henvendelser besvares inden for 1-2 hverdage. Uden for åbningstiderne kan du finde selvhjælpsressourcer på stopspillet.dk eller kontakte den akutte kriselinje (Livslinjen: 70 201 201, 24/7). StopSpillet planlægger udvidede åbningstider i fremtiden.",
  },
  {
    question: "Hvad sker der, når jeg ringer til StopSpillet?",
    answer:
      "Når du ringer til StopSpillet (70 22 28 25), mødes du af en professionelt uddannet rådgiver. Samtalen er uformel og foregår i dit tempo. Rådgiveren lytter, stiller opklarende spørgsmål og hjælper dig med at forstå din situation. Der er ingen pres for at tage beslutninger – formålet er at give dig et trygt rum at tale i. Hvis du ønsker det, kan rådgiveren hjælpe med at finde relevant behandling (f.eks. Center for Ludomani) eller guide dig til ROFUS-tilmelding. En typisk samtale varer 20-45 minutter.",
  },
  {
    question: "Kan StopSpillet hjælpe mig med at tilmelde mig ROFUS?",
    answer: (
      <>
        StopSpillet kan vejlede dig i processen og forklare mulighederne, men selve
        tilmeldingen til{" "}
        <Link to="/ansvarligt-spil/rofus" className="text-primary underline hover:text-primary/80">
          ROFUS
        </Link>{" "}
        skal du selv foretage via Spillemyndighedens hjemmeside med dit MitID. StopSpillet
        kan dog hjælpe dig med at forstå forskellen mellem midlertidig og permanent
        udelukkelse, guide dig igennem processen trin for trin, og støtte dig i at træffe
        den rigtige beslutning for din situation.
      </>
    ),
  },
  {
    question: "Tilbyder StopSpillet behandling?",
    answer:
      "StopSpillet er primært en rådgivningstjeneste – ikke et behandlingstilbud. Rådgiverne tilbyder samtaler, støtte og vejledning, men ikke egentlig terapi (som kognitiv adfærdsterapi). Hvis du har behov for behandling, kan StopSpillet henvise dig til Center for Ludomani (gratis KAT-behandling), kommunale misbrugstilbud, privatpraktiserende psykologer/psykiatere, eller Gamblers Anonymous. StopSpillet fungerer ofte som det første kontaktpunkt, der binder spilleren sammen med det relevante behandlingssystem.",
  },
  {
    question: "Kan pårørende kontakte StopSpillet?",
    answer:
      "Ja, absolut. En stor del af StopSpillets henvendelser kommer fra pårørende – partnere, forældre, børn og venner til mennesker med spilleproblemer. Rådgiverne er uddannet til at støtte pårørende med konkrete strategier: Hvordan man kommunikerer med spilleren uden at eskalere konflikten, hvordan man beskytter familiens økonomi, og hvor man finder professionel hjælp. Pårørende opfordres kraftigt til at søge støtte – selv hvis spilleren ikke erkender sit problem.",
  },
  {
    question: "Hvem finansierer StopSpillet?",
    answer: (
      <>
        StopSpillet er finansieret via puljemidler fra{" "}
        <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">
          Spillemyndigheden
        </Link>
        , der administrerer de danske spillelicenser. Midlerne stammer fra licensafgifter betalt af
        spiludbyderne – det vil sige, at industrien selv bidrager til at finansiere hjælp til
        spillere med problemer. Tjenesten drives af KFUM's Sociale Arbejde i Danmark, en
        velrenommeret NGO med årtiers erfaring inden for social rådgivning. Denne finansieringsmodel
        sikrer, at tjenesten forbliver gratis og uafhængig.
      </>
    ),
  },
];

const StopSpilletGuide = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(stopspilletFaqs);

  const articleJsonLd = buildArticleSchema({
    headline: "StopSpillet – Gratis Rådgivning for Spillere og Pårørende",
    description:
      "Komplet guide til StopSpillet: Gratis, fortrolig rådgivning for spilleafhængighed. Telefon, chat, åbningstider, hvad du kan forvente, og hvordan tjenesten hjælper.",
    url: `${SITE_URL}/ansvarligt-spil/stopspillet`,
    datePublished: "2026-03-07",
    authorName: "Ajse",
    authorUrl: `${SITE_URL}/forfatter/ajse`,
  });

  return (
    <>
      <SEO
        title="StopSpillet – Gratis Rådgivning for Spillere og Pårørende"
        description="Alt om StopSpillet: Gratis, anonym rådgivning for spilleafhængighed. Telefon 70 22 28 25, chat, åbningstider og hvordan tjenesten hjælper spillere og pårørende."
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
              <Phone className="mr-1.5 h-3.5 w-3.5" />
              Ansvarligt Spil
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              StopSpillet – Gratis Rådgivning for Spillere
            </h1>
            <p className="text-lg text-white/80">
              Komplet guide til StopSpillet: Danmarks gratis, anonyme rådgivningstjeneste
              for spillere og pårørende. Ring 70 22 28 25.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="ajse" date="2026-03-18" readTime="25 Min." />
        <p className="text-sm text-muted-foreground mt-2 mb-6">
          Juridisk og fagligt gennemgået af Ajse, juridisk redaktør hos Casinoaftaler.dk.
        </p>

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={stopspilletHero}
            alt="StopSpillet rådgivningsguide – telefon med beskyttelsesskjold symboliserer gratis hjælp til spilleafhængige"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>


        {/* ══════════════════════════════════════════════════════════════
            1. HVAD ER STOPSPILLET?
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="hvad-er-stopspillet">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Phone className="h-7 w-7 text-primary" />
            Hvad er StopSpillet?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            StopSpillet er Danmarks nationale rådgivningstjeneste for mennesker, der er berørt
            af spilleproblemer – enten som spillere eller som pårørende. Tjenesten er 100 %
            gratis, anonym og fortrolig, og den finansieres via puljemidler fra{" "}
            <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">
              Spillemyndigheden
            </Link>
            . StopSpillet drives af KFUM's Sociale Arbejde i Danmark, en anerkendt NGO med
            årtiers erfaring inden for social rådgivning og støtte.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            StopSpillet fungerer som et lavtærskel-tilbud – det første sted, mange henvender
            sig, når de begynder at bekymre sig om deres eller en pårørendes spilleadfærd.
            Rådgiverne er professionelt uddannede og specialiserede i spilleproblematikker.
            De kan hjælpe med alt fra en indledende samtale om bekymringer til konkret
            henvisning til behandlingstilbud som{" "}
            <a href="https://ludomani.dk/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              Center for Ludomani
            </a>.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Tjenesten er en central komponent i den danske spillerbeskyttelsesinfrastruktur
            og arbejder tæt sammen med Spillemyndigheden, Center for Ludomani, kommunale
            misbrugstilbud og andre aktører i feltet. StopSpillet er også aktivt involveret
            i forebyggelseskampagner og offentlig oplysning om ansvarligt spil.
          </p>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              StopSpillet i overblik
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Telefon", value: "70 22 28 25 (hverdage 10-16)" },
                { label: "Chat", value: "Via stopspillet.dk (hverdage 10-16)" },
                { label: "E-mail", value: "Via kontaktformular på stopspillet.dk" },
                { label: "Pris", value: "100 % gratis" },
                { label: "Anonymitet", value: "Fuld anonymitet – ingen registrering" },
                { label: "Drevet af", value: "KFUM's Sociale Arbejde" },
                { label: "Finansieret af", value: "Spillemyndigheden (puljemidler)" },
                { label: "Målgruppe", value: "Spillere, pårørende og fagfolk" },
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
            StopSpillet er ikke et behandlingstilbud i klinisk forstand – det er en
            rådgivningstjeneste, der hjælper dig med at navigere i det danske
            behandlingssystem og finde den rigtige hjælp. Tænk på StopSpillet som din
            første kontaktperson, der lytter, vejleder og åbner døre til videre støtte.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            2. KONTAKT STOPSPILLET
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="kontakt">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Headphones className="h-7 w-7 text-primary" />
            Sådan kontakter du StopSpillet
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            StopSpillet tilbyder flere kontaktmuligheder, så du kan vælge den, der passer
            dig bedst. Alle kanaler er gratis, anonyme og fortrolige:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                icon: Phone,
                title: "Telefon",
                desc: "Ring 70 22 28 25. Åbningstid: Hverdage (mandag-fredag) kl. 10-16. Opkaldet koster alm. takst (typisk inkluderet i dit mobilabonnement). Du bliver mødt af en rådgiver direkte – ingen ventemusik eller IVR-menuer.",
                cta: "Ring nu",
                href: "tel:70222825",
              },
              {
                icon: MessageCircle,
                title: "Chat",
                desc: "Chat med en rådgiver via stopspillet.dk. Åbningstid: Hverdage kl. 10-16. Chatten er anonym og krypteret. Ideel hvis du foretrækker at skrive fremfor at tale, eller befinder dig et sted, hvor du ikke kan ringe.",
                cta: "Åbn chat",
                href: "https://www.stopspillet.dk/",
              },
              {
                icon: Mail,
                title: "E-mail",
                desc: "Send en besked via kontaktformularen på stopspillet.dk. Svar inden for 1-2 hverdage. Ideel til ikke-akutte henvendelser eller hvis du har brug for tid til at formulere dine tanker. Din e-mail behandles fortroligt.",
                cta: "Skriv besked",
                href: "https://www.stopspillet.dk/",
              },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                      <ExternalLink className="mr-2 h-3.5 w-3.5" />
                      {item.cta}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-5 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-1">Akut krise?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Hvis du har akutte tanker om selvskade eller selvmord, kontakt <strong>Livslinjen</strong>{" "}
                  (70 201 201, 24/7) eller ring <strong>112</strong>. StopSpillet er en rådgivningstjeneste
                  og ikke en kriselinje – men de kan hjælpe dig videre til akut støtte.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            3. HVAD KAN DU FORVENTE?
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="hvad-kan-du-forvente">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <UserCheck className="h-7 w-7 text-primary" />
            Hvad kan du forvente af en samtale?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Mange tøver med at ringe, fordi de ikke ved, hvad der venter dem. Her er en
            detaljeret gennemgang af, hvad du kan forvente:
          </p>

          <div className="space-y-4 mb-6">
            {[
              {
                step: 1,
                icon: Phone,
                title: "Velkomst og tryghed",
                content:
                  "Rådgiveren præsenterer sig med fornavn og skaber en tryg ramme. Du bliver aldrig bedt om at identificere dig – samtalen er anonym fra start. Rådgiveren forklarer tavshedspligten og spørger, hvad du gerne vil tale om. Der er ingen forkerte svar.",
              },
              {
                step: 2,
                icon: Headphones,
                title: "Lytning og forståelse",
                content:
                  "Rådgiveren lytter aktivt til din historie og stiller opklarende spørgsmål. Der er ingen dømning eller moralprædiken – formålet er at forstå din situation. Mange oplever allerede lettelse ved blot at sætte ord på deres oplevelser. Samtalen foregår i dit tempo.",
              },
              {
                step: 3,
                icon: HelpCircle,
                title: "Vurdering og vejledning",
                content:
                  "Baseret på din situation hjælper rådgiveren dig med at forstå, om din spilleadfærd er problematisk, og hvilke muligheder der er for støtte. Du modtager konkrete, handlingsorienterede råd tilpasset din specifikke situation – ikke generelle floskler.",
              },
              {
                step: 4,
                icon: ArrowRight,
                title: "Handling og opfølgning",
                content:
                  "Hvis du ønsker det, kan rådgiveren hjælpe dig med næste skridt: Henvisning til Center for Ludomani, vejledning om ROFUS-tilmelding, eller information om andre støttemuligheder. Du forpligter dig ikke til noget – du bestemmer selv dit tempo og dine beslutninger.",
              },
            ].map((item) => (
              <Card key={item.step} className="border-border bg-card">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                      {item.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-primary" />
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            En typisk samtale varer 20–45 minutter, men der er ingen tidsbegrænsning. Du kan
            ringe så mange gange, du vil, og du kan bede om at tale med den samme rådgiver
            ved opfølgende samtaler (hvis tilgængelig). StopSpillet er designet til at være
            din langvarige støttepartner – ikke bare et engangstilbud.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            4. HVEM HENVENDER SIG?
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="hvem-henvender-sig">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Hvem henvender sig til StopSpillet?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            StopSpillet modtager henvendelser fra et bredt spektrum af mennesker. Du behøver
            ikke have et 'alvorligt' problem for at kontakte dem – alle henvendelser tages
            seriøst:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              { icon: UserCheck, title: "Bekymrede spillere", desc: "Spillere, der oplever de første tegn på problematisk adfærd og ønsker en samtale, før det eskalerer." },
              { icon: Users, title: "Pårørende", desc: "Partnere, forældre, børn og venner, der er bekymrede for en andens spilleadfærd. Ca. 30 % af alle henvendelser." },
              { icon: Heart, title: "Diagnosticerede ludomaner", desc: "Spillere med klinisk ludomani, der søger vejledning om behandlingsmuligheder og ROFUS-tilmelding." },
              { icon: Shield, title: "Forebyggende henvendelser", desc: "Rekreative spillere, der ønsker information om ansvarligt spil og værktøjer til at holde kontrol." },
              { icon: Globe, title: "Fagfolk", desc: "Socialrådgivere, sundhedspersonale og undervisere, der søger viden om spilleproblematikker." },
              { icon: Calendar, title: "Tidligere spillere", desc: "Mennesker i recovery, der har brug for støtte til at forebygge tilbagefald eller håndtere triggere." },
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
            Der er absolut ingen 'minimumsgrænse' for at kontakte StopSpillet. Hvis du blot
            har en nagende tanke om, at dit spil måske ikke er helt under kontrol, er det
            grund nok til at ringe. Forebyggende henvendelser er nogle af de vigtigste –
            de kan forhindre, at en mild bekymring udvikler sig til et alvorligt problem.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            5. STATISTIK
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="statistik">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            StopSpillet i tal
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            StopSpillet offentliggør regelmæssigt data om sine aktiviteter via årsrapporter.
            Tallene viser en tjeneste i vækst, der når stadig flere danskere:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { stat: "5.000+", label: "Årlige henvendelser (telefon + chat + e-mail)" },
              { stat: "~30 %", label: "Henvendelser fra pårørende" },
              { stat: "20–45 min.", label: "Gennemsnitlig samtalelængde" },
              { stat: "18–35 år", label: "Størstedelen af spillerne er i denne aldersgruppe" },
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
            Antallet af henvendelser til StopSpillet er steget konsekvent over de seneste år,
            hvilket afspejler både øget bevidsthed om tjenesten og det voksende danske
            online gambling-marked. Online casino-problematikker udgør den største andel
            af henvendelserne, efterfulgt af sportsbetting. Et stigende antal henvendelser
            relaterer sig til unge voksne (18-24 år) med online slot-problemer.
          </p>

          <div className="rounded-xl border border-border bg-muted/30 p-5">
            <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              Kilde
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Statistikkerne er baseret på StopSpillets egne årsrapporter og data fra
              Spillemyndighedens tilsynsrapporter. Tallene er afrundede og repræsenterer
              de senest tilgængelige offentlige data.
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            6. PÅRØRENDE
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="paaroerende">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <HandHeart className="h-7 w-7 text-primary" />
            Støtte til pårørende
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Som pårørende til en person med spilleproblemer bærer du en enorm byrde. StopSpillet
            har dedikerede rådgivere med speciale i pårørende-problematikker, og ca. 30 % af
            alle henvendelser kommer netop fra partnere, forældre, børn og venner. Her er,
            hvad StopSpillet kan hjælpe dig med:
          </p>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              {[
                {
                  title: "Forståelse og psykoedukation",
                  desc: "Rådgiveren hjælper dig med at forstå ludomani som en neurobiologisk tilstand – ikke et bevidst valg. Denne forståelse reducerer frustration og hjælper dig med at kommunikere mere effektivt med spilleren.",
                },
                {
                  title: "Kommunikationsstrategier",
                  desc: "Konkrete teknikker til at tale med spilleren om problemet uden at eskalere konflikten. Motiverende samtaleteknikker (MI) er dokumenteret effektive til at hjælpe spilleren mod erkendelse.",
                },
                {
                  title: "Økonomisk beskyttelse",
                  desc: "Vejledning i at beskytte familiens økonomi: separate konti, fjernelse af adgang til kreditkort, kontakt til banken om gambling-blokering, og evt. juridisk rådgivning om gæld.",
                },
                {
                  title: "Selv-omsorg",
                  desc: "Fokus på din egen trivsel – du kan ikke hjælpe andre, hvis du selv er udbrændt. Rådgiveren hjælper dig med at sætte grænser og finde støtte til dig selv.",
                },
                {
                  title: "Børns trivsel",
                  desc: "Specifik vejledning om, hvordan man beskytter børn i familier ramt af spilleproblemer – alderstilpasset kommunikation, tegn på mistrivsel og professionel hjælp.",
                },
              ].map((item) => (
                <div key={item.title}>
                  <strong className="text-foreground">{item.title}:</strong> {item.desc}
                </div>
              ))}
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Du behøver ikke vente på, at spilleren erkender sit problem, for at søge hjælp
            til dig selv. Mange pårørende oplever, at deres egen rådgivning giver dem
            redskaber til at påvirke situationen positivt – og i mange tilfælde er den
            pårørendes henvendelse til StopSpillet det første skridt mod, at spilleren selv
            søger hjælp. Læs mere i vores{" "}
            <Link to="/ansvarligt-spil/ludomani" className="text-primary underline hover:text-primary/80">
              guide til ludomani
            </Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            7. BEHANDLINGSNETVÆRK
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="behandlingsnetvaerk">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Globe className="h-7 w-7 text-primary" />
            StopSpillets behandlingsnetværk
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            StopSpillet er en del af et bredere dansk behandlingsnetværk for
            spilleafhængighed. Rådgiverne kan henvise dig til følgende tilbud:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                icon: Heart,
                title: "Center for Ludomani",
                desc: "Danmarks specialiserede behandlingscenter for gambling disorder. Tilbyder gratis kognitiv adfærdsterapi (KAT), gruppeterapi og online-behandling. Ingen ventetid i de fleste tilfælde. Ingen lægehenvisning nødvendig.",
              },
              {
                icon: Shield,
                title: "ROFUS (Selvudelukkelse)",
                desc: "Spillemyndighedens officielle selvudelukkelsesregister. StopSpillet kan vejlede dig i processen og hjælpe dig med at vælge den rigtige udelukkelsestype. Gratis tilmelding via MitID.",
              },
              {
                icon: Users,
                title: "Kommunale misbrugstilbud",
                desc: "Under Servicelovens § 101 har kommunerne behandlingsgaranti for afhængighed, herunder ludomani. StopSpillet kan hjælpe dig med at finde dit lokale tilbud.",
              },
              {
                icon: MessageCircle,
                title: "Gamblers Anonymous (GA)",
                desc: "Selvhjælpsgruppe baseret på 12-trins modellen. Gratis, anonyme møder i flere danske byer. StopSpillet kan informere om det nærmeste GA-møde.",
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
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            StopSpillet fungerer som en 'gateway' til hele det danske behandlingssystem.
            Rådgiverne kender tilbuddene indgående og kan matche din specifikke situation
            med det mest relevante tilbud. Du behøver ikke selv navigere i systemet –
            StopSpillet gør det for dig. Læs mere om{" "}
            <Link to="/ansvarligt-spil/rofus" className="text-primary underline hover:text-primary/80">
              ROFUS-tilmelding
            </Link>{" "}
            i vores dedikerede guide.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            8. FOREBYGGENDE RÅDGIVNING
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="forebyggelse">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            Forebyggende rådgivning
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            StopSpillet er ikke kun for mennesker med eksisterende problemer. En stigende
            andel af henvendelserne er forebyggende – spillere, der ønsker at sikre, at
            deres adfærd forbliver under kontrol. Forebyggende rådgivning kan inkludere:
          </p>

          <ul className="space-y-2 mb-6 text-muted-foreground">
            {[
              "Gennemgang af dine spillevaner og vurdering af risikoprofil",
              "Vejledning om indbetalingsgrænser, tidsgrænser og andre selvkontrolværktøjer",
              "Information om ROFUS-tilmelding som forebyggende 'digital detox'",
              "Hjælp til at opstille et spillebudget og overholde det",
              "Identifikation af tidlige advarselstegn, du bør være opmærksom på",
              "Vejledning om blokeringssoftware (BetBlocker, Gamban) og bankblokering",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-primary shrink-0" />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-muted-foreground leading-relaxed">
            Forebyggende rådgivning er en investering i din langsigtede trivsel. Ved at
            kontakte StopSpillet proaktivt kan du undgå, at rekreativt spil udvikler sig
            til et problem. Læs mere i vores{" "}
            <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">
              overordnede guide til ansvarligt spil
            </Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            9. OM ORGANISATIONEN
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="organisationen">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            Om organisationen bag StopSpillet
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            StopSpillet drives af <strong>KFUM's Sociale Arbejde i Danmark</strong>, en af
            landets ældste og mest respekterede sociale organisationer. KFUM's Sociale Arbejde
            har over 100 års erfaring med social rådgivning og støtte til udsatte grupper.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Organisationens engagement i spilleproblematikker bygger på en dyb forståelse af
            afhængighedsdynamikker og en etisk forpligtelse til at hjælpe uden fordomme.
            Rådgiverne hos StopSpillet er professionelt uddannede – typisk socialrådgivere,
            psykologer eller specialiserede rådgivere med efteruddannelse i spilleafhængighed.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Finansieringen fra Spillemyndigheden sikrer uafhængighed fra gambling-industrien.
            StopSpillet modtager ikke penge fra casinoer eller spiludbydere direkte – midlerne
            kommer fra licensafgifter administreret af en offentlig myndighed. Denne
            armslængde-model sikrer, at rådgivningen altid er i spillerens interesse.
          </p>

          <div className="rounded-xl border border-border bg-muted/30 p-5">
            <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
              <Gavel className="h-4 w-4 text-primary" />
              Juridisk grundlag
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              StopSpillets mandat er forankret i den danske spillelovgivning, der pålægger
              Spillemyndigheden at finansiere forebyggelses- og rådgivningstjenester via
              puljemidler fra licensafgifter. Denne lovgivningsmæssige forankring sikrer
              tjenestens fortsatte eksistens og uafhængighed.
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            10. SELVHJÆLPSRESSOURCER
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="selvhjaelp">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Lock className="h-7 w-7 text-primary" />
            Selvhjælpsressourcer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Ud over den personlige rådgivning tilbyder StopSpillet og relaterede organisationer
            en række selvhjælpsressourcer, du kan bruge på egen hånd:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { icon: BookOpen, title: "Selvtest (PGSI)", desc: "Problem Gambling Severity Index – valideret screeningsværktøj til at vurdere din spilleadfærd. Tilgængelig på stopspillet.dk." },
              { icon: Shield, title: "ROFUS-tilmelding", desc: "Selvudelukkelse fra alle danske licenserede spiludbydere. Gratis via Spillemyndighedens hjemmeside med MitID." },
              { icon: Globe, title: "BetBlocker", desc: "Gratis blokeringssoftware, der blokerer adgang til gambling-hjemmesider på alle enheder. Anbefalet af europæiske tilsynsmyndigheder." },
              { icon: BarChart3, title: "Spillebudget-skabelon", desc: "Værktøjer til at opstille og overholde et realistisk spillebudget. Tilgængelig via StopSpillets hjemmeside." },
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
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            11. SAMMENLIGNING
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="sammenligning">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <HelpCircle className="h-7 w-7 text-primary" />
            StopSpillet vs. andre tilbud
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Det danske støttesystem for spilleproblemer inkluderer flere aktører. Her er,
            hvordan StopSpillet adskiller sig fra andre tilbud:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Tilbud</th>
                  <th className="text-left p-3 font-semibold text-foreground">Type</th>
                  <th className="text-left p-3 font-semibold text-foreground">Pris</th>
                  <th className="text-left p-3 font-semibold text-foreground hidden md:table-cell">Bedst til</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["StopSpillet", "Rådgivning (telefon/chat)", "Gratis", "Første kontakt, vejledning, pårørende"],
                  ["Center for Ludomani", "Behandling (KAT)", "Gratis", "Klinisk ludomani, terapi"],
                  ["ROFUS", "Selvudelukkelse", "Gratis", "Blokering af adgang til gambling"],
                  ["Gamblers Anonymous", "Selvhjælpsgruppe", "Gratis", "Peer-støtte, fællesskab"],
                  ["Kommunalt tilbud", "Behandling", "Gratis", "Bredere afhængighedsproblematikker"],
                  ["Privatpsykolog", "Terapi", "800-1.500 kr./session", "Individuel, fleksibel tilgang"],
                ].map(([tilbud, type, pris, bedst], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                    <td className="p-3 font-medium text-foreground">{tilbud}</td>
                    <td className="p-3 text-muted-foreground">{type}</td>
                    <td className="p-3 text-muted-foreground">{pris}</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{bedst}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            StopSpillets unikke position er som <strong>det første kontaktpunkt</strong> –
            en lavtærskel-rådgivningstjeneste, der binder alle andre tilbud sammen. Hvor
            Center for Ludomani tilbyder egentlig terapi, og ROFUS tilbyder praktisk
            blokering, tilbyder StopSpillet den menneskelige kontakt og vejledning, der
            ofte er nødvendig for at tage det første skridt.
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
            Det sværeste er at tage det første skridt. StopSpillet er her for at gøre det
            skridt så let som muligt – gratis, anonymt og uden forpligtelser:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                icon: Phone,
                title: "StopSpillet",
                desc: "Gratis, fortrolig rådgivning. Ring 70 22 28 25 (hverdage 10-16) eller start en chat på stopspillet.dk.",
                url: "https://www.stopspillet.dk/",
                label: "Besøg StopSpillet",
              },
              {
                icon: Heart,
                title: "Center for Ludomani",
                desc: "Gratis, professionel behandling (KAT). Ingen ventetid. Individuel terapi, gruppeterapi og online-rådgivning.",
                url: "https://ludomani.dk/",
                label: "Besøg Center for Ludomani",
              },
              {
                icon: Shield,
                title: "ROFUS – Selvudelukkelse",
                desc: "Blokér din adgang til alle danske licenserede spiludbydere. Gratis tilmelding via MitID.",
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
                Du behøver ikke have alle svarene for at ringe. Du behøver ikke have et
                'alvorligt nok' problem. Og du behøver ikke identificere dig. StopSpillet
                er her for dig – uanset hvor du er i din rejse.
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

        <AnsvarligtSpilResources currentPath="/ansvarligt-spil/stopspillet" />
        <LatestNewsByCategory pagePath="/ansvarligt-spil/stopspillet" />
        <RelatedGuides currentPath="/ansvarligt-spil/stopspillet" />
        <FAQSection title="Ofte Stillede Spørgsmål om StopSpillet" faqs={stopspilletFaqs} />
        <AuthorBio author="ajse" showCommunity={false} />
      </div>
    </>
  );
};

export default StopSpilletGuide;
