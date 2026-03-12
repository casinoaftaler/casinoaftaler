import { useMemo, type ReactNode } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { ProviderCatalogSlots } from "@/components/ProviderCatalogSlots";
import { useProviderSlots, useLatestCatalogUpdate } from "@/hooks/useProviderSlots";
import { PROVIDER_HUB_CONTENT, PROVIDER_HUB_SLUGS } from "@/lib/providerHubContent";
import { PROVIDER_DISPLAY_NAMES } from "@/lib/slotProviderLinks";
import { buildArticleSchema, buildFaqSchema, SITE_URL, JONAS_SAME_AS } from "@/lib/seo";
import { buildSlotCatalogSchema } from "@/lib/slotCatalogSchema";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useAntiFootprint } from "@/hooks/useAntiFootprint";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { slugifySlotName } from "@/lib/slugify";
import { ProviderMoneyLinks } from "@/components/ProviderMoneyLinks";
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
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;
  const { shuffle } = useAntiFootprint(validSlug ?? undefined);

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
    const highestX = slots.reduce((max, s) => Math.max(max, s.highest_x || 0), 0);
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

  const faqSchema = content.faqs.length > 0 ? buildFaqSchema(content.faqs) : null;

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
    ...(faqSchema ? [faqSchema as Record<string, unknown>] : []),
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
              <Gamepad2 className="mr-1.5 h-3.5 w-3.5" />
              Spillemaskiner
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              {content.displayName} Slots – Statistik & Alle Spillemaskiner
            </h1>
            <p className="text-lg text-white/80">
              Komplet oversigt over alle {content.displayName} spillemaskiner med ægte statistik fra vores bonus hunts.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" />

        {/* Sections rendered in shuffled order per provider slug */}
        {(() => {
          const sectionMap: Record<string, ReactNode> = {
            intro: (
              <section className="mb-12" key="intro">
                <h2 className="mb-4 text-3xl font-bold">Om {content.displayName} Spillemaskiner</h2>
                <div
                  className="text-muted-foreground leading-relaxed space-y-4 [&>p]:leading-relaxed [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary/80"
                  dangerouslySetInnerHTML={{ __html: content.introHtml }}
                />
              </section>
            ),
            stats: stats ? (
              <section className="mb-12" key="stats">
                <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
                  <BarChart3 className="h-7 w-7 text-primary" />
                  {content.displayName} i tal
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card><CardContent className="p-4 text-center"><p className="text-3xl font-bold text-primary">{stats.totalSlots}</p><p className="text-sm text-muted-foreground">Spillemaskiner</p></CardContent></Card>
                  <Card><CardContent className="p-4 text-center"><p className="text-3xl font-bold text-primary">{stats.avgRtp}%</p><p className="text-sm text-muted-foreground">Gns. RTP</p></CardContent></Card>
                  <Card><CardContent className="p-4 text-center"><p className="text-3xl font-bold text-primary">{stats.highVolCount}</p><p className="text-sm text-muted-foreground">High Vol. Slots</p></CardContent></Card>
                  <Card><CardContent className="p-4 text-center"><p className="text-3xl font-bold text-primary">{stats.highestX > 0 ? `${stats.highestX.toFixed(1)}x` : "–"}</p><p className="text-sm text-muted-foreground">Højeste X</p></CardContent></Card>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Baseret på {stats.totalBonusHunts.toLocaleString("da-DK")} bonus hunt-optrædener i alt.
                </p>
              </section>
            ) : null,
            top5: stats && stats.topSlots.length > 0 ? (
              <section className="mb-12" key="top5">
                <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
                  <Award className="h-7 w-7 text-primary" />
                  Top 5 mest testede {content.displayName} slots
                </h2>
                <div className="space-y-3">
                  {stats.topSlots.map((slot, i) => (
                    <Link
                      key={slot.slot_name}
                      to={`/slot-katalog/${slugifySlotName(slot.slot_name)}`}
                      className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                    >
                      <span className="text-2xl font-bold text-primary w-8 text-center">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{slot.slot_name}</p>
                        <div className="flex gap-3 text-sm text-muted-foreground">
                          {slot.rtp && <span>RTP: {slot.rtp}%</span>}
                          {slot.volatility && <span>{slot.volatility}</span>}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">{slot.bonus_count} hunts</span>
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
            ) : null,
            catalog: (
              <section className="mb-12" key="catalog">
                <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
                  <Gamepad2 className="h-7 w-7 text-primary" />
                  Alle {content.displayName} Spillemaskiner
                </h2>
                <ProviderCatalogSlots providerSlug={validSlug} />
              </section>
            ),
            moneylinks: (
              <div key="moneylinks">
                <ProviderMoneyLinks
                  providerName={content.displayName}
                  providerSlug={validSlug}
                  slotCount={stats?.totalSlots}
                />
              </div>
            ),
            faq: content.faqs.length > 0 ? (
              <div key="faq">
                <FAQSection
                  title={`Ofte stillede spørgsmål om ${content.displayName} slots`}
                  faqs={content.faqs}
                />
              </div>
            ) : null,
            crosslinks: (
              <section className="mb-12" key="crosslinks">
                <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
                  <BookOpen className="h-7 w-7 text-primary" />
                  Mere om {content.displayName}
                </h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  Udforsk vores dybdegående guide om {content.displayName} med historik, teknologi, licenser og ekspertanalyse.
                </p>
                <div className="space-y-3">
                  <Link
                    to={`/spiludviklere/${validSlug}`}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
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
                  <Link
                    to="/slot-database"
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
                  >
                    <BarChart3 className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold">Slot Database – Alle Spillemaskiner</p>
                      <p className="text-sm text-muted-foreground">
                        Udforsk vores komplette database med {stats?.totalSlots ? `${stats.totalSlots}+` : "1400+"} spillemaskiner og ægte statistik.
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </div>
              </section>
            ),
          };

          // Shuffle section order deterministically per provider slug
          const sectionKeys = ["intro", "stats", "top5", "catalog", "moneylinks", "faq", "crosslinks"];
          const shuffled = seededShuffle(sectionKeys, hashSlug(validSlug));

          return shuffled.map((key) => {
            const node = sectionMap[key];
            if (!node) return null;
            return (
              <div key={key}>
                {node}
                <Separator className="my-10" />
              </div>
            );
          });
        })()}

        {/* Author bio - always last */}
        <AuthorBio author="jonas" showCommunity={false} />
      </div>
    </>
  );
}
