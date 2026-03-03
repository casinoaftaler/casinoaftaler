import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2,
  Link2,
  Database,
  FileText,
  BarChart3,
  RefreshCw,
} from "lucide-react";

// ── All valid routes from App.tsx ──
const VALID_ROUTES = new Set([
  "/", "/casino-bonus", "/top-10-casino-online", "/ansvarligt-spil",
  "/spillemyndigheden", "/kontakt", "/vilkaar", "/privatlivspolitik",
  "/cookies", "/butik", "/highlights", "/betalingsmetoder",
  "/spiludviklere", "/free-spins", "/velkomstbonus", "/omsaetningskrav",
  "/indskudsbonus", "/bonus-uden-indbetaling", "/bonus-uden-omsaetningskrav",
  "/no-sticky-bonus", "/sticky-bonus", "/live-casino",
  "/cashback-bonus", "/reload-bonus",
  "/live-casino/blackjack", "/live-casino/roulette", "/live-casino/baccarat",
  "/live-casino/lightning-roulette", "/live-casino/monopoly-live",
  "/casino-anmeldelser", "/casino-anmeldelser/spilleautomaten",
  "/casino-anmeldelser/spildansknu", "/casino-anmeldelser/campobet",
  "/casino-anmeldelser/betinia", "/casino-anmeldelser/swift-casino",
  "/casino-anmeldelser/luna-casino", "/casino-anmeldelser/danske-spil",
  "/casino-anmeldelser/comeon", "/casino-anmeldelser/getlucky",
  "/casino-anmeldelser/mr-green", "/casino-anmeldelser/videoslots",
  "/casino-anmeldelser/mr-vegas", "/casino-anmeldelser/leovegas",
  "/casino-anmeldelser/expekt", "/casino-anmeldelser/betano",
  "/casino-anmeldelser/888-casino", "/casino-anmeldelser/unibet",
  "/casino-anmeldelser/bet365", "/casino-anmeldelser/royal-casino",
  "/casino-anmeldelser/maria-casino", "/casino-anmeldelser/kapow-casino",
  "/casino-anmeldelser/nordicbet", "/casino-anmeldelser/one-casino",
  "/casino-anmeldelser/spilnu", "/casino-anmeldelser/stake-casino",
  "/casino-anmeldelser/casinostuen", "/casino-anmeldelser/pokerstars",
  "/casino-anmeldelser/bwin", "/casino-anmeldelser/marathonbet",
  "/casinospil", "/casinoer", "/casinoer/hurtig-udbetaling",
  "/casinoer/hoej-rtp", "/casinoer/crypto-casino",
  "/casino-licenser", "/casinoer/vr-casinoer",
  "/casinoer/mobil-casinoer", "/casinoer/spil-casino-for-sjov",
  "/casinoer/casino-og-skat",
  "/casinospil/spillemaskiner", "/casinospil/spillemaskiner/hoej-rtp",
  "/casinospil/spillemaskiner/sweet-bonanza", "/casinospil/spillemaskiner/book-of-dead",
  "/casinospil/spillemaskiner/gates-of-olympus", "/casinospil/spillemaskiner/starburst",
  "/casinospil/spillemaskiner/razor-shark", "/casinospil/spillemaskiner/big-bass-bonanza",
  "/casinospil/spillemaskiner/dead-or-alive-2", "/casinospil/spillemaskiner/gonzos-quest",
  "/casinospil/spillemaskiner/reactoonz", "/casinospil/spillemaskiner/money-train-3",
  "/casinospil/spillemaskiner/wolf-gold", "/casinospil/spillemaskiner/the-dog-house",
  "/casinospil/spillemaskiner/jammin-jars", "/casinospil/spillemaskiner/bonanza",
  "/casinospil/spillemaskiner/fire-joker", "/casinospil/spillemaskiner/legacy-of-dead",
  "/casinospil/spillemaskiner/divine-fortune", "/casinospil/spillemaskiner/eye-of-horus",
  "/casinospil/spillemaskiner/buffalo-king", "/casinospil/spillemaskiner/sugar-rush",
  "/casinospil/spillemaskiner/cleopatra", "/casinospil/spillemaskiner/mega-moolah",
  "/casinospil/spillemaskiner/thunderstruck-ii", "/casinospil/spillemaskiner/immortal-romance",
  "/casinospil/spillemaskiner/wild-west-gold", "/casinospil/spillemaskiner/madame-destiny-megaways",
  "/casinospil/spillemaskiner/extra-chilli-megaways", "/casinospil/spillemaskiner/wanted-dead-or-a-wild",
  "/casinospil/spillemaskiner/chaos-crew", "/casinospil/spillemaskiner/joker-strike",
  "/casinospil/spillemaskiner/bonus-buys",
  "/casinospil/blackjack", "/casinospil/roulette", "/casinospil/poker",
  "/casinospil/craps", "/casinospil/baccarat", "/casinospil/roulette-strategi",
  "/casinospil/online-lotteri", "/casinospil/game-shows",
  "/spiludviklere/netent", "/spiludviklere/pragmatic-play",
  "/spiludviklere/relax-gaming", "/spiludviklere/play-n-go",
  "/spiludviklere/hacksaw-gaming", "/spiludviklere/nolimit-city",
  "/spiludviklere/yggdrasil", "/spiludviklere/microgaming",
  "/spiludviklere/red-tiger", "/spiludviklere/big-time-gaming",
  "/spiludviklere/elk-studios", "/spiludviklere/evolution-gaming",
  "/betalingsmetoder/apple-pay", "/betalingsmetoder/mobilepay",
  "/betalingsmetoder/paypal", "/betalingsmetoder/skrill",
  "/betalingsmetoder/trustly", "/betalingsmetoder/zimpler",
  "/betalingsmetoder/paysafecard", "/betalingsmetoder/bankoverforsler",
  "/betalingsmetoder/visa-mastercard", "/betalingsmetoder/revolut",
  "/community", "/community/turneringer", "/community/rewards",
  "/community/spin-the-reel", "/community/slots",
  "/community/slots/book-of-fedesvin", "/community/slots/rise-of-fedesvin",
  "/community/slots/gates-of-fedesvin",
  "/auth", "/profil", "/forfatter/jonas", "/forfatter/kevin",
  "/nyheder", "/forretningsmodel", "/redaktionel-politik",
  "/saadan-tester-vi", "/om-teamet", "/nye-casinoer",
]);

