import { Link } from "react-router-dom";
import { Shield, CheckCircle, AlertTriangle, XCircle, ExternalLink, Scale, Clock, FileCheck, HelpCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthorBio } from "@/components/AuthorBio";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { SEO } from "@/components/SEO";
import { FAQSection } from "@/components/FAQSection";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { useCasinoCompliance } from "@/hooks/useCasinoCompliance";
import { SITE_URL } from "@/lib/seo";
import complianceHero from "@/assets/heroes/casino-compliance-hero.jpg";

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
];

function buildSchemas(lastChecked: string | null) {
  const dateModified = lastChecked ? new Date(lastChecked).toISOString().split("T")[0] : "2026-02-21";

  return [
    {
      "@type": "Dataset",
      "@id": `${SITE_URL}/casino-compliance#dataset`,
      name: "Compliance Data – Danske Online Casinoer",
      description: "Dagligt opdateret compliance-oversigt over alle danske licenserede online casinoer. Inkluderer licensstatus, bonusoverholdelse og compliance-score.",
      creator: { "@id": `${SITE_URL}/#organization` },
      dateModified,
      license: "https://creativecommons.org/licenses/by-nc/4.0/",
      temporalCoverage: dateModified,
      spatialCoverage: "Denmark",
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/casino-compliance#itemlist`,
      name: "Danske Casinoer – Compliance Status",
      description: "Liste over licenserede danske casinoer med compliance-vurdering.",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: 0,
    },
  ];
}

function ScoreBadge({ score }: { score: number }) {
  if (score === 100) {
    return (
      <Badge className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 gap-1">
        <CheckCircle className="h-3 w-3" />
        {score}
      </Badge>
    );
  }
  if (score >= 50) {
    return (
      <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30 gap-1">
        <AlertTriangle className="h-3 w-3" />
        {score}
      </Badge>
    );
  }
  return (
    <Badge variant="destructive" className="gap-1">
      <XCircle className="h-3 w-3" />
      {score}
    </Badge>
  );
}

function LicenseBadge({ status }: { status: string }) {
  if (status === "valid") {
    return (
      <Badge className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 gap-1">
        <CheckCircle className="h-3 w-3" />
        Gyldig
      </Badge>
    );
  }
  if (status === "suspended") {
    return (
      <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30 gap-1">
        <AlertTriangle className="h-3 w-3" />
        Suspenderet
      </Badge>
    );
  }
  return (
    <Badge variant="destructive" className="gap-1">
      <XCircle className="h-3 w-3" />
      Tilbagekaldt
    </Badge>
  );
}

export default function CasinoCompliance() {
  const { data: complianceData, isLoading } = useCasinoCompliance();

  const latestCheck = complianceData?.length
    ? complianceData.reduce((latest, row) =>
        new Date(row.last_checked) > new Date(latest) ? row.last_checked : latest,
      complianceData[0].last_checked)
    : null;

  const totalCompliant = complianceData?.filter(c => c.compliance_score === 100).length || 0;
  const totalPartial = complianceData?.filter(c => c.compliance_score >= 50 && c.compliance_score < 100).length || 0;
  const totalNonCompliant = complianceData?.filter(c => c.compliance_score < 50).length || 0;

  const schemas = buildSchemas(latestCheck);
  if (complianceData?.length) {
    (schemas[1] as Record<string, unknown>).numberOfItems = complianceData.length;
  }

  return (
    <>
      <SEO
        title="Compliance Dashboard – Danske Casinoer | Casinoaftaler"
        description="Dagligt opdateret compliance-oversigt over alle danske online casinoer. Se licensstatus, bonusoverholdelse og compliance-score verificeret mod Spillemyndigheden."
        jsonLd={schemas}
      />

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
              <a
                href="https://spillemyndigheden.dk/tilladelsesindehavere"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline hover:text-white/70"
              >
                Spillemyndigheden
              </a>
              .
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
        <AuthorMetaBar author="jonas" date="21-02-2026" readTime="5 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={complianceHero} alt="Compliance dashboard for danske online casinoer med skjold og retfærdighedsvægt" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-3 mb-10">
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
        </div>

        {/* Explanation Section */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Sådan beregnes compliance
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

        {/* Compliance Table */}
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Compliance-oversigt
          </h2>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : complianceData && complianceData.length > 0 ? (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Casino</TableHead>
                    <TableHead>Licens</TableHead>
                    <TableHead className="text-center">Bonus OK?</TableHead>
                    <TableHead className="text-center">Wager</TableHead>
                    <TableHead className="text-center">Score</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Link
                          to={`/casino-anmeldelser/${row.casino_slug}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {row.casino_name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <LicenseBadge status={row.license_status} />
                      </TableCell>
                      <TableCell className="text-center">
                        {row.bonus_compliant ? (
                          <CheckCircle className="h-5 w-5 text-emerald-500 mx-auto" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center text-sm">
                        {row.bonus_wager_requirement}x
                      </TableCell>
                      <TableCell className="text-center">
                        <ScoreBadge score={row.compliance_score} />
                      </TableCell>
                      <TableCell className="text-center">
                        <a
                          href={row.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Verificér
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <HelpCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Compliance-data indlæses. Den daglige opdatering kører kl. 06:00 CET.
                </p>
              </CardContent>
            </Card>
          )}
        </section>

        <Separator className="my-10" />

        {/* Internal Linking */}
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

        {/* FAQ */}
        <FAQSection title="Ofte Stillede Spørgsmål om Casino Compliance" faqs={faqs} />

        <Separator className="my-10" />

        <AuthorBio author="jonas" />
      </div>
    </>
  );
}
