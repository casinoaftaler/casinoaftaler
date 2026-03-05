import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { CommunityPageLayout } from "@/components/community/CommunityPageLayout";
import { CommunityBrandBlock } from "@/components/community/CommunityBrandBlock";
import { CommunitySeoSections } from "@/components/community/CommunitySeoSections";
import { CommunityJoinCTA } from "@/components/community/CommunityJoinCTA";
import { buildArticleSchema, SITE_URL } from "@/lib/seo";


import { EnergySweep } from "@/components/community/EnergySweep";
import { useScrollReveal } from "@/hooks/useScrollReveal";
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
  Target,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

import spillehalImg from "@/assets/community/spillehal-card.jpg";
import turneringerImg from "@/assets/community/turneringer-card.jpg";
import highlightsImg from "@/assets/community/highlights-card.jpg";
import rewardsImg from "@/assets/community/rewards-card.jpg";
import butikImg from "@/assets/community/butik-card.jpg";
import spinTheReelImg from "@/assets/community/spin-the-reel-card.jpg";
import bonusHuntImg from "@/assets/community/bonus-hunt-card.jpg";
import hallOfFameImg from "@/assets/community/hall-of-fame-card.jpg";
import "@/styles/energy-sweep.css";
import "@/styles/community-micro.css";

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
    title: "Bonus Hunt",
    description:
      "Følg live bonus hunts, gæt end balance og bet på average multiplier grupper. Vind points og credits!",
    href: "/bonus-hunt",
    icon: Target,
    badge: "Live Betting",
    badgeColor: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    image: bonusHuntImg,
  },
  {
    title: "Turneringer",
    description:
      "Deltag i slot-turneringer og kæmp om præmier! Se aktive turneringer, ranglister og vindere.",
    href: "/community/turneringer",
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
    title: "Hall of Fame",
    description:
      "Se community-legender, all-time leaderboards, bedste clips og turneringsvindere. Ægte data fra vores spillere.",
    href: "/community/hall-of-fame",
    icon: Trophy,
    badge: "Legender",
    badgeColor: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
    image: hallOfFameImg,
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

function RevealSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, revealed } = useScrollReveal();
  return (
    <div ref={ref} className={`community-reveal ${revealed ? "revealed" : ""} ${className || ""}`}>
      {children}
    </div>
  );
}

function CommunityCard({ section }: { section: typeof SECTIONS[number] }) {
  const Icon = section.icon;
  return (
    <Link to={section.href} className="group community-card block">
      <Card className="h-full overflow-hidden border-border/50">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={section.image}
            alt={section.title}
            width={640}
            height={360}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent card-overlay" />
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
          <p className="text-sm text-muted-foreground leading-relaxed mb-3 card-description">
            {section.description}
          </p>
          <div className="flex items-center text-sm font-medium text-primary">
            Gå til {section.title.toLowerCase()}
            <ArrowRight className="h-4 w-4 ml-1 card-arrow" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function CommunityHub() {
  const { user } = useAuth();

  return (
    <>
      <SEO
        title="Community – Gratis Slots, Turneringer & Bonus Spins"
        description="Spil gratis slots, deltag i turneringer og optjen points i Casinoaftaler.dk's community. Vind spins og præmier hver dag."
        
      />
      <CommunityPageLayout
        title="Community"
        description="Spil gratis spillemaskiner i Casinoaftalers community, deltag i turneringer og optjen bonus spins hver dag."
        badgeText="Fællesskab"
        badgeIcon={Users}
        heroExtra={
          <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl mx-auto">
            Udforsk vores guides til{" "}
            <Link to="/nye-casinoer" className="text-white/90 underline hover:text-white">nye casinoer</Link>,{" "}
            <Link to="/casino-bonus" className="text-white/90 underline hover:text-white">casino bonusser</Link> og{" "}
            <Link to="/free-spins" className="text-white/90 underline hover:text-white">free spins</Link>.
            Prøv gratis{" "}
            <Link to="/casinospil/spillemaskiner" className="text-white/90 underline hover:text-white">spillemaskiner</Link>{" "}
            og lær om{" "}
            <Link to="/omsaetningskrav" className="text-white/90 underline hover:text-white">omsætningskrav</Link>.
          </p>
        }
      >
        <div className="py-8 md:py-12" style={{ minHeight: '80vh' }}>

          {!user && (
            <RevealSection className="mb-8">
              <CommunityJoinCTA />
            </RevealSection>
          )}

          {/* First row – 3 cards */}
          <RevealSection>
            <EnergySweep>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {SECTIONS.slice(0, 3).map((section) => (
                  <CommunityCard key={section.href} section={section} />
                ))}
              </div>
            </EnergySweep>
          </RevealSection>

          {/* Feature strip */}
          <RevealSection>
            <EnergySweep>
              <Link
                to="/velkomstbonus"
                className="community-strip community-panel group block mt-6 mb-6 rounded-xl p-6"
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
                    className="gap-2 shrink-0 font-semibold shadow-lg community-btn-glow"
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
          </RevealSection>

          {/* Second row */}
          <RevealSection>
            <EnergySweep>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {SECTIONS.slice(3).map((section) => (
                  <CommunityCard key={section.href} section={section} />
                ))}
              </div>
            </EnergySweep>
          </RevealSection>

          <CommunitySeoSections />
          <CommunityBrandBlock />
        </div>
      </CommunityPageLayout>
    </>
  );
}
