import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { GPWASealBadge } from "@/components/GPWASealBadge";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  ShieldCheck,
  Users,
  FlaskConical,
  Scale,
  ExternalLink,
  Award,
  CheckCircle2,
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80 font-medium";

const faqs = [
  {
    question: "Hvad er GPWA, og hvorfor er det vigtigt?",
    answer:
      "GPWA (Gambling Portal Webmasters Association) er branchens ældste og mest anerkendte organisation for casino-affiliates, grundlagt i 2000. En GPWA-godkendelse betyder, at sitet er manuelt verificeret for ærligt indhold, fair anbefalinger og korrekte bonusoplysninger. Kun en brøkdel af ansøgere godkendes.",
  },
  {
    question: "Hvordan kan jeg verificere, at CasinoAftaler er GPWA-godkendt?",
    answer:
      "Klik på GPWA-seglet i vores footer eller på denne side – det åbner GPWA's officielle verificeringsside, hvor casinoaftaler.dk fremgår som godkendt portal. Du kan også besøge gpwa.org direkte og søge efter vores domæne.",
  },
  {
    question: "Hvordan tester I casinoer?",
    answer:
      "Vi evaluerer hvert casino på 6 parametre: licens & sikkerhed, bonusvilkår (matematisk EV-analyse), spiludvalg & udviklere, betalingsmetoder & udbetalingstid, kundeservice og mobiloplevelse. Alle anmeldelser er baseret på personlig test af vores redaktion.",
  },
  {
    question: "Påvirker affiliate-links jeres anmeldelser?",
    answer:
      "Nej. Vores redaktionelle vurderinger er uafhængige af kommercielle aftaler. Vi anbefaler kun casinoer med aktiv dansk licens fra Spillemyndigheden og fair bonusvilkår. Læs vores fulde forretningsmodel for gennemsigtighed.",
  },
  {
    question: "Hvem står bag CasinoAftaler?",
    answer:
      "Casinoaftaler.dk er grundlagt af Jonas Theill og drives af et team med over 5 års erfaring i den danske iGaming-branche. Teamet inkluderer specialister inden for casino-streaming, juridisk compliance, finansøkonomi og IT.",
  },
];

const ErCasinoaftalerTrovaerdig = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Er CasinoAftaler troværdig? Sådan verificerer du os",
    description:
      "Læs hvordan CasinoAftaler.dk er GPWA-godkendt, verificeret af Spillemyndigheden og tester casinoer med matematisk præcision.",
    url: `${SITE_URL}/er-casinoaftaler-trovaerdig`,
    datePublished: "2026-03-27",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
    about: [
      { "@type": "Organization", name: "Gambling Portal Webmasters Association", url: "https://www.gpwa.org" },
      { "@type": "Organization", name: "Spillemyndigheden", url: "https://www.spillemyndigheden.dk" },
    ],
  });

  return (
    <>
      <SEO
        title="Er CasinoAftaler troværdig? | Sådan verificerer du os"
        description="CasinoAftaler.dk er GPWA-godkendt og verificeret. Læs om vores testmetode, team og uafhængige redaktion – og verificér os selv."
        jsonLd={[faqJsonLd, articleJsonLd]}
        type="article"
        datePublished="2026-03-27"
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
              Troværdighed & Transparens
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Er CasinoAftaler troværdig?
            </h1>
            <p className="text-lg text-white/80">
              Vi er en GPWA-godkendt affiliate platform med dansk licens-verificering,
              uafhængig redaktion og matematisk bonusanalyse. Verificér os selv.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="6 Min." />

        {/* GPWA Seal prominent */}
        <div className="my-8 flex justify-center">
          <GPWASealBadge variant="block" microcopy="GPWA Approved Portal" showTrustLink={false} />
        </div>

        {/* Hvem vi er */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Hvem står bag CasinoAftaler?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Casinoaftaler.dk er grundlagt af Jonas Theill og drives af et dedikeret team med over 5 års erfaring
                i den danske iGaming-branche. Vi streamer dagligt på Twitch for hundredvis af seere og deler ærlige
                casinooplevelser i realtid.
              </p>
              <p>
                Vores team inkluderer specialister inden for casino-streaming, juridisk compliance, finansøkonomi og IT.
                Læs mere om vores team på{" "}
                <Link to="/om" className={linkClass}>Om Casinoaftaler</Link>.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Sådan tester vi */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-primary" />
                Sådan tester vi casinoer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hvert casino evalueres på 6 parametre: licens & sikkerhed, bonusvilkår (matematisk EV-analyse),
                spiludvalg & udviklere, betalingsmetoder & udbetalingstid, kundeservice og mobiloplevelse.
              </p>
              <ul className="space-y-2 ml-4">
                {[
                  "Alle licenser verificeres direkte mod Spillemyndighedens register",
                  "Bonusser analyseres med EV-beregning – ikke bare omsætningskrav",
                  "Udbetalingstider testes med reelle indbetalinger og udbetalinger",
                  "Kundeservice kontaktes og evalueres på responstid og kvalitet",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Læs den fulde metode i vores{" "}
                <Link to="/saadan-tester-vi-casinoer" className={linkClass}>
                  testguide
                </Link>.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* GPWA godkendelse */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                GPWA godkendelse – hvad betyder det?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong>GPWA (Gambling Portal Webmasters Association)</strong> er branchens ældste og mest respekterede
                organisation for casino-affiliates, grundlagt i 2000. En GPWA "Seal of Approval" udstedes kun efter
                manuel gennemgang af:
              </p>
              <ul className="space-y-2 ml-4">
                {[
                  "Ærligt og præcist indhold uden vildledende påstande",
                  "Fair og gennemsigtige anbefalinger",
                  "Korrekte og opdaterede bonusoplysninger",
                  "Professionel drift og ansvarlig markedsføring",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Du kan selv verificere vores godkendelse ved at klikke på GPWA-seglet – det åbner{" "}
                <a
                  href="https://certify.gpwa.org/verify/casinoaftaler.dk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  GPWA's officielle verificeringsside
                  <ExternalLink className="inline h-3 w-3 ml-1" />
                </a>.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Spillemyndigheden */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Spillemyndigheden & dansk licens
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Vi anbefaler udelukkende casinoer med aktiv licens fra{" "}
                <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>.
                Hver licens verificeres direkte mod det{" "}
                <a
                  href="https://www.spillemyndigheden.dk/tilladelsesindehavere"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  officielle register
                  <ExternalLink className="inline h-3 w-3 ml-1" />
                </a>. Vi overvåger licensstatus dagligt via automatiseret compliance-scanning.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Uafhængig redaktion */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Uafhængig redaktion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Vores redaktionelle vurderinger er uafhængige af kommercielle aftaler.
                Affiliate-links påvirker aldrig ratings eller anbefalinger. Læs vores fulde{" "}
                <Link to="/forretningsmodel" className={linkClass}>forretningsmodel</Link>{" "}
                og{" "}
                <Link to="/redaktionel-politik" className={linkClass}>redaktionelle politik</Link>{" "}
                for fuld gennemsigtighed.
              </p>
            </CardContent>
          </Card>
        </section>

        <FAQSection faqs={faqs} />

        <LatestNewsByCategory pagePath="/er-casinoaftaler-trovaerdig" />
        <RelatedGuides currentPath="/er-casinoaftaler-trovaerdig" maxLinks={5} />

        <AuthorBio author="jonas" showCommunity={false} />
      </div>
    </>
  );
};

export default ErCasinoaftalerTrovaerdig;
