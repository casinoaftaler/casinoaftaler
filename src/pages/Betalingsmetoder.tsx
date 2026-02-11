import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
} from "lucide-react";

// FAQs moved inside component for Link support

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

const paymentMethodGuides = [
  {
    id: "apple-pay",
    name: "Apple Pay",
    icon: Smartphone,
    intro: "Apples mobile betalingsløsning har gjort det muligt for iPhone- og iPad-brugere at indbetale på casinoer med blot et tryk og biometrisk godkendelse. Face ID eller Touch ID erstatter kortnumre og PIN-koder, og transaktionen gennemføres på få sekunder.",
    whatIs: "Apple Pay blev lanceret i oktober 2014 og fungerer via Apples digitale tegnebog, Wallet. Dine kortoplysninger tokeniseres – det vil sige, at casinoet aldrig modtager dit rigtige kortnummer, men i stedet en engangskode. Tjenesten understøttes i millioner af butikker, apps og på nettet verden over, og Apple tager en lille procentdel fra kortudstederen for hver transaktion.",
    security: "Apple Pay benytter tokenisering, biometrisk godkendelse (Face ID/Touch ID) og ende-til-ende-kryptering. Dine kortoplysninger deles aldrig direkte med forhandleren, og hver transaktion kræver aktiv godkendelse fra din enhed. Apple overholder PCI DSS-standarder og har næsten 100 % oppetid på sin betalingsinfrastruktur.",
    howToDeposit: "Log ind på casinoets kasse, vælg Apple Pay som betalingsmetode, og bekræft med Face ID eller Touch ID. Beløbet lander øjeblikkeligt på din spillekonto. Ved udbetaling vælger du Apple Pay i udbetalingssektionen, indtaster beløbet og godkender igen biometrisk. Pengene vender typisk tilbage til dit kort inden for få timer.",
    pros: ["Øjeblikkelig indbetaling med Face ID/Touch ID", "Kortoplysninger forbliver skjulte via tokenisering", "Høj sikkerhed med kryptering", "Som regel ingen ekstra gebyrer"],
    cons: ["Kræver en Apple-enhed (iPhone, iPad eller Mac)", "Ikke tilgængeligt på alle danske casinoer", "Udbetalinger kan være begrænsede hos visse udbydere"],
    minDeposit: "Minimumsindskud varierer – typisk fra 45 kr. til 100 kr. afhængigt af casinoet.",
    bonus: "De fleste danske casinoer behandler Apple Pay-indbetalinger på lige fod med kortbetalinger, så du kvalificerer dig til velkomstbonusser. Fordi verifikationen sker øjeblikkeligt via Wallet, frigives bonussen med det samme.",
    tax: "Gevinster fra casinoer med dansk licens er skattefrie. Casinoet betaler allerede afgift til staten, så dine præmier er dine at beholde.",
  },
  {
    id: "mobilepay",
    name: "MobilePay",
    icon: Smartphone,
    intro: "MobilePay er Danmarks foretrukne mobile betalingsapp, som gør det muligt at indbetale på casinoer med blot et par tryk og en MitID-bekræftelse. Ingen kortnumre, ingen netbank – bare hurtig og sikker betaling direkte fra mobilen.",
    whatIs: "MobilePay blev lanceret af Danske Bank i 2013 med en vision om at gøre betalinger lige så enkle som at sende en SMS. I dag er MobilePay en af de mest brugte betalingsmetoder i Danmark og Finland med millioner af transaktioner hver måned. I 2022 fusionerede MobilePay med den norske tjeneste Vipps og danner nu Vipps MobilePay – en samlet nordisk betalingsløsning.",
    security: "MobilePay beskytter alle transaktioner med avanceret kryptering og kræver MitID-verifikation. Appen kan kun bruges på én enhed ad gangen, og modtagerens fulde navn vises altid før godkendelse. En blokeringsfunktion lader dig afvise uønskede anmodninger.",
    howToDeposit: "Vælg MobilePay i casinoets kasse, indtast dit mobilnummer og beløb. Du modtager en anmodning i MobilePay-appen, som du godkender med et swipe eller MitID. Pengene lander øjeblikkeligt. Udbetalinger er mulige hos visse casinoer, men ikke alle understøtter det endnu.",
    pros: ["Hurtige og nemme indbetalinger uden kortoplysninger", "Ingen gebyrer på de fleste casinoer", "Høj sikkerhed med kryptering og MitID", "Fungerer på både Android og iOS"],
    cons: ["Ikke alle casinoer understøtter MobilePay til udbetalinger", "Kan have beløbsgrænser pr. transaktion", "Begrænset international anvendelse"],
    minDeposit: "Typisk 100 kr. som minimum, mens maks. grænsen kan variere op til 37.500–40.000 kr. pr. dag.",
    bonus: "MobilePay behandles som en bankoverførsel, så du kvalificerer dig næsten altid til velkomstbonusser. Modsat visse e-wallets er MobilePay sjældent udelukket fra bonustilbud.",
    tax: "Gevinster fra danske licenserede casinoer er 100 % skattefrie. Spiller du derimod på udenlandske sider uden dansk licens, kan gevinster beskattes med op til 42 %.",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: Wallet,
    intro: "PayPal er en af verdens mest anerkendte digitale betalingsløsninger og kombinerer hastighed, sikkerhed og fleksibilitet. Mange danske casinoer accepterer PayPal til både ind- og udbetalinger, og dine kortoplysninger deles aldrig direkte med casinoet.",
    whatIs: "PayPal blev grundlagt i 1998 under navnet Confinity og fusionerede senere med Elon Musks X.com. I 2002 blev det opkøbt af eBay, og i 2015 blev det en selvstændig virksomhed igen. I dag har PayPal over 430 millioner aktive brugere på verdensplan og hovedsæde i San Jose, Californien. Tjenesten bruges til alt fra e-handel og freelancing til online casinoer.",
    security: "PayPal anvender avanceret kryptering, køberbeskyttelse og totrinsbekræftelse. Dine betalingsoplysninger forbliver skjulte for casinoet, hvilket reducerer risikoen for svindel markant. PayPal har strenge retningslinjer for godkendte transaktioner, og konti kan midlertidigt låses ved mistænkelig aktivitet.",
    howToDeposit: "Vælg PayPal i casinoets betalingssektion, og du bliver sendt videre til PayPal, hvor du logger ind og godkender transaktionen. Pengene er tilgængelige med det samme. Ved udbetaling følger du samme proces, og PayPal overfører typisk pengene øjeblikkeligt til din PayPal-konto, hvorfra du kan sende dem videre til banken.",
    pros: ["Hurtige og sikre transaktioner", "Kortoplysninger deles aldrig med casinoet", "Stærk køberbeskyttelse og svindelkontrol", "Ofte tilgængelig til både ind- og udbetalinger"],
    cons: ["Ikke alle casinoer accepterer PayPal", "Mulige gebyrer på visse transaktioner (1–2 %)", "Visse bonustilbud kan udelukke e-wallets"],
    minDeposit: "Typisk 100 kr. som minimum. Maksimumsgrænsen varierer – visse casinoer tillader op til 110.000 kr. ved indbetalinger.",
    bonus: "Nogle casinoer udelukker e-wallets fra velkomstbonusser, men mange accepterer stadig PayPal fuldt ud. Tjek altid betingelserne hos det specifikke casino.",
    tax: "Gevinster fra casinoer med dansk licens er skattefrie. På udenlandske sider kan gevinster beskattes med op til 42 %.",
  },
  {
    id: "skrill",
    name: "Skrill",
    icon: Wallet,
    intro: "Skrill er en populær e-wallet, der giver dig mulighed for lynhurtige indbetalinger uden at skulle dele kortoplysninger direkte med casinoet. Udbetalinger er ofte markant hurtigere end traditionelle bankoverførsler.",
    whatIs: "Skrill blev grundlagt i 2001 under navnet Moneybookers og gennemgik en stor rebranding i 2011. I dag er Skrill en del af Paysafe Group (som også ejer Neteller og Paysafecard) og opererer i over 120 lande med understøttelse af mere end 40 valutaer. Tjenesten tilbyder desuden forudbetalte kort, kryptovaluta-handel og VIP-fordele for loyale brugere.",
    security: "Skrill er licenseret af det britiske Financial Conduct Authority (FCA) og anvender avanceret kryptering samt totrinsbekræftelse. Dine betalingsoplysninger forbliver anonyme over for casinoet, og muligheden for en separat e-wallet-saldo giver bedre kontrol over dit spillebudget.",
    howToDeposit: "Vælg Skrill i casinoets kasse, indtast beløbet og log ind på din Skrill-konto for at godkende. Pengene er tilgængelige med det samme. Ved udbetaling vælger du Skrill, indtaster beløbet og bekræfter. Behandlingstiden afhænger af casinoet, men er ofte samme dag.",
    pros: ["Øjeblikkelige indbetalinger med høj sikkerhed", "Mulighed for VIP-fordele og loyalitetsprogrammer", "Mobilvenlig og nem at bruge", "Separat saldo giver budgetkontrol"],
    cons: ["Kan have gebyrer ved udbetalinger til bankkonto", "Ikke tilgængelig på alle danske casinoer", "Visse casinoer udelukker Skrill fra bonustilbud"],
    minDeposit: "Typisk 50–100 kr. som standard. Nogle casinoer kan kræve 200 kr. i forbindelse med bonusaktivering.",
    bonus: "Visse casinoer ekskluderer Skrill fra velkomstbonusser, men mange accepterer det stadig. Tjek altid vilkårene, inden du indbetaler.",
    tax: "Gevinster fra danske licenserede casinoer er skattefrie. Gevinster fra udenlandske casinoer uden dansk licens kan være skattepligtige.",
  },
  {
    id: "trustly",
    name: "Trustly",
    icon: Banknote,
    intro: "Trustly fungerer som en direkte bro mellem din bankkonto og casinoet – øjeblikkelige overførsler uden kortoplysninger eller separate e-wallet-konti. Med MitID-godkendelse er processen både hurtig og sikker.",
    whatIs: "Trustly blev grundlagt i Sverige i 2008 med en vision om hurtigere og sikrere online betalinger. I stedet for at gemme kortoplysninger eller kræve en digital tegnebog, bruger Trustly open banking til at forbinde din bank direkte med casinoet. Virksomheden ejes i dag af Nordic Capital og har håndteret milliarder af transaktioner på verdensplan.",
    security: "Trustly bruger bankens egne sikkerhedsstandarder og avanceret kryptering. Ingen følsomme data opbevares eller deles med tredjepart. Transaktioner godkendes via MitID (i Danmark) eller BankID, og betalinger bekræftes øjeblikkeligt. Trustly er reguleret af europæiske finansielle myndigheder og overholder PSD2-kravene.",
    howToDeposit: "Vælg Trustly i kassen, vælg din bank, log ind med MitID og godkend overførslen. Pengene lander på din spillekonto inden for sekunder. Ved udbetaling vælger du Trustly, angiver beløbet og godkender – pengene sendes direkte til din bankkonto, ofte inden for minutter.",
    pros: ["Direkte bankoverførsler uden kort eller e-wallet", "Hurtige ind- og udbetalinger", "Ingen gebyrer fra Trustly", "Høj sikkerhed med MitID/BankID"],
    cons: ["Ikke alle casinoer accepterer Trustly", "Udbetalinger kan tage lidt længere end e-wallets", "Kreditkort kan ikke bruges via Trustly"],
    minDeposit: "Typisk 100 kr. som minimum. Visse casinoer kan have lavere eller højere grænser.",
    bonus: "Trustly-indbetalinger kvalificerer næsten altid til velkomstbonusser, da det betragtes som en bankoverførsel. Ingen bonusbegrænsninger som ved visse e-wallets.",
    tax: "Gevinster fra danske licenserede casinoer er skattefrie. Spil altid på casinoer med dansk licens for at undgå skattemæssige komplikationer.",
  },
  {
    id: "zimpler",
    name: "Zimpler",
    icon: Zap,
    intro: "Zimpler er en svensk fintech-løsning, der overfører penge direkte mellem din bank og casinoet på få sekunder via open banking og MitID. Ingen kortnumre, ingen ekstra konti – bare hurtig konto-til-konto-betaling.",
    whatIs: "Zimpler blev grundlagt i 2012 i Göteborg af Johan Friis og Kristofer Edlund under navnet PugglePay. Virksomheden skiftede senere navn og fokuserede på direkte konto-til-konto-transaktioner via open banking. I dag ejes Zimpler af moderselskabet Zimpler AB med kontorer i Stockholm, Málaga og São Paulo. Tjenesten er især populær i den nordiske spilbranche og ekspanderer mod Danmark, Tyskland og Latinamerika.",
    security: "Zimpler opererer under svensk finanstilsyn og overholder hele PSD2-pakken med stærk kundegodkendelse. Betalinger kører via MitID eller BankID, og kundemidler holdes på separate klientkonti. Ingen kortdata eller følsomme oplysninger lagres hos tredjepart, og firmaet gennemgår regelmæssige IT- og compliance-audits.",
    howToDeposit: "Vælg Zimpler i kassen, indtast beløbet og log ind med MitID. Zimpler viser dine tilknyttede bankkonti – vælg den ønskede, bekræft med et swipe i bankappen, og saldoen opdateres inden for sekunder. Ved udbetaling følger du samme proces i omvendt rækkefølge, og pengene sendes direkte til din bankkonto – typisk inden for få minutter.",
    pros: ["Øjeblikkelig konto-til-konto-overførsel uden kortoplysninger", "MitID-login giver tofaktorsikkerhed", "Ingen gebyrer fra Zimpler på danske licenserede sider", "Stærk svensk tilsynsregulering og PSD2-kompatibilitet"],
    cons: ["Nogle banker har daglige grænser, der kan forsinke større beløb", "Ingen kreditmulighed som ved traditionelle kort", "Endnu ikke tilgængeligt på alle danske casinoer"],
    minDeposit: "Typisk 100 kr. som minimum hos de fleste casinoer. Maks. indbetaling kan være op til 110.000 kr.",
    bonus: "Zimpler-indbetalinger giver adgang til de samme velkomstbonusser som kortbetalinger – typisk 100 % op til 1.000 kr. Ingen gebyrer trækker fra bonusbeløbet, og bonuskoden udfyldes ofte automatisk.",
    tax: "Gevinster fra danske licenserede casinoer er skattefrie. Spiller du på udenlandske sider uden dansk licens, skal gevinster indberettes som personlig indkomst.",
  },
];

