import { useState, useCallback } from "react";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, SITE_URL } from "@/lib/seo";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { usePublishedNews } from "@/hooks/useCasinoNews";
import { optimizeStorageImage } from "@/lib/imageOptimization";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  CalendarDays,
  BookOpen,
  Star,
  Heart,
  Zap,
  Trophy,
  Users,
  ShieldCheck,
  Scale,
  BadgeCheck,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Pen,
} from "lucide-react";
import ajseImage from "@/assets/ajse-avatar.png";

const faqs = [
  {
    question: "Hvad er Ajses rolle på Casinoaftaler.dk?",
    answer:
      "Ajse er nyhedsredaktør og forfatter på Casinoaftaler.dk. Hun skriver og redigerer alle nyheder om det danske casinomarked.",
  },
  {
    question: "Hvad skriver Ajse om?",
    answer:
      "Ajse dækker nyheder om danske online casinoer, nye licenser, bonusændringer, regulering og markedstendenser.",
  },
  {
    question: "Er Ajses artikler faktatjekket?",
    answer:
      "Ja, alle Ajses artikler faktatjekkes af redaktionen inden publicering for at sikre korrekthed og troværdighed.",
  },
  {
    question: "Hvordan kontakter man Ajse?",
    answer:
      "Du kan kontakte Ajse og resten af redaktionen via vores kontaktside eller på de sociale medier.",
  },
];

const expertiseItems = [
  { icon: Newspaper, label: "Casino-nyheder" },
  { icon: FileText, label: "Markedsanalyse" },
  { icon: Pen, label: "Redaktionelt indhold" },
  { icon: ShieldCheck, label: "Regulering & licenser" },
  { icon: Star, label: "Bonusopdateringer" },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/forfatter/ajse#person`,
  name: "Ajse",
  url: `${SITE_URL}/forfatter/ajse`,
  image: `${SITE_URL}/ajse-avatar.png`,
  jobTitle: "Nyhedsredaktør",
  knowsAbout: ["online casino", "casino nyheder", "dansk casinoregulering", "bonusvilkår"],
  nationality: { "@type": "Country", name: "Denmark" },
  worksFor: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Casinoaftaler.dk",
    url: SITE_URL,
  },
  memberOf: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
  },
  sameAs: [],
  description:
    "Ajse er nyhedsredaktør på Casinoaftaler.dk og skriver om nyheder, regulering og tendenser i det danske casinomarked.",
};


