import { Helmet } from "react-helmet-async";
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
  Smartphone,
  Zap,
  Wallet,
  Banknote,
  Lock,
  HelpCircle,
  User,
  CalendarDays,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const betalingsmetoderFaqs = [
  {
    question: "Kan jeg bruge MobilePay på alle danske casinoer?",
    answer:
      "Nej, MobilePay er ikke tilgængeligt på alle danske casinoer, men det bliver stadig mere populært. Flere licenserede spillesteder har tilføjet MobilePay til indbetalinger, mens udbetalinger via MobilePay fortsat er sjældne. Tjek altid casinoets betalingsmuligheder, før du opretter en konto.",
  },
  {
    question: "Hvilken betalingsmetode har de hurtigste udbetalinger?",
    answer:
      "E-wallets som PayPal, Skrill og Neteller samt Trustly er blandt de hurtigste. Transaktioner behandles ofte inden for få timer, mens bankoverførsler og kortbetalinger kan tage 1–5 hverdage. Hastigheden afhænger også af casinoets interne behandlingstid.",
  },
  {
    question: "Er der indbetalingsgrænser på danske casinoer?",
    answer:
      "Ja, alle licenserede danske casinoer har indbetalingsgrænser for at fremme ansvarligt spil. Du kan ofte selv sætte personlige grænser via casinoets indstillinger, og der kan desuden være minimums- og maksimumsbeløb afhængigt af den valgte betalingsmetode.",
  },
  {
    question: "Skal jeg verificere min betalingsmetode?",
    answer:
      "Ja, danske casinoer er underlagt Spillemyndighedens regler, og du skal verificere din betalingsmetode for at kunne hæve penge. Det sker typisk ved at uploade dokumentation som et billede af dit kort eller en bankudskrift. Verifikationen er en sikkerhedsforanstaltning mod svindel.",
  },
  {
    question: "Er kryptovaluta tilladt på danske casinoer?",
    answer:
      "Nej, ifølge Spillemyndighedens regler må danske licenserede casinoer ikke acceptere kryptovalutaer som Bitcoin eller Ethereum. Alle transaktioner skal kunne spores og reguleres efter gældende standarder.",
  },
  {
    question: "Hvad er forskellen på e-wallets og bankoverførsler?",
    answer:
      "E-wallets som PayPal, Skrill og Trustly fungerer som digitale tegnebøger, der muliggør hurtige transaktioner – ofte inden for timer. Bankoverførsler går direkte gennem din bank og er meget sikre, men kan tage 2–5 hverdage at gennemføre.",
  },
];

const paymentMethodsOverview = [
  {
    method: "Visa / Mastercard",
    deposit: "Øjeblikkelig",
    withdrawal: "1–3 dage",
    fees: "Mulige kortgebyrer",
    availability: "Høj",
    security: "3D Secure, kryptering",
  },
  {
    method: "Bankoverførsel",
    deposit: "1–3 dage",
    withdrawal: "2–5 dage",
    fees: "Ofte ingen",
    availability: "Middel",
    security: "Bankverifikation",
  },
  {
    method: "PayPal",
    deposit: "Øjeblikkelig",
    withdrawal: "0–24 timer",
    fees: "Mulige gebyrer",
    availability: "Høj",
    security: "To-faktor godkendelse",
  },
  {
    method: "Skrill",
    deposit: "Øjeblikkelig",
    withdrawal: "0–24 timer",
    fees: "Mulige gebyrer",
    availability: "Middel",
    security: "To-faktor godkendelse",
  },
  {
    method: "Trustly",
    deposit: "Øjeblikkelig",
    withdrawal: "0–24 timer",
    fees: "Ofte ingen",
    availability: "Høj",
    security: "Bankverifikation",
  },
  {
    method: "MobilePay",
    deposit: "Øjeblikkelig",
    withdrawal: "Varierer",
    fees: "Ingen ved indbetaling",
    availability: "Middel",
    security: "Mobilgodkendelse",
  },
  {
    method: "Paysafecard",
    deposit: "Øjeblikkelig",
    withdrawal: "Ikke muligt",
    fees: "Mulige gebyrer",
    availability: "Høj",
    security: "PIN-kode beskyttelse",
  },
  {
    method: "Kryptovaluta",
    deposit: "Varierer",
    withdrawal: "Varierer",
    fees: "Netværksgebyrer",
    availability: "Ikke tilladt i DK",
    security: "Blockchain-kryptering",
  },
];

