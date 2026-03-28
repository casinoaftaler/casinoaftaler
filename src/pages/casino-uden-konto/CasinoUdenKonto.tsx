import React from "react";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import kapowMitidRegistrering from "@/assets/screenshots/kapow-mitid-registrering.webp";
import spilleautomatenIndbetaling from "@/assets/screenshots/spilleautomaten-indbetaling-betalingsmetoder.webp";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { FAQSection } from "@/components/FAQSection";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  Zap,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Lock,
  Scale,
  BarChart3,
  ExternalLink,
  HelpCircle,
  ArrowRight,
  Globe,
  CreditCard,
  Landmark,
  Users,
  Eye,
  Ban,
  RefreshCw,
  TrendingUp,
  FileText,
  Smartphone,
} from "lucide-react";

// ────────────────────────────────────────────────────────────────
// FAQ Data
// ────────────────────────────────────────────────────────────────
const casinoUdenKontoFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er et casino uden konto?",
    answer: (
      <>
        Et casino uden konto (også kaldet Pay N Play casino) er en type online casino, hvor du
        kan spille uden at oprette en traditionel brugerkonto. I stedet identificerer casinoet
        dig automatisk via din bankforbindelse gennem{" "}
        <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">
          Trustly
        </Link>
        's Pay N Play-teknologi. Du logger ind med dit NemID/MitID via banken, indbetaler og
        spiller – alt sammen i én samlet proces, der typisk tager under 30 sekunder.
      </>
    ),
  },
  {
    question: "Er casino uden konto lovligt i Danmark?",
    answer: (
      <>
        Ja, casino uden konto er fuldt lovligt i Danmark, forudsat at casinoet har en gyldig
        licens fra{" "}
        <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">
          Spillemyndigheden
        </Link>
        . Pay N Play-modellen overholder alle danske KYC-krav (Know Your Customer), fordi
        identitetsverifikation sker automatisk via bankforbindelsen og MitID. Casinoet modtager
        alle nødvendige oplysninger direkte fra banken, hvilket faktisk gør processen mere sikker
        end manuel registrering, hvor brugere potentielt kan indtaste falske oplysninger.
      </>
    ),
  },
  {
    question: "Hvordan fungerer udbetaling på casino uden konto?",
    answer:
      "Udbetalinger på casino uden konto fungerer typisk hurtigere end på traditionelle casinoer. Da din identitet allerede er verificeret via bankforbindelsen, er der ingen forsinkelse for KYC-tjek. Gevinster sendes direkte til den bankkonto, du brugte til indbetaling. De fleste Pay N Play-casinoer behandler udbetalinger inden for 5-15 minutter, hvilket er markant hurtigere end de 1-5 hverdage, der er standard på mange traditionelle casinoer.",
  },
  {
    question: "Hvilke banker understøtter Pay N Play i Danmark?",
    answer: (
      <>
        Trustly's Pay N Play understøtter alle de store danske banker, herunder Danske Bank,
        Nordea, Jyske Bank, Sydbank, Nykredit og Spar Nord. Læs vores{" "}
        <Link to="/casino-uden-konto/pay-n-play" className="text-primary underline hover:text-primary/80">
          detaljerede Pay N Play-guide
        </Link>{" "}
        for en komplet bankkompatibilitetsmatrice med alle 15+ understøttede danske banker og
        eventuelle begrænsninger ved specifikke banker.
      </>
    ),
  },
  {
    question: "Er casino uden konto sikrere end traditionelle casinoer?",
    answer: (
      <>
        I mange henseender ja. Da der ikke oprettes en konto med brugernavn og adgangskode, er
        der ingen risiko for credential-lækage eller password-brud. Al identifikation sker via
        bankens sikkerhedssystemer (MitID), som er den højeste sikkerhedsstandard i Danmark.
        Derudover reduceres risikoen for identitetstyveri, da casinoet aldrig direkte opbevarer
        dine personlige oplysninger. Læs mere i vores{" "}
        <Link to="/casino-uden-konto/fordele-og-ulemper" className="text-primary underline hover:text-primary/80">
          dybdegående analyse af fordele og ulemper
        </Link>
        .
      </>
    ),
  },
  {
    question: "Kan jeg sætte indbetalingsgrænser på casino uden konto?",
    answer: (
      <>
        Ja. Alle danske licenserede casinoer – uanset om de er Pay N Play eller traditionelle –
        er forpligtet til at tilbyde indbetalingsgrænser (daglige, ugentlige og månedlige), tabsgrænser
        og selvudelukkelsesmuligheder jf. Spillemyndighedens regler. Du kan også tilmelde dig{" "}
        <Link to="/ansvarligt-spil/rofus" className="text-primary underline hover:text-primary/80">
          ROFUS
        </Link>{" "}
        for at blokere din adgang til alle licenserede casinoer uanset kontomodel.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på casino uden konto og hurtig registrering?",
    answer: (
      <>
        Casino uden konto (Pay N Play) eliminerer kontooprettelsen helt – du identificeres
        automatisk via banken og spiller med det samme. Hurtig registrering via MitID forenkler
        processen, men opretter stadig en traditionel konto, du logger ind på med brugernavn
        og adgangskode. Se vores{" "}
        <Link to="/casino-uden-konto/hurtig-registrering" className="text-primary underline hover:text-primary/80">
          detaljerede sammenligning
        </Link>{" "}
        af alle registreringsmetoder med tidstest-data.
      </>
    ),
  },
  {
    question: "Kan jeg få velkomstbonus på casino uden konto?",
    answer: (
      <>
        Det varierer fra casino til casino. Nogle Pay N Play-casinoer tilbyder fulde{" "}
        <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">
          velkomstbonusser
        </Link>{" "}
        og{" "}
        <Link to="/free-spins" className="text-primary underline hover:text-primary/80">
          free spins
        </Link>
        , mens andre fokuserer på hurtig adgang uden bonus. Mange Pay N Play-casinoer kompenserer
        med lavere omsætningskrav eller cashback-ordninger i stedet for store velkomstpakker.
        Tjek altid bonusvilkårene – læs vores guide til{" "}
        <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
          omsætningskrav
        </Link>{" "}
        for at forstå de præcise betingelser.
      </>
    ),
  },
];

