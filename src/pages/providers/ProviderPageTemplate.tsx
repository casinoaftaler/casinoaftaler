import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { AuthorBio } from "@/components/AuthorBio";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";
import { ProviderSlotLinks } from "@/components/ProviderSlotLinks";
import { DeveloperSiblingLinks } from "@/components/DeveloperSiblingLinks";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { DeveloperMoneyLinks } from "@/components/DeveloperMoneyLinks";
import { ProviderCatalogSlots } from "@/components/ProviderCatalogSlots";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  BarChart3,
  Target,
} from "lucide-react";
import { ReactNode, Fragment } from "react";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";

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
  heroImage?: string;
  heroImageAlt?: string;
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
  strategicAnalysis?: ReactNode;
  technicalProfile?: ReactNode;
  sectionOrder?: string[];
  updatedDate?: string;
  readTime?: string;
  strategicTitle?: string;
  technicalTitle?: string;
  gamesTitle?: string;
  licensesTitle?: string;
  prosConsTitle?: string;
  responsibleTitle?: string;
  /** Casino slug for sticky CTA bar */
  ctaCasinoSlug?: string;
}

const providerLinks = [
  { to: "/spiludviklere/netent", label: "NetEnt" },
  { to: "/spiludviklere/pragmatic-play", label: "Pragmatic Play" },
  { to: "/spiludviklere/evolution-gaming", label: "Evolution Gaming" },
  { to: "/spiludviklere/relax-gaming", label: "Relax Gaming" },
  { to: "/spiludviklere/play-n-go", label: "Play'n GO" },
  { to: "/spiludviklere/hacksaw-gaming", label: "Hacksaw Gaming" },
  { to: "/spiludviklere/nolimit-city", label: "Nolimit City" },
  { to: "/spiludviklere/elk-studios", label: "ELK Studios" },
  { to: "/spiludviklere/yggdrasil", label: "Yggdrasil" },
  { to: "/spiludviklere/microgaming", label: "Microgaming" },
  { to: "/spiludviklere/red-tiger", label: "Red Tiger" },
  { to: "/spiludviklere/big-time-gaming", label: "Big Time Gaming" },
  { to: "/spiludviklere/thunderkick", label: "Thunderkick" },
  { to: "/spiludviklere/blueprint-gaming", label: "Blueprint Gaming" },
  { to: "/spiludviklere/push-gaming", label: "Push Gaming" },
  { to: "/spiludviklere/quickspin", label: "Quickspin" },
  { to: "/spiludviklere/isoftbet", label: "iSoftBet" },
  { to: "/spiludviklere/betsoft", label: "Betsoft" },
  { to: "/spiludviklere/wazdan", label: "Wazdan" },
  { to: "/spiludviklere/endorphina", label: "Endorphina" },
  { to: "/spiludviklere/stakelogic", label: "Stakelogic" },
  { to: "/spiludviklere/booming-games", label: "Booming Games" },
];

const defaultSectionOrder = [
  "intro", "casinos", "history", "games", "licenses",
  "proscons", "strategic", "technical", "providers", "responsible",
];