const Betalingsmetoder = () => {
  const [activeGuide, setActiveGuide] = useState("apple-pay");
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const betalingsmetoderFaqs = [
    {
      question: "Kan jeg bruge MobilePay på alle danske casinoer?",
      answer: (
        <>
          Nej, MobilePay er ikke tilgængeligt på alle danske casinoer, men det bliver stadig mere populært. Tjek altid casinoets betalingsmuligheder, før du opretter en konto. MobilePay kvalificerer dig typisk til{" "}
          <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>.
        </>
      ),
    },
    {
      question: "Hvilken betalingsmetode har de hurtigste udbetalinger?",
      answer: (
        <>
          E-wallets som PayPal, Skrill og Neteller samt Trustly er blandt de hurtigste. Transaktioner behandles ofte inden for få timer, mens bankoverførsler og kortbetalinger kan tage 1–5 hverdage. Se vores{" "}
          <Link to="/nye-casinoer" className="text-primary underline hover:text-primary/80">nye casinoer</Link>{" "}
          for at finde de hurtigste udbetalingsmuligheder.
        </>
      ),
    },
    {
      question: "Er der indbetalingsgrænser på danske casinoer?",
      answer: (
        <>
          Ja, alle licenserede danske casinoer har indbetalingsgrænser for at fremme{" "}
          <Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>.
          Du kan ofte selv sætte personlige grænser via casinoets indstillinger. Grænser kan også påvirke, hvilke{" "}
          <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>{" "}
          du kan aktivere.
        </>
      ),
    },
    {
      question: "Skal jeg verificere min betalingsmetode?",
      answer:
        "Ja, danske casinoer er underlagt Spillemyndighedens regler, og du skal verificere din betalingsmetode for at kunne hæve penge. Det sker typisk ved at uploade dokumentation som et billede af dit kort eller en bankudskrift.",
    },
    {
      question: "Er kryptovaluta tilladt på danske casinoer?",
      answer:
        "Nej, ifølge Spillemyndighedens regler må danske licenserede casinoer ikke acceptere kryptovalutaer som Bitcoin eller Ethereum. Alle transaktioner skal kunne spores og reguleres efter gældende standarder.",
    },
    {
      question: "Hvad er forskellen på e-wallets og bankoverførsler?",
      answer: (
        <>
          E-wallets som PayPal og Skrill fungerer som digitale tegnebøger med hurtige transaktioner. Bankoverførsler går direkte via din bank og er meget sikre, men kan tage 2–5 hverdage. Visse e-wallets kan være udelukket fra{" "}
          <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
          – tjek altid{" "}
          <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskravene</Link>.
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
              <span className="font-medium text-foreground">15 Min.</span>
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
            præferencer. Betalingsmetoden kan også påvirke, hvilke{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
            du kan aktivere – visse e-wallets kan være udelukket fra bonustilbud.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I Danmark reguleres alle betalinger af Spillemyndigheden, så kun
            godkendte og sikre løsninger kan bruges. Vi har samlet en komplet
            oversigt, der gør det nemt at sammenligne de mest populære metoder.
            Læs også om{" "}
            <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link>{" "}
            og{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>{" "}
            for at forstå, hvordan din betalingsmetode kan påvirke bonusvilkårene.
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

        {/* ===== DETAILED PAYMENT METHOD GUIDES ===== */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Dybdegående guider til hver betalingsmetode</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Klik på en betalingsmetode nedenfor for at læse en komplet guide med sikkerhed, fordele, ulemper, minimumsindbetaling og bonusvilkår. Den valgte betalingsmetode kan påvirke, om du kvalificerer dig til{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
            og{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>.
          </p>

          <Tabs value={activeGuide} onValueChange={setActiveGuide} className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
              {paymentMethodGuides.map((guide) => (
                <TabsTrigger
                  key={guide.id}
                  value={guide.id}
                  className="flex items-center gap-1.5 text-xs sm:text-sm"
                >
                  <guide.icon className="h-3.5 w-3.5" />
                  {guide.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {paymentMethodGuides.map((guide) => (
              <TabsContent key={guide.id} value={guide.id} className="mt-6 space-y-6">
                {/* Intro */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <guide.icon className="h-6 w-6 text-primary" />
                      {guide.name} på danske casinoer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{guide.intro}</p>
                  </CardContent>
                </Card>

                {/* What is it */}
                <div>
                  <h3 className="mb-3 text-xl font-bold">Hvad er {guide.name}?</h3>
                  <p className="text-muted-foreground leading-relaxed">{guide.whatIs}</p>
                </div>

                {/* Security */}
                <div>
                  <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    Sikkerhed og pålidelighed
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{guide.security}</p>
                </div>

                {/* How to deposit */}
                <div>
                  <h3 className="mb-3 text-xl font-bold flex items-center gap-2">
                    <ArrowRight className="h-5 w-5 text-primary" />
                    Sådan bruger du {guide.name} til ind- og udbetalinger
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{guide.howToDeposit}</p>
                </div>

                {/* Pros & Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-border bg-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-lg text-primary">
                        <ThumbsUp className="h-5 w-5" />
                        Fordele
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {guide.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                        <ThumbsDown className="h-5 w-5" />
                        Ulemper
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {guide.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Min deposit, bonus, tax */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-lg border border-border bg-card p-4">
                    <h4 className="mb-2 font-semibold flex items-center gap-2">
                      <Banknote className="h-4 w-4 text-primary" />
                      Minimumsindskud
                    </h4>
                    <p className="text-sm text-muted-foreground">{guide.minDeposit}</p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <h4 className="mb-2 font-semibold flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-primary" />
                      Velkomstbonus
                    </h4>
                    <p className="text-sm text-muted-foreground">{guide.bonus}</p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <h4 className="mb-2 font-semibold flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Skat på gevinster
                    </h4>
                    <p className="text-sm text-muted-foreground">{guide.tax}</p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
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
            <Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>{" "}
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
            {[
              {
                title: "Hurtige løsninger",
                desc: "MobilePay, Trustly, Zimpler og e-wallets sikrer øjeblikkelige transaktioner.",
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

        <RelatedGuides currentPath="/betalingsmetoder" />
      </div>
    </>
  );
};

export default Betalingsmetoder;
