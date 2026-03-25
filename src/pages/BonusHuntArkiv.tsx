import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBonusHuntArchives } from "@/hooks/useSlotCatalog";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import { Trophy, TrendingUp, Gamepad2, BarChart3, ArrowRight } from "lucide-react";
import { CommunitySeoSections } from "@/components/community/CommunitySeoSections";
import { BonusHuntArkivSeoContent } from "@/components/seo-content/BonusHuntArkivSeoContent";
import { CommunityBrandBlock } from "@/components/community/CommunityBrandBlock";
import { RelatedGuides } from "@/components/RelatedGuides";

import bonusHuntArkivHero from "@/assets/bonus-hunt-arkiv-hero.jpg";
import bonusHuntOverlay from "@/assets/bonus-hunt/bonus-hunt-stream-overlay.png";

const faqItems = [
  {
    question: "Hvad er et Bonus Hunt arkiv?",
    answer: "Bonus Hunt arkivet dokumenterer alle vores live bonus hunts på Twitch med detaljerede resultater. Du kan se hvilke spillemaskiner der blev åbnet, startbalance, gennemsnitlig multiplikator og samlet performance for hver hunt."
  },
  {
    question: "Hvordan udføres en bonus hunt?",
    answer: "Vi starter med en fast balance og spinner på udvalgte spillemaskiner. Hver gang vi rammer en bonus, gemmer vi den og lukker bonusrunden ned. Når balancen er spundet i 0, åbner vi alle gemte bonusser på én gang live på stream. I nogle tilfælde bruger vi bonus buy i stedet, men hunting er vores standard. Alle resultater logges automatisk, og gennemsnitlig X beregnes fra de samlede gevinster."
  },
  {
    question: "Kan jeg deltage i bonus hunts?",
    answer: "Ja! Du kan deltage i community bets under live hunts via vores Twitch-kanal. Du kan gætte på gennemsnitlig X (AVG X bet) eller samlet gevinst (Guess The Win) og vinde credits og præmier."
  },
  {
    question: "Hvornår streames bonus hunts?",
    answer: "Bonus hunts streames jævnligt på vores Twitch-kanal. Følg med på bonus-hunt siden for at se næste planlagte hunt og aktuelle live-sessions."
  },
];

