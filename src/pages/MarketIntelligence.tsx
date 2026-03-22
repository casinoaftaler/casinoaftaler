import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileCheck,
  Landmark,
  Loader2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import GuideHeroImage from "@/components/GuideHeroImage";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import marketIntelligenceHero from "@/assets/heroes/markedsindsigt-hero.jpg";
import { useMarketIntelligence } from "@/hooks/useMarketIntelligence";
import { useCasinos, type Casino } from "@/hooks/useCasinos";
import { formatTimestampDanish, usePageLastmod } from "@/hooks/usePageLastmod";
import {
  buildMarketIntelligenceSchema,
  getMarketIntelligenceCategoryLabel,
  getMarketIntelligenceImpactLabel,
  getMarketIntelligenceImpactVariant,
} from "@/lib/marketIntelligence";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import { getRouteLastmod } from "@/lib/seoRoutes";

const linkClass = "text-primary underline underline-offset-4 hover:text-primary/80";
const heroAlt = "Markedsindsigt for danske casinoer med verificerede licenssignaler, compliance-data og bonusanalyse";

const faqs = [
  {
    question: "Hvad er Market Intelligence-laget på Casinoaftaler.dk?",
    answer:
      "Det er vores offentlige overblik over verificerede markedsændringer på danske online casinoer. Her samler vi licensstatus, bonuskontrol og compliance-signaler i et format, der er lettere at læse end rå audit-logs.",
  },
  {
    question: "Hvor kommer dataene fra?",
    answer:
      "Dataene kommer fra vores interne trust-motor, som kombinerer officielle licenskilder, operatørernes egne bonusvilkår og redaktionelle verificeringer. Hver event har en kildehenvisning, når det er relevant.",
  },
  {
    question: "Hvor ofte bliver siden opdateret?",
    answer:
      "Siden opdateres, når nye verificerede events publiceres, og når compliance-data bliver opdateret i vores backend. Derfor afspejler siden reelle markedssignaler frem for kosmetiske tekstændringer.",
  },
  {
    question: "Er Market Intelligence det samme som en casinoanmeldelse?",
    answer:
      "Nej. En casinoanmeldelse er en dybdegående vurdering af ét brand. Market Intelligence er et tværgående markedslag, hvor du kan se mønstre, ændringer og verificerede signaler på tværs af flere operatører.",
  },
];

const faqJsonLd = buildFaqSchema(faqs);

const monitoringPillars = [
  {
    title: "Licensspor",
    description: "Vi matcher markedssignaler op mod officielle licensreferencer og regulatoriske kontrolpunkter.",
    to: "/casino-licenser",
    linkLabel: "Se licensguiden",
  },
  {
    title: "Bonusspor",
    description: "Bonuslofter, omsætningskrav og kampagnevilkår holdes op mod de sider, spilleren faktisk møder.",
    to: "/casino-bonus",
    linkLabel: "Se bonusguiden",
  },
  {
    title: "Spillerspor",
    description: "Markedsdata omsættes til praktiske valg via money-pages om velkomstbonusser, free spins og vilkår.",
    to: "/velkomstbonus",
    linkLabel: "Se velkomstbonus",
  },
] as const;

const workflowLinks = [
  { to: "/casino-anmeldelser", label: "Casinoanmeldelser" },
  { to: "/velkomstbonus", label: "Velkomstbonus" },
  { to: "/omsaetningskrav", label: "Omsætningskrav" },
  { to: "/free-spins-i-dag", label: "Free Spins i Dag" },
] as const;

