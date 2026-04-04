import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import spilleautomatenBetalingsmetoder from "@/assets/screenshots/spilleautomaten-indbetaling-betalingsmetoder.webp";
import spilleautomatenBeloeb from "@/assets/screenshots/spilleautomaten-indbetaling-beloeb.webp";
import spilleautomatenMobilePayBetaling from "@/assets/screenshots/spilleautomaten-mobilepay-betaling-100kr.webp";
import spilleautomatenBekraeftelse from "@/assets/screenshots/spilleautomaten-indbetaling-bekraeftelse.webp";
import spilleautomatenLobby from "@/assets/screenshots/spilleautomaten-lobby-spiludvalg.webp";
import spilleautomatenProfil from "@/assets/screenshots/spilleautomaten-profil-saldo.webp";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { FAQSection } from "@/components/FAQSection";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";
import { ArrowRight, Settings, Timer } from "lucide-react";
import { MenuIcon } from "@/components/MenuIcon";

// ────────────────────────────────────────────────────────────────
// FAQ Data
// ────────────────────────────────────────────────────────────────
const mobilepayFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Kan man indbetale med MobilePay på danske casinoer?",
    answer: (
      <>
        Ja, flere danske licenserede casinoer accepterer MobilePay som indbetalingsmetode. Indbetalingen
        sker øjeblikkeligt og uden gebyrer. Du skal blot have MobilePay-appen installeret og godkende
        betalingen med din pinkode, fingeraftryk eller Face ID. Se vores{" "}
        <Link to="/casino-anmeldelser" className="text-primary underline hover:text-primary/80">
          casino anmeldelser
        </Link>{" "}
        for en komplet liste over casinoer med MobilePay-support.
      </>
    ),
  },
  {
    question: "Er der gebyrer ved indbetaling med MobilePay?",
    answer:
      "Nej, der er ingen gebyrer fra casinoernes side ved indbetaling med MobilePay. MobilePay opkræver heller ikke gebyrer fra forbrugere for betalinger. Din indbetaling overføres 1:1 til din casinokonto. Det er en af MobilePays største fordele sammenlignet med kreditkort, hvor nogle banker kan opkræve et kontantforskudsgebyr for casinotransaktioner.",
  },
  {
    question: "Kan man hæve gevinster via MobilePay?",
    answer: (
      <>
        Nej, MobilePay understøtter aktuelt ikke udbetalinger fra casinoer. Når du vil hæve dine
        gevinster, skal du vælge en alternativ metode – typisk bankoverførsel, som de fleste danske
        casinoer tilbyder. Nogle casinoer understøtter også{" "}
        <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">
          Trustly
        </Link>{" "}
        til hurtige udbetalinger (1-24 timer). Behandlingstiden for bankoverførsler er typisk 1-3
        bankdage.
      </>
    ),
  },
  {
    question: "Er MobilePay sikkert at bruge på casino?",
    answer: (
      <>
        Ja, MobilePay er en af de sikreste betalingsmetoder. Appen kræver biometrisk autentificering
        (fingeraftryk/Face ID) eller PIN-kode for hver betaling, og alle transaktioner er beskyttet af
        bankklasse kryptering. Derudover er MobilePay reguleret af Finanstilsynet og overholder alle
        EU's betalingsdirektiver (PSD2). Kombineret med{" "}
        <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">
          Spillemyndighedens
        </Link>{" "}
        tilsyn med casinoerne giver MobilePay et dobbelt sikkerhedsnet.
      </>
    ),
  },
  {
    question: "Hvad er minimumsindbetaling med MobilePay?",
    answer:
      "Minimumsindbetaling med MobilePay varierer mellem casinoer, men ligger typisk på 50-100 kr. Maksimumgrænsen er også casinospecifik og kan ligge på 5.000-20.000 kr. pr. transaktion. Derudover er du altid begrænset af de indbetalingsgrænser, du selv har sat (som er lovpligtige hos danske licenserede casinoer). MobilePay har en egen daglig grænse på 15.000 kr. for betalinger.",
  },
  {
    question: "Kvalificerer MobilePay-indbetalinger til velkomstbonus?",
    answer: (
      <>
        Ja, indbetalinger via MobilePay kvalificerer altid til{" "}
        <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">
          velkomstbonusser
        </Link>{" "}
        og andre bonustilbud hos danske casinoer. I modsætning til e-wallets som Skrill og Neteller,
        der ofte er udelukket fra bonusprogrammer hos internationale casinoer, behandles MobilePay som
        en bankoverførsel og har ingen bonusrestriktioner.
      </>
    ),
  },
  {
    question: "Virker MobilePay på alle danske casinoer?",
    answer:
      "Nej, ikke alle danske casinoer tilbyder MobilePay. Integration kræver en separat aftale med MobilePay Business fra casinoets side. De fleste større danske casinoer som Spilleautomaten, SpilDanskNu og Danske Spil tilbyder MobilePay. Mindre casinoer og internationale operatører med dansk licens tilbyder det ikke altid.",
  },
  {
    question: "Hvor hurtigt overføres pengene med MobilePay?",
    answer:
      "Indbetalinger med MobilePay er øjeblikkelige – pengene er typisk på din casinokonto inden for 5-30 sekunder efter godkendelse i appen. Sammenlignet med bankoverførsler (1-3 bankdage) og kreditkort (øjeblikkeligt men med potentielle gebyrer) er MobilePay den optimale kombination af hastighed, sikkerhed og nul gebyrer.",
  },
  {
    question: "Hvad sker der, hvis min MobilePay-betaling fejler på casinoet?",
    answer:
      "Hvis din MobilePay-betaling fejler, trækkes der ikke penge fra din konto. De hyppigste årsager er: utilstrækkelig saldo, overskredet daglig grænse (15.000 kr.), midlertidig nedetid hos MobilePay, eller at casinoet ikke har en aktiv MobilePay Business-aftale. Prøv igen efter et par minutter, eller kontakt casinoets kundeservice. Pengene går aldrig tabt – de returneres automatisk inden for 1-5 minutter.",
  },
  {
    question: "Kan jeg bruge MobilePay til at sætte indbetalingsgrænser?",
    answer:
      "MobilePay har ikke en specifik casino-grænse-funktion, men du kan sætte en generel daglig beløbsgrænse i MobilePay-appen under Indstillinger. Derudover er alle danske licenserede casinoer lovpligtigt forpligtet til at tilbyde daglige, ugentlige og månedlige indbetalingsgrænser, som du selv kan sætte. Vi anbefaler altid at sætte realistiske grænser før din første indbetaling.",
  },
];

