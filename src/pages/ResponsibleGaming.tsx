import { AlertTriangle, Phone, Globe, HelpCircle, Shield, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ResponsibleGaming = () => {
  return (
    <div className="py-16">
      <div className="container">
        {/* Hero */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-bold">Ansvarligt Spil</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Spil bør være sjovt og underholdende. Hvis det holder op med at være
            fornøjeligt, er det tid til at stoppe. Her er, hvordan du holder styr
            på tingene.
          </p>
        </div>

        {/* Warning Signs */}
        <Card className="mx-auto mb-16 max-w-3xl border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Advarselstegn på Problematisk Spil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                Bruger flere penge, end du har råd til at tabe
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                Jager tab ved at spille for mere for at vinde det tabte tilbage
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                Låner penge eller sælger ejendele for at spille
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                Forsømmer arbejde, familie eller andre ansvar
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                Føler dig ængstelig, deprimeret eller irritabel, når du ikke spiller
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                Skjuler dine spilleaktiviteter for familie og venner
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Tips Grid */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Tips til at Bevare Kontrollen
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Sæt Tidsgrænser</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Beslut, hvor længe du vil spille, før du starter. Brug
                  casinoets påmindelser om sessionstid og hold dig til din grænse.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Sæt Budgetgrænser</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Spil kun med penge, du har råd til at tabe. Sæt
                  indbetalingsgrænser og forsøg aldrig at vinde tab tilbage.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Tal med Nogen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Hvis du er bekymret over dit spil, så tal med venner, familie
                  eller professionelle støttetjenester.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Self-Exclusion */}
        <div className="mx-auto mb-16 max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold">Selvudelukkelsesmuligheder</h2>
          <p className="mb-6 text-muted-foreground">
            Hvis du har brug for en pause fra spil, tilbyder de fleste anerkendte
            online casinoer selvudelukkelsesmuligheder. Du kan typisk:
          </p>
          <ul className="mb-6 space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              • Tage en afkølingsperiode (24 timer til 30 dage)
            </li>
            <li className="flex items-center gap-2">
              • Selvudelukke i en længere periode (6 måneder til 5 år)
            </li>
            <li className="flex items-center gap-2">
              • Permanent lukke din konto
            </li>
            <li className="flex items-center gap-2">
              • Bruge nationale selvudelukkelsesordninger som ROFUS (Danmark)
            </li>
          </ul>
          <p className="text-muted-foreground">
            Kontakt casinoets kundesupport for at lære om deres specifikke
            værktøjer og muligheder for ansvarligt spil.
          </p>
        </div>

        {/* Help Resources */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Få Hjælp & Støtte
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Globe className="h-6 w-6 text-primary" />
                  <CardTitle>StopSpillet</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Gratis, fortrolig hjælp og støtte til alle, der er bekymrede
                  over deres eget eller andres spil.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <a
                    href="https://www.stopspillet.dk/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Besøg Hjemmeside
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-primary" />
                  <CardTitle>ROFUS</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Register Over Frivilligt Udelukkede Spillere. Udeluk dig selv
                  fra alle danske online casinoer.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <a
                    href="https://www.spillemyndigheden.dk/rofus"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Besøg Hjemmeside
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-6 w-6 text-primary" />
                  <CardTitle>Ludomani</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Center for Ludomani tilbyder gratis behandling og rådgivning
                  til personer med spilleproblemer.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <a
                    href="https://ludomani.dk/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Besøg Hjemmeside
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final Message */}
        <Card className="mx-auto max-w-3xl bg-muted/50">
          <CardContent className="p-8 text-center">
            <h3 className="mb-4 text-xl font-bold">Husk</h3>
            <p className="text-muted-foreground">
              Spil bør altid være en form for underholdning, ikke en måde at
              tjene penge på. Huset har altid en fordel, og på lang sigt vil de
              fleste spillere tabe. Hvis spil nogensinde holder op med at være
              sjovt, så tag en pause. Der er ingen skam i at bede om hjælp.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResponsibleGaming;