export default function MarketIntelligence() {
  const { data, isLoading } = useMarketIntelligence(12);
  const { data: casinos } = useCasinos();
  const { data: pageMeta } = usePageLastmod("/markedsindsigt");

  const dateModified = pageMeta?.updated_at ?? getRouteLastmod("/markedsindsigt");

  const articleSchema = buildArticleSchema({
    headline: "Markedsindsigt 2026 – Offentligt overblik over danske casinoer",
    description:
      "Offentligt overblik over verificerede licens-, bonus- og compliance-opdateringer på det danske casinomarked.",
    url: `${SITE_URL}/markedsindsigt`,
    datePublished: "2026-03-17",
    dateModified,
    articleType: "AnalysisNewsArticle",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  const collectionSchema = buildMarketIntelligenceSchema(
    data?.events ?? [],
    data?.snapshot?.totalTracked ?? 0,
  );

  const casinoBySlug = useMemo(
    () => new Map((casinos ?? []).map((casino) => [casino.slug, casino])),
    [casinos],
  );

  const trackedCasinoLogos = useMemo(() => {
    const seen = new Set<string>();

    return (data?.operators ?? [])
      .map((operator) => casinoBySlug.get(operator.casino_slug))
      .filter((casino): casino is Casino => Boolean(casino?.logo_url))
      .filter((casino) => {
        if (seen.has(casino.slug)) return false;
        seen.add(casino.slug);
        return true;
      })
      .slice(0, 8);
  }, [casinoBySlug, data?.operators]);

  const getCasinoBySlug = (slug: string | null) => (slug ? casinoBySlug.get(slug) ?? null : null);

  const featuredEvents = data?.featuredEvents?.length ? data.featuredEvents : data?.events?.slice(0, 3) ?? [];
  const hasFeaturedEvents = featuredEvents.length > 0;
  const hasEvents = (data?.events?.length ?? 0) > 0;

  return (
    <>
      <SEO
        title="Markedsindsigt 2026 – Casinooverblik"
        description="Verificerede licens-, bonus- og compliance-opdateringer på det danske casinomarked. Se de seneste ændringer og hvad de betyder for dig."
        type="article"
        datePublished="2026-03-17"
        dateModified={dateModified}
        jsonLd={[articleSchema, faqJsonLd, collectionSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4 gap-2 border border-primary-foreground/15 bg-background/15 text-primary-foreground backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Verificeret markedsindsigt · 2026
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Markedsindsigt for danske casinoer
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-primary-foreground/85">
              Følg dokumenterede licenssignaler, bonusrammer og konkrete markedsskift på tværs af danske operatører — samlet i et offentligt overblik, der er skabt til både spillere og research.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-primary-foreground/85">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-background/10 px-4 py-2 backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4 text-primary-foreground" />
                Verificerede markedssignaler
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-background/10 px-4 py-2 backdrop-blur-sm">
                <TrendingUp className="h-4 w-4 text-primary-foreground" />
                Live snapshot af markedet
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-background/10 px-4 py-2 backdrop-blur-sm">
                <Landmark className="h-4 w-4 text-primary-foreground" />
                Kilder fra licens- og bonussider
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="14 min" />
        <GuideHeroImage src={marketIntelligenceHero} alt={heroAlt} />

        {isLoading ? (
          <Card className="border-border bg-card/80">
            <CardContent className="flex items-center gap-2 py-6 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Indlæser Market Intelligence-data…
            </CardContent>
          </Card>
        ) : (
          <>
            <section className="mb-12 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <Card className="overflow-hidden border-border bg-card/80">
                <div className="border-b border-border bg-muted/30 px-6 py-4">
                  <div className="flex items-center gap-2 text-base font-semibold text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Hvorfor denne side findes
                  </div>
                </div>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                    <p>
                      Markedsindsigt samler de vigtigste verificerede signaler fra danske casinoer i ét offentligt overblik, så spillere ikke selv skal læse rå vilkårssider, licensreferencer og spredte opdateringer.
                    </p>
                    <p>
                      Formålet er at vise, hvad der faktisk har betydning lige nu: licensstatus, bonusrammer og dokumenterede ændringer, der kan påvirke din vurdering af et casino, en <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> eller et konkret <Link to="/free-spins-i-dag" className={linkClass}>free spins-tilbud</Link>.
                    </p>
                    <p>
                      Det gør siden til et naturligt bindeled mellem <Link to="/casino-anmeldelser" className={linkClass}>anmeldelser</Link>, <Link to="/casino-bonus" className={linkClass}>bonusguides</Link>, <Link to="/omsaetningskrav" className={linkClass}>forklaringer på omsætningskrav</Link> og <Link to="/casino-licenser" className={linkClass}>licensguiden</Link>.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {monitoringPillars.map((pillar) => (
                      <div key={pillar.title} className="rounded-xl border border-border bg-background/60 p-4">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                          {pillar.title}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-foreground">{pillar.description}</p>
                        <Link to={pillar.to} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary underline underline-offset-4 hover:text-primary/80">
                          {pillar.linkLabel}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    ))}
                  </div>

                  {trackedCasinoLogos.length > 0 ? (
                    <div className="rounded-xl border border-border bg-background/60 p-4">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Aktører i overvågningen
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            De her brands er blandt de operatører, der aktuelt indgår i vores offentlige markedsoverblik.
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          {trackedCasinoLogos.map((casino) => (
                            <div
                              key={casino.slug}
                              className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 shadow-sm"
                            >
                              <img
                                src={casino.logo_url ?? undefined}
                                alt={`${casino.name} logo`}
                                width={32}
                                height={32}
                                className="h-8 w-8 object-contain"
                                loading="lazy"
                              />
                              <span className="text-xs font-medium text-foreground">{casino.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-border bg-card/80">
                <div className="border-b border-border bg-muted/30 px-6 py-4">
                  <div className="flex items-center gap-2 text-base font-semibold text-foreground">
                    <FileCheck className="h-5 w-5 text-primary" />
                    Sådan bruger du siden
                  </div>
                </div>
                <CardContent className="space-y-4 pt-6">
                  {[
                    {
                      step: "01",
                      title: "Læs snapshot først",
                      description:
                        "Start med nøgletallene for at se markedets temperatur, hvor mange brands der spores, og hvornår markedet sidst er kontrolleret.",
                    },
                    {
                      step: "02",
                      title: "Fortolk de fremhævede signaler",
                      description:
                        "Gå derefter til de vigtigste markedssignaler for at se, hvilke brands og ændringer der er mest relevante netop nu.",
                    },
                    {
                      step: "03",
                      title: "Klik videre til handling",
                      description:
                        "Afslut i operatøroversigten og brug anmeldelser, bonusguides og vilkårssider til at validere signalerne dybere.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 rounded-xl border border-border bg-background/60 p-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border bg-card text-sm font-semibold text-foreground">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}

                  <div className="rounded-xl border border-border bg-background/60 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Brug siden sammen med
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {workflowLinks.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Card className="border-border bg-card/80">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background/60 text-primary">
                      <Activity className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Trackede operatører</p>
                      <p className="mt-2 text-3xl font-bold text-foreground">{data?.snapshot?.totalTracked ?? 0}</p>
                      <p className="mt-2 text-sm text-muted-foreground">Antal brands vi aktuelt overvåger i det offentlige markedsoverblik.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card/80">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background/60 text-primary">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Gyldige licenser</p>
                      <p className="mt-2 text-3xl font-bold text-foreground">{data?.snapshot?.validLicenses ?? 0}</p>
                      <p className="mt-2 text-sm text-muted-foreground">Operatører, der står som gyldige i den seneste verificering.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card/80">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background/60 text-primary">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Bonusvilkår verificeret</p>
                      <p className="mt-2 text-3xl font-bold text-foreground">{data?.snapshot?.bonusCompliantCount ?? 0}</p>
                      <p className="mt-2 text-sm text-muted-foreground">Brands hvor bonusrammerne matcher de nuværende danske krav.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card/80">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background/60 text-primary">
                      <FileCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Seneste markedstjek</p>
                      <p className="mt-2 text-lg font-bold text-foreground">
                        {data?.snapshot?.lastChecked ? formatTimestampDanish(data.snapshot.lastChecked) : "Ikke registreret"}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">Seneste kendte kontroltidspunkt for hele markedsoverblikket.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-12 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold">Vigtigste markedssignaler lige nu</h2>
                </div>
                <div className="space-y-4">
                  {hasFeaturedEvents ? (
                    featuredEvents.map((event) => {
                      const eventCasino = getCasinoBySlug(event.casino_slug);

                      return (
                        <Card key={event.id} id={`event-${event.id}`} className="overflow-hidden border-border bg-card/80 transition-colors hover:border-primary/30">
                          <CardContent className="p-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-border bg-background/60 p-3 shadow-sm">
                                {eventCasino?.logo_url ? (
                                  <img
                                    src={eventCasino.logo_url}
                                    alt={`${eventCasino.name} logo`}
                                    width={64}
                                    height={64}
                                    className="h-full w-full object-contain"
                                    loading="lazy"
                                  />
                                ) : (
                                  <Landmark className="h-7 w-7 text-primary" />
                                )}
                              </div>

                              <div className="min-w-0 flex-1 space-y-3">
                                <div className="flex flex-wrap items-center gap-2">
                                  <Badge variant={getMarketIntelligenceImpactVariant(event.impact_level)}>
                                    {getMarketIntelligenceImpactLabel(event.impact_level)}
                                  </Badge>
                                  <Badge variant="outline">{getMarketIntelligenceCategoryLabel(event.category)}</Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {formatTimestampDanish(event.published_at)}
                                  </span>
                                </div>

                                {eventCasino ? (
                                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                    {eventCasino.name}
                                  </p>
                                ) : null}

                                <div>
                                  <h3 className="text-xl font-semibold text-foreground">{event.headline}</h3>
                                  <p className="mt-3 leading-relaxed text-muted-foreground">{event.summary}</p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 text-sm">
                                  {event.casino_slug ? (
                                    <Link
                                      to={`/casino-anmeldelser/${event.casino_slug}`}
                                      className="inline-flex items-center gap-2 text-primary underline underline-offset-4 hover:text-primary/80"
                                    >
                                      Gå til anmeldelse
                                      <ArrowRight className="h-4 w-4" />
                                    </Link>
                                  ) : null}
                                  {event.source_url ? (
                                    <a
                                      href={event.source_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-primary underline underline-offset-4 hover:text-primary/80"
                                    >
                                      {event.source_label ?? "Kilde"}
                                      <ExternalLink className="h-4 w-4" />
                                    </a>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  ) : (
                    <Card className="border-dashed border-border bg-card/80">
                      <CardContent className="py-6 text-sm leading-relaxed text-muted-foreground">
                        Der er endnu ingen fremhævede offentlige signaler at vise. Snapshot og operatøroversigten er stadig aktive, så du kan følge markedet, mens nye verificerede events publiceres.
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Card className="border-border bg-card/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Hvad der bliver verificeret
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>Licenssignaler kontrolleres op mod officielle myndighedskilder og registrerede licensreferencer.</p>
                    <p>Bonussignaler kobles til operatørernes egne vilkårssider, så tal og krav kan dokumenteres.</p>
                    <p>Kun ændringer med reel offentlig værdi publiceres som events på siden.</p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <ArrowRight className="h-5 w-5 text-primary" />
                      Hvor går du videre herfra?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p><Link to="/casino-anmeldelser" className={linkClass}>Gå til casinoanmeldelser</Link> for at se den fulde vurdering af de brands, der optræder i signalerne.</p>
                    <p><Link to="/casino-licenser" className={linkClass}>Læs licensguiden</Link> hvis du vil forstå de regulatoriske signaler bag markedsoverblikket.</p>
                    <p><Link to="/casino-bonus" className={linkClass}>Se bonusguiden</Link> for at forstå bonusstrukturer, omsætning og de vilkår, der ligger bag vores kontrolpunkter.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="my-10" />

            <section className="mb-12">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Seneste verificerede markedshændelser</h2>
              </div>
              <div className="space-y-4">
                {hasEvents ? (
                  data?.events.map((event) => {
                    const eventCasino = getCasinoBySlug(event.casino_slug);

                    return (
                      <Card
                        key={event.id}
                        className="overflow-hidden border-border bg-card/80 transition-colors hover:border-primary/30"
                      >
                        <CardContent className="p-5">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-border bg-background/60 p-3 shadow-sm">
                              {eventCasino?.logo_url ? (
                                <img
                                  src={eventCasino.logo_url}
                                  alt={`${eventCasino.name} logo`}
                                  width={56}
                                  height={56}
                                  className="h-full w-full object-contain"
                                  loading="lazy"
                                />
                              ) : (
                                <Landmark className="h-6 w-6 text-primary" />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant={getMarketIntelligenceImpactVariant(event.impact_level)}>
                                  {getMarketIntelligenceImpactLabel(event.impact_level)}
                                </Badge>
                                <Badge variant="outline">{getMarketIntelligenceCategoryLabel(event.category)}</Badge>
                                <span>{formatTimestampDanish(event.published_at)}</span>
                              </div>

                              {eventCasino ? (
                                <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                  {eventCasino.name}
                                </p>
                              ) : null}

                              <h3 className="text-base font-semibold text-foreground">{event.headline}</h3>
                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{event.summary}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <Card className="border-dashed border-border bg-card/70">
                    <CardContent className="py-6 text-sm leading-relaxed text-muted-foreground">
                      Der er endnu ikke publiceret nok offentlige events til en fuld liste. Brug snapshot-sektionen og operatøroversigten nedenfor som det aktuelle referencepunkt, indtil næste verificerede opdatering går live.
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>

            <Separator className="my-10" />

            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold">Operatøroversigt med compliance-signaler</h2>
              <p className="mb-6 max-w-3xl leading-relaxed text-muted-foreground">
                Tabellen viser de stærkeste aktuelle signaler i markedet. Brug den som et hurtigt overblik, og klik derefter videre til anmeldelserne for den fulde kontekst omkring hvert casino.
              </p>

              <div className="overflow-x-auto rounded-xl border border-border bg-card/70">
                <table className="min-w-full text-sm">
                  <thead className="bg-muted/30 text-left text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Operatør</th>
                      <th className="px-4 py-3 font-medium">Licens</th>
                      <th className="px-4 py-3 font-medium">Bonus</th>
                      <th className="px-4 py-3 font-medium">Score</th>
                      <th className="px-4 py-3 font-medium">Sidst kontrolleret</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.operators.map((operator) => {
                      const casino = getCasinoBySlug(operator.casino_slug);

                      return (
                        <tr key={operator.id} className="border-t border-border">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-background/60 p-2">
                                {casino?.logo_url ? (
                                  <img
                                    src={casino.logo_url}
                                    alt={`${operator.casino_name} logo`}
                                    width={40}
                                    height={40}
                                    className="h-full w-full object-contain"
                                    loading="lazy"
                                  />
                                ) : (
                                  <Landmark className="h-4 w-4 text-primary" />
                                )}
                              </div>
                              <div>
                                <Link
                                  to={`/casino-anmeldelser/${operator.casino_slug}`}
                                  className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                                >
                                  {operator.casino_name}
                                </Link>
                                <p className="text-xs text-muted-foreground">Fuld vurdering og brand-kontekst</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={operator.license_status === "valid" ? "default" : "destructive"}>
                              {operator.license_status === "valid" ? "Gyldig" : operator.license_status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={operator.bonus_compliant ? "secondary" : "outline"}>
                              {operator.bonus_compliant ? `${operator.bonus_max_amount}% · ${operator.bonus_wager_requirement}x` : "Kræver review"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 font-medium text-foreground">{operator.compliance_score}/100</td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {formatTimestampDanish(operator.last_checked)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        <LatestNewsByCategory pagePath="/markedsindsigt" />
        <RelatedGuides currentPath="/markedsindsigt" />
        <FAQSection title="Ofte stillede spørgsmål om Market Intelligence" faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
}
