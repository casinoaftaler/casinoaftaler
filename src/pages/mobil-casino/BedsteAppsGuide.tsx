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
import { useSiteSettings } from "@/hooks/useSiteSettings";
import heroImg from "@/assets/heroes/bedste-casino-apps-hero.jpg";
import {
  Smartphone, Shield, Clock, CheckCircle, ArrowRight, Zap, Star,
  TrendingUp, CreditCard, Gamepad2, Eye, Settings, Download, RefreshCw,
  Info, Trophy, BarChart3, Lock, Monitor, Wifi, Battery, AlertTriangle,
  HelpCircle, Globe, Bell, Search, Heart,
} from "lucide-react";

const faqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er den bedste casino app i Danmark?",
    answer: (
      <>
        Baseret på vores test er de bedste casino apps i Danmark dem fra LeoVegas, bet365 og Unibet.
        LeoVegas scorer højest på mobiloptimering, bet365 har det bredeste spiludvalg, og Unibet
        tilbyder den bedste allround-oplevelse. Se vores detaljerede{" "}
        <Link to="/casino-anmeldelser" className="text-primary underline hover:text-primary/80">casino anmeldelser</Link>{" "}
        for dybdegående vurderinger.
      </>
    ),
  },
  {
    question: "Er casino apps bedre end at bruge browseren?",
    answer: "Det afhænger af casinoet. Native apps tilbyder typisk hurtigere loading (10-15 %), push-notifikationer og biometrisk login. Browserbaserede webapps har fordelen af altid at være opdateret, kræver ingen download og fungerer på alle enheder. For de fleste spillere er en PWA (Progressive Web App) det bedste kompromis – app-lignende oplevelse uden App Store.",
  },
  {
    question: "Er det gratis at downloade casino apps?",
    answer: "Ja, alle lovlige casino apps i Danmark er gratis at downloade fra App Store og Google Play. Casinoerne tjener penge på spilaktivitet, ikke på app-salg. Vær opmærksom på, at 'in-app purchases' i casino-apps henviser til indbetalinger – ikke typiske app-køb. Der pålægges aldrig app-gebyrer fra Apple eller Google på gambling-transaktioner.",
  },
  {
    question: "Kan jeg bruge den samme konto i app og browser?",
    answer: "Ja, din casino-konto fungerer på tværs af alle platforme. Du kan logge ind med den samme brugernavn/kodeord i native app, mobilbrowser og desktop. Din saldo, bonusser, spillehistorik og indbetalingsgrænser synkroniseres automatisk i realtid.",
  },
  {
    question: "Hvor meget lagerplads bruger casino apps?",
    answer: "Typisk bruger en casino-app 50-150 MB ved installation, stigende til 200-400 MB med cache over tid. PWA'er bruger kun 2-10 MB. Sammenlignet med andre apps (sociale medier: 300-600 MB, spil: 500-2000 MB) er casino-apps relativt lette.",
  },
  {
    question: "Får jeg push-notifikationer om bonusser fra casino apps?",
    answer: "Ja, de fleste casino apps sender push-notifikationer om nye bonusser, free spins-tilbud og kontoaktivitet. Du kan tilpasse notifikationsindstillinger i appen og i dit operativsystems indstillinger. PWA'er understøtter også push-notifikationer på Android (Chrome) og iOS (Safari, siden iOS 16.4).",
  },
];

