import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CasinoCard } from "@/components/CasinoCard";
import { useCasinos } from "@/hooks/useCasinos";
import { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  Smartphone,
  Trophy,
  Star,
  Clock,
  CreditCard,
  Gamepad2,
  Users,
  TrendingUp,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const NyeCasinoer = () => {
  const { data: casinos, isLoading } = useCasinos();
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);

  // Show newest casinos (use is_hot or most recently created)
  const newCasinos = casinos
    ?.filter((c) => c.is_active)
    ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    ?.slice(0, 6) ?? [];

  const mapCasino = (casino: typeof newCasinos[0]) => ({
    id: casino.id,
    name: casino.name,
    slug: casino.slug,
    rating: Number(casino.rating),
    bonusTitle: casino.bonus_title,
    bonusAmount: casino.bonus_amount,
    bonusType: casino.bonus_type,
    wageringRequirements: casino.wagering_requirements,
    validity: casino.validity,
    minDeposit: casino.min_deposit,
    payoutTime: casino.payout_time,
    freeSpins: casino.free_spins,
    features: casino.features ?? [],
    pros: casino.pros ?? [],
    cons: casino.cons ?? [],
    description: casino.description ?? "",
    isRecommended: casino.is_recommended,
    isHot: casino.is_hot,
    logoUrl: casino.logo_url,
    affiliateUrl: casino.affiliate_url,
    gameProviders: casino.game_providers ?? [],
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Nye Casinoer i Danmark
            </h1>
            <p className="text-lg text-muted-foreground">
              Oplev de seneste danske online casinoer med friske bonusser, moderne
              spiloplevelser og dansk licens. Vi har samlet et komplet overblik, så du
              nemt kan finde dit næste spillested.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        {/* Intro Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Overblik over nye casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Nye casinoer dukker jævnligt op på det danske marked, og det kan være
            svært at bevare overblikket. Hos Casinoaftaler.dk gennemgår vi hvert nyt
            spillested grundigt – fra velkomstbonus og spiludvalg til
            betalingsmetoder, behandlingstider og kundeservice. Alle casinoer på
            vores liste har dansk licens fra Spillemyndigheden, SSL-kryptering og
            overholder gældende lovgivning.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vores mål er at give dig et ærligt og pålideligt billede, så du kan tage
            en informeret beslutning, når du vælger dit næste spillested. Uanset om
            du er erfaren spiller eller helt ny, finder du her de vigtigste
            informationer samlet ét sted.
          </p>
        </section>

        {/* New Casinos List */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Nye casinoer – Februar 2026
          </h2>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : newCasinos.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              Ingen nye casinoer tilgængelige i øjeblikket.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                {newCasinos.slice(0, 2).map((casino, index) => (
                  <CasinoCard
                    key={casino.id}
                    casino={mapCasino(casino)}
                    rank={index + 1}
                    open={openCasinoId === casino.id}
                    onOpenChange={(open) =>
                      setOpenCasinoId(open ? casino.id : null)
                    }
                  />
                ))}
              </div>
              {newCasinos.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  {newCasinos.slice(2).map((casino, index) => (
                    <CasinoCard
                      key={casino.id}
                      casino={mapCasino(casino)}
                      rank={index + 3}
                      open={openCasinoId === casino.id}
                      onOpenChange={(open) =>
                        setOpenCasinoId(open ? casino.id : null)
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        <Separator className="my-10" />

        {/* Why Choose New Casinos */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Hvorfor vælge et nyt casino?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Friske velkomstbonusser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Nye casinoer tilbyder ofte generøse velkomstpakker for at tiltrække
                  spillere – det kan betyde bedre match-bonusser, flere free spins
                  og lavere omsætningskrav.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Moderne spiloplevelse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Nyere platforme er bygget med den seneste teknologi, hvilket
                  betyder hurtigere loading, bedre mobiloplevelse og et mere
                  intuitivt design.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Nye trends og features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Nye spillesteder eksperimenterer med innovative funktioner som
                  gamification, VIP-lounges, live-turneringer og personlige
                  bonustilbud.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What We Look For */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Hvad vi kigger efter ved nye casinoer
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Når et nyt casino dukker op på det danske marked, gennemgår vi det med
            samme grundighed som etablerede spillesteder. Her er de vigtigste
            faktorer, vi vurderer:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Dansk licens</h3>
                <p className="text-sm text-muted-foreground">
                  Alle casinoer på vores liste har gyldig licens fra
                  Spillemyndigheden – din sikkerhed er altid i centrum.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Star className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Bonus og vilkår</h3>
                <p className="text-sm text-muted-foreground">
                  Vi evaluerer velkomstbonusser, omsætningskrav, gyldighed og om
                  vilkårene er gennemsigtige og fair.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CreditCard className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Betalingsmetoder</h3>
                <p className="text-sm text-muted-foreground">
                  MobilePay, Trustly, Visa og andre populære metoder – vi tjekker
                  at ind- og udbetalinger kører hurtigt og sikkert.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Smartphone className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Mobiloplevelse</h3>
                <p className="text-sm text-muted-foreground">
                  De fleste spiller fra mobilen – derfor tester vi altid om
                  casinoet fungerer gnidningsfrit på alle enheder.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Trophy className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Spiludvalg</h3>
                <p className="text-sm text-muted-foreground">
                  Fra slots og live casino til bordspil – vi vurderer bredden og
                  kvaliteten af spilkataloget.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Udbetalingstider</h3>
                <p className="text-sm text-muted-foreground">
                  Ingen har lyst til at vente på sine gevinster. Vi tjekker de
                  reelle behandlingstider og sammenligner med markedet.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Casino Trends 2026 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Casino-trends i 2026</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Markedet for online casinoer udvikler sig konstant. Her er de vigtigste
            trends, vi ser blandt nye danske spillesteder i 2026:
          </p>
          <div className="space-y-3">
            {[
              {
                title: "Personlige bonustilbud",
                desc: "Casinoer bruger data og spilleradfærd til at skræddersy bonusser, der passer til den enkelte spiller.",
              },
              {
                title: "Udvidet live casino",
                desc: "Flere nye spillesteder satser stort på live dealer-spil med ægte dealere og interaktive funktioner.",
              },
              {
                title: "Hurtigere betalinger",
                desc: "MobilePay, Trustly og øjeblikkelige udbetalinger bliver standarden hos nye casinoer.",
              },
              {
                title: "Gamification og belønninger",
                desc: "Missioner, achievements og loyalitetsprogrammer gør spiloplevelsen mere engagerende.",
              },
              {
                title: "Mobil-first design",
                desc: "Nye platforme designes med mobilen i centrum – perfekt optimeret til smartphones og tablets.",
              },
            ].map((trend) => (
              <div
                key={trend.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{trend.title}</h3>
                  <p className="text-sm text-muted-foreground">{trend.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Types of New Casinos */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Typer af nye casinoer
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Ikke alle nye casinoer er skabt ens. De kommer typisk fra tre
            forskellige baggrunde, som hver har sine fordele:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" />
                  Fra et moderselskab
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Mange nye spillesteder drives af erfarne operatører, der allerede
                  har andre casinoer i deres portefølje. Det betyder solid erfaring,
                  pålidelige udbetalinger og gennemprøvet kundeservice fra dag ét.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Internationale brands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Store udenlandske casinoer, der vælger at lancere i Danmark, bringer
                  global erfaring og teknologiske løsninger med sig. De tilpasser
                  betalingsmetoder og support til det danske marked.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Helt nye iværksættere
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Friske iværksættere tør eksperimentere med unikke koncepter og
                  skræddersyede oplevelser. De reagerer hurtigt på feedback og
                  bygger loyalitet gennem gennemsigtighed og personlig dialog.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Responsible Gaming */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-primary" />
                Spil ansvarligt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Uanset om du vælger et nyt eller etableret casino, er det vigtigt at
                spille ansvarligt. Sæt altid et budget, hold pauser og spil aldrig
                for mere, end du har råd til at tabe.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Alle casinoer på vores liste har dansk licens og tilbyder
                selvudelukkelsesmuligheder via{" "}
                <a
                  href="https://www.rofus.nu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  ROFUS
                </a>
                . Har du brug for hjælp eller rådgivning, kan du kontakte{" "}
                <a
                  href="https://www.stopspillet.dk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  StopSpillet.dk
                </a>
                .
              </p>
              <p className="text-xs text-muted-foreground">
                18+ | Spil ansvarligt | Annoncering
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
};

export default NyeCasinoer;
