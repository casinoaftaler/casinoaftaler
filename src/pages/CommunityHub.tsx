import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { CommunityPageLayout } from "@/components/community/CommunityPageLayout";
import { CommunityBrandBlock } from "@/components/community/CommunityBrandBlock";
import { CommunityJoinCTA } from "@/components/community/CommunityJoinCTA";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { buildArticleSchema, SITE_URL } from "@/lib/seo";
import { EnergySweep } from "@/components/community/EnergySweep";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Gamepad2,
  Trophy,
  Video,
  Gift,
  ShoppingBag,
  RotateCw,
  ArrowRight,
  Users,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

import spillehalImg from "@/assets/community/spillehal-card.jpg";
import turneringerImg from "@/assets/community/turneringer-card.jpg";
import highlightsImg from "@/assets/community/highlights-card.jpg";
import rewardsImg from "@/assets/community/rewards-card.jpg";
import butikImg from "@/assets/community/butik-card.jpg";
import spinTheReelImg from "@/assets/community/spin-the-reel-card.jpg";
import "@/styles/energy-sweep.css";

const SECTIONS = [
  {
    title: "Spillehal",
    description:
      "Spil vores egne gratis spilleautomater – Book of Fedesvin, Rise of Fedesvin og flere. Optjen point og konkurrer med andre spillere.",
    href: "/community/slots",
    icon: Gamepad2,
    badge: "Populær",
    badgeColor: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    image: spillehalImg,
  },
  {
    title: "Turneringer",
    description:
      "Deltag i slot-turneringer og kæmp om præmier! Se aktive turneringer, ranglister og vindere.",
    href: "/community/leaderboard",
    icon: Trophy,
    badge: "Ugentlige præmier",
    badgeColor: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    image: turneringerImg,
  },
  {
    title: "Highlights",
    description:
      "Se de bedste øjeblikke fra streams og community. Twitch clips, YouTube videoer og bruger-indsendte highlights.",
    href: "/highlights",
    icon: Video,
    badge: "Clips & Streams",
    badgeColor: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    image: highlightsImg,
  },
  {
    title: "Rewards Program",
    description:
      "Optjen ekstra spins ved at bidrage til fællesskabet. Upload clips, udfyld din profil og request slots.",
    href: "/community/rewards",
    icon: Gift,
    badge: "Bonus Spins",
    badgeColor: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30",
    image: rewardsImg,
  },
  {
    title: "Spin the Reel",
    description:
      "Spin hjulet hver 12. time og vind points eller ekstra spins! Prøv lykken og se hvad du kan vinde.",
    href: "/community/spin-the-reel",
    icon: RotateCw,
    badge: "Hver 12. time",
    badgeColor: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    image: spinTheReelImg,
  },
  {
    title: "Butik",
    description:
      "Shop eksklusive varer med dine Twitch-point. Gaming headsets, gavekort, konsoller og mere.",
    href: "/butik",
    icon: ShoppingBag,
    badge: "Twitch Point",
    badgeColor: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    image: butikImg,
  },
];

