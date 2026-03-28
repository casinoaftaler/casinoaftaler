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
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import betiniaRegMitid from "@/assets/screenshots/betinia-reg-mitid.webp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { buildFaqSchema, buildArticleSchema, buildHowToSchema, SITE_URL } from "@/lib/seo";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import rofusHero from "@/assets/heroes/rofus-guide-hero.jpg";
import {
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Smartphone,
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
  Timer,
  Ban,
  ShieldCheck,
  FileText,
  UserX,
  RefreshCw,
  Info,
} from "lucide-react";
import { ContentPageLayout } from "@/components/ContentPageLayout";

// ────────────────────────────────────────────────────────────────
// FAQ Data – 10 spørgsmål med dybdegående svar
// ────────────────────────────────────────────────────────────────
const rofusFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er ROFUS, og hvem står bag?",
    answer: (
      <>
        ROFUS (Register Over Frivilligt Udelukkede Spillere) er et centralt dansk register
        administreret af{" "}
        <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">
          Spillemyndigheden
        </Link>
        . Registret blev oprettet i 2012 som en del af den danske spillelovgivning og fungerer
        som et bindende selvudelukkelsesværktøj. Alle danske licenserede spiludbydere – herunder
        online casinoer, sportsbettingsider og fysiske spillehaller – er lovpligtige at konsultere
        ROFUS i realtid, før en spiller kan oprette en konto eller foretage en indbetaling. ROFUS
        er unikt i international sammenligning, fordi det dækker alle licenserede operatører under
        én samlet database, modsat lande som Storbritannien, hvor selvudelukkelse håndteres via
        separate ordninger (GamStop) med frivillig tilslutning.
      </>
    ),
  },
  {
    question: "Hvordan tilmelder jeg mig ROFUS?",
    answer:
      "Du tilmelder dig ROFUS via Spillemyndighedens hjemmeside (spillemyndigheden.dk/rofus) med dit MitID. Processen tager under 5 minutter. Du vælger først udelukkelsestype (midlertidig eller permanent) og dernæst varighed. Registreringen træder i kraft inden for 24 timer, hvorefter alle licenserede spiludbydere automatisk blokerer din adgang. Du modtager en bekræftelse via e-mail. Det kræver ingen kontakt til de enkelte casinoer – ROFUS-databasen håndterer blokeringen centralt.",
  },
  {
    question: "Hvad er forskellen på midlertidig og permanent udelukkelse?",
    answer:
      "Midlertidig udelukkelse gælder for en fast periode (24 timer, 1 måned, 3 måneder, 6 måneder eller 1 år), og udelukkelsen kan ikke ophæves før periodens udløb. Når perioden udløber, genaktiveres din adgang automatisk – medmindre du fornyer udelukkelsen. Permanent udelukkelse er som udgangspunkt uendelig, men kan tidligst ophæves efter 1 år ved at kontakte Spillemyndigheden. Ved ophævelse af permanent udelukkelse er der en obligatorisk afkølingsperiode på 7 dage, hvor du stadig er blokeret. Dette giver dig tid til at genoverveje din beslutning. Spillemyndigheden anbefaler altid at starte med permanent udelukkelse, hvis du oplever problematisk spilleadfærd.",
  },
  {
    question: "Dækker ROFUS udenlandske casinoer og sider uden dansk licens?",
    answer: (
      <>
        Nej. ROFUS dækker udelukkende spiludbydere med gyldig dansk licens udstedt af
        Spillemyndigheden. Ulicenserede offshore-casinoer og internationale sider uden dansk
        tilladelse er ikke tilsluttet registret og konsulterer ikke ROFUS-databasen. Dette er en
        af grundene til, at vi på Casinoaftaler.dk udelukkende anbefaler{" "}
        <Link to="/casino-licenser" className="text-primary underline hover:text-primary/80">
          casinoer med dansk licens
        </Link>
        , hvor spillerbeskyttelsen er juridisk forankret. Hvis du er tilmeldt ROFUS og alligevel
        kan oprette en konto på et casino, er det et sikkert tegn på, at casinoet ikke har dansk
        licens – og dermed ikke overholder dansk lovgivning.
      </>
    ),
  },
  {
    question: "Kan jeg spille på fysiske casinoer i Danmark, når jeg er tilmeldt ROFUS?",
    answer:
      "Nej. ROFUS dækker alle licenserede spilleformer i Danmark – både online casinoer, sportsbooks, bingo-udbydere, fysiske spillehaller og landbaserede casinoer som Casino Copenhagen og Casino Munkebjerg. Når du er registreret i ROFUS, er alle disse udbydere forpligtet til at nægte dig adgang. Ved fysiske casinoer verificeres dette typisk via billedID og CPR-nummer mod ROFUS-registret. Det er ikke muligt at vælge kun at udelukke sig fra online spil – udelukkelsen er total.",
  },
  {
    question: "Hvad sker der med mine eksisterende indbetalinger og saldo, når jeg tilmelder mig?",
    answer:
      "Når din ROFUS-registrering træder i kraft, lukker spiludbyderen din konto. Eventuel resterende saldo udbetales til dig via din registrerede betalingsmetode. Aktive bonusser annulleres typisk, da bonusvilkårene ikke længere kan opfyldes. Uafgjorte væddemål afregnes normalt efter begivenhedens afslutning, hvorefter gevinsten udbetales. Du mister ikke penge, der allerede er på din konto – udbyderne er forpligtet til at returnere din saldo. Processen kan tage 1-5 hverdage afhængigt af betalingsmetoden.",
  },
  {
    question: "Hvad koster det at tilmelde sig ROFUS?",
    answer:
      "ROFUS er 100 % gratis. Der er ingen gebyrer for tilmelding, vedligeholdelse eller ophævelse af din udelukkelse. Spillemyndigheden finansieres via licensafgifter fra spiludbyderne – ikke af spillerne. Du skal blot have et gyldigt dansk MitID for at registrere dig. Der kræves heller ingen begrundelse for din tilmelding – du kan registrere dig uanset årsag.",
  },
  {
    question: "Kan nogen anden tilmelde mig ROFUS uden mit samtykke?",
    answer:
      "Nej. ROFUS-tilmelding kræver personlig autentificering via MitID, som er knyttet til dit CPR-nummer og biometri. Ingen tredjepart – hverken familiemedlemmer, venner, rådgivere eller myndigheder – kan registrere dig uden din aktive medvirken. Dette sikrer, at udelukkelsen altid er frivillig og selvbestemt. Hvis du er bekymret for en pårørendes spilleadfærd, anbefaler vi at kontakte StopSpillet (70 22 28 25) for rådgivning om, hvordan du bedst kan støtte vedkommende.",
  },
  {
    question: "Hvad sker der, hvis et casino overtræder ROFUS-reglerne?",
    answer: (
      <>
        Spiludbydere, der ikke konsulterer ROFUS-registret korrekt, begår en alvorlig
        lovovertrædelse.{" "}
        <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">
          Spillemyndigheden
        </Link>{" "}
        kan udstede administrative bøder, offentlige advarsler, påbud om procesændringer eller i
        grove tilfælde inddrage licensen helt. Historisk har Spillemyndigheden udstedt bøder på
        op til 400.000 kr. for ROFUS-overtrædelser. Casinoer er også forpligtet til at føre
        interne kontroller og logge alle ROFUS-opslag. Hvis du oplever, at et licenseret casino
        ikke blokerer din adgang trods ROFUS-tilmelding, bør du straks rapportere dette til
        Spillemyndigheden via deres klageformular.
      </>
    ),
  },
  {
    question: "Kan jeg tilmelde mig ROFUS som forebyggende foranstaltning, selvom jeg ikke har et problem?",
    answer:
      "Ja, absolut. ROFUS er designet til alle, der ønsker at begrænse deres adgang til gambling – uanset årsag. Mange bruger midlertidig udelukkelse (f.eks. 1 måned) som en 'digital detox' fra casinospil, under eksamensperioder, ved økonomisk stramhed eller simpelthen for at holde en pause. Der kræves ingen medicinsk diagnose eller dokumentation for spilleproblemer. Forebyggende brug af ROFUS er faktisk en sund strategi for alle, der ønsker at opretholde kontrol over deres spillevaner – på samme måde som man sætter indbetalingsgrænser proaktivt.",
  },
];

