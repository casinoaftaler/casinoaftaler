import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import defaultTitleImage from "@/assets/slots/book-of-fedesvin-title.png";
import defaultSlotBackground from "@/assets/slots/slot-background.jpg";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface SlotLoadingScreenProps {
  onComplete: () => void;
}

export function SlotLoadingScreen({ onComplete }: SlotLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const { data: siteSettings } = useSiteSettings();
  
  const titleImage = siteSettings?.slot_title_image || defaultTitleImage;
  const backgroundImage = siteSettings?.slot_background_image || defaultSlotBackground;

  useEffect(() => {
    const duration = 2500; // 2.5 seconds
    const interval = 50; // Update every 50ms
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200); // Small delay after reaching 100%
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-[calc(100vh-4rem)] relative flex flex-col items-center justify-center">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/90 -z-10" />
      
      {/* Content */}
      <div className="flex flex-col items-center gap-8 px-4 animate-fade-in">
        {/* Title Image */}
        <img 
          src={titleImage} 
          alt="Book of Fedesvin" 
          className="w-full max-w-[200px] sm:max-w-sm md:max-w-md h-auto"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.5)) drop-shadow(0 0 40px rgba(251,191,36,0.3))'
          }}
        />
        
        {/* Loading Bar */}
        <div className="w-full max-w-xs sm:max-w-sm space-y-3">
          <div className="relative">
            <Progress 
              value={progress} 
              className="h-4 bg-amber-950/50 border border-amber-500/30 rounded-full overflow-hidden"
            />
            {/* Golden overlay effect */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)'
              }}
            />
          </div>
          
          <p className="text-center text-amber-500/80 text-sm font-medium">
            Indlæser spillemaskine... {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
}
