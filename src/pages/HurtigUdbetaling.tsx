import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  CreditCard,
  TrendingUp,
  Wallet,
  Banknote,
  Timer,
  ArrowRight,
  BarChart3,
  Lock,
  Users,
  Star,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";
import { ReviewMoneyLinks } from "@/components/ReviewMoneyLinks";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import type { ReactNode } from "react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvor hurtigt kan man få udbetaling fra et dansk casino?",
    answer: (
      <>
        De hurtigste danske casinoer udbetaler inden for 5-15 minutter via <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>. E-wallets som <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link> tager typisk 1-4 timer, mens bankoverførsler kan tage 1-3 hverdage. Den faktiske tid afhænger af casinoets interne behandlingsproces, din <Link to="/ordbog/kyc" className={linkClass}>KYC-verifikation</Link> og den valgte betalingsmetode.
      </>
    ),
  },
  {
    question: "Hvilken betalingsmetode giver den hurtigste udbetaling?",
    answer: (
      <>
        <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> er den klart hurtigste metode på det danske marked med udbetalingstider på 5-15 minutter hos de bedste casinoer. <Link to="/betalingsmetoder/skrill" className={linkClass}>E-wallets</Link> er næsthurtigst (1-4 timer), mens <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>kort</Link> og <Link to="/betalingsmetoder/bankoverforsler" className={linkClass}>bankoverførsler</Link> typisk tager 1-3 hverdage.
      </>
    ),
  },
  {
    question: "Hvorfor tager min første udbetaling længere tid?",
    answer: "Din første udbetaling kræver KYC-verifikation (Know Your Customer). Det er et lovkrav fra Spillemyndigheden at casinoer verificerer din identitet, adresse og betalingsmetode. Processen tager typisk 1-24 timer afhængigt af casinoet. Efter første verifikation er efterfølgende udbetalinger markant hurtigere. Tip: Upload dine dokumenter proaktivt lige efter registrering for at undgå forsinkelser.",
  },
  {
    question: "Kan casinoet forsinke min udbetaling med vilje?",
    answer: (
      <>
        Danske casinoer med <Link to="/casino-med-dansk-licens" className={linkClass}>dansk licens</Link> er forpligtede til at behandle udbetalinger inden for rimelig tid. <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> overvåger dette. Dog kan legitime forsinkelser opstå ved: KYC-verifikation, store beløb over casinoets interne godkendelsesgrænse, mistanke om bonusmisbrug, eller weekend/helligdage hvor bankoverførsler ikke behandles.
      </>
    ),
  },
  {
    question: "Hvad er pending time, og kan jeg annullere en udbetaling?",
    answer: (
      <>
        <Link to="/ordbog/pending-time" className={linkClass}>Pending time</Link> er venteperioden fra du anmoder om udbetaling til casinoet begynder at behandle den. Nogle casinoer tilbyder <Link to="/ordbog/reverse-withdrawal" className={linkClass}>reverse withdrawal</Link> i denne periode, hvor du kan annullere og spille videre. De bedste casinoer har 0 timers pending time – udbetalingen behandles øjeblikkeligt.
      </>
    ),
  },
  {
    question: "Er der forskel på udbetalingshastighed i nye vs. etablerede casinoer?",
    answer: (
      <>
        Generelt ja. <Link to="/nye-casinoer" className={linkClass}>Nye casinoer</Link> bruger ofte moderne betalingsinfrastruktur (Trustly Pay N Play) og har hurtigere udbetalinger som konkurrenceparameter. Etablerede casinoer kan have mere bureaukrati, men tilbyder til gengæld højere stabilitet og bedre VIP-programmer. Se vores test af <Link to="/nye-casinoer/hurtig-udbetaling" className={linkClass}>nye casinoer med hurtig udbetaling</Link>.
      </>
    ),
  },
];

const betalingsMetoder = [
  {
    icon: Zap,
    title: "Trustly (5-15 min.)",
    description: "Direkte bank-til-bank-overførsel via MitID. Den hurtigste metode på det danske marked – de bedste casinoer behandler Trustly-udbetalinger inden for 5 minutter. Ingen gebyrer.",
    tag: "Hurtigst",
  },
  {
    icon: Wallet,
    title: "E-wallets (1-4 timer)",
    description: "Skrill, PayPal og Zimpler tilbyder hurtige udbetalinger uden at dele bankoplysninger. Pengene lander i din e-wallet, hvorfra du kan overføre til din bank.",
    tag: "Populær",
  },
  {
    icon: CreditCard,
    title: "Visa/Mastercard (1-3 dage)",
    description: "Tilbagebetaling direkte til dit betalingskort. Processen er enkel, men langsommere end Trustly. Bemærk at nogle banker blokerer casino-transaktioner.",
    tag: "Velkendt",
  },
  {
    icon: Banknote,
    title: "Bankoverførsel (1-5 dage)",
    description: "Traditionel bankoverførsel. Langsomst, men ingen beløbsgrænse og understøttes altid. Bruges primært til store udbetalinger over 50.000 kr.",
    tag: "Store beløb",
  },
];

