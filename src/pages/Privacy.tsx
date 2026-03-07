import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { Shield, Lock, Eye, FileText, Calendar, User, CalendarDays, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SEO } from "@/components/SEO";
import { buildFaqSchema } from "@/lib/seo";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import privacyHero from "@/assets/heroes/privacy-hero.jpg";

const privacyFaqs = [
  {
    question: "Hvilke oplysninger indsamler Casinoaftaler.dk?",
    answer: "Vi indsamler automatisk data som IP-adresse, browsertype, besøgte sider og tidspunkt for besøg. Derudover indsamler vi oplysninger, du frivilligt giver os, som kontaktoplysninger ved henvendelser og nyhedsbrevstilmelding.",
  },
  {
    question: "Deler I mine data med tredjeparter?",
    answer: "Vi deler ikke personoplysninger med tredjeparter, medmindre det sker med dit samtykke, til anonymiserede affiliate-data, til tjenesteudbydere (hosting, analytics) eller når det kræves af loven.",
  },
  {
    question: "Hvilke rettigheder har jeg under GDPR?",
    answer: "Du har ret til adgang, rettelse, sletning, begrænsning, portabilitet og indsigelse mod behandling af dine personoplysninger. Kontakt os for at udøve dine rettigheder.",
  },
  {
    question: "Hvor længe opbevarer I mine data?",
    answer: "Vi opbevarer personoplysninger kun så længe det er nødvendigt for formålet. Analytics-data anonymiseres efter 26 måneder.",
  },
];