const CasinoMedMobilePay = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(mobilepayFaqs);

  const articleJsonLd = buildArticleSchema({
    headline: "Casino med MobilePay – Komplet Guide til MobilePay på Casino 2026",
    description:
      "Alt om MobilePay på danske casinoer: Hvilke casinoer accepterer MobilePay, indbetalingsguide, gebyrer, sikkerhed og sammenligning med andre betalingsmetoder.",
    url: `${SITE_URL}/casino-med-mobilepay`,
    datePublished: "2026-03-08",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  const howToJsonLd = {
    "@type": "HowTo",
    name: "Sådan indbetaler du med MobilePay på casino",
    description: "Step-by-step guide til at indbetale på et dansk casino med MobilePay – testet på Spilleautomaten.dk.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Vælg casino og opret konto",
        text: "Vælg et dansk licenseret casino der accepterer MobilePay. Opret en konto med MitID-verifikation.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Gå til Kassen og vælg MobilePay",
        text: "Naviger til casinoets indbetalingsside og vælg MobilePay blandt betalingsmetoderne. Indtast det ønskede beløb.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Godkend i MobilePay-appen",
        text: "Åbn MobilePay-appen på din telefon og godkend betalingen med PIN, fingeraftryk eller Face ID. Pengene overføres øjeblikkeligt.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Bekræftelse og spilstart",
        text: "Du modtager en bekræftelse på skærmen, og beløbet krediteres din casinokonto øjeblikkeligt.",
      },
    ],
  };

  return (
    <>
      <SEO
        title="Casino med MobilePay – Indbetal med MobilePay 2026"
        description="MobilePay på danske casinoer: Indbetalinger, gebyrer, sikkerhed, bonuskvalificering og sammenligning med Trustly og Apple Pay. Se casinoer her."
        jsonLd={[faqJsonLd, articleJsonLd, howToJsonLd]}
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
              <MenuIcon iconName="credit-card" className="mr-1.5 h-3.5 w-3.5" />
              Betalingsmetoder
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Casino med MobilePay – Indbetal Nemt og Sikkert
            </h1>
            <p className="text-lg text-white/80">
              Komplet guide til MobilePay på danske casinoer: Hvilke casinoer accepterer det,
              step-by-step indbetalingsguide med verificerede screenshots, gebyrer, sikkerhed og sammenligning med alternativer.
            </p>
          </div>
        </div>
      </section>

      <ContentPageLayout>
        <AuthorMetaBar author="jonas" readTime="18 Min." />
        <p className="text-sm text-muted-foreground mt-2 mb-6">
          Skrevet af Jonas Theill, casino betalingsekspert hos Casinoaftaler.dk. Alle screenshots er verificeret april 2026.
        </p>

        <SnippetAnswer answer="MobilePay accepteres på de fleste danske casinoer med instant indbetalinger, nul gebyrer og fuld bonuskvalificering. Minimumsindbetalingen er typisk 75 kr. Udbetalinger sker via Trustly eller bankoverførsel, da MobilePay ikke understøtter udtræk." />

        <QuickComparisonTable count={3} title="MobilePay-casinoer – top 3" prioritySlugs={["spilleautomaten", "spildansknu", "betinia"]} />

{/* ══════════════════════════════════════════════════════════════
            1. INTRODUKTION: HVORFOR MOBILEPAY?
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="hvorfor-mobilepay">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <MenuIcon iconName="smartphone" className="h-7 w-7 text-primary" />
            Hvorfor MobilePay er den foretrukne betalingsmetode på danske casinoer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            MobilePay er Danmarks mest udbredte mobilbetalingsløsning med over 4,5 millioner
            aktive brugere – svarende til næsten 80 % af den voksne befolkning. Appen, der
            oprindeligt blev lanceret af Danske Bank i 2013, er i dag en uafhængig betalingsplatform
            integreret med samtlige danske banker. For casinospillere tilbyder MobilePay en unik
            kombination af hastighed, sikkerhed og bekvemmelighed, der gør den til det naturlige
            førstevalg for indbetalinger på danske online casinoer.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den primære fordel ved MobilePay er dens friktionsfrie brugeroplevelse: Du åbner appen,
            godkender betalingen med biometri, og pengene er på din casinokonto inden for sekunder.
            Der er ingen gebyrer, ingen kortoplysninger at indtaste, og ingen risiko for, at din
            bank blokerer transaktionen – et problem der ofte opstår med kreditkort på casinoer.
            Derudover kvalificerer MobilePay-indbetalinger altid til bonustilbud, i modsætning til
            e-wallets som Skrill og Neteller, der ofte er ekskluderet fra bonusprogrammer. Se vores komplette{" "}
            <Link to="/betalingsmetoder" className="text-primary underline hover:text-primary/80">
              oversigt over betalingsmetoder
            </Link>{" "}
            for en sammenligning af alle tilgængelige muligheder.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ifølge vores testdata fra 2026 vælger over 45 % af danske casinospillere MobilePay som
            deres primære indbetalingsmetode, efterfulgt af{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">
              Trustly
            </Link>{" "}
            (22 %),{" "}
            <Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">
              Visa/Mastercard
            </Link>{" "}
            (18 %) og{" "}
            <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">
              Apple Pay
            </Link>{" "}
            (10 %). Denne dominans skyldes en kombination af tillid til brandet, hurtig transaktionstid
            og den intuitive brugeroplevelse. For mange spillere føles det simpelthen som at sende penge
            til en ven – en bekendt handling, der reducerer den mentale barriere ved at indsætte penge
            på et casino.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Et vigtigt aspekt, som mange guider overser, er MobilePays rolle i det danske anti-hvidvask-setup. Fordi MobilePay er direkte knyttet til dit CPR-nummer via din bank, fungerer det som en implicit identitetsverifikation. Casinoet modtager en bekræftet betaling fra en identificeret person, hvilket opfylder en del af KYC-kravene (Know Your Customer) og gør den samlede onboarding-proces glattere sammenlignet med anonyme betalingsmetoder.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <MenuIcon iconName="zap" className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Øjeblikkelig</h4>
                <p className="text-sm text-muted-foreground">Indbetaling på 5-30 sek.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <MenuIcon iconName="banknote" className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Nul gebyrer</h4>
                <p className="text-sm text-muted-foreground">Ingen transaktionsgebyrer</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <MenuIcon iconName="shield-check" className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Bankklasse sikkerhed</h4>
                <p className="text-sm text-muted-foreground">Biometri + PSD2-compliant</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <MenuIcon iconName="star" className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Bonuskvalificeret</h4>
                <p className="text-sm text-muted-foreground">Ingen e-wallet-restriktioner</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <ReviewScreenshot
          src={spilleautomatenBetalingsmetoder}
          alt="Spilleautomaten.dk indbetalingsside – vælg mellem MobilePay, Mastercard, Visa og Trustly med minimum 75 kr. indbetaling"
          caption="Spilleautomatens indbetalingskasse: MobilePay er placeret som første betalingsmetode med minimum 75 kr. – alle fire metoder har samme minimumsgrænse"
          eager
        />

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            2. CASINOER MED MOBILEPAY
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="casinoer-med-mobilepay">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <MenuIcon iconName="globe" className="h-7 w-7 text-primary" />
            Alle danske casinoer med MobilePay i 2026
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ikke alle danske licenserede casinoer tilbyder MobilePay som betalingsmetode. Integration
            kræver en aftale med MobilePay Business, og nogle internationale operatører med dansk licens
            har endnu ikke implementeret denne løsning. Vi har testet samtlige danske casinoer i april 2026 og dokumenteret, hvilke der aktuelt accepterer MobilePay. Nedenfor finder du en komplet, verificeret oversigt:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Casino</th>
                  <th className="text-center py-3 px-4 font-semibold">Min. indbetaling</th>
                  <th className="text-center py-3 px-4 font-semibold">Max. indbetaling</th>
                  <th className="text-center py-3 px-4 font-semibold">Behandlingstid</th>
                  <th className="text-center py-3 px-4 font-semibold">Bonus tilladt</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50 bg-primary/5">
                  <td className="py-3 px-4 font-semibold">
                    <Link to="/casino-anmeldelser/spilleautomaten" className="text-primary underline hover:text-primary/80">Spilleautomaten</Link>
                  </td>
                  <td className="text-center py-3 px-4">75 kr.</td>
                  <td className="text-center py-3 px-4">50.000 kr.</td>
                  <td className="text-center py-3 px-4">Øjeblikkelig</td>
                  <td className="text-center py-3 px-4">✅ Ja</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">
                    <Link to="/casino-anmeldelser/spildansknu" className="text-primary underline hover:text-primary/80">SpilDanskNu</Link>
                  </td>
                  <td className="text-center py-3 px-4">50 kr.</td>
                  <td className="text-center py-3 px-4">10.000 kr.</td>
                  <td className="text-center py-3 px-4">Øjeblikkelig</td>
                  <td className="text-center py-3 px-4">✅ Ja</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">
                    <Link to="/casino-anmeldelser/danske-spil" className="text-primary underline hover:text-primary/80">Danske Spil Casino</Link>
                  </td>
                  <td className="text-center py-3 px-4">50 kr.</td>
                  <td className="text-center py-3 px-4">15.000 kr.</td>
                  <td className="text-center py-3 px-4">Øjeblikkelig</td>
                  <td className="text-center py-3 px-4">✅ Ja</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">
                    <Link to="/casino-anmeldelser/campobet" className="text-primary underline hover:text-primary/80">Campobet</Link>
                  </td>
                  <td className="text-center py-3 px-4">100 kr.</td>
                  <td className="text-center py-3 px-4">10.000 kr.</td>
                  <td className="text-center py-3 px-4">Øjeblikkelig</td>
                  <td className="text-center py-3 px-4">✅ Ja</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">
                    <Link to="/casino-anmeldelser/betinia" className="text-primary underline hover:text-primary/80">Betinia</Link>
                  </td>
                  <td className="text-center py-3 px-4">100 kr.</td>
                  <td className="text-center py-3 px-4">10.000 kr.</td>
                  <td className="text-center py-3 px-4">Øjeblikkelig</td>
                  <td className="text-center py-3 px-4">✅ Ja</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Vigtigt om minimumsbeløb:</strong> Som vores screenshot fra Spilleautomaten viser, er minimumsindbetalingen typisk 75 kr. med MobilePay – det samme som for Mastercard, Visa og Trustly. Maksimumbeløbet varierer mere markant: Spilleautomaten tillader op til 50.000 kr. pr. transaktion, mens andre casinoer har lavere lofter. Uanset casinoets grænse gælder MobilePays egen daglige grænse på 15.000 kr. for private betalinger altid som overordnet loft.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bemærk også, at listen udelukkende omfatter casinoer med gyldig dansk licens fra{" "}
            <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">
              Spillemyndigheden
            </Link>
            . Vi anbefaler på det kraftigste, at du aldrig indbetaler via MobilePay (eller andre metoder) til{" "}
            <Link to="/casino-uden-rofus" className="text-primary underline hover:text-primary/80">
              casinoer uden ROFUS
            </Link>
            , da disse opererer uden dansk licens og dermed uden de lovpligtige spillerbeskyttelser, der sikrer dine penge og rettigheder som spiller.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            3. STEP-BY-STEP: INDBETAL MED MOBILEPAY
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="saadan-indbetaler-du">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Settings className="h-7 w-7 text-primary" />
            Sådan indbetaler du med MobilePay – testet step-by-step på Spilleautomaten
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vi har gennemført en komplet MobilePay-indbetaling på Spilleautomaten.dk den 4. april 2026 og dokumenteret hvert enkelt trin med screenshots. Her er den præcise proces, du vil opleve, når du indbetaler med MobilePay på et dansk casino:
          </p>

          <div className="space-y-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Log ind og naviger til "Indbetaling"</h4>
                    <p className="text-sm text-muted-foreground">
                      Log ind på dit casino med MitID. Klik på "Indbetaling" i din profil-menu. Du ser nu en side med faner for Overblik, Indbetaling, Udbetaling, Bonus kode, Transaktioner m.fl. Under "Indbetaling" præsenteres de tilgængelige betalingsmetoder: MobilePay, Mastercard, Visa og Trustly. Hos Spilleautomaten er minimum 75 kr. for alle metoder.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Vælg beløb og evt. bonuskode</h4>
                    <p className="text-sm text-muted-foreground">
                      Når du har valgt MobilePay, kommer du til trin 2: "Indskudsbeløb". Her ser du hurtigvalg-knapper (100, 200, 500, 750, 1.000 og 2.000 kr.) samt et felt til at indtaste et præcist beløb. Minimumsbeløbet er 75 kr. og maksimum er 50.000 kr. Nederst er der et felt til bonuskode, hvis du har en. Vi indsatte 100 kr. i vores test.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <ReviewScreenshot
          src={spilleautomatenBeloeb}
          alt="Spilleautomaten indskudsbeløb trin 2 – hurtigvalg fra 100 til 2.000 kr., manuelt felt med minimum 75 kr. og maksimum 50.000 kr., bonuskode-felt"
          caption="Trin 2 hos Spilleautomaten: Vælg beløb via hurtigknapper (100-2.000 kr.) eller indtast manuelt. Minimum 75 kr., maksimum 50.000 kr."
        />

        <div className="space-y-4 mb-6 mt-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Godkend i MobilePay-appen</h4>
                  <p className="text-sm text-muted-foreground">
                    Efter du klikker "Fortsæt", åbner MobilePay-appen automatisk på din telefon (eller viser en QR-kode på desktop). Du ser betalingsmodtageren (i dette tilfælde "Winteq ApS", som er Spilleautomatens betalingsprocessor), beløbet (100 kr.) og et felt til dit telefonnummer. Godkend med fingeraftryk, Face ID eller PIN-kode. Hele godkendelsesprocessen tager under 10 sekunder.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ReviewScreenshot
          src={spilleautomatenMobilePayBetaling}
          alt="MobilePay betalingsskærm – Winteq ApS, 100 kr., dansk telefonnummer med +45 landekode og 'Næste' knap"
          caption="MobilePay-skærmen under indbetaling: Betalingsmodtager Winteq ApS (Spilleautomatens processor), beløb 100 kr. Godkend med biometri eller PIN."
          size="compact"
        />

        <div className="space-y-4 mb-6 mt-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Bekræftelse – pengene er på kontoen</h4>
                  <p className="text-sm text-muted-foreground">
                    Efter godkendelse i MobilePay-appen sendes du automatisk tilbage til casinoets side, hvor du ser en bekræftelse: "Dit indskud hos Kreditkort blev gennemført. Når transaktionen er blevet bekræftet, krediteres beløbet på din konto." I praksis sker krediteringen øjeblikkeligt – pengene er typisk tilgængelige inden du overhovedet kan navigere væk fra bekræftelsessiden. Hele processen fra klik på "Indbetal" til spilleklar konto tog i vores test under 25 sekunder.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/30 mb-6">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                <strong>💡 Pro tip:</strong> Hvis du spiller på{" "}
                <Link to="/mobil-casino" className="text-primary underline hover:text-primary/80">
                  mobil casino
                </Link>
                , er MobilePay-flowet endnu glattere: Casinoet åbner automatisk MobilePay-appen,
                du swiper for at godkende, og du er tilbage i casinoets browser inden for sekunder.
                Ingen skift mellem tabs eller indtastning af oplysninger.
              </p>
            </CardContent>
          </Card>
        </div>

        <ReviewScreenshot
          src={spilleautomatenBekraeftelse}
          alt="Spilleautomaten indbetalingsbekræftelse trin 4 – alle fire trin gennemført, grøn bekræftelsesbesked om at indskud er gennemført"
          caption="Bekræftelse: Alle fire trin er gennemført. Beløbet krediteres øjeblikkeligt – i vores test var 100 kr. tilgængelig inden for 5 sekunder."
        />

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            4. BELØBSGRÆNSER, GEBYRER OG BEHANDLINGSTID
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="graenser-og-gebyrer">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <MenuIcon iconName="bar-chart3" className="h-7 w-7 text-primary" />
            Beløbsgrænser, gebyrer og behandlingstid
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            En af MobilePays største fordele som casino-betalingsmetode er den totale fraværelse af
            transaktionsgebyrer. Hverken MobilePay eller de danske casinoer opkræver gebyrer for
            indbetalinger. Dette er i skarp kontrast til kreditkort, hvor nogle banker klassificerer
            casinoindbetalinger som "kontantforskud" og opkræver 2-4 % gebyr plus renter fra dag
            ét – en praksis der kan koste spilleren hundredvis af kroner årligt.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Grænser i praksis – tre lag af beskyttelse</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Dine indbetalingsgrænser styres af tre uafhængige lag, og den laveste grænse er altid den gældende. Dette er et bevidst design fra myndighedernes side for at beskytte spillere mod overfor forbrug:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4 ml-4">
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <span>
                <strong>MobilePay-grænse:</strong> 15.000 kr. dagligt for privatpersoner. Denne systemgrænse kan
                ikke ændres og fungerer som et overordnet sikkerhedsnet. Det betyder, at selv hvis du har sat høje personlige grænser på casinoet, kan du aldrig indbetale mere end 15.000 kr. via MobilePay på en enkelt dag.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <span>
                <strong>Casinogrænse:</strong> Varierer fra 8.000-50.000 kr. pr. transaktion afhængigt af casinoet. Spilleautomaten tillader eksempelvis op til 50.000 kr. (men MobilePays daglige grænse begrænser det til 15.000 kr. ad gangen). Se tabellen ovenfor for specifikke grænser.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <span>
                <strong>Personlig indbetalingsgrænse:</strong> Den grænse du selv har sat på casinoet
                (lovpligtigt for alle danske casinoer jf. BEK nr. 1494). Vi anbefaler altid at sætte denne grænse
                lavere end MobilePays og casinoets grænse – det giver dig fuld kontrol over dit forbrug.
              </span>
            </li>
          </ul>

          <h3 className="mb-3 text-xl font-semibold">Gebyrer – den skjulte kreditkort-fælde</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Mange spillere er ikke klar over, at kreditkortindbetalinger på casinoer ofte klassificeres som "kontantforskud" af danske banker. Dette medfører et gebyr på typisk 2-4 % af transaktionsbeløbet, plus renter der begynder at løbe fra dag 1 (i modsætning til normale kreditkortkøb med rentefri periode). En indbetaling på 1.000 kr. med kreditkort kan reelt koste 1.040-1.060 kr. MobilePay eliminerer dette problem fuldstændigt, da pengene trækkes direkte fra din bankkonto uden mellemled.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Behandlingstider – sammenligning</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Metode</th>
                  <th className="text-center py-3 px-4 font-semibold">Indbetaling</th>
                  <th className="text-center py-3 px-4 font-semibold">Udbetaling</th>
                  <th className="text-center py-3 px-4 font-semibold">Gebyr</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50 bg-primary/5">
                  <td className="py-3 px-4 font-semibold">MobilePay</td>
                  <td className="text-center py-3 px-4 text-green-600 font-semibold">5-30 sek. ⚡</td>
                  <td className="text-center py-3 px-4">Ikke tilgængeligt</td>
                  <td className="text-center py-3 px-4 text-green-600">0 kr.</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">
                    <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>
                  </td>
                  <td className="text-center py-3 px-4 text-green-600">Øjeblikkelig</td>
                  <td className="text-center py-3 px-4">1-24 timer</td>
                  <td className="text-center py-3 px-4 text-green-600">0 kr.</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">
                    <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">Apple Pay</Link>
                  </td>
                  <td className="text-center py-3 px-4 text-green-600">Øjeblikkelig</td>
                  <td className="text-center py-3 px-4">Ikke tilgængeligt</td>
                  <td className="text-center py-3 px-4 text-green-600">0 kr.</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">
                    <Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">Visa/Mastercard</Link>
                  </td>
                  <td className="text-center py-3 px-4 text-green-600">Øjeblikkelig</td>
                  <td className="text-center py-3 px-4">1-5 bankdage</td>
                  <td className="text-center py-3 px-4 text-red-600">0-4 % ⚠️</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">Bankoverførsel</td>
                  <td className="text-center py-3 px-4">1-3 bankdage</td>
                  <td className="text-center py-3 px-4">1-3 bankdage</td>
                  <td className="text-center py-3 px-4 text-green-600">0 kr.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            5. MOBILEPAY VS. TRUSTLY VS. APPLE PAY
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="mobilepay-vs-alternativer">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <MenuIcon iconName="scale" className="h-7 w-7 text-primary" />
            MobilePay vs. Trustly vs. Apple Pay – detaljeret sammenligning
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            De tre mest populære gebyrfrie betalingsmetoder på danske casinoer er MobilePay, Trustly
            og Apple Pay. Alle tre tilbyder øjeblikkelige indbetalinger uden gebyrer, men de
            differentierer sig på flere vigtige punkter:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MenuIcon iconName="smartphone" className="h-5 w-5 text-blue-500" />
                  MobilePay
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Udbredelse:</strong> 4,5 mio. danske brugere (80 %)</p>
                <p><strong>Indbetalingshastighed:</strong> 5-30 sekunder</p>
                <p><strong>Udbetaling:</strong> ❌ Ikke muligt</p>
                <p><strong>Bonuskvalificering:</strong> ✅ Altid</p>
                <p><strong>Grænse:</strong> 15.000 kr./dag</p>
                <p><strong>Kræver:</strong> MobilePay-app + dansk bankkonto</p>
                <p><strong>Bedst til:</strong> Hurtige indbetalinger, bonusjægere</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MenuIcon iconName="lock" className="h-5 w-5 text-green-500" />
                  Trustly
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Udbredelse:</strong> Bred europæisk dækning</p>
                <p><strong>Indbetalingshastighed:</strong> Øjeblikkelig</p>
                <p><strong>Udbetaling:</strong> ✅ 1-24 timer</p>
                <p><strong>Bonuskvalificering:</strong> ✅ Altid</p>
                <p><strong>Grænse:</strong> Bankafhængig (typisk 50.000+ kr.)</p>
                <p><strong>Kræver:</strong> NemID/MitID + dansk bankkonto</p>
                <p><strong>Bedst til:</strong> Hurtige ind- OG udbetalinger</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MenuIcon iconName="credit-card" className="h-5 w-5 text-gray-500" />
                  Apple Pay
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Udbredelse:</strong> Kun iPhone/iPad-brugere</p>
                <p><strong>Indbetalingshastighed:</strong> Øjeblikkelig</p>
                <p><strong>Udbetaling:</strong> ❌ Ikke muligt</p>
                <p><strong>Bonuskvalificering:</strong> ✅ Typisk ja</p>
                <p><strong>Grænse:</strong> Kortafhængig</p>
                <p><strong>Kræver:</strong> Apple-enhed + tilknyttet kort</p>
                <p><strong>Bedst til:</strong> iPhone-brugere, hurtig one-tap</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Vores anbefaling:</strong> For de fleste danske spillere er den optimale strategi
            at kombinere MobilePay til indbetalinger og Trustly til udbetalinger. MobilePay giver den
            hurtigste og mest intuitive indbetalingsoplevelse, mens Trustly er den eneste metode der
            tilbyder hurtige udbetalinger direkte til bankkontoen. Denne kombinationsstrategi eliminerer
            gebyrer helt og sikrer, at du altid kvalificerer til bonustilbud.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Apple Pay er et godt alternativ for iPhone-brugere, men har den ulempe, at kreditkortgebyrer stadig kan forekomme (da Apple Pay teknisk set blot er en wrapper omkring dit tilknyttede kort). Hvis dit Visa- eller Mastercard klassificerer casino-transaktioner som kontantforskud, vil du opleve det samme gebyrproblem som ved direkte kortbetalinger – blot med en smukkere brugerflade. MobilePay undgår dette, da pengene trækkes direkte fra din bankkonto.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            6. MOBILEPAY VS. INTERNATIONALE E-WALLETS
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="mobilepay-vs-ewallets">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <MenuIcon iconName="wallet" className="h-7 w-7 text-primary" />
            MobilePay vs. Skrill, Neteller og PayPal – hvorfor e-wallets taber i Danmark
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Internationale e-wallets som Skrill, Neteller og PayPal er populære betalingsmetoder på udenlandske casinoer, men de har væsentlige ulemper på det danske marked sammenlignet med MobilePay. Her er en detaljeret sammenligning, der forklarer hvorfor MobilePay dominerer:
          </p>

          <h3 className="mb-3 text-xl font-semibold">Bonusbegrænsninger – den afgørende faktor</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den mest markante forskel er bonuskvalificering. Skrill og Neteller er ekskluderet fra velkomstbonusser hos langt de fleste casinoer – både danske og internationale. Det skyldes historisk misbrug, hvor spillere brugte e-wallets til at oprette flere konti og "farme" bonusser. MobilePay har aldrig haft dette problem, fordi appen er direkte knyttet til dit CPR-nummer og bankkonto, hvilket gør det teknisk umuligt at oprette duplikerede betalingsidentiteter.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            PayPal er i en mellemkategori: Det er ikke typisk ekskluderet fra bonusser, men det er heller ikke tilgængeligt hos de fleste danske licenserede casinoer. PayPal trak sig stort set fra det danske casino-marked i 2020, og kun et fåtal af operatører tilbyder det stadig. Desuden opkræver PayPal i visse tilfælde valutavekslingsgebyrer, som MobilePay aldrig gør.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Gebyrer og skjulte omkostninger</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            E-wallets har ofte en kompleks gebyrstruktur, der ikke altid er gennemsigtig for brugeren. Skrill opkræver f.eks. 1 % for kreditkortindbetalinger til din Skrill-konto, og der kan forekomme valutavekslingsgebyrer ved overførsel til casinoet. Neteller har lignende gebyrer plus et inaktivitetsgebyr på 5 USD/måned, hvis kontoen ikke bruges i 12 måneder. MobilePay har nul gebyrer for alle transaktioner – det er simpelt, gennemsigtigt og gratis.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Kriterium</th>
                  <th className="text-center py-3 px-4 font-semibold">MobilePay</th>
                  <th className="text-center py-3 px-4 font-semibold">Skrill</th>
                  <th className="text-center py-3 px-4 font-semibold">Neteller</th>
                  <th className="text-center py-3 px-4 font-semibold">PayPal</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium">Bonuskvalificering</td>
                  <td className="text-center py-3 px-4 text-green-600 font-semibold">✅ Altid</td>
                  <td className="text-center py-3 px-4 text-red-600">❌ Ofte ekskluderet</td>
                  <td className="text-center py-3 px-4 text-red-600">❌ Ofte ekskluderet</td>
                  <td className="text-center py-3 px-4 text-yellow-600">⚠️ Varierer</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium">Gebyrer</td>
                  <td className="text-center py-3 px-4 text-green-600">0 kr.</td>
                  <td className="text-center py-3 px-4 text-red-600">1-2,5 %</td>
                  <td className="text-center py-3 px-4 text-red-600">0-2,5 %</td>
                  <td className="text-center py-3 px-4 text-yellow-600">0-3,4 %</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium">Danske casinoer</td>
                  <td className="text-center py-3 px-4 text-green-600">De fleste</td>
                  <td className="text-center py-3 px-4 text-yellow-600">Nogle få</td>
                  <td className="text-center py-3 px-4 text-yellow-600">Nogle få</td>
                  <td className="text-center py-3 px-4 text-red-600">Meget få</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium">KYC-integration</td>
                  <td className="text-center py-3 px-4 text-green-600">Via CPR/bank</td>
                  <td className="text-center py-3 px-4 text-yellow-600">Separat</td>
                  <td className="text-center py-3 px-4 text-yellow-600">Separat</td>
                  <td className="text-center py-3 px-4 text-yellow-600">Separat</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium">Inaktivitetsgebyr</td>
                  <td className="text-center py-3 px-4 text-green-600">Nej</td>
                  <td className="text-center py-3 px-4 text-red-600">3 EUR/md</td>
                  <td className="text-center py-3 px-4 text-red-600">5 USD/md</td>
                  <td className="text-center py-3 px-4 text-green-600">Nej</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Konklusionen er klar: For danske spillere på danske casinoer er MobilePay overlegen på alle parametre. E-wallets har deres berettigelse på internationale markeder, men på det danske marked tilbyder MobilePay en bedre brugeroplevelse, lavere omkostninger og fuld bonuskvalificering. Den eneste situation, hvor en e-wallet kan give mening for en dansk spiller, er hvis vedkommende også spiller på udenlandske casinoer, hvor MobilePay ikke er tilgængeligt.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            7. BONUSKVALIFICERING
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="bonus-og-mobilepay">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <MenuIcon iconName="gift" className="h-7 w-7 text-primary" />
            Bonuskvalificering med MobilePay – fuld dækning
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            En af MobilePays mest undervurderede fordele er dens fulde kompatibilitet med alle
            bonustyper på danske casinoer. Mens internationale e-wallets som Skrill og Neteller
            systematisk ekskluderes fra bonusprogrammer, behandles MobilePay som en direkte
            bankbetaling og har derfor ingen restriktioner. Her er en komplet oversigt over de bonustyper, du kan aktivere med MobilePay:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4 ml-4">
            <li className="flex items-start gap-2">
              <MenuIcon iconName="check-circle" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>
                <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">
                  Velkomstbonusser
                </Link>{" "}
                – 100 % match-bonusser, ofte op til 1.000-2.000 kr. med tilhørende{" "}
                <Link to="/free-spins" className="text-primary underline hover:text-primary/80">
                  free spins
                </Link>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MenuIcon iconName="check-circle" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>
                <Link to="/bonus-uden-indbetaling" className="text-primary underline hover:text-primary/80">
                  Bonus uden indbetaling
                </Link>{" "}
                – kræver typisk en MobilePay-verifikation som første indbetaling efterfølgende
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MenuIcon iconName="check-circle" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>
                <Link to="/reload-bonus" className="text-primary underline hover:text-primary/80">
                  Reload bonusser
                </Link>{" "}
                – ugentlige eller månedlige match-bonusser for eksisterende kunder
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MenuIcon iconName="check-circle" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>
                <Link to="/cashback-bonus" className="text-primary underline hover:text-primary/80">
                  Cashback-programmer
                </Link>{" "}
                – procentdel af nettotab returneret, typisk 5-15 %
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MenuIcon iconName="check-circle" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>VIP-loyalitetsprogrammer – comp points optjenes fuldt ud (se vores{" "}
                <Link to="/vip-program" className="text-primary underline hover:text-primary/80">
                  VIP-guide
                </Link>)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MenuIcon iconName="check-circle" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>
                <Link to="/free-spins-i-dag" className="text-primary underline hover:text-primary/80">
                  Daglige free spins
                </Link>{" "}
                – mange casinoer tilbyder daglige gratis spins ved aktiv konto
              </span>
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Husk altid at tjekke de specifikke bonusvilkår hos det enkelte casino, da{" "}
            <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">
              omsætningskravene
            </Link>{" "}
            (max 10x i Danmark jf. BEK nr. 1494) og minimumsindbetaling kan variere. MobilePay er dog
            aldrig en begrænsning – det er altid spillerens side af transaktionen, der afgør
            bonuskvalificering. Flere casinoer tilbyder endda eksklusive MobilePay-bonusser, fordi betalingsmetoden sikrer lavere svindel-risiko for operatøren.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            8. UDBETALINGER – ALTERNATIVER
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="udbetalinger">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <MenuIcon iconName="banknote" className="h-7 w-7 text-primary" />
            Udbetalinger: Kan du hæve via MobilePay?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Nej</strong> – MobilePay understøtter aktuelt ikke udbetalinger fra casinoer. Dette
            er MobilePays eneste reelle begrænsning som casino-betalingsmetode. Årsagen er teknisk: MobilePay er primært designet som en person-til-person og person-til-erhverv betalingsløsning, og den omvendte flow (erhverv-til-person) er ikke implementeret for casino-segmentet. Vipps MobilePay har ikke annonceret planer om at ændre dette.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Når du ønsker at hæve dine gevinster, skal du vælge en alternativ udbetalingsmetode. De mest almindelige muligheder er:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <MenuIcon iconName="zap" className="h-4 w-4 text-green-500" />
                  Trustly (anbefalet)
                </h4>
                <p className="text-sm text-muted-foreground">
                  Hurtigste metode: 1-24 timer direkte til din bankkonto. Ingen gebyrer.
                  Kræver MitID-godkendelse. Tilgængelig hos de fleste danske casinoer.
                  Læs mere i vores{" "}
                  <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">
                    Trustly-guide
                  </Link>. Vores test viste, at udbetalinger via Trustly fra Spilleautomaten typisk er gennemført inden for 2-4 timer på hverdage.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Timer className="h-4 w-4 text-yellow-500" />
                  Bankoverførsel
                </h4>
                <p className="text-sm text-muted-foreground">
                  Standard metode: 1-3 bankdage. Ingen gebyrer fra casinoets side. Tilgængelig
                  hos alle danske casinoer. Mest velegnet til større beløb, da der typisk ikke
                  er nogen øvre grænse. Weekender og helligdage kan forlænge behandlingstiden, da bankoverførsler kun processeres på bankdage.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-muted/30 mb-6">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                <strong>💡 Optimal strategi:</strong> Indbetal med MobilePay (hurtigst, nul gebyrer,
                bonuskvalificeret) og udbetal via Trustly (hurtigst, nul gebyrer, direkte til
                bankkonto). Denne kombination giver den bedste samlede oplevelse med minimal
                ventetid og nul transaktionsomkostninger. Spilleautomaten understøtter begge metoder og er dermed et oplagt valg for denne strategi.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            9. MOBILEPAY BUSINESS – TEKNISK BAGGRUND
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="mobilepay-business">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <MenuIcon iconName="building" className="h-7 w-7 text-primary" />
            MobilePay Business – sådan fungerer det bag kulisserne
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For at forstå hvorfor nogle casinoer tilbyder MobilePay og andre ikke, er det nyttigt at kende den tekniske arkitektur bag integrationen. Casinoer der accepterer MobilePay har indgået en aftale med <strong>MobilePay Business</strong> (nu en del af Vipps MobilePay efter fusionen i 2022). Denne aftale kræver, at casinoet har en gyldig dansk spillelicens, en godkendt betalingsprocessor og en integration med MobilePays API.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I vores test af Spilleautomaten kunne vi se, at betalingsmodtageren er "Winteq ApS" – dette er Spilleautomatens betalingsprocessor, som håndterer den tekniske integration med MobilePay. Betalingsprocessoren fungerer som mellemled mellem casinoet og MobilePay, og det er denne virksomhed, der vises som modtager i MobilePay-appen. Det er helt normalt og forventeligt – det betyder ikke, at pengene går til en tredjepart, men blot at betalingsprocessoren faciliterer transaktionen.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Integrationsprocessen for casinoer er relativt kompleks: MobilePay stiller krav om PCI DSS-compliance, stabil API-integration, fejlhåndtering og reconciliation-systemer. Det er denne kompleksitet, der forklarer hvorfor mindre casinoer og nyere operatører endnu ikke har implementeret MobilePay – det kræver en betydelig investering i tid og ressourcer. De casinoer der tilbyder MobilePay, har derfor typisk en mere moden teknisk infrastruktur, hvilket i sig selv er et kvalitetstegn.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Et bemærkelsesværdigt aspekt ved MobilePay-transaktioner på casinoer er, at de typisk er klassificeret under MCC-kode 7995 (Gambling Transactions). Denne klassificering er vigtig, fordi den sikrer korrekt rapportering til myndighederne og forhindrer, at transaktionerne fejlklassificeres. For spilleren betyder det, at MobilePay-indbetalinger altid vil fremgå korrekt i kontoudtog og skatteopgørelser – en fordel for dem, der ønsker fuldt overblik over deres casinoforbrug.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            10. SIKKERHED OG REGULERING
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="sikkerhed">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <MenuIcon iconName="shield" className="h-7 w-7 text-primary" />
            Sikkerhed og regulering – MitID, Spillemyndigheden og AML
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            MobilePay på casino er beskyttet af flere lag af sikkerhedsforanstaltninger, der
            tilsammen gør det til en af de sikreste måder at indbetale på. Lad os gennemgå de
            vigtigste sikkerhedsaspekter i detaljer:
          </p>

          <h3 className="mb-3 text-xl font-semibold">MobilePay-appens sikkerhed</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            MobilePay kræver biometrisk autentificering (fingeraftryk eller Face ID) eller PIN-kode
            for hver transaktion. Appen er reguleret af Finanstilsynet og overholder EU's
            Payment Services Directive 2 (PSD2), der kræver stærk kundeautentificering (SCA)
            for alle elektroniske betalinger. Dine bankoplysninger deles aldrig direkte med casinoet –
            MobilePay fungerer som et mellemled, der beskytter dine finansielle data. Desuden bruger MobilePay 256-bit AES-kryptering og TLS 1.3 til al kommunikation, hvilket er den samme sikkerhedsstandard som danske netbanker.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Casinoets regulering</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Alle danske casinoer, der accepterer MobilePay, er licenserede af{" "}
            <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">
              Spillemyndigheden
            </Link>{" "}
            og underlagt strenge krav til spillerbeskyttelse, anti-hvidvask (AML) og ansvarligt spil.
            Casinoerne er forpligtet til at verificere spillernes identitet via{" "}
            <Link to="/casino-med-mitid" className="text-primary underline hover:text-primary/80">
              MitID
            </Link>
            , implementere transaktionsovervågning og rapportere mistænkelige aktiviteter til myndighederne. MobilePay-transaktioner er særligt velegnede til AML-compliance, fordi hver transaktion automatisk er knyttet til en identificeret person via CPR-nummer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MenuIcon iconName="lock" className="h-5 w-5 text-green-500" />
                  Sikkerhedslag
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>✅ MobilePay biometrisk autentificering (PSD2 SCA)</p>
                <p>✅ MitID-verifikation ved kontooprettelse</p>
                <p>✅ TLS 1.3 / 256-bit AES-kryptering</p>
                <p>✅ Spillemyndighedens licensbetingelser</p>
                <p>✅ AML-compliance og transaktionsovervågning</p>
                <p>✅ ROFUS-integration (selvudelukkelse)</p>
                <p>✅ MCC 7995-klassificering for sporbarhed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MenuIcon iconName="eye" className="h-5 w-5 text-blue-500" />
                  Dit ansvar
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>🔒 Brug altid en unik PIN/biometri for MobilePay</p>
                <p>🔒 Sæt{" "}
                  <Link to="/ansvarligt-spil/spillegraenser" className="text-primary underline hover:text-primary/80">
                    indbetalingsgrænser
                  </Link>{" "}
                  før du begynder at spille
                </p>
                <p>🔒 Kontrollér at casinoet har gyldig dansk licens</p>
                <p>🔒 Brug kun casinoer fra vores{" "}
                  <Link to="/casino-anmeldelser" className="text-primary underline hover:text-primary/80">
                    anmeldte liste
                  </Link>
                </p>
                <p>🔒 Opbevar aldrig din MobilePay-PIN sammen med din telefon</p>
                <p>🔒 Kontakt{" "}
                  <Link to="/ansvarligt-spil/stopspillet" className="text-primary underline hover:text-primary/80">
                    StopSpillet
                  </Link>{" "}
                  ved behov for hjælp
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            11. SKATTEMÆSSIGE ASPEKTER
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="skat-og-mobilepay">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <MenuIcon iconName="file-text" className="h-7 w-7 text-primary" />
            Skat og MobilePay-indbetalinger på casino
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Et spørgsmål vi ofte modtager er, om MobilePay-indbetalinger til casinoer har skattemæssige konsekvenser. Det korte svar er: <strong>gevinster fra danske licenserede casinoer er skattefrie for spilleren</strong>. Casinoerne betaler 28 % afgift af deres bruttospilleindtægt, og denne afgift dækker den skat, der ellers ville påhvile spilleren. Du skal derfor ikke indberette gevinster fra danske casinoer til SKAT.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            MobilePay-transaktioner efterlader dog et klart revisionsspor, som kan være nyttigt i flere sammenhænge. For det første giver det dig et komplet overblik over dine indbetalinger via MobilePay-appens transaktionshistorik. For det andet kan det bruges som dokumentation, hvis du ønsker at holde styr på dit samlede casinoforbrug. Og for det tredje opfylder det eventuelle dokumentationskrav, hvis SKAT på noget tidspunkt beder om at se dine casino-transaktioner – selvom dette er yderst sjældent for danske licenserede casinoer.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Læs vores komplette{" "}
            <Link to="/casinoer/casino-og-skat" className="text-primary underline hover:text-primary/80">
              guide til casino og skat
            </Link>{" "}
            for en dybdegående gennemgang af afgiftsregler, udenlandske casinoer og skattefri gevinster.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            12. MOBILEPAY PÅ MOBIL CASINO
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="mobilepay-paa-mobil">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <MenuIcon iconName="smartphone" className="h-7 w-7 text-primary" />
            MobilePay på mobil casino – den perfekte kombination
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            MobilePay er designet til mobilbrug, og kombinationen af MobilePay og{" "}
            <Link to="/mobil-casino" className="text-primary underline hover:text-primary/80">
              mobil casino
            </Link>{" "}
            giver den mest friktionsfrie spiloplevelse. Når du spiller via din smartphones browser
            og ønsker at indbetale, fungerer flowet således:
          </p>
          <ol className="space-y-2 text-muted-foreground mb-4 ml-4 list-decimal list-inside">
            <li>Du trykker "Indbetaling" i casinoets mobilbrowser og vælger MobilePay</li>
            <li>Casinoet åbner automatisk MobilePay-appen (app-switch)</li>
            <li>Du ser betalingsanmodningen og godkender med biometri/PIN</li>
            <li>MobilePay sender dig automatisk tilbage til casinoets browser</li>
            <li>Pengene er på din konto – typisk inden du er tilbage i browseren</li>
          </ol>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Hele processen tager under 15 sekunder og kræver ingen indtastning af oplysninger.
            Sammenlignet med kreditkortindbetalinger, der kræver kortnummer, udløbsdato og CVV,
            er MobilePay markant hurtigere og mere bekvem – især på en lille mobilskærm. Vores test viste, at MobilePay-flowet på Spilleautomaten.dk er optimeret til mobilbrug med store, letlæselige knapper og automatisk app-switch, så du aldrig behøver at kopiere beløb eller reference-numre manuelt.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For spillere der foretrækker dedikerede apps, tilbyder nogle casinoer native iOS/Android
            apps med integreret MobilePay-support. Læs vores{" "}
            <Link to="/casino-app" className="text-primary underline hover:text-primary/80">
              casino app guide
            </Link>{" "}
            og{" "}
            <Link to="/mobil-casino/bedste-apps" className="text-primary underline hover:text-primary/80">
              bedste casino apps
            </Link>{" "}
            for en oversigt over de bedste casino-apps med MobilePay-integration.
          </p>
        </section>

        <ReviewScreenshot
          src={spilleautomatenLobby}
          alt="Spilleautomaten.dk lobby – Legacy of Dead hero-banner, live-gevinster med x-multiplikatorer, sidst spillede spil som Sweet Bonanza 1000 og Buffalo King"
          caption="Spilleautomatens lobby efter indbetaling: Fuldt spiludvalg med live-gevinstfeed, senest spillede spil og anbefalede titler – klar til spil inden for sekunder efter MobilePay-indbetaling"
        />

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            13. FEJLFINDING OG TROUBLESHOOTING
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="fejlfinding">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <MenuIcon iconName="help-circle" className="h-7 w-7 text-primary" />
            Fejlfinding – MobilePay virker ikke på casino
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Selvom MobilePay-indbetalinger er ekstremt pålidelige, kan der opstå situationer hvor transaktionen fejler. Her er de mest almindelige problemer og deres løsninger, baseret på vores erfaring og testdata:
          </p>

          <div className="space-y-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 text-red-600">Problem: "Betalingen kunne ikke gennemføres"</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Årsag:</strong> Utilstrækkelig saldo på den tilknyttede bankkonto, eller din daglige MobilePay-grænse (15.000 kr.) er nået.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Løsning:</strong> Tjek din banksaldo og MobilePays transaktionshistorik for at se, om du har nået den daglige grænse. Vent til næste dag, eller brug en alternativ betalingsmetode som Trustly eller bankoverførsel.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 text-red-600">Problem: MobilePay-appen åbner ikke automatisk</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Årsag:</strong> Typisk et browser-problem, hvor pop-up-blokkering forhindrer app-switch, eller MobilePay-appen ikke er opdateret.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Løsning:</strong> Opdater MobilePay-appen til nyeste version. Tillad pop-ups for casinoets website i din browser. Prøv alternativt at åbne casinoet i en anden browser (Safari/Chrome).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 text-red-600">Problem: Pengene er trukket, men ikke på casinokontoen</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Årsag:</strong> Sjælden teknisk fejl, typisk ved midlertidig nedetid hos betalingsprocessoren (f.eks. Winteq ApS).
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Løsning:</strong> Vent 5-10 minutter – pengene krediteres ofte med kort forsinkelse. Kontakt derefter casinoets kundeservice med dit MobilePay-transaktions-ID som dokumentation. Pengene returneres automatisk inden for 24 timer, hvis transaktionen ikke gennemføres.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 text-red-600">Problem: MobilePay vises ikke som betalingsmetode</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Årsag:</strong> Casinoet tilbyder ikke MobilePay, eller din IP-adresse indikerer, at du ikke befinder dig i Danmark.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Løsning:</strong> Tjek om casinoet er på vores liste over MobilePay-casinoer ovenfor. Hvis du bruger VPN, deaktiver den – MobilePay kræver typisk en dansk IP-adresse for casino-transaktioner. Kontakt casinoets support for at bekræfte MobilePay-tilgængelighed.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            14. ANSVARLIGT SPIL OG MOBILEPAY
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="ansvarligt-spil">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <MenuIcon iconName="alert-triangle" className="h-7 w-7 text-primary" />
            Ansvarligt spil med MobilePay – kontrol over dit forbrug
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            MobilePays hurtige og bekvemme indbetalingsproces er en fordel for de fleste spillere,
            men den kan også gøre det lettere at indbetale impulsivt. Det er derfor vigtigt at
            tage aktive forholdsregler for at sikre ansvarligt spil. Vi testede Spilleautomatens profil-sektion og kunne bekræfte, at din reelle saldo og bonussaldo altid er synlige i kontooversigten – et vigtigt værktøj for at bevare overblikket.
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4 ml-4">
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <span>
                <strong>Sæt indbetalingsgrænser:</strong> Alle danske casinoer tilbyder daglige,
                ugentlige og månedlige indbetalingsgrænser. Sæt disse grænser lavt og realistisk
                før din første indbetaling. Hos Spilleautomaten kan du ændre grænser under "Begrænsninger" i profil-menuen.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <span>
                <strong>Brug MobilePays egne grænser:</strong> Du kan sætte en lavere daglig grænse
                i MobilePay-appen under Indstillinger → Betalingsgrænser. Dette giver et ekstra
                sikkerhedsnet uafhængigt af casinoets grænser.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <span>
                <strong>Overvåg din saldo:</strong> Hold øje med din reelle saldo og bonussaldo i profil-menuen. Som vores screenshot viser, adskiller Spilleautomaten tydeligt mellem "Min reelle saldo" og "Min bonussaldo" – brug dette til at vurdere dit faktiske tab/gevinst.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <span>
                <strong>Overvej "cooling-off" perioder:</strong> Hvis du mærker en trang til at
                indbetale igen efter et tab, vent mindst 24 timer. Impulskontrol er nøglen til
                ansvarligt casinospil. MobilePays bekvemmelighed kan her være en ulempe – jo lettere det er at indbetale, jo vigtigere er det at have stærke personlige grænser.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <span>
                <strong>Brug selvudelukkelse ved behov:</strong> Alle danske casinoer er tilsluttet{" "}
                <Link to="/casino-uden-rofus" className="text-primary underline hover:text-primary/80">
                  ROFUS
                </Link>
                , hvor du kan udelukke dig selv i 24 timer, 1 måned, 3 måneder, 6 måneder eller permanent. ROFUS-udelukkelse blokerer også MobilePay-indbetalinger til alle danske casinoer.
              </span>
            </li>
          </ul>
        </section>

        <ReviewScreenshot
          src={spilleautomatenProfil}
          alt="Spilleautomaten profilmenu – reelle saldo 0,70 DKK, bonussaldo 0,00 DKK, knapper til indbetaling og udbetaling, Min kontooversigt"
          caption="Spilleautomatens profilmenu: Klar adskillelse af reel saldo og bonussaldo giver fuldt overblik over dit faktiske indestående – vigtigt for ansvarligt spil"
          size="compact"
        />

        <Card className="border-red-500/30 bg-red-500/5 mb-6 mt-6">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>⚠️ Har du brug for hjælp?</strong> Kontakt{" "}
              <Link to="/ansvarligt-spil/stopspillet" className="text-primary underline hover:text-primary/80">
                StopSpillet
              </Link>{" "}
              på telefon 70 22 28 25 (gratis, anonymt, 24/7) eller tilmeld dig{" "}
              <Link to="/ansvarligt-spil/rofus" className="text-primary underline hover:text-primary/80">
                ROFUS
              </Link>{" "}
              for selvudelukkelse fra alle danske licenserede casinoer. Du kan også kontakte din bank for at blokere MobilePay-betalinger til spillevirksomheder.
            </p>
          </CardContent>
        </Card>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            15. MOBILEPAYS FREMTID PÅ CASINOER
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="fremtiden">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <MenuIcon iconName="trending-up" className="h-7 w-7 text-primary" />
            MobilePays fremtid på danske casinoer – hvad kan vi forvente?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            MobilePay er allerede den dominerende indbetalingsmetode på danske casinoer, men der er flere udviklinger i horisonten, der kan ændre landskabet yderligere. Her er vores analyse af de vigtigste trends:
          </p>

          <h3 className="mb-3 text-xl font-semibold">Vipps MobilePay-fusionen og nordisk ekspansion</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Efter fusionen med norske Vipps i 2022 er MobilePay nu en del af en pan-nordisk betalingsplatform med over 11 millioner brugere på tværs af Danmark, Norge og Finland. For casino-segmentet kan dette betyde, at norske og finske casinoer med tid også vil kunne tilbyde MobilePay/Vipps-betalinger, hvilket kan åbne nye markeder og skabe synergier mellem de nordiske licenssystemer.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Potentielle udbetalinger via MobilePay</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den mest efterspurgte feature blandt danske casinospillere er muligheden for at hæve gevinster via MobilePay. Teknisk set er dette muligt – Vipps MobilePay understøtter allerede erhverv-til-person-overførsler i andre brancher. Hindringen er primært regulatorisk: udbetalinger fra casinoer kræver strengere KYC/AML-kontroller end indbetalinger, og MobilePays nuværende infrastruktur er endnu ikke designet til at håndtere disse krav. Vi forventer, at denne feature vil komme inden for 2-3 år, men der er ingen officiel tidsplan.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Instant settlements og forbedret reconciliation</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            MobilePay arbejder på at forbedre den tekniske infrastruktur med instant settlements for erhvervskunder, hvilket kan reducere den allerede minimale forsinkelse mellem godkendelse og kreditering yderligere. For spillere vil dette betyde endnu hurtigere indbetalinger – potentielt under 3 sekunder fra godkendelse til spilleklar konto.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Uanset fremtidige udviklinger er MobilePay allerede i dag den mest optimale indbetalingsmetode for danske casinospillere. Kombinationen af hastighed, sikkerhed, nul gebyrer og fuld bonuskvalificering gør det til et selvsagt valg. Vi opdaterer denne guide løbende, efterhånden som nye funktioner og casinoer tilføjes.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════════════════════ */}
        <FAQSection faqs={mobilepayFaqs} />

        <Separator className="my-12" />

        <LatestNewsByCategory pagePath="/casino-med-mobilepay" />
        <RelatedGuides currentPath="/casino-med-mobilepay" />

        <AuthorBio author="jonas" />
      </ContentPageLayout>

      <StickyCtaBySlug slug="spilleautomaten" />
    </>
  );
};

export default CasinoMedMobilePay;
