import { useEffect, useState, useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import defaultTitleImage from "@/assets/slots/book-of-fedesvin-title.png";
import defaultSlotBackground from "@/assets/slots/slot-background.jpg";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { useSlotSymbolPreloader } from "@/hooks/useSlotSymbolPreloader";

interface SlotLoadingScreenProps {
  onComplete: () => void;
}

export function SlotLoadingScreen({ onComplete }: SlotLoadingScreenProps) {
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const { data: siteSettings } = useSiteSettings();
  const { data: symbols } = useSlotSymbols();
  
  const titleImage = siteSettings?.slot_title_image || defaultTitleImage;
  const backgroundImage = siteSettings?.slot_background_image || defaultSlotBackground;
  const frameImage = siteSettings?.slot_machine_frame_image;
  
  // Preload symbols AND frame/background/title images together
  const additionalImages = useMemo(() => [
    frameImage,
    siteSettings?.slot_title_image,
    siteSettings?.slot_background_image,
  ], [frameImage, siteSettings?.slot_title_image, siteSettings?.slot_background_image]);
  
  const { isLoaded: assetsLoaded, progress: assetProgress } = useSlotSymbolPreloader(symbols, additionalImages);

  // Minimum display time for loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 1500); // Reduced to 1.5s since we're actually preloading now

    return () => clearTimeout(timer);
  }, []);

  // Complete when both minimum time has passed AND assets are loaded
  useEffect(() => {
    if (minTimeElapsed && assetsLoaded) {
      setTimeout(onComplete, 200); // Small delay after complete
    }
  }, [minTimeElapsed, assetsLoaded, onComplete]);

  // Combined progress: 50% for time, 50% for assets
  const timeProgress = minTimeElapsed ? 50 : 0;
  const assetProgressScaled = (assetProgress / 100) * 50;
  const totalProgress = Math.min(timeProgress + assetProgressScaled, 100);

  return (
    <div className="min-h-[calc(100vh-4rem)] relative flex flex-col items-center justify-center">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 -z-10" />
      
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
        
        {/* Loading Bar with Egyptian styling */}
        <div className="w-full max-w-xs sm:max-w-sm space-y-4">
          <div className="relative p-3 rounded-xl backdrop-blur-md bg-amber-950/40 border border-amber-500/20 shadow-[0_0_30px_rgba(251,191,36,0.15)]">
            <Progress 
              value={totalProgress} 
              className="h-5 bg-amber-950/60 border border-amber-500/40 rounded-full overflow-hidden"
            />
            {/* Golden shimmer overlay */}
            <div 
              className="absolute inset-3 rounded-full pointer-events-none overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)'
              }}
            />
          </div>
          
          <p className="text-center text-amber-500/80 text-sm font-medium">
            {assetsLoaded ? "Klar!" : "Indlæser..."} {Math.round(totalProgress)}%
          </p>
        </div>
      </div>
    </div>
  );
}