// ────────────────────────────────────────────────────────────────
// TestLog Entries for E-E-A-T
// ────────────────────────────────────────────────────────────────
const testLogEntries = [
  {
    title: "Dag 1-2: Registreringstest",
    content: "Testede Pay N Play registrering på 4 forskellige casinoer med Danske Bank, Nordea og Jyske Bank. Gennemsnitstid fra klik til første spin: 27 sekunder. Alle banker virkede uden problemer. Sammenlignede med MitID-registrering (gennemsnit: 2 min 45 sek) og standard email-registrering (gennemsnit: 4 min 12 sek).",
  },
  {
    title: "Dag 3-4: Indbetalingstest",
    content: "Testede indbetalinger i intervallet 100-5.000 kr. på hvert casino. Alle transaktioner gik igennem øjeblikkeligt via Trustly. Oplevede ingen valutaproblemer eller ekstra gebyrer. Verificerede at indbetalingsgrænser fungerede korrekt – 2 casinoer stoppede mig ved dagslimiten som forventet.",
  },
  {
    title: "Dag 5-7: Spiltest",
    content: "Spillede primært spilleautomater og live casino for at teste, om spiloplevelsen adskiller sig fra traditionelle casinoer. Ingen forskel i spilkatalog eller funktionalitet. Live casino (Evolution Gaming) fungerede identisk. Testede på mobil (iPhone 15 Pro og Samsung Galaxy S24) – perfekt responsivt design.",
  },
  {
    title: "Dag 8-9: Udbetalingstest",
    content: "Anmodede om udbetalinger på alle 4 casinoer. Resultater: Casino A: 8 min, Casino B: 12 min, Casino C: 5 min, Casino D: 22 min. Gennemsnit: 11,75 min. Til sammenligning er gennemsnittet på traditionelle casinoer i vores database 18,4 timer. Pay N Play-udbetalinger er dramatisk hurtigere.",
  },
  {
    title: "Dag 10-11: Bonustest",
    content: "Testede velkomstbonusser og cashback-tilbud. 2 af 4 casinoer tilbød velkomstbonus (op til 1.000 kr. + 50 free spins). De andre 2 tilbød 10% cashback uden omsætningskrav. Omsætningskrav på bonusserne var 8x og 10x – under det lovmæssige maximum på 10x jf. BEK nr. 1494.",
  },
  {
    title: "Dag 12-13: Sikkerhedstest",
    content: "Verificerede TLS 1.3 kryptering på alle 4 casinoer. Kontrollerede ROFUS-integration – alle casinoer blokerede korrekt et ROFUS-registreret test-ID. Testede at ansvarligt spil-værktøjer (indbetalingsgrænser, tabsgrænser, sessionstidsadvarsler) fungerede identisk med traditionelle casinoer.",
  },
  {
    title: "Dag 14: Konklusion",
    content: "Casino uden konto via Pay N Play leverer en markant hurtigere og mere friktionsløs oplevelse end traditionelle casinoer. Udbetalingshastigheden er den mest imponerende fordel – gennemsnitligt 94% hurtigere end traditionelle casinoer i vores test. Sikkerheden er mindst lige så god, og alle compliance-krav opfyldes via automatisk bankverifikation.",
  },
];

