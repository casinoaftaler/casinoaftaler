import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { buildArticleSchema, SITE_URL } from "@/lib/seo";
import { CommunityContentShell } from "@/components/community/CommunityContentShell";
import { CommunityNav } from "@/components/community/CommunityNav";
import { CommunityConversionStrip } from "@/components/community/CommunityConversionStrip";
import { CommunityFooterSeo } from "@/components/community/CommunityFooterSeo";

import { CommunityJoinCTA } from "@/components/community/CommunityJoinCTA";
import { useAuth } from "@/hooks/useAuth";

import { FeaturedSlotPanel } from "@/components/games/FeaturedSlotPanel";
import { SidebarLeaderboard } from "@/components/games/SidebarLeaderboard";
import { SidebarShopLeaderboard } from "@/components/games/SidebarShopLeaderboard";
import { SidebarSocialProof } from "@/components/games/SidebarSocialProof";
import { DailyMissionsWidget } from "@/components/community/DailyMissionsWidget";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import bookOfFedesvinPreview from "@/assets/slots/book-of-fedesvin-preview.jpg";
import riseIntroImage from "@/assets/slots/rise/intro-screen.jpg";
import leFedesvinImage from "@/assets/slots/le-fedesvin-preview.jpg";
import olympusImage from "@/assets/slots/fedesvin-of-olympus-preview.jpg";
import bonanzaImage from "@/assets/slots/fedesvin-bonanza-preview.webp";
import { SpillehalSeoText } from "@/components/community/SpillehalSeoText";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import "@/styles/spillehal-animations.css";
import "@/styles/community-micro.css";

const FEATURED_SLOTS = [
  {
    id: "book-of-fedesvin",
    title: "Book of Fedesvin",
    description: "Udforsk de gamle egyptiske skatte med expanding symbols og free spins. Vores mest populære maskine.",
    image: bookOfFedesvinPreview,
    href: "/community/slots/book-of-fedesvin",
    badge: "🔥 POPULÆR",
    priority: "primary" as const,
    imagePosition: "center 15%",
  },
  {
    id: "rise-of-fedesvin",
    title: "Rise of Fedesvin",
    description: "Merlins magi venter! Multi-expanding symbols i bonusrunden – jo flere retriggers, jo flere aktive symboler!",
    image: riseIntroImage,
    href: "/community/slots/rise-of-fedesvin",
    badge: "✨ NY",
    priority: "secondary" as const,
    imagePosition: "center 30%",
  },
  {
    id: "fedesvin-bonanza",
    title: "Fedesvin Bonanza",
    description: "Sødmefuld candy-action med tumble-gevinster og multiplier-bomber i bonusrunden!",
    image: bonanzaImage,
    href: "/community/slots/fedesvin-bonanza",
    badge: "✨ NY",
    priority: "secondary" as const,
  },
];

const MORE_SLOTS = [
  {
    id: "gates-of-fedesvin",
    title: "Gates of Fedesvin",
    description: "Besteg Olympen og vind gudernes gunst! Cascading wins og multiplicerende lyn-gevinster.",
    image: olympusImage,
    href: "/community/slots/gates-of-fedesvin",
    status: "coming-soon" as const,
  },
  {
    id: "le-fedesvin",
    title: "Le Fedesvin",
    description: "Oplev den franske elegance med roulette-inspirerede bonusrunder og luksuriøse gevinster.",
    image: leFedesvinImage,
    href: "#",
    status: "coming-soon" as const,
  },
];