const HurtigUdbetaling = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Hurtig Udbetaling Casino – Casinoer med Hurtigste Udbetalinger 2026",
    description: "Find casinoer med hurtige udbetalinger i Danmark. Sammenlign udbetalingstider, betalingsmetoder og find casinoer der udbetaler inden for minutter.",
    url: `${SITE_URL}/hurtig-udbetaling`,
    datePublished: "2026-03-31",
  });

  return (
    <>
      <SEO
        title="Hurtig Udbetaling Casino – Få Dine Penge på Minutter 2026 | Casinoaftaler"
        description="Casinoer med hurtig udbetaling i Danmark: Trustly på 5 min, e-wallets 1-4 timer. Testede udbetalingstider og bedste betalingsmetoder til hurtige hævninger."
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

      {/* Hero */}
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
              <Zap className="mr-1.5 h-3.5 w-3.5" />
              Udbetalingsguide & hastighed
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Hurtig Udbetaling Casino
            </h1>
            <p className="text-lg text-white/80">
              Find danske casinoer med de hurtigste udbetalinger – fra 5 minutters Trustly-overførsler til øjeblikkelige e-wallet-hævninger. Vi har testet og dokumenteret reelle udbetalingstider.
            </p>
          </div>
        </div>
      </section>

      <ContentPageLayout>
        <AuthorMetaBar author="kevin" readTime="15 Min." />

        <SnippetAnswer answer="De hurtigste danske casinoer udbetaler via Trustly inden for 5-15 minutter. E-wallets tager 1-4 timer, mens kort og bankoverførsler tager 1-3 hverdage. KYC-verifikation ved første udbetaling kan dog tilføje 1-24 timer." />

        <QuickComparisonTable count={3} title="Casinoer med hurtigste udbetalinger" prioritySlugs={["spilleautomaten", "leovegas", "getlucky"]} />

        {/* Intro */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Hvad bestemmer udbetalingshastigheden?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Udbetalingshastigheden på et dansk casino afhænger af tre faktorer: casinoets interne behandlingstid, din <Link to="/ordbog/kyc" className={linkClass}>KYC-verifikation</Link> og den valgte <Link to="/betalingsmetoder" className={linkClass}>betalingsmetode</Link>. Den interne behandling varierer fra 0 minutter (instant) hos de bedste casinoer til 48 timer hos langsommere operatører.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> kræver at alle <Link to="/casino-med-dansk-licens" className={linkClass}>licenserede danske casinoer</Link> behandler udbetalingsanmodninger inden for rimelig tid. Dog er der ingen specifik lovbestemt tidsfrist, hvilket skaber markante forskelle mellem operatørerne. Vores test viser at de bedste casinoer udbetaler 10-20x hurtigere end gennemsnittet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Har du brug for dine penge hurtigt, er <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> den mest oplagte løsning på det danske marked. Med direkte bankoverførsel via <Link to="/nye-casinoer/mitid" className={linkClass}>MitID</Link> lander pengene typisk i din bank inden for 5-15 minutter.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Betalingsmetoder */}
        <section className="mb-10">
          <h2 className="mb-6 text-3xl font-bold">Udbetalingstider per betalingsmetode</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {betalingsMetoder.map((method) => (
              <Card key={method.title} className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <method.icon className="h-6 w-6 text-primary" />
                    <Badge variant="outline" className="text-xs">{method.tag}</Badge>
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Tip til hurtig udbetaling */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">5 tips til hurtigere udbetalinger</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Uanset hvilket casino du spiller hos, kan du optimere din udbetalingshastighed markant ved at følge disse tips:
          </p>
          <div className="space-y-3">
            {[
              { icon: Lock, title: "1. Verificer din konto proaktivt", desc: "Upload ID-dokumenter og adressebevis lige efter registrering – ikke først når du vil hæve. Det eliminerer den største forsinkelseskilde." },
              { icon: Zap, title: "2. Brug Trustly som betalingsmetode", desc: "Trustly er den hurtigste udbetalingsmetode på det danske marked. Vælg Trustly fra starten – de fleste casinoer kræver at du udbetaler via samme metode som du indbetalte." },
              { icon: CheckCircle2, title: "3. Opfyld omsætningskrav INDEN udbetaling", desc: "Anmod aldrig om udbetaling med aktive bonuskrav. Det forsinker behandlingen og kan resultere i annullering af bonus og gevinster." },
              { icon: Timer, title: "4. Undgå weekendudbetalinger", desc: "Bankoverførsler behandles kun på hverdage. Udbetal fredag formiddag eller vendt til mandag for hurtigst mulig bankoverførsel." },
              { icon: BarChart3, title: "5. Hold dig under intern grænse", desc: "Store beløb kræver ofte manuel godkendelse. Udbetalinger under 10.000 kr. behandles typisk automatisk og hurtigere." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border p-4">
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Pending time forklaring */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Hvad er pending time – og hvorfor er det vigtigt?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/ordbog/pending-time" className={linkClass}>Pending time</Link> er perioden fra du anmoder om en udbetaling, til casinoet begynder at behandle den. I denne periode er pengene stadig tilgængelige på din konto – og mange casinoer tilbyder <Link to="/ordbog/reverse-withdrawal" className={linkClass}>reverse withdrawal</Link>, hvor du kan annullere udbetalingen og spille videre.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-5">
            <p className="mb-2 font-semibold">Hvorfor 0 timers pending time er bedst</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Casinoer med 0 timers pending time behandler din udbetaling øjeblikkeligt. Det er bedst for spilleren, fordi det eliminerer fristelsen til at annullere og spille videre. Fra et <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>-perspektiv er øjeblikkelig udbetaling den vigtigste beskyttelse mod impulsiv adfærd.
            </p>
          </div>
        </section>

        <InlineCasinoCards title="Casinoer med hurtigste udbetalingstider" />

        <LatestNewsByCategory pagePath="/hurtig-udbetaling" />
        <ReviewMoneyLinks />
        <RelatedGuides currentPath="/hurtig-udbetaling" />
        <FAQSection title="Ofte stillede spørgsmål om hurtig udbetaling" faqs={faqs} />
        <AuthorBio author="kevin" />
      </ContentPageLayout>
      <StickyCtaBySlug slug="spilleautomaten" />
    </>
  );
};

export default HurtigUdbetaling;
