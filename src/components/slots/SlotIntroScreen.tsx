import introImage from "@/assets/slots/slot-intro-screen.jpg";
import defaultSlotBackground from "@/assets/slots/slot-background.jpg";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface SlotIntroScreenProps {
  onStart: () => void;
}

export function SlotIntroScreen({ onStart }: SlotIntroScreenProps) {
  const { data: siteSettings } = useSiteSettings();
  const backgroundImage = siteSettings?.slot_background_image || defaultSlotBackground;

  return (
    <div className="min-h-[calc(100vh-4rem)] relative flex flex-col items-center justify-start pt-4 sm:pt-6 px-4">
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
        {/* Intro Image */}
        <div className="relative">
          <img 
            src={introImage} 
            alt="Book of Fedesvin" 
            className="w-full max-w-[640px] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl h-auto rounded-lg shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
            style={{
              boxShadow: '0 0 40px rgba(251,191,36,0.3), 0 0 80px rgba(251,191,36,0.15)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
