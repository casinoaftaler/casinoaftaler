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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import marketIntelligenceHero from "@/assets/market-intelligence-hero.png";
import { useMarketIntelligence } from "@/hooks/useMarketIntelligence";
import { formatTimestampDanish, usePageLastmod } from "@/hooks/usePageLastmod";
import {
  buildMarketIntelligenceSchema,
  getMarketIntelligenceCategoryLabel,
  getMarketIntelligenceImpactLabel,
  getMarketIntelligenceImpactVariant,
} from "@/lib/marketIntelligence";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";

const linkClass = "text-primary underline underline-offset-4 hover:text-primary/80";
const heroAlt = "Markedsindsigt for danske casinoer med live datafeeds, compliance-signaler og overvågede operatører";

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

const internalLinks = [
  {
    to: "/casino-anmeldelser",
    title: "Casino Anmeldelser",
    text: "Se de dybdegående anmeldelser bag de operatører, der optræder i markedsoverblikket.",
  },
  {
    to: "/casino-bonus",
    title: "Casino Bonus",
    text: "Forstå bonusstrukturerne og de matematiske rammer bag de verificerede bonussignaler.",
  },
  {
    to: "/casinoer",
    title: "Casinoer",
    text: "Brug vores hovedhub til at sammenligne danske casinoer på tværs af betaling, RTP og sikkerhed.",
  },
  {
    to: "/casino-licenser",
    title: "Casino Licenser",
    text: "Læs den komplette guide til dansk licens, tilsyn og hvorfor licensstatus er afgørende.",
  },
];

