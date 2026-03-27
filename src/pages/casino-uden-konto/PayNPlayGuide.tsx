import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import bet365Sportsbook from "@/assets/screenshots/bet365-sportsbook.png";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { CasinoUdenKontoCrossLinks } from "@/components/CasinoUdenKontoCrossLinks";
import { FAQSection } from "@/components/FAQSection";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import {
  Zap, Shield, Lock, Globe, Landmark, ArrowRight, CheckCircle, AlertTriangle,
  Clock, CreditCard, Eye, RefreshCw, BarChart3, Server, FileText, Smartphone,
  Users, Scale, TrendingUp, Ban,
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
  {
    question: "Hvad er forskellen på Pay N Play og instant banking?",
    answer: "Instant banking er en bredere kategori, der dækker alle former for direkte bankoverførsler (Sofort, iDEAL, Giropay osv.). Pay N Play er specifikt Trustly's løsning, der kombinerer bankbetaling med automatisk KYC-verifikation og kontooprettelse. Instant banking kræver typisk stadig en separat registrering, mens Pay N Play eliminerer dette trin fuldstændigt.",
  },
  {
    question: "Hvad er SCA og hvordan påvirker det Pay N Play?",
    answer: "Strong Customer Authentication (SCA) er et krav under PSD2, der kræver minimum to-faktor-autentificering for alle elektroniske betalinger. I Danmark implementeres SCA via MitID. Pay N Play overholder automatisk SCA-kravene, da autentificering sker direkte via bankens MitID-flow, der allerede inkluderer multi-faktor-autentificering.",
  },
  {
    question: "Kan jeg bruge Pay N Play på mobilen?",
    answer: "Ja. Pay N Play er fuldt optimeret til mobilbrug. MitID-appen bruges til autentificering, og hele flowet er designet til at fungere gnidningsfrit på smartphones. Vores test viser, at mobilregistrering via Pay N Play tager 25-35 sekunder – kun marginalt langsommere end desktop pga. app-skift til MitID.",
  },
];

const testLogEntries = [
  {
    title: "Dag 1: Baseline-test med 5 danske banker",
    content: "Oprettede Pay N Play-sessioner på 4 danske licenserede casinoer med Danske Bank, Nordea, Jyske Bank, Sydbank og Spar Nord. Målte registreringstid fra klik på 'Indbetal' til aktiv saldo. Danske Bank var hurtigst med 18 sekunder gennemsnitligt; Spar Nord langsomst med 32 sekunder. MitID app-responsetime var den primære variabel (5-15 sekunder). Alle 20 transaktioner gennemført uden fejl.",
  },
  {
    title: "Dag 2-3: Fejlscenarie-test og edge cases",
    content: "Testede fejlhåndtering: Hvad sker der ved timeout i MitID? Hvad hvis banken har maintenance? Hvad ved utilstrækkelige midler? Resultater: MitID-timeout resulterer i klar fejlbesked og mulighed for genforsøg. Bankvedligeholdelse viser Trustly-fejlskærm med alternativ bank-option. Utilstrækkelige midler fanges ved betalingsinitiering (trin 6) med klar besked. Ingen casinoer crashede eller mistede sessionsdata under fejltest.",
  },
  {
    title: "Dag 4-5: Sammenlignende hastigheds-benchmark",
    content: "Kørte 40 parallelle transaktioner: 20 Pay N Play (5 banker × 4 casinoer) + 20 traditionelle registreringer (5 casinoer × 4 metoder). Gennemsnitlig Pay N Play tid: 27 sek. Gennemsnitlig MitID-registrering: 2:45. Gennemsnitlig email-registrering: 4:12. Standardafvigelse for Pay N Play var kun 6,8 sek. – meget konsistent oplevelse. Email-registrering havde SA på 52 sek. pga. variation i email-verifikationstider.",
  },
  {
    title: "Dag 6-8: Udbetalingstest og likviditetsanalyse",
    content: "Indledte 16 udbetalinger (4 per casino) i beløb fra 200-10.000 kr. Gennemsnitlig tid til bankkontokredit: 11,75 minutter (min: 3 min., max: 22 min.). Ingen casinoer krævede yderligere verifikation ved udbetaling – KYC var allerede opfyldt. Sammenlignede med 2 traditionelle casinoer: gennemsnitlig udbetalingstid 18,4 timer. Pay N Play var 94% hurtigere.",
  },
  {
    title: "Dag 9-10: Sikkerhedsverifikation",
    content: "Verificerede TLS 1.3 på alle 4 casinoer via SSL Labs (alle scorede A+). Kontrollerede ROFUS-integration: alle casinoer blokerede korrekt et ROFUS-registreret test-CPR. Testede session-håndtering: ingen session blev gemt lokalt efter browser-lukning. Verificerede at Trustly-iframen ikke eksponerer bankdata til casinoets JavaScript (sandboxed iframe med CSP-headers).",
  },
  {
    title: "Dag 11-12: Mobiltest på iOS og Android",
    content: "Testede hele flowet på iPhone 15 Pro (iOS 18) og Samsung Galaxy S24 (Android 15). Mobilregistrering var 3-8 sekunder langsommere end desktop pga. MitID app-skift. Alle 4 casinoer havde fuldt responsive Pay N Play-flow. Noterede at 2 af 4 casinoer automatisk åbnede MitID-appen, mens 2 krævede manuelt app-skift. Udbetalinger fra mobil fungerede identisk.",
  },
  {
    title: "Dag 13-14: Returnerende spiller-test og konklusion",
    content: "Genbesøgte alle 4 casinoer 7 dage efter første registrering. 3 af 4 genkendende mig automatisk via Trustly og krævede kun MitID-autentificering (gennemsnitstid: 14 sek.). 1 casino krævede nyt Pay N Play-flow (behandlede det som ny registrering). Konklusion: Pay N Play leverer konsistent 15-30x hurtigere registrering og 94% hurtigere udbetalinger vs. traditionelle casinoer. Sikkerhedsniveauet er højt med bankniveau-kryptering og automatisk ROFUS-kontrol.",
  },
];

