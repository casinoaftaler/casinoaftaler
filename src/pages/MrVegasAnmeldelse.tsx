import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { buildArticleSchema, buildFaqSchema, buildReviewSchema } from "@/lib/seo";
import { QuickFactsProviders, QuickFactsLicense } from "@/components/QuickFactsProviders";
import { CasinoReviewHero } from "@/components/CasinoReviewHero";
import type { ReactNode } from "react";
import { ShieldCheck, Star, Clock, CreditCard, Trophy, Sparkles, Gamepad2, Zap, Check, X, Smartphone, Headphones, Globe, Award, AlertTriangle, Users, TrendingUp } from "lucide-react";

export default function MrVegasAnmeldelse() {
  const siteSettings = useSiteSettings();

  if (!siteSettings) {
    return <div>Loading...</div>;
  }

  const casino = siteSettings.casinos.find((casino) => casino.slug === "mr-vegas");

  if (!casino) {
    return <div>Casino not found</div>;
  }

  const review = siteSettings.casinoReviews.find((review) => review.casinoSlug === casino.slug);

  if (!review) {
    return <div>Review not found</div>;
  }

  const faqs = siteSettings.faqs.filter((faq) => faq.casinoSlug === casino.slug);

  const articleSchema = buildArticleSchema({
    headline: review.title,
    description: review.metaDescription,
    url: `https://casinoaftaler.dk/casino-anmeldelser/${casino.slug}`,
    datePublished: review.createdAt,
    dateModified: review.updatedAt,
    authorName: review.author,
    image: casino.imageUrl,
    aggregateRating: {
      ratingValue: casino.rating.toString(),
      ratingCount: "10",
    },
  });

  const reviewSchema = buildReviewSchema({
    itemName: casino.name,
    itemUrl: `https://casinoaftaler.dk/casino-anmeldelser/${casino.slug}`,
    ratingValue: casino.rating.toString(),
    ratingCount: "10",
    reviewBody: review.reviewText,
    authorUrl: `https://casinoaftaler.dk/forfatter/${review.author}`,
  });

  const faqSchema = buildFaqSchema(faqs.map((faq) => ({ question: faq.question, answer: faq.answer })));

  return (
    <>
      <SEO
        title={review.title}
        description={review.metaDescription}
        jsonLd={[articleSchema, reviewSchema, faqSchema]}
      />

      <CasinoReviewHero casino={casino} review={review} />

      <section className="container grid items-center justify-center gap-6 pt-6 pb-8 md:py-10">
        <div className="mx-auto max-w-[980px]">
          <Card>
            <CardHeader>
              <CardTitle>Mr Vegas Casino Anmeldelse</CardTitle>
            </CardHeader>
            <CardContent className="leading-relaxed">
              {review.reviewText}
            </CardContent>
          </Card>

          <AuthorMetaBar author={review.author} createdAt={review.createdAt} updatedAt={review.updatedAt} />

          <AuthorBio author={review.author} />

          <Separator className="my-4" />

          <Card>
            <CardHeader>
              <CardTitle>Fordele og Ulemper</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-[1fr_2fr] gap-4">
                <div className="text-right font-bold">Fordele:</div>
                <div>
                  {casino.pros.map((pro, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      {pro}
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-[1fr_2fr] gap-4">
                <div className="text-right font-bold">Ulemper:</div>
                <div>
                  {casino.cons.map((con, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      {con}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-4" />

          <Card>
            <CardHeader>
              <CardTitle>Hurtige Fakta om Mr Vegas</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <QuickFactsProviders providers={casino.providers} />
              <Separator />
              <QuickFactsLicense license={casino.license} />
            </CardContent>
          </Card>

          <Separator className="my-4" />

          <FAQSection faqs={faqs} />

          <Separator className="my-4" />

          <RelatedGuides currentCasinoSlug={casino.slug} />

          <Separator className="my-4" />

          <InlineCasinoCards excludeCasinoSlug={casino.slug} />
        </div>
      </section>
    </>
  );
}
