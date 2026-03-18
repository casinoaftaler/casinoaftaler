import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { FileText, Scale, AlertTriangle, Ban, RefreshCw, Gavel, Coins, Gift, CircleDollarSign, ShieldAlert, User, CalendarDays, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SEO } from "@/components/SEO";
import { buildFaqSchema } from "@/lib/seo";
import { getRouteLastmod } from "@/lib/seoRoutes";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import termsHero from "@/assets/heroes/terms-hero.jpg";

const termsFaqs = [
  {
    question: "Er Casinoaftaler.dk et online casino?",
    answer: "Nej, Casinoaftaler.dk er ikke et online casino. Vi er en informations- og formidlingsplatform, der sammenligner og anmelder online casinoer og deres bonustilbud.",
  },
  {
    question: "Hvad sker der, hvis jeg bryder vilkårene?",
    answer: "Brud på vilkårene kan medføre konsekvenser som permanent ban fra websitet, sletning af credits og point, samt fjernelse af al leaderboard-fremgang.",
  },
  {
    question: "Har points på sitet en reel pengeværdi?",
    answer: "Nej, points er en intern, fiktiv valuta uden reel pengeværdi. De kan ikke veksles til kontanter, overføres eller sælges.",
  },
  {
    question: "Skal man være 18 år for at bruge sitet?",
    answer: "Ja, du skal være mindst 18 år for at bruge Casinoaftaler.dk. For at modtage gevinster, præmier eller andre belønninger kræves der også aldersverifikation.",
  },
];

