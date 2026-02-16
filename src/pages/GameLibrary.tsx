import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { CommunityNav } from "@/components/community/CommunityNav";
import { CommunityConversionStrip } from "@/components/community/CommunityConversionStrip";
import { CommunityBrandBlock } from "@/components/community/CommunityBrandBlock";
import { CommunitySeoBridge } from "@/components/community/CommunitySeoBridge";
import { CommunityConversionCard } from "@/components/community/CommunityConversionCard";
import { useAuth } from "@/hooks/useAuth";

import { FeaturedSlotPanel } from "@/components/games/FeaturedSlotPanel";
import { GameCard } from "@/components/games/GameCard";
import { Gamepad2, Clock } from "lucide-react";
import slotIntroImage from "@/assets/slots/slot-intro-screen.jpg";
import riseIntroImage from "@/assets/slots/rise/intro-screen.jpg";
import leFedesvinImage from "@/assets/slots/le-fedesvin-preview.jpg";
import olympusImage from "@/assets/slots/fedesvin-of-olympus-preview.jpg";

const FEATURED_SLOTS = [
  {
    id: "book-of-fedesvin",
    title: "Book of Fedesvin",
    description: "Udforsk de gamle egyptiske skatte med expanding symbols og free spins. Vores mest populære maskine.",
    image: slotIntroImage,
    href: "/community/slots/book-of-fedesvin",
    badge: "🔥 POPULÆR",
    priority: "primary" as const,
  },
  {
    id: "rise-of-fedesvin",
    title: "Rise of Fedesvin",
    description: "Merlins magi venter! Multi-expanding symbols i bonusrunden – jo flere retriggers, jo flere aktive symboler!",
    image: riseIntroImage,
    href: "/community/slots/rise-of-fedesvin",
    badge: "✨ NY",
    priority: "secondary" as const,
  },
];

const MORE_SLOTS = [
  {
    id: "le-fedesvin",
    title: "Le Fedesvin",
    description: "Oplev den franske elegance med roulette-inspirerede bonusrunder og luksuriøse gevinster.",
    image: leFedesvinImage,
    href: "#",
    status: "coming-soon" as const,
  },
  {
    id: "fedesvin-of-olympus",
    title: "Fedesvin of Olympus",
    description: "Besteg Olympen og vind gudernes gunst! Cascading wins og multiplicerende lyn-gevinster.",
    image: olympusImage,
    href: "#",
    status: "coming-soon" as const,
  },
];

export default function GameLibrary() {
  const { loading } = useAuth();

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

      {/* Main content with sidebar */}
      <div className="container relative py-6">
        <div className="flex justify-center">
          {/* Main content – centered */}
          <div className="w-full max-w-4xl space-y-8 md:space-y-10">
            {/* Featured Slots */}
            {FEATURED_SLOTS.map((slot, index) => (
              <div
                key={slot.id}
                className="animate-fade-in"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: "both",
                }}
              >
                <FeaturedSlotPanel
                  title={slot.title}
                  description={slot.description}
                  image={slot.image}
                  href={slot.href}
                  badge={slot.badge}
                  priority={slot.priority}
                  showScrollHint={index === 0}
                />
              </div>
            ))}

            {/* More games */}
            {MORE_SLOTS.length > 0 && (
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  🔥 Flere spil på vej
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {MORE_SLOTS.map((game, index) => (
                    <div
                      key={game.id}
                      className="animate-fade-in"
                      style={{
                        animationDelay: `${(FEATURED_SLOTS.length + index) * 150}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      <GameCard
                        title={game.title}
                        description={game.description}
                        image={game.image}
                        href={game.href}
                        status={game.status}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Conversion strip + Brand block */}
            <div className="pb-8">
              <CommunityConversionStrip />
              <div className="mt-8">
                <CommunityBrandBlock />
              </div>
            </div>
          </div>

          {/* SEO Sidebar – positioned to the right, outside centered content */}
          <div className="hidden xl:block absolute right-full top-0 mr-6 w-[260px] pt-8 md:pt-12" style={{ right: "auto", left: "calc(50% + 32rem + 1.5rem)" }}>
            <div className="sticky top-24 h-fit flex flex-col gap-4">
              <CommunitySeoBridge />
              <CommunityConversionCard />
            </div>
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
    <section className="relative overflow-hidden text-foreground">
      {/* Multi-layer gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, hsl(260 70% 18%) 0%, hsl(250 60% 14%) 30%, hsl(230 50% 12%) 60%, hsl(210 80% 18%) 100%)",
        }}
      />
      {/* Accent glow layers */}
      <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(ellipse at 20% 50%, hsl(260 80% 40% / 0.3), transparent 60%)" }} />
      <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at 80% 30%, hsl(210 90% 40% / 0.25), transparent 50%)" }} />
      <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at 50% 100%, hsl(35 90% 50% / 0.15), transparent 40%)" }} />

      <div className="container relative z-10 py-8 md:py-12">
        <div className="mx-auto max-w-2xl text-center space-y-2.5">
          <div className="mx-auto mb-2 h-14 w-14 rounded-full bg-amber-500/15 backdrop-blur-sm border border-amber-500/20 flex items-center justify-center">
            <Gamepad2 className="h-7 w-7 text-amber-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            Spillehal
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-lg mx-auto">
            Vælg et spil og begynd at spille. Optjen point og kæmp om pladserne på ranglisten!
          </p>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Lær om{" "}
            <Link to="/casino-bonus" className="text-white/80 underline hover:text-white">casino bonusser</Link>,{" "}
            <Link to="/free-spins" className="text-white/80 underline hover:text-white">free spins</Link> og{" "}
            <Link to="/omsaetningskrav" className="text-white/80 underline hover:text-white">omsætningskrav</Link>{" "}
            i vores guides.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-sm">
            <Clock className="h-4 w-4 text-amber-400" />
            <span>Nye credits om</span>
            <span className="font-mono font-semibold text-amber-400 tabular-nums">{countdown}</span>
          </div>
        </div>
      </div>

      {/* Animated decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[hsl(210_80%_60%)] opacity-10 blur-3xl" style={{ animation: "float 6s ease-in-out infinite" }} />
        <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-[hsl(260_70%_60%)] opacity-10 blur-3xl" style={{ animation: "float 8s ease-in-out infinite 1s" }} />
        <div className="absolute left-1/3 top-1/2 h-28 w-28 rounded-full bg-amber-500 opacity-8 blur-3xl" style={{ animation: "float 7s ease-in-out infinite 0.5s" }} />
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