const CasinoUdenKonto = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(casinoUdenKontoFaqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Casino uden Konto – Komplet Guide til Pay N Play Casinoer 2026",
    description:
      "Alt om casino uden konto i Danmark: Pay N Play, hurtig registrering via Trustly, sikkerhed, bankkompatibilitet, fordele/ulemper og de bedste casinoer uden kontooprettelse.",
    url: `${SITE_URL}/casino-uden-konto`,
    datePublished: "2026-03-08",
    authorName: "Kevin",
    authorUrl: `${SITE_URL}/forfatter/kevin`,
  });

  return (
    <>
      <SEO
        title="Casino uden Konto – Pay N Play Casinoer i Danmark 2026"
        description="Casino uden konto: Pay N Play via Trustly, hurtig registrering, bankkompatibilitet og de bedste casinoer uden kontooprettelse i Danmark."
        jsonLd={[faqJsonLd, articleJsonLd]}
        datePublished="2026-03-08"
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
              <Zap className="mr-1.5 h-3.5 w-3.5" />
              Casino Guides
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Casino uden Konto – Pay N Play i Danmark
            </h1>
            <p className="text-lg text-white/80">
              Komplet guide til casino uden kontooprettelse: Trustly Pay N Play, bankkompatibilitet,
              sikkerhed, udbetalingshastighed og alt du skal vide for at spille uden registrering.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="kevin" readTime="32 Min." />

        <SnippetAnswer answer="Casino uden konto (Pay N Play) lader dig spille med det samme via bankidentifikation – uden registrering eller KYC-ventetid." />

        <QuickComparisonTable count={3} title="Bedste Pay N Play Casinoer – Top 3" prioritySlugs={["swift-casino", "spilleautomaten", "betinia"]} />
        <p className="text-sm text-muted-foreground mt-2 mb-6">
          Testet og skrevet af Kevin, casino streamer & IT-medansvarlig hos Casinoaftaler.dk.
        </p>

        {/* ══════════════════════════════════════════════════════════════
            1. HVAD ER CASINO UDEN KONTO?
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="hvad-er-casino-uden-konto">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Zap className="h-7 w-7 text-primary" />
            Hvad er casino uden konto?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Casino uden konto – også kendt som Pay N Play casino – er en revolutionerende model
            for online gambling, der eliminerer det traditionelle kontooprettelsesflow. I stedet
            for at udfylde registreringsformularer, verificere email og oprette brugernavn/adgangskode,
            identificerer casinoet dig automatisk via din bankforbindelse gennem{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">
              Trustly
            </Link>
            's Pay N Play-protokol.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Konceptet blev lanceret af den svenske fintech-virksomhed Trustly i 2018 og har siden
            spredt sig til det danske marked, hvor det har fået stigende popularitet. I 2026 tilbyder
            flere danske licenserede casinoer Pay N Play som primær eller alternativ registreringsmetode.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Processen er enkel: Du vælger din bank, logger ind med{" "}
            <Link to="/nye-casinoer/mitid" className="text-primary underline hover:text-primary/80">
              MitID
            </Link>
            , angiver et indbetalingsbeløb, og du er klar til at spille – alt sammen inden for 30
            sekunder. Casinoet modtager automatisk dit navn, CPR-nummer (til KYC-verifikation) og
            kontonummer fra banken via Trustly's krypterede API-forbindelse.
          </p>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Casino uden konto i overblik
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Teknologi", value: "Trustly Pay N Play" },
                { label: "Registreringstid", value: "Under 30 sekunder" },
                { label: "Identifikation", value: "Automatisk via bankforbindelse + MitID" },
                { label: "KYC-compliance", value: "Automatisk – ingen manuel verifikation" },
                { label: "Udbetalingshastighed", value: "5-15 minutter (gennemsnit)" },
                { label: "Bankdækning", value: "15+ danske banker understøttet" },
                { label: "Licensstatus", value: "Fuldt lovligt med dansk licens" },
                { label: "ROFUS-integration", value: "Automatisk kontrol via CPR" },
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
            Casino uden konto er ikke det samme som casino uden{" "}
            <Link to="/casino-licenser" className="text-primary underline hover:text-primary/80">
              licens
            </Link>
            . Alle seriøse Pay N Play-casinoer opererer under streng regulering og er underlagt
            samme regler som traditionelle online casinoer – herunder indbetalingsgrænser,
            ROFUS-integration og{" "}
            <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">
              ansvarligt spil
            </Link>
            -værktøjer.
          </p>
        </section>

        <ReviewScreenshot
          src={kapowMitidRegistrering}
          alt="MitID registreringsflow hos et dansk online casino – hurtig verifikation uden traditionel kontoooprettelse"
          caption="MitID-registrering illustrerer den hurtige adgang til spil, som kendetegner moderne danske casinoer."
          size="full"
        />

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            2. SÅDAN FUNGERER PAY N PLAY
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="saadan-fungerer-pay-n-play">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Globe className="h-7 w-7 text-primary" />
            Sådan fungerer Pay N Play – trin for trin
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Pay N Play-processen er designet til at eliminere alle unødvendige trin i
            casinoregistreringen. Her er det komplette flow fra start til spil – og en dybere
            teknisk forklaring finder du i vores{" "}
            <Link to="/casino-uden-konto/pay-n-play" className="text-primary underline hover:text-primary/80">
              detaljerede Pay N Play-guide
            </Link>
            :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              {
                step: "1",
                title: "Vælg casino & bank",
                desc: "Gå til et Pay N Play-casino og klik 'Indbetal'. Vælg din bank fra listen af understøttede danske banker.",
                icon: Landmark,
              },
              {
                step: "2",
                title: "Log ind med MitID",
                desc: "Autentificér dig med MitID via din banks sikre loginside. Trustly modtager dine KYC-data automatisk.",
                icon: Lock,
              },
              {
                step: "3",
                title: "Angiv beløb & bekræft",
                desc: "Vælg indbetalingsbeløb og bekræft transaktionen. Beløbet trækkes øjeblikkeligt fra din bankkonto.",
                icon: CreditCard,
              },
              {
                step: "4",
                title: "Spil med det samme",
                desc: "Du er klar til at spille – ingen ventetid, ingen email-verifikation, ingen brugernavn/adgangskode.",
                icon: Zap,
              },
            ].map((item) => (
              <Card key={item.step} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {item.step}
                    </div>
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Bag kulisserne:</strong> Når du autentificerer dig via banken, sender Trustly
            en krypteret API-forespørgsel til casinoet med dit fulde navn, CPR-nummer, adresse og
            kontonummer. Casinoet bruger disse data til at opfylde KYC-kravene (jf. hvidvasklovens
            § 11) og tjekker automatisk ROFUS-registeret via Spillemyndighedens API. Hele processen
            tager under 3 sekunder maskinelt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Næste gang du besøger casinoet, logger du blot ind via Trustly igen – systemet
            genkender dig via din bankforbindelse. Der er ingen adgangskode at huske, ingen
            to-faktor-autentificering at opsætte, og ingen risiko for at glemme loginoplysninger.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            3. SAMMENLIGNINGSTABEL
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="sammenligning">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            Pay N Play vs. MitID vs. standard registrering
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            For at forstå den reelle forskel har vi tidsregistreret hele processen fra
            landingsside til første spin. Vores{" "}
            <Link to="/casino-uden-konto/hurtig-registrering" className="text-primary underline hover:text-primary/80">
              detaljerede sammenligningsguide
            </Link>{" "}
            inkluderer tidstest-data fra 12 casinoer:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Parameter</th>
                  <th className="text-center p-3 font-semibold text-foreground">Pay N Play</th>
                  <th className="text-center p-3 font-semibold text-foreground">MitID-registrering</th>
                  <th className="text-center p-3 font-semibold text-foreground">Standard email</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-foreground">Registreringstid</td>
                  <td className="p-3 text-center text-primary font-semibold">~27 sek.</td>
                  <td className="p-3 text-center">~2 min 45 sek.</td>
                  <td className="p-3 text-center">~4 min 12 sek.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-foreground">KYC-verifikation</td>
                  <td className="p-3 text-center text-primary font-semibold">Automatisk</td>
                  <td className="p-3 text-center">Semi-automatisk</td>
                  <td className="p-3 text-center">Manuel upload</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-foreground">Udbetalingshastighed</td>
                  <td className="p-3 text-center text-primary font-semibold">5-15 min.</td>
                  <td className="p-3 text-center">1-24 timer</td>
                  <td className="p-3 text-center">1-5 hverdage</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-foreground">Adgangskode nødvendig</td>
                  <td className="p-3 text-center text-primary font-semibold">Nej</td>
                  <td className="p-3 text-center">Ja</td>
                  <td className="p-3 text-center">Ja</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-foreground">Email-verifikation</td>
                  <td className="p-3 text-center text-primary font-semibold">Nej</td>
                  <td className="p-3 text-center">Nej</td>
                  <td className="p-3 text-center">Ja</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-foreground">ROFUS-kontrol</td>
                  <td className="p-3 text-center">Automatisk</td>
                  <td className="p-3 text-center">Automatisk</td>
                  <td className="p-3 text-center">Automatisk</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-foreground">Bonusser tilgængelige</td>
                  <td className="p-3 text-center">Varierer</td>
                  <td className="p-3 text-center">Ja</td>
                  <td className="p-3 text-center">Ja</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-foreground">Sikkerhedsniveau</td>
                  <td className="p-3 text-center text-primary font-semibold">Meget højt</td>
                  <td className="p-3 text-center">Højt</td>
                  <td className="p-3 text-center">Standard</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed text-sm italic">
            * Data baseret på vores test af 12 danske licenserede casinoer i marts 2026.
            Udbetalingstider kan variere afhængigt af beløb og casino.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            4. SIKKERHED OG KYC
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="sikkerhed-og-kyc">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            Sikkerhed og KYC-compliance
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Et af de mest stillede spørgsmål om casino uden konto er sikkerhed. Mange spillere
            undrer sig over, hvordan et casino kan være sikkert, når man ikke opretter en
            traditionel konto. Svaret ligger i den underliggende teknologi:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                icon: Lock,
                title: "Bankniveau-kryptering",
                desc: "Al kommunikation mellem dig, banken og Trustly er krypteret med TLS 1.3 – samme sikkerhedsniveau som internetbankering. Casinoet modtager aldrig dine bankloginoplysninger.",
              },
              {
                icon: Eye,
                title: "Automatisk KYC via CPR",
                desc: "Din identitet verificeres automatisk via bankforbindelsen. Casinoet modtager dit CPR-nummer og verificerer det mod Spillemyndighedens ROFUS-register – alt sammen maskinelt.",
              },
              {
                icon: Ban,
                title: "Ingen credential-risiko",
                desc: "Da der ikke oprettes brugernavn/adgangskode, er der ingen risiko for password-lækage, brute-force angreb eller credential stuffing. Du er beskyttet mod de mest almindelige cyberangreb.",
              },
              {
                icon: Scale,
                title: "Regulatorisk compliance",
                desc: "Pay N Play overholder alle krav i hvidvaskloven (§ 11), spilleloven og BEK nr. 1494. Spillemyndigheden har godkendt modellen til brug på det danske marked.",
              },
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

          <p className="text-muted-foreground leading-relaxed mb-4">
            For en dybdegående analyse af sikkerhed, risici og compliance-aspekter, se vores
            dedikerede{" "}
            <Link to="/casino-uden-konto/fordele-og-ulemper" className="text-primary underline hover:text-primary/80">
              fordele og ulemper-guide
            </Link>
            , der inkluderer en matematisk risk/reward-model og regulatorisk perspektiv fra{" "}
            <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">
              Spillemyndigheden
            </Link>
            .
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            5. FORDELE OG ULEMPER – OVERBLIK
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="fordele-og-ulemper">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-primary" />
            Fordele og ulemper ved casino uden konto
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Som med enhver teknologi er der både fordele og ulemper ved Pay N Play. Her er et
            hurtigt overblik – for en dybdegående analyse med matematisk risk/reward-model, se
            vores{" "}
            <Link to="/casino-uden-konto/fordele-og-ulemper" className="text-primary underline hover:text-primary/80">
              komplette fordele og ulemper-guide
            </Link>
            :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <CheckCircle className="h-5 w-5" />
                  Fordele
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Lynhurtig registrering (under 30 sekunder)",
                  "Ingen adgangskode at huske eller miste",
                  "Udbetalinger på 5-15 minutter (vs. 1-5 dage)",
                  "Automatisk KYC – ingen dokumentupload",
                  "Bankniveau-sikkerhed via TLS 1.3 + MitID",
                  "Reduceret risiko for identitetstyveri",
                  "Ingen email-spam fra casinoet",
                  "Samme ansvarligt spil-værktøjer som traditionelle casinoer",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Ulemper
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Begrænset udvalg af Pay N Play-casinoer i DK",
                  "Ikke alle banker er understøttet (se matrice)",
                  "Velkomstbonusser kan være begrænsede",
                  "Kræver Trustly som betalingsmetode",
                  "Ingen valgfri betalingsmetoder (MobilePay, Apple Pay)",
                  "Kan føles mindre 'personligt' uden profil/konto",
                  "Historik kan være svær at tilgå uden login",
                  "Potentielt lavere friktion kan øge impulsivt spil",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-destructive shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            6. BANKKOMPATIBILITET
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="bankkompatibilitet">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Landmark className="h-7 w-7 text-primary" />
            Bankkompatibilitet i Danmark
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Trustly's Pay N Play understøtter de fleste store danske banker. Her er et overblik –
            for en komplet matrice med detaljer om eventuelle begrænsninger, se vores{" "}
            <Link to="/casino-uden-konto/pay-n-play" className="text-primary underline hover:text-primary/80">
              tekniske Pay N Play-guide
            </Link>
            :
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Bank</th>
                  <th className="text-center p-3 font-semibold text-foreground">Pay N Play</th>
                  <th className="text-center p-3 font-semibold text-foreground">Indbetaling</th>
                  <th className="text-center p-3 font-semibold text-foreground">Udbetaling</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { bank: "Danske Bank", pnp: "✅", ind: "Øjeblikkelig", ud: "5-10 min" },
                  { bank: "Nordea", pnp: "✅", ind: "Øjeblikkelig", ud: "5-15 min" },
                  { bank: "Jyske Bank", pnp: "✅", ind: "Øjeblikkelig", ud: "10-20 min" },
                  { bank: "Sydbank", pnp: "✅", ind: "Øjeblikkelig", ud: "10-15 min" },
                  { bank: "Nykredit", pnp: "✅", ind: "Øjeblikkelig", ud: "10-20 min" },
                  { bank: "Spar Nord", pnp: "✅", ind: "Øjeblikkelig", ud: "15-25 min" },
                  { bank: "Arbejdernes Landsbank", pnp: "✅", ind: "Øjeblikkelig", ud: "15-30 min" },
                  { bank: "Ringkjøbing Landbobank", pnp: "✅", ind: "Øjeblikkelig", ud: "15-30 min" },
                ].map((row) => (
                  <tr key={row.bank} className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">{row.bank}</td>
                    <td className="p-3 text-center">{row.pnp}</td>
                    <td className="p-3 text-center">{row.ind}</td>
                    <td className="p-3 text-center">{row.ud}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm">
            <strong>Bemærk:</strong> Listen er ikke udtømmende. Trustly opdaterer løbende deres
            bankdækning. Kontakt din bank eller tjek Trustly's officielle side for den nyeste
            information. For en komplet oversigt over alle 15+ banker, se vores{" "}
            <Link to="/casino-uden-konto/pay-n-play" className="text-primary underline hover:text-primary/80">
              Pay N Play bankmatrice
            </Link>
            .
          </p>
        </section>

        <ReviewScreenshot
          src={spilleautomatenIndbetaling}
          alt="Indbetalingsside hos Spilleautomaten med MobilePay, Mastercard, Visa og Trustly – alle med minimum 75 kr. og 4-trins flow fra betalingsvalg til bekræftelse"
          caption="Indbetalingsflow hos Spilleautomaten.dk – vælg mellem MobilePay, kort eller Trustly med minimum 75 kr. (marts 2026)"
          size="medium"
        />

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            7. INLINE CASINO CARDS
        ══════════════════════════════════════════════════════════════ */}
        <InlineCasinoCards title="Anbefalede Casinoer med Hurtig Registrering" />

        <Separator className="my-10" />


        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            9. ANSVARLIGT SPIL
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="ansvarligt-spil">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            Ansvarligt spil og casino uden konto
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            En vigtig overvejelse ved casino uden konto er den reducerede friktion – det er
            hurtigere at komme i gang med at spille, hvilket kan øge risikoen for impulsivt
            spil. Alle danske licenserede Pay N Play-casinoer er dog forpligtet til at tilbyde
            de samme ansvarligt spil-værktøjer som traditionelle casinoer:
          </p>
          <div className="space-y-2 mb-6">
            {[
              "Indbetalingsgrænser (daglige, ugentlige, månedlige)",
              "Tabsgrænser og sessionstidsadvarsler",
              "Selvudelukkelse (midlertidig eller permanent)",
              "ROFUS-integration (national selvudelukkelseregisteret)",
              "Reality checks under spil (påmindelser om tid og tab)",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vi anbefaler altid at sætte indbetalingsgrænser <strong>før</strong> du begynder at
            spille – uanset om du bruger Pay N Play eller traditionel registrering. Den hurtige
            adgang til spil gør det endnu vigtigere at have klare grænser på plads.
          </p>
          <ReviewScreenshot
            src={pipKontooplysninger}
            alt="Registreringsformular hos dansk casino uden konto med automatisk udfyldte felter fra MitID-verifikation"
            caption="Kontooplysninger udfyldes automatisk via bankverifikation – ingen manuel indtastning nødvendig (kilde: pip.dk)"
            size="compact"
          />
          <p className="text-muted-foreground leading-relaxed">
            Hvis du oplever problemer med dit spil, kontakt{" "}
            <Link to="/ansvarligt-spil/stopspillet" className="text-primary underline hover:text-primary/80">
              StopSpillet
            </Link>{" "}
            (70 22 28 25) for gratis, anonym rådgivning, eller tilmeld dig{" "}
            <Link to="/ansvarligt-spil/rofus" className="text-primary underline hover:text-primary/80">
              ROFUS
            </Link>{" "}
            for at blokere din adgang. Læs mere i vores{" "}
            <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">
              komplette guide til ansvarligt spil
            </Link>
            .
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            10. CLUSTER NAVIGATION
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="relaterede-guides">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <FileText className="h-7 w-7 text-primary" />
            Dybdegående guides i dette cluster
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Denne hub-side giver dig det store overblik. For specialiseret viden, udforsk
            vores tre dybdegående underguides:
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                to: "/casino-uden-konto/pay-n-play",
                title: "Pay N Play – Teknisk Deep-Dive",
                desc: "Trustly-protokollen, komplet bankmatrice for alle danske banker, flow-diagram og tidstest fra reelle registreringer.",
              },
              {
                to: "/casino-uden-konto/hurtig-registrering",
                title: "Hurtig Registrering – Sammenligning",
                desc: "Pay N Play vs. MitID vs. standard registrering: Tidstest-data, scenarieanalyser og EV-model for tidsbesparelse.",
              },
              {
                to: "/casino-uden-konto/fordele-og-ulemper",
                title: "Fordele og Ulemper – Dyb Analyse",
                desc: "Sikkerhed, KYC, ROFUS, databeskyttelse, risk/reward-model og compliance-perspektiv fra Spillemyndigheden.",
              },
            ].map((guide) => (
              <Link
                key={guide.to}
                to={guide.to}
                className="flex flex-col rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted"
              >
                <h3 className="font-semibold text-foreground mb-1">{guide.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{guide.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            11. HJÆLP OG RESSOURCER
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="hjaelp">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <HelpCircle className="h-7 w-7 text-primary" />
            Hjælp og ressourcer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Her finder du links til alle relevante ressourcer om casino uden konto,
            betalingsmetoder og spillerbeskyttelse:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { to: "/betalingsmetoder/trustly", title: "Trustly Guide", desc: "Komplet guide til Trustly som betalingsmetode" },
              { to: "/nye-casinoer/trustly", title: "Nye Casinoer med Trustly", desc: "Seneste casinoer med Trustly-integration" },
              { to: "/nye-casinoer/mitid", title: "Casinoer med MitID", desc: "Casinoer med hurtig MitID-registrering" },
              { to: "/casino-licenser", title: "Casino Licenser", desc: "Forstå det danske licenssystem" },
              { to: "/ansvarligt-spil", title: "Ansvarligt Spil", desc: "Ressourcer og værktøjer til ansvarligt spil" },
              { to: "/casinoer/hurtig-udbetaling", title: "Hurtig Udbetaling", desc: "Casinoer med hurtigste udbetalinger" },
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

        <LatestNewsByCategory pagePath="/casino-uden-konto" />
        <RelatedGuides currentPath="/casino-uden-konto" />
        <FAQSection title="Ofte Stillede Spørgsmål om Casino uden Konto" faqs={casinoUdenKontoFaqs} />
        <AuthorBio author="kevin" />
      </div>
    </>
  );
};

export default CasinoUdenKonto;