const Privacy = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(privacyFaqs);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Privatlivspolitik – Casinoaftaler.dk",
    description: "Læs Casinoaftalers privatlivspolitik. Vi beskytter dine persondata og forklarer, hvordan vi indsamler og behandler oplysninger i overensstemmelse med GDPR.",
    author: { "@type": "Organization", name: "Casinoaftaler" },
    publisher: { "@type": "Organization", name: "Casinoaftaler" },
    datePublished: "2025-12-01",
    dateModified: "2026-02-14",
    mainEntityOfPage: "https://casinoaftaler.dk/privatlivspolitik",
  };

  return (
    <>
      <SEO
        title="Privatlivspolitik | Casinoaftaler"
        description="Læs Casinoaftalers privatlivspolitik. Vi beskytter dine persondata og forklarer, hvordan vi indsamler og behandler oplysninger i overensstemmelse med GDPR."
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
              <Shield className="mr-1.5 h-3.5 w-3.5" />
              Databeskyttelse & GDPR
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Privatlivspolitik
            </h1>
            <p className="text-lg text-white/80">
              Sådan indsamler, bruger og beskytter vi dine personoplysninger på Casinoaftaler.dk.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="redaktionen" date="14-02-2026" readTime="5 Min." showAffiliateDisclaimer={false} />

        {/* Hero image */}
        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={privacyHero}
            alt="Privatlivspolitik og databeskyttelse"
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            1. Indledning
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Casinoaftaler.dk (&quot;vi&quot;, &quot;os&quot;, &quot;vores&quot;) respekterer dit privatliv og er forpligtet til at beskytte dine personoplysninger. Denne privatlivspolitik forklarer, hvordan vi indsamler, bruger og beskytter dine oplysninger, når du besøger vores website. Vi overholder den generelle databeskyttelsesforordning (GDPR) og dansk lovgivning om persondata. Som bruger af vores platform kan du altid kontakte os med spørgsmål om, hvordan dine data behandles.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Eye className="h-8 w-8 text-primary" />
            2. Oplysninger vi indsamler
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Vi indsamler to typer af oplysninger: automatisk indsamlede data og oplysninger, du selv giver os. Alle data behandles i overensstemmelse med GDPR og anvendes kun til de formål, der er beskrevet nedenfor.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold text-foreground">Automatisk indsamlede oplysninger</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />IP-adresse og geografisk placering</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Browser-type og version</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Besøgte sider og klikdata</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Tidspunkt for besøg</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Henvisende websites</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold text-foreground">Oplysninger du giver os</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Kontaktoplysninger (navn, email)</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Feedback og kommentarer</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Nyhedsbrevstilmelding</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Partner ansøgningsdata</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">3. Hvordan vi bruger dine oplysninger</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi bruger de indsamlede oplysninger til følgende formål, som alle har et legitimt grundlag under GDPR:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />At levere og forbedre vores tjenester</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />At personalisere din oplevelse</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />At sende nyhedsbreve (kun med dit samtykke)</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />At svare på dine henvendelser</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />At analysere website-brug og forbedre indhold</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />At overholde juridiske forpligtelser</li>
          </ul>
        </section>

        <Separator className="my-10" />

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">4. Cookies og tracking</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi bruger cookies og lignende teknologier til at huske dine præferencer, analysere website-trafik, levere relevant indhold og spore affiliate-links. Du kan kontrollere cookies gennem din browsers indstillinger. Bemærk at deaktivering af cookies kan påvirke website-funktionaliteten. Læs mere i vores <Link to="/cookies" className="text-primary hover:underline font-medium">cookiepolitik</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">5. Deling af oplysninger</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi deler ikke dine personoplysninger med tredjeparter, undtagen i følgende tilfælde:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Med dit udtrykkelige samtykke</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Til vores affiliate-partnere (kun anonymiserede data)</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Til tjenesteudbydere der hjælper os (hosting, analytics)</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Når det kræves af loven</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />For at beskytte vores rettigheder og sikkerhed</li>
          </ul>
        </section>

        <Separator className="my-10" />

        {/* Section 6 - GDPR */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Lock className="h-8 w-8 text-primary" />
            6. Dine rettigheder (GDPR)
          </h2>
          <p className="mb-6 text-muted-foreground">Under GDPR har du følgende rettigheder:</p>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Adgang", desc: "Få en kopi af dine personoplysninger" },
              { title: "Rettelse", desc: "Få rettet forkerte oplysninger" },
              { title: "Sletning", desc: "Få slettet dine oplysninger" },
              { title: "Begrænsning", desc: "Begrænse behandlingen af dine data" },
              { title: "Portabilitet", desc: "Få dine data i et struktureret format" },
              { title: "Indsigelse", desc: "Gøre indsigelse mod behandling" },
            ].map((right) => (
              <Card key={right.title} className="border-border bg-card">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-foreground">{right.title}</h4>
                  <p className="text-sm text-muted-foreground">{right.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Section 7 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">7. Datasikkerhed</h2>
          <p className="text-muted-foreground leading-relaxed">
            Vi implementerer passende tekniske og organisatoriske foranstaltninger for at beskytte dine personoplysninger mod uautoriseret adgang, ændring, videregivelse eller ødelæggelse. Dette inkluderer SSL-kryptering, sikre servere og regelmæssige sikkerhedsopdateringer. Vores medarbejdere er underlagt tavshedspligt og har kun adgang til data, der er nødvendige for deres arbejde.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Section 8 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Calendar className="h-8 w-8 text-primary" />
            8. Opbevaring af data
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Vi opbevarer dine personoplysninger kun så længe det er nødvendigt for de formål, de blev indsamlet til, eller som krævet af loven. Analytics-data anonymiseres efter 26 måneder. Kontaktformulardata opbevares i op til 12 måneder efter den seneste kommunikation.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Section 9 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">9. Ændringer</h2>
          <p className="text-muted-foreground leading-relaxed">
            Vi kan opdatere denne privatlivspolitik fra tid til anden. Ændringer vil blive offentliggjort på denne side med en opdateret dato. Vi opfordrer dig til regelmæssigt at gennemgå denne politik for at holde dig informeret om, hvordan vi beskytter dine data.
          </p>
        </section>

        <Separator className="my-10" />

        {/* FAQ */}
        <FAQSection faqs={privacyFaqs} title="Ofte stillede spørgsmål om privatlivspolitik" />

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
              { to: "/ordbog", title: "Casino Ordbog" },
              { to: "/live-casino", title: "Live Casino" },
            ].map((item) => (
              <Link key={item.to} to={item.to} className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium transition-colors hover:bg-muted">
                {item.title}
              </Link>
            ))}
          </div>
        </section>

        {/* Related Guides */}
        <RelatedGuides currentPath="/privatlivspolitik" />
      </div>
    </>
  );
};

export default Privacy;