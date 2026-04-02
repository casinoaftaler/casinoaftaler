import { Link } from "react-router-dom";
import { ProviderLogoIcon } from "@/components/ProviderLogoIcon";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { AuthorBio } from "@/components/AuthorBio";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useCasinos } from "@/hooks/useCasinos";
import { RelatedGuides } from "@/components/RelatedGuides";
import { ProviderSlotLinks } from "@/components/ProviderSlotLinks";
import { DeveloperSiblingLinks } from "@/components/DeveloperSiblingLinks";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { DeveloperMoneyLinks } from "@/components/DeveloperMoneyLinks";
import { ProviderCatalogSlots } from "@/components/ProviderCatalogSlots";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Award, BarChart3, BookOpen, CalendarDays, CheckCircle2, Play, ShieldCheck, Star, Target, ThumbsDown, ThumbsUp, User } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { ReactNode, Fragment, useMemo } from "react";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { ContentPageLayout } from "@/components/ContentPageLayout";

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
  /** Extra JSON-LD schemas (e.g. VideoObject) to inject alongside Article+FAQ */
  extraJsonLd?: Record<string, unknown>[];
  responsibleGamingText?: string;
  strategicAnalysis?: ReactNode;
  technicalProfile?: ReactNode;
  sectionOrder?: string[];
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
  seoTitle, seoDescription, name, heroSubtitle,
  introTitle, introContent, historyTitle, historyIntro, timeline,
  games, gamesIntro, licensesContent, pros, cons, faqs, currentPath, extraJsonLd,
  responsibleGamingText, strategicAnalysis, technicalProfile,
  sectionOrder, readTime = "14 Min.",
  strategicTitle, technicalTitle, gamesTitle, licensesTitle, prosConsTitle, responsibleTitle,
  ctaCasinoSlug,
}: ProviderPageProps) {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;
  const { data: casinos } = useCasinos();

  // Find partner casinos that carry this provider
  const PARTNER_SLUGS = ["spildansknu", "spilleautomaten", "betinia", "campobet", "swift-casino", "luna-casino", "playkasino"];
  const providerPrioritySlugs = useMemo(() => {
    if (!casinos) return undefined;
    const displayName = name.toLowerCase();
    return casinos
      .filter(c =>
        c.is_active &&
        PARTNER_SLUGS.includes(c.slug) &&
        c.game_providers?.some(gp => gp.name.toLowerCase() === displayName)
      )
      .sort((a, b) => a.position - b.position)
      .slice(0, 3)
      .map(c => c.slug);
  }, [casinos, name]);
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
    intro: (() => {
      const crosslinkVariants = [
        <>Læs vores komplette <Link to="/spiludviklere" className="text-primary underline hover:text-primary/80">oversigt over spiludviklere</Link> for at sammenligne {name} med andre førende studios, eller udforsk <Link to="/casinospil" className="text-primary underline hover:text-primary/80">vores guide til casinospil</Link> for at finde de bedste spil til din spillestil.</>,
        <>Sammenlign {name} med andre studios i vores <Link to="/spiludviklere" className="text-primary underline hover:text-primary/80">spiludvikler-oversigt</Link>, eller find din næste favorit via <Link to="/casinospil/spillemaskiner" className="text-primary underline hover:text-primary/80">vores spillemaskine-guide</Link>.</>,
        <>Udforsk hvordan {name} klarer sig mod konkurrenterne i vores <Link to="/spiludviklere" className="text-primary underline hover:text-primary/80">komplette udvikler-guide</Link>, og se de nyeste <Link to="/casinospil" className="text-primary underline hover:text-primary/80">casinospil-anbefalinger</Link>.</>,
        <>Se hele det danske udbud af spiludviklere i vores <Link to="/spiludviklere" className="text-primary underline hover:text-primary/80">dybdegående oversigt</Link>, eller gå direkte til <Link to="/casinospil/spillemaskiner" className="text-primary underline hover:text-primary/80">spillemaskinerne</Link> for at finde {name}-titler.</>,
        <>Find flere studier som {name} i vores <Link to="/spiludviklere" className="text-primary underline hover:text-primary/80">spiludvikler-database</Link>, eller læs om <Link to="/casinospil" className="text-primary underline hover:text-primary/80">hvilke casinospil</Link> der passer til din spillestil.</>,
      ];
      const idx = name.length % crosslinkVariants.length;
      return (
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">{introTitle}</h2>
          {introContent}
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {crosslinkVariants[idx]}
          </p>
        </section>
      );
    })(),
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
                  <MenuIcon iconName="star" className="h-5 w-5 text-primary" />
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
      </section>
    ),
    proscons: (
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">{prosConsTitle || "Fordele og Ulemper"}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-primary">
                <MenuIcon iconName="thumbs-up" className="h-5 w-5" />
                Fordele
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MenuIcon iconName="check-circle2" className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                <MenuIcon iconName="thumbs-down" className="h-5 w-5" />
                Ulemper
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MenuIcon iconName="alert-triangle" className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
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
          <MenuIcon iconName="target" className="h-7 w-7 text-primary" />
          {strategicTitle || "Strategisk Analyse og Markedsposition"}
        </h2>
        {strategicAnalysis}
      </section>
    ) : null,
    technical: technicalProfile ? (
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
          <MenuIcon iconName="bar-chart3" className="h-7 w-7 text-primary" />
          {technicalTitle || "Teknisk Profil"}
        </h2>
        {technicalProfile}
      </section>
    ) : null,
    providers: (() => {
      const headingVariants = [
        "Relaterede Spiludviklere",
        "Andre Populære Spiludviklere",
        "Udforsk Flere Studios",
        `Studios der Ligner ${name}`,
        "Lignende Spiludviklere",
      ];
      const descVariants = [
        <>Se vores komplette <Link to="/spiludviklere" className="text-primary underline hover:text-primary/80">oversigt over spiludviklere</Link> i casinobranchen.</>,
        <>Sammenlign med andre studier i vores <Link to="/spiludviklere" className="text-primary underline hover:text-primary/80">spiludvikler-guide</Link>.</>,
        <>Find flere udviklere i vores <Link to="/spiludviklere" className="text-primary underline hover:text-primary/80">dybdegående udvikler-database</Link>.</>,
        <>Udforsk hele markedet via vores <Link to="/spiludviklere" className="text-primary underline hover:text-primary/80">komplette spiludvikler-oversigt</Link>.</>,
        <>Se hvem der ellers leverer til <Link to="/top-10-casino-online" className="text-primary underline hover:text-primary/80">danske casinoer</Link> i vores udvikleroversigt.</>,
      ];
      const hIdx = (name.length + 3) % headingVariants.length;
      const dIdx = (name.length + 1) % descVariants.length;
      // Rotate which providers to show based on name hash
      const startIdx = name.charCodeAt(0) % providerLinks.length;
      const filtered = providerLinks.filter((dev) => dev.to !== currentPath);
      const rotated = [...filtered.slice(startIdx % filtered.length), ...filtered.slice(0, startIdx % filtered.length)];
      return (
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">{headingVariants[hIdx]}</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            {descVariants[dIdx]}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {rotated.slice(0, 3).map((dev) => (
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
      );
    })(),
    responsible: (() => {
      const helpVariants = [
        <>Læs mere om <Link to="/ansvarligt-spil" className="text-primary hover:underline font-medium">ansvarligt spil</Link>. I Danmark kan du søge hjælp via <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a> og <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>. 18+ | Spil ansvarligt.</>,
        <>Har du brug for hjælp? Besøg <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a> for selvudelukkelse eller <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet</a> for rådgivning. Læs vores <Link to="/ansvarligt-spil" className="text-primary hover:underline font-medium">guide til ansvarligt spil</Link>. 18+.</>,
        <>Find støtte og vejledning hos <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a> eller registrer dig i <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>. Se også vores <Link to="/ansvarligt-spil/selvudelukkelse-guide" className="text-primary hover:underline font-medium">selvudelukkelses-guide</Link>. 18+ | Spil med omtanke.</>,
        <>Udforsk vores <Link to="/ansvarligt-spil" className="text-primary hover:underline font-medium">ressourcer om ansvarligt spil</Link>, og brug <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a> hvis du ønsker at begrænse din adgang til online casinoer. <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet</a> tilbyder gratis rådgivning. 18+.</>,
        <>Sæt dine grænser via vores <Link to="/ansvarligt-spil/spillegraenser" className="text-primary hover:underline font-medium">spillegrænse-guide</Link>. <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a> og <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a> er altid tilgængelige for danske spillere. 18+ | Spil ansvarligt.</>,
      ];
      const rIdx = (name.length + 2) % helpVariants.length;
      return (
        <section className="mb-12">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MenuIcon iconName="award" className="h-5 w-5 text-primary" />
                {responsibleTitle || "Ansvarligt Spil"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                {responsibleGamingText || `${name} prioriterer ansvarligt spil og samarbejder med anerkendte organisationer for spillerbeskyttelse.`}{" "}
                {helpVariants[rIdx]}
              </p>
            </CardContent>
          </Card>
        </section>
      );
    })(),
  };

  const order = sectionOrder || defaultSectionOrder;
  const orderedSections = order
    .map((key) => ({ key, node: sectionMap[key] }))
    .filter((s) => s.node != null);

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} jsonLd={[faqJsonLd, articleSchema, ...(extraJsonLd || [])]} />

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
              <ProviderLogoIcon slug={currentPath.split("/").pop() || ""} alt={name} className="mr-1.5 h-3.5 w-auto max-w-[60px] object-contain" />
              Spiludvikler
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">{name}</h1>
            <p className="text-lg text-white/80">{heroSubtitle}</p>
          </div>
        </div>
      </section>

      <ContentPageLayout>
        <AuthorMetaBar author="kevin" readTime={readTime} />

        {providerPrioritySlugs && providerPrioritySlugs.length > 0 && (
          <div className="mb-10">
            <QuickComparisonTable
              count={3}
              title={`Bedste casinoer med ${name} spil`}
              prioritySlugs={providerPrioritySlugs}
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
      </ContentPageLayout>
      {ctaCasinoSlug && <StickyCtaBySlug slug={ctaCasinoSlug} />}
    </>
  );
}
