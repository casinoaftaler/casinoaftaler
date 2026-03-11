import { useMemo } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBonusHuntArchives, useSlotCatalog } from "@/hooks/useSlotCatalog";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import {
  BarChart3, TrendingUp, Trophy, Gamepad2, Database,
  Users, Target, ArrowRight, ExternalLink
} from "lucide-react";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent
} from "@/components/ui/chart";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

import statistikHero from "@/assets/statistik-hero.jpg";

/* ── Provider slug mapping ── */
const PROVIDER_SLUG_MAP: Record<string, string> = {
  "NetEnt": "netent",
  "Pragmatic Play": "pragmatic-play",
  "Evolution Gaming": "evolution-gaming",
  "Relax Gaming": "relax-gaming",
  "Play'n GO": "play-n-go",
  "Hacksaw Gaming": "hacksaw-gaming",
  "Nolimit City": "nolimit-city",
  "ELK Studios": "elk-studios",
  "Yggdrasil": "yggdrasil",
  "Microgaming": "microgaming",
  "Red Tiger": "red-tiger",
  "Big Time Gaming": "big-time-gaming",
  "Push Gaming": "push-gaming",
};

/* ── FAQ ── */
const faqItems = [
  {
    question: "Hvad viser denne statistik-side?",
    answer: "Siden aggregerer data fra alle vores dokumenterede bonus hunts og slot-tests. Du kan se historisk performance, provider-rankings baseret på reelle testresultater, og de bedst performende spillemaskiner målt på multiplikator."
  },
  {
    question: "Hvor ofte opdateres dataen?",
    answer: "Dataen opdateres automatisk efter hver bonus hunt. Slot-databasen opdateres løbende, når nye slots testes eller eksisterende slots opnår nye rekorder."
  },
  {
    question: "Hvordan beregnes gennemsnitlig X (multiplikator)?",
    answer: "Gennemsnitlig X beregnes som den samlede gevinst divideret med den samlede indsats i en bonus hunt. En X på 100 betyder, at gevinsten var 100 gange indsatsen."
  },
  {
    question: "Kan jeg bruge denne data til research?",
    answer: "Ja, du er velkommen til at referere til vores data med kildeangivelse. Dataen stammer fra rigtige bonus hunt-tests udført live på Twitch og er fuldt dokumenteret."
  },
  {
    question: "Hvilke providers performer bedst i bonus hunts?",
    answer: "Provider-rankingen viser, hvilke spiludviklere der gennemsnitligt leverer de højeste multiplikatorer i vores tests. Bemærk, at resultaterne er baseret på vores specifikke testmetoder og -betingelser."
  },
];