// ────────────────────────────────────────────────────────────────
// How-To Schema – Trin-for-trin tilmelding
// ────────────────────────────────────────────────────────────────
const howToSchema = buildHowToSchema({
  name: "Sådan tilmelder du dig ROFUS – trin for trin",
  description:
    "Komplet guide til at registrere dig i ROFUS (Register Over Frivilligt Udelukkede Spillere) via Spillemyndighedens hjemmeside med MitID.",
  pageUrl: `${SITE_URL}/ansvarligt-spil/rofus`,
  totalTime: "PT5M",
  steps: [
    {
      name: "Gå til Spillemyndighedens ROFUS-side",
      text: "Åbn din browser og naviger til spillemyndigheden.dk/rofus. Klik på 'Tilmeld dig ROFUS' knappen.",
    },
    {
      name: "Log ind med MitID",
      text: "Autentificer dig med dit MitID (nøgleapp, kodeviser eller chip). Dit CPR-nummer verificeres automatisk.",
    },
    {
      name: "Vælg udelukkelsestype",
      text: "Vælg mellem midlertidig udelukkelse (24 timer til 1 år) eller permanent udelukkelse. Spillemyndigheden anbefaler permanent ved alvorlige bekymringer.",
    },
    {
      name: "Bekræft din registrering",
      text: "Gennemgå dine valg og bekræft registreringen. Du modtager en bekræftelse via e-mail. Udelukkelsen træder i kraft inden for 24 timer.",
    },
  ],
});