const Betalingsmetoder = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: betalingsmetoderFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Betalingsmetoder på Danske Online Casinoer 2026 | Casinoaftaler</title>
        <meta
          name="description"
          content="Komplet guide til betalingsmetoder på danske online casinoer. Sammenlign Visa, MobilePay, PayPal, Trustly, Skrill og flere – hastighed, gebyrer og sikkerhed."
        />
        <link rel="canonical" href="https://bonushuset-buddy.lovable.app/betalingsmetoder" />
        <meta property="og:title" content="Betalingsmetoder på Danske Online Casinoer 2026" />
        <meta
          property="og:description"
          content="Komplet guide til betalingsmetoder på danske online casinoer. Sammenlign hastighed, gebyrer og sikkerhed."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bonushuset-buddy.lovable.app/betalingsmetoder" />
        <meta name="twitter:title" content="Betalingsmetoder på Danske Online Casinoer 2026" />
        <meta
          name="twitter:description"
          content="Sammenlign de bedste betalingsmetoder til danske casinoer – MobilePay, Visa, PayPal, Trustly og mere."
        />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage:
            "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
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
        {/* Meta info bar */}
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>
              Skrevet af:{" "}
              <span className="font-medium text-foreground">Casinoaftaler</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>
              Siden opdateret:{" "}
              <span className="font-medium text-foreground">11-02-2026</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>
              Læsetid:{" "}
              <span className="font-medium text-foreground">8 Min.</span>
            </span>
          </div>
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
            præferencer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I Danmark reguleres alle betalinger af Spillemyndigheden, så kun
            godkendte og sikre løsninger kan bruges. Vi har samlet en komplet
            oversigt, der gør det nemt at sammenligne de mest populære metoder.
          </p>
        </section>

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

        {/* Kredit-/Debetkort */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Kredit- og debetkort</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Kredit- og debetkort er blandt de mest udbredte betalingsmetoder på
            danske online casinoer. Indbetalinger sker øjeblikkeligt, og
            sikkerheden er høj takket være 3D Secure og SSL-kryptering. Forskellen
            ligger i, at kreditkort lader dig spille med lånte penge, mens
            debetkort trækker direkte fra din bankkonto.
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
                  casinoer kan opkræve gebyrer ved udbetalinger.
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
                  alternativ metode som bankoverførsel.
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
                  tage 2–5 hverdage, mens instant-løsninger som Trustly giver
                  øjeblikkelige indbetalinger.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* E-wallets */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">E-wallets</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Elektroniske tegnebøger er hurtigt blevet blandt de mest populære
            betalingsløsninger hos danske spillere. I stedet for fysiske kort
            overfører du penge via en digital konto – indbetalinger sker
            øjeblikkeligt, og udbetalinger er ofte markant hurtigere end ved
            traditionelle metoder.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "PayPal",
                desc: "En af de mest anerkendte e-wallets med høj sikkerhed og bred accept hos danske casinoer. Transaktioner sker øjeblikkeligt, og dine betalingsoplysninger holdes private.",
              },
              {
                name: "Neteller",
                desc: "Udviklet med fokus på online gaming. Hurtige transaktioner og mulighed for eksklusive bonusser, men vær opmærksom på eventuelle gebyrer ved overførsler til din bank.",
              },
              {
                name: "Skrill",
                desc: "Et godt alternativ til Neteller med ind- og udbetalinger, der ofte gennemføres på under 24 timer. Populær blandt spillere, der prioriterer hurtige pengeoverførsler.",
              },
              {
                name: "Trustly",
                desc: "Fungerer som en bro mellem din bank og casinoet – øjeblikkelige bankoverførsler uden separat konto. Understøtter også Pay N Play, hvor du kan spille uden registrering.",
              },
              {
                name: "Zimpler",
                desc: "En hurtig og sikker løsning, der minder om Trustly. Øjeblikkelige transaktioner ofte uden gebyrer, og du kan nemt sætte betalingsgrænser for bedre kontrol.",
              },
              {
                name: "Payz",
                desc: "En fleksibel e-wallet med mulighed for både ind- og udbetalinger. Tilbyder virtuelle og fysiske betalingskort, hvilket giver ekstra fleksibilitet i hverdagen.",
              },
            ].map((wallet) => (
              <Card key={wallet.name} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Wallet className="h-5 w-5 text-primary" />
                    {wallet.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{wallet.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Mobile betalinger */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Mobile betalinger</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Mobilbetalinger er blevet en af de mest brugervenlige måder at
            overføre penge på. Danske spillere har i stigende grad taget løsninger
            som MobilePay, Apple Pay og Google Pay til sig – du kan indbetale
            direkte fra mobilen uden at indtaste kortoplysninger hver gang.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                name: "MobilePay",
                icon: Smartphone,
                desc: "Danmarks mest populære mobile betalingsløsning. Indsæt penge med få tryk – hurtigt og intuitivt. Udbetalinger er dog ikke altid understøttet.",
              },
              {
                name: "Apple Pay",
                icon: Smartphone,
                desc: "Hurtig og sikker betaling via iPhone, iPad og Mac. Bekræftes med Face ID eller Touch ID for ekstra sikkerhed. Udbetalinger er sjældent mulige.",
              },
              {
                name: "Google Pay",
                icon: Smartphone,
                desc: "Android-brugeres svar på Apple Pay. Hurtige og sikre betalinger uden kortoplysninger. Ikke alle casinoer tilbyder udbetalinger via Google Pay.",
              },
              {
                name: "Paysafecard",
                icon: Lock,
                desc: "Et forudbetalt kort, der fungerer som en digital værdikupon. Perfekt til kontrol over forbruget – men udbetalinger er ikke mulige med denne metode.",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
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
            godkendelse via SMS eller bankapp.
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
            {[
              {
                title: "Hurtige løsninger",
                desc: "MobilePay, Trustly og e-wallets sikrer øjeblikkelige transaktioner.",
              },
              {
                title: "Klassiske kortbetalinger",
                desc: "Visa og Mastercard er stabile og bredt accepteret, men udbetalinger kan tage tid.",
              },
              {
                title: "Bankoverførsler",
                desc: "Troværdige og sikre, men sjældent de hurtigste.",
              },
              {
                title: "Forudbetalte kort",
                desc: "God kontrol over forbruget, men ikke egnet til udbetalinger.",
              },
              {
                title: "Kryptovaluta",
                desc: "Ikke understøttet af danske licenserede casinoer.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* FAQ */}
        <section className="mb-12">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Ofte Stillede Spørgsmål</h2>
            </div>
            <p className="text-muted-foreground">
              Alt du behøver at vide om betalingsmetoder på danske casinoer.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {betalingsmetoderFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-border bg-card px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </>
  );
};

export default Betalingsmetoder;