export function ProviderPage({
  seoTitle, seoDescription, name, heroSubtitle, heroImage, heroImageAlt,
  introTitle, introContent, historyTitle, historyIntro, timeline,
  games, gamesIntro, licensesContent, pros, cons, faqs, currentPath,
  responsibleGamingText, strategicAnalysis, technicalProfile,
  sectionOrder, updatedDate = "15-02-2026", readTime = "14 Min.",
  strategicTitle, technicalTitle, gamesTitle, licensesTitle, prosConsTitle, responsibleTitle,
  ctaCasinoSlug,
}: ProviderPageProps) {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);

  const articleSchema = buildArticleSchema({
    headline: seoTitle,
    description: seoDescription,
    url: `${SITE_URL}${currentPath}`,
    datePublished: "2026-02-15",
    authorName: "Kevin",
    authorUrl: `${SITE_URL}/forfatter/kevin`,
    about: [
      { "@type": "Organization", name, url: `${SITE_URL}${currentPath}` },
    ],
    mentions: [
      { "@type": "Thing", name: "Spillemaskiner", url: `${SITE_URL}/casinospil/spillemaskiner` },
      { "@type": "Thing", name: "Casino Bonus", url: `${SITE_URL}/casino-bonus` },
      { "@type": "GovernmentOrganization", name: "Spillemyndigheden", url: `${SITE_URL}/spillemyndigheden` },
    ],
  });

  const sectionMap: Record<string, ReactNode> = {
    intro: (
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">{introTitle}</h2>
        {introContent}
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Læs vores komplette{" "}
          <Link to="/spiludviklere" className="text-primary underline hover:text-primary/80">oversigt over spiludviklere</Link>{" "}
          for at sammenligne {name} med andre førende studios i branchen, eller udforsk{" "}
          <Link to="/casinospil" className="text-primary underline hover:text-primary/80">vores guide til casinospil</Link>{" "}
          for at finde de bedste spil til din spillestil.
        </p>
      </section>
    ),
    history: (
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
    ),
    games: (
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">{gamesTitle || `Populære Spil fra ${name}`}</h2>
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
    ),
    casinos: <InlineCasinoCards title={`Casinoer med ${name}-spil`} />,
    licenses: (
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">{licensesTitle || "Licenser og Sikkerhed"}</h2>
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
    ),
    proscons: (
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
    ),
    strategic: strategicAnalysis ? (
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
          <Target className="h-7 w-7 text-primary" />
          {strategicTitle || "Strategisk Analyse og Markedsposition"}
        </h2>
        {strategicAnalysis}
      </section>
    ) : null,
    technical: technicalProfile ? (
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
          <BarChart3 className="h-7 w-7 text-primary" />
          {technicalTitle || "Teknisk Profil"}
        </h2>
        {technicalProfile}
      </section>
    ) : null,
    providers: (
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Relaterede Spiludviklere</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Se vores komplette{" "}
          <Link to="/spiludviklere" className="text-primary underline hover:text-primary/80">oversigt over spiludviklere</Link>{" "}
          i casinobranchen.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {providerLinks
            .filter((dev) => dev.to !== currentPath)
            .slice(0, 3)
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
    ),
    responsible: (
      <section className="mb-12">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Award className="h-5 w-5 text-primary" />
              {responsibleTitle || "Ansvarligt Spil"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {responsibleGamingText || `${name} prioriterer ansvarligt spil og samarbejder med anerkendte organisationer for spillerbeskyttelse.`}{" "}
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
    ),
  };

  const order = sectionOrder || defaultSectionOrder;
  const orderedSections = order
    .map((key) => ({ key, node: sectionMap[key] }))
    .filter((s) => s.node != null);

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} jsonLd={[faqJsonLd, articleSchema]} />

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
              <Gamepad2 className="mr-1.5 h-3.5 w-3.5" />
              Spiludvikler
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">{name}</h1>
            <p className="text-lg text-white/80">{heroSubtitle}</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="kevin" readTime={readTime} />

        {heroImage && (
          <div className="mb-10 overflow-hidden rounded-xl">
            <img
              src={heroImage}
              alt={heroImageAlt || `${name} - spiludvikler`}
              className="w-full h-auto object-cover max-h-[400px]"
              loading="eager"
            />
          </div>
        )}

        {orderedSections.map((s, i) => (
          <Fragment key={s.key}>
            {i > 0 && <Separator className="my-10" />}
            {s.node}
          </Fragment>
        ))}

        <Separator className="my-10" />
        <DeveloperMoneyLinks
          providerName={name}
          providerSlug={currentPath.replace("/spiludviklere/", "")}
        />
        <Separator className="my-10" />
        <ProviderCatalogSlots providerSlug={currentPath.replace("/spiludviklere/", "")} />
        <ProviderSlotLinks providerSlug={currentPath.replace("/spiludviklere/", "")} />
        <DeveloperSiblingLinks currentPath={currentPath} />
        <RelatedGuides currentPath={currentPath} />
        <FAQSection title={`Ofte stillede spørgsmål om ${name}`} faqs={faqs} />

        <AuthorBio author="kevin" showCommunity={false} />
      </div>
      {ctaCasinoSlug && <StickyCtaBySlug slug={ctaCasinoSlug} />}
    </>
  );
}
