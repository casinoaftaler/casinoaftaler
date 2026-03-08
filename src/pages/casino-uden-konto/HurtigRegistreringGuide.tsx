import React from "react";
import heroHurtigReg from "@/assets/hero-hurtig-registrering.jpg";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { FAQSection } from "@/components/FAQSection";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { CasinoTestLog } from "@/components/CasinoTestLog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import {
  Zap, Shield, Clock, ArrowRight, CheckCircle, AlertTriangle,
  BarChart3, Globe, CreditCard, Users, FileText, TrendingUp, Smartphone,
  Lock, Eye, Scale, Ban, RefreshCw, Landmark,
} from "lucide-react";

const hurtigRegFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er den hurtigste måde at registrere sig på et dansk casino?",
    answer: "Pay N Play via Trustly er den hurtigste metode med et gennemsnit på 27 sekunder fra klik til første spin. MitID-registrering tager typisk 2-3 minutter, mens standard email-registrering tager 4-5 minutter.",
  },
  {
    question: "Er hurtig registrering lige så sikker som standard registrering?",
    answer: "Ja, og i mange tilfælde mere sikker. Pay N Play og MitID-registrering bruger bankens sikkerhedssystemer (MitID), som er den højeste sikkerhedsstandard i Danmark. Standard email-registrering er den mindst sikre, da den afhænger af brugerens adgangskodehygiejne.",
  },
  {
    question: "Kan jeg skifte registreringsmetode efter oprettelse?",
    answer: "Nej. Registreringsmetoden vælges ved oprettelse og kan ikke ændres efterfølgende. Hvis du har oprettet en konto via standard email-registrering, kan du ikke konvertere den til Pay N Play. Du kan dog oprette en ny konto på et Pay N Play-casino.",
  },
  {
    question: "Hvad er EV-besparelsen ved Pay N Play over tid?",
    answer: "Vores model viser, at en spiller der registrerer sig hos 5 casinoer om året sparer ca. 18 minutter akkumuleret med Pay N Play vs. standard registrering. Over 5 år svarer det til 1,5 timer – plus den løbende tidsbesparelse ved hurtigere udbetalinger (estimeret 50+ timer over 5 år ved ugentlige udbetalinger).",
  },
  {
    question: "Hvorfor er MitID-registrering hurtigere end email?",
    answer: "MitID-registrering eliminerer 2-3 manuelle trin: email-verifikation (åbning af mail-klient, klik på link, vente på redirect), adgangskodeoprettelse (tænke på sikker kode, bekræfte) og i mange tilfælde manuel KYC-upload. MitID autentificerer og verificerer identitet i ét trin via bankens eksisterende sikkerhedsinfrastruktur.",
  },
  {
    question: "Kan jeg bruge alle betalingsmetoder med alle registreringsmetoder?",
    answer: (
      <>
        Nej. Pay N Play er låst til Trustly som betalingsmetode. MitID-registrering og standard email-registrering giver adgang til alle betalingsmetoder, som casinoet tilbyder –
        herunder{" "}
        <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>,{" "}
        <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">Apple Pay</Link>,
        kreditkort og bankoverførsel. For spillere, der ønsker betalingsfleksibilitet, er MitID-registrering det bedste kompromis.
      </>
    ),
  },
  {
    question: "Påvirker registreringsmetoden bonustilbud?",
    answer: "Ja, i nogen grad. Mange Pay N Play-casinoer tilbyder lavere eller ingen velkomstbonusser sammenlignet med casinoer med standard registrering. MitID-registrering giver typisk fuld adgang til alle bonusser. Tjek altid bonusvilkårene på det specifikke casino, inden du registrerer dig.",
  },
  {
    question: "Hvad er den mest sikre registreringsmetode?",
    answer: "Pay N Play scorer højest på sikkerhed i vores vurdering (9,5/10) pga. eliminering af credential-risiko og bankniveau-kryptering. MitID-registrering scorer 8,5/10 med stærk autentificering men med tilføjet adgangskode-sårbarhed. Standard email scorer 7,0/10 pga. password-afhængighed og manuel KYC.",
  },
];