export default function MarketIntelligence() {
  const { data, isLoading } = useMarketIntelligence(12);
  const { data: pageMeta } = usePageLastmod("/markedsindsigt");

  const dateModified = pageMeta?.updated_at ?? data?.lastUpdated ?? "2026-03-17T00:00:00+01:00";

  const articleSchema = buildArticleSchema({
    headline: "Markedsindsigt 2026 – Offentligt overblik over danske casinoer",
    description:
      "Offentligt overblik over verificerede licens-, bonus- og compliance-opdateringer på det danske casinomarked.",
    url: `${SITE_URL}/markedsindsigt`,
    datePublished: "2026-03-17",
    dateModified,
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  const collectionSchema = buildMarketIntelligenceSchema(
    data?.events ?? [],
    data?.snapshot?.totalTracked ?? 0,
  );

  const featuredEvents = data?.featuredEvents?.length ? data.featuredEvents : data?.events?.slice(0, 3) ?? [];
  const hasFeaturedEvents = featuredEvents.length > 0;
  const hasEvents = (data?.events?.length ?? 0) > 0;

  return (
    <>
      <SEO
        title="Markedsindsigt 2026 – Casinooverblik"
        description="Offentligt overblik over verificerede licens-, bonus- og compliance-opdateringer på det danske casinomarked."
        type="article"
        datePublished="2026-03-17"
        dateModified={dateModified}
        jsonLd={[articleSchema, faqJsonLd, collectionSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-primary-foreground md:py-20"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(var(--primary) / 0.94), hsl(var(--accent) / 0.76)), url(${marketIntelligenceHero})`,
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

        {isLoading ? (
          <Card className="border-border bg-card/80">
            <CardContent className="flex items-center gap-2 py-6 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Indlæser Market Intelligence-data…
            </CardContent>
          </Card>
        ) : (
          <>
            <section className="mb-12">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Card className="border-border bg-card/80">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Trackede operatører</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-foreground">{data?.snapshot?.totalTracked ?? 0}</p>
                    <p className="mt-2 text-sm text-muted-foreground">Antal brands vi aktuelt overvåger i trust-motoren.</p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card/80">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Gyldige licenser</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-foreground">{data?.snapshot?.validLicenses ?? 0}</p>
                    <p className="mt-2 text-sm text-muted-foreground">Operatører, der aktuelt står som gyldige i vores seneste verificering.</p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card/80">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Bonus kontrolleret</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-foreground">{data?.snapshot?.bonusCompliantCount ?? 0}</p>
                    <p className="mt-2 text-sm text-muted-foreground">Brands med bonusvilkår, der matcher de nuværende danske rammer.</p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card/80">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Seneste markedstjek</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-bold text-foreground">
                      {data?.snapshot?.lastChecked ? formatTimestampDanish(data.snapshot.lastChecked) : "Ikke registreret"}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">Seneste kendte kontroltidspunkt i det samlede markedsoverblik.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-12 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold">Fremhævede markedssignaler</h2>
                </div>
                <div className="space-y-4">
                  {featuredEvents.map((event) => (
                    <Card key={event.id} id={`event-${event.id}`} className="border-border bg-card/80">
                      <CardHeader className="pb-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={getMarketIntelligenceImpactVariant(event.impact_level)}>
                            {getMarketIntelligenceImpactLabel(event.impact_level)}
                          </Badge>
                          <Badge variant="outline">{getMarketIntelligenceCategoryLabel(event.category)}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestampDanish(event.published_at)}
                          </span>
                        </div>
                        <CardTitle className="text-xl">{event.headline}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="leading-relaxed text-muted-foreground">{event.summary}</p>
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Card className="border-border bg-card/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Hvad denne side gør
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      Market Intelligence gør tekniske trust-signaler menneskeligt læsbare og offentligt linkbare.
                    </p>
                    <p>
                      I stedet for rå ændringslogs får du et kurateret overblik over, hvad der faktisk betyder noget for spillere og marked.
                    </p>
                    <p>
                      Det giver et stærkere E-E-A-T-lag omkring både <Link to="/casino-anmeldelser" className={linkClass}>anmeldelser</Link>, <Link to="/casino-bonus" className={linkClass}>bonusguides</Link> og <Link to="/casinoer" className={linkClass}>hub-sider</Link>.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileCheck className="h-5 w-5 text-primary" />
                      Metode & kilder
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>Vi verificerer licenssignal mod officielle myndighedskilder og kobler bonussignaler til operatørernes egne vilkårssider.</p>
                    <p>Events publiceres først, når de kan repræsenteres som et offentligt signal med dokumenterbar baggrund.</p>
                    <p>Tekniske audit-logs bruges fortsat internt, men denne side er bygget som et offentligt datalag ovenpå dem.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="my-10" />

            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold">Seneste verificerede events</h2>
              <div className="space-y-3">
                {data?.events.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-xl border border-border bg-card/70 p-4 transition-colors hover:border-primary/30"
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant={getMarketIntelligenceImpactVariant(event.impact_level)}>
                        {getMarketIntelligenceImpactLabel(event.impact_level)}
                      </Badge>
                      <Badge variant="outline">{getMarketIntelligenceCategoryLabel(event.category)}</Badge>
                      <span>{formatTimestampDanish(event.published_at)}</span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{event.headline}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{event.summary}</p>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-10" />

            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold">Operatøroversigt</h2>
              <p className="mb-6 max-w-3xl text-muted-foreground leading-relaxed">
                Tabellen viser de stærkeste aktuelle compliance-signaler i markedet. Brug den som et hurtigt
                overblik, og dyk derefter ned i de enkelte anmeldelser for den fulde kontekst.
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
                    {data?.operators.map((operator) => (
                      <tr key={operator.id} className="border-t border-border">
                        <td className="px-4 py-3">
                          <Link
                            to={`/casino-anmeldelser/${operator.casino_slug}`}
                            className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                          >
                            {operator.casino_name}
                          </Link>
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
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <Separator className="my-10" />

            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold">Relaterede trust-hubs og money-pages</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {internalLinks.map((item) => (
                  <Link key={item.to} to={item.to}>
                    <Card className="h-full border-border bg-card/80 transition-colors hover:border-primary/40">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <ArrowRight className="h-4 w-4 text-primary" />
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}

        <LatestNewsByCategory pagePath="/markedsindsigt" />
        <FAQSection title="Ofte stillede spørgsmål om Market Intelligence" faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
}
