import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/games/GameCard";
import { SlotLeaderboard } from "@/components/slots/SlotLeaderboard";
import { Gamepad2 } from "lucide-react";
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

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] relative">
        <PageBackground />
        <GameLibraryHero />
        <div className="container py-16">
          <div className="max-w-md mx-auto text-center space-y-6 bg-card/80 backdrop-blur-sm p-8 rounded-xl border border-amber-500/20">
            <div className="h-20 w-20 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center">
              <Gamepad2 className="h-10 w-10 text-amber-500" />
            </div>
            <h1 className="text-2xl font-bold">Log ind for at spille</h1>
            <p className="text-muted-foreground">
              Du skal være logget ind for at få adgang til vores spillehal og optjene point.
            </p>
            <Button asChild size="lg" className="bg-[#9146FF] hover:bg-[#772ce8]">
              <Link to="/auth">Log ind med Twitch</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      <PageBackground />
      <GameLibraryHero />
      <div className="container py-10 space-y-8">
        {/* Game grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
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

        {/* Leaderboards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <SlotLeaderboard gameId="book-of-fedesvin" />
          <SlotLeaderboard gameId="rise-of-fedesvin" />
        </div>
      </div>
    </div>
  );
}

function GameLibraryHero() {
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
          <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto">
            Vælg et spil og begynd at spille. Optjen point og kæmp om pladserne på ranglisten!
          </p>
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