export default function CommunityHub() {
  const { user } = useAuth();

  return (
    <>
      <SEO
        title="Community – Gratis Slots, Turneringer & Bonus Spins"
        description="Spil gratis slots, deltag i turneringer og optjen points i Casinoaftaler.dk's community. Vind spins og præmier hver dag."
        jsonLd={buildArticleSchema({
          headline: "Community – Gratis Slots, Turneringer & Bonus Spins",
          description: "Spil gratis slots, deltag i turneringer og optjen points i Casinoaftaler.dk's community. Vind spins og præmier hver dag.",
          url: `${SITE_URL}/community`,
          datePublished: "2025-06-01",
          dateModified: "2026-02-16",
          authorName: "Jonas",
          authorUrl: `${SITE_URL}/forfatter/jonas`,
        })}
      />
      <CommunityPageLayout
        title="Community"
        description="Spil gratis slots, kæmp om præmier i turneringer, del highlights og optjen bonus spins. Alt samlet ét sted."
        badgeText="Fællesskab"
        badgeIcon={Users}
      >
        <div className="py-8 md:py-12">
          <AuthorMetaBar author="jonas" date="16. februar 2026" readTime="3 min" showFactCheck={false} />

          <p className="text-muted-foreground leading-relaxed mb-6">
            Velkommen til Casinoaftalers community – et gratis fællesskab for casino-entusiaster. Her kan du spille gratis{" "}
            <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spillemaskiner</Link>, deltage i turneringer og optjene bonus spins.
            Uanset om du leder efter de{" "}
            <Link to="/nye-casinoer" className="text-primary hover:underline">nyeste casinoer</Link> eller vil forstå{" "}
            <Link to="/omsaetningskrav" className="text-primary hover:underline">omsætningskrav</Link>, har vi dig dækket.
            Udforsk vores guides til{" "}
            <Link to="/casino-bonus" className="text-primary hover:underline">casino bonusser</Link> og{" "}
            <Link to="/free-spins" className="text-primary hover:underline">free spins</Link> for at få mest muligt ud af din spilleoplevelse.
          </p>

          {!user && (
            <div className="mb-8">
              <CommunityJoinCTA />
            </div>
          )}

          {/* First row – 3 cards with energy sweep */}
          <EnergySweep>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {SECTIONS.slice(0, 3).map((section) => {
                const Icon = section.icon;
                return (
                  <Link key={section.href} to={section.href} className="group">
                    <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/30 group-hover:-translate-y-0.5">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                        <Badge
                          variant="outline"
                          className={`absolute top-3 left-3 text-xs ${section.badgeColor} backdrop-blur-sm`}
                        >
                          {section.badge}
                        </Badge>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-lg mb-1.5 group-hover:text-primary transition-colors flex items-center gap-2">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          {section.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {section.description}
                        </p>
                        <div className="flex items-center text-sm font-medium text-primary">
                          Gå til {section.title.toLowerCase()}
                          <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </EnergySweep>

          {/* Feature strip with energy sweep */}
          <EnergySweep>
            <Link
              to="/velkomstbonus"
              className="group block mt-6 mb-6 rounded-xl p-6 transition-all duration-300 hover:scale-[1.005] hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
              style={{
                border: "1px solid rgba(139,92,246,0.3)",
                background:
                  "linear-gradient(135deg, hsl(260 30% 16%) 0%, hsl(220 30% 16%) 100%)",
              }}
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg shrink-0" style={{ background: "linear-gradient(135deg, hsl(260 70% 50%), hsl(220 80% 50%))" }}>
                    <Gift className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                      🔥 Klar til en seriøs velkomstbonus?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Snup de bedste indbetalingsbonusser og kom stærkt fra start.
                    </p>
                  </div>
                </div>
                <Button
                  className="gap-2 shrink-0 font-semibold shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(260 70% 50%), hsl(220 80% 50%))",
                  }}
                >
                  Velkomstbonus
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Link>
          </EnergySweep>

          {/* Second row with energy sweep */}
          <EnergySweep>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {SECTIONS.slice(3).map((section) => {
                const Icon = section.icon;
                return (
                  <Link key={section.href} to={section.href} className="group">
                    <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/30 group-hover:-translate-y-0.5">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                        <Badge
                          variant="outline"
                          className={`absolute top-3 left-3 text-xs ${section.badgeColor} backdrop-blur-sm`}
                        >
                          {section.badge}
                        </Badge>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-lg mb-1.5 group-hover:text-primary transition-colors flex items-center gap-2">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          {section.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {section.description}
                        </p>
                        <div className="flex items-center text-sm font-medium text-primary">
                          Gå til {section.title.toLowerCase()}
                          <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </EnergySweep>

          <CommunityBrandBlock />
        </div>
      </CommunityPageLayout>
    </>
  );
}