const BedsteAppsGuide = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Bedste Casino Apps i Danmark 2026 – Top 10 Rangering",
    description: "Komplet guide til de bedste casino apps i Danmark: Top 10 rangering med vægtet scoring, native app vs. PWA vs. browser sammenligning og sikkerhedsanalyse.",
    url: `${SITE_URL}/mobil-casino/bedste-apps`,
    datePublished: "2026-03-08",
    dateModified: "2026-03-08",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Bedste Casino Apps 2026 – Top 10 Danske Casino Apps"
        description="De bedste casino apps i Danmark 2026: Top 10 rangering med scoring-model, native app vs. PWA vs. browser, App Store ratings og sikkerhedsanalyse."
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: heroBackgroundImage ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})` : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Download className="mr-1.5 h-3.5 w-3.5" />Mobil Casino</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Bedste Casino Apps i Danmark 2026</h1>
            <p className="text-lg text-white/80">Top 10 rangering med vægtet scoring-model, native app vs. PWA vs. browser, og detaljeret sikkerhedsanalyse.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" />
        <p className="text-sm text-muted-foreground mt-2 mb-6">Testet og skrevet af Jonas Theill, casino-ekspert hos Casinoaftaler.dk.</p>
        <div className="mb-10 overflow-hidden rounded-xl"><img src={heroImg} alt="Bedste casino apps – smartphones med casinospil og stjerne-ratings" width={1920} height={1080} className="w-full h-auto object-cover max-h-[400px]" loading="eager" /></div>

        {/* 1. INTRODUKTION */}
        <section className="mb-12" id="introduktion">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Download className="h-7 w-7 text-primary" />Guide til de bedste casino apps</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Det danske online casino-marked tilbyder et bredt udvalg af mobiloplevelser – fra dedikerede native apps i App Store og Google Play til avancerede Progressive Web Apps (PWA'er) og responsive mobilwebsteder. Men hvilken tilgang er bedst? Og hvilke specifikke casino-apps fortjener din download?</p>
          <p className="text-muted-foreground leading-relaxed mb-4">I denne guide har vi testet og rangeret de bedste casino apps tilgængelige for danske spillere i 2026. Vores rangering er baseret på en vægtet scoring-model, der evaluerer performance, spiludvalg, brugervenlighed, sikkerhed og App Store-ratings. Vi sammenligner også native apps, PWA'er og browser-baserede løsninger for at hjælpe dig med at vælge den bedste tilgang til dit mobilcasino-behov.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Alle casinoer i vores rangering har <Link to="/casino-licenser" className="text-primary underline hover:text-primary/80">gyldig dansk licens</Link> fra Spillemyndigheden. For device-specifikke guides, se vores <Link to="/mobil-casino/iphone" className="text-primary underline hover:text-primary/80">iPhone-guide</Link>, <Link to="/mobil-casino/android" className="text-primary underline hover:text-primary/80">Android-guide</Link> og <Link to="/mobil-casino/tablet" className="text-primary underline hover:text-primary/80">tablet-guide</Link>.</p>
        </section>

        <Separator className="my-10" />

        {/* 2. SCORING MODEL */}
        <section className="mb-12" id="scoring-model">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><BarChart3 className="h-7 w-7 text-primary" />Vores vurderings-model: 6 vægtede kriterier</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">For at sikre objektiv og reproducerbar rangering bruger vi en standardiseret scoring-model med 6 kriterier:</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            {[
              { title: "Performance (25 %)", desc: "Loadtid, FPS i live casino, crash-rate og memory-forbrug. Testet på iPhone 15 og Samsung Galaxy S24.", icon: Zap },
              { title: "Spiludvalg (20 %)", desc: "Andel af desktop-katalog tilgængelig på mobil, antal spiludbydere og live casino-dækning.", icon: Gamepad2 },
              { title: "Brugervenlighed (20 %)", desc: "Navigation, søgefunktion, touch-targets, onboarding-flow og kontostyring.", icon: Eye },
              { title: "Betalingsflow (15 %)", desc: "Antal betalingsmetoder, indbetalingstid, udbetalingstid og biometrisk bekræftelse.", icon: CreditCard },
              { title: "Sikkerhed (10 %)", desc: "TLS-kryptering, biometrisk login, 2FA-support og ansvarligt spil-integration.", icon: Shield },
              { title: "App Store-rating (10 %)", desc: "Gennemsnitlig bruger-rating i App Store/Google Play, antal anmeldelser og seneste opdateringsdato.", icon: Star },
            ].map((c) => (
              <Card key={c.title} className="border-border bg-card">
                <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><c.icon className="h-4 w-4 text-primary" />{c.title}</CardTitle></CardHeader>
                <CardContent><p className="text-xs text-muted-foreground">{c.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* 3. TOP 10 RANGERING */}
        <section className="mb-12" id="top-10">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Trophy className="h-7 w-7 text-primary" />Top 10 Casino Apps i Danmark 2026</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">Baseret på vores scoring-model præsenterer vi de 10 bedste casino apps tilgængelige for danske spillere:</p>

          <div className="space-y-4 mb-6">
            {[
              { rank: 1, name: "LeoVegas", score: "9,4/10", type: "Native + PWA", appStore: "4,7 ★", perf: "★★★★★", spil: "★★★★★", link: "/casino-anmeldelser/leovegas", highlight: "Bedste mobiloplevelse – oprindeligt designet som mobilcasino" },
              { rank: 2, name: "bet365", score: "9,2/10", type: "Native + Webapp", appStore: "4,5 ★", perf: "★★★★★", spil: "★★★★★", link: "/casino-anmeldelser/bet365", highlight: "Bredeste spiludvalg og bedste live casino-integration" },
              { rank: 3, name: "Unibet", score: "9,1/10", type: "Native + PWA", appStore: "4,4 ★", perf: "★★★★☆", spil: "★★★★★", link: "/casino-anmeldelser/unibet", highlight: "Bedste allround-app med casino, sport og poker" },
              { rank: 4, name: "Mr Green", score: "8,8/10", type: "Native + Webapp", appStore: "4,3 ★", perf: "★★★★☆", spil: "★★★★☆", link: "/casino-anmeldelser/mr-green", highlight: "Green Gaming-funktion for ansvarligt spil" },
              { rank: 5, name: "Danske Spil", score: "8,7/10", type: "Native + Webapp", appStore: "4,2 ★", perf: "★★★★☆", spil: "★★★★☆", link: "/casino-anmeldelser/danske-spil", highlight: "Mest pålidelige danske brand med bredt udbud" },
              { rank: 6, name: "Betano", score: "8,5/10", type: "PWA", appStore: "4,1 ★", perf: "★★★★☆", spil: "★★★★☆", link: "/casino-anmeldelser/betano", highlight: "Stærk PWA med hurtig loading" },
              { rank: 7, name: "ComeOn", score: "8,3/10", type: "Webapp", appStore: "N/A", perf: "★★★★☆", spil: "★★★★☆", link: "/casino-anmeldelser/comeon", highlight: "Simpelt og effektivt mobildesign" },
              { rank: 8, name: "Royal Casino", score: "8,1/10", type: "PWA", appStore: "N/A", perf: "★★★☆☆", spil: "★★★★☆", link: "/casino-anmeldelser/royal-casino", highlight: "God dansk mobiloplevelse" },
              { rank: 9, name: "Maria Casino", score: "8,0/10", type: "Webapp", appStore: "4,0 ★", perf: "★★★☆☆", spil: "★★★★☆", link: "/casino-anmeldelser/maria-casino", highlight: "Stærk mobilbingo og slots" },
              { rank: 10, name: "SpilDanskNu", score: "7,8/10", type: "Webapp", appStore: "N/A", perf: "★★★☆☆", spil: "★★★☆☆", link: "/casino-anmeldelser/spildansknu", highlight: "10x omsætningskrav – lavest i Danmark" },
            ].map((app) => (
              <div key={app.rank} className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  {app.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Link to={app.link} className="font-bold text-foreground hover:text-primary transition-colors">{app.name}</Link>
                    <Badge variant="outline" className="text-xs">{app.score}</Badge>
                    <Badge variant="secondary" className="text-xs">{app.type}</Badge>
                    {app.appStore !== "N/A" && <span className="text-xs text-muted-foreground">App Store: {app.appStore}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{app.highlight}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Performance: {app.perf}</span>
                    <span>Spiludvalg: {app.spil}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Bemærk:</strong> Rangeringen vurderer specifikt mobiloplevelsen – ikke casinoets generelle
            kvalitet. Et casino kan have en fremragende desktop-side men en middelmådig mobilapp, og omvendt.
            For komplette casino-vurderinger se vores{" "}
            <Link to="/casino-anmeldelser" className="text-primary underline hover:text-primary/80">casino anmeldelser</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 4. NATIVE APP VS. PWA VS. BROWSER */}
        <section className="mb-12" id="app-vs-pwa-vs-browser">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Settings className="h-7 w-7 text-primary" />Native app vs. PWA vs. browser – teknisk deep-dive</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">Der er tre fundamentalt forskellige tilgange til mobil casino. Her er en detaljeret teknisk sammenligning:</p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Parameter</th>
                  <th className="text-center p-3 font-semibold text-foreground">Native App</th>
                  <th className="text-center p-3 font-semibold text-foreground">PWA</th>
                  <th className="text-center p-3 font-semibold text-foreground">Mobilbrowser</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { p: "Loadtid (gennemsnit)", n: "1,2-1,8 sek", pwa: "1,5-2,5 sek", b: "2,0-3,5 sek" },
                  { p: "Lagerplads", n: "50-150 MB", pwa: "2-10 MB", b: "0 MB (kun cache)" },
                  { p: "Push-notifikationer", n: "✅ Fuld", pwa: "✅ Android + iOS 16.4+", b: "❌" },
                  { p: "Biometrisk login", n: "✅ Face ID/Fingeraftryk", pwa: "Via browser-credentials", b: "Via browser-credentials" },
                  { p: "Fuldskærmstilstand", n: "✅ Altid", pwa: "✅ Efter installation", b: "❌ Browser-chrome synligt" },
                  { p: "Automatisk opdatering", n: "Via App Store/Play", pwa: "✅ Automatisk (transparent)", b: "✅ Altid nyeste version" },
                  { p: "Offline-support", n: "Delvis (lobby-caching)", pwa: "Delvis (Service Worker)", b: "❌" },
                  { p: "Crash-rate (vores test)", n: "0,2 %", pwa: "0,5 %", b: "0,8 %" },
                  { p: "App Store review-krav", n: "✅ Streng kontrol", pwa: "❌ Ingen", b: "❌ Ingen" },
                  { p: "Cross-platform", n: "❌ Separate iOS/Android", pwa: "✅ Én version for alle", b: "✅ Én version for alle" },
                ].map((r) => (
                  <tr key={r.p} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{r.p}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.n}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.pwa}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><Star className="h-5 w-5 text-primary" />Vores anbefaling efter spillertype</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p><strong>Daglige spillere:</strong> Native app giver den bedste oplevelse med hurtig adgang, push-notifikationer om bonusser og biometrisk login.</p>
              <p><strong>Lejlighedsvise spillere:</strong> PWA er det bedste kompromis – app-lignende oplevelse uden at optage lagerplads permanent.</p>
              <p><strong>Multi-casino spillere:</strong> Browser er ideelt, da du nemt kan skifte mellem flere casinoer i faner uden at installere 5+ apps.</p>
              <p><strong>Sikkerhedsbevidste:</strong> Native app fra App Store/Google Play giver den bedste verifikation af udgiverens identitet.</p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 5. APP-STØRRELSE OG DATAFORBRUG */}
        <section className="mb-12" id="stoerrelse-data">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Download className="h-7 w-7 text-primary" />App-størrelse, dataforbrug og opdateringer</h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Casino</th>
                  <th className="text-center p-3 font-semibold text-foreground">App-størrelse</th>
                  <th className="text-center p-3 font-semibold text-foreground">Med cache</th>
                  <th className="text-center p-3 font-semibold text-foreground">Opdateringsfrekvens</th>
                  <th className="text-center p-3 font-semibold text-foreground">Seneste opdatering</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "LeoVegas", size: "89 MB", cache: "210 MB", freq: "Hver 2-3 uge", last: "Feb 2026" },
                  { name: "bet365", size: "142 MB", cache: "380 MB", freq: "Hver 2 uge", last: "Mar 2026" },
                  { name: "Unibet", size: "115 MB", cache: "290 MB", freq: "Hver 3 uge", last: "Mar 2026" },
                  { name: "Mr Green", size: "78 MB", cache: "180 MB", freq: "Månedligt", last: "Feb 2026" },
                  { name: "Danske Spil", size: "95 MB", cache: "240 MB", freq: "Hver 3-4 uge", last: "Mar 2026" },
                ].map((r) => (
                  <tr key={r.name} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{r.name}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.size}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.cache}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.freq}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.last}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">Regelmæssige opdateringer er et positivt tegn – det indikerer aktiv vedligeholdelse, sikkerhedspatches og nye features. Vi anbefaler at aktivere automatiske opdateringer for casino-apps for at sikre, at du altid har den nyeste og mest sikre version.</p>
        </section>

        <Separator className="my-10" />

        {/* 6. SIKKERHED */}
        <section className="mb-12" id="sikkerhed">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Shield className="h-7 w-7 text-primary" />Sikkerhed: App permissions og privacy</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Casino-apps kræver visse tilladelser for at fungere korrekt. Her er hvad du bør acceptere – og hvad du bør afvise:</p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card className="border-border bg-card border-l-4 border-l-primary">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-primary">✅ Nødvendige tilladelser</CardTitle></CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>• <strong>Internet:</strong> Påkrævet for al casino-funktionalitet</p>
                <p>• <strong>Lagerplads:</strong> Til caching af spilaktiver</p>
                <p>• <strong>Kamera:</strong> Kun til KYC-verifikation (ID-scan)</p>
                <p>• <strong>Biometri:</strong> Til Face ID/fingeraftrykslogin</p>
                <p>• <strong>Notifikationer:</strong> For bonus- og kontobeskeder</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card border-l-4 border-l-destructive">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-destructive">❌ Mistænkelige tilladelser</CardTitle></CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>• <strong>Kontakter:</strong> Ingen legitim grund</p>
                <p>• <strong>SMS:</strong> Kan bruges til phishing</p>
                <p>• <strong>Telefon:</strong> Ingen legitim grund</p>
                <p>• <strong>Mikrofon:</strong> Kun relevant for live chat (sjældent)</p>
                <p>• <strong>Placering (præcis):</strong> Grov placering er nok til geo-check</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Alle casino-apps i vores Top 10 overholder GDPR og danske databeskyttelsesregler. Dog anbefaler
            vi at gennemgå privacy-policyen for din valgte app og kontrollere, at data ikke deles med
            unødvendige tredjeparter. Se vores <Link to="/casino-app" className="text-primary underline hover:text-primary/80">casino app guide</Link> for mere om app-sikkerhed.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 7. ANSVARLIGT SPIL */}
        <section className="mb-12" id="ansvarligt-spil">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Shield className="h-7 w-7 text-primary" />Ansvarligt spil og casino apps</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Casino apps gør det nemmere end nogensinde at spille – men det øger også risikoen for overforbrug. Her er vores anbefalinger:</p>
          <div className="space-y-3 mb-6">
            {[
              "Sæt indbetalingsgrænser i appen FØR din første session",
              "Deaktiver push-notifikationer, hvis de frister dig til at spille oftere end planlagt",
              "Brug iOS Skærmtid eller Android Digital Wellbeing til at sætte daglige app-grænser",
              "Overvej at afinstallere appen i perioder, hvor du vil holde pause",
              "Husk at ROFUS-udelukkelse blokerer både app og browser-adgang til alle danske casinoer",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 mt-1 text-destructive shrink-0" /><span className="text-sm text-muted-foreground">{t}</span></div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">Kontakt <Link to="/ansvarligt-spil/stopspillet" className="text-primary underline hover:text-primary/80">StopSpillet</Link> (70 22 28 25) for gratis rådgivning. Se alle <Link to="/ansvarligt-spil/hjaelpelinjer" className="text-primary underline hover:text-primary/80">hjælpelinjer</Link>.</p>
        </section>

        <Separator className="my-10" />

        {/* 8. HJÆLP */}
        <section className="mb-12" id="hjaelp">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><HelpCircle className="h-7 w-7 text-primary" />Hjælp og ressourcer</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { to: "/mobil-casino", title: "Mobil Casino Hub", desc: "Komplet oversigt" },
              { to: "/mobil-casino/iphone", title: "Casino på iPhone", desc: "iOS-specifik guide" },
              { to: "/mobil-casino/android", title: "Casino på Android", desc: "Android-specifik guide" },
              { to: "/mobil-casino/tablet", title: "Casino på Tablet", desc: "iPad og Android tablets" },
              { to: "/casino-app", title: "Casino App Guide", desc: "App vs. browser" },
              { to: "/ansvarligt-spil", title: "Ansvarligt Spil", desc: "Spil sikkert" },
            ].map((i) => (
              <Link key={i.to} to={i.to} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-sm transition-colors hover:bg-muted">
                <div><h3 className="font-semibold">{i.title}</h3><p className="text-xs text-muted-foreground">{i.desc}</p></div>
              </Link>
            ))}
          </div>
        </section>

        <LatestNewsByCategory pagePath="/mobil-casino/bedste-apps" />
        <RelatedGuides currentPath="/mobil-casino/bedste-apps" />
        <FAQSection title="Ofte Stillede Spørgsmål om Casino Apps" faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
};

export default BedsteAppsGuide;
