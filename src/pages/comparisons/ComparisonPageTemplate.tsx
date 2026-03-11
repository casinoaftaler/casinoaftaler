import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, X, Star, Smartphone, Trophy, Zap, Scale } from "lucide-react";
import type { ReactNode } from "react";

export interface ComparisonCategory {
  label: string;
  casinoA: { score: number; detail: string };
  casinoB: { score: number; detail: string };
}

export interface ComparisonCasino {
  name: string;
  slug: string;
  bonusTitle: string;
  bonusAmount: string;
  wagering: string;
  minDeposit: string;
  payoutTime: string;
  gameCount: string;
  license: string;
  mobileFriendly: boolean;
  liveCasino: boolean;
  pros: string[];
  cons: string[];
}

export interface ComparisonPageProps {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  path: string;
  datePublished: string;
  author: "jonas" | "kevin" | "ajse";
  heroImage: string;
  heroAlt: string;
  casinoA: ComparisonCasino;
  casinoB: ComparisonCasino;
  categories: ComparisonCategory[];
  verdict: string;
  verdictWinner: "A" | "B" | "draw";
  faqs: { question: string; answer: ReactNode }[];
  ctaSlug: string;
  readTime?: string;
  /** Full enterprise body content rendered between comparison table and verdict */
  children?: ReactNode;
}

function ScoreStars({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i <= score ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

function ProConList({ items, type }: { items: string[]; type: "pro" | "con" }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm">
          {type === "pro" ? (
            <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
          ) : (
            <X className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
          )}
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ComparisonPageTemplate({
  metaTitle,
  metaDescription,
  h1,
  intro,
  path,
  datePublished,
  author,
  heroImage,
  heroAlt,
  casinoA,
  casinoB,
  categories,
  verdict,
  verdictWinner,
  faqs,
  ctaSlug,
  readTime = "30 min",
  children,
}: ComparisonPageProps) {
  const canonicalUrl = `${SITE_URL}${path}`;

  const aboutEntities = [
    { "@type": "Organization" as const, name: casinoA.name, url: `${SITE_URL}/casino-anmeldelser/${casinoA.slug}` },
    { "@type": "Organization" as const, name: casinoB.name, url: `${SITE_URL}/casino-anmeldelser/${casinoB.slug}` },
  ];
  const mentionEntities = [
    { "@type": "GovernmentOrganization" as const, name: "Spillemyndigheden", url: `${SITE_URL}/spillemyndigheden` },
    { "@type": "Thing" as const, name: "Casino Bonus", url: `${SITE_URL}/casino-bonus` },
    { "@type": "Thing" as const, name: "Ansvarligt Spil", url: `${SITE_URL}/ansvarligt-spil` },
  ];

  const authorName = author === "kevin" ? "Kevin" : author === "ajse" ? "Ajse" : "Jonas";
  const authorUrl = `${SITE_URL}/forfatter/${author}`;

  const articleSchema = buildArticleSchema({
    headline: h1,
    description: metaDescription,
    url: canonicalUrl,
    datePublished,
    authorName,
    authorUrl,
    about: aboutEntities,
    mentions: mentionEntities,
  });

  const faqSchema = buildFaqSchema(faqs);

  const totalA = categories.reduce((sum, c) => sum + c.casinoA.score, 0);
  const totalB = categories.reduce((sum, c) => sum + c.casinoB.score, 0);
  const maxScore = categories.length * 5;

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        type="article"
        datePublished={datePublished}
        jsonLd={[articleSchema, faqSchema]}
      />

      {/* Hero section matching /casinospil structure */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Scale className="mr-1.5 h-3.5 w-3.5" />
              Sammenligning 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">{h1}</h1>
            <p className="text-lg text-white/80">{intro}</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author={author} date={datePublished} readTime={readTime} />

        {/* Hero image */}
        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={heroImage}
            alt={heroAlt}
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
            width={1920}
            height={600}
          />
        </div>

        {/* Quick comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[casinoA, casinoB].map((casino) => (
            <Card key={casino.slug} className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Link to={`/casino-anmeldelser/${casino.slug}`} className="text-primary hover:underline">
                    {casino.name}
                  </Link>
                  <Badge variant="outline" className="text-xs">{casino.license}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground block text-xs">Bonus</span>
                    <span className="font-semibold">{casino.bonusAmount}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">Omsætning</span>
                    <span className="font-semibold">{casino.wagering}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">Min. indbetaling</span>
                    <span className="font-semibold">{casino.minDeposit}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">Udbetaling</span>
                    <span className="font-semibold">{casino.payoutTime}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">Spil</span>
                    <span className="font-semibold">{casino.gameCount}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {casino.mobileFriendly && (
                      <span className="flex items-center gap-1 text-xs text-emerald-500">
                        <Smartphone className="h-3.5 w-3.5" /> Mobil
                      </span>
                    )}
                    {casino.liveCasino && (
                      <span className="flex items-center gap-1 text-xs text-violet-400">
                        <Zap className="h-3.5 w-3.5" /> Live
                      </span>
                    )}
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-500 mb-2 flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Fordele
                    </h4>
                    <ProConList items={casino.pros} type="pro" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-destructive mb-2 flex items-center gap-1">
                      <X className="h-3.5 w-3.5" /> Ulemper
                    </h4>
                    <ProConList items={casino.cons} type="con" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed comparison table */}
        <h2 className="text-2xl font-bold mb-4">Kategori-sammenligning</h2>
        <div className="overflow-x-auto mb-10">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Kategori</th>
                <th className="text-center py-3 px-4 font-semibold">{casinoA.name}</th>
                <th className="text-center py-3 px-4 font-semibold">{casinoB.name}</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4 font-medium">{cat.label}</td>
                  <td className="py-3 px-4 text-center">
                    <ScoreStars score={cat.casinoA.score} />
                    <span className="text-xs text-muted-foreground block mt-1">{cat.casinoA.detail}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <ScoreStars score={cat.casinoB.score} />
                    <span className="text-xs text-muted-foreground block mt-1">{cat.casinoB.detail}</span>
                  </td>
                </tr>
              ))}
              <tr className="bg-muted/30 font-bold">
                <td className="py-3 px-4">Samlet score</td>
                <td className="py-3 px-4 text-center tabular-nums">{totalA}/{maxScore}</td>
                <td className="py-3 px-4 text-center tabular-nums">{totalB}/{maxScore}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Enterprise body content */}
        {children}

        {/* Verdict */}
        <Card className="border-primary/30 bg-card mb-10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="h-5 w-5 text-amber-400" />
              <h2 className="text-xl font-bold">Konklusion</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">{verdict}</p>
            {verdictWinner !== "draw" && (
              <div className="mt-4 flex items-center gap-2">
                <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
                  Vinder: {verdictWinner === "A" ? casinoA.name : casinoB.name}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <InlineCasinoCards title="Andre anbefalede casinoer" count={4} excludeSlugs={[casinoA.slug, casinoB.slug]} />
        <Separator className="my-10" />
        <LatestNewsByCategory pagePath={path} />
        <RelatedGuides currentPath={path} />
        <FAQSection title={`Ofte stillede spørgsmål: ${casinoA.name} vs ${casinoB.name}`} faqs={faqs} />
        <AuthorBio author={author} />
      </div>
      <StickyCtaBySlug slug={ctaSlug} />
    </>
  );
}

export default ComparisonPageTemplate;
