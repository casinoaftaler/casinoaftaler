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
import mobilCasinoHero from "@/assets/heroes/mobil-casino-hero.jpg";
import {
  Smartphone,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Lock,
  Scale,
  BarChart3,
  
  ExternalLink,
  HelpCircle,
  Phone,
  Globe,
  Gavel,
  ArrowRight,
  Zap,
  Wifi,
  Battery,
  Monitor,
  Star,
  TrendingUp,
  CreditCard,
  Gamepad2,
  Eye,
  Settings,
  Download,
  RefreshCw,
  Info,
  Trophy,
} from "lucide-react";

// ────────────────────────────────────────────────────────────────
// FAQ Data
// ────────────────────────────────────────────────────────────────
const mobilCasinoFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er et mobil casino?",
    answer: (
      <>
        Et mobil casino er en online casinoplatform, der er fuldt optimeret til at fungere
        på smartphones og tablets – typisk via en responsive webapp i browseren eller en
        dedikeret app. Alle{" "}
        <Link to="/casino-licenser" className="text-primary underline hover:text-primary/80">
          danske licenserede casinoer
        </Link>{" "}
        tilbyder i dag mobilvarianter, der giver adgang til spilleautomater, bordspil,
        live casino og betalingsløsninger direkte fra din mobilenhed. Teknologien bag
        moderne mobil casinoer er HTML5, der sikrer cross-platform kompatibilitet uden
        behov for Flash eller separate plugins.
      </>
    ),
  },
  {
    question: "Er mobil casino sikkert at spille på?",
    answer:
      "Ja, forudsat at du spiller på et casino med gyldig dansk licens udstedt af Spillemyndigheden. Licenserede mobil casinoer benytter samme krypteringsteknologi (TLS 1.3 / 256-bit SSL) som desktop-versionen, og alle transaktioner beskyttes af bankklasse sikkerhedsprotokoller. MitID-integration, ROFUS-tilslutning og Spillemyndighedens løbende tilsyn gælder uanset platform. Biometrisk autentificering (Face ID / fingeraftryk) tilføjer et ekstra sikkerhedslag, der faktisk gør mobil casinoer mere sikre end desktop i mange tilfælde.",
  },
  {
    question: "Skal jeg downloade en app for at spille mobil casino?",
    answer: (
      <>
        Nej, de fleste danske casinoer fungerer perfekt via din mobilbrowser (Safari, Chrome)
        som responsive webapps. Nogle casinoer tilbyder dog dedikerede native apps via App Store
        eller Google Play, der kan give lidt bedre performance og push-notifikationer. Læs vores{" "}
        <Link to="/casino-app" className="text-primary underline hover:text-primary/80">
          komplette guide til casino apps
        </Link>{" "}
        for en dybdegående sammenligning af webapp vs. native app.
      </>
    ),
  },
  {
    question: "Hvilke spil kan jeg spille på mobil casino?",
    answer:
      "Moderne mobil casinoer tilbyder typisk 90-95 % af det fulde desktop-spiludvalg. Det inkluderer spilleautomater (slots), live casino (blackjack, roulette, baccarat, game shows), bordspil, video poker og specialty games. Nogle få ældre spiltitler er muligvis ikke mobiloptimerede, men alle nye spil fra store udbydere som Pragmatic Play, NetEnt og Evolution Gaming designes 'mobile-first'. Live casino fungerer fuldt på mobil med HD-streaming og interaktive dealer-funktioner.",
  },
  {
    question: "Kan jeg bruge MobilePay på mobil casino?",
    answer: (
      <>
        Ja, flere danske licenserede casinoer accepterer{" "}
        <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">
          MobilePay
        </Link>{" "}
        som betalingsmetode – og det fungerer ekstra smidigt på mobil, da du allerede har
        appen installeret. Derudover understøttes Apple Pay, Trustly, Visa/Mastercard og
        andre mobilvenlige betalingsmetoder. Indbetalinger sker typisk øjeblikkeligt, mens
        udbetalinger tager 1-24 timer afhængigt af metode og casino.
      </>
    ),
  },
  {
    question: "Er bonusser de samme på mobil og desktop?",
    answer: (
      <>
        Ja. Alle bonusser gælder uanset platform – du får den samme{" "}
        <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">
          velkomstbonus
        </Link>
        , free spins og loyalitetsprogrammer, uanset om du spiller via mobil eller desktop.
        Bonusvilkår, omsætningskrav (max 10x i Danmark jf. BEK nr. 1494) og udbetalingsregler
        er identiske. Nogle casinoer tilbyder dog eksklusive mobilbonusser som en ekstra
        incitament til at bruge deres app.
      </>
    ),
  },
  {
    question: "Hvor meget data bruger mobil casino?",
    answer:
      "Dataforbrug varierer afhængigt af spiltype: Spilleautomater bruger typisk 5-15 MB per time, mens live casino med HD-videostreaming kan bruge 300-500 MB per time. Bordspil (RNG) ligger i intervallet 10-30 MB per time. Vi anbefaler at bruge WiFi til live casino-sessioner for at undgå høje mobildata-omkostninger og sikre stabil forbindelse. De fleste mobil casinoer cacher spilaktiver efter første indlæsning, hvilket reducerer løbende databehov.",
  },
  {
    question: "Hvad gør jeg, hvis spillet hakker eller loader langsomt?",
    answer:
      "Hakken og langsom loading skyldes typisk: svag internetforbindelse (skift til WiFi eller 5G), for mange åbne apps (luk baggrunds-apps), fuld browser-cache (ryd cache under indstillinger), eller forældet operativsystem. Sørg for at din iOS/Android er opdateret til seneste version. Hvis problemet er vedvarende, prøv en anden browser – Chrome og Safari performer generelt bedst. For live casino kræves minimum 10 Mbps for HD-streaming. Kontakt casinoets kundesupport, hvis problemet fortsætter.",
  },
  {
    question: "Kan jeg sætte indbetalingsgrænser på mobil?",
    answer:
      "Ja, alle ansvarligt spil-værktøjer er tilgængelige på mobil: indbetalingsgrænser (daglige, ugentlige, månedlige), tabsgrænser, sessionstidsadvarsler og selvudelukkelse. Disse funktioner er lovpligtige for alle danske licenserede casinoer uanset platform. Du kan også tilmelde dig ROFUS direkte fra din mobil via MitID-appen. Vi anbefaler altid at sætte indbetalingsgrænser, før du begynder at spille.",
  },
  {
    question: "Hvilket mobilcasino er bedst i Danmark i 2026?",
    answer: (
      <>
        De bedste mobil casinoer i Danmark kendetegnes ved: hurtig loading (under 3 sekunder),
        responsivt design tilpasset alle skærmstørrelser, fuldt spiludvalg på mobil, mobilvenlige
        betalingsmetoder og intuitiv navigation. Se vores{" "}
        <Link to="/casino-anmeldelser" className="text-primary underline hover:text-primary/80">
          casino anmeldelser
        </Link>{" "}
        for detaljerede vurderinger af mobiloplevelsen hos hvert casino. Vi tester systematisk
        mobilversionen som en del af vores anmeldelsesproces – se vores{" "}
        <Link to="/saadan-tester-vi-casinoer" className="text-primary underline hover:text-primary/80">
          testmetode
        </Link>{" "}
        for detaljer.
      </>
    ),
  },
];

