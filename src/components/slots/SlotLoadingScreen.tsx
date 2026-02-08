import { useEffect, useState, useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import defaultTitleImage from "@/assets/slots/book-of-fedesvin-title.png";
import defaultSlotBackground from "@/assets/slots/slot-background.jpg";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { useSlotSymbolPreloader } from "@/hooks/useSlotSymbolPreloader";
import { cn } from "@/lib/utils";
import { getSlotTheme } from "@/lib/slotTheme";

interface SlotLoadingScreenProps {
  onComplete: () => void;
  gameId?: string;
}

export function SlotLoadingScreen({ onComplete, gameId = "book-of-fedesvin" }: SlotLoadingScreenProps) {
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const { data: siteSettings } = useSiteSettings();
  const { data: symbols } = useSlotSymbols(gameId);
  const theme = getSlotTheme(gameId);
  const isWizard = gameId === "rise-of-fedesvin";
  
  const titleImage = siteSettings?.slot_title_image || defaultTitleImage;

  const bgKey = isWizard ? "rise_of_fedesvin_background_image" : "slot_background_image";
  const backgroundImage = siteSettings?.[bgKey] || siteSettings?.slot_background_image || defaultSlotBackground;

  const frameKey = isWizard ? "rise_of_fedesvin_frame_image" : "slot_machine_frame_image";
  const frameImage = siteSettings?.[frameKey] || siteSettings?.slot_machine_frame_image;
  
  // Preload symbols AND frame/background/title images together
  const additionalImages = useMemo(() => [
    frameImage,
    siteSettings?.slot_title_image,
    siteSettings?.[bgKey],
  ], [frameImage, siteSettings?.slot_title_image, siteSettings?.[bgKey]]);
  
  const { isLoaded: assetsLoaded, progress: assetProgress } = useSlotSymbolPreloader(symbols, additionalImages);

  // Minimum display time for loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Complete when both minimum time has passed AND assets are loaded
  useEffect(() => {
    if (minTimeElapsed && assetsLoaded) {
      setTimeout(onComplete, 200);
    }
  }, [minTimeElapsed, assetsLoaded, onComplete]);

  // Combined progress: 50% for time, 50% for assets
  const timeProgress = minTimeElapsed ? 50 : 0;
  const assetProgressScaled = (assetProgress / 100) * 50;
  const totalProgress = Math.min(timeProgress + assetProgressScaled, 100);

  return (
    <div className="min-h-[calc(100vh-4rem)] relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 -z-10" />
      {isWizard && (
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-indigo-900/20 to-purple-950/40 -z-10" />
      )}

      {/* Wizard animated particles */}
      {isWizard && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${3 + Math.random() * 5}px`,
                height: `${3 + Math.random() * 5}px`,
                background: `radial-gradient(circle, rgba(168,85,247,${0.4 + Math.random() * 0.4}) 0%, transparent 70%)`,
                animation: `wizard-float ${4 + Math.random() * 6}s ease-in-out ${Math.random() * 4}s infinite`,
                boxShadow: `0 0 ${6 + Math.random() * 10}px rgba(168,85,247,0.4)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col items-center gap-8 px-4 animate-fade-in">
        {/* Title */}
        {isWizard ? (
          <div className="text-center">
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-purple-100 to-purple-300"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.5)) drop-shadow(0 0 40px rgba(168,85,247,0.3))',
                animation: 'wizard-title-glow 3s ease-in-out infinite',
              }}
            >
              Rise of Fedesvin
            </h1>
            <div className="mt-3 flex justify-center gap-2 text-2xl" style={{ animation: 'sparkle 2s ease-in-out infinite' }}>
              <span>🔮</span>
              <span style={{ animationDelay: '0.3s', animation: 'sparkle 2s ease-in-out 0.3s infinite' }}>⚡</span>
              <span style={{ animationDelay: '0.6s', animation: 'sparkle 2s ease-in-out 0.6s infinite' }}>🔮</span>
            </div>
          </div>
        ) : (
          <img 
            src={titleImage} 
            alt="Book of Fedesvin" 
            className="w-full max-w-[200px] sm:max-w-sm md:max-w-md h-auto"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.5)) drop-shadow(0 0 40px rgba(251,191,36,0.3))'
            }}
          />
        )}
        
        {/* Loading Bar */}
        <div className="w-full max-w-xs sm:max-w-sm space-y-4">
          <div className={cn(
            "relative p-3 rounded-xl backdrop-blur-md border",
            isWizard
              ? "bg-purple-950/40 border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
              : "bg-amber-950/40 border-amber-500/20 shadow-[0_0_30px_rgba(251,191,36,0.15)]"
          )}>
            <Progress 
              value={totalProgress} 
              className={cn(
                "h-5 rounded-full overflow-hidden border",
                isWizard
                  ? "bg-purple-950/60 border-purple-500/40 [&>div]:bg-gradient-to-r [&>div]:from-purple-600 [&>div]:via-purple-400 [&>div]:to-indigo-400"
                  : "bg-amber-950/60 border-amber-500/40"
              )}
            />
            {/* Shimmer overlay */}
            <div 
              className="absolute inset-3 rounded-full pointer-events-none overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)'
              }}
            />
          </div>
          
          <p className={cn(
            "text-center text-sm font-medium",
            isWizard ? "text-purple-400/80" : "text-amber-500/80"
          )}>
            {assetsLoaded ? "Klar!" : "Indlæser..."} {Math.round(totalProgress)}%
          </p>
        </div>
      </div>

      {/* Wizard-specific animations */}
      {isWizard && (
        <style>{`
          @keyframes wizard-float {
            0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.6; }
            25% { transform: translateY(-20px) translateX(10px) scale(1.2); opacity: 1; }
            50% { transform: translateY(-10px) translateX(-8px) scale(0.8); opacity: 0.4; }
            75% { transform: translateY(-25px) translateX(5px) scale(1.1); opacity: 0.8; }
          }
          @keyframes wizard-title-glow {
            0%, 100% { filter: drop-shadow(0 0 20px rgba(168,85,247,0.5)) drop-shadow(0 0 40px rgba(168,85,247,0.3)); }
            50% { filter: drop-shadow(0 0 30px rgba(168,85,247,0.7)) drop-shadow(0 0 60px rgba(168,85,247,0.4)); }
          }
        `}</style>
      )}
    </div>
  );
}
