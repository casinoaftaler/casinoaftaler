import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import betalingsmetoderHero from "@/assets/heroes/betalingsmetoder-hero.jpg";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import applePayLogo from "@/assets/payments/apple-pay.png";
import mobilepayLogo from "@/assets/payments/mobilepay.png";
import paypalLogo from "@/assets/payments/paypal.png";
import skrillLogo from "@/assets/payments/skrill.png";
import trustlyLogo from "@/assets/payments/trustly.png";
import zimplerLogo from "@/assets/payments/zimpler.png";
import paysafecardLogo from "@/assets/payments/paysafecard.png";
import bankTransferLogo from "@/assets/payments/bank-transfer.png";
import visaMastercardLogo from "@/assets/payments/visa-mastercard.png";
import revolutLogo from "@/assets/payments/revolut.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CreditCard,
  ShieldCheck,
  Zap,
  Wallet,
  Banknote,
  HelpCircle,
  User,
  CalendarDays,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Star,
} from "lucide-react";

const paymentMethodsOverview = [
  { method: "Visa / Mastercard", deposit: "Øjeblikkelig", withdrawal: "1–3 dage", fees: "Mulige kortgebyrer", availability: "Høj", security: "3D Secure, kryptering" },
  { method: "Bankoverførsel", deposit: "1–3 dage", withdrawal: "2–5 dage", fees: "Ofte ingen", availability: "Middel", security: "Bankverifikation" },
  { method: "PayPal", deposit: "Øjeblikkelig", withdrawal: "0–24 timer", fees: "Mulige gebyrer", availability: "Høj", security: "To-faktor godkendelse" },
  { method: "Skrill", deposit: "Øjeblikkelig", withdrawal: "0–24 timer", fees: "Mulige gebyrer", availability: "Middel", security: "To-faktor godkendelse" },
  { method: "Trustly", deposit: "Øjeblikkelig", withdrawal: "0–24 timer", fees: "Ofte ingen", availability: "Høj", security: "Bankverifikation" },
  { method: "MobilePay", deposit: "Øjeblikkelig", withdrawal: "Varierer", fees: "Ingen ved indbetaling", availability: "Middel", security: "Mobilgodkendelse" },
  { method: "Paysafecard", deposit: "Øjeblikkelig", withdrawal: "Ikke muligt", fees: "Mulige gebyrer", availability: "Høj", security: "PIN-kode beskyttelse" },
  { method: "Kryptovaluta", deposit: "Varierer", withdrawal: "Varierer", fees: "Netværksgebyrer", availability: "Ikke tilladt i DK", security: "Blockchain-kryptering" },
];

const paymentMethods = [
  { name: "Apple Pay", slug: "apple-pay", logo: applePayLogo, description: "Apples mobile betalingsløsning med Face ID/Touch ID – øjeblikkelige indbetalinger uden at dele kortoplysninger.", highlight: "Biometrisk sikkerhed med tokenisering" },
  { name: "MobilePay", slug: "mobilepay", logo: mobilepayLogo, description: "Danmarks foretrukne betalingsapp med MitID-godkendelse – hurtig og sikker betaling direkte fra mobilen.", highlight: "Danmarks mest populære mobilbetaling" },
  { name: "PayPal", slug: "paypal", logo: paypalLogo, description: "Verdens mest anerkendte e-wallet med stærk køberbeskyttelse og hurtige transaktioner til og fra casinoer.", highlight: "430+ millioner brugere og stærk svindelkontrol" },
  { name: "Skrill", slug: "skrill", logo: skrillLogo, description: "Populær e-wallet med VIP-fordele og lynhurtige transaktioner – separat saldo giver fuld budgetkontrol.", highlight: "VIP-program og hurtige udbetalinger" },
  { name: "Trustly", slug: "trustly", logo: trustlyLogo, description: "Direkte konto-til-konto-overførsel via open banking og MitID – ingen kortnumre eller ekstra konti nødvendige.", highlight: "Ingen gebyrer og direkte bankoverførsel" },
  { name: "Zimpler", slug: "zimpler", logo: zimplerLogo, description: "Svensk fintech med open banking – overfør penge direkte fra din bank til casinoet på få sekunder.", highlight: "PSD2-kompatibel og MitID-sikret" },
  { name: "Paysafecard", slug: "paysafecard", logo: paysafecardLogo, description: "Forudbetalt voucher-løsning med PIN-kode – perfekt til anonym indbetaling uden bankkort.", highlight: "Anonym og sikker med forudbetalt kort" },
  { name: "Bankoverførsel", slug: "bankoverforsler", logo: bankTransferLogo, description: "Traditionel og troværdig overførsel direkte fra din bankkonto – høj sikkerhed med bankens egen godkendelse.", highlight: "Direkte bankoverførsel uden mellemmænd" },
  { name: "Visa / Mastercard", slug: "visa-mastercard", logo: visaMastercardLogo, description: "Verdens mest brugte betalingskort med øjeblikkelige indbetalinger, 3D Secure og bred accept hos alle casinoer.", highlight: "Bred accept og 3D Secure-beskyttelse" },
  { name: "Revolut", slug: "revolut", logo: revolutLogo, description: "Moderne fintech-app med budgetværktøjer, gratis valutaveksling og øjeblikkelige casinoindbetalinger.", highlight: "Gratis valutaveksling og budgetkontrol" },
];