const MobilCasino = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(mobilCasinoFaqs);

  const articleJsonLd = buildArticleSchema({
    headline: "Mobil Casino – Komplet Guide til Casino på Mobilen i 2026",
    description:
      "Alt om mobil casino: Bedste mobilcasinoer med dansk licens, app vs. browser, betalingsmetoder, sikkerhed og performance. Spil spilleautomater og live casino på mobilen.",
    url: `${SITE_URL}/mobil-casino`,
    datePublished: "2026-03-07",
    dateModified: "2026-03-07",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Mobil Casino – Bedste Casino på Mobilen 2026"
        description="Alt om mobil casino i Danmark: Bedste mobilcasinoer med dansk licens, app vs. browser, betalingsmetoder, sikkerhed, performance og tips. Komplet guide."
        jsonLd={[faqJsonLd, articleJsonLd]}
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
              <Smartphone className="mr-1.5 h-3.5 w-3.5" />
              Casino Guides
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Mobil Casino – Spil Casino på Mobilen
            </h1>
            <p className="text-lg text-white/80">
              Komplet guide til mobil casino i Danmark: Bedste mobilcasinoer, app vs.
              browser, betalingsmetoder, performance og alt du skal vide.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="2026-03-07" readTime="28 Min." />
        <p className="text-sm text-muted-foreground mt-2 mb-6">
          Testet og skrevet af Jonas Theill, casino bonus ekspert hos Casinoaftaler.dk.
        </p>

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={mobilCasinoHero}
            alt="Mobil casino guide – smartphone med casinospil, chips og kort i moderne mobilgaming-æstetik"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>


        {/* ══════════════════════════════════════════════════════════════
            1. HVAD ER MOBIL CASINO?
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="hvad-er-mobil-casino">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Smartphone className="h-7 w-7 text-primary" />
            Hvad er mobil casino?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Mobil casino refererer til online casinoplatforme, der er designet og optimeret til
            brug på mobile enheder – smartphones og tablets. I 2026 er mobilspil den dominerende
            måde at spille casino på, og mere end 75 % af al casinotrafik i Danmark kommer fra
            mobile enheder ifølge Spillemyndighedens seneste årsrapport.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Moderne mobil casinoer tilbyder en næsten identisk oplevelse som desktop-versionen:
            fuldt spiludvalg med spilleautomater, bordspil og live casino, alle betalingsmetoder
            inklusiv{" "}
            <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">
              MobilePay
            </Link>
            {" "}og{" "}
            <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">
              Apple Pay
            </Link>
            , samt alle ansvarligt spil-værktøjer som indbetalingsgrænser og{" "}
            <Link to="/ansvarligt-spil/rofus" className="text-primary underline hover:text-primary/80">
              ROFUS-integration
            </Link>
            .
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Der er to primære måder at tilgå mobil casino: via din mobilbrowser (Safari, Chrome)
            som en responsive webapp, eller via en dedikeret native app downloadet fra App Store
            eller Google Play. Begge metoder er lovlige og sikre, når du spiller hos et{" "}
            <Link to="/casino-licenser" className="text-primary underline hover:text-primary/80">
              casino med dansk licens
            </Link>
            . Læs vores dedikerede{" "}
            <Link to="/casino-app" className="text-primary underline hover:text-primary/80">
              guide til casino apps
            </Link>{" "}
            for en dybdegående sammenligning.
          </p>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Mobil casino i overblik
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Markedsandel", value: "75 %+ af al dansk casinotrafik" },
                { label: "Teknologi", value: "HTML5 responsive design" },
                { label: "Spil tilgængelige", value: "90-95 % af desktop-katalog" },
                { label: "Betalingsmetoder", value: "MobilePay, Apple Pay, Trustly m.fl." },
                { label: "Sikkerhed", value: "TLS 1.3 / 256-bit SSL + biometri" },
                { label: "Live Casino", value: "Fuldt tilgængeligt med HD-streaming" },
                { label: "Bonusser", value: "Identiske med desktop" },
                { label: "Ansvarligt spil", value: "Alle værktøjer tilgængelige" },
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

        {/* ══════════════════════════════════════════════════════════════
            2. MARKEDET
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="markedet">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            Mobil casino-markedet i Danmark
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Det danske mobil casino-marked har gennemgået en markant transformation over
            det seneste årti. Fra at være en sekundær platform er mobil nu den primære kanal
            for online gambling i Danmark. Her er nøgletallene:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { stat: "75 %+", label: "Mobilandel af dansk casinotrafik" },
              { stat: "4,2 mia. kr.", label: "Bruttospilindtægt fra online casino (2025)" },
              { stat: "38+", label: "Licenserede casinoer med mobiladgang" },
              { stat: "< 3 sek.", label: "Gennemsnitlig loadtid, topmarkerede casinoer" },
            ].map((item) => (
              <Card key={item.label} className="border-border bg-card text-center">
                <CardContent className="p-6">
                  <p className="text-2xl font-bold text-primary mb-1">{item.stat}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Væksten i mobilspil er drevet af flere faktorer: Forbedret mobilteknologi (5G, kraftigere
            processorer, bedre skærme), mobil-first betalingsløsninger som MobilePay og Apple Pay,
            og spilproducenternes skifte til HTML5-baseret udvikling, der sikrer cross-platform
            kompatibilitet uden separate mobilversioner.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Demografisk viser data fra{" "}
            <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">
              Spillemyndigheden
            </Link>{" "}
            at mobilspil er særligt udbredt i aldersgruppen 18-44 år, mens desktop stadig har en
            stærkere position i 45+ segmentet. Det er dog en trend under hurtig forandring, da
            mobilpenetrationen stiger markant i alle aldersgrupper.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For casinooperatørerne er mobiloptimering ikke længere valgfrit – det er en
            forretningskritisk parameter. Casinoer med dårlig mobiloplevelse taber spillere
            til konkurrenter med sekunder. Vores{" "}
            <Link to="/casino-anmeldelser" className="text-primary underline hover:text-primary/80">
              anmeldelsesproces
            </Link>{" "}
            vurderer derfor mobiloplevelsen som en væsentlig parameter i helhedsvurderingen.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            3. APP VS. BROWSER
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="app-vs-browser">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Monitor className="h-7 w-7 text-primary" />
            App vs. browser – hvad er bedst?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            En af de mest stillede spørgsmål om mobil casino er, om man bør bruge en
            dedikeret app eller spille via mobilbrowseren. Svaret afhænger af dine prioriteter.
            For en dybdegående analyse, se vores{" "}
            <Link to="/casino-app" className="text-primary underline hover:text-primary/80">
              komplette guide til casino apps
            </Link>
            . Her er et hurtigt overblik:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Browser (Webapp)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Ingen download nødvendig – spil direkte",
                  "Altid den nyeste version automatisk",
                  "Ingen plads optaget på enheden",
                  "Fungerer på alle enheder og OS",
                  "Let at skifte mellem casinoer",
                  "Kan gemmes som genvej på startskærmen",
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
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  Native App
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Push-notifikationer om bonusser og tilbud",
                  "Marginalt hurtigere performance (cached assets)",
                  "Biometrisk login (Face ID / fingeraftryk)",
                  "Bedre integration med enhedens OS",
                  "Kræver download og opdateringer",
                  "Optager lagerplads (50-200 MB typisk)",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Vores anbefaling:</strong> For de fleste spillere er browseren den
            mest praktiske løsning. Moderne mobile browsere (Safari på iOS, Chrome på Android)
            leverer en oplevelse, der i de fleste tilfælde er uadskillelig fra en native app.
            Du undgår at downloade noget, sparer lagerplads, og har altid den nyeste version.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hvis du primært spiller hos ét casino og værdsætter push-notifikationer om
            eksklusive tilbud, kan en native app dog være et godt supplement. Sikkerhedsmæssigt
            er begge løsninger lige sikre hos licenserede danske casinoer.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            4. TEKNOLOGI
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="teknologi">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Settings className="h-7 w-7 text-primary" />
            Teknologien bag mobil casino
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Moderne mobil casinoer drives af en kombination af avancerede webteknologier,
            der sikrer en flydende og responsiv spiloplevelse:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                icon: Globe,
                title: "HTML5 & WebGL",
                desc: "Erstatningen for Flash. HTML5 sikrer, at spil kører direkte i browseren uden plugins. WebGL muliggør 3D-grafik og avancerede animationer på mobilskærme med hardware-acceleration.",
              },
              {
                icon: Monitor,
                title: "Responsive Design",
                desc: "CSS media queries og flexible grids tilpasser automatisk layoutet til din skærmstørrelse – fra iPhone SE til iPad Pro. Touch-targets er forstørrede for nem navigation.",
              },
              {
                icon: Wifi,
                title: "Progressive Web Apps (PWA)",
                desc: "Mange casinoer tilbyder PWA-funktionalitet: gem som app på startskærmen, offline-caching af UI-elementer, og push-notifikationer – uden App Store download.",
              },
              {
                icon: Zap,
                title: "Lazy Loading & CDN",
                desc: "Spilaktiver indlæses on-demand for at minimere initial loadtid. Content Delivery Networks (CDN) serverer assets fra den nærmeste server for minimal latency.",
              },
              {
                icon: Lock,
                title: "TLS 1.3 Kryptering",
                desc: "Al kommunikation mellem din enhed og casinoet krypteres med den nyeste TLS 1.3 protokol – identisk sikkerhed som internetbankering og MitID.",
              },
              {
                icon: Battery,
                title: "Batterioptimering",
                desc: "Moderne spilmotorer optimerer CPU/GPU-forbrug for at minimere batteridrain. HTML5-spil er typisk mere batterivenlige end native apps med tung grafik.",
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

          <p className="text-muted-foreground leading-relaxed">
            Resultatet af denne teknologiske evolution er, at moderne mobil casinoer leverer
            en oplevelse, der i mange tilfælde er bedre end desktop: touch-baseret navigation
            er mere intuitiv end mus og keyboard for de fleste spil, og biometrisk login
            (Face ID/fingeraftryk) er hurtigere og mere sikkert end traditionelle passwords.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            5. SPIL TILGÆNGELIGE PÅ MOBIL
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="spil">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gamepad2 className="h-7 w-7 text-primary" />
            Spil tilgængelige på mobil
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Moderne mobil casinoer tilbyder et imponerende spiludvalg, der nærmer sig
            paritet med desktop. Her er en oversigt over spilkategorierne:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              {
                title: "Spilleautomater (Slots)",
                desc: "Den største kategori med 1.000+ titler. Alle nye slots fra Pragmatic Play, NetEnt, Nolimit City og Hacksaw Gaming er designet mobile-first med portrait-mode support.",
                coverage: "98 %+",
                link: "/casinospil/spillemaskiner",
              },
              {
                title: "Live Casino",
                desc: "Evolution Gaming, Pragmatic Play Live og Playtech leverer HD-streaming til mobil med interaktive features. Blackjack, roulette, baccarat og game shows.",
                coverage: "95 %+",
                link: "/live-casino",
              },
              {
                title: "Bordspil (RNG)",
                desc: "Blackjack, roulette, baccarat og poker i RNG-format. Alle optimeret til touch-interface med forstørrede knapper og intuitive bet-areas.",
                coverage: "90 %+",
                link: "/casinospil",
              },
              {
                title: "Video Poker",
                desc: "Jacks or Better, Deuces Wild, Joker Poker og andre varianter. Simpelt interface der fungerer perfekt på mobilskærme.",
                coverage: "95 %+",
                link: "/casinospil/poker",
              },
              {
                title: "Game Shows",
                desc: "Crazy Time, Monopoly Live, Dream Catcher og lignende live game shows. Fuldt interaktive med chat og betting-interface på mobil.",
                coverage: "95 %+",
                link: "/casinospil/game-shows",
              },
              {
                title: "Jackpot Slots",
                desc: "Mega Moolah, Mega Fortune, Hall of Gods og progressive jackpots. Ingen forskel i jackpot-størrelse eller vinderchance mellem mobil og desktop.",
                coverage: "90 %+",
                link: "/casinospil/spillemaskiner",
              },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">{item.coverage} mobiltilgængelig</Badge>
                    <Link to={item.link} className="text-xs text-primary hover:underline">Læs mere →</Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            De få spil, der stadig ikke er mobiloptimerede, er typisk ældre titler fra
            før HTML5-æraen. Store producenter som{" "}
            <Link to="/spiludviklere/pragmatic-play" className="text-primary underline hover:text-primary/80">
              Pragmatic Play
            </Link>
            ,{" "}
            <Link to="/spiludviklere/netent" className="text-primary underline hover:text-primary/80">
              NetEnt
            </Link>
            {" "}og{" "}
            <Link to="/spiludviklere/nolimit-city" className="text-primary underline hover:text-primary/80">
              Nolimit City
            </Link>{" "}
            designer nu udelukkende i mobile-first format, hvor desktop-versionen er en
            opadskalerett variant af mobildesignet.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            6. LIVE CASINO PÅ MOBILEN
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="live-casino-mobil">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Eye className="h-7 w-7 text-primary" />
            Live casino på mobilen
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Live casino er en af de mest populære kategorier på mobil, takket være
            den sociale dimension og interaktive karakter.{" "}
            <Link to="/spiludviklere/evolution-gaming" className="text-primary underline hover:text-primary/80">
              Evolution Gaming
            </Link>{" "}
            – verdens førende live casino-udbyder – rapporterer, at over 60 % af alle
            live casino-sessioner nu foregår på mobile enheder.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Mobiloplevelsen for{" "}
            <Link to="/live-casino" className="text-primary underline hover:text-primary/80">
              live casino
            </Link>{" "}
            er blevet markant forbedret de seneste år. HD-streaming tilpasser automatisk
            kvaliteten til din forbindelse (adaptive bitrate), dealer-interface er redesignet
            til touch-navigation, og chat-funktionalitet er fuldt integreret. Portrait-mode
            support gør det muligt at spille med én hånd.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kravene til live casino på mobil er dog højere end for slots:
          </p>
          <div className="rounded-xl border border-border bg-card p-6 mb-6 space-y-3">
            {[
              "Stabil internetforbindelse: Minimum 10 Mbps for HD, 5 Mbps for SD",
              "WiFi anbefales kraftigt – mobildata kan give ustabil streaming",
              "Dataforbrug: 300-500 MB per time i HD-kvalitet",
              "Nyere enhed anbefales: iPhone 11+ / Samsung Galaxy S20+ for optimal oplevelse",
              "Lydløs modus slår ofte dealer-lyd fra – aktiver lyd i app-indstillinger",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            De mest populære live casino-spil på mobil er Lightning Roulette, Blackjack VIP,
            Crazy Time og Monopoly Live. Game show-formatet er særligt populært på mobil, da
            den underholdningsbaserede tilgang og lave minimumsindsatser appellerer til
            casual-spillere, der spiller i kortere sessioner.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            7. BETALINGSMETODER
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="betaling">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <CreditCard className="h-7 w-7 text-primary" />
            Betalingsmetoder på mobil casino
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Mobilvenlige betalingsmetoder er en af de største fordele ved mobil casino.
            Her er de mest populære muligheder, der alle er optimeret til mobilbrug:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold text-foreground">Metode</th>
                  <th className="text-left p-3 font-semibold text-foreground">Indbetaling</th>
                  <th className="text-left p-3 font-semibold text-foreground">Udbetaling</th>
                  <th className="text-left p-3 font-semibold text-foreground">Mobiloplevelse</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { method: "MobilePay", dep: "Øjeblikkelig", wd: "1-24 timer", exp: "★★★★★ – Native integration" },
                  { method: "Apple Pay", dep: "Øjeblikkelig", wd: "1-24 timer", exp: "★★★★★ – Face ID / Touch ID" },
                  { method: "Trustly", dep: "Øjeblikkelig", wd: "1-3 timer", exp: "★★★★☆ – Open banking flow" },
                  { method: "Visa/Mastercard", dep: "Øjeblikkelig", wd: "1-3 dage", exp: "★★★★☆ – 3D Secure popup" },
                  { method: "Skrill", dep: "Øjeblikkelig", wd: "1-24 timer", exp: "★★★★☆ – Separat app" },
                  { method: "Paysafecard", dep: "Øjeblikkelig", wd: "Ej tilgængelig", exp: "★★★☆☆ – PIN-indtastning" },
                ].map((row) => (
                  <tr key={row.method} className="border-b border-border/50">
                    <td className="p-3 font-medium text-foreground">{row.method}</td>
                    <td className="p-3">{row.dep}</td>
                    <td className="p-3">{row.wd}</td>
                    <td className="p-3">{row.exp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">
              MobilePay
            </Link>{" "}
            og{" "}
            <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">
              Apple Pay
            </Link>{" "}
            er de optimale betalingsmetoder for mobil casino, da de er designet specifikt
            til mobilbrug med biometrisk godkendelse. Se vores komplette{" "}
            <Link to="/betalingsmetoder" className="text-primary underline hover:text-primary/80">
              betalingsmetoder-oversigt
            </Link>{" "}
            for alle muligheder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det er vigtigt at bemærke, at danske casinoer ikke må tilbyde kreditbaseret spil
            – du kan kun spille med midler, du allerede har. Alle betalingsmetoder overholder
            dette krav uanset platform. Indbetalingsgrænser gælder også på mobil og kan
            justeres via casinoets kontoindstillinger.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            8. SIKKERHED
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="sikkerhed">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            Sikkerhed og licens
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Sikkerhed er den vigtigste parameter ved valg af mobil casino. Alle casinoer
            med gyldig dansk licens fra{" "}
            <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">
              Spillemyndigheden
            </Link>{" "}
            overholder identiske sikkerhedskrav uanset platform – mobilversionen er ikke
            mindre sikker end desktop.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                icon: Lock,
                title: "Kryptering",
                desc: "TLS 1.3 med 256-bit AES-kryptering beskytter al datatransmission. Certifikater kan verificeres via browseres låse-ikon.",
              },
              {
                icon: Shield,
                title: "Dansk licens",
                desc: "Alle anbefalede casinoer har gyldig dansk licens. Licensen kan verificeres på Spillemyndighedens hjemmeside.",
              },
              {
                icon: Smartphone,
                title: "Biometrisk login",
                desc: "Face ID, Touch ID og fingeraftryk giver et ekstra sikkerhedslag, der faktisk gør mobil mere sikkert end desktop-passwords.",
              },
              {
                icon: Scale,
                title: "ROFUS-integration",
                desc: "Selvudelukkelse via ROFUS gælder fuldt på mobil. Registrering kan ske direkte fra mobilbrowser via MitID-appen.",
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

          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 mt-0.5 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-sm text-foreground mb-1">Advarsel: Undgå ulicenserede mobilcasinoer</p>
                <p className="text-sm text-muted-foreground">
                  Spil aldrig via mobilapps eller sider, der ikke har dansk licens. Ulicenserede
                  casinoer er ikke tilsluttet ROFUS, tilbyder ingen spillerbeskyttelse, og dine
                  penge er ikke sikret. Se vores{" "}
                  <Link to="/casino-licenser" className="text-primary underline hover:text-primary/80">
                    guide til casino licenser
                  </Link>{" "}
                  for at lære, hvordan du verificerer en licens.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            9. PERFORMANCE
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="performance">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Zap className="h-7 w-7 text-primary" />
            Performance og optimering
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Performance er kritisk for mobilcasino-oplevelsen. Her er vores benchmarks
            og anbefalinger:
          </p>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3">Performance-benchmarks</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Acceptable loadtid", value: "Under 5 sekunder" },
                { label: "Optimal loadtid", value: "Under 3 sekunder" },
                { label: "Min. forbindelse (slots)", value: "3 Mbps" },
                { label: "Min. forbindelse (live casino)", value: "10 Mbps" },
                { label: "Dataforbrug (slots)", value: "5-15 MB/time" },
                { label: "Dataforbrug (live casino)", value: "300-500 MB/time" },
                { label: "Anbefalet iOS", value: "iOS 16+ (iPhone 11+)" },
                { label: "Anbefalet Android", value: "Android 12+ (2021+)" },
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

          <h3 className="text-xl font-semibold mb-3">Optimeringstips til spillere</h3>
          <div className="space-y-3 mb-6">
            {[
              "Brug WiFi til live casino – 5G er acceptabelt, men WiFi giver mest stabil forbindelse",
              "Luk baggrunds-apps for at frigøre RAM og reducere batteridrain",
              "Ryd browser-cache regelmæssigt for optimal loadtid",
              "Opdater altid til den nyeste iOS/Android version for bedste kompatibilitet",
              "Aktiver 'Reducer bevægelse' i iOS for bedre performance på ældre enheder",
              "Brug Safari på iOS og Chrome på Android – disse browsere har bedst HTML5-support",
              "Deaktiver VPN under spil – det kan øge latency og forstyrre geolocation",
              "Hold din mobilbrowser opdateret for de nyeste sikkerhedspatches",
            ].map((tip) => (
              <div key={tip} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{tip}</span>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            10. ANSVARLIGT SPIL PÅ MOBIL
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="ansvarligt-spil">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            Ansvarligt spil på mobil
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Mobilspil medfører unikke udfordringer for ansvarligt spil: konstant tilgængelighed,
            private sessioner uden social kontrol, og den umiddelbare nærhed til betalingsmetoder
            gør det ekstra vigtigt at sætte klare grænser.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Alle danske licenserede casinoer tilbyder de samme ansvarligt spil-værktøjer
            på mobil som på desktop:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { icon: Clock, title: "Sessionstidsadvarsler", desc: "Påmindelser efter 30, 60 eller 90 minutters spil. Konfigureres i kontoindstillinger." },
              { icon: Shield, title: "Indbetalingsgrænser", desc: "Daglige, ugentlige og månedlige lofter. Nedsættelse træder i kraft øjeblikkeligt." },
              { icon: TrendingUp, title: "Tabsgrænser", desc: "Sæt et loft over dine tab per dag, uge eller måned." },
              { icon: Lock, title: "Selvudelukkelse", desc: "Midlertidig eller permanent via ROFUS eller direkte hos casinoet." },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <item.icon className="h-5 w-5 text-primary" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vi anbefaler desuden at:
          </p>
          <div className="space-y-2 mb-6">
            {[
              "Sætte indbetalingsgrænser FØR din første session",
              "Undgå at spille i sengen eller under påvirkning af alkohol",
              "Brug 'Skærmtid' (iOS) eller 'Digital Wellbeing' (Android) til at begrænse casino-tid",
              "Fjerne gemte betalingsoplysninger, hvis du har svært ved at kontrollere dit spil",
            ].map((tip) => (
              <div key={tip} className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-1 text-destructive shrink-0" />
                <span className="text-sm text-muted-foreground">{tip}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Hvis du oplever problemer med dit mobilspil, kontakt{" "}
            <Link to="/ansvarligt-spil/stopspillet" className="text-primary underline hover:text-primary/80">
              StopSpillet
            </Link>{" "}
            (70 22 28 25) for gratis, anonym rådgivning, eller tilmeld dig{" "}
            <Link to="/ansvarligt-spil/rofus" className="text-primary underline hover:text-primary/80">
              ROFUS
            </Link>{" "}
            for at blokere din adgang til alle licenserede casinoer. Læs mere i vores{" "}
            <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">
              komplette guide til ansvarligt spil
            </Link>
            .
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            11. VURDERINGSKRITERIER
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="vurderingskriterier">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Star className="h-7 w-7 text-primary" />
            Sådan vurderer vi mobilcasinoer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Vores{" "}
            <Link to="/saadan-tester-vi-casinoer" className="text-primary underline hover:text-primary/80">
              anmeldelsesproces
            </Link>{" "}
            inkluderer en dedikeret mobiltest, hvor vi evaluerer følgende parametre:
          </p>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { param: "Loadtid", weight: "15 %", desc: "Tid til interaktiv på 4G-forbindelse" },
                { param: "Responsivt design", weight: "15 %", desc: "Tilpasning til alle skærmstørrelser" },
                { param: "Touch-navigation", weight: "10 %", desc: "Intuitivt touch-interface og target-størrelse" },
                { param: "Spiludvalg på mobil", weight: "15 %", desc: "Andel af desktop-katalog tilgængelig" },
                { param: "Live casino-kvalitet", weight: "10 %", desc: "Streaming-kvalitet og UI-design" },
                { param: "Betalingsflow", weight: "10 %", desc: "Smidighed af ind-/udbetalingsprocessen" },
                { param: "Ansvarligt spil", weight: "10 %", desc: "Tilgængelighed af alle RS-værktøjer" },
                { param: "Stabilitet", weight: "15 %", desc: "Crash-rate og reconnect-håndtering" },
              ].map((item) => (
                <div key={item.param} className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 mt-1 text-primary shrink-0" />
                  <div>
                    <span className="font-medium text-sm text-foreground">{item.param} ({item.weight}):</span>{" "}
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Vi tester mobilversionen på minimum 3 enheder: iPhone (seneste model), Samsung
            Galaxy (Android flagship) og en budget-Android for at sikre bred kompatibilitet.
            Resultaterne af mobiltesten indgår som en del af den samlede vurdering i vores{" "}
            <Link to="/casino-anmeldelser" className="text-primary underline hover:text-primary/80">
              casino anmeldelser
            </Link>
            .
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            12. HJÆLP OG RESSOURCER
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="hjaelp">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <HelpCircle className="h-7 w-7 text-primary" />
            Hjælp og ressourcer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Her finder du links til alle relevante ressourcer om mobil casino,
            spillerbeskyttelse og regulering i Danmark:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { to: "/casino-app", title: "Casino App Guide", desc: "App vs. browser – komplet sammenligning" },
              { to: "/casino-anmeldelser", title: "Casino Anmeldelser", desc: "Detaljerede anmeldelser med mobiltest" },
              { to: "/betalingsmetoder", title: "Betalingsmetoder", desc: "Alle betalingsløsninger sammenlignet" },
              { to: "/ansvarligt-spil", title: "Ansvarligt Spil", desc: "Ressourcer og værktøjer til ansvarligt spil" },
              { to: "/casino-licenser", title: "Casino Licenser", desc: "Forstå det danske licenssystem" },
              { to: "/ordbog", title: "Casino Ordbog", desc: "Forstå alle casino-termer" },
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

        <LatestNewsByCategory pagePath="/mobil-casino" />
        <RelatedGuides currentPath="/mobil-casino" />
        <FAQSection title="Ofte Stillede Spørgsmål om Mobil Casino" faqs={mobilCasinoFaqs} />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
};

export default MobilCasino;
