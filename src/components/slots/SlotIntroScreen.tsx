import { useEffect } from "react";
import introImage from "@/assets/slots/slot-intro-screen.jpg";
import riseIntroImage from "@/assets/slots/rise/intro-screen.jpg";
import gatesIntroImage from "@/assets/slots/gates/intro-screen.jpg";
import defaultSlotBackground from "@/assets/slots/slot-background.jpg";
import riseSlotBackground from "@/assets/slots/rise/background.jpg";
import gatesSlotBackground from "@/assets/slots/gates/background.jpg";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { slotSounds } from "@/lib/slotSoundEffects";
import { cn } from "@/lib/utils";
import { getSlotTheme } from "@/lib/slotTheme";

interface SlotIntroScreenProps {
  onStart: () => void;
  gameId?: string;
}

const GAME_INTRO_IMAGES: Record<string, string> = {
  "book-of-fedesvin": introImage,
  "rise-of-fedesvin": riseIntroImage,
  "gates-of-fedesvin": gatesIntroImage,
};

const GAME_DEFAULT_BACKGROUNDS: Record<string, string> = {
  "book-of-fedesvin": defaultSlotBackground,
  "rise-of-fedesvin": riseSlotBackground,
  "gates-of-fedesvin": gatesSlotBackground,
};

export function SlotIntroScreen({ onStart, gameId = "book-of-fedesvin" }: SlotIntroScreenProps) {
  const { data: siteSettings } = useSiteSettings();
  const theme = getSlotTheme(gameId);

  const isWizard = gameId === "rise-of-fedesvin";
  const isOlympus = gameId === "gates-of-fedesvin";
  const isBonanza = gameId === "fedesvin-bonanza";

  const bgKey = gameId === "book-of-fedesvin"
    ? "slot_background_image"
    : `${gameId.replace(/-/g, "_")}_background_image`;
  const gameDefaultBackground = GAME_DEFAULT_BACKGROUNDS[gameId] || defaultSlotBackground;
  const backgroundImage = siteSettings?.[bgKey] || gameDefaultBackground;
  const currentIntroImage = GAME_INTRO_IMAGES[gameId] || introImage;

  // Set game ID and start background music when intro screen opens
  useEffect(() => {
    slotSounds.setGameId(gameId);
    slotSounds.startMusic();
  }, [gameId]);

  return (
    <div className="min-h-[calc(100vh-4rem)] relative flex flex-col items-center justify-center px-4">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 -z-10" />
      {isWizard && (
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-indigo-900/20 -z-10" />
      )}
      {isOlympus && (
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-transparent to-amber-900/20 -z-10" />
      )}
      {isBonanza && (
        <div className="absolute inset-0 bg-gradient-to-b from-pink-900/30 via-fuchsia-900/10 to-pink-900/20 -z-10" />
      )}
      
      {/* Content */}
      <div 
        className="flex flex-col items-center gap-4 animate-fade-in cursor-pointer"
        onClick={onStart}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onStart();
          }
        }}
      >
        {/* Intro Image with enhanced styling */}
        <div className="relative group">
          <img 
            src={currentIntroImage} 
            alt={isBonanza ? "Fedesvin Bonanza" : gameId === "rise-of-fedesvin" ? "Rise of Fedesvin" : "Book of Fedesvin"} 
            className={cn(
              "w-full max-w-[640px] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl h-auto rounded-xl border-2 shadow-2xl transition-all duration-300 group-hover:scale-[1.02]",
              isBonanza
                ? "border-pink-500/30 group-hover:border-pink-500/50"
                : isWizard
                  ? "border-purple-500/30 group-hover:border-purple-500/50"
                  : "border-amber-500/30 group-hover:border-amber-500/50"
            )}
            style={{
              boxShadow: isBonanza
                ? '0 0 40px rgba(236,72,153,0.3), 0 0 80px rgba(236,72,153,0.15), 0 0 120px rgba(236,72,153,0.08)'
                : isOlympus
                  ? '0 0 40px rgba(59,130,246,0.3), 0 0 80px rgba(251,191,36,0.15), 0 0 120px rgba(59,130,246,0.08)'
                  : isWizard
                    ? '0 0 40px rgba(168,85,247,0.3), 0 0 80px rgba(168,85,247,0.15), 0 0 120px rgba(168,85,247,0.08)'
                    : '0 0 40px rgba(251,191,36,0.3), 0 0 80px rgba(251,191,36,0.15), 0 0 120px rgba(251,191,36,0.08)'
            }}
          />
          {/* Click to play hint */}
          <div className={cn(
            "absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full backdrop-blur-md text-sm font-medium animate-pulse",
            isBonanza
              ? "bg-pink-500/20 border border-pink-400/40 text-pink-100"
              : isOlympus
                ? "bg-blue-500/20 border border-amber-400/40 text-amber-100"
                : isWizard
                  ? "bg-purple-500/20 border border-purple-500/40 text-purple-100"
                  : "bg-amber-500/20 border border-amber-500/40 text-amber-100"
          )}>
            Klik for at spille
          </div>
        </div>
      </div>
    </div>
  );
}
