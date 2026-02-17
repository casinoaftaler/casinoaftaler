import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AuthorBio } from "@/components/AuthorBio";
import {
  Banknote,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Scale,
  Users,
  Search,
  FileText,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { RelatedGuides } from "@/components/RelatedGuides";
import { buildArticleSchema } from "@/lib/seo";

const Forretningsmodel = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const articleJsonLd = buildArticleSchema({
    headline: "Forretningsmodel – Sådan finansieres Casinoaftaler.dk",
    description: "Forstå hvordan Casinoaftaler.dk finansieres gennem affiliate-partnerskaber, og hvorfor vores anmeldelser forbliver uafhængige.",
    url: "https://casinoaftaler.dk/forretningsmodel",
    datePublished: "2025-06-01",
    dateModified: "2026-02-15",
    authorName: "Kevin",
    authorUrl: "https://casinoaftaler.dk/forfatter/kevin",
  });

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: "https://casinoaftaler.dk/" },
      { "@type": "ListItem", position: 2, name: "Forretningsmodel", item: "https://casinoaftaler.dk/forretningsmodel" },
    ],
  };

  const principles = [
    { icon: Scale, title: "Redaktionel uafhængighed", desc: "Vores vurderinger bygger på faste kriterier og reel test. Kommercielle samarbejder påvirker aldrig vores scoring eller anbefalinger." },
    { icon: ShieldCheck, title: "Gennemsigtighed", desc: "Vi oplyser tydeligt om alle bonusvilkår, betingelser og potentielle interessekonflikter." },
    { icon: Search, title: "Systematisk testning", desc: "Hvert casino testes med reel registrering, indbetaling og gameplay – ikke skrivebordsvurdering." },
    { icon: Users, title: "Community først", desc: "Vores community er vores fundament. Vi prioriterer altid brugernes interesser over kommercielle hensyn." },
  ];

  return (
    <>
      <SEO
        title="Forretningsmodel – Sådan finansieres Casinoaftaler.dk"
        description="Forstå hvordan Casinoaftaler.dk finansieres gennem affiliate-partnerskaber, og hvorfor vores anmeldelser forbliver uafhængige og troværdige."
        jsonLd={[articleJsonLd, breadcrumbJsonLd]}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 18% / 0.97), hsl(210 80% 22% / 0.95)), url(${heroBackgroundImage})`
            : "linear-gradient(135deg, hsl(260 70% 18%), hsl(250 60% 15%) 40%, hsl(210 80% 20%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Banknote className="mr-1.5 h-3.5 w-3.5" />
              Transparens
            </Badge>
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
              Forretningsmodel
            </h1>
            <p className="text-lg text-white/80">
              Sådan finansieres Casinoaftaler.dk – og hvorfor det ikke påvirker vores anmeldelser.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-10 md:py-14">
        <AuthorMetaBar author="kevin" date="2026-02-15" readTime="5 min" />

        {/* Hvad er affiliate-marketing */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Banknote className="h-7 w-7 text-primary" />
            Hvad er affiliate-marketing?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Casinoaftaler.dk finansieres primært gennem affiliate-partnerskaber med udvalgte online casinoer. 
            Det betyder, at vi modtager en kommission, når en bruger opretter en konto via vores links og 
            begynder at spille.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Affiliate-marketing er en udbredt forretningsmodel i branchen og gør det muligt for os at 
            drive en uafhængig platform uden at opkræve betaling fra vores brugere. Vi kan dermed tilbyde 
            gratis adgang til alle vores anmeldelser, guides og sammenligninger.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det er vigtigt at understrege, at vores læsere aldrig betaler mere for at bruge et casino 
            via vores links. Kommissionen betales af casinoet – ikke af brugeren.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Hvordan påvirker det vores anmeldelser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Påvirker det vores anmeldelser?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Nej. Vores redaktionelle vurderinger er fuldstændig uafhængige af vores kommercielle 
            samarbejder. Vi har etableret klare retningslinjer, der sikrer adskillelse mellem 
            affiliate-indtægter og redaktionelt indhold.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((p) => (
              <Card key={p.title} className="border-border bg-card">
                <CardContent className="p-6">
                  <p.icon className="mb-3 h-6 w-6 text-primary" />
                  <h3 className="mb-2 font-semibold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Hvordan vi vurderer casinoer */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Search className="h-7 w-7 text-primary" />
            Hvad bygger vores vurderinger på?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Alle casinoer på Casinoaftaler.dk vurderes efter faste, dokumenterede kriterier – uanset 
            om vi har et affiliate-samarbejde med dem eller ej. Vores testmetode inkluderer:
          </p>
          <div className="rounded-xl border border-border bg-card p-6">
            {[
              "Reel registrering og indbetaling",
              "Test af bonusvilkår og omsætningskrav",
              "Vurdering af spiludvalg og software",
              "Analyse af udbetalingshastighed",
              "Evaluering af kundeservice",
              "Gennemgang af licensforhold og sikkerhed",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 py-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/saadan-tester-vi-casinoer">
              <Button variant="outline" size="sm">
                <ShieldCheck className="mr-1.5 h-4 w-4" />
                Læs om vores testmetode
              </Button>
            </Link>
            <Link to="/redaktionel-politik">
              <Button variant="outline" size="sm">
                <FileText className="mr-1.5 h-4 w-4" />
                Redaktionel politik
              </Button>
            </Link>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Vores løfte */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Vores løfte til dig
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vi forpligter os til altid at være gennemsigtige om vores forretningsmodel og de 
            samarbejder, vi indgår. Hvis et casino ikke lever op til vores standarder, vil vi aldrig 
            anbefale det – uanset potentiel indtægt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vores mål er at være den mest troværdige kilde til casino-information i Danmark. Det 
            kræver, at vi prioriterer vores læseres tillid over alt andet.
          </p>
        </section>

        <AuthorBio author="jonas" showCommunity={false} />

        <RelatedGuides currentPath="/forretningsmodel" maxLinks={5} />
      </div>
    </>
  );
};

export default Forretningsmodel;
