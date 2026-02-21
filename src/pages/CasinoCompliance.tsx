import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  Shield, CheckCircle, AlertTriangle, XCircle, ExternalLink, Scale, Clock,
  FileCheck, HelpCircle, Sparkles, Download, Filter, ArrowUpDown, History,
  BarChart3, BookOpen, Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthorBio } from "@/components/AuthorBio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SEO } from "@/components/SEO";
import { FAQSection } from "@/components/FAQSection";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { useCasinoCompliance, type CasinoComplianceRow } from "@/hooks/useCasinoCompliance";
import { useCasinoComplianceHistory } from "@/hooks/useCasinoComplianceHistory";
import { SITE_URL } from "@/lib/seo";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import complianceHero from "@/assets/heroes/casino-compliance-hero.jpg";

// ─── FAQ Data ────────────────────────────────────────────────────────
const faqs = [
  {
    question: "Hvad er et compliance dashboard for danske casinoer?",
    answer: "Et compliance dashboard er en offentlig oversigt, der viser om danske online casinoer overholder de lovmæssige krav fra Spillemyndigheden. Det dækker licensstatus, bonusbegrænsninger (maks. 1.000 kr.) og omsætningskrav (maks. 10x).",
  },
  {
    question: "Hvor ofte opdateres compliance-dataen?",
    answer: "Dataen opdateres dagligt kl. 06:00 CET. Hver opdatering verificerer casinoernes bonusvilkår mod de danske regler og kontrollerer licensstatus hos Spillemyndigheden.",
  },
  {
    question: "Hvad betyder compliance-scoren?",
    answer: "Compliance-scoren er et tal fra 0–100. 50 point gives for en gyldig dansk licens, og 50 point for korrekte bonusvilkår (bonus ≤ 1.000 kr. og omsætningskrav ≤ 10x). En score på 100 betyder fuldt compliant.",
  },
  {
    question: "Hvad sker der, hvis et casino ikke er compliant?",
    answer: "Et casino, der ikke overholder reglerne, risikerer sanktioner fra Spillemyndigheden, herunder suspension eller tilbagekaldelse af licens. For spillere betyder det, at bonusvilkår muligvis bryder loven, og casinoet bør undgås.",
  },
  {
    question: "Kan jeg stole på dataen?",
    answer: "Ja. Dataen er baseret på casinoernes offentligt tilgængelige bonusvilkår og verificeret mod Spillemyndighedens licensregister. Vi gemmer ikke affiliate-links på denne side – det er ren compliance-information.",
  },
  {
    question: "Hvordan kan jeg downloade compliance-dataen?",
    answer: "Du kan downloade den fulde compliance-oversigt som CSV-fil via knappen 'Download compliance-data (CSV)' øverst på siden. Filen indeholder casinonavn, licensstatus, bonusbeløb, omsætningskrav, compliance-score og seneste kontroldato.",
  },
  {
    question: "Hvad logges i ændringshistorikken?",
    answer: "Ændringshistorikken registrerer automatisk alle ændringer i licensstatus, bonusbeløb og omsætningskrav. Hver post viser dato, casino, hvad der blev ændret, og den gamle vs. nye værdi med link til kilden.",
  },
];

// ─── Schema Builder ──────────────────────────────────────────────────
function buildSchemas(lastChecked: string | null, complianceData: CasinoComplianceRow[] | undefined) {
  const dateModified = lastChecked ? new Date(lastChecked).toISOString().split("T")[0] : "2026-02-21";

  const datasetSchema = {
    "@type": "Dataset",
    "@id": `${SITE_URL}/casino-compliance#dataset`,
    name: "Live Compliance Data – Danske Casinoer",
    description: "Dagligt opdateret compliance-oversigt over alle danske licenserede online casinoer. Inkluderer licensstatus, bonusoverholdelse og compliance-score verificeret mod Spillemyndighedens register.",
    creator: { "@id": `${SITE_URL}/#organization` },
    dateModified,
    license: "https://creativecommons.org/licenses/by-nc/4.0/",
    temporalCoverage: dateModified,
    spatialCoverage: "Denmark",
    distribution: {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${SITE_URL}/api/compliance-export`,
    },
  };

  const itemListSchema: Record<string, unknown> = {
    "@type": "ItemList",
    "@id": `${SITE_URL}/casino-compliance#itemlist`,
    name: "Danske Casinoer – Compliance Status",
    description: "Liste over licenserede danske casinoer med compliance-vurdering.",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: complianceData?.length || 0,
    itemListElement: (complianceData || []).map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.casino_name,
      url: `${SITE_URL}/casino-anmeldelser/${c.casino_slug}`,
      additionalProperty: {
        "@type": "PropertyValue",
        name: "compliance_score",
        value: c.compliance_score,
      },
    })),
  };

  return [datasetSchema, itemListSchema];
}

