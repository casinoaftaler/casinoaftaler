import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  AlertTriangle,
  Ban,
  Lock,
  Scale,
  Eye,
  XCircle,
  Shield,
  Gavel,
  FileWarning,
  Users,
  Heart,
  CheckCircle2,
  Banknote,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";
import { ReviewMoneyLinks } from "@/components/ReviewMoneyLinks";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import type { ReactNode } from "react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er ROFUS, og hvad betyder det for online casino?",
    answer: (
      <>
        <Link to="/ansvarligt-spil/rofus" className={linkClass}>ROFUS</Link> (Register Over Frivilligt Udelukkede Spillere) er det danske register, hvor spillere kan udelukke sig selv fra alle casinoer med <Link to="/casino-med-dansk-licens" className={linkClass}>dansk licens</Link>. Registrering i ROFUS blokerer adgang til alle danske online casinoer i den valgte periode (1 måned, 3 måneder, 6 måneder eller permanent). Det er et værktøj til <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
      </>
    ),
  },
  {
    question: "Er det lovligt at spille på casino uden ROFUS i Danmark?",
    answer: "Teknisk set er det ikke ulovligt for spilleren at spille hos udenlandske casinoer uden ROFUS. Dog er det ulovligt for casinoer uden dansk licens at markedsføre sig mod danske spillere. Spillemyndigheden kan blokere adgangen til sådanne sider via danske internetudbydere. Gevinster fra ulicenserede casinoer er desuden skattepligtige, modsat skattefrie gevinster fra danske licenserede casinoer.",
  },
  {
    question: "Hvilke risici er der ved at spille casino uden ROFUS?",
    answer: (
      <>
        De primære risici inkluderer: ingen <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighed</Link>-beskyttelse, beskatning af gevinster (op til 52%), ingen klageinstans ved tvister, risiko for svindel, manglende ROFUS-beskyttelse for sårbare spillere, potentielt blokerede sider og ingen garanti for udbetalinger. Vi anbefaler kun at spille hos casinoer med <Link to="/casino-med-dansk-licens" className={linkClass}>gyldig dansk licens</Link>.
      </>
    ),
  },
  {
    question: "Hvorfor søger folk efter casino uden ROFUS?",
    answer: (
      <>
        Der er primært tre årsager: 1) Spillere der har udelukket sig via ROFUS men ønsker at spille videre (et tegn på problematisk spilleadfærd), 2) Spillere der tror de kan finde bedre bonusser uden den danske 10x omsætningsgrænse, 3) Spillere der søger spil/udbydere der ikke tilbydes i Danmark. Hvis du har udelukket dig via ROFUS, anbefaler vi at kontakte <Link to="/ansvarligt-spil/stopspillet" className={linkClass}>StopSpillet</Link> på 70 22 28 25 for rådgivning.
      </>
    ),
  },
  {
    question: "Kan jeg omgå ROFUS og spille alligevel?",
    answer: (
      <>
        Ja, teknisk set kan man spille hos udenlandske operatører uden dansk licens. Men ROFUS eksisterer for at beskytte dig. Hvis du har registreret dig i ROFUS, er det fordi du på et tidspunkt vurderede, at du havde brug for en pause. At omgå ROFUS er et tydeligt faresignal for <Link to="/ansvarligt-spil/ludomani" className={linkClass}>ludomani</Link>. Ring til <Link to="/ansvarligt-spil/hjaelpelinjer" className={linkClass}>hjælpelinjen</Link> på 70 22 28 25 – det er gratis og anonymt.
      </>
    ),
  },
  {
    question: "Hvad er alternativerne til casino uden ROFUS?",
    answer: (
      <>
        I stedet for at søge ulicenserede alternativer anbefaler vi: 1) Kontakt <Link to="/ansvarligt-spil/stopspillet" className={linkClass}>StopSpillet</Link> for professionel rådgivning, 2) Brug <Link to="/ansvarligt-spil/spillegraenser" className={linkClass}>spillegrænser</Link> på licenserede casinoer, 3) Overvej om din ROFUS-registrering var berettiget, 4) Vent til din udelukkelsesperiode udløber og vend tilbage med et budget og klare grænser.
      </>
    ),
  },
];

