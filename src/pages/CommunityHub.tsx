import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
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
  Sparkles,
  ArrowRight,
  Users,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const SECTIONS = [
  {
    title: "Spillehal",
    description:
      "Spil vores egne gratis spilleautomater – Book of Fedesvin, Rise of Fedesvin og flere. Optjen point og konkurrer med andre spillere.",
    href: "/community/slots",
    icon: Gamepad2,
    badge: "Populær",
    color: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-500",
    badgeColor: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  {
    title: "Turneringer",
    description:
      "Deltag i slot-turneringer og kæmp om præmier! Se aktive turneringer, ranglister og vindere.",
    href: "/community/leaderboard",
    icon: Trophy,
    badge: "Ugentlige præmier",
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-500",
    badgeColor: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
  },
  {
    title: "Highlights",
    description:
      "Se de bedste øjeblikke fra streams og community. Twitch clips, YouTube videoer og bruger-indsendte highlights.",
    href: "/highlights",
    icon: Video,
    badge: "Clips & Streams",
    color: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-500",
    badgeColor: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
  },
  {
    title: "Rewards Program",
    description:
      "Optjen ekstra spins ved at bidrage til fællesskabet. Upload clips, udfyld din profil og request slots.",
    href: "/community/rewards",
    icon: Gift,
    badge: "Bonus Spins",
    color: "from-green-500/20 to-green-500/5",
    iconColor: "text-green-500",
    badgeColor: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30",
  },
  {
    title: "Butik",
    description:
      "Shop eksklusive varer med dine Twitch-point. Gaming headsets, gavekort, konsoller og mere.",
    href: "/butik",
    icon: ShoppingBag,
    badge: "Twitch Point",
    color: "from-rose-500/20 to-rose-500/5",
    iconColor: "text-rose-500",
    badgeColor: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
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
        <div className="container py-8 md:py-12">
          {/* Welcome section for non-logged-in users */}
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

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.href}
                  to={section.href}
                  className="group"
                >
                  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/30 group-hover:-translate-y-0.5">
                    <CardContent className="p-6">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} mb-4`}>
                        <Icon className={`h-6 w-6 ${section.iconColor}`} />
                      </div>
                      <Badge
                        variant="outline"
                        className={`mb-3 text-xs ${section.badgeColor}`}
                      >
                        {section.badge}
                      </Badge>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
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
        </div>
      </CommunityPageLayout>
    </>
  );
}
