import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { CommunityNav } from "@/components/community/CommunityNav";
import { useAuth } from "@/hooks/useAuth";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useCasinos } from "@/hooks/useCasinos";
import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/games/GameCard";
import { SlotLeaderboard } from "@/components/slots/SlotLeaderboard";
import { CasinoCard } from "@/components/CasinoCard";
import { Gamepad2, Clock } from "lucide-react";
import slotIntroImage from "@/assets/slots/slot-intro-screen.jpg";
import bookTitleFallback from "@/assets/slots/book-of-fedesvin-title.png";
import riseTitleFallback from "@/assets/slots/rise/title-logo.png";
import riseIntroImage from "@/assets/slots/rise/intro-screen.jpg";
import leFedesvinImage from "@/assets/slots/le-fedesvin-preview.jpg";
import leFedesvinTitleFallback from "@/assets/slots/le-fedesvin-title.png";
import olympusImage from "@/assets/slots/fedesvin-of-olympus-preview.jpg";
import olympusTitleFallback from "@/assets/slots/fedesvin-of-olympus-title.png";

interface GameDef {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  status: "active" | "coming-soon";
  badge?: string;
  titleSettingsKey: string;
  titleFallback: string;
}

const GAMES: GameDef[] = [
  {
    id: "book-of-fedesvin",
    title: "Book of Fedesvin",
    description: "Udforsk de gamle egyptiske skatte i denne spændende spillemaskine med expanding symbols og free spins.",
    image: slotIntroImage,
    href: "/community/slots/book-of-fedesvin",
    status: "active",
    badge: "POPULÆR",
    titleSettingsKey: "slot_title_image",
    titleFallback: bookTitleFallback,
  },
  {
    id: "rise-of-fedesvin",
    title: "Rise of Fedesvin",
    description: "Merlins magi venter! Multi-expanding symbols i bonusrunden – jo flere retriggers, jo flere aktive symboler!",
    image: riseIntroImage,
    href: "/community/slots/rise-of-fedesvin",
    status: "active",
    badge: "NY",
    titleSettingsKey: "rise_of_fedesvin_title_image",
    titleFallback: riseTitleFallback,
  },
  {
    id: "le-fedesvin",
    title: "Le Fedesvin",
    description: "Oplev den franske elegance med roulette-inspirerede bonusrunder og luksuriøse gevinster i Parisisk stil.",
    image: leFedesvinImage,
    href: "#",
    status: "coming-soon",
    titleSettingsKey: "le_fedesvin_title_image",
    titleFallback: leFedesvinTitleFallback,
  },
  {
    id: "fedesvin-of-olympus",
    title: "Fedesvin of Olympus",
    description: "Besteg Olympen og vind gudernes gunst! Cascading wins og multiplicerende lyn-gevinster venter.",
    image: olympusImage,
    href: "#",
    status: "coming-soon",
    titleSettingsKey: "fedesvin_of_olympus_title_image",
    titleFallback: olympusTitleFallback,
  },
];

// Map casino from DB format to CasinoCard format
function mapCasino(casino: ReturnType<typeof useCasinos>["data"] extends (infer T)[] | undefined ? T : never) {
  return {
    id: casino.id,
    name: casino.name,
    slug: casino.slug,
    rating: Number(casino.rating),
    bonusTitle: casino.bonus_title,
    bonusAmount: casino.bonus_amount,
    bonusType: casino.bonus_type,
    wageringRequirements: casino.wagering_requirements,
    validity: casino.validity,
    minDeposit: casino.min_deposit,
    payoutTime: casino.payout_time,
    freeSpins: casino.free_spins,
    features: casino.features ?? [],
    pros: casino.pros ?? [],
    cons: casino.cons ?? [],
    description: casino.description ?? "",
    isRecommended: casino.is_recommended,
    isHot: casino.is_hot,
    logoUrl: casino.logo_url,
    affiliateUrl: casino.affiliate_url,
    gameProviders: casino.game_providers ?? [],
  };
}

