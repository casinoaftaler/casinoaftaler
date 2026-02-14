import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
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
import {
  ShieldCheck,
  CreditCard,
  Award,
  CheckCircle2,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Star,
  User,
  CalendarDays,
  BookOpen,
  Banknote,
  ArrowRight,
  Wallet,
} from "lucide-react";
import { ReactNode } from "react";

interface FAQ {
  question: string;
  answer: string | ReactNode;
}

interface ComparisonItem {
  method: string;
  speed: string;
  fees: string;
  withdrawalSupport: string;
}

interface PaymentMethodPageProps {
  seoTitle: string;
  seoDescription: string;
  name: string;
  heroSubtitle: string;
  heroImage?: string;
  heroImageAlt?: string;
  introTitle: string;
  introContent: ReactNode;
  whatIsTitle: string;
  whatIsContent: ReactNode;
  securityContent: ReactNode;
  howToContent: ReactNode;
  pros: string[];
  cons: string[];
  minDeposit: string;
  bonusInfo: string;
  taxInfo: string;
  comparison?: ComparisonItem[];
  faqs: FAQ[];
  currentPath: string;
  responsibleGamingText?: string;
}

const paymentLinks = [
  { to: "/betalingsmetoder/apple-pay", label: "Apple Pay" },
  { to: "/betalingsmetoder/mobilepay", label: "MobilePay" },
  { to: "/betalingsmetoder/paypal", label: "PayPal" },
  { to: "/betalingsmetoder/skrill", label: "Skrill" },
  { to: "/betalingsmetoder/trustly", label: "Trustly" },
  { to: "/betalingsmetoder/zimpler", label: "Zimpler" },
  { to: "/betalingsmetoder/paysafecard", label: "Paysafecard" },
  { to: "/betalingsmetoder/bankoverforsler", label: "Bankoverførsel" },
  { to: "/betalingsmetoder/visa-mastercard", label: "Visa / Mastercard" },
  { to: "/betalingsmetoder/revolut", label: "Revolut" },
];

export function PaymentMethodPage({
  seoTitle,
  seoDescription,
  name,
  heroSubtitle,
  heroImage,
  heroImageAlt,
  introTitle,
  introContent,
  whatIsTitle,
  whatIsContent,
  securityContent,
  howToContent,
  pros,
  cons,
  minDeposit,
  bonusInfo,
  taxInfo,
  comparison,
  faqs,
  currentPath,
  responsibleGamingText,
}: PaymentMethodPageProps) {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof faq.answer === "string" ? faq.answer : faq.question,
      },
    })),
  };

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} jsonLd={faqJsonLd} />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <CreditCard className="mr-1.5 h-3.5 w-3.5" />
              Betalingsmetode
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">{name}</h1>
            <p className="text-lg text-white/80">{heroSubtitle}</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>Skrevet af: <span className="font-medium text-foreground">Casinoaftaler</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>Opdateret: <span className="font-medium text-foreground">14-02-2026</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>Læsetid: <span className="font-medium text-foreground">14 Min.</span></span>
          </div>
        </div>

        {heroImage && (
          <div className="mb-10 overflow-hidden rounded-xl">
            <img
              src={heroImage}
              alt={heroImageAlt || `${name} - betalingsmetode`}
              className="w-full h-auto object-cover max-h-[400px]"
              loading="eager"
            />
          </div>
        )}

        {/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">{introTitle}</h2>
          {introContent}
        </section>

        <Separator className="my-10" />

        {/* What is it */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">{whatIsTitle}</h2>
          {whatIsContent}
        </section>

        <Separator className="my-10" />

        {/* Security */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Sikkerhed og Pålidelighed
          </h2>
          {securityContent}
        </section>

        <Separator className="my-10" />

        {/* How to */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ArrowRight className="h-7 w-7 text-primary" />
            Sådan Bruger du {name} på Casinoer
          </h2>
          {howToContent}
        </section>

        <Separator className="my-10" />

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Fordele og Ulemper</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-primary">
                  <ThumbsUp className="h-5 w-5" />
                  Fordele
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                  <ThumbsDown className="h-5 w-5" />
                  Ulemper
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Min deposit, bonus, tax */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Praktisk Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Banknote className="h-4 w-4 text-primary" />
                  Minimumsindskud
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{minDeposit}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Wallet className="h-4 w-4 text-primary" />
                  Velkomstbonus
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{bonusInfo}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Skat på Gevinster
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{taxInfo}</CardContent>
            </Card>
          </div>
        </section>

        {/* Comparison table */}
        {comparison && comparison.length > 0 && (
          <>
            <Separator className="my-10" />
            <section className="mb-12">
              <h2 className="mb-4 text-3xl font-bold">{name} vs. Andre Betalingsmetoder</h2>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left font-semibold">Metode</th>
                      <th className="px-4 py-3 text-left font-semibold">Hastighed</th>
                      <th className="px-4 py-3 text-left font-semibold">Gebyrer</th>
                      <th className="px-4 py-3 text-left font-semibold">Udbetaling</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((item, i) => (
                      <tr key={item.method} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                        <td className="px-4 py-3 font-medium">{item.method}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.speed}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.fees}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.withdrawalSupport}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        <InlineCasinoCards title={`Casinoer der accepterer ${name}`} />

        <Separator className="my-10" />

        {/* Other payment methods */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Andre Betalingsmetoder</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Udforsk vores dybdegående guides til andre populære betalingsmetoder på danske casinoer.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {paymentLinks
              .filter((pm) => pm.to !== currentPath)
              .map((pm) => (
                <Link
                  key={pm.to}
                  to={pm.to}
                  className="flex items-center justify-center rounded-lg border border-border bg-card p-3 text-center text-sm font-medium transition-colors hover:border-primary/50 hover:bg-accent/50"
                >
                  {pm.label}
                </Link>
              ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Responsible gaming */}
        <section className="mb-12">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Award className="h-5 w-5 text-primary" />
                Ansvarligt Spil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                {responsibleGamingText || `Når du bruger ${name} til casinotransaktioner, er det vigtigt at spille ansvarligt og sætte personlige grænser for indbetalinger.`}{" "}
                I Danmark kan du altid søge hjælp via{" "}
                <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>{" "}
                og{" "}
                <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>. 18+ | Spil ansvarligt.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath={currentPath} />

        <FAQSection title={`Ofte stillede spørgsmål om ${name}`} faqs={faqs} />
      </div>
    </>
  );
}
