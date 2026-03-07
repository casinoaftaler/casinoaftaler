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
import casinoAppHero from "@/assets/heroes/casino-app-hero.jpg";
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
  Download,
  Star,
  TrendingUp,
  CreditCard,
  Gamepad2,
  Eye,
  Settings,
  Bell,
  RefreshCw,
  Info,
  Trophy,
  Apple,
  MonitorSmartphone,
  Search,
  Heart,
} from "lucide-react";

// ────────────────────────────────────────────────────────────────
// FAQ Data
// ────────────────────────────────────────────────────────────────
const casinoAppFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er en casino app?",
    answer: (
      <>
        En casino app er en dedikeret mobilapplikation, der downloades fra App Store (iOS)
        eller Google Play (Android) og giver adgang til et online casinos spil, betalinger
        og kontofunktioner. Casino apps adskiller sig fra browserbaserede mobilcasinoer ved
        at være installeret direkte på enheden, hvilket muliggør push-notifikationer, biometrisk
        login og marginalt hurtigere performance. Alle casino apps fra{" "}
        <Link to="/casino-licenser" className="text-primary underline hover:text-primary/80">
          danske licenserede casinoer
        </Link>{" "}
        overholder de samme sikkerhedsstandarder som desktop- og browserversioner.
      </>
    ),
  },
  {
    question: "Er casino apps sikre at bruge?",
    answer:
      "Ja, forudsat appen er downloadet fra officielle app stores (App Store eller Google Play) og tilhører et casino med gyldig dansk licens. Apps gennemgår Apples/Googles review-proces, der screener for malware og sikkerhedsproblemer. Licenserede casino apps bruger samme TLS 1.3 kryptering som browserversionen og integrerer biometrisk autentificering (Face ID / fingeraftryk) for ekstra sikkerhed. Download ALDRIG casino apps fra tredjepartskilder eller direkte APK-filer – dette er en sikkerhedsrisiko.",
  },
  {
    question: "Hvilke danske casinoer har en app?",
    answer: (
      <>
        Flere danske licenserede casinoer tilbyder dedikerede apps, heriblandt LeoVegas
        (prisbelønnet mobilapp), Unibet, bet365, Danske Spil og Mr Green. Ikke alle casinoer
        har dog native apps – mange satser i stedet på optimerede webapps, der fungerer
        lige så godt via browseren. Se vores{" "}
        <Link to="/casino-anmeldelser" className="text-primary underline hover:text-primary/80">
          casino anmeldelser
        </Link>{" "}
        for detaljerede oplysninger om hvert casinos mobiltilbud.
      </>
    ),
  },
  {
    question: "Er spiludvalget det samme i appen som på desktop?",
    answer:
      "I de fleste tilfælde ja – apps tilbyder typisk 90-95 % af desktop-spiludvalget. Alle populære kategorier er repræsenteret: spilleautomater, live casino, bordspil og video poker. Nogle få ældre spiltitler er muligvis ikke tilgængelige i app-format, men alle nye spil designes som mobile-first. Live casino fungerer fuldt i apps med HD-streaming, interaktive dealer-funktioner og chat.",
  },
  {
    question: "Kan jeg bruge den samme konto i app og browser?",
    answer:
      "Ja, absolut. Din casinokonto er platformuafhængig – du bruger de samme loginoplysninger uanset om du tilgår casinoet via app, mobilbrowser eller desktop. Din saldo, bonusser, spillehistorik og kontobegrænsninger synkroniseres automatisk i realtid. Du kan problemfrit skifte mellem platforme midt i en session (undtagen under aktive live casino-runder).",
  },
  {
    question: "Hvorfor kan jeg ikke finde casino apps i App Store?",
    answer:
      "Apple og Google har strenge retningslinjer for gambling-apps. Casino apps skal opfylde lokale regulatoriske krav (dansk licens), verificere brugerens alder og geolokation, og gennemgå en udvidet review-proces. Nogle casinoer vælger derfor at fokusere på browserbaserede webapps i stedet. Hvis du ikke kan finde et specifikt casino i App Store, kan du typisk bruge deres mobiloptimerede hjemmeside via Safari – oplevelsen er i mange tilfælde identisk.",
  },
  {
    question: "Hvor meget plads optager en casino app?",
    answer:
      "Casino apps varierer typisk i størrelse fra 50-200 MB ved installation. Efterfølgende kan caching af spilaktiver øge lagringsforbruget til 200-500 MB over tid. Sammenlignet med populære spil-apps (1-3 GB) er casino apps relativt lette. Du kan altid rydde appens cache via enhedens indstillinger for at frigøre plads, uden at miste dine kontoinformationer.",
  },
  {
    question: "Får jeg push-notifikationer fra casino apps?",
    answer:
      "Ja, push-notifikationer er en af de primære fordele ved native apps. Du kan modtage meddelelser om: nye bonustilbud, free spins, lotteritræknigner, turnerings-updates og kontobeskeder. Notifikationer kan tilpasses eller deaktiveres helt i appens indstillinger eller via din enheds notifikationscentral. Vi anbefaler at være selektiv med notifikationer – for mange kan opfordre til overdrevent spil.",
  },
  {
    question: "Hvad er forskellen på en native app og en PWA?",
    answer:
      "En native app downloades fra App Store/Google Play og installeres direkte på enheden. Den har fuld adgang til enhedens funktioner (kamera, biometri, push-notifikationer) og opdateres via app stores. En Progressive Web App (PWA) er en webapp, der kan 'installeres' via browseren – den gemmes som en genvej på startskærmen, kan fungere offline (delvist) og understøtter push-notifikationer i mange browsere. PWAs kræver ingen download, men har lidt mere begrænset hardware-adgang end native apps.",
  },
  {
    question: "Skal jeg opdatere min casino app regelmæssigt?",
    answer:
      "Ja. App-opdateringer indeholder typisk: sikkerhedspatches, nye spiltitler, bug fixes, performance-forbedringer og nye features. Vi anbefaler at aktivere automatiske opdateringer for casino apps, da sikkerhedsopdateringer er kritiske. Forældede apps kan have kendte sårbarheder, der kan udnyttes af ondsindede aktører. Opdateringer er gratis og tager typisk 30-60 sekunder at installere.",
  },
];