const risici = [
  {
    icon: Banknote,
    title: "Skattepligtige gevinster",
    description: "Gevinster fra casinoer uden dansk licens beskattes som personlig indkomst (op til 52%). Hos licenserede casinoer er dine gevinster 100% skattefrie – en forskel der hurtigt løber op i tusindvis af kroner.",
    tag: "Økonomisk",
  },
  {
    icon: Shield,
    title: "Ingen spillerbeskyttelse",
    description: "Uden dansk licens er du ikke beskyttet af Spillemyndighedens regler om bankgaranti, bonusloft (max 10x omsætning), eller indbetalingsgrænser. Casinoet kan ændre vilkår uden varsel.",
    tag: "Juridisk",
  },
  {
    icon: XCircle,
    title: "Ingen klageinstans",
    description: "Hvis et ulicenseret casino nægter at udbetale dine gevinster, har du ingen klageinstans. Hos danske casinoer kan Spillemyndigheden gribe ind og beskytte dine interesser.",
    tag: "Retssikkerhed",
  },
  {
    icon: Ban,
    title: "Blokerede sider",
    description: "Spillemyndigheden kan pålægge danske internetudbydere at blokere adgangen til ulicenserede gambling-sider. Du risikerer at miste adgang – og potentielt indeståender – uden varsel.",
    tag: "Teknisk",
  },
];

