import { useEffect } from "react";
import introImage from "@/assets/slots/slot-intro-screen.jpg";
import defaultSlotBackground from "@/assets/slots/slot-background.jpg";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { slotSounds } from "@/lib/slotSoundEffects";

interface SlotIntroScreenProps {
  onStart: () => void;
}

export function SlotIntroScreen({ onStart }: SlotIntroScreenProps) {
  const { data: siteSettings } = useSiteSettings();
  const backgroundImage = siteSettings?.slot_background_image || defaultSlotBackground;

  // Start background music when intro screen opens
  useEffect(() => {
    slotSounds.startMusic();
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] relative flex flex-col items-center justify-center px-4">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 -z-10" />
      
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
            src={introImage} 
            alt="Book of Fedesvin" 
            className="w-full max-w-[640px] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl h-auto rounded-xl border-2 border-amber-500/30 shadow-2xl transition-all duration-300 group-hover:scale-[1.02] group-hover:border-amber-500/50"
            style={{
              boxShadow: '0 0 40px rgba(251,191,36,0.3), 0 0 80px rgba(251,191,36,0.15), 0 0 120px rgba(251,191,36,0.08)'
            }}
          />
          {/* Click to play hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-100 text-sm font-medium animate-pulse">
            Klik for at spille
          </div>
        </div>
      </div>
    </div>
  );
}