export default function ForfatterAjse() {
  const { data: siteSettings } = useSiteSettings();
  const { data: newsData } = usePublishedNews(1, 100);
  const [articlePage, setArticlePage] = useState(0);
  const heroBackgroundImage = siteSettings?.hero_background;

  const newsArticles = newsData?.articles ?? [];

  const ARTICLES_PER_PAGE = 8;
  const totalArticlePages = Math.max(1, Math.ceil(newsArticles.length / ARTICLES_PER_PAGE));
  const visibleArticles = newsArticles.slice(
    articlePage * ARTICLES_PER_PAGE,
    (articlePage + 1) * ARTICLES_PER_PAGE
  );
  const prevArticlePage = useCallback(() => setArticlePage((p) => Math.max(0, p - 1)), []);
  const nextArticlePage = useCallback(() => setArticlePage((p) => Math.min(totalArticlePages - 1, p + 1)), [totalArticlePages]);

  const faqJsonLd = buildFaqSchema(faqs);

  return (
    <>
      <SEO
        title="Ajse – Nyhedsredaktør | Casinoaftaler.dk"
        description="Mød Ajse – nyhedsredaktør hos Casinoaftaler.dk. Hun dækker de seneste nyheder om danske online casinoer, regulering og markedstendenser."
        jsonLd={[faqJsonLd, personSchema]}
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
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">
                <User className="mr-1.5 h-3.5 w-3.5" />
                Forfatter
              </Badge>
              <Badge variant="secondary">
                <Newspaper className="mr-1.5 h-3.5 w-3.5" />
                Nyhedsredaktør
              </Badge>
              <Badge variant="secondary">
                <Pen className="mr-1.5 h-3.5 w-3.5" />
                Redaktionelt indhold
              </Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Ajse – Nyhedsredaktør
            </h1>
            <p className="text-lg text-white/80">
              Nyhedsredaktør på Casinoaftaler.dk med fokus på nyheder, regulering og tendenser i det danske casinomarked.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="ajse" date="26-02-2026" readTime="5 Min." showVerified />

        {/* Profile card */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={ajseImage}
                alt="Ajse – Nyhedsredaktør hos Casinoaftaler.dk"
                className="w-64 h-64 rounded-2xl object-cover object-top shadow-lg"
                loading="eager"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Om Ajse</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <User className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Rolle</p>
                    <p className="text-sm font-medium">Nyhedsredaktør</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Newspaper className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Speciale</p>
                    <p className="text-sm font-medium">Casino-nyheder</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Pen className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Indhold</p>
                    <p className="text-sm font-medium">Nyheder & analyser</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <FileText className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Fokusområde</p>
                    <p className="text-sm font-medium">Regulering & marked</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Aktiv siden</p>
                    <p className="text-sm font-medium">2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Artikler</p>
                    <p className="text-sm font-medium">{newsArticles.length}+ nyheder</p>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Ajse er nyhedsredaktør på Casinoaftaler.dk og ansvarlig for al nyhedsdækning af det danske casinomarked.
                Hun følger løbende med i nye licenser, bonusændringer, reguleringstiltag og markedstendenser
                og omsætter det til letforståelige, faktatjekkede artikler for danske spillere.
                Hendes arbejde sikrer, at læserne altid er opdateret med de seneste udviklinger inden for{" "}
                <Link to="/casino-nyheder" className="text-primary hover:underline">casino-nyheder</Link>.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Ekspertise & Erfaring */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2">
            <BadgeCheck className="h-7 w-7 text-primary" />
            Ekspertise & Erfaring
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expertiseItems.map((item) => (
              <Card
                key={item.label}
                className="group transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
              >
                <CardContent className="flex items-center gap-3 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Dokumenteret erfaring */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Dokumenteret Erfaring
          </h2>
          <div className="rounded-xl border border-border bg-gradient-to-br from-card to-accent/20 p-6">
            <p className="text-muted-foreground leading-relaxed">
              Ajse har en baggrund inden for journalistik og digital medieproduktion.
              Som nyhedsredaktør på Casinoaftaler.dk er hun ansvarlig for at researche, skrive og faktatjekke
              nyheder om det danske casinomarked. Hendes artikler bygger på primære kilder som{" "}
              <Link to="/spillemyndigheden" className="text-primary hover:underline">Spillemyndigheden</Link>,
              officielle casinosider og brancheanalyser.
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Baggrund og Motivation */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Zap className="h-7 w-7 text-primary" />
            Baggrund og Motivation
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ajse har altid haft en interesse for digital kommunikation og forbrugerrettigheder.
            Da hun blev introduceret til Casinoaftaler.dk gennem{" "}
            <Link to="/forfatter/jonas" className="text-primary hover:underline">Jonas</Link>,
            så hun en mulighed for at kombinere sin passion for skrivning med et behov for uafhængig
            og pålidelig nyhedsdækning i casinobranchen.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Hendes motivation er at sikre, at danske spillere har adgang til opdaterede, upartiske nyheder
            om det marked, de bevæger sig i. Hun tror på, at gennemsigtighed og kvalitetsjournalistik
            er afgørende for et sundt spillemiljø.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I dag er Ajse en fast del af redaktionen på <strong>Casinoaftaler.dk</strong> og bidrager
            dagligt med nye artikler, der holder læserne informeret om alt fra{" "}
            <Link to="/casino-bonus" className="text-primary hover:underline">bonusændringer</Link> til
            ny lovgivning og{" "}
            <Link to="/nye-casinoer" className="text-primary hover:underline">nye casinoer</Link> på markedet.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Nyheder skrevet af Ajse – dynamisk fra DB */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-primary" />
              Nyheder skrevet af Ajse
            </h2>
            {totalArticlePages > 1 && (
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground mr-2">
                  {articlePage + 1} / {totalArticlePages}
                </span>
                <button
                  onClick={prevArticlePage}
                  disabled={articlePage === 0}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Forrige artikler"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextArticlePage}
                  disabled={articlePage >= totalArticlePages - 1}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Næste artikler"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
          {newsArticles.length === 0 ? (
            <p className="text-muted-foreground">Ingen publicerede nyheder endnu.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {visibleArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/casino-nyheder/${article.slug}`}
                  className="group flex gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
                >
                  {article.featured_image && (
                    <img
                      src={optimizeStorageImage(article.featured_image, 120, 70) || article.featured_image}
                      alt={article.title}
                      className="h-20 w-28 shrink-0 rounded-lg object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="flex flex-col min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">Nyhed</Badge>
                      {article.published_at && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {new Date(article.published_at).toLocaleDateString("da-DK")}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-semibold group-hover:text-primary transition-colors mb-1 line-clamp-2">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-1">{article.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <Separator className="my-10" />

        {/* Transparens & metode */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Transparens & metode
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Ajses artikler bygger på en dokumenteret research-metode og klare redaktionelle retningslinjer.
            Læs mere om vores tilgang til kvalitetssikring, forretningsmodel og redaktionel politik.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/saadan-tester-vi-casinoer"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Sådan tester vi casinoer</h3>
                <p className="text-xs text-muted-foreground">Vores testmetode og vurderingskriterier</p>
              </div>
            </Link>
            <Link
              to="/forretningsmodel"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <Scale className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Forretningsmodel</h3>
                <p className="text-xs text-muted-foreground">Sådan finansieres Casinoaftaler.dk</p>
              </div>
            </Link>
            <Link
              to="/redaktionel-politik"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Redaktionel politik</h3>
                <p className="text-xs text-muted-foreground">Vores redaktionelle retningslinjer</p>
              </div>
            </Link>
          </div>
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath="/forfatter/ajse" />

        <FAQSection title="Ofte stillede spørgsmål om Ajse" faqs={faqs} />

        <AuthorBio author="jonas" showCommunity={false} />
      </div>
    </>
  );
}
