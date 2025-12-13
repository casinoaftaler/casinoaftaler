import { Shield, Users, Award, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="py-16">
      <div className="container">
        {/* Hero */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold">Om Casino Bonus Hub</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Vi er dedikerede til at hjælpe spillere med at finde de bedste
            casinobonusser med gennemsigtige, upartiske anmeldelser og
            sammenligninger.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold">Vores Mission</h2>
            <p className="mb-4 text-muted-foreground">
              Casino Bonus Hub blev grundlagt med et simpelt mål: at skære
              igennem støjen og hjælpe spillere med at træffe informerede
              beslutninger om online casinobonusser. Vi ved, at det kan være
              overvældende at navigere i verden af casinokampagner med
              komplekse vilkår og betingelser, der ikke altid er lette at forstå.
            </p>
            <p className="text-muted-foreground">
              Derfor gennemgår vores team af eksperter omhyggeligt hver bonus,
              nedbryder de vigtigste detaljer og præsenterer dem i et klart,
              brugervenligt format. Vi mener, at enhver spiller fortjener at
              vide præcis, hvad de tilmelder sig.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold">Hvad Vi Står For</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Gennemsigtighed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Vi forklarer tydeligt alle bonusvilkår, herunder gennemspilskrav,
                  spilrestriktioner og udbetalingsgrænser.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Spilleren Først</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Vores anmeldelser prioriterer spilleroplevelsen med fokus på
                  bonusser, der tilbyder ægte værdi og fair betingelser.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Ekspertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Vores team har mange års erfaring i iGaming-branchen og
                  bringer dyb viden til hver anmeldelse.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Uafhængighed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Vores anmeldelser er upartiske. Vi modtager muligvis provision,
                  men dette påvirker aldrig vores vurderinger eller anbefalinger.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Review Process */}
        <div className="mb-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold">Hvordan Vi Anmelder Casinoer</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  1
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Licens & Sikkerhedstjek</h3>
                  <p className="text-muted-foreground">
                    Vi verificerer, at hvert casino har gyldige licenser fra
                    anerkendte spillemyndigheder og bruger branchestandarder
                    for sikkerhedsforanstaltninger.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  2
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Bonusanalyse</h3>
                  <p className="text-muted-foreground">
                    Vi analyserer grundigt bonusvilkår, gennemspilskrav,
                    spilbidrag og tidsgrænser for at vurdere den reelle værdi
                    for spillere.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  3
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Test af Spilleroplevelse</h3>
                  <p className="text-muted-foreground">
                    Vi tester registreringsprocessen, indbetalingsmetoder,
                    spiludvalg og kundesupport for at sikre en kvalitetsoplevelse.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  4
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Løbende Overvågning</h3>
                  <p className="text-muted-foreground">
                    Vi opdaterer løbende vores anmeldelser for at afspejle
                    ændringer i bonusvilkår, spillerfeedback og casinoets
                    omdømme.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="mx-auto max-w-3xl bg-muted/50">
          <CardContent className="p-6">
            <h3 className="mb-2 font-semibold">Affiliate Oplysning</h3>
            <p className="text-sm text-muted-foreground">
              Casino Bonus Hub modtager muligvis kompensation, når du klikker på
              links til casinoer og/eller opretter en konto. Dette hjælper os med
              at vedligeholde og forbedre vores service. Vores anmeldelser og
              vurderinger er dog altid baseret på vores ærlige vurdering og
              påvirkes aldrig af potentielle provisioner. Vi anbefaler kun
              casinoer, der opfylder vores strenge kvalitetsstandarder.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