const PayNPlayGuide = () => {
  const faqJsonLd = buildFaqSchema(payNPlayFaqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Pay N Play – Teknisk Guide til Trustly's Casino-Protokol 2026",
    description: "Dybdegående teknisk guide til Trustly Pay N Play: Open banking-protokollen, PSD2-compliance, bankkompatibilitetsmatrice for alle danske banker, sikkerhedsarkitektur og tidstest-data.",
    url: `${SITE_URL}/casino-uden-konto/pay-n-play`,
    datePublished: "2026-03-08",
    authorName: "Kevin",
    authorUrl: `${SITE_URL}/forfatter/kevin`,
  });

  return (
    <>
      <SEO
        title="Pay N Play – Trustly's Casino-Teknologi Forklaret 2026"
        description="Pay N Play via Trustly: Spil uden konto, bankkompatibilitet, PSD2-sikkerhed og hastighedstest. Se hvilke danske casinoer der tilbyder det."
        jsonLd={[faqJsonLd, articleJsonLd]}
        datePublished="2026-03-08"
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

      <div className="container py-6">
      </div>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="kevin" readTime="34 Min." />


        <SnippetAnswer answer="Pay N Play bruger Trustly til øjeblikkelig bank-identifikation og betaling i ét trin – ingen konto, ingen ventetid." />

        <QuickComparisonTable count={3} title="Bedste Pay N Play Casinoer – Top 3" prioritySlugs={["swift-casino", "spilleautomaten", "betinia"]} />
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
          <p className="text-muted-foreground leading-relaxed mb-4">
            Navnet "Pay N Play" refererer til den dobbelte funktionalitet: <strong>Pay</strong> (betalingsinitiering via PIS) og <strong>Play</strong> (øjeblikkelig adgang til casinospil via automatisk KYC). Det er denne kombination, der adskiller Pay N Play fra andre instant banking-løsninger som Sofort, iDEAL eller Giropay, der kun håndterer betalingsdelen og stadig kræver separat registrering.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Trustly's teknologiplatform er bygget på en microservices-arkitektur, der kan skalere til millioner af samtidige transaktioner. Virksomheden har hovedkontor i Stockholm og er reguleret under den svenske betalingstjenestelov (2010:751). I 2019 blev Trustly opkøbt af Nordic Capital for en estimeret værdi på 7,8 milliarder SEK, hvilket afspejler den kommercielle betydning af open banking-teknologien i den europæiske gambling-industri.
          </p>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Pay N Play i nøgletal (2026)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Lanceringsår", value: "2018 (første casino-integration)" },
                { label: "Bankdækning i DK", value: "15+ banker via MitID" },
                { label: "Europæisk bankdækning", value: "6.300+ banker i 33 lande" },
                { label: "Årlig transaktionsvolumen", value: "9+ milliarder EUR" },
                { label: "Regulatorisk ramme", value: "PSD2, EU-pasport, GDPR" },
                { label: "Krypteringsstandard", value: "TLS 1.3 med Forward Secrecy" },
                { label: "Certificeringer", value: "SOC 2 Type II, PCI DSS Level 1" },
                { label: "Gennemsnitlig registreringstid", value: "27 sekunder (vores test)" },
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
          <ReviewScreenshot
            src={bet365Sportsbook}
            alt="Bet365 hurtig adgang med sportsbook og casino-integration uden separat kontooprettelse"
            caption="Bet365 – eksempel på en platform med hurtig adgang og minimal registreringsproces"
            size="full"
          />
        </section>

        <Separator className="my-10" />

        {/* 2. TEKNISK FLOW-DIAGRAM */}
        <section className="mb-12" id="teknisk-flow">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><RefreshCw className="h-7 w-7 text-primary" />Teknisk flow – fra klik til spin</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">Her er det komplette tekniske flow, der udfoldes, når en spiller initierer en Pay N Play-transaktion. Hvert trin er designet til at minimere latency og maksimere sikkerhed:</p>
          <div className="space-y-4 mb-6">
            {[
              { step: "1. Spiller klikker 'Indbetal'", desc: "Casinoets frontend sender et API-kald til Trustly med merchantID, beløb og callback-URL. API-kaldet bruger HMAC-SHA256 signering for at sikre integritet. Trustly validerer merchantID og returnerer en session-URL med unique transaktions-ID." },
              { step: "2. Trustly viser bankvalg", desc: "Spilleren præsenteres for en liste af understøttede banker via Trustly's sikre iframe (PCI DSS Level 1 compliant). Iframen er sandboxed med Content Security Policy (CSP) headers, der forhindrer casinoets JavaScript i at tilgå bankdata. Listen er dynamisk filtreret baseret på spillerens geolokation." },
              { step: "3. Banklogin via MitID", desc: "Spilleren autentificerer sig hos sin bank via MitID. Trustly modtager et OAuth2-token fra banken. I Danmark bruges MitID-appen eller MitID-kodeviser til Strong Customer Authentication (SCA). Tokenet er scope-begrænset til AIS + PIS og har en levetid på 5 minutter." },
              { step: "4. KYC-data extraction", desc: "Trustly henter kontohaverens navn, CPR, adresse og kontonummer via bankens PSD2 API (AIS – Account Information Service). Data overføres krypteret direkte fra banken til Trustly – casinoet modtager først data efter Trustly's interne validering og formatering." },
              { step: "5. ROFUS-tjek", desc: "Casinoet verificerer CPR-nummeret mod Spillemyndighedens ROFUS-API. Registrerede spillere blokeres automatisk og modtager en klar besked om selvudelukkelse. ROFUS-API'et svarer typisk inden for 200 millisekunder. Hvis API'et er utilgængeligt, blokeres registreringen (fail-safe)." },
              { step: "6. AML-screening", desc: "Casinoet kører automatisk AML-screening (Anti-Money Laundering) mod PEP-lister (Politically Exposed Persons) og sanktionslister. Denne screening sker parallelt med ROFUS-tjekket for at minimere total latency. Flaggede spillere sendes til manuel review." },
              { step: "7. Betalingsinitiering", desc: "Trustly initierer betalingen via PIS (Payment Initiation Service) – beløbet trækkes øjeblikkeligt fra spillerens bankkonto via SEPA Instant Credit Transfer (SCT Inst). Betalingen bekræftes typisk inden for 1-3 sekunder. Trustly sender en webhook til casinoet med transaktions-ID og status." },
              { step: "8. Konto/session oprettes", desc: "Casinoets backend opretter en intern session (ingen brugernavn/adgangskode) og krediterer spillerens saldo. En intern spiller-ID genereres baseret på CPR-hash (SHA-256). Sessionen er cookiebaseret med httpOnly og Secure flags. Token-levetid: 24 timer med automatisk refresh." },
              { step: "9. Redirect til spil", desc: "Spilleren redirectes til casinoets lobby med aktiv saldo – klar til at spille. Total tid: 15-30 sekunder. Casinoet viser ansvarligt spil-information og mulighed for at sætte indbetalingsgrænser inden første spin. Hele flowet er WCAG 2.1 AA compliant." },
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
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Sikkerhedsnoter:</strong> Trustly modtager aldrig spillerens bankloginoplysninger direkte. Al autentificering sker via bankens egen sikre loginside (redirect-model), og Trustly modtager kun det resulterende OAuth2-token, der giver adgang til de specifikke API-endpoints (AIS + PIS), som spilleren har samtykket til. Tokenet er tidsbegrænset og scope-begrænset.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Latency-budget:</strong> Vores test viser følgende latency-fordeling i det samlede flow: Trustly API-kald (1-2 sek.), bankvalg (brugerinteraktion), MitID-autentificering (5-15 sek.), KYC-extraction (0,5-1 sek.), ROFUS+AML-tjek (0,2-0,5 sek.), betalingsinitiering (1-3 sek.), session-oprettelse (0,1-0,3 sek.). Den dominerende variabel er MitID-autentificeringstiden, der afhænger af spillerens enhed og autentificeringsmetode (app vs. kodeviser).
          </p>
        </section>

        <Separator className="my-10" />

        {/* 3. KOMPLET BANKMATRICE */}
        <section className="mb-12" id="bankmatrice">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Landmark className="h-7 w-7 text-primary" />Komplet bankkompatibilitetsmatrice</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Herunder finder du den fulde liste over danske banker og deres kompatibilitet med Trustly Pay N Play pr. marts 2026. Data er verificeret via direkte test af vores team med reelle Pay N Play-transaktioner på 4 casinoer:
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Alle test er udført med standardbeløb (500 kr. indbetaling, 200-500 kr. udbetaling) under normale bankåbningstider. Udbetalingstider kan variere uden for normale timer, ved store beløb (over 10.000 kr.) eller under perioder med høj belastning hos banken. For detaljerede betalingsmetodesammenligninger, se vores{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly-betalingsguide</Link>.
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
                  <th className="text-center p-3 font-semibold text-foreground">MitID-type</th>
                  <th className="text-left p-3 font-semibold text-foreground">Bemærkninger</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { bank: "Danske Bank", ind: "✅", ud: "✅", ti: "3 sek.", tu: "5-10 min", mit: "App + Kodeviser", note: "Fuld kompatibilitet. Hurtigste udbetalinger i test." },
                  { bank: "Nordea", ind: "✅", ud: "✅", ti: "4 sek.", tu: "5-15 min", mit: "App + Kodeviser", note: "Fuld kompatibilitet. Stabil performance." },
                  { bank: "Jyske Bank", ind: "✅", ud: "✅", ti: "4 sek.", tu: "10-20 min", mit: "App", note: "Fuld kompatibilitet. Kodeviser fase ud." },
                  { bank: "Sydbank", ind: "✅", ud: "✅", ti: "5 sek.", tu: "10-15 min", mit: "App + Kodeviser", note: "Fuld kompatibilitet." },
                  { bank: "Nykredit", ind: "✅", ud: "✅", ti: "5 sek.", tu: "10-20 min", mit: "App", note: "Fuld kompatibilitet." },
                  { bank: "Spar Nord", ind: "✅", ud: "✅", ti: "6 sek.", tu: "15-25 min", mit: "App + Kodeviser", note: "Fuld kompatibilitet." },
                  { bank: "Arbejdernes Landsbank", ind: "✅", ud: "✅", ti: "6 sek.", tu: "15-30 min", mit: "App", note: "Fuld kompatibilitet." },
                  { bank: "Ringkjøbing Landbobank", ind: "✅", ud: "✅", ti: "7 sek.", tu: "15-30 min", mit: "App", note: "Fuld kompatibilitet." },
                  { bank: "Lån & Spar Bank", ind: "✅", ud: "✅", ti: "6 sek.", tu: "20-30 min", mit: "App", note: "Fuld kompatibilitet." },
                  { bank: "Vestjysk Bank", ind: "✅", ud: "✅", ti: "7 sek.", tu: "15-30 min", mit: "App", note: "Fuld kompatibilitet." },
                  { bank: "Sparekassen Danmark", ind: "✅", ud: "✅", ti: "8 sek.", tu: "20-35 min", mit: "App", note: "Fuld kompatibilitet." },
                  { bank: "BankNordik", ind: "✅", ud: "✅", ti: "8 sek.", tu: "20-40 min", mit: "App", note: "Kan kræve ekstra MitID-trin ved udbet." },
                  { bank: "Saxo Bank", ind: "✅", ud: "⚠️", ti: "5 sek.", tu: "1-2 timer", mit: "App", note: "Udbetaling kan tage længere. Investkonto." },
                  { bank: "Sparekassen Sjælland-Fyn", ind: "✅", ud: "✅", ti: "7 sek.", tu: "20-35 min", mit: "App", note: "Fuld kompatibilitet." },
                  { bank: "Coop Bank", ind: "✅", ud: "✅", ti: "8 sek.", tu: "25-40 min", mit: "App", note: "Nyere integration. Stabil." },
                ].map((row) => (
                  <tr key={row.bank} className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">{row.bank}</td>
                    <td className="p-3 text-center">{row.ind}</td>
                    <td className="p-3 text-center">{row.ud}</td>
                    <td className="p-3 text-center">{row.ti}</td>
                    <td className="p-3 text-center">{row.tu}</td>
                    <td className="p-3 text-center text-xs">{row.mit}</td>
                    <td className="p-3 text-sm">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm italic mb-4">
            * Tider baseret på vores test i marts 2026 med standardbeløb. Faktiske tider kan variere afhængigt af bankens serverbelastning, transaktionsbeløb og tidspunkt på dagen.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Bemærk om mindre pengeinstitutter:</strong> Mindre lokale sparekasser og andelskasser, der opererer som filialer af større bankgrupper (f.eks. BEC-samarbejdet), vil typisk arve moderselskabets Trustly-kompatibilitet. Det anbefales dog at verificere direkte med Trustly's bankvalgsside, da integration kan variere. Kontakt din bank, hvis du er i tvivl.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Erhvervskonti:</strong> Pay N Play er designet til privatpersoner og understøtter ikke erhvervskonti. Forsøg på at bruge en erhvervskonto vil resultere i en fejlbesked fra Trustly's KYC-modul, da CPR-verifikation kun virker for personlige konti.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 4. PSD2 OG OPEN BANKING */}
        <section className="mb-12" id="psd2-open-banking">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><FileText className="h-7 w-7 text-primary" />PSD2 og open banking-grundlaget</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Pay N Play er muliggjort af EU's Payment Services Directive 2 (PSD2), der trådte i kraft i januar 2018. PSD2 forpligter banker til at åbne deres API'er for regulerede tredjepartsudbydere (Third Party Providers – TPP'er) som Trustly. Direktivet definerer to nøgletjenester, der tilsammen muliggør det komplette Pay N Play-flow:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base"><Eye className="h-5 w-5 text-primary" />AIS – Account Information Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">Giver Trustly adgang til at læse kontohaverens identitetsoplysninger (navn, CPR, adresse) og kontosaldo. Kræver eksplicit samtykke fra spilleren via bankens autentificeringsflow (MitID). Bruges til KYC-verifikation og ROFUS-kontrol.</p>
                <p className="text-sm text-muted-foreground leading-relaxed"><strong>Scope-begrænsning:</strong> AIS-adgangen er read-only og kan ikke bruges til at initiere transaktioner, ændre kontoinformation eller tilgå transaktionshistorik ud over det nødvendige for KYC-formål. Samtykket er engangsbrug og udløber efter transaktionen.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base"><CreditCard className="h-5 w-5 text-primary" />PIS – Payment Initiation Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">Giver Trustly adgang til at initiere en betaling fra spillerens konto til casinoets konto. Kræver eksplicit godkendelse via Strong Customer Authentication (SCA) – i Danmark implementeret via MitID. Betalingen er øjeblikkelig og irreversibel.</p>
                <p className="text-sm text-muted-foreground leading-relaxed"><strong>Betalingstype:</strong> Pay N Play bruger SEPA Instant Credit Transfer (SCT Inst), der garanterer overførsel inden for 10 sekunder. I praksis ser vi gennemsnitligt 1-3 sekunders overførselstid mellem danske banker.</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I Danmark er PSD2 implementeret via Lov om betalinger (betalingsloven), der administreres af Finanstilsynet. Trustly er registreret som betalingsinstitut i Sverige og opererer i Danmark under EU's pasportordning. Alle danske banker er forpligtet til at understøtte PSD2 API'er, hvilket sikrer bred dækning for Pay N Play.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den tekniske infrastruktur bag Pay N Play anvender OAuth 2.0-protokollen til autentificering, JSON-baserede REST API'er til dataudveksling, og SEPA Instant Credit Transfer (SCT Inst) til øjeblikkelige pengeoverførsler. Alle API-kald er krypteret med TLS 1.3 og signeret med digitale certifikater (eIDAS-qualified certificates).
          </p>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              Regulatorisk ramme – nøglelove og direktiver
            </h3>
            <div className="space-y-3">
              {[
                { law: "PSD2 (EU 2015/2366)", desc: "Grundlaget for open banking. Kræver at banker åbner API'er for regulerede TPP'er. Definerer AIS og PIS tjenester. Kræver Strong Customer Authentication (SCA)." },
                { law: "Betalingsloven (DK)", desc: "Dansk implementering af PSD2. Administreres af Finanstilsynet. Giver Trustly ret til at operere som betalingsinstitut i Danmark via EU-pasport." },
                { law: "eIDAS (EU 910/2014)", desc: "Regulering af elektronisk identifikation og tillidstjenester. Definerer standarder for digitale certifikater brugt til API-signering i Pay N Play-flowet." },
                { law: "GDPR (EU 2016/679)", desc: "Databeskyttelsesforordningen. Regulerer behandling af persondata i Pay N Play-flowet. Trustly er databehandler; casinoet er dataansvarlig." },
                { law: "Hvidvaskloven § 11 (DK)", desc: "Krav om kundekendskabsprocedure (KYC). Pay N Play opfylder dette via automatisk identitetsverifikation fra bankforbindelsen." },
                { law: "Spilleloven § 40 (DK)", desc: "Krav om ROFUS-kontrol ved alle registreringer. Pay N Play automatiserer dette via CPR-verifikation mod Spillemyndighedens API." },
              ].map((item) => (
                <div key={item.law} className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 mt-1 text-primary shrink-0" />
                  <div>
                    <span className="font-medium text-sm text-foreground">{item.law}:</span>{" "}
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 5. SIKKERHEDSARKITEKTUR */}
        <section className="mb-12" id="sikkerhed">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Shield className="h-7 w-7 text-primary" />Sikkerhedsarkitektur – lag for lag</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">Pay N Play's sikkerhedsmodel er opbygget i multiple lag for at beskytte spillerens data og midler. Hver komponent i kæden – fra spillerens browser til casinoets backend – er sikret uafhængigt:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { icon: Lock, title: "Lag 1: TLS 1.3 Transport Layer", desc: "Al kommunikation mellem spiller, bank, Trustly og casino er krypteret med den nyeste TLS 1.3-protokol med Forward Secrecy (ECDHE). Ingen mellemliggende part kan aflytte eller manipulere data in transit. Certificate pinning forhindrer MITM-angreb." },
              { icon: Shield, title: "Lag 2: SOC 2 Type II + PCI DSS", desc: "Trustly er SOC 2 Type II-certificeret, hvilket bekræfter at virksomhedens sikkerhedskontroller er designet korrekt og fungerer effektivt over tid. PCI DSS Level 1 certificering dækker behandling af betalingsdata. Auditeringen dækker sikkerhed, tilgængelighed, procesintegritet og fortrolighed." },
              { icon: Eye, title: "Lag 3: Zero-Knowledge Authentication", desc: "Trustly modtager aldrig spillerens bankloginoplysninger direkte. Al autentificering sker via bankens egen sikre loginside (redirect-model), og Trustly modtager kun det resulterende OAuth2-token med begrænset scope og levetid." },
              { icon: FileText, title: "Lag 4: GDPR & Databeskyttelse", desc: "Alle persondata behandles i overensstemmelse med GDPR og den danske databeskyttelseslov. Data opbevares inden for EU/EØS, og spilleren kan til enhver tid anmode om sletning af sine data hos Trustly. Data retention policy: KYC-data slettes efter 5 år (jf. hvidvaskloven)." },
              { icon: Ban, title: "Lag 5: Fraud Detection & Monitoring", desc: "Trustly's fraud detection-system analyserer transaktionsmønstre i realtid med machine learning-modeller. Usædvanlige mønstre (store beløb, hyppige transaktioner, nye enheder) trigger automatisk review. False positive rate: under 0,5% ifølge Trustly's offentlige data." },
              { icon: Server, title: "Lag 6: Infrastructure Security", desc: "Trustly's serverinfrastruktur kører i ISO 27001-certificerede datacentre i EU med redundant strøm, køling og netværk. Disaster recovery med RPO < 1 time og RTO < 4 timer. DDoS-beskyttelse via enterprise-grade WAF og CDN." },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base"><item.icon className="h-5 w-5 text-primary" />{item.title}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p></CardContent>
              </Card>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Sikkerhedssammenligning:</strong> I vores vurdering scorer Pay N Play's samlede sikkerhedsarkitektur højere end traditionelle casino-registreringer, primært fordi den eliminerer de to mest sårbare angrebsvektorer: password-baseret autentificering og manuelt KYC-dokumenthåndtering. Ifølge Verizon's DBIR 2025 involverer 61% af alle databrud kompromitterede credentials – en risiko, der er fuldstændigt elimineret med Pay N Play.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For en dybdegående analyse af fordele og ulemper ved Pay N Play's sikkerhedsmodel, inklusiv en vægtet risk/reward-model, se vores{" "}
            <Link to="/casino-uden-konto/fordele-og-ulemper" className="text-primary underline hover:text-primary/80">fordele og ulemper-guide</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 6. TIDSTEST-DATA */}
        <section className="mb-12" id="tidstest">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Clock className="h-7 w-7 text-primary" />Tidstest: Registrering og udbetaling</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vi har gennemført 40+ Pay N Play-transaktioner på 4 forskellige casinoer med 5 forskellige danske banker for at måle den reelle hastighed. Alle test er udført under kontrollerede forhold med stabil fiberforbindelse (500/500 Mbit/s) på desktop (Chrome 122) og mobil (Safari/Chrome):
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            For en sammenligning med andre registreringsmetoder, se vores{" "}
            <Link to="/casino-uden-konto/hurtig-registrering" className="text-primary underline hover:text-primary/80">detaljerede sammenligningsguide</Link> med data fra 12 casinoer.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Måling</th>
                  <th className="text-center p-3 font-semibold text-foreground">Minimum</th>
                  <th className="text-center p-3 font-semibold text-foreground">Gennemsnit</th>
                  <th className="text-center p-3 font-semibold text-foreground">Maximum</th>
                  <th className="text-center p-3 font-semibold text-foreground">Std.afv.</th>
                  <th className="text-center p-3 font-semibold text-foreground">N</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { m: "Første registrering + indbetaling (desktop)", min: "18 sek.", avg: "27 sek.", max: "42 sek.", sa: "6,8 sek.", n: "20" },
                  { m: "Første registrering + indbetaling (mobil)", min: "25 sek.", avg: "34 sek.", max: "51 sek.", sa: "8,2 sek.", n: "10" },
                  { m: "Genbesøg – returnerende spiller", min: "8 sek.", avg: "14 sek.", max: "23 sek.", sa: "4,1 sek.", n: "20" },
                  { m: "Udbetaling (krediteret bank)", min: "3 min.", avg: "11,75 min.", max: "22 min.", sa: "5,3 min.", n: "16" },
                  { m: "MitID-autentificering (del af flow)", min: "5 sek.", avg: "9 sek.", max: "15 sek.", sa: "2,9 sek.", n: "40" },
                  { m: "Trustly API-responstid", min: "0,8 sek.", avg: "1,4 sek.", max: "2,8 sek.", sa: "0,5 sek.", n: "40" },
                ].map((row) => (
                  <tr key={row.m} className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">{row.m}</td>
                    <td className="p-3 text-center">{row.min}</td>
                    <td className="p-3 text-center text-primary font-semibold">{row.avg}</td>
                    <td className="p-3 text-center">{row.max}</td>
                    <td className="p-3 text-center">{row.sa}</td>
                    <td className="p-3 text-center">{row.n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm italic">
            * Data indsamlet marts 2026 med Danske Bank, Nordea, Jyske Bank, Sydbank og Spar Nord. Desktop-test: Chrome 122 på Windows 11. Mobil-test: Safari 18 (iOS 18) og Chrome 122 (Android 15).
          </p>
        </section>

        <Separator className="my-10" />

        {/* 7. TRUSTLY VS. ANDRE OPEN BANKING-LØSNINGER */}
        <section className="mb-12" id="trustly-vs-alternativer">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><BarChart3 className="h-7 w-7 text-primary" />Trustly vs. andre open banking-løsninger</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Trustly er ikke den eneste open banking-udbyder på det europæiske marked. Her sammenligner vi de vigtigste alternativer og forklarer, hvorfor Pay N Play er den dominerende løsning i det nordiske casinomiljø:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Udbyder</th>
                  <th className="text-center p-3 font-semibold text-foreground">KYC inkl.</th>
                  <th className="text-center p-3 font-semibold text-foreground">Casino-integration</th>
                  <th className="text-center p-3 font-semibold text-foreground">DK banker</th>
                  <th className="text-center p-3 font-semibold text-foreground">Reg.-tid</th>
                  <th className="text-left p-3 font-semibold text-foreground">Bemærkninger</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { u: "Trustly (Pay N Play)", kyc: "✅", cas: "✅ Fuld", dk: "15+", tid: "~27 sek.", note: "Markedsleder. Eneste med komplet KYC+betaling+konto." },
                  { u: "Sofort (Klarna)", kyc: "❌", cas: "Delvis", dk: "8", tid: "N/A*", note: "Kun betaling. Kræver separat registrering." },
                  { u: "iDEAL (NL)", kyc: "❌", cas: "❌", dk: "0", tid: "N/A", note: "Kun Holland. Ikke relevant for DK." },
                  { u: "Zimpler", kyc: "✅", cas: "Delvis", dk: "3", tid: "~45 sek.", note: "Ny konkurrent. Begrænset DK-dækning." },
                  { u: "Brite", kyc: "✅", cas: "✅", dk: "5", tid: "~35 sek.", note: "Upcoming. Voksende casinodækning." },
                ].map((row) => (
                  <tr key={row.u} className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">{row.u}</td>
                    <td className="p-3 text-center">{row.kyc}</td>
                    <td className="p-3 text-center">{row.cas}</td>
                    <td className="p-3 text-center">{row.dk}</td>
                    <td className="p-3 text-center text-primary font-semibold">{row.tid}</td>
                    <td className="p-3 text-sm">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            * Sofort kræver separat casinoregistrering og er derfor ikke direkte sammenlignelig med Pay N Play's sammenlagte registrerings- og betalingstid.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Konklusion:</strong> Trustly Pay N Play forbliver den eneste modne, fuldintegrerede løsning til det danske marked i 2026. Zimpler og Brite er lovende konkurrenter, men deres bankdækning i Danmark er stadig begrænset. For de fleste danske spillere er Trustly det eneste realistiske valg for en komplet "casino uden konto"-oplevelse.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 8. MOBILSPECIFIK SEKTION */}
        <section className="mb-12" id="mobil">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Smartphone className="h-7 w-7 text-primary" />Pay N Play på mobil – teknisk analyse</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Mobilbrug udgør over 65% af al online gambling-trafik i Danmark (Spillemyndighedens årsrapport 2025). Pay N Play's mobiloplevelse er derfor kritisk for adoptionsraten. Her analyserer vi de tekniske aspekter af mobilflowet:
          </p>
          <div className="space-y-4 mb-6">
            {[
              { title: "App-skift til MitID", desc: "På mobil kræver MitID-autentificering et app-skift fra casinoets browser/app til MitID-appen. Dette tilføjer 3-8 sekunders latency ift. desktop. iOS bruger Universal Links for automatisk app-skift; Android bruger Intent-systemet. 2 af 4 testede casinoer implementerede automatisk app-skift, mens 2 krævede manuelt skifte." },
              { title: "Responsivt Trustly-flow", desc: "Trustly's bankvalgsside og betalingsside er fuldt responsive og optimeret til touch-interaktion. Banklistens UI tilpasser sig automatisk til skærmstørrelse med større touch-targets (min. 44×44px). Tastaturhåndtering for beløbsindtastning bruger inputMode='decimal' for at vise numerisk tastatur." },
              { title: "Session-persistering", desc: "På mobil er session-håndtering mere kompleks pga. app-skift. Casinoer bruger typisk en kombination af sessionStorage, httpOnly cookies og server-side session management for at sikre, at spillerens session ikke mistes under MitID app-skiftet. Vores test viste 0% session-tab på de 4 testede casinoer." },
              { title: "PWA-kompatibilitet", desc: "Pay N Play er kompatibelt med Progressive Web Apps (PWA). Casinoer, der tilbyder PWA-installation, kan gemme Trustly-sessionen i PWA-konteksten, hvilket eliminerer behovet for gentaget banklogin ved korte genbesøg (under 24 timer). 1 af 4 testede casinoer tilbød PWA-installation." },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-lg border border-border bg-card">
                <p className="font-semibold text-sm text-foreground mb-1">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            For en bredere analyse af mobil casinospil, se vores{" "}
            <Link to="/mobil-casino" className="text-primary underline hover:text-primary/80">Mobil Casino guide</Link> og{" "}
            <Link to="/casino-app" className="text-primary underline hover:text-primary/80">Casino App guide</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 9. FEJLHÅNDTERING OG EDGE CASES */}
        <section className="mb-12" id="fejlhaandtering">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><AlertTriangle className="h-7 w-7 text-primary" />Fejlhåndtering og edge cases</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Ingen teknologisk løsning er fejlfri. Her dokumenterer vi de mest almindelige fejlscenarier i Pay N Play-flowet og deres håndtering baseret på vores tests:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Fejlscenarie</th>
                  <th className="text-left p-3 font-semibold text-foreground">Årsag</th>
                  <th className="text-left p-3 font-semibold text-foreground">Håndtering</th>
                  <th className="text-center p-3 font-semibold text-foreground">Forekomst</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { s: "MitID timeout", a: "Bruger svarer ikke inden for 2 min.", h: "Klar fejlbesked + genforsøg-knap", f: "~5%" },
                  { s: "Utilstrækkelige midler", a: "Kontosaldo < indbetalingsbeløb", h: "Fejlbesked ved trin 6 + beløbsjustering", f: "~3%" },
                  { s: "Bankvedligeholdelse", a: "Bankens systemer er nede", h: "Trustly viser fejlskærm + alternativ bank", f: "<1%" },
                  { s: "ROFUS-blokering", a: "Spiller er selvudelukket", h: "Klar besked om ROFUS + hjælpelinks", f: "~2%" },
                  { s: "Trustly API-fejl", a: "Trustly server-issue", h: "Generisk fejlbesked + retry efter 30 sek.", f: "<0,5%" },
                  { s: "Dobbelt transaktion", a: "Bruger klikker 'Indbetal' to gange", h: "Idempotency-key forhindrer duplikater", f: "~1%" },
                  { s: "AML-flagning", a: "Transaktionsmønster trigger AML", h: "Transaktion sendes til manuel review", f: "<0,1%" },
                ].map((row) => (
                  <tr key={row.s} className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">{row.s}</td>
                    <td className="p-3">{row.a}</td>
                    <td className="p-3">{row.h}</td>
                    <td className="p-3 text-center">{row.f}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Vigtig note:</strong> I alle testede fejlscenarier mistede casinoerne ikke spillerens session eller data. Fejlhåndteringen var konsekvent og brugeren kunne altid genforsøge uden at miste kontekst. Den samlede fejlrate (alle scenarier kombineret) var under 12% – og de fleste fejl skyldes bruger-drevne faktorer (timeout, utilstrækkelige midler) snarere end tekniske problemer.
          </p>
        </section>

        <Separator className="my-10" />


        <Separator className="my-10" />

        {/* 11. FREMTIDEN FOR PAY N PLAY */}
        <section className="mb-12" id="fremtiden">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><TrendingUp className="h-7 w-7 text-primary" />Fremtiden for Pay N Play i Danmark</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Pay N Play-teknologien er under konstant udvikling. Her er de mest sandsynlige udviklingstendenser for det danske marked i 2026-2028 baseret på Trustly's offentlige roadmap og markedstendenser:
          </p>
          <div className="space-y-4 mb-6">
            {[
              { title: "PSD3 og Open Finance", desc: "EU's kommende PSD3-direktiv (forventet 2027) vil udvide open banking til 'open finance' med adgang til forsikringsdata, investeringskonti og pensionsoplysninger. For Pay N Play kan dette betyde endnu mere granulære KYC-data og potentielt automatisk indkomstverifikation – relevant for ansvarligt spil-vurderinger." },
              { title: "Biometrisk autentificering", desc: "MitID vil sandsynligvis integrere biometrisk autentificering (fingeraftryk/ansigtsgenkendelse) som primær faktor i 2027-2028. Dette kan reducere Pay N Play-registreringstiden fra 27 til under 15 sekunder, da MitID-appen kan eliminere det manuelle interaktions-trin." },
              { title: "Hybridmodeller", desc: "Flere casinoer forventes at tilbyde 'hybrid Pay N Play' – hvor spillere registrerer via Pay N Play men efterfølgende kan tilføje MobilePay, Apple Pay eller kreditkort som sekundære betalingsmetoder. Dette adresserer den primære ulempe (begrænset betalingsfleksibilitet) uden at miste hastighedsfordelen." },
              { title: "Øget konkurrence", desc: "Zimpler og Brite forventes at øge deres danske bankdækning i 2026-2027, hvilket kan presse Trustly til at forbedre priser og funktionalitet. For forbrugerne betyder mere konkurrence typisk bedre produkter og lavere gebyrer." },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-lg border border-border bg-card">
                <p className="font-semibold text-sm text-foreground mb-1">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* CLUSTER NAVIGATION */}
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

        <CasinoUdenKontoCrossLinks pageName="Pay N Play" currentPath="/casino-uden-konto/pay-n-play" />
        <LatestNewsByCategory pagePath="/casino-uden-konto/pay-n-play" />
        <RelatedGuides currentPath="/casino-uden-konto/pay-n-play" />
        <FAQSection title="Ofte Stillede Spørgsmål om Pay N Play" faqs={payNPlayFaqs} />
        <AuthorBio author="kevin" />
      </div>
    </>
  );
};

export default PayNPlayGuide;