const CasinoApp = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(casinoAppFaqs);

  const articleJsonLd = buildArticleSchema({
    headline: "Casino App – Komplet Guide til Casino Apps i Danmark 2026",
    description:
      "Alt om casino apps: Download, sikkerhed, spiludvalg, iOS vs. Android, PWA vs. native app, og de bedste casino apps med dansk licens. Komplet guide.",
    url: `${SITE_URL}/casino-app`,
    datePublished: "2026-03-07",
    dateModified: "2026-03-07",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Casino App – Bedste Casino Apps med Dansk Licens 2026"
        description="Alt om casino apps i Danmark: Download, sikkerhed, iOS vs. Android, PWA vs. native, spiludvalg og de bedste casino apps med dansk licens. Komplet guide."
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
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Casino Guides
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Casino App – Guide til Casino Apps i Danmark
            </h1>
            <p className="text-lg text-white/80">
              Komplet guide til casino apps: Download, sikkerhed, iOS vs. Android,
              native app vs. PWA, og de bedste apps med dansk licens.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="2026-03-07" readTime="25 Min." />
        <p className="text-sm text-muted-foreground mt-2 mb-6">
          Testet og skrevet af Jonas Theill, casino bonus ekspert hos Casinoaftaler.dk.
        </p>

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={casinoAppHero}
            alt="Casino app guide – smartphones med casino applikationer, download-knapper og app store præsentation"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>


        {/* ══════════════════════════════════════════════════════════════
            1. HVAD ER EN CASINO APP?
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="hvad-er-casino-app">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Download className="h-7 w-7 text-primary" />
            Hvad er en casino app?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            En casino app er en dedikeret mobilapplikation, der giver dig adgang til et
            online casinos fulde spiludvalg, betalingsfunktioner og kontostyring direkte
            fra din smartphone eller tablet. Casino apps downloades fra App Store (iOS)
            eller Google Play (Android) og installeres som enhver anden app.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I modsætning til at spille via mobilbrowseren, tilbyder native casino apps
            typisk push-notifikationer om bonusser, biometrisk login (Face ID / fingeraftryk),
            marginalt hurtigere performance, og bedre integration med enhedens hardware.
            For en bredere forståelse af mobilspil, se vores{" "}
            <Link to="/mobil-casino" className="text-primary underline hover:text-primary/80">
              komplette guide til mobil casino
            </Link>
            .
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det er vigtigt at skelne mellem to typer casino apps: Native apps, der downloades
            fra app stores, og Progressive Web Apps (PWA), der installeres via browseren.
            Begge typer er lovlige og sikre hos{" "}
            <Link to="/casino-licenser" className="text-primary underline hover:text-primary/80">
              danske licenserede casinoer
            </Link>
            , men de har forskellige fordele og begrænsninger, som vi gennemgår i detaljer nedenfor.
          </p>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Casino apps i overblik
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Tilgængelig via", value: "App Store, Google Play eller PWA" },
                { label: "Størrelse", value: "50-200 MB (native app)" },
                { label: "Push-notifikationer", value: "Ja (native) / Delvist (PWA)" },
                { label: "Biometrisk login", value: "Face ID, fingeraftryk" },
                { label: "Spiludvalg", value: "90-95 % af desktop-katalog" },
                { label: "Betalingsmetoder", value: "Alle inkl. Apple Pay, MobilePay" },
                { label: "Sikkerhed", value: "TLS 1.3 + app store review" },
                { label: "Dansk licens krav", value: "Obligatorisk for alle apps" },
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
            2. TYPER AF CASINO APPS
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="typer">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <MonitorSmartphone className="h-7 w-7 text-primary" />
            Typer af casino apps
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Der er tre primære typer casino apps, hver med sine styrker:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                title: "Native App",
                icon: Download,
                items: [
                  "Downloadet fra App Store / Google Play",
                  "Fuld hardware-adgang (kamera, biometri)",
                  "Push-notifikationer",
                  "Hurtigst performance (cached assets)",
                  "Kræver regelmæssige opdateringer",
                  "Optager lagerplads",
                ],
              },
              {
                title: "Progressive Web App (PWA)",
                icon: Globe,
                items: [
                  "Installeres via browser ('Føj til startskærm')",
                  "Ingen app store download nødvendig",
                  "Delvist offline-funktionalitet",
                  "Push-notifikationer (de fleste browsere)",
                  "Automatisk opdatering",
                  "Minimal lagerplads",
                ],
              },
              {
                title: "Responsive Webapp",
                icon: Smartphone,
                items: [
                  "Tilgås direkte via mobilbrowser",
                  "Ingen installation nødvendig",
                  "Altid seneste version",
                  "Fungerer på alle enheder",
                  "Kræver internetforbindelse",
                  "Ingen push-notifikationer",
                ],
              },
            ].map((type) => (
              <Card key={type.title} className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <type.icon className="h-5 w-5 text-primary" />
                    {type.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  {type.items.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <ArrowRight className="h-3.5 w-3.5 mt-1 text-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            3. iOS VS. ANDROID
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="ios-vs-android">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Settings className="h-7 w-7 text-primary" />
            iOS vs. Android – forskelle for casino apps
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Der er væsentlige forskelle i, hvordan Apple og Google håndterer casino apps,
            som påvirker din oplevelse:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  iOS (iPhone / iPad)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Apple har en restriktiv tilgang til gambling-apps. Casino apps skal overholde
                Apples specifikke retningslinjer (Section 5.3.3) og dokumentere lovlig licensering
                i hvert land. Fordele ved iOS:</p>
                {[
                  "Streng app-review sikrer kvalitet og sikkerhed",
                  "Face ID og Touch ID fuldt integreret",
                  "Apple Pay integration for hurtig betaling",
                  "Webkit-motor optimeret til Safari PWAs",
                  "Notarisering beskytter mod malware",
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
                  <Smartphone className="h-5 w-5 text-primary" />
                  Android
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Google Play har historisk været mere fleksibel med gambling-apps, men har
                skærpet kravene betydeligt. I nogle markeder tillader Google nu kun apps fra
                licenserede operatører. Fordele ved Android:</p>
                {[
                  "Flere casino apps tilgængelige i Google Play",
                  "Mulighed for sideloading (APK) – dog ikke anbefalet",
                  "Bedre PWA-support end Safari (Chrome)",
                  "Fingeraftryk og ansigtsscanning",
                  "Google Pay integration på udvalgte casinoer",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 mt-0.5 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-sm text-foreground mb-1">Advarsel: Undgå sideloaded APK-filer</p>
                <p className="text-sm text-muted-foreground">
                  Download aldrig casino apps fra tredjepartskilder eller som APK-filer. Disse
                  kan indeholde malware, keyloggers eller phishing-software. Brug udelukkende
                  App Store eller Google Play for at sikre, at appen er verificeret og sikker.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            4. DOWNLOAD GUIDE
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="download">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Download className="h-7 w-7 text-primary" />
            Sådan downloader du en casino app
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            At downloade en casino app er nemt og sikkert, når du følger de rigtige trin:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base">iOS (iPhone/iPad)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Åbn App Store på din iPhone/iPad",
                  "Søg efter casinoets navn (f.eks. 'LeoVegas' eller 'Unibet')",
                  "Verificer, at udgiveren matcher casinoets officielle navn",
                  "Tryk 'Hent' og autentificer med Face ID / Touch ID",
                  "Åbn appen og log ind med dine eksisterende kontooplysninger",
                  "Aktiver biometrisk login for hurtig adgang fremover",
                ].map((step, i) => (
                  <div key={step} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base">Android</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Åbn Google Play Store på din Android-enhed",
                  "Søg efter casinoets navn i søgefeltet",
                  "Verificer udgivernavn og anmeldelser (minimum 4+ stjerner)",
                  "Tryk 'Installer' og accepter tilladelser",
                  "Åbn appen og log ind med dine eksisterende kontooplysninger",
                  "Aktiver fingeraftrykslås for sikker og hurtig adgang",
                ].map((step, i) => (
                  <div key={step} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            5. SIKKERHED
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="sikkerhed">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            Sikkerhed og privatlivsbeskyttelse
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Casino app-sikkerhed er flerlaget og involverer samspil mellem app stores,
            operatørens infrastruktur og din enheds sikkerhedsfunktioner:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                icon: Search,
                title: "App Store Review",
                desc: "Alle casino apps gennemgår Apples/Googles review-proces, der screener for malware, uautoriseret dataindsamling og sikkerhedshuller. Apps skal dokumentere gyldig licens.",
              },
              {
                icon: Lock,
                title: "End-to-end kryptering",
                desc: "TLS 1.3 / 256-bit AES-kryptering beskytter al kommunikation. Certificate pinning forhindrer man-in-the-middle angreb på app-niveau.",
              },
              {
                icon: Smartphone,
                title: "Biometrisk autentificering",
                desc: "Face ID, Touch ID og fingeraftryksscanning erstatter passwords for hurtigere og mere sikker login. Biometriske data forlader aldrig din enhed.",
              },
              {
                icon: Shield,
                title: "Dansk licens-krav",
                desc: "Alle casino apps rettet mod danske spillere SKAL have gyldig dansk licens fra Spillemyndigheden. Licensen kan verificeres online.",
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

          <h3 className="text-xl font-semibold mb-3">Privatlivsanbefalinger</h3>
          <div className="space-y-2 mb-6">
            {[
              "Gennemgå app-tilladelser: Casino apps bør kun kræve adgang til kamera (ID-verifikation), lokation (geolocation) og notifikationer",
              "Deaktiver unødvendige tilladelser (kontakter, fotos, mikrofon er aldrig nødvendige)",
              "Brug unik adgangskode til din casinokonto – genbrug aldrig passwords",
              "Aktiver to-faktor autentificering (2FA) hvis tilgængeligt",
              "Log altid ud af appen, når du er færdig med at spille",
              "Slet appen, hvis du tilmelder dig ROFUS – appen vil dog selv blokere din adgang",
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
            6. SPILUDVALG
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="spiludvalg">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gamepad2 className="h-7 w-7 text-primary" />
            Spiludvalg i casino apps
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Moderne casino apps tilbyder et imponerende spiludvalg, der nærmer sig
            paritet med desktop-versionen. Alle spil fra store producenter som{" "}
            <Link to="/spiludviklere/pragmatic-play" className="text-primary underline hover:text-primary/80">
              Pragmatic Play
            </Link>
            ,{" "}
            <Link to="/spiludviklere/netent" className="text-primary underline hover:text-primary/80">
              NetEnt
            </Link>
            {" "}og{" "}
            <Link to="/spiludviklere/evolution-gaming" className="text-primary underline hover:text-primary/80">
              Evolution Gaming
            </Link>{" "}
            er designet mobile-first og fungerer optimalt i app-format.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            App-eksklusive features inkluderer: hurtig-start knapper for dine favoritspil,
            offline-tilgængelig spillehistorik, og integrerede turneringsopdateringer.{" "}
            <Link to="/live-casino" className="text-primary underline hover:text-primary/80">
              Live casino
            </Link>{" "}
            fungerer fuldt i apps med HD-streaming, interaktive dealer-interfaces og
            chat-funktionalitet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Se vores{" "}
            <Link to="/casinospil" className="text-primary underline hover:text-primary/80">
              casinospil-oversigt
            </Link>{" "}
            for en komplet gennemgang af alle spilkategorier tilgængelige på mobilplatforme.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            7. BETALINGER
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="betaling">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <CreditCard className="h-7 w-7 text-primary" />
            Betalinger via casino apps
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Casino apps integrerer typisk alle de samme betalingsmetoder som browser-
            og desktop-versionerne. Den primære forskel er, at apps kan tilbyde endnu
            mere strømlinet betalingsflow via native integrationer:
          </p>
          <div className="space-y-3 mb-6">
            {[
              { method: "Apple Pay (iOS)", desc: "Native integration med Face ID/Touch ID – 2-trins betaling direkte fra appen" },
              { method: "MobilePay", desc: "Automatisk app-switch til MobilePay-appen for godkendelse, derefter retur til casinoet" },
              { method: "Trustly", desc: "Open banking flow via in-app browser – ingen app-switch nødvendigt" },
              { method: "Visa/Mastercard", desc: "Kortoplysninger kan gemmes sikkert i appen med tokenisering" },
            ].map((item) => (
              <div key={item.method} className="flex items-start gap-3">
                <CreditCard className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <span className="font-medium text-sm text-foreground">{item.method}:</span>{" "}
                  <span className="text-sm text-muted-foreground">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Alle betalingsmetoder overholder danske regulatoriske krav – herunder forbuddet
            mod kreditbaseret spil og obligatoriske indbetalingsgrænser. Se vores{" "}
            <Link to="/betalingsmetoder" className="text-primary underline hover:text-primary/80">
              komplette betalingsmetoder-oversigt
            </Link>{" "}
            for alle muligheder.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            8. NATIVE VS. PWA
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="native-vs-pwa">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <RefreshCw className="h-7 w-7 text-primary" />
            Native app vs. PWA – dybdegående sammenligning
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Valget mellem native app og Progressive Web App (PWA) er en af de vigtigste
            beslutninger for mobilspillere. Her er en detaljeret sammenligning:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold text-foreground">Parameter</th>
                  <th className="text-left p-3 font-semibold text-foreground">Native App</th>
                  <th className="text-left p-3 font-semibold text-foreground">PWA</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { param: "Installation", native: "App Store / Google Play", pwa: "Browser → 'Føj til startskærm'" },
                  { param: "Opdateringer", native: "Manuelle / automatiske via store", pwa: "Automatisk ved besøg" },
                  { param: "Lagerplads", native: "50-200 MB + cache", pwa: "< 5 MB + cache" },
                  { param: "Push-notifikationer", native: "Ja (fuldt)", pwa: "Ja (Chrome) / Begrænset (Safari)" },
                  { param: "Biometrisk login", native: "Ja (fuldt)", pwa: "Afhængigt af browser" },
                  { param: "Offline-funktionalitet", native: "Delvist (UI + historik)", pwa: "Delvist (cachede sider)" },
                  { param: "Performance", native: "Optimal (native rendering)", pwa: "Meget god (browser-baseret)" },
                  { param: "Hardware-adgang", native: "Fuld (kamera, GPS, biometri)", pwa: "Begrænset (browser-API)" },
                ].map((row) => (
                  <tr key={row.param} className="border-b border-border/50">
                    <td className="p-3 font-medium text-foreground">{row.param}</td>
                    <td className="p-3">{row.native}</td>
                    <td className="p-3">{row.pwa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            <strong>Vores vurdering:</strong> For casual-spillere, der bruger flere casinoer,
            er PWA og browserbaseret mobilcasino det mest praktiske valg. For dedikerede
            spillere, der primært bruger ét casino og værdsætter push-notifikationer og
            optimal performance, er en native app en god investering.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            9. FORDELE OG ULEMPER
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="fordele-ulemper">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            Fordele og ulemper ved casino apps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="border-primary/30 bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-primary">
                  <CheckCircle className="h-5 w-5" />
                  Fordele
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Push-notifikationer om eksklusive bonusser og tilbud",
                  "Biometrisk login – hurtigere og mere sikkert end passwords",
                  "Marginalt hurtigere performance pga. cached assets",
                  "Hurtig adgang via app-ikon på startskærmen",
                  "Bedre integration med enhedens betalingssystem (Apple Pay)",
                  "Offline-adgang til spillehistorik og kontoinformation",
                  "App store review tilføjer et ekstra sikkerhedslag",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-destructive/30 bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Ulemper
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Optager lagerplads (50-200 MB + cache)",
                  "Kræver regelmæssige opdateringer",
                  "Begrænset til ét casino per app",
                  "App store review kan forsinke nye features",
                  "Ikke alle casinoer tilbyder native apps",
                  "Push-notifikationer kan opfordre til overdrevent spil",
                  "Potentielt mere synlig på enheden (privatlivshensyn)",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-destructive shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            10. ANSVARLIGT SPIL
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="ansvarligt-spil">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Heart className="h-7 w-7 text-primary" />
            Ansvarligt spil i casino apps
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Casino apps gør gambling mere tilgængeligt end nogensinde – og det medfører
            et ekstra ansvar for både operatører og spillere. Alle danske licenserede
            casino apps inkluderer de lovpligtige ansvarligt spil-værktøjer:
          </p>
          <div className="space-y-3 mb-6">
            {[
              "Indbetalingsgrænser (daglige, ugentlige, månedlige) – konfigurerbar i app-indstillinger",
              "Tabsgrænser og sessionstidsadvarsler",
              "Mulighed for midlertidig eller permanent selvudelukkelse direkte i appen",
              "ROFUS-integration – tilmelding blokerer automatisk adgang til alle licenserede apps",
              "Link til StopSpillet (70 22 28 25) direkte i appens menusystem",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Særligt for apps:</strong> Push-notifikationer om bonusser kan fungere
            som triggere for problematisk spilleadfærd. Vi anbefaler at deaktivere
            bonus-notifikationer, hvis du oplever, at de påvirker dit spilmønster negativt.
            Du kan typisk finjustere notifikationstyper i appens indstillinger.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Læs vores{" "}
            <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">
              komplette guide til ansvarligt spil
            </Link>{" "}
            og vores guides til{" "}
            <Link to="/ansvarligt-spil/rofus" className="text-primary underline hover:text-primary/80">
              ROFUS
            </Link>
            ,{" "}
            <Link to="/ansvarligt-spil/ludomani" className="text-primary underline hover:text-primary/80">
              ludomani
            </Link>{" "}
            og{" "}
            <Link to="/ansvarligt-spil/stopspillet" className="text-primary underline hover:text-primary/80">
              StopSpillet
            </Link>{" "}
            for mere information.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════════
            11. FREMTIDEN
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="fremtiden">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-primary" />
            Fremtidens casino apps
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Casino app-teknologien udvikler sig hurtigt. Her er de trends, vi forventer
            vil forme mobilgambling i de kommende år:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                title: "AI-drevet personalisering",
                desc: "Machine learning vil tilpasse spilanbefalinger, bonustilbud og ansvarligt spil-advarsler til den individuelle spillers adfærdsmønstre.",
              },
              {
                title: "Augmented Reality (AR)",
                desc: "AR-teknologi vil integrere casinoelementer i det fysiske miljø – forestil dig en roulettebord på dit spisebord eller live dealer i dit stue.",
              },
              {
                title: "5G-drevet live casino",
                desc: "Ultra-lav latency fra 5G-netværk vil muliggøre 4K live casino-streaming med realtids-interaktion på mobilniveau.",
              },
              {
                title: "Avanceret ansvarligt spil-AI",
                desc: "Proaktive AI-systemer vil identificere risikoadfærd i realtid og intervenere med personaliserede advarsler og cooldown-perioder.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Casino apps er ét element i det bredere mobil casino-landskab. Udforsk vores
            andre guides for at lære mere om mobilspil, sikkerhed og ansvarligt spil.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { to: "/mobil-casino", title: "Mobil Casino", desc: "Komplet guide til casino på mobilen" },
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

        <LatestNewsByCategory pagePath="/casino-app" />
        <RelatedGuides currentPath="/casino-app" />
        <FAQSection title="Ofte Stillede Spørgsmål om Casino Apps" faqs={casinoAppFaqs} />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
};

export default CasinoApp;
