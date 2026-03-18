import { useMemo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { LiveCommunityDataStrip } from "@/components/LiveCommunityDataStrip";
import { CommunityBrandBlock } from "@/components/community/CommunityBrandBlock";
import { CommunitySeoSections } from "@/components/community/CommunitySeoSections";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useBonusHuntArchives, useSlotCatalog } from "@/hooks/useSlotCatalog";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import { formatLastmodDanish, getRouteLastmod } from "@/lib/seoRoutes";
import {
  BarChart3, TrendingUp, Trophy, Gamepad2, Database,
  Target, ArrowRight, ExternalLink, BookOpen, ShieldCheck,
  Activity, Layers, Calculator, Scale
} from "lucide-react";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent
} from "@/components/ui/chart";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  BarChart, Bar
} from "recharts";

import statistikHero from "@/assets/statistik-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

/* ── Providers with CONFIRMED guide articles ── */
const PROVIDER_GUIDE_SLUGS: Record<string, string> = {
  "NetEnt": "netent",
  "Pragmatic Play": "pragmatic-play",
  "Evolution Gaming": "evolution-gaming",
  "Relax Gaming": "relax-gaming",
  "Play'n GO": "play-n-go",
  "Hacksaw Gaming": "hacksaw-gaming",
  "Nolimit City": "nolimit-city",
  "ELK Studios": "elk-studios",
  "Yggdrasil": "yggdrasil",
  "Yggdrasil Gaming": "yggdrasil",
  "Microgaming": "microgaming",
  "Red Tiger": "red-tiger",
  "Red Tiger Gaming": "red-tiger",
  "Big Time Gaming": "big-time-gaming",
};

/* ── Provider hub slugs (for /spillemaskiner/{slug}) ── */
const PROVIDER_HUB_SLUGS: Record<string, string> = {
  ...PROVIDER_GUIDE_SLUGS,
  "Push Gaming": "push-gaming",
  "Thunderkick": "thunderkick",
  "Blueprint Gaming": "blueprint-gaming",
  "Iron Dog Studio": "iron-dog-studio",
  "Quickspin": "quickspin",
  "Betsoft": "betsoft",
};

/* ── FAQ with internal links ── */
const faqItems: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad viser denne statistik-side?",
    answer: (
      <>
        Siden aggregerer data fra alle vores dokumenterede <Link to="/bonus-hunt/arkiv" className={linkClass}>bonus hunts</Link> og slot-tests. Du kan se historisk performance, provider-rankings baseret på reelle testresultater, og de bedst performende <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> målt på multiplikator. Alle data stammer fra live tests udført på Twitch med rigtige penge.
      </>
    ),
  },
  {
    question: "Hvor ofte opdateres statistikken?",
    answer: (
      <>
        Dataen opdateres automatisk efter hver <Link to="/bonus-hunt" className={linkClass}>bonus hunt</Link>. Vores <Link to="/slot-database" className={linkClass}>slot-database</Link> opdateres løbende, når nye slots testes eller eksisterende slots opnår nye rekorder i vores live streams.
      </>
    ),
  },
  {
    question: "Hvordan beregnes gennemsnitlig X (multiplikator)?",
    answer: (
      <>
        Gennemsnitlig X beregnes som den samlede gevinst divideret med den samlede indsats i en bonus hunt. En X på 100 betyder, at gevinsten var 100 gange indsatsen. Denne beregningsmetode er standard i casino-industrien og bruges konsekvent i alle vores <Link to="/bonus-hunt/arkiv" className={linkClass}>arkiverede hunts</Link>.
      </>
    ),
  },
  {
    question: "Kan jeg bruge denne data til research eller artikler?",
    answer: "Ja, du er velkommen til at referere til vores data med kildeangivelse til Casinoaftaler.dk. Dataen er licenseret under Creative Commons BY-SA 4.0 og stammer fra rigtige bonus hunt-tests udført live på Twitch. Vi opfordrer til korrekt citering med link til denne side.",
  },
  {
    question: "Hvilke spiludviklere performer bedst i bonus hunts?",
    answer: (
      <>
        Provider-rankingen viser, hvilke <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link> der gennemsnitligt leverer de højeste multiplikatorer. Historisk har udviklere som <Link to="/spiludviklere/hacksaw-gaming" className={linkClass}>Hacksaw Gaming</Link> og <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link> vist stærke resultater i høj-volatilitet segmentet, mens <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> dominerer i volumen.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på denne side og Bonus Hunt Arkivet?",
    answer: (
      <>
        <Link to="/bonus-hunt/arkiv" className={linkClass}>Bonus Hunt Arkivet</Link> viser detaljerede resultater for hver individuel hunt med slot-by-slot breakdowns. Denne statistik-side aggregerer alle hunts til overordnede trends, provider-rankings og historiske grafer — designet som et referencepunkt for den samlede performance over tid.
      </>
    ),
  },
  {
    question: "Hvorfor varierer gennemsnitlig X så meget mellem hunts?",
    answer: (
      <>
        Variationen skyldes primært <Link to="/ordbog/volatilitet" className={linkClass}>volatilitet</Link> — spillemaskiners iboende uforudsigelighed. Selv med samme indsatsstrategi kan en hunt med mange høj-volatilitet slots give en X på 200+, mens den næste lander under 50. Vores kumulative profit/loss-graf illustrerer denne naturlige varians over tid, og netop derfor er et stort datasæt vigtigt for at identificere reelle trends.
      </>
    ),
  },
];

