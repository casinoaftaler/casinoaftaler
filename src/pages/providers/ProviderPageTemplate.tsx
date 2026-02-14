import { Link } from "react-router-dom";
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
  Gamepad2,
  Award,
  CheckCircle2,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Star,
  User,
  CalendarDays,
  BookOpen,
} from "lucide-react";
import { ReactNode } from "react";

interface GameInfo {
  name: string;
  desc: string;
  highlight: string;
}

interface TimelineItem {
  year: string;
  event: string;
}

interface FAQ {
  question: string;
  answer: string | ReactNode;
}

interface ProviderPageProps {
  seoTitle: string;
  seoDescription: string;
  name: string;
  heroSubtitle: string;
  introTitle: string;
  introContent: ReactNode;
  historyTitle: string;
  historyIntro: string;
  timeline: TimelineItem[];
  games: GameInfo[];
  gamesIntro: ReactNode;
  licensesContent: ReactNode;
  pros: string[];
  cons: string[];
  faqs: FAQ[];
  currentPath: string;
  responsibleGamingText?: string;
}

const providerLinks = [
  { to: "/spiludviklere/netent", label: "NetEnt" },
  { to: "/spiludviklere/pragmatic-play", label: "Pragmatic Play" },
  { to: "/spiludviklere/relax-gaming", label: "Relax Gaming" },
  { to: "/spiludviklere/play-n-go", label: "Play'n GO" },
  { to: "/spiludviklere/hacksaw-gaming", label: "Hacksaw Gaming" },
  { to: "/spiludviklere/nolimit-city", label: "Nolimit City" },
  { to: "/spiludviklere/yggdrasil", label: "Yggdrasil" },
  { to: "/spiludviklere/microgaming", label: "Microgaming" },
  { to: "/spiludviklere/red-tiger", label: "Red Tiger" },
  { to: "/spiludviklere/big-time-gaming", label: "Big Time Gaming" },
];

export function ProviderPage({
  seoTitle,
  seoDescription,
  name,
  heroSubtitle,
  introTitle,
  introContent,
  historyTitle,
  historyIntro,
  timeline,
  games,
  gamesIntro,
  licensesContent,
  pros,
  cons,
  faqs,
  currentPath,
  responsibleGamingText,
}: ProviderPageProps) {
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
              <Gamepad2 className="mr-1.5 h-3.5 w-3.5" />
              Spiludvikler
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
            <span>Læsetid: <span className="font-medium text-foreground">12 Min.</span></span>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">{introTitle}</h2>
          {introContent}
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">{historyTitle}</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">{historyIntro}</p>
          <div className="space-y-3 mb-6">
            {timeline.map((item) => (
              <div key={item.year + item.event} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <Badge variant="outline" className="mt-0.5 flex-shrink-0">{item.year}</Badge>
                <p className="text-sm text-muted-foreground">{item.event}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Populære Spil fra {name}</h2>
          {gamesIntro}
          <div className="grid gap-4 md:grid-cols-2">
            {games.map((game) => (
              <Card key={game.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="h-5 w-5 text-primary" />
                    {game.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{game.desc}</p>
                  <Badge variant="outline" className="text-xs">{game.highlight}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <InlineCasinoCards title={`Casinoer med ${name}-spil`} />

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Licenser og Sikkerhed</h2>
          {licensesContent}
          <div className="grid gap-4 md:grid-cols-3 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Malta Gaming Authority
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                En af verdens mest respekterede spillemyndigheder med strenge krav til fairness og spillerbeskyttelse.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  UK Gambling Commission
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Den britiske spillemyndighed, kendt for sine strenge regler og høje krav til licenserede spiludviklere.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Award className="h-4 w-4 text-primary" />
                  RNG Certificeret
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Uafhængig testning af RNG-teknologi sikrer, at alle spilresultater er 100% tilfældige og retfærdige.
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

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

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Andre Spiludviklere</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Udforsk vores dybdegående guides til andre populære spiludviklere i casinobranchen.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {providerLinks
              .filter((dev) => dev.to !== currentPath)
              .map((dev) => (
                <Link
                  key={dev.to}
                  to={dev.to}
                  className="flex items-center justify-center rounded-lg border border-border bg-card p-3 text-center text-sm font-medium transition-colors hover:border-primary/50 hover:bg-accent/50"
                >
                  {dev.label}
                </Link>
              ))}
          </div>
        </section>

        <Separator className="my-10" />

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
                {responsibleGamingText || `${name} prioriterer ansvarligt spil og samarbejder med anerkendte organisationer for spillerbeskyttelse.`}{" "}
                I Danmark kan du altid søge hjælp via{" "}
                <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>{" "}
                og{" "}
                <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>. 18+ | Spil ansvarligt.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Ofte Stillede Spørgsmål om {name}</h2>
            </div>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-border bg-card px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <RelatedGuides currentPath={currentPath} />
      </div>
    </>
  );
}