// ─── Sub-components ──────────────────────────────────────────────────
function ScoreBadge({ score }: { score: number }) {
  if (score === 100) {
    return (
      <Badge className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 gap-1">
        <CheckCircle className="h-3 w-3" />{score}
      </Badge>
    );
  }
  if (score >= 50) {
    return (
      <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30 gap-1">
        <AlertTriangle className="h-3 w-3" />{score}
      </Badge>
    );
  }
  return (
    <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" />{score}</Badge>
  );
}

function LicenseBadge({ status }: { status: string }) {
  if (status === "valid") {
    return (
      <Badge className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 gap-1">
        <CheckCircle className="h-3 w-3" />Gyldig
      </Badge>
    );
  }
  if (status === "suspended") {
    return (
      <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30 gap-1">
        <AlertTriangle className="h-3 w-3" />Suspenderet
      </Badge>
    );
  }
  return (
    <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" />Tilbagekaldt</Badge>
  );
}

function StatusBanner({ compliant, partial, nonCompliant }: { compliant: number; partial: number; nonCompliant: number }) {
  const total = nonCompliant + partial;
  if (total === 0 && compliant > 0) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 mb-8">
        <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
          Alle {compliant} casinoer er pt. fuldt compliant med dansk lovgivning.
        </p>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 mb-8">
      <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
      <p className="text-sm font-medium text-destructive">
        {nonCompliant > 0 ? `${nonCompliant} casino${nonCompliant > 1 ? "er" : ""} er ikke compliant.` : ""}
        {partial > 0 ? ` ${partial} casino${partial > 1 ? "er" : ""} er delvist compliant.` : ""}
      </p>
    </div>
  );
}

const PIE_COLORS = ["hsl(152, 69%, 42%)", "hsl(38, 92%, 50%)", "hsl(0, 84%, 60%)"];

