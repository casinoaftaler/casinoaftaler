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
    dateModified: "2026-03-18",
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
        <AuthorMetaBar author="jonas" date="18-03-2026" readTime="28 Min." />
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
            10-A. TEKNISK ARKITEKTUR BAG MOBIL CASINO
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="teknisk-arkitektur">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Settings className="h-7 w-7 text-primary" />
            Teknisk Arkitektur bag Mobil Casino
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Moderne mobil casinoer er komplekse tekniske systemer der kombinerer flere
            web-teknologier for at levere en flydende spiloplevelse på tværs af hundredvis
            af forskellige enheder. Her er en dybdegående analyse af den tekniske arkitektur
            der driver dit mobilcasino.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="html5-revolution">
            HTML5-Revolutionen – Fra Flash til Mobil-First
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Indtil 2017 var de fleste online casino-spil bygget med Adobe Flash – en teknologi
            der aldrig fungerede på mobile enheder. Apples beslutning om at blokere Flash på
            iPhone i 2010 katalyserede en brancheomspændende overgang til HTML5. Denne overgang
            tog 5-7 år og resulterede i en fundamental ændring: alle nye spil designes nu
            "mobile-first" med HTML5 Canvas API som primær renderingsplatform.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            HTML5-baserede casino-spil bruger typisk en kombination af <strong>Canvas 2D API</strong>{" "}
            til grundlæggende slot-rendering, <strong>WebGL</strong> til 3D-effekter og avancerede
            animationer, og <strong>Web Audio API</strong> til lydeffekter. Denne arkitektur giver
            cross-platform kompatibilitet uden behov for app-downloads eller plugins. Udbydere
            som Pragmatic Play, NetEnt og Play'n GO har alle fuldt omfavnet HTML5, og deres
            spilmotorer er optimeret til at køre flydende på enheder med A12-chippen og nyere
            (iPhone XS og frem) samt sammenlignelige Android-processorer.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="webgl-3d-slots">
            WebGL & 3D-Slots
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            WebGL (Web Graphics Library) giver casino-spiludbydere adgang til GPU-accelereret
            3D-rendering direkte i browseren. Moderne slots som "Gonzo's Quest Megaways" og
            "Vikings Go Berzerk" bruger WebGL til partikeleffekter, 3D-symbolrotationer og
            cinematiske bonussekvenser. Performance varierer efter enhed:
          </p>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 font-semibold">Teknologi</th>
                      <th className="text-left py-2 pr-4 font-semibold">Anvendelse</th>
                      <th className="text-left py-2 pr-4 font-semibold">GPU-krav</th>
                      <th className="text-left py-2 font-semibold">Kompatibilitet</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Canvas 2D</td><td className="py-2 pr-4">Klassiske slots, UI-elementer</td><td className="py-2 pr-4">Minimal</td><td className="py-2">Alle enheder</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">WebGL 1.0</td><td className="py-2 pr-4">Basis 3D-effekter, partikler</td><td className="py-2 pr-4">Lav</td><td className="py-2">97 %+ af enheder</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">WebGL 2.0</td><td className="py-2 pr-4">Avancerede 3D-slots, shadere</td><td className="py-2 pr-4">Moderat</td><td className="py-2">90 %+ (iOS 15+)</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">WebGPU</td><td className="py-2 pr-4">Next-gen rendering (kommende)</td><td className="py-2 pr-4">Høj</td><td className="py-2">Safari 17+ / Chrome 113+</td></tr>
                    <tr><td className="py-2 pr-4 font-medium text-foreground">WebAssembly</td><td className="py-2 pr-4">Tung beregning, kryptografi</td><td className="py-2 pr-4">CPU-intensiv</td><td className="py-2">Alle moderne browsere</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="webrtc-live-casino">
            WebRTC & Live Casino-Streaming
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Live casino benytter <strong>WebRTC</strong> (Web Real-Time Communication) til at
            streame HD-video fra studier i realtid med minimal latency (typisk 1-3 sekunder).
            WebRTC erstatter ældre HLS-streaming (HTTP Live Streaming) der havde 10-30 sekunders
            forsinkelse – uacceptabelt for interaktive spil som live blackjack.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Evolution Gaming, den dominerende live casino-udbyder, bruger en proprietær
            WebRTC-implementering med adaptive bitrate (ABR) der automatisk justerer
            videokvaliteten baseret på din forbindelseshastighed: 1080p på WiFi, 720p på
            stabil 4G, og 480p som fallback på svag forbindelse. Denne teknologi er grunden
            til at live casino fungerer overraskende godt på mobil i dag. Læs mere om
            device-specifikke anbefalinger i vores{" "}
            <Link to="/mobil-casino/iphone" className="text-primary underline hover:text-primary/80">
              iPhone casino guide
            </Link>{" "}
            og{" "}
            <Link to="/mobil-casino/android" className="text-primary underline hover:text-primary/80">
              Android casino guide
            </Link>.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="service-workers-caching">
            Service Workers & Offline-Caching
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Progressive Web Apps (PWAs) bruger <strong>Service Workers</strong> til at cache
            statiske ressourcer (JavaScript, CSS, billeder, spil-assets) lokalt på din enhed.
            Dette betyder at casino-grænsefladen kan indlæses næsten øjeblikkeligt ved
            efterfølgende besøg – selv med langsom mobildata. Nogle avancerede casinoer
            cacher endda spilmotorer, så selve spillene starter uden synlig loading-tid.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Vigtig nuance:</strong> Service Workers kan cache UI og spilkode, men
            casino-spil kræver altid en aktiv internetforbindelse til serveren for at
            generere og verificere resultater via{" "}
            <Link to="/casino-ordbog/rng" className="text-primary underline hover:text-primary/80">
              Random Number Generator (RNG)
            </Link>. Du kan aldrig spille casino offline – caching handler om performance,
            ikke offline-funktionalitet. Læs mere om PWA-installation i vores{" "}
            <Link to="/casino-app" className="text-primary underline hover:text-primary/80">
              casino app guide
            </Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            10-B. NETVÆRK & LATENCY
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="netvaerk-latency">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Wifi className="h-7 w-7 text-primary" />
            Netværk & Latency – WiFi vs. 4G vs. 5G til Casino
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Din netværksforbindelse har direkte indflydelse på casino-oplevelsen – fra slot-loading
            til live casino-interaktioner. Vi har benchmarket de typiske danske netværksforhold
            for at give dig præcise anbefalinger.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="netvaerk-benchmarks">
            Performance-Benchmarks pr. Netværkstype
          </h3>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 font-semibold">Parameter</th>
                      <th className="text-left py-2 pr-4 font-semibold">WiFi 5 (AC)</th>
                      <th className="text-left py-2 pr-4 font-semibold">WiFi 6E</th>
                      <th className="text-left py-2 pr-4 font-semibold">4G LTE</th>
                      <th className="text-left py-2 pr-4 font-semibold">5G Sub-6</th>
                      <th className="text-left py-2 font-semibold">5G mmWave</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Typisk ping</td><td className="py-2 pr-4">5-15 ms</td><td className="py-2 pr-4">2-8 ms</td><td className="py-2 pr-4">30-60 ms</td><td className="py-2 pr-4">10-25 ms</td><td className="py-2">5-12 ms</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Jitter</td><td className="py-2 pr-4">1-3 ms</td><td className="py-2 pr-4">&lt;1 ms</td><td className="py-2 pr-4">5-20 ms</td><td className="py-2 pr-4">2-8 ms</td><td className="py-2">1-3 ms</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Pakketab</td><td className="py-2 pr-4">&lt;0,1 %</td><td className="py-2 pr-4">&lt;0,05 %</td><td className="py-2 pr-4">0,5-2 %</td><td className="py-2 pr-4">0,1-0,5 %</td><td className="py-2">&lt;0,1 %</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Download</td><td className="py-2 pr-4">50-200 Mbps</td><td className="py-2 pr-4">200-1000 Mbps</td><td className="py-2 pr-4">20-80 Mbps</td><td className="py-2 pr-4">100-300 Mbps</td><td className="py-2">500-2000 Mbps</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Slots-egnet</td><td className="py-2 pr-4">✅ Perfekt</td><td className="py-2 pr-4">✅ Perfekt</td><td className="py-2 pr-4">✅ God</td><td className="py-2 pr-4">✅ Perfekt</td><td className="py-2">✅ Perfekt</td></tr>
                    <tr><td className="py-2 pr-4 font-medium text-foreground">Live casino-egnet</td><td className="py-2 pr-4">✅ Perfekt</td><td className="py-2 pr-4">✅ Perfekt</td><td className="py-2 pr-4">⚠️ Variabel</td><td className="py-2 pr-4">✅ God</td><td className="py-2">✅ Perfekt</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="5g-casino-dk">
            5G i Danmark – Realistisk Casino-Performance
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Danmarks 5G-netværk opererer primært på sub-6 GHz-båndet (3,5 GHz) via TDC NET, Telia
            og 3/Telenor. mmWave (26 GHz) er endnu ikke udbredt i Danmark og forventes tidligst
            i 2026-2027 i større byer. For casino-spillere betyder dette at danske 5G-forbindelser
            typisk leverer 100-300 Mbps med 10-25 ms ping – markant bedre end 4G, men ikke den
            sub-5ms latency som mmWave lover.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I praksis er 5G sub-6 mere end tilstrækkeligt til alle former for mobilcasino, inklusiv
            live casino i HD. Den primære fordel over WiFi er mobiliteten: du kan spille i toget,
            i parken eller på caféen med konsistent performance. For live casino anbefaler vi dog
            stadig WiFi som førstevalg grundet lavere og mere stabil latency.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="vpn-casino">
            VPN & Casino – Latency-Overhead
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Brug af VPN tilføjer typisk 10-30 ms ekstra latency og kan reducere throughput med
            10-20 % grundet krypteringsoverhead. For danske spillere på danske casinoer er VPN
            generelt <strong>ikke nødvendigt</strong> og kan faktisk skabe problemer: mange
            casinoer blokerer VPN-forbindelser for at forhindre geo-spoofing, og din konto kan
            blive suspenderet hvis casinoet detekterer en VPN.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Undtagelse:</strong> Hvis du bruger offentligt WiFi (lufthavne, caféer,
            hoteller), anbefaler vi at bruge VPN for at beskytte mod Man-in-the-Middle-angreb.
            Vælg en dansk VPN-server for minimal latency-overhead. Casinoer med{" "}
            <Link to="/casino-licenser" className="text-primary underline hover:text-primary/80">
              dansk licens
            </Link>{" "}
            kræver at du befinder dig i Danmark, så brug aldrig en udenlandsk VPN-server.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="netvaerk-anbefalinger">
            Netværksanbefalinger pr. Spiltype
          </h3>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 font-semibold">Spiltype</th>
                      <th className="text-left py-2 pr-4 font-semibold">Min. hastighed</th>
                      <th className="text-left py-2 pr-4 font-semibold">Max ping</th>
                      <th className="text-left py-2 font-semibold">Anbefalet netværk</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Spilleautomater</td><td className="py-2 pr-4">2 Mbps</td><td className="py-2 pr-4">200 ms</td><td className="py-2">Alle (inkl. 3G)</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Bordspil (RNG)</td><td className="py-2 pr-4">1 Mbps</td><td className="py-2 pr-4">300 ms</td><td className="py-2">Alle (inkl. 3G)</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Live Blackjack</td><td className="py-2 pr-4">5 Mbps</td><td className="py-2 pr-4">100 ms</td><td className="py-2">WiFi / 5G</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Live Roulette</td><td className="py-2 pr-4">5 Mbps</td><td className="py-2 pr-4">150 ms</td><td className="py-2">WiFi / 5G / stabil 4G</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Game Shows (HD)</td><td className="py-2 pr-4">8 Mbps</td><td className="py-2 pr-4">100 ms</td><td className="py-2">WiFi / 5G</td></tr>
                    <tr><td className="py-2 pr-4 font-medium text-foreground">Crash / Instant</td><td className="py-2 pr-4">1 Mbps</td><td className="py-2 pr-4">80 ms</td><td className="py-2">WiFi / 5G (lav jitter)</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            10-C. MOBIL CASINO UX-ANALYSE
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="ux-analyse">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Eye className="h-7 w-7 text-primary" />
            Mobil Casino UX-Analyse – Brugervenlighed i Dybden
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            User Experience (UX) på mobil casino adskiller sig fundamentalt fra desktop. Mindre
            skærme, touch-baseret input og varierende enhedsformater skaber unikke designudfordringer
            som de bedste casinoer mestrer – og de værste ignorerer.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="touch-targets">
            Touch-Targets – WCAG vs. Casino-Virkelighed
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            WCAG 2.1 (Web Content Accessibility Guidelines) anbefaler minimum 44×44 CSS-pixels
            for touch-targets. Apple specificerer 44pt (ca. 48px) som minimum i deres Human
            Interface Guidelines. I praksis er mange casino-knapper – især bet-justeringer og
            quick-action knapper i spilmotorer – betydeligt mindre, typisk 28-36px. Dette skaber
            frustrerende misklick-situationer, især under tidsbaserede live casino-runder.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            De bedste danske casinoer kompenserer med intelligent spacing: selv om individuelle
            knapper kan være under 44px, sikrer de tilstrækkeligt "dead space" mellem interaktive
            elementer for at minimere fejltryk. Look for casinoer der tilbyder adjustable bet-knapper
            eller pre-set bet-niveauer – disse har typisk bedre mobile UX.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="gesture-navigation">
            Gesture-Navigation i Casino-Kontekst
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Moderne smartphones bruger gesture-baseret navigation (swipe fra bund for hjem,
            swipe fra kant for tilbage). Disse system-gestures kan konflikte med casino-spil:
            et uforvarende back-swipe kan lukke et spil midt i en bonus-runde, og swipe-up
            kan aktivere Control Center over et kritisk interface-element.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Best practice:</strong> Brug Guided Access (iOS: Indstillinger → Tilgængelighed →
            Guided Access) eller App Pinning (Android) for at låse skærmen til casino-browseren
            under spil. Dette deaktiverer system-gestures og forhindrer utilsigtede afbrydelser.
            Alternativt kan du installere casinoet som PWA – PWA-apps kører i fullscreen-mode
            uden browser-chrome, hvilket eliminerer de fleste gesture-konflikter.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="haptic-feedback">
            Haptic Feedback – Taktil Respons i Casino
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Apples Taptic Engine og Androids Vibration API giver mulighed for sofistikeret
            haptisk feedback i casino-webapps. Nogle avancerede spiludbydere implementerer
            vibrationer ved wins, bonus-triggers og knaptryk for at forstærke den taktile
            oplevelse. Web Vibration API'en er dog kun tilgængelig i Chrome/Android – Safari
            på iOS understøtter den <strong>ikke</strong>, hvilket betyder at iPhone-brugere
            mister denne dimension medmindre de bruger en native casino-app.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="portrait-vs-landscape">
            Portrait vs. Landscape – Orienterings-Analyse
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Spilorienteringen har markant indflydelse på oplevelsen, og den optimale
            orientering varierer efter spiltype:
          </p>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 font-semibold">Spiltype</th>
                      <th className="text-left py-2 pr-4 font-semibold">Bedste Orientering</th>
                      <th className="text-left py-2 font-semibold">Begrundelse</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Klassiske slots (3×3, 5×3)</td><td className="py-2 pr-4">Portrait</td><td className="py-2">Hjulene fylder skærmen bedst vertikalt</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Megaways slots (6×7+)</td><td className="py-2 pr-4">Landscape</td><td className="py-2">Stort grid kræver bredde</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Live Blackjack</td><td className="py-2 pr-4">Landscape</td><td className="py-2">Bord + kort + video kræver bredde</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Live Roulette</td><td className="py-2 pr-4">Landscape</td><td className="py-2">Betting-grid er bredere end højt</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Game Shows</td><td className="py-2 pr-4">Landscape</td><td className="py-2">Video-stream i 16:9</td></tr>
                    <tr><td className="py-2 pr-4 font-medium text-foreground">Crash / Instant Games</td><td className="py-2 pr-4">Portrait</td><td className="py-2">Simpelt UI, grafen er vertikal</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-muted-foreground leading-relaxed mb-4">
            De fleste moderne casino-spil understøtter begge orienteringer, men UI-layoutet
            ændres: i portrait flyttes kontroller typisk under spilområdet, mens de i landscape
            placeres ved siden af. Test begge orienteringer for at finde din foretrukne
            opsætning. For den mest immersive oplevelse kan du overveje en{" "}
            <Link to="/mobil-casino/tablet" className="text-primary underline hover:text-primary/80">
              tablet til casino
            </Link>{" "}
            der eliminerer orienterings-kompromiser.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            10-D. SIKKERHEDSARKITEKTUR I DYBDEN
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="sikkerhed-deep-dive">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Lock className="h-7 w-7 text-primary" />
            Sikkerhedsarkitektur i Dybden – Sådan Beskyttes Dit Casino
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Online casino-sikkerhed på mobil involverer flere lag af beskyttelse – fra
            transportkryptering til biometrisk autentificering. Her er en teknisk gennemgang
            af de vigtigste sikkerhedsmekanismer.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="tls-handshake">
            TLS 1.3 Handshake – Hvad Sker Ved Hvert Casino-Besøg
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Når du åbner et casino på din mobil, sker følgende kryptografiske handshake
            inden for millisekunder: Din browser og casinoets server udveksler kryptografiske
            nøgler via TLS 1.3-protokollen. I modsætning til TLS 1.2 kræver TLS 1.3 kun
            én roundtrip (1-RTT), hvilket reducerer connection-time med ~50 ms. Hele din
            session – fra login til indbetaling til spilresultater – er derefter krypteret
            med AES-256-GCM.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Danske casinoer med{" "}
            <Link to="/casino-licenser" className="text-primary underline hover:text-primary/80">
              Spillemyndigheden-licens
            </Link>{" "}
            er forpligtede til at bruge stærk kryptering. Du kan verificere et casinos
            TLS-version ved at trykke på hængelåsikonet i Safari/Chrome og inspicere
            certifikatet. Look for: TLS 1.3, 256-bit kryptering, og et gyldigt
            EV (Extended Validation) eller OV (Organization Validated) certifikat.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="certificate-pinning">
            Certificate Pinning i Casino-Apps
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Native casino-apps kan implementere <strong>certificate pinning</strong> – en
            teknik der hardcoder casinoets specifikke SSL-certifikat i appen. Dette forhindrer
            Man-in-the-Middle-angreb selv med et kompromitteret Certificate Authority (CA).
            Webapp-baserede casinoer kan ikke bruge certificate pinning, men kompenserer
            med HSTS (HTTP Strict Transport Security) headers der forhindrer HTTPS-downgrade.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="biometrisk-flow">
            Biometrisk Autentificering – Teknisk Flow
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Når du logger ind på et casino med Face ID eller fingeraftryk, sker følgende
            tekniske process:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-4">
            <li>Du trykker på login-feltet – Safari foreslår gemt password fra Keychain</li>
            <li>iOS aktiverer biometrisk sensor (Face ID / Touch ID)</li>
            <li>Secure Enclave matcher biometri mod gemt reference – hele processen sker on-device</li>
            <li>Ved match: Secure Enclave frigiver den kryptografiske nøgle til Keychain-entry</li>
            <li>Keychain dekrypterer og autofylder brugernavn + password i Safari</li>
            <li>Safari sender credentials til casinoet via TLS 1.3-forbindelsen</li>
            <li>Casinoet verificerer og returnerer en session-token</li>
          </ol>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bemærk: Dine biometriske data forlader <strong>aldrig</strong> din enhed. Casinoet
            modtager kun dit brugernavn og password – det ved ikke om du brugte Face ID, Touch
            ID eller tastaturet til at logge ind. Dette er en fundamental sikkerhedsfordel ved
            Apples arkitektur.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="offentligt-wifi">
            Sikkerhed på Offentligt WiFi
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Offentlige WiFi-netværk (lufthavne, hoteller, caféer) udgør en potentiel
            sikkerhedsrisiko for casino-spil, da angribere kan opsætte "evil twin"-netværk
            der efterligner legitime access points. Selv med TLS-kryptering kan metadata
            (hvilke sider du besøger, hvornår) potentielt opfanges.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Anbefalinger for casino på offentligt WiFi:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li>Brug altid VPN med en dansk server</li>
            <li>Verificer netværksnavnet med personalet (undgå "Free Airport WiFi"-kloner)</li>
            <li>Brug mobildata i stedet – det er inherent mere sikkert end offentligt WiFi</li>
            <li>Undgå store transaktioner (indbetalinger/udbetalinger) på offentligt WiFi</li>
            <li>Aktiver "Privat WiFi-adresse" i iOS (Indstillinger → WiFi → [netværk] → Privat adresse)</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-4">
            iOS's iCloud Private Relay (kræver iCloud+-abonnement) kan også beskytte din
            browsing ved at route trafik via to separate relays, så hverken Apple eller
            netværksudbyderen kan se både din IP-adresse og de sider du besøger.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            10-E. MOBIL CASINO VS. DESKTOP – KOMPLET SAMMENLIGNING
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="mobil-vs-desktop">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Monitor className="h-7 w-7 text-primary" />
            Mobil Casino vs. Desktop – Den Komplette Sammenligning
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Er mobil eller desktop bedst til casino? Svaret afhænger af din spillestil,
            spiltyper og prioriteringer. Her er en udtømmende sammenligning på tværs af 16
            parametre baseret på vores test af 10+ danske casinoer.
          </p>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 font-semibold">Parameter</th>
                      <th className="text-left py-2 pr-4 font-semibold">Mobil</th>
                      <th className="text-left py-2 pr-4 font-semibold">Desktop</th>
                      <th className="text-left py-2 font-semibold">Vinder</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Tilgængelighed</td><td className="py-2 pr-4">Spil overalt, 24/7</td><td className="py-2 pr-4">Begrænset til skrivebord</td><td className="py-2">📱 Mobil</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Skærmstørrelse</td><td className="py-2 pr-4">5,4-6,9" (13-17 cm)</td><td className="py-2 pr-4">13-32" (33-81 cm)</td><td className="py-2">🖥️ Desktop</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Live casino-oplevelse</td><td className="py-2 pr-4">God (landscape)</td><td className="py-2 pr-4">Fremragende (multi-table)</td><td className="py-2">🖥️ Desktop</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Slots-performance</td><td className="py-2 pr-4">Fremragende</td><td className="py-2 pr-4">Fremragende</td><td className="py-2">🤝 Uafgjort</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Biometrisk login</td><td className="py-2 pr-4">Face ID / fingeraftryk</td><td className="py-2 pr-4">Begrænset (Windows Hello)</td><td className="py-2">📱 Mobil</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Betalingshastighed</td><td className="py-2 pr-4">Apple Pay / MobilePay instant</td><td className="py-2 pr-4">Kreditkort / bankoverførsel</td><td className="py-2">📱 Mobil</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Multi-tasking</td><td className="py-2 pr-4">Split view (begrænset)</td><td className="py-2 pr-4">Flere vinduer, monitore</td><td className="py-2">🖥️ Desktop</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Spiludvalg</td><td className="py-2 pr-4">90-95 % af katalog</td><td className="py-2 pr-4">100 % af katalog</td><td className="py-2">🖥️ Desktop</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Dataforbrug</td><td className="py-2 pr-4">Begrænset mobildata</td><td className="py-2 pr-4">Ubegrænset (typisk)</td><td className="py-2">🖥️ Desktop</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Sikkerhed</td><td className="py-2 pr-4">Sandbox + biometri</td><td className="py-2 pr-4">Åben – malware-risiko</td><td className="py-2">📱 Mobil</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Push-notifikationer</td><td className="py-2 pr-4">Ja (PWA / native app)</td><td className="py-2 pr-4">Browser-notifikationer</td><td className="py-2">📱 Mobil</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Ansvarligt spil</td><td className="py-2 pr-4">Skærmtid + spillegrænser</td><td className="py-2 pr-4">Kun spillegrænser</td><td className="py-2">📱 Mobil</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Batteribegrænsning</td><td className="py-2 pr-4">2-12 timer (spilafhængigt)</td><td className="py-2 pr-4">Ingen (stikkontakt)</td><td className="py-2">🖥️ Desktop</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Ergonomi</td><td className="py-2 pr-4">Håndholdt, nak/hånd-belastning</td><td className="py-2 pr-4">Mus + tastatur, bedre holdning</td><td className="py-2">🖥️ Desktop</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4 font-medium text-foreground">Bonusser</td><td className="py-2 pr-4">Samme (+ mobil-eksklusive)</td><td className="py-2 pr-4">Samme</td><td className="py-2">📱 Mobil</td></tr>
                    <tr><td className="py-2 pr-4 font-medium text-foreground">Loading-tid</td><td className="py-2 pr-4">1-3 sek (PWA cached)</td><td className="py-2 pr-4">1-5 sek (browser)</td><td className="py-2">📱 Mobil</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="hvornaar-mobil-bedst">
            Hvornår er Mobil Bedst?
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li><strong>Quick sessions:</strong> 5-30 minutters slots eller bordspil undervejs</li>
            <li><strong>Indbetalinger:</strong> Apple Pay / MobilePay er hurtigere end desktop</li>
            <li><strong>Casual spil:</strong> Slots, crash games, instant wins</li>
            <li><strong>Bonusjagt:</strong> Hurtig aktivering af daglige free spins og kampagner</li>
            <li><strong>Ansvarligt spil:</strong> iOS Skærmtid giver ekstra kontrol</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="hvornaar-desktop-bedst">
            Hvornår er Desktop Bedst?
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li><strong>Live casino:</strong> Større skærm giver bedre overblik og multi-table</li>
            <li><strong>Strategi-spil:</strong> Blackjack/poker kræver overblik over kort og statistics</li>
            <li><strong>Lange sessioner:</strong> Ingen batteribekymring, bedre ergonomi</li>
            <li><strong>Research:</strong> Sammenligning af casinoer, bonusvilkår, paytables</li>
            <li><strong>Komplekse spil:</strong> De 5 % af spil der kun findes på desktop</li>
          </ul>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            10-F. FREMTIDENS MOBIL CASINO
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="fremtiden">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-primary" />
            Fremtidens Mobil Casino – Teknologier 2025-2030
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Mobil casino-industrien er i konstant evolution. Her er de teknologier der vil
            forme de næste 5 års mobile casino-oplevelser.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="ar-vr-casino">
            AR/VR – Immersiv Casino i Stuen
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Apple Vision Pro (lanceret 2024) og Meta Quest 3 åbner for augmented og virtual
            reality casino-oplevelser. Forestil dig at sidde i din stue mens et virtuelt
            roulette-bord materialiserer sig foran dig, eller at se en live dealer i fuld
            størrelse via AR-overlays. Flere udbydere eksperimenterer allerede med VR-casino:
            Evolution Gaming har vist prototyper af VR-live casino, og PokerStars VR har været
            tilgængelig i flere år.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For danske spillere er VR-casino stadig i sin spæde fase: ingen danske licenserede
            casinoer tilbyder dedikerede VR-oplevelser endnu. Teknologien kræver desuden
            regulatorisk afklaring – Spillemyndigheden har endnu ikke udgivet guidelines
            for VR-gambling. Vi forventer de første danske VR-casino-piloter i 2026-2027.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="ai-personalisering">
            AI-Personalisering & Ansvarligt Spil-AI
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kunstig intelligens revolutionerer allerede mobil casino på to fronter: på
            den kommercielle side bruger casinoer AI til at personalisere spilanbefalinger,
            bonustilbud og UI-layout baseret på din spilleadfærd. På den ansvarlige side
            udvikler udbydere AI-modeller der detekterer problematisk spilleadfærd i realtid –
            f.eks. pludselige stigninger i indsatsniveau, øget sessionsfrekvens eller "chasing
            losses"-mønstre.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I 2025 kræver nye EU-regulativer at casinoer implementerer
            "early warning systems" for ludomani. Disse AI-systemer vil analysere
            spillemønstre på tværs af enheder og proaktivt foreslå{" "}
            <Link to="/ansvarligt-spil/spillegraenser" className="text-primary underline hover:text-primary/80">
              spillegrænser
            </Link>{" "}
            eller pauser før spilleren selv erkender behovet. Apple Intelligence på iOS 18+
            kan i fremtiden integrere med disse systemer for at give notifikationer direkte
            i iOS's Focus-mode.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="wearables-casino">
            Wearables – Casino på Håndleddet
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Apple Watch og Android Wear-enheder er (endnu) for små til egentligt casino-spil,
            men de spiller en voksende rolle i casino-økosystemet som notifikationsenheder:
            real-time alerts for bonusaktiveringer, turneringsresultater, jackpot-opdateringer
            og sessionsvarslinger. Nogle casinoer eksperimenterer med Watch-kompatible
            micro-games (scratch cards, simple wheel-of-fortune spil), men den begrænsede
            skærmstørrelse (41-49mm) gør meningfuldt gameplay udfordrende.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Mere spændende er sundhedsintegration: Apple Watch kan måle pulsfrekvens og
            stresskurver under spil, hvilket i teorien kunne bruges som input til ansvarligt
            spil-systemer – en forhøjet puls kombineret med eskalerende indsatser kunne
            trigger en automatisk pause-anbefaling.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3" id="6g-edge-computing">
            6G & Edge Computing – Sub-Millisekund Casino
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            6G-netværk, forventet i 2030+, lover latency under 1 millisekund – usynlig for
            mennesket. Kombineret med Multi-access Edge Computing (MEC), hvor casino-servere
            fysisk placeres tættere på brugeren (i mobilmasten), vil fremtidens mobile
            casino-oplevelse være umulig at skelne fra en lokal applikation.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Edge computing muliggør også server-side rendering af komplekse spilscener: i stedet
            for at din telefon beregner 3D-grafik lokalt, streames færdig-renderede frames fra
            en edge-server med GPU-acceleration – ligesom cloud gaming (Xbox Cloud Gaming,
            GeForce NOW). For casino-spil betyder dette at selv budget-telefoner vil kunne
            køre de mest grafisk krævende spil flydende.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Indtil 6G ankommer, kan du allerede nu opleve den bedste mobile casino-teknologi
            via vores{" "}
            <Link to="/mobil-casino/bedste-apps" className="text-primary underline hover:text-primary/80">
              rangering af de bedste casino apps
            </Link>{" "}
            – testet og rangeret af vores redaktion.
          </p>
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
              { to: "/mobil-casino/iphone", title: "Casino på iPhone", desc: "iOS-guide: Safari PWA, Face ID og performance" },
              { to: "/mobil-casino/android", title: "Casino på Android", desc: "APK-sikkerhed, Google Play og fragmentering" },
              { to: "/mobil-casino/tablet", title: "Casino på Tablet", desc: "iPad vs. Android tablets til live casino" },
              { to: "/mobil-casino/bedste-apps", title: "Bedste Casino Apps 2026", desc: "Top 10 apps med vægtet scoring-model" },
              { to: "/casino-anmeldelser", title: "Casino Anmeldelser", desc: "Detaljerede anmeldelser med mobiltest" },
              { to: "/betalingsmetoder", title: "Betalingsmetoder", desc: "Alle betalingsløsninger sammenlignet" },
              { to: "/ansvarligt-spil", title: "Ansvarligt Spil", desc: "Ressourcer og værktøjer til ansvarligt spil" },
              { to: "/casino-licenser", title: "Casino Licenser", desc: "Forstå det danske licenssystem" },
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
