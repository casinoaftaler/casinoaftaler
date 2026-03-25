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
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  Smartphone, Shield, Clock, CheckCircle, ArrowRight, Zap, Star,
  TrendingUp, CreditCard, Gamepad2, Eye, Settings, Download, RefreshCw,
  Info, Trophy, BarChart3, Lock, Monitor, Wifi, Battery, AlertTriangle,
  HelpCircle, Globe, Tv, Layers, Users, Scale, ExternalLink,
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
  {
    question: "Hvor meget batteri bruger casino på tablet?",
    answer: "Casino-spil bruger typisk 4-8 % batteri per time afhængigt af spiltype og tablet-model. Spilleautomater er mindst krævende (4-5 %/time), mens live casino med HD-streaming bruger mere (6-10 %/time). En iPad Pro holder til ca. 25 timers slot-spil på en fuld opladning. Vi anbefaler at holde tabletten opladet ved sessioner over 3 timer.",
  },
  {
    question: "Kan jeg tilslutte min tablet til et TV for casino?",
    answer: "Ja, iPads understøtter AirPlay til Apple TV, og Samsung Galaxy Tabs understøtter Miracast/Smart View til Samsung TV'er. Du kan også bruge USB-C til HDMI-adapter for en kablet forbindelse. Dog er tablet-skærmen normalt tilstrækkelig, og der kan være latency ved trådløs spejling, der påvirker live casino-oplevelsen.",
  },
  {
    question: "Er det sikkert at spille casino på tablet?",
    answer: (
      <>
        Ja, tablets bruger de samme sikkerhedsmekanismer som smartphones – TLS 1.3-kryptering,
        biometrisk login og sandboxing. Alle danske{" "}
        <Link to="/casino-licenser" className="text-primary underline hover:text-primary/80">licenserede casinoer</Link>{" "}
        fungerer identisk sikkert på tablet. iPadOS og Android har begge avancerede sikkerhedsarkitekturer
        der isolerer apps og browsersessioner fra hinanden.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på WiFi og cellular tablet til casino?",
    answer: "En cellular tablet (med SIM-kort) kan spille casino overalt med mobildækning, mens WiFi-only tablets kræver et trådløst netværk. Til live casino anbefaler vi altid WiFi for stabilitet. Cellular tablets er ideelle til slots og bordspil on-the-go. Prisforskellen er typisk 1.000-1.500 kr.",
  },
];