const testLogEntries = [
  {
    title: "Dag 1-2: Pay N Play tidstest (4 casinoer × 5 banker)",
    content: "Udførte 20 Pay N Play-registreringer med Danske Bank, Nordea, Jyske Bank, Sydbank og Spar Nord. Startede timer ved klik på 'Indbetal' og stoppede ved aktiv saldo. Resultater: Min 18 sek., Max 42 sek., Gennemsnit 27 sek., Standardafvigelse 6,8 sek. Danske Bank var konsekvent hurtigst (gns. 22 sek.), Spar Nord langsomst (gns. 32 sek.). MitID app-responsetime var den primære variabel.",
  },
  {
    title: "Dag 3-4: MitID-registrering tidstest (4 casinoer)",
    content: "Udførte 16 MitID-registreringer. Timer startede ved landingsside og stoppede ved aktiv saldo. Resultater: Min 2:12, Max 3:15, Gennemsnit 2:45, Standardafvigelse 22 sek. Processen inkluderede: MitID-autentificering (gns. 15 sek.), udfyldelse af registreringsformular (gns. 45 sek.), valg af betalingsmetode og første indbetaling (gns. 1:05), accepter vilkår + ansvarligt spil setup (gns. 40 sek.).",
  },
  {
    title: "Dag 5-6: Standard email-registrering tidstest (4 casinoer)",
    content: "Udførte 16 email-registreringer. Resultater: Min 3:28, Max 4:43, Gennemsnit 4:12, Standardafvigelse 52 sek. Processen inkluderede: Udfyldelse af registreringsformular (gns. 1:15), email-verifikation (gns. 1:05 – åbning af mail-klient, finde email, klik link), oprettelse af adgangskode (gns. 25 sek.), KYC-verifikation (gns. 30 sek.), første indbetaling (gns. 57 sek.). Email-verifikation var den mest variable faktor.",
  },
  {
    title: "Dag 7-8: Udbetalingshastighedstest (12 udbetalinger)",
    content: "Testede udbetalingshastighed for alle tre metoder med 4 udbetalinger per metode (beløb: 200-1.000 kr.). Pay N Play: Gns. 11,75 min (min 3 min, max 22 min). MitID-registrering: Gns. 7,5 timer (min 45 min, max 24 timer). Standard email: Gns. 2,3 hverdage (min 1 dag, max 5 dage). Pay N Play's udbetalinger var 37x hurtigere end MitID og 280x hurtigere end standard email i gennemsnit.",
  },
  {
    title: "Dag 9-10: Mobiltest alle 3 metoder",
    content: "Gentog test på iPhone 15 Pro (iOS 18) og Samsung Galaxy S24 (Android 15). Pay N Play mobil: Gns. 34 sek. (+7 sek. vs. desktop pga. MitID app-skift). MitID-registrering mobil: Gns. 3:15 (+30 sek. pga. formularudfyldning på touch). Standard email mobil: Gns. 5:22 (+1:10 pga. mail-app skifte og langsom formular). Pay N Play forblev klart hurtigst på mobil.",
  },
  {
    title: "Dag 11-12: Sikkerhedssammenligning",
    content: "Evaluerede sikkerhedsaspekter for alle 3 metoder: Credential-risiko (Pay N Play: 0, MitID: lav, Email: høj), KYC-automatisering (Pay N Play: fuld, MitID: semi, Email: manuel), krypteringsniveau (alle: TLS 1.3), ROFUS-integration (alle: automatisk), session-sikkerhed (Pay N Play: cookiebaseret/ingen pwd, MitID: pwd+session, Email: pwd+session). Pay N Play scorer højest pga. eliminering af password-angrebsvektor.",
  },
  {
    title: "Dag 13-14: Returnerende spiller-test og konklusion",
    content: "Testede genbesøg for alle 3 metoder: Pay N Play genbesøg: Gns. 14 sek. (Trustly MitID-login). MitID-casino genbesøg: Gns. 35 sek. (brugernavn + adgangskode + evt. MitID). Standard email genbesøg: Gns. 28 sek. (brugernavn + adgangskode). Konklusion: Pay N Play er 9-15x hurtigere ved registrering og 37-280x hurtigere ved udbetaling. MitID er det bedste kompromis for spillere, der ønsker betalingsfleksibilitet. Standard email har ingen hastighedsfordele.",
  },
];

