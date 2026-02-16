import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import jonasImage from "@/assets/jonas-forfatter.png";
import { CommunityPageLayout } from "@/components/community/CommunityPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Gamepad2,
  Trophy,
  Video,
  Gift,
  ShoppingBag,
  ArrowRight,
  Users,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

import spillehalImg from "@/assets/community/spillehal-card.jpg";
import turneringerImg from "@/assets/community/turneringer-card.jpg";
import highlightsImg from "@/assets/community/highlights-card.jpg";
import rewardsImg from "@/assets/community/rewards-card.jpg";
import butikImg from "@/assets/community/butik-card.jpg";

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
        title="Community – Spil, Konkurrér & Vind | Casinoaftaler"
        description="Udforsk Casinoaftalers community. Spil gratis slots, deltag i turneringer, se highlights, optjen rewards og shop med point."
        noindex
      />
      <CommunityPageLayout
        title="Community"
        description="Spil gratis slots, kæmp om præmier i turneringer, del highlights og optjen bonus spins. Alt samlet ét sted."
        badgeText="Fællesskab"
        badgeIcon={Users}
      >
        <div className="py-8 md:py-12">
          {!user && (
            <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
              <CardContent className="flex flex-col sm:flex-row items-center gap-4 py-6">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-1">
                    Bliv en del af vores community
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Log ind for at spille gratis slots, deltage i turneringer og optjene rewards.
                  </p>
                </div>
                <Button asChild>
                  <Link to="/auth">Log ind / Opret konto</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* First row – 3 cards */}
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

          {/* Feature strip – breaks grid rhythm */}
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

          {/* Second row – remaining cards */}
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

          {/* Founder / Brand block */}
          <section
            className="mt-12 rounded-xl p-6 md:p-8"
            style={{
              border: "1px solid rgba(139,92,246,0.25)",
              background:
                "linear-gradient(135deg, hsl(260 30% 15%) 0%, hsl(220 25% 14%) 100%)",
            }}
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={jonasImage}
                alt="Jonas – grundlægger af Casinoaftaler.dk"
                className="h-24 w-24 rounded-full object-cover shrink-0 ring-2 ring-primary/30"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-foreground mb-2">
                  🚀 Skabt af spillere – for spillere
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Community-universet på Casinoaftaler.dk er udviklet af Jonas, som også står bag vores analyser af nye casinoer og bonusser.
                  Målet er at samle gratis spil, turneringer og casinoindsigt ét sted – med fokus på gennemsigtighed og ansvarligt spil.
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5">✔ Uafhængige anmeldelser</span>
                  <span className="flex items-center gap-1.5">✔ Opdateret løbende</span>
                  <span className="flex items-center gap-1.5">✔ Fokus på ansvarligt spil</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/om" className="gap-2">
                    Læs mere om os
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </CommunityPageLayout>
    </>
  );
}
