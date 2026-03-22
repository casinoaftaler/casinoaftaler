import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { FAQSection } from "@/components/FAQSection";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import mobilepayHero from "@/assets/heroes/casino-mobilepay-hero.jpg";
import {
  Smartphone,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Lock,
  Scale,
  BarChart3,
  ArrowRight,
  Zap,
  CreditCard,
  Info,
  Users,
  Globe,
  Eye,
  TrendingUp,
  Star,
  Settings,
  Banknote,
  ShieldCheck,
  Timer,
} from "lucide-react";

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
        en bankoverførsel og har ingen bonusrestriktioner. Dette gør MobilePay til den ideelle
        betalingsmetode for bonusjægere.
      </>
    ),
  },
  {
    question: "Virker MobilePay på alle danske casinoer?",
    answer:
      "Nej, ikke alle danske casinoer tilbyder MobilePay. Mens det er den mest populære betalingsmetode i Danmark generelt, kræver integration med MobilePay Business en separat aftale fra casinoets side. De fleste større danske casinoer som SpilDanskNu, Danske Spil og flere andre tilbyder MobilePay. Mindre casinoer og internationale operatører med dansk licens tilbyder det ikke altid.",
  },
  {
    question: "Hvor hurtigt overføres pengene med MobilePay?",
    answer:
      "Indbetalinger med MobilePay er øjeblikkelige – pengene er typisk på din casinokonto inden for 5-30 sekunder efter godkendelse i appen. Dette er en af de hurtigste indbetalingsmetoder, kun matchet af Apple Pay og Trustly. Sammenlignet med bankoverførsler (1-3 bankdage) og kreditkort (øjeblikkeligt men med potentielle gebyrer) er MobilePay den optimale kombination af hastighed, sikkerhed og nul gebyrer.",
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

  // HowTo JSON-LD for MobilePay deposit
  const howToJsonLd = {
    "@type": "HowTo",
    name: "Sådan indbetaler du med MobilePay på casino",
    description: "Step-by-step guide til at indbetale på et dansk casino med MobilePay.",
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
        text: "Naviger til casinoets kasseside og vælg MobilePay som indbetalingsmetode. Indtast det beløb du ønsker at indbetale.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Godkend i MobilePay-appen",
        text: "Åbn MobilePay-appen på din telefon og godkend betalingen med PIN, fingeraftryk eller Face ID. Pengene overføres øjeblikkeligt.",
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
              <CreditCard className="mr-1.5 h-3.5 w-3.5" />
              Betalingsmetoder
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Casino med MobilePay – Indbetal Nemt og Sikkert
            </h1>
            <p className="text-lg text-white/80">
              Komplet guide til MobilePay på danske casinoer: Hvilke casinoer accepterer det,
              step-by-step indbetalingsguide, gebyrer, sikkerhed og sammenligning med alternativer.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="28 Min." />
        <p className="text-sm text-muted-foreground mt-2 mb-6">
          Skrevet af Jonas Theill, casino betalingsekspert hos Casinoaftaler.dk.
        </p>

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={mobilepayHero}
            alt="Smartphone med mobil betalingsinterface, casino chips og betalingskort i moderne fintech-æstetik"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>


        {/* ══════════════════════════════════════════════════════════════
            1. INTRODUKTION: HVORFOR MOBILEPAY?
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="hvorfor-mobilepay">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Smartphone className="h-7 w-7 text-primary" />
            Hvorfor MobilePay er den foretrukne betalingsmetode på danske casinoer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            MobilePay er Danmarks mest udbredte mobilbetalingsløsning med over 4,5 millioner
            aktive brugere – svarende til næsten 80 % af den voksne befolkning. Appen, der
            oprindeligt blev lanceret af Danske Bank i 2013, er i dag en uafhængig betalingsplatform
            integreret med samtlige danske banker. For casinospillere tilbyder MobilePay en unik
            kombination af hastighed, sikkerhed og bekvemmelighed, der gør den til den naturlige
            førstevalg for indbetalinger.
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
            og den intuitive brugeroplevelse.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Øjeblikkelig</h4>
                <p className="text-sm text-muted-foreground">Indbetaling på 5-30 sek.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Banknote className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Nul gebyrer</h4>
                <p className="text-sm text-muted-foreground">Ingen transaktionsgebyrer</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <ShieldCheck className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Bankklasse sikkerhed</h4>
                <p className="text-sm text-muted-foreground">Biometri + PSD2-compliant</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Bonuskvalificeret</h4>
                <p className="text-sm text-muted-foreground">Ingen e-wallet-restriktioner</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            2. CASINOER MED MOBILEPAY
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="casinoer-med-mobilepay">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Globe className="h-7 w-7 text-primary" />
            Alle danske casinoer med MobilePay
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ikke alle danske licenserede casinoer tilbyder MobilePay som betalingsmetode. Integration
            kræver en aftale med MobilePay Business, og nogle internationale operatører med dansk licens
            har endnu ikke implementeret denne løsning. Nedenfor finder du en oversigt over de casinoer,
            der aktuelt accepterer MobilePay, baseret på vores seneste test (marts 2026).
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
                    <Link to="/casino-anmeldelser/spilleautomaten" className="text-primary underline hover:text-primary/80">Spilleautomaten</Link>
                  </td>
                  <td className="text-center py-3 px-4">50 kr.</td>
                  <td className="text-center py-3 px-4">8.000 kr.</td>
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
            Bemærk: MobilePay har en generel daglig transaktionsgrænse på 15.000 kr. for forbrugere.
            Denne grænse gælder uafhængigt af casinoets egne grænser og dine personlige
            indbetalingsgrænser. Hvis du har brug for at indbetale større beløb, kan{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">
              Trustly
            </Link>{" "}
            eller bankoverførsel være et bedre alternativ.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            3. STEP-BY-STEP: INDBETAL MED MOBILEPAY
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="saadan-indbetaler-du">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Settings className="h-7 w-7 text-primary" />
            Sådan indbetaler du med MobilePay – step-by-step
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Processen med at indbetale på et dansk casino med MobilePay er enkel og tager typisk
            under 60 sekunder fra start til slut. Her er en detaljeret gennemgang:
          </p>

          <div className="space-y-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Vælg casino og opret konto</h4>
                    <p className="text-sm text-muted-foreground">
                      Vælg et dansk licenseret casino fra vores liste ovenfor. Opret en konto med
                      MitID-verifikation – dette er lovpligtigt for alle danske casinoer og sikrer,
                      at du er over 18 år. Processen tager typisk 2-5 minutter. Sæt altid{" "}
                      <Link to="/ansvarligt-spil/spillegraenser" className="text-primary underline hover:text-primary/80">
                        indbetalingsgrænser
                      </Link>{" "}
                      som det første efter kontooprettelse.
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
                    <h4 className="font-semibold mb-1">Gå til Kassen og vælg MobilePay</h4>
                    <p className="text-sm text-muted-foreground">
                      Naviger til casinoets kasseside (ofte kaldet "Indbetal" eller "Kassen"). Find
                      MobilePay i listen over betalingsmetoder – det er typisk markeret med det
                      blå MobilePay-logo. Indtast det beløb du ønsker at indbetale (mindst
                      50-100 kr. afhængigt af casino). Hvis du vil aktivere en{" "}
                      <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">
                        velkomstbonus
                      </Link>
                      , skal du sikre dig, at minimumsindbetalingen for bonussen er opfyldt.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Godkend i MobilePay-appen</h4>
                    <p className="text-sm text-muted-foreground">
                      Du modtager automatisk en betalingsanmodning i din MobilePay-app. Bekræft
                      beløbet og godkend med din pinkode, fingeraftryk eller Face ID. Pengene
                      overføres øjeblikkeligt til din casinokonto – typisk inden for 5-30 sekunder.
                      Du kan nu begynde at spille med det indbetalte beløb (plus eventuel bonus).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            4. BELØBSGRÆNSER, GEBYRER OG BEHANDLINGSTID
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="graenser-og-gebyrer">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            Beløbsgrænser, gebyrer og behandlingstid
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            En af MobilePays største fordele som casino-betalingsmetode er den totale fraværelse af
            transaktionsgebyrer. Hverken MobilePay eller de danske casinoer opkræver gebyrer for
            indbetalinger. Dette er i skarp kontrast til kreditkort, hvor nogle banker klassificerer
            casinoindbetalinger som "kontantforskud" og opkræver 2-4 % gebyr plus renter fra dag
            ét – en praksis der kan koste spilleren hundredvis af kroner årligt.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Grænser i praksis</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Dine indbetalingsgrænser styres af tre uafhængige lag, og den laveste grænse er altid
            den gældende:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4 ml-4">
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <span>
                <strong>MobilePay-grænse:</strong> 15.000 kr. dagligt for privatpersoner. Denne kan
                ikke ændres.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <span>
                <strong>Casinogrænse:</strong> Varierer fra 8.000-20.000 kr. pr. transaktion afhængigt
                af casinoet. Se tabellen ovenfor for specifikke grænser.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <span>
                <strong>Personlig indbetalingsgrænse:</strong> Den grænse du selv har sat på casinoet
                (lovpligtigt for alle danske casinoer). Vi anbefaler altid at sætte denne grænse
                lavere end MobilePays og casinoets grænse.
              </span>
            </li>
          </ul>

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
            <Scale className="h-7 w-7 text-primary" />
            MobilePay vs. Trustly vs. Apple Pay – detaljeret sammenligning
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            De tre mest populære gebyrfrie betalingsmetoder på danske casinoer er MobilePay, Trustly
            og Apple Pay. Alle tre tilbyder øjeblikkelige indbetalinger uden gebyrer, men de
            differentierer sig på flere vigtige punkter. Her er en dybdegående sammenligning:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-blue-500" />
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
                  <Lock className="h-5 w-5 text-green-500" />
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
                  <CreditCard className="h-5 w-5 text-gray-500" />
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
            hurtigste og mest bekvemme indbetalingsoplevelse, mens Trustly tilbyder de hurtigste
            udbetalinger (1-24 timer mod 1-3 bankdage for standardoverførsler). Denne kombination
            sikrer, at du altid har adgang til dine midler med minimal ventetid og nul gebyrer.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For iPhone-brugere kan{" "}
            <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">
              Apple Pay
            </Link>{" "}
            være et attraktivt alternativ til MobilePay, da det tilbyder en lignende one-tap oplevelse.
            Dog er Apple Pay's tilgængelighed på danske casinoer mere begrænset, og betalingen trækkes
            fra dit tilknyttede kort, hvilket betyder, at bankens eventuelle casinorestriktioner stadig
            kan gælde.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            6. BONUSKVALIFICERING MED MOBILEPAY
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="bonuskvalificering">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Star className="h-7 w-7 text-primary" />
            Bonuskvalificering med MobilePay
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            En af MobilePays største fordele som casino-betalingsmetode er, at den altid kvalificerer
            til bonustilbud. I den internationale casinoverden er det almindeligt, at e-wallets som
            Skrill, Neteller og PayPal er ekskluderet fra velkomstbonusser og andre kampagner. Dette
            skyldes, at disse betalingsmetoder historisk er blevet brugt til bonus abuse.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            MobilePay behandles derimod som en direkte bankbetaling og har ingen bonusrestriktioner
            hos danske casinoer. Det betyder, at du kan bruge MobilePay til at aktivere:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4 ml-4">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>
                <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">
                  Velkomstbonusser
                </Link>{" "}
                – typisk 100 % match op til 1.000 kr. (dansk max)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>
                <Link to="/free-spins" className="text-primary underline hover:text-primary/80">
                  Free spins
                </Link>{" "}
                – ofte inkluderet som del af velkomstpakken
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>
                <Link to="/reload-bonus" className="text-primary underline hover:text-primary/80">
                  Reload bonusser
                </Link>{" "}
                – ugentlige eller månedlige match-bonusser for eksisterende kunder
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>
                <Link to="/cashback-bonus" className="text-primary underline hover:text-primary/80">
                  Cashback-programmer
                </Link>{" "}
                – procentdel af nettotab returneret
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>VIP-loyalitetsprogrammer – comp points optjenes fuldt ud (se vores{" "}
                <Link to="/vip-program" className="text-primary underline hover:text-primary/80">
                  VIP-guide
                </Link>)
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
            bonuskvalificering.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            7. UDBETALINGER – ALTERNATIVER
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="udbetalinger">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Banknote className="h-7 w-7 text-primary" />
            Udbetalinger: Kan du hæve via MobilePay?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Nej</strong> – MobilePay understøtter aktuelt ikke udbetalinger fra casinoer. Dette
            er en væsentlig begrænsning, som du bør være opmærksom på, før du vælger MobilePay som
            din primære betalingsmetode. Når du ønsker at hæve dine gevinster, skal du vælge en
            alternativ udbetalingsmetode.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            De mest almindelige udbetalingsmetoder på danske casinoer er:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-500" />
                  Trustly (anbefalet)
                </h4>
                <p className="text-sm text-muted-foreground">
                  Hurtigste metode: 1-24 timer direkte til din bankkonto. Ingen gebyrer.
                  Kræver NemID/MitID-godkendelse. Tilgængelig hos de fleste danske casinoer.
                  Læs mere i vores{" "}
                  <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">
                    Trustly-guide
                  </Link>.
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
                  er nogen øvre grænse.
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
                ventetid og nul transaktionsomkostninger.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            8. SIKKERHED OG REGULERING
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="sikkerhed">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            Sikkerhed og regulering – MitID, Spillemyndigheden og AML
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            MobilePay på casino er beskyttet af flere lag af sikkerhedsforanstaltninger, der
            tilsammen gør det til en af de sikreste måder at indbetale på. Lad os gennemgå de
            vigtigste sikkerhedsaspekter:
          </p>

          <h3 className="mb-3 text-xl font-semibold">MobilePay-appens sikkerhed</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            MobilePay kræver biometrisk autentificering (fingeraftryk eller Face ID) eller PIN-kode
            for hver transaktion. Appen er reguleret af Finanstilsynet og overholder EU's
            Payment Services Directive 2 (PSD2), der kræver stærk kundeautentificering (SCA)
            for alle elektroniske betalinger. Dine bankoplysninger deles aldrig direkte med casinoet –
            MobilePay fungerer som et mellemled, der beskytter dine finansielle data.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Casinoets regulering</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Alle danske casinoer, der accepterer MobilePay, er licenserede af{" "}
            <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">
              Spillemyndigheden
            </Link>{" "}
            og underlagt strenge krav til spillerbeskyttelse, anti-hvidvask (AML) og ansvarligt spil.
            Casinoerne er forpligtet til at verificere spillernes identitet via MitID, implementere
            transaktionsovervågning og rapportere mistænkelige aktiviteter til myndighederne.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lock className="h-5 w-5 text-green-500" />
                  Sikkerhedslag
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>✅ MobilePay biometrisk autentificering (PSD2 SCA)</p>
                <p>✅ MitID-verifikation ved kontooprettelse</p>
                <p>✅ TLS 1.3 / 256-bit SSL-kryptering</p>
                <p>✅ Spillemyndighedens licensbetingelser</p>
                <p>✅ AML-compliance og transaktionsovervågning</p>
                <p>✅ ROFUS-integration (selvudelukkelse)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-500" />
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
            9. MOBILEPAY PÅ MOBIL CASINO
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="mobilepay-paa-mobil">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Smartphone className="h-7 w-7 text-primary" />
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
            <li>Du trykker "Indbetal" i casinoets mobilbrowser og vælger MobilePay</li>
            <li>Casinoet åbner automatisk MobilePay-appen (app-switch)</li>
            <li>Du ser betalingsanmodningen og godkender med biometri/PIN</li>
            <li>MobilePay sender dig automatisk tilbage til casinoets browser</li>
            <li>Pengene er på din konto – typisk inden du er tilbage i browseren</li>
          </ol>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Hele processen tager under 15 sekunder og kræver ingen indtastning af oplysninger.
            Sammenlignet med kreditkortindbetalinger, der kræver kortnummer, udløbsdato og CVV,
            er MobilePay markant hurtigere og mere bekvem – især på en lille mobilskærm.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For spillere der foretrækker dedikerede apps, tilbyder nogle casinoer native iOS/Android
            apps med integreret MobilePay-support. Læs vores{" "}
            <Link to="/casino-app" className="text-primary underline hover:text-primary/80">
              casino app guide
            </Link>{" "}
            for en oversigt over de bedste casino-apps med MobilePay-integration.
          </p>
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            10. ANSVARLIGT SPIL OG MOBILEPAY
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12" id="ansvarligt-spil">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-7 w-7 text-primary" />
            Ansvarligt spil med MobilePay
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            MobilePays hurtige og bekvemme indbetalingsproces er en fordel for de fleste spillere,
            men den kan også gøre det lettere at indbetale impulsivt. Det er derfor vigtigt at
            tage aktive forholdsregler for at sikre ansvarligt spil:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4 ml-4">
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <span>
                <strong>Sæt indbetalingsgrænser:</strong> Alle danske casinoer tilbyder daglige,
                ugentlige og månedlige indbetalingsgrænser. Sæt disse grænser lavt og realistisk
                før din første indbetaling.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <span>
                <strong>Brug MobilePays egne grænser:</strong> Du kan sætte en lavere daglig grænse
                i MobilePay-appen under Indstillinger → Betalingsgrænser. Dette giver et ekstra
                sikkerhedsnet.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <span>
                <strong>Overvej "cooling-off" perioder:</strong> Hvis du mærker en trang til at
                indbetale igen efter et tab, vent mindst 24 timer. Impulskontrol er nøglen til
                ansvarligt casinospil.
              </span>
            </li>
          </ul>

          <Card className="border-red-500/30 bg-red-500/5 mb-6">
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
                for selvudelukkelse fra alle danske licenserede casinoer. Du kan også sætte din
                MobilePay til at blokere casinobetalinger helt via din bank.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="mb-12" />

        {/* ══════════════════════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════════════════════ */}
        <FAQSection faqs={mobilepayFaqs} />

        <Separator className="my-12" />

        <AuthorBio author="jonas" />

        <Separator className="my-12" />

        <LatestNewsByCategory pagePath="/casino-med-mobilepay" />
        <RelatedGuides currentPath="/casino-med-mobilepay" />
      </div>

      <StickyCtaBySlug slug="spildansknu" />
    </>
  );
};

export default CasinoMedMobilePay;
