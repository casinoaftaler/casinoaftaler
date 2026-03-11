import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { MobilCasinoCrossLinks } from "@/components/MobilCasinoCrossLinks";
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

        {/* 7. SCORING-METODOLOGI DEEP-DIVE */}
        <section className="mb-12" id="scoring-metodologi">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><BarChart3 className="h-7 w-7 text-primary" />Scoring-metodologi: Sådan vurderer vi casino apps</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Vores vurderingsmodel er udviklet over 3 års systematisk test af danske casino-apps. Modellen bygger på kvantitative målinger og kvalitative vurderinger, vægtet efter hvad der har størst indflydelse på den daglige brugeroplevelse. Her gennemgår vi hvert kriterium i dybden.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3" id="vaegtet-formel">Den vægtede scoring-formel</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Den samlede score beregnes som et vægtet gennemsnit af de 6 kriterier. Hvert kriterium scores på en skala fra 1-10, ganges med sin vægt, og summeres til en samlet score:</p>
          <div className="rounded-xl border border-border bg-muted/30 p-6 mb-6 font-mono text-sm text-foreground">
            <p className="mb-2"><strong>Samlet Score = </strong></p>
            <p className="ml-4">(Performance × 0,25) + (Spiludvalg × 0,20) + (Brugervenlighed × 0,20)</p>
            <p className="ml-4">+ (Betalingsflow × 0,15) + (Sikkerhed × 0,10) + (App Store Rating × 0,10)</p>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3" id="performance-maaling">Performance-måling (25 %)</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Performance vægtes højest, da det direkte påvirker spilleoplevelsen. Vi måler 4 underkategorier:</p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Underkategori</th>
                  <th className="text-center p-3 font-semibold text-foreground">Måling</th>
                  <th className="text-center p-3 font-semibold text-foreground">Score 10</th>
                  <th className="text-center p-3 font-semibold text-foreground">Score 5</th>
                  <th className="text-center p-3 font-semibold text-foreground">Score 1</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cat: "First Contentful Paint", m: "Lighthouse", s10: "< 1,0 sek", s5: "2,0-3,0 sek", s1: "> 5,0 sek" },
                  { cat: "Time to Interactive", m: "Lighthouse", s10: "< 1,5 sek", s5: "3,0-4,5 sek", s1: "> 7,0 sek" },
                  { cat: "Live Casino FPS", m: "Chrome DevTools", s10: "Stabilt 60 FPS", s5: "45-55 FPS", s1: "< 30 FPS" },
                  { cat: "Crash Rate (100 sessioner)", m: "Manuel test", s10: "0 crashes", s5: "2-3 crashes", s1: "> 5 crashes" },
                ].map((r) => (
                  <tr key={r.cat} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{r.cat}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.m}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.s10}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.s5}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.s1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3" id="spiludvalg-maaling">Spiludvalg-måling (20 %)</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Vi sammenligner mobilens spilkatalog med desktop-versionen for at vurdere, hvor komplet mobiloplevelsen er. De bedste casino-apps tilbyder 95-100 % af desktop-kataloget. Vi tæller specifikt:</p>
          <div className="space-y-2 mb-6">
            {[
              "Antal tilgængelige slot-titler på mobil vs. desktop (procentdel)",
              "Antal live casino-borde (blackjack, roulette, baccarat, game shows)",
              "Antal spiludbydere repræsenteret (Evolution, NetEnt, Pragmatic Play, etc.)",
              "Tilgængelighed af eksklusive mobil-titler eller early access-spil",
              "Søge- og filtreringsfunktionalitet i spillobbyen",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-1 text-primary shrink-0" /><span className="text-sm text-muted-foreground">{t}</span></div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3" id="brugervenlighed-maaling">Brugervenlighed-måling (20 %)</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Brugervenlighed evalueres gennem en standardiseret UX-audit med 15 kontrollpunkter. Vi tester på både iPhone og Android for at sikre cross-platform konsistens. Nøgleparametre inkluderer:</p>
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            {[
              { title: "Navigation & Informationsarkitektur", desc: "Kan spilleren finde favorit-spil inden for 3 tryk? Er menuen intuitiv? Findes der en 'senest spillet' sektion?" },
              { title: "Onboarding-flow", desc: "Tid fra download til første spin. Vi måler antal trin i registreringen, KYC-processen og første indbetalingsflow." },
              { title: "Touch Target Compliance", desc: "Alle interaktive elementer skal overholde Apples 44×44 pt og Googles 48×48 dp minimumsstandarder for touch-targets." },
              { title: "Tilgængelighed (Accessibility)", desc: "Screen reader-support, dynamisk tekststørrelse, farvekontrast (WCAG 2.1 AA), og Reduce Motion-respekt." },
            ].map((c) => (
              <Card key={c.title} className="border-border bg-card">
                <CardHeader className="pb-2"><CardTitle className="text-sm">{c.title}</CardTitle></CardHeader>
                <CardContent><p className="text-xs text-muted-foreground">{c.desc}</p></CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3" id="eksempel-beregning">Eksempel: LeoVegas scoring-beregning</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">For at illustrere modellen i praksis, her er den fulde scoring for vores #1 rangerede casino app:</p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Kriterium</th>
                  <th className="text-center p-3 font-semibold text-foreground">Rå score</th>
                  <th className="text-center p-3 font-semibold text-foreground">Vægt</th>
                  <th className="text-center p-3 font-semibold text-foreground">Vægtet bidrag</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { k: "Performance", s: "9,6", v: "25 %", b: "2,40" },
                  { k: "Spiludvalg", s: "9,5", v: "20 %", b: "1,90" },
                  { k: "Brugervenlighed", s: "9,3", v: "20 %", b: "1,86" },
                  { k: "Betalingsflow", s: "9,2", v: "15 %", b: "1,38" },
                  { k: "Sikkerhed", s: "9,5", v: "10 %", b: "0,95" },
                  { k: "App Store Rating", s: "9,4", v: "10 %", b: "0,94" },
                ].map((r) => (
                  <tr key={r.k} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{r.k}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.s}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.v}</td>
                    <td className="p-3 text-center font-medium text-foreground">{r.b}</td>
                  </tr>
                ))}
                <tr className="bg-muted/50">
                  <td className="p-3 font-bold text-foreground">Samlet</td>
                  <td className="p-3 text-center text-muted-foreground">—</td>
                  <td className="p-3 text-center text-muted-foreground">100 %</td>
                  <td className="p-3 text-center font-bold text-foreground">9,43 → 9,4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 8. APP STORE REGLER OG POLITIK */}
        <section className="mb-12" id="app-store-regler">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Lock className="h-7 w-7 text-primary" />App Store regler for casino-apps</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Både Apple App Store og Google Play har strenge regler for gambling-apps. Disse regler påvirker direkte, hvilke casino-apps der er tilgængelige for danske spillere, og hvordan de fungerer. Forståelse af disse regler hjælper dig med at vurdere, hvorfor nogle casinoer tilbyder native apps og andre ikke gør.</p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card className="border-border bg-card border-l-4 border-l-primary">
              <CardHeader className="pb-2"><CardTitle className="text-base">Apple App Store Guidelines</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Sektion 5.3.4:</strong> Gambling-apps kræver en gyldig gambling-licens i alle regioner, hvor appen distribueres.</p>
                <p><strong>Geo-fencing:</strong> Casino-apps skal implementere lokationsbaseret adgangskontrol for at overholde lokale love.</p>
                <p><strong>Aldersverifikation:</strong> Apps skal markeres som 17+ og inkludere aldersverifikation ved registrering.</p>
                <p><strong>In-App Purchase:</strong> Apple tillader direkte betalingsprocessing for gambling (undtaget fra 30 %-provision).</p>
                <p><strong>Ansvarligt spil:</strong> Apps skal inkludere links til hjælperessourcer og mulighed for selvudelukkelse.</p>
                <p><strong>Review-tid:</strong> Typisk 3-7 dages review. Casino-apps gennemgår ekstra compliance-kontrol.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card border-l-4 border-l-primary">
              <CardHeader className="pb-2"><CardTitle className="text-base">Google Play Politik</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Gambling Apps Policy:</strong> Kræver gyldig licens og overholdelse af lokale love. Operatører skal ansøge om særlig tilladelse.</p>
                <p><strong>Play Integrity API:</strong> Apps må verificere, at enheden ikke er rootet eller kompromitteret.</p>
                <p><strong>Distribution:</strong> Gambling-apps må kun distribueres i lande, hvor operatøren har licens.</p>
                <p><strong>Betalinger:</strong> Google tillader tredjepartsbetalinger for gambling (ligesom Apple).</p>
                <p><strong>Ansvarligt spil:</strong> Kræver prominente links til ansvarligt spil-ressourcer.</p>
                <p><strong>APK-alternativ:</strong> Casinoer kan distribuere via egen hjemmeside (sideloading), men dette frarådes.</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">Disse strenge krav forklarer, hvorfor mange danske casinoer foretrækker PWA-tilgangen fremfor native apps. PWA'er omgår App Store-review processen, tillader hurtigere opdateringer, og eliminerer behovet for separate iOS- og Android-udviklingshold. For spilleren betyder det dog, at du går glip af den ekstra sikkerhedsgaranti, som App Store-review giver.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>EU Digital Markets Act (DMA):</strong> Fra 2024 har Apple åbnet for alternative app-butikker i EU, inklusive Danmark. Dette kan potentielt øge antallet af tilgængelige casino-apps, men de fleste operatører afventer stadig, da alternativ distribution kræver særlig "Web Distribution Entitlement" fra Apple og medfører yderligere compliance-krav.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 9. APP PERFORMANCE BENCHMARKS */}
        <section className="mb-12" id="performance-benchmarks">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Zap className="h-7 w-7 text-primary" />App-performance benchmarks: Detaljeret test</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Vi har gennemført standardiserede performance-tests på alle Top 10 casino-apps for at give dig et datadrevet grundlag for dit valg. Tests er udført på iPhone 15 Pro (iOS 17.4) og Samsung Galaxy S24+ (Android 14) over WiFi 6.</p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Casino</th>
                  <th className="text-center p-3 font-semibold text-foreground">Loadtid (iOS)</th>
                  <th className="text-center p-3 font-semibold text-foreground">Loadtid (Android)</th>
                  <th className="text-center p-3 font-semibold text-foreground">Memory (MB)</th>
                  <th className="text-center p-3 font-semibold text-foreground">Batteri/time</th>
                  <th className="text-center p-3 font-semibold text-foreground">Crash rate</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "LeoVegas", ios: "0,9 sek", and: "1,1 sek", mem: "145", bat: "8 %", crash: "0,1 %" },
                  { name: "bet365", ios: "1,1 sek", and: "1,3 sek", mem: "210", bat: "10 %", crash: "0,2 %" },
                  { name: "Unibet", ios: "1,2 sek", and: "1,5 sek", mem: "180", bat: "9 %", crash: "0,3 %" },
                  { name: "Mr Green", ios: "1,4 sek", and: "1,8 sek", mem: "120", bat: "7 %", crash: "0,2 %" },
                  { name: "Danske Spil", ios: "1,3 sek", and: "1,6 sek", mem: "155", bat: "8 %", crash: "0,3 %" },
                  { name: "Betano", ios: "1,5 sek", and: "1,9 sek", mem: "95", bat: "6 %", crash: "0,4 %" },
                  { name: "ComeOn", ios: "1,8 sek", and: "2,2 sek", mem: "85", bat: "7 %", crash: "0,5 %" },
                  { name: "Royal Casino", ios: "2,0 sek", and: "2,5 sek", mem: "90", bat: "7 %", crash: "0,6 %" },
                  { name: "Maria Casino", ios: "1,9 sek", and: "2,3 sek", mem: "110", bat: "8 %", crash: "0,4 %" },
                  { name: "SpilDanskNu", ios: "2,2 sek", and: "2,8 sek", mem: "80", bat: "6 %", crash: "0,7 %" },
                ].map((r) => (
                  <tr key={r.name} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{r.name}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.ios}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.and}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.mem}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.bat}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.crash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><Info className="h-5 w-5 text-primary" />Benchmark-analyse</h3>
            <p className="text-muted-foreground leading-relaxed mb-3"><strong>Loadtid:</strong> iOS-apps er generelt 15-25 % hurtigere end Android-ækvivalenterne, primært pga. WebKit-optimering og Apples tættere hardware-software integration. LeoVegas' native app skiller sig markant ud med sub-1-sekunds loading på iOS.</p>
            <p className="text-muted-foreground leading-relaxed mb-3"><strong>Memory:</strong> bet365 bruger mest RAM (210 MB) pga. sit enorme spilkatalog og integrerede sportsbetting. PWA-baserede løsninger (Betano, ComeOn) bruger typisk 40-60 % mindre memory end native apps, da browseren håndterer garbage collection mere effektivt.</p>
            <p className="text-muted-foreground leading-relaxed"><strong>Batteriforbrug:</strong> Gennemsnitligt 6-10 % pr. time er acceptabelt. Live casino-streaming øger forbruget med yderligere 3-5 % pr. time pga. kontinuerlig video-dekoding. Vi anbefaler at holde øje med enheder, der overskrider 12 % pr. time, da det kan indikere en dårligt optimeret app.</p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 10. PUSH-NOTIFIKATIONER STRATEGI */}
        <section className="mb-12" id="push-notifikationer">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Bell className="h-7 w-7 text-primary" />Push-notifikationer: Strategi og kontrol</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Push-notifikationer er en af de vigtigste forskelle mellem native casino-apps og browser-baserede løsninger. Korrekt konfigurerede notifikationer kan informere dig om relevante bonustilbud, mens ukontrollerede notifikationer kan friste til overforbrug. Her er alt, du skal vide om casino-notifikationer.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3" id="notifikationstyper">Typiske notifikationstyper</h3>
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            {[
              { title: "Bonusser & Tilbud", desc: "Daglige free spins, reload-bonusser, kampagner. Hyppigst – typisk 1-3 daglige.", badge: "Høj frekvens", color: "bg-destructive" },
              { title: "Kontoaktivitet", desc: "Udbetaling godkendt, verifikation påkrævet, kontobeskeder. Vigtige og sjældne.", badge: "Lav frekvens", color: "bg-primary" },
              { title: "Live Casino Events", desc: "Turnering starter, eksklusivt bord åbner, jackpot nærmer sig drop.", badge: "Medium frekvens", color: "bg-primary" },
              { title: "Ansvarligt Spil", desc: "Spillegrænse nærmer sig, sessionsvarighed-påmindelse, afkølingsperiode-besked.", badge: "Lovpligtig", color: "bg-primary" },
            ].map((n) => (
              <Card key={n.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">{n.title} <Badge className={`${n.color} text-white text-xs`}>{n.badge}</Badge></CardTitle>
                </CardHeader>
                <CardContent><p className="text-xs text-muted-foreground">{n.desc}</p></CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3" id="notifikations-kontrol">Anbefalede notifikationsindstillinger</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">For den optimale balance mellem information og kontrol anbefaler vi følgende opsætning:</p>
          <div className="space-y-3 mb-6">
            {[
              { action: "Behold aktiveret:", items: "Kontoaktivitet, ansvarligt spil-påmindelser" },
              { action: "Overvej at deaktivere:", items: "Daglige bonustilbud (hvis de frister til uplanlagt spil)" },
              { action: "iOS-specifikt:", items: "Indstillinger → Notifikationer → [Casino-app] → 'Planlagt oversigt' for at samle notifikationer" },
              { action: "Android-specifikt:", items: "Indstillinger → Notifikationer → [Casino-app] → Deaktiver individuelle kanaler (Android 8+)" },
              { action: "PWA-specifikt:", items: "Chrome → ⋮ → Indstillinger → Siteindstillinger → Notifikationer → Administrer per-site" },
            ].map((s) => (
              <div key={s.action} className="flex items-start gap-2"><Settings className="h-4 w-4 mt-1 text-primary shrink-0" /><span className="text-sm text-muted-foreground"><strong>{s.action}</strong> {s.items}</span></div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">Ifølge vores data har danske casino-apps en gennemsnitlig opt-in rate på 62 % for push-notifikationer. Spillere, der deaktiverer bonus-notifikationer men beholder kontomeddelelser, rapporterer generelt en sundere spilprofil. Se vores guide til <Link to="/ansvarligt-spil/spillegraenser" className="text-primary underline hover:text-primary/80">spillegrænser</Link> for mere om kontrol over dit spil.</p>
        </section>

        <Separator className="my-10" />

        {/* 11. OPDATERINGSCYKLUS-ANALYSE */}
        <section className="mb-12" id="opdateringscyklus">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><RefreshCw className="h-7 w-7 text-primary" />Opdateringscyklus: Hvor ofte opdateres casino apps?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Opdateringsfrekvensen er en vigtig indikator for app-kvalitet og sikkerhed. En app, der opdateres regelmæssigt, får løbende sikkerhedspatches, nye features og fejlrettelser. Vi har analyseret opdateringshistorikken for alle Top 10 casino-apps over de seneste 12 måneder:</p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Casino</th>
                  <th className="text-center p-3 font-semibold text-foreground">Opdateringer (12 mdr)</th>
                  <th className="text-center p-3 font-semibold text-foreground">Gns. interval</th>
                  <th className="text-center p-3 font-semibold text-foreground">Seneste version</th>
                  <th className="text-center p-3 font-semibold text-foreground">Changelog kvalitet</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "LeoVegas", updates: "24", interval: "~2 uger", ver: "8.14.2", log: "★★★★★" },
                  { name: "bet365", updates: "26", interval: "~2 uger", ver: "12.3.0", log: "★★★☆☆" },
                  { name: "Unibet", updates: "18", interval: "~3 uger", ver: "6.21.1", log: "★★★★☆" },
                  { name: "Mr Green", updates: "14", interval: "~3,5 uger", ver: "4.8.0", log: "★★★★☆" },
                  { name: "Danske Spil", updates: "16", interval: "~3 uger", ver: "5.12.3", log: "★★★★★" },
                ].map((r) => (
                  <tr key={r.name} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{r.name}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.updates}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.interval}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.ver}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.log}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4"><strong>Changelog kvalitet</strong> vurderer, hvor detaljeret casino-appen informerer om ændringer i hver opdatering. bet365 scorer lavt her, da de typisk blot skriver "Bug fixes and performance improvements" – uden specifik information. LeoVegas og Danske Spil scorer højest med detaljerede changelogs, der forklarer nye features, rettede fejl og sikkerhedsforbedringer.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">PWA-baserede casino-løsninger opdateres endnu hyppigere – ofte dagligt – da de ikke kræver App Store-godkendelse. Dette er en af PWA'ernes stærkeste fordele: fejl kan rettes og nye features lanceres uden at vente på Apples eller Googles review-proces.</p>
        </section>

        <Separator className="my-10" />

        {/* 12. TILGÆNGELIGHED I CASINO APPS */}
        <section className="mb-12" id="tilgaengelighed">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Eye className="h-7 w-7 text-primary" />Tilgængelighed (Accessibility) i casino apps</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Tilgængelighed i casino-apps er et ofte overset men vigtigt aspekt. Danske casinoer med <Link to="/casino-licenser" className="text-primary underline hover:text-primary/80">Spillemyndighedens licens</Link> har en forpligtelse til at sikre, at deres platforme er tilgængelige for alle spillere, inklusive dem med handicap. Vi har auditeret tilgængeligheden for alle Top 10 apps:</p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Parameter</th>
                  <th className="text-center p-3 font-semibold text-foreground">Gns. Score (Top 10)</th>
                  <th className="text-center p-3 font-semibold text-foreground">Bedst</th>
                  <th className="text-center p-3 font-semibold text-foreground">Værst</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { p: "VoiceOver/TalkBack support", avg: "6,2/10", best: "LeoVegas (8,5)", worst: "SpilDanskNu (3,0)" },
                  { p: "Dynamisk tekststørrelse", avg: "7,1/10", best: "Danske Spil (9,0)", worst: "ComeOn (4,5)" },
                  { p: "Farvekontrast (WCAG AA)", avg: "7,8/10", best: "Mr Green (9,5)", worst: "Royal Casino (5,5)" },
                  { p: "Keyboard navigation", avg: "5,5/10", best: "Unibet (7,5)", worst: "Maria Casino (3,0)" },
                  { p: "Reduce Motion-respekt", avg: "4,8/10", best: "LeoVegas (7,0)", worst: "Flere (2,0)" },
                  { p: "Alt-tekst på spilbilleder", avg: "5,0/10", best: "bet365 (7,0)", worst: "Flere (3,0)" },
                ].map((r) => (
                  <tr key={r.p} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{r.p}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.avg}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.best}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.worst}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">Den generelle tilgængelighed i casino-apps er desværre under standard sammenlignet med andre app-kategorier som bank- og e-commerce apps. Hovedudfordringerne er:</p>
          <div className="space-y-2 mb-6">
            {[
              "Slot-spil bruger primært canvas/WebGL, der er svært at gøre screen reader-kompatible",
              "Live casino-streams mangler undertekster til dealer-kommunikation",
              "Mange casino-apps respekterer ikke 'Reduce Motion'-præferencen, hvilket kan udløse vestibulære symptomer",
              "Touch-targets i spilgrids er ofte for små på mindre skærme",
              "Farveblinde spillere kan have svært ved at skelne chip-farver i live casino",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 mt-1 text-destructive shrink-0" /><span className="text-sm text-muted-foreground">{t}</span></div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">Vi opfordrer danske casinoer til at prioritere WCAG 2.1 AA-compliance i deres næste app-opdateringer. Spillere med tilgængelighedsbehov kan kontakte casinoets kundeservice for at få information om tilpassede visuelle temaer eller alternative navigationsmetoder.</p>
        </section>

        <Separator className="my-10" />

        {/* 13. SIKKERHED & PRIVACY DEEP-DIVE */}
        <section className="mb-12" id="sikkerhed-privacy">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Lock className="h-7 w-7 text-primary" />Sikkerhed og privacy: Komplet audit</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Vi har gennemført en omfattende sikkerhedsaudit af alle Top 10 casino-apps, der inkluderer netværksanalyse, permissions-review, og privacy policy-gennemgang. Her er de vigtigste resultater:</p>

          <h3 className="text-xl font-semibold mt-8 mb-3" id="kryptering">Kryptering og netværkssikkerhed</h3>
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            {[
              { title: "TLS-kryptering", desc: "Alle 10 apps bruger TLS 1.3 med HSTS (HTTP Strict Transport Security). Ingen fallback til TLS 1.2 blev observeret. Certificate pinning implementeres af 7 ud af 10 native apps – en best practice, der forhindrer man-in-the-middle angreb." },
              { title: "Data i hvile", desc: "Sensitiv data (sessions-tokens, brugerdata) krypteres med AES-256 på device. iOS-apps bruger Keychain, Android-apps bruger EncryptedSharedPreferences. Ingen af de testede apps gemmer ukrypterede passwords lokalt." },
              { title: "API-sikkerhed", desc: "Alle apps bruger OAuth 2.0 / JWT-baseret autentificering. Session timeout varierer fra 15 min (bet365) til 60 min (SpilDanskNu). Kortere timeouts er mere sikre men mindre bekvemme." },
              { title: "Biometrisk auth", desc: "8 ud af 10 apps understøtter Face ID/Touch ID (iOS) og fingeraftryk/Face Unlock (Android). De resterende 2 (ComeOn, Royal Casino) kræver manuel login ved hver session." },
            ].map((s) => (
              <Card key={s.title} className="border-border bg-card">
                <CardHeader className="pb-2"><CardTitle className="text-sm">{s.title}</CardTitle></CardHeader>
                <CardContent><p className="text-xs text-muted-foreground">{s.desc}</p></CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3" id="data-indsamling">Data-indsamling og GDPR</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Vi har analyseret App Store og Google Play privacy labels for alle Top 10 apps. Her er et overblik over, hvilke data der indsamles:</p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Datatype</th>
                  <th className="text-center p-3 font-semibold text-foreground">Indsamles af (%)</th>
                  <th className="text-center p-3 font-semibold text-foreground">Formål</th>
                  <th className="text-center p-3 font-semibold text-foreground">GDPR-grundlag</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "Kontaktinfo (email, tlf)", pct: "100 %", purpose: "Kontoverifikation", gdpr: "Kontrakt" },
                  { type: "Finansielle data", pct: "100 %", purpose: "Betalingsbehandling", gdpr: "Kontrakt + Lovkrav" },
                  { type: "Identifikation (CPR via MitID)", pct: "100 %", purpose: "KYC / Hvidvaskloven", gdpr: "Retlig forpligtelse" },
                  { type: "Brugsdata (spilhistorik)", pct: "100 %", purpose: "Ansvarligt spil + Analyse", gdpr: "Retlig forpl. + Legitim int." },
                  { type: "Enhedsdata (OS, model)", pct: "90 %", purpose: "Fejlsøgning + Optimering", gdpr: "Legitim interesse" },
                  { type: "Lokationsdata (grov)", pct: "70 %", purpose: "Geo-compliance", gdpr: "Retlig forpligtelse" },
                  { type: "Tracking (annonce-ID)", pct: "60 %", purpose: "Marketing-attribution", gdpr: "Samtykke" },
                  { type: "Diagnosticering (crash logs)", pct: "80 %", purpose: "App-stabilitet", gdpr: "Legitim interesse" },
                ].map((r) => (
                  <tr key={r.type} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{r.type}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.pct}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.purpose}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.gdpr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4"><strong>Privacy-anbefaling:</strong> Deaktiver tracking (annonce-ID) i dine enhedsindstillinger. På iOS: Indstillinger → Privatliv → Sporing → Deaktiver "Tillad apps at anmode om at spore". På Android: Indstillinger → Google → Annoncer → "Slet annonce-ID". Dette påvirker ikke casino-funktionaliteten men reducerer tredjepartsannoncering betydeligt.</p>
        </section>

        <Separator className="my-10" />

        {/* 14. FREMTIDENS CASINO APPS */}
        <section className="mb-12" id="fremtiden">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><TrendingUp className="h-7 w-7 text-primary" />Fremtidens casino apps: Trends og teknologi</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Casino-applandskabet udvikler sig hurtigt. Her er de teknologier og trends, vi forventer vil forme mobilcasino-oplevelsen de kommende 2-3 år:</p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            {[
              { title: "AI-personalisering", desc: "Machine learning-algoritmer vil tilpasse spillobby, bonustilbud og UI-layout baseret på individuel spilprofil. Nogle casinoer eksperimenterer allerede med AI-drevne 'For dig'-sektioner, der prioriterer spil baseret på din historik. Denne teknologi rejser dog privacy-spørgsmål, der kræver gennemsigtighed.", icon: Search },
              { title: "AR/VR Casino", desc: "Augmented Reality kan bringe casino-elementer ind i din fysiske omverden – forestil dig et holografisk roulette-hjul på dit sofabord. Apple Vision Pro og Meta Quest 3 har allerede casino-apps i beta. For dansk marked forventer vi AR-features i mainstream casino-apps inden 2028.", icon: Globe },
              { title: "Wearable Casino", desc: "Apple Watch og Samsung Galaxy Watch kan allerede vise kontobalancer og notifikationer. Næste trin er simple spil (scratch cards, jackpot-spin) direkte på smartwatch. Wear OS 5 og watchOS 11 giver tilstrækkelig processing power til simple WebGL-animationer.", icon: Smartphone },
              { title: "Voice Betting", desc: "Med Siri, Google Assistant og Alexa kan stemmestyrede væddemål blive mulige – 'Hey Siri, sæt 50 kr. på sort i roulette'. Regulatoriske udfordringer (verifikation, ansvarligt spil) bremser dog implementeringen. Vi forventer voice-integration for kontoforespørgsler først, dernæst simple bets.", icon: Heart },
              { title: "5G-eksklusive features", desc: "5G's lave latency (< 10 ms) muliggør real-time multiplayer casino-oplevelser, synkron slot-turneringer med tusindvis af spillere, og 4K live casino-streaming uden buffering. Se vores analyse i " , icon: Wifi },
              { title: "Blockchain & Transparens", desc: "Provably fair-teknologi baseret på blockchain kan give spillere mulighed for at verificere RNG-resultater uafhængigt. Selvom regulatorisk accept i Danmark er begrænset, eksperimenterer flere internationale operatører med hybrid-modeller.", icon: Shield },
            ].map((t) => (
              <Card key={t.title} className="border-border bg-card">
                <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><t.icon className="h-4 w-4 text-primary" />{t.title}</CardTitle></CardHeader>
                <CardContent><p className="text-xs text-muted-foreground">{t.desc}</p></CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">Den mest sandsynlige udvikling på kort sigt (2026-2027) er øget AI-personalisering og udbredelse af PWA'er som den dominerende distributionstilgang. Apple's åbning for alternative app-butikker i EU (DMA) kan også accelerere tilgængeligheden af native casino-apps. Vi holder denne guide opdateret med de seneste udviklinger.</p>
        </section>

        <Separator className="my-10" />

        {/* 15. FEJLFINDING */}
        <section className="mb-12" id="fejlfinding">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Settings className="h-7 w-7 text-primary" />Fejlfinding: Almindelige problemer med casino apps</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Her er de mest almindelige problemer, vores testhold støder på med casino-apps, og hvordan du løser dem:</p>

          <div className="space-y-4 mb-6">
            {[
              { problem: "App crasher ved login", solution: "Opdater appen til nyeste version. Ryd app-cache (Indstillinger → Apps → [Casino] → Lager → Ryd cache). Genstart telefonen. Prøv at afinstallere og geninstallere appen." },
              { problem: "Spil loader ikke (sort skærm)", solution: "Tjek internetforbindelse. Deaktiver VPN hvis aktiv. Ryd browser-cache i Chrome. Prøv at tvinge appen ned (swipe fra nyligt åbnede apps). Kontrollér at JavaScript er aktiveret i browserindstillinger." },
              { problem: "Push-notifikationer virker ikke", solution: "iOS: Indstillinger → Notifikationer → [App] → Slå til. Android: Indstillinger → Notifikationer → [App] → Aktiver. Kontrollér at batterioptimerng ikke blokerer appen (Android). For PWA'er: Slet og geninstaller PWA'en." },
              { problem: "Biometrisk login fejler", solution: "Slet gemte biometriske data i appen og tilføj fingeraftryk/Face ID igen. Kontrollér at biometri er aktiveret i enhedens indstillinger. Opdater app og operativsystem." },
              { problem: "Betalinger afvist", solution: "Kontrollér kortet/kontoen hos din bank. Sikr at MitID-appen er opdateret. Prøv en alternativ betalingsmetode. Kontakt casinoets kundeservice for kontospecifikke blokering." },
              { problem: "App bruger for meget batteri", solution: "Deaktiver baggrundsaktivitet for appen. Reducer skærmens lysstyrke. Brug WiFi i stedet for mobildata. Luk appen helt når du ikke spiller (ikke bare minimér)." },
              { problem: "Live casino hakker/buffer", solution: "Skift til WiFi fra mobildata. Reducér videokvalitet i live casino-indstillinger. Luk andre apps i baggrunden for at frigøre RAM. Genstart routeren." },
              { problem: "PWA mister data/session", solution: "Ryd ikke browser-cache mens du er logget ind. Tjek at Chrome har tilladelse til at gemme data. Deaktiver 'Automatisk sletning af data' i privacy-indstillinger." },
            ].map((f) => (
              <div key={f.problem} className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-semibold text-sm text-foreground mb-1 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-destructive shrink-0" />{f.problem}</h3>
                <p className="text-xs text-muted-foreground">{f.solution}</p>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">Hvis problemet fortsætter efter disse trin, kontakt casinoets kundeservice med følgende information: enhedsmodel, OS-version, app-version, screenshot af fejlen, og en beskrivelse af, hvad du forsøgte at gøre. De fleste casinoer tilbyder live chat-support direkte i appen.</p>
        </section>

        <Separator className="my-10" />

        {/* 16. ANSVARLIGT SPIL */}
        <section className="mb-12" id="ansvarligt-spil">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Shield className="h-7 w-7 text-primary" />Ansvarligt spil og casino apps</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Casino apps gør det nemmere end nogensinde at spille – men det øger også risikoen for overforbrug. Den konstante tilgængelighed via mobilen kræver ekstra bevidsthed om dine spillevaner. Her er vores dybdegående anbefalinger:</p>
          <div className="space-y-3 mb-6">
            {[
              "Sæt indbetalingsgrænser i appen FØR din første session – dette er lovpligtigt for danske casinoer",
              "Deaktiver push-notifikationer om bonusser, hvis de frister dig til at spille oftere end planlagt",
              "Brug iOS Skærmtid eller Android Digital Wellbeing til at sætte daglige app-grænser (fx 30 min/dag)",
              "Overvej at afinstallere appen i perioder, hvor du vil holde pause fra spil",
              "Husk at ROFUS-udelukkelse blokerer både app og browser-adgang til alle danske casinoer",
              "Brug casino-appens indbyggede sessionsur til at holde styr på din spilletid",
              "Sæt aldrig indbetalingsgrænser højere end du har råd til at tabe",
              "Spil aldrig for at indhente tab – dette er det mest destruktive spilmønster",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 mt-1 text-destructive shrink-0" /><span className="text-sm text-muted-foreground">{t}</span></div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">Kontakt <Link to="/ansvarligt-spil/stopspillet" className="text-primary underline hover:text-primary/80">StopSpillet</Link> (70 22 28 25) for gratis, anonym rådgivning. Se alle <Link to="/ansvarligt-spil/hjaelpelinjer" className="text-primary underline hover:text-primary/80">hjælpelinjer</Link>.</p>
        </section>

        <Separator className="my-10" />

        {/* 17. HJÆLP */}
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

        <MobilCasinoCrossLinks pageName="Bedste Casino Apps" currentPath="/mobil-casino/bedste-apps" />
        <LatestNewsByCategory pagePath="/mobil-casino/bedste-apps" />
        <RelatedGuides currentPath="/mobil-casino/bedste-apps" />
        <FAQSection title="Ofte Stillede Spørgsmål om Casino Apps" faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
};

export default BedsteAppsGuide;
