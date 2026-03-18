import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { AnsvarligtSpilResources } from "@/components/AnsvarligtSpilResources";
import { FAQSection } from "@/components/FAQSection";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { buildFaqSchema, buildArticleSchema, buildHowToSchema, SITE_URL } from "@/lib/seo";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import selvudelukkelseHero from "@/assets/heroes/selvudelukkelse-guide-hero.jpg";
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
  Timer,
  Ban,
  ShieldCheck,
  Info,
  UserX,
  RefreshCw,
  FileText,
  Smartphone,
  Key,
  Wallet,
} from "lucide-react";

// ────────────────────────────────────────────────────────────────
// FAQ Data
// ────────────────────────────────────────────────────────────────
const selvudelukkelseFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er forskellen på ROFUS og casinoernes egne selvudelukkelsesværktøjer?",
    answer: (
      <>
        <strong>ROFUS</strong> er et nationalt register administreret af Spillemyndigheden, som blokerer dig fra{" "}
        <em>alle</em> danske licenserede casinoer, sportsbetting-sider og fysiske casinoer samtidigt.{" "}
        <strong>Casinoernes egne værktøjer</strong> (afkølingsperioder, kontolukning) gælder kun hos det specifikke
        casino. ROFUS er juridisk bindende – casinoer er lovpligtige at konsultere registret i realtid og blokere
        udelukkede spillere. Casinoernes egne værktøjer er frivillige og kan typisk ophæves hurtigere.
        For maksimal beskyttelse anbefaler vi altid ROFUS, da det eliminerer risikoen for at skifte til et andet casino.
      </>
    ),
  },
  {
    question: "Hvordan tilmelder jeg mig ROFUS trin for trin?",
    answer: (
      <>
        1. Gå til <a href="https://www.spillemyndigheden.dk/rofus" target="_blank" rel="noopener noreferrer" className="text-primary underline">spillemyndigheden.dk/rofus</a>.{" "}
        2. Log ind med dit MitID (NemID understøttes ikke længere).{" "}
        3. Vælg udelukkelsestype: midlertidig (24 timer, 1 måned, 3 måneder, 6 måneder, 1 år) eller permanent.{" "}
        4. Bekræft dit valg. Inden for 24 timer blokeres din adgang til alle licenserede operatører.{" "}
        Læs vores <Link to="/ansvarligt-spil/rofus" className="text-primary underline hover:text-primary/80">komplette ROFUS-guide</Link>{" "}
        for detaljer om processen og ophævelse.
      </>
    ),
  },
  {
    question: "Kan jeg ophæve min selvudelukkelse?",
    answer: (
      <>
        Det afhænger af typen: <strong>Midlertidig ROFUS-udelukkelse</strong> udløber automatisk efter den
        valgte periode. Du kan ikke ophæve den før tid. <strong>Permanent ROFUS-udelukkelse</strong> kan
        tidligst ophæves efter 1 år med en obligatorisk afkølingsperiode på 7 dage. Du skal aktivt
        anmode om ophævelse via MitID. <strong>Casino-specifik udelukkelse</strong> varierer – de fleste
        casinoer kræver skriftlig henvendelse og en venteperiode på 24 timer til 7 dage.
      </>
    ),
  },
  {
    question: "Hvad sker der med mine penge, når jeg udelukker mig selv?",
    answer: "Når du tilmelder dig ROFUS eller lukker din konto hos et specifikt casino, er casinoet forpligtet til at udbetale din resterende saldo til dig. Eventuelle aktive bonusser annulleres typisk, og omsætningskrav bortfalder. Udbetalingen sker til den betalingsmetode, du brugte til din seneste indbetaling. Hvis du har gevinster, der afventer udbetaling, skal casinoet stadig udbetale dem – selvudelukkelse påvirker ikke din ret til allerede vundne beløb.",
  },
  {
    question: "Dækker ROFUS også fysiske casinoer og spilleautomathaller?",
    answer: "Ja. ROFUS dækker alle former for licenseret gambling i Danmark: online casinoer, sportsbetting-sider, fysiske casinoer (Casino Copenhagen, Casino Odense, Casino Aalborg, Casino Aarhus), og spilleautomathaller. Landbaserede casinoer skal kontrollere identitet ved indgangen og afvise ROFUS-registrerede personer. Dog dækker ROFUS ikke lotteri (Danske Spil Lotto, Eurojackpot) eller hestevæddemål.",
  },
  {
    question: "Hvad er GamStop og Spelpaus, og kan jeg bruge dem i Danmark?",
    answer: (
      <>
        <strong>GamStop</strong> er den britiske pendant til ROFUS – det dækker alle UKGC-licenserede casinoer.{" "}
        <strong>Spelpaus</strong> er den svenske version, som dækker alle Spelinspektionen-licenserede operatører.
        Disse systemer er landspecifikke og dækker <em>ikke</em> danske casinoer. Hvis du spiller på udenlandske
        sider, kan du bruge det relevante lands system som supplement til ROFUS. Vi anbefaler dog kraftigt at
        holde sig til danske licenserede casinoer med ROFUS-beskyttelse.
      </>
    ),
  },
  {
    question: "Hvad er mine juridiske rettigheder, hvis et casino overtræder min ROFUS-udelukkelse?",
    answer: (
      <>
        Hvis et dansk licenseret casino tillader dig at spille trods en aktiv ROFUS-registrering, er det en
        alvorlig overtrædelse af Spilleloven. Du har ret til at:<br />
        1. Indgive klage til <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">Spillemyndigheden</Link>.<br />
        2. Kræve tilbagebetaling af alle tab i perioden, hvor du uretmæssigt fik adgang.<br />
        3. Casinoet risikerer bøde, suspension eller inddragelse af licens.<br />
        Spillemyndigheden har historisk reageret hårdt på sådanne overtrædelser, og flere operatører har
        modtaget sanktioner for manglende ROFUS-kontrol.
      </>
    ),
  },
  {
    question: "Kan jeg selvudelukke mig fra kun ét casino uden ROFUS?",
    answer: "Ja. De fleste danske casinoer tilbyder selvudelukkelse specifikt fra deres platform. Du finder typisk denne mulighed under 'Ansvarligt Spil', 'Kontobegrænsninger' eller 'Kontoindstillinger'. Kontakt kundeservice, hvis du ikke kan finde funktionen. Casino-specifik udelukkelse er et godt første skridt, men vi anbefaler ROFUS, hvis du ønsker total beskyttelse, da det forhindrer dig i blot at skifte til et andet casino.",
  },
  {
    question: "Hvad er afkølingsperiode (cooling-off period)?",
    answer: "En afkølingsperiode er en kort selvudelukkelse, typisk 24 timer til 30 dage, som de fleste casinoer tilbyder. Under afkølingsperioden kan du ikke logge ind, indbetale eller spille. Det er et nyttigt værktøj, hvis du mærker, at du spiller for meget, men ikke nødvendigvis ønsker en langvarig udelukkelse. Tænk på det som en 'pause-knap' for dit spil. ROFUS tilbyder også en 24-timers udelukkelse som den korteste option.",
  },
  {
    question: "Er der internationale selvudelukkelsesordninger?",
    answer: "Der eksisterer endnu intet globalt selvudelukkelsessystem. Hvert land med reguleret gambling har sit eget: ROFUS (Danmark), GamStop (UK), Spelpaus (Sverige), OASIS (Tyskland), CRUKS (Holland) og BAN (Belgien). Hvis du spiller på casinoer i flere jurisdiktioner, skal du tilmelde dig hvert lands system separat. EU har diskuteret en fælles europæisk løsning, men dette er endnu ikke implementeret.",
  },
];