/* ── Helpers ── */
function formatNumber(n: number): string {
  return n.toLocaleString("da-DK");
}
function formatDkk(n: number): string {
  return n.toLocaleString("da-DK", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " kr.";
}
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['´`]/g, "")
    .replace(/[^a-z0-9æøå]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ── Component ── */
export default function Statistik() {
  const { data: archives, isLoading: archivesLoading } = useBonusHuntArchives();
  const { data: slots, isLoading: slotsLoading } = useSlotCatalog();

  const isLoading = archivesLoading || slotsLoading;

  /* ── Aggregate archive stats ── */
  const archiveStats = useMemo(() => {
    if (!archives?.length) return null;
    const completedHunts = archives.filter(h => (h.total_slots || 0) > 0);
    const totalInvested = completedHunts.reduce((s, h) => s + (Number(h.start_balance) || 0), 0);
    const totalWon = completedHunts.reduce((s, h) => s + (Number(h.end_balance) || 0), 0);
    const totalSlots = completedHunts.reduce((s, h) => s + (h.total_slots || 0), 0);
    const avgX = completedHunts.reduce((s, h) => s + (Number(h.average_x) || 0), 0) / completedHunts.length;
    const bestHunt = completedHunts.reduce((best, h) =>
      (Number(h.average_x) || 0) > (Number(best.average_x) || 0) ? h : best, completedHunts[0]);
    return {
      huntCount: completedHunts.length,
      totalSlots,
      totalInvested,
      totalWon,
      avgX,
      bestHuntX: Number(bestHunt.average_x) || 0,
      bestHuntNumber: bestHunt.hunt_number,
      profitLoss: totalWon - totalInvested,
    };
  }, [archives]);

  /* ── Chart data: Average X over time ── */
  const chartData = useMemo(() => {
    if (!archives?.length) return [];
    return archives
      .filter(h => (h.total_slots || 0) > 0 && h.average_x)
      .sort((a, b) => a.hunt_number - b.hunt_number)
      .map(h => ({
        name: `#${h.hunt_number}`,
        huntNumber: h.hunt_number,
        avgX: Number(Number(h.average_x).toFixed(2)),
        slots: h.total_slots || 0,
      }));
  }, [archives]);

  /* ── Cumulative P/L chart ── */
  const plChartData = useMemo(() => {
    if (!archives?.length) return [];
    let cumulative = 0;
    return archives
      .filter(h => (h.total_slots || 0) > 0)
      .sort((a, b) => a.hunt_number - b.hunt_number)
      .map(h => {
        const profit = (Number(h.end_balance) || 0) - (Number(h.start_balance) || 0);
        cumulative += profit;
        return {
          name: `#${h.hunt_number}`,
          huntNumber: h.hunt_number,
          cumPL: Math.round(cumulative),
        };
      });
  }, [archives]);

  /* ── Provider rankings from slot_catalog ── */
  const providerRankings = useMemo(() => {
    if (!slots?.length) return [];
    const map = new Map<string, { count: number; totalX: number; totalBonusCount: number; maxX: number }>();
    slots.forEach(s => {
      if (!s.provider || s.provider === "Custom Slot" || s.provider === "Unknown") return;
      const existing = map.get(s.provider) || { count: 0, totalX: 0, totalBonusCount: 0, maxX: 0 };
      existing.count++;
      existing.totalX += s.highest_x || 0;
      existing.totalBonusCount += s.bonus_count || 0;
      existing.maxX = Math.max(existing.maxX, s.highest_x || 0);
      map.set(s.provider, existing);
    });
    return Array.from(map.entries())
      .filter(([, v]) => v.count >= 3)
      .map(([provider, v]) => ({
        provider,
        slotCount: v.count,
        avgHighestX: v.totalX / v.count,
        totalBonusTests: v.totalBonusCount,
        maxX: v.maxX,
        guideSlug: PROVIDER_GUIDE_SLUGS[provider],
        hubSlug: PROVIDER_HUB_SLUGS[provider],
      }))
      .sort((a, b) => b.avgHighestX - a.avgHighestX)
      .slice(0, 20);
  }, [slots]);

  /* ── Top 10 slots ── */
  const topSlots = useMemo(() => {
    if (!slots?.length) return [];
    return [...slots]
      .filter(s => (s.highest_x || 0) > 0)
      .sort((a, b) => (b.highest_x || 0) - (a.highest_x || 0))
      .slice(0, 10);
  }, [slots]);

  /* ── Provider bar chart data ── */
  const providerChartData = useMemo(() => {
    return providerRankings.slice(0, 12).map(p => ({
      name: p.provider.length > 14 ? p.provider.slice(0, 12) + "…" : p.provider,
      fullName: p.provider,
      avgX: Number(p.avgHighestX.toFixed(1)),
    }));
  }, [providerRankings]);

  /* ── SEO ── */
  const totalSlotsCatalog = slots?.length || 0;
  const seoTitle = `Bonus Hunt Statistik — ${archiveStats?.huntCount || "200+"} Hunts Analyseret`;
  const seoDesc = `Aggregeret data fra ${archiveStats?.huntCount || "200+"} dokumenterede bonus hunts og ${formatNumber(totalSlotsCatalog)} testede spillemaskiner. Historiske grafer, provider-rankings og top 10 slots baseret på reelle test-data.`;

  const statistikLastmod = getRouteLastmod("/statistik");
  const freshnessLabel = statistikLastmod ? formatLastmodDanish(statistikLastmod) : "løbende";

  const articleSchema = buildArticleSchema({
    headline: seoTitle,
    description: seoDesc,
    url: `${SITE_URL}/statistik`,
    datePublished: "2026-03-11",
    authorName: "Kevin",
    authorUrl: `${SITE_URL}/forfatter/kevin`,
    about: [
      { "@type": "Thing", name: "Bonus Hunt", url: `${SITE_URL}/bonus-hunt` },
      { "@type": "Thing", name: "Spillemaskiner", url: `${SITE_URL}/slot-database` },
      { "@type": "Thing", name: "Spiludviklere", url: `${SITE_URL}/spiludviklere` },
    ],
  });
  const faqSchema = buildFaqSchema(faqItems);

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Casinoaftaler Bonus Hunt Statistik",
    description: `Aggregeret dataset fra ${archiveStats?.huntCount || "200+"} live-testede bonus hunts med slot-performance, provider-rankings og historisk multiplikator-data.`,
    url: `${SITE_URL}/statistik`,
    creator: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Casinoaftaler.dk",
    },
    temporalCoverage: "2024/..",
    variableMeasured: [
      { "@type": "PropertyValue", name: "Average Multiplier (X)", unitText: "x" },
      { "@type": "PropertyValue", name: "Total Slots Tested", unitText: "count" },
      { "@type": "PropertyValue", name: "Highest Win", unitText: "DKK" },
    ],
    license: "https://creativecommons.org/licenses/by-sa/4.0/",
  };

  const avgXChartConfig = {
    avgX: { label: "Gns. X", color: "hsl(var(--primary))" },
  };
  const plChartConfig = {
    cumPL: { label: "Kumulativ P/L", color: "hsl(var(--accent))" },
  };
  const providerBarConfig = {
    avgX: { label: "Gns. Højeste X", color: "hsl(var(--primary))" },
  };

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        jsonLd={[articleSchema, faqSchema, datasetSchema]}
        breadcrumbLabel="Statistik"
        datePublished="2026-03-11"
        dateModified="2026-03-11"
      />

      {/* ══════════════════════════════════════════════════════════
          GRADIENT HERO HEADER
      ══════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <BarChart3 className="mr-1.5 h-3.5 w-3.5" />
              Opdateret {new Date().toLocaleDateString("da-DK", { month: "long", year: "numeric" })}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Bonus Hunt Statistik
            </h1>
            <p className="text-lg text-white/80">
              Aggregeret data fra {archiveStats ? formatNumber(archiveStats.huntCount) : "200+"} dokumenterede bonus hunts
              og {formatNumber(totalSlotsCatalog)} testede spillemaskiner. Historiske grafer, provider-rankings og
              top 10 slots baseret på reelle test-data fra live Twitch streams.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════════════════ */}
      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="kevin" date="11-03-2026" readTime="15 Min." />

        {/* Hero image */}
        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={statistikHero}
            alt="Bonus Hunt Statistik – aggregeret data fra hundredvis af dokumenterede bonus hunts og spillemaskin-tests"
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
            width={1920}
            height={1080}
          />
        </div>

        {/* ── Intro prose ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Danmarks mest omfattende bonus hunt datasæt</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Casinoaftaler.dk er den eneste danske platform, der systematisk dokumenterer og offentliggør detaljerede resultater fra live <Link to="/bonus-hunt" className={linkClass}>bonus hunts</Link>. Siden 2024 har vi gennemført hundredvis af hunts på <Link to="/casino-anmeldelser" className={linkClass}>danske casinoer med licens</Link> fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>, og resultaterne er samlet her som en åben, verificerbar datakilde.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne statistik-side giver et komplet overblik over alle vores historiske resultater — fra den allerførste bonus hunt til den seneste. Du kan analysere trends i gennemsnitlig multiplikator (X), se hvilke <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link> der konsekvent leverer de bedste resultater, og udforske de spillemaskiner der har givet de højeste gevinster i vores tests. Alle data er indsamlet under live Twitch streams med rigtige penge og er fuldt dokumenteret i vores <Link to="/bonus-hunt/arkiv" className={linkClass}>Bonus Hunt Arkiv</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vi anvender disse data aktivt i vores <Link to="/saadan-tester-vi-casinoer" className={linkClass}>testmetodik</Link>, hvor vi evaluerer casinoer og spillemaskiner baseret på matematiske modeller fremfor subjektive vurderinger. Provider-rankingen nedenfor er et direkte resultat af denne datadrevne tilgang og giver et retvisende billede af, hvilke udviklere der reelt leverer værdi for spillere.
          </p>
        </section>

        {/* ── Live Community Data Strip ── */}
        <LiveCommunityDataStrip context="slots" />

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════
            SECTION 1: Nøgletal
        ══════════════════════════════════════════════════════════ */}
        {!isLoading && archiveStats && (
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-foreground">Overordnede nøgletal</h2>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Nedenfor ses de samlede nøgletal fra alle vores dokumenterede bonus hunts. Tallene opdateres automatisk efter hver ny hunt og giver et realtidsbillede af vores samlede testhistorik.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" aria-label="Nøgletal">
              <KpiCard icon={<Database className="h-5 w-5" />} label="Testede Slots" value={formatNumber(totalSlotsCatalog)} />
              <KpiCard icon={<Target className="h-5 w-5" />} label="Bonus Hunts" value={formatNumber(archiveStats.huntCount)} />
              <KpiCard icon={<TrendingUp className="h-5 w-5" />} label="Gns. X" value={archiveStats.avgX.toFixed(2) + "x"} />
              <KpiCard icon={<Trophy className="h-5 w-5" />} label="Bedste Hunt X" value={archiveStats.bestHuntX.toFixed(2) + "x"} accent />
            </div>

            {/* Investment overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-border bg-card">
                <CardContent className="pt-6 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Investeret</p>
                  <p className="text-2xl font-bold text-foreground">{formatDkk(archiveStats.totalInvested)}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="pt-6 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Gevinst</p>
                  <p className="text-2xl font-bold text-foreground">{formatDkk(archiveStats.totalWon)}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="pt-6 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Samlet P/L</p>
                  <p className={`text-2xl font-bold ${archiveStats.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {archiveStats.profitLoss >= 0 ? '+' : ''}{formatDkk(archiveStats.profitLoss)}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════
            SECTION 2: Historisk Average X
        ══════════════════════════════════════════════════════════ */}
        {chartData.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Historisk gennemsnitlig X per hunt</h2>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Grafen viser den gennemsnitlige multiplikator (X) for hver dokumenteret bonus hunt, sorteret kronologisk. En høj X indikerer et profitabelt hunt-resultat. Den naturlige <Link to="/ordbog/volatilitet" className={linkClass}>volatilitet</Link> i spillemaskiner betyder, at resultaterne varierer markant fra hunt til hunt — hvilket er forventeligt og en central del af den statistiske analyse.
            </p>
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <ChartContainer config={avgXChartConfig} className="h-[350px] w-full">
                  <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="avgXGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                    <YAxis tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="avgX"
                      stroke="hsl(var(--primary))"
                      fill="url(#avgXGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════
            SECTION 3: Kumulativ P/L
        ══════════════════════════════════════════════════════════ */}
        {plChartData.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Kumulativ profit / loss over tid</h2>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Denne graf viser den akkumulerede profit eller tab over alle dokumenterede bonus hunts. Kurven illustrerer den langsigtede tendens og afslører, om vores hunts samlet set har været profitable. Bemærk, at kortsigtede udsving er normale og forventes ved spil med høj <Link to="/ordbog/volatilitet" className={linkClass}>volatilitet</Link>. For individuelle hunt-resultater, se <Link to="/bonus-hunt/arkiv" className={linkClass}>det fulde arkiv</Link>.
            </p>
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <ChartContainer config={plChartConfig} className="h-[350px] w-full">
                  <AreaChart data={plChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="plGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                    <YAxis tick={{ fontSize: 11 }} className="fill-muted-foreground" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="cumPL"
                      stroke="hsl(var(--accent))"
                      fill="url(#plGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════
            SECTION 4: Provider Rankings
        ══════════════════════════════════════════════════════════ */}
        {providerRankings.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Provider-ranking: Hvilke spiludviklere performer bedst?</h2>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Nedenstående ranking aggregerer data fra vores <Link to="/slot-database" className={linkClass}>slot-database</Link> med over {formatNumber(totalSlotsCatalog)} spillemaskiner. Vi måler den gennemsnitlige højeste multiplikator per <Link to="/spiludviklere" className={linkClass}>spiludvikler</Link> for at give et retvisende, datadrevet billede af, hvilke providers der konsekvent leverer de bedste bonus-resultater i vores live tests. Kun providers med minimum 3 testede slots er inkluderet for at sikre statistisk relevans.
            </p>

            {/* Bar Chart */}
            {providerChartData.length > 0 && (
              <Card className="border-border bg-card mb-8">
                <CardContent className="pt-6">
                  <ChartContainer config={providerBarConfig} className="h-[400px] w-full">
                    <BarChart data={providerChartData} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis type="number" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} className="fill-muted-foreground" width={80} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="avgX" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}

            {/* Table */}
            <Card className="border-border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left px-4 py-3 font-semibold text-foreground">#</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Provider</th>
                      <th className="text-right px-4 py-3 font-semibold text-foreground">Slots</th>
                      <th className="text-right px-4 py-3 font-semibold text-foreground">Gns. X</th>
                      <th className="text-right px-4 py-3 font-semibold text-foreground">Max X</th>
                      <th className="text-right px-4 py-3 font-semibold text-foreground">Bonus Tests</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Links</th>
                    </tr>
                  </thead>
                  <tbody>
                    {providerRankings.map((p, i) => (
                      <tr key={p.provider} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                        <td className="px-4 py-3 font-medium text-foreground">{p.provider}</td>
                        <td className="text-right px-4 py-3 text-muted-foreground">{p.slotCount}</td>
                        <td className="text-right px-4 py-3 font-semibold text-foreground">{p.avgHighestX.toFixed(1)}x</td>
                        <td className="text-right px-4 py-3 text-foreground">{formatNumber(p.maxX)}x</td>
                        <td className="text-right px-4 py-3 text-muted-foreground">{formatNumber(p.totalBonusTests)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {p.guideSlug && (
                              <Link to={`/spiludviklere/${p.guideSlug}`} className="text-primary hover:underline text-xs inline-flex items-center gap-0.5" title={`Læs ${p.provider} guide`}>
                                <BookOpen className="h-3 w-3" /> Guide
                              </Link>
                            )}
                            {p.hubSlug && (
                              <Link to={`/spillemaskiner/${p.hubSlug}`} className="text-primary hover:underline text-xs inline-flex items-center gap-0.5" title={`Se alle ${p.provider} slots`}>
                                <Gamepad2 className="h-3 w-3" /> Slots
                              </Link>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            <p className="text-sm text-muted-foreground mt-3">
              Se alle spiludviklere i vores <Link to="/spiludviklere" className="text-primary hover:underline">oversigt over spiludviklere</Link> eller udforsk alle slots i <Link to="/slot-database" className="text-primary hover:underline">Slot Database</Link>.
            </p>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════
            SECTION 5: Top 10 Slots
        ══════════════════════════════════════════════════════════ */}
        {topSlots.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Top 10 bedst performende spillemaskiner</h2>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              De 10 spillemaskiner med den højeste registrerede multiplikator (X) i vores tests. Klik på en slot for at se detaljeret information, <Link to="/ordbog/rtp" className={linkClass}>RTP</Link>, volatilitet og bonus hunt-historik i vores <Link to="/slot-database" className={linkClass}>slot-katalog</Link>.
            </p>
            <Card className="border-border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left px-4 py-3 font-semibold text-foreground">#</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Slot</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Provider</th>
                      <th className="text-right px-4 py-3 font-semibold text-foreground">Højeste X</th>
                      <th className="text-right px-4 py-3 font-semibold text-foreground">Højeste Win</th>
                      <th className="text-right px-4 py-3 font-semibold text-foreground">Tests</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topSlots.map((s, i) => {
                      const slotSlug = toSlug(s.slot_name);
                      const providerHubSlug = PROVIDER_HUB_SLUGS[s.provider];
                      return (
                        <tr key={s.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 text-muted-foreground">
                            {i === 0 ? <Trophy className="h-4 w-4 text-primary" /> : i + 1}
                          </td>
                          <td className="px-4 py-3 font-medium">
                            <Link to={`/slot-katalog/${slotSlug}`} className="text-primary hover:underline">
                              {s.slot_name}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {providerHubSlug ? (
                              <Link to={`/spillemaskiner/${providerHubSlug}`} className="hover:text-foreground transition-colors">
                                {s.provider}
                              </Link>
                            ) : s.provider}
                          </td>
                          <td className="text-right px-4 py-3">
                            <Badge variant="secondary" className="font-mono">
                              {formatNumber(s.highest_x || 0)}x
                            </Badge>
                          </td>
                          <td className="text-right px-4 py-3 text-foreground">
                            {s.highest_win ? formatDkk(s.highest_win) : "–"}
                          </td>
                          <td className="text-right px-4 py-3 text-muted-foreground">{s.bonus_count}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
            <p className="text-sm text-muted-foreground mt-3">
              Udforsk alle {formatNumber(totalSlotsCatalog)} spillemaskiner i vores <Link to="/slot-database" className="text-primary hover:underline">Slot Database</Link> eller se de seneste <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">bonus hunt-resultater</Link>.
            </p>
          </section>
        )}

        <Separator className="my-10" />

        {/* ══════════════════════════════════════════════════════════
            SECTION 6: Dybdegående SEO-prosa
        ══════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Metodik og dataindsamling</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle data indsamles automatisk under live Twitch streams via vores integration med StreamElements og interne tracking-systemer. Hver <Link to="/bonus-hunt" className={linkClass}>bonus hunt</Link> dokumenteres med præcis startbalance, antal slots, individuelle slot-resultater og endelig balance. Vi anvender en konsistent indsatsstrategi på tværs af hunts for at sikre sammenlignelighed, typisk med faste bet-størrelser tilpasset den aktuelle bankroll.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vores testmetodik bygger på transparens og reproducerbarhed. Alle hunts streames live på Twitch, hvor vores community kan følge med i realtid og verificere resultaterne. Slot-level data inkluderer bet-størrelse, antal spins til bonus, bonusresultat og eventuelle <Link to="/ordbog/free-spins" className={linkClass}>free spins</Link> features. Denne granulære dataindsamling giver os mulighed for at foretage avancerede analyser på tværs af <Link to="/spiludviklere" className={linkClass}>providers</Link>, volatilitets-segmenter og bonustyper.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det er vigtigt at understrege, at resultaterne afspejler vores specifikke testbetingelser og bør forstås i kontekst. Spillemaskiner med høj <Link to="/ordbog/volatilitet" className={linkClass}>volatilitet</Link> kan give dramatisk forskellige resultater over korte perioder. Vores data bør bruges som ét datapunkt i en bredere analyse — ikke som garanti for fremtidige resultater. Vi opfordrer til <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> og anbefaler altid at sætte et budget, før man begynder at spille.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Volatilitet og statistisk varians i bonus hunts</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En af de mest stillede spørgsmål fra vores community handler om, hvorfor gennemsnitlig X varierer så markant mellem hunts. Svaret ligger i den matematiske natur af spillemaskiner: selv med identiske betingelser kan to hunts give radikalt forskellige resultater. En hunt med overvejende høj-volatilitet slots fra <Link to="/spiludviklere/hacksaw-gaming" className={linkClass}>Hacksaw Gaming</Link> eller <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link> har et bredere udfaldsrum end en hunt fokuseret på <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link> eller <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link> slots med lavere volatilitet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den kumulative profit/loss-graf ovenfor er designet til at visualisere denne varians over tid. Kortsigtede udsving er forventelige og en naturlig del af gambling-matematik. Det er den langsigtede trend — baseret på hundredvis af datapunkter — der giver reel indsigt. Vores data viser konsekvent, at <Link to="/ordbog/rtp" className={linkClass}>RTP (Return to Player)</Link> er den primære driver for langsigtet performance, mens volatilitet bestemmer variansen i kortsigtede resultater.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vi anvender disse indsigter aktivt i vores <Link to="/casino-bonus" className={linkClass}>bonusguides</Link> og <Link to="/casino-anmeldelser" className={linkClass}>casinoanmeldelser</Link>, hvor vi hjælper spillere med at vælge slots der matcher deres risikoprofil og bankroll. En spiller med en mindre bankroll bør typisk vælge slots med lavere volatilitet for at forlænge spilletiden, mens erfarne spillere med større bankroll kan drage fordel af de høj-volatilitet titler, der dominerer vores top 10 liste.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Hvordan bruges denne data?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vores bonus hunt-data bruges på flere niveauer. For spillere giver det et datadrevet grundlag for at vælge <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> baseret på reelle testresultater frem for marketingbudskaber. For casino-industrien tilbyder det transparens og accountability — vi dokumenterer faktiske resultater, som enhver kan verificere via vores <Link to="/bonus-hunt/arkiv" className={linkClass}>arkiv</Link> og Twitch VODs.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Provider-rankingen er desuden et værdifuldt værktøj for spillere, der ønsker at forstå forskelle mellem <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link>. En provider med høj gennemsnitlig X indikerer et slot-portefølje, der tenderer mod højere udbytter i bonusrunder — men det skal altid ses i sammenhæng med volatilitet og antal tests. Vi anbefaler at kombinere vores statistik med information fra de individuelle <Link to="/spiludviklere/pragmatic-play" className={linkClass}>provider-guides</Link> for at danne et komplet billede.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Dataen er licenseret under Creative Commons BY-SA 4.0, hvilket betyder, at journalister, forskere og andre platforme frit kan referere til og citere vores resultater med kildeangivelse. Vi opfordrer til brug af denne data som reference i artikler om den danske <Link to="/spillemyndigheden" className={linkClass}>casinoindustri</Link> og spilleadfærd.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── Community SEO Sections (tovejs-linking) ── */}
        <CommunitySeoSections />

        <Separator className="my-10" />

        {/* ── Related Guides ── */}
        <LatestNewsByCategory pagePath="/statistik" />
        <RelatedGuides currentPath="/statistik" />

        {/* ── FAQ ── */}
        <FAQSection faqs={faqItems} />

        <Separator className="my-10" />

        {/* ── Community Brand Block (E-E-A-T) ── */}
        <CommunityBrandBlock />

        <Separator className="my-10" />

        {/* ── Author Bio ── */}
        <AuthorBio author="kevin" />

        {/* noscript fallback */}
        <noscript>
          <div>
            <h2>Bonus Hunt Statistik – Casinoaftaler</h2>
            <p>Denne side indeholder aggregeret data fra over 200 dokumenterede bonus hunts med detaljerede resultater, provider-rankings og top 10 bedst performende spillemaskiner.</p>
            <ul>
              <li><a href="/bonus-hunt">Bonus Hunt Live</a></li>
              <li><a href="/bonus-hunt/arkiv">Bonus Hunt Arkiv</a></li>
              <li><a href="/slot-database">Slot Database</a></li>
              <li><a href="/spiludviklere">Spiludviklere</a></li>
              <li><a href="/casino-anmeldelser">Casino Anmeldelser</a></li>
              <li><a href="/casinospil/spillemaskiner">Spillemaskiner</a></li>
              <li><a href="/community">Community</a></li>
              <li><a href="/nye-casinoer">Nye Casinoer</a></li>
              <li><a href="/casino-bonus">Casino Bonus</a></li>
              <li><a href="/free-spins">Free Spins</a></li>
            </ul>
          </div>
        </noscript>
      </div>
    </>
  );
}

/* ── Sub-components ── */
function KpiCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent?: boolean }) {
  return (
    <Card className={`border-border ${accent ? 'bg-primary/5 border-primary/20' : 'bg-card'}`}>
      <CardContent className="pt-5 pb-4 flex flex-col items-center gap-1">
        <div className={`${accent ? 'text-primary' : 'text-muted-foreground'}`}>{icon}</div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