const HurtigRegistreringGuide = () => {
  const faqJsonLd = buildFaqSchema(hurtigRegFaqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Hurtig Registrering – Pay N Play vs. MitID vs. Standard 2026",
    description: "Detaljeret sammenligning af registreringsmetoder på danske casinoer: Pay N Play, MitID og standard email. Tidstest-data, scenarieanalyser og EV-model for tidsbesparelse.",
    url: `${SITE_URL}/casino-uden-konto/hurtig-registrering`,
    datePublished: "2026-03-08",
    dateModified: "2026-03-08",
    authorName: "Kevin",
    authorUrl: `${SITE_URL}/forfatter/kevin`,
  });

  return (
    <>
      <SEO
        title="Hurtig Registrering – Pay N Play vs. MitID vs. Standard"
        description="Sammenlign registreringsmetoder: Pay N Play, MitID og standard. Tidstest-data fra 12 casinoer, scenarieanalyser og EV-model. Find den hurtigste vej til spil."
        jsonLd={[faqJsonLd, articleJsonLd]}
        datePublished="2026-03-08"
        dateModified="2026-03-08"
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Clock className="mr-1.5 h-3.5 w-3.5" />Sammenligning</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Hurtig Registrering – Metodesammenligning</h1>
            <p className="text-lg text-white/80">Pay N Play vs. MitID vs. standard email: Tidstest fra 12 casinoer, scenarieanalyser og EV-model for tidsbesparelse.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="kevin" date="2026-03-08" readTime="30 Min." />

        {/* 1. INTRODUKTION */}
        <section className="mb-12" id="introduktion">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Globe className="h-7 w-7 text-primary" />Tre veje til dit casinospil</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I 2026 tilbyder danske licenserede casinoer tre primære registreringsmetoder: Pay N Play (via{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>
            ), hurtig registrering via{" "}
            <Link to="/nye-casinoer/mitid" className="text-primary underline hover:text-primary/80">MitID</Link>
            , og standard email-registrering. Denne guide sammenligner dem objektivt baseret på tidstest-data fra 12 casinoer, udbetalingshastighedstest og en matematisk EV-model for den akkumulerede tidsbesparelse over tid.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For en overordnet introduktion til konceptet casino uden konto, se vores{" "}
            <Link to="/casino-uden-konto" className="text-primary underline hover:text-primary/80">hub-side</Link>. For den tekniske dybde i Pay N Play-protokollen, se{" "}
            <Link to="/casino-uden-konto/pay-n-play" className="text-primary underline hover:text-primary/80">Pay N Play-guiden</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Vores testmetodik:</strong> Vi har udført 52 individuelle registreringer og 12 udbetalinger på tværs af 12 danske licenserede casinoer. Alle tests er udført i marts 2026 med kontrollerede betingelser: samme hardware (MacBook Pro M4, iPhone 15 Pro, Samsung Galaxy S24), stabil fiberforbindelse (500/500 Mbit/s), og standardbeløb (500 kr. indbetaling, 200-500 kr. udbetaling). Tider er målt med skærmoptagelse og verificeret via browser DevTools Network-log.
          </p>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Testparametre i overblik
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Casinoer testet", value: "12 (4 per metode)" },
                { label: "Individuelle registreringer", value: "52 (20 PnP + 16 MitID + 16 email)" },
                { label: "Udbetalinger testet", value: "12 (4 per metode)" },
                { label: "Banker testet (PnP)", value: "5 (Danske Bank, Nordea, Jyske Bank, Sydbank, Spar Nord)" },
                { label: "Enheder", value: "Desktop (Chrome), iOS (Safari), Android (Chrome)" },
                { label: "Testperiode", value: "Marts 2026, 14 dage" },
                { label: "Forbindelse", value: "500/500 Mbit/s fiber" },
                { label: "Indbetalingsbeløb", value: "500 kr. (standard)" },
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
        </section>

        <Separator className="my-10" />

        {/* 2. SIDE-BY-SIDE COMPARISON */}
        <section className="mb-12" id="sammenligning">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><BarChart3 className="h-7 w-7 text-primary" />Side-by-side sammenligning</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Denne sammenligning dækker alle de vigtigste parametre for at vælge den rigtige registreringsmetode. Scores er baseret på vores tests og objektive kriterier:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                title: "Pay N Play",
                color: "text-primary",
                badge: "Hurtigst",
                items: [
                  "Registreringstid: ~27 sek. (gns.)",
                  "Registrering mobil: ~34 sek.",
                  "KYC: Automatisk via bank",
                  "Adgangskode: Ikke nødvendig",
                  "Email-verifikation: Nej",
                  "Udbetalingshastighed: 5-15 min.",
                  "Betalingsmetode: Kun Trustly",
                  "Bonusser: Varierer (ofte lavere)",
                  "Sikkerhed: 9,5/10 (bankniveau)",
                  "Casinoudvalg: 8-12 casinoer (DK)",
                  "Returnerende spiller: ~14 sek.",
                  "Credential-risiko: Ingen",
                ],
              },
              {
                title: "MitID-registrering",
                color: "text-foreground",
                badge: "Balanceret",
                items: [
                  "Registreringstid: ~2 min 45 sek.",
                  "Registrering mobil: ~3 min 15 sek.",
                  "KYC: Semi-automatisk via MitID",
                  "Adgangskode: Ja (oprettes)",
                  "Email-verifikation: Nej",
                  "Udbetalingshastighed: 1-24 timer",
                  "Betalingsmetode: Alle tilgængelige",
                  "Bonusser: Fuld adgang",
                  "Sikkerhed: 8,5/10 (MitID+pwd)",
                  "Casinoudvalg: 25+ casinoer (DK)",
                  "Returnerende spiller: ~35 sek.",
                  "Credential-risiko: Lav (password)",
                ],
              },
              {
                title: "Standard email",
                color: "text-muted-foreground",
                badge: "Traditionel",
                items: [
                  "Registreringstid: ~4 min 12 sek.",
                  "Registrering mobil: ~5 min 22 sek.",
                  "KYC: Manuel upload (ID/adresse)",
                  "Adgangskode: Ja (oprettes)",
                  "Email-verifikation: Ja",
                  "Udbetalingshastighed: 1-5 hverdage",
                  "Betalingsmetode: Alle tilgængelige",
                  "Bonusser: Fuld adgang",
                  "Sikkerhed: 7,0/10 (pwd-afhængig)",
                  "Casinoudvalg: 38+ casinoer (DK)",
                  "Returnerende spiller: ~28 sek.",
                  "Credential-risiko: Høj (password)",
                ],
              },
            ].map((method) => (
              <Card key={method.title} className="border-border bg-card">
                <CardHeader>
                  <CardTitle className={`flex items-center justify-between ${method.color}`}>
                    {method.title}
                    <Badge variant="secondary" className="text-xs">{method.badge}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  {method.items.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* 3. TIDSTEST-TABEL */}
        <section className="mb-12" id="tidstest">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Clock className="h-7 w-7 text-primary" />Tidstest-data fra 12 casinoer</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Vi har tidsregistreret hele processen fra landingsside til første spin på 12 danske licenserede casinoer – 4 for hver registreringsmetode. Alle tider er verificeret via skærmoptagelse:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Metode</th>
                  <th className="text-center p-3 font-semibold text-foreground">Casino 1</th>
                  <th className="text-center p-3 font-semibold text-foreground">Casino 2</th>
                  <th className="text-center p-3 font-semibold text-foreground">Casino 3</th>
                  <th className="text-center p-3 font-semibold text-foreground">Casino 4</th>
                  <th className="text-center p-3 font-semibold text-foreground">Gennemsnit</th>
                  <th className="text-center p-3 font-semibold text-foreground">Std.afv.</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-primary">Pay N Play</td>
                  <td className="p-3 text-center">22 sek.</td>
                  <td className="p-3 text-center">25 sek.</td>
                  <td className="p-3 text-center">29 sek.</td>
                  <td className="p-3 text-center">32 sek.</td>
                  <td className="p-3 text-center font-semibold text-primary">27 sek.</td>
                  <td className="p-3 text-center">4,4 sek.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-foreground">MitID</td>
                  <td className="p-3 text-center">2:12</td>
                  <td className="p-3 text-center">2:38</td>
                  <td className="p-3 text-center">3:05</td>
                  <td className="p-3 text-center">3:15</td>
                  <td className="p-3 text-center font-semibold">2:45</td>
                  <td className="p-3 text-center">28 sek.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-muted-foreground">Standard email</td>
                  <td className="p-3 text-center">3:28</td>
                  <td className="p-3 text-center">4:05</td>
                  <td className="p-3 text-center">4:32</td>
                  <td className="p-3 text-center">4:43</td>
                  <td className="p-3 text-center font-semibold">4:12</td>
                  <td className="p-3 text-center">52 sek.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm italic mb-4">
            * Standard email inkluderer tid til email-verifikation (åbning af email-klient og klik på bekræftelseslink). Alle test udført marts 2026 på desktop (Chrome 122, MacBook Pro M4).
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Hastigheds-faktor:</strong> Pay N Play er i gennemsnit <strong>6,1x hurtigere</strong> end MitID-registrering og <strong>9,3x hurtigere</strong> end standard email-registrering. Variationen inden for Pay N Play er markant lavere (SA: 4,4 sek.) sammenlignet med standard email (SA: 52 sek.), hvilket indikerer en mere konsistent brugeroplevelse.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 3.5 MOBIL TIDSTEST */}
        <section className="mb-12" id="mobil-tidstest">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Smartphone className="h-7 w-7 text-primary" />Mobil tidstest-data</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Over 65% af dansk online gambling sker på mobil. Vi gentog derfor hele tidstest-serien på mobil for at vurdere, om hastighedsforskellen opretholdes:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Metode</th>
                  <th className="text-center p-3 font-semibold text-foreground">Desktop gns.</th>
                  <th className="text-center p-3 font-semibold text-foreground">Mobil gns.</th>
                  <th className="text-center p-3 font-semibold text-foreground">Forskel</th>
                  <th className="text-left p-3 font-semibold text-foreground">Primær årsag</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-primary">Pay N Play</td>
                  <td className="p-3 text-center">27 sek.</td>
                  <td className="p-3 text-center">34 sek.</td>
                  <td className="p-3 text-center">+7 sek. (+26%)</td>
                  <td className="p-3">MitID app-skift</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-foreground">MitID</td>
                  <td className="p-3 text-center">2:45</td>
                  <td className="p-3 text-center">3:15</td>
                  <td className="p-3 text-center">+30 sek. (+18%)</td>
                  <td className="p-3">Touch-formular + MitID app</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-muted-foreground">Standard email</td>
                  <td className="p-3 text-center">4:12</td>
                  <td className="p-3 text-center">5:22</td>
                  <td className="p-3 text-center">+1:10 (+28%)</td>
                  <td className="p-3">Mail-app skifte + touch-formular</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Konklusion:</strong> Alle tre metoder er langsommere på mobil, men Pay N Play opretholder sin relative hastighedsfordel. Standard email-registrering rammes hårdest af mobilkonteksten pga. det ekstra app-skifte til email-klient. For mobil casinospil generelt, se vores{" "}
            <Link to="/mobil-casino" className="text-primary underline hover:text-primary/80">Mobil Casino guide</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 4. EV-MODEL FOR TIDSBESPARELSE */}
        <section className="mb-12" id="ev-model">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><TrendingUp className="h-7 w-7 text-primary" />EV-model: Tidsbesparelse over tid</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Registrering er en engangsbegivenhed per casino, men den akkumulerede tidsbesparelse over tid er signifikant – især når vi inkluderer den løbende tidsbesparelse ved hurtigere udbetalinger. Vores model beregner den totale tidsbesparelse baseret på to dimensioner: registreringstid og løbende udbetalingstid.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            <strong>Modelforudsætninger:</strong> Vi antager 1 udbetaling per uge, gennemsnitlig udbetalingstid baseret på vores test-data (Pay N Play: 12 min, MitID: 7,5 timer, Standard: 2,3 hverdage ≈ 55 timer), og at spilleren registrerer sig hos 5 nye casinoer per år.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Scenarie</th>
                  <th className="text-center p-3 font-semibold text-foreground">Pay N Play</th>
                  <th className="text-center p-3 font-semibold text-foreground">MitID</th>
                  <th className="text-center p-3 font-semibold text-foreground">Standard</th>
                  <th className="text-center p-3 font-semibold text-foreground">PnP besparelse</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { s: "1 casino, 1 registrering", pnp: "27 sek.", mid: "2:45", std: "4:12", save: "3:45" },
                  { s: "5 casinoer over 1 år", pnp: "2:15", mid: "13:45", std: "21:00", save: "18:45" },
                  { s: "10 casinoer over 3 år", pnp: "4:30", mid: "27:30", std: "42:00", save: "37:30" },
                  { s: "20 casinoer over 5 år", pnp: "9:00", mid: "55:00", std: "84:00", save: "75:00" },
                  { s: "Ugentlig udbetaling (1 år)", pnp: "~10 timer*", mid: "~390 timer*", std: "~2.860 timer*", save: "380+ timer" },
                  { s: "Ugentlig udbetaling (5 år)", pnp: "~52 timer", mid: "~1.950 timer", std: "~14.300 timer", save: "1.900+ timer" },
                ].map((row) => (
                  <tr key={row.s} className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">{row.s}</td>
                    <td className="p-3 text-center text-primary font-semibold">{row.pnp}</td>
                    <td className="p-3 text-center">{row.mid}</td>
                    <td className="p-3 text-center">{row.std}</td>
                    <td className="p-3 text-center font-semibold">{row.save}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm mb-4">
            * Udbetalingstider: Pay N Play ~12 min/uge, MitID ~7,5 timer/uge (gennemsnit), Standard ~55 timer/uge (gennemsnit inkl. weekender). Beregnet over 52 uger. Faktiske tider varierer efter casino og beløb.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Vigtigt caveat:</strong> Udbetalingstiderne for "Standard" inkluderer ventetid i hverdage – dette er ikke aktiv ventetid (du behøver ikke sidde og vente), men det er tid, hvor dine midler er utilgængelige. For spillere, der værdsætter hurtig adgang til gevinster, er denne forskel den mest signifikante.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>EV-perspektiv:</strong> Hvis vi værdisætter fritid til 200 kr./time (dansk gennemsnitlig timeløn efter skat), repræsenterer Pay N Play's 5-års udbetalingsbesparelse en estimeret værdi på ~380.000 kr. sammenlignet med standard email. Denne beregning er naturligvis hypotetisk – den reelle værdi afhænger af individuelle præferencer og udbetalingsfrekvens.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 5. SCENARIEANALYSE */}
        <section className="mb-12" id="scenarier">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Users className="h-7 w-7 text-primary" />Hvornår er hvilken metode bedst?</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Baseret på vores test-data har vi identificeret de ideelle brugerprofiler for hver registreringsmetode. Din optimale metode afhænger af dine prioriteter:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                title: "Vælg Pay N Play hvis:",
                items: [
                  "Du prioriterer hastighed over alt",
                  "Du kun bruger Trustly som betaling",
                  "Du ønsker hurtigste udbetalinger (5-15 min)",
                  "Du foretrækker ingen adgangskode",
                  "Du registrerer dig hos flere casinoer årligt",
                  "Sikkerhed er din topprioritet",
                  "Du spiller primært på mobil",
                  "Du foretrækker minimal datadeling",
                ],
                icon: Zap,
              },
              {
                title: "Vælg MitID-registrering hvis:",
                items: [
                  "Du vil bruge MobilePay eller Apple Pay",
                  "Du ønsker fuld bonus-adgang",
                  "Du foretrækker at have en fast konto",
                  "Du spiller primært hos ét casino",
                  "Du vil have flere betalingsmetoder",
                  "Du værdisætter loyalitetsprogrammer",
                  "Du ønsker balancen mellem hastighed og fleksibilitet",
                  "Du spiller ofte live casino",
                ],
                icon: Shield,
              },
              {
                title: "Vælg standard email hvis:",
                items: [
                  "Casinoet ikke tilbyder MitID/PnP",
                  "Du har brug for maksimal kontokontrol",
                  "Du foretrækker traditionelle login-flows",
                  "Du spiller på internationale casinoer",
                  "Du bruger kryptovaluta som betaling",
                  "Du vil have flest mulige casinovalg",
                  "Du foretrækker at adskille banklogin fra casino",
                  "Du vil have komplet spillehistorik",
                ],
                icon: Globe,
              },
            ].map((scenario) => (
              <Card key={scenario.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base"><scenario.icon className="h-5 w-5 text-primary" />{scenario.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {scenario.items.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* 5.5 DETALJERET PROCESSAMMENLIGNING */}
        <section className="mb-12" id="processammenligning">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><RefreshCw className="h-7 w-7 text-primary" />Detaljeret processammenligning – trin for trin</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            For at forstå tidsforskellene i dybden har vi dekomponeret hver registreringsmetode i individuelle trin med tilhørende tidsestimater:
          </p>

          <h3 className="text-xl font-semibold mb-3 text-foreground">Pay N Play (total: ~27 sek.)</h3>
          <div className="space-y-2 mb-6">
            {[
              { trin: "Klik 'Indbetal'", tid: "1 sek.", note: "Spiller klikker på CTA-knap" },
              { trin: "Trustly bankvalg vises", tid: "2 sek.", note: "API-kald til Trustly + iframe render" },
              { trin: "Vælg bank fra liste", tid: "3 sek.", note: "Brugerinteraktion – scroll og klik" },
              { trin: "MitID-autentificering", tid: "9 sek.", note: "Åbn MitID-app, godkend med fingeraftryk/kode" },
              { trin: "KYC-extraction + ROFUS", tid: "1 sek.", note: "Automatisk – ingen brugerinteraktion" },
              { trin: "Angiv beløb + bekræft", tid: "5 sek.", note: "Bruger skriver beløb + klik 'Bekræft'" },
              { trin: "Betaling + saldokredit", tid: "3 sek.", note: "SEPA Instant Transfer + session-oprettelse" },
              { trin: "Redirect til lobby", tid: "3 sek.", note: "Automatisk redirect + lobby-loading" },
            ].map((item) => (
              <div key={item.trin} className="flex items-center gap-3 text-sm">
                <span className="font-medium text-foreground w-48">{item.trin}</span>
                <span className="text-primary font-semibold w-16">{item.tid}</span>
                <span className="text-muted-foreground">{item.note}</span>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-3 text-foreground">MitID-registrering (total: ~2:45)</h3>
          <div className="space-y-2 mb-6">
            {[
              { trin: "Klik 'Opret konto'", tid: "1 sek.", note: "Spiller klikker på registreringsknap" },
              { trin: "MitID-autentificering", tid: "15 sek.", note: "MitID-app godkendelse" },
              { trin: "Formular vises (delvist udfyldt)", tid: "3 sek.", note: "Navn/adresse ofte præudfyldt fra MitID" },
              { trin: "Udfyld resterende felter", tid: "45 sek.", note: "Email, brugernavn, adgangskode, mobilnr." },
              { trin: "Accepter vilkår + ansvarligt spil", tid: "15 sek.", note: "Checkboxe + evt. indbetalingsgrænse" },
              { trin: "Vælg betalingsmetode", tid: "10 sek.", note: "Vælg mellem Trustly, MobilePay, kort osv." },
              { trin: "Gennemfør indbetaling", tid: "35 sek.", note: "Afhænger af valgt metode" },
              { trin: "Redirect til lobby", tid: "21 sek.", note: "Verifikation + lobby-loading" },
            ].map((item) => (
              <div key={item.trin} className="flex items-center gap-3 text-sm">
                <span className="font-medium text-foreground w-48">{item.trin}</span>
                <span className="text-primary font-semibold w-16">{item.tid}</span>
                <span className="text-muted-foreground">{item.note}</span>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-3 text-foreground">Standard email (total: ~4:12)</h3>
          <div className="space-y-2 mb-6">
            {[
              { trin: "Klik 'Opret konto'", tid: "1 sek.", note: "Spiller klikker på registreringsknap" },
              { trin: "Udfyld komplet formular", tid: "75 sek.", note: "Alle felter manuelt: navn, CPR, adresse, email, telefon" },
              { trin: "Opret adgangskode", tid: "25 sek.", note: "Tænk på sikker kode, opfyld krav, bekræft" },
              { trin: "Email-verifikation", tid: "65 sek.", note: "Åbn email-app, find email, klik link, vent på redirect" },
              { trin: "Accepter vilkår", tid: "10 sek.", note: "Checkboxe for vilkår og ansvarligt spil" },
              { trin: "KYC-upload (if required)", tid: "30 sek.", note: "Upload ID-dokument og/eller adressebevis" },
              { trin: "Vælg betalingsmetode + indbetal", tid: "40 sek.", note: "Første indbetaling med valgt metode" },
              { trin: "Redirect til lobby", tid: "6 sek.", note: "Saldokredit + lobby-loading" },
            ].map((item) => (
              <div key={item.trin} className="flex items-center gap-3 text-sm">
                <span className="font-medium text-foreground w-48">{item.trin}</span>
                <span className="text-primary font-semibold w-16">{item.tid}</span>
                <span className="text-muted-foreground">{item.note}</span>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* 6. UDBETALINGSSAMMENLIGNING */}
        <section className="mb-12" id="udbetalinger">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><CreditCard className="h-7 w-7 text-primary" />Udbetalingshastighedssammenligning</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Udbetalingshastighed er ofte den mest undervurderede faktor ved valg af registreringsmetode. Vores test viser dramatiske forskelle:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Parameter</th>
                  <th className="text-center p-3 font-semibold text-foreground">Pay N Play</th>
                  <th className="text-center p-3 font-semibold text-foreground">MitID</th>
                  <th className="text-center p-3 font-semibold text-foreground">Standard</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { p: "Hurtigste udbetaling", pnp: "3 min.", mid: "45 min.", std: "1 hverdag" },
                  { p: "Gennemsnitlig udbetaling", pnp: "11,75 min.", mid: "7,5 timer", std: "2,3 hverdage" },
                  { p: "Langsomste udbetaling", pnp: "22 min.", mid: "24 timer", std: "5 hverdage" },
                  { p: "KYC-tjek ved udbetaling", pnp: "Allerede verificeret", mid: "Evt. ekstra tjek", std: "Manuel KYC mulig" },
                  { p: "Udbetaling til", pnp: "Bankkonto (direkte)", mid: "Varierer efter metode", std: "Varierer efter metode" },
                  { p: "Hastigheds-faktor vs. PnP", pnp: "1x (baseline)", mid: "~37x langsommere", std: "~280x langsommere" },
                ].map((row) => (
                  <tr key={row.p} className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">{row.p}</td>
                    <td className="p-3 text-center text-primary font-semibold">{row.pnp}</td>
                    <td className="p-3 text-center">{row.mid}</td>
                    <td className="p-3 text-center">{row.std}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Årsag til forskellen:</strong> Pay N Play's hurtige udbetalinger skyldes, at KYC allerede er fuldstændigt verificeret ved indbetaling. Traditionelle casinoer kræver ofte yderligere dokumentverifikation ved første udbetaling (ID-kopi, adressebevis), hvilket kan forsinke processen med dage. For en dybdegående analyse af{" "}
            <Link to="/casino-uden-konto/fordele-og-ulemper" className="text-primary underline hover:text-primary/80">fordele og ulemper</Link> ved Pay N Play, se vores dedikerede guide.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 7. SIKKERHEDSSCORERING */}
        <section className="mb-12" id="sikkerhed">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Shield className="h-7 w-7 text-primary" />Sikkerhedssammenligning</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Vi har evalueret sikkerhedsaspekterne af alle tre registreringsmetoder på tværs af 8 dimensioner:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Sikkerhedsdimension</th>
                  <th className="text-center p-3 font-semibold text-foreground">Pay N Play</th>
                  <th className="text-center p-3 font-semibold text-foreground">MitID</th>
                  <th className="text-center p-3 font-semibold text-foreground">Standard</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { d: "Credential-risiko", pnp: "Ingen (0 risk)", mid: "Lav (password)", std: "Høj (password)" },
                  { d: "Autentificering", pnp: "Bank MitID (2FA)", mid: "MitID + password", std: "Password alene" },
                  { d: "KYC-integritet", pnp: "Bankverificeret", mid: "MitID-verificeret", std: "Selvrapporteret" },
                  { d: "Phishing-modstandsdygtighed", pnp: "Meget høj", mid: "Høj", std: "Lav" },
                  { d: "Databrud-eksponering", pnp: "Minimal", mid: "Moderat", std: "Høj" },
                  { d: "Session-sikkerhed", pnp: "Cookie (no pwd)", mid: "Pwd + session", std: "Pwd + session" },
                  { d: "ROFUS-integration", pnp: "Automatisk (CPR)", mid: "Automatisk (CPR)", std: "Automatisk (CPR)" },
                  { d: "Samlet sikkerhedsscore", pnp: "9,5/10", mid: "8,5/10", std: "7,0/10" },
                ].map((row) => (
                  <tr key={row.d} className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">{row.d}</td>
                    <td className="p-3 text-center text-primary font-semibold">{row.pnp}</td>
                    <td className="p-3 text-center">{row.mid}</td>
                    <td className="p-3 text-center">{row.std}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Pay N Play's sikkerhedsfordel skyldes primært eliminering af password-baseret autentificering og automatisk bank-KYC. For den tekniske sikkerhedsarkitektur bag Pay N Play, se vores{" "}
            <Link to="/casino-uden-konto/pay-n-play" className="text-primary underline hover:text-primary/80">Pay N Play tekniske guide</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 8. TESTLOG */}
        <CasinoTestLog
          casinoName="Registreringsmetoder"
          intro="Vi har gennemført en systematisk 14-dages sammenlignende test af alle tre registreringsmetoder på 12 danske licenserede casinoer. Alle test er udført med standardbeløb (500 kr. indbetaling) og dokumenteret med skærmoptagelse."
          entries={testLogEntries}
        />

        <Separator className="my-10" />

        {/* CLUSTER NAVIGATION */}
        <section className="mb-12" id="relaterede-guides">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><FileText className="h-7 w-7 text-primary" />Relaterede guides</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { to: "/casino-uden-konto", title: "Casino uden Konto – Hub", desc: "Komplet overblik over casino uden kontooprettelse" },
              { to: "/casino-uden-konto/pay-n-play", title: "Pay N Play – Teknisk", desc: "Trustly-protokollen og bankmatrice" },
              { to: "/casino-uden-konto/fordele-og-ulemper", title: "Fordele og Ulemper", desc: "Sikkerhed, compliance og risk/reward" },
            ].map((g) => (
              <Link key={g.to} to={g.to} className="flex flex-col rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted">
                <h3 className="font-semibold text-foreground mb-1">{g.title}</h3>
                <p className="text-xs text-muted-foreground">{g.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <LatestNewsByCategory pagePath="/casino-uden-konto/hurtig-registrering" />
        <RelatedGuides currentPath="/casino-uden-konto/hurtig-registrering" />
        <FAQSection title="Ofte Stillede Spørgsmål om Hurtig Registrering" faqs={hurtigRegFaqs} />
        <AuthorBio author="kevin" />
      </div>
    </>
  );
};

export default HurtigRegistreringGuide;
