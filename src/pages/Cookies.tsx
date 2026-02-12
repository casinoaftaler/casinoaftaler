import { Link } from "react-router-dom";
import { Cookie, Settings, BarChart3, Share2, Shield, ToggleLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

const Cookies = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Cookiepolitik | Casinoaftaler"
        description="Læs om Casinoaftalers brug af cookies. Vi forklarer, hvilke cookies vi bruger, og hvordan du administrerer dine præferencer."
      />
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
                <Cookie className="h-12 w-12" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Cookiepolitik</h1>
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
                    <Cookie className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="mb-3 text-2xl font-bold">1. Hvad er cookies?</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Cookies er små tekstfiler, der gemmes på din computer eller mobilenhed, når du besøger et website. De hjælper websitet med at huske dine præferencer og forbedre din brugeroplevelse. Cookies kan være &quot;session cookies&quot; (slettes når du lukker browseren) eller &quot;persistent cookies&quot; (forbliver på din enhed i en bestemt periode).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Cookies */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-4 text-2xl font-bold">2. Hvordan vi bruger cookies</h2>
                    <p className="mb-4 text-muted-foreground leading-relaxed">
                      Casinoaftaler.dk bruger cookies til følgende formål:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        At sikre websitets grundlæggende funktionalitet
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        At huske dine præferencer (f.eks. tema-indstillinger)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        At analysere, hvordan besøgende bruger vores website
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        At spore affiliate-links for at modtage kommission
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        At forbedre websitets ydeevne og indhold
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Types of Cookies */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-6 text-2xl font-bold">3. Typer af cookies vi bruger</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-border bg-muted/30 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Nødvendige cookies</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Essentielle for websitets funktion. Uden disse kan websitet ikke fungere korrekt. De gemmer ingen personligt identificerbare oplysninger.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Præference cookies</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Gør det muligt at huske dine valg som sprog, region og visuelle indstillinger for at give dig en personlig oplevelse.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Statistik cookies</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Hjælper os med at forstå, hvordan besøgende interagerer med websitet ved at indsamle og rapportere anonyme oplysninger.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Share2 className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Marketing cookies</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Bruges til at spore besøgende på tværs af websites for at vise relevante annoncer og måle affiliate-kampagners effektivitet.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third Party Cookies */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-4 text-2xl font-bold">4. Tredjepartscookies</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  Vi bruger tjenester fra tredjeparter, som kan sætte deres egne cookies:
                </p>
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <h4 className="font-semibold text-foreground">Google Analytics</h4>
                    <p className="text-sm text-muted-foreground">Til analyse af websitetrafik og brugeradfærd</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <h4 className="font-semibold text-foreground">Affiliate-netværk</h4>
                    <p className="text-sm text-muted-foreground">Til sporing af henvisninger til casinopartnere</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <h4 className="font-semibold text-foreground">Hosting-udbyder</h4>
                    <p className="text-sm text-muted-foreground">Til sikkerhed og ydeevneoptimering</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Managing Cookies */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <ToggleLeft className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-4 text-2xl font-bold">5. Administrer dine cookies</h2>
                    <p className="mb-4 text-muted-foreground leading-relaxed">
                      Du kan kontrollere og slette cookies gennem din browsers indstillinger. Her er links til instruktioner for populære browsere:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <a href="https://support.mozilla.org/da/kb/slet-cookies-fjerne-oplysninger-websteder-har-gemt" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <a href="https://support.apple.com/da-dk/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <a href="https://support.microsoft.com/da-dk/microsoft-edge/slet-cookies-i-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a>
                      </li>
                    </ul>
                    <p className="mt-4 text-sm text-muted-foreground">
                      <strong className="text-foreground">Bemærk:</strong> Hvis du deaktiverer cookies, kan nogle funktioner på vores website muligvis ikke fungere korrekt.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cookie Duration */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-4 text-2xl font-bold">6. Cookievarighed</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  Vores cookies har forskellige levetider:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="pb-3 text-left font-semibold text-foreground">Cookie-type</th>
                        <th className="pb-3 text-left font-semibold text-foreground">Varighed</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border/50">
                        <td className="py-3">Session cookies</td>
                        <td className="py-3">Slettes ved lukning af browser</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3">Præference cookies</td>
                        <td className="py-3">Op til 1 år</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3">Analytics cookies</td>
                        <td className="py-3">Op til 26 måneder</td>
                      </tr>
                      <tr>
                        <td className="py-3">Affiliate cookies</td>
                        <td className="py-3">30-90 dage</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-4 text-2xl font-bold">7. Opdateringer af denne politik</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vi kan opdatere denne cookiepolitik fra tid til anden for at afspejle ændringer i vores praksis eller af andre operationelle, juridiske eller regulatoriske årsager. Vi opfordrer dig til regelmæssigt at gennemgå denne side for at holde dig informeret.
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

export default Cookies;