/* ── Helpers ── */
function formatNumber(n: number): string {
  return n.toLocaleString("da-DK");
}
function formatDkk(n: number): string {
  return n.toLocaleString("da-DK", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " kr.";
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
      .filter(([, v]) => v.count >= 3) // minimum 3 slots
      .map(([provider, v]) => ({
        provider,
        slotCount: v.count,
        avgHighestX: v.totalX / v.count,
        totalBonusTests: v.totalBonusCount,
        maxX: v.maxX,
        slug: PROVIDER_SLUG_MAP[provider],
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

  const articleSchema = buildArticleSchema({
    headline: seoTitle,
    description: seoDesc,
    url: `${SITE_URL}/statistik`,
    datePublished: "2026-03-11",
    dateModified: new Date().toISOString().split("T")[0],
    authorName: "Kevin",
    about: [
      { "@type": "Thing", name: "Bonus Hunt", url: `${SITE_URL}/bonus-hunt` },
      { "@type": "Thing", name: "Spillemaskiner", url: `${SITE_URL}/slot-database` },
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
      />

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Breadcrumbs />

        {/* Hero */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Bonus Hunt Statistik
              </h1>
              <p className="text-muted-foreground mt-1">
                Aggregeret data fra {archiveStats ? formatNumber(archiveStats.huntCount) : "…"} dokumenterede bonus hunts
              </p>
            </div>
          </div>

          <AuthorMetaBar author="kevin" />
        </header>

        {/* Headline KPIs */}
        {!isLoading && archiveStats && (
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10" aria-label="Nøgletal">
            <KpiCard icon={<Database className="h-5 w-5" />} label="Testede Slots" value={formatNumber(totalSlotsCatalog)} />
            <KpiCard icon={<Target className="h-5 w-5" />} label="Bonus Hunts" value={formatNumber(archiveStats.huntCount)} />
            <KpiCard icon={<TrendingUp className="h-5 w-5" />} label="Gns. X" value={archiveStats.avgX.toFixed(2) + "x"} />
            <KpiCard icon={<Trophy className="h-5 w-5" />} label="Bedste Hunt X" value={archiveStats.bestHuntX.toFixed(2) + "x"} accent />
          </section>
        )}

        {/* Investment overview */}
        {!isLoading && archiveStats && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
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
          </section>
        )}

        {/* ── Chart: Average X over time ── */}
        {chartData.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Historisk Gennemsnitlig X per Hunt</h2>
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

        {/* ── Chart: Cumulative P/L ── */}
        {plChartData.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Kumulativ Profit / Loss</h2>
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

        {/* ── Provider Rankings Bar Chart ── */}
        {providerChartData.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Provider-Ranking: Gns. Højeste Multiplikator</h2>
            <Card className="border-border bg-card">
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
          </section>
        )}

        {/* ── Provider Rankings Table ── */}
        {providerRankings.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Top Providers – Detaljeret Oversigt</h2>
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
                    </tr>
                  </thead>
                  <tbody>
                    {providerRankings.map((p, i) => (
                      <tr key={p.provider} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                        <td className="px-4 py-3 font-medium text-foreground">
                          {p.slug ? (
                            <Link to={`/spiludviklere/${p.slug}`} className="text-primary hover:underline inline-flex items-center gap-1">
                              {p.provider} <ExternalLink className="h-3 w-3" />
                            </Link>
                          ) : p.provider}
                        </td>
                        <td className="text-right px-4 py-3 text-muted-foreground">{p.slotCount}</td>
                        <td className="text-right px-4 py-3 font-semibold text-foreground">{p.avgHighestX.toFixed(1)}x</td>
                        <td className="text-right px-4 py-3 text-foreground">{formatNumber(p.maxX)}x</td>
                        <td className="text-right px-4 py-3 text-muted-foreground">{formatNumber(p.totalBonusTests)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>
        )}

        {/* ── Top 10 Slots ── */}
        {topSlots.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Top 10 Bedst Performende Slots</h2>
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
                    {topSlots.map((s, i) => (
                      <tr key={s.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 text-muted-foreground">
                          {i === 0 ? <Trophy className="h-4 w-4 text-primary" /> : i + 1}
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground">{s.slot_name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{s.provider}</td>
                        <td className="text-right px-4 py-3">
                          <Badge variant="secondary" className="font-mono">
                            {formatNumber(s.highest_x)}x
                          </Badge>
                        </td>
                        <td className="text-right px-4 py-3 text-foreground">
                          {s.highest_win ? formatDkk(s.highest_win) : "–"}
                        </td>
                        <td className="text-right px-4 py-3 text-muted-foreground">{s.bonus_count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            <p className="text-sm text-muted-foreground mt-2">
              Se alle slots i vores <Link to="/slot-database" className="text-primary hover:underline">Slot Database</Link>.
            </p>
          </section>
        )}

        {/* ── SEO prose ── */}
        <section className="prose prose-neutral dark:prose-invert max-w-none mb-10">
          <h2>Om Vores Bonus Hunt Data</h2>
          <p>
            Casinoaftaler.dk er den eneste danske platform, der systematisk dokumenterer og offentliggør
            detaljerede resultater fra live bonus hunts. Vores data stammer fra reelle tests udført live
            på Twitch, hvor vi åbner bonusser på et bredt udsnit af spillemaskiner og logger resultaterne
            i realtid.
          </p>
          <p>
            Denne statistik-side giver et overblik over alle vores historiske resultater — fra den
            første bonus hunt til den seneste. Grafen over gennemsnitlig multiplikator (X) viser, hvordan
            performance varierer fra hunt til hunt, mens den kumulative profit/loss-kurve afslører den
            langsigtede tendens.
          </p>
          <p>
            Provider-rankingen er baseret på aggregerede data fra vores slot-katalog, der inkluderer
            over {formatNumber(totalSlotsCatalog)} spillemaskiner. Vi måler den gennemsnitlige højeste
            multiplikator per provider for at give et retvisende billede af, hvilke spiludviklere der
            konsekvent leverer de bedste bonus-resultater.
          </p>

          <h2>Metodik & Dataindsamling</h2>
          <p>
            Alle data indsamles automatisk under live streams via vores integration med StreamElements
            og interne tracking-systemer. Hver bonus hunt dokumenteres med startbalance, antal slots,
            individuelle slot-resultater og endelig balance. Vi anvender samme indsatsstrategi på tværs
            af hunts for at sikre sammenlignelighed.
          </p>
          <p>
            Det er vigtigt at bemærke, at resultaterne afspejler vores specifikke testbetingelser.
            Spillemaskiner med høj volatilitet kan give dramatisk forskellige resultater over korte
            perioder. Vores data bør bruges som ét datapunkt i en bredere analyse — ikke som garanti
            for fremtidige resultater.
          </p>
        </section>

        {/* ── Internal links ── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-foreground">Relaterede Sider</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <InternalLink to="/bonus-hunt" label="Bonus Hunt Live" icon={<Target className="h-4 w-4" />} />
            <InternalLink to="/bonus-hunt/arkiv" label="Bonus Hunt Arkiv" icon={<BarChart3 className="h-4 w-4" />} />
            <InternalLink to="/slot-database" label="Slot Database" icon={<Database className="h-4 w-4" />} />
            <InternalLink to="/spiludviklere/pragmatic-play" label="Pragmatic Play Guide" icon={<Gamepad2 className="h-4 w-4" />} />
            <InternalLink to="/spiludviklere/netent" label="NetEnt Guide" icon={<Gamepad2 className="h-4 w-4" />} />
            <InternalLink to="/spiludviklere/hacksaw-gaming" label="Hacksaw Gaming Guide" icon={<Gamepad2 className="h-4 w-4" />} />
          </div>
        </section>

        {/* ── FAQ ── */}
        <FAQSection faqs={faqItems} />

        {/* ── Author ── */}
        <AuthorBio author="kevin" />

        {/* noscript fallback */}
        <noscript>
          <div>
            <h2>Bonus Hunt Statistik – Casinoaftaler.dk</h2>
            <p>Denne side indeholder aggregeret data fra over 200 dokumenterede bonus hunts med detaljerede resultater, provider-rankings og top 10 bedst performende spillemaskiner.</p>
            <ul>
              <li><a href="/bonus-hunt">Bonus Hunt Live</a></li>
              <li><a href="/bonus-hunt/arkiv">Bonus Hunt Arkiv</a></li>
              <li><a href="/slot-database">Slot Database</a></li>
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

function InternalLink({ to, label, icon }: { to: string; label: string; icon: React.ReactNode }) {
  return (
    <Link to={to} className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors text-foreground text-sm font-medium group">
      <span className="text-primary">{icon}</span>
      {label}
      <ArrowRight className="h-3 w-3 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
    </Link>
  );
}
