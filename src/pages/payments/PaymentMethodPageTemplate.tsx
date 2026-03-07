import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { AuthorBio } from "@/components/AuthorBio";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  CreditCard,
  Award,
  CheckCircle2,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  Wallet,
  Banknote,
} from "lucide-react";
import { ReactNode } from "react";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";

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

interface AdditionalSection {
  title: string;
  content: ReactNode;
  position: "after-intro" | "after-whatis" | "after-security" | "after-howto";
}

interface HowToStep {
  name: string;
  text: string;
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
  securityTitle?: string;
  securityContent: ReactNode;
  howToTitle?: string;
  howToContent: ReactNode;
  prosConsTitle?: string;
  pros: string[];
  cons: string[];
  practicalInfoTitle?: string;
  minDeposit: string;
  bonusInfo: string;
  taxInfo: string;
  comparisonTitle?: string;
  comparison?: ComparisonItem[];
  faqs: FAQ[];
  currentPath: string;
  responsibleGamingText?: string;
  additionalSections?: AdditionalSection[];
  /** Structured HowTo steps for JSON-LD schema (min 3 steps). */
  howToSteps?: HowToStep[];
  /** Human-readable name for the HowTo, e.g. "Sådan indbetaler du med Trustly" */
  howToName?: string;
  /** Estimated total time in ISO 8601 duration, e.g. "PT5M" */
  howToTotalTime?: string;
  /** Casino slug for sticky CTA bar */
  ctaCasinoSlug?: string;
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

function renderAdditionalSections(sections: AdditionalSection[] | undefined, position: AdditionalSection["position"]) {
  if (!sections) return null;
  const filtered = sections.filter((s) => s.position === position);
  if (filtered.length === 0) return null;
  return (
    <>
      {filtered.map((section, i) => (
        <div key={`${position}-${i}`}>
          <Separator className="my-10" />
          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold">{section.title}</h2>
            {section.content}
          </section>
        </div>
      ))}
    </>
  );
}

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
  securityTitle,
  securityContent,
  howToTitle,
  howToContent,
  prosConsTitle,
  pros,
  cons,
  practicalInfoTitle,
  minDeposit,
  bonusInfo,
  taxInfo,
  comparisonTitle,
  comparison,
  faqs,
  currentPath,
  responsibleGamingText,
  additionalSections,
  howToSteps,
  howToName,
  howToTotalTime,
}: PaymentMethodPageProps) {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);

  const articleSchema = buildArticleSchema({
    headline: seoTitle,
    description: seoDescription,
    url: `${SITE_URL}${currentPath}`,
    datePublished: "2026-02-15",
    dateModified: "2026-02-21",
    authorName: "Kevin",
    authorUrl: `${SITE_URL}/forfatter/kevin`,
  });

  const howToJsonLd = howToSteps && howToSteps.length >= 3 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${SITE_URL}${currentPath}#howto`,
    name: howToName || `Sådan bruger du ${name} på casino`,
    description: seoDescription,
    ...(howToTotalTime ? { totalTime: howToTotalTime } : {}),
    step: howToSteps.map((s, i) => ({
      "@type": "HowToStep" as const,
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  } : null;

  const jsonLdSchemas = [faqJsonLd, articleSchema, ...(howToJsonLd ? [howToJsonLd] : [])];

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} jsonLd={jsonLdSchemas} />

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
        <AuthorMetaBar author="kevin" date="17-02-2026" readTime="22 Min." />

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
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Se vores komplette{" "}
            <Link to="/betalingsmetoder" className="text-primary underline hover:text-primary/80">sammenligning af betalingsmetoder</Link>{" "}
            for at finde den metode, der passer bedst til dine behov, eller læs vores{" "}
            <Link to="/casino-anmeldelser" className="text-primary underline hover:text-primary/80">casino anmeldelser</Link>{" "}
            for at se, hvilke metoder hvert casino understøtter.
          </p>
        </section>

        <InlineCasinoCards title={`Casinoer der accepterer ${name}`} count={4} />

        {renderAdditionalSections(additionalSections, "after-intro")}

        <Separator className="my-10" />

        {/* What is it */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">{whatIsTitle}</h2>
          {whatIsContent}
        </section>

        {renderAdditionalSections(additionalSections, "after-whatis")}

        <Separator className="my-10" />

        {/* Security */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            {securityTitle || "Sikkerhed og Pålidelighed"}
          </h2>
          {securityContent}
        </section>

        {renderAdditionalSections(additionalSections, "after-security")}

        <Separator className="my-10" />

        {/* How to */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ArrowRight className="h-7 w-7 text-primary" />
            {howToTitle || `Sådan Bruger du ${name} på Casinoer`}
          </h2>
          {howToContent}
        </section>

        {renderAdditionalSections(additionalSections, "after-howto")}

        <Separator className="my-10" />

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">{prosConsTitle || "Fordele og Ulemper"}</h2>
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
          <h2 className="mb-4 text-3xl font-bold">{practicalInfoTitle || "Praktisk Information"}</h2>
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
              <h2 className="mb-4 text-3xl font-bold">{comparisonTitle || `${name} vs. Andre Betalingsmetoder`}</h2>
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

        <Separator className="my-10" />

        {/* Related payment methods */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Relaterede Betalingsmetoder</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Se vores komplette{" "}
            <Link to="/betalingsmetoder" className="text-primary underline hover:text-primary/80">oversigt over betalingsmetoder</Link>{" "}
            på danske casinoer.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {paymentLinks
              .filter((pm) => pm.to !== currentPath)
              .slice(0, 3)
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
                Læs mere om{" "}
                <Link to="/ansvarligt-spil" className="text-primary hover:underline font-medium">ansvarligt spil</Link>.{" "}
                I Danmark kan du altid søge hjælp via{" "}
                <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>{" "}
                og{" "}
                <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>. 18+ | Spil ansvarligt.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        <LatestNewsByCategory pagePath={currentPath} />

        <RelatedGuides currentPath={currentPath} />

        <FAQSection title={`Ofte stillede spørgsmål om ${name}`} faqs={faqs} />

        <AuthorBio author="kevin" showCommunity={false} />
      </div>
    </>
  );
}