const CasinoUdenRofus = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Casino uden ROFUS – Risici, Lovgivning og Anbefalinger 2026",
    description: "Alt om casino uden ROFUS: juridiske risici, skattekonsekvenser og hvorfor danske licenserede casinoer altid er det sikre valg. Objektiv analyse fra Casinoaftaler.",
    url: `${SITE_URL}/casino-uden-rofus`,
    datePublished: "2026-03-31",
  });

  return (
    <>
      <SEO
        title="Casino uden ROFUS – Risici og Hvorfor Du Bør Vælge Dansk Licens 2026 | Casinoaftaler"
        description="Casino uden ROFUS: Forstå risici ved ulicenserede casinoer – skat på gevinster, ingen spillerbeskyttelse og blokerede sider. Vi anbefaler kun dansk licens."
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

      {/* Hero */}
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
              <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
              Sikkerhed & regulering
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Casino uden ROFUS
            </h1>
            <p className="text-lg text-white/80">
              Hvad er risikoen ved at spille hos casinoer uden ROFUS? Vi gennemgår lovgivning, skatteforhold og spillerbeskyttelse – og forklarer hvorfor dansk licens altid er det sikre valg.
            </p>
          </div>
        </div>
      </section>

      <ContentPageLayout>
        <AuthorMetaBar author="jonas" readTime="12 Min." />

        <SnippetAnswer answer="Casino uden ROFUS er ulicenserede casinoer der ikke er tilsluttet det danske selvudelukkelsesprogram. Gevinster beskattes op til 52%, du har ingen klageinstans, og Spillemyndigheden kan blokere adgangen. Vi anbefaler udelukkende casinoer med dansk licens." />

        <QuickComparisonTable count={3} title="Anbefalede casinoer med dansk licens" prioritySlugs={["spilleautomaten", "leovegas", "betinia"]} />

        {/* Intro */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Hvad er casino uden ROFUS?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            "Casino uden ROFUS" refererer til online casinoer der opererer uden <Link to="/casino-med-dansk-licens" className={linkClass}>dansk spillelicens</Link> og derfor ikke er tilsluttet <Link to="/ansvarligt-spil/rofus" className={linkClass}>ROFUS</Link> (Register Over Frivilligt Udelukkede Spillere). Disse casinoer er typisk licenseret i jurisdiktioner som Malta, Curaçao eller Gibraltar og henvender sig til et internationalt marked.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Søger du efter casino uden ROFUS, er det vigtigt at forstå de juridiske, økonomiske og personlige risici det indebærer. Hos Casinoaftaler anbefaler vi <strong>udelukkende</strong> casinoer med gyldig <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighed</Link>-licens, da de tilbyder den bedste spillerbeskyttelse, skattefrihed og retssikkerhed.
          </p>
          <div className="rounded-lg border-2 border-destructive/50 bg-destructive/5 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
              <div>
                <p className="font-semibold text-destructive mb-1">Casinoaftaler fraråder spil hos ulicenserede casinoer</p>
                <p className="text-sm text-muted-foreground">
                  Denne artikel er informativ og advarer mod risiciene ved ulicenserede casinoer. Vi linker ikke til, anbefaler ikke og promoverer ikke casinoer uden dansk licens. Har du problemer med spil, kontakt <Link to="/ansvarligt-spil/stopspillet" className={linkClass}>StopSpillet</Link> på 70 22 28 25.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Risici */}
        <section className="mb-10">
          <h2 className="mb-6 text-3xl font-bold">4 kritiske risici ved casino uden ROFUS</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {risici.map((risk) => (
              <Card key={risk.title} className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <risk.icon className="h-6 w-6 text-destructive" />
                    <Badge variant="outline" className="text-xs">{risk.tag}</Badge>
                  </div>
                  <CardTitle className="text-lg">{risk.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{risk.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Dansk licens vs. ulicenseret */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Dansk licens vs. casino uden ROFUS – sammenligning</h2>
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="grid grid-cols-3 gap-0 bg-muted/50 p-3 text-sm font-semibold">
              <span>Egenskab</span>
              <span className="text-center">Dansk licens ✅</span>
              <span className="text-center">Uden ROFUS ❌</span>
            </div>
            {[
              ["Gevinster skattefrie", "✅ Ja", "❌ Op til 52% skat"],
              ["Spillerbeskyttelse", "✅ Spillemyndigheden", "❌ Ingen"],
              ["Maks. 10x omsætning", "✅ Lovkrav", "❌ Ofte 30-50x"],
              ["ROFUS selvudelukkelse", "✅ Tilsluttet", "❌ Ikke tilsluttet"],
              ["Klageinstans", "✅ Spillemyndigheden", "❌ Ingen"],
              ["Bankgaranti", "✅ Lovkrav", "❌ Ingen garanti"],
              ["Blokering af side", "❌ Nej", "✅ Muligt"],
              ["MitID-verifikation", "✅ Sikker", "❌ Svagere KYC"],
            ].map(([label, dansk, uden]) => (
              <div key={label} className="grid grid-cols-3 gap-0 border-t border-border p-3 text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="text-center">{dansk}</span>
                <span className="text-center">{uden}</span>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* ROFUS forklaring */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Sådan fungerer ROFUS</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/ansvarligt-spil/rofus" className={linkClass}>ROFUS</Link> er et vigtigt værktøj i Danmarks system for <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>. Registrering er frivillig og kan gøres på rofus.nu. Du kan vælge udelukkelse i 1, 3 eller 6 måneder – eller permanent. Under udelukkelsen er det umuligt at oprette konti eller spille hos nogen dansk-licenseret operatør.
          </p>
          <div className="space-y-3">
            {[
              { icon: Heart, title: "ROFUS beskytter dig", desc: "Hvis du har registreret dig i ROFUS, er det fordi du vurderede det nødvendigt. At søge veje udenom er et alvorligt faresignal." },
              { icon: Users, title: "Kontakt StopSpillet", desc: "Gratis, anonym rådgivning på 70 22 28 25. Professionelle rådgivere hjælper dig med at håndtere spilleproblemer." },
              { icon: CheckCircle2, title: "Vent udelukkelsesperioden ud", desc: "Brug tiden på at opbygge sunde vaner og et klart budget. Vend kun tilbage med en plan og faste grænser." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border p-4">
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <InlineCasinoCards title="Sikre danske casinoer med ROFUS-tilslutning" />

        <LatestNewsByCategory pagePath="/casino-uden-rofus" />
        <ReviewMoneyLinks />
        <RelatedGuides currentPath="/casino-uden-rofus" />
        <FAQSection title="Ofte stillede spørgsmål om casino uden ROFUS" faqs={faqs} />
        <AuthorBio author="jonas" />
      </ContentPageLayout>
      <StickyCtaBySlug slug="spilleautomaten" />
    </>
  );
};

export default CasinoUdenRofus;