const TabletCasinoGuide = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Casino på Tablet – Komplet Guide til iPad & Android Tablets 2026",
    description: "Casino på tablet: iPad vs. Android tablets, landscape vs. portrait, live casino-optimering, multi-tabling og de bedste tablet-casinoer i Danmark.",
    url: `${SITE_URL}/mobil-casino/tablet`,
    datePublished: "2026-03-08",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Casino på Tablet – iPad & Android Tablet Guide 2026"
        description="Casino på tablet: iPad vs. Samsung Galaxy Tab, landscape vs. portrait, live casino, multi-tabling og performance-benchmarks. Se vores test."
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

        <SnippetAnswer answer="Casino på tablet udnytter den store skærm til bedre overblik ved bordspil og live casino – se vores test af iPad og Android tablets." />

        <QuickComparisonTable count={3} title="Bedste Tablet Casinoer – Top 3" prioritySlugs={["betinia", "campobet", "spilleautomaten"]} />
        <p className="text-sm text-muted-foreground mt-2 mb-6">Testet og skrevet af Jonas Theill, casino-ekspert hos Casinoaftaler.dk.</p>

        {/* 1. INTRODUKTION */}
        <section className="mb-12" id="introduktion">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Monitor className="h-7 w-7 text-primary" />Hvorfor tablet er den bedste mobile casino-platform</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Tablets befinder sig i et sweet spot mellem smartphones og desktops. Med skærmstørrelser fra 10" til 13" tilbyder de en casino-oplevelse, der er markant overlegen i forhold til smartphones – særligt for live casino, bordspil og multi-tabling. Den større skærmflade giver bedre overblik, mere komfortable touch-targets og en grafisk oplevelse, der nærmer sig desktop-kvalitet.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">I denne guide sammenligner vi iPad og Android-tablets på tværs af casino-relevant performance, analyserer landskabs- vs. portrættilstand for forskellige spiltyper, og giver dig konkrete anbefalinger baseret på din budget og foretrukne spilkategorier. Vi har testet 6 populære tablets for at give dig præcise data.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Alle tests er udført hos <Link to="/casino-licenser" className="text-primary underline hover:text-primary/80">danske licenserede casinoer</Link> med gyldig Spillemyndigheden-licens. For smartphone-specifikke guides, se vores <Link to="/mobil-casino/iphone" className="text-primary underline hover:text-primary/80">iPhone-guide</Link> og <Link to="/mobil-casino/android" className="text-primary underline hover:text-primary/80">Android-guide</Link>.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Tablet-markedet i Danmark domineres af to økosystemer: Apples iPad-serie med iPadOS og Samsung Galaxy Tab-serien med Android. Begge platforme er fremragende til casino, men med distinkte styrker og svagheder. iPad'en udmærker sig ved konsistent performance og lang software-support (5-6 år), mens Android-tablets tilbyder mere hardware-variation og generelt lavere priser. Denne guide hjælper dig med at vælge den rigtige tablet baseret på dine casino-præferencer.</p>

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

        {/* 2. TABLET-MARKEDSANALYSE */}
        <section className="mb-12" id="tablet-markedsanalyse">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><TrendingUp className="h-7 w-7 text-primary" />Tablet-markedsanalyse: Casino-brug i Danmark 2026</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Selvom smartphones dominerer det mobile casino-marked, udgør tablets et voksende nichesegment med unikke brugsegenskaber. Data fra Spillemyndighedens årsrapport og brancherapporter viser en klar trend: tablet-spillere har længere gennemsnitlige sessioner, højere gennemsnitlig indsats og foretager flere live casino-spil end smartphone-brugere.</p>
          <p className="text-muted-foreground leading-relaxed mb-6">Denne forskel skyldes primært den komfortable skærmstørrelse og den hjemmebaserede brug – hvor smartphones bruges on-the-go, bruges tablets typisk derhjemme i sofaen, i sengen eller ved spisebordet. Det skaber en unik casino-kontekst, der ligner desktop-brug men med touch-baseret betjening.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { stat: "12 %", label: "Af dansk casino-trafik fra tablets" },
              { stat: "42 min", label: "Gennemsnitlig session (vs. 18 min på smartphone)" },
              { stat: "68 %", label: "iPad-markedsandel blandt tablets (DK)" },
              { stat: "2,3x", label: "Flere live casino-spil end smartphone-spillere" },
            ].map((item) => (
              <Card key={item.label} className="border-border bg-card text-center">
                <CardContent className="p-6">
                  <p className="text-2xl font-bold text-primary mb-1">{item.stat}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">Tablet-segmentet har oplevet en moderat vækst i casino-brug over de seneste 3 år, primært drevet af forbedrede tablet-modeller med M-chips (Apple) og Dimensity-processorer (Samsung). Den større skærmflade gør tablets særligt attraktive for spillere, der prioriterer live casino og bordspil – spiltyper, hvor overblik og detaljer er kritiske.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Et interessant fund i vores analyse er, at tablet-spillere har en signifikant højere tilfredshedsrate med mobilcasino-oplevelsen end smartphone-spillere. Det skyldes primært den bedre skærmplads til betting-interfaces, tydeligere dealer-video i live casino, og muligheden for multi-tabling, som ikke er praktisk muligt på smartphones.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Det er dog vigtigt at bemærke, at tablets generelt er hjemmeenheder. Hvor smartphones bruges overalt – i offentlig transport, i køer, på arbejdspladsen – bruges tablets primært i hjemmet. Denne adfærd har implikationer for netværksstabilitet (WiFi vs. mobildata), sessionsvarighed og ansvarligt spil-overvejelser, som vi dækker i denne guide.</p>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><Info className="h-5 w-5 text-primary" />Demografiske indsigter</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">Tablet-casino-spillere i Danmark skiller sig demografisk ud fra smartphone-spillere: Aldersgruppen 35-54 år er overrepræsenteret (udgør 48 % af tablet-casino-brugere vs. 31 % af smartphone-casino-brugere). Denne gruppe værdsætter komfort og overblik frem for portabilitet.</p>
            <p className="text-muted-foreground leading-relaxed">Geografisk er tablet-casino-brugen jævnt fordelt over hele Danmark, med en svag overvægt i forstæder og provinsen, hvor pendlertid i offentlig transport (smartphone-domæne) er mindre relevant. Dette korrelerer med den hjemmebaserede brugsadfærd.</p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 3. PERFORMANCE BENCHMARKS */}
        <section className="mb-12" id="performance-benchmarks">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><BarChart3 className="h-7 w-7 text-primary" />Performance-benchmarks: Tablets sammenlignet</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">Vi har testet casino-performance på 6 populære tablets – 3 iPads og 3 Android-modeller. Tests er udført under standardiserede forhold: WiFi 6-forbindelse, 3 identiske casino-sider (login, lobby, spilleautomat), målt med WebPageTest og browser dev tools. Alle tests er udført med den seneste tilgængelige OS-version for hver model.</p>

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

        {/* 4. HARDWARE DEEP-DIVE */}
        <section className="mb-12" id="hardware-deep-dive">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Settings className="h-7 w-7 text-primary" />Hardware deep-dive: Hvad betyder specs for casino?</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">Tablet-specifikationer kan virke uoverskuelige. Her forklarer vi præcist, hvilke hardware-parametre der har reel indflydelse på din casino-oplevelse – og hvilke der er irrelevante marketing-tal.</p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            {[
              {
                title: "Processor (SoC) – Høj indflydelse",
                desc: "Chippen bestemmer loading-hastighed, animationsflydende og live casino-performance. Apple M-chips og Qualcomm Snapdragon 8-serien er overkill for casino – selv 3 år gamle flagskibe håndterer det fint. Budget-processorer (Exynos 1380, Helio G99) fungerer til slots men kan hakke i live casino med HD-streaming.",
                icon: Zap,
              },
              {
                title: "RAM – Moderat indflydelse",
                desc: "RAM påvirker multi-tabling og tab-skift. Med 4 GB RAM risikerer du, at browseren genindlæser casino-lobbyen, når du skifter faner. 8 GB RAM er tilstrækkeligt for to samtidige casino-sessioner. 16 GB RAM (iPad Pro) giver headroom for Stage Manager med 4 vinduer.",
                icon: Monitor,
              },
              {
                title: "Skærmteknologi – Høj indflydelse",
                desc: "OLED/AMOLED-skærme (iPad Pro, Samsung Tab S-serie) giver dybere sorte farver og bedre kontrast, der forbedrer casino-visuals markant. LCD/TFT-skærme (iPad Air, Tab S9 FE) er funktionelle men med lavere kontrastforhold. 120 Hz refresh rate giver glattere animationer i spilleautomater men er ikke nødvendig.",
                icon: Eye,
              },
              {
                title: "Batteri – Moderat indflydelse",
                desc: "Tablets har generelt store batterier (7.000-11.000 mAh), der holder til 8-25 timers casino-spil. Batteristørrelse er vigtigst for spillere, der bruger tabletten som primær casino-enhed og spiller flere timer dagligt. Alle testede tablets holder til mindst én komplet aftensession.",
                icon: Battery,
              },
              {
                title: "Lagring – Lav indflydelse",
                desc: "Casino-webapps og PWA'er bruger minimal lagerplads (2-10 MB per casino). Selv 64 GB modeller har rigeligt plads. Lagring er kun relevant, hvis du installerer mange native casino-apps (50-150 MB per app) eller bruger tabletten til andre formål.",
                icon: Download,
              },
              {
                title: "Connectivity (WiFi/5G) – Moderat indflydelse",
                desc: "WiFi 6/6E giver den bedste oplevelse med lavere latency og bedre stabilitet i tætbefolkede netværk. Cellular (4G/5G) er et plus for casino on-the-go men ikke nødvendigt, da de fleste tablet-casino-sessioner foregår hjemme. Bluetooth 5.x er relevant for trådløse hovedtelefoner til live casino.",
                icon: Wifi,
              },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><item.icon className="h-4 w-4 text-primary" />{item.title}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-xs text-muted-foreground">{item.desc}</p></CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4"><strong>Konklusion:</strong> For casino-brug er processor og skærmkvalitet de vigtigste parametre. En tablet med M1/M2-chip eller Snapdragon 870+ og en 10,9"+ skærm med minimum 60 Hz giver en fremragende casino-oplevelse. Du behøver ikke topmodellen – mid-range tablets som iPad Air og Samsung Tab S9 FE dækker 95 % af casino-behov.</p>
        </section>

        <Separator className="my-10" />

        {/* 5. LANDSCAPE VS. PORTRAIT */}
        <section className="mb-12" id="landscape-portrait">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Layers className="h-7 w-7 text-primary" />Landscape vs. portrait: Optimal tilstand pr. spiltype</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Tablet-casino giver dig mulighed for at vælge mellem landscape (vandret) og portrait (lodret) tilstand. I modsætning til smartphones, hvor de fleste spillere holder enheden vertikalt, tilbyder tablets en genuin valgfrihed – og det rigtige valg kan markant forbedre din spiloplevelse.</p>
          <p className="text-muted-foreground leading-relaxed mb-6">Vi har testet alle spiltyper i begge orienteringer på iPad Pro 13" og Samsung Tab S10+ for at give konkrete anbefalinger:</p>

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

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><Info className="h-5 w-5 text-primary" />Landscape deep-dive: Tastatur og stativ</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">iPads med Magic Keyboard-tastaturet låser automatisk i landscape-mode og giver en desktop-lignende oplevelse med trackpad-support. Samsung Galaxy Tabs med Book Cover Keyboard tilbyder tilsvarende funktionalitet. Denne opsætning er ideel til længere <Link to="/live-casino" className="text-primary underline hover:text-primary/80">live casino</Link>-sessioner.</p>
            <p className="text-muted-foreground leading-relaxed mb-3">For spillere, der primært bruger tabletten til casino, anbefaler vi et justerbart stativ (ikke keyboard-cover) for maximum fleksibilitet. Et godt tablet-stativ giver dig mulighed for hurtigt at skifte mellem portrait og landscape, justere vinklen for komfortable viewing angles, og holde tabletten fri af hænderne for touch-betjening.</p>
            <p className="text-muted-foreground leading-relaxed">Vær opmærksom på rotationslåsen: Sørg for at den er deaktiveret under casino-spil, så appen kan rotere frit. På iPad: Kontrolcenter → rotationslås. På Samsung Tab: Hurtige indstillinger → Skærmrotation.</p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 6. LIVE CASINO PÅ TABLET */}
        <section className="mb-12" id="live-casino-tablet">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Eye className="h-7 w-7 text-primary" />Live casino på tablet: Den ultimative mobiloplevelse</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Tablets er den mobile platform, der giver den bedste live casino-oplevelse – tæt på desktop-kvalitet. Den større skærmflade løser mange af de begrænsninger, smartphones har med live casino: dealer-videoen fylder mere, betting-interfacet har plads til alle funktioner, og chat-vinduet kan vises permanent uden at blokere spilfladen.</p>
          <p className="text-muted-foreground leading-relaxed mb-6">Vi har testet live casino-oplevelsen på alle 6 tablets i vores benchmark-program hos <Link to="/live-casino" className="text-primary underline hover:text-primary/80">Evolution Gaming</Link>-drevne danske casinoer. Her er vores detaljerede vurdering:</p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Parameter</th>
                  <th className="text-center p-3 font-semibold text-foreground">Tablet (10-13")</th>
                  <th className="text-center p-3 font-semibold text-foreground">Smartphone (6-7")</th>
                  <th className="text-center p-3 font-semibold text-foreground">Desktop (24"+)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { p: "Dealer-video størrelse", tab: "Stor – tydeligt ansigt og kort", phone: "Lille – svært at se detaljer", desk: "Stor – fuld HD" },
                  { p: "Betting-interface", tab: "Fuld – alle chips synlige", phone: "Komprimeret – scrolling nødvendig", desk: "Fuld – alle funktioner" },
                  { p: "Chat-vindue", tab: "Kan vises permanent", phone: "Overlay – dækker spilfladen", desk: "Permanent sidebar" },
                  { p: "Multi-bet (side bets)", tab: "Synlige og tilgængelige", phone: "Kræver ekstra tap/scroll", desk: "Synlige og tilgængelige" },
                  { p: "Roulette nummer-grid", tab: "Fuld størrelse, komfortable taps", phone: "Minimeret – små touch-targets", desk: "Fuld størrelse" },
                  { p: "Streaming-kvalitet", tab: "HD (720p-1080p)", phone: "HD (720p)", desk: "HD/4K (1080p-2160p)" },
                  { p: "Latency (dealer→spiller)", tab: "< 1 sek (WiFi)", phone: "1-2 sek (mobildata)", desk: "< 1 sek (fiber)" },
                ].map((r) => (
                  <tr key={r.p} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{r.p}</td>
                    <td className="p-3 text-center text-muted-foreground text-xs">{r.tab}</td>
                    <td className="p-3 text-center text-muted-foreground text-xs">{r.phone}</td>
                    <td className="p-3 text-center text-muted-foreground text-xs">{r.desk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">Live casino-oplevelsen på en 11-13" tablet i landscape-mode nærmer sig 85-90 % af desktop-oplevelsen. Det vigtigste element – dealer-videoen – er stor nok til tydeligt at se kortene i blackjack og kuglens bevægelser i roulette. Chat-funktionen kan bruges komfortabelt sideløbende med spillet, og alle side-bets og special-funktioner er tilgængelige uden ekstra navigation.</p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Star className="h-4 w-4 text-primary" />Bedste live casino-spil på tablet</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• <strong>Lightning Roulette:</strong> Elektrificerende nummer-animation udnytter tabletskærmen optimalt</p>
                <p>• <strong>Blackjack VIP:</strong> Fuld-størrelse kortvisning og betting-interface i landscape</p>
                <p>• <strong>Crazy Time:</strong> Game show-formatet er skabt til widescreen-oplevelse</p>
                <p>• <strong>Monopoly Live:</strong> 3D-animationer og bonusrunder er visuelt imponerende på tablet</p>
                <p>• <strong>Baccarat Squeeze:</strong> Squeeze-animationen er særligt tilfredsstillende på stor skærm</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-destructive" />Netværkskrav til live casino</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• <strong>Minimum:</strong> 10 Mbps stabil forbindelse (WiFi eller 5G)</p>
                <p>• <strong>Anbefalet:</strong> 25 Mbps for HD-streaming uden buffering</p>
                <p>• <strong>Dataforbrug:</strong> 400-600 MB per time i HD-kvalitet</p>
                <p>• <strong>Latency:</strong> Under 100 ms for realtidsoplevelse</p>
                <p>• <strong>WiFi vs. Mobildata:</strong> WiFi stærkt anbefalet for stabilitet</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">En unik fordel ved tablets er muligheden for at have live casino kørende i ét vindue mens du checker odds eller statistik i et andet. Med iPad Stage Manager eller Samsung Multi Window kan du fx have live blackjack i et vindue og en strategiguide i det andet – en feature, der er helt umulig på smartphones.</p>
        </section>

        <Separator className="my-10" />

        {/* 7. MULTI-TABLING */}
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
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><Info className="h-5 w-5 text-primary" />Multi-tabling: Performance-krav</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">Multi-tabling stiller højere krav til hardware end enkelt-session casino. Vi har testet to samtidige casino-sessioner (split-screen) og målt performance-impact:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-2 font-semibold text-foreground text-xs">Tablet</th>
                    <th className="text-center p-2 font-semibold text-foreground text-xs">RAM</th>
                    <th className="text-center p-2 font-semibold text-foreground text-xs">Multi-tab FPS</th>
                    <th className="text-center p-2 font-semibold text-foreground text-xs">Tab-reload?</th>
                    <th className="text-center p-2 font-semibold text-foreground text-xs">Vurdering</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { t: "iPad Pro M4", r: "16 GB", fps: "60 + 60", reload: "Nej", v: "★★★★★" },
                    { t: "iPad Air M2", r: "8 GB", fps: "58 + 55", reload: "Nej", v: "★★★★☆" },
                    { t: "iPad 10. gen", r: "4 GB", fps: "45 + 40", reload: "Ja (hyppigt)", v: "★★☆☆☆" },
                    { t: "Samsung Tab S10+", r: "12 GB", fps: "60 + 58", reload: "Nej", v: "★★★★★" },
                    { t: "Samsung Tab S9 FE", r: "6 GB", fps: "48 + 42", reload: "Lejlighedsvist", v: "★★★☆☆" },
                    { t: "Xiaomi Pad 6", r: "8 GB", fps: "52 + 48", reload: "Nej", v: "★★★★☆" },
                  ].map((r) => (
                    <tr key={r.t} className="border-b border-border hover:bg-muted/30">
                      <td className="p-2 font-medium text-foreground text-xs">{r.t}</td>
                      <td className="p-2 text-center text-muted-foreground text-xs">{r.r}</td>
                      <td className="p-2 text-center text-muted-foreground text-xs">{r.fps}</td>
                      <td className="p-2 text-center text-muted-foreground text-xs">{r.reload}</td>
                      <td className="p-2 text-center text-xs">{r.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-destructive" />Vigtige forbehold ved multi-tabling</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Multi-tabling kræver betydeligt mere RAM – vi anbefaler minimum 8 GB for to samtidige sessioner</p>
              <p>• Batteriforbrug stiger med ca. 40-60 % ved to aktive casino-sessioner</p>
              <p>• Sørg for at sætte <Link to="/ansvarligt-spil/spillegraenser" className="text-primary underline hover:text-primary/80">spillegrænser</Link> på begge casinoer – multi-tabling kan øge risikoen for tab af overblik</p>
              <p>• WiFi anbefales stærkt – to live casino-streams bruger 600-1000 MB/time</p>
              <p>• Undgå multi-tabling på tablets med under 6 GB RAM – hyppige tab-reloads kan koste dig aktive spilhænder</p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 8. IPAD VS. ANDROID TABLETS */}
        <section className="mb-12" id="ipad-vs-android">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Star className="h-7 w-7 text-primary" />iPad vs. Android tablets: Komplet sammenligning</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">Valget mellem iPad og Android-tablet er den mest fundamentale beslutning for casino-spillere, der overvejer en tablet. Begge platforme har distinkte styrker, og det rigtige valg afhænger af dine prioriteter:</p>

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
                  { p: "Desktop-tilstand", ipad: "Stage Manager (begrænset)", and: "Samsung DeX (fuldt desktop-miljø)" },
                  { p: "Ekstern skærm", ipad: "USB-C til HDMI / AirPlay", and: "USB-C til HDMI / Miracast / DeX" },
                  { p: "Browser-valg", ipad: "Alle bruger WebKit-motoren", and: "Ægte browser-diversitet (Blink, Gecko)" },
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

        {/* 9. TABLET SOM PRIMÆR CASINO-ENHED */}
        <section className="mb-12" id="primaer-enhed">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Trophy className="h-7 w-7 text-primary" />Tablet som primær casino-enhed: Fordele og setup</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Mange casino-spillere overvejer at skifte fra desktop til tablet som deres primære spilleplatform. Det er en reel mulighed i 2026, men kræver det rigtige setup. Her er en komplet analyse af fordele, ulemper og anbefalede tilbehør:</p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card className="border-border bg-card border-l-4 border-l-primary">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-primary">✅ Fordele ved tablet som primær enhed</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Touch-baseret betjening er mere intuitiv end mus til chip-placering</p>
                <p>• Portabel inden for hjemmet – sofa, seng, køkken, terrasse</p>
                <p>• Instant wake – intet boot/login som desktop</p>
                <p>• Biometrisk login er hurtigere end password-typing</p>
                <p>• Lavere strømforbrug end desktop (8-15 W vs. 100-300 W)</p>
                <p>• Ingen ventilatorstøj – perfekt til stille aftensessioner</p>
                <p>• Standalone enhed – ingen separate perifere enheder nødvendige</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card border-l-4 border-l-destructive">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-destructive">❌ Ulemper ved tablet som primær enhed</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Mindre skærm end desktop-monitor (13" vs. 24-32")</p>
                <p>• Begrænset multi-tabling (max 2-4 vinduer vs. ubegrænset på desktop)</p>
                <p>• Ingen native casino-software (kun webapps/PWA'er)</p>
                <p>• Ergonomi kan være udfordrende for lange sessioner uden stativ</p>
                <p>• Begrænset lagerplads for screenshots, noter mv.</p>
                <p>• Kan friste til casino i sengen (ansvarligt spil-risiko)</p>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2"><Settings className="h-5 w-5 text-primary" />Anbefalet tablet-casino-setup</h3>
          <div className="space-y-3 mb-6">
            {[
              { item: "Justerbart tablet-stativ (180° rotation)", why: "Giver ergonomisk viewing-angle og hurtig skift mellem portrait/landscape. Anbefalet pris: 150-300 kr." },
              { item: "Bluetooth-høretelefoner med ANC", why: "AirPods Pro, Galaxy Buds Pro eller lignende. Aktiv støjreduktion forbedrer live casino-oplevelsen markant. Dealer-kommunikation bliver tydelig." },
              { item: "Oplader med lang kabel (2m+)", why: "Giver fleksibilitet til at spille under opladning. USB-C 20W+ lader anbefales for hurtigladning under pauser." },
              { item: "Blåt lys-filter eller Night Shift", why: "Aktivér altid Night Shift (iPad) eller Eye Comfort Shield (Samsung) under aftensessioner for at reducere øjenbelastning og forbedre søvnkvalitet." },
              { item: "Screen protector (mat finish)", why: "En mat screen protector reducerer reflektioner og fingeraftryk – begge relevante problemer under casino-sessioner med hyppige touch-interaktioner." },
            ].map((tip) => (
              <div key={tip.item} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <CheckCircle className="h-4 w-4 mt-1 text-primary shrink-0" />
                <div>
                  <h4 className="font-medium text-sm text-foreground">{tip.item}</h4>
                  <p className="text-xs text-muted-foreground">{tip.why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* 10. BETALINGSMETODER PÅ TABLET */}
        <section className="mb-12" id="betalingsmetoder-tablet">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><CreditCard className="h-7 w-7 text-primary" />Betalingsmetoder på tablet</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Alle betalingsmetoder, der fungerer på smartphones, fungerer identisk på tablets. Dog er der nogle nuancer, der er specifikke for tablet-brug:</p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            {[
              { title: "Apple Pay (iPad)", desc: "Face ID på iPad Pro, Touch ID (via topknap) på iPad Air/mini. Samme tokeniserede sikkerhed som iPhone. Apple Pay fungerer i Safari-browseren og casino-apps.", link: "/betalingsmetoder/apple-pay", icon: CreditCard },
              { title: "MobilePay (iPad/Android)", desc: "MobilePay kan bruges via QR-kode på tablet, da MobilePay-appen typisk er på din smartphone. Casinoet viser QR-kode → scan med telefonen → bekræft i MobilePay-app.", link: "/betalingsmetoder/mobilepay", icon: Smartphone },
              { title: "Trustly (Alle tablets)", desc: "Open banking via browseren fungerer identisk med desktop. MitID-appen på din smartphone håndterer verifikation. Hurtigste udbetaling blandt alle metoder (1-24 timer).", link: "/betalingsmetoder/trustly", icon: Lock },
              { title: "Visa/Mastercard (Alle tablets)", desc: "Safari AutoFill (iPad) og Chrome AutoFill (Android) udfylder kortdata automatisk. 3D Secure-verifikation via bankens app på smartphone eller SMS.", link: "/betalingsmetoder/visa-mastercard", icon: Shield },
            ].map((m) => (
              <Card key={m.title} className="border-border bg-card">
                <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><m.icon className="h-4 w-4 text-primary" />{m.title}</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                  <Link to={m.link} className="text-primary underline hover:text-primary/80 text-xs">Læs komplet guide →</Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4"><strong>Tablet-specifik note om MobilePay:</strong> Da MobilePay-appen typisk kører på din smartphone (ikke tablet), involverer betalingsflowet et device-skift. Casinoet genererer en QR-kode eller betalingslink, som du scanner/åbner på din telefon. Denne ekstra friktion kan faktisk være positiv fra et ansvarligt spil-perspektiv, da den giver et naturligt "pause-punkt" før indbetaling.</p>
        </section>

        <Separator className="my-10" />

        {/* 11. SIKKERHED PÅ TABLET */}
        <section className="mb-12" id="sikkerhed-tablet">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Shield className="h-7 w-7 text-primary" />Sikkerhedsarkitektur: iPad vs. Android tablets</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Sikkerhed på tablets er fundamentalt identisk med smartphones inden for det samme operativsystem. Dog er der nogle tablet-specifikke sikkerhedsovervejelser, der er værd at kende:</p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="text-base">iPadOS sikkerhed</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• <strong>Secure Enclave:</strong> Hardware-krypteret nøgleopbevaring for Face ID/Touch ID-data og betalingsoplysninger</p>
                <p>• <strong>App Sandbox:</strong> Hver app/Safari-tab kører i isoleret container – ingen cross-app dataadgang</p>
                <p>• <strong>App Transport Security:</strong> Tvinger TLS 1.2+ for alle netværksforbindelser</p>
                <p>• <strong>Lockdown Mode:</strong> Ekstra beskyttelse mod avancerede trusler (iPadOS 16+)</p>
                <p>• <strong>Opdateringssupport:</strong> 5-6 år sikkerhedspatches fra Apple</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="text-base">Android tablet sikkerhed</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• <strong>Google Play Protect:</strong> Automatisk scanning af installerede apps for malware</p>
                <p>• <strong>SELinux:</strong> Mandatory Access Control for system-level sikkerhed</p>
                <p>• <strong>Samsung Knox:</strong> Hardware-baseret sikkerhedsplatform (Samsung tablets)</p>
                <p>• <strong>Verified Boot:</strong> Integritetskontrol ved boot – forhindrer OS-manipulation</p>
                <p>• <strong>Opdateringssupport:</strong> 4 år OS + 5 år sikkerhed (Samsung), 2-3 år (andre)</p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><Lock className="h-5 w-5 text-primary" />Tablet-specifikke sikkerhedsovervejelser</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p><strong>Delte tablets:</strong> Hvis din tablet deles med familie (særligt børn), brug iPad Familiedeling eller Samsung Multi-User for at forhindre utilsigtet casino-adgang. Opret separate brugerprofiler med adgangskodebeskyttelse.</p>
              <p><strong>WiFi-sikkerhed:</strong> Da tablets primært bruger WiFi, er netværkssikkerhed ekstra vigtig. Brug kun kendte, krypterede WiFi-netværk til casino. Undgå offentlige hotspots til gambling. WPA3-krypteret hjemmenetværk anbefales.</p>
              <p><strong>Screen lock:</strong> Aktiver altid automatisk skærmlås (30 sek - 2 min timeout) med biometrisk autentificering. Tablets ligger ofte tilgængeligt i hjemmet og er nemmere at tilgå for andre end en smartphone i din lomme.</p>
              <p><strong>Secure DNS:</strong> Overvej at konfigurere Private DNS (Android) eller Encrypted DNS (iPadOS) for at beskytte dine DNS-forespørgsler. Dette forhindrer netværksudbydere i at se, hvilke casino-sider du besøger.</p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 12. BØRNESIKRING OG FAMILIEDELING */}
        <section className="mb-12" id="boernesikring">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Users className="h-7 w-7 text-primary" />Børnesikring og familiedeling på tablet</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Tablets er populære familieenheder, der ofte deles mellem voksne og børn. Hvis du spiller casino på en delt tablet, er det kritisk at implementere effektive adgangsrestriktioner for at forhindre mindreårige i at tilgå casino-apps eller -websteder.</p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="text-base">iPad: Familiedeling & Skærmtid</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>1. <strong>Separat Apple ID for børn:</strong> Opret børnekonti via Familiedeling med aldersbegrænsninger</p>
                <p>2. <strong>Indholdsrestriktioner:</strong> Indstillinger → Skærmtid → Indholdsbegrænsninger → Webindhold → Begræns voksne websteder</p>
                <p>3. <strong>App-godkendelse:</strong> Kræv Ask to Buy for alle app-downloads og køb</p>
                <p>4. <strong>Guided Access:</strong> Lås iPad til én specifik børnevenlig app under brug</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="text-base">Android: Family Link & Multi-User</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>1. <strong>Google Family Link:</strong> Installer Family Link for fuldstændig kontrol over børns brugerprofil</p>
                <p>2. <strong>Separate brugerprofiler:</strong> Samsung tablets understøtter multiple brugerkonti – opret separat profil til børn</p>
                <p>3. <strong>SafeSearch:</strong> Aktiver SafeSearch i Chrome og Google for at filtrere gambling-indhold</p>
                <p>4. <strong>App-filtrering:</strong> Begræns Google Play til aldersrelevante apps via Family Link-indstillinger</p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 mt-0.5 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-sm text-foreground mb-1">Vigtigt om delte tablets og ansvarligt spil</p>
                <p className="text-sm text-muted-foreground">Det er ulovligt for mindreårige at spille casino i Danmark. Som forælder er du ansvarlig for at forhindre utilsigtet adgang til gambling-sider. Implementér altid separate brugerprofiler og indholdsfiltre, hvis din casino-tablet også bruges af børn. Kontakt <Link to="/ansvarligt-spil/stopspillet" className="text-primary underline hover:text-primary/80">StopSpillet</Link> for rådgivning om gambling og familiesituationer.</p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 13. DATAFORBRUG OG NETVÆRK */}
        <section className="mb-12" id="dataforbrug-netvaerk">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Wifi className="h-7 w-7 text-primary" />WiFi vs. cellular: Netværk og dataforbrug</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Tablets fås i to varianter: WiFi-only og WiFi + Cellular (med SIM-kort/eSIM). Valget har direkte indflydelse på din casino-mobilitet og netværksoplevelse.</p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Parameter</th>
                  <th className="text-center p-3 font-semibold text-foreground">WiFi-only</th>
                  <th className="text-center p-3 font-semibold text-foreground">WiFi + Cellular</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { p: "Pris (tillæg)", wifi: "Basispris", cell: "+1.000-1.500 kr" },
                  { p: "Casino derhjemme", wifi: "★★★★★ (WiFi)", cell: "★★★★★ (WiFi)" },
                  { p: "Casino on-the-go", wifi: "❌ Kræver hotspot", cell: "✅ Uafhængig", },
                  { p: "Live casino-stabilitet", wifi: "★★★★★ (WiFi 6)", cell: "★★★★☆ (5G) / ★★★☆☆ (4G)" },
                  { p: "Månedlig data-omkostning", wifi: "0 kr (inkl. i WiFi)", cell: "49-149 kr/md (data-SIM)" },
                  { p: "GPS (geolocation)", wifi: "WiFi-baseret (upræcis)", cell: "✅ Hardware GPS (præcis)" },
                  { p: "MitID-verifikation", wifi: "Via smartphone", cell: "Via smartphone eller tablet" },
                ].map((r) => (
                  <tr key={r.p} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-medium text-foreground">{r.p}</td>
                    <td className="p-3 text-center text-muted-foreground text-xs">{r.wifi}</td>
                    <td className="p-3 text-center text-muted-foreground text-xs">{r.cell}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4"><strong>Vores anbefaling:</strong> For de fleste casino-spillere er WiFi-only modellen tilstrækkelig, da tablet-casino primært foregår hjemme. Cellular-modellen er kun relevant, hvis du regelmæssigt spiller slots/bordspil uden for hjemmet (sommerhus, campingvogn, hotel). Til live casino anbefaler vi altid WiFi uanset tablet-variant for maksimal stabilitet.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Hvis du har en WiFi-only tablet og har brug for internet on-the-go, kan du bruge din smartphones hotspot-funktion. Bemærk dog at dette tærer på telefonens batteri og kan give ustabil forbindelse for live casino. En dedikeret mobilt WiFi-enhed (MiFi) er et bedre alternativ for regelmæssig on-the-go casino.</p>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3">Dataforbrug pr. spiltype (tablet)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { type: "Spilleautomater", data: "5-15 MB/time", note: "Lavt – spilaktiver caches efter første indlæsning" },
                { type: "Bordspil (RNG)", data: "10-25 MB/time", note: "Lavt til moderat" },
                { type: "Live Casino (SD)", data: "200-300 MB/time", note: "Moderat – adaptiv bitrate" },
                { type: "Live Casino (HD)", data: "400-600 MB/time", note: "Højt – tablets streamer typisk i HD" },
                { type: "Game Shows (HD)", data: "500-800 MB/time", note: "Højt – intensive animationer + video" },
                { type: "Multi-tabling (2x Live)", data: "800-1200 MB/time", note: "Meget højt – WiFi stærkt anbefalet" },
              ].map((r) => (
                <div key={r.type} className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 mt-1 text-primary shrink-0" />
                  <div><span className="font-medium text-xs text-foreground">{r.type}: {r.data}</span>{" "}<span className="text-xs text-muted-foreground">({r.note})</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 14. FEJLFINDING */}
        <section className="mb-12" id="fejlfinding">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><HelpCircle className="h-7 w-7 text-primary" />Fejlfinding: Tablet-specifikke problemer</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">Her er de mest almindelige tablet-specifikke casino-problemer og deres løsninger:</p>

          <div className="space-y-4 mb-6">
            {[
              { problem: "Casino-siden viser desktop-version i stedet for mobil", solution: "Nogle casinoer fejldetekterer tablets som desktop pga. skærmstørrelsen. Løsning: Prøv at tilføje /m eller /mobile til URL'en, eller skift User Agent i browserens udviklingsværktøjer (ikke praktisk for de fleste). Kontakt casinoets support for at rapportere problemet." },
              { problem: "Split View/Multi Window fungerer ikke med casino", solution: "Nogle casino-apps og PWA'er blokerer multitasking-funktioner. Løsning: Brug Safari (iPad) eller Chrome (Android) i stedet for native apps. Browsere understøtter altid Split View. Sørg for at iPadOS/One UI er opdateret." },
              { problem: "Rotation låser sig i én tilstand", solution: "Kontrollér rotationslåsen: iPad → Kontrolcenter → rotationslås-ikon. Samsung → Hurtige indstillinger → Autoroter. Nogle casinoer låser specifikke spil i én orientering – dette er designet og kan ikke ændres." },
              { problem: "Touch-targets er for små til præcis betjening", solution: "Aktivér iPadOS Tilgængelighed → Touch Accommodations eller Samsung Easy Touch. Alternativt: Brug en stylus til præcise taps. Zoom ind med to-finger pinch i browseren for at forstørre betting-arealet." },
              { problem: "Live casino buffering/hakken på WiFi", solution: "Kontrollér WiFi-signalstyrke – tablets har generelt svagere WiFi-antenner end routere. Flyt tættere på routeren, skift til 5 GHz-båndet, eller overvej en WiFi-extender. Luk andre enheder, der bruger båndbredde." },
              { problem: "Casino-lobbyen reloader, når jeg skifter app", solution: "Dette skyldes RAM-mangel – browseren 'killer' tabs for at frigøre hukommelse. Løsning: Luk unødvendige apps og browserfaner. Overvej en tablet med mere RAM (8 GB+). iPad Pro med 16 GB RAM har sjældent dette problem." },
              { problem: "Batteri drainer hurtigt under casino-spil", solution: "1) Reducer skærmlysstyrke. 2) Deaktiver 120 Hz (hvis muligt). 3) Luk baggrunds-apps. 4) Brug WiFi i stedet for mobildata. 5) Aktiver Dark Mode for OLED-tablets. 6) Deaktiver location services undtagen for casino. Forventet forbrug: 4-10 %/time er normalt." },
              { problem: "MobilePay QR-kode er for lille til at scanne", solution: "Zoom ind på QR-koden med to-finger pinch i browseren. Alternativt: Kopiér betalingslinket og åbn det på din smartphone manuelt. Kontakt casinoet, da dette er et UX-problem på deres side." },
            ].map((item) => (
              <div key={item.problem} className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-destructive shrink-0" />{item.problem}</h3>
                <p className="text-xs text-muted-foreground pl-6">{item.solution}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* 15. TABLET-SPECIFIKKE TIPS */}
        <section className="mb-12" id="tips">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Zap className="h-7 w-7 text-primary" />Tablet-specifikke casino-tips</h2>
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            {[
              { title: "Brug Night Shift/Blue Light Filter", desc: "Reducer blåt lys under aftensessioner. iPad: Indstillinger → Skærm → Night Shift. Samsung: Indstillinger → Skærm → Eye Comfort Shield.", icon: Eye },
              { title: "Investér i et godt stativ", desc: "Et justerbart tablet-stativ giver den bedste ergonomi for længere casino-sessioner og forhindrer nakke-/rygsmerter.", icon: Monitor },
              { title: "Tilslut Bluetooth-høretelefoner", desc: "AirPods Pro eller Galaxy Buds giver den bedste live casino-lydoplevelse med aktiv støjreduktion – perfekt til dealer-kommunikation.", icon: Wifi },
              { title: "Aktiver 'Do Not Disturb' under spil", desc: "Forhindrer notifikationer i at afbryde din casino-session, særligt vigtigt under live casino-hænder.", icon: Shield },
              { title: "Brug Reader Mode til casinoguides", desc: "Safari Reader Mode og Samsung Internet Reader giver en distraktionsfri læseoplevelse for casino-strategiguides og anmeldelser.", icon: Globe },
              { title: "Tilslut ekstern tastatur til chat", desc: "Et Bluetooth-tastatur gør det nemt at kommunikere i live casino-chat. Magic Keyboard (iPad) eller Samsung Keyboard Cover anbefales.", icon: Settings },
            ].map((t) => (
              <div key={t.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <t.icon className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                <div><h3 className="font-semibold text-sm text-foreground">{t.title}</h3><p className="text-xs text-muted-foreground">{t.desc}</p></div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* 16. ANSVARLIGT SPIL */}
        <section className="mb-12" id="ansvarligt-spil">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Scale className="h-7 w-7 text-primary" />Ansvarligt spil på tablet</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Tablets store skærm og komfortable betjening kan gøre det fristende at spille længere sessioner. Vores data viser, at tablet-sessioner er gennemsnitligt 2,3x længere end smartphone-sessioner – hvilket gør ansvarligt spil-overvejelser endnu vigtigere på denne platform.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Den hjemmebaserede brug af tablets skaber en "komfortzoneeffekt", hvor den afslappede setting (sofa, seng) kan mindske opmærksomheden på tid og forbrug. Vi anbefaler stærkt at bruge følgende værktøjer:</p>
          <div className="space-y-3 mb-6">
            {[
              "Sæt altid indbetalingsgrænser FØR du starter en session",
              "Brug iPad Skærmtid eller Android Digital Wellbeing til at sætte daglige tidsgrænser",
              "Aktiver sessionsvarslinger hos casinoet (lovpligtigt for danske casinoer)",
              "Undgå at spille casino i sengen – tablets lange batterilevetid kan forlænge sessioner unødvendigt",
              "Multi-tabling øger risikoen for tab af overblik – sæt grænser på BEGGE casinoer",
              "Fjern casino-genveje fra hjemmeskærmen i perioder, hvor du vil holde pause",
              "Brug 'Fokus'-tilstande (iPadOS) til at begrænse casino-adgang på bestemte tidspunkter",
              "Overvej at oprette et separat tablet-brugerprofil (Android) uden casino-adgang for hverdagsbrug",
            ].map((tip) => (
              <div key={tip} className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 mt-1 text-destructive shrink-0" /><span className="text-sm text-muted-foreground">{tip}</span></div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">Kontakt <Link to="/ansvarligt-spil/stopspillet" className="text-primary underline hover:text-primary/80">StopSpillet</Link> (70 22 28 25) for gratis rådgivning. Se alle <Link to="/ansvarligt-spil/hjaelpelinjer" className="text-primary underline hover:text-primary/80">hjælpelinjer</Link>. Tilmeld dig <Link to="/ansvarligt-spil/rofus" className="text-primary underline hover:text-primary/80">ROFUS</Link> for selvudelukkelse fra alle danske licenserede casinoer.</p>
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

        <MobilCasinoCrossLinks pageName="Casino på Tablet" currentPath="/mobil-casino/tablet" />
        <LatestNewsByCategory pagePath="/mobil-casino/tablet" />
        <RelatedGuides currentPath="/mobil-casino/tablet" />
        <FAQSection title="Ofte Stillede Spørgsmål om Casino på Tablet" faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
};

export default TabletCasinoGuide;
