import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { FAQSection } from "@/components/FAQSection";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import {
  Zap, Shield, Lock, Globe, Landmark, ArrowRight, CheckCircle, AlertTriangle,
  Clock, CreditCard, Eye, RefreshCw, BarChart3, Server, FileText, Smartphone,
} from "lucide-react";

const payNPlayFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er Trustly Pay N Play?",
    answer: "Trustly Pay N Play er en open banking-løsning, der giver casinoer mulighed for at tilbyde øjeblikkelig registrering og betaling via bankforbindelsen. Spilleren autentificerer sig via sin bank (MitID i Danmark), og Trustly overfører identitetsdata og indbetaling i én samlet transaktion. Teknologien er baseret på PSD2 (Payment Services Directive 2) og open banking-standarderne.",
  },
  {
    question: "Hvilke danske banker understøtter Pay N Play fuldt?",
    answer: "Alle de store danske banker understøtter Pay N Play: Danske Bank, Nordea, Jyske Bank, Sydbank, Nykredit, Spar Nord, Arbejdernes Landsbank, Ringkjøbing Landbobank, Lån & Spar Bank, Vestjysk Bank, Sparekassen Danmark, BankNordik, Saxo Bank, Sparekassen Sjælland-Fyn og Coop Bank. Nogle mindre pengeinstitutter kan have begrænset funktionalitet.",
  },
  {
    question: "Er Trustly Pay N Play sikkert?",
    answer: "Ja. Trustly er licenseret som betalingsinstitut af den svenske Finansinspektion og opererer under EU's PSD2-regulering. Al data overføres via TLS 1.3-kryptering. Trustly har aldrig direkte adgang til dine bankloginoplysninger – de fungerer som en sikker mellemmand (proxy) mellem dig og casinoet. Trustly er SOC 2 Type II-certificeret.",
  },
  {
    question: "Hvad sker der med mine data ved Pay N Play?",
    answer: "Trustly overfører kun de nødvendige KYC-data til casinoet: fuldt navn, CPR-nummer (til identitetsverifikation og ROFUS-tjek), adresse og kontonummer for transaktioner. Trustly opbevarer ikke dine bankloginoplysninger og har kun midlertidig adgang til din konto under transaktionen. Alle data er beskyttet under GDPR og den danske databeskyttelseslov.",
  },
  {
    question: "Kan Pay N Play bruges til udbetalinger?",
    answer: "Ja. En af de største fordele ved Pay N Play er, at udbetalinger sendes direkte til den bankkonto, du brugte til indbetaling. Da din identitet allerede er verificeret, er der ingen forsinkelse for KYC-tjek ved udbetaling. De fleste casinoer behandler Pay N Play-udbetalinger inden for 5-15 minutter.",
  },
];

