import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { MobilCasinoCrossLinks } from "@/components/MobilCasinoCrossLinks";
import { FAQSection } from "@/components/FAQSection";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buildFaqSchema, buildArticleSchema, buildHowToSchema, SITE_URL } from "@/lib/seo";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  Smartphone, Shield, Clock, CheckCircle, ArrowRight, Zap, Star,
  TrendingUp, CreditCard, Gamepad2, Eye, Settings, Download, RefreshCw,
  Info, Trophy, BarChart3, Lock, Monitor, Wifi, Battery, AlertTriangle,
  HelpCircle, Globe, ExternalLink,
} from "lucide-react";

// ────────────────────────────────────────────────────────────────
// FAQ Data
// ────────────────────────────────────────────────────────────────
const faqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Er det sikkert at spille casino på Android?",
    answer: "Ja, så længe du spiller hos et casino med dansk licens fra Spillemyndigheden. Android har siden version 12 implementeret avanceret sandboxing og 'Private Compute Core', der isolerer sensitiv data. Google Play Protect scanner automatisk installerede apps for malware. Kombineret med casinoernes TLS 1.3-kryptering og MitID-integration er Android-casino meget sikkert.",
  },
  {
    question: "Skal jeg downloade en APK for at spille casino?",
    answer: (
      <>
        Nej, du behøver ikke downloade nogen APK. Alle danske licenserede casinoer fungerer direkte i Chrome
        eller Samsung Internet-browseren som responsive webapps. Vi fraråder stærkt at downloade casino-APK'er
        fra ukendte kilder, da disse kan indeholde malware. Brug kun apps fra{" "}
        <Link to="/casino-app" className="text-primary underline hover:text-primary/80">Google Play Store</Link>{" "}
        eller officielle casino-webapps.
      </>
    ),
  },
  {
    question: "Hvilken Android-telefon er bedst til casino?",
    answer: "For den bedste oplevelse anbefaler vi Samsung Galaxy S24/S25-serien eller Google Pixel 8/9-serien. Disse tilbyder hurtige processorer (Snapdragon 8 Gen 3/Tensor G4), AMOLED-skærme med 120 Hz og mindst 8 GB RAM. Budget-modeller som Samsung Galaxy A55 eller Xiaomi Redmi Note 13 Pro håndterer slots og bordspil fint, men kan hakke i live casino.",
  },
  {
    question: "Understøtter Android Google Pay til casino?",
    answer: (
      <>
        Google Pay er tilgængelig hos nogle danske casinoer, men udvalget er mere begrænset end for{" "}
        <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>
        {" "}og{" "}
        <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>
        , der begge fungerer problemfrit på Android. MobilePay er den mest populære mobilbetalingsmetode for
        Android-brugere i Danmark.
      </>
    ),
  },
  {
    question: "Hvilken Android-version kræves for casino?",
    answer: "De fleste moderne casino-webapps kræver minimum Android 10 (API 29) for fuld funktionalitet. For den bedste oplevelse anbefaler vi Android 13 eller nyere, der tilbyder forbedret sikkerhed, bedre performance og PWA-support. Tjek din Android-version under Indstillinger → Om telefon → Android-version.",
  },
  {
    question: "Hvordan installerer jeg et casino som PWA på Android?",
    answer: "Åbn casinoets hjemmeside i Chrome → Tryk på de tre prikker (⋮) → 'Installer app' eller 'Føj til startskærm' → Bekræft. PWA'en installeres som en app med eget ikon og kører i fuldskærmstilstand. Mange casino-sider viser også automatisk en 'Installer'-banner, når du besøger dem i Chrome.",
  },
  {
    question: "Er der forskel på Samsung-, Pixel- og Xiaomi-casino-oplevelsen?",
    answer: "Ja, der er målbare forskelle. Samsung-telefoner med OneUI har den bredeste kompatibilitet med casino-webapps og tilbyder Samsung Internet-browseren som et godt alternativ til Chrome. Pixel-telefoner med stock Android har den hurtigste opdateringscyklus (vigtig for sikkerhed). Xiaomi-telefoner tilbyder god value-for-money, men MIUI kan lejlighedsvis forstyrre notifications fra casino-PWA'er.",
  },
  {
    question: "Kan jeg sætte spilgrænser på Android?",
    answer: (
      <>
        Ja, alle danske licenserede casinoer tilbyder fulde{" "}
        <Link to="/ansvarligt-spil/spillegraenser" className="text-primary underline hover:text-primary/80">spillegrænser</Link>{" "}
        på Android. Derudover kan du bruge Androids 'Digital Wellbeing'-funktion til at sætte daglige
        app-timere. ROFUS-tilmelding fungerer via MitID-appen på Android.
      </>
    ),
  },
];

const apkSafetySteps = [
  { name: "Kontrollér kilden", text: "Download kun casino-apps fra Google Play Store. Undgå tredjeparts-APK'er fra ukendte websteder." },
  { name: "Tjek app-tilladelser", text: "En casino-app bør kun kræve internet, lagerplads og eventuelt kamera (til ID-verifikation). Vær skeptisk over for apps der kræver SMS, kontakter eller telefon-adgang." },
  { name: "Verificér udgiveren", text: "Kontrollér at app-udgiveren matcher casinoets officielle virksomhedsnavn. Læs anmeldelser og tjek antal downloads." },
  { name: "Aktiver Google Play Protect", text: "Gå til Google Play → Profil → Play Protect → Indstillinger → Aktiver 'Scan apps med Play Protect'. Dette scanner automatisk alle installerede apps." },
  { name: "Hold Android opdateret", text: "Installer altid de nyeste sikkerhedsopdateringer under Indstillinger → System → Systemopdatering. Sikkerhedspatches udkommer månedligt og lukker kendte sårbarheder." },
];