export default function GameLibrary() {
  const { user, loading, isAdmin } = useAuth();

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
        title="Gratis Slots i Community – Spil Book of Fedesvin & Mere"
        description="Spil gratis community-slots som Book of Fedesvin og Rise of Fedesvin. Optjen points og konkurrér mod andre spillere."
        jsonLd={[buildArticleSchema({
          headline: "Gratis Slots i Community – Spil Book of Fedesvin & Mere",
          description: "Spil gratis community-slots som Book of Fedesvin og Rise of Fedesvin. Optjen points og konkurrér mod andre spillere.",
          url: `${SITE_URL}/community/slots`,
          datePublished: "2026-05-31",
        })]}
        breadcrumbLabel="Spillehal"
      />
      <PageBackground />
      <GameLibraryHero />
      <CommunityNav />

      <CommunityContentShell
        leftSidebar={
          <>
            <DailyMissionsWidget />
            <SidebarSocialProof />
            <SidebarLeaderboard />
            <SidebarShopLeaderboard />
          </>
        }
      >
        <div className="space-y-8 md:space-y-10">

          {/* Featured Slots - side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
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
                  imagePosition={slot.imagePosition}
                />
              </div>
            ))}
          </div>

          <SnippetAnswer answer="Spil gratis community-slots som Book of Fedesvin og Rise of Fedesvin direkte i browseren. Optjen points, kæmp om pladser på ranglisten og konkurrér i turneringer – helt uden risiko." />

          {/* Community CTA for logged-out users */}
          {!user && <CommunityJoinCTA description="Opret en gratis konto og spil community-slots som Book of Fedesvin. Optjen points og kæmp om pladser på ranglisten." />}



          {/* Upcoming exclusive games */}
          {MORE_SLOTS.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="flex items-center justify-center h-8 w-8 rounded-lg shrink-0"
                  style={{ background: "linear-gradient(135deg, hsl(260 70% 50%), hsl(220 80% 50%))" }}
                >
                  <Rocket className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    Kommende eksklusive spil
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Disse spil lanceres snart i Spillehallen – kun for medlemmer.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                {MORE_SLOTS.map((game, index) => (
                  <div
                    key={game.id}
                    className="animate-fade-in"
                    style={{
                      animationDelay: `${(FEATURED_SLOTS.length + index) * 150}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <FeaturedSlotPanel
                      title={game.title}
                      description={game.description}
                      image={game.image}
                      href={game.href}
                      badge={game.status === "coming-soon" ? (isAdmin ? "🔓 ADMIN" : "⏳ KOMMER SNART") : undefined}
                      disabled={game.status === "coming-soon" && !isAdmin}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section divider */}
          <div className="spillehal-divider" />

          {/* Footer SEO – anti-footprint rotated */}
          <CommunityFooterSeo
            currentPath="/community/slots"
            author="kevin"
            before={<SpillehalSeoText />}
          />

          <div className="pb-8" />
        </div>
      </CommunityContentShell>
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
    <section className="relative overflow-hidden text-white">
      {/* Hero background with parallax */}
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(135deg, hsl(260 70% 25% / 0.85), hsl(250 60% 20% / 0.8) 40%, hsl(210 80% 25% / 0.85))",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
      </div>

      <div className="container relative z-10 py-8 md:py-12">
        <div className="mx-auto max-w-2xl text-center space-y-2.5">
          <div className="mx-auto mb-2 h-14 w-14 rounded-full bg-amber-500/15 backdrop-blur-sm border border-amber-500/20 flex items-center justify-center">
            <MenuIcon iconName="gamepad2" className="h-7 w-7 text-amber-400" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-white">
            Spillehal
          </h1>
          <p className="text-lg text-white/80 max-w-lg mx-auto">
            Vælg et spil og begynd at spille. Optjen point og kæmp om pladserne på ranglisten!
          </p>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Lær om{" "}
            <Link to="/casino-bonus" className="text-white/80 underline hover:text-white">casino bonusser</Link>,{" "}
            <Link to="/free-spins" className="text-white/80 underline hover:text-white">free spins</Link> og{" "}
            <Link to="/omsaetningskrav" className="text-white/80 underline hover:text-white">omsætningskrav</Link>{" "}
            i vores guides.
          </p>
          {/* Countdown badge with subtle pulse */}
          <div className="animate-countdown-pulse inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-sm">
            <MenuIcon iconName="clock" className="h-4 w-4 text-amber-400" />
            <span>Nye credits om</span>
            <span className="font-mono font-semibold text-amber-400 tabular-nums">{countdown}</span>
          </div>
        </div>
      </div>
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