const Terms = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(termsFaqs);
  const routeLastmod = getRouteLastmod("/terms");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Vilkår og Betingelser – Casinoaftaler.dk",
    description: "Læs Casinoaftalers vilkår og betingelser. Her finder du reglerne for brug af vores side, points-systemet, gevinster og affiliate-oplysninger.",
    author: { "@type": "Organization", name: "Casinoaftaler" },
    publisher: { "@type": "Organization", name: "Casinoaftaler" },
    datePublished: "2025-12-01",
    dateModified: routeLastmod,
    mainEntityOfPage: "https://casinoaftaler.dk/terms",
  };

  return (
    <>
      <SEO
        title="Vilkår og Betingelser | Casinoaftaler"
        description="Læs Casinoaftalers vilkår og betingelser. Her finder du reglerne for brug af vores side, points-systemet, gevinster og affiliate-oplysninger."
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
              <Scale className="mr-1.5 h-3.5 w-3.5" />
              Juridisk Information
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Vilkår og Betingelser
            </h1>
            <p className="text-lg text-white/80">
              Reglerne for brug af Casinoaftaler.dk – læs dem, før du bruger vores tjenester.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="redaktionen" readTime="7 Min." showAffiliateDisclaimer={false} />

        {/* Hero image */}
        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={termsHero}
            alt="Vilkår og betingelser – juridisk dokument"
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            1. Generelle vilkår
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Ved at bruge Casinoaftaler.dk accepterer du disse vilkår og betingelser. Hvis du ikke accepterer vilkårene, bedes du undlade at bruge vores website. Vi forbeholder os retten til at ændre disse vilkår når som helst uden forudgående varsel. Det er dit ansvar regelmæssigt at tjekke for opdateringer.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">2. Websitets formål</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Casinoaftaler.dk er en informationsplatform, der sammenligner og anmelder <Link to="/top-10-casino-online" className="text-primary hover:underline font-medium">online casinoer</Link> og deres bonustilbud. Vores formål er at:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Give objektive og opdaterede oplysninger om <Link to="/casino-bonus" className="text-primary hover:underline">casinobonusser</Link></li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Hjælpe brugere med at træffe informerede beslutninger</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Fremme <Link to="/ansvarligt-spil" className="text-primary hover:underline">ansvarligt spil</Link></li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Levere uddannelsesmæssigt indhold om gambling</li>
          </ul>
        </section>

        <Separator className="my-10" />

        {/* Section 3 - Age */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-destructive">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-destructive/10 p-3">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-bold">3. Aldersbegrænsning</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Du skal være mindst 18 år for at bruge dette website.</strong> Online gambling er kun lovligt for personer over 18 år i Danmark. Vi opfordrer til ansvarligt spil og anbefaler, at du sætter grænser for dit forbrug og tid brugt på gambling.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Section 4 - Points & Gevinster */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Coins className="h-8 w-8 text-primary" />
            4. Points & Gevinster
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-xl font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Alderskrav
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                For at kunne modtage gevinster, præmier eller andre belønninger via casinoaftaler.dk skal du være minimum 18 år. Dette krav gælder uden undtagelse og er i overensstemmelse med gældende dansk lovgivning. Casinoaftaler.dk forbeholder sig retten til at anmode om aldersverifikation, før eventuelle gevinster udbetales.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold flex items-center gap-2">
                <CircleDollarSign className="h-5 w-5 text-primary" />
                Points
              </h3>
              <p className="mb-3 text-muted-foreground leading-relaxed">
                Points på casinoaftaler.dk er en intern, fiktiv valuta, som udelukkende anvendes inden for platformen til ranglister, konkurrencer og belønningssystemer.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Points har ingen reel pengeværdi</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Points kan ikke veksles til kontanter</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Points kan ikke hæves, overføres eller sælges</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Points kan kun bruges i de sammenhænge, der er beskrevet på sitet</li>
              </ul>
              <p className="mt-3 text-muted-foreground leading-relaxed italic">
                Points er alene et underholdnings- og motivationsværktøj og må ikke opfattes som penge, kredit eller en finansiel værdi.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                Gevinster
              </h3>
              <p className="mb-3 text-muted-foreground leading-relaxed">
                Eventuelle gevinster, præmier eller belønninger er underlagt alderskravet, de gældende vilkår og betingelser samt eventuelle krav fra samarbejdspartnere.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Casinoaftaler.dk er ikke et online casino</strong>, men fungerer som en informations- og formidlingsplatform for casinoaftaler og kampagner.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">5. Affiliate-oplysning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Casinoaftaler.dk er en affiliate-partner med de casinoer, vi anmelder og anbefaler. Vi modtager kommission, når brugere tilmelder sig via vores links. Vores anmeldelser er dog uafhængige og baseret på objektive kriterier. Vi anbefaler kun licenserede og regulerede casinoer med gyldig <Link to="/spillemyndigheden" className="text-primary hover:underline font-medium">dansk licens</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Section 6 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Ban className="h-8 w-8 text-primary" />
            6. Ansvarsfraskrivelse
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Informationen på dette website er kun til generel vejledning. Vi garanterer ikke for fuldstændigheden eller nøjagtigheden. Bonusvilkår kan ændres uden varsel af casinoerne, og du bør altid verificere vilkår direkte hos casinoet. Vi er ikke ansvarlige for tab relateret til gambling.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Section 7 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">7. Immaterielle rettigheder</h2>
          <p className="text-muted-foreground leading-relaxed">
            Alt indhold på Casinoaftaler.dk, herunder tekst, grafik, logoer, billeder og software, er beskyttet af ophavsret og tilhører Casinoaftaler.dk eller vores licensgivere. Du må ikke kopiere, distribuere, modificere eller gengive vores indhold uden skriftlig tilladelse.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Section 8 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">8. Brugeradfærd</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Ved brug af vores website accepterer du at:</p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Ikke misbruge eller forsøge at hacke websitet</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Ikke bruge automatiserede værktøjer til at indsamle data</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Ikke uploade skadeligt indhold eller malware</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Overholde alle gældende love og regler</li>
          </ul>
        </section>

        <Separator className="my-10" />

        {/* Section 9 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">9. Tredjepartslinks</h2>
          <p className="text-muted-foreground leading-relaxed">
            Vores website indeholder links til eksterne casinoer og andre tredjeparter. Vi er ikke ansvarlige for indholdet eller praksis på disse websites. Når du forlader Casinoaftaler.dk, opfordrer vi dig til at læse vilkårene for den pågældende side.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Section 10 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <RefreshCw className="h-8 w-8 text-primary" />
            10. Ændringer af vilkår
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Vi forbeholder os retten til at ændre disse vilkår når som helst. Ændringer træder i kraft ved offentliggørelse på denne side. Din fortsatte brug af websitet efter ændringer udgør accept af de nye vilkår.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Section 11 */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gavel className="h-8 w-8 text-primary" />
            11. Lovvalg og værneting
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Disse vilkår er underlagt dansk ret. Eventuelle tvister skal afgøres ved de danske domstole. Ved at bruge dette website accepterer du denne jurisdiktion.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Section 12 - Fair Play */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-destructive">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-destructive/10 p-3">
                  <ShieldAlert className="h-6 w-6 text-destructive" />
                </div>
                <div className="flex-1">
                  <h2 className="mb-4 text-2xl font-bold">12. Fair Play & Exploits</h2>
                  <p className="mb-3 text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Casinoaftaler.dk står for fair play i alle spil og konkurrencer.</strong> Brugere er forpligtet til at rapportere eventuelle fejl, bugs eller exploits til administratorerne hurtigst muligt. Bevidst udnyttelse af exploits betragtes som et brud på disse vilkår.
                  </p>
                  <p className="mb-3 text-muted-foreground font-semibold text-foreground">Konsekvenser kan omfatte:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-destructive" />Permanent ban fra websitet</li>
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-destructive" />Ban fra Twitch-kanalen</li>
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-destructive" />Sletning af alle credits og point</li>
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-destructive" />Fjernelse af al leaderboard-fremgang</li>
                  </ul>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    Administratorerne forbeholder sig retten til at diskvalificere brugere, der bevidst udnytter exploits. <strong className="text-foreground">Denne afgørelse er endelig og kan ikke ankes.</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* FAQ */}
        <FAQSection faqs={termsFaqs} title="Ofte stillede spørgsmål om vilkår og betingelser" />

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
              { to: "/betalingsmetoder", title: "Betalingsmetoder" },
            ].map((item) => (
              <Link key={item.to} to={item.to} className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium transition-colors hover:bg-muted">
                {item.title}
              </Link>
            ))}
          </div>
        </section>

        {/* Related Guides */}
        <RelatedGuides currentPath="/terms" />
      </div>
    </>
  );
};

export default Terms;