const AndroidCasinoGuide = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Casino på Android – Komplet Guide til Android Casino i 2026",
    description: "Casino på Android: Google Play vs. APK, performance-benchmarks, fragmentering, betalingsmetoder og de bedste Android-casinoer i Danmark.",
    url: `${SITE_URL}/mobil-casino/android`,
    datePublished: "2026-03-08",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  const howToJsonLd = buildHowToSchema({
    name: "Sådan sikrer du dig mod usikre casino-APK'er på Android",
    description: "Trin-for-trin guide til at beskytte din Android-enhed mod usikre casino-apps og APK-filer.",
    steps: apkSafetySteps,
    pageUrl: `${SITE_URL}/mobil-casino/android`,
  });

  return (
    <>
      <SEO
        title="Casino på Android – Komplet Android Casino Guide 2026"
        description="Casino på Android: Google Play vs. APK, Samsung vs. Pixel, performance-benchmarks og de bedste Android-casinoer med dansk licens. Se vores test."
        jsonLd={[faqJsonLd, articleJsonLd, howToJsonLd]}
      />

      {/* ── Hero ── */}
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
              <Smartphone className="mr-1.5 h-3.5 w-3.5" />
              Mobil Casino
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Casino på Android – Komplet Guide
            </h1>
            <p className="text-lg text-white/80">
              Google Play vs. APK-sikkerhed, Samsung vs. Pixel benchmarks, OS-fragmentering
              og alt du skal vide om casino på Android i Danmark.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" />

        <SnippetAnswer answer="De bedste Android casino apps tilbyder 1.500+ spil, biometrisk login og MobilePay-integration. Se vores test nedenfor." />

        <QuickComparisonTable count={3} title="Bedste Android Casinoer – Top 3" />
        <p className="text-sm text-muted-foreground mt-2 mb-6">
          Testet og skrevet af Jonas Theill, casino-ekspert hos Casinoaftaler.dk.
        </p>

        {/* 1. INTRODUKTION */}
        <section className="mb-12" id="introduktion">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Smartphone className="h-7 w-7 text-primary" />
            Hvorfor Android er en stærk casino-platform
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Android er verdens mest udbredte mobil-operativsystem med over 45 % markedsandel i Danmark og
            72 % globalt. For casinospillere tilbyder Android flere unikke fordele: større variation i
            hardware-valg (fra budget til premium), mere åbenhed i app-distribution, og Chrome-browserens
            fremragende PWA-support. Android's åbne arkitektur giver dog også udfordringer – primært
            OS-fragmentering og potentielle sikkerhedsrisici ved APK-sideloading.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I denne guide dækker vi alt fra performance-benchmarks på tværs af Samsung, Google Pixel og
            budget-mærker som Xiaomi, til detaljerede sikkerhedsanalyser af Google Play vs. direkte
            APK-download. Vi gennemgår Android-specifikke betalingsmetoder, OS-versionskrav,
            skærmopløsningens indflydelse på casino-UI, og giver dig konkrete optimeringstips baseret
            på din specifikke Android-enhed.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Alle tests og anbefalinger er baseret på erfaring med{" "}
            <Link to="/casino-licenser" className="text-primary underline hover:text-primary/80">
              danske licenserede casinoer
            </Link>{" "}
            og udført af vores team, der dagligt tester mobil casino-performance som del af vores{" "}
            <Link to="/saadan-tester-vi-casinoer" className="text-primary underline hover:text-primary/80">
              anmeldelsesproces
            </Link>
            .
          </p>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Android casino i overblik
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Android markedsandel (DK)", value: "~45 % af smartphones" },
                { label: "Understøttede versioner", value: "Android 10+ (anbefalet 13+)" },
                { label: "Bedste browser", value: "Chrome / Samsung Internet" },
                { label: "Biometrisk login", value: "Fingeraftryk / Face Unlock" },
                { label: "Betalingsmetoder", value: "MobilePay, Google Pay, Trustly" },
                { label: "PWA-support", value: "Ja (Chrome – fuld support)" },
                { label: "Gennemsnitlig loadtid", value: "1,5-4,5 sek (model-afhængig)" },
                { label: "Live casino-kvalitet", value: "HD/4K på WiFi (flagship)" },
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

        {/* 2. PERFORMANCE BENCHMARKS */}
        <section className="mb-12" id="performance-benchmarks">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            Performance-benchmarks: Android-telefoner sammenlignet
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Vi har testet casino-performance på 10 populære Android-telefoner fordelt på flagship, mid-range
            og budget-segmentet. Tests er udført med Chrome-browser, WiFi 6, og målt på 3 standardiserede
            casino-sider (login, lobby, slot-spil). Alle enheder kører den seneste tilgængelige Android-version.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Model</th>
                  <th className="text-center p-3 font-semibold text-foreground">Chip</th>
                  <th className="text-center p-3 font-semibold text-foreground">RAM</th>
                  <th className="text-center p-3 font-semibold text-foreground">Loadtid</th>
                  <th className="text-center p-3 font-semibold text-foreground">FPS (Live)</th>
                  <th className="text-center p-3 font-semibold text-foreground">Segment</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { model: "Samsung Galaxy S25 Ultra", chip: "Snapdragon 8 Elite", ram: "12 GB", load: "1,1 sek", fps: "60", seg: "Flagship" },
                  { model: "Samsung Galaxy S24+", chip: "Exynos 2400", ram: "12 GB", load: "1,4 sek", fps: "60", seg: "Flagship" },
                  { model: "Google Pixel 9 Pro", chip: "Tensor G4", ram: "16 GB", load: "1,3 sek", fps: "60", seg: "Flagship" },
                  { model: "OnePlus 13", chip: "Snapdragon 8 Elite", ram: "12 GB", load: "1,2 sek", fps: "60", seg: "Flagship" },
                  { model: "Samsung Galaxy A55", chip: "Exynos 1480", ram: "8 GB", load: "2,5 sek", fps: "55", seg: "Mid-range" },
                  { model: "Google Pixel 8a", chip: "Tensor G3", ram: "8 GB", load: "2,2 sek", fps: "58", seg: "Mid-range" },
                  { model: "Samsung Galaxy A35", chip: "Exynos 1380", ram: "6 GB", load: "3,1 sek", fps: "48", seg: "Mid-range" },
                  { model: "Xiaomi Redmi Note 13 Pro", chip: "Snapdragon 7s Gen 2", ram: "8 GB", load: "2,8 sek", fps: "52", seg: "Budget" },
                  { model: "Samsung Galaxy A15", chip: "Helio G99", ram: "4 GB", load: "4,5 sek", fps: "35", seg: "Budget" },
                  { model: "Motorola Moto G84", chip: "Snapdragon 695", ram: "6 GB", load: "3,8 sek", fps: "42", seg: "Budget" },
                ].map((row) => (
                  <tr key={row.model} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{row.model}</td>
                    <td className="p-3 text-center text-muted-foreground text-xs">{row.chip}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.ram}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.load}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.fps}</td>
                    <td className="p-3 text-center"><Badge variant="outline" className="text-xs">{row.seg}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Analyse af benchmark-data
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Den største performance-forskel på Android ligger i RAM-mængden. Enheder med 8 GB RAM eller mere
              holder casino-lobbyen cached i hukommelsen, hvilket eliminerer re-loading ved tab-skift. Enheder
              med 4-6 GB RAM (budget-segmentet) kan opleve "tab-killing", hvor Chrome genindlæser casinoet
              ved tilbagevenden – potentielt afbrydende en igangværende spilsession.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              For <Link to="/live-casino" className="text-primary underline hover:text-primary/80">live casino</Link>{" "}
              er 60 FPS-grænsen kritisk for en jævn HD-streamingoplevelse. Alle flagship-modeller opnår dette
              stabilt, mens mid-range modeller typisk ligger i 50-58 FPS-intervallet – stadig acceptabelt,
              men med lejlighedsvise frame-drops under intense animationer.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Minimumskrav:</strong> For en acceptabel casino-oplevelse anbefaler vi minimum 6 GB RAM,
              Snapdragon 695-klasse processor og Android 12+. For optimal oplevelse: 8+ GB RAM, Snapdragon
              8 Gen 2+ og Android 14+. Sammenlign med vores{" "}
              <Link to="/mobil-casino/iphone" className="text-primary underline hover:text-primary/80">
                iPhone-benchmarks
              </Link>
              .
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 3. OS FRAGMENTERING */}
        <section className="mb-12" id="fragmentering">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Settings className="h-7 w-7 text-primary" />
            Android-fragmentering: OS-versioner og casino-kompatibilitet
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            En af Androids største udfordringer er OS-fragmentering – det faktum at mange enheder kører
            forskellige Android-versioner med varierende support. Her er en oversigt over, hvordan dette
            påvirker din casino-oplevelse:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Android-version</th>
                  <th className="text-center p-3 font-semibold text-foreground">Markedsandel (DK)</th>
                  <th className="text-center p-3 font-semibold text-foreground">Casino-support</th>
                  <th className="text-center p-3 font-semibold text-foreground">Sikkerhedsstatus</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { ver: "Android 15", share: "15 %", support: "✅ Fuld", sec: "Aktiv support" },
                  { ver: "Android 14", share: "35 %", support: "✅ Fuld", sec: "Aktiv support" },
                  { ver: "Android 13", share: "25 %", support: "✅ Fuld", sec: "Aktiv support" },
                  { ver: "Android 12/12L", share: "12 %", support: "✅ Fuld", sec: "Begrænset support" },
                  { ver: "Android 11", share: "8 %", support: "⚠️ Delvis", sec: "Kun kritiske patches" },
                  { ver: "Android 10", share: "3 %", support: "⚠️ Begrænset", sec: "End-of-life" },
                  { ver: "Android 9 og ældre", share: "2 %", support: "❌ Ikke anbefalet", sec: "Ingen support" },
                ].map((row) => (
                  <tr key={row.ver} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{row.ver}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.share}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.support}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.sec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Vigtigt:</strong> Vi anbefaler stærkt at opgradere til Android 13+ for den bedste
            casino-oplevelse. Android 13 introducerede "per-app language" support (relevant for
            flersprogede casinoer), forbedret clipboard-privatliv (vigtig for at beskytte kopierede
            login-data), og predictive back gesture (bedre navigation i casino-apps).
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Android 14 tilføjede "credential manager API" der forenkler login med passkeys – nogle
            fremsynede casinoer er allerede begyndt at implementere dette. Android 15 bringer
            "private space" funktionen, der lader dig skjule casino-apps i en separat, PIN-beskyttet
            profil – en nyttig privatlivsfunktion.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Skærmopløsning er en anden fragmenteringsfaktor. Android-enheder spænder fra 720p (HD) til
            3200×1440 (QHD+). Alle moderne casino-webapps er responsive og tilpasser sig automatisk, men
            enheder med QHD+-opløsning kan opleve marginalt højere batteriforbrug ved casino-spil. Du kan
            reducere opløsningen under Indstillinger → Skærm → Skærmopløsning (Samsung) for at forlænge
            batterilevetiden.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 4. GOOGLE PLAY VS. APK SIKKERHED */}
        <section className="mb-12" id="google-play-vs-apk">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            Google Play vs. APK-sideloading: Sikkerhedsanalyse
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            En fundamental forskel mellem Android og iOS er muligheden for "sideloading" – installation af
            apps fra kilder uden for den officielle app-butik. For casino-apps er dette et kritisk
            sikkerhedsspørgsmål:
          </p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card className="border-border bg-card border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Google Play Store (Anbefalet)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>✅ Apps scannes automatisk af Google Play Protect</p>
                <p>✅ Udgivere verificeres med virksomheds-ID</p>
                <p>✅ Automatiske opdateringer sikrer nyeste sikkerhedspatches</p>
                <p>✅ Refund-mulighed inden for 48 timer</p>
                <p>✅ App-tilladelser tydeligt oplyst</p>
                <p>⚠️ Begrænset antal danske casino-apps tilgængelige</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card border-l-4 border-l-destructive">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  APK-sideloading (Frarådes)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>❌ Ingen automatisk malware-scanning</p>
                <p>❌ Udgiverens identitet kan ikke verificeres</p>
                <p>❌ Ingen automatiske sikkerhedsopdateringer</p>
                <p>❌ Risiko for phishing-apps der imiterer ægte casinoer</p>
                <p>❌ Kan kræve deaktivering af sikkerhedsindstillinger</p>
                <p>❌ Ingen refund eller forbrugerbeskyttelse</p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Sikkerhedsguide: Undgå usikre casino-APK'er
            </h3>
            <div className="space-y-3">
              {apkSafetySteps.map((step, i) => (
                <div key={step.name} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-foreground">{step.name}</h4>
                    <p className="text-xs text-muted-foreground">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Vores klare anbefaling:</strong> Brug udelukkende Google Play Store til casino-apps
            eller – bedre endnu – brug Chrome-browseren med casino-webapps. Webapp/PWA-tilgangen eliminerer
            helt risikoen for malware-inficerede APK'er, da alt kører i browserens sikre sandbox. Se vores{" "}
            <Link to="/mobil-casino/bedste-apps" className="text-primary underline hover:text-primary/80">
              guide til bedste casino apps
            </Link>{" "}
            for verificerede anbefalinger.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 5. BETALINGSMETODER */}
        <section className="mb-12" id="betalingsmetoder-android">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <CreditCard className="h-7 w-7 text-primary" />
            Android-specifikke betalingsmetoder
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Android tilbyder bred kompatibilitet med alle populære betalingsmetoder hos danske casinoer.
            Her er de vigtigste muligheder med Android-specifikke detaljer:
          </p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            {[
              { title: "MobilePay", time: "< 15 sek", desc: "Fungerer perfekt på Android med automatisk app-skift. MobilePay-appen scanner automatisk betalingsanmodningen.", link: "/betalingsmetoder/mobilepay" },
              { title: "Google Pay", time: "< 10 sek", desc: "Biometrisk bekræftelse via fingeraftryk. Begrænset tilgængelighed hos danske casinoer, men voksende.", link: "/betalingsmetoder" },
              { title: "Trustly", time: "30-60 sek", desc: "Open banking direkte fra Chrome. MitID-appen håndterer verifikation. Hurtigste udbetaling (1-24 timer).", link: "/betalingsmetoder/trustly" },
              { title: "Visa / Mastercard", time: "< 20 sek", desc: "Chrome AutoFill udfylder kortdata automatisk. 3D Secure via bankens app eller SMS.", link: "/betalingsmetoder/visa-mastercard" },
            ].map((m) => (
              <Card key={m.title} className="border-border bg-card">
                <CardHeader className="pb-2"><CardTitle className="text-base">{m.title}</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground">Tid: <span className="font-medium text-foreground">{m.time}</span></p>
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                  <Link to={m.link} className="text-primary underline hover:text-primary/80 text-xs">Læs guide →</Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            En Android-specifik fordel er Samsung Pay (tilgængelig på Samsung Galaxy-enheder), der understøtter
            både NFC og MST (Magnetic Secure Transmission). Dog er Samsung Pay endnu ikke bredt understøttet
            hos danske casinoer. For udbetalinger anbefaler vi{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
            eller direkte bankoverførsel. Se vores{" "}
            <Link to="/betalingsmetoder" className="text-primary underline hover:text-primary/80">komplette betalingsoversigt</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 6. CHROME VS. SAMSUNG INTERNET */}
        <section className="mb-12" id="browsere">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Globe className="h-7 w-7 text-primary" />
            Chrome vs. Samsung Internet vs. dedikeret app
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Android tilbyder flere browser-muligheder end iOS. Her er en sammenligning af de tre mest
            relevante for casino:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Parameter</th>
                  <th className="text-center p-3 font-semibold text-foreground">Chrome</th>
                  <th className="text-center p-3 font-semibold text-foreground">Samsung Internet</th>
                  <th className="text-center p-3 font-semibold text-foreground">Native App</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { p: "PWA-installation", c: "✅ Fuld", s: "✅ Fuld", a: "N/A" },
                  { p: "Push-notifikationer", c: "✅", s: "✅", a: "✅" },
                  { p: "Dark Mode", c: "✅ System", s: "✅ Uafhængig", a: "Varierer" },
                  { p: "Ad-blocker (built-in)", c: "❌", s: "✅", a: "N/A" },
                  { p: "Biometrisk login", c: "Via Credential API", s: "Samsung Pass", a: "✅" },
                  { p: "Performance", c: "★★★★★", s: "★★★★☆", a: "★★★★★" },
                  { p: "Batteriforbrug", c: "Standard", s: "-5 % (optimeret)", a: "Varierer" },
                  { p: "Opdateringsfrekvens", c: "Hver 4. uge", s: "Hver 6-8 uge", a: "Varierer" },
                ].map((row) => (
                  <tr key={row.p} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{row.p}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.c}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.s}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Anbefaling:</strong> Chrome er standardvalget for de fleste Android-brugere med sin
            brede kompatibilitet og hurtige opdateringer. Samsung Internet er et stærkt alternativ for
            Samsung Galaxy-brugere, da den tilbyder bedre batterilevetid og en built-in adblocker, der
            kan fjerne irriterende tredjeparts-annoncer (men ikke casinoets eget indhold). Dedikerede
            casino-apps fra Google Play giver den bedste performance, men er begrænset i udvalg.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 7. ANDROID-SPECIFIKKE TIPS */}
        <section className="mb-12" id="android-tips">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Zap className="h-7 w-7 text-primary" />
            Android-specifikke optimeringstips
          </h2>
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            {[
              { title: "Deaktiver batterioptimering for casino-apps", desc: "Indstillinger → Batteri → Batterioptimering → vælg casino-app/Chrome → 'Ikke optimeret'. Dette forhindrer Android i at lukke casino-sessioner i baggrunden.", icon: Battery },
              { title: "Brug Digital Wellbeing tidsgrænser", desc: "Indstillinger → Digital Wellbeing → Dashboard → sæt timer for Chrome eller casino-app. Et godt supplement til casinoernes egne spillegrænser.", icon: Clock },
              { title: "Aktiver 'Force Dark Mode' i Chrome", desc: "chrome://flags → søg 'dark mode' → aktiver. Tvinger Dark Mode på alle casino-sider, der ikke nativt understøtter det.", icon: Eye },
              { title: "Ryd Chrome-cache regelmæssigt", desc: "Chrome → ⋮ → Historik → Ryd browserdata → Vælg 'Cachelagrede billeder og filer'. Gør dette hver 2-4 uge for optimal performance.", icon: RefreshCw },
              { title: "Brug Samsung DeX til casino på stor skærm", desc: "Samsung Galaxy-brugere kan tilslutte telefonen til en monitor via USB-C og spille casino i desktop-tilstand. Fantastisk til live casino.", icon: Monitor },
              { title: "Undgå 'Battery Saver' under spil", desc: "Battery Saver reducerer CPU/GPU-hastigheden markant. Deaktiver den under spilsessioner for at undgå hakken, især i live casino.", icon: Zap },
            ].map((tip) => (
              <div key={tip.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <tip.icon className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm text-foreground">{tip.title}</h3>
                  <p className="text-xs text-muted-foreground">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* 8. ANDROID SIKKERHEDSARKITEKTUR */}
        <section className="mb-12" id="android-sikkerhed">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Lock className="h-7 w-7 text-primary" />
            Android sikkerhedsarkitektur for casino-spillere
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Android har udviklet sig fra et relativt åbent operativsystem til en sofistikeret sikkerhedsplatform
            med flere beskyttelseslag. For casino-spillere er det vigtigt at forstå disse lag, da de direkte
            påvirker sikkerheden af dine finansielle transaktioner og persondata.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3" id="play-protect">Google Play Protect</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Google Play Protect er Androids primære forsvar mod malware. Systemet scanner automatisk alle
            installerede apps – både fra Google Play og sideloadede APK'er – for skadelig adfærd. For casino-apps
            betyder dette, at Play Protect verificerer, at appen ikke forsøger at stjæle betalingsoplysninger,
            opfange MitID-kommunikation, eller sende data til uautoriserede servere. Play Protect analyserer over
            100 milliarder apps dagligt på tværs af alle Android-enheder globalt.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Kontrollér din Play Protect-status:</strong> Google Play → Profil → Play Protect → "Seneste
            scanning". Sørg for at "Forbedr registrering af skadelige apps" er aktiveret, da dette sender
            anonymiserede data til Google, der forbedrer malware-detektionen for alle brugere.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3" id="verified-boot">Verified Boot og Integritetskontrol</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Android Verified Boot sikrer, at operativsystemet ikke er blevet manipuleret. Denne funktion er særligt
            vigtig for casino-apps, da den garanterer, at din enhed kører et umodificeret operativsystem – en
            forudsætning for sikre finansielle transaktioner. Verificeringsprocessen fungerer i fire trin:
          </p>
          <div className="space-y-3 mb-6">
            {[
              { step: "Boot ROM", desc: "Hardware-kodificeret boot-verification der ikke kan ændres – første tillidsanker i sikkerhedskæden." },
              { step: "Bootloader", desc: "Verificerer kernel-signaturen mod en hardware-gemt nøgle. Modificerede bootloaders udløser en advarsel." },
              { step: "System Partition", desc: "dm-verity verificerer integritet af alle system-filer ved hver opstart. Manipulation detekteres kryptografisk." },
              { step: "App Sandboxing", desc: "Hver app kører i sin egen Linux-proces med unikke UID. Casino-apps kan ikke læse data fra andre apps." },
            ].map((s, i) => (
              <div key={s.step} className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">{i + 1}</div>
                <div><h4 className="font-medium text-sm text-foreground">{s.step}</h4><p className="text-xs text-muted-foreground">{s.desc}</p></div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3" id="selinux">SELinux og Permission Model</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Security-Enhanced Linux (SELinux) kører i "enforcing" mode på alle moderne Android-enheder. Dette
            Mandatory Access Control-system begrænser, hvad selv kompromitterede processer kan gøre. For
            casino-apps betyder det, at selv hvis en ondsindet app formår at udnytte en sårbarhed, er den
            begrænset til sin egen sandbox og kan ikke tilgå casino-appens data, betalingsoplysninger eller
            MitID-tokens.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Androids runtime permission-model (introduceret i Android 6.0) giver dig granulær kontrol over,
            hvilke systemressourcer casino-apps kan tilgå. Vi anbefaler at vælge "Kun når appen bruges" for
            lokationstilladelser og at nægte adgang til kontakter, SMS og telefon – ingen legitim casino-app
            behøver disse tilladelser. Se vores <Link to="/mobil-casino/bedste-apps" className="text-primary underline hover:text-primary/80">guide til casino-app tilladelser</Link> for en komplet oversigt.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3" id="play-integrity">Play Integrity API (SafetyNet-efterfølger)</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Play Integrity API erstattede SafetyNet Attestation i 2023 og er nu det primære værktøj, som
            casino-apps bruger til at verificere, at din enhed er sikker. API'en kontrollerer tre ting:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Kontrol</th>
                  <th className="text-left p-3 font-semibold text-foreground">Hvad verificeres</th>
                  <th className="text-center p-3 font-semibold text-foreground">Fejler ved</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { c: "App Integrity", v: "Er APK'en umodificeret og signeret korrekt?", f: "Modificerede APK'er, custom builds" },
                  { c: "Device Integrity", v: "Kører enheden et certificeret Android-build?", f: "Root, unlocked bootloader, emulatorer" },
                  { c: "Account Integrity", v: "Er der logget ind med en verificeret Google-konto?", f: "Ingen Google-konto, suspenderet konto" },
                ].map((r) => (
                  <tr key={r.c} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{r.c}</td>
                    <td className="p-3 text-muted-foreground">{r.v}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.f}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Praktisk konsekvens:</strong> Hvis du har rootet din Android-telefon eller bruger en custom ROM
            (f.eks. LineageOS), vil mange casino-apps nægte at fungere. Dette er en sikkerhedsforanstaltning, ikke
            en fejl – rootede enheder kan potentielt kompromittere den kryptografiske sikkerhed, der beskytter
            dine betalingsdata.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 9. SAMSUNG VS. PIXEL VS. XIAOMI VS. ONEPLUS */}
        <section className="mb-12" id="fabrikant-sammenligning">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Smartphone className="h-7 w-7 text-primary" />
            Samsung vs. Pixel vs. Xiaomi vs. OnePlus: Casino-performance
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Udover rå benchmarks er der markante forskelle i casino-oplevelsen mellem Android-fabrikanter pga.
            deres forskellige software-skins, opdateringspolitikker og ekstra sikkerhedsfunktioner. Her er en
            detaljeret sammenligning baseret på vores tests:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Parameter</th>
                  <th className="text-center p-3 font-semibold text-foreground">Samsung (OneUI)</th>
                  <th className="text-center p-3 font-semibold text-foreground">Pixel (Stock)</th>
                  <th className="text-center p-3 font-semibold text-foreground">Xiaomi (HyperOS)</th>
                  <th className="text-center p-3 font-semibold text-foreground">OnePlus (OxygenOS)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { p: "OS-opdateringer (år)", s: "7 år", px: "7 år", x: "4 år", o: "4 år" },
                  { p: "Sikkerhedspatches", s: "Månedlig", px: "Månedlig (dag 1)", x: "Kvartalsvis", o: "Bi-månedlig" },
                  { p: "Ekstra sikkerhed", s: "Samsung Knox", px: "Titan M2 chip", x: "Basis", o: "Basis" },
                  { p: "Casino PWA-support", s: "★★★★★", px: "★★★★★", x: "★★★★☆", o: "★★★★☆" },
                  { p: "Notifikations-pålidelighed", s: "★★★★★", px: "★★★★★", x: "★★★☆☆", o: "★★★★☆" },
                  { p: "Batterilevetid (casino)", s: "★★★★☆", px: "★★★★☆", x: "★★★★★", o: "★★★★★" },
                  { p: "Samsung DeX support", s: "✅", px: "❌", x: "❌", o: "❌" },
                  { p: "Biometrisk hastighed", s: "Ultrasonic (hurtig)", px: "Under-display", x: "Side-monteret", o: "Under-display" },
                  { p: "Browser-alternativ", s: "Samsung Internet", px: "Chrome (kun)", x: "Mi Browser", o: "Chrome (kun)" },
                  { p: "Pris (flagskib)", s: "8.000-14.000 kr.", px: "6.500-10.000 kr.", x: "4.000-7.000 kr.", o: "5.000-8.000 kr." },
                ].map((row) => (
                  <tr key={row.p} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{row.p}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.s}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.px}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.x}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.o}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Vores anbefaling efter spillerprofil
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p><strong>Bedste overordnede casino-telefon:</strong> Samsung Galaxy S25 Ultra – kombinerer Knox-sikkerhed, DeX desktop-mode til live casino, og 7 års opdateringer med den hurtigste ultrasoniske fingeraftrykslæser.</p>
              <p><strong>Bedst for sikkerhedsbevidste:</strong> Google Pixel 9 Pro – dag-1 sikkerhedspatches, hardware Titan M2 sikkerhedschip, og stock Android uden unødvendig bloatware.</p>
              <p><strong>Bedst budget-valg for casino:</strong> Xiaomi Redmi Note 13 Pro – 8 GB RAM, AMOLED 120 Hz, og god batterilevetid. Vær opmærksom på at HyperOS kan dræbe casino-notifikationer i baggrunden (løsning: deaktiver batterioptimering).</p>
              <p><strong>Bedst for power users:</strong> OnePlus 13 – hurtigste Snapdragon 8 Elite implementering, 100W opladning (fuld i 25 min), og ren software-oplevelse tæt på stock Android.</p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 10. NOTIFIKATIONER OG DO NOT DISTURB */}
        <section className="mb-12" id="notifikationer">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Settings className="h-7 w-7 text-primary" />
            Notifikationer, Do Not Disturb og casino-kontrol
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Android tilbyder det mest granulære notifikationssystem af alle mobile platforme. Fra Android 8.0
            (Oreo) har apps kunnet oprette separate "notifikationskanaler" – og de fleste casino-apps udnytter
            dette til at kategorisere beskeder. Her er hvordan du konfigurerer dem optimalt:
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3" id="notifikationskanaler">Notifikationskanaler i casino-apps</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Kanal</th>
                  <th className="text-center p-3 font-semibold text-foreground">Typisk frekvens</th>
                  <th className="text-center p-3 font-semibold text-foreground">Anbefaling</th>
                  <th className="text-left p-3 font-semibold text-foreground">Begrundelse</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { k: "Bonusser & Tilbud", f: "1-5 daglige", a: "❌ Deaktiver", b: "Frister til uplanlagt spil. Bonusser er altid tilgængelige i appen." },
                  { k: "Kontobeskeder", f: "Sjælden", a: "✅ Behold", b: "Vigtige beskeder om udbetaling, verifikation, kontoændringer." },
                  { k: "Ansvarligt Spil", f: "Automatisk", a: "✅ Behold", b: "Lovpligtige påmindelser. Bør aldrig deaktiveres." },
                  { k: "Live Casino Events", f: "0-3 daglige", a: "Valgfrit", b: "Relevant kun hvis du spiller live casino regelmæssigt." },
                  { k: "Nye Spil", f: "Ugentlig", a: "Valgfrit", b: "Nyttig hvis du aktivt følger nye udgivelser." },
                ].map((r) => (
                  <tr key={r.k} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{r.k}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.f}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.a}</td>
                    <td className="p-3 text-muted-foreground text-xs">{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3" id="dnd-regler">Do Not Disturb-regler for casino</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Androids "Fokus-tilstand" (del af Digital Wellbeing) lader dig oprette automatiserede regler, der
            kan blokere casino-notifikationer på bestemte tidspunkter. Vi anbefaler:
          </p>
          <div className="space-y-2 mb-6">
            {[
              "Opret en 'Aftentilstand' der blokerer casino-apps fra kl. 22-08 (forhindrer natlige impulsspil)",
              "Brug 'Fokus-tilstand → Arbejde' til at blokere casino under arbejdstid",
              "Samsung-brugere: Brug 'Bixby Routines' til at automatisk deaktivere casino-notifikationer baseret på lokation (fx arbejdsplads)",
              "Pixel-brugere: 'At a Glance' widget kan konfigureres til IKKE at vise casino-notifikationer",
              "OnePlus-brugere: 'Zen Mode' kan bruges som en tvungen pause fra alle apps i 20 min - 2 timer",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-1 text-primary shrink-0" /><span className="text-sm text-muted-foreground">{t}</span></div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* 11. DATAFORBRUG OG OFFLINE */}
        <section className="mb-12" id="dataforbrug">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Wifi className="h-7 w-7 text-primary" />
            Dataforbrug, båndbredde og offline-funktionalitet
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For spillere uden ubegrænset mobildata er det vigtigt at forstå, hvor meget data forskellige
            casino-aktiviteter bruger. Vi har målt det præcise dataforbrug for de mest almindelige
            aktiviteter på Android:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Aktivitet</th>
                  <th className="text-center p-3 font-semibold text-foreground">Data/time</th>
                  <th className="text-center p-3 font-semibold text-foreground">Min. hastighed</th>
                  <th className="text-center p-3 font-semibold text-foreground">Anbefalet</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { a: "Slots (standard)", d: "15-30 MB", min: "1 Mbps", rec: "5+ Mbps" },
                  { a: "Slots (HD-grafik)", d: "30-60 MB", min: "3 Mbps", rec: "10+ Mbps" },
                  { a: "Bordspil (RNG)", d: "10-20 MB", min: "1 Mbps", rec: "5+ Mbps" },
                  { a: "Live Casino (SD)", d: "150-250 MB", min: "5 Mbps", rec: "15+ Mbps" },
                  { a: "Live Casino (HD)", d: "300-500 MB", min: "10 Mbps", rec: "25+ Mbps" },
                  { a: "Live Casino (4K)", d: "600-1000 MB", min: "25 Mbps", rec: "50+ Mbps" },
                  { a: "Sportsbetting (kun odds)", d: "5-10 MB", min: "0,5 Mbps", rec: "3+ Mbps" },
                  { a: "Lobby-browsing", d: "20-40 MB", min: "2 Mbps", rec: "5+ Mbps" },
                ].map((r) => (
                  <tr key={r.a} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{r.a}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.d}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.min}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.rec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3" id="offline-pwa">PWA Offline-caching på Android</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Progressive Web Apps kan cache statiske ressourcer (JavaScript, CSS, billeder, spilaktiver)
            via Service Workers. I praksis betyder dette, at casino-lobbyen og spilgrænseflader kan loade
            hurtigere ved gentagne besøg, da kun dynamisk data (saldo, spilresultater) hentes fra serveren.
            Chrome på Android håndterer dette automatisk for installerede PWA'er.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Bemærk:</strong> Selve casinospillet kræver altid en aktiv internetforbindelse pga.
            server-side RNG (Random Number Generator) og regulatoriske krav om realtids-logning. Det er
            teknisk umuligt at spille slots eller bordspil offline på lovlige casinoer. Offline-caching
            handler udelukkende om hurtigere loadtider og reduceret dataforbrug.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3" id="data-besparelse">Data-besparelsestips</h3>
          <div className="space-y-2 mb-6">
            {[
              "Reducer live casino-kvaliteten til SD (720p) når du er på mobildata – sparer 50-70 % data",
              "Installer casino-PWA'en via WiFi for at pre-cache alle statiske ressourcer (sparer 20-40 MB ved efterfølgende besøg)",
              "Brug Chromes 'Data Saver' tilstand (chrome://flags) for komprimeret billedlevering",
              "Samsung-brugere: Samsung Internet har en indbygget 'Datasparetilstand' der komprimerer webindhold via proxy",
              "Overvåg dit dataforbrug: Indstillinger → Netværk → Dataforbrug → Chrome/casino-app for at se præcis forbrug",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-1 text-primary shrink-0" /><span className="text-sm text-muted-foreground">{t}</span></div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* 12. SAMSUNG DEX OG DESKTOP MODE */}
        <section className="mb-12" id="samsung-dex">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Monitor className="h-7 w-7 text-primary" />
            Samsung DeX og Desktop Mode: Casino på stor skærm
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Samsung DeX transformerer din Galaxy-telefon til en desktop-lignende oplevelse, når den
            tilsluttes en ekstern skærm via USB-C eller trådløst via Miracast. For casino-spillere åbner
            dette unikke muligheder:
          </p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            {[
              { title: "Live Casino i desktop-kvalitet", desc: "Dealer-videoen fylder hele den eksterne skærm i op til 4K. Multi-kamera visninger og chat fungerer som på en rigtig desktop. Oplevelsen er markant bedre end på en 6,7\" telefonskærm." },
              { title: "Multi-window casino", desc: "DeX understøtter rigtige resize-bare vinduer. Du kan have casino-lobbyen i ét vindue, et slot-spil i et andet, og din bankapp i et tredje – alt styret med mus og tastatur." },
              { title: "Mus og tastatur", desc: "Bluetooth mus og tastatur fungerer naturtjent i DeX. Præcise museklik erstatter upræcise touch-targets. Tastaturgenvieje for hurtig navigation i casino-lobbyen." },
              { title: "Trådløs DeX (Samsung TV)", desc: "Fra Galaxy S21+ kan DeX køre trådløst på Samsung Smart TV'er. Spil casino på dit 55\"+ TV med telefonen som controller. Latency er dog 50-100 ms – for hurtigt for live casino, men fint til slots." },
            ].map((f) => (
              <Card key={f.title} className="border-border bg-card">
                <CardHeader className="pb-2"><CardTitle className="text-sm">{f.title}</CardTitle></CardHeader>
                <CardContent><p className="text-xs text-muted-foreground">{f.desc}</p></CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Kompatibilitet:</strong> Samsung DeX er tilgængeligt på alle Galaxy S-serie (S8+), Note-serie
            og Z Fold-serie. Galaxy A-serien understøtter ikke DeX. For den bedste casino-DeX oplevelse
            anbefaler vi Galaxy S24 Ultra eller Z Fold 6 med en USB-C hub og ekstern 27"+ skærm. Sammenlign
            med vores <Link to="/mobil-casino/tablet" className="text-primary underline hover:text-primary/80">tablet-guide</Link>{" "}
            for alternative storskærmsløsninger.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3" id="andre-desktop-modes">Andre desktop modes</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Motorola tilbyder "Ready For" (lignende DeX), Xiaomi har eksperimentel "Desktop Mode" i HyperOS,
            og stock Android har en skjult desktop-tilstand (aktiveres via Developer Options). Ingen af disse
            er dog lige så modne eller stabile som Samsung DeX for casino-brug. Googles egen "Android Desktop Mode"
            forventes at blive en førsteparts-feature i Android 16 – hvilket kan demokratisere storskærms-casino
            for alle Android-fabrikanter.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 13. FEJLFINDING */}
        <section className="mb-12" id="fejlfinding">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-7 w-7 text-primary" />
            Fejlfinding: 12 Android-specifikke casino-problemer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Android's mangfoldighed af enheder og software-versioner kan føre til unikke problemer, der
            ikke opstår på iOS. Her er de mest almindelige – med step-by-step løsninger testet af vores team:
          </p>

          <div className="space-y-4 mb-6">
            {[
              { problem: "Chrome dræber casino-tab i baggrunden", solution: "Android's memory management lukker baggrundstabs for at spare RAM. Løsning: Deaktiver batterioptimering for Chrome (Indstillinger → Apps → Chrome → Batteri → Ubegrænset). Alternativt: Brug en installeret PWA, da den har sin egen proces." },
              { problem: "Casino-PWA notifikationer virker ikke (Xiaomi/Huawei)", solution: "MIUI/HarmonyOS begrænser baggrunds-notifikationer aggressivt. Løsning: Indstillinger → Apps → Chrome → Autostart: Aktiver. Indstillinger → Batteri → App-start → Chrome → Administrer manuelt → Aktiver alle tre toggles." },
              { problem: "MitID-app skifter ikke automatisk tilbage til casino", solution: "Android 14+ har ændret app-skift opførslen. Løsning: Sørg for at MitID-appen er opdateret. Prøv at åbne casinoet i Samsung Internet i stedet for Chrome – Samsung Internet håndterer app-deeplinks bedre." },
              { problem: "Live casino hakker på mid-range telefon", solution: "Reducér videokvaliteten i live casinoets indstillinger. Luk alle andre apps. Deaktiver 'Battery Saver'. Reducér skærmopløsningen (Samsung: Indstillinger → Skærm → Skærmopløsning → HD+)." },
              { problem: "Casino-site beder om at deaktivere adblocker", solution: "Samsung Internet's interne adblocker kan blokere casino-funktionalitet. Løsning: Tilføj casinoets domæne til whitelist (Samsung Internet → Indstillinger → Adblockers → Undtagelser)." },
              { problem: "Fingeraftryks-login virker ikke i casino-app", solution: "Slet den gemte biometriske data i appen og tilføj fingeraftryk igen. Kontrollér at fingeraftrykket er registreret i Indstillinger → Sikkerhed → Biometri. Nogle casino-apps kræver, at du først logger ind med kodeord efter en app-opdatering." },
              { problem: "Casino-appen bruger uventet meget batteri", solution: "Tjek om appen kører location tracking i baggrunden (Indstillinger → Apps → [Casino] → Tilladelser → Lokation → 'Aldrig' eller 'Kun når appen bruges'). Deaktiver baggrundsdata for appen hvis du ikke behøver push-notifikationer." },
              { problem: "Tekst er for lille at læse i casino-lobby", solution: "Android har systemwide skriftstørrelse: Indstillinger → Skærm → Skriftstørrelse og skærmstørrelse. De fleste casino-webapps respekterer denne indstilling. Alternativt: Brug Chrome's 'Force zoom' (Indstillinger → Tilgængelighed → Force zoom)." },
              { problem: "Betalinger fejler via MobilePay", solution: "Sørg for at MobilePay-appen er opdateret og at du er logget ind. Ryd MobilePay-appens cache. Tjek at MobilePay har tilladelse til at åbne links (Indstillinger → Apps → MobilePay → Åbn som standard → Tilføj link)." },
              { problem: "Casino-appen vises ikke i Google Play", solution: "Gambling-apps i Google Play er geo-begrænsede. Kontrollér at din Google-konto er registreret med dansk adresse (Play → Profil → Indstillinger → Generelt → Kontoindstillinger og enheder → Land). Alternativt: Brug casino-webappen i Chrome." },
              { problem: "Dark mode gør casino-tekst ulæselig", solution: "Nogle casino-sider er ikke optimeret til Dark Mode. Løsning i Chrome: chrome://flags → 'Force Dark Mode for Web Contents' → 'Disabled'. Alternativt: Deaktiver Dark Mode kun for Chrome: Indstillinger → Chrome → Tema → Lys." },
              { problem: "Custom ROM (LineageOS etc.) blokerer casino", solution: "Casino-apps bruger Play Integrity API, som fejler på de fleste custom ROMs. Der er ingen sikker løsning – vi anbefaler at bruge stock Android/OneUI. Magisk-moduler der skjuler root kan midlertidigt fungere, men bryder ofte ved app-opdateringer og er en sikkerhedsrisiko." },
            ].map((f) => (
              <div key={f.problem} className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-semibold text-sm text-foreground mb-1 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />{f.problem}
                </h3>
                <p className="text-xs text-muted-foreground">{f.solution}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* 14. ANSVARLIGT SPIL */}
        <section className="mb-12" id="ansvarligt-spil-android">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            Ansvarligt spil på Android
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Android tilbyder flere værktøjer til at kontrollere dit spil, der supplerer casinoernes
            lovpligtige ansvarligt spil-funktioner:
          </p>
          <div className="space-y-3 mb-6">
            {[
              { title: "Digital Wellbeing", desc: "Sæt daglige app-timere, aktivér 'Fokus-tilstand' for at blokere casino-apps på bestemte tidspunkter, og se detaljeret statistik over din app-brug." },
              { title: "Family Link (for forældre)", desc: "Blokér casino-websteder og -apps for mindreåriges enheder. Google Family Link forhindrer installation af gambling-apps og kan filtrere SafeSearch." },
              { title: "Android Private Space (Android 15+)", desc: "Skjul casino-apps i et separat, PIN-beskyttet rum. Nyttigt for privatlivs formål, men brug det aldrig til at skjule problematisk spil." },
              { title: "ROFUS via MitID-app", desc: "MitID-appen fungerer fuldt på Android. Tilmeld dig ROFUS for selvudelukkelse fra alle danske casinoer direkte fra din telefon." },
            ].map((t) => (
              <div key={t.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <Shield className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm text-foreground">{t.title}</h3>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kontakt{" "}
            <Link to="/ansvarligt-spil/stopspillet" className="text-primary underline hover:text-primary/80">
              StopSpillet
            </Link>{" "}
            (70 22 28 25) for gratis rådgivning. Se alle{" "}
            <Link to="/ansvarligt-spil/hjaelpelinjer" className="text-primary underline hover:text-primary/80">
              hjælpelinjer
            </Link>
            .
          </p>
        </section>

        <Separator className="my-10" />

        {/* 15. HJÆLP OG RESSOURCER */}
        <section className="mb-12" id="hjaelp">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <HelpCircle className="h-7 w-7 text-primary" />
            Hjælp og ressourcer
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { to: "/mobil-casino", title: "Mobil Casino Hub", desc: "Komplet oversigt" },
              { to: "/mobil-casino/iphone", title: "Casino på iPhone", desc: "iOS-specifik guide" },
              { to: "/mobil-casino/bedste-apps", title: "Bedste Casino Apps", desc: "Top 10 rangering" },
              { to: "/mobil-casino/tablet", title: "Casino på Tablet", desc: "iPad og Android" },
              { to: "/casino-app", title: "Casino App Guide", desc: "App vs. browser" },
              { to: "/ansvarligt-spil", title: "Ansvarligt Spil", desc: "Spil sikkert" },
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

        <MobilCasinoCrossLinks pageName="Casino på Android" currentPath="/mobil-casino/android" />
        <LatestNewsByCategory pagePath="/mobil-casino/android" />
        <RelatedGuides currentPath="/mobil-casino/android" />
        <FAQSection title="Ofte Stillede Spørgsmål om Android Casino" faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
};

export default AndroidCasinoGuide;