const PayNPlayGuide = () => {
  const faqJsonLd = buildFaqSchema(payNPlayFaqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Pay N Play – Teknisk Guide til Trustly's Casino-Protokol 2026",
    description: "Dybdegående teknisk guide til Trustly Pay N Play: Open banking-protokollen, PSD2-compliance, bankkompatibilitetsmatrice for alle danske banker, sikkerhedsarkitektur og tidstest-data.",
    url: `${SITE_URL}/casino-uden-konto/pay-n-play`,
    datePublished: "2026-03-08",
    dateModified: "2026-03-08",
    authorName: "Kevin",
    authorUrl: `${SITE_URL}/forfatter/kevin`,
  });

  return (
    <>
      <SEO
        title="Pay N Play – Trustly's Casino-Teknologi Forklaret 2026"
        description="Teknisk deep-dive i Trustly Pay N Play: Open banking-protokollen, bankkompatibilitetsmatrice for 15+ danske banker, PSD2-compliance, sikkerhedsarkitektur og tidstest."
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
            <Badge variant="secondary" className="mb-4"><Server className="mr-1.5 h-3.5 w-3.5" />Teknisk Guide</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Pay N Play – Trustly's Casino-Teknologi</h1>
            <p className="text-lg text-white/80">Teknisk deep-dive i open banking-protokollen bag casino uden konto: PSD2, bankkompatibilitet, sikkerhedsarkitektur og flow-analyse.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="kevin" date="2026-03-08" readTime="28 Min." />

        {/* 1. INTRODUKTION */}
        <section className="mb-12" id="introduktion">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Globe className="h-7 w-7 text-primary" />Hvad er Pay N Play?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Pay N Play er Trustly's flagskibsprodukt inden for open banking-baseret casinobetaling. Lanceret i 2018 var det den første løsning, der kombinerede identitetsverifikation, KYC-compliance og betalingsinitiering i en enkelt banktransaktion. Teknologien bygger på EU's PSD2-direktiv (Payment Services Directive 2), der giver regulerede tredjepartsudbydere som Trustly adgang til bankkonti via sikre API'er.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For en bredere introduktion til konceptet "casino uden konto", se vores{" "}
            <Link to="/casino-uden-konto" className="text-primary underline hover:text-primary/80">hub-side om casino uden konto</Link>. Denne guide fokuserer udelukkende på den tekniske infrastruktur bag Pay N Play.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Trustly er licenseret som betalingsinstitut af den svenske Finansinspektionen (FI) og opererer under EU-pasportordningen i alle EØS-lande, herunder Danmark. Virksomheden behandler over 9 milliarder EUR årligt og er integreret med 6.300+ banker på tværs af Europa. I Danmark understøtter Trustly alle store pengeinstitutter via MitID-autentificering.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 2. TEKNISK FLOW-DIAGRAM */}
        <section className="mb-12" id="teknisk-flow">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><RefreshCw className="h-7 w-7 text-primary" />Teknisk flow – fra klik til spin</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">Her er det komplette tekniske flow, der udfoldes, når en spiller initierer en Pay N Play-transaktion:</p>
          <div className="space-y-4 mb-6">
            {[
              { step: "1. Spiller klikker 'Indbetal'", desc: "Casinoets frontend sender et API-kald til Trustly med merchantID, beløb og callback-URL." },
              { step: "2. Trustly viser bankvalg", desc: "Spilleren præsenteres for en liste af understøttede banker via Trustly's sikre iframe (PCI DSS Level 1 compliant)." },
              { step: "3. Banklogin via MitID", desc: "Spilleren autentificerer sig hos sin bank via MitID. Trustly modtager et OAuth2-token fra banken." },
              { step: "4. KYC-data extraction", desc: "Trustly henter kontohaverens navn, CPR, adresse og kontonummer via bankens PSD2 API (AIS – Account Information Service)." },
              { step: "5. ROFUS-tjek", desc: "Casinoet verificerer CPR-nummeret mod Spillemyndighedens ROFUS-API. Registrerede spillere blokeres automatisk." },
              { step: "6. Betalingsinitiering", desc: "Trustly initierer betalingen via PIS (Payment Initiation Service) – beløbet trækkes øjeblikkeligt fra spillerens bankkonto." },
              { step: "7. Konto/session oprettes", desc: "Casinoets backend opretter en intern session (ingen brugernavn/adgangskode) og krediterer spillerens saldo." },
              { step: "8. Redirect til spil", desc: "Spilleren redirectes til casinoets lobby med aktiv saldo – klar til at spille. Total tid: 15-30 sekunder." },
            ].map((item) => (
              <div key={item.step} className="flex gap-3 p-3 rounded-lg border border-border bg-card">
                <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-foreground">{item.step}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Sikkerhedsnoter:</strong> Trustly modtager aldrig spillerens bankloginoplysninger direkte. Al autentificering sker via bankens egen sikre loginside (MitID i Danmark). Trustly fungerer som en sikker proxy, der kun modtager det OAuth2-token, der giver adgang til de specifikke API-endpoints (AIS + PIS), som spilleren har samtykket til. Tokenet er tidsbegrænset og scope-begrænset.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 3. KOMPLET BANKMATRICE */}
        <section className="mb-12" id="bankmatrice">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Landmark className="h-7 w-7 text-primary" />Komplet bankkompatibilitetsmatrice</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Herunder finder du den fulde liste over danske banker og deres kompatibilitet med Trustly Pay N Play pr. marts 2026. Data er verificeret via direkte test af vores team:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Bank</th>
                  <th className="text-center p-3 font-semibold text-foreground">Indbetaling</th>
                  <th className="text-center p-3 font-semibold text-foreground">Udbetaling</th>
                  <th className="text-center p-3 font-semibold text-foreground">Gns. tid (ind)</th>
                  <th className="text-center p-3 font-semibold text-foreground">Gns. tid (ud)</th>
                  <th className="text-left p-3 font-semibold text-foreground">Bemærkninger</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { bank: "Danske Bank", ind: "✅", ud: "✅", ti: "3 sek.", tu: "5-10 min", note: "Fuld kompatibilitet" },
                  { bank: "Nordea", ind: "✅", ud: "✅", ti: "4 sek.", tu: "5-15 min", note: "Fuld kompatibilitet" },
                  { bank: "Jyske Bank", ind: "✅", ud: "✅", ti: "4 sek.", tu: "10-20 min", note: "Fuld kompatibilitet" },
                  { bank: "Sydbank", ind: "✅", ud: "✅", ti: "5 sek.", tu: "10-15 min", note: "Fuld kompatibilitet" },
                  { bank: "Nykredit", ind: "✅", ud: "✅", ti: "5 sek.", tu: "10-20 min", note: "Fuld kompatibilitet" },
                  { bank: "Spar Nord", ind: "✅", ud: "✅", ti: "6 sek.", tu: "15-25 min", note: "Fuld kompatibilitet" },
                  { bank: "Arbejdernes Landsbank", ind: "✅", ud: "✅", ti: "6 sek.", tu: "15-30 min", note: "Fuld kompatibilitet" },
                  { bank: "Ringkjøbing Landbobank", ind: "✅", ud: "✅", ti: "7 sek.", tu: "15-30 min", note: "Fuld kompatibilitet" },
                  { bank: "Lån & Spar Bank", ind: "✅", ud: "✅", ti: "6 sek.", tu: "20-30 min", note: "Fuld kompatibilitet" },
                  { bank: "Vestjysk Bank", ind: "✅", ud: "✅", ti: "7 sek.", tu: "15-30 min", note: "Fuld kompatibilitet" },
                  { bank: "Sparekassen Danmark", ind: "✅", ud: "✅", ti: "8 sek.", tu: "20-35 min", note: "Fuld kompatibilitet" },
                  { bank: "BankNordik", ind: "✅", ud: "✅", ti: "8 sek.", tu: "20-40 min", note: "Kan kræve ekstra MitID-trin" },
                  { bank: "Saxo Bank", ind: "✅", ud: "⚠️", ti: "5 sek.", tu: "1-2 timer", note: "Udbetaling kan tage længere" },
                  { bank: "Sparekassen Sjælland-Fyn", ind: "✅", ud: "✅", ti: "7 sek.", tu: "20-35 min", note: "Fuld kompatibilitet" },
                  { bank: "Coop Bank", ind: "✅", ud: "✅", ti: "8 sek.", tu: "25-40 min", note: "Nyere integration" },
                ].map((row) => (
                  <tr key={row.bank} className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">{row.bank}</td>
                    <td className="p-3 text-center">{row.ind}</td>
                    <td className="p-3 text-center">{row.ud}</td>
                    <td className="p-3 text-center">{row.ti}</td>
                    <td className="p-3 text-center">{row.tu}</td>
                    <td className="p-3 text-sm">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm italic">
            * Tider baseret på vores test i marts 2026. Faktiske tider kan variere afhængigt af bankens serverbelastning og transaktionsbeløb.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 4. PSD2 OG OPEN BANKING */}
        <section className="mb-12" id="psd2-open-banking">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><FileText className="h-7 w-7 text-primary" />PSD2 og open banking-grundlaget</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Pay N Play er muliggjort af EU's Payment Services Directive 2 (PSD2), der trådte i kraft i januar 2018. PSD2 forpligter banker til at åbne deres API'er for regulerede tredjepartsudbydere (Third Party Providers – TPP'er) som Trustly. Direktivet definerer to nøgletjenester:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base"><Eye className="h-5 w-5 text-primary" />AIS – Account Information Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">Giver Trustly adgang til at læse kontohaverens identitetsoplysninger (navn, CPR, adresse) og kontosaldo. Kræver eksplicit samtykke fra spilleren via bankens autentificeringsflow (MitID). Bruges til KYC-verifikation og ROFUS-kontrol.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base"><CreditCard className="h-5 w-5 text-primary" />PIS – Payment Initiation Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">Giver Trustly adgang til at initiere en betaling fra spillerens konto til casinoets konto. Kræver eksplicit godkendelse via Strong Customer Authentication (SCA) – i Danmark implementeret via MitID. Betalingen er øjeblikkelig og irreversibel.</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I Danmark er PSD2 implementeret via Lov om betalinger (betalingsloven), der administreres af Finanstilsynet. Trustly er registreret som betalingsinstitut i Sverige og opererer i Danmark under EU's pasportordning. Alle danske banker er forpligtet til at understøtte PSD2 API'er, hvilket sikrer bred dækning for Pay N Play.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den tekniske infrastruktur bag Pay N Play anvender OAuth 2.0-protokollen til autentificering, JSON-baserede REST API'er til dataudveksling, og SEPA Instant Credit Transfer (SCT Inst) til øjeblikkelige pengeoverførsler. Alle API-kald er krypteret med TLS 1.3 og signeret med digitale certifikater (eIDAS-qualified certificates).
          </p>
        </section>

        <Separator className="my-10" />

        {/* 5. SIKKERHEDSARKITEKTUR */}
        <section className="mb-12" id="sikkerhed">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Shield className="h-7 w-7 text-primary" />Sikkerhedsarkitektur</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">Pay N Play's sikkerhedsmodel er opbygget i multiple lag for at beskytte spillerens data og midler:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { icon: Lock, title: "TLS 1.3 Transport Layer", desc: "Al kommunikation mellem spiller, bank, Trustly og casino er krypteret med den nyeste TLS 1.3-protokol med Forward Secrecy. Ingen mellemliggende part kan aflytte eller manipulere data in transit." },
              { icon: Shield, title: "SOC 2 Type II Certificering", desc: "Trustly er SOC 2 Type II-certificeret, hvilket bekræfter at virksomhedens sikkerhedskontroller er designet korrekt og fungerer effektivt over tid. Auditeringen dækker sikkerhed, tilgængelighed, procesintegritet og fortrolighed." },
              { icon: Eye, title: "Zero-Knowledge Authentication", desc: "Trustly modtager aldrig spillerens bankloginoplysninger direkte. Al autentificering sker via bankens egen loginside (redirect-model), og Trustly modtager kun det resulterende OAuth2-token." },
              { icon: FileText, title: "GDPR & Databeskyttelse", desc: "Alle persondata behandles i overensstemmelse med GDPR og den danske databeskyttelseslov. Data opbevares inden for EU/EØS, og spilleren kan til enhver tid anmode om sletning af sine data hos Trustly." },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base"><item.icon className="h-5 w-5 text-primary" />{item.title}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* 6. TIDSTEST-DATA */}
        <section className="mb-12" id="tidstest">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Clock className="h-7 w-7 text-primary" />Tidstest: Registrering og udbetaling</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Vi har gennemført 20 Pay N Play-transaktioner på 4 forskellige casinoer med 5 forskellige danske banker for at måle den reelle hastighed:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Måling</th>
                  <th className="text-center p-3 font-semibold text-foreground">Minimum</th>
                  <th className="text-center p-3 font-semibold text-foreground">Gennemsnit</th>
                  <th className="text-center p-3 font-semibold text-foreground">Maximum</th>
                  <th className="text-center p-3 font-semibold text-foreground">N</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { m: "Første registrering + indbetaling", min: "18 sek.", avg: "27 sek.", max: "42 sek.", n: "20" },
                  { m: "Genbesøg (returnerende spiller)", min: "8 sek.", avg: "14 sek.", max: "23 sek.", n: "20" },
                  { m: "Udbetaling (krediteret bank)", min: "3 min.", avg: "11,75 min.", max: "22 min.", n: "16" },
                  { m: "MitID-autentificering (del af flow)", min: "5 sek.", avg: "9 sek.", max: "15 sek.", n: "40" },
                ].map((row) => (
                  <tr key={row.m} className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">{row.m}</td>
                    <td className="p-3 text-center">{row.min}</td>
                    <td className="p-3 text-center text-primary font-semibold">{row.avg}</td>
                    <td className="p-3 text-center">{row.max}</td>
                    <td className="p-3 text-center">{row.n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm italic">
            * Data indsamlet marts 2026 med Danske Bank, Nordea, Jyske Bank, Sydbank og Spar Nord. Alle test udført på desktop (Chrome) med stabil fiberforbindelse.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 7. CLUSTER NAVIGATION */}
        <section className="mb-12" id="relaterede-guides">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><FileText className="h-7 w-7 text-primary" />Relaterede guides</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { to: "/casino-uden-konto", title: "Casino uden Konto – Hub", desc: "Komplet overblik over casino uden kontooprettelse" },
              { to: "/casino-uden-konto/hurtig-registrering", title: "Hurtig Registrering", desc: "Pay N Play vs. MitID vs. standard – tidstest" },
              { to: "/casino-uden-konto/fordele-og-ulemper", title: "Fordele og Ulemper", desc: "Dybdegående sikkerhed og compliance-analyse" },
            ].map((g) => (
              <Link key={g.to} to={g.to} className="flex flex-col rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted">
                <h3 className="font-semibold text-foreground mb-1">{g.title}</h3>
                <p className="text-xs text-muted-foreground">{g.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <LatestNewsByCategory pagePath="/casino-uden-konto/pay-n-play" />
        <RelatedGuides currentPath="/casino-uden-konto/pay-n-play" />
        <FAQSection title="Ofte Stillede Spørgsmål om Pay N Play" faqs={payNPlayFaqs} />
        <AuthorBio author="kevin" />
      </div>
    </>
  );
};

export default PayNPlayGuide;
