import { Link } from "react-router-dom";
import { Shield, Lock, Eye, FileText, Mail, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
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
                <Shield className="h-12 w-12" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Privatlivspolitik</h1>
            <p className="text-lg text-white/80">
              Sidst opdateret: December 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl space-y-8">
            
            {/* Introduction */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="mb-3 text-2xl font-bold">1. Indledning</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Casinoaftaler.dk (&quot;vi&quot;, &quot;os&quot;, &quot;vores&quot;) respekterer dit privatliv og er forpligtet til at beskytte dine personoplysninger. Denne privatlivspolitik forklarer, hvordan vi indsamler, bruger og beskytter dine oplysninger, når du besøger vores website.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-4 text-2xl font-bold">2. Oplysninger vi indsamler</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="mb-3 text-lg font-semibold text-foreground">Automatisk indsamlede oplysninger:</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            IP-adresse og geografisk placering
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Browser-type og version
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Besøgte sider og klikdata
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Tidspunkt for besøg
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Henvisende websites
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="mb-3 text-lg font-semibold text-foreground">Oplysninger du giver os:</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Kontaktoplysninger (navn, email) når du kontakter os
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Feedback og kommentarer
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Nyhedsbrevstilmelding
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Partner ansøgningsdata
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-4 text-2xl font-bold">3. Hvordan vi bruger dine oplysninger</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    At levere og forbedre vores tjenester
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    At personalisere din oplevelse
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    At sende nyhedsbreve (kun med dit samtykke)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    At svare på dine henvendelser
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    At analysere website-brug og forbedre indhold
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    At overholde juridiske forpligtelser
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-4 text-2xl font-bold">4. Cookies og tracking</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  Vi bruger cookies og lignende teknologier til at:
                </p>
                <ul className="mb-4 space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Huske dine præferencer
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Analysere website-trafik
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Levere relevant indhold
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Spore affiliate-links (for kommission)
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Du kan kontrollere cookies gennem din browser-indstillinger. Bemærk at deaktivering af cookies kan påvirke website-funktionaliteten.
                </p>
              </CardContent>
            </Card>

            {/* Sharing Information */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-4 text-2xl font-bold">5. Deling af oplysninger</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  Vi deler ikke dine personoplysninger med tredjeparter, undtagen:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Med dit udtrykkelige samtykke
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Til vores affiliate-partnere (kun anonymiserede data)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Til tjenesteudbydere der hjælper os (hosting, analytics)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Når det kræves af loven
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    For at beskytte vores rettigheder og sikkerhed
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* GDPR Rights */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-4 text-2xl font-bold">6. Dine rettigheder (GDPR)</h2>
                    <p className="mb-4 text-muted-foreground">Under GDPR har du følgende rettigheder:</p>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-lg bg-muted/50 p-4">
                        <h4 className="font-semibold text-foreground">Adgang</h4>
                        <p className="text-sm text-muted-foreground">Få en kopi af dine personoplysninger</p>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-4">
                        <h4 className="font-semibold text-foreground">Rettelse</h4>
                        <p className="text-sm text-muted-foreground">Få rettet forkerte oplysninger</p>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-4">
                        <h4 className="font-semibold text-foreground">Sletning</h4>
                        <p className="text-sm text-muted-foreground">Få slettet dine oplysninger</p>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-4">
                        <h4 className="font-semibold text-foreground">Begrænsning</h4>
                        <p className="text-sm text-muted-foreground">Begrænse behandlingen af dine data</p>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-4">
                        <h4 className="font-semibold text-foreground">Portabilitet</h4>
                        <p className="text-sm text-muted-foreground">Få dine data i et struktureret format</p>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-4">
                        <h4 className="font-semibold text-foreground">Indsigelse</h4>
                        <p className="text-sm text-muted-foreground">Gøre indsigelse mod behandling</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-4 text-2xl font-bold">7. Datasikkerhed</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vi implementerer passende tekniske og organisatoriske foranstaltninger for at beskytte dine personoplysninger mod uautoriseret adgang, ændring, videregivelse eller ødelæggelse. Dette inkluderer SSL-kryptering, sikre servere og regelmæssige sikkerhedsopdateringer.
                </p>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="mb-3 text-2xl font-bold">8. Opbevaring af data</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Vi opbevarer dine personoplysninger kun så længe det er nødvendigt for de formål, de blev indsamlet til, eller som krævet af loven. Analytics-data anonymiseres efter 26 måneder.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="mb-3 text-2xl font-bold">9. Kontakt os</h2>
                    <p className="mb-4 text-muted-foreground leading-relaxed">
                      Hvis du har spørgsmål om denne privatlivspolitik eller vil udøve dine rettigheder, kan du kontakte os:
                    </p>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong className="text-foreground">Email:</strong> privatliv@casinoaftaler.dk</p>
                      <p><strong className="text-foreground">Adresse:</strong> Casinoaftaler.dk, København, Danmark</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Changes */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-4 text-2xl font-bold">10. Ændringer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vi kan opdatere denne privatlivspolitik fra tid til anden. Ændringer vil blive offentliggjort på denne side med en opdateret dato. Vi opfordrer dig til regelmæssigt at gennemgå denne politik.
                </p>
              </CardContent>
            </Card>

            {/* Back Link */}
            <div className="text-center pt-4">
              <Link 
                to="/" 
                className="text-primary hover:underline"
              >
                ← Tilbage til forsiden
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
