import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, AlertTriangle, ArrowRight } from "lucide-react";

const BonusGuide = () => {
  return (
    <div className="py-16">
      <div className="container">
        {/* Hero */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold">Casino Bonus Guide</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Alt du behøver at vide om casinobonusser, hvordan de fungerer, og
            hvordan du vælger den rigtige til dig.
          </p>
        </div>

        {/* Table of Contents */}
        <Card className="mx-auto mb-16 max-w-2xl">
          <CardHeader>
            <CardTitle>I Denne Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a href="#what-is-bonus" className="text-primary hover:underline">
                  Hvad er en Casinobonus?
                </a>
              </li>
              <li>
                <a href="#bonus-types" className="text-primary hover:underline">
                  Typer af Casinobonusser
                </a>
              </li>
              <li>
                <a href="#no-sticky" className="text-primary hover:underline">
                  Ikke-klæbende Bonusser Forklaret
                </a>
              </li>
              <li>
                <a href="#sticky" className="text-primary hover:underline">
                  Klæbende Bonusser Forklaret
                </a>
              </li>
              <li>
                <a href="#wagering" className="text-primary hover:underline">
                  Forståelse af Gennemspilskrav
                </a>
              </li>
              <li>
                <a href="#tips" className="text-primary hover:underline">
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
                  <h3 className="mb-2 font-semibold">Velkomstbonus</h3>
                  <p className="text-sm text-muted-foreground">
                    Tilbydes til nye spillere ved registrering, ofte med match
                    af din første indbetaling med 100% eller mere.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="mb-2 font-semibold">Bonus Uden Indbetaling</h3>
                  <p className="text-sm text-muted-foreground">
                    Gratis bonus givet uden krav om indbetaling, normalt mindre
                    men uden finansiel risiko.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="mb-2 font-semibold">Gratis Spins</h3>
                  <p className="text-sm text-muted-foreground">
                    Gratis omgange på spilleautomater, ofte inkluderet i
                    velkomstpakker eller som selvstændige tilbud.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="mb-2 font-semibold">Genindbetalingsbonus</h3>
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
            <h2 className="mb-4 text-2xl font-bold">Ikke-klæbende Bonusser Forklaret</h2>
            <Card className="border-primary/50">
              <CardContent className="pt-6">
                <p className="mb-4 text-muted-foreground">
                  En ikke-klæbende bonus (også kaldet "faldskærms" eller "fortabelig"
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
                  ikke-klæbende bonus. Du spiller med din indbetaling på 500 kr.
                  først. Hvis du vinder 2.500 kr., kan du hæve de 2.500 kr.
                  (minus dine oprindelige 500 kr., der blev spillet) uden at røre
                  bonussen. Bonussen fortabes, når du hæver. Hvis du mister din
                  indbetaling, aktiveres bonussen på 500 kr., og du kan fortsætte
                  med at spille.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Sticky */}
          <section id="sticky">
            <h2 className="mb-4 text-2xl font-bold">Klæbende Bonusser Forklaret</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-4 text-muted-foreground">
                  En klæbende bonus (også kaldet "standard" eller "integreret"
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
                      <strong>Vigtigt:</strong> Med klæbende bonusser, hvis du
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
                    1. Foretruk Ikke-klæbende Frem for Klæbende
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Ikke-klæbende bonusser giver dig mere fleksibilitet og lavere
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
            <Button size="lg" asChild>
              <Link to="/#top-casinos">
                Se Top Bonusser <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusGuide;
