import { Button } from "@/components/ui/button";
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
    <div className="min-h-[calc(100vh-4rem)] relative flex flex-col items-center justify-center px-4">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90 -z-10" />
      
      {/* Content */}
      <div 
        className="flex flex-col items-center gap-6 animate-fade-in"
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
        <div className="relative cursor-pointer group">
          <img 
            src={introImage} 
            alt="Book of Fedesvin - Klik for at fortsætte" 
            className="w-full max-w-[320px] sm:max-w-md md:max-w-lg lg:max-w-xl h-auto rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
            style={{
              boxShadow: '0 0 40px rgba(251,191,36,0.3), 0 0 80px rgba(251,191,36,0.15)'
            }}
          />
          
          {/* Overlay hint */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
            <span className="text-amber-400 font-bold text-lg sm:text-xl tracking-wider uppercase">
              Klik for at spille
            </span>
          </div>
        </div>
        
        {/* Continue Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onStart();
          }}
          size="lg"
          className="px-8 py-6 text-lg font-bold uppercase tracking-wider bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-400 hover:to-amber-500 text-amber-950 border-2 border-amber-400/50 shadow-lg transition-all duration-300 hover:scale-105"
          style={{
            boxShadow: '0 0 20px rgba(251,191,36,0.4), 0 4px 20px rgba(0,0,0,0.3)'
          }}
        >
          Fortsæt
        </Button>
        
        <p className="text-amber-500/60 text-sm animate-pulse">
          Tryk på billedet eller knappen for at fortsætte
        </p>
      </div>
    </div>
  );
}