const RofusGuide = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(rofusFaqs);

  const articleJsonLd = buildArticleSchema({
    headline: "ROFUS – Komplet Guide til Selvudelukkelse fra Danske Casinoer",
    description:
      "Alt om ROFUS: Tilmelding, varighed, ophævelse, lovgivning og statistik. Lær hvordan du beskytter dig selv via Danmarks officielle selvudelukkelsesregister.",
    url: `${SITE_URL}/ansvarligt-spil/rofus`,
    datePublished: "2026-03-07",
    authorName: "Ajse",
    authorUrl: `${SITE_URL}/forfatter/ajse`,
  });

  return (
    <>
      <SEO
        title="ROFUS – Komplet Guide til Selvudelukkelse"
        description="ROFUS guide: Tilmelding via MitID, midlertidig vs. permanent udelukkelse og ophævelse. Beskyt dig selv via det officielle register."
        jsonLd={[faqJsonLd, articleJsonLd, howToSchema]}
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
              <Shield className="mr-1.5 h-3.5 w-3.5" />
              Ansvarligt Spil
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              ROFUS – Selvudelukkelse fra Danske Casinoer
            </h1>
            <p className="text-lg text-white/80">
              Komplet guide til Register Over Frivilligt Udelukkede Spillere: Tilmelding,
              varighed, ophævelse og alt du skal vide for at beskytte dig selv.
            </p>
          </div>
        </div>
      </section>

      <ContentPageLayout hideSidebar>
        <AuthorMetaBar author="ajse" readTime="25 Min." />
        <p className="text-sm text-muted-foreground mt-2 mb-6">
          Juridisk gennemgået og opdateret af Ajse, juridisk redaktør hos Casinoaftaler.dk.
        </p>

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={rofusHero}
            alt="ROFUS selvudelukkelse – laptop viser registreringsinterface med beskyttelsesskjold og casino-chips"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>


        {/* ══════════════════════════════════════════════════════════════
            1. HVAD ER ROFUS?
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="hvad-er-rofus">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            Hvad er ROFUS?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            ROFUS – Register Over Frivilligt Udelukkede Spillere – er Danmarks officielle
            selvudelukkelsesregister for gambling. Registret administreres af{" "}
            <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">
              Spillemyndigheden
            </Link>{" "}
            (Danish Gambling Authority) og blev etableret som en del af den danske spillelov i 2012.
            Formålet er at give danske borgere et juridisk bindende værktøj til at blokere deres
            egen adgang til alle licenserede spilleformer i Danmark.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Når du tilmelder dig ROFUS, bliver alle danske licenserede spiludbydere automatisk
            forpligtet til at nægte dig adgang. Det inkluderer online casinoer, sportsbettingsider,
            bingo-udbydere, fysiske spillehaller og landbaserede casinoer. Blokeringen sker via
            en centraliseret database, som alle licenserede operatører er lovpligtige at konsultere
            i realtid – typisk via automatiserede API-kald, der verificerer spillerens CPR-nummer
            mod ROFUS-registret ved kontooprettelse, login og indbetaling.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            ROFUS adskiller sig fra frivillige selvudelukkelsesordninger i andre lande ved at være
            lovpligtigt for alle danske licensholere. I Storbritannien er GamStop frivilligt for
            operatørerne (selvom de fleste har tilsluttet sig), mens det svenske Spelpaus er
            lovpligtigt ligesom ROFUS. Den danske model betragtes internationalt som en af de mest
            effektive på grund af sin totale dækning af alle licenserede spilleformer under ét register.
          </p>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              ROFUS i overblik
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Administreret af", value: "Spillemyndigheden" },
                { label: "Etableret", value: "2012 (Spilleloven)" },
                { label: "Tilmelding via", value: "MitID (spillemyndigheden.dk)" },
                { label: "Pris", value: "Gratis" },
                { label: "Aktiveringstid", value: "Inden for 24 timer" },
                { label: "Dækning", value: "Alle danske licenserede operatører" },
                { label: "Udelukkelsestyper", value: "Midlertidig (24 timer – 1 år) eller permanent" },
                { label: "Ophævelse (permanent)", value: "Tidligst efter 1 år + 7 dages afkøling" },
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
            ROFUS er et fundamentalt element i den danske spillerbeskyttelsesmodel og repræsenterer
            statens anerkendelse af, at gambling kan være vanedannende. Ved at gøre selvudelukkelse
            tilgængelig, gratis og juridisk bindende, sikrer Danmark, at borgere altid har mulighed
            for at tage kontrol over deres spilleadfærd – uanset om de oplever problematisk spil
            eller blot ønsker en pause. Registret er et af de mest effektive forebyggelsesværktøjer
            i det danske spillemiljø og supplerer andre foranstaltninger som indbetalingsgrænser,
            sessionstidsadvarsler og proaktiv identifikation af risikoadfærd.
          </p>
        </section>

        <ReviewScreenshot
          src={betiniaRegMitid}
          alt="MitID-login ved ROFUS-registrering – selvudelukkelse via det danske Register Over Frivilligt Udelukkede Spillere"
          caption="ROFUS-registrering kræver MitID-verifikation for at sikre juridisk bindende selvudelukkelse"
        />

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            2. ROFUS I TAL
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="statistik">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            ROFUS i tal – Statistik og udvikling
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Spillemyndighedens årsrapporter og halvårsopgørelser giver indsigt i, hvordan ROFUS
            bruges af danske borgere. Tallene viser en konsekvent stigning i tilmeldinger, hvilket
            indikerer øget bevidsthed om ansvarligt spil:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { stat: "~60.000+", label: "Aktive registreringer i ROFUS (2025)" },
              { stat: "70 %", label: "Vælger permanent udelukkelse" },
              { stat: "18–34 år", label: "Aldersgruppen med flest tilmeldinger" },
              { stat: "24 timer", label: "Maksimal aktiveringstid efter registrering" },
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
            Antallet af ROFUS-tilmeldinger er steget markant siden registrets oprettelse i 2012.
            Særligt i perioden 2020-2023 accelererede tilmeldingerne, hvilket delvist tilskrives
            COVID-19-pandemien og den medfølgende stigning i online gambling. Spillemyndighedens
            data viser, at mænd udgør ca. 75 % af tilmeldingerne, men kvinders andel er stigende.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det er bemærkelsesværdigt, at ca. 70 % af alle tilmeldinger er permanente udelukkelser
            fremfor midlertidige. Dette tyder på, at de fleste, der tager skridtet til at
            registrere sig, ønsker en definitiv løsning. Forskning fra VIVE (Det Nationale
            Forsknings- og Analysecenter for Velfærd) indikerer, at selvudelukkelse er mest
            effektiv, når den kombineres med professionel rådgivning fra organisationer som{" "}
            <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              StopSpillet
            </a>{" "}
            eller{" "}
            <a href="https://ludomani.dk/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              Center for Ludomani
            </a>.
          </p>

          <div className="rounded-xl border border-border bg-muted/30 p-5">
            <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              Kilde
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Statistikkerne er baseret på Spillemyndighedens officielle årsrapporter og
              halvårsopgørelser (2020–2025) samt data fra VIVE's nationale undersøgelser af
              spilleadfærd i Danmark. Tallene er afrundede og repræsenterer de senest tilgængelige
              offentlige data.
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            3. TRIN-FOR-TRIN TILMELDING
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="tilmelding">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Smartphone className="h-7 w-7 text-primary" />
            Sådan tilmelder du dig ROFUS – trin for trin
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Tilmelding til ROFUS er gratis, anonymt (dine data deles ikke med casinoerne ud over
            selve blokeringen) og tager under 5 minutter. Her er den komplette guide:
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                step: 1,
                icon: Globe,
                title: "Gå til Spillemyndighedens ROFUS-side",
                content:
                  "Åbn din browser og naviger til spillemyndigheden.dk/rofus. Du finder ROFUS under menupunktet 'Selvudelukkelse'. Klik på 'Tilmeld dig ROFUS' knappen for at starte processen. Sørg for, at du bruger en opdateret browser og har din MitID-app eller kodeviser klar.",
              },
              {
                step: 2,
                icon: Lock,
                title: "Log ind med MitID",
                content:
                  "Autentificer dig med dit MitID. Du kan bruge nøgleapp, kodeviser eller chip-løsningen. Dit CPR-nummer verificeres automatisk mod folkeregistret. Hvis du har problemer med MitID, kan du kontakte MitID-support (mitid.dk/support). ROFUS-tilmelding kræver dansk CPR-nummer – udenlandske statsborgere uden CPR kan kontakte Spillemyndigheden direkte.",
              },
              {
                step: 3,
                icon: Clock,
                title: "Vælg udelukkelsestype og varighed",
                content:
                  "Du vælger mellem midlertidig udelukkelse (24 timer, 1 måned, 3 måneder, 6 måneder eller 1 år) eller permanent udelukkelse. Systemet forklarer konsekvenserne af hvert valg. Spillemyndigheden anbefaler permanent udelukkelse, hvis du oplever problematisk spilleadfærd. Midlertidig udelukkelse egner sig til forebyggende pauser.",
              },
              {
                step: 4,
                icon: CheckCircle,
                title: "Bekræft din registrering",
                content:
                  "Gennemgå dit valg og bekræft med en afsluttende MitID-godkendelse. Du modtager en bekræftelse på din registrerede e-mailadresse. Udelukkelsen træder i kraft inden for 24 timer, hvorefter alle licenserede spiludbydere blokerer din adgang automatisk. Du behøver ikke kontakte de enkelte casinoer – ROFUS-databasen håndterer alt centralt.",
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

          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-5 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-1">Vigtigt at vide før tilmelding</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Midlertidig udelukkelse kan <strong>ikke</strong> ophæves før periodens udløb – heller
                  ikke ved at kontakte Spillemyndigheden. Permanent udelukkelse kan tidligst ophæves
                  efter 1 år med 7 dages obligatorisk afkøling. Overvej dit valg nøje, men husk:
                  det er bedre at vælge for lang tid end for kort.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            4. MIDLERTIDIG VS. PERMANENT UDELUKKELSE
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="udelukkelsestyper">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Timer className="h-7 w-7 text-primary" />
            Midlertidig vs. permanent udelukkelse
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            ROFUS tilbyder to overordnede udelukkelsestyper med væsentligt forskellige konsekvenser.
            Valget afhænger af din situation og dine behov:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Egenskab</th>
                  <th className="text-left p-3 font-semibold text-foreground">Midlertidig</th>
                  <th className="text-left p-3 font-semibold text-foreground">Permanent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Varighed", "24 timer, 1 md., 3 md., 6 md. eller 1 år", "Uendelig (min. 1 år)"],
                  ["Ophævelse før tid", "Ikke muligt", "Ikke muligt"],
                  ["Automatisk genaktivering", "Ja, ved periodens udløb", "Nej – kræver aktiv ophævelse"],
                  ["Afkølingsperiode", "Ingen (udløber automatisk)", "7 dages obligatorisk afkøling"],
                  ["Anbefalet til", "Forebyggende pauser, digital detox", "Problematisk spilleadfærd"],
                  ["Kan fornyes/forlænges", "Ja, via ny registrering", "Allerede permanent"],
                  ["Dækning", "Alle licenserede operatører", "Alle licenserede operatører"],
                ].map(([label, temp, perm], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                    <td className="p-3 font-medium text-foreground">{label}</td>
                    <td className="p-3 text-muted-foreground">{temp}</td>
                    <td className="p-3 text-muted-foreground">{perm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Midlertidig udelukkelse – hvornår er det det rigtige valg?
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Midlertidig udelukkelse er designet til spillere, der ønsker en kontrolleret pause
            uden permanent at afskære sig fra gambling. Det er særligt egnet til:
          </p>
          <ul className="space-y-2 mb-6 text-muted-foreground">
            {[
              "Forebyggende foranstaltning i perioder med øget fristelse (f.eks. store sportsbegivenheder)",
              "Digital detox fra casinospil under eksamener, ferier eller arbejdspres",
              "Afprøvning af selvudelukkelse som koncept, før man vælger permanent",
              "Økonomisk stramning, hvor man vil undgå impulsive indbetalinger",
              "Spillere, der ikke oplever afhængighed, men ønsker proaktiv kontrol",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-primary shrink-0" />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Ban className="h-5 w-5 text-destructive" />
            Permanent udelukkelse – den definitive løsning
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Permanent udelukkelse anbefales af Spillemyndigheden til alle, der oplever tegn
            på problematisk spilleadfærd. Den er designet til at give maksimal beskyttelse:
          </p>
          <ul className="space-y-2 mb-6 text-muted-foreground">
            {[
              "Spillere, der har forsøgt at kontrollere deres spil uden held",
              "Personer, der har økonomiske konsekvenser af gambling (gæld, lån til spil)",
              "Spillere med psykologiske symptomer (angst, depression, søvnforstyrrelser relateret til spil)",
              "Pårørende, der ønsker at beskytte sig selv efter at have oplevet gambling-relaterede problemer",
              "Alle, der ønsker en definitiv afslutning på deres forhold til gambling",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-1 text-destructive shrink-0" />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-muted-foreground leading-relaxed">
            Hvis du er i tvivl om, hvilken type du skal vælge, anbefaler både Spillemyndigheden
            og StopSpillet, at du vælger permanent udelukkelse. Du kan altid ophæve den efter
            minimum 1 år, hvis din situation ændrer sig – men den umiddelbare beskyttelse er langt
            stærkere end midlertidig udelukkelse, fordi du ikke automatisk genaktiveres.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            5. OPHÆVELSE
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="ophaevelse">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <RefreshCw className="h-7 w-7 text-primary" />
            Ophævelse af ROFUS-registrering
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Processen for ophævelse afhænger af, om du har valgt midlertidig eller permanent
            udelukkelse. Begge varianter er designet til at beskytte dig mod impulsive beslutninger:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Midlertidig udelukkelse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-3.5 w-3.5 mt-1 text-primary shrink-0" />
                    <span>Ophæves <strong>automatisk</strong> ved periodens udløb</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-3.5 w-3.5 mt-1 text-primary shrink-0" />
                    <span>Kan <strong>ikke</strong> forkortes eller annulleres</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-3.5 w-3.5 mt-1 text-primary shrink-0" />
                    <span>Du kan forlænge eller forny med en ny tilmelding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-3.5 w-3.5 mt-1 text-primary shrink-0" />
                    <span>Du modtager ingen notifikation ved udløb</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Ban className="h-5 w-5 text-destructive" />
                  Permanent udelukkelse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-3.5 w-3.5 mt-1 text-primary shrink-0" />
                    <span>Kan tidligst ophæves <strong>efter 1 år</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-3.5 w-3.5 mt-1 text-primary shrink-0" />
                    <span>Kræver aktiv anmodning via MitID</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-3.5 w-3.5 mt-1 text-primary shrink-0" />
                    <span>Obligatorisk 7 dages <strong>afkølingsperiode</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-3.5 w-3.5 mt-1 text-primary shrink-0" />
                    <span>Du kan fortryde inden for afkølingsperioden</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Den 7 dages afkølingsperiode ved ophævelse af permanent udelukkelse er et bevidst
            designvalg fra lovgivers side. Forskning viser, at de fleste impulser til at genoptage
            gambling aftager inden for 3–5 dage. Ved at kræve 7 dages ventetid reduceres risikoen
            for, at spilleren genoptager problematisk adfærd markant. Under afkølingsperioden er
            du stadig fuldt blokeret fra alle licenserede spiludbydere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det er vigtigt at understrege: ophævelse af ROFUS-registrering betyder ikke, at
            Spillemyndigheden anbefaler, at du genoptager gambling. Hvis du overvejer ophævelse,
            anbefaler vi kraftigt at kontakte StopSpillet (70 22 28 25) for en samtale, inden du
            træffer din beslutning.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            6. LOVGIVNING
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="lovgivning">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gavel className="h-7 w-7 text-primary" />
            Lovgivning og juridisk grundlag
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            ROFUS er forankret i den danske Spillelov (Lov nr. 848 af 1. juli 2010, senest ændret)
            samt tilhørende bekendtgørelser. De centrale juridiske bestemmelser er:
          </p>

          <div className="rounded-xl border border-border bg-card p-6 space-y-3 mb-6">
            {[
              {
                title: "Spillelovens § 17",
                desc: "Pålægger alle licenserede spiludbydere at konsultere ROFUS-registret og nægte udelukkede spillere adgang.",
              },
              {
                title: "Bekendtgørelse om ROFUS (BEK nr. 1274)",
                desc: "Fastlægger de tekniske krav til registrets drift, datatransmission mellem Spillemyndigheden og operatørerne samt spillernes rettigheder.",
              },
              {
                title: "Spillelovens § 36–42",
                desc: "Definerer Spillemyndighedens tilsynsbeføjelser, herunder retten til at udstede bøder og inddrage licenser ved overtrædelse af ROFUS-reglerne.",
              },
              {
                title: "GDPR og Databeskyttelsesloven",
                desc: "ROFUS-data behandles under strenge databeskyttelseskrav. Kun Spillemyndigheden har adgang til det fulde register – operatørerne modtager udelukkende et ja/nej-svar ved forespørgsler.",
              },
              {
                title: "BEK nr. 1494 (Bonusbekendtgørelsen)",
                desc: "Indeholder relaterede spillerbeskyttelsesregler, herunder bonusloft på 1.000 kr. og maksimalt 10x omsætningskrav, som supplerer ROFUS-beskyttelsen.",
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

          <p className="text-muted-foreground leading-relaxed mb-4">
            Operatører, der overtræder ROFUS-reglerne, kan straffes med administrative bøder
            på op til 400.000 kr. per overtrædelse, offentlige advarsler, påbud om procesændringer
            eller i grove tilfælde inddragelse af deres danske spillelicens. Spillemyndigheden
            gennemfører regelmæssige audits af operatørernes ROFUS-integration for at sikre
            overholdelse. Læs mere om det danske licenssystem i vores{" "}
            <Link to="/casino-licenser" className="text-primary underline hover:text-primary/80">
              guide til casino licenser
            </Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det er værd at bemærke, at den danske lovgivning kontinuerligt evalueres og opdateres.
            Spillemyndigheden gennemgår jævnligt ROFUS-ordningens effektivitet og foreslår
            lovændringer til Folketinget baseret på nye data og international best practice. Den
            seneste større revision styrkede kravene til operatørernes realtidsverificering og
            indførte strengere sanktioner for overtrædelser.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            7. DÆKNINGSOMRÅDE
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="daekningsomraade">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Hvad dækker ROFUS?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            ROFUS dækker alle former for licenseret gambling i Danmark. Det er vigtigt at forstå
            den præcise dækning for at vide, hvad registreringen beskytter dig imod:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              { icon: Globe, title: "Online Casinoer", desc: "Alle licenserede danske online casinoer inkl. slots, bordspil og live casino." },
              { icon: BarChart3, title: "Sportsbetting", desc: "Alle licenserede danske sportsbooks og betting-platforme." },
              { icon: Users, title: "Fysiske Spillehaller", desc: "Landbaserede casinoer, spillehaller og automatopstillinger." },
              { icon: Smartphone, title: "Mobile Casino-apps", desc: "Casino-applikationer fra licenserede udbydere på iOS og Android." },
              { icon: FileText, title: "Online Bingo", desc: "Licenserede online bingo-udbydere med dansk tilladelse." },
              { icon: Scale, title: "Poker-turneringer", desc: "Licenserede online poker-sider og fysiske pokerturnerings-venues." },
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
            ROFUS-udelukkelsen er total – du kan ikke vælge at udelukke dig fra specifikke
            spilleformer eller operatører. Når du er registreret, er du blokeret fra alle
            licenserede spilleformer i Danmark. Dette designvalg er bevidst: forskning viser,
            at spillere med problematisk adfærd ofte migrerer til andre spilleformer, hvis de
            kun blokeres fra én type. Den totale udelukkelse eliminerer denne risiko.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            8. BEGRÆNSNINGER
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="begransninger">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-7 w-7 text-destructive" />
            Begrænsninger ved ROFUS
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Selvom ROFUS er et effektivt værktøj, er det vigtigt at forstå dets begrænsninger:
          </p>

          <div className="space-y-3 mb-6">
            {[
              {
                title: "Ingen dækning af ulicenserede sider",
                desc: "ROFUS blokerer kun licenserede danske operatører. Offshore-casinoer uden dansk licens er ikke tilsluttet og vil ikke afvise dig. Dette understreger vigtigheden af kun at spille på licenserede sider.",
              },
              {
                title: "Ingen dækning af udenlandske licenser",
                desc: "Casinoer med f.eks. Malta Gaming Authority eller Curaçao-licens er ikke forpligtet af dansk lovgivning og konsulterer ikke ROFUS. Hvis du rejser til udlandet, dækker ROFUS heller ikke lokale spilleudbydere.",
              },
              {
                title: "Lotterier og Danske Spil's monopolspil",
                desc: "Visse spil under Danske Spil's monopollicens (fx Lotto, skrabespil) er delvist undtaget fra ROFUS. Kontrollér den aktuelle dækning med Spillemyndigheden, da reglerne kan ændre sig.",
              },
              {
                title: "Aktiveringstid op til 24 timer",
                desc: "Der kan gå op til 24 timer fra registrering til fuld blokering. I denne periode kan det teknisk set være muligt at spille. Spillemyndigheden arbejder på at reducere denne forsinkelse.",
              },
              {
                title: "Ikke et behandlingsværktøj",
                desc: "ROFUS er en barriere, ikke en kur. Registreringen adresserer ikke de underliggende psykologiske årsager til problematisk spil. For effektiv behandling, kontakt StopSpillet eller Center for Ludomani.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm text-foreground mb-1 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed ml-6">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Disse begrænsninger understreger, at ROFUS bør betragtes som ét element i en
            bredere strategi for{" "}
            <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">
              ansvarligt spil
            </Link>
            . Kombineret med professionel rådgivning, indbetalingsgrænser og sociale
            støttenetværk er ROFUS et kraftfuldt værktøj – men det er ikke tilstrækkeligt
            alene, hvis du oplever alvorlig spilleafhængighed.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            9. SUPPLERENDE VÆRKTØJER
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="alternativer">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Lock className="h-7 w-7 text-primary" />
            Supplerende selvudelukkelsesværktøjer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            ROFUS er det primære værktøj, men der er flere supplerende metoder til at begrænse
            din adgang til gambling:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                icon: Shield,
                title: "Casinoets egne selvudelukkelsesværktøjer",
                desc: "De fleste licenserede casinoer tilbyder individuel selvudelukkelse, indbetalingsgrænser, tabsgrænser og sessionstidsadvarsler via kontoindstillinger. Disse kan bruges uafhængigt af ROFUS.",
              },
              {
                icon: Smartphone,
                title: "Blokeringssoftware",
                desc: "Software som Gamban, BetBlocker (gratis) og NetNanny kan blokere adgang til gambling-sider på tværs af alle enheder. BetBlocker er anbefalet af flere europæiske tilsynsmyndigheder.",
              },
              {
                icon: Lock,
                title: "Bankens spilleblokering",
                desc: "Flere danske banker (Danske Bank, Nordea, Jyske Bank m.fl.) tilbyder mulighed for at blokere transaktioner til gambling-udbydere via netbank eller mobilbank-app.",
              },
              {
                icon: Users,
                title: "Tredjeparts-overvågning",
                desc: "Involverér en betroet person (partner, ven, rådgiver) som ansvarlighedspartner. Dél dine bankoplysninger eller indbetalingsgrænser med dem for ekstra accountability.",
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
            Den mest effektive tilgang er at kombinere flere værktøjer. For eksempel: ROFUS
            (blokerer licenserede sider) + BetBlocker (blokerer ulicenserede sider) +
            bankblokering (forhindrer transaktioner) + professionel rådgivning (adresserer
            underliggende årsager). Denne "layered" tilgang minimerer chancen for tilbagefald.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            10. PSYKOLOGIEN BAG SELVUDELUKKELSE
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="psykologi">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <UserX className="h-7 w-7 text-primary" />
            Psykologien bag selvudelukkelse
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            At tilmelde sig ROFUS er mere end en teknisk handling – det er en psykologisk
            milepæl. Forskning i spilleadfærd viser, at beslutningen om selvudelukkelse ofte
            repræsenterer et vendepunkt i spillerens bevidsthed:
          </p>

          <div className="rounded-xl border border-border bg-card p-6 space-y-4 mb-6">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Nøgleindsigter fra forskning i selvudelukkelse
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Anerkendelse af problemet:</strong>{" "}
                Tilmelding til ROFUS kræver, at spilleren erkender, at deres spilleadfærd har nået
                et niveau, der kræver ekstern intervention. Denne erkendelse er ifølge kognitiv
                adfærdsterapi det første og mest afgørende skridt mod forandring.
              </p>
              <p>
                <strong className="text-foreground">Commitment device-effekten:</strong>{" "}
                ROFUS fungerer som det, adfærdsøkonomer kalder et "commitment device" – en
                selvpålagt begrænsning, der reducerer fremtidige fristelser. Ved at fjerne muligheden
                for at handle impulsivt, beskytter spilleren sit "fremtidige jeg" mod beslutninger,
                der træffes under emotionel stress.
              </p>
              <p>
                <strong className="text-foreground">Reduktion af kognitiv belastning:</strong>{" "}
                Når adgangen til gambling er blokeret, forsvinder den konstante interne kamp
                mellem "skal jeg spille" og "jeg burde ikke". Denne reduktion i kognitiv belastning
                frigør mental energi til andre livsområder og reducerer stress markant.
              </p>
              <p>
                <strong className="text-foreground">Social signaling:</strong>{" "}
                For mange spillere er ROFUS-tilmelding en måde at signalere til sig selv og
                omgivelserne, at de tager ansvar. Denne sociale dimension forstærker motivationen
                for at opretholde adfærdsændringen.
              </p>
              <p>
                <strong className="text-foreground">Tilbagefald og resiliens:</strong>{" "}
                Studier viser, at op til 30 % af ROFUS-registrerede ophæver deres udelukkelse
                og vender tilbage til gambling. Dette understreger behovet for supplerende støtte
                via rådgivningsorganisationer som StopSpillet og Center for Ludomani.
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Den psykologiske forskning understreger, at selvudelukkelse er mest effektiv, når
            den kombineres med terapeutisk støtte. ROFUS fjerner den fysiske adgang, men
            adresserer ikke de underliggende kognitive mønstre – som{" "}
            <Link to="/ordbog/rtp" className="text-primary underline hover:text-primary/80">
              fejlagtig forståelse af RTP
            </Link>
            , gamblers fallacy eller dopamin-drevet risikosøgning – der driver problematisk
            adfærd. En kombination af ROFUS og kognitiv adfærdsterapi har den højeste
            dokumenterede succesrate.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            11. INTERNATIONAL SAMMENLIGNING
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="international">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Globe className="h-7 w-7 text-primary" />
            International sammenligning
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            ROFUS er en del af en bredere europæisk trend mod centraliserede
            selvudelukkelsesregistre. Sådan sammenligner den danske model sig med andre lande:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Land</th>
                  <th className="text-left p-3 font-semibold text-foreground">Register</th>
                  <th className="text-left p-3 font-semibold text-foreground">Lovpligtig?</th>
                  <th className="text-left p-3 font-semibold text-foreground">Dækning</th>
                  <th className="text-left p-3 font-semibold text-foreground hidden md:table-cell">Aktive brugere</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Danmark 🇩🇰", "ROFUS", "Ja", "Alle licenserede", "~60.000+"],
                  ["Sverige 🇸🇪", "Spelpaus", "Ja", "Alle licenserede", "~80.000+"],
                  ["UK 🇬🇧", "GamStop", "De facto (frivillig)", "98 % af operatørerne", "~300.000+"],
                  ["Belgien 🇧🇪", "EPIS", "Ja", "Alle licenserede", "~40.000+"],
                  ["Holland 🇳🇱", "CRUKS", "Ja", "Alle licenserede", "~30.000+"],
                ].map(([land, register, lovpligt, daekning, brugere], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                    <td className="p-3 font-medium text-foreground">{land}</td>
                    <td className="p-3 text-muted-foreground">{register}</td>
                    <td className="p-3 text-muted-foreground">{lovpligt}</td>
                    <td className="p-3 text-muted-foreground">{daekning}</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{brugere}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Den danske model skiller sig positivt ud ved sin totale dækning (alle spilleformer),
            lovpligtighed og integration med MitID-infrastrukturen. Det svenske Spelpaus er den
            nærmeste parallel og har inspireret flere elementer i ROFUS-designet. Storbritanniens
            GamStop har størst brugerbasis, men er teknisk set frivillig for operatørerne (selvom
            næsten alle er tilsluttet via licensvilkår).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            EU-Kommissionen har diskuteret muligheden for et pan-europæisk selvudelukkelsesregister,
            men dette er endnu ikke realiseret. I praksis betyder det, at din ROFUS-registrering
            kun beskytter dig i Danmark. Hvis du rejser og ønsker beskyttelse i andre lande, skal
            du registrere dig i det pågældende lands register separat.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            12. FÅ HJÆLP OG STØTTE
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="hjaelp">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Phone className="h-7 w-7 text-primary" />
            Få hjælp og støtte
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            ROFUS er en vigtig del af løsningen, men professionel støtte gør en afgørende forskel.
            Alle disse tjenester er gratis og fortrolige:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                icon: Phone,
                title: "StopSpillet",
                desc: "Gratis, fortrolig rådgivning for spillere og pårørende. Telefonisk rådgivning: 70 22 28 25 (hverdage 10-16). Chat og e-mail-rådgivning tilgængelig.",
                url: "https://www.stopspillet.dk/",
                label: "Besøg StopSpillet",
              },
              {
                icon: HelpCircle,
                title: "Center for Ludomani",
                desc: "Tilbyder gratis, professionel behandling baseret på kognitiv adfærdsterapi. Individuel terapi, gruppeterapi og online-rådgivning. Behandling i hele Danmark.",
                url: "https://ludomani.dk/",
                label: "Besøg Center for Ludomani",
              },
              {
                icon: Shield,
                title: "ROFUS – Spillemyndigheden",
                desc: "Tilmeld dig ROFUS direkte via Spillemyndighedens hjemmeside. Kræver MitID. Gratis og aktiveres inden for 24 timer.",
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
                Der er ingen skam i at bede om hjælp. Spilleproblemer rammer mennesker på tværs
                af alder, køn og sociale baggrunde. Jo tidligere du søger støtte, desto bedre er
                prognosen. ROFUS er et værktøj – ikke en dom. Det er et tegn på styrke at tage
                kontrol over sin spilleadfærd.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <a href="https://www.spillemyndigheden.dk/rofus" target="_blank" rel="noopener noreferrer">
                    <Shield className="mr-2 h-4 w-4" />
                    Tilmeld dig ROFUS
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="tel:70222825">
                    <Phone className="mr-2 h-4 w-4" />
                    Ring til StopSpillet: 70 22 28 25
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        <AnsvarligtSpilResources currentPath="/ansvarligt-spil/rofus" />
        <LatestNewsByCategory pagePath="/ansvarligt-spil/rofus" />
        <RelatedGuides currentPath="/ansvarligt-spil/rofus" />
        <FAQSection title="Ofte Stillede Spørgsmål om ROFUS" faqs={rofusFaqs} />
        <AuthorBio author="ajse" showCommunity={false} />
      </ContentPageLayout>
    </>
  );
};

export default RofusGuide;
