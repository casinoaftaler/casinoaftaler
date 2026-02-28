import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { buildArticleSchema, buildFaqSchema, buildReviewSchema } from "@/lib/seo";
import { QuickFactsProviders, QuickFactsLicense } from "@/components/QuickFactsProviders";
import { CasinoReviewHero } from "@/components/CasinoReviewHero";
import type { ReactNode } from "react";
import { Star, Zap, Check, X, ShieldCheck, Trophy, CreditCard, AlertTriangle, TrendingUp, Gamepad2, Smartphone, Headphones, Globe, BarChart3 } from "lucide-react";

const casinoName = "MarathonBet";
const casinoSlug = "marathonbet-anmeldelse";
const casinoUrl = "https://www.marathonbet.dk/";
const highlightColor = "zinc";

const breadcrumbs = [
  { label: "Casino", href: "/" },
  { label: "Casino anmeldelser", href: "/casino-anmeldelser" },
  { label: casinoName, href: `/${casinoSlug}` },
];

const pros = [
  "Stort udvalg af spil og sportsbegivenheder",
  "Høje odds på sportsvæddemål",
  "Hurtige udbetalinger",
  "Mobilvenlig platform",
];

const cons = [
  "Begrænset antal bonusser og kampagner",
  "Ingen dansk kundesupport døgnet rundt",
  "Brugerfladen kan virke uoverskuelig for nye spillere",
];

const rating = "4.2";
const ratingCount = "42";
const reviewBody = (
  <>
    MarathonBet er en veletableret online spiludbyder, der tilbyder et bredt udvalg af spil og sportsbegivenheder.
    Platformen er kendt for sine høje odds på sportsvæddemål og hurtige udbetalinger.
    <br />
    <br />
    Casinoet har en mobilvenlig platform, der gør det nemt at spille på farten.
    Dog er der et begrænset antal bonusser og kampagner, og kundesupporten er ikke tilgængelig døgnet rundt på dansk.
    Brugerfladen kan også virke uoverskuelig for nye spillere.
  </>
);

const casinoSettings = {
  providers: ["NetEnt", "Microgaming", "Play'n GO", "Evolution Gaming"],
  license: "Spillemyndigheden",
};

const faqs = [
  {
    question: "Hvilke spil tilbyder MarathonBet?",
    answer:
      "MarathonBet tilbyder et bredt udvalg af spil, herunder spillemaskiner, bordspil, live casino og sportsvæddemål.",
  },
  {
    question: "Er MarathonBet licenseret i Danmark?",
    answer: "Ja, MarathonBet er licenseret af Spillemyndigheden i Danmark.",
  },
  {
    question: "Hvilke betalingsmetoder accepterer MarathonBet?",
    answer:
      "MarathonBet accepterer en række betalingsmetoder, herunder kreditkort, e-wallets og bankoverførsler.",
  },
  {
    question: "Hvordan er kundeservicen hos MarathonBet?",
    answer:
      "MarathonBet tilbyder kundeservice via e-mail og live chat. Dog er kundesupporten ikke tilgængelig døgnet rundt på dansk.",
  },
  {
    question: "Tilbyder MarathonBet en velkomstbonus?",
    answer:
      "MarathonBet tilbyder en velkomstbonus til nye spillere. Bonusbetingelserne kan variere, så det er vigtigt at læse dem grundigt.",
  },
];