export default function BonusHuntArkiv() {
  const { data: archives, isLoading } = useBonusHuntArchives();

  const stats = {
    total: archives?.length || 0,
    totalSlots: archives?.reduce((sum, h) => sum + (h.total_slots || 0), 0) || 0,
    avgX: archives && archives.length > 0
      ? (archives.reduce((sum, h) => sum + (Number(h.average_x) || 0), 0) / archives.length).toFixed(2)
      : "0",
    bestHunt: archives?.reduce((best, h) => (Number(h.average_x) || 0) > (Number(best?.average_x) || 0) ? h : best, archives[0]),
  };

  const seoTitle = "Bonus Hunt Arkiv – Alle Dokumenterede Resultater & Statistik";
  const seoDesc = `Se alle ${stats.total} dokumenterede bonus hunts med detaljerede resultater. Gennemsnitlig X, slot-lister og live test-data fra vores Twitch-streams.`;

  const articleSchema = buildArticleSchema({
    headline: seoTitle,
    description: seoDesc,
    url: `${SITE_URL}/bonus-hunt/arkiv`,
    datePublished: "2026-03-05",
    authorName: "Kevin",
  });

  const faqSchema = buildFaqSchema(faqItems);

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        jsonLd={[articleSchema, faqSchema]}
      />

      {/* TYPE B: Split hero – text left, image right */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-16"
        style={{
          backgroundImage: "linear-gradient(160deg, hsl(220 75% 20% / 0.97), hsl(280 60% 25% / 0.95))",
        }}
      >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Trophy className="mr-1.5 h-3.5 w-3.5" />
                Dokumenterede Resultater
              </Badge>
              <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
                Bonus Hunt Arkiv
              </h1>
              <p className="text-lg text-white/80 mb-6">
                Komplet arkiv over alle dokumenterede bonus hunts fra vores{" "}
                <Link to="/bonus-hunt" className="underline hover:text-white">live Twitch-streams</Link>.
                {" "}Ægte resultater, ægte penge, fuld transparens.
              </p>
              {/* Inline stats in hero */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Dokumenterede Hunts", value: stats.total },
                  { label: "Slots Testet", value: stats.totalSlots },
                  { label: "Gennemsnitlig X", value: `${stats.avgX}x` },
                  { label: "Bedste Hunt X", value: stats.bestHunt ? `${Number(stats.bestHunt.average_x).toFixed(2)}x` : "–" },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-lg bg-white/10 backdrop-blur-sm p-3">
                    <div className="text-xl font-bold">{value}</div>
                    <div className="text-xs text-white/60">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src={bonusHuntArkivHero}
                alt="Bonus hunt arkiv med dokumenterede resultater fra live Twitch-streams"
                className="w-full h-auto rounded-xl object-cover max-h-[360px] shadow-2xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="kevin" readTime="25 min" />

        {/* Mobile hero image */}
        <div className="mb-10 overflow-hidden rounded-xl md:hidden">
          <img
            src={bonusHuntArkivHero}
            alt="Bonus hunt arkiv med dokumenterede resultater fra live Twitch-streams"
            className="w-full h-auto object-cover max-h-[300px]"
            loading="eager"
          />
        </div>

        {/* Illustrative stream screenshot */}
        <figure className="rounded-xl overflow-hidden border border-border/50 mb-8">
          <img
            src={bonusHuntOverlay}
            alt="Bonus hunt live stream med overlay der viser startbalance, REQ X, AVG X og listen over gemte bonusser under åbning"
            className="w-full h-auto"
            loading="lazy"
            width={1512}
            height={816}
          />
          <figcaption className="bg-card px-4 py-2.5 text-xs text-muted-foreground">
            Live bonus hunt åbning – til højre ses listen med alle gemte bonusser, deres indsats og gevinst. REQ X viser den nødvendige gennemsnitlige multiplikator for break-even.
          </figcaption>
        </figure>

        {/* SEO Content BEFORE cards (Type B: content-first layout) */}
        <BonusHuntArkivSeoContent />

        {/* Archive heading */}
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          Alle Dokumenterede Hunts
        </h2>

        {/* Archive Cards */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Indlæser arkiv...</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {archives?.map((hunt) => (
              <Card key={hunt.id} className="group hover:border-primary/50 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {hunt.hunt_name || `Bonus Hunt #${hunt.hunt_number}`}
                    </CardTitle>
                    <Badge variant="outline" className="shrink-0">#{hunt.hunt_number}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Slots</div>
                      <div className="text-lg font-bold text-foreground">{hunt.total_slots || 0}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Åbnet</div>
                      <div className="text-lg font-bold text-foreground">{hunt.opened_slots || 0}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Gns. X</div>
                      <div className="text-lg font-bold text-primary">
                        {hunt.average_x ? `${Number(hunt.average_x).toFixed(2)}x` : "–"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Start: {hunt.start_balance ? `${Number(hunt.start_balance).toLocaleString("da-DK")} kr` : "–"}
                    </span>
                    <Link
                      to={`/bonus-hunt?hunt=${hunt.hunt_number}`}
                      className="flex items-center gap-1 text-primary hover:underline font-medium"
                    >
                      Se detaljer <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <BonusHuntArkivSeoContent />

        <CommunitySeoSections />

        <RelatedGuides currentPath="/bonus-hunt/arkiv" />

        <div className="mt-12">
          <FAQSection faqs={faqItems} />
        </div>

        <CommunityBrandBlock />

        <AuthorBio author="kevin" />
      </div>
    </>
  );
}
