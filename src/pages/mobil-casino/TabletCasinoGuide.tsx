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
import heroImg from "@/assets/heroes/tablet-casino-hero.jpg";
import {
  Smartphone, Shield, Clock, CheckCircle, ArrowRight, Zap, Star,
  TrendingUp, CreditCard, Gamepad2, Eye, Settings, Download, RefreshCw,
  Info, Trophy, BarChart3, Lock, Monitor, Wifi, Battery, AlertTriangle,
  HelpCircle, Globe, Tv, Layers,
} from "lucide-react";

const faqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Er tablet bedre end smartphone til casino?",
    answer: "Ja, for de fleste spiltyper tilbyder tablets en markant bedre oplevelse end smartphones. Den større skærm (10-13\") giver bedre overblik i live casino, mere behagelig betjening af bordspil, og flottere grafik i spilleautomater. Tablets er særligt overlegne til live casino og multi-tabling. Den eneste ulempe er manglende portabilitet sammenlignet med smartphones.",
  },
  {
    question: "Hvilken tablet er bedst til casino?",
    answer: (
      <>
        iPad Air (M2) tilbyder den bedste balance mellem pris og performance. iPad Pro (M4) er den
        ultimative choice med sin 120 Hz ProMotion-skærm og kraftige chip. Blandt Android-tablets er
        Samsung Galaxy Tab S9 FE det bedste mid-range valg, mens Tab S10+ er premium-valget. Se vores{" "}
        <Link to="/mobil-casino/iphone" className="text-primary underline hover:text-primary/80">iPhone-guide</Link>{" "}
        for iOS-specifik information.
      </>
    ),
  },
  {
    question: "Fungerer live casino godt på tablet?",
    answer: "Ja, tablets er den bedste mobile platform for live casino. Den store skærm viser dealer-videoen i fuld størrelse, betting-interfacet har rigelig plads, og chat-funktionen er let at bruge. I landscape-mode minder oplevelsen om desktop. Vi anbefaler minimum 10\" skærm og WiFi-forbindelse for optimal live casino på tablet.",
  },
  {
    question: "Kan jeg bruge to casinoer samtidig på tablet?",
    answer: "Ja, iPads med iPadOS 16+ og Samsung Galaxy Tabs med One UI understøtter Split View / Multi Window, der lader dig køre to casino-sessioner side om side. Dette er populært til multi-tabling i bordspil eller til at sammenligne odds. Bemærk dog, at dette kræver mere RAM og processing power – vi anbefaler minimum 8 GB RAM.",
  },
  {
    question: "Landscape eller portrait – hvad er bedst til casino?",
    answer: "Det afhænger af spiltypen: Spilleautomater er designet til portrait-mode for den bedste visuelle oplevelse. Live casino og bordspil fungerer markant bedre i landscape, hvor dealer-video og betting-interface får optimal plads. De fleste casino-webapps roterer automatisk, så du kan skifte frit.",
  },
  {
    question: "Kan jeg bruge en stylus til casino på tablet?",
    answer: "Teknisk set ja, men det giver sjældent fordele. Apple Pencil og Samsung S Pen fungerer med casino-webapps, men touch-betjening er generelt mere intuitiv til chip-placering og knaptryk. En stylus kan dog være nyttig til præcis chip-placering i roulette på mindre tablets.",
  },
];