export default function CasinoReviewPage() {
  const siteSettings = useSiteSettings();

  const articleSchema = buildArticleSchema({
    headline: `${casinoName} Anmeldelse: Fordele og ulemper ved ${casinoName}`,
    description: `Læs vores anmeldelse af ${casinoName} og få et overblik over deres spiludvalg, bonusser og kundeservice.`,
    url: `https://casinoaftaler.dk/${casinoSlug}`,
    datePublished: "2023-09-01",
    dateModified: "2023-11-15",
    authorName: "Jonas Theill",
    authorUrl: "https://casinoaftaler.dk/forfatter/jonas",
    image: `https://casinoaftaler.dk/images/${casinoSlug}.jpg`,
  });

  const reviewSchema = buildReviewSchema({
    itemName: casinoName,
    itemUrl: casinoUrl,
    ratingValue: rating,
    ratingCount: ratingCount,
    reviewBody: reviewBody.toString(),
  });

  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <SEO
        title={`${casinoName} Anmeldelse | Læs vores vurdering af ${casinoName} her`}
        description={`Få et indblik i ${casinoName} med vores dybdegående anmeldelse. Vi dækker spiludvalg, bonusser, brugeroplevelse og meget mere.`}
        jsonLd={[articleSchema, reviewSchema, faqSchema]}
        breadcrumbLabel={casinoName}
      />

      <CasinoReviewHero
        casinoName={casinoName}
        casinoUrl={casinoUrl}
        rating={rating}
        ratingCount={ratingCount}
        highlightColor={highlightColor}
        pros={pros}
        cons={cons}
        breadcrumbs={breadcrumbs}
      />

      <div className="container relative max-w-5xl py-8">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">
              {casinoName} Casino Anmeldelse: En Dybdegående Vurdering
            </CardTitle>
          </CardHeader>
          <CardContent className="leading-7">
            <p>
              Velkommen til vores omfattende anmeldelse af {casinoName} Casino. I denne anmeldelse vil vi dykke ned i
              alle aspekter af casinoet, fra spiludvalg og bonusser til brugeroplevelse og kundeservice.
              {casinoName} er en veletableret online spiludbyder, der tilbyder et bredt udvalg af spil og
              sportsbegivenheder. Platformen er kendt for sine høje odds på sportsvæddemål og hurtige udbetalinger.
            </p>
            <Separator className="my-4" />
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Spiludvalg hos {casinoName}
            </h2>
            <p>
              {casinoName} tilbyder et bredt udvalg af spil, herunder spillemaskiner, bordspil, live casino og
              sportsvæddemål. Casinoet samarbejder med flere førende spiludviklere, hvilket sikrer et varieret og
              underholdende spiludvalg.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 py-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Populære Spillemaskiner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5">
                    <li>Book of Dead</li>
                    <li>Starburst</li>
                    <li>Gonzo's Quest</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Gamepad2 className="mr-2 h-4 w-4" />
                    Bordspil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5">
                    <li>Blackjack</li>
                    <li>Roulette</li>
                    <li>Baccarat</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Smartphone className="mr-2 h-4 w-4" />
                    Live Casino
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5">
                    <li>Live Blackjack</li>
                    <li>Live Roulette</li>
                    <li>Live Baccarat</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <Separator className="my-4" />
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Bonusser og Kampagner
            </h2>
            <p>
              {casinoName} tilbyder en velkomstbonus til nye spillere. Bonusbetingelserne kan variere, så det er
              vigtigt at læse dem grundigt. Derudover tilbyder casinoet løbende kampagner og tilbud til eksisterende
              spillere.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 py-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Trophy className="mr-2 h-4 w-4" />
                    Velkomstbonus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>100% bonus op til 1.000 kr.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Løbende Kampagner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Regelmæssige tilbud og kampagner.</p>
                </CardContent>
              </Card>
            </div>
            <Separator className="my-4" />
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Brugeroplevelse
            </h2>
            <p>
              {casinoName} har en mobilvenlig platform, der gør det nemt at spille på farten. Dog kan brugerfladen
              virke uoverskuelig for nye spillere.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 py-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Smartphone className="mr-2 h-4 w-4" />
                    Mobilvenlighed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Mobilvenlig platform.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Headphones className="mr-2 h-4 w-4" />
                    Kundeservice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Kundeservice via e-mail og live chat.</p>
                </CardContent>
              </Card>
            </div>
            <Separator className="my-4" />
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Konklusion
            </h2>
            <p>
              {casinoName} er en veletableret online spiludbyder med et bredt udvalg af spil og sportsbegivenheder.
              Platformen er kendt for sine høje odds på sportsvæddemål og hurtige udbetalinger. Dog er der et
              begrænset antal bonusser og kampagner, og kundesupporten er ikke tilgængelig døgnet rundt på dansk.
              Brugerfladen kan også virke uoverskuelig for nye spillere.
            </p>
            <div className="flex justify-center py-4">
              <Button size="lg" asChild>
                <Link to={casinoUrl} target="_blank">
                  Besøg {casinoName}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <aside className="mt-8">
          <QuickFactsProviders providers={casinoSettings.providers} />
          <QuickFactsLicense license={casinoSettings.license} />
          <AuthorMetaBar author="Jonas Theill" />
          <AuthorBio />
          <FAQSection faqs={faqs} />
          <RelatedGuides currentCasino={casinoName} />
          {siteSettings?.inlineCasinoCards && <InlineCasinoCards currentCasino={casinoName} />}
        </aside>
      </div>
    </>
  );
}