const SelvudelukkelseGuide = () => {
  const { data: settings } = useSiteSettings();

  const articleSchema = buildArticleSchema({
    headline: "Selvudelukkelse fra Casino – Komplet Guide til ROFUS og Alle Muligheder",
    description: "Dybdegående guide til selvudelukkelse fra danske casinoer. ROFUS vs. casinoernes egne værktøjer, trin-for-trin vejledning, internationale ordninger og juridiske rettigheder.",
    url: `${SITE_URL}/ansvarligt-spil/selvudelukkelse-guide`,
    datePublished: "2026-03-08",
    dateModified: "2026-03-18",
    authorName: "Ajse",
    authorUrl: `${SITE_URL}/forfatter/ajse`,
  });

  const faqSchema = buildFaqSchema(
    selvudelukkelseFaqs.map((f) => ({
      question: f.question,
      answer: typeof f.answer === "string" ? f.answer : "",
    }))
  );

  const howToSchema = buildHowToSchema({
    name: "Sådan udelukker du dig selv fra danske casinoer via ROFUS",
    description: "Trin-for-trin guide til at tilmelde dig ROFUS og udelukke dig selv fra alle danske licenserede casinoer.",
    pageUrl: `${SITE_URL}/ansvarligt-spil/selvudelukkelse-guide`,
    steps: [
      { name: "Gå til ROFUS", text: "Besøg spillemyndigheden.dk/rofus i din browser." },
      { name: "Log ind med MitID", text: "Brug dit MitID til at identificere dig i systemet." },
      { name: "Vælg udelukkelsestype", text: "Vælg mellem midlertidig (24 timer til 1 år) eller permanent udelukkelse." },
      { name: "Bekræft dit valg", text: "Gennemgå og bekræft din udelukkelse. Den træder i kraft inden for 24 timer." },
    ],
    totalTime: "PT10M",
  });

  return (
    <>
      <SEO
        title="Selvudelukkelse – Guide til ROFUS og Casino-Udelukkelse"
        description="Komplet dansk guide til selvudelukkelse: ROFUS, casinoernes egne værktøjer, trin-for-trin vejledning, internationale ordninger og juridiske rettigheder."
        type="article"
        image={`${SITE_URL}/og-image.png`}
        jsonLd={[articleSchema, faqSchema, howToSchema]}
        breadcrumbLabel="Selvudelukkelse Guide"
        datePublished="2026-03-08"
        dateModified="2026-03-18"
      />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))`,
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
              Selvudelukkelse fra Casino – ROFUS og Alle Muligheder
            </h1>
            <p className="text-lg text-white/80">
              Komplet guide til selvudelukkelse: ROFUS, casinoernes egne værktøjer, internationale ordninger og dine juridiske rettigheder.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="ajse" date="2026-03-18" readTime="25 Min." showAffiliateDisclaimer={false} />
        <p className="text-sm text-muted-foreground mt-2 mb-6">Juridisk gennemgået og opdateret af Ajse, juridisk redaktør hos Casinoaftaler.dk.</p>

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={selvudelukkelseHero}
            alt="Selvudelukkelse fra casino – ROFUS og andre muligheder"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        {/* ── Intro ── */}
        <section className="mb-12">
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Selvudelukkelse er det mest effektive værktøj for spillere, der ønsker at stoppe eller holde pause fra gambling. Danmark har med ROFUS et af verdens mest avancerede nationale selvudelukkelsessystemer, men der findes også lokale casinomuligheder og internationale ordninger.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Denne guide giver dig en komplet oversigt over alle selvudelukkelsesmuligheder tilgængelige for danske spillere: fra ROFUS-tilmelding med MitID til casinoernes egne afkølingsperioder, internationale systemer som GamStop og Spelpaus, og dine juridiske rettigheder ved overtrædelse.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Uanset om du overvejer en kort pause eller permanent udelukkelse, finder du alle nødvendige oplysninger her. Se også vores{" "}
            <Link to="/ansvarligt-spil/rofus" className="text-primary underline hover:text-primary/80">dedikerede ROFUS-guide</Link>{" "}
            for en endnu dybere gennemgang af ROFUS-systemet specifikt.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── ROFUS vs. Casino ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            ROFUS vs. casinoernes egne værktøjer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Den vigtigste skelnen inden for selvudelukkelse er mellem det nationale ROFUS-system og de individuelle casinoers egne værktøjer. Begge har deres fordele, men de er fundamentalt forskellige i omfang og juridisk styrke.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  ROFUS (National)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Blokerer ALLE danske licenserede casinoer",
                  "Juridisk bindende – casinoer SKAL kontrollere",
                  "Tilmelding via MitID (spillemyndigheden.dk/rofus)",
                  "Midlertidig (24t–1 år) eller permanent",
                  "Permanent ophæves tidligst efter 1 år + 7 dages afkøling",
                  "Dækker også fysiske casinoer og betting",
                  "Administreret af Spillemyndigheden",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  Casinoernes egne værktøjer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Gælder KUN det specifikke casino",
                  "Frivilligt tilbudt af casinoet",
                  "Afkølingsperioder: 24 timer til 30 dage",
                  "Selvudelukkelse: 1 måned til permanent",
                  "Kontolukning: permanent sletning af konto",
                  "Kan typisk ophæves via kundeservice",
                  "Forhindrer ikke spil hos andre casinoer",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 text-muted-foreground/60 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-destructive">Vigtigt:</strong> Casinoernes egne værktøjer er et godt første skridt, men de forhindrer dig ikke i at oprette konti hos andre casinoer. Hvis du har alvorlige spilleproblemer, anbefaler vi altid ROFUS som den primære løsning, da det giver den mest omfattende beskyttelse.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* ── Midlertidig vs. permanent ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Clock className="h-7 w-7 text-primary" />
            Midlertidig vs. permanent udelukkelse
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Valget mellem midlertidig og permanent udelukkelse afhænger af din situation. Her er en detaljeret sammenligning af de tilgængelige perioder og deres implikationer.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 font-medium">Periode</th>
                  <th className="text-left py-3 px-3 font-medium">Type</th>
                  <th className="text-left py-3 px-3 font-medium">Ophævelse</th>
                  <th className="text-left py-3 px-3 font-medium">Anbefalet til</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { periode: "24 timer", type: "Midlertidig", ophævelse: "Automatisk udløb", anbefalet: "Impulskontrol efter en dårlig session" },
                  { periode: "1 måned", type: "Midlertidig", ophævelse: "Automatisk udløb", anbefalet: "Kort pause for at nulstille vaner" },
                  { periode: "3 måneder", type: "Midlertidig", ophævelse: "Automatisk udløb", anbefalet: "Seriøs revurdering af spillevaner" },
                  { periode: "6 måneder", type: "Midlertidig", ophævelse: "Automatisk udløb", anbefalet: "Langvarig pause med refleksion" },
                  { periode: "1 år", type: "Midlertidig", ophævelse: "Automatisk udløb", anbefalet: "Grundig afvænning og behandling" },
                  { periode: "Permanent", type: "Permanent", ophævelse: "Tidligst 1 år + 7 dages afkøling", anbefalet: "Spilleafhængighed / totalt stop" },
                ].map((row) => (
                  <tr key={row.periode} className="border-b border-border/50">
                    <td className="py-2 px-3 font-medium">{row.periode}</td>
                    <td className="py-2 px-3">{row.type}</td>
                    <td className="py-2 px-3">{row.ophævelse}</td>
                    <td className="py-2 px-3">{row.anbefalet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            <strong>Vores anbefaling:</strong> Hvis du er i tvivl, vælg en længere periode end du tror, du har brug for. Det er altid bedre at have for lang udelukkelse end for kort. En permanent udelukkelse kan ophæves efter 1 år, så den er ikke nødvendigvis "for evigt" – men den signalerer et seriøst engagement i at stoppe.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── Step-by-step ROFUS ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <FileText className="h-7 w-7 text-primary" />
            Trin-for-trin: Selvudelukkelse via ROFUS
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Processen med at tilmelde sig ROFUS er enkel og kan gennemføres på under 10 minutter. Her er en detaljeret vejledning.
          </p>

          <div className="space-y-4 mb-6">
            {[
              {
                step: 1,
                title: "Besøg ROFUS-portalen",
                desc: "Gå til spillemyndigheden.dk/rofus i din browser. Sørg for, at du er på den officielle side (tjek URL'en nøje).",
                icon: Globe,
              },
              {
                step: 2,
                title: "Log ind med MitID",
                desc: "Brug dit MitID (app eller kodeviser) til at identificere dig. NemID understøttes ikke længere. Hvis du ikke har MitID, kan du kontakte Spillemyndigheden direkte.",
                icon: Key,
              },
              {
                step: 3,
                title: "Vælg udelukkelsesperiode",
                desc: "Vælg mellem midlertidig udelukkelse (24 timer, 1 måned, 3 måneder, 6 måneder, 1 år) eller permanent udelukkelse. Overvej nøje, hvilken periode der passer din situation.",
                icon: Clock,
              },
              {
                step: 4,
                title: "Bekræft dit valg",
                desc: "Gennemgå dit valg og bekræft. Du modtager en bekræftelse. Inden for 24 timer blokeres din adgang til alle danske licenserede casinoer, sportsbetting-sider og fysiske casinoer.",
                icon: CheckCircle,
              },
              {
                step: 5,
                title: "Kontakt casinoer om udbetaling",
                desc: "Kontakt de casinoer, hvor du har en aktiv konto, for at få din resterende saldo udbetalt. De er forpligtet til at udbetale dine midler, selv efter udelukkelse.",
                icon: Wallet,
              },
            ].map((item) => (
              <Card key={item.step} className="border-border bg-card">
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1 flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-primary" />
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href="https://www.spillemyndigheden.dk/rofus" target="_blank" rel="noopener noreferrer">
                <Shield className="mr-2 h-4 w-4" />
                Gå til ROFUS
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/ansvarligt-spil/rofus">
                <BookOpen className="mr-2 h-4 w-4" />
                Læs komplet ROFUS-guide
              </Link>
            </Button>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ── Internationale ordninger ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Globe className="h-7 w-7 text-primary" />
            Internationale selvudelukkelsesordninger
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Hvis du spiller på udenlandske casinoer (hvilket vi fraråder – hold dig til danske licenserede sider), kan du bruge det pågældende lands selvudelukkelsessystem. Her er de vigtigste:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { land: "🇬🇧 Storbritannien", system: "GamStop", url: "gamstop.co.uk", desc: "Dækker alle UKGC-licenserede casinoer. Perioder: 6 mdr, 1 år, 5 år." },
              { land: "🇸🇪 Sverige", system: "Spelpaus", url: "spelpaus.se", desc: "Dækker alle Spelinspektionen-licenserede operatører. Perioder: 1 mdr–permanent." },
              { land: "🇩🇪 Tyskland", system: "OASIS", url: "oasis-sperrdatei.de", desc: "Centralt udelukkelsessystem for alle tyske licenserede casinoer." },
              { land: "🇳🇱 Holland", system: "CRUKS", url: "cruks.nl", desc: "Dækker alle KSA-licenserede casinoer i Holland. Minimum 6 måneder." },
              { land: "🇧🇪 Belgien", system: "EPIS/BAN", url: "gamingcommission.be", desc: "Belgisk udelukkelsessystem administreret af Gaming Commission." },
              { land: "🇳🇴 Norge", system: "Hjelpelinjen", url: "hjelpelinjen.no", desc: "Norge har statsmonopol (Norsk Tipping) med integrerede grænseværktøjer." },
            ].map((item) => (
              <Card key={item.system} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    {item.land} – {item.system}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-1">{item.desc}</p>
                  <p className="text-xs text-muted-foreground/60">{item.url}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-sm text-muted-foreground italic">
            Disse systemer er landspecifikke og dækker ikke danske casinoer. For dansk beskyttelse er ROFUS det eneste relevante system.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── Juridiske rettigheder ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gavel className="h-7 w-7 text-primary" />
            Dine juridiske rettigheder ved selvudelukkelse
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Dansk lovgivning giver selvudelukkede spillere stærke rettigheder. Her er hvad du skal vide, hvis et casino overtræder din udelukkelse.
          </p>

          <div className="rounded-xl border border-border bg-card p-6 space-y-4 mb-6">
            {[
              { title: "Ret til tilbagebetaling", desc: "Hvis et casino tillader dig at spille trods aktiv ROFUS-registrering, har du ret til tilbagebetaling af alle tab i den uretmæssige adgangsperiode." },
              { title: "Klageadgang", desc: "Du kan indgive klage direkte til Spillemyndigheden, som er forpligtet til at undersøge sagen. Sagsbehandlingstiden er typisk 4-8 uger." },
              { title: "Sanktioner mod casinoet", desc: "Casinoer, der overtræder ROFUS-kontrolpligten, risikerer bøder op til flere millioner kroner, suspension eller permanent inddragelse af licens." },
              { title: "Databeskyttelse", desc: "Dine ROFUS-data er beskyttet under GDPR. Kun casinoer med dansk licens kan forespørge registret, og data bruges udelukkende til spillerbeskyttelse." },
              { title: "Udbetaling af saldo", desc: "Ved selvudelukkelse har du altid ret til udbetaling af din resterende kontosaldo. Casinoet kan ikke tilbageholde dine midler." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <Scale className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* ── Casino-specifik guide ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Lock className="h-7 w-7 text-primary" />
            Casinoernes egne selvudelukkelsesværktøjer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Ud over ROFUS tilbyder de fleste danske casinoer deres egne ansvarligt spil-værktøjer. Disse er nyttige, hvis du ønsker en pause fra ét specifikt casino uden at blokere alle dine konti.
          </p>

          <div className="space-y-3 mb-6">
            {[
              { title: "Afkølingsperiode (24t–30 dage)", desc: "En kort pause, hvor din konto midlertidigt deaktiveres. Ideel til impulskontrol efter en dårlig session. Kontoen genaktiveres automatisk." },
              { title: "Selvudelukkelse (1–12 måneder)", desc: "En længere udelukkelse fra det specifikke casino. Du kan typisk ikke ophæve den før perioden udløber. Kontakt kundeservice for at aktivere." },
              { title: "Permanent kontolukning", desc: "Din konto lukkes permanent. Resterende saldo udbetales. Du kan typisk ikke genåbne kontoen og skal oprette en ny." },
              { title: "Spilbegrænsninger", desc: "Mange casinoer tilbyder mulighed for at blokere specifikke spiltyper (fx spillemaskiner) mens du stadig kan spille andre (fx poker). Se vores guide til spillegrænser." },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-base mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            For at sætte effektive grænser inden du overvejer udelukkelse, læs vores{" "}
            <Link to="/ansvarligt-spil/spillegraenser" className="text-primary underline hover:text-primary/80">komplette guide til spillegrænser</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── CTA ── */}
        <section className="mb-12">
          <Card className="bg-muted/50">
            <CardContent className="p-8 text-center">
              <h3 className="mb-4 text-xl font-bold">Tag det første skridt</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Selvudelukkelse er ikke et tegn på svaghed – det er et tegn på styrke og selvbevidsthed. Hvis du overvejer at tage en pause fra gambling, er det allerede et positivt skridt. Du kan altid starte med en kort afkølingsperiode og evaluere derfra.
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
                    Ring StopSpillet: 70 22 28 25
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* ── Hub-links ── */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Udforsk mere om ansvarligt spil</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Selvudelukkelse er ét element i en samlet strategi for ansvarligt spil. Udforsk vores andre guides for at lære mere om grænseværktøjer, hjælpelinjer og spillerbeskyttelse i Danmark.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { to: "/ansvarligt-spil", title: "Ansvarligt Spil", desc: "Komplet guide til ansvarligt casinospil" },
              { to: "/ansvarligt-spil/rofus", title: "ROFUS Guide", desc: "Dybdegående guide til ROFUS-systemet" },
              { to: "/ansvarligt-spil/spillegraenser", title: "Spillegrænser", desc: "Guide til alle typer grænseværktøjer" },
              { to: "/ansvarligt-spil/ludomani", title: "Ludomani Guide", desc: "Alt om spilleafhængighed i Danmark" },
              { to: "/ansvarligt-spil/stopspillet", title: "StopSpillet Guide", desc: "Gratis rådgivning for spillere" },
              { to: "/ansvarligt-spil/hjaelpelinjer", title: "Hjælpelinjer", desc: "Alle danske hjælpemuligheder samlet" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-sm transition-colors hover:bg-muted"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <LatestNewsByCategory pagePath="/ansvarligt-spil/selvudelukkelse-guide" />
        <AnsvarligtSpilResources currentPath="/ansvarligt-spil/selvudelukkelse-guide" />
        <RelatedGuides currentPath="/ansvarligt-spil/selvudelukkelse-guide" />
        <FAQSection title="Ofte Stillede Spørgsmål om Selvudelukkelse" faqs={selvudelukkelseFaqs} />
        <AuthorBio author="ajse" showCommunity={false} />
      </div>
    </>
  );
};

export default SelvudelukkelseGuide;