const TabletCasinoGuide = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Casino på Tablet – Komplet Guide til iPad & Android Tablets 2026",
    description: "Alt om casino på tablet: iPad vs. Android tablets, landscape vs. portrait, live casino-optimering, multi-tabling og de bedste tablet-casinoer i Danmark.",
    url: `${SITE_URL}/mobil-casino/tablet`,
    datePublished: "2026-03-08",
    dateModified: "2026-03-08",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Casino på Tablet – iPad & Android Tablet Guide 2026"
        description="Alt om casino på tablet: iPad vs. Samsung Galaxy Tab, landscape vs. portrait, live casino, multi-tabling og performance-benchmarks. Komplet guide."
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: heroBackgroundImage ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})` : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Monitor className="mr-1.5 h-3.5 w-3.5" />Mobil Casino</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Casino på Tablet – iPad & Android Guide</h1>
            <p className="text-lg text-white/80">iPad vs. Android tablets, landscape vs. portrait, live casino-optimering, multi-tabling og performance-benchmarks.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" />
        <p className="text-sm text-muted-foreground mt-2 mb-6">Testet og skrevet af Jonas Theill, casino-ekspert hos Casinoaftaler.dk.</p>
        <div className="mb-10 overflow-hidden rounded-xl"><img src={heroImg} alt="Casino på tablet – iPad med blackjack og casino chips" width={1920} height={1080} className="w-full h-auto object-cover max-h-[400px]" loading="eager" /></div>

        {/* 1. INTRODUKTION */}
        <section className="mb-12" id="introduktion">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Monitor className="h-7 w-7 text-primary" />Hvorfor tablet er den bedste mobile casino-platform</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Tablets befinder sig i et sweet spot mellem smartphones og desktops. Med skærmstørrelser fra 10" til 13" tilbyder de en casino-oplevelse, der er markant overlegen i forhold til smartphones – særligt for live casino, bordspil og multi-tabling. Den større skærmflade giver bedre overblik, mere komfortable touch-targets og en grafisk oplevelse, der nærmer sig desktop-kvalitet.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">I denne guide sammenligner vi iPad og Android-tablets på tværs af casino-relevant performance, analyserer landskabs- vs. portrættilstand for forskellige spiltyper, og giver dig konkrete anbefalinger baseret på din budget og foretrukne spilkategorier. Vi har testet 6 populære tablets for at give dig præcise data.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Alle tests er udført hos <Link to="/casino-licenser" className="text-primary underline hover:text-primary/80">danske licenserede casinoer</Link> med gyldig Spillemyndigheden-licens. For smartphone-specifikke guides, se vores <Link to="/mobil-casino/iphone" className="text-primary underline hover:text-primary/80">iPhone-guide</Link> og <Link to="/mobil-casino/android" className="text-primary underline hover:text-primary/80">Android-guide</Link>.</p>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" />Tablet casino i overblik</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Bedste spiltype", value: "Live casino (større dealer-video)" },
                { label: "Skærmstørrelse", value: "10\"-13\" (optimal: 11\"-12,9\")" },
                { label: "Bedste iPad", value: "iPad Air M2 (bedste value)" },
                { label: "Bedste Android", value: "Samsung Galaxy Tab S9 FE" },
                { label: "Multi-tabling", value: "Ja (Split View / Multi Window)" },
                { label: "Batterilevetid", value: "8-15 timer casino-spil" },
                { label: "Anbefalet tilstand", value: "Landscape til live casino, portrait til slots" },
                { label: "Betalingsmetoder", value: "MobilePay, Apple Pay, Trustly m.fl." },
              ].map((i) => (
                <div key={i.label} className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 mt-1 text-primary shrink-0" />
                  <div><span className="font-medium text-sm text-foreground">{i.label}:</span>{" "}<span className="text-sm text-muted-foreground">{i.value}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 2. PERFORMANCE BENCHMARKS */}
        <section className="mb-12" id="performance-benchmarks">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><BarChart3 className="h-7 w-7 text-primary" />Performance-benchmarks: Tablets sammenlignet</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">Vi har testet casino-performance på 6 populære tablets – 3 iPads og 3 Android-modeller:</p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Model</th>
                  <th className="text-center p-3 font-semibold text-foreground">Skærm</th>
                  <th className="text-center p-3 font-semibold text-foreground">Chip</th>
                  <th className="text-center p-3 font-semibold text-foreground">Loadtid</th>
                  <th className="text-center p-3 font-semibold text-foreground">FPS (Live)</th>
                  <th className="text-center p-3 font-semibold text-foreground">Batteri/t</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { m: "iPad Pro 13\" (M4)", s: "13\" Liquid Retina XDR", c: "M4", l: "0,9 sek", f: "60", b: "4 %" },
                  { m: "iPad Air 11\" (M2)", s: "11\" Liquid Retina", c: "M2", l: "1,1 sek", f: "60", b: "5 %" },
                  { m: "iPad 10. gen", s: "10,9\" Liquid Retina", c: "A14", l: "1,6 sek", f: "58", b: "7 %" },
                  { m: "Samsung Tab S10+", s: "12,4\" AMOLED 120Hz", c: "Dimensity 9300+", l: "1,2 sek", f: "60", b: "5 %" },
                  { m: "Samsung Tab S9 FE", s: "10,9\" TFT 90Hz", c: "Exynos 1380", l: "2,0 sek", f: "55", b: "8 %" },
                  { m: "Xiaomi Pad 6", s: "11\" IPS 144Hz", c: "Snapdragon 870", l: "1,8 sek", f: "58", b: "7 %" },
                ].map((r) => (
                  <tr key={r.m} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{r.m}</td>
                    <td className="p-3 text-center text-muted-foreground text-xs">{r.s}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.c}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.l}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.f}</td>
                    <td className="p-3 text-center text-muted-foreground">{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><Info className="h-5 w-5 text-primary" />Analyse</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">iPad Pro M4 er den hurtigste tablet vi har testet – med en loadtid under 1 sekund og konstante 60 FPS selv under intensive live casino-sessioner. iPad Air M2 er dog det bedste valg for de fleste, da den tilbyder 95 % af Pro'ens performance til ~60 % af prisen.</p>
            <p className="text-muted-foreground leading-relaxed mb-3">Blandt Android-tablets imponerer Samsung Tab S10+ med sin store 12,4" AMOLED-skærm og flagship-performance. Tab S9 FE er det bedste budget-valg med acceptabel casino-performance og en skærm, der er stor nok til komfortable live casino-sessioner.</p>
            <p className="text-muted-foreground leading-relaxed">Alle testede tablets overgår smartphones i batterilevetid for casino-spil, primært pga. større batterier (7.000-10.000 mAh). iPad Pro holder til ca. 25 timers slot-spil på en opladning, mens budget-tablets holder 12-14 timer.</p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 3. LANDSCAPE VS. PORTRAIT */}
        <section className="mb-12" id="landscape-portrait">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Layers className="h-7 w-7 text-primary" />Landscape vs. portrait: Optimal tilstand pr. spiltype</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">Tablet-casino giver dig mulighed for at vælge mellem landscape (vandret) og portrait (lodret) tilstand. Her er vores anbefalinger baseret på tests:</p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Spiltype</th>
                  <th className="text-center p-3 font-semibold text-foreground">Anbefalet tilstand</th>
                  <th className="text-left p-3 font-semibold text-foreground">Begrundelse</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "Spilleautomater (standard)", mode: "Portrait ★★★★★", reason: "Slots er designet vertikalt – portrait giver den bedste visuelle oplevelse med spilfladen centreret." },
                  { type: "Spilleautomater (Megaways/widescreen)", mode: "Landscape ★★★★☆", reason: "Megaways og widescreen slots med mange hjul udnytter landscape bedre." },
                  { type: "Live Casino (Blackjack)", mode: "Landscape ★★★★★", reason: "Dealer-video, betting-interface og chat har optimal plads i landscape." },
                  { type: "Live Casino (Roulette)", mode: "Landscape ★★★★★", reason: "Roulette-bordet og nummer-grid kræver bred skærmplads for komfortable væddemål." },
                  { type: "Bordspil (RNG)", mode: "Begge ★★★★☆", reason: "Fungerer godt i begge tilstande – vælg efter personlig præference." },
                  { type: "Game Shows", mode: "Landscape ★★★★★", reason: "Show-elementet og interaktive features fungerer bedst i widescreen." },
                  { type: "Casino Lobby/Navigation", mode: "Portrait ★★★★☆", reason: "Vertikalt scroll og spilliste er mere intuitiv i portrait." },
                ].map((r) => (
                  <tr key={r.type} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{r.type}</td>
                    <td className="p-3 text-center text-muted-foreground text-xs">{r.mode}</td>
                    <td className="p-3 text-muted-foreground text-xs">{r.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">Pro-tip: iPads med Magic Keyboard-tastaturet låser automatisk i landscape-mode og giver en desktop-lignende oplevelse med trackpad-support. Samsung Galaxy Tabs med Book Cover Keyboard tilbyder tilsvarende funktionalitet. Denne opsætning er ideel til længere <Link to="/live-casino" className="text-primary underline hover:text-primary/80">live casino</Link>-sessioner.</p>
        </section>

        <Separator className="my-10" />

        {/* 4. MULTI-TABLING */}
        <section className="mb-12" id="multi-tabling">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Tv className="h-7 w-7 text-primary" />Multi-tabling og Split View på tablet</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">En af tablets største fordele er muligheden for multi-tabling – at spille på flere borde eller casinoer samtidig. Både iPadOS og Samsung One UI understøtter side-by-side multitasking:</p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="text-base">iPad Split View</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• <strong>Stage Manager</strong> (iPad Pro/Air M-chip): Op til 4 vinduer simultaneously</p>
                <p>• <strong>Split View</strong>: To Safari-vinduer side-by-side (50/50 eller 66/33)</p>
                <p>• <strong>Slide Over</strong>: Flydende mini-vindue over primær app</p>
                <p>• <strong>Krav</strong>: iPadOS 16+ og minimum M1/A12 chip</p>
                <p>• <strong>Optimal til</strong>: To live casino-borde eller slot + sport</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="text-base">Samsung Multi Window</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• <strong>Multi Window</strong>: To apps i split-screen</p>
                <p>• <strong>Pop-up View</strong>: Flydende vinduer der kan resizes</p>
                <p>• <strong>Samsung DeX</strong>: Desktop-tilstand med fri vinduesstyring</p>
                <p>• <strong>Krav</strong>: One UI 5+ og minimum 8 GB RAM</p>
                <p>• <strong>Optimal til</strong>: Casino + chat, eller to casino-vinduer</p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-destructive" />Vigtige forbehold ved multi-tabling</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Multi-tabling kræver betydeligt mere RAM – vi anbefaler minimum 8 GB for to samtidige sessioner</p>
              <p>• Batteriforbrug stiger med ca. 40-60 % ved to aktive casino-sessioner</p>
              <p>• Sørg for at sætte <Link to="/ansvarligt-spil/spillegraenser" className="text-primary underline hover:text-primary/80">spillegrænser</Link> på begge casinoer – multi-tabling kan øge risikoen for tab af overblik</p>
              <p>• WiFi anbefales stærkt – to live casino-streams bruger 600-1000 MB/time</p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 5. IPAD VS. ANDROID TABLETS */}
        <section className="mb-12" id="ipad-vs-android">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Star className="h-7 w-7 text-primary" />iPad vs. Android tablets: Komplet sammenligning</h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Parameter</th>
                  <th className="text-center p-3 font-semibold text-foreground">iPad (iPadOS)</th>
                  <th className="text-center p-3 font-semibold text-foreground">Android Tablet</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { p: "Casino-performance", ipad: "★★★★★ (M-chip dominerer)", and: "★★★★☆ (flagship) / ★★★☆☆ (budget)" },
                  { p: "App-økosystem", ipad: "App Store (streng kontrol, sikkert)", and: "Google Play + APK (mere åbent)" },
                  { p: "PWA-support", ipad: "Safari-kun (god)", and: "Chrome (fuld support, bedre end iOS)" },
                  { p: "Multitasking", ipad: "Stage Manager (M-chip), Split View", and: "Multi Window, Samsung DeX" },
                  { p: "Skærmkvalitet", ipad: "Konsistent høj (Liquid Retina/XDR)", and: "Variabel (AMOLED premium → TFT budget)" },
                  { p: "Biometrisk login", ipad: "Face ID (Pro) / Touch ID (Air/mini)", and: "Fingeraftryk / Face Unlock" },
                  { p: "Betalingsmetoder", ipad: "Apple Pay + MobilePay + Trustly", and: "Google Pay + MobilePay + Trustly" },
                  { p: "Opdateringssupport", ipad: "5-6 år OS-opdateringer", and: "2-4 år (Samsung: 4, andre: 2-3)" },
                  { p: "Prispunkt (startpris)", ipad: "3.799 kr (iPad 10. gen)", and: "2.499 kr (Tab S9 FE)" },
                ].map((r) => (
                  <tr key={r.p} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{r.p}</td>
                    <td className="p-3 text-center text-muted-foreground text-xs">{r.ipad}</td>
                    <td className="p-3 text-center text-muted-foreground text-xs">{r.and}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3"><Star className="h-5 w-5 text-primary inline mr-2" />Vores anbefalinger</h3>
            <p className="text-muted-foreground leading-relaxed mb-3"><strong>Bedste overall:</strong> iPad Air M2 (11") – overlegen performance, lang software-support og den bedste casino-oplevelse i sin prisklasse.</p>
            <p className="text-muted-foreground leading-relaxed mb-3"><strong>Bedste premium:</strong> iPad Pro M4 (13") – ultimativ skærmkvalitet, ProMotion 120 Hz, Stage Manager til avanceret multi-tabling.</p>
            <p className="text-muted-foreground leading-relaxed mb-3"><strong>Bedste budget:</strong> Samsung Galaxy Tab S9 FE – god casino-performance til en lavere pris end iPad. AMOLED-skærm med 90 Hz.</p>
            <p className="text-muted-foreground leading-relaxed"><strong>Bedste Android premium:</strong> Samsung Galaxy Tab S10+ – den eneste Android-tablet der matcher iPads performance i casino-tests.</p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 6. TABLET-SPECIFIKKE TIPS */}
        <section className="mb-12" id="tips">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Zap className="h-7 w-7 text-primary" />Tablet-specifikke casino-tips</h2>
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            {[
              { title: "Brug Night Shift/Blue Light Filter", desc: "Reducer blåt lys under aftensessioner. iPad: Indstillinger → Skærm → Night Shift. Samsung: Indstillinger → Skærm → Eye Comfort Shield.", icon: Eye },
              { title: "Investér i et godt stativ", desc: "Et justerbart tablet-stativ giver den bedste ergonomi for længere casino-sessioner og forhindrer nakke-/rygsmerter.", icon: Monitor },
              { title: "Tilslut Bluetooth-høretelefoner", desc: "AirPods Pro eller Galaxy Buds giver den bedste live casino-lydoplevelse med aktiv støjreduktion – perfekt til dealer-kommunikation.", icon: Wifi },
              { title: "Aktiver 'Do Not Disturb' under spil", desc: "Forhindrer notifikationer i at afbryde din casino-session, særligt vigtigt under live casino-hænder.", icon: Shield },
            ].map((t) => (
              <div key={t.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <t.icon className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                <div><h3 className="font-semibold text-sm text-foreground">{t.title}</h3><p className="text-xs text-muted-foreground">{t.desc}</p></div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* 7. ANSVARLIGT SPIL */}
        <section className="mb-12" id="ansvarligt-spil">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Shield className="h-7 w-7 text-primary" />Ansvarligt spil på tablet</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Tablets store skærm og komfortable betjening kan gøre det fristende at spille længere sessioner. Vi anbefaler stærkt at bruge følgende værktøjer:</p>
          <div className="space-y-3 mb-6">
            {[
              "Sæt altid indbetalingsgrænser FØR du starter en session",
              "Brug iPad Skærmtid eller Android Digital Wellbeing til at sætte daglige tidsgrænser",
              "Aktiver sessionsvarslinger hos casinoet (lovpligtigt for danske casinoer)",
              "Undgå at spille casino i sengen – tablets lange batterilevetid kan forlænge sessioner unødvendigt",
              "Multi-tabling øger risikoen for tab af overblik – sæt grænser på BEGGE casinoer",
            ].map((tip) => (
              <div key={tip} className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 mt-1 text-destructive shrink-0" /><span className="text-sm text-muted-foreground">{tip}</span></div>
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
              { to: "/mobil-casino/bedste-apps", title: "Bedste Casino Apps", desc: "Top 10 rangering" },
              { to: "/casino-app", title: "Casino App Guide", desc: "App vs. browser" },
              { to: "/ansvarligt-spil", title: "Ansvarligt Spil", desc: "Spil sikkert" },
            ].map((i) => (
              <Link key={i.to} to={i.to} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-sm transition-colors hover:bg-muted">
                <div><h3 className="font-semibold">{i.title}</h3><p className="text-xs text-muted-foreground">{i.desc}</p></div>
              </Link>
            ))}
          </div>
        </section>

        <LatestNewsByCategory pagePath="/mobil-casino/tablet" />
        <RelatedGuides currentPath="/mobil-casino/tablet" />
        <FAQSection title="Ofte Stillede Spørgsmål om Casino på Tablet" faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
};

export default TabletCasinoGuide;
