import { useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProviderCatalogSlots } from "@/components/ProviderCatalogSlots";
import { useProviderSlots, useLatestCatalogUpdate } from "@/hooks/useProviderSlots";
import { PROVIDER_HUB_CONTENT, PROVIDER_HUB_SLUGS } from "@/lib/providerHubContent";
import { PROVIDER_DISPLAY_NAMES } from "@/lib/slotProviderLinks";
import { buildArticleSchema, SITE_URL, JONAS_SAME_AS } from "@/lib/seo";
import { buildSlotCatalogSchema } from "@/lib/slotCatalogSchema";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { slugifySlotName } from "@/lib/slugify";
import {
  Gamepad2,
  BarChart3,
  TrendingUp,
  Award,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export default function ProviderSlotsHub() {
  const { providerSlug } = useParams<{ providerSlug: string }>();
  const validSlug = providerSlug && PROVIDER_HUB_SLUGS.includes(providerSlug) ? providerSlug : null;
  const content = validSlug ? PROVIDER_HUB_CONTENT[validSlug] : null;
  const { data: slots } = useProviderSlots(validSlug || "");
  const { data: freshness } = useLatestCatalogUpdate();

  // Compute dynamic stats
  const stats = useMemo(() => {
    if (!slots || slots.length === 0) return null;
    const rtpSlots = slots.filter((s) => s.rtp && s.rtp > 0);
    const avgRtp =
      rtpSlots.length > 0
        ? rtpSlots.reduce((sum, s) => sum + (s.rtp || 0), 0) / rtpSlots.length
        : 0;
    const highVolCount = slots.filter(
      (s) => s.volatility && s.volatility.toLowerCase().includes("high")
    ).length;
    const topSlots = [...slots]
      .sort((a, b) => (b.bonus_count || 0) - (a.bonus_count || 0))
      .slice(0, 5);
    const highestX = Math.max(...slots.map((s) => s.highest_x || 0));
    const totalBonusHunts = slots.reduce((sum, s) => sum + (s.bonus_count || 0), 0);

    return {
      totalSlots: slots.length,
      avgRtp: avgRtp.toFixed(2),
      highVolCount,
      topSlots,
      highestX,
      totalBonusHunts,
    };
  }, [slots]);

  if (!validSlug || !content) {
    return <Navigate to="/casinospil/spillemaskiner" replace />;
  }

  const pageUrl = `${SITE_URL}/spillemaskiner/${validSlug}`;

  // Build JSON-LD
  const articleSchema = buildArticleSchema({
    headline: content.seoTitle,
    description: content.metaDescription,
    url: pageUrl,
    datePublished: content.datePublished,
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
    authorSameAs: JONAS_SAME_AS,
    about: [
      { "@type": "Organization", name: content.displayName },
      { "@type": "Thing", name: "Spillemaskiner" },
    ],
  });

  const catalogSchema =
    slots && slots.length > 0
      ? buildSlotCatalogSchema(
          slots.map((s) => ({
            slot_name: s.slot_name,
            provider: PROVIDER_DISPLAY_NAMES[validSlug] || validSlug,
            rtp: s.rtp,
            highest_x: s.highest_x,
            bonus_count: s.bonus_count,
          })),
          pageUrl
        )
      : null;

  const jsonLd = [
    articleSchema,
    ...(catalogSchema ? [catalogSchema as Record<string, unknown>] : []),
  ];

  // Freshness date
  const dateModified = freshness?.lastUpdated
    ? new Date(freshness.lastUpdated).toISOString().split("T")[0]
    : content.datePublished;

  return (
    <>
      <SEO
        title={content.seoTitle}
        description={content.metaDescription}
        type="article"
        datePublished={content.datePublished}
        dateModified={dateModified}
        jsonLd={jsonLd}
        breadcrumbLabel={`${content.displayName} Slots`}
      />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Breadcrumbs />
        <AuthorMetaBar author="jonas" />

        {/* Hero */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Gamepad2 className="h-9 w-9 text-primary flex-shrink-0" />
            {content.displayName} Slots
          </h1>
          <p className="text-lg text-muted-foreground">
            Komplet oversigt over alle {content.displayName} spillemaskiner med ægte statistik fra vores bonus hunts.
          </p>
        </header>

        {/* Unique intro text */}
        <section className="prose prose-lg max-w-none mb-8">
          <div dangerouslySetInnerHTML={{ __html: content.introHtml }} />
        </section>

        {/* Dynamic stats cards */}
        {stats && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              {content.displayName} i tal
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-primary">{stats.totalSlots}</p>
                  <p className="text-sm text-muted-foreground">Spillemaskiner</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-primary">{stats.avgRtp}%</p>
                  <p className="text-sm text-muted-foreground">Gns. RTP</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-primary">{stats.highVolCount}</p>
                  <p className="text-sm text-muted-foreground">High Vol. Slots</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {stats.highestX > 0 ? `${stats.highestX.toFixed(1)}x` : "–"}
                  </p>
                  <p className="text-sm text-muted-foreground">Højeste X</p>
                </CardContent>
              </Card>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Baseret på {stats.totalBonusHunts.toLocaleString("da-DK")} bonus hunt-optrædener i alt.
            </p>
          </section>
        )}

        {/* Top 5 popular slots */}
        {stats && stats.topSlots.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Top 5 mest testede {content.displayName} slots
            </h2>
            <div className="space-y-3">
              {stats.topSlots.map((slot, i) => (
                <Link
                  key={slot.slot_name}
                  to={`/slot-katalog/${slugifySlotName(slot.slot_name)}`}
                  className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                >
                  <span className="text-2xl font-bold text-primary w-8 text-center">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{slot.slot_name}</p>
                    <div className="flex gap-3 text-sm text-muted-foreground">
                      {slot.rtp && <span>RTP: {slot.rtp}%</span>}
                      {slot.volatility && <span>{slot.volatility}</span>}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Badge variant="secondary">{slot.bonus_count} hunts</Badge>
                    {slot.highest_x && slot.highest_x > 0 && (
                      <p className="text-sm font-semibold mt-1">
                        <TrendingUp className="h-3 w-3 inline mr-1" />
                        {slot.highest_x.toFixed(1)}x
                      </p>
                    )}
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}

        <Separator className="my-8" />

        {/* Full catalog table (reuses existing component) */}
        <ProviderCatalogSlots providerSlug={validSlug} />

        <Separator className="my-8" />

        {/* Cross-link to developer guide */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Læs mere om {content.displayName}
          </h2>
          <Link
            to={`/spiludviklere/${providerSlug}`}
            className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 transition-all hover:border-primary/50 hover:shadow-sm"
          >
            <Gamepad2 className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold">{content.displayName} – Dybdegående Udvikler-guide</p>
              <p className="text-sm text-muted-foreground">
                Historik, teknologi, licenser og ekspertanalyse af {content.displayName}.
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        </section>
      </main>
    </>
  );
}
