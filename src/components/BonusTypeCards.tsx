import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";

export function BonusTypeCards() {
  return (
    <section className="py-12">
      <div>
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">🎁 Forstå Bonustyper</h2>
          <p className="max-w-2xl text-muted-foreground">
            Ikke alle casinobonusser er skabt lige. Lær forskellen mellem de
            vigtigste bonustyper for at træffe informerede beslutninger.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* No-Sticky Bonus Card */}
          <Card className="border-primary/50">
            <CardHeader>
              <div className="mb-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Anbefalet
              </div>
              <CardTitle className="text-2xl">No-Sticky Bonus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Med en no-sticky bonus holdes dine rigtige penge og
                bonusmidler adskilt. Du kan hæve dine rigtige pengegevinster
                når som helst uden at miste bonussen.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Hæv rigtige penge når som helst</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Lavere risiko for spillere</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Bonus bruges efter rigtige penge</span>
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link to="/no-sticky-bonus">
                  Læs Mere <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Sticky Bonus Card */}
          <Card>
            <CardHeader>
              <div className="mb-2 inline-flex rounded-full bg-muted px-3 py-1 text-sm font-medium">
                Traditionel
              </div>
              <CardTitle className="text-2xl">Sticky Bonus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                En sticky bonus kombinerer din indbetaling og bonus til én
                saldo. Du skal opfylde gennemspilskravene, før udbetalinger er
                mulige.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <X className="h-5 w-5 text-destructive" />
                  <span>Kan ikke hæve før gennemspil er fuldført</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Ofte større bonusbeløb</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>God til længere spillesessioner</span>
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link to="/sticky-bonus">
                  Læs Mere <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Cashback Bonus Card */}
          <Card>
            <CardHeader>
              <div className="mb-2 inline-flex rounded-full bg-muted px-3 py-1 text-sm font-medium">
                Tabsreduktion
              </div>
              <CardTitle className="text-2xl">Cashback Bonus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Med en cashback bonus får du en procentdel af dine nettotab
                tilbage – typisk 5-15% ugentligt eller månedligt. Ideel for
                aktive spillere med højt volume.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Ofte ingen omsætningskrav</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Automatisk aktivering</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Reducerer effektivt nettotab</span>
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link to="/cashback-bonus">
                  Læs Mere <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Reload Bonus Card */}
          <Card>
            <CardHeader>
              <div className="mb-2 inline-flex rounded-full bg-muted px-3 py-1 text-sm font-medium">
                Tilbagevendende
              </div>
              <CardTitle className="text-2xl">Reload Bonus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Reload-bonusser gives ved gentagne indbetalinger efter din
                første. De har typisk lavere matchprocent men også lavere
                omsætningskrav – og kan bruges igen og igen.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Gentagen bonusværdi over tid</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Lavere omsætningskrav end velkomst</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Ideel til aktive spillere</span>
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link to="/reload-bonus">
                  Læs Mere <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
