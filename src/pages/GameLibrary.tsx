import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { CommunityNav } from "@/components/community/CommunityNav";
import { CommunityConversionStrip } from "@/components/community/CommunityConversionStrip";
import { CommunityBrandBlock } from "@/components/community/CommunityBrandBlock";
import { useAuth } from "@/hooks/useAuth";
import { useSiteSettings } from "@/hooks/useSiteSettings";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameCard } from "@/components/games/GameCard";
import { SlotLeaderboard } from "@/components/slots/SlotLeaderboard";
import { Gamepad2, Clock, ArrowRight, Flame } from "lucide-react";
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

export default function GameLibrary() {
  const { data: siteSettings } = useSiteSettings();
  const { user, loading } = useAuth();

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
      
      {/* Featured Slot */}
      <div className="container py-8">
        <Link
          to="/community/slots/book-of-fedesvin"
          className="group block rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]"
          style={{
            border: "1px solid rgba(245,158,11,0.25)",
            background: "linear-gradient(135deg, hsl(260 30% 14%) 0%, hsl(35 30% 12%) 100%)",
          }}
        >
          <div className="flex flex-col md:flex-row">
            <div className="relative md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
              <img
                src={slotIntroImage}
                alt="Book of Fedesvin – Mest spillet"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/60 hidden md:block" />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center md:w-1/2">
              <Badge variant="outline" className="w-fit mb-3 bg-amber-500/15 text-amber-400 border-amber-500/30">
                <Flame className="h-3 w-3 mr-1" />
                Mest Spillet
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Book of Fedesvin</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Udforsk de gamle egyptiske skatte i denne spændende spillemaskine med expanding symbols og free spins. Spil gratis og optjen point!
              </p>
              <Button className="w-fit gap-2" size="lg">
                Spil Nu
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </Link>
      </div>

      {/* Section title */}
      <div className="container">
        <div className="flex items-center gap-3 mb-6">
          <Flame className="h-5 w-5 text-amber-400" />
          <h2 className="text-xl font-bold text-foreground">Populære slots i community</h2>
        </div>
      </div>

      <div className="pb-10">
        {/* Mobile/Tablet */}
        <div className="xl:hidden container">
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
          
          <div className="max-w-md mx-auto mb-8">
            <SlotLeaderboard />
          </div>
        </div>

        {/* Desktop: Centered game grid with leaderboard on right */}
        <div className="hidden xl:block container">
          <div className="flex justify-center gap-8">
            <div className="w-[700px]">
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
            <aside className="w-80 2xl:w-96 shrink-0">
              <SlotLeaderboard />
            </aside>
          </div>
        </div>
      </div>

      {/* Conversion strip + Brand block */}
      <div className="container pb-12">
        <CommunityConversionStrip />
        <CommunityBrandBlock />
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