const Betalingsmetoder = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const betalingsmetoderFaqs = [
    {
      question: "Hvilken betalingsmetode giver de hurtigste udbetalinger fra danske casinoer?",
      answer: (
        <>
          <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link> og e-wallets som{" "}
          <Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link> og{" "}
          <Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link> er hurtigst med typisk 0–24 timers behandlingstid. Trustly overfører direkte til din bankkonto via open banking og MitID – ingen mellemmænd, ingen ekstra konti.{" "}
          <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link> behandler indbetalinger øjeblikkeligt, men udbetalingstiden varierer og er typisk 1–2 dage. Kortbetalinger via{" "}
          <Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">Visa/Mastercard</Link> tager 1–3 bankdage, mens traditionelle bankoverførsler kan tage 2–5 hverdage. Da alle danske casinoer bruger MitID, er identitetsverifikation allerede gennemført, hvilket eliminerer forsinkelser ved første udbetaling.
        </>
      ),
    },
    {
      question: "Påvirker mit valg af betalingsmetode, om jeg kan aktivere en velkomstbonus?",
      answer: (
        <>
          Ja, nogle{" "}
          <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link> udelukker specifikke betalingsmetoder – særligt e-wallets som Skrill og Neteller er ofte ekskluderet fra bonusaktivering. Det skyldes, at disse metoder historisk er blevet brugt til bonusmisbrug. Bankoverførsler, Visa/Mastercard, MobilePay og Trustly kvalificerer næsten altid til bonusser. Tjek altid bonusvilkårene, før du indbetaler – det specifikke betalingsmetodekrav bør fremgå tydeligt.{" "}
          <Link to="/betalingsmetoder/paysafecard" className="text-primary underline hover:text-primary/80">Paysafecard</Link> kvalificerer typisk til bonusser, men kan ikke bruges til udbetalinger. Vi angiver eventuelle betalingsrestriktioner i vores{" "}
          <Link to="/casino-anmeldelser" className="text-primary underline hover:text-primary/80">casino anmeldelser</Link>.
        </>
      ),
    },
    {
      question: "Er der indbetalings- og udbetalingsgrænser på danske casinoer?",
      answer: (
        <>
          Ja, danske casinoer har både obligatoriske og valgfrie grænser. Spillemyndigheden kræver, at alle licenserede casinoer tilbyder indbetalingsgrænser som en del af{" "}
          <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>-værktøjerne – du kan sætte daglige, ugentlige og månedlige lofter. Minimumsindbetaling er typisk 50–100 kr. hos de fleste casinoer, mens minimumsudbetalingen varierer fra 75 kr. til 200 kr. Maksimale daglige udbetalingsgrænser varierer markant: fra 25.000 kr. til ubegrænset hos top-casinoer. Ved store jackpotgevinster (100.000+ kr.) udbetaler de fleste casinoer i rater efter individuel aftale. Vi angiver specifikke grænser i vores{" "}
          <Link to="/casino-anmeldelser" className="text-primary underline hover:text-primary/80">anmeldelser</Link>.
        </>
      ),
    },
    {
      question: "Skal jeg bruge samme betalingsmetode til indbetaling og udbetaling?",
      answer:
        "De fleste danske casinoer kræver, at du udbetaler til den samme metode, du indbetalte med – dette er en anti-hvidvask-foranstaltning påkrævet af Spillemyndigheden. Undtagelser inkluderer Paysafecard (kun indbetaling) og Apple Pay (varierer), hvor casinoet tilbyder alternative udbetalingsmetoder som bankoverførsel. Hvis du har indbetalt med flere metoder, udbetales typisk proportionelt til de anvendte metoder. Vi anbefaler at indbetale med den metode, du også ønsker at modtage udbetalinger på – det forenkler processen markant og undgår potentielle forsinkelser ved verifikation af alternative udbetalingskanaler.",
    },
    {
      question: "Er kryptovaluta tilladt som betalingsmetode på danske casinoer?",
      answer:
        "Nej, ifølge Spillemyndighedens regulering er kryptovalutaer som Bitcoin, Ethereum og Litecoin ikke tilladte som betalingsmetode hos danske licenserede casinoer. Alle transaktioner skal kunne spores og reguleres efter de danske anti-hvidvask-standarder, og kryptobetalinger lever ikke op til disse krav. Udenlandske casinoer uden dansk licens accepterer ofte krypto, men ved at spille der mister du al spillerbeskyttelse: ingen ROFUS-tilslutning, ingen klageadgang, skattepligtige gevinster og ingen garanti for dine indeståender. De regulerede betalingsmetoder – kort, bankoverførsel, e-wallets og mobile betalingsløsninger – dækker alle danske spilleres behov.",
    },
    {
      question: "Hvad er forskellen på en e-wallet, en bankoverførsel og en mobilbetaling i praksis?",
      answer: (
        <>
          E-wallets (PayPal, Skrill) fungerer som digitale tegnebøger med separat saldo – du overfører penge fra din bank til e-walleten og bruger den som mellemmand. Fordel: hurtige transaktioner og du deler ikke bankoplysninger med casinoet. Ulempe: mulige gebyrer og potentiel bonusudelukkelse.{" "}
          <Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">Bankoverførsler</Link> går direkte fra din bankkonto via open banking (Trustly) eller traditionel overførsel – ingen mellemmænd, høj sikkerhed, men langsommere ved traditionelle overførsler. Mobilbetalinger (MobilePay, Apple Pay) bruger din eksisterende betalingsinfrastruktur (mobilnummer eller Face ID/Touch ID) – den hurtigste og mest bekvemme metode for indbetalinger, med varierende udbetalingshastighed.
        </>
      ),
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Kan jeg bruge MobilePay på alle danske casinoer?", acceptedAnswer: { "@type": "Answer", text: "Nej, MobilePay er ikke tilgængeligt på alle danske casinoer, men det bliver stadig mere populært." } },
      { "@type": "Question", name: "Hvilken betalingsmetode har de hurtigste udbetalinger?", acceptedAnswer: { "@type": "Answer", text: "E-wallets som PayPal, Skrill og Trustly er blandt de hurtigste. Transaktioner behandles ofte inden for få timer." } },
      { "@type": "Question", name: "Er der indbetalingsgrænser på danske casinoer?", acceptedAnswer: { "@type": "Answer", text: "Ja, alle licenserede danske casinoer har indbetalingsgrænser for at fremme ansvarligt spil." } },
      { "@type": "Question", name: "Skal jeg verificere min betalingsmetode?", acceptedAnswer: { "@type": "Answer", text: "Ja, danske casinoer er underlagt Spillemyndighedens regler, og du skal verificere din betalingsmetode for at kunne hæve penge." } },
      { "@type": "Question", name: "Er kryptovaluta tilladt på danske casinoer?", acceptedAnswer: { "@type": "Answer", text: "Nej, ifølge Spillemyndighedens regler må danske licenserede casinoer ikke acceptere kryptovalutaer." } },
      { "@type": "Question", name: "Hvad er forskellen på e-wallets og bankoverførsler?", acceptedAnswer: { "@type": "Answer", text: "E-wallets som PayPal og Skrill fungerer som digitale tegnebøger med hurtige transaktioner, mens bankoverførsler kan tage 2–5 hverdage." } },
    ],
  };

  return (
    <>
      <SEO
        title="Betalingsmetoder på Danske Online Casinoer 2026 | Casinoaftaler"
        description="Komplet guide til betalingsmetoder på danske online casinoer. Sammenlign Visa, MobilePay, PayPal, Trustly, Skrill og flere – hastighed, gebyrer og sikkerhed."
        jsonLd={faqJsonLd}
      />

      {/* Hero Section */}
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
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Betalingsmetoder på Danske Online Casinoer
            </h1>
            <p className="text-lg text-white/80">
              Hurtige og sikre betalinger er afgørende for en god casinooplevelse.
              Vi gennemgår de mest populære betalingsløsninger, så du kan finde den
              metode, der passer bedst til dine behov.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="11-02-2026" readTime="15 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={betalingsmetoderHero} alt="Betalingsmetoder – betalingskort og digitale wallets" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Dine betalingsmuligheder – lette, hurtige og sikre
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hos danske casinoer finder du et bredt udvalg af betalingsløsninger,
            men det kan være svært at gennemskue, hvilken der passer bedst til
            dig. Hastighed, gebyrer, sikkerhed og tilgængelighed varierer fra
            metode til metode – og det rigtige valg afhænger af dine personlige
            præferencer. Betalingsmetoden kan også påvirke, hvilke{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
            du kan aktivere – visse e-wallets kan være udelukket fra bonustilbud. Se vores{" "}
            <Link to="/casino-bonus" className="text-primary underline hover:text-primary/80">casino bonus oversigt</Link>{" "}
            for en komplet gennemgang af bonustyper.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I Danmark reguleres alle betalinger af Spillemyndigheden, så kun
            godkendte og sikre løsninger kan bruges. Vi har samlet en komplet
            oversigt, der gør det nemt at sammenligne de mest populære metoder.
            Læs også om{" "}
            <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link>{" "}
            og{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>{" "}
            for at forstå, hvordan din betalingsmetode kan påvirke bonusvilkårene. Du kan også læse vores{" "}
            <Link to="/casino-anmeldelser" className="text-primary underline hover:text-primary/80">casino anmeldelser</Link>{" "}
            for at se, hvilke betalingsmetoder hvert casino tilbyder.
          </p>
        </section>

        <InlineCasinoCards title="Casinoer med de bedste betalingsmetoder" count={4} />

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Sammenligning af betalingsmetoder</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold">Metode</th>
                  <th className="px-4 py-3 text-left font-semibold">Indbetaling</th>
                  <th className="px-4 py-3 text-left font-semibold">Udbetaling</th>
                  <th className="px-4 py-3 text-left font-semibold">Gebyrer</th>
                  <th className="hidden px-4 py-3 text-left font-semibold md:table-cell">
                    Tilgængelighed
                  </th>
                  <th className="hidden px-4 py-3 text-left font-semibold lg:table-cell">
                    Sikkerhed
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentMethodsOverview.map((pm, i) => (
                  <tr
                    key={pm.method}
                    className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}
                  >
                    <td className="px-4 py-3 font-medium">{pm.method}</td>
                    <td className="px-4 py-3 text-muted-foreground">{pm.deposit}</td>
                    <td className="px-4 py-3 text-muted-foreground">{pm.withdrawal}</td>
                    <td className="px-4 py-3 text-muted-foreground">{pm.fees}</td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                      {pm.availability}
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
                      {pm.security}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ===== PAYMENT METHOD GUIDES WITH LOGOS ===== */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Dybdegående guider til hver betalingsmetode</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Udforsk vores komplette guider til de mest populære betalingsmetoder på danske casinoer. Hver guide dækker sikkerhed, fordele, ulemper, minimumsindbetaling og bonusvilkår. Den valgte betalingsmetode kan påvirke, om du kvalificerer dig til{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
            og{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {paymentMethods.map((pm) => (
              <Card key={pm.slug} className="group relative">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Star className="h-5 w-5 text-primary" />
                      {pm.name}
                    </CardTitle>
                    <img
                      src={pm.logo}
                      alt={`${pm.name} logo`}
                      className="h-10 w-auto max-w-[100px] rounded object-contain md:h-12"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{pm.description}</p>
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline" className="text-xs">{pm.highlight}</Badge>
                    <Link
                      to={`/betalingsmetoder/${pm.slug}`}
                      className="text-sm font-medium text-primary underline hover:text-primary/80"
                    >
                      Læs mere →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <InlineCasinoCards title="Casinoer med de bedste betalingsmetoder" />

        <Separator className="my-10" />

        {/* Kredit-/Debetkort */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Kredit- og debetkort</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Kredit- og debetkort er blandt de mest udbredte betalingsmetoder på
            danske online casinoer. Indbetalinger sker øjeblikkeligt, og
            sikkerheden er høj takket være 3D Secure og SSL-kryptering. Forskellen
            ligger i, at kreditkort lader dig spille med lånte penge, mens
            debetkort trækker direkte fra din bankkonto. De fleste{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
            og{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>{" "}
            kan aktiveres med kortbetalinger.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Visa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Visa er bredt accepteret hos næsten alle danske casinoer.
                  Indbetalinger sker øjeblikkeligt, mens udbetalinger typisk tager
                  1–3 hverdage. Sikkerheden er i top med 3D Secure, men visse
                  casinoer kan opkræve gebyrer ved udbetalinger.{" "}
                  <Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">Læs vores komplette Visa/Mastercard guide</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Mastercard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Mastercard fungerer på samme måde som Visa med hurtige
                  indbetalinger. Vær dog opmærksom på, at ikke alle spillesteder
                  tilbyder udbetalinger til Mastercard – i så fald kan du vælge en
                  alternativ metode som{" "}
                  <Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsel</Link>.{" "}
                  <Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">Læs den fulde guide her</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Visa Electron & Maestro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Visa Electron og Maestro fungerer som rene debetkort – du kan kun
                  bruge penge, der allerede står på kontoen. Det giver bedre kontrol
                  over forbruget, men de er ikke lige så udbredte som Visa og
                  Mastercard hos danske casinoer.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Banknote className="h-5 w-5 text-primary" />
                  Bankoverførsler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Bankoverførsler er en stabil og sikker løsning, hvor
                  transaktionerne går direkte via din bank. Standardoverførsler kan
                  tage 2–5 hverdage, mens instant-løsninger som{" "}
                  <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
                  giver øjeblikkelige indbetalinger.{" "}
                  <Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">Læs vores bankoverførsels-guide</Link>.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Kryptovaluta */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                Kryptovalutaer – ikke tilladt i Danmark
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Selvom kryptovalutaer som Bitcoin og Ethereum er populære på
                internationale casinoer, er de ikke tilladt på det danske marked.
                Ifølge Spillemyndighedens regler skal alle transaktioner kunne
                spores og reguleres. Spillere, der ønsker at bruge kryptovaluta,
                skal finde udenlandske casinoer, som dog ikke nødvendigvis
                overholder de samme sikkerhedsstandarder.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Sådan vælger du */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan vælger du den rette betalingsmetode
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Den rigtige betalingsmetode afhænger af, hvad du prioriterer højest.
            Er det hurtige transaktioner, lave gebyrer eller maksimal sikkerhed?
            Overvej også, om metoden kvalificerer dig til{" "}
            <Link to="/bonus-uden-indbetaling" className="text-primary underline hover:text-primary/80">bonusser uden indbetaling</Link>{" "}
            eller{" "}
            <Link to="/bonus-uden-omsaetningskrav" className="text-primary underline hover:text-primary/80">bonusser uden omsætningskrav</Link>.
            Du kan også finde inspiration i vores{" "}
            <Link to="/top-casino-online" className="text-primary underline hover:text-primary/80">top 10 online casinoer</Link>{" "}
            og de{" "}
            <Link to="/spiludviklere" className="text-primary underline hover:text-primary/80">bedste spiludviklere</Link>.
            Her er de vigtigste faktorer at overveje:
          </p>
          <div className="space-y-3">
            {[
              {
                title: "Hastighed",
                desc: "E-wallets, MobilePay og Trustly giver øjeblikkelige betalinger, mens bankoverførsler og kort kan tage dage.",
                icon: Zap,
              },
              {
                title: "Gebyrer",
                desc: "E-wallets kan have transaktionsgebyrer, mens bankoverførsler og debetkort ofte er gebyrfrie.",
                icon: Banknote,
              },
              {
                title: "Sikkerhed",
                desc: "Kortbetalinger har 3D Secure, bankoverførsler kræver bankgodkendelse, og MobilePay bruger mobilverifikation.",
                icon: ShieldCheck,
              },
              {
                title: "Fleksibilitet",
                desc: "Ikke alle metoder understøtter både ind- og udbetalinger – f.eks. MobilePay og Paysafecard har begrænsninger.",
                icon: Wallet,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Sikkerhed & ansvarligt spil */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Betalingssikkerhed & ansvarligt spil
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Når penge er involveret, er sikkerhed en topprioritet. Danske casinoer
            anvender SSL-kryptering til at beskytte dine betalingsoplysninger, og
            kortbetalinger er beskyttet med 3D Secure, som kræver ekstra
            godkendelse via SMS eller bankapp. Læs mere om{" "}
            <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>{" "}
            og de værktøjer, som danske casinoer tilbyder.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Vær altid opmærksom på phishing-forsøg og mistænkelige e-mails. Brug
            kun licenserede casinoer, og del aldrig dine betalingsoplysninger
            udenfor sikre platforme.
          </p>

          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-primary" />
                Spil ansvarligt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Sæt altid et budget, hold pauser, og spil aldrig for mere end du
                har råd til at tabe. Danske casinoer giver mulighed for at sætte
                personlige indbetalingsgrænser.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Alle casinoer på vores liste tilbyder selvudelukkelse via{" "}
                <a
                  href="https://www.rofus.nu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  ROFUS
                </a>
                . Har du brug for hjælp, kan du kontakte{" "}
                <a
                  href="https://www.stopspillet.dk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  StopSpillet.dk
                </a>
                .
              </p>
              <p className="text-xs text-muted-foreground">
                18+ | Spil ansvarligt | Annoncering
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Opsummering */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Opsummering</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Hurtige løsninger</h3>
                <p className="text-sm text-muted-foreground">
                  <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>,{" "}
                  <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>,{" "}
                  <Link to="/betalingsmetoder/zimpler" className="text-primary underline hover:text-primary/80">Zimpler</Link>{" "}
                  og e-wallets sikrer øjeblikkelige transaktioner.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Klassiske kortbetalinger</h3>
                <p className="text-sm text-muted-foreground">
                  <Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">Visa og Mastercard</Link>{" "}
                  er stabile og bredt accepteret, men udbetalinger kan tage tid.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Bankoverførsler</h3>
                <p className="text-sm text-muted-foreground">
                  <Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">Bankoverførsler</Link>{" "}
                  er troværdige og sikre, men sjældent de hurtigste.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Forudbetalte kort</h3>
                <p className="text-sm text-muted-foreground">
                  <Link to="/betalingsmetoder/paysafecard" className="text-primary underline hover:text-primary/80">Paysafecard</Link>{" "}
                  giver god kontrol over forbruget, men er ikke egnet til udbetalinger.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Kryptovaluta</h3>
                <p className="text-sm text-muted-foreground">Ikke understøttet af danske licenserede casinoer.</p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath="/betalingsmetoder" />

        <FAQSection title="Ofte stillede spørgsmål om betalingsmetoder" faqs={betalingsmetoderFaqs} />
      </div>
    </>
  );
};

export default Betalingsmetoder;
