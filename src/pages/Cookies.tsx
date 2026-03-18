import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { Cookie, Settings, BarChart3, Share2, Shield, ToggleLeft, User, CalendarDays, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SEO } from "@/components/SEO";
import { buildFaqSchema } from "@/lib/seo";
import { getRouteLastmod } from "@/lib/seoRoutes";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import cookiesHero from "@/assets/heroes/cookies-hero.jpg";

const cookieFaqs = [
...
const Terms = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(cookieFaqs);
  const routeLastmod = getRouteLastmod("/cookies");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Cookiepolitik – Casinoaftaler.dk",
    description: "Læs om Casinoaftalers brug af cookies. Vi forklarer, hvilke cookies vi bruger, og hvordan du administrerer dine præferencer.",
    author: { "@type": "Organization", name: "Casinoaftaler" },
    publisher: { "@type": "Organization", name: "Casinoaftaler" },
    datePublished: "2025-12-01",
    dateModified: routeLastmod,
    mainEntityOfPage: "https://casinoaftaler.dk/cookies",
  };

  return (
    <>
      <SEO
        title="Cookiepolitik | Casinoaftaler"
        description="Læs om Casinoaftalers brug af cookies. Vi forklarer, hvilke cookies vi bruger, og hvordan du administrerer dine præferencer."
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Cookie className="mr-1.5 h-3.5 w-3.5" />
              Cookies & Tracking
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Cookiepolitik
            </h1>
            <p className="text-lg text-white/80">
              Sådan bruger vi cookies og tracking-teknologier på Casinoaftaler.dk.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="redaktionen" date="14-02-2026" readTime="4 Min." showAffiliateDisclaimer={false} />

        {/* Hero image */}
        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={cookiesHero}
            alt="Cookiepolitik og digital tracking"
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Cookie className="h-8 w-8 text-primary" />
            1. Hvad er cookies?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Cookies er små tekstfiler, der gemmes på din computer eller mobilenhed, når du besøger et website. De hjælper websitet med at huske dine præferencer og forbedre din brugeroplevelse. Cookies kan være &quot;session cookies&quot; (slettes når du lukker browseren) eller &quot;persistent cookies&quot; (forbliver på din enhed i en bestemt periode). Cookies er en standardteknologi, der bruges af næsten alle moderne websites.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8 text-primary" />
            2. Hvordan vi bruger cookies
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Casinoaftaler.dk bruger cookies til følgende formål:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />At sikre websitets grundlæggende funktionalitet</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />At huske dine præferencer (f.eks. tema-indstillinger)</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />At analysere, hvordan besøgende bruger vores website</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />At spore affiliate-links for at modtage kommission</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />At forbedre websitets ydeevne og indhold</li>
          </ul>
        </section>

        <Separator className="my-10" />

        {/* Section 3 - Types */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">3. Typer af cookies vi bruger</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Nødvendige cookies</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Essentielle for websitets funktion. Uden disse kan websitet ikke fungere korrekt. De gemmer ingen personligt identificerbare oplysninger.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Præference cookies</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Gør det muligt at huske dine valg som sprog, region og visuelle indstillinger for at give dig en personlig oplevelse.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Statistik cookies</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Hjælper os med at forstå, hvordan besøgende interagerer med websitet ved at indsamle og rapportere anonyme oplysninger.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Marketing cookies</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Bruges til at spore besøgende på tværs af websites for at vise relevante annoncer og måle affiliate-kampagners effektivitet.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">4. Tredjepartscookies</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi bruger tjenester fra tredjeparter, som kan sætte deres egne cookies:
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-foreground">Google Analytics</h4>
                <p className="text-sm text-muted-foreground">Til analyse af websitetrafik og brugeradfærd</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-foreground">Affiliate-netværk</h4>
                <p className="text-sm text-muted-foreground">Til sporing af henvisninger til casinopartnere</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-foreground">Hosting-udbyder</h4>
                <p className="text-sm text-muted-foreground">Til sikkerhed og ydeevneoptimering</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ToggleLeft className="h-8 w-8 text-primary" />
            5. Administrer dine cookies
          </h2>
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
        </section>

        <Separator className="my-10" />

        {/* Section 6 - Duration table */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">6. Cookievarighed</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Vores cookies har forskellige levetider:</p>
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-3 text-left font-semibold text-foreground">Cookie-type</th>
                      <th className="pb-3 text-left font-semibold text-foreground">Varighed</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-3">Session cookies</td><td className="py-3">Slettes ved lukning af browser</td></tr>
                    <tr className="border-b border-border/50"><td className="py-3">Præference cookies</td><td className="py-3">Op til 1 år</td></tr>
                    <tr className="border-b border-border/50"><td className="py-3">Analytics cookies</td><td className="py-3">Op til 26 måneder</td></tr>
                    <tr><td className="py-3">Affiliate cookies</td><td className="py-3">30-90 dage</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Section 7 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">7. Opdateringer af denne politik</h2>
          <p className="text-muted-foreground leading-relaxed">
            Vi kan opdatere denne cookiepolitik fra tid til anden for at afspejle ændringer i vores praksis eller af andre operationelle, juridiske eller regulatoriske årsager. Vi opfordrer dig til regelmæssigt at gennemgå denne side for at holde dig informeret.
          </p>
        </section>

        <Separator className="my-10" />

        {/* FAQ */}
        <FAQSection faqs={cookieFaqs} title="Ofte stillede spørgsmål om cookies" />

        <Separator className="my-10" />

        {/* Hub-links for equity distribution */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Udforsk Casinoaftaler.dk</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { to: "/casino-bonus", title: "Casino Bonus Guide" },
              { to: "/casinoer", title: "Alle Casinoer" },
              { to: "/nye-casinoer", title: "Nye Casinoer" },
              { to: "/casinospil", title: "Casinospil" },
              { to: "/spiludviklere", title: "Spiludviklere" },
              { to: "/ordbog", title: "Casino Ordbog" },
            ].map((item) => (
              <Link key={item.to} to={item.to} className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium transition-colors hover:bg-muted">
                {item.title}
              </Link>
            ))}
          </div>
        </section>

        {/* Related Guides */}
        <RelatedGuides currentPath="/cookies" />
      </div>
    </>
  );
};

export default Terms;