function CompliancePieChart({ compliant, partial, nonCompliant }: { compliant: number; partial: number; nonCompliant: number }) {
  const chartData = [
    { name: "Fuldt compliant", value: compliant },
    { name: "Delvist compliant", value: partial },
    { name: "Ikke compliant", value: nonCompliant },
  ].filter(d => d.value > 0);

  if (chartData.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          Compliance-fordeling
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[["Fuldt compliant", "Delvist compliant", "Ikke compliant"].indexOf(chartData[i].name)]} />
                ))}
              </Pie>
              <RechartsTooltip
                contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          {chartData.map((d, i) => (
            <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[["Fuldt compliant", "Delvist compliant", "Ikke compliant"].indexOf(d.name)] }} />
              {d.name}: {d.value}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function formatFieldChanged(field: string): string {
  switch (field) {
    case "license_status": return "Licensstatus";
    case "bonus_max_amount": return "Maks. bonus";
    case "bonus_wager_requirement": return "Omsætningskrav";
    default: return field;
  }
}

function formatValue(field: string, value: string): string {
  if (field === "license_status") {
    switch (value) {
      case "valid": return "Gyldig";
      case "suspended": return "Suspenderet";
      case "revoked": return "Tilbagekaldt";
      default: return value;
    }
  }
  if (field === "bonus_max_amount") return `${value} kr.`;
  if (field === "bonus_wager_requirement") return `${value}x`;
  return value;
}

// ─── Filter/Sort types ───────────────────────────────────────────────
type ComplianceFilter = "all" | "compliant" | "non-compliant";
type SortKey = "score-asc" | "updated" | "alpha";

// ─── Main Component ─────────────────────────────────────────────────
export default function CasinoCompliance() {
  const { data: complianceData, isLoading } = useCasinoCompliance();
  const { data: historyData } = useCasinoComplianceHistory(10);
  const [filter, setFilter] = useState<ComplianceFilter>("all");
  const [sort, setSort] = useState<SortKey>("score-asc");

  const latestCheck = complianceData?.length
    ? complianceData.reduce((latest, row) =>
        new Date(row.last_checked) > new Date(latest) ? row.last_checked : latest,
      complianceData[0].last_checked)
    : null;

  const totalCompliant = complianceData?.filter(c => c.compliance_score === 100).length || 0;
  const totalPartial = complianceData?.filter(c => c.compliance_score >= 50 && c.compliance_score < 100).length || 0;
  const totalNonCompliant = complianceData?.filter(c => c.compliance_score < 50).length || 0;

  const filteredAndSorted = useMemo(() => {
    if (!complianceData) return [];
    let result = [...complianceData];

    // Filter
    if (filter === "compliant") result = result.filter(c => c.compliance_score === 100);
    if (filter === "non-compliant") result = result.filter(c => c.compliance_score < 100);

    // Sort
    switch (sort) {
      case "score-asc":
        result.sort((a, b) => a.compliance_score - b.compliance_score);
        break;
      case "updated":
        result.sort((a, b) => new Date(b.last_checked).getTime() - new Date(a.last_checked).getTime());
        break;
      case "alpha":
        result.sort((a, b) => a.casino_name.localeCompare(b.casino_name, "da"));
        break;
    }
    return result;
  }, [complianceData, filter, sort]);

  const schemas = buildSchemas(latestCheck, complianceData);

  const csvUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/compliance-export`;

  return (
    <>
      <SEO
        title="Compliance Dashboard – Danske Casinoer | Casinoaftaler"
        description="Dagligt opdateret compliance-oversigt over alle danske online casinoer. Se licensstatus, bonusoverholdelse og compliance-score verificeret mod Spillemyndigheden."
        jsonLd={schemas}
      />

      {/* ═══ HERO ═══ */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Shield className="mr-1.5 h-3.5 w-3.5" /> Compliance Dashboard
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Live Compliance Dashboard – Danske Online Casinoer
            </h1>
            <p className="text-lg text-white/80">
              Opdateres dagligt. Data verificeret mod{" "}
              <a href="https://spillemyndigheden.dk/tilladelsesindehavere" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-white/70">
                Spillemyndigheden
              </a>.
            </p>
            {latestCheck && (
              <p className="mt-3 text-sm text-white/60 flex items-center justify-center gap-1.5">
                <Clock className="h-4 w-4" />
                Sidst opdateret: {new Date(latestCheck).toLocaleDateString("da-DK", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="21-02-2026" readTime="8 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={complianceHero} alt="Compliance dashboard for danske online casinoer med skjold og retfærdighedsvægt" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ═══ REALTIME STATUS BADGE ═══ */}
        {!isLoading && complianceData && (
          <StatusBanner compliant={totalCompliant} partial={totalPartial} nonCompliant={totalNonCompliant} />
        )}

        {/* ═══ SUMMARY + PIE CHART ═══ */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                Fuldt Compliant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{isLoading ? "–" : totalCompliant}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Delvist Compliant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{isLoading ? "–" : totalPartial}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                Ikke Compliant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{isLoading ? "–" : totalNonCompliant}</p>
            </CardContent>
          </Card>
          <CompliancePieChart compliant={totalCompliant} partial={totalPartial} nonCompliant={totalNonCompliant} />
        </div>

        {/* ═══ METHODOLOGY ═══ */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Metodologi – Sådan beregnes compliance
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-primary" />
                  Licensstatus (50 point)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Hvert casino verificeres mod Spillemyndighedens offentlige register. En gyldig dansk licens giver 50 point. Suspenderede eller tilbagekaldte licenser giver 0.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Bonusoverholdelse (50 point)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ifølge dansk lov må en casinobonus ikke overstige 1.000 kr., og omsætningskravet skal være maks. 10x. Casinoer, der overholder begge krav, får 50 point.
                </p>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Datakilder & Proces</h3>
                  <p className="text-sm text-muted-foreground">
                    Compliance-data indsamles automatisk dagligt kl. 06:00 CET. Bonusbeløb og omsætningskrav hentes fra casinoernes egne vilkår. Licensstatus verificeres mod{" "}
                    <a href="https://spillemyndigheden.dk/tilladelsesindehavere" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
                      Spillemyndighedens tilladelsesregister
                    </a>. Alle ændringer logges i en offentlig ændringshistorik.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Disclaimer</h3>
                  <p className="text-sm text-muted-foreground">
                    Denne side indeholder ingen affiliate-links. Data er baseret på offentligt tilgængelige bonusvilkår og Spillemyndighedens licensregister. Compliance-vurderingen er vejledende og erstatter ikke juridisk rådgivning.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="mb-10" />

        {/* ═══ FILTERS + DOWNLOAD ═══ */}
        <section>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Compliance-oversigt
            </h2>
            <Button variant="outline" size="sm" asChild>
              <a href={csvUrl} download>
                <Download className="h-4 w-4 mr-1.5" />
                Download compliance-data (CSV)
              </a>
            </Button>
          </div>

          {/* Filter & Sort Controls */}
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex items-center gap-1.5 mr-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter:</span>
            </div>
            {([["all", "Alle"], ["compliant", "Kun compliant"], ["non-compliant", "Ikke compliant"]] as const).map(([key, label]) => (
              <Button key={key} variant={filter === key ? "default" : "outline"} size="sm" onClick={() => setFilter(key)}>
                {label}
              </Button>
            ))}

            <Separator orientation="vertical" className="h-8 mx-2 hidden sm:block" />

            <div className="flex items-center gap-1.5 mr-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Sortering:</span>
            </div>
            {([["score-asc", "Laveste score"], ["updated", "Senest opdateret"], ["alpha", "A–Å"]] as const).map(([key, label]) => (
              <Button key={key} variant={sort === key ? "default" : "outline"} size="sm" onClick={() => setSort(key)}>
                {label}
              </Button>
            ))}
          </div>

          {/* ═══ TABLE ═══ */}
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : filteredAndSorted.length > 0 ? (
            <TooltipProvider>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Casino</TableHead>
                      <TableHead>Licens</TableHead>
                      <TableHead className="text-center">Bonus OK?</TableHead>
                      <TableHead className="text-center">Wager</TableHead>
                      <TableHead className="text-center">Score</TableHead>
                      <TableHead className="text-center">Verificér</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSorted.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Link to={`/casino-anmeldelser/${row.casino_slug}`} className="font-medium text-primary hover:underline">
                            {row.casino_name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help">
                                <LicenseBadge status={row.license_status} />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs">
                              <p className="text-xs">
                                Licens: {row.license_number || "Ukendt"}<br />
                                Sidst verificeret: {new Date(row.last_checked).toLocaleDateString("da-DK")}<br />
                                <a href={row.source_url} target="_blank" rel="noopener noreferrer" className="text-primary underline">Kilde</a>
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="text-center">
                          {row.bonus_compliant ? (
                            <CheckCircle className="h-5 w-5 text-emerald-500 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-destructive mx-auto" />
                          )}
                        </TableCell>
                        <TableCell className="text-center text-sm">{row.bonus_wager_requirement}x</TableCell>
                        <TableCell className="text-center"><ScoreBadge score={row.compliance_score} /></TableCell>
                        <TableCell className="text-center">
                          <a href={row.source_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                            <ExternalLink className="h-3 w-3" />Verificér
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TooltipProvider>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <HelpCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  {complianceData?.length ? "Ingen casinoer matcher det valgte filter." : "Compliance-data indlæses. Den daglige opdatering kører kl. 06:00 CET."}
                </p>
              </CardContent>
            </Card>
          )}
        </section>

        <Separator className="my-10" />

        {/* ═══ CHANGELOG ═══ */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Seneste compliance-ændringer
          </h2>
          {historyData && historyData.length > 0 ? (
            <div className="space-y-3">
              {historyData.map((entry) => {
                const casinoName = complianceData?.find(c => c.casino_slug === entry.casino_slug)?.casino_name || entry.casino_slug;
                return (
                  <Card key={entry.id}>
                    <CardContent className="py-4">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {entry.change_type === "license_change" ? (
                              <FileCheck className="h-4 w-4 text-primary" />
                            ) : (
                              <Shield className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              <Link to={`/casino-anmeldelser/${entry.casino_slug}`} className="text-primary hover:underline">{casinoName}</Link>
                              {" – "}{formatFieldChanged(entry.field_changed)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatValue(entry.field_changed, entry.old_value)} → {formatValue(entry.field_changed, entry.new_value)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{new Date(entry.changed_at).toLocaleDateString("da-DK", { day: "numeric", month: "short", year: "numeric" })}</span>
                          <a href={entry.source_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary">
                            <ExternalLink className="h-3 w-3" />Kilde
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <Info className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Ingen ændringer registreret endnu. Ændringer logges automatisk ved næste opdatering.</p>
              </CardContent>
            </Card>
          )}
        </section>

        <Separator className="mb-10" />

        {/* ═══ INTERNAL LINKING ═══ */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Relaterede Ressourcer</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link to="/spillemyndigheden" className="flex items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50">
              <Scale className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-medium">Spillemyndigheden – Komplet Guide</span>
            </Link>
            <Link to="/casino-licenser" className="flex items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50">
              <FileCheck className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-medium">Casino Licenser i Danmark</span>
            </Link>
            <Link to="/omsaetningskrav" className="flex items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50">
              <Shield className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-medium">Omsætningskrav Forklaret</span>
            </Link>
            <Link to="/ansvarligt-spil" className="flex items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50">
              <CheckCircle className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-medium">Ansvarligt Spil</span>
            </Link>
            <Link to="/casino-bonus" className="flex items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50">
              <AlertTriangle className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-medium">Casino Bonus Guide</span>
            </Link>
            <Link to="/casino-anmeldelser" className="flex items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50">
              <ExternalLink className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-medium">Alle Casino Anmeldelser</span>
            </Link>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <FAQSection title="Ofte Stillede Spørgsmål om Casino Compliance" faqs={faqs} />

        <Separator className="my-10" />

        <AuthorBio author="jonas" />
      </div>
    </>
  );
}
