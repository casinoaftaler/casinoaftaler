import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/games/GameCard";
import { Gamepad2, Sparkles } from "lucide-react";
import slotIntroImage from "@/assets/slots/slot-intro-screen.jpg";

const GAMES = [
  {
    id: "book-of-fedesvin",
    title: "Book of Fedesvin",
    description: "Udforsk de gamle egyptiske skatte i denne spændende spillemaskine med expanding symbols og free spins.",
    image: slotIntroImage,
    href: "/community/slots/book-of-fedesvin",
    status: "active" as const,
  },
  {
    id: "coming-soon-1",
    title: "Nyt spil",
    description: "Et helt nyt spil er på vej. Bliv klar til en ny oplevelse!",
    image: slotIntroImage,
    href: "#",
    status: "coming-soon" as const,
  },
];

export default function GameLibrary() {
  const { user, loading } = useAuth();

  // Loading state
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

  // Login prompt
  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] relative">
        <PageBackground />
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

  // Game library
  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      <PageBackground />
      <div className="container py-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-amber-500" />
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Spillehal</h1>
            <Sparkles className="h-6 w-6 text-amber-500" />
          </div>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Vælg et spil og begynd at spille. Optjen point og kæmp om pladserne på ranglisten!
          </p>
        </div>

        {/* Game grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {GAMES.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              image={game.image}
              href={game.href}
              status={game.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PageBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent -z-10" />
    </>
  );
}