export default function GameLibrary() {
  const { data: siteSettings } = useSiteSettings();
  const { user, loading } = useAuth();
  const { data: casinos } = useCasinos();
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);

  // Get the first two active casinos for the sidebar banners
  const sidebarCasinos = casinos?.filter(c => c.is_active).slice(0, 2) ?? [];

  // Show loading state only briefly - don't block the page
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] relative">
        <PageBackground />
        <div className="container py-8 flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Indlæser...</div>
        </div>
      </div>
    );
  }

  // Allow all users to browse the page - login is only required when clicking to play

  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      <SEO
        title="Spillehal – Gratis Spilleautomater | Casinoaftaler"
        description="Udforsk vores gratis spilleautomater hos Casinoaftaler. Spil Book of Fedesvin, Rise of Fedesvin og flere spil. Optjen point og konkurrer på ranglisten."
        noindex
      />
      <PageBackground />
      <GameLibraryHero />
      <CommunityNav />
      
      <div className="py-10">
        {/* Mobile/Tablet: Games FIRST, then banners */}
        <div className="xl:hidden container">
          {/* Game grid - appears first on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[600px] mx-auto mb-8">
            {GAMES.map((game, index) => (
              <div
                key={game.id}
                className="animate-fade-in"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "both",
                }}
              >
                <GameCard
                  title={game.title}
                  description={game.description}
                  image={game.image}
                  href={game.href}
                  status={game.status}
                  badge={game.badge}
                />
              </div>
            ))}
          </div>
          
          {/* Leaderboards - appear after games on mobile */}
          <div className="max-w-md mx-auto mb-8">
            <SlotLeaderboard />
          </div>

          {/* Banners - appear after leaderboards on mobile */}
          <div className="space-y-4 max-w-md mx-auto">
            {sidebarCasinos.map((casino, index) => (
              <CasinoCard
                key={casino.id}
                casino={mapCasino(casino)}
                rank={index + 1}
                open={openCasinoId === casino.id}
                onOpenChange={(open) => setOpenCasinoId(open ? casino.id : null)}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Full-width layout with viewport-centered game grid */}
        <div className="hidden xl:flex xl:items-start w-full">
          {/* Left spacer with banners - takes fixed width, banners aligned to right edge */}
          <div className="flex-shrink-0 w-[calc(50vw-480px-24px)] min-w-[340px] 2xl:min-w-[400px] flex justify-end pr-6">
            <aside className="w-80 2xl:w-96 space-y-4">
              {sidebarCasinos.map((casino, index) => (
                <CasinoCard
                  key={casino.id}
                  casino={mapCasino(casino)}
                  rank={index + 1}
                  open={openCasinoId === casino.id}
                  onOpenChange={(open) => setOpenCasinoId(open ? casino.id : null)}
                />
              ))}
            </aside>
          </div>

          {/* Viewport-centered wrapper for the game grid - fixed width, centered */}
          <div className="flex-shrink-0 w-[960px] px-4">
            <div className="grid grid-cols-2 gap-6">
              {GAMES.map((game, index) => (
                <div
                  key={game.id}
                  className="animate-fade-in"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <GameCard
                    title={game.title}
                    description={game.description}
                    image={game.image}
                    href={game.href}
                    status={game.status}
                    badge={game.badge}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Leaderboards */}
          <div className="flex-shrink-0 w-[calc(50vw-480px-24px)] min-w-[340px] 2xl:min-w-[400px] flex justify-start pl-6">
            <aside className="w-80 2xl:w-96">
              <SlotLeaderboard />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function useCreditCountdown() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function calcTimeLeft() {
      const now = new Date();
      // Next refill is midnight Danish time (Europe/Copenhagen)
      // Get current date in Danish timezone
      const danishNow = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Copenhagen" }));
      const midnight = new Date(danishNow);
      midnight.setHours(24, 0, 0, 0);
      const diffMs = midnight.getTime() - danishNow.getTime();
      
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    setTimeLeft(calcTimeLeft());
    const interval = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

function GameLibraryHero() {
  const countdown = useCreditCountdown();

  return (
    <section
      className="relative overflow-hidden py-14 md:py-20 text-foreground"
      style={{
        background: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
      }}
    >
      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-amber-500/15 backdrop-blur-sm border border-amber-500/20 flex items-center justify-center">
            <Gamepad2 className="h-10 w-10 text-amber-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Spillehal
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto mb-2">
            Vælg et spil og begynd at spille. Optjen point og kæmp om pladserne på ranglisten!
          </p>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Lær om{" "}
            <Link to="/casino-bonus" className="text-white/80 underline hover:text-white">casino bonusser</Link>,{" "}
            <Link to="/free-spins" className="text-white/80 underline hover:text-white">free spins</Link> og{" "}
            <Link to="/omsaetningskrav" className="text-white/80 underline hover:text-white">omsætningskrav</Link>{" "}
            i vores guides.
          </p>
          
          {/* Credit refill countdown */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-sm">
            <Clock className="h-4 w-4 text-amber-400" />
            <span>Nye credits om</span>
            <span className="font-mono font-semibold text-amber-400 tabular-nums">{countdown}</span>
          </div>
        </div>
      </div>
      {/* Decorative blur circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[hsl(210_80%_60%)] opacity-15 blur-2xl"
          style={{ animation: "float 6s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-[hsl(260_70%_60%)] opacity-15 blur-2xl"
          style={{ animation: "float 8s ease-in-out infinite 1s" }}
        />
        <div
          className="absolute left-1/3 top-1/2 h-28 w-28 rounded-full bg-amber-500 opacity-10 blur-2xl"
          style={{ animation: "float 7s ease-in-out infinite 0.5s" }}
        />
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-15px) translateX(5px); }
          50% { transform: translateY(-8px) translateX(-5px); }
          75% { transform: translateY(-20px) translateX(3px); }
        }
      `}</style>
    </section>
  );
}

function PageBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/8 via-transparent to-transparent -z-10" />
    </>
  );
}