interface Finding {
  category: string;
  severity: 'error' | 'warning';
  casino?: string;
  message: string;
  current_value?: string;
  expected_value?: string;
  source?: string;
}

interface FactCheckResult {
  dbFindings: Finding[];
  summary: {
    errors: number;
    warnings: number;
    passed: number;
  };
  timestamp: string;
}

export function FactCheckAdminSection() {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<FactCheckResult | null>(null);

  const runFactCheck = async () => {
    setIsRunning(true);
    setResult(null);
    const allFindings: Finding[] = [];

    try {
      // ── 1. DB Compliance Check (via edge function) ──
      toast.info("Kører DB compliance check...");
      const { data: dbData, error: dbError } = await supabase.functions.invoke('fact-check');

      if (dbError) {
        toast.error("DB check fejlede: " + dbError.message);
      } else if (dbData?.findings) {
        allFindings.push(...dbData.findings.map((f: Finding) => ({ ...f, source: 'Database' })));
      }

      // Compile results
      const errors = allFindings.filter(f => f.severity === 'error').length;
      const warnings = allFindings.filter(f => f.severity === 'warning').length;

      setResult({
        dbFindings: allFindings,
        summary: {
          errors,
          warnings,
          passed: errors === 0 ? 1 : 0,
        },
        timestamp: new Date().toISOString(),
      });

      if (errors === 0 && warnings === 0) {
        toast.success("Alle checks bestået! ✅");
      } else if (errors > 0) {
        toast.error(`${errors} fejl og ${warnings} advarsler fundet`);
      } else {
        toast.warning(`${warnings} advarsler fundet`);
      }
    } catch (err) {
      console.error('Fact-check error:', err);
      toast.error("Fact-check fejlede uventet");
    } finally {
      setIsRunning(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'wagering': return <FileText className="h-4 w-4" />;
      case 'bonus_cap': return <BarChart3 className="h-4 w-4" />;
      case 'min_deposit': return <Database className="h-4 w-4" />;
      case 'db_integrity': return <Link2 className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'wagering': return 'Omsætningskrav';
      case 'bonus_cap': return 'Bonus-grænse';
      case 'min_deposit': return 'Min. indbetaling';
      case 'db_integrity': return 'DB-integritet';
      default: return category;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Fact-Check System
          </h2>
          <p className="text-muted-foreground">
            Automatisk validering af regulatorisk compliance, DB-integritet og indholdskonsistens.
          </p>
        </div>
        <Button onClick={runFactCheck} disabled={isRunning} size="lg">
          {isRunning ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Kører checks...</>
          ) : (
            <><RefreshCw className="mr-2 h-4 w-4" /> Kør Fact-Check</>
          )}
        </Button>
      </div>

      {/* Checks overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 text-center">
            <Database className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">Casino DB</p>
            <p className="text-xs text-muted-foreground">Wagering, bonus, min deposit</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">Wagering-tal</p>
            <p className="text-xs text-muted-foreground">10x/5x compliance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <Link2 className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">DB Integritet</p>
            <p className="text-xs text-muted-foreground">Manglende data</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">Bonus-grænser</p>
            <p className="text-xs text-muted-foreground">≤ 1.000 kr.</p>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      {result && (
        <>
          <Separator />

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <Card className={result.summary.errors > 0 ? "border-destructive" : ""}>
              <CardContent className="pt-4 flex items-center gap-3">
                <XCircle className={`h-8 w-8 ${result.summary.errors > 0 ? "text-destructive" : "text-muted-foreground"}`} />
                <div>
                  <p className="text-2xl font-bold">{result.summary.errors}</p>
                  <p className="text-sm text-muted-foreground">Fejl</p>
                </div>
              </CardContent>
            </Card>
            <Card className={result.summary.warnings > 0 ? "border-orange-500" : ""}>
              <CardContent className="pt-4 flex items-center gap-3">
                <AlertTriangle className={`h-8 w-8 ${result.summary.warnings > 0 ? "text-orange-500" : "text-muted-foreground"}`} />
                <div>
                  <p className="text-2xl font-bold">{result.summary.warnings}</p>
                  <p className="text-sm text-muted-foreground">Advarsler</p>
                </div>
              </CardContent>
            </Card>
            <Card className={result.summary.errors === 0 && result.summary.warnings === 0 ? "border-green-500" : ""}>
              <CardContent className="pt-4 flex items-center gap-3">
                <CheckCircle2 className={`h-8 w-8 ${result.summary.errors === 0 && result.summary.warnings === 0 ? "text-green-500" : "text-muted-foreground"}`} />
                <div>
                  <p className="text-2xl font-bold">
                    {result.summary.errors === 0 && result.summary.warnings === 0 ? "OK" : "—"}
                  </p>
                  <p className="text-sm text-muted-foreground">Status</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed findings */}
          {result.dbFindings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Findings ({result.dbFindings.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.dbFindings.map((finding, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        finding.severity === 'error'
                          ? 'border-destructive/30 bg-destructive/5'
                          : 'border-orange-500/30 bg-orange-500/5'
                      }`}
                    >
                      <div className="mt-0.5">
                        {finding.severity === 'error' ? (
                          <XCircle className="h-5 w-5 text-destructive" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-orange-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {getCategoryIcon(finding.category)}
                            <span className="ml-1">{getCategoryLabel(finding.category)}</span>
                          </Badge>
                          {finding.casino && (
                            <Badge variant="secondary" className="text-xs">{finding.casino}</Badge>
                          )}
                          {finding.source && (
                            <Badge variant="outline" className="text-xs">{finding.source}</Badge>
                          )}
                        </div>
                        <p className="text-sm">{finding.message}</p>
                        {(finding.current_value || finding.expected_value) && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {finding.current_value && <span>Nuværende: <code className="bg-muted px-1 rounded">{finding.current_value}</code></span>}
                            {finding.current_value && finding.expected_value && " → "}
                            {finding.expected_value && <span>Forventet: <code className="bg-muted px-1 rounded">{finding.expected_value}</code></span>}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <p className="text-xs text-muted-foreground text-right">
            Sidst kørt: {new Date(result.timestamp).toLocaleString('da-DK')}
          </p>
        </>
      )}
    </div>
  );
}
