import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, AlertTriangle, ArrowRight, BookOpen, Gift, Sparkles, RefreshCw, Percent, Calendar, Gamepad2, ListChecks, Loader2 } from "lucide-react";
import { useCasinos } from "@/hooks/useCasinos";
import { CasinoCard } from "@/components/CasinoCard";

const BonusGuide = () => {
  const location = useLocation();
  const { data: casinos, isLoading: casinosLoading } = useCasinos();

  const firstTwoCasinos = casinos?.slice(0, 2) ?? [];

  const mapCasino = (casino: typeof firstTwoCasinos[0]) => ({
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
  // Handle hash navigation when page loads or hash changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      // Small delay to ensure DOM is rendered
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location.hash]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
          }}
        />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-[hsl(210_80%_60%)] blur-xl" />
          <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-[hsl(260_70%_60%)] blur-xl" />
        </div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center text-white">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-white/10 p-4">
                <BookOpen className="h-12 w-12" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Casino Bonus Guide</h1>
            <p className="text-lg text-white/80">
              Alt du behøver at vide om casinobonusser, hvordan de fungerer, og
              hvordan du vælger den rigtige til dig.
            </p>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="container">

        {/* Table of Contents */}
        <Card className="mx-auto mb-16 max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-primary" />
              I Denne Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#what-is-bonus"
                  onClick={(e) => scrollToSection(e, "what-is-bonus")}
                  className="block rounded-lg px-3 py-2 text-primary hover:bg-primary/10 active:scale-[0.98] active:bg-primary/20 transition-all duration-150"
                >
                  Hvad er en Casinobonus?
                </a>
              </li>
              <li>
                <a 
                  href="#bonus-types"
                  onClick={(e) => scrollToSection(e, "bonus-types")}
                  className="block rounded-lg px-3 py-2 text-primary hover:bg-primary/10 active:scale-[0.98] active:bg-primary/20 transition-all duration-150"
                >
                  Typer af Casinobonusser
                </a>
              </li>
              <li>
                <a 
                  href="#no-sticky"
                  onClick={(e) => scrollToSection(e, "no-sticky")}
                  className="block rounded-lg px-3 py-2 text-primary hover:bg-primary/10 active:scale-[0.98] active:bg-primary/20 transition-all duration-150"
                >
                  No-Sticky Bonusser Forklaret
                </a>
              </li>
              <li>
                <a 
                  href="#sticky"
                  onClick={(e) => scrollToSection(e, "sticky")}
                  className="block rounded-lg px-3 py-2 text-primary hover:bg-primary/10 active:scale-[0.98] active:bg-primary/20 transition-all duration-150"
                >
                  Sticky Bonusser Forklaret
                </a>
              </li>
              <li>
                <a 
                  href="#wagering"
                  onClick={(e) => scrollToSection(e, "wagering")}
                  className="block rounded-lg px-3 py-2 text-primary hover:bg-primary/10 active:scale-[0.98] active:bg-primary/20 transition-all duration-150"
                >
                  Forståelse af Gennemspilskrav
                </a>
              </li>
              <li>
                <a 
                  href="#tips"
                  onClick={(e) => scrollToSection(e, "tips")}
                  className="block rounded-lg px-3 py-2 text-primary hover:bg-primary/10 active:scale-[0.98] active:bg-primary/20 transition-all duration-150"
                >
                  Tips til Valg af Bonusser
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Content Sections */}
        <div className="mx-auto max-w-3xl space-y-16">
          {/* What is a Bonus */}
          <section id="what-is-bonus">
            <h2 className="mb-4 text-2xl font-bold">Hvad er en Casinobonus?</h2>
            <p className="mb-4 text-muted-foreground">
              En casinobonus er et kampagneincitament, der tilbydes af online
              casinoer for at tiltrække nye spillere eller belønne loyale kunder.
              Disse bonusser kommer typisk i form af ekstra penge, gratis spins
              eller andre fordele, der giver spillere mere værdi, når de spiller.
            </p>
            <p className="text-muted-foreground">
              Selvom bonusser kan give betydelig værdi, kommer de altid med
              vilkår og betingelser, som du bør forstå, før du accepterer.
              De vigtigste af disse er gennemspilskrav, som bestemmer, hvor meget
              du skal spille for, før du kan hæve eventuelle gevinster.
            </p>
          </section>

          {/* Bonus Types */}
          <section id="bonus-types">
            <h2 className="mb-4 text-2xl font-bold">Typer af Casinobonusser</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Velkomstbonus</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Tilbydes til nye spillere ved registrering, ofte med match
                    af din første indbetaling med 100% eller mere.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    <h3 className="font-semibold">Bonus Uden Indbetaling</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Gratis bonus givet uden krav om indbetaling, normalt mindre
                    men uden finansiel risiko.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Gamepad2 className="h-5 w-5 text-emerald-500" />
                    <h3 className="font-semibold">Gratis Spins</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Gratis omgange på spilleautomater, ofte inkluderet i
                    velkomstpakker eller som selvstændige tilbud.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="h-5 w-5 text-sky-500" />
                    <h3 className="font-semibold">Genindbetalingsbonus</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Bonus til eksisterende spillere ved yderligere indbetalinger,
                    typisk mindre end velkomstbonusser.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* No-Sticky */}
          <section id="no-sticky">
            <h2 className="mb-4 text-2xl font-bold">No-Sticky Bonusser Forklaret</h2>
            <Card className="border-primary/50">
              <CardContent className="pt-6">
                <p className="mb-4 text-muted-foreground">
                  En no-sticky bonus (også kaldet "faldskærms" eller "fortabelig"
                  bonus) holder din rigtige pengeindbetaling adskilt fra
                  bonusmidlerne. Du spiller med dine rigtige penge først, og
                  bonussen træder kun i kraft, hvis du mister din indbetaling.
                </p>
                <h4 className="mb-2 font-semibold">Vigtigste Fordele:</h4>
                <ul className="mb-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Hæv dine rigtige pengegevinster når som helst</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Lavere risiko - du bruger kun bonus, hvis indbetaling er tabt</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Bonus fungerer som et "sikkerhedsnet" ved dårlige sessioner</span>
                  </li>
                </ul>
                <h4 className="mb-2 font-semibold">Sådan Fungerer Det:</h4>
                <p className="text-sm text-muted-foreground">
                  Eksempel: Du indbetaler 500 kr. og modtager en 500 kr.
                  no-sticky bonus. Du spiller med din indbetaling på 500 kr.
                  først. Hvis du vinder 2.500 kr., kan du hæve de 2.500 kr.
                  (minus dine oprindelige 500 kr., der blev spillet) uden at røre
                  bonussen. Bonussen fortabes, når du hæver. Hvis du mister din
                  indbetaling, aktiveres bonussen på 500 kr., og du kan fortsætte
                  med at spille.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Partner Casino Cards */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-muted-foreground">
              Casinoer med No-Sticky Bonus
            </h3>
            {casinosLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {firstTwoCasinos.map((casino, index) => (
                  <CasinoCard
                    key={casino.id}
                    casino={mapCasino(casino)}
                    rank={index + 1}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Sticky */}
          <section id="sticky">
            <h2 className="mb-4 text-2xl font-bold">Sticky Bonusser Forklaret</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-4 text-muted-foreground">
                  En sticky bonus (også kaldet "standard" eller "integreret"
                  bonus) kombinerer din indbetaling og bonusmidler til én saldo.
                  Du kan ikke hæve noget, før du har opfyldt gennemspilskravene.
                </p>
                <h4 className="mb-2 font-semibold">Overvejelser:</h4>
                <ul className="mb-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-destructive" />
                    <span>Kan ikke hæve, før gennemspil er fuldført</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Ofte større bonusprocenter tilgængelige</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>God til længere spillesessioner</span>
                  </li>
                </ul>
                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 shrink-0 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      <strong>Vigtigt:</strong> Med sticky bonusser, hvis du
                      vinder stort tidligt, skal du stadig opfylde
                      gennemspilskravene, før du kan hæve. Det betyder, at du
                      potentielt kan miste disse gevinster, mens du prøver at
                      opfylde kravene.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Wagering */}
          <section id="wagering">
            <h2 className="mb-4 text-2xl font-bold">
              Forståelse af Gennemspilskrav
            </h2>
            <p className="mb-4 text-muted-foreground">
              Gennemspilskrav (også kaldet omsætningskrav) specificerer, hvor
              mange gange du skal spille for bonusbeløbet, før du kan hæve
              eventuelle gevinster. Dette er den vigtigste faktor, når du
              vurderer en bonus.
            </p>
            <Card className="mb-6 bg-muted/30">
              <CardContent className="pt-6">
                <h4 className="mb-2 font-semibold">Beregningseksempel:</h4>
                <p className="text-muted-foreground">
                  500 kr. bonus med 35x gennemspilskrav = 17.500 kr. i samlede
                  væddemål krævet før udbetaling.
                </p>
              </CardContent>
            </Card>
            <h4 className="mb-2 font-semibold">Guide til Gennemspilskrav:</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <strong className="text-foreground">Under 30x:</strong> Fremragende
                - meget spillervenligt
              </li>
              <li>
                <strong className="text-foreground">30x - 40x:</strong> Godt -
                branchegennemsnit
              </li>
              <li>
                <strong className="text-foreground">40x - 50x:</strong> Højt -
                sværere at fuldføre
              </li>
              <li>
                <strong className="text-foreground">Over 50x:</strong> Meget højt
                - vær forsigtig
              </li>
            </ul>
          </section>

          {/* Tips */}
          <section id="tips">
            <h2 className="mb-4 text-2xl font-bold">Tips til Valg af Bonusser</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="mb-2 font-semibold">
                    1. Foretruk No-Sticky Frem for Sticky
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    No-sticky bonusser giver dig mere fleksibilitet og lavere
                    risiko. Du kan altid gå med dine gevinster.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h4 className="mb-2 font-semibold">
                    2. Kig Efter Lave Gennemspilskrav
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Bonusser med 30x eller lavere gennemspil er meget nemmere at
                    gennemføre og tilbyder bedre reel værdi.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h4 className="mb-2 font-semibold">3. Tjek Gyldighedsperioden</h4>
                  <p className="text-sm text-muted-foreground">
                    Sørg for, at du har tid nok til at opfylde gennemspilskravene.
                    Kig efter 30 dage eller mere.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h4 className="mb-2 font-semibold">
                    4. Læs Spilbidragene
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Spilleautomater tæller normalt 100% mod gennemspil, mens
                    bordspil kun kan tælle 10-20% eller være helt udelukket.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <div className="rounded-lg bg-primary/10 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">Klar til at Finde Din Bonus?</h2>
            <p className="mb-6 text-muted-foreground">
              Gennemse vores håndplukkede udvalg af top casinobonusser med fair
              vilkår og betingelser.
            </p>
            <Button size="lg" asChild className="active:scale-95 transition-transform duration-150">
              <Link to="/#top-casinos">
                Se Top Bonusser <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BonusGuide;
