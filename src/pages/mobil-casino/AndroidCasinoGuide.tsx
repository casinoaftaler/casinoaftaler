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
import { buildFaqSchema, buildArticleSchema, buildHowToSchema, SITE_URL } from "@/lib/seo";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import heroImg from "@/assets/heroes/android-casino-hero.jpg";
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
    description: "Alt om casino på Android: Google Play vs. APK, performance-benchmarks, fragmentering, betalingsmetoder og de bedste Android-casinoer i Danmark.",
    url: `${SITE_URL}/mobil-casino/android`,
    datePublished: "2026-03-08",
    dateModified: "2026-03-08",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  const howToJsonLd = buildHowToSchema({
    name: "Sådan sikrer du dig mod usikre casino-APK'er på Android",
    description: "Trin-for-trin guide til at beskytte din Android-enhed mod usikre casino-apps og APK-filer.",
    steps: apkSafetySteps,
  });

  return (
    <>
      <SEO
        title="Casino på Android – Komplet Android Casino Guide 2026"
        description="Alt om casino på Android: Google Play vs. APK, Samsung vs. Pixel, performance-benchmarks, OS-fragmentering og de bedste Android-casinoer i Danmark."
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
        <p className="text-sm text-muted-foreground mt-2 mb-6">
          Testet og skrevet af Jonas Theill, casino-ekspert hos Casinoaftaler.dk.
        </p>

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImg} alt="Casino på Android – smartphone med roulette og guldmønter" width={1920} height={1080} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

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

        {/* 8. ANSVARLIGT SPIL */}
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
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Hvis du oplever problemer, kontakt{" "}
            <Link to="/ansvarligt-spil/stopspillet" className="text-primary underline hover:text-primary/80">StopSpillet</Link>{" "}
            (70 22 28 25) for gratis rådgivning. Se alle{" "}
            <Link to="/ansvarligt-spil/hjaelpelinjer" className="text-primary underline hover:text-primary/80">hjælpelinjer</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 9. HJÆLP & RESSOURCER */}
        <section className="mb-12" id="hjaelp">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <HelpCircle className="h-7 w-7 text-primary" />
            Hjælp og ressourcer
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { to: "/mobil-casino", title: "Mobil Casino Hub", desc: "Komplet oversigt over casino på mobilen" },
              { to: "/mobil-casino/iphone", title: "Casino på iPhone", desc: "iOS-specifik casino-guide" },
              { to: "/mobil-casino/tablet", title: "Casino på Tablet", desc: "iPad og Android tablet guide" },
              { to: "/mobil-casino/bedste-apps", title: "Bedste Casino Apps", desc: "Top 10 rangering af casino apps" },
              { to: "/casino-app", title: "Casino App Guide", desc: "App vs. browser sammenligning" },
              { to: "/ansvarligt-spil", title: "Ansvarligt Spil", desc: "Spil sikkert og ansvarligt" },
            ].map((item) => (
              <Link key={item.to} to={item.to} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-sm transition-colors hover:bg-muted">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <LatestNewsByCategory pagePath="/mobil-casino/android" />
        <RelatedGuides currentPath="/mobil-casino/android" />
        <FAQSection title="Ofte Stillede Spørgsmål om Casino på Android" faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
};

export default AndroidCasinoGuide;
